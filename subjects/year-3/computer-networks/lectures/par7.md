# المحاضرة 10 — Flow & Error Control (التحكم في التدفق والأخطاء)
> **المادة:** الشبكات وأمن البيانات (نظري) | **الموضوع:** التحكم في تدفق الإطارات واكتشاف الأخطاء وتصحيحها في طبقة `Data Link`

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> هذه المحاضرة تشرح كيف تتفاهم أجهزة الشبكة على إرسال البيانات بترتيب وبدون خسارة — من خلال بروتوكولات التحكم في التدفق والأخطاء على مستوى `Data Link Layer`.

### 🎯 ستتعلم
- **`Flow Control`** — لماذا نحتاج للتحكم في معدل الإرسال وكيف يعمل
- **`Frame Format`** — بنية الإطار وحقوله الأساسية (`ACK`, `CRC`, `Number`)
- **`Channel Utilisation`** — كيف نقيس كفاءة القناة رياضياً وأين تضيع النسبة
- **`Sliding Window Protocol`** — البروتوكول الذكي الذي يوازن بين السرعة والموثوقية
- **`Stop-and-Wait` vs `Unrestricted`** — البروتوكولات البسيطة وعيوبها

### 📚 المتطلبات السابقة
- **`OSI Model`** — لأن بروتوكولات هذه المحاضرة تعمل في طبقة `Data Link` (الطبقة 2)
- **`CRC` / `Error Detection`** — لأن حقل `CRC` في الإطار يُستخدم لاكتشاف الأخطاء
- **`Frames`** — لأن كل ما نتحدث عنه يدور حول إرسال واستقبال `frames`

### 💡 الأفكار الرئيسية
1. **`Flow Control`:** عندما يكون المُرسِل أسرع من المستقبل، يجب وجود آلية لإيقاف الإرسال مؤقتاً — بدون هذا تضيع البيانات في `buffers` ممتلئة.
2. **`Channel Utilisation`:** ليس كل وقت القناة يُستخدم لإرسال بيانات — جزء منه يذهب للانتظار والإشارات، والهدف زيادة النسبة المفيدة.
3. **`Sliding Window`:** البروتوكول الأذكى — يسمح بإرسال عدة إطارات قبل انتظار الـ`ACK`، مما يزيد كفاءة القناة بشكل كبير.

### 🔗 كيف تتصل هذه المحاضرة بالمحاضرات الأخرى؟
- **السابقة:** `Data Integrity` علّمك كيف نكتشف الأخطاء (`CRC`, `Parity`) ← الآن نبني عليها: ماذا نفعل عند اكتشاف خطأ؟
- **القادمة:** هذه ستُستخدم في `Data Link Layer Standards` (مثل `Ethernet`) لفهم كيف تطبّق هذه البروتوكولات في الواقع

### ⚠️ الأخطاء الشائعة الواجب تجنبها
- ❌ الخلط بين `Flow Control` (إدارة سرعة الإرسال) و`Error Control` (اكتشاف الأخطاء وتصحيحها) — هما مختلفان
- ❌ الاعتقاد أن `Stop-and-Wait` هو الأفضل لأنه "بسيط" — هو الأبطأ وأقل كفاءة
- ❌ نسيان أن `ACK frame` يحتوي على رقم الإطار الذي يؤكده، وليس مجرد "تمام"
- ❌ الخلط بين `window size = 1` (يساوي `Stop-and-Wait`) وبين `window size = unlimited` (يساوي `Unrestricted`)

---

## الجزء الثاني: الشرح التفصيلي (سطر بسطر / فقرة بفقرة)

---

### 1. لماذا نحتاج Flow and Error Control؟

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "OSI Model, Data Integrity"} -->

#### 💡 الفكرة الأساسية
**المُرسِل والمستقبل لا يعملان دائماً بنفس السرعة، والإطارات يمكن أن تُفقد أو تتلف — لذا نحتاج بروتوكولات تُنظّم الإرسال وتضمن وصول البيانات صحيحة.**

---

#### 📖 الشرح

المحاضرة تطرح أربعة أسئلة جوهرية تحدد المشكلة التي نحاول حلها:

**1. ماذا لو اختلفت سرعة المُرسِل والمستقبل؟**
إذا أرسل المُرسِل بيانات بسرعة أعلى مما يستطيع المستقبل استيعابه، تمتلئ ذاكرة `buffer` المستقبل وتضيع البيانات. الحل هو `Flow Control`.

**2. كيف يتعامل المستقبل مع الإطارات التالفة أو المفقودة؟**
إطار تالف لا يمكن استخدامه، وإطار مفقود كأنه لم يُرسَل. نحتاج بروتوكول يكتشف ذلك ويطلب إعادة الإرسال. الحل هو `Error Control`.

**3. ماذا لو لم يعرف المستقبل أنه سيستقبل رسالة؟**
بعض البروتوكولات تتطلب "مصافحة" أولية (`handshake`) قبل بدء الإرسال لضمان جاهزية المستقبل.

**4. كيف يعرف المُرسِل أن إطاراته ضاعت؟**
يستخدم `Timer` — إذا انتهى الوقت ولم يصل `ACK`، يُعيد الإرسال.

#### 💡 التشبيه:
> تخيّل أنك تُملي على صديقك ملاحظات بسرعة كبيرة — إذا كتابته أبطأ من كلامك، ستضيع معلومات. `Flow Control` هو قولك "اصبر، ارجع خطوة" عندما لا يستطيع متابعتك.
> **وجه الشبه:** سرعة الكلام = معدل الإرسال `R` | سرعة الكتابة = سعة `buffer` المستقبل

#### 🎯 الملخص السريع
- `Flow Control` = ينظّم **متى** يُرسل ومتى يتوقف
- `Error Control` = يضمن أن البيانات وصلت **بدون أخطاء**
- كلاهما يعمل في طبقة `Data Link` من نموذج `OSI`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> What if the sender and receiver work at different speeds? How should the receiver react to damaged frames or lost frames? What happens if a receiver does not know it is to receive a message? How can a sender figure out its frames get lost?
> Flow control: Defines the way multiple frames are sent and tracked. When to send frames and when to stop sending frames.
> Error control: Defines how to check frames for errors and what to do if errors occur. Ensure all frames arrive at their destination without errors.
> The protocols for flow control and error control belong to data link layer in OSI model.

**ملاحظة على التغطية:**
- ✓ تم شرح: الأسئلة الأربعة + تعريف `Flow Control` + تعريف `Error Control` + موقعهما في `OSI`
- ℹ️ إضافة من الدليل: تشبيه الإملاء والكتابة

</details>

---

### 2. التحكم الأساسي في التدفق — Basic Flow Control

