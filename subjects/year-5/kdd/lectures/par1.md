# المحاضرة 1 — Introduction (مقدمة في اكتشاف المعرفة في قواعد البيانات)
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** لماذا `Data Mining`، تعريفه، عملية `KDD`، علاقته بـ `Machine Learning`، وأنواع مهامه (`Association Rules`, `Regression`, `Classification`, `Clustering`, `Outlier Detection`)

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| 1. Introduction ← أنت هنا | مفاهيم عامة، `KDD Process` | فهم لماذا ووجود `Data Mining`، وتصنيف مهامه |
| 2. Data & Data Preprocessing | `pandas`, تنظيف البيانات | بيانات جاهزة للتنقيب |
| 3. Frequent Patterns & `ARM` | `Apriori`, `support`, `confidence` | قواعد ترافق |
| 4. Regression | `Linear/Polynomial Regression` | نموذج تنبؤ رقمي |
| 5. Classification | `Decision Tree`, `Naive Bayes`, `kNN`, `SVM` | نموذج تصنيف |
| 6. Cluster Analysis | `k-Means`, `k-Medoids` | تجميع بدون إشراف |
| 7. Outlier Detection | طرق كشف الشذوذ | تحديد القيم الشاذة |

> **نوع هذه المحاضرة:** محاضرة تمهيدية (Overview) تُقدّم لمحة عامة عن كل الأنواع اللاحقة (Association Rules، Regression، Classification، Clustering) دون الدخول في تفاصيل رياضية أو كودية — لذا القسم الأكبر منها **نظري مفاهيمي**.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. لماذا التنقيب في البيانات؟ (`Why Data Mining?`)

#### النص الأصلي يقول:
> "Huge amounts of data are collected nowadays from different application domains. Major sources of data: Businesses… social media… Health industry… Scientific and engineering applications… The list of sources that generate huge amounts of data is endless."

#### الشرح المبسّط:
كل يوم تتولّد كميات هائلة من البيانات من مصادر مختلفة: عمليات الشراء في المتاجر (`Businesses`)، منشورات وصور مواقع التواصل (`social media`)، السجلات الطبية (`Health industry`)، وأجهزة الاستشعار في تطبيقات إنترنت الأشياء (`IoT`). المصادر لا تنتهي، وهذا يعني أن حجم البيانات يكبر أسرع بكثير من قدرتنا على النظر إليها يدوياً.

**لماذا؟** لأن اتخاذ القرار الجيد (تسويق، تشخيص طبي، كشف احتيال) يحتاج إلى معرفة مستخرجة من هذه البيانات، لا إلى البيانات الخام نفسها.

#### 💡 التشبيه:
> تخيل مكتبة ضخمة تستقبل آلاف الكتب يومياً بدون فهرسة.
> **وجه الشبه:** الكتب غير المفهرسة = البيانات الخام الهائلة، والفهرسة/الاستخلاص = عمل `Data Mining`.

---

### 2. سبب نشوء التنقيب: العجز عن التحليل اليدوي

#### النص الأصلي يقول:
> "this explosively growing of the data their complexity does not allow for manual analysis... Powerful tools are needed to automatically uncover valuable information from the tremendous amounts of data ⟹ birth of data mining."

#### الشرح المبسّط:
بما أن حجم وتعقيد البيانات فاق قدرة الإنسان على تحليلها يدوياً، احتجنا أدوات آلية (خوارزميات) تكتشف المعلومات القيّمة تلقائياً. هذا بالضبط سبب "ولادة" `Data Mining` كحقل علمي مستقل.

**لماذا؟** لأن التحليل اليدوي (مثال: موظف يقرأ كل معاملة بيع) غير قابل للتوسّع (`not scalable`) مع ملايين السجلات.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو كانت لديك بيانات 100 معاملة بيع فقط، هل تحتاج فعلاً `Data Mining`؟
> **لماذا هذا مهم؟** لأن `Data Mining` مصمم أساساً لحل مشكلة **الحجم والتعقيد**، وليس أداة سحرية تُستخدم في كل الحالات.

---

### 3. ما هو `Data Mining`؟ (التعريف)

#### النص الأصلي يقول:
> "process of discovering interesting (non-trivial, implicit, previously unknown and potentially useful) patterns, models, and other kinds of knowledge in large datasets. Exploration & analysis, by automatic or semi-automatic means, of large quantities of data in order to discover meaningful pattern."

#### الشرح المبسّط:
`Data Mining` هو عملية اكتشاف أنماط (`patterns`) أو نماذج (`models`) أو معرفة من بيانات كبيرة، بشرط أن تكون هذه الأنماط:
- **غير بديهية** (`non-trivial`): لا يمكن ملاحظتها بنظرة سريعة.
- **ضمنية** (`implicit`): مخفية داخل البيانات وليست مكتوبة صراحة.
- **غير معروفة سابقاً** (`previously unknown`).
- **مفيدة عملياً** (`potentially useful`).

والعملية تتم بشكل آلي أو شبه آلي (`automatic or semi-automatic`)، أي يمكن أن يتدخل الإنسان في بعض الخطوات (كاختيار البيانات) لكن الاكتشاف نفسه آلي.

**لماذا هذا التعريف مهم؟** لأنه يميّز `Data Mining` عن مجرد "البحث عن معلومة معروفة سلفاً" — لاحظ أن هذا الشرط سيُستخدم لاحقاً للتفريق بين ما هو Data Mining وما ليس كذلك.

#### 💡 التشبيه:
> إيجاد الذهب داخل كومة رمل ضخمة، وليس مجرد نقل الرمل من مكان لآخر.
> **وجه الشبه:** الذهب النادر والمفيد = الأنماط غير البديهية والمفيدة، الرمل = البيانات الخام الكثيرة.

---

### 4. الأسماء البديلة ولماذا سُمّي "Data Mining" (misnomer)

#### النص الأصلي يقول:
> "Alternative names: Knowledge discovery in databases (KDD), knowledge extraction, pattern discovery, data analytics, information harvesting… 'Data mining' is a misnomer, we say gold mining not rock or sand mining. Thus, it should have been named: 'knowledge mining from data' => long!! 'knowledge mining' => not reflect the emphasis on mining from large amounts of data. Thus, such a misnomer carrying both 'data' and 'mining' became a popular choice."

#### الشرح المبسّط:
مصطلح `Data Mining` هو في الحقيقة تسمية غير دقيقة تماماً (`misnomer`)؛ فنحن في التنقيب عن الذهب نقول "تنقيب عن الذهب" (`gold mining`) وليس "تنقيب عن الصخر/الرمل" (لأن الذهب هو الهدف النفيس وليس الصخر). بالمثل، الاسم الأدق كان يجب أن يكون "استخراج المعرفة من البيانات" (`knowledge mining from data`)، لكنه طويل. واسم "استخراج المعرفة" وحده (`knowledge mining`) لا يبرز أهمية كون البيانات **كبيرة الحجم**. لذلك بقي مصطلح `Data Mining` هو الأكثر شيوعاً رغم عدم دقته الكاملة.

من أسمائه البديلة أيضاً: `Knowledge Discovery in Databases (KDD)`, `knowledge extraction`, `pattern discovery`, `data analytics`, `information harvesting`.

#### ⚖️ المقايضة: تسمية `Data Mining` مقابل `Knowledge Mining from Data`

| | `Data Mining` | `Knowledge Mining from Data` |
| --- | --- | --- |
| المزايا | قصير، شائع، سهل التداول | دقيق ويعكس الهدف الحقيقي (المعرفة) |
| العيوب | لا يعكس أن الهدف هو "المعرفة" وليس "البيانات" نفسها | طويل وغير عملي في الاستخدام اليومي |
| متى تختاره | في الاستخدام العام والصناعي | في السياقات الأكاديمية الدقيقة جداً |

---

### 5. ما هو (وما ليس) `Data Mining`؟

#### النص الأصلي يقول:
> "What is not Data Mining? looking up individual records in a database, or finding web pages that contain a particular set of keywords 'Amazon'... such tasks can be accomplished through simple interactions with a DBMS or an information retrieval system.
> What is Data Mining? Group together similar documents returned by search engine according to their context... Certain names are more prevalent in certain locations... Google's Flu Trends: can estimate flu activity — found a close relationship between the number of people who search for flu-related information and the number of people who actually infected."

#### الشرح المبسّط:
ليس كل عملية "استخراج معلومة" تُعتبر `Data Mining`. الجدول التالي يوضح الفرق:

| المعيار | ليس `Data Mining` | هو `Data Mining` |
| --- | --- | --- |
| مثال | البحث عن سجل عميل معيّن برقم الهوية | تجميع الوثائق المتشابهة تلقائياً حسب السياق |
| مثال 2 | البحث عن صفحات ويب تحتوي كلمة "Amazon" | اكتشاف أن أسماء عائلية معينة (O'Brien, O'Reilly) أكثر انتشاراً في منطقة بوسطن |
| مثال 3 | — | `Google Flu Trends`: اكتشاف علاقة بين عدد عمليات البحث عن أعراض الإنفلونزا وعدد المصابين فعلياً |
| الأداة الكافية | استعلام بسيط (`DBMS` أو نظام استرجاع معلومات) | خوارزمية تكتشف نمطاً **جديداً وغير معروف سلفاً** |

**لماذا؟** لأن البحث المباشر (لوكب-أب) يسترجع معلومة **موجودة صراحة**، بينما `Data Mining` يكتشف علاقة **لم تكن معروفة من قبل**.

#### الفهم الخاطئ الشائع ❌: أي استعلام أو بحث في قاعدة بيانات هو "تنقيب بيانات".
#### الفهم الصحيح ✅: `Data Mining` يتطلب اكتشاف نمط أو علاقة **جديدة وغير بديهية**، لا مجرد استرجاع بيانات موجودة.

---

### 6. عملية `KDD` (`Knowledge Discovery in Databases`)

#### النص الأصلي يقول:
> "Many people treat data mining as a synonym for KDD, while others view data mining as an essential step in the KDD process. The overall process of converting raw data into useful knowledge — an iterative sequence of the following steps: 1. Data Cleaning 2. Data Integration 3. Data Selection 4. Data Transformation 5. Data Mining 6. Evaluation 7. Knowledge Presentation."

#### الشرح المبسّط:
هناك رأيان: البعض يعتبر `Data Mining` مرادفاً لكامل عملية `KDD`، والبعض الآخر يعتبره **خطوة واحدة فقط ضمن** عملية `KDD` الأكبر. عملية `KDD` هي تسلسل **تكراري** (`iterative`) من 7 خطوات تحوّل البيانات الخام إلى معرفة مفيدة.

**لماذا "تكرارية"؟** لأنه غالباً بعد التقييم (خطوة 6) قد نكتشف أن النتائج غير مرضية، فنعود لخطوة تنظيف أو اختيار بيانات مختلفة، وهكذا.

```algorithm
1 | Data Cleaning | خوارزميات إزالة الضوضاء والقيم المفقودة | إزالة الضوضاء والبيانات غير المتّسقة (noise & inconsistent data)
2 | Data Integration | أدوات دمج مصادر البيانات | دمج عدة مصادر بيانات في مستودع موحّد (Data Warehouse)
3 | Data Selection | استعلامات قاعدة البيانات | استرجاع البيانات ذات الصلة بمهمة التنقيب المطلوبة فقط
4 | Data Transformation | تقنيات التحويل والتوحيد | تحويل البيانات لشكل مناسب للتنقيب (مثال: Normalization)
5 | Data Mining | خوارزميات التنقيب (Apriori, k-Means, Decision Tree...) | تطبيق طرق ذكية لاستخراج الأنماط أو بناء النماذج
6 | Evaluation | مقاييس الأداء (Support, Accuracy...) | تحديد الأنماط "المثيرة للاهتمام" فعلياً من بين كل ما استُخرج
7 | Knowledge Presentation | تقنيات التصوّر (Visualization) | عرض المعرفة المستخرجة للمستخدم بشكل مفهوم (رسوم، تقارير)
```
#### نقاط التنفيذ:
- الترتيب ليس صارماً بالكامل؛ العملية **تكرارية** وقد نعود لخطوات سابقة.
- خطوات 1-4 تُسمّى مجتمعة **تحضير البيانات** (`Data Preparation`).
- خطوة 5 فقط هي "التنقيب" الفعلي (`Data Mining`)، لكن الاسم الشائع يُطلق أحياناً على العملية كاملة.

#### تعريف مهم — مستودع البيانات (`Data Warehouse`):
> "A repository of data collected from multiple heterogeneous data sources, organized under a unified schema, and usually stored at a single site."
أي: مكان تخزين مركزي يجمع بيانات من مصادر مختلفة (heterogeneous) تحت مخطط (schema) موحّد.

#### 📊 المخطط: عملية `KDD`

#### ما هذا المخطط؟
> يوضح التدفّق الكامل من مصادر البيانات الخام حتى الوصول إلى "المعرفة" (Knowledge)، مروراً بمرحلتي التحضير والتنقيب والتقييم.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Data Sources | event | مصادر خام: قواعد بيانات، ملفات مسطحة، الويب |
| 2 | Data Cleaning | process | إزالة الضوضاء والتناقضات |
| 3 | Data Integration | process | دمج مصادر متعددة |
| 4 | Data Warehouse | store | مستودع موحّد للبيانات المدمجة |
| 5 | Selection | process | اختيار البيانات ذات الصلة |
| 6 | Data Mining | process | تطبيق خوارزميات الاستخراج |
| 7 | Pattern/Knowledge Evaluation | decision | تقييم الأنماط المكتشفة |
| 8 | Knowledge | event | المعرفة النهائية المعروضة للمستخدم |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Data Sources | Data Cleaning | تنظيف | تدفق عادي | البيانات الخام تدخل مرحلة التنظيف |
| Data Cleaning | Data Integration | دمج | تدفق عادي | البيانات النظيفة تُدمج من عدة مصادر |
| Data Integration | Data Warehouse | تخزين | تدفق عادي | تُخزَّن البيانات المدمجة في المستودع |
| Data Warehouse | Selection | اختيار | تدفق عادي | اختيار جزء البيانات المطلوب للمهمة |
| Selection | Data Mining | تحويل + تنقيب | تدفق عادي | تُمرَّر البيانات المختارة (بعد التحويل) للتنقيب |
| Data Mining | Pattern/Knowledge Evaluation | تقييم | تدفق عادي | تقييم النتائج المستخرجة |
| Pattern/Knowledge Evaluation | Knowledge | عرض | تدفق عادي | تقديم المعرفة النهائية |
| Pattern/Knowledge Evaluation | Selection | تكرار (إذا لم تكن النتائج مرضية) | سهم رجوع (تكراري) | العودة لاختيار بيانات مختلفة عند الحاجة |

