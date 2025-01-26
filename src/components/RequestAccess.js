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
  const [error, setError] = useState(null);
  const [accessCode, setAccessCode] = useState('');
  const [showAccessForm, setShowAccessForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.submitAccessRequest(name, surname);
      if (response) {
        setShowAccessForm(false);
        // თუ კოდი დაბრუნდა response-ში
        if (response[0]?.access_code) {
          setAccessCode(response[0].access_code);
          localStorage.setItem('accessCode', response[0].access_code);
          onAccessGranted();
        }
      }
    } catch (err) {
      setError('მოთხოვნის გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ მოგვიანებით.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (showAccessForm) {
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
  }

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
};

export default RequestAccess; 