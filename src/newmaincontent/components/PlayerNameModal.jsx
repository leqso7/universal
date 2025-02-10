import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePlayer } from '../context/PlayerContext';
import './PlayerNameModal.css';

const PlayerNameModal = ({ onSelect }) => {
  const { players, setCurrentPlayer, addPlayer } = usePlayer();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);

  const handlePlayerSelect = (player) => {
    setCurrentPlayer(player);
    onSelect();
  };

  const handleAddNewPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: Date.now(),
        name: newPlayerName.trim(),
        gameProgress: {}
      };
      addPlayer(newPlayer);
      setCurrentPlayer(newPlayer);
      onSelect();
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Title>აირჩიეთ მოსწავლე</Title>
        <PlayerList>
          {players.map(player => (
            <PlayerButton
              key={player.id}
              onClick={() => handlePlayerSelect(player)}
            >
              {player.name}
            </PlayerButton>
          ))}
        </PlayerList>
        
        {showAddNew ? (
          <AddNewSection>
            <Input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="ჩაწერეთ მოსწავლის სახელი"
            />
            <AddButton onClick={handleAddNewPlayer}>
              დამატება
            </AddButton>
          </AddNewSection>
        ) : (
          <AddNewButton onClick={() => setShowAddNew(true)}>
            + ახალი მოსწავლის დამატება
          </AddNewButton>
        )}
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`;

const PlayerList = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
`;

const PlayerButton = styled.button`
  padding: 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
  }
`;

const AddNewButton = styled(PlayerButton)`
  width: 100%;
  background: #4CAF50;
  color: white;

  &:hover {
    background: #45a049;
  }
`;

const AddNewSection = styled.div`
  display: grid;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const AddButton = styled(AddNewButton)`
  margin-top: 0.5rem;
`;

export default PlayerNameModal;
