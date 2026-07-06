# المحاضرة 2 — Getting to Know Your Data (التعرّف على بياناتك)
> **المادة:** اكتشاف المعرفة في قواعد البيانات (القسم العملي) | **الموضوع:** أنواع الكائنات والصفات (`Data Objects & Attribute Types`)، خصائص وأنواع مجموعات البيانات، الأوصاف الإحصائية الأساسية للبيانات (`Data Preprocessing` / تحليل استكشافي)

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| 1. Introduction | مفاهيم عامة، KDD Process | فهم لماذا ووجود Data Mining |
| 2. Getting to Know Your Data ← أنت هنا | `pandas` (`describe`, `value_counts`, `boxplot`, `hist`)، إحصاء وصفي | فهم أنواع الصفات، خصائص البيانات، ملخصات إحصائية، اكتشاف قيم شاذة أولية |
| 3. Data Preprocessing | تنظيف، تطبيع، تقطيع (Binning) | بيانات جاهزة للتنقيب |
| 4. Frequent Patterns & ARM | `Apriori`, `support`, `confidence` | قواعد ترافق |
| 5. Regression | `Linear/Polynomial Regression` | نموذج تنبؤ رقمي |
| 6. Classification | `Decision Tree`, `Naive Bayes`, `kNN`, `SVM` | نموذج تصنيف |
| 7. Cluster Analysis | `k-Means`, `k-Medoids` | تجميع بدون إشراف |
| 9. Measuring Data Similarity | مقاييس التشابه/التباعد | أساس لخوارزميات التصنيف والتجميع |

> **نوع هذه المحاضرة:** محاضرة **تمهيدية إحصائية / تحليل استكشافي للبيانات** (جزء من مرحلة `Data Preprocessing` الواسعة) — تركّز على: `Attribute Types` (Nominal, Binary, Ordinal, Interval, Ratio)، خصائص مجموعات البيانات (Dimensionality, Resolution, Distribution)، وأدوات الإحصاء الوصفي (Mean, Median, Mode, Variance, IQR, Boxplot, Histogram). المصطلحات المفتاحية المستخدمة: `Missing Values` (ضمنياً عبر count)، `Noise`، `Discretization` (في الـ Histogram)، `Correlation`/`Chi-Square` (مذكورة كعمليات لاحقة على Nominal attributes).

---

## الجزء الأول: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

### 1. لماذا نحتاج التعرّف على بياناتنا أولاً؟

#### النص الأصلي يقول:
> "To start data mining, we need a closer look at attributes and data values to get the data ready. Why? Real-world data are typically noisy, enormous in volume, and may originate from a mixture of heterogeneous sources → problems. 'Garbage in, garbage out' — Your analysis is as good as your data."

#### الشرح المبسّط:
قبل البدء بأي عملية تنقيب فعلية، يجب أن ننظر بعناية إلى صفات (`attributes`) بياناتنا وقيمها. السبب أن البيانات الواقعية غالباً **مليئة بالضوضاء** (`noisy`)، **ضخمة الحجم**، ومصدرها **مصادر متغايرة** (`heterogeneous sources`) — وهذا كله يسبب مشاكل لاحقة إن لم نتعامل معه أولاً.

**لماذا؟** لأنه مهما كانت خوارزمية التنقيب المستخدمة متطورة، فإن جودة نتائجها محكومة بجودة البيانات المُدخَلة — هذا ما تلخصه العبارة الشهيرة "Garbage in, garbage out" (مدخلات رديئة = مخرجات رديئة).

أسئلة هذه المحاضرة الأساسية: ما أنواع صفات بياناتنا؟ ما نوع القيم لكل صفة؟ كيف تتوزّع القيم؟ هل يمكن تصوّرها بصرياً لفهم أفضل؟ هل يمكن اكتشاف قيم شاذة؟

#### 💡 التشبيه:
> قبل أن يطبخ الطاهي أي وصفة، عليه أولاً تفحّص مكوناته: هل هي طازجة؟ فاسدة؟ من أي نوع؟
> **وجه الشبه:** فحص المكونات قبل الطبخ = التعرّف على أنواع الصفات وجودتها قبل التنقيب.

---

### 2. ما هي البيانات؟ (`What is Data?`)

#### النص الأصلي يقول:
> "A Collection of data objects... Data objects are typically described by attributes: An attribute is a data field, representing a characteristic of a data object... If the data objects are stored in a relational database, rows -> data objects; columns -> attributes. Dataset = data objects + features."

#### الشرح المبسّط:
مجموعة البيانات (`Dataset`) = مجموعة من **كائنات البيانات** (`data objects`, مثل العملاء أو المنتجات) + **الصفات** (`attributes`/`features`) التي تصفها (مثل `customer_ID`, `name`, `address`). في قاعدة بيانات علائقية: **الصفوف = كائنات البيانات**، و**الأعمدة = الصفات**.

#### قاموس المرادفات:

| المصطلح | مرادفاته | يُستخدم غالباً في |
| --- | --- | --- |
| `data object` | samples, examples, instances, data points, records, tuples | عام |
| `dimension` | — | `data warehousing` |
| `feature` | — | `Machine Learning` |
| `variable` | — | `statistics` |
| `attribute` | — | `Data Mining and Database` |

> القيم المُلاحَظة الفعلية لصفة معيّنة تُسمّى `observations`.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** في جدول بيانات مرضى (ID, Weight, Sex, Heart Rate...)، ما الذي يمثّل "كائن البيانات" وما الذي يمثّل "الصفة"؟
> **لماذا هذا مهم؟** لأن هذا التمييز (صف = كائن، عمود = صفة) هو الأساس لكل تحليل لاحق على البيانات المهيكلة.

---

### 3. الصفة مقابل قيم الصفة (`Attribute vs. Attribute Values`)

#### النص الأصلي يقول:
> "The attribute values may have properties that are not properties of the attribute itself, and vice versa. E.g., age attribute have a maximum while integers do not. Same attribute can be mapped to different sets of value... Different attributes can be mapped to the same set of values, But properties of attribute values can be different. E.g., Both of student_ID and student_age attributes can be represented as integers. Average is reasonable for student_age, but not for student_ID."

#### الشرح المبسّط:
هذه فكرة دقيقة ومهمة جداً: **قيم الصفة ليست دائماً لها نفس خصائص الصفة نظرياً**. ثلاث ملاحظات:
1. الصفة "العمر" (`age`) لها حد أقصى منطقي (لا أحد عمره 300 سنة)، لكن الأعداد الصحيحة (`integers`) رياضياً لا حد أقصى لها.
2. نفس الصفة يمكن قياسها بوحدات مختلفة: الطول بالقدم أو بالمتر (نفس الصفة، قيم مختلفة).
3. صفتان مختلفتان تماماً (`student_ID` و`student_age`) قد تُمثَّلان كليهما بأعداد صحيحة، لكن العمليات المنطقية عليهما مختلفة تماماً: حساب **متوسط العمر** منطقي، لكن حساب **متوسط رقم الهوية الجامعية** غير ذي معنى إطلاقاً.

**لماذا هذا مهم؟** لأنه أساس الدرس التالي مباشرة: يجب أن نعرف "نوع" الصفة الحقيقي (وليس فقط شكل تمثيلها كأرقام) قبل تطبيق أي عملية حسابية عليها.

#### الفهم الخاطئ الشائع ❌: إذا كانت القيمة رقماً، فيمكن حساب متوسطها دائماً.
#### الفهم الصحيح ✅: يجب النظر لطبيعة الصفة نفسها (هل هي معرّف/فئة أم كمية حقيقية) قبل تطبيق عمليات كالمتوسط.

---

### 4. أنواع الصفات: العمليات الأربع الأساسية

#### النص الأصلي يقول:
> "Attribute Types: Determined by the set of possible values the attribute can have. Important, to avoid foolish actions such as computing the average student_ID. depends on which of the following properties (operations) it possesses: Distinctness (= and ≠), Order (<, ≤, >, and ≥), Differences are meaningful (+ and −), Ratios are meaningful (∗ and /)."

#### الشرح المبسّط:
نوع الصفة يُحدَّد بمجموعة القيم الممكنة لها، وتحديداً بأي من هذه العمليات المنطقية تنطبق عليها:
1. **التمايز** (`Distinctness`: `=`, `≠`) — هل يمكن فقط معرفة أن قيمتين متساويتان أو مختلفتان؟
2. **الترتيب** (`Order`: `<`, `≤`, `>`, `≥`) — هل يمكن ترتيب القيم من الأصغر للأكبر؟
3. **الفروقات ذات معنى** (`Differences`: `+`, `−`) — هل طرح قيمتين يعطي نتيجة منطقية وقابلة للمقارنة؟
4. **النسب ذات معنى** (`Ratios`: `*`, `/`) — هل يمكن القول أن قيمة "ضعف" قيمة أخرى؟

**لماذا هذا الترتيب؟** لأنه تصاعدي: كل نوع لاحق من الصفات يملك كل خصائص الأنواع السابقة بالإضافة لخاصية جديدة، كما سنرى في الأنواع الأربعة القادمة.

---

### 5. الأنواع الأربعة للصفات + الكمي مقابل النوعي

#### النص الأصلي يقول:
> "Given these previous operations, we can define four types of attributes: Nominal (distinctness), Ordinal (distinctness & order), Interval (distinctness, order & differences), Ratio (all 4 operations). Quantitative attribute: Measurable quantity, represented by numbers, mathematical operations are meaningful. Qualitative attribute: describes attribute without giving an actual quantity, represented by words (categories), even if represented by numbers it should be treated more like symbols. Discrete vs. Continuous Attributes."

#### الشرح المبسّط:
بناءً على العمليات الأربع، تُصنَّف الصفات لأربعة أنواع، مجمّعة في فئتين أكبر:

| الفئة الكبرى | الأنواع | العمليات المتاحة |
| --- | --- | --- |
| **صفات نوعية** (`qualitative`) | `Nominal` | التمايز فقط |
| **صفات نوعية** (`qualitative`) | `Ordinal` | التمايز + الترتيب |
| **صفات كمية** (`quantitative`) | `Interval` | التمايز + الترتيب + الفروقات |
| **صفات كمية** (`quantitative`) | `Ratio` | كل العمليات الأربع (بما فيها النسب) |

الفرق الجوهري بين الكمي والنوعي:

| المعيار | `Quantitative` (كمي) | `Qualitative` (نوعي) |
| --- | --- | --- |
| الطبيعة | كمية قابلة للقياس فعلياً | يصف الصفة بدون إعطاء كمية حقيقية |
| التمثيل | بالأرقام | بالكلمات (فئات)، وحتى لو مثّلناها بأرقام يجب معاملتها كرموز |
| العمليات الرياضية | ذات معنى | غير ذات معنى (حتى لو ظهرت كأرقام) |

كذلك تُصنَّف الصفات الكمية إلى **منفصلة** (`Discrete`, قيم معدودة كعدد الأطفال) و**مستمرة** (`Continuous`, قيم ضمن مجال حقيقي كالطول والوزن) — تفصيل هذا التقسيم لم يُشرَح رقمياً في هذه الشريحة لكنه ورد كعنوان.

#### 💡 التشبيه:
> تخيّل مقياس حرارة (كمي، أرقام حقيقية بفروقات ونِسَب ذات معنى) مقابل لافتة تحمل اسم مدينة (نوعي، مجرد رمز يميّز مكاناً عن آخر).
> **وجه الشبه:** رقم الحرارة القابل للجمع والطرح = كمي، اسم المدينة الذي لا معنى لـ"جمعه" = نوعي.

---

### 6. الصفات الاسمية (`Nominal Attributes`)

#### النص الأصلي يقول:
> "The values are symbols or 'names of things'... also referred to as categorical... Each value represents some category or state. Only distinctness operation apply, i.e., equal (=) and different (≠). In addition, we can find the mode. Examples: Marital_status={single, married, divorced, widowed}, Occupation={engineer, doctor, teacher,…}, ID_numbers — in such cases, the numbers are not intended to be used quantitatively."

#### الشرح المبسّط:
الصفات الاسمية (`Nominal`, وتُسمّى أيضاً `categorical`) قيمها مجرد "أسماء" أو رموز تميّز فئة عن أخرى، دون أي ترتيب منطقي بينها. العملية الوحيدة المسموحة رياضياً: **التمايز** (`=`, `≠`) فقط، ويمكننا حساب **المنوال** (`mode`) فقط كمقياس نزعة مركزية. حتى لو كانت القيم أرقاماً (كأرقام الهويات `ID_numbers`)، فهذه الأرقام **ليست مقصودة للاستخدام الكمي** إطلاقاً (لا يُجمَع ولا يُطرَح ولا يُحسَب متوسطها).

**أمثلة:** `Marital_status = {single, married, divorced, widowed}`, `Occupation = {engineer, doctor, teacher, ..., driver}`, `ID_numbers`.

#### مهم للامتحان ⚠️:
> `ID_numbers` مثال كلاسيكي على صفة اسمية رغم كونها أرقاماً — سؤال شائع جداً في الامتحانات: "لماذا لا يصح حساب متوسط أرقام الهوية؟"

---

### 7. الصفات الثنائية (`Binary Attributes`)

#### النص الأصلي يقول:
> "A nominal attribute with only two values: {0,1} or {true, false}... A binary attribute is: Symmetric, if both of its states are equally valuable, e.g., gender (male, female). Asymmetric, if both of its states are not equally valuable, E.g., the HIV medical test (positive, negative). By convention, we code the most important state (rarer one) by 1... and the other by 0."

#### الشرح المبسّط:
الصفة الثنائية (`Binary`) هي حالة خاصة من الصفة الاسمية بقيمتين فقط: `{0,1}` أو `{true, false}`، حيث عادة `0/false` = غياب الصفة و`1/true` = وجودها.

نوعان من الصفات الثنائية:

| النوع | التعريف | مثال |
| --- | --- | --- |
| `Symmetric` (متماثلة) | كلتا الحالتين لهما نفس القيمة/الأهمية | الجنس (ذكر، أنثى) |
| `Asymmetric` (غير متماثلة) | إحدى الحالتين أهم من الأخرى (عادة الأندر) | فحص HIV (إيجابي، سلبي) — نُرمّز الحالة الأهم (الإيجابي، الأندر) بـ 1 |

**لماذا يهم التمييز بين متماثلة وغير متماثلة؟** لأنه سيؤثر لاحقاً (في محاضرة قياس التشابه، محاضرة 9) على كيفية حساب التشابه بين كائنين — في الحالات غير المتماثلة، تطابق الحالتين "0" معاً لا يُعتبر دليل تشابه قوي كما هو الحال في تطابق "1" معاً (نادرة ومهمة).

#### 💡 التشبيه:
> فحص كوفيد إيجابي/سلبي — النتيجة "إيجابي" (نادرة ومهمة) تُعطى أولوية ترميز أعلى (1) من "سلبي" الشائعة.
> **وجه الشبه:** الحالة النادرة والمهمة = يُرمَّز بـ 1، الحالة الشائعة العادية = يُرمَّز بـ 0.

---

### 8. الصفات الترتيبية (`Ordinal Attributes`)

#### النص الأصلي يقول:
> "Similar to nominal attribute with a meaningful order among their values... The magnitude between successive values is not known. Examples: Size={small, medium, large}, grades={A+, A, A-}, Movie_ratings={hate, dislike, indifferent, like, love}. The central tendency... can be represented by its mode and its median, but the mean cannot be defined."

#### الشرح المبسّط:
الصفة الترتيبية (`Ordinal`) تشبه الاسمية لكن مع **ترتيب منطقي** بين القيم (`<`, `≤`, `>`, `≥`)، لكن **مقدار الفرق** بين قيمتين متتاليتين **غير معروف**. مثال: نعرف أن "كبير" > "متوسط" > "صغير"، لكن لا نعرف "بكم" بالضبط يكبر الحجم الكبير عن المتوسط.

**أمثلة:** `Size = {small, medium, large}`, `grades = {A+, A, A-}`, `Movie_ratings = {hate, dislike, indifferent, like, love}` أو `{★, ★★, ★★★, ★★★★, ★★★★★}`.

**النزعة المركزية:** يمكن حساب **المنوال** (`mode`) و**الوسيط** (`median`)، لكن **لا يمكن تعريف المتوسط الحسابي** (`mean`) بشكل صحيح، لأن الفرق بين القيم غير معروف رياضياً.

> ملاحظة: `Nominal`, `Binary`, و`Ordinal` كلها صفات **نوعية** (`qualitative`).

---

### 9. الصفات الفاصلية (`Interval-Scaled Attributes`)

#### النص الأصلي يقول:
> "A numeric attribute which is measured on a scale of equal-size units. e.g., calendar dates, Temperature in Fahrenheit or Celsius. Differences (+ and −) between values are meaningful... No true zero-point, therefore we cannot speak of the values in terms of ratios... The central tendency can be represented by its mode, median and mean value."

