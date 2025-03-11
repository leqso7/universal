import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import RequestAccess from './pages/RequestAccess'
import SearchList, { Student } from './components/SearchList'
import styled, { keyframes } from 'styled-components'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewHomePage from './newmaincontent/App.jsx';

interface ClassData {
  name: string;
  students: {
    name: string;
    timestamp: number;
  }[];
}

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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const gradientBG = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, 
    rgba(100, 204, 240, 1), 
    rgba(128, 208, 199, 1), 
    rgba(86, 188, 189, 1), 
    rgba(82, 182, 154, 1)
  );
  background-size: 400% 400%;
  animation: ${gradientBG} 15s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 0;
  z-index: 1;
  overflow: hidden;
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
  -webkit-transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
`;

const InstallContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 80px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ClassForm = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.$isVisible ? '0' : '-400px'};
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

const SaveButton = styled.button`
  background: #4CAF50;
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  backdrop-filter: blur(5px);
  transition: background 0.3s;
  
  &:hover {
    background: #45a049;
  }
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, 
    rgba(100, 204, 240, 1), 
    rgba(128, 208, 199, 1), 
    rgba(86, 188, 189, 1), 
    rgba(82, 182, 154, 1)
  );
  background-size: 400% 400%;
  animation: ${gradientBG} 15s ease infinite;
  z-index: 9998;
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
  -webkit-transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
`;

const LoadingText = styled.div`
  font-size: 24px;
  color: white;
  text-align: center;
  transform: translateZ(0);
  opacity: 1;
  transition: opacity 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const LoadingScreenComponent = () => (
  <LoadingScreen>
    <LoadingText>
      იტვირთება...
    </LoadingText>
  </LoadingScreen>
);

