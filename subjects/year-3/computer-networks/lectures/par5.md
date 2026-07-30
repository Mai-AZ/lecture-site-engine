# المحاضرة 5 — Introduction to Networks (مقدمة في الشبكات)
> **المادة:** الشبكات وأمن البيانات (نظري) | **الموضوع:** مفاهيم الشبكات الأساسية، الطوبولوجيا، البروتوكولات، نموذج OSI، طبقاته، ومنظمات المعايير

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> تُقدّم هذه المحاضرة أساسيات شبكات الحاسوب بدءاً من تعريف الشبكة، مروراً بأنواعها وطوبولوجياتها، وصولاً إلى نموذج `OSI` بطبقاته السبع ووظيفة كل طبقة، مع استعراض منظمات المعايير العالمية.

### 🎯 ستتعلم
- **ما هي شبكة الحاسوب** — تعريفها ومكوناتها الأساسية (`LAN` و`WAN`)
- **طوبولوجيات الشبكات** — `Star`, `Ring`, `Bus`, `Fully Connected`, `Combined` ومزايا وعيوب كل منها
- **البروتوكولات** — ما هي، ولماذا نحتاجها لتنظيم تبادل البيانات بين الأجهزة
- **نموذج `OSI`** — طبقاته السبع، وظيفة كل طبقة، ومكوناته الثلاثة (`Service`, `Interface`, `Protocol`)
- **منظمات المعايير** — الجهات التي تضع قواعد الشبكات عالمياً مثل `ISO`, `IEEE`, `IETF`

### 📚 المتطلبات السابقة
- فهم عام لمفهوم الحاسوب والأجهزة الرقمية — لأن الشبكة تربط هذه الأجهزة
- مفهوم بسيط عن الإشارات والبيانات الرقمية — لأن الطبقات الدنيا تتعامل مع النبضات الفيزيائية

### 💡 الأفكار الرئيسية
1. **شبكة الحاسوب:** مجموعة أجهزة مستقلة مترابطة تتبادل البيانات — الشبكة ليست مجرد أسلاك، بل نظام كامل من القواعد والأجهزة.
2. **الطوبولوجيا:** شكل تنظيم الاتصالات الفيزيائية — اختيار الطوبولوجيا يؤثر على الأداء، التكلفة، والموثوقية.
3. **البروتوكول:** لغة مشتركة تتفق عليها الأجهزة لتبادل البيانات — بدونه لا تستطيع أجهزة مختلفة التحدث.
4. **نموذج `OSI`:** إطار مرجعي يقسّم الاتصال إلى 7 طبقات — كل طبقة تؤدي وظيفة محددة وتخفي تفاصيلها عن الطبقة الأعلى.
5. **المعايير:** تضمن أن تعمل أجهزة شركات مختلفة معاً (`interoperability`).

### 🔗 كيف تتصل هذه المحاضرة بالمحاضرات الأخرى؟
- **القادمة:** طبقة `Data Link` وبروتوكولات `Ethernet` و`MAC` تبني مباشرة على ما تعلمته هنا عن طبقة 2 في `OSI`
- **التطبيق:** كل موضوع لاحق (تدفق الأخطاء، `CSMA/CD`, `CRC`) هو تفصيل لإحدى هذه الطبقات

### ⚠️ الأخطاء الشائعة الواجب تجنبها
- ❌ الاعتقاد بأن `OSI` هو بروتوكول فعلي — هو فقط نموذج مرجعي (`guideline`)
- ❌ الخلط بين `LAN` و`WAN` من حيث المسافة الجغرافية
- ❌ ظن أن كل طبقات `OSI` تُستخدم دائماً — الإنترنت يستخدم 5 طبقات فعلياً
- ❌ الاعتقاد بأن الطوبولوجيا المثالية موجودة — كل طوبولوجيا مناسبة لحالة معينة

---

## الجزء الثاني: الشرح التفصيلي

---

### 1. Computer Networks (شبكات الحاسوب)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**شبكة الحاسوب = مجموعة أجهزة مستقلة مترابطة قادرة على تبادل المعلومات إلكترونياً.**

---

#### 📖 الشرح

**ما معنى "مستقلة" (`autonomous`)?**
كل جهاز في الشبكة يعمل بشكل مستقل — له معالجه وذاكرته وبرامجه. لا يعتمد على جهاز آخر ليعمل. الفرق عن الطرفيات القديمة (`terminals`) التي كانت تعتمد كلياً على `mainframe` مركزي.

**ما معنى "مترابطة"?**
الأجهزة مرتبطة ببعضها عبر وسيط (أسلاك نحاسية، ألياف بصرية، لاسلكي)، وتتبادل بياناتها `online` أي في الوقت الفعلي.

**ما الذي يمكن أن تتضمنه الشبكة؟**
ليست فقط حواسيب — يمكن أن تشمل أيضاً طابعات (`printers`)، مودمات (`modems`)، ماسحات ضوئية (`scanners`)، وأجهزة متخصصة أخرى.

#### 💡 التشبيه:
> الشبكة كالطريق السريع — كل سيارة (جهاز) مستقلة في قيادتها، لكنهم يتشاركون نفس الطريق (الوسيط) وقواعد المرور (البروتوكول) لتجنب الاصطدام وتبادل الأولوية.
> **وجه الشبه:** السيارة = الجهاز المستقل | الطريق = وسيط الاتصال | قواعد المرور = البروتوكول

#### 🎯 الملخص السريع
- الشبكة = أجهزة مستقلة + وسيط اتصال + بروتوكول تبادل بيانات
- يمكن أن تضم أجهزة غير حاسوبية (طابعات، مودمات...)
- التبادل يكون `online` (في الوقت الفعلي)

#### ⚠️ تنبيه بصري
⚠️ **مهم:** الشريحة 3 في المحاضرة تحتوي على رسمة تُظهر شبكة `LAN` كاملة بمكوناتها (workstation, file server, laser printer, pen computer) — اذهب وشوفها هناك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> A computer network is an interconnected collection of autonomous computers which are able to exchange information online. It may also include devices such as printers, modems, and etc.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريف + معنى autonomous + معنى online + الأجهزة الأخرى
- ℹ️ إضافة من الدليل: شرح الفرق عن terminals القديمة، تشبيه الطريق

</details>

---

### 2. أنواع الشبكات (LAN & WAN)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**تُصنَّف الشبكات حسب المساحة الجغرافية التي تغطيها.**

---

#### 📊 المخطط: أنواع الشبكات

#### ما هذا المخطط؟
> يوضّح الفرق الجغرافي بين `LAN` و`WAN`.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
|---|---------|-------|-------|
| 1 | `LAN` | نوع شبكة | شبكة محلية — مبنى واحد أو مجموعة مبانٍ |
| 2 | `WAN` | نوع شبكة | شبكة واسعة — مدينة، دولة، أو العالم |

```diagram
type: comparison-table
title: أنواع الشبكات
```

#### ⚖️ مقارنة سريعة: LAN vs WAN

| المعيار | `LAN` (Local Area Network) | `WAN` (Wide Area Network) |
|---------|---------------------------|--------------------------|
| **المساحة** | مبنى واحد أو مجموعة مبانٍ | مدينة، دولة، العالم |
| **المثال** | شبكة الجامعة الداخلية | شبكة الإنترنت |
| **السرعة** | عادةً أعلى | عادةً أبطأ |
| **التكلفة** | أرخص | أغلى |

**الخلاصة:**
> `LAN` للبيئات الصغيرة المحدودة جغرافياً؛ `WAN` لربط مواقع بعيدة.

#### 💡 التشبيه:
> `LAN` كالحديث داخل غرفة واحدة — أسرع وأرخص. `WAN` كالمكالمة الدولية — يصل لأي مكان لكن بتكلفة ووقت أعلى.
> **وجه الشبه:** المسافة = التكلفة والتعقيد

#### 🎯 الملخص السريع
- `LAN` = محلية، مبنى/مجموعة مبانٍ
- `WAN` = واسعة، مدينة/دولة/عالم

#### ملاحظة:
> المحاضرة تذكر أيضاً `MAN` (Metropolitan Area Network) في ملخص الشريحة الأخيرة كمنطقة بين `LAN` و`WAN` تغطي مدينة أو منطقة حضرية — **(شرح زيادة للفهم)** `MAN` = شبكة تغطي مدينة بأكملها كشبكات الكابل التلفزيوني.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> LAN - local area network: Covers a small geographic area and connects devices in a single building or group of buildings.
> WAN - wide area network: Covers a larger area such as a city/municipal region, country, or the world.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: التعريفان + جدول المقارنة
- ℹ️ إضافة من الدليل: جدول المقارنة التفصيلي، `MAN`

</details>

---

### 3. Network Topologies (طوبولوجيات الشبكات)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**الطوبولوجيا = الطريقة التي تُنظَّم بها الاتصالات الفيزيائية بين الأجهزة في الشبكة.**

---

#### 📖 الشرح

الطوبولوجيا لا تعني شكل الأسلاك فقط — تعني أيضاً كيف تتدفق البيانات، من يتحكم، ومَن يتأثر حين يحدث عطل. الأنواع الأساسية هي:
`Star` | `Ring` | `Bus` | `Fully Connected` | `Combined`

---

### 3.1. Star Topology (الطوبولوجيا النجمية)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**في الطوبولوجيا النجمية، كل جهاز يتصل بجهاز مركزي واحد — والتواصل يمر دائماً عبر هذا المركز.**

---

#### 📊 المخطط: Star Topology

