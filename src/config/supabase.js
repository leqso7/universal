import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_API_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add debug logs
console.log('Supabase URL:', supabaseUrl)
// Don't log the full key for security
console.log('Supabase Key exists:', !!supabaseAnonKey)
