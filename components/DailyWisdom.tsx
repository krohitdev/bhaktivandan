import React, { useState } from 'react';
import { DAILY_QUOTES } from '../constants';

const DailyWisdom: React.FC = () => {
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');

  // Simple logic to pick a quote based on the day of the year
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayIndex = getDayOfYear() % DAILY_QUOTES.length;
  const quote = DAILY_QUOTES[dayIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 mb-12">
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-6 md:p-8 shadow-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-orange-600 text-white text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
              Daily Wisdom
            </span>
            <div className="h-px flex-grow bg-orange-200"></div>
          </div>

          <div className="space-y-4">
            <p className="text-xl md:text-2xl font-serif text-orange-900 leading-relaxed italic text-center">
              "{quote.verse}"
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-center mb-2">
                <div className="flex bg-white/50 backdrop-blur-sm rounded-lg p-1 border border-orange-200">
                  <button
                    onClick={(e) => { e.preventDefault(); setLanguage('hi'); }}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      language === 'hi' ? 'bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setLanguage('en'); }}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      language === 'en' ? 'bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
              <p className="text-stone-700 leading-relaxed text-center md:text-lg max-w-3xl mx-auto font-light min-h-[3rem]">
                {language === 'hi' ? quote.translation : quote.englishTranslation}
              </p>
              <p className="text-orange-700/60 text-sm font-serif text-center font-medium">
                — {quote.source}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30"></div>
      </div>
    </div>
  );
};

export default DailyWisdom;
