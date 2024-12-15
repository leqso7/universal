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
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

function App() {
  const [hasAccess, setHasAccess] = useState(() => {
    const savedStatus = localStorage.getItem('approvalStatus');
    return savedStatus === 'approved';
  });

  const handleAccessGranted = () => {
    setHasAccess(true);
    localStorage.setItem('approvalStatus', 'approved');
  };

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route 
          path="/" 
          element={
            hasAccess ? (
              <AppContainer>
                <SearchList />
                <InstallPWA />
              </AppContainer>
            ) : (
              <RequestAccess onAccessGranted={handleAccessGranted} />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
