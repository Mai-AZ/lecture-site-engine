☰

::: {#sidebarOverlay .sidebar-overlay}
:::

::: app
::: sidebar-inner
::: brand
::: brand-badge
🔐
:::

::: brand-text
أمن المعلوماتالمحاضرة 2 --- التعمية
:::
:::

::: search-box
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjciPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yMSAyMWwtNC4zLTQuMyIgLz48L3N2Zz4=)
:::

::: {#searchCount .search-count}
:::

[[1]{.num} مقدمة في التعمية](#intro) [[2]{.num} تحليل الشفرات
والمبادئ](#analysis) [[3]{.num} التصنيف التقليدي](#classic) [[4]{.num}
شيفرة قيصر](#caesar) [[5]{.num} Affine Cipher](#affine) [[6]{.num}
التصنيف الحديث](#modernclass) [[7]{.num} Stream Cipher](#stream)
[[8]{.num} Block Cipher](#block) [[9]{.num} أنماط التشغيل](#modes)
[[10]{.num} أسئلة تفاعلية](#mcq) [[11]{.num} المراجعة
السريعة](#quickrevision)

::: sidebar-foot
🌙 [الوضع الليلي]{#themeLabel}

::: progress-wrap
تقدّم القراءة

::: progress-bar
::: {#progressFill .progress-fill}
:::
:::
:::
:::
:::

::: {role="main"}
::: hero
::: hero-kicker
[]{.dot} ملزمة مراجعة سريعة للامتحان
:::

::: laptop
::: laptop-screen
::: screen-dots
:::

::: screen-uni
University of Homs
:::

::: {#cipherLine .screen-sub .ltr}
C = (P + K) mod 26
:::
:::

::: laptop-base
:::
:::

# أمن المعلومات

المحاضرة الثانية --- التعمية والتشفير [(Cryptography)]{.ltr}

::: hero-meta
[👩‍🏫 د. لارا علي]{.hero-chip} [🎓 جامعة حمص]{.hero-chip} [⏱ مراجعة 10
دقائق]{.hero-chip} [🧩 تشمل أسئلة تفاعلية]{.hero-chip}
:::
:::

::: content
::: {#intro .section .block}
::: section-head
::: section-num
1
:::

<div>

## مقدمة في التعمية

التعريفات الأساسية التي تُبنى عليها كل المحاضرة

</div>
:::

**Cryptography** (التعمية) هي طرق إخفاء المعلومات وجعلها غير قابلة
للقراءة أو غير مفهومة، وذلك بطرق رياضية وباستخدام مفاتيح سرية، بحيث تصبح
غير متاحة لغير المصرح لهم بالاطلاع عليها.

::: {.box .box-def}
::: box-title
🟢 مكوّنات التعمية الثلاثة
:::

-   **Encryption** (التشفير): عملية تحويل المعلومات القابلة للقراءة،
    وتُسمّى [Plaintext]{.ltr} (النص الواضح)، إلى نموذج غير قابل للقراءة
    يُسمّى [Ciphertext]{.ltr} (النص المشفّر).
-   **Decryption** (فك التشفير): عملية استعادة رسالة النص العادي من النص
    المشفّر.
-   **Cipher** أو [encryption algorithm]{.ltr} (خوارزمية التشفير): إجراء
    حسابي محدد يشفّر النص العادي أو يفك تشفير النص المشفّر، ويعتمد على
    مفتاح (أو مفاتيح) لأداء هذه العملية.
:::

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNzIwIDIxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgICAgPGRlZnM+CiAgICAgICAgICAgICAgPG1hcmtlciBpZD0iYXJyb3cxIiBtYXJrZXJ3aWR0aD0iMTAiIG1hcmtlcmhlaWdodD0iMTAiIHJlZng9IjgiIHJlZnk9IjMiIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAsMCBMOCwzIEwwLDYgWiIgZmlsbD0idmFyKC0tcHJpbWFyeSkiIC8+PC9tYXJrZXI+CiAgICAgICAgICAgIDwvZGVmcz4KICAgICAgICAgICAgPHRleHQgeD0iNjAiIHk9IjQwIiBmb250LWZhbWlseT0iVGFqYXdhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0idmFyKC0taW5rKSI+QWxpY2U8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjYwMCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJUYWphd2FsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSJ2YXIoLS1pbmspIj5Cb2I8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjQwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMiIgZmlsbD0idmFyKC0taW5rLXNvZnQpIj5wbGFpbnRleHQ8L3RleHQ+CiAgICAgICAgICAgIDxsaW5lIHgxPSI5NSIgeTE9Ijk0IiB4Mj0iMTUwIiB5Mj0iOTQiIHN0cm9rZT0idmFyKC0tcHJpbWFyeSkiIHN0cm9rZS13aWR0aD0iMiIgbWFya2VyLWVuZD0idXJsKCNhcnJvdzEpIj48L2xpbmU+CiAgICAgICAgICAgIDxyZWN0IHg9IjE1NSIgeT0iNjUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNTgiIHJ4PSIxMCIgZmlsbD0idmFyKC0tc3VyZmFjZSkiIHN0cm9rZT0idmFyKC0tcHJpbWFyeSkiIHN0cm9rZS13aWR0aD0iMS42IiAvPgogICAgICAgICAgICA8dGV4dCB4PSIyMTUiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTEuNSIgZmlsbD0idmFyKC0taW5rKSI+ZW5jcnlwdGlvbjwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMjE1IiB5PSIxMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMS41IiBmaWxsPSJ2YXIoLS1pbmspIj5hbGdvcml0aG08L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjIxNSIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMSIgZmlsbD0idmFyKC0tZ29sZCkiPkvigpAgKGtleSk8L3RleHQ+CiAgICAgICAgICAgIDxsaW5lIHgxPSIyODAiIHkxPSI5NCIgeDI9IjM0NSIgeTI9Ijk0IiBzdHJva2U9InZhcigtLWFjY2VudCkiIHN0cm9rZS13aWR0aD0iMiIgbWFya2VyLWVuZD0idXJsKCNhcnJvdzEpIj48L2xpbmU+CiAgICAgICAgICAgIDx0ZXh0IHg9IjMxMiIgeT0iODIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMSIgZmlsbD0idmFyKC0tYWNjZW50KSI+Y2lwaGVydGV4dDwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMzEyIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJUYWphd2FsIiBmb250LXNpemU9IjEwLjUiIGZpbGw9InZhcigtLWluay1mYWludCkiPih1bnNlY3VyZWQgY2hhbm5lbCk8L3RleHQ+CiAgICAgICAgICAgIDxyZWN0IHg9IjM1MCIgeT0iNjUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNTgiIHJ4PSIxMCIgZmlsbD0idmFyKC0tc3VyZmFjZSkiIHN0cm9rZT0idmFyKC0tYWNjZW50KSIgc3Ryb2tlLXdpZHRoPSIxLjYiIC8+CiAgICAgICAgICAgIDx0ZXh0IHg9IjQxMCIgeT0iOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMS41IiBmaWxsPSJ2YXIoLS1pbmspIj5kZWNyeXB0aW9uPC90ZXh0PgogICAgICAgICAgICA8dGV4dCB4PSI0MTAiIHk9IjEwNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vIiBmb250LXNpemU9IjExLjUiIGZpbGw9InZhcigtLWluaykiPmFsZ29yaXRobTwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iNDEwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vIiBmb250LXNpemU9IjExIiBmaWxsPSJ2YXIoLS1nb2xkKSI+S19iIChrZXkpPC90ZXh0PgogICAgICAgICAgICA8bGluZSB4MT0iNDc1IiB5MT0iOTQiIHgyPSI1NDAiIHkyPSI5NCIgc3Ryb2tlPSJ2YXIoLS1wcmltYXJ5KSIgc3Ryb2tlLXdpZHRoPSIyIiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93MSkiPjwvbGluZT4KICAgICAgICAgICAgPHRleHQgeD0iNTk1IiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMiIgZmlsbD0idmFyKC0taW5rLXNvZnQpIj5wbGFpbnRleHQ8L3RleHQ+CiAgICAgICAgICA8L3N2Zz4=)

::: diagram-caption
إعادة تمثيل مبسّطة للعملية العامة: تشفير النص الواضح إلى نص مشفّر عبر قناة
غير آمنة، ثم فك تشفيره عند الطرف الآخر باستخدام المفتاح المناسب.
:::
:::
:::

::: {#analysis .section .block}
::: section-head
::: section-num
2
:::

<div>

## تحليل الشفرات والمبادئ الأساسية

كيف يفكّر المهاجم، وما الذي يجب أن يبقى سرّياً

</div>
:::

::: {.box .box-def}
::: box-title
🟢 [Cryptanalysis]{.ltr} (تحليل الشفرات)
:::

تقنيات تُستخدم لاستعادة النص الواضح [plaintext]{.ltr} من النص المشفّر
[ciphertext]{.ltr} من دون معرفة المفتاح.
:::

::: {.box .box-warning}
::: box-title
🔴 [Brute-Force Attack]{.ltr} (هجوم القوة الغاشمة)
:::

يقوم المهاجم بتجربة كل القيم الممكنة للمفتاح على النص المشفّر حتى يحصل
على النص الواضح الصحيح.
:::

::: {.box .box-tip}
::: box-title
💡 مبدأ كيرشوف [(Kerckhoff\'s Principle)]{.ltr}
:::

هو افتراض أن الآخرين (بما فيهم المهاجم) يعلمون خوارزمية التشفير وفك
التشفير المستخدمة. وبالتالي فإن مقاومة الهجمات تنحصر في مهمة واحدة:
**إبقاء المفتاح آمناً وسرّياً** --- وليس إخفاء الخوارزمية نفسها. [⚠️ سؤال
شائع: أمن النظام = سرّية المفتاح، وليس سرّية الخوارزمية]{.exam-tag}
:::
:::

::: {#classic .section .block}
::: section-head
::: section-num
3
:::

<div>

## خوارزميات التشفير التقليدية

التصنيف الأساسي الذي تُبنى عليه شيفرة قيصر و Affine

</div>
:::

  ----------------------------------------------------------------------------------------
  النوع                                    الفكرة                  أمثلة من المحاضرة
  ---------------------------------------- ----------------------- -----------------------
  Substitution Ciphers\                    تستبدل كل رمز في النص   Additive Ciphers,
  [(الاستبدال)]{style="font-weight:400"}   برمز آخر                Multiplicative Ciphers

  Transposition Ciphers\                   تغيّر موقع الرموز (إعادة ---
  [(النقل)]{style="font-weight:400"}       ترتيب الرموز) دون تغيير 
                                           الرمز نفسه              
  ----------------------------------------------------------------------------------------

::: tip-tag
💡 استبدال = يتغيّر الرمز نفسه · نقل = يتغيّر مكان الرمز فقط
:::
:::

::: {#caesar .section .block}
::: section-head
::: section-num
4
:::

<div>

## شيفرة قيصر [(Caesar Cipher)]{.ltr style="font-size:16px;"}

أبسط مشفرات الجمع Additive Ciphers

</div>
:::

هي أحد مشفرات الجمع [Additive Ciphers]{.ltr}، وتُعد أبسط خوارزميات
التشفير. تعتمد على تحديد قيمة إزاحة [(shift)]{.ltr} وإزاحة رموز النص
وفقاً لها.

1.  يتم تخصيص قيمة عددية لكل حرف من الأبجدية [(A=00, B=01, ...
    Z=25)]{.ltr}.
2.  يتم جمع القيمة العددية لكل حرف من النص مع مفتاح التشفير K (قيمة
    الإزاحة)، فنحصل على الرمز المقابل له في النص المشفّر.

::: formula-box
[Encryption / Decryption]{.flabel}

::: line
**C** = (P + K) mod 26
:::

::: line
**P** = (C − K) mod 26
:::
:::

::: {.box .box-tip}
::: box-title
💡 خلفية تاريخية
:::

استخدمها القائد الروماني يوليوس قيصر في تأمين المراسلات العسكرية، إذ
استُخدمت أول مرة بقيمة إزاحة ثابتة [K = 3]{.ltr}، ثم عُمِّمت الفكرة لتُطبّق
على أي قيمة إزاحة أخرى.
:::

::: {.box .box-example}
::: box-title
🟡 مثال محلول (كما ورد في المحاضرة)
:::

تشفير الجملة [\"meet me after the toga party\"]{.ltr} باستخدام [K =
3]{.ltr} (شيفرة قيصر الأصلية):

::: {.formula-box style="margin-top:10px;"}
::: line
plain  : meet me after the toga party
:::

::: line
key    : +3 (لكل حرف)
:::

::: line
**cipher : PHHW PH DIWHU WKH WRJD SDUWB**
:::
:::

أي أن كل حرف من النص الأصلي يُزاح 3 مواقع للأمام في الأبجدية (a→D, b→E,
c→F \... حسب جدول الإزاحة).
:::
:::

::: {#affine .section .block}
::: section-head
::: section-num
5
:::

<div>

## Affine Ciphers {#affine-ciphers .ltr style="direction:rtl;"}

تعميم لشيفرة قيصر باستخدام مفتاحين

</div>
:::

يتم استخدام مفتاحين [K1, K2]{.ltr}: حيث [K1]{.ltr} عدد بين 0 و26 وأوّلي
مع 26 (أي [gcd(K1,26)=1]{.ltr}) ويُسمّى المعامل الضربي، أما [K2]{.ltr} فهو
أي عدد بين 0 و26 ويمثّل الإزاحة.

::: formula-box
[Encryption / Decryption]{.flabel}

::: line
**C** = (P × K1 + K2) mod 26
:::

::: line
**P** = ((C − K2) × K1⁻¹) mod 26
:::
:::

المعكوس الضربي [K1⁻¹]{.ltr} يتم حسابه من خلال **خوارزمية إقليدس
الموسّعة** [(Extended Euclidean Algorithm)]{.ltr}.

::: {.box .box-example}
::: box-title
🟡 مثال محلول: تشفير كلمة [HELLO]{.ltr} بـ K1=7 , K2=2
:::

القاعدة: [C = (7×P + 2) mod 26]{.ltr}

  P =          H    E    L    L    O
  ------------ ---- ---- ---- ---- -----
  p-value      07   04   11   11   14
  × K1 = ×7    49   28   77   77   98
  \+ K2 = +2   51   30   79   79   100
  mod 26       25   04   01   01   22
  C =          Z    E    B    B    W

الناتج المشفّر: **ZEBBW**
:::

### فك التشفير --- إيجاد المعكوس الضربي لـ K1 = 7 {#فك-التشفير-إيجاد-المعكوس-الضربي-لـ-k1-7 style="font-size:17px; margin-top:26px;"}

تُستخدم خوارزمية إقليدس الموسّعة لإيجاد [K1⁻¹ mod 26]{.ltr}، وذلك بتكرار
الخطوات التالية حتى تتحقق [r1 = 1]{.ltr}، عندها تكون [t1]{.ltr} هي
المعكوس المطلوب (وإذا كانت [t1 \< 0]{.ltr} نضيف 26 إليها):

  q        r1   r2   r        t1   t2    t
  -------- ---- ---- -------- ---- ----- -----
  26÷7=3   26   7    26%7=5   0    1     −3
  7÷5=1    7    5    7%5=2    1    −3    4
  5÷2=2    5    2    5%2=1    −3   4     −11
  2÷1=2    2    1    2%1=0    4    −11   26

::: {.box .box-tip}
::: box-title
💡 نتيجة الحساب
:::

عند [r1 = 1]{.ltr} تكون [t1 = −11]{.ltr}. بما أنّ [t1 \< 0]{.ltr}، فإن
المعكوس الضربي هو: [**t1 + 26 = 15**]{.ltr} ⇒ [K1⁻¹ = 15]{.ltr}.
:::

::: {.box .box-example}
::: box-title
🟡 تطبيق فك التشفير: P = ((C − 2) × 15) mod 26
:::

  C =           Z     E    B     B     W
  ------------- ----- ---- ----- ----- -----
  C-value       25    04   01    01    22
  − K2 = −2     23    02   −01   −01   20
  × K1⁻¹ =×15   345   30   −15   −15   300
  mod 26        07    04   11    11    14
  P =           H     E    L     L     O

استرجعنا النص الأصلي بنجاح: **HELLO** ✓
:::
:::

::: {#modernclass .section .block}
::: section-head
::: section-num
6
:::

<div>

## خوارزميات التشفير الحديثة --- التصنيف العام

الأساس الذي يُبنى عليه كل من Stream و Block

</div>
:::

بشكل عام تُقسم خوارزميات التشفير الحديثة إلى:

  التصنيف      الاسم الآخر   الفكرة
  ------------ ------------- -------------------------------------------------
  Symmetric    shared key    يُستخدم نفس المفتاح للتشفير وفك التشفير
  Asymmetric   public key    يوجد مفتاحان: الأول للتشفير والثاني لفك التشفير

وتُقسم خوارزميات التشفير المتناظر [(Symmetric)]{.ltr} بدورها إلى:

  النوع           الفكرة
  --------------- ------------------------------------------------------------------------------
  Stream Cipher   يتم تشفير / فك تشفير رمز واحد (بت أو بايت) في كل مرة
  Block Cipher    يتم تقسيم النص إلى [blocks]{.ltr}، ويتم تشفير / فك تشفير بلوك واحد في كل مرة
:::

::: {#stream .section .block}
::: section-head
::: section-num
7
:::

<div>

## Stream Cipher {#stream-cipher .ltr style="direction:rtl;"}

التشفير رمزاً برمز عبر عملية XOR

</div>
:::

تتعامل مع الرسالة الأصلية بايتاً بايتاً، أي نعتبر الرسالة الأصلية كسلسلة
من البايتات. يُستخدم المفتاح [K]{.ltr} لتوليد [key stream]{.ltr} (سلسلة
من البايتات شبه العشوائية) من خلال أحد مولّدات الأرقام العشوائية
[PRNG]{.ltr}، حيث يكون [K]{.ltr} بمثابة [seed]{.ltr} لمولّد الأرقام
العشوائية. يتم التشفير / فك التشفير من خلال عملية [XOR]{.ltr}.

::: formula-box
[XOR encryption / decryption]{.flabel}

::: line
**Cᵢ** = Pᵢ ⊕ Kᵢ
:::

::: line
**Pᵢ** = Cᵢ ⊕ Kᵢ
:::
:::

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNjQwIDE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgICAgPGRlZnM+PG1hcmtlciBpZD0iYXJyb3cyIiBtYXJrZXJ3aWR0aD0iMTAiIG1hcmtlcmhlaWdodD0iMTAiIHJlZng9IjgiIHJlZnk9IjMiIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAsMCBMOCwzIEwwLDYgWiIgZmlsbD0idmFyKC0tcHJpbWFyeSkiIC8+PC9tYXJrZXI+PC9kZWZzPgogICAgICAgICAgICA8dGV4dCB4PSIzMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMSIgZmlsbD0idmFyKC0tZ29sZCkiPktleSBLPC90ZXh0PgogICAgICAgICAgICA8bGluZSB4MT0iNjAiIHkxPSIzOCIgeDI9IjYwIiB5Mj0iNjUiIHN0cm9rZT0idmFyKC0tZ29sZCkiIHN0cm9rZS13aWR0aD0iMiIgbWFya2VyLWVuZD0idXJsKCNhcnJvdzIpIj48L2xpbmU+CiAgICAgICAgICAgIDxyZWN0IHg9IjEwIiB5PSI2OCIgd2lkdGg9IjExMCIgaGVpZ2h0PSI0NiIgcng9IjkiIGZpbGw9InZhcigtLXN1cmZhY2UpIiBzdHJva2U9InZhcigtLWdvbGQpIiBzdHJva2Utd2lkdGg9IjEuNSIgLz4KICAgICAgICAgICAgPHRleHQgeD0iNjUiIHk9Ijg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTAiIGZpbGw9InZhcigtLWluaykiPlBSTkc8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjY1IiB5PSIxMDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSI5IiBmaWxsPSJ2YXIoLS1pbmstZmFpbnQpIj5rZXlzdHJlYW0gZ2VuPC90ZXh0PgogICAgICAgICAgICA8bGluZSB4MT0iNjUiIHkxPSIxMTQiIHgyPSI2NSIgeTI9IjE0MCIgc3Ryb2tlPSJ2YXIoLS1nb2xkKSIgc3Ryb2tlLXdpZHRoPSIyIiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93MikiPjwvbGluZT4KICAgICAgICAgICAgPHRleHQgeD0iOTAiIHk9IjEzMiIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vIiBmb250LXNpemU9IjEwIiBmaWxsPSJ2YXIoLS1nb2xkKSI+azwvdGV4dD4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iNjUiIGN5PSIxNTUiIHI9IjE0IiBmaWxsPSJub25lIiBzdHJva2U9InZhcigtLXByaW1hcnkpIiBzdHJva2Utd2lkdGg9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICA8dGV4dCB4PSI2NSIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTMiIGZpbGw9InZhcigtLXByaW1hcnkpIj7iipU8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjEwIiB5PSIxNTkiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMSIgZmlsbD0idmFyKC0taW5rLXNvZnQpIj5Q4bWiPC90ZXh0PgogICAgICAgICAgICA8bGluZSB4MT0iMzAiIHkxPSIxNTUiIHgyPSI1MCIgeTI9IjE1NSIgc3Ryb2tlPSJ2YXIoLS1pbmstc29mdCkiIHN0cm9rZS13aWR0aD0iMiIgbWFya2VyLWVuZD0idXJsKCNhcnJvdzIpIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSI4MCIgeTE9IjE1NSIgeDI9IjEzMCIgeTI9IjE1NSIgc3Ryb2tlPSJ2YXIoLS1hY2NlbnQpIiBzdHJva2Utd2lkdGg9IjIiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cyKSI+PC9saW5lPgogICAgICAgICAgICA8dGV4dCB4PSIxNTAiIHk9IjE1OSIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vIiBmb250LXNpemU9IjExIiBmaWxsPSJ2YXIoLS1hY2NlbnQpIj5D4bWiPC90ZXh0PgogICAgICAgICAgICA8dGV4dCB4PSIzMzAiIHk9IjMwIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTEiIGZpbGw9InZhcigtLWdvbGQpIj5LZXkgSzwvdGV4dD4KICAgICAgICAgICAgPGxpbmUgeDE9IjM2MCIgeTE9IjM4IiB4Mj0iMzYwIiB5Mj0iNjUiIHN0cm9rZT0idmFyKC0tZ29sZCkiIHN0cm9rZS13aWR0aD0iMiIgbWFya2VyLWVuZD0idXJsKCNhcnJvdzIpIj48L2xpbmU+CiAgICAgICAgICAgIDxyZWN0IHg9IjMxMCIgeT0iNjgiIHdpZHRoPSIxMTAiIGhlaWdodD0iNDYiIHJ4PSI5IiBmaWxsPSJ2YXIoLS1zdXJmYWNlKSIgc3Ryb2tlPSJ2YXIoLS1nb2xkKSIgc3Ryb2tlLXdpZHRoPSIxLjUiIC8+CiAgICAgICAgICAgIDx0ZXh0IHg9IjM2NSIgeT0iODgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMCIgZmlsbD0idmFyKC0taW5rKSI+UFJORzwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMzY1IiB5PSIxMDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSI5IiBmaWxsPSJ2YXIoLS1pbmstZmFpbnQpIj5rZXlzdHJlYW0gZ2VuPC90ZXh0PgogICAgICAgICAgICA8bGluZSB4MT0iMzY1IiB5MT0iMTE0IiB4Mj0iMzY1IiB5Mj0iMTQwIiBzdHJva2U9InZhcigtLWdvbGQpIiBzdHJva2Utd2lkdGg9IjIiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cyKSI+PC9saW5lPgogICAgICAgICAgICA8dGV4dCB4PSIzOTAiIHk9IjEzMiIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vIiBmb250LXNpemU9IjEwIiBmaWxsPSJ2YXIoLS1nb2xkKSI+azwvdGV4dD4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iMzY1IiBjeT0iMTU1IiByPSIxNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ2YXIoLS1hY2NlbnQpIiBzdHJva2Utd2lkdGg9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICA8dGV4dCB4PSIzNjUiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vIiBmb250LXNpemU9IjEzIiBmaWxsPSJ2YXIoLS1hY2NlbnQpIj7iipU8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjI3MCIgeT0iMTU5IiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTEiIGZpbGw9InZhcigtLWluay1zb2Z0KSI+Q+G1ojwvdGV4dD4KICAgICAgICAgICAgPGxpbmUgeDE9IjI5MCIgeTE9IjE1NSIgeDI9IjM1MCIgeTI9IjE1NSIgc3Ryb2tlPSJ2YXIoLS1hY2NlbnQpIiBzdHJva2Utd2lkdGg9IjIiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cyKSI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMzgwIiB5MT0iMTU1IiB4Mj0iNDMwIiB5Mj0iMTU1IiBzdHJva2U9InZhcigtLWluay1zb2Z0KSIgc3Ryb2tlLXdpZHRoPSIyIiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93MikiPjwvbGluZT4KICAgICAgICAgICAgPHRleHQgeD0iNDUwIiB5PSIxNTkiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMSIgZmlsbD0idmFyKC0taW5rLXNvZnQpIj5Q4bWiPC90ZXh0PgogICAgICAgICAgICA8dGV4dCB4PSI2NSIgeT0iMTg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iVGFqYXdhbCIgZm9udC1zaXplPSIxMSIgZmlsbD0idmFyKC0taW5rLWZhaW50KSI+RU5DUllQVElPTjwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMzY1IiB5PSIxODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJUYWphd2FsIiBmb250LXNpemU9IjExIiBmaWxsPSJ2YXIoLS1pbmstZmFpbnQpIj5ERUNSWVBUSU9OPC90ZXh0PgogICAgICAgICAgPC9zdmc+)

::: diagram-caption
مولّد الأرقام شبه العشوائي يحوّل المفتاح K إلى تدفّق مفاتيح (keystream)،
يُجرى معه XOR مع كل بايت من النص.
:::
:::

::: {.box .box-warning}
::: box-title
🔴 لماذا يتم التشفير من خلال [key stream]{.ltr} وليس من خلال المفتاح
[K]{.ltr} مباشرة؟
:::

إذا استُخدم [K]{.ltr} نفسه لتشفير كل بايت من الرسالة، فيمكن معرفة الرسالة
الأصلية بسبب خاصية [XOR]{.ltr}:

::: {.formula-box style="margin:10px 0;"}
::: line
P = p1, p2, p3, ..., pn --- التشفير بواسطة k
:::

::: line
c1 = p1⊕k , c2 = p2⊕k , ... , cn = pn⊕k
:::

::: line
**c1⊕c2⊕c3⊕...⊕cn = p1⊕p2⊕p3⊕...⊕pn**
:::
:::

بمجرد الحصول على p1⊕p2⊕p3⊕...⊕pn تصبح معرفة P سهلة عبر تحليل التكرار أو
التخمين. يُعرف هذا الهجوم باسم **Two-Time Pad Attack**.
:::

::: {.box .box-example}
::: box-title
🟡 مثال رقمي: [Two-Time Pad Attack]{.ltr}
:::

المعطيات: [P = 1011 1110]{.ltr} ، [K = 0111]{.ltr}

::: formula-box
::: line
p1 = 1011 , p2 = 1110
:::

::: line
c1 = p1 ⊕ k = 1100
:::

::: line
c2 = p2 ⊕ k = 1001
:::

::: line
c1 ⊕ c2 = 0101
:::

::: line
p1 ⊕ p2 = 0101
:::

::: line
**c1 ⊕ c2 = p1 ⊕ p2 = 0101**
:::
:::

التخمين: إذا استطاع المهاجم تخمين [p1]{.ltr} أو [p2]{.ltr} يمكنه معرفة
الآخر. مثلاً إذا تم تخمين [p1]{.ltr}:

::: {.formula-box style="margin-bottom:0;"}
::: line
p1 ⊕ 0101 = 1011 ⊕ 0101 = 1110 = p2
:::
:::
:::

### أشهر خوارزميات [Stream Cipher]{.ltr} {#أشهر-خوارزميات-stream-cipher style="font-size:17px;"}

  الخوارزمية           الوصف
  -------------------- ---------------------------------------------------------------------------------------------------------------------------
  RC4                  من أشهر الخوارزميات التاريخية لسرعتها وبساطتها، وكانت تُستخدم في بروتوكولات مثل [WEP]{.ltr}، لكنها أصبحت تُعتبر ضعيفة الآن.
  ChaCha20             خوارزمية حديثة وقوية جداً، تُستخدم حالياً في بروتوكولات متطورة مثل [TLS 1.3]{.ltr}، وتتميّز بأمان عالٍ وسرعة كبيرة.
  One-Time Pad (OTP)   مذكورة ضمن أشهر خوارزميات [Stream Cipher]{.ltr}.
:::

::: {#block .section .block}
::: section-head
::: section-num
8
:::

<div>

## Block Cipher {#block-cipher .ltr style="direction:rtl;"}

DES، Triple DES، و AES

</div>
:::

يتم تقسيم الرسالة الأصلية إلى كتل [(blocks)]{.ltr} ثابتة الحجم طولها
[n]{.ltr}، ثم يتم تشفير كل كتلة كمجموعة واحدة. إذا كانت الرسالة أصغر من
حجم الكتلة، تُستخدم عملية الحشو [padding]{.ltr} لإكمال الكتلة الأخيرة،
وعند فك التشفير تُحذف البتات المُضافة.

::: pill-row
[DES (Data Encryption Standard)]{.pill .ltr} [Triple DES]{.pill .ltr}
[AES (Advanced Encryption Standard)]{.pill .ltr}
:::

### DES --- 1976 {#des-1976 style="font-size:17px;"}

-   يتم تقسيم الرسالة إلى بلوكات بطول **64 bit**.
-   طول مفتاح التشفير **64 bit**، لكنه يحوي 8 بتات تمثّل [parity
    bit]{.ltr}، وبالتالي طوله الفعلي هو **56 bit** فقط.
-   [Parity bit]{.ltr} تُستخدم لاكتشاف الأخطاء في إنشاء المفاتيح وتوزيعها
    وتخزينها.

::: formula-box
[DES key structure (64 bit)]{.flabel}

::: line
K = (k1...k7 k8 \| k9...k15 k16 \| k17...k24 \| ... \| k56...k64)
:::
:::

::: {.box .box-warning}
::: box-title
🔴 كسر DES تاريخياً
:::

في عام 1998 قامت مؤسسة [The Electronic Frontier Foundation]{.ltr} بكسر
خوارزمية [DES]{.ltr} باستخدام آلة [DES Cracker]{.ltr} (باستخدام [brute
force attack]{.ltr})، حيث تم تجريب كل المفاتيح الممكنة التي عددها
[2⁵⁶]{.ltr}. نظراً لاحتمال تعرّض نظام [DES]{.ltr} لهجوم القوة الغاشمة، كان
هناك اهتمام كبير بإيجاد بديل: إمّا تصميم خوارزمية جديدة تماماً (مثل
[AES]{.ltr})، أو استخدام التشفير المتعدد مع [DES]{.ltr} ومفاتيح متعددة
([Triple DES]{.ltr}).
:::

### Triple DES {#triple-des style="font-size:17px;"}

تشفير [Triple DES]{.ltr} باستخدام مفتاحين (نمط [EDE]{.ltr}: تشفير ثم فك
تشفير ثم تشفير):

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNjQwIDEzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgICAgPGRlZnM+PG1hcmtlciBpZD0iYXJyb3czIiBtYXJrZXJ3aWR0aD0iMTAiIG1hcmtlcmhlaWdodD0iMTAiIHJlZng9IjgiIHJlZnk9IjMiIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAsMCBMOCwzIEwwLDYgWiIgZmlsbD0idmFyKC0taW5rLXNvZnQpIiAvPjwvbWFya2VyPjwvZGVmcz4KICAgICAgICAgICAgPHRleHQgeD0iMTAiIHk9IjU1IiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTIiIGZpbGw9InZhcigtLWluaykiPlA8L3RleHQ+CiAgICAgICAgICAgIDxsaW5lIHgxPSIyNSIgeTE9IjUwIiB4Mj0iNjAiIHkyPSI1MCIgc3Ryb2tlPSJ2YXIoLS1pbmstc29mdCkiIHN0cm9rZS13aWR0aD0iMiIgbWFya2VyLWVuZD0idXJsKCNhcnJvdzMpIj48L2xpbmU+CiAgICAgICAgICAgIDxyZWN0IHg9IjY1IiB5PSIzMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQyIiByeD0iOSIgZmlsbD0idmFyKC0tcHJpbWFyeS1zb2Z0KSIgc3Ryb2tlPSJ2YXIoLS1wcmltYXJ5KSIgLz4KICAgICAgICAgICAgPHRleHQgeD0iOTUiIHk9IjU2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTMiIGZpbGw9InZhcigtLXByaW1hcnkpIj5FPC90ZXh0PgogICAgICAgICAgICA8dGV4dCB4PSI5NSIgeT0iMjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMCIgZmlsbD0idmFyKC0tZ29sZCkiPksxPC90ZXh0PgogICAgICAgICAgICA8bGluZSB4MT0iMTI1IiB5MT0iNTAiIHgyPSIxNjUiIHkyPSI1MCIgc3Ryb2tlPSJ2YXIoLS1pbmstc29mdCkiIHN0cm9rZS13aWR0aD0iMiIgbWFya2VyLWVuZD0idXJsKCNhcnJvdzMpIj48L2xpbmU+CiAgICAgICAgICAgIDx0ZXh0IHg9IjE0NSIgeT0iNDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMCIgZmlsbD0idmFyKC0taW5rLWZhaW50KSI+QTwvdGV4dD4KICAgICAgICAgICAgPHJlY3QgeD0iMTcwIiB5PSIzMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQyIiByeD0iOSIgZmlsbD0idmFyKC0tYWNjZW50LXNvZnQpIiBzdHJva2U9InZhcigtLWFjY2VudCkiIC8+CiAgICAgICAgICAgIDx0ZXh0IHg9IjIwMCIgeT0iNTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJKZXRCcmFpbnMgTW9ubyIgZm9udC1zaXplPSIxMyIgZmlsbD0idmFyKC0tYWNjZW50KSI+RDwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMjAwIiB5PSIyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vIiBmb250LXNpemU9IjEwIiBmaWxsPSJ2YXIoLS1nb2xkKSI+SzI8L3RleHQ+CiAgICAgICAgICAgIDxsaW5lIHgxPSIyMzAiIHkxPSI1MCIgeDI9IjI3MCIgeTI9IjUwIiBzdHJva2U9InZhcigtLWluay1zb2Z0KSIgc3Ryb2tlLXdpZHRoPSIyIiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93MykiPjwvbGluZT4KICAgICAgICAgICAgPHRleHQgeD0iMjUwIiB5PSI0MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vIiBmb250LXNpemU9IjEwIiBmaWxsPSJ2YXIoLS1pbmstZmFpbnQpIj5CPC90ZXh0PgogICAgICAgICAgICA8cmVjdCB4PSIyNzUiIHk9IjMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDIiIHJ4PSI5IiBmaWxsPSJ2YXIoLS1wcmltYXJ5LXNvZnQpIiBzdHJva2U9InZhcigtLXByaW1hcnkpIiAvPgogICAgICAgICAgICA8dGV4dCB4PSIzMDUiIHk9IjU2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTMiIGZpbGw9InZhcigtLXByaW1hcnkpIj5FPC90ZXh0PgogICAgICAgICAgICA8dGV4dCB4PSIzMDUiIHk9IjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTAiIGZpbGw9InZhcigtLWdvbGQpIj5LMTwvdGV4dD4KICAgICAgICAgICAgPGxpbmUgeDE9IjMzNSIgeTE9IjUwIiB4Mj0iMzc1IiB5Mj0iNTAiIHN0cm9rZT0idmFyKC0taW5rLXNvZnQpIiBzdHJva2Utd2lkdGg9IjIiIG1hcmtlci1lbmQ9InVybCgjYXJyb3czKSI+PC9saW5lPgogICAgICAgICAgICA8dGV4dCB4PSIzOTIiIHk9IjU1IiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTIiIGZpbGw9InZhcigtLWluaykiPkM8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjE4MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iVGFqYXdhbCIgZm9udC1zaXplPSIxMSIgZmlsbD0idmFyKC0taW5rLWZhaW50KSI+RW5jcnlwdGlvbjogQyA9IEUoSzEsIEQoSzIsIEUoSzEsIFApKSk8L3RleHQ+CiAgICAgICAgICA8L3N2Zz4=)

::: diagram-caption
فك التشفير يسير بالاتجاه المعاكس تماماً: [D(K1) → E(K2) → D(K1)]{.ltr}.
:::
:::

::: formula-box
[Triple DES --- 3 مفاتيح]{.flabel}

::: line
C = E(K3, D(K2, E(K1, P)))
:::

::: line
طول المفتاح الكلي = **168 bit**
:::
:::

### AES [(Advanced Encryption Standard)]{.ltr} {#aes-advanced-encryption-standard style="font-size:17px;"}

  الخاصية       القيمة
  ------------- -----------------------
  طول البلوك    128 bit
  طول المفتاح   128, 192, or 256 bits
:::

::: {#modes .section .block}
::: section-head
::: section-num
9
:::

<div>

## أنماط التشغيل [(Modes of Operation)]{.ltr style="font-size:16px;"}

ECB · CBC · CFB · OFB · CTR

</div>
:::

::: {.box .box-warning}
::: box-title
🔴 المشكلة الأساسية
:::

في خوارزميات [block cipher]{.ltr}، تؤدي كتل النص الأصلي المتطابقة إلى
إنتاج كتل نص مشفّر متطابقة، مما يسمح للمهاجمين باستنتاج ملامح البيانات
الأصلية وتحليلها. الحل يكون باستخدام **أنماط التشغيل**.
:::

حدّدت [FIPS (Federal Information Processing Standards)]{.ltr} أربعة
أنماط: [ECB]{.ltr}، [CBC]{.ltr}، [CFB]{.ltr}، [OFB]{.ltr}. وأضاف [NIST
(National Institute of Standards and Technology)]{.ltr} نمطاً خامساً يُسمى
[Counter (CTR)]{.ltr}.

### 1) نمط [ECB (Electronic Codebook)]{.ltr} {#نمط-ecb-electronic-codebook style="font-size:18px; margin-top:30px;"}

الأبسط: يتم تقسيم النص إلى كتل متساوية الطول، ويتم تشفير كل كتلة بشكل
مستقل تماماً عن الكتل الأخرى.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNjIwIDExMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgICAgPGRlZnM+PG1hcmtlciBpZD0iYTQiIG1hcmtlcndpZHRoPSIxMCIgbWFya2VyaGVpZ2h0PSIxMCIgcmVmeD0iOCIgcmVmeT0iMyIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCwwIEw4LDMgTDAsNiBaIiBmaWxsPSJ2YXIoLS1pbmstc29mdCkiIC8+PC9tYXJrZXI+PC9kZWZzPgogICAgICAgICAgICA8ZyBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iMTEiPgogICAgICAgICAgICA8dGV4dCB4PSIzNSIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InZhcigtLWluay1zb2Z0KSI+UDE8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjE4NSIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InZhcigtLWluay1zb2Z0KSI+UDI8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjMzNSIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InZhcigtLWluay1zb2Z0KSI+UDM8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjQ4NSIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InZhcigtLWluay1zb2Z0KSI+UG48L3RleHQ+CiAgICAgICAgICAgIDxsaW5lIHgxPSIzNSIgeTE9IjI2IiB4Mj0iMzUiIHkyPSI0MiIgc3Ryb2tlPSJ2YXIoLS1pbmstc29mdCkiIG1hcmtlci1lbmQ9InVybCgjYTQpIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxODUiIHkxPSIyNiIgeDI9IjE4NSIgeTI9IjQyIiBzdHJva2U9InZhcigtLWluay1zb2Z0KSIgbWFya2VyLWVuZD0idXJsKCNhNCkiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjMzNSIgeTE9IjI2IiB4Mj0iMzM1IiB5Mj0iNDIiIHN0cm9rZT0idmFyKC0taW5rLXNvZnQpIiBtYXJrZXItZW5kPSJ1cmwoI2E0KSI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iNDg1IiB5MT0iMjYiIHgyPSI0ODUiIHkyPSI0MiIgc3Ryb2tlPSJ2YXIoLS1pbmstc29mdCkiIG1hcmtlci1lbmQ9InVybCgjYTQpIj48L2xpbmU+CiAgICAgICAgICAgIDxyZWN0IHg9IjEwIiB5PSI0NSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjMyIiByeD0iNyIgZmlsbD0idmFyKC0tcHJpbWFyeS1zb2Z0KSIgc3Ryb2tlPSJ2YXIoLS1wcmltYXJ5KSIgLz4KICAgICAgICAgICAgPHJlY3QgeD0iMTYwIiB5PSI0NSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjMyIiByeD0iNyIgZmlsbD0idmFyKC0tcHJpbWFyeS1zb2Z0KSIgc3Ryb2tlPSJ2YXIoLS1wcmltYXJ5KSIgLz4KICAgICAgICAgICAgPHJlY3QgeD0iMzEwIiB5PSI0NSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjMyIiByeD0iNyIgZmlsbD0idmFyKC0tcHJpbWFyeS1zb2Z0KSIgc3Ryb2tlPSJ2YXIoLS1wcmltYXJ5KSIgLz4KICAgICAgICAgICAgPHJlY3QgeD0iNDYwIiB5PSI0NSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjMyIiByeD0iNyIgZmlsbD0idmFyKC0tcHJpbWFyeS1zb2Z0KSIgc3Ryb2tlPSJ2YXIoLS1wcmltYXJ5KSIgLz4KICAgICAgICAgICAgPHRleHQgeD0iMzUiIHk9IjY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ2YXIoLS1wcmltYXJ5KSI+RShrKTwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMTg1IiB5PSI2NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0idmFyKC0tcHJpbWFyeSkiPkUoayk8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjMzNSIgeT0iNjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InZhcigtLXByaW1hcnkpIj5FKGspPC90ZXh0PgogICAgICAgICAgICA8dGV4dCB4PSI0ODUiIHk9IjY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ2YXIoLS1wcmltYXJ5KSI+RShrKTwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMjM1IiB5PSI2NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0idmFyKC0taW5rLWZhaW50KSI+Li4uPC90ZXh0PgogICAgICAgICAgICA8dGV4dCB4PSIzODUiIHk9IjY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ2YXIoLS1pbmstZmFpbnQpIj4uLi48L3RleHQ+CiAgICAgICAgICAgIDxsaW5lIHgxPSIzNSIgeTE9Ijc3IiB4Mj0iMzUiIHkyPSI5MyIgc3Ryb2tlPSJ2YXIoLS1hY2NlbnQpIiBtYXJrZXItZW5kPSJ1cmwoI2E0KSI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTg1IiB5MT0iNzciIHgyPSIxODUiIHkyPSI5MyIgc3Ryb2tlPSJ2YXIoLS1hY2NlbnQpIiBtYXJrZXItZW5kPSJ1cmwoI2E0KSI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMzM1IiB5MT0iNzciIHgyPSIzMzUiIHkyPSI5MyIgc3Ryb2tlPSJ2YXIoLS1hY2NlbnQpIiBtYXJrZXItZW5kPSJ1cmwoI2E0KSI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iNDg1IiB5MT0iNzciIHgyPSI0ODUiIHkyPSI5MyIgc3Ryb2tlPSJ2YXIoLS1hY2NlbnQpIiBtYXJrZXItZW5kPSJ1cmwoI2E0KSI+PC9saW5lPgogICAgICAgICAgICA8dGV4dCB4PSIzNSIgeT0iMTA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ2YXIoLS1hY2NlbnQpIj5DMTwvdGV4dD4KICAgICAgICAgICAgPHRleHQgeD0iMTg1IiB5PSIxMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InZhcigtLWFjY2VudCkiPkMyPC90ZXh0PgogICAgICAgICAgICA8dGV4dCB4PSIzMzUiIHk9IjEwNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0idmFyKC0tYWNjZW50KSI+QzM8L3RleHQ+CiAgICAgICAgICAgIDx0ZXh0IHg9IjQ4NSIgeT0iMTA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ2YXIoLS1hY2NlbnQpIj5DbjwvdGV4dD4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgPC9zdmc+)

::: diagram-caption
كل كتلة تُشفَّر بشكل مستقل تماماً بنفس المفتاح k --- لا يوجد ربط بين الكتل.
:::
:::

-   يؤثر خطأ بت واحد أو أكثر في الكتلة المشفّرة على فك تشفير **تلك الكتلة
    فقط**.
-   يسمح **بالتشفير المتوازي**.
-   يُنصح باستخدامه فقط للرسائل التي تتكون من كتلة واحدة فقط --- فهو
    **غير آمن للبيانات الطويلة**، لأن الكتل المتطابقة في النص الأصلي
    تنتج كتل نص مشفّر متطابقة، مما يكشف ملامح البيانات (مثل الصور).

### 2) نمط [CBC (Cipher Block Chaining)]{.ltr} {#نمط-cbc-cipher-block-chaining style="font-size:18px; margin-top:30px;"}

يحل مشكلة التكرار في [ECB]{.ltr} عن طريق ربط الكتل: يتم إجراء
[XOR]{.ltr} بين كتلة النص الأصلي الحالية وكتلة النص المشفّر السابقة، ثم
يتم تشفير الناتج. وبالتالي فإن الكتل المتطابقة تنتج نصوصاً مشفّرة مختلفة
تماماً.

::: formula-box
[CBC]{.flabel}

::: line
التشفير: C₀ = IV , Cⱼ = Eₖ(Cⱼ₋₁ ⊕ Pⱼ)
:::

::: line
فك التشفير: C₀ = IV , Pⱼ = Cⱼ₋₁ ⊕ Dₖ(Cⱼ)
:::
:::

-   النصوص المتطابقة **لا** تنتج كتل نص مشفّر متطابقة.
-   **لا يسمح** بالتشفير المتوازي (بسبب الاعتماد المتسلسل على الكتلة
    السابقة).

### 3) نمط [CFB (Cipher FeedBack)]{.ltr} {#نمط-cfb-cipher-feedback style="font-size:18px; margin-top:30px;"}

-   [CFB]{.ltr} عبارة عن تحويل خوارزمية [block cipher]{.ltr} لتعمل كـ
    [stream cipher]{.ltr}، لأنه يستخدم كتل بطول [r-bit]{.ltr} فقط (حيث
    [r ≤ n]{.ltr}).
-   يسمح المعيار بأن يكون [r]{.ltr} أي عدد من البتات (1, 8, 16, 64
    \...)، ويُشار إليه بـ [CFB-1]{.ltr}، [CFB-8]{.ltr}، [CFB-64]{.ltr}،
    [CFB-128]{.ltr}.
-   يعمل مثل [CBC]{.ltr} من خلال ربط جميع النصوص الواضحة السابقة.
-   يستخدم شعاع تهيئة [IV]{.ltr} (حجمه 64 بت عند استخدام [DES]{.ltr})
    وسجل إزاحة للبتات [r]{.ltr}.
-   الاستخدامات: تشفير البيانات، والمصادقة.

::: formula-box
[Let Sr(X) = the most significant r bits of X]{.flabel}

::: line
CFB encryption: Cᵢ = Pᵢ ⊕ Sr(Eₖ(IV))
:::

::: line
CFB decryption: Pᵢ = Cᵢ ⊕ Sr(Eₖ(IV))
:::
:::

### 4) نمط [OFB (Output FeedBack)]{.ltr} {#نمط-ofb-output-feedback style="font-size:18px; margin-top:30px;"}

يشبه [CFB]{.ltr} لكنه يستخدم شعاع التهيئة **المشفَّر** كتغذية راجعة. في
التشفير، يُشفَّر شعاع التهيئة [IV]{.ltr} أولاً، ثم تُستخدم المخرجات لتشفير
النص الأصلي ولتكون مدخلاً للجولة التالية.

::: formula-box
::: line
التشفير: z₀ = IV , cᵢ = E(zᵢ₋₁) ⊕ pᵢ
:::

::: line
فك التشفير: z₀ = IV , pᵢ = E(zᵢ₋₁) ⊕ cᵢ
:::
:::

::: {.box .box-tip}
::: box-title
💡 أهم ما يميز [OFB]{.ltr}
:::

عملية فك التشفير تستخدم **نفس خوارزمية التشفير** (وليس العكس) لتوليد
تدفق المفاتيح، ثم تُجري [XOR]{.ltr} مع النص المشفّر لاستعادة النص الأصلي.
:::

### 5) نمط [CTR (Counter Mode)]{.ltr} {#نمط-ctr-counter-mode style="font-size:18px; margin-top:30px;"}

يستخدم عداداً [Counter]{.ltr} فريداً لكل كتلة. يتم تشفير العداد ثم إجراء
[XOR]{.ltr} مع النص الأصلي.

::: {.box .box-def}
::: box-title
🟢 الأكثر كفاءة حالياً
:::

آمن جداً، ويسمح **بالتشفير وفك التشفير المتوازي** (سرعة هائلة)، كما يتيح
**الوصول العشوائي** لأي جزء من البيانات المشفّرة.
:::

### 🗂️ جدول مقارنة شامل {#جدول-مقارنة-شامل style="font-size:17px; margin-top:30px;"}

  النمط   الفكرة الأساسية                           الأمان مع التكرار             التشفير المتوازي
  ------- ----------------------------------------- ----------------------------- ----------------------------
  ECB     تشفير كل كتلة بشكل مستقل                  ضعيف --- يكشف تكرار الأنماط   ✅ مسموح
  CBC     XOR مع الكتلة المشفّرة السابقة             جيد --- يخفي التكرار          ❌ غير مسموح
  CFB     تحويل block cipher إلى stream عبر r-bit   جيد                           ---
  OFB     تغذية راجعة من IV المشفّر                  جيد                           ---
  CTR     تشفير عدّاد فريد لكل كتلة ثم XOR           ممتاز                         ✅ مسموح (تشفير وفك تشفير)
:::

::: {#mcq .section .block}
::: section-head
::: section-num
10
:::

<div>

## أسئلة تفاعلية للمراجعة

اضغط على أي إجابة لمعرفة ما إذا كانت صحيحة، ثم اطّلع على الشرح

</div>
:::

::: {#mcqContainer}
:::
:::

::: {#quickrevision .section .block}
::: section-head
::: section-num
11
:::

<div>

## المراجعة السريعة

كل ما تحتاجه خلال 5--10 دقائق قبل الامتحان

</div>
:::

::: qr-grid
::: qr-card
#### 🔑 التعريفات الأساسية

-   [Encryption]{.ltr}: Plaintext → Ciphertext
-   [Decryption]{.ltr}: Ciphertext → Plaintext
-   [Cipher]{.ltr}: خوارزمية تعتمد على مفتاح
-   [Cryptanalysis]{.ltr}: كسر التشفير دون معرفة المفتاح
-   مبدأ كيرشوف: الأمان في سرّية **المفتاح** فقط
:::

::: qr-card
#### 🧩 التصنيف التقليدي

-   [Substitution]{.ltr}: تبديل الرمز
-   [Transposition]{.ltr}: تبديل الموقع
-   قيصر = مشفّر جمع، أبسط مشفرات الاستبدال
:::

::: qr-card
#### 📐 الصيغ الأهم

-   Caesar: C=(P+K) mod 26
-   Affine: C=(P·K1+K2) mod 26
-   Affine⁻¹: P=((C−K2)·K1⁻¹) mod 26
-   Stream: Cᵢ=Pᵢ⊕Kᵢ
-   CBC: Cⱼ=Eₖ(Cⱼ₋₁⊕Pⱼ)
-   2-Key 3DES: C=E(K1,D(K2,E(K1,P)))
-   3-Key 3DES: C=E(K3,D(K2,E(K1,P)))
:::

::: qr-card
#### 🧮 أرقام يجب حفظها

-   DES: بلوك 64 bit / مفتاح فعلي 56 bit (+8 parity)
-   Triple DES (3 مفاتيح): 168 bit
-   AES: بلوك 128 bit / مفتاح 128, 192, أو 256 bit
-   DES كُسر عام 1998 بواسطة EFF (2⁵⁶ محاولة)
:::

::: qr-card
#### 🌊 Stream vs Block

-   Stream: بت/بايت واحد كل مرة، XOR مع keystream
-   Block: كتل ثابتة الطول + padding عند الحاجة
-   خطر استخدام K مباشرة بدل keystream: Two-Time Pad Attack
-   RC4 (قديم/ضعيف) · ChaCha20 (حديث/قوي، TLS 1.3) · OTP
:::

::: qr-card
#### 🔁 أنماط التشغيل

-   ECB: مستقل لكل كتلة، متوازي، غير آمن للبيانات الطويلة
-   CBC: يعتمد على الكتلة السابقة، غير متوازي بالتشفير
-   CFB: يحوّل block إلى stream عبر Sr(Eₖ(IV))
-   OFB: التغذية الراجعة من IV مشفّر، فك التشفير عبر E وليس D
-   CTR: الأسرع والأكثر أماناً، متوازي بالكامل + وصول عشوائي
-   FIPS حدّدت 4 أنماط، وأضاف NIST نمط CTR
:::
:::

::: {.exam-tag style="margin-top:20px;"}
⚠️ الأكثر ورودا في الامتحان: مثال Affine الكامل (تشفير + إيجاد المعكوس +
فك تشفير) --- راجعه خطوة بخطوة
:::
:::
:::

ملزمة مراجعة تفاعلية --- أمن المعلومات · المحاضرة الثانية · مبنية
بالكامل من محتوى المحاضرة
:::
:::
