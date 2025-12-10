import { useState } from "react";
import React from "react";
import { useTranslation } from 'react-i18next';
import Faqactive from "../Faq/Faqactive";
import "./b.css";

// Images
import i2 from "./i2.png"
import i3 from "./i3.png"
import i4 from "./i4.png"
import i5 from "./i5.png"
import i6 from "./i6.png"

const brands = [
  { name: "Alshaheen Manpower", category: "Manpower", src: i2, alt: "Alshaheen Manpower" },
  { name: "Arabi Aseel", category: "Food", src: i3, alt: "Arabi Aseel" },
  { name: "Saffary", category: "Food", src: i4, alt: "Saffary" },
  { name: "Shaheen Express", category: "Transport", src: i5, alt: "Shaheen Express" },
  { name: "GVS Cargo", category: "Logistics", src: i6, alt: "GVS Cargo" },
];

export default function BrandFilter() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const isRTL = i18n.dir() === "rtl";
  const categories = t("categories", { returnObjects: true }); 

  const filteredBrands = brands.filter((brand) =>
    (selectedCategory === "All" || brand.category === selectedCategory) &&
    brand.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueBrands = [];
  const displayedBrandNames = new Set();

  const finalBrands = filteredBrands.filter((brand) => {
    if (!displayedBrandNames.has(brand.name)) {
      displayedBrandNames.add(brand.name);
      uniqueBrands.push(brand);
      return true;
    }
    return false;
  });

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* --- 1. TECH TEXTURE BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot Matrix Pattern */}
        <div className="absolute inset-0 opacity-[0.3]" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
        </div>
        {/* Soft Green Glow Top Right */}
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[800px] h-[800px] bg-Green/5 rounded-full blur-[120px] -translate-y-1/2`}></div>
      </div>

      <div className="relative z-10 pt-32 pb-20">
        
        {/* --- 2. HEADER --- */}
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-Green animate-pulse"></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t("discover_brands")}</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-4">
             {t("discover_brands")} <br/>
             <span className="text-Green">{t("discover_brands1")}</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
            {t("explore_brands")}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          
          {/* --- 3. THE "FLOATING CONTROL DECK" --- */}
          <div className="sticky top-24 z-30 mb-16">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem] p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2 p-1 bg-gray-100/50 rounded-full">
                {categories.map((category) => (
                  <button
                    key={category} 
                    onClick={() => setSelectedCategory(category)} 
                    className={`
                      relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300
                      ${selectedCategory === category 
                        ? 'bg-white text-Green shadow-md' 
                        : 'text-gray-500 hover:text-black hover:bg-white/50'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative w-full lg:w-96 group">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-4' : 'left-4'} flex items-center pointer-events-none`}>
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-Green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input 
                  type="text"
                  placeholder={t("search_placeholder")} 
                  className={`
                    w-full py-4 bg-gray-50 border-2 border-transparent rounded-2xl 
                    text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:bg-white focus:border-Green/30 focus:shadow-lg focus:shadow-Green/10
                    transition-all duration-300
                    ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                  `}
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </div>

            </div>
          </div>
          
          {/* --- 4. THE BRAND GRID --- */}
          {finalBrands.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {finalBrands.map((brand) => (
                <div 
                  key={brand.name} 
                  className="group relative h-56 bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:border-Green/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center justify-center p-6"
                >
                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10 pointer-events-none"></div>

                  {/* Top Badge (Category) */}
                  <div className="absolute top-4 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{brand.category}</span>
                  </div>

                  {/* Image Container (Floating) */}
                  <div className="relative z-10 w-full h-28 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    <img 
                      src={brand.src} 
                      alt={brand.alt} 
                      className="max-w-full max-h-full object-contain drop-shadow-sm group-hover:drop-shadow-xl transition-all duration-300" 
                    />
                  </div>

                  {/* Brand Name (Appears on hover) */}
                  <div className="absolute bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-center px-2">
                    <h3 className="text-sm font-bold text-gray-900 truncate w-full">{brand.name}</h3>
                  </div>

                  {/* Subtle Green Glow Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-Green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">No brands found</h3>
              <p className="text-gray-500">We couldn't find matches for "{searchQuery}"</p>
            </div>
          )}

        </div>
        
        {/* --- 5. FAQ --- */}
        <div className="mt-24">
          <Faqactive />
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}