```diagram
type: flowchart
title: KDD Process
direction: TD
nodes:
  - id: sources
    label: Data Sources
    kind: event
    level: 0
  - id: cleaning
    label: Data Cleaning
    kind: process
    level: 1
  - id: integration
    label: Data Integration
    kind: process
    level: 2
  - id: warehouse
    label: Data Warehouse
    kind: store
    level: 3
  - id: selection
    label: Selection
    kind: process
    level: 4
  - id: mining
    label: Data Mining
    kind: process
    level: 5
  - id: evaluation
    label: Pattern/Knowledge Evaluation
    kind: decision
    level: 6
  - id: knowledge
    label: Knowledge
    kind: event
    level: 7
edges:
  - from: sources
    to: cleaning
  - from: cleaning
    to: integration
  - from: integration
    to: warehouse
  - from: warehouse
    to: selection
  - from: selection
    to: mining
  - from: mining
    to: evaluation
  - from: evaluation
    to: knowledge
  - from: evaluation
    to: selection
```

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا اكتشفنا في خطوة `Evaluation` أن الأنماط الناتجة غير مفيدة، إلى أي خطوة نعود غالباً؟
> **لماذا هذا مهم؟** لأنه يوضح أن `KDD` عملية **حلقية (تكرارية)** وليست خطية تُنفَّذ مرة واحدة فقط.

#### مهم للامتحان ⚠️:
> فرّق بين "`Data Mining` كخطوة واحدة داخل `KDD`" و"`Data Mining` كمرادف لكامل عملية `KDD`" — كلا المفهومين واردان في المراجع والامتحان قد يسأل عن كليهما.

---

### 7. `Data Mining` في هرم ذكاء الأعمال (`Business Intelligence`)

#### النص الأصلي يقول:
> "Increasing potential to support business decisions: Data Sources → Data Preprocessing/Integration, Data Warehouses → Data Exploration (Statistical Summary, Querying, and Reporting) → Data Mining (Information Discovery) → Data Presentation (Visualization Techniques) → Decision Making."

#### الشرح المبسّط:
كلما صعدنا في الهرم (من قاعدة البيانات الخام في الأسفل إلى اتخاذ القرار في القمة)، زادت **القدرة على دعم القرارات التجارية**. كل طبقة يستخدمها نوع مختلف من المستخدمين:

| الطبقة (من الأسفل للأعلى) | من يستخدمها | الوظيفة |
| --- | --- | --- |
| Data Sources | DBA | تخزين البيانات الخام |
| Data Preprocessing/Integration, Data Warehouses | DBA | تجهيز ودمج البيانات |
| Data Exploration | Data Analyst | ملخصات إحصائية، استعلامات، تقارير |
| Data Mining | Data Analyst | اكتشاف المعلومات (Information Discovery) |
| Data Presentation | Business Analyst | عرض النتائج بصرياً |
| Decision Making | End User | اتخاذ القرار النهائي |

**لماذا؟** لأن `Data Mining` وحده لا يكفي لاتخاذ قرار؛ يحتاج إلى عرض مناسب (`visualization`) ليصل إلى متخذ القرار بشكل مفهوم.

#### 💡 التشبيه:
> الهرم يشبه مصفاة تُصفّي كميات ضخمة من الماء الخام لتنتج في النهاية كوب ماء نقي صالح للشرب مباشرة.
> **وجه الشبه:** الماء الخام = البيانات الخام، كوب الماء النقي = القرار الجاهز للتنفيذ.

---

### 8. التقاء عدة تخصصات (`Confluence of Multiple Disciplines`)

#### النص الأصلي يقول:
> "Data Mining draws from: Machine Learning, Statistics, Pattern Recognition, Visualization & HCI, Algorithm, High-Performance Computing, Applications, Social Sciences, Database Technology, Natural Language Processing... Parallel computing Techniques: for addressing the massive size of datasets. Distributed techniques: when the data cannot be gathered in one location."

#### الشرح المبسّط:
`Data Mining` ليس تخصصاً منعزلاً، بل ملتقى لعدة مجالات، كل مجال يقدّم له أدوات مختلفة:

| المجال | ما يقدّمه لـ `Data Mining` |
| --- | --- |
| `Statistics` | نمذجة الضوضاء والقيم المفقودة، وصف البيانات، أخذ العينات (`Sampling`)، اختبار الفرضيات |
| `Machine Learning` | تقنيات النمذجة ونظريات التعلّم (وتشترك مع DM بنفس الخوارزميات لاكتشاف الأنماط) |
| `Algorithm` | خوارزميات التحسين والبحث (`optimization & search`) |
| `High-Performance Computing` | الحوسبة المتوازية (للبيانات الضخمة) والموزّعة (عند تعذّر تجميع البيانات في مكان واحد) |
| `Database Technology`, `NLP`, `Pattern Recognition`, `Visualization & HCI`, `Social Sciences`, `Applications` | مجالات داعمة أخرى |

**لماذا هذا مهم؟** لأنه يفسّر لماذا نرى تداخلاً كبيراً بين مصطلحات `DM` و`ML` و`Statistics` في الأدبيات.

---

### 9. كيف تتعلّم الآلة؟ (`How Do Machines Learn?`)

#### النص الأصلي يقول:
> "ML 'gives computers the ability to learn without being explicitly programmed' (Arthur Samuel, 1959). We don't codify the solution. We don't even know it! Data is the key & the learning algorithm."

#### الشرح المبسّط:
في البرمجة التقليدية (`Normal algorithm`) نُعطي القواعد (خطوات الطبخ) وندخل المكوّنات (Inputs) لنحصل على الناتج (Output). أما في التعلّم الآلي (`Machine learning algorithm`) فنُعطي المكوّنات **والناتج معاً**، وتقوم الخوارزمية "باكتشاف" القواعد بنفسها.

**لماذا؟** لأننا في كثير من المسائل الحقيقية **لا نعرف القاعدة أصلاً** (مثال: لا توجد "قاعدة" واضحة لتمييز صورة قطة من كلب) — لذا نترك النموذج يتعلّمها من البيانات عبر التجربة والخطأ (قد يجرّب النموذج آلاف المحاولات حتى يصل لأداء جيد، كما في مثال طهي الدجاجة بالمحاضرة).

#### 💡 التشبيه:
> طاهٍ مبتدئ يجرّب طبخ الدجاج بطرق مختلفة مئات المرات حتى يتقن الوصفة الصحيحة دون أن يُعطى الوصفة مسبقاً.
> **وجه الشبه:** المحاولات المتكررة للطاهي = تكرارات تدريب النموذج (`training iterations`)، الوصفة النهائية = النموذج المتعلَّم (`trained model`).

#### الأنماط الثلاثة للتعلّم الآلي:

| النمط | نوع البيانات | مثال من المحاضرة |
| --- | --- | --- |
| `Supervised Learning` | بيانات موسومة (`labeled dataset`) | `Classification`, `Regression` |
| `Unsupervised Learning` | بيانات غير موسومة (`unlabeled dataset`) | `Clustering`, `Association Rule Learning` |
| `Reinforcement Learning` | تعلّم بالتجربة عبر مكافآت وعقوبات | لعبة أتاري (مثال اللوحة) |

---

### 10. `Data Mining` مقابل `Machine Learning`

#### النص الأصلي يقول:
> "share many similarities. But DM differs from ML in several major aspects: 1. Scalability: DM often works on very large datasets or even on infinite data streams. ML Focus on small datasets. 2. In many DM problems, the training data can still be rather small → DM has to put a lot of effort on developing weakly supervised methods for constructing quality models: semi-supervised learning, ensemble learning, actively learning, or transfer learning."

#### الشرح المبسّط:
رغم التشابه الكبير (يستخدمان نفس الخوارزميات الأساسية لاكتشاف الأنماط)، يختلف `DM` عن `ML` في نقطتين رئيسيتين:
1. **قابلية التوسّع (`Scalability`)**: `DM` مصمّم للعمل على بيانات ضخمة جداً أو حتى تدفقات لا نهائية (`infinite data streams`)، بينما `ML` تقليدياً يركّز على مجموعات بيانات أصغر.
2. **قلة بيانات التدريب أحياناً**: في بعض مسائل `DM`، تكون بيانات التدريب المتاحة صغيرة رغم ضخامة البيانات الكلية، مما يدفع `DM` لتطوير طرق "تعلّم ضعيف الإشراف" مثل: `semi-supervised learning`, `ensemble learning`, `active learning`, `transfer learning`.

#### ⚖️ المقايضة: `Data Mining` مقابل `Machine Learning`

| | `Data Mining` | `Machine Learning` |
| --- | --- | --- |
| المزايا | يتعامل مع بيانات ضخمة/تدفقات لا نهائية | نظريات تعلّم ناضجة على بيانات محدودة |
| العيوب | يحتاج جهداً إضافياً لطرق ضعيفة الإشراف عند قلة بيانات التدريب | قد لا يتوسّع بكفاءة على بيانات ضخمة جداً بدون تعديل |
| متى تختاره | عند التعامل مع قواعد بيانات ضخمة/تدفقات بيانات | عند بناء نموذج تنبؤي من بيانات موسومة محدودة نسبياً |

---

### 11. `Data Mining`: على أي أنواع من البيانات؟

#### النص الأصلي يقول:
> "Can be applied to any kind of data as long as the data are meaningful for a target application. Different data kinds may need different DM methodologies: Structured vs. unstructured data, Stored vs. streaming data, Data associated with specific applications e.g., Time-series data, sequence data, spatial/temporal/spatiotemporal data, graph and network data…"

#### الشرح المبسّط:
`Data Mining` قابل للتطبيق على أي نوع بيانات طالما كانت ذات معنى للتطبيق المستهدف، لكن **كل نوع بيانات يحتاج منهجية مختلفة**:
- بيانات **مهيكلة** (`structured`, كالجداول) مقابل **غير مهيكلة** (`unstructured`, كالنصوص الحرة).
- بيانات **مخزَّنة** (`stored`) مقابل **متدفقة** (`streaming`, تصل باستمرار).
- بيانات خاصة بتطبيقات محددة: سلاسل زمنية (`Time-series`)، بيانات متسلسلة (`sequence`)، بيانات مكانية/زمنية (`spatial, temporal, spatiotemporal`)، بيانات شبكات ورسوم بيانية (`graph and network data`).

> **ملاحظة:** المحاضرة الثانية مخصصة بالكامل للتعرّف على أنواع البيانات هذه بالتفصيل.

---

### 12. مهام `Data Mining`: ما أنواع الأنماط القابلة للاستخراج؟

#### النص الأصلي يقول:
> "Generally, Divided into two major categories: Predictive tasks: predict the value of a particular attribute based on the values of other attributes... From Prediction Tasks: Classification, Regression, and Deviation Detection. Descriptive tasks: derive patterns (correlations, trends and clusters) that summarize/characterize the underlying properties of the data... From Descriptive Tasks: Association Rule Discovery, Sequential Pattern Discovery, and Clustering."

#### الشرح المبسّط:
تُقسَّم مهام `Data Mining` عموماً لفئتين رئيسيتين:

| الفئة | الهدف | المتغيّر المستهدف | أمثلة | نوع التعلّم |
| --- | --- | --- | --- | --- |
| `Predictive tasks` | التنبؤ بقيمة صفة معيّنة (`target`/`dependent variable`) بناءً على صفات أخرى (`independent variables`) | معروف مسبقاً (بيانات موسومة) | `Classification`, `Regression`, `Deviation Detection` | `Supervised Learning` |
| `Descriptive tasks` | استخلاص أنماط (ارتباطات، اتجاهات، تجمّعات) تلخّص خصائص البيانات نفسها | غير موجود (بلا وسوم) | `Association Rule Discovery`, `Sequential Pattern Discovery`, `Clustering` | `Unsupervised Learning` |

**لماذا؟** لأن الفرق الجوهري هو: هل نملك "إجابة صحيحة" معروفة سلفاً نقيس عليها الأداء (تنبؤي) أم أننا نبحث فقط عن بنية مخفية في البيانات بدون إجابة معروفة (وصفي)؟

#### ملاحظة:
> المهام الوصفية (`Descriptive`) غالباً تتطلّب معالجة لاحقة (`post-processing`) للتحقق من النتائج وتفسيرها، لأنه لا يوجد معيار "صحيح/خطأ" جاهز كما في المهام التنبؤية.

---

### 13. تعدين قواعد الترافق (`Association Rules Mining`)

#### النص الأصلي يقول:
> "Task: Given a set of transactional records, each of which contain some number of items from a given collection → find all associations rules which will predict occurrence of an item based on occurrences of other items. E.g., Market basket analysis — such rules are used for sales promotion, shelf management…"

