import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/class-manager-./',
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['logo.webp'],
      manifest: {
        name: 'Class Manager',
        short_name: 'Class Manager',
        description: 'A simple class management application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/class-manager-./',
        scope: '/class-manager-./',
        icons: [
          {
            src: 'logo.webp',
            sizes: '192x192 512x512',
            type: 'image/webp',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
