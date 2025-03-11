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

const ManualInstallButton = styled(InstallButton)`
  background: #2196F3;

  &:hover {
    background: #0b7dda;
  }
`;

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [debugInfo, setDebugInfo] = useState('დეტექტირება...');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [detailedInfo, setDetailedInfo] = useState('');
  const [installationAttempted, setInstallationAttempted] = useState(false);

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
      Icons: ${ 
        Array.from(document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]'))
          .map((el: any) => el.href)
          .join(', ')
      }
    `);
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
      console.log('PWA was installed');
      setDebugInfo('PWA დაინსტალირდა წარმატებით');
    });

    // Manual check for PWA installability criteria
    const checkInstallability = async () => {
      try {
        // Check for HTTPS
        if (window.location.protocol !== 'https:') {
          console.log('⚠️ Not using HTTPS');
          setDebugInfo('PWA requires HTTPS');
        }
        
        // Check manifest
        const manifestLinks = document.querySelectorAll('link[rel="manifest"]');
        if (manifestLinks.length === 0) {
          console.log('⚠️ No manifest found');
          setDebugInfo('მანიფესტი ვერ მოიძებნა');
        } else {
          console.log('✅ Manifest found');
          // Try to fetch the manifest
          try {
            const manifestLink = manifestLinks[0] as HTMLLinkElement;
            const response = await fetch(manifestLink.href);
            if (response.ok) {
              const manifest = await response.json();
              console.log('Manifest content:', manifest);
            } else {
              console.log('⚠️ Manifest fetch failed:', response.status);
            }
          } catch (error) {
            console.error('Error fetching manifest:', error);
          }
        }
        
        // Check service worker
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          if (registrations.length === 0) {
            console.log('⚠️ No service worker registered');
            setDebugInfo('სერვის ვორკერი არ არის რეგისტრირებული');
          } else {
            console.log('✅ Service worker registered:', registrations);
          }
        }

        // Check icons
        const icons = Array.from(document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]'));
        for (const icon of icons) {
          const iconEl = icon as HTMLLinkElement;
          try {
            const response = await fetch(iconEl.href);
            if (!response.ok) {
              console.log(`⚠️ Icon at ${iconEl.href} failed to load: ${response.status}`);
            } else {
              console.log(`✅ Icon at ${iconEl.href} loaded successfully`);
            }
          } catch (error) {
            console.error(`Error fetching icon at ${iconEl.href}:`, error);
          }
        }
      } catch (err) {
        console.error('Error checking installability:', err);
      }
    };
    
    checkInstallability();

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    setInstallationAttempted(true);
    
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

  const handleManualInstall = () => {
    const message = `
      PWA-ს დასაინსტალირებლად:
      
      1. Chrome-ში: დააჭირეთ მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე აპლიკაცია'
      2. Safari-ში (iOS): დააჭირეთ 'გაზიარება' ღილაკს და აირჩიეთ 'დაამატე მთავარ ეკრანზე'
      3. Edge-ში: დააჭირეთ მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე'
    `;
    alert(message);
  };

  return (
    <div>
      {deferredPrompt && !isAppInstalled && (
        <InstallButton onClick={handleInstallClick}>
          დააინსტალირეთ აპლიკაცია
        </InstallButton>
      )}
      
      {!deferredPrompt && !isAppInstalled && installationAttempted && (
        <ManualInstallButton onClick={handleManualInstall}>
          მიიღეთ დაინსტალირების ინსტრუქცია
        </ManualInstallButton>
      )}
      
      {!isAppInstalled && !installationAttempted && (
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
