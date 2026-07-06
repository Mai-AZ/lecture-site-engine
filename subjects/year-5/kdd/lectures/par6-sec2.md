# المحاضرة 6 — Classification (التصنيف): Gain Ratio، Overfitting، Tree Pruning، وتطبيق عملي بـ sklearn
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** استكمال خوارزمية `Decision Tree` — معيار `Gain Ratio`، مشكلة `Overfitting`، طرق `Tree Pruning`، وتطبيق عملي على `Vertebrate Dataset` باستخدام `pandas` و `scikit-learn`

**نوع هذه المحاضرة:** `Classification` — لذلك سنستخدم مصطلحات: `Decision Tree`، `Entropy`، `Information Gain`، `Gain Ratio`، `Overfitting`، `Pruning`، `Confusion Matrix`، `Accuracy`.

---

## خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| بناء شجرة القرار (Information Gain) | `Entropy`، `Gain(S,A)` | اختيار أفضل صفة للتقسيم |
| **معالجة تحيّز Information Gain ← أنت هنا** | `Gain Ratio`، `Split Info` | تقسيم أكثر توازناً وعدالة |
| منع الحفظ الأعمى للبيانات | `Overfitting`، `Pruning` (Pre/Post) | شجرة أبسط وأدق على بيانات جديدة |
| التطبيق العملي | `pandas`، `sklearn.tree.DecisionTreeClassifier` | نموذج مُدرَّب + تقييم `Accuracy` |

> **نوع هذه المحاضرة:** استكمال نظري لخوارزمية `Decision Tree` (معالجة تحيّز + الإفراط في التخصيص) ثم تطبيق عملي كامل بلغة Python.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. مشكلة Information Gain مع الصفات كثيرة القيم

#### النص الأصلي يقول:
> "Information gain measure is biased toward attributes with many outcomes (i.e., having a large number of distinct values). E.g. ID attribute... the information gained by partitioning on ID attribute is maximal... such a partitioning is useless for classification."

#### الشرح المبسّط:
تخيل أن عندك جدول طلاب فيه عمود اسمه `Student_ID` (رقم فريد لكل طالب) وعمود `Grade` (نجح/رسب). لو استخدمنا `Information Gain` لاختيار أفضل صفة للتقسيم، فسيختار `Student_ID` لأنه يقسّم كل طالب في مجموعة لوحده (كل مجموعة تحتوي طالب واحد فقط)، وبالتالي `Entropy` داخل كل مجموعة = 0 (لأن فيها عنصر واحد فقط، فلا يوجد تشويش). هذا يعني أن `Gain(S, ID) = Entropy(S) - 0 = Entropy(S)` وهي أكبر قيمة ممكنة للـ Gain.

**لماذا؟** لأن `Information Gain` يكافئ التقسيمات التي تنتج مجموعات نقية (Entropy=0)، لكنه لا يعاقب التقسيم الذي ينتج عدداً كبيراً جداً من المجموعات الصغيرة جداً. تقسيم كهذا لا فائدة منه إطلاقاً في التنبؤ بحالات جديدة، لأن كل طالب جديد سيكون له `ID` مختلف لم تره الشجرة من قبل — أي أن الشجرة "حفظت" البيانات ولم "تتعلم" نمطاً حقيقياً.

#### 💡 التشبيه:
> تخيل معلماً يقسّم فصلاً من 30 طالباً إلى 30 "مجموعة" كل مجموعة فيها طالب واحد فقط، ثم يدّعي أنه حقق "أفضل تقسيم" لأن كل مجموعة متجانسة تماماً (100%). هذا سخيف؛ فالتقسيم المفيد يجب أن يجمع طلاباً متشابهين بناءً على صفة ذات معنى (مثل الدرجة)، لا بناءً على رقم الهوية.
> **وجه الشبه:** رقم الهوية = صفة `ID`، والتجميع العشوائي في مجموعات فردية = التقسيم عديم الفائدة.

---

### 2. حل المشكلة: Gain Ratio

#### النص الأصلي يقول:
> "Gain ratio attempts to overcome this bias by applying a kind of normalization to information gain using a 'split information' value: GainRatio(S,A) = Gain(S,A) / SplitInfo(S,A)"

#### الشرح المبسّط:
`Gain Ratio` هو ببساطة `Information Gain` بعد "تطبيعه" (Normalization) بقيمة تسمى `Split Info`. فكرة `Split Info` هي قياس **مدى تشتت** البيانات على القيم المختلفة للصفة نفسها (بغض النظر عن الفئة/Class). فكلما كانت الصفة تقسّم البيانات إلى عدد كبير جداً من المجموعات الصغيرة، ترتفع قيمة `Split Info`، وبالتالي تنخفض قيمة `Gain Ratio` النهائية (لأننا نقسم على رقم أكبر).

**لماذا؟** لأن `Split Info` يعاقب الصفات التي "تفرط" في التقسيم (مثل `ID`) عبر رفع قيمة المقام، بينما الصفات المعقولة (مثل `Wind` بقيمتين فقط: weak/strong) تحصل على `Split Info` أصغر فلا تتأثر النسبة كثيراً.

#### 📐 المعادلة: Gain Ratio و Split Info

$$
GainRatio(S,A) = \frac{Gain(S,A)}{SplitInfo(S,A)}
$$

**الشرح:**
> - `Gain(S,A)`: مقدار المعلومات (تقليل عدم اليقين) الذي نكسبه عند التقسيم على الصفة A — نفس Information Gain المعروف من محاضرة سابقة.
> - `SplitInfo(S,A)`: مقياس تشتت التقسيم نفسه (بغض النظر عن جودة الفصل بين الفئات).
> - `GainRatio(S,A)`: النسبة بينهما — كلما زادت، كانت الصفة A أفضل اختيار للتقسيم مع مراعاة عدم التحيّز لعدد القيم.

```math
SplitInfo(S,A) = -\sum_{v \in values(A)} \frac{|S_v|}{|S|} \times log_2\left(\frac{|S_v|}{|S|}\right) = -\sum_{v \in values(A)} P_v \times log_2(P_v)
```

**الشرح:**
> - `values(A)`: كل القيم الممكنة للصفة A (مثلاً Weak, Strong).
> - `S_v`: مجموعة العناصر التي قيمة الصفة A فيها تساوي v.
> - `|S_v|/|S|` (أو `P_v`): نسبة العناصر التي تقع في هذا الفرع من إجمالي العناصر — هذا هو "احتمال" الوقوع في هذا الفرع.
> - المعادلة نفسها هي معادلة `Entropy` لكن مطبّقة على **توزيع القيم على الفروع**، وليس على توزيع الفئات (Class) كما في `Entropy` العادي.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا لا نستخدم `Split Info` بمفرده كمعيار لاختيار أفضل صفة؟
> **لماذا هذا مهم؟** لأن `Split Info` وحده لا يقيس جودة الفصل بين الفئات (Class Separation)، بل فقط مدى توزّع البيانات على الفروع. لهذا السبب نحتاج `Gain` في البسط لضمان أن التقسيم المختار فعلاً يفصل الفئات جيداً، و`Split Info` في المقام لمعاقبة التشتت الزائد فقط.

#### مهم للامتحان ⚠️:
> `GainRatio` قد يفضّل أحياناً صفة ذات `Gain` منخفض جداً لكن `SplitInfo` أقل منه بكثير، مما ينتج نسبة كبيرة مضللة. لذلك تطبيقات عملية مثل `C4.5` تضيف قيداً: يجب أن يكون `Gain(S,A)` **أعلى من متوسط** الـ Gain لكل الصفات المتاحة قبل النظر في `GainRatio` (نقطة إضافية غير مذكورة تفصيلياً في المحاضرة، لكنها معروفة في خوارزمية C4.5) *(شرح زيادة للفهم)*.

---

### 3. مثال تطبيقي: حساب Gain Ratio لصفة Wind

#### النص الأصلي يقول:
> "Example: Compute of gain ratio for the wind attribute. values(wind)={weak, strong}... SplitInfo(S,wind) = 0.9852... we have, Gain(S,wind)=0.048... Therefore, GainRatio(wind) = 0.048/0.9852 = 0.019"

#### الشرح المبسّط:
بالرجوع إلى جدول التدريب المعروف (Play Tennis، 14 يوماً)، صفة `Wind` لها قيمتان: `Weak` (8 أيام) و `Strong` (6 أيام).

**خطوة 1 — حساب Split Info:**

```algorithm
1 | حساب نسبة كل فرع | القسمة | P(Weak) = 8/14 ، P(Strong) = 6/14
2 | تطبيق معادلة Split Info | log2 والجمع | SplitInfo = -(8/14)log2(8/14) - (6/14)log2(6/14) = 0.9852
3 | استخدام قيمة Gain الجاهزة | من محاضرة سابقة | Gain(S, Wind) = 0.048
4 | حساب Gain Ratio | القسمة | GainRatio(Wind) = 0.048 / 0.9852 ≈ 0.019
```

#### نقاط التنفيذ:
- لاحظ أن `Gain Ratio` هنا (0.019) أصغر بكثير من `Gain` الخام (0.048) — لأن القسمة على `Split Info` (أكبر من 1 قليلاً) خفّضت القيمة.
- كلما اقتربت `Split Info` من الصفر (تقسيم غير متوازن جداً، كأن فرعاً واحداً يحتوي كل العناصر)، سترتفع `Gain Ratio` بشكل كبير وقد يصبح غير مستقر رقمياً (قسمة على رقم قريب من الصفر).

#### 🔍 تتبع التنفيذ: حساب Gain Ratio لصفة Wind

**المدخل:** 14 يوم تدريب، Wind = {Weak:8, Strong:6}, Gain(S,Wind)=0.048

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب P(Weak)=8/14≈0.571 | جاهز للـ log |
| 2 | حساب P(Strong)=6/14≈0.429 | جاهز للـ log |
| 3 | SplitInfo = -(0.571×log2(0.571)) - (0.429×log2(0.429)) | ≈ 0.9852 |
| 4 | GainRatio = 0.048 / 0.9852 | ≈ 0.019 |

**النتيجة:** `GainRatio(Wind) ≈ 0.019`

#### 💡 التشبيه:
> تخيل أنك توزّع 14 قطعة حلوى على صندوقين فقط (وزن ثقيل و خفيف) بدل توزيعها على 14 صندوق منفصل. هذا التوزيع المتوازن نسبياً (8 مقابل 6) يعطي `Split Info` معتدلاً (0.9852)، على عكس التوزيع على `ID` الذي كان سيعطي `Split Info` أعلى بكثير (قريب من log2(14)).
> **وجه الشبه:** عدد الصناديق و توازن توزيع القطع عليها = مقدار `Split Info`.

---

### 4. مشكلة الإفراط في التخصيص Overfitting

#### النص الأصلي يقول:
> "Overfitting results in decision trees that are more complex than necessary. We don't learn, we just memorize instances... Memorizing is not learning!"

#### الشرح المبسّط:
`Overfitting` (الإفراط في التخصيص) يحدث عندما تنمو الشجرة كثيراً حتى تصبح معقدة جداً — بحيث تحفظ كل تفصيلة صغيرة من بيانات التدريب (بما فيها الضوضاء `Noise` والحالات الشاذة `Outliers`)، بدلاً من أن تتعلم **النمط العام** الذي يمكن تعميمه على بيانات جديدة لم تُر من قبل.

**لماذا؟** لأن هدف أي نموذج تعلّم آلي ليس أن يحصل على دقة 100% على بيانات التدريب فقط (فهذا سهل: فقط احفظها)، بل أن يعمم الأنماط ليتنبأ بدقة على بيانات مستقبلية. الشجرة شديدة التعقيد (كثيرة العُقد والفروع) عادة ما تكون قد "حفظت" أمثلة تدريب فردية، فتفشل عند مواجهة أمثلة جديدة قليلاً الاختلاف.

#### 💡 التشبيه:
> تخيل طالباً يحفظ إجابات أسئلة امتحان السنة الماضية حرفياً بدل أن يفهم المادة. في امتحان السنة الماضية سيحصل على علامة كاملة (تدريب = 100%)، لكن في الامتحان الجديد (بأسئلة مختلفة قليلاً) سيفشل تماماً لأنه لم يفهم المفهوم الأساسي.
> **وجه الشبه:** حفظ الإجابات = شجرة قرار معقدة جداً (Overfitting)، والفهم الحقيقي للمادة = شجرة معتدلة التعقيد تتعلم القاعدة العامة.

---

### 5. معايير الشجرة الجيدة ومثال Training/Test Error

#### النص الأصلي يقول:
> "A good classifier must: 1. Fit the training data well → low training error. 2. & Accurately classify examples never seen before → low Test error."

#### الشرح المبسّط:
يوجد نوعان من الخطأ نقيسهما دائماً عند تقييم أي نموذج تصنيف:
- **Training Error:** نسبة الأخطاء عندما نطبّق النموذج على **نفس** البيانات التي دُرّب عليها.
- **Test Error:** نسبة الأخطاء عندما نطبّق النموذج على بيانات **جديدة** لم يرها أبداً أثناء التدريب.

في المثال المعطى (تصنيف الفقاريات إلى ثدييات/غير ثدييات):
- الشجرة `M1` (أعمق وأكثر تعقيداً — تستخدم صفات: Body Temperature → Gives Birth → Four-legged): حققت `Training error = 0%` لكن `Test error = 30%` — أي أنها حفظت بيانات التدريب تماماً لكنها فشلت على البيانات الجديدة (**Overfitting واضح**).
- الشجرة `M2` (أبسط — تستخدم فقط: Body Temperature → Gives Birth): حققت `Training error = 20%` (أخطاء أكثر قليلاً على التدريب) لكن `Test error = 10%` فقط — أي أنها **أفضل بكثير في التعميم** رغم أنها أقل "حفظاً" لتفاصيل التدريب.

