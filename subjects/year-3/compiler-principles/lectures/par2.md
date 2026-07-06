# المحاضرة 4 — Lexical Analysis (التحليل المعجمي)
> **المادة:** مبادئ المترجمات (القسم النظري) | **الموضوع:** التحليل المعجمي باستخدام اللغات والقواعد المنتظمة
> **الأستاذة:** د. أليدا اسبر | **الشرائح:** 42–52

---

## 📌 خريطة التكامل (أين تقع هذه المحاضرة في الدورة؟)

| المرحلة | الأدوات | المخرجات |
| --- | --- | --- |
| التحليل المعجمي (`Lexical Analysis`) ← **أنت هنا** | `Regular Grammar`، `Regular Expressions`، `DFA`، `Scanner` | `Tokens` (مفردات) |
| التحليل النحوي (`Syntax Analysis`) | `CFG`، `Parse Tree`، `LL/LR Parser` | `Parse Tree` (شجرة الاشتقاق) |
| التحليل الدلالي (`Semantic Analysis`) | `Symbol Table`، `Type Checking` | `Annotated AST` |
| توليد الكود (`Code Generation`) | `AST`، `IR`، `Register Allocation` | كود قابل للتنفيذ |

> **نوع هذه المحاضرة:** نظري + تطبيقي — تعريف `Scanner`، بناء `Regular Grammar`، تحويلها إلى `Regular Expression`، رسم `Automaton (DFA)`، وكتابة `pseudocode` للـ`Scanner`.

---

## الجزء الأول: الشرح التفصيلي

### 1. التحليل المعجمي — لماذا نحتاجه؟

#### النص الأصلي يقول:
> **Lexical Analysis using Regular Languages & Grammars**
> - Lexical Analyzer Scans Words
> - The Scanner is a program written using a programming language

#### الشرح المبسّط:
المترجم يقرأ النص البرمجي **حرفاً حرفاً**، ولكنه لا يعالجه مباشرةً — بل يُكوّن أولاً **كلمات/مفردات** (`Tokens`) مثل أسماء المتغيرات، الأرقام، الكلمات المحجوزة. هذه المهمة تقوم بها مرحلة `Lexical Analysis`.

💡 **التشبيه:**
> تخيّل أنك تقرأ جملة — عينك لا تقرأ حرفاً واحداً بل تلتقط كلمات كاملة. `Scanner` هو "العين" التي تجمّع الحروف إلى كلمات.
> **وجه الشبه:** الحروف المتتالية = مدخل برنامج، الكلمة = `Token`.

**لماذا؟** لأن العمل على مستوى الحروف بالتحليل النحوي مباشرةً سيجعل القواعد النحوية `CFG` معقدة جداً — لذلك نفصل المرحلتين.

---

### 2. المثال 1 — المُعرِّف (`Identifier`)

#### النص الأصلي يقول (شريحة 44):
> **Example (1):** Let us assume that identifiers are composed of letters and digits and finish with a '\n' character
>
> ```
> Identifier = Letter {Letter | Digit} EndChar
> Letter = "a"|"b"|...|"z"
> Digit = "0"|....|"9"
> EndChar = "\n"
> ```

#### الشرح المبسّط:

هذه **قاعدة نحوية منتظمة** (`Regular Grammar`) تصف شكل المُعرِّف (`Identifier`):

| الرمز | المعنى | القيم |
| --- | --- | --- |
| `Identifier` | `Non-Terminal` رئيسي (الهدف) | القاعدة كاملة |
| `Letter` | حرف صغير | `a` أو `b` أو … أو `z` |
| `Digit` | رقم | `0` أو `1` أو … أو `9` |
| `EndChar` | محرف النهاية | `\n` (سطر جديد) |
| `{...}` | تكرار صفر مرة أو أكثر | (`Kleene Star`) |
| `\|` | أو (`OR`) | |

**📐 المعادلة: قاعدة المُعرِّف**

$$
Identifier = Letter \; \{Letter \; | \; Digit\} \; EndChar
$$

**الشرح:**
> - `Letter` أولاً: يجب أن يبدأ المعرِّف بحرف
> - `{Letter | Digit}`: يتبعه صفر أو أكثر من حروف أو أرقام (التكرار الحر)
> - `EndChar = \n`: ينتهي بمحرف السطر الجديد

#### 🤔 تفعيل الفهم:
> **سؤال:** لماذا يجب أن يبدأ المعرِّف بحرف وليس برقم؟
> **لأن:** لو بدأ برقم، سيتعارض مع الأعداد الصحيحة ويصعب على الـ`Scanner` التمييز. هذا قرار تصميمي في معظم لغات البرمجة.

---

### 2.1. تمرين المحاضرة 4 — `Username` (من ملف التمارين الجزء الأول، الصفحة 1)

#### النص الأصلي يقول:
> **مثال:** عرّف اسم المستخدم (`Username`) بحيث يبدأ الاسم بـ `_` أو حرف ما، يتبعه **أي** عدد من الحروف أو الأرقام، وينتهي بـ `!`. اكتب القواعد النحوية.

#### الحل:

```
Username = Startchar {Letter | Digit} Endchar
Startchar = "_" | Letter
Letter    = "A"|"B"|...|"Z" | "a"|"b"|...|"z"
Digit     = "0"|"1"|...|"9"
Endchar   = "!"
```

**هل الجملة التالية مقبولة؟**
`_user!` ← ✅ نعم، لأن:
- تبدأ بـ `_` ← `Startchar` ✅
- يتبعها `u`, `s`, `e`, `r` ← حروف (`Letter`) ✅
- تنتهي بـ `!` ← `Endchar` ✅

`_a!?` ← ❌ لأن `?` ليست `Endchar` المطلوب.

**المطلوب الآن: كتابة الكود الخاص بهذا المثال مع رسم الخوارزمية**

```algorithm
1 | GetNext()          | Scanner     | اقرأ المحرف الأول
2 | هل Symbol هو "_" أو Letter؟ | Decision | إذا لا → Error
3 | GetNext()          | Scanner     | اقرأ المحرف التالي
4 | while (Letter OR Digit) | Loop   | كرّر طالما حرف أو رقم
5 |   GetNext()        | Scanner     | اقرأ المحرف التالي
6 | هل Symbol == "!" ؟ | Decision    | إذا نعم → TRUE، إذا لا → Error
```

#### 📊 المخطط: `DFA` لـ`Username`

#### ما هذا المخطط؟
> يمثّل الآلة الحالاتية المحدودة (`DFA`) التي تتحقق من صحة `Username`.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | `Start` | `event` (حالة بداية) | حالة البداية |
| 2 | `A` | `process` (حالة وسطى) | قرأنا `Startchar` بنجاح |
| 3 | `End` | `event` (حالة نهاية) | قرأنا `!` — مقبول |
| 4 | `Error` | `error` | محرف غير متوقع |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| `Start` | `A` | `"_" \| Letter` | `→` | محرف بداية صحيح |
| `A` | `A` | `Letter \| Digit` | `↺` (حلقة) | تكرار داخلي |
| `A` | `End` | `"!"` | `→` | محرف النهاية |
| `Start` | `Error` | `غير ذلك` | `→` | محرف غير صحيح |
| `A` | `Error` | `غير ذلك` | `→` | محرف غير متوقع |

```diagram
type: flowchart
title: DFA for Username
direction: LR
nodes:
  - id: start
    label: Start
    kind: event
    level: 0
  - id: A
    label: A
    kind: process
    level: 1
  - id: end
    label: End
    kind: event
    level: 2
  - id: err
    label: Error
    kind: error
    level: 1
edges:
  - from: start
    to: A
    label: _ | Letter
  - from: A
    to: A
    label: Letter | Digit
  - from: A
    to: end
    label: "!"
  - from: start
    to: err
    label: غير ذلك
  - from: A
    to: err
    label: غير ذلك
```

---

### 2.2. تمرين — `Integer` (من ملف التمارين الجزء الأول، الصفحة 2)

#### النص الأصلي يقول:
> **مثال:** لتصميم آلة ذاتية للتعرف على الأرقام الصحيحة (`integer`) وتنتهي بـ `ز`.

#### الحل:

```
integer  = digit {digit} Endchar
digit    = "0"|"1"|...|"9"
Endchar  = "ز"
```

**الشرح:**
- `integer` يتكوّن من رقم واحد على الأقل (`digit`) يتبعه صفر أو أكثر من الأرقام `{digit}`.
- ينتهي بالمحرف الخاص `ز`.

**📐 المعادلة:**
$$
integer = digit \; \{digit\} \; Endchar
$$

**التعبير المنتظم المكافئ:**
$$
(0|1|2|...|9)^+ \; \text{"ز"}
$$

> ملاحظة: `digit {digit}` = رقم واحد + صفر أو أكثر = **رقم أو أكثر** = `digit+`

```algorithm
1 | GetNext()           | Scanner     | اقرأ المحرف الأول
2 | هل Symbol رقم؟      | Decision    | إذا لا → Error
3 | GetNext()           | Scanner     | اقرأ التالي
4 | while (Digit)       | Loop        | كرّر طالما رقم
5 |   GetNext()         | Scanner     | اقرأ التالي
6 | هل Symbol == "ز" ؟  | Decision    | إذا نعم → TRUE، إذا لا → Error
```

---

### 2.3. تمرين — `Password` (من ملف التمارين الجزء الأول، الصفحة 3)

#### النص الأصلي يقول:
> **مثال:** اكتب قواعد لـ`Password` تمرّ بحرف يكون دومًا بحرف، ثم يتبعه أي عدد من الحروف أو الأرقام، وتنتهي بـرمز خاص `!`. اكتب الكود والخوارزمية.

#### الحل:

```
Password = Startchar {letter | Digit} Endchar
Startchar = "A"|"B"|...|"Z"
letter    = "a"|"b"|...|"z" | "A"|"B"|...|"Z"
Digit     = "0"|"1"|...|"9"
Endchar   = "!"
```

**ملاحظة مهمة ⚠️:** `Startchar` هنا = حرف كبير فقط (لا يشمل الأرقام ولا `_`)، بينما في `Username` يشمل `_` أيضاً.

```algorithm
1 | GetNext()              | Scanner   | اقرأ المحرف الأول
2 | هل Symbol حرف كبير؟   | Decision  | إذا لا → Error
3 | GetNext()              | Scanner   | اقرأ التالي
4 | while (letter OR Digit)| Loop      | تكرار
5 |   GetNext()            | Scanner   | اقرأ التالي
6 | هل Symbol == "!" ؟     | Decision  | TRUE أو Error
```

---

### 2.4. تمرين — `Email` (من ملف التمارين الجزء الأول، الصفحة 4)

#### النص الأصلي يقول:
> **مثال:** اكتب قواعد لتعريف البريد الإلكتروني (`Email`) حيث يتكون من حروف، تتضمن `@`، ويستخدم نطاق `.com`.

#### الحل:

