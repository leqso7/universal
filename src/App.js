import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import MainMenu from './components/MainMenu';
import Tasks from './components/Tasks';
import PuzzleGame from './components/PuzzleGame';
import ScrambleGame from './components/ScrambleGame';
import HamburgerMenu from './components/HamburgerMenu';
import RequestAccess from './components/RequestAccess';
import { AuthProvider, useAuth } from './context/AuthContext';
import { createGlobalStyle } from 'styled-components';
import ColorMatchingGame from './components/ColorMatchingGame';
import MemoryGame from './components/MemoryGame';

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

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>იტვირთება...</div>;
  }

  if (!user) {
    return <Navigate to="/request" />;
  }

  return children;
};

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
  return (
    <>
      {children}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Container>
          <HamburgerMenu />
          <Routes>
            <Route path="/request" element={<RequestAccess />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomeButtonWrapper><MainMenu /></HomeButtonWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <HomeButtonWrapper><Tasks /></HomeButtonWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/puzzle"
              element={
                <ProtectedRoute>
                  <HomeButtonWrapper><PuzzleGame /></HomeButtonWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/scramble"
              element={
                <ProtectedRoute>
                  <HomeButtonWrapper><ScrambleGame /></HomeButtonWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/colors"
              element={
                <ProtectedRoute>
                  <HomeButtonWrapper><ColorMatchingGame /></HomeButtonWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/memory-game"
              element={
                <ProtectedRoute>
                  <HomeButtonWrapper><MemoryGame /></HomeButtonWrapper>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
