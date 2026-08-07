::: {#progress-bar}
:::

::: top
::: hero-wrap
::: hero-eyebrow
[]{.dot} CNS --- Computer Networks Security · جامعة حمص
:::

# مراجعة نهائية --- الشبكات الخاصة الافتراضية [Virtual Private Networks (VPN) --- Lecture 4]{.eng-big} {#مراجعة-نهائية-الشبكات-الخاصة-الافتراضية-virtual-private-networks-vpn-lecture-4 .hero-title}

ملخص شامل ومركّز لمحاضرة الدكتورة منال علوّار حول VPN: التعريف،
البروتوكولات، البنى المعمارية، الأنفاق (Tunneling)، وبروتوكولات
المصادقة. مُصمَّم للمراجعة السريعة قبل الامتحان.

::: hero-meta
[👩‍🏫 Dr. Manal Alomar]{.hero-chip} [📄 Lecture 4 · VPNs]{.hero-chip} [🎓
السنة الخامسة 2025/2026]{.hero-chip}
:::
:::

::: search-box
[🔍]{.icon} []{#searchCount}
:::
:::

::: {#navScroll .nav-scroll}
[تعريف VPN](#s1) [البروتوكولات](#s2) [الوظائف الأمنية](#s3) [مخاطر
النشر](#s4) [البنى المعمارية](#s5) [نماذج النشر](#s6) [Tunneling](#s7)
[GRE](#s8) [PPP](#s9) [المصادقة](#s10) [PPTP](#s11) [L2TP](#s12) [جدول
مقارن شامل](#s13) [بطاقات مراجعة سريعة](#s14)
:::

::: {#mainContent role="main"}
::: {#s1 .section .block}
::: sec-head
::: sec-num
01
:::

## تعريف VPN[VPN Definition]{.eng} {#تعريف-vpnvpn-definition .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
::: def-box
[DEFINITION · التعريف]{.label}

الشبكات الخاصة الافتراضية **VPN** هي تقنية لربط مجموعة من العقد المتصلة
بشبكة عامة، بحيث يتم نقل البيانات بينها وكأنه يوجد [شبكة مستقلة
وخاصة]{.mark .hl}، لكنها في الحقيقة **افتراضية** (غير موجودة فيزيائيًا).

تُبنى الـ VPN **فوق شبكات مادية قائمة** مسبقًا (مثل الإنترنت)، وتهدف
لتوفير آلية اتصال آمنة لتبادل البيانات بين شبكات مختلفة أو عقد متعددة.
:::

::: {.box .exam}
::: htitle
لماذا تُستخدم VPN بدلاً من الخطوط المخصصة؟
:::

لأنها تنقل البيانات الحساسة بأمان عبر شبكات عامة موجودة أصلًا
(كالإنترنت)، مما يجعلها **أقل تكلفة** مقارنة بالبدائل التقليدية مثل خطوط
الاتصالات الخاصة المخصصة بين المؤسسات أو الفروع.
:::

مثال توضيحي (Packet Tracer): شبكتان محليتان [192.168.1.0/24]{.mono} و
[192.168.3.0/24]{.mono} مرتبطتان عبر موجهات (Routers) وربط WAN، بحيث
يبدو الاتصال بينهما كشبكة داخلية واحدة رغم مرور البيانات عبر شبكة وسيطة.
:::
:::

::: {#s2 .section .block}
::: sec-head
::: sec-num
02
:::

## أهم بروتوكولات VPN[Key VPN Protocols]{.eng} {#أهم-بروتوكولات-vpnkey-vpn-protocols .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
تستخدم شبكات VPN بروتوكولات مختلفة حسب الحاجة للسرعة أو الأمان. هذا
القسم هو الأكثر أهمية للامتحان --- ركّز على المزايا والعيوب لكل بروتوكول.

::: card-grid
::: pcard
[Open Source]{.tag .good}

##### 🔓 OpenVPN

بروتوكول VPN افتراضي خاص **مفتوح المصدر**، يُستخدم لإنشاء نفق آمن ومشفر
لنقل البيانات عبر الإنترنت. يعتمد على مكتبة `OpenSSL` للتشفير (غالبًا
`AES-256`).

يدعم الاتصال `Host-to-Host` أو `Site-to-Site`، ومتوافق مع كل أنظمة
التشغيل.

-   أمان فائق (تشفير قوي جدًا)
-   مفتوح المصدر --- قابل للتدقيق
-   مرونة عالية --- يتجاوز جدران الحماية عبر `TCP` أو `UDP`
-   دعم واسع على كل الأنظمة

**السلبيات:** إعداده معقد للمبتدئين، وأبطأ نسبيًا من `WireGuard`.
:::

::: pcard
[Network Layer]{.tag .good}

##### 🔐 IPsec / IKEv2

يستخدم حزمة بروتوكولات `IPsec` لتأمين البيانات عبر شبكة عامة. يعمل في
**طبقة الشبكة (Network Layer)**، ويشفر كل حزم البيانات بين جهازين أو
شبكتين.

سرعة عالية وقدرة ممتازة على إعادة الاتصال عند تغيير الشبكة (مثل الانتقال
من Wi-Fi لبيانات الجوال).

**الاستخدامات:**

-   ربط الفروع (Site-to-Site)
-   الوصول عن بعد (Remote Access)
-   تأمين الشبكات السحابية

**العيوب:** قد يتطلب أجهزة متخصصة (جدران حماية/روترات) في كلا الطرفين،
على عكس SSL VPN.
:::

::: pcard
[Modern & Fast]{.tag .good}

##### ⚡ WireGuard

بروتوكول **حديث ومفتوح المصدر**، يهدف لأن يكون أسرع وأبسط وأكثر أمانًا من
IPsec و OpenVPN.

-   **سرعة وأداء عالٍ:** خفيف جدًا، يعمل داخل نواة (Kernel) نظام التشغيل
-   **بساطة التصميم:** \~4000 سطر كود فقط (مقارنة بمئات الآلاف)
-   **تشفير حديث:** `ChaCha20` و `Curve25519`
-   **سهولة الإعداد:** مفاتيح بسيطة بدل الشهادات الرقمية المعقدة
:::

::: pcard
[Stable]{.tag .mid}

##### 🧩 L2TP/IPsec

دمج بين بروتوكول `L2TP` (الذي ينشئ النفق) مع `IPsec` (الذي يوفر
التشفير). بروتوكول مستقر ومدعوم على معظم الأجهزة.

**المزايا:** توافق عالٍ افتراضي (Windows, macOS, iOS, Android) --- لا
حاجة لبرامج إضافية غالبًا. أمان قوي.

**العيوب:**

-   أبطأ قليلًا بسبب **Double Encapsulation** (تغليف مزدوج)
-   سهل الحجب لاعتماده على منافذ (Ports) محددة
:::

::: pcard
[Obsolete / Insecure]{.tag .bad}

##### ⚠️ PPTP

[Point-to-Point Tunneling Protocol]{.eng} --- من أقدم وأبسط بروتوكولات
VPN، طورته Microsoft في التسعينيات.

**الميزة الوحيدة:** سريع وسهل الإعداد.

**العيوب (مهم جدًا للامتحان):**

-   **ضعف أمني شديد:** ثغرات معروفة تسمح بفك التشفير خلال ساعات قليلة
-   **سهل الحجب:** يستخدم منفذ محدد `Port 1723`
-   **عدم دعم الأنظمة الحديثة:** Apple أزالت دعمه من iOS و macOS لأسباب
    أمنية
:::

::: pcard
[Clientless]{.tag .good}

##### 🌐 SSL VPN

اختصار [Secure Sockets Layer VPN]{.eng} --- يعتمد على بروتوكولات التشفير
`SSL` أو `TLS`. يتميز بأنه **\"بدون عميل\" (Clientless)** غالبًا --- يعمل
مباشرة عبر متصفح الويب.

يعمل في **طبقة التطبيقات (Application Layer)** --- عكس IPsec الذي يربط
الجهاز بالشبكة كاملة، يسمح SSL VPN بتحديد تطبيقات معينة فقط.

**المزايا:**

-   سهولة الاستخدام (المتصفح فقط)
-   يتجاوز جدران الحماية عبر منفذ `HTTPS (443)`
-   تحكم دقيق (Granular Access)
-   يدعم `MFA` (مصادقة متعددة العوامل)

**العيوب:** أبطأ من IPsec لنقل البيانات الضخمة، وبعض التطبيقات القديمة
تحتاج Thin Clients.

مستخدم بكثرة في شركات مثل Cisco و Fortinet.
:::
:::

::: {.box .info}
::: htitle
📌 ملخص سريع للمقارنة
:::

الأكثر أمانًا وحداثة: **WireGuard** · الأشمل والأكثر استخدامًا تجاريًا:
**OpenVPN** و **IPsec** · الأسهل للمستخدم العادي: **SSL VPN** · الأضعف
أمنيًا ويجب تجنبه: **PPTP**.
:::
:::
:::

::: {#s3 .section .block}
::: sec-head
::: sec-num
03
:::

## الوظائف الأساسية لـ VPN[Core Security Functions]{.eng} {#الوظائف-الأساسية-لـ-vpncore-security-functions .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
شبكات VPN المعتمدة على IPsec توفر أربع خدمات أمنية أساسية:

::: flow
::: flow-step
::: flow-num
1
:::

::: flow-content
**Confidentiality** (السرية)

تعتمد على استخدام **التشفير المتماثل (Symmetric Cryptography)** لتشفير
قنوات البيانات والتحكم، نظرًا لكفاءته العالية وانخفاض متطلباته الحسابية
مقارنة بالتشفير غير المتماثل.
:::
:::

::: flow-step
::: flow-num
2
:::

::: flow-content
**Integrity** (السلامة/التكامل)

تتحقق باستخدام **Message Authentication Codes (MAC)**: تُدخَل البيانات مع
مفتاح سري لإنتاج رمز تحقق يُرسل مع الرسالة. يعيد المستقبل حساب الرمز بنفس
المفتاح، وإذا لم تتطابق القيم تُرفض الرسالة كمعدَّلة أو غير سليمة.
:::
:::

::: flow-step
::: flow-num
3
:::

::: flow-content
**Establishment of Shared Secret Keys** (إنشاء مفاتيح سرية مشتركة)

تستخدم شبكات VPN خوارزمية تبادل المفاتيح `Diffie-Hellman` لتوليد مفتاح
سري مشترك بين طرفين **دون نقله عبر الشبكة**، مما يمنع المهاجمين من
الحصول عليه.
:::
:::

::: flow-step
::: flow-num
4
:::

::: flow-content
**Peer Authentication** (مصادقة الأطراف)

تتم عادة باستخدام **Digital Signatures** (التوقيعات الرقمية)، والتي
تعتمد على زوج من المفاتيح: **مفتاح خاص للتوقيع** و **مفتاح عام للتحقق**.
:::
:::
:::

::: {.box .exam}
::: htitle
سؤال شائع: لماذا التشفير المتماثل وليس غير المتماثل للسرية؟
:::

لأن التشفير المتماثل (Symmetric) أكثر **كفاءة** ومتطلباته الحسابية أقل
--- مناسب لتشفير كميات كبيرة من البيانات بسرعة.
:::
:::
:::

::: {#s4 .section .block}
::: sec-head
::: sec-num
04
:::

## مخاطر النشر[Deployment Risks]{.eng} {#مخاطر-النشرdeployment-risks .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
عمليات نشر VPN تتضمن مخاطر أمنية لا يمكن إلغاؤها بالكامل، خصوصًا عند
استخدام الشبكات العامة.

-   **قوة تنفيذ التشفير:** وجود ثغرات في خوارزميات التشفير أو البرمجيات
    التي تطبقها قد يسمح للمهاجمين بفك تشفير حركة البيانات المعترَضة.
-   **تسريب مفاتيح التشفير:** حصول المهاجم على مفتاح تشفير متماثل قد
    يمكّنه من فك تشفير البيانات **الحالية أو السابقة** المسجَّلة.
-   **التوافر (Availability):** نماذج أمن المعلومات تعتمد على ثالوث
    الأمن CIA (سرية، سلامة، توافر). رغم أن VPN يركز على السرية والسلامة،
    إلا أنه [لا يعزز التوافر]{.mark .hl} بشكل مباشر --- بل قد يُقلّله بسبب
    زيادة التعقيد وإضافة مكونات جديدة، مما يزيد احتمالية الأعطال ونقاط
    الفشل.

::: {.box .warn}
::: htitle
نقطة مهمة للامتحان
:::

VPN لا يحسّن الـ **Availability** بل قد يزيده تعقيدًا --- هذه فكرة \"مضادة
للحدس\" (counter-intuitive) يحب الأساتذة اختبارها.
:::
:::
:::

::: {#s5 .section .block}
::: sec-head
::: sec-num
05
:::

## البنى المعمارية الأساسية لـ VPN[Primary VPN Architectures]{.eng} {#البنى-المعمارية-الأساسية-لـ-vpnprimary-vpn-architectures .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
::: arch-card
#### 1️⃣ نموذج بوابة إلى بوابة [(Gateway-to-Gateway)]{.eng}

::: arch-diagram
::: {.node .net}
شبكة A
:::

::: arrow
→
:::

::: {.node .gw}
VPN Gateway
:::

::: arrow
⇄ Internet ⇄
:::

::: {.node .gw}
VPN Gateway
:::

::: arrow
→
:::

::: {.node .net}
شبكة B
:::
:::

يستخدم `IPsec` لتأمين الاتصال بين شبكتين مختلفتين (مثل فرع شركة بالمقر
الرئيسي) من خلال نشر بوابة VPN في كل شبكة. تمر **جميع البيانات** عبر هذا
النفق المشفر بين البوابتين.

قد تكون بوابة الـ VPN جهازًا مخصصًا أو جزءًا من جهاز شبكي مثل جدار ناري أو
موجّه (Router). [أكثر النماذج شيوعًا]{.mark .hl} لبساطته وسهولة إدارته.

-   **الاستخدام:** ربط الفروع، ربط مراكز البيانات (Data Centers)، ربط
    الشبكات المحلية (LANs) عبر الإنترنت.
-   **المميزات:** أجهزة الشبكة خلف البوابة تتصل ببعضها تلقائيًا دون
    الحاجة لبرامج Client على كل جهاز.
-   **طريقة العمل:** بوابة A تشفّر البيانات وترسلها لبوابة B التي تفك
    التشفير، فيبدو الاتصال كشبكة داخلية واحدة.
:::

::: arch-card
#### 2️⃣ نموذج المضيف إلى المضيف [(Host-to-Host)]{.eng}

::: arch-diagram
::: node
Host A
:::

::: arrow
⇄ Internet ⇄
:::

::: node
Host B
:::
:::

اتصال آمن ومشفّر بين **جهازين محددين مباشرة** عبر شبكة غير موثوقة (مثل
الإنترنت)، دون الحاجة لربط شبكتين كاملتين كما في Site-to-Site.

**الهدف:** حماية البيانات المتبادلة بين الجهازين من التنصت أو التعديل أو
الانتحال.

::: {.box .good}
::: htitle
مثال تطبيقي
:::

خادم ويب فيه ثغرة أمنية → تصبح الثغرة أقل عرضة للاستغلال لأنها لا تكون
متاحة إلا لمن يملك بيانات اعتماد VPN. كما يقلل من مخاطر [Port
Scanning]{.eng} وهجمات التخمين على بروتوكولات مثل `SSH`، لأن هذه المنافذ
تصبح غير مرئية من خارج النفق.
:::

يتميز بدرجة أمان عالية لأنه يؤمّن الاتصال مباشرة بين الطرفين دون وسطاء،
ويسمح بحماية تطبيقات أو خدمات محددة فقط بين جهازين.
:::

::: arch-card
#### 3️⃣ نموذج مختلط [(Mesh)]{.eng}

دمج بين [Host-to-Host]{.eng} و [Gateway-to-Gateway]{.eng}، بحيث يمكن
لأجهزة داخل شبكة معينة إنشاء اتصالات IPsec مباشرة مع أجهزة في شبكة أخرى،
مما يوسّع نطاق التشفير ([Mesh-like encryption]{.eng}).

::: {.box .warn}
::: htitle
التشفير المزدوج (Double Encryption)
:::

في هذا السيناريو تُشفّر الحزم مرتين: مرة بين المضيفين عبر
`IPsec (Host-to-Host)`، ومرة أخرى أثناء عبورها بين البوابتين عبر
`Gateway-to-Gateway`. هذا يعزز الأمان لكنه يضيف [عبئًا إضافيًا على
الأداء]{.mark .hl} بسبب زيادة عمليات التشفير وفك التشفير.
:::
:::

::: arch-card
#### 4️⃣ نموذج الوصول عن بُعد [(Remote Access)]{.eng}

::: arch-diagram
::: node
Mobile Device
:::

::: arrow
⇄ Secure Tunnel ⇄
:::

::: {.node .gw}
VPN Gateway
:::

::: arrow
→
:::

::: {.node .net}
موارد المؤسسة
:::
:::

[أكثر أنواع VPN استخدامًا]{.mark .hl}. يهدف لتمكين المستخدم البعيد من
الاتصال بشكل آمن بشبكة مؤسسة عبر الإنترنت. يسمح
للموظفين/الطلاب/الإداريين بالوصول لموارد الشبكة الداخلية وكأنهم داخل
المؤسسة فعليًا، حتى وهم في المنزل أو أثناء السفر.

**آلية العمل:**

::: flow
::: flow-step
::: flow-num
1
:::

::: flow-content
يبدأ المستخدم الاتصال؛ يُنشئ برنامج **VPN Client** جلسة آمنة مع بوابة
VPN.
:::
:::

::: flow-step
::: flow-num
2
:::

::: flow-content
تُشفَّر جميع البيانات المرسلة عبر الإنترنت لحمايتها من التنصت أو الاختراق.
:::
:::

::: flow-step
::: flow-num
3
:::

::: flow-content
بعد نجاح الاتصال، يحصل المستخدم على عنوان `IP داخلي` من شبكة المؤسسة،
فيصبح قادرًا على الوصول للملفات والخوادم والطابعات وقواعد البيانات
الداخلية.
:::
:::
:::

::: {.box .danger}
::: htitle
التحديات
:::

-   الأداء قد يتأثر بعمليات التشفير/فك التشفير.
-   عدد كبير من المستخدمين المتصلين قد يضغط على VPN Gateway.
-   الأجهزة الشخصية غير المؤمّنة قد تشكل خطرًا أمنيًا إذا اتصلت بالشبكة
    الداخلية دون حماية مناسبة.
:::

::: table-wrap
  النوع              الوصف
  ------------------ -----------------------------------------------------------------------------------------------
  Client-Based VPN   يحتاج المستخدم لتثبيت برنامج VPN خاص على جهازه لإدارة الاتصال والتشفير.
  Clientless VPN     يعتمد غالبًا على متصفح الويب وتقنيات `TLS/SSL` للوصول للخدمات الداخلية دون تثبيت برامج إضافية.
:::
:::
:::
:::

::: {#s6 .section .block}
::: sec-head
::: sec-num
06
:::

## تطور نماذج نشر VPN[Evolution of VPN Deployment Models]{.eng} {#تطور-نماذج-نشر-vpnevolution-of-vpn-deployment-models .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
::: card-grid
::: pcard
##### ☁️ VPN السحابي [(Cloud VPN)]{.eng}

توفير خدمات VPN كخدمة `VPNaaS` عبر مزودي الخدمات السحابية
(`AWS, Azure, GCP`).

-   قابلية توسع (Scalability) --- زيادة السعة تلقائيًا مع زيادة
    المستخدمين
-   تقليل النفقات (دفع حسب الاستخدام)
-   لا حاجة لأجهزة VPN تقليدية داخل مقر الشركة
:::

::: pcard
##### 🧠 VPN المعتمد على البرمجيات [(SD-WAN VPN)]{.eng}

دمج أمن VPN مع إدارة الشبكات الذكية.

-   **Traffic Steering**: توجيه ذكي --- اختيار أسرع مسار لحركة المرور
-   إدارة مركزية لشبكة الفروع بالكامل من لوحة تحكم واحدة
-   يحسّن أداء تطبيقات الفيديو والصوت

يُستخدم في الشركات ذات الفروع المتعددة التي تحتاج سرعة وموثوقية عالية.
:::

::: pcard
[حديث ومهم]{.tag .good}

##### 🛡️ الوصول ذو الثقة الصفرية [(ZTNA)]{.eng}

::: {.def-box style="margin:8px 0;padding:10px 14px;"}
\"لا تثق أبدًا، تحقق دائمًا\" --- [\"Never trust, always verify\"]{.eng}
:::

لا يمنح ZTNA وصولًا للشبكة كاملة، بل وصولًا **محدودًا للتطبيق المطلوب فقط**
بعد التحقق من هوية المستخدم، جهازه، وسياق العمل.

-   أمان فائق --- يمنع الحركة الجانبية ([Lateral Movement]{.eng})
    للمخترقين داخل الشبكة
-   وصول مباشر للتطبيقات السحابية دون الحاجة لتفعيل VPN تقليدي يدوي
:::
:::

::: {.box .exam}
::: htitle
الفرق الجوهري بين VPN التقليدي و ZTNA
:::

VPN التقليدي يمنح وصولًا للشبكة كاملة بعد المصادقة، بينما **ZTNA** يمنح
وصولًا محدودًا لتطبيق معين فقط، ويعيد التحقق باستمرار من الهوية والجهاز
وسياق العمل.
:::
:::
:::

::: {#s7 .section .block}
::: sec-head
::: sec-num
07
:::

## بروتوكولات الأنفاق[Tunneling Protocols]{.eng} {#بروتوكولات-الأنفاقtunneling-protocols .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
::: def-box
[DEFINITION · التعريف]{.label}

عند استخدام VPN، لا تُرسل البيانات مباشرة عبر الإنترنت، بل يتم أولًا
تغليفها **(Encapsulation)** داخل حزم جديدة، ثم تُنقل عبر النفق الآمن
للطرف الآخر.

**الـ Tunneling يوفّر \"الممر الافتراضي\"، والـ VPN يضيف الحماية والأمان
لهذا الممر.**
:::

بروتوكولات [Tunneling Protocols]{.eng} تُستخدم لإنشاء \"نفق افتراضي\" عبر
شبكة عامة مثل الإنترنت، بحيث يتم تغليف البيانات داخل حزم أخرى لنقلها
بأمان، أو لتمكين بروتوكولات معينة من العبور عبر شبكات لا تدعمها مباشرة.

::: {.box .info}
::: htitle
Encapsulation / التغليف
:::

تصبح الحزمة الأصلية [Payload]{.eng} داخل حزمة جديدة تحتوي على رؤوس
(Headers) إضافية خاصة بالبروتوكول المستخدم.
:::

**من أشهر بروتوكولات الـ Tunneling:**

::: enum-wrap
::: enum-row
::: enum-idx
1
:::

::: enum-en
PPP (Point-to-Point Protocol)
:::

::: enum-ar
بروتوكول النقطة إلى النقطة
:::
:::

::: enum-row
::: enum-idx
2
:::

::: enum-en
GRE (Generic Routing Encapsulation)
:::

::: enum-ar
التغليف العام للتوجيه
:::
:::

::: enum-row
::: enum-idx
3
:::

::: enum-en
PPTP (Point-to-Point Tunneling Protocol)
:::

::: enum-ar
بروتوكول نفق النقطة إلى النقطة
:::
:::

::: enum-row
::: enum-idx
4
:::

::: enum-en
L2TP (Layer 2 Tunneling Protocol)
:::

::: enum-ar
بروتوكول نفق الطبقة الثانية
:::
:::

::: enum-row
::: enum-idx
5
:::

::: enum-en
IPsec Tunnel Mode
:::

::: enum-ar
وضع النفق في IPsec
:::
:::
:::

### النفق الإجباري مقابل الطوعي[Compulsory vs Voluntary Tunneling]{.eng style="display:block;font-size:13px;color:var(--blue-500);"} {#النفق-الإجباري-مقابل-الطوعيcompulsory-vs-voluntary-tunneling style="color:var(--navy-900);font-size:18px;margin-top:26px;"}

::: table-wrap
  المعيار              Compulsory Tunneling (النفق الإجباري)                                            Voluntary Tunneling (النفق الطوعي)
  -------------------- -------------------------------------------------------------------------------- ---------------------------------------------------------------
  من يُنشئ النفق؟       تلقائيًا من قبل الشبكة، دون تدخل المستخدم                                         جهاز المستخدم (العميل) يدويًا أو تلقائيًا بعد الاتصال بالإنترنت
  المسار               من خادم الدخول للشبكة `NAS`{.eng} إلى خادم VPN، بمجرد اتصال المستخدم بالإنترنت   من جهاز المستخدم مباشرة إلى خادم VPN
  الحاجة لبرنامج VPN   [لا يحتاج]{.minus} --- يُدار من مزود الخدمة أو المؤسسة                            [يحتاج]{.plus} إلى برنامج VPN على الجهاز
  أمثلة برامج          ---                                                                              FortiClient, OpenVPN, Cisco AnyConnect
:::
:::
:::

::: {#s8 .section .block}
::: sec-head
::: sec-num
08
:::

## بروتوكول GRE[Generic Routing Encapsulation]{.eng} {#بروتوكول-gregeneric-routing-encapsulation .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
::: def-box
[DEFINITION]{.label}

في أجهزة `Cisco IOS`، يُستخدم **GRE Tunnel** لإنشاء اتصال افتراضي بين
موجهين عبر شبكة عامة. تعتمد الفكرة على وضع **\"حزمة داخل حزمة\"**
[(Packet inside Packet)]{.eng} حتى يمكن نقل بروتوكولات أو بيانات لا
تدعمها الشبكة الوسيطة مباشرة.
:::

::: {.box .exam}
::: htitle
مثال كلاسيكي (يتكرر في الأسئلة)
:::

شبكتان تستخدمان `IPv6` بينما الاتصال بينهما عبر الإنترنت يعتمد فقط على
`IPv4`. عادةً حزم IPv6 لا يمكنها العبور مباشرة عبر شبكة IPv4، لكن
باستخدام **GRE** يقوم الموجه بتغليف حزم IPv6 داخل حزم IPv4، ثم يرسلها
عبر الإنترنت. عند الوصول للطرف الآخر يُفَك التغليف وتُسترجَع حزمة IPv6
الأصلية.
:::

**آلية العمل:** عند إعداد GRE Tunnel على موجه Cisco، تُنشأ واجهة افتراضية
تُسمى `Tunnel Interface`. تتصرف كأي واجهة شبكة عادية (يمكن إعطاؤها IP
وتشغيل بروتوكولات توجيه عليها). يُحدَّد [Source Address]{.eng} و
[Destination Address]{.eng} للنفق (عناوين IPv4 الحقيقية عبر الإنترنت).

::: flow
::: flow-step
::: flow-num
1
:::

::: flow-content
تصل حزمة لواجهة النفق → يُضاف `GRE Header`
:::
:::

::: flow-step
::: flow-num
2
:::

::: flow-content
يُضاف `IP Header` خارجي (عنواني المصدر والوجهة الحقيقيين للموجهين)
:::
:::

::: flow-step
::: flow-num
3
:::

::: flow-content
تُرسل الحزمة عبر الإنترنت
:::
:::

::: flow-step
::: flow-num
4
:::

::: flow-content
عند الوصول للموجه الآخر: تُزال رؤوس GRE و IP الخارجية، وتُستعاد الحزمة
الأصلية
:::
:::
:::

يمكن تخيل GRE Tunnel كـ [\"أنبوب افتراضي\"]{.mark .hl} بين الموجهين ---
أي بروتوكول أو بيانات تدخل هذا الأنبوب تُغلَّف وتُرسل بأمان منطقي، رغم أن
الشبكة الوسيطة قد لا تدعم هذه البروتوكولات مباشرة.

-   **الميزة الأساسية:** المرونة --- ينقل أنواعًا مختلفة من البروتوكولات
    وليس فقط IP، ويسمح بتمرير بروتوكولات التوجيه الديناميكي بسهولة.
-   **القصور:** لا يوفر التشفير أو الحماية الأمنية، لذا غالبًا يُدمَج مع
    `IPsec` للحصول على `IPsec over GRE` (GRE للتغليف، IPsec للتشفير
    والحماية).

### حقائق سريعة عن GRE {#حقائق-سريعة-عن-gre style="color:var(--navy-900);font-size:17px;margin-top:22px;"}

-   بروتوكول بسيط أنشأته شركة **Cisco** لإنشاء الأنفاق بين الشبكات.
-   يضيف رأس GRE جديد إلى الحزمة الأصلية.
-   مثل IPSec، يُعتبر GRE من [L3 tunneling protocols]{.eng}.
-   على عكس IPSec، يمكن لـ GRE تغليف بروتوكولات التوجيه مثل `OSPF` و
    `EIGRP`.
-   لا يدعم IPSec [(Multicast / Broadcast)]{.eng}، وبالتالي لا يمكنه
    تأمين حزم بروتوكولات التوجيه المعتمِدة على ذلك --- بينما GRE يستطيع.
-   يمتلك ميزات أمان ضعيفة نسبيًا، لكن يمكن تأمينه بتمريره داخل نفق
    IPSec.
-   تم توثيقه في `RFC 1702` و `RFC 2784`.

::: arch-card
#### 🌳 مثال GRE Tunnel --- ربط الفروع

يُستخدم أيضًا في ربط الفروع مع المقر الرئيسي (HQ) لتمرير بروتوكولات
التوجيه الديناميكي مثل `OSPF` أو `EIGRP` أو `RIP` عبر الإنترنت.

::: {.box .info}
::: htitle
لماذا نحتاج GRE هنا تحديدًا؟
:::

بعض بروتوكولات التوجيه تعتمد على رسائل [Multicast]{.eng} أو
[Broadcast]{.eng} لا تعمل بشكل صحيح عبر الإنترنت العام. هنا يأتي دور
GRE، إذ ينشئ وصلة [Point-to-Point]{.eng} افتراضية بين الموجهين، مما يسمح
لبروتوكولات التوجيه بالعمل وكأن الجهازين متصلان مباشرة.
:::

::: arch-diagram
::: node
HQ
:::

::: arrow
--- Tunnel ---
:::

::: {.node .gw}
ISP
:::

::: arrow
--- Tunnel ---
:::

::: node
Branch
:::
:::
:::

### GRE و/أو IPsec --- متى نستخدم أيًّا منهما؟ {#gre-وأو-ipsec-متى-نستخدم-أيا-منهما style="color:var(--navy-900);font-size:17px;margin-top:22px;"}

::: table-wrap
  الخيار        الوصف
  ------------- --------------------------------------------------------------------------------
  GRE وحده      مرن لكن [غير آمن]{.minus}
  IPsec وحده    [آمن]{.plus} لكن لا يدعم بعض البروتوكولات (مثل التوجيه الديناميكي / Multicast)
  IPsec + GRE   [الأفضل]{.plus} في السيناريوهات التي تتطلب توجيه ديناميكي وآمن معًا
:::

منطق القرار: هل الحركة IP فقط؟ إن كانت Unicast فقط → استخدم IPsec VPN
مباشرة. إن كانت تحتاج Multicast/Broadcast (توجيه ديناميكي) → استخدم GRE
Tunnel (وربما مع IPsec لتأمينه).

### تنسيق حزمة GRE[GRE Packet Format]{.eng style="display:block;font-size:12.5px;color:var(--blue-500)"} {#تنسيق-حزمة-gregre-packet-format style="color:var(--navy-900);font-size:17px;margin-top:22px;"}

::: {.arch-diagram style="flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;"}
::: {.node style="background:var(--navy-800);min-width:110px;"}
Tunnel IP Header\
[20 bytes]{.small}
:::

::: {.node style="background:var(--blue-600);min-width:90px;"}
GRE Flags\
[2 bytes]{.small}
:::

::: {.node style="background:var(--blue-500);min-width:90px;"}
Protocol Type\
[2 bytes]{.small}
:::

::: {.node style="background:var(--purple);min-width:90px;"}
IP Header
:::

::: {.node style="background:var(--green);min-width:90px;"}
Transport Header
:::

::: {.node style="background:#555;min-width:70px;"}
Data
:::
:::

-   يضيف GRE رأسًا إضافيًا (Overhead) بحجم **24 بايت** يتضمن: رأس [Tunnel
    IP Header]{.eng} جديد (20 بايت) + رأس GRE نفسه (4 بايت).
-   بعض الخيارات الإضافية في GRE قد تزيد حجم الرأس إلى 12 بايت إضافية
    (أي يصل الإجمالي إلى **36 بايت** في بعض الحالات).
-   تُحدَّد هذه الخيارات باستخدام علامات ([Flags]{.eng}) داخل رأس GRE.
-   حقل [Protocol Type]{.eng} (2 بايت) يخبر المستقبل بنوع البيانات
    المُغلَّفة داخل النفق (مثلًا `0x0800 = IPv4`).

### خيارات رأس GRE[GRE Header Options]{.eng style="display:block;font-size:12.5px;color:var(--blue-500)"} {#خيارات-رأس-gregre-header-options style="color:var(--navy-900);font-size:17px;margin-top:22px;"}

::: table-wrap
  GRE Header Bit   Option                    الوصف
  ---------------- ------------------------- --------------------------------------------------------------------
  0                Checksum Present          يضيف حقل Checksum بحجم 4 بايت بعد حقل Protocol إن كان هذا البت = 1
  2                Key Present               يضيف مفتاح تشفير بحجم 4 بايت بعد حقل Checksum إن كان هذا البت = 1
  3                Sequence Number Present   يضيف حقل ترقيم تسلسلي بحجم 4 بايت بعد حقل Key إن كان هذا البت = 1
  13--15           GRE Version               0 = GRE الأساسي، 1 = يُستخدم في PPTP
:::

::: {.box .info}
::: htitle
Checksum
:::

عادةً ليس ضروريًا في GRE، لأن البروتوكولات العليا (مثل IP أو TCP) توفر
بالفعل آلية للتحقق من صحة البيانات على مستويات أعلى في نموذج OSI.
:::

::: {.box .warn}
::: htitle
🔑 Key Present --- مخاطر مهمة
:::

عند تفعيل هذا الخيار، يُضاف حقل مفتاح اختياري (4 بايت) يُستخدم لـ:

-   **المصادقة:** يتيح مصادقة أساسية بين نقطتي النهاية.
-   **التعريف الفريد:** تحديد أنفاق متعددة بين نفس النقطتين (يشبه وظيفة
    `SPI` في IPsec).

**المخاطر:** المفتاح يُرسل [كنص واضح (Clear-text)]{.mark .hl} --- عرضة
للاعتراض. ولأن GRE لا يملك آلية تشفير مدمجة، هذا يجعل التشفير في GRE غير
شائع الاستخدام لوحده.
:::

::: {.box .info}
::: htitle
Sequence Number
:::

حقل اختياري (4 بايت) لترتيب الحزم عند وصولها، لأن الحزم أحيانًا تصل
بترتيب غير صحيح (تغييرات المسار أو ازدحام الشبكة). **لا يُستخدم كثيرًا**
لأن البروتوكولات العليا مثل `TCP` تقوم أساسًا بهذه الوظيفة.
:::
:::
:::

::: {#s9 .section .block}
::: sec-head
::: sec-num
09
:::

## بروتوكول النقطة إلى النقطة[Point-to-Point Protocol (PPP)]{.eng} {#بروتوكول-النقطة-إلى-النقطةpoint-to-point-protocol-ppp .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
::: def-box
[DEFINITION · RFC 1661/1662]{.label}

**PPP** هو بروتوكول في **طبقة ربط البيانات (Data Link Layer)** يُستخدم
لتغليف حزم IP عبر وصلة مباشرة بين عقدتين (نقطة إلى نقطة). يُستخدم لنقل
حزم البيانات بين جهازين مباشرة، مثل الاتصال بين كمبيوتر ومودم، أو بين
موجهين (Routers).
:::

بروتوكول PPP يُعدّ من البروتوكولات الأساسية في الاتصالات الشبكية، وهو
[الأساس الذي تعتمد عليه بروتوكولات VPN]{.mark .hl} مثل `PPTP` و `L2TP`.
صُمّم أصلًا للعمل مع الاتصالات الهاتفية (Dial-up)، حيث يُغلِّف البيانات داخل
إطارات PPP ثم يرسلها عبر قناة اتصال مباشرة إلى خادم PPP في الطرف الآخر.

::: {.box .exam}
::: htitle
مراحل إنشاء اتصال PPP (سؤال متكرر جدًا)
:::

تمر عملية إنشاء اتصال PPP بأربع مراحل رئيسية (Phases)، ويجب إكمالها
جميعًا بنجاح قبل البدء بنقل بيانات المستخدم:
:::

::: flow
::: flow-step
::: flow-num
1
:::

::: flow-content
**Link Establishment** (إنشاء الرابط)

يُستخدم بروتوكول `LCP (Link Control Protocol)`{.eng} لإنشاء الاتصال بين
الطرفين. يقوم LCP أيضًا بإدارة الاتصال أثناء تشغيله وإنهائه عند الحاجة.
يتم في هذه المرحلة التفاوض حول إعدادات الاتصال مثل أساليب المصادقة،
وخيارات الضغط أو التشفير التي ستُستخدَم لاحقًا.
:::
:::

::: flow-step
::: flow-num
2
:::

::: flow-content
**Authentication** (المصادقة)

بعد إنشاء الرابط، يتم التحقق من هوية المستخدم عبر إرسال بيانات الاعتماد
للطرف الآخر، باستخدام بروتوكولات مثل `PAP` أو `CHAP`. [هذه المرحلة حساسة
جدًا]{.mark .hl} --- أي اعتراض لبيانات الاعتماد قد يؤدي لاختراق الاتصال
والسيطرة عليه.
:::
:::

::: flow-step
::: flow-num
3
:::

::: flow-content
**Network Layer Configuration** (تفعيل بروتوكولات طبقة الشبكة)

يتم تفعيل بروتوكولات التحكم بالشبكة `NCPs`{.eng} لتكوين إعدادات الاتصال
النهائية. مثال: استخدام `IPCP` لتخصيص عنوان IP ديناميكي للعميل. كما يمكن
استخدام `CCP (Compression Control Protocol)`{.eng} لضبط الضغط (MPPC)،
وتفعيل التشفير باستخدام `MPPE`.
:::
:::
:::

::: {.box .info}
::: htitle
بروتوكولات التشفير في PPP
:::

**1. Encryption Control Protocol (ECP)** --- RFC 1968: يُستخدم في مرحلة
تفعيل بروتوكولات طبقة الشبكة. لا يبدأ تبادل حزم ECP إلا بعد اكتمال LCP
بنجاح، وبعد انتهاء عملية المصادقة. يُستخدم للتفاوض على خوارزميات التشفير
(مثل DES أو 3DES).

-   القيمة `0x8053` في حقل البروتوكول ← حزم \"التحكم في التشفير\"
    (التفاوض).
-   القيمة `0x0053` ← تشير أن بيانات هذا الإطار مشفرة بالفعل.

**2. PPP Encryption Algorithms**: خوارزميات التشفير الفعلية (مثل DES).
في تطبيقات مايكروسوفت، تُستخدم
`MPPE (Microsoft Point-to-Point Encryption)`{.eng} والتي تعتمد على
خوارزمية `RC4`.
:::
:::
:::

::: {#s10 .section .block}
::: sec-head
::: sec-num
10
:::

## بروتوكولات مصادقة PPP[PPP Authentication Protocols]{.eng} {#بروتوكولات-مصادقة-pppppp-authentication-protocols .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
ثلاثة بروتوكولات رئيسية للمصادقة --- من أكثر أجزاء المحاضرة أهمية
للامتحان:

::: enum-wrap
::: enum-row
::: enum-idx
1
:::

::: enum-en
Password Authentication Protocol (PAP)
:::

::: enum-ar
بروتوكول مصادقة كلمة المرور
:::
:::

::: enum-row
::: enum-idx
2
:::

::: enum-en
Challenge Handshake Authentication Protocol (CHAP)
:::

::: enum-ar
بروتوكول مصادقة تحدي المصافحة
:::
:::

::: enum-row
::: enum-idx
3
:::

::: enum-en
Extensible Authentication Protocol (EAP)
:::

::: enum-ar
بروتوكول المصادقة الموسّع
:::
:::
:::

::: {.box .good}
::: htitle
الفوائد العامة لبروتوكولات المصادقة (PAP, CHAP, EAP)
:::

-   **تأكيد هوية الطرفين:** منع الدخول غير المصرَّح به.
-   **حماية البيانات:** بعض البروتوكولات توفر تشفيرًا أو حماية لكلمة
    المرور أثناء النقل.
-   **منع الهجمات:** مثل هجمات إعادة التشغيل (Replay Attacks) أو التنصت.
-   **مرونة التوافق:** بروتوكولات مثل EAP تدعم أنواعًا مختلفة من أساليب
    المصادقة (كلمات مرور، شهادات رقمية).
:::

### 🔓 PAP [Password Authentication Protocol]{.eng} {#pap-password-authentication-protocol style="color:var(--navy-900);font-size:18px;margin-top:24px;"}

::: flow
::: flow-step
::: flow-num
1
:::

::: flow-content
جهاز الوصول الشبكي `(NAS)` يطلب اسم المستخدم وكلمة المرور
:::
:::

::: flow-step
::: flow-num
2
:::

::: flow-content
PAP يرسل هذه المعلومات **كما هي، بدون تشفير أو حماية (نص عادي)**
:::
:::
:::

::: {.box .danger}
::: htitle
⚠️ أضعف بروتوكولات المصادقة
:::

PAP يعتبر أقل أمانًا مقارنة ببروتوكولات أخرى، لأنه يمكن اعتراض بيانات
الدخول [بسهولة]{.mark .hl} أثناء النقل (نص واضح / Clear-text).
:::

### 🔐 CHAP [Challenge Handshake Authentication Protocol]{.eng} {#chap-challenge-handshake-authentication-protocol style="color:var(--navy-900);font-size:18px;margin-top:24px;"}

يحقق المصادقة باستخدام طريقة **Challenge-Response** (التحدي والرد):

::: flow
::: flow-step
::: flow-num
1
:::

::: flow-content
**NAS → USER**: يرسل معرّف الجلسة `Session ID` + قيمة عشوائية تُسمى
`Nonce_NAS`
:::
:::

::: flow-step
::: flow-num
2
:::

::: flow-content
**User → NAS**: يرد المستخدم بإرسال اسم المستخدم + قيمة هاش `MD5` محسوبة
على (معرف الجلسة + Nonce_NAS + كلمة المرور)

`User Name, MD5(Session ID, Nonce_NAS, PSWD)`{.eng}
:::
:::

::: flow-step
::: flow-num
3
:::

::: flow-content
عند استلام الرد، يحسب NAS قيمة الهاش بنفس الطريقة ويقارنها بالقيمة
المستلمة. إذا تطابقت القيم → يرسل NAS رسالة **Success** للمستخدم.
:::
:::
:::

::: {.box .good}
::: htitle
لماذا CHAP أفضل من PAP؟
:::

لأن كلمة المرور **لا تُرسل مباشرة**، بل في شكل **هاش مشفَّر (Hash)**، مما
يصعّب اعتراضها أو إعادة استخدامها من قبل مهاجم.
:::

### 🔷 MS-CHAP [Microsoft CHAP]{.eng} {#ms-chap-microsoft-chap style="color:var(--navy-900);font-size:18px;margin-top:24px;"}

بروتوكول Challenge-Response يشبه CHAP إلى حد كبير، لكنه يضيف ميزات
إضافية:

-   إمكانية **تغيير كلمة المرور** خلال عملية المصادقة.
-   تعريف رموز خاصة بالأخطاء [(failure codes)]{.eng} تُرسل في رسالة الفشل
    [(Failure packet)]{.eng} لتوضيح سبب فشل المصادقة.

هذه التحسينات تجعل MS-CHAP أكثر مرونة وتفصيلًا في إدارة المصادقة مقارنة
بـ CHAP.

### 🧩 EAP [Extensible Authentication Protocol]{.eng} {#eap-extensible-authentication-protocol style="color:var(--navy-900);font-size:18px;margin-top:24px;"}

يوفر إطارًا عامًا للمصادقة يدعم العديد من طرق المصادقة المختلفة، مثل:

-   **EAP-MD5 Challenge**: مشابه لبروتوكول CHAP --- يعتمد على تحدي ورد
    باستخدام تجزئة MD5.
-   **EAP-TLS**: يعتمد على شهادات رقمية وبروتوكول TLS لتوفير مصادقة قوية
    وآمنة.

هذا التصميم يجعل EAP [مرنًا جدًا]{.mark .hl} --- يمكن استخدامه مع تقنيات
متعددة حسب متطلبات الأمان ونوع الشبكة.

::: table-wrap
  البروتوكول   طريقة إرسال بيانات الاعتماد                 مستوى الأمان
  ------------ ------------------------------------------- ----------------------------------
  PAP          نص عادي غير مشفر (Clear-text)               [ضعيف جدًا]{.minus}
  CHAP         هاش MD5 (تحدي واستجابة)                     [جيد]{.plus}
  MS-CHAP      هاش + دعم تغيير كلمة المرور ورموز الأخطاء   [جيد ومحسَّن]{.plus}
  EAP          متعدد الطرق (هاش، شهادات رقمية TLS)         [مرن وقوي (خاصة EAP-TLS)]{.plus}
:::
:::
:::

::: {#s11 .section .block}
::: sec-head
::: sec-num
11
:::

## بروتوكول نفق النقطة إلى النقطة[Point to Point Tunneling Protocol (PPTP)]{.eng} {#بروتوكول-نفق-النقطة-إلى-النقطةpoint-to-point-tunneling-protocol-pptp .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
صُمِّم بروتوكول **PPP** أصلًا ليعمل بين كيانات \"مرتبطة بشكل مباشر\"، أي تلك
التي تشترك في اتصال من **الطبقة الثانية (Layer 2)**. الفكرة الأساسية لـ
PPTP هي [توسيع نطاق عمل PPP ليشمل الإنترنت بالكامل]{.mark .hl}.

::: def-box
[DEFINITION]{.label}

PPTP من **أوائل** بروتوكولات الشبكات الخاصة الافتراضية، حيث يعتمد على
`GRE`{.eng} كبروتوكول نقل [(transport protocol)]{.eng} لإنشاء النفق،
والذي يُستخدم بدوره لنقل حزم PPP عبر الشبكة.
:::

-   يستخدم PPTP المنفذ `TCP 1723` لإدارة الاتصال [(Control
    Plane)]{.eng}.
-   في التشفير، يعتمد على آلية
    `MPPE (Microsoft Point-to-Point Encryption)`{.eng} ضمن طبقة PPP،
    والتي تستخدم خوارزمية `RC4` --- أصبحت [مهجورة]{.mark .hl} ---
    بمفاتيح بطول 40 أو 128 بت.
-   يتم تغليف حزم PPP باستخدام بروتوكول `GRE`{.eng}، مما يسمح بنقلها عبر
    شبكات IP، وبالتالي تمكين إنشاء اتصالات VPN عبر الإنترنت.

::: {.arch-diagram style="flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;flex-direction:column;gap:6px;"}
::: {.node style="width:100%;background:var(--navy-800);"}
PPP Packet
:::

::: {.node style="width:100%;background:var(--blue-600);"}
GRE V.2 Header
:::

::: {.node style="width:100%;background:var(--blue-500);"}
IP Header
:::

::: {.node style="width:100%;background:var(--purple);"}
Media Header (e.g. Ethernet MAC header)
:::

::: {.node style="width:100%;background:#555;"}
Physical Layer
:::
:::

::: {.box .danger}
::: htitle
تذكير: عيوب PPTP (راجع القسم 2)
:::

ضعف أمني شديد (فك تشفير خلال ساعات)، سهل الحجب (منفذ 1723 محدد)، وغير
مدعوم في الأنظمة الحديثة (Apple أزالته من iOS وmacOS).
:::
:::
:::

::: {#s12 .section .block}
::: sec-head
::: sec-num
12
:::

## بروتوكول نفق الطبقة الثانية[Layer 2 Tunneling Protocol (L2TP)]{.eng} {#بروتوكول-نفق-الطبقة-الثانيةlayer-2-tunneling-protocol-l2tp .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
::: def-box
[DEFINITION]{.label}

يُستخدم L2TP لإنشاء نفق لتمرير إطارات `PPP` عبر أنواع متعددة من الشبكات:
:::

::: enum-wrap
::: enum-row
::: enum-idx
1
:::

::: enum-en
IP networks
:::

::: enum-ar
شبكات IP
:::
:::

::: enum-row
::: enum-idx
2
:::

::: enum-en
Frame Relay permanent virtual circuits (PVCs)
:::

::: enum-ar
دارات Frame Relay الافتراضية الدائمة
:::
:::

::: enum-row
::: enum-idx
3
:::

::: enum-en
X.25 virtual circuits (VCs)
:::

::: enum-ar
دارات X.25 الافتراضية
:::
:::

::: enum-row
::: enum-idx
4
:::

::: enum-en
ATM VCs
:::

::: enum-ar
دارات ATM الافتراضية
:::
:::
:::

عند استخدام L2TP عبر شبكة IP، تُرسل الإطارات المُغلَّفة بـ L2TP باستخدام
بروتوكول `UDP` على المنفذ `1701`. هذا التغليف يسمح بنقل جلسات PPP عبر
شبكات غير مخصصة للنقل من الطبقة الثانية، مما يجعله [مفيدًا جدًا]{.mark
.hl} في بناء شبكات VPN مرنة وآمنة.

L2TP يُعتبر امتدادًا وتطويرًا لبروتوكول `PPTP`، حيث يعتمد على تغليف حزم PPP
داخل بروتوكول UDP عبر المنفذ 1701 بدلًا من استخدام GRE.

::: {.box .warn}
::: htitle
⚠️ L2TP لا يوفر الأمان بمفرده!
:::

على عكس بعض البروتوكولات الأخرى، **لا يوفر L2TP بحد ذاته خصائص السرية أو
سلامة البيانات**، بل يعتمد على بروتوكول `IPsec` لتحقيق التشفير والحماية
--- غالبًا ما يُستخدَم بالاقتران معه فيما يُعرف بـ `L2TP/IPsec`.

بعض التطبيقات تدعم التشفير على مستوى PPP، مما قد يسبب التباسًا عند تفعيل
IPsec --- إذ يتطلب الأمر تعطيل ما يُسمى **\"تشفير L2TP\"** للسماح لـ
IPsec بتولي مهمة الحماية.
:::

### مكوّنات معمارية L2TP {#مكونات-معمارية-l2tp style="color:var(--navy-900);font-size:18px;margin-top:24px;"}

::: flow
::: flow-step
::: flow-num
1
:::

::: flow-content
**الجهاز النهائي** (غالبًا حاسوب أو لابتوب المستخدم) يقيم اتصال `PPP` مع
خادم يُعرف بـ `LAC (L2TP Access Concentrator)`{.eng} --- مركز وصول L2TP
--- باستخدام الاتصال الهاتفي أو DSL أو غيرها.
:::
:::

::: flow-step
::: flow-num
2
:::

::: flow-content
يقوم **LAC** ببدء جلسة نفق L2TP مع الجهاز البعيد الذي يرغب الجهاز
المبدئي بإنشاء جلسة معه.
:::
:::

::: flow-step
::: flow-num
3
:::

::: flow-content
هذا الجهاز البعيد يُسمى `LNS (L2TP Network Server)`{.eng}. يتم عليه
التحقق من هوية المستخدم [(Authentication)]{.eng}، والتصريح له
[(Authorization)]{.eng}، وتسجيل الأنشطة [(Accounting)]{.eng} --- أي
عمليات `AAA` --- باستخدام قاعدة بيانات محلية أو خادم AAA.
:::
:::
:::

::: {.arch-diagram style="flex-wrap:wrap;"}
::: node
Dial Client (PPP Peer)
:::

::: arrow
→
:::

::: {.node .gw}
LAC
:::

::: arrow
--- L2TP Tunnel ---
:::

::: {.node .gw}
LNS
:::

::: arrow
→
:::

::: {.node .net}
Corporate Network
:::
:::

::: table-wrap
  المصطلح      المعنى الكامل                               الدور
  ------------ ------------------------------------------- ----------------------------------------------------------------------------
  LAC          L2TP Access Concentrator                    يستقبل اتصال PPP من العميل ويبدأ نفق L2TP
  LNS          L2TP Network Server                         الطرف البعيد؛ يقوم بالمصادقة (AAA) وينهي جلسة L2TP
  AAA Server   Authentication, Authorization, Accounting   خادم خارجي (مثل RADIUS/TACACS+) للتحقق من الهوية والصلاحيات وتسجيل الأنشطة
:::
:::
:::

::: {#s13 .section .block}
::: sec-head
::: sec-num
13
:::

## جدول مقارن شامل لكل البروتوكولات[Master Comparison Table]{.eng} {#جدول-مقارن-شامل-لكل-البروتوكولاتmaster-comparison-table .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
::: table-wrap
  البروتوكول    الطبقة / آلية النقل                                 التشفير                             المنفذ          مستوى الأمان
  ------------- --------------------------------------------------- ----------------------------------- --------------- ----------------------------
  PPTP          يستخدم GRE للنقل                                    MPPE (RC4)                          TCP 1723        [ضعيف جدًا (مهجور)]{.minus}
  L2TP/IPsec    UDP للنقل + IPsec للتشفير                           عبر IPsec (تغليف مزدوج)             UDP 1701        [جيد لكن أبطأ]{.plus}
  IPsec/IKEv2   طبقة الشبكة (Network Layer)                         قوي (متعدد الخوارزميات)             ---             [قوي جدًا]{.plus}
  OpenVPN       مفتوح المصدر --- Host/Site                          OpenSSL (AES-256 غالبًا)             TCP/UDP (مرن)   [أمان فائق]{.plus}
  SSL VPN       طبقة التطبيقات (Application Layer) --- Clientless   SSL / TLS                           HTTPS 443       [قوي + MFA]{.plus}
  WireGuard     حديث --- يعمل داخل Kernel                           ChaCha20 / Curve25519               ---             [الأحدث والأسرع]{.plus}
  GRE           L3 Tunneling (بدون أمان)                            [لا يوجد (يُدمج مع IPsec)]{.minus}   ---             [ضعيف لوحده]{.minus}
:::

### خريطة ذهنية سريعة {#خريطة-ذهنية-سريعة style="color:var(--navy-900);font-size:18px;margin-top:26px;"}

::: mind-grid
::: mind-item
Confidentiality[Symmetric Encryption]{.eng}
:::

::: mind-item
Integrity[MAC]{.eng}
:::

::: mind-item
Key Exchange[Diffie-Hellman]{.eng}
:::

::: mind-item
Peer Auth[Digital Signatures]{.eng}
:::

::: mind-item
Gateway-to-Gateway[Site-to-Site]{.eng}
:::

::: mind-item
Host-to-Host[Direct Secure Link]{.eng}
:::

::: mind-item
Remote Access[Client/Clientless]{.eng}
:::

::: mind-item
Zero Trust[ZTNA]{.eng}
:::
:::
:::
:::

::: {#s14 .section .block}
::: sec-head
::: sec-num
14
:::

## بطاقات مراجعة سريعة[Quick Review Flashcards]{.eng} {#بطاقات-مراجعة-سريعةquick-review-flashcards .sec-title}

[▾]{.toggle-ico}
:::

::: sec-body
اضغط على أي بطاقة لعرض الإجابة.

::: {.flash onclick="this.classList.toggle('open')"}
::: q
ما الفرق بين Tunneling والـ VPN؟
:::

::: a
الـ Tunneling يوفر \"الممر الافتراضي\" لنقل البيانات، بينما VPN يضيف
الحماية والأمان (التشفير) لهذا الممر.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
لماذا لا يوفر GRE الأمان بمفرده؟
:::

::: a
لأن GRE لا يحتوي آلية تشفير مدمجة؛ أي مفتاح يُستخدم (Key Present) يُرسل
كنص واضح (Clear-text). لذلك يُدمج غالبًا مع IPsec (IPsec over GRE) للحصول
على التشفير والحماية.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
ما الفرق الجوهري بين PAP و CHAP؟
:::

::: a
PAP يرسل كلمة المرور كنص عادي غير مشفر (خطر أمني كبير)، بينما CHAP يرسل
قيمة هاش MD5 محسوبة من (Session ID + Nonce + Password) بدل كلمة المرور
نفسها --- مما يجعله أكثر أمانًا.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
ما هي المراحل الأربع لإنشاء اتصال PPP؟
:::

::: a
1\) Link Establishment (عبر LCP) 2) Authentication (عبر PAP/CHAP) 3)
Network Layer Configuration (عبر NCPs مثل IPCP) --- ويجب إكمال جميعها
بنجاح قبل نقل بيانات المستخدم.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
لماذا PPTP غير آمن؟
:::

::: a
لأنه يعتمد على تشفير MPPE بخوارزمية RC4 (مهجورة)، وله ثغرات معروفة تسمح
بفك التشفير خلال ساعات قليلة، ويستخدم منفذ ثابت (TCP 1723) يسهل حجبه.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
ما الفرق بين النفق الإجباري والطوعي (Compulsory vs Voluntary Tunneling)؟
:::

::: a
الإجباري: تُنشئه الشبكة تلقائيًا (من NAS إلى خادم VPN) دون تدخل المستخدم
أو حاجة لبرنامج على جهازه. الطوعي: ينشئه جهاز المستخدم نفسه، ويحتاج
لبرنامج VPN مثل FortiClient أو OpenVPN أو Cisco AnyConnect.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
لماذا لا يحسّن VPN التوافر (Availability)؟
:::

::: a
لأن VPN يركز أساسًا على السرية وسلامة البيانات ضمن ثالوث الأمن CIA، لكنه
يضيف تعقيدًا ومكونات جديدة للبنية التحتية، مما قد يزيد من احتمالية
الأعطال ونقاط الفشل بدلًا من تحسين التوافر.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
ما الفرق بين Gateway-to-Gateway و Host-to-Host؟
:::

::: a
Gateway-to-Gateway: يربط شبكتين كاملتين عبر بوابتي VPN، والأجهزة خلف
البوابة تتصل تلقائيًا دون Client. Host-to-Host: اتصال مباشر بين جهازين
محددين فقط (وليس شبكتين كاملتين)، يحمي تطبيقات/خدمات معينة بينهما.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
ما هو مبدأ ZTNA وكيف يختلف عن VPN التقليدي؟
:::

::: a
مبدأ ZTNA: \"لا تثق أبدًا، تحقق دائمًا\". لا يمنح وصولًا للشبكة كاملة كما
يفعل VPN التقليدي، بل وصولًا محدودًا لتطبيق معين فقط بعد التحقق من الهوية
والجهاز وسياق العمل، مما يمنع الحركة الجانبية للمخترقين.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
ما معنى \"التشفير المزدوج\" (Double Encryption) وأين يحدث؟
:::

::: a
يحدث في نموذج Mesh عند دمج Host-to-Host مع Gateway-to-Gateway: تُشفَّر
البيانات مرة بين المضيفين (IPsec Host-to-Host) ومرة أخرى بين البوابتين
(Gateway-to-Gateway)، مما يعزز الأمان لكنه يزيد العبء على الأداء.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
ما وظيفة حقل Protocol Type في رأس GRE؟
:::

::: a
يخبر المستقبل بنوع البيانات المُغلَّفة داخل نفق GRE (حجمه 2 بايت)، ويستخدم
قيمًا قياسية معروفة، مثل 0x0800 للإشارة إلى IPv4.
:::
:::

::: {.flash onclick="this.classList.toggle('open')"}
::: q
لماذا نحتاج L2TP/IPsec بدل L2TP وحده؟
:::

::: a
لأن L2TP لا يوفر بحد ذاته أي خصائص للسرية أو سلامة البيانات --- هو فقط
بروتوكول لإنشاء النفق. لذلك يُدمج مع IPsec الذي يوفر التشفير والحماية
الفعلية.
:::
:::
:::
:::

::: {style="text-align:center;padding:40px 0 10px;color:var(--ink-soft);font-size:13px;"}
📘 مراجعة CNS --- Lecture 4: VPNs · Dr. Manal Alomar · جامعة حمص · حظًا
موفقًا في الامتحان! 🎓
:::
:::

↑
