::: hero
::: laptop
::: laptop-screen
::: screen-text
University\
of Homs
:::
:::

::: laptop-base
:::
:::

# أمن المعلومات --- المحاضرة الأولى

::: subtitle
مقدمة في أمن المعلومات
:::

::: instructor
د. لارا علي
:::

::: badge-row
[CIA Triad]{.badge} [Security Attacks]{.badge} [Security
Mechanisms]{.badge} [Protection Layers]{.badge}
:::
:::

::: toolbar
☰ الفهرس

::: search-wrap
[🔍]{.icon}
:::

🌙 الوضع الليلي
:::

::: page-wrap
### الفهرس

-   [١. المقدمة](#intro)
-   [٢. تعاريف عامة](#definitions)
-   [٣. مثلث CIA](#cia)
-   [٤. أهداف أخرى للأمن](#other-goals)
-   [٥. بنية أمن المعلومات](#architecture)
-   [٦. الهجمات الأمنية](#attacks)
-   [٧. الآليات الأمنية](#mechanisms)
-   [٨. مستويات الحماية](#layers)
-   [٩. المراجعة السريعة](#revision)
-   [١٠. أسئلة تدريبية](#mcq)

::: {.main-content role="main"}
::: {#noResults}
لا توجد نتائج مطابقة لبحثك.
:::

::: {#intro .section .content-section}
## [1]{.num} المقدمة

أدّى اعتماد الإنسان المتزايد على تقنيات المعلومات والاتصالات إلى ظهور ما
يُعرف بـ **عصر المعلومات [the age of information]{.ltr}**، حيث أصبح تبادل
المعلومات عاملاً أساسياً في تحقيق الأهداف التجارية والربح المالي وتقديم
الخدمات عبر الإنترنت. غير أن هذه المعلومات ذاتها قد تُسبّب أضراراً كبيرة في
حال لم تتم حمايتها بالشكل المناسب.

تُعتبر المعلومات **[asset]{.ltr}** --- أي من الأشياء القيّمة التي يجب
حمايتها --- وقد تتخذ أي شكل، سواء كانت إلكترونية أو مادية.

::: {.box .box-def}
::: box-title
📌 تعريف أمن المعلومات
:::

حماية **سرية** المعلومات و**سلامتها** و**توافرها**. والهدف الرئيسي هو
ضمان استمرارية العمليات وتبادل المعلومات بأقل قدر من الضرر، والحدّ من
الآثار السلبية للحوادث.
:::

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

أمن المعلومات لا يعني منع كل شيء، بل **تقليل احتمالية** الوصول غير
المصرح به أو الاستخدام أو الإفصاح أو التعطيل أو الحذف أو التعديل غير
المصرح به --- وأيضاً تقليل الأثر السلبي إن وقع الحادث فعلاً.
:::
:::

::: {#definitions .section .content-section}
## [2]{.num} تعاريف عامة

  -----------------------------------------------------------------------
  المصطلح                             التعريف
  ----------------------------------- -----------------------------------
  **الثغرة الأمنية**\                 الخلل أو الضعف في تصميم النظام أو
  [Vulnerability]{.ltr}               تنفيذه أو تشغيله وإدارته، ويمكن
                                      استغلاله لانتهاك سياسة أمان النظام.

  **التهديد**\                        أي كائن أو حدث يمكنه استغلال ثغرة
  [Threat]{.ltr}                      أمنية معينة. يكون إما **خبيثاً**
                                      (مهاجمون، احتيال داخلي) أو
                                      **عرضياً** (كوارث طبيعية، خطأ
                                      بشري/سوء استخدام).

  **[Risk]{.ltr}**                    النتيجة المحتملة أو الضرر الفعلي
                                      الذي يحدث عند تنفيذ التهديد
                                      واستغلال ثغرة أمنية معينة.

  **[Security Policy]{.ltr}**         مجموعة القواعد والإجراءات التي تحدّد
                                      كيفية تقديم النظام أو المؤسسة
                                      لخدمات الأمن لحماية الموارد الحساسة
                                      والحيوية. مثال: [ISO/IEC
                                      27002]{.ltr}، [ISO 27001]{.ltr}.
  -----------------------------------------------------------------------

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

سلسلة السبب والنتيجة: **Vulnerability** (ضعف موجود) ← يستغلّه **Threat**
(المُهدِّد) ← فينتج عنه **Risk** (الضرر الفعلي) ← وتتحكم بكل ذلك **Security
Policy** (القواعد).
:::

::: {.box .box-exam}
::: box-title
⚠️ Exam Important
:::

لا تخلط بين [Threat]{.ltr} (المُهدِّد نفسه/الحدث) و[Risk]{.ltr}
(النتيجة/الضرر المحتمل). التهديد قد يستغل ثغرة، والخطر هو ما ينتج فعلياً.
:::
:::

::: {#cia .section .content-section}
## [3]{.num} مثلث CIA --- الأهداف الأساسية لأمن المعلومات

يتألف أمن المعلومات من ثلاثة عناصر رئيسية يمثل كل منها هدفاً أساسياً،
وينصبّ التركيز الأساسي على تحقيق **التوازن** بين حماية سرية البيانات
وسلامتها وتوافرها.

::: diagram
::: cia-svg-wrap
![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI5MCIgdmlld2JveD0iMCAwIDMyMCAyOTAiPgogICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjE2MCwyMCAzMCwyNTAgMjkwLDI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ2YXIoLS1hY2NlbnQpIiBzdHJva2Utd2lkdGg9IjMiPjwvcG9seWdvbj4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTYwIiBjeT0iMjAiIHI9IjQ2IiBmaWxsPSJ2YXIoLS1kZWYtYm9yZGVyKSIgb3BhY2l0eT0iMC4xNSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjE2MCIgY3k9IjIwIiByPSI0MCIgZmlsbD0idmFyKC0tZGVmLWJvcmRlcikiPjwvY2lyY2xlPgogICAgICAgICAgICA8dGV4dCB4PSIxNjAiIHk9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIj7Yp9mE2LPYsdmK2Kk8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjE2MCIgeT0iMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtc2l6ZT0iMTAiPkNvbmZpZGVudGlhbGl0eTwvdGV4dD4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iMzAiIGN5PSIyNTAiIHI9IjQ2IiBmaWxsPSJ2YXIoLS10aXAtYm9yZGVyKSIgb3BhY2l0eT0iMC4xNSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjMwIiBjeT0iMjUwIiByPSI0MCIgZmlsbD0idmFyKC0tdGlwLWJvcmRlcikiPjwvY2lyY2xlPgogICAgICAgICAgICA8dGV4dCB4PSIzMCIgeT0iMjQ2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIj7Yp9mE2LPZhNin2YXYqTwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMzAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxMCI+SW50ZWdyaXR5PC90ZXh0PgogICAgICAgICAgICA8Y2lyY2xlIGN4PSIyOTAiIGN5PSIyNTAiIHI9IjQ2IiBmaWxsPSJ2YXIoLS1leGFtLWJvcmRlcikiIG9wYWNpdHk9IjAuMTUiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGN4PSIyOTAiIGN5PSIyNTAiIHI9IjQwIiBmaWxsPSJ2YXIoLS1leGFtLWJvcmRlcikiPjwvY2lyY2xlPgogICAgICAgICAgICA8dGV4dCB4PSIyOTAiIHk9IjI0NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCI+2KfZhNiq2YjYp9mB2LE8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjI5MCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEwIj5BdmFpbGFiaWxpdHk8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjE2MCIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ2YXIoLS10ZXh0KSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCI+Q0lBPC90ZXh0PgogICAgICAgICAgPC9zdmc+)
:::
:::

  -----------------------------------------------------------------------
  العنصر                              التعريف
  ----------------------------------- -----------------------------------
  **السرية**\                         وصول الأشخاص المخوّلين فقط إلى
  [Confidentiality]{.ltr}             المعلومات.

  **السلامة/التكامل**\                صحة وسلامة المعلومات --- أي أن
  [Integrity]{.ltr}                   المعلومات المُستقبَلة هي نفسها
                                      المُرسَلة، وحمايتها من التعديل غير
                                      المصرح به سواء أثناء الإرسال أو
                                      التخزين.

  **التوافر**\                        ضمان وصول الأشخاص المصرح لهم إلى
  [Availability]{.ltr}                المعلومات والخدمات وقت الحاجة، دون
                                      انقطاع.
  -----------------------------------------------------------------------

::: {.box .box-exam}
::: box-title
⚠️ Exam Important
:::

من الأسئلة الشائعة: إعطاء سيناريو هجوم وتحديد أي عنصر من CIA هو
المستهدف. اربط هذا الجزء بجدول تصنيف الهجمات في القسم السادس.
:::
:::

::: {#other-goals .section .content-section}
## [4]{.num} أهداف أخرى لأمن المعلومات

::: {.box .box-def}
::: box-title
📌 التحقق من هوية الكيان --- [Entity Authentication]{.ltr}
:::

التأكد من هوية الشخص الذي تحاول التواصل معه (أنه فعلاً هو وليس منتحلاً
لشخصيته). يتم عبر:
:::

  وسيلة التحقق   مثال
  -------------- ----------------
  شيء تعرفه      كلمة المرور
  شيء تملكه      البطاقة الذكية
  شيء يرتبط بك   بصمة الإصبع

::: {.box .box-def}
::: box-title
📌 عدم الإنكار --- [Non-repudiation]{.ltr}
:::

ضمان عدم قدرة أي طرف على إنكار قيامه بعملية معينة (مثل إرسال بريد أو
إجراء تحويل مالي).
:::

::: {.box .box-def}
::: box-title
📌 التحكم في الوصول --- [Access Control]{.ltr}
:::

الحماية ضد الوصول غير المصرح به إلى المعلومات، وتشمل عمليات القراءة
والكتابة والتعديل وتنفيذ البرامج وغيرها.
:::

يتم تحديد أهداف الحماية من خلال **[Security Policy]{.ltr}**.

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

ثلاثية التحقق من الهوية: **تعرفه** (Knowledge) --- **تملكه**
(Possession) --- **يرتبط بك** (Inherence/Biometric).
:::
:::

::: {#architecture .section .content-section}
## [5]{.num} بنية أمن المعلومات

يُعنى أمن المعلومات بكيفية استخدام الآليات الأمنية لتنفيذ الخدمات
الأمنية، ومقاومة الهجمات على أنظمة المعلومات. تقوم البنية على ثلاثة
مفاهيم مترابطة:

  -----------------------------------------------------------------------
  المفهوم                             الوصف
  ----------------------------------- -----------------------------------
  **[Security Service]{.ltr}**\       الخدمة التي يجب توفيرها لتحقيق
  الخدمة الأمنية                      أهداف الأمن (مثل السرية، السلامة).

  **[Security Attack]{.ltr}**\        أي إجراء يُعرّض المعلومات للخطر.
  الهجوم الأمني                       

  **[Security Mechanism]{.ltr}**\     التقنيات الأمنية المستخدَمة لتحقيق
  الآلية الأمنية                      الخدمات الأمنية المطلوبة.
  -----------------------------------------------------------------------
:::

::: {#attacks .section .content-section}
## [6]{.num} الهجمات الأمنية --- [Security Attacks]{.ltr}

تُصنَّف الهجمات الأمنية إلى نوعين رئيسيين:

::: {.box .box-def}
::: box-title
📌 هجمات سلبية --- [Passive Attacks]{.ltr}
:::

محاولات للحصول على معلومات من النظام أو استخدامها **دون التأثير** على
موارد النظام.
:::

::: {.box .box-warning}
::: box-title
📌 هجمات نشطة --- [Active Attacks]{.ltr}
:::

محاولات **لتغيير** موارد النظام أو التأثير على عملياته.
:::

::: diagram
::: tree
::: tree-node
Security Attacks الهجمات الأمنية
:::

::: tree-arrow
↓
:::

::: tree-row
::: tree-branch
::: {.tree-node .passive}
Passive سلبية
:::

::: tree-arrow
↓
:::

::: tree-children
::: {.tree-leaf .passive-leaf}
Release of Message Contents (Snooping)
:::

::: {.tree-leaf .passive-leaf}
Traffic Analysis
:::
:::
:::

::: tree-branch
::: {.tree-node .active}
Active نشطة
:::

::: tree-arrow
↓
:::

::: tree-children
::: {.tree-leaf .active-leaf}
Masquerade
:::

::: {.tree-leaf .active-leaf}
Replay
:::

::: {.tree-leaf .active-leaf}
Modification of Messages
:::

::: {.tree-leaf .active-leaf}
Denial of Service (DoS/DDoS)
:::
:::
:::
:::
:::
:::

### أ) هجمات تهدد السرية (Confidentiality)

::: {.box .box-warning}
::: box-title
[Snooping]{.ltr} (التنصت/التصيد)
:::

الوصول غير المصرح به للمعلومات أو التقاطها أثناء نقلها على الشبكة، ثم
استخدامها لأغراض مسيئة. **طريقة المنع:** جعل المعلومات غير مفيدة للأطراف
الأخرى باستخدام التشفير.
:::

::: {.box .box-warning}
::: box-title
[Traffic Analysis]{.ltr} (تحليل حركة المرور)
:::

رغم استخدام التشفير لجعل المعلومات غير مفيدة، يمكن للمهاجم الحصول على
معلومات مفيدة أخرى من خلال تحليل ومراقبة حركة البيانات المتبادلة عبر
الشبكة (بدون فك التشفير نفسه).
:::

### ب) هجمات تهدد السلامة (Integrity)

::: {.box .box-warning}
::: box-title
[Modification]{.ltr} (التعديل)
:::

بعد تصيّد المعلومات أو الوصول إليها، يقوم المهاجم بتغييرها، أو حذف/تأخير
وصول الرسالة لفائدته أو لتعطيل النظام.
:::

::: {.box .box-warning}
::: box-title
[Masquerading]{.ltr} (انتحال الشخصية)
:::

يقوم المهاجم بانتحال صفة شخص آخر، وقد يتظاهر بأنه الطرف المستقبل
للرسائل.
:::

::: {.box .box-warning}
::: box-title
[Replaying]{.ltr} (إعادة الإرسال)
:::

يعيد المهاجم الاتصال بالمستقبل مستخدماً نفس الرسائل التي نسخها أثناء
اتصال حقيقي سابق بين الطرفين.
:::

::: {.box .box-warning}
::: box-title
[Repudiation]{.ltr} (الإنكار)
:::

يمكن للمُرسِل أن ينكر لاحقاً إرساله للرسالة، أو للمستقبل أن ينكر استقباله
لها.
:::

### ج) هجمات تهدد التوافر (Availability)

::: {.box .box-warning}
::: box-title
[DoS]{.ltr} --- Denial of Service
:::

هجوم شائع يُبطئ النظام الحاسوبي المستهدف أو يوقفه تماماً، عبر استراتيجيات
مثل إرسال كمية كبيرة من الطلبات لتعطيل النظام، أو اعتراض إجابات المخدم
وتعديلها/حذفها بحيث يبدو غير مستجيب.
:::

::: {.box .box-warning}
::: box-title
[DDoS]{.ltr} --- Distributed DoS
:::

محاولة لتعطيل خدمة عبر الإنترنت مؤقتاً عن طريق توليد حركة مرور هائلة من
**مصادر متعددة**، أو تعليق خدمات جهاز مضيف متصل بالإنترنت.
:::

### جدول ملخّص للتصنيف

  الهجوم             النوع            يهدد
  ------------------ ---------------- ------------------------
  Snooping           سلبي (Passive)   السرية Confidentiality
  Traffic Analysis   سلبي (Passive)   السرية Confidentiality
  Modification       نشط (Active)     السلامة Integrity
  Masquerading       نشط (Active)     السلامة Integrity
  Replaying          نشط (Active)     السلامة Integrity
  Repudiation        نشط (Active)     السلامة Integrity
  DoS / DDoS         نشط (Active)     التوافر Availability

::: {.box .box-exam}
::: box-title
⚠️ Exam Important
:::

جميع الهجمات المهددة للسرية **سلبية**، وجميع الهجمات المهددة للسلامة
والتوافر **نشطة**. هذا الربط سؤال امتحاني كلاسيكي.
:::
:::

::: {#mechanisms .section .content-section}
## [7]{.num} الآليات الأمنية --- [Security Mechanisms]{.ltr}

تُستخدَم لتحقيق الخدمات الأمنية. آليات الحماية مصممة لمنع الهجمات أو كشفها
أو التعافي منها (مثل: التشفير، أنظمة كشف التسلل).

  -----------------------------------------------------------------------
  النوع                               الوصف
  ----------------------------------- -----------------------------------
  **[Preventive]{.ltr}**\             آليات تُطبَّق **لمنع** وقوع الهجمات
  وقائية                              التي تستهدف المتطلبات الأمنية، مثل
                                      التشفير.

  **[Reactive]{.ltr}**\               **الكشف:** اتخاذ إجراءات للكشف عن
  تفاعلية                             الضرر الذي يلحق بالمعلومات.

                                      **رد الفعل:** اتخاذ إجراءات
                                      لاستعادة المعلومات (مثل استخدام
                                      النسخ الاحتياطي).
  -----------------------------------------------------------------------

::: {.box .box-tip}
::: box-title
💡 Easy Memory Tip
:::

**Preventive = قبل** وقوع الهجوم (منع). **Reactive = بعد** وقوع الهجوم
(الهجوم سيقع، والآلية تكشفه وتتعامل معه).
:::
:::

::: {#layers .section .content-section}
## [8]{.num} مستويات حماية المعلومات

يمتد أمن المعلومات عبر عدة مستويات متكاملة، من المستخدم وصولاً إلى البنية
التحتية:

::: layers
::: layer-card
::: layer-num
1
:::

::: layer-body
#### المستخدم [(User)]{.ltr}

نقطة الضعف في أي نظام. يتطلب تدريباً مستمراً لرفع الوعي الأمني (مثل تمييز
بريد التصيّد)، وتطبيق أنظمة صلاحيات تمنع الموظفين من الوصول للملفات
والتطبيقات التي لا يحتاجونها.
:::
:::

::: layer-card
::: layer-num
2
:::

::: layer-body
#### التطبيق والبرمجيات [(Application / Software)]{.ltr}

استخدام أكواد آمنة وفحص التطبيقات للتأكد من عدم وجود ثغرات، إضافة إلى
التحديثات المستمرة للتطبيقات وأنظمة التشغيل.
:::
:::

::: layer-card
::: layer-num
3
:::

::: layer-body
#### الحاسب [(Computer)]{.ltr}

استخدام كلمات مرور للوصول للأجهزة، تفعيل القفل التلقائي بعد فترة عدم
استخدام، ضبط الوصول للتطبيقات حسب حاجة المستخدم، وكلمة مرور إضافية
للتجهيزات الحساسة.
:::
:::

::: layer-card
::: layer-num
4
:::

::: layer-body
#### الشبكة المحلية [(LAN)]{.ltr}

التأكد الدوري من سلامة التمديدات السلكية، إغلاق خزائن الشبكة، وضع
المخدمات في غرف مقيّدة الوصول، استخدام اسم مستخدم وكلمة مرور للدخول
للشبكة اللاسلكية (لتتبع المشاكل)، ومراقبة نشاط الشبكة باستمرار.
:::
:::

::: layer-card
::: layer-num
5
:::

::: layer-body
#### الربط مع الشبكة الخارجية [(LAN to WAN)]{.ltr}

عبر استخدام **الجدران النارية [Firewalls]{.ltr}** وأنظمة كشف التسلل
**[IDS/IPS]{.ltr}**.
:::
:::

::: layer-card
::: layer-num
6
:::

::: layer-body
#### الشبكة الخارجية [(WAN)]{.ltr}

عبر تشفير الحزم واستخدام بروتوكولات نقل آمنة.
:::
:::

::: layer-card
::: layer-num
7
:::

::: layer-body
#### الوصول عن بعد [(Remote Access)]{.ltr}

محاولات الوصول للشبكة الداخلية من الخارج، قد تشمل كسر كلمات السر عبر
**[Brute Force]{.ltr}** أو **[Dictionary-Based]{.ltr}**. الحل: سياسة
كلمات سر قوية تُغيَّر كل 30 أو 60 يوماً، وتشفير البيانات المخزّنة.
:::
:::

::: layer-card
::: layer-num
8
:::

::: layer-body
#### المخدمات والبنية التحتية [(Servers & Infrastructure)]{.ltr}

قوة المخدمات وقدرتها على مقاومة الهجمات البرمجية، أمن البنية التحتية
للاتصال معها، إضافة إلى وجود مخدمات احتياطية في أماكن مختلفة للحماية من
الكوارث البيئية.
:::
:::
:::

::: {.box .box-exam}
::: box-title
⚠️ Exam Important
:::

احفظ الترتيب واربط كل مستوى بمثاله المميز: LAN to WAN ←
Firewalls/IDS-IPS، Remote Access ← Brute Force/Dictionary Attack.
:::
:::

::: {#revision .section .content-section}
## [9]{.num} المراجعة السريعة --- [Quick Revision]{.ltr}

### المصطلحات الأساسية

-   **Vulnerability**: ضعف/خلل قابل للاستغلال
-   **Threat**: كائن/حدث يستغل الثغرة (خبيث/عرضي)
-   **Risk**: الضرر الفعلي/المحتمل
-   **Security Policy**: قواعد الحماية (ISO 27001/27002)
-   **Confidentiality**: وصول مخوّل فقط
-   **Integrity**: عدم تعديل المعلومة
-   **Availability**: وصول دون انقطاع
-   **Entity Authentication**: تعرفه/تملكه/يرتبط بك
-   **Non-repudiation**: منع إنكار العملية
-   **Access Control**: تحكم بالوصول والصلاحيات
-   **Security Attack**: إجراء يعرّض المعلومات للخطر
-   **Security Mechanism**: تقنية لتحقيق خدمة أمنية
-   **Passive Attack**: دون تأثير على الموارد
-   **Active Attack**: تغيير/تأثير على الموارد
-   **Snooping**: تنصت + منعه بالتشفير
-   **Traffic Analysis**: تحليل النمط رغم التشفير
-   **Modification / Masquerading / Replaying / Repudiation**: تهدد
    Integrity
-   **DoS / DDoS**: تهدد Availability (مصدر واحد/متعدد)
-   **Preventive**: منع قبل الحدوث
-   **Reactive**: كشف + استعادة بعد الحدوث
-   **8 مستويات حماية**: User → Application → Computer → LAN →
    LAN-to-WAN → WAN → Remote Access → Servers/Infrastructure

::: {.box .box-exam}
::: box-title
⚠️ أعلى النقاط احتمالاً في الامتحان
:::

1\) تعريف CIA الثلاثي بدقة. 2) تصنيف كل هجوم (Passive/Active) وربطه
بعنصر CIA المهدَّد. 3) الفرق بين Preventive وReactive مع مثال. 4) الفرق
بين Vulnerability وThreat وRisk. 5) مثال على كل مستوى من مستويات الحماية
الثمانية.
:::
:::

::: {#mcq .section .content-section}
## [10]{.num} أسئلة تدريبية تفاعلية

اضغط على الإجابة لمعرفة إن كانت صحيحة، ثم اطّلع على الشرح.

::: mcq-item
1\. ما هو التعريف الأدق لـ Vulnerability؟

::: mcq-options
أ) الضرر الفعلي الناتج عن هجوم

ب) خلل أو ضعف في تصميم النظام أو تنفيذه يمكن استغلاله

ج) مجموعة القواعد التي تحدد خدمات الأمن

د) أي كائن يمكنه استغلال ثغرة أمنية
:::

::: mcq-explanation
Vulnerability هو الخلل/الضعف نفسه في النظام. أما \"الكائن الذي يستغل\"
فهو Threat، و\"الضرر الفعلي\" هو Risk.
:::
:::

::: mcq-item
2\. أيّ من التالي يُعتبر Traffic Analysis؟

::: mcq-options
أ) تغيير محتوى رسالة أثناء نقلها

ب) انتحال هوية طرف آخر في الاتصال

ج) إغراق النظام بعدد كبير من الطلبات

د) الحصول على معلومات مفيدة عبر مراقبة نمط حركة البيانات رغم تشفيرها
:::

::: mcq-explanation
Traffic Analysis هجوم سلبي يهدد السرية، ولا يحتاج لفك التشفير --- يكفي
مراقبة النمط (الحجم، التوقيت، الوجهة).
:::
:::

::: mcq-item
3\. هجوم Masquerading يهدد بشكل أساسي أي عنصر من CIA؟

::: mcq-options
أ) Availability

ب) Confidentiality

ج) Integrity

د) لا شيء مما سبق
:::

::: mcq-explanation
Masquerading (انتحال الشخصية) هجوم نشط (Active) يهدد Integrity، لأنه
يتلاعب بهوية الأطراف المتصلة.
:::
:::

::: mcq-item
4\. ما الفرق الجوهري بين DoS وDDoS؟

::: mcq-options
أ) DoS يهدد السرية وDDoS يهدد السلامة

ب) DoS هجوم سلبي وDDoS هجوم نشط

ج) DDoS يستخدم مصادر متعددة موزّعة بينما DoS قد يأتي من مصدر واحد

د) لا يوجد فرق بينهما
:::

