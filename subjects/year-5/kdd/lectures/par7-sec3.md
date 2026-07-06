# المحاضرة 7 — Classification (تصنيف): Support Vector Machines (SVM)
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** خوارزمية `SVM` لتصنيف البيانات: الفكرة الهندسية، `Hard-margin Linear SVM`، `Support Vectors`، `Non-linear SVM`، وتطبيق عملي بـ `scikit-learn`.

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| تنقيب البيانات (Association Rules) | `Apriori`، `support`، `confidence` | قواعد ترافق |
| **تصنيف (Classification) ← أنت هنا** | `Decision Tree`، `Naive Bayes`، `kNN`، `SVM` | نموذج تصنيف يتنبأ بالفئة (Class) |
| تجميع (Clustering) | `k-Means`، `k-Medoids` | مجموعات (Clusters) غير موسومة |
| تنبؤ رقمي (Regression) | `Linear Regression`، `Gradient Descent` | قيمة رقمية مستمرة |

> **نوع هذه المحاضرة:** `Classification` — سنستخدم مصطلحات: `SVM`، `Hyperplane`، `Margin`، `Support Vectors`، `Hard-margin`، `Soft-margin`، `Non-linear SVM`، `Kernel`، `Confusion Matrix`، `Accuracy`.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مقدمة عن SVM

#### النص الأصلي يقول:
> A popular classification method. Used for: classification and numeric prediction. Features: training can be slow but accuracy is high owing to their ability to model complex nonlinear decision boundaries. Applications: handwritten text classification, text categorization, object recognition, speaker identification, benchmarking time-series prediction tests.

#### الشرح المبسّط:
`SVM` (أو Support Vector Machines) هي طريقة تصنيف مشهورة جداً، ويمكن استخدامها أيضاً في التنبؤ الرقمي (Regression). ميزتها الأساسية أنها "دقيقة جداً" لأنها قادرة على رسم حدود فصل معقدة وغير مستقيمة (nonlinear) بين الفئات، لكن الثمن هو أن تدريبها قد يكون بطيئاً خصوصاً مع بيانات كبيرة.

**لماذا؟** لأن SVM لا تكتفي بأي خط يفصل بين الفئتين، بل تبحث عن "أفضل" خط ممكن عبر حل مسألة تحسين رياضي (optimization)، وهذا يستهلك وقتاً أطول من خوارزميات أبسط مثل kNN.

**💡 التشبيه:**
> تخيل أنك تريد أن ترسم سياجاً بين حديقتين متجاورتين (فريق أحمر وفريق أزرق) بحيث لا يقترب السياج من منزل أي فريق أكثر مما يجب.
> **وجه الشبه:** السياج = الحد الفاصل (Hyperplane)، والمنازل الأقرب للسياج = نقاط الدعم (Support Vectors).

استُخدمت SVM بنجاح في: تصنيف الكتابة اليدوية، تصنيف النصوص، التعرف على الأجسام، التعرف على هوية المتحدث، واختبارات التنبؤ بالسلاسل الزمنية.

---

### 2. الأنواع الأساسية لـ SVM

#### النص الأصلي يقول:
> Linear SVM: Hard-margin Linear SVM, Soft-margin linear SVM. Non-linear SVM.

#### الشرح المبسّط:
تُقسّم SVM إلى نوعين رئيسيين:
- **`Linear SVM`**: تفترض أن البيانات يمكن فصلها بخط مستقيم (أو مستوٍ في الأبعاد الأعلى)، ولها حالتان:
  - **`Hard-margin Linear SVM`**: تفترض فصلاً تاماً بدون أي أخطاء (لا يوجد نقاط داخل الهامش أو في الجهة الخاطئة).
  - **`Soft-margin linear SVM`**: تسمح ببعض الأخطاء/التداخل لأن البيانات الحقيقية نادراً ما تكون مفصولة تماماً.
- **`Non-linear SVM`**: تُستخدم عندما لا يمكن فصل البيانات بخط مستقيم، فتستخدم دالة `Kernel` لتحويل البيانات إلى بعد أعلى يسهل فيها الفصل الخطي.

**لماذا هذا التقسيم مهم؟** لأن اختيار النوع الخاطئ يؤدي إلى نموذج ضعيف؛ فإذا كانت البيانات متشابكة بشكل دائري مثلاً ولجأنا لـ `Linear SVM` فقط، ستكون الدقة (Accuracy) منخفضة كما سنرى لاحقاً في مثال `scikit-learn`.

**(شرح زيادة للفهم):** التفريق بين linearly separable وnon-linearly separable هو المفهوم نفسه الذي يظهر في شرائح `SVM: Basic idea` حيث تُعرض أمثلة بصرية توضح الفرق.

---

### 3. الفكرة الأساسية: الفصل الخطي والـ Hyperplane

#### النص الأصلي يقول:
> Let's start with a simple 2 class problem and let's assume linear separability. Goal: find a decision boundary (hyperplane) that will separate the data based on their class: In 2D, this is just a straight line. In higher dimensions, a hyperplane.

#### الشرح المبسّط:
نبدأ بمسألة تصنيف ثنائية (فئتان فقط)، ونفترض أن البيانات قابلة للفصل خطياً (linearly separable). الهدف هو إيجاد **حد فاصل (decision boundary)** يسمى `Hyperplane`:
- في بعدين (2D): الـ Hyperplane هو مجرد **خط مستقيم**.
- في ثلاثة أبعاد (3D): الـ Hyperplane هو **مستوٍ (plane)**.
- في n بُعد: الـ Hyperplane هو فضاء فرعي (subspace) بعده n-1.

**لماذا نحتاج هذا التعميم؟** لأن بيانات العالم الحقيقي غالباً لها أكثر من ميزتين (features)، فنحتاج تعريفاً رياضياً يعمل بغض النظر عن عدد الأبعاد.

**💡 التشبيه:**
> في بعدين، الحد الفاصل كخط مستقيم يفصل شارعين. في ثلاثة أبعاد، تخيله كجدار زجاجي يفصل غرفتين.
> **وجه الشبه:** الخط/الجدار = Hyperplane مهما اختلف عدد الأبعاد.

---

### 4. لماذا نحتاج معياراً لاختيار "أفضل" حد فاصل؟

#### النص الأصلي يقول:
> Consider the following example (2D for simplicity, so the hyperplane is a line). Lots of possible solutions. All with 0 error in the training data. But we want to choose a hyperplane that is expected to work well on future unseen instances (i.e., a hyperplane that can generalize).

#### الشرح المبسّط:
عند وجود بيانات قابلة للفصل خطياً، يمكن رسم **عدد لا نهائي** من الخطوط التي تفصل الفئتين بدون أي خطأ على بيانات التدريب. لكن ليست كل هذه الخطوط جيدة بنفس الدرجة عند تصنيف بيانات جديدة لم تُرَ من قبل (unseen instances).

**لماذا؟** لأن الهدف الحقيقي من أي نموذج تعلّم آلي ليس حفظ بيانات التدريب، بل **التعميم (Generalization)** على بيانات المستقبل. خط يمر قريباً جداً من نقاط التدريب قد يُصنّف بيانات جديدة بشكل خاطئ لأقل تغيير بسيط في القيم.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا وجدت 3 خطوط تفصل بياناتي التدريبية بدون أي خطأ، فهل هذا يعني أن الثلاثة متساوون في الجودة؟
> **لماذا هذا مهم؟** لأن الجواب "لا" هو أساس فكرة الـ Margin بالكامل، وسنشرحها الآن.

---

### 5. اختيار أفضل Hyperplane: مفهوم الـ Margin

#### النص الأصلي يقول:
> How to define better? We need to evaluate somehow the hyperplanes/lines. Intuitively, a line is bad if it passes too close to the training instances, because it will be noise sensitive and will generalize poorly → using the concept of the margin of a separating hyperplane.

#### الشرح المبسّط:
لتقييم جودة الحد الفاصل، نستخدم **مبدأ بسيط جداً**: كلما مرّ الخط قريباً جداً من نقاط التدريب، كان أكثر حساسية للضجيج (Noise) وأسوأ في التعميم. لذلك نحتاج مقياساً كمياً لـ"قرب/بُعد" الخط عن النقاط، وهذا المقياس هو **`Margin`**.

**لماذا الحساسية للضجيج مشكلة؟** لأنه لو أُزيحت نقطة تدريب واحدة قليلاً بسبب خطأ قياس بسيط (noise)، فقد يتغير تصنيفها بالكامل إذا كان الخط قريباً منها جداً.

**💡 التشبيه:**
> تخيل حارساً يقف بين فريقين متعارضين خلال شجار. لو وقف قريباً جداً من أحد الفريقين، فأي حركة بسيطة منهم قد "تدفعه" للجهة الخاطئة.
> **وجه الشبه:** مسافة الحارس عن أقرب شخص = الـ Margin.

---

### 6. تعريف Margin رياضياً عبر الـ Margin Hyperplanes

#### النص الأصلي يقول:
> For every separating hyperplane Bi, let us associate a pair of parallel hyperplanes bi1 and bi2. bi1 and bi2 touch the closest instances of both classes, respectively. bi1 and bi2 are known as the margin hyperplanes of Bi. The distance between bi1 and bi2 is known as the margin of the separating hyperplane Bi. Goal: Find the hyperplane that maximizes the margin (known as the maximum margin hyperplane) → B1 is better than B2.

#### الشرح المبسّط:
لكل حد فاصل مرشّح (لنسمّه Bi)، نرسم خطين متوازيين له من الجهتين، بحيث يلامس كل خط أقرب نقطة من كل فئة. هذين الخطين المتوازيين يسمّيان **`margin hyperplanes`** (b_i1 وb_i2)، والمسافة بينهما هي **`margin`** الخاص بـ Bi.

**الهدف النهائي لـ SVM:** إيجاد الحد الفاصل الذي يجعل هذه المسافة (الـ Margin) **أكبر ما يمكن**؛ وهذا يسمى **`Maximum Margin Hyperplane`**.

**لماذا "الأقصى" وليس أي قيمة؟** لأنه كلما كبر الهامش، كلما ابتعد الخط عن جميع النقاط بالتساوي تقريباً، مما يقلل احتمال الخطأ عند تصنيف نقاط جديدة قريبة من الحدود.

#### 📊 المخطط: مقارنة B1 و B2 من حيث الهامش

#### ما هذا المخطط؟
> يوضّح سبب تفضيل B1 على B2 كحد فاصل، بالاعتماد على مقارنة عرض الهامش لكل منهما.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | البيانات (فئة +1 وفئة -1) | data | نقاط التدريب الموزّعة في المستوى |
| 2 | B1 (الحد الفاصل الأول) | decision | خط فاصل بهامش كبير |
| 3 | B2 (الحد الفاصل الثاني) | decision | خط فاصل بهامش صغير جداً |
| 4 | المقارنة | decision | اختيار الحد ذو الهامش الأكبر |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| البيانات | B1 | يُقاس هامشه | عادي | حساب المسافة بين b11 وb12 |
| البيانات | B2 | يُقاس هامشه | عادي | حساب المسافة بين b21 وb22 |
| B1 وB2 | المقارنة | يُختار الأكبر | عادي | B1 أفضل لأن هامشه أكبر |

```diagram
type: flowchart
title: اختيار أفضل Hyperplane عبر الهامش
direction: TD
nodes:
  - id: data
    label: بيانات التدريب (فئتان)
    kind: data
    level: 0
  - id: b1
    label: "B1: هامش كبير"
    kind: decision
    level: 1
  - id: b2
    label: "B2: هامش صغير"
    kind: decision
    level: 1
  - id: choose
    label: اختر الهامش الأقصى
    kind: event
    level: 2
edges:
  - from: data
    to: b1
  - from: data
    to: b2
  - from: b1
    to: choose
  - from: b2
    to: choose
```

#### مهم للامتحان ⚠️:
> السؤال الكلاسيكي في الامتحانات: "لماذا B1 أفضل من B2؟" — الجواب الصحيح دائماً: لأن هامش B1 أكبر، وليس لأنه "أقرب" أو "أقصر".

---

### 7. Support Vectors: النقاط التي تحدد كل شيء

#### النص الأصلي يقول:
> The decision function is fully specified by a very small subset of training samples, the support vectors: data points that lie closest to the decision boundary, the most difficult to classify.

#### الشرح المبسّط:
من بين كل نقاط التدريب، هناك مجموعة صغيرة فقط تُسمّى **`Support Vectors`** وهي النقاط الأقرب للحد الفاصل (تلامس الـ margin hyperplanes). هذه النقاط هي التي **تُحدد بالكامل** موقع الحد الفاصل ومعادلته؛ بقية النقاط (البعيدة عن الحد) لا تؤثر إطلاقاً.

**لماذا تسمى "الأصعب في التصنيف"؟** لأنها الأقرب لمنطقة التداخل بين الفئتين، فهي الأكثر عرضة للخطأ لو كانت الحدود مرسومة بشكل مختلف قليلاً.

**💡 التشبيه:**
> فكّر في خيمة تقف بفضل عدد قليل من الأوتاد المشدودة تماماً عند حوافها؛ باقي الحبال المترهّلة لا تؤثر على شكل الخيمة.
> **وجه الشبه:** الأوتاد المشدودة = Support Vectors، الحبال المترهّلة = بقية نقاط التدريب.

