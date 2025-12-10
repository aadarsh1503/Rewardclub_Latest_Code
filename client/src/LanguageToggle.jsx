import React from 'react';
import { useTranslation } from 'react-i18next';
import "./l.css"
const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = (lang) => {
    console.log(`Changing language to: ${lang}`); // Log the language change
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // Save selected language to local storage
  };

  return (
    <div className="">
    {currentLanguage === 'en' ? (
      <button className='cursor-pointer border-white hover:bg-white border p-2 font-extrabold rounded-full text-white' onClick={() => toggleLanguage('ar')}>عربی</button>
    ) : (
      <button className='cursor-pointer border-white hover:bg-white border p-2 font-bold rounded-full text-white' onClick={() => toggleLanguage('en')}>English</button>
    )}
  </div>
  );
};

export default LanguageToggle;
