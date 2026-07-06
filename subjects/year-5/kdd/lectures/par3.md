# المحاضرة 3 — Data Preprocessing (معالجة البيانات المسبقة)
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** لماذا نحتاج معالجة مسبقة، وأربع مهام رئيسية: `Data Cleaning`، `Data Integration`، `Data Reduction`، `Data Transformation`

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| 1. Introduction | مفاهيم عامة، KDD Process | فهم لماذا ووجود Data Mining |
| 2. Getting to Know Your Data | إحصاء وصفي، أنواع الصفات | فهم بنية البيانات وتوزيعها |
| 3. Data Preprocessing ← أنت هنا | `Missing Values`, `Binning`, `χ² test`, `Correlation`, `Normalization`, `Discretization` | بيانات نظيفة، متكاملة، مصغّرة، ومحوَّلة جاهزة فعلياً للتنقيب |
| 4. Frequent Patterns & ARM | `Apriori`, `support`, `confidence` | قواعد ترافق |
| 5. Regression | `Linear/Polynomial Regression` | نموذج تنبؤ رقمي |
| 6. Classification | `Decision Tree`, `Naive Bayes`, `kNN`, `SVM` | نموذج تصنيف |
| 7. Cluster Analysis | `k-Means`, `k-Medoids` | تجميع بدون إشراف |

> **نوع هذه المحاضرة:** محاضرة **Data Preprocessing** بامتياز — تُستخدم فيها كل المصطلحات المتوقعة: `Missing Values`، `Noise`، `Normalization`، `Binning`، `Correlation`، `Chi-Square`، `Discretization`. هي أول محاضرة تحتوي **كوداً عملياً حقيقياً وصيغاً رياضية مطبَّقة بالكامل** (χ²، معامل ارتباط بيرسون، Min-Max، Z-Score، Decimal Scaling).

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. لماذا نحتاج المعالجة المسبقة للبيانات؟ (جودة البيانات)

#### النص الأصلي يقول:
> "To improve data quality, thereby helping to improve the accuracy and efficiency of the subsequent data mining techniques. Many factors comprising data quality, including: Accuracy, Completeness, Consistency... Timeliness: timely update?... Believability: reflects how much the data are trusted by users. Interpretability: reflects how easily the data can be understood."

#### الشرح المبسّط:
الهدف الأساسي من `Data Preprocessing` هو **تحسين جودة البيانات**، مما يحسّن بدوره **دقة وكفاءة** خوارزميات التنقيب اللاحقة. جودة البيانات تتكوّن من عدة عوامل:
- **الدقة (`Accuracy`)**، **الاكتمال (`Completeness`)**، **الاتساق (`Consistency`)** (تُفصَّل لاحقاً كأنواع "الأوساخ").
- **التوقيت (`Timeliness`):** هل البيانات محدَّثة؟ مثال: بيانات سلوك شراء العملاء تمثّل لقطة (`snapshot`) صحيحة لفترة محدودة فقط؛ إن أصبحت قديمة، تصبح النماذج المبنية عليها قديمة أيضاً.
- **المصداقية (`Believability`):** مدى ثقة المستخدمين بالبيانات.
- **قابلية التفسير (`Interpretability`):** مدى سهولة فهم البيانات.

**لماذا هذا مهم؟** لأن أي خوارزمية تنقيب - مهما كانت متطورة - ستُنتج نتائج رديئة إن كانت مدخلاتها رديئة الجودة بأي من هذه الأبعاد الخمسة.

#### 💡 التشبيه:
> بناء منزل بمواد بناء رديئة أو منتهية الصلاحية سيؤدي لمنزل غير آمن مهما كانت مهارة المهندس المعماري.
> **وجه الشبه:** مواد البناء الرديئة = بيانات ضعيفة الجودة، المهندس الماهر = خوارزمية التنقيب المتطورة (لا تكفي وحدها).

---

### 2. البيانات "القذرة" (`Dirty Data`): ثلاثة أنواع رئيسية

#### النص الأصلي يقول:
> "The real-world data we wish to analyze by data mining techniques tend to be dirty: inaccurate or noisy, Incomplete (Missing) data, Inconsistent. This can cause confusion for the mining procedure, resulting in unreliable output. 'Garbage in, garbage out'."

#### الشرح المبسّط:
البيانات الواقعية غالباً "قذرة" (`dirty`) بثلاث طرق رئيسية:
1. **غير دقيقة/مشوَّشة (`inaccurate/noisy`)**
2. **ناقصة/مفقودة (`incomplete/missing`)**
3. **غير متّسقة (`inconsistent`)**

هذا يسبب ارتباكاً لإجراء التنقيب وينتج مخرجات غير موثوقة — تماماً كما في المبدأ العام "Garbage in, garbage out" الذي رأيناه في المحاضرتين السابقتين.

---

### 3. النوع الأول: بيانات غير دقيقة أو مشوَّشة (`Inaccurate/Noisy`)

#### النص الأصلي يقول:
> "Inaccurate or noisy: i.e., having incorrect attribute values — erroneous values: e.g., salary = -10K, Name='123'. unexpected values (outliers): e.g., salary=100K when the rest data lies in [30K-50K]. Many possible reasons: The data collection instruments used may be faulty. human or computer errors at data entry. Errors in data transmission. Users may purposely submit incorrect values for mandatory personal information fields (e.g., by choosing the default value 'January 1' displayed for birthday)."

#### الشرح المبسّط:
"القيم غير الدقيقة" لها نوعان:
- **قيم خاطئة (`erroneous values`):** مستحيلة منطقياً، مثل راتب = -10K (سالب!) أو اسم = "123" (رقم بدلاً من اسم).
- **قيم غير متوقّعة (`unexpected values` / `outliers`):** ممكنة منطقياً لكنها غريبة إحصائياً، مثل راتب=100K بينما بقية البيانات بين 30K-50K.

**أسباب محتملة عديدة:** أجهزة جمع بيانات معطوبة، أخطاء بشرية أو حاسوبية عند الإدخال، أخطاء في نقل البيانات، أو **تعمّد** المستخدمين إدخال قيم خاطئة في حقول إلزامية (مثال: اختيار القيمة الافتراضية "1 يناير" لتاريخ الميلاد لتخطي الحقل بسرعة).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا قد يكون تاريخ ميلاد "1 يناير" مشبوهاً إحصائياً في قاعدة بيانات كبيرة؟
> **لماذا هذا مهم؟** لأن تكرار هذه القيمة "الافتراضية" أكثر بكثير من المتوقع إحصائياً يكشف أن المستخدمين "يتحايلون" على حقل إلزامي بدلاً من إدخال بياناتهم الحقيقية.

---

### 4. النوع الثاني: بيانات ناقصة/مفقودة (`Incomplete/Missing`)

#### النص الأصلي يقول:
> "Incomplete (Missing) data: i.e., lacking attribute values or certain attributes of interest, or attribute containing only aggregate data. can occur for a number of reasons: Attribute values were not considered important at the time of entry: e.g., weight='' ; some people decline to give their weight or age. Some attributes are not applicable to all objects: e.g., driving license attribute."

#### الشرح المبسّط:
البيانات الناقصة تعني غياب قيم لصفة معيّنة أو غياب صفات كاملة كان يُفترض وجودها. أسبابها:
- **لم تُعتبر القيمة مهمة وقت الإدخال:** مثل حقل الوزن الفارغ لأن بعض الأشخاص يرفضون الإفصاح عن وزنهم أو عمرهم.
- **الصفة لا تنطبق على كل الكائنات:** مثال: صفة "رخصة القيادة" لا تنطبق على شخص لا يقود سيارة إطلاقاً.

---

### 5. النوع الثالث: بيانات غير متّسقة (`Inconsistent`)

#### النص الأصلي يقول:
> "Inconsistent: Data can contain inconsistent values. A major issue when merging data from heterogeneous sources. Examples: Age='42', Birthday='03/07/2010'. For an address field, where both a zip code and city are listed, it may happen that the specified zip code area is not contained in that city due to human error at data entry."

#### الشرح المبسّط:
البيانات غير المتّسقة تحتوي قيماً **متناقضة منطقياً** مع بعضها البعض ضمن نفس السجل. مشكلة كبيرة خصوصاً عند **دمج بيانات من مصادر متغايرة** (`heterogeneous sources`).

**أمثلة:** `Age="42"` مع `Birthday="03/07/2010"` (لو كانت السنة الحالية قريبة من 2024، فهذا العمر لا يتوافق مع تاريخ الميلاد المذكور إطلاقاً). أو حقل عنوان يحتوي رمزاً بريدياً ومدينة، لكن الرمز البريدي المذكور فعلياً لا ينتمي لتلك المدينة بسبب خطأ إدخال بشري.

#### الفهم الخاطئ الشائع ❌: البيانات "القذرة" تعني فقط بيانات ناقصة (فارغة).
#### الفهم الصحيح ✅: البيانات القذرة ثلاثة أنواع مستقلة: غير دقيقة/مشوَّشة، ناقصة، وغير متّسقة — لكل نوع أسبابه وطرق معالجته الخاصة.

---

### 6. المهام الرئيسية الأربع في المعالجة المسبقة: نظرة عامة

#### النص الأصلي يقول:
> "Data cleaning: Fill in missing values, smooth noisy data, identify or remove outliers, resolve inconsistencies. Data integration: Integration of multiple data sources, may causing inconsistencies and redundancies. Data reduction: Obtains reduced representation in volume but produces the same or similar analytical results. Data transformation: Normalization, data discretization, ..."

#### الشرح المبسّط:
أربع مهام رئيسية تُشكِّل عملية `Data Preprocessing` الكاملة:

| المهمة | الهدف الأساسي |
| --- | --- |
| `Data Cleaning` | تعويض القيم المفقودة، تنعيم البيانات المشوَّشة، تحديد/إزالة القيم الشاذة، حل التناقضات |
| `Data Integration` | دمج مصادر بيانات متعددة (قد يسبب تناقضات وتكرارات جديدة يجب معالجتها) |
| `Data Reduction` | الحصول على تمثيل أصغر حجماً للبيانات، لكن بنتائج تحليلية مطابقة أو مشابهة جداً |
| `Data Transformation` | تحويل البيانات (تطبيع `Normalization`، تقطيع `Discretization`، إلخ) لصيغة مناسبة للتنقيب |

**لماذا هذا الترتيب منطقي؟** لأنه يتبع تسلسل خطوات `KDD` نفسها التي درسناها في المحاضرة الأولى (Cleaning → Integration → Selection/Reduction → Transformation)، بمزيد من التفصيل العملي هنا.

---

### 7. كيفية التعامل مع البيانات المفقودة: الطرق اليدوية/البسيطة

#### النص الأصلي يقول:
> "1. Ignore the tuple: usually done when the class label is missing (for classification task). 2. Ignore the missing Value: by modifying the DM approaches to ignore missing values. For example, In clustering, the similarity can be calculated by using only the attributes that do not have missing values. 3. Eliminate attributes that have missing values: This should be done with caution... 4. Fill in the missing value manually: this may be time consuming and may not be feasible given a large data set with many missing values."

#### الشرح المبسّط:
أربع طرق أولية للتعامل مع القيم المفقودة:
1. **تجاهل السجل بالكامل (`Ignore the tuple`):** يُستخدم عادة عندما تكون **وسم الفئة نفسه** (`class label`) مفقوداً في مهمة تصنيف — بدون وسم صحيح، السجل عديم الفائدة لتدريب النموذج.
2. **تجاهل القيمة المفقودة فقط (`Ignore the missing value`):** بتعديل خوارزمية التنقيب نفسها لتتجاهلها، مثال: في `Clustering`، يمكن حساب التشابه باستخدام فقط الصفات التي **لا تحتوي** قيماً مفقودة.
3. **حذف الصفة كاملة (`Eliminate the attribute`):** يجب الحذر هنا لأن الصفة المحذوفة قد تكون **حاسمة** لمهمة التحليل.
4. **التعويض اليدوي (`Fill manually`):** قد يستغرق وقتاً طويلاً وغير عملي إطلاقاً مع بيانات ضخمة بها قيم مفقودة كثيرة.

#### مهم للامتحان ⚠️:
> لاحظ الفرق الدقيق بين الطريقة 2 و3: الطريقة 2 تُبقي على الصفة لكن تتجاهل القيمة المفقودة عند الحساب فقط لهذا السجل، بينما الطريقة 3 تحذف **العمود بأكمله** من كل البيانات.

---

### 8. كيفية التعامل مع البيانات المفقودة: التعويض الآلي

#### النص الأصلي يقول:
> "5. Fill in the missing value automatically with: A global constant e.g., 'unknown': a simple method, but it is not foolproof. A measure of central tendency for the attribute: E.g., mean, median, mode — symmetric vs. skewed & categorical vs. numeric. A measure of central tendency for all samples belonging to the same class. The most probable value: may be determined with regression, or decision tree,…. Ideally, each attribute should have one or more rules to specify whether or not nulls are allowed, how such values should be handled."

#### الشرح المبسّط:
طرق تعويض آلية أكثر تطوراً:
- **ثابت عام (`global constant`)** مثل "unknown": بسيطة لكنها **غير مضمونة النتائج** (`not foolproof`).
- **مقياس نزعة مركزية للصفة نفسها:** المتوسط، الوسيط، أو المنوال — والاختيار بينها يعتمد على: هل التوزيع متماثل أم منحرف (`symmetric vs. skewed`)، وهل الصفة فئوية أم رقمية (`categorical vs. numeric`) — تماماً كما تعلّمنا في المحاضرة الثانية (المتوسط للتوزيعات المتماثلة، الوسيط للمنحرفة، المنوال للفئوية).
- **مقياس نزعة مركزية لكل العيّنات من **نفس الفئة**:** بدلاً من متوسط عام لكل البيانات، نأخذ متوسط الفئة المحدَّدة فقط (أدق).
- **القيمة الأكثر احتمالاً:** تُحدَّد بطرق تنبؤية متقدمة كـ `Regression` أو `Decision Tree`.

**القاعدة المثالية:** لكل صفة يجب أن توجد قاعدة أو أكثر تحدد: هل يُسمح بقيم فارغة (`nulls`) أصلاً؟ وكيف تُعالَج إن وُجدت؟

#### ⚖️ المقايضة: التعويض بثابت عام مقابل مقياس نزعة مركزية

| | ثابت عام ("unknown") | مقياس نزعة مركزية (Mean/Median/Mode) |
| --- | --- | --- |
| المزايا | بسيط جداً وسريع التطبيق | أكثر واقعية إحصائياً، يحافظ على توزيع البيانات |
| العيوب | لا يعكس القيمة الحقيقية المحتملة إطلاقاً | يتطلب اختيار المقياس الصحيح حسب شكل التوزيع ونوع الصفة |
| متى تختاره | عند عدم القدرة على تقدير قيمة منطقية | عند معرفة توزيع الصفة (متماثل/منحرف) ونوعها (رقمي/فئوي) |

---

### 9. مثال تطبيقي: بيانات سرطان الثدي (`Breast Cancer dataset`) والتعامل مع `Bare Nuclei`

#### النص الأصلي يقول:
> "Breast Cancer dataset: containing information about breast cancer patients... only 'Bare Nuclei' column contains missing values... According to the description of the data, the missing values are encoded as '?' in the original data. convert the missing values to NaNs (NaN is commonly used in data analysis to indicate missing data). count the number of missing values in each column of the data."

#### الشرح المبسّط:
مجموعة بيانات حقيقية شهيرة (`Breast Cancer Wisconsin`) بها 699 سجلاً و10 صفات (بعد حذف `Sample code` كمعرّف). **العمود الوحيد** الذي يحتوي قيماً مفقودة هو `Bare Nuclei` (16 قيمة مفقودة)، والقيم المفقودة مُرمَّزة في الملف الأصلي بعلامة `'?'` بدلاً من فراغ حقيقي — لذا الخطوة الأولى العملية هي **تحويل `'?'` إلى `NaN`** (الرمز القياسي للقيم المفقودة في `pandas`/`NumPy`) قبل أي معالجة أخرى.

#### 💻 الكود: تحميل بيانات سرطان الثدي وتحويل رموز القيم المفقودة

#### ما هذا الكود؟
> يحمّل بيانات سرطان الثدي، يحذف عمود المعرّف غير المفيد تحليلياً، ثم يحوّل رمز القيم المفقودة `'?'` إلى `NaN` القياسي، ويعدّ عدد القيم المفقودة في كل عمود.

```python
import pandas as pd
import numpy as np

# Load the dataset (no header row in the raw file)
data = pd.read_csv(
    'https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.data',
    header=None
)
data.columns = ['Sample code', 'Clump Thickness', 'Uniformity of Cell Size', 'Uniformity of Cell Shape',
                'Marginal Adhesion', 'Single Epithelial Cell Size', 'Bare Nuclei', 'Bland Chromatin',
                'Normal Nucleoli', 'Mitoses', 'Class']

# Drop the ID column; it carries no analytical value (it is a Nominal identifier)
data = data.drop(['Sample code'], axis=1)
print('Number of instances = %d' % (data.shape[0]))
print('Number of attributes = %d' % (data.shape[1]))

# Replace the '?' placeholder with NumPy's standard missing-value marker
data = data.replace('?', np.NaN)

# Count missing values per column
print('Number of missing values:')
for col in data.columns:
    print('\t%s: %d' % (col, data[col].isna().sum()))
```

#### شرح كل سطر:
1. `import pandas as pd` / `import numpy as np` → استيراد المكتبتين الأساسيتين.
2. `data = pd.read_csv(url, header=None)` → تحميل الملف الخام بدون صف عناوين.
3. `data.columns = [...]` → تسمية الأعمدة العشرة الأصلية يدوياً.
4. `data = data.drop(['Sample code'], axis=1)` → حذف عمود المعرّف (`axis=1` يعني حذف عمود كامل وليس صفاً).
5. `data.shape[0]`, `data.shape[1]` → طباعة عدد السجلات والصفات المتبقية (699، 10).
6. `data = data.replace('?', np.NaN)` → استبدال كل ظهور للرمز `'?'` بقيمة `NaN` معياریة.
7. `for col in data.columns: ... isna().sum()` → عدّ القيم المفقودة (`NaN`) في كل عمود بعد التحويل.

