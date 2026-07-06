# المحاضرة 8 — Ensemble Methods (طرق التجميع/التجميعات التصنيفية)
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** تقنيات تحسين دقة التصنيف باستخدام `Ensemble Methods` — `Bagging`، `Boosting`/`AdaBoost`، `Random Forest`

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| التصنيف الأساسي (محاضرات سابقة) | `Decision Tree`، `Naive Bayes`، `kNN` | مصنّف واحد (`base classifier`) |
| **تحسين دقة التصنيف ← أنت هنا** | `Bagging`، `Boosting`، `AdaBoost`، `Random Forest` | مصنّف مركّب `M*` أدق من أي مصنّف فردي |
| تقييم النماذج (لاحقًا) | `Confusion Matrix`، `Precision`، `Recall`، `F1` | مقارنة أداء `Ensemble` مقابل مصنّف مفرد |

> **نوع هذه المحاضرة:** `Classification` — تحديدًا فئة `Ensemble Methods` (`Bagging`, `Boosting`, `AdaBoost`, `Random Forest`, `Bootstrap`, `Voting`, `Weighted Voting`)

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مفهوم Ensemble Methods

#### النص الأصلي يقول:
> "An ensemble tends to be more accurate than its base classifiers. An ensemble is a composite model: A given data set, D, is used to create k training sets, D1,D2,….,Dk, where Di is used to generate classifier Mi. The series of k learned models (or base classifiers), M1, M2,….,Mk, is combined with the aim of creating an improved composite classification model, M*."

#### الشرح المبسّط:
تخيل أن عندك مجموعة بيانات واحدة `D`. بدل ما تدرّب مصنّف واحد فقط عليها، بتاخد عدة نسخ (مجموعات فرعية) من نفس البيانات `D1, D2, ..., Dk`، وتدرّب على كل نسخة مصنّف مستقل `M1, M2, ..., Mk`. في النهاية، بدل ما تعتمد على مصنّف واحد، بتجمع كل هذه المصنفات (اللي تسمى `base classifiers`) في نموذج واحد مركّب اسمه `M*`، وهو الأدق.

**لماذا؟** لأن الاعتماد على رأي واحد (مصنّف واحد) معرّض للخطأ إذا كان هذا المصنّف منحازًا أو تعلّم أنماطًا خاطئة من البيانات (`overfitting` أو `high variance`). لكن لو جمعت آراء عدة مصنفات مختلفة ومستقلة، فاحتمال أن يخطئوا كلهم بنفس الطريقة أقل بكثير، فتكون دقة القرار النهائي أعلى.

#### 💡 التشبيه:
> تخيل أنك مريض وتحتاج تشخيصًا. بدل ما تسأل طبيبًا واحدًا فقط، بتسأل 25 طبيبًا وتاخد رأي الأغلبية.
> **وجه الشبه:** الأطباء الـ25 = `base classifiers` (`M1...Mk`) | رأي الأغلبية النهائي = `M*` (`Ensemble`)

#### 📊 المخطط: آلية عمل الـ Ensemble

#### ما هذا المخطط؟
> يوضّح كيف تُبنى مجموعة المصنفات من البيانات الأصلية `D`، وكيف تُستخدم مع بيانة (`tuple`) جديدة للوصول إلى تنبؤ نهائي واحد عبر تجميع الأصوات.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Data, D | source | مجموعة البيانات الأصلية الكاملة |
| 2 | D1...Dk | process | مجموعات تدريب فرعية تُشتق من D |
| 3 | M1...Mk | model | المصنفات الأساسية (`base classifiers`) المدرَّبة على كل Di |
| 4 | New data tuple | input | بيانة جديدة يُراد تصنيفها |
| 5 | Combine votes | process | دمج تصويت كل المصنفات (`voting`) |
| 6 | Prediction | output | التصنيف النهائي الصادر عن `M*` |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Data, D | D1...Dk | تقسيم/إعادة أخذ عينة | عادي | كل Di يُشتق من D بطريقة تختلف حسب الأسلوب (bootstrap مثلاً) |
| D1...Dk | M1...Mk | تدريب | عادي | كل مجموعة Di تولّد مصنفًا Mi خاصًا بها |
| M1...Mk | Combine votes | تصويت | عادي | كل مصنف يرسل تنبؤه كصوت واحد |
| New data tuple | Combine votes | إدخال | عادي | البيانة الجديدة تُمرَّر لكل المصنفات لتصنيفها |
| Combine votes | Prediction | إخراج | عادي | يُنتج التصنيف النهائي بعد تجميع الأصوات |

```diagram
type: flowchart
title: Ensemble Classification Pipeline
direction: TD
nodes:
  - id: data
    label: "Data, D"
    kind: event
    level: 0
  - id: d1
    label: "D1"
    kind: process
    level: 1
  - id: d2
    label: "D2"
    kind: process
    level: 1
  - id: dk
    label: "Dk"
    kind: process
    level: 1
  - id: m1
    label: "M1"
    kind: model
    level: 2
  - id: m2
    label: "M2"
    kind: model
    level: 2
  - id: mk
    label: "Mk"
    kind: model
    level: 2
  - id: newtuple
    label: "New data tuple"
    kind: input
    level: 2
  - id: combine
    label: "Combine votes"
    kind: process
    level: 3
  - id: prediction
    label: "Prediction"
    kind: output
    level: 4
edges:
  - from: data
    to: d1
  - from: data
    to: d2
  - from: data
    to: dk
  - from: d1
    to: m1
  - from: d2
    to: m2
  - from: dk
    to: mk
  - from: m1
    to: combine
  - from: m2
    to: combine
  - from: mk
    to: combine
  - from: newtuple
    to: combine
  - from: combine
    to: prediction
```

#### مهم للامتحان ⚠️:
> احفظ الفرق بين `Mi` (مصنّف فردي واحد أساسي) و`M*` (النموذج المركّب النهائي/`Ensemble`).

---

### 2. لماذا تعمل طرق الـ Ensemble؟ (Why Ensemble Methods work?)

#### النص الأصلي يقول:
> "Suppose there are 25 base classifiers and each base classifier has error rate, ϵ = 0.35. If the base classifiers are identical, then the error rate of the ensemble classifier = 0.35. if the base classifiers are independent — i.e., their errors are uncorrelated —, then the ensemble makes a wrong prediction only if more than half of the base classifiers predict incorrectly... = 0.06... Two necessary conditions for an ensemble classifier to perform better than a single classifier: 1. the base classifiers should be independent of each other, 2. the base classifiers should do better than a classifier that performs random guessing."

#### الشرح المبسّط:
عندنا 25 مصنّف، كل واحد فيهم بيغلط بنسبة 35% (`ϵ = 0.35`). لو كل المصنفات متطابقة تمامًا (يعني بتغلط بنفس الطريقة بالضبط)، فالتجميع مش هيفيد أبدًا — نسبة الخطأ هتفضل 35%. لكن لو المصنفات مستقلة عن بعضها (يعني أخطاؤها عشوائية ومش مرتبطة)، فالتصنيف النهائي (`M*`) يخطئ فقط لو أكثر من نصف المصنفات (يعني 13 من أصل 25) غلطوا في نفس البيانة. باستخدام التوزيع الاحتمالي الثنائي (`Binomial`)، هذا الاحتمال يهبط لـ 0.06 فقط — يعني تحسّن ضخم!

**لماذا؟** لأنه لما تكون الأخطاء مستقلة وعشوائية، فمن الرياضيات (نظرية الاحتمالات)، احتمال أن يتفق عدد كبير منهم بالخطأ في نفس الوقت يقل كثيرًا كلما زاد عدد المصنفات المستقلة. هذا هو "سر" قوة الـ Ensemble.

#### 💡 التشبيه:
> لو سألت 25 شخصًا نفس السؤال الصعب وكل واحد فيهم بيفكر بطريقة مختلفة تمامًا عن التاني (مستقلين)، فاحتمال أن أغلبهم يخطئوا في نفس الوقت أقل بكثير من احتمال أن شخص واحد يخطئ.
> **وجه الشبه:** الأشخاص الـ25 المستقلين في تفكيرهم = `independent base classifiers`

#### 📐 المعادلة: معادلة خطأ الـ Ensemble (Binomial error)

$$
e_{ensemble} = \sum_{i=13}^{25} \binom{25}{i} \epsilon^{i} (1-\epsilon)^{25-i} = 0.06
$$

**الشرح:**
> - `ϵ`: معدل خطأ المصنّف الواحد (0.35 في المثال)
> - `i`: عدد المصنفات التي أخطأت من أصل 25
> - `13`: أول قيمة تجعل الأغلبية (أكثر من نصف الـ25) مخطئة
> - `(25 choose i)`: عدد الطرق الممكنة لاختيار i مصنّف من أصل 25 يخطئون معًا
> - الناتج (0.06): احتمال أن تخطئ أغلبية المصنفات معًا، وهو أقل بكثير من 0.35

#### الفهم الخاطئ الشائع ❌: زيادة عدد المصنفات دائمًا تحسّن الدقة بغض النظر عن نوعها.
#### الفهم الصحيح ✅: التحسّن يحدث فقط إذا كانت المصنفات (1) مستقلة عن بعضها و(2) أفضل من التخمين العشوائي؛ وإلا فالتجميع لا يفيد (كما في حالة المصنفات المتطابقة).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو عندك 10 مصنفات متطابقة تمامًا (نفس القرارات بالضبط)، هل الـ Ensemble هيحسّن الدقة؟
> **لماذا هذا مهم؟** لأنه يوضح أن مجرد "كثرة" المصنفات مش كافية؛ الاستقلالية (`independence`) هي الشرط الحقيقي.

---

### 3. طرق بناء مصنّف Ensemble (Methods for Constructing an Ensemble Classifier)

#### النص الأصلي يقول:
> "1. By manipulating the training set... Examples: Bagging and boosting. 2. By manipulating the input features... Examples: Random forest... 3. By manipulating the class labels... 4. By manipulating the learning algorithm..."

#### الشرح المبسّط:
فيه 4 طرق أساسية لصنع مصنفات مختلفة (متنوعة) من نفس البيانات، عشان تحقق شرط "الاستقلالية" اللي اتكلمنا عنه:

1. **بالتلاعب في مجموعة التدريب (`manipulating the training set`):** بتعمل إعادة أخذ عينة (`resampling`) من البيانات الأصلية حسب توزيع معيّن، فكل مصنّف بيتدرب على عينة مختلفة شوية. أمثلة: `Bagging` و`Boosting`.
2. **بالتلاعب في الخصائص المُدخلة (`manipulating the input features`):** بتختار مجموعة فرعية مختلفة من الأعمدة/الخصائص لكل مصنّف. مثال: `Random Forest` اللي بيستخدم أشجار قرار.
3. **بالتلاعب في تسميات الفئات (`manipulating the class labels`):** بتقسّم الفئات عشوائيًا لمجموعتين (`A0`, `A1`) وتحوّل المشكلة لمشكلة تصنيف ثنائي (`binary`)، وتكرر العملية عدة مرات لتكوين عدة مصنفات.
4. **بالتلاعب في خوارزمية التعلّم نفسها (`manipulating the learning algorithm`):** بعض الخوارزميات (مثل الشبكات العصبية) بتنتج نماذج مختلفة كل مرة لو غيّرت البنية الداخلية (`topology`) أو الأوزان الابتدائية، حتى لو استخدمت نفس البيانات بالضبط.

**لماذا؟** كل هذه الطرق هدفها واحد: توليد مصنفات "متنوعة" و"مستقلة" قدر الإمكان، لأن هذا هو الشرط الأساسي (كما رأينا في القسم السابق) لنجاح فكرة الـ Ensemble.

#### ⚙️ الخطوات / الخوارزمية: التلاعب في تسميات الفئات (class-relabeling)
> الهدف: تحويل مشكلة متعددة الفئات إلى مشكلة ثنائية بشكل عشوائي متكرر لتوليد مصنفات متنوعة.
```algorithm
1 | تقسيم الفئات عشوائيًا | Random Partitioning | تُقسَّم كل تسميات الفئات إلى مجموعتين A0 و A1
2 | إعادة التسمية | Relabeling | كل بيانة تنتمي لـ A0 تُسمَّى class0، وأي بيانة تنتمي لـ A1 تُسمَّى class1
3 | تدريب مصنّف | Base Learner | يُدرَّب مصنّف ثنائي على البيانات المُعاد تسميتها
4 | التكرار | Loop | تُكرَّر الخطوات 1-3 عدة مرات لبناء ensemble من المصنفات
```
#### نقاط التنفيذ:
- التقسيم في كل تكرار يكون عشوائيًا ومختلفًا عن التكرار السابق لضمان التنوع.
- عدد التكرارات يحدد حجم الـ ensemble النهائي.

#### ⚖️ المقايضة: طرق بناء التنوع في Ensemble

| | التلاعب بمجموعة التدريب | التلاعب بالخصائص |
| --- | --- | --- |
| المزايا | سهل التطبيق، فعّال مع أي خوارزمية تعلّم | يقلل الارتباط بين المصنفات بشكل قوي جدًا |
| العيوب | قد لا يكفي وحده لتحقيق استقلالية كاملة | يحتاج عدد كافٍ من الخصائص أصلًا |
| متى تختاره | بيانات كثيرة العدد (tuples) | بيانات كثيرة الأعمدة (features) مثل النصوص أو الصور |

---

### 4. طرق البناء (تابع): سنشرح تفصيليًا Bagging وAdaBoost وRandom Forests

#### النص الأصلي يقول:
> "Next, We will describe: Bagging: Bootstrap Aggregation. AdaBoost, a boosting algorithm. Random Forests."

#### الشرح المبسّط:
هذه الشريحة مجرد فهرس تمهيدي: المحاضرة هتشرح بالتفصيل ثلاث خوارزميات ensemble مشهورة، الأولى `Bagging` (تعتمد على `bootstrap`)، الثانية `AdaBoost` (نوع من `Boosting`)، والثالثة `Random Forests` (تعتمد على أشجار القرار).

