import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/GlobalStyle';
import AppRoutes from './AppRoutes';
import accessManager from '../utils/access-manager';

function App() {
  const [authStatus, setAuthStatus] = useState(() => {
    const initialStatus = { 
      authorized: localStorage.getItem('isAuthorized') === 'true'
    };
    console.log('[App] Initial auth status:', initialStatus);
    return initialStatus;
  });

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('[App] Initializing auth...');
      // Initial authorization check
      const isAuthorized = await accessManager.checkAuthorization(true);
      console.log('[App] Initial auth check result:', { isAuthorized });
      setAuthStatus({ authorized: isAuthorized });
    };

    initializeAuth();

    // Check authorization status periodically
    const statusInterval = setInterval(async () => {
      console.log('[App] Running periodic auth check...');
      const isAuthorized = await accessManager.checkAuthorization();
      console.log('[App] Periodic check result:', { isAuthorized });
      
      if (authStatus.authorized !== isAuthorized) {
        console.log('[App] Auth status changed:', { 
          from: authStatus.authorized, 
          to: isAuthorized 
        });
        setAuthStatus({ authorized: isAuthorized });
      }
    }, 2000); // Check every 2 seconds while the app is active

    // Add visibility change listener to recheck status when tab becomes visible
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        console.log('[App] Tab became visible, rechecking auth...');
        const isAuthorized = await accessManager.checkAuthorization(true);
        console.log('[App] Visibility change auth check result:', { isAuthorized });
        setAuthStatus({ authorized: isAuthorized });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      console.log('[App] Cleaning up auth checks...');
      clearInterval(statusInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [authStatus.authorized]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppRoutes isAuthorized={authStatus.authorized} />
      </Router>
    </ThemeProvider>
  );
}

export default App; 