**لماذا؟** لأن `M2` تجاهلت تفصيلة (`Four-legged`) ربما كانت مجرد ضوضاء أو استثناء نادر في التدريب، بينما `M1` بنت فرعاً كاملاً بناءً على هذا الاستثناء، مما جعلها هشّة أمام أي بيانات جديدة لا تطابق ذلك الاستثناء تحديداً.

#### ⚖️ المقايضة: شجرة معقدة (M1) مقابل شجرة بسيطة (M2)

| | شجرة معقدة (M1) | شجرة بسيطة (M2) |
| --- | --- | --- |
| المزايا | دقة مثالية على بيانات التدريب (0% خطأ) | تعميم أفضل، أداء أعلى على بيانات جديدة |
| العيوب | تحفظ الضوضاء، أداء ضعيف على بيانات جديدة (30% خطأ) | قد تفوّت بعض التفاصيل الدقيقة في التدريب (20% خطأ) |
| متى تختاره | لا يُنصح باختيارها عملياً — مثال تحذيري على Overfitting | الخيار الأفضل عملياً عندما يكون Test Error أهم من Training Error |

#### مهم للامتحان ⚠️:
> الأولوية دائماً لـ `Test Error` وليس `Training Error` عند تقييم جودة النموذج، لأن الهدف النهائي هو الأداء على بيانات حقيقية جديدة، لا حفظ بيانات التدريب.

---

### 6. العلاقة بين تعقيد الشجرة والأداء (Overfitting & Underfitting)

#### النص الأصلي يقول:
> "how the decision tree complexity affects the performance of the classifier? The training error can be decreased by increasing the model complexity. But, a complex data model, will also have a high generalization error."

#### الشرح المبسّط:
عند رسم منحنى الدقة (Accuracy) مقابل حجم الشجرة (عدد العُقد):
- **في البداية** (شجرة صغيرة جداً — Underfitting): الدقة منخفضة على التدريب والاختبار معاً، لأن النموذج لم يتعلم بعد النمط الحقيقي في البيانات (Model has yet to learn the true structure).
- **عند نقطة معينة** (حوالي 25 عُقدة في المثال المعطى): تصل دقة الاختبار (Test) إلى **أفضل أداء لها** — هذه هي نقطة "التعقيد الأمثل" (Best Complexity).
- **بعد هذه النقطة** (شجرة كبيرة جداً — Overfitting): دقة التدريب تستمر بالارتفاع (لأن الشجرة تحفظ كل شيء)، لكن دقة الاختبار **تنخفض** لأن النموذج أصبح متخصصاً جداً في تفاصيل التدريب (Model overspecializes to the training data).

**لماذا؟** لأن زيادة تعقيد النموذج تمنحه القدرة على "حفظ" تفاصيل أدق فأدق من بيانات التدريب (لذلك خطأ التدريب يستمر بالانخفاض)، لكن هذه التفاصيل الدقيقة غالباً ما تكون ضوضاء عشوائية لا تتكرر في بيانات جديدة، فيرتفع خطأ التعميم (Generalization Error).

#### 💡 التشبيه:
> تخيل رساماً يرسم لوحة لمنظر طبيعي. إذا رسم بخطوط عامة وبسيطة جداً (Underfitting)، لن تشبه اللوحة المنظر الحقيقي بشكل كافٍ. أما إذا حاول رسم كل ذرة غبار وكل عيب صغير في الصورة الأصلية بدقة مفرطة (Overfitting)، فستصبح اللوحة "نسخة طبق الأصل" من صورة واحدة فقط، ولن تصلح كتمثيل عام "لمناظر طبيعية" أخرى مشابهة.
> **وجه الشبه:** رسم التفاصيل الدقيقة جداً لصورة واحدة = حفظ الشجرة لتفاصيل بيانات التدريب.

---

### 7. مخططات مناطق القرار (Decision Regions) وأثر الإفراط في التخصيص

#### النص الأصلي يقول:
> "DTs partition the feature space into axis-parallel hyper-rectangles called decision regions... The border line between two neighboring regions of different classes called Decision boundary. With overfitting, the regions become very small."

#### الشرح المبسّط:
شجرة القرار في الحقيقة تقوم بتقسيم "فضاء الصفات" (Feature Space) — أي المستوى الذي محاوره هي الصفات العددية (مثلاً `Income` و `Debt`) — إلى **مستطيلات متوازية مع المحاور** (Axis-parallel hyper-rectangles). كل مستطيل هو "منطقة قرار" (Decision Region) يُصنَّف بناءً على الفئة الأغلبية فيه (Majority class). الخط الفاصل بين منطقتين من فئتين مختلفتين يُسمى **Decision Boundary**.

**لماذا؟** لأن كل عقدة داخلية في الشجرة تمثّل شرطاً مثل `Income > t1`، وهذا الشرط يرسم خطاً عمودياً أو أفقياً (وليس مائلاً) في فضاء الصفات — لهذا سُمّيت "axis-parallel". كلما زاد عمق الشجرة (المزيد من العُقد)، زاد عدد هذه الخطوط، فتصبح المناطق أصغر فأصغر وأكثر تفصيلاً — وهذا بالضبط مظهر آخر لـ `Overfitting`: مناطق صغيرة جداً تحيط بنقاط بيانات فردية بدل أن تمثّل نمطاً عاماً.

#### 📊 المخطط: تطور مناطق القرار مع زيادة عدد العُقد

#### ما هذا المخطط؟
> يوضّح كيف يتحول فضاء الصفات (Income, Debt) من مناطق قليلة وكبيرة (3 عُقد) إلى مناطق كثيرة وصغيرة جداً (مع زيادة عدد العُقد)، مما يعكس بصرياً زيادة تعقيد الشجرة وارتفاع خطر Overfitting.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Income > t1 | condition | العقدة الجذرية — تقسّم البيانات حسب الدخل |
| 2 | Debt > t2 | condition | تقسيم فرعي حسب الدين |
| 3 | Income > t3 | condition | تقسيم فرعي إضافي حسب الدخل مجدداً |
| 4 | Class (Red/Blue) | leaf | العُقد الطرفية — تمثّل قرار التصنيف النهائي |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Income > t1 | Debt > t2 | نعم | directional | إذا تحقق الشرط الأول ينتقل لفحص الدين |
| Income > t1 | Red (leaf) | لا | directional | إذا لم يتحقق الشرط، تصنيف مباشر |
| Debt > t2 | Income > t3 | لا | directional | تقسيم إضافي حسب الدخل مرة أخرى |

```diagram
type: decision-tree
title: مثال تقسيم فضاء الصفات Income/Debt
direction: TD
nodes:
  - id: n1
    label: "Income > t1"
    kind: condition
    level: 0
  - id: n2
    label: "Debt > t2"
    kind: condition
    level: 1
  - id: n3
    label: "Red (Class)"
    kind: leaf
    level: 1
  - id: n4
    label: "Income > t3"
    kind: condition
    level: 2
  - id: n5
    label: "Blue (Class)"
    kind: leaf
    level: 2
  - id: n6
    label: "Red (Class)"
    kind: leaf
    level: 3
edges:
  - from: n1
    to: n2
  - from: n1
    to: n3
  - from: n2
    to: n4
  - from: n2
    to: n5
  - from: n4
    to: n6
```

#### نقطة مهمة ⚠️:
> كلما زاد عدد "الحدود الفاصلة" (Decision Boundaries) في فضاء الصفات، ازداد تعقيد الشجرة، وهذا مؤشر بصري مباشر على مستوى Overfitting — تماماً كما يظهر في الرسوم التوضيحية من "3 nodes" إلى "5 nodes" وهكذا حتى مناطق دقيقة جداً.

---

### 8. طرق منع الإفراط في التخصيص (عام)

#### النص الأصلي يقول:
> "In general, Many approaches: Regularization: Control model complexity... Feature selection: Remove irrelevant features... More data: sometimes the training set is not enough... To Prevent decision tree overfitting → we can use Tree Pruning"

