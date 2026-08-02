::: {#progressBar}
:::

::: hero
::: hero-inner
::: hero-eyebrow
[]{.dot} مراجعة نهائية --- قبل الامتحان
:::

# أمن الشبكات اللاسلكية [WLAN Security]{.accent}

ملخص تفاعلي شامل لمحاضرة Computer Networks Security --- Lecture 6، يغطي
كل الأفكار الأساسية من WEP إلى WPA2 وX802.1 وEAP، مرتب لمراجعة سريعة قبل
الامتحان.

::: hero-meta
::: meta-chip
📘 **المادة:** Computer Networks Security
:::

::: meta-chip
🎓 **المحاضِرة:** Dr. Manal Alomar
:::

::: meta-chip
🏛️ **جامعة حمص** --- السنة الخامسة 2025/2026
:::

::: meta-chip
📄 **المرجع:** Computer Security and the Internet --- Ch.12
:::
:::
:::
:::

::: nav-wrap
::: nav-inner
::: {#navScroll .nav-scroll}
[مقدمة](#intro){.nav-link} [مكونات 802.11](#components){.nav-link}
[أنماط العمل](#modes){.nav-link} [آلية الاتصال](#lifecycle){.nav-link}
[التهديدات](#threats){.nav-link} [الحماية القديمة](#legacy){.nav-link}
[WEP](#wep){.nav-link} [WPA / TKIP](#wpa){.nav-link} [WPA2 /
802.1X](#wpa2){.nav-link} [EAP](#eap){.nav-link} [مقارنات
شاملة](#compareall){.nav-link} [أسئلة سريعة](#quiz){.nav-link}
:::

::: search-box
[🔍]{.icon}
:::
:::
:::

::: {#content .wrap}
::: {#intro .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
1
:::

## مقدمة عامة[Introduction to WLAN & Wi-Fi]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [📡]{.ic} Wi-Fi و 802.11 IEEE

**Ethernet** (إيثرنت) هي التقنية المهيمنة على الشبكات السلكية **LAN**
(Local Area Network) وتخضع لمعيار **802.3 IEEE**. بالمقابل، تُعتبر
**Wi-Fi** والمعيار **802.11 IEEE** هما **النظير اللاسلكي** لـ Ethernet
في شبكات **WLAN** (Wireless Local Area Network).

::: def-box
::: en
Both Ethernet and Wi-Fi provide an interface that isolates upper layers
from the Physical and Data Link layer implementation details.
:::

::: ar
كل من Ethernet و Wi-Fi يقدّمان واجهة تعزل الطبقات العليا عن تفاصيل تنفيذ
طبقتي Data Link و Physical، بحيث تعمل التطبيقات دون معرفة كيفية انتقال
البيانات فعليًا.
:::
:::

تصل الأجهزة المتنقلة (كالحواسيب المحمولة) إلى الشبكة عبر الاتصال بـ
**Access Point (AP)** من خلال وسط لاسلكي يعمل ضمن ترددات راديوية **RF
(Radio Frequency)**. غالبًا ما يكون الـ AP متصلاً بشبكة محلية سلكية، فيوفّر
الوصول إلى الإنترنت.
:::

::: card
### [🛡️]{.ic} تعريف WLAN Security

::: def-box
::: en
WLAN Security is a set of technologies and practices designed to protect
wireless networks from unauthorized access, data theft, and malicious
interference.
:::

::: ar
أمن الشبكات اللاسلكية (WLAN Security) هو مجموعة من التقنيات والممارسات
المصممة لحماية الشبكات اللاسلكية من الوصول غير المصرح به، وسرقة
البيانات، والتدخلات الضارة.
:::
:::

::: {.box .box-warn}
**لماذا هي أكثر خطورة؟** لأن البيانات تنتقل عبر الهواء (Air)، مما يسهّل
التقاطها أو اعتراضها من قبل المتسللين (Intercept/Eavesdrop)، على عكس
الشبكات السلكية.
:::
:::
:::
:::

::: {#components .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
2
:::

## المكونات الأساسية[Primary 802.11 Components]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [🧩]{.ic} المكونات الثلاثة الرئيسية

-   [STA (Station / Mobile Station)]{.term-en} [الجهاز اللاسلكي
    الطرفي]{.term-ar} [الجهاز المستخدم للاتصال بالشبكة اللاسلكية، مثل
    الحاسوب المحمول أو الهاتف الذكي.]{.term-desc}
-   [AP (Access Point)]{.term-en} [نقطة الوصول]{.term-ar} [تربط بين
    الأجهزة اللاسلكية STA والشبكة المحلية السلكية DS، وتُنشئ اتصالات
    منطقية بينها. يحتوي أحيانًا على مكوّن فرعي يُعرف باسم
    Authenticator.]{.term-desc}
-   [AS (Authentication Server)]{.term-en} [خادم المصادقة]{.term-ar}
    [مسؤول عن عمليات Authentication والتحقق من هوية المستخدمين قبل
    السماح لهم بالوصول للشبكة. في الشبكات المنزلية البسيطة قد يكون مدمجًا
    داخل الـ AP نفسه (قائمة بسيطة بأسماء مستخدمين وكلمات مرور)، بينما
    تستخدم البيئات المتقدمة آليات مصادقة أكثر تطورًا.]{.term-desc}

::: flow
::: fstep
STA\
[الجهاز اللاسلكي]{style="font-weight:400;font-size:0.78rem;"}
:::

::: arrow
⇄
:::

::: fstep
AP\
[نقطة الوصول]{style="font-weight:400;font-size:0.78rem;"}
:::

::: arrow
---
:::

::: fstep
DS\
[Distribution System]{style="font-weight:400;font-size:0.78rem;"}
:::

::: arrow
---
:::

::: fstep
AS\
[خادم المصادقة]{style="font-weight:400;font-size:0.78rem;"}
:::
:::

::: def-box
::: en
Distribution System (DS): connected to the rest of the network via wired
media, providing Forwarding and Routing services within the network.
:::

::: ar
نظام التوزيع DS يكون غالبًا متصلًا ببقية الشبكة عبر وسائط سلكية، ويقدّم
خدمات التمرير (Forwarding) والتوجيه (Routing) داخل الشبكة.
:::
:::
:::
:::
:::

::: {#modes .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
3
:::

## أنماط عمل 802.11[Primary 802.11 Modes]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: grid-2
::: card
### [🏢]{.ic} Infrastructure Mode

النمط الأكثر شيوعًا واستخدامًا. يعتمد على وجود **Access Point** واحد أو
أكثر داخل الشبكة.

-   الـ AP يُنشئ اتصالًا لاسلكيًا مع STA، ويربطه منطقيًا مع DS (أو مع STA
    آخر أحيانًا).
-   الـ AP يحتوي على مكوّن فرعي يُعرف باسم **Authenticator**.
-   يسمح لـ STA بالوصول إلى DS عبر آلية **Access Control** تعتمد على
    قرار من AS.

::: def-box
::: en
BSS (Basic Service Set): one AP with one or more STA devices.
:::

::: ar
مجموعة تتكوّن من AP واحد مع جهاز STA واحد أو أكثر تُسمى BSS.
:::
:::

::: def-box
::: en
ESS (Extended Service Set): a group of two or more BSSs connected via a
DS, providing wider coverage and roaming.
:::

::: ar
مجموعة من اثنين أو أكثر من BSSs المرتبطة عبر DS تُسمى ESS، وتوفّر تغطية
أوسع وإمكانية تنقل الأجهزة بين نقاط الوصول.
:::
:::
:::

::: card
### [🔗]{.ic} Ad Hoc Mode

نمط مختلف من تكوينات 802.11، **لا يوجد فيه أي Access Point** داخل
الشبكة.

-   أجهزة STA تتصل مباشرةً مع بعضها البعض دون بنية تحتية مركزية.
-   لا يوجد اتصال مع DS.
-   يُشكّل ما يُعرف بـ **IBSS (Independent Basic Service Set)**.
-   يُستخدم غالبًا في الشبكات المؤقتة أو البيئات الصغيرة التي تتطلب اتصالًا
    مباشرًا بين الأجهزة.
:::
:::
:::
:::

::: {#lifecycle .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
4
:::

## آلية عمل شبكات Wi-Fi[802.11 Connection Lifecycle (Frames)]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [🔎]{.ic} المرحلة 1: اكتشاف الشبكة (Discovery)

::: timeline
::: tl-item
::: tl-title
Beacon Frame
:::

::: tl-en
إطار الإعلان
:::

ترسله نقطة الوصول (AP) للإعلان عن وجود شبكة Wi-Fi، ويحتوي على اسم الشبكة
(**SSID**) وإعدادات مثل نوع التشفير وسرعات البيانات. تسمح هذه الإشارات
للأجهزة برؤية الشبكات المتاحة حولها.
:::

::: tl-item
::: tl-title
Probe Request Frame
:::

::: tl-en
إطار طلب البحث
:::

يرسله الجهاز للبحث عن شبكة Wi-Fi (إذا لم يتلقَّ Beacon أو أراد البحث
بسرعة). إذا لم يعرف اسم الشبكة يسأل بشكل عام (**Broadcast**)، وإذا كان
يعرفه يسأل مباشرة (**Directed**).
:::

::: tl-item
::: tl-title
Probe Response Frame
:::

::: tl-en
إطار استجابة البحث
:::

ترسله نقطة الوصول كرد على طلب جهاز يبحث عن الشبكة، يُرسل كـ **Unicast**
(وليس Broadcast)، ويحتوي على المعلومات المطلوبة.
:::
:::
:::

::: card
### [🔐]{.ic} المرحلة 2: التحقق من الهوية (Authentication)

::: timeline
::: tl-item
::: tl-title
Authentication Frame
:::

::: tl-en
إطار التوثيق
:::

يرسله أولاً الجهاز، ثم نقطة الوصول، بغرض التأكد من أن الجهاز له الحق
بالانضمام.
:::
:::

::: compare-mini
::: {.col .a}
#### Open System

النظام المفتوح --- يتم القبول عادة دون تحقق معقّد.
:::

::: {.col .b}
#### Shared Key

النظام الآمن --- يُرسل كلمة مرور مشفرة ويتم التحقق منها.
:::
:::
:::

::: card
### [🤝]{.ic} المرحلة 3: الانضمام الرسمي (Association)

::: timeline
::: tl-item
::: tl-title
Association Request Frame
:::

::: tl-en
إطار طلب الارتباط
:::

يرسله الجهاز لطلب الانضمام إلى الشبكة فعليًا.
:::

::: tl-item
::: tl-title
Association Response Frame
:::

::: tl-en
إطار استجابة الارتباط
:::

ترسله نقطة الوصول للقبول أو الرفض، وتتضمن رقم تعريفي (**Association
ID**) والسرعة المسموحة. بعدها يمكن للجهاز إرسال واستقبال البيانات.
:::
:::
:::

::: card
### [🔌]{.ic} المرحلة 4: فك الارتباط (Disassociation)

-   [Deassociation Frame]{.term-en} [إطار فك الارتباط]{.term-ar} [قد
    يرسله الجهاز (Client) لقطع الاتصال، أو ترسله نقطة الوصول لفصل الجهاز
    (بسبب مشكلة أو سياسة معينة). ينهي الاتصال لكن يمكن إعادة التوثيق
    لاحقًا.]{.term-desc}
-   [Deauthentication Frame]{.term-en} [إطار إلغاء التوثيق]{.term-ar}
    [رسالة تُرسل من الجهاز أو نقطة الوصول لإلغاء عملية التوثيق بالكامل
    بين الطرفين --- أي إنهاء الجلسة الأمنية. تُرسل قبل أو أثناء التوثيق،
    وتُلغي الاتصال بالكامل وتمنع تبادل البيانات.]{.term-desc}

::: {.box .box-danger}
**مهم للامتحان** هذان الإطاران (Deauthentication و Disassociation) هما
نقطة الضعف الأساسية التي تُستغل في هجمات **Rogue AP** و**Session
Hijacking** و**Denial of Service** لأن إطارات الإدارة (Management
Frames) غير محمية في WEP.
:::
:::
:::
:::

::: {#threats .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
5
:::

## تهديدات أمن الشبكات اللاسلكية[Threats against WLANs]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [🔗]{.ic} Link vs End-to-End Security

::: def-box
::: en
WLAN security focuses mainly on protecting the link (Layer 2) between
the device and the Access Point --- not full source-to-destination
protection.
:::

::: ar
شبكة WLAN تركز أساسًا على تأمين الاتصال في الطبقة الثانية (Layer 2) بين
الجهاز ونقطة الوصول، وليس على تأمين الاتصال الكامل من المصدر إلى الوجهة
النهائية.
:::
:::

::: {.box .box-warn}
**نقطة مهمة** عندما يقوم الـ AP بفك تشفير البيانات ثم إعادة توجيهها،
تنتهي الحماية اللاسلكية عند الـ AP، وتصبح البيانات **Plaintext** (نص
صريح) داخل الشبكة السلكية، ما لم توجد بروتوكولات حماية إضافية في طبقات
أعلى.
:::
:::

::: attack-card
### 🎭 Rogue AP Attacks [هجوم نقطة الوصول المزيفة]{style="font-size:0.85rem;color:var(--ink-500);font-weight:400;"}

يحدث عندما **لا توجد آلية Mutual Authentication** (مصادقة متبادلة) بين
STA والـ AP، مما يعني أن جهاز المستخدم لا يستطيع التأكد من هوية الـ AP
الحقيقي، بل يعتمد فقط على **SSID** أو **MAC Address** اللذين يمكن
للمهاجم تقليدهما بسهولة.

::: flow
::: fstep
المهاجم ينشئ Rogue AP بنفس معلومات الشبكة
:::

::: arrow
→
:::

::: fstep
إرسال Disassociate Frame لإجبار الضحية على قطع الاتصال
:::

::: arrow
→
:::

::: fstep
الضحية تتصل بالـ Rogue AP معتقدة أنه AP الشرعي
:::

::: arrow
→
:::

::: fstep
Rogue AP يعمل كـ Middle Person بين STA و AP الحقيقي
:::
:::

::: {.box .box-danger}
**النتيجة** بدون Session Encryption أو Integrity Protection يستطيع
المهاجم قراءة البيانات والتجسس عليها. أما مع استخدام Mutual
Authentication + Encryption + Integrity Checking، تصبح قدرة المهاجم
محدودة في تنفيذ Denial of Service أو محاولة تعديل Frames (يتم اكتشافها
لاحقًا).
:::
:::

::: attack-card
### 🕵️ Session Hijacking Attacks [هجمات اختطاف الجلسة]{style="font-size:0.85rem;color:var(--ink-500);font-weight:400;"}

يحدث عندما لا يتم استخدام **Encryption** لحماية الاتصال، في شبكات
802.11.

::: timeline
::: tl-item
::: tl-title
1\. STA يكمل عملية 802.1X Authentication مع AP بنجاح
:::
:::

::: tl-item
::: tl-title
2\. المهاجم يرسل Disassociate Management Frame مزيفة للضحية منتحلاً MAC
Address الخاص بالـ AP
:::

يؤدي هذا لقطع اتصال STA بالشبكة، بينما يبقى AP معتقدًا أن الجلسة الأصلية
ما زالت فعالة (Authentication State ما زالت صحيحة).
:::

::: tl-item
::: tl-title
3\. المهاجم يبدأ بانتحال MAC Address الخاص بالضحية
:::

ويتابع تبادل Session Messages مع الـ AP وكأنه المستخدم الشرعي --- وبذلك
ينجح في اختطاف الجلسة.
:::
:::

::: {.box .box-safe}
**الحل** عند استخدام Encryption يصبح تنفيذ الهجوم صعبًا، لأن المهاجم لا
يملك مفاتيح التشفير اللازمة.
:::
:::

::: attack-card
### 🚗 War Driving [القيادة الحربية / مسح الشبكات]{style="font-size:0.85rem;color:var(--ink-500);font-weight:400;"}

::: def-box
::: en
War Driving is the process of scanning radio channels to search for
existing WLAN networks within range.
:::

::: ar
هو عملية فحص (Scanning) لقنوات الراديو بهدف البحث عن شبكات WLAN الموجودة
ضمن النطاق.
:::
:::

قد يكون الهدف العثور على **Open Networks** لا تتطلب كلمة مرور، أو تنفيذ
**Reconnaissance** (استطلاع) لبناء خريطة لنقاط الوصول Access Points في
منطقة معينة، باستخدام Laptop + GPS + Antenna عالية القدرة.

-   **Omni-directional Antennas** --- لمسح مناطق واسعة.
-   **Directional Antennas** --- لاستهداف شبكات بعيدة المدى.

::: {.box .box-info}
**أدوات شهيرة** **NetStumbler** --- أداة قديمة كانت ترسل Probes بشكل
مستمر لاكتشاف APs واستخراج SSID و MAC Address و Channel Number وقوة
الإشارة وحالة استخدام Encryption.\
**AirSnort** --- أداة تساعد على تنفيذ هجمات إضافية لاحقًا.
:::

⚖️ شرعية هذه الأنشطة تختلف قانونيًا وأخلاقيًا بين الدول، لذلك يُنصح بالحصول
على إذن رسمي قبل تنفيذ أي فحص.
:::

::: attack-card
### 🚫 Denial of Service (DoS) [هجمات حجب الخدمة]{style="font-size:0.85rem;color:var(--ink-500);font-weight:400;"}

**Denial of Service --- Spoofed Frames, Signal Jamming** (إطارات مزوّرة،
تشويش الإشارة)

يتم تعطيل الشبكة أو إبطاؤها عمدًا، إما عن طريق إرسال أطر Wi-Fi مزورة (مثل
**Deauthentication Frames**) التي تُجبر الأجهزة على قطع الاتصال، أو من
خلال تشويش الإشارة باستخدام موجات راديوية قوية تعيق الاتصال بين الأجهزة
ونقطة الوصول.

::: {.box .box-warn}
**لا يمكن منع التشويش بالكامل، لكن يمكن**

-   استخدام نطاقات تردد أقل ازدحامًا مثل **5GHz**.
-   مراقبة الشبكة لكشف النشاط غير الطبيعي.
:::
:::
:::
:::

::: {#legacy .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
6
:::

## الطرق القديمة الضعيفة للحماية[Legacy (Weak) Methods to Secure Infrastructure Mode WLANs]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [🔑]{.ic} Change Default AP Administrator Password [--- تغيير كلمة مرور مدير AP]{.small-muted}

كل راوتر أو نقطة وصول تأتي بكلمة مرور إدارية افتراضية (مثل
**admin/admin** لراوتر TP-Link) تتيح الدخول للوحة الإعدادات.

::: {.box .box-danger}
**الخطر** إذا استطاع المتسلل الوصول لصفحة إعدادات AP، فإنه عمليًا **يملك
الشبكة بالكامل**.
:::

::: table-wrap
  الهجوم                                    التأثير المحتمل
  ----------------------------------------- ----------------------------------------
  تغيير SSID وكلمة المرور                   منع المستخدمين الشرعيين من الدخول
  فتح الشبكة أو إزالة التشفير               تمكين التنصت وسرقة البيانات
  تفعيل Remote Management                   السيطرة عن بعد على الشبكة
  إنشاء شبكة وهمية بنفس الاسم (Evil Twin)   خداع الضحايا وسرقة معلوماتهم
  إعادة توجيه التصفح لمواقع مزيفة           سرقة كلمات مرور أو تثبيت برمجيات خبيثة
:::
:::

::: card
### [🏷️]{.ic} Change & Hide SSID Name [--- تغيير وإخفاء اسم الشبكة]{.small-muted}

**SSID** هو اسم الشبكة اللاسلكية الذي يظهر عند البحث عن شبكات. عند تشغيل
AP لأول مرة يكون له SSID افتراضي مثل: TP-LINK, Netgear, Linksys, D-Link.

::: {.box .box-warn}
**عند استخدام SSID الافتراضي، يمكن للمهاجم**

-   كشف نوع وماركة جهاز الـ Access Point.
-   استخدام كلمات المرور الافتراضية الخاصة بهذه الماركة.
-   تشغيل أدوات استغلال (exploits) معروفة تستهدف ثغرات هذا النوع من
    الأجهزة.
-   اختيار أدوات كسر التشفير المناسبة بناءً على نوع الجهاز والتشفير.
:::

::: {.box .box-danger}
**إخفاء SSID ليس أمانًا حقيقيًا!** إخفاء الـ SSID لا يعني أن الشبكة مخفية
بالكامل أو آمنة، بل فقط أن الـ AP لا يرسل اسم الشبكة داخل Beacon Frames
بشكل واضح. يمكن اكتشافه بعدة طرق:

-   تشغيل بطاقة الشبكة في Monitor Mode أو RFMON Mode لالتقاط كل الـ
    Frames.
-   مراقبة Association Frames و Probe Requests/Responses.
-   إجبار جهاز متصل على إعادة الاتصال عبر
    Deauthentication/Disassociation Frames، والتقاط SSID من Handshake.
:::
:::

::: card
### [🧾]{.ic} MAC Filtering [--- تصفية عناوين MAC]{.small-muted}

من أقدم وسائل الحماية، لكنها محدودة المزايا وكبيرة العيوب خاصة في
البيئات الكبيرة.

-   كل جهاز شبكة لديه عنوان MAC فريد.
-   الـ AP ينشئ قائمة بيضاء (Whitelist) لعناوين MAC المسموح لها
    بالاتصال.
-   الأجهزة غير الموجودة في القائمة تُمنع من الاتصال.

::: table-wrap
  العيب                  الشرح
  ---------------------- ----------------------------------------------------------------------------------
  يمكن تجاوزها بسهولة    يمكن لأي مخترق معرفة MAC المسموح به عبر مراقبة الشبكة، ثم تزييفه (Spoof) والدخول
  صعبة الإدارة           المؤسسات الكبيرة تحتاج تسجيل مئات أو آلاف عناوين MAC يدويًا
  لا تقدم تشفيرًا فعليًا   لا تمنع التنصت أو هجمات MITM أو Replay Attacks
  غير ديناميكية          أي جهاز جديد يجب إضافته يدويًا
:::

::: {.box .box-info}
**خلاصة** إخفاء SSID وتصفية MAC توفران أمانًا شكليًا فقط، ويمكن تجاوزهما
بسهولة بأدوات تحليل الشبكات. لذلك يُوصى باستخدام **WPA2/WPA3** مع كلمات
مرور قوية.
:::
:::
:::
:::

::: {#wep .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
7
:::

## معيار WEP[IEEE 802.11 --- Wired Equivalent Privacy]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [📜]{.ic} نظرة عامة

::: def-box
::: en
IEEE 802.11 WEP is part of the first Wi-Fi standard (1997), intended to
give wireless networks a level of privacy at least equal to that of
wired networks (which lack special protection mechanisms).
:::

::: ar
WEP جزء من أول معيار Wi-Fi (صدر عام 1997)، والهدف منه جعل الشبكة
اللاسلكية آمنة على الأقل بمثل مستوى أمان الشبكة السلكية (التي لا تحتوي
آليات حماية خاصة).
:::
:::

::: {.box .box-danger}
**no longer in use** لم يعد يُستخدم --- أصبح غير آمن ولا يُوصى باستخدامه
حاليًا. من السهل كسره باستخدام أدوات متوفرة مجانًا، ولم يُصمَّم لتحقيق أمان
قوي، وفي النهاية لم يُوفّر حتى أضعف درجات الأمان.
:::
:::

::: card
### [⚙️]{.ic} WEP Services [--- خدمات WEP]{.small-muted}

-   [Access control to the network, based on knowing the shared
    key]{.term-en} [التحكم بالوصول يعتمد على معرفة المفتاح
    المشترك]{.term-ar} [لا توجد آلية مصادقة حقيقية --- فقط من يعرف كلمة
    السر يمكنه الدخول. ضعف كبير لأن المفتاح مشترك بين الجميع ويمكن
    تسريبه بسهولة.]{.term-desc}
-   [Confidentiality and integrity check for data frames; management
    frames unprotected]{.term-en} [السرية وفحص السلامة لإطارات البيانات
    فقط؛ إطارات الإدارة غير محمية]{.term-ar} [إطارات الإدارة (كرسائل
    الاتصال أو الانفصال) لا تُشفّر ولا يُتحقق منها، ما يجعلها عرضة لهجمات
    مثل Deauthentication Attacks.]{.term-desc}
-   [RC4 stream cipher with a static 40-bit or 104-bit (optional)
    pre-shared key and 24-bit initialization vector]{.term-en} [تشفير
    تدفقي RC4 بمفتاح ثابت 40 أو 104 بت وشعاع تهيئة IV طوله 24
    بت]{.term-ar} [RC4 ضعيف، والـ IV صغير جدًا مما يؤدي لتكرار المفاتيح
    ويسهّل كسر التشفير. يُرسل IV في كل إطار، مما يسهّل جمع وتحليل المفاتيح
    المكررة.]{.term-desc}
-   [Integrity check value (ICV) = CRC32 checksum encrypted with
    RC4]{.term-en} [قيمة التحقق من السلامة ICV = تجزئة CRC32 مشفّرة بـ
    RC4]{.term-ar} [CRC32 ليس قويًا بما فيه الكفاية لاكتشاف التلاعب
    المتعمد. وبما أن الـ checksum مشفر بنفس الخوارزمية، يمكن التلاعب
    بالمحتوى وتعديل ICV لتبدو صحيحة.]{.term-desc}
:::

::: card
### [🔑]{.ic} أنواع مفاتيح WEP

::: grid-2
::: {.box .box-info}
**Default Key** يُعرف أيضًا باسم: Broadcast Key - Multicast Key - Group
Key - Shared Key

يُستخدم عادة لجميع المستخدمين في الشبكة ويُشارك بينهم، لتشفير الرسائل
الجماعية. **ضعيف من ناحية الأمان** لأن جميع الأجهزة تستخدم نفس المفتاح.
:::

::: {.box .box-safe}
**Key Mapping Key** يُعرف أيضًا باسم: Unique Key - Per-Station Key -
Individual Key

يُخصص لكل جهاز (محطة) مفتاح خاص به، يُستخدم لتأمين الاتصال بين الجهاز
ونقطة الوصول فقط. **مستوى أمان أعلى**، لكنه كان نادر الاستخدام في WEP.
:::
:::
:::

::: card
### [🔄]{.ic} WEP Data Confidentiality and Integrity [--- آلية التشفير خطوة بخطوة]{.small-muted}

::: timeline
::: tl-item
تُمرَّر الرسالة النصية (plaintext) عبر خوارزمية تحقق من السلامة، ويُلحق
**ICV** (Integrity Check Value = CRC-32) في نهاية الرسالة الأصلية.
:::

::: tl-item
يُولَّد **IV** بطول 24 بت، ويُضاف إلى بداية المفتاح السري، ثم يُدخل إلى
خوارزمية **KSA (Key Scheduling Algorithm)** لتوليد seed يُستخدم في مولد
الأرقام الزائفة **PRNG** الخاص بـ WEP.
:::

::: tl-item
يُنتِج المولّد تدفق التشفير (Keystream)، ثم تتم عملية **XOR** بين تدفق
التشفير والرسالة (النص + ICV)، مما ينتج النص المشفر (ciphertext).
:::

::: tl-item
أخيرًا، يُلحق IV بشكل **غير مشفر** مع النص المشفر، ثم يُرسل.
:::
:::
:::

::: card
### [🤝]{.ic} WEP Authentication [--- المصادقة / التحكم بالوصول]{.small-muted}

قبل الانضمام (association) يجب على STA أن يُصادق نفسه لنقطة الوصول AP،
باستخدام بروتوكول **تحدي - استجابة (Challenge-Response Protocol)** بسيط.

::: flow
::: fstep
AP يرسل Challenge (رقم عشوائي) إلى STA
:::

::: arrow
→
:::

::: fstep
STA يُشفّر الـ Challenge بالمفتاح السري المشترك
:::

::: arrow
→
:::

::: fstep
STA يعيده إلى AP للتحقق من صحة المصادقة
:::
:::

::: {.box .box-danger}
التصميم يحتوي على نقاط ضعف أمنية خطيرة سمحت للمهاجمين باستغلاله، ويُستخدم
غالبًا كمثال عملي على الأخطاء التصميمية في الأنظمة الأمنية اللاسلكية
القديمة.
:::
:::

::: card
### [⚠️]{.ic} نقاط ضعف بروتوكول WEP [--- Weaknesses of WEP]{.small-muted}

::: keypoints
::: kp
**No key distribution mechanism**المفتاح السري يُدخل يدويًا على جميع
الأجهزة، لا يُولَّد أو يُوزَّع بطريقة آمنة أو ديناميكية → عرضة للتسريب خاصة مع
الاستخدام الطويل.
:::

::: kp
**Authentication: knowing the shared key is enough**لا توجد مصادقة قوية
تعتمد على شهادات أو مفاتيح فريدة --- أي شخص يعرف المفتاح يمكنه الاتصال
بالشبكة.
:::

::: kp
**One-way Authentication**الجهاز يثبت هويته لـ AP، لكن AP لا يثبت هويته
للجهاز → يتيح هجوم Rogue Access Point.
:::

::: kp
**Key Reuse**نفس المفتاح يُستخدم للمصادقة وللتشفير معًا --- يضعف الأمان،
والمهاجم يمكنه استغلال ثغرات أي من الآليتين لكسر المفتاح.
:::

::: kp
**No session re-authentication**التحقق من الهوية يحدث مرة واحدة فقط عند
الاتصال → يسمح للمهاجم بانتحال MAC Address الخاص بـ STA وإعادة إرسال
رسائل مسجلة (Replay).
:::

::: kp
**Weak Encryption Design (RC4)**استخدام RC4 في المصادقة لتشفير التحدي
العشوائي --- RC4 ضعيف خاصة عند إعادة استخدام المفاتيح أو IVs.
:::

::: kp
**STA can be impersonated**المهاجم يتنصت على رسائل المصادقة، يحصل على
plaintext و ciphertext، ويستخدم أدوات مثل aircrack-ng لاستخراج المفتاح،
أو يعيد إرسال استجابة مسجلة (Replay Attack).
:::

::: kp
**Message manipulation despite ICV**CRC32 ليست خوارزمية تحقق قوية من
النزاهة --- صُممت لاكتشاف أخطاء النقل فقط، وليس لحماية من هجمات متعمدة
(Bit-flipping attack).
:::

::: kp
**IV space too small → IV reuse**حجم IV هو 24 بت فقط = 2²⁴ قيمة ممكنة،
ما يعني إعادة استخدام سريعة للـ IV.
:::
:::
:::

::: card
### [🧮]{.ic} مثال عملي على ازدحام الشبكة (استنفاد IV)

::: {.box .box-warn}
**في خوارزمية RC4 يجب عدم استخدام نفس (IV + K) مرتين إطلاقًا!** إذا تم
تشفير رسالتين مختلفتين بنفس IV والمفتاح، يمكن استخراج الفرق بين النصين
الأصليين:\
`C₁ ⊕ C₂ = P₁ ⊕ P₂`{style="direction:ltr;display:inline-block;margin-top:6px;"}\
ومع عدد كافٍ من هذه الأزواج، يمكن للمهاجم استخراج النصوص الأصلية أو حتى
المفتاح السري نفسه (كما يحدث في هجوم FMS الشهير).
:::

نقطة وصول (AP) مشغولة بسرعة **11 Mbps** يمكنها إرسال حوالي **700
حزمة/ثانية**.

::: def-box
::: ar
إذًا كل القيم الممكنة للـ IV (2²⁴ = 16,777,216) يمكن استنفادها في:\
**16,777,216 / 700 ≈ 6.7 ساعات فقط!**
:::
:::
:::

::: attack-card
### ⚡ هجوم FMS [FMS Attack]{style="font-size:0.85rem;color:var(--ink-500);font-weight:400;"}

**FMS** اختصار لأسماء الباحثين الثلاثة (Fluhrer, Mantin, Shamir)، قدّموا
في عام 2001 هجومًا يُظهر ثغرة في خوارزمية RC4 كما تُستخدم في WEP.

::: timeline
::: tl-item
المهاجم يلتقط الكثير من حزم WEP المشفرة، مع التركيز على الحزم التي تبدأ
بـ IV معروف يُطلق عليه **weak IV**.
:::

::: tl-item
يُخزّن كل IV مع البايت الأول من الـ ciphertext (مرتبط مباشرة بـ stream
key).
:::

::: tl-item
يحلّل الإحصائيات: ما هو البايت الأول الأكثر تكرارًا مع IV معيّن؟ ويستخرج
احتمالات لتخمين بايتات المفتاح السري.
:::

::: tl-item
بتكرار هذه العملية على عدد كبير من الحزم، يتمكن من استعادة المفتاح السري
كاملاً.
:::
:::

::: {.box .box-danger}
**باستخدام أدوات مثل aircrack-ng** يمكن تنفيذ هذا الهجوم آليًا في بضع
دقائق إلى ساعات (حسب حجم البيانات وسرعة الشبكة).
:::
:::
:::
:::

::: {#wpa .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
8
:::

## معيار WPA و TKIP[Wi-Fi Protected Access & Temporal Key Integrity Protocol]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [📐]{.ic} معيار الأمان 802.11i

تمت المصادقة عليه في يونيو 2004، طُوّر لتعزيز أمان الشبكات اللاسلكية
ومعالجة الثغرات الأمنية في بروتوكول WEP القديم. ينقسم إلى ثلاثة مكونات
رئيسية:

::: {.box .box-info}
**1** **TKIP --- Temporary Key Integrity Protocol** [(بروتوكول سلامة
المفتاح المؤقت)]{.small-muted}

-   **الهدف:** حل مؤقت لتصحيح ثغرات WEP.
-   **التوافق:** يمكن استخدامه مع الأجهزة القديمة (802.11) بعد تحديث
    firmware أو drivers.
-   **الميزات:** خلط المفاتيح لكل حزمة بيانات (Per-packet key mixing)،
    إضافة كود فحص سلامة الرسائل (MIC)، استخدام IV بطول 48 بت.
-   **يوفّر:** Confidentiality (السرية) و Integrity (السلامة).
:::

::: {.box .box-safe}
**2** **AES-CCMP --- AES Counter Mode with CBC-MAC Protocol**

-   **الهدف:** حل طويل المدى يوفّر تشفيرًا قويًا وسلامة للبيانات.
-   **الاحتياج:** يتطلب أجهزة جديدة تدعم تشفير AES.
-   **التركيبة:** Counter Mode لتشفير البيانات + CBC-MAC لضمان سلامة
    البيانات.
-   **يوفّر:** سرية قوية، وسلامة، وحماية ضد إعادة الإرسال (Replay).
:::

::: {.box .box-warn}
**3** **802.1X --- Port-Based Network Access Control** [(التحكم بالوصول
باستخدام المنفذ)]{.small-muted}

-   **الوظيفة:** إدارة عملية المصادقة وتوزيع المفاتيح الديناميكي.
-   **العمل:** يُستخدم مع TKIP أو AES-CCMP.
-   **المكونات:** Supplicant (العميل) --- Authenticator (نقطة الوصول)
    --- Authentication Server (غالبًا RADIUS).
-   **الفائدة:** يسمح فقط للمستخدمين المصرح لهم بالوصول، ويؤمّن تبادل
    المفاتيح.
:::
:::

::: card
### [🔧]{.ic} Changes from WEP to TKIP/WPA [--- التحسينات]{.small-muted}

::: table-wrap
  التحسين / التغيير            الشرح
  ---------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------
  اختيار IV كعداد (Counter)    يُستخدم IV كعداد متزايد لمنع تكرار القيم؛ يمنع هجمات إعادة الإرسال Replay Attack (نقطة الوصول تحتاج فقط تخزين آخر قيمة IV للتحقق من عدم تكرار الحزم)
  زيادة حجم IV                 تم توسيعه من 24 بت إلى 48 بت لتقليل احتمال التكرار
  رمز سلامة الرسائل --- MIC    حماية أقوى من التعديل مقارنة بـ CRC المستخدم في WEP
  خوارزمية خلط المفاتيح        تولّد مفتاحًا جديدًا لكل حزمة تُرسل، مما يصعّب التلاعب بالاتصال
  مفتاح 64 بت لسلامة الرسائل   يُستخدم في خوارزمية **Michael** لضمان التكامل
  نفس خوارزمية التشفير RC4     لا يزال TKIP يستخدم RC4، لكن مع طبقة أمان إضافية مقارنة بـ WEP
:::

💡 ملاحظة: MIC تُختصر Message Integrity Code، وتُسمّى أيضًا خوارزمية
**Michael**.

::: {.box .box-info}
**TKIP Sequence Counter (TSC)** قبل نيسان 2003 لم يكن هناك حماية من
إعادة الإرسال في WEP (المهاجم يعيد إرسال حزم Replay وتُقبل جميعها). بعد
إضافة TSC، تتحقق نقطة الوصول من أن رقم التسلسل أكبر من آخر رقم مقبول،
فترفض أي حزمة بنفس الرقم أو أقل (Replay محظور).
:::
:::

::: card
### [📊]{.ic} نظرة عامة على 802.11i

-   **WPA**: يستخدم TKIP، وكان يُعتبر حلاً مؤقتًا لتحسين أمان WEP باستخدام
    نفس الأجهزة القديمة.
-   **WPA2**: يستخدم AES مع CCMP، ويُعتبر التطبيق الكامل لمعيار 802.11i،
    ويوفّر أمانًا قويًا.

::: {.box .box-danger}
**اآلن** بروتوكول TKIP يُعتبر غير آمن (Security of TKIP is considered
broken) --- لا يُنصح باستخدام TKIP/WPA حاليًا نظرًا لاكتشاف ثغرات أمنية
خطيرة فيه.\
**WPA2 هو الخيار الآمن الموصى به لمعظم التطبيقات الحديثة.**
:::

::: table-wrap
  الاسم الفني        الاسم التجاري (المعتمد من Wi-Fi Alliance)
  ------------------ -------------------------------------------
  TKIP               WPA (Wi-Fi Protected Access)
  RSN / AES (CCMP)   WPA2 (Wi-Fi Protected Access 2)
:::
:::
:::
:::

::: {#wpa2 .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
9
:::

## معيار WPA2 و 802.1X[Wireless Protected Access 2]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [🚪]{.ic} 802.1X --- Port-Based Network Access Control

WPA2 يستخدم **802.1X** كنموذج للتحكم في الوصول (Access Control) بناءً على
\"البورت\" (منفذ الشبكة)، للتحكم في من يدخل الشبكة. المنفذ يبقى مغلقًا
(غير مسموح بمرور البيانات) إلى أن يتم التحقق من هوية الجهاز.

::: grid-3
::: {.box .box-info}
**Supplicant (STA)** العميل --- الجهاز الذي يريد الدخول للشبكة (هاتف،
لابتوب). يُشغّل خدمة تتعامل مع 802.1X ويُرسل معلومات التوثيق (اسم
مستخدم/كلمة مرور، أو شهادة رقمية).
:::

::: {.box .box-warn}
**Authenticator (AP)** نقطة الوصول أو السويتش --- الوسيط الذي يربط بين
العميل وخادم التوثيق. لا يملك معلومات التوثيق نفسها، بل فقط يُمررها،
ويمنع وصول الجهاز للشبكة حتى نجاح التوثيق.
:::

::: {.box .box-safe}
**Authentication Server** خادم التوثيق --- غالبًا يكون خادم **RADIUS**.
هو من يتحقق من بيانات العميل (Supplicant) ويُقرر قبول أو رفض الطلب.
:::
:::
:::

::: card
### [🔁]{.ic} خطوات عمل 802.1X

::: timeline
::: tl-item
::: tl-title
1\. الاتصال الأولي
:::

الجهاز (Supplicant) يتصل بنقطة الوصول (Authenticator=AP)، لكن لا يُمنح
بعد الوصول الكامل للشبكة.
:::

::: tl-item
::: tl-title
2\. بدء التوثيق (EAP)
:::

الـ Authenticator يرسل طلب توثيق باستخدام بروتوكول EAP. Supplicant يرد
بمعلومات الهوية، وتُمرَّر إلى خادم التوثيق (AS) عبر بروتوكول RADIUS.
:::

::: tl-item
::: tl-title
3\. التحقق
:::

Authentication Server يتحقق من البيانات، وقد يطلب المزيد من الخطوات حسب
نوع EAP المستخدم.
:::

::: tl-item
::: tl-title
4\. نجاح التوثيق
:::

إذا تمت المصادقة بنجاح، تُرسل رسالة نجاح إلى Authenticator، ويُمنح الجهاز
حق الوصول للشبكة.
:::

::: tl-item
::: tl-title
5\. تبادل مفتاح التشفير
:::

يتم تبادل Session Key بين Supplicant و AP، ويُستخدم لاحقًا لتشفير البيانات
باستخدام CCMP/AES.
:::
:::
:::

::: card
### [📦]{.ic} EAP Encapsulation in 802.1X and WLAN [--- تغليف EAP]{.small-muted}

عند اتصال جهاز بشبكة Wi-Fi مؤمنة بـ WPA2-Enterprise (تعتمد على 802.1X)،
تُستخدم رسائل EAP لكنها لا تنتقل وحدها --- بل تُغلَّف داخل بروتوكولات أخرى:

::: flow
::: fstep
**EAPOL**\
[EAP over LAN --- بين STA و AP
(لاسلكي)]{style="font-weight:400;font-size:0.78rem;"}
:::

::: arrow
→
:::

::: fstep
**EAP encapsulated in RADIUS**\
[من AP إلى خادم التوثيق
(سلكي)]{style="font-weight:400;font-size:0.78rem;"}
:::
:::

::: {.box .box-info}
**دور نقطة الوصول AP** لا تقرأ الرسائل ولا تتحقق من صحتها --- هي فقط
تُنقل الرسالة من الجهاز إلى الخادم، تمامًا كـ \"ساعي بريد\" ينقل الرسائل
دون أن يفتحها.
:::
:::

::: card
### [🔐]{.ic} إنشاء مفتاح الجلسة المشترك [--- Session Key]{.small-muted}

عند استخدام 802.1X في شبكات Wi-Fi مثل WPA2-Enterprise، لا يقتصر الأمر
على التوثيق فقط، بل يتم أيضًا إنشاء مفتاح جلسة مشترك (Session Key) بين
الجهاز ونقطة الوصول لتشفير البيانات.

::: timeline
::: tl-item
الجهاز (Supplicant) يتصل بنقطة الوصول (AP) ويبدأ التوثيق باستخدام EAP.
:::

::: tl-item
يتم التوثيق مع خادم التوثيق (Authentication Server) مثل RADIUS.
:::

::: tl-item
عند نجاح التوثيق: يُشتق مفتاح رئيسي (Master Key) في كل من الجهاز والخادم،
ويُشتق من هذا المفتاح ما يُسمى بـ Session Key.
:::

::: tl-item
خادم التوثيق يرسل مفتاح الجلسة إلى الـ AP عبر قناة آمنة (عادة باستخدام
RADIUS)، بحيث يصبح لدى الجهاز والـ AP نفس المفتاح السري، ويُستخدم لاحقًا
لتشفير الاتصال باستخدام AES/CCMP.
:::
:::

::: {.box .box-warn}
**ملاحظة مهمة** لكي يستطيع خادم التوثيق إرسال المفتاح بأمان إلى الـ AP،
يجب أن يكون بينهما مفتاح مشترك مسبقًا (**Shared Secret**) تم إعداده يدويًا
مسبقًا.
:::
:::

::: card
### [🔒]{.ic} التشفير والسلامة [--- AES Counter Mode with CBC-MAC (CCMP)]{.small-muted}

-   WPA2 يعتمد على **AES** لتشفير البيانات، وهو معيار تشفير قوي وآمن.
-   يستخدم وضع التشفير **Counter Mode with CBC-MAC Protocol (CCMP)**.
-   **CTR Mode** يوفر تشفيرًا قويًا وعالي الأداء عن طريق تحويل كتلة
    البيانات إلى تيار مشفر.
-   **CBC-MAC** يضمن سلامة البيانات (Integrity) --- التأكد من أن
    البيانات لم تُعدَّل أثناء النقل.

::: {.box .box-safe}
هذا الأسلوب يجعل البيانات محمية من التنصت (Confidentiality) ومن التلاعب
(Integrity).
:::
:::
:::
:::

::: {#eap .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
10
:::

## بروتوكولات EAP[LEAP, EAP-TLS, PEAP, EAP-SIM]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [✉️]{.ic} أنواع رسائل EAP

-   [EAP Request (طلب)]{.term-en}[يرسلها الخادم يطلب من الجهاز معلومات
    (مثل الاسم، كلمة المرور، الشهادة)]{.term-ar}
-   [EAP Response (رد)]{.term-en}[يرسلها الجهاز يرد على الطلب (يرسل
    الاسم أو كلمة المرور أو شهادة\...)]{.term-ar}
-   [EAP Success (نجاح)]{.term-en}[يرسلها الخادم وتعني أن التوثيق نجح،
    ويمكن للجهاز دخول الشبكة]{.term-ar}
-   [EAP Failure (فشل)]{.term-en}[يرسلها الخادم وتعني أن التوثيق فشل، لا
    يُسمح بالدخول]{.term-ar}

::: {.box .box-info}
**أمثلة على بروتوكولات التوثيق المدعومة من EAP** EAP فقط يحدد شكل
الرسائل، والتوثيق الفعلي يتم حسب نوع EAP المستخدم:

-   **EAP-TLS** --- يستخدم شهادات رقمية (أمان عالٍ)
-   **PEAP** --- يستخدم اسم مستخدم وكلمة مرور داخل نفق مشفر
-   **EAP-SIM** --- يستخدم شريحة الهاتف (SIM) للتوثيق
:::
:::

::: card
### [📜]{.ic} EAP-TLS [(TLS over EAP)]{.small-muted}

::: def-box
::: en
EAP-TLS is an authentication protocol that relies on a Digital
Certificate.
:::

::: ar
TLS-EAP هو بروتوكول للتحقق من الهوية (Authentication) يعتمد على شهادة
رقمية (Digital Certificate).
:::
:::

يُستخدم بشكل واسع في الشبكات اللاسلكية (مثل Enterprise Wi-Fi) لضمان اتصال
آمن بين العميل والخادم، ويعتمد على TLS (Transport Layer Security) لتأمين
التبادل.

### [🔁]{.ic} الرسائل المتبادلة الأساسية في EAP-TLS {#الرسائل-المتبادلة-الأساسية-في-eap-tls style="margin-top:20px;"}

::: timeline
::: tl-item
::: tl-title
1\. EAP Request/Identity
:::

الخادم يرسل طلب الهوية، والعميل يرد بإرسال هويته (مثل اسم المستخدم).
:::

::: tl-item
::: tl-title
2\. TLS Handshake Messages
:::

**ClientHello** --- العميل يرسل قائمة بروتوكولات التشفير المدعومة +
بيانات عشوائية.

**ServerHello** --- الخادم يختار بروتوكول التشفير المناسب + بيانات
عشوائية.

**Server Certificate** --- الخادم يرسل شهادته الرقمية لضمان هويته.

**Server Key Exchange** (اختياري) --- بيانات مفتاحية إضافية.

**Certificate Request** (اختياري) --- طلب من العميل إرسال شهادته
(للتوثيق المتبادل).

**ServerHelloDone** --- يخبر الخادم العميل بانتهاء رسائله.
:::

::: tl-item
::: tl-title
3\. Client Certificate
:::

العميل يرسل شهادته الرقمية للخادم (لتوثيق العميل).
:::

::: tl-item
::: tl-title
4\. Client Key Exchange
:::

العميل يرسل المفتاح العام المشفّر أو بيانات تساعد على إنشاء المفتاح السري
المشترك.
:::

::: tl-item
::: tl-title
5\. Certificate Verify
:::

العميل يثبت أنه يملك المفتاح الخاص لشهادته عبر توقيع رقمي.
:::

::: tl-item
::: tl-title
6\. ChangeCipherSpec (Client)
:::

العميل يخبر أنه سيبدأ باستخدام إعدادات التشفير الجديدة.
:::

::: tl-item
::: tl-title
7\. Finished (Client)
:::

العميل يرسل رسالة مشفرة تؤكد إتمام التفاوض.
:::

::: tl-item
::: tl-title
8\. ChangeCipherSpec (Server)
:::

الخادم يخبر العميل أنه سيبدأ باستخدام إعدادات التشفير الجديدة.
:::

::: tl-item
::: tl-title
9\. Finished (Server)
:::

الخادم يرسل رسالة مشفرة تؤكد إتمام التفاوض.
:::
:::

::: {.box .box-safe}
**بعد إتمام هذه الخطوات** ✔ الجلسة الآمنة تم إنشاؤها  \|  ✔ تبادل بيانات
مشفر وآمن  \|  ✔ تم التحقق من هوية الطرفين عبر الشهادات الرقمية.
:::
:::

::: card
### [🛡️]{.ic} PEAP [(Protected EAP)]{.small-muted}

امتداد لبروتوكول EAP يهدف لحماية تبادل معلومات المصادقة عبر قناة مشفرة،
على مرحلتين:

::: grid-2
::: {.box .box-info}
**المرحلة 1** TLS Handshake بدون مصادقة العميل

يتم فقط إنشاء قناة TLS آمنة بين العميل والخادم. المصادقة تعتمد فقط على
شهادة الخادم (Server Certificate) --- العميل يتحقق منها ويتأكد من هوية
الخادم. لا تُرسل شهادة العميل أو بيانات مصادقة في هذه المرحلة. **الهدف:**
بناء نفق TLS مشفر لحماية المرحلة التالية.
:::

::: {.box .box-safe}
**المرحلة 2** مصادقة العميل داخل القناة الآمنة

تُنقل عملية مصادقة العميل داخل القناة المشفرة. طرق ممكنة: EAP-MSCHAPv2
(كلمات مرور)، EAP-TLS (شهادات رقمية)، أو غيرها. جميع البيانات الحساسة
محمية داخل القناة --- يحمي من التنصت وهجمات MITM.
:::
:::
:::
:::
:::

::: {#compareall .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
11
:::

## مقارنات شاملة (الأهم للامتحان)[Full Comparison Tables]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [⭐]{.ic} مقارنة WEP و TKIP(WPA) و CCMP(WPA2)

::: table-wrap
  الميزة                          WEP                   TKIP (WPA)                      CCMP (WPA2)
  ------------------------------- --------------------- ------------------------------- ------------------------------------
  سنة التقديم                     1997                  2003                            2004
  مستوى الأمان                    ضعيف                  متوسط                           قوي
  نوع التشفير                     RC4                   RC4                             AES (Advanced Encryption Standard)
  سلامة البيانات Integrity        ضعيف --- CRC-32       MIC (Message Integrity Check)   قوي --- CBC-MAC
  طول IV (المتجه الابتدائي)       24 بت                 48 بت                           48 بت
  مفتاح التشفير                   ثابت --- Static Key   متغير لكل حزمة --- Per-packet   متغير لكل جلسة --- Per-session
  دعم الأجهزة القديمة             نعم                   نعم (مع تحديثات firmware)       لا (يتطلب أجهزة تدعم AES)
  إدارة المفاتيح                  يدوي                  ديناميكي (مع 802.1X)            ديناميكي (مع 802.1X)
  حماية من إعادة الإرسال Replay   لا                    نعم                             نعم
:::
:::

::: card
### [🏷️]{.ic} التسمية الفنية مقابل التجارية

::: table-wrap
  الاسم الفني        الاسم التجاري (Wi-Fi Alliance)
  ------------------ --------------------------------
  TKIP               WPA
  RSN / AES (CCMP)   WPA2
:::
:::

::: card
### [🎯]{.ic} مقارنة أنماط عمل 802.11

::: table-wrap
  المعيار                   Infrastructure Mode          Ad Hoc Mode
  ------------------------- ---------------------------- --------------------------------
  وجود Access Point         موجود                        غير موجود
  الاتصال                   عبر AP إلى DS                مباشر بين الأجهزة (STA-to-STA)
  الاسم المستخدم للمجموعة   BSS / ESS                    IBSS
  الاستخدام الشائع          الشبكات المنزلية والمؤسسية   الشبكات المؤقتة أو الصغيرة
:::
:::

::: card
### [🧷]{.ic} مقارنة إخفاء SSID مقابل MAC Filtering

::: table-wrap
  الطريقة         فعالية الحماية   سهولة التجاوز
  --------------- ---------------- ----------------------------------------------
  Hide SSID       شكلية فقط        سهلة عبر Monitor Mode أو إجبار إعادة الاتصال
  MAC Filtering   شكلية فقط        سهلة عبر انتحال (Spoof) عنوان MAC
:::

::: {.box .box-safe}
**التوصية** استخدام WPA2/WPA3 مع كلمات مرور قوية بدلاً من الاعتماد على
هاتين الطريقتين.
:::
:::

::: card
### [💥]{.ic} مقارنة أشهر الهجمات على WLAN

::: table-wrap
  الهجوم              السبب الجذري                  الحماية
  ------------------- ----------------------------- ------------------------------------------------
  Rogue AP            غياب Mutual Authentication    مصادقة متبادلة + تشفير قوي
  Session Hijacking   غياب Encryption               تفعيل التشفير (WPA2/AES)
  War Driving         شبكات مفتوحة/غير محمية        تشفير الشبكة + إخفاء غير معتمد وحده
  Denial of Service   عدم حماية Management Frames   802.11w (حماية إطارات الإدارة) + مراقبة الشبكة
  FMS Attack (WEP)    ضعف RC4 وصغر IV               استخدام AES/CCMP بدلاً من WEP
:::
:::
:::
:::

::: {#quiz .section .section}
::: {.section-head onclick="toggleSection(this)"}
::: section-num
12
:::

## أهم النقاط للحفظ السريع[Key Exam Takeaways]{.sub-en}

::: chevron
▾
:::
:::

::: section-body
::: card
### [🧠]{.ic} خلاصة سريعة --- تسلسل تطور الحماية

::: flow
::: fstep
WEP\
[1997 --- RC4 ضعيف]{style="font-weight:400;font-size:0.78rem;"}
:::

::: arrow
→
:::

::: fstep
TKIP / WPA\
[2003 --- حل مؤقت]{style="font-weight:400;font-size:0.78rem;"}
:::

::: arrow
→
:::

::: fstep
AES-CCMP / WPA2\
[2004 --- حل دائم قوي]{style="font-weight:400;font-size:0.78rem;"}
:::
:::
:::

::: card
### [✅]{.ic} نقاط يجب تذكّرها قبل الامتحان

::: keypoints
::: kp
**3 مكونات لشبكة WLAN**STA --- AP --- AS، وهي أساس أي سؤال عن البنية.
:::

::: kp
**نمطا العمل**Infrastructure (يوجد AP) مقابل Ad Hoc (لا يوجد AP، اتصال
مباشر STA-STA)
:::

::: kp
**4 مراحل الاتصال**Discovery (Beacon/Probe) → Authentication →
Association → Disassociation
:::

::: kp
**WEP يستخدم RC4 + CRC32**كلاهما ضعيف --- هذا سبب انهيار WEP بالكامل.
:::

::: kp
**IV في WEP = 24 بت فقط**سبب مباشر لهجوم FMS وتكرار المفاتيح.
:::

::: kp
**TKIP يبقي RC4**لكنه يضيف MIC (Michael) وIV أطول (48 بت) وTSC لمنع
Replay.
:::

::: kp
**WPA2 = AES + CCMP**هو المعيار الفعلي القوي والموصى به حاليًا.
:::

::: kp
**802.1X = 3 أطراف**Supplicant (العميل) --- Authenticator (AP) ---
Authentication Server (RADIUS)
:::

::: kp
**EAPOL vs RADIUS**EAPOL بين STA و AP (لاسلكي)، وEAP-in-RADIUS بين AP
وAS (سلكي)
:::

::: kp
**AP لا يقرأ رسائل EAP**هو فقط \"ساعي بريد\" ينقل الرسائل بين الطرفين.
:::

::: kp
**EAP-TLS يعتمد شهادات**بينما PEAP يبني نفق TLS أولاً ثم يصادق العميل
داخله (يمكن بكلمة مرور).
:::

::: kp
**Hide SSID / MAC Filtering**حماية شكلية فقط ويمكن تجاوزها بسهولة ---
ليست بديلاً عن التشفير الحقيقي.
:::
:::
:::

::: card
### [❓]{.ic} أسئلة مراجعة ذاتية سريعة

::: timeline
::: tl-item
**س:** لماذا تُعتبر WLAN أكثر عرضة للتهديدات من الشبكات السلكية؟\
**ج:** لأن البيانات تنتقل عبر الهواء (الوسط اللاسلكي المفتوح)، ما يسهّل
اعتراضها.
:::

::: tl-item
**س:** ما الفرق بين Deauthentication و Disassociation؟\
**ج:** Deauthentication تُلغي المصادقة بالكامل (تنهي الجلسة الأمنية)،
بينما Disassociation تقطع الاتصال فقط ويمكن إعادة التوثيق لاحقًا.
:::

::: tl-item
**س:** لماذا فشل WEP في تحقيق Integrity؟\
**ج:** لأن CRC32 خوارزمية تحقق من أخطاء النقل فقط، وليست تصميمًا أمنيًا،
ويمكن للمهاجم تعديل الرسالة وICV معًا (bit-flipping).
:::

::: tl-item
**س:** ما الفرق بين WPA-Personal وWPA-Enterprise من حيث المصادقة؟\
**ج:** Enterprise تعتمد على 802.1X وخادم RADIUS للمصادقة الفردية، بينما
الأنظمة البسيطة (Personal/المنزلية) تعتمد على مفتاح مشترك (Shared Key)
بدون خادم AS منفصل.
:::

::: tl-item
**س:** من يتحقق من هوية الخادم في المرحلة الأولى من PEAP؟\
**ج:** العميل يتحقق من شهادة الخادم (Server Certificate) فقط، والعميل لا
يُرسل شهادته في هذه المرحلة.
:::
:::
:::
:::
:::
:::

::: footer-note
📚 ملخص تفاعلي لمراجعة محاضرة **WLAN Security** --- Computer Networks
Security --- Dr. Manal Alomar --- جامعة حمص\
تم إعداده لأغراض المراجعة السريعة فقط، بالاعتماد الكامل على محتوى
المحاضرة المرفوعة.
:::

::: {#backTop onclick="window.scrollTo({top:0,behavior:'smooth'})"}
↑
:::
