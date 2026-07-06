# المحاضرة 8 — Classification (تصنيف - الجزء الثالث): تقييم المصنّفات وطرق أخذ العينات
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** `Classifier Evaluation Metrics`، `Confusion Matrix`، `Sampling Methods` (`Holdout`، `Cross-Validation`، `Bootstrap`)

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| بناء المصنّف (المحاضرات 6-7) | `Decision Tree`، `Naïve Bayes`، `kNN`، `SVM` | نموذج تصنيف مدرَّب |
| تقييم المصنّف ← أنت هنا | `Confusion Matrix`، `Accuracy`، `Precision`، `Recall`، `F1`، `Holdout`، `Cross-Validation`، `Bootstrap` | مقاييس أداء موثوقة للنموذج |
| تحسين الأداء (محاضرات لاحقة) | `Bagging`، `Boosting`، `Random Forests` | نموذج مُجمَّع أدق |

> **نوع هذه المحاضرة:** محاضرة **Classification** — تركّز تحديدًا على قياس جودة أي مصنّف (`Decision Tree`, `Naïve Bayes`, `kNN`, `SVM`, ...) والتأكد من أن التقييم غير منحاز، عبر مقاييس مثل `Confusion Matrix`, `Precision`, `Recall`, `F1` وطرق تقسيم البيانات مثل `Holdout` و `Cross-Validation`.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. دور مجموعة الاختبار (The Role of the Test Set)

#### النص الأصلي يقول:
> "The quality of a classifier is evaluated over a test set, different (disjoint) from the training set. Training and testing sets come from the same distribution. For each instance in the test set, we know its true class label. We compare the predicted class (by some classifier) with the true class of the test instances."

#### الشرح المبسّط:
لا يمكن أن نحكم على مصنّف بأدائه على البيانات نفسها التي تعلّم منها؛ لأنه ببساطة قد يكون "حفظ" الإجابات بدلاً من "فهم" النمط. لذلك نفصل البيانات إلى:
- **مجموعة تدريب `Training Set`**: يتعلّم منها النموذج.
- **مجموعة اختبار `Test Set`**: بيانات لم يرَها النموذج أبدًا، نستخدمها للحكم عليه بصدق.

كلا المجموعتين يجب أن تأتيا من نفس التوزيع الإحصائي (`same distribution`) حتى يكون التقييم عادلاً وممثلاً للواقع.

**لماذا؟** لأن الهدف الحقيقي من النموذج هو التعميم `Generalization` على بيانات جديدة لم يرها من قبل، وليس حفظ بيانات التدريب.

#### 💡 التشبيه:
> تخيّل طالبًا يدرس من كتاب معيّن (`Training Set`)، ثم يُمتحن بأسئلة مختلفة تمامًا عن أسئلة الكتاب لكن بنفس المستوى والمنهج (`Test Set`).
> **وجه الشبه:** الكتاب = بيانات التدريب | ورقة الامتحان = بيانات الاختبار | الفهم الحقيقي = التعميم `Generalization`.

---

### 2. مصفوفة الالتباس (Confusion Matrix)

#### النص الأصلي يقول:
> "A useful tool for analyzing how well a classifier performs. Built from the test set and the predictions of the classifier... P: # positive tuples... N: # negative tuples... TP: true positives... TN: true negatives... FP: false positives... FN: false negatives."

#### الشرح المبسّط:
`Confusion Matrix` هي جدول يقارن بين **التصنيف الحقيقي `Actual Class`** و**التصنيف المتوقع `Predicted Class`** لكل تُوبل (سجل) في مجموعة الاختبار. في حالة التصنيف الثنائي (`Binary Classification`) لدينا أربع خانات أساسية:

| الرمز | المعنى | التفسير |
| --- | --- | --- |
| `TP` (True Positive) | إيجابي صحيح | تنبأ بـ "نعم" وكان فعلاً "نعم" |
| `TN` (True Negative) | سلبي صحيح | تنبأ بـ "لا" وكان فعلاً "لا" |
| `FP` (False Positive) | إيجابي خاطئ (خطأ من النوع الأول) | تنبأ بـ "نعم" لكن الحقيقة "لا" |
| `FN` (False Negative) | سلبي خاطئ (خطأ من النوع الثاني) | تنبأ بـ "لا" لكن الحقيقة "نعم" |

**لماذا؟** لأن رقمًا واحدًا مثل `Accuracy` لا يكفي لفهم *أين* يخطئ المصنّف بالضبط، بينما `Confusion Matrix` تُظهر توزيع الأخطاء بدقة (هل هي إيجابية كاذبة أم سلبية كاذبة).

#### 💡 التشبيه:
> تخيّل حارس أمن يفحص الداخلين: إذا اعتقل شخصًا بريئًا هذا `FP`، وإذا ترك مجرمًا يمر هذا `FN`.
> **وجه الشبه:** المجرم المضبوط فعلاً = `TP` | البريء المُطلق فعلاً = `TN` | البريء المعتقل خطأً = `FP` | المجرم الذي مرّ = `FN`.

#### 📊 المخطط: بنية Confusion Matrix للتصنيف الثنائي

#### ما هذا المخطط؟
> يوضّح كيف تُبنى مصفوفة 2×2 من تقاطع الفئة الحقيقية مع الفئة المتوقعة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Actual C1 | class | الصف الحقيقي = الفئة الإيجابية |
| 2 | Actual ¬C1 | class | الصف الحقيقي = الفئة السلبية |
| 3 | Predicted C1 | class | العمود المتوقع = الفئة الإيجابية |
| 4 | Predicted ¬C1 | class | العمود المتوقع = الفئة السلبية |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Actual C1 | Predicted C1 | TP | تقاطع | تصنيف صحيح للإيجابي |
| Actual C1 | Predicted ¬C1 | FN | تقاطع | خطأ: فاتنا إيجابي حقيقي |
| Actual ¬C1 | Predicted C1 | FP | تقاطع | خطأ: صنّفناه إيجابي خطأ |
| Actual ¬C1 | Predicted ¬C1 | TN | تقاطع | تصنيف صحيح للسلبي |

```diagram
type: table
title: Confusion Matrix Structure
direction: TD
nodes:
  - id: actual_c1
    label: Actual C1 (P)
    kind: class
    level: 0
  - id: actual_notc1
    label: Actual ¬C1 (N)
    kind: class
    level: 0
  - id: pred_c1
    label: Predicted C1
    kind: class
    level: 1
  - id: pred_notc1
    label: Predicted ¬C1
    kind: class
    level: 1
edges:
  - from: actual_c1
    to: pred_c1
  - from: actual_c1
    to: pred_notc1
  - from: actual_notc1
    to: pred_c1
  - from: actual_notc1
    to: pred_notc1
```

#### مهم للامتحان ⚠️:
> القيم المثالية يجب أن تتركز على القطر الرئيسي (`TP`, `TN`)؛ أي قيم خارج القطر (`FP`, `FN`) تعني أن المصنّف "يخلط" بين الفئتين، وكلما زادت هذه القيم كان الأداء أسوأ.

---

### 3. مصفوفة الالتباس متعددة الفئات (Multi-class Confusion Matrix)

#### النص الأصلي يقول:
> "Given m classes (where m ≥ 2), a confusion matrix is a table of at least size m × m. An entry CM(i,j) indicates the number of tuples of class i that were labeled by the classifier as class j."

#### الشرح المبسّط:
عندما يكون لدينا أكثر من فئتين (مثلًا: تصنيف فواكه إلى تفاح، موز، برتقال)، تتوسع المصفوفة لتصبح بحجم m×m، حيث كل خلية `CM[i,j]` تعني: "عدد العناصر التي فئتها الحقيقية i لكن صُنِّفت كـ j".

**لماذا؟** لأن مفهومي `Positive`/`Negative` يصبحان غير كافيين عند وجود أكثر من فئتين، فنحتاج جدولًا أعم يعمم فكرة القطر الصحيح مقابل الأخطاء خارج القطر.

#### مثال عملي (من المحاضرة):
| Classes | buys_computer = yes | buys_computer = no | Total |
| --- | --- | --- | --- |
| buys_computer = yes | 6954 | 46 | 7000 |
| buys_computer = no | 412 | 2588 | 3000 |
| Total | 7366 | 2634 | 10000 |

هنا صنّف النموذج 412 حالة "لا" على أنها "نعم" خطأً (`FP`)، و46 حالة "نعم" على أنها "لا" خطأً (`FN`).

---

### 4. الدقة الكلية ونسبة الخطأ (Accuracy & Error Rate)

#### النص الأصلي يقول:
> "The accuracy or recognition rate of a classifier, M, is the percentage of test tuples that are correctly classified... The error rate or misclassification rate of a classifier, M, is simply 1-accuracy(M)."

#### الشرح المبسّط:
`Accuracy` تجيب على السؤال: "من أصل كل الحالات، كم نسبة ما صنّفناه بشكل صحيح؟" أما `Error Rate` فهو المكمّل لها (كل ما هو خطأ).

#### 📐 المعادلة: Accuracy

$$
accuracy(M) = \frac{TP + TN}{P + N}
$$

**الشرح:**
> `TP + TN` = كل الحالات الصحيحة (إيجابية وسلبية) | `P + N` = العدد الكلي للحالات في مجموعة الاختبار.

#### 📐 المعادلة: Error Rate

$$
error\_rate(M) = \frac{FP + FN}{P + N} = 1 - accuracy(M)
$$

**الشرح:**
> `FP + FN` = كل الحالات الخاطئة. ملاحظة مهمة: إذا حسبنا هذا الخطأ على **بيانات التدريب نفسها** يُسمى `Resubstitution Error` وهو **تقدير متفائل جدًا** (`optimistic`) لأنه لا يقيس التعميم الحقيقي.

#### مثال عملي (حساب مباشر):
باستخدام جدول `buys_computer`: `Accuracy(M) = (6954+2588)/10000 = 95.42%`, و`Error_rate(M) = (412+46)/10000 = 4.58%`.

#### ⚠️ نقطة مهمة:
> `Resubstitution Error` (الخطأ المحسوب على بيانات التدريب) دائمًا يبدو أفضل من الحقيقة لأن النموذج "رأى" هذه البيانات أثناء التعلّم — لذلك لا يُعتمد عليه للحكم النهائي على جودة المصنّف.

---

### 5. قيود الدقة (Limitations of Accuracy)

#### النص الأصلي يقول:
> "Accuracy is most effective when the class distribution is relatively balanced... class imbalance problem: dataset distribution reflects a significant majority of the negative class and a minority positive class... suppose a learned medical classifier... An accuracy rate of 97% may not be acceptable—the classifier could be correctly labeling only the non-cancer tuples and misclassifying all the cancer tuples."

#### الشرح المبسّط:
المشكلة الأساسية في `Accuracy` أنها تُخفي التفاصيل عند وجود **اختلال في توازن الفئات** `Class Imbalance`، أي عندما تكون إحدى الفئات نادرة جدًا مقارنة بالأخرى.

**لماذا؟** لأنه إذا كان 97% من المرضى "غير مصابين بالسرطان"، فمصنّف "كسول" يتنبأ دائمًا بـ "لا سرطان" لأي مريض سيحقق دقة 97% تلقائيًا، رغم أنه **فاشل تمامًا** في اكتشاف أي حالة سرطان حقيقية (كل الحالات الإيجابية تصبح `FN`).

#### 💡 التشبيه:
> تخيّل نظام إنذار حريق يقول دائمًا "لا يوجد حريق" في مبنى نادرًا ما يحترق؛ سيكون "دقيقًا" 99% من الوقت لكنه عديم الفائدة تمامًا في اللحظة التي نحتاجه فيها.
> **وجه الشبه:** المبنى النادر الاحتراق = الفئة النادرة (`Positive`, مثل السرطان) | الإنذار الصامت دائمًا = مصنّف يتجاهل الفئة النادرة.

#### الفهم الخاطئ ❌:
> "دقة 97% تعني أن المصنّف ممتاز دائمًا."

#### الفهم الصحيح ✅:
> دقة 97% في بيانات غير متوازنة قد تخفي فشلاً كاملاً في اكتشاف الفئة النادرة والمهمة (مثل السرطان)؛ يجب فحص `Precision`, `Recall`, `Sensitivity` أيضًا.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا كان مصنّف يتنبأ دائمًا بـ "لا" في بيانات 3% فقط منها "نعم"، فما دقته؟ وهل هذا يعني أنه جيد؟
> **لماذا هذا مهم؟** لأنه يوضح أن `Accuracy` وحده مقياس مضلِّل في المسائل غير المتوازنة، وهي حالة شائعة جدًا في التطبيقات الحقيقية (احتيال، أمراض نادرة، أعطال نادرة).

