# المحاضرة 2 — نظرة عامة على DBMS (الجزء الثاني): النموذج العلائقي، الجبر العلائقي، وقيود التكامل
> **المادة:** قواعد البيانات (DBMS Overview) | **الموضوع:** Relational Model, Relational Algebra, Integrity Constraints

---

## الجزء الأول: ملخص شامل (لكل من تعب أو ما يركز)

### الفكرة الأساسية
هذه المحاضرة تراجع 3 أشياء أساسية بتبني عليها كل قواعد البيانات: **شكل البيانات** (`relational model`)، **طريقة تسأل عنها** (`relational algebra`)، و**القوانين اللي تحافظ عليها صحيحة** (`integrity constraints`).

### ليش يهمك؟
لأن أي جملة SQL تكتبها فعلياً بتتحول جوّا الـ DBMS لعمليات جبر علائقي، وأي جدول تصمّمه لازم يحترم قيود التكامل حتى ما تنكسر بياناتك. في الامتحان هذي أساس أي سؤال عن `select`, `join`, `foreign key`.

### إيش تحتاج تعرفه قبل البداية
ما فيه متطلبات ثقيلة — بس تحتاج تعرف إيش هو الجدول (`table`) والصف (`row`) والعمود (`column`) بشكل عام. هذي المحاضرة هي الأساس نفسه.

### اشرح الأفكار الرئيسية

**1) النموذج العلائقي (Relational Model)**

فكّر في `relation schema` مثل قالب فورم فاضي: `instructor = (ID, name, dept_name, salary)` هذا بس أسماء الأعمدة (`attributes`). لما تحط بيانات حقيقية جوّا هذا القالب، تصير عندك `relation instance` — يعني الجدول الفعلي بصفوفه. كل صف اسمه `tuple`.

كل عمود له مجموعة قيم مسموحة تسمى `domain` — مثلاً عمود `salary` ما يقبل إلا أرقام. وفيه قيمة خاصة اسمها `null` تعني "القيمة مو معروفة"، وموجودة افتراضياً في كل `domain`، بس هي كمان مصدر صداع لأنها تعقّد كثير من العمليات (مثل المقارنات والحسابات).

نقطة مهمة: **الجداول غير مرتبة** — يعني ترتيب الصفوف مو مهم، ممكن الـ DBMS يخزنها بأي ترتيب وتضل نفس البيانات. الفرق بين `database schema` و`database instance` هو نفس الفرق بين القالب والبيانات: الـ schema هو البنية المنطقية الثابتة، والـ instance هو "صورة" للبيانات في لحظة معينة.

أهم شي بالنموذج العلائقي هو المفاتيح (`keys`):
- **`superkey`**: أي مجموعة أعمدة تكفي لتحديد صف وحيد بالضبط. مثال: `{ID}` و `{ID, name}` كلهم `superkeys` لجدول `instructor`.
- **`candidate key`**: هو `superkey` بس بأقل عدد أعمدة ممكن (minimal) — يعني ما تقدر تشيل أي عمود منه وتضل تحدد الصف.
- **`primary key`**: هو الـ `candidate key` اللي تختاره أنت رسمياً ليكون المعرّف الرسمي للجدول.
- **`foreign key`**: عمود بجدول لازم قيمته توجد فعلاً بجدول ثاني. مثال: `dept_name` بجدول `instructor` لازم يكون موجود فعلاً بجدول `department` — هذا يربط الجدولين ببعض ويمنع بيانات وهمية.

**2) الجبر العلائقي (Relational Algebra)**

هو لغة إجرائية (`procedural language`) — يعني تحدد **كيف** توصل للنتيجة، خطوة بخطوة، عن طريق عمليات كل وحدة منها تاخذ جدول (أو جدولين) وتطلع جدول جديد. فيه 6 عمليات أساسية:

- **`select` (σ)**: يفلتر الصفوف حسب شرط. مثال: `σ dept_name="Physics" (instructor)` يطلع بس الأساتذة اللي بقسم الفيزياء. تقدر تركّب شروط بـ `∧` (و)، `∨` (أو)، `¬` (لا)، وتقارن حتى بين عمودين ببعض (مثل `dept_name = building`).
- **`project` (π)**: يفلتر الأعمدة، يعني يشيل أعمدة ما تحتاجها. مثال: `π ID,name,salary (instructor)` يشيل عمود `dept_name`. مهم: لأن الجدول "set" (مجموعة)، أي صفوف متكررة بعد الحذف تنحذف تلقائياً.
- ليش نجمع بين `select` و`project`؟ لأن نتيجة أي عملية جبر علائقي هي بحد ذاتها جدول، فتقدر تحط عملية جوّا عملية ثانية (composition) — مثل: `π name (σ dept_name="Physics" (instructor))` يطلع أسماء أساتذة الفيزياء بس.
- **`Cartesian product` (×)**: يدمج كل صف من جدول مع كل صف من جدول ثاني — يعني لو جدول أول فيه 5 صفوف وجدول ثاني فيه 3، النتيجة 15 صف. أغلب هذي الصفوف ما لها معنى منطقي (مثلاً أستاذ مربوط بمقرر ما درّسه).
- **`join` (⋈)**: هو `select` بعد `Cartesian product` بخطوة وحدة — يعني بس ياخذ الصفوف اللي فعلاً مترابطة منطقياً. `r ⋈θ s = σθ(r × s)`. هذا هو اللي فعلياً يستخدم بالعملي، مو الـ Cartesian product لحاله.
- **`union` (∪)**: يجمع صفوف جدولين ببعض، بشرط يكون لهم نفس عدد الأعمدة (`arity`) ونفس نوع البيانات لكل عمود (`compatible domains`).
- **`set-intersection` (∩)**: يطلع بس الصفوف المشتركة بين جدولين (بنفس الشروط اللي فوق).
- **`set-difference` (−)**: يطلع الصفوف الموجودة بجدول أول ومو موجودة بجدول ثاني.
- **`assignment` (←)**: يخزن نتيجة تعبير جبري بمتغير مؤقت، تماماً متل أي لغة برمجة، عشان تسهّل كتابة استعلامات معقدة على خطوات.
- **`rename` (ρ)**: يعطي اسم للنتيجة، لأن نتيجة أي عملية جبرية ما إلها اسم أصلاً تقدر ترجع تشير له.

**3) قيود التكامل (Integrity Constraints)**

القيد (`IC`) هو شرط لازم يضل صحيح بأي لحظة بالجدول. تتحدد وقت تصميم الـ schema، ويتفحصها الـ DBMS كل مرة يصير تعديل على البيانات. أي حالة تحترم كل القيود تسمى `legal instance`، والـ DBMS يمنع أي حالة مخالفة (`illegal instance`) من الأساس. هذا يحمينا من أخطاء إدخال البيانات ويخلي البيانات أقرب للواقع.

فيه أنواع قيود:
- **قيد المفتاح (`PRIMARY KEY`)**: يضمن ما يتكرر نفس المفتاح بجدولين صفوف مختلفة.
- **قيد الإحالة (`Referential Integrity` / `FOREIGN KEY`)**: يضمن أي قيمة بعمود مرجعي (زي `sid` بجدول `Enrolled`) لازم تكون موجودة فعلاً بالجدول المرجعي (`Students`).
- **قيد النطاق (`Domain Constraint`)**: يحدد نوع/نطاق القيمة المسموحة بالعمود من تعريف نوعه نفسه (مثل `INTEGER`, `CHAR(20)`).
- **قيود عامة (`General Constraints`)**: أي شرط ثاني ما يغطيه اللي فوق، بيتحقق عن طريق `CHECK`, `Triggers`, `Assertions`. مثال: `CHECK (rating >= 1 AND rating <= 10)`.

بالنسبة لـ `Referential Integrity`، لما تحاول تحذف صف من الجدول المرجعي (مثل حذف طالب من `Students`)، عندك 4 خيارات قياسية بـ SQL:
- **`NO ACTION`** (الافتراضي): يرفض عملية الحذف/التعديل كلياً.
- **`CASCADE`**: يحذف تلقائياً كل الصفوف المرتبطة بالجدول الثاني (`Enrolled`) معه.
- **`SET NULL`**: يخلي قيمة المفتاح الأجنبي بالصفوف المرتبطة = `null`.
- **`SET DEFAULT`**: يخلي قيمة المفتاح الأجنبي بالصفوف المرتبطة = قيمة افتراضية محددة مسبقاً.

