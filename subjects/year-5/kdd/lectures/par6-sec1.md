# المحاضرة 6 — Classification (التصنيف — الجزء الأول)
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** `Classification`، `Decision Trees`، `Entropy`، `Information Gain`

> **نوع هذه المحاضرة:** محاضرة **Classification** — لذلك سنستخدم مصطلحات: `Decision Tree`، `Entropy`، `Information Gain`، `Attribute Selection Measures`، `ID3`.

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| المحاضرة 5 — `Regression` | `Linear Regression`، `RSS`، `Gradient Descent` | نموذج تنبؤ بقيمة **مستمرة** (رقمية) |
| المحاضرة 6 — `Classification` (part-1) ← **أنت هنا** | `Decision Tree`، `Entropy`، `Information Gain`، `ID3` | نموذج تنبؤ بقيمة **فئوية** (categorical) |
| المحاضرة القادمة (متوقعة) — `Classification` (part-2) | `Gain Ratio`، `Gini Index`، `Overfitting`، `Pruning` | تحسين دقة أشجار القرار وتفادي الحفظ الزائد |

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. ما هو التصنيف `Classification`؟

#### النص الأصلي يقول:
> "The process of finding a model (or function) that describes and distinguishes data classes or concepts... Predicts a value of a given a categorical target variable (class label attribute) based on the values of other independent variables."

#### الشرح المبسّط:
`Classification` هو عملية بناء **نموذج (دالة)** يأخذ مجموعة من الخصائص (features) وينتج عنها **تصنيفًا فئويًا** — أي قيمة من مجموعة محدودة من الفئات (مثل: نعم/لا، بريد مزعج/غير مزعج)، وليس رقمًا مستمرًا كما في `Regression`.

المخطط: `Data → Classifier → Intelligence`
- **Input x:** الخصائص المشتقة من البيانات (features).
- **Learn x→y:** المُصنِّف يتعلم العلاقة بين المدخلات والفئة.
- **Predict y:** الناتج فئة (label) وليس رقمًا.

**لماذا؟** لأن كثيرًا من القرارات الحقيقية هي أسئلة "أي فئة؟" وليس "كم القيمة؟" — مثل: هل هذا البريد مزعج أم لا؟ هل هذا المريض مصاب أم سليم؟

#### 💡 التشبيه:
> تخيل طبيبًا يفحص أعراض مريض ثم يضع تشخيصًا من قائمة أمراض معروفة (زكام، إنفلونزا، سليم...) — هو لا يُخرج رقمًا، بل **فئة**.
> **وجه الشبه:** الأعراض = `input x`، الطبيب = `Classifier`، التشخيص = `class label`.

#### الفهم الخاطئ الشائع ❌: `Classification` يُنتج دائمًا نتيجة ثنائية (نعم/لا) فقط.
#### الفهم الصحيح ✅: يمكن أن تكون هناك أكثر من فئتين (multi-class)، كما في تصنيف صفحات الويب إلى Education/Finance/Technology.

---

### 2. تطبيقات التصنيف

#### النص الأصلي يقول:
> Sentiment Classifier, Spam Filtering, Web page categorization, Medical Diagnosis, Image Classification, loan approval, Fraud detection, Marketing.

#### الشرح المبسّط:
| المجال | Input x | Output y |
| --- | --- | --- |
| تصنيف المشاعر | جملة نصية | إيجابي/سلبي |
| فلترة البريد | نص البريد + المرسل + IP | Spam / Not spam |
| تصنيف صفحات الويب | نص الصفحة | Education / Finance / Technology |
| التشخيص الطبي | أشعة، تحاليل، DNA | Healthy / Cold / Flu / Pneumonia |
| تصنيف الصور | بكسلات الصورة | نوع الكائن (Labrador, Bloodhound...) |
| الموافقة على القرض | بيانات العميل | Safe / Risky |
| كشف الاحتيال | بيانات المعاملة | Fraud / Not Fraud |
| التسويق | ملف العميل | Loyal / Disloyal |

**لماذا هذا التنوع مهم؟** لتوضيح أن `Classification` ليس مقتصرًا على مجال واحد؛ فهو إطار عام قابل للتطبيق على أي مسألة "اختيار فئة".

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ما الفرق الجوهري بين "تصنيف صور الكلاب" و"التنبؤ بسعر منزل"؟
> **لماذا هذا مهم؟** لأنه يوضح الفرق بين المخرج الفئوي (Classification) والمخرج الرقمي المستمر (Regression).

---

### 3. بناء نموذج تصنيف `Building A Classification Model`

#### النص الأصلي يقول:
> "Classification is a supervised learning task... the given data set is divided into training and test sets... A General Approach (Two-step Process): learning step or training phase, Testing Phase."

#### الشرح المبسّط:
`Classification` هي مسألة **تعلم مُوجَّه (`Supervised Learning`)**، أي أن كل عينة تدريب مرفقة بـ **Label** (تسمية صحيحة معروفة مسبقًا).

خطوات البناء:
```algorithm
1 | تقسيم البيانات | Data Split | تقسيم مجموعة البيانات إلى Training Set و Test Set بنفس التوزيع الإحصائي
2 | التدريب (Learning Step) | خوارزمية تصنيف (مثل ID3) | بناء النموذج (Classifier) من بيانات Training فقط
3 | الاختبار (Testing Phase) | Test Set | قياس دقة النموذج على بيانات لم يرها من قبل
4 | الاستخدام (Model Usage) | النموذج النهائي | تصنيف بيانات "المستقبل" غير المعروفة (Unseen Data)
```

**لماذا نقسم البيانات؟** لو استخدمنا بيانات التدريب نفسها للاختبار، فسنحصل على تقدير **متفائل جدًا (optimistic)** لأن النموذج يكون قد "حفظ" هذه البيانات — وهذا ما يُسمى `Overfitting`.

#### 💡 التشبيه:
> يشبه الأمر معلمًا يعطي الطلاب أسئلة الامتحان نفسها التي تدربوا عليها — ستكون العلامات مرتفعة جدًا لكنها لا تعكس الفهم الحقيقي.
> **وجه الشبه:** أسئلة التدريب المكررة = Training Data المستخدمة للاختبار، العلامة المضللة = دقة متفائلة (Overfitting).

#### مهم للامتحان ⚠️:
> **Test dataset يجب أن يكون مستقلًا تمامًا عن Training dataset** (لا تداخل بينهما) — هذه نقطة تتكرر كثيرًا في الأسئلة.

#### 📊 المخطط: مراحل بناء المصنّف

#### ما هذا المخطط؟
> يوضح تدفق العمل من البيانات الموسومة (Training Data) حتى استخدام النموذج على بيانات غير مرئية.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Training Data | event | بيانات موسومة (بها Class attribute) |
| 2 | Classification Algorithm | process | مثل ID3 |
| 3 | Classifier (Model) | process | القواعد أو الشجرة الناتجة |
| 4 | Testing Data | event | بيانات موسومة لم تُستخدم بالتدريب |
| 5 | Unseen Data | event | بيانات مستقبلية غير معروفة الفئة |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Training Data | Classification Algorithm | تدريب | solid | تُغذّي الخوارزمية |
| Classification Algorithm | Classifier (Model) | ينتج | solid | خرج مرحلة التعلم |
| Testing Data | Classifier (Model) | تحقق | dashed | قياس الدقة |
| Unseen Data | Classifier (Model) | تصنيف فعلي | solid | الاستخدام النهائي |

```diagram
type: flowchart
title: مراحل بناء نموذج تصنيف
direction: TD
nodes:
  - id: train
    label: Training Data
    kind: event
    level: 0
  - id: algo
    label: Classification Algorithm
    kind: process
    level: 1
  - id: model
    label: Classifier (Model)
    kind: process
    level: 2
  - id: test
    label: Testing Data
    kind: event
    level: 1
  - id: unseen
    label: Unseen Data
    kind: event
    level: 3
edges:
  - from: train
    to: algo
  - from: algo
    to: model
  - from: test
    to: model
  - from: unseen
    to: model
```

---

### 4. نماذج التصنيف `Classification Models`

#### النص الأصلي يقول:
> "Base Classifiers: Decision trees, Nearest neighbors, Support vector machines, Bayesian classifiers, Neural Networks, Rule-based Methods... Ensemble Classifiers: Boosting, Bagging, Random Forests."

#### الشرح المبسّط:
هناك فئتان رئيسيتان من المصنّفات:
1. **Base Classifiers** (مصنّف مفرد واحد): `Decision Trees`، `kNN`، `SVM`، `Naive Bayes`، `Neural Networks`.
2. **Ensemble Classifiers** (تجميع عدة مصنّفات لتحسين الأداء): `Bagging`، `Boosting`، `Random Forests`.

**لماذا يوجد أكثر من نوع؟** لأن كل مصنّف له افتراضات مختلفة عن شكل البيانات (خطية، غير خطية، متداخلة...)، فما يناسب بيانات معينة قد لا يناسب أخرى — كما توضح صورة المقارنة البصرية بين المصنّفات على أشكال بيانات مختلفة (spirals, circles, linear).

#### ⚖️ المقايضة: Base Classifier مقابل Ensemble Classifier

| | Base Classifier (مفرد) | Ensemble Classifier (مُجمّع) |
| --- | --- | --- |
| المزايا | بسيط، سريع التدريب والتفسير | دقة أعلى عادة، أكثر استقرارًا |
| العيوب | قد يكون أقل دقة أو أكثر عرضة لـ Overfitting | أبطأ، أصعب تفسيرًا (black-box) |
| متى تختاره | عندما تحتاج تفسيرًا واضحًا (مثل شجرة قرار بسيطة) | عندما الدقة أولوية وتقبل تعقيدًا إضافيًا |

---

### 5. شجرة القرار `Decision Tree (DT)`

#### النص الأصلي يقول:
> "The learned function is represented by a decision tree. A decision tree is a flowchart-like tree structure, where: each internal node specifies a test of some attribute, each branch descending from a node corresponds to one of the possible values for this test attribute, each leaf node assigns a class label."

#### الشرح المبسّط:
`Decision Tree` هي بنية شجرية شبيهة بمخطط تدفق (flowchart):
- **Internal Node (عقدة داخلية):** تمثل اختبارًا على سمة (attribute)، وتُسمى `Attribute test / Splitting attribute`.
- **Branch (فرع):** يمثل إحدى القيم الممكنة لتلك السمة (`Attribute value`).
- **Leaf Node (عقدة ورقية):** تحمل الفئة النهائية (`Class value`).

كل مسار من الجذر (root) حتى ورقة (leaf) هو **اقتران شروط** (AND بين القيم على المسار)، والشجرة كاملة تمثل **فَصل منطقي (OR)** بين كل هذه المسارات:
$$
(\dots \land \dots \land \dots) \lor (\dots \land \dots \land \dots) \lor \dots
$$

**لماذا هذا الشكل مفيد؟** لأنه **قابل للقراءة البشرية** مباشرة — يمكن تحويله إلى قواعد `IF-THEN` يفهمها غير المتخصص.

#### 💡 التشبيه:
> تخيل استبيانًا تفاعليًا لتشخيص عطل بالسيارة: "هل السيارة تدور؟ لا → افحص البطارية. نعم → هل هناك صوت غريب؟...". كل سؤال هو عقدة داخلية، وكل نتيجة نهائية (عطل محدد) هي ورقة.
> **وجه الشبه:** سؤال التشخيص = Internal Node، إجابة السؤال = Attribute Value، التشخيص النهائي = Class Label.