---

### 6. الحساسية والنوعية (Sensitivity & Specificity)

#### النص الأصلي يقول:
> "Sensitivity, the proportion of positive tuples that are correctly identified... Specificity, the proportion of negative tuples that are correctly identified."

#### الشرح المبسّط:
- **`Sensitivity`** (تُسمى أيضًا `True Positive Rate` أو `Recall`): من بين كل الحالات الإيجابية الحقيقية، كم نسبة التي اكتشفناها بنجاح؟
- **`Specificity`** (تُسمى أيضًا `True Negative Rate`): من بين كل الحالات السلبية الحقيقية، كم نسبة التي اكتشفناها بنجاح؟

#### 📐 المعادلة: Sensitivity

$$
sensitivity(M) = \frac{TP}{P}
$$

**الشرح:**
> `TP` = الإيجابيات المكتشفة صح | `P` = كل الإيجابيات الحقيقية الموجودة فعلاً.

#### 📐 المعادلة: Specificity

$$
specificity(M) = \frac{TN}{N}
$$

**الشرح:**
> `TN` = السلبيات المكتشفة صح | `N` = كل السلبيات الحقيقية الموجودة فعلاً.

#### مثال عملي:
`Sensitivity(M) = 6954/7000 = 99.34%` و `Specificity(M) = 2588/3000 = 86.27%`.

**لماذا؟** لأن `Specificity` هنا الأقل قيمة تكشف أن المصنّف أضعف في التعرف على فئة "لا" مقارنة بفئة "نعم"، معلومة لا تظهرها `Accuracy` وحدها (95.42%).

---

### 7. الدقة والاستدعاء (Precision & Recall)

#### النص الأصلي يقول:
> "Precision: % of tuples labeled as positive which are actually positive... Recall: same as sensitivity... A perfect precision of 1.0 for a class C means that every tuple that the classifier labeled as C does indeed belong to C... A perfect recall of 1.0 for C means that every tuple from class C was labeled as such."

#### الشرح المبسّط:
- **`Precision`** (الدقة): من بين كل ما توقّعناه "إيجابي"، كم نسبة الصحيح فعلاً؟ → مقياس **الضبط/الصرامة** `exactness`.
- **`Recall`** (الاستدعاء): من بين كل الإيجابيات الحقيقية، كم نسبة التي أمسكناها فعلاً؟ → مقياس **الشمولية** `completeness`، وهو مطابق تمامًا لـ `Sensitivity`.

**لماذا؟** لأنهما يقيسان جانبين مختلفين من الخطأ:
- `Precision` أعلى → أخطاء `FP` أقل (لا نتّهم أبرياء).
- `Recall` أعلى → أخطاء `FN` أقل (لا نفوّت مذنبين/حالات مهمة).

#### 📐 المعادلة: Precision

