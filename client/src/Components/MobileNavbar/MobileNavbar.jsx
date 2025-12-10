import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from "react-i18next"; // Import useTranslation
import LanguageToggle from "../../LanguageToggle";
import { Helmet } from "react-helmet";

import i22 from "./i22.png"; // LTR image
import i24 from "./i24.png"; // RTL image

const MobileNavbar = () => {
  const { t, i18n } = useTranslation(); // Get translation function & i18n instance
  const [isOpen, setIsOpen] = useState(false);

  const isRTL = i18n.dir() === "rtl"; // Check if language is RTL

  return (
    <div className="bg-Green shadow-md font-Poppins  flex items-center justify-between px-4 py-3 md:hidden lg:hidden">
      {/* Logo (Changes based on RTL/LTR) */}
      <a href="/" className="flex items-center">
        <img src={isRTL ? i24 : i22} alt="Logo" className="h-16 w-auto" />
      </a>

      {/* Mobile Menu Button */}
      <button
        className="bg-green p-2 rounded-md outline-white text-white outline-2 shadow-md transition duration-300 ease-in-out"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} h-full w-3/4 bg-Green text-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
        } z-40 flex flex-col p-6`}
      >
        {/* Close Button */}
        <button
          className="self-end mb-4 text-white text-2xl bg-transparent hover:text-green-200 transition duration-300 ease-in-out"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-6 text-xl">
          <a href="/tiers-benefits" className="px-4 py-2 border-b border-white hover:text-black transition duration-300">
            {t("Explore Tiers")}
          </a>
          <a href="/brands" className="px-4 py-2 border-b border-white hover:text-green-200 transition duration-300">
            {t("Discover Brands")}
          </a>
          <a href="/offers-rewards" className="px-4 py-2 border-b border-white hover:text-green-200 transition duration-300">
            {t("Unlock Rewards")}
          </a>
          <a href="/contact-us" className="px-4 py-2 border-b border-white hover:text-green-200 transition duration-300">
            {t("Get Support")}
          </a>
          <div>
        <a href="/login" target="_blank">
        <button className="px-4 py-2  rounded-md font-semibold outline cursor-pointer text-white outline-white hover:bg-white hover:text-black">
          {t("Login")}
        </button>
        </a>
        <a href="/member-register" target="_blank">
        <button className="px-4 py-2 mr-4 ml-4 rounded-md font-semibold outline cursor-pointer text-white outline-white hover:bg-white hover:text-black">
          {t("Signup")}
        </button>
        </a>
        <a href="/vendor-register" target="_blank">
        <button className="px-4 py-2 mt-4 rounded-md font-semibold outline cursor-pointer text-white outline-white hover:bg-white hover:text-black">
          {t("Vendor_Register")}
        </button>
        </a>
      </div>
          <LanguageToggle />
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
