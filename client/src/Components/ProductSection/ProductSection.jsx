import React from "react";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import Purchasepremium from "../Purchasepremium/Purchasepremium";
import { FaHome } from "react-icons/fa";

const ProductCard = ({ imgSrc, brandLogo, title }) => {
  const { t } = useTranslation(); // Use the translation hook

  return (
    <div className="">
      <div className="rounded-xl shadow-lg mt-10 overflow-hidden bg-white">
        <div className="relative">
          <img src={imgSrc} alt="Product" className="w-full h-64 object-cover" />
          
        </div>
        <div className="p-4">
          <span className="px-2 py-1 rounded-md whitespace-nowrap flex items-center gap-1">
            <div className="shadow-custom p-2 flex">
              <FaHome className="mr-2 mt-1 ml-2" /> {t('inStore')} {/* Use translation for "In-store" */}
            </div>
          </span>
          <h3 className="mt-2 text-lg font-bold text-gray-900">{title}</h3>
        </div>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const { t } = useTranslation(); // Use the translation hook

  const products = [
    {
      imgSrc: "https://splashfragrance.in/wp-content/uploads/2023/09/Neroli-36-By-Le-Labo-100ml-Perfume-Tester-with-Cap-min.jpg",
      brandLogo: "https://www.aura-mena.com/sites/default/files/styles/brand_logo/public/brand-logo/2024-05/LEL.png?itok=nnYs_pkE",
      titleKey: "product1", // Link to the title in the translation file
    },
    {
      imgSrc: "https://5.imimg.com/data5/SELLER/Default/2022/9/NY/RN/UX/94407416/new-product.jpeg",
      brandLogo: "https://www.aura-mena.com/sites/default/files/styles/brand_logo/public/brand-logo/2024-05/MAC.png?itok=JClg16gW",
      titleKey: "product2", // Link to the title in the translation file
    },
    {
      imgSrc: "https://www.flowesscents.com/cdn/shop/articles/Scent_Wheel_480x480_888d4e9d-3f52-440b-a6f2-ee3fa6a2f52f.webp?v=1662747623",
      brandLogo: "https://www.aura-mena.com/sites/default/files/styles/brand_logo/public/brand-logo/2024-04/JOM.png?itok=H3WfslOe",
      titleKey: "product3", // Link to the title in the translation file
    },
  ];

  return (
    <div>
      <h1 className="mt-24 text-4xl font-semibold text-Green ml-7 mr-7 mb-5">{t('neverMiss')}</h1>
      <p className="ml-7 mr-7 text-lg">{t('downloadApp')}<br />{t('offers')}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imgSrc={product.imgSrc}
            brandLogo={product.brandLogo}
            title={t(product.titleKey)} // Use translation for the title
          />
        ))}
      </div>
      <Purchasepremium />
    </div>
  );
};

export default ProductSection;
