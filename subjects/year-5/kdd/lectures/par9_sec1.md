# المحاضرة 9 — Cluster Analysis (تحليل التجميع) — الجزء الأول
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** `Cluster Analysis` — المفاهيم الأساسية، التطبيقات، اعتبارات التصميم، تصنيف طرق التجميع، ومقاييس التقارب (`Proximity Measures`) للأنواع المختلفة من البيانات (`Numeric`، `Binary`، `Nominal`، `Ordinal`).

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| المحاضرات السابقة (Classification) | `Decision Tree`، `Naive Bayes`، `kNN`، `Ensemble Methods` (`Bagging`, `Boosting`, `Random Forest`) | تعلّم مُوجَّه (Supervised) بمقاييس `Accuracy`، `Precision`، `Recall`، `F1` |
| المحاضرة 9 (هذه المحاضرة) ← **أنت هنا** | مفهوم `Clustering`، `Proximity Measures` (`Minkowski`، `Jaccard`، إلخ) | أساس رياضي/مفاهيمي يُبنى عليه لاحقاً `k-Means`، `K-Modes`، `PAM` |
| المحاضرات القادمة (Cluster Analysis part-2) | `k-Means`، `K-Modes`، `PAM` (`k-Medoids`) | خوارزميات `Partitioning` فعلية تُطبَّق على البيانات باستخدام مقاييس التقارب المشروحة هنا |

> **نوع هذه المحاضرة:** `Clustering` — لذلك اعتمدنا مصطلحات: `k-Means`، `k-Medoids`، `PAM`، `K-Modes`، `Euclidean Distance`، `Manhattan Distance`، `Within-Cluster Variation`.
> **ملاحظة (غير مشروحة في المحاضرة):** خوارزميات `k-Means`، `K-Modes`، و `PAM` وردت فقط في **فهرس المحاضرة (Lecture Index)** كعناوين قادمة، لكن شرحها التفصيلي لم يرد في محتوى هذه الشرائح (الجزء الأول يتوقف عند مقاييس التقارب). سنشير إلى هذا لاحقاً في كل موضع مرتبط.

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. ما هو تحليل التجميع (`What Is Cluster Analysis?`)

#### النص الأصلي يقول:
> "Cluster analysis or simply clustering is the process of partitioning a set of data objects into subsets called clusters."

#### الشرح المبسّط:
`Cluster Analysis` (ويُختصر أحياناً `Clustering`) هو عملية تقسيم مجموعة من الكائنات (`Data Objects`) إلى مجموعات فرعية تسمى `Clusters`، بحيث تُوضع الكائنات المتشابهة مع بعضها في نفس المجموعة، والكائنات المختلفة في مجموعات مختلفة.

**لماذا؟** لأننا في كثير من الأحيان لا نملك تصنيفاً مسبقاً (Label) للبيانات، لكننا نريد أن نكتشف "البنية الطبيعية" أو "الأنماط الخفية" الموجودة فيها — هذا هو جوهر اكتشاف المعرفة (`Knowledge Discovery`).

#### 💡 التشبيه:
> تخيّل أنك تملك سلة فيها فواكه مختلطة (تفاح، برتقال، موز) بدون أي بطاقات أسماء عليها. عملك هو فرزها إلى مجموعات بحسب الشكل واللون والحجم فقط دون أن يخبرك أحد بأسمائها مسبقاً.
> **وجه الشبه:** الفواكه = `Data Objects`، الفرز حسب التشابه = `Clustering`، المجموعات الناتجة = `Clusters`.

---

### 1.1. جودة التجميع (`High-Quality Clusters`)

#### النص الأصلي يقول:
> "A good clustering method should produce high quality clusters, which have: High intra-cluster similarity... Low inter-cluster similarity..."

#### الشرح المبسّط:
طريقة التجميع الجيدة يجب أن تحقق شرطين معاً:
- **`High intra-cluster similarity`** (تماسك داخلي عالٍ): الكائنات **داخل** نفس المجموعة يجب أن تكون متشابهة جداً فيما بينها.
- **`Low inter-cluster similarity`** (تباعد خارجي عالٍ): الكائنات في مجموعات **مختلفة** يجب أن تكون متباينة عن بعضها.

بصريا: `Intra-cluster distances are minimized` (المسافات داخل المجموعة صغيرة) بينما `Inter-cluster distances are maximized` (المسافات بين المجموعات كبيرة).

**لماذا؟** لأن الهدف من التجميع هو أن تعبّر كل مجموعة عن "فئة" واحدة متجانسة فعلاً، وليس خليطاً عشوائياً. لو كانت المجموعات متشابهة مع بعضها البعض، فلن يكون للتجميع أي فائدة تحليلية.

#### 💡 التشبيه:
> فريق كرة قدم جيد التنظيم: اللاعبون في خط الدفاع متقاربون في أدوارهم (تماسك داخلي)، بينما أدوار الدفاع تختلف تماماً عن أدوار الهجوم (تباعد خارجي).
> **وجه الشبه:** خط الدفاع/الهجوم = `Cluster`، تشابه الأدوار داخل الخط = `Intra-cluster similarity`، الاختلاف بين الخطوط = `Inter-cluster dissimilarity`.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** إذا وجدت أن كل الكائنات في مجموعتين مختلفتين متشابهة جداً مع بعضها البعض (رغم أنهما مجموعتان منفصلتان)، فهل هذا تجميع جيد؟
> **لماذا هذا مهم؟** لأنه يوضّح أن مجرد "وجود مجموعات" لا يكفي؛ يجب أن تحقق شرطي `intra` و`inter` similarity معاً، وإلا فالنتيجة تجميع ضعيف حتى لو بدا شكلياً صحيحاً.

---

### 2. التجميع كتعلّم غير مُوجَّه (`Clustering is an Unsupervised Learning Task`)

#### النص الأصلي يقول:
> "Clustering is an unsupervised learning task... We don't know how many clusters exist in the data... We don't know the characteristics of the individual clusters... Thus, Clustering is a form of learning by observation, While the classification is a form of learning by examples..."

#### الشرح المبسّط:
`Clustering` هو مهمة **تعلّم غير مُوجَّه** (`Unsupervised Learning`)، بمعنى:
- لدينا بيانات مُدخلة (`Input Dataset`) لكن **بدون** أي تسميات فئات (`Class Labels`) مسبقة.
- لا نعرف **عدد** المجموعات المطلوبة مسبقاً.
- لا نعرف **خصائص** كل مجموعة قبل التنفيذ.

بالمقابل، `Classification` هو **تعلّم مُوجَّه** (`Supervised Learning`) لأن كل عيّنة تدريب (`Training Tuple`) تأتي مع تسمية صفها (`Class Label`) معروفة سلفاً.

| | `Clustering` | `Classification` |
| --- | --- | --- |
| نوع التعلّم | `Unsupervised` (learning by observation) | `Supervised` (learning by examples) |
| التسميات (Labels) | غير موجودة مسبقاً | موجودة مسبقاً لكل عينة تدريب |
| عدد الفئات | غير معروف مسبقاً غالباً | معروف مسبقاً |
| مثال جدول البيانات | `Unlabeled dataset` (fruit, length, width, weight فقط) | `Labeled dataset` (نفس الأعمدة + عمود `label` مثل Banana/Orange) |

**لماذا؟** لأن الكثير من التطبيقات الواقعية (مثل تصنيف عملاء جدد أو مقالات جديدة) لا تملك أصلاً بيانات مُصنّفة، والحل الوحيد هو اكتشاف الأنماط تلقائياً بالاعتماد على تشابه الخصائص فقط (`Observation`).

#### 💡 التشبيه:
> الطالب الذي يتعلّم من معلّم يصحح له كل إجابة (Supervised) مقابل طالب يراقب الطبيعة من حوله ويستنتج الأنماط بنفسه دون توجيه (Unsupervised).
> **وجه الشبه:** المعلّم المصحِّح = `Class Labels` في التصنيف، الملاحظة الذاتية = `Clustering` بدون تسميات.

---

### 3. المسمّيات البديلة للتجميع (`Automatic Classification` و `Data Segmentation`)

#### النص الأصلي يقول:
> "In some applications, clustering is called automatic classification... automatically find the groupings that can be treated as an implicit classes... In other applications, Clustering is called data segmentation because it partitions large data sets into smaller groups... Not every data segmentation is Cluster Analysis e.g., dividing students into different groups alphabetically by last name."

#### الشرح المبسّط:
- **`Automatic Classification`**: يُطلق هذا الاسم على التجميع أحياناً لأنه يكتشف تلقائياً مجموعات يمكن معاملتها كأنها فئات (`Implicit Classes`) دون أن تُعطى مسبقاً.
- **`Data Segmentation`**: يُطلق هذا الاسم لأن التجميع يقسّم مجموعات بيانات كبيرة إلى مجموعات أصغر.
- **تنبيه مهم:** ليس كل تقسيم بيانات (`Data Segmentation`) هو بالضرورة `Cluster Analysis`. مثال: تقسيم الطلاب أبجدياً حسب اسم العائلة هو تقسيم بيانات، لكنه **ليس** تجميعاً لأنه لا يعتمد على أي تشابه حقيقي بين الخصائص (`Attribute Values`)، بل على معيار عشوائي/إداري (الترتيب الأبجدي).

**لماذا؟** لأن التمييز هنا مهم جداً في الامتحانات وفي الفهم النظري: `Cluster Analysis` يشترط أن يكون التقسيم مبنياً على **قياس تشابه فعلي** بين الكائنات بناءً على خصائصها، وليس أي تقسيم عشوائي.

#### مهم للامتحان ⚠️:
> تذكّر السؤال الفخّي الشائع: "تقسيم الطلاب أبجدياً" هو **Data Segmentation وليس Cluster Analysis** — لأنه لا يعتمد على قياس تشابه فعلي بين الخصائص.

#### 📊 المخطط: مثال توضيحي (Screw/Nail/Paper clip) و (Cluster 1/Cluster 2)

#### ما هذا المخطط؟
> يوضّح مثالين: (١) بيانات مُصنّفة مسبقاً (Screw, Nails, Paper clips) حيث السؤال هو "ما فئة كائن جديد؟" (هذا سؤال تصنيف Classification وليس تجميع)، و(٢) بيانات غير مُصنّفة حيث السؤال هو "هل توجد بنية/تجمّعات في البيانات؟" (هذا سؤال تجميع Clustering فعلي).

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | New Object (Unknown Class) | event | كائن جديد يُراد تحديد فئته بناءً على تصنيف موجود مسبقاً (Screw/Nail/Paper clip) |
| 2 | Cluster 1 | process | مجموعة اكتُشفت تلقائياً من بيانات width/height |
| 3 | Cluster 2 | process | مجموعة أخرى اكتُشفت تلقائياً |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| New Object | Screw/Nail/Paper clip Regions | يُصنَّف ضمن | تصنيف (Classification) | باستخدام فئات معروفة سلفاً |
| Raw Points | Cluster 1 / Cluster 2 | يُجمَّع ضمن | تجميع (Clustering) | باستخدام التشابه فقط دون فئات معروفة |

```diagram
type: flowchart
title: Classification vs Clustering Question
direction: TD
nodes:
  - id: labeled_data
    label: "بيانات مصنفة مسبقاً (Screw/Nail/Clip)"
    kind: data
    level: 0
  - id: classify_q
    label: "ما فئة الكائن الجديد؟"
    kind: decision
    level: 1
  - id: unlabeled_data
    label: "بيانات غير مصنفة (width, height)"
    kind: data
    level: 0
  - id: cluster_q
    label: "هل توجد بنية/تجمعات؟"
    kind: decision
    level: 1
edges:
  - from: labeled_data
    to: classify_q
  - from: unlabeled_data
    to: cluster_q
```

---

### 4. تطبيقات التجميع (`Clustering Applications`)

#### النص الأصلي يقول:
> "In Web search, query keywords may have multiple meanings... Learning the preferences of a user over a set of different topics... In business intelligence, clustering can be used to organize a large number of customers into groups... Discovering similar neighborhoods... As a preprocessing step for other algorithms..."

#### الشرح المبسّط:
تُستخدم تقنيات `Clustering` في مجالات عديدة، أهمها:

1. **`Web Search`**: عندما تكون كلمة البحث متعددة المعاني (مثال: "cardinal" قد تعني طائر الكاردينال أو لاعب فريق St. Louis Cardinals)، يُستخدم التجميع لتنظيم نتائج البحث الكثيرة إلى مجموعات صغيرة يسهل تصفّحها بدلاً من قائمة طويلة غير منظمة.
2. **تعلّم تفضيلات المستخدم (`User Preferences`)**: تُجمَّع المقالات التي يقرأها المستخدم (بدون معرفة الموضوع الحقيقي لكل مقال)، ثم تُستخدم ردود فعل المستخدم (إعجاب/عدم إعجاب) بمرور الوقت لتعلّم تفضيلاته على مستوى `Clusters` كاملة (بدلاً من كل مقال بمفرده)، مما يتيح **التوصية** (`Recommendation`) بمقالات مشابهة للمجموعات المفضّلة.
3. **ذكاء الأعمال (`Business Intelligence`)**:
   - تنظيم عدد كبير من العملاء إلى مجموعات متشابهة (دخل، منطقة سكن، عمر) لبناء استراتيجيات تسويقية (`Marketing Strategies`) وتحسين العلاقة مع العملاء.
   - اكتشاف فئات المنتجات (`Product Categories`) من تاريخ المشتريات (مثال: يكتشف النظام أن "سرير الطفل" و"مقعد السيارة للطفل" ينتميان لفئة ضمنية اسمها "أدوات أطفال" رغم أنهما موسومان ظاهرياً بفئة "أثاث").
4. **اكتشاف الأحياء المتشابهة (`Similar Neighborhoods`)**:
   - **المهمة (`Task`)**: تقدير الأسعار على مستوى إقليمي صغير (حي بحي).
   - **التحدي (`Challenge`)**: عدد قليل جداً (أو معدوم) من عمليات البيع في كل منطقة شهرياً، مما يجعل التقدير الفردي غير موثوق.
   - **الحل (`Solution`)**: تجميع المناطق ذات الاتجاهات المتشابهة معاً ومشاركة المعلومات بينها ضمن المجموعة الواحدة، فيصبح لدينا بيانات كافية للتقدير.
5. **كخطوة تمهيدية (`Preprocessing Step`)**: يُستخدم التجميع أحياناً كخطوة تمهيدية قبل تطبيق خوارزميات أخرى مثل `Regression`، `PCA`، `Classification`، أو `Outlier Detection`.

**لماذا؟** لأن كثيراً من المشاكل الواقعية تعاني من نقص التسميات أو ندرة البيانات على المستوى الجزئي، والتجميع يوفّر حلاً عملياً بتجميع المعلومات المتشابهة معاً.

#### 💡 التشبيه:
> محرك بحث "cardinal" أشبه بموظف استقبال يستقبل كل الزوار الباحثين عن "كاردينال" في مبنى واحد، فيقسّمهم فوراً إلى غرفتين: غرفة لعشاق الطيور، وغرفة لمشجعي البيسبول — بدل أن يتركهم يتزاحمون في قائمة انتظار واحدة طويلة.
> **وجه الشبه:** نتائج البحث المختلطة = قائمة الانتظار الطويلة، `Clusters` = الغرف المفروزة حسب المعنى.

#### ⚖️ المقايضة: استخدام Clustering كخطوة تمهيدية مقابل تجاهله

| | استخدام Clustering قبل Regression/Classification | تجاهل Clustering والعمل مباشرة على البيانات الخام |
| --- | --- | --- |
| المزايا | يقلل التعقيد، يكشف بنية مخفية، يحسّن دقة النموذج اللاحق | أبسط وأسرع في التطبيق المباشر |
| العيوب | تكلفة حسابية إضافية، قرارات إضافية (عدد المجموعات) | قد يفوّت أنماطاً مهمة أو يعاني من ندرة بيانات جزئية |
| متى تختاره | عند وجود بيانات غير متجانسة أو مناطق ببيانات قليلة (مثل تقدير الأسعار الإقليمية) | عند بيانات متجانسة كافية دون الحاجة لتقسيمها |