<!-- @render: {type: "prose-first", visualization: "sequence", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_1"} -->

#### ⬅️ الربط مع السابق
عرفنا **لماذا** نحتاج `Flow Control` — الآن نشرح **الآلية** الأبسط لتطبيقه: `Signalling`.

#### 💡 الفكرة الأساسية
**`Signalling` هي الطريقة الأبسط للتحكم في التدفق — المستقبل يرسل إشارة يطلب فيها من المُرسِل التوقف أو الاستمرار.**

---

#### 📖 الشرح

آلية `Signalling` تعمل بأربع خطوات:

1. **المُرسِل يبدأ الإرسال** طالما المستقبل قادر على الاستقبال
2. **عندما يمتلئ `buffer` المستقبل**، يرسل إشارة للمُرسِل ("أوقف"/)
3. **المُرسِل يتوقف** فور استقبال الإشارة
4. **عندما يتفرّغ المستقبل**، يرسل إشارة أخرى ("استأنف")

#### 📊 المخطط: تسلسل Signalling

#### ما هذا المخطط؟
> يوضّح ترتيب الرسائل بين المُرسِل والمستقبل في بروتوكول `Signalling` — من البداية حتى إعادة الإرسال.

#### المشاركون:
| # | الاسم | النوع | الدور |
|---|---|---|---|
| 1 | `Sender` | مُرسِل | يُرسِل البيانات ويستقبل الإشارات |
| 2 | `Receiver` | مستقبل | يستقبل البيانات ويرسل إشارات التحكم |

#### تسلسل الخطوات:
| الخطوة | المرسل | المستقبل | الرسالة / الحدث | الملاحظات |
|---|---|---|---|---|
| 1 | `Sender` | `Receiver` | `data stream` | المستقبل لديه مساحة |
| 2 | `Receiver` | `Sender` | `signal (STOP)` | `buffers` تمتلئ |
| 3 | `Sender` | — | يتوقف عن الإرسال | ينتظر الإشارة التالية |
| 4 | `Receiver` | `Sender` | `signal (RESUME)` | المستقبل جاهز من جديد |
| 5 | `Sender` | `Receiver` | `data stream` | استُؤنف الإرسال |

```diagram
type: sequence
participants:
  - id: sender
    label: Sender
  - id: receiver
    label: Receiver
interactions:
  - step: 1
    from: sender
    to: receiver
    message: data stream (xxxxx...xxx)
    note: Receiver has buffer space
  - step: 2
    from: receiver
    to: sender
    message: signal — STOP
    note: Buffers filling up
  - step: 3
    from: sender
    to: receiver
    message: data stream continues briefly
    note: Sender still sends in-flight frames
  - step: 4
    from: receiver
    to: sender
    message: signal — RESUME
    note: Receiver ready again
  - step: 5
    from: sender
    to: receiver
    message: data stream resumes
    note: Normal flow restored
```

#### `Signalling` في الواقع

`Signalling` تُستخدم على مستويين:

- **في الأجهزة (`Hardware`):** بروتوكول `RS-232` (المعروف بـ`EIA-232`) يرسل إشارات على أسلاك محددة للدلالة على الجاهزية
- **في البرمجيات (`Software`):** عند تمرير الشاشة (`scroll`):
  - `X-ON` = `Ctrl-Q` ← استأنف الإرسال
  - `X-OFF` = `Ctrl-S` ← أوقف الإرسال

#### مهم للامتحان ⚠️:
> `X-ON` (`Ctrl-Q`) تعني "ابدأ/استأنف" — و`X-OFF` (`Ctrl-S`) تعني "أوقف". لا تخلطهما!

#### 💡 التشبيه:
> تخيّل طابوراً في البنك — أمين الصندوق يرفع يده إشارةً "تفضّل" عندما ينتهي مع الزبون السابق، ويضع لافتة "الشباك مغلق" عندما ينشغل.
> **وجه الشبه:** اللافتة = الإشارة `signal` | أمين الصندوق = `Receiver` | الزبون = `Sender`

#### 🎯 الملخص السريع
- `Signalling` = آلية بسيطة: المستقبل يُخبر المُرسِل بالتوقف أو الاستمرار
- تعمل على مستوى `Hardware` (`RS-232`) ومستوى `Software` (`X-ON`/`X-OFF`)
- `X-ON` = `Ctrl-Q` | `X-OFF` = `Ctrl-S`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Signalling: The sender transmits data as long as the receiver is able to receive. When the receiver cannot receive data, it sends a signal to the sender. When the sender receives the signal, it stops transmitting. When the receiver is ready again, it sends another signal to the sender so that the sender will transmit again.
> Signalling is used in both hardware and software. In hardware, RS-232 (EIA-232) sends signals over specified lines to indicate a state of readiness. In software, when a window scrolls, the following commands are used: X-ON: ctrl-Q; X-OFF: ctrl-S

**ملاحظة على التغطية:**
- ✓ تم شرح: الخطوات الأربع + التطبيق في `Hardware` و`Software` + `X-ON`/`X-OFF`
- ℹ️ إضافة من الدليل: تشبيه البنك + مخطط التسلسل

</details>

---

### 3. بروتوكولات الإطارات — Frame-based Protocols

<!-- @render: {type: "equation-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_2"} -->

#### ⬅️ الربط مع السابق
`Signalling` هي الفكرة العامة — الآن ننزل لمستوى أعمق: كيف تبدو البيانات المُرسَلة فعلياً؟ الجواب: `Frames`.

#### 💡 الفكرة الأساسية
**في طبقة `Data Link`، البيانات تُرسَل في وحدات تسمى `Frames` — وكل `frame` له تنسيق محدد يحتوي حقولاً للتحكم في التدفق والأخطاء.**

---

#### 📖 الشرح

`Frame` هو مجموعة `bytes` منظّمة وفق تنسيق محدد (مثل `Ethernet frame`).

#### 📐 تنسيق الإطار — Frame Format

| `Source` | `Destination` | `Number` | `ACK` | `Type` | `... Data ...` | `CRC` |
|---|---|---|---|---|---|---|

**شرح كل حقل:**

| الحقل | المعنى | ملاحظة |
|---|---|---|
| `Source` | عنوان محطة الإرسال | من أرسل؟ |
| `Destination` | عنوان محطة الاستقبال | لمن؟ |
| `Number` | رقم الإطار (يبدأ من 0) | إذا الحقل `k` بت، أكبر رقم = $2^k - 1$ |
| `ACK` | رقم الإطار الذي يؤكّد وصوله | يمكن إرساله مع بيانات (`piggybacking`) |
| `Type` | نوع الإطار: `data`, `ACK`, `NAK` | ما الغرض من هذا الإطار؟ |
| `Data` | المعلومة المُرسَلة | المحتوى الفعلي |
| `CRC` | بتات التحقق من الأخطاء | اكتشاف التلف |

#### 📐 المعادلة: رقم الإطار

$$\text{Frame Number} = N \mod 2^k$$

**الشرح:**
> $N$ = الرقم الحقيقي للإطار  
> $k$ = عدد بتات حقل الرقم  
> $2^k$ = عدد الأرقام المتاحة (من 0 إلى $2^k - 1$)

**مثال:** إذا $k = 3$ بت → أكبر رقم = $2^3 - 1 = 7$ → الأرقام من 0 إلى 7. الإطار رقم 8 سيُرقَّم = $8 \mod 8 = 0$.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا حقل `ACK` يمكن "تضمينه" مع البيانات (`piggybacking`)؟
> **لماذا هذا مهم؟** لأن إرسال `ACK` منفرد يضيع نطاقاً ترددياً — بدمجه مع البيانات نوفّر موارد الشبكة.

#### 💡 التشبيه:
> `Frame` يشبه مغلفاً بريدياً — عليه اسم المُرسِل (`Source`)، اسم المستقبل (`Destination`)، ورقم تسلسلي (`Number`)، ومحتوى (`Data`)، وختم تحقق (`CRC`).
> **وجه الشبه:** رقم الطرد البريدي = `Frame Number` | الختم = `CRC`

#### 🎯 الملخص السريع
- `Frame` = وحدة البيانات في طبقة `Data Link`
- 7 حقول: `Source`, `Destination`, `Number`, `ACK`, `Type`, `Data`, `CRC`
- رقم الإطار يعمل بنظام `modulo 2^k`
- `ACK` يمكن دمجه مع البيانات = `piggybacking`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> At data link layer, data are transmitted in frames. A frame is a group of bytes organized according to a specified format such as Ethernet frame. Frames can be carefully formatted for flow and error control.
> Source address, Destination address, Frame number (each frame numbered starting with 0; if field has k bits, largest number is 2^k - 1; frame number equals N modulo 2^k).
> ACK - An integer value designating the frame being acknowledged. It can be sent with data, which is called piggyback. Type of frame - data, ACK, NAK. Data - the information being transmitted. CRC - error checking bits.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع الحقول السبعة + معادلة رقم الإطار + `piggybacking`
- ℹ️ إضافة من الدليل: جدول مفصّل + مثال رقمي + تشبيه المغلف

</details>

---

### 4. بروتوكولات التحكم في الإطارات — Frame Oriented Control

<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_3"} -->

#### ⬅️ الربط مع السابق
عرفنا بنية الإطار — الآن نستخدمها في بروتوكولات عملية: **كيف نرسل الإطارات ونتأكد من وصولها؟**

#### 💡 الفكرة الأساسية
**هناك بروتوكولان أساسيان: `Unrestricted` (بلا قيود) و`Stop-and-Wait` (قف وانتظر) — وكل منهما يمثّل طرفاً في مقايضة السرعة مقابل الموثوقية.**

---

#### 📖 الشرح

#### 4.1. البروتوكول غير المقيّد — Unrestricted Protocol

في هذا البروتوكول البسيط (المبيَّن في الشكل 5.3):
- `Patron` (المستخدم) يسترجع المعلومة ويضعها في `frame`
- المُرسِل يُرسِل الإطارات **واحداً تلو الآخر** بلا توقف
- المستقبل يستخرج البيانات ويُسلّمها لـ`Patron`

**افتراضات `Unrestricted Protocol`:**
- المستقبل لديه سعة **غير محدودة** (`unlimited capacity`)
- لا توجد أي مشاكل في الإرسال

#### الفهم الخاطئ ❌:
`Unrestricted Protocol` هو الأفضل لأنه الأسرع.

#### الفهم الصحيح ✅:
`Unrestricted Protocol` **غير واقعي** — لا يوجد مستقبل بسعة لا نهائية. إنه نموذج نظري لقياس الأداء الأقصى.

---

#### 4.2. بروتوكول قف وانتظر — Stop-and-Wait Protocol

هذا البروتوكول أكثر واقعية:
1. المُرسِل يُرسِل إطار بيانات واحد
2. **ينتظر** `ACK` من المستقبل قبل إرسال الإطار التالي
3. المستقبل يُرسِل `ACK` لكل إطار يصله

**مشكلة `Stop-and-Wait`:** توظيف القناة منخفض (`low channel utilisation`) — معظم الوقت ضائع في الانتظار.

#### التحكم في الأخطاء مع `Stop-and-Wait`:
- `ACK` يُخبر المُرسِل أن الإطار وصل بدون تلف
- المُرسِل يضع `Timer` على كل إطار مُرسَل
- إذا انتهى الـ`Timer` ولم يصل `ACK` → يُعيد إرسال الإطار

#### 💡 التشبيه:
> `Stop-and-Wait` كأنك تُرسِل رسالة بريد عادية وتنتظر الرد قبل أن ترسل الرسالة التالية — بطيء جداً لكن مضمون.
> **وجه الشبه:** انتظار الرد = انتظار `ACK` | إعادة كتابة رسالة ضائعة = إعادة الإرسال بعد `Timer`

#### 🎯 الملخص السريع
- `Unrestricted`: أسرع، لكن افتراضي (سعة لا نهائية)
- `Stop-and-Wait`: أبطأ، لكن واقعي — ينتظر `ACK` قبل كل إطار
- `Timer` يُكشَف به ضياع الإطارات

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Unrestricted Protocol: Assumes the receiver has unlimited capacity. Does not consider any problems in transmission.
> Stop and Wait Protocol: Sender sends a data frame and then waits for an ACK frame from the receiver before sending the next data frame. Receiver sends an acknowledgment for each frame it gets. Problem: low channel utilisation.
> Error control based on Stop and Wait: The ACK frame tells the sender that the data frame has arrived at the destination uncorrupted. The sender sets a timer for the frame sent to the receiver. If no ACK frame is received by the time that the timer expires, it will resend the frame.

**ملاحظة على التغطية:**
- ✓ تم شرح: `Unrestricted` + `Stop-and-Wait` + `Error Control` + `Timer`
- ℹ️ إضافة من الدليل: تشبيه البريد العادي + توضيح لماذا `Unrestricted` غير واقعي

</details>

---

### 5. كفاءة القناة — Channel Utilisation

<!-- @render: {type: "equation-first", visualization: "none", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_4"} -->

#### ⬅️ الربط مع السابق
عرفنا أن `Stop-and-Wait` لديه مشكلة "توظيف القناة المنخفض" — هذا القسم يشرح كيف نقيسه بالأرقام.

#### 💡 الفكرة الأساسية
**`Channel Utilisation` = النسبة المئوية للوقت الذي تنقل فيه القناة بيانات فعلية (لا تشمل `ACK frames`).**

---

#### 📐 المتغيرات والرموز

| الرمز | المعنى | الوحدة |
|---|---|---|
| `R` | معدل الإرسال (`Transmission Rate`) | `bps` |
| `S` | سرعة الإشارة (`Signal Speed`) | `m/µsec` |
| `D` | المسافة بين المُرسِل والمستقبل | `meters` |
| `T` | وقت إنشاء إطار واحد | `µsec` |
| `F` | عدد بتات الإطار (الإجمالي) | `bits` |
| `N` | عدد بتات البيانات في الإطار | `bits` |
| `A` | عدد بتات إطار `ACK` | `bits` |

#### 📐 المعادلات الأساسية

**وقت إرسال الإطار إلى المستقبل:**
$$T_{frame \to receiver} = T + \frac{F}{R} + \frac{D}{S}$$

**وقت إرسال `ACK` إلى المُرسِل:**
$$T_{ACK \to sender} = T + \frac{A}{R} + \frac{D}{S}$$

---

#### 📐 حسابات الكفاءة لكل بروتوكول

**الزمن المنقضي بين إرسال إطارين متتاليين:**

| البروتوكول | الزمن | المعادلة |
|---|---|---|
| `Unrestricted` | وقت الإرسال فقط | $T + \frac{F}{R}$ |
| `Stop-and-Wait` | إرسال + انتظار `ACK` | $2(T + \frac{D}{S}) + \frac{F+A}{R}$ |

**كفاءة القناة (`Channel Utilisation`):**

$$\text{Utilisation}_{Unrestricted} = \frac{100 \times \frac{F}{R}}{T + \frac{F}{R}}$$

$$\text{Utilisation}_{Stop-and-Wait} = \frac{100 \times (\frac{F}{R} + \frac{D}{S})}{2(T + \frac{D}{S}) + \frac{F+A}{R}}$$

**معدل البيانات الفعّال (`Effective Data Rate`):**

$$\text{EDR}_{Unrestricted} = \frac{N}{T + \frac{F}{R}}$$

$$\text{EDR}_{Stop-and-Wait} = \frac{N}{2(T + \frac{D}{S}) + \frac{F+A}{R}}$$

#### 📖 الشرح
- $\frac{F}{R}$ = وقت إرسال الإطار بالكامل عبر القناة
- $\frac{D}{S}$ = وقت انتشار الإشارة (`Propagation Delay`) — الوقت لعبور المسافة
- في `Stop-and-Wait`، الرقم 2 يعكس الرحلة الذهاب والإياب (إطار + `ACK`)

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا يظهر $\frac{D}{S}$ مرتين في معادلة `Stop-and-Wait`؟
> **لماذا هذا مهم؟** لأن الإطار يقطع المسافة D مرة ذهاباً، والـ`ACK` يقطعها مرة إياباً — فالتأخير مضاعف.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Channel Utilisation: The percentage of time the channel is transferring data frames (i.e. not including ACK frames). Parameters: R, S, D, T, F, N, A. Time to send a frame to the receiver is T + F/R + D/S. Time to send an acknowledgment to the sender is T + A/R + D/S.
> For Unrestricted and Stop-and-Wait protocols: Elapsed time between consecutive frames: Unrestricted: T+F/R | Stop and wait: 2(T+D/S) + (F+A)/R. Channel utilisation: Unrestricted: 100*(F/R)/(T+F/R) | Stop and wait: 100*(F/R+D/S)/(2(T+D/S)+(F+A)/R)

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع المتغيرات + جميع المعادلات
- ℹ️ إضافة من الدليل: جدول المتغيرات + شرح سبب ضرب 2

</details>

---

### 6. مثال رقمي — Channel Utilisation Example

<!-- @render: {type: "equation-first", visualization: "trace", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_5"} -->

#### 💡 الفكرة الأساسية
**تطبيق المعادلات على قيم محددة يُظهر أثر كل بروتوكول على الكفاءة الفعلية للشبكة.**

---

#### 📐 المعطيات (Assumptions)

| الرمز | القيمة | ملاحظة |
|---|---|---|
| `R` | 10 Mbps = 10 bits/µsec | معدل الإرسال |
| `S` | 200 m/µsec | سرعة الإشارة |
| `D` | 200 m | المسافة |
| `T` | 1 µsec | وقت إنشاء إطار |
| `F` | 200 bits | حجم الإطار |
| `N` | 160 bits | البيانات الصافية |
| `A` | 40 bits | حجم `ACK` |

#### 🔍 تتبع التنفيذ: حسابات Unrestricted

**المدخل:** القيم أعلاه

| الخطوة | العملية | النتيجة |
|---|---|---|
| 1 | $\frac{F}{R} = \frac{200}{10} = 20$ µsec | وقت إرسال الإطار |
| 2 | $T + \frac{F}{R} = 1 + 20 = 21$ µsec | الزمن الكلي لدورة واحدة |
| 3 | $\text{Utilisation} = \frac{100 \times 20}{21} \approx 95\%$ | كفاءة القناة |
| 4 | $\text{EDR} = \frac{160}{21} \approx 7.6 \text{ Mbps}$ | معدل البيانات الفعّال |

**النتيجة:** كفاءة = **95%** | معدل فعّال = **7.6 Mbps**

---

#### 🔍 تتبع التنفيذ: حسابات Stop-and-Wait

**المدخل:** نفس القيم

| الخطوة | العملية | النتيجة |
|---|---|---|
| 1 | $\frac{D}{S} = \frac{200}{200} = 1$ µsec | تأخير الانتشار |
| 2 | $\frac{F+A}{R} = \frac{200+40}{10} = 24$ µsec | وقت إرسال الإطار + `ACK` |
| 3 | $2(T + \frac{D}{S}) + \frac{F+A}{R} = 2(1+1) + 24 = 28$ µsec | الزمن الكلي للدورة |
| 4 | $\frac{F}{R} + \frac{D}{S} = 20 + 1 = 21$ µsec | البسط (وقت نقل مفيد) |
| 5 | $\text{Utilisation} = \frac{100 \times 21}{28} = 75\%$ | كفاءة القناة |
| 6 | $\text{EDR} = \frac{160}{28} \approx 5.7 \text{ Mbps}$ | معدل البيانات الفعّال |

**النتيجة:** كفاءة = **75%** | معدل فعّال = **5.7 Mbps**

#### ⚖️ مقارنة سريعة: Unrestricted vs Stop-and-Wait (بالأرقام)

| المعيار | `Unrestricted` | `Stop-and-Wait` |
|---|---|---|
| **كفاءة القناة** | 95% | 75% |
| **معدل البيانات الفعّال** | 7.6 Mbps | 5.7 Mbps |
| **الواقعية** | غير واقعي | واقعي |

#### الدرس المستفاد:
> `Stop-and-Wait` يخسر 20% من الكفاءة مقارنة بـ`Unrestricted` — معظمها في الانتظار لاستقبال `ACK`. هذا هو الدافع للتفكير في بروتوكول أفضل: `Sliding Window`.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> R = 10 Mbps, S = 200 m/µsec, D = 200 m, T = 1 µsec, F = 200 bits, N = 160 bits, A = 40 bits.
> Unrestricted: Utilisation = 95%, EDR = 7.6 Mbps.
> Stop and wait: Utilisation = 75%, EDR = 5.7 Mbps.

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع الحسابات خطوة بخطوة + المقارنة
- ℹ️ إضافة من الدليل: جدول التتبع خطوة بخطوة + جدول المقارنة

</details>

---

### 7. بروتوكول النافذة المنزلقة — Sliding Window Protocol

<!-- @render: {type: "equation-first", visualization: "diagram", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_6"} -->

#### ⬅️ الربط مع السابق
`Stop-and-Wait` بطيء و`Unrestricted` غير واقعي — `Sliding Window` هو الحل الوسط الذكي.

#### 💡 الفكرة الأساسية
**`Sliding Window Protocol` يسمح بإرسال عدة إطارات قبل انتظار `ACK` — مع الحفاظ على ضمانات التسليم.**

---

#### 📖 الشرح

**المفهوم الأساسي:**
`Window` = مجموعة فرعية من الإطارات المتتالية. إذا كان حجم النافذة `i`، يمكن للمُرسِل إرسال `i` إطارات قبل أن يتوقف وينتظر `ACK`.

#### 📊 المخطط: Sliding Window

#### ما هذا المخطط؟
> يوضّح النافذة كمنطقة منزلقة على قائمة الإطارات — تتحرك للأمام عند تأكيد الإطارات وتسمح بإرسال إطارات جديدة.

#### وصف العُقد:
| # | العُقدة | النوع | الشرح |
|---|---|---|---|
| 1 | `Frames < w` | منطقة | إطارات مُرسَلة ومؤكَّدة بالكامل |
| 2 | `Window [w to w+i-1]` | منطقة | الإطارات التي يمكن أن تكون `outstanding` |
| 3 | `Frames >= w+i` | منطقة | إطارات لم تُرسَل بعد (خارج النافذة) |

```diagram
type: sequence
participants:
  - id: frames
    label: Sender Frames
interactions:
  - step: 1
    from: frames
    to: frames
    message: Frames < w → All acknowledged
    note: Window has passed them
  - step: 2
    from: frames
    to: frames
    message: Frames w to w+i-1 → Outstanding (sent, awaiting ACK)
    note: Current window
  - step: 3
    from: frames
    to: frames
    message: Frames >= w+i → Not yet sent
    note: Waiting for window to slide
```

#### قواعد `Sliding Window Protocol` (حجم النافذة = `i`، يبدأ من `w`):

1. كل إطار برقم **أقل من `w`** قد أُرسِل وأُكِّد (`sent and acknowledged`)
2. لا يُرسَل أي إطار برقم **أكبر من أو يساوي `w + i`**
3. كل إطار في النافذة **أُرسِل** لكن ربما لم يُأكَّد بعد → يُسمّى `outstanding frame`
4. إذا أُكِّد الإطار `j`، **تنزلق النافذة** إلى `j+1` (يمكن إرسال إطارات جديدة)

#### 📐 المعادلة: منطق النافذة

$$\text{Window} = \{w, w+1, w+2, \ldots, w+i-1\}$$

$$\text{إذا أُكِّد الإطار } j \Rightarrow \text{النافذة تصبح } \{j+1, j+2, \ldots, j+i\}$$

#### 🔍 تتبع التنفيذ: Sliding Window مثال (i=3, w=0)

**المدخل:** 6 إطارات، حجم النافذة = 3

| الخطوة | العملية | النافذة الحالية | `Outstanding` |
|---|---|---|---|
| 1 | إرسال إطارات 0, 1, 2 | {0,1,2} | 0,1,2 |
| 2 | وصول `ACK(0)` | {1,2,3} | 1,2,3 |
| 3 | وصول `ACK(1)` | {2,3,4} | 2,3,4 |
| 4 | وصول `ACK(2)` | {3,4,5} | 3,4,5 |

**النتيجة:** القناة مشغولة دائماً بدون انتظار

#### تحليل البروتوكول — Analysis

| الخاصية | التأثير |
|---|---|
| يسمح بإرسال إطارات متعددة قبل `ACK` | يزيد كفاءة القناة |
| `Window size = 1` | يصبح `Stop-and-Wait` |
| `Window size = ∞` | يصبح `Unrestricted` |
| تعديل حجم النافذة | يتحكم في حركة المرور وحجم `Buffer` |

#### مهم للامتحان ⚠️:
> `Sliding Window` يمكن اعتباره **تعميماً** لكل البروتوكولات: بتغيير حجم النافذة تحصل على `Stop-and-Wait` أو `Unrestricted` أو أي شيء بينهما.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** ماذا يحدث إذا كان حجم النافذة = عدد الإطارات الكلي؟
> **لماذا هذا مهم؟** يصبح البروتوكول مساوياً لـ`Unrestricted` — سيرسل الكل دفعة واحدة بدون انتظار أي `ACK`.

#### 💡 التشبيه:
> `Sliding Window` كطائر البريد يحمل 5 رسائل في حقيبته — يُسلِّمها جميعاً ويعود ليأخذ 5 جديدة عندما يتأكد التسليم. أفضل بكثير من طائر يحمل رسالة واحدة ويعود لكل رسالة!
> **وجه الشبه:** عدد الرسائل في الحقيبة = حجم النافذة | العودة بعد التسليم = انزلاق النافذة

#### 🎯 الملخص السريع
- `Window` = عدد الإطارات التي يمكن أن تكون `outstanding`
- الإطارات داخل النافذة: مُرسَلة لكن غير مؤكَّدة
- عند تأكيد إطار: النافذة تنزلق، وإطار جديد يُرسَل
- `Window = 1` ← `Stop-and-Wait` | `Window = ∞` ← `Unrestricted`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Sliding Window Protocol: Compromise between Unrestricted and Stop-and-Wait protocols. A window is defined as a subset of consecutive frames. Suppose the window size is i.
> Every frame numbered less than w has been sent and acknowledged. No frame numbered greater than or equal to w + i is sent. Every frame in the window has been sent, but may not be acknowledged. Those not acknowledged are called outstanding frames. If frame j is acknowledged, the window moves down to j+1.
> Analysis: It allows multiple frames to be sent before receiving acknowledgments. The maximum window size defines the maximum number of frames that may be outstanding. If the maximum window size is 1, it becomes the stop and wait protocol. If the window size is unrestricted, it becomes the unrestricted protocol. Adjusting the window size can help control the traffic on a network and change the buffering requirements.

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + القواعد الأربعة + التحليل الكامل + الحالات الخاصة
- ℹ️ إضافة من الدليل: جدول التتبع + تشبيه طائر البريد

</details>

---

### 8. مقارنة البروتوكولات — Comparison of Flow Control Protocols

<!-- @render: {type: "equation-first", visualization: "comparison-table", coverage: "100%"} -->
<!-- @connectivity: {prerequisite: "section_7"} -->

#### 💡 الفكرة الأساسية
**جميع البروتوكولات الأربعة المُناقَشة هي في الأساس حالات خاصة من `Sliding Window Protocol` بأحجام نوافذ مختلفة.**

---

#### ⚖️ مقارنة البروتوكولات الأربعة

| المعيار | `Stop-and-Wait` | `Unrestricted` | `Go-Back-N` | `Selective Repeat` |
|---|---|---|---|---|
| **حجم نافذة الإرسال** | إطار واحد | غير محدود | أقل من $2^K$ | أقل من أو يساوي $2^K$ - حجم نافذة الاستقبال |
| **حجم نافذة الاستقبال** | إطار واحد | غير محدود | إطار واحد | أقل من أو يساوي $2^K$ - حجم نافذة الإرسال |

#### ملاحظة:
> `Go-Back-N` و`Selective Repeat` هما بروتوكولان متقدمان لا تُغطّيهما هذه المحاضرة بالتفصيل، لكن الجدول يُبيّن موقعهما في المنظومة. **(شرح زيادة للفهم)**

**`Go-Back-N`:** عند وقوع خطأ، يُعيد المُرسِل إرسال الإطار الخاطئ وجميع الإطارات التالية له.

**`Selective Repeat`:** عند وقوع خطأ، يُعيد المُرسِل إرسال الإطار الخاطئ فقط دون غيره.

#### 🤔 تفعيل الفهم (اسأل نفسك):
> **سؤال:** لماذا حجم نافذة `Go-Back-N` يجب أن يكون أقل من $2^K$ وليس أقل من أو يساوي؟
> **لماذا هذا مهم؟** لأن إذا ساوى $2^K$ قد يحدث ارتباك بين الإطار الجديد والإطار المُعاد إرساله عند التعامل مع أرقام الإطارات الدورية.

#### 🎯 الملخص السريع
- كل البروتوكولات الأربعة = تنوعات من `Sliding Window`
- `Stop-and-Wait` = النافذة = 1
- `Unrestricted` = النافذة = ∞
- `Go-Back-N` و`Selective Repeat` = نوافذ محددة مع آليات تصحيح أخطاء مختلفة

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> The four flow control protocols discussed can be viewed as variations of a sliding window protocol.
> Table 5.1: Stop-and-Wait: Sending window = One frame, Receiving window = One frame. Unrestricted: Sending = Unlimited, Receiving = Unlimited. Go-back-N: Sending = Less than 2^K, Receiving = One frame. Selective Repeat: Sending = Less than or equal to 2^K minus receiving window size, Receiving = Less than or equal to 2^K minus sending window size.

**ملاحظة على التغطية:**
- ✓ تم شرح: الجدول الكامل + العلاقة مع `Sliding Window`
- ℹ️ إضافة من الدليل: شرح مبسّط لـ`Go-Back-N` و`Selective Repeat`

</details>

---

## الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما الفرق بين `Flow Control` و`Error Control`؟
**A:** `Flow Control` ينظّم متى يُرسِل المُرسِل (لمنع امتلاء `buffer` المستقبل)، بينما `Error Control` يضمن أن الإطارات تصل صحيحة وغير تالفة.

### البطاقة 2
**Q2:** ما هي طبقة `OSI` المسؤولة عن بروتوكولات `Flow Control` و`Error Control`؟
**A:** طبقة `Data Link` (الطبقة الثانية في نموذج `OSI`).

### البطاقة 3
**Q3:** ما هي حقول الإطار النموذجي (`Typical Frame Format`)؟
**A:** `Source`, `Destination`, `Number`, `ACK`, `Type`, `Data`, `CRC`.

### البطاقة 4
**Q4:** ما المقصود بـ`Piggybacking`؟
**A:** دمج `ACK` مع إطار بيانات يُرسَل في الاتجاه المعاكس، بدلاً من إرسال `ACK` منفرداً — لتوفير نطاق ترددي.

### البطاقة 5
**Q5:** إذا كان حقل رقم الإطار `k = 4` بت، ما أكبر رقم للإطار؟
**A:** $2^4 - 1 = 15$، أي الأرقام من 0 إلى 15. الإطار رقم 16 سيُرقَّم = $16 \mod 16 = 0$.

### البطاقة 6
**Q6:** ما مشكلة `Stop-and-Wait Protocol`؟
**A:** انخفاض كفاءة القناة (`Low Channel Utilisation`) — المُرسِل ينتظر `ACK` بعد كل إطار، مما يُضيّع معظم وقت القناة في الانتظار.

### البطاقة 7
**Q7:** ما دور `Timer` في `Stop-and-Wait`؟
**A:** المُرسِل يضع مؤقتاً (`Timer`) لكل إطار مُرسَل. إذا انتهى الوقت دون استقبال `ACK`، يُعيد إرسال الإطار تلقائياً.

### البطاقة 8
**Q8:** ما معادلة كفاءة القناة لـ`Unrestricted Protocol`؟
**A:** $\text{Utilisation} = \frac{100 \times \frac{F}{R}}{T + \frac{F}{R}}$

### البطاقة 9
**Q9:** ما معادلة كفاءة القناة لـ`Stop-and-Wait Protocol`؟
**A:** $\text{Utilisation} = \frac{100 \times (\frac{F}{R} + \frac{D}{S})}{2(T + \frac{D}{S}) + \frac{F+A}{R}}$

### البطاقة 10
**Q10:** باستخدام القيم: R=10 Mbps, S=200 m/µsec, D=200 m, T=1 µsec, F=200 bits, N=160 bits, A=40 bits — ما كفاءة `Stop-and-Wait`؟
**A:** 75%، ومعدل البيانات الفعّال = 5.7 Mbps.

### البطاقة 11
**Q11:** ما تعريف `Outstanding Frame` في `Sliding Window`؟
**A:** إطار داخل النافذة تم إرساله لكن لم يُستلَم `ACK` له بعد.

### البطاقة 12
**Q12:** ماذا يحدث للنافذة عند تأكيد الإطار `j` في `Sliding Window`؟
**A:** تنزلق النافذة للأمام لتبدأ من `j+1` — مما يسمح بإرسال إطار جديد.

### البطاقة 13
**Q13:** ما القيمة التي يجب أن يأخذها حجم النافذة في `Sliding Window` لكي يصبح مكافئاً لـ`Stop-and-Wait`؟
**A:** حجم النافذة = 1.

### البطاقة 14
**Q14:** ما الفرق بين `X-ON` و`X-OFF` في `Software Signalling`؟
**A:** `X-ON` = `Ctrl-Q` يعني "ابدأ/استأنف الإرسال" | `X-OFF` = `Ctrl-S` يعني "أوقف الإرسال".

### البطاقة 15
**Q15:** لماذا يُضاعَف تأخير الانتشار في معادلة `Stop-and-Wait`؟
**A:** لأن الإطار يقطع المسافة D مرة (ذهاباً إلى المستقبل)، والـ`ACK` يقطعها مرة أخرى (إياباً إلى المُرسِل) — فالتأخير الإجمالي = $2 \times \frac{D}{S}$.

### البطاقة 16
**Q16:** ما المبدأ الذي يجمع البروتوكولات الأربعة: `Stop-and-Wait`, `Unrestricted`, `Go-Back-N`, `Selective Repeat`؟
**A:** جميعها تنوعات من `Sliding Window Protocol` بأحجام نوافذ مختلفة.

---

## الجزء الرابع: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium, hard

---

### السؤال 1 (medium)

في `Stop-and-Wait Protocol`، متى يُعيد المُرسِل إرسال الإطار؟

أ) عند استقبال `NAK` فقط
ب) عند انتهاء `Timer` دون استقبال `ACK`
ج) بعد إرسال 3 إطارات متتالية
د) عند امتلاء `buffer` المستقبل

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** المُرسِل يضع `Timer` على كل إطار — إذا انتهى الوقت بدون `ACK`، يُعيد الإرسال تلقائياً.
- ❌ **الخيار أ:** `NAK` يُحفّز إعادة الإرسال أيضاً في بعض الأنظمة، لكن `Timer` هو الآلية المذكورة في المحاضرة لـ`Stop-and-Wait`.
- ❌ **الخيار ج:** `Stop-and-Wait` لا يرسل 3 إطارات — يرسل إطاراً واحداً فقط ثم ينتظر.
- ❌ **الخيار د:** امتلاء `buffer` المستقبل يتعلق بـ`Flow Control` وليس `Error Control`.

