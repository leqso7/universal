import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

const GameCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const GameIcon = styled.span`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const GameTitle = styled.h3`
  font-size: 1.2rem;
  text-align: center;
`;

const HomePage = () => {
  const games = [
    { path: '/tasks', title: 'კროსვორდი', icon: '🎯' },
    { path: '/puzzle', title: 'ფაზლი', icon: '🧩' },
    { path: '/scramble', title: 'დაზლი', icon: '🔤' },
    { path: '/memory', title: 'მეხსიერება', icon: '🎮' },
    { path: '/color-matching', title: 'ფერების შესაბამისობა', icon: '🎨' }
  ];

  return (
    <Container>
      <Title>თამაშები 🎮</Title>
      <GameGrid>
        {games.map((game, index) => (
          <GameCard key={index} to={game.path}>
            <GameIcon>{game.icon}</GameIcon>
            <GameTitle>{game.title}</GameTitle>
          </GameCard>
        ))}
      </GameGrid>
    </Container>
  );
};

export default HomePage;
