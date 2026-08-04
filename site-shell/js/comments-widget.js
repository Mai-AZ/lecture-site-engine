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

  /**
   * Mounts a giscus comment thread into `container`, keyed by `term`.
   * Each unique term gets its own Discussion thread (see data-mapping="specific").
   * Safe to call multiple times on different containers with different terms
   * (e.g. one call for a page-level "Discussion" tab, one per flagged question).
   */
  function mountGiscusThread(container, term) {
    if (!container || !term) return;
    container.innerHTML = '';

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

    container.appendChild(script);
    container.dataset.giscusTerm = term;
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

    // "تعليق عام" / "اقتراح تصحيح" mode buttons inside the modal. Both modes
    // ultimately post into the SAME shared discussion term as the page-level
    // tab (data-discussion-term) — there is no separate private
    // per-question thread. "تعليق عام" just skips the answer/reason form and
    // mounts the thread right away; "اقتراح تصحيح" shows the form first so
    // the copied text is tagged with the question number and a structured
    // answer/reason.
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

    // "نسخ النص والمتابعة للتعليق" inside the correction form. Mounts the
    // same shared thread, right here in the modal — no navigating away.
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