$$
precision(M) = \frac{TP}{TP+FP} = \frac{TP}{P'}
$$

**الشرح:**
> `P'` = كل ما تنبأ به النموذج كـ "إيجابي" (صحيح كان أم خاطئ).

#### 📐 المعادلة: Recall

$$
recall(M) = \frac{TP}{TP+FN} = \frac{TP}{P}
$$

**الشرح:**
> نفس صيغة `Sensitivity` تمامًا؛ `P` = كل الإيجابيات الحقيقية.

#### مثال عملي:
`Precision(M) = 6954/7366 = 94.41%` و `Recall(M) = 6954/7000 = 99.34%`.

#### ⚖️ المقايضة: Precision vs Recall

| | Precision عالٍ | Recall عالٍ |
| --- | --- | --- |
| المزايا | قلة الإنذارات الكاذبة (`FP` قليل) | قلة الحالات المفقودة (`FN` قليل) |
| العيوب | قد يفوّت حالات إيجابية حقيقية | قد يزيد التنبيهات الكاذبة |
| متى تختاره | عندما يكون `FP` مكلفًا جدًا (مثال: اتهام بريء) | عندما يكون `FN` مكلفًا جدًا (مثال: تفويت مريض سرطان) |

#### الفهم الخاطئ ❌:
> `Precision` و`Recall` هما نفس الشيء.

#### الفهم الصحيح ✅:
> `Recall` = `Sensitivity` فعلاً (نفس الصيغة)، لكن `Precision` مختلف تمامًا: مقامه `TP+FP` (كل ما تنبأنا به إيجابيًا) وليس `TP+FN` (كل الإيجابيات الحقيقية).

---

### 8. مقياس F (F-measure)

#### النص الأصلي يقول:
> "There tends to be an inverse relationship between precision and recall... An alternative way is to combine precision and recall into a single measure called F-measure (F1 score)... The F measure gives equal weight to precision and recall. Fβ measure is a weighted measure... It assigns β times as much weight to recall as to precision."

#### الشرح المبسّط:
بما أن رفع `Precision` غالبًا يخفض `Recall` والعكس صحيح (علاقة عكسية)، نحتاج مقياسًا واحدًا يوازن بينهما. هذا هو دور `F-measure` (أو `F1-score`)، وهو **المتوسط التوافقي** `Harmonic Mean` لـ `Precision` و`Recall`.

**لماذا المتوسط التوافقي وليس الحسابي؟** لأنه يعاقب بشدة إذا كانت إحدى القيمتين منخفضة جدًا حتى لو كانت الأخرى مرتفعة جدًا؛ فهو "عادل" أكثر من المتوسط العادي في حالات كهذه.

#### 📐 المعادلة: F1-score

$$
F = 2 \times \frac{precision \times recall}{precision + recall}
$$

**الشرح:**
> يعطي وزنًا متساويًا لكل من `Precision` و`Recall`. مثال: `F(M) = 2×94.41%×99.34%/(94.41%+99.34%) = 96.81%`.

#### 📐 المعادلة: Fβ-score (الصيغة العامة)

$$
F_\beta = \frac{(1+\beta^2)\times precision \times recall}{\beta^2 \times precision + recall}
$$

**الشرح:**
> `β` يحدد أهمية `Recall` نسبةً لـ `Precision`. القيم الشائعة: `β=1` → `F1` (توازن تام) | `β=0.5` → وزن أكبر لـ `Precision`. (كلما زاد β زاد وزن `Recall`).

#### 💡 التشبيه:
> تخيّل سرعة سيارة متوسطة بين ذهاب وعودة بسرعات مختلفة؛ المتوسط التوافقي يشبه حساب "متوسط السرعة الحقيقي" الذي يتأثر أكثر بالسرعة الأبطأ.
> **وجه الشبه:** السرعة البطيئة = القيمة المنخفضة (Precision أو Recall) التي "تسحب" النتيجة النهائية للأسفل.

---

### 9. أي مقياس تستخدم؟ (Which Metric Should You Use)

#### النص الأصلي يقول:
> "Accuracy is a good measure to start with if all classes are balanced... Precision and recall become more important when classes are imbalanced. If false positive predictions are worse than false negatives, aim for higher precision. If false negative predictions are worse than false positives, aim for higher recall. F1-score is a combination of precision and recall."

#### الشرح المبسّط:
هذه خلاصة عملية لاختيار المقياس المناسب حسب طبيعة المشكلة:

| الحالة | المقياس المناسب |
| --- | --- |
| الفئات متوازنة | `Accuracy` |
| الفئات غير متوازنة | `Precision` و`Recall` |
| `FP` أخطر من `FN` (مثال: تصنيف بريد مهم كسبام) | ركّز على `Precision` عالٍ |
| `FN` أخطر من `FP` (مثال: تفويت تشخيص مرض خطير) | ركّز على `Recall` عالٍ |
| تريد توازنًا شاملاً بين الاثنين | `F1-score` |

#### مهم للامتحان ⚠️:
> لا يوجد مقياس "أفضل" مطلقًا؛ الاختيار يعتمد دائمًا على **سياق المشكلة** وتكلفة كل نوع من الأخطاء (`FP` مقابل `FN`).

---

### 10. طرق أخذ العينات (Sampling Methods) — مقدمة

#### النص الأصلي يقول:
> "How to create the training and test sets out of a dataset? We don't want to make unreasonable assumptions about our population. Many approaches: Holdout, Random sampling, Cross-validation, Bootstrap."

#### الشرح المبسّط:
السؤال المحوري هنا: كيف نقسم مجموعة بيانات واحدة إلى تدريب واختبار بطريقة **عادلة وغير متحيزة**، بحيث لا نفترض افتراضات خاطئة عن توزيع البيانات؟ توجد عدة استراتيجيات رئيسية سنشرحها بالتفصيل.

**لماذا نحتاج طرقًا متعددة؟** لأن كل طريقة لها مقايضة بين **دقة التقدير** و**الكلفة الحسابية** (زمن التدريب)، خصوصًا مع اختلاف حجم البيانات المتاحة.

---

### 11. طريقة الحجب (Holdout Method) وأخذ العينات العشوائي (Random Sampling)

#### النص الأصلي يقول:
> "Given dataset is randomly partitioned into two independent sets: Training set (e.g., 2/3)... Test set (e.g., 1/3)... The estimate is pessimistic because only a portion of the initial data is used to derive the model... It takes no longer to compute. Random sampling: a variation of holdout, where the holdout method is repeated k times. The overall accuracy estimate is taken as the average of the accuracies obtained from each iteration."

#### الشرح المبسّط:
`Holdout` هي أبسط طريقة: نقسم البيانات مرة واحدة فقط عشوائيًا (مثلًا 2/3 تدريب و1/3 اختبار)، وندرّب ونختبر مرة واحدة.

| الجانب | التفصيل |
| --- | --- |
| السلبيات (-) | التقدير **متشائم** `pessimistic` لأن جزءًا فقط من البيانات استُخدم للتدريب (النموذج لم يستفد من كل البيانات المتاحة) |
| الإيجابيات (+) | سريع جدًا؛ لا يحتاج وقتًا إضافيًا للحساب |

أما **`Random Sampling`** فهي تكرار لطريقة `Holdout` عدة مرات `k`، وفي كل مرة نأخذ تقسيمًا عشوائيًا مختلفًا، ثم نأخذ **متوسط الدقة** عبر كل التكرارات كنتيجة نهائية، مما يقلل من تأثير الحظ في تقسيم واحد فقط.

**لماذا Holdout متشائم؟** لأنه إذا حجزنا 1/3 من البيانات للاختبار، فالنموذج تدرّب فقط على 2/3، وبالتالي قد يكون أضعف مما لو تدرّب على كامل البيانات، فيظهر أداؤه أسوأ قليلاً من الواقع.

#### ⚖️ المقايضة: Holdout مقابل Random Sampling

| | Holdout (تقسيم واحد) | Random Sampling (تكرار k مرات) |
| --- | --- | --- |
| المزايا | سريع جدًا وبسيط | تقدير أكثر استقرارًا وموثوقية |
| العيوب | نتيجة قد تعتمد على "حظ" التقسيم | يحتاج وقتًا حسابيًا أكبر (k تكرار) |
| متى تختاره | بيانات كبيرة جدًا ووقت محدود | عندما نريد تقديرًا أدق دون الذهاب لـ Cross-Validation الكامل |

#### 💡 التشبيه:
> `Holdout` أشبه بامتحان تجريبي واحد فقط قبل الامتحان النهائي، بينما `Random Sampling` أشبه بحل عدة امتحانات تجريبية مختلفة وأخذ متوسط الدرجات لتقدير مستواك الحقيقي بدقة أكبر.
> **وجه الشبه:** كل امتحان تجريبي = تكرار واحد من `Holdout` | متوسط الدرجات = الدقة الكلية النهائية.

---

### 12. التحقق المتقاطع (Cross-Validation Method)

#### النص الأصلي يقول:
> "Partition the given dataset randomly into k mutually exclusive subsets or 'folds'... Training and testing is performed k times, where at i-th iteration, use partition Di as test set and others as training set... The overall accuracy estimate is the overall number of correct classifications from the k iterations, divided by the total number of tuples in the initial data."

#### الشرح المبسّط:
`k-fold Cross-Validation` تحل مشكلة `Holdout` (الاعتماد على تقسيم واحد فقط) بطريقة منهجية:
1. نقسم البيانات إلى `k` أجزاء متساوية تقريبًا (`folds`): `D1, D2, ..., Dk`.
2. في كل تكرار `i`، نستخدم الجزء `Di` كمجموعة اختبار، وبقية الأجزاء الـ`k-1` كمجموعة تدريب.
3. نكرر هذا `k` مرة (كل جزء يصبح اختبارًا مرة واحدة بالتحديد).
4. الدقة النهائية = مجموع كل التصنيفات الصحيحة عبر الـ`k` تكرارات ÷ العدد الكلي للتُوبلات.

**لماذا هذا أفضل من Holdout؟** لأن **كل** نقطة بيانات تُستخدم للاختبار مرة واحدة وللتدريب `k-1` مرة، فنحصل على تقدير أكثر عدلاً واستقرارًا يعتمد على كامل البيانات وليس على تقسيم عشوائي واحد فقط.

```algorithm
1 | تقسيم البيانات | Random Partitioning | تقسيم البيانات عشوائيًا إلى k أجزاء متساوية تقريبًا
2 | حلقة التكرار | Loop i = 1 to k | لكل تكرار i، اختر الجزء Di ليكون مجموعة الاختبار
3 | تحديد التدريب | Remaining Folds | استخدم بقية الأجزاء (k-1) كمجموعة تدريب
4 | التدريب والاختبار | Classifier Training | درّب النموذج على مجموعة التدريب واختبره على Di
5 | تجميع النتائج | Aggregation | اجمع عدد التصنيفات الصحيحة من كل التكرارات
6 | الحساب النهائي | Final Accuracy | اقسم المجموع الكلي على عدد كل التُوبلات في البيانات الأصلية
```

#### نقاط التنفيذ:
- يجب أن تكون الأجزاء `folds` متبادلة الحصرية (`mutually exclusive`) أي لا تتقاطع فيما بينها.
- القيمة الشائعة لـ `k` هي 10 (`10-fold cross-validation`).

#### 12.1 حالة خاصة: Leave-One-Out

#### النص الأصلي يقول:
> "Leave-one-out: variations of k-fold cross-validation, for small sized dataset, where k is set to the number of initial tuples => only one sample is 'left out' at every iteration for the test set."

#### الشرح المبسّط:
هذه حالة خاصة من `Cross-Validation` حيث `k = d` (عدد التُوبلات الكلي في البيانات). في كل تكرار، نترك **عنصرًا واحدًا فقط** للاختبار وندرّب على كل الباقي.

**لماذا نستخدمها؟** مناسبة فقط للبيانات **الصغيرة جدًا**، حيث لا نملك ترف "التضحية" بأجزاء كبيرة من البيانات للاختبار؛ فهي تستغل كل نقطة بيانات في التدريب قدر الإمكان.

#### مثال عملي (5-fold Cross-validation على 100 سجل مريض):
البيانات (100 سجل) تُقسّم إلى 5 أجزاء من 20 سجلاً لكل منها. في كل تكرار من الخمسة، جزء واحد (20 سجلاً) يصبح اختبارًا والباقي (80 سجلاً) تدريبًا؛ يُكرَّر هذا 5 مرات مختلفة، بحيث تشارك كل الـ100 سجل في الاختبار **مرة واحدة بالضبط**.

هذا يختلف عن `Normal Train & Test Split` (تقسيم عادي 80/20 مرة واحدة فقط) الذي يشبه `Holdout`.

#### ⚖️ المقايضة: Cross-Validation مقابل Holdout

| | Holdout | k-fold Cross-Validation |
| --- | --- | --- |
| المزايا | سريع جدًا، حساب بسيط | تقدير أكثر موثوقية، يستغل كل البيانات |
| العيوب | تقدير متشائم وقد يعتمد على "حظ" التقسيم | يحتاج تدريب النموذج k مرة (كلفة حسابية أعلى) |
| متى تختاره | بيانات ضخمة جدًا / وقت محدود | بيانات متوسطة/صغيرة وتحتاج تقييمًا دقيقًا وموثوقًا |

---

### 13. طريقة Bootstrap (وتحديدًا .632 Bootstrap)

#### النص الأصلي يقول:
> "Each time a tuple is selected, it is equally likely to be selected again and re-added to the training set (samples the training tuples uniformly with replacement). Works well with small datasets... A dataset with d tuples is sampled d times, with replacement... data tuples that have not been selected for the training set end up in the test set... probability that a tuple will never be chosen is (1-1/d)^d => If d is large, the probability approaches e^-1=0.368. Thus, 36.8% of tuples will not be selected for training and thereby end up in the test set, and the remaining 63.2% will form the training set."

#### الشرح المبسّط:
`Bootstrap` هي طريقة مختلفة جذريًا عن سابقاتها: بدلاً من تقسيم البيانات بدون تكرار (`without replacement`)، هنا نأخذ عيّنات **مع إعادة الوضع** `with replacement`، أي يمكن اختيار نفس التُوبل أكثر من مرة في مجموعة التدريب نفسها.

**آلية `.632 Bootstrap`:**
1. من بيانات حجمها `d`، نسحب `d` عينة **مع إعادة** لتكوين مجموعة التدريب (تسمى `bootstrap sample`، وقد تحتوي على تكرارات).
2. أي تُوبل **لم يُختر إطلاقًا** خلال هذه السحوبات الـ`d`، ينتهي به المطاف في مجموعة **الاختبار**.
3. رياضيًا: احتمال عدم اختيار تُوبل معيّن في سحبة واحدة = `(1-1/d)`، وباحتساب `d` سحبات مستقلة، احتمال عدم اختياره إطلاقًا = `(1-1/d)^d`.
4. عندما تكبر `d`، تقترب هذه القيمة من الثابت الرياضي `e^-1 ≈ 0.368`.
5. لذلك تقريبًا: **36.8%** من البيانات الأصلية تنتهي في الاختبار، و **63.2%** تشكل التدريب (ومن هنا جاء اسم `.632 Bootstrap`).

**لماذا نستخدمها؟** تعمل بشكل جيد جدًا مع **البيانات الصغيرة**، لأنها تسمح بتوليد عدة عينات تدريب مختلفة (بتكرار العناصر) من نفس البيانات المحدودة، مما يعطي تقديرًا أكثر ثباتًا لأداء النموذج.

#### 💡 التشبيه:
> تخيّل كيسًا فيه 10 كرات مرقّمة، تسحب كرة وتنظر رقمها ثم **تعيدها للكيس** قبل السحب التالي (بدلاً من وضعها جانبًا)؛ بعض الأرقام قد تتكرر عدة مرات، وبعضها قد لا يظهر أبدًا رغم 10 محاولات سحب.
> **وجه الشبه:** الكرات التي لم تظهر أبدًا بعد 10 سحبات = التُوبلات التي تنتهي في مجموعة الاختبار (36.8% تقريبًا).

#### 📐 المعادلة: احتمال عدم اختيار تُوبل معيّن أبدًا

$$
P(\text{never chosen}) = \left(1-\frac{1}{d}\right)^d \approx e^{-1} \approx 0.368 \quad (d \to \infty)
$$

**الشرح:**
> `d` = حجم مجموعة البيانات الأصلية. النتيجة العملية: ~36.8% اختبار، ~63.2% تدريب.

#### الدقة الكلية بعد تكرار Bootstrap عدة مرات

بعد تكرار عملية أخذ العينات `k` مرة، نحصل على `k` مجموعة بيانات bootstrap مختلفة، ونحسب الدقة الكلية للنموذج بالمعادلة التالية:

#### 📐 المعادلة: Bootstrap Accuracy

$$
accuracy(M) = \frac{1}{k}\sum_{i=1}^{k}\Big(0.632 \times accuracy(M_i)_{test\_set} + 0.368 \times accuracy(M_i)_{train\_set}\Big)
$$

**الشرح:**
> `Mᵢ` = النموذج الناتج عن عينة bootstrap رقم i | `accuracy(Mᵢ)_test_set` = دقة النموذج عند تطبيقه على مجموعة الاختبار (التُوبلات التي لم تُختر) | `accuracy(Mᵢ)_train_set` = دقة النموذج عند تطبيقه على كامل البيانات الأصلية (بما فيها بيانات التدريب). الوزنان `0.632` و`0.368` يعكسان النسب التقريبية لحجم مجموعتي الاختبار والتدريب الناتجتين عن `Bootstrap`.

#### ⚖️ المقايضة: Bootstrap مقابل Cross-Validation

| | Bootstrap | k-fold Cross-Validation |
| --- | --- | --- |
| المزايا | ممتاز مع البيانات الصغيرة جدًا؛ يولّد تنويعًا أكبر في عينات التدريب | لا تكرار داخل كل fold؛ تغطية كاملة ومتساوية للبيانات |
| العيوب | العينة قد تحتوي تكرارات كثيرة لنفس التُوبل (تحيّز محتمل) | يحتاج بيانات كافية لتقسيمها لأجزاء ذات معنى |
| متى تختاره | مجموعة بيانات صغيرة الحجم جدًا | مجموعة بيانات متوسطة إلى كبيرة |

#### مهم للامتحان ⚠️:
> الفرق الجوهري: `Cross-Validation` تسحب **بدون إعادة** (`without replacement`) وتضمن أن كل نقطة تُستخدم للاختبار مرة واحدة بالضبط، بينما `Bootstrap` تسحب **مع إعادة** (`with replacement`) وقد يتكرر بعض التُوبلات في التدريب بينما تُستبعد أخرى تمامًا لتذهب للاختبار.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Training Set` | البيانات التي يتعلّم منها النموذج | 2/3 من البيانات في `Holdout` |
| `Test Set` | بيانات جديدة لتقييم النموذج بصدق | 1/3 من البيانات في `Holdout` |
| `TP` | إيجابي صحيح | تنبأ نعم، الحقيقة نعم |
| `TN` | سلبي صحيح | تنبأ لا، الحقيقة لا |
| `FP` | إيجابي خاطئ | تنبأ نعم، الحقيقة لا |
| `FN` | سلبي خاطئ | تنبأ لا، الحقيقة نعم |
| `Resubstitution Error` | خطأ محسوب على بيانات التدريب نفسها | تقدير متفائل (غير موثوق) |
| `Class Imbalance` | فئة نادرة جدًا مقابل فئة مهيمنة | كشف الاحتيال، الأمراض النادرة |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Confusion Matrix` | تفصيل كل أنواع الأخطاء والنجاحات | أساس كل المقاييس الأخرى |
| `Accuracy` | نسبة التصنيف الصحيح الكلي | يفشل مع Class Imbalance |
| `Sensitivity/Recall` | نسبة اكتشاف الإيجابيات الحقيقية | نفس الصيغة تمامًا |
| `Specificity` | نسبة اكتشاف السلبيات الحقيقية | مكمّلة لـ Sensitivity |
| `Precision` | نسبة صحة ما تنبأنا به كإيجابي | يهتم بتقليل FP |
| `F1-score` | متوسط توافقي بين Precision وRecall | مقياس متوازن شامل |
| `Holdout` | تقسيم عشوائي واحد | سريع لكن متشائم |
| `Cross-Validation` | تقسيم إلى k أجزاء وتدوير الاختبار | موثوق أكثر، أبطأ |
| `Bootstrap` | سحب مع إعادة لتوليد عينات تدريب | مثالي للبيانات الصغيرة |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| `Precision` مقابل `Recall` | يهتم بتقليل `FP` (مقامه TP+FP) | يهتم بتقليل `FN` (مقامه TP+FN) | مقياس مختلف تمامًا رغم الشبه الظاهري |
| `Sensitivity` مقابل `Specificity` | نسبة اكتشاف الإيجابيات (`TP/P`) | نسبة اكتشاف السلبيات (`TN/N`) | يقيسان فئتين مختلفتين تمامًا |
| `Holdout` مقابل `Cross-Validation` | تقسيم واحد فقط | تقسيم متعدد وتدوير | Cross-Validation أدق لكن أبطأ حسابيًا |
| `Cross-Validation` مقابل `Bootstrap` | بدون إعادة (`without replacement`) | مع إعادة (`with replacement`) | Bootstrap قد يكرر نفس التُوبل عدة مرات |
| `Accuracy` مقابل `F1-score` | يعامل كل الأخطاء بنفس الوزن | يوازن بين `Precision` و`Recall` تحديدًا | F1 أفضل عند اختلال توازن الفئات |

### مصطلحات (Glossary)

| المصطلح الإنجليزي | الترجمة/الشرح المختصر |
| --- | --- |
| `Confusion Matrix` | مصفوفة الالتباس/التشويش |
| `True Positive (TP)` | إيجابي صحيح |
| `False Positive (FP)` | إيجابي كاذب (خطأ نوع أول) |
| `False Negative (FN)` | سلبي كاذب (خطأ نوع ثانٍ) |
| `Sensitivity` | الحساسية = Recall |
| `Specificity` | النوعية |
| `Harmonic Mean` | المتوسط التوافقي |
| `Resubstitution Error` | خطأ إعادة الاستبدال (على بيانات التدريب) |
| `Fold` | جزء من أجزاء تقسيم البيانات في Cross-Validation |
| `With/Without Replacement` | مع/بدون إعادة الوضع (في أخذ العينات) |

### نقاط ذهبية

| # | النقطة |
| --- | --- |
| 1 | لا تُقيّم مصنّفًا أبدًا على بيانات التدريب نفسها — استخدم دائمًا Test Set منفصل |
| 2 | `Accuracy` وحدها مضللة عند اختلال توازن الفئات؛ استخدم `Precision/Recall/F1` |
| 3 | `Recall` = `Sensitivity` بالضبط (نفس الصيغة الرياضية) |
| 4 | `.632 Bootstrap` مبني على الثابت الرياضي `e⁻¹ ≈ 0.368` |
| 5 | `Cross-Validation` تضمن أن كل نقطة بيانات تُستخدم للاختبار مرة واحدة بالضبط |

### أخطاء شائعة

| # | الخطأ | التصحيح |
| --- | --- | --- |
| 1 | الاعتقاد أن دقة عالية = نموذج ممتاز دائمًا | تحقق أولاً من توازن الفئات (Class Imbalance) |
| 2 | الخلط بين `Precision` و`Recall` | تذكّر: Precision مقامه ما تنبأنا به، Recall مقامه ما هو حقيقي |
| 3 | استخدام `Resubstitution Error` كتقييم نهائي | استخدم دائمًا بيانات اختبار منفصلة |
| 4 | الظن أن Bootstrap و Cross-Validation متطابقتان | Bootstrap تسحب مع إعادة، Cross-Validation بدون إعادة |

---

## خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء مصفوفة الالتباس وحساب المقاييس

```algorithm
1 | تجهيز مجموعة الاختبار | Test Set | فصل بيانات لم يرها النموذج أثناء التدريب
2 | توليد التنبؤات | Trained Classifier | تشغيل النموذج على مجموعة الاختبار للحصول على Predicted Class
3 | بناء المصفوفة | Confusion Matrix | مقارنة Predicted Class مع Actual Class لحساب TP, TN, FP, FN
4 | حساب المقاييس الأساسية | Formulas | حساب Accuracy, Error Rate, Sensitivity, Specificity
5 | حساب Precision & Recall | Formulas | حساب نسبة الصرامة والشمولية للفئة الإيجابية
6 | حساب F1-score | Harmonic Mean Formula | دمج Precision و Recall في رقم واحد متوازن
```

#### ⚙️ الخطوات / الخوارزمية: k-fold Cross-Validation الكامل

```algorithm
1 | تحديد k | Parameter Choice | اختيار عدد الأجزاء (شائع: k=10)
2 | التقسيم العشوائي | Random Split | تقسيم البيانات إلى k أجزاء متساوية تقريبًا
3 | حلقة على كل fold | Loop | لكل i من 1 إلى k: اجعل Di مجموعة اختبار والباقي تدريب
4 | تدريب واختبار | Model Training/Testing | درّب النموذج واحسب عدد التصنيفات الصحيحة
5 | التجميع النهائي | Aggregation | اجمع كل التصنيفات الصحيحة من كل التكرارات
6 | حساب الدقة الكلية | Final Division | اقسم المجموع على العدد الكلي للتُوبلات
```

#### ⚙️ الخطوات / الخوارزمية: .632 Bootstrap الكامل

```algorithm
1 | السحب مع إعادة | Sampling with Replacement | سحب d عينة من بيانات حجمها d مع السماح بالتكرار
2 | تحديد مجموعة التدريب | Bootstrap Sample | العينات المسحوبة (قد تحوي تكرارات) تشكّل مجموعة التدريب
3 | تحديد مجموعة الاختبار | Unselected Tuples | التُوبلات التي لم تُسحب إطلاقًا تذهب لمجموعة الاختبار (~36.8%)
4 | تدريب واختبار | Model Mi | درّب نموذج Mi واحسب دقته على test_set وعلى كامل البيانات (train_set)
5 | التكرار k مرة | Repeat k times | كرر الخطوات 1-4 للحصول على k نموذج مختلف
6 | الدقة الإجمالية | Weighted Average | احسب المتوسط المرجّح بأوزان 0.632 و0.368 عبر كل النماذج
```

### نقاط التنفيذ (لكل الخوارزميات أعلاه):
- في `Cross-Validation`: يجب أن تكون الأجزاء متبادلة الحصرية تمامًا (لا تداخل).
- في `Bootstrap`: كلما كبر `d`، تقترب النسبة أكثر من `63.2%/36.8%` بدقة رياضية.
- في كليهما: النتيجة النهائية دائمًا **متوسط** عبر عدة تكرارات، وليست نتيجة تجربة واحدة.

---

## أنماط الأكواد

#### 💻 الكود: حساب Confusion Matrix ومقاييس التقييم بلغة Python

#### ما هذا الكود؟
> يحسب مصفوفة الالتباس وكل مقاييس التقييم (Accuracy, Precision, Recall, F1) لمصنّف ثنائي باستخدام `sklearn`.

```python
from sklearn.metrics import confusion_matrix, accuracy_score  # (1) استيراد أدوات التقييم
from sklearn.metrics import precision_score, recall_score, f1_score  # (2) استيراد مقاييس إضافية

y_true = [1, 0, 1, 1, 0, 1, 0, 0]  # (3) القيم الحقيقية للفئات (1=positive, 0=negative)
y_pred = [1, 0, 0, 1, 0, 1, 1, 0]  # (4) القيم المتوقعة من المصنّف

cm = confusion_matrix(y_true, y_pred)  # (5) بناء مصفوفة الالتباس
acc = accuracy_score(y_true, y_pred)  # (6) حساب الدقة الكلية
prec = precision_score(y_true, y_pred)  # (7) حساب Precision
rec = recall_score(y_true, y_pred)  # (8) حساب Recall
f1 = f1_score(y_true, y_pred)  # (9) حساب F1-score

print("Confusion Matrix:\n", cm)  # (10) طباعة المصفوفة
print(f"Accuracy={acc:.2f}, Precision={prec:.2f}, Recall={rec:.2f}, F1={f1:.2f}")  # (11) طباعة النتائج
```

#### شرح كل سطر:
1. `from sklearn.metrics import confusion_matrix, accuracy_score` → استيراد — نحتاج هاتين الدالتين لبناء المصفوفة وحساب الدقة.
2. `from sklearn.metrics import precision_score, recall_score, f1_score` → استيراد — لحساب باقي المقاييس المتقدمة.
3. `y_true = [...]` → بيانات — تمثل الفئة الحقيقية لكل عينة اختبار.
4. `y_pred = [...]` → بيانات — تمثل ما تنبأ به النموذج فعليًا لنفس العينات.
5. `cm = confusion_matrix(...)` → حساب — يبني جدول TP/TN/FP/FN تلقائيًا.
6. `acc = accuracy_score(...)` → حساب — يطبّق معادلة `(TP+TN)/(P+N)` داخليًا.
7. `prec = precision_score(...)` → حساب — يطبّق معادلة `TP/(TP+FP)`.
8. `rec = recall_score(...)` → حساب — يطبّق معادلة `TP/(TP+FN)`.
9. `f1 = f1_score(...)` → حساب — يطبّق المتوسط التوافقي بين Precision وRecall.
10. `print("Confusion Matrix:\n", cm)` → إخراج — لعرض المصفوفة كاملة على الشاشة.
11. `print(f"Accuracy=...")` → إخراج — لعرض كل المقاييس منسّقة بمنزلتين عشريتين.

**المكتبات المطلوبة (Imports):**
> `pip install scikit-learn`

**الناتج المتوقع:**
> طباعة مصفوفة 2×2 (TN, FP, FN, TP) تليها أربعة أرقام: Accuracy, Precision, Recall, F1 بين 0 و1.

---

#### 💻 الكود: تطبيق k-fold Cross-Validation بلغة Python

#### ما هذا الكود؟
> يقسّم البيانات إلى 5 أجزاء ويحسب متوسط الدقة عبر كل التكرارات باستخدام `KFold` من `sklearn`.

```python
from sklearn.model_selection import KFold  # (1) استيراد أداة K-Fold
from sklearn.tree import DecisionTreeClassifier  # (2) استيراد مصنّف شجرة القرار
import numpy as np  # (3) استيراد numpy للتعامل مع المصفوفات

X = np.random.rand(100, 4)  # (4) توليد 100 عينة، كل عينة 4 خصائص (بيانات وهمية)
y = np.random.randint(0, 2, 100)  # (5) توليد فئات ثنائية عشوائية (0 أو 1)

kf = KFold(n_splits=5, shuffle=True, random_state=42)  # (6) إعداد تقسيم 5-fold مع خلط عشوائي
accuracies = []  # (7) قائمة فارغة لتخزين دقة كل تكرار

for train_idx, test_idx in kf.split(X):  # (8) حلقة على كل تقسيم من الخمسة
    clf = DecisionTreeClassifier()  # (9) إنشاء نموذج جديد في كل تكرار
    clf.fit(X[train_idx], y[train_idx])  # (10) تدريب النموذج على أجزاء التدريب
    acc = clf.score(X[test_idx], y[test_idx])  # (11) حساب الدقة على جزء الاختبار Di
    accuracies.append(acc)  # (12) تخزين الدقة في القائمة

print(f"Average Accuracy: {np.mean(accuracies):.2f}")  # (13) طباعة متوسط الدقة عبر كل الـ5 تكرارات
```

#### شرح كل سطر:
1. `from sklearn.model_selection import KFold` → استيراد — الأداة المسؤولة عن تقسيم البيانات لـ k أجزاء.
2. `from sklearn.tree import DecisionTreeClassifier` → استيراد — نموذج التصنيف المستخدم في المثال.
3. `import numpy as np` → استيراد — للتعامل مع المصفوفات العددية.
4. `X = np.random.rand(100, 4)` → بيانات — 100 صف × 4 أعمدة تمثل الخصائص.
5. `y = np.random.randint(0, 2, 100)` → بيانات — تسميات ثنائية عشوائية للتوضيح.
6. `kf = KFold(n_splits=5, ...)` → إعداد — يحدد عدد الأجزاء k=5 مع خلط عشوائي للبيانات قبل التقسيم.
7. `accuracies = []` → تهيئة — لتجميع نتائج كل تكرار.
8. `for train_idx, test_idx in kf.split(X):` → حلقة — تولّد فهارس تدريب واختبار مختلفة في كل مرة.
9. `clf = DecisionTreeClassifier()` → إنشاء — نموذج جديد تمامًا لكل تكرار (تجنب تسرب المعرفة).
10. `clf.fit(X[train_idx], y[train_idx])` → تدريب — تدريب النموذج فقط على أجزاء التدريب المحددة.
11. `acc = clf.score(X[test_idx], y[test_idx])` → تقييم — حساب دقة النموذج على الجزء المتبقي (Di).
12. `accuracies.append(acc)` → تخزين — حفظ دقة هذا التكرار في القائمة.
13. `print(f"Average Accuracy: ...")` → إخراج — طباعة متوسط الدقة عبر كل التكرارات كنتيجة نهائية.

**المكتبات المطلوبة (Imports):**
> `pip install scikit-learn numpy`

**الناتج المتوقع:**
> قيمة عشرية واحدة بين 0 و1 تمثل متوسط الدقة عبر 5 تكرارات (`Average Accuracy: 0.XX`).

#### 🛠️ استكشاف الأخطاء

| الخطأ | السبب | الحل |
| --- | --- | --- |
| `IndexError` عند استخدام `X[train_idx]` | `X` غير مصفوفة numpy بل قائمة عادية | حوّل البيانات إلى `numpy array` أولاً |
| نتائج الدقة متذبذبة جدًا بين التكرارات | حجم بيانات صغير جدًا أو k كبير جدًا | قلّل k أو استخدم `Bootstrap` بدلاً من ذلك |
| `ValueError: Found array with 0 sample(s)` | خطأ في تحديد `n_splits` أكبر من عدد العينات | تأكد أن `n_splits ≤` عدد العينات |

---

## الأفكار الشاملة

- تقييم المصنّف ليس رقمًا واحدًا بل **مجموعة أدوات** (`Confusion Matrix`, `Accuracy`, `Precision`, `Recall`, `F1`) يجب النظر إليها معًا حسب سياق المشكلة.
- طريقة تقسيم البيانات (`Holdout`, `Cross-Validation`, `Bootstrap`) تؤثر مباشرة على **مدى موثوقية** رقم التقييم الذي نحصل عليه.
- كلما كانت البيانات أصغر، كلما احتجنا طرقًا أكثر تعقيدًا (`Cross-Validation` أو `Bootstrap`) بدلاً من `Holdout` البسيطة لضمان تقدير موثوق.
- مشكلة `Class Imbalance` تظهر في كل من التقييم (الحاجة لـ Precision/Recall) وسنراها لاحقًا في طرق تحسين الأداء مثل `Ensemble Methods`.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1
ما هو التعريف الصحيح لـ `False Positive (FP)`؟
أ) تنبأ بإيجابي والحقيقة إيجابي
ب) تنبأ بإيجابي والحقيقة سلبي
ج) تنبأ بسلبي والحقيقة إيجابي
د) تنبأ بسلبي والحقيقة سلبي