#### 📊 المخطط: مثال شجرة قرار Play Tennis

#### ما هذا المخطط؟
> يوضح كيف تُقسّم شجرة القرار البيانات بدءًا من `Outlook` وصولًا إلى قرار اللعب من عدمه.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Outlook | decision | العقدة الجذرية (Root) — أول سمة للاختبار |
| 2 | Humidity | decision | تُختبر فقط عندما Outlook=Sunny |
| 3 | Wind | decision | تُختبر فقط عندما Outlook=Rain |
| 4 | Yes (عند Overcast) | leaf | فئة نهائية مباشرة |
| 5 | Yes/No (أوراق Humidity وWind) | leaf | فئات نهائية |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Outlook | Humidity | Sunny | solid | فرع القيمة Sunny |
| Outlook | Yes | Overcast | solid | فرع القيمة Overcast (نتيجة مباشرة) |
| Outlook | Wind | Rain | solid | فرع القيمة Rain |
| Humidity | No | High | solid | — |
| Humidity | Yes | Normal | solid | — |
| Wind | No | Strong | solid | — |
| Wind | Yes | Weak | solid | — |

```diagram
type: decision-tree
title: Should we Play Tennis?
direction: TD
nodes:
  - id: outlook
    label: Outlook?
    kind: decision
    level: 0
  - id: humidity
    label: Humidity?
    kind: decision
    level: 1
  - id: overcast_yes
    label: "Yes"
    kind: leaf
    level: 1
  - id: wind
    label: Wind?
    kind: decision
    level: 1
  - id: h_high
    label: "No"
    kind: leaf
    level: 2
  - id: h_normal
    label: "Yes"
    kind: leaf
    level: 2
  - id: w_strong
    label: "No"
    kind: leaf
    level: 2
  - id: w_weak
    label: "Yes"
    kind: leaf
    level: 2
edges:
  - from: outlook
    to: humidity
    label: Sunny
  - from: outlook
    to: overcast_yes
    label: Overcast
  - from: outlook
    to: wind
    label: Rain
  - from: humidity
    to: h_high
    label: High
  - from: humidity
    to: h_normal
    label: Normal
  - from: wind
    to: w_strong
    label: Strong
  - from: wind
    to: w_weak
    label: Weak
```

#### تحويل المسارات إلى قواعد IF-THEN:
```text
IF (Outlook = Sunny) AND (Humidity = Normal) THEN PlayTennis = Yes
IF (Outlook = Rain) AND (Wind = Strong) THEN PlayTennis = No
```

**لماذا نحول الشجرة إلى قواعد؟** لأن القواعد أسهل قراءةً للإنسان من رسم شجرة كاملة، خصوصًا عند شرح القرار لعميل أو مدير غير تقني.

---

### 6. خوارزميات تعلّم شجرة القرار `DTs Learning Algorithms`

#### النص الأصلي يقول:
> "In general from a given set of attributes, many decision trees can be constructed... Due to the exponential size of the search space, Finding the optimal tree is computationally infeasible... E.g., ID3, C4.5, CART, SPRINT."

#### الشرح المبسّط:
من نفس مجموعة السمات يمكن بناء **أشجار كثيرة جدًا** مختلفة الدقة. لكن إيجاد **الشجرة المثلى (Optimal Tree)** بالبحث الشامل هو مسألة ذات **تعقيد حسابي هائل (exponential)** — أي غير عملي زمنيًا.

**لماذا؟** لأن عدد الطرق الممكنة لترتيب السمات وتقسيم القيم يتضاعف مع كل سمة جديدة (مثل مسألة `Traveling Salesman` من حيث الفكرة العامة للانفجار التوافقي).

**الحل العملي:** خوارزميات `Greedy` (جشعة) تبني شجرة **جيدة بما يكفي** في وقت معقول، بدل شجرة "مثالية" بوقت غير معقول:
- `ID3` (Quinlan, 1986) — يعتمد على `Information Gain`.
- `C4.5` — تحسين لـ ID3 يستخدم `Gain Ratio`.
- `CART` — يستخدم `Gini Index`، وينتج أشجارًا ثنائية (binary).
- `SPRINT` — مصمم للتعامل مع بيانات ضخمة (قابل للتوزيع).

#### 💡 التشبيه:
> إيجاد الشجرة المثالية يشبه تجربة كل الطرق الممكنة للوصول من مدينة لأخرى عبر عشرات الطرق الفرعية — مستحيل عمليًا لضيق الوقت. بدل ذلك تختار في كل تقاطع الطريق الذي يبدو الأفضل الآن (Greedy) دون التأكد من أنه الأفضل إجمالًا.
> **وجه الشبه:** التقاطع = عقدة القرار، اختيار الطريق الأقصر ظاهريًا = اختيار السمة ذات أعلى `Information Gain`.

---

### 7. الخوارزمية الأساسية `The Basic DTs Learning Algorithm` (ID3)

#### النص الأصلي يقول:
> "Basic algorithm (ID3, Quinlan 1986): Greedy algorithm. At start, all the training tuples are at the root node. The question is 'Which attribute should be selected for split?'... For each possible value of the test attribute, a descendant node is created... The procedure is repeated for each descendant node, so instances are partitioned recursively."

#### الشرح المبسّط:
خوارزمية `ID3` تعمل بأسلوب **Greedy** و**تكراري/recursive**:
1. في البداية، كل صفوف التدريب (tuples) توجد عند العقدة الجذرية.
2. تُختار "أفضل" سمة للتقسيم باستخدام **مقياس إحصائي** (مثل `Information Gain`).
3. لكل قيمة ممكنة لهذه السمة، تُنشأ عقدة فرعية (descendant)، وتُوزَّع الصفوف عليها حسب قيمتها.
4. تتكرر العملية على كل عقدة فرعية بشكل **recursive** حتى الوصول لعقد ورقية نقية أو استيفاء شرط توقف.

```algorithm
1 | تهيئة | Root Node | وضع كل صفوف التدريب عند العقدة الجذرية
2 | اختيار السمة | Attribute Selection Measure (مثل Information Gain) | اختيار السمة "الأفضل" A للتقسيم عند العقدة الحالية
3 | التفرّع | Descendant Nodes | إنشاء عقدة فرعية لكل قيمة ممكنة من قيم A
4 | التوزيع | Sorting | توزيع صفوف التدريب على العقد الفرعية المناسبة حسب قيمتها لـ A
5 | التكرار | Recursion | تكرار الخطوات 2-4 على كل عقدة فرعية جديدة
6 | التوقف | Stopping Condition | إذا صُنّفت الصفوف بشكل كامل (نقية) → STOP، وإلا كرر على العقد الجديدة
```

#### نقاط التنفيذ:
- عند عدم وجود سمات متبقية للتقسيم، تُعاد **عقدة ورقية بفئة الأغلبية (Majority Voting)** بدلًا من الاستمرار.
- الخوارزمية **جشعة (Greedy)**: تختار الأفضل محليًا في كل خطوة، دون النظر للمستقبل — لذلك لا تضمن الشجرة المثلى الكلية.

#### مهم للامتحان ⚠️:
> **قاعدة الأغلبية (Majority Class)** تُطبَّق فقط عندما **لا توجد سمات متبقية** للتقسيم أكثر — وليس عند أي توقف عشوائي.

---

### 8. طرق تقسيم الصفوف `Possibilities For Partitioning Tuples`

#### النص الأصلي يقول:
> "If A is discrete-valued... If A is continuous-valued, Based on a split_point... If A is discrete-valued and a binary tree must be produced, The test is of the form 'A ∈ S_A?'"

#### الشرح المبسّط:
| نوع السمة A | طريقة التقسيم | مثال |
| --- | --- | --- |
| **Discrete (Nominal)** | فرع لكل قيمة ممكنة مباشرة | `income? → low / medium / high` |
| **Continuous (Numeric)** | فرعان بناءً على `split_point`: A ≤ point و A > point | `income? → ≤42,000 / >42,000` |
| **Discrete + شجرة ثنائية إلزامية** | اختبار عضوية في مجموعة فرعية `A ∈ S_A?` | `color ∈ {red, green}? → yes / no` |

**لماذا نحتاج طرقًا متعددة؟** لأن بعض الخوارزميات (مثل CART) تفرض بنية **ثنائية** (فرعان فقط لكل عقدة) بغض النظر عن نوع السمة، بينما تسمح خوارزميات أخرى (مثل ID3) بعدد فروع مساوٍ لعدد القيم الفريدة.

#### 💡 التشبيه:
> تقسيم السمة المستمرة (مثل الدخل) بنقطة قطع يشبه تعيين "خط فقر" — كل من دخله تحت الخط في مجموعة، ومن هو فوقه في مجموعة أخرى.
> **وجه الشبه:** split_point = خط الفقر، A ≤ split_point = تحت الخط.

---

### 9. معايير اختيار السمة `Attribute Selection Measures`

#### النص الأصلي يقول:
> "We choose the attribute that is most useful for classifying. The resulting partitioning is as pure as possible. attribute selection measures based on the degree of impurity of the parent node (before splitting) vs the children nodes (after splitting). Different measures: Information gain, gain ratio, Gini index."

#### الشرح المبسّط:
لاختيار أفضل سمة للتقسيم، نقيس مدى **نقاوة (purity)** المجموعات الناتجة بعد التقسيم:
- **مجموعة نقية (Pure):** كل عناصرها من فئة واحدة (Minimum impurity).
- **مجموعة غير نقية (Impure):** خليط متساوٍ تقريبًا من الفئات (Very impure group).

كلما كانت المجموعات الناتجة بعد التقسيم أنقى، كانت السمة المُختارة أفضل. المقاييس الشائعة: `Information Gain`، `Gain Ratio`، `Gini Index` (الأخيران يُشرحان بالتفصيل في محاضرة لاحقة — **غير مشروحة بالتفصيل في هذه المحاضرة**).

#### 💡 التشبيه:
> تخيل كيس حلوى بلونين مختلطين تمامًا (50/50) مقابل كيس فيه لون واحد فقط — الكيس أحادي اللون "نقي" ولا حاجة لسؤال إضافي لمعرفة اللون القادم؛ أما الكيس المختلط فيحتاج معلومات أكثر (تخمين).
> **وجه الشبه:** الكيس أحادي اللون = Entropy=0 (نقي تمامًا)، الكيس 50/50 = Entropy=1 (أقصى عدم يقين).

---

### 10. الإنتروبيا `Entropy` لقياس عدم النقاوة

#### النص الأصلي يقول:
> "Entropy comes from information theory and It represents the average amount of information needed to identify the class label of an instance... Entropy(S) = −P⊕log2P⊕ − P⊖log2P⊖... In all calculations involving entropy we define 0log0=0. Entropy(S)=0, all members belong to the same class. Entropy(S)=1, equal number of positive and negative examples."

#### الشرح المبسّط:
`Entropy` مقياس رياضي من **نظرية المعلومات** يقيس "مقدار الغموض/عدم اليقين" في مجموعة بيانات S بالنسبة لفئتها.

#### 📐 المعادلة: Entropy (لحالتين: موجب وسالب)
$$
Entropy(S) = -P_{\oplus} \log_2 P_{\oplus} - P_{\ominus} \log_2 P_{\ominus}
$$