#### الشرح المبسّط:
صفة رقمية (`numeric`) تُقاس على مقياس بوحدات متساوية الحجم (`equal-size units`)، فتصبح **الفروقات ذات معنى**: الفرق بين 90° و100° هو نفسه الفرق بين 40° و50°. لكن **لا يوجد صفر حقيقي** (`no true zero-point`) — صفر درجة مئوية لا يعني "غياب الحرارة"، وسنة 0 ميلادية لا تعني "بداية الزمن" — لذا **لا يصح الحديث عن النسب** (لا يصح القول "20° أسخن ضعف 10°").

**أمثلة:** التواريخ التقويمية (`calendar dates`)، درجة الحرارة بالفهرنهايت أو المئوية.

**النزعة المركزية:** يمكن حساب المنوال، الوسيط، **والمتوسط الحسابي** أيضاً (لأن الفروقات ذات معنى).

---

### 10. الصفات النسبية (`Ratio-Scaled Attributes`)

#### النص الأصلي يقول:
> "A numeric attribute with an inherent zero-point. Therefore, we can speak of a value as being a multiple (or ratio) of another value. E.g., a 100 kgs person is twice heavy as a 50 kgs person... Examples: temperature in Kelvin, Count attributes such as years_of_experience, Attributes to measure weight, height, mass, age. Interval-scale and Ratio-Scaled attributes are quantitative."

#### الشرح المبسّط:
صفة رقمية لها **صفر حقيقي (`inherent zero-point`)**، أي "الصفر" هنا يعني فعلاً "لا شيء" أو "غياب تام للكمية". هذا يسمح بالحديث عن **النسب**: شخص وزنه 100 كغ هو ضعف شخص وزنه 50 كغ فعلياً (لأن صفر كغ = "لا وزن إطلاقاً").

**أمثلة:** درجة الحرارة بالكلفن (`Kelvin` — للصفر هنا معنى فيزيائي حقيقي "الصفر المطلق")، صفات العد مثل `years_of_experience`، الوزن، الطول، الكتلة، العمر.

**النزعة المركزية:** يمكن حساب المنوال، الوسيط، والمتوسط الحسابي (وأيضاً المتوسط الهندسي/التوافقي كما في الجدول الملخّص).

> `Interval-Scaled` و`Ratio-Scaled` كلاهما صفات **كمية** (`quantitative`).

#### ⚖️ المقايضة: `Interval` مقابل `Ratio`

| | `Interval-Scaled` | `Ratio-Scaled` |
| --- | --- | --- |
| المزايا | يسمح بالجمع والطرح المنطقي بين القيم | يسمح بكل العمليات، بما فيها النسب والضرب/القسمة |
| العيوب | لا يوجد صفر حقيقي، فلا يصح الحديث عن "أضعاف" | يتطلّب وجود صفر حقيقي فعلياً وهذا غير متاح لكل الصفات |
| متى تختاره | عند قياس درجة الحرارة أو التواريخ | عند قياس الوزن، الطول، العمر، سنوات الخبرة |

---

### 11. جدول ملخّص أنواع الصفات

#### النص الأصلي يقول:
> Attribute Types Summary table: Nominal (=, ≠) → zip codes, employee ID, eye color, gender, marital status → mode, entropy, Contingency correlation, χ2 test. Ordinal (=, ≠, <, >) → hardness of minerals, grades, size, height, professional rankings → median, rank correlation. Interval-Scaled (=, ≠, <, >, +, −) → calendar dates, temperature (C/F) → mean, standard deviation, Pearson's Correlation. Ratio-Scaled (=, ≠, <, >, +, −, *, /) → temperature in Kelvin, monetary quantities, counts, age, length, electrical current → geometric mean, harmonic mean, percent variation.

#### الشرح المبسّط:
هذا الجدول مرجع شامل يجمع كل ما سبق، ويضيف تفصيلاً جديداً مهماً: **أي المقاييس والاختبارات الإحصائية تُستخدم مع كل نوع**:

| نوع الصفة | الوصف | أمثلة | العمليات المسموحة (رمزياً) |
| --- | --- | --- | --- |
| `Nominal` | تمييز كائن عن آخر فقط | zip codes, employee ID, eye color, gender, marital status | `mode`, `entropy`, `Contingency correlation`, `χ2 test` |
| `Ordinal` | معلومات كافية لترتيب الكائنات | hardness of minerals, grades, size, professional rankings | `median`, `rank correlation` |
| `Interval-Scaled` | الفروقات ذات معنى (وحدة قياس موجودة) | calendar dates, temperature (°C/°F) | `mean`, `standard deviation`, `Pearson's Correlation` |
| `Ratio-Scaled` | الفروقات والنسب معاً ذات معنى | temperature (Kelvin), monetary quantities, counts, age, length | `geometric mean`, `harmonic mean`, `percent variation` |

**لماذا يهم هذا عملياً؟** لأنه يحدد أي اختبار إحصائي أو مقياس ارتباط (`correlation`) صحيح الاستخدام حسب نوع صفتك — استخدام `Pearson's Correlation` (المخصص للصفات الفاصلية/النسبية) على صفة اسمية مثلاً يُعتبر خطأً منهجياً.

---

### 12. كيف نستخرج الصفات؟ (`How Do We Extract Features?`)

#### النص الأصلي يقول:
> "In many cases, we are not given a feature description of the data, so we have to extract the features. Feature extraction depends on the application: Images: Color histograms, Gene data: gene expression level, Text data: Word frequencies. Traditionally features were handcrafted. Nowadays, features can be also learned (e.g., through DNNs). Hybrid approaches also exist."

#### الشرح المبسّط:
أحياناً لا تأتي البيانات جاهزة بصفات محددة مسبقاً (كالصور أو النصوص الخام)، فنحتاج **استخراج الصفات** (`Feature Extraction`) بأنفسنا، وطريقة الاستخراج تعتمد كلياً على التطبيق:

| نوع البيانات | كيف نستخرج صفاتها |
| --- | --- |
| الصور (`Images`) | مخططات ألوان (`Color histograms` — توزيع الألوان في الصورة) |
| بيانات جينية (`Gene data`) | مستوى التعبير الجيني (`gene expression level`) |
| النصوص (`Text data`) | تكرار الكلمات (`Word frequencies`) |

تقليدياً كانت هذه الصفات تُصمَّم يدوياً (`handcrafted`)، أما اليوم فيمكن للنماذج **تعلّم الصفات بنفسها** (مثلاً عبر الشبكات العصبية العميقة `DNNs`)، وتوجد أيضاً طرق هجينة (`hybrid`) تجمع الأسلوبين.

---

### 13. الخصائص العامة لمجموعات البيانات: `Dimensionality` و`Resolution`

#### النص الأصلي يقول:
> "Three characteristics have a significant impact on the DM techniques: 1. Dimensionality: number of attributes that the data objects possess. More difficulties associated with the analysis of high-dimensional data → An important step in preprocessing is dimensionality reduction. 2. Resolution: The patterns in the data depend on its level of resolution. If the resolution is too fine, a pattern may not be visible or may be buried in noise; too coarse, the pattern can disappear. For example, variations in weather on a scale of hours reflect the movement of storms while on a scale of months such phenomena are not detectable."

#### الشرح المبسّط:
ثلاث خصائص عامة لمجموعات البيانات تؤثر بشكل كبير على تقنيات `Data Mining` المستخدمة:

**1. الأبعاد (`Dimensionality`):** عدد الصفات التي يملكها كل كائن بيانات. كلما زاد عدد الأبعاد، زادت صعوبة التحليل (مشكلة تُعرف بـ`curse of dimensionality`)؛ لذا خطوة **تقليل الأبعاد** (`dimensionality reduction`) مهمة جداً في مرحلة التحضير المسبق.

**2. الدقة/الاستبانة (`Resolution`):** الأنماط الظاهرة في البيانات تعتمد على مستوى دقة الرصد:
- دقة **عالية جداً** (`too fine`): قد يختفي النمط وسط الضوضاء التفصيلية الزائدة.
- دقة **منخفضة جداً** (`too coarse`): قد يختفي النمط تماماً لأنه "مُتوسَّط" مع بيانات أخرى.

**مثال:** تقلّبات الطقس على مقياس **الساعات** تعكس حركة العواصف، لكن على مقياس **الأشهر** لا يمكن رصد هذه الظاهرة إطلاقاً (تختفي ضمن المتوسطات الشهرية).

#### 💡 التشبيه:
> النظر لصورة عبر مكبّر شديد جداً يُظهر فقط بكسلات متفرقة بلا معنى، بينما النظر من مسافة بعيدة جداً يُفقدك التفاصيل المهمة.
> **وجه الشبه:** مستوى التكبير غير المناسب = دقة/استبانة غير مناسبة، فقدان القدرة على رؤية "الصورة الكاملة الصحيحة" = فقدان النمط.

---

### 14. الخاصية الثالثة: التوزيع (`Distribution`) والتفرّط (`Sparsity`)

#### النص الأصلي يقول:
> "Distribution: frequency of occurrence of various values for the data attributes. Often, has a strong impact. E.g., suppose a class attribute, where one of the classes occurs 95%, while the other classes together occur only 5% ⟹ This skewness in the distribution can make classification difficult. A special case of skewed data is sparsity, most attributes of objects have values of 0."

#### الشرح المبسّط:
**التوزيع (`Distribution`)** هو مدى تكرار ظهور القيم المختلفة لصفة معيّنة، وله تأثير قوي جداً على أداء خوارزميات `Data Mining`.

**مثال مهم:** لو كانت صفة الفئة (`class attribute`) موزّعة بحيث فئة واحدة تمثل 95% من البيانات والفئات الأخرى مجتمعة 5% فقط — هذا **انحراف شديد في التوزيع** (`skewness`) يجعل مهمة `Classification` صعبة جداً (النموذج قد "يغش" بالتنبؤ دائماً بالفئة الأغلبية ويحقق دقة عالية ظاهرياً لكن بلا قيمة حقيقية).

**حالة خاصة من الانحراف: التفرّط (`Sparsity`)** — عندما تكون معظم قيم صفات الكائنات تساوي صفراً (شائع جداً في بيانات النصوص أو `Transaction Data`).

#### مهم للامتحان ⚠️:
> فرّق بين `skewness` العام (انحراف التوزيع نحو فئة/قيمة معينة) و`sparsity` (الحالة الخاصة حيث معظم القيم = صفر تحديداً).

---

### 15. التوزيع الطبيعي (`Gaussian Distribution`) كمرجع

#### النص الأصلي يقول:
> "The normal (Gaussian) distribution (μ: mean, σ: standard deviation)."

#### الشرح المبسّط:
التوزيع الطبيعي (الجرسي الشكل) يُستخدم كمرجع قياسي لوصف مدى انتشار البيانات حول المتوسط `μ` بوحدات الانحراف المعياري `σ`: حوالي 68.2% من البيانات تقع ضمن `μ ± 1σ`، و95.4% ضمن `μ ± 2σ`، و99.7% ضمن `μ ± 3σ`. هذا يُستخدم لاحقاً كأساس نظري لفهم مدى "طبيعية" أو "انحراف" توزيع صفة معينة.

---

### 16. أنواع مجموعات البيانات: نظرة عامة

#### النص الأصلي يقول:
> "when categorizing datasets, we should take specific applications into consideration — data may carry rather different semantics and require different DM methods. we have grouped the most common types of datasets into three groups: Record Data, Graph Data, Ordered Data. These categories do not cover all possibilities and other groupings are possible."

#### الشرح المبسّط:
عند تصنيف مجموعات البيانات، يجب مراعاة التطبيق المحدد، لأن البيانات قد تحمل معاني مختلفة تماماً وتتطلّب طرق تنقيب مختلفة. المحاضرة تجمّع أكثر الأنواع شيوعاً في ثلاث فئات رئيسية: **بيانات سجلّية** (`Record Data`)، **بيانات رسومية بيانية** (`Graph Data`)، و**بيانات مرتّبة** (`Ordered Data`) — مع التنويه أن هذا التصنيف **ليس شاملاً بالكامل** وتوجد تصنيفات أخرى ممكنة.

---

### 17. بيانات السجلات (`Record Data`)

#### النص الأصلي يقول:
> "Consists of a collection of records (data objects), each of which consists of a fixed set of attributes. usually stored either in flat files or in relational databases. 1. Data Matrix: represented by a matrix... Only numeric attributes → standard matrix operation can be applied. 2. Document Data: Each document becomes a term vector. 3. Transaction Data: each transaction includes a unique identity number (TID) and a list of the items."

#### الشرح المبسّط:
`Record Data` = مجموعة سجلات، كل سجل له **مجموعة ثابتة من الصفات** (نفس الأعمدة لكل الصفوف)، وتُخزَّن عادة في ملفات مسطحة (`flat files`) أو قواعد بيانات علائقية. ثلاثة أشكال فرعية:

| الشكل الفرعي | الوصف | مثال |
| --- | --- | --- |
| `Data Matrix` | مصفوفة m صف (كائنات) × n عمود (صفات رقمية فقط) → يمكن تطبيق عمليات المصفوفات القياسية | جدول قياسات فيزيائية (Load, Distance, Thickness...) |
| `Document Data` | كل مستند يصبح "متجه مصطلحات" (`term vector`) — عدد تكرار كل كلمة | مستندات نصية مع عد كلمات (team, coach, play...) |
| `Transaction Data` | كل معاملة لها رقم تعريف فريد (`TID`) وقائمة عناصر | سلة مشتريات: TID=1 → {Bread, Coke, Milk} |

**لماذا التمييز بين هذه الأشكال؟** لأن كل شكل يتطلّب معالجة مختلفة: `Data Matrix` تسمح بعمليات مصفوفات مباشرة، بينما `Transaction Data` تحتاج تمثيلاً خاصاً (كما سنرى لاحقاً في `Association Rule Mining`).

---

### 18. البيانات الرسومية البيانية (`Graph Data`)

#### النص الأصلي يقول:
> "A powerful representation for data. Two specific cases: 1. The graph captures relationships among data objects. e.g. Web pages contain HTML links to other pages. 2. The data objects themselves are represented as graphs: objects contain sub-objects that have relationships. e.g. structure of chemical compounds."

#### الشرح المبسّط:
`Graph Data` تمثيل قوي جداً للبيانات، له حالتان مختلفتان:
1. **الرسم البياني يمثّل العلاقات بين كائنات البيانات:** مثال: صفحات الويب المرتبطة ببعضها عبر روابط HTML (`World Wide Web`)، أو الشبكات الاجتماعية (`Social Networks`) حيث كل شخص عقدة والعلاقات بينهم روابط.
2. **الكائنات نفسها هي رسوم بيانية:** الكائن يحتوي كائنات فرعية مترابطة فيما بينها، مثال: تركيب المركّبات الكيميائية (جزيء البنزين `C6H6` يُمثَّل كذرات مترابطة).

**لماذا التفريق بين الحالتين؟** لأن الحالة الأولى تحلّل "الشبكة الكاملة" من كائنات، بينما الحالة الثانية تحلّل "بنية كل كائن مفرد" على حدة.

---

### 19. البيانات المرتّبة (`Ordered Data`): تسلسلية، متتابعة

#### النص الأصلي يقول:
> "A type of data where the attributes have relationships involve order in time or position. 1. Sequential Data: an extension of transaction data, where each transaction has a time associated with it. Each record could be the purchase history of a customer. 2. Sequence Data: a sequence of individual entities (such as a words or letters). no time stamps; instead, positions in an ordered sequence. Example, Genomic sequence data."

#### الشرح المبسّط:
`Ordered Data` نوع بياناته ترتبط فيه الصفات بعلاقة **ترتيب زمني أو مكاني**. نوعان أساسيان هنا:

| النوع | الوصف | الفارق الجوهري | مثال |
| --- | --- | --- | --- |
| `Sequential Data` (بيانات تسلسلية) | امتداد لبيانات المعاملات، لكن كل معاملة مرتبطة بـ **وقت** | يحمل **طابعاً زمنياً فعلياً** (`timestamp`) | تاريخ شراء كل عميل عبر الزمن (t1: C1 → A,B) |
| `Sequence Data` (بيانات متتابعة) | تسلسل كيانات فردية (كلمات، حروف) | لا يوجد طابع زمني، بل **مواقع** ضمن تسلسل مرتّب | البيانات الجينية (تسلسل قواعد GGTTCCGCC...) |

**لماذا هذا الفارق دقيق ومهم؟** لأن الطابع الزمني الحقيقي (`t1`, `t2`, `t3`...) يسمح بحساب فترات زمنية فعلية بين الأحداث، بينما "الموقع" في `Sequence Data` مجرّد ترتيب نسبي (الحرف الأول، الثاني...) بلا معنى زمني حقيقي.

---

### 20. البيانات المرتّبة: السلاسل الزمنية والبيانات المكانية

#### النص الأصلي يقول:
> "3. Time Series Data: ordered set of numeric measurements recorded at equal time intervals. E.g., Time series of the average monthly temperature for a city during the years 1982 to 1994. 4. Spatial Data: Data objects have spatial attributes as well as other types of attributes. E.g., weather data (temperature, pressure) that is collected for a variety of geographical locations."

#### الشرح المبسّط:
نوعان إضافيان من `Ordered Data`:

