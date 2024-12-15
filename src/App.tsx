import { useState } from 'react'
import SearchList from './components/SearchList'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
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

function App() {
  return (
    <AppContainer>
      <NavigationBar>
        <NavButton>შეკითხვის მომზადება</NavButton>
        <NavButton>დამატება</NavButton>
        <NavButton>ქვიზის დამატება</NavButton>
      </NavigationBar>
      <SearchList />
    </AppContainer>
  )
}

export default App