**الإجابة الصحيحة: ب**
- أ) خطأ — هذا تعريف `TP` (تنبؤ صحيح بالإيجابي).
- ب) **صحيح** — بالضبط تعريف `FP`: تنبأنا "نعم" لكن الحقيقة "لا".
- ج) خطأ — هذا تعريف `FN` (فوّتنا حالة إيجابية حقيقية).
- د) خطأ — هذا تعريف `TN` (تنبؤ صحيح بالسلبي).

### السؤال 2
مصنّف طبي حقق دقة (`Accuracy`) 98% على بيانات نسبة المرضى المصابين فيها 2% فقط. ما التفسير الأكثر منطقية؟
أ) المصنّف ممتاز بلا شك
ب) الدقة قد تكون مضللة بسبب Class Imbalance ويجب فحص Recall
ج) يجب إعادة حساب الدقة على بيانات التدريب
د) هذا يعني أن Precision = 100% بالضرورة

**الإجابة الصحيحة: ب**
- أ) خطأ — دقة عالية في بيانات غير متوازنة لا تعني تلقائيًا أن النموذج جيد.
- ب) **صحيح** — بما أن الفئة الإيجابية نادرة (2%)، فقد يكون النموذج ببساطة يتنبأ دائمًا بـ "سلبي" ويحقق دقة عالية دون اكتشاف أي حالة إيجابية فعليًا؛ يجب فحص `Recall`.
- ج) خطأ — إعادة الحساب على بيانات التدريب يعطي `Resubstitution Error` وهو أسوأ للتقييم لا أفضل.
- د) خطأ — لا علاقة مباشرة حتمية بين Accuracy وPrecision بهذا الشكل.

