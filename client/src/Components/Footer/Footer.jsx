import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('email', email);
      formData.append('list', '7H892J5BEVl7HofjvP7MYb9w');
      formData.append('subform', 'yes');
      await fetch('https://send.alzyara.com/subscribe', {
        method: 'POST', body: formData, mode: 'no-cors',
      });
      setMessage('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Subscription failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-white pt-24 pb-10 overflow-hidden font-sans text-gray-800">
      
      {/* --- AMBIENT ATMOSPHERE (The "Glow") --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Right Green Blur */}
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[600px] h-[600px] bg-Green/5 rounded-full blur-[120px]`}></div>
        {/* Bottom Left Gold Blur */}
        <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[500px] h-[500px] bg-[#827127]/5 rounded-full blur-[100px]`}></div>
        {/* Noise Texture for Realism */}
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* COLUMN 1: NAVIGATION (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-Green"></div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">{t("Menu")}</span>
            </div>
            
            <ul className="space-y-3">
              {[
                { href: "/tiers-benefits", label: t("exploreTiers") },
                { href: "/brands", label: t("discoverBrands") },
                { href: "/offers-rewards", label: t("unlockRewards") },
                { href: "/contact-us", label: t("getSupport") },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="group flex items-center gap-2 text-xl font-bold text-gray-800 transition-all duration-300 hover:text-Green hover:pl-2">
                    <span className="text-transparent group-hover:text-Green transition-colors duration-300 text-sm">●</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: CONTACT & SOCIAL (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            
            {/* Call Action */}
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400 block mb-3">{t("customerSupport")}</span>
              <a href="tel:+97145284037" className="group flex items-center gap-4 bg-white border border-gray-100 shadow-sm p-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-Green/10 hover:border-Green/30 hover:-translate-y-1">
                <div className="w-10 h-10 bg-Green/10 rounded-full flex items-center justify-center text-Green text-lg group-hover:bg-Green group-hover:text-white transition-colors">
                  📞
                </div>
                <div>
                  <p className="text-xs text-gray-400">{t("callSupport")}</p>
                  <p className="font-bold text-gray-800 font-mono text-lg" dir="ltr">+971 45284037</p>
                </div>
              </a>
              <a href="mailto:support@rewardclub.net" className="inline-block mt-3 text-sm font-medium text-gray-500 hover:text-Green hover:underline decoration-Green decoration-2 underline-offset-4 transition-all">
                support@rewardclub.net
              </a>
            </div>

            {/* Socials - Liquid Buttons */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, link: "https://www.facebook.com/rewardclubloyalty" },
                { icon: FaInstagram, link: "https://www.instagram.com/reward_club_/" },
                { icon: FaXTwitter, link: "https://x.com/Reward_Club_" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative overflow-hidden w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 group transition-all duration-300 hover:border-Green hover:shadow-lg hover:shadow-Green/20"
                >
                  <div className="absolute inset-0 bg-Green translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <social.icon className="relative z-10 text-xl group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 3: THE NEWSLETTER (Span 5) - "The White Futuristic Card" */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-[0_20px_50px_-12px_rgba(72,187,120,0.2)] border border-gray-100 overflow-hidden isolate">
              
              {/* Decorative Background Blobs inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-Green/20 to-transparent rounded-bl-[100px] -z-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#827127]/10 to-transparent rounded-tr-[100px] -z-10"></div>

              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
                  {t("newsletterHeading") || "Join the Club"}
                </h3>
                {/* <p className="text-gray-500 leading-relaxed">
                   Get exclusive updates and rewards delivered. No spam.
                </p> */}
              </div>

              <form onSubmit={handleSubscribe} className="relative group">
                <div className="relative">
                  {/* The Input */}
                  <input
                  dir="ltr"
                    type="email"
                    placeholder={t("enterYourEmail") || "Enter your email address"}
                    className="w-full h-16  bg-gray-50 border border-gray-200 rounded-full pl-6 pr-36 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-Green/50 focus:bg-white transition-all duration-300 shadow-inner"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  
                  {/* The Button (Fused Inside) */}
                  <button
                  dir="ltr"
                    type="submit"
                    disabled={loading}
                    className={`
                      absolute top-2 bottom-2 
                      ${isRTL ? 'right-2' : 'right-2'}
                      bg-black hover:bg-Green hover:text-white text-white font-bold rounded-full px-8
                      transition-all duration-300 cursor-pointer  shadow-lg  hover:scale-105 active:scale-95
                      flex items-center gap-2
                    `}
                  >
                    {loading ? (
                       <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>{t("register") || "Subscribe"}</span>
                        {!isRTL && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                      </>
                    )}
                  </button>
                </div>
                
                {/* Status Message */}
                {message && (
                  <div className="absolute -bottom-8 left-6 text-sm font-semibold text-Green animate-fade-in-up">
                    {message}
                  </div>
                )}
              </form>

            </div>
          </div>

        </div>

        {/* --- FOOTER BOTTOM --- */}
        <div className="mt-20 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400 font-medium">
            © {new Date().getFullYear()} Reward Club. {t("copyright")}
          </p>
          
          <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
            <a href="/about-us" className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-Green hover:bg-white rounded-full transition-all">{t("About_us")}</a>
            <a href="/terms-conditions" className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-Green hover:bg-white rounded-full transition-all">{t("termsConditions")}</a>
            <a href="/privacy-statement" className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-Green hover:bg-white rounded-full transition-all">{t("privacyPolicy")}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;