#### ما هذا المخطط؟
> كل جهاز (workstation, printer...) متصل مباشرة بجهاز مركزي (`hub/switch/computer`). لا يوجد اتصال مباشر بين الأجهزة الطرفية.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
|---|---------|-------|-------|
| 1 | جهاز مركزي (`Central Computer/Hub`) | عُقدة تحكم | يستقبل ويوجّه جميع الرسائل |
| 2 | أجهزة طرفية (`Devices`) | عُقد طرفية | تتصل بالمركز فقط |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|----|-----|---------|-----------|-------|
| أي جهاز | المركز | رسالة | ← ثنائي الاتجاه | كل تواصل يمر بالمركز |
| المركز | أي جهاز | توجيه | → ثنائي الاتجاه | المركز يوجّه الرسالة للهدف |

```diagram
type: flowchart
title: Star Topology
direction: TD
nodes:
  - id: center
    label: Central Computer / Hub
    kind: process
    level: 0
  - id: ws1
    label: Workstation 1
    kind: event
    level: 1
  - id: ws2
    label: Workstation 2
    kind: event
    level: 1
  - id: ws3
    label: Workstation 3
    kind: event
    level: 1
  - id: printer
    label: Printer
    kind: event
    level: 1
edges:
  - from: ws1
    to: center
    label: ""
  - from: ws2
    to: center
    label: ""
  - from: ws3
    to: center
    label: ""
  - from: printer
    to: center
    label: ""
```

#### 📖 الشرح: "اقرأ المخطط كالتالي..."
كل جهاز (workstation أو printer) يرتبط بخط مباشر بالجهاز المركزي. إذا أراد `Workstation 1` أن يرسل ملفاً لـ `Workstation 2`، يُرسله أولاً للمركز، والمركز يوجّهه. **التحكم مُركَّز بالكامل.**

#### ⚖️ المقايضة: Star Topology

| | **المزايا** | **العيوب** |
|---|------------|------------|
| **نقطة واحدة للمسؤولية** | سهل تشخيص الأعطال — كل شيء يمر بالمركز | إذا فشل المركز، انهارت الشبكة كلها |
| **الإضافة سهلة** | إضافة جهاز جديد = وصل سلك بالمركز فقط | تكلفة الكابلات أعلى (خط منفصل لكل جهاز) |
| **العزل** | عطل جهاز طرفي لا يؤثر على البقية | — |

#### 💡 التشبيه:
> كمكتب بريد مركزي في مدينة — كل رسالة تمر بالمكتب المركزي قبل وصولها.
> **وجه الشبه:** المكتب المركزي = `Hub/Switch` | الرسالة = `Data packet`

#### 🎯 الملخص السريع
- التحكم مُركَّز (`centralized`)
- التواصل دائماً عبر المركز
- ميزة: نقطة مسؤولية واضحة
- عيب: فشل المركز = فشل الشبكة

#### ⚠️ تنبيه بصري
⚠️ **مهم:** الشريحة 7 في المحاضرة تحتوي على رسمة `Figure 1.7` للـ `Star Topology` — اذهب وشوفها هناك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Star Topology: Control is centralised. If a device wants to communicate, it does so only through the central computer. Advantage - focal point for responsibility. Disadvantage - failure of the central computer brings down the entire network.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: المفهوم + المزايا + العيوب + الرسمة التوضيحية
- ℹ️ إضافة من الدليل: جدول المقايضة، التشبيه

</details>

---

### 3.2. Ring Topology (الطوبولوجيا الحلقية)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**الأجهزة مرتبطة في حلقة دائرية — الرسائل تمر عبر كل جهاز حتى تصل لهدفها، والتنسيق يتم بتمرير رمز يُسمى `token`.**

---

#### 📊 المخطط: Ring Topology

#### ما هذا المخطط؟
> كل جهاز متصل بالجهازين المجاورين فقط (اليسار واليمين)، مشكّلاً حلقة مغلقة.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
|---|---------|-------|-------|
| 1-N | أجهزة (`Stations`) | عُقد متساوية | كل جهاز يُعيد إرسال الرسالة للتالي |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
|----|-----|---------|-----------|-------|
| Station A | Station B | تمرير `token`/رسالة | → أحادي أو ثنائي | يمر بالتسلسل |

```diagram
type: cycle
stages:
  - id: s1
    label: Station 1
    description: ترسل أو تُعيد إرسال الرسالة
  - id: s2
    label: Station 2
    description: تتحقق من العنوان، إذا لها تأخذها وإلا تُعيدها
  - id: s3
    label: Station 3
    description: نفس المنطق
  - id: s4
    label: Station 4
    description: نفس المنطق
relationships:
  - from: s1
    to: s2
    label: تمرير الرسالة
  - from: s2
    to: s3
    label: تمرير الرسالة
  - from: s3
    to: s4
    label: تمرير الرسالة
  - from: s4
    to: s1
    label: يعود للبداية
```

#### 📖 الشرح: "اقرأ المخطط كالتالي..."
الرسائل تتدفق في اتجاه واحد (أو اتجاهين) عبر الحلقة. لكي يُرسل جهاز رسالة، يجب أن يحصل على **`token`** (رمز خاص يُمرَّر في الحلقة). حين يحصل عليه، يُرسل رسالته، ثم يُمرر الـ`token` للتالي. **لا يوجد جهاز مركزي للتحكم.**

#### ⚖️ المقايضة: Ring Topology

| | **المزايا** | **العيوب** |
|---|------------|------------|
| **التحكم** | لا يوجد جهاز مركزي — لا نقطة فشل واحدة | عطل أي محطة يكسر الحلقة كلها |
| **الكفاءة** | كل محطة لها فرصة متساوية (`token`) | الرسائل تأخذ وقتاً أطول (تمر بالوسيط) |
| **التعقيد** | — | كل المحطات بين المرسل والمستقبل تشارك في إعادة الإرسال |

#### 💡 التشبيه:
> كلعبة "تمرير الكرة" في دائرة — الكرة (`token`) تدور حتى تصل لمن يريد الكلام، يتكلم، ثم يُعيد الكرة.
> **وجه الشبه:** الكرة = `token` | التكلم = إرسال البيانات

#### 🎯 الملخص السريع
- الأجهزة في حلقة دائرية
- التنسيق بالـ`token`
- لا تحكم مركزي
- عيب: عطل محطة واحدة يوقف الحلقة
- عيب: وقت إضافي لإعادة الإرسال عبر الوسيط

#### ⚠️ تنبيه بصري
⚠️ **مهم:** الشريحة 9 تحتوي على رسمة `Figure 1.8` للـ `Ring Topology` — اذهب وشوفها هناك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Ring Topology: Devices connected circularly. Messages pass through each device. Unidirectional or bi-directional communication. Co-ordination is by passing a token. Advantage - no central coordination. Disadvantages: All stations in between sender and receiver are involved when passing a message. Failure of one station causes a break. More time on relaying messages.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: المفهوم + الـ`token` + الاتجاه + جميع المزايا والعيوب
- ℹ️ إضافة من الدليل: مخطط الدورة، جدول المقايضة، التشبيه

</details>

---

### 3.3. Bus Topology (الطوبولوجيا الخطية)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**جميع الأجهزة متصلة بخط واحد مشترك (`bus`) — الرسائل تنتقل على هذا الخط وكل جهاز "يسمع" ما يُرسَل، ويأخذ فقط ما موجّه إليه.**

---

#### 📊 المخطط: Bus Topology

#### ما هذا المخطط؟
> خط مشترك يمتد أفقياً، وكل الأجهزة تتصل به بشكل عمودي.

```diagram
type: flowchart
title: Bus Topology
direction: LR
nodes:
  - id: bus
    label: Shared Bus (خط مشترك)
    kind: process
    level: 0
  - id: m1
    label: Mainframe 1
    kind: event
    level: 1
  - id: fs
    label: File Server
    kind: event
    level: 1
  - id: ws
    label: Workstation
    kind: event
    level: 1
  - id: m2
    label: Mainframe 2
    kind: event
    level: 1
edges:
  - from: m1
    to: bus
    label: ""
  - from: fs
    to: bus
    label: ""
  - from: ws
    to: bus
    label: ""
  - from: m2
    to: bus
    label: ""
```

#### 📖 الشرح: "اقرأ المخطط كالتالي..."
الـ`bus` كالممر المشترك — أي جهاز يريد الإرسال يضع بياناته على الـ`bus` وكل الأجهزة تسمع. فقط الجهاز المعنون له يأخذ البيانات. **المشكلة:** إذا أرسل جهازان في نفس الوقت → **تصادم** (`collision`).

#### ⚖️ المقايضة: Bus Topology

| | **المزايا** | **العيوب** |
|---|------------|------------|
| **البساطة** | سهل إضافة أو إزالة أجهزة | التصادم (`collision`) يُضيّع الوقت |
| **الكفاءة** | فقط الجهازان المتصلان يشاركان | معدل تصادم مرتفع = ضياع `bandwidth` |
| **التكلفة** | كابل واحد مشترك = رخيص | كلما زادت الأجهزة، زاد احتمال التصادم |

#### مهم للامتحان ⚠️:
> **التصادم في `Bus`:** حين يُرسل جهازان في نفس الوقت، تتداخل البيانات وتُتلف — يحتاج النظام لآلية كشف التصادم (`Collision Detection`) مثل `CSMA/CD`.

#### 💡 التشبيه:
> كالحديث في اجتماع بدون رئيس — إذا تكلم شخصان معاً، لا يُفهم أحدهما، ويجب على كليهما الصمت والمحاولة مجدداً.
> **وجه الشبه:** الكلام المتزامن = `collision` | الصمت وإعادة المحاولة = `CSMA/CD`

