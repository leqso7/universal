import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Edge Function URL
const EDGE_FUNCTION_URL = 'https://loyzwjzsjnikmnuqilmv.functions.supabase.co/access-manager';

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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

const Button = styled.button`
  background: #4285f4;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background: #3367d6;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #d32f2f;
  margin-top: 10px;
  font-size: 14px;
`;

const CodeDisplay = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const CodeText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const StatusText = styled.p`
  font-size: 16px;
  color: #666;
  margin: 5px 0;
`;

const RequestAccess: React.FC<RequestAccessProps> = ({ onAccessGranted }) => {
  const [loading, setLoading] = useState(false);
  const [requestCode, setRequestCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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

    const checkStatus = async () => {
      try {
        const response = await fetch(`${EDGE_FUNCTION_URL}/status?code=${requestCode}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        if (data.status === 'approved') {
          localStorage.setItem('approvalStatus', 'approved');
          localStorage.setItem('userCode', requestCode);
          onAccessGranted();
        } else if (data.status === 'blocked') {
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
      } catch (err) {
        console.error('Error checking status:', err);
      }
    };

    // შემოწმება ყოველ 5 წამში
    const interval = setInterval(checkStatus, 5000);
    checkStatus(); // პირველი შემოწმება

    return () => clearInterval(interval);
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
      const response = await fetch(`${EDGE_FUNCTION_URL}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem('lastRequestCode', data.code);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      setRequestCode(data.code);
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