**المكتبات المطلوبة (Imports):**
> `import pandas as pd` / `import numpy as np`

**الناتج المتوقع:**
> `Number of instances = 699`, `Number of attributes = 10`، وعند عدّ القيم المفقودة: كل الأعمدة = 0 **إلا** `Bare Nuclei: 16`.

---

### 10. معالجة القيم المفقودة عملياً: التعويض بالوسيط أو الحذف

#### النص الأصلي يقول:
> "Method1: missing values in the 'Bare Nuclei' column are replaced by the median value of that column. Method2: another common approach is to discard the data points that contain missing values. can be easily accomplished by applying the dropna() function to the data frame."

#### الشرح المبسّط:
طريقتان عمليتان مطبَّقتان مباشرة على عمود `Bare Nuclei`:
- **الطريقة الأولى:** تعويض القيم المفقودة بـ**الوسيط** (`median`) لنفس العمود — وهذا اختيار منطقي لأن `Bare Nuclei` قد يكون له توزيع منحرف (كما تعلّمنا: الوسيط أكثر مقاومة للقيم الشاذة من المتوسط).
- **الطريقة الثانية:** حذف السجلات (الصفوف) التي تحتوي أي قيمة مفقودة بالكامل، عبر دالة `dropna()` — بعد التطبيق، انخفض عدد السجلات من 699 إلى 683 (أي حُذفت 16 سجلاً، بالضبط عدد القيم المفقودة).

#### 💻 الكود: تعويض القيم المفقودة بالوسيط

```python
# Isolate the column that contains missing values
data2 = data['Bare Nuclei']

print('Before replacing missing values:')
print(data2[20:25])

# Fill missing values (NaN) with the column's median
data2 = data2.fillna(data2.median())

print('\nAfter replacing missing values:')
print(data2[20:25])
```

#### شرح كل سطر:
1. `data2 = data['Bare Nuclei']` → عزل العمود المستهدف كسلسلة (`Series`) منفصلة.
2. `print(data2[20:25])` → عرض شريحة من الصفوف (20-24) قبل المعالجة، تحتوي قيمة `NaN` واحدة على الأقل (كما في الشريحة، الصف 23).
3. `data2.fillna(data2.median())` → استبدال كل `NaN` بقيمة الوسيط المحسوبة لنفس العمود.
4. طباعة نفس الشريحة بعد التعويض للمقارنة المباشرة.

**الناتج المتوقع:**
> قبل المعالجة: الصف 23 يحمل `NaN`. بعد المعالجة: الصف 23 يحمل `1.0` (قيمة الوسيط المحسوبة لعمود `Bare Nuclei`).

#### 💻 الكود: حذف السجلات ذات القيم المفقودة

```python
print('Number of rows in original data = %d' % (data.shape[0]))

# Drop any row containing at least one missing (NaN) value
data2 = data.dropna()
print('Number of rows after discarding missing values = %d' % (data2.shape[0]))
```

**الناتج المتوقع:**
> `Number of rows in original data = 699` → `Number of rows after discarding missing values = 683` (فرق 16 سجلاً، مطابق تماماً لعدد القيم المفقودة في `Bare Nuclei`).

#### ⚖️ المقايضة: تعويض بالوسيط مقابل حذف السجلات

| | التعويض بالوسيط (`fillna`) | الحذف (`dropna`) |
| --- | --- | --- |
| المزايا | يحافظ على كل السجلات (لا فقدان بيانات) | بسيط جداً، لا يُدخل قيماً "مصطنعة" |
| العيوب | قد يُدخل انحيازاً إن كانت القيم المفقودة ليست عشوائية | فقدان بيانات فعلية (16 سجلاً هنا)، قد يكون مؤثراً مع نسب أعلى |
| متى تختاره | عند وجود عدد كبير من السجلات المهمة وقيم مفقودة قليلة في عمود واحد | عند وجود بيانات وفيرة بحيث لا يؤثر حذف عدد صغير من السجلات |

---

### 11. كيفية التعامل مع البيانات المشوَّشة (`Noisy Data`)

#### النص الأصلي يقول:
> "Basic statistical description techniques (e.g., boxplots and scatter plots) can be used to highlight which data values should be treated as noise or outliers. Data smoothing techniques can be used to remove the noise from the data: Binning: described next. Regression: a technique that conforms data values to a function. Clustering: similar values are organized into groups or 'clusters'. values that fall outside of the set of clusters are considered outliers. Combined computer and human inspection: detect suspicious values and check by human."

#### الشرح المبسّط:
لاكتشاف "أي القيم" يجب معاملتها كضوضاء، نستخدم أدوات الوصف الإحصائي الأساسية من المحاضرة الثانية: **`Boxplots`** و**`Scatter plots`**.

لإزالة الضوضاء فعلياً بعد اكتشافها، توجد أربع تقنيات تنعيم (`smoothing`):

| التقنية | الفكرة |
| --- | --- |
| `Binning` | تفصَّل في القسم التالي مباشرة |
| `Regression` | تقنية تُطابِق (`conforms`) قيم البيانات مع دالة رياضية محدَّدة |
| `Clustering` | تنظيم القيم المتشابهة في مجموعات؛ القيم التي تقع خارج أي مجموعة تُعتبر شاذة |
| `Combined computer and human inspection` | الحاسوب يكتشف القيم المشبوهة، والإنسان يتحقق منها يدوياً |

#### 💻 الكود: استخدام Boxplot لاكتشاف القيم المشوَّشة في بيانات سرطان الثدي

#### ما هذا الكود؟
> يحوّل عمود `Bare Nuclei` (المخزَّن كنص) إلى نوع رقمي، ثم يرسم صندوق `Boxplot` لكل الصفات معاً لاكتشاف الأعمدة التي بها قيم مرتفعة بشكل غير طبيعي.

```python
%matplotlib inline

# Drop the target column ('Class') since it is not a feature to inspect for noise
data2 = data.drop(['Class'], axis=1)

# 'Bare Nuclei' was stored as string/object type; convert it to numeric first
data2['Bare Nuclei'] = pd.to_numeric(data2['Bare Nuclei'])

# Draw boxplots for all remaining (numeric) columns together
data2.boxplot(figsize=(20, 3))
```

#### شرح كل سطر:
1. `%matplotlib inline` → عرض الرسوم البيانية مباشرة داخل دفتر Jupyter.
2. `data2 = data.drop(['Class'], axis=1)` → استبعاد عمود الهدف `Class` من الفحص (لسنا بصدد تحليل توزيعه الآن).
3. `data2['Bare Nuclei'] = pd.to_numeric(data2['Bare Nuclei'])` → تحويل نوع العمود من نص (`object`) إلى رقمي، ضروري قبل رسم `Boxplot` عليه.
4. `data2.boxplot(figsize=(20,3))` → رسم صناديق `Boxplot` لكل الأعمدة الرقمية التسعة جنباً إلى جنب.

**الناتج المتوقع:**
> صناديق `Boxplot` تُظهر أن **5 أعمدة فقط** (`Marginal Adhesion`, `Single Epithelial Cell Size`, `Bland Chromatin`, `Normal Nucleoli`, `Mitoses`) تحتوي **قيماً مرتفعة بشكل غير طبيعي** (نقاط شاذة أعلى الشعيرة العلوية).

---

### 12. التقطيع (`Binning`): فكرة عامة وخطواته

#### النص الأصلي يقول:
> "Perform a local smoothing for a data value by consulting its neighborhood. Binning is a top-down splitting technique. 1. The data values are first sorted. 2. data values are partitioned into a specified number of 'bins' by applying: Equal-width partitioning... Equal-depth (frequency) partitioning... 3. smooth (replace) each bin value by bin mean, bin median, or bin boundaries."

#### الشرح المبسّط:
`Binning` تقنية تنعيم "محلية" — تُصحَّح كل قيمة بالاعتماد على "جيرانها" (القيم القريبة منها) ضمن نفس المجموعة (`bin`). هي تقنية **تقسيم من الأعلى للأسفل** (`top-down splitting`)، بثلاث خطوات:
1. **ترتيب** القيم تصاعدياً أولاً.
2. **تقسيمها** لعدد محدَّد من "الصناديق" (`bins`) باستخدام إحدى طريقتين (متساوي العرض أو متساوي العمق، كما تعلّمنا في المحاضرة الثانية للمدرجات التكرارية، لكن هنا الهدف **التنعيم** وليس فقط العرض البياني):
   - `Equal-width partitioning`: يقسم مدى الصفة إلى N فترة **متساوية العرض**، حيث عرض كل فترة `W = (B − A) / N` (حيث A و B أصغر وأكبر قيمة).
   - `Equal-depth (frequency) partitioning`: يقسم المدى إلى N فترة تحتوي كل منها **نفس العدد التقريبي** من القيم.
3. **تنعيم (استبدال)** قيم كل صندوق بـ: **متوسط الصندوق** (`bin mean`)، **وسيط الصندوق** (`bin median`)، أو **حدود الصندوق** (`bin boundaries`, أي أقرب حد أدنى أو أعلى للصندوق).

#### 📐 المعادلة: عرض الفترة في `Equal-Width Partitioning`

$$
W = \frac{B - A}{N}
$$

**الشرح:**
> `A`: أصغر قيمة للصفة. `B`: أكبر قيمة للصفة. `N`: عدد الصناديق (bins) المطلوبة. `W`: عرض كل فترة (يكون ثابتاً لكل الصناديق).

---

### 13. مثال محسوب بالكامل: التقطيع بطرق مختلفة على صفة السعر

#### النص الأصلي يقول:
> "Example(1): Suppose the following data for the price attribute: 4, 8, 9, 15, 21, 21, 24, 25, 26, 28, 29, 34 (increasing order). Divide into three bins: Partition into equal-frequency (equi-depth) bins — Bin1: 4,8,9,15 / Bin2: 21,21,24,25 / Bin3: 26,28,29,34. Smoothing by bin means: Bin1: 9,9,9,9 / Bin2: 23,23,23,23 / Bin3: 29,29,29,29. Smoothing by bin boundaries: Bin1: 4,4,4,15 / Bin2: 21,21,25,25 / Bin3: 26,26,26,34."

#### الشرح المبسّط:
تطبيق كامل خطوة بخطوة على بيانات: `4, 8, 9, 15, 21, 21, 24, 25, 26, 28, 29, 34` (12 قيمة، مرتّبة مسبقاً) مقسَّمة إلى **3 صناديق** بطريقة **متساوية العمق (equi-depth)**:

#### ⚙️ الخطوات / الخوارزمية: التقطيع بطريقة Equal-Depth والتنعيم
```algorithm
1 | ترتيب القيم | فرز تصاعدي | 4,8,9,15,21,21,24,25,26,28,29,34 (مرتّبة مسبقاً)
2 | التقسيم لـ3 صناديق متساوية العمق | كل صندوق 4 قيم | Bin1={4,8,9,15}, Bin2={21,21,24,25}, Bin3={26,28,29,34}
3 | التنعيم بمتوسط الصندوق | حساب متوسط كل صندوق واستبدال كل قيمه به | Bin1→{9,9,9,9}, Bin2→{23,23,23,23}, Bin3→{29,29,29,29}
4 | التنعيم بحدود الصندوق (بديل) | استبدال كل قيمة بأقرب حد (الأدنى أو الأعلى) لصندوقها | Bin1→{4,4,4,15}, Bin2→{21,21,25,25}, Bin3→{26,26,26,34}
```
#### نقاط التنفيذ:
- في التنعيم بمتوسط الصندوق: متوسط Bin1 = (4+8+9+15)/4 = 36/4 = **9**. متوسط Bin2 = (21+21+24+25)/4 = 91/4 = **22.75 ≈ 23**. متوسط Bin3 = (26+28+29+34)/4 = 117/4 = **29.25 ≈ 29**.
- في التنعيم بحدود الصندوق: كل قيمة تُستبدَل **بأقرب حد لها** (الأدنى أو الأعلى للصندوق)؛ في Bin1، القيم 4,8,9 أقرب لـ4 (الحد الأدنى) بينما 15 هي الحد الأعلى نفسه فتبقى 15.

**النتيجة:** التنعيم يقلّل التفاصيل الدقيقة (الضوضاء المحتملة) بينما يحافظ على الاتجاه العام للبيانات ضمن كل صندوق.

#### 🔍 تتبّع التنفيذ: التقطيع بطريقة Equal-Width لنفس بيانات السعر

**المدخل:** `4, 8, 9, 15, 21, 21, 24, 25, 26, 28, 29, 34` (A=4، B=34، N=3)

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب عرض الفترة W | W = (34-4)/3 = 30/3 = 10 |
| 2 | تحديد حدود الفترات | [4,14), [14,24), [24,34] تقريباً |
| 3 | توزيع القيم على الفترات | Bin1: {4,8,9} / Bin2: {15,21,21} / Bin3: {24,25,26,28,29,34} |

**النتيجة:** بعكس `Equal-depth` (حيث كل صندوق 4 قيم بالضبط)، هنا حجم الصناديق **متفاوت جداً** (3، 3، 6 قيم على التوالي) لأن التقسيم يعتمد على **مدى القيم** لا على عددها — وهذا يوضّح عملياً الفرق الجوهري بين الطريقتين.

---

### 14. مثال إضافي: التقطيع على بيانات مختلفة (N=3)

#### النص الأصلي يقول:
> "Example(2): Equal frequency: Input: [5, 10, 11, 13, 15, 35, 50, 55, 72, 92, 204, 215]. Output: [5,10,11,13], [15,35,50,55], [72,92,204,215]. Equal Width: Input: same. Output: [5,10,11,13,15,35,50,55,72], [92], [204,215]."

#### الشرح المبسّط:
مثال إضافي يوضّح الفرق بشكل صارخ جداً: 12 قيمة نفسها `[5,10,11,13,15,35,50,55,72,92,204,215]` مقسَّمة لـ3 صناديق.
- **Equal frequency (equi-depth):** كل صندوق فيه بالضبط 4 قيم (توزيع متساوٍ من ناحية العدد): `[5,10,11,13]`, `[15,35,50,55]`, `[72,92,204,215]`.
- **Equal width:** بما أن أكبر قيمة (215) بعيدة جداً عن أصغر قيمة (5)، فإن عرض الفترة الواحدة كبير جداً (W=(215-5)/3=70)، مما يجعل **الصندوق الأول يحتوي 9 قيم** بينما **الصندوق الثاني قيمة واحدة فقط** (92) و**الثالث قيمتين** (204, 215)!

**لماذا هذا الفارق الصارخ مهم؟** لأنه يوضّح بوضوح شديد أن `Equal-width` **حساس جداً للقيم الشاذة/المتباعدة** (كالقيمتين 204 و215 هنا اللتين "تمددان" المدى الكلي بشكل كبير)، بينما `Equal-depth` **يوزّع التمثيل بالتساوي** بغض النظر عن مدى تباعد القيم.

#### مهم للامتحان ⚠️:
> هذا المثال (5,10,11,...215) كلاسيكي لتوضيح متى تفشل طريقة `Equal-width` (عند وجود قيم متباعدة جداً) — احفظ الفكرة العامة: `Equal-width` يهتم بـ"المسافة"، `Equal-depth` يهتم بـ"العدد".

---

### 15. الدمج ذو التكامل (`Data Integration`): الفكرة والتكرارية

#### النص الأصلي يقول:
> "Careful integration can help reduce and avoid redundancies and inconsistencies in the resulting dataset. An attribute may be redundant: can be 'derived' from another attribute or set of attributes E.g., annual revenue. Inconsistencies in attribute naming E.g., customer_id & cust_id. Some redundancies can be detected by correlation analysis (Bivariate analysis): Given two attributes X1 & X2, such analysis can measure how strongly they are correlated."

#### الشرح المبسّط:
الدمج الدقيق (`careful integration`) لمصادر بيانات متعددة يساعد في **تقليل وتجنّب** التكرار (`redundancy`) والتناقضات في مجموعة البيانات الناتجة. صفة قد تكون **مكرِّرة (redundant)** لسببين:
1. يمكن **اشتقاقها** من صفة أو مجموعة صفات أخرى (مثال: "الإيراد السنوي" يمكن اشتقاقه من جمع الإيرادات الشهرية).
2. **تناقضات في تسمية الصفات** نفسها عبر مصادر مختلفة (مثال: `customer_id` في مصدر و`cust_id` في مصدر آخر يمثّلان نفس المفهوم).

يمكن اكتشاف بعض هذه التكرارات عبر **تحليل الارتباط** (`correlation analysis`, وهو تحليل ثنائي `Bivariate` كما تعلّمنا في المحاضرة الثانية): يقيس مدى قوة الارتباط بين صفتين X1 وX2 (أو مدى "استلزام" إحداهما للأخرى).

- للصفات **الاسمية** (`Nominal`/`Categorical`): اختبار **χ² (Chi-Square)**.
- للصفات **الرقمية** (`Numeric`): **معامل الارتباط** (`correlation coefficient`) أو **التغاير** (`covariance`).

---

### 16. اختبار χ² (Chi-Square) للصفات الاسمية: الفكرة وجدول الطوارئ

#### النص الأصلي يقول:
> "The chi-square (χ2) tests the hypothesis that two categorical attributes A & B are independent (no relationship between them). If the hypothesis can be rejected, then we say that A and B are correlated. use a contingency table that summarizes the data tuples described by the attributes A={a1,...ac} & B={b1,...br}: The c values of A making up the columns. The r values of B making up the rows. Each cell (Ai, Bj) denote the joint event."

#### الشرح المبسّط:
اختبار `χ²` يفحص **فرضية العدم (`null hypothesis`)** القائلة بأن صفتين اسميتين A وB **مستقلتان تماماً** (لا توجد علاقة بينهما). إن استطعنا **رفض** هذه الفرضية، نقول أن A وB **مترابطتان (correlated)**.