#### الشرح المبسّط:
لدينا مجموعة من "المعاملات" (`transactions`)، كل معاملة تحتوي مجموعة عناصر (`items`) — مثل سلة مشتريات عميل. هدف `Association Rules Mining` هو إيجاد قواعد من نوع "إذا اشترى الزبون A و B، فمن المرجّح أن يشتري C أيضاً"، بالاعتماد على تكرار ظهور العناصر معاً.

في مثال المحاضرة: من أصل 7 معاملات، ظهرت العناصر `b, c, d` معاً في 5 معاملات (~71%) → هذا يُسمّى `frequent itemset` (مجموعة عناصر متكررة). ومن ضمنها، وُجدت قاعدة أقوى: "في كل الحالات (100%) التي ظهر فيها b, c ظهر d أيضاً" → هذه `association rule` بثقة (`confidence`) كاملة.

**لماذا يهم هذا تجارياً؟** يُستخدم في تحليل سلة السوق (`Market Basket Analysis`) لتحديد ترويج المبيعات (`sales promotion`) وتنظيم الرفوف (`shelf management`) — مثال: وضع منتجين يُشتريان معاً غالباً بجوار بعضهما.

#### ⚙️ الخطوات / الخوارزمية: فكرة عامة عن استخراج قواعد الترافق (شرح زيادة للفهم)
> ملاحظة: التفاصيل الرياضية (`support`, `confidence`, `lift`) وخوارزمية `Apriori` ستُشرح في محاضرة مخصصة لاحقاً؛ هذه خطوات عامة فقط للفهم المبدئي.
```algorithm
1 | جمع المعاملات | قاعدة بيانات المعاملات | تحويل كل عملية شراء إلى سجلّ يحتوي مجموعة عناصر
2 | حساب التكرار | عدّ ظهور كل مجموعة عناصر | معرفة أي المجموعات تظهر معاً بشكل متكرر (frequent itemsets)
3 | استخراج القواعد | مقارنة نسب الظهور المشترك | صياغة قواعد مثل "b,c ⇒ d" بثقة معيّنة
4 | التقييم | مقاييس مثل الثقة والدعم | إبقاء القواعد المفيدة فقط وتجاهل الضعيفة
```
#### نقاط التنفيذ:
- عدد المعاملات الكبير يجعل حساب كل التركيبات الممكنة مكلفاً حسابياً؛ هذا ما تحله خوارزميات مثل `Apriori` لاحقاً.
- لم تُشرح صيغ `Support` و`Confidence` رقمياً في هذه المحاضرة التمهيدية (غير مشروحة في المحاضرة) — سيتم تناولها في محاضرة `Frequent Patterns & ARM`.

---

### 14. التحليل التنبؤي (`Predictive Analysis`): `Regression`

#### النص الأصلي يقول:
> "Regression: Predicts a value of a given continuous-valued target variable based on the values of other variables, assuming a linear or nonlinear model of dependency. Examples: Predicting house prices, future stock price, number of retweets, sales amounts based on advertising expenditure."

#### الشرح المبسّط:
`Regression` يتنبأ بقيمة **مستمرة (رقمية)** (`continuous-valued`)، مثل السعر أو الكمية، بافتراض وجود علاقة خطية أو غير خطية بين المتغيّر المستهدف والمتغيّرات الأخرى. مثال المحاضرة: التنبؤ بسعر منزل بناءً على مساحته ومواصفاته الأخرى (كلما زادت المساحة، ارتفع السعر تقريباً بخط مستقيم).

**لماذا `continuous`؟** لأن الناتج المطلوب (سعر، درجة حرارة، عدد إعادة تغريد) يمكن أن يأخذ أي قيمة رقمية ضمن مجال مستمر، وليس فئة محدودة.

#### 💡 التشبيه:
> التنبؤ بسعر منزل يشبه تقدير وزن شخص بناءً على طوله — كلما زاد الطول زاد الوزن تقريبياً بخط عام، لكن ليس بدقة مطلقة.
> **وجه الشبه:** الطول = المتغيّر المستقل (`independent variable`)، الوزن المتوقَّع = المتغيّر التابع المستمر (`continuous target`).

---

### 15. التحليل التنبؤي: `Classification`

#### النص الأصلي يقول:
> "Classification: Predict a value of a given discrete target variable based on the values of other attributes. Examples: predicting whether a user will make a purchase, sentiment classifier, personalized medical diagnosis, predict fraudulent cases in credit card transactions... A huge variety of classification algorithms: Decision trees, k nearest neighbours, Support vector machines, Neural networks, Bayesian classifiers, Ensembles."

#### الشرح المبسّط:
`Classification` يتنبأ بقيمة **فئوية (منفصلة)** (`discrete`)، أي أحد عدد محدود من الفئات الممكنة (مثال: مريض/سليم، احتيال/غير احتيال، إيجابي/سلبي). في مثال البطاقة الائتمانية: نستخدم بيانات المعاملة وصاحب الحساب (متى يشتري؟ ماذا يشتري؟ كم مرة يدفع في الوقت المحدد؟) كصفات (`attributes`) للتنبؤ بفئة "احتيال" أو "غير احتيال".

توجد خوارزميات تصنيف متعدّدة منها: `Decision Trees`, `k Nearest Neighbours (kNN)`, `Support Vector Machines (SVM)`, `Neural Networks`, `Bayesian classifiers`, وطرق `Ensembles` (تجميع عدة نماذج معاً، كما في مخطط بناء عدة أشجار قرار من عينات عشوائية ثم دمج نتائجها).

**لماذا يختلف عن `Regression`؟** لأن الناتج هنا فئة محدودة (مثال: 2 أو 3 أو N فئة) وليس رقماً مستمراً.

#### 📊 المخطط: `Classification` مقابل `Regression`

#### ما هذا المخطط؟
> يوضّح الفرق الجوهري بين نوعي التحليل التنبؤي من حيث طبيعة المتغيّر المستهدف.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Input Attributes | event | صفات مستقلة (مساحة منزل، سلوك شراء...) |
| 2 | Regression Model | process | يفترض علاقة خطية/غير خطية |
| 3 | Continuous Output | event | قيمة رقمية مستمرة (سعر، مبيعات) |
| 4 | Classification Model | process | يتعلّم حدود فصل بين الفئات |
| 5 | Discrete Output | event | فئة من مجموعة محدودة (احتيال/لا احتيال) |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Input Attributes | Regression Model | تغذية | تدفق عادي | الصفات تُدخَل للنموذج التنبؤي الرقمي |
| Regression Model | Continuous Output | تنبؤ | تدفق عادي | الناتج قيمة مستمرة |
| Input Attributes | Classification Model | تغذية | تدفق عادي | نفس الصفات قد تُستخدم لنموذج تصنيف |
| Classification Model | Discrete Output | تنبؤ | تدفق عادي | الناتج فئة منفصلة |

```diagram
type: flowchart
title: Regression vs Classification
direction: TD
nodes:
  - id: input
    label: Input Attributes
    kind: event
    level: 0
  - id: reg
    label: Regression Model
    kind: process
    level: 1
  - id: cont
    label: Continuous Output
    kind: event
    level: 2
  - id: clf
    label: Classification Model
    kind: process
    level: 1
  - id: disc
    label: Discrete Output
    kind: event
    level: 2
edges:
  - from: input
    to: reg
  - from: reg
    to: cont
  - from: input
    to: clf
  - from: clf
    to: disc
```

#### ⚖️ المقايضة: `Regression` مقابل `Classification`

| | `Regression` | `Classification` |
| --- | --- | --- |
| المزايا | مناسب للقيم الرقمية المستمرة (سعر، كمية) | مناسب للقرارات الفئوية الواضحة (نعم/لا) |
| العيوب | لا يصلح للتنبؤ بفئات منفصلة | لا يصلح للتنبؤ بقيم رقمية دقيقة مستمرة |
| متى تختاره | عند الحاجة لتوقّع رقم (سعر منزل، مبيعات) | عند الحاجة لتصنيف (احتيال، مرض، شعور) |

---

### 16. `Cluster Analysis` (تحليل التجميع)

#### النص الأصلي يقول:
> "The process of partitioning a set of data objects into multiple groups (or clusters) based on the principle of 'maximizing the intra-cluster similarity and minimizing the inter-cluster similarity'... Examples: Market Segmentation, Document Clustering (E.g., Google News)... A huge variety of clustering algorithms: Partitioning methods (k-Means), Model-based methods (DBSCAN), Grid-based methods (CLIQUE), Hierarchical methods, Model-based methods (EM), Constraint-based methods."

#### الشرح المبسّط:
`Cluster Analysis` هو تقسيم مجموعة من الكائنات (العملاء، الوثائق...) إلى مجموعات (`clusters`) بحيث:
- الكائنات **داخل نفس المجموعة** متشابهة جداً مع بعضها (`intra-cluster similarity` عالية / المسافات الداخلية صغيرة).
- الكائنات **بين مجموعات مختلفة** متباينة قدر الإمكان (`inter-cluster similarity` منخفضة / المسافات بين المجموعات كبيرة).

لا يوجد "وسم" مسبق يخبرنا بالمجموعة الصحيحة (على عكس `Classification`) — الخوارزمية تكتشف البنية بنفسها، لذا هو تعلّم غير مُشرَف عليه (`Unsupervised`).

**أمثلة تطبيقية:**
- **تجزئة السوق (`Market Segmentation`):** تقسيم عملاء كثيرين إلى مجموعات متشابهة (بالعمر، الدخل، التعليم...) لتصميم استراتيجيات تسويق مختلفة لكل مجموعة.
- **تجميع الوثائق (`Document Clustering`, مثال Google News):** تجميع الأخبار المتشابهة في الموضوع تلقائياً، لكن **بدون** معرفة المعنى الدلالي الفعلي للمجموعة (الخوارزمية تجمع، لكن لا تسمّي الموضوع بنفسها).

من خوارزميات التجميع: طرق التقسيم (`Partitioning`, مثل `k-Means`)، طرق قائمة على النموذج (`Model-based`, مثل `DBSCAN`, `EM`)، طرق شبكية (`Grid-based`, مثل `CLIQUE`)، طرق هرمية (`Hierarchical methods`)، وطرق مقيّدة (`Constraint-based`).

#### 💡 التشبيه:
> تخيّل توزيع مجموعة طلاب في فصل دراسي إلى مجموعات نقاش دون معرفة اهتماماتهم مسبقاً، فتجمعهم فقط حسب تشابه إجاباتهم في استبيان.
> **وجه الشبه:** تشابه الإجابات = تشابه الصفات (`attribute similarity`)، مجموعات النقاش = `clusters`.

#### مهم للامتحان ⚠️:
> لاحظ الفرق الدقيق: `Classification` = تعلّم مُشرَف (بيانات موسومة مسبقاً)، `Clustering` = تعلّم غير مُشرَف (بلا وسوم) — سؤال كلاسيكي في الامتحانات.

---

### 17. `Outlier Analysis` (تحليل القيم الشاذة)

#### النص الأصلي يقول:
> "A data set may contain some objects that do not comply with the general behavior or model of the data. These data objects are called outliers. Many data mining methods discard outliers as noise, while in some other applications the outliers can be more interesting than the more regularly occurring ones — might indicate data errors or device failures. Alternative names: anomaly mining or Deviation/Anomaly Detection. Applications: Credit Card Fraud Detection, Identify anomalous behavior from sensor networks, Network Intrusion Detection."

#### الشرح المبسّط:
`Outliers` هي كائنات بيانات **لا تتوافق** مع السلوك العام أو النموذج السائد للبيانات (نقاط بعيدة عن التجمّعات الرئيسية في الشكل التوضيحي). أحياناً نعتبرها "ضوضاء" (`noise`) نتجاهلها، وأحياناً أخرى تكون **هي بالضبط ما نبحث عنه** (احتيال، خلل جهاز).

**لماذا مهمة أحياناً أكثر من الأنماط العادية؟** لأن اكتشاف حالة احتيال واحدة نادرة قد يكون أهم تجارياً من معرفة النمط العام للمعاملات الطبيعية.

من أسمائه البديلة: `anomaly mining` أو `Deviation/Anomaly Detection`. من تطبيقاته: كشف احتيال بطاقات الائتمان (`Credit Card Fraud Detection`)، اكتشاف سلوك شاذ من شبكات الاستشعار، وكشف اختراقات الشبكة (`Network Intrusion Detection`).

#### الفهم الخاطئ الشائع ❌: القيم الشاذة (Outliers) دائماً أخطاء يجب حذفها.
#### الفهم الصحيح ✅: أحياناً تكون القيم الشاذة هي **الهدف الأساسي** للتحليل (كحالات الاحتيال)، وليست دائماً ضوضاء يجب تجاهلها.

---

### 18. القضايا الرئيسية في `Data Mining`

#### النص الأصلي يقول:
> "Major Issues in Data Mining: Scalability, High Dimensionality, Heterogeneous and Complex Data, Data Ownership and Distribution, Non-traditional Analysis."

#### الشرح المبسّط:
هذه عناوين للتحديات الكبرى التي تواجه `Data Mining` (لم تُفصَّل في هذه الشريحة، وستُناقَش لاحقاً بالتفصيل):

| القضية | فكرة عامة (شرح زيادة للفهم) |
| --- | --- |
| `Scalability` | التعامل مع بيانات ضخمة جداً بكفاءة زمنية ومكانية |
| `High Dimensionality` | وجود عدد كبير جداً من الصفات (أعمدة) لكل سجل |
| `Heterogeneous and Complex Data` | بيانات من أنواع وأشكال مختلفة (نصوص، صور، شبكات...) |
| `Data Ownership and Distribution` | البيانات موزّعة بين عدة جهات وقد لا يمكن جمعها في مكان واحد |
| `Non-traditional Analysis` | تحليل لا يتبع الفرضيات الإحصائية التقليدية الصارمة |

---

### 19. أدوات بايثون الأساسية لـ `Data Mining`

