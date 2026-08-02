# المحاضرة 6 — Data Security (أمن البيانات)
> **المادة:** الشبكات وأمن البيانات (نظري) | **الموضوع:** مفاهيم التشفير، توزيع المفاتيح، المصادقة، والخصوصية
> **الكود:** NETW3000 | **المرجع:** Lecture 6 Data security 1

---

## الجزء الأول: ملخص منظم (اقرأ قبل المحاضرة!)

### 📍 عن هذه المحاضرة
> هذه المحاضرة تشرح كيف نحمي البيانات أثناء نقلها عبر الشبكة — من التشفير البسيط وصولاً إلى أنظمة المفاتيح العامة والتوقيع الرقمي وعناصر الأمن الأساسية (CIA Triad).

### 🎯 ستتعلم
- **`Encryption` / `Decryption`** — تحويل البيانات لشكل غير مفهوم ثم استعادتها
- **`Caesar Cipher` و `Bit-Level Cipher`** — مثالان بسيطان على تقنيات التشفير ونقاط ضعفها
- **`Key Distribution`** — مشكلة توصيل المفتاح السري وطرق حلها (Merkle, Shamir)
- **`Public Key Cryptosystems`** — فصل مفتاح التشفير عن مفتاح فك التشفير لحل مشكلة التوزيع
- **`Digital Signature`** — كيف نُثبت هوية المُرسِل بشكل لا يمكن إنكاره
- **CIA Triad: `Confidentiality`, `Integrity`, `Availability`** — ركائز أمن المعلومات
- **`Authentication`, `Authorization`, `Non-repudiation`, `Privacy`** — مفاهيم الأمن المتكاملة

### 📚 المتطلبات السابقة
- **ثنائيات البيانات (Bits & Bytes):** لأن `Bit-Level Cipher` يعمل على مستوى الـ bits
- **عمليات `XOR` المنطقية:** أساس التشفير على مستوى البت
- **مفهوم المفتاح `key` في الرياضيات:** لفهم معادلات `E` و `D`

### 💡 الأفكار الرئيسية
1. **`Encryption`:** الهدف ليس تدمير البيانات بل إخفاؤها عن الأعداء مع إمكانية الاسترجاع — الصندوق المقفل الذي يفتحه فقط من يملك المفتاح.
2. **`Public Key Cryptosystem`:** الحل الذكي لمشكلة توزيع المفاتيح — ضع قفلاً عاماً للجميع، واحتفظ بمفتاح الفتح لنفسك فقط.
3. **`Digital Signature`:** مزج التشفير بالخوارزمية العكسية يجعل الرسالة "موقّعة" — لا يمكن للمُرسِل إنكارها لاحقاً.
4. **CIA Triad:** كل نظام أمن جيد يضمن السرية (`Confidentiality`) + السلامة (`Integrity`) + التوفر (`Availability`).

### 🔗 كيف تتصل هذه المحاضرة بالمحاضرات الأخرى؟
- **السابقة:** محاضرات Data Link Layer علّمتك كيف تُرسَل الإطارات — الآن نتعلم كيف نُؤمّن محتواها.
- **القادمة:** هذه المفاهيم ستُستخدم في محاضرات Network Security المتقدمة (TLS, VPN, PKI).

### ⚠️ الأخطاء الشائعة الواجب تجنبها
- ❌ الخلط بين `Plaintext` (البيانات الأصلية) و `Ciphertext` (البيانات المشفّرة)
- ❌ الاعتقاد بأن `Public Key` يفك التشفير — هو يُشفِّر فقط، `Private Key` هو من يفك
- ❌ الخلط بين `Authentication` (من أنت؟) و `Authorization` (ماذا يُسمح لك؟)
- ❌ الخلط بين `Privacy` (حق التحكم بمعلوماتك) و `Security` (حماية النظام من الاختراق)

---

## الجزء الثاني: الشرح التفصيلي

### 1. مقدمة — Data Security (أمن البيانات)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**أمن البيانات = منع الآخرين من معرفة محتوى رسالتك أثناء إرسالها عبر الشبكة.**

---

#### 📖 الشرح

تخيّل أنك ترسل ورقة مكتوباً عليها "أضف مالاً لحسابي رقم 123456789" عبر البريد العادي المفتوح — أي شخص في الطريق يستطيع قراءتها، بل وتعديلها! هذه هي مشكلة إرسال البيانات غير المؤمّنة عبر الشبكة.

الحل هو **`Encryption`** (التشفير): نحوّل الرسالة إلى شكل غير مفهوم قبل إرسالها، بحيث حتى لو اعترضها أحد، لا يستطيع قراءتها. المُستقبِل وحده يستطيع فك تشفيرها لأنه يملك المفتاح.

المصطلحات الأساسية في هذا المجال:
- **`Encryption`** — تحويل المعلومة إلى شكل مختلف وغير مفهوم
- **`Decryption`** — استعادة المعلومة الأصلية من شكلها المشفّر
- **`Plaintext`** — البيانات الأصلية قبل التشفير (ما تكتبه)
- **`Ciphertext`** — البيانات بعد التشفير (ما يُرسَل عبر الشبكة)

#### 💡 التشبيه:
> أرسل رسالة في خزنة مقفلة بدلاً من ظرف مفتوح.
> **وجه الشبه:** الرسالة = `Plaintext`، الخزنة المقفلة = `Ciphertext`، مفتاح الخزنة = `encryption key`.

#### ⚠️ تنبيه بصري
⚠️ **مهم:** انظر الشكل Figure 4.12 و Figure 4.13 في ملف المحاضرة (الصفحات 1-3) — يوضّحان الفرق بين الرسالة غير المؤمّنة (يراها المتنصّت) والرسالة المشفّرة (يرى المتنصّت رموزاً غير مفهومة).

#### 🎯 الملخص السريع
- `Encryption` تحوّل `Plaintext` ← `Ciphertext`
- `Decryption` تحوّل `Ciphertext` ← `Plaintext`
- الهدف: المتنصّت (`Unauthorized Snooper`) يرى `Ciphertext` فقط

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Data security — How to prevent someone else from knowing the contents of a message while it is being transmitted. Encryption - transform information into a different, unintelligible form. Decryption - restore the original information from the encrypted form. Plaintext - original data. Ciphertext - encrypted data.

**ملاحظة على التغطية:**
- ✓ تم شرح بالكامل: جميع التعريفات الأربعة + السياق + مثال الصورة
- ℹ️ إضافة من الدليل: تشبيه الخزنة المقفلة

</details>

---

