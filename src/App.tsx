import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import RequestAccess from './pages/RequestAccess'
import SearchList from './components/SearchList'
import InstallPWA from './components/InstallPWA'
import styled from 'styled-components'
import { useState } from 'react'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 0;
  width: 100vw;
  position: relative;
`;

const NavigationBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;

const NavButton = styled.button`
  background: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const MainApp = () => {
  const [hasAccess, setHasAccess] = useState(() => {
    const savedAccess = localStorage.getItem('hasAccess');
    return savedAccess === 'true';
  });

  const handleAccessGranted = () => {
    setHasAccess(true);
    localStorage.setItem('hasAccess', 'true');
  };

  if (!hasAccess) {
    return <RequestAccess onAccessGranted={handleAccessGranted} />;
  }

  return (
    <AppContainer>
      <SearchList />
      <InstallPWA />
    </AppContainer>
  );
};

function App() {
  return (
    <Router basename="/class-manager">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<RequestAccess />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