**3. السلاسل الزمنية (`Time Series Data`):** مجموعة قياسات رقمية مرتّبة، مُسجَّلة على **فواصل زمنية متساوية** (كل ساعة أو كل يوم). مثال: متوسط درجة الحرارة الشهرية لمدينة معيّنة عبر سنوات متتالية (1982-1994) — رسم بياني متكرر الشكل (موسمي).

**4. البيانات المكانية (`Spatial Data`):** كائنات بيانات تملك **صفات مكانية (جغرافية)** بالإضافة لصفات أخرى. مثال: بيانات الطقس (حرارة، ضغط) مُجمَّعة لمواقع جغرافية مختلفة حول العالم (كخريطة حرارية عالمية).

**لماذا نميّز `Time Series` عن `Spatial`؟** لأن الأولى تركّز على البُعد **الزمني** فقط لكائن واحد (مدينة واحدة عبر الزمن)، بينما الثانية تركّز على البُعد **المكاني** (مواقع متعددة في لحظة زمنية واحدة أو أكثر).

---

### 21. بيانات مهيكلة مقابل غير مهيكلة (`Structured vs. Unstructured Data`)

#### النص الأصلي يقول:
> "structured data: stored in data repositories have uniform, record- or table-like structures with a fixed set of attributes. unstructured data: such as text data and multimedia (e.g., audio, image, video) data. The real-world data can often be a mixture of structured and unstructured data. E.g., an online shopping website may host products information: can be structured data... some fields may be text, image, and video data."

#### الشرح المبسّط:
**البيانات المهيكلة (`Structured`):** بنية موحّدة شبيهة بالجدول، بمجموعة صفات ثابتة (كملفات Excel أو CSV).
**البيانات غير المهيكلة (`Unstructured`):** كالنصوص والوسائط المتعددة (صوت، صورة، فيديو) التي لا تتبع بنية جدولية ثابتة.

**الواقع العملي:** غالباً ما تكون البيانات **مزيجاً** من الاثنين. مثال: موقع تسوّق إلكتروني يخزّن بيانات منتجات: حقول ثابتة كالاسم والسعر (**مهيكلة**، في قاعدة بيانات علائقية)، بينما حقول أخرى كصور المنتج وفيديو الإعلان (**غير مهيكلة**).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** هل منشور على مواقع التواصل الاجتماعي (يحتوي نصاً + صورة + بيانات وقت النشر وعدد الإعجابات) مهيكل أم غير مهيكل أم مزيج؟
> **لماذا هذا مهم؟** لأن أغلب البيانات الواقعية الحديثة (كمنشورات السوشال ميديا) هي **مزيج** من النوعين، وهذا يتطلّب معالجة هجينة.

---

### 22. بيانات مخزَّنة مقابل متدفقة (`Stored vs. Streaming Data`)

#### النص الأصلي يقول:
> "Static: such as those stored in various kinds of data repositories. Streaming: data stream in dynamically and constantly, such as video surveillance or remote sensing."

#### الشرح المبسّط:
**بيانات مخزَّنة (`Static/Stored`):** موجودة مسبقاً في مستودعات بيانات مختلفة (كملف CSV محفوظ). **بيانات متدفقة (`Streaming`):** تصل بشكل ديناميكي ومستمر دون توقف، مثل كاميرات المراقبة الحية (`video surveillance`) أو الاستشعار عن بُعد (`remote sensing`) — هذا يتطلّب معالجة فورية (`real-time`) بدلاً من المعالجة الدفعية على بيانات مخزَّنة بالكامل مسبقاً.

---

### 23. مثال تطبيقي: بيانات Iris + تحميلها بـ`pandas`

#### النص الأصلي يقول:
> "Iris sample data: contains information on 150 Iris flowers, 50 each from one of three Iris species: Setosa, Versicolour, and Virginica. Each flower is characterized by five attributes: sepal length, sepal width, petal length, petal width (Continuous, Feature), class (Categorical, Target)."

#### الشرح المبسّط:
`Iris dataset` مجموعة بيانات كلاسيكية شهيرة جداً في تعليم `Data Mining`/`ML`: 150 زهرة (50 من كل نوع من 3 أنواع: `Setosa`, `Versicolour`, `Virginica`)، ولكل زهرة 5 صفات: 4 صفات مستمرة (`Continuous`, هي `sepal length`, `sepal width`, `petal length`, `petal width` بالسنتيمتر) وصفة فئوية هدف واحدة (`class`, وهي نوع الزهرة).

هذا مثال حي على **بيانات سجلية** (`Record Data` / `Data Matrix` جزئياً) تحتوي مزيجاً من صفات **نسبية** (القياسات بالسنتيمتر، لها صفر حقيقي) وصفة **اسمية** (النوع).

#### 💻 الكود: تحميل بيانات Iris بواسطة `pandas`

#### ما هذا الكود؟
> يستخدم `pandas` لقراءة ملف بيانات Iris مباشرة من رابط إنترنت وتخزينه في `DataFrame`، ثم عرض أول 5 صفوف للتحقق من صحة التحميل.

```python
# Import pandas for data handling
import pandas as pd

# Read the Iris dataset directly from a URL; the raw file has no header row
data = pd.read_csv('http://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data', header=None)

# Manually assign column names since the file has none
data.columns = ['sepal length', 'sepal width', 'petal length', 'petal width', 'class']

# Display the first five rows to verify the load
data.head()
```

#### شرح كل سطر:
1. `import pandas as pd` → استيراد المكتبة الأساسية لمعالجة البيانات الجدولية.
2. `data = pd.read_csv(url, header=None)` → قراءة الملف من الإنترنت مباشرة؛ `header=None` لأن الملف الخام لا يحتوي صف عناوين أعمدة.
3. `data.columns = [...]` → تسمية الأعمدة يدوياً بأسماء الصفات الخمس المعروفة.
4. `data.head()` → عرض أول 5 صفوف للتأكد من صحة القراءة والتسمية.

**المكتبات المطلوبة (Imports):**
> `import pandas as pd`

**الناتج المتوقع:**
> جدول من 5 صفوف و5 أعمدة (`sepal length`, `sepal width`, `petal length`, `petal width`, `class`)، حيث تظهر أول 5 أزهار جميعها من نوع `Iris-setosa`.

---

### 24. الإحصاء الوصفي للصفات الكمية بـ`pandas`

#### النص الأصلي يقول:
> "For each quantitative attribute, calculate its average, standard deviation, minimum, maximum values." (with code using `is_numeric_dtype`, `.mean()`, `.std()`, `.min()`, `.max()`)

#### الشرح المبسّط:
لكل صفة كمية في مجموعة البيانات، من المفيد حساب: **المتوسط** (`mean`)، **الانحراف المعياري** (`standard deviation`)، **الحد الأدنى** (`minimum`)، و**الحد الأقصى** (`maximum`) — وهذا بالضبط ما تعرضه دالة `describe()` لاحقاً بشكل مجمّع، لكن هنا نراها مطبَّقة صفة بصفة يدوياً.

#### 💻 الكود: حساب الإحصاء الوصفي لكل صفة كمية

#### ما هذا الكود؟
> يمرّ على كل أعمدة `DataFrame`، ويتحقق إن كان العمود رقمياً (`is_numeric_dtype`)، وإن كان كذلك يطبع متوسطه وانحرافه المعياري وحدَّيه الأدنى والأقصى.

```python
# Import a helper to check if a column's data type is numeric
from pandas.api.types import is_numeric_dtype

# Loop through every column in the DataFrame
for col in data.columns:
    # Only process columns that are numeric (skip categorical ones like 'class')
    if is_numeric_dtype(data[col]):
        print('%s:' % (col))
        print('\t Mean = %.2f' % data[col].mean())
        print('\t Standard deviation = %.2f' % data[col].std())
        print('\t Minimum = %.2f' % data[col].min())
        print('\t Maximum = %.2f' % data[col].max())
```

#### شرح كل سطر:
1. `from pandas.api.types import is_numeric_dtype` → استيراد دالة تتحقق مما إذا كان نوع بيانات العمود رقمياً.
2. `for col in data.columns:` → المرور على كل اسم عمود في الجدول.
3. `if is_numeric_dtype(data[col]):` → تصفية الأعمدة الرقمية فقط (استبعاد عمود `class` النوعي).
4. `print('%s:' % (col))` → طباعة اسم الصفة الحالية كعنوان.
5. `data[col].mean()`, `.std()`, `.min()`, `.max()` → حساب وطباعة المتوسط، الانحراف المعياري، الحد الأدنى، والحد الأقصى لهذه الصفة.

**المكتبات المطلوبة (Imports):**
> `from pandas.api.types import is_numeric_dtype`

**الناتج المتوقع:**
> لكل صفة من الصفات الأربع الكمية، طباعة أربعة أسطر (Mean, Standard deviation, Minimum, Maximum) — مثال فعلي من المحاضرة لـ `sepal length`: Mean=5.84, Std=0.83, Min=4.30, Max=7.90.

---

### 25. الإحصاء الوصفي للصفة النوعية: `value_counts()`

#### النص الأصلي يقول:
> "For the qualitative attribute (class), count the frequency for each of its distinct values." (with `data['class'].value_counts()`)

#### الشرح المبسّط:
للصفة النوعية (كصفة `class`)، لا معنى لحساب متوسط أو انحراف معياري؛ بل نحسب **تكرار كل قيمة مميّزة** (`frequency`) — وهذا يتوافق تماماً مع كون العملية الوحيدة المتاحة على الصفات الاسمية هي "المنوال" (تكرار كل فئة).

#### 💻 الكود: عدّ تكرار الفئات

```python
# Count how many times each distinct value of 'class' appears
data['class'].value_counts()
```

**الناتج المتوقع:**
> `Iris-setosa: 50`, `Iris-versicolor: 50`, `Iris-virginica: 50` — توزيع متوازن تماماً (50 لكل فئة)، بعكس مثال "الفئة 95%" المذكور سابقاً كحالة انحراف شديد.

---

### 26. التحليل الأحادي/الثنائي/المتعدد المتغيّرات

#### النص الأصلي يقول:
> "Univariate analysis: analysis of a single attribute. Bivariate analysis: the simultaneous analysis of two attributes (e.g., correlation coefficient, chi-square test). Multivariate analysis: simultaneous analysis of more than two attributes."

#### الشرح المبسّط:
ثلاثة مستويات لتحليل الصفات:

| المستوى | التعريف | عدد الصفات المُحلَّلة معاً | مثال أداة |
| --- | --- | --- | --- |
| `Univariate analysis` | تحليل صفة واحدة بمفردها | 1 | المتوسط، الانحراف المعياري لصفة واحدة |
| `Bivariate analysis` | تحليل متزامن لصفتين معاً | 2 | معامل الارتباط (`correlation coefficient`)، اختبار `chi-square` |
| `Multivariate analysis` | تحليل متزامن لأكثر من صفتين | >2 | تحليل مصفوفة `D` الكاملة (كل الأعمدة `X1...Xd` معاً) |

**لماذا يهم هذا التمييز؟** لأن هذه المحاضرة تركّز أساساً على **التحليل الأحادي** (`Univariate`)، بينما التحليل الثنائي والمتعدد (كالارتباطات) يُبنى عليه لاحقاً في محاضرات المعالجة المسبقة وقياس التشابه.

---

### 27. التحليل الأحادي: النزعة المركزية والتشتت والعرض البياني

#### النص الأصلي يقول:
> "Univariate Analysis: To identify the properties of an attribute values. Knowing such basic statistics regarding each attribute makes it easier to fill in missing values, smooth noisy values, and identify outliers during data preprocessing. Basic statistical descriptions: 1. Central tendency measures... 2. Dispersion measures... 3. Graphic displays of data distributions."

#### الشرح المبسّط:
الهدف من `Univariate Analysis` هو تحديد خصائص قيم صفة واحدة. **لماذا هذا مهم عملياً؟** لأن معرفة هذه الإحصاءات الأساسية تسهّل لاحقاً في مرحلة `Data Preprocessing`: **تعويض القيم المفقودة** (`missing values`)، **تنعيم القيم المشوَّشة** (`noisy values`)، و**اكتشاف القيم الشاذة** (`outliers`).

ثلاث فئات من الأوصاف الإحصائية الأساسية:
1. **مقاييس النزعة المركزية** (`Central tendency`): أين يتمركز معظم توزيع القيم؟ (المتوسط، الوسيط، المنوال، المدى المتوسط).
2. **مقاييس التشتت** (`Dispersion`): كيف تتوزّع/تنتشر القيم؟ (المدى، التباين، الانحراف المعياري، ملخص الأرقام الخمسة).
3. **العروض البيانية** (`Graphic displays`): للفحص البصري (المخططات الشريطية، المدرجات التكرارية، صندوق ولوحة `Boxplot`).

---

### 28. النزعة المركزية: المتوسط والمنوال

#### النص الأصلي يقول:
> "Mean: X̄ = (1/N) Σ Xi. A major problem with the mean is its sensitivity to extreme values (outlier)... use the trimmed mean. Mode: The value that occurs most frequently. It is possible to have more than one mode. if each data value occurs only once, then there is no mode."

#### الشرح المبسّط:
**1. المتوسط الحسابي (`Mean`):** مجموع كل القيم مقسوماً على عددها. مشكلته الرئيسية: **حساسيته الشديدة للقيم الشاذة** (`outliers`) — درجة واحدة منخفضة جداً في امتحان قد "تسحب" المتوسط للأسفل بشكل غير عادل. الحل: **المتوسط المشذَّب** (`trimmed mean`)، وهو المتوسط بعد حذف نسبة من القيم القصوى (الأعلى والأدنى) قبل الحساب.

**2. المنوال (`Mode`):** القيمة الأكثر تكراراً. يمكن أن يكون هناك أكثر من منوال (`bimodal`, `multimodal`)، وإن تكررت كل قيمة مرة واحدة فقط، فلا يوجد منوال إطلاقاً.

#### 📐 المعادلة: المتوسط الحسابي (`Mean`)

$$
\bar{X} = \frac{1}{N}\sum_{i=1}^{N} X_i
$$

**الشرح:**
> `N`: عدد القيم الكلي في مجموعة البيانات. `Xi`: القيمة رقم `i`. `X̄`: المتوسط الحسابي الناتج — مجموع كل القيم مقسوماً على عددها.

---

### 29. النزعة المركزية: الوسيط والمدى المتوسط

#### النص الأصلي يقول:
> "Median: The middle value in a set of ordered values. If N is odd, the median is the middle value. If N is even, the median is the average of the two middlemost values. Midrange: It is the average of the largest and smallest attribute values."

#### الشرح المبسّط:
**3. الوسيط (`Median`):** القيمة الوسطى بعد **ترتيب** القيم تصاعدياً. إن كان عدد القيم `N` **فردياً**، الوسيط هو القيمة الوسطى مباشرة. إن كان `N` **زوجياً**، الوسيط = متوسط القيمتين الوسطيّتين (بالتعريف الاصطلاحي).

**4. المدى المتوسط (`Midrange`):** متوسط أكبر وأصغر قيمة فقط (`(max + min) / 2`).

**لماذا الوسيط أفضل من المتوسط أحياناً؟** لأنه **أقل حساسية للقيم الشاذة** من المتوسط الحسابي (لا يتأثر كثيراً بقيمة متطرفة واحدة جداً).

#### 🔍 تتبّع التنفيذ: حساب الوسيط والمدى المتوسط لصفة الراتب

**المدخل:** قيم راتب مرتّبة تصاعدياً (بالآلاف): `30, 36, 47, 50, 52, 52, 56, 60, 63, 70, 70, 110` (N=12، عدد زوجي)

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تحديد أن N=12 (زوجي) | نحتاج القيمتين الوسطيّتين (الموضع 6 والموضع 7) |
| 2 | القيمتان الوسطيّتان | 52 و56 |
| 3 | حساب الوسيط | (52+56)/2 = 108/2 = **$54,000** |
| 4 | تحديد أصغر وأكبر قيمة | min=30, max=110 |
| 5 | حساب المدى المتوسط | (30,000+110,000)/2 = **$70,000** |

**النتيجة:** الوسيط = **$54,000**، المدى المتوسط = **$70,000** (مطابقان تماماً لمثال المحاضرة).

---

### 30. الانحراف (`Skewness`): تماثل أو انحياز التوزيع

#### النص الأصلي يقول:
> "Plotting the measures of central tendency shows us if the data are symmetric or skewed. symmetric data distribution => the mean, median, and mode are all at the same center value. It may instead be either: positively skewed, where the mode occurs at a value that is smaller than the median (income is a good example)... or negatively skewed, where the mode occurs at a value greater than the median."

#### الشرح المبسّط:
رسم مقاييس النزعة المركزية معاً يكشف طبيعة توزيع البيانات:
- **تماثل (`symmetric`):** المتوسط = الوسيط = المنوال، جميعها عند نفس القيمة المركزية.
- **انحراف موجب (`positively skewed`, أو "منحاز لليمين"):** المنوال يقع عند قيمة **أصغر** من الوسيط (الذيل الطويل يمتد لليمين نحو القيم الكبيرة). **مثال:** الدخل (`income`) — أغلب الناس دخلهم متقارب ومنخفض نسبياً، لكن قلة قليلة لديها دخل مرتفع جداً يسحب المتوسط لليمين.
- **انحراف سالب (`negatively skewed`, أو "منحاز لليسار"):** المنوال يقع عند قيمة **أكبر** من الوسيط.

