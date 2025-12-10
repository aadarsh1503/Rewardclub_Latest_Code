import React, { useState, useEffect, useRef, useMemo } from 'react';
import "../../App.css";
import ImageSlider from '../ImageSlider/ImageSlider';
import TierCard from '../TierCard/TierCard';
import MostLovedBrands from '../MostLovedBrands/MostLovedBrands';
import Slide from '../Slide/Slide';
import { useTranslation } from 'react-i18next';
import Faqactive from '../Faq/Faqactive';
import "./b.css"
import i1 from "./i1.webp"
import i2 from "./i2.webp"
import i3 from "./i3.webp"
import i4 from "./i4.png"

const LifestyleRewards = () => {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');
  const [activeId, setActiveId] = useState(1);
  const [isPaused, setIsPaused] = useState(false); 
  const [isInView, setIsInView] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null); 
  const sectionRef = useRef(null);

  // Define the Gold Color constant for easy usage if needed, mostly used as arbitrary value below
  // Gold: #827127

  useEffect(() => {
    setIsRTL(i18n.language === 'ar');
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const stats = useMemo(() => [
    { id: 1, val: "70+", label: t("brands"), img: i2, note: "ACTIVE SOON" },
    { id: 2, val: "5", label: t("countries"), img: i3, note: null },
    { id: 3, val: "3", label: t("tiers"), img: i1, note: null },
    { id: 4, val: "50", label: t("rewards"), img: i4, note: null },
  ], [t]); 

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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 } 
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPaused || !isInView || isScrolling) return;
    const interval = setInterval(() => {
      setActiveId((currentId) => {
        return currentId === stats.length ? 1 : currentId + 1;
      });
    }, 2000); 
    return () => clearInterval(interval);
  }, [isPaused, isInView, isScrolling, stats.length]); 

  return (
    <div className="bg-white  overflow-hidden">
      <ImageSlider />

      <section ref={sectionRef} className="relative  w-full lg:h-[600px] flex flex-col lg:flex-row font-roboto bg-white">
        
        {/* LEFT PANEL */}
        <div className="lg:w-[35%] w-full relative z-20 flex flex-col justify-center px-8 md:px-16 py-16 bg-white border-b lg:border-b-0 lg:border-r border-gray-100 shadow-xl lg:shadow-none">
           <div className="absolute top-8 left-8 text-9xl font-black text-[#827127] opacity-5 pointer-events-none select-none -z-10">
            01
          </div>

          <div className="space-y-8">
            <div className="w-16 h-1 bg-[#827127] relative top-6 "></div>
            
            <h2 className="text-5xl lg:text-7xl font-bold text-black leading-[0.95] tracking-tighter">
              {t("discover_lifestyle").split(' ')[0]} <br/>
              <span className="text-[#827127]">{t("discover_lifestyle").split(' ').slice(1).join(' ')}</span>
            </h2>
            
            <p className="text-gray-500 text-lg leading-relaxed font-light max-w-sm">
              {t("description")}
            </p>

<a href='/offers-rewards' className="inline-block pt-6">
  <button className="relative px-10 py-4 group bg-transparent border-none outline-none cursor-pointer">
    
    {/* 1. Main Background with Cut Corners (Polygon Shape) */}
    <div className="absolute inset-0 bg-transparent border-2 border-[#827127] transition-all duration-300 ease-out 
      group-hover:bg-[#827127] group-hover:scale-[1.02]
      [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]">
    </div>

    {/* 2. Side "Technical" Bars (Left & Right) */}
    <div className="absolute top-1/2 -left-2 -translate-y-1/2 h-1/2 w-1 bg-[#827127] transition-all duration-300 group-hover:h-full group-hover:-left-3"></div>
    <div className="absolute top-1/2 -right-2 -translate-y-1/2 h-1/2 w-1 bg-[#827127] transition-all duration-300 group-hover:h-full group-hover:-right-3"></div>

    {/* 3. Small Corner Dots (Decorative) */}
    <div className="absolute top-0 left-0 w-1 h-1 bg-[#827127] transition-all group-hover:bg-white z-20"></div>
    <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#827127] transition-all group-hover:bg-white z-20"></div>

    {/* 4. Text Content */}
    <span className="relative z-10 flex items-center gap-3 font-mono font-bold tracking-[0.2em] uppercase text-[#827127] transition-colors duration-300 group-hover:text-white">
      {t("unlock_rewards")} 
      {/* Small Arrow Icon */}
      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
    </span>

  </button>
</a>
          </div>
        </div>

        {/* RIGHT PANEL - MODIFIED FOR ELEGANT CONTRAST */}
        <div 
          className="lg:w-[65%] w-full h-[1100px] lg:h-full flex flex-col lg:flex-row bg-[#827127]"
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          {stats.map((item) => (
            <div 
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              // --- CHANGES HERE: Gradient logic for Inactive vs White for Active ---
              className={`
                relative h-full border-b lg:border-b-0 lg:border-l border-white/10 
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-crosshair group will-change-auto
                ${activeId === item.id 
                  ? 'flex-[10] lg:flex-[3] bg-white shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.2)] z-10' 
                  : 'lg:flex-1 flex-10 bg-gradient-to-b from-[#827127] h-[800px] to-[#63561e] hover:brightness-110'
                }
              `}
              style={{ willChange: 'flex-grow' }} 
            >
              
              {/* Background Pattern/Image for texture */}
              <img 
                src={item.img} 
                alt="bg" 
                className={`
                  absolute -bottom-20 -right-20 w-80 h-80 object-contain transition-transform duration-700
                  ${activeId === item.id 
                    ? 'opacity-5 grayscale rotate-0 scale-100' // Subtle on white
                    : 'opacity-10 mix-blend-overlay rotate-12 scale-125' // Texture on Gold
                  }
                `} 
              />

              <div className="absolute inset-0 flex flex-col p-6 lg:p-12 justify-between z-10">
                {/* ICON & INDICATOR */}
                <div className="flex justify-between items-start">
                  <div className={`
                     flex items-center justify-center rounded-full transition-all duration-500
                    ${activeId === item.id 
                      ? 'bg-[#827127] text-white shadow-xl shadow-[#827127]/30 w-28 h-28' // Active: Gold Icon
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 h-14 w-14 text-white' // Inactive: Glassy White Icon
                    }
                  `}>
                    <img 
                      src={item.img} 
                      className={`object-contain transition-all duration-500
                        ${activeId === item.id 
                          ? 'brightness-0 invert w-20 h-20' // White icon inside Gold circle
                          : 'brightness-0 invert w-6 h-6 opacity-70' // White icon inside Glassy circle
                        }`} 
                      alt="icon" 
                    />
                  </div>
                  
                  {/* Dot Indicator */}
                  <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeId === item.id ? 'bg-[#827127]' : 'bg-white/50 animate-pulse'}`}></div>
                </div>

                {/* VERTICAL LABEL (When collapsed) */}
                {activeId !== item.id && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                    <span className="block -rotate-90 text-white/40 font-bold tracking-[0.2em] uppercase whitespace-nowrap text-lg">
                      {item.label}
                    </span>
                  </div>
                )}

                {/* CONTENT (When expanded) */}
                <div className={`transition-all duration-500 ${activeId === item.id ? 'opacity-100 translate-y-0' : 'opacity-100 lg:opacity-0 lg:translate-y-10'}`}>
                   {item.note && (
                    <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-widest text-white bg-[#827127] rounded-full uppercase shadow-md">
                      {item.note}
                    </span>
                  )}
                  
                  {/* Text Color Change: Black/Gold when Active, White when Inactive (mobile view) */}
                  <h3 className={`text-6xl lg:text-8xl font-black tracking-tighter transition-colors duration-500 ${activeId === item.id ? 'text-black' : 'text-white'}`}>
                    {item.val}
                  </h3>
                  
                  <p className={`text-xl font-medium uppercase tracking-widest mt-2 transition-colors duration-500 ${activeId === item.id ? 'text-[#827127]' : 'text-white/60'} ${activeId === item.id ? 'block' : 'lg:hidden'}`}>
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Slide />
      <TierCard />
      <MostLovedBrands />
      <Faqactive />
    </div>
  );
};

export default LifestyleRewards;