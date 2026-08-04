(function () {
  'use strict';

  // giscus config — generated at giscus.app, tied to the "comment for exams"
  // Discussion category (format: Announcement) on this repo.
  var GISCUS_REPO         = 'homs-uni/lecture-site-engine';
  var GISCUS_REPO_ID      = 'R_kgDOTL05VA';
  var GISCUS_CATEGORY     = 'comments on exams';
  var GISCUS_CATEGORY_ID  = 'DIC_kwDOTL05VM4DCod2';
  var GISCUS_LANG         = 'ar';

  function giscusTheme() {
    return document.documentElement.classList.contains('dark') ? 'noborder_dark' : 'noborder_light';
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
   * Each unique term gets its own Discussion thread (see data-mapping="specific").
   * Safe to call multiple times on different containers with different terms
   * (e.g. one call for a page-level "Discussion" tab, one per flagged question).
   *
   * Shows a loading state immediately, and if the widget hasn't actually
   * appeared within a few seconds (giscus occasionally fails to load —
   * flaky network, ad blockers, etc.), swaps in a retry button + a direct
   * link to the discussion on GitHub, instead of leaving a silent empty box.
   */
  function mountGiscusThread(container, term) {
    if (!container || !term) return;
    container.innerHTML = '';
    delete container.dataset.mounted;

    var loading = document.createElement('div');
    loading.className = 'mcq-comment-loading p-md text-center font-label-md text-on-surface-variant';
    loading.textContent = 'جارِ تحميل التعليقات…';
    container.appendChild(loading);

    var script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', term);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', giscusTheme());
    script.setAttribute('data-lang', GISCUS_LANG);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    var settled = false;
    var timeoutId = setTimeout(function () {
      if (settled || container.querySelector('iframe.giscus-frame')) return;
      settled = true;
      container.innerHTML = '';
      container.appendChild(buildLoadErrorEl(container, term));
    }, 8000);

    script.addEventListener('error', function () {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      container.innerHTML = '';
      container.appendChild(buildLoadErrorEl(container, term));
    });

    // Once the iframe actually shows up, clear the timeout and drop the
    // loading placeholder (giscus appends the iframe as a sibling, so the
    // loading div would otherwise sit above it forever).
    var settleObserver = new MutationObserver(function () {
      if (container.querySelector('iframe.giscus-frame')) {
        settled = true;
        clearTimeout(timeoutId);
        loading.remove();
        settleObserver.disconnect();
      }
    });
    settleObserver.observe(container, { childList: true });

    container.appendChild(script);
    container.dataset.giscusTerm = term;
    container.dataset.mounted = '1';
  }

  /**
   * Re-points an already-mounted thread at a new term without a full reload
   * (uses giscus' postMessage config API). Falls back to a fresh mount if
   * nothing is mounted in `container` yet.
   */
  function setGiscusTerm(container, term) {
    if (!container || !term) return;
    var iframe = container.querySelector('iframe.giscus-frame');
    if (!iframe) {
      mountGiscusThread(container, term);
      return;
    }
    if (container.dataset.giscusTerm === term) return;
    container.dataset.giscusTerm = term;
    iframe.contentWindow.postMessage({ giscus: { setConfig: { term: term } } }, 'https://giscus.app');
  }

  function broadcastThemeToAll() {
    var theme = giscusTheme();
    document.querySelectorAll('iframe.giscus-frame').forEach(function (iframe) {
      iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } }, 'https://giscus.app');
    });
  }

  // Keep any mounted threads in sync when the site's dark-mode toggle flips.
  var themeObserver = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === 'class') {
        broadcastThemeToAll();
        break;
      }
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true });

  function updateDiscussionCountBadges(term, count) {
    document.querySelectorAll('.guide-discussion-toggle[data-discussion-term="' + CSS.escape(term) + '"]').forEach(function (btn) {
      var badge = btn.querySelector('.guide-discussion-count');
      if (!badge) return;
      badge.textContent = String(count);
      badge.classList.toggle('hidden', count <= 0);
    });
  }

  // Term -> count, cached so revisiting a page doesn't re-fetch. Also used
  // as an in-flight guard so the same term is never probed twice at once —
  // a real user opening the actual thread while this background probe is
  // still in flight would otherwise mean two simultaneous giscus embeds for
  // the same discussion competing for the same request.
  var discussionCountCache = {};
  var discussionCountInFlight = {};

  /**
   * Quietly loads a hidden, invisible giscus instance just to read the
   * thread's total comment count via its "emit metadata" message, then
   * discards it. No server of ours involved — reuses giscus' own widget,
   * just never shown. If the discussion doesn't exist yet (nobody has
   * commented), no message ever arrives and the badge simply stays hidden.
   */
  function fetchDiscussionCount(term) {
    if (discussionCountInFlight[term]) return;
    discussionCountInFlight[term] = true;

    var hidden = document.createElement('div');
    hidden.setAttribute('aria-hidden', 'true');
    hidden.style.cssText = 'position:absolute;top:-9999px;width:1px;height:1px;overflow:hidden;';
    document.body.appendChild(hidden);

    function cleanup() {
      delete discussionCountInFlight[term];
      window.removeEventListener('message', handleMessage);
      hidden.remove();
    }

    function handleMessage(e) {
      if (e.origin !== 'https://giscus.app') return;
      var data = e.data;
      if (!data || typeof data !== 'object' || !data.giscus || !data.giscus.discussion) return;
      var d = data.giscus.discussion;
      var count = (d.totalCommentCount || 0) + (d.totalReplyCount || 0);
      discussionCountCache[term] = count;
      updateDiscussionCountBadges(term, count);
      cleanup();
    }
    window.addEventListener('message', handleMessage);
    // Give up after a while so a flaky load doesn't leak the listener/div forever.
    setTimeout(cleanup, 10000);

    var script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', term);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '0');
    script.setAttribute('data-emit-metadata', '1');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', giscusTheme());
    script.setAttribute('data-lang', GISCUS_LANG);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    hidden.appendChild(script);
  }

  // Whenever a page-level discussion tab appears (SPA navigation renders it
  // fresh each time), quietly fetch its count once. Hooked to hashchange
  // (the SPA's own routing signal) rather than a broad DOM mutation
  // observer — the page re-renders constantly (every MCQ answer click,
  // progress bar update, etc.), and watching all of that just to notice a
  // new discussion tab is unnecessary churn.
  function scanForUncountedToggles() {
    document.querySelectorAll('.guide-discussion-toggle').forEach(function (btn) {
      var term = btn.dataset.discussionTerm;
      if (!term) return;
      if (discussionCountCache[term] !== undefined) {
        updateDiscussionCountBadges(term, discussionCountCache[term]);
        return;
      }
      // Small delay so this doesn't race a user who opens the real thread
      // themselves within the first moment of landing on the page.
      setTimeout(function () { fetchDiscussionCount(term); }, 1500);
    });
  }
  window.addEventListener('hashchange', scanForUncountedToggles);
  scanForUncountedToggles();

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

  // Content is injected dynamically by the SPA router, so all handling here
  // is delegated on `document` instead of bound to elements that may not
  // exist yet.
  document.addEventListener('click', function (e) {
    // Page-level "general discussion" tab — stays inline (not a modal),
    // it's meant for browsing everything at once, not anchored to one
    // question.
    var guideBtn = e.target.closest('.guide-discussion-toggle');
    if (guideBtn) {
      var term = guideBtn.dataset.discussionTerm;
      var panel = guideBtn.parentElement?.querySelector('.guide-discussion-panel');
      if (!panel) return;
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden') && !panel.dataset.mounted) {
        mountGiscusThread(panel, term);
        panel.dataset.mounted = '1';
      }
      return;
    }

    // Per-question comment icon — opens the modal (mode picker inside
    // decides whether/what to mount). It's a fixed overlay, so no scrolling.
    // Each question card has exactly one popup, so no term-matching needed.
    var qBtn = e.target.closest('.mcq-comment-btn');
    if (qBtn) {
      var qPopup = qBtn.closest('article')?.querySelector('.mcq-comment-popup');
      if (qPopup) openQuestionModal(qPopup);
      return;
    }

    // Close button or backdrop click closes the modal.
    var closeBtn = e.target.closest('.mcq-comment-close');
    var backdrop = e.target.closest('.mcq-comment-backdrop');
    if (closeBtn || backdrop) {
      var closePopup = e.target.closest('.mcq-comment-popup');
      if (closePopup) closeQuestionModal(closePopup);
      return;
    }

    // "تعليق عام" / "اقتراح تصحيح" mode buttons inside the modal. Both post
    // into this question's own thread (data-discussion-term, unique per
    // question — separate from the page-level "نقاش عام" thread).
    // "تعليق عام" just skips the answer/reason form and mounts the thread
    // right away; "اقتراح تصحيح" shows the form first so the copied text is
    // tagged with a structured answer/reason before they paste it in.
    var modeBtn = e.target.closest('.mcq-comment-mode-btn');
    if (modeBtn) {
      var mPopup = modeBtn.closest('.mcq-comment-popup');
      if (!mPopup) return;
      mPopup.querySelector('.mcq-comment-mode-picker')?.classList.add('hidden');

      if (modeBtn.dataset.mode === 'correction') {
        mPopup.querySelector('.mcq-correction-form')?.classList.remove('hidden');
      } else {
        var mTerm = mPopup.dataset.discussionTerm;
        var mThread = mPopup.querySelector('.mcq-comment-thread');
        if (mThread && !mThread.dataset.mounted) {
          mountGiscusThread(mThread, mTerm);
          mThread.dataset.mounted = '1';
        }
      }
      return;
    }

    // "نسخ النص والمتابعة للتعليق" inside the correction form. Mounts this
    // question's own thread, right here in the modal — no navigating away.
    var copyBtn = e.target.closest('.mcq-correction-copy-btn');
    if (copyBtn) {
      var cPopup = copyBtn.closest('.mcq-comment-popup');
      if (!cPopup) return;
      var text = buildCorrectionText(cPopup);

      (navigator.clipboard && navigator.clipboard.writeText
        ? navigator.clipboard.writeText(text)
        : Promise.reject()
      ).catch(function () { /* clipboard unavailable — hint still shows, they can select/copy manually */ })
      .finally(function () {
        cPopup.querySelector('.mcq-correction-hint')?.classList.remove('hidden');
        cPopup.querySelector('.mcq-correction-form')?.classList.add('hidden');

        var discussionTerm = cPopup.dataset.discussionTerm;
        var cThread = cPopup.querySelector('.mcq-comment-thread');
        if (cThread && !cThread.dataset.mounted) {
          mountGiscusThread(cThread, discussionTerm);
          cThread.dataset.mounted = '1';
        }
      });
    }
  });

  // Escape key closes whichever question modal is open.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.mcq-comment-popup:not(.hidden)');
    if (open) closeQuestionModal(open);
  });

  window.mountGiscusThread = mountGiscusThread;
  window.setGiscusTerm = setGiscusTerm;
})();
