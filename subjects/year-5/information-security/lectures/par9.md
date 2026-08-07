::: top-progress
::: {#topProgressFill .top-progress-fill}
:::
:::

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiI+PGxpbmUgeDE9IjMiIHkxPSI2IiB4Mj0iMjEiIHkyPSI2Ij48L2xpbmU+PGxpbmUgeDE9IjMiIHkxPSIxMiIgeDI9IjIxIiB5Mj0iMTIiPjwvbGluZT48bGluZSB4MT0iMyIgeTE9IjE4IiB4Mj0iMjEiIHkyPSIxOCI+PC9saW5lPjwvc3ZnPg==)

::: {#sidebarOverlay .sidebar-overlay}
:::

::: sidebar-header
::: brand
::: brand-mark
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA0MTQxQiIgc3Ryb2tlLXdpZHRoPSIyLjIiPjxwYXRoIGQ9Ik0xMiAyIEwyMCA2IFYxMSBDMjAgMTYuNSAxNi41IDIwLjUgMTIgMjIgQzcuNSAyMC41IDQgMTYuNSA0IDExIFY2IFoiIC8+PHBhdGggZD0iTTkgMTJsMiAyIDQtNCIgLz48L3N2Zz4=)
:::

::: brand-text
# أمن قواعد البيانات

IS · LECTURE 09 · DB SECURITY
:::
:::

