import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Edge Function URL
const EDGE_FUNCTION_URL = 'https://loyzwjzsjnikmnuqilmv.functions.supabase.co/access-manager';

interface RequestAccessProps {
  onAccessGranted: () => void;
}

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

const fadeIn = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.98);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
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
  justify-content: center;
  padding: 20px;
  z-index: 1;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`;

const OfflineIndicator = styled.div<{ isOffline: boolean }>`
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${props => props.isOffline ? '#ff4444' : '#44b700'};
  color: white;
  font-size: 14px;
  opacity: ${props => props.isOffline ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  z-index: 1000;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #4CAF50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 10px;
  background: ${props => props.type === 'error' ? 'rgba(255, 87, 34, 0.9)' : 'rgba(76, 175, 80, 0.9)'};
  color: white;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(5px);
`;

const CodeDisplay = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 400px;
`;

const CodeText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const StatusText = styled.p`
  font-size: 16px;
  color: #666;
  margin: 5px 0;
`;

const InstructionButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
  &:hover {
    background: #2980b9;
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
`;

const InstructionList = styled.ol`
  margin: 20px 0;
  padding-left: 20px;
`;

const InstructionItem = styled.li`
  margin: 10px 0;
  line-height: 1.5;
`;

const ExpiryNote = styled.p`
  color: #e74c3c;
  font-weight: bold;
  margin-top: 15px;
`;

const CloseButton = styled.button`
  float: right;
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background: #c0392b;
  }
`;

// დავამატოთ ახალი styled კომპონენტი ფეისბუქის ლინკისთვის
const FacebookLink = styled.a`
  display: block;
  margin-top: 20px;
  color: #3b5998;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RequestAccess: React.FC<RequestAccessProps> = ({ onAccessGranted }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requestCode, setRequestCode] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? window.navigator.onLine : true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ვამოწმებთ ოფლაინ წვდომას
  const checkOfflineAccess = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const wasEverApproved = localStorage.getItem('wasEverApproved') === 'true';
    const lastStatusCheck = localStorage.getItem('statusTimestamp');
    
    if (!wasEverApproved || !lastStatusCheck) return false;
    
    const lastCheckTime = parseInt(lastStatusCheck);
    const now = Date.now();
    const MAX_OFFLINE_TIME = 24 * 60 * 60 * 1000; // 24 საათი
    
    return now - lastCheckTime < MAX_OFFLINE_TIME;
  }, []);

  // ონლაინ სტატუსის მონიტორინგი
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setIsOnline(true);
      checkExistingStatus();
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (checkOfflineAccess()) {
        onAccessGranted();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // თავიდანვე ვამოწმებთ ოფლაინ წვდომას
    if (!window.navigator.onLine && checkOfflineAccess()) {
      onAccessGranted();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onAccessGranted, checkOfflineAccess]);

  useEffect(() => {
    const savedCode = localStorage.getItem('lastRequestCode');
    const savedFirstName = localStorage.getItem('firstName');
    const savedLastName = localStorage.getItem('lastName');
    if (savedCode) {
      setRequestCode(savedCode);
      setFirstName(savedFirstName || '');
      setLastName(savedLastName || '');
    }
  }, []);

  const checkExistingStatus = async () => {
    const userCode = localStorage.getItem('userCode');
    if (!userCode) return;

    try {
      const response = await fetch(`${EDGE_FUNCTION_URL}/status?code=${userCode}&isActive=${!document.hidden}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 429) return;

      const data = await response.json();
      
      if (data.status === 'approved') {
        localStorage.setItem('approvalStatus', 'approved');
        localStorage.setItem('statusTimestamp', Date.now().toString());
        localStorage.setItem('wasEverApproved', 'true');
        navigate('/', { replace: true });
      } else if (data.status === 'blocked') {
        // თუ დაბლოკილია, ვშლით ყველა ლოკალურ მონაცემს
        localStorage.removeItem('userCode');
        localStorage.removeItem('approvalStatus');
        localStorage.removeItem('statusTimestamp');
        localStorage.removeItem('wasEverApproved');
        toast.error('თქვენი წვდომა დაბლოკილია', {
          position: "top-center",
          autoClose: 3000
        });
      }
    } catch (err) {
      console.error('Error checking status:', err);
      // თუ ოფლაინ ვართ და გვაქვს წვდომა, ვაგრძელებთ მუშაობას
      if (!navigator.onLine && checkOfflineAccess()) {
        onAccessGranted();
      }
    }
  };

  useEffect(() => {
    // ვამოწმებთ სტატუსს როცა კომპონენტი ჩაიტვირთება
    checkExistingStatus();

    // ვამოწმებთ სტატუსს როცა ონლაინ ვხდებით
    const handleOnline = () => {
      checkExistingStatus();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [navigate]);

  useEffect(() => {
    if (!requestCode) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `${EDGE_FUNCTION_URL}/status?code=${requestCode}&isActive=true`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        );

        if (response.status === 429) return;

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        if (data.status === 'approved') {
          localStorage.setItem('approvalStatus', 'approved');
          localStorage.setItem('userCode', requestCode);
          localStorage.setItem('statusTimestamp', Date.now().toString());
          localStorage.setItem('wasEverApproved', 'true');
          onAccessGranted();
        } else if (data.status === 'blocked') {
          localStorage.removeItem('lastRequestCode');
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
          localStorage.removeItem('userCode');
          localStorage.removeItem('approvalStatus');
          localStorage.removeItem('statusTimestamp');
          localStorage.removeItem('wasEverApproved');
          setRequestCode(null);
          setFirstName('');
          setLastName('');
          toast.error('თქვენი წვდომა დაბლოკილია. გთხოვთ დაელოდოთ ადმინისტრატორის პასუხს.');
        }
      } catch (err) {
        console.error('Error checking status:', err);
      }
    };
    
    checkStatus();
  }, [requestCode, onAccessGranted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error('გთხოვთ შეავსოთ სახელი და გვარი', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${EDGE_FUNCTION_URL}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.error || 'მოთხოვნის გაგზავნა ვერ მოხერხდა', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        return;
      }

      localStorage.setItem('lastRequestCode', data.code);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      setRequestCode(data.code);
      
      toast.success('მოთხოვნა წარმატებით გაიგზავნა', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (err: any) {
      toast.error('მოთხოვნის გაგზავნა ვერ მოხერხდა', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <OfflineIndicator isOffline={!isOnline}>
        ხაზგარეშე რეჟიმი
      </OfflineIndicator>
      {!requestCode ? (
        <Form onSubmit={handleSubmit}>
          <Title>მოთხოვნის გაგზავნა</Title>
          <Input
            type="text"
            placeholder="ტრანზაქციის ავტორის სახელი"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            id="firstName"
            name="firstName"
          />
          <Input
            type="text"
            placeholder="ტრანზაქციის ავტორის გვარი"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            id="lastName"
            name="lastName"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'იგზავნება...' : 'გაგზავნა'}
          </Button>
        </Form>
      ) : (
        <>
          {localStorage.getItem('approvalStatus') === 'approved' ? (
            <LoadingContainer>
              <Spinner />
              <LoadingText>სტატუსი მოწმდება...</LoadingText>
            </LoadingContainer>
          ) : (
            <CodeDisplay>
              <CodeText>{requestCode}</CodeText>
              <StatusText>
                თქვენი კოდი: {requestCode}
              </StatusText>
              <StatusText>
                გთხოვთ დაელოდოთ ადმინისტრატორის დადასტურებას
              </StatusText>
            </CodeDisplay>
          )}
        </>
      )}
      <InstructionButton onClick={() => setIsModalOpen(true)}>
        ინსტრუქცია
      </InstructionButton>

      <Modal isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
          <h2>შესვლის ინსტრუქცია</h2>
          <InstructionList>
            <InstructionItem>
             შეასრულეთ ტრანზაქცია: 5167460431565880
            </InstructionItem>
            <InstructionItem>
              შეიყვანეთ ტრანზაქციის ავტორის სახელი და გვარი
            </InstructionItem>
            <InstructionItem>
              დააჭირეთ გამოგზავნას
            </InstructionItem>
          </InstructionList>
          <p>
            ამ ყველაფრის შემდეგ ადმინისტრატორი დაგიდასტურებთ მოთხოვნას და 
            გადამისამართდებით მთავარ გვერდზე
          </p>
          <ExpiryNote>
            1 წლის განმავლობაში
          </ExpiryNote>
          <FacebookLink 
            href="https://www.facebook.com/profile.php?id=61567812722184"
            target="_blank"
            rel="noopener noreferrer"
          >
            დამატებითი ინფორმაციისთვის ეწვიეთ ჩვენს ფეისბუქ ჯგუფს
          </FacebookLink>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default RequestAccess;