**الشرح:**
> - $P_{\oplus}$: نسبة الأمثلة الموجبة (positive) في S.
> - $P_{\ominus}$: نسبة الأمثلة السالبة (negative) في S.
> - نتفق أن $0 \log_2 0 = 0$ لتفادي خطأ رياضي غير معرّف.
> - `Entropy(S) = 0` تعني أن كل العناصر من فئة واحدة (نقاوة كاملة).
> - `Entropy(S) = 1` تعني توزيعًا متساويًا تمامًا بين الفئتين (أقصى غموض).
> - كلما ارتفعت الإنتروبيا ↑ ارتفعت عدم النقاوة ↑ زادت المعلومات المطلوبة لتحديد الفئة.

#### 📐 المعادلة: Entropy العامة (m فئات)
$$
Entropy(S) = -\sum_{i=1}^{m} P_i \log_2(P_i)
$$

**الشرح:**
> - m: عدد الفئات الممكنة.
> - $P_i$: نسبة الأمثلة من الفئة i في المجموعة S.
> - هذه الصيغة تعميم للصيغة الثنائية أعلاه لتشمل أي عدد من الفئات (multi-class).

#### 🔍 تتبع التنفيذ: حساب Entropy لمجموعة [9+, 5-]

**المدخل:** S يحتوي 9 أمثلة موجبة (Yes) و5 أمثلة سالبة (No)، الإجمالي 14.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب $P_{\oplus} = 9/14$ | 0.643 |
| 2 | حساب $P_{\ominus} = 5/14$ | 0.357 |
| 3 | حساب $-P_{\oplus}\log_2 P_{\oplus}$ | ≈ 0.410 |
| 4 | حساب $-P_{\ominus}\log_2 P_{\ominus}$ | ≈ 0.530 |
| 5 | الجمع | 0.410 + 0.530 = **0.940** |

**النتيجة:** `Entropy(S) = 0.94` (عدم نقاوة مرتفعة نسبيًا، قريبة من الحد الأقصى 1).

---

### 11. الربح المعلوماتي `Information Gain`

#### النص الأصلي يقول:
> "Used in ID3 (Quinlan, 1986). It uses entropy, a measure of pureness of the data. The information gain Gain(S,A) of an attribute A relative to a set of examples S measures the expected reduction in entropy of S due to splitting on A... The attribute with the higher information is chosen as the splitting attribute. This attribute minimizes the number of tests needed to identify the class label of an instance."

#### الشرح المبسّط:
`Information Gain` يقيس **مقدار انخفاض الإنتروبيا** الذي نحصل عليه لو قسّمنا المجموعة S حسب السمة A. كلما كان الانخفاض أكبر، كانت السمة A أكثر فائدة للتصنيف.

#### 📐 المعادلة: Information Gain
$$
Gain(S, A) = Entropy(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} \, Entropy(S_v)
$$

**الشرح:**
> - $Entropy(S)$: إنتروبيا المجموعة الأصلية **قبل** التقسيم (Before splitting).
> - $Values(A)$: كل القيم الممكنة للسمة A.
> - $S_v$: المجموعة الجزئية من S التي قيمتها في A تساوي v.
> - $\frac{|S_v|}{|S|}$: وزن كل مجموعة جزئية (نسبتها من الحجم الكلي).
> - المجموع كله = **متوسط الإنتروبيا المرجّح للأبناء بعد التقسيم** (After splitting on A).
> - **السمة ذات أعلى Gain** هي التي تُختار للتقسيم، لأنها **تقلل أكبر قدر من عدم اليقين**، وبالتالي تقلل عدد الأسئلة (الاختبارات) اللازمة لتحديد الفئة.

#### 🔍 تتبع التنفيذ: مثال حساب Information Gain (عيّنة عامة، 30 مثالًا)

**المدخل:** مجموعة كاملة S بها 30 مثالًا (14 سالب + 16 موجب تقريبًا)، تنقسم إلى ابنين: 17 مثالًا و13 مثالًا.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Entropy(parent) بـ [14+,16-] تقريبًا | 0.996 |
| 2 | Entropy(child 17 instances) بـ [13+,4-] | 0.787 |
| 3 | Entropy(child 13 instances) بـ [1+,12-] | 0.391 |
| 4 | المتوسط المرجّح = (17/30)(0.787) + (13/30)(0.391) | 0.615 |
| 5 | Gain = 0.996 − 0.615 | **0.38** |

**النتيجة:** `Information Gain = 0.38` — كلما اقترب من 1 كان التقسيم أكثر فائدة.

#### مهم للامتحان ⚠️:
> لاحظ الفرق بين **Entropy الأصلي (Before)** الذي يُطرح منه، و**المتوسط المرجّح بعد التقسيم (After)** — كثير من الأخطاء الشائعة تنسى وزن `|Sv|/|S|` أو تنسى الطرح.

---

### 12. مثال متكامل: مقارنة Humidity مقابل Wind

#### النص الأصلي يقول:
> "Two options for splitting: 'Humidity' and 'Wind'? Gain(S,Humidity) = .940 - (7/14).985 - (7/14).592 = .151. Gain(S,Wind) = .940 - (8/14).811 - (6/14)1.0 = .048."

#### الشرح المبسّط:
لدينا مجموعة S=[9+,5-] بإنتروبيا 0.940. نقارن بين تقسيمها حسب `Humidity` أو `Wind`:

| السمة | الفروع | Entropy لكل فرع | Gain |
| --- | --- | --- | --- |
| `Humidity` | High [3+,4-] E=0.985 / Normal [6+,1-] E=0.592 | 0.940 - (7/14)(0.985) - (7/14)(0.592) | **0.151** |
| `Wind` | Weak [6+,2-] E=0.811 / Strong [3+,3-] E=1.00 | 0.940 - (8/14)(0.811) - (6/14)(1.0) | **0.048** |

**القرار:** بما أن `Gain(S, Humidity) = 0.151 > Gain(S, Wind) = 0.048`، فإن **Humidity** هي السمة الأفضل للتقسيم في هذه المقارنة الجزئية.

**لماذا؟** لأن تقسيم Humidity ينتج فرعًا شبه نقي (Normal: E=0.592 أقرب للنقاء)، بينما تقسيم Wind ينتج فرعًا (Strong) عند أقصى عدم نقاوة ممكنة (E=1.00).

---

### 13. مثال شامل كامل: buys_computer

#### النص الأصلي يقول:
> جدول RID/Age/Income/Student/Credit_rating/Class مع 14 صفًا، حيث Class="yes" لتسعة صفوف و"no" لخمسة صفوف، والمطلوب بناء شجرة قرار.

#### الشرح المبسّط:
هذا مثال متكامل خطوة بخطوة لتطبيق كل ما سبق:

**الخطوة 1 — حساب Entropy الأصلي:**
$$
Entropy(S) = -\frac{9}{14}\log_2\frac{9}{14} - \frac{5}{14}\log_2\frac{5}{14} = 0.940
$$

**الخطوة 2 — حساب متوسط الإنتروبيا المرجّح لكل سمة (Age مثالًا):**

| قيمة age | \|Sv\| | Class Yes | Class No | Entropy(Sv) |
| --- | --- | --- | --- | --- |
| youth | 5 | 2 | 3 | 0.971 |
| middle_aged | 4 | 4 | 0 | 0.000 |
| senior | 5 | 3 | 2 | 0.971 |

$$
\sum \frac{|S_v|}{|S|}Entropy(S_v) = \frac{5}{14}(0.971) + \frac{4}{14}(0) + \frac{5}{14}(0.971) = 0.694
$$
$$
Gain(S, age) = 0.940 - 0.694 = 0.246
$$

**الخطوة 3 — تكرار الحساب لباقي السمات (نتائج جاهزة من المحاضرة):**

| السمة | Information Gain |
| --- | --- |
| `age` | **0.246** ← الأعلى |
| `student` | 0.151 |
| `credit_rating` | 0.048 |
| `income` | 0.029 |

**الخطوة 4 — القرار:** سمة `age` تملك أعلى Information Gain، فتصبح **العقدة الجذرية**.

**الخطوة 5 — التكرار Recursively:** تتكرر نفس الخطوات (حساب Entropy وGain) داخل كل فرع من age (youth, middle_aged, senior) باستخدام السمات المتبقية فقط، حتى نصل للشجرة النهائية:

```diagram
type: decision-tree
title: buys_computer Decision Tree
direction: TD
nodes:
  - id: age
    label: age?
    kind: decision
    level: 0
  - id: student
    label: student?
    kind: decision
    level: 1
  - id: mid_yes
    label: "yes"
    kind: leaf
    level: 1
  - id: credit
    label: credit_rating?
    kind: decision
    level: 1
  - id: s_no
    label: "no"
    kind: leaf
    level: 2
  - id: s_yes
    label: "yes"
    kind: leaf
    level: 2
  - id: c_fair
    label: "no"
    kind: leaf
    level: 2
  - id: c_excellent
    label: "yes"
    kind: leaf
    level: 2
edges:
  - from: age
    to: student
    label: youth
  - from: age
    to: mid_yes
    label: middle_aged
  - from: age
    to: credit
    label: senior
  - from: student
    to: s_no
    label: no
  - from: student
    to: s_yes
    label: yes
  - from: credit
    to: c_fair
    label: fair
  - from: credit
    to: c_excellent
    label: excellent
```

#### الدرس المستفاد:
> بناء شجرة القرار عملية **تكرارية (recursive)**: تُطبَّق نفس خطوات "حساب Entropy → حساب Gain لكل سمة → اختيار الأعلى" في كل عقدة جديدة، حتى تصبح كل الفروع نقية أو تنفد السمات.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Classification` | إيجاد نموذج يتنبأ بقيمة فئوية (categorical) | Spam / Not Spam |
| `Supervised Learning` | تعلم من بيانات موسومة بفئات معروفة مسبقًا | جدول Tenured={yes,no} |
| `Training Phase` | مرحلة بناء النموذج من بيانات التدريب | Classification Algorithm → Classifier |
| `Testing Phase` | مرحلة التحقق من دقة النموذج على بيانات مستقلة | يجب عدم تداخلها مع Training |
| `Overfitting` | حفظ النموذج للبيانات بدل تعلم النمط العام | يحدث عند اختبار النموذج على بيانات التدريب نفسها |
| `Decision Tree` | بنية شجرية لتمثيل قواعد تصنيف | Outlook → Humidity/Wind → Yes/No |
| `Splitting Attribute` | السمة المُختارة للاختبار في عقدة داخلية | age في مثال buys_computer |
| `ID3` | خوارزمية Greedy لبناء أشجار القرار باستخدام Information Gain | Quinlan, 1986 |
| `Entropy` | مقياس عدم النقاوة/عدم اليقين في مجموعة بيانات | يتراوح بين 0 (نقي) و1 (أقصى غموض لفئتين) |
| `Information Gain` | مقدار انخفاض Entropy الناتج عن التقسيم بسمة معينة | Gain(S,A) = Entropy(S) − متوسط مرجّح للأبناء |
| `Majority Voting` | تعيين فئة الأغلبية عند نفاد السمات | تُستخدم في العقد الورقية النهائية |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Internal Node` | اختبار سمة | يُسمى أيضًا Splitting Attribute |
| `Branch` | تمثيل قيمة السمة | فرع واحد لكل قيمة (أو فرعان لشجرة ثنائية) |
| `Leaf Node` | فئة نهائية | Class Value |
| `split_point` | نقطة قطع للسمات المستمرة | يُستخدم مع A≤point و A>point |
| `splitting_subset (S_A)` | مجموعة فرعية من القيم لاختبار عضوية | يُستخدم في الأشجار الثنائية الإلزامية |

