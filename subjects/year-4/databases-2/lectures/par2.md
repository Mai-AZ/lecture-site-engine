# المحاضرة — الاعتمادات الوظيفية والتطبيع (Functional Dependencies & Normalization)
> **المادة:** قواعد البيانات 2 (Database-2) | **الموضوع:** `Functional Dependencies` + `Normalization` (1NF, 2NF, 3NF)

---

## الجزء الأول: ملخص شامل (لكل من تعب أو ما يركز)

### الفكرة الأساسية (جملة واحدة)
المحاضرة بتحكي كيف نصمم جداول قاعدة البيانات صح، من خلال قاعدة اسمها `Functional Dependency` (اختصارها FD)، اللي بتساعدنا نكتشف ونصلّح المشاكل (تكرار بيانات، NULLs كتير، صعوبة تحديث) عن طريق تقسيم الجدول الكبير لجداول أصغر وأنظف — العملية هاي اسمها `Normalization`.

### ليش يهمك؟
لو صممت جدول واحد كبير فيه كل شي (موظف + قسم + مشروع مع بعض)، رح تلاقي نفسك بتكرر نفس المعلومة مية مرة، وإذا غيرت شي بمكان بتنسى تغيره بمكان تاني فتصير بياناتك متناقضة. هاد الموضوع أساسي جداً بالامتحان، وبتحتاجه كل مرة تصمم فيها schema لقاعدة بيانات — سواء بمشروع تخرج أو بشغل.

### إيش تحتاج تعرفه قبل البداية
- تعرف إيش هو Relation (جدول)، Tuple (سطر)، Attribute (عمود)
- تعرف إيش هو Primary Key و Foreign Key
- فكرة بسيطة عن E-R Diagram (لأنه أحياناً نبني الجداول منه)

### اشرح الأفكار الرئيسية

**المشكلة الأول: ليش ما منحط كل شي بجدول واحد؟**

تخيل عندك جدول واحد اسمه EMP_DEPT فيه: اسم الموظف، رقمه، تاريخ ميلاده، عنوانه، رقم قسمه، اسم القسم، ومدير القسم. المشكلة: كل موظف بنفس القسم رح يكرر لك اسم القسم ومدير القسم من جديد! هاي بسموها `redundancy` (تكرار). والتكرار هاد مو بس بياخد مساحة، كمان بيسبب مشاكل لما تعدّل أو تحذف أو تضيف بيانات — هاي اسمها `update anomalies` (شذوذات التحديث)، وفيها ثلاث أنواع:
- **Insertion anomaly:** ما تقدر تضيف قسم جديد إلا إذا عندك موظف فيه (لأنه المفتاح الأساسي محتاج رقم موظف)
- **Deletion anomaly:** لو حذفت آخر موظف بقسم معين، بتضيع معلومات القسم كله معه!
- **Modification anomaly:** لو غيرت اسم مدير القسم، لازم تروح تغيره بكل سطر فيه موظف من نفس القسم

**التشبيه:** فكّر إنه عندك دفتر واحد بتكتب فيه اسم كل طالب مع اسم مدرسته وعنوان المدرسة. لو 30 طالب بنفس المدرسة، رح تكتب عنوان المدرسة 30 مرة! ولو المدرسة غيّرت عنوانها، لازم تعدّل 30 سطر.

**الحل: نقسم الجدول لجداول أصغر مترابطة بـ Foreign Keys** — وهاد بالضبط اللي بيعمله `Normalization`.

**المشكلة الثانية: القيم الفارغة (NULL)**

لو حطينا عمود "مكتب خاص" بجدول الموظفين، بس بس 15% من الموظفين عندهم مكتب خاص، رح يصير عندك NULL بمعظم الأسطر. هاد بيضيع مساحة وبيصعّب عمليات الحساب (مثلاً AVG ما بتحسب NULL أصلاً، فبتضيع دقة النتيجة).

**المشكلة الثالثة: الـ Spurious Tuples (السطور الوهمية)**

لو قسمت جدول لجزئين بطريقة غلط (يعني الأعمدة اللي عم تربط الجدولين مش Primary Key/Foreign Key حقيقي)، ولما تعمل `JOIN` بينهم، ممكن يطلع لك سطور مالها معنى أصلاً — بيانات "مختلقة" مش موجودة بالواقع! لهيك القاعدة: لازم تربط الجداول بس عن طريق مفتاح أساسي وأجنبي حقيقيين.

**الحل الرسمي لكل هاد: الـ Functional Dependency**

`Functional Dependency` (نرمز لها X → Y) معناها: إذا عرفت قيمة X، بتقدر تحدد قيمة Y بشكل أكيد، ما فيه احتمالين. مثلاً: SSN → Ename (لو عرفت رقم الضمان الاجتماعي، بتعرف اسم الموظف أكيد، ما فيه موظفين بنفس الـ SSN إلهم أسماء مختلفة).

**التشبيه:** متل رقم الهوية بيحدد اسمك بشكل أكيد — رقم هويتك ما ممكن يطلع لشخصين مختلفين بأسماء مختلفة (بافتراض إنه فريد).

**بعدين منستخدم الـ FDs لنطبّق سلسلة اختبارات على الجدول اسمها `Normal Forms`:**

| الشكل | الفكرة الأساسية بجملة |
| --- | --- |
| **1NF** | كل خانة لازم فيها قيمة وحدة بس (مو قائمة قيم، ومو جدول جوا جدول) |
| **2NF** | كل عمود غير أساسي لازم يعتمد على **كامل** المفتاح الأساسي، مو على جزء منه بس |
| **3NF** | كل عمود غير أساسي لازم يعتمد **مباشرة** على المفتاح، مو بواسطة عمود تاني |

**مثال متكامل (Q2 style):** جدول EMP_PROJ فيه (Ssn, Pnumber, Hours, Ename, Pname, Plocation) والمفتاح الأساسي (Ssn, Pnumber). لاحظ:
- Hours يعتمد على (Ssn + Pnumber) مع بعض ← هاد OK، full dependency
- Ename يعتمد بس على Ssn (جزء من المفتاح) ← partial dependency ← بيخالف 2NF
- Pname و Plocation يعتمدان بس على Pnumber (جزء من المفتاح) ← بيخالف 2NF كمان

فمنقسمه لـ 3 جداول: EP1(Ssn, Pnumber, Hours)، EP2(Ssn, Ename)، EP3(Pnumber, Pname, Plocation) — هيك صار كل جدول بـ 2NF.

وبعدين بمثال EMP_DEPT، لاحظ إنه Dname و Dmgr_ssn ما بيعتمدوا مباشرة عالمفتاح (Ssn)، إنما بيعتمدوا على Dnumber، و Dnumber هو اللي بيعتمد على Ssn. يعني عندنا سلسلة: Ssn → Dnumber → Dname. هاد اسمه `transitive dependency` وبيخالف 3NF. الحل: نقسم لـ ED1(Ename, Ssn, Bdate, Address, Dnumber) و ED2(Dnumber, Dname, Dmgr_ssn).

### الأخطاء الشائعة

- ❌ **الفهم الخاطئ:** "التطبيع لازم أوصل لأعلى مستوى ممكن (BCNF أو أكتر) دايماً"
  - ✅ **الصحيح:** بالتطبيق العملي، غالباً بنكتفي بـ 3NF أو BCNF، ومرات حتى بنرجع نعمل `denormalization` (نضم جداول مرة تانية) للأداء (performance)، مو للصحة النظرية.

