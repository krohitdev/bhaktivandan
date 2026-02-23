import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DEITIES } from '../constants';
import { Deity, ContentType, DevotionalContent } from '../types';
import { fetchDevotionalContent } from '../services/geminiService';
import Reader from './Reader';
import { Helmet } from "react-helmet-async";
import Header from './Header';
import Footer from './Footer';


// Local Fallback SVG for Om Symbol (same as App.tsx)
const FALLBACK_OM_SVG = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fee2e2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='200' fill='%23ea580c' font-family='serif'%3Eॐ%3C/text%3E%3C/svg%3E`;

// Image resolver (same approach as App.tsx)
// @ts-ignore
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
  if (t === 'mantra') return ContentType.MANTRA;
  if (t === 'insights') return ContentType.INSIGHTS;
  if (t === 'chalisa') return ContentType.CHALISA;
  return ContentType.AARTI;
};

const DeityPage: React.FC = () => {
  const { id, type } = useParams<{ id?: string; type?: string }>();
  const navigate = useNavigate();
  const [deity, setDeity] = useState<Deity | null>(null);
  const [contentType, setContentType] = useState<ContentType>(ContentType.AARTI);
  const [content, setContent] = useState<DevotionalContent | null>(null);
  const [loading, setLoading] = useState(false);
  // const [meta, setMeta] = useState({ title: '', description: '', canonical: '' });

  // Compute contentType synchronously from type param for immediate meta updates
  const currentContentType = useMemo(() => getContentTypeFromType(type), [type]);

  useEffect(() => {
    if (!id) return;
    const found = DEITIES.find(d => d.id === id);
    setDeity(found || null);
  }, [id]);

  // Map route segment to ContentType
  useEffect(() => {
    setContentType(getContentTypeFromType(type));
  }, [type]);

  // Update meta when deity or contentType changes
  // useEffect(() => {
  //   if (!deity) return;
  //   const updatedMeta = getPageMeta(deity.name, deity.hindiName, deity.id, currentContentType);
  //   setMeta(updatedMeta);
  // }, [deity, currentContentType]);



  useEffect(() => {
    if (!deity) return;
    const load = async () => {
      setLoading(true);
      try {
        // Use deity.name for prompt readability; STATIC_CONTENT lookup is case-insensitive.
        const data = await fetchDevotionalContent(deity.name, contentType);
        let updatedMeta = getPageMeta(deity.name, deity.hindiName, deity.id, contentType);
        setContent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [deity, contentType]);

  const getPageMeta = (
    deityName: string,
    hindiName: string,
    deityId: string,
    type: ContentType
  ) => {
    let title: string, description: string, canonicalType: string;
    switch (type) {
      case ContentType.CHALISA:
        title = `${deityName} Chalisa Lyrics in Hindi | ${hindiName} चालीसा | भक्ति वंदन`;
        description = `Read ${deityName} Chalisa lyrics in Hindi. A powerful devotional prayer for peace, strength, and blessings on Bhakti Vandan.`;
        canonicalType = 'chalisa';
        break;
      case ContentType.MANTRA:
        title = `${deityName} Mantra | ${hindiName} मंत्र | भक्ति वंदन`;
        description = `Chant ${deityName} Mantra for spiritual growth, positivity, and divine grace on Bhakti Vandan.`;
        canonicalType = 'mantra';
        break;
      case ContentType.INSIGHTS:
        title = `${deityName} Significance & Benefits | ${hindiName} महिमा और लाभ | भक्ति वंदन`;
        description = `Discover the spiritual significance, history, and benefits of worshiping ${deityName}. Deep insights into ${hindiName} on Bhakti Vandan.`;
        canonicalType = 'insights';
        break;
      default:
        title = `${deityName} Aarti Lyrics in Hindi | ${hindiName} आरती | भक्ति वंदन`;
        description = `Read ${deityName} Aarti lyrics in Hindi. A devotional hymn to seek divine blessings and inner peace on Bhakti Vandan.`;
        canonicalType = 'aarti';
    }
    const canonical = `https://www.bhaktivandan.com/${canonicalType}/${deityId}`;
    return { title, description, canonical };
  };

  const getSchema = (
    deityName: string,
    hindiName: string,
    deityId: string,
    type: ContentType
  ) => {
    const typeMap = {
      [ContentType.CHALISA]: {
        label: "Chalisa",
        path: "chalisa",
        description: `Read ${deityName} Chalisa lyrics in Hindi (${hindiName} चालीसा). A powerful devotional prayer for peace, strength, and blessings.`,
      },
      [ContentType.MANTRA]: {
        label: "Mantra",
        path: "mantra",
        description: `Chant ${deityName} Mantra (${hindiName} मंत्र) for spiritual growth, positivity, and divine grace.`,
      },
      [ContentType.AARTI]: {
        label: "Aarti",
        path: "aarti",
        description: `Read ${deityName} Aarti lyrics in Hindi (${hindiName} आरती). A devotional hymn to seek divine blessings and inner peace.`,
      },
      [ContentType.INSIGHTS]: {
        label: "Insights",
        path: "insights",
        description: `Discover the spiritual significance and benefits of worshiping ${deityName} (${hindiName} महिमा).`,
      },
    };

    const data = typeMap[type];
    const url = `https://www.bhaktivandan.com/${data.path}/${deityId}`;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${deityName} ${data.label}`,
      description: data.description,
      inLanguage: ["hi", "en"],
      "name": "भक्ति वंदन",
      "alternateName": "Bhakti Vandan",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      author: {
        "@type": "Organization",
        name: "Bhakti Vandan",
      },
      publisher: {
        "@type": "Organization",
        name: "Bhakti Vandan",
      },
      url,
    };
  };


  const meta = useMemo(() => {
    if (!deity) return null;
    return getPageMeta(deity.name, deity.hindiName, deity.id, currentContentType);
  }, [deity, currentContentType]);

  const schema = useMemo(() => {
    if (!deity) return null;
    return getSchema(deity.name, deity.hindiName, deity.id, currentContentType);
  }, [deity, currentContentType]);


  // Update document title when meta changes to ensure immediate title updates
  useEffect(() => {
    if (meta?.title) {
      document.title = meta.title;
    }
  }, [meta]);


  if (!deity || !meta) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p className="text-stone-600">Deity not found.</p>
        <a href="/" className="mt-4 text-orange-600 inline-block hover:text-orange-700">Back home</a>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#fffbf2] text-stone-800 font-sans selection:bg-orange-200 flex flex-col font-light">
      <Helmet key={`${id}-${type}-${currentContentType}`}>
        <title>{meta.title}</title>

        <meta
          name="description"
          content={[
            `${deity.name} ${contentType.toLowerCase()}`,
            `${deity.name} ${contentType.toLowerCase()} lyrics`,
            `${deity.hindiName}`,
            `${deity.hindiName} ${contentType === ContentType.CHALISA
              ? "चालीसा"
              : contentType === ContentType.MANTRA
                ? "मंत्र"
                : "आरती"
            }`,
            "bhakti",
            "devotional prayer",
            "hindu aarti",
          ].join(", ")}
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
        <meta
          property="og:image"
          content={getDeityImage(deity.image)}
        />

        {/* JSON-LD Structured Data */}
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Helmet>
      {/* Header copied from App.tsx to match home header */}
      {/* <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => { navigate('/'); }}
          >
            

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-serif font-bold text-white text-2xl shadow-md">
              ॐ
            </div>
            <div>
              <h1 className="font-[Noto Serif Devanagari] text-2xl font-bold text-[#3A1F0F] leading-tight">
               भक्ति वंदन
              </h1>
              <p className="text-sm text-orange-600 font-medium tracking-wide uppercase">श्रद्धा • भक्ति • साधना</p>
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
      </header> */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-4 flex-grow w-full">
        <div className="max-w-4xl mx-auto px-4">
          {/* Top bar with deity info and content menu */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-orange-50 flex items-center justify-center">
                <img src={getDeityImage(deity.image)} alt={deity.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = FALLBACK_OM_SVG)} />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-stone-800 font-[400]">{deity.hindiName}</h2>
                <p className="text-sm text-stone-500 hidden">{deity.hindiName}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-center md:justify-end mt-4 mb-4">
              <Link
                to={`/aarti/${deity.id}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all inline-block ${currentContentType === ContentType.AARTI ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:text-orange-600'
                  }`}
              >
                आरती
              </Link>
              <Link
                to={`/chalisa/${deity.id}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all inline-block ${currentContentType === ContentType.CHALISA ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:text-orange-600'
                  }`}
              >
                चालीसा
              </Link>
              <Link
                to={`/mantra/${deity.id}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all inline-block ${currentContentType === ContentType.MANTRA ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:text-orange-600'
                  }`}
              >
                मंत्र
              </Link>
              <Link
                to={`/insights/${deity.id}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all inline-block ${currentContentType === ContentType.INSIGHTS ? 'bg-orange-600 text-white shadow-md font-bold' : 'bg-white text-stone-600 border border-stone-200 hover:text-orange-600'
                  }`}
              >
                दिव्य महिमा
              </Link>
            </div>
          </div>

          {currentContentType === ContentType.INSIGHTS ? (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-xl border border-orange-100 animate-fade-in-up">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-serif text-orange-800 mb-2">दिव्य महिमा और लाभ</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
                {/* <p className="mt-4 text-stone-600 italic">Exploring the spiritual significance of {deity.name}</p> */}
                <p className="mt-4 text-stone-600 italic">{deity.hindiName} के आध्यात्मिक महत्व की खोज </p>
              </div>

              <div className="space-y-8">
                {deity.insights?.map((insight, idx) => (
                  <div key={idx} className="bg-orange-50/50 rounded-xl p-6 border border-orange-100/50 hover:bg-orange-50 transition-colors">
                    <h4 className="text-xl font-serif text-orange-700 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 text-sm">{idx + 1}</span>
                      {insight.title}
                    </h4>
                    <p className="text-stone-700 leading-relaxed font-[Noto Serif Devanagari] md:text-lg">
                      {insight.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-orange-100 text-center">
                <p className="text-stone-500 text-sm">
                  This content is curated for spiritual seekers and summarized from traditional Vedic texts.
                </p>
              </div>
            </div>
          ) : (
            <Reader content={content} loading={loading} onBack={() => navigate('/')} />
          )}
        </div>
      </main>

      {/* Footer copied from App.tsx */}
      {/* <footer className="py-8 bg-stone-100 text-center text-stone-500 border-t border-stone-200">
        <p className="font-serif text-orange-800/80 font-light">Made with devotion <span className="text-red-500 text-lg">♥</span></p>
        <p className="text-xs mt-2 opacity-60 font-light">&copy; {new Date().getFullYear()} Bhakti Vandan</p>
      </footer> */}
      <Footer />
    </div>
  );
};

export default DeityPage;