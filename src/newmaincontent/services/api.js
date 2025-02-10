import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing!');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const api = {
  async submitAccessRequest(name, surname) {
    try {
      const { data, error } = await supabase
        .from('access_requests')
        .insert([{ 
          name: name.trim(), 
          surname: surname.trim(),
          status: 'pending'
        }])
        .select('access_code')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async checkAccess(code) {
    try {
      if (!code) return null;
      
      const { data, error } = await supabase
        .from('access_requests')
        .select('status')
        .eq('access_code', code)
        .eq('status', 'approved')  // მხოლოდ დამტკიცებული მოთხოვნები
        .single();

      if (error) return null;
      
      // თუ მოთხოვნა დამტკიცებულია
      if (data && data.status === 'approved') {
        return { isApproved: true };
      }
      
      return { isApproved: false };
    } catch (error) {
      console.error('Error:', error);
      return { isApproved: false };
    }
  }
}; 