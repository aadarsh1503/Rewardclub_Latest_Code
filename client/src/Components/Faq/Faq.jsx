import React, { useState } from "react";

import {  useEffect } from "react";
import { useTranslation } from "react-i18next";


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);
  const faqData = isRTL
  ? [
    {
        question: "1. كيف أصبح عضوًا في نادي المكافآت؟",
        answer:
          "هناك عدة طرق سهلة للانضمام إلى برنامج نادي المكافآت. يمكنك التسجيل على موقع www.rewardsclub.net أو عبر أي مدير حسابات في المجموعة باستخدام النموذج أو الرابط الإلكتروني في نقاط البيع التابعة للعلامات التجارية المشاركة في نادي المكافآت. يمكنك البدء في الاستمتاع بالمزايا فور تفعيل العضوية.",
      },
      {
        question: "2. كيف يمكنني إنشاء حساب جديد؟",
        answer:
          "لاستخدامه لأول مرة، ستحتاج إلى تسجيل بياناتك على موقع www.rewardclub.net واتباع عملية التسجيل.",
      },
      {
        question: "3. أنا بالفعل عضو في نادي المكافآت. كيف يمكنني تسجيل الدخول؟",
        answer: (
          <>
            قم بزيارة{" "}
            <a
              href="https://rewardclub.net/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardsclub.net
            </a>
            . سيُطلب منك إدخال رقم البريد الإلكتروني وكلمة المرور. سنرسل لك بعد ذلك رمز OTP لإدخاله في المرة الأولى. ثم سيُطلب منك إنشاء كلمة مرور لتسجيل الدخول.
          </>
        ),
      },
      {
        question: "4. لماذا لا يمكنني تسجيل الدخول إلى myrewardsclub.com؟",
        answer: (
          <>
            إذا لم تتمكن من تسجيل الدخول بعد اتباع الخطوات المذكورة أعلاه من النقطة 5، يرجى الاتصال بنا لمساعدتك بشكل أكبر.
            <br />
            <br />
            <strong>دعم نادي المكافآت:</strong> <br />
            يمكنك الدردشة عبر الإنترنت على موقعنا{" "}
            <a
              href="https://www.rewardclub.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardclub.net
            </a>
            ، أو مراسلتنا على واتساب عبر{" "}
            <a
              href="https://web.whatsapp.com/send?phone=971554201838"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
              dir="ltr"
            >
              +971 55 420 1838
            </a>
            ، أو إرسال بريد إلكتروني إلى{" "}
            <a
              href="mailto:support@rewardclub.net"
              className="text-Green underline"
            >
              support@rewardclub.net
            </a>
            .
          </>
        ),
      },
      {
        question: "5. أين يمكنني العثور على البطاقة الرقمية لنادي المكافآت ورقم العضوية على الموقع؟",
        answer:
          "ستظهر بطاقتك الرقمية مع الرمز الشريطي ورقم العضوية تلقائيًا على الصفحة الرئيسية عند تسجيل الدخول لأول مرة.",
      },
      {
        question: "6. هل أحصل على بطاقة عضوية نادي المكافآت عند التسجيل؟",
        answer:
          "عند التسجيل في المتجر أو عبر الإنترنت، ستحصل على نسخة رقمية من البطاقة، مما يعني أنك لن تحتاج إلى حمل البطاقة البلاستيكية معك.",
      },
      {
        question: "7. ماذا لو نسيت كلمة المرور للوصول إلى الموقع؟",
        answer:
          "إذا كنت لا تتذكر كلمة المرور الخاصة بك، انقر على نسيت كلمة المرور في شاشة تسجيل الدخول.",
      },
      {
        question: "8. هل يمكنني إدارة حساب نادي المكافآت عبر الإنترنت؟",
        answer: (
          <>
            نعم. يمكنك إدارة حسابك على{" "}
            <a
              href="https://www.rewardclub.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardclub.net
            </a>
            . ما عليك سوى تسجيل الدخول لتحديث ملفك الشخصي ومعلومات الاتصال في{" "}
            <strong> "ملف حسابي"</strong>.
          </>
        ),
      },
      {
        question: "9. ماذا لو تغيرت بياناتي الشخصية؟",
        answer: (
          <>
            يمكنك تحديث بياناتك الشخصية في أي وقت على موقع نادي المكافآت. يمكنك أيضًا{" "}
            <a
              href="https://rewardclub.net/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              الاتصال بنا
            </a>
            ، وسنكون سعداء بمساعدتك في تحديث بياناتك. يرجى السماح لمدة تصل إلى 48 ساعة حتى يتم تطبيق التغييرات على أنظمتنا.
          </>
        ),
      },
      {
        question: "10. كيف يمكنني الترقية إلى مستويات أعلى في العضوية؟",
        answer: (
          <>
            عند الانضمام إلى برنامج ولاء نادي المكافآت، ستصبح تلقائيًا عضوًا في البطاقة الكلاسيكية. كلما زادت النقاط التي تجمعها، زادت المكافآت التي ستستمتع بها عبر علاماتك التجارية ومتاجرك ومراكز التسوق المفضلة. اجمع 20,000 نقطة خلال فترة 12 شهرًا من تاريخ إنشاء البطاقة وستتم ترقيتك إلى عضو البطاقة الذهبية. <br />
            اجمع 50,000 نقطة على البطاقة الذهبية خلال فترة 12 شهرًا من تاريخ الترقية، وستتم ترقيتك إلى عضو البطاقة البلاتينية. <br />
            لمعرفة المزيد عن ترقيات المستويات، قم بزيارة{" "}
            <a
              href="https://rewardclub.net/my-benefits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              مزاياي
            </a>{" "}
            على موقع نادي المكافآت.
          </>
        ),
      },
      {
        question: "11. كيف يمكنني جمع النقاط؟",
        answer: (
          <>
            <strong>برنامج ولاء نادي المكافآت:</strong> <br />
            <br />
            أعضاء البطاقة الكلاسيكية يجمعون نقطة واحدة على كل 1.000 دينار بحريني يتم إنفاقه. <br />
            <br />
            تجمع نقطة واحدة على كل 1.000 دينار بحريني يتم إنفاقه على البطاقة الكلاسيكية، ونقطتين على كل 1.000 دينار بحريني يتم إنفاقه على البطاقة الذهبية، وثلاث نقاط على كل 1.000 دينار بحريني يتم إنفاقه على البطاقة البلاتينية.
          </>
        ),
      },
      {
        question: "12. كيف يمكنني استبدال نقاطي؟",
        answer:
          "يمكن لعضو نادي المكافآت استبدال النقاط المتراكمة على موقع نادي المكافآت واستخدام رقم القسيمة في قسم الرمز الترويجي عند الشراء عبر الإنترنت أو عرضها على أمين الصندوق عند الشراء في المتجر. يمكنك استبدال النقاط على الفور عند الدفع في المتجر بمساعدة أمين الصندوق. ستكون القسيمة صالحة لمدة 6 أشهر من تاريخ الاستبدال.",
      },
      {
        question: "13. كيف يمكنني التحقق من رصيد نقاطي؟",
        answer:
          "يمكنك التحقق من رصيد نقاطك في أي وقت باستخدام موقع نادي المكافآت. ما عليك سوى تسجيل الدخول وستجد رصيد نقاطك على الشاشة الرئيسية على بطاقتك. يمكنك أيضًا رؤية نقاطك في قسم ال النقاط",
      },
      {
        question: "14. ماذا لو قمت بإرجاع عنصر؟",
        answer:
          "إذا قمت بإرجاع عنصر، فسيتم إزالة جميع النقاط التي تم جمعها على هذا العنصر من رصيد نقاطك.",
      },
      {
        question: "15. ماذا لو لم يتم تسجيل النقاط لشراء معين؟",
        answer:
          "يمكن للعضو طلب إضافة النقاط في حال لم تظهر في رصيده عن طريق الاتصال بخدمة العملاء وتقديم رقم بطاقة الولاء وتاريخ العملية ومعرفها.",
      },
      {
        question: "16. متى تنتهي صلاحية نقاطي وهل سيتم تأثر مستوى العضوية؟",
        answer:
          "تنتهي صلاحية النقاط التي تم جمعها لكل عملية شراء بعد عام واحد من تاريخ الشراء. يمكنك التحقق من تفاصيل عمليات الشراء في قسم مليات الشراء على موقع نادي المكافآت. لن يتأثر مستوى العضوية الخاص بك.",
      },
      {
        question: "17. هل يمكنني استخدام موقع نادي المكافآت إذا كنت عميلاً دوليًا؟",
        answer:
          "نعم. يمكنك إنشاء حساب إذا كنت عميلاً دوليًا، ولكن يمكنك جمع واستبدال النقاط فقط في المتاجر المشاركة.",
      },
      {
        question: "18. ماذا لو نفدت بطارية هاتفي أو نسيت هاتفي عند الرغبة في الشراء في المتجر؟",
        answer:
          "إذا كنت غير قادر على تقديم بطاقة نادي المكافآت في وقت الشراء، ما عليك سوى إعطاء الموظف رقم هاتفك المسجل وسيتمكن من إضافة النقاط يدويًا إلى حسابك بعد التحقق من تفاصيل ملفك الشخصي.",
      },
      {
        question: "19. ماذا لو كان لدي حسابات مكررة؟",
        answer: (
          <>
            يجب أن يكون هناك حساب واحد فقط مرتبط بنفس رقم الهاتف والبريد الإلكتروني. في حال كان لديك حساب مكرر، يرجى الاتصال بنا لمساعدتك بشكل أكبر.
            <br />
            <br />
            <strong>دعم نادي المكافآت:</strong> <br />
            يمكنك الدردشة عبر الإنترنت على موقعنا{" "}
            <a
              href="https://www.rewardclub.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardclub.net
            </a>
            ، أو مراسلتنا على واتساب عبر{" "}
            <a
              href="https://web.whatsapp.com/send?phone=971554201838"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
              dir="ltr"
            >
              +971 55 420 1838
            </a>
            ، أو إرسال بريد إلكتروني إلى{" "}
            <a
              href="mailto:support@rewardclub.net"
              className="text-Green underline"
            >
              support@rewardclub.net
            </a>
            .
          </>
        ),
      },
    ]
  : [
    {
        question: "1. How do I become a Reward Club member?",
        answer:(
          <>
          There are several easy ways to join the Reward Club program. You can enroll on <a href="/www.rewardsclub.net" className="underline text-Green "target="_blank" >www.rewardsclub.net</a> or at any group Account Manager via form or online link Reward Club participating brands cash desks. You can start enjoying the benefits immediately after activation the membership.
          </> ) },
      {
        question: "2. How do I create a new account?",
        answer:
          "To use it for the first time, you will need to register your details on www.rewardclub.net and follow the registration process.",
      },
      {
        question: "3. I am already a Reward Club member. How do I login?",
        answer: (
          <>
            Visit{" "}
            <a
              href="https://rewardclub.net/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardsclub.net
            </a>
            . You will be asked to enter your email id number and password. We
            will then send you an OTP for you to enter the first time. Then, you
            will be asked to create a password to log in.
          </>
        ),
      },
      {
        question: "4. Why can’t I log into myrewardsclub.com?",
        answer: (
          <>
            If you are unable to log in following the above steps from point 5,
            please contact us to assist you further.
            <br />
            <br />
            <strong>Reward Club Support:</strong> <br />
            You can chat online on our website{" "}
            <a
              href="https://www.rewardclub.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardclub.net
            </a>
            , WhatsApp us on{" "}
            <a
              href="https://web.whatsapp.com/send?phone=971554201838"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              +971 55 420 1838
            </a>
            , or email us at{" "}
            <a
              href="mailto:support@rewardclub.net"
              className="text-Green underline"
            >
              support@rewardclub.net
            </a>
            .
          </>
        ),
      },
      {
        question:
          "5. Where can I find Reward Club Digital Card and membership number on the website?",
        answer:
          "Your digital card with its barcode and membership number will automatically appear on the homepage when you first login.",
      },
      {
        question: "6. Do I get a Reward Club membership card when I enroll?",
        answer:
          "When you sign up in-store or online, you will have a digital version of the card, meaning you no longer need to carry the plastic card with you.",
      },
      {
        question:
          "7. What if I have forgotten my password to access the website?",
        answer:
          "If you don’t remember your password, click forgot password in the login screen.",
      },
      {
        question: "8. Can I manage Reward Club account online?",
        answer: (
          <>
            Yes. You can manage your account on{" "}
            <a
              href="https://www.rewardclub.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardclub.net
            </a>
            . Simply log in to update your profile and contact information in
            <strong> "My Account Profile"</strong>.
          </>
        ),
      },
      {
        question: "9. What if my personal details change?",
        answer: (
          <>
            You can update your personal details at any time on the Reward Club
            website. You can also{" "}
            <a
              href="https://rewardclub.net/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              contact us
            </a>
            , we will be happy to help you update your details. Please allow up to
            48 hours for the changes to reflect on our systems.
          </>
        ),
      },
      {
        question: "10. How do I move up the membership tiers?",
        answer: (
          <>
            Upon joining Reward Club loyalty program, you will automatically
            become a Classic Card member. The more points you earn, the more
            rewards you'll enjoy across your favorite brands, stores, and malls.
            Collect 20,000 Points in a 12-month period from the date of card
            creation and you’ll be upgraded to Gold Card member. <br />
            Collect 50,000 Points on the Gold Card in a 12-month period from the
            upgrade date, and you’ll be upgraded to Platinum Card member. <br />
            To find out more about tier upgrades, visit{" "}
            <a
              href="https://rewardclub.net/my-benefits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              My Benefits
            </a>{" "}
            on the Reward Club website.
          </>
        ),
      },
      {
        question: "11. How do I earn Points?",
        answer: (
          <>
            <strong>Reward Club Loyalty Program:</strong> <br />
            <br />
            Classic Card members earn 1 point on each 1.000 BHD spent. <br />
            <br />
            You earn 1 point on each 1.000 BHD spent on the Classic Card, 2 points
            for each 1.000 BHD spent on the Gold Card, and 3 points for each 1.000
            BHD spent on the Platinum Card.
          </>
        ),
      },
  
      {
        question: "12. How do I redeem my points?",
        answer:
          "Rewards Club Member can redeem the accumulated points on the  Rewards Club website and use the voucher number in the promo-code section upon purchasing online or showing it to the cashier upon purchasing in-store and can redeem the points instantly upon paying in-store at the cash desk with the assistance of the cashier. Voucher will be valid for a period of 6 months from redemption date.",
      },
      {
        question: " 13. How can I check my points balance?",
        answer:
          "You can check your point balance at any time using the Rewards Club website. Simply login and you will find your points balance on the homepage screen on your card . You can also see your points in Redeem Points.",
      },
      {
        question: "14. What if I return an item?",
        answer:
          "If you return an item, all points earned on that particular item will be removed from your point balance.",
      },
      {
        question:
          " 15. What if the points for a purchase have not been registered?",
        answer:
          "Member may request credits for points, in case they are not reflected in a member’s balance by contacting Customer Service and providing both the Loyalty Card number and the transaction date and ID.",
      },
      {
        question:
          " 16. When do my points expire and will my tier level be affected?",
        answer:
          "Your points earned for each transaction will expire in one year from purchase date. You can check your detailed transactions in My purchases on Reward Club website. Your tier status will not be affected.",
      },
      {
        question:
          " 17. Can I use the Rewards Club website if I am an international customer?",
        answer:
          "Yes. You create an account if you are an international customer although you can only earn and redeem points in participating stores.",
      },
      {
        question:
          " 18. What if my phone has lost charge or I forget my phone when I want to make a purchase in-store?",
        answer:
          "If you are unable to present Reward Club membership at the time of purchase, simply give the member of staff your registered mobile number and they will be able to manually add points to your account after verification as per your profile details.",
      },
      {
        question: "19. What if I have duplicated accounts?",
        answer: (
          <>
            Only one account should be assigned to the same mobile number and
            email. In case you have a duplicated account, please contact us to
            assist you further.
            <br />
            <br />
            <strong>Reward Club Support:</strong> <br />
            You can chat online on our website{" "}
            <a
              href="https://www.rewardclub.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardclub.net
            </a>
            , WhatsApp us on{" "}
            <a
              href="https://web.whatsapp.com/send?phone=971554201838"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              +971 55 420 1838
            </a>
            , or email us at{" "}
            <a
              href="mailto:support@rewardclub.net"
              className="text-Green underline"
            >
              support@rewardclub.net
            </a>
            .
          </>
        ),
      },
  
    ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto mt-32 p-4">
        {isRTL?( <h1 class="text-3xl font-bold text-Green text-center mb-8 rtl">
    الأسئلة المتكررة
</h1>):(<h1 className="text-3xl font-bold text-Green text-center mb-8">
Frequently Asked Questions
</h1>
)}

      <div className="space-y-4 ">
        {faqData.map((faq, index) => (
          <div key={index} className="border rounded-lg  shadow-sm">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full cursor-pointer text-left p-4 focus:outline-none"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{faq.question}</span>
                <span className="transform transition-transform">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>
            </button>
            {activeIndex === index && (
              <div className="p-4 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