---

### السؤال 2 (medium)

ما المقصود بـ`Piggybacking` في الشبكات؟

أ) إرسال إطارين من البيانات في وقت واحد
ب) دمج `ACK` مع إطار بيانات يُرسَل في الاتجاه المعاكس
ج) ضغط البيانات قبل إرسالها
د) إرسال نفس الإطار مرتين لضمان الوصول

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `Piggybacking` يعني تضمين `ACK` مع إطار بيانات — بدلاً من إرسال `ACK` منفرداً — لتوفير النطاق الترددي.
- ❌ **الخيار أ:** إرسال إطارين في وقت واحد هو مفهوم مختلف.
- ❌ **الخيار ج:** الضغط (`Compression`) لا علاقة له بـ`Piggybacking`.
- ❌ **الخيار د:** الإرسال المضاعف يُسبّب تكراراً غير مرغوب.

---

### السؤال 3 (hard)

إذا كان حقل رقم الإطار `k = 3` بت، وأُرسِل الإطار رقم 11 — ما رقمه المُخزَّن في الإطار؟

أ) 11
ب) 3
ج) 2
د) 8

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** $11 \mod 2^3 = 11 \mod 8 = 3$
- ❌ **الخيار أ:** 11 هو الرقم المطلق، لكن الحقل يخزّن `N mod 2^k`.
- ❌ **الخيار ج:** $2 = 10 \mod 8$ — خطأ في الحساب.
- ❌ **الخيار د:** 8 هي قيمة $2^3$ نفسها، وليست نتيجة `mod`.

