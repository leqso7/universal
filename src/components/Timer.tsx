import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';
import { isUserBlocked } from '../adminControl';

const TimerContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    font-size: 0.8rem;
    padding: 8px 15px;
  }
`;

const TimeValue = styled.span`
  font-weight: bold;
  color: #2196f3;
`;

interface TimerProps {
  onExpire: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number>(31536000); // 1 year default
  const [lastSync, setLastSync] = useState<number>(Date.now());

  useEffect(() => {
    const checkBlockStatus = async () => {
      const lastRequestCode = localStorage.getItem('lastRequestCode');
      if (!lastRequestCode) return;

      const isBlocked = await isUserBlocked(lastRequestCode);
      if (isBlocked) {
        localStorage.clear();
        onExpire();
        return;
      }
    };

    const checkAndUpdateTime = async () => {
      try {
        await checkBlockStatus();

        const { data, error } = await supabase
          .from('access_time')
          .select('expire_time')
          .limit(1)
          .single();
        
        if (error) throw error;
        
        if (data) {
          const serverExpireTime = new Date(data.expire_time).getTime();
          const remaining = Math.floor((serverExpireTime - Date.now()) / 1000);
          
          if (remaining <= 0) {
            onExpire();
            return;
          }
          
          setTimeLeft(remaining);
          setLastSync(Date.now());
          localStorage.setItem('expireTime', serverExpireTime.toString());
        }
      } catch (err) {
        console.error('Error syncing time:', err);
      }
    };

    // Initial checks
    checkBlockStatus();
    checkAndUpdateTime();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('any_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'access_requests'
        },
        async () => {
          await checkBlockStatus();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'access_time'
        },
        () => {
          checkAndUpdateTime();
        }
      )
      .subscribe();

    // Local timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(timer);
      subscription.unsubscribe();
    };
  }, [onExpire]);

  // Sync on visibility change (when tab becomes visible again)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const localExpireTime = localStorage.getItem('expireTime');
        if (localExpireTime) {
          const remaining = Math.floor((parseInt(localExpireTime) - Date.now()) / 1000);
          if (remaining > 0) {
            setTimeLeft(remaining);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days}დ ${hours}სთ ${minutes}წთ ${secs}წმ`;
  };

  useEffect(() => {
    const checkAccess = async () => {
      const lastRequestCode = localStorage.getItem('lastRequestCode');
      if (!lastRequestCode) return; // Skip if no request code exists

      try {
        const { data, error } = await supabase
          .from('access_requests')
          .select('status')
          .eq('code', lastRequestCode)
          .single();

        if (error) {
          if (error.code === 'PGRST116') return; // No data found, that's okay
          console.error('Error checking access:', error.message);
          return;
        }

        if (data?.status === 'blocked') {
          localStorage.clear();
          window.location.href = '/request';
          return;
        }
      } catch (err) {
        console.error('Error checking access:', err);
      }
    };

    // შემოწმება ყოველ 5 წუთში
    checkAccess();
    const interval = setInterval(checkAccess, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContainer>
      დარჩენილი დრო: <TimeValue>{formatTime(timeLeft)}</TimeValue> წამი
    </TimerContainer>
  );
};

export default Timer;