### السؤال 3
أي المعادلات التالية تمثل `Precision` بشكل صحيح؟
أ) `TP/(TP+FN)`
ب) `TN/N`
ج) `TP/(TP+FP)`
د) `(TP+TN)/(P+N)`

**الإجابة الصحيحة: ج**
- أ) خطأ — هذه معادلة `Recall`.
- ب) خطأ — هذه معادلة `Specificity`.
- ج) **صحيح** — `Precision = TP/(TP+FP) = TP/P'`.
- د) خطأ — هذه معادلة `Accuracy`.

### السؤال 4
```python
from sklearn.metrics import precision_score, recall_score
y_true = [1, 1, 0, 1, 0]
y_pred = [1, 0, 0, 1, 1]
p = precision_score(y_true, y_pred)
r = recall_score(y_true, y_pred)
print(p, r)
```
احسب: `TP=2, FP=1, FN=1`. ما ناتج الطباعة؟

أ) `0.5 0.5`
ب) `0.67 0.67`
ج) `1.0 1.0`
د) `0.67 1.0`

**الإجابة الصحيحة: ب**
- أ) خطأ — الحساب: Precision = TP/(TP+FP) = 2/3 ≈ 0.67، ليس 0.5.
- ب) **صحيح** — `Precision = 2/(2+1) = 0.67` و `Recall = 2/(2+1) = 0.67` (لأن P الحقيقي = 3 حالات إيجابية).
- ج) خطأ — القيمة 1.0 تعني عدم وجود أي خطأ إطلاقًا، وهذا غير صحيح هنا.
- د) خطأ — Recall هنا ليس 1.0 لأن هناك حالة إيجابية واحدة فاتتنا (`FN=1`).

### السؤال 5
ما الفرق الجوهري بين `Cross-Validation` و`Bootstrap` في طريقة أخذ العينات؟
أ) لا يوجد فرق، هما نفس الطريقة
ب) Cross-Validation تسحب مع إعادة، Bootstrap بدون إعادة
ج) Cross-Validation تسحب بدون إعادة، Bootstrap مع إعادة
د) كلاهما يستخدمان فقط للبيانات الضخمة جدًا

**الإجابة الصحيحة: ج**
- أ) خطأ — يوجد فرق جوهري في آلية أخذ العينات.
- ب) خطأ — هذا معكوس تمامًا للحقيقة.
- ج) **صحيح** — Cross-Validation تقسّم البيانات بدون تكرار (كل نقطة تظهر مرة واحدة للاختبار)، بينما Bootstrap تسحب مع إعادة الوضع فتسمح بتكرار نفس التُوبل.
- د) خطأ — على العكس، Bootstrap تُستخدم أساسًا مع البيانات **الصغيرة**.

### السؤال 6
في بيانات حجمها `d=1000`، ما هي النسبة التقريبية للتُوبلات التي **لن تظهر أبدًا** في مجموعة تدريب bootstrap واحدة؟
أ) 50%
ب) 63.2%
ج) 36.8%
د) 100%

**الإجابة الصحيحة: ج**
- أ) خطأ — لا علاقة لهذا الرقم بالحسابات الفعلية.
- ب) خطأ — هذه نسبة التُوبلات التي **تظهر** في التدريب، وليس التي لا تظهر.
- ج) **صحيح** — النسبة التي لا تُختار إطلاقًا تقترب من `e⁻¹ ≈ 0.368 = 36.8%` عندما تكبر d.
- د) خطأ — هذا غير منطقي رياضيًا.

### السؤال 7
مقارنة بين `Holdout` و`k-fold Cross-Validation` من حيث موثوقية التقدير:

| المعيار | Holdout | Cross-Validation |
| --- | --- | --- |
| عدد التقسيمات | تقسيم واحد | k تقسيمات |
| ؟ | ؟ | ؟ |

ما العبارة الصحيحة التي تكمل السطر الثاني؟
أ) Holdout أكثر موثوقية لأنه أسرع
ب) Cross-Validation أكثر موثوقية لأنها تستخدم كل البيانات للاختبار في مرحلة ما
ج) كلاهما بنفس درجة الموثوقية دائمًا
د) Holdout يستخدم كل البيانات دائمًا للتدريب والاختبار معًا

**الإجابة الصحيحة: ب**
- أ) خطأ — السرعة لا تعني الموثوقية؛ Holdout أسرع لكن أقل موثوقية.
- ب) **صحيح** — بما أن كل نقطة بيانات تصبح جزءًا من الاختبار مرة واحدة عبر التكرارات الـk، يصبح التقدير أكثر تمثيلًا للبيانات كاملة.
- ج) خطأ — الأدبيات العلمية توضح تفوّق Cross-Validation في الموثوقية عمومًا.
- د) خطأ — Holdout يقسّم البيانات لجزء تدريب وجزء اختبار منفصلين تمامًا (لا تداخل).

### السؤال 8
ما اسم الخطأ الناتج عن قياس أداء المصنّف على بيانات التدريب نفسها؟
أ) `Cross-Validation Error`
ب) `Resubstitution Error`
ج) `Bootstrap Error`
د) `Generalization Error`

**الإجابة الصحيحة: ب**
- أ) خطأ — لا يوجد مصطلح بهذا الاسم في المحاضرة.
- ب) **صحيح** — هذا هو المصطلح الدقيق المذكور في المحاضرة، وهو تقدير متفائل.
- ج) خطأ — Bootstrap له معادلة دقة خاصة به تجمع بين تدريب واختبار.
- د) خطأ — `Generalization Error` هو المفهوم المعاكس (الأداء على بيانات جديدة غير مرئية).

### السؤال 9
أي سيناريو يستدعي التركيز على رفع `Recall` أكثر من `Precision`؟
أ) نظام سبام يمنع رسائل مهمة من الوصول لصندوق الوارد
ب) نظام كشف مبكر لمرض خطير حيث تفويت حالة (FN) كارثي
ج) نظام توصية أفلام
د) نظام تصنيف صور قطط وكلاب لأغراض ترفيهية

**الإجابة الصحيحة: ب**
- أ) خطأ — هنا `FP` (حظر رسالة مهمة) هو الأخطر، فنحتاج `Precision` أعلى.
- ب) **صحيح** — تفويت مريض حقيقي (`FN`) قد يكلف حياته؛ لذا `Recall` هو الأهم هنا.
- ج) خطأ — لا يوجد خطر حرج من أي نوع من الأخطاء هنا.
- د) خطأ — لا توجد عواقب خطيرة تستدعي الأولوية لأي مقياس.

### السؤال 10
```python
def f1(precision, recall):
    return (precision + recall) / 2  # حساب F1
```
ما الخطأ في هذا الكود؟

أ) لا يوجد خطأ، الكود صحيح
ب) يستخدم متوسطًا حسابيًا بدلاً من المتوسط التوافقي
ج) ترتيب المعاملات (precision, recall) خاطئ
د) يجب ضرب الناتج في 100

**الإجابة الصحيحة: ب**
- أ) خطأ — الكود يحتوي خطأً مفاهيميًا واضحًا.
- ب) **صحيح** — `F1` يجب أن يُحسب بالمتوسط التوافقي: `2*p*r/(p+r)`، وليس المتوسط الحسابي البسيط `(p+r)/2`.
- ج) خطأ — الترتيب لا يهم في هذه المعادلة لأن الجمع تبادلي.
- د) خطأ — F1 يُعبَّر عنه كنسبة بين 0 و1 وليس كنسبة مئوية بالضرورة.

### السؤال 11
في `k-fold Cross-Validation` بقيمة `k=10` على بيانات حجمها 500 سجل، كم سجلاً تقريبًا يُستخدم للاختبار في كل تكرار؟

أ) 500
ب) 50
ج) 10
د) 450

**الإجابة الصحيحة: ب**
- أ) خطأ — هذا هو حجم البيانات الكلي، وليس حجم جزء الاختبار فقط.
- ب) **صحيح** — `500/10 = 50` سجلاً لكل fold (جزء اختبار واحد في كل تكرار).
- ج) خطأ — هذا هو عدد التكرارات (k) وليس حجم جزء الاختبار.
- د) خطأ — هذا هو حجم مجموعة **التدريب** في كل تكرار (450 = 500-50)، وليس الاختبار.

### السؤال 12
ما العلاقة الصحيحة بين `Sensitivity` و`Recall`؟

أ) لا علاقة بينهما إطلاقًا
ب) هما نفس المقياس بالضبط بنفس المعادلة
ج) Sensitivity دائمًا أكبر من Recall
د) Recall يُحسب فقط للفئة السلبية

**الإجابة الصحيحة: ب**
- أ) خطأ — بل هما مرتبطان ارتباطًا مباشرًا ورياضيًا.
- ب) **صحيح** — كما ذُكر صراحة في المحاضرة: `recall(M) = TP/(TP+FN) = TP/P`، وهي نفس معادلة `sensitivity(M) = TP/P` تمامًا.
- ج) خطأ — بما أنهما متطابقتان رياضيًا، لا يمكن لإحداهما أن تكون أكبر من الأخرى.
- د) خطأ — Recall يُحسب للفئة **الإيجابية** تحديدًا، وليس السلبية.

### السؤال 13
جدول Confusion Matrix التالي: `TP=80, FN=20, FP=10, TN=90`. احسب `Specificity`.