---

### السؤال 4 (medium)

أي مما يلي صحيح بشأن `Unrestricted Protocol`؟

أ) يُرسِل إطاراً واحداً ثم ينتظر `ACK`
ب) يفترض أن المستقبل لديه سعة `buffer` غير محدودة
ج) يستخدم `Timer` لاكتشاف الإطارات المفقودة
د) هو الأكثر استخداماً في الشبكات الحقيقية

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `Unrestricted Protocol` يفترض سعة استقبال لا نهائية ولا يأخذ في الحسبان أي مشاكل في الإرسال.
- ❌ **الخيار أ:** هذا وصف `Stop-and-Wait`.
- ❌ **الخيار ج:** `Timer` يُستخدم في `Stop-and-Wait` وليس `Unrestricted`.
- ❌ **الخيار د:** `Unrestricted` غير واقعي — لا يُستخدم في الشبكات الحقيقية.

---

### السؤال 5 (hard)

باستخدام القيم: R=10 Mbps, T=1 µsec, F=200 bits — ما كفاءة قناة `Unrestricted Protocol`؟

أ) 100%
ب) 75%
ج) 90.9%
د) 95.2%

**الإجابة الصحيحة: د**

**التعليل:**
- ✅ **الخيار د:** $\frac{F}{R} = \frac{200}{10} = 20$ µsec. $T + \frac{F}{R} = 1 + 20 = 21$ µsec. الكفاءة = $\frac{100 \times 20}{21} \approx 95.2\%$
- ❌ **الخيار أ:** 100% ستعني صفر وقت لإنشاء الإطار (`T=0`) وصفر تأخير.
- ❌ **الخيار ب:** 75% هي كفاءة `Stop-and-Wait` في المثال المعطى.
- ❌ **الخيار ج:** 90.9% ليست صحيحة بهذه القيم.

