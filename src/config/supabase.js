import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_API_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL)
  console.log('REACT_APP_SUPABASE_ANON_KEY exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Add debug logs
console.log('Supabase URL:', supabaseUrl)
// Don't log the full key for security
console.log('Supabase Key exists:', !!supabaseAnonKey)