أ) 80%
ب) 90%
ج) 82%
د) 88%

**الإجابة الصحيحة:ب**
- أ) خطأ — هذا يمثل `Sensitivity = TP/(TP+FN) = 80/100 = 80%`، وليس Specificity.
- ب) **صحيح** — `Specificity = TN/(TN+FP) = 90/(90+10) = 90/100 = 90%`.
- ج) خطأ — هذا الرقم غير ناتج عن أي معادلة صحيحة من معطيات السؤال.
- د) خطأ — هذا الرقم غير مطابق لمعادلة Specificity الصحيحة.

### السؤال 14
لماذا تُعتبر طريقة `Holdout` "متشائمة" (`pessimistic`)؟

أ) لأنها تستخدم كل البيانات للتدريب
ب) لأن النموذج يتدرب على جزء فقط من البيانات المتاحة فيظهر أداؤه أضعف قليلاً من إمكاناته الحقيقية
ج) لأنها تكرر العملية عدة مرات
د) لأنها تستخدم أسلوب السحب مع إعادة الوضع

**الإجابة الصحيحة: ب**
- أ) خطأ — بل على العكس، تستخدم جزءًا فقط (مثل 2/3) للتدريب.
- ب) **صحيح** — كما ذُكر في المحاضرة: "The estimate is pessimistic because only a portion of the initial data is used to derive the model".
- ج) خطأ — هذا وصف لـ `Random Sampling` وليس `Holdout` الأساسي.
- د) خطأ — السحب مع إعادة هو خاصية `Bootstrap` وليس `Holdout`.

### السؤال 15
```python
from sklearn.model_selection import KFold
kf = KFold(n_splits=5)
for train_idx, test_idx in kf.split(X):
    model.fit(X[train_idx], y[train_idx])
    # سطر ناقص هنا
```
أي سطر يجب إضافته لحساب دقة النموذج على مجموعة الاختبار في هذا التكرار؟

أ) `model.fit(X[test_idx], y[test_idx])`
ب) `score = model.score(X[test_idx], y[test_idx])`
ج) `score = model.score(X[train_idx], y[train_idx])`
د) `model.predict(X)`

**الإجابة الصحيحة: ب**
- أ) خطأ — استخدام `fit` على بيانات الاختبار خطأ فادح؛ سيؤدي لتسريب بيانات الاختبار للتدريب.
- ب) **صحيح** — يجب حساب `score` على مجموعة **الاختبار** (`test_idx`) تحديدًا، لأن الهدف تقييم الأداء على بيانات لم يرها النموذج.
- ج) خطأ — حساب الدقة على بيانات التدريب نفسها يعطي `Resubstitution Error` المتفائل جدًا.
- د) خطأ — `predict` بدون تحديد `X[test_idx]` والمقارنة بـ `y[test_idx]` لا يعطي رقم دقة مباشرة.

### السؤال 16
أي من التالي يمثل تطبيقًا صحيحًا لمعادلة `.632 Bootstrap` النهائية؟

أ) `accuracy = mean(accuracy_test)` فقط
ب) `accuracy = 0.5 * accuracy_test + 0.5 * accuracy_train`
ج) `accuracy = 0.632 * accuracy_test + 0.368 * accuracy_train`
د) `accuracy = accuracy_test - accuracy_train`

**الإجابة الصحيحة: ج**
- أ) خطأ — هذا يتجاهل مساهمة أداء النموذج على كامل البيانات (`train_set`).
- ب) خطأ — الأوزان في المحاضرة ليست متساوية (50/50) بل 63.2%/36.8%.
- ج) **صحيح** — هذه هي الصيغة الدقيقة المذكورة في المحاضرة: `0.632×acc(test) + 0.368×acc(train)`.
- د) خطأ — الطرح لا معنى إحصائي له هنا؛ المطلوب متوسط مرجّح وليس فرقًا.

---

## الجزء الرابع: أسئلة تصحيح الكود

### تصحيح 1 (النوع: `wrong_formula`)
**الكود الخاطئ:**
```python
def accuracy(tp, tn, fp, fn):
    return (tp + tn) / (tp + fn)  # حساب الدقة
```
**اكتشف الخطأ:** المقام خاطئ؛ يستخدم فقط `tp+fn` (وهو P فقط)، بينما يجب أن يكون `P+N` أي كل التُوبلات.

**التصحيح:**
```python
def accuracy(tp, tn, fp, fn):
    return (tp + tn) / (tp + tn + fp + fn)  # حساب الدقة الصحيح: (TP+TN)/(P+N)
```
**شرح الحل:**
1. معادلة Accuracy الصحيحة هي `(TP+TN)/(P+N)` وليس `(TP+TN)/(TP+FN)`.
2. `P+N` تعني إجمالي عدد التُوبلات في مجموعة الاختبار كاملة (موجبة وسالبة معًا).
3. الكود الخاطئ كان يقسم على `P` فقط (`tp+fn`) متجاهلاً كل الحالات السلبية بالكامل.

### تصحيح 2 (النوع: `logic`)
**الكود الخاطئ:**
```python
from sklearn.model_selection import KFold
kf = KFold(n_splits=5)
for train_idx, test_idx in kf.split(X):
    model = DecisionTreeClassifier()
    model.fit(X[test_idx], y[test_idx])  # تدريب النموذج
    score = model.score(X[train_idx], y[train_idx])
```
**اكتشف الخطأ:** تم عكس أدوار مجموعتي التدريب والاختبار: يتدرب على `test_idx` ويختبر على `train_idx`.

**التصحيح:**
```python
from sklearn.model_selection import KFold
kf = KFold(n_splits=5)
for train_idx, test_idx in kf.split(X):
    model = DecisionTreeClassifier()
    model.fit(X[train_idx], y[train_idx])  # تدريب النموذج على بيانات التدريب
    score = model.score(X[test_idx], y[test_idx])  # اختبار على بيانات الاختبار
```
**شرح الحل:**
1. `train_idx` يجب أن يُستخدم دائمًا مع `fit()` (التدريب).
2. `test_idx` يجب أن يُستخدم دائمًا مع `score()` أو `predict()` (التقييم).
3. عكس الأدوار يجعل النموذج "يرى" بيانات الاختبار أثناء التدريب، مما يبطل الغرض الكامل من `Cross-Validation`.

### تصحيح 3 (النوع: `misconception`)
**الكود الخاطئ:**
```python
# فكرة خاطئة: تقييم النموذج على بيانات التدريب هو تقييم كافٍ وموثوق
model.fit(X_train, y_train)
final_accuracy = model.score(X_train, y_train)  # التقييم النهائي
print(f"Final model accuracy: {final_accuracy}")
```
**اكتشف الخطأ:** التقييم النهائي يُحسب على `X_train, y_train` نفسها، مما ينتج `Resubstitution Error` المتفائل وغير الموثوق.

**التصحيح:**
```python
model.fit(X_train, y_train)
final_accuracy = model.score(X_test, y_test)  # التقييم النهائي على بيانات لم يرها النموذج
print(f"Final model accuracy: {final_accuracy}")
```
**شرح الحل:**
1. يجب دائمًا استخدام `X_test, y_test` (بيانات منفصلة تمامًا) لأي تقييم نهائي.
2. تقييم النموذج على بيانات تدريبه يعطي انطباعًا زائفًا ومتفائلاً جدًا عن الأداء الحقيقي.
3. هذا بالضبط ما حذّرت منه المحاضرة تحت مسمى `Resubstitution Error`.

### تصحيح 4 (النوع: `dead_code`)
**الكود الخاطئ:**
```python
def evaluate(y_true, y_pred, tp, fp, fn):
    precision = tp / (tp + fp)
    recall = tp / (tp + fn)
    if precision + recall == 0:
        f1 = 0
    f1 = 2 * precision * recall / (precision + recall)  # قد يسبب قسمة على صفر
    return f1
```
**اكتشف الخطأ:** السطر `f1 = 0` داخل الشرط هو كود ميت (`dead code`) لأن السطر التالي يعيد حساب `f1` ويطغى عليه دون `return` أو `else`، فينفّذ القسمة على صفر بلا حماية فعلية.

**التصحيح:**
```python
def evaluate(y_true, y_pred, tp, fp, fn):
    precision = tp / (tp + fp)
    recall = tp / (tp + fn)
    if precision + recall == 0:
        return 0  # تجنب القسمة على صفر والخروج فورًا
    f1 = 2 * precision * recall / (precision + recall)
    return f1
```
**شرح الحل:**
1. إضافة `return` داخل شرط الحماية يمنع تنفيذ السطر التالي عند القسمة على صفر.
2. بدون `return`، يستمر تنفيذ الكود ويحاول القسمة على صفر فعليًا مسببًا خطأ `ZeroDivisionError`.
3. هذا النمط (كود يُكتب لكنه لا يُنفَّذ فعليًا بسبب تدفق البرنامج) يُسمى `dead code`.

### تصحيح 5 (النوع: `return_check`)
**الكود الخاطئ:**
```python
def bootstrap_accuracy(acc_test, acc_train):
    result = 0.632 * acc_test + 0.368 * acc_train
    print(result)  # لا يوجد return
```
**اكتشف الخطأ:** الدالة تطبع النتيجة بدلاً من إرجاعها (`return`)، مما يجعل استدعاءها في سياق آخر (مثل `x = bootstrap_accuracy(...)`) يعطي `None`.

**التصحيح:**
```python
def bootstrap_accuracy(acc_test, acc_train):
    result = 0.632 * acc_test + 0.368 * acc_train
    return result  # إرجاع القيمة لاستخدامها لاحقًا
```
**شرح الحل:**
1. `print()` يعرض القيمة على الشاشة فقط لكنه لا "يُرجعها" للمتغير المستدعي للدالة.
2. أي كود يحاول تخزين ناتج هذه الدالة في متغير (`x = bootstrap_accuracy(...)`) سيحصل على `None` بدلاً من الرقم الفعلي.
3. القاعدة العامة: أي دالة يُتوقع استخدام نتيجتها لاحقًا يجب أن تحتوي `return` صريحًا.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)
> هذه تمارين إضافية من إعداد الدليل.

### تمرين 1 (النوع: `metric_calculation`)
**المعطيات:** مصنّف بريد إلكتروني: `TP=150, TN=700, FP=50, FN=100`.

**المطلوب:**
1. احسب `Accuracy`.
2. احسب `Precision`.
3. احسب `Recall`.
4. احسب `F1-score`.

**نموذج الحل:**
- `P = TP+FN = 250`, `N = TN+FP = 750`, الإجمالي = 1000.
- `Accuracy = (150+700)/1000 = 0.85 = 85%`
- `Precision = 150/(150+50) = 150/200 = 0.75 = 75%`
- `Recall = 150/(150+100) = 150/250 = 0.60 = 60%`
- `F1 = 2×0.75×0.60/(0.75+0.60) = 0.9/1.35 ≈ 0.667 = 66.7%`

### تمرين 2 (النوع: `fill_gaps`)
**الكود الناقص:**
```python
def specificity(tn, fp):
    return tn / _______  # (1)
```
**المطلوب:** أكمل الفراغ (1).

**نموذج الحل:**
```python
def specificity(tn, fp):
    return tn / (tn + fp)  # (1) TN/N حيث N = TN+FP
```

### تمرين 3 (النوع: `code_fix`)
**الكود الخاطئ:**
```python
def error_rate(accuracy):
    return accuracy + 1  # حساب نسبة الخطأ
```
**المطلوب:** صحّح الكود.

**نموذج الحل:**
```python
def error_rate(accuracy):
    return 1 - accuracy  # error_rate = 1 - accuracy (وليس accuracy+1)
```

### تمرين 4 (النوع: `scenario`)
**السيناريو:** شركة بطاقات ائتمانية تريد كشف الاحتيال (0.5% فقط من المعاملات احتيالية).

**المطلوب:**
1. لماذا لا تكفي `Accuracy` وحدها هنا؟
2. أي المقياسين (`Precision` أو `Recall`) أهم إذا كانت تكلفة تفويت معاملة احتيالية أعلى بكثير من تكلفة تنبيه كاذب؟

**نموذج الحل:**
1. لأن نسبة الاحتيال ضئيلة جدًا (0.5%)، فمصنّف يتنبأ دائمًا بـ "غير احتيالي" يحقق دقة 99.5% دون اكتشاف أي احتيال فعلي — مشكلة `Class Imbalance` كلاسيكية.
2. `Recall` هو الأهم هنا لأن تكلفة `FN` (تفويت احتيال حقيقي) أعلى بكثير من تكلفة `FP` (تنبيه كاذب لمعاملة سليمة).

