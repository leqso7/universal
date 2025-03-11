import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// გლობალური ცვლადი, რომელიც შეინახავს beforeinstallprompt ივენთს
let deferredPrompt: BeforeInstallPromptEvent | null = null;

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
  if (deferredPrompt) {
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
  // ვაჩერებთ ბრაუზერის ავტომატურ ქცევას
  e.preventDefault();
  console.log('🟢 beforeinstallprompt ივენთი დაფიქსირდა და შენახულია');
  // შევინახოთ ივენთი, რომ შემდეგ გამოვიყენოთ
  deferredPrompt = e as BeforeInstallPromptEvent;
});

// ფუნქცია, რომელიც ხელით გამოიწვევს ბრაუზერის ჩაშენებულ PWA დაინსტალირების ღილაკს
export const triggerInstallPrompt = async (): Promise<boolean> => {
  if (deferredPrompt) {
    try {
      console.log('Manually triggering install prompt');
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        deferredPrompt = null;
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
      content: "დააინსტალირეთ აპლიკაცია და გამოიყენეთ ინტერნეტის გარეშე";
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
  const [showButton, setShowButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // შევამოწმოთ არის თუ არა აპლიკაცია უკვე დაინსტალირებული
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('აპლიკაცია უკვე დაინსტალირებულია');
      setIsInstalled(true);
      return;
    }

    // თუ deferredPrompt უკვე არსებობს, ვაჩვენოთ ღილაკი
    if (deferredPrompt) {
      setShowButton(true);
    }

    // ვუსმინოთ appinstalled ივენთს
    window.addEventListener('appinstalled', () => {
      console.log('აპლიკაცია დაინსტალირდა');
      setIsInstalled(true);
      setShowButton(false);
      deferredPrompt = null;
    });

    // ვუსმინოთ beforeinstallprompt ივენთს კომპონენტის შიგნითაც
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('beforeinstallprompt ივენთი დაფიქსირდა კომპონენტში');
      deferredPrompt = e as BeforeInstallPromptEvent;
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // ყოველ 2 წამში შევამოწმოთ deferredPrompt
    const checkInterval = setInterval(() => {
      if (deferredPrompt && !isInstalled) {
        setShowButton(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearInterval(checkInterval);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('დაინსტალირების პრომპტი არ არის ხელმისაწვდომი');
      return;
    }

    // ვაჩვენოთ დაინსტალირების პრომპტი
    deferredPrompt.prompt();

    // ველოდებით მომხმარებლის არჩევანს
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`მომხმარებელმა აირჩია: ${outcome}`);

    // გამოყენების შემდეგ ვასუფთავებთ deferredPrompt-ს
    deferredPrompt = null;
    setShowButton(false);
  };

  // თუ აპლიკაცია უკვე დაინსტალირებულია ან ღილაკი არ უნდა ჩანდეს, არაფერი გამოვაჩინოთ
  if (isInstalled || !showButton) {
    return null;
  }

  return (
    <InstallButton onClick={handleInstallClick}>
      დააინსტალირეთ აპლიკაცია
    </InstallButton>
  );
};

export default InstallPWA;
