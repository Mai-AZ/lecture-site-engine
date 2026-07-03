# لوحة الإدارة — GitHub Device Flow

واجهة ويب لتعديل ملفات `parN.md` و `manifest.json` مباشرة على GitHub — **بدون Decap CMS وبدون OAuth proxy**.

## الوصول

| البيئة | الرابط |
| --- | --- |
| GitHub Pages | `https://shahd-abbara.github.io/lecture-site-engine/admin/` |
| محلي | `npm run ci:deploy-build -- --all` ثم `cd dist && python3 -m http.server 8080` → `/admin/` |

## إعداد GitHub OAuth (مرة واحدة)

### 1. أنشئ GitHub OAuth App

GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**:

| الحقل | القيمة |
| --- | --- |
| Application name | `lecture-site-engine-admin` |
| Homepage URL | `https://shahd-abbara.github.io/lecture-site-engine/admin/` |
| Authorization callback URL | نفس Homepage URL (لا يُستخدم في Device Flow) |

احفظ **Client ID** فقط — لا تحتاج Client Secret للواجهة.

### 2. أضف Client ID في المستودع

GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

```
GITHUB_OAUTH_CLIENT_ID = <Client ID من الخطوة 1>
```

أعد نشر الموقع (push إلى `main` أو Run workflow **Deploy GitHub Pages**).

### 3. صلاحيات المستخدم

يجب أن يكون لديك **صلاحية كتابة** على المستودع (collaborator أو owner). عند تسجيل الدخول يطلب GitHub الموافقة على scope `repo`.

## الاستخدام

1. افتح `/admin/`
2. اضغط **تسجيل الدخول بـ GitHub**
3. افتح الرابط المعروض وأدخل الرمز على جهازك
4. اختر السنة → المادة → الملف
5. عدّل المحتوى واضغط **حفظ على GitHub**
6. CI يتحقق وينشر الموقع تلقائياً بعد الـ commit

## تسمية الملفات

- `parN.md` — محاضرة كاملة
- `parN-secM.md` — جزء من محاضرة
- `manifest.json` — إعدادات المادة (من القائمة)

`manifest.json` → `files` يُزامَن تلقائياً عند validate/build.

## التطوير المحلي

```bash
GITHUB_OAUTH_CLIENT_ID=<your-client-id> npm run admin:generate
# أو
GITHUB_OAUTH_CLIENT_ID=<your-client-id> npm run ci:deploy-build -- --all
cd dist && python3 -m http.server 8080
```

## Decap CMS (قديم — اختياري)

`npm run cms:config` و `admin/config.yml` ما زالا متاحين للتطوير المحلي مع `npx decap-server` فقط. الإنتاج يستخدم Device Flow أعلاه.
