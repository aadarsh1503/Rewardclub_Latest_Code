import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import i2 from "./i2.png"
import i3 from "./i3.png"
import i4 from "./i4.png"
import i5 from "./i5.png"
import i6 from "./i6.png"

const MostLovedBrands = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  
  const [activeIndex, setActiveIndex] = useState(0); 
  
  // 1. Hover state
  const [isHovered, setIsHovered] = useState(false);
  
  // 2. Viewport visibility state
  const [isInView, setIsInView] = useState(false);
  
  // 3. Scroll state
  const [isScrolling, setIsScrolling] = useState(false);
  
  const sectionRef = useRef(null);
  const scrollTimeoutRef = useRef(null); 

  const brands = useMemo(() => [
    { id: 1, img: i2, name: "Alshaheen Manpower", color: "bg-gray-100", link: "https://alshaheen.pro/" },
    { id: 2, img: i3, name: "Arabi Aseel", color: "bg-gray-50", link: "https://arabiaseel.com/" },
    { id: 3, img: i4, name: "Saffary", color: "bg-gray-100", link: "https://www.saffary.com/" },
    { id: 4, img: i5, name: "Shaheen express", color: "bg-gray-50", link: "https://shaheen.express/" },
    { id: 5, img: i6, name: "GVS Cargo", color: "bg-gray-100", link: "https://gvscargo.com/" },
  ], []);

  // --- LOGIC 1: Intersection Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // --- LOGIC 2: Global Scroll Detection ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // --- LOGIC 3: Animation Loop ---
  useEffect(() => {
    if (isHovered || !isInView || isScrolling) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [isHovered, isInView, isScrolling, brands.length]); 

  const handleCardClick = (link) => {
    if (link) window.open(link, "_blank");
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const activeId = brands[activeIndex].id;

  return (
    <section ref={sectionRef} className="relative bg-white py-12 md:py-24 px-4 overflow-hidden font-sans select-none">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none opacity-[0.03]">
        <h1 className="text-[6rem] md:text-[20rem] font-black tracking-tighter text-black leading-none whitespace-nowrap">
          EXCLUSIVE
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10 md:gap-16">
        
        {/* TOP SECTION (Headers) */}
        <div className="flex flex-col md:flex-row items-start lg:items-end justify-between gap-8">
          <div className={`max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2 mb-4">
               <div className="w-8 h-[2px] bg-Green"></div>
               <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">{t('curated_selection')}</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-black leading-[0.9] tracking-tight">
              {t('most')} <br/>
              <span className="text-Green bg-clip-text bg-gradient-to-r from-Green to-[#827127] italic">
                <span>{t('loved_brands')}</span>
              </span>
            </h2>
          </div>

          <div className={`flex flex-col items-start ${isRTL ? 'md:items-start' : 'md:items-end'} gap-6`}>
            <p className="text-gray-500 text-base md:text-lg font-light max-w-sm leading-relaxed">
              {t('personalized_offers')}
            </p>
            <a href="/brands">
              <button className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-gray-200 hover:border-black transition-colors duration-300">
                <span className="absolute inset-0 w-full h-full bg-Green/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <span className="relative flex cursor-pointer items-center gap-3 text-black font-semibold group-hover:text-Green transition-colors">
                  {t('discover_brands12')}
                  <span className={`text-xl transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-2 rotate-180 mt-2' : 'group-hover:translate-x-2'}`}>→</span>
                </span>
              </button>
            </a>
          </div>
        </div>

        {/* ========================================= */}
        {/* 1. MOBILE VIEW (Grid - 2 items per row)  */}
        {/* ========================================= */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => handleCardClick(brand.link)}
              className={`
                relative w-full aspect-square rounded-2xl p-6 
                flex flex-col items-center justify-center 
                border border-gray-100 shadow-sm transition-transform active:scale-95
                ${brand.color}
              `}
            >
              <img 
                src={brand.img} 
                alt={brand.name} 
                className="w-full h-full object-contain drop-shadow-md"
              />
               <span className="mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">
                  {brand.name}
               </span>
            </div>
          ))}
        </div>

        {/* ========================================= */}
        {/* 2. DESKTOP VIEW (Kinetic Deck)           */}
        {/* ========================================= */}
        <div 
          className="hidden md:flex w-full h-[450px] gap-4"
          onMouseLeave={handleMouseLeave}
        >
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              onClick={() => handleCardClick(brand.link)} 
              onMouseEnter={() => handleMouseEnter(index)}
              className={`
                relative h-full rounded-[2rem] cursor-pointer overflow-hidden 
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                border border-gray-100 shadow-xl shadow-gray-200/50 will-change-auto
                ${activeId === brand.id ? 'flex-[4] opacity-100' : 'flex-[1] opacity-60 hover:opacity-80'}
                ${brand.color}
              `}
              style={{ willChange: 'flex-grow' }} 
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 transition-opacity duration-500 ${activeId === brand.id ? 'opacity-100' : ''}`}></div>

              {/* Vertical Text (Collapsed) */}
              <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                ${activeId === brand.id ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
              `}>
                <span className="whitespace-nowrap -rotate-90 text-gray-400 font-bold tracking-widest text-lg uppercase">
                  {brand.name}
                </span>
              </div>

              {/* Content (Expanded) */}
              <div className={`
                absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700 delay-100
                ${activeId === brand.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90'}
              `}>
                
                {/* 3D Logo */}
                <div className="relative w-full h-full max-h-[200px] flex items-center justify-center filter drop-shadow-2xl">
                  <img 
                    src={brand.img} 
                    alt={brand.name} 
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-110" 
                  />
                  {/* Reflection */}
                  <div className="absolute -bottom-8 w-full h-1/2 opacity-20 blur-sm scale-y-[-1] pointer-events-none mask-fade-bottom">
                    <img src={brand.img} alt="" className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <div className="mt-4 opacity-0 animate-pulse group-hover:opacity-100">
                    <span className="text-[10px] uppercase font-bold text-Green tracking-widest">Click to Visit</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .mask-fade-bottom {
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1), transparent);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1), transparent);
        }
      `}</style>

    </section>
  );
};

export default MostLovedBrands;