### الأخطاء اللي كل الناس تقع فيها
- ❌ الفهم الخاطئ: "الـ `Cartesian product` والـ `join` نفس الشي".
  - ✅ الصحيح: الـ `Cartesian product` يدمج **كل** صف مع **كل** صف بدون أي شرط، أما الـ `join` يضيف شرط فوقه (`θ`) عشان ما يطلع إلا الصفوف اللي فعلاً مترابطة منطقياً.
- ❌ الفهم الخاطئ: "أي `superkey` هو `candidate key`".
  - ✅ الصحيح: `superkey` بس لازم يحدد الصف بشكل وحيد، أما `candidate key` لازم يكون **minimal** كمان — يعني ما تقدر تشيل عمود منه وتضل تحدد الصف.
- ❌ الفهم الخاطئ: "ترتيب الصفوف بالجدول له معنى".
  - ✅ الصحيح: الجداول غير مرتبة أصلاً (`unordered`)، فما تعتمد على ترتيب الصفوف بأي استعلام.

### إيش اللي بيطلع في الامتحان
غالباً بيسألونك تحول جملة وصفية (مثل "جيب أسماء أساتذة قسم الفيزياء") لتعبير جبر علائقي كامل باستخدام σ وπ، أو يعطونك جدولين ويطلبون منك تعمل `join` بينهم، أو يسألونك الفرق بين `superkey` و`candidate key` و`primary key`، أو يعطونك سيناريو حذف صف مرجعي ويسألونك شنو بيصير حسب `CASCADE` أو `NO ACTION`.

### الربط مع الموضوع اللي جاي بعده
كل هذا الأساس (الجبر العلائقي بالذات) هو اللي بيبنى عليه موضوع **Query Processing and Optimization** — يعني كيف الـ DBMS ياخذ جملة SQL ويحولها لشجرة جبر علائقي (`query tree`) ثم يحسّنها.

---

## الجزء الثاني: الشرح التفصيلي

### 1. النموذج العلائقي (Relational Model)

#### 1.1. Relation Schema and Relation Instance
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "none"} -->

##### 📍 أين نحن الآن؟
بداية مراجعة النموذج العلائقي — التعريف الأساسي لبنية الجدول.

##### 💡 الفكرة الأساسية
**`relation schema` هو تعريف بنية الجدول (أسماء الأعمدة)، و`relation instance` هو البيانات الفعلية داخله في لحظة معينة.**

##### 📖 الشرح
لو عندنا مجموعة أعمدة `A1, A2, …, An`، فإن `R = (A1, A2, …, An)` يسمى `relation schema`. مثال عملي: `instructor = (ID, name, dept_name, salary)` — هذا التعريف بس، بدون بيانات.

لما تحط بيانات فعلية داخل هذا التعريف، تحصل على `relation instance` يرمز له بـ `r(R)`. الشكل الحالي للبيانات يمثَّل بجدول (`table`)، وكل صف بهذا الجدول يسمى `tuple` (عنصر من `r`).

##### 🎯 الملخص السريع
- `R` = تعريف الأعمدة فقط (schema)
- `r(R)` = البيانات الفعلية (instance)
- `tuple` = صف واحد من الجدول

##### 📚 التطبيق
هذا التمييز بين الـ schema والـ instance يستخدم لاحقاً في تعريف `database schema` مقابل `database instance` على مستوى قاعدة البيانات كاملة.

##### ⚠️ أخطاء شائعة
- ❌ الخلط بين `schema` و`instance` واعتبارهم نفس الشي
- ✅ `schema` ثابت نسبياً، أما `instance` يتغير كل ما تتغير البيانات

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A1, A2, …, An are attributes. R = (A1, A2, …, An) is a relation schema. Example: instructor = (ID, name, dept_name, salary). A relation instance r defined over relation schema R is denoted by r(R). The current values a relation are specified by a table. An element t of relation r is called a tuple and is represented by a row.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف + المثال + العلاقة بين schema وinstance وtuple
</details>

---

#### 1.2. الخصائص (Attributes) والنطاق (Domain)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1"} -->

##### 📍 أين نحن الآن؟
بعد ما عرفنا شكل الجدول، نشوف إيش القيود على قيم كل عمود.

##### ⬅️ الربط مع السابق
كل `attribute` بالـ `relation schema` له مجموعة قيم مسموحة.

##### 💡 الفكرة الأساسية
**كل عمود له `domain` يحدد القيم المسموحة، وهذي القيم لازم تكون ذرية (indivisible)، وفيه قيمة خاصة `null` تعني "غير معروف".**

##### 📖 الشرح
`domain` هي مجموعة كل القيم المسموحة لعمود معين — مثلاً عمود `salary` نطاقه أرقام موجبة. تشترط عادة القيم تكون **atomic** يعني ذرية/غير قابلة للتجزئة، فما تحط مثلاً قائمة كاملة داخل خانة واحدة.

`null` قيمة خاصة موجودة ضمنياً بكل `domain`، وتدل إن القيمة "غير معروفة". المشكلة إن `null` يعقّد كثير من العمليات — مثل: لو قارنت `salary > 90000` وين قيمة `salary` تساوي `null`، الناتج مو واضح (لا true ولا false بشكل مباشر).

##### 🎯 الملخص السريع
- `domain` = مجموعة القيم المسموحة لعمود
- القيم لازم تكون atomic
- `null` = قيمة خاصة تعني "غير معروف"، موجودة بكل domain

##### ⚠️ أخطاء شائعة
- ❌ اعتبار `null` يساوي صفر أو نص فاضي
- ✅ `null` تعني "غير معروف/غير موجود"، مختلفة تماماً عن القيمة صفر

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The set of allowed values for each attribute is called the domain of the attribute. Attribute values are (normally) required to be atomic; that is, indivisible. The special value null is a member of every domain, indicates that the value is "unknown". The null value causes complications in the definition of many operations.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 1.3. الجداول غير مرتبة (Relations are Unordered)
<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.2"} -->

##### 📍 أين نحن الآن؟
خاصية مهمة عن شكل تخزين الجدول.

##### 💡 الفكرة الأساسية
**ترتيب الصفوف (`tuples`) داخل الجدول غير مهم إطلاقاً — يمكن تخزينها بأي ترتيب وتضل نفس البيانات منطقياً.**

##### 📊 المخطط
| ID | name | dept_name | salary |
| --- | --- | --- | --- |
| 22222 | Einstein | Physics | 95000 |
| 12121 | Wu | Finance | 90000 |
| 32343 | El Said | History | 60000 |
| 45565 | Katz | Comp. Sci. | 75000 |

اقرأ الجدول كالتالي: هذا هو جدول `instructor` نفسه، بس بترتيب عشوائي للصفوف — لو بدلت ترتيب الصفوف، الجدول يبقى يمثل **نفس المعلومة** تماماً.

##### 📖 الشرح
بما إن الجدول العلائقي هو تمثيل رياضي لـ **مجموعة** (`set`) من الـ `tuples`، فمفهوم "المجموعة" أصلاً ما فيه ترتيب. فلا تفترض أبداً إن الصف الأول بالجدول له أهمية أكبر أو أسبقية معينة.

##### 🎯 الملخص السريع
- الجدول = مجموعة (set) من الصفوف
- لا يوجد ترتيب ضمني للصفوف
- الـ DBMS حر يخزن الصفوف بأي ترتيب فيزيائي

##### ⚠️ أخطاء شائعة
- ❌ افتراض إن أول صف بالنتيجة هو "الأهم" أو "الأول اللي انضاف"
- ✅ لازم تستخدم `ORDER BY` (بالـ SQL) صراحة لو تحتاج ترتيب معين

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Order of tuples is irrelevant (tuples may be stored in an arbitrary order). Example: instructor relation with unordered tuples.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل، مع الجدول التوضيحي من المحاضرة
</details>

---

#### 1.4. Database Schema مقابل Database Instance
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.1"} -->

##### 💡 الفكرة الأساسية
**`database schema` هو البنية المنطقية الثابتة لكل قاعدة البيانات، و`database instance` هو صورة (snapshot) للبيانات الفعلية بلحظة معينة.**

##### 📖 الشرح
هذا نفس مفهوم الفقرة 1.1 بس على مستوى قاعدة البيانات كاملة (مو جدول واحد بس). مثال: الـ schema هو `instructor(ID, name, dept_name, salary)`، والـ instance هو الجدول اللي شفناه بالفقرة 1.3.

##### 🎯 الملخص السريع
- Database schema = التصميم/البنية (ثابت)
- Database instance = البيانات الحالية (يتغير مع الوقت)

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Database schema -- is the logical structure of the database. Database instance -- is a snapshot of the data in the database at a given instant. Example: schema: instructor (ID, name, dept_name, salary), Instance: previous slide.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 1.5. المفاتيح (Keys)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.4"} -->