function App() {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(() => {
    const approvalStatus = localStorage.getItem('approvalStatus');
    return approvalStatus === 'approved';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [className, setClassName] = useState('');
  const [classList, setClassList] = useState('');
  const [isClassFormVisible, setIsClassFormVisible] = useState(false);
  const [, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      checkUserStatus(true);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          if ('sync' in registration) {
            (registration as any).sync.register('status-check')
              .catch((err: Error) => console.error('Background sync registration failed:', err));
          }
        });
      }
    };
    const handleOffline = () => {};

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkOfflineStatus = () => {
    const cachedStatus = localStorage.getItem('approvalStatus');
    const cachedServerTime = localStorage.getItem('lastServerTime');
    const cachedValidUntil = localStorage.getItem('validUntil');
    const cachedConfig = JSON.parse(localStorage.getItem('appConfig') || '{}');
    
    if (!cachedStatus || !cachedServerTime || !cachedValidUntil || !cachedConfig) {
      return false;
    }

    const lastServerTime = new Date(cachedServerTime).getTime();
    const validUntil = new Date(cachedValidUntil).getTime();
    const elapsedTime = Date.now() - lastServerTime;
    const estimatedServerTime = new Date(lastServerTime + elapsedTime);

    const maxOfflineTime = parseInt(cachedConfig.OFFLINE_ACCESS_DURATION);
    if (!maxOfflineTime) {
      return false;
    }

    if (elapsedTime > maxOfflineTime) {
      return false;
    }

    if (estimatedServerTime > new Date(validUntil)) {
      return false;
    }

    return cachedStatus === 'approved';
  };

  const checkUserStatus = async (isImportantAction = false) => {
    if (isCheckingStatus) return false;
    
    setIsCheckingStatus(true);
    const maxRetries = isImportantAction ? 3 : 1;
    let retryCount = 0;

    const attemptCheck = async (): Promise<boolean> => {
      try {
        if (checkOfflineStatus()) {
          setHasAccess(true);
          setIsLoading(false);
          setIsCheckingStatus(false);
          return true;
        }

        const accessCode = localStorage.getItem('accessCode');
        if (!accessCode) {
          setHasAccess(false);
          setIsLoading(false);
          setIsCheckingStatus(false);
          return false;
        }

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/access-manager`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              action: 'check',
              accessCode
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.config) {
          localStorage.setItem('appConfig', JSON.stringify(data.config));
        }
        
        if (data.serverTime) {
          localStorage.setItem('lastServerTime', data.serverTime);
        }
        if (data.validUntil) {
          localStorage.setItem('validUntil', data.validUntil);
        }

        if (data.status === 'expired') {
          localStorage.removeItem('approvalStatus');
          setHasAccess(false);
          setIsLoading(false);
          setIsCheckingStatus(false);
          return false;
        }
        
        if (data.status === 'approved') {
          localStorage.setItem('approvalStatus', 'approved');
          setHasAccess(true);
          setIsLoading(false);
          setIsCheckingStatus(false);
          return true;
        } else {
          localStorage.removeItem('approvalStatus');
          setHasAccess(false);
          setIsLoading(false);
          setIsCheckingStatus(false);
          return false;
        }
      } catch (error) {
        console.error('Failed to check user status:', error);
        if (retryCount < maxRetries - 1) {
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 1000));
          return attemptCheck();
        }
        setIsLoading(false);
        setIsCheckingStatus(false);
        return checkOfflineStatus();
      }
    }

    return attemptCheck();
  };

  useEffect(() => {
    const initialCheck = async () => {
      const lastCheck = localStorage.getItem('lastAccessCheck');
      const now = Date.now();
      const approvalStatus = localStorage.getItem('approvalStatus');
      
      if (lastCheck && approvalStatus === 'approved' && now - parseInt(lastCheck) < 3600000) {
        setHasAccess(true);
        setIsLoading(false);
        return;
      }

      const status = await checkUserStatus();
      if (status) {
        localStorage.setItem('lastAccessCheck', now.toString());
      }
    };

    const preloadMainContent = () => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/newmaincontent';
      document.head.appendChild(link);
    };

    initialCheck();
    preloadMainContent();
  }, []);

  useEffect(() => {
    if (!isLoading && hasAccess && !isNavigating) {
      setIsNavigating(true);
      requestAnimationFrame(() => {
        navigate('/newmaincontent', { replace: true });
      });
    }
  }, [isLoading, hasAccess, navigate]);

  const handleAccessGranted = () => {
    setHasAccess(true);
    setIsLoading(false);
    navigate('/', { replace: true });
  };

  const handleSaveClass = () => {
    if (!className.trim() || !classList.trim()) {
      toast.error('გთხოვთ შეავსოთ ყველა ველი', {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false
      });
      return;
    }

    const students = classList.split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)
      .map(name => ({
        name,
        timestamp: Date.now()
      }));

    const classData: ClassData = {
      name: className.trim(),
      students
    };

    try {
      const savedClasses: ClassData[] = JSON.parse(localStorage.getItem('classes') || '[]');
      
      const filteredClasses = savedClasses.filter((c: ClassData) => 
        c.name.toLowerCase() !== className.trim().toLowerCase()
      );

      localStorage.setItem('classes', JSON.stringify([...filteredClasses, classData]));
      toast.success('კლასი წარმატებით შეინახა', {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false
      });
      
      setClassName('');
      setClassList('');
    } catch (error) {
      console.error('Error saving class:', error);
      toast.error('შეცდომა კლასის შენახვისას', {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false
      });
    }
  };

  useEffect(() => {
    const checkModals = () => {
      const modals = document.querySelectorAll('[role="dialog"]');
      setIsModalOpen(modals.length > 0);
    };

    const observer = new MutationObserver(checkModals);
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {isLoading && <LoadingScreenComponent />}
        <ToastContainer position="bottom-right" />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <LoadingScreenComponent />
              ) : hasAccess ? (
                <Navigate to="/newmaincontent" replace />
              ) : (
                <Navigate to="/request-access" replace />
              )
            }
          />
          <Route
            path="/newmaincontent/*"
            element={
              isLoading ? (
                <LoadingScreenComponent />
              ) : hasAccess ? (
                <NewHomePage />
              ) : (
                <Navigate to="/request-access" replace />
              )
            }
          />
          <Route
            path="/search-list"
            element={
              isLoading ? (
                <LoadingScreenComponent />
              ) : hasAccess ? (
                <>
                  <SearchList 
                    students={students} 
                    setStudents={setStudents}
                    onModalStateChange={setIsModalOpen}
                  />
                  <ClassForm $isVisible={isClassFormVisible}>
                    <h2>კლასის დამატება</h2>
                    <Input
                      type="text"
                      placeholder="კლასის სახელი"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      id="className"
                      name="className"
                    />
                    <TextArea
                      placeholder="მოსწავლეების სია (თითო მოსწავლე ახალ ხაზზე)"
                      value={classList}
                      onChange={(e) => setClassList(e.target.value)}
                      id="classList"
                      name="classList"
                    />
                    <SaveButton onClick={handleSaveClass}>შენახვა</SaveButton>
                    <SaveButton onClick={() => setIsClassFormVisible(false)}>დახურვა</SaveButton>
                  </ClassForm>
                </>
              ) : (
                <Navigate to="/request-access" replace />
              )
            }
          />
          <Route
            path="/request-access"
            element={
              isLoading ? (
                <LoadingScreenComponent />
              ) : hasAccess ? (
                <Navigate to="/newmaincontent" replace />
              ) : (
                <RequestAccess onAccessGranted={handleAccessGranted} />
              )
            }
          />
        </Routes>
      </AppContainer>
    </>
  );
}

export default App;