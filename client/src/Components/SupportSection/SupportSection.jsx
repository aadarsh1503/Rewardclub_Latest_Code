import React, { useState, useEffect, useRef } from "react"; 
import { FaPhoneAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import Faqactive from "../Faq/Faqactive";

const SupportSection = () => {
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState("Bahrain");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isRTL = i18n.dir() === "rtl";

  const supportInfo = {
    Bahrain: { phone: "+971 45284037", email: "support@rewardclub.net", address: t("bahrain_address"), flag: "https://flagcdn.com/w40/bh.png" },
    UAE: { phone: "+971 45284037", email: "support@rewardclub.net", address: t("uae_address"), flag: "https://flagcdn.com/w40/ae.png" },
  };

  // Dropdown logic preserved
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleScroll = () => {
      setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute inset-0  pointer-events-none">
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[600px] h-[600px] bg-Green/5 rounded-full blur-[100px] -translate-y-1/2`}></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gray-200/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm mb-4">
             <span className="w-2 h-2 rounded-full bg-Green animate-pulse"></span>
             <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t("support")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-Green mb-4">{t("support")}</h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            {t("select_country")}
          </p>
        </div>

        {/* --- COUNTRY SELECTOR (Floating Pill) --- */}
        <div className="relative z-50 mb-16" ref={dropdownRef}>
          <div className="flex flex-col items-center gap-3">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("support_in_your_country")}</span>
             
             <div className="relative">
               <button
                 onClick={() => setDropdownOpen(!dropdownOpen)}
                 className={`
                   relative flex items-center justify-between w-64 h-16 px-6 bg-white rounded-full 
                   shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 
                   hover:shadow-xl hover:border-Green/30 hover:-translate-y-1 transition-all duration-300
                   ${dropdownOpen ? 'ring-4 ring-Green/10' : ''}
                 `}
               >
                 <div className="flex items-center gap-4">
                   <img src={supportInfo[country].flag} alt="flag" className="w-8 h-8 rounded-full object-fill shadow-sm" />
                   <span className="font-bold text-gray-800 text-lg">{t(country)}</span>
                 </div>
                 <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-300 ${dropdownOpen ? 'rotate-180 bg-Green text-white' : ''}`}>
                   <IoIosArrowDown />
                 </div>
               </button>

               {/* Dropdown Menu */}
               {dropdownOpen && (
                 <div className="absolute top-full left-0 w-full mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
                   {Object.keys(supportInfo).map((ctry) => (
                     <div
                       key={ctry}
                       onClick={() => {
                         setCountry(ctry);
                         setDropdownOpen(false);
                       }}
                       className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                     >
                       <img src={supportInfo[ctry].flag} alt="flag" className="w-6 h-6 rounded-full object-fill shadow-sm" />
                       <span className="font-semibold text-gray-700">{t(ctry)}</span>
                     </div>
                   ))}
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* --- CONTACT CARDS (Bento Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
          
          {/* Phone Card */}
          <div className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-white hover:border-Green/20 hover:shadow-[0_20px_60px_-15px_rgba(72,187,120,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-Green/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-Green group-hover:text-white transition-all duration-500">
                <FaPhoneAlt className="text-3xl text-Green  transition-colors" />
             </div>
             <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Call Us</h3>
             <p className="text-3xl font-black text-gray-900 group-hover:text-Green transition-colors" dir="ltr">
               {supportInfo[country].phone}
             </p>
             {/* Decorative Background Blur */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-Green/5 rounded-full blur-2xl group-hover:bg-Green/10 transition-all"></div>
          </div>

          {/* Email Card */}
          <div className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-white hover:border-Green/20 hover:shadow-[0_20px_60px_-15px_rgba(72,187,120,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-Green/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-Green group-hover:text-white transition-all duration-500">
                <MdEmail className="text-4xl text-Green  transition-colors" />
             </div>
             <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Email Us</h3>
             <p className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-Green transition-colors break-all">
               {supportInfo[country].email}
             </p>
              {/* Decorative Background Blur */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-Green/5 rounded-full blur-2xl group-hover:bg-Green/10 transition-all"></div>
          </div>

        </div>

        {/* --- INFO DOCK (Hours & Address) --- */}
        <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md border border-white rounded-[2rem] p-8 md:p-10 shadow-lg flex flex-col md:flex-row justify-between gap-10">
          
          {/* Hours */}
          <div className="flex items-start gap-4 md:w-1/2">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
              <FaClock className="text-xl" />
            </div>
            <div>
               <h4 className="font-bold text-gray-900 text-lg mb-2">{t("support_hours")}</h4>
               <div className="space-y-1 text-gray-500 font-medium">
                 <p>09 am - 10 pm <span className="text-Green font-bold">{t("sat")} - {t("thurs")}</span></p>
                 <p>01 pm - 10 pm <span className="text-Green font-bold">{t("fri")}</span></p>
               </div>
            </div>
          </div>

          <div className="hidden md:block w-px bg-gray-200"></div>

          {/* Address */}
          <div className="flex items-start gap-4 md:w-1/2">
             <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
              <FaMapMarkerAlt className="text-xl" />
            </div>
            <div>
               <h4 className="font-bold text-gray-900 text-lg mb-2">{t("office_address")}</h4>
               <p className="text-gray-500 font-medium leading-relaxed">
                 {supportInfo[country].address}
               </p>
            </div>
          </div>

        </div>

        {/* --- FAQ SECTION --- */}
        <div className="w-full mt-20">
          <Faqactive />
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SupportSection;