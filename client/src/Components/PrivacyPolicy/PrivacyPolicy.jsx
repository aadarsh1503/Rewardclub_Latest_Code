import React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Faqactive from "../Faq/Faqactive";
const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);
  return (
    <div>
      {isRTL ? (
        <div className="max-w-4xl mx-auto p-6 mt-20 text-gray-800">
          <h1 className="text-3xl font-bold text-Green">سياسة الخصوصية</h1>
          <p className="text-sm text-gray-500 mt-1">
            الإصدار 1.0 آخر تحديث في{" "}
            <span className="text-Green">18/02/2025</span>
          </p>

          <p className="mt-4">
            يتم معالجة المعلومات التي يقدمها العضو للشركة عند الانضمام إلى برنامج الولاء وفقًا لبيان الخصوصية الخاص بالشركة. يعتبر توفير المعلومات الصحيحة والمناسبة أمرًا مهمًا لإدارة برنامج الولاء وتزويد كل عضو بفرصة لتعظيم فوائده.
          </p>

          <h2 className="text-xl font-semibold mt-6">
            المعلومات التي قد نجمعها
          </h2>
          <p className="mt-2">
            نجمع المعلومات التي تقدمها عبر الموقع الإلكتروني، أو أي قناة لخدمة عملاء برنامج Reward Club بما في ذلك على سبيل المثال لا الحصر عبر الهاتف، في المتجر، عبر البريد الإلكتروني أو الرسائل النصية القصيرة. كما نجمع المعلومات عند زيارتك لموقعنا الإلكتروني. قد نقوم بجمع بعض هذه المعلومات حتى إذا لم تكن عميلًا مسجلًا في برنامج Reward Club. قد تشمل هذه المعلومات:
          </p>

          <ul className="list-disc pl-6 mt-4">
            <li>
              معلومات الاتصال والتفاصيل الشخصية مثل: الاسم، رقم الهاتف، عنوان البريد الإلكتروني، تاريخ الميلاد، الجنس، الجنسية
            </li>
            <li>
              المعلومات الإحصائية عن الموقع مثل: موقعك، الرابط الذي تستخدمه للوصول إلى الموقع، نوع المتصفح أو الجهاز، عنوان IP لجهاز الكمبيوتر الخاص بك ونوع النطاق، الصفحات التي قمت بزيارتها، مصطلحات البحث التي أدخلتها.
            </li>
            <li>
              المعلومات المتعلقة بالمعاملات مثل: تاريخ انضمامك إلى برنامج Reward Club، النقاط التي قمت بجمعها والمعاملات التي تمت عليها هذه النقاط، النقاط التي قمت باستبدالها، النقاط التي انتهت صلاحيتها، العناصر التي قمت بشرائها من خلال استبدال النقاط والتفضيلات التي أشرت إليها لنا
            </li>
            <li>
              المعلومات التي تقدمها لنا عبر الاستطلاعات أو المسابقات عبر الإنترنت أو دون اتصال بالإنترنت، أو من خلال أي منصات أخرى لبرنامج Reward Club
            </li>
          </ul>

          <p className="mt-4 ">
            عند تقديم معلومات طرف ثالث لنا، فإنك تؤكد أنك حصلت على موافقته للقيام بذلك.
          </p>

          <h2 className="text-xl font-semibold mb-1 mt-6">ما هي ملفات تعريف الارتباط (الكوكيز)</h2>
          <p className="mt-2">
            كما هو شائع في جميع المواقع الإلكترونية الاحترافية، يستخدم هذا الموقع ملفات تعريف الارتباط، وهي ملفات صغيرة يتم تنزيلها على جهاز الكمبيوتر الخاص بك لتحسين تجربتك. تصف هذه الصفحة المعلومات التي تجمعها، وكيف نستخدمها ولماذا نحتاج أحيانًا إلى تخزين هذه الملفات. سنشارك أيضًا كيفية منع تخزين هذه الملفات، ولكن هذا قد يؤدي إلى تدهور أو "تعطيل" بعض عناصر وظائف الموقع.
          </p>

          <div>
            <h2 className="text-xl font-bold mb-1 mt-4"> كيف نستخدم ملفات تعريف الارتباط</h2>
            <div>
              <p>
                نستخدم ملفات تعريف الارتباط لأسباب متنوعة موضحة أدناه. لسوء الحظ، في معظم الحالات لا توجد خيارات قياسية في الصناعة لتعطيل ملفات تعريف الارتباط دون تعطيل الوظائف والميزات التي تضيفها إلى هذا الموقع تمامًا. يوصى بترك جميع ملفات تعريف الارتباط مفعلة إذا لم تكن متأكدًا مما إذا كنت بحاجة إليها أم لا، في حالة استخدامها لتوفير خدمة تستخدمها.
              </p>
            </div>

            <h2 className="text-xl font-bold mb-1 mt-4">تعطيل ملفات تعريف الارتباط</h2>
            <div>
              <p>
                يمكنك منع تعيين ملفات تعريف الارتباط عن طريق ضبط الإعدادات في متصفحك (راجع قسم المساعدة في متصفحك لمعرفة كيفية القيام بذلك). كن على علم بأن تعطيل ملفات تعريف الارتباط سيؤثر على وظائف هذا الموقع والعديد من المواقع الأخرى التي تزورها. سيؤدي تعطيل ملفات تعريف الارتباط عادةً إلى تعطيل بعض الوظائف والميزات الخاصة بالموقع. لذلك، يوصى بعدم تعطيل ملفات تعريف الارتباط. تم إنشاء سياسة ملفات تعريف الارتباط هذه بمساعدة مولد سياسة ملفات تعريف الارتباط من{" "}
                <a
                  href="https://www.cookiepolicygenerator.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-Green underline"
                >
                  CookiePolicyGenerator.com
                </a>
              </p>
            </div>

            <h2 className="text-xl font-bold mb-1 mt-4"> ملفات تعريف الارتباط التي نستخدمها</h2>
            <ul>
              <li>
                (أ) ملفات تعريف الارتباط المتعلقة بالحساب: إذا قمت بإنشاء حساب معنا، فسنستخدم ملفات تعريف الارتباط لإدارة عملية التسجيل والإدارة العامة. عادةً ما يتم حذف هذه الملفات عند تسجيل الخروج، ولكن في بعض الحالات قد تبقى لتذكر تفضيلات موقعك عند تسجيل الخروج؛
              </li>
              <br />
              <li>
                {" "}
                (ب) ملفات تعريف الارتباط المتعلقة بتسجيل الدخول: نستخدم ملفات تعريف الارتباط عند تسجيل دخولك حتى نتذكر ذلك. هذا يمنعك من الاضطرار إلى تسجيل الدخول في كل مرة تزور فيها صفحة جديدة. عادةً ما يتم إزالة أو مسح هذه الملفات عند تسجيل الخروج للتأكد من أنك يمكنك الوصول إلى الميزات والمناطق المقيدة فقط عند تسجيل الدخول؛
              </li>
              <br />
              <li>
                (ج) ملفات تعريف الارتباط المتعلقة بالنشرات الإخبارية عبر البريد الإلكتروني: يقدم هذا الموقع خدمات النشرات الإخبارية أو الاشتراك عبر البريد الإلكتروني وقد يتم استخدام ملفات تعريف الارتباط لتذكر ما إذا كنت مسجلًا بالفعل وما إذا كان يجب عرض إشعارات معينة قد تكون صالحة فقط للمستخدمين المشتركين/غير المشتركين؛
              </li>
              <br />
              <li>
                {" "}
                (د) ملفات تعريف الارتباط المتعلقة بمعالجة الطلبات: يقدم هذا الموقع مرافق التجارة الإلكترونية أو الدفع وبعض ملفات تعريف الارتباط ضرورية للتأكد من تذكر طلبك بين الصفحات حتى نتمكن من معالجته بشكل صحيح؛
              </li>
              <br />
              <li>
                {" "}
                (هـ) ملفات تعريف الارتباط المتعلقة بالاستطلاعات: من وقت لآخر نقدم استطلاعات واستبيانات للمستخدمين لتزويدك برؤى مثيرة للاهتمام، أدوات مفيدة، أو لفهم قاعدة المستخدمين لدينا بشكل أكثر دقة. قد تستخدم هذه الاستطلاعات ملفات تعريف الارتباط لتذكر من شارك بالفعل في استطلاع أو لتزويدك بنتائج دقيقة بعد تغيير الصفحات؛
              </li>
              <br />
              <li>
                {" "}
                (و) ملفات تعريف الارتباط المتعلقة بالنماذج: عند تقديم البيانات من خلال نموذج مثل تلك الموجودة في صفحات الاتصال أو نماذج التعليقات، قد يتم تعيين ملفات تعريف الارتباط لتذكر تفاصيل المستخدم الخاصة بك للتواصل المستقبلي؛
              </li>
              <br />
              <li>
                {" "}
                (ز) ملفات تعريف الارتباط المتعلقة بتفضيلات الموقع: لتوفير تجربة رائعة لك على هذا الموقع، نقدم الوظيفة لتعيين تفضيلاتك لكيفية عمل هذا الموقع عند استخدامه. لتذكر تفضيلاتك، نحتاج إلى تعيين ملفات تعريف الارتباط بحيث يمكن استدعاء هذه المعلومات كلما تفاعلت مع صفحة تتأثر بتفضيلاتك.
              </li>
              <br />
            </ul>

            <h2 className="text-xl font-bold mb-1 mt-4">
              {" "}
              ملفات تعريف الارتباط الخاصة بالجهات الخارجية
            </h2>
            <ul>
              <li>
                {" "}
                في بعض الحالات الخاصة، نستخدم أيضًا ملفات تعريف الارتباط المقدمة من جهات خارجية موثوقة. يوضح القسم التالي ملفات تعريف الارتباط الخاصة بالجهات الخارجية التي قد تواجهها من خلال هذا الموقع.
              </li>
              <br />
              <li>
                {" "}
                (أ) يستخدم هذا الموقع Google Analytics، وهو أحد أكثر حلول التحليل انتشارًا وثقة على الويب لمساعدتنا في فهم كيفية استخدامك للموقع والطرق التي يمكننا من خلالها تحسين تجربتك. قد تتعقب هذه الملفات أشياء مثل المدة التي تقضيها على الموقع والصفحات التي تزورها حتى نتمكن من الاستمرار في إنتاج محتوى جذاب.
              </li>
              <br />
              لمزيد من المعلومات حول ملفات تعريف الارتباط الخاصة بـ Google Analytics، راجع الصفحة الرسمية لـ Google Analytics.
              <br />
              <li>
                {" "}
                (ب) من وقت لآخر نقوم باختبار ميزات جديدة وإجراء تغييرات طفيفة على طريقة تقديم الموقع. عندما نكون ما زلنا نختبر ميزات جديدة، قد يتم استخدام ملفات تعريف الارتباط هذه للتأكد من حصولك على تجربة متسقة أثناء وجودك على الموقع مع التأكد من أننا نفهم التحسينات التي يقدرها المستخدمون أكثر.
              </li>
              <br />
              <li>
                {" "}
                (ج) نظرًا لأننا نبيع منتجات، من المهم لنا فهم الإحصائيات حول عدد الزوار الذين يقومون فعليًا بعملية شراء، وبالتالي فإن هذا هو نوع البيانات التي ستتعقبها ملفات تعريف الارتباط هذه. هذا مهم بالنسبة لك لأنه يعني أننا يمكننا تقديم توقعات تجارية دقيقة تسمح لنا بمراقبة تكاليف الإعلان والمنتجات لضمان أفضل سعر ممكن.
              </li>
              <br />
              <li>
                {" "}
                (د) تستخدم خدمة Google AdSense التي نستخدمها لعرض الإعلانات ملف تعريف ارتباط DoubleClick لعرض إعلانات أكثر صلة عبر الويب والحد من عدد المرات التي يتم فيها عرض إعلان معين لك. لمزيد من المعلومات حول Google AdSense، راجع الأسئلة الشائعة حول خصوصية Google AdSense الرسمية.
              </li>
              <br />
              <li>
                (هـ) نستخدم أيضًا أزرار و/أو إضافات وسائل التواصل الاجتماعي على هذا الموقع التي تسمح لك بالاتصال بشبكتك الاجتماعية بطرق مختلفة. لكي تعمل هذه الأزرار، ستقوم مواقع التواصل الاجتماعي التالية بما في ذلك؛ Instagram، Facebook بتعيين ملفات تعريف ارتباط عبر موقعنا والتي قد تستخدم لتعزيز ملفك الشخصي على موقعهم أو المساهمة في البيانات التي يحتفظون بها لأغراض مختلفة موضحة في سياسات الخصوصية الخاصة بهم.
              </li>
              <br />
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 mt-6"> هل تحتاج إلى مساعدة؟</h3>
            <p>
              {" "}
              إذا كان لديك أي أسئلة أو إذا كنت ترغب في تقديم أي ملاحظات بخصوص برنامج Reward Club، أو ترغب في إلغاء أو تعديل أي شيء في معلوماتك الشخصية أو ببساطة ترغب في معرفة رصيد نقاطك، يرجى الاتصال بخدمة العملاء الخاصة ببرنامج ولاء Reward Club في الإمارات العربية المتحدة أو البحرين:
            </p>
            <br />
            <br />
          </div>
          <>
            يجب تعيين حساب واحد فقط لنفس رقم الهاتف والبريد الإلكتروني. في حال كان لديك حساب مكرر، يرجى الاتصال بنا لمساعدتك.
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
            ، أو التواصل معنا عبر WhatsApp على{" "}
            <a
              href="https://web.whatsapp.com/send?phone=971554201838"
              target="_blank"
              rel="noopener noreferrer"
              className="text-Green underline whitespace-nowrap"
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
      ) : (
        <div className="max-w-4xl mx-auto p-6 mt-20 text-gray-800">
          <h1 className="text-3xl font-bold text-Green">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-1">
            Version 1.0 Last updated on{" "}
            <span className="text-Green">18/02/2025</span>
          </p>

          <p className="mt-4">
            The information a Member provides to the company when completing the
            Loyalty Program is processed in accordance with the Company’s
            Privacy Statement. Communication of relevant/correct information is
            important to administering the Loyalty Program and providing each
            Member with the opportunity to maximize his benefits.
          </p>

          <h2 className="text-xl font-semibold mt-6">
            {" "}
            Information we may collect
          </h2>
          <p className="mt-2">
            We collect information supplied by you via the Website, or any
            Reward Club program customer service channel including without
            limitation on the phone, in-store, via email or SMS. We also collect
            information when you visit our Website. We may collect some of this
            information even if you are not a registered Reward Club customer.
            This information may include:
          </p>

          <ul className="list-disc pl-6 mt-4">
            <li>
              contact and personal details such as: name, phone number, email
              address, date of birth, gender, nationality
            </li>
            <li>
              website statistical information such as: your location, the URL
              you use to access the Website, browser or device type, your
              computer’s IP address and domain type, which pages you visited,
              search terms you entered .
            </li>
            <li>
              transactional information such as: the date you joined the Reward
              Club Program, Points you accrued and the transactions on which
              these accrued, Points you redeemed, Points which lapsed, items you
              purchased through Points redemptions and preferences you have
              indicated to us
            </li>
            <li>
              information you supply to us via online or offline surveys or
              competitions, or through any other Reward Club platforms
            </li>
          </ul>

          <p className="mt-4 ">
            Where you provide the information of a third party to us, you are
            confirming that you have their consent to do so.
          </p>

          <h2 className="text-xl font-bold mb-1 mt-6">What are cookies?</h2>
          <p className="mt-2">
            As is common practice with almost all professional websites this
            site uses cookies, which are tiny files that are downloaded to your
            computer, to improve your experience. This page describes what
            information they gather, how we use it and why we sometimes need to
            store these cookies. We will also share how you can prevent these
            cookies from being stored however this may downgrade or 'break'
            certain elements of the sites functionality.
          </p>

          <div>
            <h2 className="text-xl font-bold mb-1 mt-4"> How we use cookies</h2>
            <div>
              <p>
                {" "}
                We use cookies for a variety of reasons detailed below.
                Unfortunately in most cases there are no industry standard
                options for disabling cookies without completely disabling the
                functionality and features they add to this site. It is
                recommended that you leave on all cookies if you are not sure
                whether you need them or not in case they are used to provide a
                service that you use.
              </p>
            </div>

            <h2 className="text-xl font-bold mb-1 mt-4">Disabling cookies</h2>
            <div>
              <p>
              You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the site. Therefore it is recommended that you do not disable cookies. This Cookies Policy was created with the help of the Cookies Policy Generator from {" "}
                <a
                  href="https://www.cookiepolicygenerator.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-Green underline"
                >
                  CookiePolicyGenerator.com
                </a>
              </p>
            </div>

            <h2 className="text-xl font-bold mb-1 mt-4"> Cookies we use</h2>
            <ul>
              <li>
                (a) Account-related cookies: if you create an account with us
                then we will use cookies for the management of the signup
                process and general administration. These cookies will usually
                be deleted when you log out however in some cases they may
                remain afterwards to remember your site preferences when logged
                out;
              </li>
              <br />
              <li>
                {" "}
                (b) Login related cookies: we use cookies when you are logged in
                so that we can remember this fact. This prevents you from having
                to log in every single time you visit a new page. These cookies
                are typically removed or cleared when you log out to ensure that
                you can only access restricted features and areas when logged
                in;
              </li>
              <br />
              <li>
                (c) Email newsletters related cookies: this site offers
                newsletter or email subscription services and cookies may be
                used to remember if you are already registered and whether to
                show certain notifications which might only be valid to
                subscribed/unsubscribed users;
              </li>
              <br />
              <li>
                {" "}
                (d) Orders processing related cookies: this site offers
                e-commerce or payment facilities and some cookies are essential
                to ensure that your order is remembered between pages so that we
                can process it properly;
              </li>
              <br />
              <li>
                {" "}
                (e) Surveys related cookies: from time to time we offer user
                surveys and questionnaires to provide you with interesting
                insights, helpful tools, or to understand our user base more
                accurately. These surveys may use cookies to remember who has
                already taken part in a survey or to provide you with accurate
                results after you change pages;
              </li>
              <br />
              <li>
                {" "}
                (f) Forms related cookies: when you submit data to through a
                form such as those found on contact pages or comment forms
                cookies may be set to remember your user details for future
                correspondence;
              </li>
              <br />
              <li>
                {" "}
                (g) Site preferences cookies: in order to provide you with a
                great experience on this site we provide the functionality to
                set your preferences for how this site runs when you use it. In
                order to remember your preferences we need to set cookies so
                that this information can be called whenever you interact with a
                page is affected by your preferences.
              </li>
              <br />
            </ul>

            <h2 className="text-xl font-bold mb-1 mt-4">
              {" "}
              Third-party cookies
            </h2>
            <ul>
              <li>
                {" "}
                In some special cases we also use cookies provided by trusted
                third parties. The following section details which third party
                cookies you might encounter through this site.
              </li>
              <br />
              <li>
                {" "}
                (a) This site uses Google Analytics, which is one of the most
                widespread and trusted analytics solution on the web for helping
                us to understand how you use the site and ways that we can
                improve your experience. These cookies may track things such as
                how long you spend on the site and the pages that you visit so
                we can continue to produce engaging content.
              </li>
              <br />
              For more information on Google Analytics cookies, see the official
              Google Analytics page.
              <br />
              <br />
              <li>
                {" "}
                (b) From time to time we test new features and make subtle
                changes to the way that the site is delivered. When we are still
                testing new features these cookies may be used to ensure that
                you receive a consistent experience whilst on the site whilst
                ensuring we understand which optimizations our users appreciate
                the most.
              </li>
              <br />
              <li>
                {" "}
                (c) As we sell products it's important for us to understand
                statistics about how many of the visitors to our site actually
                make a purchase and as such this is the kind of data that these
                cookies will track. This is important to you as it means that we
                can accurately make business predictions that allow us to
                monitor our advertising and product costs to ensure the best
                possible price.
              </li>
              <br />
              <li>
                {" "}
                (d) The Google AdSense service we use to serve advertising uses
                a DoubleClick cookie to serve more relevant ads across the web
                and limit the number of times that a given ad is shown to you.
                For more information on Google AdSense see the official Google
                AdSense privacy FAQ.
              </li>
              <br />
              <li>
                (e) We also use social media buttons and/or plugins on this site
                that allow you to connect with your social network in various
                ways. For these to work the following social media sites
                including; Instagram, Facebook will set cookies through our site
                which may be used to enhance your profile on their site or
                contribute to the data they hold for various purposes outlined
                in their respective privacy policies.
              </li>
              <br />
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 mt-6"> Need help?</h3>
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
      )}
      <Faqactive />
    </div>
  );
};

export default PrivacyPolicy;
