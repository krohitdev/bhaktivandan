import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffbf2] text-stone-800 font-sans selection:bg-orange-200 flex flex-col font-light">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex-grow w-full">
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-orange-100 mt-4 relative animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif text-orange-700 mb-4">About Us</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg mx-auto text-center">
            <p className="text-xl font-[Noto Serif Devanagari] text-stone-700 leading-relaxed mb-6 italic">
              "श्रद्धा और समर्पण के साथ, हम सनातन धर्म की दिव्य वाणी को आप तक पहुँचाने के लिए समर्पित हैं।"
            </p>
            <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto mb-10">
              भक्ति वंदन एक स्वतंत्र आध्यात्मिक मंच है जिसे शुद्ध भक्ति के प्रसार के लिए बनाया गया है। हमारा लक्ष्य प्राचीन भजनों और मंत्रों को आधुनिक पहुँच के साथ जोड़ना है।
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-serif text-xl">🕉️</span>
                </div>
                <h3 className="text-lg font-serif text-stone-800 mb-2">आरती</h3>
                <p className="text-stone-600 text-sm">दिव्य आरतियाँ जो हृदय को स्पर्श करती हैं</p>
              </div>

              <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-serif text-xl">📿</span>
                </div>
                <h3 className="text-lg font-serif text-stone-800 mb-2">चालीसा</h3>
                <p className="text-stone-600 text-sm">पवित्र चालीसाएँ जो आशीर्वाद लाती हैं</p>
              </div>

              <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-serif text-xl">🙏</span>
                </div>
                <h3 className="text-lg font-serif text-stone-800 mb-2">मंत्र</h3>
                <p className="text-stone-600 text-sm">शक्तिशाली मंत्र जो शांति प्रदान करते हैं</p>
              </div>
            </div>

            <div className="mt-16 space-y-12 text-left">
              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4 border-b border-orange-100 pb-2">हमारा उद्देश्य</h3>
                <p className="text-stone-700 leading-relaxed">
                  {/* The primary mission of <strong>Bhakti Vandan</strong> is to preserve and digitalize traditional Vedic hymns, Aartis, and Chalisa. We believe that spiritual content should be accessible, easy to read, and presented with the respect it deserves. */}

                  <strong>भक्ति वंदन</strong> का मुख्य उद्देश्य पारंपरिक वैदिक भजनों, आरती और चालीसा का संरक्षण और डिजिटल रूप में रूपांतरण करना है। हमारा मानना ​​है कि आध्यात्मिक सामग्री सुलभ, पठनीय होनी चाहिए और उसे उचित सम्मान के साथ प्रस्तुत किया जाना चाहिए।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4 border-b border-orange-100 pb-2">भक्ति वंदन क्यों?</h3>
                <div className="space-y-4">
                  <p className="text-stone-700 leading-relaxed">
                    {/* In a world of cluttered information, we focus on clarity and devotion. Our platform offers */}
                    सूचनाओं की इस अव्यवस्थित दुनिया में, हम स्पष्टता और समर्पण पर ध्यान केंद्रित करते हैं। हमारा प्लेटफ़ॉर्म प्रदान करता है:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-stone-600">
                    <li><strong>
                      {/* Authentic Content */}
                      प्रामाणिक सामग्री:</strong> हम पारंपरिक स्रोतों के आधार पर ग्रंथों का सावधानीपूर्वक सत्यापन करते हैं।.</li>
                    <li><strong>
                      {/* Spiritual Significance */}
                      आध्यात्मिक सामग्री:</strong> हम केवल गीत ही नहीं देते; हम प्रत्येक प्रार्थना का *अर्थ* और *लाभ* भी समझाते हैं।
                      {/* We don't just provide lyrics; we explain the *meaning* and *benefits* of each prayer. */}
                    </li>
                    <li><strong>
                      {/* User Experience */}व्यक्तिगत अनुभव:</strong>
                      {/* A clean, ad-friendly, and peaceful environment designed for daily worship. */}
                      दैनिक पूजा-अर्चना के लिए स्वच्छ, विज्ञापन-मुक्त और शांतिपूर्ण वातावरण तैयार किया गया है।
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4 border-b border-orange-100 pb-2">
                  {/* Content Stewardship */}सामग्री प्रबंधन
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  हम भक्ति और श्रद्धा के मार्ग पर चलने वालों के लिए एक विश्वसनीय मंच प्रदान करने का प्रयास करते हैं।
                  हमारे माध्यम से आप अपनी रोजमर्रा की जिंदगी में भक्ति को समाहित कर सकते हैं और दिव्य शक्तियों के आशीर्वाद का अनुभव कर सकते हैं।
                  इस साइट पर मौजूद सभी सामग्री भक्तिभाव से जुड़े अभ्यासियों की एक टीम द्वारा संकलित की गई है। हम स्थिर पारंपरिक ग्रंथों और मैन्युअल शोध को मिलाकर यह सुनिश्चित करते हैं कि लिप्यंतरण और अर्थ यथासंभव सटीक हों। हम अधिक देवी-देवताओं और गहन आध्यात्मिक अंतर्दृष्टियों को शामिल करने के लिए अपने पुस्तकालय का निरंतर विस्तार कर रहे हैं।
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;