#### 💡 التشبيه:
> تخيّل قاعة بها 100 شخص، 95 منهم رواتبهم متقاربة حول 3000$، وشخص واحد فقط (مليونير) راتبه 10 ملايين دولار — المتوسط الحسابي "يُخدَع" بهذه القيمة المتطرفة ويصبح أعلى بكثير من راتب "الشخص النموذجي".
> **وجه الشبه:** المليونير الواحد = القيمة المتطرفة التي تسحب المتوسط، غالبية الناس = تجمّع القيم قرب المنوال/الوسيط الحقيقيين.

---

### 31. مقاييس التشتت: المدى وربيعي البيانات (`IQR`)

#### النص الأصلي يقول:
> "Range: The distance between the largest and the smallest values. Inter-quartile range: Distance between the first and the third quartiles IQR=Q3-Q1, gives the range covered by the middle half of the data. Five number summary (min, Q1, median, Q3, max)... min=Q1-1.5×IQR, max=Q3+1.5×IQR — for identifying suspected outliers."

#### الشرح المبسّط:
**1. المدى (`Range`):** المسافة بين أكبر وأصغر قيمة (`max - min`).

**2. المدى الربيعي (`Inter-Quartile Range, IQR`):** المسافة بين الربيع الأول `Q1` والربيع الثالث `Q3` (`IQR = Q3 - Q1`)، ويمثّل المدى الذي يغطي **النصف الأوسط** من البيانات (فيتجاهل أطراف البيانات المتطرفة).

**3. ملخص الأرقام الخمسة (`Five-Number Summary`):** `(min, Q1, Median, Q3, max)`. الربيعيات الثلاثة (`Q1`, `Q2`=Median, `Q3`) هي القيم التي تقسم البيانات المرتّبة إلى 4 أجزاء متساوية (كل جزء 25% من البيانات).

**حدود اكتشاف القيم الشاذة المشتبه بها (`Suspected Outliers`):**
$$
\text{min bound} = Q1 - 1.5 \times IQR \qquad \text{max bound} = Q3 + 1.5 \times IQR
$$
أي قيمة تقع **خارج** هذا النطاق تُعتبر قيمة شاذة مشتبه بها.

#### 📐 المعادلة: المدى الربيعي وحدود القيم الشاذة

$$
IQR = Q_3 - Q_1
$$
$$
\text{Lower bound} = Q_1 - 1.5 \times IQR \qquad \text{Upper bound} = Q_3 + 1.5 \times IQR
$$

**الشرح:**
> `Q1`: الربيع الأول (القيمة التي تقع تحتها 25% من البيانات). `Q3`: الربيع الثالث (تقع تحته 75% من البيانات). أي قيمة أقل من `Lower bound` أو أكبر من `Upper bound` تُعتبر قيمة شاذة مشتبهاً بها.

---

### 32. مثال محسوب كاملاً: ملخص الأرقام الخمسة لصفة الراتب

#### النص الأصلي يقول:
> "Example: 30, 36, 47, 50, 52, 52, 56, 60, 63, 70, 70, 110. The Five number summary ($30,000 - $47,000 - $54,000 - $63,000 - $87,000). Q1=$47,000 (third value), Median=$54,000, Q3=$63,000 (ninth value), IQR=$16,000. Min=Q1-1.5×IQR=$23,000→$30,000 (actual). Max=Q3+1.5×IQR=$87,000."

#### الشرح المبسّط:
بتطبيق القواعد على نفس بيانات الراتب: `30, 36, 47, 50, 52, 52, 56, 60, 63, 70, 70, 110` (بالآلاف):

#### ⚙️ الخطوات / الخوارزمية: حساب ملخص الأرقام الخمسة وحدود القيم الشاذة
```algorithm
1 | ترتيب القيم تصاعدياً | البيانات الخام | 30,36,47,50,52,52,56,60,63,70,70,110
2 | تحديد Q1 (الربيع الأول) | القيمة الثالثة في الترتيب | Q1 = 47 (ألف دولار)
3 | تحديد الوسيط (Q2) | متوسط القيمتين السادسة والسابعة | Median = (52+56)/2 = 54
4 | تحديد Q3 (الربيع الثالث) | القيمة التاسعة في الترتيب | Q3 = 63 (ألف دولار)
5 | حساب IQR | Q3 - Q1 | IQR = 63 - 47 = 16
6 | حساب الحد الأدنى النظري | Q1 - 1.5×IQR | 47 - 24 = 23 → لكن أصغر قيمة فعلية هي 30، فتُستخدم 30 كحد فعلي
7 | حساب الحد الأعلى | Q3 + 1.5×IQR | 63 + 24 = 87
```
#### نقاط التنفيذ:
- القيمة 110 (أكبر راتب) **أقل من** الحد الأعلى المحسوب (87)! هذا يعني أنها **تتجاوز** 87 فعلياً (110 > 87) — وبالتالي **110 تُعتبر قيمة شاذة مشتبه بها** حسب هذه القاعدة.
- ملاحظة دقيقة: القيمة الدنيا الفعلية بالبيانات (30) أكبر من الحد الأدنى النظري (23)، لذا لا توجد قيم شاذة من الأسفل.

**النتيجة النهائية (ملخص الأرقام الخمسة):** `($30,000 - $47,000 - $54,000 - $63,000 - max الفعلي في البيانات)`، مع الإشارة إلى أن حدود اكتشاف الشذوذ هي `[23,000 → 87,000]` وأن القيمة 110,000 تقع خارجها وتُعتبر مشتبهاً بها كقيمة شاذة.

---

### 33. التباين والانحراف المعياري

#### النص الأصلي يقول:
> "The variance for the numeric attribute X is: σ² = (1/N)Σ(xi − x̄)². The standard deviation, σ, is the square root of the variance σ². A low σ means that the values tend to be very close to the mean. a high σ indicates that the values are spread out over a large range. σ=0 only when all data have the same value."

#### الشرح المبسّط:
**التباين (`Variance`, σ²):** متوسط مربعات الفروق بين كل قيمة والمتوسط الحسابي — يقيس "مدى تشتت" القيم حول المركز.
**الانحراف المعياري (`Standard Deviation`, σ):** الجذر التربيعي للتباين — يعيد القياس لنفس وحدة البيانات الأصلية (بعكس التباين الذي يكون بوحدات مربّعة).

- **σ منخفض:** القيم متقاربة جداً من المتوسط.
- **σ مرتفع:** القيم متناثرة على مدى واسع.
- **σ = 0:** فقط عندما تكون **كل** القيم متساوية تماماً (لا تشتت إطلاقاً).

#### 📐 المعادلة: التباين والانحراف المعياري

$$
\sigma^2 = \frac{1}{N}\sum_{i=1}^{N} (x_i - \bar{x})^2 \qquad \sigma = \sqrt{\sigma^2}
$$

**الشرح:**
> `xi`: القيمة رقم `i`. `x̄`: المتوسط الحسابي للصفة. `N`: عدد القيم. `σ²`: التباين (متوسط مربعات الانحرافات عن المتوسط). `σ`: الانحراف المعياري (جذر التباين، بنفس وحدة البيانات الأصلية).

#### 💡 التشبيه:
> شركتان لهما نفس متوسط رواتب (20 ألف)، لكن الشركة A رواتب موظفيها متقاربة جداً حول 19-21 ألف، بينما الشركة B فيها موظفون برواتب 15 ألف وآخرون بـ26 ألف (نفس المتوسط، تشتت مختلف تماماً) — كما في مثال المحاضرة (Company A و Company B بنفس المتوسط 20 لكن انتشار مختلف).
> **وجه الشبه:** تقارب رواتب الشركة A = انحراف معياري منخفض، تباعد رواتب الشركة B = انحراف معياري مرتفع رغم تساوي المتوسط.

---

### 34. الملخص الشامل بـ`describe()`

#### النص الأصلي يقول:
> "describe(): to display the summary for all the attributes simultaneously in a table. If an attribute is quantitative, it will display its mean, standard deviation and various quantiles... If an attribute is qualitative, it will display its number of unique values and the top (most frequent) values. Note that count refers to the number of non-missing values for each attribute."

#### الشرح المبسّط:
دالة `describe()` في `pandas` تعرض ملخصاً إحصائياً **لكل الصفات دفعة واحدة**:
- للصفات **الكمية**: `mean`, `std`, `min`, الربيعيات (`25%`, `50%`=Median, `75%`)، و`max`.
- للصفات **النوعية**: عدد القيم الفريدة (`unique`)، القيمة الأكثر تكراراً (`top`)، وعدد تكرارها (`freq`).
- عمود `count` في كلتا الحالتين يمثّل عدد **القيم غير المفقودة** فقط (`non-missing values`) — وهذا مؤشر عملي مهم جداً لاكتشاف وجود قيم مفقودة (`missing values`) من عدمه.

#### 💻 الكود: عرض ملخص شامل لكل الصفات

```python
# Display a full statistical summary for all columns (numeric and categorical)
data.describe(include='all')
```

**الناتج المتوقع:**
> جدول واحد يحتوي كل الأعمدة (sepal length...class)، حيث تظهر قيم `mean/std/min/25%/50%/75%/max` للأعمدة الرقمية و`NaN` في هذه الصفوف بالنسبة لعمود `class`، بينما تظهر `unique=3`, `top=Iris-setosa`, `freq=50` لعمود `class` فقط و`NaN` في هذه الصفوف للأعمدة الرقمية.

#### مهم للامتحان ⚠️:
> عمود `count` **لا يعني** "عدد كل الصفوف" بالضرورة، بل "عدد القيم **غير المفقودة**" لكل صفة — إذا اختلفت قيمة `count` بين الأعمدة، هذا مؤشر مباشر على وجود بيانات مفقودة (`missing values`) في بعض الأعمدة.

---

### 35. صندوق ولوحة (`Boxplot`): البنية والمكوّنات

#### النص الأصلي يقول:
> "a standardized way of displaying the distribution of data based on five-number summary. Boxplot: Data is represented with a box. The ends of the box are at the first and third quartiles, i.e., the length of the box is IQR. The median is marked by a line within the box. Whiskers: two lines outside the box extended to Minimum and Maximum. Outliers: points beyond a specified outlier threshold, plotted individually."

#### الشرح المبسّط:
`Boxplot` طريقة معيارية لعرض توزيع البيانات بصرياً بناءً على **ملخص الأرقام الخمسة**. مكوّناته:
- **الصندوق (`Box`):** طرفاه عند `Q1` و`Q3`؛ أي طول الصندوق = `IQR`.
- **خط الوسيط:** خط داخل الصندوق يمثّل `Median`.
- **الشعيرات (`Whiskers`):** خطان يمتدان خارج الصندوق حتى الحد الأدنى/الأقصى **غير الشاذ**.
- **القيم الشاذة (`Outliers`):** نقاط فردية تتجاوز حدود `1.5×IQR`، تُرسَم منفصلة عن الشعيرات.

#### 📊 المخطط: بنية `Boxplot`

#### ما هذا المخطط؟
> يوضّح كيف يمثّل `Boxplot` بصرياً ملخص الأرقام الخمسة وحدود اكتشاف القيم الشاذة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | Lower Whisker End | event | يمثّل أدنى قيمة غير شاذة (أو الحد Q1-1.5×IQR) |
| 2 | Q1 (بداية الصندوق) | event | الربيع الأول، حد الصندوق السفلي |
| 3 | Median Line | event | خط الوسيط داخل الصندوق |
| 4 | Q3 (نهاية الصندوق) | event | الربيع الثالث، حد الصندوق العلوي |
| 5 | Upper Whisker End | event | يمثّل أعلى قيمة غير شاذة (أو الحد Q3+1.5×IQR) |
| 6 | Outlier Points | event | نقاط فردية تتجاوز الشعيرات |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| Lower Whisker End | Q1 | شعيرة سفلية | تدفق عادي | تمثّل مدى القيم بين الحد الأدنى وبداية الصندوق |
| Q1 | Median Line | نصف الصندوق السفلي | تدفق عادي | يمثّل الربع الثاني من البيانات (25%-50%) |
| Median Line | Q3 | نصف الصندوق العلوي | تدفق عادي | يمثّل الربع الثالث من البيانات (50%-75%) |
| Q3 | Upper Whisker End | شعيرة علوية | تدفق عادي | تمثّل مدى القيم بين نهاية الصندوق والحد الأقصى |
| Upper Whisker End | Outlier Points | تجاوز الحد | سهم تنبيه | القيم التي تتجاوز 1.5×IQR تُرسَم كنقاط منفصلة |

```diagram
type: flowchart
title: Boxplot Structure
direction: TD
nodes:
  - id: lower
    label: Lower Whisker End
    kind: event
    level: 0
  - id: q1
    label: Q1
    kind: event
    level: 1
  - id: median
    label: Median Line
    kind: event
    level: 2
  - id: q3
    label: Q3
    kind: event
    level: 3
  - id: upper
    label: Upper Whisker End
    kind: event
    level: 4
  - id: outlier
    label: Outlier Points
    kind: event
    level: 5
edges:
  - from: lower
    to: q1
  - from: q1
    to: median
  - from: median
    to: q3
  - from: q3
    to: upper
  - from: upper
    to: outlier
```

---

### 36. استخدام `Boxplot` للمقارنة بين مجموعات بيانات

#### النص الأصلي يقول:
> "Boxplots can be used in the comparisons of several sets of compatible data. Example: boxplots for unit price data for items sold at four branches... For branch 1, we see that the median price of items sold is $80, Q1 is $60, and Q3 is $100. two outlying observations for branch 1 were plotted individually, as their values of 175 and 202. Boxplot 1 is comparatively short: similar values. Boxplots 3 are comparatively tall: quite different values."

#### الشرح المبسّط:
يمكن استخدام عدة صناديق `Boxplot` جنباً إلى جنب لمقارنة توزيعات بيانات متوافقة (كأسعار وحدات في 4 فروع مختلفة لنفس الشركة). من مثال المحاضرة: للفرع 1، الوسيط = 80$، `Q1` = 60$، `Q3` = 100$، مع قيمتين شاذتين (175 و202) تُرسَمان كنقاط منفردة.

**قاعدة القراءة البصرية:**
- صندوق **قصير** = قيم **متقاربة جداً** من بعضها (تشتت منخفض).
- صندوق **طويل** = قيم **متباينة كثيراً** (تشتت مرتفع).

#### ⚖️ المقايضة: صندوق قصير مقابل صندوق طويل

| | صندوق قصير (Boxplot 1) | صندوق طويل (Boxplot 3) |
| --- | --- | --- |
| المزايا | يدل على استقرار وتناسق في القيم (تنبؤ أسهل) | — |
| العيوب | — | يدل على تشتت كبير، صعوبة أكبر في التنبؤ |
| متى تفسّره | فرع بأسعار موحّدة نسبياً | فرع يبيع منتجات بأسعار متفاوتة جداً |

---

### 37. المدرجات التكرارية (`Histograms`) والمخططات الشريطية

#### النص الأصلي يقول:
> "x-axis are attribute values, y-axis are Frequencies. If the X attribute is nominal, then a vertical bar is drawn for each known value of X — known as a bar chart. If the X attribute is numeric, the term histogram is preferred. Different types: Equal width: divides the range of values into N intervals of equal size. Equal depth: divides the range of values into N intervals, each containing approximately same number of samples."

#### الشرح المبسّط:
في كلا المخططين، المحور السيني (`x-axis`) هو قيم الصفة، والمحور الصادي (`y-axis`) هو عدد التكرار (`Frequency`).
- إن كانت الصفة **اسمية** (`nominal`): يُرسَم شريط عمودي لكل قيمة معروفة → يُسمّى **مخططاً شريطياً** (`bar chart`).
- إن كانت الصفة **رقمية** (`numeric`): المصطلح المفضَّل هو **مدرّج تكراري** (`histogram`)، وله نوعان:
  - **متساوي العرض (`Equal width`):** يقسم مدى القيم إلى N فترات متساوية **الحجم**.
  - **متساوي العمق (`Equal depth`):** يقسم مدى القيم إلى N فترات، كل فترة تحتوي تقريباً **نفس عدد العيّنات**.

**لماذا التفريق بين النوعين؟** لأن `Equal width` قد يُنتج فترات فارغة أو مزدحمة جداً إذا كانت البيانات موزّعة بشكل غير منتظم، بينما `Equal depth` يضمن توزيعاً متوازناً للعينات لكن بفواصل متفاوتة العرض.

#### 💻 الكود: رسم مدرّج تكراري لصفة `sepal length`

```python
# Enable inline plotting in notebooks
%matplotlib inline

# Draw a histogram of 'sepal length' divided into 8 equal-width bins
data['sepal length'].hist(bins=8)
```

#### شرح كل سطر:
1. `%matplotlib inline` → أمر خاص بدفاتر Jupyter لعرض الرسوم البيانية مباشرة داخل الدفتر.
2. `data['sepal length'].hist(bins=8)` → تقسيم مدى قيم `sepal length` إلى 8 فترات متساوية العرض (`Equal width`)، وعدّ تكرار القيم ضمن كل فترة.