#### النص الأصلي يقول:
> "pandas: a Python data analysis/manipulation package providing fast, flexible, and expressive data structures designed to make data ready for data mining task. matplotlib: a visualization library used to make charts and diagrams. scikit-learn: provides lot of built-in machine learning algorithms and models, called estimators. Each estimator can be fitted to some data using its fit method. NumPy: an open-source Python library that provides fast performance for matrix operations."

#### الشرح المبسّط:
أربع مكتبات بايثون أساسية ستُستخدم عملياً طوال المقرر:

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `pandas` | تحليل ومعالجة البيانات، هياكل بيانات (`DataFrame`) مرنة | تجهّز البيانات لتكون جاهزة لمهمة التنقيب |
| `NumPy` | عمليات مصفوفات سريعة | أساس رياضي تُبنى عليه مكتبات أخرى مثل `pandas` |
| `matplotlib` | رسم مخططات وبيانات لفهمها بصرياً | يُستخدم لعرض النتائج والتحليل الاستكشافي |
| `scikit-learn` | خوارزميات ونماذج تعلّم آلي جاهزة (`estimators`) | كل `estimator` يُدرَّب بدالة `fit` |

بيئة العمل الشائعة: `Anaconda` كمُدير حزم، و`Jupyter Notebook` كبيئة تدوين وتنفيذ الكود تفاعلياً. توجد أيضاً أدوات متقدمة أخرى مذكورة في الشريحة الأخيرة مثل `XGBoost` و`TensorFlow` (للتعلّم العميق) دون تفصيل.

#### 💻 الكود: تحميل بيانات ونظرة أولية باستخدام `pandas`

#### ما هذا الكود؟
> مثال تمهيدي (غير وارد حرفياً في المحاضرة — شرح زيادة للفهم) يوضّح كيف تتحول بيانات من ملف `CSV` إلى جدول بيانات (`DataFrame`) جاهز للتحليل، كما في مخطط الشريحة (patient-records → CSV → pandas).

```python
# Import the pandas library for data handling
import pandas as pd

# Load patient records from a CSV file into a DataFrame
df = pd.read_csv("patient-records.csv")

# Show the first 5 rows to get a quick look at the data
print(df.head())

# Show basic statistics (count, mean, std, etc.) of numeric columns
print(df.describe())
```

#### شرح كل سطر:
1. `import pandas as pd` → استيراد المكتبة — تفعيل كل دوال `pandas` تحت الاسم المختصر `pd`.
2. `df = pd.read_csv(...)` → قراءة البيانات — تحويل ملف `CSV` الخام إلى جدول `DataFrame` منظّم.
3. `print(df.head())` → استكشاف أولي — عرض أول 5 صفوف للتأكد من صحة القراءة.
4. `print(df.describe())` → تلخيص إحصائي — نظرة سريعة على متوسط/انحراف القيم الرقمية (مرحلة `Data Exploration` من هرم Business Intelligence).

**المكتبات المطلوبة (Imports):**
> `import pandas as pd`

**الناتج المتوقع:**
> طباعة جدول يحتوي أول 5 سجلات مرضى، ثم جدول إحصائي (عدد، متوسط، انحراف معياري...) للأعمدة الرقمية.

---

## 📌 الأفكار الرئيسية الشاملة للمحاضرة

