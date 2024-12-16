import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import RequestAccess from './pages/RequestAccess'
import SearchList, { Student } from './components/SearchList'
import InstallPWA from './components/InstallPWA'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
    width: 100vw;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0;
  width: 100%;
  position: relative;
`;

const NavigationBar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  z-index: 10;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  backdrop-filter: blur(5px);
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin-top: 60px;
  width: 100%;
  max-width: 1200px;
`;

const ClassForm = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isVisible ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  min-height: 150px;
  resize: vertical;
`;

const SaveButton = styled(NavButton)`
  width: 100%;
  background: #4CAF50;
  
  &:hover {
    background: #45a049;
  }
`;

function App() {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isClassFormVisible, setIsClassFormVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [classList, setClassList] = useState('');
  const location = useLocation();

  useEffect(() => {
    const savedStatus = localStorage.getItem('approvalStatus');
    const isApproved = savedStatus === 'approved';
    setHasAccess(isApproved);

    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        setStudents(JSON.parse(savedStudents));
      }
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
  }, []);

  const handleSaveClass = () => {
    if (!className.trim() || !classList.trim()) return;

    const students = classList.split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)
      .map(name => ({
        name,
        timestamp: Date.now()
      }));

    const classData = {
      name: className.trim(),
      students
    };

    const savedClasses = JSON.parse(localStorage.getItem('classes') || '[]');
    localStorage.setItem('classes', JSON.stringify([...savedClasses, classData]));

    setClassName('');
    setClassList('');
    setIsClassFormVisible(false);
  };

  if (hasAccess === null) {
    return (
      <AppContainer>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Loading...</h2>
        </div>
      </AppContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <NavigationBar>
          <NavButton onClick={() => setIsClassFormVisible(true)}>კლასის დამატება</NavButton>
        </NavigationBar>
        <MainContent>
          <Routes>
            <Route path="/" element={
              hasAccess ? (
                <Navigate to="/app" replace={true} />
              ) : (
                <Navigate to="/request" replace={true} />
              )
            } />
            <Route path="/app" element={
              hasAccess ? (
                <SearchList students={students} setStudents={setStudents} />
              ) : (
                <Navigate to="/request" replace={true} />
              )
            } />
            <Route path="/request" element={
              hasAccess ? (
                <Navigate to="/app" replace={true} />
              ) : (
                <RequestAccess onAccessGranted={() => {
                  setHasAccess(true);
                  localStorage.setItem('approvalStatus', 'approved');
                }} />
              )
            } />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </MainContent>
        <InstallPWA />
        
        <ClassForm isVisible={isClassFormVisible}>
          <h2>კლასის დამატება</h2>
          <Input
            type="text"
            placeholder="კლასის სახელი"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <TextArea
            placeholder="მოსწავლეების სია (თითო მოსწავლე ახალ ხაზზე)"
            value={classList}
            onChange={(e) => setClassList(e.target.value)}
          />
          <SaveButton onClick={handleSaveClass}>შენახვა</SaveButton>
          <NavButton onClick={() => setIsClassFormVisible(false)}>დახურვა</NavButton>
        </ClassForm>
      </AppContainer>
    </>
  );
}

export default App;