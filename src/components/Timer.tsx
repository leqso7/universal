import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';

const TimerContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  text-align: center;
  font-size: 1.2rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 15px;
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
  const [timeLeft, setTimeLeft] = useState<number>(31557600);

  useEffect(() => {
    const checkAndUpdateTime = async () => {
      try {
        // სერვერის დროის შემოწმება
        const { data, error } = await supabase
          .from('access_time')
          .select('expire_time')
          .single();

        if (error) throw error;

        if (data) {
          const serverExpireTime = new Date(data.expire_time).getTime();
          const now = Date.now();
          const remainingTime = Math.floor((serverExpireTime - now) / 1000);

          if (remainingTime <= 0) {
            onExpire();
            return;
          }

          setTimeLeft(remainingTime);
          localStorage.setItem('expireTime', serverExpireTime.toString());
        }
      } catch (err) {
        // თუ სერვერთან კავშირი ვერ მოხერხდა, ვიყენებთ ლოკალურ დროს
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

    // ყოველ 1 წამში ვამცირებთ დროს
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // ყოველ 1 წუთში ვასინქრონებთ სერვერთან
    const syncInterval = setInterval(checkAndUpdateTime, 60000);

    return () => {
      clearInterval(timer);
      clearInterval(syncInterval);
    };
  }, [onExpire]);

  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days} დღე ${hours} საათი ${minutes} წუთი ${secs} წამი`;
  };

  return (
    <TimerContainer>
      დარჩენილი დრო: <TimeValue>{formatTime(timeLeft)}</TimeValue>
    </TimerContainer>
  );
};

export default Timer;
