import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const countryRates = {
  Kuwait: { CLASSIC: 10, SILVER: 15, GOLD: 20, currency: "KWD", flag: "https://flagcdn.com/w40/kw.png" },
  Qatar: { CLASSIC: 1, SILVER: 1.5, GOLD: 2, currency: "QAR", flag: "https://flagcdn.com/w40/qa.png" },
  Bahrain: { CLASSIC: 10, SILVER: 15, GOLD: 20, currency: "BHD", flag: "https://flagcdn.com/w40/bh.png" },
  UAE: { CLASSIC: 1, SILVER: 1.5, GOLD: 2, currency: "AED", flag: "https://flagcdn.com/w40/ae.png" },
  KSA: { CLASSIC: 1, SILVER: 1.5, GOLD: 2, currency: "SAR", flag: "https://flagcdn.com/w40/sa.png" },
  Oman: { CLASSIC: 1, SILVER: 1.5, GOLD: 2, currency: "OMR", flag: "https://flagcdn.com/w40/om.png" },
};

const PointsCalculator = () => {
  const { t, i18n } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState("Bahrain");
  const [amount, setAmount] = useState("1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isRTL = i18n.dir() === "rtl";

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;
    value = value.replace(/^0+/, "");
    if (value === "" || isNaN(value)) {
      setAmount("");
    } else {
      let numericValue = Math.max(1, Math.min(99999, Number(value)));
      setAmount(numericValue.toString());
    }
  };

  return (
    <section className="relative w-full py-24 px-4 bg-gray-50 mt-8 overflow-hidden font-sans">
      
      {/* --- 1. AMBIENT BACKGROUND --- */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[800px] h-[800px] border-[100px] border-Green/5 rounded-full blur-[100px] -translate-y-1/2`}></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-[#827127]/10 rounded-full blur-[80px]"></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* --- 2. HEADER --- */}
        <div className="text-center mb-16 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.3em] text-Green uppercase mb-4 block">
            {t('pointsCalculator.title')}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            {t('pointsCalculator.headlinePrefix')} <br/>
            <span className="text-transparent bg-clip-text bg-Green">
              {t('pointsCalculator.headlineHighlight')}
            </span>
          </h2>
          <p className="text-gray-500 text-lg">{t('pointsCalculator.description')}</p>
        </div>

        {/* --- 3. INPUT BAR --- */}
        <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-2 mb-20 flex flex-col md:flex-row items-center gap-2 relative z-30">
          
          {/* Country Trigger */}
          <div className="relative w-full md:w-1/3">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-20 bg-gray-50 hover:bg-gray-100 rounded-[1.5rem] flex items-center justify-between px-6 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img src={countryRates[selectedCountry].flag} alt="flag" className="w-8 h-8 rounded-full shadow-sm object-cover" />
                <div className="flex flex-col items-start text-start">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('pointsCalculator.country')}</span>
                  <span className="text-lg font-bold text-gray-800">{t(`pointsCalculator.countries.${selectedCountry}`)}</span>
                </div>
              </div>
              <svg className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                {Object.keys(countryRates).map((country) => (
                  <div
                    key={country}
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    onClick={() => handleCountryChange(country)}
                  >
                    <img src={countryRates[country].flag} alt={country} className="w-6 h-6 rounded-full" />
                    <span className="font-semibold text-gray-700">{t(`pointsCalculator.countries.${country}`)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-gray-200 mx-2"></div>

          {/* Amount Input */}
          <div className="w-full md:w-2/3 relative">
            <label className={`absolute top-4 ${isRTL ? 'right-6' : 'left-6'} text-xs font-bold text-gray-400 uppercase tracking-wider z-10 pointer-events-none`}>
              {t('pointsCalculator.purchaseAmount')}
            </label>
            <input
              type="number"
              className={`w-full h-20 bg-white rounded-[1.5rem] ${isRTL ? 'pr-6 pl-24' : 'pl-6 pr-24'} text-4xl font-black text-gray-900 placeholder-gray-200 focus:outline-none focus:ring-4 focus:ring-Green/10 pt-5`}
              value={amount}
              onChange={handleAmountChange}
              placeholder="0"
              style={{ direction: 'ltr', textAlign: isRTL ? 'right' : 'left' }} // Keeps number formatting clean
            />
            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-6' : 'right-6'} pointer-events-none`}>
              <span className="text-xl font-bold text-Green bg-Green/10 px-3 py-1 rounded-lg">
                {t(`pointsCalculator.currencies.${countryRates[selectedCountry].currency}`)}
              </span>
            </div>
          </div>

        </div>

        {/* --- 4. RESULTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {Object.entries(countryRates[selectedCountry])
            .filter(([tier]) => tier !== "currency" && tier !== "flag")
            .map(([tier, rate]) => {
              
              const calculatedPoints = amount ? Math.floor(Number(amount) * rate) : 0;
              const isGold = tier === "GOLD";
              const isSilver = tier === "SILVER";

              return (
                <div 
                  key={tier}
                  className={`
                    relative h-64 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                    ${isGold 
                      ? "bg-gradient-to-br from-[#827127] to-[#5c501b] text-white shadow-[0_20px_60px_-15px_rgba(130,113,39,0.5)]" 
                      : isSilver 
                        ? "bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800 shadow-xl"
                        : "bg-white border border-gray-100 text-gray-800 shadow-lg"
                    }
                  `}
                >
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, transparent 20%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.5) 22%, transparent 22%)' }}></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="w-12 h-8 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-80 border border-yellow-600/30 flex items-center justify-center">
                       <div className="w-8 h-px bg-black/20"></div>
                    </div>
                    <span className={`text-sm font-bold tracking-[0.2em] uppercase ${isGold ? 'text-white/70' : 'text-gray-400'}`}>
                      {t(`pointsCalculator.tiers.${tier.toLowerCase()}`)}
                    </span>
                  </div>

                  <div className="relative z-10">
                     <div className={`text-xs font-bold uppercase mb-1 ${isGold ? 'text-white/60' : 'text-gray-400'}`}>
                        {t('pointsCalculator.earningRate')}
                     </div>
                     <div className="text-xl font-bold tracking-widest">{rate}x {t('pointsCalculator.points')}</div>
                  </div>

                  <div className="relative z-10">
                    <div className={`text-xs font-bold uppercase mb-1 ${isGold ? 'text-white/60' : 'text-gray-400'}`}>
                      {t('pointsCalculator.points')} {t('pointsCalculator.earned')}
                    </div>
                    <div className="flex items-baseline gap-2">
                       <span className={`text-5xl font-mono font-bold tracking-tight ${isGold ? 'text-white' : 'text-Green'}`}>
                         {calculatedPoints}
                       </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/30 pointer-events-none rounded-[2rem]"></div>
                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
};

export default PointsCalculator;