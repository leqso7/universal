import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

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

    &:after {
      content: "თუ ამ ღილაკს დააჭერთ თქვენ შეძლებთ დააინსტალიროთ ვებსაიტი და დადოთ დესკტოპზე და გამოიყენოთ ინტერნეტის გარეშე";
      position: absolute;
      bottom: 100%;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-size: 14px;
      width: max-content;
      max-width: 300px;
      margin-bottom: 10px;
      white-space: normal;
      line-height: 1.4;
    }
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
      console.log('beforeinstallprompt event triggered');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    console.log('InstallPWA component mounted');

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('ინსტალაცია ამჟამად არ არის ხელმისაწვდომი. გთხოვთ სცადოთ მოგვიანებით.');
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('Error installing PWA:', err);
    }
  };

  console.log('deferredPrompt state:', !!deferredPrompt);

  return (
    <InstallButton onClick={handleInstallClick}>
      დაინსტალირეთ აპლიკაცია
    </InstallButton>
  );
};

export default InstallPWA;
