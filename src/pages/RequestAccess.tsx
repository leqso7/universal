import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Edge Function URL
const EDGE_FUNCTION_URL = 'https://loyzwjzsjnikmnuqilmv.functions.supabase.co/access-manager';

interface RequestAccessProps {
  onAccessGranted: () => void;
}

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background: linear-gradient(120deg, #ffeb3b 0%, #8bc34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
`;

const Form = styled.form`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

const Button = styled.button`
  background: #4285f4;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background: #3367d6;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CodeDisplay = styled.div`
  text-align: center;
  margin-top: 20px;
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

const RequestAccess: React.FC<RequestAccessProps> = ({ onAccessGranted }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requestCode, setRequestCode] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // ვამოწმებთ ოფლაინ წვდომას
  const checkOfflineAccess = () => {
    const wasEverApproved = localStorage.getItem('wasEverApproved') === 'true';
    const lastStatusCheck = localStorage.getItem('statusTimestamp');
    
    if (!wasEverApproved || !lastStatusCheck) return false;
    
    const lastCheckTime = parseInt(lastStatusCheck);
    const now = Date.now();
    const MAX_OFFLINE_TIME = 24 * 60 * 60 * 1000; // 24 საათი
    
    return now - lastCheckTime < MAX_OFFLINE_TIME;
  };

  // ონლაინ სტატუსის მონიტორინგი
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // როცა ონლაინ ვართ, მაშინვე ვამოწმებთ სტატუსს
      checkExistingStatus();
    };

    const handleOffline = () => {
      setIsOnline(false);
      // თუ გვაქვს ოფლაინ წვდომა, ვაგრძელებთ მუშაობას
      if (checkOfflineAccess()) {
        onAccessGranted();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // თავიდანვე ვამოწმებთ ოფლაინ წვდომას
    if (!navigator.onLine && checkOfflineAccess()) {
      onAccessGranted();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onAccessGranted]);

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
          `${EDGE_FUNCTION_URL}/status?code=${requestCode}&isActive=${!document.hidden}`,
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

    // შემოწმება ყოველ 5 წამში
    const interval = setInterval(() => {
      if (navigator.onLine) {
        checkStatus();
      }
    }, 5000);
    
    checkStatus(); // პირველი შემოწმება

    return () => clearInterval(interval);
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
      <Form onSubmit={handleSubmit}>
        <Title>მოთხოვნის გაგზავნა</Title>
        {!requestCode ? (
          <>
            <Input
              type="text"
              placeholder="სახელი"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
            />
            <Input
              type="text"
              placeholder="გვარი"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'იგზავნება...' : 'გაგზავნა'}
            </Button>
          </>
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
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default RequestAccess;
