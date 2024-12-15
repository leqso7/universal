import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: linear-gradient(45deg, #3b5998, #4267B2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 89, 152, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 89, 152, 0.4);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Tooltip = styled.div<{ visible: boolean }>`
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
`;

export default function FacebookButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://www.facebook.com/profile.php?id=61567812722184', '_blank');
  };

  return (
    <TooltipWrapper>
      <Button onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <svg viewBox="0 0 40 40" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
          <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="matrix(40 0 0 -39.7778 11115.001 16212.334)" y2="407.5726" y1="406.6018" x2="-277.375" x1="-277.375" id="a">
            <stop stopColor="#0062e0" offset={0} />
            <stop stopColor="#19afff" offset={1} />
          </linearGradient>
          <path d="M16.7 39.8C7.2 38.1 0 29.9 0 20 0 9 9 0 20 0s20 9 20 20c0 9.9-7.2 18.1-16.7 19.8l-1.1-.9h-4.4l-1.1.9z" fill="url(#a)" />
          <path d="m27.8 25.6.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1.2 2.2.3 3.3.3 1.1 0 2.2-.1 3.3-.3V25.6h4.4z" fill="#fff" />
        </svg>
      </Button>
      <Tooltip visible={isHovered}>
        Facebook
      </Tooltip>
    </TooltipWrapper>
  );
}
