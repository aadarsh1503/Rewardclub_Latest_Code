import React from "react";
import { useTranslation } from 'react-i18next';
import { FaHome } from "react-icons/fa";

const ProductCard = ({ imgSrc, brandLogo, title, points }) => {
  const { t } = useTranslation();
  return (
    <div className="lg:h-[384px] h-[400px]">
      <div className="rounded-xl shadow-lg mt-10 overflow-hidden bg-white flex flex-col h-full">
        <div className="relative">
          <img src={imgSrc} alt="Product" className="w-full h-64 object-cover" />
         
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <span className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
            <span className="px-2 py-1 bg-Green text-white shadow-custom rounded-md whitespace-nowrap">
              {points} {t('points')}
            </span>
            <span className="px-2 py-1 p-4 shadow-custom rounded-md whitespace-nowrap flex items-center gap-1">
              <FaHome className=""/> {t('inStore')}
            </span>
          </span>
          <h3 className="mt-2 text-lg font-bold text-gray-900 min-h-[7px] flex items-center">
            {t(title)}
          </h3>
        </div>
      </div>
    </div>
  );
};

const Purchasepremium = () => {
  const { t } = useTranslation();
  const products = [
    {
      imgSrc: "https://www.medoget.com/cdn/shop/files/Yesfir_Romanticize_Inspired_by_SRK_Signature_Scent.png?v=1759754514&width=800",
      brandLogo: "https://www.aura-mena.com/sites/default/files/styles/brand_logo/public/brand-logo/2024-04/BOD.png?itok=-C4DKiAK",
      title: "product11",
      points: 1000,
    },
    {
      imgSrc: "https://u-mercari-images.mercdn.net/photos/m75885557112_1.jpg",
      brandLogo: "https://www.aura-mena.com/sites/default/files/styles/brand_logo/public/brand-logo/2024-05/ALY.png?itok=kJCP8sBc",
      title: "product22",
      points: 500,
    },
    {
      imgSrc: "https://aqualogica.in/cdn/shop/files/Pink_Sorbet_Plump__Lip_balm.jpg?v=1722338000",
      brandLogo: "https://www.aura-mena.com/sites/default/files/styles/brand_logo/public/brand-logo/2024-06/Boots%20Aura%202.0-01.jpg?itok=Vlvxy0JX",
      title: "product33",
      points: 1500,
    },
  ];

  return (
    <div>
      <h1 className="mt-24 text-4xl font-semibold text-Green ml-7 mr-7 mb-5">
        {t('purchasePremium')}
      </h1>
      <p className="ml-7 mr-7 text-lg">
        {t('vipTreatment')}
        <br /> {t('exclusiveProducts')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-10 gap-6 p-6 rounded-xl">
        {products.map((product, index) => (
          <div key={index} className="h-full">
            <ProductCard
              imgSrc={product.imgSrc}
          
              title={product.title}
              points={product.points}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchasepremium;