::: mcq-explanation
كلاهما نشط ويهدد Availability، لكن DDoS يولّد حركة مرور هائلة من مصادر
متعددة (Distributed).
:::
:::

::: mcq-item
5\. أيّ آلية أمنية تُصنَّف على أنها Preventive؟

::: mcq-options
أ) استعادة البيانات من نسخة احتياطية

ب) نظام كشف التسلل بعد وقوع الهجوم

ج) التشفير

د) تحليل سجلات الهجوم بعد وقوعه
:::

::: mcq-explanation
التشفير يمنع الهجوم قبل وقوعه (Preventive). أما الكشف والاستعادة فهي
إجراءات Reactive تأتي بعد الحادثة.
:::
:::

::: mcq-item
6\. طرق التحقق من هوية الكيان (Entity Authentication) تعتمد على ثلاثة
أنواع، ما هي؟

::: mcq-options
أ) السرعة، الدقة، التكلفة

ب) Preventive، Reactive، Detective

ج) Passive، Active، Hybrid

د) شيء تعرفه، شيء تملكه، شيء يرتبط بك
:::

::: mcq-explanation
مثال: كلمة المرور (تعرفه)، البطاقة الذكية (تملكه)، بصمة الإصبع (يرتبط
بك).
:::
:::

::: mcq-item
7\. عدم قدرة المرسل على إنكار إرساله لرسالة معينة يُعرف بـ:

::: mcq-options
أ) Non-repudiation

ب) Access Control

ج) Entity Authentication

د) Traffic Analysis
:::

::: mcq-explanation
Non-repudiation هو أحد الأهداف الإضافية لأمن المعلومات إلى جانب مثلث
CIA.
:::
:::

::: mcq-item
8\. أي معيار من التالي يُعتبر مثالاً على Security Policy؟

::: mcq-options
أ) TCP/IP

ب) HTTP

ج) RSA

د) ISO/IEC 27001
:::

::: mcq-explanation
ISO/IEC 27001 وISO/IEC 27002 من المعايير المذكورة في المحاضرة كأمثلة على
Security Policy.
:::
:::

::: mcq-item
9\. أي مستوى من مستويات الحماية يرتبط مباشرة بـ Firewalls وIDS/IPS؟

::: mcq-options
أ) المستخدم

ب) الحاسب

ج) الربط مع الشبكة الخارجية (LAN to WAN)

د) الوصول عن بعد
:::

::: mcq-explanation
مستوى الربط بين الشبكة المحلية والخارجية يعتمد على Firewalls وأنظمة
كشف/منع التسلل IDS/IPS.
:::
:::

::: mcq-item
10\. هجمات Brute Force وDictionary-Based المذكورة في المحاضرة ترتبط بأي
مستوى حماية؟