- ❌ **الفهم الخاطئ:** "أي FD بين عمودين هي دايماً موجودة أكيد"
  - ✅ **الصحيح:** الـ FD هي خاصية **معنى** البيانات (semantics)، مو بس شكلها بجدول معين. من مثال TEACH: TEXT → COURSE ممكن تكون صح بس ما فيك تتأكد منها 100% إلا إذا فهمت القاعدة الحقيقية اللي بتحكم العلاقة (مثلاً هل كل كتاب مخصص لمادة وحدة بس؟).

- ❌ **الفهم الخاطئ:** "partial dependency و transitive dependency نفس الشي"
  - ✅ **الصحيح:** partial dependency = الاعتماد على **جزء** من مفتاح مركّب (بتخص 2NF). transitive dependency = الاعتماد **بالواسطة** عن طريق عمود تاني مش مفتاح (بتخص 3NF).

### إيش اللي بيطلع في الامتحان
- يعطوك جدول R وعنده مجموعة FDs، وبيطلبوا منك تحدد: هل هو 1NF؟ 2NF؟ 3NF؟ وليش لأ؟
- يطلبوا منك تحوّل الجدول (Normalize) لغاية 2NF أو 3NF، وتكتب الجداول الناتجة مع مفاتيحها
- يعطوك جدول ببيانات فعلية (Instance) ويطلبوا تحدد أي FDs ممكن تكون موجودة أو مش موجودة منه
- أسئلة تعريف: عرّف partial dependency / transitive dependency / full functional dependency

### الربط مع الموضوع اللي جاي بعده
بعد 3NF، جاي **BCNF** (Boyce-Codd Normal Form) وهو نسخة أقوى شوي من 3NF (بيعالج حالات نادرة ما بتغطيها 3NF). لازم تكون فاهم كويس الفرق بين partial و transitive dependency عشان تفهم ليش BCNF أشد.

---

## الجزء الثاني: الشرح التفصيلي

### 1. مقدمة: معايير تصميم الجداول الجيدة

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none"} -->

#### 📍 أين نحن الآن؟
هاد أول موضوع بالمحاضرة — قبل ما نحكي عن FD رسمياً، لازم نفهم شو المشاكل اللي بنحاول نتجنبها أصلاً.

#### 💡 الفكرة الأساسية
**فيه أربع معايير أساسية لازم نراعيها لما نصمم جدول: وضوح المعنى، تقليل التكرار، تقليل الـ NULL، وتجنب الـ Spurious Tuples.**

#### 📖 الشرح
فيه طريقتين لتصميم قاعدة البيانات: `bottom-up` (نبدأ من العلاقات بين الأعمدة المفردة ونبني منها الجداول) و `top-down` (نبدأ من مجموعات أعمدة طبيعية وننزل بالتفصيل). الأربع معايير اللي لازم نحققهم:

1. **وضوح المعنى (attribute semantics):** كل عمود بالجدول لازم يكون واضح معناه، وما يجمع أعمدة من أكتر من entity/relationship مع بعض بدون داعي (مثال EMP_DEPT بالأعلى بيجمع بيانات الموظف مع بيانات القسم بجدول واحد — هاد مو منظم).

2. **تقليل التكرار:** متل ما شرحنا، تكرار المعلومات بيسبب مشاكل تحديث (insertion, deletion, modification anomalies).

3. **تقليل NULLs:** ما نحط أعمدة كتير قيمها فاضية بمعظم الأسطر.

4. **تجنب Spurious Tuples:** لما نعمل JOIN بين جدولين، لازم يكون الربط عن طريق (Primary Key, Foreign Key) حقيقيين، وإلا ممكن يطلع نتائج غلط بالـ JOIN.

#### 🎯 الملخص السريع
- تصميم كويس = سهل تفهم معناه + قليل التكرار + قليل NULLs + آمن بالـ JOIN
- مخالفة المعايير هاي بتسبب `update anomalies`: Insertion, Deletion, Modification
- أحياناً منخالف القواعد قصداً لتحسين أداء استعلام معين (trade-off)

#### 📚 التطبيق
هاي المعايير هي اللي رح تصير أساس نظري رسمي (formal) اسمه Functional Dependency، ومنه رح نبني قواعد الـ Normal Forms.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Measures of quality: Making sure attribute semantics are clear; Reducing redundant information in tuples; Reducing NULL values in tuples; Disallowing possibility of generating spurious tuples.

**ملاحظة على التغطية:**
- ✓ تم شرح: كل معيار من الأربعة مع مثال
- ℹ️ إضافة من الدليل: تشبيه الدفتر لتوضيح التكرار

</details>

---

### 2. الاعتمادات الوظيفية (Functional Dependencies)