```
Email    = Username "@" Domain
Username = Startchar {letter | digit}
Startchar= letter
letter   = "a"|"b"|...|"z"
digit    = "0"|"1"|...|"9"
Domain   = {letter} endsuffix
endsuffix= ".com"
```

**📐 المعادلة:**
$$
Email = Username \; \text{"@"} \; Domain
$$

**التعبير المنتظم المكافئ:**
$$
(a|b|...|z)(a|b|...|z|0|...|9)^* \; \text{"@"} \; (a|b|...|z)^+ \; \text{".com"}
$$

#### 🤔 تفعيل الفهم:
> **سؤال:** لماذا `Username` يبدأ بـ`letter` فقط (لا بـ`_`) في هذا التمرين؟
> **لأن:** هذا اختيار التعريف — في هذا المثال قرّر المصمم أن `Username` في البريد يبدأ بحرف فقط. في المثال السابق (`Username` العام) كان مسموحاً بـ`_`.

---

### 3. المثال 2 — `pseudocode` لـ`IsIdentifier()` (شريحة 45)

#### النص الأصلي يقول:
```
int IsIdentifier()
{
    GetNext();
    if (Symbol is a Letter)
    {
        GetNext();
        while ((Symbol is a Letter) || (Symbol is a Digit)) /*Case Switch*/
            GetNext();
        if (Symbol == '\n')
            return TRUE;
        else    return Error();
    }
    else    return Error();
}
```

#### الشرح المبسّط:

هذا كود `Scanner` المقابل للقاعدة النحوية `Identifier = Letter {Letter|Digit} EndChar`.

| السطر | ماذا يفعل؟ |
| --- | --- |
| `GetNext()` | يقرأ المحرف الأول من المدخل |
| `if (Symbol is a Letter)` | يتحقق أن البداية حرف (شرط `Startchar`) |
| `while (Letter \|\| Digit)` | حلقة تكرار ← تقابل `{Letter \| Digit}` في القاعدة |
| `if (Symbol == '\n')` | يتحقق من `EndChar` |
| `return TRUE` | الكلمة مقبولة كـ`Identifier` |
| `return Error()` | الكلمة غير صحيحة |

#### مهم للامتحان ⚠️:
> العلاقة المباشرة: كل جزء من `pseudocode` يقابل جزءاً من القاعدة النحوية:
> - `if (Letter)` ← `Letter` في بداية القاعدة
> - `while (Letter||Digit)` ← `{Letter|Digit}` (الأقواس المعقوفة = حلقة `while`)
> - `if (Symbol=='\n')` ← `EndChar`

---

### 4. المثال 3 — `Automaton (DFA)` للـ`Scanner` (شريحة 46)

#### النص الأصلي يقول:
> **The automaton representing the Scanner:**
> - `Start` →(Letter)→ `A` →('\n')→ `End`
> - `A` →(Letter OR Digit)→ `A` (حلقة على نفسها)

#### الشرح المبسّط:

هذا `DFA` (آلة حالات محدودة حتمية) يمثّل نفس قاعدة `Identifier`:

#### 📊 المخطط: `DFA` لـ`Identifier`

#### ما هذا المخطط؟
> يوضّح سير التعرف على `Identifier` حالةً بحالة.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | `Start` | `event` | حالة البداية (الحالة الأولية) |
| 2 | `A` | `process` | قرأنا حرفاً صحيحاً، نواصل |
| 3 | `End` | `event` | حالة القبول (`Accepting State`) |

#### وصف الروابط:
| من | إلى | التسمية | نوع السهم | الشرح |
| --- | --- | --- | --- | --- |
| `Start` | `A` | `Letter` | `→` | يجب أن يبدأ بحرف |
| `A` | `A` | `Letter OR Digit` | `↺` | تكرار — حرف أو رقم |
| `A` | `End` | `'\n'` | `→` | وصلنا لـ`EndChar` — مقبول |

```diagram
type: flowchart
title: DFA for Identifier
direction: LR
nodes:
  - id: start
    label: Start
    kind: event
    level: 0
  - id: A
    label: A
    kind: process
    level: 1
  - id: end
    label: End
    kind: event
    level: 2
edges:
  - from: start
    to: A
    label: Letter
  - from: A
    to: A
    label: Letter OR Digit
  - from: A
    to: end
    label: "\n"
```

---

### 5. المخطط الانسيابي `Flowchart` للـ`Scanner` (شريحة 47)

#### النص الأصلي يقول:
> (مخطط انسيابي يبدأ بـ `Start` → `GetNext()` → قرار `Symbol is a letter` → ...)

#### الشرح المبسّط:

```algorithm
1 | Start                        | -          | نقطة البداية
2 | GetNext()                    | Scanner    | اقرأ المحرف الأول
3 | هل Symbol حرف (Letter)؟      | Decision   | لا → Error ويتوقف
4 | GetNext()                    | Scanner    | اقرأ المحرف التالي
5 | هل (Letter OR Digit)؟        | Decision   | نعم → ارجع للخطوة 4 (حلقة)
6 | هل Symbol == "\n" ؟          | Decision   | لا → Error
7 | True                         | End        | الكلمة مقبولة كـIdentifier
```

#### 📊 المخطط الانسيابي: `Flowchart` لـ`IsIdentifier`

#### ما هذا المخطط؟
> يوضح تسلسل القرارات في دالة `IsIdentifier()` بصورة بيانية.

#### وصف العُقد:
| # | العُقدة | النوع `kind` | الشرح |
| --- | --- | --- | --- |
| 1 | `Start` | `event` | بداية الدالة |
| 2 | `GetNext()` | `process` | قراءة المحرف |
| 3 | `Symbol is a letter` | `decision` | فحص الشرط الأول |
| 4 | `GetNext()` داخل | `process` | قراءة التالي |
| 5 | `Symbol is Letter OR Digit` | `decision` | حلقة التكرار |
| 6 | `Symbol = "\n"` | `decision` | فحص نهاية المعرِّف |
| 7 | `True` | `event` | نتيجة ← مقبول |
| 8 | `Error` | `error` | نتيجة ← مرفوض |

```diagram
type: flowchart
title: Flowchart for IsIdentifier
direction: TD
nodes:
  - id: start
    label: Start
    kind: event
    level: 0
  - id: gn1
    label: GetNext()
    kind: process
    level: 1
  - id: d1
    label: Symbol is a Letter?
    kind: decision
    level: 2
  - id: err1
    label: Error
    kind: error
    level: 3
  - id: gn2
    label: GetNext()
    kind: process
    level: 3
  - id: d2
    label: Letter OR Digit?
    kind: decision
    level: 4
  - id: d3
    label: Symbol = "\n"?
    kind: decision
    level: 5
  - id: err2
    label: Error
    kind: error
    level: 6
  - id: true
    label: True
    kind: event
    level: 6
edges:
  - from: start
    to: gn1
  - from: gn1
    to: d1
  - from: d1
    to: err1
    label: No
  - from: d1
    to: gn2
    label: Yes
  - from: gn2
    to: d2
  - from: d2
    to: gn2
    label: Yes (loop)
  - from: d2
    to: d3
    label: No
  - from: d3
    to: err2
    label: No
  - from: d3
    to: true
    label: Yes
```

---

### 6. النتيجة — التوليد التلقائي (شريحة 48)

#### النص الأصلي يقول:
> - Using the Automata → Automatic Generation of IsIdentifier()
> - Representing Rules under the form of Automata in order to generate automatically the procedure

#### الشرح المبسّط:
الفكرة المحورية: بدلاً من كتابة `IsIdentifier()` يدوياً، نستطيع تمثيل القواعد النحوية كـ`Automaton (DFA)` ثم **توليد الكود تلقائياً** منه!

| الخطوة | ما نفعله |
| --- | --- |
| 1 | نكتب `Regular Grammar` |
| 2 | نحوّلها إلى `DFA` |
| 3 | `DFA` → `pseudocode` تلقائياً |

💡 **التشبيه:**
> هذا مثل برنامج يُصمّم مخططاً للمنزل (`DFA`) ثم يولّد تلقائياً قائمة المواد (`pseudocode`).
> **وجه الشبه:** المخطط = `DFA`، قائمة المواد = `Scanner Code`.

---

### 7. القواعد المنتظمة والتعابير المنتظمة (شريحتا 49–50)

#### النص الأصلي يقول:
> **Regular Grammars & Regular Expressions (1)**
> ```
> Identifier = Letter {Letter | Digit} EndChar
> Letter = "a"|"b"|...|"z"
> Digit = "0"|...|"9"
> EndChar = "\n"
> ```
> Let us Solve the previous equations: The result is a Regular Expression
> $$(a | b... | z)\{a | b | ... | z | 0 | ... | 9\}'\text{n}'$$

#### الشرح المبسّط:

**🔄 قبل / بعد: من `Regular Grammar` إلى `Regular Expression`**

**قبل (القاعدة النحوية):**
```text
Identifier = Letter {Letter | Digit} EndChar
Letter = "a"|"b"|...|"z"
Digit = "0"|...|"9"
EndChar = "\n"
```

**بعد (التعبير المنتظم):**
```text
(a|b|...|z){a|b|...|z|0|...|9}*'\n'
```

**ماذا تغيّر؟** استبدلنا كل `Non-Terminal` بقيمته مباشرةً وحصلنا على تعبير منتظم واحد مضغوط.

#### 📐 المعادلة: `Regular Expression` للـ`Identifier`

$$
(a \;|\; b \;|\; ... \;|\; z)\{a \;|\; b \;|\; ... \;|\; z \;|\; 0 \;|\; ... \;|\; 9\}^* \; '\text{n}'
$$

**الشرح:**
| الجزء | المعنى |
| --- | --- |
| `(a\|b\|...\|z)` | حرف صغير واحد إلزامي في البداية |
| `{...}*` أو `(...)^*` | صفر أو أكثر (يقابل `{...}` في القاعدة) |
| `'\n'` | محرف النهاية |

---

### 8. تعريف اللغة المنتظمة (`Regular Language`) (شريحة 50)

#### النص الأصلي يقول:
> **تعريف:** نستطيع تعريف "لغة منتظمة" L (Regular Language) على أبجدية Σ بشكل عودي كما يلي:
> - {ε} هي لغة منتظمة على Σ
> - إذا كان `a` حرفاً من حروف الأبجدية Σ، تكون {a} لغة منتظمة على Σ
> - إذا كانت `L` لغة منتظمة على Σ، تكون كلٌّ من `L^n` و `L^*` لغات منتظمة على Σ

#### الشرح المبسّط:

| القاعدة | المعنى |
| --- | --- |
| `{ε}` منتظمة | اللغة التي تحتوي الكلمة الفارغة فقط هي منتظمة |
| `{a}` منتظمة | أي حرف منفرد يكوّن لغة منتظمة |
| `L^n` و `L^*` منتظمتان | تكرار اللغة المنتظمة ينتج لغة منتظمة |

