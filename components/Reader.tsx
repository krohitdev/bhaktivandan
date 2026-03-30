import React, { useState } from 'react';
import { DevotionalContent, ContentType } from '../types';
import JapaMala from './JapaMala';

interface ReaderProps {
  content: DevotionalContent | null;
  contentType?: ContentType;
  loading: boolean;
  onBack: () => void;
}

const Reader: React.FC<ReaderProps> = ({ content, contentType, loading, onBack }) => {
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-orange-600 font-serif animate-pulse">Loading content...</p>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="mx-auto p-4 md:p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 mt-4 relative">

      {/* Title */}
      <div className="flex flex-col items-center mb-8 mt-6">
        <div className="flex items-center gap-4 w-full justify-center">
          <h1 className="text-3xl md:text-4xl font-serif text-center text-orange-700">
            {content.title}
          </h1>
        </div>
      </div>

      {/* YouTube Embed */}
      {content.youtubeId && (
        <div className="mb-10 max-w-2xl mx-auto overflow-hidden rounded-xl shadow-md border border-orange-100/50">
          <div className="flex items-center gap-3 p-3 bg-orange-50/50 border-b border-orange-100/50">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-800">Watch & Listen to {contentType}</span>
          </div>
          <div className="relative pt-[56.25%] bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${content.youtubeId}`}
              title={`${content.title} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="space-y-6 text-center">
        {content.sections ? (
          <>
            {content.sections.doha && content.sections.doha.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-serif text-orange-700 font-semibold mb-4">दोहा</h2>
                {content.sections.doha.map((verse, idx) => (
                  <p key={idx} className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed font-serif whitespace-pre-wrap">
                    {verse}
                  </p>
                ))}
              </div>
            )}
            {content.sections.chaupai && content.sections.chaupai.length > 0 && (
              <div className="space-y-4 mt-8">
                <h2 className="text-2xl md:text-3xl font-serif text-orange-700 font-semibold mb-4">चौपाई</h2>
                {content.sections.chaupai.map((verse, idx) => (
                  <p key={idx} className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed font-serif whitespace-pre-wrap">
                    {verse}
                  </p>
                ))}
              </div>
            )}
            {Object.entries(content.sections).map(([sectionKey, verses]) => {
              if (sectionKey === 'doha' || sectionKey === 'chaupai' || !verses || !Array.isArray(verses) || verses.length === 0) return null;
              return (
                <div key={sectionKey} className="space-y-4 mt-8">
                  <h2 className="text-2xl md:text-3xl font-serif text-orange-700 font-semibold mb-4 capitalize">{sectionKey}</h2>
                  {verses.map((verse, idx) => (
                    <p key={idx} className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed font-serif whitespace-pre-wrap">
                      {verse}
                    </p>
                  ))}
                </div>
              );
            })}
          </>
        ) : (
          content.verses?.map((verse, idx) => (
            <p key={idx} className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed font-serif whitespace-pre-wrap">
              {verse}
            </p>
          ))
        )}
      </div>
      
      {/* Japa Mala Counter - Only for Mantras */}
      {contentType === ContentType.MANTRA && (
        <JapaMala />
      )}

      {/* Meaning */}
      {content.meaning && (
        <div className="mt-12 p-6 bg-orange-50 rounded-lg border border-orange-100">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h3 className="text-lg font-bold text-orange-800 uppercase tracking-wide text-xs">
              {language === 'hi' ? 'अर्थ का सार' : 'Summary of Meaning'}
            </h3>
            
            {content.meaningEn && (
              <div className="flex bg-white rounded-lg p-1 border border-orange-200 shadow-sm">
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    language === 'hi' ? 'bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    language === 'en' ? 'bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  EN
                </button>
              </div>
            )}
          </div>
          
          <p className="italic text-stone-600 text-center md:text-left leading-relaxed">
            {language === 'hi' ? content.meaning : content.meaningEn}
          </p>
        </div>
      )}
    </div>
  );
};

export default Reader;