**المكتبات المطلوبة (Imports):**
> `matplotlib` (تُستدعى ضمنياً عبر دالة `.hist()` في `pandas`)

**الناتج المتوقع:**
> مدرّج تكراري بثمانية أعمدة، يُظهر أن أغلب أزهار العينة لها طول كأس زهرة بين 4.5 و6.7 سم تقريباً (كما هو موضّح في شكل المحاضرة).

---

### 38. المدرجات التكرارية قد تُظهر أكثر من صندوق `Boxplot`

#### النص الأصلي يقول:
> "The two histograms shown in the right may have the same boxplot representation — The same values for: min, Q1, median, Q3, max. But they have rather different data distributions."

#### الشرح المبسّط:
نقطة دقيقة ومهمة جداً: يمكن لمدرَّجين تكراريين مختلفين تماماً في **شكل التوزيع الداخلي** أن ينتجا **نفس ملخص الأرقام الخمسة تماماً** (نفس `min, Q1, median, Q3, max`)، وبالتالي **نفس شكل `Boxplot`** الخارجي! هذا يعني أن `Boxplot` **قد يُخفي تفاصيل** حول الشكل الداخلي للتوزيع (كوجود قمة واحدة أو قمتين `bimodal`) التي يكشفها المدرّج التكراري بوضوح أكبر.

**لماذا هذا مهم؟** لأنه يعلّمنا ألا نعتمد على أداة تصوير واحدة فقط؛ `Boxplot` ممتاز للمقارنات السريعة واكتشاف القيم الشاذة، لكن `Histogram` أفضل لفهم **الشكل الحقيقي** لتوزيع البيانات (تماثل، انحراف، تعدد قمم).

#### الفهم الخاطئ الشائع ❌: إذا تطابق شكل صندوقَي Boxplot، فالتوزيعان متطابقان تماماً.
#### الفهم الصحيح ✅: قد يخفي `Boxplot` اختلافات حقيقية في شكل التوزيع الداخلي؛ يجب دوماً فحص `Histogram` أيضاً للتأكد.

---

## 📌 الأفكار الرئيسية الشاملة للمحاضرة

1. جودة التحليل محكومة بجودة البيانات ("Garbage in, garbage out") — لذا يجب فهم أنواع الصفات وخصائصها أولاً.
2. الصفة تُصنَّف حسب 4 عمليات متاحة عليها: تمايز، ترتيب، فروقات، نِسَب → 4 أنواع: `Nominal`, `Ordinal` (نوعية) و`Interval`, `Ratio` (كمية).
3. `ID_numbers` مثال كلاسيكي: أرقام لكنها اسمية (لا يصح حساب متوسطها).
4. ثلاث خصائص عامة تؤثر في التنقيب: `Dimensionality`, `Resolution`, `Distribution` (بما فيها `Sparsity`).
5. أنواع مجموعات البيانات: `Record Data` (Matrix/Document/Transaction)، `Graph Data`، `Ordered Data` (Sequential/Sequence/Time Series/Spatial).
6. مقاييس النزعة المركزية: `mean` (حساس للقيم الشاذة)، `median` (أكثر مقاومة)، `mode`, `midrange`.
7. مقاييس التشتت: `Range`, `IQR`, `Five-Number Summary`, `Variance`, `Standard Deviation` — وحدود `Q1-1.5×IQR` و`Q3+1.5×IQR` لاكتشاف القيم الشاذة.
8. `Boxplot` و`Histogram` أداتان بصريتان مكمّلتان: الأول ممتاز للمقارنات السريعة والقيم الشاذة، الثاني يكشف الشكل الحقيقي للتوزيع.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `data object` | وحدة بيانات واحدة (صف في الجدول) | عميل، منتج |
| `attribute/feature` | صفة تصف كائن البيانات (عمود في الجدول) | customer_ID, age |
| `Nominal` | قيم رمزية للتمييز فقط (=, ≠) | gender, marital status |
| `Binary` | اسمية بقيمتين فقط | smoker (0/1) |
| `Ordinal` | ترتيب دون معرفة مقدار الفرق | grades {A+, A, A-} |
| `Interval-Scaled` | فروقات ذات معنى، لا صفر حقيقي | temperature (°C) |
| `Ratio-Scaled` | فروقات ونِسَب ذات معنى، صفر حقيقي | weight, age |
| `Dimensionality` | عدد الصفات لكل كائن | صور بآلاف البكسلات = أبعاد عالية |
| `Sparsity` | معظم القيم = صفر | بيانات معاملات كبيرة |
| `IQR` | Q3 - Q1 | مدى النصف الأوسط من البيانات |
| `Boxplot` | تمثيل بصري لملخص الأرقام الخمسة | مقارنة أسعار فروع |

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `pd.read_csv()` | قراءة بيانات من ملف/رابط | أول خطوة عملية |
| `.describe(include='all')` | ملخص إحصائي شامل لكل الصفات | تفريق تلقائي بين كمي/نوعي |
| `.value_counts()` | عدّ تكرار الفئات | للصفات النوعية |
| `.mean()/.std()/.min()/.max()` | إحصاءات فردية | للصفات الكمية فقط |
| `.hist(bins=N)` | رسم مدرّج تكراري | لفحص شكل التوزيع |
| `.boxplot()` | رسم صندوق ولوحة | لفحص التشتت والقيم الشاذة |

### جداول مقارنات سريعة

| المقارنة | الأول | الثاني | الفرق |
| --- | --- | --- | --- |
| نوع الصفة | `Nominal` (تمايز فقط) | `Ordinal` (تمايز + ترتيب) | وجود ترتيب منطقي بين القيم |
| نوع الصفة | `Interval` (لا صفر حقيقي) | `Ratio` (صفر حقيقي) | إمكانية الحديث عن النسب/الأضعاف |
| النزعة المركزية | `Mean` (حساس للشواذ) | `Median` (مقاوم للشواذ) | التأثر بالقيم المتطرفة |
| العرض البياني | `Boxplot` (ملخص 5 أرقام) | `Histogram` (شكل التوزيع الكامل) | قد يتطابق الأول رغم اختلاف الثاني |
| البيانات | `Structured` (جدولية ثابتة) | `Unstructured` (نص/وسائط) | وجود بنية أعمدة ثابتة أم لا |

### قاموس المصطلحات (Glossary)

| الفئة | المصطلحات |
| --- | --- |
| أنواع الصفات | `Nominal`, `Binary` (Symmetric/Asymmetric), `Ordinal`, `Interval-Scaled`, `Ratio-Scaled` |
| خصائص مجموعات البيانات | `Dimensionality`, `Resolution`, `Distribution`, `Skewness`, `Sparsity` |
| أنواع مجموعات البيانات | `Record Data` (Data Matrix, Document Data, Transaction Data), `Graph Data`, `Ordered Data` (Sequential, Sequence, Time Series, Spatial) |
| النزعة المركزية | `Mean`, `Trimmed Mean`, `Median`, `Mode`, `Midrange` |
| التشتت | `Range`, `IQR`, `Five-Number Summary`, `Variance`, `Standard Deviation` |
| العروض البيانية | `Bar Chart`, `Histogram` (Equal width, Equal depth), `Boxplot`, `Whiskers` |
| مستويات التحليل | `Univariate`, `Bivariate`, `Multivariate` |

### أبرز النقاط الذهبية
1. لا يصح تطبيق عمليات حسابية (كالمتوسط) على أي رقم — يجب معرفة نوع الصفة أولاً (Nominal/Ordinal/Interval/Ratio).
2. `ID_numbers` اسمية رغم كونها أرقاماً — لا يصح حساب متوسطها.
3. الصفر الحقيقي هو الفيصل بين `Interval` و`Ratio`.
4. المتوسط حساس جداً للقيم الشاذة، الوسيط أكثر مقاومة لها.
5. `IQR` وحدود `1.5×IQR` هي الطريقة القياسية لاكتشاف القيم الشاذة إحصائياً.
6. `Boxplot` قد يخفي تفاصيل شكل التوزيع الحقيقي التي يكشفها `Histogram`.
7. عمود `count` في `describe()` يكشف وجود بيانات مفقودة إن اختلف بين الأعمدة.

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| حساب متوسط لصفة اسمية (كأرقام الهوية) | الصفات الاسمية تسمح فقط بحساب المنوال، لا المتوسط |
| الخلط بين `Interval` و`Ratio` | الفيصل هو وجود صفر حقيقي (Ratio) أو عدمه (Interval) |
| افتراض أن تطابق شكل Boxplot يعني تطابق التوزيع الكامل | يجب فحص Histogram أيضاً؛ قد تختلف الأشكال الداخلية رغم تطابق الملخص الخماسي |
| الاعتقاد أن القيمة الشاذة دائماً خطأ يُحذف | القيم الشاذة المكتشفة بـ IQR تحتاج فحصاً إضافياً قبل القرار بحذفها |
| الخلط بين `Sparsity` و`Skewness` العام | `Sparsity` حالة خاصة حيث تكون معظم القيم تحديداً = صفر |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: تحديد نوع صفة غير معروفة
> ما هدفها؟ تصنيف أي صفة جديدة إلى أحد الأنواع الأربعة بشكل منهجي.
```algorithm
1 | فحص التمايز | مقارنة القيم | هل يمكن فقط قول "متساوية" أو "مختلفة"؟ إن كانت الإجابة نعم فقط → Nominal
2 | فحص الترتيب | مقارنة القيم بـ <, > | هل يوجد ترتيب منطقي واضح بين القيم؟ إن نعم أضف → Ordinal
3 | فحص الفروقات | طرح قيمتين | هل الفرق بين قيمتين له معنى ثابت؟ إن نعم أضف → Interval
4 | فحص وجود صفر حقيقي | تحقق من معنى القيمة صفر | هل "صفر" يعني غياباً تاماً للكمية؟ إن نعم فالصفة → Ratio
```
#### نقاط التنفيذ:
- التوقف عند أول خطوة "لا" يحدد النوع النهائي للصفة.
- كل نوع لاحق يملك كل خصائص الأنواع السابقة بالإضافة لخاصية جديدة.

#### ⚙️ الخطوات / الخوارزمية: حساب ملخص الأرقام الخمسة واكتشاف القيم الشاذة
> ما هدفها؟ تلخيص توزيع صفة رقمية واكتشاف القيم المشتبه بشذوذها.
```algorithm
1 | ترتيب القيم تصاعدياً | فرز البيانات | تحضير البيانات لحساب الربيعيات
2 | حساب Q1, Median, Q3 | تقسيم البيانات لأرباع | تحديد الربيعيات الثلاثة
3 | حساب IQR | Q3 - Q1 | تحديد مدى النصف الأوسط من البيانات
4 | حساب حدود الشذوذ | Q1-1.5×IQR و Q3+1.5×IQR | تحديد نطاق القيم الطبيعية
5 | تحديد القيم الشاذة | مقارنة كل قيمة بالحدود | أي قيمة خارج الحدود تُعتبر مشتبهاً بها
```
#### نقاط التنفيذ:
- يُستخدم هذا الملخص مباشرة لرسم `Boxplot`.
- القيم الشاذة المكتشفة تحتاج مراجعة سياقية قبل حذفها فعلياً من البيانات.

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| فحص نوع العمود | `is_numeric_dtype(data[col])` | قبل تطبيق عمليات إحصائية كمية |
| ملخص شامل | `data.describe(include='all')` | نظرة أولى سريعة على كل الصفات |
| تكرار الفئات | `data['col'].value_counts()` | فحص توزيع صفة نوعية واكتشاف الانحراف |
| رسم توزيع | `data['col'].hist(bins=N)` | فحص شكل التوزيع لصفة رقمية |
| رسم مقارنة تشتت | `data.boxplot()` | فحص التشتت والقيم الشاذة لعدة أعمدة معاً |

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| صفة أرقامها معرّفات فقط (IDs) | معاملتها كصفة Nominal، لا حساب متوسط لها | الأرقام هنا رموز وليست كميات |
| اختلاف قيمة `count` بين الأعمدة في describe() | التحقق من وجود قيم مفقودة | count يعكس القيم غير المفقودة فقط |
| قيمة تتجاوز Q3+1.5×IQR | تصنيفها كمشتبه بها كقيمة شاذة، ثم فحصها سياقياً | القاعدة إحصائية عامة، لا تعني خطأً بالضرورة |
| توزيع صفة فئة به 95%/5% | الانتباه لصعوبة Classification المحتملة بسبب الانحراف | قد يحتاج توازناً (balancing) في مرحلة لاحقة |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 25% | سيناريو كود/حساب 30% | تطبيق 30% | تتبع حسابات 15%.

### السؤال 1 (medium)
ما العملية الوحيدة المسموحة رياضياً على الصفة الاسمية (`Nominal`)؟
أ) الجمع والطرح
ب) التمايز فقط (= و≠)
ج) الضرب والقسمة
د) كل العمليات الأربع
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: الصفات الاسمية تسمح فقط بعملية التمايز (equal/different)، ويمكن حساب المنوال فقط كمقياس نزعة مركزية. باقي الخيارات تفترض عمليات غير متاحة على هذا النوع.

---

### السؤال 2 (hard)
لماذا لا يصح حساب متوسط أرقام الهوية الجامعية (`student_ID`) رغم كونها أعداداً صحيحة؟
أ) لأن الأرقام كبيرة جداً حسابياً
ب) لأن رقم الهوية صفة اسمية تُستخدم للتمييز فقط وليست كمية حقيقية قابلة للجمع
ج) لأن الحاسوب لا يستطيع جمع أعداد كبيرة
د) لأنها دائماً أعداد سالبة
**الإجابة الصحيحة: ب**
**التعليل:** النص يوضح أن "average is reasonable for student_age, but not for student_ID" لأن رقم الهوية مجرد رمز تمييزي (Nominal) رغم تمثيله بأرقام.

---

### السؤال 3 (medium)
أي مما يلي يُعتبر الفيصل الرئيسي بين الصفة الفاصلية (`Interval`) والصفة النسبية (`Ratio`)؟
أ) عدد القيم الممكنة
ب) وجود صفر حقيقي (`true zero-point`) يسمح بالحديث عن النسب
ج) كون القيم موجبة أو سالبة
د) طول اسم الصفة
**الإجابة الصحيحة: ب**
**التعليل:** النص: للـ Interval "No true zero-point, therefore we cannot speak of the values in terms of ratios"، بينما Ratio "has an inherent zero-point... we can speak of a value as being a multiple (or ratio) of another value".

---

### السؤال 4 (medium)
درجة الحرارة بالكلفن (`Kelvin`) تُصنَّف كصفة:
أ) Nominal
ب) Ordinal
ج) Interval-Scaled
د) Ratio-Scaled
**الإجابة الصحيحة: د**
**التعليل:** النص يذكر "temperature in Kelvin" كمثال مباشر على Ratio-Scaled، لأن الصفر المطلق (Kelvin) هو صفر حقيقي فعلاً بعكس درجة الحرارة بالمئوية أو الفهرنهايت (Interval-Scaled).

---

### السؤال 5 (hard)
سيناريو: لديك بيانات راتب مرتّبة تصاعدياً: 30, 36, 47, 50, 52, 52, 56, 60, 63, 70, 70, 110 (بالآلاف). ما قيمة الوسيط؟
أ) $47,000
ب) $52,000
ج) $54,000
د) $63,000
**الإجابة الصحيحة: ج**
**التعليل:** عدد القيم N=12 (زوجي)، فالوسيط = متوسط القيمتين السادسة والسابعة = (52+56)/2 = $54,000، وهذا مطابق تماماً لحساب المحاضرة.

---

### السؤال 6 (hard)
لنفس بيانات الراتب في السؤال السابق، ما قيمة `IQR`؟
أ) $10,000
ب) $16,000
ج) $20,000
د) $23,000
**الإجابة الصحيحة: ب**
**التعليل:** Q1 = $47,000 (القيمة الثالثة)، Q3 = $63,000 (القيمة التاسعة)، إذن IQR = 63,000 - 47,000 = $16,000.

---

### السؤال 7 (hard)
باستخدام نفس البيانات (IQR=$16,000، Q3=$63,000)، هل القيمة $110,000 تُعتبر قيمة شاذة مشتبهاً بها حسب قاعدة 1.5×IQR؟
أ) لا، لأنها أقل من الحد الأعلى
ب) نعم، لأن الحد الأعلى = Q3+1.5×IQR = $87,000 وهي أكبر منه
ج) لا يمكن تحديد ذلك بدون معرفة التباين
د) نعم، لكن فقط لأنها أكبر رقم في القائمة
**الإجابة الصحيحة: ب**
**التعليل:** الحد الأعلى = 63,000 + 1.5×16,000 = 63,000 + 24,000 = $87,000. بما أن 110,000 > 87,000، فهي تتجاوز الحد وتُعتبر قيمة شاذة مشتبهاً بها حسب هذه القاعدة الإحصائية.

---