---

### السؤال 6 (hard)

في `Sliding Window Protocol` بحجم نافذة `i=4` تبدأ من `w=3`، ما هو أكبر رقم إطار يمكن إرساله؟

أ) 4
ب) 6
ج) 7
د) 8

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** النافذة = {3, 4, 5, 6}. أكبر رقم في النافذة = `w + i - 1 = 3 + 4 - 1 = 6`.
- ❌ **الخيار أ:** 4 هو العنصر الثاني في النافذة فقط.
- ❌ **الخيار ج:** 7 = `w + i = 3 + 4` وهو الأول خارج النافذة.
- ❌ **الخيار د:** 8 أبعد من ذلك ولا يمكن إرساله.

---

### السؤال 7 (medium)

ما الذي يحدث للنافذة في `Sliding Window` عند تأكيد الإطار رقم 5؟

أ) تُلغى النافذة وتبدأ من الصفر
ب) تنزلق النافذة لتبدأ من الإطار 6
ج) يتوقف الإرسال حتى تُأكَّد جميع الإطارات
د) يُرسَل الإطار 5 مرة أخرى للتأكيد

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** وفقاً للمحاضرة: "If frame j is acknowledged, the window moves down to j+1" — أي تبدأ من 6.
- ❌ **الخيار أ:** النافذة لا تُلغى — تنزلق للأمام فقط.
- ❌ **الخيار ج:** هذا سلوك `Stop-and-Wait` وليس `Sliding Window`.
- ❌ **الخيار د:** إعادة إرسال الإطار المؤكَّد غير منطقية.