**لماذا؟** لأن هذه الثلاثة هي الأكثر استخدامًا عمليًا في التصنيف، وكل واحدة تمثل فلسفة مختلفة (بناء متوازي مستقل vs بناء تسلسلي متكيّف vs عشوائية في الخصائص).

---

### 5. Bagging (Bootstrap Aggregation)

#### النص الأصلي يقول:
> "Analogy: Instead of asking one doctor, asking several and The final diagnosis is made based on a majority vote. The bagging algorithm—create an ensemble of classification models for a learning scheme where each model gives an equally weighted prediction. The term bagging stands for bootstrap aggregation, where Each training set is a bootstrap sample. every sample has an equal probability of being selected... => It is less susceptible to model overfitting when applied to noisy data. Bagging can be applied to the prediction of continuous values by taking the average value of each prediction for a given test tuple."

#### الشرح المبسّط:
`Bagging` = `Bootstrap` + `Aggregating`. فكرتها: بدل الاعتماد على مصنّف واحد يتدرب على كل البيانات، بناخد عدة عينات (`bootstrap samples`) من نفس البيانات الأصلية بطريقة "السحب مع الإرجاع" (`sampling with replacement`) — يعني نفس البيانة ممكن تتكرر أكثر من مرة في نفس العينة، وممكن بيانات تانية متتاخدش خالص. كل عينة بتدرّب مصنّف مستقل، وكل المصنفات ليها وزن متساوٍ في التصويت النهائي (`equally weighted prediction`). لو المشكلة كانت تنبؤ بقيمة مستمرة (`regression`) مش تصنيف، بناخد متوسط التنبؤات بدل التصويت.

**لماذا؟** لأن كل عينة "bootstrap" ما بتركّزش على بيانة معينة بالذات (كل البيانات لها نفس احتمال الاختيار)، فده بيقلل من تأثير الشذوذ (`noise`/`outliers`) الموجود في أي عينة واحدة على القرار النهائي، وبالتالي يقلل من `overfitting`.

#### 💡 التشبيه:
> بدل ما تسأل دكتور واحد، بتسأل كذا دكتور، وكل واحد بيشوف نسخة مختلفة شوية من ملفك الطبي (فيها تكرار بعض الفحوصات وغياب فحوصات تانية)، وفي الآخر بتاخد رأي الأغلبية.
> **وجه الشبه:** كل دكتور = مصنّف `Mi` مبني على عينة `bootstrap` مختلفة | رأي الأغلبية = `M*`

#### ⚙️ الخطوات / الخوارزمية: Bagging
> الهدف: بناء k نماذج من عينات bootstrap مختلفة، ثم دمج تصويتها لتصنيف بيانة جديدة.
```algorithm
1 | تهيئة المدخلات | Input | D (مجموعة d بيانات)، k (عدد النماذج)، خوارزمية تعلّم (مثل decision tree)
2 | حلقة i=1 إلى k | Training Loop | لكل تكرار: أخذ عينة Di بحجم d من D بالسحب مع الإرجاع (bootstrap sample)
3 | بناء نموذج | Model Building | استخدام Di وخوارزمية التعلّم لبناء المصنّف Mi
4 | تصنيف بيانة جديدة X | Classification | كل مصنّف Mi يعطي تصويتًا واحدًا لفئة X
5 | التصويت النهائي | Majority Vote | المصنّف المركّب M* يحدد الفئة صاحبة أكبر عدد أصوات لـ X
```
#### نقاط التنفيذ:
- السحب يكون "مع الإرجاع" (`with replacement`) وليس بدونه — هذا هو جوهر `bootstrap`.
- حجم كل عينة Di يساوي حجم D الأصلي (d بيانات)، لكن المحتوى مختلف بسبب التكرار والحذف العشوائي.

#### 🔍 تتبع التنفيذ: مثال Bagging على بيانات أحادية البُعد

**المدخل:** بيانات `x` من 0.1 إلى 1.0 بفارق 0.1، والفئة `y` هي: 1,1,1,-1,-1,-1,-1,1,1,1 — ونستخدم `decision stump` بشرط `x ≤ k`.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Bagging Round 1: أخذ عينة bootstrap | نقطة الفصل k=0.35 → يسار=1، يمين=-1 |
| 2 | Bagging Round 2 | نقطة الفصل k=0.7 → يسار=1، يمين=1 |
| 3 | Bagging Round 6 | نقطة الفصل k=0.75 → يسار=-1، يمين=1 |
| 10 | Bagging Round 10 | نقطة الفصل k=0.05 → يسار=1، يمين=1 |

**النتيجة:** عند تجميع تصويت الجولات العشرة على كل قيمة x الأصلية، نحصل على مجموع الأصوات ثم إشارتها (Sign)؛ فمثلاً عند x=0.1 مجموع الأصوات = 2 → الإشارة = 1 (تصنيف صحيح)، بينما عند x=0.4 المجموع = -6 → الإشارة = -1 (تصنيف صحيح). التصنيف النهائي المُجمَّع (`bagged classifier`) طابق التصنيف الحقيقي لكل النقاط، رغم أن كل نموذج فردي (`decision stump` واحد) لا يقدر يفصل هذه البيانة (لأنها غير خطية) بمفرده.

#### مهم للامتحان ⚠️:
> لاحظ أن مصنّف `decision stump` الواحد لا يستطيع فصل بيانات بها 3 مناطق (1,-1,1) بخط فصل واحد، لكن تجميع عدة `stumps` مختلفة عبر `Bagging` قدر يحل المشكلة بدقة 100% في هذا المثال — وده يوضح عمليًا قوة الـ Ensemble.

#### ⚖️ المقايضة: Bagging

| | مميزات Bagging | عيوب Bagging |
| --- | --- | --- |
| المزايا | يقلل الـ `overfitting`، مقاوم للضوضاء (`noise`)، بسيط التطبيق ومتوازٍ (parallel) | لا يحسّن الدقة كثيرًا إذا كانت المصنفات الأساسية ضعيفة جدًا أو مرتبطة ببعضها |
| العيوب | — | لا يعالج تحيّز (`bias`) المصنّف الأساسي، فقط يقلل التباين (`variance`) |
| متى تختاره | عندما تريد تقليل `overfitting` على بيانات ضوضائية | — |

---

### 6. Boosting و AdaBoost

#### النص الأصلي يقول:
> "Analogy: Instead of asking one doctor, asking several. assign weights to the value of each doctor's diagnosis, based on the accuracies of previous diagnoses they have made. The final diagnosis is then a combination of the weighted diagnoses. How boosting works? Weights are also assigned to each training tuple. A series of k classifiers is iteratively learned. After a classifier Mi is learned, the weights are updated to allow the subsequent classifier, Mi+1, to pay more attention to the training tuples that were misclassified by Mi. The final boosted classifier, M*, combines the votes of each individual classifier, where the weight of each classifier's vote is a function of its accuracy. Comparing with bagging: Boosting tends to have greater accuracy, but it also risks overfitting the model to misclassified data."

#### الشرح المبسّط:
`Boosting` مختلف جوهريًا عن `Bagging`: هنا المصنفات مش بتتبنى بشكل متوازٍ ومستقل، وإنما **بشكل متسلسل** (`sequential`)، كل مصنّف بيتعلم من أخطاء اللي قبله. الفكرة: كل بيانة تدريب لها **وزن**، وفي البداية كل الأوزان متساوية. بعد ما مصنّف `Mi` يتدرب، بنزود وزن البيانات اللي غلط فيها (`misclassified`)، عشان المصنّف التالي `Mi+1` يركّز عليها أكتر. كمان كل مصنّف نفسه بياخد **وزن تصويت** (`α`) بيعتمد على دقته — المصنّف الأدق صوته أقوى في القرار النهائي.

**لماذا؟** لأن هذا التركيز التدريجي على "نقاط الضعف" (البيانات الصعبة/المُخطأ فيها) يخلي كل مصنّف جديد يكمّل نواقص السابق، فالدقة الإجمالية بتزيد بسرعة أكبر من `Bagging`. لكن المقابل: التركيز الزائد على البيانات الصعبة ممكن يخلي النموذج يتعلم ضوضاء أو `outliers` بدل الأنماط الحقيقية، وده بيزوّد خطر الـ `overfitting`.

#### 💡 التشبيه:
> بدل ما تسأل عدة دكاترة بشكل متساوٍ، انت بتدي وزن أكبر لرأي الدكتور اللي عادة بيكون تشخيصه أدق (بناءً على سجله)، وكل دكتور جديد بتوجهه يركّز على الحالات اللي غلط فيها الدكتور قبله.
> **وجه الشبه:** وزن ثقة الدكتور = `α` (وزن تصويت المصنّف) | التركيز على الحالات الصعبة = زيادة وزن البيانات المُخطأ فيها

#### ⚖️ المقايضة: Bagging مقابل Boosting

| | Bagging | Boosting |
| --- | --- | --- |
| المزايا | مقاوم للـ `overfitting`، متوازٍ (سريع تدريبًا)، بسيط | دقة أعلى عمومًا، يستغل نقاط الضعف بذكاء |
| العيوب | لا يستغل معلومات الأخطاء بين المصنفات | خطر `overfitting` أعلى خصوصًا مع الضوضاء، تسلسلي (أبطأ في التدريب) |
| متى تختاره | بيانات بها ضوضاء كثيرة | بيانات نظيفة نسبيًا وتريد أعلى دقة ممكنة |

#### الفهم الخاطئ الشائع ❌: Boosting دائمًا أفضل من Bagging لأن دقته أعلى.
#### الفهم الصحيح ✅: Boosting أدق غالبًا لكنه أكثر عرضة لـ `overfitting`، خصوصًا مع بيانات بها `outliers` أو ضوضاء كثيرة، فالاختيار يعتمد على طبيعة البيانات.

---

### 6.1 خوارزمية AdaBoost بالتفصيل

#### النص الأصلي يقول:
> "Input: D... k... a classification learning scheme... Method: (1) W = {wj = 1/d}... (2) for i=1 to k do... (3) sample D with replacement according to the tuple weights W... (4) A classifier Mi is derived... (5) Apply classifier Mi to all examples... (6) Compute ϵi the error rate (weighted error) of Mi = Σ wj × err(Xj)..."

#### الشرح المبسّط:
`AdaBoost` (اختصار `Adaptive Boosting`) هو أشهر خوارزمية `Boosting`. بتبدأ بإعطاء كل بيانة تدريب وزن متساوٍ `wj = 1/d`. بعدين، في كل تكرار (`round`) من أصل k:
1. بتاخد عينة `Di` من `D` بالسحب مع الإرجاع، لكن هذه المرة **احتمال اختيار كل بيانة يعتمد على وزنها الحالي** (مش كلهم بنفس الاحتمال زي Bagging).
2. بتدرّب مصنّف `Mi` على `Di`.
3. بتطبّق `Mi` على **كل** بيانات `D` الأصلية (مش بس العينة).
4. بتحسب معدل الخطأ الموزون `ϵi` = مجموع أوزان البيانات التي أخطأ فيها `Mi`.

**لماذا نحسب الخطأ على D الأصلية كاملة؟** لأن الهدف تقييم أداء `Mi` بشكل عادل على كل البيانات، مش بس العينة اللي اتدرب عليها، عشان نحدد بدقة أي البيانات لسه صعبة.

#### 📐 المعادلة: معدل الخطأ الموزون لـ AdaBoost

$$
\epsilon_i = \sum_{j=1}^{d} w_j \times err(X_j), \quad err(X_j) = \begin{cases} 1 & \text{إذا صُنِّفت } X_j \text{ خطأ بواسطة } M_i \\ 0 & \text{غير ذلك} \end{cases}
$$

**الشرح:**
> - `wj`: الوزن الحالي للبيانة `Xj` (كلما زاد يعني أهميتها أكبر في حساب الخطأ)
> - `err(Xj)`: قيمة ثنائية (1 أو 0) تحدد هل `Mi` أخطأ في تصنيف هذه البيانة أم لا
> - `ϵi`: مجموع أوزان كل البيانات المُخطأ فيها — كلما زاد، كان أداء `Mi` أسوأ

#### النص الأصلي يقول (تابع):
> "if ϵi > 0.5 then W = {wj = 1/d}; go back to step 3 and try again. The weight of classifier Mi's vote is αi = 0.5 × ln((1-ϵi)/ϵi). Update the weight of each tuple Xj: wj(i+1) = wj(i)/zi × [e^(-αi) if correctly classified, e^(αi) if misclassified]... Classification: M*(x) = argmax_y Σ αi × err(x)"

#### الشرح المبسّط:
لو معدل الخطأ `ϵi` أكبر من 0.5 (يعني المصنّف أسوأ من التخمين العشوائي في مسألة ثنائية)، فهذا مرفوض تمامًا — بنعيد الأوزان لحالتها الأصلية المتساوية ونعيد التجربة من جديد (خطوة 3)؛ لأن شرط نجاح الـ Ensemble (اللي شرحناه بالقسم 2) يتطلب أن يكون كل مصنّف أفضل من العشوائية.

بعد التأكد من قبول المصنّف، بنحسب **وزن تصويته** `αi` باستخدام معادلة لوغاريتمية؛ كلما قلّ الخطأ `ϵi`، زاد `αi` (يعني صوته أقوى).

ثم بنحدّث أوزان كل بيانة تدريب `wj`:
- لو `Mi` صنّفها **صح**: وزنها يقل (`×e^(-αi)`) — لأنها بقت "سهلة" ومش محتاجة تركيز زيادة.
- لو `Mi` صنّفها **غلط**: وزنها يزيد (`×e^(αi)`) — عشان المصنّف التالي يركّز عليها أكتر.

