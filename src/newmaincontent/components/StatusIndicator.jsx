import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${props => props.isOnline ? '#4caf50' : '#f44336'};
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  opacity: ${props => props.isOnline ? 0 : 1};
  transition: opacity 0.3s ease;
  pointer-events: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  animation: ${props => props.isOnline ? 'none' : 'pulse 1s infinite'};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const StatusIndicator = ({ isOnline, error }) => {
  if (isOnline) return null;

  return (
    <StatusContainer isOnline={isOnline}>
      <StatusDot isOnline={isOnline} />
      {error || 'კავშირი გაწყვეტილია'}
    </StatusContainer>
  );
};

export default StatusIndicator; 