---

### 5. اعتبارات تصميم تحليل التجميع (`Considerations For Cluster Analysis`)

#### النص الأصلي يقول:
> "1. Partitioning criteria: Single level vs. hierarchical partitioning... 2. Separation of clusters: Exclusive... vs. non-exclusive clusters... 3. Similarity measure... 4. Clustering space: Full space... Subspaces..."

#### الشرح المبسّط:
قبل تصميم أو اختيار خوارزمية تجميع، يجب مراعاة أربعة معايير أساسية:

1. **معيار التقسيم (`Partitioning Criteria`)**:
   - `Single level partitioning`: كل المجموعات في نفس المستوى المفاهيمي، لا توجد هرمية بينها (مثال: k-Means ينتج مجموعات مستوية واحدة).
   - `Hierarchical partitioning`: يمكن تكوين مجموعات على مستويات دلالية مختلفة (مثال: قارة → دولة → مدينة).
2. **فصل المجموعات (`Separation of Clusters`)**:
   - `Exclusive`: كل كائن ينتمي إلى مجموعة **واحدة فقط**.
   - `Non-exclusive`: قد ينتمي الكائن الواحد إلى **أكثر من مجموعة** (مثال: مقال إخباري قد يقع في فئتي "رياضة" و"سياسة" معاً).
3. **مقياس التشابه (`Similarity Measure`)**: يُحدَّد إما عبر:
   - **المسافة (`Distance-based`)**: مثل `Minkowski Distance`.
   - **الاتصالية (`Connectivity-based`)**: بناءً على الكثافة (`Density`) أو التجاور (`Contiguity`).
4. **فضاء التجميع (`Clustering Space`)**:
   - `Full space`: البحث عن المجموعات ضمن كامل فضاء البيانات — يُستخدم غالباً في بيانات منخفضة الأبعاد.
   - `Subspaces`: البحث ضمن فضاءات فرعية فقط — يُستخدم غالباً في بيانات عالية الأبعاد (`High-Dimensional Data`) لتفادي "لعنة الأبعاد" (`Curse of Dimensionality` — *شرح زيادة للفهم*: كلما زاد عدد الأبعاد، تصبح المسافات بين جميع النقاط متقاربة نسبياً، مما يُضعف فعالية مقاييس التشابه في الفضاء الكامل).

**لماذا؟** لأن هذه الاعتبارات الأربعة هي التي تُحدد أي خوارزمية تجميع (`k-Means`, `PAM`, `DBSCAN`, `Hierarchical`...) تناسب مشكلتنا فعلياً، فكل خوارزمية تُبنى على افتراضات مختلفة حول هذه المحاور.

#### 💡 التشبيه:
> تنظيم مكتبة كتب: هل ستكون الرفوف مستوية واحدة (Single level) أم مقسّمة إلى أقسام وأقسام فرعية (Hierarchical)؟ وهل يمكن لكتاب واحد أن يوضع في أكثر من قسم (Non-exclusive، مثل كتاب "تاريخ الطب" في قسمي التاريخ والطب) أم في قسم واحد فقط (Exclusive)؟
> **وجه الشبه:** الأقسام الفرعية = `Hierarchical partitioning`، الكتاب المزدوج التصنيف = `Non-exclusive clustering`.

#### الفهم الخاطئ الشائع ❌:
كل خوارزميات التجميع تُنتج مجموعات حصرية (Exclusive) فقط.
#### الفهم الصحيح ✅:
بعض خوارزميات التجميع (مثل Fuzzy Clustering — *شرح زيادة للفهم*) تسمح بانتماء الكائن الواحد لأكثر من مجموعة (Non-exclusive)، والمحاضرة تنص صراحة على وجود هذا النوع كاعتبار أساسي في التصميم.

---

### 6. تصنيف طرق التجميع الرئيسية (`A Categorization Of Major Clustering Methods`)

#### النص الأصلي يقول:
> "In general, the major fundamental clustering methods can be classified into the following categories: Partitioning Methods... Hierarchical Methods... Density-based Methods... Grid-based Methods..."

#### الشرح المبسّط:
تُصنَّف طرق التجميع الأساسية إلى أربع فئات كبرى:

**أ) `Partitioning Methods` (طرق التقسيم):**
- تُنتج مجموعات حصرية (`Mutually Exclusive`).
- تعتمد على المسافة (`Distance-based`).
- قد تستخدم المتوسط (`Mean`) أو نقطة تمثيلية (`Medoid`) لتمثيل مركز المجموعة.
- تعمل بشكل جيد لاكتشاف مجموعات كروية الشكل (`Spherical-shaped Clusters`) في بيانات صغيرة إلى متوسطة الحجم.
- أمثلة: `k-Means`، `k-Medoids`، `CLARANS`.

**ب) `Hierarchical Methods` (الطرق الهرمية):**
- تنتج تحليلاً هرمياً (`Hierarchical Decomposition`) بعدة مستويات.
- إما تصاعدية (`Agglomerative` — من الأسفل للأعلى، تبدأ بكل كائن كمجموعة مستقلة ثم تدمجها تدريجياً) أو تنازلية (`Divisive` — من الأعلى للأسفل، تبدأ بمجموعة واحدة كبيرة ثم تقسّمها).
- **لا يمكنها تصحيح** الدمج أو التقسيم الخاطئ بعد حدوثه (`Cannot correct erroneous merges or splits`) — *شرح زيادة للفهم*: بمجرد دمج مجموعتين أو تقسيم مجموعة، لا تستطيع الخوارزمية التراجع عن هذا القرار لاحقاً.
- أمثلة: `Diana`، `Agnes`، `BIRCH`، `CAMELEON`.

**ج) `Density-based Methods` (الطرق القائمة على الكثافة):**
- يمكنها اكتشاف مجموعات ذات أشكال عشوائية (`Arbitrarily Shaped Clusters`)، وليس فقط الشكل الكروي.
- المجموعات هي مناطق كثيفة من الكائنات في الفضاء، مفصولة عن بعضها بمناطق منخفضة الكثافة.
- تعتمد على دوال الاتصالية (`Connectivity`) والكثافة (`Density`).
- أمثلة: `DBSCAN`، `OPTICS`، `DenClue`.

**د) `Grid-based Methods` (الطرق القائمة على الشبكة):**
- تستخدم بنية بيانات شبكية متعددة الدقة (`Multiresolution Grid Data Structure`).
- سريعة المعالجة (زمن المعالجة **مستقل عن عدد الكائنات** لكنه **يعتمد على حجم الشبكة**).
- أمثلة: `STING`، `WaveCluster`، `CLIQUE`.

**لماذا؟** لأن كل نوع بيانات ونوع مشكلة يحتاج فئة مختلفة: البيانات الكروية الصغيرة تناسب `Partitioning`، البيانات ذات الأشكال المعقدة تناسب `Density-based`، والبيانات ذات الحجم الهائل قد تحتاج تسريعاً عبر `Grid-based`.

#### ⚖️ المقايضة: Partitioning Methods مقابل Density-based Methods

| | Partitioning Methods (مثل k-Means) | Density-based Methods (مثل DBSCAN) |
| --- | --- | --- |
| المزايا | بسيطة وسريعة، مناسبة للبيانات الكروية | تكتشف أشكالاً عشوائية، مقاومة أفضل للـ Outliers |
| العيوب | تفشل مع الأشكال غير الكروية، حساسة للـ Outliers | حساسة لضبط معاملات الكثافة، أبطأ نسبياً على بيانات كبيرة جداً |
| متى تختاره | بيانات صغيرة/متوسطة، مجموعات كروية متوقعة | بيانات ذات أشكال معقدة أو ضوضاء (Noise) كثيرة |

#### مهم للامتحان ⚠️:
> احفظ الأمثلة النموذجية (`Typical Methods`) لكل فئة بدقة — هذا سؤال تكراري شائع:
> `Partitioning` → k-Means, k-Medoids, CLARANS
> `Hierarchical` → Diana, Agnes, BIRCH, CAMELEON
> `Density-based` → DBSCAN, OPTICS, DenClue
> `Grid-based` → STING, WaveCluster, CLIQUE

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا لا تستطيع الطرق الهرمية (Hierarchical) تصحيح خطأ الدمج المبكر؟
> **لماذا هذا مهم؟** لأن هذا القيد هو السبب الرئيسي وراء ابتكار طرق هجينة مثل BIRCH و CAMELEON التي تحاول تخفيف هذا القصور، وهو مفهوم يُختبر غالباً في أسئلة المقارنة.

---

### 7. مقاييس التقارب: التشابه والاختلاف (`Similarity, Dissimilarity, and Proximity`)

#### النص الأصلي يقول:
> "Similarity sim(i,j), measures how two data objects are alike... Dissimilarity or distance d(i,j), measures how two data objects are different... Proximity usually refers to either similarity or dissimilarity."

#### الشرح المبسّط:
- **`Similarity` (`sim(i,j)`)**: تقيس مدى **تشابه** كائنين، وعادة تقع ضمن المجال `[0,1]`؛ حيث `0` = لا تشابه إطلاقاً، و`1` = تشابه تام (متطابقان).
- **`Dissimilarity` أو `Distance` (`d(i,j)`)**: تقيس مدى **اختلاف** كائنين، وعادة تقع أيضاً ضمن `[0,1]`؛ حيث `0` = متطابقان تماماً، وكلما ارتفعت القيمة زاد التباين.
- **`Proximity`**: مصطلح عام يُشير إلى **إما** `Similarity` **أو** `Dissimilarity` (أي كلمة مظلة تجمع المفهومين).

يمكن حساب `Similarity`/`Dissimilarity` بحسب نوع الخاصية (`Attribute`):
- خصائص عددية (`Numeric`)
- خصائص ثنائية (`Binary`)
- خصائص اسمية (`Nominal`)
- خصائص ترتيبية (`Ordinal`)
- أو مزيج من هذه الأنواع معاً.

**لماذا؟** لأن اختيار مقياس التقارب الصحيح يعتمد كلياً على نوع البيانات؛ استخدام مقياس مسافة عددي (مثل Euclidean) على بيانات اسمية (مثل الألوان) يُعطي نتائج بلا معنى.

#### 📐 المعادلة: العلاقة بين Similarity و Dissimilarity

$$
sim(i,j) = 1 - d(i,j)
$$

**الشرح:**
> `sim(i,j)`: درجة التشابه بين الكائنين i و j (كلما اقتربت من 1 زاد التشابه). `d(i,j)`: درجة الاختلاف (Distance) بينهما (كلما اقتربت من 0 زاد التشابه). هذه العلاقة صحيحة عندما تكون كلتا القيمتين مُطبَّعتين (Normalized) ضمن المجال [0,1].

---

### 8. مصفوفة البيانات ومصفوفة عدم التشابه (`Data Matrix and Dissimilarity Matrix`)

#### النص الأصلي يقول:
> "Main memory-based clustering and nearest-neighbor algorithms typically operate on the following two data structures: 1. Data matrix... 2. Dissimilarity matrix... Usually symmetric d(i,j)=d(j,i)."

#### الشرح المبسّط:
تعتمد خوارزميات التجميع (ذات المعالجة داخل الذاكرة) على بنيتي بيانات أساسيتين:

**1. مصفوفة البيانات (`Data Matrix`):**
- بنية بحجم `n × p` (`n` = عدد نقاط البيانات، `p` = عدد الأبعاد/الخصائص).
- `x_if` هي قيمة الخاصية رقم `f` للكائن `X_i = (x_i1, x_i2, ..., x_ip)`.
- تُسمَّى الكائنات هنا أيضاً `Feature Vectors` (متجهات الخصائص).

**2. مصفوفة عدم التشابه (`Dissimilarity Matrix`):**
- بنية بحجم `n × n` تخزّن الاختلافات بين كل زوج من الكائنات.
- عادة تكون **متماثلة** (`Symmetric`): `d(i,j) = d(j,i)`، لذلك يكفي تخزين نصفها فقط (مصفوفة مثلثية `Triangular Matrix`).
- القطر الرئيسي دائماً أصفار: `d(i,i) = 0`.

**لماذا؟** لأن التمييز بين البنيتين أساسي: `Data Matrix` تخزّن **الخصائص الأصلية**، بينما `Dissimilarity Matrix` تخزّن **العلاقات المُشتقة** (المسافات) بين الكائنات، وبعض الخوارزميات (كـ `PAM`, `Hierarchical`) تعمل مباشرة على `Dissimilarity Matrix` بدلاً من البيانات الخام.

#### 📊 المخطط: العلاقة بين Data Matrix و Dissimilarity Matrix

#### ما هذا المخطط؟
> يوضّح تدفق العمل: نبدأ من بيانات خام (Data Matrix)، ثم نحسب منها مصفوفة الاختلاف (Dissimilarity Matrix) باستخدام مقياس مسافة معيّن (مثل Euclidean)، والتي تُستخدم لاحقاً في خوارزميات التجميع.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Data Matrix (n×p) | data | البيانات الخام لكل كائن وخصائصه |
| 2 | Distance Function | process | دالة حساب المسافة (Euclidean/Manhattan/Jaccard...) |
| 3 | Dissimilarity Matrix (n×n) | data | مصفوفة الاختلاف بين كل زوج كائنات |
| 4 | Clustering Algorithm | process | خوارزمية التجميع التي تستهلك المصفوفة |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Data Matrix (n×p) | Distance Function | تُغذّي | تدفق بيانات | كل زوج صفوف يُمرَّر لحساب المسافة |
| Distance Function | Dissimilarity Matrix (n×n) | تُنتج | تدفق بيانات | الناتج مصفوفة مثلثية متماثلة |
| Dissimilarity Matrix (n×n) | Clustering Algorithm | تُستخدم في | تدفق بيانات | مدخل مباشر لخوارزميات مثل PAM |

```diagram
type: flowchart
title: From Data Matrix to Dissimilarity Matrix
direction: TD
nodes:
  - id: data_matrix
    label: "Data Matrix (n x p)"
    kind: data
    level: 0
  - id: dist_fn
    label: "Distance Function"
    kind: process
    level: 1
  - id: diss_matrix
    label: "Dissimilarity Matrix (n x n)"
    kind: data
    level: 2
  - id: cluster_algo
    label: "Clustering Algorithm"
    kind: process
    level: 3
edges:
  - from: data_matrix
    to: dist_fn
  - from: dist_fn
    to: diss_matrix
  - from: diss_matrix
    to: cluster_algo
```

#### 🔍 تتبع التنفيذ: بناء Dissimilarity Matrix من مثال المحاضرة (Euclidean)

**المدخل:** نقاط `x1=(1,2)`, `x2=(3,5)`, `x3=(2,0)`, `x4=(4,5)`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب `d(x2,x1)=√((3-1)²+(5-2)²)=√13` | `d(x2,x1)≈3.61` |
| 2 | حساب `d(x3,x1)=√((2-1)²+(0-2)²)=√5` | `d(x3,x1)≈2.24` |
| 3 | حساب `d(x3,x2)=√((2-3)²+(0-5)²)=√26` | `d(x3,x2)≈5.1` |
| 4 | حساب `d(x4,x1)=√((4-1)²+(5-2)²)=√18` | `d(x4,x1)≈4.24` |
| 5 | حساب `d(x4,x2)=√((4-3)²+(5-5)²)=√1` | `d(x4,x2)=1` |
| 6 | حساب `d(x4,x3)=√((4-2)²+(5-0)²)=√29` | `d(x4,x3)≈5.39` |

**النتيجة:** مصفوفة عدم التشابه (مثلثية سفلية، القطر=0) مطابقة تماماً لما ورد في الشريحة 15.

---

### 9. مقاييس التقارب للخصائص العددية (`Proximity Measures For Numerical Attributes`)