في النهاية، بنقسم على معامل تطبيع `Zi` عشان مجموع الأوزان الجديدة يفضل = 1 (يعني تبقى توزيع احتمالي صحيح).

للتصنيف النهائي: كل مصنّف `Mi` بيصوّت بوزنه `αi`، والفئة اللي بتاخد أكبر مجموع أوزان تصويت هي الفائزة.

#### 📐 المعادلة: وزن تصويت المصنّف (Classifier Weight)

$$
\alpha_i = \frac{1}{2} \ln\left(\frac{1-\epsilon_i}{\epsilon_i}\right)
$$

**الشرح:**
> - `ϵi`: معدل خطأ المصنّف `Mi`
> - كلما اقترب `ϵi` من الصفر، تكبر `αi` بشدة (صوت قوي جدًا)
> - كلما اقترب `ϵi` من 0.5، تقترب `αi` من الصفر (صوت ضعيف جدًا)
> - إذا `ϵi > 0.5` تصبح `αi` سالبة، لذلك نرفض هذه الحالة كليًا (كما في الخطوة السابقة)

#### 📐 المعادلة: تحديث أوزان البيانات

$$
w_j^{(i+1)} = \frac{w_j^{(i)}}{Z_i} \times \begin{cases} e^{-\alpha_i} & \text{إذا صُنِّفت } X_j \text{ صح بواسطة } M_i \\ e^{\alpha_i} & \text{إذا صُنِّفت } X_j \text{ خطأ بواسطة } M_i \end{cases}
$$

**الشرح:**
> - `Zi`: معامل التطبيع (normalization factor) يضمن أن مجموع كل الأوزان الجديدة = 1
> - `e^(-αi)`: عامل تقليل (أقل من 1) يُطبَّق على البيانات الصحيحة
> - `e^(αi)`: عامل تكبير (أكبر من 1) يُطبَّق على البيانات المُخطأ فيها

#### ⚙️ الخطوات / الخوارزمية: AdaBoost الكاملة
> الهدف: بناء k مصنفات متسلسلة، كل واحد يركز أكثر على أخطاء سابقه، ثم دمجها بتصويت موزون.
```algorithm
1 | تهيئة الأوزان | Init | wj = 1/d لكل البيانات الـ d
2 | حلقة i=1 إلى k | Boosting Loop | لكل جولة: أخذ عينة Di حسب أوزان W (سحب مع إرجاع)
3 | بناء نموذج | Model Building | تدريب Mi على Di
4 | تقييم على D كاملة | Evaluation | تطبيق Mi على كل بيانات D الأصلية
5 | حساب معدل الخطأ | Error Calculation | حساب ϵi = مجموع أوزان البيانات المُخطأ فيها
6 | فحص شرط القبول | Validation Check | إذا ϵi > 0.5 أعد الأوزان للحالة الأصلية وكرر من الخطوة 2
7 | حساب وزن التصويت | Alpha Calculation | αi = 0.5 × ln((1-ϵi)/ϵi)
8 | تحديث أوزان البيانات | Weight Update | تقليل وزن الصحيح، وتكبير وزن الخاطئ، ثم التطبيع بـ Zi
9 | التصنيف النهائي | Weighted Voting | M*(x) = argmax لأكبر مجموع αi لكل فئة
```
#### نقاط التنفيذ:
- التحقق من `ϵi > 0.5` **إلزامي** قبل قبول أي مصنّف — تجاهله خطأ شائع.
- التحديث في الخطوة 8 يجب أن يتم **بعد** حساب `αi` مباشرة، وليس قبله.

#### 🔍 تتبع التنفيذ: مثال AdaBoost (10 عينات، 2 فئة)

**المدخل:** 10 عينات (5 دوائر حمراء، 5 مربعات زرقاء)، الأوزان الابتدائية `wi = 0.1` لكل عينة.

| الجولة | معدل الخطأ ϵ | وزن التصويت α | ملاحظة |
| --- | --- | --- | --- |
| h1 | 0.3 (3 دوائر حمراء أُخطئ فيها) | 0.42 | كل المربعات صُنِّفت صح |
| h2 | 0.21 (3 مربعات أُخطئ فيها) | 0.65 | كل الدوائر صُنِّفت صح |
| h3 | 0.192 (خليط: مربعان + دائرة) | 0.718 | آخر جولة في المثال |

**النتيجة:** المصنّف النهائي `H_final = sign(0.42·h1 + 0.65·h2 + 0.718·h3)` — أي دمج موزون لتوقعات الجولات الثلاث حسب أوزان تصويتها، مما ينتج حد فصل نهائي أدق من أي `hi` بمفرده.

#### مهم للامتحان ⚠️:
> لاحظ نمط الحساب في المثال: `ϵi` = مجموع أوزان العينات المُخطأ فيها فقط (وليس عددها)، ولاحظ أن الأوزان تُعاد حسابها وتُطبَّع (`normalize`) بعد كل جولة بحيث يبقى مجموعها 1.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا في مثال AdaBoost، عينات معينة أُعطيت وزن 0.166 بينما أخرى 0.070 بعد الجولة الأولى؟
> **لماذا هذا مهم؟** لأن هذا التمايز في الأوزان هو جوهر آلية "الانتباه التكيفي" التي تميز `AdaBoost` عن `Bagging` (اللي كل عيناته متساوية الاحتمال دائمًا).

---

### 7. Random Forests

#### النص الأصلي يقول:
> "Each classifier in the ensemble is a decision tree classifier. During classification, each tree votes and the most popular class is returned. Two Methods to construct Random Forest: Forest-RI (random input selection)... Forest-RC (random linear combinations)... Comparable in accuracy to Adaboost, but more robust to errors and outliers, faster than bagging or boosting."

#### الشرح المبسّط:
`Random Forest` هو حالة خاصة من `Ensemble` حيث كل مصنّف أساسي هو **شجرة قرار** (`Decision Tree`). الفكرة الأساسية: بنولّد عينات `bootstrap` من بيانات التدريب (زي `Bagging` بالظبط)، لكن الإضافة المهمة إن **عند كل عقدة تفرّع (`node`) في الشجرة**، بدل ما نختار أفضل خاصية من بين كل الخصائص المتاحة `M`، بنختار عشوائيًا مجموعة فرعية أصغر منها `F` (حيث `F < M`)، ومن هذه المجموعة الفرعية فقط نختار أفضل خاصية للتفرّع.

فيه طريقتان لبناء `Random Forest`:
- **`Forest-RI`** (اختيار مدخلات عشوائي): تختار عشوائيًا `F` خصائص عند كل عقدة كمرشحين للتفرّع.
- **`Forest-RC`** (توليفات خطية عشوائية): بدل اختيار خصائص موجودة، بتنشئ خصائص جديدة كتوليفة خطية من الخصائص الأصلية، وده بيقلل الارتباط بين الأشجار المختلفة أكتر.

**لماذا؟** لأن اختيار خصائص عشوائية مختلفة عند كل عقدة يجعل الأشجار الناتجة **مختلفة جدًا عن بعضها** (تحقيق شرط الاستقلالية مرة أخرى)، وهذا يجعل `Random Forest` مقاومًا جدًا للشذوذ (`outliers`) والأخطاء، وأيضًا أسرع من `Bagging` أو `Boosting` العاديين لأن اختيار عدد أقل من الخصائص عند كل عقدة يقلل زمن الحساب.

#### 💡 التشبيه:
> تخيل لجنة تحكيم مكوّنة من عدة قضاة (أشجار)، لكن كل قاضٍ بيحكم بناءً على مجموعة عشوائية مختلفة من الأدلة (خصائص) بدل ما يشوف كل الأدلة، وده بيخلي كل قاضٍ يحكم بمنظور مختلف تمامًا عن التاني.
> **وجه الشبه:** كل قاضٍ = شجرة قرار واحدة | الأدلة العشوائية المختارة = مجموعة الخصائص الفرعية `F`

#### ⚙️ الخطوات / الخوارزمية: Random Forest (Forest-RI)
> الهدف: بناء عدد كبير من أشجار القرار المتنوعة ودمج تصويتها.
```algorithm
1 | أخذ عينة bootstrap | Bootstrap Sampling | لكل شجرة: اختيار عينة عشوائية بحجم N من بيانات التدريب (مع الإرجاع)
2 | بناء الشجرة | Tree Growing | عند كل عقدة تفرّع: اختيار F خاصية عشوائيًا من أصل M (حيث F<M)
3 | اختيار أفضل تفرّع | Split Selection | اختيار أفضل خاصية للتفرّع من بين الـ F المختارة فقط (باستخدام CART مثلاً)
4 | تكرار البناء | Growth Completion | تنمو الشجرة لأقصى حجم ممكن دون تقليم (pruning) غالبًا
5 | تكرار العملية | Forest Building | تكرار الخطوات 1-4 لعدد كبير من الأشجار (مثلاً 500 شجرة)
6 | التصويت | Majority Voting | لتصنيف بيانة جديدة: كل شجرة تصوّت، وتُختار الفئة الأكثر تصويتًا
```
#### نقاط التنفيذ:
- اختيار `F` خاصية يتم **عند كل عقدة على حدة**، وليس مرة واحدة لكل الشجرة.
- عدم استخدام `pruning` عادة يجعل كل شجرة عميقة، لكن التنوع بين الأشجار يمنع الـ `overfitting` الإجمالي.

#### ⚖️ المقايضة: Random Forest مقابل Bagging/Boosting

| | Random Forest | Bagging العادي (بأي مصنّف) |
| --- | --- | --- |
| المزايا | أسرع، مقاوم جدًا للـ outliers، دقة مقاربة لـ AdaBoost | بسيط، لا يتطلب اختيار خصائص |
| العيوب | يعمل بشكل أساسي مع أشجار القرار | قد يكون أبطأ قليلًا وأقل تنوعًا بين المصنفات |
| متى تختاره | بيانات ذات عدد كبير من الخصائص (features) | بيانات بعدد خصائص محدود |

#### نقطة مهمة ⚠️:
> `Random Forest` يجمع بين فكرتين: `Bagging` (على مستوى البيانات/الصفوف) + اختيار عشوائي للخصائص (على مستوى الأعمدة) — وهذا الجمع هو ما يميزه عن `Bagging` العادي.

---

### 8. تطبيق عملي بـ scikit-learn

#### النص الأصلي يقول:
> "We consider 3 types of ensemble classifiers in this example: bagging, boosting, and random forest. In the example below, we fit 500 base classifiers to the 2-dimensional dataset using each ensemble method. The base classifier corresponds to a decision tree with maximum depth equals to 10"

#### الشرح المبسّط:
المحاضرة بتوضح تطبيقًا عمليًا باستخدام مكتبة `sklearn.ensemble` في `Python`. بيتم تدريب 500 مصنّف أساسي (كل واحد `DecisionTreeClassifier` بعمق أقصى 10) باستخدام ثلاث طرق: `RandomForestClassifier`، `BaggingClassifier`، و`AdaBoostClassifier`. بعد التدريب، بيتم حساب الدقة (`accuracy_score`) على بيانات التدريب والاختبار لكل طريقة، ثم رسمها في مخططات أعمدة (`bar charts`) للمقارنة.

**لماذا؟** عشان نشوف عمليًا الفرق في الأداء بين الطرق الثلاث على نفس البيانات، ونلاحظ ظاهرة مهمة: دقة التدريب (`train accuracy`) العالية جدًا (خصوصًا لـ Random Forest و AdaBoost القريبة من 1.0) لا تعني بالضرورة أفضل دقة اختبار (`test accuracy`) — وهذا مؤشر محتمل على `overfitting`.

#### 💻 الكود: بناء وتقييم Random Forest و Bagging

#### ما هذا الكود؟
> يبني مصنّفَي `Random Forest` و`Bagging` باستخدام 500 شجرة قرار أساسية، ويحسب دقة كل منهما على بيانات التدريب والاختبار.

```python
from sklearn import ensemble  # Import ensemble module for RandomForest, Bagging, AdaBoost
from sklearn.tree import DecisionTreeClassifier  # Import base classifier (decision tree)

numBaseClassifiers = 500  # Number of base classifiers (trees) in each ensemble
maxdepth = 10  # Maximum depth allowed for each decision tree
trainAcc = []  # List to store training accuracy for each ensemble method
testAcc = []  # List to store test accuracy for each ensemble method

clf = ensemble.RandomForestClassifier(n_estimators=numBaseClassifiers)  # Create Random Forest with 500 trees
clf.fit(X_train, Y_train)  # Train the Random Forest on training data
Y_predTrain = clf.predict(X_train)  # Predict labels for training data
Y_predTest = clf.predict(X_test)  # Predict labels for test data
trainAcc.append(accuracy_score(Y_train, Y_predTrain))  # Store training accuracy
testAcc.append(accuracy_score(Y_test, Y_predTest))  # Store test accuracy

clf = ensemble.BaggingClassifier(DecisionTreeClassifier(max_depth=maxdepth), n_estimators=numBaseClassifiers)  # Create Bagging with 500 decision trees
clf.fit(X_train, Y_train)  # Train the Bagging classifier
Y_predTrain = clf.predict(X_train)  # Predict labels for training data
Y_predTest = clf.predict(X_test)  # Predict labels for test data
trainAcc.append(accuracy_score(Y_train, Y_predTrain))  # Store training accuracy
testAcc.append(accuracy_score(Y_test, Y_predTest))  # Store test accuracy
```