### 2. الرياضيات والرموز — A Bit of Maths and Notation
<!-- @render: {type: "equation-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**نستخدم رموزاً رياضية لتمثيل عمليتَي التشفير وفك التشفير بشكل دقيق ومختصر.**

---

#### 📐 التعريف الرسمي

$$C = E_k(P)$$

$$P = D_{k'}(C)$$

$$P = D_{k'}(E_k(P))$$

#### 📖 الشرح

| الرمز | المعنى |
|-------|--------|
| `P` | `Plaintext` — النص الأصلي |
| `C` | `Ciphertext` — النص المشفّر |
| `E` | `Encryption algorithm` — خوارزمية التشفير |
| `D` | `Decryption algorithm` — خوارزمية فك التشفير |
| `k` | مفتاح التشفير (`encryption key`) |
| `k'` | مفتاح فك التشفير (`decryption key`) |

**قراءة المعادلات:**
- `C = E_k(P)` ← طبّق خوارزمية التشفير `E` بالمفتاح `k` على النص الأصلي `P` لتحصل على `Ciphertext C`
- `P = D_k'(C)` ← طبّق خوارزمية فك التشفير `D` بالمفتاح `k'` على `C` لترجع للنص الأصلي
- المعادلة الثالثة تقول: إذا شفّرت ثم فككت التشفير، ترجع للأصل — وهذا الشرط الأساسي لأي نظام تشفير سليم

#### ملاحظة:
> في **`Private Key`** (المفتاح الخاص/المتماثل): `k = k'` (نفس المفتاح للتشفير وفك التشفير).
> في **`Public Key`** (المفتاح العام/غير المتماثل): `k ≠ k'` (مفتاحان مختلفان).

#### 🎯 الملخص السريع
- `E_k(P) = C` : التشفير
- `D_k'(C) = P` : فك التشفير
- `D_k'(E_k(P)) = P` : خاصية الاتساق — شرط أساسي

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> P - plaintext, C - ciphertext, E - encryption algorithm, D - decryption algorithm, k, k' - keys. C = Ek(P), P = Dk'(C), P = Dk'(Ek(P))

**ملاحظة على التغطية:**
- ✓ تم شرح: جميع الرموز + المعادلات الثلاث + معناها
- ℹ️ إضافة من الدليل: جدول الرموز + توضيح الفرق بين k وk' في حالتي التشفير المتماثل وغير المتماثل

</details>

---

### 3. Caesar Cipher (شيفرة قيصر)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Caesar Cipher` = تشفير بسيط يُزيح قيمة كل حرف بمقدار ثابت.**

---

#### 📖 الشرح

`Caesar Cipher` هو أبسط أنواع التشفير وأقدمها تاريخياً. الفكرة: كل حرف في الرسالة يُستبدل بحرف آخر يبعد عنه بعدد ثابت من المواضع.

**مثال عملي:**
- إذا كان الإزاحة = 3: A → D ، B → E ، C → F
- بالنسبة لـ `ASCII`: نضيف 3 لكود كل حرف
- لفك التشفير: نطرح 3 من كل حرف

تقنيات أخرى مشابهة:
- الإزاحة للحرف التالي على لوحة المفاتيح
- أي إزاحة ثابتة أخرى

#### 🔄 قبل / بعد: Caesar Cipher (إزاحة +3)

**قبل (Plaintext):**
```
HELLO
```

**بعد (Ciphertext):**
```
KHOOR
```

**ماذا تغيّر؟** كل حرف تحوّل لما يأتي بعده بـ 3 مواضع في أكواد `ASCII`.

#### 💡 التشبيه:
> كأنك تكتب برسائل سرية مع صديقك وتتفقان مسبقاً على "تحريك كل حرف 3 خطوات للأمام في الأبجدية".
> **وجه الشبه:** الاتفاق المسبق = المفتاح `k`، تحريك الحرف = خوارزمية `E`.

---

### 3.1. مشاكل Caesar Cipher — Problems with Caesar Cipher
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Caesar Cipher` سهل الكسر لأن الأحرف الشائعة في النص الأصلي تبقى شائعة في النص المشفّر.**

---

#### 📖 الشرح

المشكلة الكبرى في `Caesar Cipher`: يمكن كسره بتحليل تكرار الأحرف (`Frequency Analysis`).

**كيف يعمل الكسر؟**
1. في اللغة الإنجليزية، الأحرف الأكثر تكراراً هي: **E, T, O, A, N, والمسافة (space)**
2. إذا نظرنا في `Ciphertext` ووجدنا أن `\` تتكرر 7 مرات — فمن المحتمل أن تكون `space`
3. إذا عرفنا قيمة المسافة، نعرف قيمة الإزاحة، ونكسر التشفير بالكامل

**مثال من المحاضرة:**
في `Ciphertext` المثال: `7-\, 4-S, 3-(R, P, M), 2-(F, U, V, Y, comma)`
- `\` تكررت 7 مرات → على الأرجح هي المسافة
- بعد معرفة المسافة، نجرّب الكلمات القصيرة: TO, THE, OF

#### مهم للامتحان ⚠️:
> `Caesar Cipher` يمكن كسره بـ `Frequency Analysis` لأنه يُبقي نفس نسب تكرار الأحرف.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
كثير يعتقد أن تغيير قيمة الإزاحة (مثلاً 5 بدل 3) يجعله آمناً.

#### الفهم الصحيح ✅:
لا يهم قيمة الإزاحة — المشكلة في المبدأ ذاته. الأحرف الشائعة ستظل شائعة مهما غيّرت الإزاحة.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Shift of character values. Example: A = A + 3, B = B + 3,… for ASCII — Decrease each code by 3 to decrypt it. Various techniques can be used — shift to the next character on the keyboard.
> Problems: Easy to break by guessing frequently occurring letters — The most frequently used letters in English are E, T, O A, N, and space. Look for what occurs frequently in the text. 7-\, 4-S, 3-(R, P, M), 2-(F, U, V, Y, comma). If you can guess the space character, then you can have a go at guessing short words such as 2-4 character words. Probable patterns can help. TO, THE, OF, etc.

**ملاحظة على التغطية:**
- ✓ تم شرح: مبدأ الإزاحة + فك التشفير + تحليل التكرار + نقطة ضعف الشيفرة
- ℹ️ إضافة من الدليل: مثال قبل/بعد + تشبيه يومي

</details>

---

### 4. Bit-Level Cipher (التشفير على مستوى البت)
<!-- @render: {type: "equation-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Bit-Level Cipher` = التشفير على مستوى البتات باستخدام عملية `XOR` مع مفتاح ثنائي.**

---

#### 📖 الشرح

ليست كل البيانات نصوصاً — الصور، الصوت، الفيديو، كلها بيانات ثنائية. لهذا نحتاج تشفيراً على مستوى `Bits` وليس أحرفاً.

**آلية العمل:**
1. حدّد نمطاً ثنائياً كمفتاح `encryption key` (مثلاً: `1001011001010`)
2. نفّذ عملية `XOR` بين البيانات والمفتاح
3. أرسل الناتج (`Ciphertext`)
4. لفك التشفير: نفّذ **نفس عملية `XOR`** مع نفس المفتاح

**لماذا `XOR`؟** لأن `XOR` له خاصية رائعة:
$$A \oplus K \oplus K = A$$
أي: إذا طبّقت `XOR` مرتين بنفس المفتاح ترجع للأصل!

#### 🔄 قبل / بعد: Bit-Level XOR Cipher

**قبل (Plaintext):**
```
1101100101001
```

**المفتاح (Encryption Key):**
```
1001011001010
```

**بعد (Ciphertext = XOR):**
```
0100111100011
```

**فك التشفير (XOR مرة أخرى بنفس المفتاح):**
```
0100111100011  (Ciphertext)
XOR
1001011001010  (Decryption Key — نفس المفتاح)
= 1101100101001  (Plaintext الأصلي ✓)
```

**ماذا تغيّر؟** كل bit يتغير أو يبقى بحسب `XOR` مع المفتاح، والعملية عكسية تلقائياً.

#### ⚠️ تنبيه بصري
⚠️ **مهم:** انظر Figure 4.16 في الصفحة 7 من ملف المحاضرة — يوضّح المثال الحسابي كاملاً بأرقام حقيقية.

#### 💡 التشبيه:
> تخيّل أن لديك مصباحاً وزراراً سريّاً. الضغطة الأولى تُطفئه (التشفير)، والضغطة الثانية بنفس الزر تُشعله (فك التشفير).
> **وجه الشبه:** الزر = `XOR Key`، حالة المصباح = قيمة الـ bit.

#### 🎯 الملخص السريع
- المفتاح = نمط ثنائي (`bit pattern`)
- التشفير = `XOR(Plaintext, Key)` ← `Ciphertext`
- فك التشفير = `XOR(Ciphertext, Key)` ← `Plaintext` (نفس العملية!)
- يعمل مع أي نوع بيانات (ليس نصاً فقط)

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Not all data are characters. Define a bit pattern as an encryption key. Perform an XOR between the data and key. Send the result. To decrypt, perform the same process.
> Figure 4.16: Plaintext: 1101100101001, Encryption key: 1001011001010, Ciphertext = plaintext exclusive-or'd with the encryption key: 0100111100011, Decryption key (same as the encryption key): 1001011001010, Plaintext = ciphertext exclusive-or'd with the decryption key: 1101100101001

**ملاحظة على التغطية:**
- ✓ تم شرح: المبدأ + عملية XOR + مثال الأرقام كاملاً + سبب نجاح العملية رياضياً
- ℹ️ إضافة من الدليل: شرح رياضي لخاصية XOR + تشبيه المصباح

</details>

---

### 5. توزيع المفتاح — Key Distribution
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**المشكلة الكبرى في `Private Key Encryption`: كيف يتفق المُرسِل والمُستقبِل على المفتاح السري دون أن يعلم به أحد؟**

---

#### 📖 الشرح

الطرق السابقة (`Caesar` و`Bit-Level`) تعتمد على نفس المفتاح للتشفير وفك التشفير — هذا ما يُسمى **`Private Key Encryption`** (أو `Symmetric Encryption`).

المشكلة: قبل أن تتواصلا، يجب أن يعرف كلاكما المفتاح. لكن كيف تُوصله دون أن يسمعه أحد؟

**الطريقة التقليدية:** المُرسِل والمُستقبِل يلتقيان في مكان سري ويتفقان على المفتاح. لكن هذا غير عملي في عالم الإنترنت!

#### 💡 التشبيه:
> إذا أردت أن تُرسل لصديقك رسالة في خزنة مقفلة، يجب أن تُعطيه نسخة من المفتاح أولاً — لكن كيف تُوصله المفتاح بأمان؟ هذه هي المشكلة بالضبط.
> **وجه الشبه:** مشكلة توصيل مفتاح الخزنة = مشكلة `Key Distribution`.

#### 🎯 الملخص السريع
- `Private Key Encryption` = نفس المفتاح للتشفير وفك التشفير
- المفتاح يجب أن يُحافَظ على سريته
- المشكلة: كيف نُوزّع المفتاح بأمان؟

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Methods so far use one key for both the sender and receiver. Key is very important in these methods. The secrecy of the key must be protected. These methods are called private key encryption. How do we distribute the key from the sender to the receiver? The sender and the receiver meet at a secret place and agree on a key.

**ملاحظة على التغطية:**
- ✓ تم شرح: تعريف Private Key Encryption + المشكلة + الطريقة التقليدية
- ℹ️ إضافة من الدليل: تشبيه خزنة المفاتيح

</details>

---

### 5.1. Merkle's Puzzle (أحجية ميركل)
<!-- @render: {type: "algorithm-first", visualization: "sequence", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Merkle's Puzzle` = طريقة ذكية لتوزيع المفتاح عبر القناة العامة دون اللقاء المباشر.**

---

#### 📖 الشرح

`Ralph Merkle` ابتكر طريقة عبقرية للتحايل على مشكلة توزيع المفاتيح:

#### ⚙️ الخطوات / الخوارزمية: Merkle's Puzzle

#### ما هدف هذه العملية؟
> توصيل مفتاح سري بين طرفين عبر قناة عامة دون أن يعلم المتنصّت بالمفتاح المختار.

```algorithm
1 | المُرسِل يُنشئ n حجية (puzzle) | كل حجية مشفّرة بمفتاح مختلف | n حجية معلومة، محتواها مخفي
2 | يُرسِل المُرسِل جميع الـ n حجية للمُستقبِل | القناة العامة | المتنصّت يرى الحجيات لكن لا يعرف مفاتيحها
3 | المُستقبِل يختار حجية واحدة عشوائياً | Brute Force | يكسر المفتاح ويحصل على ID الحجية + المفتاح السري
4 | المُستقبِل يُخبر المُرسِل بـ ID الحجية فقط | القناة العامة | المُرسِل يعرف أي حجية اختيرت → يعرف المفتاح
5 | كلاهما الآن يعرف المفتاح السري | — | يبدأن التواصل المشفّر
```

**لماذا هذا آمن؟**
- المتنصّت يسمع ID الحجية، لكن لا يعرف أي مفتاح يقابلها
- لكسر الأمان يجب كسر **جميع الـ n حجية** بدلاً من واحدة فقط — يتطلب n أضعاف الجهد

#### 💡 التشبيه:
> تخيّل أن المُرسِل يُرسل 1000 صندوق مقفول بأقفال مختلفة. المُستقبِل يختار صندوقاً واحداً ويكسر قفله، ثم يُخبر المُرسِل برقم الصندوق فقط. كلاهما يعرف ما في الصندوق، لكن المتنصّت لا يعرف أي صندوق اختاروا!
> **وجه الشبه:** الصناديق = الـ puzzles، كسر القفل = Brute Force، رقم الصندوق = ID.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Merkle's puzzle — The sender sends n puzzles each encrypted with a separate key. The receiver chooses a puzzle randomly, breaks it by brute force, and gets the key. Then the receiver tells the sender the ID of that puzzle, and thus the sender and the receiver can agree on that key.

**ملاحظة على التغطية:**
- ✓ تم شرح: الخطوات الثلاث كاملة + سبب الأمان
- ℹ️ إضافة من الدليل: تشبيه الصناديق + توضيح لماذا المتنصّت لا يستفيد

</details>

---

### 5.2. Shamir's Method (طريقة شامير)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Shamir's Method` = توزيع المفتاح على m شخص بحيث يُستعاد فقط بحضورهم جميعاً.**

---

#### 📖 الشرح

أحياناً المعلومة حساسة جداً لدرجة أنه لا يجوز لشخص واحد الاحتفاظ بها كاملة. مثال: إجراء نووي يحتاج توقيع عدة ضباط.

**الفكرة الرياضية:**
- المفتاح السري هو `a₀` (معامل الثابت في متعددة حدود)
- نُنشئ متعددة حدود درجتها m-1:
$$f(x) = a_0 + a_1 x + a_2 x^2 + \ldots + a_{m-1} x^{m-1}$$
- نُعطي كل شخص موثوق نقطة `(x, y)` على هذه المتعددة
- لاسترجاع `a₀` (المفتاح)، يجب توافر m نقطة — أي اجتماع m شخص

**السبب الرياضي:** متعددة الحدود من الدرجة m-1 تُحدَّد بـ m نقطة بالضبط. أقل من m نقطة لا تكفي لإيجاد `a₀`.

#### 💡 التشبيه:
> مفتاح خزينة البنك مقسّم بين 3 مديرين — لفتح الخزينة يجب حضور الثلاثة معاً. لا يستطيع أي منهم فتحها وحده.
> **وجه الشبه:** م مديرين = m أشخاص، الخزينة = المفتاح السري `a₀`.

#### 🎯 الملخص السريع
- المفتاح = `a₀` في متعددة حدود درجتها m-1
- كل شخص يحصل على نقطة `(x, y)` من المتعددة
- استرجاع المفتاح يتطلب m نقطة (حضور m شخص)
- أي مجموعة من m شخص تستطيع حل المتعددة وإيجاد المفتاح

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Shamir's method - a different scenario — The information is so sensitive that no one person can be trusted to send or receive it. Key is divided into m pieces and distributed among m people. Those m people must be present to determine the key. Based on a m-1 degree polynomial where a₀ is the key. Give trusted people points (x, y) on the polynomial. Any group of m people can solve the polynomial and determine the key.

**ملاحظة على التغطية:**
- ✓ تم شرح: السيناريو + الفكرة الرياضية + الصيغة + التطبيق
- ℹ️ إضافة من الدليل: معادلة متعددة الحدود + تشبيه البنك

</details>

---

### 6. Public Key Cryptosystems (أنظمة التشفير بالمفتاح العام)
<!-- @render: {type: "diagram-first", visualization: "sequence", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Public Key Cryptosystem` = فصل مفتاح التشفير (عام، للجميع) عن مفتاح فك التشفير (خاص، للمستقبِل فقط) — الحل الجذري لمشكلة `Key Distribution`.**

---

#### 📊 المخطط: Public Key Encryption Flow

#### ما هذا المخطط؟
> يوضّح كيف يُرسل مُرسِلان مختلفان (A وB) رسائل مشفّرة لمُستقبِل واحد باستخدام نفس المفتاح العام، والمُستقبِل يفك التشفير بمفتاحه الخاص.

#### وصف المشاركين:
| # | المشارك | الدور |
|---|---------|-------|
| 1 | Sender A | يُرسِل `E_k(A)` |
| 2 | Sender B | يُرسِل `E_k(B)` |
| 3 | Receiver | يفك التشفير بـ `k'` |

#### تسلسل الخطوات:
| الخطوة | المُرسِل | المُستقبِل | الرسالة | ملاحظة |
|--------|----------|------------|---------|---------|
| 1 | A | Receiver | `E_k(A)` مُشفَّرة بالمفتاح العام `k` | المفتاح العام معروف للجميع |
| 2 | B | Receiver | `E_k(B)` مُشفَّرة بالمفتاح العام `k` | نفس المفتاح العام |
| 3 | Receiver | — | `D_k'(E_k(A)) = A` | يفك بالمفتاح الخاص `k'` |
| 4 | Receiver | — | `D_k'(E_k(B)) = B` | يفك بالمفتاح الخاص `k'` |

#### 📖 الشرح

المشكلة مع `Private Key Encryption`: كيف نُوزّع المفتاح؟
الحل: **افصل مفتاح التشفير عن مفتاح فك التشفير!**

المكونات الأربعة لأي `Public Key Cryptosystem`:
1. **`Encryption algorithm`** — خوارزمية التشفير
2. **`Decryption algorithm`** — خوارزمية فك التشفير (مختلفة!)
3. **`Public key` (k)** — مفتاح التشفير، عام، يعلمه الجميع
4. **`Private key` (k')** — مفتاح فك التشفير، سري، يعلمه المُستقبِل فقط

**قاعدة ذهبية:**
- المُرسِل يُشفِّر بـ `Public Key` للمُستقبِل
- المُستقبِل يفك التشفير بـ `Private Key` الخاص به
- **لا يمكن فك التشفير بالـ `Public Key`**

#### مهم للامتحان ⚠️:
> المفتاح العام (`Public Key`) يُستخدم للتشفير فقط.
> المفتاح الخاص (`Private Key`) يُستخدم لفك التشفير فقط.
> لا يمكن الاستنتاج من المفتاح العام على المفتاح الخاص رياضياً.

#### ⚠️ تنبيه بصري
⚠️ **مهم:** انظر Figure 4.22 في الصفحة 12 من ملف المحاضرة — يوضّح كيف يستطيع مُرسِلان مختلفان استخدام نفس المفتاح العام.

#### 💡 التشبيه:
> ضع صندوق بريد مقفول أمام بيتك — أي شخص يستطيع وضع رسالة فيه (التشفير بالمفتاح العام)، لكن أنت فقط تملك مفتاح فتحه (المفتاح الخاص).
> **وجه الشبه:** فتحة صندوق البريد = Public Key، مفتاح الفتح = Private Key.

#### 🎯 الملخص السريع
- `Public Key` → للتشفير (معروف للجميع)
- `Private Key` → لفك التشفير (سري تماماً)
- الميزة: لا حاجة لتوزيع مفتاح سري مسبقاً
- الميزة: أي عدد من المُرسِلين يمكنهم الإرسال للمُستقبِل

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Key distribution is complex and not secure. Can we get rid of key distribution? Can we make the encryption key public while still making the encrypted message secure? Public key cryptosystems: Encryption and decryption functions are separated. Encryption key cannot be used to decrypt a message. The encryption key is public, but the decryption key is only known to the receiver.
> Components: Encryption algorithm, Decryption algorithm, Public key, Private key. Sender encrypts with the receiver's public key. Receiver decrypts with her/his private key. Cannot decrypt with the public key.

**ملاحظة على التغطية:**
- ✓ تم شرح: المشكلة + الحل + المكونات الأربعة + القاعدة
- ℹ️ إضافة من الدليل: تشبيه صندوق البريد + جدول المشاركين

</details>

---

### 7. Authentication والتوقيع الرقمي — Digital Signature
<!-- @render: {type: "prose-first", visualization: "sequence", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Authentication` = التحقق من هوية المُرسِل. `Digital Signature` = آلية رياضية تجعل إنكار الرسالة مستحيلاً.**

---

#### 📖 الشرح

مشكلة جديدة: حتى لو وصلت الرسالة مشفّرة وسليمة، كيف نعرف أن المُرسِل هو حقاً من يدّعي؟ قد ينكر لاحقاً أنه أرسلها!

**مثال من المحاضرة:**
1. أليس ترسل رسالة لبوب
2. بوب يردّ: "شكراً على رسالتك"
3. أليس تنكر: "ما أرسلت شيئاً!"

الحل: **`Digital Signature`**

**الخاصية الرياضية الأساسية:**
$$D_{k'}(E_k(P)) = E_k(D_{k'}(P)) = P$$

أي: يمكن تطبيق العمليتين بأي ترتيب والوصول للنص الأصلي.

#### ⚙️ الخطوات / الخوارزمية: إرسال رسالة بتوقيع رقمي

#### ما هدف هذه العملية؟
> إرسال رسالة يستطيع المُستقبِل التحقق من هوية مُرسِلها بشكل لا يمكن إنكاره.

**الإعداد:**
- أليس: مفتاحها العام = k ، مفتاحها الخاص = k'
- بوب: مفتاحه العام = j ، مفتاحه الخاص = j'

```algorithm
1 | أليس تُطبّق D_{k'} على P (بمفتاحها الخاص) | Private Key of Alice | ناتج مؤقت يحمل "بصمتها"
2 | أليس تُطبّق E_j على الناتج (بمفتاح بوب العام) | Public Key of Bob | M = E_j(D_{k'}(P)) — الرسالة المُرسَلة
3 | بوب يتلقى M ويُطبّق D_{j'} (بمفتاحه الخاص) | Private Key of Bob | يحصل على D_{k'}(P)
4 | بوب يُطبّق E_k (بمفتاح أليس العام) | Public Key of Alice | P = E_k(D_{j'}(M)) = P الأصلي
```

**لماذا هذا يُثبت الهوية؟**
- الخطوة 1 تعمل فقط مع المفتاح الخاص لأليس — لو نجحت، إذن أليس هي من أرسلت
- لا يمكن لأحد غير أليس إنتاج `D_{k'}(P)` لأن `k'` سري لديها فقط

#### مهم للامتحان ⚠️:
> `Digital Signature` لا تُشفِّر الرسالة فقط — بل **تُثبت هوية المُرسِل** وتمنع الإنكار. هذا مختلف عن التشفير العادي.

#### 💡 التشبيه:
> عندما توقّع شيكاً بنكياً، التوقيع يثبت أنك أنت من وقّعه. لا يمكنك لاحقاً إنكار التوقيع.
> **وجه الشبه:** التوقيع اليدوي = `Digital Signature`، البنك = `Public Key Infrastructure`.

#### 🎯 الملخص السريع
- `Authentication` = التحقق من هوية المُرسِل
- `Digital Signature` تُدمج: مفتاح أليس الخاص + مفتاح بوب العام
- النتيجة: رسالة سرية (لا يقرأها إلا بوب) + موقّعة (يثبت أن أليس أرسلتها)
- لا يمكن الإنكار = `Non-repudiation`

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول:**
> Authentication — Verifying the identity of a sender is called authentication. The sender may deny his message. Somebody may pretend to be the sender. It is very important for banking system, e-commerce, digital contracts.
> Dk'(Ek(P)) = Ek(Dk'(P)) = P
> Alice's public key is k (sender). Bob's public key is j (receiver). k' and j' are the private keys.
> How to send and receive an authenticatable message? Alice uses the decryption algorithm and her private key, followed by the encryption algorithm and Bob's public key to give M = Ej(Dk'(P)). Bob uses the decryption algorithm and his private key (Dk'(P)), followed by the encryption and Alice's public key to give P = Ek(Dj'(M)).

**ملاحظة على التغطية:**
- ✓ تم شرح: مفهوم Authentication + المعادلات + الخطوات كاملاً
- ℹ️ إضافة من الدليل: جدول الخوارزمية + شرح لماذا يثبت الهوية + تشبيه الشيك

</details>

---

### 8. CIA Triad — عناصر أمن المعلومات الثلاثة
<!-- @render: {type: "diagram-first", visualization: "comparison-table", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**CIA Triad = ثلاثة ركائز لأي نظام أمني: السرية (`Confidentiality`) + السلامة (`Integrity`) + التوفر (`Availability`).**

---

#### ⚖️ مقارنة سريعة: CIA Triad

| المعيار | `Confidentiality` (السرية) | `Integrity` (السلامة) | `Availability` (التوفر) |
|---------|--------------------------|----------------------|------------------------|
| **التعريف** | لا أحد غير المُخوَّل يطّلع على البيانات | البيانات لم تُعدَّل أو تُزوَّر | الخدمة متاحة للمُخوَّلين عند الحاجة |
| **التهديد** | التنصّت، تسريب البيانات | التعديل غير المُصرَّح | هجمات الحجب (DoS) |
| **الحل** | التشفير (`Encryption`) | التوقيع الرقمي، `Hash` | التكرار، النسخ الاحتياطي |

#### 📖 شرح Confidentiality بالتفصيل (من المحاضرة)

**`Confidentiality`** = لم تُكشَف معلومة خاصة لأفراد غير مُخوَّلين.

هذا الهدف صعب التحقيق لذا نحتاج **تصنيف البيانات (`Data Classification`)**!

أنواع البيانات الحساسة:
- **`PII` (Personally Identifiable Information):** الاسم، العنوان، رقم الهوية، رقم الهاتف، البريد الإلكتروني
- **`PHI` (Protected/Personal Health Information):** المعلومات الديموغرافية، التاريخ الطبي، نتائج الفحوصات، الحالة النفسية، معلومات التأمين

#### 💡 التشبيه:
> CIA Triad كأركان المنزل الثلاثة: الخصوصية (ستائر مغلقة) + السلامة (لا أحد عدّل الأثاث) + التوفر (يمكنك الدخول متى أردت).
> **وجه الشبه:** السرية = الستائر، السلامة = الأقفال، التوفر = المفتاح عندك.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول (شرائح 18-22):**
> Confidentiality means that no private information has been disclosed to unauthorized individuals. Confidentiality is hard balance to achieve, that's why we need data classification! PII (name, address, social security number or other identifying number or code, telephone number, email address, etc.). PHI (demographic information, medical histories, test and laboratory results, mental health conditions, insurance information and other data that a healthcare professional collects to identify an individual and determine appropriate).

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + PII + PHI + CIA كمفهوم كامل
- ℹ️ إضافة من الدليل: جدول مقارنة CIA + تشبيه المنزل

</details>

---

### 9. Authentication كمفهوم أمني
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Authentication` = عملية إثبات هوية طالب الوصول، وتعتمد على ثلاث فئات من الأدلة.**

---

#### 📖 الشرح

**تعريف:** `Authentication` هي عملية إثبات هوية الطرف الطالب للوصول.

**طرق `Authentication` الثلاث:**

| الفئة | الوصف | أمثلة |
|-------|-------|--------|
| **Something you know** (ما تعرفه) | معلومة سرية تعرفها أنت فقط | كلمة المرور (`Password`)، جملة المرور (`Passphrase`) |
| **Something you have** (ما تملكه) | جهاز أو وثيقة فيزيائية | `Token`، البطاقة الذكية (`Smart Card`)، بطاقة الذاكرة |
| **Something you are** (ما أنت عليه) | خاصية بيولوجية | `Biometrics`: بصمة الإصبع، بصمة الوجه، بصمة العين |

**أنواع `Authentication`:**
- **`SFA` (Single-Factor Authentication):** دليل واحد فقط — مثل كلمة مرور فقط
- **`MFA` (Multi-Factor Authentication):** دليلان أو أكثر من فئات مختلفة — مثل كلمة مرور + OTP على الهاتف

#### مهم للامتحان ⚠️:
> `MFA` أكثر أماناً من `SFA`. اختراق أحد العوامل لا يكفي لاختراق النظام.

#### 💡 التشبيه:
> مطار به بوابتان: أولاً تُبيّن جواز سفرك (ما تملكه)، ثم تُبيّن بصمتك (ما أنت عليه). هذا `MFA`.
> **وجه الشبه:** الجواز = Something you have، البصمة = Something you are.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول (شريحة 19):**
> Authentication is a process to prove the identity of the requestor.
> Methods of authentication: Something you know: Passwords or paraphrases. Something you have: Tokens, memory cards, smart cards. Something you are: Biometrics, measurable characteristics.
> Types of authentication: Single-factor authentication (SFA), Multi-factor authentication (MFA).

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + الطرق الثلاث + نوعا SFA وMFA
- ℹ️ إضافة من الدليل: جدول الطرق + تشبيه المطار

</details>

---

### 10. Authorization (التفويض)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Authorization` = ماذا يُسمح لك بعمله بعد أن ثبتت هويتك.**

---

#### 📖 الشرح

**الفرق الجوهري بين `Authentication` و `Authorization`:**

| | `Authentication` | `Authorization` |
|--|-----------------|-----------------|
| **السؤال** | من أنت؟ | ماذا تستطيع أن تفعل؟ |
| **الوقت** | يحدث أولاً | يحدث بعد التحقق من الهوية |
| **المثال** | إدخال كلمة المرور | صلاحية قراءة الملف فقط بدون تعديل |

**التعريف:** `Authorization` = تحديد حقوق الوصول والصلاحيات للموارد.

**العلاقة:** بعد أن يُثبت الشخص هويته (`Authentication`)، يتحقق النظام من `Authorization` ليعرف إن كان مسموحاً له بالعملية التي يحاول تنفيذها.

#### 💡 التشبيه:
> تدخل مبنى بتصريح رسمي (Authentication = من أنت؟). لكن بعض الطوابق محجوبة عنك حتى مع التصريح (Authorization = ماذا يُسمح لك؟).
> **وجه الشبه:** التصريح = Authentication، ملصقات الطوابق المسموح بها = Authorization.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول (شريحة 20):**
> Authorization is the function of specifying access rights/privileges to resources.
> Authentication is confirming the identity of the subject. Once a subject has been authenticated, the system checks its Authorization to see if it is allowed to complete the action it is attempting.

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريفان + العلاقة + الفرق
- ℹ️ إضافة من الدليل: جدول المقارنة + تشبيه المبنى

</details>

---

### 11. Non-repudiation (عدم الإنكار)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Non-repudiation` = الحماية من إنكار شخص تنفيذه لعمل قام به فعلاً.**

---

#### 📖 الشرح

**التعريف:** الحماية ضد فرد يُنكر بشكل كاذب تنفيذه لعمل معين كـ: إنشاء بيانات، تعديلها، الاطلاع عليها، أو إرسالها.

**لماذا مهم؟**
- في العقود الرقمية: لا يمكن لشخص وقّع عقداً إلكترونياً أن ينكر توقيعه
- في المعاملات البنكية: لا يمكن للعميل إنكار تحويله المال
- في البريد الإلكتروني الرسمي: لا يمكن للمُرسِل إنكار إرسال الرسالة

**العلاقة مع `Digital Signature`:** الـ `Digital Signature` هي الآلية التقنية التي تُحقق `Non-repudiation` — لأن التوقيع الرقمي يثبت رياضياً أن المُرسِل بالذات هو من أرسل.

#### 💡 التشبيه:
> البريد المسجّل: يوقّع المستلم ويحصل على إيصال. لا يمكن لأحدهما إنكار التسليم لاحقاً.
> **وجه الشبه:** الإيصال = `Digital Signature` = دليل Non-repudiation.

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول (شريحة 21):**
> The protection against an individual falsely denying having performed a particular action (created, altered, observed, or transmitted data).

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + السياق + الربط مع Digital Signature
- ℹ️ إضافة من الدليل: أمثلة تطبيقية + تشبيه البريد المسجّل

</details>

---

### 12. Privacy (الخصوصية)
<!-- @render: {type: "prose-first", visualization: "none", coverage: "100%"} -->

#### 💡 الفكرة الأساسية
**`Privacy` = حق الفرد في التحكم بمعلوماته الشخصية وكيفية توزيعها.**

---

#### 📖 الشرح

**التعريف:** الخصوصية هي حق الفرد في التحكم بتوزيع المعلومات عن نفسه.

**الفرق المهم: `Privacy` vs `Security`:**

| | `Privacy` | `Security` |
|--|-----------|------------|
| **التعريف** | قدرة المستخدم على التحكم بمعلوماته الشخصية والوصول إليها وتنظيمها | الأنظمة التي تحمي البيانات من الوقوع في الأيدي الخاطئة |
| **التركيز** | حق المستخدم | حماية النظام |
| **التهديد** | استخدام البيانات بدون إذن | الاختراق، التسريب، الهجوم الإلكتروني |

**`GDPR` (General Data Protection Regulation):**
- اللائحة الأوروبية لحماية البيانات الشخصية **(شرح زيادة للفهم)**
- تُلزم المنظمات بالحصول على موافقة المستخدم قبل جمع بياناته
- تُعطي المستخدمين حق الوصول لبياناتهم وحذفها

#### 💡 التشبيه:
> `Privacy` = أنت تقرر من يُسمح له بدخول منزلك. `Security` = الأقفال والكاميرات التي تمنع الدخول غير المُصرَّح به.
> **وجه الشبه:** القرار = Privacy، الأقفال = Security.

#### ⚠️ أخطاء شائعة

#### الفهم الخاطئ ❌:
أن `Privacy` و `Security` نفس الشيء — إذا كان النظام آمناً فالخصوصية مصونة.

#### الفهم الصحيح ✅:
النظام قد يكون "آمناً" (لا اختراق) لكن ينتهك الخصوصية (يبيع بياناتك لشركات إعلانات بدون إذنك).

#### 📄 النص الأصلي من المحاضرة
<details>
<summary>عرض النص الأصلي (coverage: 100%)</summary>

**النص الأصلي يقول (شريحة 22):**
> The right of an individual to control the distribution of information about themselves.
> Privacy vs Security: Privacy typically refers to the user's ability to control, access, and regulate their personal information, and Security refers to the system that protects that data from getting into the wrong hands, through a breach, leak, or cyber attack.
> General Data Protection Regulation (GDPR)

**ملاحظة على التغطية:**
- ✓ تم شرح: التعريف + الفرق مع Security + GDPR (ذُكر، وأُضيف شرح للفهم)
- ℹ️ إضافة من الدليل: جدول المقارنة + تشبيه المنزل + توضيح GDPR

</details>

---

## الجزء الثالث: بطاقات سؤال وجواب (Q&A Cards)

### البطاقة 1
**Q1:** ما الفرق بين `Plaintext` و `Ciphertext`؟
**A:** `Plaintext` هو البيانات الأصلية قبل التشفير، بينما `Ciphertext` هو البيانات بعد تشفيرها وتحويلها لشكل غير مفهوم.

### البطاقة 2
**Q2:** ماذا تعني المعادلة `P = Dk'(Ek(P))`؟
**A:** تعني أن تطبيق خوارزمية التشفير `E` بالمفتاح `k` ثم خوارزمية فك التشفير `D` بالمفتاح `k'` يُعيد النص الأصلي — وهو الشرط الأساسي لأي نظام تشفير سليم.

### البطاقة 3
**Q3:** لماذا يمكن كسر `Caesar Cipher` بسهولة؟
**A:** لأنه يحتفظ بنفس نسب تكرار الأحرف. الأحرف الشائعة في `Plaintext` تبقى شائعة في `Ciphertext`، مما يسمح بـ `Frequency Analysis` لاكتشاف الإزاحة.

### البطاقة 4
**Q4:** كيف يعمل `Bit-Level Cipher`؟ ولماذا يستخدم `XOR`؟
**A:** يعرّف نمطاً ثنائياً كمفتاح ثم يُطبّق `XOR` بين البيانات والمفتاح. يُستخدم `XOR` لأن تطبيقه مرتين بنفس المفتاح يُعيد البيانات الأصلية (`A XOR K XOR K = A`).

### البطاقة 5
**Q5:** ما هي مشكلة `Key Distribution`؟ وكيف حلّها `Merkle's Puzzle`؟
**A:** المشكلة: كيف يتفق الطرفان على مفتاح سري دون إرساله عبر قناة مفتوحة؟ حل Merkle: المُرسِل يرسل n حجية، المُستقبِل يكسر واحدة عشوائياً ويُخبر المُرسِل بـ ID فقط — المتنصّت لا يعرف أي حجية اختيرت.

### البطاقة 6
**Q6:** ما مبدأ `Shamir's Method` في توزيع المفتاح؟
**A:** يُقسّم المفتاح على m شخص كنقاط على متعددة حدود. استرجاع المفتاح يتطلب حضور m شخص على الأقل، لأن متعددة حدود درجتها m-1 تحتاج m نقطة لتُحدَّد.

### البطاقة 7
**Q7:** ما الفرق الجوهري بين `Private Key` و `Public Key` encryption؟
**A:** في `Private Key` (المتماثل): نفس المفتاح للتشفير وفك التشفير (`k = k'`). في `Public Key` (غير المتماثل): مفتاح التشفير عام (`Public Key`) ومفتاح فك التشفير خاص (`Private Key`) وهما مختلفان.

### البطاقة 8
**Q8:** في `Public Key Cryptosystem`، بأي مفتاح يُشفِّر المُرسِل؟
**A:** المُرسِل يُشفِّر بـ `Public Key` الخاص بالمُستقبِل، والمُستقبِل يفك التشفير بـ `Private Key` الخاص به. لا يمكن فك التشفير بالـ `Public Key`.

### البطاقة 9
**Q9:** كيف يعمل `Digital Signature` بشكل مبسّط؟
**A:** أليس تُطبّق خوارزمية D بمفتاحها الخاص ثم خوارزمية E بمفتاح بوب العام: `M = Ej(Dk'(P))`. بوب يُطبّق العكس: `P = Ek(Dj'(M))`. نجاح الخطوة يثبت أن أليس هي من أرسلت (لأنها الوحيدة التي تعرف `k'`).

### البطاقة 10
**Q10:** ما هو `CIA Triad`؟
**A:** ثلاث ركائز لأمن المعلومات: `Confidentiality` (لا أحد غير مُخوَّل يطّلع على البيانات) + `Integrity` (البيانات لم تُعدَّل) + `Availability` (الخدمة متاحة للمُخوَّلين).

### البطاقة 11
**Q11:** ما الفرق بين `Authentication` و `Authorization`؟
**A:** `Authentication` = التحقق من هوية الشخص (من أنت؟). `Authorization` = تحديد ما يُسمح له فعله بعد التحقق من هويته (ماذا تستطيع؟). Authentication تأتي أولاً، ثم Authorization.

### البطاقة 12
**Q12:** ما هو `Non-repudiation`؟ وبأي تقنية يتحقق؟
**A:** هو الحماية من إنكار شخص تنفيذه لعمل قام به (إرسال رسالة، تعديل بيانات...). يتحقق تقنياً عبر `Digital Signature` — التوقيع الرقمي يثبت رياضياً هوية المُنفّذ.

### البطاقة 13
**Q13:** ما الفرق بين `Privacy` و `Security`؟
**A:** `Privacy` = حق الفرد في التحكم بمعلوماته الشخصية. `Security` = الأنظمة التي تحمي البيانات من الوقوع في الأيدي الخاطئة. النظام قد يكون آمناً لكن ينتهك الخصوصية (مثل بيع البيانات).

### البطاقة 14
**Q14:** ما هي طرق `Authentication` الثلاث؟
**A:** (1) Something you know: كلمة المرور. (2) Something you have: بطاقة ذكية، Token. (3) Something you are: بصمة (Biometrics). `MFA` تجمع عاملين أو أكثر.

---

## الجزء الرابع: أسئلة اختيار من متعدد (MCQ)

> **16 سؤالاً** — مستوى: medium, hard

### السؤال 1 (medium)

إذا كان `k = k'` في نظام التشفير، فهذا يعني:

أ) نظام `Public Key Cryptosystem`
ب) نظام `Private Key Encryption`
ج) نظام `Digital Signature` فقط
د) نظام `Bit-Level Cipher` فقط

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** عندما يكون مفتاح التشفير وفك التشفير نفسه، هذا هو تعريف `Private Key (Symmetric) Encryption`.
- ❌ **الخيار أ:** في `Public Key` المفتاحان مختلفان دائماً (`k ≠ k'`).
- ❌ **الخيار ج:** `Digital Signature` يستخدم مفاتيح مختلفة.
- ❌ **الخيار د:** `Bit-Level Cipher` وصف لتقنية التشفير، لكن يمكن أن يكون متماثلاً أو غير متماثل.

---

### السؤال 2 (medium)

في `Caesar Cipher`، إذا كان حرف `E` في `Plaintext` يُعادله `H` في `Ciphertext`، فما قيمة الإزاحة (`shift`)؟

أ) 2
ب) 3
ج) 4
د) 5

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** E (الموضع 5) → H (الموضع 8) = إزاحة +3.
- ❌ **الخيارات الأخرى:** الحسابات الحرفية تُظهر أن الفرق بين E وH هو بالضبط 3.

---

### السؤال 3 (hard)

عند تطبيق `Bit-Level XOR Cipher`، إذا كان `Plaintext = 1100` و `Key = 1010`، ما هو `Ciphertext` ثم نتيجة `Decryption`؟

أ) Ciphertext = 0110 → Decryption = 1100
ب) Ciphertext = 1010 → Decryption = 0110
ج) Ciphertext = 0110 → Decryption = 0110
د) Ciphertext = 1100 → Decryption = 1100

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** 1100 XOR 1010 = 0110 (Ciphertext). ثم 0110 XOR 1010 = 1100 (Plaintext الأصلي).
- ❌ **الخيارات الأخرى:** تطبيق XOR يدوياً: 1⊕1=0, 1⊕0=1, 0⊕1=1, 0⊕0=0 → 0110.

---

### السؤال 4 (medium)

في `Public Key Cryptosystem`، أي مفتاح يستخدمه المُرسِل لتشفير رسالته؟

أ) مفتاحه الخاص (`Private Key`)
ب) مفتاحه العام (`Public Key`)
ج) المفتاح العام للمُستقبِل (`Receiver's Public Key`)
د) المفتاح الخاص للمُستقبِل (`Receiver's Private Key`)

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** المُرسِل يُشفِّر بالمفتاح العام للمُستقبِل، ليضمن أن المُستقبِل فقط يستطيع فك التشفير.
- ❌ **الخيار أ:** المفتاح الخاص للمُرسِل يُستخدم في `Digital Signature`، ليس في التشفير العادي.
- ❌ **الخيار ب:** المفتاح العام للمُرسِل يُستخدم للتحقق من توقيعه، ليس للتشفير.
- ❌ **الخيار د:** المفتاح الخاص للمُستقبِل يُستخدم لفك التشفير، ولا يُعطى للمُرسِل.

