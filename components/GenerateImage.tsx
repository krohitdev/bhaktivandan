import React, { useState } from 'react';
import { generateDivineImage } from '../services/geminiService';

interface GenerateImageProps {
  onBack: () => void;
}

const GenerateImage: React.FC<GenerateImageProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedImage(null);
    try {
      const result = await generateDivineImage(prompt);
      setGeneratedImage(result);
    } catch (error) {
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-orange-100 mt-4 relative animate-fade-in-up">
       {/* <button 
        onClick={onBack}
        className="absolute top-4 left-4 text-orange-400 hover:text-orange-600 transition-colors flex items-center gap-1 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back
      </button> */}
       
       <div className="text-center mb-10 mt-6">
          <h2 className="text-3xl font-serif text-orange-700">Darshan AI</h2>
          <p className="text-stone-500 mt-2">Generate divine images for your prayers and meditation.</p>
       </div>

       <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Input Side */}
          <div className="w-full md:flex-1 space-y-6">
             <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">What would you like to see?</label>
                    <textarea 
                        rows={4} 
                        placeholder="E.g., Lord Shiva meditating in the Himalayas under a starry night..." 
                        required 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-noneTZ transition-all bg-stone-50/50 resize-none font-light"
                    ></textarea>
                 </div>
                 <button 
                    type="submit" 
                    disabled={loading || !prompt}
                    className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                 >
                    {loading ? (
                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                    ) : (
                       <>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
                         Generate Image
                       </>
                    )}
                 </button>
             </form>
             <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 text-xs text-stone-600">
                <p className="font-medium text-orange-800 mb-1">Tips for better results:</p>
                <ul className="list-disc list-inside space-y-1">
                   <li>Be descriptive about the setting (e.g., "in a forest", "on a lotus").</li>
                   <li>Mention lighting (e.g., "soft morning light", "divine glow").</li>
                   <li>Specify details like "holding a trishul" or "playing a flute".</li>
                </ul>
             </div>
          </div>

          {/* Output Side */}
          <div className="w-full md:w-auto flex justify-center">
              {loading ? (
                <div className="aspect-square w-full md:w-96 bg-stone-100 rounded-xl flex flex-col items-center justify-center border border-dashed border-stone-300">
                  <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-stone-500 text-sm animate-pulse">Manifesting vision...</p>
                </div>
              ) : generatedImage ? (
                <div className="flex flex-col items-center gap-4 animate-fade-in">
                  <img src={generatedImage} className="rounded-xl shadow-xl w-full md:w-96 border-4 border-white" alt="Generated Divine Image" />
                  <a href={generatedImage} download="darshan-image.png" className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                     Download Image
                  </a>
                </div>
              ) : (
                <div className="aspect-square w-full md:w-96 bg-stone-50 rounded-xl flex items-center justify-center border border-dashed border-stone-200 text-stone-400">
                  <div className="text-center p-6">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                     <p className="text-sm">Your vision will appear here</p>
                  </div>
                </div>
              )}
          </div>
       </div>
    </div>
  );
}

export default GenerateImage;