import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { DEITIES } from './constants';

const prerenderRoutes = [
  "/",
  ...DEITIES.map(d => `/aarti/${d.name.toLowerCase()}`),
  ...DEITIES.map(d => `/chalisa/${d.name.toLowerCase()}`),
  ...DEITIES.map(d => `/mantra/${d.name.toLowerCase()}`),

]

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      base: '/',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'router-vendor': ['react-router-dom'],
              'ai-vendor': ['@google/genai'],
              'ui-vendor': ['react-helmet-async', '@hcaptcha/react-hcaptcha'],
            }
          }
        },
        chunkSizeWarningLimit: 1000, // Increase limit to 1000kb
      }
    }
})