### السؤال 8 (medium)
أي مقاييس النزعة المركزية **الأكثر حساسية** للقيم الشاذة (Outliers)؟
أ) المنوال (Mode)
ب) الوسيط (Median)
ج) المتوسط الحسابي (Mean)
د) المدى الربيعي (IQR)
**الإجابة الصحيحة: ج**
**التعليل:** النص: "A major problem with the mean is its sensitivity to extreme values (outlier)"، بينما الوسيط أكثر مقاومة، والمنوال وIQR ليسا مقاييس نزعة مركزية بنفس هذه الحساسية.

---

### السؤال 9 (medium)
صفة "الدخل" (`income`) غالباً ما توصف بأنها منحرفة إيجابياً (`positively skewed`). ماذا يعني هذا؟
أ) المنوال يقع عند قيمة أكبر من الوسيط
ب) المنوال يقع عند قيمة أصغر من الوسيط، مع ذيل طويل نحو القيم المرتفعة
ج) المتوسط والوسيط والمنوال متساوون تماماً
د) لا يوجد أي قيم شاذة في بيانات الدخل
**الإجابة الصحيحة: ب**
**التعليل:** النص: "positively skewed, where the mode occurs at a value that is smaller than the median... income is a good example... a few people with extremely high incomes, but most people will have incomes bunched together below the mean."

---

### السؤال 10 (hard)
سيناريو: مدرَّجان تكراريان (Histograms) مختلفان تماماً في شكل التوزيع الداخلي (أحدهما أحادي القمة والآخر ثنائي القمة)، لكن كليهما يملكان نفس قيم (min, Q1, median, Q3, max). ماذا يترتب على ذلك بخصوص شكل الـ Boxplot؟
أ) سيكون شكل Boxplot مختلفاً تماماً لكل منهما
ب) سيكون شكل Boxplot متطابقاً تماماً رغم اختلاف التوزيع الداخلي الحقيقي
ج) لا يمكن رسم Boxplot لهذه الحالة
د) Boxplot سيُظهر تلقائياً عدد القمم في التوزيع
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "The two histograms shown... may have the same boxplot representation. The same values for: min, Q1, median, Q3, max. But they have rather different data distributions" — هذا يوضح قصوراً معروفاً في Boxplot يعالجه Histogram.

---

### السؤال 11 (medium)
بيانات "تسلسل المشتريات لعميل معيّن عبر الزمن (t1, t2, t3...)" تُصنَّف ضمن أي نوع من `Ordered Data`؟
أ) Sequence Data
ب) Sequential Data
ج) Spatial Data
د) Graph Data
**الإجابة الصحيحة: ب**
**التعليل:** النص: "Sequential Data: an extension of transaction data, where each transaction has a time associated with it. Each record could be the purchase history of a customer" — هذا يطابق تماماً السيناريو الموصوف (طابع زمني حقيقي لكل معاملة).

---

### السؤال 12 (medium)
البيانات الجينية (Genomic sequence data, مثل GGTTCCGCC...) تُصنَّف ضمن:
أ) Sequential Data (لأن لها طوابع زمنية)
ب) Sequence Data (مواقع ضمن تسلسل مرتّب، بلا طوابع زمنية)
ج) Time Series Data
د) Spatial Data
**الإجابة الصحيحة: ب**
**التعليل:** النص: "Sequence Data: a sequence of individual entities (such as words or letters). no time stamps; instead, positions in an ordered sequence. Example, Genomic sequence data."

---

### السؤال 13 (hard)
سيناريو: صفة فئوية (class) في مجموعة بيانات، حيث فئة واحدة تمثّل 95% من العينات والفئات الأخرى مجتمعة 5% فقط. ما التأثير المذكور في المحاضرة لهذه الحالة؟
أ) لا يوجد أي تأثير يُذكر
ب) هذا الانحراف (Skewness) الشديد في التوزيع قد يجعل مهمة Classification صعبة
ج) يصبح حساب المتوسط الحسابي مستحيلاً
د) يتحول تلقائياً نوع الصفة من نوعية إلى كمية
**الإجابة الصحيحة: ب**
**التعليل:** النص: "suppose a class attribute, where one of the classes occurs 95%... This skewness in the distribution can make classification difficult."

---

### السؤال 14 (medium)
ما الفرق الجوهري بين `Time Series Data` و`Spatial Data` وفق المحاضرة؟
أ) لا يوجد فرق، هما نفس الشيء
ب) Time Series تركّز على قياسات رقمية عبر فترات زمنية متساوية، بينما Spatial تركّز على صفات جغرافية لمواقع متعددة
ج) Spatial بيانات نصية فقط
د) Time Series لا يمكن تمثيلها بيانياً
**الإجابة الصحيحة: ب**
**التعليل:** النص يميّز بوضوح: Time Series = "ordered set of numeric measurements recorded at equal time intervals" (مثال: حرارة مدينة عبر سنوات)، بينما Spatial = "Data objects have spatial attributes... collected for a variety of geographical locations".

---

### السؤال 15 (medium)
عند استخدام `data.describe(include='all')` في `pandas`، ماذا يمثّل الصف المسمّى `count` تحديداً؟
أ) عدد كل صفوف الجدول بغض النظر عن أي شيء
ب) عدد القيم غير المفقودة (non-missing) لكل صفة
ج) عدد القيم الفريدة فقط
د) عدد الأعمدة الرقمية في الجدول
**الإجابة الصحيحة: ب**
**التعليل:** النص صريح: "Note that count refers to the number of non-missing values for each attribute" — وهذا مؤشر عملي لاكتشاف البيانات المفقودة.

---

### السؤال 16 (hard)
أي مقاييس التالية **لا يصح** استخدامها إحصائياً مع صفة ترتيبية (`Ordinal`) وفق جدول ملخّص أنواع الصفات؟
أ) Median
ب) Mode
ج) Mean (المتوسط الحسابي)
د) Rank correlation
**الإجابة الصحيحة: ج**
**التعليل:** النص صريح في قسم Ordinal Attributes: "the mean cannot be defined" للصفات الترتيبية، بينما Median وMode وRank correlation جميعها مذكورة كعمليات صحيحة معها في جدول الملخّص.

---

## الجزء الرابع: أسئلة تصحيح الكود

> غطِّ أنواع الأخطاء: منطقية، سوء فهم، فحص إرجاع، dead code.

### سؤال تصحيح 1 (misconception)
**الكود التالي يحتوي خطأ:**
```python
import pandas as pd

data = pd.read_csv("students.csv")

# Trying to find the "average" student ID, assuming it's meaningful
average_id = data['student_ID'].mean()
print(f"Average student ID: {average_id}")
```
**اكتشف الخطأ:** `student_ID` صفة اسمية (`Nominal`) رغم كونها أرقاماً؛ حساب متوسطها عملية بلا معنى إحصائي إطلاقاً (تماماً كمثال المحاضرة).

**التصحيح:**
```python
import pandas as pd

data = pd.read_csv("students.csv")

# For a nominal attribute, the meaningful statistic is the mode, not the mean
most_common_id_pattern = data['student_ID'].mode()
print(f"Most frequent value pattern: {most_common_id_pattern}")
```
**شرح الحل:**
1. `student_ID` صفة اسمية؛ العملية المسموحة الوحيدة عليها هي التمايز (=, ≠) وبالتالي المنوال فقط.
2. حساب المتوسط الحسابي لأرقام الهوية غير منطقي تماماً كمثال `student_ID` مقابل `student_age` في المحاضرة.
3. القاعدة العامة: تحقق دوماً من **نوع الصفة الحقيقي** قبل تطبيق أي دالة إحصائية عليها، بغض النظر عن كونها مخزَّنة كأرقام أم لا.

---

### سؤال تصحيح 2 (wrong_formula)
**الكود التالي يحتوي خطأ:**
```python
import numpy as np

salaries = [30, 36, 47, 50, 52, 52, 56, 60, 63, 70, 70, 110]

Q1 = 47
Q3 = 63

# Wrong formula: subtracting instead of using the correct outlier bound formula
lower_bound = Q1 - IQR  # IQR not even multiplied by 1.5
upper_bound = Q3 + IQR
```
**اكتشف الخطأ:** الصيغة الصحيحة لحدود القيم الشاذة يجب أن تضرب `IQR` بـ 1.5 (`1.5 × IQR`)، وليس طرح/جمع `IQR` مباشرة بدون هذا المعامل.

**التصحيح:**
```python
salaries = [30, 36, 47, 50, 52, 52, 56, 60, 63, 70, 70, 110]

Q1 = 47
Q3 = 63
IQR = Q3 - Q1  # IQR = 16

# Correct formula: multiply IQR by 1.5 before adding/subtracting
lower_bound = Q1 - 1.5 * IQR  # 47 - 24 = 23
upper_bound = Q3 + 1.5 * IQR  # 63 + 24 = 87

print(f"Lower bound: {lower_bound}, Upper bound: {upper_bound}")
```
**شرح الحل:**
1. القاعدة المذكورة في المحاضرة صريحة: `min = Q1 - 1.5 × IQR` و`max = Q3 + 1.5 × IQR`.
2. حذف المعامل `1.5` يجعل نطاق اكتشاف القيم الشاذة أضيق بكثير مما يجب، فيصنّف قيماً طبيعية تماماً كقيم شاذة خطأً.
3. بالحساب الصحيح: Lower=23 (لكن أصغر قيمة فعلية 30، فلا قيم شاذة من الأسفل)، Upper=87 (والقيمة 110 تتجاوزه فعلاً وتُعتبر شاذة).

---

### سؤال تصحيح 3 (logic)
**الكود التالي يحتوي خطأ:**
```python
from pandas.api.types import is_numeric_dtype
import pandas as pd

data = pd.read_csv("iris.csv")

for col in data.columns:
    # Bug: printing statistics for ALL columns, including non-numeric ones
    print('%s:' % (col))
    print('\t Mean = %.2f' % data[col].mean())
```
**اكتشف الخطأ:** الكود يحاول حساب `mean()` لكل الأعمدة **بدون** التحقق أولاً إن كانت رقمية، مما سيسبب خطأً أو نتيجة بلا معنى عند الوصول لعمود `class` النوعي.

**التصحيح:**
```python
from pandas.api.types import is_numeric_dtype
import pandas as pd

data = pd.read_csv("iris.csv")

for col in data.columns:
    if is_numeric_dtype(data[col]):  # only process numeric columns
        print('%s:' % (col))
        print('\t Mean = %.2f' % data[col].mean())
```
**شرح الحل:**
1. يجب التحقق من نوع العمود عبر `is_numeric_dtype()` قبل استدعاء دوال إحصائية كمية مثل `.mean()`.
2. تطبيق `.mean()` على عمود نصي/فئوي (كـ `class`) إما يسبب خطأً أو نتيجة غير منطقية.
3. هذا النمط (`if is_numeric_dtype(...)`) هو بالضبط النمط الوارد في كود المحاضرة الأصلي.

---

### سؤال تصحيح 4 (return_check)
**الكود التالي يحتوي خطأ:**
```python
def compute_iqr(q1, q3):
    iqr = q3 - q1
    # forgot to return iqr

result = compute_iqr(47, 63)
lower_bound = 47 - 1.5 * result  # result is None here, this will fail
```
**اكتشف الخطأ:** الدالة `compute_iqr` لا تُرجع (`return`) قيمة `iqr`، لذا `result` ستكون `None` ويفشل السطر الذي يستخدمها.

**التصحيح:**
```python
def compute_iqr(q1, q3):
    iqr = q3 - q1
    return iqr  # explicitly return the computed value

result = compute_iqr(47, 63)
lower_bound = 47 - 1.5 * result  # now result = 16, this works correctly
```
**شرح الحل:**
1. أي قيمة نحتاجها خارج الدالة يجب إرجاعها صراحة عبر `return`.
2. غياب `return` يجعل الدالة تُرجع `None` تلقائياً، مما يسبب خطأً حسابياً لاحقاً (`TypeError`).
3. هذا خطأ شائع جداً عند تحويل خطوات حسابية من دفتر Jupyter تفاعلي إلى دوال منظّمة قابلة لإعادة الاستخدام.

---

### سؤال تصحيح 5 (dead_code)
**الكود التالي يحتوي خطأ:**
```python
def classify_attribute_type(has_true_zero, has_meaningful_diff):
    if has_true_zero and has_meaningful_diff:
        return "Ratio-Scaled"
    return "Interval-Scaled"
    print("Classification done!")  # unreachable line after return
```
**اكتشف الخطأ:** سطر `print("Classification done!")` يقع بعد `return`، فهو `dead code` لن يُنفَّذ أبداً بغض النظر عن المسار المُتّبَع.

**التصحيح:**
```python
def classify_attribute_type(has_true_zero, has_meaningful_diff):
    print("Classification done!")  # moved before the return statements
    if has_true_zero and has_meaningful_diff:
        return "Ratio-Scaled"
    return "Interval-Scaled"
```
**شرح الحل:**
1. أي سطر بعد `return` ضمن نفس المسار التنفيذي لن يُنفَّذ أبداً — يجب نقله قبل الجملة الشرطية أو قبل أول `return`.
2. هذا النمط يوضّح فكرة تصنيف الصفات (Interval مقابل Ratio) حسب وجود صفر حقيقي وفروقات ذات معنى، تماماً كما وردت في المحاضرة.
3. اكتشاف `dead code` يمنع أوهام ظهور رسائل تأكيد لا تظهر فعلياً عند التنفيذ.

---

## الجزء الرابع: تمارين تطبيقية (من إعداد الدليل للتدريب)

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

### تمرين 1: تصنيف أنواع صفات (fill_gaps)

**السيناريو / المطلوب:**
صنّف كل صفة تالية إلى (Nominal / Binary / Ordinal / Interval / Ratio): `blood_type` (A, B, AB, O)، `exam_result` (pass/fail)، `customer_satisfaction` (very unsatisfied...very satisfied)، `birth_year`، `number_of_children`.

**المطلوب:**
1. صنّف كل صفة.
2. برّر تصنيف صفتين منها.

**نموذج الحل:**
| الصفة | التصنيف | التبرير |
| --- | --- | --- |
| blood_type | Nominal | فئات بلا ترتيب منطقي |
| exam_result | Binary | قيمتان فقط (pass/fail)، وغالباً غير متماثلة القيمة |
| customer_satisfaction | Ordinal | ترتيب واضح، لكن الفرق بين الدرجات غير معروف رقمياً |
| birth_year | Interval | فروقات ذات معنى (سنوات)، لكن سنة "صفر" ليست بداية الزمن الحقيقية |
| number_of_children | Ratio | صفر حقيقي (لا أطفال إطلاقاً)، والنسب منطقية (طفلان = ضعف طفل واحد) |

---

### تمرين 2: تصحيح مفهوم خاطئ (code_fix)

**السيناريو / المطلوب:**
طالب كتب: "درجة الحرارة بالمئوية صفة نسبية (Ratio) لأنها رقمية ولها فروقات ذات معنى."

**المطلوب:**
1. حدّد الخطأ المفاهيمي.
2. صحّحه بالاستناد لتعريف المحاضرة.

**نموذج الحل:**
الخطأ: وجود "فروقات ذات معنى" فقط يجعلها **Interval-Scaled** وليس بالضرورة Ratio-Scaled. التصحيح: درجة الحرارة بالمئوية (أو الفهرنهايت) هي **Interval-Scaled** تحديداً لأنه **لا يوجد صفر حقيقي**: صفر مئوية لا يعني "غياب الحرارة" فيزيائياً. لتكون Ratio-Scaled، يجب أن يكون هناك صفر حقيقي فعلي، كما في حالة درجة الحرارة بالكلفن (الصفر المطلق).

---

### تمرين 3: سيناريو تطبيقي (scenario)

**السيناريو / المطلوب:**
مستشفى يجمع بيانات مرضى تشمل: تاريخ الزيارة، ضغط الدم (رقمي مستمر)، فصيلة الدم (فئوية)، مستوى الألم (خفيف/متوسط/شديد)، ونتيجة اختبار كوفيد (إيجابي/سلبي، حيث الإيجابي نادر جداً وأكثر أهمية سريرياً).

**المطلوب:**
1. صنّف كل صفة حسب نوعها.
2. حدّد أي صفة ثنائية منها متماثلة (`symmetric`) وأيها غير متماثلة (`asymmetric`).

**نموذج الحل:**
- تاريخ الزيارة: Interval-Scaled (calendar date).
- ضغط الدم: Ratio-Scaled (رقمي مستمر بصفر حقيقي).
- فصيلة الدم: Nominal.
- مستوى الألم: Ordinal (خفيف < متوسط < شديد، بدون معرفة مقدار الفرق).
- نتيجة كوفيد: Binary **Asymmetric** — لأن الحالة الإيجابية أندر وأهم سريرياً، فتُرمَّز بـ 1 حسب الاصطلاح المذكور في المحاضرة.

---

### تمرين 4: حساب مفاهيمي (metric_calculation)

**السيناريو / المطلوب:**
لديك قيم أعمار: `22, 25, 25, 28, 30, 32, 35, 40, 45, 90` (N=10).

**المطلوب:**
1. احسب المتوسط الحسابي والوسيط.
2. أيهما أكثر تمثيلاً "للحالة النموذجية" هنا؟ ولماذا؟

**نموذج الحل:**
1. المتوسط = (22+25+25+28+30+32+35+40+45+90)/10 = 372/10 = **37.2**.
   الوسيط (N=10 زوجي) = متوسط القيمتين الخامسة والسادسة = (30+32)/2 = **31**.
