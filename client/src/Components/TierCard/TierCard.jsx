import React from 'react';
import { useTranslation } from 'react-i18next';

const TierCard = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full py-24 bg-[#F8F9FB] overflow-hidden selection:bg-Green selection:text-white font-sans">
      
      {/* --- Background: Subtle Futuristic Grid & Ambient Glows --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Grid Pattern */}
         <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
         </div>
         {/* Sexy Ambient Blobs (Pulsing) */}
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-Green/10 rounded-full blur-3xl animate-pulse mix-blend-multiply"></div>
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-Green/10 rounded-full blur-3xl animate-pulse mix-blend-multiply" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className=" mb-20 relative">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
            <span className="text-black">{t('explore_tiers')}</span>
            <span className="text-Green ml-4 relative inline-block">
              {t('tiers')}
              {/* Glowing dot */}
              {/* <span className="absolute -top-2 -right-4 w-3 h-3 bg-Green rounded-full shadow-[0_0_15px_rgba(0,255,0,0.6)] animate-pulse"></span> */}
            </span>
          </h2>
          <div className="mt-6 flex flex-col lg:flex-row items-center gap-6">
            <div className="h-1 w-20 bg-Green rounded-full hidden lg:block shadow-[0_0_10px_rgba(0,255,0,0.4)]"></div>
            <p className="text-gray-500 text-xl font-medium max-w-2xl">
              {t('earn_points')}
            </p>
          </div>
        </div>

        {/* --- 3D Fluid Cards Container --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* --- Card 1: Classic --- */}
          <div className="group relative w-full bg-white rounded-[40px] p-8 lg:p-10 shadow-xl hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100 hover:border-Green/30 cursor-pointer ring-0 hover:ring-2 hover:ring-Green/20">
            {/* Fluid Animation Background */}
            <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-Green translate-y-[100%] translate-x-[-25%] rotate-45 group-hover:translate-y-[-30%] group-hover:rotate-0 transition-transform duration-700 ease-in-out rounded-[40%] z-0"></div>
            
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              {/* Parallax Number */}
              <div className="text-8xl font-black text-gray-100 absolute -top-10 -right-6 group-hover:text-white/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 select-none -z-10">01</div>
              
              <div className="mt-12 mb-6">
                <h3 className="text-4xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                  {t('classic_tier')}
                </h3>
              </div>
              
              <div className="w-full h-px bg-gray-200 group-hover:bg-white/30 my-4 transition-colors duration-300"></div>

              <div className="flex-grow flex flex-col justify-center">
                <p className="text-2xl font-bold text-Green uppercase tracking-wide group-hover:text-white transition-colors duration-300 mb-4 drop-shadow-sm">
                  {t('classic_points')}
                </p>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 text-lg leading-relaxed">
                  {t('classic_description')}
                </p>
              </div>

              {/* Hover Call to Action Indicator */}
              {/* <div className="h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex items-end justify-center mt-2">
                 <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div> */}
            </div>
          </div>

          {/* --- Card 2: Silver --- */}
          <div className="group relative w-full bg-white rounded-[40px] p-8 lg:p-10 shadow-xl hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100 hover:border-Green/30 cursor-pointer ring-0 hover:ring-2 hover:ring-Green/20">
            <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-Green translate-y-[100%] translate-x-[-25%] rotate-45 group-hover:translate-y-[-30%] group-hover:rotate-0 transition-transform duration-700 ease-in-out rounded-[40%] z-0"></div>
            
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="text-8xl font-black text-gray-100 absolute -top-10 -right-6 group-hover:text-white/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 select-none -z-10">02</div>
              
              <div className="mt-12 mb-6">
                <h3 className="text-4xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                  {t('silver_tier')}
                </h3>
              </div>
              
              <div className="w-full h-px bg-gray-200 group-hover:bg-white/30 my-4 transition-colors duration-300"></div>

              <div className="flex-grow flex flex-col justify-center">
                <p className="text-2xl font-bold text-Green uppercase tracking-wide group-hover:text-white transition-colors duration-300 mb-4 drop-shadow-sm">
                  {t('silver_points')}
                </p>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 text-lg leading-relaxed">
                  {t('silver_description')}
                </p>
              </div>

              {/* <div className="h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex items-end justify-center mt-2">
                 <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div> */}
            </div>
          </div>

          {/* --- Card 3: Gold --- */}
          <div className="group relative w-full bg-white rounded-[40px] p-8 lg:p-10 shadow-xl hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100 hover:border-Green/30 cursor-pointer ring-0 hover:ring-2 hover:ring-Green/20">
            <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-Green translate-y-[100%] translate-x-[-25%] rotate-45 group-hover:translate-y-[-30%] group-hover:rotate-0 transition-transform duration-700 ease-in-out rounded-[40%] z-0"></div>
            
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="text-8xl font-black text-gray-100 absolute -top-10 -right-6 group-hover:text-white/10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 select-none -z-10">03</div>
              
              <div className="mt-12 mb-6">
                <h3 className="text-4xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                  {t('gold_tier')}
                </h3>
              </div>
              
              <div className="w-full h-px bg-gray-200 group-hover:bg-white/30 my-4 transition-colors duration-300"></div>

              <div className="flex-grow flex flex-col justify-center">
                <p className="text-2xl font-bold text-Green uppercase tracking-wide group-hover:text-white transition-colors duration-300 mb-4 drop-shadow-sm">
                  {t('gold_points')}
                </p>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 text-lg leading-relaxed">
                  {t('gold_description')}
                </p>
              </div>

              {/* <div className="h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex items-end justify-center mt-2">
                 <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div> */}
            </div>
          </div>

        </div>

        {/* --- Sexy Modern Button with Pulse & Glow --- */}
        <div className="flex justify-center mt-20">
          <a href='/tiers-benefits'>
          <button className="group relative px-12 py-5 bg-white text-gray-900 text-xl font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden ring-1 ring-gray-100 cursor-pointer hover:ring-Green/50">
  
  {/* Button Glow Effect */}
  <div className="absolute inset-0 w-full h-full bg-Green opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
  
  {/* Sliding Fill */}
  <div className="absolute inset-0 w-full h-full bg-Green origin-left transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 z-0"></div>
  
  {/* Content */}
  <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-3">
    {t('get_started')}
    
    {/* --- YAHAN CHANGE KIYA HAI --- */}
    <svg 
      className="w-6 h-6 transform transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
    </svg>
    {/* ----------------------------- */}

  </span>
  
  {/* External Pulse Ring */}
  <span className="absolute -inset-1 rounded-full border border-Green opacity-0 group-hover:opacity-100 group-hover:animate-ping z-[-1]"></span>
</button>
          </a>
        </div>

      </div>
    </div>
  );
};

export default TierCard;