#### النص الأصلي يقول:
> Support vectors are critical elements. If removed, they would change the position of the separating hyperplane. Moving the non-support vectors has no effect on the decision boundary. Moving a support vector moves the decision boundary.

#### الشرح المبسّط:
هذا يؤكد الفكرة السابقة عملياً: لو حرّكت نقطة **ليست** support vector، الحد الفاصل لن يتغير إطلاقاً. لكن لو حرّكت (أو حذفت) نقطة **هي** support vector، فسيتغير موقع الحد الفاصل بالكامل.

#### الفهم الخاطئ الشائع ❌: كل نقاط التدريب تؤثر بنفس الدرجة في موقع خط SVM.
#### الفهم الصحيح ✅: فقط نقاط الدعم (Support Vectors) — وهي غالباً أقلية صغيرة — تحدد موقع الخط؛ بقية النقاط بلا أي تأثير.

---

### 8. الصياغة الرياضية لـ Hard-margin Linear SVM

#### النص الأصلي يقول:
> Consider a simple binary classification problem yi ϵ {-1,1} consisting of training set D be (X1,y1),…,(X|D|,y|D|). The linear SVM classifier is the hyperplane H characterized by parameters w and b (parameters of the model): W·Xi + b = 0. Where Xi is the input vector, w is a weight vector, b a scalar (bias). E.g., For 2-D it can be written as w0 + w1x1 + w2x2 = 0.

#### الشرح المبسّط:
نفترض أن كل نقطة تدريب Xi لها تصنيف yi يساوي إما **+1** أو **-1** (وليس 0 و1 كما في بعض النماذج الأخرى — هذا اختيار رياضي مريح لـ SVM). الحد الفاصل H يُعرّف بمعادلة:

$$
W \cdot X_i + b = 0
$$

- **`W`**: متجه الأوزان (weight vector) — يحدد اتجاه/ميل الحد الفاصل.
- **`b`**: قيمة العتبة/الانحياز (bias) — يحدد إزاحة الحد الفاصل عن نقطة الأصل.
- **`Xi`**: متجه المدخلات (الميزات/features) للنقطة رقم i.

في حالة بعدين (2D)، هذه المعادلة تصبح ببساطة معادلة خط مستقيم معروف: w0 + w1x1 + w2x2 = 0.

**لماذا نستخدم +1/-1 بدل 0/1؟** لأن هذا يجعل الصيغ الرياضية اللاحقة (مثل شرط yi(W·Xi+b) ≥ 1) متماثلة وأبسط في الاستخدام أثناء الاشتقاق الرياضي.

---

### 9. معادلات الهوامش (Margin Hyperplanes) والقيود

#### النص الأصلي يقول:
> For the associated margin hyperplanes H1 and H2 (i.e., the sides defining the margin) it holds: H2: W·Xi + b=+1, H1: W·Xi + b=-1. For any instance xi in the training set, the decision boundary H must satisfy the following inequalities: W·Xi + b ≥ +1 when yi=+1, W·Xi + b ≤ -1 when yi=-1, i.e., there are no data points between H1 and H2.

#### الشرح المبسّط:
حول الحد الفاصل H، يوجد خطان متوازيان يحددان حدود الهامش:
- **H2**: حيث W·Xi + b = +1 (يلامس أقرب نقاط الفئة +1).
- **H1**: حيث W·Xi + b = -1 (يلامس أقرب نقاط الفئة -1).

ولضمان أن التصنيف صحيح تماماً (Hard-margin أي بدون أخطاء)، يجب أن تحقق **كل** نقطة تدريب:

$$
W \cdot X_i + b \geq +1 \quad \text{عندما } y_i = +1
$$
$$
W \cdot X_i + b \leq -1 \quad \text{عندما } y_i = -1
$$

**الشرح:**
> هذا يعني حرفياً: لا توجد أي نقطة تدريب داخل منطقة الهامش (بين H1 وH2)؛ كل نقطة إما على الحد أو خارجه تماماً في جهتها الصحيحة.

**لماذا هذا الشرط صارم جداً؟** لأننا في حالة الـ Hard-margin نفترض فصلاً تاماً بلا استثناءات؛ أي نقطة تقع داخل الهامش أو في الجانب الخاطئ تجعل هذه المعادلات غير محققة (وهذا بالضبط سبب وجود Soft-margin لاحقاً للتعامل مع بيانات العالم الحقيقي غير المثالية).

---

### 10. حساب الـ Margin هندسياً

#### النص الأصلي يقول:
> The margin of hyperplane H is given by the distance between the two hyperplanes H1,H2. Let x1, x2 be two points in H2, H1 respectively: W·X1+b=+1, W·X2+b=-1. From geometry, distance between point Xi and line: |W·Xi+b| / ‖w‖. ‖w‖=√(w·w) is the Euclidean norm/length. Distance of x1 from H = 1/‖w‖ and distance of x2 from H = 1/‖w‖. A linear SVM searches for a hyperplane that maximizes the margin: d = 1/‖w‖ + 1/‖w‖ = 2/‖w‖.

#### الشرح المبسّط:
من الهندسة التحليلية، المسافة بين أي نقطة Xi والخط H تُحسب بالصيغة:

$$
\text{distance} = \frac{|W \cdot X_i + b|}{\|w\|}
$$

حيث ‖w‖ هو الطول الإقليدي (Euclidean norm) لمتجه الأوزان = √(w·w).

بتطبيق هذه الصيغة على النقطتين x1 (على H2) وx2 (على H1)، نجد أن مسافة كل منهما عن H تساوي **1/‖w‖**. وبما أن الهامش الكلي = مجموع المسافتين من الجهتين:

$$
d = \frac{1}{\|w\|} + \frac{1}{\|w\|} = \frac{2}{\|w\|}
$$

**لماذا هذه النتيجة مهمة جداً؟** لأنها تربط بين الهدف الهندسي (تعظيم الهامش d) والمتغير الرياضي الوحيد الذي نتحكم فيه (‖w‖)؛ فتعظيم d يعادل رياضياً **تصغير ‖w‖**، وهذا ما يحوّل المسألة إلى مسألة تحسين رياضية قابلة للحل.

📐 **المعادلة: عرض الهامش**
$$
d = \frac{2}{\|w\|}
$$
**الشرح:**
> `d` هو عرض الهامش الكلي؛ `‖w‖` هو طول متجه الأوزان. العلاقة عكسية: كلما صغر ‖w‖، كبر الهامش d، والعكس صحيح.

---

### 11. تحويل المسألة إلى مسألة تحسين (Optimization)

#### النص الأصلي يقول:
> In order to maximize d = 2/‖w‖, we need to minimize ‖w‖. Actually, we minimize ‖w‖²/2 (equivalent) — this allows us to perform quadratic programming optimization later on, subject to the constraints: W·Xi+b ≥ +1 when yi=+1, W·Xi+b ≤ -1 when yi=-1. Or, alternatively: yi(W·Xi+b) ≥ 1.

#### الشرح المبسّط:
بما أن تعظيم d يعادل تصغير ‖w‖، فبدلاً من تصغير ‖w‖ مباشرة (وهي دالة تحتوي جذراً تربيعياً ويصعب التعامل معها رياضياً)، نصغّر بدلاً منها **‖w‖²/2** — وهذا **يعطي نفس الحل الأمثل** لأن ‖w‖² دالة متزايدة مع ‖w‖ (تربيعها لا يغيّر موقع القيمة الصغرى)، لكنها أسهل بكثير في الاشتقاق الرياضي (تسمح باستخدام **Quadratic Programming**، وهو نوع معروف وقابل للحل بكفاءة من مسائل التحسين).

بدلاً من كتابة شرطين منفصلين (أحدهما لـ yi=+1 والآخر لـ yi=-1)، يمكن دمجهما في معادلة واحدة أنيقة:

$$
y_i (W \cdot X_i + b) \geq 1 \quad \forall i
$$

**لماذا يعمل هذا الدمج؟** لأن yi تساوي +1 أو -1 فقط. إذا كان yi=+1، الشرط يصبح W·Xi+b ≥ 1 (نفس الشرط الأصلي). وإذا كان yi=-1، ضرب الطرفين بـ(-1) يقلب الإشارة فيصبح W·Xi+b ≤ -1 (وهو أيضاً نفس الشرط الأصلي). فالمعادلة الواحدة تغطي الحالتين معاً.

📐 **المعادلة: مسألة Hard-margin SVM الكاملة**
$$
\min_{w} \frac{\|w\|^2}{2} \quad \text{subject to} \quad y_i(W \cdot X_i + b) - 1 \geq 0 \; \forall i
$$
**الشرح:**
> الهدف: تصغير نصف مربع طول متجه الأوزان. القيد: كل نقطة تدريب يجب أن تحقق yi(W·Xi+b) ≥ 1، أي تكون خارج منطقة الهامش تماماً في جهتها الصحيحة.

#### 💡 التشبيه:
> تصغير ‖w‖ أشبه بشدّ لاصق مطاطي (السياج) لأقصى درجة ممكنة مع إبقائه لا يلمس أياً من الفريقين.
> **وجه الشبه:** شد السياج بأقصى قوة = تصغير ‖w‖ = تكبير الهامش d.

---

### 12. حل المسألة عبر Lagrange Multipliers

#### النص الأصلي يقول:
> This is a constrained optimization problem: The objective function is quadratic. The constraints are linear on model parameters w, b. This is a convex optimization problem, which can be solved using the Lagrange multiplier method.

#### الشرح المبسّط:
لدينا الآن مسألة **تحسين مقيّد (constrained optimization)**:
- **الدالة الهدف (objective function)**: تربيعية (quadratic) — وهي ‖w‖²/2.
- **القيود (constraints)**: خطية (linear) بالنسبة لمعاملات النموذج w، b.

نوع المسألة هذا يسمى **مسألة تحسين محدّبة (Convex Optimization Problem)**، وميزتها أن أي حل محلي (local) هو أيضاً حل شامل (global) — أي لا يوجد خطر الوقوع في "حل خاطئ محلي". تُحل هذه المسألة باستخدام أسلوب **`Lagrange multiplier`**.

**لماذا نحتاج Lagrange تحديداً؟** لأنه الأسلوب الرياضي القياسي لتحويل مسألة تحسين مقيّدة (بها قيود متعددة) إلى مسألة أسهل بدون قيود صريحة، عبر إدخال متغيرات جديدة (المضاعفات αi) لكل قيد.

#### النص الأصلي يقول:
> Goal: min ‖w‖²/2 subject to yi(W·xi+b)-1 ≥ 0 ∀i. There is an αi ≥ 0 ∀i for each training instance (Lagrange multipliers). Points with αi > 0 are called support vectors and lie on H1 or H2. Points with αi=0 lie beyond margin planes and are irrelevant to the solution. Define the auxiliary objective function Lp = (1/2)‖w‖² − Σαi(yi(W·xi+b)−1). Minimize Lp w.r.t. w, b.

#### الشرح المبسّط:
لكل نقطة تدريب i، نُدخل متغيراً جديداً يسمى **`Lagrange multiplier`** ويُرمز له بـ **αi**، بحيث αi ≥ 0 دائماً. هذا المتغير هو المفتاح لفهم من هي نقاط الدعم:
- إذا كانت **αi > 0** ← النقطة هي **Support Vector** (تقع بالضبط على H1 أو H2).
- إذا كانت **αi = 0** ← النقطة **بعيدة عن الهامش** ولا تؤثر إطلاقاً على الحل النهائي.

ثم نبني **دالة مساعدة (auxiliary function)** تسمى Lp تجمع الهدف الأصلي والقيود معاً في تعبير واحد:

$$
L_p = \frac{1}{2}\|w\|^2 - \sum_{i=1}^{n} \alpha_i \big(y_i(W\cdot x_i + b) - 1\big)
$$

ثم نصغّر Lp بالنسبة إلى w وb (بأخذ المشتقات الجزئية ومساواتها بالصفر):

$$
\frac{\partial L}{\partial w} = w - \sum_{i=1}^n \alpha_i y_i x_i = 0
\qquad
\frac{\partial L}{\partial b} = \sum_{i=1}^n \alpha_i y_i = 0
$$

**لماذا نأخذ المشتقة ونساويها بالصفر؟** لأن هذه هي الطريقة القياسية لإيجاد النقطة الصغرى (minimum) لأي دالة قابلة للاشتقاق؛ عند تلك النقطة يكون معدل التغير صفراً.

#### مهم للامتحان ⚠️:
> احفظ جيداً: αi > 0 ⟺ النقطة support vector. αi = 0 ⟺ النقطة غير مؤثرة إطلاقاً. هذا مصدر شائع لأسئلة MCQ والتتبع.

---

### 13. استخراج معاملات النموذج w وb من نقاط الدعم

#### النص الأصلي يقول:
> The plane is a linear combination of the training vectors: W = Σ αi yi xi. b can be computed using the plane equation for each support vector: F(xi) = W xi + b → b = F(xi) − W xi. The solution (trained SVM) consists of: The support vectors xi (those instances with αi>0). Based on which, we can also compute the parameters w, b of the decision boundary.

#### الشرح المبسّط:
بعد حل مسألة Lagrange، نحصل على قيم αi لكل نقطة. عندها:

$$
W = \sum_{i=1}^{n} \alpha_i y_i x_i
$$

أي أن **متجه الأوزان w هو تركيبة خطية (linear combination) من متجهات نقاط الدعم فقط** (لأن αi=0 لكل النقاط غير المؤثرة، فتُلغى تلقائياً من المجموع).

