import React from 'react';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
const Faqactive = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <div>
{isRTL ? (
    <div className="text-Green bg-[#FBF9FC] text-center text-xl lg:text-2xl py-10 flex justify-center items-center">
    هل لديك أي أسئلة أخرى؟ تحقق من{" "}
    <a
      href="/faq"
      className="text-Green underline ml-2"
    >
      الأسئلة الشائعة
    </a>
  </div>
  
):(
    <div className="text-Green bg-[#FBF9FC] text-center text-xl lg:text-2xl py-10 flex justify-center items-center">
    Any more questions? Check out{" "}
    <a
      href="/faq"
  
      className="text-Green underline ml-2"
    >
      FAQ's
    </a>
  </div>
)}
   
</div>
  );
};

export default Faqactive;