#### شرح كل سطر:
1. `from sklearn import ensemble` → استيراد وحدة النماذج المُجمَّعة — لاستخدام `RandomForestClassifier`, `BaggingClassifier`, `AdaBoostClassifier`
2. `from sklearn.tree import DecisionTreeClassifier` → استيراد شجرة القرار — لاستخدامها كمصنّف أساسي داخل `BaggingClassifier`
3. `numBaseClassifiers = 500` → تحديد عدد المصنفات الأساسية — للتحكم في حجم الـ ensemble
4. `maxdepth = 10` → تحديد أقصى عمق للشجرة — للتحكم في تعقيد كل مصنّف أساسي ومنع الـ overfitting الفردي
5. `clf = ensemble.RandomForestClassifier(n_estimators=numBaseClassifiers)` → إنشاء نموذج Random Forest — بعدد الأشجار المحدد مسبقًا
6. `clf.fit(X_train, Y_train)` → تدريب النموذج — على بيانات التدريب المُعطاة
7. `Y_predTrain = clf.predict(X_train)` → التنبؤ على بيانات التدريب — لقياس دقة التدريب لاحقًا
8. `Y_predTest = clf.predict(X_test)` → التنبؤ على بيانات الاختبار — لقياس قدرة التعميم (generalization)
9. `trainAcc.append(accuracy_score(Y_train, Y_predTrain))` → حفظ دقة التدريب — لاستخدامها في الرسم البياني لاحقًا
10. `clf = ensemble.BaggingClassifier(DecisionTreeClassifier(max_depth=maxdepth), n_estimators=numBaseClassifiers)` → إنشاء Bagging — بمصنّف أساسي هو شجرة قرار بعمق محدد

**المكتبات المطلوبة (Imports):**
> `from sklearn import ensemble` | `from sklearn.tree import DecisionTreeClassifier` | `from sklearn.metrics import accuracy_score`

**الناتج المتوقع:**
> قائمتان `trainAcc` و`testAcc` تحتويان على قيم دقة عشرية (بين 0 و1) لكل طريقة ensemble، جاهزتان للرسم البياني للمقارنة.

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| `NameError: accuracy_score not defined` | نسيان استيراد الدالة | إضافة `from sklearn.metrics import accuracy_score` |
| دقة التدريب = 1.0 دائمًا مع Random Forest | عدم تحديد `max_depth` للأشجار الداخلية (تنمو بدون قيود) | تحديد `max_depth` أو استخدام تقييم عبر `cross-validation` |
| `BaggingClassifier` بدون تمرير مصنّف أساسي | استخدام الإعدادات الافتراضية فقط | تمرير `DecisionTreeClassifier(max_depth=...)` صراحة كما في المثال |

#### الدرس المستفاد:
> دقة تدريب مرتفعة جدًا (قريبة من 1.0) مع دقة اختبار أقل بكثير هي علامة كلاسيكية على `overfitting`؛ لهذا نقارن دائمًا بين `trainAcc` و`testAcc` وليس التدريب فقط.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Ensemble` | نموذج مركّب من عدة مصنفات أساسية لتحسين الدقة الإجمالية | `M*` في المخطط العام |
| `Base Classifier` | مصنّف فردي واحد يُدرَّب على جزء من البيانات | `M1, M2, ..., Mk` |
| `Bootstrap Sample` | عينة تُؤخذ من البيانات الأصلية بالسحب مع الإرجاع | يُستخدم في `Bagging` و`Random Forest` |
| `Bagging` | تجميع تنبؤات مصنفات مبنية على عينات bootstrap متساوية الوزن | تصويت بسيط (`equal weight`) |
| `Boosting` | بناء مصنفات متسلسلة، كل واحد يركز على أخطاء سابقه | تصويت موزون (`weighted voting`) |
| `AdaBoost` | خوارزمية Boosting تحدّث أوزان البيانات وأوزان تصويت المصنفات رياضيًا | `α = 0.5 × ln((1-ϵ)/ϵ)` |
| `Random Forest` | Ensemble من أشجار قرار، مع اختيار عشوائي للخصائص عند كل عقدة | `Forest-RI` و`Forest-RC` |
| `Voting` | تجميع تنبؤات المصنفات لاختيار الفئة الأكثر تكرارًا | مستخدم في `Bagging` و`Random Forest` |
| `Weighted Voting` | تصويت يعطي وزنًا مختلفًا لكل مصنّف حسب دقته | مستخدم في `AdaBoost` |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `D1...Dk` | مجموعات تدريب فرعية لكل مصنّف أساسي | تُشتق من `D` بطرق مختلفة حسب الخوارزمية |
| `wj` | وزن كل بيانة تدريب في AdaBoost | يتغير في كل جولة حسب نتيجة التصنيف |
| `ϵi` | معدل خطأ موزون للمصنّف `Mi` | يُستخدم لحساب `αi` |
| `αi` | وزن تصويت المصنّف `Mi` | كلما قلّ `ϵi` زاد `αi` |
| `F` | عدد الخصائص المُختارة عشوائيًا عند كل عقدة في Random Forest | `F < M` (إجمالي عدد الخصائص) |

### جداول مقارنات سريعة
| المقارنة | Bagging | Boosting/AdaBoost |
| --- | --- | --- |
| طريقة بناء العينات | bootstrap متساوي الاحتمال | bootstrap موزون بأوزان متغيرة |
| ترتيب البناء | متوازٍ (parallel) | متسلسل (sequential) |
| وزن التصويت | متساوٍ لكل المصنفات | متفاوت حسب `α` |
| مقاومة الـ overfitting | أعلى | أقل (خطر أكبر) |
| الدقة عمومًا | جيدة | أعلى غالبًا |

### قاموس المصطلحات
| الفئة | المصطلحات |
| --- | --- |
| البناء | `Bootstrap`, `Bootstrap Aggregation`, `Resampling`, `Sampling with Replacement` |
| التصويت | `Voting`, `Weighted Voting`, `Majority Vote`, `Combine Votes` |
| الخوارزميات | `Bagging`, `Boosting`, `AdaBoost`, `Random Forest`, `Forest-RI`, `Forest-RC` |
| المقاييس | `Error Rate (ϵ)`, `Classifier Weight (α)`, `Normalization Factor (Z)` |

### أبرز النقاط الذهبية
1. الشرطان الأساسيان لنجاح أي `Ensemble`: استقلالية المصنفات + كون كل مصنّف أفضل من التخمين العشوائي.
2. `Bagging` يقلل التباين (`variance`) وليس التحيّز (`bias`)، لذا هو مقاوم لـ `overfitting` من الضوضاء.
3. `AdaBoost` يجمع بين تحديث أوزان **البيانات** وأوزان **تصويت المصنفات** في نفس الخوارزمية.
4. شرط رفض المصنّف في AdaBoost هو `ϵi > 0.5` (أسوأ من التخمين العشوائي في مسألة ثنائية).
5. `Random Forest` = `Bagging` (على الصفوف) + اختيار عشوائي للخصائص (على الأعمدة).
6. `Random Forest` أسرع من `Bagging` و`Boosting` التقليديين رغم دقته المقاربة لـ `AdaBoost`.

### الأخطاء الشائعة عند الطلاب ⚠️
| الخطأ | التصحيح |
| --- | --- |
| الخلط بين `Bagging` و`Boosting` من ناحية التوازي/التسلسل | `Bagging` متوازٍ ومتساوي الوزن؛ `Boosting` متسلسل وموزون |
| نسيان شرط `ϵi > 0.5` في AdaBoost | يجب رفض أي مصنّف يحقق هذا الشرط وإعادة المحاولة |
| الاعتقاد أن Random Forest يستخدم كل الخصائص عند كل عقدة | يستخدم فقط مجموعة فرعية عشوائية `F < M` من الخصائص |
| الاعتقاد أن زيادة عدد المصنفات دائمًا تحسّن الدقة | يجب أولًا تحقق شرط الاستقلالية والأداء الأفضل من العشوائي |

---

### خطوات وإجراءات المحاضرة
> ملخص مرجعي سريع لكل الخوارزميات المشروحة أعلاه (راجع القسم الأول للتفاصيل الكاملة مع الشرح).

#### ⚙️ الخطوات / الخوارزمية: Bagging (ملخص)
> الهدف: بناء نماذج مستقلة من عينات bootstrap ودمجها بتصويت متساوٍ.
```algorithm
1 | أخذ عينة bootstrap | Sampling | لكل i: أخذ Di بحجم d من D بالسحب مع الإرجاع
2 | التدريب | Training | بناء Mi من Di
3 | التصويت | Voting | تجميع أصوات كل Mi بالتساوي واختيار الفئة الأكثر تصويتًا
```
#### نقاط التنفيذ:
- التوازي الكامل بين المصنفات يجعل التدريب أسرع على الأنظمة متعددة المعالجات.

[راجع الأقسام 5، 6.1، 7 أعلاه للخوارزميات الكاملة لـ Bagging وAdaBoost وRandom Forest بكل تفاصيلها ومعادلاتها]

---

### أنماط الأكواد والبنى المتكررة
| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| إنشاء ensemble في sklearn | `ensemble.XClassifier(base_estimator, n_estimators=N)` | عند بناء أي من Bagging/AdaBoost/RandomForest |
| قياس الدقة | `accuracy_score(Y_true, Y_pred)` | لمقارنة أداء التدريب والاختبار |
| تحديد المصنّف الأساسي | `DecisionTreeClassifier(max_depth=N)` | للتحكم في تعقيد كل مصنّف فردي داخل Ensemble |

### أنماط التعامل والسلوك
| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| المصنّف يحقق `ϵi > 0.5` في AdaBoost | إعادة تهيئة الأوزان وإعادة المحاولة | لأن مصنّفًا أسوأ من العشوائية يفسد التصويت الموزون |
| بيانات بها ضوضاء كثيرة | تفضيل `Bagging` أو `Random Forest` على `AdaBoost` | لتجنب تركيز `Boosting` المفرط على البيانات الشاذة |
| عدد خصائص كبير جدًا | تفضيل `Random Forest` | لتقليل الارتباط بين الأشجار وتسريع التدريب |

### الأفكار الرئيسية الشاملة
الفكرة المحورية في هذه المحاضرة هي أن **"التنوع + الاستقلالية" في المصنفات الأساسية** هو ما يصنع قوة أي نظام `Ensemble`، سواء تحقق هذا التنوع عبر تغيير عينة البيانات (`Bagging`)، أو عبر التركيز التكيّفي على الأخطاء (`Boosting`/`AdaBoost`)، أو عبر تقييد الخصائص المتاحة عشوائيًا عند كل قرار تفرّع (`Random Forest`). فهم هذا المبدأ الموحّد يسهّل ربط كل التفاصيل الرياضية والخوارزمية ببعضها.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% | سيناريو كود 30% | تطبيق 30% | تتبع خوارزميات 15%.

### السؤال 1 (medium)
ما الشرط الأول من الشرطين الضروريين لنجاح `Ensemble Classifier`؟
أ) أن تكون المصنفات متطابقة تمامًا  ب) أن تكون المصنفات مستقلة عن بعضها  ج) أن يكون عدد المصنفات فرديًا  د) أن تكون كل المصنفات من نفس النوع
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن استقلالية الأخطاء هي ما يقلل احتمال اتفاق أغلبية المصنفات على خطأ واحد. (أ) خاطئة لأن التطابق يبقي الخطأ كما هو (0.35 في المثال). (ج) خاطئة لأن الفردية ليست شرطًا مذكورًا في المحاضرة. (د) خاطئة لأن نوع المصنّف غير مرتبط بشرط الاستقلالية.

### السؤال 2 (medium)
في مثال المحاضرة (25 مصنّفًا مستقلًا، ϵ=0.35)، ما قيمة خطأ الـ Ensemble الناتجة؟
أ) 0.35  ب) 0.5  ج) 0.06  د) 0.13
**الإجابة الصحيحة: ج**
**التعليل:** (ج) صحيحة لأنها القيمة المحسوبة مباشرة بمعادلة `Binomial` في المحاضرة. (أ) هي خطأ المصنّف الواحد وليس المُجمَّع. (ب) قيمة عشوائية غير مذكورة. (د) هي عدد المصنفات المطلوب تجاوزه (13) وليست قيمة الخطأ.

### السؤال 3 (medium)
ماذا يعني مصطلح `bootstrap sample`؟
أ) عينة مأخوذة بدون إرجاع  ب) عينة مأخوذة بالسحب مع الإرجاع من البيانات الأصلية  ج) كل البيانات الأصلية دون تعديل  د) عينة مأخوذة فقط من البيانات المُخطأ فيها
**الإجابة الصحيحة: ب**
**التعليل:** (ب) هي التعريف الدقيق المذكور في شريحة Bagging. (أ) عكس التعريف الصحيح. (ج) لا يوجد تغيير فلا يعتبر bootstrap. (د) هذا وصف أقرب لآلية Boosting وليس تعريف bootstrap نفسه.

### السؤال 4 (hard)
سيناريو كود: بعد تشغيل `BaggingClassifier(DecisionTreeClassifier(max_depth=10), n_estimators=500)` وحساب `trainAcc` و`testAcc`، وُجد أن `trainAcc≈0.87` بينما `testAcc≈0.71`. ما التفسير الأنسب؟
أ) الكود به خطأ برمجي  ب) النموذج عانى من underfitting  ج) فجوة معقولة بين التدريب والاختبار قد تدل على بعض overfitting لكنها أقل حدة من Random Forest  د) يجب زيادة عدد المصنفات لحل المشكلة فورًا
**الإجابة الصحيحة: ج**
**التعليل:** (ج) صحيحة لأن الفجوة بين 0.87 و0.71 أصغر نسبيًا من فجوة Random Forest (1.0 مقابل ~0.67-0.68) في نفس المثال، فتدل على استقرار أفضل. (أ) لا يوجد خطأ في الكود بحد ذاته. (ب) الدقة 0.87 ليست منخفضة بما يكفي لتكون underfitting. (د) زيادة العدد وحدها لا تحل مشكلة الفجوة بين التدريب والاختبار بالضرورة.

### السؤال 5 (medium)
في `AdaBoost`، ماذا يحدث إذا كان `ϵi > 0.5`؟
أ) يُقبل المصنّف كما هو  ب) تُعاد الأوزان لحالتها الأصلية وتُعاد المحاولة  ج) يُصبح وزن التصويت `αi` موجبًا جدًا  د) تتوقف الخوارزمية كليًا
**الإجابة الصحيحة: ب**
**التعليل:** (ب) هي الخطوة المذكورة صراحة في الخوارزمية. (أ) خاطئة لأن المصنّف الأسوأ من العشوائي مرفوض. (ج) خاطئة لأن `αi` تصبح سالبة في هذه الحالة رياضيًا، وهذا سبب الرفض أصلًا. (د) لا يوجد توقف كلي، بل إعادة محاولة فقط.

### السؤال 6 (hard)
ما قيمة `αi` تقريبًا عند `ϵi = 0.21` (كما في مثال AdaBoost في المحاضرة)؟
أ) 0.42  ب) 0.65  ج) 0.718  د) 0.21
**الإجابة الصحيحة: ب**
**التعليل:** (ب) هي القيمة المحسوبة فعليًا في المحاضرة لـ `h2`. (أ) هي قيمة `α1` عند `ϵ1=0.3`. (ج) هي قيمة `α3` عند `ϵ3=0.192`. (د) هذه قيمة `ϵ` نفسها وليست `α`.

### السؤال 7 (medium)
ما الفرق الجوهري بين `Forest-RI` و`Forest-RC` في Random Forest؟
أ) `Forest-RI` يستخدم شبكات عصبية بينما `Forest-RC` يستخدم أشجار  ب) `Forest-RI` يختار خصائص موجودة عشوائيًا؛ `Forest-RC` ينشئ خصائص جديدة كتوليفة خطية  ج) `Forest-RC` لا يستخدم bootstrap إطلاقًا  د) لا يوجد فرق حقيقي بينهما
**الإجابة الصحيحة: ب**
**التعليل:** (ب) هو التعريف الدقيق من المحاضرة. (أ) خاطئة، كلاهما يستخدم أشجار قرار. (ج) غير مذكور في المحاضرة وغير صحيح. (د) خاطئة لوجود فرق واضح ومحدد.

### السؤال 8 (medium)
أي العبارات التالية صحيحة بخصوص `Bagging`؟
أ) يعطي كل مصنّف وزن تصويت مختلف  ب) يعطي كل مصنّف نفس وزن التصويت  ج) يبني المصنفات بشكل متسلسل  د) يركز على البيانات المُخطأ فيها فقط
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة مباشرة من نص المحاضرة "equally weighted prediction". (أ) هذا وصف Boosting وليس Bagging. (ج) خاطئة لأن Bagging متوازٍ. (د) هذا وصف Boosting.

### السؤال 9 (hard)
سيناريو تتبع: في مثال Bagging على بيانات `x` (0.1 إلى 1.0)، عند x=0.4 كان مجموع أصوات الجولات العشر = -6. ما التصنيف النهائي المتوقع؟
أ) 1  ب) -1  ج) 0  د) غير محدد
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن إشارة (`Sign`) المجموع السالب هي -1، وهذا يطابق الجدول الفعلي في المحاضرة. (أ) عكس الإشارة الصحيحة. (ج) الصفر غير وارد في نظام تصنيف ثنائي {1,-1}. (د) القيمة محددة بوضوح من المجموع.

### السؤال 10 (medium)
ما الطريقة الرابعة (من أصل 4) لبناء تنوع في مصنفات Ensemble المذكورة في المحاضرة؟
أ) التلاعب بمجموعة التدريب  ب) التلاعب بالخصائص  ج) التلاعب بخوارزمية التعلّم نفسها  د) التلاعب بحجم البيانات
**الإجابة الصحيحة: ج**
**التعليل:** (ج) هي الطريقة الرابعة المذكورة بالنص (مثال: الشبكات العصبية بتغيير الطوبولوجيا أو الأوزان الابتدائية). (أ) و(ب) هما الطريقتان الأولى والثانية. (د) غير مذكورة كطريقة مستقلة في المحاضرة.

### السؤال 11 (hard)
سيناريو كود: عند استخدام `ensemble.AdaBoostClassifier(DecisionTreeClassifier(max_depth=maxdepth), n_estimators=numBaseClassifiers)` مقارنة بـ `RandomForestClassifier`، ماذا نلاحظ عادة في `testAcc` بناءً على نتائج المحاضرة (الرسم البياني)؟
أ) AdaBoost يتفوق دائمًا بفارق كبير  ب) القيم متقاربة نسبيًا بين الطرق الثلاث (~0.67-0.71)  ج) AdaBoost يحصل على دقة اختبار = 1.0 دائمًا  د) Random Forest يفشل تمامًا في هذا المثال
**الإجابة الصحيحة: ب**
**التعليل:** (ب) تعكس فعليًا القيم التقريبية الظاهرة في الرسم البياني للمحاضرة (Random Forest ~0.68، Bagging ~0.71، AdaBoost ~0.67). (أ) و(ج) مبالغة غير مدعومة بالبيانات المعروضة. (د) غير صحيحة لأن قيمته قريبة من الطرق الأخرى وليست فاشلة.

### السؤال 12 (medium)
ما وظيفة معامل التطبيع `Zi` في خوارزمية AdaBoost؟
أ) زيادة دقة المصنّف مباشرة  ب) ضمان أن مجموع الأوزان الجديدة للبيانات يساوي 1  ج) حساب معدل الخطأ `ϵi`  د) تحديد عدد الجولات
**الإجابة الصحيحة: ب**
**التعليل:** (ب) هي الوظيفة المنصوص عليها صراحة. (أ) لا علاقة مباشرة بالدقة. (ج) يُحسب `ϵi` بشكل منفصل قبل حساب `Zi`. (د) عدد الجولات `k` يُحدَّد كمُدخل مسبق للخوارزمية.

### السؤال 13 (hard)
سيناريو كود: مصنّف `Mi` صنّف بيانة `Xj` بشكل صحيح، ووزنها الحالي `wj=0.1`، ووزن تصويت المصنّف `αi=0.42`. ما القيمة (غير المطبَّعة) للوزن الجديد لهذه البيانة؟
أ) `0.1 × e^0.42 ≈ 0.152`  ب) `0.1 × e^(-0.42) ≈ 0.066`  ج) `0.1 + 0.42 = 0.52`  د) `0.1 - 0.42 = -0.32`
**الإجابة الصحيحة: ب**
**التعليل:** (ب) صحيحة لأن البيانة صُنِّفت صح فتُضرب في `e^(-αi)` كما في معادلة التحديث والمثال العددي بالمحاضرة. (أ) هي الصيغة الخاصة بالبيانات المُخطأ فيها (عكس الحالة هنا). (ج) و(د) عمليات جمع/طرح غير موجودة في المعادلة الأصلية (التي تعتمد على الضرب الأسي).

### السؤال 14 (medium)
أي مما يلي هو المصنّف الأساسي المستخدم في `Random Forest` حصرًا حسب المحاضرة؟
أ) `Naive Bayes`  ب) `Decision Tree`  ج) `kNN`  د) `Neural Network`
**الإجابة الصحيحة: ب**
**التعليل:** (ب) مذكورة صراحة: "Each classifier in the ensemble is a decision tree classifier". باقي الخيارات (أ، ج، د) مصنفات صالحة لأنواع Ensemble أخرى لكنها ليست ما يُعرّف Random Forest تحديدًا.

### السؤال 15 (hard)
مقارنة: ما وجه الشبه المشترك بين `Bagging` و`Random Forest` من حيث بناء البيانات؟
أ) كلاهما يستخدم bootstrap sampling على مستوى الصفوف  ب) كلاهما لا يستخدم أي عينات عشوائية  ج) كلاهما يعتمد فقط على تعديل تسميات الفئات  د) كلاهما يستخدم شبكات عصبية كمصنّف أساسي
**الإجابة الصحيحة: أ**
**التعليل:** (أ) صحيحة لأن كليهما يستخدمان `bootstrap sample` من الصفوف؛ الفرق أن Random Forest يضيف عشوائية إضافية على مستوى الخصائص. (ب) عكس الحقيقة تمامًا. (ج) هذا وصف طريقة "manipulating class labels" وليس Bagging/RF. (د) غير صحيحة إطلاقًا حسب المحاضرة.

### السؤال 16 (medium)
ما العبارة الصحيحة بخصوص تطبيق `Bagging` على مسائل التنبؤ بقيم مستمرة (`continuous values`)؟
أ) غير ممكن إطلاقًا  ب) يُستخدم متوسط القيم بدل التصويت  ج) يُستخدم فقط أعلى قيمة  د) يُحوَّل تلقائيًا لمسألة تصنيف
**الإجابة الصحيحة: ب**
**التعليل:** (ب) منصوص عليها صراحة: "taking the average value of each prediction". (أ) خاطئة لأن المحاضرة تذكر إمكانية التطبيق. (ج) لا يوجد ذكر لاختيار "أعلى قيمة". (د) لا تحويل تلقائي مذكور؛ الطريقة تبقى تنبؤية مستمرة بأخذ المتوسط.

---

## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: منطقية، سوء فهم، فحص إرجاع، dead code.

### سؤال تصحيح 1 (logic)

**الكود التالي يحتوي خطأ:**
```python
import numpy as np