طريقة الحساب: نبني **جدول طوارئ (`contingency table`)** يلخّص البيانات، حيث قيم A تشكّل الأعمدة (c عمود) وقيم B تشكّل الصفوف (r صف)، وكل خلية `(Ai, Bj)` تمثّل "الحدث المشترك" (`joint event`) لظهور القيمتين معاً.

**مثال المحاضرة:** صفتا `gender` (male/female) و`preferred reading` (fiction/non-fiction) لمجموعة 1500 شخص.

---

### 17. صيغة χ² والتكرار المتوقَّع

#### النص الأصلي يقول:
> "The χ² value: χ² = Σᵢ Σⱼ (Oᵢⱼ − eᵢⱼ)² / eᵢⱼ. Where: Oᵢⱼ is the observed frequency of the joint event. eᵢⱼ is the expected frequency, computed as: eᵢⱼ = count(A=aᵢ) × count(B=bⱼ) / n. E.g., the expected frequency for the cell (male, fiction): e₁₁ = count(male) × count(fiction) / n = 300×450/1500 = 90."

#### الشرح المبسّط:
صيغة `χ²` تقارن **التكرار الفعلي المُلاحَظ** (`Observed, O`) بـ**التكرار المتوقَّع نظرياً** (`Expected, e`) لو كانت الصفتان مستقلتين تماماً إحصائياً.

**كيف يُحسَب التكرار المتوقَّع؟** بضرب مجموع الصف في مجموع العمود المقابلَين، مقسوماً على العدد الكلي `n`. مثال محسوب: التكرار المتوقَّع لخلية (male, fiction) = (عدد الذكور × عدد قرّاء الخيال) / إجمالي العدد = (300 × 450) / 1500 = **90**.

**لماذا هذه الصيغة منطقية؟** لأنها تمثّل **بالضبط** ما "نتوقعه" لو لم تكن هناك أي علاقة بين الجنس ونوع القراءة المفضّل — أي أن نسبة قرّاء الخيال بين الذكور يجب أن تساوي نفس النسبة العامة في كامل العينة، لو كان الجنس لا يؤثر إطلاقاً على تفضيل القراءة.

#### 📐 المعادلة: اختبار χ² والتكرار المتوقَّع

$$
\chi^2 = \sum_{i=1}^{c}\sum_{j=1}^{r} \frac{(O_{ij} - e_{ij})^2}{e_{ij}} \qquad e_{ij} = \frac{count(A=a_i) \times count(B=b_j)}{n}
$$

**الشرح:**
> `Oij`: التكرار الفعلي (الملاحَظ) للحدث المشترك (قيمة `ai` من A مع قيمة `bj` من B). `eij`: التكرار المتوقَّع لنفس الحدث لو كانت A وB مستقلتين. `n`: العدد الكلي للسجلات. كلما زاد الفرق بين `O` و`e`، زادت قيمة `χ²`، مما يدل على ارتباط أقوى.

---

### 18. مثال χ² محسوب بالكامل: الجنس مقابل نوع القراءة

#### النص الأصلي يقول:
> "Suppose that a group of 1500 people was surveyed... The observed frequencies are summarized in the following contingency table, and the numbers in parentheses are the expected frequencies. By computing the χ² value we get χ²=(250-90)²/90+(50-210)²/210+(200-360)²/360+(1000-840)²/840=507.93. The χ² value needed to reject the hypothesis is 10.828. → Since our computed value is above this, the two attributes are (strongly) correlated."

#### الشرح المبسّط:
البيانات: 1500 شخص، جدول الطوارئ (بين قوسين التكرار المتوقَّع):

| | male | female | Total |
| --- | --- | --- | --- |
| fiction | 250 (90) | 200 (360) | 450 |
| non_fiction | 50 (210) | 1000 (840) | 1050 |
| Total | 300 | 1200 | 1500 |

#### ⚙️ الخطوات / الخوارزمية: حساب χ² وتفسير النتيجة
```algorithm
1 | حساب درجات الحرية | (r-1)×(c-1) | (2-1)×(2-1) = 1
2 | حساب مساهمة كل خلية | (O-e)²/e لكل خلية | (250-90)²/90=284.4، (50-210)²/210=121.9، (200-360)²/360=71.1، (1000-840)²/840=30.5
3 | جمع كل المساهمات | Σ لكل الخلايا | 284.4+121.9+71.1+30.5 ≈ 507.93
4 | تحديد القيمة الحرجة | من جدول χ² عند p=0.05 ودرجة حرية=1 | القيمة الحرجة = 10.828 (عند p=0.001 تحديداً في هذا المثال)
5 | المقارنة واتخاذ القرار | مقارنة القيمة المحسوبة بالحرجة | 507.93 > 10.828 → رفض فرضية الاستقلالية
```
#### نقاط التنفيذ:
- بما أن القيمة المحسوبة (507.93) **أكبر بكثير جداً** من القيمة الحرجة (10.828)، **نرفض** فرضية أن الجنس ونوع القراءة **مستقلان**.
- الاستنتاج: الصفتان **مترابطتان بقوة** (`strongly correlated`) لهذه المجموعة من الأشخاص.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لو كانت القيمة المحسوبة لـχ² أصغر من القيمة الحرجة (مثلاً 5 بدلاً من 507.93)، ماذا سيكون الاستنتاج؟
> **لماذا هذا مهم؟** لأنه يوضّح المنطق العكسي: عدم القدرة على رفض فرضية الاستقلالية يعني أنه **لا يوجد دليل كافٍ** على وجود ارتباط، وليس بالضرورة "إثباتاً" على الاستقلال التام.

---

### 19. جدول القيم الحرجة لـχ²

#### النص الأصلي يقول:
> "How do we interpret the computed value? Using the table of critical values, the test value is based on our desired confidence level (e.g., 95% → p=0.05) with the degree of freedom=(r-1)×(c-1). if our computed value is above this, we can reject the hypothesis."

#### الشرح المبسّط:
لتفسير القيمة المحسوبة، نحتاج **جدول القيم الحرجة** الإحصائي القياسي، مع تحديد:
- **مستوى الثقة المطلوب** (مثال: 95% ثقة ↔ `p = 0.05`).
- **درجات الحرية (`degrees of freedom`)** = `(r-1) × (c-1)` حيث r وc عدد الصفوف والأعمدة في جدول الطوارئ.

إن كانت القيمة المحسوبة **أعلى** من القيمة الحرجة المقابلة في الجدول، يمكننا **رفض فرضية الاستقلالية** بثقة.

---

### 20. معامل الارتباط لبيرسون للصفات الرقمية

#### النص الأصلي يقول:
> "Correlation coefficient (also called Pearson's correlation coefficient) measures the linear association between two numeric attributes, A and B: rA,B = Σ(ai−Ā)(bi−B̄) / (nσAσB) = [Σ(aibi) − nĀB̄] / (nσAσB). Where: n is the number of tuples. ai and bi are the respective values of A and B in tuple i. Ā and B̄ are the respective mean values. σA and σB are the respective standard deviations."

#### الشرح المبسّط:
`معامل ارتباط بيرسون` (`Pearson's correlation coefficient`) يقيس **مدى الترابط الخطي** بين صفتين رقميتين A وB. الصيغة تعتمد على انحراف كل قيمة عن متوسطها (لكلا الصفتين معاً)، مقسومة على حاصل ضرب انحرافيهما المعياريين (وعدد النقاط).

#### 📐 المعادلة: معامل ارتباط بيرسون

$$
r_{A,B} = \frac{\sum_{i=1}^{n}(a_i - \bar{A})(b_i - \bar{B})}{n\,\sigma_A\,\sigma_B}
$$

**الشرح:**
> `n`: عدد الأزواج (السجلات). `ai, bi`: قيمتا A وB في السجل رقم i. `Ā, B̄`: متوسطا A وB. `σA, σB`: الانحرافان المعياريان لـ A وB. الناتج `rA,B` يقع دائماً بين -1 و+1.

---

### 21. تفسير قيمة معامل الارتباط

#### النص الأصلي يقول:
> "value range: -1 ≤ rA,B ≤ +1. rA,B > 0, A and B are positively correlated i.e., the values of A increase as the values of B increase. rA,B = 0, A and B are independent and there is no correlation between them. rAB < 0, A and B are negatively correlated i.e., the values of A increase as the values of B decrease. Scatter plots can also be used to view correlations."

#### الشرح المبسّط:
مدى القيمة `[-1, +1]` له تفسير مباشر:

| القيمة | التفسير | المعنى |
| --- | --- | --- |
| `rA,B > 0` | ارتباط موجب (`positively correlated`) | تزداد قيم A مع ازدياد قيم B |
| `rA,B = 0` | مستقلتان (`independent`) | لا يوجد ارتباط خطي بينهما |
| `rA,B < 0` | ارتباط سالب (`negatively correlated`) | تزداد قيم A مع تناقص قيم B |

كلما اقتربت القيمة المطلقة من 1 (سواء +1 أو -1)، كان الارتباط **الخطي أقوى**. يمكن أيضاً استخدام **مخططات الانتشار (`Scatter plots`)** لعرض هذه الارتباطات بصرياً — كلما كانت النقاط أقرب لخط مستقيم، كان الارتباط أقوى.

#### 💡 التشبيه:
> علاقة الطول بالوزن عادة ارتباط موجب (كلما زاد الطول زاد الوزن عموماً)، بينما علاقة درجة الحرارة الخارجية بمبيعات معاطف الشتاء عادة ارتباط سالب (كلما ارتفعت الحرارة قلّت مبيعات المعاطف).
> **وجه الشبه:** تزايد المتغيّرين معاً = ارتباط موجب، تزايد أحدهما مع تناقص الآخر = ارتباط سالب.

---

### 22. مثال محسوب بالكامل: معامل الارتباط بين درجة الحرارة ومبيعات الآيس كريم

#### النص الأصلي يقول:
> "Example: Ice Cream Sales. Suppose a local ice cream shop keeps track of how much ice cream they sell versus the temperature on that day... [table of 12 days]... calculating means, subtracting mean, computing a×b, a², b², summing up: Σ(a×b)=5325, Σa²=177.0, Σb²=174,757 → r = 5325/√(177.0×174,757) = 0.9575."

#### الشرح المبسّط:
بيانات 12 يوماً: درجة الحرارة (°C) ومبيعات الآيس كريم ($). خطوات الحساب العملي (كما في المخطط بالمحاضرة):

#### ⚙️ الخطوات / الخوارزمية: حساب معامل ارتباط بيرسون خطوة بخطوة
```algorithm
1 | حساب المتوسطين | Ā للحرارة، B̄ للمبيعات | Ā ≈ 18.7°C، B̄ ≈ $402
2 | طرح المتوسط من كل قيمة | a = ai - Ā، b = bi - B̄ | عمودان جديدان "a" و"b" للانحرافات
3 | حساب حاصل الضرب والمربعات | a×b، a²، b² لكل صف | أعمدة إضافية لكل يوم
4 | الجمع الكلي | Σ(a×b)، Σa²، Σb² | Σ(a×b)=5,325، Σa²=177.0، Σb²=174,757
5 | تطبيق الصيغة النهائية | r = Σ(ab) / √(Σa² × Σb²) | r = 5,325 / √(177.0 × 174,757) = 5,325/5,562.5 ≈ 0.9575
```
#### نقاط التنفيذ:
- القيمة النهائية `r ≈ 0.9575` قريبة جداً من +1، أي **ارتباط موجب قوي جداً** بين درجة الحرارة ومبيعات الآيس كريم — منطقي تماماً (كلما ارتفعت الحرارة، زادت رغبة الناس بشراء الآيس كريم).
- لاحظ أن الصيغة المستخدمة هنا `r = Σ(ab)/√(Σa² × Σb²)` هي شكل مكافئ رياضياً للصيغة الأصلية (بعد تبسيط قسمة `n` من البسط والمقام مع تعريف σ عبر الجذر التربيعي لمتوسط المربعات).

---

### 23. الإحصاء متعدد المتغيرات: مصفوفة الارتباط بـ`pandas`

#### النص الأصلي يقول:
> "Example (back to Iris sample data): pandas.DataFrame.cov/corr Compute the pairwise covariance/Correlation between pairs of attributes of a DataFrame. The returned data frame is the covariance/Correlation matrix of the columns of the DataFrame."

#### الشرح المبسّط:
بدلاً من حساب الارتباط بين زوج واحد من الصفات يدوياً، يمكن لدالة واحدة في `pandas` حساب **مصفوفة ارتباط كاملة** بين كل أزواج الصفات الرقمية دفعة واحدة — هذا مثال على `Multivariate Statistics` (تحليل أكثر من صفتين معاً).

#### 💻 الكود: حساب مصفوفة الارتباط لبيانات Iris

```python
print('Correlation:')
data.corr(numeric_only=True)
```

**الناتج المتوقع:**
> مصفوفة 4×4 (لصفات Iris الأربع الرقمية)، حيث القطر الرئيسي دائماً = 1.000000 (ارتباط أي صفة مع نفسها كامل)، وباقي الخلايا تُظهر: `petal length` و`petal width` مرتبطان بقوة موجبة جداً (≈0.96)، بينما `sepal width` مرتبطة سلبياً قليلاً مع باقي الصفات (≈-0.1 إلى -0.42).

---

### 24. تحذير مهم: الارتباط لا يعني السببية

#### النص الأصلي يقول:
> "'correlation does not imply causality'. That is, if A and B are correlated, this does not necessarily imply that A causes B or that B causes A. E.g., if two attributes are correlated such as number_of_hospitals and number_of_car_thefts in a region. This does not mean that one causes the other. Both are actually causally linked to a third attribute, namely, population."

#### الشرح المبسّط:
قاعدة إحصائية جوهرية يجب عدم نسيانها: **"الارتباط لا يعني السببية"** (`correlation does not imply causality`). وجود ارتباط قوي بين A وB **لا يعني بالضرورة** أن A يسبّب B أو العكس.

**مثال كلاسيكي:** عدد المستشفيات (`number_of_hospitals`) وعدد سرقات السيارات (`number_of_car_thefts`) في منطقة ما قد يكونان **مرتبطَين إحصائياً** بقوة، لكن هذا **لا يعني** أن أحدهما يسبّب الآخر — كلاهما في الحقيقة مرتبط سببياً بمتغيّر ثالث خفي: **عدد السكان** (`population`) في تلك المنطقة (المدن الأكبر سكاناً لديها مستشفيات أكثر **وأيضاً** سرقات سيارات أكثر، لأسباب مستقلة عن بعضهما).

#### مهم للامتحان ⚠️:
> هذا من أكثر المفاهيم التي يُختبَر فيها الطلاب بأسئلة تطبيقية/سيناريو — احفظ مثال `hospitals`/`car_thefts`/`population` تحديداً كمثال جاهز للشرح.

---

### 25. البيانات المكرّرة (`Duplicate Data`) واكتشافها

#### النص الأصلي يقول:
> "To check for duplicate instances in the breast cancer dataset. The duplicated() function will return a Boolean array that indicates whether each row is a duplicate of a previous row in the table. The results suggest there are 236 duplicate rows in the dataset. For example, the instance with row index 11 has identical attribute values as the instance with row index 28."

#### الشرح المبسّط:
جزء من مهمة `Data Reduction`: اكتشاف السجلات **المكرَّرة تماماً** (نفس قيم كل الصفات) داخل مجموعة البيانات. دالة `duplicated()` في `pandas` تُرجع مصفوفة منطقية (`Boolean`) تُشير هل كل صف هو **تكرار لصف سابق** أم لا.

**نتيجة تطبيقها على بيانات سرطان الثدي:** اكتُشف **236 سجلاً مكرَّراً** من أصل 699! مثال محدَّد: السجل رقم 11 مطابق تماماً للسجل رقم 28.

#### 💻 الكود: اكتشاف السجلات المكرَّرة

```python
# Boolean array: True if a row is a duplicate of an earlier row
dups = data.duplicated()
print('Number of duplicate rows = %d' % (dups.sum()))

# Inspect the two specific duplicate rows mentioned in the lecture
data.loc[[11, 28]]
```

**الناتج المتوقع:**
> `Number of duplicate rows = 236`. وعرض الصفين 11 و28 يُظهر أنهما متطابقان تماماً في كل قيم الأعمدة.

---

### 26. حذف السجلات المكرّرة

#### النص الأصلي يقول:
> "how to remove the duplicated rows? Although such duplicate rows may correspond to samples for different individuals, in this hypothetical example, we assume that the duplicates are samples taken from the same individual." (with `drop_duplicates()`, resulting rows going from 699 to 463)

#### الشرح المبسّط:
**ملاحظة منهجية مهمة جداً:** السجلات المتطابقة تماماً **قد** تكون فعلاً لأشخاص مختلفين تماماً بالصدفة (خصوصاً مع صفات قليلة القيم الممكنة)! لكن في هذا المثال الافتراضي، **نفترض** أنها عيّنات مأخوذة من **نفس الشخص** (وبالتالي تكرار حقيقي يجب حذفه).

باستخدام `drop_duplicates()`: انخفض عدد السجلات من **699 إلى 463** (أي حُذف 236 سجلاً مكرَّراً بالضبط، مطابق تماماً لعدد السجلات المكتشفة سابقاً بـ`duplicated()`).

#### 💻 الكود: حذف السجلات المكرَّرة

```python
print('Number of rows before discarding duplicates = %d' % (data.shape[0]))

# Keep only the first occurrence of each duplicated set of rows
data2 = data.drop_duplicates()
print('Number of rows after discarding duplicates = %d' % (data2.shape[0]))
```

**الناتج المتوقع:**
> `Number of rows before discarding duplicates = 699` → `Number of rows after discarding duplicates = 463`.

#### مهم للامتحان ⚠️:
> يجب دائماً السؤال: "هل هذا التكرار **حقيقي فعلاً** (نفس الكائن مسجَّل مرتين) أم **مصادفة إحصائية** (كائنان مختلفان بنفس القيم)؟" قبل حذف أي سجل — القرار يعتمد على **سياق البيانات** وليس فقط على تطابق القيم رقمياً.

