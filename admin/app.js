/**
 * GitHub Device Flow admin — edit lecture files on static GitHub Pages (no OAuth proxy).
 */
(function () {
  const CFG = window.__ADMIN_CONFIG__ || {};
  const REPO = CFG.repo || '';
  const BRANCH = CFG.branch || 'main';
  const CLIENT_ID = CFG.clientId || '';
  const SUBJECTS = CFG.subjects || [];
  const TOKEN_KEY = 'lecture-admin-token';
  const API = 'https://api.github.com';

  const $ = id => document.getElementById(id);

  /** @type {{ path: string, sha: string, name: string } | null} */
  let currentFile = null;

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  function setToken(t) {
    if (t) sessionStorage.setItem(TOKEN_KEY, t);
    else sessionStorage.removeItem(TOKEN_KEY);
  }

  function setStatus(msg, isError) {
    const el = $('status');
    if (!el) return;
    el.textContent = msg;
    el.className = 'status' + (isError ? ' status--error' : '');
  }

  async function gh(path, opts = {}) {
    const token = getToken();
    if (!token) throw new Error('غير مسجّل الدخول');
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
        ...(opts.headers || {}),
      },
    });
    if (!res.ok) {
      let detail = res.statusText;
      try {
        const j = await res.json();
        detail = j.message || detail;
      } catch { /* ignore */ }
      throw new Error(detail);
    }
    if (res.status === 204) return null;
    return res.json();
  }

  function b64Decode(s) {
    return decodeURIComponent(escape(atob(s.replace(/\n/g, ''))));
  }

  function b64Encode(s) {
    return btoa(unescape(encodeURIComponent(s)));
  }

  async function requestDeviceCode() {
    const res = await fetch('https://github.com/login/device/code', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, scope: 'repo' }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error_description || data.message || 'فشل طلب رمز الجهاز');
    return data;
  }

  async function pollDeviceToken(deviceCode, intervalSec) {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        device_code: deviceCode,
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      }),
    });
    const data = await res.json();
    if (data.error === 'authorization_pending') return null;
    if (data.error === 'slow_down') {
      await sleep((intervalSec + 5) * 1000);
      return null;
    }
    if (data.error) throw new Error(data.error_description || data.error);
    return data.access_token;
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function startLogin() {
    if (!CLIENT_ID) {
      setStatus('لم يُضبط GITHUB_OAUTH_CLIENT_ID — راجع admin/README.md', true);
      return;
    }
    $('login-panel').hidden = false;
    $('editor-panel').hidden = true;
    $('login-wait').hidden = false;
    $('login-done').hidden = true;
    setStatus('جاري طلب رمز الدخول…');

    try {
      const code = await requestDeviceCode();
      $('user-code').textContent = code.user_code;
      $('verify-link').href = code.verification_uri;
      $('verify-link').textContent = code.verification_uri;
      $('login-wait').hidden = false;

      let interval = code.interval || 5;
      const deadline = Date.now() + (code.expires_in || 900) * 1000;
      while (Date.now() < deadline) {
        await sleep(interval * 1000);
        const token = await pollDeviceToken(code.device_code, interval);
        if (token) {
          setToken(token);
          await onLoggedIn();
          return;
        }
      }
      throw new Error('انتهت صلاحية رمز الدخول — حاول مرة أخرى');
    } catch (err) {
      setStatus(err.message || String(err), true);
    }
  }

  async function onLoggedIn() {
    try {
      const user = await gh('/user');
      $('login-panel').hidden = true;
      $('editor-panel').hidden = false;
      $('user-label').textContent = user.login || 'مستخدم';
      setStatus(`مرحباً ${user.login}`);
      populateYears();
    } catch (err) {
      setToken('');
      setStatus(err.message || String(err), true);
    }
  }

  function logout() {
    setToken('');
    currentFile = null;
    $('login-panel').hidden = false;
    $('editor-panel').hidden = true;
    $('login-wait').hidden = true;
    $('login-done').hidden = true;
    setStatus('تم تسجيل الخروج');
  }

  function populateYears() {
    const years = [...new Set(SUBJECTS.map(s => s.year))].filter(Boolean).sort((a, b) => a - b);
    const sel = $('year-select');
    sel.innerHTML = '<option value="">— اختر السنة —</option>' +
      years.map(y => `<option value="${y}">السنة ${y}</option>`).join('');
    sel.onchange = populateSubjects;
    $('subject-select').innerHTML = '<option value="">— اختر المادة —</option>';
    $('file-select').innerHTML = '<option value="">— اختر الملف —</option>';
    $('editor-area').value = '';
    $('editor-meta').textContent = '';
    currentFile = null;
  }

  function populateSubjects() {
    const year = Number($('year-select').value);
    const sel = $('subject-select');
    const list = SUBJECTS.filter(s => s.year === year);
    sel.innerHTML = '<option value="">— اختر المادة —</option>' +
      list.map(s => `<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('');
    sel.onchange = loadFileList;
    $('file-select').innerHTML = '<option value="">— اختر الملف —</option>';
    $('editor-area').value = '';
    currentFile = null;
  }

  async function loadFileList() {
    const subjectId = $('subject-select').value;
    const sel = $('file-select');
    sel.innerHTML = '<option value="">— جاري التحميل —</option>';
    $('editor-area').value = '';
    currentFile = null;
    if (!subjectId) {
      sel.innerHTML = '<option value="">— اختر الملف —</option>';
      return;
    }
    const subject = SUBJECTS.find(s => s.id === subjectId);
    if (!subject) return;

    try {
      setStatus('جاري تحميل قائمة الملفات…');
      const items = await gh(`/repos/${REPO}/contents/${subject.lecturePath}?ref=${BRANCH}`);
      const files = (Array.isArray(items) ? items : [])
        .filter(f => f.type === 'file' && /^par\d+(-sec\d+)?\.md$/i.test(f.name))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
      sel.innerHTML = '<option value="">— اختر الملف —</option>' +
        files.map(f => `<option value="${esc(f.path)}" data-sha="${esc(f.sha)}">${esc(f.name)}</option>`).join('') +
        '<option value="__manifest__">📋 manifest.json</option>';
      sel.onchange = loadSelectedFile;
      setStatus('');
    } catch (err) {
      sel.innerHTML = '<option value="">— خطأ —</option>';
      setStatus(err.message || String(err), true);
    }
  }

  async function loadSelectedFile() {
    const path = $('file-select').value;
    $('editor-area').value = '';
    $('editor-meta').textContent = '';
    currentFile = null;
    if (!path) return;

    const subject = SUBJECTS.find(s => s.id === $('subject-select').value);
    if (!subject) return;

    const filePath = path === '__manifest__'
      ? `${subject.lecturePath}/manifest.json`
      : path;

    try {
      setStatus('جاري تحميل الملف…');
      const data = await gh(`/repos/${REPO}/contents/${filePath}?ref=${BRANCH}`);
      currentFile = { path: filePath, sha: data.sha, name: data.name };
      $('editor-area').value = b64Decode(data.content);
      $('editor-meta').textContent = filePath;
      setStatus('');
    } catch (err) {
      setStatus(err.message || String(err), true);
    }
  }

  async function saveCurrentFile() {
    if (!currentFile) {
      setStatus('اختر ملفاً أولاً', true);
      return;
    }
    const content = $('editor-area').value;
    const msg = ($('commit-msg').value || '').trim() ||
      `Update ${currentFile.name} via admin`;
    $('save-btn').disabled = true;
    try {
      setStatus('جاري الحفظ على GitHub…');
      const data = await gh(`/repos/${REPO}/contents/${currentFile.path}`, {
        method: 'PUT',
        body: JSON.stringify({
          message: msg,
          content: b64Encode(content),
          sha: currentFile.sha,
          branch: BRANCH,
        }),
      });
      currentFile.sha = data.content.sha;
      setStatus(`✓ تم الحفظ — ${data.commit.html_url}`);
    } catch (err) {
      setStatus(err.message || String(err), true);
    } finally {
      $('save-btn').disabled = false;
    }
  }

  async function createNewFile() {
    const subjectId = $('subject-select').value;
    if (!subjectId) {
      setStatus('اختر المادة أولاً', true);
      return;
    }
    const name = ($('new-filename').value || '').trim();
    if (!/^par\d+(-sec\d+)?\.md$/i.test(name)) {
      setStatus('اسم غير صالح — استخدم parN.md أو parN-secM.md', true);
      return;
    }
    const subject = SUBJECTS.find(s => s.id === subjectId);
    const filePath = `${subject.lecturePath}/${name}`;
    const content = $('editor-area').value || '# محاضرة جديدة\n\n';
    try {
      setStatus('جاري إنشاء الملف…');
      const data = await gh(`/repos/${REPO}/contents/${filePath}`, {
        method: 'PUT',
        body: JSON.stringify({
          message: `Add ${name} via admin`,
          content: b64Encode(content),
          branch: BRANCH,
        }),
      });
      currentFile = { path: filePath, sha: data.content.sha, name };
      $('editor-meta').textContent = filePath;
      await loadFileList();
      $('file-select').value = filePath;
      setStatus(`✓ تم إنشاء ${name}`);
    } catch (err) {
      setStatus(err.message || String(err), true);
    }
  }

  function bind() {
    $('login-btn')?.addEventListener('click', startLogin);
    $('logout-btn')?.addEventListener('click', logout);
    $('save-btn')?.addEventListener('click', saveCurrentFile);
    $('create-btn')?.addEventListener('click', createNewFile);
  }

  async function init() {
    bind();
    if (!CLIENT_ID) {
      $('setup-missing').hidden = false;
      $('login-btn').disabled = true;
      return;
    }
    if (getToken()) await onLoggedIn();
    else {
      $('login-panel').hidden = false;
      $('editor-panel').hidden = true;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
