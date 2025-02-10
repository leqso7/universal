import React, { useState } from 'react';
import styled from 'styled-components';
import { usePlayer } from '../context/PlayerContext.jsx';

const MenuContainer = styled.div`
  position: fixed;
  top: clamp(10px, 3vh, 20px);
  right: clamp(10px, 3vw, 20px);
  z-index: 1000;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: clamp(8px, 2vw, 10px);
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 1vw, 6px);
  align-items: center;
  justify-content: center;
  width: clamp(40px, 8vw, 45px);
  height: clamp(40px, 8vw, 45px);
  border-radius: 50%;
  background: rgba(33, 150, 243, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (hover: hover) {
    &:hover {
      background: #1976D2;
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
  }

  span {
    display: block;
    width: clamp(20px, 4vw, 25px);
    height: 2px;
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  ${props => props.$isOpen && `
    span:first-child {
      transform: translateY(8px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:last-child {
      transform: translateY(-8px) rotate(-45deg);
    }
  `}

  @media (max-width: 768px) {
    width: clamp(35px, 7vw, 40px);
    height: clamp(35px, 7vw, 40px);
    gap: 4px;
  }
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 12px);
  width: 100%;
  padding: clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px);
  border: none;
  background: none;
  cursor: pointer;
  font-size: clamp(13px, 2.5vw, 15px);
  color: #333;
  border-radius: 8px;
  transition: all 0.2s ease;

  svg {
    width: clamp(18px, 4vw, 20px);
    height: clamp(18px, 4vw, 20px);
    color: #2196F3;
  }

  @media (hover: hover) {
    &:hover {
      background: #f0f7ff;
      transform: translateX(5px);
    }
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

const MenuContent = styled.div`
  position: absolute;
  top: clamp(50px, 10vh, 60px);
  right: 0;
  background: white;
  border-radius: 12px;
  padding: clamp(1rem, 3vw, 1.5rem);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: clamp(200px, 50vw, 250px);
  transform: ${({ $isOpen }) => $isOpen ? 'scale(1)' : 'scale(0.9)'};
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transform-origin: top right;
  transition: all 0.3s ease;
  pointer-events: ${({ $isOpen }) => $isOpen ? 'all' : 'none'};
  z-index: 1000;

  &:before {
    content: '';
    position: absolute;
    top: -8px;
    right: 15px;
    width: 16px;
    height: 16px;
    background: white;
    transform: rotate(45deg);
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 40px);
    min-width: unset;
    right: -10px;
  }
`;

const PlayerSection = styled.div`
  margin-bottom: clamp(15px, 3vh, 20px);
  padding-bottom: clamp(15px, 3vh, 20px);
  border-bottom: 1px solid #eee;

  h3 {
    font-size: clamp(16px, 3vw, 18px);
    color: #2196F3;
    margin: 0 0 clamp(10px, 2vh, 15px) 0;
    font-weight: 600;
  }

  h5 {
    font-size: clamp(12px, 2.5vw, 14px);
    color: #666;
    margin: 0 0 clamp(8px, 1.5vh, 10px) 0;
    font-weight: 500;
  }
`;

const PlayerSelect = styled.select`
  width: 100%;
  padding: clamp(8px, 2vw, 10px) clamp(10px, 2.5vw, 12px);
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: clamp(13px, 2.5vw, 15px);
  color: #333;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232196F3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;

  @media (hover: hover) {
    &:hover {
      border-color: #2196F3;
      background-color: white;
    }
  }

  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    background-color: white;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 10px;
  }
`;

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPlayer, players, setCurrentPlayer, setShowNameModal, getPlayerSolvedRiddles } = usePlayer();

  const handleChangeName = () => {
    setShowNameModal(true);
    setIsOpen(false);
  };

  return (
    <MenuContainer>
      <MenuButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <span />
        <span />
        <span />
      </MenuButton>
      <MenuContent $isOpen={isOpen}>
        <PlayerSection>
          <h3>მოთამაშე: {currentPlayer?.name || 'უცნობი'}</h3>
          {currentPlayer && (
            <h4>შესრულებული გამოცანები: {getPlayerSolvedRiddles(currentPlayer.id).size}</h4>
          )}
          <h5>მოთამაშის შეცვლა</h5>
          <PlayerSelect 
            value={currentPlayer?.id || ''}
            onChange={(e) => {
              const selectedPlayer = players.find(p => p.id === parseInt(e.target.value));
              if (selectedPlayer) {
                setCurrentPlayer(selectedPlayer);
                setIsOpen(false);
              }
            }}
          >
            {players.map(player => (
              <option key={player.id} value={player.id}>
                {player.name} (შესრულებული: {getPlayerSolvedRiddles(player.id).size})
              </option>
            ))}
          </PlayerSelect>
        </PlayerSection>
        <MenuItem onClick={handleChangeName}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          ახალი სახელის დამატება
        </MenuItem>
      </MenuContent>
    </MenuContainer>
  );
};

export default HamburgerMenu;