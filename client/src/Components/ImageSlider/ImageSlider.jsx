import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./i.css";
import logo from "./i22.png"; 

const ImageSlider = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const ltrVideos = ["https://www.pexels.com/download/video/3249674/"];
  const rtlVideos = ["https://www.pexels.com/download/video/3249674/"];
  const videos = isRTL ? rtlVideos : ltrVideos;
  const hasMultipleVideos = videos.length > 1;

  const settings = {
    dots: hasMultipleVideos,
    infinite: hasMultipleVideos,
    autoplay: hasMultipleVideos,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    rtl: isRTL,
    arrows: false,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)"
  };

  const goldColor = "#827127";

  return (
    <div className="relative w-full h-screen overflow-hidden top-0 z-10 bg-black/20 font-sans">
      
      {/* OVERLAY CONTENT */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between h-full pointer-events-none">
        
        {/* --- Header --- */}
        <div className="flex justify-between items-center p-6 lg:p-10 pointer-events-auto">
            {/* <img src={logo} alt="Reward Club" className="w-24 md:w-32 lg:w-40 drop-shadow-lg" /> */}
            
            <button className="text-white flex items-center gap-3 group focus:outline-none">
                {/* <span className="uppercase tracking-[0.2em] text-xs md:text-sm font-semibold opacity-80 group-hover:opacity-100 transition duration-300">
                  {t("slider_menu")}
                </span> */}
                {/* <div className="flex flex-col items-end space-y-1.5">
                    <span className="block w-8 h-[2px] bg-white group-hover:bg-[#827127] transition-all duration-300"></span>
                    <span className="block w-5 h-[2px] bg-white group-hover:w-8 group-hover:bg-[#827127] transition-all duration-300"></span>
                </div> */}
            </button>
        </div>

        {/* --- Hero Text --- */}
        <div className="flex flex-col items-center text-center px-4 max-w-5xl mx-auto pointer-events-auto mt-[-60px]">
          {/* <span style={{ color: goldColor }} className="uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4 animate-fade-in-up">
            {t("slider_discover")}
          </span> */}
          
          <h1 className="text-4xl md:text-6xl mt-10 lg:text-7xl font-serif text-white font-medium mb-6 leading-tight drop-shadow-2xl">
            {t("slider_title_main")} <br />
            {/* <span className="italic font-light opacity-90">{t("slider_title_sub")}</span> */}
          </h1>
          
          <p className="text-white/90 text-sm md:text-lg max-w-xl mb-10 leading-relaxed font-light drop-shadow-md">
            {t("slider_description")}
          </p>
          <a href="/tiers-benefits" className="inline-block py-2">
  <button className="relative group cursor-pointer isolate">
    
    {/* 1. The Glowing Backdrop (Creates the 'Levitation' feel) */}
    <div className="absolute -inset-0.5 bg-[#827127] rounded-sm opacity-20 blur-md group-hover:opacity-60 transition duration-500 group-hover:duration-200"></div>
    
    {/* 2. Main Button Body */}
    <div className="relative px-10 py-4 bg-white/95 backdrop-blur-xl border border-[#827127]/30 transition-all duration-300 group-hover:bg-[#827127] group-hover:border-[#827127]">
      
      {/* 3. The 'Tech' Corners (The cutout look without using clip-path) */}
      {/* Top Left Corner */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#827127] transition-all duration-300 group-hover:border-white"></span>
      {/* Bottom Right Corner */}
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#827127] transition-all duration-300 group-hover:border-white"></span>
      
      {/* 4. The Running Light Animation (Shine Effect) */}
      <div className="absolute inset-0 overflow-hidden">
         <div className="absolute top-0 left-[-100%] w-[50%] h-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 ease-in-out group-hover:left-[200%]"></div>
      </div>

      {/* 5. Content */}
      <span className="relative flex items-center justify-center gap-3">
        <span className="font-bold uppercase tracking-[0.25em] text-xs md:text-sm text-[#827127] transition-colors duration-300 group-hover:text-white">
          {t("slider_unlock_btn")}
        </span>
        {/* Futuristic Chevron */}
        <span className="text-lg leading-none text-[#827127] transition-all duration-300 group-hover:text-white group-hover:translate-x-1">›</span>
      </span>

    </div>
  </button>
</a>
        </div>

        {/* --- Footer Stats Bar --- */}
        <div className="w-full bg-black/40 backdrop-blur-md border-t border-white/10 pointer-events-auto">
          <div className="max-w-[1400px] mx-auto px-6 py-6 lg:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/10 rtl:divide-x-reverse">
              
              {/* Brands */}
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-2xl md:text-4xl font-serif text-white group-hover:text-[#827127] transition-colors duration-300">70+</span>
                <span style={{ color: goldColor }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">{t("slider_brands")}</span>
                <span className="text-[10px] text-white/50 mt-1 uppercase tracking-wide">{t("slider_brands_note")}</span>
              </div>

              {/* Countries */}
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-2xl md:text-4xl font-serif text-white group-hover:text-[#827127] transition-colors duration-300">5</span>
                <span style={{ color: goldColor }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">{t("slider_countries")}</span>
                <span className="text-[10px] text-white/50 mt-1 uppercase tracking-wide opacity-0 lg:opacity-100">{t("slider_global_reach")}</span> 
              </div>

              {/* Tiers */}
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-2xl md:text-4xl font-serif text-white group-hover:text-[#827127] transition-colors duration-300">3</span>
                <span style={{ color: goldColor }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">{t("slider_tiers")}</span>
                <span className="text-[10px] text-white/50 mt-1 uppercase tracking-wide opacity-0 lg:opacity-100">{t("slider_silver_gold")}</span>
              </div>

              {/* Rewards */}
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-2xl md:text-4xl font-serif text-white group-hover:text-[#827127] transition-colors duration-300">50</span>
                <span style={{ color: goldColor }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">{t("slider_rewards")}</span>
                <span className="text-[10px] text-white/50 mt-1 uppercase tracking-wide">{t("slider_partners_note")}</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* VIDEO BACKGROUND */}
      <Slider {...settings} className="h-full w-full">
        {videos.map((videoSrc, index) => (
          <div key={index} className="relative outline-none h-screen w-full">
            <video
              src={videoSrc}
              className="w-full h-full object-cover" 
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-[#827127]/20 z-10"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;