2. الوسيط (31) أكثر تمثيلاً للحالة النموذجية، لأن القيمة 90 (متطرفة جداً) "سحبت" المتوسط الحسابي للأعلى بشكل غير عادل، تماماً كما وضّحت المحاضرة بخصوص حساسية المتوسط للقيم الشاذة.

---

### تمرين 5: تطبيق نموذج (model_apply)

**السيناريو / المطلوب:**
لديك DataFrame بأسماء `df` يحتوي أعمدة: `age` (رقمي)، `income` (رقمي)، `city` (نصي فئوي).

**المطلوب:**
1. اكتب كود بايثون لعرض ملخص إحصائي كامل لكل الأعمدة.
2. اكتب كوداً لرسم مدرّج تكراري لعمود `income` مقسَّم إلى 10 فئات.

**نموذج الحل:**
```python
# 1. Full statistical summary for all columns (numeric + categorical)
df.describe(include='all')

# 2. Histogram of 'income' divided into 10 equal-width bins
df['income'].hist(bins=10)
```

---

### تمرين 6: مقارنة تطبيقية (scenario)

**السيناريو / المطلوب:**
شركة توزيع لديها بيانات عن أسعار وحدات مبيعة في فرعين: الفرع A (كل الأسعار بين 45-55$)، والفرع B (أسعار تتراوح بين 10$ و200$ بشكل متفاوت جداً).

**المطلوب:**
1. صف الشكل المتوقع لصندوق `Boxplot` لكل فرع.
2. أيهما لديه انحراف معياري أعلى؟

**نموذج الحل:**
1. الفرع A: صندوق `Boxplot` **قصير جداً** (تشتت منخفض، قيم متقاربة). الفرع B: صندوق **طويل جداً** مع احتمال شعيرات ممتدة وربما قيم شاذة (تشتت مرتفع جداً).
2. الفرع B لديه انحراف معياري أعلى بكثير، لأن قيمه أكثر تباعداً عن متوسطها مقارنة بالفرع A كما وضّح مثال Company A/B في المحاضرة (نفس المتوسط، انتشار مختلف).

---

## الجزء الرابع: تمارين تحليل وتطبيق (إضافية — من إعداد الدليل)

> تمارين تحليلية إضافية — سيناريوهات مؤسسية، إكمال مخططات، جداول قرار.

### تمرين 1: دراسة حالة (case_study)

**السيناريو:**
شركة تأمين تجمع بيانات مطالبات تأمينية تشمل: نوع التأمين (سيارات/صحي/عقاري)، مبلغ المطالبة، تاريخ المطالبة، وتصنيف المطالبة (عادية/مشتبه بها كاحتيال — حيث حالات الاحتيال نادرة جداً <2%).

**المطلوب:**
1. صنّف نوع كل صفة.
2. حدّد أي خاصية عامة من خصائص مجموعات البيانات (Dimensionality/Resolution/Distribution) تنطبق بوضوح هنا ولماذا.

**نموذج الحل:**
1. نوع التأمين: Nominal. مبلغ المطالبة: Ratio-Scaled. تاريخ المطالبة: Interval-Scaled. تصنيف المطالبة: Binary Asymmetric (الاحتيال نادر ومهم، يُرمَّز 1).
2. تنطبق خاصية **Distribution** بوضوح: توزيع صفة "تصنيف المطالبة" شديد الانحراف (Skewed) — أقل من 2% احتيال مقابل أكثر من 98% عادية — وهذا يماثل مثال "95%/5%" في المحاضرة الذي يجعل مهمة Classification لاحقاً أكثر صعوبة.

---

### تمرين 2: إكمال جدول مقارنة (table_fill)

**السيناريو:**
أكمل الجدول التالي بربط كل مقياس إحصائي بنوع الصفة الذي يصح استخدامه معه.

**المطلوب:**
| المقياس | Nominal | Ordinal | Interval | Ratio |
| --- | --- | --- | --- | --- |
| Mode | ؟ | ؟ | ؟ | ؟ |
| Median | ؟ | ؟ | ؟ | ؟ |
| Mean | ؟ | ؟ | ؟ | ؟ |
| Geometric Mean | ؟ | ؟ | ؟ | ؟ |

**نموذج الحل:**
| المقياس | Nominal | Ordinal | Interval | Ratio |
| --- | --- | --- | --- | --- |
| Mode | ✅ | ✅ | ✅ | ✅ |
| Median | ❌ | ✅ | ✅ | ✅ |
| Mean | ❌ | ❌ | ✅ | ✅ |
| Geometric Mean | ❌ | ❌ | ❌ | ✅ |

---

### تمرين 3: تحليل مكتوب (written_analysis)

**السيناريو:**
اشرح بأسلوبك الخاص لماذا يُعتبر `Boxplot` و`Histogram` أداتين "مكمّلتين" وليستا بديلتين عن بعضهما.

**المطلوب:**
1. اكتب فقرة تحليلية (3-5 أسطر).

**نموذج الحل:**
`Boxplot` ممتاز لعرض ملخص موجز جداً (5 أرقام) ومقارنة عدة مجموعات بيانات بسرعة، ولاكتشاف القيم الشاذة بوضوح بصري مباشر عبر الشعيرات والنقاط المنفردة. لكنه، كما أظهرت المحاضرة، قد **يُخفي** شكل التوزيع الداخلي الحقيقي (أحادي القمة أم متعدد القمم، متماثل أم منحرف بدقة) لأن توزيعين مختلفين تماماً قد ينتجان نفس ملخص الأرقام الخمسة. `Histogram` من جهته يكشف الشكل الكامل للتوزيع بدقة أكبر لكنه أقل عملية عند مقارنة عدة مجموعات بيانات دفعة واحدة. لذا يُنصَح باستخدامهما **معاً** لفهم شامل.

---

### تمرين 4: إكمال مخطط (diagram_completion)

**السيناريو:**
أعد بناء شجرة قرار نصية لتصنيف نوع الصفة بالاعتماد على العمليات الأربع (تمايز، ترتيب، فروقات، نسب).

**المطلوب:**
1. أكمل الجدول بالترتيب المنطقي الصحيح للأسئلة.

| الخطوة | السؤال | إذا "لا" | إذا "نعم" |
| --- | --- | --- | --- |
| 1 | هل يوجد تمايز فقط بين القيم؟ | ؟ | ؟ |
| 2 | هل يوجد ترتيب منطقي؟ | ؟ | ؟ |
| 3 | هل الفروقات ذات معنى؟ | ؟ | ؟ |
| 4 | هل يوجد صفر حقيقي (نِسَب ذات معنى)؟ | ؟ | ؟ |

**نموذج الحل:**
| الخطوة | السؤال | إذا "لا" | إذا "نعم" |
| --- | --- | --- | --- |
| 1 | هل يوجد تمايز فقط بين القيم؟ | غير منطقي (كل صفة بها تمايز على الأقل) | انتقل للسؤال 2 |
| 2 | هل يوجد ترتيب منطقي بين القيم؟ | الصفة = `Nominal` (توقف هنا) | انتقل للسؤال 3 |
| 3 | هل الفروقات بين القيم ذات معنى ثابت؟ | الصفة = `Ordinal` (توقف هنا) | انتقل للسؤال 4 |
| 4 | هل يوجد صفر حقيقي (نِسَب ذات معنى)؟ | الصفة = `Interval-Scaled` (توقف هنا) | الصفة = `Ratio-Scaled` (توقف هنا) |

---

## الجزء الرابع: تمارين تتبع التنفيذ

> ≥5 تمارين تتبع، مبنية على أمثلة وصيغ فعلية من هذه المحاضرة (Mean, Median, IQR, Variance).

### تمرين تتبع 1: حساب المتوسط والانحراف المعياري خطوة بخطوة

**المدخل:**
```python
# Small dataset: exam scores
scores = [60, 70, 70, 80, 90]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب المجموع | ؟ |
| 2 | حساب المتوسط (N=5) | ؟ |
| 3 | حساب (xi - x̄)² لكل قيمة | ؟ |
| 4 | حساب التباين σ² | ؟ |
| 5 | حساب الانحراف المعياري σ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | حساب المجموع | 60+70+70+80+90 = 370 |
| 2 | حساب المتوسط | 370/5 = 74 |
| 3 | حساب (xi-74)² | (-14)²=196, (-4)²=16, (-4)²=16, 6²=36, 16²=256 |
| 4 | حساب التباين | (196+16+16+36+256)/5 = 520/5 = 104 |
| 5 | حساب الانحراف المعياري | √104 ≈ 10.2 |

**النتيجة:** المتوسط = 74، التباين = 104، الانحراف المعياري ≈ 10.2 — قيمة σ متوسطة تدل على تشتت معتدل حول المتوسط.

---

### تمرين تتبع 2: تصنيف نوع الصفة عبر أمثلة متتالية

**المدخل:**
```python
attributes = ["zip_code", "movie_rating_stars", "temperature_celsius", "weight_kg"]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | الصفة | فحص العمليات | النوع النهائي |
| --- | --- | --- | --- |
| 1 | zip_code | ؟ | ؟ |
| 2 | movie_rating_stars | ؟ | ؟ |
| 3 | temperature_celsius | ؟ | ؟ |
| 4 | weight_kg | ؟ | ؟ |

**نموذج الحل:**
| التكرار | الصفة | فحص العمليات | النوع النهائي |
| --- | --- | --- | --- |
| 1 | zip_code | تمايز فقط، لا ترتيب منطقي فعلي | Nominal |
| 2 | movie_rating_stars | تمايز + ترتيب، بدون معرفة مقدار الفرق | Ordinal |
| 3 | temperature_celsius | تمايز + ترتيب + فروقات، بدون صفر حقيقي | Interval-Scaled |
| 4 | weight_kg | كل العمليات الأربع، يوجد صفر حقيقي (0 كغ = لا وزن) | Ratio-Scaled |

**النتيجة:** تصنيف صحيح لأربع صفات مختلفة يوضّح التسلسل المنطقي بين الأنواع الأربعة.

---

### تمرين تتبع 3: حساب ملخص الأرقام الخمسة لمجموعة بيانات جديدة

**المدخل:**
```python
# Ages sorted ascending, N=8
ages = [18, 20, 22, 25, 28, 30, 35, 60]
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تحديد Min وMax | ؟ |
| 2 | تحديد الوسيط (N=8، زوجي) | ؟ |
| 3 | تحديد Q1 (وسيط النصف الأول: 18,20,22,25) | ؟ |
| 4 | تحديد Q3 (وسيط النصف الثاني: 28,30,35,60) | ؟ |
| 5 | حساب IQR وحدود الشذوذ | ؟ |

**نموذج الحل:**
| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | تحديد Min وMax | Min=18, Max=60 |
| 2 | تحديد الوسيط | (25+28)/2 = 26.5 |
| 3 | تحديد Q1 | (20+22)/2 = 21 |
| 4 | تحديد Q3 | (30+35)/2 = 32.5 |
| 5 | حساب IQR وحدود الشذوذ | IQR=32.5-21=11.5؛ Lower=21-17.25=3.75؛ Upper=32.5+17.25=49.75 |

**النتيجة:** ملخص الأرقام الخمسة = (18, 21, 26.5, 32.5, 60). القيمة 60 تتجاوز الحد الأعلى (49.75) وبالتالي **تُعتبر قيمة شاذة مشتبهاً بها**.

---

### تمرين تتبع 4: تتبّع تصنيف انحراف التوزيع (Skewness)

**المدخل:**
```python
# Three different attribute distributions to classify
distributions = {
    "A": {"mean": 50, "median": 50, "mode": 50},
    "B": {"mean": 70, "median": 55, "mode": 45},
    "C": {"mean": 30, "median": 45, "mode": 55},
}
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | التوزيع | العلاقة بين mean/median/mode | نوع الانحراف |
| --- | --- | --- | --- |
| 1 | A | ؟ | ؟ |
| 2 | B | ؟ | ؟ |
| 3 | C | ؟ | ؟ |

**نموذج الحل:**
| التكرار | التوزيع | العلاقة | نوع الانحراف |
| --- | --- | --- | --- |
| 1 | A | mean = median = mode (50) | متماثل (Symmetric) |
| 2 | B | mode(45) < median(55) < mean(70) | منحرف إيجابياً (Positively Skewed) |
| 3 | C | mode(55) > median(45) > mean(30) | منحرف سلبياً (Negatively Skewed) |

**النتيجة:** التوزيع B يشبه حالة الدخل (income) الموصوفة في المحاضرة (منحرف إيجابياً)، بينما C هو الحالة المعاكسة تماماً.

---

### تمرين تتبع 5: تتبّع فحص القيم غير المفقودة عبر `count`