---

### السؤال 8 (medium)

أي من الأوامر التالية يعني "استأنف الإرسال" في `Software Signalling`؟

أ) `Ctrl-S`
ب) `X-OFF`
ج) `Ctrl-Q`
د) `Ctrl-C`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `X-ON = Ctrl-Q` يعني استئناف الإرسال.
- ❌ **الخيار أ:** `Ctrl-S = X-OFF` يعني إيقاف الإرسال.
- ❌ **الخيار ب:** `X-OFF` يعني إيقاف الإرسال.
- ❌ **الخيار د:** `Ctrl-C` لا علاقة له بـ`Signalling` — يُستخدم لإيقاف العمليات.

---

### السؤال 9 (hard)

أي عبارة صحيحة بشأن `Outstanding Frames` في `Sliding Window`؟

أ) هي إطارات لم تُرسَل بعد
ب) هي إطارات أُرسِلت وأُكِّد وصولها
ج) هي إطارات أُرسِلت لكن لم يُستلَم `ACK` لها بعد
د) هي إطارات تالفة يجب إعادة إرسالها

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** "Every frame in the window has been sent, but may not be acknowledged. Those not acknowledged are called outstanding frames."
- ❌ **الخيار أ:** الإطارات غير المُرسَلة هي خارج النافذة (أرقامها ≥ `w+i`).
- ❌ **الخيار ب:** الإطارات المؤكَّدة أرقامها أقل من `w`.
- ❌ **الخيار د:** `Outstanding` لا تعني تالفة بالضرورة.