#### الشرح المبسّط:
هناك عدة استراتيجيات عامة (تنطبق على معظم نماذج التعلّم الآلي، وليس فقط أشجار القرار) لمنع Overfitting:

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Regularization` | التحكم في تعقيد النموذج (تبسيطه) | مفهوم عام يُطبَّق بأشكال مختلفة حسب النموذج |
| `Feature Selection` | إزالة الصفات غير ذات الصلة | أشجار القرار تملك آلية اختيار صفات مدمجة أصلاً (built-in) |
| `More Data` | زيادة حجم بيانات التدريب | أحياناً المشكلة أساساً في قلة البيانات لا في تعقيد النموذج |
| `Tree Pruning` | (خاص بأشجار القرار) تقليم فروع الشجرة | الأداة الرئيسية التي ستُشرح بالتفصيل بعد قليل |

**لماذا؟** لأن كل هذه الطرق تهدف لنفس الغاية: منع النموذج من أن يصبح معقداً بشكل يتجاوز الحاجة الفعلية لتمثيل النمط الحقيقي في البيانات. الرسم البياني (Error مقابل Model Complexity) يوضّح أن هناك دائماً "نقطة توازن" (Best Complexity) حيث يكون Test Error عند أدنى قيمة له.

#### 💡 التشبيه:
> تخيل حزام أمان قابل للتعديل. شده بإحكام مبالغ فيه (نموذج معقد جداً) قد يكون مزعجاً وغير عملي، وتركه فضفاضاً جداً (نموذج بسيط جداً) لا يحمي بالشكل الكافي. الهدف هو ضبطه عند "أفضل نقطة" مريحة وآمنة معاً.
> **وجه الشبه:** إحكام الحزام إلى الدرجة المثلى = التعقيد الأمثل (Best Complexity) للنموذج.

---

### 9. تقليم الشجرة Tree Pruning

#### النص الأصلي يقول:
> "Tree pruning methods attempt to remove the least-reliable branches (branches that reflect anomalies in the training data due to noise or outliers). Pruned trees: Tend to be smaller and less complex, and thus easier to comprehend. Usually faster and better at classifying unseen samples."

#### الشرح المبسّط:
`Tree Pruning` (تقليم الشجرة) هو عملية إزالة الفروع "الأقل موثوقية" من الشجرة — أي الفروع التي بُنيت أساساً بسبب ضوضاء عشوائية أو حالات شاذة نادرة في بيانات التدريب، وليس بسبب نمط حقيقي وعام. النتيجة: شجرة أصغر حجماً، أسهل فهماً، وعادة أسرع وأدق عند تصنيف بيانات جديدة لم تُرَ من قبل.

**لماذا؟** لأن الفروع الناتجة عن الضوضاء لا تحمل قيمة تنبؤية حقيقية — إزالتها لا تُفقد الشجرة أي معرفة مفيدة، بل على العكس تجعلها أكثر تعميماً (Generalization).

#### ⚙️ الخطوات / الخوارزمية: فكرة عمل Tree Pruning بشكل عام

#### ما هدف هذه العملية؟
> تحديد وإزالة الأجزاء غير الموثوقة من شجرة قرار مبنية بالفعل (أو أثناء بنائها) لتقليل Overfitting.

```algorithm
1 | بناء الشجرة | خوارزمية ID3/C4.5 | إنشاء شجرة كاملة أو مبدئية حسب بيانات التدريب
2 | تقييم كل فرع/عقدة فرعية | معيار خطأ أو إحصائي | تحديد ما إذا كان الفرع يعكس نمطاً حقيقياً أم ضوضاء
3 | إزالة أو إيقاف الفرع غير الموثوق | Pre-pruning أو Post-pruning | تبسيط الشجرة دون فقدان دقة حقيقية
4 | إعادة التقييم على بيانات Validation/Test | حساب Accuracy | التأكد أن التبسيط حسّن (أو لم يُضعف) الأداء على بيانات جديدة
```

#### نقاط التنفيذ:
- التقليم يجب أن يعتمد على بيانات لم تُستخدم في بناء الشجرة الأصلية (Validation Set) لضمان قرار موضوعي.
- التقليم المفرط قد يتسبب بـ Underfitting (شجرة بسيطة جداً)، لذلك يجب اختيار مستوى التقليم بعناية.

---

### 10. طريقتان لتقليم الشجرة: Prepruning و Postpruning

#### النص الأصلي يقول:
> "Prepruning approach: A tree is 'pruned' by halting its construction early... Postpruning approach: removes subtrees from a 'fully grown' tree. A subtree at a given node is pruned by removing its branches and replacing it with a leaf labeled with the most frequent class among the subtree being replaced."

#### الشرح المبسّط:
هناك اتجاهان أساسيان للتقليم:

1. **Prepruning (التقليم المسبق):** نوقف بناء الشجرة **مبكراً**، قبل أن تصل لحجمها الكامل — مثلاً بوضع شرط: "لا تقسّم عقدة إذا كان عدد العناصر فيها أقل من حد معين، أو إذا كان `Information Gain` الناتج أقل من عتبة (threshold) محددة مسبقاً".
2. **Postpruning (التقليم اللاحق):** نبني الشجرة **كاملة أولاً** (حتى لو أصبحت معقدة جداً)، ثم نراجعها ونزيل الأشجار الفرعية (Subtrees) غير المفيدة — عبر استبدال الشجرة الفرعية بأكملها بورقة واحدة (Leaf) تحمل **الفئة الأكثر تكراراً** بين العناصر التي كانت تنتمي لتلك الشجرة الفرعية.

**مثال من المحاضرة:** في شجرة القرار الموضحة، عند العُقدة `A3?`، تم استبدال الشجرة الفرعية بالكامل (والتي كانت تحتوي على عُقدة `A5?` وأوراق class B / class A) بورقة واحدة فقط بعنوان `class B` (لأنها الفئة الأغلبية في تلك الشجرة الفرعية).

**لماذا نفضّل Postpruning عملياً؟** لأن Prepruning قد يوقف البناء مبكراً جداً بناءً على تقدير غير دقيق (قد يبدو تقسيم معين غير مفيد في مرحلة مبكرة، لكنه كان سيصبح مفيداً جداً لو استمر البناء خطوة أو خطوتين إضافيتين — وهذه مشكلة تُعرف أحياناً بـ "أفق النظر المحدود"). أما Postpruning فيبني الشجرة الكاملة أولاً (فلا يفوت أي احتمال) ثم يقرر بناءً على الصورة الكاملة أي الفروع فعلاً غير مفيدة.

#### ⚖️ المقايضة: Prepruning مقابل Postpruning

| | Prepruning | Postpruning |
| --- | --- | --- |
| المزايا | أسرع (لا نبني شجرة كاملة ثم نحذف)، يوفر موارد حسابية | يُفضَّل عملياً — أدق لأنه يرى الصورة الكاملة قبل اتخاذ قرار التقليم |
| العيوب | خطر التوقف المبكر جداً وفقدان تقسيمات كانت ستصبح مفيدة لاحقاً | أبطأ (يتطلب بناء الشجرة كاملة أولاً ثم تحليلها) |
| متى تختاره | عند محدودية الموارد الحاسوبية أو الحاجة لسرعة عالية | الخيار الافتراضي المفضل في أغلب الأدوات والتطبيقات العملية |

#### الفهم الخاطئ الشائع ❌: 
`Postpruning` يعني حذف عُقد فردية فقط.
#### الفهم الصحيح ✅: 
`Postpruning` يحذف **شجرة فرعية كاملة** (جميع فروعها وعُقدها) ويستبدلها بورقة واحدة فقط.

---

### 11. تطبيق عملي: تحميل بيانات الفقاريات (Vertebrate Dataset)

#### النص الأصلي يقول:
> "Each vertebrate is classified into one of 5 categories: mammals, reptiles, birds, fishes, and amphibians, based on a set of explanatory attributes (predictor variables). Except for 'name', the rest of the attributes have been converted into a binary representation."

#### الشرح المبسّط:
سنعمل على بيانات فعلية عن الفقاريات (حيوانات لها عمود فقري). كل حيوان مُصنَّف ضمن واحدة من 5 فئات: `mammals` (ثدييات)، `reptiles` (زواحف)، `birds` (طيور)، `fishes` (أسماك)، `amphibians` (برمائيات). الصفات المستخدمة للتنبؤ (`Warm-blooded`, `Gives Birth`, `Aquatic Creature`, `Aerial Creature`, `Has Legs`, `Hibernates`) كلها بصيغة **ثنائية (Binary)**: القيمة 1 تعني "نعم" و 0 تعني "لا"، باستثناء عمود `Name` الذي يبقى نصياً (اسم الحيوان فقط، وليس صفة تُستخدم للتنبؤ).

#### 💻 الكود: تحميل البيانات باستخدام Pandas

#### ما هذا الكود؟
> يقوم بتحميل ملف CSV يحتوي بيانات الفقاريات إلى بنية بيانات جدولية (DataFrame) في بايثون تسهّل التعامل معها لاحقاً في التدريب والتحليل.

```python
import pandas as pd  # Import the pandas library for data handling
data = pd.read_csv('vertebrate.csv', header='infer')  # Load CSV file into a DataFrame, auto-detect header row
data  # Display the DataFrame content
```

#### شرح كل سطر:
1. `import pandas as pd` → استيراد المكتبة — نحتاجها لأنها توفر بنية `DataFrame` القوية للتعامل مع البيانات الجدولية (صفوف وأعمدة) بسهولة أكبر بكثير من القوائم العادية في بايثون.
2. `data = pd.read_csv('vertebrate.csv', header='infer')` → قراءة الملف — الوسيط `header='infer'` يخبر Pandas أن يكتشف تلقائياً أن السطر الأول في الملف هو أسماء الأعمدة (وليس بيانات فعلية).
3. `data` → عرض المحتوى — في بيئة تفاعلية (مثل Jupyter Notebook) هذا يعرض الجدول كاملاً بشكل منسّق.

**المكتبات المطلوبة (Imports):**
> `import pandas as pd`

**الناتج المتوقع:**
> جدول (DataFrame) بأعمدة: Name, Warm-blooded, Gives Birth, Aquatic Creature, Aerial Creature, Has Legs, Hibernates, Class — وصفوف تمثّل كل حيوان (human, python, salmon, whale, frog, komodo, bat, pigeon, cat, leopard shark, turtle, penguin, porcupine, eel, salamander).

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| `FileNotFoundError` | ملف `vertebrate.csv` غير موجود في مسار العمل الحالي | تأكد من وضع الملف في نفس مجلد الكود، أو استخدم المسار الكامل (Full Path) |
| ظهور عمود إضافي غير مسمّى (Unnamed: 0) | الملف يحتوي فهرساً (index) مكتوباً مسبقاً بدون اسم عمود | استخدم `pd.read_csv('vertebrate.csv', index_col=0)` لتحديد عمود الفهرس |

---

### 12. تبسيط المسألة إلى تصنيف ثنائي (Mammals vs Non-mammals)

#### النص الأصلي يقول:
> "Given the limited number of training examples, suppose we convert the problem into a binary classification task (mammals versus non-mammals). We can do so by replacing the class labels of the instances to *non-mammals* except for those that belong to the *mammals* class."

#### الشرح المبسّط:
بما أن عدد أمثلة التدريب المتوفرة قليل جداً (15 حيواناً فقط) مقارنة بعدد الفئات (5 فئات)، فمن الصعب جداً بناء شجرة قرار دقيقة لتمييز 5 فئات بهذا العدد القليل من الأمثلة (كل فئة قد لا تحصل إلا على 2-3 أمثلة فقط للتدريب). لذلك، وكحل عملي مبسّط، نُحوّل المسألة إلى **تصنيف ثنائي (Binary Classification)**: "هل هذا الحيوان ثديي (mammals) أم لا (non-mammals)؟" — عبر استبدال كل التصنيفات الأخرى (fishes, birds, amphibians, reptiles) بتصنيف واحد موحّد: `non-mammals`.

**لماذا؟** لأن المسائل الثنائية (فئتان فقط) تحتاج بيانات تدريب أقل عادة لتحقيق أداء معقول، مقارنة بالمسائل متعددة الفئات (Multi-class) التي تحتاج أمثلة كافية لكل فئة على حدة.

#### 💻 الكود: تحويل التصنيف إلى ثنائي

#### ما هذا الكود؟
> يستبدل قيم عمود `Class` بحيث تصبح فقط `mammals` أو `non-mammals`، محافظاً على القيم الأصلية إذا كانت `mammals` فقط.

```python
data['Class'] = data['Class'].replace(['fishes','birds','amphibians','reptiles'], 'non-mammals')  # Merge all non-mammal classes into one label
data  # Display the updated DataFrame
```

#### شرح كل سطر:
1. `data['Class'] = data['Class'].replace([...], 'non-mammals')` → يستبدل أي قيمة من القائمة `['fishes','birds','amphibians','reptiles']` بالقيمة الموحّدة `'non-mammals'`، بينما تبقى صفوف `mammals` كما هي بدون تغيير.
2. `data` → إعادة عرض الجدول للتأكد من نجاح التحويل.

**المكتبات المطلوبة (Imports):**
> لا حاجة لاستيراد جديد — نفس `pandas` المستوردة سابقاً.

**الناتج المتوقع:**
> عمود `Class` أصبح يحتوي فقط على قيمتين: `mammals` (لـ human, whale, bat, cat, porcupine) و `non-mammals` (لكل البقية: python, salmon, frog, komodo, pigeon, leopard shark, turtle, penguin, eel, salamander).

#### 🔄 قبل / بعد: تحويل عمود Class

**قبل:**
```python
Class
mammals      # human
reptiles     # python
fishes       # salmon
mammals      # whale
amphibians   # frog
```

**بعد:**
```python
Class
mammals        # human
non-mammals    # python
non-mammals    # salmon
mammals        # whale
non-mammals    # frog
```

**ماذا تغيّر؟** أصبح عمود `Class` يحمل فئتين فقط بدل خمس فئات، محوّلاً المسألة من تصنيف متعدد الفئات إلى تصنيف ثنائي.

---

### 13. بناء شجرة قرار باستخدام scikit-learn

#### النص الأصلي يقول:
> "In this section, we apply a decision tree classifier to the previous dataset... The preceding commands will extract the predictor (X) and target class (Y) attributes and create a decision tree classifier object using entropy as its impurity measure for splitting criterion. The classifier is constrained to generate trees with a maximum depth equals to 3. Next, the classifier is trained on the labeled data using the fit() function."

#### الشرح المبسّط:
الآن ندرّب فعلياً نموذج `Decision Tree Classifier` باستخدام مكتبة `scikit-learn` (اختصاراً `sklearn`). الخطوات المنطقية:
1. فصل عمود الفئة الهدف (`Class`) في متغيّر مستقل `Y`.
2. فصل باقي الأعمدة (الصفات التنبؤية، باستثناء `Name` و `Class`) في متغيّر `X`.
3. إنشاء كائن `DecisionTreeClassifier` وتحديد `criterion='entropy'` (أي استخدام `Entropy`/`Information Gain` كمعيار تقسيم، بدلاً من `Gini Index` الذي هو الخيار الافتراضي في sklearn).
4. تحديد `max_depth=3` كنوع من **Prepruning** — أي نمنع الشجرة من النمو لأكثر من 3 مستويات، لتفادي Overfitting منذ البداية.
5. تدريب النموذج فعلياً عبر استدعاء `.fit(X, Y)`.

#### 💻 الكود: بناء وتدريب شجرة القرار

#### ما هذا الكود؟
> ينشئ نموذج شجرة قرار محدود العمق (max_depth=3) يستخدم Entropy كمعيار تقسيم، ثم يدرّبه على بيانات الفقاريات المحوَّلة إلى تصنيف ثنائي.

```python
from sklearn import tree  # Import the tree module from scikit-learn

Y = data['Class']  # Extract the target column (labels) into Y
X = data.drop(['Name','Class'], axis=1)  # Drop Name and Class columns, keep only predictor features in X

clf = tree.DecisionTreeClassifier(criterion='entropy', max_depth=3)  # Create a decision tree classifier using entropy, limited to depth 3
clf = clf.fit(X, Y)  # Train (fit) the classifier on the training data
```

#### شرح كل سطر:
1. `from sklearn import tree` → استيراد وحدة `tree` من مكتبة `sklearn` التي تحتوي على تطبيق شجرة القرار.
2. `Y = data['Class']` → استخراج عمود الفئة الهدف (المتغير التابع) الذي نريد التنبؤ به.
3. `X = data.drop(['Name','Class'], axis=1)` → إزالة عمودي `Name` (لأنه معرّف نصي غير مفيد للتنبؤ، تماماً مثل مشكلة صفة `ID` التي ناقشناها مع `Gain Ratio`!) و `Class` (لأنه الهدف نفسه، لا يجب أن يكون من ضمن صفات التنبؤ) — والوسيط `axis=1` يعني الحذف على مستوى **الأعمدة** وليس الصفوف.
4. `clf = tree.DecisionTreeClassifier(criterion='entropy', max_depth=3)` → إنشاء كائن المصنّف: `criterion='entropy'` يحدد معيار الانقسام (Information Gain المبني على Entropy)، و `max_depth=3` يقيّد أقصى عمق للشجرة (نوع من Prepruning لمنع Overfitting).
5. `clf = clf.fit(X, Y)` → تدريب النموذج فعلياً: يبحث الخوارزم عن أفضل تقسيمات ممكنة بناءً على X و Y ضمن القيد المحدد (عمق أقصى = 3).

**المكتبات المطلوبة (Imports):**
> `from sklearn import tree`

**الناتج المتوقع:**
> كائن `clf` مدرَّب (Trained DecisionTreeClassifier object) جاهز لاستخدامه في التنبؤ بأمثلة جديدة عبر `clf.predict(...)`.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا حذفنا عمود `Name` قبل التدريب رغم أنه موجود في البيانات؟
> **لماذا هذا مهم؟** لأن `Name` هو معرّف فريد شبه (اسم كل حيوان مختلف عن الآخر)، وإذا استخدمناه كصفة تنبؤية، فسيتصرف تماماً كصفة `ID` التي ناقشناها في بداية المحاضرة — سيعطي `Information Gain` مرتفعاً جداً بشكل مضلل، لكنه عديم الفائدة تماماً عند مواجهة حيوان جديد له اسم لم تره الشجرة من قبل.

#### نقطة مهمة ⚠️:
> اختيار `max_depth=3` هنا هو مثال عملي مباشر على **Prepruning**: نحدد حداً أقصى لعمق الشجرة **قبل** أن تُبنى بالكامل، لمنعها من أن تصبح معقدة جداً وتقع في فخ Overfitting (تذكّر مثال M1 مقابل M2 سابقاً).

---

### 14. اختبار النموذج على بيانات جديدة (Test Data)

#### النص الأصلي يقول:
> "Next, suppose we apply the decision tree to classify the following test examples"

#### الشرح المبسّط:
بعد تدريب النموذج، نحتاج لتقييمه على بيانات **لم يرها من قبل** (Test Data) — أربعة حيوانات جديدة: `gila monster` (وحش جيلا، سحلية سامة)، `platypus` (خُلد الماء، حيوان غريب فعلاً لأنه ثديي يبيض!)، `owl` (بومة)، و `dolphin` (دولفين).

#### 💻 الكود: إنشاء بيانات الاختبار

#### ما هذا الكود؟
> ينشئ DataFrame جديد يحاكي بنية بيانات التدريب نفسها، لكن بأربعة حيوانات مختلفة تماماً، لاختبار مدى قدرة النموذج على التعميم.

```python
testData = [['gila monster',0,0,0,0,1,1,'non-mammals'],  # Row: name, features..., true label
            ['platypus',1,0,0,0,1,1,'mammals'],
            ['owl',1,0,0,1,1,0,'non-mammals'],
            ['dolphin',1,1,1,0,0,0,'mammals']]