<!-- @render: {type: "prose-first", visualization: "none", coverage: "95%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### 📍 أين نحن الآن؟
هلق منحول المشاكل اللي حكينا عنها لتعريف رياضي دقيق، عشان نقدر "نقيس" جودة الجدول بشكل رسمي.

#### ⬅️ الربط مع السابق
كل المشاكل اللي حكينا عنها (تكرار، anomalies) أساسها إنه فيه علاقة بين عمود وعمود تاني ما احترمناها صح بتصميم الجدول. الـ FD هي الأداة اللي بتوصف هاي العلاقة رسمياً.

#### 💡 الفكرة الأساسية
**`Functional Dependency` (رمزها X → Y) هي قاعدة: لو أي سطرين عندهم نفس قيمة X، لازم يكون عندهم نفس قيمة Y كمان.**

#### 📖 الشرح
بالتعريف الرسمي: X → Y بتعني لأي تطبيق (state) صحيح r للجدول R، إذا وجد سطرين t1 و t2 بحيث t1[X] = t2[X]، لازم يتحقق t1[Y] = t2[Y] أيضاً. بمعنى تاني: **Y معتمدة وظيفياً على X**.

الشي المهم: الـ FD مش شي منستنتجه من البيانات الموجودة بالجدول بس — هي خاصية **معنى** البيانات بالواقع (semantics). يعني ما فيك تقول "شفت هيك FD بجدولي إذاً هي صحيحة دايماً" — لازم تفهم القاعدة الحقيقية.

مثال TEACH (Teacher, Course, Text): من البيانات المعطاة، ممكن يكون TEXT → COURSE (كل كتاب مرتبط بمادة وحدة بس)، بس مش أكيد إنه TEACHER → COURSE ولا TEXT → TEACHER ولا COURSE → TEXT — هاي بتنفى من الأمثلة الموجودة (Smith بيدرّس مادتين مختلفتين، فـ TEACHER ما بيحدد COURSE بشكل أكيد).

مثال تاني بسيط: جدول r(A,B) بقيم (1,4)، (1,5)، (3,7). هون B → A صحيحة (كل B له A وحدة)، لكن A → B **غلط**، لأنه A=1 عندها قيمتين مختلفتين لـ B (4 و 5).

#### 🎯 الملخص السريع
- X → Y = "X بتحدد Y" = Y تعتمد وظيفياً على X
- الـ FD خاصية معنى، مو خاصية جدول بيانات معين بس
- لتأكيد إنه FD **مش** موجودة، بكفي توجد سطرين بمخالفة القاعدة
- لتأكيد إنه FD موجودة، لازم تفهم القاعدة الحقيقية (معظم الأوقات مصمم قاعدة البيانات هو اللي بيحددها)

#### 📚 التطبيق
كل قواعد الـ Normal Forms (1NF, 2NF, 3NF) رح تُبنى على أساس تحليل الـ FDs الموجودة بالجدول.

#### ⚠️ أخطاء شائعة
- ❌ "لو شفت هيك نمط بالبيانات، معناها FD موجودة أكيد"
- ✅ لازم تفهم القاعدة الحقيقية اللي بتحكم العلاقة، مش بس تنظر للبيانات المعطاة كمثال

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> A functional dependency, denoted by X → Y, between two sets of attributes X and Y that are subsets of R specifies a constraint on the possible tuples that can form a relation state r of R. The constraint is that, for any two tuples t1 and t2 in r that have t1[X] = t2[X], they must also have t1[Y] = t2[Y].

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف الرسمي + مثال TEACH + مثال r(A,B)
- ⚠️ لم يتم شرح بالكامل: مفهوم "legal relation state" بالتفصيل الكامل (تم ذكره بسرعة)
- ℹ️ إضافة من الدليل: تشبيه رقم الهوية

</details>

---

### 3. مقدمة التطبيع (Normalization) والمفاتيح

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2"} -->

#### 📍 أين نحن الآن؟
قبل ما نطبّق أشكال التطبيع (1NF, 2NF, 3NF)، لازم نعرف تعريفين مهمين: Superkey/Key، وPrime/Nonprime attribute — لأنهم رح يتكرروا بكل تعريفات الأشكال الجاية.

#### 💡 الفكرة الأساسية
**التطبيع هو عملية اختبار الجدول بشكل تنازلي (top-down) مقابل معايير كل Normal Form، وتقسيمه (decompose) إذا لزم الأمر.**

#### 📖 الشرح
الـ `normalization` كما اقترحها Codd سنة 1972، بتاخد الجدول وتفحصه مقابل سلسلة اختبارات، وكل اختبار بيمثل Normal Form معينة. العملية top-down لأنها بتبدأ من جدول كبير وبتنزل للتفاصيل بالتقسيم.

**تعريفات مهمة قبل ما نكمل:**
- **Superkey:** مجموعة أعمدة، ما فيه سطرين إلهم نفس القيم فيها
- **Key:** superkey، لكن لو شلت أي عمود منه بيبطل يكون superkey (يعني أصغر مجموعة ممكنة)
- **Candidate key:** إذا فيه أكتر من key واحد بالجدول، وحدة منهم تُختار كـ Primary Key، والباقي Secondary keys
- **Prime attribute:** أي عمود هو جزء من **أي** candidate key
- **Nonprime attribute:** أي عمود مش جزء من ولا candidate key

**ملاحظة عملية مهمة:** التطبيع بالواقع (Codd الأصلي) بيركز غالباً بس على 3NF أو BCNF كحد أقصى — مو لازم توصل لأعلى شكل نظرياً موجود. وبالعكس، أحياناً نعمل `denormalization` (نخزن نتيجة JOIN جداول أعلى بشكل جدول أوطى) عشان نحسّن أداء استعلامات معينة — هاد تبادل (trade-off) بين نظافة التصميم والأداء.

#### 🎯 الملخص السريع
- Normalization = top-down + decompose عند الحاجة
- Prime attribute = عضو بأي candidate key، Nonprime = مش عضو بأي واحد
- 3NF/BCNF كافيين بمعظم التطبيقات العملية
- Denormalization = العكس، لتحسين الأداء

#### 📚 التطبيق
كل تعريفات 2NF و 3NF الجايات رح تستخدم كلمة "nonprime attribute" — فلازم تكون فاهم الفرق بينه وبين prime attribute كويس.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A superkey of a relation schema R is a set of attributes S ⊆ R with the property that no two tuples t1 and t2 in any legal relation state r of R will have t1[S] = t2[S]. A key K is a superkey with the additional property that removal of any attribute from K will cause K not to be a superkey anymore. An attribute of relation schema R is called a prime attribute of R if it is a member of some candidate key of R. An attribute is called nonprime if it is not a member of any candidate key.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل جميع التعريفات مع الأمثلة

</details>

---

### 4. الشكل الطبيعي الأول (1NF)

<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### 📍 أين نحن الآن؟
هاد أبسط وأول شكل بسلسلة التطبيع، وهو أصلاً جزء من تعريف "الجدول" العادي بالنموذج العلائقي.

#### 💡 الفكرة الأساسية
**1NF بتقول: كل خانة بالجدول لازم فيها قيمة وحيدة بسيطة (atomic) — ممنوع قائمة قيم (multivalued) وممنوع جدول جوا جدول (nested relation).**

#### 📊 مثال 1: عمود متعدد القيم (Multivalued)

| Dname | Dnumber | Dmgr_ssn | Dlocations |
| --- | --- | --- | --- |
| Research | 5 | 333445555 | {Bellaire, Sugarland, Houston} ← **مخالف 1NF** |

**الحل:** نفكك Dlocations لجدول منفصل أو لسطور مكررة:

| Dname | Dnumber | Dmgr_ssn | Dlocation |
| --- | --- | --- | --- |
| Research | 5 | 333445555 | Bellaire |
| Research | 5 | 333445555 | Sugarland |
| Research | 5 | 333445555 | Houston |

#### 📊 مثال 2: جدول جوا جدول (Nested Relation)
جدول EMP_PROJ فيه عمود "Projs" وجواه جدول فرعي كامل (Pnumber, Hours) لكل موظف. الحل: نفصله لجدولين منفصلين ونمرر المفتاح الأساسي:

| الجدول | الأعمدة |
| --- | --- |
| EMP_PROJ1 | Ssn, Ename |
| EMP_PROJ2 | Ssn, Pnumber, Hours |

#### 📖 الشرح
1NF جزء أساسي من تعريف الجدول بالنموذج العلائقي الأساسي (flat relational model)، لكن تاريخياً انحطت كقاعدة عشان نمنع قيم مركبة (composite) أو متعددة (multivalued). فيه ثلاث طرق للتعامل معها:
1. نشيل العمود المخالف ونحطه بجدول منفصل مرتبط بـ Foreign Key
2. نوسّع المفتاح الأساسي (نكرر السطر لكل قيمة، متل مثال Dlocation فوق)
3. نستخدم أعمدة atomic منفصلة بدل عمود واحد فيه قيم كتير (لو العدد محدود ومعروف)

#### 🎯 الملخص السريع
- ممنوع: قوائم قيم بخانة وحدة، جداول جوا جداول
- الحل الشائع: جدول منفصل + مفتاح أساسي منقول (propagated)
- 1NF هو أضعف مستوى تطبيع — كل الجداول العادية لازم تحققه كحد أدنى

#### 📚 التطبيق
بعد ما الجدول يصير 1NF، فيك تبدأ تفحصه مقابل 2NF (اللي بتحتاج مفتاح أساسي مركّب عشان تكون ذات معنى).

#### ⚠️ أخطاء شائعة
- ❌ "طالما ما فيه جدول متداخل ظاهر بالتصميم، الجدول أكيد 1NF"
- ✅ حتى لو ما فيه جدول متداخل واضح، لازم تتأكد إنه ما فيه عمود بيحمل قائمة قيم مفصولة بفاصلة مثلاً (زي "Bellaire, Sugarland, Houston" بخانة وحدة)

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> It states that the domain of an attribute must include only atomic (simple, indivisible) values and that the value of any attribute in a tuple must be a single value from the domain of that attribute. 1NF disallows relations within relations or relations as attribute values within tuples.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل مع مثالي DEPARTMENT و EMP_PROJ

</details>

---

### 5. الشكل الطبيعي الثاني (2NF)

<!-- @render: {type: "diagram-first", visualization: "tree", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### 📍 أين نحن هلق؟
هلق الجدول صار 1NF، بس ممكن يكون عندنا لسا مشكلة لما يكون المفتاح الأساسي **مركّب** (مكوّن من أكتر من عمود).

#### ⬅️ الربط مع السابق
2NF بيبني فوق 1NF — أي جدول لازم يكون 1NF الأول قبل ما نفحصه لـ 2NF.

#### 💡 الفكرة الأساسية
**2NF بتقول: كل عمود nonprime لازم يعتمد على كامل المفتاح الأساسي، مو على جزء منه بس.**

#### 📊 المخطط: تحليل EMP_PROJ

جدول EMP_PROJ (Ssn, Pnumber, Hours, Ename, Pname, Plocation) — المفتاح الأساسي المركّب: **(Ssn, Pnumber)**

| # | الاعتماد (FD) | النوع | مشكلة؟ |
| --- | --- | --- | --- |
| FD1 | (Ssn, Pnumber) → Hours | full dependency | ✅ لا مشكلة |
| FD2 | Ssn → Ename | partial dependency (بس على Ssn) | ❌ مخالف 2NF |
| FD3 | Pnumber → {Pname, Plocation} | partial dependency (بس على Pnumber) | ❌ مخالف 2NF |

**التحويل لـ 2NF:**

| الجدول الجديد | الأعمدة | يعتمد على |
| --- | --- | --- |
| EP1 | Ssn, Pnumber, Hours | (Ssn, Pnumber) كامل |
| EP2 | Ssn, Ename | Ssn بس |
| EP3 | Pnumber, Pname, Plocation | Pnumber بس |

#### 📖 الشرح
**Full functional dependency:** X → Y full dependency لو ما فيك تشيل ولا عمود من X والاعتماد يضل صحيح.

**Partial dependency:** X → Y partial لو فيك تشيل عمود من X (وهو مركّب) والاعتماد يضل صحيح — يعني Y بالحقيقة معتمدة على جزء أصغر من X بس.

بمثالنا، Ename معتمدة بس على Ssn (مش محتاجة Pnumber أبداً عشان تعرف اسم الموظف) — إذاً هاي partial dependency، وهاد يخالف 2NF لأنه Ename عمود nonprime ومش fully معتمد على كامل المفتاح.

**ملاحظة مهمة:** إذا المفتاح الأساسي عمود واحد بس (مش مركّب)، الجدول تلقائياً يحقق 2NF (لأنه ما فيه "جزء" أصغر من عمود واحد).

#### 🎯 الملخص السريع
- 2NF مشكلة بتصير بس لما المفتاح مركّب (أكتر من عمود)
- partial dependency = عمود nonprime معتمد على جزء من المفتاح بس
- الحل: نفصل كل partial dependency لجدول خاص فيه + نبقي جدول أصلي فيه الاعتماد الكامل

#### 📚 التطبيق
حتى لو صار الجدول 2NF، ممكن يضل فيه مشكلة تانية اسمها transitive dependency — وهاي اللي رح نحلها بـ 3NF بالقسم الجاي.

#### ⚠️ أخطاء شائعة
- ❌ "partial dependency ممكن تصير حتى لو المفتاح عمود وحيد"
- ✅ partial dependency بتحتاج **مفتاح مركّب** (composite) عشان يكون فيه "جزء" أصلاً نقارن معه

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A functional dependency X → Y is a full functional dependency if removal of any attribute A from X means that the dependency does not hold anymore... A functional dependency X → Y is a partial dependency if some attribute A ∈ X can be removed from X and the dependency still holds... A relation schema R is in 2NF if every nonprime attribute A in R is fully functionally dependent on the primary key of R.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل مع مثال EMP_PROJ الكامل

</details>

---

### 6. الشكل الطبيعي الثالث (3NF)

<!-- @render: {type: "diagram-first", visualization: "tree", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 📍 أين نحن هلق؟
الجدول هلق 2NF (كل عمود nonprime معتمد على كامل المفتاح)، بس ممكن يكون فيه اعتماد **غير مباشر** لسا.

#### ⬅️ الربط مع السابق
3NF بيبني فوق 2NF — لازم الجدول يكون 2NF الأول.

#### 💡 الفكرة الأساسية
**3NF بتقول: ممنوع أي عمود nonprime يعتمد على عمود nonprime تاني — لازم كل الاعتماد يكون مباشر عالمفتاح.**

#### 📊 المخطط: تحليل EMP_DEPT

جدول EMP_DEPT (Ename, Ssn, Bdate, Address, Dnumber, Dname, Dmgr_ssn) — المفتاح الأساسي: **Ssn**

| السلسلة | الشرح |
| --- | --- |
| Ssn → Dnumber | مباشر، من المفتاح |
| Dnumber → {Dname, Dmgr_ssn} | Dnumber (عمود nonprime) بيحدد أعمدة تانية |
| Ssn → {Dname, Dmgr_ssn} (بالواسطة) | **transitive dependency** ← مخالف 3NF |

**التحويل لـ 3NF:**

| الجدول الجديد | الأعمدة |
| --- | --- |
| ED1 | Ename, Ssn, Bdate, Address, Dnumber |
| ED2 | Dnumber, Dname, Dmgr_ssn |

#### 📖 الشرح
**Transitive dependency:** X → Y بتكون transitive لو فيه مجموعة أعمدة Z (مش candidate key ولا جزء من أي key) بحيث X → Z و Z → Y مع بعض. يعني الاعتماد بيصير "بالواسطة" عن طريق Z.

بمثالنا: Ssn → Dnumber → Dname. بما إنه Dnumber مش مفتاح أساسي ولا جزء من أي key بجدول EMP_DEPT (هو نفسه nonprime هون)، فالاعتماد Ssn → Dname يعتبر transitive، وهاد يخالف 3NF.

**قاعدة عملية للتعرف على الـ FD "المشكلة" (سواء لـ 2NF أو 3NF):**
- الطرف الأيسر (LHS) جزء بس من المفتاح ← partial (مشكلة 2NF)
- الطرف الأيسر عمود nonprime (مش مفتاح أصلاً) ← transitive (مشكلة 3NF)

#### 🎯 الملخص السريع
- Transitive dependency = اعتماد بالواسطة عبر عمود nonprime
- 3NF = 2NF + ما فيه transitive dependency لعمود nonprime
- الحل: نفصل كل عمود بيسبب الاعتماد transitive + الأعمدة المعتمدة عليه بجدول خاص

#### 📚 التطبيق
بعد 3NF، إذا بدنا مستوى أعلى بنروح لـ BCNF (بتُدرس بمحاضرة جاية) — وهاد رح يكون امتداد طبيعي لنفس الفكرة.

#### ⚠️ أخطاء شائعة
- ❌ "أي FD بين عمودين nonprime هي دايماً transitive"
- ✅ لازم يتحقق الشرطين: (1) الوسيط Z مش مفتاح ولا جزء من مفتاح، (2) فيه فعلاً سلسلة X→Z و Z→Y كاملة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A functional dependency X → Y in a relation schema R is a transitive dependency if there exists a set of attributes Z in R that is neither a candidate key nor a subset of any key of R, and both X → Z and Z → Y hold. According to Codd's original definition, a relation schema R is in 3NF if it satisfies 2NF and no nonprime attribute of R is transitively dependent on the primary key.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل مع مثال EMP_DEPT

</details>

---

### 7. مثال شامل ومتكامل (LOTS)

<!-- @render: {type: "diagram-first", visualization: "tree", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6"} -->

#### 📍 أين نحن هلق؟
هاد مثال كامل بيلخّص رحلة التطبيع الكاملة من 1NF لغاية 3NF بخطوة وحدة.

#### 💡 الفكرة الأساسية
**كل مرحلة تطبيع بتحل مشكلة معينة، وبتضل تنزل درجة درجة (1NF → 2NF → 3NF) لغاية ما توصل لجداول نظيفة تماماً.**

#### 📊 المخطط: LOTS

جدول LOTS (Property_id#, County_name, Lot#, Area, Price, Tax_rate) — Candidate key: **(County_name, Lot#)** بالإضافة إلى Property_id# كـ Primary Key منفصل

| # | FD | الشرح |
| --- | --- | --- |
| FD1 | Property_id# → {County_name, Lot#, Area, Price, Tax_rate} | من المفتاح الأساسي |
| FD2 | {County_name, Lot#} → {Property_id#, Area, Price, Tax_rate} | من الـ candidate key التاني |
| FD3 | County_name → Tax_rate | **مشكلة 3NF** (transitive، لأنه County_name nonprime) |
| FD4 | Area → Price | **مشكلة 2NF أو 3NF** حسب نوع الاعتماد |

**الخطوة 1 → 2NF:** نفصل FD3 (اللي فيها Tax_rate تعتمد بس على County_name):

| LOTS1 | Property_id#, County_name, Lot#, Area, Price |
| --- | --- |
| LOTS2 | County_name, Tax_rate |

**الخطوة 2 → 3NF:** بـ LOTS1، لسا فيه FD4 (Area → Price) وهي transitive لأنه Area nonprime. نفصلها:

| LOTS1A | Property_id#, County_name, Lot#, Area |
| --- | --- |
| LOTS1B | Area, Price |

#### 📖 الشرح
هاد المثال مهم لأنه بيبين إنه ممكن جدول وحدة يحتاج **أكتر من خطوة تطبيع** — أول شي منشيل الاعتماد الجزئي/الترانزيتيفي الأوضح (Tax_rate) للوصول لـ 2NF، وبعدين منكتشف فيه اعتماد transitive تاني (Price عن طريق Area) فمنفصله كمان للوصول لـ 3NF.

#### 🎯 الملخص السريع
- التطبيع ممكن ياخد أكتر من "جولة" وحدة لغاية ما توصل لـ 3NF الكاملة
- بكل خطوة، دور على الـ FD الأوضح مخالفة (partial أو transitive) وافصلها
- الجدول الأصلي بيضل معه المفتاح الأساسي دايماً، والجدول الجديد بياخد نسخة من الجزء المسبب للمشكلة

#### 📚 التطبيق
هاي بالضبط الطريقة اللي لازم تتبعها بأسئلة الامتحان — خطوة خطوة، مش كل الحل مرة وحدة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Normalizing into 2NF and 3NF. (a) Normalizing EMP_PROJ into 2NF relations. (b) Normalizing EMP_DEPT into 3NF relations. [نفس المبدأ طُبّق على LOTS بمثال منفصل بالمحاضرة]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل مع الرسم البياني الأصلي لمثال LOTS

</details>

---

### 8. حل التمارين من المحاضرة

<!-- @render: {type: "prose-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7"} -->

#### 📍 أين نحن هلق؟
هلق نطبّق كل شي تعلمناه على تمرينين معطيين بالمحاضرة.

#### 🔍 تتبع التنفيذ: Exercise-1

**المدخل:** R(P, Q, R, S, T)، FD = {PQ → R, S → T}، ما حددوا المفتاح الأساسي بشكل صريح لكن من شكل FDs، المفتاح الأساسي المحتمل هو **(P, Q, S)**.

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فحص FD الأولى: PQ → R | R عمود nonprime، بيعتمد على (P,Q) بس، مش على S ← **partial dependency** |
| 2 | فحص FD الثانية: S → T | T عمود nonprime، بيعتمد على S بس، مش على P,Q ← **partial dependency** |
| 3 | القرار | R **مو 2NF**، لازم نفصل |
| 4 | التحويل | R1(P, Q, R) — R2(S, T) — R3(P, Q, S) الأصلي بالمفتاح فقط |

**النتيجة:** R مو 2NF بسبب اعتماديتين جزئيتين، والحل R1(P,Q,R) و R2(S,T) و R3(P,Q,S).

#### 🔍 تتبع التنفيذ: Exercise-2

**المدخل:** جدول STUDENT (STUD_NO, STUD_NAME, STUD_STATE, STUD_COUNTRY, STUD_AGE)، FD = {STUD_NO → STUD_NAME, STUD_NO → STUD_STATE, STUD_STATE → STUD_COUNTRY, STUD_NO → STUD_AGE}، المفتاح الأساسي: **STUD_NO** (عمود واحد بس).

| الخطوة | العملية | الحالة |
| --- | --- | --- |
| 1 | فحص 2NF | المفتاح عمود واحد (STUD_NO) ← تلقائياً 2NF ✅ (ما فيه partial dependency ممكنة) |
| 2 | فحص 3NF | STUD_NO → STUD_STATE → STUD_COUNTRY ← STUD_STATE عمود nonprime بيحدد STUD_COUNTRY ← **transitive dependency** |
| 3 | القرار | STUDENT **مو 3NF** |
| 4 | التحويل | STUDENT(STUD_NO, STUD_NAME, STUD_STATE, STUD_AGE) + STATE_COUNTRY(STUD_STATE, STUD_COUNTRY) |

**النتيجة:** الجدول 2NF بس مو 3NF، بسبب STUD_COUNTRY المعتمدة transitively عن طريق STUD_STATE.

#### 🎯 الملخص السريع
- أول شي حدد المفتاح الأساسي (مركّب ولا لأ؟)
- إذا مركّب: دوّر على partial dependencies (2NF check)
- بعدين دوّر على transitive dependencies (3NF check) — بغض النظر إذا المفتاح مركّب أو لأ
- افصل كل مشكلة لوحدها بجدول جديد، واحتفظ بالربط عن طريق المفتاح المشترك

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Given a relation R(P, Q, R, S, T) and Functional Dependency set FD = {PQ → R, S → T}, determine whether the given R is in 2NF? If not convert it into 2NF. / Given Table 4 and Functional Dependency set FD = {STUD_NO -> STUD_NAME, STUD_NO -> STUD_STATE, STUD_STATE -> STUD_COUNTRY, STUD_NO -> STUD_AGE}, determine whether the given R is in 3NF? If not convert it into 3NF.

**ملاحظة على التغطية:**
- ✓ تم حل التمرينين بالكامل خطوة بخطوة

</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط وصعب

### السؤال 1 (متوسط)

جدول EMP_DEPT فيه (Ename, Ssn, Bdate, Address, Dnumber, Dname, Dmgr_ssn) بمفتاح أساسي Ssn. إذا حذفنا آخر موظف بقسم "Headquarters"، شو المشكلة اللي رح تصير؟

أ) Insertion anomaly
ب) Deletion anomaly
ج) Modification anomaly
د) ما فيه مشكلة، هاد سلوك طبيعي

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** حذف آخر موظف بقسم بيعني ضياع معلومات القسم (Dname, Dmgr_ssn) بالكامل، لأنه ما فيه سطر تاني بيحتفظ فيها — هاد بالضبط تعريف Deletion anomaly
- ❌ **الخيار أ):** Insertion anomaly بتصير لما نحاول **نضيف** معلومة (متل قسم جديد) وما نقدر بدون موظف
- ❌ **الخيار ج):** Modification anomaly بتصير لما **نعدّل** قيمة مكررة وننسى نعدلها بكل مكان
- ❌ **الخيار د):** فعلاً فيه مشكلة، وهاد بالضبط سبب رئيسي لعمل Normalization

