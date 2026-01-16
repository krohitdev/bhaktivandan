import React from 'react';
import Header from './Header';
import Footer from './Footer';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffbf2] text-stone-800 font-sans selection:bg-orange-200 flex flex-col font-light">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex-grow w-full">
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-orange-100 mt-4 relative animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif text-orange-700 mb-4">नियम और शर्तें (Terms & Conditions)</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
            <p>भक्ति वंदन वेबसाइट पर आपका स्वागत है। इस वेबसाइट का उपयोग करके आप निम्नलिखित नियमों और शर्तों से सहमत होते हैं।</p>
          </div>

          <div className="prose prose-lg mx-auto">
            <div className="space-y-6 text-stone-700 leading-relaxed">

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">1. वेबसाइट का उद्देश्य (Purpose of the Website)</h3>
                <p>
                  भक्ति वंदन एक आध्यात्मिक और भक्ति संबंधी जानकारी प्रदान करने वाला प्लेटफॉर्म है। यहां उपलब्ध सामग्री केवल सामान्य जानकारी और धार्मिक उद्देश्य के लिए है।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">2. सामग्री की जिम्मेदारी (Content Responsibility)</h3>
                <p>भक्ति वंदन एक आध्यात्मिक और भक्ति संबंधी जानकारी प्रदान करने वाला प्लेटफॉर्म है। यहां उपलब्ध सामग्री केवल सामान्य जानकारी और धार्मिक उद्देश्य के लिए है।</p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">3. उपयोगकर्ता दायित्व (User Obligations)</h3>
                <p>
                 आप सहमत हैं कि आप वेबसाइट का उपयोग किसी भी गैरकानूनी, अनुचित या हानिकारक गतिविधि के लिए नहीं करेंगे।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">4. बौद्धिक संपदा अधिकार (Intellectual Property Rights)</h3>
                <p>
                  इस वेबसाइट पर प्रकाशित सभी सामग्री भक्ति वंदन की संपत्ति है, जब तक कि अन्यथा उल्लेख न किया गया हो। बिना अनुमति सामग्री की नकल या पुनः उपयोग निषिद्ध है।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">5. तृतीय-पक्ष वेबसाइट (Third-Party Websites)</h3>
                <p>वेबसाइट में बाहरी लिंक हो सकते हैं। उन वेबसाइटों की सामग्री या सेवाओं के लिए हम जिम्मेदार नहीं हैं।</p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">6. उत्तरदायित्व की सीमा (Limitation of Liability)</h3>
                <p>
                  वेबसाइट के उपयोग से होने वाले किसी भी प्रत्यक्ष या अप्रत्यक्ष नुकसान के लिए भक्ति वंदन उत्तरदायी नहीं होगा।
                </p>
              </section>
              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">7. शर्तों में परिवर्तन (Changes to the Terms)</h3>
                <p>
                  हम बिना किसी पूर्व सूचना के इन नियमों और शर्तों में परिवर्तन करने का अधिकार सुरक्षित रखते हैं।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">8. लागू कानून (Governing Law)</h3>
                <p>
                  ये नियम और शर्तें भारत के कानूनों के अंतर्गत शासित होंगी।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">9. संपर्क (Contact Information)</h3>
                <p>
                  यदि इन नियमों और शर्तों से संबंधित कोई प्रश्न हो, तो कृपया हमसे संपर्क करें।
                </p>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-stone-700">
                    <strong>भक्ति वंदन</strong><br />
                    Email: contact.bhaktivandan@gmail.com
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;