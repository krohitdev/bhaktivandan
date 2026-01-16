import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffbf2] text-stone-800 font-sans selection:bg-orange-200 flex flex-col font-light">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex-grow w-full">
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-orange-100 mt-4 relative animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif text-orange-700 mb-4">गोपनीयता नीति (Privacy Policy)</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg mx-auto">
            <div className="space-y-6 text-stone-700 leading-relaxed">

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">1. हम कौन-सी जानकारी एकत्र करते हैं (Information We Collect)</h3>
                <p>
                  भक्ति वंदन एक भक्ति और आध्यात्मिक सामग्री प्रदान करने वाला प्लेटफॉर्म है। हम आपकी गोपनीयता का सम्मान करते हैं और केवल आवश्यक जानकारी एकत्र करते हैं।
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong>Contact Form:</strong> जब आप हमसे संपर्क करते हैं, तो हम आपका नाम, ईमेल और संदेश संग्रहीत करते हैं।</li>
                  <li><strong>Usage Data:</strong> हम आपकी वेबसाइट उपयोग की जानकारी स्वचालित रूप से एकत्र कर सकते हैं।</li>
                  <li><strong>Cookies:</strong> हम आपकी अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग कर सकते हैं।</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">2. हम आपकी जानकारी का उपयोग कैसे करते हैं (How We Use Your Information)</h3>
                <p>हम एकत्रित की गई जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए करते हैं:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>आपके संपर्क अनुरोधों का जवाब देना</li>
                  <li>हमारी सेवाओं को सुधारना और बनाए रखना</li>
                  <li>आपको महत्वपूर्ण अपडेट और सूचनाएं भेजना</li>
                  <li>कानूनी आवश्यकताओं का पालन करना</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">3. जानकारी साझा करना (Information Sharing)</h3>
                <p>
                  हम आपकी व्यक्तिगत जानकारी को तीसरे पक्ष के साथ साझा नहीं करते हैं, सिवाय निम्नलिखित स्थितियों में:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>जब आपकी स्पष्ट सहमति हो</li>
                  <li>कानूनी आवश्यकताओं या अदालती आदेश के अनुसार</li>
                  <li>हमारी सेवाओं को प्रदान करने के लिए आवश्यक सेवा प्रदाताओं के साथ</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">4. डेटा सुरक्षा (Data Security)</h3>
                <p>
                  हम आपकी जानकारी की सुरक्षा के लिए उचित तकनीकी और संगठनात्मक उपाय अपनाते हैं। हालांकि, इंटरनेट पर कोई भी डेटा ट्रांसमिशन 100% सुरक्षित नहीं हो सकता।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">5. आपके अधिकार (Your Rights)</h3>
                <p>आपके पास निम्नलिखित अधिकार हैं:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong>Access:</strong> अपनी जानकारी तक पहुंच का अनुरोध करना</li>
                  <li><strong>Correction:</strong> गलत जानकारी को सुधारने का अनुरोध करना</li>
                  <li><strong>Deletion:</strong> अपनी जानकारी को हटाने का अनुरोध करना</li>
                  <li><strong>Opt-out:</strong> मार्केटिंग संचार से ऑप्ट-आउट करना</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">6. कुकीज़ नीति (Cookies Policy)</h3>
                <p>
                  हमारी वेबसाइट कुकीज़ का उपयोग करती है ताकि आपका अनुभव बेहतर हो सके। आप अपने ब्राउज़र सेटिंग्स में कुकीज़ को नियंत्रित या अक्षम कर सकते हैं।
                </p>
              </section>
              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">7. Google AdSense और विज्ञापन कुकीज़</h3>
                <p>
                  हमारी वेबसाइट पर Google AdSense का उपयोग किया जा सकता है, जो Google Inc. द्वारा प्रदान की जाने वाली एक विज्ञापन सेवा है।
                  Google, एक तृतीय-पक्ष विक्रेता के रूप में, हमारी वेबसाइट पर विज्ञापन दिखाने के लिए कुकीज़ (जिसमें DoubleClick कुकी शामिल है) का उपयोग करता है।

                  DoubleClick कुकी Google और उसके भागीदारों को उपयोगकर्ताओं की इस और अन्य वेबसाइटों पर की गई यात्राओं के आधार पर विज्ञापन दिखाने की अनुमति देती है।

                  उपयोगकर्ता Google विज्ञापन सेटिंग्स पर जाकर व्यक्तिगत विज्ञापनों (interest-based ads) को अक्षम कर सकते हैं।

                  तृतीय-पक्ष विज्ञापन सर्वर या नेटवर्क अपनी विज्ञापनों और लिंक में कुकीज़, JavaScript या Web Beacons जैसी तकनीकों का उपयोग कर सकते हैं, जिन पर हमारा कोई नियंत्रण नहीं होता।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">8. तृतीय-पक्ष लिंक (Third-Party Links)</h3>
                <p>
                  हमारी वेबसाइट में तीसरे पक्ष की वेबसाइटों के लिंक हो सकते हैं। हम इन वेबसाइटों की गोपनीयता नीतियों के लिए जिम्मेदार नहीं हैं।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">9. बच्चों की गोपनीयता (Children's Privacy)</h3>
                <p>
                  हम जानबूझकर बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करते।
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">10. इस नीति में परिवर्तन (Changes to This Policy)</h3>
                <p>
                  हम इस गोपनीयता नीति को समय-समय पर अपडेट कर सकते हैं। महत्वपूर्ण परिवर्तनों के बारे में हम आपको सूचित करेंगे।
                </p>
              </section>

              

              <section>
                <h3 className="text-2xl font-serif text-orange-700 mb-4">11. हमसे संपर्क करें (Contact Us)</h3>
                <p>
                  यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें।
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

export default PrivacyPolicy;