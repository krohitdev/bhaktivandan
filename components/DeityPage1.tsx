import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DEITIES } from '../constants';
import { Deity, ContentType, DevotionalContent } from '../types';
import { fetchDevotionalContent } from '../services/geminiService';
import Reader from './Reader';
import { Helmet } from "react-helmet-async";


// Local Fallback SVG for Om Symbol (same as App.tsx)
const FALLBACK_OM_SVG = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fee2e2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='200' fill='%23ea580c' font-family='serif'%3Eॐ%3C/text%3E%3C/svg%3E`;

// Image resolver (same approach as App.tsx)
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const imageMap: Record<string, string> = Object.keys(imageModules).reduce((acc, key) => {
  const fileName = key.split('/').pop() as string;
  acc[fileName] = imageModules[key];
  return acc;
}, {} as Record<string, string>);

const getDeityImage = (filenameOrUrl: string) => {
  if (/^https?:\/\//.test(filenameOrUrl)) return filenameOrUrl;
  if (imageMap[filenameOrUrl]) return imageMap[filenameOrUrl];
  return FALLBACK_OM_SVG;
};

// Helper function to derive ContentType from route type param
const getContentTypeFromType = (type?: string): ContentType => {
  if (!type) return ContentType.AARTI;
  const t = type.toLowerCase();
  if (t === 'chalisa') return ContentType.CHALISA;
  if (t === 'mantra') return ContentType.MANTRA;
  return ContentType.AARTI;
};
type HandleProps = {
  id: string,
  type: string,
  deity: {
    name: string,
    hindiName: string,
    id: string
  }
  // meta: MetaProps,
  // currentContentType: string
}
type MetaProps = {
  title: string,
  description: string,
  canonical: string
}
const TitleHandle = ({id,type,deity}:HandleProps) => {

  // let id  = '1';
  // let type = 'aarti';
  // let currentContentType = 'testing';
  // let meta = {
  //   title: 'm1',
  //   description: 'd1',
  //   canonical:'c1',
  //   image: '--'
  // }

  const getPageMeta = (
    deityName: string,
    hindiName: string,
    deityId: string,
    type: ContentType
  ) => {
    let title: string, description: string, canonicalType: string;
    switch (type) {
      case ContentType.CHALISA:
        title = `${deityName} Chalisa Lyrics in Hindi | ${hindiName} चालीसा | Bhakti Vandan`;
        description = `Read ${deityName} Chalisa lyrics in Hindi. A powerful devotional prayer for peace, strength, and blessings on Bhakti Vandan.`;
        canonicalType = 'chalisa';
        break;
      case ContentType.MANTRA:
        title = `${deityName} Mantra | ${hindiName} मंत्र | Bhakti Vandan`;
        description = `Chant ${deityName} Mantra for spiritual growth, positivity, and divine grace on Bhakti Vandan.`;
        canonicalType = 'mantra';
        break;
      default:
        title = `${deityName} Aarti Lyrics in Hindi | ${hindiName} आरती | Bhakti Vandan`;
        description = `Read ${deityName} Aarti lyrics in Hindi. A devotional hymn to seek divine blessings and inner peace on Bhakti Vandan.`;
        canonicalType = 'aarti';
    }
    const canonical = `https://bhaktivandan.com.com/${canonicalType}/${deityId}`;
    return { title, description, canonical };
  };

  const currentContentType = useMemo(() => getContentTypeFromType(type), [type]);
  
  const meta = useMemo(() => {
    return getPageMeta(deity.name, deity.hindiName, deity.id, currentContentType);
  }, [deity, currentContentType]);

  return (<Helmet key={`${id}-${type}-${currentContentType}`}>
      <title>{meta.title}</title>

      <meta
        name="description"
        content={meta.description}
      />

      <link
        rel="canonical"
        href={meta.canonical}
      />

      {/* Open Graph (for WhatsApp / Facebook sharing) */}
      <meta
        property="og:title"
        content={meta.title}
      />
      <meta
        property="og:description"
        content={meta.description}
      />
      <meta
        property="og:type"
        content="article"
      />
      <meta
        property="og:url"
        content={meta.canonical}
      />
      
    </Helmet>) 
};