##### 📍 أين نحن الآن؟
أهم مفهوم بالنموذج العلائقي — كيف نحدد صف بشكل وحيد.

##### 💡 الفكرة الأساسية
**`superkey` يحدد الصف بشكل وحيد، `candidate key` هو أصغر `superkey` ممكن، و`primary key` هو الـ `candidate key` المختار رسمياً.**

##### 📖 الشرح
مجموعة أعمدة `K` تسمى `superkey` لجدول `R` إذا كانت قيمها تكفي لتحديد صف وحيد بالضبط بأي `instance` ممكنة لـ `r(R)`. مثال: `{ID}` و`{ID, name}` كلاهما `superkeys` لجدول `instructor`، لأن `ID` وحده يكفي أصلاً.

بما إن `{ID, name}` فيه عمود زايد (`name`) ما تحتاجه فعلاً للتحديد، فهو `superkey` بس مو `candidate key`. الـ `candidate key` لازم يكون **minimal** — يعني `{ID}` هو `candidate key` لأنه ما تقدر تشيل منه أي عمود (ما فيه أعمدة أصلاً غير `ID`) وتضل تحدد الصف.

لما يكون عندك أكثر من `candidate key` واحد، تختار واحد منهم يصير `primary key` رسمياً للجدول — والاختيار عادة يعتمد على أيهم أكثر استقراراً وأقل عرضة للتغيير.

##### 🎯 الملخص السريع
- superkey: يحدد الصف (ممكن فيه زيادة)
- candidate key: superkey minimal (بدون زيادة)
- primary key: candidate key واحد مختار رسمياً

##### 📚 التطبيق
اختيار `primary key` مهم جداً لاحقاً بتصميم `foreign key` وقيود `referential integrity`.

##### ⚠️ أخطاء شائعة
- ❌ الاعتقاد إن الجدول لازم يكون له `candidate key` واحد بس
- ✅ ممكن يكون فيه أكثر من `candidate key`، وأنت تختار واحد منهم يصير `primary key`

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Let K ⊆ R. K is a superkey of R if values for K are sufficient to identify a unique tuple of each possible relation r(R). Example: {ID} and {ID,name} are both superkeys of instructor. Superkey K is a candidate key if K is minimal. Example: {ID} is a candidate key for Instructor. One of the candidate keys is selected to be the primary key.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 1.6. المفتاح الأجنبي (Foreign Key)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.5"} -->

##### 💡 الفكرة الأساسية
**`foreign key` هو عمود بجدول (`referencing relation`) لازم قيمته توجد فعلاً بجدول ثاني (`referenced relation`).**

##### 📖 الشرح
مثال: `dept_name` بجدول `instructor` هو `foreign key` يشير إلى جدول `department`. هذا يعني ما تقدر تحط اسم قسم بجدول `instructor` إلا إذا كان هذا القسم فعلاً موجود بجدول `department` — وهذا هو أساس الربط المنطقي بين الجداول.

##### 🎯 الملخص السريع
- Referencing relation: الجدول اللي فيه الـ foreign key (instructor)
- Referenced relation: الجدول المرجعي (department)
- الشرط: أي قيمة foreign key لازم تطابق قيمة موجودة فعلاً بالجدول المرجعي

##### 📚 التطبيق
هذا المفهوم يتوسع لاحقاً بقسم `Integrity Constraints – Referential Integrity`.

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Foreign key constraint: Value in one relation must appear in another. Referencing relation, Referenced relation. Example: dept_name in instructor is a foreign key from instructor referencing department.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

### 2. الجبر العلائقي (Relational Algebra)

#### 2.1. نظرة عامة: العمليات الستة الأساسية
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1.6"} -->

##### 📍 أين نحن الآن؟
انتقلنا من "شكل البيانات" إلى "كيف نستعلم عنها".

##### 💡 الفكرة الأساسية
**الجبر العلائقي لغة إجرائية مكونة من 6 عمليات أساسية، كل عملية تاخذ جدول أو أكثر وتطلع جدول جديد كنتيجة.**

##### 📖 الشرح
الجبر العلائقي (`relational algebra`) هو مجموعة عمليات (`operations`) تاخذ جدول واحد أو أكثر كمدخلات وتنتج جدول جديد كمخرج. العمليات الستة الأساسية هي: `select` (σ)، `project` (π)، `union` (∪)، `set difference` (−)، `Cartesian product` (×)، و`rename` (ρ). كل العمليات الثانية (مثل `join` و`intersection`) ممكن تشتق منها.

##### 🎯 الملخص السريع
- لغة procedural (تحدد الخطوات)
- المدخل والمخرج دايماً جدول (relation)
- 6 عمليات أساسية تبنى منها كل الاستعلامات

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A procedural language consisting of a set of operations that take one or more relations as input and produce a new relation as their result. Six basic operators: select, project, union, set difference, Cartesian product, rename.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.2. عملية Select (σ)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.1"} -->

##### 💡 الفكرة الأساسية
**`select` (σ) يفلتر الصفوف اللي تحقق شرط معين، بدون ما يغيّر الأعمدة.**

##### 📖 الشرح
الصيغة: `σp(r)` حيث `p` هو شرط الاختيار (`selection predicate`). مثال: `σ dept_name="Physics" (instructor)` يطلع بس صفوف أساتذة قسم الفيزياء.

يمكن استخدام مقارنات `=, ≠, >, ≥, <, ≤` بالشرط، وتركيب عدة شروط ببعض عن طريق `∧` (و)، `∨` (أو)، `¬` (لا). مثال: `σ dept_name="Physics" ∧ salary>90000 (instructor)` يجيب أساتذة الفيزياء براتب أكبر من 90000.

كمان ممكن الشرط يقارن بين عمودين ببعض مباشرة، مثل: `σ dept_name=building (department)` يجيب الأقسام اللي اسمها نفس اسم المبنى.

##### 🎯 الملخص السريع
- σ يفلتر صفوف (rows) فقط
- الشرط يقدر يكون بسيط أو مركّب (∧ ∨ ¬)
- ممكن تقارن بين عمودين ببعض

##### 📚 التطبيق
`select` هو أساس شرط `WHERE` بجملة SQL.

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The select operation selects tuples that satisfy a given predicate. Notation: σp(r). p is called the selection predicate. Example: dept_name="Physics" (instructor). We allow comparisons using =, ≠, >, ≥. <, ≤ in the selection predicate. We can combine several predicates into a larger predicate by using the connectives ∧ (and), ∨ (or), ¬(not). The select predicate may include comparisons between two attributes. Example: dept_name=building (department).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.3. عملية Project (π)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.2"} -->

##### 💡 الفكرة الأساسية
**`project` (π) يفلتر الأعمدة (يختار أعمدة محددة ويحذف الباقي)، ويحذف أي صفوف متكررة تنتج عن الحذف.**

##### 📖 الشرح
الصيغة: `πA1,A2,…,Ak(r)` حيث `A1…Ak` أسماء الأعمدة المطلوبة. النتيجة جدول بعدد أعمدة `k` بس، وكل الأعمدة غير المذكورة تُحذف. مثال: `πID,name,salary(instructor)` يحذف عمود `dept_name`.

نقطة مهمة: بما إن الجدول هو `set` (مجموعة)، فأي صفوف تتكرر بعد حذف الأعمدة يتم إزالة التكرار تلقائياً من النتيجة.

##### 🎯 الملخص السريع
- π يفلتر أعمدة (columns) فقط
- النتيجة عدد أعمدتها = k
- التكرار ينحذف تلقائياً (set semantics)

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A unary operation that returns its argument relation, with certain attributes left out. Notation: A1,A2,A3….Ak(r). The result is defined as the relation of k columns obtained by erasing the columns that are not listed. Duplicate rows removed from result, since relations are sets. Example: ID, name, salary (instructor).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.4. تركيب العمليات (Composition)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.3"} -->

##### 💡 الفكرة الأساسية
**بما إن نتيجة أي عملية جبرية هي جدول، تقدر تحط عملية جوّا عملية ثانية وتبني استعلامات معقدة من عمليات بسيطة.**

##### 📖 الشرح
مثال: بدل ما تعطي اسم جدول موجود كمدخل لـ `project`، تقدر تعطيه تعبير كامل يطلع جدول. الاستعلام "جيب أسماء أساتذة قسم الفيزياء" يكتب: `πname(σdept_name="Physics"(instructor))` — هنا الـ `project` ياخذ نتيجة الـ `select` كمدخل له مباشرة.