1. `Data Mining` وُلِد كحل لعجز التحليل اليدوي أمام الانفجار الهائل في حجم وتنوّع البيانات.
2. التعريف الجوهري: اكتشاف أنماط **غير بديهية، ضمنية، غير معروفة سابقاً، ومفيدة** من بيانات كبيرة.
3. ليس كل استرجاع بيانات هو `Data Mining` — يجب أن يكون هناك اكتشاف حقيقي لمعرفة جديدة.
4. `KDD` هي العملية الشاملة (7 خطوات تكرارية) التي يُعتبر `Data Mining` إحدى خطواتها الأساسية (أو مرادفاً لها بحسب وجهة النظر).
5. `DM` يلتقي مع تخصصات عديدة (`ML`, `Statistics`, `HPC`...) ويشترك مع `ML` بالخوارزميات لكنه يختلف في قابلية التوسّع وطبيعة بيانات التدريب.
6. مهام `DM` تنقسم إلى **تنبؤية** (`Classification`, `Regression`, `Deviation Detection` — تعلّم مُشرَف) و**وصفية** (`Association Rules`, `Sequential Patterns`, `Clustering` — تعلّم غير مُشرَف).
7. أدوات بايثون الأساسية: `pandas`, `NumPy`, `matplotlib`, `scikit-learn`.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Data Mining` | اكتشاف أنماط/نماذج/معرفة غير بديهية ومفيدة من بيانات كبيرة، بشكل آلي أو شبه آلي | البحث عن ذهب داخل رمل ضخم |
| `KDD` | العملية الكاملة لتحويل البيانات الخام إلى معرفة مفيدة (7 خطوات) | تُعتبر أحياناً مرادفة لـ `Data Mining` |
| `Data Warehouse` | مستودع بيانات من مصادر متعددة تحت مخطط موحّد بموقع واحد عادة | خطوة `Data Integration` |
| `Predictive Task` | التنبؤ بقيمة صفة مستهدفة بناءً على صفات أخرى | `Classification`, `Regression` |
| `Descriptive Task` | استخلاص أنماط تلخّص خصائص البيانات نفسها | `Clustering`, `Association Rules` |
| `Regression` | التنبؤ بمتغيّر مستمر (`continuous`) | سعر منزل |
| `Classification` | التنبؤ بمتغيّر فئوي منفصل (`discrete`) | احتيال / لا احتيال |
| `Clustering` | تقسيم البيانات لمجموعات متشابهة داخلياً ومتباينة فيما بينها | تجزئة السوق |
| `Association Rule Mining` | استخراج قواعد ترافق بين عناصر متكررة الظهور معاً | تحليل سلة السوق |
| `Outlier / Anomaly` | كائن بيانات لا يتوافق مع السلوك العام للبيانات | كشف الاحتيال |
| `Supervised Learning` | تعلّم من بيانات موسومة (لها إجابة معروفة) | `Classification`, `Regression` |
| `Unsupervised Learning` | تعلّم من بيانات غير موسومة (بلا إجابة معروفة) | `Clustering`, `Association Rules` |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `pandas` | معالجة وتحليل البيانات (`DataFrame`) | خطوة تحضير البيانات |
| `NumPy` | عمليات مصفوفات سريعة | أساس حسابي |
| `matplotlib` | رسم ومخططات | خطوة `Data Presentation` |
| `scikit-learn` | خوارزميات ونماذج تعلّم آلي جاهزة (`estimators` مع دالة `fit`) | خطوة `Data Mining` نفسها |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| نوع التعلّم | `Classification` (مُشرَف) | `Clustering` (غير مُشرَف) | وجود/غياب الوسم المسبق للفئة الصحيحة |
| نوع الهدف | `Regression` (مستمر) | `Classification` (منفصل) | طبيعة قيمة المتغيّر المتوقَّع |
| النطاق | `Data Mining` (بيانات ضخمة/تدفقات) | `Machine Learning` (بيانات أصغر تقليدياً) | حجم البيانات المستهدف والتركيز |
| البيانات | ما هو (`Data Mining`) | ما ليس (`Data Mining`) | وجود اكتشاف حقيقي لمعرفة جديدة أم استرجاع مباشر |

### قاموس المصطلحات (Glossary)

| الفئة | المصطلحات |
| --- | --- |
| عملية `KDD` | `Data Cleaning`, `Data Integration`, `Data Selection`, `Data Transformation`, `Data Mining`, `Evaluation`, `Knowledge Presentation` |
| مهام تنبؤية | `Classification`, `Regression`, `Deviation Detection` |
| مهام وصفية | `Association Rule Discovery`, `Sequential Pattern Discovery`, `Clustering` |
| خوارزميات تصنيف مذكورة | `Decision Trees`, `kNN`, `SVM`, `Neural Networks`, `Bayesian classifiers`, `Ensembles` |
| خوارزميات تجميع مذكورة | `k-Means`, `DBSCAN`, `CLIQUE`, `Hierarchical methods`, `EM`, `Constraint-based methods` |
| أدوات بايثون | `pandas`, `NumPy`, `matplotlib`, `scikit-learn`, `Jupyter`, `Anaconda` |

### أبرز النقاط الذهبية
1. `Data Mining` = اكتشاف معرفة **جديدة وغير بديهية**، وليس مجرد استرجاع بيانات.
2. `KDD` عملية **تكرارية** من 7 خطوات، لا خطية بالضرورة.
3. الفرق الجوهري بين `Predictive` و`Descriptive` هو وجود متغيّر مستهدف معروف من عدمه.
4. `Regression` = مخرجات مستمرة، `Classification` = مخرجات فئوية.
5. `Clustering` بلا وسوم مسبقة (`unsupervised`)، على عكس `Classification`.
6. القيم الشاذة (`Outliers`) ليست دائماً ضوضاء تُهمَل — أحياناً هي الهدف بحد ذاته.
7. `DM` و`ML` يشتركان بالخوارزميات لكنهما يختلفان بحجم البيانات وطريقة الإشراف على التدريب.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| اعتبار أي استعلام بحث "تنقيب بيانات" | `Data Mining` يتطلّب اكتشاف نمط جديد غير معروف مسبقاً، لا استرجاعاً مباشراً |
| الخلط بين `Classification` و`Clustering` | الأول مُشرَف (بيانات موسومة)، الثاني غير مُشرَف (بلا وسوم) |
| اعتبار `KDD` و`Data Mining` مترادفَين دائماً | بعض المراجع تعتبر `DM` خطوة واحدة فقط ضمن `KDD`، والبعض الآخر يعتبرهما مترادفَين |
| اعتبار القيم الشاذة دائماً أخطاءً يجب حذفها | قد تكون هي الهدف الأساسي للتحليل (كحالات الاحتيال) |
| الخلط بين `Regression` و`Classification` | الفيصل هو نوع المتغيّر المستهدف: مستمر (Regression) أم منفصل (Classification) |

---

### خطوات وإجراءات المحاضرة
> كل خوارزمية/إجراء → `algorithm` block مستقل.

#### ⚙️ الخطوات / الخوارزمية: عملية `KDD` الكاملة
> ما هدفها؟ تحويل البيانات الخام إلى معرفة مفيدة عبر تسلسل تكراري من 7 خطوات.
```algorithm
1 | Data Cleaning | خوارزميات تنظيف | إزالة الضوضاء والبيانات غير المتّسقة
2 | Data Integration | أدوات دمج المصادر | دمج بيانات من مصادر متعددة متغايرة
3 | Data Selection | استعلامات قاعدة البيانات | اختيار البيانات ذات الصلة بمهمة التنقيب
4 | Data Transformation | تقنيات التحويل | تحويل البيانات لصيغة مناسبة للتنقيب
5 | Data Mining | خوارزميات ذكية (Apriori, k-Means...) | استخراج الأنماط أو بناء النماذج
6 | Evaluation | مقاييس تقييم | تحديد الأنماط المفيدة فعلياً
7 | Knowledge Presentation | تقنيات العرض والتصوّر | تقديم المعرفة للمستخدم النهائي
```
#### نقاط التنفيذ:
- العملية قد تعود لخطوات سابقة (تكرارية) عند عدم رضا نتائج التقييم.
- الخطوات 1-4 تُعرف مجتمعة بـ `Data Preparation`.

#### ⚙️ الخطوات / الخوارزمية: فكرة عامة لاستخراج قواعد الترافق (شرح زيادة للفهم)
> ما هدفها؟ إيجاد علاقات ظهور مشترك بين عناصر داخل معاملات (transactions).
```algorithm
1 | جمع المعاملات | قاعدة بيانات المعاملات | تمثيل كل عملية شراء كمجموعة عناصر
2 | حساب التكرار | عدّ الظهور المشترك | تحديد مجموعات العناصر المتكررة (frequent itemsets)
3 | استخراج القواعد | مقارنة النسب | صياغة قواعد بثقة (confidence) معيّنة
4 | التقييم | مقاييس الجودة | إبقاء القواعد المفيدة فقط
```
#### نقاط التنفيذ:
- التفاصيل الرياضية الدقيقة (Support/Confidence/Lift) خارج نطاق هذه المحاضرة التمهيدية.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| قراءة بيانات | `pd.read_csv("file.csv")` | بداية أي مشروع تنقيب بيانات |
| استكشاف أولي | `df.head()`, `df.describe()` | فهم شكل وتوزيع البيانات قبل المعالجة |
| بناء نموذج (عام scikit-learn) | `model = Estimator(); model.fit(X, y)` | تدريب أي نموذج تصنيف/انحدار/تجميع لاحقاً |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| نتائج التقييم غير مرضية في `KDD` | العودة لخطوة اختيار/تحويل بيانات مختلفة | لأن العملية تكرارية وليست خطية |
| بيانات بلا وسوم معروفة | استخدام `Unsupervised Learning` (`Clustering`, `Association Rules`) | لا يوجد "إجابة صحيحة" نقيس عليها الأداء مباشرة |
| بيانات موسومة بمتغيّر مستمر | استخدام `Regression` | الهدف رقم مستمر وليس فئة |
| بيانات موسومة بمتغيّر فئوي | استخدام `Classification` | الهدف فئة من عدد محدود من الخيارات |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% | سيناريو كود/خوارزمية 30% | تطبيق 30% | تتبع خوارزميات 15%.

### السؤال 1 (medium)
ما هو السبب الرئيسي الذي أدى إلى "ولادة" `Data Mining` بحسب المحاضرة؟
أ) رغبة الشركات في بيع برمجيات جديدة
ب) عجز التحليل اليدوي عن مواكبة الحجم والتعقيد المتزايدين للبيانات
ج) الحاجة لتخزين البيانات على السحابة
د) انخفاض تكلفة الحواسيب فقط
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "this explosively growing of the data their complexity does not allow for manual analysis" ⟹ "birth of data mining". الخيارات الأخرى (أ، ج، د) عوامل مساعدة عامة لكن غير مذكورة كسبب مباشر في المحاضرة.

---

### السؤال 2 (medium)
أي مما يلي **ليس** شرطاً أساسياً في تعريف النمط المُكتشَف في `Data Mining`؟
أ) غير بديهي (non-trivial)
ب) معروف مسبقاً (previously known)
ج) ضمني (implicit)
د) مفيد عملياً (potentially useful)
**الإجابة الصحيحة: ب**
**التعليل:** التعريف يشترط أن يكون النمط "previously **unknown**"، أي غير معروف مسبقاً؛ لذا "معروف مسبقاً" يناقض التعريف تماماً. باقي الخيارات (أ، ج، د) شروط صريحة في النص.

---

### السؤال 3 (hard)
لماذا يُعتبر مصطلح "Data Mining" `misnomer` (تسمية غير دقيقة) بحسب المحاضرة؟
أ) لأنه لا علاقة له بالبيانات إطلاقاً
ب) لأننا في التنقيب نُسمّي العملية باسم الهدف النفيس (كالذهب) لا باسم المادة الخام (كالرمل)، بينما التسمية هنا اعتمدت "Data" وهي المادة الخام
ج) لأن الاسم قصير جداً
د) لأن الاسم مأخوذ من لغة أخرى
**الإجابة الصحيحة: ب**
**التعليل:** النص يقول "we say gold mining not rock or sand mining" ثم يوضح أن الاسم الأدق كان "knowledge mining from data" لكنه طويل. الخيارات الأخرى غير مذكورة أو غير منطقية.

---

### السؤال 4 (medium)
البحث عن سجلّ عميل معيّن برقم حسابه داخل قاعدة بيانات، وفق المحاضرة، يُعتبر:
أ) مثالاً نموذجياً على `Data Mining`
ب) ليس `Data Mining`، لأنه يمكن إنجازه بتفاعل بسيط مع `DBMS`
ج) نوعاً من `Clustering`
د) نوعاً من `Association Rule Mining`
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر صراحة أن "looking up individual records in a database" مثال على ما **ليس** `Data Mining` لأنه يُنجز عبر تفاعل بسيط مع نظام `DBMS`.

---

### السؤال 5 (medium)
في مثال `Google Flu Trends` المذكور بالمحاضرة، ما النمط المكتشَف؟
أ) عدد المستخدمين النشطين على Google
ب) علاقة وثيقة بين عدد عمليات البحث عن معلومات متعلقة بالإنفلونزا وعدد المصابين فعلياً
ج) موقع كل مستخدم جغرافياً
د) سرعة الإنترنت في كل منطقة
**الإجابة الصحيحة: ب**
**التعليل:** النص: "found a close relationship between the number of people who search for flu-related information and the number of people who actually infected."

---

### السؤال 6 (hard)
أي ترتيب صحيح لخطوات عملية `KDD` كما وردت في المحاضرة؟
أ) Data Mining → Data Cleaning → Evaluation → Selection → Integration → Transformation → Presentation
ب) Data Cleaning → Data Integration → Data Selection → Data Transformation → Data Mining → Evaluation → Knowledge Presentation
ج) Evaluation → Data Mining → Data Cleaning → Selection → Transformation → Integration → Presentation
د) Data Selection → Data Cleaning → Data Mining → Integration → Transformation → Presentation → Evaluation
**الإجابة الصحيحة: ب**
**التعليل:** هذا هو الترتيب الحرفي المذكور في الشرائح (1 إلى 7). الخيارات الأخرى تُبدّل ترتيب الخطوات بشكل غير متوافق مع تسلسل الشريحة.

---

### السؤال 7 (medium)
ما تعريف `Data Warehouse` بحسب المحاضرة؟
أ) قاعدة بيانات لتخزين ملفات الصور فقط
ب) مستودع بيانات مُجمَّع من مصادر متعددة متغايرة (heterogeneous)، منظّم تحت مخطط موحّد، ويُخزَّن عادة في موقع واحد
ج) خوارزمية لتصنيف البيانات
د) أداة لتصوير النتائج بيانياً
**الإجابة الصحيحة: ب**
**التعليل:** التعريف الحرفي في المحاضرة: "A repository of data collected from multiple heterogeneous data sources, organized under a unified schema, and usually stored at a single site."

---

### السؤال 8 (medium)
في هرم `Data Mining in Business Intelligence`، من هو المستخدم المسؤول عادة عن طبقة `Data Mining (Information Discovery)`؟
أ) `End User`
ب) `Business Analyst`
ج) `Data Analyst`
د) `DBA`
**الإجابة الصحيحة: ج**
**التعليل:** في المخطط، طبقة `Data Mining` مقابلة لـ `Data Analyst`، بينما `Data Presentation` مقابلة لـ `Business Analyst`، و`Decision Making` مقابلة لـ `End User`، و`Data Sources`/`Preprocessing` مقابلة لـ `DBA`.

---

### السؤال 9 (hard)
وفق مخطط "التقاء عدة تخصصات"، ما الفرق الذي أشارت له المحاضرة صراحة بين `Parallel computing` و`Distributed techniques`؟
أ) لا فرق بينهما إطلاقاً
ب) `Parallel computing` لمعالجة الحجم الضخم للبيانات، بينما `Distributed techniques` تُستخدم عندما لا يمكن تجميع البيانات في مكان واحد
ج) `Parallel computing` فقط للصور، و`Distributed` فقط للنصوص
د) كلاهما يُستخدم فقط في `Regression`
**الإجابة الصحيحة: ب**
**التعليل:** النص: "Parallel computing Techniques: for addressing the massive size of datasets. Distributed techniques: when the data cannot be gathered in one location."

---

### السؤال 10 (medium)
حسب تعريف `Arthur Samuel` (1959) المذكور في المحاضرة، `Machine Learning` هو:
أ) برمجة صريحة لكل الحالات الممكنة
ب) قدرة الحاسوب على التعلّم دون أن يُبرمَج بشكل صريح
ج) تخزين البيانات فقط دون تحليل
د) استخدام الحاسوب لحل معادلات رياضية معروفة سلفاً فقط
**الإجابة الصحيحة: ب**
**التعليل:** الاقتباس الحرفي: "gives computers the ability to learn without being explicitly programmed."

---

### السؤال 11 (hard)
سيناريو: خوارزمية تعلّم آلي تحاول 100 مرة تعديل "خطوات" طهي دجاجة حتى تصل لنتيجة صحيحة، بدلاً من إعطائها الوصفة المضبوطة مباشرة. أي فكرة من المحاضرة يمثّلها هذا المثال؟
أ) الخوارزمية التقليدية (Normal algorithm) التي تبدأ بالخطوات وتصل للنتيجة
ب) خوارزمية التعلّم الآلي التي تبدأ من المدخلات والمخرجات المعروفة، وتحاول اكتشاف الخطوات (القواعد) بنفسها
ج) مثال على `Association Rule Mining`
د) مثال على `Data Cleaning`
**الإجابة الصحيحة: ب**
**التعليل:** المحاضرة توضح أن `Machine learning algorithm` "Starts with Inputs, Output" و"Figures out" الخطوات، على عكس الخوارزمية العادية التي تبدأ بالخطوات المعروفة مسبقاً لتصل إلى ناتج.

---

### السؤال 12 (medium)
أي مما يلي يُصنَّف ضمن `Supervised Learning` وفق المحاضرة؟
أ) `Clustering` و`Association Rule Learning`
ب) `Classification` و`Regression`
ج) `Reinforcement Learning` فقط
د) `Outlier Detection` فقط
**الإجابة الصحيحة: ب**
**التعليل:** المخطط يضع `Classification` و`Regression` تحت `labeled dataset` (أي Supervised)، بينما `Clustering` و`Association Rule Learning` تحت `unlabeled dataset` (Unsupervised).

---

### السؤال 13 (hard)
ما الفرق الرئيسي الأول بين `Data Mining` و`Machine Learning` بحسب المحاضرة؟
أ) `DM` لا يستخدم أي خوارزميات إطلاقاً
ب) `DM` غالباً يعمل على بيانات ضخمة جداً أو تدفقات لا نهائية، بينما `ML` تقليدياً يركّز على بيانات أصغر
ج) `ML` لا يمكن استخدامه على أي بيانات كبيرة إطلاقاً
د) لا يوجد فرق أساساً بينهما
**الإجابة الصحيحة: ب**
**التعليل:** النص: "DM often works on very large datasets or even on infinite data streams. ML Focus on small datasets" — هذا أول فرق مذكور (Scalability).

---

### السؤال 14 (medium)
سيناريو: لديك بيانات معاملات شراء بدون أي "تصنيف صحيح" معروف مسبقاً، وتريد اكتشاف مجموعات عملاء متشابهين تلقائياً. أي مهمة تنقيب مناسبة هنا؟
أ) `Classification`
ب) `Regression`
ج) `Clustering`
د) `Deviation Detection` فقط
**الإجابة الصحيحة: ج**
**التعليل:** غياب وجود وسم/فئة صحيحة معروفة مسبقاً واحتياج لاكتشاف مجموعات متشابهة يشير مباشرة لمهمة `Cluster Analysis` (تعلّم غير مُشرَف).

---

### السؤال 15 (hard)
في مثال تحليل سلة السوق بالمحاضرة، ظهرت العناصر `b, c, d` معاً في 5 من أصل 7 معاملات (~71%)، وفي كل الحالات التي ظهر فيها `b, c` (5 حالات) ظهر `d` أيضاً (100%). ماذا يُسمّى الرقم 71% في سياق `Association Rules`؟
أ) دقة النموذج (Accuracy)
ب) نسبة تكرار مجموعة عناصر (`frequent itemset` support تقريبي)
ج) قيمة `F1-score`
د) معدل الخطأ (Error Rate)
**الإجابة الصحيحة: ب**
**التعليل:** النسبة 71% تمثّل مدى تكرار ظهور مجموعة العناصر `b,c,d` معاً ضمن كل المعاملات — وهذا هو المفهوم العام لـ `frequent itemset` (الصيغة الدقيقة لـ Support ستُشرح لاحقاً في محاضرة مخصصة).

---

### السؤال 16 (medium)
أي من التالي **ليس** من مصادر البيانات الرئيسية المذكورة في المحاضرة كسبب لظهور `Data Mining`؟
أ) `Businesses` (معاملات البيع)
ب) `Social Media`
ج) `Health Industry`
د) الأرشيف الورقي غير الرقمي فقط
**الإجابة الصحيحة: د**
**التعليل:** المحاضرة ذكرت أربعة مصادر رئيسية: `Businesses`, `Social Media`, `Health Industry`, و`Scientific/Engineering applications (IoT)` — لم تذكر "الأرشيف الورقي غير الرقمي" كمصدر رئيسي لهذا الانفجار في البيانات.

---

## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: منطقية، سوء فهم، فحص إرجاع، dead code.

### سؤال تصحيح 1 (misconception)
**الكود التالي يحتوي خطأ:**
```python
# Load a CSV file and immediately train a classification model
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

df = pd.read_csv("credit_transactions.csv")

model = DecisionTreeClassifier()
model.fit(df, df["is_fraud"])  # target column included in features
```
**اكتشف الخطأ:** عمود الهدف `is_fraud` تم تمريره ضمن `df` كصفات (features) أيضاً، بدلاً من فصله كمتغيّر مستهدف مستقل.

**التصحيح:**
```python
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

df = pd.read_csv("credit_transactions.csv")

# Separate features (X) from the target variable (y)
X = df.drop(columns=["is_fraud"])
y = df["is_fraud"]

model = DecisionTreeClassifier()
model.fit(X, y)
```
**شرح الحل:**
1. المتغيّر المستهدف (`target`/`dependent variable`) يجب أن يُفصَل عن الصفات المستقلة (`independent variables`) كما ورد في تعريف المهام التنبؤية بالمحاضرة.
2. تضمين `is_fraud` ضمن X يجعل النموذج "يغش" (data leakage) بمعرفة الإجابة مسبقاً.
3. الفصل الصحيح (`X`, `y`) هو الأساس لأي مهمة `Classification` أو `Regression`.

---

### سؤال تصحيح 2 (logic)
**الكود التالي يحتوي خطأ:**
```python
# Trying to explore data before checking it exists
import pandas as pd

df = pd.read_csv("sales.csv")
print(df.describe())
df = pd.read_csv("sales.csv")  # reloading unnecessarily
print(df.head())
```
**اكتشف الخطأ:** إعادة تحميل نفس الملف مرتين بدون سبب — كود زائد (`dead code` من ناحية الكفاءة) لا يفيد ويهدر الموارد.

**التصحيح:**
```python
import pandas as pd

df = pd.read_csv("sales.csv")
print(df.head())      # explore first
print(df.describe())  # then summarize
```
**شرح الحل:**
1. يكفي تحميل البيانات مرة واحدة فقط.
2. الترتيب المنطقي الأفضل في `Data Exploration` هو النظر أولاً (`head`) ثم التلخيص الإحصائي (`describe`).
3. تجنّب تكرار عمليات القراءة يوفّر الوقت خصوصاً مع ملفات كبيرة (مبدأ `Scalability`).

---

### سؤال تصحيح 3 (return_check)
**الكود التالي يحتوي خطأ:**
```python
from sklearn.cluster import KMeans

def cluster_customers(data, k):
    model = KMeans(n_clusters=k)
    model.fit(data)
    # forgot to return the cluster labels

labels = cluster_customers(customer_data, 3)
print(labels[:10])  # this will fail
```
**اكتشف الخطأ:** الدالة `cluster_customers` لا تُرجع (`return`) أي قيمة، لذا `labels` ستكون `None` ويفشل السطر الأخير.

**التصحيح:**
```python
from sklearn.cluster import KMeans