**المدخل:**
```python
# describe() output summary (simplified)
describe_output = {
    "age":    {"count": 100},
    "income": {"count": 92},
    "city":   {"count": 100},
}
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| التكرار | الصفة | القيمة count | الاستنتاج |
| --- | --- | --- | --- |
| 1 | age | ؟ | ؟ |
| 2 | income | ؟ | ؟ |
| 3 | city | ؟ | ؟ |

**نموذج الحل:**
| التكرار | الصفة | القيمة count | الاستنتاج |
| --- | --- | --- | --- |
| 1 | age | 100 | لا قيم مفقودة (بافتراض أن العدد الكلي للصفوف = 100) |
| 2 | income | 92 | يوجد 8 قيم مفقودة (100 - 92 = 8) تحتاج معالجة لاحقة |
| 3 | city | 100 | لا قيم مفقودة |

**النتيجة:** صفة `income` وحدها بها بيانات مفقودة، وهذا الاكتشاف يعتمد بالكامل على مقارنة قيمة `count` بين الأعمدة كما أوضحت المحاضرة.

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

> ≥10 أسئلة. نموذج الإجابة: 1. التعريف 2. المكونات/الشروط 3. مثال رقمي 4. متى نستخدم.

### السؤال 1: ما الفرق بين الصفة (Attribute) وقيمة الصفة (Attribute Value)؟ اشرح بمثال.
**نموذج الإجابة:**
1. التعريف: الصفة مفهوم عام يصف خاصية، بينما قيمة الصفة هي التمثيل الفعلي لها (رقم أو رمز).
2. المكونات: قد تملك القيم خصائص لا تملكها الصفة نظرياً (كوجود حد أقصى للعمر) والعكس.
3. مثال: صفة "الطول" يمكن تمثيلها بوحدات مختلفة (قدم أو متر) لنفس المفهوم.
4. تُستخدم هذه التفرقة لتفادي أخطاء منهجية كحساب متوسط لصفة غير مناسبة لذلك (كـ ID).

### السؤال 2: عدّد الأنواع الأربعة للصفات مع العمليات المسموحة بكل نوع.
**نموذج الإجابة:**
1. التعريف: تصنيف الصفات حسب العمليات المنطقية المتاحة عليها.
2. المكونات: Nominal (تمايز)، Ordinal (تمايز+ترتيب)، Interval (تمايز+ترتيب+فروقات)، Ratio (كل الأربع بما فيها النسب).
3. مثال: gender (Nominal)، grades (Ordinal)، calendar dates (Interval)، weight (Ratio).
4. تُستخدم هذه الأنواع لتحديد أي عملية إحصائية (mean, median, mode) يصح تطبيقها.

### السؤال 3: لماذا لا يوجد "صفر حقيقي" في درجة الحرارة بالمئوية، ولماذا يوجد في درجة الحرارة بالكلفن؟
**نموذج الإجابة:**
1. التعريف: الصفر الحقيقي يعني غياباً تاماً للكمية المقاسة فيزيائياً.
2. المكونات: صفر مئوية هو نقطة تجمّد الماء فقط (اصطلاحية)، بينما صفر كلفن هو الصفر المطلق (غياب تام للطاقة الحرارية).
3. مثال: 20° مئوية ليست "ضعف" 10° مئوية فيزيائياً، لكن 200K هي فعلاً ضعف 100K.
4. يُستخدم هذا الفرق لتحديد ما إذا كانت الصفة Interval أم Ratio.

### السؤال 4: عرّف الأبعاد (Dimensionality) والدقة (Resolution) كخاصيتين عامتين لمجموعات البيانات.
**نموذج الإجابة:**
1. التعريف: Dimensionality = عدد الصفات لكل كائن. Resolution = مستوى تفصيل رصد البيانات.
2. المكونات: أبعاد عالية جداً تصعّب التحليل (تحتاج dimensionality reduction). دقة غير مناسبة (عالية جداً أو منخفضة جداً) قد تُخفي النمط الحقيقي.
3. مثال: تقلبات الطقس تظهر على مقياس الساعات لكن تختفي على مقياس الأشهر.
4. تُستخدم هاتان الخاصيتان لاختيار مستوى المعالجة المسبقة المناسب قبل التنقيب.

### السؤال 5: ما الفرق بين Record Data وGraph Data وOrdered Data؟
**نموذج الإجابة:**
1. التعريف: ثلاث فئات رئيسية لتصنيف مجموعات البيانات حسب بنيتها.
2. المكونات: Record Data (صفوف بصفات ثابتة: Matrix/Document/Transaction). Graph Data (علاقات بين كائنات أو كائنات هي نفسها رسوم بيانية). Ordered Data (ترتيب زمني/موضعي: Sequential/Sequence/Time Series/Spatial).
3. مثال: جدول عملاء (Record)، شبكة اجتماعية (Graph)، سلسلة حرارة شهرية (Ordered - Time Series).
4. تُستخدم هذه الفئات لاختيار طريقة التنقيب المناسبة لكل بنية بيانات.

### السؤال 6: ما تعريف الـ IQR وكيف تُستخدم لاكتشاف القيم الشاذة؟
**نموذج الإجابة:**
1. التعريف: IQR = Q3 - Q1، مدى النصف الأوسط من البيانات المرتّبة.
2. المكونات: حدود الشذوذ = Q1-1.5×IQR (أدنى) و Q3+1.5×IQR (أعلى).
3. مثال: بيانات الراتب في المحاضرة: IQR=$16,000، الحد الأعلى=$87,000، والقيمة $110,000 تتجاوزه فتُعتبر شاذة.
4. تُستخدم هذه القاعدة كخطوة أولية آلية لفحص القيم الشاذة قبل مرحلة المعالجة المسبقة.

### السؤال 7: قارن بين المتوسط الحسابي والوسيط من حيث الحساسية للقيم الشاذة.
**نموذج الإجابة:**
1. التعريف: المتوسط = مجموع القيم/عددها. الوسيط = القيمة الوسطى بعد الترتيب.
2. المكونات: المتوسط حساس جداً للقيم المتطرفة (يمكن "سحبه" بقيمة واحدة شاذة)، بينما الوسيط أكثر مقاومة.
3. مثال: بيانات الأعمار [22,25,25,28,30,32,35,40,45,90]: المتوسط=37.2 (متأثر بالقيمة 90)، الوسيط=31 (أكثر تمثيلاً للحالة النموذجية).
4. يُستخدم الوسيط عند وجود قيم شاذة محتملة، والمتوسط عند بيانات متماثلة نسبياً.

### السؤال 8: اشرح الفرق بين Boxplot وHistogram، ولماذا يُنصَح باستخدامهما معاً.
**نموذج الإجابة:**
1. التعريف: Boxplot يعرض ملخص الأرقام الخمسة بصرياً. Histogram يعرض التوزيع التكراري الكامل للقيم.
2. المكونات: Boxplot جيد للمقارنات السريعة واكتشاف الشواذ، لكنه قد يخفي شكل التوزيع الداخلي (أحادي/متعدد القمم).
3. مثال: توزيعان مختلفان تماماً (unimodal وmultimodal) قد ينتجان نفس شكل Boxplot تماماً.
4. يُستخدمان معاً لتفادي فقدان تفاصيل مهمة عن شكل التوزيع الحقيقي.

### السؤال 9: ما معنى Sparsity كحالة خاصة من الانحراف (Skewness) في البيانات؟
**نموذج الإجابة:**
1. التعريف: Sparsity = حالة خاصة حيث معظم قيم صفات الكائنات تساوي صفراً.
2. المكونات: نوع من التوزيع شديد الانحراف نحو القيمة صفر تحديداً.
3. مثال: بيانات المعاملات (Transaction Data) حيث كل عميل يشتري عدداً قليلاً جداً من المنتجات من بين آلاف المنتجات المتاحة (أغلب الخلايا = صفر).
4. تُستخدم معرفة هذه الخاصية لاختيار تقنيات تخزين ومعالجة خاصة بالبيانات المتفرّطة (sparse data structures).

### السؤال 10: ما الفرق بين البيانات المهيكلة وغير المهيكلة، مع مثال مختلط؟
**نموذج الإجابة:**
1. التعريف: المهيكلة = بنية جدولية ثابتة الصفات. غير المهيكلة = نصوص ووسائط متعددة بلا بنية جدولية ثابتة.
2. المكونات: البيانات الواقعية غالباً مزيج من الاثنين.
3. مثال: موقع تسوّق إلكتروني: حقول السعر والاسم (مهيكلة) + صور المنتج وفيديو الإعلان (غير مهيكلة).
4. تُستخدم هذه التفرقة لاختيار أدوات المعالجة المناسبة (SQL للمهيكلة، معالجة NLP/صور للاسم للأخرى).

### السؤال 11: عرّف مستويات التحليل الثلاثة: Univariate وBivariate وMultivariate.
**نموذج الإجابة:**
1. التعريف: عدد الصفات المُحلَّلة في وقت واحد.
2. المكونات: Univariate (صفة واحدة)، Bivariate (صفتان معاً، كمعامل الارتباط واختبار chi-square)، Multivariate (أكثر من صفتين معاً).
3. مثال: حساب متوسط صفة العمر وحدها (Univariate) مقابل حساب الارتباط بين العمر والدخل (Bivariate).
4. تُستخدم هذه المستويات تصاعدياً: نبدأ بالتحليل الأحادي قبل الانتقال للثنائي والمتعدد لفهم العلاقات بين الصفات.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| Getting to Know Your Data (هذه المحاضرة) | Introduction | تفصيل عملي لخطوات Data Preparation في KDD |
| Getting to Know Your Data | Data Preprocessing | فهم أنواع الصفات أساس لتقنيات التنظيف والتطبيع والتقطيع |
| Getting to Know Your Data | Classification/Clustering | نوع الصفة (Nominal/Ratio) يحدد أي خوارزمية ومقياس مسافة مناسب |
| Getting to Know Your Data | Measuring Data Similarity (محاضرة 9) | أنواع الصفات (خصوصاً Binary Symmetric/Asymmetric) أساس حساب التشابه لاحقاً |

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| أنواع الصفات | Nominal (تمايز) < Ordinal (+ترتيب) < Interval (+فروقات) < Ratio (+نِسَب) |
| Binary | Symmetric (متساوية القيمة) مقابل Asymmetric (حالة نادرة أهم تُرمَّز 1) |
| خصائص مجموعات البيانات | Dimensionality, Resolution, Distribution (وSparsity كحالة خاصة) |
| أنواع مجموعات البيانات | Record (Matrix/Document/Transaction), Graph, Ordered (Sequential/Sequence/Time Series/Spatial) |
| النزعة المركزية | Mean حساس للشواذ، Median مقاوم، Mode للفئات، Midrange بسيط لكن حساس جداً |
| التشتت | Range, IQR=Q3-Q1, Five-Number Summary, Variance/Std Dev |
| اكتشاف الشواذ | خارج [Q1-1.5×IQR, Q3+1.5×IQR] |
| العرض البياني | Boxplot (ملخص + شواذ) وHistogram (شكل التوزيع الكامل) — يُستخدمان معاً |

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `X̄` | المتوسط الحسابي | Central Tendency |
| `σ²` | التباين | Dispersion |
| `σ` | الانحراف المعياري | Dispersion |
| `Q1, Q2 (Median), Q3` | الربيعيات الثلاثة | Five-Number Summary |
| `IQR` | Q3 - Q1 | اكتشاف القيم الشاذة |
| `skewness` | اتجاه انحراف التوزيع (موجب/سالب) | Central Tendency plotting |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | حدّد نوع الصفة (Nominal/Ordinal/Interval/Ratio) قبل أي عملية إحصائية |
| 2 | صفر حقيقي = Ratio، لا صفر حقيقي لكن فروقات ذات معنى = Interval |
| 3 | المتوسط حساس للشواذ، الوسيط مقاوم لها |
| 4 | حدود اكتشاف الشواذ: خارج [Q1-1.5×IQR, Q3+1.5×IQR] |
| 5 | Boxplot قد يخفي شكل التوزيع الحقيقي — استخدم Histogram أيضاً |
| 6 | عمود count في describe() يكشف القيم المفقودة |

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما هي العملية الوحيدة المسموحة على الصفة الاسمية (Nominal)؟
A: التمايز فقط (= و≠)، ويمكن حساب المنوال (mode) فقط كمقياس نزعة مركزية.

---

**Q2:** ما الفرق الجوهري بين Interval-Scaled وRatio-Scaled؟
A: وجود صفر حقيقي (true zero-point) في Ratio يسمح بالحديث عن النسب، بينما Interval لا يملك صفراً حقيقياً.

---

**Q3:** لماذا لا يمكن تعريف المتوسط الحسابي (mean) لصفة ترتيبية (Ordinal)؟
A: لأن مقدار الفرق بين القيم المتتالية غير معروف رياضياً، رغم وجود ترتيب منطقي بينها.

---

**Q4:** ما هي الفئات الثلاث الرئيسية لأنواع مجموعات البيانات؟
A: Record Data، Graph Data، وOrdered Data.

---

**Q5:** ما الفرق بين Sequential Data وSequence Data؟
A: Sequential Data لها طوابع زمنية حقيقية (كتاريخ الشراء)، بينما Sequence Data لها مواقع ضمن تسلسل مرتّب بلا طوابع زمنية (كالبيانات الجينية).

---

**Q6:** ما صيغة حساب IQR وحدود اكتشاف القيم الشاذة؟
A: IQR = Q3 - Q1؛ الحد الأدنى = Q1 - 1.5×IQR؛ الحد الأعلى = Q3 + 1.5×IQR.

---

**Q7:** لماذا يُعتبر المتوسط الحسابي حساساً للقيم الشاذة أكثر من الوسيط؟
A: لأن المتوسط يأخذ بعين الاعتبار قيمة كل نقطة بيانات في الحساب، فقيمة متطرفة واحدة تسحبه بقوة، بينما الوسيط يعتمد فقط على الترتيب والموقع.

---

**Q8:** ما الفرق بين الانحراف الإيجابي (Positively Skewed) والسلبي (Negatively Skewed)؟
A: في الانحراف الإيجابي المنوال أصغر من الوسيط (ذيل طويل لليمين، مثال: الدخل)؛ في السلبي المنوال أكبر من الوسيط (ذيل طويل لليسار).

---

**Q9:** ما مكوّنات صندوق Boxplot الأساسية؟
A: الصندوق (بين Q1 وQ3)، خط الوسيط داخله، الشعيرات (Whiskers) الممتدة للحد الأدنى/الأقصى غير الشاذ، والنقاط المنفردة للقيم الشاذة.

---

**Q10:** لماذا قد يُخفي Boxplot معلومات يكشفها Histogram؟
A: لأن توزيعين مختلفين تماماً في شكلهما الداخلي (أحادي القمة مقابل متعدد القمم) قد ينتجان نفس ملخص الأرقام الخمسة، وبالتالي نفس شكل Boxplot.

---

**Q11:** ما الفرق بين Equal Width وEqual Depth في المدرجات التكرارية؟
A: Equal Width يقسم المدى إلى فترات متساوية الحجم، بينما Equal Depth يقسمه إلى فترات تحتوي كل منها تقريباً نفس عدد العينات.

---

**Q12:** ماذا يعني عمود count في نتيجة data.describe()؟
A: عدد القيم غير المفقودة (non-missing) لكل صفة، وليس بالضرورة عدد كل صفوف الجدول.

---

**Q13:** اذكر مثالاً على صفة Binary Asymmetric وكيف تُرمَّز حالاتها.
A: فحص HIV (إيجابي/سلبي) — تُرمَّز الحالة الأندر والأهم سريرياً (إيجابي) بـ 1، والأخرى (سلبي) بـ 0.

---

**Q14:** ما هي الخصائص الثلاث العامة لمجموعات البيانات المؤثرة على تقنيات Data Mining؟
A: Dimensionality (عدد الصفات)، Resolution (مستوى الدقة/الاستبانة)، Distribution (توزيع تكرار القيم، بما فيها حالة Sparsity).

---

**Q15:** ما الفرق بين Univariate وBivariate وMultivariate Analysis؟
A: تحليل صفة واحدة، تحليل صفتين معاً (كالارتباط)، وتحليل أكثر من صفتين معاً على الترتيب.

---

**Q16:** ما مثال Iris dataset المستخدم في المحاضرة؟ وما أنواع صفاته؟
A: 150 زهرة (50 من كل نوع: Setosa, Versicolour, Virginica)، بـ4 صفات مستمرة (Ratio-Scaled: أطوال/عروض بالسنتيمتر) وصفة هدف فئوية واحدة (Nominal: class).

---

## الجزء الخامس: كتابة الكود الكامل (مرجع شامل)

> الكود التالي مرجع شامل يجمع أنماط الاستكشاف الإحصائي الأساسي لبيانات Iris كما وردت في المحاضرة — مرجع للطالب، لا شرح جديد.

```python
# === Load Data ===
import pandas as pd

data = pd.read_csv(
    'http://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data',
    header=None
)
data.columns = ['sepal length', 'sepal width', 'petal length', 'petal width', 'class']
data.head()

# === Quantitative Attribute Statistics ===
from pandas.api.types import is_numeric_dtype

for col in data.columns:
    if is_numeric_dtype(data[col]):
        print('%s:' % (col))
        print('\t Mean = %.2f' % data[col].mean())
        print('\t Standard deviation = %.2f' % data[col].std())
        print('\t Minimum = %.2f' % data[col].min())
        print('\t Maximum = %.2f' % data[col].max())

# === Qualitative Attribute Frequency ===
data['class'].value_counts()

# === Full Summary (Univariate Analysis) ===
data.describe(include='all')

# === Five-Number Summary & Outlier Bounds (manual calculation example) ===
Q1 = data['sepal length'].quantile(0.25)
Q3 = data['sepal length'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
print(f"IQR={IQR}, Lower={lower_bound}, Upper={upper_bound}")

# === Graphic Displays ===
%matplotlib inline

# Boxplot for all numeric attributes together
data.boxplot()

# Histogram for a single attribute with 8 equal-width bins
data['sepal length'].hist(bins=8)
```

---

## الجزء التاسع: قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أستطيع تعريف الفرق بين "الصفة" و"قيمة الصفة" بمثال.
- [ ] أستطيع سرد الأنواع الأربعة للصفات (Nominal, Ordinal, Interval, Ratio) والعمليات المسموحة بكل منها.
- [ ] أفهم لماذا `ID_numbers` صفة اسمية رغم كونها أرقاماً.
- [ ] أفهم الفرق بين Binary Symmetric وAsymmetric مع مثال لكل منهما.
- [ ] أستطيع شرح الفيصل بين Interval وRatio (وجود صفر حقيقي).
- [ ] أعرف الخصائص الثلاث العامة لمجموعات البيانات: Dimensionality, Resolution, Distribution.
- [ ] أفهم الفرق بين Sparsity وSkewness العام.
- [ ] أستطيع تصنيف أي مجموعة بيانات ضمن Record/Graph/Ordered Data وأنواعها الفرعية.
- [ ] أستطيع حساب Mean, Median, Mode, Midrange يدوياً لمجموعة قيم.
- [ ] أستطيع حساب IQR وحدود اكتشاف القيم الشاذة (1.5×IQR) يدوياً.
- [ ] أستطيع حساب التباين والانحراف المعياري خطوة بخطوة.
- [ ] أفهم الفرق بين الانحراف الإيجابي والسلبي للتوزيع (Skewness).
- [ ] أعرف مكوّنات Boxplot (الصندوق، الوسيط، الشعيرات، القيم الشاذة).
- [ ] أفهم لماذا Boxplot قد يخفي تفاصيل يكشفها Histogram.
- [ ] أعرف الفرق بين Equal Width وEqual Depth Histograms.
- [ ] أفهم معنى عمود count في `describe()` وعلاقته بالبيانات المفقودة.
- [ ] راجعت جميع أسئلة MCQ (16) وفهمت تعليل كل خيار.
- [ ] راجعت أسئلة تصحيح الكود (5) وفهمت كل خطأ وتصحيحه.
- [ ] حللت التمارين التطبيقية والتحليلية وتمارين التتبع كاملة (خصوصاً الحسابات اليدوية).
- [ ] راجعت بطاقات Q&A (16 بطاقة) وورقة الـ Cheat Sheet قبل الامتحان مباشرة.

---

<!--
VALIDATION:
- Source lecture: KDD_Lecture 2.pdf (Getting to Know Your Data) — 47 slides, Dr. Asmaa Shaar.
- Lecture type detected: Data Preprocessing / Exploratory Data Analysis foundations (Attribute Types, Dataset Characteristics, Basic Statistical Descriptions). Data Visualization section explicitly marked "not covered" in the lecture index slide but slides 42-48 (Boxplot/Histogram) were present in the PDF content and thus covered fully. Similarity/Dissimilarity measurement explicitly deferred to Lecture 9 per the lecture's own index and not fabricated here.
- All slide content covered in Part 1 (sections 1-38) sequentially following original slide order.
- All formulas (Mean, Variance, Standard Deviation, IQR, outlier bounds) are directly from the lecture and computed exactly as in the original worked example (salary data: 30,36,47,50,52,52,56,60,63,70,70,110).
- Counts delivered: MCQ=16, Debug=5, Practice exercises=6, Analysis exercises=4, Trace exercises=5, Theory questions=11, QA cards=16, Cheat sheet=complete, Full code reference=complete.
- All English terms formatted in backticks; all algorithm/diagram blocks follow SCHEMA.md v1.0 formatting.
-->