---

### السؤال 5 (hard)

في `Digital Signature`، أرسلت أليس رسالة P لبوب بالصيغة `M = Ej(Dk'(P))`. ماذا يفعل بوب لاسترجاع P والتحقق من هوية أليس؟

أ) `P = Ek(Dj'(M))` — يُطبّق D بمفتاحه الخاص أولاً ثم E بمفتاح أليس العام
ب) `P = Dk'(Ej(M))` — يُطبّق E بمفتاح بوب العام ثم D بمفتاح أليس الخاص
ج) `P = Dj(Ek'(M))` — يُطبّق E بمفتاح أليس الخاص ثم D بمفتاح بوب العام
د) `P = Ej'(Dk(M))` — يُطبّق D بمفتاح أليس العام ثم E بمفتاح بوب الخاص

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** `Ek(Dj'(M))` — بوب يُطبّق Dj' (مفتاحه الخاص لفك تشفير بوب) ثم Ek (مفتاح أليس العام لفك "توقيعها"). هذا عكس ما فعلته أليس تماماً.
- ❌ **الخيار ب:** الترتيب خاطئ والمفاتيح مخلوطة.
- ❌ **الخيارات الأخرى:** تحتوي على مفاتيح خاطئة لا يملكها بوب.

---

### السؤال 6 (medium)

