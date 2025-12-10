import React, { useState } from "react";
import { FaWhatsapp, FaTimes, FaHeadset, FaShoppingBag, FaArrowRight } from "react-icons/fa";

const ChatWidget = ({
  salesNumber = "+10000000000",
  supportNumber = "+10000000001",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (messageType) => {
    const whatsappNumber = messageType === "sales" ? salesNumber : supportNumber;

    if (!whatsappNumber || whatsappNumber.startsWith('+10000')) {
      console.warn(`WhatsApp number for ${messageType} is not configured.`);
      return;
    }

    const message = `Hello, GVS CARGO Team! I'm interested in discussing ${messageType}.`;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const whatsappLink = isMobile
      ? `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  };

  // Check if widget should be active
  const isWidgetActive = (salesNumber && !salesNumber.startsWith('+10000')) || (supportNumber && !supportNumber.startsWith('+10000'));

  if (!isWidgetActive) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      
      {/* --- POPUP CARD --- */}
      <div
        className={`
          absolute bottom-20 right-0 w-[340px] 
          bg-white/90 backdrop-blur-xl border border-white/20
          rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
          overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-right
          ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10 pointer-events-none"}
        `}
      >
        {/* Header with Gradient */}
        <div className="bg-Green p-6 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-1">Hi there! 👋</h3>
            <p className="text-emerald-100 text-sm opacity-90">
              Need help ? Our team typically replies in minutes.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
            Start a conversation
          </p>

          {/* Sales Button */}
          {/* <button
            onClick={() => handleSendMessage("sales")}
            className="group w-full relative overflow-hidden bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
              <FaShoppingBag size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 transition-colors">Sales Inquiry</h4>
              <p className="text-xs text-gray-400">Get quotes & pricing</p>
            </div>
            <FaArrowRight className="text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" size={14} />
          </button> */}

          {/* Support Button */}
          <button
            onClick={() => handleSendMessage("support")}
            className="group w-full relative overflow-hidden bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <FaHeadset size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">Customer Support</h4>
              <p className="text-xs text-gray-400">Assistance</p>
            </div>
            <FaArrowRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" size={14} />
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
            <p className="text-[10px] text-gray-400">Powered by Rewardclub</p>
        </div>
      </div>

      {/* --- TRIGGER BUTTON --- */}
      <button
        onClick={toggleChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-center h-16 rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.4)]
          bg-Green text-white
          transition-all duration-500 ease-out
          ${isOpen ? "w-16 rotate-90" : isHovered ? "w-48" : "w-16"}
        `}
      >
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-slow"></div>
        
        {/* Icon Container */}
        <div className={`transition-all duration-300 ${isOpen ? "rotate-[-90deg]" : ""}`}>
           {isOpen ? <FaTimes size={24} /> : <FaWhatsapp size={28} />}
        </div>

        {/* Text (Only shows on hover when closed) */}
        <span 
          className={`
            whitespace-nowrap overflow-hidden transition-all duration-500 font-bold ml-0
            ${!isOpen && isHovered ? "w-auto opacity-100 ml-3 translate-x-0" : "w-0 opacity-0 -translate-x-4"}
          `}
        >
          Chat with us
        </span>

        {/* Notification Dot (Only when closed) */}
        {/* {!isOpen && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        )} */}
      </button>

      {/* Inline styles for custom animations that Tailwind doesn't cover by default */}
      <style>{`
        .animate-pulse-slow {
          animation: pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(0.95); opacity: 0; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;