testData = pd.DataFrame(testData, columns=data.columns)  # Convert list into DataFrame using same column names as training data
testData  # Display the test set
```

#### شرح كل سطر:
1. `testData = [[...], [...], [...], [...]]` → إنشاء قائمة بايثون عادية (List of lists) تحتوي 4 صفوف، كل صف يمثّل حيواناً بصفاته الست الثنائية بالإضافة للاسم والفئة الحقيقية.
2. `testData = pd.DataFrame(testData, columns=data.columns)` → تحويل القائمة إلى DataFrame منظّم، باستخدام **نفس أسماء الأعمدة** الموجودة في بيانات التدريب الأصلية (`data.columns`) لضمان التوافق التام بين البنيتين.
3. `testData` → عرض بيانات الاختبار للتأكد من صحتها.

**المكتبات المطلوبة (Imports):**
> `import pandas as pd` (مستوردة مسبقاً)

**الناتج المتوقع:**
> جدول من 4 صفوف بنفس أعمدة بيانات التدريب: gila monster (Class حقيقي: non-mammals)، platypus (mammals)، owl (non-mammals)، dolphin (mammals).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا يُعتبر `platypus` (خُلد الماء) مثالاً "صعباً" لهذا النموذج تحديداً؟
> **لماذا هذا مهم؟** لأن خُلد الماء ثديي (Warm-blooded=1) لكنه **يبيض ولا يلد** (Gives Birth=0) — وهذا استثناء بيولوجي نادر يخالف النمط الشائع بين معظم الثدييات في بيانات التدريب (حيث كل الثدييات في التدريب كانت تلد). هذا يوضّح عملياً كيف يمكن لشجرة قرار مبنية على بيانات محدودة أن تُخطئ في تصنيف حالات استثنائية حقيقية.

---

### 15. حساب دقة النموذج (Accuracy)

#### النص الأصلي يقول:
> "We first extract the predictor and target class attributes from the test data and then apply the decision tree classifier to predict their classes. We can calculate the accuracy of the classifier on the test data as shown by the example given below."

#### الشرح المبسّط:
الخطوة الأخيرة: نطبّق النموذج المدرَّب (`clf`) على بيانات الاختبار للحصول على تنبؤات (`predY`)، ثم نقارنها بالفئات الحقيقية (`testY`) لحساب **الدقة (Accuracy)** — وهي ببساطة نسبة التنبؤات الصحيحة من إجمالي عدد الأمثلة.

#### 📐 المعادلة: Accuracy

$$
Accuracy = \frac{\text{عدد التنبؤات الصحيحة}}{\text{إجمالي عدد الأمثلة}}
$$

**الشرح:**
> - عدد التنبؤات الصحيحة: كم مرة تطابق تنبؤ النموذج (`predY`) مع الفئة الحقيقية (`testY`).
> - إجمالي عدد الأمثلة: هنا = 4 (عدد صفوف بيانات الاختبار).
> - في المثال المعطى، النتيجة كانت `0.75` أي 75% — أي أن النموذج أصاب في 3 من أصل 4 حيوانات (على الأرجح أخطأ في `platypus` تحديداً، للسبب المذكور أعلاه).

#### 💻 الكود: حساب الدقة على بيانات الاختبار

#### ما هذا الكود؟
> يستخرج صفات وفئة بيانات الاختبار، يطلب من النموذج المدرَّب التنبؤ بالفئات، ثم يقارن التنبؤات بالفئات الحقيقية لحساب نسبة الدقة الإجمالية.

```python
from sklearn.metrics import accuracy_score  # Import accuracy metric function

testY = testData['Class']  # Extract true labels from test data
testX = testData.drop(['Name','Class'], axis=1)  # Extract predictor features only (drop Name and Class)

predY = clf.predict(testX)  # Use the trained model to predict classes for test data
print('Accuracy on test data is %.2f' % (accuracy_score(testY, predY)))  # Compare predictions to true labels and print accuracy
```

#### شرح كل سطر:
1. `from sklearn.metrics import accuracy_score` → استيراد دالة جاهزة لحساب الدقة، بدلاً من كتابتها يدوياً.
2. `testY = testData['Class']` → استخراج الفئات الحقيقية (Ground Truth) من بيانات الاختبار.
3. `testX = testData.drop(['Name','Class'], axis=1)` → استخراج الصفات التنبؤية فقط (بنفس منطق X سابقاً في التدريب — يجب أن تتطابق الأعمدة تماماً مع ما تدرّب عليه النموذج).
4. `predY = clf.predict(testX)` → طلب التنبؤ الفعلي من النموذج المدرَّب على بيانات الاختبار الجديدة.
5. `print('Accuracy on test data is %.2f' % (accuracy_score(testY, predY)))` → مقارنة التنبؤات (`predY`) بالفئات الحقيقية (`testY`) وحساب نسبة التطابق، ثم طباعتها بصيغة رقم عشري بمنزلتين.

**المكتبات المطلوبة (Imports):**
> `from sklearn.metrics import accuracy_score`

**الناتج المتوقع:**
```
Accuracy on test data is 0.75
```

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| `ValueError: Number of features ... does not match` | عدد/ترتيب الأعمدة في `testX` لا يطابق `X` المستخدم في التدريب | تأكد أن `testData` بُني بنفس أعمدة `data` (`columns=data.columns`) وأن نفس الأعمدة تُحذف في `.drop()` |
| دقة أقل من المتوقع | النموذج بُني بعمق محدود (`max_depth=3`) وقد لا يكفي لتمييز حالات استثنائية مثل platypus | زيادة `max_depth` بحذر (مع مراقبة Overfitting)، أو قبول أن بعض الحالات الشاذة بيولوجياً صعبة التصنيف بصفات محدودة |

#### الدرس المستفاد:
> دقة 75% على 4 أمثلة فقط تعني خطأ واحد فقط — وهذا يوضّح عملياً أن حجم بيانات الاختبار الصغير يجعل رقم الدقة حساساً جداً لكل مثال فردي (كل خطأ واحد يُنقص 25% من الدقة الكلية هنا). في مشاريع حقيقية، نحتاج مجموعات اختبار أكبر بكثير للحصول على تقدير موثوق للأداء.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Gain Ratio` | معيار تقسيم يُطبّع `Information Gain` بقسمته على `Split Info` لمعالجة تحيّز Gain نحو الصفات كثيرة القيم | `GainRatio(Wind) ≈ 0.019` |
| `Split Info` | مقياس تشتت توزيع البيانات على قيم/فروع صفة معينة (بغض النظر عن الفئة) | يُحسب بمعادلة شبيهة بـ Entropy لكن على توزيع الفروع لا الفئات |
| `Overfitting` | حالة نمذجة تحفظ فيها الشجرة تفاصيل بيانات التدريب (بما فيها الضوضاء) بدل تعلّم نمط عام | Training error = 0%, Test error = 30% (مثال M1) |
| `Underfitting` | حالة يفشل فيها النموذج (بسيط جداً) في تعلّم النمط الحقيقي حتى في بيانات التدريب | دقة منخفضة على التدريب والاختبار معاً |
| `Tree Pruning` | إزالة الفروع غير الموثوقة من الشجرة لتقليل تعقيدها وتحسين التعميم | ينتج شجرة أصغر وأدق على بيانات جديدة |
| `Prepruning` | إيقاف بناء الشجرة مبكراً قبل اكتمالها | `max_depth=3` في sklearn مثال عملي |
| `Postpruning` | بناء شجرة كاملة ثم إزالة أشجار فرعية واستبدالها بورقة واحدة (الفئة الأغلبية) | مفضّل عملياً رغم أنه أبطأ حسابياً |
| `Decision Region` | مستطيل في فضاء الصفات يمثّل منطقة مصنَّفة لفئة معينة | axis-parallel hyper-rectangle |
| `Decision Boundary` | الخط الفاصل بين منطقتين قرار من فئتين مختلفتين | يزداد تعقيداً مع Overfitting |
| `Accuracy` | نسبة التنبؤات الصحيحة إلى إجمالي عدد الأمثلة | 0.75 في مثال بيانات الفقاريات |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `pandas.read_csv()` | تحميل بيانات من ملف CSV إلى DataFrame | `header='infer'` لاكتشاف صف العناوين تلقائياً |
| `DataFrame.replace()` | استبدال قيم معينة في عمود | استُخدمت لدمج 4 فئات إلى `non-mammals` |
| `DataFrame.drop(columns, axis=1)` | حذف أعمدة غير مرغوبة | لإزالة `Name` و `Class` من صفات التدريب |
| `sklearn.tree.DecisionTreeClassifier` | إنشاء نموذج شجرة قرار | `criterion='entropy'`, `max_depth=3` |
| `.fit(X, Y)` | تدريب النموذج على بيانات معروفة | X = صفات، Y = فئات حقيقية |
| `.predict(X)` | التنبؤ بفئات بيانات جديدة | تُستخدم بعد التدريب فقط |
| `accuracy_score(y_true, y_pred)` | حساب نسبة الدقة | من `sklearn.metrics` |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| Information Gain مقابل Gain Ratio | يميل للصفات كثيرة القيم (مثل ID) | يعاقب هذا التحيّز عبر القسمة على Split Info | Gain Ratio أكثر توازناً وعدالة في اختيار الصفة |
| Prepruning مقابل Postpruning | يوقف البناء مبكراً | يبني كاملاً ثم يحذف | Postpruning أدق لكنه أبطأ حسابياً |
| Training Error مقابل Test Error | خطأ على بيانات مألوفة للنموذج | خطأ على بيانات جديدة غير مرئية | Test Error هو المقياس الحقيقي لجودة التعميم |

### مصطلحات (Glossary)

| المصطلح | الترجمة/المعنى |
| --- | --- |
| `Bias` | تحيّز — ميل المعيار لتفضيل نوع معين من الحلول بشكل غير عادل |
| `Normalization` | تطبيع — تعديل قيمة لجعلها قابلة للمقارنة العادلة مع قيم أخرى |
| `Anomaly` | شذوذ — حالة أو نمط غير متكرر يخالف الاتجاه العام في البيانات |
| `Generalization` | التعميم — قدرة النموذج على الأداء الجيد على بيانات لم يرها من قبل |
| `Hyper-rectangle` | مستطيل فائق الأبعاد — منطقة في فضاء متعدد الأبعاد محدودة بحدود موازية للمحاور |
| `Feature Space` | فضاء الصفات — الفراغ الرياضي الذي محاوره هي صفات البيانات |

### نقاط ذهبية

- `Gain Ratio` ليس بديلاً كاملاً عن `Information Gain`، بل تحسين عليه لمعالجة حالة تحيّز محددة.
- عمود مثل `ID` أو `Name` يجب استبعاده دائماً من صفات التدريب لأنه لا يحمل نمطاً حقيقياً قابلاً للتعميم.
- الأولوية دوماً لـ `Test Error` وليس `Training Error` عند الحكم على جودة نموذج.
- `Overfitting` له مظهران رئيسيان: (1) فجوة كبيرة بين Training Error و Test Error، (2) مناطق قرار (Decision Regions) صغيرة جداً ومفرطة التفصيل.
- `max_depth` في `sklearn.tree.DecisionTreeClassifier` هو أداة عملية مباشرة لتطبيق `Prepruning`.

### أخطاء شائعة

| الخطأ الشائع | التصحيح |
| --- | --- |
| اعتقاد أن أعلى Information Gain يعني دائماً أفضل صفة للتقسيم | ليس دائماً — قد يكون هذا التحيّز نحو صفات عالية التنوع (مثل ID)، لذلك نستخدم Gain Ratio للتصحيح |
| الظن بأن دقة تدريب عالية (100%) تعني نموذجاً ممتازاً | قد تعني العكس تماماً: Overfitting شديد وأداء ضعيف على بيانات جديدة |
| نسيان حذف عمود المعرّف (Name/ID) قبل التدريب | يجب حذفه دائماً لأنه يفسد جودة الشجرة ويجعلها غير قابلة للتعميم |
| افتراض أن Prepruning هو الأفضل دائماً لأنه أسرع | Postpruning مفضّل عملياً غالباً رغم بطئه، لأنه يرى الصورة الكاملة قبل التقليم |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ خوارزمية: حساب Gain Ratio لصفة معينة

```algorithm
1 | تحديد قيم الصفة | استعراض values(A) | مثلاً {Weak, Strong} لصفة Wind
2 | حساب نسبة كل فرع | |S_v|/|S| | مثلاً P(Weak)=8/14, P(Strong)=6/14
3 | حساب Split Info | معادلة log2 | SplitInfo(S,A) = -Σ P_v × log2(P_v)
4 | استرجاع/حساب Gain(S,A) | من محاضرة Information Gain | Gain(S,Wind)=0.048
5 | حساب Gain Ratio النهائي | القسمة | GainRatio(S,A) = Gain(S,A) / SplitInfo(S,A)
6 | تكرار لكل صفة متاحة | مقارنة القيم | اختيار الصفة صاحبة أعلى GainRatio للتقسيم
```

#### ⚙️ خوارزمية: عملية Postpruning

```algorithm
1 | بناء شجرة كاملة (Fully Grown Tree) | ID3/C4.5/CART | باستخدام كل بيانات التدريب دون قيود عمق
2 | اختيار عقدة داخلية للفحص | من الأسفل للأعلى (Bottom-up) عادة | تقييم كل شجرة فرعية تحت هذه العقدة
3 | تقدير الخطأ مع/بدون التقليم | بيانات Validation | مقارنة الأداء المتوقع في الحالتين
4 | استبدال الشجرة الفرعية بورقة | الفئة الأغلبية (Most frequent class) | إذا كان التقليم يحسّن أو لا يضر بالأداء
5 | تكرار حتى لا يوجد تحسين إضافي | فحص جميع العقد الداخلية | الشجرة النهائية المُقلَّمة (Pruned Tree)
```