في `Merkle's Puzzle`، لماذا يُخبر المُستقبِل المُرسِل بـ ID الحجية فقط عبر القناة العامة؟

أ) لأن المُرسِل لا يعرف ما في الحجيات
ب) لأن المُرسِل يعرف الحجية المقابلة لكل ID فيُعرف المفتاح المتفق عليه
ج) لأن المتنصّت لا يستطيع قراءة الأرقام
د) لأن ID هو نفسه المفتاح السري

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** المُرسِل هو من أنشأ الحجيات ويعرف محتوى كل منها. إذا عرف ID فيعرف المفتاح في تلك الحجية.
- ❌ **الخيار أ:** المُرسِل يعرف كل شيء في الحجيات لأنه أنشأها.
- ❌ **الخيار ج:** المتنصّت يسمع ID لكن لا يعرف أي مفتاح يقابله لأن هناك n حجية.
- ❌ **الخيار د:** ID هو مُعرِّف الحجية فقط، وليس المفتاح السري ذاته.

---

### السؤال 7 (hard)

في `Shamir's Method`، يريد فريق من 5 أشخاص حماية مفتاح بحيث يتطلب حضور 3 منهم لاسترجاعه. ما درجة متعددة الحدود التي يجب استخدامها؟

أ) درجة 2 (polynomial of degree 2)
ب) درجة 3 (polynomial of degree 3)
ج) درجة 4 (polynomial of degree 4)
د) درجة 5 (polynomial of degree 5)

