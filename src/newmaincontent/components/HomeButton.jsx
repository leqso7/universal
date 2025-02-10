import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  position: fixed;
  top: calc(10px + 0.5vw);
  left: calc(10px + 0.5vw);
  padding: calc(8px + 0.3vw) calc(15px + 0.5vw);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: calc(4px + 0.2vw);
  color: white;
  font-size: calc(1rem + 0.2vw);
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
  z-index: 1000;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(calc(-2px - 0.1vw));
  }

  &:active {
    transform: translateY(0);
  }
`;

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Button onClick={handleClick}>
      🏠 მთავარი
    </Button>
  );
};

export default HomeButton; 