ثم نحسب b باستخدام معادلة أي نقطة دعم (F(xi) هنا تمثل القيمة المستهدفة عند تلك النقطة، أي +1 أو -1 حسب فئتها):

$$
b = F(x_i) - W \cdot x_i
$$

**خلاصة الحل النهائي لـ SVM المدرّبة تتكوّن من:**
1. نقاط الدعم xi (تلك التي αi > 0 فقط).
2. القيم المحسوبة لـ w وb المشتقة منها.

**لماذا هذا اقتصادي جداً من الناحية الحاسوبية؟** لأنه بمجرد التدريب، لا نحتاج تخزين كل بيانات التدريب لتصنيف نقطة جديدة — فقط نقاط الدعم (وهي غالباً أقلية صغيرة جداً)، وهذا يوفر الذاكرة وسرعة التصنيف اللاحق.

```algorithm
1 | جمع بيانات التدريب (Xi, yi) | إدخال يدوي/قاعدة بيانات | تجهيز مجموعة D بحجم |D|
2 | صياغة مسألة Lagrange | رياضيات (Lagrange multipliers) | بناء Lp = ½‖w‖² − Σαi(yi(W·xi+b)−1)
3 | حل المسألة لإيجاد αi لكل نقطة | Quadratic Programming solver | الحصول على قيم αi ≥ 0
4 | تحديد نقاط الدعم | فحص شرط αi > 0 | استخراج النقاط المؤثرة فقط
5 | حساب w | الجمع الموزون W = Σ αi yi xi | متجه الأوزان النهائي
6 | حساب b | معادلة أي نقطة دعم b = F(xi) − W·xi | قيمة الانحياز النهائية
7 | بناء الحد الفاصل النهائي | المعادلة W·X + b = 0 | نموذج SVM جاهز للتصنيف
```

#### نقاط التنفيذ:
- يجب حل مسألة Lagrange أولاً قبل أي محاولة لحساب w أو b مباشرة.
- في التطبيق العملي غالباً يُحسب b كمتوسط القيم الناتجة من عدة نقاط دعم لتقليل خطأ التقريب العددي.

---

### 14. مثال عددي كامل لحساب معاملات Hard-margin SVM

#### النص الأصلي يقول:
> an example of computing model parameters: Consider the following two-dimensional data set, which contains eight training instances. Find a linear SVM for the given 2D dataset. [جدول ببيانات x1, x2, y, Lagrange Multiplier]. Notice that only the first two instances have non-zero Lagrange multipliers → These instances correspond to the support vectors for this data set.

#### الشرح المبسّط:
لدينا 8 نقاط تدريب ثنائية الأبعاد كما في الجدول التالي:

| x1 | x2 | y | Lagrange Multiplier (αi) |
| --- | --- | --- | --- |
| 0.3858 | 0.4687 | 1 | 65.5261 |
| 0.4871 | 0.611 | -1 | 65.5261 |
| 0.9218 | 0.4103 | -1 | 0 |
| 0.7382 | 0.8936 | -1 | 0 |
| 0.1763 | 0.0579 | 1 | 0 |
| 0.4057 | 0.3529 | 1 | 0 |
| 0.9355 | 0.8132 | -1 | 0 |
| 0.2146 | 0.0099 | 1 | 0 |

لاحظ أن **فقط أول نقطتين** لهما αi ≠ 0 (تساوي 65.5261)؛ إذن هما نقطتا الدعم الوحيدتان لهذا المجموع من البيانات، وبقية الست نقاط لا تؤثر على الحل إطلاقاً.

**لماذا يهم هذا؟** هذا مثال توضيحي مباشر لما شُرح سابقاً: عدد قليل جداً من النقاط (هنا 2 من أصل 8) يكفي لتحديد الحد الفاصل كاملاً.

#### النص الأصلي يقول:
> Computing w: w1 = Σ αi yi xi1 = 65.5621*1*0.3858 + 65.5621*-1*0.4871 = -6.64. w2 = Σ αi yi xi2 = 65.5621*1*0.4687 + 65.5621*-1*0.611 = -9.32.

#### الشرح المبسّط (خطوة حساب w):
$$
w_1 = \alpha_1 y_1 x_{11} + \alpha_2 y_2 x_{21} = 65.5261(1)(0.3858) + 65.5261(-1)(0.4871) \approx -6.64
$$
$$
w_2 = \alpha_1 y_1 x_{12} + \alpha_2 y_2 x_{22} = 65.5261(1)(0.4687) + 65.5261(-1)(0.611) \approx -9.32
$$

إذن **w = (-6.64, -9.32)**.

#### النص الأصلي يقول:
> Computing b: f(xi) = wxi + b → b = f(xi) − wxi. b(1) = 1 − wx1 = 1 − (−6.64)(0.3858) − (−9.32)(0.4687). b(2) = −1 − wx2 = ... . b = avg(b(1), b(2)).

#### الشرح المبسّط (خطوة حساب b):
نحسب b من كل نقطة دعم على حدة، ثم نأخذ **المتوسط (avg)** لتقليل خطأ التقريب العددي:
$$
b^{(1)} = 1 - w\cdot x_1 = 1 - (-6.64)(0.3858) - (-9.32)(0.4687)
$$
$$
b^{(2)} = -1 - w\cdot x_2
$$
$$
b = \text{avg}(b^{(1)}, b^{(2)})
$$

النتيجة النهائية للحد الفاصل (كما هو موضح في الرسم البياني بالمحاضرة):

$$
-6.64\,x_1 - 9.32\,x_2 + 7.93 = 0
$$

**لماذا نأخذ متوسط b من نقطتين؟** لأن الحسابات العددية (خصوصاً مع أرقام عشرية) قد تحمل خطأ تقريب بسيطاً؛ أخذ المتوسط من أكثر من نقطة دعم يجعل تقدير b أكثر استقراراً ودقة.

#### 🔍 تتبع التنفيذ: حساب معاملات SVM لهذا المثال

**المدخل:** 8 نقاط تدريب ثنائية الأبعاد كما بالجدول أعلاه، مع قيم αi محسوبة مسبقاً.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تحديد نقاط الدعم (αi > 0) | النقطتان (0.3858, 0.4687, y=1) و(0.4871, 0.611, y=-1) |
| 2 | حساب w1، w2 | w = (-6.64, -9.32) |
| 3 | حساب b من كل نقطة دعم ثم المتوسط | b ≈ 7.93 |
| 4 | كتابة معادلة الحد الفاصل النهائي | -6.64 x1 - 9.32 x2 + 7.93 = 0 |

**النتيجة:** حد فاصل خطي يفصل الفئتين بأقصى هامش ممكن بالاعتماد فقط على نقطتي الدعم.

---

### 15. من النظرية إلى التطبيق العملي: Linear SVM في scikit-learn

#### النص الأصلي يقول:
> Back to our two-dimensional dataset containing 1500 labeled instances, each of which is assigned to one of two classes, 0 or 1. All instances from class 1 are shown in red while those from class 0 are shown in black. For SVM, the model parameters w, b which are estimated by solving the following constrained optimization problem: min (‖w‖²)/2 + (1/C)Σξi, s.t. ∀i: yi[wᵀφ(xi)+b] ≥ 1-ξi, ξi ≥ 0, where C is a hyperparameter that controls the inverse of model complexity (smaller values imply stronger regularization).

#### الشرح المبسّط:
هذا الجزء ينتقل من الحالة النظرية المثالية (Hard-margin) إلى صيغة أكثر عملية تُستخدم فعلياً في المكتبات البرمجية مثل `scikit-learn`، حيث تُضاف متغيرات جديدة تسمى **`ξi` (slack variables)** للسماح بأخطاء بسيطة (وهذا فعلياً مبدأ Soft-margin رغم أن الشريحة لا تذكر الاسم صراحة):

$$
\min_{w,b,\xi} \frac{\|w\|^2}{2} + \frac{1}{C}\sum_i \xi_i \quad \text{s.t.} \; \forall i: y_i[w^T \phi(x_i)+b] \geq 1-\xi_i,\; \xi_i \geq 0
$$

- **`C`**: هو **hyperparameter** يتحكم في عكس قوة التنظيم (regularization). قيمة C صغيرة تعني تنظيماً أقوى (نسمح بمزيد من الأخطاء لصالح هامش أوسع)، وقيمة C كبيرة تعني تنظيماً أضعف (نجبر النموذج على تقليل الأخطاء ولو على حساب اتساع الهامش).
- **`φ(xi)`**: دالة تحويل قد تُستخدم مع non-linear SVM (لتحويل البيانات لبعد أعلى)، وهي مرتبطة بمفهوم الـ Kernel.

**لماذا نحتاج C في التطبيق العملي؟** لأن البيانات الحقيقية (كمجموعة الـ 1500 نقطة الموصوفة هنا) نادراً ما تكون مفصولة تماماً بخط مستقيم؛ فنحتاج آلية للتحكم في مقدار "التسامح" مع الأخطاء أثناء التدريب.

#### 💻 الكود: تدريب Linear SVM بقيم متعددة لـ C

#### ما هذا الكود؟
> يقوم بتدريب عدة نماذج `Linear SVM` بقيم مختلفة للـ hyperparameter C، ثم يقارن دقة (Accuracy) كل نموذج على بيانات التدريب والاختبار، وأخيراً يرسم منحنى العلاقة بين C والدقة.

```python
from sklearn.svm import SVC                     # Import the SVM classifier class
from sklearn.metrics import accuracy_score       # Import accuracy metric function
import matplotlib.pyplot as plt                  # Import plotting library

%matplotlib inline                                # Show plots inline in the notebook
C = [0.01, 0.1, 0.2, 0.5, 0.8, 1, 5, 10, 20, 50]  # List of C values to test
SVMtrainAcc = []                                  # List to store training accuracy per C
SVMtestAcc = []                                   # List to store test accuracy per C

for param in C:                                   # Loop over each candidate C value
    clf = SVC(C=param, kernel='linear')           # Create a linear SVM with this C
    clf.fit(X_train, Y_train)                     # Train the model on training data
    Y_predTrain = clf.predict(X_train)            # Predict labels on training data
    Y_predTest = clf.predict(X_test)               # Predict labels on test data
    SVMtrainAcc.append(accuracy_score(Y_train, Y_predTrain))  # Store training accuracy
    SVMtestAcc.append(accuracy_score(Y_test, Y_predTest))     # Store test accuracy

plt.plot(C, SVMtrainAcc, 'ro-', C, SVMtestAcc, 'bv--')  # Plot both accuracy curves
plt.legend(['Training Accuracy', 'Test Accuracy'])       # Add legend
plt.xlabel('C')                                          # Label x-axis
plt.xscale('log')                                        # Use log scale for C
plt.ylabel('Accuracy')                                   # Label y-axis
```

#### شرح كل سطر:
1. `from sklearn.svm import SVC` → استيراد — يجلب فئة `SVC` (Support Vector Classifier) الجاهزة في scikit-learn.
2. `from sklearn.metrics import accuracy_score` → استيراد — يجلب دالة حساب الدقة (نسبة التصنيف الصحيح).
3. `import matplotlib.pyplot as plt` → استيراد — مكتبة الرسم البياني.
4. `C = [0.01, ..., 50]` → تهيئة — قائمة بقيم C المختلفة لتجربتها (regularization).
5. `SVMtrainAcc = []` و`SVMtestAcc = []` → تهيئة — قوائم فارغة لتخزين نتائج الدقة تدريجياً.
6. `for param in C:` → تكرار — حلقة تجرّب كل قيمة C على حدة.
7. `clf = SVC(C=param, kernel='linear')` → إنشاء نموذج — يبني SVM خطي بقيمة C الحالية.
8. `clf.fit(X_train, Y_train)` → تدريب — يحل مسألة Lagrange فعلياً ويحسب w، b.
9. `Y_predTrain = clf.predict(X_train)` → تنبؤ — يصنّف بيانات التدريب نفسها (لقياس مدى التوافق معها).
10. `Y_predTest = clf.predict(X_test)` → تنبؤ — يصنّف بيانات الاختبار (لقياس التعميم الحقيقي).
11. `SVMtrainAcc.append(...)` و`SVMtestAcc.append(...)` → تخزين — حفظ الدقة في كل تكرار.
12. `plt.plot(...)` → رسم — يرسم منحنيي دقة التدريب (أحمر) والاختبار (أزرق) مقابل C.
13. `plt.xscale('log')` → ضبط المحور — لأن قيم C تتغير بشكل أسّي (0.01 إلى 50)، المقياس اللوغاريتمي يجعل الرسم أوضح.

**المكتبات المطلوبة (Imports):**
> `from sklearn.svm import SVC` | `from sklearn.metrics import accuracy_score` | `import matplotlib.pyplot as plt`

**الناتج المتوقع:**
> منحنى بمحور أفقي C (بمقياس لوغاريتمي) ومحور رأسي Accuracy، مع خطين: دقة التدريب (أحمر) ودقة الاختبار (أزرق منقّط).

#### النص الأصلي يقول:
> Note that linear classifiers perform poorly on the data since the true decision boundaries between classes are nonlinear for the given 2-dimensional dataset.