---

### 27. تحويل البيانات (`Data Transformation`): التعريف والاستراتيجيات

#### النص الأصلي يقول:
> "A function that maps the entire set of values of a given attribute to a new set of replacement values appropriate for mining task. each old value can be identified with one of the new values. Many data transformation strategies, include: Smoothing Techniques, Attribute construction, Aggregation or summary operations, Normalization, Discretization. There is much overlap between the major data preprocessing tasks. Smoothing is a form of data cleaning. Attribute construction and aggregation were on data reduction."

#### الشرح المبسّط:
`Data Transformation` هي دالة تُحوِّل كل قيم صفة معيّنة إلى **مجموعة قيم بديلة جديدة** مناسبة لمهمة التنقيب، بحيث كل قيمة قديمة تُطابَق بقيمة جديدة واحدة (تحويل واضح ومحدَّد).

استراتيجيات متعددة:
1. تقنيات التنعيم (`Smoothing`, مثل `Binning`).
2. بناء صفات جديدة (`Attribute construction`).
3. عمليات تجميع أو تلخيص (`Aggregation`).
4. **التطبيع (`Normalization`)** — سيُفصَّل بالتفصيل.
5. **التقطيع (`Discretization`)** — سيُفصَّل بالتفصيل.

**ملاحظة مهمة جداً:** توجد **تداخلات كبيرة** بين مهام المعالجة المسبقة الأربع؛ فمثلاً `Smoothing` هو أيضاً شكل من `Data Cleaning`، بينما `Attribute construction` و`Aggregation` تنتميان أيضاً لـ`Data Reduction`. هذا يوضّح أن الفئات الأربع ليست منفصلة تماماً بل **متكاملة ومتداخلة**.

---

### 28. لماذا نحتاج التطبيع (`Normalization`)؟

#### النص الأصلي يقول:
> "In general, expressing an attribute in smaller units will lead to a larger range and thus tend to give such an attribute greater effect or 'weight'. E.g., changing measurement units from meters to inches for height, or from kilograms to pounds for weight, may lead to very different results. To help avoid dependence on the choice of measurement units, the data should be normalized... Normalization is particularly useful for distance based mining algorithm such as neural networks, nearest-neighbor approach and clustering."

#### الشرح المبسّط:
مشكلة عملية مهمة: التعبير عن صفة بوحدات **أصغر** (مثال: الطول بالإنش بدلاً من المتر) يجعل **مدى قيمها أكبر رقمياً**، مما يمنحها **تأثيراً أو "وزناً" أكبر بشكل مصطنع** في أي خوارزمية تعتمد على المسافات أو المقارنات الرقمية المباشرة.

**الحل:** **تطبيع** (`normalize`) أو **توحيد** (`standardize`) البيانات، أي إعطاء كل الصفات **وزناً متساوياً** بتحويل قيمها لتقع ضمن مدى صغير وموحَّد مشترك، مثل `[-1, 1]` أو `[0.0, 1.0]`.

**متى يكون هذا مهماً بشكل خاص؟** في **الخوارزميات المعتمدة على المسافة** (`distance-based`) مثل الشبكات العصبية (`neural networks`)، `nearest-neighbor` (`kNN`)، و`Clustering` — لأن هذه الخوارزميات تحسب مسافات مباشرة بين نقاط البيانات، فأي صفة بمدى قيم أكبر ستُهيمن على حساب المسافة الكلي.

#### 💡 التشبيه:
> لو قارنّا شخصين بناءً على "العمر بالسنوات" (مدى 0-100) و"الدخل بالدولار" (مدى 0-1,000,000) بدون تطبيع، فإن فرق الدخل سيُهيمن تماماً على أي حساب "تشابه" بينهما، وكأن العمر لا وزن له إطلاقاً.
> **وجه الشبه:** الدخل بمداه الرقمي الهائل = صفة "تُسيطر" بلا تطبيع، العمر بمداه الصغير = صفة "تُهمَّش" ظلماً بلا تطبيع.

---

### 29. طريقة Min-Max Normalization

#### النص الأصلي يقول:
> "performs a linear transformation on the original data. A value, vi, of a numeric attribute A is normalized to vi′ in the range [new_minA, new_maxA] by computing: vi′ = (vi − minA)/(maxA − minA) × (new_maxA − new_minA) + new_minA. Example: Suppose that the minimum and maximum values for the income attribute are $12,000 and $98,000... By min-max normalization to range [0.0, 1.0], a value of $73,600 for income is transformed to (73,600−12,000)/(98,000−12,000) × (1.0−0)+0 = 0.716."

#### الشرح المبسّط:
`Min-Max Normalization` تُجري **تحويلاً خطياً** (`linear transformation`) بسيطاً: تُعيد رسم القيمة الأصلية من مداها القديم `[minA, maxA]` إلى مدى جديد مطلوب `[new_minA, new_maxA]` (غالباً `[0,1]`).

#### 📐 المعادلة: Min-Max Normalization

$$
v_i' = \frac{v_i - min_A}{max_A - min_A} \times (new\_max_A - new\_min_A) + new\_min_A
$$

**الشرح:**
> `vi`: القيمة الأصلية. `minA, maxA`: أصغر وأكبر قيمة أصلية للصفة A. `new_minA, new_maxA`: حدود المدى الجديد المطلوب (غالباً 0 و1). `vi'`: القيمة الجديدة بعد التطبيع.

#### 🔍 تتبّع التنفيذ: تطبيع قيمة دخل بطريقة Min-Max

**المدخل:** الدخل الأصلي = $73,600، `minA` = $12,000، `maxA` = $98,000، المدى الجديد = `[0.0, 1.0]`

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب البسط | vi - minA = 73,600 - 12,000 = 61,600 |
| 2 | حساب المقام | maxA - minA = 98,000 - 12,000 = 86,000 |
| 3 | قسمة البسط على المقام | 61,600 / 86,000 = 0.716 |
| 4 | ضرب بمدى الهدف الجديد | 0.716 × (1.0 - 0.0) = 0.716 |
| 5 | إضافة الحد الأدنى الجديد | 0.716 + 0 = **0.716** |

**النتيجة:** القيمة المطبَّعة = **0.716** (مطابقة تماماً لحساب المحاضرة).

---

### 30. طريقة Z-Score Normalization

#### النص الأصلي يقول:
> "useful when the actual minimum and maximum of a numeric attribute A are unknown, or when there are outliers that dominate the min-max normalization. A value, vi, of A is normalized to vi′ by computing: vi′ = (vi − Ā)/σA. Example: Suppose that the mean and standard deviation values for the income attribute are $54,000 and $16,000... a value of $73,600 for income is transformed to (73,600−54,000)/16,000 = 1.225."

#### الشرح المبسّط:
`Z-Score Normalization` مفيدة تحديداً عندما:
- الحد الأدنى/الأقصى الفعلي للصفة **غير معروف**.
- توجد **قيم شاذة (outliers)** تُهيمن وتُشوِّه نتيجة `Min-Max Normalization` (لأن outlier واحد متطرف جداً يُوسِّع المدى الكلي بشكل مصطنع ويضغط باقي القيم في نطاق ضيق جداً).

الصيغة تعتمد على **المتوسط والانحراف المعياري** بدلاً من الحد الأدنى/الأقصى.

#### 📐 المعادلة: Z-Score Normalization

$$
v_i' = \frac{v_i - \bar{A}}{\sigma_A}
$$

**الشرح:**
> `vi`: القيمة الأصلية. `Ā`: المتوسط الحسابي للصفة A. `σA`: الانحراف المعياري للصفة A. `vi'`: عدد الانحرافات المعيارية التي تبعد بها القيمة عن المتوسط (يمكن أن تكون سالبة).

#### 🔍 تتبّع التنفيذ: تطبيع قيمة دخل بطريقة Z-Score

**المدخل:** الدخل = $73,600، Ā = $54,000، σA = $16,000

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب الفرق عن المتوسط | 73,600 - 54,000 = 19,600 |
| 2 | القسمة على الانحراف المعياري | 19,600 / 16,000 = **1.225** |

**النتيجة:** القيمة المطبَّعة = **1.225** (مطابقة تماماً لحساب المحاضرة) — تعني أن هذا الدخل يبعد 1.225 انحراف معياري **فوق** المتوسط.

#### ⚖️ المقايضة: Min-Max مقابل Z-Score Normalization

| | Min-Max Normalization | Z-Score Normalization |
| --- | --- | --- |
| المزايا | بسيطة، تُنتج مدى محدَّد ومعروف مسبقاً ([0,1] مثلاً) | مقاومة أكثر للقيم الشاذة، لا تحتاج معرفة min/max الفعليين |
| العيوب | حساسة جداً للقيم الشاذة (outlier واحد يُغيّر min أو max بالكامل) | الناتج غير محدود بمدى ثابت معروف مسبقاً |
| متى تختاره | عند معرفة الحد الأدنى/الأقصى الحقيقيين وغياب قيم شاذة متطرفة | عند وجود قيم شاذة تهيمن، أو عدم معرفة الحدود الفعلية |

---

### 31. طريقة Decimal Scaling Normalization

#### النص الأصلي يقول:
> "normalizes by moving the decimal point of values of a numeric attribute A. A value, vi, of A is normalized to vi′ by computing: vi′ = vi/10^j, where j is the smallest integer such that Max(|vi′|) < 1. Example: Suppose that the recorded values of A range from -986 to 917. The maximum absolute value of A is 986. Therefore, we divide each value by 1000 (i.e., j=3). -986 normalizes to -0.986 and 917 normalizes to 0.917."

#### الشرح المبسّط:
`Decimal Scaling Normalization` تُطبِّع البيانات ببساطة عبر **تحريك الفاصلة العشرية** لكل القيم بنفس المقدار `j` (عدد صحيح)، حيث `j` هو **أصغر عدد صحيح** يجعل أكبر قيمة مطلقة بعد التطبيع **أقل من 1**.

#### 📐 المعادلة: Decimal Scaling Normalization

$$
v_i' = \frac{v_i}{10^j}
$$