def compute_alpha(error_rate):
    # Compute classifier vote weight in AdaBoost
    alpha = 0.5 * np.log(error_rate / (1 - error_rate))  # formula reversed
    return alpha
```
**اكتشف الخطأ:** الصيغة الصحيحة لـ `α` هي `0.5 × ln((1-ϵ)/ϵ)`، لكن الكود يحسب `0.5 × ln(ϵ/(1-ϵ))` وهو معكوس تمامًا، مما يجعل `α` سالبة عندما يجب أن تكون موجبة (والعكس).

**التصحيح:**
```python
import numpy as np

def compute_alpha(error_rate):
    # Compute classifier vote weight in AdaBoost
    alpha = 0.5 * np.log((1 - error_rate) / error_rate)  # correct formula: (1-eps)/eps
    return alpha
```
**شرح الحل:**
1. المعادلة الصحيحة من المحاضرة هي `αi = 0.5 × ln((1-ϵi)/ϵi)` وليس العكس.
2. عكس الترتيب يقلب إشارة `α`، فيعطي وزن تصويت سالب لمصنّف جيد (ϵ صغير)، وهذا خطأ منطقي جسيم.
3. يجب دائمًا التأكد أن البسط هو `(1-ϵ)` والمقام هو `ϵ` حتى تكون `α` موجبة عندما `ϵ < 0.5`.

---

### سؤال تصحيح 2 (misconception)

**الكود التالي يحتوي خطأ:**
```python
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier

# Intended: give equal weight to each base classifier's vote
clf = BaggingClassifier(DecisionTreeClassifier(), n_estimators=100)
clf.fit(X_train, Y_train)
weights = clf.estimator_weights_  # trying to access non-existent weighted voting
```
**اكتشف الخطأ:** هذا سوء فهم مفاهيمي (`misconception`): `BaggingClassifier` لا يملك خاصية `estimator_weights_` لأن `Bagging` أصلاً يعطي **وزنًا متساويًا** لكل مصنّف (كما ذُكر صراحة في المحاضرة)، وخاصية الأوزان الموزونة توجد فقط في خوارزميات `Boosting` مثل `AdaBoostClassifier`.

**التصحيح:**
```python
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier

# Bagging gives equal weight to each classifier - no weights attribute needed
clf = BaggingClassifier(DecisionTreeClassifier(), n_estimators=100)
clf.fit(X_train, Y_train)
# All base classifiers contribute equally to the majority vote (no weights to extract)
predictions = clf.predict(X_test)
```
**شرح الحل:**
1. `Bagging` بطبيعته تصويت متساوٍ (`equally weighted prediction`)، فلا حاجة أصلًا لأوزان فردية.
2. محاولة الوصول لـ `estimator_weights_` من `BaggingClassifier` تعكس خلطًا بين مفهومي `Bagging` و`Boosting`.
3. لو أردنا أوزانًا فعلية للتصويت، يجب استخدام `AdaBoostClassifier` الذي يملك `estimator_weights_` بالفعل.

---

### سؤال تصحيح 3 (return_check)

**الكود التالي يحتوي خطأ:**
```python
def check_classifier_validity(error_rate):
    # Should return False if classifier is worse than random guessing
    if error_rate > 0.5:
        print("Classifier rejected, resample and retry")
    # missing return statement here
```
**اكتشف الخطأ:** هذا خطأ `return_check`: الدالة تطبع رسالة عند الرفض لكنها **لا ترجع أي قيمة** (`return`) في أي من الحالتين (سواء قُبل المصنّف أو رُفض)، مما يجعل استدعاءها في شرط `if` لاحق دائمًا يعطي `None` (وهي قيمة falsy لكنها مضللة منطقيًا).

**التصحيح:**
```python
def check_classifier_validity(error_rate):
    # Returns False if classifier is worse than random guessing, True otherwise
    if error_rate > 0.5:
        print("Classifier rejected, resample and retry")
        return False
    return True
```
**شرح الحل:**
1. أي دالة تحقق (`validity check`) يجب أن تُرجع قيمة منطقية واضحة (`True`/`False`) وليس فقط تطبع رسالة.
2. غياب `return` يجعل الدالة تُرجع `None` ضمنيًا، وهو ما قد يُفهم خطأً كـ "قبول" في بعض السياقات البرمجية.
3. إضافة `return False` عند الرفض و`return True` عند القبول يجعل سلوك الدالة متوقعًا وقابلًا للاستخدام في شروط لاحقة (مثل حلقة `while` لإعادة المحاولة).

---

### سؤال تصحيح 4 (dead_code)

**الكود التالي يحتوي خطأ:**
```python
def update_weight(w_j, alpha_i, correctly_classified):
    import math
    z_i = 1.0  # normalization factor placeholder, never actually computed
    if correctly_classified:
        new_w = w_j * math.exp(-alpha_i)
    else:
        new_w = w_j * math.exp(alpha_i)
    normalized_w = new_w  # dead code: division by z_i never happens
    return new_w  # returns unnormalized weight, z_i variable unused (dead code)
