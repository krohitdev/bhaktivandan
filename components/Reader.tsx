import React from 'react';
import { DevotionalContent } from '../types';

interface ReaderProps {
  content: DevotionalContent | null;
  loading: boolean;
  onBack: () => void;
}

const Reader: React.FC<ReaderProps> = ({ content, loading, onBack }) => {
  
  const handleShare = async () => {
    const shareData = {
      title: content?.title || 'Devotional Content',
      text: content?.title || 'Check out this devotional content on Bhakti Vandan',
      url: window.location.href,
    };

    try {
      // Use Web Share API if available (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        // Fallback to clipboard if Web Share API fails
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        } catch (clipboardError) {
          console.error('Failed to share:', clipboardError);
        }
      }
    }
  };

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
    // <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 mt-4 relative">
    <div className="mx-auto p-4 md:p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 mt-4 relative">
      
      {/* Navigation */}
      {/* <button 
        onClick={onBack}
        className="absolute top-4 left-4 text-orange-400 hover:text-orange-600 transition-colors flex items-center gap-1 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back
      </button> */}

      {/* Title with Share Button */}
      <div className="flex flex-col items-center mb-8 mt-6">
        <div className="flex items-center gap-4 w-full justify-center">
          <h1 className="text-3xl md:text-4xl font-serif text-center text-orange-700">
            {content.title}
          </h1>
          {/* <button
            onClick={handleShare}
            className="d-none flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 hover:text-orange-700 transition-colors shadow-sm hover:shadow-md"
            title="Share this content"
            aria-label="Share this content"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 text-center">
        {content.sections ? (
          // Render sections with headings (for Chalisa)
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
            {/* Handle any other section types */}
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
          // Render verses array (for Aarti and Mantra - backward compatible)
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
          <h3 className="text-lg font-bold text-orange-800 mb-2 uppercase tracking-wide text-xs">Summary of Meaning</h3>
          <p className="italic text-stone-600">
            {content.meaning}
          </p>
        </div>
      )}
    </div>
  );
};

export default Reader;