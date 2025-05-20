
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Global error handler for async response errors (commonly caused by browser extensions)
const setupGlobalErrorHandling = () => {
  // Handle synchronous errors
  window.addEventListener('error', (event) => {
    if (event.message && 
        typeof event.message === 'string' && 
        event.message.includes('asynchronous response by returning true')) {
      event.preventDefault();
      return false;
    }
    return false;
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || '';
    if (typeof message === 'string' && 
        message.includes('asynchronous response by returning true')) {
      event.preventDefault();
      return false;
    }
    return false;
  });
};

// Initialize error handling
setupGlobalErrorHandling();

// Render the app
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
