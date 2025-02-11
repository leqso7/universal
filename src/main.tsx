import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'

// დავამატოთ ტიპები window ობიექტისთვის
declare global {
  interface Window {
    deferredPrompt: any;
  }
}

// Service Worker-ის რეგისტრაცია
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/universal/sw.js', {
      scope: '/universal/'
    }).then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
      
      // დავამატოთ beforeinstallprompt ივენთის მოსმენა
      window.addEventListener('beforeinstallprompt', (e) => {
        // შევინახოთ ივენთი გლობალურად
        window.deferredPrompt = e;
        // ვაჩვენოთ ინსტალაციის ღილაკი
        const installButton = document.createElement('button');
        installButton.textContent = 'დააინსტალირე აპლიკაცია';
        installButton.className = 'install-button';
        installButton.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 20px;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          z-index: 9999;
        `;
        
        installButton.onclick = async () => {
          if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            const { outcome } = await window.deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            window.deferredPrompt = null;
            installButton.remove();
          }
        };
        
        document.body.appendChild(installButton);
      });
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