💡 **التشبيه:**
> اللغة المنتظمة مثل مجموعة أرقام يمكن وصفها بقاعدة بسيطة. مثلاً "كل الأرقام الزوجية" يمكن وصفها بقاعدة.
> **وجه الشبه:** القاعدة البسيطة = `Regular Expression`، المجموعة = `Regular Language`.

#### 🤔 تفعيل الفهم:
> **سؤال:** هل كل اللغات يمكن وصفها بـ`Regular Expression`؟
> **لا!** مثلاً لغة `{a^n b^n | n ≥ 1}` ليست منتظمة — تحتاج `CFG`. هذا هو الفرق بين `Lexical Analysis` و`Syntax Analysis`.

---

### 9. تعريف التعابير المنتظمة (`Regular Expressions`) (شريحة 51)

#### النص الأصلي يقول:
> **تعريف:** يمكن توصيف اللغات المنتظمة، باستخدام أداة ندعوها "التعابير المنتظمة" (Regular Expressions). نعطي فيما يلي تعريف عودي للتعابير المنتظمة:
> - `ε` هو تعبير منتظم يوصف اللغة {ε}
> - إذا كان `a` حرفاً من حروف الأبجدية Σ، يكون `a` تعبيراً منتظماً يوصف اللغة {a}
> - إذا كان `r` تعبيراً منتظماً يوصف اللغة `L` فإن كلاً من `(r)*` و `(r)+` عبارة عن تعبيرين منتظمين يوصفان اللغتين `L*` و `L+` على الترتيب
> - إذا كان `r1` و `r2` تعبيرين منتظمين يوصفان اللغتين `L1` و `L2` على الترتيب، فإن كلاً من `(r)(r2)` و `(r1)|(r2)` عبارة عن تعبيرين منتظمين يوصفان اللغتين `L1.L2` و `L1 ∪ L2` على الترتيب

#### جدول عمليات `Regular Expressions`:

| العملية | الرمز | المعنى | مثال |
| --- | --- | --- | --- |
| `Concatenation` | `r1 r2` | تسلسل: `L1.L2` | `ab` ← الكلمات من `a` يتبعها `b` |
| `Union` (OR) | `r1\|r2` | اتحاد: `L1 ∪ L2` | `a\|b` ← `a` أو `b` |
| `Kleene Star` | `r*` | صفر أو أكثر: `L*` | `a*` ← `ε, a, aa, aaa, ...` |
| `Kleene Plus` | `r+` | واحد أو أكثر: `L+` | `a+` ← `a, aa, aaa, ...` |

---

### 10. العمليات على اللغات — مثال تطبيقي (من ملف التمارين الجزء الثاني، صفحة 1)

#### النص الأصلي يقول:
> **السؤال:** ليكن لدينا اللغتان:
> `L1 = {CAT, dog}`, `L2 = {mouse, bird}`
> أوجد: `L1 ∪ L2`, `L1 ∩ L2`, `L1 . L2`, `L1*`

#### الحل:

**1/ `L1 ∪ L2`** (الاتحاد — كل كلمات اللغتين):
```
L1 ∪ L2 = {CAT, dog, mouse, bird}
```

**2/ `L1 ∩ L2`** (التقاطع — الكلمات المشتركة):
```
L1 ∩ L2 = ∅  (لا توجد كلمات مشتركة)
```

**3/ `L1 . L2`** (الضرب/`Concatenation` — دمج كل كلمة من L1 مع كل كلمة من L2):
```
L1 . L2 = {CATmouse, CATbird, dogmouse, dogbird}
```

**4/ `L1*`** (`Kleene Star` — كل التركيبات بما فيها الفارغة):
```
L1* = {ε} ∪ {CAT, dog} ∪ {CAT, dog, CAT, dog, ...} (لانهائي)
الجزء المحدود: {ε, CAT, dog} ∪ {CAT.CAT, CAT.dog, dog.CAT, dog.dog} ∪ ...
```

#### مهم للامتحان ⚠️:
> **الفرق بين `L1.L2` و `L1 ∪ L2`:**
> - `L1 ∪ L2`: نأخذ الكلمات **كما هي** دون تعديل
> - `L1.L2`: **يتم دمج** اللغتين معاً حيث يتم لصق كلمة من `L1` مع `L2`

---

### 11. ماذا تعني التعبيرات المنتظمة؟ (من ملف التمارين الجزء الثاني، صفحة 2)

#### النص الأصلي يقول:
> **السؤال:** ماذا تعني التعبيرات التالية؟
> 1. `(0|1|1)*`
> 2. `ab*`
> 3. `(a|b)*ccc(a|b)*`
> **سؤال:** هل `(ab)*` و `(a|b)*` متساويان؟
> **سؤال:** هل `(ab)*` و `ab*` متساويان؟

#### الحل:

**1. `(0|1|1)*`:**
```
= {ε, 0, 1, 00, 01, 10, 11, 010, 011, 110, ...}
```
أي: جميع السلاسل المكوّنة من `0` و`1` بأي طول بما فيها الفارغة.

**2. `ab*`:**
```
= {a, ab, abb, abbb, ...}
```
حرف `a` واحد يتبعه صفر أو أكثر من `b`.

**3. `(a|b)*ccc(a|b)*`:**
```
= {ccc, accc, bccc, abccc, cccab, acccb, ...}
```
أي: `ccc` بالضبط في المنتصف، وقبلها وبعدها أي سلسلة من `a` و`b`.

**هل `(ab)*` و `(a\|b)*` متساويان؟ ← لا!**
| | `(ab)*` | `(a\|b)*` |
| --- | --- | --- |
| محتوى | `ε, ab, abab, ababab, ...` | `ε, a, b, aa, ab, ba, bb, aab, ...` |
| الفرق | دائماً `a` يتبعها `b` كزوج | أي ترتيب من `a` و`b` |

**هل `(ab)*` و `ab*` متساويان؟ ← لا!**
- `(ab)*` = الإغلاق يشمل **كلا الرمزين** بشكل كلي
- `ab*` = `a` واحد فقط، ثم صفر أو أكثر من `b` فقط

**الفهم الخاطئ الشائع ❌:** `(ab)* = a*b*`
**الفهم الصحيح ✅:** `(ab)*` يعني أن `ab` كوحدة تتكرر: `ε, ab, abab, ...` أما `a*b*` يعني أي عدد من `a` يليه أي عدد من `b`: `ε, a, b, aa, ab, aab, bb, ...`

---

### 12. تنفيذ التحليل المفرداتي — التعابير المنتظمة (شريحة 52)

#### النص الأصلي يقول:
> **التعابير المنتظمة (Regular Expressions)**
> **تنفيذ التحليل المفرداتي**
> **توصيف المفردات:** توفر التعابير المنتظمة أداة لوصف الكلمات التي لها نموذج محدد. يتم التعبير عن هذا النموذج بمفردة.
> نعرِّف المفردة IDENT المعبرة عن المتحولات، وذلك اعتماداً على تعبير منتظم، كما يلي:
> `IDENT=(a|b|c...|y|z|A|B|C...|Y|Z) (a|b|c...|y|z|A|B|C...|Y|Z|0|1|2|3|4|5|6|7|8|9)*`
> **نظرية:** لكل لغة منتظمة أوتومات منتظم منته.
> **نتيجة:** كل أوتومات منته يكافئ برنامج حاسوبي.

#### الشرح المبسّط:

**📐 المعادلة: `Regular Expression` للمتغيرات `IDENT`**

$$
IDENT = (a|b|...|z|A|B|...|Z)(a|b|...|z|A|B|...|Z|0|1|...|9)^*
$$

**الشرح:**
| الجزء | المعنى |
| --- | --- |
| `(a\|...\|z\|A\|...\|Z)` | يجب أن يبدأ بحرف (صغير أو كبير) |
| `(a\|...\|z\|A\|...\|Z\|0\|...\|9)*` | يتبعه صفر أو أكثر من حرف أو رقم |

#### مهم للامتحان ⚠️: النظرية الأساسية
> **نظرية:** لكل لغة منتظمة (`Regular Language`) أوتومات منته (`Finite Automaton`).
> **النتيجة:** كل `DFA` يكافئ برنامجاً حاسوبياً ← لذلك يمكن توليد `Scanner` تلقائياً من `DFA`.

---

## الجزء الثاني: ملخص منظم

### أهم التعاريف والمفاهيم

| المصطلح | التعريف | مثال/ملاحظة |
| --- | --- | --- |
| `Lexical Analysis` | مرحلة المترجم التي تحوّل النص إلى `Tokens` | أول مرحلة في المترجم |
| `Scanner` | البرنامج الذي ينفّذ `Lexical Analysis` | يقرأ المدخل حرفاً بحرف |
| `Token` | وحدة معجمية (كلمة، رقم، رمز) | `x123`, `while`, `+` |
| `Regular Grammar` | قواعد نحوية لوصف `Tokens` | `Identifier = Letter {Letter\|Digit} EndChar` |
| `Regular Expression` | تعبير مختصر يصف `Regular Language` | `(a\|...\|z)(a\|...\|z\|0\|...\|9)*\n` |
| `Regular Language` | لغة يمكن وصفها بـ`Regular Expression` | لغة `Identifiers` |
| `DFA` | آلة حالات محدودة حتمية تتعرف على `Regular Language` | رسم المخطط الانسيابي للـ`Scanner` |
| `Kleene Star` `*` | صفر أو أكثر من تكرار | `a*` = `{ε, a, aa, ...}` |
| `Kleene Plus` `+` | واحد أو أكثر من تكرار | `a+` = `{a, aa, aaa, ...}` |
| `Concatenation` | ضرب لغتين = دمج الكلمات | `{a}.{b} = {ab}` |
| `Union` | اتحاد لغتين | `{a}\|{b} = {a, b}` |
| `ε` | الكلمة الفارغة | `a* = {ε, a, aa, ...}` |

---

### المكونات الرئيسية (مرجع سريع)

| الأداة | الوظيفة | ملاحظة |
| --- | --- | --- |
| `Regular Grammar` | تعريف شكل الـ`Token` | تستخدم `Non-Terminals` مثل `Letter, Digit` |
| `Regular Expression` | تعبير مضغوط عن اللغة | ناتج حل معادلات `Regular Grammar` |
| `DFA` | تمثيل بياني للـ`Scanner` | كل حالة = خطوة في التعرف |
| `GetNext()` | دالة تقرأ المحرف التالي | تستخدم في `pseudocode` |
| `IsIdentifier()` | دالة للتحقق من أن الكلمة `Identifier` | مولّدة تلقائياً من `DFA` |

---

### جداول مقارنات سريعة

| المقارنة | `Regular Grammar` | `Regular Expression` | الفرق |
| --- | --- | --- | --- |
| الشكل | معادلات متعددة (`Non-Terminals`) | تعبير واحد مضغوط | `RE` أكثر إيجازاً |
| الاستخدام | كتابة القواعد أولاً | التوليد التلقائي للـ`Scanner` | نحوّل الأول إلى الثاني |
| القابلية للقراءة | أسهل للكتابة | أصعب للكتابة لكن أسهل للمعالجة الآلية | |

