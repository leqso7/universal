import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Force the banner to be visible for testing
const FORCE_INSTALL_BANNER = true;

const InstallButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "📱";
    margin-right: 10px;
    font-size: 24px;
  }

  &:hover {
    background: #45a049;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

    &:after {
      content: "თუ ამ ღილაკს დააჭერთ თქვენ შეძლებთ დააინსტალიროთ ვებსაიტი და დადოთ დესკტოპზე და გამოიყენოთ ინტერნეტის გარეშე";
      position: absolute;
      bottom: 100%;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px;
      border-radius: 8px;
      font-size: 16px;
      width: max-content;
      max-width: 300px;
      margin-bottom: 10px;
      white-space: normal;
      line-height: 1.4;
      z-index: 1000;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 16px;
  }
`;

const DebugButton = styled.button`
  background: #ff9800;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;

const DebugInfo = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 5px;
  max-width: 300px;
  word-break: break-word;
`;

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [debugInfo, setDebugInfo] = useState('დეტექტირება...');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [detailedInfo, setDetailedInfo] = useState('');

  useEffect(() => {
    console.log('InstallPWA component mounted');
    
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is already installed');
      setIsAppInstalled(true);
      setDebugInfo('აპლიკაცია უკვე დაინსტალირებულია');
    } else {
      console.log('App is not installed yet');
      setDebugInfo('არ არის დაინსტალირებული, ველოდებით beforeinstallprompt ივენთს');
    }

    const handler = (e: Event) => {
      e.preventDefault();
      console.log('🟢 beforeinstallprompt fired successfully');
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setDebugInfo('ინსტალაციის მზადყოფნა');
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    // Log browser details
    const userAgent = navigator.userAgent;
    console.log('Browser details:', userAgent);
    
    // Set detailed info
    setDetailedInfo(`
      Browser: ${userAgent}
      Protocol: ${window.location.protocol}
      Hostname: ${window.location.hostname}
      Path: ${window.location.pathname}
      Hash: ${window.location.hash}
      Service Worker: ${'serviceWorker' in navigator ? 'Supported' : 'Not Supported'}
      Display Mode: ${window.matchMedia('(display-mode: standalone)').matches ? 'Standalone' : 'Browser'}
    `);
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
      console.log('PWA was installed');
      setDebugInfo('PWA დაინსტალირდა წარმატებით');
    });

    // Set a timeout to check if beforeinstallprompt fired
    setTimeout(() => {
      if (!deferredPrompt) {
        console.log('⚠️ beforeinstallprompt did not fire within 3 seconds');
        setDebugInfo('beforeinstallprompt არ გააქტიურდა, შესაძლოა ბრაუზერის შეზღუდვების გამო');
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('⚠️ No installation prompt available');
      setDebugInfo('ინსტალაციის პრომპტი არ არის ხელმისაწვდომი');
      return;
    }

    try {
      console.log('Triggering install prompt');
      setDebugInfo('ინსტალაციის პროცესი დაიწყო');
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setDebugInfo('მომხმარებელმა დაადასტურა ინსტალაცია');
      } else {
        console.log('User dismissed the install prompt');
        setDebugInfo('მომხმარებელმა უარყო ინსტალაცია');
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('Error installing PWA:', err);
      setDebugInfo(`შეცდომა: ${err}`);
    }
  };

  const checkInstallationEligibility = () => {
    // Log device and browser support information
    console.log('Navigator details:', {
      standalone: window.matchMedia('(display-mode: standalone)').matches,
      serviceWorker: 'serviceWorker' in navigator,
      userAgent: navigator.userAgent
    });
    
    setShowDebugInfo(!showDebugInfo);
    setDebugInfo(showDebugInfo ? 'დეტალების ჩვენება' : 'დეტალების დამალვა');
  };

  return (
    <div>
      {(deferredPrompt || FORCE_INSTALL_BANNER) && !isAppInstalled && (
        <InstallButton onClick={handleInstallClick}>
          დააინსტალირეთ აპლიკაცია
        </InstallButton>
      )}
      <DebugButton onClick={checkInstallationEligibility}>
        {debugInfo}
      </DebugButton>
      {showDebugInfo && (
        <DebugInfo>
          {detailedInfo}
        </DebugInfo>
      )}
    </div>
  );
};

export default InstallPWA;