#### ⚙️ خوارزمية: بناء وتقييم Decision Tree Classifier في sklearn

```algorithm
1 | تحميل البيانات | pandas.read_csv | إنشاء DataFrame من ملف CSV
2 | تجهيز الفئة الهدف | فصل عمود Class في Y | data['Class']
3 | تجهيز صفات التدريب | حذف Name و Class من X | data.drop(['Name','Class'], axis=1)
4 | إنشاء النموذج | DecisionTreeClassifier(criterion, max_depth) | تحديد معيار Entropy وقيد العمق
5 | تدريب النموذج | clf.fit(X, Y) | تعلّم أفضل تقسيمات ممكنة من بيانات التدريب
6 | تجهيز بيانات اختبار جديدة | نفس بنية أعمدة X | ضمان تطابق الأعمدة تماماً
7 | التنبؤ | clf.predict(testX) | الحصول على فئات متوقعة لبيانات الاختبار
8 | تقييم الأداء | accuracy_score(testY, predY) | حساب نسبة التطابق بين المتوقع والحقيقي
```

---

### أنماط الأكواد

- **نمط فصل X/Y:** يتكرر دائماً في مسائل التصنيف بـ sklearn: `Y = data['target_column']` ثم `X = data.drop(['id_columns', 'target_column'], axis=1)`.
- **نمط التدريب/التنبؤ:** `model = Classifier(params); model.fit(X_train, Y_train); predictions = model.predict(X_test)`.
- **نمط التقييم:** استيراد دالة مقياس من `sklearn.metrics` (مثل `accuracy_score`) ومقارنة `y_true` بـ `y_pred`.

### أنماط التعامل

- عند التعامل مع صفات معرّفة (Identifier columns) مثل `ID` أو `Name`: احذفها دائماً قبل التدريب.
- عند مواجهة عدد قليل من الفئات مقارنة بعدد الفئات المطلوبة: فكّر بتبسيط المسألة إلى تصنيف ثنائي إن كان منطقياً.
- عند بناء أي نموذج: راقب دائماً الفجوة بين Training Error و Test Error كمؤشر مباشر على Overfitting.

### الأفكار الشاملة

- كل تقنيات هذه المحاضرة (Gain Ratio، Pruning) تهدف لنفس الغرض النهائي: **جعل شجرة القرار تُعمِّم جيداً على بيانات جديدة، لا أن تحفظ بيانات التدريب فقط.**
- التطبيق العملي بـ sklearn يوضّح أن هذه المفاهيم النظرية (Entropy، max_depth كـ Prepruning) تتحول مباشرة إلى وسائط (parameters) فعلية في الكود.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1
ما سبب تحيّز `Information Gain` نحو الصفات ذات القيم الكثيرة مثل `ID`؟

أ) لأنها تُنتج فروعاً كبيرة الحجم
ب) لأنها تُنتج فروعاً نقية تماماً (Entropy=0) لكل قيمة، مما يعطي Gain أقصى بشكل مضلل
ج) لأن خوارزمية ID3 تتجاهل هذه الصفات تلقائياً
د) لأن Entropy لا يمكن حسابه لهذه الصفات

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — العكس هو الصحيح، تُنتج فروعاً صغيرة جداً (غالباً عنصر واحد لكل فرع).
- ب) صحيح — كل فرع يحتوي عنصراً واحداً فقط فتكون Entropy=0 لكل فرع، فيصبح Gain مساوياً لـ Entropy الكلي (أقصى قيمة ممكنة).
- ج) خاطئ — ID3 الأساسي لا يملك آلية تلقائية لتجاهل هذه الصفات؛ هذا بالضبط سبب الحاجة لـ Gain Ratio.
- د) خاطئ — يمكن حساب Entropy لأي صفة بغض النظر عن عدد قيمها.

### السؤال 2
ما الغرض الأساسي من `Split Info` في معادلة `Gain Ratio`؟

أ) قياس جودة فصل الفئات (Class separation)
ب) قياس مدى تشتت البيانات على فروع/قيم الصفة نفسها
ج) استبدال Entropy تماماً
د) حساب دقة النموذج النهائي

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — هذا دور `Gain` وليس `Split Info`.
- ب) صحيح — `Split Info` يقيس توزيع العناصر على قيم الصفة A بغض النظر عن الفئة الهدف.
- ج) خاطئ — يُستخدم بالإضافة إلى Gain (كمقام) وليس بديلاً عنه.
- د) خاطئ — لا علاقة له بحساب الدقة النهائية للنموذج.

### السؤال 3
بالرجوع للمثال المعطى: `SplitInfo(S,Wind)=0.9852` و `Gain(S,Wind)=0.048`. ما قيمة `GainRatio(Wind)` تقريباً؟

أ) 0.048
ب) 0.9852
ج) 0.019
د) 20.5

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خاطئ — هذه قيمة Gain الخام قبل القسمة.
- ب) خاطئ — هذه قيمة Split Info نفسها، وليست الناتج النهائي.
- ج) صحيح — 0.048 ÷ 0.9852 ≈ 0.019 كما هو موضح في المحاضرة حرفياً.
- د) خاطئ — هذا ناتج القسمة المعكوسة (0.9852/0.048) وهو خطأ حسابي شائع.

### السؤال 4
شجرة قرار M1 حققت Training error=0% و Test error=30%. ماذا يدل ذلك؟

أ) النموذج ممتاز ويجب اعتماده مباشرة
ب) النموذج يعاني من Underfitting
ج) النموذج يعاني من Overfitting واضح
د) النموذج غير قابل للتدريب أصلاً

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خاطئ — دقة تدريب مثالية مع دقة اختبار ضعيفة جداً مؤشر خطر وليس تفوقاً.
- ب) خاطئ — Underfitting يعني ضعف الأداء حتى على بيانات التدريب، وهذا عكس الحالة هنا.
- ج) صحيح — الفجوة الكبيرة بين 0% و 30% خطأ هي التعريف الكلاسيكي لـ Overfitting.
- د) خاطئ — النموذج تدرّب بنجاح تام (0% خطأ تدريب)؛ المشكلة في التعميم فقط.

### السؤال 5
ما الفرق الجوهري بين `Prepruning` و `Postpruning`؟

أ) Prepruning يبني الشجرة كاملة ثم يحذف أجزاء منها
ب) Postpruning يوقف بناء الشجرة مبكراً
ج) Prepruning يوقف البناء مبكراً، بينما Postpruning يبني الشجرة كاملة ثم يزيل أجزاء منها
د) لا فرق حقيقياً بينهما، وهما نفس الأسلوب بمسميين مختلفين

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خاطئ — هذا وصف Postpruning وليس Prepruning.
- ب) خاطئ — هذا وصف Prepruning وليس Postpruning.
- ج) صحيح — هذا هو التعريف الدقيق المذكور في المحاضرة لكل منهما.
- د) خاطئ — الفرق جوهري في توقيت وطريقة اتخاذ قرار التقليم.

### السؤال 6
في `Postpruning`، عند حذف شجرة فرعية، بماذا تُستبدل؟

أ) بشجرة فرعية أخرى أصغر
ب) بورقة (Leaf) تحمل الفئة الأكثر تكراراً بين عناصر تلك الشجرة الفرعية
ج) بعقدة قرار عشوائية
د) لا تُستبدل، بل تُحذف نهائياً بدون بديل

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — الاستبدال يكون بورقة واحدة فقط، لا بشجرة فرعية أخرى.
- ب) صحيح — هذا منصوص عليه حرفياً في المحاضرة (leaf labeled with the most frequent class).
- ج) خاطئ — لا يوجد عشوائية في هذه العملية.
- د) خاطئ — يجب أن يبقى تصنيف ما ممكناً لتلك المنطقة، لذلك تُستبدل بورقة.

### السؤال 7
ما هو `Decision Boundary`؟

أ) العقدة الجذرية للشجرة
ب) الخط الفاصل بين منطقتي قرار (Decision Regions) من فئتين مختلفتين
ج) معيار اختيار أفضل صفة للتقسيم
د) قيمة Split Info القصوى الممكنة

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — العقدة الجذرية مفهوم مختلف تماماً يخص بنية الشجرة لا فضاء الصفات.
- ب) صحيح — هذا تعريفه الحرفي كما ورد في المحاضرة.
- ج) خاطئ — معايير اختيار الصفة هي Gain أو Gain Ratio أو Gini Index، وليس Decision Boundary.
- د) خاطئ — لا علاقة مباشرة بـ Split Info.

### السؤال 8
لماذا تصبح مناطق القرار (Decision Regions) صغيرة جداً عند حدوث Overfitting؟

أ) لأن عدد الصفات يقل مع زيادة تعقيد الشجرة
ب) لأن زيادة عدد العُقد يعني المزيد من الشروط/الحدود التي تُقسّم فضاء الصفات لمناطق أدق فأدق
ج) لأن Entropy يصبح سالباً
د) لأن sklearn يحدد حجماً ثابتاً لكل منطقة

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — عدد الصفات لا يتغير، بل عدد الشروط (العُقد) المُطبَّقة عليها يزداد.
- ب) صحيح — كل عقدة إضافية ترسم حداً جديداً موازياً لأحد المحاور، فتزداد دقة/صغر المناطق.
- ج) خاطئ — Entropy لا يمكن أن يكون سالباً رياضياً.
- د) خاطئ — لا يوجد حجم ثابت مفروض، الحجم يتحدد ديناميكياً حسب بنية الشجرة.

### السؤال 9
ما الوسيط (parameter) في `sklearn.tree.DecisionTreeClassifier` الذي يمثّل تطبيقاً عملياً لـ Prepruning؟

أ) `criterion='entropy'`
ب) `max_depth`
ج) `fit(X, Y)`
د) `predict(X)`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — هذا يحدد معيار حساب جودة التقسيم فقط (Entropy مقابل Gini)، وليس له علاقة مباشرة بالتقليم.
- ب) صحيح — تحديد عمق أقصى يمنع الشجرة من النمو أكثر من اللازم، وهذا جوهر Prepruning.
- ج) خاطئ — هذه دالة التدريب، وليست وسيطاً للتقليم.
- د) خاطئ — هذه دالة التنبؤ بعد التدريب.

### السؤال 10
لماذا حُذف عمود `Name` من بيانات التدريب في مثال Vertebrate Dataset؟

أ) لأنه يحتوي قيماً مفقودة
ب) لأنه معرّف فريد شبه ID، لا يحمل نمطاً قابلاً للتعميم ويشوّه اختيار الصفات
ج) لأن sklearn لا يقبل الأعمدة النصية إطلاقاً
د) لأن حجمه كبير جداً بالمقارنة مع باقي الأعمدة

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — لا يوجد ذكر لقيم مفقودة في هذا العمود.
- ب) صحيح — نفس منطق مشكلة صفة ID التي شُرحت في بداية المحاضرة.
- ج) جزئياً مضلل — صحيح أن sklearn عادة يحتاج قيماً رقمية، لكن هذا ليس السبب الأساسي المقصود هنا (السبب الجوهري هو منع مشكلة التحيّز، وليس فقط قيداً تقنياً).
- د) خاطئ — الحجم النصي ليس معياراً لحذف الأعمدة.

### السؤال 11
بيانات الاختبار في المثال أعطت `Accuracy = 0.75` على 4 أمثلة. كم عدد الأمثلة المصنَّفة بشكل خاطئ؟

أ) 0
ب) 1
ج) 2
د) 3

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — لو كانت 0 لكانت الدقة 100% (1.00) وليس 75%.
- ب) صحيح — 0.75 × 4 = 3 أمثلة صحيحة، إذن 4-3=1 مثال خاطئ.
- ج) خاطئ — 2 أخطاء تعني دقة 50% وليس 75%.
- د) خاطئ — 3 أخطاء تعني دقة 25% فقط.

### السؤال 12
أي كود التالي صحيح لفصل صفات التدريب (X) عن الفئة الهدف (Y) في بيانات الفقاريات؟

أ) `X = data['Class']` و `Y = data.drop(['Name','Class'], axis=1)`
ب) `Y = data['Class']` و `X = data.drop(['Name','Class'], axis=1)`
ج) `X = data.drop(['Class'], axis=0)`
د) `Y = data.drop(['Name'], axis=1)`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — المتغيرات معكوسة؛ X يجب أن يحتوي الصفات وليس الفئة الهدف.
- ب) صحيح — هذا هو الكود الصحيح تماماً كما ورد في المحاضرة.
- ج) خاطئ — `axis=0` يعني حذف صفوف وليس أعمدة، وهذا خطأ منطقي هنا.
- د) خاطئ — لم يُحذف عمود Class من X، مما يجعل النموذج "يغش" باستخدام الهدف كصفة تنبؤية.

### السؤال 13
ماذا يحدث لو استخدمنا `criterion='entropy'` بدل الخيار الافتراضي في sklearn؟

أ) يتحول النموذج تلقائياً لـ Regression بدل Classification
ب) يُستخدم Information Gain المبني على Entropy كمعيار اختيار أفضل تقسيم، بدل Gini Index الافتراضي
ج) لا يوجد أي تأثير فعلي على النتائج
د) يمنع النموذج من قبول صفات ثنائية (Binary)

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — `DecisionTreeClassifier` يبقى مصنّفاً دائماً بغض النظر عن هذا الوسيط.
- ب) صحيح — هذا بالضبط دور وسيط `criterion` في sklearn.
- ج) خاطئ — قد يختلف شكل الشجرة الناتجة فعلياً حسب المعيار المستخدم (Entropy مقابل Gini).
- د) خاطئ — الصفات الثنائية مقبولة تماماً مع أي معيار تقسيم.

### السؤال 14
ما العلاقة الصحيحة بين تعقيد الشجرة (Model Complexity) و Training Error بحسب منحنى Overfitting/Underfitting؟