| المقارنة | `(ab)*` | `(a\|b)*` | `ab*` |
| --- | --- | --- | --- |
| المعنى | `ab` كوحدة تتكرر | أي سلسلة من `a` و`b` | `a` ثم `b` صفر أو أكثر |
| أمثلة | `ε, ab, abab` | `ε, a, b, ab, ba, aa` | `a, ab, abb, abbb` |

---

### قاموس المصطلحات

| الفئة | المصطلحات |
| --- | --- |
| مراحل المترجم | `Lexical Analysis`, `Syntax Analysis`, `Semantic Analysis`, `Code Generation` |
| القواعد | `Regular Grammar`, `Regular Expression`, `CFG` |
| الآلات | `DFA`, `NFA`, `Finite Automaton` |
| عمليات اللغات | `Concatenation`, `Union`, `Kleene Star`, `Kleene Plus`, `Intersection` |
| مفردات | `Token`, `Identifier`, `Keyword`, `Scanner`, `GetNext()` |
| رموز | `ε` (الفارغة), `Σ` (الأبجدية), `L*`, `L+`, `L^n` |

---

### أبرز النقاط الذهبية

1. كل `Regular Grammar` يمكن تحويلها إلى `Regular Expression` بحل المعادلات.
2. كل `Regular Language` لها `DFA` مكافئ.
3. كل `DFA` يكافئ برنامجاً حاسوبياً ← لذلك يمكن توليد `Scanner` تلقائياً.
4. `{...}` في `Regular Grammar` = حلقة `while` في `pseudocode` = `*` في `Regular Expression`.
5. ابدأ دائماً بـ`Regular Grammar` ← ثم `DFA` ← ثم `pseudocode`.
6. `(ab)* ≠ a*b*` ← خطأ شائع جداً.
7. التحليل المعجمي يعالج **الشكل** لا **المعنى** — المعنى مهمة `Syntax Analysis`.

---

### الأخطاء الشائعة عند الطلاب ⚠️

| الخطأ | التصحيح |
| --- | --- |
| كتابة `(ab)* = a*b*` | `(ab)*` تعني `ab` كوحدة تتكرر، بينما `a*b*` تعني أي عدد من `a` يليه أي عدد من `b` |
| ظن أن `{...}` يعني مجموعة | في `Regular Grammar`, `{...}` تعني تكراراً (مثل `*` في `RE`) |
| نسيان أن `a+` = `a` ثم `a*` | `a+` = `aa*` = رقم أو أكثر |
| كتابة `Endchar` داخل التكرار | `EndChar` دائماً **بعد** الأقواس المعقوفة |
| الخلط بين `Union` و `Concatenation` | `L1∪L2` = الكلمات كما هي / `L1.L2` = لصق كلمة من `L1` بكلمة من `L2` |

---

### خطوات وإجراءات المحاضرة

#### ⚙️ الخطوات / الخوارزمية: بناء `Scanner` من `Regular Grammar`

#### ما هدف هذه العملية؟
> تحويل القاعدة النحوية المنتظمة إلى كود `Scanner` جاهز للتنفيذ.

```algorithm
1 | اكتب Regular Grammar     | تعريف | حدّد Startchar, Letter, Digit, Endchar
2 | حوّل إلى Regular Expression | حل المعادلات | استبدل كل Non-Terminal بقيمته
3 | ارسم DFA                 | تصميم | حدّد الحالات والانتقالات
4 | اكتب pseudocode          | تحويل | كل حالة = if/while في الكود
5 | تحقق بأمثلة             | اختبار | جرّب كلمات صحيحة وأخرى خاطئة
```

#### نقاط التنفيذ:
- `{...}` في القاعدة ← `while(...)` في `pseudocode`
- حالة الخطأ في `DFA` ← `return Error()` في `pseudocode`
- حالة القبول في `DFA` ← `return TRUE` في `pseudocode`

---

#### ⚙️ الخطوات / الخوارزمية: `IsIdentifier()` (شريحة 45)

#### ما هدف هذه العملية؟
> التحقق من أن الكلمة الحالية في المدخل هي `Identifier` صحيح.

```algorithm
1 | GetNext()                        | Scanner    | اقرأ المحرف الأول
2 | if (Symbol is Letter) ؟          | Decision   | شرط Startchar
3 |   GetNext()                      | Scanner    | اقرأ التالي
4 |   while (Letter || Digit)        | Loop       | تكرار {Letter | Digit}
5 |     GetNext()                    | Scanner    | اقرأ التالي
6 |   if (Symbol == '\n')            | Decision   | تحقق من EndChar
7 |     return TRUE                  | Accept     | Identifier صحيح
8 |     else return Error()          | Reject     | EndChar خاطئ
9 | else return Error()              | Reject     | لا يبدأ بحرف
```

---

### أنماط الأكواد والبنى المتكررة

| النمط | البنية الأساسية | متى تستخدمه |
| --- | --- | --- |
| بداية إلزامية | `if (Symbol is Startchar) { GetNext(); ... }` | كل `Token` له بداية محددة |
| تكرار `{...}` | `while (Letter \|\| Digit) { GetNext(); }` | عندما يكون الجزء الوسطي متكرراً |
| فحص النهاية | `if (Symbol == EndChar) return TRUE; else return Error();` | كل `Token` له نهاية محددة |

---

### أنماط التعامل والسلوك

| السيناريو | التعامل الصحيح | لماذا؟ |
| --- | --- | --- |
| المحرف لا يبدأ بـ`Startchar` | `return Error()` فوراً | لا حاجة للاستمرار |
| المحرف في المنتصف غير `Letter/Digit` | الخروج من `while` وفحص `EndChar` | قد يكون `EndChar` |
| المحرف ليس `EndChar` في النهاية | `return Error()` | القاعدة تشترط `EndChar` محدداً |

---

## الجزء الثالث: أسئلة اختيار من متعدد (MCQ)

> **18 سؤالاً** — مستوى: medium/hard. التوزيع: مقارنات 20% | سيناريو كود 25% | تطبيق 25% | تتبع خوارزميات 30%.

---

### السؤال 1 (medium)
ما الذي يمثله `{...}` في `Regular Grammar`؟

أ) مجموعة من القيم
ب) تكرار صفر مرة أو أكثر (`Kleene Star`)
ج) تكرار مرة واحدة إلزامية
د) اختيار بين قيمتين

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: `{...}` في `Regular Grammar` تختلف عن مفهوم المجموعة في الرياضيات.
- ب) ✅ صحيح: `{Letter|Digit}` تعني صفر أو أكثر من `Letter` أو `Digit` — تكافئ `*` في `Regular Expression`.
- ج) خطأ: التكرار الإلزامي يُعبَّر عنه بـ`+` في `RE` أو بكتابة الرمز مرة خارج الأقواس.
- د) خطأ: الاختيار يُعبَّر عنه بـ`|`.

---

### السؤال 2 (medium)
أي من الجمل التالية **مقبولة** بالقاعدة: `Username = Startchar {Letter|Digit} "!"`، حيث `Startchar = "_" | Letter`؟

أ) `123!`
ب) `_user!`
ج) `user`
د) `_user`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: `1` رقم وليس `Startchar` — يجب أن يبدأ بـ`_` أو حرف.
- ب) ✅ صحيح: `_` = `Startchar`، ثم `u,s,e,r` = `Letter` (مقبولة في `{Letter|Digit}`)، ثم `!` = `Endchar`.
- ج) خطأ: لا تنتهي بـ`!`.
- د) خطأ: لا تنتهي بـ`!`.

---

### السؤال 3 (medium)
ما التعبير المنتظم المكافئ للقاعدة: `integer = digit {digit} Endchar` حيث `Endchar = "ز"`؟

أ) `(0|1|...|9)* "ز"`
ب) `(0|1|...|9)+ "ز"`
ج) `(0|1|...|9) "ز"`
د) `(0|1|...|9)? "ز"`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: `*` تعني صفر أو أكثر، لكن القاعدة تبدأ بـ`digit` واحد إلزامي → `digit {digit}` = `digit+`.
- ب) ✅ صحيح: `digit` ثم `{digit}` = واحد + صفر أو أكثر = `digit+` = `(0|...|9)+`.
- ج) خطأ: هذه تعني رقم واحد بالضبط.
- د) خطأ: `?` تعني صفر أو مرة واحدة فقط.

---

### السؤال 4 (hard)
ما الفرق بين `L1.L2` (الضرب/`Concatenation`) و`L1 ∪ L2` (الاتحاد)؟

أ) لا فرق، كلاهما يجمع الكلمات
ب) `L1.L2` تجمع الكلمات معاً بدون دمج، بينما `L1 ∪ L2` تدمج الكلمات
ج) `L1 ∪ L2` تأخذ كل كلمات اللغتين كما هي، بينما `L1.L2` تلصق كل كلمة من `L1` بكل كلمة من `L2`
د) `L1.L2` = `L1 ∪ L2` دائماً

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خطأ: الفرق جوهري.
- ب) خطأ: العكس صحيح.
- ج) ✅ صحيح: مثلاً `{a}.{b} = {ab}` بينما `{a}∪{b} = {a,b}`.
- د) خطأ: هما مختلفتان تماماً.

---

### السؤال 5 (hard)
ما القيمة الصحيحة لـ`(a|b)*ccc(a|b)*` إذا كانت السلسلة المدخلة `ccc`؟

أ) مرفوضة
ب) مقبولة لأن `(a|b)*` يمكن أن تساوي `ε`
ج) مقبولة فقط إذا كان يسبق `ccc` حرف
د) مرفوضة لأن لا يوجد `a` أو `b`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ.
- ب) ✅ صحيح: `(a|b)*` تشمل `ε` (الكلمة الفارغة)، لذا `ε ccc ε = ccc` مقبولة.
- ج) خطأ.
- د) خطأ: `*` تعني صفر أو أكثر.

---

### السؤال 6 (medium)
في `pseudocode` لـ`IsIdentifier()`، أي بنية تقابل `{Letter | Digit}` في القاعدة النحوية؟

أ) `if (Letter || Digit)`
ب) `while (Letter || Digit)`
ج) `for (Letter || Digit)`
د) `switch (Letter || Digit)`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: `if` يتحقق مرة واحدة فقط.
- ب) ✅ صحيح: `{...}` = تكرار صفر مرة أو أكثر = `while`.
- ج) خطأ: `for` يحتاج عدداً محدداً من التكرارات.
- د) خطأ: `switch` للاختيار بين حالات ثابتة.

---

### السؤال 7 (hard) — سيناريو كود
```
Token = Startchar {Letter | Digit} Endchar
Startchar = Letter
Letter = "a"|"b"|...|"z"
Digit = "0"|...|"9"
Endchar = ";"
```
أي من الجمل التالية **مقبولة**؟

