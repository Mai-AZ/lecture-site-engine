::: {#progressBar}
::: {#progressFill}
:::
:::

::: hero
# 🔐 IPSec --- أمن طبقة الشبكة

::: sub
Computer Networks Security \| Lecture 3 --- د. منال العمر \| جامعة حمص
:::

::: badges
📘 مرجع مختصر للامتحان 🕒 مراجعة سريعة 🇬🇧 EN + 🇸🇦 AR
:::
:::

::: toolbar
::: toolbar-inner
طي / فتح الكل
:::

::: {#navScroll .nav-scroll}
[نظرة عامة](#s1) [التطبيقات والفوائد](#s2) [خدمات IPSec](#s3) [AH vs
ESP](#s4) [Transport/Tunnel](#s5) [البنية Architecture](#s6) [SA & SAD &
SPD](#s7) [Anti-Replay](#s8) [معالجة الحزم](#s9) [IKE](#s10) [تنسيق
AH](#s11) [تنسيق ESP](#s12) [تحديثات حديثة](#s13) [أسئلة سريعة](#s14)
:::
:::

::: {#mainContent role="main"}
::: {#s1 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [1]{.num} نظرة عامة على IPSec --- Overview

[▾]{.chev}
:::

::: section-body
::: def
[التعريف الأساسي --- DEFINITION]{.label}

::: term
[IPSec: a set of protocols used to secure communications over IP
networks through encryption, authentication, and data integrity
verification.]{.en} [IPSec هو بروتوكول (مجموعة معايير) يُستخدم لتأمين
الاتصالات عبر شبكات IP، من خلال التشفير والتحقق من الهوية وسلامة
البيانات.]{.ar}
:::

يعمل على مستوى [Network Layer]{.kw .b} (طبقة الشبكة) في نموذج
[OSI]{.kw}.
:::

### خلفية تاريخية (سياق قد يُسأل عنه) {#خلفية-تاريخية-سياق-قد-يسأل-عنه .subhead}

عام 1994 أصدر **Internet Architecture Board** تقرير **RFC 1636** يتناول
التحديات الأمنية في بنية الإنترنت، وأكد على ضرورة حماية البنية التحتية
للشبكة من المراقبة والتحكم غير المصرح به، وأهمية تأمين الاتصال عبر
**Authentication** و **Encryption**. أدى ذلك لظهور **IPsec** ليصبح جزءاً
أساسياً من معايير أمن الشبكات الحديثة، مصمماً أصلاً لـ [IPv6]{.kw} وقابلاً
للاستخدام مع [IPv4]{.kw} أيضاً.

### بروتوكولات IPSec الأساسية --- Core Protocols {#بروتوكولات-ipsec-الأساسية-core-protocols .subhead}

-   [Authentication Header (AH) --- RFC 4302]{.en}[ترويسة المصادقة:
    توثيق وسلامة البيانات فقط]{.ar}
-   [Encapsulating Security Payload (ESP) --- RFC 4303]{.en}[الحمولة
    الأمنية المغلّفة: تشفير + مصادقة]{.ar}
-   [Internet Key Exchange (IKE) --- RFC 7296]{.en}[بروتوكول تبادل
    المفاتيح]{.ar}
:::
:::

::: {#s2 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [2]{.num} التطبيقات والفوائد --- Applications & Benefits

[▾]{.chev}
:::

::: section-body
### التطبيقات الشائعة --- Common Applications {#التطبيقات-الشائعة-common-applications .subhead}

::: grid
::: card
#### 🏢 Virtual Private Network (VPN)

تأمين اتصال الفروع عبر الإنترنت → يقلل التكاليف التشغيلية ويحد من الحاجة
لشبكات خاصة.
:::

::: card
#### 🌐 Remote Access

اتصال آمن عبر [Internet Service Provider]{.kw} للدخول إلى شبكة الشركة →
يقلل تكاليف الاتصالات.
:::

::: card
#### 🔗 Intranet & Extranet

اتصالات آمنة بين المؤسسات مع ضمان **Authentication** و
**Confidentiality** وتبادل المفاتيح.
:::

::: card
#### 🛒 Electronic Commerce

طبقة حماية إضافية (تشفير + مصادقة) لكل البيانات، بغض النظر عن أمان
التطبيقات نفسها.
:::
:::

::: note
[سيناريو نموذجي (مهم للفهم)]{.label}

بيانات LAN الداخلية تنتقل بدون تشفير، لكن عند خروجها عبر **WAN** يُستخدم
IPsec. تعمل بروتوكولات IPsec داخل **Router** أو **Firewall** (التشفير/فك
التشفير يحدث بشفافية تامة للمستخدم النهائي).
:::

### أهم فوائد IPSec --- Benefits {#أهم-فوائد-ipsec-benefits .subhead}

-   **الشفافية الكاملة:** يعمل أسفل [Transport Layer]{.kw} (TCP/UDP)، لا
    يتطلب تعديل أي برنامج مستخدم.
-   **حماية شاملة:** عند تطبيقه في Router/Firewall يحمي كل البيانات
    العابرة دون عبء على الشبكات الداخلية.
-   **صعوبة التجاوز** إذا كان الـ Firewall نقطة الدخول الوحيدة من
    الإنترنت.
-   **لا حاجة لتدريب المستخدمين** على إدارة المفاتيح.
-   يمكن إنشاء [Virtual Subnetwork]{.kw} آمنة للتطبيقات الحساسة أو للعمل
    عن بعد.
:::
:::

::: {#s3 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [3]{.num} خدمات IPSec --- IPSec Services

[▾]{.chev}
:::

::: section-body
يعتمد IPsec على بروتوكولي **AH** و **ESP** لتقديم الخدمات التالية (⭐
مهمة جداً للحفظ):

-   [Access Control]{.en}[التحكم في الوصول للموارد وفق سياسات
    محددة]{.ar}
-   [Connectionless Integrity]{.en}[ضمان سلامة البيانات أثناء النقل دون
    اتصال ثابت]{.ar}
-   [Data Origin Authentication]{.en}[التحقق من هوية مصدر البيانات]{.ar}
-   [Rejection of Replayed Packets]{.en}[منع هجمات إعادة إرسال
    الحزم]{.ar}
-   [Confidentiality (Encryption)]{.en}[حماية سرية البيانات عبر
    التشفير]{.ar}
-   [Limited Traffic Flow Confidentiality]{.en}[تقليل إمكانية تحليل نمط
    حركة البيانات]{.ar}
:::
:::

::: {#s4 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [4]{.num} AH مقابل ESP --- الفرق الأهم في المحاضرة ⭐

[▾]{.chev}
:::

::: section-body
::: grid
::: {.card .ah}
#### 🛡️ Authentication Header (AH)

**الوظيفة:** Authentication + Integrity فقط

**لا يوفر:** Confidentiality (لا تشفير)

يضيف ترويسة بها قيمة [Hash]{.kw} محسوبة بخوارزميات تشفير، ليتحقق
المستقبل من صحة الحزمة.
:::

::: {.card .esp}
#### 🔒 Encapsulating Security Payload (ESP)

**الوظيفة:** Encryption (سرية) + إمكانية Authentication و Integrity أيضاً

يُغلّف الحمولة الأصلية ويشفرها → غير قابلة للقراءة من غير المصرح لهم.

الأكثر استخداماً لأنه يجمع بين الحماية والمرونة.
:::
:::

::: tbl-wrap
  الخاصية                   [AH]{.en}             [ESP]{.en}
  ------------------------- --------------------- -------------------------------------
  Confidentiality (تشفير)   ❌ لا                 ✅ نعم
  Integrity (سلامة)         ✅ نعم                ✅ نعم (اختياري)
  Authentication (مصادقة)   ✅ نعم                ✅ نعم (اختياري)
  Anti-Replay               ✅ نعم                ✅ نعم (اختياري)
  RFC                       4302                  4303
  ملاحظة                    يترك البيانات مرئية   يجب اختيار تشفير أو مصادقة كحد أدنى
:::

::: danger
[نقطة اختبارية شائعة]{.label}

AH يوفر Authentication و Integrity [فقط]{.mark} ولا يوفر Confidentiality
أبداً. هذا أكثر فرق يُسأل عنه.
:::
:::
:::

::: {#s5 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [5]{.num} وضع النقل والنفق --- Transport vs Tunnel Mode

[▾]{.chev}
:::

::: section-body
::: tbl-wrap
  المعيار                         [Transport Mode]{.en}                   [Tunnel Mode]{.en}
  ------------------------------- --------------------------------------- ---------------------------------------------
  ما الذي يُحمى؟                   Payload فقط (بيانات الطبقة العليا)      حزمة IP بأكملها (Header + Payload)
  رأس IP الأصلي                   يبقى كما هو بدون تغيير                  يُخفى بالكامل داخل حزمة جديدة
  رأس IP جديد؟                    لا                                      نعم، يُضاف Header IP خارجي جديد
  الاستخدام النموذجي              اتصال مباشر بين جهازين (Host-to-Host)   بين Security Gateways مثل Firewalls/Routers
  رؤية Routers للـ Inner Header   ---                                     لا يرونه، يتعاملون مع Outer Header فقط
:::

::: def
[مثال توضيحي (VPN بين فرعين)]{.label}

عندما يرسل Host A بيانات إلى Host B عبر شبكتين مختلفتين: يقوم Firewall
شبكة A بتغليف الحزمة الأصلية وتغيير عناوين المصدر/الوجهة إلى عناوين الـ
Gateways، تمر عبر الإنترنت حتى Firewall شبكة B الذي يزيل التغليف ويسلّم
الحزمة الأصلية لـ Host B.
:::

::: grid
::: card
#### مع AH

**Transport:** يوفر Authentication لل Payload + جزء من IP Header.

**Tunnel:** يحمي الحزمة الكاملة (IP الداخلي بالكامل).
:::

::: card
#### مع ESP

**Transport:** يشفّر Payload فقط، لا يشفّر IP Header.

**Tunnel:** يشفّر ويوقّع الحزمة بالكامل + IP header الداخلي.
:::
:::
:::
:::

::: {#s6 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [6]{.num} بنية IPSec --- Architecture \[RFC 4301\]

[▾]{.chev}
:::

::: section-body
قبل حماية أي حزمة، يجب استخدام [IKE]{.kw} ليتحقق كل طرف من هوية الآخر،
ثم يُنشأ مفتاح مشترك ويُتفق على المعايير، وتُخزَّن ضمن **IKE SA**. بناءً عليها
تُنشأ **IPSec SAs** المستخدمة فعلياً لحماية الترافيك.

::: flow
::: box
Node A
:::

::: arrow
⇄
:::

::: box
IKE (Key Exchange)
:::

::: arrow
⇄
:::

::: box
Node B
:::
:::

::: flow
::: {.box .protect}
IPSec (ESP/AH يحمي البيانات)
:::
:::

::: note
[مكان التنفيذ --- مهم جداً]{.label}

::: tbl-wrap
                 [IKE]{.en}                               [IPSec (AH/ESP)]{.en}
  -------------- ---------------------------------------- ------------------------------------
  مكان التنفيذ   User Space (مساحة المستخدم)              Kernel Space (نواة نظام التشغيل)
  الوظيفة        التفاوض وإنشاء SA (المفاتيح والسياسات)   تأمين البيانات فعلياً أثناء الإرسال
:::
:::

### قواعد البيانات الأساسية (3 قواعد) ⭐ {#قواعد-البيانات-الأساسية-3-قواعد .subhead}

-   [Security Association Database (SAD)]{.en}[تخزن IPSec SAs (المفاتيح،
    الخوارزميات..)]{.ar}
-   [Security Policy Database (SPD)]{.en}[قواعد تحدد الإجراء: DISCARD /
    BYPASS / PROTECT]{.ar}
-   [Peer Authorization Database (PAD)]{.en}[من هم الأطراف المسموح لهم
    بالتواصل]{.ar}
:::
:::

::: {#s7 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [7]{.num} اتفاقيات الأمان --- Security Associations (SA) و SAD و SPD

[▾]{.chev}
:::

::: section-body
::: def
[تعريف SA]{.label}

::: term
[SA: a one-way relationship between a sender and a receiver]{.en} [علاقة
أحادية الاتجاه بين مرسل ومستقبل تحدد كيفية تطبيق خدمات الحماية. عند وجود
اتصال ثنائي (Two-way)، يتم إنشاء SA لكل اتجاه.]{.ar}
:::

يمكن إعداد SA يدوياً (manual configuration) لكنه غير عملي في الشبكات
الكبيرة، لذا غالباً يُنشأ تلقائياً عبر [IKE]{.kw}.
:::

### كل SA يُعرَّف بثلاثة عناصر فريدة ⭐ {#كل-sa-يعرف-بثلاثة-عناصر-فريدة .subhead}

-   **Security Parameter Index (SPI):** رقم 32 بت فريد، موجود في رؤوس
    AH/ESP، يستخدمه المستقبل لتحديد أي SA يُستخدم.
-   **Destination IP Address:** عنوان الجهاز المستقبل الذي يُرسل إليه
    الترافيك.
-   **Security Protocol:** إما AH (مصادقة وسلامة) أو ESP (تشفير + مصادقة
    معاً).

### معاملات أخرى للـ SA {#معاملات-أخرى-للـ-sa .subhead}

::: grid
::: card
#### Sequence Number Counter

عداد 32 أو 64 بت، يولّد رقم تسلسلي فريد لكل حزمة، يُستخدم لمنع هجمات
Replay.
:::

::: card
#### SA Lifetime (عمر الاتفاقية)

الفترة/الكمية المسموح بنقلها قبل استبدال SA بمفتاح جديد أو إنهائها. تقلل
احتمالية الاختراق.
:::

::: card
#### Anti-Replay Window

نافذة منزلقة (Sliding Window) بحجم افتراضي W=64 لتتبع الأرقام التسلسلية
المقبولة.
:::
:::

### SAD --- Security Association Database {#sad-security-association-database .subhead}

تخزن كل الـ SAs المُنشأة، وتحتوي على: [SPI]{.kw .b}، عنوان IP للوجهة،
البروتوكول الأمني (AH/ESP)، الخوارزميات، المفاتيح. عند استقبال حزمة →
البحث في SAD بواسطة SPI لتحديد الإعدادات الواجب تطبيقها.

### SPD --- Security Policy Database {#spd-security-policy-database .subhead}

قاعدة بيانات تحتوي سياسات تحدد كيفية معاملة الترافيك. كل قاعدة تتكون من:

-   **Selectors (محددات):** عنوان IP محلي/بعيد، البروتوكول
    (TCP/UDP/ICMP)، المنافذ.
-   **Action (إجراء):** BYPASS / DISCARD / PROTECT

::: flow
::: {.box .bypass}
BYPASS\
[السماح بالمرور بدون حماية]{.small}
:::

::: arrow
\|
:::

::: {.box .discard}
DISCARD\
[حظر الحزمة]{.small}
:::

::: arrow
\|
:::

::: {.box .protect}
PROTECT\
[تطبيق تشفير/توثيق (AH/ESP)]{.small}
:::
:::

::: note
[مثال Host SPD]{.label}

UDP:500 (IKE) → BYPASS \| ICMP → BYPASS \| داخل Intranet → PROTECT ESP
transport \| HTTP للسيرفر → PROTECT ESP \| HTTPS:443 → BYPASS (تجنّب
التشفير المزدوج) \| أي شيء غير معرّف نحو DMZ → DISCARD \| الإنترنت العام
→ BYPASS.
:::
:::
:::

::: {#s8 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [8]{.num} خدمة منع إعادة الإرسال --- Anti-Replay Service

[▾]{.chev}
:::

::: section-body
::: def
[آلية العمل]{.label}

المرسل يبدأ عدّاد رقم التسلسل من 0، وكل حزمة تزيد القيمة. إذا وصل العداد
إلى الحد **2³²−1**، يجب إنهاء SA والتفاوض على SA جديد بمفتاح جديد (لا
يجوز إعادة القيمة للصفر).
:::

لأن IP بروتوكول غير موثوق ولا يضمن الترتيب، يستخدم المستقبل [Sliding
Window]{.kw} بحجم W (عادة 64) يمثل الحد الأيمن أعلى رقم تسلسلي N تم
استلامه.

### معالجة الحزم الواردة (3 حالات) ⭐ {#معالجة-الحزم-الواردة-3-حالات .subhead}

::: timeline
::: {.tl-step n="1"}
#### ضمن حدود النافذة وجديدة

يتم التحقق من MAC، إذا نجح التوثيق يوضع علامة على الخانة المقابلة.
:::

::: {.tl-step n="2"}
#### يمين النافذة وجديدة

يتم التحقق من MAC، ثم تُحرَّك (تُحدَّث) النافذة ليصبح رقمها الحد الأيمن
الجديد.
:::

::: {.tl-step n="3"}
#### يسار النافذة أو فشل التوثيق

تُرفض الحزمة، ويُعتبر ذلك حدثاً قابلاً للتدقيق (auditable event).
:::
:::
:::
:::

::: {#s9 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [9]{.num} معالجة الحزم الصادرة والواردة

[▾]{.chev}
:::

::: section-body
### Outbound Packets (الحزم الصادرة) {#outbound-packets-الحزم-الصادرة .subhead}

::: timeline
::: {.tl-step n="1"}
#### البحث في SPD

يتوقف البحث عند أول سياسة مطابقة.
:::

::: {.tl-step n="2"}
#### لا يوجد تطابق

تُهمل الحزمة وتصدر رسالة خطأ.
:::

::: {.tl-step n="3"}
#### يوجد تطابق

DISCARD (تجاهل) \| BYPASS (إرسال مباشر) \| PROTECT (البحث في SAD)
:::

::: {.tl-step n="4"}
#### PROTECT

إن لم يوجد SA في SAD → استخدام IKE لإنشاء SA جديد، ثم تطبيق ESP/AH، ثم
الإرسال عبر الشبكة.
:::
:::

### Inbound Packets (الحزم الواردة) {#inbound-packets-الحزم-الواردة .subhead}

::: timeline
::: {.tl-step n="1"}
#### فحص نوع الحزمة

محمية (AH/ESP) أم عادية، عبر فحص حقل Protocol في IP.
:::

::: {.tl-step n="2"}
#### حزمة محمية

استخراج SPI والبحث في SAD → إن لم يوجد تطابق: DISCARD، وإلا تطبيق
المعالجة المناسبة (AH/ESP) ثم تسليم الحزمة للطبقة الأعلى.
:::

::: {.tl-step n="3"}
#### حزمة غير محمية

البحث في SPD → أول تطابق BYPASS يُسلَّم مباشرة، وإلا (PROTECT أو DISCARD أو
لا تطابق) تُهمل الحزمة.
:::
:::

::: danger
[مثال اختباري كلاسيكي]{.label}

إذا كانت السياسة تتطلب حماية بكل من AH و ESP، لكن الحزمة الواردة تحتوي
فقط على رأس AH → **يجب إسقاطها (Discard)**.
:::
:::
:::

::: {#s10 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [10]{.num} تبادل مفاتيح الإنترنت --- IKE

[▾]{.chev}
:::

::: section-body
::: def
[لماذا IKE؟]{.label}

إنشاء SA بشكل يدوي غير عملي في البيئات الكبيرة أو المتغيرة باستمرار.
لذلك [IKE]{.kw .a} يُنشئ SAs بطريقة ديناميكية وآلية.
:::

### وظيفتا IKE الأساسيتان {#وظيفتا-ike-الأساسيتان .subhead}

::: grid
::: {.card .ike}
#### 1️⃣ Mutual Authentication

التحقق من هوية الطرفين. طرق المصادقة:

-   **Pre-shared Key (PSK):** سهل لكن أقل أماناً إذا لم يُدَر جيداً.
-   **Digital Signature:** أكثر أماناً، يعتمد على PKI وشهادات رقمية.
:::

::: {.card .ike}
#### 2️⃣ إنشاء Security Association

**IKE SA:** معلومات سرية مشتركة (مفاتيح وخوارزميات).

**IPSec SAs:** تؤمّن حركة البيانات فعلياً عبر ESP أو AH.
:::
:::

### إصدارات IKE {#إصدارات-ike .subhead}

::: tbl-wrap
  المعيار              [IKEv1]{.en}                     [IKEv2]{.en}
  -------------------- -------------------------------- -------------------------------------
  RFC                  2407, 2408, 2409                 4306 ثم 7296
  البساطة              معقد، نوعان: Main / Aggressive   أبسط، 4 رسائل فقط لتأسيس الاتصال
  الأداء               أبطأ وأثقل                       محسّن لاستخدام الموارد
  دعم NAT / Mobility   جزئي                             كامل ومبني داخل البروتوكول (MOBIKE)
  استرداد الجلسة       لا يدعم                          يدعم Session Resumption
  الدعم الحالي         أنظمة قديمة                      المعيار الأحدث والأكثر اعتماداً
:::

### رسائل IKE {#رسائل-ike .subhead}

جميع التبادلات تعتمد على بروتوكول [ISAKMP]{.kw} (Internet Security
Association and Key Management Protocol) لإدارة مفاوضات الأمان. يعمل IKE
عبر منفذ [UDP Port 500]{.kw .b}.

### Diffie-Hellman ⭐ {#diffie-hellman .subhead}

::: def
[تقنية تبادل مفاتيح آمنة]{.label}

كل طرف ينشئ قيمة سرية خاصة، ويشارك الطرف الآخر قيمة علنية مشتقة منها.
يتم دمج القيمة السرية مع القيمة المستلمة لإنتاج مفتاح مشترك واحد لدى
الطرفين، [دون إرسال المفتاح نفسه عبر الشبكة]{.mark} --- حتى لو راقب
المهاجم الاتصال لا يمكنه استخراج المفتاح بسهولة.
:::

### المرحلتان (Two-Phase Design) ⭐⭐ {#المرحلتان-two-phase-design .subhead}

::: grid
::: card
#### Phase I (مكلفة)

إنشاء **IKE SA / ISAKMP SA**: مصادقة الطرفين + تفاوض خوارزميات + تبادل
Diffie-Hellman.

نمطان: **Main Mode** (6 رسائل) أو **Aggressive Mode** (3 رسائل).
:::

::: card
#### Phase II (Quick Mode)

إنشاء **IPSec SAs** (تُستخدم مع AH أو ESP فعلياً). عبر وضع واحد فقط:
**Quick Mode** (3 رسائل عادة، +رسالة رابعة اختيارية).
:::
:::

::: tbl-wrap
  الخاصية        [Main Mode]{.en}       [Aggressive Mode]{.en}
  -------------- ---------------------- --------------------------------
  عدد الرسائل    6                      3
  حماية الهوية   ✅ يخفي هوية الطرفين   ❌ لا يخفيها (هويات غير مشفرة)
  الأمان         أكثر أماناً             أقل أماناً
  السرعة         أبطأ                   أسرع وأبسط
:::

### PFS --- Perfect Forward Secrecy ⭐ {#pfs-perfect-forward-secrecy .subhead}

::: def
[السرية التامة للأمام]{.label}

حتى لو تم اختراق المفتاح الرئيسي لاحقاً، لا يمكن فك تشفير البيانات
القديمة. مع PFS، يتم تبادل جديد لمفاتيح Diffie-Hellman في Phase 2، مما
ينتج مفتاحاً جديداً كلياً لا علاقة له بالمفتاح الأصلي.
:::
:::
:::

::: {#s11 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [11]{.num} تنسيق Authentication Header --- AH Format

[▾]{.chev}
:::

::: section-body
### حقول رأس AH {#حقول-رأس-ah .subhead}

-   [Next Header]{.en}[نوع البروتوكول الذي يأتي بعد AH]{.ar}
-   [Payload Length]{.en}[طول رأس AH فقط، بوحدات 32-bit، = (الطول
    الكلي/4) − 2]{.ar}
-   [Security Parameters Index (SPI)]{.en}[معرّف فريد لاتفاقية الأمان
    SA]{.ar}
-   [Sequence Number]{.en}[رقم تسلسلي يزيد مع كل حزمة، للحماية من
    Replay]{.ar}
-   [Authentication Data]{.en}[قيمة ناتجة من خوارزمية Hash (مثل HMAC)
    للتحقق من الحزمة]{.ar}

::: note
[مثال حساب Payload Length]{.label}

إذا كان ناتج خوارزمية المصادقة 96 بت (12 بايت): الحقول الثابتة = 8
بايت + 12 بايت Authentication Data = 20 بايت إجمالاً.\
**Payload Length = (20/4) − 2 = 3**
:::

### حقول IP لا تدخل في حساب AH (تتغيّر أثناء النقل) {#حقول-ip-لا-تدخل-في-حساب-ah-تتغير-أثناء-النقل .subhead}

-   **Type of Service (TOS):** قد يُعدّله بعض الراوترات لتغيير QoS.
-   **Fragmentation Flags:** قد تتغير أثناء التوجيه.
-   **Fragment Offset:** قابل للتغيير أثناء التجزئة.
-   **TTL (Time to Live):** يتناقص مع كل Router يمر به.
-   **Header Checksum:** يتغير إذا تغيرت الحقول أعلاه.

### AH Transport Mode --- التنسيق {#ah-transport-mode-التنسيق .subhead}

::: packet
::: ipnew
IP Header (جديد قليلاً، proto=51)
:::

::: ah
AH Header
:::

::: payload
TCP/UDP Header + Payload
:::
:::

يتغيّر حقل Protocol في رأس IP إلى القيمة **51** (مخصصة لـ AH)، والقيمة
القديمة (رقم بروتوكول الطبقة العليا) تنتقل إلى حقل Next Header داخل AH.

### AH Tunnel Mode --- التنسيق {#ah-tunnel-mode-التنسيق .subhead}

::: packet
::: ipnew
New IP Header
:::

::: ah
AH Header
:::

::: ipold
Original IP Header
:::

::: payload
TCP/UDP Header + Payload
:::
:::

تبقى حزمة IP الأصلية سليمة بالكامل وتُغلَّف داخل حزمة جديدة. يحتوي IP
Header الجديد على عناوين أجهزة IPSec (Gateways) وليس المرسل/المستقبل
الأصليين.
:::
:::

::: {#s12 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [12]{.num} تنسيق ESP --- ESP Packet Format

[▾]{.chev}
:::

::: section-body
::: note
[ملاحظة مهمة]{.label}

في ESP، كلٌ من التشفير والمصادقة **اختياريان**، لكن يجب اختيار واحد على
الأقل كحد أدنى. كما يوفر خدمة Anti-Replay بشكل اختياري.
:::

### حقول حزمة ESP {#حقول-حزمة-esp .subhead}

-   [Security Parameters Index (SPI)]{.en}[تحديد اتفاقية الأمان (مفاتيح
    وخوارزميات مشتركة)]{.ar}
-   [Sequence Number]{.en}[لخدمة Anti-Replay]{.ar}
-   [Payload Data]{.en}[TCP segment (transport mode) أو حزمة IP كاملة
    (tunnel mode)]{.ar}
-   [Padding (0-255 bytes)]{.en}[حشو لضبط الحجم على حجم الكتلة (block
    size) للتشفير]{.ar}
-   [Pad Length]{.en}[طول الحشو]{.ar}
-   [Next Header]{.en}[نوع الحمولة (Type of Payload)]{.ar}
-   [Authentication Data]{.en}[قيمة تحقق قائمة على HMAC (شبيهة بـ
    AH)]{.ar}

### ESP Transport Mode {#esp-transport-mode .subhead}

::: timeline
::: {.tl-step n="1"}
#### تشفير Payload فقط

بيانات طبقة النقل (TCP/UDP) فقط.
:::

::: {.tl-step n="2"}
#### إدراج ESP Header

قبل البيانات.
:::

::: {.tl-step n="3"}
#### إضافة ESP Trailer

بعد البيانات (Padding + Pad Length + Next Header).
:::

::: {.tl-step n="4"}
#### ESP Auth Data (اختياري)

في نهاية الحزمة.
:::
:::

::: packet
::: ipnew
IP Header (next=ESP)
:::

::: esp
ESP Header (SPI+SeqNum)
:::

::: payload
TCP Payload (مشفّر)
:::

::: auth
ESP Trailer + Auth Data
:::
:::

### ESP Tunnel Mode {#esp-tunnel-mode .subhead}

يحمي حزمة IP الأصلية بالكامل. يُضاف رأس IP جديد + رأس ESP في البداية، و
ESP Trailer + بيانات المصادقة في النهاية.

::: packet
::: ipnew
New IP Header (next=ESP)
:::

::: esp
ESP Header
:::

::: ipold
Original IP Header (مشفّر)
:::

::: payload
TCP Payload (مشفّر)
:::

::: auth
ESP Trailer + Auth Data
:::
:::
:::
:::

::: {#s13 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [13]{.num} تحديثات IPsec الحديثة (2025/2026)

[▾]{.chev}
:::

::: section-body
أحدث توجهات مجموعة [IPSECME]{.kw} التابعة لـ [IETF]{.kw}:

::: grid
::: card
#### 🔮 Post-Quantum Cryptography

آليات هجينة في IKEv2 تجمع بين ECC التقليدي وخوارزميات مقاومة للحوسبة
الكمية مثل [Kyber]{.kw} (تبادل مفاتيح) و[Dilithium]{.kw} (توقيع رقمي)،
عبر **Hybrid Key Exchange**.
:::

::: card
#### ⚡ تحسين أداء ESP

تقليل الـ Overhead، دعم تسريع عتادي (Hardware Offloading) عبر NIC،
وتحسين معالجة Fragmentation عبر Path MTU Discovery.
:::

::: card
#### 🛡️ تحسينات IKEv2

منع هجمات Downgrade Attacks، تحسين Rekeying (Seamless Rekeying)، وتعزيز
مقاومة هجمات DoS.
:::

::: card
#### ☁️ SDN & Cloud Integration

IPsec أصبح جزءاً أساسياً في بيئات Cloud Computing و SDN، مع دعم Mobility
بين الشبكات دون فقدان الاتصال.
:::
:::
:::
:::

::: {#s14 .section .section}
::: {.section-head onclick="toggleSection(this)"}
## [14]{.num} أسئلة مراجعة سريعة ⚡

[▾]{.chev}
:::

::: section-body
::: good
[✅ نقاط يجب حفظها قبل الامتحان]{.label}

-   AH = مصادقة + سلامة **فقط** (بدون تشفير). ESP = تشفير + مصادقة
    اختيارية.
-   Transport Mode يحمي Payload فقط، Tunnel Mode يحمي الحزمة كاملة
    (IP+Payload).
-   IKE يعمل في User Space، IPSec (AH/ESP) يعمل في Kernel Space.
-   3 قواعد بيانات: SAD (تخزين SAs) --- SPD (سياسات:
    DISCARD/BYPASS/PROTECT) --- PAD (تفويض الأطراف).
-   SA يُعرَّف بـ: SPI + Destination IP + Security Protocol.
-   IKE Phase I = ISAKMP SA (مكلفة، Main=6 رسائل أو Aggressive=3 رسائل).
    Phase II = Quick Mode → IPSec SAs.
-   IKE يعمل على منفذ UDP 500، ويعتمد على بروتوكول ISAKMP.
-   Diffie-Hellman: يبني مفتاحاً مشتركاً دون إرسال المفتاح عبر الشبكة.
-   PFS: اختراق مفتاح لاحقاً لا يكشف بيانات سابقة، لأن كل جلسة تُنشئ
    مفتاحاً DH جديداً.
-   Anti-Replay: نافذة منزلقة W=64 افتراضياً، حزمة يسار النافذة أو مكررة
    تُرفض.
-   IKEv2 أبسط من IKEv1 (4 رسائل فقط) وأكثر دعماً لـ NAT/Mobility.
:::

### أهم المختصرات (Acronyms) {#أهم-المختصرات-acronyms .subhead}

::: {style="line-height:2.4;"}
[AH]{.kw .b} Authentication Header [ESP]{.kw .c} Encapsulating Security
Payload [IKE]{.kw .a} Internet Key Exchange [SA]{.kw .p} Security
Association [SAD]{.kw} Security Association Database [SPD]{.kw} Security
Policy Database [PAD]{.kw} Peer Authorization Database [SPI]{.kw}
Security Parameter Index [ISAKMP]{.kw} Internet Security Association and
Key Management Protocol [PFS]{.kw} Perfect Forward Secrecy [PKI]{.kw}
Public Key Infrastructure [PSK]{.kw} Pre-Shared Key [MAC]{.kw} Message
Authentication Code [QoS]{.kw} Quality of Service [TTL]{.kw} Time To
Live [VPN]{.kw} Virtual Private Network
:::
:::
:::
:::

📚 مرجع مراجعة --- Computer Networks Security \| IPSec Lecture 3 \|
جامعة حمص 2025/2026\
تم إعداد هذا الملخص من محتوى المحاضرة الأصلية فقط.

🖨️

⬆️