##### 🎯 الملخص السريع
- أي عملية جبرية تنتج جدول
- الجدول الناتج ممكن يكون مدخل لعملية ثانية
- هذا يسمح ببناء استعلامات معقدة من خطوات بسيطة

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The result of a relational-algebra operation is relation and therefore relational algebra operations can be composed together into a relational-algebra expression. Consider the query -- Find the names of all instructors in the Physics department: name(dept_name="Physics"(instructor)). Instead of giving the name of a relation as the argument of the projection operation, we give an expression that evaluates to a relation.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.5. Cartesian Product (×)
<!-- @render: {type: "diagram-first", visualization: "table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.4"} -->

##### 💡 الفكرة الأساسية
**`Cartesian product` (×) يدمج كل صف من جدول مع كل صف من جدول ثاني، بدون أي شرط تصفية.**

##### 📊 المخطط
مثال من المحاضرة: `instructor × teaches` — بعض النتائج:

| instructor.ID | name | dept_name | salary | teaches.ID | course_id | sec_id | semester | year |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 10101 | Srinivasan | Comp. Sci. | 65000 | 10101 | CS-101 | 1 | Fall | 2017 |
| 10101 | Srinivasan | Comp. Sci. | 65000 | 12121 | FIN-201 | 1 | Spring | 2018 |
| 22222 | Einstein | Physics | 95000 | 10101 | CS-101 | 1 | Fall | 2017 |

اقرأ الجدول كالتالي: كل صف من `instructor` انضم لكل صف من `teaches` — لاحظ صف "Einstein" مربوط بمقرر "CS-101" رغم إن Einstein ما درّسه فعلياً؛ هذا هو الخلل اللي نحتاج نصلحه بـ `join`.

##### 📖 الشرح
النتيجة تحتوي كل الأزواج الممكنة بين صفوف الجدولين. بما إن عمود `ID` موجود بكل الجدولين، يتم تمييز الأعمدة بإضافة اسم الجدول الأصلي قبلها (`instructor.ID` و`teaches.ID`) لتفادي التعارض بالأسماء.

المشكلة: أغلب صفوف النتيجة ما لها معنى منطقي — لأنها تربط أستاذ بمقرر ما درّسه فعلياً.

##### 🎯 الملخص السريع
- كل صف × كل صف = كل التركيبات الممكنة
- الأعمدة المشتركة بالاسم يُميَّزها باسم الجدول الأصلي
- أغلب النتائج غير منطقية بدون شرط تصفية

##### ⚠️ أخطاء شائعة
- ❌ استخدام `Cartesian product` وحده بدون شرط ربط
- ✅ لازم تتبعه بـ `select` أو تستخدم `join` مباشرة

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The Cartesian-product operation allows us to combine information from any two relations. Example: instructor X teaches. We construct a tuple of the result out of each possible pair of tuples from instructor and teaches. Since the instructor ID appears in both relations, we distinguish attributes by attaching to the attribute the name of the relation from which it originally came: instructor.ID teaches.ID.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل، مع جدول توضيحي مختصر
</details>

---

#### 2.6. عملية Join (⋈)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.5"} -->

##### 📍 أين نحن الآن؟
حل مشكلة الـ `Cartesian product` غير المنطقي.

##### ⬅️ الربط مع السابق
بعد ما شفنا إن `Cartesian product` يطلع صفوف كثيرة عشوائية، نحتاج طريقة نصفّي منها الصفوف المفيدة فقط.

##### 💡 الفكرة الأساسية
**`join` (⋈) هو `select` مطبق مباشرة فوق `Cartesian product` بخطوة وحدة، عشان ياخذ بس الصفوف المترابطة منطقياً.**

##### 📖 الشرح
لأخذ الصفوف من `instructor × teaches` اللي فعلاً تخص أساتذة ومقرراتهم الحقيقية، نكتب: `σinstructor.id=teaches.id(instructor × teaches)`. هذا التعبير نفسه يمكن كتابته أبسط باستخدام `join`: `instructor ⋈instructor.id=teaches.id teaches`.

بشكل عام، لعلاقتين `r(R)` و`s(S)` وشرط `θ` على أعمدة `R∪S`، فإن: `r ⋈θ s = σθ(r × s)`. يعني الـ `join` اختصار مباشر لـ "Cartesian product ثم select".

##### 🎯 الملخص السريع
- join = select فوق Cartesian product
- الصيغة: r ⋈θ s = σθ(r × s)
- يستخدم عملياً بدل Cartesian product المباشر

##### 📚 التطبيق
هذا هو أساس عملية `JOIN` بجملة SQL (`INNER JOIN` تحديداً).

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The Cartesian-Product instructor X teaches associates every tuple of instructor with every tuple of teaches. Most of the resulting rows have information about instructors who don't teach a particular course. To get only those tuples of "instructor X teaches" that pertain to instructors and the courses that they taught, we write: σinstructor.id=teaches.id(instructor x teaches). The join operation allows us to combine a select operation and a Cartesian-Product operation into a single operation. Consider relations r(R) and s(S). Let "theta" be a predicate on attributes in the schema R "union" S. The theta join r ⋈θ s is defined as: r ⋈θ s = σθ(r × s). Thus: σinstructor.id=teaches.id(instructor x teaches) can equivalently be written as instructor ⋈Instructor.id=teaches.id teaches.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.7. عملية Union (∪)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.6"} -->

##### 💡 الفكرة الأساسية
**`union` (∪) يجمع صفوف جدولين ببعض، بشرط يكون لهم نفس عدد الأعمدة ونفس نوع البيانات المتوافق.**

##### 📖 الشرح
عشان `r ∪ s` يكون صحيح، لازم يتحقق شرطان: (1) `r` و`s` لهم نفس الـ `arity` (نفس عدد الأعمدة)، و(2) الأعمدة المتقابلة متوافقة بالنوع (`compatible domains`) — يعني مثلاً العمود الثاني بـ `r` نفس نوع بيانات العمود الثاني بـ `s`.

مثال: لإيجاد كل المقررات اللي درّست بفصل Fall 2017، أو Spring 2018، أو كليهما: `πcourse_id(σsemester="Fall"∧year=2017(section)) ∪ πcourse_id(σsemester="Spring"∧year=2018(section))`.

##### 🎯 الملخص السريع
- شرطان: نفس arity + domains متوافقة
- النتيجة = دمج صفوف الجدولين بدون تكرار (set union)

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The union operation allows us to combine two relations - Notation: r∪s. For r∪s to be valid: 1. r, s must have the same arity (same number of attributes). 2. The attribute domains must be compatible. Example: to find all courses taught in the Fall 2017 semester, or in the Spring 2018 semester, or in both: course_id(semester="Fall" ∧ year=2017(section)) ∪ course_id(semester="Spring" ∧ year=2018(section)).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.8. Set-Intersection (∩)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.7"} -->

##### 💡 الفكرة الأساسية
**`set-intersection` (∩) يطلع بس الصفوف المشتركة بين جدولين متوافقين.**

##### 📖 الشرح
بنفس شروط `union` (نفس arity، domains متوافقة)، النتيجة هنا هي الصفوف الموجودة **بكلا** الجدولين معاً. مثال: إيجاد المقررات اللي درّست بفصل Fall 2017 **و** Spring 2018 بنفس الوقت: `πcourse_id(σsemester="Fall"∧year=2017(section)) ∩ πcourse_id(σsemester="Spring"∧year=2018(section))`.

##### 🎯 الملخص السريع
- نفس شروط union (arity + domains)
- النتيجة = الصفوف المشتركة فقط بين الجدولين

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The set-intersection operation allows us to find tuples that are in both the input relations. Notation: r∩s. Assume: r, s have the same arity, attributes of r and s are compatible. Example: Find the set of all courses taught in both the Fall 2017 and the Spring 2018 semesters.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.9. Set-Difference (−)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.8"} -->

##### 💡 الفكرة الأساسية
**`set-difference` (−) يطلع الصفوف الموجودة بجدول أول ومو موجودة بجدول ثاني.**

##### 📖 الشرح
بنفس شروط الـ arity والـ domains، `r − s` تعطي الصفوف الموجودة بـ `r` بس مو بـ `s`. مثال: المقررات المدرّسة بفصل Fall 2017 بس **مو** بفصل Spring 2018: `πcourse_id(σsemester="Fall"∧year=2017(section)) − πcourse_id(σsemester="Spring"∧year=2018(section))`.