def cluster_customers(data, k):
    model = KMeans(n_clusters=k)
    model.fit(data)
    return model.labels_  # return the cluster assignment for each point

labels = cluster_customers(customer_data, 3)
print(labels[:10])
```
**شرح الحل:**
1. أي دالة تُستخدم نتيجتها لاحقاً يجب أن تحتوي `return` صريحاً.
2. `model.labels_` هو السمة (`attribute`) التي تحمل رقم المجموعة (`cluster`) لكل نقطة بعد `fit`.
3. غياب `return` خطأ شائع جداً عند تحويل كود `notebook` تفاعلي إلى دوال قابلة لإعادة الاستخدام.

---

### سؤال تصحيح 4 (misconception)
**الكود التالي يحتوي خطأ:**
```python
# Trying to predict a continuous house price using a classifier
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier()
model.fit(X_train, house_prices)  # house_prices are continuous values like 235000.50
```
**اكتشف الخطأ:** استخدام `DecisionTreeClassifier` (نموذج تصنيف لمتغيّر فئوي منفصل) للتنبؤ بقيمة مستمرة مثل سعر منزل — خطأ مفاهيمي في اختيار نوع المهمة.

**التصحيح:**
```python
from sklearn.tree import DecisionTreeRegressor

model = DecisionTreeRegressor()
model.fit(X_train, house_prices)
```
**شرح الحل:**
1. حسب المحاضرة، `Regression` هو المناسب للمتغيّرات المستمرة (`continuous-valued target`) كسعر المنزل.
2. `Classification` مناسب فقط للمتغيّرات الفئوية المنفصلة (`discrete`).
3. استخدام النوع الخاطئ من النموذج يؤدي لنتائج غير منطقية أو أخطاء تنفيذ.

---

### سؤال تصحيح 5 (dead_code)
**الكود التالي يحتوي خطأ:**
```python
import pandas as pd

def clean_data(df):
    df = df.dropna()          # remove missing values
    return df
    print("Data cleaned!")    # unreachable line

df = pd.read_csv("data.csv")
df = clean_data(df)
```
**اكتشف الخطأ:** سطر `print("Data cleaned!")` يقع بعد `return`، وبالتالي هو `dead code` لن يُنفَّذ أبداً.

**التصحيح:**
```python
import pandas as pd

def clean_data(df):
    df = df.dropna()          # remove missing values
    print("Data cleaned!")    # moved before return
    return df

df = pd.read_csv("data.csv")
df = clean_data(df)
```
**شرح الحل:**
1. أي سطر بعد `return` داخل نفس المسار التنفيذي لن يُنفَّذ إطلاقاً — يجب نقله قبل `return`.
2. هذا مثال تطبيقي على خطوة `Data Cleaning` من عملية `KDD` (إزالة الضوضاء والقيم المفقودة).
3. اكتشاف `dead code` مهم لتفادي أوهام بأن رسالة تأكيد ستظهر فعلياً.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1: تصنيف المهام (fill_gaps)

**السيناريو / المطلوب:**
صنّف كل مهمة تالية إلى `Predictive` أو `Descriptive`، ثم إلى الخوارزمية النوعية الأقرب (`Classification`/`Regression`/`Clustering`/`Association Rules`):
1. التنبؤ بسعر سهم غداً.
2. تجميع مقالات إخبارية متشابهة الموضوع.
3. تحديد إن كانت رسالة بريد إلكتروني "spam" أم لا.
4. إيجاد أن شراء "خبز" و"زبدة" غالباً يرافقه شراء "مربى".

**المطلوب:**
1. صنّف كل حالة (Predictive/Descriptive).
2. حدّد نوع المهمة الدقيق.

**نموذج الحل:**
| # | الفئة العامة | نوع المهمة الدقيق |
| --- | --- | --- |
| 1 | Predictive | Regression (قيمة مستمرة: السعر) |
| 2 | Descriptive | Clustering (تجميع بلا وسم مسبق) |
| 3 | Predictive | Classification (فئة منفصلة: spam/not spam) |
| 4 | Descriptive | Association Rule Mining |

---

### تمرين 2: تصحيح مفهوم خاطئ (code_fix)

**السيناريو / المطلوب:**
طالب كتب: "البحث في Google عن صفحات تحتوي كلمة 'Amazon' هو مثال ممتاز على Data Mining لأنه يستخدم خوارزميات معقدة."

**المطلوب:**
1. حدّد الخطأ المفاهيمي في هذه الجملة.
2. اكتب تصحيحاً دقيقاً بالاستناد لتعريف المحاضرة.

**نموذج الحل:**
الخطأ: مجرد البحث عن كلمة مفتاحية هو استرجاع معلومة (Information Retrieval) وليس اكتشاف نمط جديد. التصحيح: حسب المحاضرة، هذا المثال بالذات مذكور صراحة كمثال على "ما ليس Data Mining" لأنه "can be accomplished through simple interactions with... an information retrieval system"، بغض النظر عن مدى تعقيد الخوارزمية المستخدمة في محرك البحث نفسه؛ فمعيار Data Mining هو اكتشاف معرفة **جديدة وغير معروفة سابقاً**، وليس مجرد كون الأداة معقدة تقنياً.

---

### تمرين 3: سيناريو تطبيقي (scenario)

**السيناريو / المطلوب:**
شركة تجارة إلكترونية تريد: (أ) تحديد العملاء الذين قد يتوقفون عن الشراء (churn) بناءً على سجل عمليات شرائهم السابقة الموسومة بـ "توقف/استمر"، و(ب) تجميع منتجاتها إلى فئات متشابهة بدون تصنيف مسبق.

**المطلوب:**
1. حدّد نوع مهمة `Data Mining` المناسبة لكل من (أ) و(ب).
2. برّر اختيارك بالاستناد إلى تعريفَي `Predictive` و`Descriptive`.

**نموذج الحل:**
(أ) `Classification` (مهمة تنبؤية): يوجد متغيّر مستهدف فئوي معروف مسبقاً (توقف/استمر) نتعلّم منه.
(ب) `Clustering` (مهمة وصفية): لا يوجد تصنيف مسبق للمنتجات، والهدف اكتشاف بنية تشابه داخلية.

---

### تمرين 4: حساب مفاهيمي (metric_calculation)

**السيناريو / المطلوب:**
لديك 10 معاملات شراء، ظهرت فيها مجموعة العناصر `{تفاح, حليب}` معاً في 6 معاملات.

**المطلوب:**
1. احسب النسبة المئوية لظهور هذه المجموعة معاً من إجمالي المعاملات (المفهوم العام لـ `frequent itemset` كما ورد في المحاضرة، دون الدخول في صيغة `Support` الرسمية التي ستُشرح لاحقاً).

**نموذج الحل:**
النسبة = (6 / 10) × 100 = **60%**. أي أن مجموعة `{تفاح, حليب}` تُعتبر مجموعة عناصر متكررة الظهور بشكل ملحوظ ضمن المعاملات، على غرار مثال `{b,c,d}` في المحاضرة (71%).

---

### تمرين 5: تطبيق نموذج (model_apply)

**السيناريو / المطلوب:**
لديك بيانات عملاء (العمر، الدخل، عدد الزيارات الشهرية) بدون أي تصنيف مسبق، وتريد تقسيمهم إلى 3 مجموعات تسويقية.

**المطلوب:**
1. أي خوارزمية تجميع مذكورة في المحاضرة أنسب هنا كبداية بسيطة؟
2. اكتب استدعاء بايثون تقريبياً باستخدام `scikit-learn`.

**نموذج الحل:**
1. `k-Means` (من طرق `Partitioning methods`) هي الأنسب كبداية بسيطة لأن عدد المجموعات (3) معروف مسبقاً.
2.
```python
from sklearn.cluster import KMeans

# n_clusters=3 because we want exactly 3 marketing segments
model = KMeans(n_clusters=3)
model.fit(customer_features)  # customer_features: age, income, visits
segments = model.labels_
```

---

### تمرين 6: مقارنة تطبيقية (scenario)

**السيناريو / المطلوب:**
مستشفى يريد استخدام سجلات المرضى (بدون وسم مسبق للأمراض) لاكتشاف مجموعات مرضى متشابهين في الأعراض من جهة، وأيضاً بناء نظام يتنبأ إن كان مريض جديد "مصاباً" أو "سليماً" بناءً على بيانات مرضى سابقين موسومة من جهة أخرى.

**المطلوب:**
1. حدّد المهمتين المناسبتين لكل جزء من السيناريو.
2. اشرح الفرق الجوهري بينهما بجملة واحدة.

**نموذج الحل:**
- الجزء الأول (بدون وسم): `Clustering` (تعلّم غير مُشرَف).
- الجزء الثاني (موسوم مسبقاً): `Classification` (تعلّم مُشرَف).
- الفرق الجوهري: وجود إجابة/فئة صحيحة معروفة مسبقاً نتعلّم منها (Classification) مقابل غيابها الكامل (Clustering).

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 1: دراسة حالة (case_study)

**السيناريو:**
بنك يواجه مشكلة عمليات احتيال متزايدة على بطاقات الائتمان. لديه ملايين المعاملات، لكن حالات الاحتيال المؤكدة نادرة جداً (أقل من 1%).

**المطلوب:**
1. أي مهمة/مهام `Data Mining` من المحاضرة تُناسب هذه المشكلة؟
2. اربط الحل بخطوات `KDD` السبع.

**نموذج الحل:**
1. المهمة الأساسية: `Classification` (تصنيف معاملة كـ"احتيال/لا احتيال")، بالإضافة إلى `Outlier/Anomaly Detection` كون حالات الاحتيال نادرة وشاذة عن السلوك العام.
2. تطبيق `KDD`: (1) تنظيف بيانات المعاملات من الأخطاء، (2) دمج بيانات من فروع/أنظمة مختلفة، (3) اختيار الحقول ذات الصلة (وقت الشراء، المبلغ، الموقع...)، (4) تحويلها لصيغة رقمية مناسبة، (5) تطبيق نموذج تصنيف/كشف شذوذ، (6) تقييم الأداء (خصوصاً بسبب ندرة الفئة الإيجابية)، (7) عرض التنبيهات لفريق مكافحة الاحتيال.

---

### تمرين 2: إكمال جدول مقارنة (table_fill)

**السيناريو:**
أكمل الجدول التالي بمقارنة بين المهام الأربع الرئيسية المذكورة في المحاضرة.

**المطلوب:**
| المهمة | نوع التعلّم | نوع المتغيّر المستهدف | مثال |
| --- | --- | --- | --- |
| Regression | ؟ | ؟ | ؟ |
| Classification | ؟ | ؟ | ؟ |
| Clustering | ؟ | ؟ | ؟ |
| Association Rules | ؟ | ؟ | ؟ |

**نموذج الحل:**
| المهمة | نوع التعلّم | نوع المتغيّر المستهدف | مثال |
| --- | --- | --- | --- |
| Regression | Supervised | مستمر (Continuous) | التنبؤ بسعر منزل |
| Classification | Supervised | منفصل (Discrete) | كشف رسائل Spam |
| Clustering | Unsupervised | لا يوجد متغيّر مستهدف | تجزئة السوق |
| Association Rules | Unsupervised | لا يوجد متغيّر مستهدف | تحليل سلة السوق |

---

### تمرين 3: تحليل مكتوب (written_analysis)

**السيناريو:**
اشرح بأسلوبك الخاص لماذا تعتبر المحاضرة أن `Data Mining` و`Machine Learning` "يشتركان بنفس الخوارزميات الحرجة" لكنهما ليسا الشيء ذاته تماماً.

**المطلوب:**
1. اكتب فقرة تحليلية (3-5 أسطر) تُجيب على السؤال.

**نموذج الحل:**
كلا المجالين يعتمدان على نفس الأساس الرياضي والخوارزمي لاكتشاف الأنماط (تصنيف، انحدار، تجميع...)، لذا "يتقاطعان" في الأدوات. لكن `Data Mining` يتميّز بتركيزه على قابلية التوسّع للتعامل مع بيانات ضخمة جداً أو تدفقات مستمرة، وبضرورة تطوير طرق تعلّم "ضعيفة الإشراف" (شبه مُشرَف، تجميعي، نقل تعلّم) عندما تكون بيانات التدريب الموسومة محدودة رغم ضخامة البيانات الكلية — وهو تحدٍّ أقل بروزاً تقليدياً في أدبيات `ML` الكلاسيكية.

---

### تمرين 4: إكمال مخطط (diagram_completion)

**السيناريو:**
أعد رسم مخطط عملية `KDD` نصياً بترتيب الخطوات الصحيح، مع ذكر مدخل ومخرج كل خطوة.

**المطلوب:**
1. أكمل الجدول بالترتيب الصحيح.

| الرقم | الخطوة | المدخل | المخرج |
| --- | --- | --- | --- |
| 1 | ؟ | بيانات خام من مصادر متعددة | ؟ |
| ... | ... | ... | ... |

**نموذج الحل:**
| الرقم | الخطوة | المدخل | المخرج |
| --- | --- | --- | --- |
| 1 | Data Cleaning | بيانات خام بها ضوضاء/تناقضات | بيانات نظيفة |
| 2 | Data Integration | بيانات نظيفة من مصادر متعددة | بيانات مدمجة في مستودع موحّد |
| 3 | Data Selection | مستودع بيانات كامل | مجموعة فرعية ذات صلة بالمهمة |
| 4 | Data Transformation | بيانات مختارة بصيغتها الأصلية | بيانات محوَّلة لصيغة مناسبة للتنقيب |
| 5 | Data Mining | بيانات محوَّلة | أنماط/نماذج مستخرجة |
| 6 | Evaluation | أنماط مستخرجة | أنماط "مثيرة للاهتمام" فعلياً |
| 7 | Knowledge Presentation | أنماط مقيَّمة | معرفة معروضة للمستخدم |

---

## الجزء الرابع: تمارين تتبع التنفيذ

> ≥5 تمارين تتبع. **ملاحظة:** خوارزميات `Apriori`, `k-Means`, `Decision Tree`, `Gradient Descent` بالتفصيل الرياضي ستُشرح في محاضرات لاحقة؛ التمارين هنا تمهيدية مفاهيمية (غير مشروحة بالتفصيل في هذه المحاضرة تحديداً) لتجهيزك لما هو قادم.

### تمرين تتبع 1: تتبّع عملية `KDD` لسيناريو واقعي

**المدخل:**
```python
# Raw input: sales data from 3 different store branches, with missing values
raw_sources = ["branch1.csv", "branch2.csv", "branch3.csv"]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | تنظيف كل ملف | ؟ |
| 2 | دمج الملفات الثلاثة | ؟ |
| 3 | اختيار أعمدة المبيعات والتاريخ فقط | ؟ |
| 4 | تطبيق نموذج Regression | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | تنظيف كل ملف | إزالة القيم المفقودة/الضوضاء من كل فرع على حدة |
| 2 | دمج الملفات الثلاثة | جدول بيانات موحّد لكل الفروع (Data Warehouse منطقي) |
| 3 | اختيار أعمدة المبيعات والتاريخ فقط | بيانات مختارة جاهزة لمهمة التنبؤ بالمبيعات |
| 4 | تطبيق نموذج Regression | نموذج يتنبأ بمبيعات مستقبلية مستمرة القيمة |