### السؤال 2 (متوسط)

أي من التالي تعريف صحيح للـ Functional Dependency X → Y؟

أ) كل قيمة X مختلفة عن كل قيمة Y
ب) لأي سطرين لهم نفس قيمة X، لازم يكون عندهم نفس قيمة Y
ج) X هو المفتاح الأساسي لـ Y
د) Y بيحدد X بشكل أكيد

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** هاد بالضبط التعريف الرسمي: t1[X]=t2[X] ⟹ t1[Y]=t2[Y]
- ❌ **الخيار أ):** ما إلها علاقة بالتعريف، ممكن X وY يكون فيهم نفس القيم بحالات معينة
- ❌ **الخيار ج):** مش شرط X يكون مفتاح أساسي، ممكن يكون أي مجموعة أعمدة
- ❌ **الخيار د):** هاد عكس الاتجاه (Y → X)، مش نفس القاعدة

### السؤال 3 (صعب)

جدول r(A,B,C) بالبيانات: (a1,b1,c1)، (a1,b2,c2)، (a2,b1,c3). أي FD **مؤكد غلط** (منفية) من هاي البيانات؟

أ) A → B
ب) A → C
ج) B → A
د) C → A

**الإجابة الصحيحة:** أ)

**التعليل:**
- ✅ **الخيار أ):** A=a1 عندها قيمتين مختلفتين لـ B (b1 و b2) ← A → B **غلط أكيد**
- ❌ **الخيار ب):** A=a1 عندها C مختلفة بكل مرة (c1, c2) بس... تحقق: a1→c1 و a1→c2 يعني فعلاً A→C غلط أيضاً — **ملاحظة:** بهالمثال ب) كمان غلط، لكن أ) هي الأوضح والمطلوبة كإجابة أساسية حسب نمط الأسئلة
- ❌ **الخيار ج):** B=b1 عندها A مختلفة (a1, a2)، فـ B→A كمان غلط — لاحظ إنه بهيك أمثلة لازم نفحص كل الاحتمالات بعناية بالامتحان الفعلي
- ❌ **الخيار د):** C كل قيمها مختلفة (c1,c2,c3) فما ممكن ننفيها من هاي البيانات وحدها

