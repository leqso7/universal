import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../config/supabase';

const RequestAccess = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const generateAccessCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const accessCode = generateAccessCode();
      
      const { error } = await supabase
        .from('access_requests')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            access_code: accessCode,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setMessage('თქვენი მოთხოვნა გაგზავნილია. გთხოვთ დაელოდოთ დადასტურებას.');
      setFirstName('');
      setLastName('');
    } catch (error) {
      setMessage('შეცდომა მოთხოვნის გაგზავნისას. გთხოვთ სცადოთ თავიდან.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>წვდომის მოთხოვნა</Title>
        <Input
          type="text"
          placeholder="სახელი"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="გვარი"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'იგზავნება...' : 'გაგზავნა'}
        </Button>
        {message && <Message error={message.includes('შეცდომა')}>{message}</Message>}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const Form = styled.form`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  margin-top: 15px;
  text-align: center;
  color: ${props => props.error ? '#d32f2f' : '#43a047'};
`;

export default RequestAccess;