**الإجابة الصحيحة: أ**

**التعليل:**
- ✅ **الخيار أ:** إذا كان m=3 (عدد الأشخاص المطلوبين)، فدرجة المتعددة = m-1 = 3-1 = 2.
- ❌ **الخيار ب:** درجة 3 تعني m=4 أشخاص مطلوبين.
- ❌ **الخيار ج:** درجة 4 تعني m=5 (جميع الأشخاص) وهذا يُلغي الغرض.
- ❌ **الخيار د:** درجة 5 أكثر مما هو مطلوب.

---

### السؤال 8 (medium)

أي من التالي يُمثّل `Something you are` في طرق `Authentication`؟

أ) كلمة المرور
ب) البطاقة الذكية (`Smart Card`)
ج) بصمة الإصبع (`Fingerprint`)
د) رقم التعريف الشخصي (`PIN`)

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** بصمة الإصبع هي `Biometrics` — خاصية جسدية مُقيسة، تُمثّل "ما أنت عليه".
- ❌ **الخيار أ:** كلمة المرور = Something you know.
- ❌ **الخيار ب:** البطاقة الذكية = Something you have.
- ❌ **الخيار د:** PIN = Something you know.

---

### السؤال 9 (medium)

مصرف يطلب من عميله: (1) كلمة المرور، (2) رسالة OTP على هاتفه. أي نوع `Authentication` هذا؟

