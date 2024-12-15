import styled from 'styled-components'
import SearchList from '../components/SearchList'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  flex-direction: column;
`;

const NavigationBar = styled.nav`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const NavButton = styled.button`
  background: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MainApp = () => {
  return (
    <Container>
      <NavigationBar>
        <NavButton>შეკითხვის მომზადება</NavButton>
        <NavButton>დამატება</NavButton>
        <NavButton>ქვიზის დამატება</NavButton>
      </NavigationBar>
      <MainContent>
        <SearchList />
      </MainContent>
    </Container>
  )
}

export default MainApp