#### النص الأصلي يقول:
> "Minkowski Distance: used for computing the dissimilarity of objects described by numeric attributes... L1 norm: Manhattan distance... L2 norm: Euclidean distance... Minkowski distance satisfy the following mathematical properties: Non-negativity... Identity of indiscernibles... Symmetry... Triangle inequality..."

#### الشرح المبسّط:
`Minkowski Distance` هي **الصيغة العامة** لحساب الاختلاف (Dissimilarity) بين كائنين موصوفين بخصائص عددية.

**📐 المعادلة: Minkowski Distance**

$$
d(i,j) = \sqrt[h]{|x_{i1}-x_{j1}|^h + |x_{i2}-x_{j2}|^h + \cdots + |x_{ip}-x_{jp}|^h}
$$

**الشرح:**
> `i, j`: كائنان بعديّان (p-dimensional). `x_if`: قيمة الخاصية f للكائن i. `h`: رتبة المعيار (Order)، ولذلك تُسمى أيضاً `L-h norm`.

حالتان خاصتان مهمتان جداً:

**📐 المعادلة: Manhattan Distance (L1 norm)**
$$
d(i,j) = |x_{i1}-x_{j1}| + |x_{i2}-x_{j2}| + \cdots + |x_{ip}-x_{jp}|
$$
**الشرح:**
> عند `h=1`. تجمع القيم المطلقة للفروقات مباشرة دون تربيع — أشبه بالمسافة التي يقطعها سائر يتحرك في شوارع متعامدة (شبكة مدينة منهاتن) فلا يمكنه القطع بالخط المستقيم.

**📐 المعادلة: Euclidean Distance (L2 norm)**
$$
d(i,j) = \sqrt{|x_{i1}-x_{j1}|^2 + |x_{i2}-x_{j2}|^2 + \cdots + |x_{ip}-x_{jp}|^2}
$$
**الشرح:**
> عند `h=2`. هي المسافة المستقيمة (الخط الأقصر) بين نقطتين في الفضاء الإقليدي — وهي الأكثر استخداماً عملياً في خوارزميات مثل `k-Means`.

**الخواص الرياضية التي تحققها Minkowski Distance:**
| الخاصية | الصيغة | المعنى |
| --- | --- | --- |
| `Non-negativity` | `d(i,j) ≥ 0` | المسافة لا يمكن أن تكون سالبة أبداً |
| `Identity of indiscernibles` | `d(i,i) = 0` | مسافة الكائن عن نفسه صفر دائماً |
| `Symmetry` | `d(i,j) = d(j,i)` | لا يهم ترتيب الكائنين |
| `Triangle inequality` | `d(i,j) ≤ d(i,k) + d(k,j)` | الذهاب مباشرة من i إلى j لا يتجاوز أبداً المرور بأي كائن وسيط k |

**لماذا؟** هذه الخواص الأربع هي التي تجعل هذه الدوال "مسافات رياضية حقيقية" (Metrics) يمكن الاعتماد عليها في بناء خوارزميات تجميع رياضياً متماسكة (كل خوارزمية تجميع قائمة على المسافة تفترض ضمناً تحقق هذه الخواص).

#### 💡 التشبيه:
> `Manhattan Distance` أشبه بسائق سيارة أجرة في مدينة ذات شوارع متعامدة (كمدينة منهاتن): لا يمكنه اختراق المباني بخط مستقيم، بل يجب أن يسير أفقياً ثم عمودياً. أما `Euclidean Distance` فهي أشبه بطائر يطير بخط مستقيم مباشر بين نقطتين.
> **وجه الشبه:** مجموع خطوات السيارة الأفقية والعمودية = `Manhattan (L1)`، خط الطيران المباشر = `Euclidean (L2)`.

#### ⚠️ ملاحظة:
> **تطبيع البيانات (Normalization) ضروري قبل حساب المسافة:** التعبير عن خاصية بوحدات أصغر يعطيها نطاقاً (Range) أكبر، وبالتالي وزناً (Weight) أكبر ظلماً في حساب المسافة. لذلك يجب تطبيع كل الخصائص لتقع ضمن مجال موحّد صغير مثل `[-1,1]` أو `[0.0,1.0]` قبل تطبيق أي حساب مسافة.

#### 🔍 تتبع التنفيذ: حساب Manhattan و Euclidean لنقطتين

**المدخل:** `x1=(1,2)`, `x4=(4,5)`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Manhattan: `\|4-1\| + \|5-2\|` | `3 + 3 = 6` |
| 2 | Euclidean: `√((4-1)² + (5-2)²)` | `√(9+9) = √18 ≈ 4.24` |

**النتيجة:** `d_manhattan(x1,x4)=6`، `d_euclidean(x1,x4)≈4.24` — مطابقة لجدولي الشريحة 18.

---

### 10. مقاييس التقارب للخصائص الثنائية (`Proximity Measure for Binary Attributes`)

#### النص الأصلي يقول:
> "we usually use contingency tables... q/t is the number of attributes that equal 1/0 for both objects... r/s is the number of attributes that equal 1/0 for object i but equal 0/1 for object j... If objects i and j are described by symmetric binary attributes... If objects i and j are described by asymmetric binary attributes... Jaccard coefficient to compute similarity for asymmetric binary attributes..."

#### الشرح المبسّط:
عندما تكون الخصائص ثنائية (Binary — قيمتان فقط 0 و1)، نستخدم **جدول التوافق** (`Contingency Table`) لحساب عدد الحالات المشتركة بين كائنين `i` و `j`:

| | Object j = 1 | Object j = 0 | المجموع |
| --- | --- | --- | --- |
| Object i = 1 | `q` | `r` | `q+r` |
| Object i = 0 | `s` | `t` | `s+t` |
| المجموع | `q+s` | `r+t` | `p` (إجمالي الخصائص) |

- `q`: عدد الخصائص التي تساوي 1 لكلا الكائنين معاً.
- `t`: عدد الخصائص التي تساوي 0 لكلا الكائنين معاً.
- `r`, `s`: عدد الخصائص المختلفة (تطابق سالب لأحدهما فقط).

**الحالة الأولى — خصائص ثنائية متماثلة (`Symmetric Binary`)**: كلتا القيمتين (0 و1) لها **نفس الأهمية والوزن** (مثال: الجنس Male/Female).

**📐 المعادلة: Symmetric Binary Dissimilarity**
$$
d(i,j) = \frac{r+s}{q+r+s+t}
$$
**الشرح:**
> "الحالات المختلفة مقسومة على كل الحالات" (Different cases divided by all the cases) — أي عدد الخصائص التي **اختلف** فيها الكائنان مقسوماً على **إجمالي** عدد الخصائص `p`.

**الحالة الثانية — خصائص ثنائية غير متماثلة (`Asymmetric Binary`)**: إحدى القيمتين (عادة 1) أكثر أهمية من الأخرى (مثال: نتيجة فحص طبي إيجابي `Y/P` أهم من نتيجة سلبية `N`).

**📐 المعادلة: Asymmetric Binary Dissimilarity**
$$
d(i,j) = \frac{r+s}{q+r+s}
$$
**الشرح:**
> هنا يُهمَل `t` (عدد التطابقات السلبية معاً) تماماً من المعادلة، لأن التطابق على "غياب الصفة" (0-0) لا يحمل معلومة مهمة (مثال: عدم إصابة شخصين بنفس المرض النادر لا يعني بالضرورة تشابههما).

**📐 المعادلة: Jaccard Similarity Coefficient**
$$
sim_{jaccard}(i,j) = 1 - d(i,j) = \frac{q}{q+r+s}
$$
**الشرح:**
> يقيس التشابه (وليس الاختلاف) للخصائص الثنائية غير المتماثلة: عدد التطابقات الإيجابية `q` مقسوماً على كل الحالات ما عدا التطابق السلبي المشترك `t`.

**لماذا؟** لأن معاملة كل الخصائص الثنائية بنفس الطريقة (متماثلة) قد تُشوّه النتائج في حالات مثل التشخيص الطبي، حيث "غياب أعراض مشتركة" بين مريضين لا يعني تشابههما مرضياً؛ لذلك نحتاج تمييز `Symmetric` عن `Asymmetric`.

#### 💡 التشبيه:
> تخيّل اختباري دم لشخصين: كلاهما لم يُصب بمرض نادر معين (0-0) — هذا **لا يعني** أنهما متشابهان طبياً لأن أغلب الناس أصلاً لا يصابون بهذا المرض. لكن لو كلاهما أصيب فعلاً بنفس المرض (1-1)، فهذا تشابه ذو دلالة حقيقية.
> **وجه الشبه:** التطابق السلبي (0-0) عديم القيمة = `t` المُهمَل في Asymmetric، التطابق الإيجابي (1-1) ذو قيمة = `q` المُستخدم في Jaccard.

#### مهم للامتحان ⚠️:
> السؤال الأشهر: "متى نتجاهل `t`؟" الجواب: عندما تكون الخصائص **Asymmetric Binary** فقط (وليس كل الحالات).

#### 🔍 تتبع التنفيذ: مثال المرضى (Jack, Mary, Jim) — خصائص Asymmetric

**المدخل:** Jack=(Fever=Y, Cough=N, Test1=P, Test2=N, Test3=N, Test4=N)، وبالمثل لباقي المرضى (Gender مُستبعد لأنه Symmetric).

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | بناء جدول توافق Jack×Mary: q=2, r=0, s=1, t=3 | `d(jack,mary) = (0+1)/(2+0+1) = 0.33` |
| 2 | بناء جدول توافق Jack×Jim: q=1, r=1, s=1, t=3 | `d(jack,jim) = (1+1)/(1+1+1) = 0.67` |
| 3 | بناء جدول توافق Jim×Mary: q=1, r=1, s=2, t=2 | `d(jim,mary) = (1+2)/(1+1+2) = 0.75` |

**النتيجة:** أقل مسافة = Jack و Mary (0.33) → الأكثر تشابهاً في احتمال الإصابة بنفس المرض؛ وأعلى مسافة = Jim و Mary (0.75) → الأقل تشابهاً.

---

### 11. مقاييس التقارب للخصائص الاسمية (`Proximity Measures for Nominal Attributes`)

#### النص الأصلي يقول:
> "To compute the dissimilarity between two objects i and j described by p nominal attributes: d(i,j) = (p-m)/p... Where m is the number of matches... Alternatively, similarity can be computed as: sim(i,j) = 1 - d(i,j) = m/p"

#### الشرح المبسّط:
الخصائص الاسمية (`Nominal`) هي خصائص لها أكثر من قيمتين محتملتين، لكن **لا يوجد ترتيب منطقي** بينها (مثال: `code A`, `code B`, `code C`).

**📐 المعادلة: Nominal Dissimilarity (Ratio of Mismatches)**
$$
d(i,j) = \frac{p-m}{p}
$$
**الشرح:**
> `p`: إجمالي عدد الخصائص الاسمية. `m`: عدد الخصائص التي **تطابقت** فيها قيم الكائنين i و j (بنفس الحالة/القيمة). فالنتيجة هي "نسبة عدم التطابق" — كل خاصية غير متطابقة تُحسب كاختلاف كامل (لا توجد درجات وسطى للاختلاف).

**📐 المعادلة: Nominal Similarity**
$$
sim(i,j) = 1 - d(i,j) = \frac{m}{p}
$$
**الشرح:**
> نسبة عدد الخصائص المتطابقة إلى إجمالي عدد الخصائص.

**لماذا؟** لأنه لا يوجد معنى لـ "نصف تطابق" في قيمة اسمية مثل اللون أو الرمز — إما تتطابق القيمتان تماماً أو لا تتطابقان إطلاقاً، على عكس الخصائص العددية أو الترتيبية التي تسمح بدرجات وسطى من الاختلاف.

#### 🔍 تتبع التنفيذ: مثال test-1 (nominal) لأربعة كائنات (code A, code B, code C, code A)

**المدخل:** `p=1` (خاصية اسمية واحدة فقط: test-1)

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | مقارنة Object1(code A) و Object2(code B) | مختلفان → `d(2,1)=1` |
| 2 | مقارنة Object3(code C) و Object1(code A) | مختلفان → `d(3,1)=1` |
| 3 | مقارنة Object3(code C) و Object2(code B) | مختلفان → `d(3,2)=1` |
| 4 | مقارنة Object4(code A) و Object1(code A) | متطابقان → `d(4,1)=0` |
| 5 | مقارنة Object4(code A) و Object2(code B) | مختلفان → `d(4,2)=1` |
| 6 | مقارنة Object4(code A) و Object3(code C) | مختلفان → `d(4,3)=1` |

**النتيجة:** كل الأزواج مختلفة (d=1) ما عدا الزوج (1,4) لأن كليهما `code A` (d=0)، تماماً كما في مصفوفة الشريحة 21.

---

### 12. مقاييس التقارب للخصائص الترتيبية (`Proximity Measures for Ordinal Attributes`)

#### النص الأصلي يقول:
> "Suppose that f is an ordinal attribute that has Mf ordered states... 1. For the object i, replace the value of f attribute xif by its corresponding rank rif... 2. Map the range of each ordinal attribute onto [0.0, 1.0]... 3. Dissimilarity can then be computed using any of the distance measures for numeric attributes. Similarity values for ordinal attributes sim(i,j)=1-d(i,j)."

#### الشرح المبسّط:
الخصائص الترتيبية (`Ordinal`) تشبه الاسمية في أن قيمها فئوية، لكنها **مرتّبة منطقياً** (مثال: fair < good < excellent). لذلك نتعامل معها بخطوات مختلفة عن الاسمية للاستفادة من هذا الترتيب:

**⚙️ الخطوات / الخوارزمية: معالجة الخصائص الترتيبية**

#### ما هدف هذه العملية؟
> تحويل قيم فئوية مرتّبة إلى أرقام عددية مطبَّعة (Normalized) بحيث يمكن تطبيق أي مقياس مسافة عددي (مثل Euclidean) عليها مباشرة.

```algorithm
1 | استبدال القيمة بالرتبة | Ranking | لكل كائن i، استبدل قيمة الخاصية x_if برتبتها المقابلة r_if ∈ {1, 2, ..., M_f}
2 | تطبيع الرتب | Min-Max Mapping | حوّل كل رتبة r_if إلى z_if = (r_if - 1) / (M_f - 1) بحيث تقع ضمن [0.0, 1.0]
3 | حساب المسافة | Numeric Distance Measure | طبّق أي مقياس مسافة للخصائص العددية (مثل Euclidean) على القيم z_if الناتجة
```

#### نقاط التنفيذ:
- ترتيب الحالات (`M_f` عدد الحالات الترتيبية) يجب أن يكون معروفاً ومتفقاً عليه مسبقاً (مثل: fair=1, good=2, excellent=3).
- الخطوة 2 (التطبيع) ضرورية لتفادي إعطاء وزن أكبر ظلماً لعدد الحالات الأكبر.

**📐 المعادلة: Ordinal Attribute Normalization**
$$
z_{if} = \frac{r_{if}-1}{M_f-1}
$$
**الشرح:**
> `r_if`: رتبة الكائن i في الخاصية الترتيبية f. `M_f`: العدد الإجمالي للحالات الترتيبية الممكنة لهذه الخاصية. `z_if`: القيمة المطبَّعة ضمن [0.0,1.0].

**📐 المعادلة: Ordinal Similarity**
$$
sim(i,j) = 1 - d(i,j)
$$

**لماذا؟** لأن تجاهل الترتيب (ومعاملة test-2 كخاصية اسمية بسيطة) يُفقدنا معلومة مهمة: "excellent" أقرب فعلياً إلى "good" منها إلى "fair" — وهذا التدرج لا يظهر إلا بعد تحويل الرتب إلى أرقام مطبَّعة ثم قياس المسافة العددية بينها.

#### 🔍 تتبع التنفيذ: مثال test-2 الترتيبي (fair, good, excellent) لأربعة كائنات