أ) `SFA` لأن الخطوتان متشابهتان
ب) `MFA` لأنه يجمع عاملَي "Something you know" و "Something you have"
ج) `Authorization` لأنه يُحدد صلاحيات الدخول
د) `Non-repudiation` لأنه يمنع الإنكار

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** كلمة المرور = Something you know. OTP على الهاتف = Something you have. عاملان من فئتين مختلفتين = `MFA`.
- ❌ **الخيار أ:** `SFA` = عامل واحد فقط.
- ❌ **الخيار ج:** `Authorization` يحدث بعد التحقق من الهوية، وليس هذا ما يصفه السؤال.
- ❌ **الخيار د:** `Non-repudiation` مفهوم مختلف يتعلق بإثبات الفعل لاحقاً.

---

### السؤال 10 (hard)

موظف تمكّن من الدخول لنظام الشركة (اجتاز `Authentication`) لكن حاول الوصول لملفات الرواتب وظهرت له رسالة "Access Denied". أي مفهوم أمني منعه؟

أ) `Encryption`
ب) `Non-repudiation`
ج) `Authorization`
د) `Privacy`

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `Authorization` = تحديد ما يُسمح للموظف بالوصول إليه. رغم أنه مصادَق عليه (`Authenticated`)، صلاحياته لا تشمل ملفات الرواتب.
- ❌ **الخيار أ:** `Encryption` تُخفي البيانات ولكن لا تمنع الوصول بهذه الطريقة.
- ❌ **الخيار ب:** `Non-repudiation` يتعلق بإثبات الأفعال السابقة.
- ❌ **الخيار د:** `Privacy` حق المستخدم في بياناته الشخصية، وليس آلية التحكم بالوصول.

