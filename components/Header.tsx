// filepath: components/Header.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  showNavButtons?: boolean; // Optional: Hide nav buttons for custom headers
}

const Header: React.FC<HeaderProps> = ({ showNavButtons = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-serif font-bold text-white text-2xl shadow-md">
            ॐ
          </div>
          <div>
            <h1 className="font-[Noto Serif Devanagari] text-2xl font-bold text-[#3A1F0F] leading-tight">
              भक्ति वंदन
            </h1>
            <p className="text-sm text-orange-600 font-medium tracking-wide uppercase">
              श्रद्धा • भक्ति • साधना
            </p>
          </div>
        </div>
        {showNavButtons && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/about')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive('/about')
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-orange-600'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigate('/contact-us')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive('/contact-us')
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-orange-600'
              }`}
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;