أ) `123;`
ب) `a1b2;`
ج) `_abc;`
د) `abc`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: `1` رقم — `Startchar = Letter` فقط.
- ب) ✅ صحيح: `a` = `Letter` (صحيح لـ`Startchar`)، `1,b,2` = `Digit/Letter` (مقبول)، `;` = `Endchar`.
- ج) خطأ: `_` ليست في `Letter`.
- د) خطأ: لا تنتهي بـ`;`.

---

### السؤال 8 (medium)
ما الحالة التي **لا تنتمي** إلى `(a|b)*`؟

أ) `ε`
ب) `aabb`
ج) `abba`
د) `abc`

**الإجابة الصحيحة: د**
**التعليل:**
- أ) مقبولة: `*` تشمل `ε`.
- ب) مقبولة: `aabb` = محارف `a` و`b` فقط.
- ج) مقبولة: `abba` محارف `a` و`b` فقط.
- د) ✅ غير مقبولة: `c` ليس ضمن `(a|b)`.

---

### السؤال 9 (hard) — تتبع خوارزمية
في `DFA` الخاص بـ`Identifier = Letter {Letter|Digit} EndChar` (حيث `EndChar = "\n"`):
ماذا يحدث عند معالجة الكلمة `ab3\n`؟

أ) تُرفض لأن تحتوي على رقم
ب) تُقبل لأنها تبدأ بحرف وتنتهي بـ`\n`
ج) تُرفض لأنها لا تبدأ بحرف كبير
د) تُرفض لأن `3` لا يُقبل

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: الأرقام مسموح بها بعد الحرف الأول.
- ب) ✅ صحيح: `a` = `Letter` (Startchar) ✅، `b` = `Letter` ✅، `3` = `Digit` ✅، `\n` = `EndChar` ✅.
- ج) خطأ: القاعدة تسمح بحروف صغيرة.
- د) خطأ: `Digit` مسموح في `{Letter|Digit}`.

---

### السؤال 10 (hard) — مقارنة
أي من التعبيرات التالية يصف لغة **أضيق** (أقل كلمات)؟

أ) `(a|b)*`
ب) `(ab)*`
ج) `a*b*`
د) `(a|b)+`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) `(a|b)*`: كل سلاسل `a` و`b` بأي ترتيب — واسعة جداً.
- ب) ✅ `(ab)*`: فقط `ε, ab, abab, ...` — أضيق اللغات الأربع.
- ج) `a*b*`: أي عدد من `a` يليه أي عدد من `b` — أوسع من `(ab)*`.
- د) `(a|b)+`: مثل `(a|b)*` لكن بدون `ε` — أوسع من `(ab)*`.

---

### السؤال 11 (medium)
ما النظرية الأساسية التي تربط `Regular Languages` بـ`Finite Automata`؟

أ) لكل `Regular Language` يوجد `CFG` مكافئ
ب) لكل `Regular Language` يوجد `DFA` منته مكافئ
ج) لكل `DFA` يوجد `Regular Language` أكبر منه
د) `Regular Languages` أقوى من `DFA`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ جزئياً: `CFG` أقوى من `Regular Grammar`.
- ب) ✅ صحيح: هذه النظرية الأساسية في نظرية اللغات — كل لغة منتظمة لها `DFA` مكافئ.
- ج) خطأ.
- د) خطأ: هما متكافئان.

---

### السؤال 12 (medium)
في `Email = Username "@" Domain`، أي من الإدخالات التالية **مقبول**؟

أ) `user@domain`
ب) `user@domain.com`
ج) `@domain.com`
د) `user@.com`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: `Domain` يشترط `endsuffix = ".com"`.
- ب) ✅ صحيح: `user` = `Username` ✅، `@` ✅، `domain` = `{letter}` ✅، `.com` = `endsuffix` ✅.
- ج) خطأ: لا يوجد `Username` قبل `@`.
- د) خطأ: لا يوجد `{letter}` في `Domain` قبل `.com`.

---

### السؤال 13 (hard) — تتبع
ما ناتج `L1 . L2` إذا كان `L1 = {a, b}` و`L2 = {1, 2}`؟

أ) `{a, b, 1, 2}`
ب) `{a1, a2, b1, b2}`
ج) `{a1, b2}`
د) `{1a, 2a, 1b, 2b}`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: هذا `L1 ∪ L2`.
- ب) ✅ صحيح: `L1.L2` = كل `w1w2` حيث `w1 ∈ L1` و`w2 ∈ L2`.
- ج) خطأ: ليست كل التركيبات.
- د) خطأ: الترتيب خاطئ (`L2.L1` وليس `L1.L2`).

---

### السؤال 14 (hard)
ما القاعدة الصحيحة للقول إن `L1 ∩ L2 = ∅`؟

أ) عندما تكون اللغتان متطابقتان
ب) عندما لا تشترك اللغتان في أي كلمة
ج) عندما تكون إحداهما فارغة
د) عندما يكون `|L1| ≠ |L2|`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: إذا كانتا متطابقتان فـ`L1 ∩ L2 = L1 = L2`.
- ب) ✅ صحيح: التقاطع = الكلمات المشتركة — إذا لا يوجد مشترك فالتقاطع فارغ.
- ج) خطأ جزئياً: يصح فقط إذا كانت اللغة الفارغة لا تشترك مع الأخرى.
- د) خطأ: الحجم لا يحدد التقاطع.

---

### السؤال 15 (hard) — تتبع خوارزمية
في `IsIdentifier()`، ماذا تُرجع الدالة للمدخل `3abc\n`؟

أ) `TRUE`
ب) `Error` من الـ`while`
ج) `Error` من أول `if`
د) `TRUE` لأن `3` رقم صحيح

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خطأ.
- ب) خطأ: لا نصل إلى `while` أصلاً.
- ج) ✅ صحيح: أول `GetNext()` يقرأ `3` — ثم `if (Symbol is a Letter)` = **لا** → مباشرةً `return Error()`.
- د) خطأ: `Startchar` يجب أن يكون حرفاً.

---

### السؤال 16 (medium)
ما الفائدة من تحويل `Regular Grammar` إلى `DFA`؟

أ) لجعل القواعد أطول
ب) لتوليد `Scanner Code` تلقائياً
ج) لتحويل `Lexical Analysis` إلى `Syntax Analysis`
د) لتقليل عدد `Tokens`

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: `DFA` أكثر إيجازاً.
- ب) ✅ صحيح: من `Regular Grammar` → `DFA` → `Scanner Code` تلقائياً — هذا هدف المحاضرة.
- ج) خطأ: هما مرحلتان مختلفتان.
- د) خطأ: عدد `Tokens` لا يتغير.

---

### السؤال 17 (hard) — سيناريو
السيناريو: `Password = Startchar {letter|Digit} "!"`، `Startchar = "A"|...|"Z"`
أي `pseudocode` صحيح؟

أ)
```
GetNext();
while (Letter || Digit) GetNext();
if (Symbol == "!") return TRUE;
```
ب)
```
GetNext();
if (Symbol is UpperLetter) {
  GetNext();
  while (letter || Digit) GetNext();
  if (Symbol == "!") return TRUE;
  else return Error();
}
else return Error();
```
ج)
```
if (Symbol == "!") return TRUE;
else GetNext();
```
د) لا يوجد `pseudocode` صحيح

**الإجابة الصحيحة: ب**
**التعليل:**
- أ) خطأ: لا يتحقق من `Startchar` (حرف كبير) أولاً.
- ب) ✅ صحيح: يتحقق من `Startchar` (حرف كبير) → حلقة `while` → فحص `"!"`.
- ج) خطأ: البنية كاملة خاطئة.
- د) خطأ.

---

### السؤال 18 (hard) — تتبع خوارزمية DFA
في `DFA` الخاص بـ`Identifier`: `Start →(Letter)→ A →(Letter|Digit)→ A →(\n)→ End`
ماذا تكون الحالة الحالية بعد معالجة `x9` (بدون `\n` بعد)؟

أ) `End` — مقبول
ب) `Start` — عودة للبداية
ج) `A` — لا تزال في الحالة الوسطى
د) `Error` — مرفوض

**الإجابة الصحيحة: ج**
**التعليل:**
- أ) خطأ: لم نصل `\n` بعد.
- ب) خطأ: لا نعود لـ`Start` إلا إذا رفضنا.
- ج) ✅ صحيح: `x` = `Letter` → من `Start` إلى `A`، ثم `9` = `Digit` → حلقة على `A`. لا نزال في `A`.
- د) خطأ: `9` مقبول في الحالة `A` (انتقال `A→A`).

---

## الجزء الرابع (أ): أسئلة تصحيح القواعد والاشتقاقات

> غطِّ أنواع الأخطاء: منطقية، سوء فهم، غموض نحوي، عودية يسرى، اشتقاق خاطئ.

---

### سؤال تصحيح 1 — `logic`

**القاعدة التالية تحتوي خطأ:**
```text
integer = {digit} Endchar
digit   = "0"|"1"|...|"9"
Endchar = "ز"
```
**اكتشف الخطأ:** `{digit}` تعني صفر أو أكثر — أي أن الكلمة الفارغة `ز` مقبولة بدون أي رقم! نريد رقماً واحداً على الأقل.

**التصحيح:**
```text
integer = digit {digit} Endchar
digit   = "0"|"1"|...|"9"
Endchar = "ز"
```
**شرح الحل:**
1. `{digit}` = صفر أو أكثر ← مع البداية `digit` الإلزامية = `digit {digit}` = واحد أو أكثر.
2. يكافئ `digit+` في `Regular Expression`.
3. القاعدة المصحّحة ترفض `ز` (بدون رقم) وتقبل `5ز`, `123ز`, إلخ.

---

### سؤال تصحيح 2 — `misconception`

**القاعدة التالية تحتوي خطأ:**
```text
Username = Startchar {Letter|Digit} "!"
Startchar = Letter | Digit
```
**اكتشف الخطأ:** يسمح `Startchar = Letter | Digit` بأن يبدأ `Username` برقم، وهذا يتعارض عادةً مع تعريف أسماء المستخدمين التي يجب أن تبدأ بحرف.

**التصحيح:**
```text
Username = Startchar {Letter|Digit} "!"
Startchar = "_" | Letter
Letter = "a"|"b"|...|"z"|"A"|...|"Z"
```
**شرح الحل:**
1. `Startchar` يجب أن يشمل فقط `_` أو حرفاً — لا أرقاماً.
2. هذا اصطلاح معظم لغات البرمجة.
3. القاعدة المصحّحة ترفض `123!` وتقبل `_abc!` و`user1!`.

---

### سؤال تصحيح 3 — `wrong_derivation`

**القاعدة/الاشتقاق التالي يحتوي خطأ:**
```text
L1 = {a, b}, L2 = {x, y}
L1 . L2 = {a, b, x, y}
```
**اكتشف الخطأ:** `L1 . L2` هو `Concatenation` لا `Union` — الجواب المذكور هو `L1 ∪ L2`.

