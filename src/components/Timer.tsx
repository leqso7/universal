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

interface TimerProps {
  onExpire: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBlockStatus = async () => {
      try {
        const userCode = localStorage.getItem('userCode');
        if (!userCode) {
          onExpire();
          return;
        }

        const { data: accessData, error: accessError } = await supabase
          .from('access_requests')
          .select('status')
          .eq('code', userCode)
          .single();

        if (accessError) throw accessError;
        
        if (accessData?.status === 'blocked') {
          localStorage.clear(); // გავასუფთავოთ localStorage
          onExpire(); // გამოვიძახოთ onExpire
          window.location.href = '/request'; // გადავამისამართოთ request გვერდზე
          return;
        }

        const { data: timeData, error: timeError } = await supabase
          .from('access_time')
          .select('expire_time')
          .eq('id', 1)
          .single();

        if (timeError) throw timeError;

        if (timeData) {
          const expireTime = new Date(timeData.expire_time).getTime();
          const now = new Date().getTime();
          const difference = expireTime - now;

          if (difference <= 0) {
            localStorage.clear();
            onExpire();
            window.location.href = '/request';
          } else {
            setTimeLeft(difference);
          }
        }
      } catch (error) {
        console.error('Error checking access:', error);
      } finally {
        setLoading(false);
      }
    };

    checkBlockStatus();
    const interval = setInterval(checkBlockStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [onExpire]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null) return null;
        const newTime = prev - 1000;
        if (newTime <= 0) {
          onExpire();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  if (loading) {
    return null;
  }

  if (timeLeft === null || timeLeft <= 0) {
    return null;
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <TimerContainer>
      <div>დარჩენილი დრო:</div>
      <div>
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>
    </TimerContainer>
  );
};

export default Timer;