#### 🎯 الملخص السريع
- خط مشترك واحد للجميع
- سهل الإضافة والحذف
- مشكلة `collision` الأساسية
- معدل `collision` المرتفع يُقلل كفاءة الشبكة

#### ⚠️ تنبيه بصري
⚠️ **مهم:** الشريحة 11 تحتوي على رسمة `Figure 1.6 - Common Bus Topology` — اذهب وشوفها هناك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Bus Topology: Devices communicate through a single bus. Only the communicating devices are involved when passing messages. Advantage - easy to add or remove devices to/from the network. Disadvantages: Collision detection. High collision rate may cause waste of data rate.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: المفهوم + مزايا + عيوب + `collision`
- ℹ️ إضافة من الدليل: ذكر `CSMA/CD` كحل، التشبيه

</details>

---

### 3.4. Fully Connected Topology (الطوبولوجيا المتصلة كلياً)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**كل جهاز متصل مباشرة بجميع الأجهزة الأخرى — أقصى درجات التكرار والموثوقية، لكن بتكلفة عالية جداً.**

---

#### 📊 المخطط: Fully Connected Topology

#### ما هذا المخطط؟
> N أجهزة، كل واحد مرتبط بباقي الـ(N-1) جهاز بخط مباشر.

#### 📐 المعادلة: عدد الروابط في Fully Connected

$$\text{عدد الروابط} = \frac{N(N-1)}{2}$$

**الشرح:**
> N = عدد الأجهزة
> مع 5 أجهزة: (5×4)/2 = **10 روابط** — يزداد بشكل تربيعي مع كل جهاز إضافي

#### 🎯 الملخص السريع
- كل جهاز ↔ كل جهاز مباشرة
- أعلى موثوقية (عطل خط لا يوقف الشبكة)
- تكلفة تنمو تربيعياً — غير عملي للشبكات الكبيرة
- نادر الاستخدام إلا في الشبكات الصغيرة جداً أو الحساسة

#### ⚠️ تنبيه بصري
⚠️ **مهم:** الشريحة 12 تحتوي على رسمة `Figure 1.9 - Fully Connected Topology` — اذهب وشوفها هناك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 95%)</summary>

**النص الأصلي يقول:**
> (موضح برسمة فقط في المحاضرة - Figure 1.9)

**ملاحظة على التغطية:**
- ✓ تم شرح: المفهوم الأساسي من الرسمة
- ℹ️ إضافة من الدليل: المعادلة الرياضية لعدد الروابط، التحليل العملي **(شرح زيادة للفهم)**

</details>

---

### 3.5. Combined Topology (الطوبولوجيا المدمجة)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**الواقع الفعلي في الشبكات الكبيرة: مزيج من الطوبولوجيات المختلفة (`Star + Bus + Ring`) حسب الحاجة.**

---

#### 📖 الشرح

في الواقع، لا توجد شبكة كبيرة تستخدم طوبولوجيا واحدة. المحاضرة تسمي هذا بـ **"the de facto situation"** — الحالة الفعلية السائدة. مثلاً:
- داخل المبنى: `Star` (كل حاسوب يتصل بـ`switch`)
- بين المباني: `Bus` مشترك (`backbone`)
- `Bridges` لربط شبكات `LAN` مختلفة ببعضها عبر الـ`backbone`

#### ⚠️ تنبيه بصري
⚠️ **مهم:** الشريحة 13 تحتوي على رسمة `Figure 1.10 - Combined Topology` وتُظهر `LAN + backbone + bridge + mainframe` معاً — اذهب وشوفها هناك.

#### 🎯 الملخص السريع
- الشبكات الحقيقية = مزيج من الطوبولوجيات
- `Bridge` يربط شبكتين مختلفتين
- `Backbone` يُشكّل الخط الرئيسي المشترك

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Combined Topology: The de facto situation.

**ملاحظة على التغطية:**
- ✓ تم شرح: الفكرة الأساسية + الرسمة
- ℹ️ إضافة من الدليل: شرح مكونات الرسمة (backbone, bridge, LAN)

</details>

---

### 4. Protocols (البروتوكولات)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**البروتوكول = مجموعة قواعد تحكم كيفية تبادل البيانات إلكترونياً بين الأجهزة.**

---

#### 📖 الشرح

تخيّل أنك تريد إرسال رسالة من مدير لمدير في شركة أخرى. لا يتواصلان مباشرة — هناك طبقات من الوسطاء (مدير → سكرتير → غرفة البريد → خدمة التوصيل). كل طبقة لها قواعدها الخاصة:
- المدير يُملي الرسالة (`Application` → يحدد المحتوى)
- السكرتير يُنسّق الشكل (`Presentation` → ينسّق الصيغة)
- غرفة البريد تُعنوِن المظروف (`Network` → يحدد الوجهة)
- خدمة التوصيل تُوصّل فعلياً (`Physical` → يُرسل البتات)

هذا بالضبط ما يصوّره مخطط المحاضرة (`Figure` في الشريحة 14).

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا نحتاج بروتوكولاً إذا كان كلا الجهازين يعرفان ماذا يريدان؟
> **لماذا هذا مهم؟** لأن الأجهزة مختلفة الصنع والتصميم — البروتوكول هو "اللغة المشتركة" بينها.

#### 💡 التشبيه:
> البروتوكول كقواعد السلام الدبلوماسي — حتى لو كان الطرفان يتحدثان لغتين مختلفتين، هناك بروتوكول رسمي يحكم كيفية التواصل والتسليم.
> **وجه الشبه:** اللغة الدبلوماسية الرسمية = `Protocol` | الطرفان = جهازان مختلفا الصنع

#### 🎯 الملخص السريع
- بروتوكول = مجموعة قواعد للتبادل الإلكتروني للبيانات
- يضمن تفاهم الأجهزة المختلفة
- كل طبقة في `OSI` لها بروتوكولها الخاص

#### ⚠️ تنبيه بصري
⚠️ **مهم:** الشريحة 14 تحتوي على مخطط يوضّح تشبيه البروتوكول بطبقات المدير/السكرتير/البريد — اذهب وشوفها هناك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Protocols: A set of rules governing the exchange or transmission of data electronically between devices.

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + الفكرة بعمق + المخطط
- ℹ️ إضافة من الدليل: تشبيه الدبلوماسية، ربط بطبقات OSI

</details>

---

