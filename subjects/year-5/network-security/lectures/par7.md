::: {#progressBar}
:::

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPjxsaW5lIHgxPSI0IiB5MT0iNyIgeDI9IjIwIiB5Mj0iNyI+PC9saW5lPjxsaW5lIHgxPSI0IiB5MT0iMTIiIHgyPSIyMCIgeTI9IjEyIj48L2xpbmU+PGxpbmUgeDE9IjQiIHkxPSIxNyIgeDI9IjE0IiB5Mj0iMTciPjwvbGluZT48L3N2Zz4=)
الفهرس

::: {#overlay .overlay}
:::

×

فهرس المحاضرة

أمن شبكات الاستشعار اللاسلكية

#### البداية

[١ · المقدمة وبنية الشبكة](#ch1){.toc-link} [٢ · WSN مقابل شبكات
Ad-Hoc](#ch2){.toc-link} [٣ · تصنيف شبكات الاستشعار](#ch3){.toc-link}

#### أساسيات الأمن

[٤ · الحاجة إلى الأمن](#ch4){.toc-link} [٥ · المتطلبات
الأمنية](#ch5){.toc-link} [٦ · الإجراءات الأمنية القابلة
للتطبيق](#ch6){.toc-link} [٧ · معوقات الأمن](#ch7){.toc-link}

#### الاعتداءات الأمنية

[٨ · مدخل ومصادر الاعتداء](#ch8){.toc-link} [الطبقة
الفيزيائية](#ch8-3){.toc-link} [طبقة ربط البيانات](#ch8-4){.toc-link}
[طبقة الشبكة](#ch8-5){.toc-link} [طبقة التطبيقات](#ch8-6){.toc-link}
[طبقة النقل](#ch8-7){.toc-link} [اعتداءات على البيانات
المنقولة](#ch8-8){.toc-link} [اعتداءات فيزيائية على
العقد](#ch8-9){.toc-link}

#### الحماية

[التشفير وإدارة المفاتيح](#ch9-1){.toc-link} [بروتوكولات طبقة
Data-Link](#ch9-2){.toc-link} [تجميع البيانات الآمن](#ch9-3){.toc-link}
[تقسيم البيانات](#ch9-4){.toc-link} [الحماية من حجب
الخدمة](#ch9-5){.toc-link} [التوجيه الآمن و CHEMAS](#ch9-6){.toc-link}
[إخفاء هوية المرسل](#ch9-7){.toc-link}

#### الختام

[١٠ · كشف الاختراقات الأمنية](#ch10){.toc-link} [١١ ·
الخاتمة](#ch11){.toc-link}

::: hero
![](data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaGVyby1tZXNoIiB2aWV3Ym94PSIwIDAgMTAwMCA0MDAiIHByZXNlcnZlYXNwZWN0cmF0aW89InhNaWRZTWlkIHNsaWNlIj4KICA8ZyBzdHJva2U9IiMzQTRBNzIiIHN0cm9rZS13aWR0aD0iMSI+CiAgICA8bGluZSB4MT0iMTIwIiB5MT0iODAiIHgyPSIzMDAiIHkyPSIxNTAiPjwvbGluZT4KICAgIDxsaW5lIHgxPSIzMDAiIHkxPSIxNTAiIHgyPSIyMjAiIHkyPSIyODAiPjwvbGluZT4KICAgIDxsaW5lIHgxPSIzMDAiIHkxPSIxNTAiIHgyPSI0ODAiIHkyPSIxMTAiPjwvbGluZT4KICAgIDxsaW5lIHgxPSI0ODAiIHkxPSIxMTAiIHgyPSI2MjAiIHkyPSIyMDAiPjwvbGluZT4KICAgIDxsaW5lIHgxPSIyMjAiIHkxPSIyODAiIHgyPSI0MjAiIHkyPSIzMjAiPjwvbGluZT4KICAgIDxsaW5lIHgxPSI0MjAiIHkxPSIzMjAiIHgyPSI2MjAiIHkyPSIyMDAiPjwvbGluZT4KICAgIDxsaW5lIHgxPSI2MjAiIHkxPSIyMDAiIHgyPSI4MDAiIHkyPSIxNDAiPjwvbGluZT4KICAgIDxsaW5lIHgxPSI4MDAiIHkxPSIxNDAiIHgyPSI5MDAiIHkyPSIyNjAiPjwvbGluZT4KICAgIDxsaW5lIHgxPSI0ODAiIHkxPSIxMTAiIHgyPSI3MDAiIHkyPSI2MCI+PC9saW5lPgogICAgPGxpbmUgeDE9IjcwMCIgeTE9IjYwIiB4Mj0iODAwIiB5Mj0iMTQwIj48L2xpbmU+CiAgICA8bGluZSB4MT0iMTUwIiB5MT0iMjMwIiB4Mj0iMjIwIiB5Mj0iMjgwIj48L2xpbmU+CiAgPC9nPgogIDxnIGZpbGw9IiM4RkUwRDMiPgogICAgPGNpcmNsZSBjeD0iMTIwIiBjeT0iODAiIHI9IjQiPjwvY2lyY2xlPgogICAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMTUwIiByPSI1Ij48YW5pbWF0ZSBhdHRyaWJ1dGVuYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MC4zOzEiIGR1cj0iM3MiIHJlcGVhdGNvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PC9jaXJjbGU+CiAgICA8Y2lyY2xlIGN4PSIyMjAiIGN5PSIyODAiIHI9IjQiPjwvY2lyY2xlPgogICAgPGNpcmNsZSBjeD0iNDgwIiBjeT0iMTEwIiByPSI1Ij48YW5pbWF0ZSBhdHRyaWJ1dGVuYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuNDsxOzAuNCIgZHVyPSI0cyIgcmVwZWF0Y291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48L2NpcmNsZT4KICAgIDxjaXJjbGUgY3g9IjYyMCIgY3k9IjIwMCIgcj0iNiI+PGFuaW1hdGUgYXR0cmlidXRlbmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAuMzU7MSIgZHVyPSIyLjRzIiByZXBlYXRjb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvY2lyY2xlPgogICAgPGNpcmNsZSBjeD0iNDIwIiBjeT0iMzIwIiByPSI0Ij48L2NpcmNsZT4KICAgIDxjaXJjbGUgY3g9IjgwMCIgY3k9IjE0MCIgcj0iNSI+PGFuaW1hdGUgYXR0cmlidXRlbmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIwLjM7MTswLjMiIGR1cj0iMy42cyIgcmVwZWF0Y291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48L2NpcmNsZT4KICAgIDxjaXJjbGUgY3g9IjkwMCIgY3k9IjI2MCIgcj0iNCI+PC9jaXJjbGU+CiAgICA8Y2lyY2xlIGN4PSI3MDAiIGN5PSI2MCIgcj0iNCI+PC9jaXJjbGU+CiAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyMzAiIHI9IjMiPjwvY2lyY2xlPgogIDwvZz4KPC9zdmc+){.hero-mesh}

Computer Networks Security --- Lecture 7

# أمن شبكات الاستشعار اللاسلكية Security in Wireless Sensor Networks

دليل دراسي متكامل وبديل كامل عن المحاضرة الأصلية --- يشرح بنية شبكات
الاستشعار، أهم التهديدات الأمنية التي تواجهها طبقةً تلو الأخرى، وأبرز
آليات الحماية والتشفير والتوجيه الآمن المستخدمة لمواجهتها.

::: uni-strip
جامعة حمص **Homs University** كلية الهندسة المعلوماتية الدكتورة **Manal
Alomar** السنة الخامسة --- 2025/2026
:::
:::

::: {.content role="main"}
::: {#ch1 .section .chapter}
Introduction

::: chapter-head
::: chapter-num
١
:::

## المقدمة وبنية شبكات الاستشعار اللاسلكية
:::

::: chapter-rule
:::

قبل الحديث عن أمن شبكات الاستشعار اللاسلكية [Wireless Sensor Network
(WSN)]{.term}، لا بدّ من فهم بنيتها الأساسية وكيفية عملها، لأن كل ثغرة
أمنية سنتحدث عنها لاحقًا ترتبط بمكوّن معيّن من هذه البنية.

::: sub-head
[]{.dot}

### بنية شبكة الاستشعار اللاسلكية
:::

تتكوّن شبكة الاستشعار اللاسلكية من أربعة عناصر رئيسية تعمل معًا لنقل
المعلومات من البيئة المحيطة إلى المستخدم النهائي:

العنصر الأول هو **العقد** [Nodes]{.term}، وكل عقدة هي في حقيقتها جهاز
استشعار [Sensor]{.term} صغير قد يكون ثابتًا في مكانه أو متحركًا، ومهمته
التقاط معلومة من البيئة (حرارة، حركة، رطوبة\...) وإرسالها لاسلكيًا.
العنصر الثاني هو **المستخدم أو المدير** الذي يتحكم بالشبكة، وغالبًا ما
يكون جهازًا محمولًا. أما العنصر الثالث فهو واحدة أو أكثر من **محطات
القاعدة** [Base Stations]{.term} والتي تُعرف أيضًا باسم [Sinks]{.term} (أي
\"المصارف\")، ومهمتها الأساسية نقل البيانات المجمَّعة من العقد إلى المدير
أو المستخدم. هذه المحطة هي همزة الوصل بين العالم الداخلي المحدود الموارد
لشبكة الاستشعار، والعالم الخارجي الأوسع مثل شبكة الإنترنت.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNzYwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPCEtLSBzZW5zb3IgZmllbGQgLS0+CiAgICAgIDxlbGxpcHNlIGN4PSIxNTAiIGN5PSIxNTAiIHJ4PSIxMzAiIHJ5PSIxMDUiIGZpbGw9IiNFMkVGRUEiIHN0cm9rZT0iIzBFNzY2QiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjQgMyI+PC9lbGxpcHNlPgogICAgICA8dGV4dCB4PSIxNTAiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiMwRTc2NkIiIGZvbnQtd2VpZ2h0PSI3MDAiPtin2YTYrdmC2YQg2KfZhNmF2LHYp9mC2KggLyBTZW5zb3IgRmllbGQ8L3RleHQ+CiAgICAgIDxnIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+CiAgICAgICAgPGNpcmNsZSBjeD0iOTAiIGN5PSIxMTAiIHI9IjkiIGZpbGw9IiMwRTc2NkIiPjwvY2lyY2xlPgogICAgICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjkwIiByPSI5IiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT4KICAgICAgICA8Y2lyY2xlIGN4PSIyMTAiIGN5PSIxMTUiIHI9IjkiIGZpbGw9IiMwRTc2NkIiPjwvY2lyY2xlPgogICAgICAgIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjE3MCIgcj0iOSIgZmlsbD0iIzBFNzY2QiI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBjeD0iMTcwIiBjeT0iMTg1IiByPSI5IiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT4KICAgICAgICA8Y2lyY2xlIGN4PSIyMjAiIGN5PSIxNzAiIHI9IjkiIGZpbGw9IiMwRTc2NkIiPjwvY2lyY2xlPgogICAgICAgIDxjaXJjbGUgY3g9IjE0MCIgY3k9IjE0MCIgcj0iMTAiIGZpbGw9IiMwQTU4NTAiPjwvY2lyY2xlPgogICAgICA8L2c+CiAgICAgIDwhLS0gbGluZXMgdG8gYmFzZSBzdGF0aW9uIC0tPgogICAgICA8bGluZSB4MT0iOTAiIHkxPSIxMTAiIHgyPSIzMzAiIHkyPSIxNTAiIHN0cm9rZT0iI0E4NUMxQyIgc3Ryb2tlLXdpZHRoPSIxLjMiPjwvbGluZT4KICAgICAgPGxpbmUgeDE9IjE1MCIgeTE9IjkwIiB4Mj0iMzMwIiB5Mj0iMTUwIiBzdHJva2U9IiNBODVDMUMiIHN0cm9rZS13aWR0aD0iMS4zIj48L2xpbmU+CiAgICAgIDxsaW5lIHgxPSIyMTAiIHkxPSIxMTUiIHgyPSIzMzAiIHkyPSIxNTAiIHN0cm9rZT0iI0E4NUMxQyIgc3Ryb2tlLXdpZHRoPSIxLjMiPjwvbGluZT4KICAgICAgPGxpbmUgeDE9IjEwMCIgeTE9IjE3MCIgeDI9IjMzMCIgeTI9IjE1MCIgc3Ryb2tlPSIjQTg1QzFDIiBzdHJva2Utd2lkdGg9IjEuMyI+PC9saW5lPgogICAgICA8bGluZSB4MT0iMTcwIiB5MT0iMTg1IiB4Mj0iMzMwIiB5Mj0iMTUwIiBzdHJva2U9IiNBODVDMUMiIHN0cm9rZS13aWR0aD0iMS4zIj48L2xpbmU+CiAgICAgIDxsaW5lIHgxPSIyMjAiIHkxPSIxNzAiIHgyPSIzMzAiIHkyPSIxNTAiIHN0cm9rZT0iI0E4NUMxQyIgc3Ryb2tlLXdpZHRoPSIxLjMiPjwvbGluZT4KICAgICAgPCEtLSBiYXNlIHN0YXRpb24gLS0+CiAgICAgIDxyZWN0IHg9IjMzMCIgeT0iMTI1IiB3aWR0aD0iOTAiIGhlaWdodD0iNTAiIHJ4PSI4IiBmaWxsPSIjMTYxRTMzIiAvPgogICAgICA8dGV4dCB4PSIzNzUiIHk9IjE0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzhGRTBEMyIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkJhc2U8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjM3NSIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjOEZFMEQzIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+U3RhdGlvbjwvdGV4dD4KICAgICAgPCEtLSB0byBpbnRlcm5ldCBjbG91ZCAtLT4KICAgICAgPGxpbmUgeDE9IjQyMCIgeTE9IjE1MCIgeDI9IjUyMCIgeTI9IjE1MCIgc3Ryb2tlPSIjMkU2RjlFIiBzdHJva2Utd2lkdGg9IjIiPjwvbGluZT4KICAgICAgPGVsbGlwc2UgY3g9IjU5MCIgY3k9IjE1MCIgcng9IjcwIiByeT0iNDIiIGZpbGw9IiNFNUVGRjYiIHN0cm9rZT0iIzJFNkY5RSIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvZWxsaXBzZT4KICAgICAgPHRleHQgeD0iNTkwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMyRTZGOUUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+2LTYqNmD2Kkg2KfZhNil2YbYqtix2YbYqjwvdGV4dD4KICAgICAgPHRleHQgeD0iNTkwIiB5PSIxNjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzJFNkY5RSIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkludGVybmV0PC90ZXh0PgogICAgICA8IS0tIHRvIHVzZXIgLS0+CiAgICAgIDxsaW5lIHgxPSI2NjAiIHkxPSIxNTAiIHgyPSI3MTAiIHkyPSIxNTAiIHN0cm9rZT0iIzJFNkY5RSIgc3Ryb2tlLXdpZHRoPSIyIj48L2xpbmU+CiAgICAgIDxjaXJjbGUgY3g9IjcyNSIgY3k9IjE1MCIgcj0iMTgiIGZpbGw9IiNBODVDMUMiPjwvY2lyY2xlPgogICAgICA8dGV4dCB4PSI3MjUiIHk9IjE4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMS41IiBmaWxsPSIjQTg1QzFDIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiPtin2YTZhdiz2KrYrtiv2YU8L3RleHQ+CiAgICA8L3N2Zz4=)

تدفّق البيانات من عقد الاستشعار داخل الحقل المراقَب، عبورًا بمحطة القاعدة
**Base Station**، وصولًا إلى المستخدم عبر الإنترنت.
:::

يمكن أن تتّخذ الشبكة إحدى بنيتين شبكيتين واسعتين ستتكرر الإشارة إليهما
لاحقًا: **البنية المسطّحة** [Flat Network Topology]{.term} حيث تلعب كل
العقد دورًا متكافئًا في التوجيه عبر أسلوب [Multi-Hop Routing]{.term} إذ
تتعاون العقد فيما بينها لنقل البيانات إلى محطة القاعدة قفزة بعد أخرى، أو
**البنية الهرمية** [Hierarchical Network Topology]{.term} التي سنفصّلها
في الفصل القادم.

::: sub-head
[]{.dot}

### تطبيقات شبكات الاستشعار اللاسلكية
:::

لا تقتصر فائدة هذه الشبكات على جانب واحد، بل تمتد لتشمل مجالات حيوية
متعددة: **رصد البيئة والأحوال الجوية**، و**التطبيقات الطبية** التي تراقب
حالة المرضى عن بعد، وتطبيقات **الأمن** مثل اكتشاف المتطفلين ورصد عمليات
اقتحام المناطق المحظورة، وغيرها الكثير. وهذا التنوّع الواسع في
الاستخدامات هو بالضبط ما يجعل حماية هذه الشبكات أمرًا بالغ الأهمية؛ فكثير
من هذه التطبيقات تتعامل مع بيانات حسّاسة (عسكرية، طبية، أمنية) يمكن أن
يكون لتسرّبها أو تزويرها عواقب وخيمة.

::: summary-box
##### ◆ ملخص سريع

-   الشبكة تتكوّن من: عقد استشعار (ثابتة/متحركة) + مستخدم أو مدير + محطة
    قاعدة واحدة أو أكثر [Base Station / Sink]{.term}.
-   محطة القاعدة هي الجسر بين شبكة الاستشعار المحدودة الموارد والعالم
    الخارجي (الإنترنت، المستخدم).
-   البنية العامة للتوجيه إمّا مسطّحة [Flat]{.term} يتساوى فيها دور كل
    العقد، أو هرمية [Hierarchical]{.term} تُقسَّم فيها الشبكة إلى مجموعات.
-   التطبيقات تشمل: البيئة، الطقس، الطب، الأمن ومراقبة التسلل --- وهو ما
    يفسر حساسية البيانات المتداولة فيها.
:::
:::

::: {#ch2 .section .chapter}
WSN vs Ad-Hoc

::: chapter-head
::: chapter-num
٢
:::

## شبكات WSN وشبكات Ad-Hoc
:::

::: chapter-rule
:::

كثيرًا ما تُقارَن شبكات الاستشعار اللاسلكية بشبكات [Ad-Hoc]{.term} لأن
كلتيهما تنتميان إلى عائلة الشبكات اللاسلكية \"عديمة البنية التحتية\"، أي
التي لا تعتمد على أجهزة توجيه أو أبراج ثابتة مسبقًا. لكن رغم هذا التشابه
الجذري، توجد فروقات جوهرية تجعل لكل نوع خصوصياته الأمنية والتصميمية.

::: mini-head
أوجه التشابه
:::

كلا النوعين شبكات لاسلكية **عديمة البنية التحتية**، وبالتالي يتشاركان
جميع خصائص هذا النوع من الشبكات. كذلك، فإن أي عقدتين في الشبكتين
تستطيعان الاتصال ببعضهما بشكل مباشر أو غير مباشر شرط أن تقع إحداهما ضمن
مجال تغطية الأخرى. ومن ناحية التغذية، تعتمد عقد كلا النوعين على
**البطاريات** كمصدر للطاقة، وهو قيد جوهري يفسّر لاحقًا لماذا تكون هجمات
استنزاف الطاقة خطيرة جدًا. وأخيرًا، يستخدم النوعان في الاتصال اللاسلكي
**الأمواج الراديوية** التي تعاني من مشاكل تقليدية معروفة كالتداخل
[Interference]{.term} وضعف الإشارة بسبب العوائق المناخية.

::: mini-head
أوجه الاختلاف
:::

على الرغم من هذا التشابه، تتميز شبكات الاستشعار اللاسلكية بأنها تحوي
عادة **عددًا أكبر بكثير من العقد** مقارنة بشبكات Ad-Hoc التقليدية، كما
تتميز كل عقدة فيها بـ **محدودية شديدة في الطاقة**، وانخفاض ملحوظ في قوة
المعالجة والحساب. وهذا الفارق الأخير هو حجر الأساس لكل ما سيأتي في هذه
المحاضرة: فالحلول الأمنية المصمَّمة أصلًا لشبكات Ad-Hoc أو الشبكات السلكية
التقليدية غالبًا ما تكون ثقيلة جدًا بحيث لا تصلح للتطبيق المباشر على عقد
استشعار محدودة الإمكانيات.

::: table-wrap
  وجه المقارنة     Wireless Sensor Network         Ad-Hoc Network
  ---------------- ------------------------------- -------------------------------
  البنية التحتية   لا توجد (infrastructure-less)   لا توجد (infrastructure-less)
  وسيلة الاتصال    أمواج راديوية                   أمواج راديوية
  مصدر الطاقة      بطاريات محدودة جدًا              بطاريات (عادة أكبر سعة نسبيًا)
  عدد العقد        كبير جدًا (عشرات إلى آلاف)       أصغر نسبيًا
  قدرة المعالجة    منخفضة جدًا                      أعلى نسبيًا

  : مقارنة سريعة بين WSN و Ad-Hoc
:::

::: summary-box
##### ◆ ملخص سريع

-   التشابه: لا بنية تحتية، اتصال متعدد القفزات عند الحاجة، اعتماد على
    البطارية، استخدام الأمواج الراديوية.
-   الاختلاف الجوهري: عدد العقد الأكبر ومحدودية الطاقة والمعالجة في WSN
    --- وهو ما يوجّه كل تصميم أمني لاحق نحو الحلول \"الخفيفة\".
:::
:::

::: {#ch3 .section .chapter}
Classification

::: chapter-head
::: chapter-num
٣
:::

## تصنيف شبكات الاستشعار اللاسلكية
:::

::: chapter-rule
:::

يمكن تصنيف شبكات الاستشعار اللاسلكية وفق ثلاثة معايير مختلفة، وكل معيار
ينظر إلى الشبكة من زاوية مختلفة.

::: mini-head
١) التصنيف اعتمادًا على نوع عقد الاستشعار المستخدمة
:::

في **الشبكة المتجانسة** [Homogeneous]{.term} تمتلك جميع العقد نفس
الإمكانيات تمامًا، من حيث الطاقة وسعة الذاكرة وغيرها. أما في **الشبكة
المتباينة** [Heterogeneous]{.term} فيوجد عدد كبير من العقد ذات إمكانيات
عادية إلى جانب عدد قليل من العقد ذات إمكانيات عالية --- وهذه العقد
القوية غالبًا ما تتولى أدوارًا إدارية أو تجميعية أثقل.

::: mini-head
٢) التصنيف اعتمادًا على آلية النشر
:::

قد تكون العقد **موزَّعة بشكل منتظم** [Structured]{.term} أي يتم نشرها
يدويًا في مواقع محددة مسبقًا، أو **موزَّعة بشكل عشوائي** [Randomized]{.term}
كأن تُنشر عبر طائرات مروحية مثلًا فوق منطقة واسعة دون تخطيط دقيق لموقع كل
عقدة.

::: mini-head
٣) التصنيف حسب بنية الشبكة (Topology)
:::

هذا هو المعيار الأهم من الناحية الأمنية، وينقسم إلى نمطين:

**البنية الشبكية المسطّحة** [Flat Network Topology]{.term}: تلعب فيها كل
العقد دورًا متكافئًا في عملية التوجيه، حيث تتعاون فيما بينها لنقل البيانات
إلى محطة القاعدة عبر أسلوب [Multi-Hop Routing]{.term} --- أي أن الرسالة
تنتقل من عقدة إلى أخرى قفزة فقفزة حتى تصل إلى وجهتها.

**البنية الشبكية الهرمية** [Hierarchical Network Topology]{.term}: تُقسَّم
الشبكة فيها إلى عدد من العناقيد [Clusters]{.term}، ويتم انتخاب عقدة من
كل عنقود لتكون **رأس العنقود** [Cluster Head (CH)]{.term} --- ويتم هذا
الاختيار عادة بناءً على معيار معيّن، كأن تُختار العقدة ذات الطاقة الأكبر
مثلًا. تتولى هذه العقدة الرئيسية جمع البيانات من بقية عقد العنقود، ثم
تنقل هذه البيانات المجمَّعة إلى محطة القاعدة مباشرة.

::: diagram
::: two-col
<div>

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMzAwIDIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgIDx0ZXh0IHg9IjE1MCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMwRTc2NkIiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+RmxhdCBBcmNoaXRlY3R1cmU8L3RleHQ+CiAgICAgICAgICA8ZyBzdHJva2U9IiNCN0NGQzciIHN0cm9rZS13aWR0aD0iMS4zIiBmaWxsPSJub25lIj4KICAgICAgICAgICAgPGxpbmUgeDE9IjcwIiB5MT0iNjAiIHgyPSIxMjAiIHkyPSI1MCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTIwIiB5MT0iNTAiIHgyPSIxODAiIHkyPSI2MCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iNzAiIHkxPSI2MCIgeDI9IjkwIiB5Mj0iMTAwIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMjAiIHkxPSI1MCIgeDI9IjEzMCIgeTI9IjEwMCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTgwIiB5MT0iNjAiIHgyPSIyMDAiIHkyPSIxMDAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjkwIiB5MT0iMTAwIiB4Mj0iMTMwIiB5Mj0iMTAwIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMzAiIHkxPSIxMDAiIHgyPSIyMDAiIHkyPSIxMDAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjkwIiB5MT0iMTAwIiB4Mj0iMTEwIiB5Mj0iMTUwIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMzAiIHkxPSIxMDAiIHgyPSIxNTAiIHkyPSIxNTAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjIwMCIgeTE9IjEwMCIgeDI9IjE4MCIgeTI9IjE1MCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMTEwIiB5MT0iMTUwIiB4Mj0iMTUwIiB5Mj0iMTUwIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxNTAiIHkxPSIxNTAiIHgyPSIxODAiIHkyPSIxNTAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjE1MCIgeTE9IjE1MCIgeDI9IjE1MCIgeTI9IjE5MCI+PC9saW5lPgogICAgICAgICAgPC9nPgogICAgICAgICAgPGcgZmlsbD0iIzBFNzY2QiI+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjcwIiBjeT0iNjAiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjUwIiByPSI2Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIxODAiIGN5PSI2MCIgcj0iNiI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjkwIiBjeT0iMTAwIiByPSI2Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIxMzAiIGN5PSIxMDAiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEwMCIgcj0iNiI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjExMCIgY3k9IjE1MCIgcj0iNiI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSI2Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIxODAiIGN5PSIxNTAiIHI9IjYiPjwvY2lyY2xlPgogICAgICAgICAgPC9nPgogICAgICAgICAgPGVsbGlwc2UgY3g9IjE1MCIgY3k9IjIwNSIgcng9IjMwIiByeT0iMTMiIGZpbGw9IiMxNjFFMzMiPjwvZWxsaXBzZT4KICAgICAgICAgIDx0ZXh0IHg9IjE1MCIgeT0iMjA5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOEZFMEQzIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+U2luazwvdGV4dD4KICAgICAgICA8L3N2Zz4=)

جميع العقد متساوية الدور، والبيانات تمر عبر مسارات متعددة القفزات نحو
الـ **Sink**.

</div>

<div>

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMzAwIDIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgIDx0ZXh0IHg9IjE1MCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNBODVDMUMiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+Q2x1c3RlciBBcmNoaXRlY3R1cmU8L3RleHQ+CiAgICAgICAgICA8ZyBzdHJva2U9IiNFQUQzQjkiIHN0cm9rZS13aWR0aD0iMS4zIj4KICAgICAgICAgICAgPGxpbmUgeDE9IjYwIiB5MT0iNTUiIHgyPSI5MCIgeTI9IjgwIj48L2xpbmU+PGxpbmUgeDE9Ijc1IiB5MT0iOTAiIHgyPSI5MCIgeTI9IjgwIj48L2xpbmU+PGxpbmUgeDE9Ijk1IiB5MT0iNjAiIHgyPSI5MCIgeTI9IjgwIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIyMjAiIHkxPSI1NSIgeDI9IjIwNSIgeTI9IjgwIj48L2xpbmU+PGxpbmUgeDE9IjIzNSIgeTE9IjY1IiB4Mj0iMjA1IiB5Mj0iODAiPjwvbGluZT48bGluZSB4MT0iMjAwIiB5MT0iOTUiIHgyPSIyMDUiIHkyPSI4MCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iOTAiIHkxPSI4MCIgeDI9IjE1MCIgeTI9IjE0MCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iMjA1IiB5MT0iODAiIHgyPSIxNTAiIHkyPSIxNDAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEwMCIgeTE9IjE2MCIgeDI9IjEzMCIgeTI9IjE1MCI+PC9saW5lPjxsaW5lIHgxPSIxMzAiIHkxPSIxNTAiIHgyPSIxNTAiIHkyPSIxNDAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjE1MCIgeTE9IjE0MCIgeDI9IjE3MCIgeTI9IjE1MCI+PC9saW5lPjxsaW5lIHgxPSIxNzAiIHkxPSIxNTAiIHgyPSIxOTUiIHkyPSIxNjUiPjwvbGluZT4KICAgICAgICAgIDwvZz4KICAgICAgICAgIDxnIGZpbGw9IiNBODVDMUMiPgogICAgICAgICAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjU1IiByPSI1Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSI5NSIgY3k9IjYwIiByPSI1Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSI3NSIgY3k9IjkwIiByPSI1Ij48L2NpcmNsZT4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iMjIwIiBjeT0iNTUiIHI9IjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIzNSIgY3k9IjY1IiByPSI1Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIyMDAiIGN5PSI5NSIgcj0iNSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjE2MCIgcj0iNSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTk1IiBjeT0iMTY1IiByPSI1Ij48L2NpcmNsZT4KICAgICAgICAgIDwvZz4KICAgICAgICAgIDxjaXJjbGUgY3g9IjkwIiBjeT0iODAiIHI9IjciIGZpbGw9IiMxNjFFMzMiPjwvY2lyY2xlPgogICAgICAgICAgPGNpcmNsZSBjeD0iMjA1IiBjeT0iODAiIHI9IjciIGZpbGw9IiMxNjFFMzMiPjwvY2lyY2xlPgogICAgICAgICAgPGNpcmNsZSBjeD0iMTMwIiBjeT0iMTUwIiByPSI3IiBmaWxsPSIjMTYxRTMzIj48L2NpcmNsZT4KICAgICAgICAgIDxjaXJjbGUgY3g9IjE3MCIgY3k9IjE1MCIgcj0iNyIgZmlsbD0iIzE2MUUzMyI+PC9jaXJjbGU+CiAgICAgICAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxNDAiIHI9IjkiIGZpbGw9IiMxNjFFMzMiIHN0cm9rZT0iIzhGRTBEMyIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvY2lyY2xlPgogICAgICAgICAgPGVsbGlwc2UgY3g9IjE1MCIgY3k9IjIwNSIgcng9IjMwIiByeT0iMTMiIGZpbGw9IiMxNjFFMzMiPjwvZWxsaXBzZT4KICAgICAgICAgIDx0ZXh0IHg9IjE1MCIgeT0iMjA5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOEZFMEQzIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+U2luazwvdGV4dD4KICAgICAgICA8L3N2Zz4=)

العقد الداكنة تمثّل رؤوس العناقيد **Cluster Heads** التي تجمع بيانات
عنقودها قبل إرسالها للـ Sink.

</div>
:::
:::

::: summary-box
##### ◆ ملخص سريع

-   حسب نوع العقد: [Homogeneous]{.term} (متجانسة) أو
    [Heterogeneous]{.term} (متباينة).
-   حسب آلية النشر: [Structured]{.term} (منتظم) أو [Randomized]{.term}
    (عشوائي).
-   حسب البنية: [Flat]{.term} (كل العقد متساوية، توجيه متعدد القفزات) أو
    [Hierarchical]{.term} (عناقيد لها رؤوس [Cluster Head]{.term} تجمع
    البيانات وتُحيلها إلى محطة القاعدة).
:::
:::

::: {#ch4 .section .chapter}
Why Security Matters

::: chapter-head
::: chapter-num
٤
:::

## الحاجة إلى الأمن في شبكات الاستشعار اللاسلكية
:::

::: chapter-rule
:::

يُعدّ الأمن من أهم الأولويات الواجب توفّرها في تطبيقات شبكات الاستشعار
اللاسلكية، وذلك لسببين رئيسيين مترابطين.

السبب الأول هو **طبيعة وأهمية البيانات المنقولة** نفسها؛ فكما رأينا في
تطبيقات الشبكة (الطبية، الأمنية، العسكرية)، كثير من هذه البيانات حسّاس
للغاية ويستوجب الحفاظ على سرّيته وسلامته. والسبب الثاني هو **طبيعة
المناطق** التي قد تتواجد فيها هذه الشبكات؛ فكثيرًا ما تُنشر عقد الاستشعار
في مناطق نائية أو مكشوفة أو حتى معادية (كساحات المعارك أو الحدود)، حيث
يصعب حمايتها فيزيائيًا أو مراقبتها باستمرار، مما يجعلها عرضة للاعتقال أو
التخريب المباشر من قبل المعتدين.
:::

::: {#ch5 .section .chapter}
Security Requirements

::: chapter-head
::: chapter-num
٥
:::

## المتطلبات الأمنية لشبكات الحساسات اللاسلكية
:::

::: chapter-rule
:::

لكي تُعتبر شبكة استشعار \"آمنة\"، يجب أن تحقق مجموعة من الخصائص. هذه
الخصائص هي بمثابة \"قائمة تدقيق\" يمكن الرجوع إليها عند تقييم أي حل أمني
سيأتي ذكره لاحقًا في المحاضرة.

**سرّية البيانات** [Data Confidentiality]{.term} تعني إخفاء البيانات عن
أي طرف غير مصرَّح له بالاطلاع عليها، بحيث لا يستطيع أحد قراءة محتوى
الرسالة سوى المرسل والمستقبل الشرعيَّين. أما **موثوقية البيانات** [Data
Authenticity]{.term} فتشمل ضمان أن الرسائل المستلَمة قادمة فعلًا من مصادر
موثوقة، وليست منتحَلة الهوية. ويتصل بها مباشرة مفهوم **التصريح وتحديد
الصلاحيات** [Authorization]{.term} الذي يسمح فقط للعقد المصرَّح لها
بالمشاركة في أعمال الشبكة، و**ضبط الوصول** [Access Control]{.term} الذي
يمنع أي وصول غير مصرَّح به إلى موارد الشبكة.

ومن جهة أخرى، تضمن **صحة وسلامة البيانات** [Data Integrity]{.term} أن
البيانات لم تُخرَّب أو تُحوَّر أثناء انتقالها عبر الشبكة، بينما تضمن **حداثة
البيانات** [Data Freshness]{.term} أن جميع الرسائل المتبادَلة حديثة فعلًا،
ومنع إعادة إرسال بيانات قديمة كانت قد أُرسلت سابقًا (وهو ما يُعرف بهجوم
إعادة الإرسال الذي سنراه لاحقًا). أما **عدم الإنكار**
[Non-repudiation]{.term} فيعني ألّا يكون بمقدور أي عقدة إنكار أنها أرسلت
رسالة معيّنة بعد إرسالها فعليًا.

تحتاج الشبكة أيضًا إلى **استمرارية وصلابة** [Availability]{.term}، أي أن
تبقى الشبكة قادرة على أداء وظائفها حتى في مواجهة الاختراقات الأمنية، مع
سرعة في التغلب عليها واحتواء مضاعفاتها. وترتبط بمفهوم إدارة المفاتيح
خاصيتان مهمتان: **السرية المتقدمة** [Forward Secrecy]{.term} التي تعني
منع أي عقدة من قراءة أي رسالة بعد مغادرتها للشبكة (مثلًا عقدة انسحبت أو
اعتُقلت)، و**السرية الرجعية** [Backward Secrecy]{.term} التي تعني على
النقيض منع أي عقدة جديدة انضمت حديثًا من قراءة رسائل قديمة سبق تبادلها
قبل انضمامها.

وأخيرًا، هناك ثلاث خصائص تكميلية: **تفاوت مستويات الأمن** ويعني قدرة
الشبكة على تغيير درجة الحماية المطبَّقة بناءً على تغيّر الموارد المتاحة،
و**المراجعة** [Auditing]{.term} التي تلزم كل عقدة بالاحتفاظ بسجل لأهم
الأحداث داخل الشبكة كي يمكن الرجوع إليه عند حدوث خطأ لمعرفة ما جرى قبله،
و**التزامن الزمني** [Time Synchronization]{.term} الذي يُعدّ عاملًا حيويًا
في كثير من التطبيقات؛ فمن باب توفير الطاقة قد تحتاج عقدة معيّنة للدخول في
وضع النوم لفترة، كما تحتاج بعض التطبيقات لمعرفة زمن التأخير من طرف إلى
آخر [end-to-end delay]{.term} بين عقدتين.

::: callout
[ملاحظة مترابطة]{.callout-label}

لاحظ أن هذه المتطلبات ليست منفصلة تمامًا؛ فالـ Confidentiality تتحقق عادة
عبر التشفير، والـ Authenticity والـ Integrity غالبًا ما تتحققان معًا عبر
رمز التحقق من الرسالة [MAC]{.term} كما سنرى في بروتوكولات طبقة Data-Link
لاحقًا.
:::

::: summary-box
##### ◆ ملخص سريع --- المتطلبات الأمنية

-   [Confidentiality]{.term} --- إخفاء البيانات عن غير المصرَّح لهم.
-   [Authenticity]{.term} --- التأكد من مصدر الرسالة.
-   [Authorization]{.term} / [Access Control]{.term} --- منح صلاحية
    المشاركة والوصول فقط للعقد الشرعية.
-   [Integrity]{.term} --- عدم تحوير البيانات أثناء النقل.
-   [Freshness]{.term} --- منع إعادة استخدام رسائل قديمة.
-   [Non-repudiation]{.term} --- لا يمكن لعقدة إنكار إرسالها لرسالة.
-   [Availability]{.term} --- استمرارية عمل الشبكة رغم الاختراقات.
-   [Forward / Backward Secrecy]{.term} --- حماية الرسائل بعد مغادرة
    عقدة أو قبل انضمام أخرى.
-   تفاوت مستويات الأمن، [Auditing]{.term}، [Time
    Synchronization]{.term}.
:::
:::

::: {#ch6 .section .chapter}
Applicable Measures

::: chapter-head
::: chapter-num
٦
:::

## الإجراءات الأمنية القابلة للتطبيق في WSN
:::

::: chapter-rule
:::

لتحقيق المتطلبات السابقة عمليًا، تُصنَّف الإجراءات الأمنية إلى ثلاث فئات
بحسب توقيت تدخلها بالنسبة للهجوم.

**الإجراءات الوقائية** [Preventative Measures]{.term} هي التي تعمل قبل
وقوع أي اعتداء أصلًا، إذ تمنع الاختراقات الأمنية من الحدوث من الأساس، أو
على الأقل تجعل تنفيذها مهمة صعبة جدًا على المعتدي (كالتشفير مثلًا). أما
**الإجراءات الكاشفة** [Detection Measures]{.term} فتعمل أثناء أو بعد
وقوع الاعتداء مباشرة، وتمكّن الشبكة من اكتشاف الاختراقات عند حدوثها
والتمييز بينها وبين حالات الفشل العادية غير المقصودة (مثل عطل عشوائي في
عقدة). وأخيرًا، تأتي **الإجراءات التفاعلية** [Reactive Measures]{.term}
وهي ردّ الفعل بعد اكتشاف الاختراق، وقد تتفاوت من تجميد جميع أعمال الشبكة
مؤقتًا حتى يزول مصدر الخطر، إلى آليات أكثر تعقيدًا تعمل على تعطيل الجزء
المصاب فقط من الشبكة مع استمرارية عمل بقية الأجزاء بشكل طبيعي.

::: table-wrap
  الإجراء            التوقيت                       الوظيفة
  ------------------ ----------------------------- --------------------------------------------------
  **Preventative**   قبل وقوع الاعتداء             منع الاختراق أو جعله صعبًا جدًا
  **Detection**      أثناء / بعد الاعتداء مباشرة   كشف الاختراق والتمييز عن الأعطال العادية
  **Reactive**       بعد الاكتشاف                  احتواء الضرر: تجميد كامل أو عزل الجزء المصاب فقط

  : الإجراءات الأمنية الثلاثة: متى تعمل؟ وماذا تفعل؟
:::
:::

::: {#ch7 .section .chapter}
Obstacles

::: chapter-head
::: chapter-num
٧
:::

## معوقات الأمن في شبكات الاستشعار اللاسلكية
:::

::: chapter-rule
:::

قبل الدخول في تفاصيل الهجمات والحلول، من المفيد معرفة لماذا يُعدّ تأمين
هذه الشبكات تحديًا صعبًا أصلًا. توجد ثلاث فئات من المعوقات.

الفئة الأولى هي **حدود الحساسات (العقد)** نفسها: فهي محدودة الموارد من
حيث الطاقة، وسرعة المعالجة، وسعة التخزين، وقنوات الاتصال. الفئة الثانية
هي **حدود الشبكة**: إذ تتغيّر الجغرافيا بشكل دائم، ويرتفع عدد الحساسات
باستمرار، كما أن اعتماد الشبكة كليًا على الاتصالات اللاسلكية يجعلها تعاني
من ثغرات هذا النوع من الاتصال. أما الفئة الثالثة فهي **الحدود
الفيزيائية**: فالظروف المناخية القاسية تؤثر على أداء العقد، كما تفتقر
معظم العقد لوسائل حماية فيزيائية بسبب ارتفاع تكلفة تزويدها بها.

::: summary-box
##### ◆ ملخص سريع

-   حدود العقد: طاقة، معالجة، تخزين، اتصال --- كلها محدودة.
-   حدود الشبكة: جغرافيا متغيّرة، أعداد كبيرة من العقد، اعتماد كلي على
    اللاسلكي.
-   حدود فيزيائية: مناخ قاسٍ، ونقص وسائل الحماية بسبب التكلفة.
:::
:::

::: {#ch8 .section .chapter}
Security Attacks

::: chapter-head
::: chapter-num
٨
:::

## الاعتداءات الأمنية في شبكات الاستشعار اللاسلكية
:::

::: chapter-rule
:::

هذا هو محور المحاضرة الأساسي: فهم أنواع الهجمات التي تتعرّض لها شبكات
الاستشعار. سنبدأ بتصنيف المهاجمين أنفسهم، ثم بالزوايا المختلفة لتصنيف
الاعتداءات، وأخيرًا سنغوص في كل هجوم على حدة مرتَّبًا بحسب الطبقة التي
يستهدفها من طبقات البروتوكول.

::: sub-head
[]{.dot}

### تصنيف المعتدي على شبكات WSN
:::

يمكن تصنيف المعتدي بحسب هدفه من الاعتداء إلى أربعة أنماط. **الفضولي**
[Curious Attacker]{.term} هدفه الاستماع إلى الشبكة فقط دون تدخل أو
تخريب، أي أنه ينتهك السرّية دون أن يمسّ سلامة البيانات. **الملوِّث**
[Polluter]{.term} يهدف إلى تشويش الاتصالات وإفسادها. **المزيل**
[Eraser]{.term} يعمل على منع مجمِّع الشبكة (محطة القاعدة عادة) من تلقّي
البيانات أصلًا. أما **المستبدِل** [Replacer]{.term} فهو الأخطر من حيث
الأثر، إذ يستبدل البيانات الصحيحة بأخرى مزيَّفة.

::: pill-list
::: pill
**Curious** --- تنصّت واستماع فقط
:::

::: pill
**Polluter** --- تشويش الاتصالات
:::

::: pill
**Eraser** --- منع وصول البيانات للمجمِّع
:::

::: pill
**Replacer** --- استبدال بيانات صحيحة بمزيَّفة
:::
:::

::: sub-head
[]{.dot}

### زوايا تصنيف الاعتداءات الأمنية
:::

يمكن النظر إلى أي اعتداء من خمس زوايا مختلفة، وكل زاوية تجيب عن سؤال
مختلف:

**حسب نشاط الاعتداء وهدفه**: تُقسَّم الاعتداءات إلى **سلبية صامتة**
[Passive]{.term} تكتفي بالاطلاع على البيانات دون أي تخريب أو تحوير فيها
(مثل التنصّت)، و**فاعلة نشيطة** [Active]{.term} تقوم بتحوير وتخريب وتعديل
البيانات واستغلال عملية الاتصال ذاتها.

**حسب مصدر الاعتداء**: قد يكون الاعتداء **خارجيًا** [Outside
Attacks]{.term} صادرًا من كيانات لا تنتمي أصلًا للشبكة، أو **داخليًا**
[Inside Attacks]{.term} صادرًا من عقدة تنتمي فعلًا للشبكة لكنها اختُرقت أو
تحوّلت لعقدة خبيثة --- وهذا النوع الأخير أخطر عادة لأنه يتمتع بثقة الشبكة
له.

**حسب طبقة البروتوكول المستهدَفة**: وهي زاوية التصنيف الأشمل التي
سنعتمدها في بقية هذا الفصل، إذ يمكن لأي هجوم أن يستهدف واحدة من الطبقات
الخمس: [Physical Layer]{.term}، [Data Link Layer]{.term}، [Network
Layer]{.term}، [Transport Layer]{.term}، أو [Application Layer]{.term}.

**حسب طبيعة الاعتداء على البيانات المنقولة** نفسها (مثل المقاطعة أو
الاعتراض أو التعديل)، و**حسب طبيعة الاعتداء الفيزيائي أو المحسوس**
الموجَّه مباشرة ضد عقد الشبكة (كاعتقال عقدة فعليًا). سنتناول هاتين
الزاويتين بتفصيل أوسع في نهاية هذا الفصل.
:::

::: {#ch8-3 .section .chapter}
Layer-by-layer Attacks

::: chapter-head
::: chapter-num
٨.١
:::

## الاعتداءات المستهدِفة للطبقة الفيزيائية
:::

::: chapter-rule
:::

::: item-head
[Physical Layer]{.layer-tag .physical}

#### التشويش الإذاعي --- Radio Jamming
:::

التشويش الإذاعي هو أن يقوم المعتدي ببث إشارات راديوية [radio
signals]{.term} عالية الطاقة (إشارات تشويش) تُعطِّل الاتصالات بين العقد،
وذلك عن طريق خفض نسبة الإشارة إلى الضوضاء [Signal-to-Noise
Ratio]{.term}. بمعنى آخر، يُغرِق المهاجم الأثير بضوضاء قوية بحيث تضيع
الإشارة الحقيقية للعقد الشرعية داخل هذه الضوضاء.

لهذا الهجوم ثلاثة أنواع بحسب نمط البث: **التشويش المستمر** [Constant
Jamming]{.term} حيث يستمر البث دون توقف، و**التشويش العشوائي** [Random
Jamming]{.term} الذي يتبدّل فيه المهاجم نفسه بين حالتَي النوم والنشاط من
أجل توفير طاقته الخاصة، و**التشويش التفاعلي** [Reactive Jamming]{.term}
الذي لا يبدأ البث إلا عند ملاحظة وجود حركة بيانات فعلية على القناة ---
وهذا النوع أكثر كفاءة بالنسبة للمهاجم لأنه لا يهدر طاقته إن لم يكن هناك
اتصال يستحق التشويش.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNjQwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGcgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNTY1Rjc4Ij4KICAgICAgICA8dGV4dCB4PSI5MCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM3QzVDQkYiPkNvbnN0YW50PC90ZXh0PgogICAgICAgIDx0ZXh0IHg9IjMyMCIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM3QzVDQkYiPlJhbmRvbTwvdGV4dD4KICAgICAgICA8dGV4dCB4PSI1NTAiIHk9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjN0M1Q0JGIj5SZWFjdGl2ZTwvdGV4dD4KICAgICAgPC9nPgogICAgICA8IS0tIGNvbnN0YW50OiBzb2xpZCBiYXIgLS0+CiAgICAgIDxyZWN0IHg9IjMwIiB5PSI0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIyNiIgcng9IjQiIGZpbGw9IiM3QzVDQkYiIC8+CiAgICAgIDx0ZXh0IHg9IjkwIiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzg4OTBBNCIgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIj7YqNirINiq2LTZiNmK2LQg2K/Yp9im2YU8L3RleHQ+CiAgICAgIDwhLS0gcmFuZG9tOiBkYXNoZWQgc2VnbWVudHMgLS0+CiAgICAgIDxyZWN0IHg9IjI2MCIgeT0iNDAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyNiIgZmlsbD0iIzdDNUNCRiIgLz4KICAgICAgPHJlY3QgeD0iMjkyIiB5PSI0MCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjI2IiBmaWxsPSIjRUZFOUY5IiAvPgogICAgICA8cmVjdCB4PSIzMTYiIHk9IjQwIiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9IiM3QzVDQkYiIC8+CiAgICAgIDxyZWN0IHg9IjM1MiIgeT0iNDAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIyNiIgZmlsbD0iI0VGRTlGOSIgLz4KICAgICAgPHJlY3QgeD0iMzcyIiB5PSI0MCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjI2IiBmaWxsPSIjN0M1Q0JGIiAvPgogICAgICA8dGV4dCB4PSIzMjAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjODg5MEE0IiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiPtiq2KjYr9mK2YQg2YbZiNmFL9mG2LTYp9i3INmE2KrZiNmB2YrYsSDYp9mE2LfYp9mC2Kk8L3RleHQ+CiAgICAgIDwhLS0gcmVhY3RpdmU6IG1vc3RseSBpZGxlIHdpdGggYSBzcGlrZSBhbGlnbmVkIHRvIHRyYWZmaWMgLS0+CiAgICAgIDxyZWN0IHg9IjQ4MCIgeT0iNTIiIHdpZHRoPSIxNDAiIGhlaWdodD0iNCIgZmlsbD0iI0U4RTJEMiIgLz4KICAgICAgPHJlY3QgeD0iNTQwIiB5PSI0MCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI2IiBmaWxsPSIjN0M1Q0JGIiAvPgogICAgICA8dGV4dCB4PSI1NDAiIHk9IjM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjQTg1QzFDIj7Zitio2K/YoyDYudmG2K8g2LHYtdivINit2LHZg9ipINio2YrYp9mG2KfYqjwvdGV4dD4KICAgICAgPHRleHQgeD0iNTUwIiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzg4OTBBNCIgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIj7Ytdin2YXYqiDYrdiq2Ykg2YrZhNin2K3YuCDZhti02KfYt9mL2Kc8L3RleHQ+CiAgICA8L3N2Zz4=)

الأنماط الثلاثة لتشويش الترددات الراديوية **Radio Jamming**.
:::

::: mini-head
الحلول المطروحة لمواجهة التشويش
:::

الحل الأول المتوقَّع هو **تغيير قناة الإرسال بشكل معرَّف مسبقًا**، لكن هذا
الحل غير فعّال عمليًا، لأنه يتطلب زيادة في عمليات المعالجة داخل العقدة
نفسها، كما أن مجال الترددات المتاح في شبكات الاستشعار محدود أصلًا.

الحل الأكثر فاعلية هو تقنية **الإرسال ذو النطاق فائق الاتساع** [Ultra
Wide Band transmission (UWB)]{.term}، والتي تعتمد على إرسال نبضات قصيرة
جدًا (من رتبة النانو ثانية) عبر نطاق تردد واسع جدًا [wide frequency
band]{.term}. هذا الحل فعّال لسببين: فهو **صعب الاكتشاف** من قبل المهاجم
أصلًا، و**لا يحتاج إلى استهلاك كبير للطاقة** --- وهما بالضبط النقطتان
الأهم بالنسبة لعقدة استشعار محدودة الموارد.

::: summary-box
##### ◆ ملخص سريع --- الطبقة الفيزيائية

-   الهجوم الرئيسي: [Radio Jamming]{.term} بأنواعه Constant / Random /
    Reactive.
-   الحل الضعيف: تغيير القناة مسبقًا (غير فعّال، عبء معالجة، وترددات
    محدودة).
-   الحل الفعّال: [UWB]{.term} --- صعب الاكتشاف ومنخفض استهلاك الطاقة.
:::
:::

::: {#ch8-4 .section .chapter}
::: chapter-head
::: chapter-num
٨.٢
:::

## الاعتداءات المستهدِفة لطبقة ربط البيانات --- Data-Link Layer
:::

::: chapter-rule
:::

::: item-head
[Data-Link Layer]{.layer-tag .datalink}

#### التصادم واستنزاف الموارد --- Collision
:::

يحدث **التصادم** [Collision]{.term} عندما تحاول عقدتان الإرسال في الوقت
نفسه وعلى نفس التردد. عندما تتصادم حزم البيانات بهذه الطريقة، يحدث عليها
تغيّر يدفع العقد المرسِلة لإعادة الإرسال عبر قناة الاتصال بشكل مستمر، وهذا
بدوره يحرم بقية العقد من فرصة استخدام القناة --- أي أن الهجوم يستنزف
الموارد ويعطّل الاتصال في آنٍ واحد.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNDAwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGNpcmNsZSBjeD0iNzAiIGN5PSI1MCIgcj0iMTYiIGZpbGw9IiMyRTZGOUUiPjwvY2lyY2xlPjx0ZXh0IHg9IjcwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkE8L3RleHQ+CiAgICAgIDxjaXJjbGUgY3g9IjcwIiBjeT0iMTIwIiByPSIxNiIgZmlsbD0iIzJFNkY5RSI+PC9jaXJjbGU+PHRleHQgeD0iNzAiIHk9IjEyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkI8L3RleHQ+CiAgICAgIDxjaXJjbGUgY3g9IjMwMCIgY3k9Ijg1IiByPSIxOCIgZmlsbD0iIzE2MUUzMyI+PC9jaXJjbGU+PHRleHQgeD0iMzAwIiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzhGRTBEMyIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPlJ4PC90ZXh0PgogICAgICA8bGluZSB4MT0iODYiIHkxPSI1NSIgeDI9IjI4MiIgeTI9IjgyIiBzdHJva2U9IiNBODVDMUMiIHN0cm9rZS13aWR0aD0iMiI+PC9saW5lPgogICAgICA8bGluZSB4MT0iODYiIHkxPSIxMTUiIHgyPSIyODIiIHkyPSI4OCIgc3Ryb2tlPSIjQTg1QzFDIiBzdHJva2Utd2lkdGg9IjIiPjwvbGluZT4KICAgICAgPHRleHQgeD0iMjAwIiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0E4NUMxQyI+4pqhPC90ZXh0PgogICAgICA8dGV4dCB4PSIyMDAiIHk9IjExNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzg4OTBBNCIgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIj7Ypdix2LPYp9mEINmF2KrYstin2YXZhiDYudmE2Ykg2YbZgdizINin2YTYqtix2K/YryA9INiq2LXYp9iv2YU8L3RleHQ+CiAgICA8L3N2Zz4=)

عقدتان A و B ترسلان في نفس اللحظة نحو المستقبِل نفسه فتتصادم الحزمتان.
:::

::: item-head
[Data-Link Layer]{.layer-tag .datalink}

#### الاستجواب --- Interrogation
:::

يستغل هذا الاعتداء بروتوكول المصافحة [handshake]{.term} المستخدم في
تحقيق الاتصال بين العقد، والمعروف باسم [Request-To-Send / Clear-To-Send
(RTS/CTS)]{.term}. يقوم المهاجم بإرسال حزم طلب إرسال [RTS]{.term} بشكل
متكرر جدًا، مما يدفع العقدة الضحية إلى الاستمرار في إعادة إرسال رد جاهزية
الاستقبال [CTS]{.term} إلى الحد الذي يستنزف مواردها بالكامل.

::: callout
[توضيح --- الحد من هذا الاعتداء]{.callout-label}

يمكن الحد من هجمات هذه الطبقة بأن تقتصر العقدة على قبول الاتصال ضمن معدَّل
معرَفات [MAC-level]{.term} خاص بها تم إقراره مسبقًا، إضافة إلى استخدام
آليات قوية للتحقق من مصدر الرسالة في طبقة Data-Link أو استخدام
[Anti-replay protection]{.term}.
:::
:::

::: {#ch8-5 .section .chapter}
::: chapter-head
::: chapter-num
٨.٣
:::

## الاعتداءات المستهدِفة لطبقة الشبكة --- Network Layer
:::

::: chapter-rule
:::

طبقة الشبكة هي الأكثر استهدافًا من بين جميع الطبقات، لأن التوجيه هو قلب
عمل شبكة الاستشعار. سنستعرض هنا أهم تسعة هجمات تستهدف هذه الطبقة.

::: item-head
[Network Layer]{.layer-tag .network}

#### التوجيه الانتقائي --- Selective Forwarding
:::

عندما تصل رسالة إلى عقدة خبيثة، فإنها تقوم بـ\"فرز\" الرسائل: ترمي أهمّها
وتُمرِّر بعضها الآخر، وذلك لتتجنّب اشتباه العقد المجاورة بها (فلو رفضت تمرير
كل شيء لانكشف أمرها فورًا). يصبح الأمر أسوأ إذا كانت هذه العقدة الخبيثة
قريبة من محطة القاعدة [base station]{.term}، لأنه في هذه الحالة سيمر
عبرها معظم حركة مرور الشبكة أصلًا (كونها على مسار العودة الرئيسي)،
وبالتالي فإن شبكة الاستشعار بأكملها ستُعطي نتائج خاطئة أو نظرة مشوَّهة عن
البيئة المراقَبة.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNTYwIDEzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGxpbmUgeDE9IjQwIiB5MT0iNjUiIHgyPSI1MjAiIHkyPSI2NSIgc3Ryb2tlPSIjRENEM0JFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjMgMyI+PC9saW5lPgogICAgICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjY1IiByPSIxNCIgZmlsbD0iIzBFNzY2QiI+PC9jaXJjbGU+PHRleHQgeD0iNDAiIHk9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjZmZmIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+UzwvdGV4dD4KICAgICAgPGNpcmNsZSBjeD0iMTYwIiBjeT0iNjUiIHI9IjEyIiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT4KICAgICAgPGNpcmNsZSBjeD0iMjgwIiBjeT0iNjUiIHI9IjE1IiBmaWxsPSIjQTYzMzVBIj48L2NpcmNsZT48dGV4dCB4PSIyODAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjQTYzMzVBIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiPti52YLYr9ipINiu2KjZitir2Kk8L3RleHQ+CiAgICAgIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjY1IiByPSIxMiIgZmlsbD0iIzBFNzY2QiI+PC9jaXJjbGU+CiAgICAgIDxyZWN0IHg9IjQ4MCIgeT0iNTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIzMCIgcng9IjYiIGZpbGw9IiMxNjFFMzMiIC8+PHRleHQgeD0iNTEwIiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjOEZFMEQzIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+QlM8L3RleHQ+CiAgICAgIDxwYXRoIGQ9Ik0yOTUgNjUgTCA0MDAgNjUiIHN0cm9rZT0iIzBFNzY2QiIgc3Ryb2tlLXdpZHRoPSIyIiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93ZykiIC8+CiAgICAgIDxwYXRoIGQ9Ik0yNjUgNjUgTCAxNzUgNjUiIHN0cm9rZT0iI0E2MzM1QSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI0IDMiIC8+CiAgICAgIDx0ZXh0IHg9IjIyMCIgeT0iOTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iI0E2MzM1QSIgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIj7YqtmP2LPZgtmQ2Lcg2KjYudi2INin2YTYrdiy2YUg2KfZhNmC2KfYr9mF2Kkg4pyVPC90ZXh0PgogICAgICA8dGV4dCB4PSIzNDAiIHk9Ijk1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwLjUiIGZpbGw9IiMwRTc2NkIiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+2YjYqtmP2YXYsdmQ2ZHYsSDYqNi52LbZh9inINin2YTYotiu2LEg4pyTPC90ZXh0PgogICAgICA8ZGVmcz48bWFya2VyIGlkPSJhcnJvd2ciIG1hcmtlcndpZHRoPSI4IiBtYXJrZXJoZWlnaHQ9IjgiIHJlZng9IjYiIHJlZnk9IjMiIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAsMCBMNiwzIEwwLDYgeiIgZmlsbD0iIzBFNzY2QiIgLz48L21hcmtlcj48L2RlZnM+CiAgICA8L3N2Zz4=)

العقدة الخبيثة تُمرِّر بعض الحزم وتُسقط أخرى بانتقائية لتجنّب الاشتباه.
:::

الحلول المطروحة

**التوجيه المتعدد المسار** [Multi-path Routing]{.term} هو الحل الأول
المقترَح، لكنه ليس مثاليًا: فهو يزيد النفقات العامة للاتصالات بين العقد
بشكل كبير كلما زاد عدد المسارات المستخدَمة، ويفقد فعاليته إذا كانت العقدة
الخبيثة قريبة من محطة القاعدة (لأن كل المسارات تتقارب هناك)، بل ويكفي أن
يضع المهاجم عقدة خبيثة واحدة في كل مسار ليتمكن من تنفيذ الهجوم رغم تعدد
المسارات. الحل الثاني الأكثر تخصصًا هو تقنية [CHEMAS (Checkpoint-based
Multi-hop Acknowledgement Scheme)]{.term} والتي سنشرحها بالتفصيل لاحقًا
في فصل التوجيه الآمن.

::: item-head
[Network Layer]{.layer-tag .network}

#### اعتداء المُجمِّع --- Sinkhole Attack
:::

تقوم العقدة الخبيثة هنا بجذب عدد كبير من حركة المرور القادمة من الجيران
المحيطين بها، وذلك عن طريق الإعلان عن مسار ذي جودة عالية جدًا نحو محطة
القاعدة [base station]{.term} --- فتنخدع العقد المجاورة وتوجّه بياناتها
عبرها ظنًا أنه أفضل طريق ممكن. تُستخدَم هذه العقدة الجاذبة لاحقًا كنقطة
انطلاق لتنفيذ هجمات أخطر مثل هجوم الثقب الأسود وهجوم الثقب الدودي اللذين
سنراهما بعد قليل.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMzgwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGcgc3Ryb2tlPSIjRENEM0JFIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWRhc2hhcnJheT0iNCAzIj4KICAgICAgICA8bGluZSB4MT0iMTkwIiB5MT0iMTAwIiB4Mj0iNjAiIHkyPSI0MCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIxOTAiIHkxPSIxMDAiIHgyPSI2MCIgeTI9IjEwMCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIxOTAiIHkxPSIxMDAiIHgyPSI3MCIgeTI9IjE3MCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIxOTAiIHkxPSIxMDAiIHgyPSIyMDAiIHkyPSI0MCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIxOTAiIHkxPSIxMDAiIHgyPSIzMjAiIHkyPSI3MCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIxOTAiIHkxPSIxMDAiIHgyPSIzMTAiIHkyPSIxNjAiPjwvbGluZT4KICAgICAgPC9nPgogICAgICA8bGluZSB4MT0iMTkwIiB5MT0iMTAwIiB4Mj0iMTkwIiB5Mj0iMTgwIiBzdHJva2U9IiNBNjMzNUEiIHN0cm9rZS13aWR0aD0iMi40IiBzdHJva2UtZGFzaGFycmF5PSI1IDMiPjwvbGluZT4KICAgICAgPGcgZmlsbD0iIzBFNzY2QiI+CiAgICAgICAgPGNpcmNsZSBjeD0iNjAiIGN5PSI0MCIgcj0iOSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNjAiIGN5PSIxMDAiIHI9IjkiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjcwIiBjeT0iMTcwIiByPSI5Ij48L2NpcmNsZT4KICAgICAgICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSI0MCIgcj0iOSI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMzIwIiBjeT0iNzAiIHI9IjkiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjMxMCIgY3k9IjE2MCIgcj0iOSI+PC9jaXJjbGU+CiAgICAgIDwvZz4KICAgICAgPGNpcmNsZSBjeD0iMTkwIiBjeT0iMTAwIiByPSIxNCIgZmlsbD0iI0E2MzM1QSI+PC9jaXJjbGU+CiAgICAgIDxyZWN0IHg9IjE2MCIgeT0iMTg1IiB3aWR0aD0iNjAiIGhlaWdodD0iMjgiIHJ4PSI2IiBmaWxsPSIjMTYxRTMzIiAvPjx0ZXh0IHg9IjE5MCIgeT0iMjAzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOEZFMEQzIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+QlM8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjE5MCIgeT0iNzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iI0E2MzM1QSIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIj7YqtmP2LnZhNmGINmF2LPYp9ix2YvYpyAmcXVvdDvZhdmF2KrYp9iy2YvYpyZxdW90OyDZiNmH2YXZitmL2Kc8L3RleHQ+CiAgICA8L3N2Zz4=)

كل الجيران يوجِّهون بياناتهم عبر العقدة الخبيثة ظنًا منهم أنها أقرب طريق
موثوق إلى BS.
:::

::: item-head
[Network Layer]{.layer-tag .network}

#### طوفان حزم الترحيب --- Hello Flood Attack
:::

العديد من بروتوكولات الاكتشاف في شبكات [Ad-Hoc]{.term} ترسل حزم ترحيب
[Hello]{.term} بشكل تلقائي لاكتشاف العقد المجاورة عند إنشاء الشبكة.
يستغل المعتدي هذه الآلية باستخدام جهاز مزوَّد بهوائي إرسال قوي جدًا، ليرسل
من خلاله حزم ترحيب إلى جميع عقد الشبكة دفعة واحدة، بغض النظر عن مدى
قربها الفعلي منه. هذا يُوهم تلك العقد بأن جهاز المعتدي هو عقدة جوار شرعية
قريبة، فترسل إليه بياناتها ظنًا أنه سيقوم بتمريرها --- بينما هو في
الحقيقة إما بعيد جدًا عن الشبكة الفعلية أو يتجاهل تلك البيانات، مما يؤدي
إلى هدر طاقة العقدة المرسِلة وضياع بياناتها.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNDAwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iNDUiIHI9IjE2IiBmaWxsPSIjMTYxRTMzIj48L2NpcmNsZT48dGV4dCB4PSIyMDAiIHk9IjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjQTYzMzVBIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+WDwvdGV4dD4KICAgICAgPHRleHQgeD0iMjAwIiB5PSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iI0E2MzM1QSIgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIj7YudmC2K/YqSDYrtio2YrYq9ipINio2YfZiNin2KbZiiDZgtmI2Yo8L3RleHQ+CiAgICAgIDxnIHN0cm9rZT0iI0E2MzM1QSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1kYXNoYXJyYXk9IjMgMyI+CiAgICAgICAgPGxpbmUgeDE9IjIwMCIgeTE9IjQ1IiB4Mj0iNzAiIHkyPSIxMzAiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMjAwIiB5MT0iNDUiIHgyPSIxNDAiIHkyPSIxNTAiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMjAwIiB5MT0iNDUiIHgyPSIyMjAiIHkyPSIxNjAiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMjAwIiB5MT0iNDUiIHgyPSIzMDAiIHkyPSIxNDAiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMjAwIiB5MT0iNDUiIHgyPSIzNDAiIHkyPSI5MCI+PC9saW5lPgogICAgICA8L2c+CiAgICAgIDxnIGZpbGw9IiM4ODkwQTQiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIiBmb250LXNpemU9IjEwIj4KICAgICAgICA8Y2lyY2xlIGN4PSI3MCIgY3k9IjEzMCIgcj0iOSIgZmlsbD0iIzBFNzY2QiI+PC9jaXJjbGU+PHRleHQgeD0iNzAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzU2NUY3OCI+VjwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSIxNDAiIGN5PSIxNTAiIHI9IjkiIGZpbGw9IiMwRTc2NkIiPjwvY2lyY2xlPjx0ZXh0IHg9IjE0MCIgeT0iMTcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNTY1Rjc4Ij5WPC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjIyMCIgY3k9IjE2MCIgcj0iOSIgZmlsbD0iIzBFNzY2QiI+PC9jaXJjbGU+PHRleHQgeD0iMjIwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM1NjVGNzgiPlY8L3RleHQ+CiAgICAgICAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMTQwIiByPSI5IiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT48dGV4dCB4PSIzMDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzU2NUY3OCI+VjwvdGV4dD4KICAgICAgPC9nPgogICAgICA8Y2lyY2xlIGN4PSIzNDAiIGN5PSI5MCIgcj0iOSIgZmlsbD0iIzBFNzY2QiI+PC9jaXJjbGU+CiAgICAgIDx0ZXh0IHg9IjIwMCIgeT0iMjA1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwLjUiIGZpbGw9IiM4ODkwQTQiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+2KzZhdmK2Lkg2LnZgtivIFYg2KrYuNmGINij2YYgWCDYrNin2LHYqSDYtNix2LnZitipINmC2LHZitio2Kkg2YjYqtix2LPZhCDZhNmHINio2YrYp9mG2KfYqtmH2Kcg2YHZitmH2K/YsdmH2Kc8L3RleHQ+CiAgICA8L3N2Zz4=)

العقدة الخبيثة X تملك اتصالًا قويًا وترسل رسائل ترحيب لجميع عقد الشبكة V
دفعة واحدة.
:::
:::

::: {#ch8-5b .section .chapter}
::: item-head
[Network Layer]{.layer-tag .network}

#### اعتداء الثقب الأسود --- Black-hole Attack
:::

تستخدم شبكات الحساسات اللاسلكية أسلوب التوجيه متعدد القفزات [Multi-Hop
routing]{.term}، مما يعني أنها تفترض ضمنيًا أن جميع العقد المشاركة في
توجيه الرسائل تعمل بإخلاص على تمريرها. تقع العقدة الضحية فريسة للمعتدي
عندما يُقنعها بأنه يبعد عنها قفزة واحدة فقط [one hop away]{.term}، فتُمرِّر
إليه رسائلها معتقدة أنه أقصر طريق. وعند استلامه لهذه الرسائل، قد يرفض
المهاجم تمرير بعضها ويهملها كليًا، مُشكِّلًا بذلك \"ثقبًا أسود\" تختفي داخله
الرسائل تمامًا ولا تصل أبدًا إلى وجهتها.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMzgwIDI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGcgc3Ryb2tlPSIjRENEM0JFIiBzdHJva2Utd2lkdGg9IjEuMiI+CiAgICAgICAgPGxpbmUgeDE9IjE5MCIgeTE9IjEyMCIgeDI9IjcwIiB5Mj0iNjAiPjwvbGluZT48bGluZSB4MT0iNzAiIHkxPSI2MCIgeDI9IjQwIiB5Mj0iMzAiPjwvbGluZT48bGluZSB4MT0iNzAiIHkxPSI2MCIgeDI9IjMwIiB5Mj0iOTAiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMTkwIiB5MT0iMTIwIiB4Mj0iMzAwIiB5Mj0iNjAiPjwvbGluZT48bGluZSB4MT0iMzAwIiB5MT0iNjAiIHgyPSIzMzAiIHkyPSIzNSI+PC9saW5lPjxsaW5lIHgxPSIzMDAiIHkxPSI2MCIgeDI9IjM0MCIgeTI9Ijg1Ij48L2xpbmU+CiAgICAgICAgPGxpbmUgeDE9IjE5MCIgeTE9IjEyMCIgeDI9IjcwIiB5Mj0iMTgwIj48L2xpbmU+PGxpbmUgeDE9IjcwIiB5MT0iMTgwIiB4Mj0iMzUiIHkyPSIxNjAiPjwvbGluZT48bGluZSB4MT0iNzAiIHkxPSIxODAiIHgyPSI0NSIgeTI9IjIwNSI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIxOTAiIHkxPSIxMjAiIHgyPSIzMDAiIHkyPSIxODAiPjwvbGluZT48bGluZSB4MT0iMzAwIiB5MT0iMTgwIiB4Mj0iMzM1IiB5Mj0iMTYwIj48L2xpbmU+PGxpbmUgeDE9IjMwMCIgeTE9IjE4MCIgeDI9IjMyNSIgeTI9IjIwNSI+PC9saW5lPgogICAgICA8L2c+CiAgICAgIDxjaXJjbGUgY3g9IjE5MCIgY3k9IjEyMCIgcj0iMTUiIGZpbGw9IiMxNjFFMzMiPjwvY2lyY2xlPjx0ZXh0IHg9IjE5MCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjQTYzMzVBIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+WDwvdGV4dD4KICAgICAgPGcgZmlsbD0iIzBFNzY2QiI+CiAgICAgICAgPGNpcmNsZSBjeD0iNzAiIGN5PSI2MCIgcj0iNyI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNDAiIGN5PSIzMCIgcj0iNiI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMzAiIGN5PSI5MCIgcj0iNiI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iNjAiIHI9IjciPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjMzMCIgY3k9IjM1IiByPSI2Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIzNDAiIGN5PSI4NSIgcj0iNiI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBjeD0iNzAiIGN5PSIxODAiIHI9IjciPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjM1IiBjeT0iMTYwIiByPSI2Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSI0NSIgY3k9IjIwNSIgcj0iNiI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMTgwIiByPSI3Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIzMzUiIGN5PSIxNjAiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjMyNSIgY3k9IjIwNSIgcj0iNiI+PC9jaXJjbGU+CiAgICAgIDwvZz4KICAgICAgPHRleHQgeD0iMTkwIiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiNBNjMzNUEiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyIgZm9udC13ZWlnaHQ9IjcwMCI+JnF1b3Q72KvZgtioINij2LPZiNivJnF1b3Q7INmK2KjYqtmE2Lkg2KfZhNix2LPYp9im2YQ8L3RleHQ+CiAgICA8L3N2Zz4=)

العقدة الخبيثة X تتوسّط بين عناقيد الشبكة، وتُقنع الجميع بأنها على بُعد
قفزة واحدة، ثم تُسقط ما تستلمه.
:::

::: item-head
[Network Layer]{.layer-tag .network}

#### الثقب الدودي --- Wormhole Attack
:::

يقوم المعتدي بإنشاء **نفق افتراضي** [Virtual Tunnel]{.term} تُمرَّر من
خلاله الرسائل، ويمكن إيجاد هذا النفق من خلال عقدتين خبيثتين متواطئتين
متواجدتين في جزأين مختلفين من الشبكة. عندما تريد العقدة A الاتصال
بالعقدة B، ستختار تلقائيًا الطريق الأقصر الذي يحوي أقل عدد قفزات، وبما أن
النفق الوهمي يبدو كأقصر طريق، فإن A سترسل رسائلها إلى X1 فيستطيع المهاجم
التقاطها فورًا؛ والأمر ذاته يحدث مع B التي ستختار بدورها الطريق الأقصر
عبر X2 إذا أرادت الاتصال مع A.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNDgwIDE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGcgc3Ryb2tlPSIjRENEM0JFIiBzdHJva2Utd2lkdGg9IjEuMiI+CiAgICAgICAgPGxpbmUgeDE9IjYwIiB5MT0iMTQwIiB4Mj0iMTUwIiB5Mj0iMTA1Ij48L2xpbmU+PGxpbmUgeDE9IjYwIiB5MT0iNjAiIHgyPSIxNTAiIHkyPSIxMDUiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMzgwIiB5MT0iNjAiIHgyPSIzMzAiIHkyPSIxMDUiPjwvbGluZT48bGluZSB4MT0iMzgwIiB5MT0iNDAiIHgyPSIzMzAiIHkyPSIxMDUiPjwvbGluZT48bGluZSB4MT0iNDEwIiB5MT0iODAiIHgyPSIzMzAiIHkyPSIxMDUiPjwvbGluZT4KICAgICAgPC9nPgogICAgICA8bGluZSB4MT0iMTUwIiB5MT0iMTA1IiB4Mj0iMzMwIiB5Mj0iMTA1IiBzdHJva2U9IiNBNjMzNUEiIHN0cm9rZS13aWR0aD0iMi40IiBzdHJva2UtZGFzaGFycmF5PSI2IDQiPjwvbGluZT4KICAgICAgPHRleHQgeD0iMjQwIiB5PSI5NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMC41IiBmaWxsPSIjQTYzMzVBIiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiPtmG2YHZgiDYrtmB2Yog2LnYp9mE2Yog2KfZhNiz2LHYudipPC90ZXh0PgogICAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjE0MCIgcj0iMTIiIGZpbGw9IiMwRTc2NkIiPjwvY2lyY2xlPjx0ZXh0IHg9IjYwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIj5BPC90ZXh0PgogICAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSI4IiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT4KICAgICAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTA1IiByPSIxNCIgZmlsbD0iIzE2MUUzMyI+PC9jaXJjbGU+PHRleHQgeD0iMTUwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNBNjMzNUEiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIj5YMTwvdGV4dD4KICAgICAgPGNpcmNsZSBjeD0iMzMwIiBjeT0iMTA1IiByPSIxNCIgZmlsbD0iIzE2MUUzMyI+PC9jaXJjbGU+PHRleHQgeD0iMzMwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNBNjMzNUEiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIj5YMjwvdGV4dD4KICAgICAgPGNpcmNsZSBjeD0iMzgwIiBjeT0iNjAiIHI9IjEwIiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT48dGV4dCB4PSIzODAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNTY1Rjc4IiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+QjwvdGV4dD4KICAgICAgPGNpcmNsZSBjeD0iMzgwIiBjeT0iNDAiIHI9IjciIGZpbGw9IiMwRTc2NkIiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQxMCIgY3k9IjgwIiByPSI3IiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT4KICAgIDwvc3ZnPg==)

أقصر طريق ظاهريًا بين A و B يمرّ عبر النفق X1↔X2 الذي يتحكم به المهاجم
بالكامل.
:::

الحلول المقترَحة لهجوم Wormhole

إن كلًا من [Sinkhole Attack]{.term} و[Black-hole Attack]{.term}
و[Wormhole Attacks]{.term} يصعب كشفها لأنها تستغل بروتوكولات التوجيه
التي تعتمد على إعلان معلومات مثل كمية الطاقة المتبقية أو أقل عدد من
القفزات إلى محطة القاعدة --- وهي معايير يسهل على المهاجم تزييف الإعلان
عنها. لذلك اقتُرحت **بروتوكولات توجيه جغرافية** تتمتع بمرونة أكبر في
التعامل مع هذه الهجمات، مثل [GPSR]{.term} و[GEAR]{.term}، واللذان يوجّهان
حركة المرور دائمًا نحو محطة القاعدة عبر المسار الأقصر جغرافيًا فعليًا؛ وبما
أن هذه البروتوكولات لا تعتمد على إعلانات العقد بل على معرفة الموقع
الجغرافي الفعلي للعقد، فهي أكثر مقاومة للتزييف. كذلك اقتُرح بروتوكول
توجيه آمن مخصّص يُدعى [SERWA]{.term} قادر تحديدًا على كشف هجوم Wormhole دون
الحاجة لاستخدام أي أجهزة خاصة [special hardware]{.term}.
:::

::: {#ch8-5c .section .chapter}
::: item-head
[Network Layer]{.layer-tag .network}

#### التوجيه الخاطئ --- Misdirection
:::

يقوم المهاجم بإرسال حزم البيانات عبر مسارات خاطئة عمدًا، لمنعها من الوصول
إلى مستقبِلها الشرعي. وبإمكان المعتدي أيضًا خلق حلقات توجيه [routing
loops]{.term} داخل الشبكة، أو تغيير أطوال مسارات التوجيه، أو حتى جذب حزم
البيانات نحو عقدة معيّنة يريدها أو إبعادها عنها بحسب هدفه.

::: item-head
[Network Layer]{.layer-tag .network}

#### تزييف إقرار الاستلام --- Acknowledgement Spoofing Attack
:::

تتطلب بروتوكولات التوجيه المستخدمة في شبكات الاستشعار اللاسلكية استخدام
إقرار تسليم [Acknowledgement]{.term} للتأكد من وصول الرسائل فعليًا. يقوم
المهاجم هنا بتزييف إقرار الاستلام الخاص بحزمة معيّنة، مما يُوهم العقدة
المرسِلة بأن المستقبِل الشرعي قد استلم الرسالة فعلًا --- بينما قد يكون هذا
المستقبِل خارج الخدمة فعليًا في الحقيقة، وبذلك تُفقَد الرسالة دون أن تدرك
العقدة المرسِلة ذلك.

::: item-head
[Network Layer]{.layer-tag .network}

#### الاعتداء الموجَّه --- Homing Attack
:::

يستطيع المعتدي هنا أن يحدِّد العقد ذات المسؤوليات الخاصة في الشبكة، مثل
رأس العنقود [Cluster Head]{.term} أو مدير المفاتيح الأمنية، لتصبح هذه
العقد هدفًا مباشرًا له. والهدف من ذلك هو التمكّن من السيطرة على الشبكة
بأكملها عبر شنّ هجمات التشويش الإذاعي أو حجب الخدمة على هذه العقد
المحورية تحديدًا --- فبضرب \"رأس\" الشبكة، يشلّ المهاجم جزءًا كبيرًا منها
دفعة واحدة.

::: item-head
[Network Layer]{.layer-tag .network}

#### اعتداء سيبيل --- Sybil Attack
:::

يعمد المعتدي هنا إلى **انتحال هوية أكثر من عقدة واحدة** داخل الشبكة في
آنٍ واحد، مما يؤثر مباشرة على موثوقية وصحة البيانات. ومن خلال تزييف
الهوية بهذه الطريقة، يمكن للمعتدي أن يخترق آلية التخزين الموزَّع للبيانات،
وآلية التوجيه المستخدَمة في الشبكة، وآلية تجميع البيانات، بل وحتى آلية
توزيع الموارد.

الخطير في هذا الهجوم أن كل بروتوكولات [multi-path routing]{.term} ضعيفة
تجاهه: فبإمكان عقدة سيبيل واحدة أن \"تتواجد\" (بهوياتها المتعددة
الوهمية) في كل المسارات المتاحة، بحيث يظن البروتوكول أنه يستخدم عدة
مسارات مستقلة فعلًا، بينما هي في الحقيقة جميعها تمر عبر العقدة الخبيثة
نفسها. كذلك فإن بروتوكولات التوجيه الجغرافية ضعيفة تجاه هذا الهجوم أيضًا،
بسبب قدرة العقدة الخبيثة على تزييف موقعها الجغرافي المُعلَن، مما يزيد من
احتمالية اختيارها كجزء \"شرعي\" من مسار التوجيه.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNDIwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGcgc3Ryb2tlPSIjRENEM0JFIiBzdHJva2Utd2lkdGg9IjEuMyIgc3Ryb2tlLWRhc2hhcnJheT0iNCAzIj4KICAgICAgICA8bGluZSB4MT0iMjEwIiB5MT0iMTIwIiB4Mj0iNzAiIHkyPSI0MCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIyMTAiIHkxPSIxMjAiIHgyPSIxMzAiIHkyPSIzMCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIyMTAiIHkxPSIxMjAiIHgyPSI2MCIgeTI9IjEwMCI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIyMTAiIHkxPSIxMjAiIHgyPSIzMzAiIHkyPSI0NSI+PC9saW5lPgogICAgICAgIDxsaW5lIHgxPSIyMTAiIHkxPSIxMjAiIHgyPSIzNjAiIHkyPSIxMTAiPjwvbGluZT4KICAgICAgICA8bGluZSB4MT0iMjEwIiB5MT0iMTIwIiB4Mj0iMzIwIiB5Mj0iMTg1Ij48L2xpbmU+CiAgICAgIDwvZz4KICAgICAgPGcgZmlsbD0iIzBFNzY2QiIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iIGZvbnQtc2l6ZT0iMTAiPgogICAgICAgIDxjaXJjbGUgY3g9IjcwIiBjeT0iNDAiIHI9IjkiPjwvY2lyY2xlPjx0ZXh0IHg9IjcwIiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzU2NUY3OCI+WjwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSIxMzAiIGN5PSIzMCIgcj0iOSI+PC9jaXJjbGU+PHRleHQgeD0iMTMwIiB5PSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzU2NUY3OCI+WTwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjEwMCIgcj0iOSI+PC9jaXJjbGU+PHRleHQgeD0iNDUiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzU2NUY3OCI+WDwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSIzMzAiIGN5PSI0NSIgcj0iOSI+PC9jaXJjbGU+PHRleHQgeD0iMzMwIiB5PSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzU2NUY3OCI+QjwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSIzNjAiIGN5PSIxMTAiIHI9IjkiPjwvY2lyY2xlPjx0ZXh0IHg9IjM3OCIgeT0iMTE1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNTY1Rjc4Ij5DPC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjMyMCIgY3k9IjE4NSIgcj0iOSI+PC9jaXJjbGU+PHRleHQgeD0iMzIwIiB5PSIyMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM1NjVGNzgiPkU8L3RleHQ+CiAgICAgIDwvZz4KICAgICAgPGNpcmNsZSBjeD0iMjEwIiBjeT0iMTIwIiByPSIxNiIgZmlsbD0iI0E2MzM1QSI+PC9jaXJjbGU+CiAgICAgIDx0ZXh0IHg9IjIxMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjQTYzMzVBIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiPlN5YmlsIE5vZGU8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjIxMCIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjODg5MEE0IiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiPtiq2YbYqtit2YQg2YfZiNmK2KfYqiBB2IwgQtiMIEMg2YXYqti52K/Yr9ipINij2YXYp9mFINmD2YQg2KzYp9ixPC90ZXh0PgogICAgPC9zdmc+)

عقدة سيبيل واحدة تظهر بهويات مختلفة لكل جارة من جيرانها، فتبدو وكأنها
عدة عقد مستقلة.
:::

::: summary-box
##### ◆ ملخص سريع --- هجمات طبقة الشبكة

-   **Selective Forwarding**: تمرير بعض الحزم وإسقاط أخرى. الحل:
    Multi-path Routing (محدود) أو CHEMAS.
-   **Sinkhole**: جذب حركة المرور بالإعلان عن مسار وهمي ممتاز نحو BS.
-   **Hello Flood**: هوائي قوي يُوهم كل عقد الشبكة بأنه جار قريب.
-   **Black-hole**: ابتلاع الرسائل بعد إقناع الضحية بأنه على بُعد قفزة
    واحدة.
-   **Wormhole**: نفق افتراضي بين عقدتين متواطئتين يخطف أقصر المسارات.
    الحلول: GPSR, GEAR, SERWA.
-   **Misdirection**, **Ack Spoofing**, **Homing Attack**: تلاعب
    بالمسارات، بإقرارات الاستلام، أو استهداف مباشر للعقد المحورية.
-   **Sybil**: انتحال هويات متعددة لعقدة واحدة، يضعف كل حلول multi-path
    والتوجيه الجغرافي.
:::
:::

::: {#ch8-6 .section .chapter}
::: chapter-head
::: chapter-num
٨.٤
:::

## الاعتداءات المستهدِفة لطبقة التطبيقات --- Application Layer
:::

::: chapter-rule
:::

::: item-head
[Application Layer]{.layer-tag .application}

#### اعتداء الإرباك --- Overwhelm Attack
:::

يقع هذا الاعتداء عندما يقوم المعتدي بـ\"إغراق\" العقد بمُثيرات
[stimuli]{.term} اصطناعية، مما يضخّم بشكل مصطنع حجم البيانات التي تُرسِلها
العقد نحو المحطة الطرفية. يمكن الحدّ من آثار هذا الهجوم من خلال ضبط
الحساسات بحيث لا تستجيب إلا لمثيرات محددة وحقيقية (كأن تتحسس حركة
المركبات تحديدًا، لا أي حركة عشوائية تحدث حولها بشكل عام).

::: item-head
[Application Layer]{.layer-tag .application}

#### إعادة البرمجة الغامرة --- Deluge Reprogram Attack
:::

تسمح أنظمة برمجة الشبكات الحديثة بإعادة برمجة العقد عن بُعد [remote
reprogramming]{.term} لتحديث برامجها. لكن إذا لم يتم تأمين هذه العملية
بشكل جيد، فإن بإمكان المعتدي أن يختطف عملية إعادة البرمجة هذه بالكامل،
ليتحكم فعليًا بالعقد المكوِّنة للشبكة ويُملي عليها أي سلوك يريده.
:::

::: {#ch8-7 .section .chapter}
::: chapter-head
::: chapter-num
٨.٥
:::

## الاعتداءات المستهدِفة لطبقة النقل --- Transport Layer
:::

::: chapter-rule
:::

::: item-head
[Transport Layer]{.layer-tag .transport}

#### اعتداء إلغاء التزامن --- De-synchronization Attack
:::

يهدف هذا الاعتداء إلى إرباك الاتصالات القائمة فعليًا في الشبكة، وذلك من
خلال تخريب بعض الحزم التي تنتقل بين العقدتين المتصلتين، أو تكرار إرسال
رسائل مزيَّفة إلى أحد طرفَي الاتصال أو كليهما. هذا يدفع العقد إلى طلب إعادة
الإرسال بشكل مستمر بحثًا عن التزامن الصحيح، مما يمكِّن المهاجم من جعل زوج
العقد \"عالقًا\" في بروتوكول استعادة التزامن. وإذا استخدم المعتدي التوقيت
المناسب بإتقان، فبإمكانه أن يمنع العقد المتصلة من تبادل أي معلومات صحيحة
على الإطلاق، إذ تبقى مواردها تُستنزَف باستمرار في مجرد محاولة طلب تصحيح
الإرسال دون جدوى.

::: callout
[توضيح]{.callout-label}

لاحظ أن هذا الهجوم لا يعتمد على كسر التشفير أو اختراق المفاتيح، بل يستغل
فقط اعتماد بروتوكول التزامن على تسلسل معيّن من الرسائل --- وهو ما يجعله
خطيرًا رغم بساطته الظاهرية.
:::
:::

::: {#ch8-8 .section .chapter}
::: chapter-head
::: chapter-num
٨.٦
:::

## الاعتداءات المستهدِفة للبيانات المنقولة
:::

::: chapter-rule
:::

بعيدًا عن تصنيف الاعتداءات بحسب الطبقة، يمكن أيضًا النظر إليها من زاوية
تأثيرها المباشر على البيانات وهي في طريقها عبر الشبكة. هناك خمسة أنماط
أساسية لهذا النوع من التأثير.

::: table-wrap
  -----------------------------------------------------------------------
  النمط                               المعنى
  ----------------------------------- -----------------------------------
  **Interruption**\                   منع وصول الرزم إلى وجهتها بالكامل.
  المقاطعة                            

  **Interception**\                   التنصّت على الرزم أثناء انتقالها دون
  الاعتراض                            علم الأطراف.

  **Modification**\                   إجراء تعديل فعلي على محتوى الرزم.
  التعديل                             

  **Fabrication**\                    تصنيع رزم جديدة بالكامل وحقنها داخل
  التصنيع والتزوير                    الشبكة.

  **Replication**\                    التقاط رزم صحيحة سبق إرسالها وإعادة
  إعادة الإرسال                       بثها لاحقًا.
  -----------------------------------------------------------------------

  : أنماط التأثير على البيانات المنقولة
:::

يمكن ملاحظة أن هذه الأنماط الخمسة ليست هجمات جديدة بحد ذاتها، بل هي
زاوية نظر تصنيفية أخرى للهجمات نفسها التي مرّت معنا سابقًا؛ فمثلًا هجوم
Sinkhole هو شكل من أشكال الـ Interruption/Interception معًا، وهجوم
Acknowledgement Spoofing هو شكل من الـ Fabrication.
:::

::: {#ch8-9 .section .chapter}
::: chapter-head
::: chapter-num
٨.٧
:::

## الاعتداءات المحسوسة الموجَّهة ضد عقد الشبكة
:::

::: chapter-rule
:::

على عكس الهجمات السابقة التي كانت رقمية بحتة، تستهدف هذه الفئة العقد
فيزيائيًا بشكل مباشر --- وهي ممكنة أصلًا بسبب ما رأيناه في فصل \"معوقات
الأمن\" من افتقار كثير من العقد لوسائل حماية فيزيائية بسبب تكلفتها.

::: item-head
#### اعتقال العقدة --- Node Capture (Destruction or theft)
:::

يقوم المعتدي باعتقال عقدة استشعار فعليًا (سرقة أو تخريب)، مما يمكّنه من
التقاط بعض البيانات الحسّاسة الموجودة داخلها، مثل بيانات التشفير
ومفاتيحه. والأخطر من ذلك أنه يمكنه أيضًا **إعادة برمجة** هذه العقدة
المعتقَلة وإعادتها إلى الشبكة وكأن شيئًا لم يحدث، فتعمل الآن كعقدة \"حصان
طروادة\" من الداخل.

::: item-head
#### استنساخ العقدة --- Node Replication
:::

يقوم المعتدي بإضافة عقدة مستنسَخة تحمل نفس هوية إحدى العقد المتواجدة أصلًا
في الشبكة، مما يمكّنها من الوصول إلى معلومات سرّية كمفاتيح التشفير الخاصة
بتلك الهوية. ملاحظة مهمة: هذا الهجوم هو **عكس** اعتداء سيبيل تمامًا؛ ففي
Sybil تظهر عقدة واحدة بهويات متعددة، بينما في Node Replication تظهر هوية
واحدة عبر عدة عقد مستنسَخة.

::: item-head
#### العقدة المزيَّفة أو الخبيثة --- False / Malicious Node
:::

يضيف المعتدي عقدة مزيَّفة بالكامل إلى الشبكة، لا علاقة لها بأي هوية سابقة،
لتعمل على تغذية الشبكة ببيانات خاطئة من الأساس، وقد تتمكن أيضًا من
استدراج العقد المجاورة لها لترسل لها بياناتها الحقيقية.

::: item-head
#### الحرمان من وضع السكون --- Sleep Deprivation Attack
:::

يهدف هذا الاعتداء إلى حرمان العقد من الدخول في وضع السكون [sleep
mode]{.term} --- وهو الوضع الذي تعتمد عليه العقد أصلًا لتوفير طاقتها
المحدودة --- مما يؤدي إلى استنزاف موارد طاقتها تدريجيًا حتى \"تموت\"
العقدة كليًا. قد يحدث ذلك بإغراق العقدة بعدد كبير من الرسائل، أو
بمطالبتها بتنفيذ حسابات كثيفة تظهر للوهلة الأولى وكأنها طلبات مشروعة
وشرعية.

::: summary-box
##### ◆ ملخص سريع --- الاعتداءات الفيزيائية على العقد

-   **Node Capture**: سرقة/تخريب فيزيائي + احتمال إعادة برمجة العقدة
    وزرعها من جديد.
-   **Node Replication**: استنساخ هوية عقدة موجودة (عكس Sybil).
-   **False/Malicious Node**: زرع عقدة جديدة بالكامل لتغذية الشبكة
    ببيانات خاطئة.
-   **Sleep Deprivation**: إغراق العقدة بطلبات وهمية لاستنزاف طاقتها دون
    سكون.
:::
:::

::: {#ch9 .section .chapter}
Protection Mechanisms

::: chapter-head
::: chapter-num
٩
:::

## حماية شبكات الاستشعار اللاسلكية
:::

::: chapter-rule
:::

بعد أن استعرضنا التهديدات، ننتقل الآن إلى الحلول. أهم المواضيع التي تُدرَس
عادة عند الحديث عن حماية شبكات الاستشعار اللاسلكية هي: التشفير وإدارة
المفاتيح، البروتوكولات الآمنة في طبقة Data-Link، تجميع البيانات الآمن،
تقسيم البيانات، الحماية من هجمات حجب الخدمة، التوجيه الآمن، وأخيرًا آليات
إخفاء هوية المرسل. سنتناول كل موضوع من هذه المواضيع في قسم مستقل.
:::

::: {#ch9-1 .section .chapter}
::: chapter-head
::: chapter-num
٩.١
:::

## التشفير وإدارة المفاتيح
:::

::: chapter-rule
:::

إن آليات التشفير المصمَّمة أصلًا **للشبكات السلكية** غير قابلة للتطبيق
المباشر في شبكات الاستشعار اللاسلكية، لأن تطبيقها يتطلب زيادة كبيرة في
استهلاك القدرات الحاسوبية للعقد وفي مواردها من الطاقة، كما قد يزيد من
حدوث تأخير في الإرسال أو فقدان لحزم البيانات.

::: mini-head
التشفير غير المتناظر: RSA مقابل ECC
:::

عند اختبار بعض خوارزميات التشفير غير المتناظرة [Asymmetric]{.term} على
شبكة استشعار لاسلكية فعلية، وُجد أن خوارزمية [RSA]{.term} تحتاج زمن
انتظار [latency]{.term} طويلًا جدًا تستغرقه العقدة لتنفيذها. في المقابل،
خوارزمية [ECC (Elliptic Curve Cryptography)]{.term} أفضل بكثير من حيث
زمن الانتظار، لذلك يمكن استخدامها في بعض التطبيقات الصغيرة التي لا يشكّل
فيها التأخير البسيط مشكلة كبيرة. وقد صُمِّمت مكتبة [TinyECC]{.term} خصيصًا
لتنفيذ خوارزمية ECC على نظام تشغيل عقد الاستشعار [TinyOS]{.term}.

::: table-wrap
  نوع العقدة (Sensor Node)   RSA-1024 Performance   ECC-160 Performance
  -------------------------- ---------------------- ---------------------
  **MICA2DOT**               22.00 s                1.60 s
  **MICA2 / MICAz**          12.00 s                0.87 s
  **TelosB**                 5.70 s                 0.5 s

  : زمن تنفيذ RSA-1024 مقابل ECC-160 على عقد استشعار حقيقية
:::

الفارق هائل كما يظهر في الجدول: فعلى عقدة MICA2DOT مثلًا، تستغرق RSA أكثر
من 13 ضعف الزمن الذي تستغرقه ECC لتحقيق مستوى أمان مقارب --- وهذا يفسر
لماذا تميل شبكات الاستشعار إلى تفضيل ECC كلما احتاجت لتشفير غير متناظر.

::: mini-head
التشفير المتناظر: الاختيار الأمثل
:::

بشكل عام، تتفوّق آليات **التشفير المتناظر** [Symmetric
Cryptography]{.term} على الآليات غير المتناظرة [Asymmetric
Cryptography]{.term} (المعروفة أيضًا بالتشفير باستخدام المفتاح العام
[Public Key Cryptography]{.term}) من حيث السرعة في التنفيذ والتقليل من
مستوى استهلاك موارد العقد المحدودة --- وهذا يجعل التشفير المتناظر
**الاختيار الأمثل** بالنسبة لشبكات الاستشعار اللاسلكية بشكل عام.

ولتحقيق توازن أدق بين الأمان واستهلاك الطاقة، اقترحت بعض الدراسات نموذجًا
أمنيًا تتناسب فيه تكلفة التشفير مع حساسية البيانات نفسها، عبر ثلاثة
مستويات: **المستوى الأول** مخصَّص للمعلومات المتنقلة الأكثر حساسية في
الشبكة، ويستخدم أقوى مستويات التشفير المتاحة؛ **المستوى الثاني** يستخدم
تشفيرًا أقل قوة، مخصَّصًا لمواقع العقد التي يتم تبادلها؛ و**المستوى الثالث**
هو أدنى مستويات التشفير، ويُستخدَم للبيانات الخاصة بالتطبيق العادية غير
الحسّاسة.

::: mini-head
تحدّي إدارة المفاتيح
:::

تقليديًا، تتم إدارة المفاتيح [Key Management]{.term} عن طريق جهة مانحة
موثوقة مركزية. لكن استخدام جهة مانحة وحيدة في شبكات الاستشعار اللاسلكية
أمر خطير جدًا: فباختراق هذه الجهة المانحة الوحيدة، تسقط الشبكة بأكملها
دفعة واحدة. وبناءً عليه، فإن أكبر عقبة أمام آليات التشفير المتناظر هي
تأمين عملية توزيع المفاتيح بين الأطراف المتواصلة في الشبكة --- وهذه مهمة
صعبة بطبيعتها في شبكات الاستشعار اللاسلكية نظرًا لطبيعة النشر العشوائي
للعقد، والانقطاع المتكرر في الاتصال، ومحدودية موارد العقد نفسها.

::: mini-head
أنواع المفاتيح المستخدَمة
:::

تتعدد أنواع المفاتيح المستخدَمة داخل شبكات الاستشعار اللاسلكية بحسب نطاق
مشاركتها:

::: table-wrap
  نوع المفتاح              آلية العمل
  ------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Global Key**           تشترك جميع عقد الشبكة في نفس المفتاح، ويُستخدَم لتشفير وفك تشفير كل الرسائل المتبادَلة.
  **Pairwise-node Key**    إذا كان للعقدة n من العقد المجاورة، فعليها تخزين n مفتاحًا مختلفًا للتواصل مع كل جار على حدة.
  **Pairwise-group Key**   تستخدم عقد العنقود الواحد مفتاحًا مشتركًا، وتتواصل رؤوس العناقيد [Cluster Heads]{.term} فيما بينها بمفتاح واحد مشترك أو بمفتاح Pairwise بين كل رأسين --- حل هجين يدمج بين الأسلوبين السابقين.
  **Individual Key**       يُخصَّص لكل عقدة مفتاح خاص بها معلوم فقط من قبل الـ BS. تبقى الرسالة سرّية طوال انتقالها عبر الشبكة حتى تصل إلى BS، وهو الوحيد القادر على فك تشفيرها. هذا الحل الأفضل من حيث تقليل استهلاك الشبكة، لكنه يؤمّن الاتصال فقط بين العقدة والـ BS.

  : أنواع مفاتيح التشفير في WSN
:::

يمكن القول إن [Pairwise Key]{.term} أقوى أمنيًا من [Global Key]{.term}؛
فحين تُخترَق عقدة تستخدم مفتاحًا زوجيًا، يفشل جزء محدود فقط من الشبكة، على
عكس اختراق Global Key الذي قد يتسبب في انهيار الشبكة بأكملها دفعة واحدة.

::: mini-head
بروتوكولات مركزية مقابل موزَّعة
:::

وبالرغم من كل هذه التحديات، تمكّن العديد من الباحثين من اقتراح بروتوكولات
لإدارة المفاتيح، تُصنَّف بحسب هيكل الشبكة إلى نوعين: **بروتوكولات مركزية**
يوجد فيها ما يُسمى مركز توزيع المفاتيح الذي يتولى وحده مسؤولية إصدار
وتوزيع المفاتيح، وهو ما يشكّل نقطة ضعف واحدة يمكن استغلالها لاختراق
الشبكة بأكملها فور اختراق هذا المركز؛ و**بروتوكولات موزَّعة** توظّف أكثر من
جهة لتوزيع وإنشاء المفاتيح، مما يعزز قوتها في مواجهة الاختراق --- ولهذا
السبب نجد أن أغلب البروتوكولات الحديثة تعتمد المنهجية الموزَّعة بدلًا من
المركزية.

::: summary-box
##### ◆ ملخص سريع --- التشفير وإدارة المفاتيح

-   التشفير السلكي التقليدي غير مناسب لعقد الاستشعار المحدودة الموارد.
-   عند الحاجة لتشفير غير متناظر: [ECC]{.term} أفضل بكثير من
    [RSA]{.term} من حيث زمن التنفيذ.
-   التشفير المتناظر [Symmetric]{.term} هو الخيار الأمثل عمومًا لشبكات
    WSN.
-   تحدي إدارة المفاتيح: تجنّب جهة مانحة مركزية وحيدة، وتأمين توزيع
    المفاتيح رغم النشر العشوائي ومحدودية الموارد.
-   أنواع المفاتيح: Global (الأضعف أمنًا) / Pairwise-node /
    Pairwise-group / Individual (الأفضل بين العقدة و BS فقط).
-   البروتوكولات الموزَّعة أقوى من المركزية في مواجهة الاختراق.
:::
:::

::: {#ch9-2 .section .chapter}
::: chapter-head
::: chapter-num
٩.٢
:::

## البروتوكولات الآمنة في طبقة Data-Link
:::

::: chapter-rule
:::

بُنيت عدة بروتوكولات مخصَّصة لتأمين الاتصال في طبقة ربط البيانات، وكل واحد
منها قدّم حلًا مختلفًا لموازنة الأمان مع محدودية موارد العقدة.

::: item-head
[Data-Link Layer]{.layer-tag .datalink}

#### بروتوكول TinySec
:::

يُعدّ [TinySec]{.term} **أول بروتوكول آمن** صُمِّم خصيصًا من أجل شبكات
الاستشعار اللاسلكية، ويُستخدَم فيه عادة عقد من نوع [Mica2]{.term}. يعتمد
هذا البروتوكول على رمز التحقق من صحة الرسالة [Message Authentication
Code (MAC)]{.term} لتحقيق كل من التحقق من الهوية وسلامة البيانات معًا.
أما التشفير فيعتمد على أسلوب **سلسلة تشفير الكتل** [Cipher Block
Chaining (CBC)]{.term}، حيث تُقسَّم الرسالة إلى مجموعة من الكتل، وتُشفَّر كتلة
تلو الأخرى بحيث يعتمد تشفير كل كتلة على نتيجة الكتلة السابقة.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNTIwIDE3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGcgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM1NjVGNzgiPgogICAgICAgIDx0ZXh0IHg9IjcwIiB5PSIyMCI+UDE8L3RleHQ+PHRleHQgeD0iMjUwIiB5PSIyMCI+UDI8L3RleHQ+PHRleHQgeD0iNDcwIiB5PSIyMCI+UG48L3RleHQ+CiAgICAgIDwvZz4KICAgICAgPGxpbmUgeDE9IjcwIiB5MT0iMzAiIHgyPSI3MCIgeTI9IjU1IiBzdHJva2U9IiM4ODkwQTQiIHN0cm9rZS13aWR0aD0iMS41IiBtYXJrZXItZW5kPSJ1cmwoI2ExKSI+PC9saW5lPgogICAgICA8bGluZSB4MT0iMjUwIiB5MT0iMzAiIHgyPSIyNTAiIHkyPSI1NSIgc3Ryb2tlPSIjODg5MEE0IiBzdHJva2Utd2lkdGg9IjEuNSIgbWFya2VyLWVuZD0idXJsKCNhMSkiPjwvbGluZT4KICAgICAgPGxpbmUgeDE9IjQ3MCIgeTE9IjMwIiB4Mj0iNDcwIiB5Mj0iNTUiIHN0cm9rZT0iIzg4OTBBNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIG1hcmtlci1lbmQ9InVybCgjYTEpIj48L2xpbmU+CiAgICAgIDx0ZXh0IHg9IjIwIiB5PSI2NSIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM1NjVGNzgiPklWIOKGkjwvdGV4dD4KICAgICAgPGNpcmNsZSBjeD0iNzAiIGN5PSI2NSIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJFNkY5RSIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvY2lyY2xlPjx0ZXh0IHg9IjcwIiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzJFNkY5RSI+4oqVPC90ZXh0PgogICAgICA8bGluZSB4MT0iODIiIHkxPSI2NSIgeDI9IjEzMCIgeTI9IjY1IiBzdHJva2U9IiM4ODkwQTQiIHN0cm9rZS13aWR0aD0iMS41IiBtYXJrZXItZW5kPSJ1cmwoI2ExKSI+PC9saW5lPgogICAgICA8cmVjdCB4PSI0NSIgeT0iOTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSIzMCIgcng9IjYiIGZpbGw9IiMyRTZGOUUiIC8+PHRleHQgeD0iNzAiIHk9IjExNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkVuYzwvdGV4dD4KICAgICAgPHRleHQgeD0iMjAiIHk9IjExNSIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM1NjVGNzgiPksg4oaSPC90ZXh0PgogICAgICA8bGluZSB4MT0iNzAiIHkxPSIxMjUiIHgyPSI3MCIgeTI9IjE1MCIgc3Ryb2tlPSIjODg5MEE0IiBzdHJva2Utd2lkdGg9IjEuNSIgbWFya2VyLWVuZD0idXJsKCNhMSkiPjwvbGluZT4KICAgICAgPHRleHQgeD0iNzAiIHk9IjE2NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMxNjFFMzMiPkMxPC90ZXh0PgogICAgICA8bGluZSB4MT0iOTUiIHkxPSIxMTAiIHgyPSIyMzgiIHkyPSI2NSIgc3Ryb2tlPSIjODg5MEE0IiBzdHJva2Utd2lkdGg9IjEuNSIgbWFya2VyLWVuZD0idXJsKCNhMSkiPjwvbGluZT4KICAgICAgPGNpcmNsZSBjeD0iMjUwIiBjeT0iNjUiIHI9IjEyIiBmaWxsPSJub25lIiBzdHJva2U9IiMyRTZGOUUiIHN0cm9rZS13aWR0aD0iMS41Ij48L2NpcmNsZT48dGV4dCB4PSIyNTAiIHk9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMkU2RjlFIj7iipU8L3RleHQ+CiAgICAgIDxyZWN0IHg9IjIyNSIgeT0iOTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSIzMCIgcng9IjYiIGZpbGw9IiMyRTZGOUUiIC8+PHRleHQgeD0iMjUwIiB5PSIxMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIj5FbmM8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjIwMCIgeT0iMTE1IiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzU2NUY3OCI+SyDihpI8L3RleHQ+CiAgICAgIDxsaW5lIHgxPSIyNTAiIHkxPSIxMjUiIHgyPSIyNTAiIHkyPSIxNTAiIHN0cm9rZT0iIzg4OTBBNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIG1hcmtlci1lbmQ9InVybCgjYTEpIj48L2xpbmU+CiAgICAgIDx0ZXh0IHg9IjI1MCIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzE2MUUzMyI+QzI8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjM2MCIgeT0iOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM4ODkwQTQiPuKAouKAouKAojwvdGV4dD4KICAgICAgPHRleHQgeD0iNDcwIiB5PSI2NSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzU2NUY3OCIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkNuLTEg4oaSPC90ZXh0PgogICAgICA8Y2lyY2xlIGN4PSI0NzAiIGN5PSI5MCIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJFNkY5RSIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvY2lyY2xlPjx0ZXh0IHg9IjQ3MCIgeT0iOTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMyRTZGOUUiPuKKlTwvdGV4dD4KICAgICAgPHJlY3QgeD0iNDQ1IiB5PSIxMTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSIzMCIgcng9IjYiIGZpbGw9IiMyRTZGOUUiIC8+PHRleHQgeD0iNDcwIiB5PSIxMzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIj5FbmM8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjQyMCIgeT0iMTM1IiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzU2NUY3OCI+SyDihpI8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjQ3MCIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzE2MUUzMyI+Q248L3RleHQ+CiAgICAgIDxkZWZzPjxtYXJrZXIgaWQ9ImExIiBtYXJrZXJ3aWR0aD0iOCIgbWFya2VyaGVpZ2h0PSI4IiByZWZ4PSI2IiByZWZ5PSIzIiBvcmllbnQ9ImF1dG8iPjxwYXRoIGQ9Ik0wLDAgTDYsMyBMMCw2IHoiIGZpbGw9IiM4ODkwQTQiIC8+PC9tYXJrZXI+PC9kZWZzPgogICAgPC9zdmc+)

تسلسل عمل **Cipher Block Chaining (CBC)**: ناتج تشفير كل كتلة يُدخَل في
تشفير الكتلة التالية.
:::

يوفّر TinySec خيارَين للحماية: [AE-TinySec]{.term} ويتضمّن التحقق من هوية
مرسِل الحزمة عبر MAC **مع** تشفير حِمولة البيانات [payload]{.term}،
و[Auth-TinySec]{.term} ويتضمّن التحقق من الهوية عبر MAC **بدون** تشفير
الـ payload.

من أبرز ميزات هذا البروتوكول **مرونته من حيث التنفيذ** على مختلف أنواع
العتاد (Hardware)، إضافة إلى **استهلاكه المنخفض للطاقة** والذاكرة. أما
أبرز عيوبه، فأولًا أنه **لا يأخذ بعين الاعتبار عددًا من الهجمات** التي مرّت
معنا، وثانيًا أنه يعتمد على خوارزمية توزيع مفاتيح بسيطة تُدعى
[network-wide key]{.term} تستخدم مفتاحًا وحيدًا لكل عقدة قبل نشرها في
الميدان --- فإذا اعتُقلت عقدة واحدة فقط، تصبح **الشبكة بأكملها في خطر**
فورًا.

::: item-head
[Data-Link Layer]{.layer-tag .datalink}

#### بروتوكول LLSP --- Link Layer Security Protocol
:::

يوفّر بروتوكول [LLSP]{.term} أربعة متطلبات حماية أساسية: **التحكم
بالوصول**، و**التحقق من هوية المرسِل**، و**سرّية البيانات**، و**الحماية من
إعادة الإرسال**. يستخدم هذا البروتوكول خوارزمية [Advanced Encryption
Standard (AES)]{.term} مع التشفير بطريقة [CBC]{.term}، ويعتمد على MAC
لتحقيق كل من الـ Authenticity والـ Access Control معًا.

ولتحقيق الحماية من إعادة الإرسال [replay protection]{.term}، يحتفظ هذا
البروتوكول بعدّاد [counter]{.term} متزامن بحجم 4 بايت بين المرسِل
والمستقبِل، ويتم تحديث قيمة هذا العدّاد من خلال مسجّل تغذية راجعة إزاحي
[Feedback Shift Register (FSR)]{.term}، وهو ما يوفِّر الطاقة اللازمة
لإرسال بايتات العدّاد مرفقة مع كل حزمة.

هناك مفاضلة مهمة هنا تتعلق بطول متجه التمهيد [Initialization Vector
(IV)]{.term}: فإذا كان قصيرًا، سيُضطَر البروتوكول لإعادة استخدام نفس الـ IV
مرة أخرى في وقت لاحق، وهذا غير آمن؛ أما إذا كان طويلًا، فسيؤدي ذلك إلى
استهلاك أكبر للطاقة عند إرساله مع كل حزمة.
:::

::: {#ch9-2b .section .chapter}
::: item-head
[Data-Link Layer]{.layer-tag .datalink}

#### إخفاء المعلومات في طبقة MAC --- Steganography in MAC Layer of 802.15.4
:::

يُستخدَم بروتوكول إخفاء المعلومات [Steganography]{.term} في طبقة الـ MAC
على نطاق واسع في شبكات الاستشعار اللاسلكية. المبدأ الأساسي هنا أن عملية
إخفاء المعلومات يجب أن تتم بطريقة سرّية، بحيث لا يعلم طريقة الإخفاء إلا
الأطراف المشاركة في العملية فقط، وهم وحدهم القادرون على قراءة المعلومات
المخفية لاحقًا.

يوجد أنواع مختلفة من إطارات [frames]{.term} البروتوكول بحسب نوع الحزم
المرسَلة: إطار البيانات [MAC Data frame]{.term}، وإطار المنارة [Beacon
frame]{.term}، وإطار الإقرار [Acknowledgment frame]{.term}. كل إطار من
هذه الإطارات له حقول مختلفة وبنية مختلفة، وكل حقل يمنح إمكانيات مختلفة
لإخفاء البيانات بداخله. تقوم العقدة المرسِلة بوضع البيانات الأكثر أهمية
داخل هذه الحقول المخفية، بينما تُوضَع باقي البيانات الأقل أهمية في حقل
الحمولة [payload]{.term} العادي والظاهر.

::: item-head
[Data-Link Layer]{.layer-tag .datalink}

#### بروتوكول SPINS Security Protocol
:::

[SPINS]{.term} بروتوكول حماية يجمع بين بروتوكولين متكاملين: الأول هو
[μTESLA]{.term} الذي يزوّدنا بالبث الموثوق [broadcast
authenticated]{.term}، والثاني هو بروتوكول تشفير الشبكة الآمن [Secure
Network Encryption Protocol (SNEP)]{.term} الذي يزوّدنا بالسرّية
[confidentiality]{.term}، والموثوقية بين طرفين [two-party data
authentication]{.term}، وحداثة البيانات [data freshness]{.term}، وكل ذلك
بأقل حمل حوسبة ممكن.

بروتوكول [TESLA]{.term} الأصلي يحتاج إلى اتصالات سريعة وذاكرة كبيرة
نسبيًا، لذلك تم تعديله ليتكيف مع محدودية شبكات الاستشعار اللاسلكية، وأصبح
يُعرَف باسم [μTESLA]{.term}. تغلّب هذا البروتوكول المعدَّل على قيود النسخة
الأصلية، فبدلًا من الاعتماد على التوقيع الإلكتروني الثقيل للتأكد من
موثوقية [authentication]{.term} الحزمة، أصبح يستخدم آليات متناظرة
[symmetric mechanisms]{.term} أخف بكثير على موارد العقدة.

كيفية عمل μTESLA

يُلحَق بكل رسالة بَث [broadcast]{.term} رمز MAC تم توليده باستخدام مفتاح
سرّي لا يعلمه سوى المرسِل. يُرسِل المرسِل رسالته، لكنه لا يكشف عن هذا المفتاح
للمستقبِل إلا بعد مرور فترة زمنية معيّنة رمزها d. يقوم المستقبِل بتخزين
الرسالة، ولا يستطيع التحقق من مصدرها الحقيقي حتى ينتظر تلك الفترة
الزمنية d بالكامل، وبعدها يستلم المفتاح ويستخدمه للتحقق من هوية المرسِل
بأثر رجعي.

أما بروتوكول [SNEP]{.term}، فهو يحافظ على قيم عدّادات [counters]{.term}
متزامنة عند طرفَي الاتصال، ويجب أن يكون طول هذا العدّاد كبيرًا بما يكفي
لتجنّب تكرار نفس الرقم خلال عمر العقدة بالكامل. يفترض هذا البروتوكول أن
قيمة العدّاد معروفة مسبقًا لدى المرسِل والمستقبِل معًا، فلا داعي لإعادة
إرسالها مع كل رسالة مشفَّرة بينهما، وهذا بحد ذاته توفير في الطاقة والحجم.
ولتحقيق السرّية [confidentiality]{.term}، يجب تشفير الرسالة بمفتاح سرّي
[secret key]{.term} معروف فقط من قبل المرسِل والمستقبِل، ويستخدم بروتوكول
SPINS في ذلك خوارزمية التشفير [RC5]{.term}.

::: diagram
::: {style="display:flex; align-items:center; justify-content:center; gap:32px; flex-wrap:wrap;"}
::: {style="width:170px; height:170px; border-radius:50%; background:conic-gradient(#0E766B 0% 71%, #2E6F9E 71% 91%, #A85C1C 91% 98%, #7C5CBF 98% 100%); position:relative; box-shadow:var(--shadow-sm);"}
::: {style="position:absolute; inset:26px; background:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'IBM Plex Mono'; font-size:12px; color:#565F78; text-align:center;"}
توزيع\
الطاقة
:::
:::

::: {style="text-align:right; font-size:14px;"}
::: {style="margin-bottom:8px;"}
[]{style="display:inline-block;width:12px;height:12px;background:#0E766B;border-radius:3px;margin-left:6px;"}
إرسال البيانات Data transmission --- 71%
:::

::: {style="margin-bottom:8px;"}
[]{style="display:inline-block;width:12px;height:12px;background:#2E6F9E;border-radius:3px;margin-left:6px;"}
إرسال MAC --- 20%
:::

::: {style="margin-bottom:8px;"}
[]{style="display:inline-block;width:12px;height:12px;background:#A85C1C;border-radius:3px;margin-left:6px;"}
إرسال Freshness --- 7%
:::

<div>

[]{style="display:inline-block;width:12px;height:12px;background:#7C5CBF;border-radius:3px;margin-left:6px;"}
الحسابات + التشفير (مجتمعة) --- أقل من 2%

</div>
:::
:::

محاكاة استهلاك الطاقة في بروتوكول SPINS: الطاقة المستهلَكة في **إرسال**
معلومات الأمان أكبر بكثير من تلك المستهلَكة في **الحسابات** نفسها
(computation وencryption transmission/computation جميعها أقل من 1% لكل
منها).
:::

يظهر من هذه المحاكاة درس مهم: أن الطاقة المستهلَكة في **إرسال** معلومات
الأمان (بيانات + MAC + freshness) أكبر بكثير من الطاقة المستهلكة في
**حساب** هذه المعلومات (التشفير والحسابات المرتبطة به) --- أي أن عبء
الاتصال اللاسلكي نفسه هو العنصر الأثقل على الطاقة، لا المعالجة الحسابية.

ومع ذلك، فإن لبروتوكول SPINS عيبين رئيسيين: **لا يمكنه التعامل مع هجوم
منع الخدمة** بفعالية، و**لا يمكنه استخدام التوقيع الإلكتروني** بسبب
محدودية قدرات الأجهزة.

::: item-head
[Data-Link Layer]{.layer-tag .datalink}

#### بروتوكول C-Sec --- Compact-Security Protocol
:::

[C-Sec]{.term} بروتوكول فعّال جدًا في تقليل استهلاك الطاقة، إذ قام بحذف
حقول الترويسة والذيل الخاصة بالأمان [security header and trailer
fields]{.term} ودمج المعلومات المتعلقة بالحماية مباشرة مع ما تبقى من
ترويسات [headers]{.term} الحزمة نفسها. كذلك تم تنفيذ خوارزميات الأمان
والحماية في **العتاد** [hardware]{.term} بدلًا من البرمجيات
[software]{.term}، لكون التنفيذ العتادي أسرع وأقل استهلاكًا للطاقة.

يستخدم C-Sec خوارزمية [CFB-AES]{.term} للتشفير، حيث تقنية [CFB (Cipher
FeedBack)]{.term} هي تقنية تشفير كتل، لكنها تسمح بأي حجم للكتلة (1 أو 8
أو 64 أو 128 بت\...)، وهي مهمة من أجل سرعة التشفير وتجنّب الانتظار حتى
يتكوّن لدى المُرسِل بلوك كامل بحجم n بت. ولضمان الـ authentication والـ
integrity، يتم حساب [HMAC]{.term} الذي يعمل هو الآخر مع أطوال متغيّرة
للرسالة، ويعمل بالتوازي مع خوارزمية التشفير لاختصار الوقت الكلي. ولضمان
حداثة البيانات [data freshness]{.term}، يحتفظ الطرفان بعدّاد
[counter]{.term} مشترك.

يعمل هذا البروتوكول بنمطين: **النمط المضغوط** [Compact mode]{.term} الذي
يوفّر في استهلاك الطاقة وعرض النطاق الترددي [communication
bandwidth]{.term} عبر حذف حقول الحماية غير الضرورية، و**النمط التقليدي**
[Conventional mode]{.term} الذي يُستخدَم في بداية الإرسال فقط، ويحتفظ فيه
بكل هذه الحقول كاملة.

::: table-wrap
  البروتوكول                     خوارزمية التشفير               أبرز الميزات                                                                أبرز العيوب
  ------------------------------ ------------------------------ --------------------------------------------------------------------------- ---------------------------------------------------
  **TinySec**                    CBC + MAC                      أول بروتوكول مخصَّص لـ WSN، مرن، منخفض استهلاك الطاقة                         network-wide key ضعيف؛ لا يغطي هجمات كثيرة
  **LLSP**                       AES-CBC + MAC + counter        يوفر Access Control وAuthenticity وConfidentiality وReplay Protection معًا   مفاضلة صعبة في طول IV بين الأمان والطاقة
  **Steganography (802.15.4)**   إخفاء بيانات ضمن حقول الإطار   إخفاء وجود المعلومات الحساسة نفسه لا محتواها فقط                            يعتمد على سرّية طريقة الإخفاء بين طرفين محدَّدين فقط
  **SPINS (μTESLA + SNEP)**      RC5 + MAC متأخر الكشف          بث موثوق μTESLA، سرّية وحداثة بيانات بأقل حمل عبر SNEP                       لا يتعامل مع DoS؛ لا يدعم التوقيع الإلكتروني
  **C-Sec**                      CFB-AES + HMAC                 تنفيذ عتادي سريع؛ نمط مضغوط يحذف حقول الحماية الزائدة                       يتطلب دعم عتادي خاص لتحقيق أفضل أداء

  : مقارنة شاملة بين البروتوكولات الآمنة في طبقة Data-Link
:::

::: summary-box
##### ◆ ملخص سريع --- بروتوكولات طبقة Data-Link

-   **TinySec**: الأول تاريخيًا، CBC + MAC، نمطا AE-TinySec و
    Auth-TinySec.
-   **LLSP**: AES-CBC، عدّاد متزامن للحماية من الإعادة، مفاضلة في طول IV.
-   **Steganography**: إخفاء البيانات الحساسة داخل حقول إطار 802.15.4.
-   **SPINS = μTESLA (بث موثوق متأخر الكشف) + SNEP (سرّية وحداثة بأقل
    حمل، RC5)**.
-   **C-Sec**: تنفيذ عتادي، CFB-AES + HMAC، نمط مضغوط يوفّر الطاقة.
:::
:::

::: {#ch9-3 .section .chapter}
::: chapter-head
::: chapter-num
٩.٣
:::

## تجميع البيانات الآمن في شبكات الاستشعار اللاسلكية
:::

::: chapter-rule
:::

تجميع البيانات [data aggregation]{.term} هو التقنية التي كانت الحل
الأمثل لإزالة البيانات المكرَّرة، وبالتالي الحدّ من عدد الحزم التي تنتقل
داخل الشبكة. حيث يمكن لرؤوس العناقيد [Cluster Heads (CH)]{.term} أن تصبح
مسؤولة عن تجميع البيانات (الرسائل) قبل إحالتها إلى محطة القاعدة
[BS]{.term}، وهذا يخفّض عدد الحزم المتنقلة داخل الشبكة بشكل جوهري مقارنة
بإرسال كل قراءة على حدة.

::: diagram
::: two-col
<div>

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjYwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgIDx0ZXh0IHg9IjEzMCIgeT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNBODVDMUMiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+2KjYr9mI2YYg2KrYrNmF2YrYuSAoYSk8L3RleHQ+CiAgICAgICAgICA8ZyBzdHJva2U9IiNFQUQzQjkiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgICAgIDxsaW5lIHgxPSI2MCIgeTE9IjQwIiB4Mj0iMTMwIiB5Mj0iOTAiPjwvbGluZT48bGluZSB4MT0iOTAiIHkxPSIzNSIgeDI9IjEzMCIgeTI9IjkwIj48L2xpbmU+PGxpbmUgeDE9IjE1MCIgeTE9IjM1IiB4Mj0iMTMwIiB5Mj0iOTAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjIwMCIgeTE9IjQ1IiB4Mj0iMTMwIiB5Mj0iOTAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEzMCIgeTE9IjkwIiB4Mj0iMTMwIiB5Mj0iMTUwIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSI2MCIgeTE9IjEyMCIgeDI9IjEzMCIgeTI9IjE1MCI+PC9saW5lPjxsaW5lIHgxPSIyMDAiIHkxPSIxMjAiIHgyPSIxMzAiIHkyPSIxNTAiPjwvbGluZT4KICAgICAgICAgIDwvZz4KICAgICAgICAgIDxnIGZpbGw9IiNBODVDMUMiPjxjaXJjbGUgY3g9IjYwIiBjeT0iNDAiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjkwIiBjeT0iMzUiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjM1IiByPSI2Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIyMDAiIGN5PSI0NSIgcj0iNiI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNjAiIGN5PSIxMjAiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNiI+PC9jaXJjbGU+PC9nPgogICAgICAgICAgPGNpcmNsZSBjeD0iMTMwIiBjeT0iOTAiIHI9IjgiIGZpbGw9IiMxNjFFMzMiPjwvY2lyY2xlPgogICAgICAgICAgPHJlY3QgeD0iMTA1IiB5PSIxNTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSIyNiIgcng9IjYiIGZpbGw9IiMxNjFFMzMiIC8+PHRleHQgeD0iMTMwIiB5PSIxNzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzhGRTBEMyIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkJTPC90ZXh0PgogICAgICAgIDwvc3ZnPg==)

كل قراءة تُرسَل بشكل مستقل --- عدد كبير من الحزم.

</div>

<div>

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjYwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgIDx0ZXh0IHg9IjEzMCIgeT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMwRTc2NkIiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+2YXYuSDYqtis2YXZiti5IChiKTwvdGV4dD4KICAgICAgICAgIDxnIHN0cm9rZT0iI0I3Q0ZDNyIgc3Ryb2tlLXdpZHRoPSIxLjMiPgogICAgICAgICAgICA8bGluZSB4MT0iNjAiIHkxPSI0MCIgeDI9IjkwIiB5Mj0iNjAiPjwvbGluZT48bGluZSB4MT0iOTAiIHkxPSIzNSIgeDI9IjkwIiB5Mj0iNjAiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjE1MCIgeTE9IjM1IiB4Mj0iMTUwIiB5Mj0iNjAiPjwvbGluZT48bGluZSB4MT0iMjAwIiB5MT0iNDUiIHgyPSIxNTAiIHkyPSI2MCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iNjAiIHkxPSIxMjAiIHgyPSI2MCIgeTI9Ijk1Ij48L2xpbmU+PGxpbmUgeDE9IjIwMCIgeTE9IjEyMCIgeDI9IjE1MCIgeTI9Ijk1Ij48L2xpbmU+CiAgICAgICAgICA8L2c+CiAgICAgICAgICA8bGluZSB4MT0iOTAiIHkxPSI2MCIgeDI9IjEzMCIgeTI9IjkwIiBzdHJva2U9IiMwRTc2NkIiIHN0cm9rZS13aWR0aD0iMiI+PC9saW5lPgogICAgICAgICAgPGxpbmUgeDE9IjE1MCIgeTE9IjYwIiB4Mj0iMTMwIiB5Mj0iOTAiIHN0cm9rZT0iIzBFNzY2QiIgc3Ryb2tlLXdpZHRoPSIyIj48L2xpbmU+CiAgICAgICAgICA8bGluZSB4MT0iMTMwIiB5MT0iOTAiIHgyPSIxMzAiIHkyPSIxNTAiIHN0cm9rZT0iIzBFNzY2QiIgc3Ryb2tlLXdpZHRoPSIyLjQiPjwvbGluZT4KICAgICAgICAgIDxnIGZpbGw9IiMwRTc2NkIiPjxjaXJjbGUgY3g9IjYwIiBjeT0iNDAiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjkwIiBjeT0iMzUiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjM1IiByPSI2Ij48L2NpcmNsZT48Y2lyY2xlIGN4PSIyMDAiIGN5PSI0NSIgcj0iNiI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNjAiIGN5PSIxMjAiIHI9IjYiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNiI+PC9jaXJjbGU+PC9nPgogICAgICAgICAgPGNpcmNsZSBjeD0iOTAiIGN5PSI2MCIgcj0iOCIgZmlsbD0iIzE2MUUzMyI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNjAiIHI9IjgiIGZpbGw9IiMxNjFFMzMiPjwvY2lyY2xlPgogICAgICAgICAgPGNpcmNsZSBjeD0iMTMwIiBjeT0iOTAiIHI9IjkiIGZpbGw9IiMxNjFFMzMiIHN0cm9rZT0iIzhGRTBEMyIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvY2lyY2xlPgogICAgICAgICAgPHJlY3QgeD0iMTA1IiB5PSIxNTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSIyNiIgcng9IjYiIGZpbGw9IiMxNjFFMzMiIC8+PHRleHQgeD0iMTMwIiB5PSIxNzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzhGRTBEMyIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkJTPC90ZXh0PgogICAgICAgIDwvc3ZnPg==)

القراءات تُجمَّع تدريجيًا في العقد الوسيطة قبل الوصول إلى BS --- حزم أقل
بكثير.

</div>
:::
:::

لكن السؤال الأمني الجوهري هنا هو: كيف نضمن أن هذه العملية التجميعية لا
تُستغَل من قبل عقدة خبيثة لحقن بيانات مزيَّفة أو ادّعاء نتائج تجميع كاذبة؟
اقتُرحت عدة حلول أمنية لعملية aggregation، وسنتناول أحدها بالتفصيل.

::: mini-head
آلية العمل العامة
:::

في هذه الطريقة، محطة القاعدة [BS]{.term} هي الجهة الوحيدة القادرة على بثّ
الرسائل إلى جميع العقد مباشرة. أما بقية العقد فهي جميعًا متطابقة
الإمكانيات، ومنظَّمة في شجرة تجميع ثنائية [binary aggregation tree]{.term}
يقع رأسها عند BS. بعض هذه العقد تُسمى \"الأوراق\" [leaves]{.term} وهي
المسؤولة عن نشاطات الاستشعار عن بُعد فعليًا، بينما تعمل عقد أخرى كعقد
وسيطة [intermediate nodes]{.term} تجمع بيانات من تحتها. يتم تجميع
البيانات في كل من العقد الوسيطة و BS معًا.

لتحقيق الأمان، يتم التحقق من هوية مرسِل أي رسالة تصل إلى أي عقدة باستخدام
**مفتاح مؤقت** [temporary key]{.term}، ويتم توليد هذا المفتاح المؤقت
بتشفير قيمة عدّاد [counter value]{.term} باستخدام مفتاح مشترك [shared
key]{.term} بين العقدة و BS. فمثلًا، إذا كان K~AS~ هو المفتاح المشترك بين
العقدة A و BS، فإن المفتاح المؤقت للعقدة A هو نتيجة تشفير قيمة العدّاد
بهذا المفتاح المشترك. وبعد انتهاء طور التجميع، تقوم BS ببثّ المفتاح
المؤقت لتمكين بقية العقد من التحقق من صحة الرسائل المرسَلة من عقدة
مجاورة، ويزداد العدّاد بعد كل دورة جديدة.

خطوتا البروتوكول

**الخطوة الأولى:** كل عقدة \"ورقية\" تقوم بإرسال رسالة إلى عقدتها الأب،
وتحوي هذه الرسالة معرِّفها الوحيد [ID~A~]{.term} إضافة إلى بيانات
الاستشعار المقروءة من قبلها R~A~، وتتم عملية التحقق
[authentication]{.term} للرسالة عبر مفتاح سرّي مؤقت K~Ai~ معروف فقط في
تلك اللحظة من قبل BS والعقدة A نفسها.

::: {.diagram style="text-align:center;"}
::: {style="font-family:'IBM Plex Mono'; direction:ltr; display:inline-block; background:#EDF3EF; border:1px solid rgba(14,118,107,0.25); border-radius:8px; padding:12px 20px; font-size:14px; color:#0A5850;"}
A → E : R~A~ \| ID~A~ \| MAC(K~Ai~, R~A~)
:::

العقدة الورقية A ترسل قراءتها إلى عقدتها الأب E مرفقة بمعرِّفها ورمز MAC
للتحقق.
:::

**الخطوة الثانية:** عندما تصل الرسالة إلى العقدة الأب، فهي لا تستطيع
التحقق فورًا من مصدرها لأنها لا تملك بعد K~Ai~، لذلك تقوم بتخزينها
والبقاء في حالة انتظار حتى تستقبل جميع رسائل \"الأبناء\"، أو حتى انقضاء
فترة زمنية معيّنة (مؤقت انتهاء زمني). بعدها، تقوم بإرسال الرسالة المجمَّعة
إلى عقدتها الأب هي بدورها، حيث ترفق بيانات القياس مع رموز الـ MAC
الأصلية بالإضافة إلى MAC جديد يُحسَب على البيانات المجمَّعة نفسها. تتم عملية
التجميع بتطبيق تابع معيّن مثل SUM أو AVERAGE.

::: {.diagram style="text-align:center;"}
::: {style="font-family:'IBM Plex Mono'; direction:ltr; display:inline-block; background:#EDF3EF; border:1px solid rgba(14,118,107,0.25); border-radius:8px; padding:12px 20px; font-size:13.5px; color:#0A5850; line-height:1.9; text-align:left;"}
E → G   R~A~ \| ID~A~ \| MAC(K~Ai~, R~A~)\
       \| R~B~ \| ID~B~ \| MAC(K~Bi~, R~B~)\
       \| MAC(K~Ei~, Aggr(R~A~, R~B~))
:::

العقدة الوسيطة E تُحيل بيانات A وB الأصلية بالإضافة إلى MAC خاص بها على
نتيجة تجميعها.
:::

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNDgwIDI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPHJlY3QgeD0iMTkwIiB5PSIxMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIzNCIgcng9IjgiIGZpbGw9IiMxNjFFMzMiIC8+PHRleHQgeD0iMjQwIiB5PSIzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzhGRTBEMyIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkJhc2UgU3RhdGlvbiBTPC90ZXh0PgogICAgICA8bGluZSB4MT0iMjQwIiB5MT0iNDQiIHgyPSIxNTAiIHkyPSI5MCIgc3Ryb2tlPSIjODg5MEE0IiBzdHJva2Utd2lkdGg9IjEuNSI+PC9saW5lPgogICAgICA8bGluZSB4MT0iMjQwIiB5MT0iNDQiIHgyPSIzMzAiIHkyPSI5MCIgc3Ryb2tlPSIjRENEM0JFIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWRhc2hhcnJheT0iMyAzIj48L2xpbmU+CiAgICAgIDx0ZXh0IHg9IjM2MCIgeT0iOTUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM4ODkwQTQiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBTYW5zIEFyYWJpYyI+KNi02KzYsdipINmF2YXYp9ir2YTYqSDYudmE2Ykg2KfZhNis2YfYqSDYp9mE2KPYrtix2YkpPC90ZXh0PgogICAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjEzIiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT48dGV4dCB4PSIxNTAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkc8L3RleHQ+CiAgICAgIDxsaW5lIHgxPSIxNTAiIHkxPSIxMTMiIHgyPSIxMDAiIHkyPSIxNjAiIHN0cm9rZT0iIzg4OTBBNCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT4KICAgICAgPGxpbmUgeDE9IjE1MCIgeTE9IjExMyIgeDI9IjIwMCIgeTI9IjE2MCIgc3Ryb2tlPSIjODg5MEE0IiBzdHJva2Utd2lkdGg9IjEuNSI+PC9saW5lPgogICAgICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxNzAiIHI9IjEyIiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT48dGV4dCB4PSIxMDAiIHk9IjE3NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkU8L3RleHQ+CiAgICAgIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjE3MCIgcj0iMTIiIGZpbGw9IiMwRTc2NkIiPjwvY2lyY2xlPjx0ZXh0IHg9IjIwMCIgeT0iMTc1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjZmZmIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+RjwvdGV4dD4KICAgICAgPGxpbmUgeDE9IjEwMCIgeTE9IjE4MiIgeDI9IjY1IiB5Mj0iMjIyIiBzdHJva2U9IiM4ODkwQTQiIHN0cm9rZS13aWR0aD0iMS41Ij48L2xpbmU+CiAgICAgIDxsaW5lIHgxPSIxMDAiIHkxPSIxODIiIHgyPSIxMzUiIHkyPSIyMjIiIHN0cm9rZT0iIzg4OTBBNCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT4KICAgICAgPGxpbmUgeDE9IjIwMCIgeTE9IjE4MiIgeDI9IjE2NSIgeTI9IjIyMiIgc3Ryb2tlPSIjODg5MEE0IiBzdHJva2Utd2lkdGg9IjEuNSI+PC9saW5lPgogICAgICA8bGluZSB4MT0iMjAwIiB5MT0iMTgyIiB4Mj0iMjM1IiB5Mj0iMjIyIiBzdHJva2U9IiM4ODkwQTQiIHN0cm9rZS13aWR0aD0iMS41Ij48L2xpbmU+CiAgICAgIDxnIGZpbGw9IiNBODVDMUMiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIiBmb250LXNpemU9IjEwIj4KICAgICAgICA8Y2lyY2xlIGN4PSI2NSIgY3k9IjIzMiIgcj0iMTAiPjwvY2lyY2xlPjx0ZXh0IHg9IjY1IiB5PSIyMzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPkE8L3RleHQ+CiAgICAgICAgPGNpcmNsZSBjeD0iMTM1IiBjeT0iMjMyIiByPSIxMCI+PC9jaXJjbGU+PHRleHQgeD0iMTM1IiB5PSIyMzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPkI8L3RleHQ+CiAgICAgICAgPGNpcmNsZSBjeD0iMTY1IiBjeT0iMjMyIiByPSIxMCI+PC9jaXJjbGU+PHRleHQgeD0iMTY1IiB5PSIyMzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPkM8L3RleHQ+CiAgICAgICAgPGNpcmNsZSBjeD0iMjM1IiBjeT0iMjMyIiByPSIxMCI+PC9jaXJjbGU+PHRleHQgeD0iMjM1IiB5PSIyMzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPkQ8L3RleHQ+CiAgICAgIDwvZz4KICAgIDwvc3ZnPg==)

شجرة التجميع الثنائية: الأوراق A,B,C,D ترفع قراءاتها إلى E وF، ثم تجتمع
في G، وصولًا إلى محطة القاعدة S.
:::

يلاحَظ أن العقدة E **لا ترسل** ID~E~ إلى العقدة G، لأن G تعرف أصلًا ما
يكفي عن طوبولوجيا الشبكة [network topology]{.term} لتحديد مصدر الرسالة
دون الحاجة لتكرار هذا المعرِّف. وبمجرد أن تستلم العقدة G بيانات
\"أبنائها\" E وF، تقوم بتجميع بيانات \"أحفادها\" التي وصلتها من كل ابن
لها، ثم تربط البيانات المجمَّعة مع معرِّف ID كل ابن ورمز MAC الخاص بكل رسالة
استلمتها، بالإضافة إلى MAC جديد ستحسبه بنفسها على مجمل البيانات التي
جمّعتها باستخدام مفتاحها السرّي K~Gi~. وهكذا تتكرر هذه العملية صعودًا حتى
الوصول إلى BS.

بمجرد وصول الرسالة النهائية إلى BS، تقوم بحساب نتيجة التجميع الكلية، ثم
تُرسِل مفاتيح التوثيق التي استُخدِمت من قبل جميع العقد المشاركة في هذا
التجميع عبر بثّ واسع النطاق [wide-area broadcast]{.term} إلى كافة عقد
التجميع. هذا يمكِّن كل عقدة من التحقق بأثر رجعي من هوية من أرسل إليها تلك
الرسائل، إذ تقوم كل عقدة بحساب MAC لكل الرسائل التي تلقّتها ومقارنته بالـ
MAC المرفق أصلًا؛ فإذا لم يتطابقا، تُطلِق العقدة إنذارًا لإخبار العقدة
المركزية بما حدث. يتميّز هذا البروتوكول بكونه ذا **تجميع متأخر وتحقق من
الهوية متأخر** [delayed aggregation and delayed authentication]{.term}.

::: summary-box
##### ◆ ملخص سريع --- تجميع البيانات الآمن

-   [Data Aggregation]{.term}: تقليل عدد الحزم بدمج القراءات المتكررة
    عبر رؤوس العناقيد.
-   التحقق يتم عبر مفاتيح مؤقتة [temporary keys]{.term} مشتقة من عدّاد
    مشفَّر بمفتاح مشترك مع BS.
-   الرسائل تصعد الشجرة الثنائية وتُجمَّع تدريجيًا مع MAC متراكم في كل
    مستوى.
-   BS تبثّ المفاتيح لاحقًا للتحقق بأثر رجعي --- مبدأ [delayed
    authentication]{.term}.
:::
:::

::: {#ch9-4 .section .chapter}
::: chapter-head
::: chapter-num
٩.٤
:::

## تقسيم البيانات --- Data Partitioning
:::

::: chapter-rule
:::

إذا أرادت عقدة ما إرسال بيانات، فإن عليها تقسيم هذه البيانات إلى حزم ذات
طول ثابت. بعد ذلك، يتم إرسال كل حزمة من هذه الحزم على مسار مختلف تمامًا
عن الأخرى، حتى تصل جميعها إلى محطة القاعدة [BS]{.term} التي تتولى وحدها
إعادة تجميع هذه الحزم من جديد لإعادة بناء الرسالة الأصلية الكاملة.

الفائدة الأمنية من هذا الأسلوب واضحة: حتى يستطيع المهاجم قراءة الرسالة
كاملة، يجب عليه مراقبة الشبكة بأكملها ومختلف مساراتها في آنٍ واحد ---
وهذا أمر بالغ الصعوبة عمليًا وأكثر تعقيدًا بكثير من مجرد التنصّت على مسار
واحد.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNDIwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSIxNDAiIHI9IjE2IiBmaWxsPSIjMTYxRTMzIj48L2NpcmNsZT48dGV4dCB4PSI1MCIgeT0iMTQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjOEZFMEQzIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+QTwvdGV4dD4KICAgICAgPHRleHQgeD0iNTAiIHk9IjE3NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzU2NUY3OCIgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIj5NZXNzYWdlPC90ZXh0PgogICAgICA8cmVjdCB4PSIzMzAiIHk9IjgwIiB3aWR0aD0iNTAiIGhlaWdodD0iMzQiIHJ4PSI2IiBmaWxsPSIjMTYxRTMzIiAvPjx0ZXh0IHg9IjM1NSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOEZFMEQzIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+QlM8L3RleHQ+CiAgICAgIDxnIHN0cm9rZT0iIzBFNzY2QiIgc3Ryb2tlLXdpZHRoPSIxLjYiIGZpbGw9Im5vbmUiPgogICAgICAgIDxwYXRoIGQ9Ik02MCAxMzAgUSAxNTAgNDAgMjAwIDU1IFQgMzMwIDkyIiBtYXJrZXItZW5kPSJ1cmwoI2FtMSkiIC8+CiAgICAgIDwvZz4KICAgICAgPGcgc3Ryb2tlPSIjMkU2RjlFIiBzdHJva2Utd2lkdGg9IjEuNiIgZmlsbD0ibm9uZSI+CiAgICAgICAgPHBhdGggZD0iTTYwIDEzOCBRIDE4MCAxMzAgMjIwIDEwOCBUIDMzMCA5NyIgbWFya2VyLWVuZD0idXJsKCNhbTEpIiAvPgogICAgICA8L2c+CiAgICAgIDxnIHN0cm9rZT0iI0E4NUMxQyIgc3Ryb2tlLXdpZHRoPSIxLjYiIGZpbGw9Im5vbmUiPgogICAgICAgIDxwYXRoIGQ9Ik02MCAxNTAgUSAxNjAgMjEwIDI0MCAxODUgVCAzMzAgMTA1IiBtYXJrZXItZW5kPSJ1cmwoI2FtMSkiIC8+CiAgICAgIDwvZz4KICAgICAgPHRleHQgeD0iMTUwIiB5PSIzNSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzBFNzY2QiIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPnNlZzE8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjE4MCIgeT0iMTUwIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMkU2RjlFIiBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyI+c2VnMjwvdGV4dD4KICAgICAgPHRleHQgeD0iMTYwIiB5PSIyMDUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNBODVDMUMiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIj5zZWczPC90ZXh0PgogICAgICA8ZGVmcz48bWFya2VyIGlkPSJhbTEiIG1hcmtlcndpZHRoPSI4IiBtYXJrZXJoZWlnaHQ9IjgiIHJlZng9IjYiIHJlZnk9IjMiIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAsMCBMNiwzIEwwLDYgeiIgZmlsbD0iIzU2NUY3OCIgLz48L21hcmtlcj48L2RlZnM+CiAgICA8L3N2Zz4=)

تُقسَّم الرسالة إلى حزم ذات طول ثابت، وتُرسَل كل حزمة عبر مسار مختلف حتى تُعاد
لملمتها عند BS.
:::
:::

::: {#ch9-5 .section .chapter}
::: chapter-head
::: chapter-num
٩.٥
:::

## الحماية من هجمات حجب الخدمة --- Denial of Service
:::

::: chapter-rule
:::

يُعدّ التصدي لهجمات حجب الخدمة أمرًا بالغ الصعوبة، وذلك لقدرة المخترق على
تنفيذها في جميع طبقات البروتوكول دون استثناء. لذلك من الأنسب استعراض
وسائل الحماية الممكنة طبقةً بطبقة.

::: item-head
[Physical Layer]{.layer-tag .physical}

#### الحماية في الطبقة المحسوسة
:::

يمكن تنفيذ الهجمة هنا باستخدام التشويش الإذاعي [Radio Jamming]{.term} أو
بتخريب العقدة فيزيائيًا بشكل مباشر. يمكن التصدي للتشويش الإذاعي من خلال
تقنية **التردد المتنقل**، والتي تعمد إلى تغيير الترددات المستخدَمة في
الإرسال باستخدام تسلسل عشوائي متفَق عليه مسبقًا بين الأطراف المتواصلة
(بحيث يصعب على المشوِّش تتبع القناة الفعلية). أما لمنع تخريب العقد
فيزيائيًا، فيمكن ذلك من خلال **إخفاء العقد وتمويه مظهرها** بحيث لا يسهل
على المهاجم تحديد مواقعها أصلًا.

::: item-head
[Data-Link Layer]{.layer-tag .datalink}

#### الحماية في طبقة ربط البيانات
:::

يمكن تنفيذ الهجمة هنا من خلال تصادم [Collision]{.term} حزم البيانات، أو
الاستجواب [Interrogation]{.term}، أو إعادة إرسال الحزم بشكل مفرط. يمكن
منع تصادم الحزم من خلال إضافة شفرات تصحيح الخطأ [error correction
codes]{.term}، إلا أنه من المتوقَّع أن يؤدي ذلك إلى زيادة تكلفة الإرسال
ورفع مستوى استهلاك الطاقة. ولمنع استجواب العقد واستنزاف مواردها، يمكن
وضع حدّ لمعدَّل طلبات الإرسال المسموح بها لتمييز الفائض غير المشروع منها،
أو استخدام تقنية [Time Division Multiplexing]{.term} لمنح كل عقدة مدة
زمنية محدَّدة تستطيع الإرسال خلالها فقط.

::: item-head
[Network Layer]{.layer-tag .network}

#### الحماية في طبقة الشبكة
:::

غالبًا ما تكون بروتوكولات التوجيه نفسها هي الثغرة التي تبدأ منها هجمات
حجب الخدمة (كما رأينا في Sinkhole وBlack-hole وWormhole). يمكن منع ذلك
من خلال توظيف آليات للتحقق من هويات ومواقع العقد بدقة، إضافة إلى اتباع
نظام مراقبة تقوم من خلاله العقد بمتابعة مرور الحزم في العقد المجاورة لها
لضمان وصولها فعلًا إلى وجهتها ولم تُسقَط في الطريق.
:::

::: {#ch9-6 .section .chapter}
::: chapter-head
::: chapter-num
٩.٦
:::

## التوجيه الآمن --- Secure Routing
:::

::: chapter-rule
:::

لكي يُعتبَر بروتوكول توجيه \"آمنًا\"، يجب أن يحقق ثلاث خصائص أساسية:
**التحقق من الهوية** [Identity Verification]{.term}، و**التأكيد ثنائي
الاتجاه** [Bi-directional Confirmation]{.term}، و**الإرسال متعدد
المسارات** [Multi-path Transmission]{.term}.

تُصنَّف بروتوكولات التوجيه الآمنة إلى ثلاثة أنواع: **بروتوكولات توجيه
مستوية** [Flat-based Routing Protocols]{.term} تعطي لعقد الشبكة أدوارًا
متكافئة في عملية التوجيه، و**بروتوكولات توجيه هرمية** [Hierarchal
Routing Protocols]{.term} تعطي لعقد الشبكة أدوارًا متباينة، و**بروتوكولات
توجيه جغرافية** [Location-based Routing]{.term} توجِّه البيانات اعتمادًا
على المواقع الفعلية للعقد (كبروتوكولات GPSR وGEAR التي رأيناها سابقًا في
حلول هجوم Wormhole).

::: mini-head
CHEMAS: Checkpoint-based Multi-hop Acknowledgement Scheme
:::

هي التقنية المستخدَمة تحديدًا لكشف اعتداء [Selective Forwarding]{.term}
الموجَّه ضد التوجيه في طبقة الشبكة، والذي رأينا سابقًا أن فيه تقوم العقدة
الخبيثة بتوجيه بعض الرزم وإهمال توجيه بعضها الآخر.

تعمل هذه التقنية باختيار بعض النقاط من مسار التوجيه لتكون \"نقاط تفتيش\"
[checkpoint]{.term}، ومهمة كل نقطة تفتيش هي توليد إقرارات استلام
[acknowledgements]{.term} لكل حزمة تستقبلها. وكل عقدة تفتيش، إذا لم
تستقبل إقرارات استلام كافية من نقاط التفتيش الموجودة في اتجاه المصب
[downstream]{.term} من مسار التوجيه، تضع احتمالًا بأن فقدان الحزمة كان
بسبب عقدة مشتبَه بها. ويُقصَد بـ downstream القسم من مسار التوجيه الذي يفصل
بين عقدة التفتيش ومحطة القاعدة. وبهذه الطريقة، تستطيع العقدة التي أرسلت
الرسالة الأصلية جمع معلومات عن هوية وموقع العقدة المشتبَه بها من نقاط
التفتيش المختلفة.

::: diagram
![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNjQwIDE3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgPGxpbmUgeDE9IjYwIiB5MT0iOTAiIHgyPSI1ODAiIHkyPSI5MCIgc3Ryb2tlPSIjRENEM0JFIiBzdHJva2Utd2lkdGg9IjIiPjwvbGluZT4KICAgICAgPHJlY3QgeD0iMTUiIHk9IjcyIiB3aWR0aD0iNTUiIGhlaWdodD0iMzYiIHJ4PSI3IiBmaWxsPSIjMTYxRTMzIiAvPjx0ZXh0IHg9IjQyIiB5PSI5NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzhGRTBEMyIgZm9udC1mYW1pbHk9IklCTSBQbGV4IE1vbm8iPkJTPC90ZXh0PgogICAgICA8cmVjdCB4PSI1NzUiIHk9IjcyIiB3aWR0aD0iNDUiIGhlaWdodD0iMzYiIHJ4PSI3IiBmaWxsPSIjMTYxRTMzIiAvPjx0ZXh0IHg9IjU5NyIgeT0iOTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM4RkUwRDMiIGZvbnQtZmFtaWx5PSJJQk0gUGxleCBNb25vIj5TPC90ZXh0PgogICAgICA8ZyBmb250LWZhbWlseT0iSUJNIFBsZXggTW9ubyIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzU2NUY3OCI+CiAgICAgICAgPGNpcmNsZSBjeD0iMTIwIiBjeT0iOTAiIHI9IjEwIiBmaWxsPSIjMEU3NjZCIj48L2NpcmNsZT48dGV4dCB4PSIxMjAiIHk9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+dTk8L3RleHQ+CiAgICAgICAgPGNpcmNsZSBjeD0iMTg1IiBjeT0iOTAiIHI9IjgiIGZpbGw9IiM4ODkwQTQiPjwvY2lyY2xlPjx0ZXh0IHg9IjE4NSIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj51ODwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSIyNTAiIGN5PSI5MCIgcj0iOCIgZmlsbD0iIzg4OTBBNCI+PC9jaXJjbGU+PHRleHQgeD0iMjUwIiB5PSIxMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnU3PC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjMxNSIgY3k9IjkwIiByPSIxMyIgZmlsbD0iI0E2MzM1QSI+PC9jaXJjbGU+PHRleHQgeD0iMzE1IiB5PSIxMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNBNjMzNUEiIGZvbnQtd2VpZ2h0PSI3MDAiPnU2IOKclTwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSIzODAiIGN5PSI5MCIgcj0iOCIgZmlsbD0iIzg4OTBBNCI+PC9jaXJjbGU+PHRleHQgeD0iMzgwIiB5PSIxMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnU1PC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjQ0NSIgY3k9IjkwIiByPSIxMCIgZmlsbD0iIzBFNzY2QiI+PC9jaXJjbGU+PHRleHQgeD0iNDQ1IiB5PSIxMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnU0PC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjUwMCIgY3k9IjkwIiByPSI4IiBmaWxsPSIjODg5MEE0Ij48L2NpcmNsZT48dGV4dCB4PSI1MDAiIHk9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+dTM8L3RleHQ+CiAgICAgICAgPGNpcmNsZSBjeD0iNTQwIiBjeT0iOTAiIHI9IjgiIGZpbGw9IiM4ODkwQTQiPjwvY2lyY2xlPjx0ZXh0IHg9IjU0MCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj51MjwvdGV4dD4KICAgICAgPC9nPgogICAgICA8cGF0aCBkPSJNMTIwIDc4IEMgMTUwIDQwLCA4MCAzMCwgNDIgNzIiIHN0cm9rZT0iIzBFNzY2QiIgc3Ryb2tlLXdpZHRoPSIxLjQiIGZpbGw9Im5vbmUiIG1hcmtlci1lbmQ9InVybCgjYWNrMSkiIC8+CiAgICAgIDxwYXRoIGQ9Ik00NDUgNzggQyAzMDAgMjAsIDE2MCAyMCwgMTIyIDgyIiBzdHJva2U9IiMwRTc2NkIiIHN0cm9rZS13aWR0aD0iMS40IiBmaWxsPSJub25lIiBtYXJrZXItZW5kPSJ1cmwoI2FjazEpIiAvPgogICAgICA8dGV4dCB4PSIzMDAiIHk9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMEU3NjZCIiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiPkFDSzwvdGV4dD4KICAgICAgPGRlZnM+PG1hcmtlciBpZD0iYWNrMSIgbWFya2Vyd2lkdGg9IjgiIG1hcmtlcmhlaWdodD0iOCIgcmVmeD0iNiIgcmVmeT0iMyIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCwwIEw2LDMgTDAsNiB6IiBmaWxsPSIjMEU3NjZCIiAvPjwvbWFya2VyPjwvZGVmcz4KICAgICAgPHRleHQgeD0iMzE1IiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iI0E2MzM1QSIgZm9udC1mYW1pbHk9IklCTSBQbGV4IFNhbnMgQXJhYmljIj51Njog2LnZgtiv2Kkg2YXYrtiq2LHZjtmC2Kkg4oCUINmE2Kcg2KrZj9ix2LPZkNmEIEFDSyDZgdiq2YbZg9i02YE8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjIyMCIgeT0iMTYzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNTY1Rjc4IiBmb250LWZhbWlseT0iSUJNIFBsZXggU2FucyBBcmFiaWMiPnU02IwgdTbYjCB1OSDZh9mKINmG2YLYp9i3INin2YTYqtmB2KrZiti0IChjaGVja3BvaW50cykg2KfZhNmF2K7Yqtin2LHYqSDZgdmKINmH2LDYpyDYp9mE2YXYq9in2YQ8L3RleHQ+CiAgICA8L3N2Zz4=)

مثال Multi-hop Acknowledgement --- انقطاع سلسلة الـ ACK القادمة من اتجاه
u6 يكشف اشتباهًا بها.
:::

تتميّز تقنية CHEMAS بخاصية **ربط الهوية بالموقع** [Location-binding node
ID]{.term}، أي أن بإمكان أي عقدتين في الشبكة تكوين مفتاح جلسة [session
key]{.term} فيما بينهما، لأن كل واحدة منهما تعرف الـ ID الخاص بالأخرى،
كما يمكن اشتقاق الموقع الجغرافي الفعلي للعقدة مباشرة من الـ ID الخاص
بها.

أنواع رزم البيانات المتبادَلة في CHEMAS

تعرِّف تقنية CHEMAS ثلاثة أنواع من رزم البيانات المتبادَلة فيما بينها:

**رزمة الحدث** [event packet format]{.term}، وهي الرزمة التي تتولَّد عند
حدوث شيء ما في الوسط المراقَب. تتولَّد حقول DstID وSrcID وPacket_ID من قبل
بروتوكولات التوجيه [routing protocols]{.term} نفسها، بينما يحدِّد حقل
Checkpoint_Seed ما هي نقاط التفتيش المختارة من بين جميع النقاط الوسيطة
التي ستمر عبرها الرزمة.

::: field-row
::: field
DstID[2 بايت]{.small}
:::

::: field
SrcID[2 بايت]{.small}
:::

::: field
Packet_ID[2 بايت]{.small}
:::

::: {.field style="min-width:120px;"}
Payload[50 بايت]{.small}
:::

::: field
Checkpoint_Seed[2 بايت]{.small}
:::
:::

**رزمة إقرار الاستلام** [ACK packets]{.term}، تُولِّد كل عقدة تفتيش هذه
الرسالة عند استلامها للرزمة، وترسلها إلى العقدة التي جاءت الرزمة عن
طريقها، قفزةً بقفزة [hop-by-hop]{.term}. يحدِّد حقل Packet_ID الرزمة
المستقبَلة، وNode_ID يحدِّد نقطة التفتيش التي ولَّدت رسالة ACK هذه، أما
MAC~OHC~ وOHC_number فيُستخدَمان في بروتوكول بث موثوق [authenticated
broadcast protocol]{.term} مثل μTESLA الذي رأيناه سابقًا. وحقل TTL يحدِّد
عدد نقاط التفتيش [checkpoint nodes]{.term} التي ستمر بها الحزمة قبل أن
تُرمى نهائيًا.

::: field-row
::: field
Packet_ID[2 بايت]{.small}
:::

::: field
Node_ID[2 بايت]{.small}
:::

::: field
OHC_number[2 بايت]{.small}
:::
:::

::: field-row
::: {.field style="min-width:100px;"}
MAC~OHC~[4 بايت]{.small}
:::

::: field
TTL[1 بايت]{.small}
:::
:::

**رزمة الإنذار** [Alert packets]{.term}، تتولَّد هذه الرسالة عند اكتشاف
نقاط التفتيش لعقدة مشبوهة، ويتم إرسالها إلى العقدة المصدر [source
node]{.term} أو إلى محطة القاعدة [base station]{.term} مباشرة.

::: field-row
::: field
DstID[2 بايت]{.small}
:::

::: field
SrcID[2 بايت]{.small}
:::

::: {.field style="min-width:110px;"}
Suspect_Node_ID[2 بايت]{.small}
:::
:::

::: field-row
::: {.field style="min-width:110px;"}
Lost_Packet_ID[2 بايت]{.small}
:::

::: field
MAC[4 بايت]{.small}
:::
:::

تواجه هذه الخوارزمية تحدّيين رئيسيَّين عند التنفيذ: **الأول** هو كيفية
اختيار العقد التي ستكون نقاط تفتيش، و**الثاني** هو كيفية اختيار k وهو
عدد الأجزاء [segments]{.term} التي سيُقسَّم إليها المسار --- ونُعرِّف الـ
segment بأنه مجموعة العقد الواقعة بين نقطتَي تفتيش متتاليتين.

::: summary-box
##### ◆ ملخص سريع --- التوجيه الآمن

-   خصائص بروتوكول التوجيه الآمن: Identity Verification + Bi-directional
    Confirmation + Multi-path.
-   التصنيف: Flat-based / Hierarchical / Location-based Routing.
-   [CHEMAS]{.term}: يكشف Selective Forwarding عبر نقاط تفتيش تولِّد ACK،
    وانقطاع سلسلتها يكشف عقدة مشتبَهًا بها.
-   ثلاث رزم: Event Packet (عند الحدث)، ACK Packet (من كل checkpoint)،
    Alert Packet (عند اكتشاف الاشتباه).
-   تحدّيا التنفيذ: اختيار نقاط التفتيش، واختيار عدد الأجزاء k.
:::
:::

::: {#ch9-7 .section .chapter}
::: chapter-head
::: chapter-num
٩.٧
:::

## آليات إخفاء هوية المرسل --- Source Anonymity
:::

::: chapter-rule
:::

الحفاظ على سرّية مصدر البيانات [source anonymity]{.term} أمر في غاية
الأهمية، وخصوصًا في التطبيقات الحربية والعسكرية، حيث قد يكون مجرد معرفة
\"من الذي أرسل\" أخطر من معرفة \"ماذا أرسل\".

المشكلة أن **التشفير التقليدي وحده لا يفي بالغرض**؛ فهو يشفِّر محتوى
الرسالة فقط، لكن مجرد وجود رسالة مشفَّرة تُرسَل من عقدة معيّنة هو بحد ذاته
دلالة على أن تلك العقدة تنقل معلومة مهمة الآن --- وهذا كافٍ لكشف مصدر
المعلومة حتى دون فك تشفيرها.

الحل الأولي المقترَح كان برمجة العقد لنقل **رسائل وهمية** [fake
messages]{.term} باستمرار، حتى لو لم تكن هناك أحداث حقيقية للإبلاغ عنها،
بحيث يمكن للرسالة الحقيقية أن تكون \"مضمَّنة\" ضمن هذا الضجيج من الرسائل
الوهمية فيصعب تمييزها.

لكن توجد ثغرة في هذا الحل: فلو تم إرسال الرسالة فور وقوع الحدث فعلًا، فإن
المهاجم --- بجدولته للرسائل المزيَّفة وفق توزيع احتمالي مؤكَّد [certain
probabilistic distribution]{.term} يعرفه مسبقًا --- يستطيع، عبر التحليل
الإحصائي [statistical analysis]{.term}، تمييز الرسالة التي تحمل معلومة
حقيقية عن باقي الرسائل الوهمية، ومن ثم تحديد مصدرها الفعلي.

لذلك عُدِّل الحل ليصبح: تُبرمَج العقد بحيث ترسل رسالة مشفَّرة واحدة في كل دقيقة
بانتظام تام. فإن وقع حدث حقيقي قبل انقضاء الدقيقة، يتم تأخير إرساله حتى
تنتهي الدقيقة كاملة؛ وإن انقضت الدقيقة دون وقوع أي حدث حقيقي، تُرسَل رسالة
مزيَّفة بدلًا منه --- وبذلك يبدو نمط الإرسال ثابتًا تمامًا للمراقِب الخارجي
بغضّ النظر عمّا إذا كانت الرسالة حقيقية أم وهمية.

غير أن هذا الحل يحمل عيبًا رئيسيًا وهو **تأخير نقل الأحداث** حتى حلول موعد
الدقيقة التالية، وهو أمر غير مقبول إطلاقًا في التطبيقات التي يكون فيها
عامل الزمن حرجًا. كما أن زيادة تواتر الإرسال إلى أقل من دقيقة (لتقليل
التأخير) يشكِّل عبئًا إضافيًا على العقد المحدودة الطاقة أصلًا. لذلك، عند
تصميم أي حل لمشكلة الـ source anonymity، يجب مراعاة أمرين متعارضين في آنٍ
واحد: **تأخير قليل** مع **الحفاظ على طاقة البطارية**.

::: mini-head
التصاميم الحديثة --- Current State-of-the-Art Designs
:::

مبدأ عمل هذا التصميم الأحدث هو برمجة العقد كذلك بحيث ترسل رسائل مزيَّفة
تبعًا لتوزيع احتمالي محدَّد مسبقًا عند غياب أي أحداث حقيقية. لكن الفارق
الجوهري هو أنه بدلًا من تأخير إرسال الأحداث الحقيقية حتى موعد ثابت، يتم
إرسالها بأسرع ما يمكن فور وقوعها، شريطة تحقيق الشرط التالي: أن يكون
**التوزيع الاحتمالي لإرسال الرسائل الحقيقية والوهمية معًا مطابقًا** على
غرار التوزيع الاحتمالي لإرسال الرسائل المزيَّفة فقط --- أي أن نمط الإرسال
الكلي يبقى إحصائيًا متطابقًا سواء وُجد حدث حقيقي أم لا، دون فرض تأخير ثابت.

::: summary-box
##### ◆ ملخص سريع --- إخفاء هوية المرسل

-   التشفير وحده لا يخفي \"من يرسل\"، بل \"ماذا يُرسَل\" فقط.
-   الحل الأول: رسائل وهمية كل دقيقة بانتظام + تأخير الحدث الحقيقي حتى
    حلول الموعد --- يحل مشكلة التحليل الإحصائي لكن يفرض تأخيرًا.
-   الحل الحديث: إرسال فوري للحدث الحقيقي، مع مطابقة التوزيع الاحتمالي
    الكلي لتوزيع الرسائل الوهمية وحدها.
-   الموازنة المطلوبة دومًا: تأخير قليل + استهلاك طاقة منخفض.
:::
:::

::: {#ch10 .section .chapter}
Intrusion Detection

::: chapter-head
::: chapter-num
١٠
:::

## كشف الاختراقات الأمنية في شبكات الاستشعار اللاسلكية
:::

::: chapter-rule
:::

بعد استعراض آليات الوقاية والحماية، يبقى السؤال: كيف تكتشف الشبكة أن
اختراقًا قد وقع فعلًا رغم كل هذه الإجراءات؟ توجد طريقتان أساسيتان للكشف عن
الاختراقات الأمنية.

**النهج المركزي**: تتولى فيه محطة القاعدة [base station]{.term} وحدها
مسؤولية الكشف عن الاختراق، ومن ثم تحديد الآليات اللازمة للتعافي منه ومنع
تكراره مستقبلًا. من سلبيات هذه الطريقة أنها تسبب زيادة كبيرة في كثافة
حركة البيانات المتجهة نحو محطة القاعدة المركزية، لأن كل معلومات المراقبة
يجب أن تصل إليها أولًا.

**النهج الموزَّع**: تشترك فيه جميع عقد الشبكة في عملية اكتشاف الاختراق
بشكل جماعي، وفي حال تأكّد وجوده، يتم الاتصال بالعقدة المركزية لإجراء
التعديلات اللازمة على جغرافية الشبكة ومعلومات التوجيه.

هناك مفارقة مهمة يجب الانتباه لها: إن استهلاك موارد العقد بفعل الآليات
الأمنية نفسها (التشفير، المراقبة المستمرة، توليد الإنذارات\...) قد يؤدي
بحد ذاته إلى حالة من حجب الخدمة **غير المقصودة** في الشبكة، وهذا ما يُعرَف
بـ [Security Service Denial of Service]{.term} --- أي أن المبالغة في
التشديد الأمني قد \"تخنق\" الشبكة كما يفعل هجوم DoS حقيقي تمامًا، رغم أن
النية هنا دفاعية بالكامل.

يوجد نوعان من تكاليف الطاقة المصاحبة لتنفيذ أي آلية أمنية: **تكاليف
ثابتة** وهي الطاقة المستهلَكة في حالة \"الترقّب\" المستمر لأي اختراقات
ممكنة (حتى في غياب أي هجوم فعلي)، و**تكاليف متغيّرة** وهي الطاقة اللازمة
فعليًا لتخفيف الأثر الواقع على معلومات التوجيه داخل الشبكة عند وقوع
اختراق حقيقي.

::: mini-head
مقاييس تقييم الحلول الأمنية
:::

لتقييم أي حل أمني مقترَح لشبكات الحساسات اللاسلكية، يمكن الاستناد إلى عدة
مقاييس: **المرونة** في التعامل مع أنواع مختلفة من التهديدات، **استخدام
الطاقة بفاعلية** دون هدر، **التكيّف مع الأعطال** [Fault Tolerance]{.term}
بحيث لا ينهار الحل عند فشل عقدة واحدة، **القابلية للاتساع**
[Scalability]{.term} بحيث يبقى الحل فعّالًا حتى مع تضاعف عدد العقد،
و**الشفاء الذاتي** [Self-Healing]{.term} أي قدرة الشبكة على استعادة
عملها الطبيعي دون تدخل يدوي بعد وقوع الاختراق.

::: summary-box
##### ◆ ملخص سريع --- كشف الاختراقات

-   نهج مركزي (BS تكتشف وتقرر) مقابل نهج موزَّع (كل العقد تشارك في
    الاكتشاف).
-   [Security Service Denial of Service]{.term}: الآليات الأمنية نفسها
    قد تستنزف الموارد وتسبب حجب خدمة غير مقصود.
-   تكاليف الطاقة: ثابتة (ترقّب دائم) ومتغيّرة (تخفيف أثر اختراق فعلي).
-   مقاييس التقييم: المرونة، فعالية الطاقة، Fault Tolerance،
    Scalability، Self-Healing.
:::
:::

::: {#ch11 .section .chapter}
Conclusion

::: chapter-head
::: chapter-num
١١
:::

## الخاتمة
:::

::: chapter-rule
:::

إن تصميم الحلول الأمنية الخاصة بشبكات الحساسات اللاسلكية ليس بالأمر
السهل على الإطلاق، وخصوصًا في ظل الطبيعة العشوائية لانتشار هذه الشبكات،
والاتصالات اللاسلكية المعروفة أصلًا بثغراتها الأمنية المتأصلة، إضافة إلى
محدودية الموارد الحادة التي تميّز كل عقدة فيها.

عند التفكير بالنواحي الأمنية لشبكات الاستشعار اللاسلكية، لا بد من العمل
الدائم على تحقيق **توازن دقيق** بين كلفة تشغيل الآليات الأمنية من جهة،
وكلفة تشغيل بقية وظائف الشبكة الأساسية من جهة أخرى --- فحماية مبالغ فيها
قد تُهدر الطاقة وتُعطِّل الشبكة بقدر ما يفعل المهاجم نفسه.

ومما لا شك فيه أن هناك حاجة ملحّة ومستمرة لتطوير بروتوكولات وتقنيات أمنية
جديدة، تعمل بكفاءة ضمن الموارد المحدودة لهذه الشبكات، دون أن تستنزفها
بشكل يُفرغ الحماية من جدواها.
:::
:::

اللهم صلِّ وسلم على سيدنا محمد.

اللهم ارزقنا التوفيق والنجاح.