**النتيجة:** معرفة نهائية: توقّعات مبيعات مستقبلية لكل فرع، جاهزة للعرض في تقرير (Knowledge Presentation).

---

### تمرين تتبع 2: تصنيف نوع المهمة عبر أمثلة متتالية

**المدخل:**
```python
tasks = [
    "predict tomorrow's temperature",
    "group similar customer complaints",
    "detect a hacked account based on unusual login pattern",
    "find which products are bought together",
]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | المهمة | نوع المهمة (Predictive/Descriptive) | الفئة الدقيقة |
| --- | --- | --- | --- |
| 1 | predict tomorrow's temperature | ؟ | ؟ |
| 2 | group similar customer complaints | ؟ | ؟ |
| 3 | detect a hacked account... | ؟ | ؟ |
| 4 | find which products are bought together | ؟ | ؟ |

**نموذج الحل:**
| التكرار | المهمة | نوع المهمة | الفئة الدقيقة |
| --- | --- | --- | --- |
| 1 | predict tomorrow's temperature | Predictive | Regression |
| 2 | group similar customer complaints | Descriptive | Clustering |
| 3 | detect a hacked account... | Predictive (Deviation) | Outlier/Anomaly Detection |
| 4 | find which products are bought together | Descriptive | Association Rule Mining |

**النتيجة:** كل مهمة صُنِّفت بنجاح ضمن الفئتين الرئيسيتين (Predictive/Descriptive) والفئة الدقيقة المناسبة.

---

### تمرين تتبع 3: تتبّع مبدئي لتجميع بسيط (تمهيدي لـ k-Means القادمة)

**المدخل:**
```python
# Very simplified: 4 customers, feature = monthly spending ($)
spending = [20, 22, 90, 95]
# We want 2 groups (k=2), grouping intuitively by closeness
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | ترتيب القيم | ؟ |
| 2 | ملاحظة الفجوة الأكبر بين القيم | ؟ |
| 3 | تقسيم إلى مجموعتين حول الفجوة | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | ترتيب القيم | [20, 22, 90, 95] (مرتّبة مسبقاً) |
| 2 | ملاحظة الفجوة الأكبر | الفجوة الأكبر بين 22 و90 (68 وحدة) |
| 3 | تقسيم إلى مجموعتين | المجموعة الأولى {20, 22} (تشابه داخلي عالٍ)، المجموعة الثانية {90, 95} (تشابه داخلي عالٍ) |

**النتيجة:** مجموعتان تحققان مبدأ "تعظيم التشابه الداخلي وتقليل التشابه الخارجي" المذكور في تعريف `Cluster Analysis` — وهذا تبسيط مفاهيمي فقط؛ خوارزمية `k-Means` الفعلية (بحساب المراكز `centroids`) ستُشرح لاحقاً بالتفصيل.

---

### تمرين تتبع 4: تتبّع تصنيف قرار بسيط (تمهيدي لـ Decision Tree القادمة)

**المدخل:**
```python
# Simplified rule-based scenario before formal Decision Tree lecture
transactions = [
    {"amount": 5000, "time": "3am", "label": "fraud"},
    {"amount": 20, "time": "2pm", "label": "not fraud"},
    {"amount": 4500, "time": "4am", "label": "fraud"},
    {"amount": 15, "time": "1pm", "label": "not fraud"},
]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | الملاحظة | الاستنتاج المبدئي |
| --- | --- | --- |
| 1 | فحص عمود `amount` | ؟ |
| 2 | فحص عمود `time` | ؟ |
| 3 | صياغة قاعدة مبدئية | ؟ |

**نموذج الحل:**
| التكرار | الملاحظة | الاستنتاج المبدئي |
| --- | --- | --- |
| 1 | فحص عمود amount | المعاملات ذات المبالغ الكبيرة (>4000) مرتبطة بـ "fraud" |
| 2 | فحص عمود time | المعاملات في ساعات الفجر (3-4 صباحاً) مرتبطة أيضاً بـ "fraud" |
| 3 | صياغة قاعدة مبدئية | "إذا كان amount > 4000 وtime بين منتصف الليل والفجر ⇒ fraud" |

**النتيجة:** قاعدة قرار بسيطة تُحاكي فكرة `Decision Tree` (تقسيم متتالٍ بناءً على أهم الصفات) — الصيغة الرسمية (Entropy, Information Gain) ستُدرَس لاحقاً.

---

### تمرين تتبع 5: تتبّع خطوات تحسين تدريجي (تمهيدي لـ Gradient Descent القادمة)

**المدخل:**
```python
# Simplified idea: trying to guess a number closer to the true value each attempt
true_value = 50
guesses = [10, 30, 45, 49]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| المحاولة | التخمين | الفرق عن القيمة الحقيقية (الخطأ) |
| --- | --- | --- |
| 1 | 10 | ؟ |
| 2 | 30 | ؟ |
| 3 | 45 | ؟ |
| 4 | 49 | ؟ |

**نموذج الحل:**
| المحاولة | التخمين | الفرق عن القيمة الحقيقية (الخطأ) |
| --- | --- | --- |
| 1 | 10 | 40 |
| 2 | 30 | 20 |
| 3 | 45 | 5 |
| 4 | 49 | 1 |

**النتيجة:** الخطأ يتناقص تدريجياً مع كل محاولة، محاكياً فكرة "التعلّم عبر المحاولة والتحسين المتكرر" الموضحة في مثال طهي الدجاجة بالمحاضرة (قد يستغرق الأمر مئات المحاولات) — الصيغة الرياضية الدقيقة لـ `Gradient Descent` ستُدرَس في محاضرة `Regression`.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

> ≥10 أسئلة. نموذج الإجابة: 1. التعريف 2. المكونات/الشروط 3. مثال رقمي 4. متى نستخدم.

### السؤال 1: عرّف `Data Mining` واشرح شروط النمط المُكتشَف.
**نموذج الإجابة:**
1. التعريف: عملية اكتشاف أنماط/نماذج/معرفة في بيانات كبيرة.
2. الشروط: أن يكون النمط غير بديهي (non-trivial)، ضمني (implicit)، غير معروف مسبقاً (previously unknown)، ومفيد عملياً (potentially useful).
3. مثال: اكتشاف أن أسماء عائلية معينة أكثر انتشاراً في منطقة جغرافية محددة.
4. يُستخدم عند وجود بيانات كبيرة يصعب تحليلها يدوياً ونحتاج اكتشاف معرفة غير معروفة سلفاً منها.

### السؤال 2: ما الفرق بين ما هو Data Mining وما ليس Data Mining؟ وضّح بمثالين.
**نموذج الإجابة:**
1. التعريف: ليس كل استرجاع معلومة يُعتبر تنقيباً؛ التنقيب يتطلّب اكتشافاً جديداً.
2. المكونات: استرجاع مباشر (بحث بكلمة مفتاحية، بحث بسجلّ) ≠ اكتشاف نمط (تجميع مستندات حسب السياق، اكتشاف علاقة إحصائية جديدة).
3. مثال رقمي/عملي: البحث عن صفحات فيها كلمة "Amazon" (ليس تنقيباً) مقابل اكتشاف العلاقة بين البحث عن أعراض الإنفلونزا وانتشارها الفعلي (تنقيب).
4. يُستخدم هذا التمييز لتقييم ما إذا كانت أداة أو نظام معيّن "نظام تنقيب بيانات" فعلي أم مجرد نظام استرجاع.

### السؤال 3: اشرح عملية `KDD` وخطواتها السبع.
**نموذج الإجابة:**
1. التعريف: العملية الشاملة والتكرارية لتحويل البيانات الخام إلى معرفة مفيدة.
2. المكونات: Data Cleaning, Data Integration, Data Selection, Data Transformation, Data Mining, Evaluation, Knowledge Presentation.
3. مثال: بيانات مبيعات من عدة فروع تُنظَّف، تُدمَج، تُختار أعمدتها المهمة، تُحوَّل، يُطبَّق عليها نموذج، تُقيَّم النتائج، ثم تُعرَض كتقرير.
4. تُستخدم هذه العملية كإطار عمل منهجي في أي مشروع تنقيب بيانات حقيقي.

### السؤال 4: ما تعريف `Data Warehouse` وأين يقع ضمن عملية `KDD`؟
**نموذج الإجابة:**
1. التعريف: مستودع بيانات مُجمَّع من مصادر متغايرة متعددة تحت مخطط موحّد، عادة في موقع واحد.
2. المكونات/الشروط: يتطلّب دمج مصادر (Data Integration) وتنظيفها أولاً.
3. مثال: دمج بيانات مبيعات من عدة فروع في قاعدة بيانات مركزية واحدة.
4. يُستخدم كخطوة تحضيرية أساسية قبل عمليتَي الاختيار والتحويل في KDD.

### السؤال 5: قارن بين المهام التنبؤية والمهام الوصفية في Data Mining.
**نموذج الإجابة:**
1. التعريف: التنبؤية تتنبأ بقيمة صفة مستهدفة، والوصفية تستخلص أنماطاً تلخّص خصائص البيانات.
2. المكونات: التنبؤية (Classification, Regression, Deviation Detection) تعتمد على متغيّر مستهدف معروف (Supervised)؛ الوصفية (Association Rules, Sequential Patterns, Clustering) لا تعتمد على متغيّر مستهدف (Unsupervised).
3. مثال: التنبؤ بسعر منزل (تنبؤية) مقابل تجميع عملاء متشابهين (وصفية).
4. تُستخدم التنبؤية عند توفر بيانات موسومة وهدف واضح للتنبؤ، والوصفية عند غياب ذلك والحاجة لفهم بنية البيانات.

### السؤال 6: اشرح الفرق بين Regression وClassification مع مثال لكل منهما.
**نموذج الإجابة:**
1. التعريف: Regression يتنبأ بقيمة مستمرة، Classification يتنبأ بفئة منفصلة.
2. المكونات: كلاهما تنبؤي (Supervised)، يفترقان في نوع المتغيّر المستهدف فقط.
3. مثال: التنبؤ بسعر سهم (Regression) مقابل تصنيف بريد كـ"spam/not spam" (Classification).
4. يُستخدم Regression عند الحاجة لرقم دقيق، وClassification عند الحاجة لقرار فئوي.

### السؤال 7: ما هو Cluster Analysis؟ وما المبدأ الأساسي الذي يقوم عليه؟
**نموذج الإجابة:**
1. التعريف: تقسيم كائنات البيانات إلى مجموعات (clusters).
2. المكونات/الشروط: تعظيم التشابه داخل المجموعة الواحدة (intra-cluster) وتقليل التشابه بين المجموعات (inter-cluster).
3. مثال: تجزئة السوق لعملاء متشابهين في العمر والدخل والتعليم.
4. يُستخدم عند غياب تصنيف مسبق وضرورة اكتشاف بنية طبيعية في البيانات.

### السؤال 8: عرّف Outlier/Anomaly، ولماذا لا يجب حذفها دائماً؟
**نموذج الإجابة:**
1. التعريف: كائن بيانات لا يتوافق مع السلوك العام للبيانات.
2. المكونات: قد تكون ضوضاء (noise) تُهمَل، أو قد تكون الهدف الأساسي للتحليل.
3. مثال: معاملة احتيال نادرة تُعتبر شاذة إحصائياً لكنها الهدف الحقيقي المطلوب اكتشافه.
4. تُستخدم أدوات Outlier Analysis في كشف الاحتيال، اختراقات الشبكة، وأعطال الأجهزة.

### السؤال 9: ما الفروق الرئيسية بين Data Mining وMachine Learning حسب المحاضرة؟
**نموذج الإجابة:**
1. التعريف: يتشاركان الخوارزميات الأساسية لكنهما يختلفان في نطاق التطبيق.
2. المكونات: (أ) Scalability: DM لبيانات ضخمة/تدفقات، ML لبيانات أصغر تقليدياً. (ب) DM يحتاج طرقاً ضعيفة الإشراف (semi-supervised, ensemble, active, transfer learning) عند قلة بيانات التدريب الموسومة.
3. مثال: نظام تنقيب بيانات على تدفق معاملات بنكية مستمر لا نهائي مقابل نموذج ML تقليدي على مجموعة بيانات ثابتة صغيرة.
4. يُستخدم هذا التمييز لفهم أي الحقلين أنسب لسياق مشروع معيّن (بيانات ضخمة/متدفقة أم صغيرة/ثابتة).

