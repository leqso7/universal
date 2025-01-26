import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const generateAccessCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

const RequestAccess = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate();
  const { checkAccess } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (!name.trim()) {
        throw new Error('გთხოვთ შეიყვანოთ სახელი');
      }

      const code = generateAccessCode();
      console.log('Generated access code:', code);

      const { error: supabaseError } = await supabase
        .from('access_requests')
        .insert({
          name: name.trim(),
          access_code: code
        });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message || 'შეცდომა მოთხოვნის გაგზავნისას');
      }

      setAccessCode(code);
      setSuccess(true);
      setName('');

      // Try to check access immediately
      try {
        const hasAccess = await checkAccess();
        if (hasAccess) {
          navigate('/');
        }
      } catch (accessError) {
        console.log('Access not yet granted:', accessError);
      }

    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err.message || 'დაფიქსირდა შეცდომა');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>წვდომის მოთხოვნა</Title>
      {success ? (
        <SuccessMessage>
          <p>თქვენი მოთხოვნა მიღებულია!</p>
          <p>თქვენი წვდომის კოდია: <strong>{accessCode}</strong></p>
          <p>გთხოვთ შეინახოთ ეს კოდი.</p>
        </SuccessMessage>
      ) : (
        <Form onSubmit={onSubmit}>
          <Label>
            სახელი
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="შეიყვანეთ თქვენი სახელი"
              disabled={loading}
            />
          </Label>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? 'იგზავნება...' : 'გაგზავნა'}
          </Button>
        </Form>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #666;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #2196F3;
  }

  &:disabled {
    background: #f5f5f5;
  }
`;

const Button = styled.button`
  padding: 10px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #1976D2;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  color: #4CAF50;
  text-align: center;
  padding: 20px;
  font-size: 16px;

  p {
    margin: 10px 0;
  }

  strong {
    font-size: 24px;
    display: block;
    margin: 15px 0;
    padding: 10px;
    background: #e8f5e9;
    border-radius: 4px;
  }
`;

export default RequestAccess;
