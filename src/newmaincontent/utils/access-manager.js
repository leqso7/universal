import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

class AccessManager {
  constructor() {
    this.isAuthorized = localStorage.getItem('isAuthorized') === 'true';
    this.authCheckInProgress = false;
    this.lastCheckTime = parseInt(localStorage.getItem('lastCheckTime')) || 0;
    this.checkInterval = 10 * 60 * 1000; // 10 minutes
    this.debug = true; // Enable debugging
    
    this.log('AccessManager initialized', {
      isAuthorized: this.isAuthorized,
      lastCheckTime: this.lastCheckTime,
      accessCode: localStorage.getItem('accessCode')
    });
  }

  log(message, data = {}) {
    if (this.debug) {
      console.log(`[AccessManager] ${message}`, data);
    }
  }

  async checkAuthorization(forceCheck = false) {
    this.log('Checking authorization', { forceCheck });

    if (this.authCheckInProgress && !forceCheck) {
      this.log('Auth check in progress, returning cached state');
      return this.isAuthorized;
    }

    try {
      this.authCheckInProgress = true;
      const accessCode = localStorage.getItem('accessCode');
      
      this.log('Got access code from storage', { accessCode });
      
      if (!accessCode) {
        this.log('No access code found');
        this.isAuthorized = false;
        localStorage.setItem('isAuthorized', 'false');
        return false;
      }

      // Check if enough time has passed since last check
      const now = Date.now();
      const timeSinceLastCheck = now - this.lastCheckTime;
      
      this.log('Time since last check', { 
        timeSinceLastCheck,
        checkInterval: this.checkInterval,
        lastCheckTime: this.lastCheckTime
      });

      if (!forceCheck && timeSinceLastCheck < this.checkInterval) {
        this.log('Using cached authorization status', { 
          isAuthorized: this.isAuthorized,
          cacheAge: timeSinceLastCheck
        });
        return this.isAuthorized;
      }

      // Check with Supabase
      this.log('Checking with Supabase', { accessCode });
      
      const { data, error } = await supabase
        .from('access_requests')
        .select('status')
        .eq('access_code', accessCode)
        .single();

      if (error) {
        this.log('Supabase error', { error });
        return this.isAuthorized;
      }

      this.log('Supabase response', { data });

      // Check if access is approved
      const isValid = data?.status === 'approved';
      
      this.log('Authorization result', { 
        isValid, 
        status: data?.status 
      });

      this.isAuthorized = isValid;
      localStorage.setItem('isAuthorized', isValid.toString());
      this.lastCheckTime = now;
      localStorage.setItem('lastCheckTime', now.toString());

      return isValid;

    } catch (error) {
      this.log('Error in checkAuthorization', { error });
      return this.isAuthorized;
    } finally {
      this.authCheckInProgress = false;
    }
  }

  async submitAccessRequest(name, surname) {
    this.log('Submitting access request', { name, surname });
    
    try {
      const { data, error } = await supabase
        .from('access_requests')
        .insert([
          { 
            name, 
            surname, 
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) {
        this.log('Error submitting request', { error });
        throw error;
      }

      this.log('Request submitted successfully', { data });

      if (data?.access_code) {
        localStorage.setItem('accessCode', data.access_code);
        this.lastCheckTime = 0; // Reset last check time
        localStorage.setItem('lastCheckTime', '0');
        return data.access_code;
      }
      
      return null;
    } catch (error) {
      this.log('Error in submitAccessRequest', { error });
      return null;
    }
  }

  getStatus() {
    const status = {
      authorized: this.isAuthorized,
      lastCheck: this.lastCheckTime,
      accessCode: localStorage.getItem('accessCode'),
      timeSinceLastCheck: Date.now() - this.lastCheckTime
    };
    
    this.log('Getting status', status);
    return status;
  }

  clearAccess() {
    this.log('Clearing access');
    localStorage.removeItem('accessCode');
    localStorage.removeItem('lastCheckTime');
    localStorage.setItem('isAuthorized', 'false');
    this.isAuthorized = false;
    this.lastCheckTime = 0;
  }
}

export const accessManager = new AccessManager();
export default accessManager; 