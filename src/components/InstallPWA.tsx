import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InfoText = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
  max-width: 300px;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const InstallContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InstallButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 14px;
  }
`;

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('Error installing PWA:', err);
    }
  };

  if (!deferredPrompt) return null;

  return (
    <InstallContainer>
      <InfoText>
        თუ ამ ღილაკს დააჭერთ თქვენ შეძლებთ დააინსტალიროთ ვებსაიტი და დადოთ დესკტოპზე და გამოიყენოთ ინტერნეტის გარეშე
      </InfoText>
      <InstallButton onClick={handleInstallClick}>
        დაინსტალირეთ აპლიკაცია
      </InstallButton>
    </InstallContainer>
  );
};

export default InstallPWA;