#### الشرح المبسّط:
النتيجة العملية أظهرت أن دقة **Linear SVM** بقيت منخفضة نسبياً (حوالي 0.55 للتدريب و0.595 للاختبار) بغض النظر عن قيمة C. هذا **ليس خطأ في الكود أو التدريب**، بل لأن الحدود الحقيقية الفاصلة بين الفئتين في هذه البيانات **غير خطية (nonlinear)** أصلاً — كما ظهر في الرسم البياني بالشكل الدائري/المتشابك — فأي خط مستقيم مهما حسّناه لن يستطيع فصلها جيداً.

#### مهم للامتحان ⚠️:
> لو رأيت أن دقة نموذج Linear SVM منخفضة وثابتة رغم تجربة قيم C متعددة، فهذا مؤشر قوي على أن البيانات **غير قابلة للفصل خطياً**، والحل هو الانتقال لـ Non-linear SVM (Kernel Trick) وليس تعديل C أكثر.

---

### 16. الانتقال إلى Non-linear SVM باستخدام Kernel

#### النص الأصلي يقول:
> an example of using nonlinear SVM with a Gaussian radial basis function kernel to fit the 2-dimensional dataset.

#### الشرح المبسّط:
لحل مشكلة البيانات غير الخطية، نستبدل `kernel='linear'` بـ **`kernel='rbf'`** أي **Gaussian Radial Basis Function**. هذا الـ Kernel يسمح لـ SVM برسم حدود فصل **منحنية ومعقدة** (non-linear decision boundaries) بدل الاكتفاء بخط مستقيم، دون الحاجة لتحويل البيانات يدوياً إلى بعد أعلى — وهذا ما يسمى بـ **Kernel Trick**.

**(شرح زيادة للفهم):** الـ Kernel Trick هي حيلة رياضية تحسب "التشابه" بين نقطتين كما لو كانتا محوّلتين لبعد أعلى، دون الحاجة فعلياً لحساب ذلك التحويل بشكل صريح — مما يوفر حسابات ضخمة.

#### 💻 الكود: تدريب Nonlinear SVM بـ RBF Kernel

#### ما هذا الكود؟
> نفس منطق الكود السابق تماماً، لكن مع تغيير الـ kernel من `linear` إلى `rbf` لالتقاط الحدود غير الخطية بين الفئتين.

```python
from sklearn.svm import SVC                      # Import the SVM classifier class

C = [0.01, 0.1, 0.2, 0.5, 0.8, 1, 5, 10, 20, 50]  # List of C values to test
SVMtrainAcc = []                                  # List to store training accuracy per C
SVMtestAcc = []                                   # List to store test accuracy per C

for param in C:                                   # Loop over each candidate C value
    clf = SVC(C=param, kernel='rbf', gamma='auto')  # Nonlinear SVM with RBF kernel
    clf.fit(X_train, Y_train)                     # Train the model on training data
    Y_predTrain = clf.predict(X_train)            # Predict labels on training data
    Y_predTest = clf.predict(X_test)               # Predict labels on test data
    SVMtrainAcc.append(accuracy_score(Y_train, Y_predTrain))  # Store training accuracy
    SVMtestAcc.append(accuracy_score(Y_test, Y_predTest))     # Store test accuracy

plt.plot(C, SVMtrainAcc, 'ro-', C, SVMtestAcc, 'bv--')  # Plot both accuracy curves
plt.legend(['Training Accuracy', 'Test Accuracy'])       # Add legend
plt.xlabel('C')                                          # Label x-axis
plt.xscale('log')                                        # Use log scale for C
plt.ylabel('Accuracy')                                   # Label y-axis
```

#### شرح كل سطر:
1. `from sklearn.svm import SVC` → استيراد — نفس الفئة المستخدمة سابقاً.
2. `clf = SVC(C=param, kernel='rbf', gamma='auto')` → إنشاء نموذج — الفرق الجوهري هنا: `kernel='rbf'` بدل `'linear'`، وإضافة `gamma='auto'` (معامل يتحكم في "مدى تأثير" كل نقطة تدريب على الحد الفاصل في RBF).
3. باقي الأسطر مطابقة تماماً للكود السابق (fit، predict، تخزين الدقة، الرسم).

**المكتبات المطلوبة (Imports):**
> `from sklearn.svm import SVC` (وبقية المكتبات المستوردة مسبقاً: accuracy_score، matplotlib.pyplot)

**الناتج المتوقع:**
> منحنى يُظهر تحسّناً واضحاً بدءاً من C ≈ 0.1 فما فوق، حيث ترتفع دقة الاختبار إلى نطاق 0.70–0.74 تقريباً، مقارنة بـ ~0.595 الثابتة في حالة Linear SVM.

#### النص الأصلي يقول:
> Observe that the nonlinear SVM can achieve a higher test accuracy compared to linear SVM.

#### الشرح المبسّط:
هذه هي النتيجة النهائية والخلاصة العملية للمحاضرة: عند بيانات ذات حدود فصل غير خطية، **Non-linear SVM (بواسطة RBF kernel) يتفوق بوضوح** على Linear SVM من حيث دقة الاختبار (Test Accuracy)، رغم أن دقة التدريب للنموذج غير الخطي تستمر بالارتفاع مع زيادة C بينما دقة الاختبار تبدأ بالانخفاض بعد قيمة معينة من C — وهذه علامة كلاسيكية على **Overfitting (فرط التخصيص)**.

#### الدرس المستفاد:
> اختيار الـ kernel المناسب أهم بكثير من مجرد ضبط C؛ وزيادة C أكثر مما يجب في نموذج non-linear قد يحسّن دقة التدريب لكنه يضر بدقة الاختبار (overfitting).

#### ⚖️ المقايضة: Linear SVM مقابل Non-linear SVM (RBF)

| | Linear SVM | Non-linear SVM (RBF) |
| --- | --- | --- |
| المزايا | تدريب أسرع، تفسير أبسط للمعاملات w، b | يلتقط حدود فصل معقدة، دقة أعلى للبيانات المتشابكة |
| العيوب | أداء ضعيف إذا كانت البيانات غير قابلة للفصل خطياً | أبطأ في التدريب، عرضة أكبر لـ Overfitting إذا لم يُضبط C وgamma جيداً |
| متى تختاره | عندما تكون البيانات (أو الميزات المحوّلة) قابلة للفصل خطياً تقريباً | عندما تُظهر البيانات حدوداً منحنية أو متشابكة كما في المثال العملي هنا |

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `SVM` | خوارزمية تصنيف (وتنبؤ رقمي) تبحث عن حد فاصل بأقصى هامش ممكن | تصنيف نصوص، كتابة يدوية |
| `Hyperplane` | الحد الفاصل بين الفئات؛ خط في 2D، مستوٍ في 3D | W·X + b = 0 |
| `Margin` | المسافة بين خطي الهامش (H1، H2) الملاصقين لأقرب نقاط كل فئة | d = 2/‖w‖ |
| `Support Vectors` | نقاط التدريب التي αi > 0؛ تحدد الحد الفاصل بالكامل | أقرب نقاط لكل فئة |
| `Hard-margin Linear SVM` | نسخة SVM التي تفترض فصلاً تاماً بدون أخطاء | yi(W·Xi+b) ≥ 1 لكل النقاط |
| `Soft-margin Linear SVM` | نسخة تسمح ببعض الأخطاء عبر متغيرات ξi | مناسبة للبيانات الواقعية |
| `Non-linear SVM` | نسخة تستخدم Kernel لالتقاط حدود فصل منحنية | مثال: `kernel='rbf'` |
| `Lagrange Multiplier (αi)` | متغير مساعد لكل نقطة تدريب لحل مسألة التحسين المقيّد | αi > 0 ⟺ support vector |
| `C (hyperparameter)` | يتحكم بعكس قوة التنظيم (Regularization) | C صغير = تنظيم أقوى |
| `Kernel (RBF)` | دالة تحوّل البيانات ضمنياً لبعد أعلى لالتقاط علاقات غير خطية | Gaussian Radial Basis Function |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `w` (weight vector) | يحدد اتجاه الحد الفاصل | W = Σ αi yi xi |
| `b` (bias) | يحدد إزاحة الحد الفاصل عن الأصل | b = avg(F(xi) − W·xi) لكل نقطة دعم |
| `Lp` (auxiliary function) | دالة Lagrange المساعدة لحل مسألة التحسين | Lp = ½‖w‖² − Σαi(yi(W·xi+b)−1) |
| `SVC` (sklearn) | فئة برمجية لتطبيق SVM عملياً | `SVC(C=.., kernel=..)` |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| نوع الحد الفاصل | Linear SVM | Non-linear SVM | الأول خط مستقيم؛ الثاني منحنٍ عبر Kernel |
| نوع الهامش | Hard-margin | Soft-margin | الأول يمنع أي خطأ؛ الثاني يسمح بأخطاء محدودة (ξi) |
| قيمة C | C كبيرة | C صغيرة | الأولى تنظيم أضعف (أخطاء أقل مسموحة)؛ الثانية تنظيم أقوى (هامش أوسع) |
| αi | αi > 0 | αi = 0 | الأولى نقطة دعم مؤثرة؛ الثانية نقطة غير مؤثرة إطلاقاً |

### قائمة المصطلحات (Glossary)
| المصطلح الإنجليزي | المعنى بالعربية |
| --- | --- |
| `Hyperplane` | الحد الفاصل/المستوى الفاصل |
| `Margin` | الهامش |
| `Support Vector` | متجه/نقطة الدعم |
| `Weight vector (w)` | متجه الأوزان |
| `Bias (b)` | معامل الانحياز/العتبة |
| `Lagrange Multiplier` | مضاعف لاغرانج |
| `Quadratic Programming` | البرمجة التربيعية |
| `Kernel` | دالة النواة |
| `Regularization` | التنظيم |
| `Overfitting` | فرط التخصيص/فرط الملاءمة |
| `Generalization` | التعميم |

### النقاط الذهبية
| # | النقطة |
| --- | --- |
| 1 | الهدف من SVM هو تعظيم الهامش، وليس فقط الفصل الصحيح للبيانات. |
| 2 | نقاط الدعم فقط (αi>0) هي التي تحدد الحد الفاصل؛ الباقي بلا تأثير. |
| 3 | تصغير ‖w‖²/2 يعادل تعظيم الهامش d = 2/‖w‖. |
| 4 | C يتحكم في التوازن بين اتساع الهامش والسماح بالأخطاء. |
| 5 | عندما تكون البيانات غير قابلة للفصل خطياً، الحل هو Kernel (مثل RBF) وليس تغيير C فقط. |

### أخطاء شائعة
| # | الخطأ |
| --- | --- |
| 1 | الاعتقاد أن كل نقاط التدريب تؤثر على موقع الحد الفاصل. |
| 2 | الخلط بين تصغير ‖w‖ وتصغير الهامش (العلاقة عكسية: تصغير ‖w‖ يكبّر الهامش). |
| 3 | استخدام Linear SVM على بيانات غير قابلة للفصل خطياً ثم محاولة "إصلاح" الدقة بتغيير C فقط دون تجربة Kernel مختلف. |
| 4 | نسيان أن ξi (في الصيغة العملية) تسمح بأخطاء، وأن هذا يختلف عن حالة Hard-margin الصارمة. |

### خطوات وإجراءات المحاضرة

```algorithm
1 | تحديد نوع المسألة | تحليل البيانات | التأكد من أنها تصنيف ثنائي (binary classification)
2 | فحص قابلية الفصل الخطي | رسم بياني/فحص بصري | تحديد ما إذا كانت linearly separable أو لا
3 | صياغة مسألة Hard-margin | معادلات القيود yi(W·Xi+b) ≥ 1 | تجهيز مسألة Quadratic Programming
4 | حل Lagrange | مضاعفات αi | تحديد نقاط الدعم (αi > 0)
5 | حساب w وb | معادلات W=Σαiyixi وb=avg(...) | بناء معادلة الحد الفاصل النهائي
6 | تقييم الأداء | Accuracy على Train/Test | مقارنة النتائج
7 | إذا كانت الدقة ضعيفة وثابتة | التبديل إلى kernel='rbf' | إعادة التدريب بحثاً عن حدود غير خطية
```

```algorithm
1 | Linear SVM في sklearn | SVC(kernel='linear') | تدريب بحدود خطية فقط
2 | Non-linear SVM في sklearn | SVC(kernel='rbf', gamma='auto') | تدريب بحدود منحنية عبر Kernel Trick
3 | تجربة قيم C متعددة | حلقة for على قائمة C | رصد أثر C على دقة التدريب والاختبار
4 | رسم منحنى المقارنة | matplotlib.pyplot | تحديد أفضل C بصرياً دون overfitting واضح
```

### أنماط الأكواد
- استيراد `SVC` من `sklearn.svm` ثم بناء النموذج بـ `SVC(C=.., kernel=..)`.
- التبديل بين `kernel='linear'` و`kernel='rbf'` هو الفارق الأساسي بين Linear وNon-linear SVM في sklearn.
- استخدام حلقة `for` لتجربة عدة قيم لـ `C` هو نمط قياسي لضبط الـ hyperparameter (Hyperparameter Tuning اليدوي البسيط).
- قياس الأداء دائماً على مجموعتين منفصلتين: Train وTest، لرصد الـ Overfitting.