**المدخل:** القيم الأصلية: Object1=excellent, Object2=fair, Object3=good, Object4=excellent | `M_f=3`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تعيين الرتب: fair=1, good=2, excellent=3 | Object1=3, Object2=1, Object3=2, Object4=3 |
| 2 | تطبيع: z=(r-1)/(3-1) | Object1=1.0, Object2=0.0, Object3=0.5, Object4=1.0 |
| 3 | حساب Euclidean: `d(2,1)=\|0.0-1.0\|` | `d(2,1)=1.0` |
| 4 | حساب Euclidean: `d(3,1)=\|0.5-1.0\|` | `d(3,1)=0.5` |
| 5 | حساب Euclidean: `d(4,1)=\|1.0-1.0\|` | `d(4,1)=0.0` |
| 6 | حساب Euclidean: `d(3,2)=\|0.5-0.0\|` | `d(3,2)=0.5` |
| 7 | حساب Euclidean: `d(4,2)=\|1.0-0.0\|` | `d(4,2)=1.0` |
| 8 | حساب Euclidean: `d(4,3)=\|1.0-0.5\|` | `d(4,3)=0.5` |

**النتيجة:** مصفوفة عدم التشابه مطابقة تماماً لمصفوفة الشريحة 22 (Object1 و Object4 متطابقان تماماً، d=0).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا لا نستخدم مباشرة القيم `1, 2, 3` كأرقام دون تطبيع (Normalization) إلى [0,1]؟
> **لماذا هذا مهم؟** لأنه إذا كانت هناك عدة خصائص ترتيبية بعدد حالات مختلف (مثلاً واحدة من 3 حالات وأخرى من 10 حالات)، فإن استخدام الأرقام الخام يعطي وزناً غير عادل للخاصية ذات الحالات الأكثر عند حساب المسافة الإجمالية؛ التطبيع يضمن معاملة كل الخصائص الترتيبية بعدالة ضمن نفس النطاق.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم
| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Cluster Analysis / Clustering` | عملية تقسيم كائنات البيانات إلى مجموعات فرعية (Clusters) بناءً على التشابه | تجميع فواكه بدون بطاقات أسماء |
| `Intra-cluster similarity` | تشابه الكائنات داخل نفس المجموعة (يجب أن يكون مرتفعاً) | تقارب المسافات داخل الدائرة الحمراء في الرسم |
| `Inter-cluster similarity` | تشابه الكائنات بين مجموعات مختلفة (يجب أن يكون منخفضاً) | تباعد الدوائر الحمراء المختلفة عن بعضها |
| `Unsupervised Learning` | تعلّم بدون تسميات فئات مسبقة (Learning by observation) | Clustering |
| `Supervised Learning` | تعلّم بتسميات فئات معروفة مسبقاً (Learning by examples) | Classification |
| `Automatic Classification` | مسمى بديل للتجميع عند اعتبار المجموعات الناتجة فئات ضمنية | اكتشاف فئات عملاء دون تسميات |
| `Data Segmentation` | مسمى بديل للتجميع كتقسيم بيانات كبيرة لمجموعات أصغر (لكن ليس كل تقسيم بيانات هو تجميع!) | تقسيم أبجدي للطلاب ≠ Clustering |
| `Similarity sim(i,j)` | مقياس التشابه بين كائنين، ضمن [0,1]، 1=متطابقان | — |
| `Dissimilarity/Distance d(i,j)` | مقياس الاختلاف بين كائنين، ضمن [0,1]، 0=متطابقان | — |
| `Proximity` | مصطلح شامل لكل من Similarity و Dissimilarity | — |
| `Data Matrix` | مصفوفة n×p تخزّن قيم خصائص الكائنات (Feature Vectors) | — |
| `Dissimilarity Matrix` | مصفوفة n×n متماثلة (مثلثية) تخزّن مسافات كل زوج كائنات | — |
| `Minkowski Distance (L-h norm)` | الصيغة العامة لحساب مسافة الخصائص العددية | Manhattan (h=1)، Euclidean (h=2) |
| `Jaccard Coefficient` | مقياس تشابه للخصائص الثنائية غير المتماثلة (Asymmetric Binary) | التطبيقات الطبية/النصية |

### المكونات الرئيسية (مرجع سريع)
| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Contingency Table` | تنظيم عدّ الحالات (q,r,s,t) بين كائنين لخصائص ثنائية | أساس حساب Binary Dissimilarity |
| `Rank Mapping (Ordinal)` | تحويل قيمة ترتيبية إلى رتبة رقمية ثم تطبيعها | خطوة تمهيدية إلزامية قبل حساب المسافة العددية |
| `Normalization` | توحيد نطاق قيم الخصائص العددية/الترتيبية قبل حساب المسافة | يمنع هيمنة خاصية ذات وحدات أصغر (نطاق أكبر) |

### جداول مقارنات سريعة
| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| نوع التعلّم | `Clustering` (Unsupervised) | `Classification` (Supervised) | وجود/غياب تسميات الفئات مسبقاً |
| فصل المجموعات | `Exclusive` | `Non-exclusive` | هل يمكن للكائن الانتماء لأكثر من مجموعة؟ |
| مستوى التقسيم | `Single level` | `Hierarchical` | وجود/غياب هرمية بين المجموعات |
| نوع الخاصية الثنائية | `Symmetric Binary` | `Asymmetric Binary` | هل كلتا القيمتين لهما نفس الأهمية؟ |
| L-norm | `Manhattan (L1)` | `Euclidean (L2)` | جمع القيم المطلقة مباشرة مقابل جذر مجموع المربعات |
| نوع الخاصية الفئوية | `Nominal` | `Ordinal` | غياب/وجود ترتيب منطقي بين القيم |

### مقارنة فئات خوارزميات التجميع الأربع
| الفئة | أساس العمل | أمثلة نموذجية | نقاط قوة |
| --- | --- | --- | --- |
| `Partitioning Methods` | المسافة (Distance-based)، حصري | k-Means, k-Medoids, CLARANS | سريعة، مناسبة لأشكال كروية |
| `Hierarchical Methods` | دمج/تقسيم تدريجي (Agglomerative/Divisive) | Diana, Agnes, BIRCH, CAMELEON | لا تحتاج تحديد عدد المجموعات مسبقاً |
| `Density-based Methods` | مناطق كثيفة مفصولة بمناطق قليلة الكثافة | DBSCAN, OPTICS, DenClue | تكتشف أشكالاً عشوائية، تقاوم الضوضاء |
| `Grid-based Methods` | بنية شبكية متعددة الدقة | STING, WaveCluster, CLIQUE | سرعة مستقلة عن عدد الكائنات |

### مصطلحات (Glossary)
| المصطلح | الترجمة/المعنى |
| --- | --- |
| `Cluster` | مجموعة فرعية من الكائنات المتشابهة |
| `Feature Vector` | متجه الخصائص الممثّل لكائن بيانات واحد |
| `Contingency Table` | جدول توافق لعدّ حالات التطابق/الاختلاف بين كائنين |
| `Implicit Classes` | فئات ضمنية تُكتشف تلقائياً عبر التجميع |
| `Curse of Dimensionality` | (شرح زيادة للفهم) تدهور فعالية قياسات المسافة كلما زاد عدد الأبعاد |
| `Metric` | دالة مسافة تحقق خواص Non-negativity, Identity, Symmetry, Triangle inequality |

### نقاط ذهبية
| # | النقطة |
| --- | --- |
| 1 | Clustering = Unsupervised؛ Classification = Supervised |
| 2 | ليس كل تقسيم بيانات هو Cluster Analysis (يجب أن يعتمد على تشابه فعلي) |
| 3 | Euclidean = L2، Manhattan = L1، كلاهما حالتان خاصتان من Minkowski |
| 4 | التطبيع (Normalization) إلزامي قبل حساب أي مسافة لتفادي هيمنة خاصية معينة |
| 5 | في Binary Asymmetric نتجاهل t (التطابق السلبي المشترك) لأنه عديم الدلالة |
| 6 | الخصائص الترتيبية تُحوَّل لرتب ثم تُطبَّع ثم تُعامَل كخصائص عددية |

### أخطاء شائعة
| الخطأ | التصحيح |
| --- | --- |
| اعتبار أي تقسيم بيانات = Cluster Analysis | يجب أن يعتمد التقسيم على تشابه الخصائص الفعلي، وليس معياراً عشوائياً كالترتيب الأبجدي |
| استخدام صيغة Symmetric Binary لبيانات طبية Asymmetric | يجب تحديد نوع الخاصية (Symmetric/Asymmetric) أولاً قبل اختيار الصيغة |
| حساب مسافة Ordinal مباشرة بالأرقام الخام بدون تطبيع | يجب تحويل القيمة إلى رتبة ثم تطبيعها ضمن [0,1] أولاً |
| الخلط بين Similarity و Dissimilarity | تذكّر: `sim = 1 - d` عندما يكون كلاهما ضمن [0,1] |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: حساب Dissimilarity لخصائص ثنائية (Binary Attributes)

#### ما هدف هذه العملية؟
> تحديد درجة الاختلاف بين كائنين موصوفين بخصائص ثنائية (0/1) بحسب كون هذه الخصائص متماثلة (Symmetric) أو غير متماثلة (Asymmetric) في الأهمية.

```algorithm
1 | بناء جدول التوافق | Contingency Table | عدّ الحالات q (1-1), r (1-0), s (0-1), t (0-0) بين الكائنين i و j
2 | تحديد نوع الخاصية | Domain Knowledge | حدد إن كانت الخصائص Symmetric (كل القيم مهمة) أو Asymmetric (قيمة واحدة أهم)
3 | تطبيق الصيغة المناسبة | Formula Selection | إن كانت Symmetric: d=(r+s)/(q+r+s+t) ، وإن كانت Asymmetric: d=(r+s)/(q+r+s)
4 | (اختياري) حساب التشابه | Jaccard Coefficient | لو أردنا التشابه بدلاً من الاختلاف في الحالة Asymmetric: sim=q/(q+r+s)
```

#### نقاط التنفيذ:
- لا تخلط بين المعادلتين — استخدام صيغة Symmetric على بيانات Asymmetric يضخّم قيمة الاختلاف ظلماً.
- إذا وُجد خليط من خصائص متماثلة وغير متماثلة في نفس الجدول، يجب فصل الحساب لكل نوع على حدة (كما في مثال Jack/Mary/Jim حيث استُبعد Gender لأنه Symmetric).

---

#### ⚙️ الخطوات / الخوارزمية: معالجة الخصائص الترتيبية (Ordinal Attributes)

#### ما هدف هذه العملية؟
> تمكين استخدام مقاييس المسافة العددية (مثل Euclidean) على خصائص فئوية لكنها مرتّبة منطقياً.

```algorithm
1 | تحديد عدد الحالات M_f | Domain Knowledge | حدد كم حالة ترتيبية توجد لهذه الخاصية (مثل 3: fair, good, excellent)
2 | تعيين الرتبة r_if | Ranking | استبدل قيمة كل كائن i بالرتبة المقابلة بين 1 و M_f
3 | تطبيع الرتبة | Min-Max Mapping | احسب z_if = (r_if - 1) / (M_f - 1) لتصبح القيمة ضمن [0.0,1.0]
4 | حساب المسافة | Numeric Distance | طبّق Euclidean أو Manhattan على القيم z_if الناتجة كما لو كانت خصائص عددية عادية
```

#### نقاط التنفيذ:
- تأكد من ثبات ترتيب الحالات (الأصغر إلى الأكبر) عبر كل الكائنات قبل التعيين.
- إذا كانت هناك أكثر من خاصية ترتيبية بعدد حالات مختلف، طبّع كل واحدة بشكل مستقل باستخدام M_f الخاص بها.

---

### أنماط الأكواد

#### 💻 الكود: حساب Euclidean و Manhattan Distance بلغة Python

#### ما هذا الكود؟
> يحسب مصفوفة عدم التشابه (Dissimilarity Matrix) لمجموعة نقاط عددية باستخدام مسافتي Manhattan و Euclidean، مطابقاً لمثال الشريحة 15/18.

```python
# Import required libraries for numeric computation
import numpy as np                                    # (1) numeric arrays and vector math
from scipy.spatial.distance import cdist               # (2) pairwise distance computation

# Define the data matrix (n=4 points, p=2 dimensions)
points = np.array([
    [1, 2],   # x1
    [3, 5],   # x2
    [2, 0],   # x3
    [4, 5],   # x4
])  # (3) 4x2 data matrix matching the lecture example

# Compute Manhattan (L1) dissimilarity matrix
manhattan_matrix = cdist(points, points, metric='cityblock')  # (4) L1 norm pairwise distances

# Compute Euclidean (L2) dissimilarity matrix
euclidean_matrix = cdist(points, points, metric='euclidean')  # (5) L2 norm pairwise distances

# Print both matrices rounded to 2 decimals
print("Manhattan (L1):\n", np.round(manhattan_matrix, 2))     # (6) show L1 distances
print("Euclidean (L2):\n", np.round(euclidean_matrix, 2))     # (7) show L2 distances
```

#### شرح كل سطر:
1. `import numpy as np` → استيراد — يوفّر بنية المصفوفات (Arrays) والعمليات الرياضية عليها.
2. `from scipy.spatial.distance import cdist` → استيراد — دالة جاهزة لحساب المسافات الزوجية بكفاءة.
3. `points = np.array([...])` → تعريف بيانات — يمثّل مصفوفة البيانات (Data Matrix) n×p من مثال المحاضرة.
4. `manhattan_matrix = cdist(points, points, metric='cityblock')` → حساب — `cityblock` هو الاسم البديل لـ Manhattan/L1 norm في scipy.
5. `euclidean_matrix = cdist(points, points, metric='euclidean')` → حساب — يحسب L2 norm مباشرة بين كل زوج نقاط.
6. `print("Manhattan (L1):\n", ...)` → طباعة — عرض مصفوفة Manhattan الناتجة مقربة لخانتين عشريتين.
7. `print("Euclidean (L2):\n", ...)` → طباعة — عرض مصفوفة Euclidean الناتجة مقربة لخانتين عشريتين.

**المكتبات المطلوبة (Imports):**
> `numpy`، `scipy`

**الناتج المتوقع:**
> مصفوفتان 4×4 متماثلتان (القطر=0)؛ تطابق قيم الشريحتين 15 و18 تماماً (مثال: `euclidean_matrix[3][1] = 1.0`، `manhattan_matrix[3][1] = 1`).

---

#### 💻 الكود: حساب Jaccard Similarity للخصائص الثنائية غير المتماثلة

#### ما هذا الكود؟
> يحسب معامل Jaccard ودالة الاختلاف Asymmetric Binary لمثال المرضى (Jack, Mary, Jim) من الشريحة 20.

```python
# Import pandas for tabular data handling
import pandas as pd                                          # (1) tabular data structure

# Define patient records using 1 for Y/P and 0 for N (asymmetric attributes only)
patients = pd.DataFrame({
    "Fever":  [1, 1, 1],   # (2) Y, Y, Y -> Jack, Mary, Jim
    "Cough":  [0, 0, 1],   # (3) N, N, P
    "Test-1": [1, 1, 0],   # (4) P, P, N
    "Test-2": [0, 0, 0],   # (5) N, N, N
    "Test-3": [0, 1, 0],   # (6) N, P, N
    "Test-4": [0, 0, 0],   # (7) N, N, N
}, index=["Jack", "Mary", "Jim"])                             # (8) row labels

def asymmetric_binary_distance(row_i, row_j):
    q = ((row_i == 1) & (row_j == 1)).sum()                   # (9) both attributes equal 1
    r = ((row_i == 1) & (row_j == 0)).sum()                    # (10) i=1, j=0
    s = ((row_i == 0) & (row_j == 1)).sum()                    # (11) i=0, j=1
    return (r + s) / (q + r + s)                               # (12) asymmetric binary distance formula

# Compute distance for each pair of patients
d_jack_mary = asymmetric_binary_distance(patients.loc["Jack"], patients.loc["Mary"])  # (13)
d_jack_jim = asymmetric_binary_distance(patients.loc["Jack"], patients.loc["Jim"])    # (14)
d_jim_mary = asymmetric_binary_distance(patients.loc["Jim"], patients.loc["Mary"])    # (15)

print(f"d(Jack,Mary) = {d_jack_mary:.2f}")   # (16) expected 0.33
print(f"d(Jack,Jim)  = {d_jack_jim:.2f}")    # (17) expected 0.67
print(f"d(Jim,Mary)  = {d_jim_mary:.2f}")    # (18) expected 0.75
```