const DeityPage1: React.FC = () => {
  const { id, type } = useParams<{ id?: string; type?: string }>();
  console.log({id,type})
  const navigate = useNavigate();
  const [deity, setDeity] = useState<Deity | null>(null);
  const [contentType, setContentType] = useState<ContentType>(ContentType.AARTI);
  const [content, setContent] = useState<DevotionalContent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = DEITIES.find(d => d.id === id);
    setDeity(found || null);
  }, [id]);

  // Map route segment to ContentType
  useEffect(() => {
    setContentType(getContentTypeFromType(type));
  }, [type]);

  useEffect(() => {
    if (!deity) return;
    const load = async () => {
      setLoading(true);
      try {
        // Use deity.name for prompt readability; STATIC_CONTENT lookup is case-insensitive.
        const data = await fetchDevotionalContent(deity.name, contentType);
        setContent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [deity, contentType]);

  // const getPageMeta = (
  //   deityName: string,
  //   hindiName: string,
  //   deityId: string,
  //   type: ContentType
  // ) => {
  //   let title: string, description: string, canonicalType: string;
  //   switch (type) {
  //     case ContentType.CHALISA:
  //       title = `${deityName} Chalisa Lyrics in Hindi | ${hindiName} चालीसा | Bhakti Vandan`;
  //       description = `Read ${deityName} Chalisa lyrics in Hindi. A powerful devotional prayer for peace, strength, and blessings on Bhakti Vandan.`;
  //       canonicalType = 'chalisa';
  //       break;
  //     case ContentType.MANTRA:
  //       title = `${deityName} Mantra | ${hindiName} मंत्र | Bhakti Vandan`;
  //       description = `Chant ${deityName} Mantra for spiritual growth, positivity, and divine grace on Bhakti Vandan.`;
  //       canonicalType = 'mantra';
  //       break;
  //     default:
  //       title = `${deityName} Aarti Lyrics in Hindi | ${hindiName} आरती | Bhakti Vandan`;
  //       description = `Read ${deityName} Aarti lyrics in Hindi. A devotional hymn to seek divine blessings and inner peace on Bhakti Vandan.`;
  //       canonicalType = 'aarti';
  //   }
  //   const canonical = `https://bhaktivandan.com.com/${canonicalType}/${deityId}`;
  //   return { title, description, canonical };
  // };

  // Compute contentType synchronously from type param for immediate meta updates
  // const currentContentType = useMemo(() => getContentTypeFromType(type), [type]);
  
  // const meta = useMemo(() => {
  //   if (!deity) return { title: '', description: '', canonical: '' };
  //   return getPageMeta(deity.name, deity.hindiName, deity.id, currentContentType);
  // }, [deity, currentContentType]);

  if (!deity) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p className="text-stone-600">Deity not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-orange-600">Back home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf2] text-stone-800 font-sans selection:bg-orange-200 flex flex-col font-light">
      <TitleHandle id={deity.id} type={deity.type} deity={deity}  />
      {/* Header copied from App.tsx to match home header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => { navigate('/'); }}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
              ॐ
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-normal text-stone-800 tracking-tight">
                Bhakti Vandan
              </h1>
              <p className="text-xs text-orange-600 font-medium tracking-wide uppercase">Path of Devotion</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => { navigate('/contact-us'); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all bg-white text-stone-600 border border-stone-200 hover:text-orange-600`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-4 flex-grow w-full">
        <div className="max-w-4xl mx-auto px-4">
            {/* Top bar with deity info and content menu */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-orange-50 flex items-center justify-center">
                  <img src={getDeityImage(deity.image)} alt={deity.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = FALLBACK_OM_SVG)} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-stone-800">{deity.name}</h2>
                  <p className="text-sm text-stone-500">{deity.hindiName}</p>
                </div>
              </div>

              <div className="flex gap-2 justify-center md:justify-end mt-4 mb-4">
                <button
                  onClick={() => navigate(`/aarti/${deity.id}`)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    contentType === ContentType.AARTI ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  Aarti
                </button>
                <button
                  onClick={() => navigate(`/chalisa/${deity.id}`)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    contentType === ContentType.CHALISA ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  Chalisa
                </button>
                <button
                  onClick={() => navigate(`/mantra/${deity.id}`)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    contentType === ContentType.MANTRA ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  Mantra
                </button>
              </div>
            </div>

            <Reader content={content} loading={loading} onBack={() => navigate('/')} />
          </div>
      </main>

      {/* Footer copied from App.tsx */}
      <footer className="py-8 bg-stone-100 text-center text-stone-500 border-t border-stone-200">
        <p className="font-serif text-orange-800/80 font-light">Made with devotion <span className="text-red-500 text-lg">♥</span></p>
        <p className="text-xs mt-2 opacity-60 font-light">&copy; {new Date().getFullYear()} Bhakti Vandan</p>
      </footer>
    </div>
  );
};

export default DeityPage1;