### أنماط التعامل
- عند رؤية دقة منخفضة وثابتة مع Linear SVM: جرّب kernel غير خطي قبل التوسع في تجربة قيم C.
- عند رؤية دقة تدريب مرتفعة جداً مقابل دقة اختبار منخفضة (فجوة كبيرة): هذا مؤشر Overfitting، جرّب تصغير C أو ضبط gamma.
- استخدم المقياس اللوغاريتمي (`xscale('log')`) عند رسم قيم C لأنها تتغير أسّياً.

### الأفكار الشاملة
SVM تجسّد فكرة مهمة في التعلم الآلي: أن "الفصل الصحيح لبيانات التدريب" ليس كافياً وحده؛ فالأهم هو اختيار الحل الذي يُرجَّح أن يُعمّم جيداً على بيانات مستقبلية (Generalization)، وهذا ما يفسر لماذا تبني SVM كامل نظريتها حول تعظيم الهامش بدلاً من الاكتفاء بأي خط يفصل الفئتين. كذلك، فكرة أن عدداً قليلاً من النقاط (نقاط الدعم) يكفي لتعريف النموذج بالكامل هي فكرة أساسية تتكرر أيضاً في خوارزميات أخرى قائمة على النقاط الحدودية.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1
ما هو الهدف الأساسي الذي تسعى إليه خوارزمية SVM عند اختيار الحد الفاصل (Hyperplane)؟
- أ) تصنيف أكبر عدد ممكن من نقاط التدريب بشكل صحيح فقط
- ب) تعظيم الهامش (Margin) بين الفئتين
- ج) تصغير عدد نقاط الدعم إلى أدنى حد
- د) اختيار أقصر مسافة بين مركزي الفئتين

**الإجابة الصحيحة: ب**
- أ) خاطئ — أي خط يفصل البيانات بدون خطأ يحقق هذا، لكن SVM تريد الأفضل من بينها.
- ب) صحيح — هذا هو جوهر SVM: إيجاد Maximum Margin Hyperplane.
- ج) خاطئ — عدد نقاط الدعم نتيجة للحل وليس هدفاً يُصغَّر.
- د) خاطئ — لا علاقة مباشرة بمراكز الفئتين في تعريف SVM القياسي.

### السؤال 2
أي النقاط التالية تُعتبر "Support Vector"؟
- أ) أي نقطة تدريب بغض النظر عن موقعها
- ب) النقاط الأبعد عن الحد الفاصل
- ج) النقاط التي قيمة αi الخاصة بها أكبر من صفر
- د) النقاط التي تقع في منتصف المسافة بين الفئتين تماماً

**الإجابة الصحيحة: ج**
- أ) خاطئ — فقط جزء صغير من النقاط يكون كذلك.
- ب) خاطئ — العكس تماماً؛ نقاط الدعم هي الأقرب للحد الفاصل.
- ج) صحيح — αi > 0 هو الشرط الدقيق المذكور في المحاضرة.
- د) خاطئ — لا علاقة مباشرة بذلك التعريف الهندسي غير الدقيق.

### السؤال 3
في معادلة الهامش d = 2/‖w‖، ماذا يحدث لعرض الهامش d عند تصغير ‖w‖؟
- أ) يصغر d أيضاً
- ب) يكبر d
- ج) يبقى d ثابتاً
- د) العلاقة غير محددة رياضياً

**الإجابة الصحيحة: ب**
- أ) خاطئ — العلاقة عكسية وليست طردية.
- ب) صحيح — لأن d تتناسب عكسياً مع ‖w‖.
- ج) خاطئ — d يتغير بتغير ‖w‖ دائماً.
- د) خاطئ — العلاقة محددة تماماً بالمعادلة d=2/‖w‖.

### السؤال 4
ماذا يعني αi = 0 لنقطة تدريب معيّنة؟
- أ) النقطة أخطأ النموذج في تصنيفها
- ب) النقطة تقع خارج منطقة الهامش ولا تؤثر على الحل
- ج) النقطة هي نقطة الدعم الأهم في النموذج
- د) النقطة تقع بالضبط على الحد الفاصل H

**الإجابة الصحيحة: ب**
- أ) خاطئ — αi=0 لا علاقة له بصحة أو خطأ التصنيف في الحالة الأساسية.
- ب) صحيح — كما ورد نصاً في المحاضرة.
- ج) خاطئ — العكس؛ الأهم هي نقاط αi > 0.
- د) خاطئ — النقاط على H1/H2 هي التي αi > 0.

### السؤال 5
أي كود Python التالي يُنشئ SVM غير خطي (Non-linear) باستخدام دالة RBF؟
- أ) `SVC(C=1, kernel='linear')`
- ب) `SVC(C=1, kernel='rbf', gamma='auto')`
- ج) `SVC(C=1)` فقط بدون أي kernel
- د) `LinearRegression()`

**الإجابة الصحيحة: ب**
- أ) خاطئ — هذا Linear SVM وليس غير خطي.
- ب) صحيح — تحديد `kernel='rbf'` هو المطلوب تماماً لـ Non-linear SVM.
- ج) خاطئ — القيمة الافتراضية لـ kernel في SVC هي 'rbf' أصلاً في sklearn، لكن السؤال يطلب التحديد الصريح والواضح المطابق للمحاضرة.
- د) خاطئ — هذه ليست حتى خوارزمية تصنيف SVM.

### السؤال 6
ماذا لاحظنا في المثال العملي عند تطبيق Linear SVM على بيانات غير قابلة للفصل خطياً؟
- أ) دقة التدريب والاختبار كانتا مرتفعتين جداً ومتقاربتين
- ب) الدقة بقيت منخفضة وشبه ثابتة رغم تغيير C
- ج) دقة الاختبار فاقت دقة التدريب بفارق كبير جداً
- د) النموذج فشل في التدريب تماماً وأعطى خطأ برمجياً

**الإجابة الصحيحة: ب**
- أ) خاطئ — كانت منخفضة (حوالي 0.55–0.6) وليست مرتفعة.
- ب) صحيح — هذا بالضبط ما أظهره الرسم البياني في المحاضرة.
- ج) خاطئ — دقة الاختبار كانت أعلى قليلاً لكن ليس بفارق كبير جداً، والأهم أن كليهما منخفض.
- د) خاطئ — النموذج تدرّب بنجاح لكن أداؤه كان ضعيفاً.

### السؤال 7
ما الفرق الجوهري بين Hard-margin وSoft-margin Linear SVM؟
- أ) Hard-margin يستخدم Kernel وSoft-margin لا يستخدم
- ب) Hard-margin يفترض فصلاً تاماً بلا أخطاء، Soft-margin يسمح ببعض الأخطاء
- ج) Hard-margin أسرع دائماً من Soft-margin بلا استثناء
- د) لا يوجد فرق عملي بينهما إطلاقاً

**الإجابة الصحيحة: ب**
- أ) خاطئ — الاثنان من نوع Linear SVM بدون Kernel غير خطي.
- ب) صحيح — هذا هو التعريف الدقيق المذكور في شريحة "SVM: Basic idea".
- ج) خاطئ — لا علاقة بالسرعة مباشرة في هذا التمييز.
- د) خاطئ — الفرق جوهري كما وُصف في (ب).

### السؤال 8
في حل مسألة Lagrange لـ SVM، ماذا تمثل الدالة Lp؟
- أ) دالة لحساب الدقة النهائية للنموذج
- ب) دالة مساعدة تجمع الهدف الأصلي (تصغير ‖w‖²/2) مع القيود عبر مضاعفات αi
- ج) دالة لحساب عدد نقاط الدعم فقط
- د) دالة توزيع احتمالي للفئات

**الإجابة الصحيحة: ب**
- أ) خاطئ — Lp أداة رياضية للحل وليست مقياس أداء.
- ب) صحيح — هذا تعريفها الدقيق: Lp = ½‖w‖² − Σαi(yi(W·xi+b)−1).
- ج) خاطئ — عدد نقاط الدعم نتيجة جانبية للحل وليس ما تحسبه Lp مباشرة.
- د) خاطئ — SVM ليست نموذجاً احتمالياً بطبيعتها الأساسية.

### السؤال 9
ماذا يحدث للحد الفاصل إذا حرّكنا نقطة تدريب **ليست** support vector؟
- أ) يتغير الحد الفاصل بالكامل
- ب) لا يتغير الحد الفاصل إطلاقاً
- ج) يتغير الحد الفاصل جزئياً فقط
- د) يعتمد الأمر على قيمة C فقط

**الإجابة الصحيحة: ب**
- أ) خاطئ — هذا يحدث فقط عند تحريك نقطة دعم (support vector).
- ب) صحيح — كما وضّحت شريحة "Moving the non-support vectors has no effect on the decision boundary".
- ج) خاطئ — التأثير صفر تماماً وليس جزئياً.
- د) خاطئ — C لا علاقة له بهذه الحقيقة الهندسية.

### السؤال 10
أي معادلة تمثل الحد الفاصل H نفسه (وليس أحد خطي الهامش)؟
- أ) W·Xi + b = +1
- ب) W·Xi + b = -1
- ج) W·Xi + b = 0
- د) yi(W·Xi + b) = 1

**الإجابة الصحيحة: ج**
- أ) خاطئ — هذه معادلة H2 (خط الهامش لجهة الفئة +1).
- ب) خاطئ — هذه معادلة H1 (خط الهامش لجهة الفئة -1).
- ج) صحيح — هذه المعادلة الأساسية للحد الفاصل H كما وردت في بداية الجزء الرياضي.
- د) خاطئ — هذا هو شرط القيد الموحّد وليس معادلة H نفسها.

### السؤال 11
لماذا نصغّر ‖w‖²/2 بدلاً من تصغير ‖w‖ مباشرة؟
- أ) لأن ‖w‖²/2 تعطي نتيجة مختلفة تماماً عن ‖w‖
- ب) لأن ‖w‖²/2 أسهل رياضياً للاشتقاق وتسمح باستخدام Quadratic Programming بنفس نقطة الحل الأمثل
- ج) لأن ‖w‖ لا يمكن حسابه أصلاً
- د) لأن ‖w‖²/2 تلغي الحاجة للقيود بالكامل

**الإجابة الصحيحة: ب**
- أ) خاطئ — النتيجة (نقطة الحل الأمثل) هي نفسها لأن ‖w‖² دالة متزايدة مع ‖w‖.
- ب) صحيح — هذا هو السبب المذكور صراحة في المحاضرة.
- ج) خاطئ — ‖w‖ يمكن حسابه بسهولة (الجذر التربيعي لـ w·w).
- د) خاطئ — القيود تبقى كما هي؛ فقط الدالة الهدف تُعدَّل.

### السؤال 12
عند استخدام Non-linear SVM بقيمة C كبيرة جداً على بيانات معينة، ولوحظ أن دقة التدريب استمرت بالارتفاع بينما بدأت دقة الاختبار بالانخفاض، فهذا مؤشر على:
- أ) Underfitting
- ب) Overfitting
- ج) خطأ برمجي في الكود
- د) أن البيانات قابلة للفصل خطياً

**الإجابة الصحيحة: ب**
- أ) خاطئ — Underfitting يعني ضعف الأداء على التدريب والاختبار معاً.
- ب) صحيح — ارتفاع دقة التدريب مع انخفاض دقة الاختبار هو التعريف الكلاسيكي للـ Overfitting.
- ج) خاطئ — هذا سلوك متوقع لضبط الـ hyperparameter وليس خطأ برمجياً.
- د) خاطئ — لا علاقة مباشرة؛ الملاحظة تخص Non-linear SVM هنا تحديداً.

### السؤال 13
ما وظيفة معامل `gamma` في `SVC(kernel='rbf', gamma='auto')`؟
- أ) يحدد قيمة C تلقائياً
- ب) يتحكم بمدى تأثير كل نقطة تدريب في تشكيل الحد الفاصل عند استخدام RBF kernel
- ج) يحدد عدد نقاط الدعم مباشرة
- د) يستبدل الحاجة لتحديد kernel بالكامل

**الإجابة الصحيحة: ب**
- أ) خاطئ — C وgamma معاملان منفصلان تماماً.
- ب) صحيح — هذا هو دور gamma في RBF kernel.
- ج) خاطئ — عدد نقاط الدعم نتيجة للحل وليس مضبوطاً مباشرة بـ gamma.
- د) خاطئ — gamma معامل إضافي يُستخدم فقط مع بعض أنواع kernel مثل rbf.

### السؤال 14
أي جملة صحيحة بخصوص العلاقة بين نقاط الدعم ومتجه الأوزان w؟
- أ) w لا علاقة له بنقاط الدعم إطلاقاً
- ب) w = Σ αi yi xi، أي أن w تركيبة خطية من نقاط الدعم فقط (بسبب αi=0 لغيرها)
- ج) w يُحسب فقط من نقطة دعم واحدة بغض النظر عن العدد الكلي
- د) w ثابت دائماً بغض النظر عن بيانات التدريب

**الإجابة الصحيحة: ب**
- أ) خاطئ — العلاقة مباشرة كما في المعادلة.
- ب) صحيح — هذا التعريف الدقيق المذكور في المحاضرة.
- ج) خاطئ — يُحسب من مجموع كل نقاط الدعم (التي αi>0)، وقد تكون أكثر من واحدة.
- د) خاطئ — w يتغير بتغير بيانات التدريب ونتيجة حل مسألة Lagrange.

### السؤال 15
بالرجوع للمثال العددي في المحاضرة (8 نقاط تدريب)، كم عدد نقاط الدعم الفعلية؟
- أ) 8 نقاط (كل النقاط)
- ب) صفر نقاط
- ج) نقطتان فقط
- د) 4 نقاط