### تمرين 5 (النوع: `model_apply`)
**المعطيات:** بيانات حجمها `d = 200` تُستخدم في `.632 Bootstrap`.

**المطلوب:**
1. كم عدد التُوبلات تقريبًا في مجموعة التدريب (Bootstrap Sample)؟
2. كم عدد التُوبلات تقريبًا في مجموعة الاختبار؟

**نموذج الحل:**
1. مجموعة التدريب (bootstrap sample) دائمًا بحجم `d=200` (نفس حجم البيانات الأصلية، لأن السحب مع إعادة يولّد d عينة).
2. مجموعة الاختبار تقريبًا `36.8% × 200 ≈ 74` تُوبلاً (التي لم تُختر إطلاقًا خلال السحب).

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)
> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 6: مقارنة استراتيجيات التقييم
**السيناريو:** لديك 3 مجموعات بيانات: (أ) 50 سجلاً فقط، (ب) 5000 سجل متوازن، (ج) 100,000 سجل مع اختلال شديد في التوازن.

**المطلوب:**
1. أي طريقة تقسيم (`Holdout`, `Cross-Validation`, `Bootstrap`) تناسب كل حالة؟
2. أي مقياس تقييم يناسب الحالة (ج) أكثر من `Accuracy`؟

**نموذج الحل:**
| البيانات | الطريقة المناسبة | السبب |
| --- | --- | --- |
| (أ) 50 سجل | `Bootstrap` أو `Leave-One-Out` | بيانات صغيرة جدًا؛ نحتاج الاستفادة القصوى منها |
| (ب) 5000 سجل متوازن | `k-fold Cross-Validation` (k=10) | حجم كافٍ لتقسيم موثوق دون بطء مفرط |
| (ج) 100,000 غير متوازن | `Holdout` (كافٍ للحجم الكبير) لكن استخدم `Precision/Recall/F1` بدل `Accuracy` | البيانات كبيرة بما يكفي، لكن الاختلال يتطلب مقاييس أدق من Accuracy |

### تمرين 7: إكمال جدول Confusion Matrix
**السيناريو:** جدول Confusion Matrix ناقص لمصنّف "buys_computer":

| Classes | Predicted=yes | Predicted=no | Total |
| --- | --- | --- | --- |
| Actual=yes | ؟ | 50 | 500 |
| Actual=no | 30 | ؟ | 300 |

**المطلوب:**
1. أكمل الخلايا الناقصة.
2. احسب `Accuracy`, `Precision`, `Recall`.

**نموذج الحل:**
- `TP = 500-50 = 450`
- `TN = 300-30 = 270`
- `Accuracy = (450+270)/(500+300) = 720/800 = 90%`
- `Precision = 450/(450+30) = 450/480 = 93.75%`
- `Recall = 450/(450+50) = 450/500 = 90%`

### تمرين 8: تحليل مكتوب
**السيناريو:** فريقان طوّرا مصنّفين لنفس المشكلة (كشف مرض نادر). المصنّف A: `Precision=95%, Recall=40%`. المصنّف B: `Precision=70%, Recall=90%`.

**المطلوب:** أيهما تنصح باستخدامه طبيًا؟ علّل إجابتك.

**نموذج الحل:**
في السياق الطبي لمرض خطير، تفويت حالة حقيقية (`FN`) أخطر بكثير من إنذار كاذب (`FP`) يُصحَّح بفحص إضافي. لذلك المصنّف B (Recall أعلى=90%) أفضل طبيًا رغم دقته الأقل في `Precision`، لأنه يكتشف نسبة أكبر بكثير من الحالات الحقيقية (90% مقابل 40% فقط للمصنّف A).

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: 5-fold Cross-Validation
**المدخل:**
```python
data_size = 25  # 25 سجلاً، k=5
k = 5
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | Test Fold (السجلات) | Train Fold (السجلات) |
| --- | --- | --- |
| 1 | 1-5 | ؟ |
| 2 | ؟ | 1-5, 11-25 |
| 3 | 11-15 | ؟ |
| 4 | ؟ | 1-15, 21-25 |
| 5 | 21-25 | ؟ |

**نموذج الحل:**
| التكرار | Test Fold (السجلات) | Train Fold (السجلات) |
| --- | --- | --- |
| 1 | 1-5 | 6-25 |
| 2 | 6-10 | 1-5, 11-25 |
| 3 | 11-15 | 1-10, 16-25 |
| 4 | 16-20 | 1-15, 21-25 |
| 5 | 21-25 | 1-20 |

**النتيجة:** كل الـ25 سجلاً استُخدمت في الاختبار مرة واحدة بالضبط عبر التكرارات الخمسة.

### تمرين تتبع 2: حساب Confusion Matrix خطوة بخطوة
**المدخل:**
```python
y_true = [1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 0, 1, 0, 1, 1, 0]
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| # | y_true | y_pred | النوع (TP/TN/FP/FN) |
| --- | --- | --- | --- |
| 1 | 1 | 1 | ؟ |
| 2 | 1 | 0 | ؟ |
| 3 | 0 | 0 | ؟ |
| 4 | 1 | 1 | ؟ |
| 5 | 0 | 0 | ؟ |
| 6 | 0 | 1 | ؟ |
| 7 | 1 | 1 | ؟ |
| 8 | 0 | 0 | ؟ |

**نموذج الحل:**
| # | y_true | y_pred | النوع |
| --- | --- | --- | --- |
| 1 | 1 | 1 | TP |
| 2 | 1 | 0 | FN |
| 3 | 0 | 0 | TN |
| 4 | 1 | 1 | TP |
| 5 | 0 | 0 | TN |
| 6 | 0 | 1 | FP |
| 7 | 1 | 1 | TP |
| 8 | 0 | 0 | TN |

**النتيجة:** `TP=3, TN=3, FP=1, FN=1` → `Accuracy = 6/8 = 75%`.

### تمرين تتبع 3: .632 Bootstrap لبيانات صغيرة
**المدخل:**
```python
d = 5  # بيانات حجمها 5: [A, B, C, D, E]
# سحبة عشوائية واحدة مع إعادة (بيانات افتراضية للتوضيح)
bootstrap_sample = ["B", "B", "D", "A", "D"]
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| العنصر | موجود في bootstrap_sample؟ | يذهب إلى |
| --- | --- | --- |
| A | ؟ | ؟ |
| B | ؟ | ؟ |
| C | ؟ | ؟ |
| D | ؟ | ؟ |
| E | ؟ | ؟ |

**نموذج الحل:**
| العنصر | موجود؟ | يذهب إلى |
| --- | --- | --- |
| A | نعم (مرة واحدة) | Training Set |
| B | نعم (مرتين) | Training Set |
| C | لا | Test Set |
| D | نعم (مرتين) | Training Set |
| E | لا | Test Set |

**النتيجة:** مجموعة التدريب = `{A, B, D}` (مع تكرارات)، مجموعة الاختبار = `{C, E}` — أي 40% اختبار في هذه العينة الصغيرة تحديدًا (تقارب نظري فقط عند d الكبيرة تصل 36.8%).

### تمرين تتبع 4: حساب F1 خطوة بخطوة
**المدخل:**
```python
TP, FP, FN = 40, 10, 20
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | القيمة |
| --- | --- | --- |
| 1 | حساب Precision | ؟ |
| 2 | حساب Recall | ؟ |
| 3 | حساب البسط (2×P×R) | ؟ |
| 4 | حساب المقام (P+R) | ؟ |
| 5 | F1 النهائي | ؟ |

**نموذج الحل:**
| الخطوة | العملية | القيمة |
| --- | --- | --- |
| 1 | Precision = 40/(40+10) | 0.80 |
| 2 | Recall = 40/(40+20) | 0.667 |
| 3 | 2×0.80×0.667 | 1.067 |
| 4 | 0.80+0.667 | 1.467 |
| 5 | F1 = 1.067/1.467 | 0.727 (72.7%) |

**النتيجة:** `F1 ≈ 72.7%`.

### تمرين تتبع 5: Holdout مقابل Random Sampling
**المدخل:**
```python
# 3 تكرارات Holdout بنسبة 70/30 على نفس البيانات (بذور عشوائية مختلفة)
accuracies = [0.82, 0.78, 0.85]
```
**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | الدقة | الفرق عن المتوسط |
| --- | --- | --- |
| 1 | 0.82 | ؟ |
| 2 | 0.78 | ؟ |
| 3 | 0.85 | ؟ |
| المتوسط النهائي (Random Sampling) | ؟ | — |

**نموذج الحل:**
- المتوسط = `(0.82+0.78+0.85)/3 = 2.45/3 ≈ 0.8167`
| التكرار | الدقة | الفرق عن المتوسط |
| --- | --- | --- |
| 1 | 0.82 | +0.0033 |
| 2 | 0.78 | -0.0367 |
| 3 | 0.85 | +0.0333 |
| المتوسط | **0.8167** | — |

**النتيجة:** تقدير `Random Sampling` النهائي = **81.67%**، وهو أكثر استقرارًا من الاعتماد على تكرار واحد فقط (مثلاً 78% أو 85% منفردَين).

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### السؤال 1: لماذا لا يمكن تقييم المصنّف على بيانات التدريب نفسها؟
**نموذج الإجابة:** 1. التعريف: التقييم على بيانات التدريب يُنتج `Resubstitution Error`. 2. المكونات/الشروط: النموذج قد "يحفظ" أنماط بيانات التدريب بدلاً من تعلّم قواعد عامة. 3. مثال رقمي: دقة 99% على التدريب قد تنخفض إلى 70% على بيانات اختبار حقيقية (Overfitting). 4. متى نستخدم: يجب دائمًا استخدام Test Set منفصل تمامًا لأي تقييم نهائي موثوق.

### السؤال 2: عرّف `Confusion Matrix` واشرح فائدتها الأساسية.
**نموذج الإجابة:** 1. التعريف: جدول يقارن التصنيف الحقيقي بالمتوقع. 2. المكونات: `TP, TN, FP, FN` (للثنائي) أو `m×m` للمتعدد. 3. مثال رقمي: `TP=6954, TN=2588` من مثال buys_computer. 4. متى نستخدم: أساس لحساب كل مقاييس التقييم الأخرى وفهم أنواع الأخطاء بدقة.

### السؤال 3: ما الفرق بين `Sensitivity` و`Specificity`؟
**نموذج الإجابة:** 1. التعريف: Sensitivity تقيس اكتشاف الإيجابيات، Specificity تقيس اكتشاف السلبيات. 2. المكونات: `Sensitivity=TP/P`, `Specificity=TN/N`. 3. مثال رقمي: 99.34% و86.27% في مثال buys_computer. 4. متى نستخدم: عند الحاجة لفهم أداء المصنّف على كل فئة على حدة، خاصة في التطبيقات الطبية.

### السؤال 4: لماذا تفشل `Accuracy` مع `Class Imbalance`؟
**نموذج الإجابة:** 1. التعريف: Class Imbalance = فئة نادرة جدًا مقابل فئة مهيمنة. 2. المكونات/الشروط: مصنّف "كسول" يتنبأ دائمًا بالفئة المهيمنة يحقق دقة عالية زائفة. 3. مثال رقمي: 97% دقة مع 3% فقط حالات سرطان حقيقية قد تخفي فشلاً كاملاً. 4. متى نستخدم: نلجأ لـ Precision/Recall/F1 بدلاً من الاعتماد فقط على Accuracy.

### السؤال 5: اشرح آلية عمل `.632 Bootstrap` رياضيًا.
**نموذج الإجابة:** 1. التعريف: سحب d عينة مع إعادة من بيانات حجمها d. 2. المكونات: احتمال عدم اختيار تُوبل = `(1-1/d)^d ≈ e⁻¹ ≈ 0.368`. 3. مثال رقمي: من كل 1000 تُوبل، ~368 تنتهي في الاختبار و~632 في التدريب. 4. متى نستخدم: مع البيانات الصغيرة حيث نحتاج تعظيم الاستفادة من العينة المحدودة.