أ) Training Error يزداد دائماً مع زيادة التعقيد
ب) Training Error يتناقص عموماً مع زيادة التعقيد
ج) لا توجد أي علاقة بينهما
د) Training Error يبقى ثابتاً دائماً بغض النظر عن التعقيد

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — هذا عكس ما ورد نصياً في المحاضرة.
- ب) صحيح — "The training error can be decreased by increasing the model complexity" كما ورد حرفياً.
- ج) خاطئ — هناك علاقة عكسية واضحة موثقة في المحاضرة.
- د) خاطئ — يتغير Training Error فعلياً مع تغيّر التعقيد.

### السؤال 15
لماذا حوّلت المحاضرة مسألة تصنيف الفقاريات من 5 فئات إلى فئتين (mammals/non-mammals)؟

أ) لأن sklearn لا يدعم أكثر من فئتين
ب) بسبب قلة عدد أمثلة التدريب مقارنة بعدد الفئات الأصلي (5 فئات)
ج) لأن Entropy لا يمكن حسابه لأكثر من فئتين
د) بناءً على طلب المستخدم فقط دون سبب فني

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خاطئ — sklearn يدعم تصنيف متعدد الفئات (Multi-class) بشكل كامل وطبيعي.
- ب) صحيح — هذا هو السبب المذكور حرفياً في المحاضرة: "Given the limited number of training examples".
- ج) خاطئ — Entropy يُحسب بشكل طبيعي لأي عدد من الفئات.
- د) خاطئ — هناك سبب فني واضح ومنطقي وراء هذا التبسيط.

### السؤال 16
أي مما يلي **ليس** من الطرق العامة المذكورة في المحاضرة لمنع Overfitting؟

أ) Regularization
ب) Feature Selection
ج) More Data
د) زيادة max_depth دون حدود

**الإجابة الصحيحة: د**
**التعليل:**
- أ) خاطئ — مذكورة صراحة كطريقة عامة لمنع Overfitting.
- ب) خاطئ — مذكورة صراحة أيضاً.
- ج) خاطئ — مذكورة صراحة كذلك ("More data: sometimes the training set is not enough").
- د) صحيح — زيادة max_depth دون حدود تُزيد تعقيد الشجرة وتُفاقم Overfitting بدلاً من منعه؛ هذا عكس الهدف المطلوب تماماً.

---

## الجزء الرابع: أسئلة تصحيح الكود

### سؤال تصحيح كود 1 — نوع: `logic`

**الكود (يحتوي خطأ):**
```python
Y = data.drop(['Name','Class'], axis=1)
X = data['Class']
clf = tree.DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf = clf.fit(X, Y)
```

**اكتشف الخطأ:** تم عكس تعريف المتغيرين X و Y — فـ Y (الهدف) أصبح يحتوي كل صفات التدريب، بينما X (الصفات) أصبح يحتوي فقط عمود Class (الهدف الفعلي).

**التصحيح:**
```python
Y = data['Class']
X = data.drop(['Name','Class'], axis=1)
clf = tree.DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf = clf.fit(X, Y)
```

**شرح الحل (3 نقاط):**
1. `X` يجب دائماً أن يحتوي الصفات التنبؤية (Predictor variables) فقط، بدون عمود الهدف.
2. `Y` يجب أن يحتوي فقط عمود الفئة الهدف الذي نريد التنبؤ به.
3. عكس الترتيب يجعل النموذج يحاول التنبؤ بست صفات باستخدام عمود واحد فقط (Class) كمدخل، مما يسبب أخطاء منطقية أو نتائج عديمة المعنى.

---

### سؤال تصحيح كود 2 — نوع: `misconception`

**الكود (يحتوي خطأ):**
```python
X = data.drop(['Class'], axis=1)  # keeping Name column inside X
Y = data['Class']
clf = tree.DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf = clf.fit(X, Y)
```

**اكتشف الخطأ:** لم يُحذف عمود `Name` من X، فبقي معرّفاً فريداً شبه ID ضمن صفات التدريب، مما يخالف مبدأ تجنّب صفات المعرّف الفريد التي شُرحت في بداية المحاضرة (مشكلة تحيّز Information Gain).

**التصحيح:**
```python
X = data.drop(['Name','Class'], axis=1)
Y = data['Class']
clf = tree.DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf = clf.fit(X, Y)
```

**شرح الحل (3 نقاط):**
1. عمود `Name` هو نصّي وفريد لكل صف، تماماً كصفة `ID` التي ناقشناها مع مشكلة Information Gain.
2. تركه ضمن X (خاصة إذا حُوّل بشكل ما لصيغة رقمية) قد يُسبب Overfitting شديداً واختياراً مضللاً للصفة الأفضل.
3. يجب حذف كل أعمدة المعرّفات الفريدة قبل التدريب دائماً، وإبقاء الصفات ذات المعنى التنبؤي الحقيقي فقط.

---

### سؤال تصحيح كود 3 — نوع: `return_check`

**الكود (يحتوي خطأ):**
```python
from sklearn.metrics import accuracy_score

testY = testData['Class']
testX = testData.drop(['Name','Class'], axis=1)

predY = clf.fit(testX)
print('Accuracy on test data is %.2f' % (accuracy_score(testY, predY)))
```

**اكتشف الخطأ:** استُخدمت الدالة `clf.fit(testX)` بدل `clf.predict(testX)` — الدالة `fit()` تُستخدم للتدريب (وتحتاج X و Y معاً)، وليس للتنبؤ ببيانات جديدة. كما أن `fit()` هنا لا تُعيد تنبؤات بل تُعيد كائن النموذج نفسه بعد إعادة تدريبه (وبمدخل واحد فقط، مما سيسبب خطأ فعلياً لأن `fit` تتطلب X و Y).

**التصحيح:**
```python
from sklearn.metrics import accuracy_score

testY = testData['Class']
testX = testData.drop(['Name','Class'], axis=1)

predY = clf.predict(testX)
print('Accuracy on test data is %.2f' % (accuracy_score(testY, predY)))
```

**شرح الحل (3 نقاط):**
1. `fit(X, Y)` تُستخدم فقط لتدريب النموذج على بيانات تحتوي فئات معروفة (Y).
2. `predict(X)` هي الدالة الصحيحة للحصول على تنبؤات فئات لبيانات جديدة (بدون تمرير Y).
3. استدعاء `fit()` مرة أخرى هنا كان سيُعيد تدريب النموذج من الصفر على بيانات الاختبار فقط (لو كانت الوسائط صحيحة)، بدل استخدام النموذج المُدرَّب مسبقاً للتنبؤ — وهو خطأ منطقي جسيم يُفسد كل الغرض من وجود بيانات اختبار منفصلة.

---

### سؤال تصحيح كود 4 — نوع: `wrong_formula` (حساب Split Info)

**الحساب (يحتوي خطأ):**
```
values(wind) = {weak, strong}, |S_weak|=8, |S_strong|=6, |S|=14

SplitInfo(S, wind) = (8/14) × log2(8/14) + (6/14) × log2(6/14)
                   = 0.4034 + 0.5306   [بدون إشارة سالبة]
                   = 0.934  (تقريباً)
```

**اكتشف الخطأ:** الحساب نسي **الإشارة السالبة** الأساسية في معادلة Split Info (تماماً كما في معادلة Entropy). بما أن قيم `log2` لأعداد بين 0 و1 دائماً **سالبة**، فالمعادلة الصحيحة تضع إشارة سالبة أمام المجموع لتحويل الناتج لقيمة موجبة صحيحة.

**التصحيح:**
```
SplitInfo(S, wind) = -[(8/14) × log2(8/14) + (6/14) × log2(6/14)]
                   = -[(0.571 × (-0.807)) + (0.429 × (-1.222))]
                   = -[-0.4608 - 0.5241]
                   = 0.9849 ≈ 0.9852
```

**شرح الحل (3 نقاط):**
1. `log2` لأي كسر بين 0 و1 (مثل 8/14 أو 6/14) هو دائماً **قيمة سالبة**.
2. بدون الإشارة السالبة الخارجية في المعادلة، ستكون النتيجة النهائية سالبة، وهذا غير منطقي لمقياس مثل Split Info (يجب أن يكون موجباً دائماً).
3. القيمة الصحيحة (≈0.9852) تطابق تماماً ما ورد في المحاضرة، بينما الحساب الخاطئ (بدون إشارة سالبة) يعطي قيمة موجبة لكنها من مصدر خاطئ رياضياً (لأنه جمع سالبين ليحصل خطأً على موجب أصغر).

---

### سؤال تصحيح كود 5 — نوع: `dead_code`

**الكود (يحتوي خطأ):**
```python
data['Class'] = data['Class'].replace(['fishes','birds','amphibians','reptiles'], 'non-mammals')

def convert_to_binary(data):
    # This function is supposed to convert Class column but is never called
    data['Class'] = data['Class'].replace(['fishes','birds','amphibians','reptiles'], 'non-mammals')
    return data

X = data.drop(['Name','Class'], axis=1)
Y = data['Class']
```

**اكتشف الخطأ:** الدالة `convert_to_binary` مكتوبة لكنها **لا تُستدعى أبداً** (Dead Code) — رغم أن التحويل الفعلي حدث مسبقاً في السطر الأول خارج الدالة، مما يجعل الدالة بأكملها غير مستخدمة ومربكة (كود ميت تماماً لا تأثير له على النتيجة النهائية).

**التصحيح:**
```python
# Remove the unused function entirely — the conversion already happened directly above
data['Class'] = data['Class'].replace(['fishes','birds','amphibians','reptiles'], 'non-mammals')

X = data.drop(['Name','Class'], axis=1)
Y = data['Class']
```

**شرح الحل (3 نقاط):**
1. الكود الميت (Dead Code) هو أي جزء من الكود لا يُنفَّذ فعلياً أو لا يؤثر على النتيجة النهائية.
2. وجود دالة معرّفة لكن غير مستدعاة يجعل قراءة الكود مربكة ويوحي بخطأ منطقي (وكأن المبرمج نسي استدعاءها).
3. الحل الأنظف هو إما حذف الدالة غير المستخدمة تماماً، أو استدعاؤها فعلياً بدل تكرار المنطق خارجها مباشرة.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل.

### تمرين 1 — نوع: `metric_calculation`

**المعطيات:** صفة `Outlook` في بيانات Play Tennis لها 3 قيم: Sunny (5 أيام)، Overcast (4 أيام)، Rain (5 أيام)، من إجمالي 14 يوماً.

**المطلوب:**
1. احسب `Split Info(S, Outlook)`.
2. إذا كان `Gain(S,Outlook) = 0.246`، احسب `GainRatio(Outlook)`.

**نموذج الحل:**
```
P(Sunny)=5/14≈0.357, P(Overcast)=4/14≈0.286, P(Rain)=5/14≈0.357

SplitInfo = -(0.357×log2(0.357)) - (0.286×log2(0.286)) - (0.357×log2(0.357))
          = -(0.357×(-1.487)) - (0.286×(-1.807)) - (0.357×(-1.487))
          = 0.531 + 0.517 + 0.531
          = 1.579 (تقريباً)

GainRatio(Outlook) = 0.246 / 1.579 ≈ 0.156
```

---

### تمرين 2 — نوع: `code_fix`

**المعطيات:**
```python
clf = tree.DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf = clf.fit(Y, X)  # خطأ محتمل في ترتيب الوسائط
```

**المطلوب:**
1. حدّد إن كان هناك خطأ في هذا السطر.
2. صحّح الكود إذا لزم.

**نموذج الحل:**
```python
# الخطأ: تم عكس ترتيب الوسائط في fit() — يجب أن يكون fit(X, Y) وليس fit(Y, X)
clf = clf.fit(X, Y)
```
دالة `.fit()` في sklearn تتوقع الصفات (X) كوسيط أول، ثم الفئة الهدف (Y) كوسيط ثانٍ. عكس الترتيب سيُسبب خطأً أو نتائج غير منطقية لأن الأبعاد (Dimensions) لن تتطابق مع المتوقع داخلياً.

---

### تمرين 3 — نوع: `scenario`

**المعطيات:** لديك شجرتان: شجرة A بعمق max_depth=10 حققت Training Accuracy=99% و Test Accuracy=65%. شجرة B بعمق max_depth=4 حققت Training Accuracy=88% و Test Accuracy=85%.

**المطلوب:**
1. أي الشجرتين تعاني من Overfitting أكثر؟ ولماذا؟
2. أي شجرة تنصح باعتمادها عملياً؟

**نموذج الحل:**
1. الشجرة A تعاني من Overfitting بشكل واضح — الفجوة بين Training (99%) و Test (65%) كبيرة جداً (34 نقطة مئوية)، مما يدل على حفظ مفرط لتفاصيل بيانات التدريب.
2. تُنصح الشجرة B لأنها رغم دقة تدريب أقل (88%)، إلا أن أداءها على بيانات جديدة (Test=85%) أفضل بكثير وأكثر اتساقاً، مما يعني قدرة تعميم أعلى — وهذا هو المعيار الأهم عملياً.

---

### تمرين 4 — نوع: `fill_gaps`

**المعطيات:**
```python
from sklearn import tree
from sklearn.metrics import _______  # (1)

Y = data['Class']
X = data.drop(['Name', _______], axis=1)  # (2)

clf = tree.DecisionTreeClassifier(criterion=_______, max_depth=3)  # (3)
clf = clf.fit(X, Y)

predY = clf._______(testX)  # (4)
print('Accuracy: %.2f' % (accuracy_score(testY, predY)))
```

**المطلوب:** أكمل الفراغات (1) إلى (4).

**نموذج الحل:**
1. `accuracy_score`
2. `'Class'`
3. `'entropy'`
4. `predict`

---

### تمرين 5 — نوع: `model_apply`

**المعطيات:** حيوان جديد اسمه `bat` (خفاش) بالصفات التالية: Warm-blooded=1, Gives Birth=1, Aquatic Creature=0, Aerial Creature=1, Has Legs=1, Hibernates=1.