### جداول مقارنات سريعة

| المقارنة | Discrete Attribute | Continuous Attribute |
| --- | --- | --- |
| طريقة التقسيم | فرع لكل قيمة | فرعان حسب split_point |
| مثال | income? → low/medium/high | income? → ≤42,000 />42,000 |

| المقارنة | Base Classifier | Ensemble Classifier |
| --- | --- | --- |
| العدد | مصنّف واحد | عدة مصنّفات مجتمعة |
| أمثلة | Decision Tree, kNN, SVM, Naive Bayes | Bagging, Boosting, Random Forest |

### مصطلحات (Glossary)

| المصطلح الإنجليزي | المعنى بالعربية |
| --- | --- |
| `class label attribute` | سمة تحمل الفئة الصحيحة (label) |
| `predefined class` | فئة محددة مسبقًا |
| `unseen data` | بيانات غير مرئية من قبل النموذج |
| `impurity` | عدم النقاوة (خليط الفئات) |
| `greedy algorithm` | خوارزمية جشعة (تختار الأفضل محليًا فقط) |
| `recursive partitioning` | تقسيم متكرر للبيانات على كل عقدة |

### نقاط ذهبية

| # | النقطة |
| --- | --- |
| 1 | `Classification` = مخرج فئوي، `Regression` = مخرج رقمي مستمر |
| 2 | Training و Testing يجب أن يكونا **مستقلَّين تمامًا** |
| 3 | `Entropy=0` يعني نقاوة كاملة، `Entropy=1` يعني أقصى غموض (لفئتين متساويتين) |
| 4 | `Information Gain` يختار السمة التي **تُقلّل الإنتروبيا** أكثر من غيرها |
| 5 | خوارزمية ID3 **Greedy** و **Recursive** ولا تضمن الشجرة المثلى الكلية |
| 6 | عند نفاد السمات دون نقاوة كاملة → `Majority Voting` |

### أخطاء شائعة

| # | الخطأ | التصحيح |
| --- | --- | --- |
| 1 | نسيان الوزن `\|Sv\|/\|S\|` عند حساب متوسط إنتروبيا الأبناء | يجب ترجيح كل فرع بحجمه النسبي |
| 2 | استخدام Training Data لقياس الدقة النهائية | يجب استخدام Test Data المستقلة |
| 3 | الاعتقاد أن ID3 يجد دومًا الشجرة الأمثل | ID3 خوارزمية Greedy تعطي شجرة "جيدة" وليست بالضرورة "الأفضل" |
| 4 | حساب $0 \log_2 0$ كخطأ غير معرّف | نتفق دومًا أن $0\log_2 0 = 0$ |

---

### خطوات وإجراءات المحاضرة

```algorithm
1 | بناء نموذج تصنيف | Two-step process | تدريب (Training) ثم اختبار (Testing) قبل الاستخدام الفعلي
```

```algorithm
1 | تهيئة الجذر | ID3 | وضع كل الصفوف عند العقدة الجذرية
2 | اختيار أفضل سمة | Information Gain | حساب Gain لكل سمة واختيار الأعلى
3 | إنشاء الفروع | Descendant nodes | فرع لكل قيمة من قيم السمة المختارة
4 | التوزيع | Sorting examples | توزيع الصفوف على الفروع المناسبة
5 | فحص التوقف | Stopping check | إذا الفرع نقي → ورقة، وإلا كرر من الخطوة 2 على ذلك الفرع
```

### أنماط الأكواد
> لا تحتوي هذه المحاضرة (Part-1) على كود برمجي صريح — فقط معادلات وحسابات يدوية. الكود المرجعي البرمجي المكافئ مُجمَّع بالكامل في الجزء الخامس أدناه.

### أنماط التعامل
- عند رؤية سؤال "أي سمة تُختار للتقسيم؟" → احسب Entropy الأصل، ثم Entropy كل فرع محتمل، ثم Gain لكل سمة، واختر الأعلى.
- عند رؤية جدول بيانات جديد → ابدأ دومًا بحساب `Entropy(S)` الكلي أولًا قبل أي مقارنة بين السمات.

### الأفكار الشاملة
- الهدف النهائي من كل هذا الحساب هو **تقليل عدد الأسئلة (depth الشجرة)** اللازمة لتحديد فئة أي عينة جديدة.
- الأساس الرياضي (Entropy/Information Gain) مبني على **نظرية المعلومات لشانون (Shannon)**، وهو نفس الأساس المستخدم لاحقًا في مقاييس أخرى مثل Gain Ratio وGini Index (تُشرح في محاضرات لاحقة — **غير مشروحة في هذه المحاضرة**).

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1
ما نوع القيمة التي يتنبأ بها نموذج `Classification`؟
أ) قيمة رقمية مستمرة
ب) قيمة فئوية (categorical)
ج) مصفوفة من القيم
د) لا شيء مما سبق

**الإجابة الصحيحة: ب**
- أ) خطأ — هذا هو تعريف Regression وليس Classification.
- ب) صحيح — النص صراحة: "Predicts a value of a given a categorical target variable".
- ج) خطأ — الناتج قيمة واحدة (فئة)، وليس مصفوفة.
- د) خطأ — يوجد إجابة صحيحة وهي (ب).

### السؤال 2
أي مما يلي **ليس** من تطبيقات Classification المذكورة في المحاضرة؟
أ) Spam Filtering
ب) التنبؤ بسعر منزل بالدولار
ج) Fraud Detection
د) Medical Diagnosis

**الإجابة الصحيحة: ب**
- أ) خطأ — مذكورة كتطبيق Classification (Spam/Not Spam).
- ب) صحيح — سعر بالدولار قيمة مستمرة، هذا تطبيق Regression وليس Classification.
- ج) خطأ — مذكورة صراحة كتطبيق (Fraud/Not Fraud).
- د) خطأ — مذكورة صراحة (Healthy/Cold/Flu...).

### السؤال 3
لماذا يجب أن تكون Test Data مستقلة عن Training Data؟
أ) لتسريع عملية التدريب
ب) لتفادي تقدير متفائل (Overfitting) لدقة النموذج
ج) لأن القانون يفرض ذلك
د) لا داعي لذلك، يمكن استخدام نفس البيانات

**الإجابة الصحيحة: ب**
- أ) خطأ — استقلالية البيانات لا علاقة لها بسرعة التدريب.
- ب) صحيح — النص: "this estimation would likely be optimistic, because the classifier tends to overfit the data".
- ج) خطأ — لا علاقة بأي قانون، بل بصحة القياس الإحصائي.
- د) خطأ — يتعارض مباشرة مع نص المحاضرة.

### السؤال 4
في شجرة القرار، ماذا تمثل العقدة الداخلية (Internal Node)؟
أ) فئة نهائية
ب) اختبار على سمة معينة
ج) قيمة سمة معينة
د) بيانات غير مصنفة

**الإجابة الصحيحة: ب**
- أ) خطأ — الفئة النهائية تمثلها العقدة الورقية (Leaf).
- ب) صحيح — "each internal node specifies a test of some attribute".
- ج) خطأ — القيمة يمثلها الفرع (Branch) وليس العقدة الداخلية.
- د) خطأ — لا علاقة للعقدة الداخلية بذلك.

### السؤال 5
ما قيمة `Entropy(S)` عندما تكون كل عناصر S تنتمي لفئة واحدة فقط؟
أ) 1
ب) 0.5
ج) 0
د) لا يمكن حسابها

**الإجابة الصحيحة: ج**
- أ) خطأ — القيمة 1 تعني أقصى عدم يقين (توزيع متساوٍ)، عكس المطلوب.
- ب) خطأ — لا تمثل هذه القيمة أي حالة خاصة مذكورة في المحاضرة.
- ج) صحيح — النص: "Entropy(S)=0, all members belong to the same class".
- د) خطأ — يمكن حسابها بسهولة، وستساوي صفرًا بحكم الاتفاق $0\log_2 0=0$.

### السؤال 6
احسب `Entropy(S)` لمجموعة تحتوي 10 أمثلة موجبة و10 أمثلة سالبة (بدون حساب دقيق، استنتاجًا من القاعدة).
أ) 0
ب) 1
ج) 0.5
د) غير معرّفة

**الإجابة الصحيحة: ب**
- أ) خطأ — الصفر يعني نقاوة كاملة، وهذه المجموعة متوازنة تمامًا وليست نقية.
- ب) صحيح — عند تساوي عدد الفئتين تمامًا (10 مقابل 10)، Entropy = 1 وفق القاعدة المذكورة في المحاضرة.
- ج) خطأ — لا تُستخدم هذه القيمة كحالة خاصة في هذا السياق.
- د) خطأ — العملية معرّفة جيدًا رياضيًا.

### السؤال 7
أي سمة تُختار كسمة تقسيم (Splitting Attribute) في خوارزمية ID3؟
أ) السمة ذات أقل عدد قيم ممكنة
ب) السمة ذات أعلى Information Gain
ج) السمة الأولى في الجدول
د) السمة ذات أعلى Entropy

**الإجابة الصحيحة: ب**
- أ) خطأ — عدد القيم لا علاقة له مباشرة بمعيار الاختيار في ID3.
- ب) صحيح — النص: "The attribute with the higher information is chosen as the splitting attribute".
- ج) خطأ — لا علاقة لترتيب الأعمدة في الجدول بمعيار الاختيار.
- د) خطأ — نريد **أعلى Gain (انخفاض** في الإنتروبيا)، وليس أعلى Entropy مباشرة.

### السؤال 8
بالرجوع لمثال buys_computer، ما السمة التي حصلت على أعلى Information Gain وأصبحت جذر الشجرة؟
أ) income
ب) student
ج) age
د) credit_rating

**الإجابة الصحيحة: ج**
- أ) خطأ — Gain(income)=0.029، الأقل بين كل السمات.
- ب) خطأ — Gain(student)=0.151، أقل من age.
- ج) صحيح — Gain(age)=0.246، الأعلى بين كل السمات المحسوبة.
- د) خطأ — Gain(credit_rating)=0.048، أقل من age.

### السؤال 9
ماذا يحدث في خوارزمية ID3 عندما لا يتبقى أي سمة لمزيد من التقسيم؟
أ) تتوقف الخوارزمية بخطأ
ب) تُعاد عقدة ورقية بفئة الأغلبية (Majority Voting)
ج) تختار سمة عشوائية وتكرر التقسيم
د) تعيد استخدام السمة الجذرية

**الإجابة الصحيحة: ب**
- أ) خطأ — لا يوجد "خطأ"، هذه حالة متوقعة يُعالجها الخوارزمية بشكل طبيعي.
- ب) صحيح — النص: "return a leaf node labeled with the majority class (majority voting)".
- ج) خطأ — لا يوجد اختيار عشوائي في الخوارزمية الأساسية.
- د) خطأ — لا يجوز إعادة استخدام سمة استُهلكت في مسار سابق.

