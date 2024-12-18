import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';

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
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    // კომპონენტის ინიციალიზაციისას ვამოწმებთ შენახულ დროს
    const savedTime = localStorage.getItem('expireTime');
    if (savedTime) {
      const expireTime = parseInt(savedTime);
      const now = Date.now();
      const remaining = Math.floor((expireTime - now) / 1000);
      return remaining > 0 ? remaining : 31557600;
    }
    return 31557600;
  });
  const [lastSync, setLastSync] = useState<number>(Date.now());

  useEffect(() => {
    const checkAndUpdateTime = async () => {
      try {
        const now = Date.now();
        // მხოლოდ მაშინ ვაგზავნით მოთხოვნას, თუ ბოლო სინქრონიზაციიდან გავიდა 5 წუთი
        if (now - lastSync >= 300000) {
          const { data, error } = await supabase
            .from('access_time')
            .select('expire_time')
            .limit(1)
            .single();
          
          if (error) throw error;
          
          if (data) {
            const serverExpireTime = new Date(data.expire_time).getTime();
            const remaining = Math.floor((serverExpireTime - now) / 1000);
            
            if (remaining <= 0) {
              onExpire();
              return;
            }
            
            setTimeLeft(remaining);
            setLastSync(now);
            // ვინახავთ ახალ დროს
            localStorage.setItem('expireTime', serverExpireTime.toString());
          }
        }
      } catch (err) {
        console.error('Error syncing time:', err);
        // თუ სერვერთან კავშირი ვერ მოხერხდა, ვაგრძელებთ ლოკალური დროით
        const localExpireTime = localStorage.getItem('expireTime');
        if (localExpireTime) {
          const remaining = Math.floor((parseInt(localExpireTime) - Date.now()) / 1000);
          if (remaining <= 0) {
            onExpire();
          } else {
            setTimeLeft(remaining);
          }
        }
      }
    };

    // თავდაპირველი შემოწმება
    checkAndUpdateTime();

    // ლოკალური ტაიმერი
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        // ყოველ წამში ვანახლებთ ლოკალურ დროს
        const expireTime = Date.now() + (newTime * 1000);
        localStorage.setItem('expireTime', expireTime.toString());
        return newTime;
      });
    }, 1000);

    // სერვერთან სინქრონიზაცია ყოველ 5 წუთში
    const syncInterval = setInterval(checkAndUpdateTime, 300000);

    return () => {
      clearInterval(timer);
      clearInterval(syncInterval);
    };
  }, [onExpire, lastSync]);

  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days}დ ${hours}სთ ${minutes}წთ ${secs}წმ`;
  };

  return (
    <TimerContainer>
      დარჩენილი დრო: <TimeValue>{formatTime(timeLeft)}</TimeValue>
    </TimerContainer>
  );
};

export default Timer;