---

### السؤال 10 (hard)

في مقارنة البروتوكولات، ما حجم نافذة الاستقبال في `Go-Back-N Protocol`؟

أ) أقل من $2^K$
ب) غير محدود
ج) إطار واحد
د) يساوي حجم نافذة الإرسال

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** وفقاً للجدول في المحاضرة، `Go-Back-N` لديه نافذة استقبال = إطار واحد (`One frame`).
- ❌ **الخيار أ:** نافذة الإرسال في `Go-Back-N` هي أقل من $2^K$، وليس نافذة الاستقبال.
- ❌ **الخيار ب:** النافذة غير المحدودة هي في `Unrestricted Protocol`.
- ❌ **الخيار د:** في `Go-Back-N`، نافذة الاستقبال (1) أصغر بكثير من نافذة الإرسال.

---

### السؤال 11 (medium)

ما حقل الإطار الذي يُستخدم للكشف عن الأخطاء؟

أ) `ACK`
ب) `Number`
ج) `CRC`
د) `Type`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `CRC` = `Cyclic Redundancy Check` — حقل بتات التحقق الذي يكشف الأخطاء.
- ❌ **الخيار أ:** `ACK` يُؤكِّد وصول الإطار، لا يكشف الأخطاء بنفسه.
- ❌ **الخيار ب:** `Number` هو رقم الإطار للترتيب.
- ❌ **الخيار د:** `Type` يُحدِّد نوع الإطار (`data`, `ACK`, `NAK`).

---

### السؤال 12 (hard)

إذا كانت القيم: R=10 Mbps, S=200 m/µsec, D=200 m, T=1 µsec, F=200 bits, A=40 bits — ما الزمن الكلي لدورة `Stop-and-Wait` واحدة؟

أ) 21 µsec
ب) 24 µsec
ج) 28 µsec
د) 30 µsec

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** $2(T + \frac{D}{S}) + \frac{F+A}{R} = 2(1+1) + \frac{240}{10} = 4 + 24 = 28$ µsec
- ❌ **الخيار أ:** 21 µsec هو زمن دورة `Unrestricted`.
- ❌ **الخيار ب:** 24 µsec هو فقط $\frac{F+A}{R}$ بدون إضافة $2(T+\frac{D}{S})$.
- ❌ **الخيار د:** 30 µsec خطأ في الحساب.

---

### السؤال 13 (medium)

أي بروتوكول يُعدّ التطبيق الواقعي الذي يوازن بين `Unrestricted` و`Stop-and-Wait`؟

أ) `CSMA/CD`
ب) `Token Ring`
ج) `Sliding Window Protocol`
د) `ALOHA`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** المحاضرة تُعرّف `Sliding Window` صراحةً بأنه "Compromise between Unrestricted and Stop-and-Wait protocols".
- ❌ **الخيار أ:** `CSMA/CD` هو بروتوكول `Medium Access Control` — موضوع مختلف.
- ❌ **الخيار ب:** `Token Ring` هو معيار وليس بروتوكول `Flow Control`.
- ❌ **الخيار د:** `ALOHA` هو بروتوكول وصول للوسط، لا `Flow Control`.

---

### السؤال 14 (hard)

في `RS-232 (EIA-232)`، ما وظيفة إرسال الإشارات على أسلاك محددة؟

أ) نقل بيانات المستخدم
ب) الإشارة إلى حالة الجاهزية (`Readiness State`)
ج) كشف الأخطاء في الإطارات
د) تحديد رقم الإطار المُرسَل

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** وفقاً للمحاضرة: "RS-232 (EIA-232) sends signals over specified lines to indicate a state of readiness."
- ❌ **الخيار أ:** نقل البيانات يتم عبر أسلاك البيانات، لا أسلاك `Signalling`.
- ❌ **الخيار ج:** كشف الأخطاء هو وظيفة `CRC` في الإطار.
- ❌ **الخيار د:** رقم الإطار يُخزَّن في حقل `Number` داخل الإطار.

---

### السؤال 15 (hard)

ما معدل البيانات الفعّال (`Effective Data Rate`) لـ`Unrestricted Protocol` بالقيم: R=10 Mbps, T=1 µsec, F=200 bits, N=160 bits؟

