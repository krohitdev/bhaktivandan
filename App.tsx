import React, { useState, useEffect } from 'react';
import { DEITIES } from './constants';
import { Deity, ContentType, DevotionalContent } from './types';
import Reader from './components/Reader';
import { fetchDevotionalContent } from './services/geminiService';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from './components/Footer';

// Local Fallback SVG for Om Symbol
const FALLBACK_OM_SVG = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fee2e2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='200' fill='%23ea580c' font-family='serif'%3Eॐ%3C/text%3E%3C/svg%3E`;

function App() {

  const navigate = useNavigate(); // added
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [contentType, setContentType] = useState<ContentType>(ContentType.AARTI);
  const [content, setContent] = useState<DevotionalContent | null>(null);
  const [loading, setLoading] = useState(false);

  // Parse search query to extract deity name and optional content type
  const parseSearchQuery = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();
    const contentTypes = ['aarti', 'chalisa', 'mantra'];
    
    let deityName = lowerQuery;
    let contentTypeFilter: string | null = null;
    
    // Check if query ends with a content type
    for (const ct of contentTypes) {
      if (lowerQuery.endsWith(ct)) {
        deityName = lowerQuery.replace(ct, '').trim();
        contentTypeFilter = ct;
        break;
      }
    }
    
    return { deityName, contentTypeFilter };
  };

  // Filter deities and content types based on search
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    
    const { deityName, contentTypeFilter } = parseSearchQuery(searchQuery);
    const results: Array<{ type: 'deity' | 'content'; deity: Deity; contentType?: ContentType }> = [];
    
    // Find matching deities
    const matchingDeities = DEITIES.filter(d => 
      d.name.toLowerCase().includes(deityName) || 
      d.hindiName.includes(deityName)
    );
    
    matchingDeities.forEach(deity => {
      if (contentTypeFilter) {
        // If content type specified, only add that content type
        let ct: ContentType | null = null;
        if (contentTypeFilter === 'aarti') ct = ContentType.AARTI;
        else if (contentTypeFilter === 'chalisa') ct = ContentType.CHALISA;
        else if (contentTypeFilter === 'mantra') ct = ContentType.MANTRA;
        
        if (ct) {
          results.push({ type: 'content', deity, contentType: ct });
        }
      } else {
        // If no content type specified, add all three types
        results.push({ type: 'content', deity, contentType: ContentType.AARTI });
        results.push({ type: 'content', deity, contentType: ContentType.CHALISA });
        results.push({ type: 'content', deity, contentType: ContentType.MANTRA });
      }
    });
    
    return results;
  };

  const handleSearchResultClick = (deity: Deity, contentType: ContentType) => {
    const typeStr = contentType.toLowerCase();
    navigate(`/${typeStr}/${deity.id}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleDeitySelect = (deity: Deity) => {
    // navigate to the deity's Aarti page
    navigate(`/aarti/${deity.id}`);
  };

  const handleContentSelect = (type: ContentType) => {
    setContentType(type);
    if (selectedDeity) {
      fetchContent(selectedDeity, type);
    }
  };

  const fetchContent = async (deity: Deity, type: ContentType) => {
    setLoading(true);
    setContent(null); 
    try {
      const data = await fetchDevotionalContent(deity.name, type);
      setContent(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetSelection = () => {
    setSelectedDeity(null);
    setContent(null);
  };

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  // Build a map of all images in /assets/images using Vite's glob
  // Use the new query/import options so each matched file resolves to a URL string when eager-loaded.
  const imageModules = import.meta.glob('./assets/images/*.{png,jpg,jpeg,svg,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

  const imageMap: Record<string, string> = Object.keys(imageModules).reduce((acc, key) => {
    const fileName = key.split('/').pop() as string;
    acc[fileName] = imageModules[key];
    return acc;
  }, {} as Record<string, string>);

  const getDeityImage = (filenameOrUrl: string) => {
    // If it's an absolute or protocol URL, return as-is
    if (/^https?:\/\//.test(filenameOrUrl)) return filenameOrUrl;

    // If image exists in the assets map, return the resolved URL
    if (imageMap[filenameOrUrl]) return imageMap[filenameOrUrl];

    // Otherwise return fallback SVG data URL
    return FALLBACK_OM_SVG;
  };

  // Update document title when component mounts to ensure correct title on home page
  useEffect(() => {
    document.title = 'Bhakti Vandan';
  }, []);

  return (
    <div className="min-h-screen bg-[#fffbf2] text-stone-800 font-sans selection:bg-orange-200 flex flex-col font-light">
      <Helmet>
        <title>Bhakti Vandan</title>
      </Helmet>
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={resetSelection}
          >
            {/* <div className="w-10 h-10 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
              ॐ
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-medium text-stone-800 tracking-tight">
                भक्ति वंदन
              </h1>
              <p className="text-sm text-orange-600 font-medium tracking-wide uppercase">श्रद्धा • भक्ति • साधना</p>
            </div> */}
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
          
          {selectedDeity ? (
            <div className="hidden md:flex gap-2">
               {Object.values(ContentType).map((type) => (
                 <button
                   key={type}
                   onClick={() => handleContentSelect(type)}
                   className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                     contentType === type 
                       ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-200' 
                       : 'bg-transparent text-stone-500 hover:bg-stone-100'
                   }`}
                 >
                   {type}
                 </button>
               ))}
               <button onClick={resetSelection} className="ml-2 text-sm font-medium text-stone-500 hover:text-orange-600">Home</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/about')}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all bg-white text-stone-600 border border-stone-200 hover:text-orange-600"
              >
                About
              </button>
              <button
                onClick={handleContactClick}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all bg-white text-stone-600 border border-stone-200 hover:text-orange-600`}
              >
                Contact Us
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-8 flex-grow w-full">
        
        {!selectedDeity ? (
          /* Deity Grid */
          <div className="animate-fade-in-up">
            <div className="text-center mb-4">
              {/* <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-700 mb-4">
                Choose Your Deity
              </h2> */}
              
              {/* Search Input */}
              <p className="text-stone-500 max-w-lg mx-auto font-light">
                अपनी प्रार्थना शुरू करने के लिए एक दिव्य रूप चुनें। पारंपरिक आरती, चालीसा और मंत्रों का तुरंत आनंद लें।
              </p>
              <div className="relative max-w-md mx-auto mb-6 py-4">
                <input
                  type="text"
                  placeholder="Search deity (e.g., 'ganesh' or 'ganesh aarti')..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  className="w-full px-4 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                />
                
                {/* Search Results Dropdown */}
                {showSearchResults && getSearchResults().length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-orange-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {getSearchResults().map((result, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearchResultClick(result.deity, result.contentType!)}
                        className="w-full text-left px-4 py-2 hover:bg-orange-50 border-b border-orange-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-stone-700">{result.deity.name}</div>
                        <div className="text-xs text-orange-600">{result.contentType}</div>
                      </button>
                    ))}
                  </div>
                )}
                {showSearchResults && searchQuery && getSearchResults().length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-orange-200 rounded-lg shadow-lg z-50 p-3">
                    <p className="text-sm text-stone-500">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>

              
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {DEITIES.map((deity) => {
                const imageSrc = getDeityImage(deity.image);
                // Force fallback look since we are using the static Om SVG everywhere
                const isFallback = true; 

                return (
                  <div
                    key={deity.id}
                    onClick={() => handleDeitySelect(deity)}
                    className={`group relative overflow-hidden rounded-xl bg-white border border-orange-100/50 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-gradient-to-br ${deity.color}`}
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden bg-orange-50 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-orange-200">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 opacity-50">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                      </div>
                      <img 
                        src={imageSrc} 
                        alt={deity.name}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-700 relative z-10 ${isFallback ? ' opacity-80' : 'group-hover:scale-105'}`}
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_OM_SVG;
                          e.currentTarget.className = "w-full h-full object-cover p-8 opacity-80 group-hover:scale-110 transition-transform duration-700 relative z-10";
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent flex flex-col justify-end p-4 z-20">
                      <h3 className="text-white font-serif text-xl font-normal tracking-wide drop-shadow-md">{deity.name}</h3>
                      <p className="text-stone-100 text-sm font-light opacity-90">
                        {deity.hindiName}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Detail View */
          <div className="animate-fade-in">
             {/* Mobile Tabs */}
             <div className="flex md:hidden justify-center gap-2 mb-6">
               {Object.values(ContentType).map((type) => (
                 <button
                   key={type}
                   onClick={() => handleContentSelect(type)}
                   className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                     contentType === type 
                       ? 'bg-orange-500 text-white shadow-md' 
                       : 'bg-white text-stone-600 border border-stone-200'
                   }`}
                 >
                   {type}
                 </button>
               ))}
            </div>

            <Reader 
              content={content} 
              loading={loading} 
              onBack={resetSelection} 
            />
          </div>
        )}

      </main>

      <Footer />
      
    </div>
  );
}

export default App;