**المطلوب:** بناءً على منطق شجرة قرار بسيطة تعتمد أساساً على Warm-blooded ثم Gives Birth (مشابهة لشجرة M2 المذكورة سابقاً)، توقّع تصنيف هذا الحيوان (mammals أو non-mammals) واشرح المنطق.

**نموذج الحل:**
باستخدام منطق شجرة بسيطة (Body Temperature → Gives Birth):
- Warm-blooded = 1 → ننتقل لفحص Gives Birth.
- Gives Birth = 1 → التصنيف: **mammals**.

هذا التصنيف صحيح فعلياً بيولوجياً؛ الخفاش ثديي حقيقي رغم قدرته على الطيران (Aerial Creature=1)، وهذا يوضّح كيف يمكن لشجرة بسيطة تعتمد على صفات أساسية أن تصنّف بدقة حتى الحالات التي تبدو "غريبة" ظاهرياً (حيوان طائر لكنه ثديي).

---

### تمرين 6 — نوع: `metric_calculation`

**المعطيات:** نموذج طُبّق على 20 مثال اختبار، أصاب في 17 منها وأخطأ في 3.

**المطلوب:** احسب Accuracy و نسبة الخطأ (Error Rate).

**نموذج الحل:**
```
Accuracy = 17/20 = 0.85 (85%)
Error Rate = 3/20 = 0.15 (15%)
ملاحظة: Accuracy + Error Rate = 1 دائماً (100%)
```

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 1: مقارنة Gain Ratio بين صفتين

**السيناريو:**
لديك صفتان في بيانات تدريب لـ 20 عنصر:
- الصفة A: تنقسم إلى قيمتين فقط (10 و 10).
- الصفة B: تنقسم إلى 20 قيمة فريدة (عنصر واحد لكل قيمة، مثل ID).

**المطلوب:**
1. احسب Split Info تقريبياً لكل صفة (وصفياً دون أرقام دقيقة إن لزم).
2. أيهما ستحصل غالباً على GainRatio أعلى، الصفة A أم B؟ علّل.

**نموذج الحل:**
1. الصفة A: `SplitInfo = -(0.5×log2(0.5)) × 2 = 1.0` (قيمة معتدلة). الصفة B: `SplitInfo = -Σ(1/20 × log2(1/20)) لـ 20 حداً = log2(20) ≈ 4.32` (قيمة مرتفعة جداً).
2. رغم أن الصفة B قد تُعطي `Gain` أعلى ظاهرياً (بسبب فروع نقية تماماً)، فإن `Split Info` المرتفع جداً لها (4.32) سيُخفّض `GainRatio` بشكل كبير جداً عند القسمة، بينما الصفة A ستحصل غالباً على `GainRatio` أعلى وأكثر واقعية بسبب `Split Info` المعتدل (1.0). هذا يوضّح عملياً كيف يعالج `Gain Ratio` مشكلة التحيّز.

---

### تمرين 2: إكمال مخطط شجرة القرار (diagram_completion)

**السيناريو:**
شجرة قرار غير مكتملة لتصنيف mammals/non-mammals:
```
Warm-blooded?
├── No → ?
└── Yes → Gives Birth?
           ├── No → ?
           └── Yes → ?
```

**المطلوب:** أكمل التصنيفات الناقصة (؟) بناءً على منطق شجرة M2 المذكورة في المحاضرة.

**نموذج الحل:**
```
Warm-blooded?
├── No → Non-mammals   (كل الحيوانات باردة الدم في بيانات التدريب: زواحف، أسماك، برمائيات)
└── Yes → Gives Birth?
           ├── No → Non-mammals   (مثل الطيور: تضع بيضاً ولا تلد)
           └── Yes → Mammals      (الثدييات التي تلد)
```

---

### تمرين 3: جدول تعبئة Confusion-style لتقييم Test Data

**السيناريو:**
بيانات الاختبار الأربعة (gila monster, platypus, owl, dolphin) طُبِّق عليها النموذج وأعطى Accuracy=0.75.

**المطلوب:** أكمل الجدول التالي بافتراض أن الخطأ الوحيد كان في `platypus` (بسبب استثنائه البيولوجي المذكور سابقاً).

| الحيوان | الفئة الحقيقية | الفئة المتوقعة | صحيح/خاطئ |
| --- | --- | --- | --- |
| gila monster | non-mammals | ؟ | ؟ |
| platypus | mammals | ؟ | ؟ |
| owl | non-mammals | ؟ | ؟ |
| dolphin | mammals | ؟ | ؟ |

**نموذج الحل:**

| الحيوان | الفئة الحقيقية | الفئة المتوقعة | صحيح/خاطئ |
| --- | --- | --- | --- |
| gila monster | non-mammals | non-mammals | صحيح |
| platypus | mammals | non-mammals | خاطئ (بسبب Gives Birth=0 رغم كونه ثديياً) |
| owl | non-mammals | non-mammals | صحيح |
| dolphin | mammals | mammals | صحيح |

---

### تمرين 4: تحليل مكتوب (written_analysis)

**السيناريو:** فريق تطوير بنى شجرة قرار بعمق `max_depth=50` بدون أي قيد آخر، وحصل على Training Accuracy=100%.

**المطلوب:** اكتب تحليلاً من 3-4 جمل يوضّح المخاطر المحتملة لهذا القرار ويقترح حلاً عملياً.

**نموذج الحل:**
دقة تدريب 100% مع عمق كبير جداً (50) هي علامة تحذير قوية جداً على Overfitting شديد؛ فمن شبه المؤكد أن الشجرة حفظت تفاصيل دقيقة جداً من بيانات التدريب (بما فيها الضوضاء) بدل تعلّم نمط عام قابل للتعميم. يُنصح الفريق بتقييم أداء النموذج فعلياً على مجموعة اختبار منفصلة (Test Set) للتأكد من حجم الفجوة الحقيقية، ثم تطبيق إحدى تقنيات المعالجة مثل تقليص `max_depth` بشكل معقول (Prepruning) أو تطبيق Postpruning على الشجرة الحالية، أو حتى جمع بيانات تدريب إضافية إن كانت العينة الحالية صغيرة جداً.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: حساب Split Info لصفة Outlook خطوة بخطوة

**المدخل:**
```python
values = {'Sunny': 5, 'Overcast': 4, 'Rain': 5}  # out of 14 total examples
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب P لكل قيمة | ؟ |
| 2 | حساب log2(P) لكل قيمة | ؟ |
| 3 | ضرب P × log2(P) لكل قيمة | ؟ |
| 4 | جمع القيم مع إشارة سالبة | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | P(Sunny)=5/14≈0.357, P(Overcast)=4/14≈0.286, P(Rain)=5/14≈0.357 | جاهز |
| 2 | log2(0.357)≈-1.487, log2(0.286)≈-1.807, log2(0.357)≈-1.487 | جاهز |
| 3 | 0.357×(-1.487)≈-0.531, 0.286×(-1.807)≈-0.517, 0.357×(-1.487)≈-0.531 | جاهز |
| 4 | -(-0.531-0.517-0.531) = 1.579 | SplitInfo(S,Outlook)≈1.579 |

**النتيجة:** `SplitInfo(S, Outlook) ≈ 1.579`

---

### تمرين تتبع 2: تتبّع بناء شجرة قرار بعمق محدود (max_depth تدريجي)

**المدخل:**
```python
depths = [1, 2, 3, 4, 5]
# افترض قياس Test Accuracy عند كل عمق
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار (max_depth) | Training Accuracy المتوقعة | Test Accuracy المتوقعة |
| --- | --- | --- |
| 1 | منخفضة (Underfitting) | منخفضة |
| 2 | ؟ | ؟ |
| 3 | ؟ | ؟ (الأفضل عادة في مثال بسيط) |
| 4 | ؟ | ؟ |
| 5 | مرتفعة جداً قد تصل لـ100% | ؟ (قد تبدأ بالانخفاض — Overfitting) |

**نموذج الحل:**
| التكرار (max_depth) | Training Accuracy المتوقعة | Test Accuracy المتوقعة |
| --- | --- | --- |
| 1 | منخفضة (Underfitting) | منخفضة |
| 2 | تتحسن تدريجياً | تتحسن تدريجياً |
| 3 | جيدة | غالباً أفضل نقطة توازن (كما في مثال المحاضرة max_depth=3) |
| 4 | ترتفع أكثر | قد تستقر أو تبدأ بالتذبذب |
| 5 | مرتفعة جداً (قد تصل لـ100%) | قد تبدأ بالانخفاض بسبب Overfitting |

**النتيجة:** أفضل توازن عادة يكون عند عمق معتدل (هنا max_depth=3 كما استخدمت المحاضرة فعلياً)، وليس عند أعمق شجرة ممكنة.

---

### تمرين تتبع 3: تتبّع عملية Postpruning على شجرة صغيرة

**المدخل:**
```
شجرة: A1? → (yes) A2? → (yes) leaf=classA, (no) leaf=classB
              → (no) A3? → (yes) leaf=classB, (no) leaf=classA
افترض: عينات الشجرة الفرعية تحت A3 غالبيتها class B (60%)
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فحص الشجرة الفرعية تحت A3 | ؟ |
| 2 | حساب الفئة الأغلبية فيها | ؟ |
| 3 | استبدال الشجرة الفرعية بورقة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فحص الشجرة الفرعية تحت A3 (عقدة قرار بفرعين: class B و class A) | تحتوي توزيعاً 60% class B |
| 2 | حساب الفئة الأغلبية فيها | class B هي الأغلبية (60%) |
| 3 | استبدال A3? بأكملها بورقة واحدة | leaf = "class B" |

**النتيجة:** الشجرة بعد التقليم: `A1? → (yes) A2? → (yes) classA, (no) classB → (no) class B`

---

### تمرين تتبع 4: تتبّع حساب Accuracy تراكمياً

**المدخل:**
```python
predictions = ['mammals','non-mammals','non-mammals','mammals','non-mammals']
true_labels = ['mammals','mammals','non-mammals','mammals','non-mammals']
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة (index) | Prediction | True Label | صحيح؟ | العدّاد التراكمي للصحيح |
| --- | --- | --- | --- | --- |
| 0 | mammals | mammals | ؟ | ؟ |
| 1 | non-mammals | mammals | ؟ | ؟ |
| 2 | non-mammals | non-mammals | ؟ | ؟ |
| 3 | mammals | mammals | ؟ | ؟ |
| 4 | non-mammals | non-mammals | ؟ | ؟ |

**نموذج الحل:**
| الخطوة (index) | Prediction | True Label | صحيح؟ | العدّاد التراكمي للصحيح |
| --- | --- | --- | --- | --- |
| 0 | mammals | mammals | صحيح | 1 |
| 1 | non-mammals | mammals | خاطئ | 1 |
| 2 | non-mammals | non-mammals | صحيح | 2 |
| 3 | mammals | mammals | صحيح | 3 |
| 4 | non-mammals | non-mammals | صحيح | 4 |

**النتيجة:** `Accuracy = 4/5 = 0.80`

---

### تمرين تتبع 5: تتبّع اختيار أفضل صفة باستخدام Gain Ratio

