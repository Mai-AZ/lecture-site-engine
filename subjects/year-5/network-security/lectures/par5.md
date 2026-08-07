::: {#progressBar}
[]{#progressFill}
:::

::: topnav
::: nav-inner
::: brand
[]{.dot} أمن الطبقة الثانية
:::

[نظرة عامة](#overview) [وظائف المبدل](#switch-basics) [STP](#stp) [خريطة
الهجمات](#attacks-map) [هجمات MAC/CAM](#mac-attacks) [هجمات
STP](#stp-attacks) [هجمات VLAN](#vlan-attacks) [هجمات
DHCP](#dhcp-attacks) [هجمات ARP](#arp-attacks) [منظومة
الدفاع](#defense-stack) [قاموس المصطلحات](#glossary) [تركيز
الامتحان](#examfocus)

::: search-wrap
![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjciPjwvY2lyY2xlPjxsaW5lIHgxPSIyMSIgeTE9IjIxIiB4Mj0iMTYuNjUiIHkyPSIxNi42NSI+PC9saW5lPjwvc3ZnPg==)
:::

![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdib3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiPjxsaW5lIHgxPSIzIiB5MT0iNiIgeDI9IjIxIiB5Mj0iNiI+PC9saW5lPjxsaW5lIHgxPSIzIiB5MT0iMTIiIHgyPSIyMSIgeTI9IjEyIj48L2xpbmU+PGxpbmUgeDE9IjMiIHkxPSIxOCIgeDI9IjIxIiB5Mj0iMTgiPjwvbGluZT48L3N2Zz4=)
:::

::: {#mobileNav}
[نظرة عامة](#overview) [وظائف المبدل](#switch-basics) [STP](#stp) [خريطة
الهجمات](#attacks-map) [هجمات MAC/CAM](#mac-attacks) [هجمات
STP](#stp-attacks) [هجمات VLAN](#vlan-attacks) [هجمات
DHCP](#dhcp-attacks) [هجمات ARP](#arp-attacks) [منظومة
الدفاع](#defense-stack) [قاموس المصطلحات](#glossary) [تركيز
الامتحان](#examfocus)
:::
:::

::: {.section .hero}
::: hero-inner
::: eyebrow
CNS · Lecture 5 · د. منال العمر
:::

# أمن مبدلات الطبقة الثانية Layer 2 Switches Security

مراجعة سريعة وشاملة قبل الامتحان: كيف يعمل المبدل، أين تكمن نقاط الضعف
في الطبقة الثانية، وما هي آليات الهجوم والدفاع الأساسية على CAM، STP،
VLAN، DHCP، و ARP.

::: hero-meta
📘 جامعة حمص --- هندسة معلوماتية 🎓 السنة الخامسة 2025/2026 ⏱ وقت مراجعة
تقديري: 30-40 دقيقة
:::
:::

![](data:image/svg+xml;base64,PHN2ZyBjbGFzcz0icGFja2V0LWZsb3ciIHZpZXdib3g9IjAgMCAxMjAwIDEzMCIgcHJlc2VydmVhc3BlY3RyYXRpbz0ibm9uZSI+CiAgICA8bGluZSB4MT0iMCIgeTE9IjY1IiB4Mj0iMTIwMCIgeTI9IjY1IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsLjA2KSIgc3Ryb2tlLXdpZHRoPSIxIj48L2xpbmU+CiAgICA8Y2lyY2xlIHI9IjQiIGZpbGw9IiMwNkI2RDQiPjxhbmltYXRlbW90aW9uIGR1cj0iNHMiIHJlcGVhdGNvdW50PSJpbmRlZmluaXRlIiBwYXRoPSJNMCw2NSBRMzAwLDIwIDYwMCw2NSBUMTIwMCw2NSI+PC9hbmltYXRlbW90aW9uPjwvY2lyY2xlPgogICAgPGNpcmNsZSByPSI0IiBmaWxsPSIjMjU2M0VCIj48YW5pbWF0ZW1vdGlvbiBkdXI9IjVzIiBiZWdpbj0iMXMiIHJlcGVhdGNvdW50PSJpbmRlZmluaXRlIiBwYXRoPSJNMCw2NSBRMzAwLDExMCA2MDAsNjUgVDEyMDAsNjUiPjwvYW5pbWF0ZW1vdGlvbj48L2NpcmNsZT4KICAgIDxjaXJjbGUgcj0iMyIgZmlsbD0iIzVFRUFENCI+PGFuaW1hdGVtb3Rpb24gZHVyPSI2cyIgYmVnaW49IjJzIiByZXBlYXRjb3VudD0iaW5kZWZpbml0ZSIgcGF0aD0iTTAsNjUgUTMwMCwzMCA2MDAsNjUgVDEyMDAsNjUiPjwvYW5pbWF0ZW1vdGlvbj48L2NpcmNsZT4KICA8L3N2Zz4=){.packet-flow}
:::

::: {#pageContent role="main"}
::: {#overview .section .block}
::: section-head
::: section-num
00
:::

<div>

## لماذا نهتم بأمن الطبقة الثانية؟

::: section-sub
Why Worry About Layer 2 Security?
:::

</div>
:::

::: card
::: {.note .def}
[💡]{.note-icon}

<div>

**الفكرة الجوهرية:** نموذج OSI صُمم بحيث تعمل الطبقات بشكل مستقل عن
بعضها. المشكلة: إذا تم اختراق طبقة واحدة (مثل Data Link)، فإن الطبقات
الأعلى (Network, Transport, Application) [لا تدرك]{.key} وجود الاختراق
وتستمر بالثقة بالبيانات المستلمة.

</div>
:::

لذلك فإن قوة الأمان الكلي (Security) تعتمد دائماً على أضعف حلقة في
النظام. ولأن **Layer 2 Switching** ينقل الإطارات (Frames) مباشرة داخل
الشبكة المحلية، فهو غالباً أضعف الحلقات الأمنية، مما يجعله هدفاً شائعاً
لهجمات الشبكات.
:::

::: toc-grid
[](#mac-attacks){.toc-card}

::: tnum
01
:::

#### CAM Table Attacks

هجمات جدول عناوين MAC (إغراق الجدول)

[](#stp-attacks){.toc-card}

::: tnum
02
:::

#### STP Attacks

انتحال هوية الجذر Root Bridge

[](#vlan-attacks){.toc-card}

::: tnum
03
:::

#### VLAN Attacks

القفز بين الشبكات الوهمية

[](#dhcp-attacks){.toc-card}

::: tnum
04
:::

#### DHCP Attacks

الاستنزاف والانتحال

[](#arp-attacks){.toc-card}

::: tnum
05
:::

#### ARP Attacks

تسميم جدول ARP

[](#defense-stack){.toc-card}

::: tnum
06
:::

#### Defense Stack

Port Security, DAI, IPSG
:::
:::

::: {#switch-basics .section .block}
::: section-head
::: section-num
01
:::

<div>

## الوظائف الثلاث للمبدل

::: section-sub
Three Switch Functions at Layer 2
:::

</div>
:::

1️⃣ تعلّم العنوان --- Address Learning

::: collapse-body
تتعلم مبدلات الطبقة الثانية ([Layer 2 switches]{.term}) عناوين
[MAC]{.term} من خلال فحص **عنوان المصدر** في كل إطار يتلقونه.

::: {.note .def}
[📋]{.note-icon}

<div>

**CAM Table** [(جدول التوجيه/الفلترة)]{.term-ar}\
يشير مصطلح [CAM Table]{.term} إلى [Content Addressable Memory]{.term}
[(الذاكرة القابلة للعنونة بالمحتوى)]{.term-ar}، وهو جدول يُستخدم لتخزين
عناوين MAC الموجودة على المنافذ مع معلومات VLAN المرتبطة بها.

</div>
:::

::: {.note .warn}
[⚠️]{.note-icon}

<div>

**CAM Tables تمتلك حجماً ثابتاً ومحدوداً**، لذلك يمكن أن تصبح عرضة لبعض
الهجمات عند امتلائها (أساس هجوم MAC Flooding لاحقاً).

</div>
:::
:::

2️⃣ قرارات التوجيه --- Forward Decisions

::: collapse-body
-   عندما يستلم المبدل إطاراً على واجهة معينة، ينظر إلى عنوان الجهاز
    الوجهة ويبحث عن واجهة الخروج في قاعدة بيانات CAM.
-   يتم توجيه الإطار فقط إلى المنفذ المحدد للوجهة.
-   **إذا كان الجدول فارغاً** (بعد تشغيل السويتش) أو **لم يكن العنوان
    موجوداً**: يرسل السويتش الإطار إلى [جميع المنافذ باستثناء منفذ
    المصدر]{.key} (Flooding).
-   عناوين MAC يتم حذفها تلقائياً بعد انتهاء صلاحيتها: [MAC address age
    out]{.term}
:::

3️⃣ تجنّب الحلقات --- Loop Avoidance

::: collapse-body
الروابط الزائدة (Redundant Links) بين المبدلات تمنع فشل الشبكة الكامل
عند تعطل رابط واحد. لكن هذا قد يُنشئ **حلقات شبكية (Loops)** تجعل
المبدلات تبث الإطارات (Broadcasts) بلا نهاية.

::: {.note .danger}
[🌪️]{.note-icon}

<div>

[Broadcast Storm]{.term} [(عاصفة البث)]{.term-ar} --- الاسم الشائع لهذه
الظاهرة الكارثية.

</div>
:::

::: {.note .safe}
[✅]{.note-icon}

<div>

[Spanning Tree Protocol (STP)]{.term} يُستخدم لمنع حلقات الشبكة مع السماح
بالاحتياطية (Redundancy).

</div>
:::
:::
:::

::: {#stp .section .block}
::: section-head
::: section-num
02
:::

<div>

## بروتوكول الشجرة الممتدة

::: section-sub
STP --- Spanning Tree Protocol
:::

</div>
:::

::: card
### أهمية STP

يمنع مشكلة **L2 Loop** التي قد تُوقف الشبكة بالكامل. يعمل فقط داخل الشبكة
المحلية (LAN) ولا يمتد خارجها، وهو من بروتوكولات [Data Link
Layer]{.term}.

::: {.note .def}
[🔁]{.note-icon}

<div>

وجود Loop في تصميم الشبكة قد يكون **متعمداً** (لتوفير Redundancy) أو
نتيجة **خطأ غير متعمد**.

</div>
:::
:::

::: card
### كيف يعمل STP؟ [آلية العمل]{.tag}

::: steps
::: {.step n="1"}
::: step-body
يعمل البروتوكول عبر رسائل تُرسل بين المبدلات تسمى [BPDU]{.term} [(Bridge
Protocol Data Unit)]{.term-ar}
:::
:::

::: {.step n="2"}
::: step-body
اختيار **Root Switch**: كل مبدل لديه رقم يُسمى [Priority]{.term} يمتد من
0 وحتى 65535.
:::
:::

::: {.step n="3"}
::: step-body
المبدل صاحب **أقل Priority** يصبح الـ Root. إذا تساوت القيم، يُختار صاحب
**أقل MAC Address**.
:::
:::

::: {.step n="4"}
::: step-body
عند وجود أكثر من رابط بين مبدلين، يُشغّل STP رابطاً ويُعطّل الآخر لمنع حدوث
[Loop]{.term}.
:::
:::
:::
:::
:::

::: {#attacks-map .section .block}
::: section-head
::: section-num
03
:::

<div>

## خريطة هجمات المبدلات

::: section-sub
Switch Attack Categories
:::

</div>
:::

::: card
تصنف هجمات الطبقة الثانية ([Layer 2 Attacks]{.term}) ضمن ست فئات رئيسية:

::: glossary-grid
::: gcard
[CAM Table Attacks]{.gterm}

::: gdef
هجمات جدول MAC (إغراق)
:::
:::

::: gcard
[STP Attacks]{.gterm}

::: gdef
التلاعب ببروتوكول الشجرة الممتدة
:::
:::

::: gcard
[VLAN Attacks]{.gterm}

::: gdef
القفز بين الشبكات الوهمية
:::
:::

::: gcard
[Address Spoofing Attacks]{.gterm}

::: gdef
تزييف عنوان MAC
:::
:::

::: gcard
[DHCP Attacks]{.gterm}

::: gdef
الاستنزاف والانتحال
:::
:::

::: gcard
[ARP Attacks]{.gterm}

::: gdef
تسميم بروتوكول ARP
:::
:::
:::
:::
:::

::: {#mac-attacks .section .block}
::: section-head
::: section-num
04
:::

<div>

## تزييف العنوان وإغراق جدول CAM

::: section-sub
MAC Address Spoofing & CAM Table Overflow
:::

</div>
:::

::: card
### MAC Address Spoofing [تزييف عنوان MAC]{.tag}

عملية يغيّر فيها المستخدم أو البرنامج عنوان MAC الحقيقي للجهاز إلى عنوان
آخر مزيف، بهدف **إخفاء هوية الجهاز** أو التظاهر بأنه جهاز آخر على
الشبكة.

::: {.note .warn}
[⚠️]{.note-icon}

<div>

**مخاطر التزييف:**

-   **الهجمات والتسلل:** اختراق الشبكات أو التظاهر بأجهزة موثوقة.
-   **انتهاك الخصوصية:** إخفاء الهوية أو التمويه على الشبكة.
-   **مشاكل إدارة الشبكة:** تعارض العناوين أو اضطرابات الاتصال.

</div>
:::
:::

::: card
### MAC Address Table Overflow Attack [هجوم إغراق جدول CAM]{.tag}

يولّد المهاجم عدداً كبيراً من الحزم باستخدام عناوين MAC **مزوّرة** للمصدر.
خلال فترة زمنية قصيرة يمتلئ جدول CAM ولا يقبل إدخالات جديدة صالحة.

::: {.note .danger}
[💥]{.note-icon}

<div>

**تأثيران سلبيان ينتجان عن ذلك:**

-   توجيه حركة المرور عبر المبدل يصبح **غير فعّال** (المبدل يتصرف مثل Hub
    ويبث لكل المنافذ).
-   جهاز متطفل يمكنه الاتصال بأي منفذ والتقاط حركة مرور **لا يراها
    عادةً**.

</div>
:::
:::

::: pair-grid
::: {.pair-card .attack}
::: ptitle
🎯 الهجوم --- Attack
:::

إغراق جدول CAM بعناوين MAC وهمية (مثال: 132,000 Bogus MAC) لملء ذاكرة
السويتش المحدودة.
:::

::: {.pair-card .defense}
::: ptitle
🛡️ الحل --- Port Security
:::

-   تحديد عناوين MAC يدوياً لواجهة معينة
-   أو السماح بتعلم عدد محدود من العناوين ديناميكياً
-   يحد من الفيضان (Flooding) ويقفل المنفذ ويُرسل SNMP trap
:::
:::

::: {.note .warn}
[🔓]{.note-icon}

<div>

**محدودية Port Security:** عناوين MAC سهلة التزوير جداً. قد يجلب شخص جهاز
توجيه لاسلكي (Wireless Router) يقوم بعمل NAT، فيرى المبدل عنوان MAC واحد
فقط، مما يصعّب الاكتشاف. الحل الإضافي: [Port-based
Authentication]{.term}.

</div>
:::
:::

::: {#dot1x .section .block}
::: card
### Port-Based Authentication (802.1X) [تحقق من الهوية عبر المنفذ]{.tag}

يعتمد على معيار [IEEE 802.1x]{.term} --- المعيار الخاص بالتحكم بالوصول
إلى الشبكة المعتمد على البورت: [IEEE Standard for Port-based Network
Access Control (PNAC)]{.term}.

::: {.note .def}
[🔒]{.note-icon}

<div>

عند التفعيل، **لن يقوم منفذ المبدل بنقل أي حركة مرور** حتى يتم التحقق من
هوية المستخدم بنجاح.

</div>
:::

### أدوار 802.1X [802.1X Roles]{.tag} {#أدوار-802.1x-802.1x-roles .mt}

::: table-wrap
  العنصر                            الدور
  --------------------------------- ------------------------------------------------------------------------------------
  [Client (Supplicant)]{.term}      الجهاز الذي يطلب الوصول لخدمات الشبكة، ثم يرد على طلبات المبدلة.
  [Switch (Authenticator)]{.term}   يتحكم بالوصول المادي بناءً على حالة المصادقة؛ يعمل كوسيط بين العميل وخادم المصادقة.
  [Authentication Server]{.term}    ينفذ عملية المصادقة الفعلية ويُعلم المبدلة إن كان العميل مخوّلاً.
:::

بروتوكول النقل: [EAPOL]{.term} [(EAP over LAN)]{.term-ar} --- بروتوكول
من الطبقة الثانية.

نوعا خوادم المصادقة: [RADIUS]{.term} (بروتوكول موحّد من IETF) و
[TACACS+]{.term} (مملوك لشركة Cisco).
:::
:::

::: {#stp-attacks .section .block}
::: section-head
::: section-num
05
:::

<div>

## هجمات STP

::: section-sub
STP Attack --- انتحال هوية Root Bridge
:::

</div>
:::

::: card
### آلية الهجوم

-   يبثّ المهاجم رسائل [BPDUs]{.term} ليعلن وجود مبدلة ذات **أولوية
    أصغر**، بهدف إعادة انتخاب المبدلة الجذر.
-   إعادة انتخاب الجذر بحد ذاتها تسبب [Denial of Service (DoS)]{.term}
    لأن بناء الشجرة الجديدة يحتاج من **30 إلى 45 ثانية** في كل مرة تتغير
    فيها.
-   إذا نجح الهجوم، يصبح المهاجم **Root Bridge** ويصل إلى إطارات غير
    متاحة له عادةً --- يمهّد الطريق لهجمات [Man-In-The-Middle
    (MITM)]{.term}.

::: en
Send BPDU messages to become root bridge
:::
:::

::: exam-box
### 🎯 نقطة مهمة للامتحان

-   هجوم STP ينجح لأن المبدل يحسب التكلفة والمسارات دائماً من منظور
    المبدل الجذري (Root Bridge Perspective).
-   النتيجة النهائية: انهيار أداء الشبكة بالكامل حتى في شبكات ذات سرعة
    Gigabit.
:::

### Mitigating STP Manipulation --- كيفية التصدي {#mitigating-stp-manipulation-كيفية-التصدي .mt style="color:var(--navy); margin-bottom:12px;"}

::: pair-grid
::: {.pair-card .defense}
::: ptitle
⚡ PortFast
:::

-   ينقل المنفذ مباشرة إلى حالة [Forwarding]{.term-ar} متجاوزاً زمن
    التقارب (Convergence Time)
-   يُستخدم فقط على المنافذ الطرفية المتصلة بأجهزة PCs
-   **يُحظر تفعيله** على منافذ متصلة بمبدلات أخرى (خطر تكوين Loop)
-   ملاحظة: PortFast ليست تقنية أمان بل تسريع أداء
:::

::: {.pair-card .defense}
::: ptitle
🚫 BPDU Guard
:::

-   يمنع المنفذ من استقبال أي رسالة BPDU
-   عند استلام BPDU: يتحول المنفذ لحالة [err-disable]{.term} (إغلاق
    كامل)
-   إذا أعيد تشغيل المنفذ ولا يزال المبدل المخالف متصلاً، يعود المنفذ
    فوراً لحالة err-disable
:::
:::

::: card
### Root Guard

يضمن أن العقدة التي نريدها جذراً في الشبكة تبقى كذلك. عندما تستقبل مبدلة
على واجهة Root Guard أي BPDU من مبدلة تعلن معرّفاً أصغر من الجذر الحالي،
توضع الواجهة في حالة [root-inconsistent]{.term} ويعود المنفذ لطبيعته عند
توقف تلك الرسائل.
:::
:::

::: {#lan-storm .section .block}
::: card
### LAN Storm Attacks [عاصفة الشبكة المحلية]{.tag}

تحدث عندما تغمر الحزم (Packets) الشبكة المحلية، مما يؤدي لازدحام مفرط
وتدهور الأداء.

::: pair-grid
::: {.pair-card .attack}
::: ptitle
أسباب العاصفة
:::

-   أخطاء في تنفيذ مكدس البروتوكولات (Protocol Stack)
-   أخطاء في إعدادات الشبكة
-   هجمات حجب الخدمة DoS من المستخدمين
:::

::: {.pair-card .defense}
::: ptitle
Traffic Storm Control
:::

يُعرف أيضاً بـ [Traffic Suppression]{.term-ar} --- يراقب مستويات
Broadcast/Multicast/Unicast خلال ثانية واحدة، ويقارنها بحد مُعد مسبقاً على
المنفذ. إذا تجاوزت الحد، تُسقط (Drop) الحزم الزائدة حتى نهاية الفترة
الزمنية.
:::
:::
:::
:::

::: {#vlan-attacks .section .block}
::: section-head
::: section-num
06
:::

<div>

## هجمات VLAN

::: section-sub
VLAN Attacks & VLAN Hopping
:::

</div>
:::

::: card
### مراجعة سريعة: VLAN

[VLAN (Virtual Local Area Network)]{.term} --- شبكة محلية افتراضية
تُستخدم لتقسيم شبكة كبيرة إلى شبكات أصغر ومعزولة لأسباب أمنية وتنظيمية.

**نستخدم VLAN من أجل:**

-   **العزل الأمني:** عزل أقسام (مثلاً HR عن المالية)
-   **تحسين الأداء:** تقليل الأجهزة في نطاق البث (Broadcast Domain)
-   **سهولة الإدارة:** تنظيم حسب الأقسام أو المواقع
-   **المرونة:** نقل جهاز بين VLANs عبر software فقط دون تغيير كابلات
:::

::: card
### DTP --- Dynamic Trunking Protocol [بروتوكول Cisco خاص]{.tag}

يُستخدم بين المبدلات لتحديد ما إذا كان المنفذ يعمل كـ [Trunk]{.term} أو
[Access]{.term} تلقائياً، وللتفاوض على نوع الاتصال.

::: {.note .danger}
[⚠️]{.note-icon}

<div>

DTP يجعل الإعداد أسهل لكنه **ثغرة أمنية** إن لم يُستخدم بحذر. إذا لم يُعطّل
على المنافذ الطرفية، قد يتمكن المهاجم من: إقناع مبدل بأن جهازه مبدل أيضاً
← التفاوض على Trunk ← الوصول لعدة VLANs.

</div>
:::

::: {.table-wrap .mt}
  الوضع (Mode)                 السلوك
  ---------------------------- --------------------------------------
  [access]{.term}              يُجبر المنفذ على تمرير VLAN واحدة فقط
  [trunk]{.term}               يُجبر المنفذ على تمرير عدة VLANs
  [dynamic auto]{.term}        ينتظر الطرف الآخر لبدء التفاوض
  [dynamic desirable]{.term}   يبادر بإرسال طلبات التفاوض بنشاط
:::
:::

::: card
### 1️⃣ Switch Spoofing [انتحال هوية مبدل]{.tag}

يُكوّن المهاجم جهازه ليظهر وكأنه Switch يتفاوض مع المبدل الحقيقي عبر DTP.
إذا قبل المبدل، تُفتح قناة [Trunk]{.term} بين المهاجم والمبدل، فيستقبل
المهاجم حركة مرور من عدة VLANs.

::: {.note .safe}
[✅]{.note-icon}

<div>

**الحل --- إيقاف DTP على المنافذ الطرفية:**

</div>
:::

::: config
[! 1. تعيين المنفذ كـ Access فقط]{.cmt} Switch(config)# interface
FastEthernet0/1 Switch(config-if)# switchport mode access [! 2. تعطيل
التفاوض التلقائي]{.cmt} Switch(config-if)# switchport nonegotiate
:::

ملاحظة: أمر [switchport nonegotiate]{.term} يعمل فقط عندما يكون المنفذ
في وضع access أو trunk، وليس في dynamic.
:::

::: card
### 2️⃣ Double Tagging Attack [الهجوم بالوسم المزدوج]{.tag}

نوع من [VLAN Hopping]{.term} يستغل آلية الوسم (Tagging) للعبور من VLAN
إلى أخرى **دون إنشاء Trunk**. المهاجم يُدخل وسمين [802.1Q Double
Tags]{.term} في الإطار:

-   **Outer Tag (خارجي):** يُطابق VLAN موثوقة، غالباً VLAN 1
-   **Inner Tag (داخلي):** يُشير إلى VLAN الهدف (مثال: VLAN 10)

::: {.steps .mt}
::: {.step n="1"}
::: step-body
المهاجم يرسل إطاراً بوسمين.
:::
:::

::: {.step n="2"}
::: step-body
**Switch A** يزيل الوسم الخارجي (لأنه متصل بمنفذ trunk يستقبل حركة
VLAN 1) ولا يلاحظ الوسم الداخلي.
:::
:::

::: {.step n="3"}
::: step-body
**Switch B** يقرأ الوسم الداخلي المتبقي (VLAN 10) ويرسل الإطار إلى أجهزة
VLAN 10.
:::
:::

::: {.step n="4"}
::: step-body
النتيجة: المهاجم --- رغم كونه في VLAN مختلفة --- تسلّل إلى VLAN 10 للتجسس
أو الهجوم.
:::
:::
:::

::: {.note .warn}
[📌]{.note-icon}

<div>

**شروط نجاح الهجوم:**

-   منفذ المهاجم متصل بـ Access Port في VLAN 1
-   وجود وصلة Trunk بين المبدلات تمرر VLAN 1
-   عدم وجود حماية (فحص مزدوج للوسم أو ACLs)

</div>
:::

::: {.note .safe}
[✅]{.note-icon}

<div>

**استراتيجية الحماية:**

-   عدم استخدام VLAN 1 لنقل بيانات المستخدمين العادية --- تخصيصها فقط
    للإدارة (Management)
-   منع تمرير بيانات VLAN 1 عبر Trunk Ports، بتحديد قائمة [Allowed
    VLANs]{.term} يدوياً وحصرياً

</div>
:::
:::
:::

::: {#dhcp-attacks .section .block}
::: section-head
::: section-num
07
:::

<div>

## هجمات DHCP

::: section-sub
DHCP Starvation & Spoofing
:::

</div>
:::

::: card
### مراجعة رسائل DHCP

::: steps
::: {.step n="1"}
::: step-body
[DHCPDISCOVER]{.term} (Broadcast) --- \"أريد طلب عنوان\" --- من العميل
:::
:::

::: {.step n="2"}
::: step-body
[DHCPOFFER]{.term} (Unicast) --- \"أنا الخادم، إليك عنوان أقترحه\" ---
من الخادم
:::
:::

::: {.step n="3"}
::: step-body
[DHCPREQUEST]{.term} (Broadcast) --- \"أقبل هذا العرض\" --- من العميل
:::
:::

::: {.step n="4"}
::: step-body
[DHCPACK]{.term} (Unicast) --- \"تم تأكيد قبولك\" --- من الخادم
:::
:::
:::
:::

::: card
### DHCP Starvation Attack [هجوم استنزاف DHCP]{.tag}

يُغرق المهاجم خادم DHCP بعدد كبير من طلبات DHCP المزيفة، بهدف استخدام
**جميع عناوين IP المتاحة**. بعد استنفادها، لا يستطيع الخادم تزويد عناوين
إضافية → [Denial of Service (DoS)]{.term} يمنع العملاء الجدد من الوصول
للشبكة.

::: {.note .def}
[ℹ️]{.note-icon}

<div>

تعريف عام: هجوم حجب الخدمة (DoS) هو أي نوع من الهجمات يُستخدم لإغراق
أجهزة وخدمات الشبكة بحركة مرور غير شرعية، مما يمنع حركة المرور الشرعية
من الوصول لتلك الموارد.

</div>
:::
:::

::: card
### DHCP Spoofing Attack [هجوم انتحال DHCP]{.tag}

المهاجم يستغل بروتوكول DHCP ليخدع أجهزة الشبكة بالتظاهر بأنه **خادم DHCP
شرعي**.

::: {.steps .mt}
::: {.step n="1"}
::: step-body
المهاجم يوصّل جهازه بالشبكة ويبدأ بإرسال رسائل OFFER/ACK مزيفة.
:::
:::

::: {.step n="2"}
::: step-body
جهاز جديد يطلب عنوان IP عبر DHCPDISCOVER.
:::
:::

::: {.step n="3"}
::: step-body
المهاجم يردّ **بسرعة** برسالة OFFER تحتوي: IP من اختياره، Gateway مزيف،
DNS مزيف.
:::
:::
:::

::: {.note .danger}
[🕸️]{.note-icon}

<div>

**أهداف الهجوم:**

-   سرقة بيانات حساسة (كلمات مرور، معلومات بنكية)
-   اعتراض البريد الإلكتروني أو جلسات الويب
-   تنفيذ هجمات Man-in-the-Middle
-   السيطرة على حركة الشبكة

</div>
:::
:::

::: card
### الحماية --- DHCP Snooping [التجسس على رسائل DHCP]{.tag}

ميزة في أجهزة Cisco Catalyst تحمي من DHCP Spoofing وDHCP Starvation.
يصنّف المبدل المنافذ إلى:

::: pair-grid
::: {.pair-card .defense}
::: ptitle
✅ Trusted Ports
:::

يُسمح بمرور ردود DHCP (OFFER/ACK) منها --- عادة المنفذ المتصل بخادم DHCP
الشرعي.
:::

::: {.pair-card .attack}
::: ptitle
🚫 Untrusted Ports
:::

يُمنع تمرير ردود DHCP منها --- منافذ المستخدمين. أي رد DHCP من هنا →
المنفذ يدخل حالة [err-disable]{.term}.
:::
:::

يبني DHCP Snooping قاعدة بيانات [DHCP Bindings]{.term} تحوي: عنوان MAC
للعميل، عنوان IP المخصص، مدة التأجير (Lease Time).

::: config
Switch(config)# ip dhcp snooping Switch(config)# ip dhcp snooping vlan
10 Switch(config)# interface GigabitEthernet0/1 Switch(config-if)# ip
dhcp snooping trust [! نفترض أن Gig0/1 موصول بـ DHCP Server]{.cmt}
:::
:::
:::

::: {#arp-attacks .section .block}
::: section-head
::: section-num
08
:::

<div>

## هجمات ARP

::: section-sub
ARP Spoofing / ARP Poisoning
:::

</div>
:::

::: card
### آلية الهجوم

-   في عملية ARP العادية، يرسل المضيف بثاً (Broadcast) لتحديد عنوان MAC
    لمضيف له عنوان IP معين.
-   يمكن للمهاجم إرسال **رد ARP مزوّر** (forged ARP reply) عند التقاط طلب
    ARP يُبث، محتوياً على عنوان MAC الخاص به.
-   المرسِل يُضيف الإدخال المزيف إلى [ARP cache]{.term} الخاصة به، ويبدأ
    توجيه الحزم إلى عنوان MAC المزيف.
-   جميع الحزم المرسلة لتلك العناوين IP تمر عبر نظام المهاجم.

::: {.note .danger}
[🎭]{.note-icon}

<div>

تُعرف هذه الهجمة باسم [ARP spoofing]{.term} أو [ARP poisoning]{.term}،
وتُعتبر نوعاً من هجمات **Man-in-the-Middle**.

</div>
:::
:::

::: card
### الحماية --- Dynamic ARP Inspection (DAI) [الفحص الديناميكي لـ ARP]{.tag}

يعمل بطريقة مشابهة لـ DHCP Snooping: تصنيف كل منافذ المبدل إلى
موثوقة/غير موثوقة.

-   المبدل يعترض ويفحص جميع حزم ARP الواردة على منفذ **غير موثوق**؛ لا
    فحص على المنافذ الموثوقة.
-   DAI لا يسمح بحزمة ARP من منفذ غير موثوق إلا إذا كان **IP + MAC
    متطابقين** مع ما هو مسجّل في قاعدة بيانات DHCP Snooping.
-   مصادر المقارنة: [Static ARP Entries]{.term} (يدخلها المسؤول يدوياً)
    أو [قاعدة بيانات DHCP Snooping]{.term} (تلقائية).

::: {.note .def}
[🗑️]{.note-icon}

<div>

عند وجود اختلاف: تُسقط الحزمة فوراً (Drop) ويُسجَّل تنبيه (Log) للمراقبة.

</div>
:::

::: config
Switch(config)# ip arp inspection vlan 10 Switch(config)# interface
GigabitEthernet0/2 Switch(config-if)# ip arp inspection trust [! نفترض
أن Gig0/2 موصول بجهاز موثوق]{.cmt}
:::
:::
:::

::: {#defense-stack .section .block}
::: section-head
::: section-num
09
:::

<div>

## منظومة الدفاع المتكاملة

::: section-sub
IP Source Guard (IPSG) وسيناريو تطبيقي شامل
:::

</div>
:::

::: card
### IP Source Guard (IPSG)

ميزة أمنية في مبدلات Cisco تحمي من انتحال عنوان IP ([IP
Spoofing]{.term-ar}). تعتمد فلترة حركة المرور على IP وMAC معاً، وتُفعَّل على
منافذ Access.

::: {.steps .mt}
::: {.step n="1"}
::: step-body
يربط عنوان IP بعنوان MAC على المنفذ، معتمداً على قاعدة موثوقة (DHCP
Snooping أو Static Bindings يدوية).
:::
:::

::: {.step n="2"}
::: step-body
يفحص كل حزمة IP واردة: إذا تطابق IP وMAC مع القيم الموثوقة → تمر. إن لم
يتطابقا → تُسقط فوراً.
:::
:::
:::

::: config
Switch(config)# interface GigabitEthernet0/3 Switch(config-if)# ip
verify source [! نفترض أن Gig0/3 موصول بـ PC1 أو PC2]{.cmt}
:::
:::

::: exam-box
### 🏗️ هرم الدفاع الكامل (من الأساس للأعلى)

-   **1. Port Security** --- القاعدة، يحدّ من عدد عناوين MAC على المنفذ
-   **2. DHCP Snooping** --- يبني قاعدة بيانات موثوقة IP↔MAC↔Port
-   **3. DAI (Dynamic ARP Inspection)** --- يفحص صحة ردود ARP بالاعتماد
    على القاعدة أعلاه
-   **4. IPSG (IP Source Guard)** --- القمة، يفحص كل حزمة IP واردة مقابل
    نفس القاعدة
:::

::: card
### جدول ملخص: الهجوم ← الأداة المانعة ← الآلية

::: table-wrap
  -----------------------------------------------------------------------
  الهجوم                  الأداة التي تمنعه       كيف؟
  ----------------------- ----------------------- -----------------------
  [IP Spoofing]{.term}\   **IPSG**                لا يُسمح بمرور IP غير
  انتحال IP                                       متطابق مع MAC

  [ARP Spoofing]{.term}\  **DAI**                 يتم فحص حزم ARP وإسقاط
  تسميم ARP                                       غير المطابقة

  [DHCP Spoofing]{.term}\ **DHCP Snooping**       لا يُسمح بردود DHCP من
  انتحال خادم DHCP                                منافذ غير موثوقة

  [MAC Flooding]{.term}\  **Port Security**       يحد من عدد عناوين MAC
  إغراق جدول CAM                                  المسموحة على المنفذ

  [STP                    **BPDU Guard / Root     يُغلق المنفذ أو يرفض
  Manipulation]{.term}\   Guard**                 BPDU يُهدد هوية الجذر
  التلاعب بـ STP                                  

  [VLAN Hopping]{.term}\  **Disable DTP + Native  تعيين access يدوياً وعدم
  القفز بين VLANs         VLAN Hardening**        استخدام VLAN 1 للبيانات
  -----------------------------------------------------------------------
:::
:::
:::

::: {#glossary .section .block}
::: section-head
::: section-num
10
:::

<div>

## قاموس المصطلحات السريع

::: section-sub
Quick Glossary
:::

</div>
:::

::: glossary-grid
::: gcard
[CAM Table]{.gterm}

::: gdef
جدول عناوين MAC القابل للعنونة بالمحتوى
:::
:::

::: gcard
[MAC Address Age Out]{.gterm}

::: gdef
انتهاء صلاحية عنوان MAC وحذفه من الجدول
:::
:::

::: gcard
[Broadcast Storm]{.gterm}

::: gdef
عاصفة بث ناتجة عن حلقة في الشبكة
:::
:::

::: gcard
[BPDU]{.gterm}

::: gdef
وحدة بيانات بروتوكول الجسر (رسائل STP)
:::
:::

::: gcard
[Root Bridge]{.gterm}

::: gdef
المبدل المرجعي في شجرة STP
:::
:::

::: gcard
[PortFast]{.gterm}

::: gdef
انتقال فوري لحالة Forwarding على المنافذ الطرفية
:::
:::

::: gcard
[BPDU Guard]{.gterm}

::: gdef
إغلاق المنفذ عند استقبال BPDU غير متوقع
:::
:::

::: gcard
[Root Guard]{.gterm}

::: gdef
حماية هوية الجذر من الانتحال
:::
:::

::: gcard
[DTP]{.gterm}

::: gdef
بروتوكول التفاوض الديناميكي على نوع المنفذ
:::
:::

::: gcard
[VLAN Hopping]{.gterm}

::: gdef
القفز غير المصرح به بين شبكات VLAN
:::
:::

::: gcard
[Double Tagging]{.gterm}

::: gdef
هجوم بوسمين 802.1Q للعبور بين VLANs
:::
:::

::: gcard
[DHCP Snooping]{.gterm}

::: gdef
تصنيف منافذ موثوقة/غير موثوقة لردود DHCP
:::
:::

::: gcard
[DAI]{.gterm}

::: gdef
فحص ديناميكي لصحة حزم ARP
:::
:::

::: gcard
[IPSG]{.gterm}

::: gdef
حماية مصدر IP بمطابقة IP+MAC
:::
:::

::: gcard
[err-disable]{.gterm}

::: gdef
حالة إغلاق كامل للمنفذ عند اكتشاف خرق
:::
:::

::: gcard
[802.1X]{.gterm}

::: gdef
معيار التحكم بالوصول للشبكة عبر المنفذ
:::
:::
:::
:::

::: {#examfocus .section .block}
::: section-head
::: section-num
11
:::

<div>

## تركيز الامتحان --- أهم النقاط

::: section-sub
Exam Focus Summary
:::

</div>
:::

::: exam-box
### ✅ أفكار متكررة يجب حفظها جيداً

-   ضعف الطبقة الثانية ينبع من استقلالية طبقات OSI عن بعضها --- اختراق
    طبقة لا تكتشفه الطبقات الأخرى.
-   CAM Table محدودة الحجم → أساس هجوم MAC Flooding → الحل: Port
    Security.
-   STP يمنع Loop عبر انتخاب Root Bridge بأقل Priority ثم أقل MAC.
-   هجوم STP: بث BPDU بأولوية أصغر لانتحال دور الجذر → الحل: BPDU
    Guard + Root Guard (وليس PortFast وحدها).
-   VLAN Hopping له طريقتان: Switch Spoofing (عبر DTP) و Double Tagging
    (عبر VLAN 1).
-   DHCP: التمييز بين Starvation (استنزاف العناوين) وSpoofing (انتحال
    دور الخادم) → الحل المشترك: DHCP Snooping.
-   ARP Spoofing = ARP Poisoning = نوع من MITM → الحل: DAI بالاعتماد على
    قاعدة DHCP Snooping.
-   الترتيب المنطقي للحماية: Port Security → DHCP Snooping → DAI → IPSG
    (كل طبقة تعتمد على سابقتها).
:::

::: {.note .def}
[📝]{.note-icon}

<div>

نصيحة أخيرة: الأسئلة غالباً تربط بين **اسم الهجوم** و**اسم الحل المناسب
له** --- راجع جدول \"الهجوم ← الأداة المانعة\" في قسم منظومة الدفاع
جيداً.

</div>
:::
:::
:::

::: fmain
بالتوفيق في الامتحان 🎓
:::

<div>

مراجعة مبنية بالكامل على محتوى محاضرة Layer 2 Switches Security --- د.
منال العمر --- جامعة حمص

</div>

↑
