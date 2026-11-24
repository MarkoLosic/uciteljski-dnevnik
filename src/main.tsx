import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { detectLocaleFromPath, loadDictionary } from './i18n/clientDictionaries';
import './index.css';

// Učitaj samo rječnik aktivnog jezika prije prvog iscrtavanja (bez preuzimanja ostala 4 jezika).
loadDictionary(detectLocaleFromPath(window.location.pathname)).finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
