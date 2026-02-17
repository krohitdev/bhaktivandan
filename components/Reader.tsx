import React from 'react';
import { DevotionalContent } from '../types';

interface ReaderProps {
  content: DevotionalContent | null;
  loading: boolean;
  onBack: () => void;
}

const Reader: React.FC<ReaderProps> = ({ content, loading, onBack }) => {
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

      {/* Meaning */}
      {content.meaning && (
        <div className="mt-12 p-6 bg-orange-50 rounded-lg border border-orange-100">
          <h3 className="text-lg font-bold text-orange-800 mb-2 uppercase tracking-wide text-xs text-center md:text-left">Summary of Meaning</h3>
          <p className="italic text-stone-600 text-center md:text-left">
            {content.meaning}
          </p>
        </div>
      )}
    </div>
  );
};

export default Reader;