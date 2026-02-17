// filepath: components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-stone-100 text-center text-stone-500 border-t border-stone-200">
      <div className="flex justify-center items-center gap-6 mb-4 flex-wrap">
        <Link
          to="/about"
          className="text-sm text-stone-600 hover:text-orange-600 transition-colors"
        >
          About
        </Link>
        <span className="text-stone-400">•</span>
        <Link
          to="/privacy-policy"
          className="text-sm text-stone-600 hover:text-orange-600 transition-colors"
        >
          Privacy Policy
        </Link>
        <span className="text-stone-400">•</span>
        <Link
          to="/terms-and-conditions"
          className="text-sm text-stone-600 hover:text-orange-600 transition-colors"
        >
          Terms & Conditions
        </Link>
        <span className="text-stone-400">•</span>
        <Link
          to="/contact-us"
          className="text-sm text-stone-600 hover:text-orange-600 transition-colors"
        >
          Contact Us
        </Link>
      </div>
      {<p className="font-serif text-orange-800/80 font-light">
        &copy; {new Date().getFullYear()} <strong>भक्ति वंदन</strong> • Made with devotion ♥
      </p>}
      <p className="text-xs mt-2 opacity-60 font-light">
        Developed by AR Tech Solutions
      </p>
    </footer>
  );
};

export default Footer;