import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log('Current session:', session);

        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          const { data, error } = await supabase
            .from('access_requestss')
            .select('*')
            .eq('name', session.user.email)
            .single();

          console.log('Access request data:', data);

          if (error) {
            console.error('Error checking access:', error);
            setUser(null);
          } else if (data && data.status === 'approved') {
            setUser(session.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error in session check:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (session) {
        const { data, error } = await supabase
          .from('access_requestss')
          .select('*')
          .eq('name', session.user.email)
          .single();

        if (error) {
          console.error('Error checking access:', error);
          setUser(null);
        } else if (data && data.status === 'approved') {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const checkAccess = async (name) => {
    try {
      console.log('Checking access for name:', name);
      
      const { data, error } = await supabase
        .from('access_requestss')
        .select('*')
        .eq('name', name)
        .single();

      console.log('Access check result:', { data, error });

      if (error) {
        console.error('Error checking access:', error);
        return false;
      }

      if (!data || data.status !== 'approved') {
        console.log('Access not approved or not found');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in checkAccess:', error);
      return false;
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
