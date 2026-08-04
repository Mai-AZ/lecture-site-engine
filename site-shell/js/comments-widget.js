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

  /** giscus stores the OAuth session in localStorage (same key as client.js). */
  function getGiscusSession() {
    try {
      var raw = localStorage.getItem('giscus-session');
      return raw ? JSON.parse(raw) : '';
    } catch (e) {
      return '';
    }
  }

  /**
   * Build a direct widget iframe URL. Using the widget iframe (instead of
   * injecting client.js) lets us host many threads on one page — client.js
   * always does document.querySelector('.giscus') and reuses the first match.
   */
  function buildGiscusSrc(term, opts) {
    opts = opts || {};
    var params = new URLSearchParams();
    var originUrl = new URL(location.href);
    originUrl.searchParams.delete('giscus');
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
    // Tall enough to fit reactions + the write box before the first
    // resizeHeight ping arrives. giscus uses scrolling=no, so a short
    // iframe literally clips the comment composer.
    iframe.style.cssText = 'width:100%;border:0;min-height:24rem;color-scheme:none';
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
   * not exist yet (or on timeout).
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

  /** Collect unique per-question threads under a lecture root, ordered by question number. */
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
      items.push({ term: term, num: num, cardId: term });
    });
    items.sort(function (a, b) {
      if (a.num !== b.num) return a.num - b.num;
      return a.term < b.term ? -1 : a.term > b.term ? 1 : 0;
    });
    return items;
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

  /**
   * Probe every question on this lecture and update the guide badge with the
   * total comment count across questions that already have a thread.
   * Kept gentle (concurrency 2) — DAWRAT banks often have 100+ questions.
   */
  function refreshGuideDiscussionBadge(btn) {
    var lecture = btn.closest('.lecture') || document;
    var questions = collectQuestionThreads(lecture);
    if (!questions.length) {
      updateGuideDiscussionBadge(btn, 0);
      return Promise.resolve(0);
    }
    return runPool(questions, 2, function (q) {
      return probeDiscussionCount(q.term);
    }).then(function (counts) {
      var total = 0;
      for (var i = 0; i < counts.length; i++) total += counts[i] || 0;
      updateGuideDiscussionBadge(btn, total);
      return total;
    });
  }

  function updateQuestionSectionCount(section, count) {
    var badge = section.querySelector('.guide-discussion-q-count');
    if (!badge) return;
    if (count > 0) {
      badge.textContent = count + (count === 1 ? ' تعليق' : ' تعليقات');
      badge.classList.remove('hidden');
    } else {
      badge.textContent = '';
      badge.classList.add('hidden');
    }
  }

  /**
   * General DAWRAT discussion panel: every question gets a slot, ordered by
   * question number. Threads mount on demand (expand) so we don't open
   * hundreds of giscus iframes at once.
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

    var intro = document.createElement('p');
    intro.className = 'mb-lg font-label-md text-on-surface-variant';
    intro.textContent = 'كل سؤال له نقاش مستقل، مرتّب حسب رقم السؤال. اضغط "عرض النقاش" لفتحه:';
    panel.appendChild(intro);

    questions.forEach(function (item) {
      var section = document.createElement('section');
      section.className = 'guide-discussion-q mb-md p-md rounded-xl border border-outline-variant bg-surface-container-lowest dark:bg-transparent';
      section.dataset.questionNum = String(item.num);
      section.dataset.discussionTerm = item.term;

      var head = document.createElement('div');
      head.className = 'flex items-center gap-sm flex-wrap';

      var title = document.createElement('h4');
      title.className = 'font-headline-sm text-headline-sm text-on-surface m-0';
      title.textContent = 'س' + item.num;
      head.appendChild(title);

      var countEl = document.createElement('span');
      countEl.className = 'guide-discussion-q-count hidden px-sm py-2xs bg-secondary-container text-on-secondary-container rounded-full font-label-sm';
      head.appendChild(countEl);

      var jump = document.createElement('a');
      jump.href = '#' + encodeURIComponent(item.term);
      jump.className = 'font-label-sm text-primary underline';
      jump.textContent = 'اذهب للسؤال';
      head.appendChild(jump);

      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'guide-discussion-q-toggle mr-auto px-md py-sm rounded-lg border border-outline-variant hover:bg-surface-variant transition-all font-label-md';
      toggle.textContent = 'عرض النقاش';
      head.appendChild(toggle);

      section.appendChild(head);

      var thread = document.createElement('div');
      thread.className = 'guide-discussion-q-thread hidden mt-md';
      section.appendChild(thread);
      panel.appendChild(section);

      toggle.addEventListener('click', function () {
        var open = !thread.classList.contains('hidden');
        if (open) {
          thread.classList.add('hidden');
          toggle.textContent = 'عرض النقاش';
          return;
        }
        thread.classList.remove('hidden');
        toggle.textContent = 'إخفاء النقاش';
        if (!thread.dataset.mounted) {
          mountGiscusThread(thread, item.term);
        }
      });
    });
  }

  function scanForUncountedToggles() {
    // Badge is filled when the user opens the panel / expands threads —
    // probing every question on hashchange floods the page with iframes.
  }
  window.addEventListener('hashchange', scanForUncountedToggles);

  function buildCorrectionText(popup) {
    var qNum = popup.dataset.questionNum || '';
    var select = popup.querySelector('.mcq-correction-answer');
    var reason = popup.querySelector('.mcq-correction-reason');
    var answer = select ? select.value : '';
    var why = reason ? reason.value.trim() : '';
    return '🔧 تصحيح مقترح — السؤال س' + qNum + '\n' +
      'الإجابة الصحيحة برأيي: ' + answer + '\n' +
      (why ? 'السبب: ' + why : '');
  }

  function openQuestionModal(popup) {
    popup.classList.remove('hidden');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeQuestionModal(popup) {
    popup.classList.add('hidden');
    popup.style.display = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    // Page-level "general discussion" — aggregate of per-question threads,
    // ordered by question number (not by comment time).
    var guideBtn = e.target.closest('.guide-discussion-toggle');
    if (guideBtn) {
      var panel = guideBtn.parentElement && guideBtn.parentElement.querySelector('.guide-discussion-panel');
      if (!panel) return;
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden') && !panel.dataset.mounted) {
        mountGuideDiscussionByQuestion(panel, guideBtn);
      }
      return;
    }

    var qBtn = e.target.closest('.mcq-comment-btn');
    if (qBtn) {
      var qPopup = qBtn.closest('article') && qBtn.closest('article').querySelector('.mcq-comment-popup');
      if (qPopup) openQuestionModal(qPopup);
      return;
    }

    var closeBtn = e.target.closest('.mcq-comment-close');
    var backdrop = e.target.closest('.mcq-comment-backdrop');
    if (closeBtn || backdrop) {
      var closePopup = e.target.closest('.mcq-comment-popup');
      if (closePopup) closeQuestionModal(closePopup);
      return;
    }

    // Per-question modal modes — each question keeps its own thread.
    var modeBtn = e.target.closest('.mcq-comment-mode-btn');
    if (modeBtn) {
      var mPopup = modeBtn.closest('.mcq-comment-popup');
      if (!mPopup) return;
      var picker = mPopup.querySelector('.mcq-comment-mode-picker');
      if (picker) picker.classList.add('hidden');

      if (modeBtn.dataset.mode === 'correction') {
        var form = mPopup.querySelector('.mcq-correction-form');
        if (form) form.classList.remove('hidden');
      } else {
        var mTerm = mPopup.dataset.discussionTerm;
        var mThread = mPopup.querySelector('.mcq-comment-thread');
        if (mThread && !mThread.dataset.mounted) {
          mountGiscusThread(mThread, mTerm);
        }
      }
      return;
    }

    var copyBtn = e.target.closest('.mcq-correction-copy-btn');
    if (copyBtn) {
      var cPopup = copyBtn.closest('.mcq-comment-popup');
      if (!cPopup) return;
      var text = buildCorrectionText(cPopup);

      (navigator.clipboard && navigator.clipboard.writeText
        ? navigator.clipboard.writeText(text)
        : Promise.reject()
      ).catch(function () { /* clipboard unavailable — hint still shows */ })
      .finally(function () {
        var hint = cPopup.querySelector('.mcq-correction-hint');
        if (hint) hint.classList.remove('hidden');
        var cForm = cPopup.querySelector('.mcq-correction-form');
        if (cForm) cForm.classList.add('hidden');

        var discussionTerm = cPopup.dataset.discussionTerm;
        var cThread = cPopup.querySelector('.mcq-comment-thread');
        if (cThread && !cThread.dataset.mounted) {
          mountGiscusThread(cThread, discussionTerm);
        }
      });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.mcq-comment-popup:not(.hidden)');
    if (open) closeQuestionModal(open);
  });

  window.mountGiscusThread = mountGiscusThread;
  window.setGiscusTerm = setGiscusTerm;
})();
