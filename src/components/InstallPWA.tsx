import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// გლობალური ცვლადი, რომელიც შეინახავს beforeinstallprompt ივენთს
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;

// ფუნქცია, რომელიც ამოწმებს არის თუ არა PWA დაინსტალირებული
export const isPWAInstalled = (): boolean => {
  // შევამოწმოთ არის თუ არა აპლიკაცია გაშვებული standalone რეჟიმში
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // iOS-ზე შევამოწმოთ არის თუ არა აპლიკაცია დამატებული მთავარ ეკრანზე
  if (
    (navigator as any).standalone || 
    window.navigator.userAgent.match(/iPhone|iPad|iPod/) && 
    !window.navigator.userAgent.match(/Safari/)
  ) {
    return true;
  }
  
  return false;
};

// ფუნქცია, რომელიც ამოწმებს არის თუ არა PWA დაინსტალირებადი
export const isPWAInstallable = (): boolean => {
  // შევამოწმოთ არის თუ არა globalDeferredPrompt ხელმისაწვდომი
  if (globalDeferredPrompt) {
    return true;
  }
  
  // შევამოწმოთ არის თუ არა ბრაუზერი მხარდაჭერილი
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(navigator.userAgent);
  const isSamsung = /SamsungBrowser/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const isOpera = /OPR/.test(navigator.userAgent);
  
  // შევამოწმოთ არის თუ არა HTTPS
  const isHttps = window.location.protocol === 'https:';
  
  // შევამოწმოთ არის თუ არა სერვის ვორკერი მხარდაჭერილი
  const hasServiceWorker = 'serviceWorker' in navigator;
  
  // შევამოწმოთ არის თუ არა მანიფესტი ხელმისაწვდომი
  const hasManifest = document.querySelectorAll('link[rel="manifest"]').length > 0;
  
  return (isChrome || isEdge || isSamsung || isFirefox || isOpera) && 
         isHttps && 
         hasServiceWorker && 
         hasManifest;
};

// ივენთის დამჭერი, რომელიც გლობალურად დარეგისტრირდება
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  console.log('🟢 beforeinstallprompt fired and captured globally');
  globalDeferredPrompt = e as BeforeInstallPromptEvent;
});

// ფუნქცია, რომელიც ხელით გამოიწვევს ბრაუზერის ჩაშენებულ PWA დაინსტალირების ღილაკს
export const triggerInstallPrompt = async (): Promise<boolean> => {
  if (globalDeferredPrompt) {
    try {
      console.log('Manually triggering install prompt');
      await globalDeferredPrompt.prompt();
      const choiceResult = await globalDeferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        globalDeferredPrompt = null;
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    } catch (err) {
      console.error('Error triggering install prompt:', err);
      return false;
    }
  } else {
    console.log('No deferred prompt available');
    return false;
  }
};

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
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
    }
  }

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
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [debugInfo, setDebugInfo] = useState('დეტექტირება...');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [detailedInfo, setDetailedInfo] = useState('');
  const [installationAttempted, setInstallationAttempted] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    console.log('InstallPWA component mounted');
    
    // Check if app is already installed
    if (isPWAInstalled()) {
      console.log('App is already installed');
      setIsAppInstalled(true);
      setDebugInfo('აპლიკაცია უკვე დაინსტალირებულია');
    } else {
      console.log('App is not installed yet');
      setDebugInfo('არ არის დაინსტალირებული, ველოდებით beforeinstallprompt ივენთს');
      
      // Check if app is installable
      if (isPWAInstallable()) {
        console.log('App is installable');
        setShowInstallButton(true);
      } else {
        console.log('App is not installable yet');
        setShowInstallButton(true); // ვაჩვენოთ მაინც, რადგან შეიძლება მოგვიანებით გახდეს დაინსტალირებადი
      }
    }
    
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
      Global Prompt Available: ${globalDeferredPrompt ? 'Yes' : 'No'}
      Is Installed: ${isPWAInstalled() ? 'Yes' : 'No'}
      Is Installable: ${isPWAInstallable() ? 'Yes' : 'No'}
    `);
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      globalDeferredPrompt = null;
      console.log('PWA was installed');
      setDebugInfo('PWA დაინსტალირდა წარმატებით');
      setShowInstallButton(false);
    });

    // შევამოწმოთ ყოველ 2 წამში, ხომ არ გააქტიურდა globalDeferredPrompt
    const checkInterval = setInterval(() => {
      if (globalDeferredPrompt && !isAppInstalled) {
        console.log('Global deferred prompt is now available');
        setDetailedInfo(prev => prev + '\nGlobal Prompt Available: Yes');
        setShowInstallButton(true);
      }
      
      // შევამოწმოთ ხომ არ დაინსტალირდა აპლიკაცია
      if (isPWAInstalled()) {
        console.log('App is now installed');
        setIsAppInstalled(true);
        setShowInstallButton(false);
        clearInterval(checkInterval);
      }
    }, 2000);

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
      clearInterval(checkInterval);
    };
  }, []);

  const handleInstallClick = async () => {
    setInstallationAttempted(true);
    
    if (isPWAInstallable()) {
      const success = await triggerInstallPrompt();
      
      if (success) {
        setDebugInfo('მომხმარებელმა დაადასტურა ინსტალაცია');
      } else {
        console.log('⚠️ Installation failed or was dismissed');
        setDebugInfo('ინსტალაცია ვერ მოხერხდა ან უარყოფილ იქნა');
        handleManualInstall();
      }
    } else {
      console.log('⚠️ PWA is not installable');
      setDebugInfo('PWA არ არის დაინსტალირებადი');
      handleManualInstall();
    }
  };

  const checkInstallationEligibility = () => {
    // Log device and browser support information
    console.log('Navigator details:', {
      standalone: window.matchMedia('(display-mode: standalone)').matches,
      serviceWorker: 'serviceWorker' in navigator,
      userAgent: navigator.userAgent,
      globalPromptAvailable: globalDeferredPrompt ? 'Yes' : 'No',
      isInstalled: isPWAInstalled(),
      isInstallable: isPWAInstallable()
    });
    
    setShowDebugInfo(!showDebugInfo);
    setDebugInfo(showDebugInfo ? 'დეტალების ჩვენება' : 'დეტალების დამალვა');
  };

  const handleManualInstall = () => {
    const message = `
      PWA-ს დასაინსტალირებლად:
      
      1. Chrome-ში: დააჭირეთ მისამართის ველის მარჯვენა მხარეს ინსტალაციის ღილაკს ან მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე აპლიკაცია'
      2. Safari-ში (iOS): დააჭირეთ 'გაზიარება' ღილაკს და აირჩიეთ 'დაამატე მთავარ ეკრანზე'
      3. Edge-ში: დააჭირეთ მენიუს ღილაკს (სამი წერტილი) და აირჩიეთ 'დააინსტალირე'
    `;
    alert(message);
  };

  // ვაჩვენოთ ღილაკი მხოლოდ თუ აპლიკაცია არ არის დაინსტალირებული
  if (isAppInstalled) {
    return null;
  }

  return (
    <div>
      {showInstallButton && (
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
