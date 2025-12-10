import { FaDiamond } from "react-icons/fa6";
import React from "react";
import PointsCalculator from "./PointsCalculator";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Faqactive from "../Faq/Faqactive";

const AuraStarCard = () => {
  const { t ,i18n} = useTranslation(); 
  const isRTL = i18n.dir() === "rtl"; 
  return (
    <div>
      <h1 className="text-Green lg:p-2 p-4 lg:mt-44 max-w-7xl mx-auto text-3xl mt-32 lg:text-4xl font-semibold ml-0 mr-0 lg:mr-32 lg:ml-32">
        {t("exploreTiers")}
      </h1>
      <p className="lg:mb-24 p-2 mb-32 mr-0 lg:mr-32 mt-0 lg:mt-5 max-w-7xl mx-auto text-lg lg:text-lg ml-0 lg:ml-32">
        {t("earnPointsDescription")}
      </p>
      <div className="flex flex-wrap justify-center space-x-0 lg:space-x-6 lg:p-0 p-2 gap-y-6">
        {/* Card 1 */}
        <div className="sm:w-[400px] w-[900px] p-6 h-[556px] bg-Green rounded-[30px] shadow-lg border border-gray-200">
          <div className="relative w-full lg:mb-0 mb-20 flex justify-center">
            <div className="absolute -top-16 px-12 lg:px-20 py-6 bg-white rounded-full shadow-md border border-gray-300 text-3xl font-semibold text-Green">
              {t("classic")}
            </div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-white">
              <hr className="my-4 border-gray-300" />
              0 <span className="text-lg font-medium text-white">{t("to")}</span> 5,999{" "}
              <span className="text-sm text-white">{t("points")}</span>
            </h2>
            <hr className="my-4 border-gray-300" />
            <ul className={`space-y-3 text-white text-lg ${isRTL ? "text-right" : "text-left"}`}>

              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("earnPointsOnPurchase")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("redeemPointsAtBrands")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("unlockPremiumExclusives")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("accessMemberOffers")}
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-[600px] sm:w-[400px] p-6 bg-Green lg:mt-0 mt-10 rounded-[30px] shadow-lg border border-gray-200">
          <div className="relative w-full lg:mb-0 mb-20 flex justify-center">
            <div className="absolute -top-16 px-12 lg:px-20 py-6 bg-white rounded-full shadow-md border border-gray-300 text-3xl font-semibold text-Green">
              {t("silver")}
            </div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-white">
              <hr className="my-4 border-gray-300" />
              6,000 <span className="text-lg font-medium text-white">{t("to")}</span> 23,999{" "}
              <span className="text-sm text-white">{t("points")}</span>
            </h2>
            <hr className="my-4 border-gray-300" />
            <ul className={`space-y-3 text-white text-lg ${isRTL ? "text-right" : "text-left"}`}>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("earn1_5xPoints")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("redeemPointsAtBrands")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("unlockPremiumExclusives")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("accessMemberOffers")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("earlyAccessAndEvents")}
              </li>
            </ul>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full sm:w-[400px] p-6 bg-Green lg:mt-0 mt-10 rounded-[30px] shadow-lg border border-gray-200">
          <div className="relative w-full lg:mb-0 mb-20 flex justify-center">
            <div className="absolute -top-16 px-12 lg:px-20 py-6 bg-white rounded-full shadow-md border border-gray-300 text-3xl font-semibold text-Green">
              {t("gold")}
            </div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-white">
              <hr className="my-4 border-gray-300" />
              <span className="text-lg font-medium text-white">{t("from")}</span> 24,000{" "}
              <span className="text-sm text-white">{t("points")}</span>
            </h2>
            <hr className="my-4 border-gray-300" />
            <ul className={`space-y-5 text-white text-lg ${isRTL ? "text-right" : "text-left"}`}>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("earnDoublePoints")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("redeemPointsAtBrands")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("unlockLimitedEdition")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("accessPersonalisedOffers")}
              </li>
              <li className="flex items-start gap-2">
                <FaDiamond className="text-white text-[20px] shrink-0 mt-1.5" /> {t("priorityAccessAndVIP")}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <PointsCalculator />
      <Faqactive />
    </div>
  );
};

export default AuraStarCard;