**الإجابة الصحيحة: ج**
- أ) خاطئ — 6 من أصل 8 نقاط لها αi = 0.
- ب) خاطئ — يوجد نقطتان بـ αi = 65.5261 ≠ 0.
- ج) صحيح — النقطتان (0.3858, 0.4687) و(0.4871, 0.611) هما فقط اللتان لهما αi غير صفري.
- د) خاطئ — العدد الصحيح هو 2 وليس 4، بحسب الجدول المعطى.

### السؤال 16
أي مما يلي وصف صحيح لسبب استخدام Kernel Trick في Non-linear SVM؟
- أ) لتقليل عدد نقاط التدريب المطلوبة
- ب) لالتقاط علاقات غير خطية بين البيانات دون الحاجة لحساب التحويل لبعد أعلى بشكل صريح
- ج) لجعل حساب b أسرع فقط
- د) لتحويل مسألة التصنيف إلى مسألة تجميع (Clustering)

**الإجابة الصحيحة: ب**
- أ) خاطئ — لا علاقة مباشرة بتقليل حجم بيانات التدريب.
- ب) صحيح — هذا هو الهدف الجوهري لـ Kernel Trick كما شُرح في (شرح زيادة للفهم).
- ج) خاطئ — تأثيره أعمق من مجرد سرعة حساب b.
- د) خاطئ — SVM تبقى خوارزمية تصنيف (Classification) وليست تجميعاً.

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح 1 (النوع: `logic`)
**الكود (يحتوي خطأ):**
```python
from sklearn.svm import SVC
clf = SVC(C=1, kernel='linear')
clf.fit(X_test, Y_test)          # (1) تدريب النموذج
Y_pred = clf.predict(X_test)
```
**اكتشف الخطأ:** النموذج يُدرَّب باستخدام بيانات الاختبار (`X_test`, `Y_test`) بدلاً من بيانات التدريب.
**التصحيح:**
```python
clf.fit(X_train, Y_train)        # التدريب يجب أن يتم على بيانات التدريب فقط
```
**شرح الحل:**
1. الهدف من فصل البيانات إلى Train/Test هو تقييم قدرة النموذج على التعميم على بيانات لم يرها.
2. تدريب النموذج على بيانات الاختبار يجعل مقياس الدقة عليها مضلّلاً (النموذج "رأى" هذه البيانات فعلاً).
3. القاعدة الذهبية: `fit()` دائماً على `X_train, Y_train`، و`predict()` يمكن أن يكون على كليهما لغرض المقارنة.

### سؤال تصحيح 2 (النوع: `misconception`)
**الكود (يحتوي خطأ):**
```python
# نفترض أن كل نقطة بها alpha_i > 0 هي نقطة "غير مهمة" ويمكن حذفها لتسريع الحساب
important_points = [x for x, alpha in zip(X_train, alphas) if alpha == 0]
w = sum(a*y*x for a, y, x in zip(alphas, Y_train, X_train))
```
**اكتشف الخطأ:** الكود يفترض خطأً أن النقاط ذات `alpha == 0` هي "المهمة" ويحتفظ بها، بينما في الحقيقة نقاط الدعم هي التي `alpha > 0`.
**التصحيح:**
```python
important_points = [x for x, alpha in zip(X_train, alphas) if alpha > 0]  # نقاط الدعم الحقيقية
w = sum(a*y*x for a, y, x in zip(alphas, Y_train, X_train))  # يبقى صحيحاً لأن alpha=0 تُلغى نفسها تلقائياً
```
**شرح الحل:**
1. المفهوم الخاطئ الشائع: الخلط بين αi=0 (غير مؤثرة) وαi>0 (نقاط دعم مؤثرة).
2. حساب `w` نفسه صحيح رياضياً حتى بدون الفلترة، لأن حدود αi=0 تُلغي نفسها تلقائياً من المجموع؛ لكن فلترة `important_points` بالشرط الخاطئ تُعطي قائمة معكوسة تماماً.
3. القاعدة: `alpha > 0` ⟺ support vector، وليس العكس.

### سؤال تصحيح 3 (النوع: `wrong_formula` كإحدى صور `return_check`)
**الكود (يحتوي خطأ):**
```python
import numpy as np
w = np.array([-6.64, -9.32])
b = 7.93
def margin_width(w):
    return 1 / np.linalg.norm(w)   # (1) خطأ في صيغة الهامش
```
**اكتشف الخطأ:** الدالة تُرجع `1/‖w‖` بينما عرض الهامش الكامل يجب أن يكون `2/‖w‖` (المسافة من الجهتين معاً).
**التصحيح:**
```python
def margin_width(w):
    return 2 / np.linalg.norm(w)   # الصيغة الصحيحة d = 2/‖w‖
```
**شرح الحل:**
1. `1/‖w‖` هي مسافة نقطة واحدة (إما x1 أو x2) عن الحد الفاصل H فقط.
2. الهامش الكلي d هو مجموع مسافتي الجهتين: `1/‖w‖ + 1/‖w‖ = 2/‖w‖`.
3. هذا خطأ شائع في أسئلة الحساب — احرص دائماً على التمييز بين "نصف الهامش" و"الهامش الكامل".

### سؤال تصحيح 4 (النوع: `dead_code`)
**الكود (يحتوي خطأ):**
```python
from sklearn.svm import SVC
clf = SVC(C=1, kernel='linear')
clf.fit(X_train, Y_train)

if False:                                   # (1) شرط دائماً خاطئ
    clf2 = SVC(C=1, kernel='rbf', gamma='auto')
    clf2.fit(X_train, Y_train)

Y_pred = clf.predict(X_test)
```
**اكتشف الخطأ:** الكود الخاص بتدريب نموذج `rbf` موجود لكنه أبداً لن يُنفَّذ بسبب `if False:` — وهذا كود ميت (dead code) لا فائدة منه.
**التصحيح:**
```python
clf2 = SVC(C=1, kernel='rbf', gamma='auto')  # نُفعّل الكود فعلياً بإزالة الشرط الميت
clf2.fit(X_train, Y_train)
Y_pred2 = clf2.predict(X_test)
```
**شرح الحل:**
1. أي كود داخل `if False:` (أو شرط لا يتحقق أبداً منطقياً) هو كود ميت يجب حذفه أو تفعيله فعلياً حسب الهدف.
2. في سياق المحاضرة، الهدف هو **مقارنة** Linear وNonlinear SVM، لذا يجب أن يُنفَّذ كلا النموذجين فعلياً لا أن يبقى أحدهما معطلاً.
3. القاعدة: أي جزء كود لن يُنفَّذ أبداً هو علامة تحذير يجب مراجعتها قبل تسليم الحل.

### سؤال تصحيح 5 (النوع: `logic`)
**الكود (يحتوي خطأ):**
```python
C = [0.01, 0.1, 1, 10]
SVMtestAcc = []
for param in C:
    clf = SVC(C=param, kernel='linear')
    clf.fit(X_train, Y_train)
    Y_predTest = clf.predict(X_test)
    SVMtestAcc.append(accuracy_score(Y_predTest, Y_predTest))  # (1) خطأ منطقي
```
**اكتشف الخطأ:** السطر الأخير يقارن `Y_predTest` بنفسه بدلاً من مقارنته بـ `Y_test` الحقيقي، مما يجعل الدقة المحسوبة تساوي 1.0 دائماً بشكل مضلّل تماماً.
**التصحيح:**
```python
SVMtestAcc.append(accuracy_score(Y_test, Y_predTest))  # المقارنة الصحيحة: الحقيقي مقابل المتوقع
```
**شرح الحل:**
1. دالة `accuracy_score` يجب أن تستقبل دائماً `(y_true, y_pred)` — القيم الحقيقية أولاً ثم المتوقعة.
2. مقارنة القيمة المتوقعة بنفسها منطقياً ستعطي تطابقاً تاماً (100%) دائماً، بغض النظر عن جودة النموذج الفعلية.
3. هذا خطأ منطقي خطير لأنه لا يُظهر أي رسالة خطأ برمجية (الكود يعمل)، لكنه يُخفي ضعف النموذج الحقيقي تماماً — لذا يجب فحص أسماء المتغيرات بعناية.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل.

### تمرين 1 (`metric_calculation`)
**المعطيات:** نقطة تدريب واحدة x=(1, 2) بفئة y=+1، ومعادلة حد فاصل W=(2, -1)، b=-1.
**المطلوب:**
1. احسب قيمة W·x + b.
2. هل تحقق النقطة الشرط yi(W·xi+b) ≥ 1؟

**نموذج الحل:**
1. W·x + b = (2×1) + (-1×2) + (-1) = 2 - 2 - 1 = -1.
2. yi(W·xi+b) = (+1)×(-1) = -1، وهذا **لا يحقق** الشرط ≥ 1؛ إذن النقطة تقع داخل منطقة الهامش أو في الجهة الخاطئة (نموذج غير صالح لهذه النقطة بهذه المعاملات).

### تمرين 2 (`fill_gaps`)
**الكود الناقص:**
```python
from sklearn.svm import SVC
clf = _______(C=1, kernel='rbf', gamma='auto')  # (1)
clf.fit(X_train, Y_train)
Y_pred = clf._______(X_test)                     # (2)
```
**المطلوب:** أكمل الفراغين (1) و(2).

**نموذج الحل:**
1. `SVC`
2. `predict`

### تمرين 3 (`code_fix`)
**الكود (يحتوي مشكلة أداء وليست خطأ منطقياً):**
```python
C = [0.01, 0.1, 1, 10]
for param in C:
    clf = SVC(C=param, kernel='linear')
    clf.fit(X_train, Y_train)
    print(accuracy_score(Y_train, clf.predict(X_train)))
    print(accuracy_score(Y_test, clf.predict(X_test)))
```
**المطلوب:** أعد كتابة الكود بحيث يخزّن النتائج في قائمتين (`SVMtrainAcc`, `SVMtestAcc`) بدلاً من طباعتها فقط، تمهيداً لرسمها لاحقاً.

**نموذج الحل:**
```python
SVMtrainAcc = []
SVMtestAcc = []
for param in C:
    clf = SVC(C=param, kernel='linear')
    clf.fit(X_train, Y_train)
    SVMtrainAcc.append(accuracy_score(Y_train, clf.predict(X_train)))
    SVMtestAcc.append(accuracy_score(Y_test, clf.predict(X_test)))
```

### تمرين 4 (`scenario`)
**السيناريو:** لديك بيانات تصنيف ثنائي، وبعد تجربة Linear SVM بقيم C مختلفة، وجدت أن دقة التدريب والاختبار كلاهما تدور حول 0.55 بغض النظر عن C.
**المطلوب:**
1. ما التفسير الأرجح لهذه النتيجة؟
2. ما الحل المقترح؟

**نموذج الحل:**
1. البيانات على الأغلب **غير قابلة للفصل خطياً (non-linearly separable)**؛ لذلك لا يستطيع أي خط مستقيم (بغض النظر عن C) تحقيق دقة عالية.
2. الحل: التبديل إلى `kernel='rbf'` (أو kernel غير خطي آخر مناسب) وتجربة قيم C وgamma مختلفة معه.

### تمرين 5 (`metric_calculation`)
**المعطيات:** w = (-6.64, -9.32)، b = 7.93 (من المثال العددي في المحاضرة). نقطة اختبار جديدة x=(0.5, 0.5).
**المطلوب:** احسب W·x + b وحدد تصنيف النقطة (فئة +1 أو -1).

**نموذج الحل:**
$$
W \cdot x + b = (-6.64)(0.5) + (-9.32)(0.5) + 7.93 = -3.32 - 4.66 + 7.93 = -0.05
$$
بما أن القيمة سالبة (تقريباً تساوي -0.05، أي قريبة جداً من الحد الفاصل لكنها في الجانب السالب)، فإن **التصنيف المتوقع هو الفئة -1** (لأن القاعدة العامة: إذا كانت W·x+b < 0 فالفئة -1، وإذا كانت > 0 فالفئة +1).

### تمرين 6 (`model_apply`)
**السيناريو:** لديك مجموعة بيانات جديدة تحتوي 3 ميزات (features) بدلاً من ميزتين.
**المطلوب:** صف كيف يتغيّر شكل الحد الفاصل (Hyperplane) في هذه الحالة مقارنة بالحالة ثنائية الأبعاد.

**نموذج الحل:** بدلاً من أن يكون الحد الفاصل خطاً مستقيماً (2D)، سيصبح **مستوياً (plane)** في الفضاء ثلاثي الأبعاد (3D)؛ والمعادلة العامة تبقى نفسها W·X+b=0 لكن X وW يصبحان متجهات بثلاث مركبات كل منهما (w0+w1x1+w2x2+w3x3=0 مثلاً).

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: `diagram_completion`
**السيناريو:** أمامك مخطط ناقص لخطوات بناء Hard-margin SVM بدءاً من البيانات وحتى الحد الفاصل النهائي.
**المطلوب:**
1. أكمل الخطوة الناقصة بين "حساب αi عبر Lagrange" و"بناء معادلة الحد الفاصل النهائي".

**نموذج الحل:** الخطوة الناقصة هي: **"استخراج نقاط الدعم (النقاط التي αi > 0) ثم حساب w=Σαiyixi وb من معادلات نقاط الدعم"** — وهذه هي الحلقة الوسطى الضرورية قبل الوصول لمعادلة الحد الفاصل.