### السؤال 10
لماذا تُعتبر خوارزمية ID3 "Greedy" (جشعة)؟
أ) لأنها تستهلك ذاكرة كبيرة
ب) لأنها تختار أفضل سمة محليًا في كل خطوة دون ضمان الحل الأمثل الكلي
ج) لأنها تعمل ببطء شديد
د) لأنها تستخدم كل السمات دفعة واحدة

**الإجابة الصحيحة: ب**
- أ) خطأ — لا علاقة لاستهلاك الذاكرة بمصطلح Greedy هنا.
- ب) صحيح — النص يوضح أن إيجاد الشجرة المثلى غير ممكن حسابيًا، فتُستخدم استراتيجية جشعة تختار الأفضل محليًا في كل عقدة.
- ج) خطأ — بل هي سريعة نسبيًا مقارنة بالبحث الشامل عن الحل الأمثل.
- د) خطأ — تختار سمة واحدة في كل خطوة، وليس كل السمات دفعة واحدة.

### السؤال 11
ما الفرق الأساسي بين تقسيم سمة `Discrete` وسمة `Continuous` في شجرة القرار؟
أ) لا يوجد فرق
ب) Discrete تُقسّم بفرع لكل قيمة، Continuous تُقسّم بنقطة قطع (split_point) لفرعين
ج) Continuous تُقسّم بفرع لكل قيمة، Discrete تُقسّم بنقطة قطع
د) كلاهما يُقسّمان دائمًا لفرعين فقط

**الإجابة الصحيحة: ب**
- أ) خطأ — يوجد فرق واضح كما مذكور بالجدول.
- ب) صحيح — يطابق ما ورد في "Possibilities For Partitioning Tuples".
- ج) خطأ — عكس الترتيب الصحيح تمامًا.
- د) خطأ — هذا صحيح فقط لـ Continuous أو للحالة الخاصة "binary tree must be produced" مع Discrete، وليس القاعدة العامة لـ Discrete.

### السؤال 12
أي من التالي يمثل مصنّفًا من نوع `Ensemble Classifier`؟
أ) Decision Tree
ب) Naive Bayes
ج) Random Forest
د) k-Nearest Neighbors

**الإجابة الصحيحة: ج**
- أ) خطأ — Decision Tree مصنّف أساسي (Base Classifier) مفرد.
- ب) خطأ — Naive Bayes مصنّف أساسي مفرد أيضًا.
- ج) صحيح — Random Forest مذكور صراحة ضمن Ensemble Classifiers (مع Boosting وBagging).
- د) خطأ — kNN مصنّف أساسي مفرد.

### السؤال 13 (سيناريو حساب)
> **السيناريو:** مجموعة S تحتوي على 20 مثالًا: 12 من فئة "Yes" و8 من فئة "No". قُسّمت المجموعة بسمة A إلى فرعين: الفرع الأول 10 أمثلة (كلها Yes)، والفرع الثاني 10 أمثلة (2 Yes و8 No).

ما قيمة Entropy للفرع الأول؟
أ) 1
ب) 0
ج) 0.5
د) 0.94

**الإجابة الصحيحة: ب**
- أ) خطأ — القيمة 1 تعني عدم يقين أقصى، وهذا الفرع نقي تمامًا.
- ب) صحيح — الفرع الأول كله من فئة واحدة (Yes) → نقاوة كاملة → Entropy=0.
- ج) خطأ — لا مبرر رياضيًا لهذه القيمة هنا.
- د) خطأ — هذه قيمة إنتروبيا [9+,5-] من مثال آخر، لا تنطبق هنا.

### السؤال 14 (استكمال سيناريو السؤال 13)
ما القيمة التقريبية لـ Entropy الفرع الثاني (2 Yes، 8 No من أصل 10)؟
أ) 0
ب) 1
ج) ≈ 0.72
د) ≈ 0.94

**الإجابة الصحيحة: ج**
- أ) خطأ — الفرع غير نقي (يحوي فئتين)، فلا يمكن أن تكون الإنتروبيا صفرًا.
- ب) خطأ — القيمة 1 تعني توزيعًا متساويًا 5/5، بينما هنا التوزيع 2/8 غير متساوٍ.
- ج) صحيح — بحساب $-\frac{2}{10}\log_2\frac{2}{10} - \frac{8}{10}\log_2\frac{8}{10} \approx 0.722$.
- د) خطأ — هذه قيمة مقاربة لتوزيع [9+,5-]، وليست لتوزيع [2+,8-].

### السؤال 15 (استكمال سيناريو السؤال 13)
باستخدام Entropy(S) الأصلية (استنتج تقريبيًا من [12+,8-] ≈ 0.971)، ما القيمة التقريبية لـ Information Gain للسمة A؟
أ) صفر تقريبًا
ب) قريبة من 1 (أعلى قيمة ممكنة)
ج) ≈ 0.61 (قيمة متوسطة إلى مرتفعة)
د) قيمة سالبة

**الإجابة الصحيحة: ج**
- أ) خطأ — التقسيم أنتج فرعًا نقيًا تمامًا، وهذا يعني انخفاضًا معتبرًا في الإنتروبيا، ليس صفرًا.
- ب) خطأ — Gain لا يمكن أن يتجاوز Entropy(S) الأصلية (0.971)؛ والقيمة الفعلية (~0.61) أقل من ذلك بكثير.
- ج) صحيح — بالحساب: المتوسط المرجّح = (10/20)(0) + (10/20)(0.722) = 0.361، و Gain = 0.971 − 0.361 ≈ 0.61.
- د) خطأ — Information Gain **لا يمكن رياضيًا أن يكون سالبًا** أبدًا، لأن التقسيم لا يزيد الغموض إجمالًا.

### السؤال 16
ما الهدف الرئيسي من استخدام معايير اختيار السمة (مثل Information Gain) في بناء شجرة القرار؟
أ) تسريع تحميل البيانات
ب) اختيار السمة التي تُنتج أنقى تقسيم ممكن للبيانات
ج) تقليل عدد الأعمدة في قاعدة البيانات
د) حذف السمات غير الرقمية

**الإجابة الصحيحة: ب**
- أ) خطأ — لا علاقة لهذه المعايير بسرعة تحميل البيانات.
- ب) صحيح — الهدف هو تحقيق أعلى نقاوة ممكنة للفروع الناتجة عن التقسيم، وبالتالي دقة تصنيف أفضل.
- ج) خطأ — لا تُحذف الأعمدة، بل تُقيَّم وتُرتَّب حسب فائدتها للتقسيم.
- د) خطأ — يمكن تطبيق هذه المعايير على سمات فئوية ورقمية كليهما.

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (نوع: `wrong_formula`)
**الكود (يحتوي خطأ):**
```python
import math

def entropy(p_pos, p_neg):
    # WRONG: missing the negative sign
    return p_pos * math.log2(p_pos) + p_neg * math.log2(p_neg)
```

**اكتشف الخطأ:** الدالة لا تضع إشارة سالبة أمام الحدَّين، بينما الصيغة الصحيحة هي $-\sum P_i \log_2 P_i$.

**التصحيح:**
```python
import math

def entropy(p_pos, p_neg):
    # CORRECT: negative sign in front of the sum
    return -(p_pos * math.log2(p_pos) + p_neg * math.log2(p_neg))
```

**شرح الحل:**
1. الإنتروبيا صيغتها الرياضية تبدأ دومًا بإشارة سالبة `−Σ`.
2. بدون الإشارة السالبة، ستكون النتيجة رقمًا سالبًا (لأن log لأرقام أقل من 1 سالب)، وهذا يناقض تعريف Entropy كقيمة موجبة بين 0 و1.
3. اختبر الدالة بمثال [9+,5-]: يجب أن تُعطي 0.94 تقريبًا وليس -0.94.

---

### سؤال تصحيح 2 (نوع: `logic`)
**الكود (يحتوي خطأ):**
```python
def entropy(counts, total):
    result = 0
    for c in counts:
        p = c / total
        result += p * math.log2(p)   # BUG: no check for p == 0
    return -result
```

**اكتشف الخطأ:** إذا كانت `c = 0` (فئة غير موجودة في المجموعة)، فإن `p = 0` و `math.log2(0)` سيرمي خطأ `ValueError` (لأن log(0) غير معرّف رياضيًا)، بينما القاعدة تقول $0 \log_2 0 = 0$.

**التصحيح:**
```python
def entropy(counts, total):
    result = 0
    for c in counts:
        if c == 0:
            continue  # 0 * log2(0) is defined as 0
        p = c / total
        result += p * math.log2(p)
    return -result
```

**شرح الحل:**
1. المحاضرة تنص صراحة: "In all calculations involving entropy we define 0log0 = 0".
2. بدون هذا الفحص، سيتعطل البرنامج عند أي فرع نقي (فئة واحدة فقط، أي عدّاد الفئة الأخرى = 0).
3. الحل هو تجاهل أي فئة عدّادها صفر بدلًا من محاولة حساب log لها.

---

### سؤال تصحيح 3 (نوع: `misconception`)
**الكود (يحتوي خطأ):**
```python
def information_gain(entropy_parent, children):
    # children: list of (weight, entropy) tuples
    total_children_entropy = 0
    for weight, ent in children:
        total_children_entropy += ent   # BUG: forgot to multiply by weight
    return entropy_parent - total_children_entropy
```

**اكتشف الخطأ:** الكود يجمع قيم Entropy للأبناء **دون ترجيحها** بنسبة حجمها `|Sv|/|S|`، بينما الصيغة الصحيحة تتطلب الوزن.

**التصحيح:**
```python
def information_gain(entropy_parent, children):
    total_children_entropy = 0
    for weight, ent in children:
        total_children_entropy += weight * ent   # weighted sum
    return entropy_parent - total_children_entropy
```

**شرح الحل:**
1. الصيغة الصحيحة: $Gain(S,A) = Entropy(S) - \sum \frac{|S_v|}{|S|}Entropy(S_v)$ — الوزن جزء أساسي منها.
2. بدون الترجيح، فرع صغير جدًا وفرع كبير جدًا يُعاملان بنفس الأهمية، وهذا يُشوّه المقارنة بين السمات.
3. تحقق بمثال Humidity: `0.940 - (7/14)(0.985) - (7/14)(0.592) = 0.151` — لاحظ وجود `(7/14)` كوزن أمام كل حد.

---

### سؤال تصحيح 4 (نوع: `dead_code`)
**الكود (يحتوي خطأ):**
```python
def choose_best_attribute(attributes, entropy_parent):
    best_attr = None
    best_gain = 0
    for attr in attributes:
        gain = information_gain(entropy_parent, attr.children)
        if gain > best_gain:
            best_attr = attr
            best_gain = gain
    return best_attr

def build_tree(data, attributes):
    if len(attributes) == 0:
        return majority_class(data)
    best = choose_best_attribute(attributes, entropy(data))
    # BUG: 'best' is never checked for None before use below
    tree = {best.name: {}}
    return tree
```

**اكتشف الخطأ:** لو كانت كل قيم `gain` مساوية للصفر (أو سالبة نظريًا بخطأ حسابي)، فإن `best_attr` يبقى `None`، وبالتالي `best.name` في `build_tree` سيرمي خطأ `AttributeError`.

**التصحيح:**
```python
def build_tree(data, attributes):
    if len(attributes) == 0:
        return majority_class(data)
    best = choose_best_attribute(attributes, entropy(data))
    if best is None:
        # fallback: no attribute improves purity, use majority voting
        return majority_class(data)
    tree = {best.name: {}}
    return tree
```