**الشرح:**
> `vi`: القيمة الأصلية. `j`: أصغر عدد صحيح يحقق أن max(|vi'|) < 1. `vi'`: القيمة بعد تحريك الفاصلة العشرية.

#### 🔍 تتبّع التنفيذ: تطبيع بيانات تتراوح بين -986 و917

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تحديد أكبر قيمة مطلقة | max(\|-986\|, \|917\|) = 986 |
| 2 | تحديد j المناسب | نحتاج 986/10^j < 1 → j=3 (لأن 986/1000=0.986<1، بينما 986/100=9.86 غير مقبول) |
| 3 | تطبيع القيمة -986 | -986/1000 = **-0.986** |
| 4 | تطبيع القيمة 917 | 917/1000 = **0.917** |

**النتيجة:** كل القيم تُقسَم على 1000 (نفس `j` لكل القيم في نفس الصفة)، فتقع كلها ضمن المدى `[-1, +1]` تقريباً.

---

### 32. التقطيع والثنائية (`Discretization and Binarization`): الفرق الجوهري

#### النص الأصلي يقول:
> "Discretization: transform a numeric attribute into a categorical attribute. Some classification algorithms require that the data be in the form of categorical attributes. Binarization: transform both numeric and categorical attributes into one or more binary attributes. association analysis require that the data be in the form of binary attributes."

#### الشرح المبسّط:
مفهومان متكاملان لكن مختلفان تماماً في الاتجاه:

| العملية | الاتجاه | لماذا نحتاجها؟ |
| --- | --- | --- |
| `Discretization` (تقطيع) | تحويل صفة **رقمية → فئوية** | بعض خوارزميات `Classification` تتطلّب بيانات فئوية |
| `Binarization` (تحويل ثنائي) | تحويل صفة **رقمية أو فئوية → واحدة أو أكثر من الصفات الثنائية** | تحليل `Association Rules` يتطلّب بيانات بصيغة ثنائية |

**لماذا هذا التمييز مهم؟** لأن كل خوارزمية تنقيب لاحقة (Classification مقابل Association Rules) لها متطلبات مختلفة تماماً لصيغة البيانات المُدخَلة إليها.

---

### 33. التحويل الثنائي (`Binarization`): من فئوي إلى ثنائي عبر الترميز الثنائي

#### النص الأصلي يقول:
> "Conversion of a categorical attribute to binary attributes: uniquely assign each of original m categorical values to an integer in the interval [0,m−1]. If the attribute is ordinal, then order must be maintained by the assignment. Next, convert each of these m integers to a binary number using n=⌈log2 m⌉ binary attributes." (with example: awful=0(000), poor=1(001), OK=2(010), good=3(011), great=4(100))

#### الشرح المبسّط:
لتحويل صفة فئوية بها `m` قيمة مختلفة إلى صفات ثنائية:
1. نُخصِّص لكل قيمة فئوية عدداً صحيحاً فريداً في المجال `[0, m-1]` — **إن كانت الصفة ترتيبية (Ordinal)، يجب الحفاظ على الترتيب المنطقي** عند التخصيص (لا نُرتِّبها عشوائياً).
2. نُحوِّل كل عدد صحيح إلى تمثيل ثنائي باستخدام `n = ⌈log₂(m)⌉` صفة ثنائية.

**مثال المحاضرة:** صفة تقييم ترتيبية بـ5 قيم `{awful, poor, OK, good, great}` (m=5) → `n = ⌈log₂5⌉ = 3` صفات ثنائية `(x0, x1, x2)`:

| القيمة | العدد الصحيح | x0 | x1 | x2 |
| --- | --- | --- | --- | --- |
| awful | 0 | 0 | 0 | 0 |
| poor | 1 | 0 | 0 | 1 |
| OK | 2 | 0 | 1 | 0 |
| good | 3 | 0 | 1 | 1 |
| great | 4 | 1 | 0 | 0 |

**لماذا هذه الطريقة "اقتصادية"؟** لأنها تستخدم فقط 3 أعمدة ثنائية بدلاً من 5 (عمود واحد لكل قيمة)، بفضل الترميز الثنائي المضغوط.

---

### 34. التحويل الثنائي: الحالة غير المتماثلة (`Asymmetric Binarization`)

#### النص الأصلي يقول:
> "Conversion of a categorical attribute to asymmetric binary attributes. only the presence of the attribute (value=1) is important. Therefore, it is necessary to introduce one binary attribute for each categorical value. Likewise, it can be necessary to replace a single binary attribute with two asymmetric binary attributes. e.g., person's gender."

#### الشرح المبسّط:
في بعض الحالات، **فقط وجود القيمة (=1) هو المهم إحصائياً** (كما تعلّمنا في `Binary Asymmetric Attributes` بالمحاضرة الثانية). هنا **يجب** تخصيص **صفة ثنائية منفصلة كاملة لكل قيمة فئوية** (وليس ترميزاً مضغوطاً بـlog₂ كما سبق).

**مثال المحاضرة:** نفس تقييم 5 قيم، لكن بترميز `Asymmetric` — كل قيمة تحصل على عمودها الخاص بالكامل (5 أعمدة `x0...x4`)، وكل عمود = 1 فقط عند الحضور الفعلي لتلك القيمة تحديداً وإلا يبقى 0 في كل الأعمدة الأخرى.

| القيمة | x0 | x1 | x2 | x3 | x4 |
| --- | --- | --- | --- | --- | --- |
| awful | 1 | 0 | 0 | 0 | 0 |
| poor | 0 | 1 | 0 | 0 | 0 |
| OK | 0 | 0 | 1 | 0 | 0 |
| good | 0 | 0 | 0 | 1 | 0 |
| great | 0 | 0 | 0 | 0 | 1 |

كما يمكن أيضاً استبدال **صفة ثنائية واحدة** بصفتين ثنائيتين غير متماثلتين منفصلتين — مثال: صفة "جنس الشخص" (gender) قد تُقسَّم لصفتين منفصلتين `is_male` و`is_female` بدلاً من عمود واحد.

#### الفهم الخاطئ الشائع ❌: التحويل الثنائي دائماً يستخدم أقل عدد ممكن من الأعمدة (log2 m).
#### الفهم الصحيح ✅: هذا صحيح فقط في الحالة العامة/المتماثلة؛ في الحالة **غير المتماثلة** (Asymmetric)، يجب استخدام عمود منفصل كامل لكل قيمة (m عمود، ليس log2 m).

---

### 35. التقطيع (`Discretization`): من رقمي إلى فئوي مع التسلسلات الهرمية المفاهيمية

#### النص الأصلي يقول:
> "Transform a numeric attribute into a categorical attribute: 1. Divide the range of a numeric attribute (e.g., age) into interval labels (e.g., 0–10, 11–20, etc.) or conceptual labels (e.g., youth, adult, senior). 2. labels can then be used to replace actual data values. The labels, in turn, can be recursively organized into higher-level concepts, resulting in a concept hierarchy for the numeric attribute. Allows for mining at multiple abstraction levels. More than one concept hierarchy can be defined for the same attribute."

#### الشرح المبسّط:
تحويل صفة رقمية (كالعمر) إلى فئوية عبر خطوتين:
1. تقسيم مدى الصفة الرقمية إلى **تسميات فترات** (`interval labels`, مثل 0-10، 11-20) أو **تسميات مفاهيمية** (`conceptual labels`, مثل شاب، بالغ، مسنّ).
2. استبدال القيم الفعلية بهذه التسميات.

يمكن تنظيم هذه التسميات **بشكل هرمي متكرر** لتشكيل **تسلسل هرمي مفاهيمي** (`concept hierarchy`) للصفة الرقمية، مما يسمح بالتنقيب على **مستويات تجريد متعددة** (مثال: تحليل حسب "العقد الزمني" ثم تجميعه لاحقاً حسب "الفئة العمرية العريضة"). يمكن أيضاً تعريف **أكثر من تسلسل هرمي واحد** لنفس الصفة لتلبية احتياجات مختلفة.

> ملاحظة من المحاضرة: **التقطيع وبناء التسلسل الهرمي المفاهيمي هما أيضاً شكلان من `Data Reduction`** (تقليل عدد القيم الفريدة الممكنة للصفة).

---

### 36. تطبيق عملي: التقطيع بطريقتين على صفة `Clump Thickness`

#### النص الأصلي يقول:
> "two simple but widely-used discretization methods (equal width and equal depth) applied to the 'Clump Thickness' attribute of the breast cancer dataset. For the equal width method, we can apply the cut() function to discretize the attribute into 4 bins of similar interval widths. For the equal frequency method, the qcut() function can be used to partition the values into 4 bins such that each bin has nearly the same number of instances."

#### الشرح المبسّط:
تطبيق عملي حقيقي على عمود `Clump Thickness` من بيانات سرطان الثدي، بطريقتين:
- **Equal width:** باستخدام دالة `pd.cut()` لتقسيم القيم إلى 4 فترات **متساوية العرض**.
- **Equal frequency (equi-depth):** باستخدام دالة `pd.qcut()` لتقسيم القيم إلى 4 فترات تحتوي كل منها **نفس العدد التقريبي** من السجلات.

#### 💻 الكود: تقطيع صفة `Clump Thickness` بطريقتين

```python
# Equal-width discretization into 4 bins using cut()
bins_width = pd.cut(data['Clump Thickness'], 4)
print(bins_width.value_counts(sort=False))

# Equal-frequency (equi-depth) discretization into 4 bins using qcut()
bins_depth = pd.qcut(data['Clump Thickness'], 4)
print(bins_depth.value_counts(sort=False))
```

#### شرح كل سطر:
1. `pd.cut(data['Clump Thickness'], 4)` → تقسيم مدى القيم لـ4 فترات **متساوية العرض** حسابياً.
2. `.value_counts(sort=False)` → عدّ عدد السجلات في كل فترة، بدون إعادة ترتيبها حسب التكرار (نُبقيها بترتيب الفترات).
3. `pd.qcut(data['Clump Thickness'], 4)` → تقسيم القيم لـ4 فترات، كل منها تحتوي **~25% من السجلات** تقريباً (Equal frequency).

**الناتج المتوقع (Equal width):**
> فترات غير متساوية بالعدد: `(0.991, 3.25]`: 303 سجل، `(3.25, 5.5]`: 210، `(5.5, 7.75]`: 57، `(7.75, 10.0]`: 129 — لاحظ التفاوت الكبير في عدد السجلات رغم تساوي عرض الفترات.

#### مهم للامتحان ⚠️:
> نتيجة `Equal width` هنا (303, 210, 57, 129) تُبرهن عملياً أن معظم قيم `Clump Thickness` **متمركزة في الفترة الأولى** (توزيع منحرف)، بينما `Equal frequency` كانت ستُعطي ~175 سجلاً تقريباً في كل فترة — فرق عملي واضح بين الطريقتين.

---

## 📌 الأفكار الرئيسية الشاملة للمحاضرة

1. جودة البيانات (`Accuracy, Completeness, Consistency, Timeliness, Believability, Interpretability`) هي أساس نجاح أي تنقيب لاحق.
2. البيانات "القذرة" ثلاثة أنواع: غير دقيقة/مشوَّشة، ناقصة، غير متّسقة — لكل منها أسباب ومعالجات مختلفة.
3. أربع مهام رئيسية للمعالجة المسبقة: `Cleaning`, `Integration`, `Reduction`, `Transformation` — بتداخل كبير بينها.
4. القيم المفقودة: من التجاهل البسيط إلى التعويض الذكي بالوسيط/المتوسط/الفئة/الانحدار.
5. `Binning` تقنية تنعيم محلية: `Equal-width` (حساس للقيم المتباعدة) مقابل `Equal-depth` (يوزّع بالتساوي عددياً).
6. اختبار `χ²` يفحص استقلالية صفتين اسميتين عبر مقارنة التكرار الملاحَظ بالمتوقَّع؛ `correlation coefficient` يقيس الترابط الخطي بين صفتين رقميتين.
7. "الارتباط لا يعني السببية" — قاعدة إحصائية جوهرية (مثال hospitals/car_thefts/population).
8. السجلات المكرَّرة يجب فحصها بحذر: تكرار حقيقي أم تشابه مصادفة؟
9. التطبيع (`Min-Max`, `Z-Score`, `Decimal Scaling`) يمنع هيمنة الصفات ذات المدى الرقمي الأكبر، ومهم خصوصاً للخوارزميات المعتمدة على المسافة.
10. `Discretization` (رقمي→فئوي) و`Binarization` (رقمي/فئوي→ثنائي) عمليتان مختلفتان تماماً حسب متطلبات الخوارزمية اللاحقة.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Missing Data` | غياب قيمة أو صفة كاملة | حقل الوزن الفارغ |
| `Noisy Data` | قيم خاطئة أو غير متوقَّعة إحصائياً | راتب = -10K، راتب = 100K وسط [30K-50K] |
| `Inconsistent Data` | قيم متناقضة منطقياً ضمن نفس السجل | Age=42 مع Birthday=2010 |
| `Binning` | تقسيم القيم المرتَّبة إلى صناديق وتنعيمها | Equal-width, Equal-depth |
| `χ² test` | اختبار استقلالية صفتين اسميتين | Gender vs Reading preference |
| `Correlation Coefficient` | قياس الترابط الخطي بين صفتين رقميتين | Temperature vs Ice Cream Sales |
| `Duplicate Data` | سجلات متطابقة تماماً في كل القيم | 236 سجل مكرَّر في بيانات سرطان الثدي |
| `Normalization` | تحويل القيم لمدى موحَّد صغير | Min-Max, Z-Score, Decimal Scaling |
| `Discretization` | تحويل صفة رقمية إلى فئوية | العمر → {شاب، بالغ، مسنّ} |
| `Binarization` | تحويل صفة (رقمية/فئوية) إلى ثنائية | تقييم 5 فئات → 3 أعمدة ثنائية |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `data.replace('?', np.NaN)` | تحويل رمز قيمة مفقودة مخصَّص إلى NaN القياسي | خطوة أولى قبل أي معالجة |
| `data[col].isna().sum()` | عدّ القيم المفقودة في عمود | اكتشاف مكان المشكلة |
| `data[col].fillna(data[col].median())` | تعويض القيم المفقودة بالوسيط | طريقة شائعة للصفات المنحرفة |
| `data.dropna()` | حذف كل سجل به قيمة مفقودة | بديل عن التعويض |
| `data.duplicated()` | اكتشاف السجلات المكرَّرة | يُرجع Boolean array |
| `data.drop_duplicates()` | حذف السجلات المكرَّرة | يُبقي أول ظهور فقط |
| `data.corr(numeric_only=True)` | مصفوفة الارتباط بين كل الصفات الرقمية | تحليل متعدد المتغيرات |
| `pd.cut(col, N)` | تقطيع Equal-width لـN فترة | فترات متساوية العرض |
| `pd.qcut(col, N)` | تقطيع Equal-frequency لـN فترة | فترات متساوية العدد تقريباً |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| Binning | `Equal-width` | `Equal-depth` | الأول يقسم حسب المدى (حساس لل outliers)، الثاني يقسم حسب العدد |
| Correlation | `χ² test` (Nominal) | `Pearson's r` (Numeric) | نوع الصفة المستخدَمة (فئوية مقابل رقمية) |
| Normalization | `Min-Max` | `Z-Score` | الأول يعتمد min/max (حساس للشواذ)، الثاني يعتمد mean/σ (أكثر مقاومة) |
| Transformation | `Discretization` | `Binarization` | الأول رقمي→فئوي، الثاني رقمي/فئوي→ثنائي |
| Missing Data | التجاهل/الحذف | التعويض الآلي | فقدان بيانات مقابل الحفاظ عليها بقيمة مقدَّرة |

### قاموس المصطلحات (Glossary)

| الفئة | المصطلحات |
| --- | --- |
| جودة البيانات | `Accuracy`, `Completeness`, `Consistency`, `Timeliness`, `Believability`, `Interpretability` |
| أنواع البيانات القذرة | `Inaccurate/Noisy`, `Incomplete/Missing`, `Inconsistent` |
| معالجة القيم المفقودة | `Ignore tuple`, `Ignore value`, `Eliminate attribute`, `Fill manually`, `Fill automatically` (global constant, central tendency, class-based, most probable value) |
| تنعيم الضوضاء | `Binning` (Equal-width, Equal-depth, bin mean/median/boundaries), `Regression`, `Clustering`, `Combined inspection` |
| تحليل الدمج | `Correlation Analysis`, `χ² test`, `Contingency Table`, `Observed/Expected Frequency`, `Correlation Coefficient`, `Covariance` |
| تقليل البيانات | `Duplicate Data`, `duplicated()`, `drop_duplicates()` |
| تحويل البيانات | `Normalization` (Min-Max, Z-Score, Decimal Scaling), `Discretization`, `Binarization`, `Concept Hierarchy` |

### أبرز النقاط الذهبية
1. جودة البيانات محكومة بستة عوامل، ليس فقط "وجود بيانات أو غيابها".
2. اختيار طريقة تعويض القيم المفقودة يعتمد على شكل التوزيع (متماثل/منحرف) ونوع الصفة (رقمي/فئوي).
3. `Equal-width Binning` حساس جداً للقيم المتباعدة (outliers)، بعكس `Equal-depth`.
4. `χ²` للصفات الاسمية، `Pearson's r` للصفات الرقمية — لا تخلط بينهما.
5. "الارتباط لا يعني السببية" دوماً — تحقق من وجود متغيّر ثالث خفي محتمل.
6. التكرار الحرفي بالقيم لا يعني بالضرورة أنه تكرار حقيقي لنفس الكائن.
7. التطبيع ضروري تحديداً للخوارزميات المعتمدة على المسافة (kNN, Clustering, Neural Networks).
8. `Discretization` و`Binarization` عمليتان مختلفتان بحسب احتياج الخوارزمية اللاحقة (Classification مقابل Association Rules).

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| استخدام χ² لصفات رقمية | χ² مخصَّص للصفات الاسمية فقط؛ للرقمية نستخدم معامل ارتباط بيرسون |
| افتراض أن ارتباط قوي = علاقة سببية | تذكّر دوماً "correlation does not imply causality" وابحث عن متغيّر ثالث محتمل |
| حذف كل السجلات المتطابقة تلقائياً كتكرار | يجب التحقق من السياق: هل التطابق تكرار حقيقي أم تشابه مصادفة بين كائنات مختلفة؟ |
| استخدام Min-Max دائماً بغض النظر عن وجود قيم شاذة | إن وُجدت outliers مهيمنة، استخدم Z-Score بدلاً من Min-Max |
| الخلط بين Discretization وBinarization | الأول يحوّل رقمي إلى فئوي، الثاني يحوّل (رقمي أو فئوي) إلى ثنائي |
| نسيان تحويل القيم المفقودة المرمَّزة برمز خاص (مثل '?') إلى NaN قبل المعالجة | يجب دائماً فحص توثيق البيانات لمعرفة كيف رُمِّزت القيم المفقودة فعلياً |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: معالجة القيم المفقودة بالكامل (من الاكتشاف للتعويض)
```algorithm
1 | تحديد رمز القيم المفقودة | فحص توثيق البيانات | مثال: '?' في بيانات سرطان الثدي
2 | تحويل الرمز إلى NaN | data.replace(symbol, np.NaN) | توحيد التمثيل للمعالجة اللاحقة
3 | عدّ القيم المفقودة لكل عمود | data[col].isna().sum() | تحديد مدى المشكلة
4 | اختيار استراتيجية المعالجة | تعويض أو حذف حسب السياق | تعويض بالوسيط أو dropna()
5 | التحقق من النتيجة | مقارنة الشكل قبل وبعد | data.shape[0] قبل/بعد
```
#### نقاط التنفيذ:
- يجب التحقق دائماً من توثيق البيانات (`data description`) لمعرفة رمز القيم المفقودة الفعلي.
- اختيار التعويض بالوسيط أو المتوسط يعتمد على شكل توزيع الصفة.

#### ⚙️ الخطوات / الخوارزمية: اختبار χ² الكامل لفحص استقلالية صفتين اسميتين
```algorithm
1 | بناء جدول الطوارئ | تجميع التكرارات الفعلية | صفوف B وأعمدة A مع المجاميع
2 | حساب التكرار المتوقَّع لكل خلية | eij = count(A=ai)×count(B=bj)/n | لكل خلية في الجدول
3 | حساب مساهمة كل خلية | (Oij-eij)²/eij | لكل خلية
4 | جمع كل المساهمات | Σ لكل الخلايا | القيمة الكلية لـχ²
5 | تحديد درجات الحرية | (r-1)×(c-1) | لتحديد القيمة الحرجة من الجدول
6 | المقارنة واتخاذ القرار | مقارنة القيمة المحسوبة بالحرجة | إن كانت أكبر، رفض فرضية الاستقلالية
```
#### نقاط التنفيذ:
- رفض فرضية الاستقلالية يعني أن الصفتين **مترابطتان**، وليس بالضرورة أن إحداهما تسبّب الأخرى.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| تحويل رمز مفقود | `data.replace('?', np.NaN)` | عندما تُرمَّز القيم المفقودة برمز غير NaN |
| عدّ المفقودات | `data[col].isna().sum()` | فحص كل عمود قبل أي قرار معالجة |
| تعويض بالوسيط | `data[col].fillna(data[col].median())` | لصفة رقمية منحرفة التوزيع |
| حذف مكرَّرات | `data.drop_duplicates()` | بعد التحقق من أن التكرار حقيقي فعلاً |
| تقطيع Equal-width | `pd.cut(data[col], N)` | عند الحاجة لفترات متساوية العرض |
| تقطيع Equal-depth | `pd.qcut(data[col], N)` | عند الحاجة لفترات متساوية العدد |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| وسم الفئة (class label) مفقود في مهمة تصنيف | تجاهل السجل بالكامل عادة | السجل بلا وسم صحيح عديم الفائدة للتدريب |
| صفة بها قيم شاذة تُهيمن على Min-Max | استخدام Z-Score بدلاً من ذلك | Z-Score أكثر مقاومة للقيم المتطرفة |
| اكتشاف ارتباط قوي بين صفتين | البحث عن متغيّر ثالث محتمل قبل افتراض السببية | تجنّب مغالطة "correlation implies causality" |
| بيانات لخوارزمية Association Rules | تحويلها لصيغة ثنائية (Binarization) | هذه الخوارزميات تتطلب بيانات ثنائية بطبيعتها |
| بيانات لخوارزمية Classification تتطلب فئات | تقطيع الصفة الرقمية (Discretization) أولاً | لتتوافق مع متطلبات الخوارزمية |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% | سيناريو حساب/كود 30% | تطبيق 30% | تتبع حسابات 15%.

### السؤال 1 (medium)
أي مما يلي **ليس** من عوامل جودة البيانات الستة المذكورة في المحاضرة؟
أ) Accuracy
ب) Timeliness
ج) Believability
د) Popularity (الشعبية)
**الإجابة الصحيحة: د**
**التعليل:** العوامل الستة المذكورة صراحة: Accuracy, Completeness, Consistency, Timeliness, Believability, Interpretability. "الشعبية" غير مذكورة إطلاقاً كعامل جودة بيانات.

---

### السؤال 2 (medium)
راتب مسجَّل بقيمة `-10K` يُصنَّف كمثال على أي نوع من "البيانات القذرة"؟
أ) Incomplete data
ب) Inconsistent data
ج) Inaccurate/Noisy data (قيمة خاطئة erroneous)
د) لا يُعتبر مشكلة إطلاقاً
**الإجابة الصحيحة: ج**
**التعليل:** النص يذكر صراحة "erroneous values: e.g., salary = -10K" ضمن فئة Inaccurate or noisy data.

---

### السؤال 3 (hard)
سيناريو: `Age="42"` و`Birthday="03/07/2010"` لنفس الشخص في نفس السجل. هذا مثال على:
أ) Missing data
ب) Inconsistent data
ج) Noisy data فقط
د) بيانات صحيحة تماماً
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر هذا المثال بالتحديد تحت "Inconsistent: Data can contain inconsistent values... Age='42', Birthday='03/07/2010'" لأن القيمتين تتناقضان منطقياً (عمر 42 يتعارض مع تاريخ ميلاد 2010).

---

### السؤال 4 (medium)
أي طريقة للتعامل مع القيم المفقودة تُستخدم عادة عندما يكون **وسم الفئة نفسه** (class label) مفقوداً في مهمة تصنيف؟
أ) Fill in the missing value manually
ب) Ignore the tuple
ج) A global constant
د) The most probable value via regression
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "Ignore the tuple: usually done when the class label is missing (for classification task)."

---

### السؤال 5 (hard)
بيانات سعر: 4, 8, 9, 15, 21, 21, 24, 25, 26, 28, 29, 34 (12 قيمة)، تُقسَّم لـ3 صناديق equal-depth. ما القيم في Bin2؟
أ) {4, 8, 9, 15}
ب) {21, 21, 24, 25}
ج) {26, 28, 29, 34}
د) {15, 21, 21, 24}
**الإجابة الصحيحة: ب**
**التعليل:** حسب المحاضرة حرفياً: "Bin 1: 4,8,9,15 / Bin 2: 21,21,24,25 / Bin 3: 26,28,29,34" — كل صندوق يحتوي بالضبط 4 قيم متساوية العدد (equal-depth).

---

### السؤال 6 (hard)
لنفس بيانات السؤال السابق (Bin2={21,21,24,25})، ما قيمة "التنعيم بمتوسط الصندوق" (bin mean) لهذا الصندوق؟
أ) 21
ب) 22.75 (تُقرَّب إلى 23)
ج) 25
د) 24
**الإجابة الصحيحة: ب**
**التعليل:** متوسط Bin2 = (21+21+24+25)/4 = 91/4 = 22.75، وهو مطابق لما ذُكر في المحاضرة (23 كتقريب).

---

