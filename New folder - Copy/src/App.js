import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import MainMenu from './components/MainMenu';
import Tasks from './components/Tasks';
import PuzzleGame from './components/PuzzleGame';
import ScrambleGame from './components/ScrambleGame';
import HamburgerMenu from './components/HamburgerMenu';
import { PlayerProvider } from './context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import ColorMatchingGame from './components/ColorMatchingGame';
import MemoryGame from './components/MemoryGame';
import RequestAccess from './components/RequestAccess';
import { api } from './services/api';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    min-height: 100vh;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(-45deg, 
      rgba(241, 196, 15, 0.8),
      rgba(243, 156, 18, 0.8),
      rgba(41, 128, 185, 0.8),
      rgba(52, 152, 219, 0.8)
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const HomeButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
  }
`;

const HomeButtonWrapper = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      {window.location.pathname !== '/' && (
        <HomeButton onClick={() => navigate('/')}>🏠</HomeButton>
      )}
      {children}
    </>
  );
};

const App = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const code = localStorage.getItem('accessCode');
    if (!code) {
      setHasAccess(false);
      setIsLoading(false);
      return;
    }

    try {
      const data = await api.checkAccess(code);
      setHasAccess(data?.status === 'approved');
    } catch (error) {
      console.error('Error checking access:', error);
      setHasAccess(false);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PlayerProvider>
      <Router>
        <GlobalStyle />
        <Container>
          <HamburgerMenu />
          <Routes>
            <Route 
              path="/request" 
              element={
                hasAccess ? 
                  <Navigate to="/" replace /> : 
                  <RequestAccess onAccessGranted={checkAccess} />
              } 
            />
            <Route
              path="/*"
              element={
                hasAccess ? (
                  <MainContent />
                ) : (
                  <Navigate to="/request" replace />
                )
              }
            />
          </Routes>
        </Container>
      </Router>
    </PlayerProvider>
  );
};

const MainContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeButtonWrapper><MainMenu /></HomeButtonWrapper>} />
        <Route path="/tasks" element={<HomeButtonWrapper><Tasks /></HomeButtonWrapper>} />
        <Route path="/puzzle" element={<HomeButtonWrapper><PuzzleGame /></HomeButtonWrapper>} />
        <Route path="/memory-game" element={<HomeButtonWrapper><MemoryGame /></HomeButtonWrapper>} />
        <Route path="/scramble" element={<HomeButtonWrapper><ScrambleGame /></HomeButtonWrapper>} />
        <Route path="/colors" element={<HomeButtonWrapper><ColorMatchingGame /></HomeButtonWrapper>} />
      </Routes>
    </>
  );
};

export default App;
