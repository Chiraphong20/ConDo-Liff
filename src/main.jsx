import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './CSS/index.css';
import App from './App.jsx'
import VConsole from 'vconsole';
new VConsole();
if (import.meta.env.MODE === 'development') {
  import('vconsole').then((VConsole) => {
    new VConsole.default();
  });
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