::: mcq-options
أ) الشبكة المحلية LAN

ب) التطبيق والبرمجيات

ج) الوصول عن بعد Remote Access

د) المخدمات والبنية التحتية
:::

::: mcq-explanation
في مستوى الوصول عن بُعد، يحاول المهاجم كسر كلمات السر عبر Brute Force أو
Dictionary Attack من خارج الشبكة الداخلية.
:::
:::

::: mcq-item
11\. ما الذي يميّز الهجوم النشط (Active Attack) عن السلبي (Passive
Attack)؟

::: mcq-options
أ) النشط أخطر دائماً من حيث المدة الزمنية

ب) النشط يغيّر موارد النظام أو يؤثر على عملياته، بينما السلبي لا يؤثر على
الموارد

ج) السلبي يستهدف فقط قواعد البيانات

د) لا فرق جوهري بينهما
:::

::: mcq-explanation
الهجوم السلبي يقتصر على الحصول على المعلومات دون التأثير على النظام،
والنشط يُحدث تغييراً فعلياً في النظام أو بياناته.
:::
:::

::: mcq-item
12\. أي عبارة تصف Repudiation بدقة؟

::: mcq-options
أ) اعتراض حركة المرور وتحليلها

ب) إغراق الخادم بطلبات وهمية

ج) إنكار المُرسِل أو المستقبل لاحقاً قيامه بعملية الإرسال أو الاستقبال