::: {#themeToggle .theme-toggle}
[الوضع الداكن]{#themeLabel}

::: theme-toggle-track
::: theme-toggle-knob
🌙
:::
:::
:::
:::

::: search-box
::: search-input-wrap
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjciPjwvY2lyY2xlPjxsaW5lIHgxPSIyMSIgeTE9IjIxIiB4Mj0iMTYuNjUiIHkyPSIxNi42NSI+PC9saW5lPjwvc3ZnPg==)
:::

::: {#searchMeta .search-meta}
:::
:::

::: progress-widget
::: progress-ring
![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDYiIGhlaWdodD0iNDYiPgogICAgICAgIDxjaXJjbGUgY2xhc3M9InByb2dyZXNzLXJpbmctYmciIGN4PSIyMyIgY3k9IjIzIiByPSIxOSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBjbGFzcz0icHJvZ3Jlc3MtcmluZy1maWxsIiBpZD0icmluZ0ZpbGwiIGN4PSIyMyIgY3k9IjIzIiByPSIxOSIgc3Ryb2tlLWRhc2hhcnJheT0iMTE5LjQiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMTkuNCI+PC9jaXJjbGU+CiAgICAgIDwvc3ZnPg==)

::: {#ringText .progress-ring-text}
0%
:::
:::

::: progress-label
تقدّم القراءة**ابدأ الآن**
:::
:::

::: {.main-content role="main"}
::: {#hero .section .hero}
::: hero-eyebrow
[]{.dot} أمن المعلومات --- المحاضرة التاسعة
:::

## أمن قواعد البيانات DB Security

دليل تفاعلي شامل لحماية قواعد البيانات من الوصول غير المصرح به والتعديل
والتدمير --- من التحكم في الوصول والاستدلال والتدفق والتشفير، مروراً
بالمستويات الست المؤثرة في الأمان، وصولاً إلى ثغرات [SQL
Injection]{.term} وطرق الوقاية منها.

::: hero-stats
::: hero-stat
**4**تدابير مضادة رئيسية
:::

::: hero-stat
**6**مستويات تؤثر على الأمان
:::

::: hero-stat
**2**نوعا القنوات السرية
:::

::: hero-stat
**15**سؤال تقييمي ختامي
:::
:::
:::

::: {#sec-01 .section .content-section data-title="المقدمة: تهديدات وتدابير الحماية" icon="shield"}
::: sec-head
::: sec-num
01
:::

<div>

## المقدمة: التهديدات والتدابير المضادة

[Introduction · Threats & Countermeasures]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
::: {.box .box-definition}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjkiPjwvY2lyY2xlPjxsaW5lIHgxPSIxMiIgeTE9IjgiIHgyPSIxMiIgeTI9IjEyIj48L2xpbmU+PGNpcmNsZSBjeD0iMTIiIGN5PSIxNiIgcj0iLjMiPjwvY2lyY2xlPjwvc3ZnPg==)
تعريف
:::

**أمن قواعد البيانات** يعني حمايتها من **الوصول غير المصرح به** أو
**التعديل** أو **التدمير**، سواء كان ذلك متعمداً أو غير متعمد.
:::

يتطلب أمن قواعد البيانات آليات تحميها من التهديدات المتعمدة أو العرضية.
وتشمل هذه الآليات مكونات نظام إدارة قواعد البيانات [DBMS]{.term} من
أجهزة وبرامج ومستخدمين وبيانات. ويحمي أمن قواعد البيانات من التهديدات
التالية:

::: kw-grid
::: kw-card
::: {.ic style="background:rgba(242,80,110,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LXJlZCkiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDF2MjJNMTcgNUg5LjVhMy41IDMuNSAwIDAgMCAwIDdoNWEzLjUgMy41IDAgMCAxIDAgN0g2IiAvPjwvc3ZnPg==)
:::

##### السرقة والاحتيال

Theft & Fraud
:::

::: kw-card
::: {.ic style="background:rgba(245,166,35,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LWFtYmVyKSIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNMiAxMnM0LTcgMTAtNyAxMCA3IDEwIDctNCA3LTEwIDctMTAtNy0xMC03eiIgLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIj48L2NpcmNsZT48bGluZSB4MT0iMyIgeTE9IjMiIHgyPSIyMSIgeTI9IjIxIj48L2xpbmU+PC9zdmc+)
:::

##### فقدان الخصوصية / السرية

Loss of Privacy / Confidentiality
:::

::: kw-card
::: {.ic style="background:rgba(91,141,239,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LWJsdWUpIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDEybDIgMiA0LTRNMTIgM2w4IDR2NWMwIDUtMy41IDguNS04IDEwLTQuNS0xLjUtOC01LTgtMTBWN2w4LTR6IiBzdHlsZT0ib3BhY2l0eTouNCIgLz48L3N2Zz4=)
:::

##### فقدان سلامة البيانات

Loss of Integrity
:::

::: kw-card
::: {.ic style="background:rgba(45,212,191,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LXRlYWwpIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjkiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0xMiA3djVsMyAzIiAvPjwvc3ZnPg==)
:::

##### فقدان التوافر

Loss of Availability
:::
:::

لحماية قواعد البيانات من هذه الأنواع من التهديدات، يمكن تطبيق **أربعة
أنواع من التدابير المضادة**:

::: table-wrap
  -----------------------------------------------------------------------
  التدبير المضاد                      الوصف
  ----------------------------------- -----------------------------------
  [Access Control]{.term}\            تحديد من يمكنه الوصول إلى عناصر
  التحكم في الوصول                    قاعدة البيانات ونوع العملية المسموح
                                      بها.

  [Inference Control]{.term}\         لحماية قواعد البيانات الإحصائية
  التحكم في الاستدلال                 وضمان عدم إمكانية الوصول إلى
                                      معلومات الأفراد.

  [Flow Control]{.term}\              يمنع تدفق المعلومات إلى المستخدمين
  التحكم في التدفق                    غير المصرح لهم.

  [Encryption]{.term}\                تحويل البيانات إلى صيغة غير مفهومة
  التشفير                             لمن لا يملك مفتاح فك التشفير.
  -----------------------------------------------------------------------
:::

::: {.box .box-note}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMyAyIDMgMTRoN2wtMSA4IDEwLTEyaC03bDEtOHoiIC8+PC9zdmc+)
ملاحظة مهمة
:::

يتضمن نظام إدارة قواعد البيانات عادةً نظاماً فرعياً لأمن قواعد البيانات
**وتفويضاً** فرعياً، وهو المسؤول عن ضمان أمان أجزاء قاعدة البيانات ضد
الوصول غير المصرح به.

توفر بعض أنظمة إدارة قواعد البيانات إمكانيات خاصة لتشفير البيانات
والوصول إليها بعد فك تشفيرها. عادةً ما يحدث انخفاض في الأداء بسبب الوقت
اللازم لفك تشفير البيانات.
:::
:::
:::

::: {#sec-02 .section .content-section data-title="قواعد البيانات الإحصائية والاستدلال" icon="chart"}
::: sec-head
::: sec-num
02
:::

<div>

## قواعد البيانات الإحصائية والاستدلال

[Statistical Databases & Inference]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
تُستخدم **قواعد البيانات الإحصائية** بشكل أساسي لإنتاج إحصاءات أو ملخصات
للقيم بناءً على معايير مختلفة. تتضمن **الاستعلامات الإحصائية**
[statistical queries]{.term} تطبيق دوال إحصائية على مجموعة من الصفوف،
مثل استرجاع عدد الأفراد في جدول أو متوسط دخلهم.

::: {.box .box-warning}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMC4yOSAzLjg2IDEuODIgMThhMiAyIDAgMCAwIDEuNzEgM2gxNi45NGEyIDIgMCAwIDAgMS43MS0zTDEzLjcxIDMuODZhMiAyIDAgMCAwLTMuNDIgMHoiIC8+PGxpbmUgeDE9IjEyIiB5MT0iOSIgeDI9IjEyIiB5Mj0iMTMiPjwvbGluZT48Y2lyY2xlIGN4PSIxMiIgY3k9IjE3IiByPSIuNCI+PC9jaXJjbGU+PC9zdmc+)
تحذير
:::

لا يُسمح لمستخدمي الإحصاء باسترجاع بيانات الأفراد، مثل دخل شخص معين. يجب
أن تمنع تقنيات أمان قواعد البيانات الإحصائية استرجاع بيانات الأفراد.
:::

يمكن تحقيق ذلك بمنع الاستعلامات التي تسترجع قيم السمة [attribute]{.term}
الفردية، والسماح فقط بالاستعلامات التي تتضمن دوال التجميع الإحصائي مثل:

::: code-box
::: code-title
الدوال الإحصائية المسموح بهاAGGREGATE FUNCTIONS
:::

    COUNT · SUM · MIN · MAX · AVERAGE · STANDARD DEVIATION
:::

::: diagram-card
#### كيف يُقرَّر السماح بالاستعلام الإحصائي؟

::: flow
::: {.flow-step .accent}
استعلام وارد على قاعدة البيانات الإحصائية
:::

::: flow-arrow
↓
:::

::: flow-step
هل يعتمد الاستعلام على دالة تجميع مثل [COUNT/SUM/AVG]{.term
style="font-size:11px"} فقط؟
:::

::: flow-arrow
↓
:::

::: flow-branch
::: flow-col
::: branch-label
نعم
:::

::: {.flow-step .success}
✔ يُنفَّذ الاستعلام ويُعاد الملخص الإحصائي
:::
:::

::: flow-col
::: branch-label
لا --- يطلب قيمة سمة فردية
:::

::: {.flow-step .danger}
✘ يُمنع الاستعلام لحماية بيانات الفرد
:::
:::
:::
:::
:::

يجب على نظام إدارة قواعد البيانات ضمان سرية المعلومات المتعلقة بالأفراد،
مع توفير ملخصات إحصائية مفيدة لبياناتهم للمستخدمين. ويُعدّ توفير حماية
خصوصية المستخدمين في قاعدة بيانات إحصائية أمراً بالغ الأهمية.

::: {.box .box-example}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDNINWEyIDIgMCAwIDAtMiAydjRtNi02aDEwYTIgMiAwIDAgMSAyIDJ2NE0zIDE1djRhMiAyIDAgMCAwIDIgMmg0bTEwLTZ2NGEyIDIgMCAwIDEtMiAyaC00IiAvPjwvc3ZnPg==)
مشكلة الاستدلال --- Inference
:::

**الاستدلال**، في سياق أمن قواعد البيانات، هو عملية تنفيذ استعلامات مصرَّح
بها واستنتاج معلومات غير مصرَّح بها من الردود المشروعة الواردة. تنشأ
**مشكلة الاستدلال** عندما يكون مجموع عدد من عناصر البيانات أكثر حساسية
من العناصر الفردية، أو عندما يمكن استخدام مجموعة من عناصر البيانات
لاستنتاج بيانات ذات حساسية أعلى.

يُشار إلى مسار نقل المعلومات الذي يتم من خلاله الحصول على بيانات غير مصرَّح
بها بـ **قناة الاستدلال** [Inference Channel]{.term}.

وفي بعض الحالات، يمكن استنتاج قيم الصفوف الفردية من سلسلة من الاستعلامات
الإحصائية، خصوصاً عندما تتكون مجموعة البيانات من عدد قليل من الصفوف.
:::

**منع الاستدلال** --- أهم الطرق المتبعة:

-   تقييد الاستعلامات وتحديد **حد أدنى لعدد السجلات** المسموح بالاستعلام
    عنها.
-   منع **تسلسل الاستعلامات** التي تشير إلى نفس مجموعة السجلات.
-   إدخال بعض **التشويش** أو **عدم الدقة** في النتائج المُعادة.
:::
:::

::: {#sec-03 .section .content-section data-title="التحكم بالتدفق والقنوات السرية" icon="flow"}
::: sec-head
::: sec-num
03
:::

<div>

## التحكم بالتدفق والقنوات السرية

[Flow Control & Covert Channels]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
يتحكم **نظام إدارة التدفق** في توزيع أو تدفق المعلومات بين الكائنات التي
يمكن الوصول إليها. يحدث **التدفق** بين الكائن [X]{.term} والكائن
[Y]{.term} عندما يقرأ برنامج قيماً من [X]{.term} ويكتبها في [Y]{.term}.

يتحقق نظام إدارة التدفق من خلال عدم تدفق المعلومات الموجودة في بعض
الكائنات، صراحةً أو ضمناً، إلى كائنات أقل حماية. تحدد **سياسة التدفق**
[flow policy]{.term} القنوات التي يُسمح للمعلومات بالانتقال عبرها.

::: {.box .box-definition}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjkiPjwvY2lyY2xlPjxsaW5lIHgxPSIxMiIgeTE9IjgiIHgyPSIxMiIgeTI9IjEyIj48L2xpbmU+PGNpcmNsZSBjeD0iMTIiIGN5PSIxNiIgcj0iLjMiPjwvY2lyY2xlPjwvc3ZnPg==)
أبسط سياسة تدفق
:::

تحدد أبسط سياسة تدفق فئتين فقط من المعلومات: **سرية** [confidential
(C)]{.term} و**غير سرية** [nonconfidential (N)]{.term}. وتسمح بجميع
التدفقات باستثناء التدفقات من الفئة C إلى الفئة N.
:::

::: diagram-card
#### التدفقات المسموحة والممنوعة بين الفئتين N و C

::: {.table-wrap style="margin:0;"}
  اتجاه التدفق     الحالة
  ---------------- ---------
  [N → N]{.term}   ✔ مسموح
  [N → C]{.term}   ✔ مسموح
  [C → C]{.term}   ✔ مسموح
  [C → N]{.term}   ✘ ممنوع
:::
:::

**القنوات السرية** [Covert Channels]{.term} هي مسار اتصال خفي يسمح بنقل
المعلومات بطريقة تنتهك الأمن أو السياسة المتبعة. تسمح القنوات السرية
بمرور المعلومات من مستوى تصنيف أعلى إلى مستوى تصنيف أدنى عبر وسائل غير
مشروعة. يمكن تصنيف القنوات السرية إلى فئتين رئيسيتين:

::: kw-grid
::: kw-card
::: {.ic style="background:rgba(91,141,239,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LWJsdWUpIiBzdHJva2Utd2lkdGg9IjIiPjxyZWN0IHg9IjMiIHk9IjciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxMyIgcng9IjIiIC8+PHBhdGggZD0iTTggN1Y1YTQgNCAwIDAgMSA4IDB2MiIgLz48L3N2Zz4=)
:::

##### قنوات التخزين

[Storage Channels]{.term style="font-size:11px"} --- لا تتطلب أي تزامن
زمني، حيث تُنقل المعلومات من خلال الوصول إلى معلومات النظام أو ما لا يمكن
للمستخدم الوصول إليه.
:::

::: kw-card
::: {.ic style="background:rgba(245,166,35,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LWFtYmVyKSIgc3Ryb2tlLXdpZHRoPSIyIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI5Ij48L2NpcmNsZT48cGF0aCBkPSJNMTIgN3Y1bDMgMyIgLz48L3N2Zz4=)
:::

##### قنوات التوقيت

[Timing Channels]{.term style="font-size:11px"} --- تسمح بنقل المعلومات
من خلال توقيت الأحداث أو العمليات.
:::
:::

::: {.box .box-tip}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDE4aDZNMTAgMjFoNE0xMiAzYTYgNiAwIDAgMC00IDEwLjVjLjYuNiAxIDEuNCAxIDIuNWg2YzAtMS4xLjQtMS45IDEtMi41QTYgNiAwIDAgMCAxMiAzeiIgLz48L3N2Zz4=)
نصيحة
:::

يعتقد بعض خبراء الأمن أن إحدى طرق تجنب القنوات السرية هي عدم حصول
المبرمجين على إمكانية الوصول إلى البيانات الحساسة التي من المفترض أن
يعالجها البرنامج بعد تشغيله.
:::
:::
:::

::: {#sec-04 .section .content-section data-title="الخطة الأمنية" icon="clipboard"}
::: sec-head
::: sec-num
04
:::

<div>

## الخطة الأمنية

[Security Plan]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
تحدد **الخطة الأمنية** إجراءات الأمن المادي والتحكم في الوصول إلى نظام
المعلومات لتقييد الوصول إلى موارد الشركة وبيانات الموظفين/العملاء.
بالنسبة لحماية قواعد البيانات، يمكن أن تتضمن الخطة الأمنية ما يلي:

-   إجراءات الأمن المادي للمبنى نفسه.
-   تثبيت نظام إدارة قواعد البيانات وتهيئته بشكل آمن.
-   إنشاء حسابات المستخدمين وتأمينها، ووضع ضوابط وصول مناسبة لهم.
-   وضع معايير للتطبيقات التي تصل إلى قاعدة البيانات وتطبيقها.
-   تشفير البيانات الحساسة.
-   ضمان أمان اتصالات الشبكة بالبيانات.
-   إنشاء آليات تدقيق مناسبة لقاعدة البيانات.
-   تحديد التهديدات الأمنية والتصدي لها، وتطبيق ضوابط وتحديثات الأمان
    حسب الحاجة.
:::
:::

::: {#sec-05 .section .content-section data-title="المستويات الست المؤثرة على الأمان" icon="layers"}
::: sec-head
::: sec-num
05
:::

<div>

## المستويات الست المؤثرة على أمان قواعد البيانات

[Six Levels Affecting DB Security]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
لا يقتصر الأمان على قاعدة البيانات فقط، حيث يشمل **تطبيق قاعدة البيانات
بأكمله**. يمكن أن تحدث الاختراقات على أي من هذه المستويات الست --- انقر
على أي حلقة أو عنصر في القائمة لعرض تفاصيلها:

::: diagram-card
#### نموذج الحماية متعدد الطبقات --- انقر للاستكشاف

::: vault-wrap
![](data:image/svg+xml;base64,PHN2ZyBjbGFzcz0idmF1bHQtc3ZnIiB2aWV3Ym94PSIwIDAgMzQwIDM0MCIgaWQ9InZhdWx0U3ZnIj4KICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz0idmF1bHQtcmluZyIgZGF0YS1pZD0iaHVtIiBjeD0iMTcwIiBjeT0iMTcwIiByPSIxNjAiIGZpbGw9IiM1QjZCODQiIGZpbGwtb3BhY2l0eT0iMC4xNiI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9InZhdWx0LXJpbmciIGRhdGEtaWQ9InBoeSIgY3g9IjE3MCIgY3k9IjE3MCIgcj0iMTMyIiBmaWxsPSIjQTc4QkZBIiBmaWxsLW9wYWNpdHk9IjAuMjIiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPSJ2YXVsdC1yaW5nIiBkYXRhLWlkPSJuZXQiIGN4PSIxNzAiIGN5PSIxNzAiIHI9IjEwNCIgZmlsbD0iIzVCOERFRiIgZmlsbC1vcGFjaXR5PSIwLjMwIj48L2NpcmNsZT4KICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz0idmF1bHQtcmluZyIgZGF0YS1pZD0ib3MiIGN4PSIxNzAiIGN5PSIxNzAiIHI9Ijc2IiBmaWxsPSIjRjVBNjIzIiBmaWxsLW9wYWNpdHk9IjAuMzgiPjwvY2lyY2xlPgogICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPSJ2YXVsdC1yaW5nIiBkYXRhLWlkPSJhcHAiIGN4PSIxNzAiIGN5PSIxNzAiIHI9IjQ4IiBmaWxsPSIjMzdEMzk5IiBmaWxsLW9wYWNpdHk9IjAuNSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9InZhdWx0LXJpbmciIGRhdGEtaWQ9ImRiIiBjeD0iMTcwIiBjeT0iMTcwIiByPSIyMiIgZmlsbD0iIzJERDRCRiI+PC9jaXJjbGU+CiAgICAgICAgICAgIDx0ZXh0IHg9IjE3MCIgeT0iMTc0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8iIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzA0MTQxQiIgZm9udC13ZWlnaHQ9IjcwMCI+REI8L3RleHQ+CiAgICAgICAgICA8L3N2Zz4=){#vaultSvg
.vault-svg}

::: {#vaultLegend .vault-legend}
:::
:::

::: {#vaultDesc .vault-desc}
انقر على أحد المستويات لعرض شرحه هنا.
:::
:::
:::
:::

::: {#sec-06 .section .content-section data-title="مستوى قاعدة البيانات" icon="db"}
::: sec-head
::: sec-num
06
:::

<div>

## مستوى قاعدة البيانات

[Database Level]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
يتم إنشاء **حسابات مستخدمين وكلمات مرور** للتحكم في عملية تسجيل الدخول
بواسطة نظام إدارة قواعد البيانات.

::: table-wrap
  -----------------------------------------------------------------------
  نوع المستخدم                        الصلاحيات
  ----------------------------------- -----------------------------------
  [superuser]{.term}\                 يتمتع بـ **صلاحيات شاملة** على نظام
  مسؤول النظام (افتراضياً)             قاعدة البيانات بأكمله.

  المستخدمون العاديون                 ليس لديهم صلاحيات شاملة على نظام
                                      قاعدة البيانات؛ لديهم فقط صلاحيات
                                      [SELECT]{.term}, [INSERT]{.term},
                                      [UPDATE]{.term}. لكن لديهم صلاحيات
                                      شاملة على قاعدة بياناتهم الخاصة،
                                      بما في ذلك **خيار منح الصلاحيات**
                                      لغيرهم.
  -----------------------------------------------------------------------
:::
:::
:::

::: {#sec-07 .section .content-section data-title="آليات الأمان" icon="lock"}
::: sec-head
::: sec-num
07
:::

<div>

## آليات الأمان

[Security Mechanisms]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
::: kw-grid
::: kw-card
::: {.ic style="background:rgba(45,212,191,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LXRlYWwpIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xIDEyczQtNyAxMS03IDExIDcgMTEgNy00IDctMTEgNy0xMS03LTExLTd6IiAvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiPjwvY2lyY2xlPjwvc3ZnPg==)
:::

##### [Views]{.term style="font-size:12px"}

استخدام العروض يساهم في: تعزيز الأمان، تعزيز استقلالية البيانات
المنطقية، وتعزيز استقلالية البيانات المادية.
:::

::: kw-card
::: {.ic style="background:rgba(91,141,239,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LWJsdWUpIiBzdHJva2Utd2lkdGg9IjIiPjxyZWN0IHg9IjMiIHk9IjExIiB3aWR0aD0iMTgiIGhlaWdodD0iMTAiIHJ4PSIyIiAvPjxwYXRoIGQ9Ik03IDExVjdhNSA1IDAgMCAxIDEwIDB2NCIgLz48L3N2Zz4=)
:::

##### إدارة التحكم في الوصول

تحديد صلاحيات الوصول لكل عنصر في قاعدة البيانات (جدول، عرض، خصائص)، ولكل
مستخدم، ولكل عملية.
:::

::: kw-card
::: {.ic style="background:rgba(242,80,110,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LXJlZCkiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIgLz48cGF0aCBkPSJNMTQgMnY2aDYiIC8+PC9zdmc+)
:::

##### سجل الأمان

[Security Log]{.term style="font-size:11px"} --- تسجيل جميع محاولات
اختراق الأمان.
:::

::: kw-card
::: {.ic style="background:rgba(245,166,35,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LWFtYmVyKSIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNOSAxMUg1YTIgMiAwIDAgMC0yIDJ2N2ExIDEgMCAwIDAgMSAxaDRNOSAxMWwzLTkgMyA5bS02IDBoNm0wIDBoNGEyIDIgMCAwIDEgMiAydjdhMSAxIDAgMCAxLTEgMWgtNCIgLz48L3N2Zz4=)
:::

##### سجل التدقيق

[Audit Trail]{.term style="font-size:11px"} --- تسجيل جميع عمليات الوصول
إلى قاعدة البيانات، بما في ذلك مقدّم الطلب، والعملية المنفَّذة، ومحطة العمل
المستخدمة، والوقت، وعناصر البيانات، والقيمة المعنية.
:::

::: kw-card
::: {.ic style="background:rgba(167,139,250,.15)"}
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0idmFyKC0tYWNjZW50LXB1cnBsZSkiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEzIDIgMyAxNGg3bC0xIDggMTAtMTJoLTdsMS04eiIgLz48L3N2Zz4=)
:::

##### [Triggers]{.term style="font-size:12px"} --- المُشغِّلات

إعداد سجل تدقيق لجدول، لتسجيل جميع التغييرات، ووقت إجرائها، وهوية
المستخدم الذي أجراها.
:::
:::

::: {.box .box-example}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDNINWEyIDIgMCAwIDAtMiAydjRtNi02aDEwYTIgMiAwIDAgMSAyIDJ2NE0zIDE1djRhMiAyIDAgMCAwIDIgMmg0bTEwLTZ2NGEyIDIgMCAwIDEtMiAyaC00IiAvPjwvc3ZnPg==)
مثال محلول --- Trigger لسجل التدقيق
:::

مُشغِّل يعمل قبل تحديث جدول [purchase]{.term}، فيسجّل القيم القديمة والجديدة
في جدول [purchase_audit]{.term} تلقائياً.
:::

::: diagram-card
#### مسار عمل الـ Trigger

::: flow
::: {.flow-step .accent}
تنفيذ [UPDATE]{.term style="font-size:11px"} على جدول purchase
:::

::: flow-arrow
↓
:::

::: flow-step
يُفعَّل الشرط [BEFORE UPDATE]{.term style="font-size:11px"}
:::

::: flow-arrow
↓
:::

::: flow-step
تشغيل المُشغِّل [purchase_auditTrail]{.term style="font-size:11px"}
:::

::: flow-arrow
↓
:::

::: {.flow-step .success}
✔ إدراج سجل جديد في purchase_audit (القيم القديمة والجديدة + المستخدم +
التاريخ)
:::
:::
:::

::: code-box
::: code-title
مثال: Trigger for Audit LogSQL
:::

    CREATE TABLE purchase (purchase_date date NOT NULL,
                         pid int(11) NOT NULL,
                         custId int(11) NOT NULL,
                         quantity int(11) DEFAULT NULL,
                         price float DEFAULT NULL,
                         PRIMARY KEY(purchase_date, pid, custId));

    CREATE TABLE purchase_audit (log_date date NOT NULL,
                               who_update varchar(30) NOT NULL,
                               purchase_date date DEFAULT NULL,
                               pid int(11) DEFAULT NULL,
                               custId int(11) NOT NULL,
                               old_price float NOT NULL,
                               new_price float NOT NULL);

    DELIMITER $$
    CREATE TRIGGER purchase_auditTrail
    BEFORE UPDATE ON purchase
    FOR EACH ROW
       INSERT INTO purchase_audit
       VALUES (CURRENT_DATE, CURRENT_USER, old.purchase_date, old.pid,
               old.custid, old.price, new.price)
    $$
    DELIMITER ;
:::
:::
:::

::: {#sec-08 .section .content-section data-title="التشفير" icon="key"}
::: sec-head
::: sec-num
08
:::

<div>

## التشفير

[Encryption]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
يمكن تطبيق التشفير على مستويات مختلفة من قاعدة البيانات:

::: kw-grid
::: kw-card
##### قاعدة البيانات بأكملها

تشفير شامل لكل البيانات المخزَّنة.
:::

::: kw-card
##### مستوى السجل

تشفير السجلات (Records) المحددة فقط.
:::

::: kw-card
##### مستوى السمة

تشفير الأعمدة (Attributes) المحددة فقط.
:::

::: kw-card
##### مستوى الحقل الفردي

تشفير حقل واحد بعينه ضمن السجل.
:::
:::

::: {.box .box-tip}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDE4aDZNMTAgMjFoNE0xMiAzYTYgNiAwIDAgMC00IDEwLjVjLjYuNiAxIDEuNCAxIDIuNWg2YzAtMS4xLjQtMS45IDEtMi41QTYgNiAwIDAgMCAxMiAzeiIgLz48L3N2Zz4=)
نصيحة
:::

يُنصح باستخدام التشفير عند نقل البيانات إلى مواقع أخرى. مع ذلك، يؤدي
التشفير إلى زيادة الحمل على النظام.

يحتوي [MySQL]{.term} على دالة [hash function]{.term} مدمجة؛ لذا يُنصح
بتشفير **كلمات المرور فقط** باستخدامها.
:::

**سلبيات التشفير:**

::: table-wrap
  السلبية          التفصيل
  ---------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  إدارة المفاتيح   يجب أن يكون لدى المستخدمين المصرَّح لهم إمكانية الوصول إلى مفتاح فك التشفير للبيانات التي لديهم صلاحية الوصول إليها. نظراً لأن قاعدة البيانات عادةً ما تكون متاحة لمجموعة واسعة من المستخدمين وعدد من التطبيقات، فإن توفير مفاتيح آمنة لأجزاء محددة من قاعدة البيانات للمستخدمين والتطبيقات المصرَّح لهم يُعدّ مهمة معقدة.
  عدم المرونة      عندما يتم تشفير جزء من قاعدة البيانات أو كلها، يصبح من الصعب إجراء البحث عن السجلات.
:::
:::
:::

::: {#sec-09 .section .content-section data-title="DCL — منح وسحب الصلاحيات" icon="grant"}
::: sec-head
::: sec-num
09
:::

<div>

## DCL --- منح وسحب الصلاحيات

[Data Control Language · GRANT / REVOKE]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
::: {.box .box-definition}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjkiPjwvY2lyY2xlPjxsaW5lIHgxPSIxMiIgeTE9IjgiIHgyPSIxMiIgeTI9IjEyIj48L2xpbmU+PGNpcmNsZSBjeD0iMTIiIGN5PSIxNiIgcj0iLjMiPjwvY2lyY2xlPjwvc3ZnPg==)
تعريف
:::

[DCL (Data Control Language)]{.term} لغة فرعية من [SQL]{.term} لمنح
الصلاحيات للمستخدمين وسحبها منهم.

**الصلاحية** [Privilege]{.term} هي إجراء (مثل الإنشاء، التنفيذ، القراءة،
التحديث، الحذف) يُسمح للمستخدم بتنفيذه على كائن قاعدة البيانات.
:::

::: code-box
::: code-title
الصيغة العامةSQL SYNTAX
:::

    GRANT { ALL PRIVILEGES | privilege-list }
    ON    { object-name }
    TO    { PUBLIC | user-list | role-list }
    [WITH GRANT OPTION];

    REVOKE { ALL PRIVILEGES | privilege-list }
    ON     object-list
    FROM   { PUBLIC | user-list | role-list }
    [CASCADE | RESTRICT];
:::

::: {.box .box-example}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDNINWEyIDIgMCAwIDAtMiAydjRtNi02aDEwYTIgMiAwIDAgMSAyIDJ2NE0zIDE1djRhMiAyIDAgMCAwIDIgMmg0bTEwLTZ2NGEyIDIgMCAwIDEtMiAyaC00IiAvPjwvc3ZnPg==)
مثال --- الأدوار Roles
:::

إنشاء دور [friendRole]{.term}، منحه صلاحيات كاملة على جدول، ثم سحب
صلاحية [INSERT]{.term} منه، ثم منحه لمستخدم:
:::

::: code-box
::: code-title
مثال DCL كاملSQL
:::

    CREATE ROLE friendRole;
    GRANT ALL ON mytable TO friendRole;

    REVOKE INSERT ON mytable FROM friendRole;

    // assume there is a user named 'demo' who can connect to the
    // database through localhost

    GRANT friendRole TO 'demo'@'localhost';

    REVOKE friendRole FROM 'demo'@'localhost';
:::

وفيما يلي سلسلة أمثلة توضّح كيف تنتشر الصلاحيات بين المستخدمين عبر [WITH
GRANT OPTION]{.term}:

::: diagram-card
#### الخطوة 1 --- منح أولي من مسؤول قاعدة البيانات

::: {.code-box style="margin:0 0 16px;"}
::: code-title
الأمرSQL
:::

    GRANT SELECT, INSERT, UPDATE ON Student TO U1, U2, U3 WITH GRANT OPTION;
:::

::: tree-wrap
::: tree
-   ::: {.node .node-root}
    DBA
    :::

    -   ::: {.node .node-solid}
        U1[SELECT Student]{.small}
        :::

    -   ::: {.node .node-solid}
        U2[SELECT Student]{.small}
        :::

    -   ::: {.node .node-solid}
        U3[SELECT Student]{.small}
        :::
:::
:::
:::

::: diagram-card
#### الخطوة 2 --- U1 وU2 وU3 يمنحون صلاحيات لمستخدمين آخرين

::: {.code-box style="margin:0 0 16px;"}
::: code-title
الأوامرSQL
:::

    GRANT SELECT, INSERT, UPDATE ON Student TO U21, U22;
    GRANT SELECT, INSERT, UPDATE ON Student TO U22 WITH GRANT OPTION;
    GRANT SELECT, INSERT, UPDATE ON Student TO U23, U24;
:::

::: tree-wrap
::: tree
-   ::: {.node .node-root}
    DBA
    :::

    -   ::: {.node .node-solid}
        U1[SELECT Student]{.small}
        :::

        -   ::: {.node .node-dashed}
            U21[SELECT Student]{.small}
            :::

        -   ::: {.node .node-solid}
            U22[SELECT Student]{.small}
            :::

            ::: node-annot
            مُنحت أيضاً من U2 مع WITH GRANT OPTION
            :::

    -   ::: {.node .node-solid}
        U2[SELECT Student]{.small}
        :::

    -   ::: {.node .node-solid}
        U3[SELECT Student]{.small}
        :::

        -   ::: {.node .node-dashed}
            U23[SELECT Student]{.small}
            :::

        -   ::: {.node .node-dashed}
            U24[SELECT Student]{.small}
            :::
:::
:::

::: tree-legend
إطار متصل = مُنحت مع WITH GRANT OPTION (يمكن تمريرها لغيره) إطار متقطّع =
مُنحت بدون خيار المنح
:::
:::

::: diagram-card
#### الخطوة 3 --- U22 يمنح صلاحية لمستخدم جديد

::: {.code-box style="margin:0 0 16px;"}
::: code-title
الأمرSQL
:::

    GRANT SELECT, INSERT, UPDATE ON Student TO U31;
:::

::: tree-wrap
::: tree
-   ::: {.node .node-root}
    DBA
    :::

    -   ::: {.node .node-solid}
        U1[SELECT Student]{.small}
        :::

        -   ::: {.node .node-dashed}
            U21[SELECT Student]{.small}
            :::

        -   ::: {.node .node-solid}
            U22[SELECT Student]{.small}
            :::

            -   ::: {.node .node-dashed}
                U31[SELECT Student]{.small}
                :::

    -   ::: {.node .node-solid}
        U2[SELECT Student]{.small}
        :::

    -   ::: {.node .node-solid}
        U3[SELECT Student]{.small}
        :::

        -   ::: {.node .node-dashed}
            U23[SELECT Student]{.small}
            :::

        -   ::: {.node .node-dashed}
            U24[SELECT Student]{.small}
            :::
:::
:::
:::
:::
:::

::: {#sec-10 .section .content-section data-title="مستوى التطبيق" icon="app"}
::: sec-head
::: sec-num
10
:::

<div>

## مستوى التطبيق

[Application Level]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
-   دمج الجوانب الأمنية عند إنشاء التطبيقات/البرامج.
-   الحماية من هجمات [SQL Injection]{.term}.
-   تطبيق عمليات تحقق دقيقة من صحة المدخلات.
-   استخدام [Strong Typing]{.term} في التطبيقات يساعد على منع أخطاء
    الأنواع [type errors]{.term}.
-   اكتشاف جميع الأخطاء ومعالجتها بشكل صحيح.
-   استخدام قنوات آمنة مثل [SSH]{.term} أو [VPN]{.term}.
-   تشفير البيانات.
:::
:::

::: {#sec-11 .section .content-section data-title="مستوى نظام التشغيل" icon="os"}
::: sec-head
::: sec-num
11
:::

<div>

## مستوى نظام التشغيل

[Operating System Level]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
-   تثبيت وإعداد برامج مكافحة الفيروسات وجدران الحماية.
-   عدم استخدام [Wizard]{.term} عند تثبيت البرامج.
-   يؤدي النقر على معالجات تثبيت [SQL Server]{.term} تلقائياً إلى إنشاء
    مستخدم بدون كلمة مرور (مستخدم ذو صلاحيات كاملة).
-   تشغيل أقل عدد ممكن من البرامج؛ كلما زاد عدد البرامج التي تشغّلها،
    زادت احتمالية تعرّضك للهجوم.
-   إغلاق جميع المنافذ غير الضرورية.

::: {.box .box-warning}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMC4yOSAzLjg2IDEuODIgMThhMiAyIDAgMCAwIDEuNzEgM2gxNi45NGEyIDIgMCAwIDAgMS43MS0zTDEzLjcxIDMuODZhMiAyIDAgMCAwLTMuNDIgMHoiIC8+PGxpbmUgeDE9IjEyIiB5MT0iOSIgeDI9IjEyIiB5Mj0iMTMiPjwvbGluZT48Y2lyY2xlIGN4PSIxMiIgY3k9IjE3IiByPSIuNCI+PC9jaXJjbGU+PC9zdmc+)
تحذير
:::

معالجات التثبيت السريعة (Wizards) قد تُنشئ حسابات إدارية دون كلمة مرور
دون علم المستخدم --- تحقق دائماً من الإعداد اليدوي الآمن.
:::
:::
:::

::: {#sec-12 .section .content-section data-title="مستوى الشبكة والاتصال" icon="net"}
::: sec-head
::: sec-num
12
:::

<div>

## مستوى الشبكة والاتصال

[Network & Communication Level]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
-   افصل خادم قاعدة البيانات عن خادم الويب.
-   اقتصر الاتصالات بخادم قاعدة البيانات على المصادر الموثوقة فقط، مثل
    خادم ويب موثوق؛ يمكن القيام بذلك عن طريق تحديد عناوين [IP]{.term} أو
    عناوين [MAC]{.term}.
-   اسمح فقط للتطبيق المُستضاف على خادم التطبيقات (خادم الويب) الموثوق
    بالاتصال بقاعدة البيانات --- لا تسمح للجميع (الإنترنت) بالاتصال
    بخادم قاعدة البيانات مباشرة.
-   عدم استخدام منفذ افتراضي.
-   استخدام خادم منفصل للمصادقة.
-   إعداد جدران الحماية.

::: diagram-card
#### مبدأ الفصل بين الطبقات

::: flow
::: {.flow-step .danger}
✘ الإنترنت / أي مستخدم غير موثوق
:::

::: flow-arrow
↓ ممنوع الاتصال المباشر
:::

::: {.flow-step .accent}
خادم التطبيقات (خادم الويب) الموثوق
:::

::: flow-arrow
↓ اتصال مقيّد عبر IP/MAC
:::

::: {.flow-step .success}
✔ خادم قاعدة البيانات
:::
:::
:::
:::
:::

::: {#sec-13 .section .content-section data-title="المستوى المادي" icon="physical"}
::: sec-head
::: sec-num
13
:::

<div>

## المستوى المادي

[Physical Level]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
-   الحرص دائماً على تأمين كل ما قد يؤثر على قاعدة البيانات.
-   تطبيق إجراءات أمنية للمبنى نفسه.
-   وضع خطة نسخ احتياطي فعّالة.
:::
:::

::: {#sec-14 .section .content-section data-title="المستوى البشري" icon="human"}
::: sec-head
::: sec-num
14
:::

<div>

## المستوى البشري

[Human Level]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
-   منح الصلاحيات فقط للمستخدمين المناسبين.
-   عدم نشر كلمات المرور.
-   التوعية والتدريب: التدريب على عمليات الاحتيال المتعلقة بكلمات
    المرور، والفيروسات، وكيفية التعامل مع جهاز الكمبيوتر.
-   تسجيل الخروج من جهاز الكمبيوتر عند عدم استخدامه.
-   شرح سياسات عدم الالتزام بالقواعد، وتطبيقها بصرامة.
:::
:::

::: {#sec-15 .section .content-section data-title="SQL Injection" icon="injection"}
::: sec-head
::: sec-num
15
:::

<div>

## SQL Injection

[حقن استعلامات SQL]{.en-tag}

</div>
:::

::: {.sec-body .searchable}
::: {.box .box-definition}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjkiPjwvY2lyY2xlPjxsaW5lIHgxPSIxMiIgeTE9IjgiIHgyPSIxMiIgeTI9IjEyIj48L2xpbmU+PGNpcmNsZSBjeD0iMTIiIGN5PSIxNiIgcj0iLjMiPjwvY2lyY2xlPjwvc3ZnPg==)
تعريف
:::

[SQL Injection]{.term} ثغرة أمنية في تطبيقات الويب، تسمح للمهاجم بالتدخل
في استعلامات التطبيق لقاعدة بياناته. وهذا يُتيح للمهاجم الاطلاع على
بيانات لا يمكنه الوصول إليها عادةً، كبيانات المستخدمين الآخرين أو أي
بيانات أخرى يمكن للتطبيق الوصول إليها.

في كثير من الحالات، يستطيع المهاجم تعديل هذه البيانات أو حذفها، مما يؤدي
إلى تغييرات دائمة في محتوى التطبيق أو سلوكه. في بعض الحالات، يمكن
للمهاجم تصعيد هجوم حقن SQL لاختراق الخادم الأساسي، كما يمكنه تنفيذ هجمات
**حجب الخدمة**.
:::

تحدث معظم ثغرات حقن SQL ضمن شرط [WHERE]{.term} في استعلام
[SELECT]{.term}. مع ذلك، يمكن أن تحدث ثغرات حقن SQL في أي مكان ضمن
الاستعلام، وفي أنواع استعلامات مختلفة، ومن المواقع الشائعة الأخرى:

-   في عبارات [UPDATE]{.term}، ضمن القيم المحدَّثة أو شرط [WHERE]{.term}.
-   في عبارات [INSERT]{.term}، ضمن القيم المُدرجة.
-   في عبارات [SELECT]{.term}، ضمن اسم الجدول أو العمود.
-   في عبارات [SELECT]{.term}، ضمن شرط [ORDER BY]{.term}.

::: {.box .box-example}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDNINWEyIDIgMCAwIDAtMiAydjRtNi02aDEwYTIgMiAwIDAgMSAyIDJ2NE0zIDE1djRhMiAyIDAgMCAwIDIgMmg0bTEwLTZ2NGEyIDIgMCAwIDEtMiAyaC00IiAvPjwvc3ZnPg==)
مثال محلول
:::

عند إدخال المستخدم لرقم حساب طبيعي، يعمل الاستعلام كما هو متوقّع:
:::

::: code-box
::: code-title
استعلام PHP/SQL الأساسيSQL
:::

    res = select CBalance from Balances where Acct='$acct'
:::

::: diagram-card
#### مثال: إدخال طبيعي مقابل إدخال مهاجم

::: flow-branch
::: flow-col
::: branch-label
إدخال المستخدم العادي
:::

::: flow-step
Enter your account number: [3215]{.term style="font-size:11px"}
:::

::: flow-arrow
↓
:::

::: {.flow-step .success style="font-size:12px; direction:ltr;"}
select CBalance from Balances where Acct=\'3215\'
:::
:::

::: flow-col
::: branch-label
إدخال المهاجم
:::

::: flow-step
Enter your account number: [9999\'%20or%20\'1\'=\'1]{.term
style="font-size:10.5px"}
:::

::: flow-arrow
↓
:::

::: {.flow-step .danger style="font-size:11.5px; direction:ltr;"}
select CBalance from Balances where Acct=\'9999\' or \'1\'=\'1\'
:::
:::
:::
:::

::: {.box .box-warning}
::: box-head
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMC4yOSAzLjg2IDEuODIgMThhMiAyIDAgMCAwIDEuNzEgM2gxNi45NGEyIDIgMCAwIDAgMS43MS0zTDEzLjcxIDMuODZhMiAyIDAgMCAwLTMuNDIgMHoiIC8+PGxpbmUgeDE9IjEyIiB5MT0iOSIgeDI9IjEyIiB5Mj0iMTMiPjwvbGluZT48Y2lyY2xlIGN4PSIxMiIgY3k9IjE3IiByPSIuNCI+PC9jaXJjbGU+PC9zdmc+)
تحذير
:::

الشرط [\'1\'=\'1\']{.term style="font-size:12px"} صحيح دائماً، مما يجعل
الاستعلام يُعيد جميع السجلات في الجدول بدلاً من سجل حساب واحد فقط --- وهذا
يكشف بيانات لا يُفترض أن يصل إليها المستخدم.
:::

**كيف تمنع حقن SQL؟**

::: kw-grid
::: kw-card
##### التحقق من صحة المدخلات

Input Validation
:::

::: kw-card
##### العبارات المجهّزة

[Prepared Statements]{.term style="font-size:11px"}
:::

::: kw-card
##### الإجراءات المخزَّنة

[Stored Procedures]{.term style="font-size:11px"}
:::

::: kw-card
##### منع الأحرف الخاصة

Block Special Characters
:::
:::
:::
:::

::: {#quiz .section .content-section data-title="اختبر نفسك — 15 سؤالاً" icon="quiz" style="background:var(--bg-elevated);"}
::: sec-head
::: sec-num
✓
:::

<div>

## اختبر نفسك

[Interactive Quiz · 15 Questions]{.en-tag}

</div>
:::

::: {.sec-body .searchable style="max-width:780px;"}
أجب عن الأسئلة التالية المستخرجة من محتوى المحاضرة. لا يمكنك الانتقال
إلى السؤال التالي قبل اختيار إجابة.

::: {#quizApp}
:::
:::
:::

أمن المعلومات --- المحاضرة التاسعة · DB Security · د. الرا علي · محتوى
تعليمي تفاعلي
:::
