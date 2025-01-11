import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface RequestAccessProps {
  onAccessGranted: () => void;
}

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
`;

const Form = styled.form`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const Button = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #3367d6;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CodeDisplay = styled.div`
  margin-top: 20px;
`;

const CodeText = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

const StatusText = styled.p`
  font-size: 16px;
  color: #666;
`;

const ErrorText = styled.p`
  font-size: 16px;
  color: #721c24;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

const RequestAccess: React.FC<RequestAccessProps> = ({ onAccessGranted }) => {
  const [loading, setLoading] = useState(false);
  const [requestCode, setRequestCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const generateCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  useEffect(() => {
    const savedCode = localStorage.getItem('lastRequestCode');
    const savedFirstName = localStorage.getItem('firstName');
    const savedLastName = localStorage.getItem('lastName');
    if (savedCode) {
      setRequestCode(savedCode);
      setFirstName(savedFirstName || '');
      setLastName(savedLastName || '');
    }
  }, []);

  useEffect(() => {
    if (!requestCode) return;

    console.log('Setting up subscription for code:', requestCode);

    const subscription = supabase
      .channel('status_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'access_requests',
          filter: `code=eq.${requestCode}`
        },
        async (payload) => {
          console.log('Received payload:', payload);
          if (payload.new) {
            const newStatus = payload.new.status;
            localStorage.setItem('approvalStatus', newStatus);
            
            if (newStatus === 'approved') {
              console.log('User approved, setting local storage');
              localStorage.setItem('userCode', requestCode);
              console.log('Calling onAccessGranted');
              onAccessGranted();
            } else if (newStatus === 'blocked') {
              console.log('User blocked, updating local storage');
              localStorage.removeItem('lastRequestCode');
              localStorage.removeItem('firstName');
              localStorage.removeItem('lastName');
              localStorage.removeItem('userCode');
              localStorage.removeItem('approvalStatus');
              setRequestCode(null);
              setFirstName('');
              setLastName('');
              setError('თქვენი წვდომა დაბლოკილია. გთხოვთ დაელოდოთ ადმინისტრატორის პასუხს.');
            }
          }
        }
      )
      .subscribe();

    // Check current status on mount
    const checkCurrentStatus = async () => {
      console.log('Checking current status for code:', requestCode);
      const { data, error } = await supabase
        .from('access_requests')
        .select('status')
        .eq('code', requestCode)
        .single();

      if (error) {
        console.error('Error checking status:', error);
        return;
      }

      console.log('Current status:', data);
      if (data?.status === 'approved') {
        console.log('User already approved, setting local storage');
        localStorage.setItem('approvalStatus', 'approved');
        localStorage.setItem('userCode', requestCode);
        console.log('Calling onAccessGranted');
        onAccessGranted();
      } else if (data?.status === 'blocked') {
        console.log('User blocked, updating local storage');
        localStorage.removeItem('lastRequestCode');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userCode');
        localStorage.removeItem('approvalStatus');
        setRequestCode(null);
        setFirstName('');
        setLastName('');
        setError('თქვენი წვდომა დაბლოკილია. გთხოვთ დაელოდოთ ადმინისტრატორის პასუხს.');
      }
    };

    checkCurrentStatus();

    return () => {
      console.log('Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, [requestCode, onAccessGranted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setError('გთხოვთ შეავსოთ სახელი და გვარი');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const code = generateCode();
      
      const { error: insertError } = await supabase
        .from('access_requests')
        .insert([{ 
          code,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          status: 'pending',
          created_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;

      localStorage.setItem('lastRequestCode', code);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      setRequestCode(code);
    } catch (err: any) {
      console.error('Error submitting request:', err);
      setError('მოთხოვნის გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>მოთხოვნის გაგზავნა</Title>
        {requestCode ? (
          <CodeDisplay>
            <CodeText>თქვენი კოდი: {requestCode}</CodeText>
            <StatusText>სტატუსი: მოლოდინში...</StatusText>
            <StatusText>სახელი: {firstName}</StatusText>
            <StatusText>გვარი: {lastName}</StatusText>
          </CodeDisplay>
        ) : (
          <React.Fragment>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="სახელი"
              required
            />
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="გვარი"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'იგზავნება...' : 'გაგზავნა'}
            </Button>
          </React.Fragment>
        )}
        {error && <ErrorText>{error}</ErrorText>}
      </Form>
    </Container>
  );
};

export default RequestAccess;