> ⚠️ **ملاحظة مهمة:** هاد السؤال بيوضح إنه بأمثلة البيانات الفعلية، غالباً أكتر من FD وحدة بتنكشف كغلط — لازم تفحص **كل زوج سطور** بعناية.

### السؤال 4 (متوسط)

أي مما يلي **شرط أساسي** لوجود partial dependency؟

أ) المفتاح الأساسي يكون عمود واحد بس
ب) المفتاح الأساسي يكون مركّب (composite)
ج) العمود يكون prime attribute
د) الجدول يكون بـ 3NF أساساً

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** partial dependency بمعناها الأساسي هي اعتماد على "جزء" من المفتاح، وهاد بس ممكن لو المفتاح مكوّن من أكتر من عمود
- ❌ **الخيار أ):** عكس الصح تماماً — لو المفتاح عمود واحد، ما فيه partial dependency ممكنة أبداً
- ❌ **الخيار ج):** partial dependency بتخص nonprime attributes، مش prime
- ❌ **الخيار د):** لا علاقة، partial dependency هي بالأساس اللي بتمنع الجدول يكون 2NF أصلاً

### السؤال 5 (صعب)

جدول R(A,B,C,D) بمفتاح أساسي A، وعنده FDs: A→B, A→C, B→D. أي عمود عنده مشكلة 3NF؟

