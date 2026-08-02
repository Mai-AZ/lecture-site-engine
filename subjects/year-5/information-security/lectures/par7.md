::: top
::: laptop
::: laptop-screen
::: laptop-display
University of Homs
:::
:::

::: laptop-base
:::
:::

# أمن المعلومات --- المحاضرة السابعة

::: subtitle
أساسيات تقنية Blockchain (سلسلة الكتل)
:::

::: instructor
د. لارا علي
:::

::: controls-bar
📑 الفهرس

::: search-box
[🔍]{.icon}
:::

🌙 الوضع الداكن
:::

::: {#searchCount .search-count}
:::
:::

::: {#overlay .overlay}
:::

::: layout
### الفهرس

[1. مقدمة: Blockchain و DLT](#s1) [2. المفاهيم الأساسية والبنية](#s2)
[3. أنواع الشبكات وأسس الثقة](#s3) [4. الأمان و Merkle Tree](#s4) [5.
إنشاء الكتلة وآلية الإجماع](#s5) [6. العقود الذكية Smart Contracts](#s6)
[7. إثبات المعرفة الصفري ZKP](#s7) [8. الخصائص والتطبيقات
والتصنيفات](#s8) [⚡ Quick Revision](#s9)

::: {#mainContent role="main"}
::: {#s1 .section}
## [1]{.num}مقدمة: Blockchain و DLT

**Blockchain** (سلسلة الكتل) هي تقنية لتخزين ونقل البيانات بشكل آمن،
تتكون من سلسلة من الكتل (Blocks) المترابطة التي تُخزَّن ضمن شبكة موزعة ولا
مركزية (Peer-to-Peer)، وتضمن الأمان من خلال **التوقيعات الرقمية**
والتشفير.

هذه البنية التحتية الموزعة تُدار بشكل تعاوني بين المشاركين، وتُمكّن من
تبادل بيانات موثوقة بلا مركزية، حيث يستطيع كل مشارك التعامل مع السجل
بأمان دون الحاجة لسلطة مركزية.

::: {.box .box-def .searchable}
[🔹 تقنية السجلات الموزعة DLT (Distributed Ledger
Technology)]{.box-title} سجل رقمي أو نظام تخزين مشترك عبر شبكة P2P، حيث
يحتفظ **كل مشارك بنسخة مطابقة** لنسخ جميع أعضاء الشبكة الآخرين. لا توجد
جهة مركزية؛ يقوم كل جهاز بتحديث سجله عبر عملية **توافق آراء
(consensus)** مشتركة مع بقية العقد. Blockchain هي إحدى تقنيات تطبيق DLT.
:::

::: {.box .box-warning .searchable}
[⚠️ Exam Important]{.box-title} لا توجد عمليات [CRUD]{.en} كاملة في DLT
--- يمكن فقط **الإنشاء Create والقراءة Read**، ولا يوجد Update أو
Delete. هذا بالضبط ما يجعل بيانات Blockchain غير قابلة للتعديل أو الحذف.
:::

### كيف تعمل من حيث المبدأ

تُسجّل كل كتلة جميع المعاملات، وبمجرد اكتمالها تُضاف إلى السلسلة كقاعدة
بيانات دائمة، وتُنشأ كتلة جديدة. تُستخدم Blockchain لنقل بيانات ذات قيمة
(أموال، عقود، حقوق ملكية، أسهم، أراضٍ، سيارات\...) دون الحاجة لوسطاء
(بنوك أو حكومات)، وبمجرد تخزين البيانات يصبح التلاعب بها صعباً للغاية
لأنها تُسجَّل في سجل رقمي موزع عبر الشبكة كاملة.

::: {.box .box-example .searchable}
[📌 لمحة تاريخية]{.box-title} ظهرت Blockchain عام **1991** كتقنية لتخزين
مستندات رقمية مختومة زمنياً، لكن انتشارها الفعلي بدأ عام **2008** مع عملة
[Bitcoin]{.en}. الاستخدام الأساسي لها هو سجل موزع للعملات المشفرة،
وبيتكوين هي العملة المشفرة الأكثر شيوعاً.
:::

::: {.box .box-tip .searchable}
[💡 Easy Memory Tip]{.box-title} اربطها بجملة واحدة: Blockchain =
**\"دفتر أستاذ رقمي موزع، يُضاف إليه فقط ولا يُعدَّل أو يُمحى منه أبداً\"**.
:::
:::

::: {#s2 .section}
## [2]{.num}المفاهيم الأساسية والبنية

::: {.table-wrap .searchable}
  المفهوم           الشرح
  ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Transaction**   سجل لحدث ما، مثل تحويل الأموال من حساب المرسل إلى حساب المستفيد.
  **Block**         وحدة تخزين بيانات تمثل مجموعة معاملات مجمّعة ومنظّمة منطقياً، وتتكون من **Header** (رأس) و**Body** (جسم).
  **Chain**         سلسلة متتابعة من الكتل مرتبطة ببعضها بترتيب زمني.
  **Nodes**         أجهزة حاسوب تشارك بشبكة Blockchain وتحافظ عليها عبر التحقق من المعاملات وتخزينها. قد تكون صادقة (شرعية) أو خبيثة --- تُعرف العقدة ذات السلوك العشوائي بـ**العقدة البيزنطية (Byzantine node)**.
  **Miners**        عقد مسؤولة عن إضافة كتل جديدة للسلسلة، عبر تحديد قيمة [nonce]{.en} المطلوبة وتوليد [hash]{.en} لكتلة المعاملات الحالية.
:::

::: {.box .box-def .searchable}
[🔹 محتوى Header الكتلة]{.box-title} [hash]{.en} الكتلة السابقة +
[hash]{.en} الكتلة الحالية + قيمة عشوائية **nonce** (رقم يُولَّد ويُستخدم
مرة واحدة فقط) + **طابع زمني (timestamp)** + **جذر شجرة Merkle**. هيكل
المعاملات داخل الكتلة يتبع تنسيق شجرة Merkle.
:::

::: diagram-card
::: diagram-title
📊 بنية السلسلة: كل كتلة مرتبطة بالسابقة عبر Hash
:::

::: chain-row
::: chain-block
::: blk-title
Block N−1
:::

::: blk-header
<div>

Prev Hash: **\...a91f**

</div>

<div>

Nonce: **28401**

</div>

<div>

Timestamp: **t−1**

</div>

<div>

Merkle Root: **0x7c2..**

</div>
:::

::: blk-body
Transactions ✅
:::
:::

::: chain-arrow
←
:::

::: chain-block
::: blk-title
Block N
:::

::: blk-header
<div>

Prev Hash: **0x7c2..**

</div>

<div>

Nonce: **91027**

</div>

<div>

Timestamp: **t**

</div>

<div>

Merkle Root: **0xe4a..**

</div>
:::

::: blk-body
Transactions ✅
:::
:::

::: chain-arrow
←
:::

::: chain-block
::: blk-title
Block N+1
:::

::: blk-header
<div>

Prev Hash: **0xe4a..**

</div>

<div>

Nonce: **?**

</div>

<div>

Timestamp: **t+1**

</div>

<div>

Merkle Root: **?**

</div>
:::

::: blk-body
قيد التعدين ⛏️
:::
:::
:::
:::

::: {.box .box-warning .searchable}
[⚠️ لا تخلط]{.box-title} كل **Miner** هو **Node**، لكن ليس كل Node عاملاً
بالتعدين. الـ Node تكتفي بالتحقق والتخزين، بينما الـ Miner يتنافس لإضافة
كتل جديدة.
:::
:::

::: {#s3 .section}
## [3]{.num}أنواع الشبكات وأسس الثقة

### أنواع Blockchain

::: {.table-wrap .searchable}
  النوع         الوصف
  ------------- ------------------------------------------------------------------------------------------------------------------------------------------
  **Public**    شبكة مفتوحة المصدر متاحة لأي مشارك، تسمح بالتفاعل المجهول مع صلاحية كاملة للقراءة وإنشاء سجل المعاملات. مثال: Bitcoin.
  **Private**   صلاحيات محددة؛ الوصول يقتصر على مجموعة محددة تتحكم بالمعاملات. أكثر مركزية، لكنها توفر خصوصية أعلى وسرعة معالجة أكبر.
  **Hybrid**    تجمع خصائص العامة والخاصة، تُدار من مجموعة محددة من المستخدمين، وتُسهّل التعاون بين منظمات متعددة. شائعة الاستخدام في المعاملات بين البنوك.
:::

### لماذا تُعتبر تقنية موثوقة؟ (5 ركائز)

-   **التوزيع (Distribution):** السجل الموزع يُشارَك ويُحدَّث مع كل معاملة
    واردة بين العقد، في الوقت الفعلي، دون خادم مركزي.
-   **الأمان (Security):** لا وصول غير مصرح به بفضل الأذونات والتشفير.
-   **الشفافية (Transparency):** كل عقدة تملك نسخة من البيانات، فتستطيع
    التحقق من الهويات بنفسها دون وسطاء.
-   **التوافق (Consensus):** يجب أن يوافق جميع المشاركين المعنيين على
    صحة المعاملة عبر خوارزميات الإجماع.
-   **المرونة (Flexibility):** إمكانية كتابة عقود ذكية تُنفَّذ بناءً على
    شروط معينة.

::: {.box .box-tip .searchable}
[💡 Easy Memory Tip]{.box-title} احفظها بالترتيب: **\"توزيع ← أمان ←
شفافية ← توافق ← مرونة\"** --- خمس ركائز تبني الثقة في Blockchain.
:::
:::

::: {#s4 .section}
## [4]{.num}الأمان و Merkle Tree

تعتمد Blockchain على أسلوبين رئيسيين للأمان: **التشفير (Encryption)**
و**التجزئة (Hashing)**. تُستخدم آلية تشفير غير متناظرة **public key
crypto** لضمان صحة البيانات وأمانها داخل الشبكة.

::: {.box .box-warning .searchable}
[⚠️ Exam Important]{.box-title} لا تُعتبر المعاملة صالحة إلا بعد
**توقيعها رقمياً (Digital Signature)** من قِبل المُرسل.
:::

### شجرة Merkle (Merkle Tree)

بنية بيانات تُستخدم لتخزين محتويات [hashed blocks]{.en} بطريقة هرمية، ما
يُبسّط عملية التحقق من البيانات. **جذر Merkle** موجود في قسم رأس الكتلة
(Header)، وهو تجزئة (hash) لجميع المعاملات في الكتلة. لذلك يكفي التحقق
من الجذر فقط للتأكد من صحة جميع المعاملات، بدلاً من التحقق من كل معاملة
على حدة.

::: diagram-card
::: diagram-title
📊 شجرة Merkle --- مثال بأربع معاملات
:::

![](data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibWVya2xlIiB2aWV3Ym94PSIwIDAgNDAwIDIyMCI+CiAgICAgICAgICA8bGluZSB4MT0iMjAwIiB5MT0iNDAiIHgyPSIxMTAiIHkyPSIxMDUiPjwvbGluZT4KICAgICAgICAgIDxsaW5lIGNsYXNzPSJobCIgeDE9IjIwMCIgeTE9IjQwIiB4Mj0iMjkwIiB5Mj0iMTA1Ij48L2xpbmU+CiAgICAgICAgICA8bGluZSB4MT0iMTEwIiB5MT0iMTA1IiB4Mj0iNjAiIHkyPSIxNzUiPjwvbGluZT4KICAgICAgICAgIDxsaW5lIHgxPSIxMTAiIHkxPSIxMDUiIHgyPSIxNjAiIHkyPSIxNzUiPjwvbGluZT4KICAgICAgICAgIDxsaW5lIGNsYXNzPSJobCIgeDE9IjI5MCIgeTE9IjEwNSIgeDI9IjI0MCIgeTI9IjE3NSI+PC9saW5lPgogICAgICAgICAgPGxpbmUgeDE9IjI5MCIgeTE9IjEwNSIgeDI9IjM0MCIgeTI9IjE3NSI+PC9saW5lPgoKICAgICAgICAgIDxjaXJjbGUgY2xhc3M9Im5vZGUiIGN4PSIyMDAiIGN5PSI0MCIgcj0iMjIiPjwvY2lyY2xlPgogICAgICAgICAgPHRleHQgeD0iMjAwIiB5PSI0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Um9vdDwvdGV4dD4KCiAgICAgICAgICA8Y2lyY2xlIGNsYXNzPSJub2RlIiBjeD0iMTEwIiBjeT0iMTA1IiByPSIxOSI+PC9jaXJjbGU+CiAgICAgICAgICA8dGV4dCB4PSIxMTAiIHk9IjEwOSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SDEyPC90ZXh0PgogICAgICAgICAgPGNpcmNsZSBjbGFzcz0ibm9kZS1obCIgY3g9IjI5MCIgY3k9IjEwNSIgcj0iMTkiPjwvY2lyY2xlPgogICAgICAgICAgPHRleHQgeD0iMjkwIiB5PSIxMDkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkgzNDwvdGV4dD4KCiAgICAgICAgICA8Y2lyY2xlIGNsYXNzPSJub2RlIiBjeD0iNjAiIGN5PSIxNzUiIHI9IjE3Ij48L2NpcmNsZT4KICAgICAgICAgIDx0ZXh0IHg9IjYwIiB5PSIxNzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkgxPC90ZXh0PgogICAgICAgICAgPGNpcmNsZSBjbGFzcz0ibm9kZSIgY3g9IjE2MCIgY3k9IjE3NSIgcj0iMTciPjwvY2lyY2xlPgogICAgICAgICAgPHRleHQgeD0iMTYwIiB5PSIxNzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkgyPC90ZXh0PgogICAgICAgICAgPGNpcmNsZSBjbGFzcz0ibm9kZS1obCIgY3g9IjI0MCIgY3k9IjE3NSIgcj0iMTciPjwvY2lyY2xlPgogICAgICAgICAgPHRleHQgeD0iMjQwIiB5PSIxNzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkgzPC90ZXh0PgogICAgICAgICAgPGNpcmNsZSBjbGFzcz0ibm9kZSIgY3g9IjM0MCIgY3k9IjE3NSIgcj0iMTciPjwvY2lyY2xlPgogICAgICAgICAgPHRleHQgeD0iMzQwIiB5PSIxNzkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkg0PC90ZXh0PgoKICAgICAgICAgIDx0ZXh0IHg9IjYwIiB5PSIyMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LXNpemU6OXB4OyI+VHgxPC90ZXh0PgogICAgICAgICAgPHRleHQgeD0iMTYwIiB5PSIyMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LXNpemU6OXB4OyI+VHgyPC90ZXh0PgogICAgICAgICAgPHRleHQgeD0iMjQwIiB5PSIyMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LXNpemU6OXB4OyI+VHgzPC90ZXh0PgogICAgICAgICAgPHRleHQgeD0iMzQwIiB5PSIyMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LXNpemU6OXB4OyI+VHg0PC90ZXh0PgogICAgICAgIDwvc3ZnPg==){.merkle}
:::

::: {.box .box-warning .searchable}
[⚠️ Exam Important --- أهم فائدة عملية لـ Merkle Tree]{.box-title} في
حال حدوث تعديل في معاملة واحدة (مثلاً Tx3 الموضّحة بالأحمر في الرسم)، يلزم
فقط تصحيح **المسار المرتبط بها من الورقة إلى الجذر** (الجانب الأيمن من
الشجرة في المثال)، بدلاً من إعادة فحص مجموعة البيانات بأكملها. هذا ما
يجعل التحقق سريعاً وفعالاً حتى مع آلاف المعاملات.
:::
:::

::: {#s5 .section}
## [5]{.num}إنشاء الكتلة وآلية الإجماع

### خطوات إنشاء كتلة جديدة

1.  ::: step-num
    1
    :::

    ::: step-content
    العقدة تُنشئ المعاملة وتُوقّعها رقمياً.
    :::

2.  ::: step-num
    2
    :::

    ::: step-content
    تُعمَّم (تُنشر) المعاملة عبر بروتوكول نشر إلى عقد أخرى تتحقق من صحتها
    وفق معايير محددة مسبقاً --- عادةً يتطلب التحقق أكثر من عقدة واحدة.
    :::

3.  ::: step-num
    3
    :::

    ::: step-content
    بعد التحقق من صحة المعاملة، تُضمَّن في كتلة تُعمَّم بدورها على الشبكة. عند
    هذه النقطة تُعتبر المعاملة **مؤكدة (تأكيد أول)**.
    :::

4.  ::: step-num
    4
    :::

    ::: step-content
    يتنافس [Miners]{.en} لإضافة الكتلة إلى السلسلة وفق آلية الإجماع
    المستخدمة.
    :::

5.  ::: step-num
    5
    :::

    ::: step-content
    تُصبح الكتلة الجديدة جزءاً من سجل المعاملات وترتبط بالكتلة السابقة.
    المعاملة تحصل هنا على **تأكيدها الثاني**، والكتلة على **تأكيدها
    الأول**.
    :::

6.  ::: step-num
    6
    :::

    ::: step-content
    تُحدَّث السلسلة عند جميع العقد.
    :::

### آلية الإجماع (Consensus Mechanism)

::: {.box .box-def .searchable}
[🔹 تعريف]{.box-title} إجراء يتم من خلاله التوصل لاتفاق مشترك بين جميع
نظراء شبكة Blockchain حول الحالة الراهنة للسجل الموزع، رغم عدم وجود جهة
مركزية للتحقق. تُرسّخ خوارزميات الإجماع الثقة بين نظراء غير معروفين في
بيئة موزعة، وتضمن أن كل كتلة جديدة هي النسخة الوحيدة المعتمدة.
:::

::: {.table-wrap .searchable}
  الآلية                                           الفكرة
  ------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Proof of Work (PoW)**                          يتنافس Miners لحل لغز رياضي معقد بإيجاد قيمة hash تحقق شروطاً محددة؛ الفائز يضيف الكتلة الجديدة. مستخدمة في Bitcoin.
  **Proof of Stake (PoS)**                         يُختار مُدقّقو الشبكة حسب كمية العملة المشفرة التي يمكنهم رهنها كضمان؛ حصة أكبر = احتمال أكبر للاختيار للتحقق وإضافة الكتل.
  **Delegated PoS (DPoS)**                         نظام تصويت ينتخب فيه المشاركون مندوباً مسؤولاً عن إضافة الكتل نيابة عنهم؛ يُحسّن الكفاءة بتقليل عدد المشاركين المباشرين بالتحقق.
  **Practical Byzantine Fault Tolerance (PBFT)**   يتحمل الأخطاء ويبقى فعالاً حتى مع وجود عقد خبيثة؛ كل عقدة تقدّم اقتراحاً للأخرى التي تصوّت وفق قواعد محددة مسبقاً، ويُتخذ القرار النهائي بعد عدد محدد من الأصوات.
:::

::: {.box .box-warning .searchable}
[⚠️ رقم يجب حفظه]{.box-title} **PBFT** يظل فعالاً حتى في وجود ما يصل إلى
**33.3%** من العُقد الخبيثة كحد أقصى (وليس 50%).
:::
:::

::: {#s6 .section}
## [6]{.num}العقود الذكية Smart Contracts

::: {.box .box-def .searchable}
[🔹 تعريف]{.box-title} برامج حاسوبية تتضمن خوارزميات واتفاقيات معاملات
تجارية وشروطاً أخرى محددة مسبقاً. يتم التحقق من صحة هذه العقود وتنفيذها
**تلقائياً** بمجرد استيفاء الشروط التعاقدية المحددة.
:::

### بيئتا تنفيذ العقود الذكية

-   **الآلة الافتراضية** مثل آلة إيثريوم الافتراضية **EVM (Ethereum
    Virtual Machine)** --- منصة تنفيذ برمجية مدمجة بوظائف مادية، تسمح
    بمحاكاة عمليات آلة حقيقية.
-   **الحاويات [Docker]{.en}** --- أدوات افتراضية توفر بيئة خفيفة الوزن
    لعزل العمليات والموارد، ما يضمن تنفيذاً فعالاً وآمناً للعقود الذكية.
:::

::: {#s7 .section}
## [7]{.num}إثبات المعرفة الصفري ZKP

::: {.box .box-def .searchable}
[🔹 تعريف Zero-Knowledge Proof]{.box-title} أسلوب تشفير يُتيح **التحقق من
صحة البيانات دون الكشف عن أي معلومة سرية** تتجاوز ما هو ضروري لعملية
التحقق. يُعزز هذا الأسلوب الخصوصية والأمان، ويُقلل من مخاطر انكشاف
البيانات.
:::

### بنية ZKP --- ثلاث مراحل بين طرفين فقط: المُثبت (Prover) والمُدقِّق (Verifier)

::: diagram-card
::: diagram-title
📊 تدفّق العملية بين Prover و Verifier
:::

::: zkp-flow
::: zkp-step
[Prover]{.zkp-actor}[➡ 1. مرحلة الإثبات (Proof)
➡]{.zkp-arrow}[Verifier]{.zkp-actor}
:::

::: zkp-step
[Verifier]{.zkp-actor}[➡ 2. مرحلة التحدي (Challenge)
➡]{.zkp-arrow}[Prover]{.zkp-actor}
:::

::: zkp-step
[Prover]{.zkp-actor}[➡ 3. مرحلة الرد (Response)
➡]{.zkp-arrow}[Verifier]{.zkp-actor}
:::
:::
:::

1.  ::: step-num
    1
    :::

    ::: step-content
    [مرحلة الإثبات]{.step-tag}\
    يقوم المُثبت (Prover) بإنشاء دليل وتقديم البيان المرتبط به إلى المُدقِّق
    (Verifier).
    :::

2.  ::: step-num
    2
    :::

    ::: step-content
    [مرحلة التحدي]{.step-tag}\
    يطرح المُدقِّق أسئلة محددة لتقييم صحة الدليل.
    :::

3.  ::: step-num
    3
    :::

    ::: step-content
    [مرحلة الرد]{.step-tag}\
    يُقدّم المُثبت إجابات، يستخدمها المُدقِّق إما لقبول الدليل أو رفضه.
    :::

::: {.box .box-tip .searchable}
[💡 Easy Memory Tip]{.box-title} Proof → Challenge → Response =
**\"إثبات، تحدي، رد\"**.
:::

### أنواع خوارزميات ZKP

::: {.table-wrap .searchable}
  -----------------------------------------------------------------------
  النموذج                             الخصائص
  ----------------------------------- -----------------------------------
  **zk-SNARKs**\                      عملية إثبات مبسّطة بسلاسل نصية
  [Succinct Non-Interactive Arguments مختصرة، فعّالة وتحافظ على أداء
  of Knowledge]{.en                   السلسلة. تتألف من: المُثبت +
  style="font-size:.75em;"}           المُدقِّق + **Setup** (يُولّد مفاتيح
                                      الإثبات والتحقق).

  **zk-STARKs**\                      على عكس SNARKs، **لا يتطلب إعداداً
  [Scalable Transparent Arguments of  موثوقاً (trusted setup)**، ما يجعله
  Knowledge]{.en                      أكثر أماناً. يستخدم تقنيات متقدمة
  style="font-size:.75em;"}           مثل خوارزمية [fast
                                      Reed-Solomon]{.en} وأشجار Merkle.
  -----------------------------------------------------------------------
:::

::: {.box .box-warning .searchable}
[⚠️ Exam Important]{.box-title} الفرق الجوهري بينهما: **zk-SNARKs**
يحتاج **Trusted Setup**، أما **zk-STARKs** فلا يحتاج (شفّاف /
Transparent).
:::

### فوائد ZKP

-   يعزز أمن البيانات للمشاركين في الشبكة.
-   يدعم قابلية التوسع (Scalability) في Blockchain من خلال تحسين معالجة
    المعاملات.

### استخدامات ZKP في Blockchain

-   **العملات المشفرة.**
-   **إدارة الهوية:** تتيح للمستخدمين الكشف فقط عن المعلومات الضرورية
    للتحقق (أمثلة: zPass، WorldID، Semaphore).
-   **التصويت المجهول القابل للتحقق:** يضمن خصوصية الناخب مع الحفاظ على
    نزاهة الانتخابات.
-   **تبادل آمن للأصول الرقمية:** نقل الأصول دون كشف تفاصيل المعاملات.
-   **مصادقة بيومترية آمنة عن بُعد.**
-   **مزادات آمنة:** تحافظ على سرية العطاءات وتضمن عملية مزايدة عادلة.
:::

::: {#s8 .section}
## [8]{.num}الخصائص والتطبيقات والتصنيفات

### خصائص Blockchain

-   **اللامركزية Decentralization:** لا يمكن لأي سلطة مركزية اتخاذ
    القرارات بشكل منفرد.
-   **تحسين أمن وخصوصية البيانات:** بمجرد حفظ البيانات على السلسلة لا
    يمكن إتلافها أو تغييرها أو محوها؛ جميع البيانات مختومة زمنياً ومحفوظة
    بترتيب زمني، والمفاتيح المشفرة تحمي هويات المستخدمين.
-   **التوافر Availability:** تكرار السجلات على جميع العقد يُزيل مشكلة
    نقطة الفشل الواحدة (Single Point of Failure).
-   **الشفافية والثقة:** جميع السجلات والمعاملات مرئية للجميع، ما يجعل
    التدقيق بسيطاً وفعالاً.
-   **قابل للتحقق Verifiable:** أي شخص يستطيع التحقق من صحة المعلومات
    لأن كل عقدة تحتفظ بنسخة من المعاملات.
-   **دائم Permanent:** بمجرد إتمام المعاملة تصبح دائمة ولا يمكن
    تغييرها.

### تطبيقات Blockchain

::: {.table-wrap .searchable}
  المجال                  أمثلة
  ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  مالية                   إدارة القروض، التدقيق المالي، تسجيل العقارات التجارية، أنظمة أسواق التنبؤ (إضافة للعملات المشفرة).
  الأعمال والصناعة        تدقيق سلسلة التوريد (بفضل الشفافية وعدم قابلية التغيير)، إدارة الملكية الفكرية (تخزين hash الإبداعات)، تأمين لامركزي بعقود ذكية تُسدّد التعويضات تلقائياً.
  حكومية / إدارة بيانات   الوثائق القانونية، المعاملات المدنية، التصويت.
  الصحة                   التأمين الصحي، المستلزمات الطبية، وأبرزها **السجل الصحي الإلكتروني EHR**.
  التعليم                 تطبيقات متعددة في إدارة السجلات التعليمية.
:::

### تصنيفات (أجيال) Blockchain

::: {.table-wrap .searchable}
  الجيل                الوصف
  -------------------- ---------------------------------------------------------------------------------------------------
  **Blockchain 1.0**   جيل العملات المشفرة والمدفوعات (مثل Bitcoin).
  **Blockchain 2.0**   جيل العقود الذكية والخدمات المالية المتقدمة (مثل Ethereum).
  **Blockchain 3.0**   تطبيقات تشمل قطاعات خارج التمويل، كالصحة والحكومة والفنون.
  **Blockchain X.0**   رؤية مستقبلية تدمج التقنية مع الذكاء الاصطناعي لتكوين وكلاء أذكياء ذاتيين (autonomous AI agents).
:::
:::

::: {#s9 .section}
## [⚡]{.num}Quick Revision --- مراجعة سريعة (5-10 دقائق)

::: revision-grid
::: revision-card
#### المفاهيم الأساسية

-   Blockchain ⊂ DLT (DLT أعم)
-   DLT: Create + Read فقط، لا Update/Delete
-   1991 نشأة الفكرة، 2008 انتشار Bitcoin
-   Transaction / Block (Header+Body) / Chain
-   Node مقابل Miner، والعقدة البيزنطية = سلوك خبيث
:::

::: revision-card
#### الأنواع والثقة

-   Public / Private / Hybrid
-   5 ركائز: توزيع، أمان، شفافية، توافق، مرونة
:::

::: revision-card
#### الأمان

-   Encryption + Hashing (تشفير غير متناظر)
-   لا صلاحية للمعاملة بدون توقيع رقمي
-   Merkle Root في الـ Header
-   تعديل معاملة ⇐ إصلاح مسارها فقط (ليس الشجرة كاملة)
:::

::: revision-card
#### الإجماع Consensus

-   PoW: لغز hash --- Bitcoin
-   PoS: حسب حصة العملة المرهونة
-   DPoS: انتخاب مندوب بالتصويت
-   PBFT: يتحمل حتى 33.3% عقد خبيثة
:::

::: revision-card
#### Smart Contracts

-   تنفيذ تلقائي عند تحقق الشروط
-   بيئة التنفيذ: EVM أو Docker
:::

::: revision-card
#### ZKP

-   تحقق بدون كشف معلومات سرية
-   3 مراحل: Proof → Challenge → Response
-   SNARKs = يحتاج Trusted Setup
-   STARKs = لا يحتاج (Transparent)
:::

::: revision-card
#### الخصائص

-   لامركزية، أمن/خصوصية، توافر
-   شفافية وثقة، قابل للتحقق، دائم
:::

::: revision-card
#### الأجيال

-   1.0 عملات --- 2.0 عقود ذكية
-   3.0 تطبيقات عامة --- X.0 دمج مع AI
:::
:::
:::
:::
:::

ملخص دراسي --- أمن المعلومات، المحاضرة السابعة (Blockchain) · للمراجعة
الشخصية فقط