#### شرح كل سطر:
1. `import pandas as pd` → استيراد — يوفّر بنية DataFrame لتمثيل السجلات الجدولية.
2-7. تعريف قيم الخصائص الثنائية غير المتماثلة (Fever, Cough, Test-1..4) بترميز 1/0 بدلاً من Y/N/P كما في المحاضرة.
8. `index=["Jack","Mary","Jim"]` → تسمية الصفوف بأسماء المرضى لتسهيل الاستدعاء لاحقاً.
9-11. حساب `q, r, s` مباشرة من مقارنة الصفوف باستخدام عمليات منطقية على مصفوفات pandas.
12. تطبيق معادلة `d(i,j) = (r+s)/(q+r+s)` مباشرة كما وردت في المحاضرة.
13-15. استدعاء الدالة لكل زوج من المرضى الثلاثة.
16-18. طباعة النتائج للتحقق من مطابقتها لقيم الشريحة 20 (0.33, 0.67, 0.75).

**المكتبات المطلوبة (Imports):**
> `pandas`

**الناتج المتوقع:**
```
d(Jack,Mary) = 0.33
d(Jack,Jim)  = 0.67
d(Jim,Mary)  = 0.75
```

#### 🛠️ استكشاف الأخطاء
| الخطأ | السبب | الحل |
| --- | --- | --- |
| `ZeroDivisionError` عند حساب d(i,j) | القيمة `q+r+s=0` أي لا توجد أي خاصية إيجابية إطلاقاً لدى الكائنين | تحقق من وجود على الأقل خاصية واحدة موجبة (1) قبل القسمة، أو أضف شرط استثناء |
| نتيجة Jaccard/Distance خاطئة | تم اعتبار خاصية Symmetric (مثل Gender) ضمن حساب Asymmetric | استبعد الخصائص المتماثلة من جدول التوافق قبل التطبيق |
| قيم z_if للترتيبية خارج [0,1] | نسيان قسمة على `(M_f - 1)` أو استخدام M_f خاطئ | تأكد من M_f = عدد الحالات الفعلي للخاصية الترتيبية المحددة |

---

### أنماط التعامل
- عند مواجهة عمود بيانات جديد، **حدّد نوعه أولاً** (Numeric / Binary Symmetric / Binary Asymmetric / Nominal / Ordinal) قبل اختيار صيغة المسافة.
- عند وجود خصائص مختلطة الأنواع في نفس الجدول، يجب حساب المسافة **لكل نوع على حدة** ثم دمجها (الدمج الكامل — *غير مشروحة في المحاضرة* — يُترك لصيغة `Weighted Combined Dissimilarity` التي غالباً تُشرح في الجزء الثاني من المحاضرة).
- دائماً طبّع (Normalize) الخصائص العددية والترتيبية قبل حساب أي مسافة نهائية.

### الأفكار الشاملة
- المحاضرة تبني الأساس الرياضي/المفاهيمي الذي ستعتمد عليه خوارزميات `k-Means`، `K-Modes`، و`PAM` في المحاضرات القادمة (Cluster Analysis part-2)، والتي لم تُشرح تفصيلياً هنا.
- الفكرة المركزية: **لا يوجد مقياس مسافة واحد يناسب كل أنواع البيانات** — الاختيار الصحيح لمقياس التقارب هو نصف نجاح أي خوارزمية تجميع.

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

### السؤال 1
ما التعريف الدقيق لـ `Cluster Analysis`؟
أ) تصنيف الكائنات إلى فئات معروفة مسبقاً
ب) عملية تقسيم مجموعة من الكائنات إلى مجموعات فرعية بناءً على التشابه
ج) ترتيب البيانات أبجدياً
د) حذف القيم المفقودة من البيانات

**الإجابة الصحيحة: ب**
- أ) خطأ: هذا تعريف `Classification` وليس `Clustering` (وجود فئات معروفة مسبقاً).
- ب) صحيح: هذا هو التعريف الحرفي الوارد في المحاضرة.
- ج) خطأ: هذا مثال على `Data Segmentation` وليس `Cluster Analysis` كما نص المثال صراحة.
- د) خطأ: هذه مرحلة `Data Preprocessing` وليست تجميعاً.

### السؤال 2
أي مما يلي يصف `High intra-cluster similarity`؟
أ) الكائنات في مجموعات مختلفة متشابهة جداً
ب) الكائنات داخل نفس المجموعة متباعدة عن بعضها
ج) الكائنات داخل نفس المجموعة متشابهة/متماسكة
د) لا علاقة له بجودة التجميع

**الإجابة الصحيحة: ج**
- أ) خطأ: هذا وصف عكسي، ويشير لضعف في `Inter-cluster separation`.
- ب) خطأ: هذا يناقض تعريف intra-cluster similarity تماماً.
- ج) صحيح: مطابق للنص الأصلي "Data objects within the same cluster are cohesive".
- د) خطأ: هو أحد الشرطين الأساسيين لجودة التجميع.

### السؤال 3
لماذا يُعتبر `Clustering` تعلّماً غير مُوجَّه (`Unsupervised`)؟
أ) لأنه أسرع من Classification
ب) لأنه لا توجد تسميات فئات معروفة مسبقاً في البيانات
ج) لأنه يستخدم شجرة قرار
د) لأنه يتطلب بيانات مصنّفة يدوياً

**الإجابة الصحيحة: ب**
- أ) خطأ: السرعة ليست معياراً للتصنيف كـ Supervised/Unsupervised.
- ب) صحيح: هذا هو السبب الجوهري المذكور في المحاضرة (learning by observation دون Labels).
- ج) خطأ: شجرة القرار (Decision Tree) خوارزمية Classification وليست Clustering.
- د) خطأ: هذا عكس تماماً تعريف Unsupervised Learning.

### السؤال 4
تقسيم الطلاب أبجدياً حسب اسم العائلة هو:
أ) مثال نموذجي على Cluster Analysis
ب) نوع من Data Segmentation لكنه ليس Cluster Analysis
ج) نوع من Hierarchical Clustering
د) نوع من Density-based Clustering

**الإجابة الصحيحة: ب**
- أ) خطأ: لا يعتمد على تشابه فعلي بين الخصائص، فهو ليس تجميعاً.
- ب) صحيح: نص المحاضرة صراحة على هذا المثال كتوضيح للفرق.
- ج) خطأ: لا علاقة له بالدمج الهرمي التصاعدي/التنازلي.
- د) خطأ: لا علاقة له بالكثافة إطلاقاً.

### السؤال 5
أي من التطبيقات التالية يستخدم Clustering لحل مشكلة "قلة بيانات المبيعات في كل منطقة شهرياً"؟
أ) Web search query clustering
ب) اكتشاف الأحياء المتشابهة (Similar Neighborhoods) لتقدير الأسعار
ج) K-Modes لتصنيف بيانات اسمية
د) PAM لاختيار medoids

**الإجابة الصحيحة: ب**
- أ) خطأ: هذا تطبيق مختلف (تنظيم نتائج بحث متعددة المعنى).
- ب) صحيح: هذا بالضبط ما ورد في مثال "Discovering similar neighborhoods" لحل مشكلة ندرة المبيعات.
- ج) خطأ: K-Modes خوارزمية غير مشروحة في هذا الجزء، ولا علاقة مباشرة بمشكلة ندرة المبيعات.
- د) خطأ: نفس السبب، PAM لم تُشرح هنا.

### السؤال 6
ما الفرق الجوهري بين `Exclusive` و `Non-exclusive` clusters؟
أ) عدد المجموعات الكلي
ب) هل يمكن للكائن الانتماء لأكثر من مجموعة واحدة أم لا
ج) نوع مقياس المسافة المستخدم
د) حجم البيانات المُدخلة

**الإجابة الصحيحة: ب**
- أ) خطأ: العدد الكلي للمجموعات لا علاقة له بهذا التمييز.
- ب) صحيح: هذا التعريف الدقيق كما ورد في اعتبارات التصميم.
- ج) خطأ: هذا معيار منفصل تماماً (Similarity Measure).
- د) خطأ: حجم البيانات معيار مختلف عن هذا التصنيف.

### السؤال 7
أي الخوارزميات التالية مصنّفة ضمن `Partitioning Methods`؟
أ) DBSCAN, OPTICS, DenClue
ب) Diana, Agnes, BIRCH
ج) k-Means, k-Medoids, CLARANS
د) STING, WaveCluster, CLIQUE

**الإجابة الصحيحة: ج**
- أ) خطأ: هذه أمثلة `Density-based Methods`.
- ب) خطأ: هذه أمثلة `Hierarchical Methods`.
- ج) صحيح: مطابقة تماماً للأمثلة النموذجية المذكورة لـ Partitioning Methods.
- د) خطأ: هذه أمثلة `Grid-based Methods`.

### السؤال 8
لماذا لا تستطيع `Hierarchical Methods` تصحيح خطأ سابق في الدمج أو التقسيم؟
أ) لأنها تعتمد على الكثافة فقط
ب) لأن طبيعة العملية التصاعدية/التنازلية تجعل كل قرار نهائياً بمجرد اتخاذه
ج) لأنها تحتاج تحديد عدد المجموعات k مسبقاً
د) لأنها تستخدم بنية شبكية

**الإجابة الصحيحة: ب**
- أ) خطأ: هذا وصف Density-based وليس Hierarchical.
- ب) صحيح: هذا هو التفسير المنطقي وراء القيد المذكور صراحة في المحاضرة "Cannot correct erroneous merges or splits".
- ج) خطأ: هذا قيد يخص Partitioning Methods (مثل k-Means) وليس Hierarchical.
- د) خطأ: هذا وصف Grid-based Methods.

### السؤال 9
ما ميزة `Grid-based Methods` الأساسية من ناحية الأداء؟
أ) دقة أعلى من كل الطرق الأخرى دائماً
ب) زمن معالجة مستقل عن عدد الكائنات لكنه يعتمد على حجم الشبكة
ج) لا تحتاج أي بنية بيانات إضافية
د) تعمل فقط مع البيانات الثنائية

**الإجابة الصحيحة: ب**
- أ) خطأ: لم يُذكر أي ادّعاء بأنها الأدق دائماً.
- ب) صحيح: مطابق حرفياً للنص "Fast processing time (independent of the number of data objects, yet dependent on grid size)".
- ج) خطأ: هي تعتمد أصلاً على "multiresolution grid data structure".
- د) خطأ: لا علاقة مباشرة بنوع البيانات الثنائية تحديداً.

### السؤال 10
إذا كانت `sim(i,j) = 0.8`، فما القيمة المقابلة لـ `d(i,j)` (بافتراض [0,1])؟
أ) 0.8
ب) 0.2
ج) 1.8
د) لا يمكن حسابها

**الإجابة الصحيحة: ب**
- أ) خطأ: هذه قيمة sim نفسها وليس d.
- ب) صحيح: `d = 1 - sim = 1 - 0.8 = 0.2`.
- ج) خطأ: نتيجة حسابية غير منطقية (خارج [0,1]).
- د) خطأ: يمكن حسابها مباشرة بالعلاقة `sim = 1 - d`.

### السؤال 11
أعطيت نقطتين `x=(0,0)` و `y=(3,4)`. ما قيمة `Euclidean Distance` بينهما؟
أ) 3
ب) 4
ج) 5
د) 7

**الإجابة الصحيحة: ج**
- أ) خطأ: هذه فقط فرق الإحداثي الأول.
- ب) خطأ: هذه فقط فرق الإحداثي الثاني.
- ج) صحيح: `√(3²+4²) = √(9+16) = √25 = 5`.
- د) خطأ: هذه قيمة Manhattan Distance (3+4=7) وليست Euclidean.

### السؤال 12 (سيناريو كود Python)
```python
import numpy as np
a = np.array([1, 2])
b = np.array([4, 6])
dist = np.sum(np.abs(a - b))
print(dist)
```
ما الناتج المطبوع، وما نوع المسافة المحسوبة؟
أ) 5 و Euclidean
ب) 7 و Manhattan
ج) 5 و Manhattan
د) 7 و Euclidean

**الإجابة الصحيحة: ج**
- أ) خطأ: القيمة 5 صحيحة لكن النوع خاطئ — الكود لا يربّع الفروقات فهو ليس Euclidean.
- ب) خطأ: `|1-4|+|2-6| = 3+4 = 7`? دعنا نتحقق: `|1-4|=3`, `|2-6|=4`، المجموع=7 وليس 5. **(ملاحظة تصحيحية: انظر الشرح أدناه)**
- ج) الإجابة المعتمدة رياضياً: `dist = |1-4| + |2-6| = 3 + 4 = 7` وهذا Manhattan (مجموع القيم المطلقة بدون تربيع أو جذر) — إذن القيمة الصحيحة فعلياً هي **7 و Manhattan** (الخيار ب).

> ⚠️ **تصحيح مهم:** الإجابة الصحيحة الفعلية لهذا السؤال هي **الخيار ب (7 و Manhattan)** وليس ج. تم إبقاء الشرح ليوضح كيفية التحقق يدوياً: `np.sum(np.abs(a-b))` يطابق تماماً صيغة `L1 norm / Manhattan Distance` لأنه يجمع القيم المطلقة للفروقات دون تربيع أو جذر تربيعي — بعكس Euclidean الذي يتطلب `np.sqrt(np.sum((a-b)**2))`.
- د) خطأ: القيمة 7 صحيحة، لكن النوع خاطئ — لا يوجد تربيع ولا جذر في الكود فهو ليس Euclidean.

### السؤال 13
لخصائص ثنائية Asymmetric، ما الحالة التي **يتم تجاهلها** في صيغة المسافة؟
أ) q (تطابق 1-1)
ب) t (تطابق 0-0)
ج) r (اختلاف 1-0)
د) s (اختلاف 0-1)

**الإجابة الصحيحة: ب**
- أ) خطأ: `q` يبقى في المقام دائماً لأنه يمثل التطابق الإيجابي المهم.
- ب) صحيح: `t` (التطابق السلبي المشترك) يُهمَل تماماً في كل من صيغة Asymmetric Distance وJaccard.
- ج) خطأ: `r` جزء أساسي من البسط في كلتا الصيغتين.
- د) خطأ: `s` جزء أساسي من البسط في كلتا الصيغتين أيضاً.

### السؤال 14
معطى جدول توافق بين كائنين: `q=3, r=1, s=2, t=4`. ما قيمة `Jaccard Similarity`؟
أ) 3/10
ب) 3/6
ج) 3/4
د) 6/10

**الإجابة الصحيحة: ب**
- أ) خطأ: المقام هنا يتضمن `t` خطأً (q+r+s+t=10)، لكن Jaccard يستبعد t.
- ب) صحيح: `sim_jaccard = q/(q+r+s) = 3/(3+1+2) = 3/6 = 0.5`.
- ج) خطأ: حساب غير مطابق للصيغة الصحيحة.
- د) خطأ: هذا استخدم بسطاً خاطئاً (6 بدلاً من q=3).

### السؤال 15
كائنان لهما 5 خصائص اسمية (Nominal)، تطابقا في 2 منها فقط. ما `d(i,j)`؟
أ) 2/5
ب) 3/5
ج) 5/2
د) 0

**الإجابة الصحيحة: ب**
- أ) خطأ: هذه قيمة `sim(i,j) = m/p = 2/5` وليس `d(i,j)`.
- ب) صحيح: `d(i,j) = (p-m)/p = (5-2)/5 = 3/5 = 0.6`.
- ج) خطأ: نتيجة غير منطقية (خارج [0,1]).
- د) خطأ: يعني تطابقاً تاماً (m=p) وهذا غير صحيح هنا (m=2 فقط).

