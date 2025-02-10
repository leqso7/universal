import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const dotPulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const dotFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const LoaderContainer = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(-45deg, #64ccf0, #80d0c7, #56bcbd, #52b69a);
  background-size: 200% 200%;
  animation: ${gradientBG} 10s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  contain: content;
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  contain: content;
`;

const LoaderIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const LoaderText = styled.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(145deg, #ffffff, #f3f3f3);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
              inset 2px 2px 4px rgba(255, 255, 255, 0.5),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05);
  animation: ${dotFloat} 1.5s ease-in-out infinite,
             ${dotPulse} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  transform-origin: center;
  will-change: transform;

  &:nth-child(2) {
    animation-delay: ${props => props.$delay + 0.2}s;
  }

  &:nth-child(3) {
    animation-delay: ${props => props.$delay + 0.4}s;
  }
`;

const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #64ccf0cc, #80d0c7cc, #56bcbdcc, #52b69acc);
  background-size: 400% 400%;
  animation: ${gradientBG} 10s linear infinite;
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 2rem;
  background: transparent;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin: 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 1rem 0;
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const GameCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  aspect-ratio: 3/2;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const GameIcon = styled.span`
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const GameTitle = styled.h3`
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  margin: 0;
  padding: 0 5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const games = [
    { path: 'tasks', title: 'სახალისო ამოცანები', icon: '🎯' },
    { path: 'puzzle', title: 'ფაზლი', icon: '🧩' },
    { path: 'scramble', title: 'აზროვნების სავარჯიშო', icon: '🔤' },
    { path: 'memory', title: 'მეხსიერების სავარჯიშო', icon: '🧠' },
    { path: 'labyrinth', title: 'ლაბირინთი', icon: '🎮' },
    { path: 'attention', title: 'ყურადღების განვითარების სავარჯიშო', icon: '👀' },
    { path: 'perception', title: 'აღქმის სავარჯიშო', icon: '🖼️' },
    { path: 'riddles', title: 'სახალისო გამოცანები', icon: '❓' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 480); // 0.3 წამი

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoaderContainer>
        <LoaderContent>
          <LoaderIcon>🎮</LoaderIcon>
          <LoaderText>იტვირთება</LoaderText>
          <LoadingDots>
            <Dot $delay={0} />
            <Dot $delay={0.2} />
            <Dot $delay={0.4} />
          </LoadingDots>
        </LoaderContent>
      </LoaderContainer>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Title>შემეცნებითი უნარების
           სავარჯიშოები</Title>
        <GameGrid>
          {games.map((game, index) => (
            <GameCard key={index} to={game.path}>
              <GameIcon>{game.icon}</GameIcon>
              <GameTitle>{game.title}</GameTitle>
            </GameCard>
          ))}
        </GameGrid>
      </Container>
    </PageWrapper>
  );
};

export default HomePage;