### 5. ISO's OSI Model (نموذج OSI)
<!-- @render: {type: "diagram-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`OSI` = نموذج مرجعي من 7 طبقات طوّرته `ISO` لتنظيم كيفية تصميم بروتوكولات الشبكات — كل طبقة تخدم ما فوقها وتعتمد على ما تحتها.**

---

#### 📖 الشرح

- **`ISO`** = International Organization for Standardization
- **`OSI`** = Open Systems Interconnect
- الفكرة: تقسيم مهمة الاتصال المعقدة إلى 7 طبقات يمكن تصميمها وتطويرها بشكل مستقل.
- كل طبقة **تُجري محادثة منطقية** (`logical conversation`) مع نظيرتها في الجهاز الآخر، دون أن "تعرف" كيف تعمل الطبقات الأخرى.

#### 📊 المخطط: OSI Seven Layers

#### ما هذا المخطط؟
> 7 طبقات مرتبة من الأعلى (تقرب من المستخدم) للأسفل (تقرب من الوسيط الفيزيائي).

| # | الطبقة | الاسم | وظيفة رئيسية |
|---|--------|-------|--------------|
| 7 | `Application Layer` | طبقة التطبيق | تتعامل مع المستخدم والتطبيقات |
| 6 | `Presentation Layer` | طبقة العرض | تنسيق البيانات، التشفير، الضغط |
| 5 | `Session Layer` | طبقة الجلسة | إنشاء وإدارة الجلسات |
| 4 | `Transport Layer` | طبقة النقل | تقسيم البيانات، ضمان الوصول |
| 3 | `Network Layer` | طبقة الشبكة | توجيه الرسائل (الـ`routing`) |
| 2 | `Data Link Layer` | طبقة الرابط | إرسال `frames`، كشف أخطاء |
| 1 | `Physical Layer` | الطبقة الفيزيائية | إرسال بتات عبر الوسيط |

```diagram
type: flowchart
title: OSI Seven-Layer Model
direction: TD
nodes:
  - id: app
    label: 7. Application Layer
    kind: process
    level: 0
  - id: pre
    label: 6. Presentation Layer
    kind: process
    level: 1
  - id: ses
    label: 5. Session Layer
    kind: process
    level: 2
  - id: trn
    label: 4. Transport Layer
    kind: process
    level: 3
  - id: net
    label: 3. Network Layer
    kind: process
    level: 4
  - id: dll
    label: 2. Data Link Layer
    kind: process
    level: 5
  - id: phy
    label: 1. Physical Layer
    kind: process
    level: 6
edges:
  - from: app
    to: pre
    label: تمرير للأسفل
  - from: pre
    to: ses
    label: ""
  - from: ses
    to: trn
    label: ""
  - from: trn
    to: net
    label: ""
  - from: net
    to: dll
    label: ""
  - from: dll
    to: phy
    label: ""
```

#### 📖 الشرح: "اقرأ المخطط كالتالي..."
عند إرسال بيانات: تبدأ من أعلى (طبقة 7) وتنزل لطبقة 1 حيث تُرسَل فعلياً. عند الاستقبال: تصعد من طبقة 1 لطبقة 7. كل طبقة تُضيف معلوماتها (`header`) عند الإرسال وتزيلها عند الاستقبال.

#### مهم للامتحان ⚠️:
> **`OSI` ليس بروتوكولاً فعلياً** — هو فقط نموذج إرشادي (`guideline`). البروتوكولات الحقيقية (مثل `TCP/IP`) تختلف في تفاصيلها.

#### ملاحظة:
> الإنترنت يستخدم 5 طبقات فقط (يدمج الطبقات 5، 6، 7 في طبقة واحدة). ليس كل تطبيق يستخدم كل الطبقات.

#### 💡 التشبيه:
> نموذج `OSI` كبناء شركة متعددة الطوابق — كل طابق (قسم) له وظيفة محددة، يُسلّم عمله للطابق الأسفل، ولا يهتم بكيف يعمل الطابق الآخر.
> **وجه الشبه:** الطابق = طبقة | العمل المُسلَّم = `data unit` | الطابق الأرضي = الوسيط الفيزيائي

#### 🎯 الملخص السريع
- `OSI` = نموذج 7 طبقات من `ISO`
- كل طبقة: وظيفة محددة، تتكلم مع نظيرتها في الطرف الآخر
- البيانات تنزل عند الإرسال، تصعد عند الاستقبال
- ليس بروتوكولاً — نموذج إرشادي فقط

#### ⚠️ تنبيه بصري
⚠️ **مهم:** الشريحة 16 تحتوي على `Figure 1.11` والشريحة 18 تحتوي على `Figure 1.13` اللتان تُوضّحان تدفق البيانات عبر الطبقات — اذهب وشوفهما هناك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ISO - International Organization for Standardization. OSI - Open Systems Interconnect. Layered protocol model. Each layer performs specific functions and communicates with the layers directly above and below it.

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريفان + الهيكل + الرسم + مفهوم المحادثة المنطقية
- ℹ️ إضافة من الدليل: الجدول التفصيلي، التشبيه، التنبيه عن OSI ليس بروتوكولاً

</details>

---

### 6. Components of Each OSI Layer (مكونات كل طبقة)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**كل طبقة في `OSI` تتكوّن من ثلاثة عناصر: `Service` (ماذا تفعل؟) + `Interface` (كيف تتكلم مع الجارة؟) + `Protocol` (شؤونها الداخلية).**

---

#### 📖 الشرح

| المكوّن | التعريف | التشبيه |
|---------|---------|---------|
| **`Service`** | يُعرّف ما تقدمه الطبقة للطبقة الأعلى — **ما** تفعله، ليس **كيف** | وصف وظيفة الموظف في عقد العمل |
| **`Interface`** | يُعرّف كيف تتفاعل الطبقات — ما المُدخلات؟ ما النتائج المتوقعة؟ | بروتوكول التسليم بين قسمين |
| **`Protocol`** | الشؤون الداخلية للطبقة — تستطيع استخدام أي بروتوكول طالما أنجزت مهمتها | الطريقة الداخلية لكل قسم في أداء عمله |

#### الدرس المستفاد:
> **الـ`Protocol` هو عمل الطبقة الداخلي** — الطبقة n في جهاز A تُجري "محادثة منطقية" مع الطبقة n في جهاز B. القواعد المستخدمة في هذه المحادثة = بروتوكول الطبقة n.

#### 💡 التشبيه:
> كشركة شحن دولية — `Service`: تُوصّل بضاعتك لأي بلد. `Interface`: تسلّم البضاعة بالحجم والوثائق المطلوبة. `Protocol`: كيف تتعامل داخلياً مع مستودعاتها وسائقيها — أنت لا تعرف ولا تحتاج أن تعرف.
> **وجه الشبه:** البضاعة = البيانات | الشركة = الطبقة

#### 🎯 الملخص السريع
- `Service` = ماذا تفعل الطبقة (الخارج)
- `Interface` = كيف تتكلم مع الطبقات الأخرى
- `Protocol` = كيف تعمل داخلياً

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Service - defines what the layer does, not how it works. Interface - defines how the layers above and below interact with it. What parameters exist and what results to expect. Protocol - the layer's own business. Can use any protocol as long as the job gets done. Layer n on one machine carries on a logical conversation with layer n on another machine. The rules and conventions used in this conversation are collectively known as the layer n protocol.

**ملاحظة على التغطية:**
- ✓ تم شرح: الثلاثة مكونات + المحادثة المنطقية
- ℹ️ إضافة من الدليل: الجدول، التشبيه

</details>

---

### 7. لماذا نستخدم نموذجاً طبقياً؟ (Why a Layered Protocol?)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**التقسيم الطبقي يجعل الشبكات أسهل في التصميم والتطوير والتغيير — كل طبقة مستقلة عن تفاصيل الطبقات الأخرى.**

---

#### 📖 الشرح

المحاضرة تذكر أسباباً واضحة:

1. **الهدف الأصلي:** إيصال رسالة عبر شبكات مختلفة (`different networks`) — الطبقات تخفي الفروق بين الشبكات.
2. **سهولة التعديل:** تغيير طبقة منخفضة (مثلاً تغيير الكابل من نحاس لألياف بصرية) لا يؤثر على الطبقات الأعلى، طالما الـ`interface` نفسه.
3. **الفصل بين المهام:**
   - الطبقات العليا (5-7): خدمات المستخدم والتطبيقات (`end-to-end`)
   - الطبقات الدنيا (1-3): تفاصيل إرسال البيانات في الشبكة
4. **الإخفاء (`Shielding`):** كل طبقة تُقدّم خدماتها للأعلى دون أن تكشف كيف تؤديها — كالصندوق الأسود.

#### ⚖️ المقايضة: Layered vs Non-Layered

| | **طبقي (Layered)** | **غير طبقي** |
|---|-------------------|------------|
| **التعديل** | تعديل طبقة واحدة فقط | يؤثر على النظام كله |
| **التصميم** | كل طبقة مستقلة | تشابك وتعقيد |
| **الاختبار** | اختبار كل طبقة على حدة | صعب العزل |

#### 💡 التشبيه:
> كبناء متعدد الطوابق — تغيير السباكة في الطابق الأول لا يتطلب إعادة بناء الطوابق العليا.
> **وجه الشبه:** السباكة = بروتوكول الطبقة الفيزيائية | الطوابق العليا = طبقات Application/Presentation

#### 🎯 الملخص السريع
- التقسيم الطبقي يُسهّل التعديل والتطوير
- الطبقات العليا = خدمات المستخدم
- الطبقات الدنيا = نقل البيانات
- كل طبقة تُخفي تفاصيلها عن من فوقها

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Idea was originally to get a message across different networks. By layering, each layer performs a separate function. Makes changes and modifications easier. Change of lower layers does not affect higher layers as long as their interfaces are the same. Higher layers deal more with end-to-end communications, user services and applications. Lowest three layers deal primarily with the details of data transmission in networks. Each layer offers certain services to the higher layers, shielding those layers from the details of how the offered services are actually implemented.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط بالكامل
- ℹ️ إضافة من الدليل: جدول المقارنة، التشبيه

</details>

---

### 8. الطبقات السبع — الشرح التفصيلي

---

### 8.1. Physical Layer (الطبقة الفيزيائية — الطبقة 1)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**الطبقة الفيزيائية تُرسل البتات الخام (0 و1) عبر وسيط الاتصال — هي تتعامل مع الإشارات الكهربائية أو الضوئية، لا مع المعنى.**

---

#### 📖 الشرح

- تُعرّف كيف تُرسَل الإشارات عبر وسيط معين (أقمار صناعية، ألياف بصرية، كابل محوري).
- تُرسل `physical bits` فقط — لا تعرف إذا كانت بيانات أو رسائل.
- تهتم بالجانبين الفيزيائي والكهربائي:
  - `physical/electrical interfaces` بين معدات المستخدم والشبكة
  - `signal and encoding` — كيف تُحوَّل البتات لإشارات

**بروتوكولات/معايير الطبقة الفيزيائية:**
`RS-232` | `RS-449` | `ISDN` | `Ethernet`

#### ملاحظة:
> تُسمى أحياناً **"bit pipe"** — أنبوب يمرر البتات دون فهمها.

#### 💡 التشبيه:
> كعامل البريد الذي يُوصّل مظاريف دون أن يعرف أو يقرأ محتواها.
> **وجه الشبه:** المظروف = `bit stream` | طريق التوصيل = `physical medium`

#### 🎯 الملخص السريع
- ترسل بتات فقط — أدنى طبقة
- تهتم بالإشارات الفيزيائية
- معاييرها: `RS-232`, `ISDN`, `Ethernet`
- تُلقّب بـ`bit pipe`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Physical Layer: Defines how signals are sent by a media, such as satellite, fibre optics, coaxial cable. Transmits physical bits over the network. Concerned with the physical and electrical aspects of communications: physical or electrical interfaces between the user equipment and the network equipment, signal and encoding. Protocols/standards include: RS-232, RS-449, ISDN, Ethernet. Sometimes called the "bit pipe".

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط
- ℹ️ إضافة من الدليل: التشبيه

</details>

---

### 8.2. Data Link Layer (طبقة الرابط — الطبقة 2)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**تُحوّل البتات الخام من الطبقة الفيزيائية إلى `frames` منظمة وتضمن وصولها صحيحةً — تكشف الأخطاء وتتحكم في تدفق البيانات بين جهازين متجاورين.**

---

#### 📖 الشرح

**دور المُرسِل:**
1. تأخذ رسائل من الطبقة الأعلى
2. تقسّمها إلى `frames` (وحدات منظمة)
3. تُسلّم الـ`frames` للطبقة الفيزيائية لإرسالها

**دور المُستقبِل:**
1. تأخذ `frames` من الطبقة الفيزيائية
2. تجمعها وتُعيد بناء الرسائل
3. تُسلّم الرسائل للطبقة الأعلى

**وظائف إضافية مهمة:**
- **كشف/تصحيح الأخطاء:** تستخدم `CRC` (Cyclic Redundancy Check) و`Hamming codes`
- **التحكم في التدفق (`Flow Control`):** بين عقدتين متجاورتين
- **التحكم في الأخطاء:** تتعامل مع `frames` التالفة، المفقودة، والمكررة

**الطبقات الفرعية:**
- `MAC` (Medium Access Control) — يتحكم في من يُرسل ومتى
- `LLC` (Logical Link Control) — يتحكم في التدفق وكشف الأخطاء

#### مهم للامتحان ⚠️:
> `CRC` و`Hamming codes` = أدوات كشف وتصحيح الأخطاء في هذه الطبقة — ستدرسهما بتفصيل لاحقاً.

#### 🎯 الملخص السريع
- تُحوّل رسائل → `frames` (مرسِل) وعكسه (مستقبِل)
- تكشف وتصحح أخطاء (`CRC`, `Hamming`)
- تتحكم في التدفق بين عقدتين
- طبقتان فرعيتان: `MAC` و`LLC`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Data Link Layer: Defines frames. Sends and receives frames. Sender: Accepts messages from the higher layer, Breaks them into frames, Hands these frames to the physical layer. Receiver: Receives frames from the physical layer, Assembles them into messages, Hands the messages to the next higher layer. Detects or corrects errors to ensure error-free messages — CRC, Hamming codes. Flow control between two adjacent network nodes. Error control - deals with damaged, lost, and duplicate frames. Sub layers: Medium Access Control (MAC), Logical Link Control (LLC).

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط بالكامل
- ℹ️ إضافة من الدليل: التمييز بين دور المرسل والمستقبل، التشبيه

</details>

---

### 8.3. Network Layer (طبقة الشبكة — الطبقة 3)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**طبقة الشبكة تُحدّد المسار من المصدر للهدف وترسل الرسائل قفزةً قفزةً (`hop by hop`) عبر الشبكة.**

---

#### 📖 الشرح

وظائف الطبقة الثالثة:
- **`Routing`:** تُحدّد أفضل مسار من المصدر للهدف
- **`Hop-by-hop`:** لا ترسل مباشرة — تمر الرسالة بمحطات وسيطة (`routers`)
- **`Congestion Control`:** تتحكم في الازدحام لتجنب إغراق الشبكة
- **`Billing`:** تُدير معلومات الفوترة
- **`Address Mapping`:** ترسم خريطة العناوين
- **`Interconnection`:** تربط شبكات متباينة (`heterogeneous`) وتُخفي الفروق بينها (مثلاً: فروق أطوال الحزم)

#### ملاحظة:
> في شبكات `broadcast` (مثل شبكة `LAN` بسيطة)، توجيه الرسائل بسيط جداً، لذا طبقة الشبكة قد تكون رقيقة أو غير موجودة.

#### 💡 التشبيه:
> كـ`GPS` في السيارة — يُحدّد المسار الأمثل لوصولك للهدف، ويُعيد الحساب إذا كان الطريق مزدحماً.
> **وجه الشبه:** المسار = `route` | التحديث = `dynamic routing`

#### 🎯 الملخص السريع
- تُحدّد مسار الرسالة (`routing`)
- ترسل `hop by hop`
- تتحكم في الازدحام
- تخفي فروق الشبكات المختلفة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Network Layer: Determines routes from source to destination. Send messages hop by hop to the destination. Control of congestion. Manages billing information. Address mapping. Interconnection of heterogeneous networks — Hides differences of various networks such as length of packets. In broadcast networks, the routing problem is simple, so the network layer is often thin or even nonexistent.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط
- ℹ️ إضافة من الدليل: التشبيه بالـGPS

</details>

---

### 8.4. Transport Layer (طبقة النقل — الطبقة 4)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**طبقة النقل هي أول طبقة `end-to-end` حقيقية — تضمن أن تصل البيانات بالترتيب الصحيح وكاملةً بين المصدر والهدف النهائي.**

---

#### 📖 الشرح

- **قد تُحدّد الشبكة المناسبة** للاتصال
- **تُقسّم البيانات** من طبقة الجلسة إلى قطع أصغر (`segments`) وترسلها لطبقة الشبكة
- **تُعيد التجميع:** تضمن أن القطع تصل بالترتيب الصحيح عند المستقبل
- **`Flow Control`** بين المصدر والهدف النهائي (ليس فقط العقدتين المتجاورتين)

**إدارة الاتصال (`Connection Management`):**
- تُنشئ وتُنهي الاتصالات
- يمكنها إنشاء اتصالات متعددة لتطبيق عالي الإنتاجية
- `Multiplexing`: دمج عدة اتصالات `transport` على اتصال `network` واحد

#### مهم للامتحان ⚠️:
> **`end-to-end`:** برنامج المصدر يتحادث مباشرةً مع برنامج الهدف — بخلاف الطبقات الدنيا التي تتعامل مع عقدة مجاورة فقط.

#### 💡 التشبيه:
> كشركة شحن تضمن وصول صناديق الكمبيوتر المقطّعة لمحطات مختلفة وإعادة تجميعها بالترتيب الصحيح عند العميل.
> **وجه الشبه:** الصناديق = `segments` | ترقيمها = `sequence numbers`

#### 🎯 الملخص السريع
- أول طبقة `end-to-end` حقيقية
- تُقسّم البيانات وتُعيد تجميعها
- `Flow control` من مصدر لهدف
- تدير الاتصالات و`multiplexing`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Transport Layer: May determine which network to use. Accepts data from session layer, splits it into smaller units if needed, and passes information to network layer. Ensures pieces all arrive correctly at receiver and reassembles them into the original order. Flow control between source and destination. Connection management: Establish and delete connections. Might establish multiple connections for a high throughput application. May multiplex several transport connections onto the same network connection. True end-to-end layer. At this layer, the program on the source machine carries on a conversation with a similar program on the destination machine.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط
- ℹ️ إضافة من الدليل: التشبيه، التمييز end-to-end

</details>

---

### 8.5. Session Layer (طبقة الجلسة — الطبقة 5)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**طبقة الجلسة تُنشئ وتُدير وتُنهي الجلسات بين تطبيقين — كمدير الحوار يحدد من يتكلم ومتى.**

---

#### 📖 الشرح

- **إنشاء الجلسة:** تسمح لتطبيقين على حاسوبين مختلفين بإنشاء اتصال منطقي
- **التزامن (`Synchronisation`):** تُحدّد متى يُرسل كل طرف ومتى يستمع
- **استعادة الأخطاء (`Session Error Recovery`):** تستعيد الجلسة بعد الانقطاع
- **`Bracketing`:** تُحدّد عمليات يجب أن تبدو للمستخدم كعملية واحدة (مثل معاملة قاعدة بيانات `database transaction`)
- **الاستخدامات:** تسجيل دخول عن بُعد (`remote login`)، نقل ملفات عن بُعد (`remote file transfer`)

#### 💡 التشبيه:
> كمحضر الاجتماع — يُسجّل من تكلّم، متى، ويُعيد ترتيب الجلسة إذا انقطع التيار.
> **وجه الشبه:** الاجتماع = `session` | المحضر = `session layer`

#### 🎯 الملخص السريع
- تُنشئ وتُدير الجلسات
- تُزامن من يرسل ومن يستقبل
- `transaction` = مجموعة عمليات تبدو كعملية واحدة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Session Layer: Allows applications on two different computers to establish a session or logical connection. May coordinate the process by determining when each is to send or listen (synchronisation). Session error recovery. Brackets operations that must appear to the user as a single transaction (database). Used in some applications, such as remote login, remote file transfer.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط
- ℹ️ إضافة من الدليل: التشبيه بمحضر الاجتماع

</details>

---

### 8.6. Presentation Layer (طبقة العرض — الطبقة 6)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**طبقة العرض تضمن أن البيانات تُقدَّم بصيغة يفهمها المستلم — تُخفي الفروق بين تمثيلات البيانات المختلفة.**

---

#### 📖 الشرح

- **تخفي فروق الترميز:** حاسوب `A` يستخدم `ASCII`، حاسوب `B` يستخدم `EBCDIC` — طبقة العرض تُترجم
- **تضغط البيانات (`Data Compression`):** لتقليل حجم ما يُرسَل
- **تشفير وفكّ تشفير (`Encryption/Decryption`):** لحماية البيانات أثناء الإرسال
- **تهتم بـ `syntax` و`semantics`** — شكل البيانات ومعناها

#### 🔄 قبل / بعد: Encryption

**قبل:**
```
Hello World  ← بيانات عادية مقروءة
```

**بعد:**
```
X7#kL!9qZ2   ← بيانات مشفّرة غير مقروءة للمتنصّت
```

**ماذا تغيّر؟** طبقة العرض شفّرت البيانات لحماية السرية أثناء الإرسال.

#### 💡 التشبيه:
> كمترجم في اجتماع دولي — يأخذ الكلام بلغة ويُحوّله للغة أخرى دون أن يُغيّر المعنى.
> **وجه الشبه:** اللغة = `data format (ASCII/EBCDIC)` | المترجم = `Presentation Layer`

#### 🎯 الملخص السريع
- تُترجم بين `ASCII` و`EBCDIC` وغيرها
- تُشفّر وتفكّ تشفير البيانات
- تضغط البيانات
- تهتم بالشكل والمعنى (`syntax & semantics`)

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Presentation Layer: Responsible for presenting data in a format its user can understand. Hides character encoding differences. Translates data formats, such as EBCDIC and ASCII. May provide security services such as encryption and decryption. Data compression. Concerned with the syntax and semantics of the information transmitted.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط
- ℹ️ إضافة من الدليل: جدول قبل/بعد، التشبيه

</details>

---

### 8.7. Application Layer (طبقة التطبيق — الطبقة 7)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**طبقة التطبيق هي أعلى طبقة — تتواصل مع المستخدم أو برامج التطبيق مباشرةً وتُقدّم خدمات الشبكة لها.**

---

#### 📖 الشرح

- تتواصل مباشرةً مع المستخدم أو برامج التطبيق
- **ليست التطبيق نفسه** — بل هي الطبقة التي تُقدّم خدمات للتطبيق
- تُقدّم خدمات وبروتوكولات لـ:
  - البريد الإلكتروني (`email`)
  - نقل الملفات (`file transfer`)
  - المحطات الافتراضية (`virtual terminal`)

#### الفهم الخاطئ ❌:
طبقة التطبيق = برنامج مثل `Chrome` أو `Outlook`

#### الفهم الصحيح ✅:
طبقة التطبيق = الخدمات التي يستخدمها `Chrome` أو `Outlook` (مثل `HTTP`, `SMTP`) — البرنامج يقع فوق هذه الطبقة، ليس داخلها.

#### 🎯 الملخص السريع
- أعلى طبقة في `OSI`
- تُقدّم خدمات للتطبيقات (بريد، نقل ملفات، `virtual terminal`)
- ليست التطبيق — بل ما يخدم التطبيق

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Application Layer: Communicates with the user or application programs. Not the same as an application program. Provides services and protocols for electronic mail, file transfers, virtual terminal.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط
- ℹ️ إضافة من الدليل: تصحيح المفهوم الخاطئ الشائع

</details>

---

### 9. ملاحظات عملية على نموذج OSI
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`OSI` نموذج مرجعي مثالي — التطبيقات الحقيقية (كالإنترنت) تُعدّله حسب الحاجة.**

---

#### 📖 الشرح

- `OSI` **دليل تصميم** — ليس بروتوكولات فعلية
- ليس كل الطبقات مستخدمة دائماً:
  - الإنترنت (`TCP/IP`) يستخدم **5 طبقات** فقط
- يمكن دمج طبقات:
  - الطبقات العليا الثلاث (5، 6، 7) تُدمَج عادةً في طبقة واحدة في التطبيقات الحديثة

#### 🎯 الملخص السريع
- `OSI` = دليل، ليس بروتوكول
- `TCP/IP` = 5 طبقات عملية
- الطبقات 5+6+7 غالباً مدموجة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> OSI model is just a guideline for protocol design, not the actual protocols. Not all layers are always used — Internet uses only five layers. Some layers may be combined together — Top three layers are normally combined into one layer.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع النقاط

</details>

---

### 10. Standards (المعايير)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**المعايير تضمن أن تعمل أجهزة من شركات مختلفة معاً — وهي نوعان: `de facto` (السوق يفرضها) و`de jure` (هيئات رسمية تضعها).**

---

#### 📖 الشرح

| النوع | المعنى | الآلية | مثال |
|-------|--------|--------|------|
| **`De facto`** | "بحكم الأمر الواقع" | السوق والانتشار الواسع يجعلها معياراً | `Windows OS`, `PDF` |
| **`De jure`** | "بحكم القانون" | هيئات رسمية تُطوّرها وتعترف بها | `OSI`, `ASCII`, `RS-232` |

#### 🎯 الملخص السريع
- `de facto` = يفرضها السوق
- `de jure` = تُقرّها هيئات رسمية

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Standards: De facto — Market factors. De jure (by law) — Formally developed and recognised by standards bodies.

**ملاحظة على التغطية:**
- ✓ تم شرح: النوعان + جدول مقارن
- ℹ️ إضافة من الدليل: أمثلة على كل نوع

</details>

---

### 11. Standards Organisations (منظمات المعايير)
<!-- @render: {type: "prose-first", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**منظمات دولية متخصصة تضع المعايير التي تُتيح التوافق بين الأجهزة والشبكات حول العالم.**

---

#### 📊 جدول منظمات المعايير

| المنظمة | الاسم الكامل | مجالها | أمثلة على معاييرها |
|---------|-------------|---------|-------------------|
| **`ANSI`** | American National Standards Institute | أمريكية | `FDDI`, `ASCII` |
| **`ITU`** | International Telecommunications Union (CCITT سابقاً) | الاتصالات | `X.25`, `ATM` |
| **`EIA`** | Electronic Industries Association | إلكترونيات | `RS-232`, `RS-449` |
| **`IEEE`** | Institute of Electrical and Electronic Engineers | هندسة كهربائية | `Ethernet` وغيره من معايير `LAN` |
| **`ISO`** | International Organization for Standardization | دولية شاملة | نموذج `OSI` |
| **`IETF`** | Internet Engineering Task Force | الإنترنت | `IP`, `IPv6` |
| **`IBM`** | International Business Machines | (شركة) | `System Network Architecture (SNA)` |
| **`IEC`** | International Electrotechnical Commission | كهروتقنية | `JPEG` |

#### مهم للامتحان ⚠️:
> **`ITU`** كانت تُسمى سابقاً **`CCITT`** — قد تجد كلا الاسمين في المراجع القديمة.

#### 🎯 الملخص السريع
- `ANSI` → `FDDI`, `ASCII`
- `ITU`/`CCITT` → `X.25`, `ATM`
- `EIA` → `RS-232`
- `IEEE` → معايير `LAN` و`Ethernet`
- `ISO` → نموذج `OSI`
- `IETF` → `IP`, `IPv6`
- `IEC` → `JPEG`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> ANSI: American National Standards Institute — FDDI, ASCII. ITU: International Telecommunications Union, formerly called CCITT — X.25, protocol in ATM. EIA: Electronic Industries Association — RS-232, RS-449. IEEE: Institute of Electrical and Electronic Engineers — LAN standards, such as Ethernet. ISO: International Organization for Standardization — OSI model. IETF: Internet Engineering Task Force — Internet protocols, IP, IPv6. IBM: International Business Machines — System Network Architecture. IEC: International Electrotechnical Commission — JPEG.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع المنظمات
- ℹ️ إضافة من الدليل: الجدول المنظّم

</details>

---

## الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما تعريف شبكة الحاسوب؟
**A:** مجموعة أجهزة مستقلة (`autonomous`) مترابطة قادرة على تبادل المعلومات إلكترونياً `online`، وقد تشمل طابعات ومودمات.

### البطاقة 2
**Q2:** ما الفرق بين `LAN` و`WAN`؟
**A:** `LAN` تغطي مساحة صغيرة (مبنى/مجموعة مبانٍ). `WAN` تغطي مساحة كبيرة (مدينة/دولة/العالم).

### البطاقة 3
**Q3:** ما ميزة `Star Topology` وما عيبها الرئيسي؟
**A:** الميزة: نقطة مسؤولية واضحة وسهولة التشخيص. العيب: فشل الجهاز المركزي يُوقف الشبكة كلها.

### البطاقة 4
**Q4:** كيف يُنسَّق الإرسال في `Ring Topology`؟
**A:** بواسطة `token` (رمز خاص) يتنقل في الحلقة — الجهاز الذي يمسك الـ`token` فقط يستطيع الإرسال.

### البطاقة 5
**Q5:** ما مشكلة `Bus Topology` الرئيسية؟
**A:** `Collision` (التصادم) — إذا أرسل جهازان في نفس الوقت، تتداخل بياناتهما وتُتلف، مما يُضيّع `bandwidth`.

### البطاقة 6
**Q6:** ما تعريف `Protocol`؟
**A:** مجموعة قواعد تحكم تبادل أو إرسال البيانات إلكترونياً بين الأجهزة.

### البطاقة 7
**Q7:** ما المكونات الثلاثة لكل طبقة في نموذج `OSI`؟
**A:** `Service` (ماذا تفعل)، `Interface` (كيف تتكلم مع الجارات)، `Protocol` (شؤونها الداخلية).

### البطاقة 8
**Q8:** لماذا يُعدّ نموذج `OSI` مهماً رغم أنه ليس بروتوكولاً فعلياً؟
**A:** لأنه إطار مرجعي يُسهّل تصميم وتعديل بروتوكولات الشبكات — تغيير طبقة لا يؤثر على الأخريات طالما الـ`interface` نفسه.

### البطاقة 9
**Q9:** ما وظيفة `Physical Layer`؟ ولماذا تُسمى `bit pipe`؟
**A:** تُرسل بتات خام عبر الوسيط الفيزيائي دون فهم معناها — تُسمى `bit pipe` لأنها أنبوب يمرّر البتات فقط.

### البطاقة 10
**Q10:** ما الفرق بين `Flow Control` في `Data Link Layer` و`Transport Layer`؟
**A:** في `Data Link`: بين عقدتين متجاورتين فقط. في `Transport`: بين المصدر والهدف النهائيين (`end-to-end`).

### البطاقة 11
**Q11:** ما الطبقة التي تُعتبر أول طبقة `end-to-end` حقيقية؟
**A:** `Transport Layer` (الطبقة 4) — برنامج المصدر يتحادث مباشرةً مع برنامج الهدف.

### البطاقة 12
**Q12:** ما الذي تفعله `Presentation Layer`؟ اذكر ثلاث وظائف.
**A:** (1) تُترجم بين صيغ البيانات (`ASCII` ↔ `EBCDIC`)، (2) تُشفّر وتفكّ تشفير البيانات، (3) تضغط البيانات.

### البطاقة 13
**Q13:** ما الفرق بين معيار `de facto` ومعيار `de jure`؟
**A:** `de facto` يفرضه السوق والانتشار الواسع. `de jure` تُطوّره وتعترف به هيئات رسمية.

### البطاقة 14
**Q14:** أي منظمة وضعت نموذج `OSI`؟ وأيها تضع معايير الإنترنت؟
**A:** `ISO` وضعت نموذج `OSI`. `IETF` تضع معايير الإنترنت (`IP`, `IPv6`).

### البطاقة 15
**Q15:** كم طبقة يستخدم الإنترنت (`TCP/IP`) من نموذج `OSI`؟ وأي طبقات تُدمَج؟
**A:** 5 طبقات. الطبقات العليا الثلاث (Application + Presentation + Session) تُدمَج في طبقة واحدة.

---

## الجزء الرابع: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium, hard

---

### السؤال 1 (medium)

شبكة تربط أجهزة في مبنى واحد وتتميز بسرعة نقل عالية وتكلفة منخفضة — أي نوع هي؟

أ) `WAN`
ب) `LAN`
ج) `MAN`
د) `Fully Connected Network`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `LAN` تغطي مبنى واحد أو مجموعة مبانٍ وتتميز بسرعة عالية وتكلفة منخفضة
- ❌ **الخيار أ:** `WAN` تغطي مساحات جغرافية واسعة (دول/عالم) وتكلفتها أعلى
- ❌ **الخيار ج:** `MAN` تغطي مدينة بأكملها — أكبر من مبنى
- ❌ **الخيار د:** `Fully Connected` وصف لطوبولوجيا، ليس نوع شبكة بالمعنى الجغرافي