```
**اكتشف الخطأ:** هذا خطأ `dead_code`: المتغير `z_i` والسطر `normalized_w = new_w` بلا فائدة فعلية — `z_i` أبدًا لا يُحسب بشكل صحيح (ثابت = 1.0) ولا يُستخدم في القسمة الفعلية، والدالة تُرجع الوزن **غير المطبَّع** رغم أن المعادلة الأصلية في المحاضرة تتطلب القسمة على `Zi`.

**التصحيح:**
```python
def update_weight(w_j, alpha_i, correctly_classified, z_i):
    import math
    if correctly_classified:
        new_w = w_j * math.exp(-alpha_i)
    else:
        new_w = w_j * math.exp(alpha_i)
    normalized_w = new_w / z_i  # actual normalization using the real Zi value
    return normalized_w  # return the properly normalized weight
```
**شرح الحل:**
1. `Zi` يجب أن يُحسب فعليًا كمجموع كل الأوزان الجديدة قبل التطبيع (خارج هذه الدالة، ثم يُمرَّر إليها).
2. أي كود يُنشئ متغيرًا (`z_i = 1.0`) دون استخدامه الفعلي في الحساب هو `dead code` يجب حذفه أو تفعيله.
3. القسمة على `Zi` إلزامية حسب معادلة المحاضرة لضمان أن مجموع الأوزان الجديدة = 1؛ حذفها يكسر صحة الخوارزمية رياضيًا.

---

### سؤال تصحيح 5 (logic)

**الكود التالي يحتوي خطأ:**
```python
from sklearn.ensemble import RandomForestClassifier

# Intending to build a robust forest with 500 trees, unlimited depth for max accuracy
clf = RandomForestClassifier(n_estimators=500, max_depth=None)
clf.fit(X_train, Y_train)

train_acc = clf.score(X_train, Y_train)
test_acc = clf.score(X_test, Y_test)

if train_acc > test_acc:
    print("Model is perfect, no issue")  # logic error: misinterprets overfitting signal
```
**اكتشف الخطأ:** خطأ منطقي: عندما `train_acc > test_acc` (وخاصة بفارق كبير كما رأينا في مثال المحاضرة حيث Random Forest حقق train=1.0 مقابل test≈0.68)، هذا **مؤشر محتمل على overfitting** وليس دليلًا على أن "النموذج مثالي"؛ الرسالة المطبوعة تعكس فهمًا خاطئًا لمعنى الفجوة بين الدقتين.

**التصحيح:**
```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(n_estimators=500, max_depth=None)
clf.fit(X_train, Y_train)

train_acc = clf.score(X_train, Y_train)
test_acc = clf.score(X_test, Y_test)

gap = train_acc - test_acc
if gap > 0.15:  # threshold indicating a meaningful overfitting gap
    print(f"Warning: possible overfitting, gap = {gap:.2f}. Consider limiting max_depth.")
else:
    print(f"Train/test gap acceptable: {gap:.2f}")
```
**شرح الحل:**
1. فجوة كبيرة بين دقة التدريب والاختبار (مثل 1.0 مقابل 0.68 كما في مثال المحاضرة) هي علامة `overfitting` كلاسيكية، وليست دليل تفوّق.
2. الحل التصحيحي يقيس الفجوة رقميًا (`gap`) بدل إصدار حكم غير مبرَّر ("مثالي").
3. عمليًا، يُنصح بتحديد `max_depth` (كما فُعل في مثال Bagging بالمحاضرة حيث `maxdepth=10`) لتقليل هذه الفجوة.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1: احسب معدل خطأ Ensemble — metric_calculation

**السيناريو / المطلوب:**
لديك 9 مصنفات مستقلة، كل واحد معدل خطأه `ϵ=0.4`. المطلوب حساب احتمال خطأ الـ Ensemble (يخطئ إذا أخطأ 5 أو أكثر من أصل 9).

**المطلوب:**
1. اكتب المعادلة العامة المطبقة على هذه الحالة.
2. احسب القيمة التقريبية.

**نموذج الحل:**
$$
e_{ensemble} = \sum_{i=5}^{9} \binom{9}{i} (0.4)^i (0.6)^{9-i} \approx 0.267
$$
هذه القيمة (≈0.267) أقل من خطأ المصنّف الواحد (0.4)، لكنها ليست منخفضة جدًا لأن `ϵ=0.4` قريب نسبيًا من حد 0.5، مما يوضح أن كفاءة الـ Ensemble تتراجع كلما اقترب أداء المصنفات الأساسية من التخمين العشوائي.

---

### تمرين 2: أكمل كود AdaBoost الناقص — fill_gaps

**السيناريو / المطلوب:**
الكود التالي يحسب خطوة واحدة من AdaBoost لكنه ناقص.

**المطلوب:**
```python
import numpy as np

def adaboost_step(weights, predictions, true_labels):
    # weights: current tuple weights (array)
    # predictions: Mi's predictions for all D
    # true_labels: actual class labels
    errors = (predictions != true_labels).astype(int)  # 1 if misclassified, 0 otherwise
    epsilon_i = _______  # (1) compute weighted error rate
    if epsilon_i > 0.5:
        return None  # reject this classifier
    alpha_i = _______  # (2) compute classifier vote weight
    new_weights = weights * np.where(errors == 1, np.exp(alpha_i), np.exp(-alpha_i))
    z_i = new_weights.sum()  # (3) normalization factor
    new_weights = _______  # (4) normalize weights
    return alpha_i, new_weights
```

**نموذج الحل:**
```python
import numpy as np

def adaboost_step(weights, predictions, true_labels):
    errors = (predictions != true_labels).astype(int)
    epsilon_i = np.sum(weights * errors)  # (1) weighted sum of misclassified errors
    if epsilon_i > 0.5:
        return None
    alpha_i = 0.5 * np.log((1 - epsilon_i) / epsilon_i)  # (2) AdaBoost alpha formula
    new_weights = weights * np.where(errors == 1, np.exp(alpha_i), np.exp(-alpha_i))
    z_i = new_weights.sum()
    new_weights = new_weights / z_i  # (4) normalize so weights sum to 1
    return alpha_i, new_weights
```

---

### تمرين 3: صحّح كود Random Forest — code_fix

**السيناريو / المطلوب:**
الكود التالي يحاول بناء Random Forest لكنه يستخدم كل الخصائص عند كل عقدة (خطأ مفاهيمي).

**المطلوب:**
```python
from sklearn.tree import DecisionTreeClassifier

# Wrong: using all features at each split defeats the purpose of Random Forest
tree = DecisionTreeClassifier(max_features=None)  # bug: should limit features randomly
```

**نموذج الحل:**
```python
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Correct: limit the number of features considered at each split (Forest-RI style)
num_total_features = X_train.shape[1]
F = int(np.sqrt(num_total_features))  # common heuristic: F = sqrt(M)
tree = DecisionTreeClassifier(max_features=F)  # randomly restricts candidate features per split
```
الشرح: استخدام `max_features=None` يجعل الشجرة تختار من بين كل الخصائص دائمًا، وهذا يلغي مبدأ `Forest-RI` الذي يعتمد على تقييد الخصائص المرشحة عشوائيًا (`F < M`) عند كل عقدة لتقليل الارتباط بين الأشجار.

---

### تمرين 4: سيناريو — اختيار طريقة Ensemble المناسبة

**السيناريو / المطلوب:**
لديك بيانات طبية تحتوي على نسبة كبيرة من القياسات الشاذة (`outliers`) بسبب أخطاء أجهزة القياس، وعدد الخصائص كبير جدًا (500 خاصية).

**المطلوب:**
1. اختر بين `Bagging`، `AdaBoost`، `Random Forest` مع التبرير.
2. اذكر إعداد واحد على الأقل تستخدمه لضبط النموذج.

**نموذج الحل:**
الاختيار الأنسب هو `Random Forest`؛ لأنه (1) مقاوم جدًا للـ `outliers` (كما ذُكر صراحة في المحاضرة)، و(2) يتعامل بكفاءة مع عدد كبير من الخصائص عبر اختيار عشوائي فرعي `F` منها عند كل عقدة، بعكس `AdaBoost` الذي يخاطر بالتركيز المفرط على البيانات الشاذة (`overfitting` للضوضاء). إعداد مقترح: `max_features='sqrt'` لتحديد `F ≈ √500 ≈ 22` خاصية لكل تفرّع.

---

### تمرين 5: حساب Confusion Matrix وF1 لمخرجات Ensemble — metric_calculation

**السيناريو / المطلوب:**
مصنّف `Ensemble` طبّق على 20 بيانة اختبار، ونتج: `TP=8`, `FP=2`, `FN=3`, `TN=7`.

**المطلوب:**
1. احسب `Precision` و`Recall`.
2. احسب `F1-score`.

**نموذج الحل:**
$$
Precision = \frac{TP}{TP+FP} = \frac{8}{10} = 0.8, \quad Recall = \frac{TP}{TP+FN} = \frac{8}{11} \approx 0.727
$$
$$
F1 = 2 \times \frac{Precision \times Recall}{Precision + Recall} = 2 \times \frac{0.8 \times 0.727}{0.8+0.727} \approx 0.762
$$

---

### تمرين 6: تطبيق model_apply — تتبع Bagging يدويًا

**السيناريو / المطلوب:**
بيانات: `x = [1,2,3,4,5]`, `y = [1,1,-1,-1,1]`. طبّق 3 جولات bagging (بيانات مُعطاة جاهزة أدناه) واحسب التصنيف المُجمَّع.

**المطلوب:**
```
Round 1: عينة = [1,1,2,4,5] → y=[1,1,1,-1,1] → قاعدة: x≤2→1، x>2→-1
Round 2: عينة = [1,3,3,4,5] → y=[1,-1,-1,-1,1] → قاعدة: x≤1→1، x>1 و x<5→-1، x=5→1
Round 3: عينة = [2,2,3,4,5] → y=[1,1,-1,-1,1] → قاعدة: x≤2→1، x>2→-1
```
1. طبّق كل قاعدة على النقاط الأصلية (1،2،3،4،5).
2. اجمع الأصوات وحدد التصنيف النهائي.

**نموذج الحل:**
| x | Round1 | Round2 | Round3 | المجموع | التصنيف النهائي |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 3 | 1 |
| 2 | 1 | -1 | 1 | 1 | 1 |
| 3 | -1 | -1 | -1 | -3 | -1 |
| 4 | -1 | -1 | -1 | -3 | -1 |
| 5 | 1 | 1 | 1 | 3 | 1 |

التصنيف النهائي المُجمَّع طابق التسميات الحقيقية الأصلية بالكامل، رغم أن كل قاعدة فردية لم تكن مثالية بمفردها على كل النقاط.

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 1: case_study

**السيناريو:**
شركة تأمين تريد بناء نموذج للكشف عن حالات احتيال (`fraud`) نادرة جدًا (2% فقط من الحالات احتيال). البيانات نظيفة نسبيًا لكن الفئات غير متوازنة (`imbalanced`).

**المطلوب:**
1. هل تختار `Bagging` أم `Boosting`؟ برر إجابتك بالربط مع خصائص كل طريقة من المحاضرة.
2. اقترح تعديلًا على آلية الأوزان الابتدائية في `AdaBoost` لمعالجة عدم التوازن.

**نموذج الحل:**
`Boosting`/`AdaBoost` أنسب هنا لأن دقته العالية مطلوبة والبيانات نظيفة (خطر الـ overfitting من الضوضاء أقل واردًا). يمكن تعديل الأوزان الابتدائية `wj` بحيث تُعطى حالات الاحتيال (الفئة الأقلية) وزنًا ابتدائيًا أعلى من `1/d` بدل التوزيع المتساوي، لضمان أن الخوارزمية تعطي اهتمامًا كافيًا لهذه الفئة النادرة منذ الجولة الأولى.

---

### تمرين 2: table_fill (Confusion Matrix)

**السيناريو:**
جدول `Confusion Matrix` ناقص لمصنّف `Random Forest` على 100 بيانة اختبار:

| | متوقع: موجب | متوقع: سالب |
| --- | --- | --- |
| **فعلي: موجب** | 45 | ؟ |
| **فعلي: سالب** | ؟ | 40 |

المعلومة الإضافية: إجمالي الحالات الموجبة فعليًا = 50، وإجمالي الحالات السالبة فعليًا = 50.

**المطلوب:**
1. أكمل الخانتين الناقصتين (`FN` و`FP`).
2. احسب `Accuracy`.

**نموذج الحل:**
`FN = 50 - 45 = 5` (حالات موجبة فعليًا لكن صُنِّفت سالبة). `FP = 50 - 40 = 10` (حالات سالبة فعليًا لكن صُنِّفت موجبة).
$$
Accuracy = \frac{TP+TN}{Total} = \frac{45+40}{100} = 0.85
$$

---

### تمرين 3: written_analysis

**السيناريو:**
اشرح كتابيًا (3-5 جمل) لماذا يُعتبر `Random Forest` "أسرع" من `Bagging` أو `Boosting` العاديين رغم أنه أيضًا يستخدم `bootstrap sampling` مثل `Bagging`.

**المطلوب:**
1. اربط إجابتك بمفهوم `F < M` المذكور في المحاضرة.

**نموذج الحل:**
السرعة الإضافية في `Random Forest` مصدرها تحديدًا اختيار عدد أقل من الخصائص (`F` بدل `M` الكاملة) عند كل عقدة تفرّع، مما يقلل عدد المقارنات الحسابية اللازمة لإيجاد أفضل تفرّع في كل خطوة بناء الشجرة. بينما `Bagging` العادي (مع مصنّف غير شجري مثلًا) قد يفحص كل الخصائص المتاحة عند كل قرار، فيستغرق وقتًا أطول. أما `Boosting`/`AdaBoost` فهو أبطأ إضافيًا بسبب طبيعته التسلسلية (لا يمكن تدريب المصنفات بالتوازي كما في `Bagging`/`Random Forest`).

---

### تمرين 4: diagram_completion (مخطط KDD/Ensemble pipeline)

**السيناريو:**
مخطط تدفق ناقص لعملية `AdaBoost` يحتاج إكمال العقدة الناقصة بين "حساب ϵi" و"التصنيف النهائي".

**المطلوب:**
1. اذكر العقدة الناقصة واسمها الصحيح.
2. اذكر الرابط (edge) الذي يصلها بالعقدة التالية.

**نموذج الحل:**
العقدة الناقصة هي "تحديث أوزان البيانات wj" (`Weight Update`)، وتقع بين "حساب αi" و"التصنيف النهائي (Weighted Voting)". الرابط: من `حساب αi` إلى `تحديث الأوزان` بتسمية "استخدام αi في معادلة التحديث"، ثم من `تحديث الأوزان` إلى بداية الجولة التالية (i+1) أو إلى `التصنيف النهائي` إذا كانت آخر جولة.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: حساب خطأ Ensemble لعدد فردي من المصنفات

**المدخل:**
```python
n_classifiers = 7
epsilon = 0.3  # error rate per independent base classifier
majority_threshold = 4  # need >= 4 wrong out of 7 for ensemble to fail
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار (i) | العملية | الحالة |
| --- | --- | --- |
| i=4 | حساب `C(7,4) × 0.3^4 × 0.7^3` | ؟ |
| i=5 | حساب `C(7,5) × 0.3^5 × 0.7^2` | ؟ |
| i=6 | حساب `C(7,6) × 0.3^6 × 0.7^1` | ؟ |
| i=7 | حساب `C(7,7) × 0.3^7 × 0.7^0` | ؟ |
| مجموع | جمع كل الحدود من i=4 إلى 7 | ؟ |