### السؤال 6: قارن بين `Holdout` و`k-fold Cross-Validation`.
**نموذج الإجابة:** 1. التعريف: Holdout تقسيم واحد، Cross-Validation تقسيم متكرر k مرة. 2. المكونات: Holdout سريع لكن متشائم؛ Cross-Validation أبطأ لكن أكثر موثوقية. 3. مثال رقمي: 10-fold يعني تدريب 10 نماذج مختلفة بدل نموذج واحد. 4. متى نستخدم: Holdout للبيانات الضخمة والوقت المحدود، Cross-Validation للتقييم الدقيق.

### السؤال 7: ما معنى قول أن مصنّفًا حقق `Precision=1.0` لفئة معينة؟ وما حدود هذا الرقم؟
**نموذج الإجابة:** 1. التعريف: كل ما تنبأ به النموذج كـ"إيجابي" كان صحيحًا فعلاً (لا FP إطلاقًا). 2. المكونات/الشروط: `TP/(TP+FP)=1` يعني `FP=0`. 3. مثال رقمي: لو تنبأ بـ10 حالات "نعم" وكانت كلها صحيحة فعلاً. 4. متى نستخدم: لكن لا يخبرنا هذا الرقم أي شيء عن عدد الحالات الإيجابية الحقيقية التي فاتته (`FN` قد يكون كبيرًا جدًا رغم Precision المثالي).

### السؤال 8: اشرح لماذا يُستخدم المتوسط التوافقي في `F1-score` بدلًا من المتوسط الحسابي.
**نموذج الإجابة:** 1. التعريف: المتوسط التوافقي يعاقب القيم المنخفضة جدًا بشدة أكبر من المتوسط الحسابي. 2. المكونات: صيغته `2PR/(P+R)`. 3. مثال رقمي: إذا `P=1.0` و`R=0.01`، المتوسط الحسابي=0.505 (مضلل)، بينما التوافقي≈0.0198 (يعكس الضعف الحقيقي). 4. متى نستخدم: عندما نريد التأكد أن كلا المقياسين جيدان معًا، وليس أحدهما فقط.

### السؤال 9: ما هو `Leave-One-Out` ومتى يُستخدم؟
**نموذج الإجابة:** 1. التعريف: حالة خاصة من Cross-Validation حيث `k=d` (عدد التُوبلات). 2. المكونات: في كل تكرار، عنصر واحد فقط للاختبار والباقي للتدريب. 3. مثال رقمي: بيانات من 30 عينة → 30 تكرارًا، كل مرة عنصر واحد يُترك للاختبار. 4. متى نستخدم: للبيانات الصغيرة جدًا حيث لا يمكن التضحية بأجزاء كبيرة منها.

### السؤال 10: كيف تختار المقياس المناسب لتقييم مصنّف حسب طبيعة المشكلة؟
**نموذج الإجابة:** 1. التعريف: لا يوجد مقياس عام "أفضل" مطلقًا؛ الاختيار سياقي. 2. المكونات: Accuracy للبيانات المتوازنة، Precision عند خطورة FP، Recall عند خطورة FN، F1 للتوازن الشامل. 3. مثال رقمي: كشف سرطان → Recall، فلترة سبام → Precision. 4. متى نستخدم: دائمًا نبدأ بفحص توازن الفئات ثم نحدد تكلفة كل نوع خطأ (FP أم FN) قبل اختيار المقياس.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| محاضرات بناء المصنّفات (Decision Tree, Naïve Bayes, kNN, SVM) | هذه المحاضرة | كل نموذج مبني سابقًا يحتاج لتقييمه بهذه المقاييس |
| محاضرات Ensemble Methods القادمة (Bagging, Boosting, Random Forests) | هذه المحاضرة | تعتمد على نفس مفهوم Bootstrap ونفس مقاييس التقييم لقياس التحسّن |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| Confusion Matrix | أساس كل المقاييس؛ القطر = صحيح، خارج القطر = خطأ |
| Accuracy | مضللة عند Class Imbalance؛ استخدم Precision/Recall/F1 عندها |
| Sampling | Holdout سريع ومتشائم، Cross-Validation موثوق وأبطأ، Bootstrap مثالي للبيانات الصغيرة |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `TP, TN, FP, FN` | نتائج المقارنة بين المتوقع والحقيقي | Confusion Matrix |
| `P, N` | عدد الإيجابيات/السلبيات الحقيقية | Accuracy, Sensitivity, Specificity |
| `P'` | عدد ما تنبأ به النموذج كإيجابي (`TP+FP`) | Precision |
| `e⁻¹ ≈ 0.368` | ثابت رياضي لاحتمال عدم الاختيار | .632 Bootstrap |
| `k` | عدد الأجزاء/التكرارات | Cross-Validation, Bootstrap |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | لا تقيّم أبدًا نموذجًا على بيانات تدريبه — Test Set منفصل دائمًا |
| 2 | `Recall = Sensitivity` رياضيًا بالضبط |
| 3 | `Precision` مقامه `TP+FP`، و`Recall` مقامه `TP+FN` — لا تخلط بينهما |
| 4 | `Cross-Validation` = بدون إعادة، `Bootstrap` = مع إعادة |
| 5 | `.632 Bootstrap`: 63.2% تدريب، 36.8% اختبار تقريبًا (نظريًا مع d كبيرة) |
| 6 | اختر المقياس حسب تكلفة الخطأ (FP أم FN أخطر) وليس عشوائيًا |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الفرق بين `Classification` و`Clustering`؟
A: `Classification` تصنيف مُوجَّه بفئات معروفة مسبقًا (Supervised)، بينما `Clustering` تجميع غير موجَّه بدون فئات معروفة (Unsupervised).

**Q2:** ما معادلة `Accuracy`؟
A: `(TP+TN)/(P+N)`.

**Q3:** ما معادلة `Precision`؟
A: `TP/(TP+FP)`.

**Q4:** ما معادلة `Recall`؟
A: `TP/(TP+FN)`، وهي مطابقة لـ `Sensitivity`.

**Q5:** ما هو `Resubstitution Error`؟
A: الخطأ المحسوب على بيانات التدريب نفسها؛ تقدير متفائل وغير موثوق.

**Q6:** كم نسبة البيانات المستخدمة للتدريب عادة في `Holdout`؟
A: عادة 2/3 من البيانات، والباقي (1/3) للاختبار.

**Q7:** ما الفرق بين `Cross-Validation` و`Bootstrap` من حيث السحب؟
A: `Cross-Validation` بدون إعادة (`without replacement`)، `Bootstrap` مع إعادة (`with replacement`).

**Q8:** ما قيمة `k` في `Leave-One-Out`؟
A: تساوي عدد التُوبلات الكلي في البيانات (`k=d`).

**Q9:** ما النسبة التقريبية لبيانات الاختبار في `.632 Bootstrap`؟
A: تقريبًا 36.8% (`e⁻¹`).

**Q10:** ما الفرق بين `F1` و`Fβ`؟
A: `F1` يعطي وزنًا متساويًا لـ Precision وRecall (`β=1`)، بينما `Fβ` يعطي وزنًا مختلفًا حسب قيمة β.

**Q11:** لماذا تفشل `Accuracy` في بيانات `Class Imbalance`؟
A: لأن مصنّفًا يتنبأ دائمًا بالفئة المهيمنة يحقق دقة عالية زائفة رغم فشله الكامل في اكتشاف الفئة النادرة.

**Q12:** ما معادلة `Specificity`؟
A: `TN/N`.

**Q13:** متى نفضّل `Precision` عاليًا على `Recall` عاليًا؟
A: عندما تكون تكلفة `False Positive` أعلى من تكلفة `False Negative` (مثل حظر رسالة بريد مهمة خطأً).

**Q14:** ما هي القيمة الشائعة لـ `k` في `k-fold Cross-Validation`؟
A: القيمة الشائعة هي `k=10`.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)
> الكود الكامل مجمّع من جميع أجزاء المحاضرة — مرجع للطالب، لا شرح جديد.

```python
# === Classifier Evaluation: Confusion Matrix & Metrics ===
from sklearn.metrics import (confusion_matrix, accuracy_score,
                              precision_score, recall_score, f1_score)

y_true = [1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 0, 1, 0, 1, 1, 0]

cm = confusion_matrix(y_true, y_pred)
acc = accuracy_score(y_true, y_pred)
prec = precision_score(y_true, y_pred)
rec = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print("Confusion Matrix:\n", cm)
print(f"Accuracy={acc:.2f}, Precision={prec:.2f}, Recall={rec:.2f}, F1={f1:.2f}")

# === Sampling: Holdout ===
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import numpy as np

X = np.random.rand(300, 4)
y = np.random.randint(0, 2, 300)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=1)
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)
holdout_acc = clf.score(X_test, y_test)
print(f"Holdout Accuracy: {holdout_acc:.2f}")

# === Sampling: k-fold Cross-Validation ===
from sklearn.model_selection import KFold

kf = KFold(n_splits=10, shuffle=True, random_state=42)
accuracies = []
for train_idx, test_idx in kf.split(X):
    model = DecisionTreeClassifier()
    model.fit(X[train_idx], y[train_idx])
    accuracies.append(model.score(X[test_idx], y[test_idx]))

print(f"10-fold CV Average Accuracy: {np.mean(accuracies):.2f}")

# === Sampling: .632 Bootstrap ===
def bootstrap_632(X, y, model_class, k=20):
    d = len(X)
    scores = []
    for _ in range(k):
        idx_train = np.random.choice(d, size=d, replace=True)  # sample with replacement
        idx_test = np.array([i for i in range(d) if i not in set(idx_train)])
        if len(idx_test) == 0:
            continue
        model = model_class()
        model.fit(X[idx_train], y[idx_train])
        acc_test = model.score(X[idx_test], y[idx_test])
        acc_train_full = model.score(X, y)
        scores.append(0.632 * acc_test + 0.368 * acc_train_full)
    return np.mean(scores)

boot_acc = bootstrap_632(X, y, DecisionTreeClassifier, k=20)
print(f".632 Bootstrap Accuracy: {boot_acc:.2f}")
```

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع بناء `Confusion Matrix` من قيم `y_true` و`y_pred` يدويًا.
- [ ] أستطيع حساب `Accuracy`, `Error Rate`, `Sensitivity`, `Specificity`, `Precision`, `Recall`, `F1` من TP/TN/FP/FN.
- [ ] أفهم لماذا تفشل `Accuracy` مع `Class Imbalance` وأستطيع شرح مثال عملي.
- [ ] أستطيع التفريق بوضوح بين `Precision` و`Recall` وأعرف أيهما يُستخدم متى.
- [ ] أستطيع شرح الفرق بين `Holdout`, `Random Sampling`, `Cross-Validation`, `Leave-One-Out`, `Bootstrap`.
- [ ] أفهم لماذا `Holdout` "متشائم" ولماذا `Resubstitution Error` "متفائل".
- [ ] أستطيع حساب النسبة التقريبية (63.2%/36.8%) في `.632 Bootstrap` ولماذا ترتبط بـ `e⁻¹`.
- [ ] أستطيع تتبع تنفيذ `k-fold Cross-Validation` يدويًا على بيانات صغيرة.
- [ ] أستطيع كتابة كود Python كامل لحساب كل هذه المقاييس باستخدام `sklearn`.
- [ ] أستطيع اختيار المقياس المناسب حسب سياق مشكلة معطاة (طبية، أمنية، تسويقية...).

---

<!-- VALIDATION: تم تغطية جميع محتويات المحاضرة (صفحات 1-23): الشرائح 1-3 (مقدمة وفهرس)، شرائح 4-16 (تقييم المصنّفات: Test Set, Confusion Matrix, Accuracy/Error Rate, Limitations, Sensitivity/Specificity, Precision/Recall, F-measures, اختيار المقياس)، شرائح 17-23 (طرق أخذ العينات: Holdout, Random Sampling, Cross-Validation, Leave-One-Out, Bootstrap .632). تم الالتزام ببنية القالب: خريطة تكامل، شرح تفصيلي مع اقتباسات واشتقاقات، ملخص منظم بجداول، 16 سؤال MCQ مع تعليل كامل لكل خيار، 5 أسئلة تصحيح كود بأنواع متعددة (logic, misconception, return_check, dead_code, wrong_formula)، 8 تمارين تطبيقية وتحليلية بنماذج حلول، 5 تمارين تتبع تنفيذ بجداول كاملة، 10 أسئلة نظرية منظمة، ورقة مراجعة سريعة، 14 بطاقة Q&A، كود Python شامل مجمّع، وقائمة فحص ذاتي. جميع المصطلحات الإنجليزية موسومة بـ backticks. -->
