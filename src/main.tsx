import { StrictMode } from 'react'
import 'reflect-metadata';
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'
import App         from './App.tsx'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Make sure there is an element with id "root" in your index.html.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
    <Toaster richColors position="top-right" />
  </StrictMode>,
)
