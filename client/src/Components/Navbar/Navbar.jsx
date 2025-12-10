import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; 
import LanguageToggle from "../../LanguageToggle";
import { useTranslation } from "react-i18next";
import i22 from "./i22.png";
import i24 from "./i24.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const location = useLocation();
  
  // --- LOGIC FIX START ---

  const background = location.state?.background || location;
  // --- LOGIC FIX END ---

  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setIsRTL(i18n.language === 'ar');
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 10) {
      setIsAtTop(true);
      setIsVisible(true);
    } else {
      setIsAtTop(false);
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const logo = i18n.dir() === "rtl" ? i24 : i22;

  const navItems = [
    { href: "/tiers-benefits", label: t("Explore Tiers") },
    { href: "/brands", label: t("Discover Brands") },
    { href: "/offers-rewards", label: t("Unlock Rewards") },
    { href: "/contact-us", label: t("Get Support") },
  ];

  return (
    <nav
      className={`
        fixed z-[1000] lg:flex hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        flex items-center justify-between
        
        ${isVisible ? "translate-y-0" : "-translate-y-[200%]"}

        ${isAtTop 
          ? `top-0 w-full rounded-none shadow-md  px-6 xl:px-12 border-b border-white/10 ${
              isHomePage 
                ? "bg-[#827127]/10 backdrop-blur-sm" 
                : "bg-Green"                          
            }`
          : "top-4 lg:top-5 w-[98%] bg-[#827127]/90 font-semibold xl:w-[92%] max-w-[1800px] rounded-full bg-Green/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] py-2.5 px-4 xl:px-8 left-0 right-0 mx-auto" 
        }
      `}
    >
      {/* ---------------- LEFT: LOGO ---------------- */}
      <div className="flex-shrink-0">
        <Link to="/" className="relative group block">
          {!isAtTop && <div className="absolute inset-0 bg-white/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>}
          <img 
            src={logo} 
            alt="Logo" 
            className={`w-auto relative z-10 transition-transform duration-300 group-hover:scale-105 ${isAtTop ? 'h-20' : 'h-8 xl:h-16'}`} 
          />
        </Link>
      </div>

      {/* ---------------- CENTER: NAV LINKS ---------------- */}
      <ul className={`
        hidden lg:flex items-center justify-center text-white font-medium transition-all duration-500 flex-nowrap
        ${isAtTop ? "gap-6 xl:gap-8" : "gap-3 xl:gap-8 font-semibold"} 
      `}>
        {navItems.map((item, index) => (
          <li key={index} className="relative group shrink-0">
            <Link
              to={item.href}
              className={`
                cursor-pointer relative whitespace-nowrap transition-all duration-300 tracking-wide
                ${location.pathname === item.href ? "text-white font-bold" : "text-white/90 hover:text-white"}
                ${isAtTop ? 'text-base' : 'text-xs xl:text-sm font-bold'}
              `}
            >
              {item.label}
              <span className={`
                absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 shadow-[0_0_10px_white]
                ${location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full "}
              `}></span>
            </Link>
          </li>
        ))}
      </ul>

      {/* ---------------- RIGHT: BUTTONS & TOGGLE ---------------- */}
      <div className={`hidden lg:flex items-center flex-nowrap ${isAtTop ? 'gap-4' : 'gap-2 xl:gap-4'}`}>
        
        {/* 1. Login Button */}
        <Link 
          to="/login" 
          state={{ background: background }} // Corrected here
          replace={!!location.state?.background} // Replace history if switching between modals
        >
          <button className={`
            font-semibold cursor-pointer whitespace-nowrap transition-all duration-300
            ${isAtTop 
              ? "px-5 py-2 rounded-md border-2 border-white text-white hover:bg-white hover:text-black text-sm xl:text-base" 
              : "px-3 xl:px-5 py-1.5 xl:py-2 rounded-full border border-white/50 text-white hover:bg-white/20 hover:backdrop-blur-md hover:border-white text-xs xl:text-sm"
            }
          `}>
            {t("Login")}
          </button>
        </Link>

        {/* 2. Signup Button */}
        <Link 
          to="/member-register" 
          state={{ background: background }} // Corrected here
          replace={!!location.state?.background} // Replace history if switching between modals
        >
          <button className={`
            font-semibold cursor-pointer whitespace-nowrap transition-all duration-300
            ${isAtTop 
              ? "px-5 py-2.5 rounded-md bg-white text-black hover:bg-gray-100 border-2 border-white text-sm xl:text-base"
              : "relative overflow-hidden px-4 xl:px-6 py-1.5 xl:py-2.5 rounded-full bg-white text-black shadow-lg hover:scale-105 text-xs xl:text-sm"
            }
          `}>
            <span className="relative z-10">{t("Signup")}</span>
            {!isAtTop && (
               <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0 w-full h-full"></div>
            )}
          </button>
        </Link>

        {/* 3. Vendor Register */}
        <Link 
          to="/vendor-register" 
          state={{ background: background }} // Corrected here
          replace={!!location.state?.background} // Replace history if switching between modals
        >
          <button className={`
            font-semibold cursor-pointer whitespace-nowrap transition-all duration-300
            ${isAtTop 
              ? "px-5 py-2 rounded-md border-2 border-white text-white hover:bg-white hover:text-black text-sm xl:text-base" 
              : "px-3 xl:px-5 py-1.5 xl:py-2 rounded-full border border-white/50 text-white hover:bg-white/20 hover:backdrop-blur-md hover:border-white text-xs xl:text-sm"
            }
          `}>
            {t("Vendor_Register")}
          </button>
        </Link>

        {/* 4. LANGUAGE TOGGLE */}
        <div className="flex items-center shrink-0">
          <div className={`
             h-6 xl:h-8 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent
             ${isRTL ? 'ml-2 xl:ml-4' : 'mr-2 xl:mr-4'}
          `}></div>

          <div className={`
             relative z-10 p-0.5 xl:p-1 cursor-pointer rounded-full transition-all duration-300
             ${!isAtTop ? 'bg-white/10 hover:bg-white/20 backdrop-blur-md ' : ''}
          `}>
            <LanguageToggle />
          </div>
        </div>

      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;