### السؤال 7 (hard)
سيناريو: بيانات `[5,10,11,13,15,35,50,55,72,92,204,215]` تُقسَّم لـ3 صناديق equal-width. لماذا يحتوي الصندوق الثاني على قيمة واحدة فقط (92) بينما الأول يحتوي 9 قيم؟
أ) خطأ في الحساب، يجب أن تتساوى الصناديق دائماً
ب) لأن القيمتين المتباعدتين جداً (204, 215) وسّعتا المدى الكلي، فجعلتا عرض كل فترة كبيراً جداً مما جمّع أغلب القيم الصغيرة في الفترة الأولى
ج) equal-width يتطلّب دائماً توزيعاً متساوياً بالعدد
د) لا علاقة للقيم المتطرفة بهذا التوزيع غير المتوازن
**الإجابة الصحيحة: ب**
**التعليل:** هذا بالضبط ما يوضحه المثال الثاني في المحاضرة — القيم المتباعدة جداً (204, 215) تُوسِّع المدى الكلي بشكل كبير، فيصبح عرض كل فترة equal-width كبيراً جداً، مما يجمّع أغلب القيم المتقاربة في فترة واحدة فقط.

---

### السؤال 8 (medium)
أي اختبار إحصائي يُستخدم لفحص استقلالية صفتين **اسميتين (Nominal)**؟
أ) Pearson's correlation coefficient
ب) χ² (Chi-square) test
ج) Standard deviation
د) IQR
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "For nominal attributes (Categorical Data): χ² (chi-square) test" بينما "For numeric attributes: correlation coefficient".

---

### السؤال 9 (hard)
في مثال (gender × preferred reading)، التكرار المتوقَّع لخلية (male, fiction) = 90. إذا كان التكرار الفعلي (Observed) لنفس الخلية = 250، ما مساهمة هذه الخلية في قيمة χ² الكلية؟
أ) 160
ب) 284.4 تقريباً
ج) 90
د) 250
**الإجابة الصحيحة: ب**
**التعليل:** المساهمة = (O-e)²/e = (250-90)²/90 = (160)²/90 = 25,600/90 ≈ 284.4، وهذا مطابق لأحد حدود المعادلة في مثال المحاضرة (χ²=507.93 الكلي).

---

### السؤال 10 (medium)
معامل ارتباط بيرسون بين درجة الحرارة ومبيعات الآيس كريم = 0.9575 وفق مثال المحاضرة. ماذا يعني هذا؟
أ) ارتباط سالب ضعيف
ب) ارتباط موجب قوي جداً (قريب من +1)
ج) استقلالية تامة بين المتغيّرين
د) لا يمكن تفسير هذه القيمة دون بيانات إضافية
**الإجابة الصحيحة: ب**
**التعليل:** القيمة 0.9575 قريبة جداً من +1، وأي قيمة `rA,B > 0` تعني ارتباطاً موجباً، وكلما اقتربت من 1 (القيمة القصوى) زادت قوة الارتباط الخطي.

---

### السؤال 11 (hard)
سيناريو: وُجد ارتباط قوي بين "عدد المستشفيات" و"عدد سرقات السيارات" في مدن مختلفة. ما التفسير الصحيح المذكور في المحاضرة؟
أ) المستشفيات تسبّب زيادة سرقات السيارات مباشرة
ب) سرقات السيارات تسبّب بناء مستشفيات أكثر
ج) كلاهما مرتبط سببياً بمتغيّر ثالث خفي، وهو عدد السكان (population)
د) هذا الارتباط غير منطقي ويجب تجاهله كخطأ حسابي
**الإجابة الصحيحة: ج**
**التعليل:** النص صريح تماماً: "Both are actually causally linked to a third attribute, namely, population" — هذا المثال الكلاسيكي لتوضيح "correlation does not imply causality".

---

### السؤال 12 (medium)
في بيانات سرطان الثدي، اكتُشف 236 سجلاً مكرَّراً بدالة `duplicated()`. بعد تطبيق `drop_duplicates()`، كم سجلاً سيتبقى (الأصل 699 سجلاً)؟
أ) 236
ب) 463
ج) 699
د) 935
**الإجابة الصحيحة: ب**
**التعليل:** النص يذكر مباشرة: "Number of rows before discarding duplicates = 699. Number of rows after discarding duplicates = 463" (699 - 236 = 463).

---

### السؤال 13 (hard)
الحد الأدنى والأقصى لصفة الدخل هما $12,000 و$98,000. باستخدام Min-Max Normalization إلى المدى [0.0, 1.0]، ما القيمة المطبَّعة لدخل $73,600؟
أ) 0.500
ب) 0.716
ج) 1.225
د) 0.986
**الإجابة الصحيحة: ب**
**التعليل:** حسب الصيغة والحساب في المحاضرة بالضبط: (73,600-12,000)/(98,000-12,000) × (1.0-0)+0 = 61,600/86,000 = 0.716.

---

### السؤال 14 (medium)
متى تُفضَّل Z-Score Normalization على Min-Max Normalization وفق المحاضرة؟
أ) عندما تكون كل القيم متساوية تماماً
ب) عندما يكون الحد الأدنى/الأقصى الفعلي غير معروف، أو توجد قيم شاذة تُهيمن على Min-Max
ج) عندما تكون الصفة اسمية وليست رقمية
د) لا يوجد فرق عملي بين الطريقتين إطلاقاً
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "useful when the actual minimum and maximum of a numeric attribute A are unknown, or when there are outliers that dominate the min-max normalization."

---

### السؤال 15 (hard)
صفة تقييم ترتيبية (Ordinal) بـ5 قيم مختلفة `{awful, poor, OK, good, great}` يُراد تحويلها لصفات ثنائية بالطريقة العامة (غير المتماثلة). كم عدد الصفات الثنائية (n) اللازمة حسب صيغة log₂؟
أ) 5
ب) 2
ج) 3
د) 4
**الإجابة الصحيحة: ج**
**التعليل:** n = ⌈log₂(m)⌉ = ⌈log₂5⌉ = ⌈2.32⌉ = 3، مطابق تماماً لمثال المحاضرة (x0, x1, x2).

---

### السؤال 16 (medium)
أي خوارزمية تنقيب لاحقة تتطلّب عادة أن تكون البيانات بصيغة **ثنائية (Binary)** وفق المحاضرة؟
أ) Linear Regression
ب) Association Rule Analysis
ج) k-Means
د) Correlation Analysis
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "Binarization: transform both numeric and categorical attributes into one or more binary attributes. association analysis require that the data be in the form of binary attributes."

---

## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: منطقية، سوء فهم، فحص إرجاع، dead code.

### سؤال تصحيح 1 (misconception)
**الكود التالي يحتوي خطأ:**
```python
import pandas as pd

data = pd.read_csv("survey.csv")

# Trying to detect missing values, assuming they are always empty cells
missing_count = data['income'].isna().sum()
print(f"Missing values: {missing_count}")  # always prints 0, even though '?' appears in the data
```
**اكتشف الخطأ:** الكود يفترض أن القيم المفقودة دائماً فارغة (NaN حقيقي)، متجاهلاً أن مصدر البيانات قد يُرمِّز القيم المفقودة برمز خاص مثل `'?'` (كما في بيانات سرطان الثدي بالمحاضرة)، مما يجعل `isna()` لا يكتشفها إطلاقاً.

**التصحيح:**
```python
import pandas as pd
import numpy as np

data = pd.read_csv("survey.csv")

# First convert the custom missing-value placeholder to NaN
data = data.replace('?', np.NaN)

missing_count = data['income'].isna().sum()
print(f"Missing values: {missing_count}")
```
**شرح الحل:**
1. يجب دائماً مراجعة توثيق البيانات (`data description`) لمعرفة كيف تُرمَّز القيم المفقودة فعلياً.
2. تحويل الرمز الخاص (`'?'` هنا) إلى `NaN` قياسي هو **خطوة أولى إلزامية** قبل أي عدّ أو معالجة للقيم المفقودة، تماماً كما فعلت المحاضرة مع بيانات سرطان الثدي.
3. تجاهل هذه الخطوة يعطي انطباعاً خاطئاً بأن البيانات "كاملة" رغم وجود قيم مفقودة فعلياً.

---

### سؤال تصحيح 2 (wrong_formula)
**الكود التالي يحتوي خطأ:**
```python
def min_max_normalize(value, min_a, max_a, new_min, new_max):
    # Bug: forgot to scale by the new range, just returns the ratio
    normalized = (value - min_a) / (max_a - min_a)
    return normalized

result = min_max_normalize(73600, 12000, 98000, 0.0, 1.0)
print(result)  # happens to work here only because new range is [0,1]
```
**اكتشف الخطأ:** الصيغة الصحيحة لـ`Min-Max Normalization` يجب أن تضرب النسبة بمدى الهدف الجديد `(new_max - new_min)` ثم تضيف `new_min` — الكود الحالي يتجاهل هذه الخطوة تماماً (يعمل بالصدفة فقط هنا لأن المدى الجديد هو [0,1]، لكنه سيفشل مع أي مدى آخر).

**التصحيح:**
```python
def min_max_normalize(value, min_a, max_a, new_min, new_max):
    # Correct formula: scale the ratio by the new range, then shift by new_min
    normalized = (value - min_a) / (max_a - min_a) * (new_max - new_min) + new_min
    return normalized

result = min_max_normalize(73600, 12000, 98000, 0.0, 1.0)
print(result)  # 0.716, correct and generalizes to any new range
```
**شرح الحل:**
1. الصيغة الكاملة: `vi' = (vi-minA)/(maxA-minA) × (new_maxA-new_minA) + new_minA` — حذف الجزء الأخير يجعل الدالة تعمل فقط بالصدفة عندما يكون المدى الجديد `[0,1]` تحديداً.
2. لو استُدعيت الدالة بمدى مختلف (مثلاً `[-1,1]`)، ستُعطي نتيجة خاطئة تماماً بالكود غير المصحَّح.
3. اختبار الدالة بمدى مختلف عن `[0,1]` يكشف الخطأ فوراً — درس عام: اختبر بحالات حديّة متنوعة، لا بحالة واحدة قد تُخفي الخطأ.

---

### سؤال تصحيح 3 (logic)
**الكود التالي يحتوي خطأ:**
```python
import pandas as pd

data = pd.read_csv("data.csv")

# Trying to remove duplicate rows without checking context first
data_clean = data.drop_duplicates()
print(f"Removed {data.shape[0] - data_clean.shape[0]} rows automatically")
```
**اكتشف الخطأ:** الكود يحذف كل السجلات المتطابقة تلقائياً **بدون** التحقق أولاً مما إذا كان هذا التطابق يمثّل تكراراً حقيقياً لنفس الكائن أم مجرد تشابه مصادفة بين كائنات مختلفة (كما نبّهت المحاضرة صراحة).

**التصحيح:**
```python
import pandas as pd

data = pd.read_csv("data.csv")

# First inspect duplicates before deciding to remove them
dups = data.duplicated()
print(f"Number of duplicate rows found: {dups.sum()}")

# Manually verify a sample of duplicates makes sense in context
# before deciding whether to actually drop them
if dups.sum() > 0:
    print(data[dups].head())
    # Only proceed with drop_duplicates() after confirming these
    # are genuine duplicates of the same real-world entity
    data_clean = data.drop_duplicates()
```
**شرح الحل:**
1. المحاضرة تنبّه صراحة: "such duplicate rows may correspond to samples for different individuals" — أي التطابق الرقمي لا يعني بالضرورة أنه نفس الكائن.
2. يجب **الفحص اليدوي أولاً** (عرض عيّنة من السجلات المكرَّرة) قبل اتخاذ قرار الحذف، خصوصاً إن كان عدد الصفات قليلاً (احتمال التطابق المصادف أعلى).
3. الحذف الأعمى بدون هذا التحقق قد يفقد بيانات فعلية مهمة لأشخاص/كائنات مختلفة حقاً.

---

### سؤال تصحيح 4 (return_check)
**الكود التالي يحتوي خطأ:**
```python
def compute_chi_square_cell(observed, expected):
    contribution = ((observed - expected) ** 2) / expected
    # forgot to return the value

total_chi2 = 0
total_chi2 += compute_chi_square_cell(250, 90)  # adds None, causes TypeError
```
**اكتشف الخطأ:** الدالة `compute_chi_square_cell` لا تُرجع (`return`) قيمة `contribution`، لذا استدعاؤها يُعيد `None` تلقائياً، ويفشل السطر الذي يحاول جمعها مع `total_chi2`.

**التصحيح:**
```python
def compute_chi_square_cell(observed, expected):
    contribution = ((observed - expected) ** 2) / expected
    return contribution  # explicitly return the computed contribution

total_chi2 = 0
total_chi2 += compute_chi_square_cell(250, 90)  # works correctly now, adds ~284.4
```
**شرح الحل:**
1. أي قيمة محسوبة داخل دالة ويُراد استخدامها خارجها يجب إرجاعها صراحة بـ`return`.
2. غياب `return` يُعيد `None` ضمنياً، مما يسبب `TypeError` عند محاولة جمعه مع رقم.
3. هذا النمط أساسي لبناء دالة قابلة لإعادة الاستخدام لحساب مساهمة كل خلية في جدول الطوارئ عند حساب χ² الكلي.

---

### سؤال تصحيح 5 (dead_code)
**الكود التالي يحتوي خطأ:**
```python
def discretize_age(age):
    if age < 18:
        return "youth"
    elif age < 65:
        return "adult"
    else:
        return "senior"
    print("Discretization complete")  # unreachable after return statements
```
**اكتشف الخطأ:** سطر `print("Discretization complete")` يقع بعد جميع مسارات `return` الممكنة داخل الدالة، فهو `dead code` لن يُنفَّذ أبداً بغض النظر عن قيمة `age` المُدخَلة.

**التصحيح:**
```python
def discretize_age(age):
    print("Discretization complete")  # moved before the conditional logic
    if age < 18:
        return "youth"
    elif age < 65:
        return "adult"
    else:
        return "senior"
```
**شرح الحل:**
1. أي سطر بعد **كل** مسارات `return` الممكنة في الدالة لن يُنفَّذ أبداً — يجب نقله قبل الجملة الشرطية.
2. هذا المثال يطبّق فكرة `Discretization` المذكورة في المحاضرة (تحويل العمر الرقمي إلى تسميات مفاهيمية: youth/adult/senior).
3. اكتشاف `dead code` يمنع الوهم بأن رسالة تأكيد "اكتمال التقطيع" ستظهر فعلياً عند كل استدعاء.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1: تصنيف مشاكل جودة البيانات (fill_gaps)

**السيناريو / المطلوب:**
صنّف كل حالة تالية إلى (Inaccurate/Noisy, Incomplete/Missing, Inconsistent): (أ) عمر=200 سنة لشخص حي، (ب) حقل "الهاتف" فارغ لـ30% من العملاء، (ج) نفس العميل مسجَّل بعنوانين مختلفين في نظامين متكاملَين.

**المطلوب:**
1. صنّف كل حالة.
2. اقترح طريقة معالجة مناسبة لكل حالة.

**نموذج الحل:**
| الحالة | التصنيف | طريقة المعالجة المقترحة |
| --- | --- | --- |
| عمر=200 | Inaccurate/Noisy (outlier غير منطقي) | فحص وتصحيح يدوي أو استبدال بقيمة مفقودة إن تعذّر التأكد |
| حقل الهاتف فارغ | Incomplete/Missing | تعويض بثابت "unknown" أو حذف الصفة إن لم تكن حاسمة |
| عنوانان مختلفان لنفس العميل | Inconsistent (خصوصاً بعد Data Integration) | مطابقة السجلات (record linkage) وتحديد المصدر الأحدث/الأكثر موثوقية |

---

### تمرين 2: تصحيح مفهوم خاطئ (code_fix)

**السيناريو / المطلوب:**
طالب كتب: "وجدت ارتباطاً (r=0.85) بين عدد ساعات الدراسة ودرجة الامتحان، إذن ساعات الدراسة **تسبّب** ارتفاع الدرجة بالتأكيد."

**المطلوب:**
1. حدّد الخطأ المفاهيمي.
2. صحّحه بالاستناد لمبدأ المحاضرة.

**نموذج الحل:**
الخطأ: الجملة تفترض أن الارتباط القوي (0.85) يُثبت **علاقة سببية** مباشرة. التصحيح: كما ورد في المحاضرة، "correlation does not imply causality" — وجود ارتباط قوي بين ساعات الدراسة والدرجة **يدعم فرضية معقولة** بوجود علاقة سببية (وهي هنا منطقية فعلاً)، لكنه **لا يُثبتها إحصائياً بمفرده**؛ قد يوجد متغيّر ثالث (كالدافعية الشخصية للطالب) يؤثر في كليهما معاً، تماماً كمثال hospitals/car_thefts/population.

---

### تمرين 3: سيناريو تطبيقي (scenario)

**السيناريو / المطلوب:**
شركة توظيف لديها صفة "الراتب المتوقَّع" بمدى [$20,000 - $500,000] مع بضع قيم شاذة مرتفعة جداً (رواتب تنفيذيين)، وتريد استخدام خوارزمية `kNN` للتنبؤ بمدى ملاءمة المرشّح لوظيفة.

**المطلوب:**
1. هل تحتاج البيانات لتطبيع؟ ولماذا (بالربط مع خوارزمية kNN تحديداً)؟
2. أي طريقة تطبيع أنسب هنا: Min-Max أم Z-Score؟ ولماذا؟

**نموذج الحل:**
1. نعم، ضروري جداً — `kNN` خوارزمية معتمدة على المسافة (distance-based)، وبدون تطبيع، ستُهيمن صفة الراتب (بمداها الرقمي الضخم) على حساب المسافة الكلي، مُهمِّشة أي صفة أخرى بمدى أصغر (كسنوات الخبرة مثلاً).
2. `Z-Score Normalization` أنسب هنا تحديداً، لأن توجد **قيم شاذة (رواتب تنفيذيين مرتفعة جداً)** ستُهيمن على وتُشوِّه نتيجة `Min-Max` (كما ورد صراحة في المحاضرة: Z-Score مفيدة "when there are outliers that dominate the min-max normalization").

---

### تمرين 4: حساب مفاهيمي (metric_calculation)