---

### السؤال 11 (medium)

أي من التالي ينتهك `Confidentiality` (السرية)؟

أ) مهاجم يُعدّل محتوى رسالة في الطريق
ب) مهاجم يقرأ رسائل المستخدمين دون تعديلها
ج) مهاجم يُوقف الخادم عن الاستجابة
د) مهاجم يتظاهر بأنه المُرسِل

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** قراءة بيانات خاصة بدون إذن هو انتهاك مباشر للـ `Confidentiality`.
- ❌ **الخيار أ:** تعديل الرسالة ينتهك `Integrity`.
- ❌ **الخيار ج:** إيقاف الخادم ينتهك `Availability`.
- ❌ **الخيار د:** التظاهر بهوية آخر ينتهك `Authentication/Non-repudiation`.

---

### السؤال 12 (hard)

شركة تحتفظ بتاريخك الطبي وتسريباته. أي تصنيف يشمل هذه البيانات؟

أ) `PII` فقط
ب) `PHI` فقط
ج) `PII` و `PHI` معاً
د) لا تصنيف، لأنها ليست بيانات مالية

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** التاريخ الطبي هو `PHI`. لكن يحتوي أيضاً على اسمك ورقم هويتك وهي `PII`. كلا التصنيفين ينطبقان.
- ❌ **الخيار أ:** `PII` فقط غير كافٍ — التاريخ الطبي تحديداً `PHI`.
- ❌ **الخيار ب:** `PHI` يتضمن ضمناً بيانات `PII` لكن المحاضرة تُميّزهما.
- ❌ **الخيار د:** البيانات الصحية محمية بصرف النظر عن الطابع المالي.

---

### السؤال 13 (hard)

في `Frequency Analysis` على `Caesar Cipher`، إذا وجدت أن الرمز `\` يتكرر أكثر من غيره في `Ciphertext`، ماذا تستنتج؟

أ) أن `\` هو حرف `E` في `Plaintext`
ب) أن `\` هو المسافة (space) في `Plaintext`
ج) أن `\` هو حرف `T` في `Plaintext`
د) لا يمكن الاستنتاج بدون معلومات إضافية

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** من المحاضرة: الحرف `\` تكرر 7 مرات (الأعلى)، والمسافة هي الأكثر تكراراً في الإنجليزية — الاستنتاج الأرجح أنها المسافة.
- ❌ **الخيار أ:** `E` أكثر تكراراً من حروف أخرى لكن المسافة أكثر منه.
- ❌ **الخيار ج:** `T` أقل تكراراً من المسافة.
- ❌ **الخيار د:** تحليل التكرار يُعطي احتمالات مرتفعة يمكن البناء عليها.

---

### السؤال 14 (medium)

أي من التالي يُعرَّف بأنه `Non-repudiation`؟

أ) منع الأشخاص غير المُخوَّلين من قراءة البيانات
ب) ضمان أن البيانات لم تُعدَّل أثناء النقل
ج) حماية الفرد من إنكار تنفيذه لعمل قام به فعلاً
د) التحقق من هوية المُرسِل قبل قبول رسالته

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** هذا هو التعريف الحرفي لـ `Non-repudiation` من المحاضرة.
- ❌ **الخيار أ:** هذا `Confidentiality`.
- ❌ **الخيار ب:** هذا `Integrity`.
- ❌ **الخيار د:** هذا `Authentication`.

---

### السؤال 15 (hard)

موقع إلكتروني يجمع بريدك الإلكتروني بدون إخبارك ويبيعه لمُعلنين. أي مفهوم انتُهك بشكل رئيسي؟

أ) `Security` لأن النظام اخترق
ب) `Privacy` لأن بياناتك استُخدمت بدون إذنك
ج) `Authentication` لأن هويتك لم تُتحقق منها
د) `Integrity` لأن البيانات تغيّرت

**الإجابة الصحيحة: ب**

**التعليل:**
- ✅ **الخيار ب:** `Privacy` = حق التحكم بمعلوماتك الشخصية. جمع وبيع بياناتك بدون إذن هو انتهاك مباشر للـ Privacy.
- ❌ **الخيار أ:** `Security` تعني الحماية من الاختراق — لم يُذكر اختراق هنا.
- ❌ **الخيار ج:** `Authentication` يتعلق بإثبات الهوية للدخول.
- ❌ **الخيار د:** `Integrity` يتعلق بعدم تعديل البيانات.

---

### السؤال 16 (hard)

أليس تريد إرسال رسالة R لبوب بحيث: (1) يقرأها بوب فقط، و(2) يتحقق بوب أن أليس هي من أرسلتها. أي عملية تستخدم أليس؟

أ) `M = Ek(R)` فقط (تشفير بمفتاح أليس العام)
ب) `M = Ej(R)` فقط (تشفير بمفتاح بوب العام)
ج) `M = Ej(Dk'(R))` (توقيع أليس الخاص + تشفير بوب العام)
د) `M = Dk'(Ej(R))` (تشفير بوب العام ثم توقيع أليس)

