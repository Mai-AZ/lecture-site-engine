(function () {
  'use strict';

  // giscus config — generated at giscus.app, tied to the "comments on exams"
  // Discussion category on this repo.
  var GISCUS_REPO         = 'homs-uni/lecture-site-engine';
  var GISCUS_REPO_ID      = 'R_kgDOTL05VA';
  var GISCUS_CATEGORY     = 'comments on exams';
  var GISCUS_CATEGORY_ID  = 'DIC_kwDOTL05VM4DCod2';
  var GISCUS_LANG         = 'ar';
  var GISCUS_ORIGIN       = 'https://giscus.app';
  // Remember where the student was before GitHub OAuth (hash SPA routes).
  var GISCUS_RETURN_KEY   = 'giscus-return-v1:' + GISCUS_REPO;


  /**
   * Live read-only feed Worker (Cloudflare). Giscus stays write-only on each
   * question. After `npm run worker:discussions:deploy`, the workers.dev URL
   * below (or window.DISCUSSION_FEED_API) is used for counts/chips/overview.
   */
  var DISCUSSION_FEED_API =
    (typeof window !== 'undefined' && window.DISCUSSION_FEED_API) ||
    'https://homs-uni-discussion-feed.lecture-site.workers.dev';

  // Client cache TTL — short so a normal refresh picks up new comments.
  var DISCUSSION_FEED_CACHE_MS = 90 * 1000;
  var FEED_STORAGE_KEY = 'giscus-feed-v4:' + GISCUS_REPO;

  /**
   * Globally unique subject key for giscus terms. DOM ids reuse short stems
   * like `exams-p1-q14` across every DAWRAT page, so without this prefix
   * comments from different subjects collide in the same GitHub Discussion.
   * Prefer `<base href="…/year-N/subject-id/">`, fall back to storagePrefix.
   */
  function giscusTermScope() {
    var base = document.querySelector('base[href]');
    if (base) {
      try {
        var pathname = new URL(base.href, location.origin).pathname
          .replace(/\/+$/, '')
          .split('/')
          .filter(Boolean);
        for (var i = 0; i < pathname.length - 1; i++) {
          if (/^year-\d+$/i.test(pathname[i])) {
            return pathname[i] + '/' + pathname[i + 1];
          }
        }
        if (pathname.length) return pathname[pathname.length - 1];
      } catch (e) { /* ignore */ }
    }
    return document.documentElement.getAttribute('data-storage-prefix') || 'study-guide';
  }

  /** Prefix a local card/guide term so it is unique across the whole repo. */
  function scopedDiscussionTerm(term) {
    if (!term) return term;
    var scope = giscusTermScope();
    if (!scope) return term;
    if (term === scope || term.indexOf(scope + '/') === 0) return term;
    return scope + '/' + term;
  }

  function giscusTheme() {
    return document.documentElement.classList.contains('dark') ? 'noborder_dark' : 'noborder_light';
  }

  /** Force the iframe's color-scheme to match the site — not the OS clock. */
  function giscusColorScheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  function applyGiscusFrameChrome(iframe) {
    if (!iframe) return;
    iframe.style.colorScheme = giscusColorScheme();
  }

  /** giscus stores the OAuth session in localStorage (same key as client.js). */
  function clearGiscusSession() {
    try { localStorage.removeItem('giscus-session'); } catch (e) { /* ignore */ }
  }

  function getGiscusSession() {
    try {
      var raw = localStorage.getItem('giscus-session');
      if (!raw) return '';
      var parsed = JSON.parse(raw);
      // Token must be a plain string. Anything else (object / double-encoded junk)
      // is sent to GitHub as "Bad credentials".
      if (typeof parsed !== 'string' || !parsed) {
        clearGiscusSession();
        return '';
      }
      return parsed;
    } catch (e) {
      clearGiscusSession();
      return '';
    }
  }

  function setGiscusSession(session) {
    if (typeof session !== 'string' || !session) {
      clearGiscusSession();
      return;
    }
    try {
      localStorage.setItem('giscus-session', JSON.stringify(session));
    } catch (e) { /* quota / private mode */ }
  }

  /**
   * Official client.js clears the session and reloads the widget when GitHub
   * rejects the token. Without this, a once-expired login keeps showing
   * "Bad credentials" on every open.
   */
  function isGiscusAuthError(message) {
    if (!message) return false;
    var m = String(message);
    return (
      m.indexOf('Bad credentials') !== -1 ||
      m.indexOf('Invalid state value') !== -1 ||
      m.indexOf('State has expired') !== -1
    );
  }

  function reloadGiscusFramesWithoutSession() {
    document.querySelectorAll('iframe.giscus-frame, iframe.giscus-count-probe-frame').forEach(function (iframe) {
      try {
        var u = new URL(iframe.src);
        u.searchParams.set('session', '');
        iframe.src = u.toString();
      } catch (e) { /* ignore */ }
    });
  }

  window.addEventListener('message', function (e) {
    if (e.origin !== GISCUS_ORIGIN) return;
    var data = e.data;
    if (!data || typeof data !== 'object' || !data.giscus) return;

    if (data.giscus.signOut) {
      clearGiscusSession();
      return;
    }
    if (isGiscusAuthError(data.giscus.error)) {
      if (localStorage.getItem('giscus-session') != null) {
        clearGiscusSession();
        console.warn('[giscus] Auth error — session cleared:', data.giscus.error);
        reloadGiscusFramesWithoutSession();
      }
    }
  });

  /** Strip scope + `/correction` so we can match `data-discussion-term` on cards. */
  function baseTermFromAny(term) {
    if (!term) return '';
    var t = String(term);
    if (t.length > 11 && t.slice(-11) === '/correction') t = t.slice(0, -11);
    var scope = giscusTermScope();
    if (scope && t.indexOf(scope + '/') === 0) t = t.slice(scope.length + 1);
    return t;
  }

  /**
   * Persist hash (+ optional question term) before Giscus GitHub login.
   * OAuth redirects cannot reliably keep `#exams…`, so without this the SPA
   * boots on the subject home and feels like “auth kicked me out”.
   */
  function rememberGiscusReturnContext(extra) {
    extra = extra || {};
    try {
      var prev = null;
      try { prev = JSON.parse(sessionStorage.getItem(GISCUS_RETURN_KEY) || 'null'); } catch (e) { /* ignore */ }
      var hash = location.hash || '';
      if ((!hash || hash === '#' || hash === '#home') && prev && prev.hash) {
        hash = prev.hash;
      }
      var term = baseTermFromAny(extra.term || (prev && prev.term) || '');
      sessionStorage.setItem(GISCUS_RETURN_KEY, JSON.stringify({
        hash: hash,
        path: location.pathname,
        term: term,
        mode: extra.mode || (prev && prev.mode) || 'general',
        at: Date.now(),
      }));
    } catch (e) { /* ignore */ }
  }

  /**
   * After GitHub → giscus OAuth, the browser lands on origin?giscus=… (often
   * without the SPA hash). Save the session and restore the saved hash.
   * Must run before app.js finishes first routing when possible.
   */
  function consumeGiscusOAuthReturn() {
    var params = new URLSearchParams(location.search);
    var sessionParam = params.get('giscus');
    var hash = location.hash || '';
    var hashQueryAt = hash.indexOf('?');
    // If origin mistakenly included a hash, giscus may redirect as
    // `#exams?giscus=…` (query stuck inside the fragment). Salvage it.
    if (!sessionParam && hashQueryAt !== -1) {
      var hashParams = new URLSearchParams(hash.slice(hashQueryAt + 1));
      sessionParam = hashParams.get('giscus') || '';
      if (sessionParam) {
        hashParams.delete('giscus');
        var rest = hashParams.toString();
        hash = hash.slice(0, hashQueryAt) + (rest ? '?' + rest : '');
      }
    }

    var hadSession = !!sessionParam;
    if (sessionParam) {
      setGiscusSession(sessionParam);
      params.delete('giscus');
    }
    // Clean leftover oauth noise if present.
    ['error', 'error_description', 'error_uri'].forEach(function (k) {
      if (params.has(k)) params.delete(k);
    });

    var saved = null;
    try {
      saved = JSON.parse(sessionStorage.getItem(GISCUS_RETURN_KEY) || 'null');
    } catch (e) { /* ignore */ }

    var hashMissing = !hash || hash === '#' || hash === '#home';
    if (hashMissing && saved && saved.hash && saved.hash !== '#home') {
      hash = saved.hash.charAt(0) === '#' ? saved.hash : '#' + saved.hash;
    }

    if (hadSession || (hashMissing && hash) || hashQueryAt !== -1) {
      var qs = params.toString();
      var next = location.pathname + (qs ? '?' + qs : '') + (hash || '');
      try {
        history.replaceState(null, '', next);
      } catch (e) {
        location.replace(next);
      }
    }

    if (saved && saved.term && Date.now() - (saved.at || 0) < 45 * 60 * 1000) {
      window.__GISCUS_REOPEN__ = {
        term: saved.term,
        mode: saved.mode || 'general',
      };
    }
    return hadSession;
  }

  consumeGiscusOAuthReturn();

  /**
   * Build a direct widget iframe URL. Using the widget iframe (instead of
   * injecting client.js) lets us host many threads on one page — client.js
   * always does document.querySelector('.giscus') and reuses the first match.
   */
  function buildGiscusSrc(term, opts) {
    opts = opts || {};
    var isCorrection = String(term || '').indexOf('/correction') !== -1;
    rememberGiscusReturnContext({
      term: term,
      mode: opts.returnMode || (isCorrection ? 'correction' : 'general'),
    });

    var params = new URLSearchParams();
    var originUrl = new URL(location.href);
    originUrl.searchParams.delete('giscus');
    // Match official client.js: origin must NOT include the SPA hash.
    // Putting `#exams` in origin makes the OAuth return look like
    // `#exams?giscus=…`, so the token never lands in search params cleanly.
    // We restore the route via sessionStorage instead.
    originUrl.hash = '';
    params.set('origin', originUrl.toString());
    params.set('session', getGiscusSession() || '');
    params.set('theme', giscusTheme());
    params.set('reactionsEnabled', opts.reactionsEnabled != null ? String(opts.reactionsEnabled) : '1');
    params.set('emitMetadata', opts.emitMetadata != null ? String(opts.emitMetadata) : '0');
    params.set('inputPosition', 'top');
    params.set('repo', GISCUS_REPO);
    params.set('repoId', GISCUS_REPO_ID);
    params.set('category', GISCUS_CATEGORY);
    params.set('categoryId', GISCUS_CATEGORY_ID);
    // Strict title match — fuzzy search was attaching wrong threads across
    // subjects when many discussions shared similar titles (exams-p1-qN).
    params.set('strict', '1');
    params.set('term', scopedDiscussionTerm(term));
    return GISCUS_ORIGIN + '/' + GISCUS_LANG + '/widget?' + params.toString();
  }

  function demoteGiscusContainer(root) {
    if (!root) return;
    root.querySelectorAll('.giscus').forEach(function (g) {
      g.classList.remove('giscus');
      g.classList.add('giscus-instance');
    });
  }

  function buildLoadErrorEl(container, term) {
    var wrap = document.createElement('div');
    wrap.className = 'mcq-comment-load-error p-md text-center font-label-md text-on-surface-variant';

    var msg = document.createElement('p');
    msg.className = 'mb-md';
    msg.textContent = 'تعذّر تحميل التعليقات حالياً.';
    wrap.appendChild(msg);

    var retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'px-md py-sm rounded-lg border border-outline-variant hover:bg-surface-variant transition-all';
    retryBtn.textContent = 'إعادة المحاولة';
    retryBtn.addEventListener('click', function () { mountGiscusThread(container, term); });
    wrap.appendChild(retryBtn);

    var catSlug = GISCUS_CATEGORY.trim().toLowerCase().replace(/\s+/g, '-');
    var link = document.createElement('a');
    link.href = 'https://github.com/' + GISCUS_REPO + '/discussions/categories/' + encodeURIComponent(catSlug);
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'block mt-sm text-primary underline';
    link.textContent = 'أو افتح النقاش مباشرة على GitHub';
    wrap.appendChild(link);

    return wrap;
  }

  /**
   * Mounts a giscus comment thread into `container`, keyed by `term`.
   * Each unique term gets its own Discussion thread. Safe to call for many
   * containers on the same page (direct widget iframe, not client.js).
   *
   * Returns a Promise that resolves once the iframe has loaded (or failed).
   */
  function mountGiscusThread(container, term) {
    if (!container || !term) return Promise.resolve(false);
    var scoped = scopedDiscussionTerm(term);

    container.innerHTML = '';
    delete container.dataset.mounted;

    var loading = document.createElement('div');
    loading.className = 'mcq-comment-loading p-md text-center font-label-md text-on-surface-variant';
    loading.textContent = 'جارِ تحميل التعليقات…';
    container.appendChild(loading);

    var iframe = document.createElement('iframe');
    iframe.className = 'giscus-frame';
    iframe.title = 'Comments';
    iframe.scrolling = 'no';
    iframe.allow = 'clipboard-write';
    iframe.style.cssText = 'width:100%;border:0;min-height:24rem';
    applyGiscusFrameChrome(iframe);
    iframe.src = buildGiscusSrc(term, { reactionsEnabled: '1', emitMetadata: '0' });

    return new Promise(function (resolve) {
      var settled = false;

      function markReady(ok) {
        if (settled) return;
        settled = true;
        clearTimeout(readyTimeoutId);
        if (ok) {
          if (loading.parentNode) loading.remove();
          container.dataset.mounted = '1';
          container.dataset.giscusTerm = scoped;
          resolve(true);
        } else if (!container.querySelector('iframe.giscus-frame')) {
          window.removeEventListener('message', onMessage);
          container.innerHTML = '';
          container.appendChild(buildLoadErrorEl(container, term));
          resolve(false);
        } else {
          if (loading.parentNode) loading.remove();
          container.dataset.mounted = '1';
          container.dataset.giscusTerm = scoped;
          resolve(true);
        }
      }

      var readyTimeoutId = setTimeout(function () { markReady(true); }, 12000);

      iframe.addEventListener('load', function () {
        markReady(true);
      });
      iframe.addEventListener('error', function () { markReady(false); });

      // IMPORTANT: keep this listener for the life of the iframe.
      // giscus sends resizeHeight *after* the iframe load event; if we
      // detach here on settle, the frame stays at min-height and the
      // comment box is clipped out of view (scrolling is disabled).
      function onMessage(e) {
        if (e.origin !== GISCUS_ORIGIN) return;
        if (e.source !== iframe.contentWindow) return;
        var data = e.data;
        if (!data || typeof data !== 'object' || !data.giscus) return;

        if (data.giscus.resizeHeight) {
          iframe.style.height = data.giscus.resizeHeight + 'px';
          markReady(true);
          // Keep the modal scrolled so the composer stays in view after resize.
          var dialog = container.closest('.mcq-comment-dialog');
          if (dialog) {
            dialog.scrollTop = Math.max(0, dialog.scrollHeight - dialog.clientHeight);
          }
        }
        if (data.giscus.error) {
          // "Discussion not found" is normal for a new question thread —
          // giscus still renders the composer so students can start one.
          markReady(true);
        }
      }
      window.addEventListener('message', onMessage);

      container.appendChild(iframe);
      demoteGiscusContainer(container);
    });
  }

  /**
   * Re-points an already-mounted thread at a new term without a full reload
   * (uses giscus' postMessage config API). Falls back to a fresh mount if
   * nothing is mounted in `container` yet.
   */
  function setGiscusTerm(container, term) {
    if (!container || !term) return;
    var scoped = scopedDiscussionTerm(term);
    var iframe = container.querySelector('iframe.giscus-frame');
    if (!iframe) {
      mountGiscusThread(container, term);
      return;
    }
    if (container.dataset.giscusTerm === scoped) return;
    container.dataset.giscusTerm = scoped;
    iframe.contentWindow.postMessage({ giscus: { setConfig: { term: scoped } } }, GISCUS_ORIGIN);
  }

  function broadcastThemeToAll() {
    var theme = giscusTheme();
    document.querySelectorAll('iframe.giscus-frame').forEach(function (iframe) {
      applyGiscusFrameChrome(iframe);
      try {
        iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } }, GISCUS_ORIGIN);
      } catch (e) { /* ignore cross-origin races during teardown */ }
    });
  }

  var themeObserver = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === 'class') {
        broadcastThemeToAll();
        break;
      }
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true });

  function updateGuideDiscussionBadge(btn, count) {
    if (!btn) return;
    var badge = btn.querySelector('.guide-discussion-count');
    if (!badge) return;
    badge.textContent = String(count);
    badge.classList.toggle('hidden', count <= 0);
  }

  // Term -> count cache. Probes use direct widget iframes (parallel-safe).
  // Prefer Worker feed; probes are fallback only when Worker is down.
  var discussionCountCache = {};
  var discussionCountInFlight = {};
  var discussionCountCleanups = {};

  function abortDiscussionCountProbes() {
    Object.keys(discussionCountCleanups).forEach(function (t) {
      discussionCountCleanups[t]();
    });
  }

  /**
   * Probe one discussion term for its comment+reply count via a hidden
   * widget iframe with emitMetadata=1. Resolves 0 when the discussion does
   * not exist yet (or on timeout). Slow — use only when Worker fails.
   */
  function probeDiscussionCount(term) {
    if (!term) return Promise.resolve(0);
    var scoped = scopedDiscussionTerm(term);
    if (discussionCountCache[scoped] !== undefined) {
      return Promise.resolve(discussionCountCache[scoped]);
    }
    if (discussionCountInFlight[scoped]) {
      return discussionCountInFlight[scoped];
    }

    var promise = new Promise(function (resolve) {
      var iframe = document.createElement('iframe');
      iframe.className = 'giscus-count-probe-frame';
      iframe.setAttribute('aria-hidden', 'true');
      iframe.style.cssText = 'position:absolute;top:-9999px;width:1px;height:1px;opacity:0;border:0;pointer-events:none';
      iframe.src = buildGiscusSrc(term, { reactionsEnabled: '0', emitMetadata: '1' });

      var giveUpId = 0;
      function cleanup() {
        delete discussionCountInFlight[scoped];
        delete discussionCountCleanups[scoped];
        clearTimeout(giveUpId);
        window.removeEventListener('message', onMessage);
        iframe.remove();
      }
      discussionCountCleanups[scoped] = function () {
        cleanup();
        resolve(discussionCountCache[scoped] || 0);
      };

      function settle(count) {
        if (discussionCountCache[scoped] === undefined) {
          discussionCountCache[scoped] = count;
        }
        cleanup();
        resolve(discussionCountCache[scoped]);
      }

      function onMessage(e) {
        if (e.origin !== GISCUS_ORIGIN) return;
        if (e.source !== iframe.contentWindow) return;
        var data = e.data;
        if (!data || typeof data !== 'object' || !data.giscus) return;

        if (data.giscus.error && String(data.giscus.error).indexOf('Discussion not found') !== -1) {
          settle(0);
          return;
        }
        var d = data.giscus.discussion;
        if (!d) return;
        settle((d.totalCommentCount || 0) + (d.totalReplyCount || 0));
      }
      window.addEventListener('message', onMessage);
      giveUpId = setTimeout(function () { settle(0); }, 6000);
      document.body.appendChild(iframe);
    });

    discussionCountInFlight[scoped] = promise;
    return promise;
  }

  /** Collect unique per-question threads under a lecture root.
   * Sort by exam pattern (نمط / year) first, then by question number. */
  function collectQuestionThreads(lectureRoot) {
    if (!lectureRoot) return [];
    var seen = {};
    var items = [];
    lectureRoot.querySelectorAll('.mcq-comment-popup[data-discussion-term]').forEach(function (popup) {
      var term = popup.dataset.discussionTerm;
      if (!term || seen[term]) return;
      seen[term] = true;
      var num = parseInt(popup.dataset.questionNum, 10);
      if (!Number.isFinite(num)) num = 0;
      var source = popup.dataset.discussionSource || '';
      items.push({ term: term, num: num, cardId: term, source: source });
    });
    items.sort(compareQuestionIdentity);
    return items;
  }

  /** Strip [brackets] from a المصدر / نمط label for display. */
  function patternLabel(source) {
    return String(source || '').replace(/^\[|\]$/g, '').trim();
  }

  /** Sort key: years found in the pattern ascending, then full label, then num. */
  function patternSortYears(source) {
    var years = String(source || '').match(/20\d{2}/g);
    if (!years || !years.length) return [9999];
    return years.map(function (y) { return parseInt(y, 10); });
  }

  function compareQuestionIdentity(a, b) {
    var ya = patternSortYears(a.source);
    var yb = patternSortYears(b.source);
    var n = Math.max(ya.length, yb.length);
    for (var i = 0; i < n; i++) {
      var da = ya[i] != null ? ya[i] : 0;
      var db = yb[i] != null ? yb[i] : 0;
      if (da !== db) return da - db;
    }
    var la = patternLabel(a.source);
    var lb = patternLabel(b.source);
    if (la !== lb) return la < lb ? -1 : la > lb ? 1 : 0;
    if (a.num !== b.num) return a.num - b.num;
    return a.term < b.term ? -1 : a.term > b.term ? 1 : 0;
  }

  function runPool(items, limit, worker) {
    return new Promise(function (resolve) {
      var results = new Array(items.length);
      var next = 0;
      var active = 0;
      if (!items.length) {
        resolve(results);
        return;
      }
      function pump() {
        while (active < limit && next < items.length) {
          (function (i) {
            active++;
            Promise.resolve(worker(items[i], i)).then(function (value) {
              results[i] = value;
            }).catch(function () {
              results[i] = null;
            }).then(function () {
              active--;
              if (next >= items.length && active === 0) resolve(results);
              else pump();
            });
          })(next++);
        }
      }
      pump();
    });
  }

  function correctionTermFor(baseTerm) {
    return baseTerm ? baseTerm + '/correction' : baseTerm;
  }

  /**
   * Parse a structured correction comment body:
   *   🔧 تصحيح مقترح — السؤال سN …
   *   الإجابة الصحيحة برأيي: X
   *   السبب: …
   */
  function parseCorrectionBody(body) {
    if (!body) return null;
    var text = String(body);
    var looksLike =
      /🔧\s*تصحيح مقترح/.test(text) ||
      /تصحيح مقترح/.test(text) ||
      /الإجابة الصحيحة برأيي\s*:/.test(text);
    if (!looksLike) return null;

    var answerMatch = text.match(/الإجابة الصحيحة برأيي\s*:\s*([A-Za-zأ-ي٠-٩0-9])/u);
    var reasonMatch = text.match(/السبب\s*:\s*([\s\S]+)/u);
    var answer = answerMatch ? String(answerMatch[1]).toUpperCase() : null;
    var reason = reasonMatch ? reasonMatch[1].trim() : '';
    // Drop trailing author noise / replies markers from reason preview.
    if (reason.length > 180) reason = reason.slice(0, 177) + '…';
    return { answer: answer, reason: reason, raw: text };
  }

  /** Aggregate proposed letters + short reasons from a correction thread. */
  function summarizeCorrections(discussion) {
    var letters = {};
    var reasons = [];
    var corrCount = 0;
    var comments = (discussion && discussion.comments) || [];
    comments.forEach(function (c) {
      var parsed = parseCorrectionBody(c.body);
      if (!parsed) return;
      corrCount += 1;
      if (parsed.answer) {
        letters[parsed.answer] = (letters[parsed.answer] || 0) + 1;
      }
      if (parsed.reason && reasons.length < 3) {
        reasons.push({
          author: c.author,
          answer: parsed.answer,
          reason: parsed.reason,
        });
      }
    });
    return {
      letters: letters,
      reasons: reasons,
      corrCount: corrCount,
      distinctLetters: Object.keys(letters).length,
      totalCount: (discussion && discussion.totalCount) || comments.length,
    };
  }

  /** Higher = hotter (more correction comments / letter disagreement). */
  function correctionHotness(discussion) {
    var s = summarizeCorrections(discussion);
    var disagreement = s.distinctLetters > 1 ? s.distinctLetters * 8 : 0;
    return s.corrCount * 12 + disagreement + (s.totalCount || 0);
  }

  function thumbsUpCount(discussion) {
    if (!discussion) return 0;
    var groups = discussion.reactionGroups || {};
    var n = groups.THUMBS_UP || 0;
    (discussion.comments || []).forEach(function (c) {
      var g = c.reactionGroups || {};
      n += g.THUMBS_UP || 0;
    });
    return n;
  }

  /**
   * Resolve a discussion in the feed map. Tries the exact scoped term, then
   * drops a redundant `-pat-…-` segment (older threads / duplicated ids).
   */
  function lookupDiscussion(feedMap, term) {
    if (!feedMap || !term) return null;
    var scoped = scopedDiscussionTerm(term);
    if (feedMap[scoped]) return feedMap[scoped];
    var noPat = scoped.replace(/-pat-.+?-(q\d+(?:-\d+)?(?:\/correction)?)$/u, '-$1');
    if (noPat !== scoped && feedMap[noPat]) return feedMap[noPat];

    var found = null;
    Object.keys(feedMap).forEach(function (key) {
      if (found) return;
      var keyNoPat = key.replace(/-pat-.+?-(q\d+(?:-\d+)?(?:\/correction)?)$/u, '-$1');
      if (keyNoPat === scoped || keyNoPat === noPat) found = feedMap[key];
    });
    return found;
  }

  function formatRelativeTime(iso) {
    var t = Date.parse(iso);
    if (!Number.isFinite(t)) return '';
    var sec = Math.round((Date.now() - t) / 1000);
    if (sec < 60) return 'الآن';
    var min = Math.round(sec / 60);
    if (min < 60) return 'منذ ' + min + ' د';
    var hr = Math.round(min / 60);
    if (hr < 48) return 'منذ ' + hr + ' س';
    var day = Math.round(hr / 24);
    if (day < 30) return 'منذ ' + day + ' يوم';
    return new Date(t).toLocaleDateString('ar');
  }

  // title (scoped term) -> { title, url, comments: [...] }
  var discussionFeedCache = null;
  var discussionFeedCacheAt = 0;
  var discussionFeedPromise = null;

  function normalizeFeedMap(payload) {
    if (!payload) return null;
    if (payload.discussions && typeof payload.discussions === 'object') return payload.discussions;
    if (typeof payload === 'object' && !payload.generatedAt && !payload.error) return payload;
    return null;
  }

  function rememberFeed(map) {
    discussionFeedCache = map;
    discussionFeedCacheAt = Date.now();
    try {
      sessionStorage.setItem(
        FEED_STORAGE_KEY,
        JSON.stringify({ at: discussionFeedCacheAt, map: map }),
      );
    } catch (e) { /* quota */ }
    return map;
  }

  /** Cloudflare Worker → GitHub Discussions (live). */
  function loadWorkerDiscussionFeed() {
    if (!DISCUSSION_FEED_API) return Promise.reject(new Error('no DISCUSSION_FEED_API'));

    var url;
    try {
      var u = new URL(DISCUSSION_FEED_API);
      var scope = giscusTermScope();
      if (scope) u.searchParams.set('scope', scope);
      url = u.toString();
    } catch (e) {
      throw new Error('bad DISCUSSION_FEED_API');
    }

    return fetch(url, { cache: 'no-cache' }).then(function (res) {
      if (!res.ok) throw new Error('feed worker ' + res.status);
      return res.json();
    }).then(function (payload) {
      if (payload && payload.error) throw new Error(payload.error);
      var map = normalizeFeedMap(payload);
      if (!map) throw new Error('empty feed worker');
      return rememberFeed(map);
    });
  }

  /**
   * Load comment bodies for read-only UI (overview, chips, badges).
   * Worker first (authenticated + fast); null if Worker is down.
   */
  function loadDiscussionFeed(force) {
    if (force) {
      discussionFeedCache = null;
      discussionFeedCacheAt = 0;
      discussionFeedPromise = null;
      try { sessionStorage.removeItem(FEED_STORAGE_KEY); } catch (e) { /* ignore */ }
    }

    if (
      !force &&
      discussionFeedCache &&
      discussionFeedCacheAt &&
      Date.now() - discussionFeedCacheAt < DISCUSSION_FEED_CACHE_MS
    ) {
      return Promise.resolve(discussionFeedCache);
    }
    if (!force && discussionFeedPromise) return discussionFeedPromise;

    try {
      if (!force) {
        var raw = sessionStorage.getItem(FEED_STORAGE_KEY);
        if (raw) {
          var parsed = JSON.parse(raw);
          if (
            parsed &&
            parsed.at &&
            Date.now() - parsed.at < DISCUSSION_FEED_CACHE_MS &&
            parsed.map
          ) {
            discussionFeedCache = parsed.map;
            discussionFeedCacheAt = parsed.at;
            return Promise.resolve(discussionFeedCache);
          }
        }
      }
    } catch (e) { /* ignore */ }

    discussionFeedPromise = loadWorkerDiscussionFeed()
      .catch(function (err) {
        discussionFeedPromise = null;
        console.warn('[comments] discussion feed worker unavailable', err);
        return null;
      });

    return discussionFeedPromise;
  }

  /**
   * Open a question modal. opts.mode: 'general' | 'correction' | 'react'
   * opts.draftText: pre-composed correction text to show above Giscus.
   */
  function openQuestionCommentByTerm(baseTerm, opts) {
    var popup = null;
    document.querySelectorAll('.mcq-comment-popup[data-discussion-term]').forEach(function (el) {
      if (el.getAttribute('data-discussion-term') === baseTerm) popup = el;
    });
    if (!popup) return;
    var card = popup.closest('article');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    openQuestionModal(popup, opts || {});
  }

  function truncateText(s, max) {
    var t = String(s || '').replace(/\s+/g, ' ').trim();
    if (!t) return '';
    if (t.length <= max) return t;
    return t.slice(0, Math.max(0, max - 1)).trim() + '…';
  }

  /** Pull stem + options from the live MCQ card on the page (same term). */
  function extractMcqPreview(term) {
    if (!term) return null;
    var card = document.getElementById(term);
    if (!card) {
      var popup = null;
      document.querySelectorAll('.mcq-comment-popup[data-discussion-term]').forEach(function (el) {
        if (el.getAttribute('data-discussion-term') === term) popup = el;
      });
      card = popup && popup.closest('.mcq-card');
    }
    if (!card) return null;

    var optionsRoot = card.querySelector('.mcq-options');
    var stem = '';
    if (optionsRoot) {
      var prev = optionsRoot.previousElementSibling;
      while (prev) {
        if (prev.matches && (prev.matches('p') || prev.classList.contains('mb-lg'))) {
          stem = (prev.innerText || '').trim();
          break;
        }
        prev = prev.previousElementSibling;
      }
    }
    if (!stem) {
      var stemEl = card.querySelector(':scope > p, :scope > .mb-lg p, :scope > .mb-lg');
      if (stemEl) stem = (stemEl.innerText || '').trim();
    }

    var options = [];
    card.querySelectorAll('.mcq-options .mcq-opt').forEach(function (btn) {
      var key = String(btn.getAttribute('data-key') || '').toUpperCase();
      var textEl = btn.querySelector('.opt-text');
      options.push({
        key: key,
        text: truncateText(textEl ? textEl.innerText : btn.innerText, 90),
      });
    });

    return {
      stem: truncateText(stem, 180),
      options: options,
      siteAnswer: String(card.getAttribute('data-correct') || '').toUpperCase(),
    };
  }


  function renderCommentBubble(c, isReply) {
    var wrap = document.createElement('div');
    wrap.className = (isReply ? 'mr-lg ' : '') +
      'mb-xs px-sm py-xs rounded-xl bg-surface/60';

    var row = document.createElement('div');
    row.className = 'flex items-start gap-xs flex-wrap';

    var who = document.createElement('span');
    who.className = 'font-label-sm text-on-surface font-bold shrink-0';
    who.textContent = '@' + c.author;
    row.appendChild(who);

    var body = document.createElement('span');
    body.className = 'font-label-sm text-on-surface-variant min-w-0 leading-snug';
    body.textContent = truncateText(c.body || '', 140);
    row.appendChild(body);

    wrap.appendChild(row);
    return wrap;
  }

  function lettersSummaryText(letters) {
    var keys = Object.keys(letters || {}).sort();
    if (!keys.length) return '';
    return keys.map(function (k) {
      return k + '×' + letters[k];
    }).join(' · ');
  }

  function maxLetterCount(letters) {
    var max = 0;
    Object.keys(letters || {}).forEach(function (k) {
      if (letters[k] > max) max = letters[k];
    });
    return max;
  }

  /** Match option-letter chip colors used in the preview list. */
  function optionLetterChipClass(letter, letterCounts, siteAnswer) {
    var key = String(letter || '').toUpperCase();
    var counts = letterCounts || {};
    var n = counts[key] || 0;
    var top = maxLetterCount(counts);
    var isLead = n > 0 && n === top;
    var isSite = siteAnswer && key === siteAnswer;
    return 'shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-md font-label-sm ' +
      (isLead
        ? 'bg-primary text-on-primary'
        : isSite
          ? 'bg-secondary-container text-on-secondary-container'
          : 'bg-outline-variant/60 text-on-surface-variant');
  }

  function appendCommentsSection(parent, rows, letterCounts, siteAnswer) {
    if (!rows || !rows.length) return;

    var box = document.createElement('div');
    box.className = 'rounded-xl bg-surface-container/70 border border-outline-variant/50 px-sm py-sm mb-md';

    var heading = document.createElement('p');
    heading.className = 'font-label-sm text-on-surface-variant m-0 mb-sm';
    heading.textContent = 'تعليقات';
    box.appendChild(heading);

    var list = document.createElement('div');
    list.className = 'flex flex-col gap-xs';

    rows.forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'flex items-start gap-xs flex-wrap';

      if (r.answer) {
        var chip = document.createElement('span');
        chip.className = optionLetterChipClass(r.answer, letterCounts, siteAnswer);
        chip.textContent = r.answer;
        row.appendChild(chip);
      }

      var who = document.createElement('span');
      who.className = 'font-label-sm text-on-surface font-bold shrink-0';
      who.textContent = '@' + r.author;
      row.appendChild(who);

      if (r.text) {
        var body = document.createElement('span');
        body.className = 'font-label-sm text-on-surface-variant min-w-0 leading-snug';
        body.textContent = truncateText(r.text, 120);
        row.appendChild(body);
      }

      list.appendChild(row);
    });

    box.appendChild(list);
    parent.appendChild(box);
  }

  /**
   * Themed question + options: site answer badge, numeric student vote tags.
   */
  function appendMcqPreview(section, item, letterCounts) {
    var preview = extractMcqPreview(item.term);
    if (!preview || (!preview.stem && !(preview.options && preview.options.length))) return;

    var counts = letterCounts || {};
    var top = maxLetterCount(counts);

    if (preview.stem) {
      var stem = document.createElement('p');
      stem.className = 'font-label-md text-on-surface m-0 mb-sm leading-snug';
      stem.textContent = preview.stem;
      section.appendChild(stem);
    }

    if (!(preview.options && preview.options.length)) return;

    var list = document.createElement('ul');
    list.className = 'm-0 p-0 list-none flex flex-col gap-2xs mb-sm';

    preview.options.forEach(function (opt) {
      var n = counts[opt.key] || 0;
      var isLead = n > 0 && n === top;
      var isSite = preview.siteAnswer && opt.key === preview.siteAnswer;

      var li = document.createElement('li');
      li.className = 'm-0 flex items-center gap-xs flex-wrap px-sm py-xs rounded-lg border ' +
        (isLead
          ? 'border-primary/35 bg-primary/5'
          : isSite
            ? 'border-secondary-container bg-secondary-container/25'
            : 'border-outline-variant/50 bg-surface-container/40');

      var keySpan = document.createElement('span');
      keySpan.className = optionLetterChipClass(opt.key, counts, preview.siteAnswer)
        .replace('w-5 h-5', 'w-6 h-6');
      keySpan.textContent = opt.key;
      li.appendChild(keySpan);

      var txt = document.createElement('span');
      txt.className = 'min-w-0 flex-1 font-label-sm text-on-surface leading-snug';
      txt.textContent = opt.text;
      li.appendChild(txt);

      var tags = document.createElement('span');
      tags.className = 'shrink-0 inline-flex items-center gap-xs flex-wrap';

      if (isSite) {
        var siteTag = document.createElement('span');
        siteTag.className = 'inline-flex items-center px-sm py-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm';
        siteTag.textContent = 'جواب الموقع';
        tags.appendChild(siteTag);
      }

      if (n > 0) {
        var voteTag = document.createElement('span');
        voteTag.className = 'inline-flex items-center px-sm py-2xs rounded-full font-label-sm tabular-nums ' +
          (isLead
            ? 'bg-primary text-on-primary'
            : 'bg-tertiary-container text-on-tertiary-container');
        voteTag.textContent = '×' + n;
        voteTag.title = 'اقتراح طلاب: ' + opt.key + ' ×' + n;
        tags.appendChild(voteTag);
      }

      if (tags.childNodes.length) li.appendChild(tags);
      list.appendChild(li);
    });

    section.appendChild(list);
  }

  function buildQuestionFeedCard(item, kind, discussion) {
    var term = kind === 'correction' ? correctionTermFor(item.term) : item.term;
    var section = document.createElement('article');
    section.className = 'guide-discussion-q mb-md p-md rounded-2xl border border-outline-variant bg-surface-container-lowest dark:bg-surface-container/30 custom-shadow';
    section.dataset.questionNum = String(item.num);
    section.dataset.discussionTerm = term;
    section.dataset.discussionSource = item.source || '';
    section.dataset.discussionKind = kind;

    var summary = kind === 'correction' && discussion
      ? summarizeCorrections(discussion)
      : { letters: {}, reasons: [] };

    var count = (discussion && discussion.totalCount) || item.count || 0;
    var preview = extractMcqPreview(item.term);
    var siteAnswer = preview && preview.siteAnswer ? preview.siteAnswer : '';
    var letterCounts = kind === 'correction' ? summary.letters : {};

    var head = document.createElement('div');
    head.className = 'flex items-center gap-sm flex-wrap mb-sm';

    var title = document.createElement('span');
    title.className = 'inline-flex items-center px-sm py-xs rounded-lg bg-secondary-container text-on-secondary-container font-code-sm text-code-sm';
    title.textContent = 'س' + item.num;
    head.appendChild(title);

    if (kind === 'correction') {
      var peer = document.createElement('span');
      peer.className = 'inline-flex items-center px-sm py-2xs rounded-full bg-tertiary-container text-on-tertiary-container font-label-sm';
      peer.textContent = 'اقتراح طلاب';
      head.appendChild(peer);
    }

    if (siteAnswer) {
      var siteHead = document.createElement('span');
      siteHead.className = 'inline-flex items-center px-sm py-2xs rounded-full bg-secondary-container/80 text-on-secondary-container font-label-sm';
      siteHead.textContent = 'الموقع: ' + siteAnswer;
      head.appendChild(siteHead);
    }

    if (count > 0) {
      var countEl = document.createElement('span');
      countEl.className = 'inline-flex items-center px-sm py-2xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm mr-auto';
      countEl.textContent = count === 1 ? 'تعليق واحد' : count + ' تعليقات';
      head.appendChild(countEl);
    }

    var pattern = patternLabel(item.source);
    if (pattern) {
      var patEl = document.createElement('span');
      patEl.className = 'font-label-sm text-on-surface-variant';
      patEl.textContent = truncateText(pattern, 36);
      if (count <= 0) patEl.className += ' mr-auto';
      head.appendChild(patEl);
    }

    section.appendChild(head);

    appendMcqPreview(section, item, letterCounts);

    var commentRows = [];
    if (kind === 'correction' && discussion) {
      if (summary.reasons.length) {
        summary.reasons.slice(0, 4).forEach(function (r) {
          commentRows.push({
            author: r.author,
            answer: r.answer,
            text: r.reason,
          });
        });
      } else if (discussion.comments && discussion.comments.length) {
        discussion.comments.slice(0, 3).forEach(function (c) {
          var parsed = parseCorrectionBody(c.body);
          commentRows.push({
            author: c.author,
            answer: parsed && parsed.answer,
            text: (parsed && parsed.reason) || c.body,
          });
        });
      }
    } else if (discussion && discussion.comments && discussion.comments.length) {
      discussion.comments.slice(0, 3).forEach(function (c) {
        var parsed = parseCorrectionBody(c.body);
        commentRows.push({
          author: c.author,
          answer: parsed && parsed.answer,
          text: (parsed && parsed.reason) || c.body,
        });
      });
    }
    appendCommentsSection(section, commentRows, letterCounts, siteAnswer);

    var actions = document.createElement('div');
    actions.className = 'flex items-center gap-sm flex-wrap pt-xs border-t border-outline-variant/40';

    var commentBtn = document.createElement('button');
    commentBtn.type = 'button';
    commentBtn.className = 'px-md py-sm rounded-lg bg-primary text-on-primary font-label-md hover:opacity-90 transition-opacity';
    if (kind === 'correction') {
      commentBtn.textContent = 'اقترح تصحيحاً';
      commentBtn.addEventListener('click', function () {
        openQuestionCommentByTerm(item.term, { mode: 'correction' });
      });
    } else {
      commentBtn.textContent = 'علّق';
      commentBtn.addEventListener('click', function () {
        openQuestionCommentByTerm(item.term, { mode: 'general' });
      });
    }
    actions.appendChild(commentBtn);

    var jump = document.createElement('a');
    jump.href = '#' + encodeURIComponent(item.term);
    jump.className = 'px-md py-sm rounded-lg font-label-md text-on-surface-variant hover:bg-surface-variant transition-colors';
    jump.textContent = 'السؤال';
    actions.appendChild(jump);

    section.appendChild(actions);
    return section;
  }

  /**
   * Guide badge: prefer correction-thread counts from Worker.
   * Falls back to general+correction probes only when feedMap is null.
   */
  function refreshGuideDiscussionBadge(btn, feedMap) {
    var lecture = btn.closest('.lecture') || document;
    var questions = collectQuestionThreads(lecture);
    if (!questions.length) {
      updateGuideDiscussionBadge(btn, 0);
      return Promise.resolve(0);
    }

    if (feedMap) {
      var corrTotal = 0;
      var anyTotal = 0;
      questions.forEach(function (q) {
        var g = lookupDiscussion(feedMap, q.term);
        var c = lookupDiscussion(feedMap, correctionTermFor(q.term));
        corrTotal += (c && c.totalCount) || 0;
        anyTotal += (g && g.totalCount) || 0;
        anyTotal += (c && c.totalCount) || 0;
      });
      // Corrections-first: show correction count when any exist, else total activity.
      updateGuideDiscussionBadge(btn, corrTotal > 0 ? corrTotal : anyTotal);
      return Promise.resolve(corrTotal > 0 ? corrTotal : anyTotal);
    }

    return runPool(questions, 2, function (q) {
      return Promise.all([
        probeDiscussionCount(q.term),
        probeDiscussionCount(correctionTermFor(q.term)),
      ]).then(function (pair) {
        return { general: pair[0] || 0, corr: pair[1] || 0 };
      });
    }).then(function (counts) {
      var corrTotal = 0;
      var anyTotal = 0;
      for (var i = 0; i < counts.length; i++) {
        var row = counts[i] || { general: 0, corr: 0 };
        corrTotal += row.corr;
        anyTotal += row.general + row.corr;
      }
      var shown = corrTotal > 0 ? corrTotal : anyTotal;
      updateGuideDiscussionBadge(btn, shown);
      return shown;
    });
  }

  function renderEmptyCorrectionsCta(statusEl, listEl, questions) {
    statusEl.classList.add('hidden');
    listEl.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.className = 'p-lg text-center rounded-2xl border border-dashed border-outline-variant bg-surface-container/40';

    var title = document.createElement('p');
    title.className = 'font-headline-sm text-headline-sm text-on-surface m-0 mb-sm';
    title.textContent = 'ما في تصحيحات مقترحة بعد';
    wrap.appendChild(title);

    var hint = document.createElement('p');
    hint.className = 'font-body-md text-on-surface-variant m-0 mb-md';
    hint.textContent = 'إذا بتظن جواب سؤال غلط، اقترح التصحيح من بطاقة السؤال — يظهر هنا كمقترح من طلاب (مش تصحيح رسمي).';
    wrap.appendChild(hint);

    var cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'px-lg py-sm rounded-lg bg-primary text-on-primary font-label-md hover:opacity-90 transition-opacity';
    cta.textContent = 'اقترح تصحيحاً';
    cta.addEventListener('click', function () {
      if (questions && questions[0]) {
        openQuestionCommentByTerm(questions[0].term, { mode: 'correction' });
      }
    });
    wrap.appendChild(cta);

    listEl.appendChild(wrap);
  }

  function renderDiscussionList(listEl, statusEl, questions, kind, feedMap) {
    listEl.innerHTML = '';
    statusEl.classList.add('hidden');

    var matched = [];
    questions.forEach(function (q) {
      var term = kind === 'correction' ? correctionTermFor(q.term) : q.term;
      var discussion = lookupDiscussion(feedMap, term);
      var count = discussion ? discussion.totalCount : 0;
      if (count > 0) {
        matched.push({
          q: q,
          discussion: discussion,
          count: count,
          hotness: kind === 'correction' ? correctionHotness(discussion) : 0,
        });
      }
    });

    if (!matched.length) {
      if (kind === 'correction') {
        renderEmptyCorrectionsCta(statusEl, listEl, questions);
      } else {
        statusEl.textContent = 'ما في نقاشات على الأسئلة بعد — افتح أي سؤال وعلّق من أيقونة النقاش.';
        statusEl.classList.remove('hidden');
      }
      return Promise.resolve(0);
    }

    if (kind === 'correction') {
      matched.sort(function (a, b) {
        if (b.hotness !== a.hotness) return b.hotness - a.hotness;
        return compareQuestionIdentity(a.q, b.q);
      });
      matched.forEach(function (m) {
        listEl.appendChild(buildQuestionFeedCard(
          { term: m.q.term, num: m.q.num, source: m.q.source, count: m.count },
          kind,
          m.discussion,
        ));
      });
    } else {
      matched.sort(function (a, b) {
        return compareQuestionIdentity(a.q, b.q);
      });
      var lastPattern = null;
      matched.forEach(function (m) {
        var label = patternLabel(m.q.source) || 'بدون نمط';
        if (label !== lastPattern) {
          lastPattern = label;
          var h = document.createElement('h3');
          h.className = 'font-label-md text-primary mt-sm mb-xs first:mt-0 sticky top-0 bg-surface/95 backdrop-blur-sm py-2xs z-[1]';
          h.textContent = label;
          listEl.appendChild(h);
        }
        listEl.appendChild(buildQuestionFeedCard(
          { term: m.q.term, num: m.q.num, source: m.q.source, count: m.count },
          kind,
          m.discussion,
        ));
      });
    }
    return Promise.resolve(matched.length);
  }

  /**
   * When Worker is unavailable, fall back to giscus count probes and show
   * compact cards (still no expand/embed — point students at the question).
   */
  function renderDiscussionListFallback(listEl, statusEl, questions, kind) {
    listEl.innerHTML = '';
    statusEl.textContent = kind === 'correction'
      ? 'جارِ البحث عن التصحيحات المقترحة…'
      : 'جارِ البحث عن نقاشات الأسئلة…';
    statusEl.classList.remove('hidden');

    var found = [];
    return runPool(questions, 3, function (q) {
      var term = kind === 'correction' ? correctionTermFor(q.term) : q.term;
      return probeDiscussionCount(term).then(function (count) {
        if (count > 0) found.push({ q: q, count: count });
        return count;
      });
    }).then(function () {
      if (!found.length) {
        if (kind === 'correction') {
          renderEmptyCorrectionsCta(statusEl, listEl, questions);
        } else {
          statusEl.textContent = 'ما في نقاشات على الأسئلة بعد — افتح أي سؤال وعلّق من أيقونة النقاش.';
          statusEl.classList.remove('hidden');
        }
        return 0;
      }
      statusEl.classList.add('hidden');
      found.sort(function (a, b) { return compareQuestionIdentity(a.q, b.q); });
      var lastPattern = null;
      found.forEach(function (m) {
        if (kind !== 'correction') {
          var label = patternLabel(m.q.source) || 'بدون نمط';
          if (label !== lastPattern) {
            lastPattern = label;
            var h = document.createElement('h3');
            h.className = 'font-label-md text-primary mt-sm mb-xs first:mt-0';
            h.textContent = label;
            listEl.appendChild(h);
          }
        }
        listEl.appendChild(buildQuestionFeedCard(
          { term: m.q.term, num: m.q.num, source: m.q.source, count: m.count },
          kind,
          null,
        ));
      });
      return found.length;
    });
  }

  /**
   * General DAWRAT discussion panel: corrections-first overview.
   * Writing stays on the question modal (Giscus).
   */
  function mountGuideDiscussionByQuestion(panel, btn) {
    var lecture = (btn && btn.closest('.lecture')) || panel.closest('.lecture') || document;
    var questions = collectQuestionThreads(lecture);

    panel.innerHTML = '';
    panel.dataset.mounted = '1';

    if (!questions.length) {
      var empty = document.createElement('div');
      empty.className = 'p-md text-center font-label-md text-on-surface-variant';
      empty.textContent = 'ما في أسئلة على هذه الصفحة لعرض نقاشاتها.';
      panel.appendChild(empty);
      return;
    }

    var tabs = document.createElement('div');
    tabs.className = 'flex gap-sm mb-md flex-wrap';

    function makeTab(id, label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.tab = id;
      b.className = 'guide-discussion-tab px-md py-sm rounded-full border border-outline-variant font-label-md hover:bg-surface-variant transition-all';
      b.textContent = label;
      return b;
    }

    // Default tab = corrections (corrections-first overview).
    var tabCorr = makeTab('corrections', 'التصحيحات المقترحة');
    var tabByQ = makeTab('by-question', 'حسب النمط والسؤال');
    tabs.appendChild(tabCorr);
    tabs.appendChild(tabByQ);
    panel.appendChild(tabs);

    var intro = document.createElement('p');
    intro.className = 'mb-md font-label-md text-on-surface-variant';
    panel.appendChild(intro);

    var statusEl = document.createElement('div');
    statusEl.className = 'py-sm text-center font-label-sm text-on-surface-variant';
    statusEl.textContent = 'جارِ التحميل…';
    panel.appendChild(statusEl);

    var scroller = document.createElement('div');
    scroller.className = 'guide-discussion-scroller max-h-[min(72vh,42rem)] overflow-y-auto overscroll-contain pe-xs rounded-2xl border border-outline-variant/60 bg-surface-container/30 p-sm';
    panel.appendChild(scroller);

    var listEl = document.createElement('div');
    listEl.className = 'guide-discussion-list';
    scroller.appendChild(listEl);

    var feedMapRef = null;

    function setActiveTab(id) {
      [tabByQ, tabCorr].forEach(function (b) {
        var on = b.dataset.tab === id;
        b.classList.toggle('bg-secondary-container', on);
        b.classList.toggle('text-on-secondary-container', on);
        b.classList.toggle('border-transparent', on);
      });
      intro.textContent = id === 'corrections'
        ? 'اقتراحات الطلاب بجانب كل خيار — وشارة "جواب الموقع" توضّح اختيار الدليل.'
        : 'نقاش الأسئلة — اسحب داخل الصندوق للقراءة.';
    }

    function showTab(id, forceFeed) {
      setActiveTab(id);
      var kind = id === 'corrections' ? 'correction' : 'general';
      statusEl.textContent = 'جارِ التحميل…';
      statusEl.classList.remove('hidden');
      listEl.innerHTML = '';

      var ready = (!forceFeed && feedMapRef)
        ? Promise.resolve(feedMapRef)
        : loadDiscussionFeed(!!forceFeed);

      ready.then(function (feedMap) {
        feedMapRef = feedMap;
        if (feedMap) {
          return renderDiscussionList(listEl, statusEl, questions, kind, feedMap)
            .then(function () {
              if (btn) refreshGuideDiscussionBadge(btn, feedMap);
            });
        }
        return renderDiscussionListFallback(listEl, statusEl, questions, kind)
          .then(function () {
            if (btn) refreshGuideDiscussionBadge(btn, null);
          });
      });
    }

    tabByQ.addEventListener('click', function () { showTab('by-question', false); });
    tabCorr.addEventListener('click', function () { showTab('corrections', false); });
    showTab('corrections', true);
  }

  function buildCorrectionText(popup) {
    var qNum = popup.dataset.questionNum || '';
    var pattern = patternLabel(popup.dataset.discussionSource || '');
    var select = popup.querySelector('.mcq-correction-answer');
    var reason = popup.querySelector('.mcq-correction-reason');
    var answer = select ? select.value : '';
    var why = reason ? reason.value.trim() : '';
    return '🔧 تصحيح مقترح — السؤال س' + qNum +
      (pattern ? ' · ' + pattern : '') + '\n' +
      'الإجابة الصحيحة برأيي: ' + answer + '\n' +
      (why ? 'السبب: ' + why : '');
  }

  function copyTextBestEffort(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; })
        .catch(function () { return false; });
    }
    return Promise.resolve(false);
  }

  /**
   * Show composed correction above the Giscus iframe. True prefill into the
   * iframe is impossible (cross-origin); clipboard + visible draft is the
   * practical path. Also tries a harmless postMessage in case future giscus
   * adds a compose API (ignored today).
   */
  function showCorrectionDraft(popup, text) {
    var draft = popup.querySelector('.mcq-correction-draft');
    var draftText = popup.querySelector('.mcq-correction-draft-text');
    if (draftText) draftText.textContent = text;
    if (draft) draft.classList.remove('hidden');

    var hint = popup.querySelector('.mcq-correction-hint');
    if (hint) {
      hint.classList.remove('hidden');
      hint.textContent = 'تم تجهيز النص ونسخه إن أمكن — الصقه (Ctrl+V / ⌘V) في صندوق التعليق أدناه ثم أرسل.';
    }

    var thread = popup.querySelector('.mcq-comment-thread');
    var iframe = thread && thread.querySelector('iframe.giscus-frame');
    if (iframe && iframe.contentWindow) {
      try {
        // Best-effort: current giscus ignores unknown keys; no-op if unsupported.
        iframe.contentWindow.postMessage({
          giscus: { setConfig: { /* no official comment-prefill API */ } },
        }, GISCUS_ORIGIN);
      } catch (e) { /* ignore */ }
    }
  }

  function scrollThreadIntoModal(popup, thread, preferTop) {
    var dialog = popup.querySelector('.mcq-comment-dialog');
    var iframe = thread && thread.querySelector('iframe.giscus-frame');
    if (!dialog || !iframe) return;
    setTimeout(function () {
      if (preferTop) {
        // Reactions sit at the top of the Giscus widget.
        iframe.scrollIntoView({ block: 'start', behavior: 'smooth' });
        dialog.scrollTop = Math.max(0, iframe.offsetTop - 12);
      } else {
        iframe.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        dialog.scrollTop = Math.max(0, dialog.scrollHeight - dialog.clientHeight);
      }
    }, 300);
  }

  function resetModePicker(popup) {
    var picker = popup.querySelector('.mcq-comment-mode-picker');
    if (picker) picker.classList.remove('hidden');
    var form = popup.querySelector('.mcq-correction-form');
    if (form) form.classList.add('hidden');
  }

  /**
   * opts.mode: 'general' | 'correction' | 'react'
   * opts.draftText: optional pre-built correction body
   */
  function openQuestionModal(popup, opts) {
    opts = opts || {};
    popup.classList.remove('hidden');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    var term = popup.dataset.discussionTerm;
    var thread = popup.querySelector('.mcq-comment-thread');
    var mode = opts.mode || 'general';
    if (term) rememberGiscusReturnContext({ term: term, mode: mode });

    if (mode === 'correction') {
      var picker = popup.querySelector('.mcq-comment-mode-picker');
      if (picker) picker.classList.add('hidden');
      var form = popup.querySelector('.mcq-correction-form');
      if (form && !opts.draftText) form.classList.remove('hidden');
      if (opts.draftText) {
        if (form) form.classList.add('hidden');
        showCorrectionDraft(popup, opts.draftText);
      }
      if (thread && term) {
        delete thread.dataset.mounted;
        mountGiscusThread(thread, correctionTermFor(term)).then(function () {
          scrollThreadIntoModal(popup, thread, false);
          if (opts.draftText) showCorrectionDraft(popup, opts.draftText);
        });
      }
      return;
    }

    // general or react — mount base discussion term
    resetModePicker(popup);
    var draft = popup.querySelector('.mcq-correction-draft');
    if (draft) draft.classList.add('hidden');

    if (thread && term) {
      if (thread.dataset.giscusTerm && thread.dataset.giscusTerm.indexOf('/correction') !== -1) {
        delete thread.dataset.mounted;
      }
      if (!thread.dataset.mounted) {
        mountGiscusThread(thread, term).then(function () {
          scrollThreadIntoModal(popup, thread, mode === 'react');
        });
      } else if (mode === 'react') {
        scrollThreadIntoModal(popup, thread, true);
      }
    }
  }

  function closeQuestionModal(popup) {
    popup.classList.add('hidden');
    popup.style.display = '';
    document.body.style.overflow = '';
  }

  function submitCorrectionFromForm(popup) {
    var text = buildCorrectionText(popup);
    var form = popup.querySelector('.mcq-correction-form');
    if (form) form.classList.add('hidden');

    copyTextBestEffort(text).then(function () {
      showCorrectionDraft(popup, text);
      var baseTerm = popup.dataset.discussionTerm;
      var thread = popup.querySelector('.mcq-comment-thread');
      if (thread && baseTerm) {
        delete thread.dataset.mounted;
        mountGiscusThread(thread, correctionTermFor(baseTerm)).then(function () {
          scrollThreadIntoModal(popup, thread, false);
          showCorrectionDraft(popup, text);
        });
      }
    });
  }

  /**
   * One minimal outline summary on the card: chat N · build N · thumb N.
   * No pills/circles — just outline icons + numbers.
   */
  function enrichMcqCardsFromFeed(feedMap) {
    if (!feedMap) return;
    document.querySelectorAll('.mcq-card').forEach(function (card) {
      var popup = card.querySelector('.mcq-comment-popup[data-discussion-term]');
      var term = (popup && popup.dataset.discussionTerm) || card.dataset.discussionTerm;
      if (!term) return;

      var general = lookupDiscussion(feedMap, term);
      var corr = lookupDiscussion(feedMap, correctionTermFor(term));
      var gCount = (general && general.totalCount) || 0;
      var corrCount = (corr && corr.totalCount) || 0;
      var totalComments = gCount + corrCount;
      var thumbs = thumbsUpCount(general) + thumbsUpCount(corr);

      var summary = card.querySelector('.mcq-discuss-summary');
      if (!summary) return;

      var commentsEl = summary.querySelector('.mcq-discuss-comments');
      if (commentsEl) commentsEl.textContent = String(totalComments);

      var corrWrap = summary.querySelector('.mcq-discuss-corr-wrap');
      var corrEl = summary.querySelector('.mcq-discuss-corr');
      if (corrWrap && corrEl) {
        if (corrCount > 0) {
          corrEl.textContent = String(corrCount);
          corrWrap.classList.remove('hidden');
        } else {
          corrWrap.classList.add('hidden');
        }
      }

      var reactWrap = summary.querySelector('.mcq-discuss-react-wrap');
      var reactEl = summary.querySelector('.mcq-discuss-react');
      if (reactWrap && reactEl) {
        if (thumbs > 0) {
          reactEl.textContent = String(thumbs);
          reactWrap.classList.remove('hidden');
        } else {
          reactWrap.classList.add('hidden');
        }
      }

      summary.dataset.hasCorrections = corrCount > 0 ? '1' : '0';
      summary.title =
        (totalComments ? totalComments + ' تعليق' : 'لا تعليقات بعد') +
        (corrCount ? ' · ' + corrCount + ' تصحيح' : '') +
        (thumbs ? ' · ' + thumbs + ' إعجاب' : '');
      if (totalComments > 0) {
        summary.classList.add('text-on-surface');
        summary.classList.remove('text-on-surface-variant');
      } else {
        summary.classList.add('text-on-surface-variant');
        summary.classList.remove('text-on-surface');
      }
    });
  }

  var bootstrapTimer = null;
  /** After OAuth return, reopen the question modal once exam cards exist. */
  var reopenAuthAttempts = 0;
  function maybeReopenAfterAuth() {
    var saved = window.__GISCUS_REOPEN__;
    if (!saved || !saved.term) return;
    var base = baseTermFromAny(saved.term);
    if (!base) {
      delete window.__GISCUS_REOPEN__;
      return;
    }
    var popup = null;
    document.querySelectorAll('.mcq-comment-popup[data-discussion-term]').forEach(function (el) {
      if (el.getAttribute('data-discussion-term') === base) popup = el;
    });
    if (!popup) {
      if (reopenAuthAttempts++ < 40) setTimeout(maybeReopenAfterAuth, 300);
      return;
    }
    delete window.__GISCUS_REOPEN__;
    reopenAuthAttempts = 0;
    try { sessionStorage.removeItem(GISCUS_RETURN_KEY); } catch (e) { /* ignore */ }
    openQuestionModal(popup, { mode: saved.mode || 'general' });
  }

  function bootstrapFeedUi() {
    loadDiscussionFeed(false).then(function (feedMap) {
      if (!feedMap) return;
      document.querySelectorAll('.guide-discussion-toggle').forEach(function (btn) {
        refreshGuideDiscussionBadge(btn, feedMap);
      });
      enrichMcqCardsFromFeed(feedMap);
      maybeReopenAfterAuth();
    });
  }

  /** DAWRAT/lectures inject MCQ cards after DOMContentLoaded — re-enrich then. */
  function scheduleBootstrapFeedUi() {
    if (bootstrapTimer) clearTimeout(bootstrapTimer);
    bootstrapTimer = setTimeout(function () {
      bootstrapTimer = null;
      if (!document.querySelector('.mcq-card')) return;
      bootstrapFeedUi();
      maybeReopenAfterAuth();
    }, 250);
  }

  document.addEventListener('click', function (e) {
    var guideBtn = e.target.closest('.guide-discussion-toggle');
    if (guideBtn) {
      var panel = guideBtn.parentElement && guideBtn.parentElement.querySelector('.guide-discussion-panel');
      if (!panel) return;
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden')) {
        // Remount each open so the Worker feed can refresh (short TTL).
        delete panel.dataset.mounted;
        mountGuideDiscussionByQuestion(panel, guideBtn);
      }
      return;
    }

    var discussSummary = e.target.closest('.mcq-discuss-summary');
    if (discussSummary) {
      var sPopup = discussSummary.closest('article') &&
        discussSummary.closest('article').querySelector('.mcq-comment-popup');
      if (sPopup) {
        var mode = discussSummary.dataset.hasCorrections === '1' ? 'correction' : 'general';
        openQuestionModal(sPopup, { mode: mode });
      }
      return;
    }

    // Legacy single buttons (older cached HTML) — still open the modal.
    var legacyDiscuss = e.target.closest(
      '.mcq-comment-btn, .mcq-comment-count-btn, .mcq-react-btn, .mcq-correction-chip',
    );
    if (legacyDiscuss) {
      var lPopup = legacyDiscuss.closest('article') &&
        legacyDiscuss.closest('article').querySelector('.mcq-comment-popup');
      if (!lPopup) return;
      if (legacyDiscuss.classList.contains('mcq-correction-chip')) {
        openQuestionModal(lPopup, { mode: 'correction' });
      } else if (legacyDiscuss.classList.contains('mcq-react-btn')) {
        openQuestionModal(lPopup, { mode: 'react' });
      } else {
        openQuestionModal(lPopup, { mode: 'general' });
      }
      return;
    }

    var closeBtn = e.target.closest('.mcq-comment-close');
    var backdrop = e.target.closest('.mcq-comment-backdrop');
    if (closeBtn || backdrop) {
      var closePopup = e.target.closest('.mcq-comment-popup');
      if (closePopup) closeQuestionModal(closePopup);
      return;
    }

    var modeBtn = e.target.closest('.mcq-comment-mode-btn');
    if (modeBtn) {
      var mPopup = modeBtn.closest('.mcq-comment-popup');
      if (!mPopup) return;
      var picker = mPopup.querySelector('.mcq-comment-mode-picker');
      if (picker) picker.classList.add('hidden');

      var mTerm = mPopup.dataset.discussionTerm;
      var mThread = mPopup.querySelector('.mcq-comment-thread');

      if (modeBtn.dataset.mode === 'correction') {
        var form = mPopup.querySelector('.mcq-correction-form');
        if (form) form.classList.remove('hidden');
        var draftBox = mPopup.querySelector('.mcq-correction-draft');
        if (draftBox) draftBox.classList.add('hidden');
      } else if (mThread && mTerm) {
        var draftHide = mPopup.querySelector('.mcq-correction-draft');
        if (draftHide) draftHide.classList.add('hidden');
        delete mThread.dataset.mounted;
        mountGiscusThread(mThread, mTerm).then(function () {
          scrollThreadIntoModal(mPopup, mThread, false);
        });
      }
      return;
    }

    var submitBtn = e.target.closest('.mcq-correction-submit-btn, .mcq-correction-copy-btn');
    if (submitBtn) {
      var sPopup = submitBtn.closest('.mcq-comment-popup');
      if (sPopup) submitCorrectionFromForm(sPopup);
      return;
    }

    var recopyBtn = e.target.closest('.mcq-correction-recopy-btn');
    if (recopyBtn) {
      var dPopup = recopyBtn.closest('.mcq-comment-popup');
      var draftEl = dPopup && dPopup.querySelector('.mcq-correction-draft-text');
      if (draftEl && draftEl.textContent) {
        copyTextBestEffort(draftEl.textContent).then(function (ok) {
          var hint = dPopup.querySelector('.mcq-correction-hint');
          if (hint) {
            hint.classList.remove('hidden');
            hint.textContent = ok
              ? 'تم النسخ — الصق في صندوق Giscus أدناه (Ctrl+V / ⌘V).'
              : 'حدّد النص أعلاه وانسخه يدوياً، ثم الصقه في صندوق التعليق.';
          }
        });
      }
      return;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.mcq-comment-popup:not(.hidden)');
    if (open) closeQuestionModal(open);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleBootstrapFeedUi);
  } else {
    scheduleBootstrapFeedUi();
  }

  window.addEventListener('hashchange', scheduleBootstrapFeedUi);

  // Exams/lectures inject .mcq-card after first paint — watch #content (or body).
  try {
    var observeRoot = document.getElementById('content') || document.body;
    if (observeRoot && typeof MutationObserver !== 'undefined') {
      var mo = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var nodes = mutations[i].addedNodes;
          for (var j = 0; j < nodes.length; j++) {
            var n = nodes[j];
            if (n.nodeType !== 1) continue;
            if (
              (n.classList && n.classList.contains('mcq-card')) ||
              (n.querySelector && n.querySelector('.mcq-card'))
            ) {
              scheduleBootstrapFeedUi();
              return;
            }
          }
        }
      });
      mo.observe(observeRoot, { childList: true, subtree: true });
    }
  } catch (e) { /* ignore */ }

  window.mountGiscusThread = mountGiscusThread;
  window.setGiscusTerm = setGiscusTerm;
  window.refreshDiscussionCardBadges = scheduleBootstrapFeedUi;
})();
