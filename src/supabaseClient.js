import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hwramsfqytxqkeyonhxv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cmFtc2ZxeXR4cWtleW9uaHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MTczMTAsImV4cCI6MjA1MzM5MzMxMH0.jKF1G5ze7uGkEAv-9zPj6fZ23-g0C9HdT5w1nenlqlI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 