---

### السؤال 2 (medium)

في أي طوبولوجيا يُسبّب فشل جهاز واحد انهيار الشبكة بالكامل لأن الرسائل تمر عبره؟

أ) `Star Topology`
ب) `Bus Topology`
ج) `Ring Topology`
د) `Fully Connected Topology`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** في `Ring`، الرسائل تمر عبر كل جهاز — فشل واحد يكسر الحلقة ويوقف الكل
- ❌ **الخيار أ:** في `Star`، فشل جهاز طرفي لا يؤثر على البقية (فشل المركز هو المشكلة)
- ❌ **الخيار ب:** في `Bus`، فشل جهاز لا يوقف الخط المشترك بالضرورة
- ❌ **الخيار د:** `Fully Connected` يوفر مسارات بديلة — فشل جهاز لا يوقف الشبكة

---

### السؤال 3 (hard)

مدير شبكة يريد إضافة أجهزة بسهولة لكنه يقبل ارتفاع معدل التصادم — أي طوبولوجيا يختار؟

أ) `Star`
ب) `Ring`
ج) `Bus`
د) `Fully Connected`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `Bus` ميزتها الكبرى سهولة الإضافة والحذف، وعيبها ارتفاع `collision`
- ❌ **الخيار أ:** `Star` سهلة الإضافة لكنها تحتاج تمديد كابل لكل جهاز للمركز
- ❌ **الخيار ب:** `Ring` صعبة الإضافة — يجب كسر الحلقة
- ❌ **الخيار د:** `Fully Connected` مستحيلة الإضافة عملياً — تكلفة تربيعية

