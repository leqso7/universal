import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import RequestAccess from './pages/RequestAccess'
import SearchList, { Student } from './components/SearchList'
import InstallPWA from './components/InstallPWA'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const InstallContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
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

function App() {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false); 
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [students, setStudents] = useState<Student[]>([]);
  const [className, setClassName] = useState('');
  const [classList, setClassList] = useState('');
  const [isClassFormVisible, setIsClassFormVisible] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkUserStatus(true);
      // ვარეგისტრირებთ background sync-ს
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          if ('sync' in registration) {
            (registration as any).sync.register('status-check')
              .catch((err: Error) => console.error('Background sync registration failed:', err));
          }
        });
      }
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkUserStatus = async (isImportantAction = false) => {
    const maxRetries = isImportantAction ? 3 : 1;
    let retryCount = 0;

    // ოფლაინ ლოგიკა
    const checkOfflineStatus = () => {
      const cachedStatus = localStorage.getItem('approvalStatus');
      const cachedTimestamp = parseInt(localStorage.getItem('statusTimestamp') || '0');
      const now = Date.now();
      const OFFLINE_ACCESS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 დღე

      if (cachedStatus === 'approved' && (now - cachedTimestamp) < OFFLINE_ACCESS_DURATION) {
        return true;
      }
      return false;
    };

    const tryCheck = async (): Promise<boolean> => {
      try {
        if (!navigator.onLine) {
          const offlineStatus = checkOfflineStatus();
          console.log('Offline mode: using cached status');
          setHasAccess(offlineStatus);
          return offlineStatus;
        }

        const accessCode = localStorage.getItem('accessCode');
        if (!accessCode) {
          console.log('No access code found');
          setHasAccess(false);
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
        
        // თუ სერვერი გვეუბნება რომ ქეში გამოვიყენოთ
        if (data.status === 'cached') {
          const offlineStatus = checkOfflineStatus();
          console.log('Server suggested using cache:', data.message);
          setHasAccess(offlineStatus);
          return offlineStatus;
        }
        
        if (data.status === 'approved') {
          localStorage.setItem('approvalStatus', 'approved');
          localStorage.setItem('statusTimestamp', Date.now().toString());
          setHasAccess(true);
          return true;
        } else {
          localStorage.removeItem('approvalStatus');
          localStorage.removeItem('statusTimestamp');
          setHasAccess(false);
          return false;
        }
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          // ქსელის პრობლემაა, ვიყენებთ ქეშს
          const offlineStatus = checkOfflineStatus();
          console.log('Network error: using cached status');
          setHasAccess(offlineStatus);
          return offlineStatus;
        }
        
        console.error('Error checking status:', error);
        retryCount++;
        
        if (retryCount < maxRetries) {
          const delay = 1000 * Math.pow(2, retryCount); // ექსპონენციალური backoff
          console.log(`Retrying in ${delay}ms... (${retryCount}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return tryCheck();
        }
        
        throw error;
      }
    };

    try {
      return await tryCheck();
    } catch (error) {
      console.error('Final error checking user status:', error);
      const offlineStatus = checkOfflineStatus();
      setHasAccess(offlineStatus);
      return offlineStatus;
    }
  };

  const handleImportantAction = async () => {
    await checkUserStatus(true);
    // აქ შეგიძლია გააგრძელო ქმედება თუ სტატუსი approved არის
  };

  useEffect(() => {
    // ვამოწმებთ სტატუსს საიტის გახსნისას
    checkUserStatus();

    // ინტელიგენტური ინტერვალი
    const CHECK_INTERVAL = 30 * 60 * 1000; // 30 წუთში ერთხელ
    const ACTIVE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 წუთში ერთხელ

    let lastInteraction = Date.now();
    let checkInterval: NodeJS.Timeout;

    const handleUserInteraction = () => {
      lastInteraction = Date.now();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkUserStatus();
      }
    };

    const startChecking = () => {
      checkInterval = setInterval(() => {
        const timeSinceLastInteraction = Date.now() - lastInteraction;
        
        // თუ მომხმარებელი აქტიურია ბოლო 30 წუთის განმავლობაში
        if (timeSinceLastInteraction < 30 * 60 * 1000) {
          checkUserStatus();
        }
      }, navigator.onLine ? ACTIVE_CHECK_INTERVAL : CHECK_INTERVAL);
    };

    // ვიწყებთ შემოწმებას
    startChecking();

    // ვუსმენთ მომხმარებლის აქტივობას
    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('keypress', handleUserInteraction);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    
    // ვამოწმებთ როცა ტაბს უბრუნდება
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(checkInterval);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('keypress', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
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

  return (
    <AppContainer>
      <GlobalStyle />
      {!isOnline && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          background: '#ff9800', 
          color: 'white', 
          padding: '10px', 
          textAlign: 'center',
          zIndex: 1000 
        }}>
          ოფლაინ რეჟიმი - ზოგიერთი ფუნქცია შეზღუდულია
        </div>
      )}
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route
          path="/"
          element={
            hasAccess ? (
              <>
                <SearchList students={students} setStudents={setStudents} />
                <ClassForm $isVisible={isClassFormVisible}>
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
                  <SaveButton onClick={() => setIsClassFormVisible(false)}>დახურვა</SaveButton>
                </ClassForm>
              </>
            ) : (
              <Navigate to="/request" replace />
            )
          }
        />
        <Route
          path="/request"
          element={
            hasAccess ? (
              <Navigate to="/" replace />
            ) : (
              <RequestAccess onAccessGranted={handleAccessGranted} />
            )
          }
        />
      </Routes>
      <InstallContainer>
        <InstallPWA />
      </InstallContainer>
    </AppContainer>
  );
}

export default App;