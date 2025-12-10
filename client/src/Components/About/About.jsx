import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaUserPlus, FaCheckCircle, FaCreditCard, FaShippingFast, FaGift, FaQuestionCircle } from "react-icons/fa";
import Faqactive from "../Faq/Faqactive";

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  // Common styles for sections
  const cardStyle = "relative bg-white/80 backdrop-blur-md rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-white/50 mb-10 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(72,187,120,0.15)] hover:-translate-y-1";
  const headerStyle = "text-3xl md:text-4xl font-black text-black mb-6 flex items-center gap-3";
  const pStyle = "text-gray-600 text-lg leading-relaxed font-light";
  const iconBoxStyle = "w-12 h-12 rounded-xl bg-Green/10 flex items-center justify-center text-Green text-xl shrink-0";

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[800px] h-[800px] bg-Green/5 rounded-full blur-[120px] -translate-y-1/2`}></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#827127]/5 rounded-full blur-[100px]"></div>
        {/* --- FIXED LINE BELOW --- */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gray-200/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-4 rounded-full bg-white border border-gray-200 text-xs font-bold tracking-[0.2em] text-Green uppercase mb-6 shadow-sm">
            {isRTL ? "قصتنا" : "Our Story"}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
            {isRTL ? "حول نادي المكافآت" : "ABOUT REWARD CLUB"}
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
              {isRTL 
                ? "يتضمن نادي المكافآت ثلاث بطاقات ولاء مصممة خصيصًا لتلبية احتياجات عملائنا المخلصين ومكافأتهم. عند الانضمام لأول مرة إلى هذا البرنامج، يحصل العميل على بطاقة كلاسيك. من خلال تراكم النقاط، سيتمكن بعد ذلك من الترقية إلى بطاقة الذهبية أو البلاتينية."
                : "The Reward Club includes three tailored loyalty cards designed to best meet the needs of our loyal customers and reward them. When first joining this program, the customer receives a Classic Card. By accumulating points, they will then be able to upgrade to Gold Card or Platinum Card."
              }
            </p>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="flex flex-col gap-8">

          {/* 1. Enrollment & Eligibility (Two Column) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Enrollment */}
            <div className={cardStyle}>
              <div className={headerStyle}>
                <div className={iconBoxStyle}><FaUserPlus /></div>
                {isRTL ? "التسجيل" : "Enrollment"}
              </div>
              <p className={pStyle}>
                {isRTL 
                  ? "اشترك في أي مكتب شريك عند الشراء أو الاستفادة من الخدمات بأي قيمة أو عبر الإنترنت على الموقع أو باتباع رابط تطبيق الولاء. لتصبح عضوًا صالحًا، يجب عليك إكمال عملية التسجيل من خلال تقديم تفاصيل شخصية كاملة ودقيقة والإشارة إلى قبولك لشروط وأحكام البرنامج. بعد الانتهاء، ستتلقى بريدًا إلكترونيًا للتأكيد وتصبح مؤهلاً لكسب النقاط. يمكنك البدء في التسجيل فورًا حيث أن التسجيل عبر الإنترنت متاح الآن."
                  : <>Subscribe at any partner desk upon purchasing or availing services any value or online on the website or following the loyalty App <a href="https://rewardclub.net/" className="text-Green font-bold hover:underline" target="_blank" rel="noreferrer">Link</a>. To become a valid member, you must complete the enrollment process by providing complete and accurate personal details and indicating your acceptance of the Program Terms & conditions. After completion, you will receive a confirmation e-mail and becomes eligible to earn points. You can start immediately the enrollment since online registration is now available.</>
                }
              </p>
            </div>

            {/* Eligibility */}
            <div className={cardStyle}>
              <div className={headerStyle}>
                 <div className={iconBoxStyle}><FaCheckCircle /></div>
                 {isRTL ? "الأهلية" : "Eligibility"}
              </div>
              <p className={pStyle}>
                {isRTL 
                  ? "كلما استخدم الأعضاء برنامج الولاء، كلما تراكمت النقاط. برنامج الولاء، النقاط، الاسترداد، العروض الترويجية والفوائد أو الخدمات الأخرى المرتبطة به هي ملكية حصرية للشركة. ليس لها قيمة نقدية ولن تعوض الشركة أو تدفع نقدًا عن أي نقاط مهدرة أو غير مستخدمة. يُحظر على الأعضاء مقايضة أو بيع النقاط مقابل النقود. كل نقطة مكتسبة ستكون صالحة لمدة عام واحد من تاريخ الإضافة وفقًا لقواعد الشركة والبائعين."
                  : "The more members use the Loyalty Program; the more points they accumulate. Loyalty Program, Points, Redemption, Promotions and other associated benefits or services are the sole property of the company. They have no cash value and the company will not compensate or pay cash for any forfeited or unused points."
                }
              </p>
              
              <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <ul className="space-y-3">
                  {[
                    isRTL ? "(أ) يجب أن يكون عمره 18 عامًا فأكثر؛" : "(a) must be 18 years of age and above;",
                    isRTL ? "(ب) يمتلك السلطة القانونية للاتفاق على قواعد البرنامج؛" : "(b) possesses the legal authority to agree to the Program Rules;",
                    isRTL ? "(ج) يقدم معلومات شخصية صحيحة ودقيقة عند التسجيل في برنامج الولاء؛" : "(c) provides valid and accurate personal information when enrolling in the Loyalty Program;",
                    isRTL ? "(د) يقيم في ولاية قضائية تسمح قانونيًا بالمشاركة في برنامج الولاء" : "(d) resides in a jurisdiction that legally permits participation in the Loyalty Program"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 font-medium">
                      <span className="text-Green mt-1">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* 2. CARD TYPES (Full Width Featured) */}
          <div className={cardStyle}>
            <div className="text-center mb-10">
              <div className={`mx-auto ${iconBoxStyle} mb-4 bg-Green text-white`}><FaCreditCard /></div>
              <h2 className="text-4xl font-black text-black">
                {isRTL ? "أنواع البطاقات والترقيات" : "Card Types & Upgrades"}
              </h2>
              <p className="text-gray-400 mt-2 font-medium tracking-wide uppercase">
                {isRTL ? "عدد النقاط المتراكمة يعتمد على نوع البطاقة" : "Number of points accumulated depending on cards’ variety"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Classic */}
              <div className="p-6 rounded-2xl border border-gray-200 hover:border-Green/50 transition-colors bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-gray-400 rounded-full"></span> 
                  {isRTL ? "البطاقة الكلاسيكية" : "CLASSIC CARD"}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {isRTL 
                    ? "احصل على بطاقتك الكلاسيكية عند أي عملية شراء. يحصل أعضاء البطاقة الكلاسيكية على نقطة واحدة لكل 100 دينار بحريني يتم إنفاقها."
                    : "Get your Classic Card upon any purchase. Classic Card members earn 1 point on each 1.000 BHD spent. As soon as 500 points are accumulated, members are given the opportunity to exchange them with 1.000 BHD value digital voucher."
                  }
                </p>
              </div>

              {/* Gold */}
              <div className="p-6 rounded-2xl border border-[#827127]/30 bg-gradient-to-br from-[#827127]/5 to-transparent">
                <h3 className="text-xl font-bold text-[#827127] mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#827127] rounded-full"></span>
                  {isRTL ? "البطاقة الذهبية" : "GOLD CARD"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isRTL
                    ? "يحمل البطاقة الذهبية يحصلون على ضعف النقاط لكل 100 دينار بحريني. إذا وصلت النقاط إلى 50,000، سيتم ترقية الأعضاء إلى البطاقة البلاتينية."
                    : "Gold Card holders earn double the points for each 1.000 BHD. If points reach 50,000, members will be upgraded to the Platinum Card with increased privileges."
                  }
                </p>
              </div>

              {/* Platinum */}
              <div className="p-6 rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-50">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                  {isRTL ? "البطاقة البلاتينية" : "PLATINUM CARD"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                   {isRTL
                    ? "يحصل أعضاء البطاقة البلاتينية على ثلاثة أضعاف النقاط لكل 100 دينار بحريني، أي ثلاث نقاط لكل 100 دينار بحريني يتم إنفاقها."
                    : "Platinum Card members gain triple the points for each BHD , meaning 3 points on each 1.000 BHD spent."
                   }
                </p>
              </div>

              {/* B2B */}
              <div className="p-6 rounded-2xl border border-Green/30 bg-Green/5">
                <h3 className="text-xl font-bold text-Green mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-Green rounded-full"></span>
                  {isRTL ? "بطاقة B2B" : "B2B CARD"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                   {isRTL
                    ? "يمكن لموظفي الشركة والشركاء الانضمام إلى برنامج B2B عن طريق ملء النماذج المطلوبة."
                    : "The Company’s employees and associates may join the B2B Program by submitting filling out the required forms."
                   }
                </p>
              </div>
            </div>
          </div>

          {/* 3. BENEFITS (Styled Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={cardStyle}>
               <div className={headerStyle}>
                 <div className={iconBoxStyle}><FaShippingFast /></div>
                 {isRTL ? "فوائد العضوية" : "Benefits of Membership"}
               </div>
               <h4 className="font-bold text-Green mb-2">{isRTL ? "الشحن والتوصيل" : "Shipping and Delivery"}</h4>
               <p className={pStyle}>
                  {isRTL
                    ? "يتمتع أعضاء البطاقة الذهبية والبلاتينية بتوصيل مجاني في جميع أنحاء البحرين دون حد أدنى للإنفاق. بالنسبة لأعضاء البطاقة الكلاسيكية، التوصيل المجاني في البحرين متاح للمشتريات في المتجر بقيمة 50 دينار بحريني على الأقل."
                    : "Gold and Platinum members enjoy free delivery across the BAHRAIN with no minimum spends. For Classic members, free delivery in BAHRAIN is available for in-store purchases of at least BHD 50."
                  }
               </p>
            </div>

            <div className={cardStyle}>
               <div className={headerStyle}>
                 <div className={iconBoxStyle}><FaGift /></div>
                 {isRTL ? "استرداد النقاط" : "Points Redemption"}
               </div>
               <p className={pStyle}>
                 {isRTL
                   ? "يمكن لعضو برنامج الولاء استرداد النقاط المتراكمة على تطبيق الولاء واستخدام رقم القسيمة في قسم الرمز الترويجي عند الشراء عبر الإنترنت أو عرضه على أمين الصندوق."
                   : "A Loyalty Program Member can redeem the accumulated points on the Loyalty Application and use the voucher number in the promo-code section upon purchasing online or showing it to the cashier."
                 }
               </p>
            </div>
          </div>

          {/* 4. NEED HELP (Footer Box) */}
          <div className="relative rounded-[2.5rem] bg-gray-900 text-white p-10 overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-Green/20 rounded-full blur-[80px]"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                     <FaQuestionCircle />
                   </div>
                   <h2 className="text-3xl font-bold">{isRTL ? "تحتاج إلى مساعدة؟" : "Need help?"}</h2>
                </div>
                
                <p className="text-gray-300 mb-8 leading-relaxed max-w-3xl">
                   {isRTL
                     ? "إذا كان لديك أي أسئلة أو إذا كنت ترغب في تقديم أي ملاحظات بخصوص برنامج نادي المكافآت، يرجى الاتصال بخدمة العملاء."
                     : "If you have any questions or if you wish to provide any feedback with respect to Reward Club Program, please contact our Customer Service for Reward Club loyalty program in UAE or Bahrain."
                   }
                </p>

                <div className="flex flex-col md:flex-row flex-wrap gap-4 text-sm md:text-base">
                   <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <strong className="block text-Green mb-1">{isRTL ? "الموقع الإلكتروني" : "Website"}</strong>
                      <a href="https://www.rewardclub.net" target="_blank" rel="noopener noreferrer" className="hover:text-Green transition-colors">www.rewardclub.net</a>
                   </div>
                   <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <strong className="block text-Green mb-1">{isRTL ? "واتساب" : "WhatsApp"}</strong>
                      <a href="https://web.whatsapp.com/send?phone=971554201838" target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-Green transition-colors">+971 55 420 1838</a>
                   </div>
                   <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <strong className="block text-Green mb-1">{isRTL ? "البريد الإلكتروني" : "Email"}</strong>
                      <a href="mailto:support@rewardclub.net" className="hover:text-Green transition-colors">support@rewardclub.net</a>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* --- FAQ --- */}
        <div className="mt-24">
           <Faqactive />
        </div>
        
      </div>
    </div>
  );
};

export default About;