---

### السؤال 4 (medium)

ما الاسم الشائع لـ`Physical Layer` الذي يعكس وظيفتها البسيطة؟

أ) `Data pipe`
ب) `Bit pipe`
ج) `Signal tunnel`
د) `Frame carrier`

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** تُلقَّب بـ`bit pipe` لأنها تمرر البتات دون معالجة
- ❌ **الخيار أ:** `Data pipe` ليس الاسم المعتمد في المحاضرة
- ❌ **الخيار ج:** `Signal tunnel` غير وارد
- ❌ **الخيار د:** `Frame carrier` أقرب لوصف `Data Link Layer`

---

### السؤال 5 (hard)

حاسوب `A` (يستخدم `EBCDIC`) يريد التواصل مع حاسوب `B` (يستخدم `ASCII`). أي طبقة `OSI` تتولى الترجمة؟

أ) `Application Layer`
ب) `Session Layer`
ج) `Presentation Layer`
د) `Transport Layer`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `Presentation Layer` مسؤولة عن ترجمة صيغ البيانات وإخفاء الفروق في الترميز
- ❌ **الخيار أ:** `Application Layer` تتعامل مع التطبيق، ليس الترميز
- ❌ **الخيار ب:** `Session Layer` تدير الجلسات، لا ترجمة البيانات
- ❌ **الخيار د:** `Transport Layer` تقسّم البيانات وتُعيد تجميعها، لا ترجمة الصيغ

