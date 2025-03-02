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
    console.log('InstallPWA: კომპონენტი ჩაიტვირთა');
    
    const handler = (e: Event) => {
      console.log('InstallPWA: beforeinstallprompt ივენთი დაფიქსირდა', e);
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    console.log('InstallPWA: ვამოწმებთ PWA-ს სტატუსს...');
    
    // ვამოწმებთ არის თუ არა უკვე დაინსტალირებული
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('InstallPWA: აპლიკაცია უკვე დაინსტალირებულია');
      return;
    } else {
      console.log('InstallPWA: აპლიკაცია არ არის დაინსტალირებული');
    }

    window.addEventListener('beforeinstallprompt', handler);
    console.log('InstallPWA: დაემატა beforeinstallprompt ივენთის მსმენელი');

    // ვამოწმებთ აპლიკაციის დაინსტალების სტატუსის ცვლილებას
    window.addEventListener('appinstalled', (e) => {
      console.log('InstallPWA: აპლიკაცია წარმატებით დაინსტალირდა', e);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      console.log('InstallPWA: წაიშალა beforeinstallprompt ივენთის მსმენელი');
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('InstallPWA: დაჭერილია ინსტალაციის ღილაკი');
    
    if (!deferredPrompt) {
      console.log('InstallPWA: deferredPrompt არ არის ხელმისაწვდომი');
      return;
    }

    try {
      console.log('InstallPWA: იწყება ინსტალაციის პროცესი...');
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('InstallPWA: მომხმარებელმა დაეთანხმა ინსტალაციას');
      } else {
        console.log('InstallPWA: მომხმარებელმა უარი თქვა ინსტალაციაზე');
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('InstallPWA: შეცდომა ინსტალაციისას:', err);
    }
  };

  if (!deferredPrompt) {
    console.log('InstallPWA: deferredPrompt არ არის, კომპონენტი არ გამოჩნდება');
    return null;
  }

  console.log('InstallPWA: კომპონენტი გამოჩნდება');
  return (
    <InstallButton onClick={handleInstallClick}>
      დაინსტალირეთ აპლიკაცია
    </InstallButton>
  );
};

export default InstallPWA;
