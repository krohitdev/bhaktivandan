import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import App from './App';
import DeityPage from './components/DeityPage';
import ContactUs from './components/ContactUs';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import { pageView } from './src/utils/analytics';
import { Canonical } from './components/Canonical';
// import './index.css';

const Analytics = () => {
  const location = useLocation();
  useEffect(() => {
    pageView(location.pathname);
    console.log('>>', location.pathname);
  }, [location]);
  return null;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Analytics />
        <Canonical />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs onBack={() => window.history.back()} />} />
          <Route path="/deity/:id" element={<DeityPage />} />
          {/* Generic route for content type pages: /aarti/:id, /chalisa/:id, /mantra/:id */}
          <Route path="/:type/:id" element={<DeityPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);