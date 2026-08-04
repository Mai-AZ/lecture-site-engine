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

  // Content is injected dynamically by the SPA router, so all handling here
  // is delegated on `document` instead of bound to elements that may not
  // exist yet.
  document.addEventListener('click', function (e) {
    // Page-level "general discussion" tab — no mode picker, mounts directly.
    var guideBtn = e.target.closest('.guide-discussion-toggle');
    if (guideBtn) {
      var term = guideBtn.dataset.commentTerm;
      var panel = guideBtn.parentElement?.querySelector('.guide-discussion-panel[data-comment-term="' + CSS.escape(term) + '"]');
      if (!panel) return;
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden') && !panel.dataset.mounted) {
        mountGiscusThread(panel, term);
        panel.dataset.mounted = '1';
      }
      return;
    }

    // Per-question comment icon — just reveals the popup (mode picker inside
    // decides whether/what to mount).
    var qBtn = e.target.closest('.mcq-comment-btn');
    if (qBtn) {
      var qTerm = qBtn.dataset.commentTerm;
      var qPopup = qBtn.closest('article')?.querySelector('.mcq-comment-popup[data-comment-term="' + CSS.escape(qTerm) + '"]');
      qPopup?.classList.toggle('hidden');
      return;
    }

    // "تعليق عام" / "اقتراح تصحيح" mode buttons inside a question's popup.
    var modeBtn = e.target.closest('.mcq-comment-mode-btn');
    if (modeBtn) {
      var mPopup = modeBtn.closest('.mcq-comment-popup');
      if (!mPopup) return;
      mPopup.querySelector('.mcq-comment-mode-picker')?.classList.add('hidden');

      if (modeBtn.dataset.mode === 'correction') {
        mPopup.querySelector('.mcq-correction-form')?.classList.remove('hidden');
      } else {
        var mTerm = mPopup.dataset.commentTerm;
        var mThread = mPopup.querySelector('.mcq-comment-thread');
        if (mThread && !mThread.dataset.mounted) {
          mountGiscusThread(mThread, mTerm);
          mThread.dataset.mounted = '1';
        }
      }
      return;
    }

    // "نسخ النص والمتابعة للتعليق" inside the correction form.
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
        var cTerm = cPopup.dataset.commentTerm;
        var cThread = cPopup.querySelector('.mcq-comment-thread');
        if (cThread && !cThread.dataset.mounted) {
          mountGiscusThread(cThread, cTerm);
          cThread.dataset.mounted = '1';
        }
      });
    }
  });

  window.mountGiscusThread = mountGiscusThread;
  window.setGiscusTerm = setGiscusTerm;
})();
