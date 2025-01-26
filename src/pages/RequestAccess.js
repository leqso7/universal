import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { supabase } from '../supabaseClient';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
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
  width: 100%;
`;

const Button = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const RequestAccess = ({ onAccessGranted }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const generateCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !surname.trim()) {
      toast.error('გთხოვთ შეავსოთ ყველა ველი', {
        position: "top-center",
        autoClose: 3000
      });
      return;
    }

    setIsSubmitting(true);
    const code = generateCode();

    try {
      const { error } = await supabase
        .from('access_requests')
        .insert([
          {
            name: name.trim(),
            surname: surname.trim(),
            code,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      localStorage.setItem('accessCode', code);
      toast.success('მოთხოვნა წარმატებით გაიგზავნა', {
        position: "top-center",
        autoClose: 3000
      });
      
      if (onAccessGranted) {
        onAccessGranted();
      }
      navigate('/');
    } catch (error) {
      console.error('Error requesting access:', error);
      toast.error('მოთხოვნის გაგზავნა ვერ მოხერხდა', {
        position: "top-center",
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>მოითხოვეთ წვდომა</h2>
        <Input
          type="text"
          placeholder="სახელი"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <Input
          type="text"
          placeholder="გვარი"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'იგზავნება...' : 'მოთხოვნის გაგზავნა'}
        </Button>
      </Form>
    </Container>
  );
};

export default RequestAccess; 