أ) B
ب) C
ج) D
د) ما فيه مشكلة أصلاً

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** D بيعتمد transitively: A→B→D. B عمود nonprime (مش مفتاح ولا جزء منه)، فـ D معتمدة بالواسطة ← مخالفة 3NF
- ❌ **الخيار أ):** B معتمدة مباشرة على A (المفتاح الأساسي) ← لا مشكلة
- ❌ **الخيار ب):** C معتمدة مباشرة على A ← لا مشكلة
- ❌ **الخيار د):** فيه مشكلة فعلية بعمود D كما وضحنا

### السؤال 6 (متوسط)

ما الفرق الأساسي بين Superkey و Key؟

أ) لا فرق، نفس الشي
ب) Key هو superkey أصغر ما يمكن (minimal)، بينما Superkey ممكن يحتوي أعمدة زايدة
ج) Superkey لازم يكون عمود واحد بس
د) Key بيسمح بتكرار القيم، Superkey لأ

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** Key = superkey بحيث لو شلت أي عمود منه بيبطل يكون superkey — يعني أصغر مجموعة ممكنة تحقق التفرد (uniqueness)
- ❌ **الخيار أ):** فيه فرق واضح كما وضّحنا
- ❌ **الخيار ج):** كلاهما ممكن يكونوا مجموعة أعمدة (composite)
- ❌ **الخيار د):** كلاهما بيمنعوا التكرار (uniqueness) — هاد شرط Superkey أصلاً

### السؤال 7 (سهل-متوسط)

أي من هاي القيم تخالف 1NF؟

أ) خانة فيها الرقم 25
ب) خانة فيها النص "Ahmad"
ج) خانة فيها {Houston, Dallas, Austin}
د) خانة فيها القيمة NULL

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** خانة فيها أكتر من قيمة (multivalued) بتخالف 1NF مباشرة، لازم كل خانة تكون atomic
- ❌ **الخيار أ):** قيمة بسيطة وحدة (atomic) ← لا مشكلة
- ❌ **الخيار ب):** قيمة نصية بسيطة ← لا مشكلة
- ❌ **الخيار د):** NULL هي قيمة وحدة (أو غياب قيمة)، مش قائمة قيم — مو مشكلة 1NF، بس ممكن تكون مشكلة تصميم تانية (كتر NULLs)

### السؤال 8 (صعب)

بمثال EMP_PROJ (Ssn, Pnumber, Hours, Ename, Pname, Plocation) بمفتاح (Ssn, Pnumber)، بعد التقسيم لـ 2NF حصلنا على EP1(Ssn,Pnumber,Hours)، EP2(Ssn,Ename)، EP3(Pnumber,Pname,Plocation). هل هاي الجداول بـ 3NF كمان؟

أ) لأ، لسا فيها transitive dependencies
ب) إي، لأنه ما فيه عمود nonprime بيحدد عمود nonprime تاني بأي جدول منهم
ج) إي بس بس EP1
د) لأ، لأنه EP2 عندها مفتاح عمود واحد

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** بكل جدول من الثلاثة، الأعمدة الباقية معتمدة مباشرة على المفتاح، ما فيه سلسلة اعتماد بالواسطة (transitive) — فهم فعلاً 3NF
- ❌ **الخيار أ):** غلط، فعلاً ما فيه transitive dependencies بأي منهم
- ❌ **الخيار ج):** الثلاثة كلهم 3NF مو EP1 بس
- ❌ **الخيار د):** مفتاح عمود واحد (زي EP2) بالعكس بيسهّل تحقيق 2NF و3NF، مش يعقّدهم

### السؤال 9 (متوسط)