##### 🎯 الملخص السريع
- نفس شروط union/intersection
- النتيجة = صفوف r بدون الصفوف المشتركة مع s

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The set-difference operation allows us to find tuples that are in one relation but are not in another. Notation r–s. Set differences must be taken between compatible relations: r and s must have the same arity, attribute domains of r and s must be compatible. Example: to find all courses taught in the Fall 2017 semester, but not in the Spring 2018 semester.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.10. عملية Assignment (←)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.9"} -->

##### 💡 الفكرة الأساسية
**`assignment` يخزن نتيجة تعبير جبري بمتغير مؤقت، عشان تكتب استعلامات معقدة على خطوات واضحة.**

##### 📖 الشرح
الرمز `←` يستخدم لتخزين نتيجة تعبير بمتغير مؤقت، تماماً متل المتغيرات بأي لغة برمجة. مثال: لإيجاد كل الأساتذة بقسمي Physics وMusic معاً: `Physics ← σdept_name="Physics"(instructor)`، `Music ← σdept_name="Music"(instructor)`، ثم `Physics ∪ Music`.

##### 🎯 الملخص السريع
- ← يخزن نتيجة مؤقتة بمتغير
- يسهّل تفكيك استعلام معقد لخطوات بسيطة

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> It is convenient at times to write a relational-algebra expression by assigning parts of it to temporary relation variables. The assignment operation is denoted by ← and works like assignment in a programming language. Example: Find all instructor in the "Physics" and Music department. Physics ← σdept_name="Physics"(instructor). Music ← σdept_name="Music"(instructor). Physics ∪ Music.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 2.11. عملية Rename (ρ)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.10"} -->

##### 💡 الفكرة الأساسية
**`rename` (ρ) يعطي اسم لنتيجة أي تعبير جبري، عشان تقدر تشير له لاحقاً.**

##### 📖 الشرح
نتيجة أي تعبير جبري ما إلها اسم أصلاً. `ρx(E)` يعيد نتيجة التعبير `E` تحت اسم `x`. فيه صيغة ثانية `ρx(A1,A2,…An)(E)` تسمح لك كمان تعيد تسمية الأعمدة نفسها بنفس الوقت.

##### 🎯 الملخص السريع
- ρx(E): تسمية النتيجة باسم x
- ρx(A1,…,An)(E): تسمية النتيجة + الأعمدة معاً

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The results of relational-algebra expressions do not have a name that we can use to refer to them. The rename operator, ρ, is provided for that purpose. The expression: ρx(E) returns the result of expression E under the name x. Another form of the rename operation: ρx(A1,A2,.. An)(E).

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

### 3. قيود التكامل (Integrity Constraints)

#### 3.1. التعريف الأساسي
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2.11"} -->

##### 📍 أين نحن الآن؟
انتقلنا من "كيف نستعلم" إلى "كيف نضمن صحة البيانات".

##### 💡 الفكرة الأساسية
**القيود (`ICs`) تدعم وصف أدق للواقع عن طريق العلاقات، وتُفحص من الـ DBMS كل مرة تتعدل البيانات، فما يسمح لأي حالة غير صحيحة تدخل.**

##### 📖 الشرح
قيود التكامل تجعل تمثيل البيانات أقرب للواقع الحقيقي عن طريق التعبير عن علاقات منطقية بين الجداول. بعضها كمان يسرّع الوصول للبيانات، مثل قيد المفتاح (`key constraint`) وقيد الإحالة (`referential integrity`).

بشكل عام، `IC` هو شرط لازم يظل صحيح بأي `instance` للجدول. تُحدد الـ `ICs` وقت تعريف الـ `schema`، وتُفحص كل ما تُعدَّل الجداول. أي `instance` تحقق كل الـ `ICs` تسمى **legal instance**، والـ DBMS ما يفترض يسمح بأي `illegal instance` من الأساس. هذا يخلي البيانات المخزنة أقرب لمعنى الواقع، وكمان يمنع أخطاء إدخال البيانات (`data entry errors`).