د) انتحال هوية طرف آخر
:::

::: mcq-explanation
Repudiation هي إحدى الهجمات المهددة لـ Integrity، حيث ينكر أحد الطرفين
قيامه بعملية الاتصال.
:::
:::

::: mcq-item
13\. عبارة \"ضمان أن المعلومات المستقبلة هي نفسها المرسلة\" تصف أي عنصر
من CIA؟

::: mcq-options
أ) Confidentiality

ب) Availability

ج) Integrity

د) Non-repudiation
:::

::: mcq-explanation
هذا هو التعريف الحرفي لـ Integrity كما ورد في المحاضرة: صحة المعلومة
وعدم تعرضها لتعديل غير مصرح به.
:::
:::

::: mcq-item
14\. أي مما يلي يمثل مستوى \"التطبيق والبرمجيات\" في مستويات الحماية؟

::: mcq-options
أ) تدريب الموظفين على التعرف على بريد التصيّد

ب) استخدام أكواد آمنة وفحص التطبيقات والتحديثات المستمرة

ج) تشفير الحزم عبر WAN

د) وجود مخدمات احتياطية في مواقع مختلفة
:::

::: mcq-explanation
مستوى التطبيق والبرمجيات يركّز على أمان الكود نفسه، فحص الثغرات، وتحديث
التطبيقات وأنظمة التشغيل باستمرار.
:::
:::

::: mcq-item
15\. الهدف الرئيسي لأمن المعلومات كما ورد في المقدمة هو:

::: mcq-options
أ) منع أي وصول للمعلومات نهائياً

ب) تحقيق أكبر ربح مالي ممكن من الخدمات الإلكترونية

ج) ضمان استمرارية العمليات وتبادل المعلومات بأقل قدر من الضرر والحد من
الآثار السلبية للحوادث

د) استبدال جميع الأنظمة الورقية بأنظمة إلكترونية
:::

::: mcq-explanation
هذا هو التعريف الحرفي المذكور في المقدمة للهدف الرئيسي من أمن المعلومات.
:::
:::
:::

دليل مراجعة تفاعلي --- أمن المعلومات، المحاضرة الأولى
:::
:::
