import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'

// Service Worker-ის რეგისტრაცია
if ('serviceWorker' in navigator && 'SyncManager' in window) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
      
      // ვარეგისტრირებთ პერიოდულ სინქრონიზაციას
      if ('periodicSync' in registration) {
        const periodicSync = registration.periodicSync as any;
        periodicSync.register('status-check', {
          minInterval: 12 * 60 * 60 * 1000 // 12 საათში ერთხელ
        }).catch(console.error);
      }
    })
    .catch(error => console.error('Service Worker registration failed:', error));
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