##### 🎯 الملخص السريع
- IC = شرط يجب أن يظل صحيح دايماً
- يُفحص عند كل تعديل بالبيانات
- Legal instance = تحقق كل القيود / Illegal instance = ممنوعة

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Constraints support a better description of the real-world using entities and relationships. Some constraints support a better and faster access to data, such as key constraints and referential integrity. IC: condition that must be true for any instance of the database. ICs are specified when schema is defined. ICs are checked when relations are modified. A legal instance of a relation is one that satisfies all specified ICs. DBMS should not allow illegal instances. If the DBMS checks ICs, stored data is more faithful to real-world meaning. Avoids data entry errors, too!

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 3.2. قيد المفاتيح (Keys)
<!-- @render: {type: "diagram-first", visualization: "code", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.1"} -->

##### 💡 الفكرة الأساسية
**قيد `PRIMARY KEY` بـ SQL يمنع تكرار نفس قيمة المفتاح بأكثر من صف بالجدول.**

##### 💻 الكود: تعريف Primary Key بجدول Enrolled
```sql
-- Define table Enrolled with a composite primary key
CREATE TABLE Enrolled
  (sid CHAR(20),
   cid CHAR(20),
   grade CHAR(2),
   PRIMARY KEY (sid, cid))
```

##### 📖 الشرح
هذا مثال عملي على قيد المفتاح بلغة SQL — العمودين `sid` و`cid` معاً يشكّلون `PRIMARY KEY`، يعني الـ DBMS يرفض تلقائياً أي محاولة إدخال صف يكرر نفس تركيبة `(sid, cid)` الموجودة مسبقاً.

##### 🎯 الملخص السريع
- PRIMARY KEY يمكن يكون عمود واحد أو أكثر (composite key)
- الـ DBMS يرفض تلقائياً أي تكرار للمفتاح

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> [مثال SQL من الشريحة]: CREATE TABLE Enrolled (sid CHAR(20) cid CHAR(20), grade CHAR(2), PRIMARY KEY (sid,cid))

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل، الشريحة بالمحاضرة عرضت الكود فقط بدون نص شارح إضافي
</details>

---

#### 3.3. قيد الإحالة (Referential Integrity)
<!-- @render: {type: "diagram-first", visualization: "code", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.2"} -->

##### 📍 أين نحن الآن؟
كيف نربط جدولين ببعض ونضمن الترابط يظل صحيح.

##### 💡 الفكرة الأساسية
**قيد الإحالة (`referential integrity`) يضمن إن أي قيمة بعمود مرجعي (`foreign key`) لازم تشير لصف موجود فعلاً بالجدول المرجعي (`referenced entity`).**

##### 📊 المخطط
```
FOREIGN KEY (sid) REFERENCES Students
```

جدول `Enrolled` (sid, cid, grade) — عمود `sid` هو foreign key يشير لجدول `Students` (sid, name, login, age, gpa). كل قيمة `sid` بجدول `Enrolled` لازم تطابق قيمة `sid` موجودة فعلاً بجدول `Students`.

##### 📖 الشرح
لو نحتاج بالضبط قيمة وحيدة صحيحة بسياق معين (يعني أي `sid` بجدول `Enrolled` لازم يطابق طالب حقيقي)، فإن الـ DBMS مسؤول يحافظ على هذا الشرط. عنده خياران أساسيان لو حاولنا نحذف الطالب المرجعي:
1. **يمنع** حذف الصف المرجعي (`referenced entity`) طالما فيه صفوف ثانية تشير له.
2. أو **يحذف تلقائياً** كل الصفوف المرتبطة (المشيرة) بمجرد حذف الصف المرجعي.

##### 🎯 الملخص السريع
- Foreign key لازم يطابق قيمة موجودة بالجدول المرجعي
- خياران عند الحذف: منع الحذف أو حذف الصفوف المرتبطة تلقائياً

##### ⚠️ أخطاء شائعة
- ❌ الاعتقاد إن الـ DBMS يقبل أي قيمة foreign key تلقائياً
- ✅ الـ DBMS يرفض أي قيمة foreign key ما تطابق صف موجود بالجدول المرجعي

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> If we need exactly one value in a given context, DBMS must take care that such a constraint remains fulfilled. Forbid deletion of a referenced entity. Or, delete all referencing entities as well if a referenced entity is deleted. [مع مثال CREATE TABLE Enrolled ... FOREIGN KEY (sid) REFERENCES Students وجدولي Enrolled وStudents كأمثلة توضيحية]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 3.4. قيود النطاق (Domain Constraints)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.3"} -->

##### 💡 الفكرة الأساسية
**قيد النطاق (`domain constraint`) يقيّد قيم العمود ضمن مجموعة محددة، عادة عن طريق تعريف نوع العمود نفسه.**

##### 📖 الشرح
هذا أبسط أنواع القيود — بمجرد ما تعرّف عمود بنوع معين (مثل `INTEGER`, `CHAR(20)`, `REAL`)، أنت فعلياً حددت نطاق القيم المسموحة له، والـ DBMS يرفض تلقائياً أي قيمة برا هذا النطاق (مثل حرف بمكان رقم).

##### 🎯 الملخص السريع
- يُعرّف عن طريق نوع بيانات العمود
- أبسط شكل من قيود التكامل

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Restrict the value of an attribute to be in a limited set, e.g., by declaring the attribute type.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 3.5. القيود العامة (General Constraints)
<!-- @render: {type: "diagram-first", visualization: "code", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.4"} -->

##### 💡 الفكرة الأساسية
**أي قيد ما تغطيه المفاتيح أو الإحالة أو النطاق، يُفرض باستخدام آليات مثل `CHECK`, `Triggers`, `Assertions`.**

##### 💻 الكود: قيد CHECK بجدول Sailors
```sql
-- Restrict rating to a valid range using CHECK constraint
CREATE TABLE Sailors
  (sid INTEGER,
   sname CHAR(10),
   rating INTEGER,
   age REAL,
   PRIMARY KEY (sid),
   CHECK (rating >= 1
          AND rating <= 10))
```

##### 📖 الشرح
هذا مثال عملي: `CHECK (rating >= 1 AND rating <= 10)` يضمن إن عمود `rating` ما يقبل إلا قيم بين 1 و10 — وهذا شرط ما يقدر قيد النطاق العادي (نوع البيانات) يعبّر عنه لحاله، فنحتاج `CHECK` صراحة.

##### 🎯 الملخص السريع
- CHECK: شرط منطقي على عمود أو أكثر
- Triggers/Assertions: آليات أقوى لقيود أعقد

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> All others by using some mechanisms such as Triggers, Assertions and others. [مع مثال CREATE TABLE Sailors ... CHECK (rating >= 1 AND rating <= 10)]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 3.6. تطبيق قيد الإحالة عند الحذف والتعديل
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.5"} -->

##### 📍 أين نحن الآن؟
شنو بالضبط بيصير لو حاولنا نحذف أو نعدّل صف مرجعي.

##### 💡 الفكرة الأساسية
**عند حذف/تعديل صف بالجدول المرجعي، فيه 4 خيارات ممكنة يحددها المصمم: رفض العملية، حذف تلقائي، أو تعيين قيمة null/افتراضية.**

##### 📖 الشرح
بمثال `Students` و`Enrolled` (حيث `sid` بـ `Enrolled` هو foreign key يشير لـ `Students`):

- لو حاولنا نضيف صف بـ `Enrolled` بقيمة `sid` غير موجودة بـ `Students` أصلاً → يُرفض مباشرة.
- لو حاولنا نحذف صف طالب من `Students` موجود له صفوف مرتبطة بـ `Enrolled`، عندنا 4 خيارات:
  1. **نحذف تلقائياً** كل صفوف `Enrolled` المرتبطة به.
  2. **نمنع** حذف صف `Students` طالما فيه صفوف تشير له.
  3. **نضع قيمة افتراضية** (default) لعمود `sid` بصفوف `Enrolled` المرتبطة.
  4. **نضع `null`** بعمود `sid` بصفوف `Enrolled` المرتبطة، تعني "غير معروف/غير قابل للتطبيق".

نفس هذي الخيارات تنطبق كمان لو تم تعديل (`update`) قيمة الـ `primary key` بجدول `Students` بدل حذفها.

##### 🎯 الملخص السريع
- إضافة سجل بمفتاح أجنبي غير موجود → مرفوضة دايماً
- حذف/تعديل صف مرجعي → 4 خيارات ممكنة (cascade / restrict / default / null)

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Consider Students and Enrolled; sid in Enrolled is a foreign key that references Students. What should be done if an Enrolled tuple with a non-existent student id is inserted? (Reject it!). What should be done if a Students tuple is deleted? Also delete all Enrolled tuples that refer to it. Disallow deletion of a Students tuple that is referred to. Set sid in Enrolled tuples that refer to it to a default sid. (In SQL, also: Set sid in Enrolled tuples that refer to it to a special value null, denoting 'unknown' or 'inapplicable'.) Similar if primary key of Students tuple is updated.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

#### 3.7. قيد الإحالة في SQL (Referential Integrity in SQL)
<!-- @render: {type: "diagram-first", visualization: "code", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3.6"} -->

##### 💡 الفكرة الأساسية
**بلغة SQL، الخيار الافتراضي هو `NO ACTION` (رفض)، وممكن تحدد صراحة `CASCADE` أو `SET NULL`/`SET DEFAULT` عند الحذف أو التعديل.**

##### 💻 الكود: تحديد سلوك الحذف والتعديل صراحة
```sql
-- Define referential integrity behavior explicitly
CREATE TABLE Enrolled
  (sid CHAR(20),
   cid CHAR(20),
   grade CHAR(2),
   PRIMARY KEY (sid, cid),
   FOREIGN KEY (sid)
     REFERENCES Students
       ON DELETE CASCADE
       ON UPDATE SET DEFAULT)
```

##### 📖 الشرح
معايير `SQL/92` و`SQL:1999` تدعم كل الخيارات الأربعة على الحذف والتعديل معاً:
- **الافتراضي `NO ACTION`**: يرفض عملية الحذف/التعديل تماماً.
- **`CASCADE`**: يحذف تلقائياً كل الصفوف المرتبطة بصف تم حذفه.
- **`SET NULL` / `SET DEFAULT`**: يضبط قيمة الـ foreign key بالصفوف المرتبطة إلى `null` أو قيمة افتراضية.

بالمثال أعلاه: `ON DELETE CASCADE` يعني أي حذف لطالب من `Students` يحذف تلقائياً كل تسجيلاته بـ `Enrolled`، و`ON UPDATE SET DEFAULT` يعني أي تعديل بمفتاح الطالب يضبط `sid` بـ `Enrolled` لقيمة افتراضية بدل ما يرفض العملية.

##### 🎯 الملخص السريع
- الافتراضي: NO ACTION (رفض)
- بدائل صريحة: CASCADE, SET NULL, SET DEFAULT
- تحدد منفصلة لـ ON DELETE و ON UPDATE

##### 📚 التطبيق
هذا المفهوم يستخدم مباشرة بتصميم أي `schema` حقيقي بـ SQL لضمان تناسق البيانات عبر الجداول المرتبطة.

<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> SQL/92 and SQL:1999 support all 4 options on deletes and updates. Default is NO ACTION (delete/update is rejected). CASCADE (also delete all tuples that refer to deleted tuple). SET NULL / SET DEFAULT (sets foreign key value of referencing tuple). [مع مثال CREATE TABLE Enrolled ... FOREIGN KEY (sid) REFERENCES Students ON DELETE CASCADE ON UPDATE SET DEFAULT]

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل
</details>

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: متوسط وصعب

### السؤال 1 (متوسط)
جدول `instructor(ID, name, dept_name, salary)`. أي من التالي **ليس** superkey؟

أ) {ID}
ب) {ID, name}
ج) {name}
د) {ID, name, dept_name}

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `{name}` لوحده ما يضمن التفرد (ممكن يتكرر اسمين متشابهين لأستاذين مختلفين)، فهو مو superkey.
- ❌ **الخيار أ):** `{ID}` يحدد الصف بشكل وحيد، فهو superkey (وكمان candidate key).
- ❌ **الخيار ب):** `{ID, name}` يحدد الصف بشكل وحيد (فيه ID أصلاً)، فهو superkey بس مو minimal.
- ❌ **الخيار د):** نفس السبب، فيه ID فيصير superkey تلقائياً.

### السؤال 2 (متوسط)
شنو الفرق الأساسي بين `superkey` و`candidate key`؟

أ) لا فرق، هما نفس الشي
ب) candidate key لازم يكون minimal، أما superkey ممكن يحتوي أعمدة زايدة
ج) superkey أصغر من candidate key دايماً
د) candidate key هو المفتاح المختار رسمياً فقط

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** `candidate key` هو superkey minimal (ما تقدر تشيل عمود منه وتضل تحدد الصف)، بينما `superkey` ممكن يحتوي أعمدة إضافية غير ضرورية.
- ❌ **الخيار أ):** فيه فرق واضح كما شُرح.
- ❌ **الخيار ج):** العكس صحيح — candidate key هو الأصغر (subset من superkeys).
- ❌ **الخيار د):** هذا وصف الـ `primary key` مو `candidate key`.

### السؤال 3 (سهل-متوسط)
الجداول بالنموذج العلائقي:

أ) مرتبة دايماً حسب المفتاح الأساسي
ب) مرتبة حسب ترتيب الإدخال
ج) غير مرتبة (unordered)
د) مرتبة أبجدياً حسب أول عمود

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** الجدول تمثيل لمجموعة (set) من الصفوف، والمجموعات ما فيها ترتيب أصلاً.
- ❌ **الخيار أ), ب), د):** كلها افتراضات خاطئة عن ترتيب غير موجود فعلياً بالنموذج العلائقي.

### السؤال 4 (متوسط)
أي عملية بالجبر العلائقي تفلتر **الصفوف** حسب شرط؟

أ) π (project)
ب) σ (select)
ج) ρ (rename)
د) × (Cartesian product)

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** σ تفلتر صفوف تحقق شرط معين.
- ❌ **الخيار أ):** π تفلتر أعمدة، مو صفوف.
- ❌ **الخيار ج):** ρ تعطي اسم للنتيجة، ما لها علاقة بالتصفية.
- ❌ **الخيار د):** × يدمج كل صف مع كل صف بدون أي تصفية.

### السؤال 5 (متوسط)
لجدول `instructor`، الاستعلام الصحيح لإيجاد أسماء أساتذة قسم "Physics" فقط هو:

أ) πdept_name(σname="Physics"(instructor))
ب) σname(πdept_name="Physics"(instructor))
ج) πname(σdept_name="Physics"(instructor))
د) σdept_name="Physics"(πname(instructor))

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** أولاً σ تفلتر صفوف قسم Physics، ثم π تختار عمود الاسم فقط — هذا الترتيب الصحيح منطقياً.
- ❌ **الخيار أ):** يعكس الأعمدة والشرط بشكل خاطئ.
- ❌ **الخيار ب):** π ما تأخذ شرط مقارنة (`=`) هذا شكل خاطئ للصيغة.
- ❌ **الخيار د):** بعد ما تشيل الأعمدة الثانية بـ π، ما يبقى عمود dept_name أصلاً للفلترة عليه.

### السؤال 6 (صعب)
الفرق الأساسي بين `Cartesian product` و`join` هو:

أ) join يدمج جدولين فقط، أما Cartesian product يدمج أي عدد من الجداول
ب) join = select مطبق فوق نتيجة Cartesian product
ج) Cartesian product أسرع من join دايماً
د) لا فرق، هما نفس العملية بأسماء مختلفة

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** الصيغة الرياضية `r ⋈θ s = σθ(r × s)` توضح إن join هو Cartesian product متبوع بـ select بخطوة وحدة.
- ❌ **الخيار أ):** كلاهما بالأساس بين جدولين.
- ❌ **الخيار ج):** غير صحيح كسرعة — الموضوع منطقي مو أداء.
- ❌ **الخيار د):** فيه فرق واضح وهو الشرط θ.

### السؤال 7 (متوسط)
عملية `π` (project) تحذف الصفوف المتكررة من النتيجة لأن:

أ) هذا خيار اختياري بالجبر العلائقي
ب) الجدول تمثيل لمجموعة (set)، والمجموعات ما فيها تكرار
ج) SQL يفرض هذا القانون فقط
د) هذا خطأ — π لا تحذف أي تكرار

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** الجبر العلائقي مبني على نظرية المجموعات (set theory)، والمجموعة أصلاً ما فيها عناصر متكررة.
- ❌ **الخيار أ):** هذا سلوك إلزامي، مو اختياري.
- ❌ **الخيار ج):** π بالجبر العلائقي (نظرياً) لها هذا السلوك بغض النظر عن SQL.
- ❌ **الخيار د):** عكس الحقيقة تماماً.

### السؤال 8 (متوسط)
لكي يكون `r ∪ s` صحيح، يجب أن يتحقق:

أ) r وs لهم نفس عدد الصفوف
ب) r وs لهم نفس الـ arity وdomains متوافقة
ج) r وs لهم نفس اسم الجدول
د) r وs لهم نفس primary key

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** الشرطان المطلوبان هما نفس عدد الأعمدة (arity) وتوافق أنواع البيانات بين الأعمدة المتقابلة.
- ❌ **الخيار أ):** عدد الصفوف مو مهم إطلاقاً بهذا الشرط.
- ❌ **الخيار ج):** اسم الجدول غير مهم، المهم البنية.
- ❌ **الخيار د):** primary key غير مذكور كشرط لـ union.

### السؤال 9 (صعب)
جدول `Enrolled(sid, cid, grade)` عليه `FOREIGN KEY (sid) REFERENCES Students ON DELETE CASCADE`. لو حذفنا طالب من `Students` له 3 تسجيلات بـ `Enrolled`:

أ) العملية تُرفض تلقائياً
ب) تُحذف الـ 3 تسجيلات تلقائياً من Enrolled
ج) يصير sid = null بالـ 3 تسجيلات
د) لا يحدث شي، البيانات تضل كما هي

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** `ON DELETE CASCADE` يعني حذف الصف المرجعي يحذف تلقائياً كل الصفوف المرتبطة به بجدول ثاني.
- ❌ **الخيار أ):** هذا سلوك `NO ACTION` مو `CASCADE`.
- ❌ **الخيار ج):** هذا سلوك `SET NULL` مو `CASCADE`.
- ❌ **الخيار د):** `CASCADE` يعني فيه فعل تلقائي، مو تجاهل.

### السؤال 10 (متوسط)
الخيار الافتراضي (default) لسلوك الحذف/التعديل بقيد الإحالة بـ SQL/92 وSQL:1999 هو:

أ) CASCADE
ب) SET NULL
ج) NO ACTION
د) SET DEFAULT

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `NO ACTION` هو الافتراضي — يعني رفض عملية الحذف/التعديل ما لم يُحدَّد خيار آخر صراحة.
- ❌ **الخيار أ), ب), د):** كلها خيارات بديلة لازم تُحدَّد صراحة بجملة `CREATE TABLE`.

### السؤال 11 (متوسط)
قيد `CHECK (rating >= 1 AND rating <= 10)` بجدول `Sailors` يمثل نوع من:

أ) قيد المفتاح (Key constraint)
ب) قيد الإحالة (Referential integrity)
ج) قيود عامة (General constraints)
د) قيد النطاق البسيط (نوع البيانات فقط)

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** `CHECK` يمثل قيود عامة تُفرض عن طريق آليات إضافية زي Triggers وAssertions، وهذا شرط منطقي أعقد من مجرد نوع البيانات.
- ❌ **الخيار أ):** ما له علاقة بتحديد صف وحيد.
- ❌ **الخيار ب):** ما فيه ربط بجدول ثاني هنا.
- ❌ **الخيار د):** نوع العمود نفسه (`INTEGER`) هو قيد النطاق، أما شرط المدى `>=1 AND <=10` قيد إضافي فوقه.

### السؤال 12 (سهل-متوسط)
`dept_name` بجدول `instructor` هو foreign key يشير إلى جدول `department`. هذا يعني:

أ) لازم كل صف بـ `department` يكون له صف مقابل بـ `instructor`
ب) لازم كل قيمة `dept_name` بـ `instructor` تكون موجودة فعلاً بجدول `department`
ج) يمنع أي تعديل على جدول `department` نهائياً
د) العمودان لازم يكون لهم نفس الاسم بالضبط بكل الجداول

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** هذا التعريف الدقيق لـ referencing relation (`instructor`) وreferenced relation (`department`).
- ❌ **الخيار أ):** الاتجاه معكوس — القيد يفرض على instructor مو department.
- ❌ **الخيار ج):** لا يمنع التعديل نهائياً، بس يضبط سلوك معين عند الحذف/التعديل.
- ❌ **الخيار د):** ما فيه شرط تطابق أسماء الأعمدة إطلاقاً.

### السؤال 13 (متوسط)
أي تعبير جبر علائقي صحيح لإيجاد المقررات المدرّسة بـ Fall 2017 **وليس** Spring 2018؟

أ) استخدام ∪ (union)
ب) استخدام ∩ (intersection)
ج) استخدام − (set difference)
د) استخدام × (Cartesian product)

**الإجابة الصحيحة: ج)**

**التعليل:**
- ✅ **الخيار ج):** "A وليس B" يعبَّر عنه بـ `set-difference`: مجموعة Fall 2017 ناقص مجموعة Spring 2018.
- ❌ **الخيار أ):** union يجمع الاثنين معاً، مو استثناء.
- ❌ **الخيار ب):** intersection تعطي المشترك فقط، مو المستثنى.
- ❌ **الخيار د):** Cartesian product ما له علاقة بهذا النوع من الاستعلامات.

