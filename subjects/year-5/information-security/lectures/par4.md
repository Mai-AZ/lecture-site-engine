::: top-header
🌙 [الوضع الداكن]{#themeLabel}

☰

::: laptop
::: laptop-screen
::: laptop-display
University\
of Homs
:::
:::

::: laptop-base
:::

::: laptop-stand
:::
:::

# أمن المعلومات --- المحاضرة الرابعة

## تبادل المفاتيح (Key Exchange)

::: lecturer
د. لارا علي
:::

::: search-wrap
[🔍]{.search-icon}
:::
:::

::: layout
### المحتويات

[1. MAC](#mac) [2. الشهادة الرقمية](#cert) [3. مشكلة تبادل المفتاح
المتناظر](#sym-intro) [4. المفاهيم الأساسية](#basics) [5. طرق نقل
المفتاح](#transport) [6. KDC والمفتاح الرئيسي](#kdc) [7. البروتوكول
البسيط](#simple) [8. Needham-Schroeder (Shared-Key)](#ns-shared) [9.
Decentralized Key Distribution](#decentralized) [10. نقل المفاتيح (تشفير
غير متناظر)](#async-transport) [11. Public-Key
Needham-Schroeder](#ns-public) [12. الاتفاق على المفتاح
(Diffie-Hellman)](#dh) [13. جدول مقارنة شامل](#compare) [14. أسئلة
تفاعلية (20 سؤال)](#mcqs) [15. المراجعة السريعة](#revision)

::: sidebar-note
💡 اضغط على أي عنوان للانتقال إليه مباشرة. استخدم مربع البحث أعلاه
لتصفية المواضيع.
:::

::: {.main role="main"}
::: {#mac .section .content-section}
## 1️⃣ MAC (Message Authentication Code)

يُستخدم **MAC** للتحقق من **الموثوقية (authenticity)** و**السلامة
(integrity)** للرسالة أثناء انتقالها بين طرفين.

::: {.box .box-def}
::: box-title
📌 التعريف
:::

يتم حساب MAC من خلال تشفير ناتج **hash function** باستخدام **shared
key** (مفتاح مشترك). وبالتالي فإن حساب MAC يعتمد على عنصرين معاً: [hash
function]{.ltr} + **التشفير المتناظر**.
:::

### آلية العمل (خطوة بخطوة)

1.  تحسب **Alice** قيمة hash للرسالة (message).
2.  تُشفَّر قيمة الـ hash باستخدام المفتاح المشترك [KEY]{.ltr} لإنتاج
    [MAC]{.ltr}.
3.  تُرسل Alice الرسالة مرفقة بقيمة MAC: [message, MAC(KEY,
    message)]{.ltr}.
4.  يستقبل **Bob** الرسالة، ويعيد حساب MAC بنفس الطريقة باستخدام نفس
    المفتاح المشترك.
5.  يقارن Bob القيمة المحسوبة لديه مع القيمة المستلمة؛ فإن تطابقتا،
    فالرسالة أصيلة وسليمة (لم تتغير ولم تأتِ من طرف مزيف).

::: seq-diagram
::: seq-actors
AliceBob
:::

::: seq-step
::: seq-parties
[1]{.seq-num} Alice [⟶]{.seq-arrow} Bob
:::

::: seq-message
message , MAC(KEY, message)
:::

::: seq-note
حيث MAC(KEY, message) = Encrypt~KEY~( Hash(message) )
:::
:::

::: seq-step
::: seq-parties
[2]{.seq-num} Bob يعيد الحساب محلياً
:::

::: seq-message
MAC\' = Encrypt(KEY, Hash(message received))
:::

::: seq-note
ثم يقارن: هل MAC\' = MAC المستلمة؟
:::
:::
:::

::: {.box .box-important}
::: box-title
⚠️ Exam Important
:::

MAC يعتمد دائماً على عنصرَين معاً: [hash function]{.ltr} + **تشفير متناظر**
(وليس تشفيراً غير متناظر).
:::

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

MAC = Hash + Encrypt(shared key) → فكّر به كـ\"بصمة سريعة\" يستطيع فقط من
يملك نفس المفتاح المشترك التحقق منها أو توليدها.
:::
:::

::: {#cert .section .content-section}
## 2️⃣ الشهادة الرقمية (Digital Certificate)

عند استخدام **التشفير غير المتناظر**، يبرز سؤال جوهري: كيف يتأكد المرسل
والمستقبل أنهما يشفّران باستخدام **المفتاح العام الحقيقي** للطرف الآخر
الموثوق، وليس بمفتاح عام لمهاجم انتحل الهوية؟ أي: **كيف يمكن تبادل
المفاتيح العامة بشكل آمن؟**

::: {.box .box-def}
::: box-title
📌 الحل: الشهادة الرقمية
:::

الشهادة الرقمية تربط **الهوية** مع **المفتاح العام**. تُصدر هذه الشهادة
جهة موثوقة تُعرف باسم **سلطة الشهادة CA (Certificate Authority)**.
:::

### محتويات الشهادة الرقمية

-   معلومات عن **مالك الشهادة** (Subject).
-   **المفتاح العام** لصاحب الشهادة.
-   **تاريخ صلاحية** الشهادة (بداية ونهاية).
-   **توقيع رقمي** صادر عن CA.

::: {.box .box-warning}
::: box-title
📎 ملاحظة
:::

بشكل عام، تتواجد شهادات جهات المنح CA بشكل مسبق ضمن أنظمة التشغيل
والمتصفحات، **دون الحاجة للوصول إليها عبر الإنترنت** من الجهة المُصدرة.
:::

### المعيار العالمي: X.509 Certificates

[X.509]{.ltr} هو **المعيار العالمي (Standard)** الذي يحدد التنسيق
والهيكلية التي يجب أن تكون عليها كل الشهادات الرقمية.

::: table-wrap
  الحقل (Field)                        الوصف
  ------------------------------------ ---------------------------------------------------
  Version                              رقم إصدار الشهادة
  Certificate Serial Number            الرقم التسلسلي الفريد للشهادة
  Signature algorithm identifier       معرّف خوارزمية التوقيع (algorithm + parameters)
  Issuer Name                          اسم الجهة المُصدرة (CA)
  Period of validity                   تاريخ البداية (not before) والنهاية (not after)
  Subject Name                         اسم مالك الشهادة
  Subject\'s public key info           المفتاح العام لصاحب الشهادة وخوارزميته
  Issuer / Subject Unique Identifier   معرّفات فريدة (من الإصدار 2 فما فوق)
  Extensions                           حقول إضافية (الإصدار 3 فقط)
  Signature                            التوقيع الرقمي المشفّر الذي يغطي كل الحقول السابقة
:::

::: {.box .box-example}
::: box-title
🧪 مثال من المحاضرة
:::

يمكن معاينة الشهادة الرقمية الفعلية لموقع [Google]{.ltr} مباشرة من خلال
المتصفح، حيث تظهر تفاصيل مثل الجهة المصدرة، وتاريخ الصلاحية، والمفتاح
العام.
:::

### خطوات التحقق من شهادة رقمية مستلمة

1.  التحقق من **الصلاحية** (أن الشهادة ضمن الفترة الزمنية المسموحة).
2.  التحقق من **اسم المالك**.
3.  حساب [Hash function]{.ltr} على أجزاء الرسالة (الشهادة) **ما عدا**
    التوقيع الرقمي نفسه.
4.  مقارنة ناتج الـ Hash مع التوقيع الرقمي بعد **فك تشفيره باستخدام
    المفتاح العام للجهة المانحة CA**.
5.  إذا تطابقت القيمتان، تكون الشهادة صحيحة وموثوقة.

::: {.box .box-important}
::: box-title
⚠️ Exam Important
:::

التحقق من التوقيع الرقمي للشهادة يتم بفك تشفيره باستخدام **المفتاح العام
لجهة CA** --- وليس بمفتاح صاحب الشهادة نفسه.
:::
:::

::: {#sym-intro .section .content-section}
## 3️⃣ تبادل المفاتيح في التشفير المتناظر

**التشفير المتناظر (Symmetric Encryption)** يعتمد على وجود **مفتاح مشترك
واحد** يُستخدم لكل من التشفير وفك التشفير.

::: {.box .box-warning}
::: box-title
❓ المشكلة الجوهرية
:::

عند وجود طرفين (مرسل ومستقبل)، كيف يمكن نقل المفتاح المشترك بينهما بحيث
يبقى **آمناً وسرياً** أثناء النقل؟
:::

هذا السؤال هو محور بقية المحاضرة.
:::

::: {#basics .section .content-section}
## 4️⃣ المفاهيم الأساسية

::: {.box .box-def}
::: box-title
📌 Key establishment (إنشاء المفتاح)
:::

عملية أو بروتوكول لإنشاء مفتاح سري بين طرفين أو أكثر، حتى يُستخدم في
التشفير المتناظر.
:::

إنشاء المفتاح يمكن أن يتم وفقاً لإحدى طريقتين:

::: table-wrap
  -----------------------------------------------------------------------
  الطريقة                             التعريف
  ----------------------------------- -----------------------------------
  **Key transport**\                  أحد الأطراف ينشئ (أو يحصل على)
  (نقل المفتاح)                       المفتاح السري، وينقله بشكل آمن إلى
                                      بقية الأطراف.

  **Key agreement**\                  يتم استخراج / استنتاج المفتاح من
  (الاتفاق على المفتاح)               قيَم (أو معلومات) يساهم بها كل طرف
                                      من الطرفين معاً.
  -----------------------------------------------------------------------
:::

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

[Transport]{.ltr} = طرف واحد \"يصنع ويرسل\" المفتاح.   [Agreement]{.ltr}
= الطرفان \"يتفقان معاً\" على المفتاح دون أن يرسله أحدهما مباشرة (مثال:
Diffie-Hellman لاحقاً).
:::
:::

::: {#transport .section .content-section}
## 5️⃣ نقل المفتاح (Key Transport)

يمكن لطرفين A و B تحقيق نقل المفتاح من خلال إحدى الطرق التالية:

1.  يختار [A]{.ltr} المفتاح، ويسلّمه فعلياً (تسليم باليد) إلى [B]{.ltr}.
2.  يختار طرف ثالث [C]{.ltr} المفاتيح، ويسلّمها فعلياً إلى A و B --- وهو
    مناسب لكنه **غير قابل للتوسّع**: إذا وُجد N طرف يكون عدد المفاتيح
    [N(N-1)/2]{.ltr .formula}.
3.  يختار A مفتاحاً جديداً، ويرسله مشفّراً باستخدام المفتاح القديم السابق
    إلى B، لكن **الأمان ينهار بالكامل** في حال اكتُشف أي مفتاح سابق.
4.  يختار طرف ثالث C المفتاح، ويرسله مشفّراً إلى كل من A و B، باستخدام
    المفتاح المشترك بين A,C والمفتاح المشترك بين B,C.
5.  التوزيع باستخدام **التشفير بالمفتاح العام** (Public-Key Encryption).

::: {.box .box-warning}
::: box-title
⚠️ مشكلة قابلية التوسّع
:::

الطريقة الثانية تعاني من مشكلة [scalability]{.ltr}: كلما زاد عدد الأطراف
N، ازداد عدد المفاتيح المطلوبة وفق الصيغة [N(N-1)/2]{.ltr .formula}.
:::

::: {.box .box-important}
::: box-title
⚠️ Exam Important
:::

احفظ الصيغة [N(N-1)/2]{.ltr .formula} جيداً --- فهي شائعة الورود في
الامتحان لحساب عدد المفاتيح اللازمة عند توزيع المفاتيح مركزياً بين N طرف.
:::
:::

::: {#kdc .section .content-section}
## 6️⃣ نقل المفاتيح باستخدام طرف ثالث (KDC)

::: {.box .box-def}
::: box-title
📌 التعريف
:::

الطرف الثالث في توزيع المفاتيح يُسمى **KDC (Key Distribution Center)**.
يعتمد استخدامه على **تسلسل هرمي للمفاتيح**، ويُستخدم مستويان من المفاتيح
كحد أدنى.
:::

::: table-wrap
  -----------------------------------------------------------------------
  النوع                               التعريف
  ----------------------------------- -----------------------------------
  **Master Key**\                     مفتاح **دائم** يُستخدم بين KDC
  (المفتاح الرئيسي)                   والطرف المعني، لتشفير نقل مفاتيح
                                      الجلسة.

  **Session Key**\                    مفتاح تشفير **مؤقت** يُستخدم بين
  (مفتاح الجلسة)                      طرفين، ويبقى مستخدماً طوال مدة
                                      الاتصال المنطقي فقط.
  -----------------------------------------------------------------------
:::

::: {.box .box-example}
::: box-title
📎 ملاحظة من المحاضرة
:::

إذا كان هناك N طرف، فإن هذه الطريقة تحتاج إلى توزيع **N** مفتاح رئيسي
فقط في البداية --- وهذا أقل بكثير من [N(N-1)/2]{.ltr .formula}.
:::

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

[Master Key]{.ltr} = دائم بين الطرف و KDC.   [Session Key]{.ltr} = مؤقت
بين الطرفين لمدة الجلسة فقط، ويُنشأ ويُشفَّر عبر الـ Master Key.
:::
:::

::: {#simple .section .content-section}
## 7️⃣ البروتوكول البسيط (Simple Protocol)

يوضح هذا البروتوكول الفكرة الأساسية لاستخدام KDC في توزيع **مفتاح جلسة
(session key)** بين طرفين A و B، عبر **3 خطوات** فقط.

::: seq-diagram
::: seq-actors
AliceKDCBob
:::

::: seq-step
::: seq-parties
[1]{.seq-num} Alice [⟶]{.seq-arrow} KDC
:::

::: seq-message
{ request for session key for Bob } K~A,C~
:::
:::

::: seq-step
::: seq-parties
[2]{.seq-num} KDC [⟶]{.seq-arrow} Alice
:::

::: seq-message
{ K~s~ } K~A,C~  \|\|  { K~s~ } K~B,C~
:::
:::

::: seq-step
::: seq-parties
[3]{.seq-num} Alice [⟶]{.seq-arrow} Bob
:::

::: seq-message
{ K~s~ } K~B,C~
:::
:::
:::

### شرح الخطوات

1.  تطلب A من KDC مفتاح جلسة للتواصل مع B، وتُرسل الطلب مشفّراً بالمفتاح
    المشترك بينها وبين KDC (K~A,C~).
2.  يرد KDC على A بمفتاح الجلسة K~s~ مشفّراً **مرتين**: نسخة تستطيع A فك
    تشفيرها (بمفتاحها)، ونسخة أخرى مُعدّة أصلاً لـ B (مشفّرة بمفتاح B) لا
    تستطيع A فتحها.
3.  تُعيد A توجيه (forward) النسخة المخصصة لـ B إليه، فيحصل B على مفتاح
    الجلسة بأمان.

::: {.box .box-warning}
::: box-title
⚠️ نقطة الضعف
:::

هذا البروتوكول **بحاجة إلى توثيق (authentication) وحماية من هجوم إعادة
التشغيل (replay attack)**، إذ لا يحتوي على أي وسيلة (مثل [nonce]{.ltr})
تضمن حداثة الرسائل. لهذا طُوِّر بروتوكول **Needham-Schroeder** لمعالجة هذا
القصور.
:::
:::

::: {#ns-shared .section .content-section}
## 8️⃣ Needham-Schroeder Shared-Key Protocol [خوارزمية مهمة]{.badge}

**الفكرة:** تحسين البروتوكول البسيط عبر إضافة **nonce عشوائي وحديث** في
كل تبادل، لضمان أن الرسائل حديثة وليست معادة من محادثة سابقة (حماية من
[replay attack]{.ltr})، وأن كل طرف متأكد أنه يتواصل فعلاً مع الطرف
الحقيقي ([Key authentication]{.ltr}).

::: {.box .box-def}
::: box-title
📌 Nonce
:::

قيمة عشوائية تُستخدم مرة واحدة فقط، ويمكن أن تكون **عداداً (counter)**، أو
**ختماً زمنياً (timestamp)**، أو **رقماً عشوائياً**.
:::

::: seq-diagram
::: seq-actors
AliceKDCBob
:::

::: seq-step
::: seq-parties
[1]{.seq-num} Alice [⟶]{.seq-arrow} KDC
:::

::: seq-message
N~1~ , Alice , Bob
:::
:::

::: seq-step
::: seq-parties
[2]{.seq-num} KDC [⟶]{.seq-arrow} Alice
:::

::: seq-message
Encrypt~K(Alice)~( N~1~, \"Bob\", K~AB~,
Encrypt~K(Bob)~(K~AB~,\"Alice\") )
:::

::: seq-note
الجزء الداخلي Encrypt~K(Bob)~(K~AB~,\"Alice\") يُسمى **ticket**
:::
:::

::: seq-step
::: seq-parties
[3]{.seq-num} Alice [⟶]{.seq-arrow} Bob
:::

::: seq-message
ticket
:::
:::

::: seq-step
::: seq-parties
[4]{.seq-num} Bob [⟶]{.seq-arrow} Alice
:::

::: seq-message
Encrypt~K(AB)~( N~2~ )
:::
:::

::: seq-step
::: seq-parties
[5]{.seq-num} Alice [⟶]{.seq-arrow} Bob
:::

::: seq-message
Encrypt~K(AB)~( N~2~ + 1 )
:::
:::
:::

### شرح الخطوات

1.  تُرسل A إلى KDC طلباً يحتوي على nonce عشوائي حديث N1 مع هويتَي Alice
    وBob.
2.  يُنشئ KDC مفتاح جلسة جديداً عشوائياً K~AB~ (يعرف KDC المفتاحين السريين
    لكلا الطرفين)، ويرسله إلى A مشفّراً بمفتاحها، متضمناً: N1 (لإثبات أن
    الرد مرتبط بطلبها)، هوية Bob، مفتاح الجلسة K~AB~، بالإضافة إلى
    **ticket** مُعدّ مسبقاً لـ Bob.
3.  تُرسل A الـ ticket إلى B كما هو (لا تستطيع فتحه لأنه مشفّر بمفتاح
    Bob).
4.  يفك B تشفير الـ ticket فيحصل على K~AB~، ثم يُرسل إلى A nonce أخرى N2
    مشفّرة بمفتاح الجلسة، للتأكد أن A فعلاً تملك المفتاح.
5.  تُثبت A استلامها N2 بصحة بإرسال Encrypt(K~AB~, N2+1)، فيتأكد Bob أن
    الطرف الآخر هو Alice فعلاً.

::: {.box .box-important}
::: box-title
⚠️ Exam Important
:::

الهدف من الخطوتين 4 و5 (تبادل N2 ثم N2+1) هو **توثيق متبادل (mutual key
confirmation)**: يتأكد Bob أن الطرف الآخر يملك فعلاً مفتاح الجلسة K~AB~.
:::

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

الفرق عن البروتوكول البسيط بحرف واحد: **N** (nonce). كل تبادل هنا محمي
بـ nonce جديد يمنع إعادة استخدام رسائل قديمة.
:::
:::

::: {#decentralized .section .content-section}
## 9️⃣ Decentralized Key Distribution Scenario

::: {.box .box-def}
::: box-title
📌 الفكرة
:::

في هذا السيناريو **اللامركزي**، **لا يوجد طرف ثالث (KDC)**؛ بل يمتلك
الطرفان (Alice وBob) **مفتاحاً رئيسياً مشتركاً مسبقاً MK~m~** يستخدمانه
مباشرة لتأمين إنشاء مفتاح الجلسة.
:::

::: seq-diagram
::: seq-actors
AliceBob
:::

::: seq-step
::: seq-parties
[1]{.seq-num} Alice [⟶]{.seq-arrow} Bob
:::

::: seq-message
N~1~ , ID~Alice~ , ID~Bob~
:::
:::

::: seq-step
::: seq-parties
[2]{.seq-num} Bob [⟶]{.seq-arrow} Alice
:::

::: seq-message
Encrypt~MKm~( K~AB~, ID~Alice~, ID~Bob~, f(N~1~), N~2~ )
:::
:::

::: seq-step
::: seq-parties
[3]{.seq-num} Alice [⟶]{.seq-arrow} Bob
:::

::: seq-message
Encrypt~K(AB)~( f(N~2~) )
:::
:::
:::

### شرح الخطوات

1.  تُرسل Alice إلى Bob nonce حديث N1 مع هويتَي الطرفين.
2.  يُنشئ Bob مفتاح الجلسة K~AB~، ويرسله إلى Alice مشفّراً بالمفتاح الرئيسي
    المشترك MK~m~، متضمناً: مفتاح الجلسة، هويتَي الطرفين، دالة على N1
    (لإثبات حداثة الرد وربطه بطلب Alice)، إضافة إلى nonce جديدة N2 من
    Bob.
3.  تُثبت Alice استلامها الصحيح بإرسال Encrypt(K~AB~, f(N2)) إلى Bob،
    مستخدمة مفتاح الجلسة الجديد نفسه.

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

**Decentralized** = لا KDC! كل زوج من الأطراف يملك [Master Key]{.ltr}
خاصاً به مسبقاً بدلاً من الاعتماد على مركز موزّع مركزي واحد.
:::
:::

::: {#async-transport .section .content-section}
## 🔟 نقل المفاتيح باستخدام التشفير غير المتناظر

يتم من خلال خطوتين:

1.  الحصول على **مفتاح عام أصلي**، والتحقق منه من خلال **الشهادة
    الرقمية** الصادرة عن CA موثوقة.
2.  استخدام **تشفير المفتاح العام** لتوزيع المفتاح السري.

::: {.box .box-important}
::: box-title
⚠️ Exam Important
:::

لاحظ الربط المباشر مع موضوع الشهادات الرقمية (القسم 2): فالخطوة الأولى
هنا هي بالضبط ما تحققه الشهادة الرقمية.
:::
:::

::: {#ns-public .section .content-section}
## 1️⃣1️⃣ Public-Key Needham-Schroeder Protocol

**الفكرة:** نسخة من بروتوكول Needham-Schroeder تعتمد على **التشفير
بالمفتاح العام** بدلاً من التشفير المتناظر، وتُستخدم لتحقيق **توثيق الهوية
(Entity authentication)** بين طرفين دون أي طرف ثالث.

::: seq-diagram
::: seq-actors
AliceBob
:::

::: seq-step
::: seq-parties
[1]{.seq-num} Alice [⟶]{.seq-arrow} Bob
:::

::: seq-message
Encrypt~PublicKey(Bob)~( \"Alice\", N~A~ )
:::
:::

::: seq-step
::: seq-parties
[2]{.seq-num} Bob [⟶]{.seq-arrow} Alice
:::

::: seq-message
Encrypt~PublicKey(Alice)~( N~A~, N~B~ )
:::
:::

::: seq-step
::: seq-parties
[3]{.seq-num} Alice [⟶]{.seq-arrow} Bob
:::

::: seq-message
Encrypt~PublicKey(Bob)~( N~B~, Encrypt~PrivateKey(Alice)~( K~s~ ) )
:::
:::
:::

### شرح الخطوات

1.  تُرسل Alice هويتها (\"Alice\") مع nonce عشوائي حديث خاص بها N~A~،
    مشفّرة بالمفتاح العام لـ Bob (لا يفتحها سوى Bob بمفتاحه الخاص).
2.  يفك Bob التشفير، ويرد بإرسال N~A~ نفسها (إثباتاً لاستلامه الرسالة
    وفكها بنجاح) مع nonce جديدة خاصة به N~B~، مشفّرتين معاً بالمفتاح العام
    لـ Alice.
3.  تتأكد Alice أن الطرف المقابل هو Bob فعلاً (لأنه أعاد N~A~ بنجاح)،
    فترسل N~B~ (لإثبات هويتها بالمقابل) مع مفتاح جلسة سري K~s~ موقّع
    بمفتاحها الخاص، ثم مشفّر بمفتاح Bob العام.

::: {.box .box-important}
::: box-title
⚠️ Exam Important
:::

الفرق الجوهري عن نسخة KDC: هنا **لا يوجد طرف ثالث إطلاقاً**. التوثيق ونقل
المفتاح يتمّان مباشرة بين Alice وBob، بافتراض أن كلاً منهما يعرف مسبقاً
المفتاح العام الحقيقي للآخر (والذي تحقق عبر شهادة رقمية).
:::
:::

::: {#dh .section .content-section}
## 1️⃣2️⃣ الاتفاق على المفتاح (Key Agreement) --- خوارزمية Diffie-Hellman

يتم الاتفاق على المفتاح من خلال خوارزمية **Diffie-Hellman**، لكن يجب
أولاً فهم مفهومين رياضيين أساسيين: [a^m^ (mod n)]{.ltr .formula}
و**اللوغاريتم المتقطع (Discrete Logarithms)**.

### أ) الجذر الأولي (Primitive Root)

::: {.box .box-def}
::: box-title
📌 التعريف
:::

لدينا المعادلة [a^m^ (mod n) = 1]{.ltr .formula}. أصغر أُس [m]{.ltr}
تتحقق عنده هذه المعادلة يُسمى **ترتيب a mod n (order)**. فإذا كان [m =
φ(n)]{.ltr .formula} (دالة أويلر)، فإن [a]{.ltr} يُسمى **جذراً أولياً
(Primitive Root)** لـ n.
:::

::: {.box .box-example}
::: box-title
🧪 مثال محلول (كما ورد بالمحاضرة)
:::

**n = 5 , a = 2**

::: {.seq-message style="margin-inline-start:0;"}
2^1^ mod 5 = 2\
2^2^ mod 5 = 4\
2^3^ mod 5 = 3\
2^4^ mod 5 = 1   ← تحققت المعادلة هنا عند m = 4
:::

بما أن [φ(5) = 4 = m]{.ltr .formula}، فإن **a = 2 جذر أولي (Primitive
Root) لـ n = 5**.
:::

### ب) اللوغاريتم المتقطع (Discrete Logarithm)

::: {.box .box-def}
::: box-title
📌 التعريف
:::

**المسألة العكسية** للأسس هي إيجاد اللوغاريتم المتقطع: يجب إيجاد قيمة
[x]{.ltr} في [a^x^ ≡ b (mod n)]{.ltr .formula}، وتُكتب بالشكل: [x ≡
log~a~ b (mod n)]{.ltr .formula}.
:::

إذا كان [a]{.ltr} **جذراً أولياً** لـ n، فإن x موجود دائماً؛ وإلا فقد لا
يكون x موجوداً.

::: {.box .box-example}
::: box-title
🧪 أمثلة محلولة (كما وردت بالمحاضرة)
:::

[x = log~3~ 4 mod 13]{.ltr .formula} (أي 3^x^ = 4 mod 13) ← هنا **x غير
موجودة**.

[x = log~2~ 3 mod 13 = 4]{.ltr .formula}
:::

::: {.box .box-warning}
::: box-title
⚠️ أهمية أمنية
:::

يُعتبر إيجاد اللوغاريتمات المتقطعة في الحساب النمطي **مسألة صعبة حسابياً
(computationally hard)** --- وهذه الصعوبة هي أساس أمان خوارزمية
Diffie-Hellman.
:::

### ج) خطوات خوارزمية Diffie-Hellman

1.  يتفق المستخدمون على معلومتين عامتين: [q]{.ltr} (عدد أولي كبير)،
    [α]{.ltr} (جذر أولي لـ q).
2.  كل مستخدم A يولّد زوج مفاتيح:
    -   المفتاح السري: [X~A~ \< q]{.ltr .formula}
    -   المفتاح العام: [Y~A~ = α^X(A)^ mod q]{.ltr .formula}
3.  يرسل كل مستخدم للطرف الآخر مفتاحه العام الذي ولّده.
4.  يُحسب المفتاح المشترك بين A,B كالتالي:

    ::: {.seq-message style="margin-inline-start:0; margin-top:8px;"}
    K~AB~ = Y~A~^X(B)^ mod q  (يستطيع B حسابه)\
        = Y~B~^X(A)^ mod q  (يستطيع A حسابه)\
        = α^X(A)·X(B)^ mod q
    :::
5.  يكون K~AB~ هو المفتاح السري المشترك، ويُستخدم للتشفير المتناظر بين A
    و B.

::: {.box .box-example}
::: box-title
🧪 مثال محلول كامل (كما ورد بالمحاضرة)
:::

**q = 5 , α = 2**

::: {.seq-message style="margin-inline-start:0;"}
Alice: المفتاح السري X~A~ = 4  →  المفتاح العام Y~A~ = 2^4^ mod 5 = 1\
Bob: المفتاح السري X~B~ = 3  →  المفتاح العام Y~B~ = 2^3^ mod 5 = 3\
\
حساب المفتاح المشترك:\
Alice: K~AB~ = Y~B~^X(A)^ mod 5 = 3^4^ mod 5 = 1\
Bob:   K~AB~ = Y~A~^X(B)^ mod 5 = 1^3^ mod 5 = 1
:::

وبالتالي **K~AB~ = 1** هو المفتاح المشترك للتشفير المتناظر بين Alice و
Bob.
:::

::: {.box .box-important}
::: box-title
⚠️ Exam Important
:::

أمان Diffie-Hellman يعتمد على **صعوبة حساب اللوغاريتم المتقطع**؛ فحتى لو
اعترض مهاجم القيم العامة (q, α, Y~A~, Y~B~)، لا يستطيع عملياً استخراج
X~A~ أو X~B~ منها لحساب المفتاح المشترك.
:::

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

في Diffie-Hellman، كل طرف \"يخلط\" سرّه الخاص مع الأساس العام α مرة، ثم
\"يعيد الخلط\" بالمفتاح العام للطرف الآخر --- لينتج الطرفان **نفس**
المفتاح المشترك، دون أن يُرسل أي منهما مفتاحه السري عبر الشبكة إطلاقاً.
:::
:::

::: {#compare .section .content-section}
## 1️⃣3️⃣ جدول مقارنة شامل بين بروتوكولات تبادل المفاتيح

::: table-wrap
  --------------------------------------------------------------------------------
  البروتوكول           نوع التشفير    يحتاج طرف ثالث الحماية من     عدد الرسائل
                                      (KDC)؟         Replay         
  -------------------- -------------- -------------- -------------- --------------
  البروتوكول البسيط    متناظر         نعم            ❌ لا يوجد     3

  Needham-Schroeder\   متناظر         نعم            ✅ نعم (N1,    5
  (Shared-Key)                                       N2)            

  Decentralized Key\   متناظر (Master لا             ✅ نعم (N1,    3
  Distribution         Key مباشر)                    N2)            

  Public-Key\          غير متناظر     لا             ✅ نعم (N~A~,  3
  Needham-Schroeder                                  N~B~)          

  Diffie-Hellman       Key Agreement  لا             يعتمد على      2 (تبادل
                                                     صعوبة discrete مفاتيح عامة)
                                                     log            
  --------------------------------------------------------------------------------
:::

::: {.box .box-important}
::: box-title
⚠️ Exam Important
:::

السؤال الأكثر شيوعاً في الامتحان: \"ما الفرق بين البروتوكول البسيط
وNeedham-Schroeder؟\" → الإجابة دائماً: **nonce** والحماية من **replay
attack**.
:::
:::

::: {#mcqs .section .content-section}
## 1️⃣4️⃣ أسئلة تفاعلية للمراجعة (20 سؤال)

اضغط على أي إجابة لمعرفة إن كانت صحيحة، مع عرض الشرح مباشرة.

::: {.mcq q="1"}
::: mcq-q
[1]{.qnum} على ماذا يعتمد حساب MAC (Message Authentication Code)؟
:::

::: mcq-options
::: {.option correct="false"}
hash function فقط
:::

::: {.option correct="true"}
hash function + تشفير متناظر (shared key)
:::

::: {.option correct="false"}
تشفير غير متناظر فقط
:::

::: {.option correct="false"}
hash function + تشفير غير متناظر
:::
:::

::: explanation
يعتمد حساب MAC على تشفير ناتج hash function باستخدام shared key، أي hash
function + تشفير متناظر معاً.
:::
:::

::: {.mcq q="2"}
::: mcq-q
[2]{.qnum} من يُصدر الشهادة الرقمية؟
:::

::: mcq-options
::: {.option correct="false"}
صاحب المفتاح العام نفسه
:::

::: {.option correct="false"}
المستقبل (Bob)
:::

::: {.option correct="false"}
بروتوكول Diffie-Hellman
:::

::: {.option correct="true"}
سلطة الشهادة CA (Certificate Authority)
:::
:::

::: explanation
تُصدر الشهادة الرقمية من جهة موثوقة تُعرف باسم CA، وتربط الهوية بالمفتاح
العام.
:::
:::

::: {.mcq q="3"}
::: mcq-q
[3]{.qnum} عند التحقق من شهادة رقمية، يُقارَن ناتج Hash function مع
التوقيع الرقمي بعد فك تشفيره باستخدام:
:::

::: mcq-options
::: {.option correct="false"}
المفتاح الخاص لصاحب الشهادة
:::

::: {.option correct="false"}
المفتاح العام لصاحب الشهادة
:::

::: {.option correct="true"}
المفتاح العام للجهة المانحة CA
:::

::: {.option correct="false"}
shared key بين الطرفين
:::
:::

::: explanation
يُفك تشفير التوقيع الرقمي باستخدام المفتاح العام لجهة CA المانحة، وليس
بمفتاح صاحب الشهادة.
:::
:::

::: {.mcq q="4"}
::: mcq-q
[4]{.qnum} ما هو المعيار العالمي الذي يحدد تنسيق وهيكلية الشهادات
الرقمية؟
:::

::: mcq-options
::: {.option correct="false"}
MAC Standard
:::

::: {.option correct="false"}
KDC Protocol
:::

::: {.option correct="true"}
X.509 Certificates
:::

::: {.option correct="false"}
Diffie-Hellman Standard
:::
:::

::: explanation
X.509 هو المعيار العالمي (Standard) الذي يحدد شكل وهيكلية الشهادات
الرقمية.
:::
:::

::: {.mcq q="5"}
::: mcq-q
[5]{.qnum} ما الفرق الجوهري بين Key transport و Key agreement؟
:::

::: mcq-options
::: {.option correct="false"}
لا يوجد فرق، وهما نفس الشيء
:::

::: {.option correct="false"}
Key transport يُستخدم فقط مع KDC
:::

::: {.option correct="true"}
في Key transport يُنشئ أحد الأطراف المفتاح وينقله، بينما في Key agreement
يُشتق المفتاح من مساهمة الطرفين معاً
:::

::: {.option correct="false"}
Key agreement أقل أماناً من Key transport
:::
:::

::: explanation
هذا هو التعريف الدقيق للفرق بين الطريقتين كما ورد في المحاضرة.
:::
:::

::: {.mcq q="6"}
::: mcq-q
[6]{.qnum} إذا كان لدينا N طرف، ووزّع طرف ثالث فعلياً مفتاحاً مختلفاً لكل
زوج، فكم مفتاحاً نحتاج؟
:::

::: mcq-options
::: {.option correct="false"}
N
:::

::: {.option correct="false"}
N²
:::

::: {.option correct="true"}
N(N-1)/2
:::

::: {.option correct="false"}
2N
:::
:::

::: explanation
هذه هي الصيغة التي ورد ذكرها بالضبط في المحاضرة لتوضيح مشكلة عدم قابلية
التوسع (scalability).
:::
:::

::: {.mcq q="7"}
::: mcq-q
[7]{.qnum} ما الفرق بين Master Key و Session Key في نظام KDC؟
:::

::: mcq-options
::: {.option correct="false"}
كلاهما مؤقت
:::

::: {.option correct="false"}
Master Key مؤقت وSession Key دائم
:::

::: {.option correct="false"}
لا فرق بينهما
:::

::: {.option correct="true"}
Master Key دائم بين الطرف وKDC، وSession Key مؤقت لمدة الاتصال فقط
:::
:::

::: explanation
Master Key دائم ويُستخدم لتشفير نقل مفاتيح الجلسة، بينما Session Key مؤقت
ويُستخدم طوال مدة الاتصال المنطقي فقط.
:::
:::

::: {.mcq q="8"}
::: mcq-q
[8]{.qnum} إذا استخدم KDC نظام Master Key مع N طرف، كم مفتاحاً رئيسياً
يلزم توزيعه في البداية؟
:::

::: mcq-options
::: {.option correct="false"}
N(N-1)/2
:::

::: {.option correct="true"}
N
:::

::: {.option correct="false"}
N²
:::

::: {.option correct="false"}
1
:::
:::

::: explanation
تحتاج هذه الطريقة فقط N مفتاح رئيسي واحد لكل طرف، بدلاً من N(N-1)/2.
:::
:::

::: {.mcq q="9"}
::: mcq-q
[9]{.qnum} ما العيب الأساسي في \"البروتوكول البسيط\" لتوزيع مفتاح الجلسة
عبر KDC؟
:::

::: mcq-options
::: {.option correct="false"}
لا يستخدم KDC إطلاقاً
:::

::: {.option correct="true"}
لا يحتوي على حماية ضد replay attack (لا يستخدم nonce)
:::

::: {.option correct="false"}
يحتاج إلى تشفير غير متناظر
:::

::: {.option correct="false"}
لا يُنشئ session key إطلاقاً
:::
:::

::: explanation
البروتوكول البسيط لا يستخدم أي nonce، لذلك فهو عرضة لإعادة استخدام رسائل
قديمة (replay attack).
:::
:::

::: {.mcq q="10"}
::: mcq-q
[10]{.qnum} في بروتوكول Needham-Schroeder Shared-Key، ما هو الـ
\"ticket\"؟
:::

::: mcq-options
::: {.option correct="false"}
هوية Alice فقط بدون تشفير
:::

::: {.option correct="false"}
رقم عشوائي يُنشئه Bob
:::

::: {.option correct="true"}
رسالة مشفّرة بمفتاح Bob تحتوي على مفتاح الجلسة وهوية Alice، تُرسل عبر A
إلى B دون أن تستطيع A فتحها
:::

::: {.option correct="false"}
توقيع رقمي من CA
:::
:::

::: explanation
الـ ticket هو Encrypt(K_Bob, \[K_AB, \"Alice\"\]) الذي يُعدّه KDC مسبقاً
لأجل Bob فقط.
:::
:::

::: {.mcq q="11"}
::: mcq-q
[11]{.qnum} في بروتوكول Needham-Schroeder Shared-Key، ما وظيفة N1 التي
ترسلها Alice في الخطوة الأولى؟
:::

::: mcq-options
::: {.option correct="false"}
تشفير الرسالة النهائية
:::

::: {.option correct="true"}
إثبات حداثة رد KDC وربطه بطلب Alice (حماية من replay)
:::

::: {.option correct="false"}
هي مفتاح الجلسة نفسه
:::

::: {.option correct="false"}
اسم مستخدم Bob
:::
:::

::: explanation
N1 هو nonce حديث وعشوائي يضمن أن رد KDC مرتبط بطلب حالي وليس معاداً من
طلب سابق.
:::
:::

::: {.mcq q="12"}
::: mcq-q
[12]{.qnum} ما الفرق الأساسي بين \"Decentralized Key Distribution
Scenario\" وبروتوكول Needham-Schroeder (Shared-Key)؟
:::

::: mcq-options
::: {.option correct="false"}
لا فرق بينهما إطلاقاً
:::

::: {.option correct="true"}
السيناريو اللامركزي لا يعتمد على طرف ثالث KDC، بل على Master Key مشترك
مباشرة بين الطرفين
:::

::: {.option correct="false"}
Needham-Schroeder لا يستخدم أي تشفير
:::

::: {.option correct="false"}
السيناريو اللامركزي يحتاج 5 رسائل بينما Needham-Schroeder يحتاج 3
:::
:::

::: explanation
كما يوحي الاسم \"Decentralized\"، لا يوجد طرف ثالث؛ Alice وBob يملكان
Master Key (MKm) مسبقاً.
:::
:::

::: {.mcq q="13"}
::: mcq-q
[13]{.qnum} نقل المفاتيح باستخدام التشفير غير المتناظر يتم من خلال
خطوتين هما:
:::

::: mcq-options
::: {.option correct="false"}
توليد المفتاح ثم حذفه
:::

::: {.option correct="false"}
استخدام KDC مرتين متتاليتين
:::

::: {.option correct="true"}
الحصول على مفتاح عام أصلي والتحقق منه عبر شهادة رقمية، ثم استخدام تشفير
المفتاح العام لتوزيع المفتاح السري
:::

::: {.option correct="false"}
حساب discrete logarithm مرتين
:::
:::

::: explanation
هاتان الخطوتان بالضبط كما وردتا في المحاضرة، وتربطان مباشرة موضوع
الشهادات الرقمية بنقل المفاتيح.
:::
:::

::: {.mcq q="14"}
::: mcq-q
[14]{.qnum} في Public-Key Needham-Schroeder Protocol، كيف تُرسل Alice
مفتاح الجلسة Ks في الرسالة الأخيرة؟
:::

::: mcq-options
::: {.option correct="false"}
مشفّراً بمفتاحها الخاص فقط
:::

::: {.option correct="true"}
مشفّراً أولاً بمفتاحها الخاص (PrivateKey Alice) ثم بالمفتاح العام لـ Bob
:::

::: {.option correct="false"}
بدون أي تشفير
:::

::: {.option correct="false"}
مشفّراً بمفتاح CA العام
:::
:::

::: explanation
الرسالة الثالثة هي Encrypt_PublicKey(Bob)(N_B,
Encrypt_PrivateKey(Alice)(Ks))، أي تشفير مزدوج يحقق التوقيع والسرية معاً.
:::
:::

::: {.mcq q="15"}
::: mcq-q
[15]{.qnum} ما تعريف \"الجذر الأولي\" (Primitive Root) لعدد n؟
:::

::: mcq-options
::: {.option correct="false"}
أي عدد أولي أصغر من n
:::

::: {.option correct="true"}
العدد a الذي عنده أصغر أُس m تحقق a\^m(mod n)=1 يساوي φ(n)
:::

::: {.option correct="false"}
العدد الذي لا يقبل القسمة على n
:::

::: {.option correct="false"}
أكبر عدد أقل من n
:::
:::

::: explanation
هذا هو التعريف الدقيق كما ورد في المحاضرة، مع مثال n=5, a=2.
:::
:::

::: {.mcq q="16"}
::: mcq-q
[16]{.qnum} في المثال n=5, a=2، عند أي قيمة لـ m تتحقق المعادلة 2\^m mod
5 = 1 لأول مرة؟
:::

::: mcq-options
::: {.option correct="false"}
m = 1
:::

::: {.option correct="false"}
m = 2
:::

::: {.option correct="false"}
m = 3
:::

::: {.option correct="true"}
m = 4
:::
:::

::: explanation
2\^4 mod 5 = 16 mod 5 = 1، وبما أن φ(5)=4=m فإن 2 جذر أولي لـ 5.
:::
:::

::: {.mcq q="17"}
::: mcq-q
[17]{.qnum} لماذا يُعتبر Diffie-Hellman آمناً رغم أن القيم q، α، Y_A، Y_B
تُرسل علناً؟
:::

::: mcq-options
::: {.option correct="false"}
لأن الرسائل مشفّرة بمفتاح CA
:::

::: {.option correct="true"}
لأن حساب اللوغاريتم المتقطع (استخراج X_A أو X_B من القيم العامة) مسألة
صعبة حسابياً
:::

::: {.option correct="false"}
لأن KDC يحمي الاتصال
:::

::: {.option correct="false"}
لأن q دائماً عدد كبير جداً بلا أي سبب رياضي واضح
:::
:::

::: explanation
أمان الخوارزمية مبني بالكامل على صعوبة اللوغاريتمات المتقطعة (Discrete
Logarithms) في الحساب النمطي.
:::
:::

::: {.mcq q="18"}
::: mcq-q
[18]{.qnum} في مثال Diffie-Hellman (q=5, α=2, X_A=4, X_B=3)، ما قيمة
المفتاح المشترك K_AB؟
:::

::: mcq-options
::: {.option correct="false"}
3
:::

::: {.option correct="false"}
4
:::

::: {.option correct="true"}
1
:::

::: {.option correct="false"}
5
:::
:::

::: explanation
Y_A=2\^4 mod5=1، Y_B=2\^3 mod5=3، وبالتالي K_AB = Y_B\^X_A mod5 = 3\^4
mod5 = 1 = Y_A\^X_B mod5 = 1\^3 mod5 = 1.
:::
:::

::: {.mcq q="19"}
::: mcq-q
[19]{.qnum} كيف يحسب كل من A و B نفس المفتاح المشترك K_AB دون تبادل
مفاتيحهما السرية؟
:::

::: mcq-options
::: {.option correct="false"}
يرسل كل طرف مفتاحه السري للآخر مباشرة
:::

::: {.option correct="true"}
كل طرف يرفع المفتاح العام للطرف الآخر إلى أُس مفتاحه السري، وينتج القيمة
نفسها α\^(XA·XB) mod q
:::

::: {.option correct="false"}
يعتمدان فقط على KDC لحساب المفتاح
:::

::: {.option correct="false"}
يستخدمان شهادة رقمية بدلاً من الحساب
:::
:::

::: explanation
كل طرف يرفع المفتاح العام للطرف الآخر إلى أُس مفتاحه السري الخاص، وينتج
القيمة نفسها رياضياً K_AB = α\^(XA·XB) mod q.
:::
:::

::: {.mcq q="20"}
::: mcq-q
[20]{.qnum} أي مما يلي لا يستخدم nonce للحماية من replay attack؟
:::

::: mcq-options
::: {.option correct="false"}
Needham-Schroeder Shared-Key Protocol
:::

::: {.option correct="false"}
Decentralized Key Distribution Scenario
:::

::: {.option correct="true"}
البروتوكول البسيط (Simple Protocol)
:::

::: {.option correct="false"}
Public-Key Needham-Schroeder Protocol
:::
:::

::: explanation
البروتوكول البسيط هو الوحيد من بين هذه البروتوكولات الذي لا يحتوي على أي
nonce، لذلك فهو عرضة لـ replay attack.
:::
:::
:::

::: {#revision .section .content-section}
## 1️⃣5️⃣ المراجعة السريعة (Quick Revision)

راجع هذا القسم في 5--10 دقائق قبل الامتحان مباشرة.

::: qr-grid
::: qr-card
#### MAC

-   MAC = Encrypt(shared key, Hash(message))
-   يعتمد على: Hash function + تشفير متناظر
:::

::: qr-card
#### الشهادة الرقمية

-   تربط الهوية بالمفتاح العام، تصدرها CA
-   المعيار: X.509
-   التحقق: صلاحية ← اسم المالك ← Hash ← مقارنة بالتوقيع بعد فكه بمفتاح
    CA العام
:::

::: qr-card
#### Key Establishment

-   Key transport: طرف واحد ينشئ وينقل
-   Key agreement: الطرفان يشتقان المفتاح معاً (مثال: DH)
:::

::: qr-card
#### طرق نقل المفتاح (5)

-   يدوي من A
-   طرف ثالث فعلياً --- N(N-1)/2 مفتاح
-   تشفير بمفتاح قديم (خطر عند الاكتشاف)
-   طرف ثالث يرسل مشفّراً لكليهما
-   تشفير بمفتاح عام
:::

::: qr-card
#### KDC

-   Master Key: دائم بين الطرف و KDC
-   Session Key: مؤقت لمدة الاتصال
-   N طرف ← N مفتاح رئيسي فقط
:::

::: qr-card
#### البروتوكول البسيط

-   3 خطوات عبر KDC
-   بدون nonce ← عرضة لـ replay attack
:::

::: qr-card
#### Needham-Schroeder (Shared-Key)

-   5 خطوات، يستخدم N1 و N2
-   يحتوي على ticket مشفّر بمفتاح Bob
-   يحل مشكلة replay attack
:::

::: qr-card
#### Decentralized Key Distribution

-   لا يوجد KDC --- Master Key MKm مباشر بين Alice وBob
-   3 خطوات، تستخدم N1, N2, f()
:::

::: qr-card
#### نقل المفتاح (تشفير غير متناظر)

-   1\) شهادة رقمية للتحقق من المفتاح العام
-   2\) تشفير بالمفتاح العام لتوزيع المفتاح السري
:::

::: qr-card
#### Public-Key Needham-Schroeder

-   3 خطوات، بدون طرف ثالث، تستخدم N_A و N_B
-   الرسالة الأخيرة: توقيع بالمفتاح الخاص لـ Alice ثم تشفير بالمفتاح
    العام لـ Bob
:::

::: qr-card
#### Primitive Root & Discrete Log

-   a جذر أولي لـ n إذا كان أصغر m يحقق a\^m mod n=1 يساوي φ(n)
-   مثال: 2 جذر أولي لـ 5 (m=4=φ(5))
-   Discrete Log صعبة الحساب = أساس أمان DH
:::

::: {.qr-card style="grid-column:1/-1;"}
#### خطوات Diffie-Hellman + المثال الكامل

-   1\) اتفاق على q, α (α جذر أولي لـ q)
-   2\) كل طرف: X سري \< q، Y = α\^X mod q عام
-   3\) تبادل القيم العامة Y
-   4\) K_AB = Y(الآخر)\^X(الخاص) mod q = α\^(XA·XB) mod q

مثال: q=5, α=2 → X_A=4, Y_A=1 \| X_B=3, Y_B=3 → K_AB = 3\^4 mod5 = 1\^3
mod5 = 1
:::
:::
:::
:::
:::

ملزمة مراجعة تفاعلية --- أمن المعلومات، المحاضرة الرابعة: تبادل المفاتيح
