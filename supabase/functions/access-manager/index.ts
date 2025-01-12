import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Max-Age': '86400'
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // სერვერის მხარეს Supabase კლიენტი
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      // SERVICE_ROLE key გამოიყენება მხოლოდ სერვერის მხარეს
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()

    if (req.method === 'POST' && path === 'request') {
      // მოთხოვნის შექმნა
      const { firstName, lastName } = await req.json()
      
      // ვალიდაცია
      if (!firstName?.trim() || !lastName?.trim()) {
        throw new Error('სახელი და გვარი სავალდებულოა')
      }

      // უნიკალური კოდის გენერაცია
      const code = Math.floor(10000 + Math.random() * 90000).toString()
      
      const { data, error } = await supabaseAdmin
        .from('access_requests')
        .insert([
          {
            code,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            status: 'pending',
            created_at: new Date().toISOString(),
            ip_address: req.headers.get('x-real-ip'),
            user_agent: req.headers.get('user-agent')
          }
        ])
        .select()
        .single()

      if (error) throw error

      return new Response(
        JSON.stringify({ code }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method === 'GET' && path === 'status') {
      // სტატუსის შემოწმება
      const code = url.searchParams.get('code')
      if (!code) throw new Error('კოდი სავალდებულოა')

      const { data, error } = await supabaseAdmin
        .from('access_requests')
        .select('status')
        .eq('code', code)
        .single()

      if (error) throw error

      return new Response(
        JSON.stringify(data),
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