**الإجابة الصحيحة: ج**

**التعليل:**
- ✅ **الخيار ج:** `Dk'(R)` يُنشئ التوقيع الرقمي بمفتاح أليس الخاص (يثبت هويتها). ثم `Ej(...)` يُشفِّر بمفتاح بوب العام (يضمن أن بوب فقط يقرأها).
- ❌ **الخيار أ:** يُشفِّر بمفتاح أليس العام — بوب لا يملك مفتاحها الخاص لفك التشفير.
- ❌ **الخيار ب:** يُشفِّر فقط بمفتاح بوب، لكن لا يثبت هوية أليس.
- ❌ **الخيار د:** الترتيب خاطئ — يجب تطبيق التوقيع أولاً ثم التشفير.

---

## الجزء الخامس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 التعاريف السريعة
| المصطلح | التعريف القصير |
|---------|----------------|
| `Encryption` | تحويل `Plaintext` لـ `Ciphertext` غير مفهوم |
| `Decryption` | استعادة `Plaintext` من `Ciphertext` |
| `Plaintext` | البيانات الأصلية قبل التشفير |
| `Ciphertext` | البيانات بعد التشفير |
| `Caesar Cipher` | تشفير بإزاحة ثابتة لقيمة كل حرف |
| `Bit-Level Cipher` | تشفير باستخدام `XOR` مع مفتاح ثنائي |
| `Private Key Encryption` | تشفير متماثل: نفس المفتاح للطرفين (`k = k'`) |
| `Public Key Cryptosystem` | تشفير غير متماثل: Public Key للتشفير، Private Key لفك التشفير |
| `Digital Signature` | آلية رياضية تُثبت هوية المُرسِل وتمنع الإنكار |
| `Authentication` | عملية التحقق من هوية الطالب |
| `Authorization` | تحديد حقوق الوصول بعد التحقق من الهوية |
| `Non-repudiation` | منع إنكار تنفيذ عمل قُم به فعلاً |
| `Confidentiality` | عدم كشف المعلومات لغير المُخوَّلين |
| `Integrity` | ضمان عدم تعديل البيانات |
| `Availability` | ضمان توفر الخدمة للمُخوَّلين |
| `Privacy` | حق الفرد في التحكم بمعلوماته الشخصية |
| `PII` | معلومات تُعرِّف الشخص (اسم، هاتف، بريد إلكتروني) |
| `PHI` | معلومات صحية شخصية (تاريخ طبي، نتائج مختبر) |
| `MFA` | مصادقة متعددة العوامل (عاملان أو أكثر) |
| `GDPR` | لائحة أوروبية لحماية البيانات الشخصية |

---

### 🔑 جداول المقارنة

#### Private Key vs Public Key
| المعيار | `Private Key` (متماثل) | `Public Key` (غير متماثل) |
|---------|----------------------|--------------------------|
| **المفاتيح** | مفتاح واحد (`k = k'`) | مفتاحان مختلفان |
| **التوزيع** | مشكلة معقدة | لا توزيع مطلوب |
| **السرعة** | أسرع | أبطأ |
| **مثال** | `Caesar`, `Bit-Level XOR` | `RSA` |
| **الميزة** | بسيط وسريع | يحل مشكلة التوزيع |

#### طرق Authentication الثلاث
| الفئة | الأمثلة | نقطة ضعف |
|-------|---------|----------|
| Something you know | Password, PIN | يمكن تخمينه أو سرقته |
| Something you have | Token, Smart Card | يمكن فقدانه أو سرقته |
| Something you are | Biometrics | صعب تزوير لكن لا يمكن تغييره |

#### CIA Triad
| الركيزة | التعريف | التهديد | الحل |
|---------|---------|---------|------|
| `Confidentiality` | لا أحد غير مُخوَّل يقرأ البيانات | التنصّت | `Encryption` |
| `Integrity` | البيانات لم تُعدَّل | Man-in-the-Middle | `Digital Signature`, Hash |
| `Availability` | الخدمة متاحة | هجمات DoS | تكرار، نسخ احتياطي |

---

### 🔑 القواعد الذهبية لا تُنسى
| # | القاعدة |
|---|---------|
| 1 | في `Public Key`: المُرسِل يُشفِّر بمفتاح المُستقبِل **العام** — المُستقبِل يفك بمفتاحه **الخاص** |
| 2 | `XOR` مرتين بنفس المفتاح يُعيد الأصل: `A ⊕ K ⊕ K = A` |
| 3 | `Caesar Cipher` ضعيف لأن `Frequency Analysis` يكسره |
| 4 | `Authentication` (من أنت؟) يأتي **قبل** `Authorization` (ماذا تستطيع؟) |
| 5 | `Digital Signature` = `D_{k'}` (خاص المُرسِل) + `E_j` (عام المُستقبِل) |
| 6 | `Privacy` ≠ `Security` — النظام الآمن قد ينتهك الخصوصية |
| 7 | `Shamir's Method`: m أشخاص لاسترجاع المفتاح ← متعددة حدود درجة (m-1) |
| 8 | `MFA` أكثر أماناً من `SFA` لأنه يجمع عوامل من فئات مختلفة |

---

### 🔑 قاموس المصطلحات
| المصطلح | المعنى |
|---------|--------|
| `E_k(P)` | تطبيق خوارزمية التشفير E بالمفتاح k على النص P |
| `D_k'(C)` | تطبيق خوارزمية فك التشفير D بالمفتاح k' على C |
| `XOR` | عملية "OR الحصري" — مختلفان → 1، متماثلان → 0 |
| `Frequency Analysis` | تحليل نسب تكرار الأحرف لكسر `Caesar Cipher` |
| `Brute Force` | تجربة جميع الاحتمالات حتى النجاح |
| `Polynomial` | متعددة حدود رياضية — مستخدمة في Shamir's Method |
| `Biometrics` | خصائص جسدية قابلة للقياس للتعرف على الهوية |
| `SFA` | Single-Factor Authentication — عامل واحد فقط |
| `MFA` | Multi-Factor Authentication — عاملان أو أكثر |
| `PII` | Personally Identifiable Information |
| `PHI` | Protected/Personal Health Information |
| `GDPR` | General Data Protection Regulation |

---

### 🔑 الخطوات السريعة

#### Digital Signature — الإرسال
```algorithm
1 | أليس: طبّق D_{k'}(P) | Private Key of Alice | "توقيع" أليس
2 | أليس: طبّق E_j(نتيجة 1) | Public Key of Bob | M = Ej(Dk'(P)) — أرسلي هذا
3 | بوب يتلقى M | — | يبدأ فك التشفير والتحقق
4 | بوب: طبّق D_{j'}(M) | Private Key of Bob | يحصل على Dk'(P)
5 | بوب: طبّق E_k(نتيجة 4) | Public Key of Alice | P = الأصلي ← التحقق نجح!
```

#### Merkle's Puzzle — توزيع المفتاح
```algorithm
1 | المُرسِل: أنشئ n حجية | مفاتيح مختلفة | كل حجية تحتوي ID + مفتاح سري
2 | المُرسِل: أرسل n حجية | القناة العامة | المُستقبِل يتلقاها كلها
3 | المُستقبِل: اختر حجية واحدة | عشوائياً | اكسرها Brute Force
4 | المُستقبِل: أرسل ID الحجية فقط | القناة العامة | المُرسِل يعرف المفتاح
5 | كلاهما يعرف المفتاح الآن | — | ابدأ التواصل المشفّر
```
