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
            <p className="text-xl font-[Noto Serif Devanagari] text-stone-700 leading-relaxed mb-6">
              भक्ति वंदन एक सनातन भक्ति मंच है जहाँ आरती, चालीसा और मंत्र श्रद्धा भाव से प्रस्तुत किए जाते हैं।
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

            <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
              <h3 className="text-2xl font-serif text-orange-700 mb-4">हमारी प्रतिबद्धता</h3>
              <p className="text-stone-700 leading-relaxed">
                हम भक्ति और श्रद्धा के मार्ग पर चलने वालों के लिए एक विश्वसनीय मंच प्रदान करने का प्रयास करते हैं।
                हमारे माध्यम से आप अपनी रोजमर्रा की जिंदगी में भक्ति को समाहित कर सकते हैं और दिव्य शक्तियों के आशीर्वाद का अनुभव कर सकते हैं।
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;