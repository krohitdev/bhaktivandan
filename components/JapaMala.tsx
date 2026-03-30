import React, { useState, useEffect } from 'react';

interface JapaMalaProps {
  onComplete?: () => void;
}

const JapaMala: React.FC<JapaMalaProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (count > 0 && count === target) {
      if (onComplete) onComplete();
      // Optional: Add a success sound or animation
    }
  }, [count, target, onComplete]);

  const handleIncrement = () => {
    if (count < target) {
      setCount(prev => prev + 1);
      if (navigator.vibrate) {
        navigator.vibrate(50); // Haptic feedback for mobile
      }
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
  };

  const targets = [11, 21, 51, 108];

  const progress = (count / target) * 100;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="mt-12 mb-8 flex flex-col items-center">
      <div className="bg-orange-50/50 rounded-2xl p-8 border border-orange-100 w-full max-w-sm">
        <div className="text-center mb-6">
          <h3 className="text-lg font-serif text-orange-800 mb-2">जप माला (Japa Mala)</h3>
          <div className="flex justify-center gap-2">
            {targets.map(t => (
              <button
                key={t}
                onClick={(e) => { e.stopPropagation(); setTarget(t); setCount(0); }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  target === t ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div 
          className="relative w-48 h-48 mx-auto cursor-pointer group active:scale-95 transition-transform"
          onClick={handleIncrement}
        >
          {/* Progress Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-orange-100"
            />
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.3s ease' }}
              strokeLinecap="round"
              className="text-orange-600"
            />
          </svg>

          {/* Count Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-serif font-bold text-orange-900 leading-none">{count}</span>
            <span className="text-sm text-orange-700/60 font-medium">/ {target}</span>
          </div>
          
          {/* Tap Instruction */}
          <div className="absolute -bottom-2 inset-x-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium text-orange-600 bg-white px-2 py-1 rounded-full shadow-sm border border-orange-100">
              Tap to count
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Reset Count
          </button>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-stone-500 italic text-center max-w-xs">
        Tap the ring to count your chants. Use haptic feedback (vibration) on mobile to feel each count.
      </p>
    </div>
  );
};

export default JapaMala;