### السؤال 10: اذكر القضايا الرئيسية (Major Issues) في Data Mining كما وردت في المحاضرة.
**نموذج الإجابة:**
1. التعريف: تحديات كبرى تواجه تطبيق Data Mining عملياً.
2. المكونات: Scalability, High Dimensionality, Heterogeneous and Complex Data, Data Ownership and Distribution, Non-traditional Analysis.
3. مثال: بيانات ضخمة موزّعة بين عدة شركات (Data Ownership and Distribution) لا يمكن دمجها بسهولة في مكان واحد.
4. تُستخدم هذه القائمة كإطار لفهم أين قد يفشل مشروع تنقيب بيانات إن لم يُعالَج التحدي المناسب.

### السؤال 11: كيف يوضّح مثال "الدجاجة" (طهي الطعام) الفرق بين الخوارزمية العادية وخوارزمية التعلّم الآلي؟
**نموذج الإجابة:**
1. التعريف: الخوارزمية العادية تبدأ بخطوات معروفة (وصفة) وتصل لناتج، بينما خوارزمية التعلّم الآلي تبدأ بمدخلات ومخرجات معروفة وتحاول اكتشاف الخطوات (القواعد) بنفسها.
2. المكونات: قد تحتاج خوارزمية التعلّم الآلي آلاف المحاولات (trial and error) للوصول لخطوات صحيحة.
3. مثال: تجربة طهي دجاجة 100 مرة بطرق مختلفة حتى الوصول لنتيجة ناجحة، بدل إعطاء الوصفة الجاهزة مباشرة.
4. يوضّح هذا الفرق جوهر "التعلّم من البيانات" الذي يميّز الذكاء الاصطناعي/التعلّم الآلي عن البرمجة الصريحة التقليدية.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Introduction (هذه المحاضرة) | Data Preprocessing | تحضير البيانات هو تفصيل خطوات 1-4 من KDD |
| Introduction | Frequent Patterns & ARM | تفصيل رياضي لمفهوم Association Rules المقدَّم هنا |
| Introduction | Regression | تفصيل رياضي وخوارزمي لمهمة Regression المقدَّمة هنا |
| Introduction | Classification | تفصيل خوارزميات (Decision Tree, Naive Bayes...) المذكورة هنا كأسماء فقط |
| Introduction | Cluster Analysis | تفصيل خوارزمية k-Means وغيرها المذكورة هنا كأسماء فقط |
| Introduction | Outlier Detection | تفصيل طرق كشف الشذوذ المقدَّمة هنا كمفهوم عام |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| تعريف Data Mining | اكتشاف أنماط غير بديهية، ضمنية، غير معروفة سابقاً، ومفيدة |
| ما ليس Data Mining | استرجاع مباشر (lookup, keyword search) عبر DBMS أو محرك بحث |
| KDD | 7 خطوات تكرارية: Cleaning → Integration → Selection → Transformation → Mining → Evaluation → Presentation |
| Predictive vs Descriptive | وجود/غياب متغيّر مستهدف معروف مسبقاً |
| Regression vs Classification | مستمر مقابل منفصل |
| Clustering | لا وسوم مسبقة؛ تعظيم تشابه داخلي وتقليل تشابه خارجي |
| Outliers | ليست دائماً ضوضاء؛ قد تكون الهدف بحد ذاته |
| DM vs ML | DM لبيانات أضخم/متدفقة + طرق ضعيفة الإشراف عند قلة الوسوم |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `target/dependent variable` | الصفة المراد التنبؤ بها | Classification, Regression |
| `independent variables` | الصفات المستخدمة للتنبؤ | Classification, Regression |
| `frequent itemset` | مجموعة عناصر متكررة الظهور معاً | Association Rules |
| `intra-cluster similarity` | تشابه داخل نفس المجموعة | Clustering |
| `inter-cluster similarity` | تشابه بين مجموعات مختلفة | Clustering |
| `labeled/unlabeled dataset` | بيانات موسومة/غير موسومة | Supervised/Unsupervised Learning |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | ليس كل بحث أو استعلام هو Data Mining — يجب وجود اكتشاف جديد |
| 2 | KDD عملية تكرارية، وقد نعود لخطوات سابقة بعد التقييم |
| 3 | Classification مُشرَف (بوسوم)، Clustering غير مُشرَف (بلا وسوم) |
| 4 | Regression = مخرج مستمر، Classification = مخرج فئوي |
| 5 | القيم الشاذة قد تكون الهدف الأساسي وليست دائماً خطأً يُحذَف |
| 6 | DM وML يتشاركان الخوارزميات لكن يختلفان بحجم البيانات وطريقة الإشراف |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما هو التعريف الأساسي لـ `Data Mining`؟
A: عملية اكتشاف أنماط غير بديهية، ضمنية، غير معروفة سابقاً، ومفيدة من بيانات كبيرة، بشكل آلي أو شبه آلي.

---

**Q2:** لماذا يُعتبر مصطلح "Data Mining" `misnomer`؟
A: لأن الاسم الأدق كان "knowledge mining from data" لكنه طويل، والتركيز الحقيقي هو على "المعرفة" وليس "البيانات" نفسها.

---

**Q3:** اذكر مثالاً على ما "ليس" Data Mining.
A: البحث عن سجلّ عميل معيّن أو صفحات تحتوي كلمة مفتاحية معينة — يمكن إنجازهما عبر DBMS أو محرك بحث بسيط.

---

**Q4:** ما هي الخطوات السبع لعملية KDD بالترتيب؟
A: Data Cleaning → Data Integration → Data Selection → Data Transformation → Data Mining → Evaluation → Knowledge Presentation.

---

**Q5:** ما تعريف Data Warehouse؟
A: مستودع بيانات مُجمَّع من مصادر متعددة متغايرة، منظّم تحت مخطط موحّد، ومُخزَّن عادة في موقع واحد.

---

**Q6:** ما الفرق بين المهام التنبؤية (Predictive) والوصفية (Descriptive)؟
A: التنبؤية تتنبأ بمتغيّر مستهدف معروف (Supervised)، بينما الوصفية تستخلص أنماطاً بدون متغيّر مستهدف (Unsupervised).

---

**Q7:** ما الفرق بين Regression وClassification؟
A: Regression يتنبأ بقيمة مستمرة (continuous)، Classification يتنبأ بفئة منفصلة (discrete).

---

**Q8:** ما المبدأ الأساسي لـ Cluster Analysis؟
A: تعظيم التشابه داخل المجموعة الواحدة (intra-cluster) وتقليل التشابه بين المجموعات المختلفة (inter-cluster).

---

**Q9:** ما هو الـ Outlier؟ ولماذا قد يكون مهماً؟
A: كائن بيانات لا يتوافق مع السلوك العام للبيانات؛ قد يكون مهماً جداً كما في كشف الاحتيال، بدلاً من كونه مجرد ضوضاء.

---

**Q10:** ما أول فرق رئيسي بين Data Mining وMachine Learning؟
A: قابلية التوسّع (Scalability): DM يعمل على بيانات ضخمة/تدفقات لا نهائية، بينما ML تقليدياً يركّز على بيانات أصغر.

---

**Q11:** ما اسم مثال Google المذكور الذي يوضّح Data Mining الحقيقي؟
A: Google Flu Trends — اكتشاف علاقة بين عدد عمليات البحث عن أعراض الإنفلونزا وعدد المصابين فعلياً.

---

**Q12:** ما هي أنماط التعلّم الآلي الثلاثة المذكورة؟
A: Supervised Learning، Unsupervised Learning، وReinforcement Learning.

---

**Q13:** اذكر مكتبتين بايثون أساسيتين لتحضير البيانات وتحليلها ذُكرتا في المحاضرة.
A: `pandas` (معالجة البيانات) و`NumPy` (عمليات المصفوفات)، بالإضافة إلى `matplotlib` (التصوير) و`scikit-learn` (النمذجة).

---

**Q14:** ما هي القضايا الرئيسية الخمس في Data Mining المذكورة في المحاضرة؟
A: Scalability، High Dimensionality، Heterogeneous and Complex Data، Data Ownership and Distribution، Non-traditional Analysis.

---

**Q15:** ما مثال "Market Basket Analysis" ومهمته؟
A: تحليل سلال المشتريات لاكتشاف قواعد ترافق بين المنتجات (Association Rule Mining)، يُستخدم في ترويج المبيعات وتنظيم الرفوف.

---

**Q16:** كيف تصف طبقات هرم Data Mining in Business Intelligence من الأسفل للأعلى؟
A: Data Sources → Data Preprocessing/Integration & Warehouses → Data Exploration → Data Mining → Data Presentation → Decision Making.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> الكود التالي مرجع تحضيري (شرح زيادة للفهم — هذه المحاضرة تمهيدية مفاهيمية بلا كود فعلي) يجمع الأنماط الأساسية التي ستُستخدم عملياً في محاضرات لاحقة: preprocessing، Apriori/association rules, regression، classification، clustering. لا يشكّل شرحاً جديداً، بل مرجعاً سريعاً للطالب.

```python
# === Data Preprocessing ===
import pandas as pd
import numpy as np

df = pd.read_csv("dataset.csv")   # load raw data
df = df.dropna()                   # remove missing values (Data Cleaning)
df = df.drop_duplicates()          # remove duplicate rows

# === Apriori / Association Rules (conceptual placeholder) ===
# Actual Apriori implementation and support/confidence formulas
# will be covered in the "Frequent Patterns & ARM" lecture.
transactions = [["bread", "milk"], ["bread", "milk", "jam"], ["milk", "jam"]]
# frequent_itemsets = apriori(transactions, min_support=0.5)  # to be studied later

# === Regression ===
from sklearn.linear_model import LinearRegression

X = df[["feature1", "feature2"]]   # independent variables
y = df["target_continuous"]        # continuous target variable

reg_model = LinearRegression()
reg_model.fit(X, y)
predictions = reg_model.predict(X)

# === Classification ===
from sklearn.tree import DecisionTreeClassifier

X_clf = df[["feature1", "feature2"]]
y_clf = df["target_discrete"]      # discrete target variable

clf_model = DecisionTreeClassifier()
clf_model.fit(X_clf, y_clf)
class_predictions = clf_model.predict(X_clf)

# === Clustering ===
from sklearn.cluster import KMeans

X_cluster = df[["feature1", "feature2"]]  # no target variable (unsupervised)

cluster_model = KMeans(n_clusters=3)
cluster_model.fit(X_cluster)
cluster_labels = cluster_model.labels_
```

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع تعريف `Data Mining` وذكر الشروط الأربعة للنمط المُكتشَف.
- [ ] أستطيع التمييز بين ما هو Data Mining وما ليس كذلك بمثالين على الأقل.
- [ ] أستطيع سرد خطوات عملية `KDD` السبع بالترتيب الصحيح مع شرح كل خطوة.
- [ ] أفهم تعريف `Data Warehouse` وموقعه ضمن KDD.
- [ ] أستطيع شرح هرم `Data Mining in Business Intelligence` ومن يستخدم كل طبقة.
- [ ] أفهم كيف يلتقي `Data Mining` بتخصصات أخرى (ML, Statistics, HPC...).
- [ ] أستطيع التمييز بين `Supervised` و`Unsupervised` و`Reinforcement Learning`.
- [ ] أستطيع شرح الفروق الرئيسية بين `Data Mining` و`Machine Learning`.
- [ ] أستطيع التمييز بين المهام `Predictive` و`Descriptive` مع أمثلة.
- [ ] أفهم الفرق بين `Regression` (مستمر) و`Classification` (منفصل).
- [ ] أفهم مبدأ `Cluster Analysis` (تعظيم التشابه الداخلي، تقليل التشابه الخارجي).
- [ ] أفهم مفهوم `Outlier/Anomaly` ولماذا لا يُحذَف دائماً.
- [ ] أعرف القضايا الرئيسية الخمس في Data Mining.
- [ ] أعرف الأدوات الأساسية (`pandas`, `NumPy`, `matplotlib`, `scikit-learn`) ووظيفة كل منها.
- [ ] راجعت جميع أسئلة MCQ (16) وفهمت تعليل كل خيار.
- [ ] راجعت أسئلة تصحيح الكود (5) وفهمت كل خطأ وتصحيحه.
- [ ] حللت التمارين التطبيقية والتحليلية وتمارين التتبع كاملة.
- [ ] راجعت بطاقات Q&A (16 بطاقة) بسرعة كمراجعة أخيرة.
- [ ] راجعت ورقة الـ Cheat Sheet قبل الدخول للامتحان مباشرة.

---

<!--
VALIDATION:
- Source lecture: KDD_Lecture 1.pdf (Introduction) — 35 slides, Dr. Asmaa Shaar.
- Lecture type detected: General Introduction / Overview (touches Association Rules, Regression, Classification, Clustering, Outlier Detection at a conceptual level only — no formulas/code present in source).
- All slide content covered in Part 1 (sections 1-19) sequentially following original slide order.
- Missing formulas/algorithms (Apriori support/confidence, k-Means centroids, Decision Tree entropy, Gradient Descent) are NOT in this lecture; all such content in exercises is explicitly tagged as "(شرح زيادة للفهم)" / "(غير مشروحة في المحاضرة)" preview material for upcoming lectures.
- Counts delivered: MCQ=16, Debug=5, Practice exercises=6, Analysis exercises=4, Trace exercises=5, Theory questions=11, QA cards=16, Cheat sheet=complete, Full code reference=complete.
- All English terms formatted in backticks; all algorithm/diagram blocks follow SCHEMA.md v1.0 formatting.
-->