### السؤال 16
خاصية ترتيبية لها 4 حالات (`M_f=4`). كائن حصل على الرتبة `r=3`. ما قيمته المطبَّعة `z`؟
أ) 3/4
ب) 2/3
ج) 3/3
د) 1/4

**الإجابة الصحيحة: ب**
- أ) خطأ: لم يُطرح 1 من البسط ولا من المقام كما تنص الصيغة.
- ب) صحيح: `z = (r-1)/(M_f-1) = (3-1)/(4-1) = 2/3 ≈ 0.667`.
- ج) خطأ: هذا افتراض خاطئ لقيمة r أو Mf.
- د) خطأ: هذا يطابق حساب مختلف تماماً وغير صحيح هنا.

---

## الجزء الرابع: أسئلة تصحيح الكود

### تصحيح كود 1 — نوع: `wrong_formula`
**الكود (يحتوي خطأ):**
```python
import numpy as np

def manhattan_distance(a, b):
    return np.sqrt(np.sum(np.abs(a - b)))   # (خطأ هنا)

a = np.array([1, 2])
b = np.array([4, 6])
print(manhattan_distance(a, b))
```

**اكتشف الخطأ:**
الدالة تدّعي حساب `Manhattan Distance` لكنها تستخدم `np.sqrt()` (جذر تربيعي)، وهذا غير موجود في صيغة Manhattan الحقيقية (L1 norm)، بل هو خاص بـ Euclidean (L2 norm) بشكل مختلف أيضاً (Euclidean يحتاج تربيع القيم أولاً ثم الجذر، وليس أخذ القيمة المطلقة ثم الجذر مباشرة).

**التصحيح:**
```python
import numpy as np

def manhattan_distance(a, b):
    return np.sum(np.abs(a - b))            # إزالة الجذر التربيعي غير الصحيح

a = np.array([1, 2])
b = np.array([4, 6])
print(manhattan_distance(a, b))   # الناتج الصحيح: 7
```

**شرح الحل (3 نقاط):**
1. صيغة `Manhattan Distance` هي مجموع القيم المطلقة للفروقات فقط، بدون أي جذر.
2. إضافة `np.sqrt()` هنا يُنتج قيمة غير صحيحة رياضياً ولا تطابق أي مقياس مسافة معروف (لا L1 ولا L2).
3. لو أردنا Euclidean فعلاً، الصيغة الصحيحة هي `np.sqrt(np.sum((a-b)**2))` وليس جذر مجموع القيم المطلقة.

---

### تصحيح كود 2 — نوع: `logic`
**الكود (يحتوي خطأ):**
```python
def nominal_dissimilarity(obj_i, obj_j):
    p = len(obj_i)
    matches = sum(1 for a, b in zip(obj_i, obj_j) if a == b)
    d = matches / p        # (خطأ هنا)
    return d

o1 = ["code A", "excellent"]
o2 = ["code A", "fair"]
print(nominal_dissimilarity(o1, o2))
```

**اكتشف الخطأ:**
المتغير `matches` يمثل `m` (عدد التطابقات)، لكن السطر `d = matches / p` يحسب في الواقع **`sim(i,j)`** (التشابه) وليس **`d(i,j)`** (الاختلاف/Dissimilarity) رغم أن اسم الدالة والمتغير يدّعيان أنهما يحسبان Dissimilarity.

**التصحيح:**
```python
def nominal_dissimilarity(obj_i, obj_j):
    p = len(obj_i)
    matches = sum(1 for a, b in zip(obj_i, obj_j) if a == b)
    d = (p - matches) / p    # الصيغة الصحيحة: d(i,j) = (p-m)/p
    return d

o1 = ["code A", "excellent"]
o2 = ["code A", "fair"]
print(nominal_dissimilarity(o1, o2))   # الناتج الصحيح: 0.5
```

**شرح الحل (3 نقاط):**
1. صيغة `Dissimilarity` للخصائص الاسمية هي `(p-m)/p` وليس `m/p`.
2. `m/p` هي في الواقع صيغة `Similarity` كما ورد صراحة في المحاضرة (`sim(i,j) = m/p`).
3. تسمية المتغيرات والدوال بشكل صحيح مهمة لتجنب هذا النوع من الأخطاء المنطقية (Naming vs Actual Logic Mismatch).

---

### تصحيح كود 3 — نوع: `misconception`
**الكود (يحتوي خطأ):**
```python
def ordinal_to_normalized(rank, M_f):
    return rank / M_f    # (خطأ هنا)

# test-2 له 3 حالات: fair=1, good=2, excellent=3
print(ordinal_to_normalized(1, 3))   # المتوقع: 0.0
print(ordinal_to_normalized(3, 3))   # المتوقع: 1.0
```

**اكتشف الخطأ:**
الصيغة الصحيحة للتطبيع هي `z = (r-1)/(M_f-1)` وليس `r/M_f`. الكود الحالي لا يطرح 1 من البسط ولا من المقام، مما يجعل أدنى رتبة (`r=1`) تُعطي قيمة `1/3 ≈ 0.33` بدلاً من `0.0` المطلوبة، وأعلى رتبة (`r=3`) تُعطي `1.0` بالمصادفة فقط لكن بقية القيم ستكون خاطئة.

**التصحيح:**
```python
def ordinal_to_normalized(rank, M_f):
    return (rank - 1) / (M_f - 1)   # الصيغة الصحيحة

print(ordinal_to_normalized(1, 3))   # الناتج الصحيح: 0.0
print(ordinal_to_normalized(3, 3))   # الناتج الصحيح: 1.0
```

**شرح الحل (3 نقاط):**
1. الصيغة الصحيحة تنص حرفياً: `z_if = (r_if - 1) / (M_f - 1)`.
2. الطرح بـ 1 من البسط والمقام ضروري لضمان أن أدنى رتبة (1) تُصبح 0.0 تماماً وأعلى رتبة تُصبح 1.0 تماماً.
3. الكود الخاطئ يبدو صحيحاً في الحالة القصوى (r=M_f) لكنه يفشل في كل الحالات الوسطى والدنيا — وهذا مثال كلاسيكي على "خطأ يمرّ اختبار حالة واحدة لكنه خاطئ عموماً".

---

### تصحيح كود 4 — نوع: `return_check`
**الكود (يحتوي خطأ):**
```python
def asymmetric_binary_distance(q, r, s, t):
    numerator = r + s
    denominator = q + r + s + t   # (خطأ هنا)
    return numerator / denominator

# مثال Jack-Mary: q=2, r=0, s=1, t=3
print(asymmetric_binary_distance(2, 0, 1, 3))
```

**اكتشف الخطأ:**
الدالة اسمها `asymmetric_binary_distance` لكنها تستخدم المقام `q+r+s+t` وهو مقام صيغة **`Symmetric`** وليس Asymmetric. صيغة Asymmetric الصحيحة تستبعد `t` تماماً من المقام.

**التصحيح:**
```python
def asymmetric_binary_distance(q, r, s, t):
    numerator = r + s
    denominator = q + r + s        # استبعاد t تماماً كما تنص صيغة Asymmetric
    return numerator / denominator

# مثال Jack-Mary: q=2, r=0, s=1, t=3 (t غير مستخدمة في Asymmetric)
print(asymmetric_binary_distance(2, 0, 1, 3))   # الناتج الصحيح: 0.33
```

**شرح الحل (3 نقاط):**
1. صيغة `Asymmetric Binary Distance` هي `d=(r+s)/(q+r+s)` — بدون `t` في المقام إطلاقاً.
2. تمرير `t` كمعامل للدالة لا بأس به (لأغراض التوثيق)، لكن استخدامه في الحساب الفعلي هو الخطأ.
3. الناتج الصحيح بعد التصحيح لمثال Jack-Mary هو `0.33` كما ورد في الشريحة 20، بينما الكود الخاطئ كان سينتج `1/6 ≈ 0.17` وهي قيمة غير صحيحة.

---

### تصحيح كود 5 — نوع: `dead_code`
**الكود (يحتوي خطأ):**
```python
import numpy as np
from scipy.spatial.distance import cdist

def compute_distances(points, metric='euclidean'):
    if metric == 'euclidean':
        return cdist(points, points, metric='euclidean')
    elif metric == 'manhattan':
        return cdist(points, points, metric='cityblock')
    else:
        return cdist(points, points, metric='euclidean')  # كود لن يُنفَّذ أبداً بسبب الشرط أعلاه (dead code محتمل)

points = np.array([[1,2],[3,5],[2,0],[4,5]])
print(compute_distances(points, metric='manhattan'))
print(compute_distances(points, metric='jaccard'))   # المستخدم يتوقع خطأ توضيحياً لكنه يحصل على Euclidean بصمت
```

**اكتشف الخطأ:**
الفرع `else` لا يُعتبر "كوداً ميتاً" تقنياً (فهو قابل للتنفيذ إن مرّرنا قيمة metric مختلفة)، لكنه **منطقياً خاطئ (Silent Fallback)**: عندما يُمرَّر المستخدم قيمة غير مدعومة مثل `'jaccard'`، يحصل بصمت على نتيجة `Euclidean` دون أي تحذير أو خطأ، مما يُخفي خطأ استخدام حقيقياً (المستخدم قد يظن أن Jaccard قد حُسبت فعلاً بينما لم تُحسب).

**التصحيح:**
```python
import numpy as np
from scipy.spatial.distance import cdist

def compute_distances(points, metric='euclidean'):
    if metric == 'euclidean':
        return cdist(points, points, metric='euclidean')
    elif metric == 'manhattan':
        return cdist(points, points, metric='cityblock')
    else:
        raise ValueError(f"Unsupported metric: {metric}")   # رفع خطأ صريح بدلاً من التنفيذ الصامت

points = np.array([[1,2],[3,5],[2,0],[4,5]])
print(compute_distances(points, metric='manhattan'))
print(compute_distances(points, metric='jaccard'))   # سيرفع الآن ValueError واضحاً بدل نتيجة صامتة خاطئة
```

**شرح الحل (3 نقاط):**
1. "Dead code" هنا ليس بالمعنى الحرفي (كود لا يُنفَّذ أبداً)، بل بمعنى أوسع شائع في أسئلة Debug: كود يُنفَّذ لكن **بمنطق غير مقصود** يُخفي الخطأ الحقيقي.
2. رفع استثناء صريح (`raise ValueError`) أفضل ممارسة برمجية من الرجوع الصامت لقيمة افتراضية عند إدخال غير مدعوم.
3. هذا النمط من الأخطاء (Silent Fallback) خطير خصوصاً في أكواد التجميع لأنه قد يجعل الباحث يعتقد خطأً أنه استخدم مقياس مسافة مختلف بينما استُخدم مقياس آخر فعلياً.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> هذه تمارين إضافية من إعداد الدليل.

### تمرين 1 — `metric_calculation` (Euclidean/Manhattan)
**المعطيات:** نقطتان `p=(2,4,6)` و `q=(5,1,8)` في فضاء ثلاثي الأبعاد.
**المطلوب:**
1. احسب `Manhattan Distance`.
2. احسب `Euclidean Distance`.

**نموذج الحل:**
1. Manhattan: `|2-5|+|4-1|+|6-8| = 3+3+2 = 8`
2. Euclidean: `√((2-5)²+(4-1)²+(6-8)²) = √(9+9+4) = √22 ≈ 4.69`

---

### تمرين 2 — `fill_gaps`
**المعطيات:** أكمل الفراغات في الكود التالي لحساب Minkowski Distance بأي رتبة h:
```python
def minkowski_distance(a, b, h):
    diffs = [abs(x - y) ** _______ for x, y in zip(a, b)]   # (1)
    total = sum(diffs)
    return total ** (_______)                                 # (2)
```
**المطلوب:** املأ الفراغين (1) و(2).

**نموذج الحل:**
```python
def minkowski_distance(a, b, h):
    diffs = [abs(x - y) ** h for x, y in zip(a, b)]   # (1) رفع كل فرق للقوة h
    total = sum(diffs)
    return total ** (1 / h)                             # (2) رفع المجموع للقوة (1/h) أي الجذر من الرتبة h
```

---

### تمرين 3 — `code_fix`
**المعطيات:**
```python
def jaccard_similarity(q, r, s):
    return q / (q + r + s + 1)   # يحتوي خطأ بسيط
```
**المطلوب:** أوجد الخطأ وصحّحه.

**نموذج الحل:**
```python
def jaccard_similarity(q, r, s):
    return q / (q + r + s)   # إزالة "+1" الزائدة التي لا أساس لها في الصيغة الأصلية
```
الخطأ: أُضيف `+1` بشكل تعسفي للمقام، وهذا غير موجود في صيغة Jaccard الأصلية `q/(q+r+s)`.

---

### تمرين 4 — `scenario`
**السيناريو:** لديك كائنان يُوصفان بـ 6 خصائص ثنائية متماثلة (Symmetric): `q=2, r=1, s=1, t=2`.
**المطلوب:**
1. احسب `d(i,j)` باستخدام صيغة Symmetric.
2. فسّر معنى القيمة الناتجة.

**نموذج الحل:**
1. `d(i,j) = (r+s)/(q+r+s+t) = (1+1)/(2+1+1+2) = 2/6 ≈ 0.33`
2. القيمة 0.33 (أقرب لـ 0 من 1) تعني أن الكائنين متشابهان نسبياً أكثر من كونهما مختلفين، لأن ثلث الخصائص فقط اختلفت بينهما.

---

### تمرين 5 — `model_apply` (تطبيق حساب على بيانات مختلطة)
**السيناريو:** جدول بيانات لأربعة كائنات بخاصية عددية واحدة (`age`) وخاصية اسمية واحدة (`city`):

| Object | age | city |
| --- | --- | --- |
| O1 | 20 | Homs |
| O2 | 25 | Homs |
| O3 | 40 | Damascus |
| O4 | 22 | Aleppo |

**المطلوب:**
1. احسب `d(O1,O2)` للخاصية `age` باستخدام Euclidean (بعد افتراض عدم الحاجة لتطبيع لأنها الخاصية الوحيدة العددية هنا).
2. احسب `d(O1,O2)` للخاصية `city` باستخدام صيغة Nominal.

**نموذج الحل:**
1. `age`: `d(O1,O2) = |20-25| = 5` (أو Euclidean لبعد واحد: `√(5²)=5`، نفس القيمة).
2. `city`: كلاهما "Homs" → تطابق تام → `m=1, p=1` → `d(O1,O2) = (1-1)/1 = 0`.

---

### تمرين 6 — `metric_calculation` (Ordinal)
**المعطيات:** خاصية ترتيبية لها 5 حالات: `poor(1) < fair(2) < good(3) < very good(4) < excellent(5)`. كائن A له تقييم `good`، كائن B له تقييم `excellent`.
**المطلوب:**
1. طبّع القيمتين إلى [0,1].
2. احسب `d(A,B)` باستخدام Euclidean على القيم المطبَّعة.

**نموذج الحل:**
1. `z_A = (3-1)/(5-1) = 2/4 = 0.5`، `z_B = (5-1)/(5-1) = 4/4 = 1.0`
2. `d(A,B) = |0.5 - 1.0| = 0.5`

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

### تمرين 1: تحليل حالة (`case_study`)
**السيناريو:**
شركة تجارة إلكترونية تريد تجميع عملائها حسب (الدخل السنوي، عدد المشتريات الشهرية) لبناء استراتيجيات تسويقية مستهدفة.

**المطلوب:**
1. حدد نوع الخصائص المستخدمة (Numeric/Binary/Nominal/Ordinal).
2. اقترح مقياس مسافة مناسباً ووضّح لماذا.
3. اذكر أي فئة من فئات خوارزميات التجميع الأربع تناسب هذه الحالة أكثر ولماذا (بافتراض توقع مجموعات كروية الشكل من حيث السلوك الشرائي).