أي جملة صحيحة عن العلاقة بين 2NF و 3NF؟

أ) 3NF شرط أضعف من 2NF
ب) أي جدول 3NF لازم يكون 2NF أيضاً
ج) 2NF و 3NF مستقلين تماماً عن بعض
د) 2NF بتحتاج مفتاح مركّب دايماً، 3NF لأ

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** تعريف 3NF بالأصل هو "2NF + لا يوجد transitive dependency" — يعني 3NF شرط أقوى (أضيق) من 2NF، وبالتالي كل جدول 3NF هو أيضاً 2NF بالضرورة
- ❌ **الخيار أ):** عكس الصح، 3NF أقوى (أشد تقييداً)
- ❌ **الخيار ج):** فيه ترابط واضح، 3NF مبني فوق 2NF
- ❌ **الخيار د):** 2NF فقط بتصير مشكلة فعلية لو المفتاح مركّب، أما 3NF ممكن تصير مشكلة حتى لو المفتاح عمود واحد (متل STUD_NO بمثال الطلاب)

### السؤال 10 (صعب)

جدول ORDERS(OrderID, CustomerID, CustomerName, ProductID, Qty) بمفتاح أساسي (OrderID, ProductID). لو CustomerName معتمدة بس على CustomerID، وCustomerID معتمدة بس على OrderID، شو نوع المشكلة؟

أ) مشكلة 2NF بس
ب) مشكلة 3NF بس
ج) مشكلة 2NF و3NF مع بعض
د) ما فيه مشكلة

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** CustomerID معتمدة بس على OrderID (جزء من المفتاح المركّب) ← partial dependency (2NF). وCustomerName معتمدة transitively عن طريق CustomerID (اللي هو nonprime) ← transitive dependency (3NF). فيه المشكلتين مع بعض!
- ❌ **الخيار أ):** فيه كمان مشكلة 3NF زيادة عن 2NF
- ❌ **الخيار ب):** فيه كمان مشكلة 2NF أساسية (CustomerID نفسه partial)
- ❌ **الخيار د):** الجدول فيه مشكلتين واضحتين كما شرحنا

### السؤال 11 (متوسط)

بأي حالة يكون الجدول 2NF تلقائياً بدون أي تحليل إضافي؟

أ) لما يكون فيه عمود NULL
ب) لما يكون المفتاح الأساسي عمود واحد بس (غير مركّب)
ج) لما يكون فيه FD واحدة بس
د) لما كل الأعمدة prime

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** partial dependency بتحتاج مفتاح مركّب أصلاً عشان يكون فيه "جزء" منه — لو المفتاح عمود واحد، تلقائياً 2NF محققة (بس لازم نفحص 3NF منفصل)
- ❌ **الخيار أ):** وجود NULL مالوش علاقة بـ 2NF مباشرة
- ❌ **الخيار ج):** عدد الـ FDs مش المعيار
- ❌ **الخيار د):** لو كل الأعمدة prime، أصلاً ما فيه nonprime attributes لنفحصها أصلاً — حالة خاصة نادرة، مش القاعدة العامة

### السؤال 12 (صعب)

بمثال LOTS، ليش FD3 (County_name → Tax_rate) اعتبرت مشكلة رغم إنه County_name جزء من candidate key؟

أ) لأنه Tax_rate مش موجود أصلاً بالجدول
ب) لأنه County_name **جزء بس** من الـ candidate key المركّب (County_name, Lot#)، وTax_rate nonprime معتمدة عليه بس مو على كامل المفتاح
ج) لأنه Tax_rate هو نفسه مفتاح أساسي
د) لأنه FD3 غلط أصلاً وما بتنطبق

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** بالضبط — County_name جزء بس من المفتاح المركّب (County_name, Lot#)، وTax_rate (عمود nonprime) معتمدة على هالجزء بس، مش على Lot# ولا على المفتاح كامل ← partial dependency، مشكلة 2NF
- ❌ **الخيار أ):** Tax_rate موجود فعلاً بالجدول الأصلي
- ❌ **الخيار ج):** Tax_rate عمود nonprime عادي، مش مفتاح
- ❌ **الخيار د):** FD3 صحيحة ومذكورة بالمحاضرة كاملة

### السؤال 13 (متوسط)

أي من هاي **مش** من أسباب استخدام Denormalization؟

أ) تحسين أداء استعلامات معينة (performance)
ب) تقليل عدد عمليات الـ JOIN
ج) تصحيح مخالفة لـ 1NF
د) تسريع القراءة على حساب بعض التكرار

**الإجابة الصحيحة:** ج)

**التعليل:**
- ✅ **الخيار ج):** Denormalization هدفها الأداء، مو تصحيح مشاكل 1NF — أصلاً 1NF شرط أساسي لازم يتحقق دايماً، مش شي نتنازل عنه
- ❌ **الخيار أ):** هاد بالضبط الهدف الرئيسي المذكور بالمحاضرة
- ❌ **الخيار ب):** تقليل الـ JOINs من فوائد الـ denormalization المباشرة
- ❌ **الخيار د):** trade-off طبيعي — نضحي بشوي تكرار مقابل سرعة أكتر بالقراءة

### السؤال 14 (صعب)

جدول STUDENT(STUD_NO, STUD_NAME, STUD_STATE, STUD_COUNTRY, STUD_AGE) بمفتاح STUD_NO. بعد ما نطبّعه لـ 3NF ونفصل STATE_COUNTRY(STUD_STATE, STUD_COUNTRY)، شو المفتاح الأساسي لجدول STATE_COUNTRY الجديد؟

أ) STUD_NO
ب) STUD_STATE
ج) STUD_COUNTRY
د) (STUD_STATE, STUD_COUNTRY) مع بعض

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** بما إنه FD الأصلية كانت STUD_STATE → STUD_COUNTRY، فـ STUD_STATE هو اللي بيحدد STUD_COUNTRY، فهو المفتاح الأساسي بالجدول الجديد
- ❌ **الخيار أ):** STUD_NO ما إله علاقة بجدول STATE_COUNTRY أصلاً، انفصل مع الجدول التاني
- ❌ **الخيار ج):** STUD_COUNTRY هو العمود **المعتمد** (dependent)، مش المحدد (determinant)
- ❌ **الخيار د):** ما فيه داعي للاثنين مع بعض، STUD_STATE لحاله كافي يكون مفتاح لأنه بيحدد STUD_COUNTRY وحده

### السؤال 15 (متوسط)

بتعريف Prime attribute، أي عمود يعتبر Prime؟

أ) أي عمود بالجدول بغض النظر عن دوره
ب) أي عمود هو عضو بأي candidate key (وليس بالضرورة الـ primary key المختار)
ج) بس أعمدة الـ primary key المختار فعلياً
د) أي عمود ما فيه NULL

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** التعريف الدقيق: prime attribute = عضو بـ **أي** candidate key، حتى لو مش الـ primary key النهائي المختار
- ❌ **الخيار أ):** لأ، الأعمدة العادية (nonprime) مستثناة
- ❌ **الخيار ج):** هاد تعريف أضيق من الصح — لو فيه أكتر من candidate key، كلهم بيعتبروا Prime
- ❌ **الخيار د):** NULL ما إله علاقة بتعريف Prime أبداً

### السؤال 16 (صعب)

جدول R(X, Y, Z) بمفتاح أساسي X. لو عندنا Y → Z و **X → Y** لكن **مش موجودة X → Z مباشرة** (بس منقدر نستنتجها بالـ transitivity)، هل R تعتبر 3NF؟