**شرح الحل:**
1. الحالة "لا توجد سمة مفيدة" نادرة لكنها ممكنة نظريًا (مثلًا كل Gain=0)، ويجب معالجتها بدل افتراض وجود دومًا سمة أفضل.
2. القاعدة العامة في المحاضرة تقول: عند عدم القدرة على التحسين أو نفاد السمات → استخدم `Majority Voting`.
3. إضافة فحص `if best is None` يمنع كسر البرنامج (crash) في الحالات الحدّية.

---

### سؤال تصحيح 5 (نوع: `logic` — خطأ في شرط التوقف)
**الكود (يحتوي خطأ):**
```python
def build_tree(data, attributes):
    if entropy(data) == 0:
        return majority_class(data)   # OK stopping condition
    if len(attributes) == 0:
        return None   # BUG: should return majority class, not None
    ...
```

**اكتشف الخطأ:** عند نفاد السمات (`len(attributes) == 0`) لكن البيانات ليست نقية بعد، يجب إرجاع **فئة الأغلبية** (Majority Voting) وليس `None`.

**التصحيح:**
```python
def build_tree(data, attributes):
    if entropy(data) == 0:
        return majority_class(data)
    if len(attributes) == 0:
        return majority_class(data)   # FIXED: majority voting
    ...
```

**شرح الحل:**
1. النص الأصلي واضح: "When There are no remaining attributes for further partitioning => return a leaf node labeled with the majority class".
2. إرجاع `None` يعني عدم القدرة على التصنيف نهائيًا، وهذا يخالف سلوك الخوارزمية المطلوب.
3. حالتا التوقف (نقاوة كاملة، أو نفاد السمات) يجب أن تُعاملا كلتاهما بنفس الطريقة تقريبًا: إرجاع ورقة بفئة (إما نقية أو أغلبية).

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل.

### تمرين 1 (نوع: `metric_calculation`)
**المعطيات:** مجموعة بيانات S تحتوي 16 مثالًا: 6 من فئة "Yes" و10 من فئة "No".

**المطلوب:**
1. احسب $P_{\oplus}$ و $P_{\ominus}$.
2. احسب Entropy(S).

**نموذج الحل:**
- $P_{\oplus} = 6/16 = 0.375$، $P_{\ominus} = 10/16 = 0.625$.
- $Entropy(S) = -0.375\log_2(0.375) - 0.625\log_2(0.625) \approx 0.531 + 0.424 = 0.954$.

---

### تمرين 2 (نوع: `fill_gaps`)
أكمل الفراغ في صيغة Information Gain:
$$
Gain(S, A) = Entropy(S) - \sum_{v \in Values(A)} \frac{\_\_\_\_}{\_\_\_\_} \, Entropy(S_v)
$$

**نموذج الحل:** الفراغان هما $|S_v|$ (بسط) و $|S|$ (مقام)، أي $\frac{|S_v|}{|S|}$.

---

### تمرين 3 (نوع: `code_fix`)
**الكود (به خطأ منطقي):**
```python
def is_pure(data_labels):
    unique_labels = set(data_labels)
    return len(unique_labels) == 0   # BUG
```

**المطلوب:** صحّح شرط النقاوة (يجب أن تكون المجموعة نقية إذا كانت كل التسميات متطابقة، أي فئة واحدة فقط).

**نموذج الحل:**
```python
def is_pure(data_labels):
    unique_labels = set(data_labels)
    return len(unique_labels) == 1   # FIXED: pure means exactly ONE unique class
```

---

### تمرين 4 (نوع: `scenario`)
**السيناريو:** لديك سمة `color` بقيم `{red, green, blue}`، وتحتاج بناء شجرة قرار **ثنائية إلزاميًا** (كل عقدة فرعان فقط).

**المطلوب:** اكتب شكل الاختبار المناسب لهذه الحالة.

**نموذج الحل:**
```text
color ∈ {red, green}?
   yes → فرع 1
   no  → فرع 2 (يشمل blue ضمنيًا)
```
هذا يطابق الحالة الثالثة في جدول "Possibilities For Partitioning Tuples": `A ∈ S_A?` حيث `S_A` هي `splitting_subset`.

---

### تمرين 5 (نوع: `model_apply`)
**المعطيات:** سمة `Wind` بفرعين: Weak [6+,2-] و Strong [3+,3-]، وEntropy(S)=0.940.

**المطلوب:** احسب Gain(S, Wind) خطوة بخطوة.

**نموذج الحل:**
- Entropy(Weak) = $-\frac{6}{8}\log_2\frac{6}{8}-\frac{2}{8}\log_2\frac{2}{8} \approx 0.811$.
- Entropy(Strong) = $-\frac{3}{6}\log_2\frac{3}{6}-\frac{3}{6}\log_2\frac{3}{6} = 1.0$.
- المتوسط المرجّح = $(8/14)(0.811) + (6/14)(1.0) \approx 0.463 + 0.429 = 0.892$.
- Gain(S, Wind) = $0.940 - 0.892 \approx 0.048$ (يطابق قيمة المحاضرة).

---

### تمرين 6 (نوع: `table_fill`)
**المعطيات:** جدول ناقص لسمة `income` في مثال buys_computer (income له 3 قيم: low, medium, high).

**المطلوب:** أكمل الجدول التالي بافتراض أن Gain(S, income) = 0.029 معروفة مسبقًا من المحاضرة، واحسب المتوسط المرجّح للأبناء.

**نموذج الحل:**
$$
\sum \frac{|S_v|}{|S|}Entropy(S_v) = Entropy(S) - Gain(S,income) = 0.940 - 0.029 = 0.911
$$
أي أن متوسط إنتروبيا فروع income المرجّح = **0.911** (قيمة مرتفعة نسبيًا، ما يفسّر لماذا income كانت أضعف سمة للتقسيم).

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين تحليلي 1: `case_study`
**السيناريو:** شركة اتصالات تريد بناء شجرة قرار لتصنيف العملاء إلى Loyal/Disloyal باستخدام السمات: العمر، مدة الاشتراك، عدد الشكاوى.

**المطلوب:**
1. ما نوع كل سمة (Discrete أم Continuous)؟
2. كيف تُقسَّم كل سمة في الشجرة؟

**نموذج الحل:**
| السمة | النوع | طريقة التقسيم |
| --- | --- | --- |
| العمر | Continuous | split_point (مثال: ≤30 />30) |
| مدة الاشتراك | Continuous | split_point |
| عدد الشكاوى | Continuous (أو Discrete إذا صُنِّفت لفئات: قليل/متوسط/كثير) | حسب طريقة التمثيل المختارة |

---

### تمرين تحليلي 2: `table_fill` (Confusion Matrix — تمهيدًا للمحاضرة القادمة)
> ملاحظة: مقاييس Precision/Recall/F1 **غير مشروحة تفصيليًا في هذه المحاضرة** — هذا تمرين تمهيدي (شرح زيادة للفهم).

**السيناريو:** نموذج صنّف 100 عميل: 40 توقع أنهم "Yes" فعليًا كانوا "Yes"، 10 توقع "Yes" لكنهم فعليًا "No"، إلخ.

**المطلوب:** حدد أي خانة في Confusion Matrix تمثل كل حالة.

**نموذج الحل:**
| | Actual: Yes | Actual: No |
| --- | --- | --- |
| Predicted: Yes | True Positive (40) | False Positive (10) |
| Predicted: No | False Negative | True Negative |

---

### تمرين تحليلي 3: `written_analysis`
**السؤال:** لماذا لا نستخدم البحث الشامل (Brute-force) لإيجاد شجرة القرار المثلى مباشرة؟

**نموذج الحل:**
لأن عدد الأشجار الممكنة يتزايد **بشكل أُسّي (exponential)** مع عدد السمات وقيمها، مما يجعل تجربتها كلها غير ممكنة حسابيًا (computationally infeasible) في وقت معقول — خصوصًا مع بيانات حقيقية تحتوي عشرات أو مئات السمات. لذلك نلجأ لاستراتيجيات Greedy مثل ID3 التي تعطي حلًا "جيدًا جدًا" بوقت معقول، حتى لو لم يكن الأمثل نظريًا.

---

### تمرين تحليلي 4: `diagram_completion`
**السيناريو:** أُعطيت شجرة قرار ناقصة الجذر: عقدة فارغة تتفرع إلى `Sunny/Overcast/Rain`، وتحت Sunny توجد عقدة `Humidity`، وتحت Rain توجد عقدة `Wind`.

**المطلوب:** أكمل تسمية العقدة الجذرية الناقصة.

**نموذج الحل:** العقدة الجذرية الناقصة هي **`Outlook`**، لأن قيمها الثلاث (Sunny, Overcast, Rain) هي التي تتفرع منها مباشرة، كما في شجرة Play Tennis المرجعية.

---

### تمرين تحليلي 5: `case_study`
**السيناريو:** بعد بناء شجرة قرار كاملة، لاحظ الفريق أن دقتها على بيانات Training تبلغ 99% لكن دقتها على بيانات Test تبلغ 60% فقط.

**المطلوب:** فسّر هذه الظاهرة باستخدام مفهوم من المحاضرة.

**نموذج الحل:** هذه علامة كلاسيكية على `Overfitting` — الشجرة "حفظت" تفاصيل بيانات التدريب (بما فيها الضوضاء) بدل تعلم النمط العام القابل للتعميم، ولذلك أداؤها ضعيف على بيانات لم ترها من قبل. (ملاحظة: معالجة Overfitting بالتفصيل — مثل Pruning — **غير مشروحة في هذه المحاضرة**، وستُغطى في الجزء الثاني من محاضرات Classification).

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: بناء شجرة ID3 — الجولة الأولى
**المدخل:**
```python
# Training set: 14 examples, class Yes=9, No=5
attributes = ["Outlook", "Temperature", "Humidity", "Wind"]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب Entropy(S) | ؟ |
| 2 | حساب Gain(S, Outlook) | ؟ |
| 3 | حساب Gain(S, Humidity) | ؟ |
| 4 | حساب Gain(S, Wind) | ؟ |
| 5 | اختيار أفضل سمة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب Entropy(S) | 0.940 |
| 2 | حساب Gain(S, Outlook) | 0.246 (أعلى قيمة معروفة في أمثلة مشابهة) |
| 3 | حساب Gain(S, Humidity) | 0.151 |
| 4 | حساب Gain(S, Wind) | 0.048 |
| 5 | اختيار أفضل سمة | **Outlook** (الأعلى) |

**النتيجة:** العقدة الجذرية = `Outlook`.

---

### تمرين تتبع 2: حساب Entropy لعينة جديدة
**المدخل:**
```python
sample = {"Yes": 7, "No": 7}   # total = 14
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | $P_{\oplus}$ | ؟ |
| 2 | $P_{\ominus}$ | ؟ |
| 3 | Entropy(S) | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | $P_{\oplus}$ | 7/14 = 0.5 |
| 2 | $P_{\ominus}$ | 7/14 = 0.5 |
| 3 | Entropy(S) | $-0.5\log_2 0.5 - 0.5\log_2 0.5 = 1.0$ |

**النتيجة:** Entropy = 1.0 (أقصى غموض ممكن، كما هو متوقع لتوزيع متساوٍ تمامًا).