---

### السؤال 6 (hard)

أي طبقة `OSI` تُعدّ "أول طبقة `end-to-end` حقيقية" ولماذا؟

أ) `Network Layer` لأنها تحدد المسار
ب) `Session Layer` لأنها تُنشئ الجلسة
ج) `Transport Layer` لأن البرنامج المصدر يتحادث مع برنامج الهدف مباشرةً
د) `Application Layer` لأنها تتعامل مع المستخدم

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `Transport Layer` هي أول طبقة تُجري محادثة حقيقية بين البرنامجين المصدر والهدف — الطبقات الأدنى تتعامل مع عقد مجاورة فقط
- ❌ **الخيار أ:** `Network Layer` ترسل `hop by hop` — تتعامل مع العقدة التالية
- ❌ **الخيار ب:** `Session Layer` فوق `Transport` ولا تعدّ الأولى
- ❌ **الخيار د:** `Application Layer` ليست أول طبقة `end-to-end`

---

### السؤال 7 (medium)

ما الذي تُعرّفه `Service` في سياق طبقات `OSI`؟

أ) كيف تعمل الطبقة داخلياً
ب) ما تُقدّمه الطبقة للطبقة الأعلى منها
ج) كيف تتصل الطبقة بالطبقات المجاورة
د) البروتوكول المستخدم داخل الطبقة

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `Service` = ما تفعله الطبقة (ليس كيف تفعله)
- ❌ **الخيار أ:** هذا وصف `Protocol`
- ❌ **الخيار ج:** هذا وصف `Interface`
- ❌ **الخيار د:** هذا أيضاً وصف `Protocol`

---

### السؤال 8 (hard)

شبكة تستخدم `backbone` لربط عدة شبكات `LAN` عبر `bridges` — ما الاسم المناسب لهذا التصميم؟

أ) `Star Topology`
ب) `Ring Topology`
ج) `Bus Topology`
د) `Combined Topology`

**الإجابة الصحيحة: د**

**التعليل:**
- ✅ **الخيار د:** `Combined Topology` هو المزيج الواقعي — `LAN` محلية + `backbone` مشترك + `bridges`
- ❌ **الخيار أ:** `Star` تتمحور حول جهاز مركزي واحد
- ❌ **الخيار ب:** `Ring` حلقة دائرية
- ❌ **الخيار ج:** `Bus` خط مشترك واحد

---

### السؤال 9 (medium)

أي من التالي مثال على معيار `de facto`؟

أ) نموذج `OSI` من `ISO`
ب) بروتوكول `X.25` من `ITU`
ج) `Windows` كنظام تشغيل سائد
د) معيار `ASCII` من `ANSI`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `Windows` أصبح معياراً بحكم السوق، لا بقرار هيئة رسمية — مثال كلاسيكي على `de facto`
- ❌ **الخيار أ:** `OSI` وضعته `ISO` رسمياً = `de jure`
- ❌ **الخيار ب:** `X.25` وضعته `ITU` رسمياً = `de jure`
- ❌ **الخيار د:** `ASCII` وضعه `ANSI` رسمياً = `de jure`

---

### السؤال 10 (hard)

شبكة `bus` تحتوي على 20 جهازاً. ما أكبر مشكلة متوقعة مع زيادة عدد الأجهزة؟

أ) فشل الجهاز المركزي
ب) كسر الحلقة عند انقطاع جهاز
ج) ارتفاع معدل `collision` وضياع `bandwidth`
د) زيادة تكلفة الكابلات تربيعياً

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** كلما زادت الأجهزة على `bus` مشترك، زاد احتمال أن يرسل جهازان معاً → `collision` → ضياع `bandwidth`
- ❌ **الخيار أ:** مشكلة `Star Topology`، لا `Bus`
- ❌ **الخيار ب:** مشكلة `Ring Topology`
- ❌ **الخيار د:** مشكلة `Fully Connected Topology`

---

### السؤال 11 (hard)

أي طبقات `OSI` تُعنى أساساً بتفاصيل نقل البيانات داخل الشبكة (لا `end-to-end`)؟

أ) الطبقات 5، 6، 7
ب) الطبقات 4، 5، 6
ج) الطبقات 1، 2، 3
د) الطبقات 2، 3، 4

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** الطبقات الدنيا الثلاث (Physical + Data Link + Network) تتعامل مع تفاصيل نقل البيانات في الشبكة
- ❌ **الخيار أ:** الطبقات 5-7 هي طبقات خدمات المستخدم
- ❌ **الخيار ب:** الطبقة 4 هي `Transport` = أول طبقة `end-to-end`
- ❌ **الخيار د:** يشمل `Transport` التي هي `end-to-end`

---

### السؤال 12 (medium)

أي منظمة مسؤولة عن معايير الإنترنت مثل `IP` و`IPv6`؟