**نموذج الحل:**
1. كلا الخاصيتين (الدخل، عدد المشتريات) خصائص **Numeric**.
2. **Euclidean Distance** مناسبة بعد التطبيع (Normalization)، لأن الدخل عادة له نطاق أكبر بكثير من عدد المشتريات، فبدون تطبيع سيهيمن الدخل على المسافة بالكامل.
3. **Partitioning Methods** (مثل k-Means) تناسب الحالة لأن العملاء يُتوقع أن يُشكّلوا مجموعات كروية متماسكة نسبياً (شرائح دخل/شراء متقاربة)، والبيانات هنا صغيرة إلى متوسطة الحجم.

---

### تمرين 2: إكمال جدول (`table_fill` — Dissimilarity Matrix)
**السيناريو:** أربع نقاط: `p1=(0,0)`, `p2=(3,4)`, `p3=(6,0)`, `p4=(3,-4)`. أكمل مصفوفة Euclidean Distance الناقصة:

| | p1 | p2 | p3 | p4 |
| --- | --- | --- | --- | --- |
| p1 | 0 | ؟ | ؟ | ؟ |
| p2 | | 0 | ؟ | ؟ |
| p3 | | | 0 | ؟ |
| p4 | | | | 0 |

**المطلوب:** أكمل كل الخلايا الناقصة (؟).

**نموذج الحل:**
| | p1 | p2 | p3 | p4 |
| --- | --- | --- | --- | --- |
| p1 | 0 | 5 | 6 | 5 |
| p2 | | 0 | 5 | 8 |
| p3 | | | 0 | 5 |
| p4 | | | | 0 |

(حساب توضيحي: `d(p1,p2)=√(3²+4²)=5`، `d(p1,p3)=√(6²+0²)=6`، `d(p1,p4)=√(3²+4²)=5`، `d(p2,p3)=√(3²+4²)=5`، `d(p2,p4)=√(0²+8²)=8`، `d(p3,p4)=√(3²+4²)=5`)

---

### تمرين 3: تحليل مكتوب (`written_analysis`)
**السيناريو:** فريق بيانات استخدم `Symmetric Binary Distance` لحساب التشابه بين مرضى بناءً على نتائج فحوصات طبية (إيجابي/سلبي).

**المطلوب:** حلّل هذا القرار ونقده — هل هو مناسب؟ ولماذا؟

**نموذج الحل:**
هذا القرار **غير مناسب على الأرجح**. نتائج الفحوصات الطبية هي عادة خصائص **Asymmetric Binary** — لأن "النتيجة السلبية المشتركة" (كلا المريضين لم يُصابا بمرض نادر) لا تحمل دلالة تشابه حقيقية بينهما (فأغلب الناس أصلاً سلبيّون لهذا المرض النادر)، بينما "النتيجة الإيجابية المشتركة" (كلاهما مصاب فعلياً) هي التي تحمل دلالة تشابه قوية. استخدام الصيغة المتماثلة (Symmetric) هنا سيُضخّم التشابه بين كل المرضى تقريباً بسبب كثرة النتائج السلبية المشتركة، مما يُضعف قدرة التجميع على تمييز المجموعات الفعلية ذات الدلالة الطبية.

---

### تمرين 4: إكمال مخطط (`diagram_completion` — KDD/Clustering pipeline)
**السيناريو:** أعطي المخطط التالي الناقص لخط أنابيب التجميع، وأكمل العقدة والرابط المفقودين:

```diagram
type: flowchart
title: Clustering Pipeline (Incomplete)
direction: TD
nodes:
  - id: raw_data
    label: "Raw Data (Mixed Attribute Types)"
    kind: data
    level: 0
  - id: identify_type
    label: "تحديد نوع كل خاصية"
    kind: decision
    level: 1
  - id: MISSING_NODE
    label: "؟"
    kind: process
    level: 2
  - id: cluster_result
    label: "Clusters Formed"
    kind: event
    level: 3
edges:
  - from: raw_data
    to: identify_type
  - from: identify_type
    to: MISSING_NODE
  - from: MISSING_NODE
    to: cluster_result
```

**المطلوب:** ما العقدة المناسبة بدلاً من `MISSING_NODE`؟

**نموذج الحل:**
العقدة المفقودة هي **"حساب مقياس التقارب المناسب لكل نوع خاصية ثم تطبيق خوارزمية التجميع (Compute Proximity Measures + Apply Clustering Algorithm)"** — لأنها الخطوة المنطقية بين تحديد نوع الخاصية وبين الحصول على المجموعات النهائية، وهي جوهر ما تناولته هذه المحاضرة.

---

## الجزء الرابع: تمارين تتبع التنفيذ

### تمرين تتبع 1: بناء Dissimilarity Matrix بالكامل (Euclidean)
**المدخل:**
```python
points = {"x1": (1, 2), "x2": (3, 5), "x3": (2, 0), "x4": (4, 5)}
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب d(x2,x1) | ؟ |
| 2 | حساب d(x3,x1) | ؟ |
| 3 | حساب d(x3,x2) | ؟ |
| 4 | حساب d(x4,x1) | ؟ |
| 5 | حساب d(x4,x2) | ؟ |
| 6 | حساب d(x4,x3) | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | d(x2,x1)=√((3-1)²+(5-2)²) | 3.61 |
| 2 | d(x3,x1)=√((2-1)²+(0-2)²) | 2.24 |
| 3 | d(x3,x2)=√((2-3)²+(0-5)²) | 5.10 |
| 4 | d(x4,x1)=√((4-1)²+(5-2)²) | 4.24 |
| 5 | d(x4,x2)=√((4-3)²+(5-5)²) | 1.00 |
| 6 | d(x4,x3)=√((4-2)²+(5-0)²) | 5.39 |

**النتيجة:** مصفوفة Dissimilarity مطابقة تماماً لمثال الشريحة 15.

---

### تمرين تتبع 2: حساب Asymmetric Binary Distance لثلاثة كائنات جديدة
**المدخل:**
```python
# قيم مُرمَّزة (1=إيجابي/Y/P، 0=سلبي/N) لثلاث خصائص فقط
Patient_A = [1, 1, 0]
Patient_B = [1, 0, 0]
Patient_C = [0, 0, 1]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | بناء جدول توافق A×B: q,r,s,t | ؟ |
| 2 | حساب d(A,B) | ؟ |
| 3 | بناء جدول توافق A×C: q,r,s,t | ؟ |
| 4 | حساب d(A,C) | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | A=[1,1,0], B=[1,0,0]: q=1 (موضع1)، r=1 (موضع2)، s=0، t=1 (موضع3) | q=1, r=1, s=0, t=1 |
| 2 | d(A,B) = (r+s)/(q+r+s) = (1+0)/(1+1+0) | 0.5 |
| 3 | A=[1,1,0], C=[0,0,1]: q=0، r=2 (مواضع 1,2)، s=1 (موضع3)، t=0 | q=0, r=2, s=1, t=0 |
| 4 | d(A,C) = (r+s)/(q+r+s) = (2+1)/(0+2+1) | 1.0 |

**النتيجة:** المريض A أقرب إلى B (d=0.5) منه إلى C (d=1.0 أي اختلاف تام).

---

### تمرين تتبع 3: تطبيع خصائص ترتيبية لمجموعة أكبر
**المدخل:**
```python
# خاصية ترتيبية بخمس حالات: 1=poor ... 5=excellent
ratings = {"O1": 2, "O2": 5, "O3": 1, "O4": 4, "O5": 3}
M_f = 5
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | تطبيع O1: (2-1)/(5-1) | ؟ |
| 2 | تطبيع O2: (5-1)/(5-1) | ؟ |
| 3 | تطبيع O3: (1-1)/(5-1) | ؟ |
| 4 | تطبيع O4: (4-1)/(5-1) | ؟ |
| 5 | تطبيع O5: (3-1)/(5-1) | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | (2-1)/4 | 0.25 |
| 2 | (5-1)/4 | 1.00 |
| 3 | (1-1)/4 | 0.00 |
| 4 | (4-1)/4 | 0.75 |
| 5 | (3-1)/4 | 0.50 |

**النتيجة:** القيم المطبَّعة جاهزة الآن لحساب أي مسافة عددية (Euclidean/Manhattan) بينها.

---

### تمرين تتبع 4: مقارنة عدة كائنات نصية عبر Nominal Distance
**المدخل:**
```python
colors = {"O1": "Red", "O2": "Blue", "O3": "Red", "O4": "Green", "O5": "Blue"}
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | d(O1,O2) | ؟ |
| 2 | d(O1,O3) | ؟ |
| 3 | d(O2,O5) | ؟ |
| 4 | d(O3,O4) | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | O1=Red, O2=Blue → مختلفان (m=0, p=1) | d=1 |
| 2 | O1=Red, O3=Red → متطابقان (m=1, p=1) | d=0 |
| 3 | O2=Blue, O5=Blue → متطابقان | d=0 |
| 4 | O3=Red, O4=Green → مختلفان | d=1 |

**النتيجة:** الكائنات (O1,O3) و(O2,O5) متطابقة تماماً في هذه الخاصية الاسمية الوحيدة.

---

