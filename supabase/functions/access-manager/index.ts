import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Max-Age': '86400'
}

// უსაფრთხო კოდის გენერაცია
const generateSecureCode = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (array[0] % 90000 + 10000).toString();
};

// Rate limiting
const RATE_LIMIT = 100; // მოთხოვნები საათში
const rateLimiter = new Map();

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const hour = Math.floor(now / 3600000);
  const key = `${ip}:${hour}`;
  const count = rateLimiter.get(key) || 0;
  
  if (count >= RATE_LIMIT) {
    throw new Error('მოთხოვნების ლიმიტი ამოწურულია');
  }
  
  rateLimiter.set(key, count + 1);
};

// ვალიდაცია
const validateInput = (firstName: string, lastName: string) => {
  const nameRegex = /^[\u10A0-\u10FF\s\w]{2,50}$/;
  if (!firstName?.trim() || !lastName?.trim()) {
    throw new Error('სახელი და გვარი სავალდებულოა');
  }
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    throw new Error('სახელი და გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს');
  }
};

serve(async (req) => {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()
    const clientIP = req.headers.get('x-real-ip') || 'unknown';

    // Rate limiting შემოწმება
    checkRateLimit(clientIP);

    if (req.method === 'POST' && path === 'request') {
      const { firstName, lastName } = await req.json()
      
      // ვალიდაცია
      validateInput(firstName, lastName);

      const code = generateSecureCode();
      
      const { data, error } = await supabaseAdmin
        .rpc('create_access_request', {
          p_code: code,
          p_first_name: firstName.trim(),
          p_last_name: lastName.trim(),
          p_ip_address: clientIP,
          p_user_agent: req.headers.get('user-agent')
        })

      if (error) throw error

      return new Response(
        JSON.stringify({ code }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method === 'GET' && path === 'status') {
      const code = url.searchParams.get('code')
      if (!code) throw new Error('კოდი სავალდებულოა')

      const { data, error } = await supabaseAdmin
        .from('access_requests')
        .select('status')
        .eq('code', code)
        .single()

      if (error) throw error

      if (!data) {
        return new Response(
          JSON.stringify({ error: 'კოდი ვერ მოიძებნა' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404
          }
        )
      }

      return new Response(
        JSON.stringify({ status: data.status }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    throw new Error('არასწორი მოთხოვნა')

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})
