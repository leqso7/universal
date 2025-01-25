import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background: #cccccc;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: #4CAF50;
  text-align: center;
  padding: 20px;
  background: #e8f5e9;
  border-radius: 5px;
  margin: 20px 0;
`;

const RequestAccess = ({ onAccessGranted }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  useEffect(() => {
    const storedCode = localStorage.getItem('accessCode');
    if (storedCode) {
      setAccessCode(storedCode);
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (localStorage.getItem('accessCode')) {
        setError('თქვენ უკვე გაგზავნილი გაქვთ მოთხოვნა');
        return;
      }

      const code = Math.floor(10000 + Math.random() * 90000).toString();
      
      await api.submitAccessRequest(name.trim(), surname.trim(), code);
      
      localStorage.setItem('accessCode', code);
      setAccessCode(code);
      setIsSubmitted(true);
      
    } catch (err) {
      console.error('Error:', err);
      setError('მოხდა შეცდომა. გთხოვთ სცადოთ თავიდან');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Container>
        <Form style={{ textAlign: 'center' }}>
          <h2>მოთხოვნა გაგზავნილია</h2>
          <SuccessMessage>
            გთხოვთ დაელოდოთ ადმინისტრატორის დადასტურებას.
            <br />
            <br />
            თქვენი კოდი: <strong>{accessCode}</strong>
          </SuccessMessage>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>წვდომის მოთხოვნა</h2>
        <Input
          type="text"
          placeholder="სახელი"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type="text"
          placeholder="გვარი"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'იგზავნება...' : 'მოთხოვნის გაგზავნა'}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default RequestAccess; 