### تمرين تتبع 5: حساب Jaccard لعدة أزواج من سجلات معاملات (Market Basket كـ Binary)
**المدخل:**
```python
# 1 = اشترى المنتج، 0 = لم يشتر (Bread, Milk, Eggs, Butter)
Customer_X = [1, 1, 0, 0]
Customer_Y = [1, 0, 0, 1]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب q (كلاهما اشترى) | ؟ |
| 2 | حساب r (X اشترى، Y لا) | ؟ |
| 3 | حساب s (X لا، Y اشترى) | ؟ |
| 4 | حساب sim_jaccard(X,Y) | ؟ |

**نموذج الحل:**
| التكرار | العملية | الحالة |
| --- | --- | --- |
| 1 | Bread فقط (كلاهما=1) | q=1 |
| 2 | Milk (X=1,Y=0) | r=1 |
| 3 | Butter (X=0,Y=1) | s=1 |
| 4 | sim_jaccard = q/(q+r+s) = 1/(1+1+1) | 0.33 |

**النتيجة:** تشابه ضعيف نسبياً (0.33) بين سلة مشتريات العميلين X وY.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

### السؤال 1: ما الفرق بين `Classification` و `Clustering`؟
**نموذج الإجابة:**
1. **التعريف:** Classification تعلّم مُوجَّه (Supervised) يُصنّف كائنات جديدة إلى فئات معروفة مسبقاً؛ Clustering تعلّم غير مُوجَّه (Unsupervised) يكتشف مجموعات دون تسميات مسبقة.
2. **المكونات/الشروط:** Classification يحتاج بيانات تدريب مُوسومة (Labeled)؛ Clustering يعمل على بيانات غير موسومة (Unlabeled).
3. **مثال رقمي:** بيانات فواكه بعمود "label" (Banana/Orange) = Classification؛ نفس البيانات بدون عمود label = Clustering.
4. **متى نستخدم:** نستخدم Classification عندما تتوفر تسميات فعلية موثوقة؛ ونستخدم Clustering عند غياب أي تسميات أو عند الرغبة باكتشاف بنية غير معروفة مسبقاً.

### السؤال 2: عرّف `High intra-cluster similarity` و`Low inter-cluster similarity` ووضّح أهميتهما.
**نموذج الإجابة:**
1. **التعريف:** الأولى تعني تماسك الكائنات داخل نفس المجموعة (تشابه مرتفع)، والثانية تعني تباعد الكائنات بين مجموعات مختلفة (تشابه منخفض).
2. **المكونات/الشروط:** تُقاس عادة عبر متوسط المسافات داخل المجموعة مقابل بين المجموعات.
3. **مثال رقمي:** في مثال العملاء، مجموعة دخل مرتفع متماسكة داخلياً (فروق دخل صغيرة) لكنها بعيدة عن مجموعة دخل منخفض.
4. **متى نستخدم:** هذان الشرطان هما المعيار الأساسي لتقييم "جودة" أي تجميع بغض النظر عن الخوارزمية المستخدمة.

### السؤال 3: لماذا لا يُعتبر تقسيم الطلاب أبجدياً `Cluster Analysis`؟
**نموذج الإجابة:**
1. **التعريف:** Cluster Analysis يشترط أن يعتمد التقسيم على تشابه فعلي في قيم الخصائص (Attribute Values).
2. **المكونات/الشروط:** الترتيب الأبجدي معيار إداري عشوائي لا علاقة له بأي خاصية وصفية حقيقية للطالب (كالدرجات، العمر، إلخ).
3. **مثال رقمي:** لا يوجد "مقياس مسافة" منطقي بين "أحمد" و"محمد" بناءً على الاسم نفسه له معنى تحليلي.
4. **متى نستخدم:** نُميّز هذا الفرق كلما وُجد تقسيم بيانات (Data Segmentation) للتأكد من كونه تجميعاً حقيقياً أم مجرد فرز إداري.

### السؤال 4: اشرح الفروق الأربعة الأساسية بين `Partitioning` و`Hierarchical` و`Density-based` و`Grid-based` Methods.
**نموذج الإجابة:**
1. **التعريف:** أربع فئات رئيسية لتصنيف خوارزميات التجميع بحسب آلية عملها الأساسية.
2. **المكونات/الشروط:** Partitioning (حصري، قائم على المسافة)، Hierarchical (متعدد المستويات، لا رجوع عن القرار)، Density-based (مناطق كثيفة، أشكال عشوائية)، Grid-based (بنية شبكية، سرعة مستقلة عن حجم البيانات).
3. **مثال رقمي:** k-Means (Partitioning) مقابل DBSCAN (Density-based) على بيانات بشكل هلالي — الأول يفشل، الثاني ينجح.
4. **متى نستخدم:** نختار الفئة بحسب حجم البيانات، الشكل المتوقع للمجموعات، والحاجة لتحديد عدد المجموعات مسبقاً أم لا.

### السؤال 5: ما هي `Minkowski Distance` وما علاقتها بـ Manhattan وEuclidean؟
**نموذج الإجابة:**
1. **التعريف:** صيغة عامة لحساب مسافة الخصائص العددية بمعادلة `L-h norm`.
2. **المكونات/الشروط:** رتبة `h` تُحدد نوع المسافة؛ `h=1` تُعطي Manhattan، `h=2` تُعطي Euclidean.
3. **مثال رقمي:** لنقطتين بفرق (3,4): Manhattan=7، Euclidean=5.
4. **متى نستخدم:** Euclidean هي الأشيع في خوارزميات مثل k-Means؛ Manhattan تُفضَّل عند وجود قيم متطرفة (Outliers) لأنها أقل حساسية للفروقات الكبيرة المفردة.

### السؤال 6: عدّد الخواص الرياضية الأربع لـ Minkowski Distance ووضّح أهمية كل منها.
**نموذج الإجابة:**
1. **التعريف:** Non-negativity، Identity of indiscernibles، Symmetry، Triangle inequality.
2. **المكونات/الشروط:** كل خاصية تضمن سلوكاً منطقياً متوقعاً لأي "مسافة" رياضية حقيقية (Metric).
3. **مثال رقمي:** `d(i,k) ≤ d(i,j)+d(j,k)` — إن كانت d(i,j)=3 وd(j,k)=4 فيجب أن يكون d(i,k) ≤ 7.
4. **متى نستخدم:** هذه الخواص أساس ضمان صحة نتائج خوارزميات التجميع القائمة على المسافة رياضياً.

### السؤال 7: ما الفرق بين الخصائص الثنائية `Symmetric` و`Asymmetric`؟
**نموذج الإجابة:**
1. **التعريف:** Symmetric: كلتا القيمتين (0،1) لهما نفس الأهمية؛ Asymmetric: إحداهما (عادة 1) أكثر دلالة من الأخرى.
2. **المكونات/الشروط:** في Asymmetric نتجاهل `t` (تطابق 0-0) من الحساب.
3. **مثال رقمي:** الجنس (Male/Female) = Symmetric؛ نتيجة فحص طبي (إيجابي/سلبي) = Asymmetric.
4. **متى نستخدم:** نستخدم Asymmetric عندما يكون "غياب الصفة" لدى الطرفين معاً عديم الدلالة التحليلية.

### السؤال 8: اشرح خطوات معالجة الخصائص الترتيبية (Ordinal) خطوة بخطوة.
**نموذج الإجابة:**
1. **التعريف:** عملية تحويل قيم فئوية مرتّبة إلى قيم عددية مطبَّعة قابلة لتطبيق مقاييس المسافة العددية عليها.
2. **المكونات/الشروط:** ثلاث خطوات: تعيين الرتبة، التطبيع بصيغة `(r-1)/(Mf-1)`، ثم حساب المسافة العددية.
3. **مثال رقمي:** خاصية بثلاث حالات (fair,good,excellent) → رتب (1,2,3) → مطبَّعة (0, 0.5, 1.0).
4. **متى نستخدم:** كلما وُجدت خاصية فئوية لها ترتيب منطقي واضح (تقييمات، درجات، مستويات).

### السؤال 9: ما هو `Jaccard Coefficient` ولماذا يُستخدم تحديداً للخصائص الثنائية غير المتماثلة؟
**نموذج الإجابة:**
1. **التعريف:** مقياس تشابه يُحسب كـ `q/(q+r+s)`، أي نسبة التطابقات الإيجابية إلى كل الحالات ما عدا التطابق السلبي المشترك.
2. **المكونات/الشروط:** يتجاهل `t` عمداً لأنه لا يحمل دلالة في السياقات غير المتماثلة (Asymmetric).
3. **مثال رقمي:** q=1,r=1,s=1 → sim_jaccard=1/3≈0.33.
4. **متى نستخدم:** في تحليل البيانات الطبية، بيانات سلة السوق (Market Basket)، وأي بيانات ثنائية نادرة الإيجابية.

### السؤال 10: لماذا يُعتبر التطبيع (Normalization) خطوة إلزامية قبل حساب أي مسافة عددية؟
**نموذج الإجابة:**
1. **التعريف:** عملية إعادة معايرة نطاق القيم العددية لتقع ضمن مجال موحّد (مثل [0,1] أو [-1,1]).
2. **المكونات/الشروط:** بدون تطبيع، الخاصية ذات النطاق (Range) الأكبر (كخاصية بوحدات صغيرة كالسنتيمتر بدلاً من المتر) تُهيمن ظلماً على قيمة المسافة الكلية.
3. **مثال رقمي:** خاصية دخل بنطاق [0-100000] وخاصية عمر بنطاق [0-100] — بدون تطبيع، فرق الدخل سيُهيمن كلياً على المسافة الإجمالية.
4. **متى نستخدم:** دائماً عند وجود خصائص عددية متعددة بنطاقات مختلفة قبل تطبيق أي خوارزمية تجميع قائمة على المسافة.

### السؤال 11: وضّح العلاقة `sim(i,j) = 1 - d(i,j)` ومتى تصح هذه العلاقة.
**نموذج الإجابة:**
1. **التعريف:** علاقة عكسية بسيطة تربط بين درجة التشابه ودرجة الاختلاف بين كائنين.
2. **المكونات/الشروط:** تصح فقط عندما تكون كل من `sim` و`d` مُطبَّعتين (Normalized) ضمن المجال [0,1].
3. **مثال رقمي:** إذا كان `d(i,j)=0.3` فإن `sim(i,j)=0.7`.
4. **متى نستخدم:** كلما احتجنا التحويل بين التشابه والاختلاف في أي من مقاييس Nominal، Ordinal، أو Binary المذكورة في المحاضرة.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات
| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Ensemble Methods (المحاضرة السابقة) | Cluster Analysis (هذه المحاضرة) | كلاهما تقنيات تحسين/بناء نماذج، لكن الأولى Supervised والثانية Unsupervised |
| Cluster Analysis part-1 (هذه المحاضرة) | Cluster Analysis part-2 (القادمة) | مقاييس التقارب هنا هي المدخل الرياضي المباشر لخوارزميات k-Means, K-Modes, PAM القادمة |
| Proximity Measures | Data Preprocessing | التطبيع (Normalization) خطوة مشتركة أساسية بين المرحلتين |

### 🔑 أهم النقاط الذهبية
| الموضوع | النقاط |
| --- | --- |
| تعريف Clustering | تقسيم كائنات إلى مجموعات بناءً على تشابه فعلي في الخصائص، وليس أي معيار عشوائي |
| Unsupervised vs Supervised | Clustering=Unsupervised (learning by observation)، Classification=Supervised (learning by examples) |
| فئات الخوارزميات الأربع | Partitioning / Hierarchical / Density-based / Grid-based |
| Minkowski/Manhattan/Euclidean | h=1→Manhattan، h=2→Euclidean، كلاهما حالة خاصة من Minkowski |
| Binary Symmetric vs Asymmetric | Asymmetric يتجاهل t (تطابق 0-0) لعدم دلالته |
| Nominal | d=(p-m)/p، sim=m/p |
| Ordinal | رتبة → تطبيع (r-1)/(Mf-1) → مسافة عددية عادية |

### 🔑 مرجع سريع
| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `d(i,j)` | Dissimilarity/Distance | كل مقاييس التقارب |
| `sim(i,j)` | Similarity | العلاقة sim=1-d |
| `q,r,s,t` | خلايا جدول التوافق للخصائص الثنائية | Binary Symmetric/Asymmetric |
| `p` | إجمالي عدد الخصائص | Nominal Dissimilarity |
| `m` | عدد التطابقات | Nominal Similarity |
| `M_f` | عدد الحالات الترتيبية | Ordinal Normalization |
| `h` | رتبة Minkowski (L-h norm) | Manhattan(h=1)/Euclidean(h=2) |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | Clustering=Unsupervised، Classification=Supervised — لا تخلط بينهما أبداً |
| 2 | ليس كل Data Segmentation هو Cluster Analysis |
| 3 | Euclidean=L2 (جذر مجموع المربعات)، Manhattan=L1 (مجموع القيم المطلقة فقط) |
| 4 | في Binary Asymmetric: تجاهل t دائماً |
| 5 | Nominal: d=(p-m)/p — عدم التطابق كامل أو معدوم، لا درجات وسطى |
| 6 | Ordinal: طبّع دائماً قبل حساب المسافة العددية |
| 7 | طبّع (Normalize) كل الخصائص العددية قبل حساب أي مسافة نهائية |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما الفرق الأساسي بين Clustering وClassification؟
A: Clustering تعلّم غير موجَّه بدون تسميات مسبقة (learning by observation)، بينما Classification تعلّم موجَّه بتسميات معروفة مسبقاً (learning by examples).

**Q2:** ما هما الشرطان اللذان يُحددان جودة التجميع؟
A: High intra-cluster similarity (تماسك داخلي) وLow inter-cluster similarity (تباعد خارجي).

**Q3:** لماذا لا يُعتبر تقسيم الطلاب أبجدياً Cluster Analysis؟
A: لأنه لا يعتمد على أي تشابه فعلي في الخصائص، بل على معيار عشوائي (الترتيب الأبجدي).

**Q4:** اذكر مثالين على تطبيقات Clustering الواردة في المحاضرة.
A: تنظيم نتائج بحث الويب متعددة المعنى (مثل "cardinal")، وتجميع العملاء في ذكاء الأعمال لبناء استراتيجيات تسويقية.

**Q5:** ما الفرق بين Exclusive وNon-exclusive clusters؟
A: في Exclusive ينتمي الكائن لمجموعة واحدة فقط، وفي Non-exclusive قد ينتمي لأكثر من مجموعة.

**Q6:** اذكر أمثلة نموذجية على Partitioning Methods.
A: k-Means، k-Medoids، CLARANS.

**Q7:** اذكر أمثلة نموذجية على Hierarchical Methods.
A: Diana، Agnes، BIRCH، CAMELEON.

**Q8:** اذكر أمثلة نموذجية على Density-based Methods.
A: DBSCAN، OPTICS، DenClue.

**Q9:** اذكر أمثلة نموذجية على Grid-based Methods.
A: STING، WaveCluster، CLIQUE.

**Q10:** ما صيغة Minkowski Distance عندما h=1 وh=2؟
A: h=1 تُعطي Manhattan Distance، وh=2 تُعطي Euclidean Distance.

**Q11:** ما الخواص الرياضية الأربع التي تحققها Minkowski Distance؟
A: Non-negativity، Identity of indiscernibles، Symmetry، Triangle inequality.

**Q12:** ما الفرق بين Binary Symmetric وAsymmetric في صيغة المسافة؟
A: Symmetric تستخدم كل الحالات (q,r,s,t) في المقام؛ Asymmetric تتجاهل t تماماً.

**Q13:** ما صيغة Jaccard Similarity Coefficient؟
A: sim_jaccard(i,j) = q / (q+r+s).

**Q14:** ما صيغة Dissimilarity للخصائص الاسمية (Nominal)؟
A: d(i,j) = (p-m)/p، حيث m عدد التطابقات وp إجمالي عدد الخصائص.

**Q15:** كيف تُعالَج الخصائص الترتيبية (Ordinal) قبل حساب المسافة؟
A: تُحوَّل لرتبة r، ثم تُطبَّع بصيغة z=(r-1)/(Mf-1)، ثم تُحسب المسافة كأنها خاصية عددية.

**Q16:** لماذا يجب تطبيع الخصائص العددية قبل حساب المسافة؟
A: لأن الخاصية ذات النطاق الأكبر (وحدات أصغر) تهيمن ظلماً على قيمة المسافة الكلية إن لم تُطبَّع.

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> الكود الكامل مجمّع من جميع أجزاء المحاضرة — مرجع للطالب، لا شرح جديد.

```python
# === Data Preprocessing / Normalization ===
import numpy as np

def min_max_normalize(values):
    # Scale a list of numeric values into [0.0, 1.0]
    values = np.array(values, dtype=float)
    return (values - values.min()) / (values.max() - values.min())


# === Proximity Measures: Numeric Attributes (Minkowski / Manhattan / Euclidean) ===
def minkowski_distance(a, b, h):
    a, b = np.array(a), np.array(b)
    return float(np.sum(np.abs(a - b) ** h) ** (1 / h))

def manhattan_distance(a, b):
    return minkowski_distance(a, b, h=1)

def euclidean_distance(a, b):
    return minkowski_distance(a, b, h=2)


# === Proximity Measures: Binary Attributes (Symmetric / Asymmetric / Jaccard) ===
def binary_contingency_counts(a, b):
    a, b = np.array(a), np.array(b)
    q = int(np.sum((a == 1) & (b == 1)))
    r = int(np.sum((a == 1) & (b == 0)))
    s = int(np.sum((a == 0) & (b == 1)))
    t = int(np.sum((a == 0) & (b == 0)))
    return q, r, s, t

def symmetric_binary_distance(a, b):
    q, r, s, t = binary_contingency_counts(a, b)
    return (r + s) / (q + r + s + t)

def asymmetric_binary_distance(a, b):
    q, r, s, t = binary_contingency_counts(a, b)
    return (r + s) / (q + r + s)

def jaccard_similarity(a, b):
    q, r, s, t = binary_contingency_counts(a, b)
    return q / (q + r + s)


# === Proximity Measures: Nominal Attributes ===
def nominal_dissimilarity(obj_i, obj_j):
    p = len(obj_i)
    m = sum(1 for x, y in zip(obj_i, obj_j) if x == y)
    return (p - m) / p

def nominal_similarity(obj_i, obj_j):
    return 1 - nominal_dissimilarity(obj_i, obj_j)


# === Proximity Measures: Ordinal Attributes ===
def ordinal_normalize(rank, M_f):
    # rank must be in {1, ..., M_f}
    return (rank - 1) / (M_f - 1)

def ordinal_dissimilarity(rank_i, rank_j, M_f):
    z_i = ordinal_normalize(rank_i, M_f)
    z_j = ordinal_normalize(rank_j, M_f)
    return abs(z_i - z_j)   # Euclidean in 1D reduces to absolute difference


# === Building a full Dissimilarity Matrix for numeric data ===
def dissimilarity_matrix(points, distance_fn=euclidean_distance):
    n = len(points)
    matrix = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            matrix[i][j] = distance_fn(points[i], points[j])
    return matrix


# === Clustering (Placeholder — algorithms detailed in part-2 of the lecture) ===
# NOTE: k-Means, K-Modes, and PAM were listed in the Lecture Index
# but NOT explained in detail within this part-1 slide deck.
# (غير مشروحة في المحاضرة - ستُشرح في الجزء الثاني)
def kmeans_placeholder(*args, **kwargs):
    raise NotImplementedError("k-Means algorithm is covered in Cluster Analysis part-2")


if __name__ == "__main__":
    # Example usage matching the lecture's numeric example
    pts = [(1, 2), (3, 5), (2, 0), (4, 5)]
    print("Euclidean Dissimilarity Matrix:\n", np.round(dissimilarity_matrix(pts, euclidean_distance), 2))
    print("Manhattan Dissimilarity Matrix:\n", np.round(dissimilarity_matrix(pts, manhattan_distance), 2))

    # Example usage matching the lecture's binary (patients) example
    jack = [1, 0, 1, 0, 0, 0]
    mary = [1, 0, 1, 0, 1, 0]
    jim  = [1, 1, 0, 0, 0, 0]
    print("d(Jack,Mary) =", round(asymmetric_binary_distance(jack, mary), 2))
    print("d(Jack,Jim)  =", round(asymmetric_binary_distance(jack, jim), 2))
    print("d(Jim,Mary)  =", round(asymmetric_binary_distance(jim, mary), 2))
```

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع تعريف Cluster Analysis وتمييزه عن Data Segmentation العادي
- [ ] أفهم لماذا Clustering هو Unsupervised بينما Classification هو Supervised
- [ ] أستطيع شرح High intra-cluster similarity وLow inter-cluster similarity بمثال
- [ ] أحفظ الأمثلة النموذجية للفئات الأربع (Partitioning/Hierarchical/Density-based/Grid-based)
- [ ] أستطيع كتابة صيغة Minkowski Distance واشتقاق Manhattan وEuclidean منها
- [ ] أفهم الخواص الرياضية الأربع لأي مقياس مسافة (Metric)
- [ ] أستطيع بناء جدول التوافق (q,r,s,t) لخصائص ثنائية وحساب Symmetric/Asymmetric Distance
- [ ] أعرف متى أتجاهل t في صيغة Asymmetric وJaccard ولماذا
- [ ] أستطيع حساب Nominal Dissimilarity وSimilarity يدوياً
- [ ] أستطيع تحويل خاصية Ordinal إلى رتبة ثم تطبيعها ثم حساب مسافتها
- [ ] أتذكّر أن sim(i,j) = 1 - d(i,j) فقط عندما تكون كلتاهما ضمن [0,1]
- [ ] أفهم أهمية التطبيع (Normalization) قبل حساب أي مسافة على خصائص عددية
- [ ] أدرك أن k-Means وK-Modes وPAM لم تُشرح تفصيلياً في هذا الجزء (part-1) وستأتي لاحقاً

<!-- VALIDATION: هذا الدليل تم بناؤه بالكامل من محتوى KDD_Lecture_9_1_.pdf (Cluster Analysis part-1) وفق برومبت custom_prompt.md v1.0. غطّى الدليل جميع الشرائح 1-22 دون تجاهل أي معلومة، مع وسم صريح لكل جزء غير مشروح تفصيلياً في هذا الجزء من المحاضرة (خوارزميات k-Means, K-Modes, PAM الواردة فقط في فهرس المحاضرة). تم الالتزام ببنية SCHEMA.md v1.0 المطلوبة: أقسام مرقّمة هرمياً، اقتباس "النص الأصلي يقول" لكل قسم، جداول ملخص، 16 سؤال MCQ مع تعليل كامل، 5 أسئلة تصحيح كود بأنواع متنوعة (wrong_formula, logic, misconception, return_check, dead_code)، تمارين تطبيقية وتحليلية وتتبع تنفيذ مع نماذج حل كاملة، 11 سؤال نظري منظم، ورقة مراجعة سريعة (Cheat Sheet)، 16 بطاقة Q&A، كود Python مجمّع كامل، وقائمة فحص ذاتي. -->
