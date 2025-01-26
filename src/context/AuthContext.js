import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for active session
    const session = supabase.auth.getSession();
    console.log('Current session:', session);

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (session) {
        try {
          // Check if user has access in the access_requests table
          const { data, error } = await supabase
            .from('access_requests')
            .select('status')
            .eq('access_code', session.user.email)
            .single();

          console.log('Access request data:', data);
          
          if (error) {
            console.error('Error checking access:', error);
            setError(error);
            setUser(null);
          } else if (data && data.status === 'approved') {
            setUser(session.user);
            setError(null);
          } else {
            console.log('User not approved or not found');
            setUser(null);
          }
        } catch (err) {
          console.error('Error in auth check:', err);
          setError(err);
          setUser(null);
        }
      } else {
        setUser(null);
        setError(null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const checkAccess = async (accessCode) => {
    try {
      console.log('Checking access for code:', accessCode);
      const { data, error } = await supabase
        .from('access_requests')
        .select('*')
        .eq('access_code', accessCode)
        .single();

      console.log('Access check result:', data, error);

      if (error) throw error;

      if (data && data.status === 'approved') {
        setUser({ accessCode });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking access:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    checkAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