**نموذج الحل:**
| التكرار (i) | العملية | الحالة |
| --- | --- | --- |
| i=4 | 35 × 0.0081 × 0.343 ≈ 0.0972 | 0.0972 |
| i=5 | 21 × 0.00243 × 0.49 ≈ 0.025 | 0.025 |
| i=6 | 7 × 0.000729 × 0.7 ≈ 0.00357 | 0.00357 |
| i=7 | 1 × 0.0002187 × 1 ≈ 0.00022 | 0.00022 |
| مجموع | 0.0972+0.025+0.00357+0.00022 | ≈ 0.126 |

**النتيجة:** خطأ الـ Ensemble ≈ 0.126، أقل بكثير من خطأ المصنّف الواحد (0.3)، مما يؤكد فعالية التجميع حتى مع 7 مصنفات فقط.

---

### تمرين تتبع 2: apriori_iterations — غير منطبق (ملاحظة توضيحية)

> ملاحظة: هذا النوع من التمارين (`apriori_iterations`) خاص بمحاضرة `Association Rules` وليس بمحاضرة `Ensemble Methods` الحالية، لذا استُبدل بتمرين تتبع مكافئ من نفس فئة الخوارزميات التكرارية ذات الصلة بالمحاضرة الحالية:

### تمرين تتبع 2 (بديل): kmeans_centroid_updates — غير منطبق أيضًا، استبدال بتتبع AdaBoost لجولتين إضافيتين

**المدخل:**
```python
weights_round3 = {"A": 0.097, "B": 0.097, "C": 0.152, "D": 0.064}
alpha_3 = 0.718
errors_round3 = {"A": 0, "B": 0, "C": 1, "D": 0}  # C misclassified
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| البيانة | العملية | الحالة |
| --- | --- | --- |
| A | `0.097 × e^(-0.718)` | ؟ |
| B | `0.097 × e^(-0.718)` | ؟ |
| C | `0.152 × e^(0.718)` | ؟ |
| D | `0.064 × e^(-0.718)` | ؟ |
| Zi | مجموع كل القيم أعلاه | ؟ |

**نموذج الحل:**
| البيانة | العملية | الحالة |
| --- | --- | --- |
| A | 0.097 × 0.488 ≈ 0.0473 | 0.0473 |
| B | 0.097 × 0.488 ≈ 0.0473 | 0.0473 |
| C | 0.152 × 2.050 ≈ 0.3116 | 0.3116 |
| D | 0.064 × 0.488 ≈ 0.0312 | 0.0312 |
| Zi | 0.0473+0.0473+0.3116+0.0312 | ≈ 0.4374 |

**النتيجة:** بعد القسمة على `Zi≈0.4374`، الوزن الجديد لـ C (المُخطأ فيها) ≈ 0.713 مقابل ≈0.108 لكل من A وB — يوضح كيف تتضخم أوزان البيانات الصعبة بشكل كبير جدًا عبر الجولات المتتالية.

---

### تمرين تتبع 3: decision_tree_split — اختيار نقطة الفصل في Bagging

**المدخل:**
```python
x_sample = [0.1, 0.1, 0.2, 0.4, 0.4, 0.5, 0.5, 0.7, 0.8, 0.9]
y_sample = [1, 1, 1, -1, -1, -1, -1, -1, 1, 1]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| نقطة الفصل المرشحة k | الفئة اليسرى (x≤k) | الفئة اليمنى (x>k) | خطأ تقريبي |
| --- | --- | --- | --- |
| 0.3 | ؟ | ؟ | ؟ |
| 0.75 | ؟ | ؟ | ؟ |

**نموذج الحل:**
| نقطة الفصل المرشحة k | الفئة اليسرى (x≤k) | الفئة اليمنى (x>k) | خطأ تقريبي |
| --- | --- | --- | --- |
| 0.3 | 1 (3 بيانات صحيحة من 3) | -1 (5 صحيحة، 2 خاطئة من 7: 0.8،0.9 هي 1) | 2/10 = 0.2 |
| 0.75 | -1 (يمثل الأغلبية في القسم اليسار بشكل خاطئ لبعض النقاط) | 1 | أعلى من 0.2 غالبًا |

**النتيجة:** نقطة الفصل `k=0.3` أفضل هنا لأنها تعطي أقل خطأ تصنيف (entropy أدنى)، وهذا يوضح كيف تُختار نقطة `k` في `decision stump` بما يطابق منهجية "تصغير الإنتروبيا" المذكورة في المحاضرة.

---

### تمرين تتبع 4: gradient_descent_steps — غير منطبق، استبدال بتتبع تحديث ϵ عبر الجولات في AdaBoost

**المدخل:**
```python
rounds_errors = [0.3, 0.21, 0.192]  # epsilon values across 3 AdaBoost rounds
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الجولة | ϵi | αi = 0.5×ln((1-ϵi)/ϵi) |
| --- | --- | --- |
| 1 | 0.3 | ؟ |
| 2 | 0.21 | ؟ |
| 3 | 0.192 | ؟ |

**نموذج الحل:**
| الجولة | ϵi | αi = 0.5×ln((1-ϵi)/ϵi) |
| --- | --- | --- |
| 1 | 0.3 | 0.5×ln(0.7/0.3)=0.5×ln(2.333)≈0.5×0.847≈0.42 |
| 2 | 0.21 | 0.5×ln(0.79/0.21)=0.5×ln(3.762)≈0.5×1.325≈0.65 |
| 3 | 0.192 | 0.5×ln(0.808/0.192)=0.5×ln(4.208)≈0.5×1.437≈0.718 |

**النتيجة:** كلما قلّ `ϵi` عبر الجولات (0.3→0.21→0.192)، ازداد `αi` (0.42→0.65→0.718)، مؤكدًا العلاقة العكسية بين معدل الخطأ ووزن التصويت.

---

### تمرين تتبع 5: تتبع بناء Random Forest عبر جولات Bootstrap

**المدخل:**
```python
M = 10  # total features
F_heuristic = "sqrt(M)"  # number of candidate features per split
n_trees = 3
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الشجرة | حجم عينة Bootstrap | عدد F المرشح لكل عقدة |
| --- | --- | --- |
| Tree 1 | N (نفس حجم D) | ؟ |
| Tree 2 | N (نفس حجم D) | ؟ |
| Tree 3 | N (نفس حجم D) | ؟ |

**نموذج الحل:**
| الشجرة | حجم عينة Bootstrap | عدد F المرشح لكل عقدة |
| --- | --- | --- |
| Tree 1 | N | F = √10 ≈ 3 |
| Tree 2 | N | F = √10 ≈ 3 |
| Tree 3 | N | F = √10 ≈ 3 |

**النتيجة:** رغم أن `F=3` ثابت لكل الأشجار، فإن **الخصائص الثلاث المُختارة عشوائيًا تختلف عند كل عقدة وفي كل شجرة**، مما يضمن تنوعًا كافيًا بين الأشجار الثلاث رغم تشابه حجم العينة الابتدائي.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### السؤال 1: {ما هو Ensemble Classifier؟}
**نموذج الإجابة:** 1. التعريف: نموذج مركّب (`M*`) يُبنى من دمج عدة مصنفات أساسية (`M1...Mk`) مُدرَّبة على مجموعات تدريب مختلفة (`D1...Dk`) مُشتقة من نفس البيانات الأصلية `D`. 2. المكونات/الشروط: يتطلب استقلالية المصنفات وأداءها الأفضل من العشوائية. 3. مثال رقمي: 25 مصنّفًا بخطأ 0.35 يعطي خطأ ensemble = 0.06 إذا كانت مستقلة. 4. متى نستخدم: عندما نريد تقليل خطأ التصنيف الإجمالي مقارنة بمصنّف واحد فقط.

---

### السؤال 2: {ما الفرق بين Bagging وBoosting من حيث ترتيب البناء؟}
**نموذج الإجابة:** 1. التعريف: `Bagging` يبني المصنفات بالتوازي (مستقلة عن بعضها)، بينما `Boosting` يبنيها بالتسلسل (كل واحد يعتمد على نتائج السابق). 2. المكونات: `Bagging` يستخدم أوزان بيانات ثابتة، `Boosting` يحدّث الأوزان بعد كل جولة. 3. مثال: في AdaBoost، وزن البيانة `wj` يتغير بعد كل مصنّف `Mi`. 4. متى نستخدم: `Bagging` مع بيانات ضوضائية، `Boosting` عندما نريد أقصى دقة على بيانات نظيفة نسبيًا.

---

### السؤال 3: {اشرح معنى bootstrap sample وأهميته}
**نموذج الإجابة:** 1. التعريف: عينة تُؤخذ من مجموعة البيانات الأصلية بالسحب مع الإرجاع (`with replacement`)، فبعض البيانات تتكرر وبعضها يُستبعد تمامًا. 2. المكونات: كل عينة بحجم `d` (نفس حجم الأصل). 3. مثال: من بيانات [0.1...1.0]، عينة bootstrap قد تحتوي [0.1,0.1,0.2,0.4,...] بتكرار بعض القيم. 4. متى نستخدم: أساس كل من `Bagging` و`Random Forest` لضمان تنوع المصنفات.

---

### السؤال 4: {ما هي الشروط الضرورية لنجاح Ensemble؟}
**نموذج الإجابة:** 1. التعريف: شرطان أساسيان مذكوران صراحة بالمحاضرة. 2. المكونات: (أ) استقلالية المصنفات عن بعضها (عدم ارتباط أخطائها)، (ب) أداء كل مصنّف أفضل من التخمين العشوائي. 3. مثال: مصنفات متطابقة (غير مستقلة) تبقي الخطأ كما هو (0.35) رغم كثرة عددها. 4. متى نستخدم: عند تصميم أي نظام Ensemble يجب التأكد من تحقق الشرطين وإلا فلا فائدة من التجميع.

---

### السؤال 5: {اشرح دور α (alpha) في AdaBoost}
**نموذج الإجابة:** 1. التعريف: `α` هو وزن تصويت كل مصنّف في النموذج النهائي المُجمَّع، يُحسب بمعادلة `0.5×ln((1-ϵ)/ϵ)`. 2. المكونات: يعتمد فقط على معدل خطأ المصنّف `ϵi`. 3. مثال: عند `ϵ=0.21` نحصل على `α≈0.65`. 4. متى نستخدم: لضمان أن المصنفات الأدق تملك تأثيرًا أكبر على القرار النهائي مقارنة بالمصنفات الأضعف.

---

### السؤال 6: {ما الفرق بين Forest-RI وForest-RC؟}
**نموذج الإجابة:** 1. التعريف: طريقتان لبناء تنوع في `Random Forest`. 2. المكونات: `Forest-RI` يختار عشوائيًا F خاصية موجودة فعليًا؛ `Forest-RC` ينشئ خصائص جديدة كتوليفة خطية من الخصائص الأصلية. 3. مثال: مع M=10 خصائص، `Forest-RI` قد يختار 3 منها مباشرة، بينما `Forest-RC` قد ينشئ خاصية جديدة = 0.5×feature1 + 0.3×feature4. 4. متى نستخدم: `Forest-RC` مفيد أكثر لتقليل الارتباط بين الأشجار عندما تكون الخصائص الأصلية مترابطة (correlated) فيما بينها.

---

### السؤال 7: {لماذا Random Forest أسرع من Bagging العادي؟}
**نموذج الإجابة:** 1. التعريف: كلاهما يستخدم bootstrap sampling، لكن Random Forest يضيف قيدًا إضافيًا. 2. المكونات: تقييد عدد الخصائص المرشحة (`F < M`) عند كل عقدة تفرّع يقلل عدد المقارنات الحسابية اللازمة. 3. مثال: مع 100 خاصية، اختيار 10 فقط (F=√100) لكل تفرّع أسرع من فحص كل الـ100. 4. متى يهم هذا: خصوصًا مع بيانات ذات عدد ضخم من الخصائص (مثل النصوص أو الصور).

---

