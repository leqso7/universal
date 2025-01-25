const API_URL = process.env.REACT_APP_API_URL || 'https://hwramsfqytxqkeyonhxv.supabase.co/rest/v1';

const headers = {
  'Content-Type': 'application/json',
  'apikey': process.env.REACT_APP_SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
  'Accept': 'application/vnd.pgrst.object+json',
  'Accept-Profile': 'public'
};

export const api = {
  async checkAccess(code) {
    try {
      const response = await fetch(
        `${API_URL}/access_requests?select=status&code=eq.${code}`,
        { headers }
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async submitAccessRequest(name, surname, code) {
    try {
      const response = await fetch(
        `${API_URL}/access_requests`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name,
            surname,
            code,
            status: 'pending'
          })
        }
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}; 