### تمرين 2: `table_fill`
**السيناريو:** جدول Confusion Matrix ناقص لنموذج SVM على بيانات اختبار (100 عينة):

| | متوقع: فئة +1 | متوقع: فئة -1 |
| --- | --- | --- |
| **فعلي: فئة +1** | 40 | ؟ |
| **فعلي: فئة -1** | ؟ | 45 |

علماً أن إجمالي العينات الفعلية من الفئة +1 هو 50، وإجمالي العينات الفعلية من الفئة -1 هو 50.
**المطلوب:** أكمل الجدول واحسب `Accuracy` و`Precision` (للفئة +1) و`F1`.

**نموذج الحل:**
- الخانة الناقصة (فعلي +1، متوقع -1) = 50 - 40 = 10 (False Negative).
- الخانة الناقصة (فعلي -1، متوقع +1) = 50 - 45 = 5 (False Positive).
- `Accuracy` = (40+45)/100 = 0.85
- `Precision` (للفئة +1) = TP/(TP+FP) = 40/(40+5) = 0.888
- `Recall` (للفئة +1) = TP/(TP+FN) = 40/(40+10) = 0.8
- `F1` = 2×(Precision×Recall)/(Precision+Recall) = 2×(0.888×0.8)/(0.888+0.8) ≈ 0.842

### تمرين 3: `case_study`
**السيناريو:** فريق تطوير طبّق Linear SVM على بيانات "تصنيف بريد مزعج (Spam)" فحصل على دقة اختبار 0.60 فقط، بينما زميل آخر طبّق Non-linear SVM (RBF) على نفس البيانات وحصل على دقة 0.91.
**المطلوب:**
1. فسّر الفارق الكبير بين النتيجتين.
2. اقترح إجراءً إضافياً واحداً للتأكد من أن النموذج الثاني (RBF) لا يعاني من Overfitting.

**نموذج الحل:**
1. على الأغلب أن حدود الفصل الحقيقية بين رسائل السبام وغير السبام **غير خطية** (كلمات ومزيج ميزات معقّد)؛ فـ RBF التقط هذا التعقيد بينما Linear SVM لم يستطع.
2. مقارنة دقة التدريب مقابل الاختبار للنموذج RBF؛ إن كانت الفجوة كبيرة (تدريب مرتفع جداً واختبار أقل بكثير)، فهذا مؤشر Overfitting، ويُنصح باستخدام Cross-validation لضبط C وgamma بدقة أكبر.

### تمرين 4: `written_analysis`
**المطلوب:** اكتب فقرة (3-4 جمل) تشرح لماذا يُعتبر اختيار الـ Kernel المناسب أهم أحياناً من ضبط قيمة C وحدها.

**نموذج الحل:** الـ Kernel يحدد "شكل" الحد الفاصل الذي يمكن للنموذج أن يتعلمه أصلاً — فإذا كانت البيانات غير قابلة للفصل خطياً، فإن Linear kernel محدود بنيوياً بغض النظر عن قيمة C، لأن C يضبط فقط مقدار التسامح مع الأخطاء ضمن نفس الشكل الخطي للحد الفاصل. أما تغيير الـ Kernel (مثلاً إلى RBF) فيغيّر الفرضية الأساسية للنموذج بالكامل ويسمح بحدود منحنية. لذلك، تجربة Kernel مختلف غالباً تُحدث قفزة أكبر في الأداء من مجرد ضبط C ضمن نفس الـ Kernel الخطي، كما ظهر عملياً في مثال المحاضرة (دقة قفزت من ~0.6 إلى ~0.74).

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: حساب w وb لمجموعة بيانات صغيرة
**المدخل:**
```python
# نقطتا دعم فقط بـ alpha غير صفري
points = [
    {"x": (1.0, 1.0), "y": 1,  "alpha": 10.0},
    {"x": (2.0, 0.0), "y": -1, "alpha": 10.0},
]
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب w1 = Σ αi yi xi1 | ؟ |
| 2 | حساب w2 = Σ αi yi xi2 | ؟ |
| 3 | حساب b من النقطة الأولى | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | w1 = (10×1×1.0) + (10×-1×2.0) = 10 - 20 | w1 = -10 |
| 2 | w2 = (10×1×1.0) + (10×-1×0.0) = 10 - 0 | w2 = 10 |
| 3 | b = 1 - (w·x1) = 1 - ((-10×1.0)+(10×1.0)) = 1 - 0 | b = 1 |

**النتيجة:** w = (-10, 10)، b = 1، والحد الفاصل: -10x1 + 10x2 + 1 = 0.

### تمرين تتبع 2: تتبّع تأثير تغيير C على Overfitting (مفاهيمي)
**المدخل:**
```python
C_values = [0.01, 1, 100]
# ملاحظات دقة افتراضية لنموذج rbf
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| C | دقة التدريب (تقريبية) | دقة الاختبار (تقريبية) | التفسير |
| --- | --- | --- | --- |
| 0.01 | 0.60 | 0.58 | ؟ |
| 1 | 0.78 | 0.74 | ؟ |
| 100 | 0.95 | 0.65 | ؟ |

**نموذج الحل:**
| C | دقة التدريب | دقة الاختبار | التفسير |
| --- | --- | --- | --- |
| 0.01 | 0.60 | 0.58 | تنظيم قوي جداً (Underfitting بسيط) — النموذج بسيط جداً |
| 1 | 0.78 | 0.74 | توازن جيد نسبياً بين التدريب والاختبار |
| 100 | 0.95 | 0.65 | تنظيم ضعيف جداً — Overfitting واضح (فجوة كبيرة بين التدريب والاختبار) |

**النتيجة:** أفضل قيمة من بين الثلاثة هي C=1 لأنها توازن الأداء دون فجوة كبيرة.

### تمرين تتبع 3: تحديد نقاط الدعم من جدول αi
**المدخل:**
```python
alphas = [65.5261, 65.5261, 0, 0, 0, 0, 0, 0]
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| رقم النقطة | قيمة αi | هل هي support vector؟ |
| --- | --- | --- |
| 1 | 65.5261 | ؟ |
| 2 | 65.5261 | ؟ |
| 3-8 | 0 | ؟ |

**نموذج الحل:**
| رقم النقطة | قيمة αi | هل هي support vector؟ |
| --- | --- | --- |
| 1 | 65.5261 | نعم (αi > 0) |
| 2 | 65.5261 | نعم (αi > 0) |
| 3-8 | 0 | لا (αi = 0) |

**النتيجة:** فقط النقطتان الأولى والثانية هما نقطتا الدعم، مطابقاً تماماً لما ورد في المثال العددي بالمحاضرة.

### تمرين تتبع 4: التحقق من تحقق القيد لنقطة تدريب
**المدخل:**
```python
W = (2, -1); b = -1
point = {"x": (1, 2), "y": 1}
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب W·x + b | ؟ |
| 2 | حساب yi × (W·x+b) | ؟ |
| 3 | هل الشرط ≥ 1 محقق؟ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | W·x + b = (2×1)+(-1×2)+(-1) = -1 | -1 |
| 2 | yi×(W·x+b) = 1×(-1) = -1 | -1 |
| 3 | -1 ≥ 1 ؟ | لا، الشرط غير محقق |

**النتيجة:** هذه النقطة تنتهك قيد Hard-margin SVM؛ في حالة Hard-margin هذا يعني عدم صلاحية معاملات (W, b) الحالية لهذه البيانات، وفي حالة Soft-margin هذا يعني حاجة لمتغير ξi موجب لتعويض هذا الانتهاك.