**التصحيح:**
```text
L1 . L2 = {ax, ay, bx, by}
```
**شرح الحل:**
1. `Concatenation L1.L2` = لكل `w1 ∈ L1` ولكل `w2 ∈ L2`، أضف `w1w2`.
2. `{a,b} . {x,y} = {ax, ay, bx, by}`.
3. `L1 ∪ L2 = {a, b, x, y}` هو الاتحاد وليس الضرب.

---

### سؤال تصحيح 4 — `ambiguous_grammar`

**القاعدة التالية يحتوي خطأ:**
```text
Email = Username Domain
Username = Startchar {letter | digit}
Domain = {letter} ".com"
```
**اكتشف الخطأ:** لا يوجد `"@"` يفصل بين `Username` و`Domain` — المحلل لن يعرف أين ينتهي `Username` ويبدأ `Domain`.

**التصحيح:**
```text
Email = Username "@" Domain
Username = Startchar {letter | digit}
Domain = {letter} ".com"
```
**شرح الحل:**
1. `"@"` هو الفاصل الإلزامي — بدونه القاعدة **غامضة**.
2. بدون `"@"` يمكن أن تُحلَّل `userdomain.com` بأكثر من طريقة.
3. القاعدة المصحّحة تشترط `@` وسط العنوان.

---

### سؤال تصحيح 5 — `wrong_derivation`

**الاشتقاق التالي يحتوي خطأ:**
```text
(ab)* = a*b*    [خطأ]
```
**اكتشف الخطأ:** `(ab)*` و`a*b*` **ليستا متساويتين** — `(ab)*` يشترط تسلسل `ab` كوحدة.

**التصحيح:**
```text
(ab)* = {ε, ab, abab, ababab, ...}
a*b*  = {ε, a, b, aa, ab, bb, aab, abb, aabb, ...}
```
**شرح الحل:**
1. `(ab)*` = `ε` أو `ab` أو `abab` — دائماً `a` يتبعه `b` كوحدة.
2. `a*b*` = أي عدد من `a` ثم أي عدد من `b` — يشمل `aa`, `bb`, `aab`، وهذه غير موجودة في `(ab)*`.
3. `(ab)* ⊂ a*b*` لكن ليس العكس.

---

## الجزء الرابع (ب): تمارين إضافية من إعداد الدليل

> **هذه تمارين إضافية من إعداد الدليل للتدريب** — ليست في المحاضرة الأصلية.

---

### تمرين 1: `fill_gaps` — أكمل القاعدة النحوية

**السيناريو / المطلوب:**
أكمل القاعدة النحوية التالية لـ`PhoneNumber` بحيث يكون رقم الهاتف مكوناً من `+` اختيارية في البداية، ثم 7–15 رقماً:

```
PhoneNumber = _______ {digit} Endchar
_______ = "+" | digit
digit   = "0"|"1"|...|"9"
Endchar = "\n"
```

**المطلوب:**
1. أكمل الفراغات.
2. هل الجملة `+9665555\n` مقبولة؟

**نموذج الحل:**
```
PhoneNumber = Startchar {digit} Endchar
Startchar   = "+" | digit
digit       = "0"|"1"|...|"9"
Endchar     = "\n"
```
1. `Startchar = "+" | digit`
2. `+9665555\n`:
   - `+` = `Startchar` ✅
   - `9665555` = `{digit}` ✅
   - `\n` = `Endchar` ✅
   - النتيجة: **مقبولة ✅**

---

### تمرين 2: `code_fix` — صحّح الـ`pseudocode`

**السيناريو:**
الـ`pseudocode` التالي خاطئ لـ`IsUsername()` (حيث `Username = "_"|Letter {Letter|Digit} "!"`):

```
int IsUsername() {
    if (Symbol == "!") return TRUE;   // (1)
    GetNext();
    while (Letter || Digit) GetNext();
    return TRUE;
}
```

**المطلوب:**
1. حدّد الخطأين الرئيسيين.
2. اكتب النسخة الصحيحة.

**نموذج الحل:**
**الخطأ 1:** يتحقق من `"!"` قبل قراءة أي محرف (السطر 1 خاطئ).
**الخطأ 2:** لا يتحقق من `Startchar` (`_` أو `Letter`) أولاً.

```
int IsUsername() {
    GetNext();
    if (Symbol == '_' || Symbol is Letter) {
        GetNext();
        while (Letter || Digit) GetNext();
        if (Symbol == '!') return TRUE;
        else return Error();
    }
    else return Error();
}
```

---

### تمرين 3: `scenario` — صمّم `Scanner` كامل

**السيناريو / المطلوب:**
صمّم `Regular Grammar` و`DFA` لـ`HexNumber` بحيث:
- يبدأ بـ`0x`
- يتبعه واحد أو أكثر من الأرقام السداسية عشرية (`0-9`, `A-F`)
- ينتهي بـ`;`

**المطلوب:**
1. اكتب `Regular Grammar`.
2. اكتب `Regular Expression` المكافئة.
3. ارسم `DFA`.

**نموذج الحل:**

**1. Regular Grammar:**
```
HexNumber = "0" "x" HexDigit {HexDigit} ";"
HexDigit  = "0"|"1"|...|"9"|"A"|"B"|"C"|"D"|"E"|"F"
```

**2. Regular Expression:**
```
0x(0|1|...|9|A|B|C|D|E|F)+ ";"
```

**3. DFA:**
```
Start →("0")→ S1 →("x")→ S2 →(HexDigit)→ S3 →(HexDigit)→ S3 →(";")→ End
Start, S1, S2 →(غير ذلك)→ Error
S3 →(غير HexDigit وغير ";")→ Error
```

---

### تمرين 4: `grammar_transform` — حوّل إلى `Regular Expression`

**السيناريو / المطلوب:**
حوّل `Regular Grammar` التالية إلى `Regular Expression`:
```
Password = Upper {Lower|Digit} Special
Upper   = "A"|"B"|...|"Z"
Lower   = "a"|"b"|...|"z"
Digit   = "0"|...|"9"
Special = "@"|"#"|"$"
```

**نموذج الحل:**
```
استبدل كل Non-Terminal بقيمته:
Password = (A|B|...|Z) {(a|b|...|z)|(0|...|9)} (@|#|$)
         = (A|B|...|Z)(a|b|...|z|0|...|9)*(@|#|$)
```

