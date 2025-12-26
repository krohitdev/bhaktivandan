import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import DeityPage from './components/DeityPage';
import ContactUs from './components/ContactUs';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
// import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs onBack={() => window.history.back()} />} />
          <Route path="/deity/:id" element={<DeityPage />} />
          {/* Generic route for content type pages: /aarti/:id, /chalisa/:id, /mantra/:id */}
          <Route path="/:type/:id" element={<DeityPage />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);