### السؤال 8: {ما معنى weighted error rate ϵi في AdaBoost؟}
**نموذج الإجابة:** 1. التعريف: مجموع أوزان البيانات التي أخطأ المصنّف `Mi` في تصنيفها (وليس عدد البيانات المُخطأ فيها فقط). 2. المكونات: `ϵi = Σ wj × err(Xj)`. 3. مثال: لو 3 بيانات كل واحدة وزنها 0.1 أُخطئ فيها، فـ `ϵi = 3×0.1 = 0.3`. 4. متى نستخدم: أساسي لحساب `αi` ولتحديد قبول أو رفض المصنّف (شرط ϵi≤0.5).

---

### السؤال 9: {قارن بين استخدام Bagging وBoosting لمشكلة تحتوي outliers كثيرة}
**نموذج الإجابة:** 1. التعريف: كلاهما ensemble لكن يتفاعلان مختلفًا مع البيانات الشاذة. 2. المكونات: `Bagging` يعالج كل البيانات بتساوي فيقلل تأثير أي عينة شاذة بمفردها؛ `Boosting` يزيد تدريجيًا وزن البيانات المُخطأ فيها وقد تكون هذه البيانات شاذة أصلًا فيتضخم تأثيرها. 3. مثال: بيانة شاذة تُخطأ فيها كل الجولات، ستتراكم أوزانها بشكل كبير في AdaBoost. 4. متى نستخدم: `Bagging` أو `Random Forest` أفضل مع outliers كثيرة؛ `Boosting` مناسب أكثر مع بيانات نظيفة.

---

### السؤال 10: {اشرح كيف يعمل التصويت النهائي (Combine Votes) في AdaBoost}
**نموذج الإجابة:** 1. التعريف: `M*(x) = argmax_y Σ αi × err(x)` حيث تُجمع أوزان كل المصنفات التي اتفقت على فئة معينة. 2. المكونات: لكل فئة محتملة `y`، نجمع `αi` لكل مصنّف صوّت لصالح هذه الفئة. 3. مثال: لو مصنفان صوتا لفئة "A" بأوزان 0.42 و0.65، ومصنّف واحد صوّت لـ"B" بوزن 0.718، فمجموع "A" = 1.07 > مجموع "B" = 0.718، فتفوز "A". 4. متى نستخدم: هذه هي الخطوة الأخيرة الإلزامية بعد انتهاء كل جولات التدريب في AdaBoost.

---

### السؤال 11: {ما الفرق بين Ensemble وTree واحد فقط من ناحية التباين (Variance)؟}
**نموذج الإجابة:** 1. التعريف: شجرة قرار واحدة عالية التباين (حساسة جدًا لتغيرات بسيطة في البيانات)، بينما الـ Ensemble (خصوصًا Bagging وRandom Forest) يقلل هذا التباين عبر المتوسط/التصويت. 2. المكونات: تقليل التباين لا يعني بالضرورة تقليل التحيّز (`bias`). 3. مثال: كما ذكرت المحاضرة، `Bagging` "less susceptible to model overfitting" بسبب تقليل التباين هذا. 4. متى نستخدم: عندما نلاحظ أن نموذجًا فرديًا (كشجرة عميقة) يعاني من overfitting حاد.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Ensemble Methods (هذه المحاضرة) | Decision Trees (محاضرات سابقة) | المصنّف الأساسي غالبًا شجرة قرار (`decision stump` أو شجرة كاملة) |
| Ensemble Methods | تقييم النماذج (لاحقًا) | يُستخدم `Confusion Matrix`, `Precision`, `Recall`, `F1` لمقارنة أداء Ensemble |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| شروط نجاح Ensemble | استقلالية المصنفات + أداء أفضل من العشوائية |
| Bagging | تصويت متساوٍ، بناء متوازٍ، مقاوم للـ overfitting |
| AdaBoost | تصويت موزون (α)، بناء متسلسل، رفض المصنّف إذا ϵ>0.5 |
| Random Forest | Bagging + اختيار عشوائي للخصائص (F<M)، أسرع، مقاوم لـ outliers |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `ϵi` | معدل الخطأ الموزون للمصنّف i | AdaBoost |
| `αi` | وزن تصويت المصنّف i | AdaBoost |
| `wj` | وزن البيانة j | AdaBoost |
| `Zi` | معامل التطبيع | AdaBoost |
| `F` | عدد الخصائص المرشحة لكل عقدة | Random Forest |
| `k` | عدد المصنفات/الجولات | جميع طرق Ensemble |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | مصنفات متطابقة = لا فائدة من Ensemble (الخطأ يبقى كما هو) |
| 2 | `ϵi > 0.5` في AdaBoost = رفض فوري وإعادة المحاولة |
| 3 | Bagging = تصويت متساوٍ، Boosting = تصويت موزون بـ α |
| 4 | Random Forest يقيّد الخصائص (F<M) وليس البيانات فقط |
| 5 | فجوة كبيرة بين train/test accuracy = مؤشر overfitting |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما تعريف `Ensemble Classifier`؟
A: نموذج مركّب `M*` يُبنى من دمج عدة مصنفات أساسية `M1...Mk`.

---

**Q2:** ما الشرطان الضروريان لنجاح Ensemble؟
A: استقلالية المصنفات + أداء كل مصنّف أفضل من التخمين العشوائي.

---

**Q3:** ماذا يعني `bootstrap sample`؟
A: عينة تُؤخذ من البيانات الأصلية بالسحب مع الإرجاع (with replacement).

---

**Q4:** ما وزن تصويت كل مصنّف في `Bagging`؟
A: متساوٍ لكل المصنفات (equally weighted).

---

**Q5:** ما معادلة وزن تصويت المصنّف `αi` في AdaBoost؟
A: `αi = 0.5 × ln((1-ϵi)/ϵi)`.

---

**Q6:** ماذا يحدث إذا كان `ϵi > 0.5` في AdaBoost؟
A: يُرفض المصنّف، وتُعاد الأوزان لحالتها الأصلية، وتُعاد المحاولة.

---

**Q7:** ما نوع المصنّف الأساسي في `Random Forest`؟
A: شجرة قرار (Decision Tree) حصرًا.

---

**Q8:** ما الفرق بين `Forest-RI` و`Forest-RC`؟
A: `Forest-RI` يختار خصائص موجودة عشوائيًا؛ `Forest-RC` ينشئ خصائص جديدة كتوليفة خطية.

---

**Q9:** كيف يُطبَّق Bagging على مسائل التنبؤ بقيم مستمرة؟
A: بأخذ متوسط تنبؤات كل المصنفات بدل التصويت.

---

**Q10:** ما الفرق بين ترتيب بناء المصنفات في Bagging وBoosting؟
A: Bagging متوازٍ (parallel)؛ Boosting متسلسل (sequential).

---

**Q11:** ما معنى `weighted error rate ϵi`؟
A: مجموع أوزان البيانات التي أخطأ فيها المصنّف `Mi`، وليس عددها فقط.

---

**Q12:** لماذا Random Forest أسرع من Bagging وBoosting العاديين؟
A: لأنه يقيّد عدد الخصائص المرشحة (F<M) عند كل عقدة تفرّع، فيقلل زمن الحساب.

---

**Q13:** ما وظيفة معامل التطبيع `Zi` في AdaBoost؟
A: ضمان أن مجموع أوزان البيانات الجديدة يساوي 1 بعد كل جولة تحديث.

---

**Q14:** بالنسبة للمصنفات المتطابقة (identical)، ما قيمة خطأ الـ Ensemble؟
A: تبقى نفس خطأ المصنّف الواحد (مثلاً 0.35 كما في مثال المحاضرة) — لا تحسّن يحدث.

---

**Q15:** ما معادلة التصنيف النهائي في AdaBoost؟
A: `M*(x) = argmax_y Σ αi × err(x)` — الفئة صاحبة أكبر مجموع أوزان تصويت.

---

**Q16:** أي طريقة Ensemble هي الأكثر مقاومة للـ outliers حسب المحاضرة؟
A: Random Forest.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> الكود الكامل مجمّع من جميع أجزاء المحاضرة — مرجع للطالب، لا شرح جديد.

```python
# === Ensemble Methods: Bagging, AdaBoost, Random Forest (scikit-learn reference) ===

from sklearn import ensemble
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

# --- Setup ---
numBaseClassifiers = 500
maxdepth = 10
trainAcc = []
testAcc = []

# --- Random Forest ---
clf = ensemble.RandomForestClassifier(n_estimators=numBaseClassifiers)
clf.fit(X_train, Y_train)
Y_predTrain = clf.predict(X_train)
Y_predTest = clf.predict(X_test)
trainAcc.append(accuracy_score(Y_train, Y_predTrain))
testAcc.append(accuracy_score(Y_test, Y_predTest))

# --- Bagging ---
clf = ensemble.BaggingClassifier(DecisionTreeClassifier(max_depth=maxdepth), n_estimators=numBaseClassifiers)
clf.fit(X_train, Y_train)
Y_predTrain = clf.predict(X_train)
Y_predTest = clf.predict(X_test)
trainAcc.append(accuracy_score(Y_train, Y_predTrain))
testAcc.append(accuracy_score(Y_test, Y_predTest))

# --- AdaBoost ---
clf = ensemble.AdaBoostClassifier(DecisionTreeClassifier(max_depth=maxdepth), n_estimators=numBaseClassifiers)
clf.fit(X_train, Y_train)
Y_predTrain = clf.predict(X_train)
Y_predTest = clf.predict(X_test)
trainAcc.append(accuracy_score(Y_train, Y_predTrain))
testAcc.append(accuracy_score(Y_test, Y_predTest))

# --- Compare results ---
methods = ['Random Forest', 'Bagging', 'AdaBoost']
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6))
ax1.bar([1.5, 2.5, 3.5], trainAcc)
ax1.set_xticks([1.5, 2.5, 3.5])
ax1.set_xticklabels(methods)
ax2.bar([1.5, 2.5, 3.5], testAcc)
ax2.set_xticks([1.5, 2.5, 3.5])
ax2.set_xticklabels(methods)
plt.show()

# === Manual AdaBoost helper functions (educational reference, not sklearn) ===
import numpy as np

def compute_weighted_error(weights, predictions, true_labels):
    # Compute epsilon_i: sum of weights of misclassified tuples
    errors = (predictions != true_labels).astype(int)
    return np.sum(weights * errors)

def compute_alpha(epsilon_i):
    # Compute classifier vote weight alpha_i
    return 0.5 * np.log((1 - epsilon_i) / epsilon_i)

def update_weights(weights, predictions, true_labels, alpha_i):
    # Update and normalize tuple weights after one AdaBoost round
    errors = (predictions != true_labels).astype(int)
    new_weights = weights * np.where(errors == 1, np.exp(alpha_i), np.exp(-alpha_i))
    z_i = new_weights.sum()
    return new_weights / z_i

def adaboost_round(weights, predictions, true_labels):
    # Perform one full AdaBoost round: error, alpha, weight update, with rejection check
    epsilon_i = compute_weighted_error(weights, predictions, true_labels)
    if epsilon_i > 0.5:
        d = len(weights)
        return None, np.full(d, 1.0 / d)  # reject and reset weights
    alpha_i = compute_alpha(epsilon_i)
    new_weights = update_weights(weights, predictions, true_labels, alpha_i)
    return alpha_i, new_weights
```

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أقدر أشرح الشرطين الضروريين لنجاح `Ensemble Classifier`
- [ ] أقدر أحسب خطأ Ensemble باستخدام معادلة `Binomial` لعدد مصنفات مستقلة
- [ ] أفرّق بين `Bagging` (متوازٍ، متساوي الوزن) و`Boosting` (متسلسل، موزون)
- [ ] أعرف خطوات خوارزمية `Bagging` كاملة (bootstrap → تدريب → تصويت)
- [ ] أعرف خطوات خوارزمية `AdaBoost` كاملة بما فيها شرط رفض `ϵi>0.5`
- [ ] أقدر أحسب `αi` و`wj` الجديدة يدويًا بمعادلات AdaBoost
- [ ] أفرّق بين `Forest-RI` و`Forest-RC` في `Random Forest`
- [ ] أعرف لماذا `Random Forest` أسرع وأكثر مقاومة لـ `outliers`
- [ ] أقدر أفسّر فجوة بين `train accuracy` و`test accuracy` في سياق `overfitting`
- [ ] أعرف الطرق الأربع لبناء تنوع في Ensemble (training set / features / class labels / learning algorithm)
- [ ] أقدر أكتب كود `sklearn.ensemble` لكل من `RandomForestClassifier`, `BaggingClassifier`, `AdaBoostClassifier`
- [ ] أقدر أحسب `Precision`, `Recall`, `F1` من `Confusion Matrix` لمخرجات Ensemble
- [ ] راجعت كل الأمثلة العددية (Bagging على x من 0.1-1.0، AdaBoost بـ10 عينات) خطوة بخطوة

<!-- VALIDATION: تم تغطية جميع شرائح المحاضرة (24-50) شاملة Ensemble Methods، Why they work، طرق البناء الأربع، Bagging مع المثال العددي الكامل، Boosting وAdaBoost مع كل المعادلات والمثال العددي الكامل بثلاث جولات، Random Forest بطريقتيه RI/RC، وكود sklearn الكامل. تم الالتزام ببنية SCHEMA.md v1.0: النص الأصلي+الشرح المبسط لكل قسم، تشبيهات، معادلات مشروحة، مخطط واحد كامل بجداول العقد والروابط، خوارزميات منفصلة في algorithm blocks، 16 MCQ مع تعليل كامل، 5 أسئلة تصحيح كود بأنواع متنوعة (logic/misconception/return_check/dead_code)، 6 تمارين تطبيقية، 4 تمارين تحليل وتطبيق، 5 تمارين تتبع تنفيذ، 11 سؤال نظري منظم، cheat sheet بجداول فقط، 16 بطاقة Q&A، كود مرجعي شامل مجمّع، وقائمة فحص ذاتي. جميع المصطلحات الإنجليزية داخل backticks. -->
