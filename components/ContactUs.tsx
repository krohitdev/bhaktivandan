import React, { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Header from './Header';
import Footer from './Footer';


async function submitContactForm(data) {
  const res = await fetch(
    "https://lguwhpy9b1.execute-api.ap-south-1.amazonaws.com/contact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        captchaToken: data.captchaToken
      })
    }
  );

  const result = await res.json();
  return result;
}

interface ContactUsProps {
  onBack: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const captchaRef = useRef<HCaptcha>(null);
  const SITE_KEY = "cdc214ca-f1be-4956-b338-074c8160eaa6";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please complete the CAPTCHA verification.');
      return;
    }
    setLoading(true);
    try {
      const result = await submitContactForm({ ...formData, captchaToken });
      console.log("Contact Form Submitted:", result);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setCaptchaToken('');
      captchaRef.current?.resetCaptcha();
      setTimeout(() => {
        setSubmitted(false);
      }, 2500);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const onVerifyCaptcha = (token: string) => {
    setCaptchaToken(token);
  };

  return (
    <div className="min-h-screen bg-[#fffbf2] text-stone-800 font-sans selection:bg-orange-200 flex flex-col font-light">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex-grow w-full">
    <div className="max-w-2xl mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-orange-100 mt-4 relative animate-fade-in-up">
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

      <div className="text-center mb-8 mt-1">
        <h2 className="text-3xl font-serif text-orange-700">Contact Us</h2>
        <p className="text-stone-500 mt-2">We value your feedback and suggestions.</p>
      </div>

      {submitted ? (
        <div className="p-8 text-center bg-green-50 rounded-lg border border-green-100 text-green-800 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">Thank you!</h3>
            <p>Your message has been received with gratitude.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    disabled={loading}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
            </div>
            
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    disabled={loading}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Feedback/Suggestion</label>
                <textarea 
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={loading}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all resize-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                ></textarea>
            </div>

            <div className="flex justify-center mb-4">
                <HCaptcha
                    ref={captchaRef}
                    sitekey={SITE_KEY}
                    onVerify={onVerifyCaptcha}
                    theme="light"
                />
            </div>

            <button 
                type="submit"
                disabled={loading || !captchaToken}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg disabled:shadow-none transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
            </button>
        </form>
      )}
    </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;