---

### تمرين تتبع 3: بناء الشجرة داخل فرع Sunny
**المدخل:** فرع `Outlook=Sunny` يحتوي 5 أمثلة: [2+, 3-]، والسمات المتبقية: Temperature, Humidity, Wind.

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Entropy(Sunny subset) | ؟ |
| 2 | أفضل سمة للتقسيم داخل هذا الفرع (بحسب المحاضرة) | ؟ |
| 3 | نتيجة التقسيم بهذه السمة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Entropy(Sunny subset) | $-\frac{2}{5}\log_2\frac{2}{5}-\frac{3}{5}\log_2\frac{3}{5} \approx 0.971$ |
| 2 | أفضل سمة للتقسيم | `Humidity` (كما في الشجرة المرجعية للمحاضرة) |
| 3 | نتيجة التقسيم | High → No (نقي)، Normal → Yes (نقي) |

---

### تمرين تتبع 4: قاعدة التوقف (Majority Voting)
**المدخل:** عقدة تحتوي [3+, 2-]، ولا توجد سمات متبقية للتقسيم.

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | هل توجد سمات متبقية؟ | ؟ |
| 2 | هل العقدة نقية؟ | ؟ |
| 3 | الإجراء المتّبع | ؟ |
| 4 | الفئة النهائية | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | هل توجد سمات متبقية؟ | لا |
| 2 | هل العقدة نقية؟ | لا (خليط 3+ و2-) |
| 3 | الإجراء المتّبع | Majority Voting |
| 4 | الفئة النهائية | **"+"** (لأن 3 > 2) |

---

### تمرين تتبع 5: مقارنة سمتين متنافستين
**المدخل:** Entropy(S)=0.940. السمة X تنتج فرعين E=0.6 (وزن 0.5) وE=0.4 (وزن 0.5). السمة Y تنتج فرعين E=0.9 (وزن 0.5) وE=0.1 (وزن 0.5).

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | متوسط إنتروبيا أبناء X | ؟ |
| 2 | Gain(S, X) | ؟ |
| 3 | متوسط إنتروبيا أبناء Y | ؟ |
| 4 | Gain(S, Y) | ؟ |
| 5 | أي سمة أفضل؟ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | متوسط إنتروبيا أبناء X | (0.5)(0.6)+(0.5)(0.4) = 0.5 |
| 2 | Gain(S, X) | 0.940 − 0.5 = 0.440 |
| 3 | متوسط إنتروبيا أبناء Y | (0.5)(0.9)+(0.5)(0.1) = 0.5 |
| 4 | Gain(S, Y) | 0.940 − 0.5 = 0.440 |
| 5 | أي سمة أفضل؟ | **متعادلتان** (نفس الـGain رغم اختلاف توزيع الأبناء) |

**النتيجة:** درس مهم — نفس قيمة Gain يمكن أن تنتج من توزيعات مختلفة تمامًا للأبناء؛ Information Gain ينظر فقط للمتوسط المرجّح الكلي.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### السؤال 1: ما الفرق بين Classification وClustering؟
**نموذج الإجابة:** 1) التعريف: Classification تعلم مُوجَّه (Supervised) يتنبأ بفئة معروفة مسبقًا، بينما Clustering (**غير مشروحة في هذه المحاضرة**) تعلم غير مُوجَّه يكتشف مجموعات دون فئات معروفة مسبقًا. 2) المكونات: Classification يحتاج بيانات موسومة (Labeled)، Clustering يعمل على بيانات غير موسومة. 3) مثال: تصنيف بريد Spam/Not Spam (Classification) مقابل تجميع عملاء متشابهين دون تسميات مسبقة (Clustering). 4) متى نستخدم: عندما تكون الفئات معروفة سلفًا نستخدم Classification.

### السؤال 2: عرّف Entropy واشرح لماذا القيمة القصوى لها هي 1 في الحالة الثنائية.
**نموذج الإجابة:** 1) التعريف: مقياس من نظرية المعلومات لعدم اليقين/عدم النقاوة في مجموعة بيانات. 2) الشروط: في الحالة الثنائية، القيمة القصوى (1) تحدث عند التوزيع المتساوي تمامًا (50%/50%) لأن هذا أقصى حالة غموض ممكنة. 3) مثال رقمي: مجموعة [7+,7-] → Entropy=1. 4) متى نستخدمها: لتقييم جودة أي تقسيم مقترح في شجرة القرار.

### السؤال 3: اشرح خطوات خوارزمية ID3 الأساسية.
**نموذج الإجابة:** 1) التعريف: خوارزمية Greedy وRecursive لبناء شجرة قرار. 2) المكونات/الشروط: تبدأ بكل الصفوف عند الجذر، تختار أفضل سمة عبر Information Gain، تُنشئ فرعًا لكل قيمة، وتكرر العملية حتى النقاوة الكاملة أو نفاد السمات (فتُستخدم عندها Majority Voting). 3) مثال: بناء شجرة buys_computer بدءًا من age. 4) متى نستخدمها: عند الحاجة لنموذج قابل للتفسير البشري المباشر (قواعد IF-THEN).

### السؤال 4: ما أهمية تقسيم البيانات إلى Training وTest Sets؟
**نموذج الإجابة:** 1) التعريف: فصل البيانات لضمان تقييم موضوعي للنموذج. 2) الشروط: يجب أن يكون التقسيمان مستقلَّين وبنفس التوزيع الإحصائي. 3) مثال: لو استخدمنا بيانات التدريب للاختبار، ستكون الدقة متفائلة زائفًا (Overfitting). 4) متى نستخدمه: دائمًا عند بناء أي نموذج Supervised Learning.

### السؤال 5: قارن بين السمة Discrete والسمة Continuous من حيث طريقة التقسيم في شجرة القرار.
**نموذج الإجابة:** 1) التعريف: Discrete لها قيم منفصلة محدودة، Continuous لها مجال قيم رقمي مستمر. 2) المكونات: Discrete → فرع لكل قيمة، Continuous → فرعان حسب split_point. 3) مثال: `income∈{low,medium,high}` مقابل `income≤42000`. 4) متى نستخدم كل طريقة: حسب طبيعة السمة الفعلية في البيانات.

### السؤال 6: لماذا لا تضمن خوارزمية ID3 إيجاد الشجرة المثلى (Optimal Tree)؟
**نموذج الإجابة:** 1) التعريف: ID3 خوارزمية Greedy. 2) الشروط: تختار في كل خطوة أفضل سمة **محليًا فقط**، دون النظر لتأثير هذا الاختيار على الخطوات المستقبلية. 3) مثال: قد تختار سمة تبدو الأفضل الآن لكنها تؤدي لشجرة أعمق أو أقل دقة لاحقًا مقارنة باختيار آخر. 4) متى يكون هذا مقبولًا: عندما البحث الشامل غير ممكن حسابيًا (exponential search space)، فنقبل حلًا "جيدًا بما يكفي" بدل "الأمثل".

### السؤال 7: اشرح معنى Majority Voting ومتى تُستخدم.
**نموذج الإجابة:** 1) التعريف: تعيين فئة الأغلبية كتصنيف نهائي لعقدة ورقية. 2) الشروط: تُستخدم عندما لا توجد سمات متبقية للتقسيم رغم أن العقدة ليست نقية بعد. 3) مثال: عقدة [3+,2-] بدون سمات متبقية → الفئة النهائية "+" لأن 3>2. 4) متى نستخدمها: كحل بديل لتجنب توقف الخوارزمية بلا نتيجة.

### السؤال 8: ما الفرق بين Base Classifiers وEnsemble Classifiers؟ اذكر مثالين لكل نوع.
**نموذج الإجابة:** 1) التعريف: Base = مصنّف واحد مفرد، Ensemble = تجميع عدة مصنّفات. 2) المكونات: أمثلة Base: Decision Tree، Naive Bayes. أمثلة Ensemble: Bagging، Random Forest. 3) مثال: شجرة قرار مفردة (Base) مقابل غابة عشوائية من عدة أشجار (Ensemble). 4) متى نستخدم كل نوع: Base عند الحاجة لتفسير بسيط، Ensemble عند أولوية الدقة.

### السؤال 9: كيف تُترجم شجرة القرار إلى قواعد IF-THEN؟ ولماذا هذا مفيد؟
**نموذج الإجابة:** 1) التعريف: كل مسار من الجذر إلى ورقة يصبح شرطًا مركّبًا (AND) ينتهي بفئة. 2) الشروط: يجب أن يكون المسار كاملًا من الجذر حتى الورقة. 3) مثال: `IF (Outlook=Sunny) AND (Humidity=Normal) THEN PlayTennis=Yes`. 4) متى هذا مفيد: عند الحاجة لشرح القرار لغير المتخصصين أو لتوثيق منطق العمل (business rules).

### السؤال 10: اشرح لماذا نحدد $0\log_2 0 = 0$ في حسابات الإنتروبيا رغم أن log(0) غير معرّف رياضيًا.
**نموذج الإجابة:** 1) التعريف: هذا اتفاق رياضي (convention) وليس نتيجة حساب مباشر. 2) الشروط: يُطبَّق فقط عند $P_i=0$ لفئة معينة. 3) مثال: في مجموعة نقية [5+,0-]، نسبة الفئة السالبة صفر، فنعتبر مساهمتها في الإنتروبيا صفرًا بدل خطأ حسابي. 4) متى يهم هذا: عند برمجة دالة Entropy فعليًا (كما في سؤال تصحيح الكود 2) لتفادي الأعطال البرمجية عند الحالات النقية.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Regression (السابقة) | Classification (هذه المحاضرة) | كلاهما Supervised Learning، لكن يختلفان بنوع المخرج (مستمر مقابل فئوي) |
| Classification part-1 (هذه) | Classification part-2 (متوقعة) | تكمل بـ Gain Ratio، Gini Index، Overfitting، Pruning |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| Classification | مخرج فئوي، Supervised Learning، خطوتان (Training/Testing) |
| Decision Tree | Internal Node=اختبار سمة، Branch=قيمة، Leaf=فئة |
| ID3 | Greedy + Recursive، يعتمد Information Gain |
| Entropy | 0=نقي تمامًا، 1=أقصى غموض (حالة ثنائية متوازنة) |
| Information Gain | Entropy(Parent) − متوسط مرجّح لـEntropy(Children) |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| $P_i$ | نسبة الفئة i في المجموعة | صيغة Entropy |
| $S_v$ | المجموعة الجزئية بقيمة v للسمة A | صيغة Information Gain |
| `split_point` | نقطة قطع لسمة رقمية | تقسيم Continuous Attributes |
| `Majority Voting` | فئة الأغلبية | عند نفاد السمات |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | لا تخلط بين Classification (فئوي) وRegression (مستمر) |
| 2 | Test Set مستقل دائمًا عن Training Set |
| 3 | $0\log_2 0 = 0$ اصطلاحًا |
| 4 | Information Gain أعلى ← سمة أفضل للتقسيم |
| 5 | نفاد السمات دون نقاوة ← Majority Voting |
| 6 | ID3 لا يضمن الشجرة المثلى الكلية (Greedy فقط) |

---

## بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الفرق بين Classification وRegression؟
A: Classification يتنبأ بفئة (categorical)، Regression يتنبأ بقيمة رقمية مستمرة.