### تمرين تتبع 5: مقارنة Linear وNon-linear عبر قيم C (تتبع نتائج تجريبية)
**المدخل:**
```python
C_list = [0.01, 0.1, 1, 10, 50]
# Linear SVM test accuracies (تقريبية من شكل المحاضرة): تبقى قريبة من 0.595 لكل القيم
# RBF SVM test accuracies (تقريبية من شكل المحاضرة): ترتفع ثم تنخفض قليلاً
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| C | Linear Test Acc | RBF Test Acc |
| --- | --- | --- |
| 0.01 | ؟ | ؟ |
| 1 | ؟ | ؟ |
| 50 | ؟ | ؟ |

**نموذج الحل:**
| C | Linear Test Acc | RBF Test Acc |
| --- | --- | --- |
| 0.01 | ≈0.595 (شبه ثابتة) | ≈0.48 (أقل من Linear هنا لأن التنظيم قوي جداً يمنع النموذج من التعلم) |
| 1 | ≈0.595 | ≈0.74 (أعلى قيمة تقريباً) |
| 50 | ≈0.595 | ≈0.675 (بدأت بالانخفاض بسبب Overfitting) |

**النتيجة:** Linear SVM لا يتأثر عملياً بتغيير C لأن المشكلة بنيوية (البيانات غير خطية)، بينما RBF SVM حساس جداً لقيمة C وله نقطة مثلى (هنا قريبة من C=1).

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### السؤال 1: ما هو الـ Hyperplane في سياق SVM؟
**نموذج الإجابة:** 1. التعريف: هو الحد الفاصل الذي يفصل بين فئتين من البيانات، مُعرَّف بالمعادلة W·X+b=0. 2. المكونات/الشروط: يتكون من متجه الأوزان W ومعامل الانحياز b؛ في 2D هو خط، في 3D مستوٍ، وفي n بُعد فضاء فرعي بعده n-1. 3. مثال رقمي: في 2D، w0+w1x1+w2x2=0. 4. متى نستخدم: أي مسألة تصنيف ثنائي بفرض قابلية الفصل الخطي (أو باستخدام Kernel لغير الخطي).

### السؤال 2: عرّف الـ Margin ولماذا نسعى لتعظيمه؟
**نموذج الإجابة:** 1. التعريف: المسافة بين خطي الهامش الملاصقين لأقرب نقاط كل فئة (H1، H2). 2. المكونات: d=2/‖w‖. 3. مثال رقمي: عند w=(-6.64,-9.32)، d=2/‖(-6.64,-9.32)‖. 4. متى نستخدم: نعظّمه دائماً في SVM لأن الهامش الأوسع يعني نموذجاً أقل حساسية للضجيج وأفضل تعميماً على بيانات جديدة.

### السؤال 3: ما هي نقاط الدعم (Support Vectors) ولماذا هي مهمة؟
**نموذج الإجابة:** 1. التعريف: نقاط التدريب التي قيمة αi الخاصة بها أكبر من صفر وتقع على خطوط الهامش H1/H2. 2. المكونات: تُحسب عبر حل مسألة Lagrange؛ الشرط الدقيق αi>0. 3. مثال رقمي: في المثال العددي، فقط نقطتان من أصل 8 كانتا نقاط دعم. 4. متى نستخدم: هي التي تحدد w وb بالكامل، وأي تغيير فيها يغيّر الحد الفاصل، بينما تغيير أي نقطة أخرى لا يؤثر إطلاقاً.

### السؤال 4: اشرح الفرق بين Hard-margin وSoft-margin SVM.
**نموذج الإجابة:** 1. التعريف: Hard-margin يفترض فصلاً تاماً بدون أخطاء؛ Soft-margin يسمح بأخطاء محدودة عبر متغيرات ξi. 2. المكونات: Hard-margin شرطه yi(W·xi+b)≥1 لكل نقطة بدون استثناء؛ Soft-margin شرطه yi(W·xi+b)≥1-ξi مع ξi≥0. 3. مثال رقمي: صيغة sklearn العملية min ‖w‖²/2 + (1/C)Σξi تجسّد Soft-margin. 4. متى نستخدم: Hard-margin نظرياً للبيانات المثالية القابلة للفصل التام؛ Soft-margin عملياً لأغلب بيانات العالم الحقيقي.

### السؤال 5: ما دور مضاعفات لاغرانج (αi) في حل مسألة SVM؟
**نموذج الإجابة:** 1. التعريف: متغيرات مساعدة (αi≥0) تُدخَل لكل قيد من قيود مسألة التحسين لتحويلها لصيغة قابلة للحل. 2. المكونات: تظهر في الدالة المساعدة Lp = ½‖w‖² − Σαi(yi(W·xi+b)−1). 3. مثال رقمي: αi=65.5261 لنقطتي الدعم في المثال العددي، وαi=0 للباقي. 4. متى نستخدم: دائماً عند حل SVM عبر أسلوب Lagrange/Quadratic Programming، سواء يدوياً أو داخلياً في مكتبات مثل sklearn.

### السؤال 6: كيف تُحسب معاملات w وb بعد إيجاد αi؟
**نموذج الإجابة:** 1. التعريف: بعد حل مسألة Lagrange نحصل على αi لكل نقطة، ثم نحسب w وb مباشرة. 2. المكونات: W=Σαiyixi (تركيبة خطية من نقاط الدعم فقط)، وb=avg(F(xi)−W·xi) لكل نقطة دعم. 3. مثال رقمي: من المثال العددي، W=(-6.64,-9.32) وb≈7.93. 4. متى نستخدم: هذه الخطوة النهائية بعد استخراج نقاط الدعم، وهي التي تنتج معادلة الحد الفاصل الجاهزة للاستخدام في التصنيف.

### السؤال 7: لماذا تُعد مسألة SVM "مسألة تحسين محدّبة (Convex)" وما أهمية ذلك؟
**نموذج الإجابة:** 1. التعريف: مسألة تحسين تكون فيها الدالة الهدف تربيعية والقيود خطية، ما يجعل شكل المسألة "محدّباً" هندسياً. 2. المكونات: الدالة الهدف ‖w‖²/2 (تربيعية)، القيود yi(W·xi+b)-1≥0 (خطية). 3. مثال رقمي: لا يوجد حل محلي "خاطئ" يمكن الوقوع فيه أثناء البحث. 4. متى نستخدم: هذه الخاصية مهمة لأنها تضمن أن أي حل نجده عبر Lagrange multiplier هو الحل الأمثل الشامل (global optimum) وليس مجرد حل محلي.

### السؤال 8: صف كيف يعمل Kernel Trick في Non-linear SVM ولماذا هو مفيد.
**نموذج الإجابة:** 1. التعريف: تقنية رياضية تحسب "التشابه" بين نقطتين كما لو كانتا محوّلتين لبعد أعلى، دون حساب ذلك التحويل صراحة. 2. المكونات: دوال kernel شائعة مثل RBF (Gaussian Radial Basis Function)؛ في sklearn يُحدَّد عبر `kernel='rbf'`. 3. مثال رقمي: تحسّن دقة الاختبار من ~0.595 (Linear) إلى ~0.74 (RBF) في مثال المحاضرة. 4. متى نستخدم: عندما تكون البيانات غير قابلة للفصل خطياً في فضائها الأصلي.

### السؤال 9: ما هو دور الـ hyperparameter C وكيف يؤثر على النموذج؟
**نموذج الإجابة:** 1. التعريف: معامل يتحكم في عكس قوة التنظيم (Regularization) في الصيغة العملية لـ SVM. 2. المكونات: يظهر في الصيغة min ‖w‖²/2 + (1/C)Σξi؛ قيمة C صغيرة = تنظيم أقوى (هامش أوسع، تسامح أكبر مع الأخطاء)، وقيمة C كبيرة = تنظيم أضعف. 3. مثال رقمي: عند C=50 في المثال العملي لـ RBF، بدأت دقة الاختبار بالانخفاض رغم ارتفاع دقة التدريب (Overfitting). 4. متى نستخدم: نضبط C عبر التجربة (كما في حلقة for بالكود) أو عبر Cross-validation لإيجاد التوازن الأمثل.

### السؤال 10: ما الفرق العملي بين "الحد الفاصل H" و"خطي الهامش H1، H2"؟
**نموذج الإجابة:** 1. التعريف: H هو الحد الفاصل الفعلي المستخدم للتصنيف (W·X+b=0)؛ H1 وH2 خطان متوازيان له يحددان حدود منطقة الهامش فقط (لا يُستخدمان مباشرة للتصنيف). 2. المكونات: H2: W·X+b=+1، H1: W·X+b=-1، بينما H بينهما تماماً. 3. مثال رقمي: في المثال العددي، معادلة H هي -6.64x1-9.32x2+7.93=0، وH1، H2 تكونان بإضافة/طرح 1 من الطرف الأيمن بعد التطبيع المناسب. 4. متى نستخدم: H1، H2 تُستخدمان فقط أثناء اشتقاق ووصف مفهوم الـ Margin؛ التصنيف الفعلي يعتمد فقط على إشارة W·X+b بالنسبة لـ H.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Decision Tree / Naive Bayes / kNN (تصنيف أخرى) | SVM | جميعها طرق Classification تُقارَن عبر Accuracy/Precision/Recall/F1 |
| Regression (Gradient Descent) | SVM | كلاهما يستخدم مسألة تحسين (Optimization) لإيجاد معاملات النموذج |
| Ensemble Methods | SVM | يمكن استخدام SVM كنموذج أساسي (base learner) داخل Bagging/Boosting |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| الهدف | تعظيم الهامش d=2/‖w‖ عبر تصغير ‖w‖²/2 |
| نقاط الدعم | فقط النقاط ذات αi>0 تحدد الحد الفاصل |
| C | يتحكم في التوازن بين اتساع الهامش والسماح بالأخطاء |
| Kernel | RBF يسمح بحدود فصل غير خطية عبر Kernel Trick |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `W·X+b=0` | معادلة الحد الفاصل H | تعريف SVM الأساسي |
| `d=2/‖w‖` | عرض الهامش | تعظيم الهامش |
| `αi` | مضاعف لاغرانج | تحديد نقاط الدعم |
| `C` | hyperparameter التنظيم | ضبط التوازن بين الهامش والأخطاء |
| `kernel='rbf'` | دالة نواة غاوسية | Non-linear SVM في sklearn |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | تصغير ‖w‖ ⟺ تكبير الهامش (علاقة عكسية). |
| 2 | αi>0 ⟺ support vector؛ αi=0 ⟺ نقطة غير مؤثرة. |
| 3 | دقة منخفضة وثابتة مع Linear SVM بغض النظر عن C ⟵ جرّب Kernel غير خطي. |
| 4 | فجوة كبيرة بين دقة التدريب والاختبار ⟵ Overfitting، جرّب تصغير C. |
| 5 | `accuracy_score(y_true, y_pred)` — الترتيب الصحيح للمعاملات دائماً. |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الفرق بين `Classification` و`Clustering`؟
A: `Classification` تصنيف موسوم (Supervised) بفئات معروفة مسبقاً (مثل SVM)، بينما `Clustering` تجميع غير موسوم (Unsupervised) يكتشف مجموعات دون فئات معروفة مسبقاً.

---

**Q2:** ما تعريف الـ `Hyperplane` في SVM؟
A: الحد الفاصل بين الفئات، معادلته W·X+b=0؛ خط في 2D، مستوٍ في 3D.

---

**Q3:** ما هو `Support Vector`؟
A: نقطة تدريب تقع على خط الهامش (H1 أو H2) وقيمة αi الخاصة بها أكبر من صفر.

---

**Q4:** ما صيغة عرض الـ `Margin`؟
A: d = 2/‖w‖.

---

**Q5:** ما الفرق بين `Hard-margin` و`Soft-margin` SVM؟
A: Hard-margin يفترض فصلاً تاماً بدون أخطاء؛ Soft-margin يسمح ببعض الأخطاء عبر متغيرات ξi.

---

**Q6:** متى نستخدم `Non-linear SVM`؟
A: عندما تكون البيانات غير قابلة للفصل خطياً، فنستخدم Kernel مثل RBF لالتقاط حدود منحنية.

---

**Q7:** ما دور `Lagrange Multiplier (αi)`؟
A: متغير مساعد لكل نقطة تدريب يُستخدم لحل مسألة التحسين المقيّد؛ αi>0 يعني أن النقطة support vector.

---

**Q8:** كيف تُحسب w من نقاط الدعم؟
A: W = Σ αi yi xi (تركيبة خطية من نقاط الدعم فقط).

---

**Q9:** ما وظيفة الـ hyperparameter `C`؟
A: يتحكم في عكس قوة التنظيم؛ C صغير = تنظيم أقوى (هامش أوسع)، C كبير = تنظيم أضعف (أخطاء أقل مسموحة).

---

**Q10:** ماذا يحدث لو حرّكنا نقطة ليست support vector؟
A: لا يتغير الحد الفاصل إطلاقاً.

---

**Q11:** ما اسم دالة Kernel المستخدمة في مثال Non-linear SVM بالمحاضرة؟
A: `Gaussian Radial Basis Function (RBF)`.

---

**Q12:** ما نوع مسألة التحسين في SVM (Hard-margin)؟
A: مسألة تحسين محدّبة (Convex) بدالة هدف تربيعية وقيود خطية، تُحل بـ Lagrange multiplier.

---

**Q13:** لماذا نصغّر ‖w‖²/2 بدلاً من ‖w‖ مباشرة؟
A: لأنها أسهل رياضياً للاشتقاق وتسمح باستخدام Quadratic Programming بنفس نتيجة الحل الأمثل.

---

**Q14:** ما العلامة الكلاسيكية على Overfitting عند تجربة قيم C مختلفة مع RBF SVM؟
A: ارتفاع مستمر في دقة التدريب مقابل بدء انخفاض دقة الاختبار بعد قيمة معينة من C.

---

**Q15:** في مثال المحاضرة العددي (8 نقاط)، كم نقطة دعم وُجدت؟
A: نقطتان فقط (اللتان لهما αi=65.5261، والباقي αi=0).

---

**Q16:** ما الفرق بين معادلة H ومعادلتي H1، H2؟
A: H: W·X+b=0 (الحد الفاصل الفعلي)؛ H2: W·X+b=+1؛ H1: W·X+b=-1 (حدود الهامش من الجهتين).

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> الكود الكامل مجمّع من جميع أجزاء المحاضرة — مرجع للطالب، لا شرح جديد.

```python
# === Data Preprocessing ===
# (لم يرد كود تحضير بيانات صريح في هذه المحاضرة تحديداً؛ البيانات مفترضة جاهزة كـ X_train, X_test, Y_train, Y_test)

# === Classification: Linear SVM ===
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

%matplotlib inline
C = [0.01, 0.1, 0.2, 0.5, 0.8, 1, 5, 10, 20, 50]
SVMtrainAcc = []
SVMtestAcc = []

for param in C:
    clf = SVC(C=param, kernel='linear')
    clf.fit(X_train, Y_train)
    Y_predTrain = clf.predict(X_train)
    Y_predTest = clf.predict(X_test)
    SVMtrainAcc.append(accuracy_score(Y_train, Y_predTrain))
    SVMtestAcc.append(accuracy_score(Y_test, Y_predTest))

plt.plot(C, SVMtrainAcc, 'ro-', C, SVMtestAcc, 'bv--')
plt.legend(['Training Accuracy', 'Test Accuracy'])
plt.xlabel('C')
plt.xscale('log')
plt.ylabel('Accuracy')

# === Classification: Non-linear SVM (RBF Kernel) ===
from sklearn.svm import SVC

C = [0.01, 0.1, 0.2, 0.5, 0.8, 1, 5, 10, 20, 50]
SVMtrainAcc = []
SVMtestAcc = []

for param in C:
    clf = SVC(C=param, kernel='rbf', gamma='auto')
    clf.fit(X_train, Y_train)
    Y_predTrain = clf.predict(X_train)
    Y_predTest = clf.predict(X_test)
    SVMtrainAcc.append(accuracy_score(Y_train, Y_predTrain))
    SVMtestAcc.append(accuracy_score(Y_test, Y_predTest))

plt.plot(C, SVMtrainAcc, 'ro-', C, SVMtestAcc, 'bv--')
plt.legend(['Training Accuracy', 'Test Accuracy'])
plt.xlabel('C')
plt.xscale('log')
plt.ylabel('Accuracy')
```

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع كتابة معادلة الحد الفاصل W·X+b=0 وأشرح كل رمز فيها.
- [ ] أستطيع اشتقاق أن d=2/‖w‖ من معادلتي H1 وH2.
- [ ] أفهم لماذا تصغير ‖w‖²/2 يعادل تعظيم الهامش.
- [ ] أستطيع تحديد نقاط الدعم من جدول قيم αi.
- [ ] أستطيع حساب w وb يدوياً من نقاط دعم معطاة (كما في المثال العددي).
- [ ] أفرّق بوضوح بين Hard-margin وSoft-margin SVM.
- [ ] أفهم متى ولماذا نستخدم Non-linear SVM وKernel (RBF).
- [ ] أفهم دور الـ hyperparameter C وأثره على Overfitting/Underfitting.
- [ ] أستطيع كتابة كود `SVC` بكل من `kernel='linear'` و`kernel='rbf'`.
- [ ] أستطيع تفسير منحنى Accuracy مقابل C وتحديد علامات Overfitting منه.
- [ ] أستطيع حساب Confusion Matrix ومنها Accuracy/Precision/Recall/F1.
- [ ] راجعت جميع أسئلة MCQ وتصحيح الكود وفهمت تعليل كل خيار.
- [ ] راجعت بطاقات Q&A وتمارين التتبع كاملة.

---

<!-- VALIDATION: هذا الدليل مبني حصراً على محتوى شرائح محاضرة "Basic Classification Techniques — Support Vector Machines (SVM)" (الشرائح 46–74) المرفقة من المستخدم. تم تغطية جميع النقاط الواردة في الشرائح: مقدمة SVM وتطبيقاتها، أنواع SVM (Linear: Hard-margin/Soft-margin، وNon-linear)، فكرة الـ Hyperplane والـ Margin والـ Margin Hyperplanes، Support Vectors وخصائصها، الصياغة الرياضية الكاملة لـ Hard-margin Linear SVM (المعادلات، القيود، Lagrange multipliers، حساب w وb)، المثال العددي الكامل بالجدول والحسابات، وأخيراً التطبيق العملي بمكتبة scikit-learn لكل من Linear وNon-linear (RBF) SVM مع نتائج المقارنة. تم إضافة تمارين وأسئلة إضافية (موسومة بوضوح كـ "من إعداد الدليل") لتلبية متطلبات العدد الأدنى المطلوب في البرومبت (16 MCQ، 5 تصحيح كود، تمارين تطبيقية وتحليلية وتتبع، 10 أسئلة نظرية، 16 بطاقة Q&A)، وجميعها مبنية منطقياً على المفاهيم والمعادلات والأمثلة الرقمية الواردة فعلياً في شرائح المحاضرة دون افتراض معلومات خارجة عن نطاقها. -->
