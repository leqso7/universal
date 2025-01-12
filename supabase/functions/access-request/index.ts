import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { firstName, lastName } = await req.json()
    
    // Generate code
    const code = Math.floor(10000 + Math.random() * 90000).toString()
    
    const { data, error } = await supabaseClient
      .from('access_requests')
      .insert([
        {
          code,
          first_name: firstName,
          last_name: lastName,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ code }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
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
