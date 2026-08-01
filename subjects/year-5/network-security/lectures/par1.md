::: {#progressBar}
:::

::: topbar
::: topbar-inner
::: brand
🛡️ [CN]{.shield} ملخص أمن الشبكات[Network Security --- Firewalls ·
Lecture 1]{.small}
:::

::: searchWrap
:::

[]{#searchCount}

::: tools
فتح الكل ⬇

طي الكل ⬆

🖨️ طباعة
:::
:::
:::

::: layout
::: sidebar-inner
::: navTitle
فهرس المحتويات
:::

-   [1 · أمن الشبكات --- الأساسيات](#s1)
-   [2 · مقدمة الجدار الناري](#s2)
-   [3 · DMZ والاستراتيجيات](#s3)
-   [4 · أنواع الجدران النارية](#s4)
-   [5 · Stateless vs Stateful](#s5)
-   [6 · Netfilter & iptables](#s6)
-   [7 · جداول iptables الثلاثة](#s7)
-   [8 · أوامر وأمثلة iptables](#s8)
-   [9 · ip6tables & arptables](#s9)
-   [10 · ebtables](#s10)
-   [11 · nftables (الجيل الجديد)](#s11)
-   [12 · Application Level Gateway](#s12)
-   [13 · الشهادات العالمية](#s13)

::: examBox
**🎯 نصائح سريعة قبل الامتحان**

-   ركّز على **تعريف الجدار الناري** وأهدافه الستة لأمن الشبكات.
-   احفظ الفرق بين **Stateless** و**Stateful** جيداً --- سؤال شائع.
-   افهم جداول iptables الثلاثة: **filter / nat / mangle**.
-   راجع أوامر `-A -s -d -j`{style="direction:ltr;display:inline-block"}
    الأساسية.
-   لا تنسَ **DMZ** ودورها بين الشبكتين.
:::
:::

::: {.main role="main"}
::: hero
[مراجعة سريعة قبل الامتحان]{.tag}

# أمن الشبكات --- الجدران النارية Computer Networks Security --- Firewalls

ملخص شامل ومركّز لمحاضرة الجدران النارية من مادة أمن الشبكات --- جامعة
حمص، كلية الهندسة المعلوماتية. يغطي كل الأفكار الأساسية المتوقع ورودها
في الامتحان مع الحفاظ على المصطلحات الإنجليزية الأصلية.

::: metaRow
[👩‍🏫 Dr. Manal Alomar]{.metaItem} [📚 السنة الخامسة 2025/2026]{.metaItem}
[📄 Lecture 1: Firewalls]{.metaItem}
:::
:::

::: {#s1 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[01]{.num}

## أمن الشبكات --- الأساسيات (Network Security)

[▾]{.chev}
:::

::: chapBody
::: {.box .def}
**لماذا أصبح أمن الشبكات مهماً؟** في الماضي كانت الشبكات تُستخدم فقط من
قبل الباحثين والموظفين، لكن الآن ملايين الناس يستخدمونها في الخدمات
البنكية والتسوق والضرائب، لذلك أصبح أمن الشبكات مشكلة كبيرة جداً.
:::

### []{.dot}تعريف أمن الشبكات {#تعريف-أمن-الشبكات .sub}

::: term
[Network Security]{.en}[أمن الشبكات]{.ar}
:::

**أمن الشبكات هو حماية:**

::: pillrow
[Data --- البيانات]{.pill} [Services --- الخدمات]{.pill} [Users ---
المستخدمين]{.pill}
:::

### []{.dot}أهداف أمن الشبكات (الأهم للامتحان ⭐) {#أهداف-أمن-الشبكات-الأهم-للامتحان .sub}

ستة أهداف رئيسية يجب حفظها بالترتيب مع مثال الحل لكل منها:

::: tblWrap
  \#   الهدف بالإنجليزية   المعنى بالعربية                                       مثال / الحل
  ---- ------------------- ----------------------------------------------------- --------------------------------------------------------------
  1    Confidentiality     السرية --- منع الآخرين من قراءة الرسائل               Encryption (تشفير) مثل AES, RSA وبروتوكولات TLS / Ipsec
  2    Integrity           سلامة البيانات --- منع التلاعب بالرسائل               Hash Functions (دوال التجزئة) مثل SHA-HMAC
  3    Authentication      التحقق من الهوية --- التأكد من هوية المرسل            كلمات المرور - الشهادات الرقمية - التوقيع الرقمي
  4    Authorization       التحكم بالوصول --- منع غير المصرح لهم                 لا يمكن لأي شخص الدخول لحسابك البنكي
  5    Replay Protection   منع إعادة الإرسال --- منع إعادة استخدام رسائل قديمة   Nonce (رقم عشوائي) - Timestamp (ختم زمني) - Sequence Numbers
  6    Non-repudiation     عدم الإنكار --- منع الشخص من إنكار أنه أرسل رسالة     Digital Signature (التوقيع الرقمي)
:::

::: {.box .note}
**ملاحظة مهمة جداً (فرق شائع بالامتحان)** **Confidentiality vs Digital
Signature**

**التشفير Confidentiality:** هدفه إخفاء الرسالة --- يتم التشفير بالمفتاح
العام وفك التشفير بالمفتاح الخاص، يُستخدم لحماية السرية.

**التوقيع الرقمي Digital Signature:** هدفه إثبات الهوية + عدم الإنكار
--- يتم التوقيع بالمفتاح الخاص والتحقق بالمفتاح العام، ولا يُستخدم لإخفاء
الرسالة.
:::

### []{.dot}من أين يأتي الخطر؟ {#من-أين-يأتي-الخطر .sub}

::: {.box .warn}
**حسب الدراسات** أخطر الهجمات ليست من الخارج بل من **الداخل**
(الموظفين)، لأن لديهم صلاحيات ويعرفون النظام وقد يكون لديهم دافع (انتقام
مثلاً). لذلك يجب تصميم الأمن على أساس أن الخطر قد يأتي من الداخل.
:::

أغلب الاختراقات ليست بسبب كسر التشفير، بل بسبب:

::: pillrow
[أخطاء بشرية]{.pill .red} [إهمال]{.pill .red} [ثغرات برمجية]{.pill .red}
[[Social Engineering]{.en style="font-size:11.5px"} (الهندسة
الاجتماعية)]{.pill .red}
:::

::: {.box .def}
**ملاحظة** الأمن لا يوجد في طبقة واحدة من طبقات الشبكة فقط، بل هو **موزّع
على كل الطبقات**.
:::

### []{.dot}مخاطر ربط الأجهزة بالشبكة {#مخاطر-ربط-الأجهزة-بالشبكة .sub}

عند ربط الأجهزة بالشبكة يمكن لأي جهاز الاتصال بأي جهاز آخر، وهذا جيد
للمستخدمين لكنه خطر جداً على الشركات لأنه قد يسبب:

::: steps
**Information Leakage** (تسريب البيانات): الشركات لديها معلومات حساسة -
أسرار تجارية - خطط مستقبلية - بيانات مالية، إذا تم تسريبها فالخسائر
كبيرة جداً.

**Threat Incursion** (دخول التهديدات): كالفيروسات - ديدان - برامج ضارة،
يمكن أن تدمر البيانات وتعطل الأنظمة وتضيع وقت وجهد الإدارة.
:::
:::
:::
:::

::: {#s2 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[02]{.num}

## مقدمة الجدار الناري (Introduction to Firewall)

[▾]{.chev}
:::

::: chapBody
### []{.dot}لماذا نحتاج الجدار الناري؟ {#لماذا-نحتاج-الجدار-الناري .sub}

تسريب المعلومات ودخول التهديدات جعلنا نحتاج إلى السماح بالجيد ومنع
السيئ، يتم ذلك من خلال الجدران النارية.

::: term
[Firewall]{.en}[الجدار الناري]{.ar}
:::

::: {.box .def}
**التعريف الأساسي ⭐ (سؤال شبه مؤكد)** يعمل الجدار الناري **Firewall**
كمرشح للحزم (Packet Filter) --- يقوم بفحص كل حزمة بيانات [(Packet)]{.en
style="background:none;border:none;padding:0;display:inline"} سواء كانت
واردة أو صادرة، ويطبق عليها مجموعة من القواعد التي يحددها مدير الشبكة.
:::

::: steps
إذا كانت الحزمة متوافقة مع القواعد يتم تمريرها بشكل طبيعي.

أما إذا لم تكن كذلك فيتم **حذفها مباشرة**.
:::

### []{.dot}على ماذا تعتمد القواعد؟ {#على-ماذا-تعتمد-القواعد .sub}

تعتمد هذه القواعد عادةً على:

::: termGrid
::: term
[IP addresses]{.en}[عناوين المصدر والوجهة]{.ar}
:::

::: term
[Ports]{.en}[أرقام المنافذ]{.ar}
:::
:::

تشير المنافذ إلى نوع الخدمة المطلوبة، مثلاً:

::: tblWrap
  المنفذ             الخدمة
  ------------------ --------------------------------------------------------------
  TCP port 25        البريد الإلكتروني (Email)
  TCP port 80        تصفح الويب (Web Browsing)
  Port 79 (Finger)   خدمة تُستخدم للاستعلام عن معلومات المستخدمين --- لم تعد شائعة
:::

::: {.box .warn}
**لماذا لا نحظر كل شيء؟** لا يمكن حظر جميع الاتصالات لأن ذلك سيمنع
التواصل مع العالم الخارجي، لذلك تُستخدم آليات أكثر مرونة مثل **DMZ**.
:::

### []{.dot}الجدار الناري كحاجز بين شبكتين {#الجدار-الناري-كحاجز-بين-شبكتين .sub}

جدار النار [Firewall]{.en
style="background:none;border:none;display:inline;padding:0"} هو نظام
حماية يوضع بين شبكتين لكل منهما **مستوى ثقة مختلف**:

::: compareGrid
::: {.compareCard .a}
#### [Intranet]{.en}

-   شبكة داخلية
-   مستخدمون معروفون وموثوقون
:::

::: {.compareCard .b}
#### [Internet]{.en}

-   شبكة خارجية
-   مستخدمون غير موثوقين وغالباً غير معروفين
:::
:::

يراقب جدار النار كل الطرود (Traffic) المارة بين الشبكتين في الاتجاهين
(مثل سور القلعة)، ويتخذ قراراً بالسماح أو المنع وفقاً لسياسة حماية مسبقة
التعريف [security policy]{.en
style="background:none;border:none;padding:0;display:inline"}.

### []{.dot}لا توجد طريقة وحيدة للتصميم {#لا-توجد-طريقة-وحيدة-للتصميم .sub}

جدار النار يمكن أن يكون:

::: pillrow
[Router (موجّه)]{.pill} [برمجية على كمبيوتر شخصي]{.pill} [آلة مصممة بشكل
خاص]{.pill} [مجموعة من المضيفات (hosts) مثل router ومضيف وكيل
Proxy]{.pill}
:::

### []{.dot}استراتيجيتا التصميم ⭐ {#استراتيجيتا-التصميم .sub}

::: compareGrid
::: {.compareCard .a}
#### ✅ الاستراتيجية الأنسب أمنياً

**كل ماهو غير مسموح صراحةً يكون ممنوع.**
:::

::: {.compareCard .b}
#### ⚠️ أقل أماناً

**كل ماهو غير ممنوع صراحةً يكون مسموح.**
:::
:::

::: {.box .good}
**تذكّر**من وجهة نظر الحماية فقط، الاستراتيجية الأولى (المنع الافتراضي)
هي الأنسب.
:::

### []{.dot}تطور تقنيات الجدران النارية {#تطور-تقنيات-الجدران-النارية .sub}

::: steps
**Stateful Firewalls** (جدران حالة الاتصال): لا تقتصر على فحص كل حزمة
بشكل مستقل، بل تعتمد على حالة الاتصالات وتتبع الجلسات، وتسمح فقط بالحزم
التي تكون جزءاً من اتصال تم إنشاؤه من داخل الشبكة.

**Application-Level Gateways** (جدران على مستوى التطبيقات): تفحص محتوى
الحزم [payload]{.en style="background:none;border:none;padding:0;"} بعمق
وليس فقط رؤوسها، مما يسمح بالتمييز بين أنواع مختلفة من نفس البروتوكول،
وتستطيع أيضاً فحص حركة البيانات الصادرة لمنع تسرب المعلومات الحساسة.
:::
:::
:::
:::

::: {#s3 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[03]{.num}

## المنطقة المنزوعة السلاح --- DMZ

[▾]{.chev}
:::

::: chapBody
::: term
[Demilitarized Zone (DMZ)]{.en}[المنطقة المنزوعة السلاح]{.ar}
:::

::: {.box .def}
**التعريف ⭐** تمثّل **DMZ** منطقة عازلة بين شبكة داخلية آمنة وشبكة
خارجية غير آمنة. يتم التحكم بـ [Traffic]{.en
style="background:none;border:none;padding:0;display:inline"} بين الشبكة
الخارجية والمنطقة العازلة من خلال استخدام جدار ناري أو أكثر، وبنفس
الطريقة يتم التحكم بالـ Traffic بين الشبكة الداخلية المحمية والمنطقة
العازلة.
:::

تتضمن المنطقة العازلة المخدّمات التي تقدّم خدماتها للشبكة الخارجية، مثل:

::: pillrow
[WWW servers]{.pill} [FTP servers]{.pill} [Email server]{.pill}
:::

::: {.box .warn}
**مهم**هذه الخوادم هي بالتالي عرضة أكثر للهجمات الخارجية لأنها المكشوفة
للعالم الخارجي.
:::

يتيح تصميم DMZ للمستخدمين من الإنترنت الوصول إلى هذه الخدمات العامة (مثل
خوادم الويب)، بينما يتم **منعهم من الوصول إلى الشبكة الداخلية**.

::: {.box .note}
**مفهوم مهم** يمكن أن يتم تحقيق DMZ بعدة طرق حسب مستوى الحماية المطلوب
واحتياجات الشركة وحتى الميزانية المتاحة، فلا توجد طريقة وحيدة لتصميم
DMZ.
:::

### []{.dot}السياسات الأربع في تصميم DMZ النموذجي {#السياسات-الأربع-في-تصميم-dmz-النموذجي .sub}

::: tblWrap
  السياسة                  المعنى
  ------------------------ -------------------------------------------------------------------------------------
  Private--DMZ Policy      سياسة التحكم بالحركة من الشبكة الداخلية الموثوقة نحو DMZ
  DMZ--Private Policy      سياسة التحكم بالحركة من DMZ نحو الشبكة الداخلية الموثوقة (عادة ممنوعة أو مقيدة جداً)
  Public--DMZ Policy       سياسة التحكم بحركة الإنترنت (Untrusted) نحو DMZ
  Private--Public Policy   سياسة التحكم بالحركة المباشرة بين الشبكة الداخلية والإنترنت (عادة ممنوعة تماماً)
:::
:::
:::
:::

::: {#s4 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[04]{.num}

## أنواع الجدران النارية الشائعة (Common Types of Firewalls)

[▾]{.chev}
:::

::: chapBody
::: {.box .note}
**خارطة الأنواع** هذه المحاضرة تغطي 5 أنواع رئيسية:
**Packet-Filtering**، **Stateful**، **Application Gateway**، **NAT
Firewall**، و**Host-based Firewall**.
:::

### []{.dot}1️⃣ Packet-Filtering Firewall (Screening Router) {#packet-filtering-firewall-screening-router .sub}

::: term
[Packet-filtering firewall (screening router)]{.en}[جدار الحماية القائم
على تصفية الحزم (الموجّه المصفّي)]{.ar}
:::

::: {.box .def}
**التعريف** جدار الحماية القائم على تصفية الحزم، والذي يُسمى أيضاً
**الموجه المصفّي**، هو موجه (راوتر) يمتلك القدرة على فحص محتويات الحزم
الشبكية.
:::

يفحص هذا الجدار بعض المعلومات داخل الحزم لتحديد ما إذا كانت الحزمة يجب
أن يُسمح بمرورها أو لا، بناءً على قواعد أمان محددة مسبقاً. المعلومات التي
يمكن فحصها:

::: tblWrap
  الطبقة                ماذا تفحص
  --------------------- ----------------------------------------------
  Layer 3 (Network)     عناوين IP المصدر والوجهة
  Layer 4 (Transport)   بروتوكولات TCP أو UDP وأرقام المنافذ (Ports)
:::

::: compareGrid
::: {.compareCard .a}
#### ✅ مزايا [Advantages]{.small-note .en style="display:inline"}

-   **Simplicity** --- البساطة في التنفيذ والإعداد
-   **Transparency to users** --- شفافية للمستخدمين، لا تغيير في تجربتهم
-   **Good performance** --- أداء جيد لأنها تعتمد على قواعد ثابتة بسيطة
-   **Cost effective** --- فعّالة من حيث التكلفة، لا تحتاج معدات معقدة
:::

::: {.compareCard .b}
#### ⚠️ عيوب [Disadvantages]{.small-note .en style="display:inline"}

-   لا تمنع الهجمات الموجهة إلى التطبيقات [(application-specific
    attacks)]{.en style="background:none;border:none;padding:0;"}
-   لا يوجد آليات مصادقة للمستخدمين [(no user authentication)]{.en
    style="background:none;border:none;padding:0;"}
-   عرضة للتزوير في عنوان IP [(vulnerable to IP spoofing)]{.en
    style="background:none;border:none;padding:0;"}
-   خروقات أمان بسبب سوء الإعداد [(misconfiguration)]{.en
    style="background:none;border:none;padding:0;"}
:::
:::

### []{.dot}2️⃣ Stateful Firewalls {#stateful-firewalls .sub}

::: {.box .def}
**التعريف ⭐⭐ (مهم جداً)** [Keep track of the state of a connection:
whether the connection is in an initiation, data transfer, or
termination state.]{.en style="display:block; margin-bottom:6px;"}
[يتتبع حالة الاتصال بأكملها: هل الاتصال في مرحلة التأسيس، أم نقل
البيانات، أم الإنهاء.]{.ar-tr style="border:none; padding:0; margin:0;"}
:::

حالات الاتصال الثلاث:

::: steps
**Establishment (التأسيس)**: عندما يتم إنشاء الاتصال.

**Data Transfer (نقل البيانات)**: أثناء تبادل البيانات بين الأجهزة
المتواصلة.

**Termination (إنهاء الاتصال)**: عندما يتم إغلاق الاتصال.
:::

::: {.box .good}
هذا يمكّن جدران الحماية من النوع \"حالة الاتصال\" من اتخاذ قرارات أكثر
ذكاءً وتقديم أمان أقوى مقارنة بجدران الحماية البسيطة، لأنها تفهم ما إذا
كانت الحزمة جزءاً من جلسة نشطة وموثوقة أم حزمة غير متوقعة.
:::

### []{.dot}3️⃣ Application Gateway Firewall (Proxy Firewall) {#application-gateway-firewall-proxy-firewall .sub}

::: {.box .def}
**التعريف** [Filters information at OSI Layers 3, 4, 5, and 7. Firewall
control and filtering is done in software.]{.en
style="display:block; margin-bottom:6px;"} [يفلتر المعلومات عبر طبقات
OSI رقم 3 و4 و5 و7. يتم التحكم والتصفية عبر البرمجيات.]{.ar-tr
style="border:none; padding:0; margin:0;"}
:::

::: tblWrap
  الطبقة                  ماذا تفحص
  ----------------------- --------------------------------------
  Layer 3 (Network)       فحص عناوين IP
  Layer 4 (Transport)     فحص بروتوكولات TCP وUDP
  Layer 5 (Session)       تحديد الجلسات النشطة
  Layer 7 (Application)   فحص التطبيقات والخدمات مثل HTTP وFTP
:::

::: {.box .note}
**كيفية العمل** يعمل جدار الحماية هذا عن طريق الوكلاء [(proxies)]{.en
style="background:none;border:none;padding:0;"} التي تستقبل البيانات من
جهاز العميل وتعيد إرسالها إلى الخادم. هذا يوفر طبقة حماية إضافية لأن
الجدار لا يمرر الاتصال المباشر بين العميل والخادم بل يعترضه ويفحصه أولاً.
:::

::: compareGrid
::: {.compareCard .a}
#### مثال 1: رفع ملف مقنّع

موظف يحاول استخدام HTTP منفذ 80 لكن ليس لتصفح المواقع، بل لرفع ملف حساس.
جدار Packet Filtering العادي يرى فقط \"بروتوكول HTTP ومنفذ 80\" فيسمح
به. أما **Application Gateway** يفحص محتوى الطلب (Payload) ويكتشف أنها
عملية رفع ملف (File Upload) فيمنعها.
:::

::: {.compareCard .b}
#### مثال 2: تسريب بيانات

موظف يحاول إرسال معلومات سرية عبر نموذج في موقع ويب. الجدار الناري يفحص
البيانات الخارجة ويكتشف كلمات مثل [password, credit card]{.en
style="background:none;border:none;padding:0;"} فيقوم بحظر الإرسال.
:::
:::

::: {.box .good}
**فوائد Advantages** **1. التحقق من هوية المستخدم:** يمكنه التأكد من اسم
المستخدم وكلمة المرور.\
**2. فحص محتوى البيانات (Payload Inspection):** يفحص محتوى الطلب نفسه.
:::

::: {.box .bad}
**مساوئ Disadvantages** **1. الأداء أبطأ:** لأنه يفحص كل شيء بعمق (Deep
Inspection) على طبقة 7.\
**2. يحتاج إعداد من المستخدم (Proxy Configuration).**\
**3. يحتاج Proxy منفصل لكل تطبيق:** مثل FTP Proxy - SMTP Proxy - IMAP
Proxy، مما يزيد التعقيد في الإدارة.
:::

### []{.dot}4️⃣ Network Address-Translation (NAT) Firewall {#network-address-translation-nat-firewall .sub}

::: {.box .def}
**التعريف** جدار الحماية من نوع ترجمة العناوين الشبكية [(NAT)]{.en
style="background:none;border:none;padding:0;"} يعمل على تحويل عناوين
الشبكة الداخلية (Private IPv4) إلى عنوان IP عام (Public IPv4) عندما يتم
إرسال البيانات عبر الإنترنت.
:::

::: {.box .good}
يساعد هذا النوع في **إخفاء الأجهزة الداخلية** للشبكة عن الإنترنت، مما
يوفر طبقة أمان إضافية عن طريق إخفاء الهويات الحقيقية للأجهزة داخل
الشبكة.
:::

### []{.dot}5️⃣ Host-Based Firewall {#host-based-firewall .sub}

::: {.box .def}
**التعريف** هو نوع من جدران الحماية يتم تثبيته وتشغيله **مباشرة على جهاز
كمبيوتر أو خادم معين** (A PC or server with firewall software running on
it). يعمل كحاجز أمني لحماية الجهاز نفسه فقط من التهديدات المحتملة عبر
الشبكة.
:::

أمثلة: [GUFW (GUI for Uncomplicated Firewall)]{.en
style="background:none;border:none;padding:0;"} على Ubuntu، و [Windows
Firewall]{.en style="background:none;border:none;padding:0;"}.

::: compareGrid
::: {.compareCard .a}
#### مزايا

-   حماية مخصصة لكل جهاز --- إعدادات أمان فردية لكل جهاز
-   حماية محسنة ضد التهديدات الداخلية --- تحمي الجهاز نفسه وليس الشبكة
    بأكملها
:::

::: {.compareCard .b}
#### ملاحظة

-   يجب إدارة كل جهاز على حدة، بعكس جدار الحماية على مستوى الشبكة الذي
    يحمي جميع الأجهزة دفعة واحدة.
:::
:::
:::
:::
:::

::: {#s5 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[05]{.num}

## Stateless Filtering vs Stateful Filtering ⭐⭐⭐

[▾]{.chev}
:::

::: chapBody
::: {.box .warn}
**هذا من أكثر المواضيع أهمية في المحاضرة --- سؤال متوقع بقوة** العنوان
نفسه \"Stateless Filtering Is Not Enough\" (التصفية غير المعتمدة على
الحالة ليست كافية) يشير إلى أهمية الموضوع.
:::

### []{.dot}التصفية غير المعتمدة على الحالة (Stateless) {#التصفية-غير-المعتمدة-على-الحالة-stateless .sub}

::: {.box .def}
**التعريف** هي نوع من جدران الحماية التي تقوم بفحص الحزم بشكل مستقل دون
الاحتفاظ بأي سجل أو \"حالة\" للاتصالات السابقة. تتعامل مع كل حزمة على
حدى بناءً على معايير مثل عنوان IP ورقم المنفذ، لكنها **لا تراقب سير
الاتصال بشكل مستمر** ولا تحلل تتابع الحزم.
:::

منافذ TCP المستخدمة في الاتصالات (مثال مهم):

::: tblWrap
  النوع                                    نطاق المنافذ    الاستخدام
  ---------------------------------------- --------------- ------------------------------------------------------------------------------
  Server ports (المنافذ المخصصة للخوادم)   \< 1024         مخصصة بشكل دائم لخدمات معينة: FTP (20,21), Telnet (23), SMTP (25), HTTP (80)
  Client ports (المنافذ المخصصة للعملاء)   1024 -- 65535   تُخصص للعملاء عند الاتصال بالخوادم (منفذ مؤقت / ephemeral)
:::

::: {.box .bad}
**المشكلة الأساسية في Stateless** عندما يفتح العميل اتصالاً مع الخادم،
يستخدم منفذاً مؤقتاً (مثلاً من 1024 إلى 16383) لتلقي الاستجابة. جدار
الحماية الذي لا يعتمد على الحالة يرى طلباً قادماً على هذا المنفذ العالي
فقط، لكنه **لا يستطيع تمييز** هل هذا رد شرعي على اتصال بدأه العميل، أم
هجوم/حركة مرور ضارة تتظاهر بذلك.
:::

### []{.dot}الحل: Stateful Filtering ⭐ {#الحل-stateful-filtering .sub}

::: {.box .good}
**التعريف** [Decision is still made separately for each packet, but in
the context of a connection.]{.en
style="display:block; margin-bottom:6px;"} [لا يزال القرار يُتخذ لكل حزمة
بيانات على حدى، ولكن مع مراعاة ما إذا كانت الحزمة جزءاً من اتصال موجود
بالفعل (Established Connection) أم أنها بداية اتصال جديد.]{.ar-tr
style="border:none;padding:0;margin:0;"}
:::

::: steps
**If new connection**, then check against security policy.\
[إذا كانت الحزمة بداية لاتصال جديد، يتم التحقق منها باستخدام سياسة
الأمان Security Policy.]{.ar-tr style="border:none;padding:0;margin:0;"}

**If existing connection**, then look it up in the table.\
[إذا كانت الحزمة جزءاً من اتصال موجود، يتم التحقق من \"جدول الاتصالات\"
Connection Table.]{.ar-tr style="border:none;padding:0;margin:0;"}

**Only allow incoming traffic to a high-numbered port if there is an
established connection to that port.**\
[لن يسمح الجدار الناري بحزمة قادمة على منفذ عالٍ إلا إذا كان هناك اتصال
بدأ فعلاً من داخل الشبكة إلى هذا المنفذ.]{.ar-tr
style="border:none;padding:0;margin:0;"}

**Hard to filter stateless protocols (UDP) and ICMP.**\
[يصعب تطبيق هذه الطريقة مع بروتوكولات لا تُنشئ اتصالاً واضحاً مثل UDP و
ICMP (لا يوجد Handshake ولا تتبع لحالة الجلسة).]{.ar-tr
style="border:none;padding:0;margin:0;"}
:::

### []{.dot}مثال: جدول حالة الاتصال (Connection State Table) {#مثال-جدول-حالة-الاتصال-connection-state-table .sub}

::: tblWrap
  Source Address   Source Port   Destination Address   Destination Port   Connection State
  ---------------- ------------- --------------------- ------------------ ------------------
  192.168.1.100    1030          210.9.88.29           80                 Established
  192.168.1.102    1031          216.32.42.123         80                 Established
  192.168.1.101    1033          173.66.32.122         25                 Established
:::

### []{.dot}ملخص المقارنة النهائي {#ملخص-المقارنة-النهائي .sub}

::: compareGrid
::: {.compareCard .b}
#### Stateless Filtering

-   يفحص كل حزمة بمعزل عن غيرها
-   لا يحتفظ بأي \"ذاكرة\" للاتصالات
-   أسرع لكن أقل أماناً
-   لا يميّز الرد الشرعي عن الهجوم المموّه
:::

::: {.compareCard .a}
#### Stateful Filtering

-   يتتبع حالة كل اتصال عبر Connection Table
-   يميّز بين اتصال قائم وموثوق ومحاولة دخول جديدة/مشبوهة
-   أكثر أماناً لكن أصعب مع UDP/ICMP
-   يسمح بالحزم فقط ضمن جلسة تم إنشاؤها من الداخل
:::
:::
:::
:::
:::

::: {#s6 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[06]{.num}

## Netfilter و iptables في نظام Linux

[▾]{.chev}
:::

::: chapBody
### []{.dot}ما هو Netfilter؟ {#ما-هو-netfilter .sub}

::: term
[Netfilter]{.en}[إطار عمل تصفية الشبكة]{.ar}
:::

::: {.box .def}
**التعريف** هو إطار عمل [(Framework)]{.en
style="background:none;border:none;padding:0;"} مدمج في نواة نظام
التشغيل لينكس، يُستخدم لإدارة ومعالجة حزم الشبكة [(Network Packets)]{.en
style="background:none;border:none;padding:0;"}. يُستخدم لإنشاء جدران
نارية [(Firewalls)]{.en style="background:none;border:none;padding:0;"}،
ترشيح الحزم، تنفيذ NAT (ترجمة العناوين)، وعمليات أخرى على الحزم الشبكية.
:::

### []{.dot}كيف يعمل Netfilter؟ {#كيف-يعمل-netfilter .sub}

يسمح لك بالتفاعل مع الحزم أثناء مرورها من خلال مراحل مختلفة في الشبكة:

::: steps
**Incoming** (حزمة واردة): من الإنترنت إلى الجهاز.

**Outgoing** (حزمة صادرة): من الجهاز إلى الإنترنت.

**Forwarded** (حزمة معاد توجيهها): تمر عبر الجهاز، لكنها ليست موجهة له.

**Pre-routing** (قبل الإرسال): قبل أن يقرر النظام إلى أين تُرسل الحزمة.

**Post-routing** (بعد الإرسال): بعد أن يقرر النظام إلى أين تُرسل الحزمة.
:::

### []{.dot}ما هو iptables؟ {#ما-هو-iptables .sub}

::: term
[iptables]{.en}[أداة إدارة قواعد Netfilter]{.ar}
:::

يتم التحكم بـ Netfilter من خلال الأداة **iptables**، تُستخدم لإضافة أو
حذف قواعد من الجداول الموجودة في Netfilter.

::: {.box .def}
**من [iptables Man Page]{.en}** [Iptables is used to set up, maintain,
and inspect the tables of IP packet filter rules in the Linux kernel.
Several different tables may be defined. Each table contains a number of
built-in chains and may also contain user-defined chains.\
\
Each chain is a list of rules which can match a set of packets.]{.en
style="display:block; margin-bottom:6px;"} [تُستخدم iptables لإعداد
وصيانة وفحص جداول قواعد تصفية حزم IP في نواة لينكس. يمكن تعريف عدة جداول
مختلفة. كل جدول يحتوي على عدد من السلاسل المدمجة (built-in chains) وقد
يحتوي أيضاً على سلاسل معرّفة من قبل المستخدم. كل سلسلة (chain) هي قائمة من
القواعد التي يمكن أن تطابق مجموعة من الحزم.]{.ar-tr
style="border:none;padding:0;margin:0;"}
:::

### []{.dot}أوامر أساسية للتعامل مع iptables {#أوامر-أساسية-للتعامل-مع-iptables .sub}

    sudo /sbin/iptables -L          # عرض القواعد الموجودة في الجداول
    sudo /sbin/iptables -F          # حذف (مسح) كل القواعد الحالية
    sudo /sbin/iptables-save           # حفظ التعديلات لتُقرأ عند إعادة التشغيل

::: {.box .warn}
**مهم جداً --- للتذكر** عندما يتم تعديل القواعد في iptables، هذا التعديل
يكون **مؤقت** إن لم يتم حفظه، ولذلك حتى يتم حفظ التعديلات بحيث يتم الأخذ
بها عند إعادة تشغيل iptables نستخدم `iptables-save`{.inline}.
:::

::: {.box .bad}
**ملاحظة صلاحيات** الأمر `iptables -L`{.inline} يحتاج صلاحيات root، وإلا
تظهر رسالة: `Permission denied (you must be root)`{.inline}
:::

::: term
[nftables]{.en}[بديل حديث لـ iptables]{.ar}
:::

::: {.box .note}
تعتبر الأداة **nftables** بديلاً حديثاً لـ iptables، يدعم كتابة قواعد أكثر
كفاءةً ومرونة (سيتم تفصيلها لاحقاً في القسم 11).
:::
:::
:::
:::

::: {#s7 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[07]{.num}

## معالجة الطرود في iptables --- الجداول الثلاثة ⭐⭐

[▾]{.chev}
:::

::: chapBody
::: {.box .def}
**Packet Processing In iptables** تتم معالجة الطرود من خلال ثلاثة جداول:
**Filter** (وهو الافتراضي)، **NAT**، و**Mangle** (الأقل استعمالاً).
:::

### []{.dot}مفهوم Chains (السلاسل) {#مفهوم-chains-السلاسل .sub}

يتضمن كل جدول من القواعد سلاسل [chains]{.en
style="background:none;border:none;padding:0;"} (كل سلسلة تتضمن مجموعة
من القواعد لذلك يُطلق على السلسلة أحياناً [ruleset]{.en
style="background:none;border:none;padding:0;"}). ضمن كل سلسلة يتم
التحقق من القواعد على التتالي حتى إيجاد قاعدة مطابقة يتوقف البحث، إذا لم
تتم مطابقة أي قاعدة عندها يتم تطبيق **القاعدة الافتراضية**.

هناك عدة سلاسل من القواعد الموجودة أساساً [(built-in)]{.en
style="background:none;border:none;padding:0;"}، ويمكن إضافة سلاسل أخرى
من قبل المستخدم [(User-defined chains)]{.en
style="background:none;border:none;padding:0;"}.

### []{.dot}1️⃣ جدول Filter (الترشيح) --- الجدول الافتراضي {#جدول-filter-الترشيح-الجدول-الافتراضي .sub}

جدول **filter** هو الجدول الافتراضي المسؤول عن ترشيح الحزم [(Packet
Filtering)]{.en style="background:none;border:none;padding:0;"} أي اتخاذ
القرار بالسماح أو الحظر للحزم الداخلة أو الخارجة أو الموجهة عبر الجهاز.

::: chainRow
::: chainCard
FORWARD chain
:::

::: {.chainCard .arr}
↔
:::

::: chainCard
INPUT chain
:::

::: {.chainCard .arr}
↔
:::

::: chainCard
OUTPUT chain
:::
:::

::: tblWrap
  السلسلة         الوظيفة
  --------------- -------------------------------------------------------------------------------------------
  Forward chain   ترشّح الطرود التي سيتم توجيهها عبر الجدار الناري (من الشبكة الداخلية إلى الخارجية وبالعكس)
  Input chain     ترشّح الطرود المرسلة إلى الجدار الناري نفسه
  Output chain    ترشّح الطرود الصادرة عن الجدار الناري
:::

كل قاعدة تتحقق من خصائص الحزمة [(IP, Port, Protocol\...)]{.en
style="background:none;border:none;padding:0;"} وإذا طابقت الحزمة
الشروط، يتم تنفيذ الإجراء المحدد (Target):

::: tblWrap
  الإجراء (Target)   المعنى
  ------------------ -----------------------------
  ACCEPT             السماح بمرور الحزمة
  DROP               إسقاط الحزمة بصمت (بدون رد)
  REJECT             رفض الحزمة مع إرسال رد
  LOG                تسجيل معلومات الحزمة
:::

::: {.box .warn}
**الترتيب مهم جداً ⭐** iptables يقرأ القواعد من الأعلى إلى الأسفل، وينفذ
**أول** قاعدة تطابق الحزمة. لذلك يجب الانتباه لترتيب القواعد لتجنب سلوك
غير مقصود.
:::

### []{.dot}2️⃣ جدول NAT (ترجمة العناوين) {#جدول-nat-ترجمة-العناوين .sub}

::: {.box .def}
**لماذا نحتاج لتغيير عناوين المصدر أو الهدف؟** أغلب الشركات تمتلك عنوان
عام واحد [(public IP)]{.en
style="background:none;border:none;padding:0;"}، لذلك يقوم المدراء بمنح
العقد الداخلية عناوين خاصة، ويتم استخدام العنوان العام للوصول إلى الشبكة
الخارجية. الهدف: الحماية وإخفاء العناوين الخاصة.
:::

::: tblWrap
  السلسلة              الوظيفة
  -------------------- -----------------------------------------------------------------
  Pre-routing chain    يغيّر عنوان الهدف (destination address) للطرد --- يُستخدم مع DNAT
  Post-routing chain   يغيّر العنوان المصدر (source address) للطرد --- يُستخدم مع SNAT
  Output chain         يغيّر العنوان الهدف للطرود الصادرة عن الجدار الناري نفسه
:::

::: compareGrid
::: {.compareCard .a}
#### [DNAT]{.en} (Destination NAT)

إعادة كتابة عنوان IP (أو/و المنفذ) **الهدف** للطرد. مثال شائع: توجيه
الحركة القادمة من الإنترنت إلى خادم داخل شبكة خاصة (مثلاً 203.0.113.1 ←
192.168.1.10).
:::

::: {.compareCard .b}
#### [SNAT]{.en} (Source NAT)

إعادة كتابة عنوان IP **المصدر** للطرد، تُستخدم عادة عند خروج الحزم من
الشبكة الداخلية إلى الإنترنت.
:::
:::

::: {.box .note}
**مثال DNAT**

``` {style="margin:6px 0 0;"}
iptables -t nat -A PREROUTING -i eth0 -j DNAT --to 5.6.7.8-5.6.7.10
```

[تغيير العنوان الهدف إلى أحد العناوين 5.6.7.9 ، 5.6.7.8 ،
5.6.7.10]{.ar-tr style="border:none;padding:0;margin:6px 0 0;"}
:::

::: steps
**خطوات عمل DNAT الكاملة (مثال خادم ويب داخلي):**

الإعداد: تحدد قاعدة DNAT لتغيير عنوان IP الوجهة من IP العام إلى IP
الخادم الداخلي.

وصول الطلب: يصل طلب المستخدم من الإنترنت إلى جهاز التوجيه عبر العنوان
العام.

تطبيق DNAT: يغيّر جهاز التوجيه عنوان الوجهة إلى عنوان الخادم الداخلي.

إرسال الحزمة: تُرسل الحزمة إلى الخادم الداخلي.

استجابة الخادم: يستخدم الراوتر SNAT لتغيير عنوان المصدر مرة أخرى إلى
العنوان العام قبل إرسال الرد للمستخدم.
:::

::: term
[MASQUERADE]{.en}[نفس عمل SNAT لكن تلقائي]{.ar}
:::

::: {.box .def}
نفس عمل SNAT ولكن بشكل تلقائي للعنوان المصدر الذي سيتم التغيير إليه، هو
نفسه عنوان واجهة الجدار الناري التي ستخرج منها الحزمة (مفيد عندما يكون
IP الخارجي متغيّراً).
:::

::: term
[LOG]{.en}[تسجيل الطرود]{.ar}
:::

تسجيل كل الطرود التي توافق هذه القاعدة، حيث يتم تسجيل هذه الطرود من قبل
النواة، وملف `/etc/syslog.conf`{.inline} يحدد أين سيتم تسجيل هذه الطرود.

::: tblWrap
  الخيار                     الوظيفة
  -------------------------- ----------------------------------------------------------
  \--log-prefix \"string\"   يسبق كل رسائل التسجيل بالبادئة المحددة
  \--log-level N             مستوى التسجيل (مثال: \--log-level 4 لتسجيل رسالة كتحذير)
:::

    iptables -A INPUT -p icmp --icmp-type echo-request -j LOG --log-level 4 --log-prefix "ICMP"

### []{.dot}3️⃣ جدول Mangle (التغيير) {#جدول-mangle-التغيير .sub}

::: {.box .def}
**التعريف** جدول **mangle** هو أحد الجداول الأساسية المستخدمة للتحكم
المتقدم في حزم البيانات داخل نواة لينوكس. يُستخدم لتعديل خصائص الحزمة
نفسها، وليس فقط تحديد ما إذا كان يجب قبولها أو رفضها.
:::

يُستخدم جدول mangle لتعديل خصائص الحزم مثل:

::: tblWrap
  الخاصية                        الوظيفة
  ------------------------------ -------------------------------------------------------------------------------
  TTL (Time To Live)             لتحديد عدد القفزات (hops) التي يمكن أن تمر بها الحزمة قبل أن تُحذف
  TOS (Type of Service)          لتحديد أولوية الحزمة في الشبكة (مثلاً إعطاء أولوية أعلى لحزم الصوت أو الفيديو)
  خيارات متقدمة في رؤوس الحزمة   مثل بعض الخيارات الخاصة ببروتوكولات IP
:::

يتضمن جدول Mangle ست سلاسل:

::: chainRow
[PREROUTING]{.chainCard}[POSTROUTING]{.chainCard}[OUTPUT]{.chainCard}[INPUT]{.chainCard}[FORWARD]{.chainCard}
:::

### []{.dot}جدول ملخص Queue Function / Chain Function {#جدول-ملخص-queue-function-chain-function .sub}

::: tblWrap
  Queue Type   Queue Function                Chain          Chain Function
  ------------ ----------------------------- -------------- --------------------------------------------------------------------
  Filter       Packet filtering              FORWARD        Filters packets to hosts accessible by another NIC on the firewall
  Filter       Packet filtering              INPUT          Filters packets destined to the firewall
  Filter       Packet filtering              OUTPUT         Filters packets originating from the firewall
  NAT          Network Address Translation   PREROUTING     Address translation before routing (DNAT)
  NAT          Network Address Translation   POSTROUTING    Address translation after routing (SNAT)
  NAT          Network Address Translation   OUTPUT         NAT for packets generated by the firewall
  Mangle       TCP header modification       ALL 5 chains   Modification of the TCP packet quality of service bits
:::

::: {.box .note}
عند كتابة القاعدة يجب تحديد اسم الجدول واسم السلسلة، والجدول الافتراضي
إن لم يُذكر هو جدول **filter**.
:::

### []{.dot}مراحل معالجة الرزمة (Packet Journey) ⭐ {#مراحل-معالجة-الرزمة-packet-journey .sub}

::: steps
عندما يصل الطرد إلى جدار النار تتم معالجته من خلال القواعد في سلسلة
**PREROUTING** في جدول **mangle** إن وُجدت.

بعد ذلك يتم فحصه بقواعد سلسلة **PREROUTING** في جدول **NAT** ليُحدد إن
كان بحاجة لتغيير في عنوان الهدف (DNAT).

بعد ذلك يميّز النظام بين ثلاث حالات: (أ) الطرد موجه للشبكة المحمية
بالجدار الناري نفسه، (ب) الطرد قابل للتوجيه (Forwarding) في نواة النظام،
(ج) الطرد موجّه للجدار الناري نفسه.

**حالة التوجيه (Forward):** يفحص من خلال قواعد mangle في سلسلة FORWARD،
ثم سلسلة FORWARD من جدول Filter، ثم سلسلة POSTROUTING من جدول mangle، ثم
سلسلة POSTROUTING من جدول NAT.

**حالة الطرد موجّه للجدار نفسه:** يمر بقواعد سلسلة INPUT من جدول Mangle
إن وجدت، ثم قواعد سلسلة INPUT من جدول الترشيح Filter. حالما يتجاوز الطرد
كل الاختبارات بنجاح يتم معالجته من قبل التطبيق المناسب.

**الطرد الذي يرسله الجدار الناري نفسه:** يمر بداية في سلسلة OUTPUT من
جدول mangle إن كانت موجودة، ثم OUTPUT من جدول NAT، ثم يُفحص من خلال
القواعد في سلسلة OUTPUT من جدول Filter، ومن ثم يمكن أن ينفذ SNAT و QoS
mangling من خلال سلسلة POSTROUTING.
:::
:::
:::
:::

::: {#s8 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[08]{.num}

## الشكل العام لأمر iptables وأمثلة تطبيقية ⭐

[▾]{.chev}
:::

::: chapBody
### []{.dot}General Syntax (الشكل العام للأمر) {#general-syntax-الشكل-العام-للأمر .sub}

    iptables [-t <table-name>] <command> <chain-name> \
      <parameter-1> <option-1> \
      <parameter-n> <option-n>

::: {.box .def}
**مثال**

``` {style="margin:4px 0 0;"}
iptables [-t filter] -A FORWARD -s 0/0 -i eth0 -d 192.168.1.58 \
  -o eth1 -p TCP --sport 1024:65535 --dport 80 -j ACCEPT
```
:::

::: tblWrap
  الرمز                       الشرح
  --------------------------- -------------------------------------------------------------------------------
  \<table-name\>              اسم الجدول، إذا لم يوضع اسم جدول عندئذ يكون تلقائياً جدول الترشيح filter table
  \<command\>                 الأمر المراد تنفيذه مثلاً إضافة أو حذف قاعدة
  \<option\>-\<parameter\>    مجموعة من الوسائط والخيارات لتحديد معايير للمطابقة
  -j \<target\> (i.e. jump)   يحدد هدف القاعدة أي الإجراء اللازم اتخاذه إن طابق الطرد القاعدة
:::

### []{.dot}شكل مبسّط (Iptables Basic Syntax) {#شكل-مبسط-iptables-basic-syntax .sub}

    [root@myServer ~] # iptables -A <chain> -j <target>

::: tblWrap
  الخيار   الوظيفة
  -------- -------------------------------------------------------------------------------------------------
  -A       يحدد بأن هذه القاعدة ستضاف إلى سلسلة \<chain\>، كما ذُكرت مسبقاً كل سلسلة تتضمن مجموعة من القواعد
  -D       حذف القاعدة
  -R       استبدال قاعدة
  -I       حشر (إدراج) قاعدة
:::

### []{.dot}هدف القاعدة --- Target {#هدف-القاعدة-target .sub}

يمثل الإجراء اللازم اتخاذه عندما يتطابق الطرد مع قاعدة ما. أكثر الأهداف
استخداماً:

::: tblWrap
  Target   الشرح
  -------- -----------------------------------------------------------------------------------------------------------
  ACCEPT   تتوقف عملية مطابقة الطرد مع بقية القواعد في السلسلة ويتم تسليم الطرد إلى التطبيق أو نظام التشغيل للمعالجة
  DROP     تتوقف عملية مطابقة الطرد مع بقية القواعد ويتم إهمال/إسقاط الطرد
  REJECT   تعمل مثل DROP ولكنها أيضاً ترسل رسالة خطأ ICMP إلى المضيف الذي أرسل الطرد
:::

أهم الخيارات الممكن استخدامها مع REJECT:

::: tblWrap
  الخيار                            الشرح
  --------------------------------- ----------------------------------------------------------------------------------------------------------------------------
  icmp-port-unreachable (default)   تُستخدم عندما يكون المضيف المستهدف متصلاً، ولكن المنفذ (Port) المحدد غير مفتوح أو لا يستجيب، أي أن الخدمة المطلوبة غير متاحة
  icmp-host-unreachable             تُستخدم عندما لا يمكن الوصول إلى المضيف المستهدف نفسه، مثل أن المضيف غير متصل بالشبكة أو تم إيقافه
:::

### []{.dot}وسائط المطابقة الأساسية (Match options) {#وسائط-المطابقة-الأساسية-match-options .sub}

::: tblWrap
  الأمر                   الوصف
  ----------------------- --------------------------------------------------------------
  -p \<protocol-type\>    Match protocol. Types include: icmp, tcp, udp, and all
  -s \<ip-address\>       Match source IP address (مطابقة عنوان IP المصدر)
  -d \<ip-address\>       Match destination IP address (مطابقة عنوان IP الوجهة)
  -i \<interface-name\>   Match \"input\" interface على الواجهة التي تدخل منها الحزمة
  -o \<interface-name\>   Match \"output\" interface على الواجهة التي تخرج منها الحزمة
:::

### []{.dot}وسائط خاصة بـ TCP/UDP {#وسائط-خاصة-بـ-tcpudp .sub}

::: tblWrap
  الأمر                      الوصف
  -------------------------- ----------------------------------------------------------------------------------------
  -p tcp \--sport \<port\>   TCP source port، يمكن أن تكون قيمة مفردة أو مجال: start:end مثل tcp \--dport 3000:3200
  -p tcp \--dport \<port\>   TCP destination port، قيمة مفردة أو مجال
  -p tcp \--syn              تُستخدم لتحديد طلب اتصال TCP جديد. \"! \--syn\" تعني ليست طلب اتصال جديد
  -p udp \--sport \<port\>   UDP source port
  -p udp \--dport \<port\>   UDP destination port
:::

### []{.dot}وسائط خاصة بـ ICMP {#وسائط-خاصة-بـ-icmp .sub}

::: tblWrap
  الأمر                   الوصف
  ----------------------- ----------------------------------------------------
  \--icmp-type \<type\>   الأنواع الأكثر استخداماً: echo-reply و echo-request
:::

### []{.dot}القاعدة الافتراضية --- Basic Firewall Policies ⭐ {#القاعدة-الافتراضية-basic-firewall-policies .sub}

في iptables بإمكانك تحديد قواعد السياسة الافتراضية أي (ما لا ينطبق عليه
أي قاعدة ماذا تفعل به؟) وذلك بواسطة الخيار `-P`{.inline}، سواء وضعتها في
البداية أو النهاية فإنها ستطبق بعد كل القواعد الأخرى. مثلاً سياسة متحفظة،
وهذا ما يجب أن يكون بأن يُرفض كل شيء كما يلي:

    iptables -P INPUT   DROP
    iptables -P FORWARD DROP
    iptables -P OUTPUT  DROP

::: {.box .warn}
**لاحظ**لا نستعمل `-j`{.inline} مع `-P`{.inline}
:::

### []{.dot}أمثلة تطبيقية كاملة (احفظها جيداً) {#أمثلة-تطبيقية-كاملة-احفظها-جيدا .sub}

::: {.box .def}
**مثال 1: السماح بـ ICMP echo**

``` {style="margin:4px 0;"}
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT
```

[إضافة قواعد تسمح للجدار الناري باستقبال طلبات ICMP echo وإرسال ردود
ICMP echo.]{.ar-tr style="border:none;padding:0;margin:0;"}
:::

::: {.box .def}
**مثال 2: السماح بطرود TCP من واجهة محددة**

``` {style="margin:4px 0;"}
iptables -A INPUT -s 0/0 -i eth0 -d 192.168.1.1 -p TCP -j ACCEPT
```

[إضافة قاعدة تسمح للجدار الناري بقبول طرود TCP القادمة من الواجهة eth0
من أي عنوان IP والموجهة للجدار الناري ذو العنوان 192.168.1.1. **0/0 تعني
أي عنوان.**]{.ar-tr style="border:none;padding:0;margin:0;"}
:::

::: {.box .def}
**مثال 3: FORWARD إلى خادم ويب على المنفذ 80**

``` {style="margin:4px 0;"}
iptables -A FORWARD -s 0/0 -i eth0 -d 192.168.1.58 -o eth1 \
  -p TCP --sport 1024:65535 --dport 80 -j ACCEPT
```

[إضافة قاعدة تسمح بقبول طرود TCP القادمة من الواجهة eth0 من أي عنوان IP
والموجهة إلى العنوان 192.168.1.58 الذي يمكن الوصول إليه من الواجهة eth1،
المنفذ المصدر يقع في المجال 1024:65535 والمنفذ الهدف 80 (مخدم
http).]{.ar-tr style="border:none;padding:0;margin:0;"}
:::

::: {.box .def}
**مثال 4: multiport + الاتجاه العكسي (state)**

``` {style="margin:4px 0;"}
iptables -A FORWARD -s 0/0 -i eth0 -d 192.168.1.58 -o eth1 -p TCP \
  --sport 1024:65535 -m multiport --dport 80,443 -j ACCEPT

iptables -A FORWARD -d 0/0 -o eth0 -s 192.168.1.58 -i eth1 -p TCP \
  -m state --state ESTABLISHED -j ACCEPT
```

[القاعدة الأولى تسمح بطرود TCP الداخلة والمتجهة للمنفذ 80 أو 443 (http
أو https). القاعدة الثانية تسمح بمرور الطرود العائدة والتابعة لنفس
الاتصال السابق (من خلال استخدام
`-m state --state ESTABLISHED`{.inline}).]{.ar-tr
style="border:none;padding:0;margin:0;"}
:::

::: {.box .warn}
**مثال 5: تحديد معدل (Rate Limiting) لمنع بعض هجمات منع الخدمة**

``` {style="margin:4px 0;"}
iptables -A INPUT -p icmp --icmp-type echo-request -m limit \
  --limit 1/s -i eth0 -j ACCEPT
```

[هذه القاعدة توضح كيفية استخدام `-m limit --limit 1/s`{.inline} لتحديد
المعدل الأعظمي من الطرود المطابقة لهذه القاعدة في الثانية. يمكن تحديد
المدة الزمنية بالثانية، بالدقيقة، بالساعة، أو باليوم (/second, /minute,
/hour, /day). هذا الخيار يسمح بمنع بعض أنواع هجمات منع الخدمة التي تقوم
على مبدأ إغراق الشبكة بعدد كبير من الطلبات.]{.ar-tr
style="border:none;padding:0;margin:0;"}
:::

::: {.box .warn}
**مثال 6: حماية من هجمات SYN Flood**

``` {style="margin:4px 0;"}
iptables -A INPUT -p tcp --syn -m limit --limit 5/s -i eth0 -j ACCEPT
```

[القاعدة تسمح للجدار الناري بقبول طرود TCP لإنشاء اتصال (البت syn مفعّل)
والقادمة من خلال الواجهة eth0 بمعدل لا يتجاوز خمس طرود في
الثانية.]{.ar-tr style="border:none;padding:0;margin:0;"}
:::

::: {.box .def}
**مثال 7: DNAT كامل (Port forwarding)**

``` {style="margin:4px 0;"}
iptables -A PREROUTING -t nat -p tcp -d 1.2.3.4 --dport 8080 \
  -j DNAT --to 192.168.1.1:80

iptables -A FORWARD -p tcp -d 192.168.1.1 --dport 80 -j ACCEPT
```

[إضافة قاعدة إلى سلسلة ما قبل التوجيه (PREROUTING) من جدول NAT بحيث كل
طرود TCP الذاهبة إلى 1.2.3.4 والمنفذ 8080 يتم تغيير عنوان الهدف فيها إلى
192.168.1.1, port 80.]{.ar-tr style="border:none;padding:0;margin:0;"}

::: {.box .bad style="margin-top:8px;"}
**ملاحظة مهمة**القاعدة السابقة لا تعني توجيه الطرود، وإنما تغيّر عنوان
الهدف فقط. حتى يتم توجيه الطرود يجب أن نضيف قاعدة تسمح بتوجيه الطرود
(السطر الثاني في المثال).
:::
:::
:::
:::
:::

::: {#s9 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[09]{.num}

## ip6tables و arptables

[▾]{.chev}
:::

::: chapBody
### []{.dot}ip6tables {#ip6tables .sub}

::: term
[ip6tables]{.en}[نسخة iptables الخاصة بـ IPv6]{.ar}
:::

::: {.box .def}
**التعريف** النسخة الخاصة بـ IPv6، نفس فكرة iptables لكن يعمل فقط مع
IPv6.
:::

    ip6tables -A INPUT -s 2001:db8::1 -j DROP

**الشرح:** تعني (Append/إضافة) قاعدة جديدة إلى السلسلة INPUT الخاصة
بالحزم التي تدخل إلى الجهاز (Incoming packets) من عنوان IP المصدر للحزم
وهو 2001:db8::1.

::: {.box .note}
بحيث يتم إسقاط الحزمة بدون أي رد وبالتالي الحزمة تُحذف وكأنها لم تصل،
والطرف المرسل لن يعرف لماذا لم يتم الرد. باستخدام DROP لا يتم إرسال رد
(على عكس REJECT الذي يرد برسالة رفض connection refused).
:::

### []{.dot}arptables {#arptables .sub}

::: term
[arptables]{.en}[جدار ناري خاص ببروتوكول ARP]{.ar}
:::

::: {.box .def}
**لماذا نحتاجه؟** عندما يريد جهاز إرسال بيانات إلى عنوان IP داخل الشبكة
يقوم بإرسال طلب [ARP Request]{.en
style="background:none;border:none;padding:0;"} ليعرف من يملك هذا IP،
ويقوم الجهاز الذي يملك هذا IP بالرد بعنوانه الفيزيائي [(MAC
Address)]{.en style="background:none;border:none;padding:0;"}.
:::

::: {.box .bad}
**المشكلة الأمنية** لأن ARP لا يحتوي على تشفير أو توثيق يمكن استغلاله
بسهولة في هجمات مثل **ARP Spoofing**. في هذا الهجوم المهاجم يرسل رسائل
ARP مزيفة يدّعي أنه يملك عنوان IP معين فيقوم بتوجيه الترافيك إليه
[(Man-in-the-Middle)]{.en
style="background:none;border:none;padding:0;"}.
:::

من خلال arptables يمكن وضع قواعد تمنع جهاز معين من إرسال ARP مزيّف، وكذلك
ربط IP معين بـ MAC محدد فقط.

**arptables** هو أداة في أنظمة لينوكس تُستخدم للتحكم في حزم بروتوكول
[Address Resolution Protocol (ARP)]{.en
style="background:none;border:none;padding:0;"}، وهو البروتوكول المسؤول
عن ربط عنوان IP بعنوان MAC داخل الشبكة المحلية (LAN). arptables متخصص في
بروتوكول ARP يتحكم في عمليات اكتشاف العناوين ويُستخدم لحماية الشبكة من
هجمات ARP Spoofing.

::: {.box .def}
**مثال 1: السماح فقط بربط IP بـ MAC محدد**

``` {style="margin:4px 0;"}
arptables -A INPUT -s 192.168.1.10 --source-mac ! 00:11:22:33:44:55 -j DROP
```

  --------------------- -----------------------
  -A INPUT              على الحزم الواردة
  -s 192.168.1.10       من IP معين
  \--source-mac         التحقق من MAC
  ! 00:11:22:33:44:55   إذا لم يكن هو هذا MAC
  -j DROP               يتم إسقاط الحزمة
  --------------------- -----------------------

::: {.box .warn style="margin-top:8px;"}
وبالتالي هذه القاعدة تقوم بحظر أي جهاز يدّعي هذا الـ IP لكن MAC مختلف.
:::
:::

::: {.box .def}
**مثال 2: السماح فقط بطلبات ARP Request**

``` {style="margin:4px 0;"}
arptables -A INPUT -p arp --arp-op Request -j ACCEPT
arptables -A INPUT -p arp --arp-op Reply -j DROP
```
:::
:::
:::
:::

::: {#s10 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[10]{.num}

## ebtables --- تصفية على مستوى الشبكة الجسرية

[▾]{.chev}
:::

::: chapBody
::: term
[ebtables]{.en}[جدار ناري لتصفية إطارات Ethernet]{.ar}
:::

::: {.box .def}
**الفرق الجوهري ⭐** ebtables يراقب ويفلتر **الإطارات (Frames)** وليس
الحزم (Packets)، حيث يقرر ebtables من يمر داخل السويتش نفسه (على مستوى
MAC)، أما iptables يقرر من يمر على الإنترنت (على مستوى IP).
:::

يُعدّ ebtables أداة قوية في نظام لينوكس تُستخدم لتصفية الحزم على مستوى
**الطبقة الثانية (Layer 2)** ضمن نموذج الشبكات، أي أنها تعمل مباشرةً على
إطار (Frame) البيانات بدلاً من العمل على عناوين IP كما في iptables.

تُستخدم ebtables بشكل أساسي مع جسر الشبكة [(bridge)]{.en
style="background:none;border:none;padding:0;"} الذي يربط بين عدة منافذ
شبكة، مما يجعلها مناسبة للتحكم في حركة المرور بين الأجهزة المتصلة داخل
نفس الشبكة المحلية (LAN).

::: {.box .note}
عند مرور أي حزمة عبر الجسر (Bridge)، يتم فحصها مقابل مجموعة من القواعد
(Rules) التي يحددها مدير النظام. كل قاعدة تتضمن شروط (مثل عنوان MAC
المصدر أو الوجهة) وإجراء (ACCEPT أو DROP أو REDIRECT). إذا تطابقت الحزمة
مع قاعدة معينة، يتم تنفيذ الإجراء المحدد عليها، وإلا يتم الانتقال إلى
القاعدة التالية.
:::

### []{.dot}الجداول (Tables) {#الجداول-tables .sub}

::: tblWrap
  الجدول   الوظيفة
  -------- ----------------------------------------
  filter   لتصفية الحزم (قبول/رفض)
  nat      لتعديل عناوين MAC (MAC NAT)
  broute   للتحكم في التوجيه (bridging + routing)
:::

### []{.dot}السلاسل (Chains) {#السلاسل-chains .sub}

::: tblWrap
  السلسلة                    الوظيفة
  -------------------------- --------------------------------
  INPUT                      الحزم القادمة إلى الجسر
  OUTPUT                     الحزم الخارجة من الجسر
  FORWARD                    الحزم المارة عبر الجسر
  PREROUTING / POSTROUTING   لمعالجة الحزم قبل وبعد التوجيه
:::
:::
:::
:::

::: {#s11 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[11]{.num}

## nftables --- الجيل الجديد لإدارة الجدار الناري

[▾]{.chev}
:::

::: chapBody
::: {.box .def}
**لماذا ظهر nftables؟** في أنظمة التشغيل الحديثة، يُعد التحكم في حركة
مرور الشبكة (Network Traffic) من أهم وظائف إدارة الأنظمة والأمن
السيبراني. تم استخدام iptables لكن مع تطور احتياجات الشبكات وزيادة
التعقيد، ظهرت أداة حديثة تُدعى **nftables**، والتي تمثل الجيل الجديد في
إدارة الجدار الناري داخل نظام Linux.
:::

**nftables** هو إطار عمل (Framework) خاص بفلترة الحزم (Packet Filtering)
وترجمة العناوين (NAT) في Linux، ويعمل كبديل مباشر للبنية القديمة الخاصة
بـ iptables.

::: {.box .good}
**التوحيد ⭐** يتميز nftables بأنه يدعم **IPv4** و **IPv6** ويدعم
**ARP** و **Bridge filtering**. يجمع عدة أدوات في نظام واحد موحد، أي أنه
يمثل حلاً شاملاً بدلاً من عدة أدوات منفصلة مثل:

::: {.pillrow style="margin-top:8px;"}
[iptables]{.pill .en style="font-family:var(--mono)"} [ip6tables]{.pill
.en style="font-family:var(--mono)"} [arptables]{.pill .en
style="font-family:var(--mono)"} [ebtables]{.pill .en
style="font-family:var(--mono)"}
:::
:::

::: {.box .warn}
**المشاكل التي عالجها nftables في iptables** تعقيد كتابة القواعد، تكرار
الأدوات، ضعف الأداء في بعض الحالات، وصعوبة إدارة القواعد الكبيرة. لذلك
جاء nftables ليقدم بنية أبسط وأداء أعلى وإدارة أكثر تنظيماً.
:::

### []{.dot}مميزات nftables ⭐ {#مميزات-nftables .sub}

::: steps
**Unified Interface (واجهة موحدة):** يجمع جميع وظائف iptables,
ip6tables, arptables, ebtables في واجهة واحدة، مما يقلل من التعقيد ويسهل
الإدارة.

**Simplified Syntax (صياغة أبسط):** أوضح وأقرب للغة طبيعية وأسهل في
القراءة والصيانة.

::: {.tblWrap style="margin-top:8px;"}
  iptables                               nftables
  -------------------------------------- ------------------------------------------------------
  iptables -A INPUT -s 1.2.3.4 -j DROP   nft add rule inet filter input ip saddr 1.2.3.4 drop
:::

**Better Performance (أداء أفضل):** في iptables كل قاعدة يتم فحصها بشكل
تسلسلي (Rule by Rule)، أما في nftables يُستخدم بنية بيانات متقدمة (sets,
maps) تقلل عدد الفحوصات وبالتالي سرعة أعلى + استهلاك أقل للموارد.
:::

::: {.box .note}
**مثال: بدلاً من تكرار القواعد لكل IP**

``` {style="margin:6px 0;"}
iptables -A INPUT -s 192.168.1.1 -j ACCEPT
iptables -A INPUT -s 192.168.1.2 -j ACCEPT
iptables -A INPUT -s 192.168.1.3 -j ACCEPT
```

**في nftables كلهم داخل Set واحدة (بحث أسرع):**

``` {style="margin:6px 0;"}
nft add set ip filter myset { type ipv4_addr\; }
nft add element ip filter myset { 192.168.1.1, 192.168.1.2, 192.168.1.3 }
```
:::

### []{.dot}دعم تعابير متقدمة (Rich Set of Expressions) {#دعم-تعابير-متقدمة-rich-set-of-expressions .sub}

nftables يسمح لك بعمل منطق متقدم جداً:

::: tblWrap
  المفهوم    الوظيفة
  ---------- ------------------------------------------------------------
  Sets       تخزين مجموعة IPs أو بورتات مفيدة جداً عوضاً عن تكرار القواعد
  Maps       ربط قيم ببعضها، كل IP له قرار مختلف بدون قواعد كثيرة
  Counters   عدد الترافيك ومعرفة كم مرة تم استخدام القاعدة
:::

    ip saddr map { 192.168.1.1 : accept, 192.168.1.2 : drop }
:::
:::
:::

::: {#s12 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[12]{.num}

## Application Level Gateway (البوابة التطبيقية) --- تفصيل إضافي

[▾]{.chev}
:::

::: chapBody
::: {.box .def}
**تُستخدم للوصل بين تطبيقات لا يمكنها التواصل مع بعضها مباشرة لعدة
أسباب**
:::

::: steps
**أسباب متعلقة بالحماية:** التطبيقات موجودة في شبكات مختلفة ولا يُسمح لها
بالتواصل مباشرة لأسباب متعلقة بالحماية. مثلاً قد يكون المستعرض في الشبكة
الداخلية والمخدم في شبكة خارجية مثلاً في الإنترنت.

**بروتوكولات مختلفة:** التطبيقات تستخدم بروتوكولات مختلفة، مثلاً شركة
تستخدم نظام بريد إلكتروني خاص وتريد تقديم خدماتها لزبائن يستخدمون IMAP.

**تحسين الأداء:** مثلاً يمكن استخدام وكيل ويب لحفظ الصفحات التي تم طلبها
مسبقاً (Cache).

**التأكد من هوية طالبي الخدمة:** مثلاً قد تسمح شركة ما بالوصول إلى
الإنترنت فقط لبعض موظفيها.
:::

### []{.dot}الفرق بين الموجّه (Router) والبوابة التطبيقية {#الفرق-بين-الموجه-router-والبوابة-التطبيقية .sub}

::: {.box .note}
بعكس الموجهات (Routers) التي توجه الطرود من شبكة لأخرى تستطيع
Application-level Gateway فحص حتى محتوى الطرود، أي تعمل على أعلى مستوى
من ISO/OSI.
:::

الفرق بين الموجه والبوابة التطبيقية مستخدماً مثال المستعرض الذي يريد
الاتصال بخدم ويب:

::: compareGrid
::: {.compareCard .a}
#### Router (الموجّه)

يمرّر الطرود صعوداً من Physical إلى Network Level فقط ثم ينزل مرة أخرى ---
لا يصل إلى Application Level. لا يفحص محتوى الطرد أو اسم المستخدم.
:::

::: {.compareCard .b}
#### Application Level Gateway

تعمل حتى مستوى Application Level --- تستقبل الطلب من الطرف الأول ثم
ترسله للمخدم بشكل منفصل، فلا يوجد وصلة مباشرة بين المستعرض والمخدم.
:::
:::

### []{.dot}حالة الموجه Router {#حالة-الموجه-router .sub}

يرسل المستعرض طلب HTTP مباشرة إلى مخدم الوب عبر الموجه، قد يعيد الموجه
كتابة عنوان المصدر في الطرد [SNAT]{.en
style="background:none;border:none;padding:0;"} وقد يطبق على الطرد
مجموعة قواعد ليقرر إن كان سيسمح له بالمرور أم لا، ولكن الموجه لا يفحص
محتوى الطرد أو اسم المستخدم.

### []{.dot}حالة البوابة التطبيقية --- Web proxy {#حالة-البوابة-التطبيقية-web-proxy .sub}

في حالة البوابة التطبيقية --- وفي هذه الحالة تمثل البوابة مخدم وب وكيل
[(http Web proxy server)]{.en
style="background:none;border:none;padding:0;"} --- يرسل المستعرض الطلب
إلى الوكيل الذي يقوم بإرسال طلبه الخاص إلى المخدم ومن ثم يسلّم الطرود
العائدة من المخدم إلى المستعرض؛ أي لا يوجد وصلة مباشرة بين المستعرض
والمخدم.

بإمكان الوكيل فحص محتوى طلب [http]{.en
style="background:none;border:none;padding:0;"}، أو يمكن أن يقوم بتخزين
(cache) للصفحة المعادة. برنامج **Squid** (
[http://sourceforge.net/projects/squid/](http://sourceforge.net/projects/squid/){style="color:var(--blue-600)"
target="_blank"} ) هو مثال عن مخدم وكيل http مفتوح المصدر.

::: compareGrid
::: {.compareCard .a}
#### ✅ فوائد (Advantages)

-   التحقق من هوية المستخدم: يمكنه التأكد من اسم المستخدم وكلمة المرور
-   فحص محتوى البيانات (Payload Inspection): يفحص محتوى الطلب نفسه
:::

::: {.compareCard .b}
#### ⚠️ مساوئ (Disadvantages)

-   الأداء أبطأ: لأنه يفحص كل شيء بعمق (Deep Inspection) --- يعمل على
    طبقة 7
-   يحتاج إعداد من المستخدم (Proxy Configuration) --- إدخال IP البروكسي
    في المتصفح
-   يحتاج Proxy منفصل لكل تطبيق: FTP Proxy - SMTP Proxy - IMAP Proxy مما
    يزيد التعقيد في الإدارة
:::
:::
:::
:::
:::

::: {#s13 .section .chapter}
::: chapCard
::: {.chapHead onclick="toggleCard(this)"}
[13]{.num}

## أهم الشهادات العالمية في أمن الشبكات

[▾]{.chev}
:::

::: chapBody
::: {.box .note}
هذا الموضوع أقل احتمالاً في الامتحان (تفصيلي/معلوماتي) لكن يجب معرفة
المستوى العام لكل شهادة.
:::

::: tblWrap
  المستوى   الشهادة               الوصف
  --------- --------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  مبتدئ     CompTIA Security+     أشهر شهادة بداية في الأمن السيبراني، سهلة نسبياً مقارنة بغيرها، تغطي أساسيات الشبكات والأمن والتهديدات والهجمات والتشفير وإدارة المخاطر.
  متوسط     Cisco CCNA Security   تم دمجها لاحقاً ضمن Cisco CCNP Security. ركّزت على حماية أجهزة التوجيه والمبدّلات من التهديدات الشائعة، وتطبيق ميزات الأمان مثل ACLs، VPN، Firewall، ونظام منع التطفل IDS/IPS. مناسبة لمن يريد العمل كـ Network Security Engineer.
  متوسط     CompTIA CySA+         تركيزها على التحليل وليس الهجوم، حيث تركز على منهجيات تحليل بيانات الأمن، ورصد الأنشطة غير الطبيعية، وتقييم الثغرات. الاختبار: نحو 85 سؤالاً، مدة 165 دقيقة، درجة النجاح 750 من أصل 900.
  متقدم     CISSP                 Certified Information Systems Security Professional --- من أقوى الشهادات عالمياً، اعتماد مهني متقدم في مجال أمن المعلومات، تثبت قدرة حامليها على تصميم وتنفيذ وإدارة برامج أمن المعلومات الشاملة. يجب استكمال 120 ساعة تعليم مستمر (CPE) خلال كل فترة تجديد.
  متقدم     CISM                  Certified Information Security Manager --- تركز بشكل خاص على إدارة وتطوير برامج أمن المعلومات في المؤسسات.
  متقدم     CISA                  Certified Information Systems Auditor --- مخصصة للمدققين والمراقبين لنظم المعلومات لضمان الامتثال والمعايير الأمنية.
:::
:::
:::
:::

ملخص دراسي لمادة أمن الشبكات --- أُعدّ للمراجعة السريعة قبل الامتحان ·
جميع المحتويات من محاضرات الجدار الناري المرفوعة فقط
:::
:::

↑