أ) 7.6 Mbps
ب) 5.7 Mbps
ج) 10 Mbps
د) 8 Mbps

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** $\text{EDR} = \frac{N}{T + \frac{F}{R}} = \frac{160}{1 + 20} = \frac{160}{21} \approx 7.6$ Mbps
- ❌ **الخيار ب:** 5.7 Mbps هو معدل `Stop-and-Wait`.
- ❌ **الخيار ج:** 10 Mbps هو المعدل الإجمالي للقناة — العملي دائماً أقل.
- ❌ **الخيار د:** 8 Mbps خطأ في الحساب.

---

### السؤال 16 (hard)

أي عبارة تصف بدقة العلاقة بين البروتوكولات الأربعة (`Stop-and-Wait`, `Unrestricted`, `Go-Back-N`, `Selective Repeat`)؟

أ) كلها بروتوكولات مستقلة لا علاقة بينها
ب) كلها تنوعات من `Stop-and-Wait Protocol`
ج) كلها تنوعات من `Sliding Window Protocol` بأحجام نوافذ مختلفة
د) `Unrestricted` هو أساس البروتوكولات الثلاثة الأخرى

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** المحاضرة تقول صراحةً: "The four flow control protocols discussed can be viewed as variations of a sliding window protocol."
- ❌ **الخيار أ:** هناك علاقة واضحة — الحجم المختلف للنافذة يُميّزها.
- ❌ **الخيار ب:** `Stop-and-Wait` هو الحالة الخاصة (نافذة = 1)، وليس الأصل.
- ❌ **الخيار د:** `Unrestricted` هو حالة خاصة (نافذة = ∞) وليس الأساس العام.

---

## الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة

| المصطلح | التعريف القصير |
|---|---|
| `Flow Control` | تنظيم متى يُرسِل المُرسِل لمنع امتلاء `buffer` المستقبل |
| `Error Control` | ضمان وصول الإطارات صحيحة وغير تالفة |
| `Frame` | مجموعة `bytes` منظّمة للإرسال في طبقة `Data Link` |
| `ACK` | إشعار تأكيد وصول الإطار بدون أخطاء |
| `NAK` | إشعار رفض — الإطار وصل لكنه تالف |
| `Piggybacking` | دمج `ACK` مع إطار بيانات للاتجاه المعاكس |
| `Timer` | مؤقت لاكتشاف الإطارات المفقودة |
| `Outstanding Frame` | إطار أُرسِل داخل النافذة لكن لم يُؤكَّد بعد |
| `Channel Utilisation` | النسبة المئوية للوقت الذي تنقل فيه القناة بيانات فعلية |
| `Sliding Window` | بروتوكول يسمح بإرسال `i` إطارات قبل انتظار `ACK` |
| `X-ON` | `Ctrl-Q` — استأنف الإرسال |
| `X-OFF` | `Ctrl-S` — أوقف الإرسال |

---

### 🔑 جداول المقارنة

| المعيار | `Stop-and-Wait` | `Unrestricted` | `Go-Back-N` | `Selective Repeat` |
|---|---|---|---|---|
| **نافذة الإرسال** | 1 إطار | غير محدودة | < $2^K$ | ≤ $2^K$ - نافذة الاستقبال |
| **نافذة الاستقبال** | 1 إطار | غير محدودة | 1 إطار | ≤ $2^K$ - نافذة الإرسال |
| **الكفاءة (المثال)** | 75% | 95.2% | عالية | الأعلى |
| **الواقعية** | واقعي | غير واقعي | واقعي | واقعي |
| **التعقيد** | بسيط جداً | بسيط جداً | متوسط | عالي |

---

### 🔑 المكونات والأدوات

| الأداة | الوظيفة | متى تستخدم |
|---|---|---|
| `CRC` | كشف الأخطاء في الإطار | عند كل إطار مُستقبَل |
| `Timer` | كشف الإطارات المفقودة | عند إرسال كل إطار في `Stop-and-Wait` |
| `ACK` | تأكيد وصول الإطار | بعد استقبال كل إطار صحيح |
| `NAK` | الإبلاغ عن إطار تالف | عند اكتشاف خطأ في `CRC` |
| `RS-232` | إشارة الجاهزية (Hardware) | عند استخدام `Hardware Signalling` |
| `X-ON / X-OFF` | إشارات التدفق (Software) | في `Software Signalling` |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
|---|---|
| 1 | `Window size = 1` ← يساوي `Stop-and-Wait` |
| 2 | `Window size = ∞` ← يساوي `Unrestricted` |
| 3 | رقم الإطار = $N \mod 2^k$ (دائماً) |
| 4 | `ACK` لإطار `j` → النافذة تبدأ من `j+1` |
| 5 | التأخير في `Stop-and-Wait` = ذهاب + إياب = $2 \times \frac{D}{S}$ |
| 6 | كفاءة القناة لا تشمل وقت `ACK frames` |
| 7 | `Piggybacking` = دمج `ACK` مع بيانات = توفير نطاق ترددي |
| 8 | الإطارات الأربعة كلها تنوعات من `Sliding Window` |

---

### 🔑 قاموس المصطلحات

| المصطلح | المعنى |
|---|---|
| `Flow Control` | التحكم في التدفق |
| `Error Control` | التحكم في الأخطاء |
| `Frame` | الإطار (وحدة البيانات في `Data Link`) |
| `Acknowledgment (ACK)` | التأكيد |
| `Negative Acknowledgment (NAK)` | التأكيد السلبي (رفض) |
| `Piggybacking` | الدمج الضمني لـ`ACK` مع البيانات |
| `Channel Utilisation` | كفاءة توظيف القناة |
| `Effective Data Rate (EDR)` | معدل البيانات الفعّال |
| `Outstanding Frame` | إطار مُرسَل غير مؤكَّد |
| `Sliding Window` | النافذة المنزلقة |
| `Stop-and-Wait` | قف وانتظر |
| `Unrestricted Protocol` | البروتوكول غير المقيّد |
| `Go-Back-N` | العودة للخلف N |
| `Selective Repeat` | الإعادة الانتقائية |
| `Propagation Delay` | تأخير الانتشار ($D/S$) |
| `Transmission Delay` | تأخير الإرسال ($F/R$) |

---

### 🔑 الخطوات السريعة

#### حساب كفاءة `Unrestricted Protocol`

```algorithm
1 | احسب F/R          | القسمة | وقت إرسال الإطار (µsec)
2 | احسب T + F/R      | الجمع  | الزمن الكلي للدورة
3 | اضرب F/R × 100    | الضرب  | البسط
4 | اقسم البسط على (T+F/R) | القسمة | كفاءة القناة %
```

#### حساب كفاءة `Stop-and-Wait Protocol`

```algorithm
1 | احسب F/R           | القسمة | وقت الإرسال
2 | احسب D/S           | القسمة | تأخير الانتشار
3 | احسب (F+A)/R       | القسمة | وقت الإطار + ACK
4 | احسب 2(T+D/S)+(F+A)/R | الجمع  | المقام (الزمن الكلي)
5 | احسب F/R+D/S       | الجمع  | البسط (الوقت المفيد)
6 | اضرب البسط × 100    | الضرب  | 
7 | اقسم على المقام     | القسمة | كفاءة القناة %
```

#### حساب رقم الإطار المُخزَّن (`Frame Number modulo`)

```algorithm
1 | حدّد k (عدد بتات الحقل)  | المعطى     | مثال: k=3
2 | احسب 2^k                | الرفع للأس | مثال: 2^3 = 8
3 | احسب N mod 2^k          | القسمة المتبقية | مثال: 11 mod 8 = 3
4 | النتيجة = رقم الإطار المُخزَّن | — | مثال: 3
```