أ) `ISO`
ب) `IEEE`
ج) `IETF`
د) `ITU`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `IETF` (Internet Engineering Task Force) تضع معايير الإنترنت
- ❌ **الخيار أ:** `ISO` تضع نموذج `OSI`
- ❌ **الخيار ب:** `IEEE` تضع معايير `LAN` و`Ethernet`
- ❌ **الخيار د:** `ITU` تضع معايير الاتصالات (`X.25`, `ATM`)

---

### السؤال 13 (hard)

تطبيق يريد إرسال ملف كبير عبر شبكة — أي طبقة تُقسّم الملف إلى قطع أصغر وتضمن وصولها بالترتيب؟

أ) `Network Layer`
ب) `Data Link Layer`
ج) `Session Layer`
د) `Transport Layer`

**الإجابة الصحيحة: د**

**التعليل:**
- ✅ **الخيار د:** `Transport Layer` تقبل البيانات من طبقة الجلسة، تقسّمها، وتضمن وصولها مرتبةً `end-to-end`
- ❌ **الخيار أ:** `Network Layer` توجّه الحزم، لا تضمن الترتيب
- ❌ **الخيار ب:** `Data Link Layer` تُقسّم الرسائل إلى `frames` بين عقدتين متجاورتين فقط
- ❌ **الخيار ج:** `Session Layer` تدير الجلسات، لا تقسيم البيانات

---

### السؤال 14 (hard)

نموذج `OSI` في تطبيق الإنترنت (`TCP/IP`) يستخدم 5 طبقات. أي ثلاث طبقات من `OSI` تُدمَج في طبقة واحدة؟

أ) Physical + Data Link + Network
ب) Network + Transport + Session
ج) Session + Presentation + Application
د) Transport + Session + Presentation

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** الطبقات العليا الثلاث (5+6+7) تُدمَج في طبقة `Application` في نموذج `TCP/IP`
- ❌ **الخيار أ:** هذه الطبقات الدنيا تبقى منفصلة في `TCP/IP`
- ❌ **الخيار ب:** يشمل `Transport` التي تبقى مستقلة في `TCP/IP`
- ❌ **الخيار د:** `Transport` تبقى مستقلة في `TCP/IP`

---

### السؤال 15 (hard)

أي طبقة `OSI` تتعامل مع `database transactions` وتجعل مجموعة عمليات تبدو كعملية واحدة للمستخدم؟

أ) `Application Layer`
ب) `Presentation Layer`
ج) `Transport Layer`
د) `Session Layer`

**الإجابة الصحيحة: د**

**التعليل:**
- ✅ **الخيار د:** `Session Layer` تُقوسّ (`brackets`) العمليات التي يجب أن تبدو كـ`single transaction`
- ❌ **الخيار أ:** `Application Layer` تُقدّم خدمات للتطبيق، لا تدير `transactions`
- ❌ **الخيار ب:** `Presentation Layer` تهتم بصيغة البيانات
- ❌ **الخيار ج:** `Transport Layer` تتعامل مع النقل والتجميع، لا `transactions`

---

### السؤال 16 (hard)

سيناريو: شبكة `Ring` انقطع فيها أحد الأجهزة. ما التأثير الفوري؟

أ) تستمر الشبكة لأن كل جهاز متصل بالبقية مباشرةً
ب) ينقطع الاتصال بين الأجهزة المجاورة للجهاز المعطوب فقط
ج) تنهار الشبكة بالكامل لأن الحلقة تنكسر
د) تتحول الشبكة تلقائياً لطوبولوجيا `Star`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** في `Ring`، الرسائل تمر عبر كل الأجهزة — انقطاع واحد = كسر الحلقة = إيقاف الشبكة
- ❌ **الخيار أ:** هذا وصف `Fully Connected` — في `Ring` لا توجد مسارات بديلة
- ❌ **الخيار ب:** التأثير ليس محدوداً — الحلقة كلها تتوقف
- ❌ **الخيار د:** لا تحوّل تلقائي بين الطوبولوجيات

---

## الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة
| المصطلح | التعريف القصير |
|---------|---------------|
| `Computer Network` | مجموعة أجهزة مستقلة مترابطة تتبادل البيانات `online` |
| `LAN` | شبكة محلية — مبنى أو مجموعة مبانٍ |
| `WAN` | شبكة واسعة — مدينة أو دولة أو العالم |
| `Topology` | طريقة تنظيم الاتصالات الفيزيائية بين الأجهزة |
| `Protocol` | قواعد تحكم تبادل البيانات إلكترونياً |
| `OSI` | نموذج مرجعي من 7 طبقات لتصميم بروتوكولات الشبكات |
| `Token` | رمز يُمرَّر في `Ring Topology` لتحديد من يُرسل |
| `Collision` | تداخل بيانات جهازين يُرسلان في نفس الوقت على `Bus` |
| `Frame` | وحدة البيانات في `Data Link Layer` |
| `Routing` | تحديد المسار من المصدر للهدف في `Network Layer` |
| `End-to-End` | اتصال مباشر بين برنامجي المصدر والهدف (`Transport Layer`) |
| `de facto` | معيار فرضه السوق، لا هيئة رسمية |
| `de jure` | معيار أقرّته هيئة رسمية |

---

### 🔑 جدول مقارنة الطوبولوجيات

| المعيار | `Star` | `Ring` | `Bus` | `Fully Connected` |
|---------|--------|--------|-------|-------------------|
| **التحكم** | مركزي | موزع (`token`) | موزع | موزع |
| **فشل جهاز** | طرفي: لا يؤثر / مركزي: يوقف الكل | يوقف الحلقة | لا يوقف الـ`bus` | لا يوقف الشبكة |
| **إضافة جهاز** | سهل | صعب (كسر الحلقة) | سهل جداً | صعب جداً |
| **التكلفة** | متوسطة | متوسطة | منخفضة | مرتفعة جداً |
| **المشكلة الرئيسية** | فشل المركز | فشل محطة واحدة | `Collision` | تكلفة تربيعية |

---

### 🔑 الطبقات السبع لـ OSI — ملخص

| # | الطبقة | وحدة البيانات | الوظيفة الرئيسية | أمثلة |
|---|--------|--------------|-----------------|-------|
| 7 | `Application` | رسالة | خدمات المستخدم | `Email`, `FTP`, `Virtual Terminal` |
| 6 | `Presentation` | رسالة | ترجمة، تشفير، ضغط | `ASCII`↔`EBCDIC`, `Encryption` |
| 5 | `Session` | رسالة | إنشاء وإدارة الجلسات | `Remote Login`, `DB Transaction` |
| 4 | `Transport` | `Segment` | نقل `end-to-end`، تجميع | `TCP`, `UDP` |
| 3 | `Network` | `Packet` | توجيه، `hop by hop` | `IP`, `Router` |
| 2 | `Data Link` | `Frame` | إرسال بين عقدتين، كشف أخطاء | `MAC`, `LLC`, `CRC` |
| 1 | `Physical` | `Bit` | إرسال إشارات فيزيائية | `RS-232`, `Ethernet cable` |

---

### 🔑 منظمات المعايير — ملخص

| المنظمة | المعيار المهم |
|---------|-------------|
| `ISO` | نموذج `OSI` |
| `IETF` | `IP`, `IPv6` |
| `IEEE` | `Ethernet`, معايير `LAN` |
| `ANSI` | `FDDI`, `ASCII` |
| `ITU` (CCITT) | `X.25`, `ATM` |
| `EIA` | `RS-232`, `RS-449` |
| `IEC` | `JPEG` |

---

### 🔑 القواعد الذهبية لا تُنسى

| # | القاعدة |
|---|---------|
| 1 | `OSI` = نموذج إرشادي فقط — ليس بروتوكولاً فعلياً |
| 2 | الطبقات 1-3 = تفاصيل نقل الشبكة / الطبقات 4-7 = خدمات المستخدم |
| 3 | `Transport Layer` = أول طبقة `end-to-end` حقيقية |
| 4 | `Ring` فشل جهاز واحد = توقف كامل / `Star` فشل طرفي = لا تأثير |
| 5 | `Bus` ميزتها: سهولة الإضافة / عيبها: `collision` |
| 6 | الإنترنت (`TCP/IP`) = 5 طبقات فقط (الثلاث العليا مدموجة) |
| 7 | `de facto` = السوق / `de jure` = هيئات رسمية |

---

### 🔑 قاموس المصطلحات

| المصطلح | المعنى |
|---------|--------|
| `Autonomous` | مستقل — يعمل بذاته بدون الاعتماد على جهاز آخر |
| `Token` | رمز تحكم في `Ring` يُحدّد من يملك حق الإرسال |
| `Collision` | تصادم البيانات حين يرسل جهازان في نفس الوقت على `Bus` |
| `Hop by hop` | إرسال الرسالة محطة محطة حتى الهدف |
| `Frame` | وحدة بيانات `Data Link Layer` — رسالة منسقة مع عنوان |
| `Multiplexing` | دمج عدة اتصالات منطقية على قناة واحدة |
| `Backbone` | الخط الرئيسي المشترك الذي يربط شبكات `LAN` في `Combined Topology` |
| `Bridge` | جهاز يربط شبكتين `LAN` مختلفتين |
| `Bit pipe` | اللقب الشائع لـ`Physical Layer` — تمرر البتات فقط دون فهمها |
| `CRC` | Cyclic Redundancy Check — أداة كشف الأخطاء في `Data Link Layer` |
| `Syntax` | شكل البيانات |
| `Semantics` | معنى البيانات |