**التعبير المنتظم:**
$$
(A|B|...|Z)(a|...|z|0|...|9)^*(@|\#|\$)
$$

---

### تمرين 5: `fill_gaps` — أكمل جدول العمليات

**المطلوب:** أكمل الجدول التالي:

| التعبير | اللغة التي يصفها | مثال كلمة مقبولة |
| --- | --- | --- |
| `a(b\|c)*` | ??? | ??? |
| `(0\|1)+` | ??? | ??? |
| `ab*c` | ??? | ??? |
| `(abc)+` | ??? | ??? |

**نموذج الحل:**

| التعبير | اللغة التي يصفها | مثال كلمة مقبولة |
| --- | --- | --- |
| `a(b\|c)*` | `a` ثم أي سلسلة من `b` و`c` | `a`, `ab`, `abbc`, `acc` |
| `(0\|1)+` | سلاسل ثنائية بدون الفارغة | `0`, `1`, `01`, `110` |
| `ab*c` | `a` ثم صفر أو أكثر من `b` ثم `c` | `ac`, `abc`, `abbc` |
| `(abc)+` | تكرار `abc` مرة أو أكثر | `abc`, `abcabc` |

---

### تمرين 6: `scenario` — تحليل `DFA`

**السيناريو:**
```
DFA:
- الحالات: {S0, S1, S2, Error, Accept}
- S0 →(a)→ S1
- S1 →(b)→ S2
- S2 →(a|b)→ S2
- S2 →(c)→ Accept
- أي انتقال غير مذكور → Error
```

**المطلوب:**
1. اكتب `Regular Grammar` المقابلة.
2. اكتب `Regular Expression` المكافئة.
3. هل `abac` مقبولة؟

**نموذج الحل:**
**1. Regular Grammar:**
```
Token = "a" "b" {a|b} "c"
```

**2. Regular Expression:**
```
ab(a|b)*c
```

**3. تتبع `abac`:**
- `a` → S0 → S1 ✅
- `b` → S1 → S2 ✅
- `a` → S2 → S2 ✅ (حلقة)
- `c` → S2 → Accept ✅
- **مقبولة ✅**

---

## الجزء الرابع (ج): تمارين تحليل وتطبيق

> تمارين تحليلية إضافية — بناء جداول تحليل، سيناريوهات، ملء مخططات.

---

### تمرين 1: `table_fill` — أكمل جدول انتقالات `DFA`

**السيناريو:**
`DFA` لـ`Identifier = Letter {Letter|Digit} "\n"` بحالات `{Start, A, End, Error}`.

**المطلوب:** أكمل جدول الانتقالات:

| الحالة الحالية | `Letter` | `Digit` | `"\n"` | `غير ذلك` |
| --- | --- | --- | --- | --- |
| `Start` | ??? | ??? | ??? | ??? |
| `A` | ??? | ??? | ??? | ??? |
| `End` | ??? | ??? | ??? | ??? |
| `Error` | ??? | ??? | ??? | ??? |

**نموذج الحل:**

| الحالة الحالية | `Letter` | `Digit` | `"\n"` | `غير ذلك` |
| --- | --- | --- | --- | --- |
| `Start` | `A` | `Error` | `Error` | `Error` |
| `A` | `A` | `A` | `End` | `Error` |
| `End` | — | — | — | — |
| `Error` | — | — | — | — |

---

### تمرين 2: `diagram_completion` — أكمل `DFA` لـ`Password`

**السيناريو:**
`Password = Upper {lower|Digit} "!"` حيث `Upper` = حروف كبيرة.

**المطلوب:** ارسم `DFA` كامل مع جدول العُقد والروابط.

**نموذج الحل:**

**وصف العُقد:**
| # | العُقدة | النوع | الشرح |
| --- | --- | --- | --- |
| 1 | `Start` | `event` | البداية |
| 2 | `A` | `process` | قرأنا `Upper` |
| 3 | `End` | `event` | قرأنا `"!"` — مقبول |
| 4 | `Error` | `error` | مدخل خاطئ |

**وصف الروابط:**
| من | إلى | التسمية | الشرح |
| --- | --- | --- | --- |
| `Start` | `A` | `Upper` | حرف كبير = `Startchar` |
| `A` | `A` | `lower \| Digit` | تكرار |
| `A` | `End` | `"!"` | نهاية صحيحة |
| `Start` | `Error` | `غير Upper` | بداية خاطئة |
| `A` | `Error` | `غير lower, Digit, "!"` | محرف غير متوقع |

---

### تمرين 3: `written_analysis` — قارن بين الأمثلة

**السيناريو:**
قارن بين `Username` و`Password` و`Email` من حيث:
1. `Startchar`
2. الجزء الوسطي
3. `Endchar`

**نموذج الحل:**

| الخاصية | `Username` | `Password` | `Email` |
| --- | --- | --- | --- |
| `Startchar` | `"_" \| Letter` | `Upper` (حرف كبير) | `Letter` (حرف صغير فقط) |
| الجزء الوسطي | `{Letter \| Digit}` | `{lower \| Digit}` | `{letter \| digit}` ثم `@` ثم `Domain` |
| `Endchar` | `"!"` | `"!"` | `".com"` (ضمن `Domain`) |
| الأكثر تقييداً | — | `Password` | — |

---

## الجزء الرابع (د): تمارين تتبع التنفيذ

---

### تمرين تتبع 1: تتبع `IsIdentifier()` للكلمة `abc\n`

**المدخل:**
```text
abc\n
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | العملية | `Symbol` الحالي | الحالة |
| --- | --- | --- | --- |
| 1 | `GetNext()` | ??? | ??? |
| 2 | `if (Letter)?` | ??? | ??? |
| 3 | `GetNext()` | ??? | ??? |
| 4 | `while(Letter\|\|Digit)?` | ??? | ??? |
| 5 | `GetNext()` | ??? | ??? |
| 6 | `while(Letter\|\|Digit)?` | ??? | ??? |
| 7 | `GetNext()` | ??? | ??? |
| 8 | `while(Letter\|\|Digit)?` | ??? | ??? |
| 9 | `if(Symbol=='\n')?` | ??? | ??? |

**نموذج الحل:**
| الخطوة | العملية | `Symbol` الحالي | الحالة |
| --- | --- | --- | --- |
| 1 | `GetNext()` | `a` | قراءة أول محرف |
| 2 | `if (Letter)?` | `a` | **نعم** → دخول الـ`if` |
| 3 | `GetNext()` | `b` | قراءة ثاني محرف |
| 4 | `while(Letter\|\|Digit)?` | `b` | **نعم** → حلقة |
| 5 | `GetNext()` | `c` | قراءة ثالث محرف |
| 6 | `while(Letter\|\|Digit)?` | `c` | **نعم** → حلقة |
| 7 | `GetNext()` | `\n` | قراءة رابع محرف |
| 8 | `while(Letter\|\|Digit)?` | `\n` | **لا** → خروج من الحلقة |
| 9 | `if(Symbol=='\n')?` | `\n` | **نعم** → `return TRUE` |

**النتيجة: `TRUE` — `abc` مقبولة كـ`Identifier`**

---

### تمرين تتبع 2: تتبع `DFA` للكلمة `x3\n`

**المدخل:**
```text
x3\n
```

**تتبّع خطوة بخطوة (أكمل الجدول):**
| الخطوة | المحرف | الحالة الحالية | الانتقال | الحالة التالية |
| --- | --- | --- | --- | --- |
| 1 | `x` | `Start` | ??? | ??? |
| 2 | `3` | ??? | ??? | ??? |
| 3 | `\n` | ??? | ??? | ??? |

**نموذج الحل:**
| الخطوة | المحرف | الحالة الحالية | الانتقال | الحالة التالية |
| --- | --- | --- | --- | --- |
| 1 | `x` | `Start` | `x` = `Letter` → `Start→A` | `A` |
| 2 | `3` | `A` | `3` = `Digit` → `A→A` (حلقة) | `A` |
| 3 | `\n` | `A` | `\n` = `EndChar` → `A→End` | `End` ✅ |

**النتيجة: `x3\n` مقبولة — وصلنا لحالة القبول `End`**

---

### تمرين تتبع 3: تتبع عمليات اللغات

**المدخل:**
```text
L1 = {a, b}    L2 = {1, 2}
```

**أكمل الجدول:**
| العملية | النتيجة |
| --- | --- |
| `L1 ∪ L2` | ??? |
| `L1 ∩ L2` | ??? |
| `L1 . L2` | ??? |
| `L2 . L1` | ??? |

**نموذج الحل:**
| العملية | النتيجة |
| --- | --- |
| `L1 ∪ L2` | `{a, b, 1, 2}` |
| `L1 ∩ L2` | `∅` |
| `L1 . L2` | `{a1, a2, b1, b2}` |
| `L2 . L1` | `{1a, 1b, 2a, 2b}` |

**النتيجة:** `L1.L2 ≠ L2.L1` — الضرب غير تبادلي.

---

### تمرين تتبع 4: تتبع `IsIdentifier()` لكلمة خاطئة `3ab\n`

**المدخل:**
```text
3ab\n
```

**أكمل الجدول:**
| الخطوة | العملية | `Symbol` | القرار |
| --- | --- | --- | --- |
| 1 | `GetNext()` | ??? | ??? |
| 2 | `if (Letter)?` | ??? | ??? |
| 3 | ??? | ??? | ??? |

**نموذج الحل:**
| الخطوة | العملية | `Symbol` | القرار |
| --- | --- | --- | --- |
| 1 | `GetNext()` | `3` | قراءة `3` |
| 2 | `if (Letter)?` | `3` | **لا** — `3` رقم لا حرف |
| 3 | `return Error()` | `3` | الكلمة **مرفوضة** |

**النتيجة: `Error` — `3ab\n` مرفوضة لأنها لا تبدأ بحرف**

---

### تمرين تتبع 5: تتبع `(a|b)*` هل السلسلة مقبولة؟

**المدخل:**
```text
السلاسل: (1) "abba"   (2) "abc"   (3) ""(ε)   (4) "aaa"
```

**أكمل الجدول:**
| السلسلة | كل محرف ∈ `(a\|b)`؟ | النتيجة |
| --- | --- | --- |
| `abba` | ??? | ??? |
| `abc` | ??? | ??? |
| `ε` | ??? | ??? |
| `aaa` | ??? | ??? |

**نموذج الحل:**
| السلسلة | كل محرف ∈ `(a\|b)`؟ | النتيجة |
| --- | --- | --- |
| `abba` | نعم — `a,b,b,a` كلها `a` أو `b` | ✅ مقبولة |
| `abc` | لا — `c` ليس `a` أو `b` | ❌ مرفوضة |
| `ε` | نعم — `*` تشمل الفارغة | ✅ مقبولة |
| `aaa` | نعم — كلها `a` | ✅ مقبولة |

---

## الجزء الخامس: أسئلة نظرية متوقعة بالامتحان

---

### السؤال 1: ما هو `Lexical Analysis`؟ وما دوره في المترجم؟
**نموذج الإجابة:**
1. **التعريف:** `Lexical Analysis` هي المرحلة الأولى في المترجم التي تقوم بمسح النص البرمجي وتحويله إلى وحدات معجمية (`Tokens`).
2. **المكونات:** `Scanner` يقرأ حرفاً بحرف، `Regular Grammar` تحدد شكل كل `Token`، `DFA` ينفّذ التعرف.
3. **مثال:** النص `int x = 5;` يُحوَّل إلى `Tokens`: `int`, `x`, `=`, `5`, `;`.
4. **متى نستخدم:** دائماً — هي أول مرحلة في كل مترجم أو مفسّر.

---

### السؤال 2: ما الفرق بين `Regular Grammar` و`Regular Expression`؟
**نموذج الإجابة:**
1. **التعريف:** كلاهما يصف `Regular Languages` لكن بأسلوب مختلف.
2. **الفرق:** `Regular Grammar` = معادلات متعددة بـ`Non-Terminals` / `Regular Expression` = تعبير واحد مضغوط.
3. **مثال:** `Identifier = Letter {L|D} EndChar` (Grammar) مقابل `(a|...|z)(a|...|z|0|...|9)*\n` (RE).
4. **متى نستخدم:** نبدأ بـ`Grammar` للوضوح، ثم نحوّل إلى `RE` للمعالجة الآلية.

---

### السؤال 3: اشرح خطوات بناء `Scanner` من `Regular Grammar`.
**نموذج الإجابة:**
1. **التعريف:** عملية تحويل القاعدة النحوية إلى كود تنفيذي.
2. **الخطوات:** (1) اكتب `Regular Grammar` → (2) حوّل إلى `Regular Expression` → (3) ارسم `DFA` → (4) اكتب `pseudocode`.
3. **مثال:** `integer = digit {digit} EndChar` → `DFA` بحالتين → `IsInteger()`.
4. **متى نستخدم:** في كل مرة نصمّم `Scanner` جديداً.

---

### السؤال 4: ما الفرق بين `Kleene Star (*)` و`Kleene Plus (+)`؟
**نموذج الإجابة:**
1. **التعريف:** `*` = صفر أو أكثر، `+` = واحد أو أكثر.
2. **العلاقة:** `r+ = r . r*`.
3. **مثال:** `a* = {ε, a, aa, ...}` / `a+ = {a, aa, aaa, ...}`.
4. **متى نستخدم:** `*` عندما يكون الجزء اختيارياً، `+` عندما يكون إلزامياً مرة واحدة على الأقل.

---

### السؤال 5: ما النظرية الأساسية التي تربط `Regular Languages` بـ`Automata`؟ وما نتيجتها العملية؟
**نموذج الإجابة:**
1. **النظرية:** لكل `Regular Language` يوجد `Finite Automaton (DFA)` منته مكافئ.
2. **النتيجة:** كل `DFA` منته يكافئ برنامجاً حاسوبياً.
3. **التطبيق:** يمكن توليد `Scanner Code` تلقائياً من `DFA` — هذا أساس أدوات مثل `lex/flex`.
4. **الأهمية:** لا نحتاج كتابة `Scanner` يدوياً — نكتب `Regular Grammar` ثم نولّد الكود تلقائياً.

---

### السؤال 6: اشرح عملية تحويل `Regular Grammar` إلى `Regular Expression` بمثال.
**نموذج الإجابة:**
1. **المبدأ:** استبدل كل `Non-Terminal` بقيمته في القاعدة الرئيسية.
2. **الخطوات:** ابدأ من القاعدة الرئيسية، واستبدل كل رمز.
3. **مثال:** `Password = Upper {lower|Digit} "!"` → استبدل `Upper = A|...|Z`، `lower = a|...|z`، `Digit = 0|...|9` → `(A|...|Z)(a|...|z|0|...|9)*"!"`.
4. **نتيجة:** تعبير منتظم واحد يصف اللغة كاملة.

---

### السؤال 7: ما الفرق بين `L1 ∪ L2` و`L1 . L2` (Concatenation)؟
**نموذج الإجابة:**
1. **`L1 ∪ L2` (Union):** كل الكلمات الموجودة في `L1` أو `L2` أو كليهما.
2. **`L1 . L2` (Concatenation):** لكل `w1 ∈ L1` و`w2 ∈ L2`، الكلمة `w1w2`.
3. **مثال:** `{a,b} ∪ {c} = {a,b,c}` / `{a,b} . {c} = {ac, bc}`.
4. **الفرق:** الاتحاد يجمع الكلمات **كما هي**، الضرب **يدمجها**.

---

### السؤال 8: لماذا يجب أن يبدأ `Identifier` بحرف لا برقم؟
**نموذج الإجابة:**
1. **السبب المنطقي:** لو بدأ برقم، سيتعارض مع الأرقام الصحيحة (`Integer`) ويصعب التمييز.
2. **السبب التقني:** يجعل `Scanner` أبسط — أول محرف يحدد نوع `Token`.
3. **مثال:** `123abc` — هل هو رقم؟ مُعرِّف؟ الغموض يُعقّد التحليل.
4. **الاصطلاح:** معظم لغات البرمجة (C, Java, Python) تتبع هذا الاصطلاح.

---

### السؤال 9: اشرح كيف يتم توليد `IsIdentifier()` من `DFA`.
**نموذج الإجابة:**
1. **كل حالة في `DFA`** تقابل منطقة في `pseudocode`.
2. **الانتقال على محرف معين** يقابل `if` أو شرط `while`.
3. **الحلقة على نفس الحالة** تقابل `while`.
4. **حالة القبول** تقابل `return TRUE`، **حالة الرفض** تقابل `return Error()`.

---

### السؤال 10: ما هي اللغة المنتظمة (`Regular Language`)؟ وكيف نعرّفها عودياً؟
**نموذج الإجابة:**
1. **التعريف:** لغة يمكن وصفها بـ`Regular Expression` أو `Regular Grammar` أو `DFA`.
2. **التعريف العودي:** `{ε}` منتظمة / `{a}` لأي حرف منتظمة / إذا `L` منتظمة فـ`L*` و`L^n` منتظمتان / إذا `L1` و`L2` منتظمتان فـ`L1∪L2` و`L1.L2` منتظمتان.
3. **مثال:** لغة المُعرِّفات، لغة الأرقام الصحيحة.
4. **ما ليس منتظماً:** `{a^n b^n}` — تحتاج `CFG`.

---

## الجزء السادس: ورقة المراجعة السريعة (Cheat Sheet)

### 🔑 خريطة العلاقات بين المحاضرات

| المحاضرة | ترتبط مع | كيف؟ |
| --- | --- | --- |
| المح 4 (`Lexical Analysis`) | المح 5 (`Syntax Analysis`) | مخرج `Lexical Analysis` = `Tokens` هو مدخل `Syntax Analysis` |
| المح 4 | `DFA/NFA` | `Scanner` يُبنى على أساس `DFA` |
| المح 4 | `Regular Expressions` | `RE` هي الأداة لتوصيف `Tokens` |

---

### 🔑 أهم النقاط الذهبية

| الموضوع | النقاط |
| --- | --- |
| `Regular Grammar` | معادلات + `Non-Terminals` → اكتب ثم حوّل لـ`RE` |
| `Regular Expression` | ناتج حل معادلات `Grammar` — أكثر إيجازاً |
| `DFA` | رسم بياني — كل حالة = خطوة معالجة |
| `pseudocode` | `{...}` = `while` / حالة قبول = `TRUE` / حالة رفض = `Error()` |
| عمليات اللغات | `∪` = اتحاد / `.` = ضرب (لصق) / `*` = تكرار (يشمل `ε`) |

---

### 🔑 مرجع سريع

| الرمز/المصطلح | المعنى | يُستخدم في |
| --- | --- | --- |
| `{...}` | تكرار صفر أو أكثر | `Regular Grammar` |
| `r*` | تكرار صفر أو أكثر | `Regular Expression` |
| `r+` | تكرار واحد أو أكثر | `Regular Expression` |
| `r1\|r2` | أو (`Union`) | `RE` و`Grammar` |
| `r1 r2` | تسلسل (`Concatenation`) | `RE` |
| `ε` | الكلمة الفارغة | `RE` و`DFA` |
| `L*` | إغلاق `Kleene` | عمليات اللغات |
| `L1 ∪ L2` | اتحاد | عمليات اللغات |
| `L1 . L2` | ضرب (لصق) | عمليات اللغات |
| `GetNext()` | اقرأ المحرف التالي | `pseudocode` للـ`Scanner` |

---

### 🔑 قواعد ذهبية لا تُنسى

| # | القاعدة |
| --- | --- |
| 1 | `{...}` في `Grammar` = `while` في `pseudocode` = `*` في `RE` |
| 2 | `digit {digit}` = `digit+` (ليس `digit*`) |
| 3 | `(ab)* ≠ a*b*` — أكثر خطأ شائع |
| 4 | `L1.L2 ≠ L2.L1` — الضرب غير تبادلي |
| 5 | `L1 ∩ L2` = الكلمات المشتركة فقط |
| 6 | كل `Regular Language` ← `DFA` ← `Scanner Code` (تسلسل التحويل) |
| 7 | `*` تشمل `ε`، `+` لا تشملها |
| 8 | `Startchar` يحدد نوع `Token` — دائماً افحصه أولاً |

---

## بطاقات سؤال وجواب (Q&A Cards)

**Q1:** ما هو دور `Lexical Analysis` في المترجم؟
**A:** تحويل النص البرمجي إلى `Tokens` — هي المرحلة الأولى.

---

**Q2:** ما الذي تعنيه `{...}` في `Regular Grammar`؟
**A:** تكرار صفر مرة أو أكثر (تكافئ `*` في `Regular Expression`).

---

**Q3:** ما الفرق بين `r*` و`r+`؟
**A:** `r*` = صفر أو أكثر (يشمل `ε`)، `r+` = واحد أو أكثر (لا يشمل `ε`).

---

**Q4:** كيف تحوّل `Regular Grammar` إلى `Regular Expression`؟
**A:** استبدل كل `Non-Terminal` بقيمته في القاعدة الرئيسية.

---

**Q5:** ما الفرق بين `L1 ∪ L2` و`L1 . L2`؟
**A:** `∪` = اتحاد (كلمات كما هي)، `.` = ضرب (لصق كل كلمة من L1 بكل كلمة من L2).

---

**Q6:** ما الخطوة الأولى في `IsIdentifier()` ولماذا؟
**A:** `GetNext()` — لأننا نحتاج قراءة أول محرف قبل أي فحص.

---

**Q7:** ما الذي تقابله `while (Letter || Digit)` في `Regular Grammar`؟
**A:** الأقواس المعقوفة `{Letter | Digit}`.

---

**Q8:** هل `(ab)*` تشمل `ε`؟
**A:** نعم — `*` دائماً تشمل `ε`.

---

**Q9:** هل `(ab)* = a*b*`؟ لماذا؟
**A:** لا — `(ab)*` = `{ε, ab, abab, ...}` / `a*b*` = `{ε, a, b, aa, ab, aab, ...}` — الثانية أوسع.

---

**Q10:** ما حالة القبول (`Accepting State`) في `DFA` لـ`Identifier`؟
**A:** الحالة `End` — نصل إليها بعد قراءة `\n` (EndChar).

---

**Q11:** ما النظرية التي تربط `Regular Language` بـ`DFA`؟
**A:** لكل `Regular Language` يوجد `DFA` منته مكافئ، والعكس صحيح.

---

**Q12:** ما الفرق بين `(a|b)*` و`(ab)*`؟
**A:** `(a|b)*` = أي سلسلة من `a` و`b` / `(ab)*` = فقط السلاسل التي `ab` وحدة متكررة فيها.

---

**Q13:** ما أبجدية `Σ`؟
**A:** مجموعة المحارف التي تبنى منها كلمات اللغة. مثلاً `Σ = {a, b}` أو `Σ = {0,...,9, a,...,z}`.

---

**Q14:** ما معنى `L*` (Kleene Star على لغة)؟
**A:** جميع الكلمات الممكنة بالضرب المتكرر للغة مع نفسها بما فيها `ε`.

---

**Q15:** ما الفرق بين `Lexical Analysis` و`Syntax Analysis`؟
**A:** `Lexical` تعالج الشكل (هل هذه كلمة صحيحة؟) / `Syntax` تعالج البنية (هل الجملة صحيحة نحوياً؟).

---

**Q16:** ما معنى `ε` في `Regular Expressions`؟
**A:** الكلمة الفارغة (السلسلة التي طولها صفر) — `ε ∈ L*` دائماً.

---

**Q17:** لماذا نستخدم `Regular Grammar` بدلاً من `CFG` في `Lexical Analysis`؟
**A:** لأن `Tokens` بسيطة الشكل — `Regular Grammar` تكفيها وأسهل تحويلاً إلى `DFA`.

---

**Q18:** ما الفائدة العملية من التحويل التلقائي `Grammar → DFA → Scanner`؟
**A:** نوفّر وقت الكتابة اليدوية ونقلّل الأخطاء — هذا أساس أدوات مثل `lex` و`flex`.

---

## قائمة فحص ذاتي قبل الامتحان ✅

- [ ] أعرف تعريف `Lexical Analysis` ودورها في المترجم
- [ ] أستطيع كتابة `Regular Grammar` لأي `Token` معطى
- [ ] أعرف الفرق بين `{...}` في `Grammar` و`*` في `RE`
- [ ] أستطيع تحويل `Regular Grammar` إلى `Regular Expression`
- [ ] أستطيع رسم `DFA` من `Regular Grammar`
- [ ] أستطيع كتابة `pseudocode` لـ`Scanner` من `Regular Grammar` أو `DFA`
- [ ] أعرف عمليات اللغات: `∪`, `.`, `*`, `+`, `∩`
- [ ] أعرف الفرق بين `L1.L2` و`L1 ∪ L2`
- [ ] أعرف أن `(ab)* ≠ a*b*`
- [ ] أعرف النظرية: لكل `Regular Language` ← `DFA` ← كود
- [ ] أستطيع تتبع `DFA` خطوة بخطوة
- [ ] أستطيع تتبع `IsIdentifier()` خطوة بخطوة
- [ ] أعرف الفرق بين `r*` (يشمل `ε`) و`r+` (لا يشمل `ε`)
- [ ] أستطيع تمييز الجمل المقبولة والمرفوضة لأي `Regular Grammar`
- [ ] أفهم كيف يختلف `Username` و`Password` و`Email` من حيث `Startchar` و`Endchar`

---

<!-- VALIDATION
sections_covered: integration_map, detail_part1, summary_part2, mcq_18, debug_5, exercise_6, analysis_exercise_3, trace_exercise_5, theory_10, qa_cards_18, cheat_sheet, self_check
lecture_type: Lexical Analysis
tools_used: Regular Grammar, Regular Expression, DFA, pseudocode, Scanner
source_files: مترجمات_نظري_مـ_4.pdf (slides 42-52), تمارين_المحاضرة_4_مترجمات_نظري.pdf (4 pages), تمارين_مترجمات_نظري_مـ_4_جزء_ثاني.pdf (2 pages)
mcq_count: 18
debug_count: 5
exercise_count: 6
trace_count: 5
theory_count: 10
qa_count: 18
self_check_items: 15
-->
