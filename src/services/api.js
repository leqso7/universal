import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ვალიდაციის ფუნქციები
const validateName = (name) => {
  if (!name || name.length < 2 || name.length > 50) {
    throw new Error('სახელი უნდა იყოს 2-დან 50 სიმბოლომდე');
  }
  if (!/^[\u10A0-\u10FF\s]+$/.test(name)) {
    throw new Error('გამოიყენეთ მხოლოდ ქართული ასოები');
  }
  return name.trim();
};

const sanitizeInput = (str) => {
  return str.replace(/[<>]/g, ''); // XSS პრევენცია
};

export const api = {
  async submitAccessRequest(name, surname) {
    try {
      // ვალიდაცია
      const validatedName = validateName(sanitizeInput(name));
      const validatedSurname = validateName(sanitizeInput(surname));

      const { data, error } = await supabase
        .from('access_requests')
        .insert([
          { 
            name: validatedName, 
            surname: validatedSurname,
            status: 'pending',
            request_timestamp: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error submitting access request:', error);
      throw new Error(error.message);
    }
  },

  async checkAccess(code) {
    try {
      // ვალიდაცია
      if (!code || !/^\d{5}$/.test(code)) {
        throw new Error('არასწორი კოდის ფორმატი');
      }

      const { data, error } = await supabase
        .from('access_requests')
        .select('*')
        .eq('access_code', code)
        .single();

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error checking access:', error);
      throw new Error(error.message);
    }
  }
}; 