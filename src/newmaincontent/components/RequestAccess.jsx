import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import accessManager from '../utils/access-manager';

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const dotPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.7); opacity: 0.5; }
`;

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #64ccf0, #80d0c7, #56bcbd, #52b69a);
  background-size: 200% 200%;
  animation: ${gradientBG} 10s linear infinite;
  padding: 20px;
  opacity: ${props => props.isLoading ? 0 : 1};
  visibility: ${props => props.isLoading ? 'hidden' : 'visible'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  color: #2196F3;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1976D2;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #90CAF9;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  background: ${props => props.type === 'error' ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.type === 'error' ? '#c62828' : '#2e7d32'};
`;

const AccessCode = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #e3f2fd;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
  color: #1565c0;
  font-weight: bold;
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
`;

const LoaderIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const LoaderText = styled.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  animation: ${dotPulse} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const RequestAccess = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3002); // 0.3 წამი

    return () => clearTimeout(timer);
  }, []);



  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      const code = await accessManager.submitAccessRequest(name, surname);
      
      if (code) {
        setAccessCode(code);
        setMessage('მოთხოვნა წარმატებით გაიგზავნა. გთხოვთ დაელოდოთ დადასტურებას.');
        setMessageType('success');
        
        // Start polling for approval status
        startPollingApprovalStatus(code);
      } else {
        setMessage('მოთხოვნის გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startPollingApprovalStatus = (code) => {
    const pollInterval = setInterval(async () => {
      const isAuthorized = await accessManager.checkAuthorization(true);
      
      if (isAuthorized) {
        clearInterval(pollInterval);
        navigate('/');
      }
    }, 2000); // Check every 2 seconds

    // Clear interval after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 5 * 60 * 1000);
  };

  return (
    <Container isLoading={isLoading}>
      {isLoading ? (
        <LoaderContent>
          <LoaderIcon>🔑</LoaderIcon>
          <LoaderText>იტვირთება</LoaderText>
          <LoadingDots>
            <Dot $delay={0} />
            <Dot $delay={0.2} />
            <Dot $delay={0.4} />
          </LoadingDots>
        </LoaderContent>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Title>მოითხოვე წვდომა</Title>
          <Input
            type="text"
            placeholder="სახელი"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Input
            type="text"
            placeholder="გვარი"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting || !name || !surname}>
            {isSubmitting ? 'იგზავნება...' : 'გაგზავნა'}
          </Button>
          
          {message && (
            <Message type={messageType}>
              {message}
            </Message>
          )}
          
          {accessCode && (
            <AccessCode>
              თქვენი კოდი: {accessCode}
            </AccessCode>
          )}
        </Form>
      )}
    </Container>
  );
};

export default RequestAccess; 