**Q2:** ما هو Supervised Learning؟
A: تعلم من بيانات موسومة (labeled) بفئات معروفة مسبقًا.

**Q3:** لماذا يجب فصل Training عن Testing؟
A: لتجنب تقدير متفائل زائف للدقة بسبب Overfitting.

**Q4:** ما الذي تمثله العقدة الداخلية في شجرة القرار؟
A: اختبار على سمة معينة (Splitting Attribute).

**Q5:** ما الذي يمثله الفرع (Branch) في شجرة القرار؟
A: إحدى القيم الممكنة للسمة المُختبَرة.

**Q6:** ما الذي تمثله العقدة الورقية؟
A: الفئة النهائية (Class Label).

**Q7:** من هو مبتكر خوارزمية ID3 وفي أي عام؟
A: Quinlan، عام 1986.

**Q8:** ما نوع خوارزمية ID3 من ناحية استراتيجية البحث؟
A: خوارزمية Greedy (جشعة).

**Q9:** ما قيمة Entropy عند نقاوة كاملة؟
A: صفر (0).

**Q10:** ما قيمة Entropy القصوى في حالة ثنائية متوازنة؟
A: واحد (1).

**Q11:** ما الذي يقيسه Information Gain؟
A: مقدار الانخفاض المتوقع في Entropy نتيجة التقسيم بسمة معينة.

**Q12:** كيف تُختار السمة الأفضل للتقسيم في ID3؟
A: السمة ذات أعلى قيمة Information Gain.

**Q13:** ماذا يحدث عند نفاد السمات دون الوصول لنقاوة كاملة؟
A: تُعاد عقدة ورقية بفئة الأغلبية (Majority Voting).

**Q14:** كيف تُقسَّم السمة المستمرة (Continuous) في شجرة القرار؟
A: بفرعين بناءً على split_point: A≤point وA>point.

**Q15:** اذكر خوارزميتين أخريين لبناء أشجار القرار غير ID3.
A: C4.5 وCART (وأيضًا SPRINT).

**Q16:** ما الفرق بين Base Classifier وEnsemble Classifier؟
A: Base مصنّف واحد مفرد (مثل Decision Tree)، Ensemble تجميع عدة مصنّفات (مثل Random Forest).

**Q17:** ما القيمة المتفق عليها لـ $0\log_2 0$ في حسابات الإنتروبيا؟
A: صفر (0)، وذلك اصطلاحًا لتفادي خطأ رياضي غير معرّف.

**Q18:** ماذا يمثل كل مسار من الجذر إلى ورقة في شجرة القرار منطقيًا؟
A: اقتران شروط (AND) على قيم السمات على طول ذلك المسار.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> الكود التالي مُجمَّع من كل مفاهيم هذه المحاضرة (Entropy، Information Gain، بناء شجرة قرار مبسّطة يدويًا، ثم مقارنة مع مكتبة sklearn) — مرجع للطالب، لا شرح جديد.

```python
# === Imports ===
import math
from collections import Counter

# === Entropy Calculation ===
def entropy(labels):
    """Compute Entropy(S) for a list of class labels."""
    total = len(labels)
    if total == 0:
        return 0
    counts = Counter(labels)
    result = 0
    for label, count in counts.items():
        p = count / total
        if p == 0:
            continue  # 0 * log2(0) is defined as 0
        result -= p * math.log2(p)
    return result

# === Information Gain Calculation ===
def information_gain(data, attribute, label_key="class"):
    """
    data: list of dicts, each dict is a row (tuple) with attributes + class label
    attribute: name of the attribute to split on
    """
    parent_labels = [row[label_key] for row in data]
    parent_entropy = entropy(parent_labels)

    total = len(data)
    values = set(row[attribute] for row in data)

    weighted_entropy = 0
    for v in values:
        subset = [row for row in data if row[attribute] == v]
        weight = len(subset) / total
        subset_labels = [row[label_key] for row in subset]
        weighted_entropy += weight * entropy(subset_labels)

    return parent_entropy - weighted_entropy

# === Choosing the Best Splitting Attribute (ID3 core step) ===
def choose_best_attribute(data, attributes, label_key="class"):
    best_attr = None
    best_gain = -1
    for attr in attributes:
        gain = information_gain(data, attr, label_key)
        if gain > best_gain:
            best_gain = gain
            best_attr = attr
    return best_attr, best_gain

# === Majority Class (used when no attributes remain) ===
def majority_class(data, label_key="class"):
    labels = [row[label_key] for row in data]
    return Counter(labels).most_common(1)[0][0]

# === Basic ID3 Recursive Tree Builder ===
def build_id3_tree(data, attributes, label_key="class"):
    labels = [row[label_key] for row in data]

    # Stopping condition 1: pure node
    if entropy(labels) == 0:
        return {"leaf": labels[0]}

    # Stopping condition 2: no attributes left -> majority voting
    if len(attributes) == 0:
        return {"leaf": majority_class(data, label_key)}

    best_attr, best_gain = choose_best_attribute(data, attributes, label_key)

    tree = {"attribute": best_attr, "branches": {}}
    remaining_attrs = [a for a in attributes if a != best_attr]

    for v in set(row[best_attr] for row in data):
        subset = [row for row in data if row[best_attr] == v]
        if len(subset) == 0:
            tree["branches"][v] = {"leaf": majority_class(data, label_key)}
        else:
            tree["branches"][v] = build_id3_tree(subset, remaining_attrs, label_key)

    return tree

# === Example usage: buys_computer dataset from the lecture ===
buys_computer_data = [
    {"age": "youth",       "income": "high",   "student": "no",  "credit_rating": "fair",      "class": "no"},
    {"age": "youth",       "income": "high",   "student": "no",  "credit_rating": "excellent",  "class": "no"},
    {"age": "middle_aged", "income": "high",   "student": "no",  "credit_rating": "fair",       "class": "yes"},
    {"age": "senior",      "income": "medium", "student": "no",  "credit_rating": "fair",       "class": "yes"},
    {"age": "senior",      "income": "low",    "student": "yes", "credit_rating": "fair",       "class": "yes"},
    {"age": "senior",      "income": "low",    "student": "yes", "credit_rating": "excellent",  "class": "no"},
    {"age": "middle_aged", "income": "low",    "student": "yes", "credit_rating": "excellent",  "class": "yes"},
    {"age": "youth",       "income": "medium", "student": "no",  "credit_rating": "fair",       "class": "no"},
    {"age": "youth",       "income": "low",    "student": "yes", "credit_rating": "fair",       "class": "yes"},
    {"age": "senior",      "income": "medium", "student": "yes", "credit_rating": "fair",       "class": "yes"},
    {"age": "youth",       "income": "medium", "student": "yes", "credit_rating": "excellent",  "class": "yes"},
    {"age": "middle_aged", "income": "medium", "student": "no",  "credit_rating": "excellent",  "class": "yes"},
    {"age": "middle_aged", "income": "high",   "student": "yes", "credit_rating": "fair",       "class": "yes"},
    {"age": "senior",      "income": "medium", "student": "no",  "credit_rating": "excellent",  "class": "no"},
]

if __name__ == "__main__":
    attributes = ["age", "income", "student", "credit_rating"]

    # Verify Entropy(S) matches the lecture value 0.940
    print("Entropy(S) =", round(entropy([row["class"] for row in buys_computer_data]), 3))

    # Verify Gain for each attribute matches the lecture values
    for attr in attributes:
        g = information_gain(buys_computer_data, attr)
        print(f"Gain(S, {attr}) = {round(g, 3)}")

    # Build the full tree
    tree = build_id3_tree(buys_computer_data, attributes)
    print(tree)

    # === Equivalent using scikit-learn (for comparison / real-world use) ===
    from sklearn.tree import DecisionTreeClassifier
    from sklearn.preprocessing import OrdinalEncoder
    import pandas as pd

    df = pd.DataFrame(buys_computer_data)
    X_raw = df[attributes]
    y_raw = df["class"]

    encoder = OrdinalEncoder()
    X = encoder.fit_transform(X_raw)

    clf = DecisionTreeClassifier(criterion="entropy")  # entropy = Information Gain based
    clf.fit(X, y_raw)

    print("sklearn feature importances:", dict(zip(attributes, clf.feature_importances_)))
```

**المكتبات المطلوبة (Imports):**
> `math`, `collections.Counter` (مكتبات قياسية) — و`pandas`, `scikit-learn` للجزء المقارن مع مكتبة جاهزة.

**الناتج المتوقع:**
> طباعة Entropy(S)=0.940، وقيم Gain لكل سمة مطابقة تقريبًا لقيم المحاضرة (age≈0.246 هي الأعلى)، ثم شجرة قرار متداخلة (dict) تبدأ بـ `age`.

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح الفرق بين Classification وRegression بمثال واحد لكل منهما.
- [ ] أستطيع رسم شجرة قرار بسيطة وتحديد Internal Node/Branch/Leaf فيها.
- [ ] أستطيع حساب Entropy لمجموعة معطاة يدويًا (بصيغتها الثنائية والعامة).
- [ ] أستطيع حساب Information Gain لسمة معينة خطوة بخطوة (متضمنًا الترجيح بـ |Sv|/|S|).
- [ ] أفهم لماذا نتفق أن $0\log_2 0 = 0$.
- [ ] أفهم لماذا خوارزمية ID3 "Greedy" ولماذا لا تضمن الشجرة المثلى.
- [ ] أعرف متى تُستخدم Majority Voting بالضبط.
- [ ] أفرّق بين طرق تقسيم السمات Discrete وContinuous والحالة الثنائية الإلزامية.
- [ ] أستطيع تحويل أي مسار في شجرة قرار إلى قاعدة IF-THEN.
- [ ] أعرف الفرق بين Base Classifiers وEnsemble Classifiers مع أمثلة لكل منهما.
- [ ] راجعت جميع أسئلة MCQ (16 سؤالًا) وفهمت تعليل كل خيار خاطئ.
- [ ] راجعت كل أسئلة تصحيح الكود الخمسة وفهمت سبب كل خطأ.
- [ ] حللت تمارين التتبع الخمسة يدويًا دون النظر للحل أولًا.
- [ ] راجعت بطاقات Q&A كاملة (18 بطاقة) بسرعة قبل الامتحان.
- [ ] راجعت ورقة Cheat Sheet في آخر يوم قبل الامتحان.

<!-- VALIDATION: تم تغطية جميع نقاط شرائح PDF (1–28) الخاصة بمحاضرة Classification part-1، شملت: تعريف Classification وتطبيقاته، بناء نموذج التصنيف (Training/Testing)، نماذج التصنيف (Base/Ensemble)، Decision Trees وبنيتها، خوارزميات تعلم DT (ID3/C4.5/CART/SPRINT)، الخوارزمية الأساسية لـID3 وpseudocode، طرق تقسيم الـtuples (discrete/continuous/binary)، معايير اختيار السمة، Entropy وInformation Gain مع كل الأمثلة الرقمية (S=[9+,5-]، Humidity vs Wind، مثال buys_computer الكامل بجميع سماته الأربع). النقاط غير المشروحة تفصيليًا في هذه المحاضرة (Gain Ratio، Gini Index، Overfitting بالتفصيل، Pruning، Confusion Matrix/Precision/Recall/F1) وُسمت بوضوح كـ"شرح زيادة للفهم" أو "غير مشروحة في المحاضرة" أينما ظهرت. -->