**السيناريو / المطلوب:**
صفة عمرية بمتوسط 40 سنة وانحراف معياري 10 سنوات. احسب القيمة المطبَّعة بـZ-Score لشخص عمره 55 سنة.

**المطلوب:**
1. طبّق صيغة Z-Score خطوة بخطوة.

**نموذج الحل:**
`vi' = (vi - Ā) / σA = (55 - 40) / 10 = 15/10 = **1.5**`. أي أن عمر هذا الشخص يبعد 1.5 انحراف معياري **فوق** المتوسط.

---

### تمرين 5: تطبيق نموذج (model_apply)

**السيناريو / المطلوب:**
لديك DataFrame بأسماء `df` بعمود `satisfaction_score` رقمي مستمر (1-100)، تريد تحويله لـ4 فئات (poor, fair, good, excellent) بحيث كل فئة تحتوي نفس العدد التقريبي من العملاء.

**المطلوب:**
1. اكتب كود بايثون لإنجاز هذا التقطيع.
2. سمِّ نوع Binning المستخدَم.

**نموذج الحل:**
```python
df['satisfaction_category'] = pd.qcut(
    df['satisfaction_score'], 4,
    labels=['poor', 'fair', 'good', 'excellent']
)
```
النوع المستخدَم: `Equal-frequency (Equi-depth) Binning`، لأن الهدف هو **نفس عدد العملاء تقريباً** في كل فئة (وليس نفس عرض الفترة الرقمية).

---

### تمرين 6: مقارنة تطبيقية (scenario)

**السيناريو / المطلوب:**
باحث يريد فحص إن كانت هناك علاقة بين "التدخين" (نعم/لا) و"الإصابة بمرض القلب" (نعم/لا) لعيّنة من 1000 شخص.

**المطلوب:**
1. أي اختبار إحصائي مناسب هنا؟ ولماذا؟
2. ما درجات الحرية لجدول الطوارئ الناتج (2×2)؟

**نموذج الحل:**
1. اختبار **χ² (Chi-Square)** لأن كلتا الصفتين **اسميتان/ثنائيتان** (Nominal/Binary)، وليستا رقميتين مستمرتين (فمعامل ارتباط بيرسون غير مناسب هنا).
2. درجات الحرية = `(r-1)×(c-1) = (2-1)×(2-1) = 1×1 = **1**`.

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 1: دراسة حالة (case_study)

**السيناريو:**
بنك يدمج بيانات عملاء من نظامين قديمين مختلفين (نظام قروض ونظام حسابات جارية). بعد الدمج، وجدوا: أعمدة مكرَّرة بأسماء مختلفة (`cust_id` و`customer_number`)، 500 سجل مكرَّر تماماً، وعمود "الدخل الشهري" بوحدات مختلفة (بعض الفروع أدخلته بالليرة والبعض بالدولار).

**المطلوب:**
1. صنّف كل مشكلة ضمن مهمة المعالجة المسبقة المناسبة (Cleaning/Integration/Reduction/Transformation).
2. اقترح حلاً عملياً لكل مشكلة.

**نموذج الحل:**
1. الأعمدة المكرَّرة بأسماء مختلفة: مشكلة **Data Integration** (توحيد تسمية الصفات). السجلات المكرَّرة: مشكلة **Data Reduction** (اكتشافها بـ`duplicated()` وحذفها بـ`drop_duplicates()` بعد التحقق من كونها تكراراً حقيقياً). اختلاف الوحدات: مشكلة **Data Transformation** (تحتاج تحويل كل القيم لعملة موحَّدة قبل أي تطبيع رقمي).
2. الحلول: توحيد اسم عمود المعرّف لعمود واحد فقط، تطبيق `drop_duplicates()` بعد فحص عيّنة يدوياً، تحويل كل قيم الدخل لعملة واحدة ثم تطبيق Min-Max أو Z-Score حسب وجود قيم شاذة من عدمه.

---

### تمرين 2: إكمال جدول مقارنة (table_fill)

**السيناريو:**
أكمل الجدول التالي بربط كل طريقة تطبيع بمزاياها وعيوبها الرئيسية.

**المطلوب:**
| الطريقة | تعتمد على | حساسة للقيم الشاذة؟ | المدى الناتج |
| --- | --- | --- | --- |
| Min-Max | ؟ | ؟ | ؟ |
| Z-Score | ؟ | ؟ | ؟ |
| Decimal Scaling | ؟ | ؟ | ؟ |

**نموذج الحل:**
| الطريقة | تعتمد على | حساسة للقيم الشاذة؟ | المدى الناتج |
| --- | --- | --- | --- |
| Min-Max | min وmax الفعليين | نعم، حساسة جداً | مدى محدَّد بدقة (مثال [0,1]) |
| Z-Score | المتوسط والانحراف المعياري | أقل حساسية | غير محدود بدقة (قد يتجاوز ±3 نادراً) |
| Decimal Scaling | أكبر قيمة مطلقة (لتحديد j) | متوسطة الحساسية (قيمة قصوى واحدة تُغيّر j) | تقريباً [-1, +1] |

---

### تمرين 3: تحليل مكتوب (written_analysis)

**السيناريو:**
اشرح بأسلوبك الخاص لماذا يُعتبر "التداخل" (overlap) بين المهام الأربع للمعالجة المسبقة (Cleaning, Integration, Reduction, Transformation) أمراً طبيعياً وليس خللاً في التصنيف.

**المطلوب:**
1. اكتب فقرة تحليلية (3-5 أسطر).

**نموذج الحل:**
كما نبّهت المحاضرة صراحة، "Smoothing is a form of data cleaning" لكنه أيضاً جزء أساسي من `Binning` الذي يُستخدم أحياناً كتحويل بيانات، و"Attribute construction and aggregation" تنتميان لكل من `Data Reduction` و`Data Transformation` معاً. هذا التداخل طبيعي لأن الهدف النهائي لكل هذه المهام واحد: **رفع جودة البيانات وجعلها مناسبة للتنقيب**، وليس الفصل الصارم بين فئات منعزلة. المهم عملياً ليس "في أي فئة بالضبط توضع هذه التقنية؟" بل "هل تُحسِّن جودة البيانات فعلياً لمهمة التنقيب المستهدفة؟"

---

### تمرين 4: إكمال مخطط (diagram_completion)

**السيناريو:**
أعد بناء مخطط قرار نصي لاختيار طريقة تطبيع مناسبة حسب حالة البيانات.

**المطلوب:**
1. أكمل الجدول بالمنطق الصحيح.

| الحالة | الطريقة المناسبة |
| --- | --- |
| min/max معروفان، لا قيم شاذة مهيمنة | ؟ |
| min/max غير معروفين أو توجد قيم شاذة مهيمنة | ؟ |
| نحتاج فقط تحريك الفاصلة العشرية بسرعة دون حسابات إحصائية | ؟ |

**نموذج الحل:**
| الحالة | الطريقة المناسبة |
| --- | --- |
| min/max معروفان، لا قيم شاذة مهيمنة | Min-Max Normalization |
| min/max غير معروفين أو توجد قيم شاذة مهيمنة | Z-Score Normalization |
| نحتاج فقط تحريك الفاصلة العشرية بسرعة دون حسابات إحصائية | Decimal Scaling Normalization |

---

## الجزء الرابع: تمارين تتبع التنفيذ

> ≥5 تمارين تتبع، جميعها مبنية على صيغ وأمثلة فعلية من هذه المحاضرة.

### تمرين تتبع 1: تتبّع تعويض القيم المفقودة بالوسيط

**المدخل:**
```python
# Bare Nuclei column excerpt (as in the lecture), including one missing value
values = [10, 7, 1, None, 1]  # None represents NaN at index 3
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استبعاد القيمة المفقودة لحساب الوسيط | ؟ |
| 2 | ترتيب القيم المتبقية | ؟ |
| 3 | حساب الوسيط | ؟ |
| 4 | تعويض القيمة المفقودة | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | استبعاد القيمة المفقودة | القيم المتاحة: [10, 7, 1, 1] |
| 2 | ترتيب القيم | [1, 1, 7, 10] |
| 3 | حساب الوسيط (N=4 زوجي) | (1+7)/2 = 4.0 |
| 4 | تعويض القيمة المفقودة | القيمة عند index 3 تصبح 4.0 |

**النتيجة:** القائمة النهائية: `[10, 7, 1, 4.0, 1]` — ملاحظة: هذا مبسَّط لغرض التدريب؛ في المحاضرة الفعلية كانت النتيجة 1.0 بسبب حساب الوسيط على كامل عمود Bare Nuclei (699 قيمة) وليس 5 قيم فقط.

---

### تمرين تتبع 2: تتبّع حساب χ² لجدول طوارئ جديد

**المدخل:**
```python
# Contingency table: Smoking (yes/no) vs Heart Disease (yes/no), n=200
# Observed:            Smoker   Non-Smoker   Total
# Heart Disease            40           20       60
# No Heart Disease         60           80      140
# Total                   100          100      200
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب e لخلية (Heart Disease, Smoker) | ؟ |
| 2 | حساب e لخلية (Heart Disease, Non-Smoker) | ؟ |
| 3 | حساب e لخلية (No Heart Disease, Smoker) | ؟ |
| 4 | حساب e لخلية (No Heart Disease, Non-Smoker) | ؟ |
| 5 | حساب مساهمة كل خلية وجمعها | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | e(HD, Smoker) | (60×100)/200 = 30 |
| 2 | e(HD, Non-Smoker) | (60×100)/200 = 30 |
| 3 | e(No-HD, Smoker) | (140×100)/200 = 70 |
| 4 | e(No-HD, Non-Smoker) | (140×100)/200 = 70 |
| 5 | المساهمات | (40-30)²/30=3.33، (20-30)²/30=3.33، (60-70)²/70=1.43، (80-70)²/70=1.43 → المجموع=9.52 |

**النتيجة:** χ² ≈ 9.52، ودرجات الحرية = (2-1)×(2-1) = 1. بمقارنتها بجدول القيم الحرجة (عند p=0.05، القيمة الحرجة=3.84)، بما أن 9.52 > 3.84، **نرفض** فرضية الاستقلالية — التدخين ومرض القلب **مترابطان** في هذه العيّنة.

---

### تمرين تتبع 3: تتبّع حساب معامل ارتباط بيرسون (مبسَّط)

**المدخل:**
```python
# Simplified: hours studied (A) vs exam score (B), n=4
A = [1, 2, 3, 4]  # hours studied
B = [50, 60, 70, 80]  # exam score
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب المتوسطين | ؟ |
| 2 | حساب الانحرافات (a=Ai-Ā, b=Bi-B̄) | ؟ |
| 3 | حساب حاصل الضرب a×b وجمعه | ؟ |
| 4 | حساب a² وb² وجمعهما | ؟ |
| 5 | تطبيق الصيغة النهائية | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | المتوسطان | Ā=2.5، B̄=65 |
| 2 | الانحرافات | a: -1.5,-0.5,0.5,1.5 / b: -15,-5,5,15 |
| 3 | Σ(a×b) | (-1.5×-15)+(-0.5×-5)+(0.5×5)+(1.5×15) = 22.5+2.5+2.5+22.5 = 50 |
| 4 | Σa²، Σb² | Σa²=(2.25+0.25+0.25+2.25)=5، Σb²=(225+25+25+225)=500 |
| 5 | r = Σ(ab)/√(Σa²×Σb²) | 50/√(5×500) = 50/√2500 = 50/50 = **1.0** |

**النتيجة:** r = 1.0 (ارتباط موجب **تام**) — منطقي لأن العلاقة بين A وB خطية تماماً هنا (كل زيادة ساعة دراسة تقابلها زيادة ثابتة 10 درجات بالضبط).

---

### تمرين تتبع 4: تتبّع Decimal Scaling Normalization

**المدخل:**
```python
# Attribute values ranging from -45 to 320
values_range = (-45, 320)
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تحديد أكبر قيمة مطلقة | ؟ |
| 2 | تحديد j المناسب | ؟ |
| 3 | تطبيع -45 | ؟ |
| 4 | تطبيع 320 | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | أكبر قيمة مطلقة | max(45, 320) = 320 |
| 2 | تحديد j | نحتاج 320/10^j < 1 → j=3 (320/1000=0.32<1؛ بينما 320/100=3.2 غير مقبول) |
| 3 | تطبيع -45 | -45/1000 = -0.045 |
| 4 | تطبيع 320 | 320/1000 = 0.32 |

**النتيجة:** كل القيم تُقسَم على 1000 (j=3)، فتقع النتائج بين -0.045 و0.32، أي ضمن `[-1, +1]` كما هو متوقَّع.

---

### تمرين تتبع 5: تتبّع Binning بطريقتين على بيانات جديدة

