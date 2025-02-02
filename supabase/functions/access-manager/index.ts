import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Max-Age': '86400'
}

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const getConfig = async () => {
  const { data, error } = await supabaseAdmin
    .from('app_config')
    .select('key, value');
  
  if (error) {
    console.error('Error fetching config:', error);
    return null;
  }

  const config: { [key: string]: string } = {};
  if (data) {
    data.forEach((item: { key: string; value: string }) => {
      config[item.key] = item.value;
    });
  }
  return config;
};

const approveAccessRequest = async (code: string) => {
  const config = await getConfig();
  if (!config) return { error: 'Configuration error' };

  const validityDays = parseInt(config['DEFAULT_CODE_VALIDITY']) || 30;
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + validityDays);

  const { error } = await supabaseAdmin
    .from('access_requests')
    .update({ 
      status: 'approved',
      valid_until: validUntil.toISOString()
    })
    .eq('code', code);

  if (error) return { error: 'Failed to approve request' };
  return { success: true, validUntil: validUntil.toISOString() };
};

const checkAccessStatus = async (code: string) => {
  const canCheck = await checkRateLimitAndInterval(code);
  if (!canCheck) {
    return { 
      status: 'rate_limited',
      message: 'Too many requests or too frequent checks'
    };
  }

  const { data, error } = await supabaseAdmin
    .from('access_requests')
    .select('status, valid_until')
    .eq('code', code)
    .single();

  if (error) return { error: 'Failed to check status' };

  if (data.valid_until) {
    const now = new Date();
    const validUntil = new Date(data.valid_until);
    if (now > validUntil) {
      return { 
        status: 'expired',
        serverTime: now.toISOString(),
        validUntil: data.valid_until
      };
    }
  }

  return {
    status: data.status,
    serverTime: new Date().toISOString(),
    validUntil: data.valid_until
  };
};

const checkRateLimitAndInterval = async (code: string): Promise<boolean> => {
  const config = await getConfig();
  if (!config) return true;

  const { data: lastCheck, error } = await supabaseAdmin
    .from('status_checks')
    .select('last_check_time, check_count')
    .eq('access_code', code)
    .single();

  const now = new Date().getTime();
  const minInterval = parseInt(config['MIN_CHECK_INTERVAL']) || 300000;
  const maxChecksPerHour = parseInt(config['RATE_LIMIT_PER_HOUR']) || 100;

  if (lastCheck?.last_check_time) {
    const timeSinceLastCheck = now - new Date(lastCheck.last_check_time).getTime();
    if (timeSinceLastCheck < minInterval) {
      return false;
    }

    if ((lastCheck.check_count as number) >= maxChecksPerHour) {
      return false;
    }
  }

  await supabaseAdmin
    .from('status_checks')
    .upsert({ 
      access_code: code, 
      last_check_time: new Date().toISOString(),
      check_count: ((lastCheck?.check_count as number) || 0) + 1
    });

  return true;
};

const CHECK_INTERVAL_ACTIVE = 10 * 60 * 1000;    // 10 წუთი
const CHECK_INTERVAL_INACTIVE = 60 * 60 * 1000;  // 1 საათი

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://class-manager--one.vercel.app",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;
    
    // სტატუსის შემოწმება
    if (path === "/status" && req.method === "GET") {
      const code = url.searchParams.get("code");
      const isActive = url.searchParams.get("isActive") === "true";
      
      if (!code) {
        return new Response(
          JSON.stringify({ error: "კოდი არ არის მითითებული" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // ვამოწმებთ ბოლო შემოწმების დროს
      const { data: lastCheck } = await supabaseAdmin
        .from('status_checks')
        .select('created_at')
        .eq('code', code)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (lastCheck) {
        const timeSinceLastCheck = Date.now() - new Date(lastCheck.created_at).getTime();
        const minInterval = isActive ? CHECK_INTERVAL_ACTIVE : CHECK_INTERVAL_INACTIVE;

        if (timeSinceLastCheck < minInterval) {
          return new Response(
            JSON.stringify({ error: "გთხოვთ დაიცადოთ შემდეგ შემოწმებამდე" }),
            {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      }
      const { data: request } = await supabaseAdmin
        .from('access_requests')
        .select('status')
        .eq('code', code)
        .single();

      return new Response(
        JSON.stringify({ status: request?.status || "pending" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (req.method === 'POST') {
      const { action, accessCode } = await req.json();

      switch (action) {
        case 'check':
          const status = await checkAccessStatus(accessCode);
          return new Response(JSON.stringify(status), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });

        case 'approve':
          const result = await approveAccessRequest(accessCode);
          return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });

        default:
          return new Response(JSON.stringify({ error: 'Invalid action' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          });
      }
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