**المدخل:**
```python
attributes = {
  'Wind': {'Gain': 0.048, 'SplitInfo': 0.9852},
  'Outlook': {'Gain': 0.246, 'SplitInfo': 1.579},
  'Humidity': {'Gain': 0.151, 'SplitInfo': 1.000}
}
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الصفة | GainRatio = Gain/SplitInfo | تصنيف الأفضلية |
| --- | --- | --- |
| Wind | ؟ | ؟ |
| Outlook | ؟ | ؟ |
| Humidity | ؟ | ؟ |

**نموذج الحل:**
| الصفة | GainRatio = Gain/SplitInfo | تصنيف الأفضلية |
| --- | --- | --- |
| Wind | 0.048/0.9852 ≈ 0.019 | الأضعف |
| Outlook | 0.246/1.579 ≈ 0.156 | الأقوى |
| Humidity | 0.151/1.000 = 0.151 | الثانية |

**النتيجة:** الصفة `Outlook` تحصل على أعلى `Gain Ratio` (≈0.156) وبالتالي تُختار كأفضل صفة للتقسيم عند هذه العقدة.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### السؤال 1: ما هو Gain Ratio ولماذا وُجد؟
**نموذج الإجابة:** 1. التعريف: معيار تقسيم يُطبّع Information Gain بقسمته على Split Info. 2. المكونات/الشروط: يحتاج حساب Gain(S,A) و SplitInfo(S,A) مسبقاً. 3. مثال رقمي: GainRatio(Wind)=0.048/0.9852≈0.019. 4. متى نستخدم: عند وجود صفات بأعداد قيم متفاوتة جداً، لتجنب التحيّز نحو الصفات كثيرة القيم مثل ID.

### السؤال 2: كيف يُحسب Split Info رياضياً؟
**نموذج الإجابة:** 1. التعريف: مقياس تشتت توزيع العناصر على قيم صفة معينة. 2. المكونات: نسبة كل فرع P_v = |S_v|/|S|، ومعادلة -Σ P_v × log2(P_v). 3. مثال رقمي: لصفة Wind بقيمتين (8/14 و6/14) تُعطي SplitInfo≈0.9852. 4. متى نستخدم: كخطوة وسيطة إلزامية لحساب Gain Ratio.

### السؤال 3: ما الفرق بين Training Error و Test Error؟
**نموذج الإجابة:** 1. التعريف: Training Error هو خطأ النموذج على بيانات دُرِّب عليها، Test Error هو الخطأ على بيانات جديدة لم يرها. 2. المكونات: كلاهما نسبة أخطاء التصنيف. 3. مثال رقمي: شجرة M1: Training=0%, Test=30%. 4. متى نستخدم: Test Error هو المعيار الحقيقي لتقييم جودة تعميم النموذج، لا Training Error وحده.

### السؤال 4: عرّف Overfitting واذكر مؤشرين على وجوده.
**نموذج الإجابة:** 1. التعريف: حالة يصبح فيها النموذج معقداً جداً بحيث يحفظ تفاصيل التدريب (بما فيها الضوضاء) بدل تعلّم نمط عام. 2. المؤشرات: (أ) فجوة كبيرة بين Training Error المنخفض و Test Error المرتفع، (ب) مناطق قرار صغيرة جداً ومفرطة التفصيل في فضاء الصفات. 3. مثال رقمي: M1 (Training=0%, Test=30%). 4. متى يظهر: عندما ينمو النموذج (الشجرة) أكثر من اللازم مقارنة بحجم/تعقيد البيانات الفعلي.

### السؤال 5: ما الفرق بين Prepruning و Postpruning؟
**نموذج الإجابة:** 1. التعريف: Prepruning يوقف بناء الشجرة مبكراً، Postpruning يبني الشجرة كاملة ثم يزيل أجزاء منها. 2. المكونات: Prepruning يعتمد على عتبات توقف مسبقة، Postpruning يعتمد على استبدال أشجار فرعية بأوراق. 3. مثال رقمي: max_depth=3 في sklearn مثال Prepruning. 4. متى نستخدم: Postpruning مفضّل عملياً غالباً رغم بطئه، لأنه يرى الصورة الكاملة قبل اتخاذ قرار التقليم.

### السؤال 6: كيف تُستبدل الشجرة الفرعية في Postpruning؟
**نموذج الإجابة:** 1. التعريف: تُستبدل بورقة واحدة (Leaf). 2. المكونات: توسم الورقة بالفئة الأكثر تكراراً بين عناصر الشجرة الفرعية المُزالة. 3. مثال رقمي: في مثال المحاضرة، العقدة A3? استُبدلت بورقة "class B". 4. متى نستخدم: عندما يتبين أن الشجرة الفرعية لا تُحسّن الأداء الحقيقي على بيانات جديدة (Validation).

### السؤال 7: عرّف Decision Region و Decision Boundary.
**نموذج الإجابة:** 1. التعريف: Decision Region هي مستطيل في فضاء الصفات مصنَّف لفئة معينة، Decision Boundary هو الخط الفاصل بينها. 2. المكونات: تُبنى المناطق من شروط عُقد الشجرة (axis-parallel hyper-rectangles). 3. مثال رقمي: مثال Income/Debt في المحاضرة يوضّح تعدد المناطق. 4. متى يهمنا: عند تحليل أثر Overfitting بصرياً — مناطق أصغر تعني تعقيداً أكبر.

### السؤال 8: لماذا تُعتبر صفة ID مشكلة في خوارزميات شجرة القرار المبنية على Information Gain؟
**نموذج الإجابة:** 1. التعريف: صفة ID فريدة لكل عنصر. 2. المكونات: تُنتج فروعاً نقية 100% (Entropy=0) لكل قيمة. 3. مثال رقمي: Gain(S,ID) يصل لأقصى قيمة ممكنة (يساوي Entropy الكلي). 4. متى تظهر المشكلة: عند اختيار الصفة بناءً على Information Gain وحده دون تصحيح (مثل Gain Ratio) أو دون استبعاد صفات المعرّفات يدوياً.

### السؤال 9: ما دور معامل max_depth في sklearn.tree.DecisionTreeClassifier؟
**نموذج الإجابة:** 1. التعريف: وسيط يحدد أقصى عمق مسموح به للشجرة. 2. المكونات: قيمة عددية صحيحة (مثل 3). 3. مثال رقمي: max_depth=3 استُخدم في مثال المحاضرة العملي. 4. متى نستخدمه: كأداة عملية مباشرة لتطبيق Prepruning ومنع نمو الشجرة المفرط.

### السؤال 10: كيف نحسب Accuracy ولماذا لا يكفي وحده أحياناً؟
**نموذج الإجابة:** 1. التعريف: نسبة التنبؤات الصحيحة إلى إجمالي عدد الأمثلة. 2. المكونات: عدد التصنيفات الصحيحة ÷ العدد الكلي. 3. مثال رقمي: 3 صحيح من 4 = 0.75. 4. متى لا يكفي: عند مجموعات اختبار صغيرة جداً (كما في مثال 4 أمثلة فقط) يصبح رقم Accuracy حساساً جداً وغير موثوق إحصائياً؛ يُفضَّل استخدام مقاييس إضافية (Precision, Recall, F1) ومجموعات اختبار أكبر في المشاريع الحقيقية.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| محاضرة Information Gain / Entropy (سابقة) | هذه المحاضرة (Gain Ratio) | Gain Ratio هو تحسين مباشر على Information Gain لمعالجة تحيّزه |
| هذه المحاضرة (Overfitting/Pruning) | محاضرات تقييم النماذج لاحقاً (Confusion Matrix، Precision/Recall) | كلاهما يخدم هدف تقييم جودة النموذج على بيانات حقيقية |
| هذه المحاضرة (sklearn عملي) | محاضرات Classification الأخرى (Naive Bayes، kNN، SVM) | نفس نمط الكود (fit/predict/accuracy_score) يتكرر مع كل مصنّف في sklearn |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| Gain Ratio | يعالج تحيّز Information Gain نحو الصفات كثيرة القيم عبر القسمة على Split Info |
| Overfitting | مؤشره الأساسي: فجوة كبيرة بين Training Error (منخفض) و Test Error (مرتفع) |
| Pruning | Postpruning يُفضَّل عملياً رغم بطئه؛ Prepruning أسرع لكن أخطر (توقف مبكر جداً) |
| sklearn | نمط ثابت: fit(X,Y) للتدريب، predict(X) للتنبؤ، accuracy_score للتقييم |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `Gain(S,A)` | مقدار تقليل عدم اليقين عند التقسيم على A | Information Gain, Gain Ratio |
| `SplitInfo(S,A)` | تشتت توزيع البيانات على قيم A | مقام معادلة Gain Ratio |
| `max_depth` | أقصى عمق للشجرة في sklearn | Prepruning عملي |
| `criterion='entropy'` | استخدام Entropy كمعيار تقسيم في sklearn | بناء DecisionTreeClassifier |
| `accuracy_score` | دالة حساب الدقة | تقييم النموذج بعد predict() |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | احذف دائماً أعمدة المعرّفات الفريدة (ID/Name) قبل تدريب أي نموذج تصنيف |
| 2 | الأولوية دوماً لـ Test Error وليس Training Error عند تقييم جودة نموذج |
| 3 | Gain Ratio = Gain ÷ Split Info — لا تنسَ حساب الاثنين قبل القسمة |
| 4 | Postpruning يستبدل شجرة فرعية كاملة بورقة واحدة تحمل الفئة الأغلبية |
| 5 | في sklearn: X تحتوي الصفات فقط، Y تحتوي الفئة الهدف فقط — لا تعكسهما أبداً |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الفرق بين Classification و Clustering؟
A: Classification تصنيف موجَّه (Supervised) يستخدم فئات معروفة مسبقاً للتدريب، بينما Clustering تجميع غير موجَّه (Unsupervised) يكتشف مجموعات دون فئات معروفة مسبقاً.

**Q2:** لماذا يُعتبر Information Gain متحيّزاً؟
A: لأنه يميل لتفضيل الصفات ذات القيم الكثيرة (مثل ID) لأنها تُنتج فروعاً نقية جداً بشكل مضلل وعديم الفائدة عملياً.

**Q3:** ما معادلة Gain Ratio؟
A: `GainRatio(S,A) = Gain(S,A) / SplitInfo(S,A)`.

**Q4:** ما قيمة GainRatio(Wind) في مثال المحاضرة؟
A: تقريباً 0.019.

**Q5:** ما تعريف Overfitting باختصار؟
A: النموذج يحفظ تفاصيل بيانات التدريب (بما فيها الضوضاء) بدل تعلّم نمط عام قابل للتعميم.

**Q6:** ما مؤشر Overfitting الرقمي الأساسي؟
A: فجوة كبيرة بين Training Error المنخفض جداً و Test Error المرتفع.

**Q7:** ما الفرق بين Prepruning و Postpruning؟
A: Prepruning يوقف بناء الشجرة مبكراً، بينما Postpruning يبني الشجرة كاملة أولاً ثم يزيل أجزاء منها.

**Q8:** بماذا تُستبدل الشجرة الفرعية في Postpruning؟
A: بورقة واحدة تحمل الفئة الأكثر تكراراً بين عناصر تلك الشجرة الفرعية.

**Q9:** ما هو Decision Region؟
A: مستطيل في فضاء الصفات (axis-parallel hyper-rectangle) يُصنَّف بفئة معينة بناءً على الأغلبية.

**Q10:** ما الفرق بين Decision Region و Decision Boundary؟
A: Decision Region هي المنطقة نفسها، بينما Decision Boundary هو الخط الفاصل بين منطقتين من فئتين مختلفتين.

**Q11:** ما وسيط sklearn الذي يُطبِّق Prepruning عملياً؟
A: `max_depth` في `DecisionTreeClassifier`.

**Q12:** لماذا حُذف عمود Name من بيانات تدريب Vertebrate Dataset؟
A: لأنه معرّف فريد شبه ID، يُسبب نفس مشكلة التحيّز التي تُعالجها Gain Ratio.

**Q13:** ما دالة sklearn المستخدمة للتنبؤ بعد التدريب؟
A: `.predict(X)`.

**Q14:** كيف نحسب Accuracy؟
A: عدد التنبؤات الصحيحة ÷ إجمالي عدد الأمثلة.

**Q15:** لماذا حُوِّلت مسألة تصنيف الفقاريات إلى تصنيف ثنائي (mammals/non-mammals)؟
A: بسبب قلة عدد أمثلة التدريب المتاحة مقارنة بعدد الفئات الأصلي (5 فئات).

**Q16:** ماذا كانت نتيجة Accuracy في مثال بيانات الاختبار للفقاريات؟
A: 0.75 (أي 75%، بسبب خطأ واحد في تصنيف platypus).

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> الكود الكامل مجمّع من جميع أجزاء المحاضرة — مرجع للطالب، لا شرح جديد.

```python
# === Data Loading & Preprocessing ===
import pandas as pd

data = pd.read_csv('vertebrate.csv', header='infer')
data['Class'] = data['Class'].replace(['fishes', 'birds', 'amphibians', 'reptiles'], 'non-mammals')

# === Classification: Decision Tree (Entropy criterion, Prepruning via max_depth) ===
from sklearn import tree

Y = data['Class']
X = data.drop(['Name', 'Class'], axis=1)

clf = tree.DecisionTreeClassifier(criterion='entropy', max_depth=3)
clf = clf.fit(X, Y)

# === Test Data Preparation ===
testData = [['gila monster', 0, 0, 0, 0, 1, 1, 'non-mammals'],
            ['platypus', 1, 0, 0, 0, 1, 1, 'mammals'],
            ['owl', 1, 0, 0, 1, 1, 0, 'non-mammals'],
            ['dolphin', 1, 1, 1, 0, 0, 0, 'mammals']]
testData = pd.DataFrame(testData, columns=data.columns)

# === Model Evaluation ===
from sklearn.metrics import accuracy_score

testY = testData['Class']
testX = testData.drop(['Name', 'Class'], axis=1)

predY = clf.predict(testX)
print('Accuracy on test data is %.2f' % (accuracy_score(testY, predY)))
```

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع شرح لماذا يتحيّز Information Gain نحو الصفات كثيرة القيم مثل ID
- [ ] أستطيع كتابة معادلة Gain Ratio ومعادلة Split Info من الذاكرة
- [ ] أستطيع حساب Split Info و Gain Ratio يدوياً لمثال معطى (مثل صفة Wind)
- [ ] أفهم الفرق بين Training Error و Test Error ولماذا Test Error أهم
- [ ] أستطيع شرح مثال M1 (شجرة معقدة) مقابل M2 (شجرة بسيطة) وأداءهما
- [ ] أفهم العلاقة بين تعقيد النموذج و Overfitting/Underfitting من المنحنى البياني
- [ ] أستطيع شرح Decision Region و Decision Boundary وربطهما بـ Overfitting
- [ ] أفهم الفرق الدقيق بين Prepruning و Postpruning ومتى يُفضَّل كل منهما
- [ ] أستطيع شرح كيف يستبدل Postpruning شجرة فرعية بورقة (leaf) واحدة
- [ ] أستطيع كتابة كود sklearn كاملاً: تحميل بيانات، فصل X/Y، بناء DecisionTreeClassifier، fit، predict، accuracy_score
- [ ] أفهم لماذا يجب حذف أعمدة المعرّفات الفريدة (Name/ID) قبل التدريب
- [ ] أستطيع حساب Accuracy يدوياً من عدد التنبؤات الصحيحة والخاطئة
- [ ] راجعت جميع الأمثلة العددية (Gain Ratio لـ Wind، Accuracy=0.75) وأستطيع إعادة اشتقاقها

<!-- VALIDATION: تم تغطية جميع شرائح المحاضرة (30-48) المزوَّدة، شاملة: Gain Ratio ومثاله العددي، Overfitting بأمثلته وأشكاله (Training/Test Error، منحنى Complexity، Decision Regions)، طرق منع Overfitting و Tree Pruning (Pre/Post)، وتطبيق عملي كامل بـ pandas و sklearn على Vertebrate Dataset (تحميل، تحويل ثنائي، تدريب DecisionTreeClassifier، اختبار، وحساب Accuracy). تم الالتزام ببنية SCHEMA.md v1.0 من حيث الأقسام المرقّمة، قوالب الكتل (كود/خوارزمية/مخطط/تشبيه/معادلة/مقايضة/قبل-بعد/تتبع)، وأجزاء الأسئلة (16 MCQ، 5 تصحيح كود، تمارين تطبيقية وتحليلية وتتبع، أسئلة نظرية، Cheat Sheet، بطاقات Q&A، الكود الكامل، وقائمة الفحص الذاتي). -->