**المدخل:**
```python
# Ages sorted ascending, to be split into 4 bins
ages = [5, 8, 12, 15, 18, 22, 25, 30, 45, 60, 75, 90]  # N=12
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Equal-depth: تقسيم لـ4 صناديق (3 قيم لكل صندوق) | ؟ |
| 2 | Equal-width: حساب W | ؟ |
| 3 | Equal-width: تحديد حدود الفترات | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | Equal-depth (4 صناديق × 3 قيم) | Bin1={5,8,12}, Bin2={15,18,22}, Bin3={25,30,45}, Bin4={60,75,90} |
| 2 | حساب W لـ Equal-width | W=(90-5)/4 = 21.25 |
| 3 | حدود الفترات | [5,26.25), [26.25,47.5), [47.5,68.75), [68.75,90] |

**النتيجة:** بتوزيع القيم على فترات Equal-width: Bin1={5,8,12,15,18,22,25}(7 قيم!)، Bin2={30,45}(قيمتان)، Bin3={60}(قيمة واحدة)، Bin4={75,90}(قيمتان) — توزيع غير متوازن تماماً بالعدد، بعكس التوازن التام في Equal-depth، مما يوضّح عملياً حساسية Equal-width للقيم المتباعدة (60،75،90) في نهاية المدى.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

> ≥10 أسئلة. نموذج الإجابة: 1. التعريف 2. المكونات/الشروط 3. مثال رقمي 4. متى نستخدم.

### السؤال 1: ما هي عوامل جودة البيانات الستة المذكورة في المحاضرة؟
**نموذج الإجابة:**
1. التعريف: مجموعة معايير تحدد مدى صلاحية البيانات لتحليل موثوق.
2. المكونات: Accuracy, Completeness, Consistency, Timeliness, Believability, Interpretability.
3. مثال: بيانات سلوك شراء عملاء قديمة جداً (تنتهك Timeliness) رغم كونها دقيقة وكاملة.
4. تُستخدم هذه المعايير كقائمة فحص شاملة قبل البدء بأي مشروع تنقيب بيانات.

### السؤال 2: عدّد الأنواع الثلاثة للبيانات "القذرة" مع مثال لكل نوع.
**نموذج الإجابة:**
1. التعريف: أنماط شائعة لعيوب جودة البيانات الواقعية.
2. المكونات: Inaccurate/Noisy (قيم خاطئة/غير متوقَّعة)، Incomplete/Missing (قيم أو صفات ناقصة)، Inconsistent (تناقضات منطقية بين الحقول).
3. مثال: راتب=-10K (noisy)، وزن="" (missing)، عمر=42 مع تاريخ ميلاد 2010 (inconsistent).
4. تُستخدم هذه التصنيفات لتحديد أي تقنية معالجة مناسبة (تنظيف، تعويض، أو تسوية تناقضات).

### السؤال 3: اشرح الفرق بين "تجاهل السجل" و"تجاهل القيمة المفقودة فقط" كطريقتين للتعامل مع البيانات المفقودة.
**نموذج الإجابة:**
1. التعريف: طريقتان أوليتان بسيطتان للتعامل مع القيم المفقودة.
2. المكونات: تجاهل السجل يحذف الصف بأكمله؛ تجاهل القيمة يُعدِّل الخوارزمية نفسها لتتجاوز القيمة المفقودة عند الحساب فقط (كحساب تشابه في Clustering بالاعتماد فقط على الصفات المتوفرة).
3. مثال: في تصنيف، سجل بدون وسم فئة يُحذَف بالكامل؛ في تجميع، حساب تشابه كائنين بتجاهل الصفة المفقودة لأحدهما فقط.
4. تُستخدم الطريقة الأولى عند فقدان معلومة حاسمة (كالوسم)، والثانية عند إمكانية تعديل الخوارزمية بمرونة.

### السؤال 4: عرّف Binning واشرح الفرق بين Equal-width وEqual-depth.
**نموذج الإجابة:**
1. التعريف: تقنية تنعيم محلية تقسم البيانات المرتَّبة إلى صناديق.
2. المكونات: Equal-width يقسم المدى الرقمي لفترات متساوية العرض (W=(B-A)/N)؛ Equal-depth يقسم لفترات متساوية العدد تقريباً.
3. مثال: بيانات [5,10,...,215]: Equal-width أنتج صندوقاً بـ9 قيم وآخر بقيمة واحدة، بينما Equal-depth أنتج 3 صناديق متساوية (4 قيم لكل منها).
4. يُستخدم Equal-width عندما يكون التوزيع منتظماً نسبياً، وEqual-depth عند وجود قيم متباعدة/شاذة تُشوِّه Equal-width.

### السؤال 5: اشرح صيغة χ² وكيف تُستخدم لاكتشاف الارتباط بين صفتين اسميتين.
**نموذج الإجابة:**
1. التعريف: اختبار إحصائي يفحص فرضية استقلالية صفتين اسميتين.
2. المكونات: χ² = ΣΣ(O-e)²/e، حيث O هو التكرار الملاحَظ وe التكرار المتوقَّع = count(A)×count(B)/n.
3. مثال: جنس × نوع قراءة مفضّل، χ²=507.93 > القيمة الحرجة 10.828 → رفض الاستقلالية، الصفتان مترابطتان.
4. يُستخدم عند الحاجة لفحص تكرار محتمل بين صفتين اسميتين قبل دمج مصادر بيانات (Data Integration).

### السؤال 6: ما الفرق بين معامل ارتباط بيرسون واختبار χ²؟
**نموذج الإجابة:**
1. التعريف: كلاهما يقيس العلاقة بين صفتين، لكن لأنواع بيانات مختلفة.
2. المكونات: χ² للصفات الاسمية (Categorical)؛ معامل بيرسون للصفات الرقمية (Numeric)، بمدى قيمة [-1,+1].
3. مثال: χ² لفحص علاقة الجنس بنوع القراءة؛ بيرسون لفحص علاقة درجة الحرارة بمبيعات الآيس كريم (r=0.9575).
4. يُستخدم الاختيار الصحيح بينهما حسب نوع الصفتين المطلوب فحصهما.

### السؤال 7: لماذا "الارتباط لا يعني السببية"؟ اشرح بمثال المحاضرة.
**نموذج الإجابة:**
1. التعريف: مبدأ إحصائي أساسي يحذّر من الاستنتاج الخاطئ للسببية من الارتباط وحده.
2. المكونات: قد يكون الارتباط بسبب متغيّر ثالث خفي يؤثر في كلا المتغيّرين المرتبطَين معاً.
3. مثال: عدد المستشفيات وعدد سرقات السيارات مرتبطان إحصائياً، لكن كلاهما ناتج فعلياً عن حجم السكان (population) في المنطقة.
4. يُستخدم هذا المبدأ لتجنّب استنتاجات خاطئة عند تحليل بيانات ارتباطية دون تصميم تجريبي يثبت السببية.

### السؤال 8: كيف تكتشف وتتعامل مع البيانات المكرَّرة (Duplicate Data)؟
**نموذج الإجابة:**
1. التعريف: سجلات متطابقة تماماً في كل قيم صفاتها.
2. المكونات: الاكتشاف عبر `duplicated()` (يُرجع Boolean array)، والحذف عبر `drop_duplicates()`.
3. مثال: بيانات سرطان الثدي: 236 سجلاً مكرَّراً من 699، بعد الحذف تبقى 463.
4. يُستخدم هذا الإجراء ضمن مهمة Data Reduction، لكن **بعد** التحقق من أن التكرار حقيقي فعلياً وليس تشابهاً مصادفاً بين كائنات مختلفة.

### السؤال 9: قارن بين طرق التطبيع الثلاث (Min-Max, Z-Score, Decimal Scaling).
**نموذج الإجابة:**
1. التعريف: ثلاث طرق لتوحيد مدى قيم الصفات الرقمية.
2. المكونات: Min-Max يعتمد min/max الفعليين (حساس للشواذ)؛ Z-Score يعتمد المتوسط والانحراف المعياري (أكثر مقاومة)؛ Decimal Scaling يعتمد أكبر قيمة مطلقة وتحريك الفاصلة العشرية.
3. مثال: دخل $73,600: Min-Max→0.716، Z-Score→1.225، Decimal Scaling (لبيانات -986 إلى 917)→ -0.986/0.917.
4. يُستخدم Min-Max عند معرفة الحدود الفعلية بدون شواذ، Z-Score عند وجود شواذ أو حدود غير معروفة، Decimal Scaling للتطبيع السريع البسيط.

### السؤال 10: ما الفرق بين Discretization وBinarization؟
**نموذج الإجابة:**
1. التعريف: عمليتا تحويل مختلفتان تماماً في الاتجاه والغرض.
2. المكونات: Discretization يحوّل رقمي→فئوي (لخوارزميات Classification التي تتطلب فئات)؛ Binarization يحوّل رقمي أو فئوي→ثنائي (لخوارزميات Association Analysis).
3. مثال: تحويل العمر الرقمي لفئات {youth, adult, senior} (Discretization)؛ تحويل تقييم فئوي 5 مستويات لـ3 أعمدة ثنائية (Binarization).
4. يُستخدم كل منهما حسب متطلبات صيغة البيانات لخوارزمية التنقيب اللاحقة تحديداً.

### السؤال 11: اشرح فكرة التسلسل الهرمي المفاهيمي (Concept Hierarchy) الناتج عن Discretization.
**نموذج الإجابة:**
1. التعريف: تنظيم تسميات صفة مُقطَّعة بشكل هرمي متدرّج من مستويات تفصيل عالية إلى مستويات تجريد أعلى.
2. المكونات: يمكن تعريف أكثر من تسلسل هرمي واحد لنفس الصفة حسب الحاجة، ويسمح بالتنقيب على مستويات تجريد متعددة.
3. مثال: العمر → فترات عشرية (0-10, 11-20...) → فئات عريضة (youth, adult, senior).
4. يُستخدم هذا التسلسل عند الحاجة لتحليل بيانات بمستويات تفصيل مختلفة حسب سياق السؤال التحليلي المطروح.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Data Preprocessing (هذه المحاضرة) | Getting to Know Your Data | استخدام مباشر لمقاييس النزعة المركزية والتشتت في تعويض القيم المفقودة واكتشاف الضوضاء |
| Data Preprocessing | Frequent Patterns & ARM | Binarization ضروري لتحويل بيانات لصيغة مناسبة لتحليل الترافق |
| Data Preprocessing | Classification | Discretization ضروري لبعض خوارزميات التصنيف؛ Normalization مهم لـkNN |
| Data Preprocessing | Cluster Analysis | Normalization ضروري جداً (خوارزميات معتمدة على المسافة كـk-Means) |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| جودة البيانات | 6 عوامل: Accuracy, Completeness, Consistency, Timeliness, Believability, Interpretability |
| البيانات القذرة | 3 أنواع: Noisy, Missing, Inconsistent |
| القيم المفقودة | تجاهل سجل/قيمة/صفة، تعويض يدوي، أو تعويض آلي (ثابت، نزعة مركزية، فئة، احتمالية) |
| Binning | Equal-width (حساس للشواذ) مقابل Equal-depth (متوازن عددياً) |
| Correlation | χ² للاسمية، Pearson's r للرقمية، [-1,+1] |
| قاعدة ذهبية | correlation ≠ causality |
| Normalization | Min-Max (حساس للشواذ)، Z-Score (مقاوم)، Decimal Scaling (بسيط وسريع) |
| Transformation | Discretization (رقمي→فئوي) مقابل Binarization (→ثنائي) |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `Oij, eij` | التكرار الملاحَظ والمتوقَّع | اختبار χ² |
| `rA,B` | معامل ارتباط بيرسون | الصفات الرقمية |
| `W=(B-A)/N` | عرض فترة Equal-width | Binning |
| `vi'=(vi-minA)/(maxA-minA)×(new_max-new_min)+new_min` | Min-Max Normalization | تطبيع |
| `vi'=(vi-Ā)/σA` | Z-Score Normalization | تطبيع |
| `vi'=vi/10^j` | Decimal Scaling | تطبيع |
| `n=⌈log2(m)⌉` | عدد الأعمدة الثنائية اللازمة | Binarization |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | تحقق دوماً من رمز القيم المفقودة الفعلي في البيانات قبل المعالجة (قد لا يكون NaN مباشرة) |
| 2 | χ² للصفات الاسمية، معامل ارتباط بيرسون للصفات الرقمية — لا تخلط بينهما |
| 3 | correlation does not imply causality — ابحث دوماً عن متغيّر ثالث محتمل |
| 4 | تحقق من سياق التكرار قبل حذف أي سجل مكرَّر تلقائياً |
| 5 | Z-Score أفضل من Min-Max عند وجود قيم شاذة مهيمنة |
| 6 | Discretization للفئات، Binarization للثنائي — حسب متطلبات الخوارزمية اللاحقة |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما هي عوامل جودة البيانات الستة المذكورة في المحاضرة؟
A: Accuracy, Completeness, Consistency, Timeliness, Believability, Interpretability.

---

**Q2:** ما الأنواع الثلاثة للبيانات "القذرة"؟
A: غير دقيقة/مشوَّشة (Inaccurate/Noisy)، ناقصة (Incomplete/Missing)، غير متّسقة (Inconsistent).

---

**Q3:** متى نستخدم "تجاهل السجل بالكامل" كطريقة للتعامل مع القيم المفقودة؟
A: عادة عندما يكون وسم الفئة (class label) نفسه مفقوداً في مهمة تصنيف.

---

**Q4:** ما الفرق بين Equal-width وEqual-depth Binning؟
A: Equal-width يقسم المدى لفترات متساوية العرض؛ Equal-depth يقسمه لفترات متساوية العدد التقريبي من القيم.

---

**Q5:** ما اختبار الارتباط المستخدَم للصفات الاسمية؟ وما صيغته؟
A: اختبار χ² (Chi-Square)، صيغته: χ² = ΣΣ(Oij-eij)²/eij.

---

**Q6:** كيف يُحسَب التكرار المتوقَّع (eij) في جدول الطوارئ؟
A: eij = count(A=ai) × count(B=bj) / n، حيث n هو العدد الكلي للسجلات.

---

**Q7:** ما مدى قيمة معامل ارتباط بيرسون؟ وماذا يعني كل طرف؟
A: من -1 إلى +1؛ +1 ارتباط موجب تام، -1 ارتباط سالب تام، 0 استقلالية تامة (لا ارتباط خطي).

---

**Q8:** ما المثال الكلاسيكي الذي يوضّح أن "الارتباط لا يعني السببية"؟
A: عدد المستشفيات وعدد سرقات السيارات في منطقة ما، كلاهما مرتبط سببياً بمتغيّر ثالث خفي: عدد السكان.

---

**Q9:** ما الفرق بين دالتَي `duplicated()` و`drop_duplicates()` في pandas؟
A: `duplicated()` يُرجع مصفوفة Boolean تُبيّن أي السجلات مكرَّرة، بينما `drop_duplicates()` يحذف فعلياً السجلات المكرَّرة (يُبقي أول ظهور فقط).

---

**Q10:** ما صيغة Min-Max Normalization؟
A: vi' = (vi - minA)/(maxA - minA) × (new_maxA - new_minA) + new_minA.

---

**Q11:** متى نُفضِّل Z-Score Normalization على Min-Max؟
A: عندما يكون الحد الأدنى/الأقصى الفعلي غير معروف، أو عند وجود قيم شاذة تُهيمن على نتيجة Min-Max.

---

**Q12:** ما صيغة Decimal Scaling Normalization؟ وكيف يُحدَّد j؟
A: vi' = vi/10^j، حيث j هو أصغر عدد صحيح يجعل أكبر قيمة مطلقة بعد التطبيع أقل من 1.

---

**Q13:** ما الفرق بين Discretization وBinarization؟
A: Discretization يحوّل صفة رقمية إلى فئوية؛ Binarization يحوّل صفة رقمية أو فئوية إلى صفة أو أكثر ثنائية.

---

**Q14:** كم عدد الصفات الثنائية اللازمة لتمثيل صفة فئوية بـm قيمة (بالطريقة المضغوطة العامة)؟
A: n = ⌈log₂(m)⌉ صفة ثنائية.

---

**Q15:** ما الفرق بين Binarization العام (المضغوط) وBinarization غير المتماثل (Asymmetric)؟
A: العام يستخدم ⌈log₂m⌉ عمود مضغوط؛ غير المتماثل يستخدم عموداً منفصلاً كاملاً (m عمود) لكل قيمة، لأن فقط الحضور (=1) هو المهم إحصائياً.

---

**Q16:** ما نتيجة تطبيق `pd.cut()` مقابل `pd.qcut()` على عمود Clump Thickness في بيانات سرطان الثدي؟
A: `pd.cut()` (equal-width) أنتج فترات غير متساوية العدد (303, 210, 57, 129)؛ `pd.qcut()` (equal-frequency) كان سيُنتج فترات بأعداد متقاربة جداً (~175 لكل فترة).

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> الكود التالي مرجع شامل يجمع كل أنماط المعالجة المسبقة المطبَّقة عملياً على بيانات سرطان الثدي في هذه المحاضرة — مرجع للطالب، لا شرح جديد.

```python
# === Data Preprocessing ===
import pandas as pd
import numpy as np

# --- Load data ---
data = pd.read_csv(
    'https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.data',
    header=None
)
data.columns = ['Sample code', 'Clump Thickness', 'Uniformity of Cell Size', 'Uniformity of Cell Shape',
                'Marginal Adhesion', 'Single Epithelial Cell Size', 'Bare Nuclei', 'Bland Chromatin',
                'Normal Nucleoli', 'Mitoses', 'Class']
data = data.drop(['Sample code'], axis=1)

# --- Data Cleaning: Missing Values ---
data = data.replace('?', np.NaN)
for col in data.columns:
    print('%s: %d missing' % (col, data[col].isna().sum()))

# Method 1: fill with median
data2 = data['Bare Nuclei']
data2 = data2.fillna(data2.median())

# Method 2: drop rows with missing values
data3 = data.dropna()

# --- Data Cleaning: Noisy Data (Boxplot inspection) %matplotlib inline required ---
data_numeric = data.drop(['Class'], axis=1)
data_numeric['Bare Nuclei'] = pd.to_numeric(data_numeric['Bare Nuclei'])
data_numeric.boxplot(figsize=(20, 3))

# --- Data Smoothing: Binning example (manual) ---
price = sorted([4, 8, 9, 15, 21, 21, 24, 25, 26, 28, 29, 34])
# Equal-depth: split into 3 bins of 4 values each
bins_depth = [price[i:i+4] for i in range(0, len(price), 4)]

# --- Data Integration: Chi-square test for nominal attributes ---
from scipy.stats import chi2_contingency
observed = [[250, 200], [50, 1000]]  # fiction/non-fiction x male/female
chi2, p, dof, expected = chi2_contingency(observed, correction=False)
print(f"chi2={chi2:.2f}, dof={dof}, expected={expected}")

# --- Data Integration: Pearson correlation for numeric attributes ---
print(data.corr(numeric_only=True))

# --- Data Reduction: Duplicate detection ---
dups = data.duplicated()
print('Number of duplicate rows = %d' % (dups.sum()))
data_no_dups = data.drop_duplicates()

# --- Data Transformation: Normalization ---
def min_max_normalize(v, min_a, max_a, new_min=0.0, new_max=1.0):
    return (v - min_a) / (max_a - min_a) * (new_max - new_min) + new_min

def z_score_normalize(v, mean_a, std_a):
    return (v - mean_a) / std_a

def decimal_scaling_normalize(v, j):
    return v / (10 ** j)

# --- Data Transformation: Discretization ---
bins_width = pd.cut(data['Clump Thickness'].astype(float), 4)
bins_freq = pd.qcut(data['Clump Thickness'].astype(float), 4)
```

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع سرد عوامل جودة البيانات الستة وأمثلة كل منها.
- [ ] أستطيع التمييز بين البيانات غير الدقيقة، الناقصة، وغير المتّسقة بأمثلة.
- [ ] أعرف الطرق الأربع الأولية للتعامل مع القيم المفقودة (تجاهل سجل/قيمة، حذف صفة، تعويض يدوي).
- [ ] أعرف طرق التعويض الآلي (ثابت عام، نزعة مركزية، حسب الفئة، الأكثر احتمالاً).
- [ ] أستطيع شرح Binning (Equal-width مقابل Equal-depth) وحساب أمثلة يدوياً.
- [ ] أستطيع حساب χ² كاملاً لجدول طوارئ 2×2 وتفسير النتيجة.
- [ ] أستطيع حساب معامل ارتباط بيرسون خطوة بخطوة لبيانات بسيطة.
- [ ] أفهم لماذا "correlation does not imply causality" مع مثال جاهز.
- [ ] أعرف كيفية اكتشاف وحذف السجلات المكرَّرة، وأتحقق من السياق قبل الحذف.
- [ ] أستطيع حساب Min-Max, Z-Score, وDecimal Scaling Normalization يدوياً.
- [ ] أعرف متى أختار كل طريقة تطبيع حسب وجود قيم شاذة من عدمها.
- [ ] أفهم الفرق بين Discretization وBinarization ومتى نستخدم كلاً منهما.
- [ ] أستطيع حساب عدد الأعمدة الثنائية اللازمة (log2 m) للتحويل الثنائي العام.
- [ ] أفهم الفرق بين Binarization العام وBinarization غير المتماثل.
- [ ] راجعت جميع أسئلة MCQ (16) وفهمت تعليل كل خيار.
- [ ] راجعت أسئلة تصحيح الكود (5) وفهمت كل خطأ وتصحيحه.
- [ ] حللت التمارين التطبيقية والتحليلية وتمارين التتبع كاملة (خصوصاً الحسابات اليدوية لـχ² والارتباط والتطبيع).
- [ ] راجعت بطاقات Q&A (16 بطاقة) وورقة الـ Cheat Sheet قبل الامتحان مباشرة.

---

<!--
VALIDATION:
- Source lecture: KDD-Lecture3.pdf (Data Preprocessing) — 52 slides, Dr. Asmaa Shaar.
- Lecture type detected: Data Preprocessing (explicit category match from custom_prompt.md: Missing Values, Noise, Normalization, Binning, Correlation, Chi-Square, Discretization all present and used verbatim).
- All slide content covered in Part 1 (sections 1-36) sequentially following original slide order: Why Preprocessing (data quality, dirty data types) → Data Cleaning (missing data handling methods, Breast Cancer dataset example, noisy data/Binning with 2 fully worked examples) → Data Integration (chi-square test with full worked example, Pearson correlation with full worked Ice Cream example, correlation-is-not-causation) → Data Reduction (duplicate data detection/removal) → Data Transformation (Normalization: Min-Max/Z-Score/Decimal Scaling all with worked examples, Discretization/Binarization with worked examples).
- All formulas (χ², Pearson's r, Min-Max, Z-Score, Decimal Scaling, Equal-width W, log2 m) computed exactly matching the lecture's own worked numbers (χ²=507.93, r=0.9575, 0.716, 1.225, -0.986/0.917, etc.).
- Counts delivered: MCQ=16, Debug=5, Practice exercises=6, Analysis exercises=4, Trace exercises=5, Theory questions=11, QA cards=16, Cheat sheet=complete, Full code reference=complete.
- All English terms formatted in backticks; all algorithm/diagram blocks follow SCHEMA.md v1.0 formatting.
-->
