import React, { lazy, Suspense, useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { PlayerProvider, usePlayer } from './context/PlayerContext.jsx';
import RiddlesGame from './components/RiddlesGame';

// ლეიზი ჩატვირთვა ყველა კომპონენტისთვის
const HomePage = lazy(() => import(/* webpackChunkName: "home" */ './components/HomePage.jsx'));
const Tasks = lazy(() => import(/* webpackChunkName: "tasks" */ './components/Tasks.jsx'));
const PuzzleGame = lazy(() => import(/* webpackChunkName: "puzzle" */ './components/PuzzleGame.jsx'));
const ScrambleGame = lazy(() => import(/* webpackChunkName: "scramble" */ './components/ScrambleGame.jsx'));
const MemoryGame = lazy(() => import(/* webpackChunkName: "memory" */ './components/MemoryGame.jsx'));
const LabyrinthGame = lazy(() => import(/* webpackChunkName: "labyrinth" */ './components/LabyrinthGame.jsx'));
const AttentionGame = lazy(() => import(/* webpackChunkName: "attention" */ './components/AttentionGame.jsx'));
const PerceptionGame = lazy(() => import(/* webpackChunkName: "perception" */ './components/PerceptionGame.jsx'));

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-display: swap;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const dotPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.7); opacity: 0.5; }
`;

const LoadingFallback = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #64ccf0, #80d0c7, #56bcbd, #52b69a);
  background-size: 200% 200%;
  animation: ${gradientBG} 10s linear infinite;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: white;
  text-align: center;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 9999;
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
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  animation: ${dotPulse} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const AppContent = () => {
  return (
    <AppContainer>
      <ContentContainer>
        <Suspense fallback={
          <LoadingFallback isVisible={true}>
            <LoaderContent>
              <div>იტვირთება</div>
              <LoadingDots>
                <Dot $delay={0} />
                <Dot $delay={0.2} />
                <Dot $delay={0.4} />
              </LoadingDots>
            </LoaderContent>
          </LoadingFallback>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/puzzle" element={<PuzzleGame />} />
            <Route path="/scramble" element={<ScrambleGame />} />
            <Route path="/memory" element={<MemoryGame />} />
            <Route path="/labyrinth" element={<LabyrinthGame />} />
            <Route path="/attention" element={<AttentionGame />} />
            <Route path="/perception" element={<PerceptionGame />} />
            <Route path="/riddles" element={<RiddlesGame />} />
          </Routes>
        </Suspense>
      </ContentContainer>
    </AppContainer>
  );
};

const App = () => {
  return (
    <PlayerProvider>
      <GlobalStyle />
      <AppContent />
    </PlayerProvider>
  );
};

export default App; 