### السؤال 14 (صعب)
القيمة `null` بالنموذج العلائقي:

أ) تعني القيمة صفر رقمياً
ب) تعني القيمة "غير معروفة"، وموجودة ضمنياً بكل domain
ج) غير مسموحة إطلاقاً بأي عمود
د) تستخدم فقط بأعمدة النصوص (CHAR)

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** `null` قيمة خاصة تعني "unknown"، وهي عضو ضمني بكل domain مهما كان نوعه.
- ❌ **الخيار أ):** مختلفة تماماً عن الصفر الرقمي.
- ❌ **الخيار ج):** مسموحة افتراضياً ما لم يُمنع صراحة (مثل NOT NULL).
- ❌ **الخيار د):** تنطبق على كل أنواع الأعمدة، مو بس النصوص.

### السؤال 15 (متوسط)
عملية `ρx(E)` تُستخدم لـ:

أ) حذف صفوف من E
ب) إعطاء اسم x لنتيجة التعبير E
ج) دمج E مع جدول ثاني
د) تصفية أعمدة E

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** هذا التعريف الدقيق لعملية `rename`.
- ❌ **الخيار أ):** ما له علاقة بحذف الصفوف، هذا دور select/difference.
- ❌ **الخيار ج):** الدمج دور join أو Cartesian product.
- ❌ **الخيار د):** تصفية الأعمدة دور project (π).

### السؤال 16 (صعب)
لو حاولنا نضيف صف بجدول `Enrolled` بقيمة `sid` غير موجودة أصلاً بجدول `Students`:

أ) تُقبل العملية دايماً بغض النظر عن القيد
ب) تُرفض العملية لأنها تخالف referential integrity
ج) يتم إنشاء صف جديد تلقائياً بجدول Students
د) تتحول القيمة تلقائياً لـ null

**الإجابة الصحيحة: ب)**

**التعليل:**
- ✅ **الخيار ب):** هذي الحالة صريحة بالمحاضرة: أي محاولة إدراج بمفتاح أجنبي غير موجود بالجدول المرجعي تُرفض مباشرة، بدون خيارات بديلة.
- ❌ **الخيار أ):** يخالف مبدأ referential integrity الأساسي.
- ❌ **الخيار ج):** الـ DBMS ما ينشئ بيانات وهمية بجدول ثاني تلقائياً.
- ❌ **الخيار د):** هذا سلوك خاص بحالة الحذف (SET NULL)، مو الإدراج.

---

## الجزء الرابع: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** شنو الفرق بين `relation schema` و`relation instance`؟
**A:** الـ schema هو تعريف بنية الأعمدة فقط، أما الـ instance هو البيانات الفعلية بلحظة معينة.

### البطاقة 2
**Q2:** ليش الجداول غير مرتبة (unordered)؟
**A:** لأن الجدول تمثيل رياضي لمجموعة (set)، والمجموعات أصلاً ما فيها ترتيب.

### البطاقة 3
**Q3:** شنو الفرق بين superkey وcandidate key؟
**A:** superkey يحدد الصف بس ممكن فيه زيادة، candidate key هو superkey minimal بدون أي عمود زايد.

### البطاقة 4
**Q4:** شنو primary key؟
**A:** هو candidate key واحد يتم اختياره رسمياً ليكون المعرّف الرسمي للجدول.

### البطاقة 5
**Q5:** شنو الفرق بين Cartesian product وjoin؟
**A:** join = select مطبق فوق Cartesian product بشرط θ، يعني join يعطي فقط الصفوف المترابطة منطقياً.

### البطاقة 6
**Q6:** ما شروط صحة عملية union بين جدولين؟
**A:** نفس الـ arity (عدد الأعمدة)، وdomains متوافقة بين الأعمدة المتقابلة.

### البطاقة 7
**Q7:** شنو تعمل عملية project (π)؟
**A:** تفلتر أعمدة محددة من الجدول، وتحذف تلقائياً أي صفوف متكررة تنتج.

### البطاقة 8
**Q8:** شنو تعمل عملية rename (ρ)؟
**A:** تعطي اسم لنتيجة تعبير جبري، عشان تقدر تشير له لاحقاً.

### البطاقة 9
**Q9:** شنو referential integrity؟
**A:** قيد يضمن أي قيمة foreign key بجدول لازم تطابق قيمة موجودة فعلاً بالجدول المرجعي.

### البطاقة 10
**Q10:** شنو الخيار الافتراضي بـ SQL عند حذف صف مرجعي؟
**A:** NO ACTION — يعني رفض عملية الحذف تماماً ما لم يُحدَّد خيار آخر.

### البطاقة 11
**Q11:** شنو الفرق بين CASCADE وSET NULL؟
**A:** CASCADE يحذف تلقائياً الصفوف المرتبطة، أما SET NULL يضبط قيمة foreign key بها لـ null بدل حذفها.

### البطاقة 12
**Q12:** شنو معنى القيمة null؟
**A:** تعني "غير معروفة"، وهي عضو ضمني بكل domain لأي عمود.

### البطاقة 13
**Q13:** شنو دور قيد CHECK؟
**A:** يفرض شرط منطقي إضافي على قيم عمود، مثل تحديد مدى مسموح (rating بين 1 و10).

---

## الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة
| المصطلح | التعريف القصير |
| --- | --- |
| `relation schema` | تعريف بنية الأعمدة فقط |
| `relation instance` | البيانات الفعلية بلحظة معينة |
| `tuple` | صف واحد بالجدول |
| `domain` | مجموعة القيم المسموحة لعمود |
| `null` | قيمة خاصة تعني "غير معروف" |
| `superkey` | مجموعة أعمدة تحدد الصف (ممكن فيها زيادة) |
| `candidate key` | superkey minimal |
| `primary key` | candidate key مختار رسمياً |
| `foreign key` | عمود قيمته لازم توجد بجدول ثاني |

### 🔑 جداول العمليات الست الأساسية
| الرمز | العملية | الوظيفة |
| --- | --- | --- |
| σ | select | تفلتر صفوف حسب شرط |
| π | project | تفلتر أعمدة |
| ∪ | union | دمج صفوف جدولين متوافقين |
| − | set difference | صفوف بجدول أول ومو بالثاني |
| × | Cartesian product | دمج كل صف مع كل صف |
| ρ | rename | تسمية نتيجة تعبير |
| ⋈ | join | select فوق Cartesian product |
| ∩ | intersection | صفوف مشتركة بين جدولين |
| ← | assignment | تخزين نتيجة بمتغير مؤقت |

### 🔑 مقايضة: Cartesian Product مقابل Join
| | Cartesian Product (×) | Join (⋈) |
| --- | --- | --- |
| **الوصف** | كل صف مع كل صف بدون شرط | select فوق Cartesian product بشرط θ |
| **النتيجة** | صفوف كثيرة، أغلبها غير منطقي | صفوف مترابطة منطقياً فقط |
| **متى تختاره** | نادراً لحاله | هو المستخدم فعلياً بالاستعلامات |

### 🔑 خيارات Referential Integrity عند الحذف/التعديل (SQL)
| # | الخيار | الأثر |
| --- | --- | --- |
| 1 | NO ACTION (افتراضي) | رفض عملية الحذف/التعديل |
| 2 | CASCADE | حذف الصفوف المرتبطة تلقائياً |
| 3 | SET NULL | ضبط foreign key المرتبط = null |
| 4 | SET DEFAULT | ضبط foreign key المرتبط = قيمة افتراضية |

### 🔑 قواعد ذهبية لا تُنسى
| # | القاعدة |
| --- | --- |
| 1 | الجداول غير مرتبة — لا تعتمد على ترتيب الصفوف أبداً |
| 2 | superkey ⊇ candidate key ⊇ primary key (بالتقييد) |
| 3 | join دايماً أفضل من Cartesian product لوحده بالاستعلامات العملية |
| 4 | union/intersection/difference تحتاج نفس arity ودomains متوافقة |
| 5 | إدراج foreign key غير موجود بالجدول المرجعي = رفض دايماً |
| 6 | الافتراضي بـ SQL لأي عملية حذف مرجعية هو NO ACTION |

### 🔑 قاموس المصطلحات
| المصطلح | المعنى |
| --- | --- |
| `arity` | عدد الأعمدة بالجدول |
| `legal instance` | حالة جدول تحقق كل قيود التكامل |
| `illegal instance` | حالة جدول تخالف قيد تكامل — ممنوعة |
| `referencing relation` | الجدول اللي فيه الـ foreign key |
| `referenced relation` | الجدول اللي يُشار إليه بالـ foreign key |
