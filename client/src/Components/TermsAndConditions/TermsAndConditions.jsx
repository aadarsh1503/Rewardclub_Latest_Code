import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Faqactive from "../Faq/Faqactive";

const TermsAndConditions = () => {
  const { t,i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);
  return (
    <div>
      {isRTL ? (
        <div className="max-w-5xl mx-auto p-6 bg-white mt-20 rounded-lg">
      <h1 className="text-2xl font-bold text-Green">الشروط والأحكام</h1>
      <br />
<p> بفتح حساب عضوية برنامج الولاء ("الحساب" أو "بطاقة الولاء")، أو باستخدام البطاقة التي يتم تعيينها لك لتلقي واسترداد فوائد البرنامج، فإنك توافق على أنك قد قرأت هذه القواعد وقبلتها؛ كما أنك قد قرأت وقبلت شروط الاستخدام المدرجة هنا؛ وتوافق على جمع واستخدام وكشف بياناتك الشخصية من قبل الشركة وبرنامج الولاء والمرخصين وفقًا لسياسة الخصوصية الخاصة بالشركة.
</p>
<br />
<p> جميع فوائد برنامج الولاء، والمرافق، والعروض، والمكافآت، والخدمات تخضع للتوفر وقد يتم تغييرها من قبل الشركة في أي وقت دون إشعار. باستثناء ما يتم منعه أو تقييده بموجب القوانين المعمول بها، يجوز للشركة في أي وقت تعديل أو تغيير أو استكمال هذه القواعد، وهيكل كسب المكافآت ("المكافآت"، وبشكل فردي، "المكافأة") ومستويات المكافآت في أي وقت، مع أو بدون إشعار، حتى لو كانت هذه التغييرات تؤثر على قيمة النقاط أو القدرة على الحصول على مكافآت معينة (مجتمعة "تغييرات قواعد البرنامج"). وفقًا لتقدير الشركة الوحيد، يجوز للشركة استبدال برنامج ولاء مشابه ببرنامج الولاء الحالي في أي وقت وبشكل فوري عند إرسال إشعار إلى الأعضاء النشطين.
</p>
<br />
<p> يجب أن تكون جميع المعلومات المقدمة صحيحة ودقيقة ويجب أن تبقى محدثة. يتم منح العضو الفرصة لتحديد وتعديل تفضيلات البريد والاتصالات الأخرى في أي وقت وهو مسؤول عن تحديث المعلومات الشخصية عبر الإنترنت أو إبلاغ الشركة فورًا بأي تغيير في العنوان أو معلومات الاتصال الأخرى. يجب على الأعضاء إبلاغ الشركة في حالة فقدان أو سرقة بطاقة الولاء المصرح بها.</p>
<br />
<p> يجوز للشركة إلغاء النقاط المتراكمة للعضو، أو تعليق فوائد برنامج الولاء، أو إلغاء حساب العضو في أي وقت وبشكل فوري ودون إشعار كتابي، لأي سبب ومن خلال تقدير الشركة الوحيد دون أي قيود.

</p>
<br />
<p>

يجب على الأعضاء الحفاظ على تحديث بريدهم الإلكتروني وأرقام هواتفهم المحمولة. لا تتحمل الشركة أو برنامج الولاء أي مسؤولية عن البريد الضائع أو الموجه بشكل خاطئ أو أي عواقب تترتب على ذلك. سيستلم الأعضاء اتصالات برنامج الولاء عبر البريد الإلكتروني، أو الهاتف المحمول، أو الواتساب المقدم، مثل الإعلانات الخدمية والرسائل الإدارية. تعتبر هذه الاتصالات جزءًا من البرنامج وحسابك. قد ترسل الشركة أيضًا، في بعض الأحيان، عروضًا ترويجية إلى الأعضاء.</p>
<br />


      <div className="mt-4 space-y-4 text-gray-700">
        <div>
          <h3 className="font-semibold text-2xl ">الشركة غير مسؤولة عن:
          </h3>
          <br />
          <p>{t('termsAndConditions.generalTermsDescription')}</p>
          <ul className="list-disc ">
            <li> (أ) أي فقدان أو توجيه خاطئ، أو تأخير في استلام، أي طلب عضو، أو مراسلات، أو طلبات استرداد، أو قسائم، أو جوائز استرداد، أو فوائد العضو؛
            </li>
            <li> (ب) سرقة أو استرداد غير مصرح به للنقاط أو جوائز الاسترداد أو استخدام جائزة استرداد؛
            </li>
            <li>(ج) أي فقدان أو سرقة أي قسيمة ولاء؛
            </li>
            <li>(د) أي أخطاء منشورة فيما يتعلق ببرنامج الولاء. تحتفظ الشركة بالحق في تصحيح أي أخطاء دون إشعار.
            </li>
          </ul>
        </div>
        <br />
        <div>
          <h3 className="font-semibold text-2xl">الأهلية
          </h3>
          <br />
          <p> كلما استخدم الأعضاء برنامج الولاء؛ كلما زادت النقاط التي يتراكمونها. برنامج الولاء، النقاط، الاسترداد، العروض الترويجية، والفوائد أو الخدمات المرتبطة الأخرى هي ملكية حصرية للشركة. ليس لها قيمة نقدية ولن تعوض الشركة أو تدفع نقدًا عن أي نقاط منتهية الصلاحية أو غير مستخدمة. يُمنع الأعضاء من مقايضة أو بيع النقاط مقابل النقود. كل نقطة مكتسبة ستكون صالحة لمدة عام واحد من تاريخ الإضافة.
          </p>
          <p> الأعضاء مسؤولون عن البقاء على اطلاع بقواعد البرنامج و/أو أي تغييرات في القواعد. يجوز للشركة إنهاء برنامج الولاء، كليًا أو جزئيًا، مع إشعار مسبق لمدة شهر واحد لجميع أعضاء الولاء النشطين. سيؤدي استمرار مشاركتك في برنامج الولاء إلى موافقتك على أي تغييرات في قواعد البرنامج.
          </p>
          <p>عضوية برنامج الولاء مجانية ومتاحة لأي فرد:
          </p>
          <ul>
            <li> (أ) يجب أن يكون عمره 18 عامًا أو أكثر؛</li>
            <li> (ب) يمتلك السلطة القانونية للاتفاق على قواعد البرنامج؛</li>
            <li> (ج) يقدم معلومات شخصية صحيحة ودقيقة عند التسجيل في برنامج الولاء؛</li>
            <li> (د) يقيم في ولاية قضائية تسمح قانونيًا بالمشاركة في برنامج الولاء
            </li>
          </ul>
        </div>
        <br />
        <div>
          <h3 className="font-semibold text-2xl"> سياسة الاستبدال والاسترداد
          </h3>
          <br />
         <p>في حالة استبدال أو استرداد أي عملية شراء مؤهلة حصلت في البداية على نقاط، سيتم خصم هذه النقاط تلقائيًا من رصيد البطاقة (سواء تم تقديم بطاقة الولاء في وقت المعاملة أم لا). سيتم خصم النقاط بنفس المعدل الذي تم اكتسابها به.
         </p>
        </div>
        <br />
        <div>
          <h3 className="font-semibold text-2xl"> التعديلات
          </h3>
          <br />
         <p> يمكن للعضو طلب إضافة النقاط، في حال لم تظهر في رصيد العضو، عن طريق الاتصال بخدمة العملاء وتقديم كل من رقم بطاقة الولاء وتاريخ المعاملة ورقمها.
         </p>
        </div>
        <br />
        <div>
          <h3 className="font-semibold text-2xl"> اتصالات العضوية
          </h3>
          <br />
<p> يمكن للأعضاء اختيار إلغاء الاشتراك من الرسائل النصية التلقائية في أي وقت عن طريق تحديث حسابهم عبر الإنترنت، أو الاتصال بخدمة العملاء لدينا، أو النقر على إلغاء الاشتراك في الجزء السفلي من أي رسالة نصية أو بريد إلكتروني ترويجي يتم استلامه.</p>
        </div>
        <br />
          
        <div>
      <div>
        <h3 className="font-semibold text-2xl"> الحسابات المكررة
        </h3>
        <br />
       <p> يمكن لأي شخص الانضمام إلى برنامج الولاء الخاص بنا. ومع ذلك، لا يجوز للعضو أن يكون لديه أكثر من حساب واحد في برنامج الولاء. إذا تم تعيين أكثر من بطاقة ولاء لشخص واحد في برنامج الولاء، فسيحصل فقط على نقاط لحساب واحد. سيتم إلغاء الحسابات المكررة.
       </p>
      </div>
      <br />

      <div>
        <h3 className="font-semibold text-2xl"> إلغاء البطاقة/العضوية</h3>
        <br />
<p> يمكن للعضو إلغاء عضويته في برنامج الولاء في أي وقت عن طريق تقديم إشعار كتابي بالإلغاء إلى خدمة العملاء. سيتم إلغاء جميع النقاط غير المستخدمة، والقسائم، وجوائز الاسترداد، والعروض الترويجية، وكذلك حالة العضو التي تم تحقيقها على الفور ولا يمكن استعادتها أو نقلها. يمكن للعضو المعني إعادة التقدم بطلب للعضوية في برنامج الولاء في وقت لاحق، ولكن لن يتم استعادة أي نقاط أو استرداد أو عروض ترويجية تم إلغاؤها أو انتهاء صلاحيتها إلى حساب العضو.
</p>
      </div>
      <br />
      <div>
        <h3 className="font-semibold text-2xl"> إنهاء البرنامج
        </h3>
        <br />
        <ul className="list-disc ">
          <p className="mt-2"> في حالة إنهاء برنامج الولاء، سيتم إلغاء جميع النقاط غير المستخدمة دون أي التزام أو مسؤولية، ولن يتم قبول أي قسائم أو طلبات استرداد أو عروض ترويجية بعد انتهاء فترة الإشعار.

</p>
<br />
        </ul>
      </div>
      <div>
            <h3 className="font-semibold text-2xl mb-4 mt-6"> هل تحتاج إلى مساعدة؟</h3>
            <p>
              {" "}
              إذا كان لديك أي أسئلة أو إذا كنت ترغب في تقديم أي ملاحظات بخصوص برنامج نادي المكافآت، أو ترغب في إلغاء أو تعديل أي شيء في معلوماتك الشخصية أو ببساطة ترغب في معرفة رصيد نقاطك، يرجى الاتصال بخدمة العملاء الخاصة ببرنامج ولاء نادي المكافآت في الإمارات أو البحرين:
            </p>
            <br />
            <br />
          </div>
          <>
            يجب تعيين حساب واحد فقط لنفس رقم الهاتف المحمول والبريد الإلكتروني. في حال كان لديك حساب مكرر، يرجى الاتصال بنا لمساعدتك بشكل أكبر.
            <br />
            <br />
            <strong>دعم نادي المكافآت:</strong> <br />
            يمكنك الدردشة عبر الإنترنت على موقعنا الإلكتروني{" "}
            <a
              href="https://www.rewardclub.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline"
            >
              www.rewardclub.net
            </a>
            ، أو التواصل معنا عبر الواتساب على{" "}
            <a
  href="https://web.whatsapp.com/send?phone=971554201838"
  target="_blank"
  rel="noopener noreferrer"
  className="text-Green underline"
  dir="ltr"
>
  +971 55 420 1838
</a>
            ، أو مراسلتنا عبر البريد الإلكتروني على{" "}
            <a
              href="mailto:support@rewardclub.net"
              className="text-Green underline"
            >
              support@rewardclub.net
            </a>
            .
          </>
    

    
    </div>
        </div>
      </div> 

      ):(
    <div className="max-w-5xl mx-auto p-6 bg-white mt-20 rounded-lg">
      <h1 className="text-2xl font-bold text-center text-Green">TERMS AND CONDITIONS</h1>
      <br />
<p> By opening a Loyalty Program membership account ("Account" or "Loyalty Card"), or by using the card you are assigned to receive and redeem benefits of the Program, you agree that you have read and accept these Program Rules; and you have read and accept the Terms of Use which are incorporated herein; and you consent to the collection, use, and disclosure of your personal data by the Company, the Loyalty Program and licensees in accordance with the Company's Privacy Policy.
</p>
<br />
<p> All Loyalty Program benefits, amenities, offers, awards and services are subject to availability and may be changed by the Company at any time without notice. Except as otherwise expressly prohibited or limited by applicable laws, Company may at any time amend, modify or supplement these Program Rules, the structure for earning Rewards ("Rewards ", and individually, a "Reward ") and Reward levels at any time, with or without notice, even though such changes may affect the value of points or the ability to obtain certain Rewards (collectively "Program Rules Changes"). At the company’s sole discretion, the Company may choose to substitute a similar loyalty program for the Loyalty Program at any time immediately upon notice send to active Members.
</p>
<br />
<p> All information provided must be valid and accurate and must be kept current. Member is given the opportunity to define and modify mailing and other communication preferences any time and is responsible to update the personal information online or advise the Company immediately of any change to address or other contact information. Members must notify the company in case the authorized loyalty card is lost or stolen.</p>
<br />
<p> The Company may cancel a member’s accumulated points, suspend Loyalty Program benefits, or cancel a member’s Account at any time with immediate effect and without written notice, for any reason and in the Company's sole discretion without any limitation.

</p>
<br />
<p>

Members must keep their email and mobile phone numbers current. Neither the Company nor the Loyalty Program shall have any responsibility for misdirected or lost mail or any consequences thereof. Members will receive the company Loyalty Program communications by email, through mobile phone or WhatsApp provided, such as service announcements and administrative messages. These communications are considered part of the Program and your Account. The company may also, occasionally, send promotions and offers to Members.</p>
<br />


      <div className="mt-4 space-y-4 text-gray-700">
        <div>
          <h3 className="font-semibold text-2xl ">The Company is not responsible for:
          </h3>
          <br />
          <p>{t('termsAndConditions.generalTermsDescription')}</p>
          <ul className=" ">
            <li> (a) any loss or misdirection of, or delay in receiving, any Member application, correspondence, redemption requests, Voucher, Redemption Awards or Member benefits;
            </li>
            <li> (b) theft or unauthorized redemption of points or Redemption Awards or use of a Redemption Award;
            </li>
            <li>(c) any loss or theft of any loyalty voucher;
            </li>
            <li>(d) any errors published in relation to the Loyalty Program. The Company reserves the right to correct, without notice, any errors.
            </li>
          </ul>
        </div>
        <br />
        <div>
          <h3 className="font-semibold text-2xl">Eligibility
          </h3>
          <br />
          <p> The more members use the Loyalty Program; the more points they accumulate. Loyalty Program, Points, Redemption, Promotions and other associated benefits or services are the sole property of the company. They have no cash value and the company will not compensate or pay cash for any forfeited or unused points. Members are prohibited from bartering or selling points for cash. Each point earned will be valid for 1 year from addition date.
          </p>
          <br />
          <p> Members are responsible for remaining acknowledged of the Program Rules and/or any Program Rule Changes. The company may terminate the Loyalty Program, in whole or in part, with one (1) month advance notice to all active Loyalty Members. Your continued participation in the Loyalty Program will constitute your acceptance of any such Program Rule Changes.
          </p>
          <br />
          <p>Membership in the Loyalty Program is free and available to any individual who:
          </p>
          <br />
          <ul>
            <li> (a) must be18 years of age and above;</li>
            <li> (b) possesses the legal authority to agree to the Program Rules;</li>
            <li> (c) provides valid and accurate personal information when enrolling in the Loyalty Program;</li>
            <li> (d) resides in a jurisdiction that legally permits participation in the Loyalty Program
            </li>
          </ul>
        </div>
        <br />
        <div>
          <h3 className="font-semibold text-2xl"> Exchange and Refund Policy
          </h3>
          <br />
         <p>In the event of an exchange or refund, of any eligible purchase that initially earned points, such points will be deducted automatically from the Card Balance (whether or not the Loyalty Card is presented at the time of the transaction). Points will be deducted at the same rate as they were earned.
         </p>
        </div>
        <br />
        <div>
          <h3 className="font-semibold text-2xl"> Adjustments
          </h3>
          <br />
         <p> Member may request credits for points, in case they are not reflected in a member’s balance by contacting Customer Service and providing both the Loyalty Card number and the transaction date and ID.
         </p>
        </div>
        <br />
        <div>
          <h3 className="font-semibold text-2xl">Membership communications
          </h3>
          <br />
<p> Members may choose to unsubscribe from automated text messages at any time by updating their online account, by contacting our customer service or by clicking Unsubscribe at the bottom of any promotional SMS or email received.</p>
        </div>
        <br />
          
        <div>
      <div>
        <h3 className="font-semibold text-2xl"> Duplicate accounts
        </h3>
        <br />
       <p> Any person can join our Loyalty Program. However, a member may not have one or more duplicate Accounts under the Loyalty Program. If more than one Loyalty Card is assigned to an individual for the Loyalty Program, he/she will only receive points for one Account. Duplicate Membership Accounts will be cancelled.
       </p>
      </div>
      <br />

      <div>
        <h3 className="font-semibold text-2xl"> Card/membership cancellation</h3>
        <br />
<p> A member may cancel his/her membership in the Loyalty Program at any time by providing a written notice of Cancellation to customer service. All unredeemed points, vouchers, redemption awards, and promotional awards as well as achieved member status will be forfeited immediately and may not be reinstated or transferred. Member in question may reapply for membership in the Loyalty Program at a later date, but no points, redemption and promotions previously forfeited or expired will be reinstated to the Member Account.
</p>
      </div>
      <br />
      <div>
        <h3 className="font-semibold text-2xl"> Program termination
        </h3>
        <br />
        <ul className="list-disc ">
          <p className="mt-2"> If the Loyalty Program is terminated, all unredeemed points will be forfeited without any obligation or liability, and no voucher, redemption claims or promotional awards promotion claims will be honored after the conclusion of the notice period.

</p>
<br />
        </ul>
      </div>
      <div>
            <h3 className="font-semibold text-2xl mb-4 mt-6"> Need help?</h3>
            <p>
              {" "}
              If you have any questions or if you wish to provide any feedback
              with respect to Reward Club Program, or would like to cancel or
              amend anything in your personal information or you simply wish to
              know your points balance, please contact our Customer Service for
              Reward Club loyalty program in UAE or Bahrain:
            </p>
            <br />
            <br />
          </div>
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
    

    
    </div>
        </div>
      </div>
      )}
      <Faqactive />
      </div>
    );
  };
  
  export default TermsAndConditions;
  