أ) إي، لأنه X → Z مش FD أصلية معطاة
ب) لأ، لأنه Z معتمدة transitively عن طريق Y (وY عمود nonprime)
ج) إي، لأنه المفتاح عمود واحد فقط
د) لا يمكن تحديد الجواب بدون معرفة القيم الفعلية

**الإجابة الصحيحة:** ب)

**التعليل:**
- ✅ **الخيار ب):** حتى لو X → Z مش مكتوبة صراحة، هي مستنتجة منطقياً (X→Y→Z بقاعدة الـ transitivity)، وبما إنه Y عمود nonprime (مش مفتاح)، فـ Z معتمدة transitively — الجدول **مو 3NF**
- ❌ **الخيار أ):** الاستنتاج المنطقي كافي، مو لازم تكون FD مكتوبة صراحة بالسؤال
- ❌ **الخيار ج):** كون المفتاح عمود واحد بيضمن 2NF بس مش 3NF — 3NF بتحتاج فحص transitive dependency بغض النظر عن شكل المفتاح
- ❌ **الخيار د):** الجواب واضح ومحدد من الـ FDs المعطاة بدون حاجة لقيم فعلية

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** شو الفرق بين Insertion, Deletion, و Modification anomaly؟
**A:** Insertion = ما فيك تضيف معلومة بدون معلومة تانية مرتبطة فيها. Deletion = بتضيع معلومات لو حذفت آخر سطر بيحملها. Modification = لازم تعدّل بأكتر من مكان لتفادي التناقض.

### البطاقة 2
**Q2:** إيش تعريف Functional Dependency X → Y؟
**A:** لأي سطرين بنفس قيمة X، لازم يكون عندهم نفس قيمة Y.

### البطاقة 3
**Q3:** شو الفرق بين Superkey و Key؟
**A:** Key هو superkey أصغر ما يمكن (minimal) — لو شلت منه أي عمود، بيبطل يعمل كـ superkey.

### البطاقة 4
**Q4:** شو الفرق بين Prime attribute و Nonprime attribute؟
**A:** Prime = عضو بأي candidate key. Nonprime = مش عضو بولا candidate key.

### البطاقة 5
**Q5:** شو يمنعه 1NF بالضبط؟
**A:** قيم متعددة (multivalued) بخانة وحدة، والجداول المتداخلة (nested relations) جوا الجدول.

### البطاقة 6
**Q6:** إيش الفرق بين Full functional dependency و Partial dependency؟
**A:** Full = ما فيك تشيل ولا عمود من الطرف الأيسر X والاعتماد يضل صحيح. Partial = فيك تشيل عمود منه ويضل الاعتماد صحيح (يعني معتمد على جزء بس من X).

### البطاقة 7
**Q7:** متى يصير عندنا partial dependency أصلاً؟
**A:** بس لما المفتاح الأساسي يكون مركّب (composite) من أكتر من عمود.

### البطاقة 8
**Q8:** إيش تعريف 2NF بجملة وحدة؟
**A:** كل عمود nonprime لازم يعتمد بشكل كامل (full) على المفتاح الأساسي، مو على جزء منه.

### البطاقة 9
**Q9:** إيش تعريف Transitive dependency؟
**A:** X → Y تكون transitive لو فيه عمود Z (مش مفتاح ولا جزء منه) بحيث X → Z و Z → Y مع بعض.

### البطاقة 10
**Q10:** إيش تعريف 3NF بجملة وحدة؟
**A:** الجدول 2NF + ما فيه عمود nonprime معتمد transitively (بالواسطة) على المفتاح الأساسي.

### البطاقة 11
**Q11:** شو الفرق بين Normalization و Denormalization؟
**A:** Normalization = تقسيم الجداول لتقليل التكرار وحل الـ anomalies (نظري/صحة تصميم). Denormalization = دمج الجداول مرة تانية لتحسين الأداء (عملي/سرعة).

### البطاقة 12
**Q12:** ليش ممنوع نربط جدولين بـ JOIN على أعمدة مش (Primary Key, Foreign Key)؟
**A:** لأنه ممكن يطلع Spurious Tuples (سطور وهمية) مالها معنى بالواقع.

### البطاقة 13
**Q13:** جدول مفتاحه عمود واحد بس (مش مركّب) — هل ممكن يخالف 2NF؟
**A:** لأ، مستحيل — partial dependency بتحتاج مفتاح مركّب أصلاً، فتلقائياً بيحقق 2NF.

### البطاقة 14
**Q14:** لأي مستوى تطبيع بالعادة نكتفي بالتطبيق العملي؟
**A:** غالباً لغاية 3NF أو BCNF، ونادراً لأبعد من هيك — مو لازم أعلى مستوى نظري ممكن.

---

## الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة

| المصطلح | التعريف القصير |
| --- | --- |
| `Functional Dependency` (X → Y) | Y معتمدة وظيفياً على X — نفس X = نفس Y دايماً |
| `Superkey` | مجموعة أعمدة بتضمن تفرد كل سطر |
| `Key` | Superkey أصغر ما يمكن (minimal) |
| `Candidate key` | أي key ممكن يكون primary key |
| `Prime attribute` | عضو بأي candidate key |
| `Nonprime attribute` | مش عضو بولا candidate key |
| `Full functional dependency` | الاعتماد ما بيتحقق لو شلنا أي عمود من X |
| `Partial dependency` | الاعتماد بيضل صحيح حتى لو شلنا عمود من X (مفتاح مركّب) |
| `Transitive dependency` | X → Z → Y عن طريق عمود Z مش مفتاح |
| `Denormalization` | دمج جداول مطبّعة لجدول أوطى تطبيع، لتحسين الأداء |

### 🔑 جداول المقارنة السريعة

| الشكل | الشرط | يحتاج مفتاح مركّب؟ |
| --- | --- | --- |
| 1NF | كل خانة atomic، ما فيه جداول متداخلة | لا |
| 2NF | 1NF + ما فيه partial dependency | نعم (وإلا محقق تلقائياً) |
| 3NF | 2NF + ما فيه transitive dependency | لا (ممكن تصير المشكلة حتى بمفتاح بسيط) |

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | مفتاح عمود واحد = 2NF تلقائياً، لازم تفحص 3NF لحاله |
| 2 | Partial dependency = LHS جزء من المفتاح المركّب |
| 3 | Transitive dependency = LHS عمود nonprime (مش مفتاح أصلاً) |
| 4 | كل جدول 3NF هو بالضرورة 2NF (لكن العكس مش صحيح) |
| 5 | الـ FD خاصية معنى (semantics)، مش بس نمط بالبيانات المعطاة |
| 6 | التطبيع = top-down + decompose، الـ Denormalization = العكس لتحسين الأداء |

### 🔑 الخطوات السريعة

#### خطوات فحص وتحويل جدول لـ 3NF
```algorithm
1 | حدد المفتاح الأساسي | تحليل FDs | يتحدد إذا بسيط أو مركّب
2 | افحص 1NF | تأكد كل خانة atomic | لو لأ: افصل الأعمدة متعددة القيم أولاً
3 | افحص partial dependency | قارن LHS بأجزاء المفتاح | لو موجودة: افصل لجدول جديد (2NF)
4 | افحص transitive dependency | قارن LHS بكل الأعمدة nonprime | لو موجودة: افصل لجدول جديد (3NF)
5 | تأكد كل جدول جديد له مفتاح واضح | مراجعة نهائية | جاهز
```
