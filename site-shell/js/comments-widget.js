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

  function escText(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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

  // title (scoped term) -> { title, url, comments: [{author, avatar, body, createdAt, replies:[]}] }
  var discussionFeedCache = null;
  var discussionFeedPromise = null;

  /**
   * Load all exam-category discussions once (with comment bodies) via GitHub
   * GraphQL. Cached for the page session. Used to render a read-only feed
   * without embedding giscus (no expand / no comment box in the overview).
   */
  function loadDiscussionFeed() {
    if (discussionFeedCache) return Promise.resolve(discussionFeedCache);
    if (discussionFeedPromise) return discussionFeedPromise;

    var cacheKey = 'giscus-feed-v1:' + GISCUS_REPO + ':' + GISCUS_CATEGORY_ID;
    try {
      var raw = sessionStorage.getItem(cacheKey);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.at && Date.now() - parsed.at < 10 * 60 * 1000 && parsed.map) {
          discussionFeedCache = parsed.map;
          return Promise.resolve(discussionFeedCache);
        }
      }
    } catch (e) { /* ignore */ }

    var query =
      'query($owner:String!,$name:String!,$categoryId:ID!,$cursor:String){' +
      'repository(owner:$owner,name:$name){' +
      'discussions(first:50,after:$cursor,categoryId:$categoryId,orderBy:{field:UPDATED_AT,direction:DESC}){' +
      'pageInfo{hasNextPage endCursor}' +
      'nodes{title url ' +
      'comments(first:40){totalCount nodes{' +
      'author{login avatarUrl} bodyText createdAt ' +
      'replies(first:15){nodes{author{login avatarUrl} bodyText createdAt}}' +
      '}}}}}';

    var owner = GISCUS_REPO.split('/')[0];
    var name = GISCUS_REPO.split('/')[1];
    var map = {};

    function page(cursor) {
      return fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
        },
        body: JSON.stringify({
          query: query,
          variables: {
            owner: owner,
            name: name,
            categoryId: GISCUS_CATEGORY_ID,
            cursor: cursor || null,
          },
        }),
      }).then(function (res) {
        if (!res.ok) throw new Error('graphql ' + res.status);
        return res.json();
      }).then(function (json) {
        if (json.errors && json.errors.length) throw new Error(json.errors[0].message || 'graphql error');
        var conn = json.data && json.data.repository && json.data.repository.discussions;
        if (!conn) throw new Error('no discussions');
        (conn.nodes || []).forEach(function (d) {
          if (!d || !d.title) return;
          var comments = (d.comments && d.comments.nodes) || [];
          map[d.title] = {
            title: d.title,
            url: d.url,
            totalCount: (d.comments && d.comments.totalCount) || comments.length,
            comments: comments.map(function (c) {
              return {
                author: (c.author && c.author.login) || 'مجهول',
                avatar: (c.author && c.author.avatarUrl) || '',
                body: c.bodyText || '',
                createdAt: c.createdAt,
                replies: ((c.replies && c.replies.nodes) || []).map(function (r) {
                  return {
                    author: (r.author && r.author.login) || 'مجهول',
                    avatar: (r.author && r.author.avatarUrl) || '',
                    body: r.bodyText || '',
                    createdAt: r.createdAt,
                  };
                }),
              };
            }),
          };
        });
        if (conn.pageInfo && conn.pageInfo.hasNextPage) {
          return page(conn.pageInfo.endCursor);
        }
        return map;
      });
    }

    discussionFeedPromise = page(null)
      .then(function (m) {
        discussionFeedCache = m;
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), map: m }));
        } catch (e) { /* quota */ }
        return m;
      })
      .catch(function (err) {
        discussionFeedPromise = null;
        console.warn('[comments] discussion feed unavailable', err);
        return null;
      });

    return discussionFeedPromise;
  }

  function openQuestionCommentByTerm(baseTerm) {
    var popup = document.querySelector('.mcq-comment-popup[data-discussion-term="' + CSS.escape(baseTerm) + '"]');
    if (!popup) return;
    var card = popup.closest('article');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    openQuestionModal(popup);
  }

  function renderCommentBubble(c, isReply) {
    var wrap = document.createElement('div');
    wrap.className = (isReply ? 'mr-xl ' : '') +
      'mb-sm p-md rounded-xl bg-surface-container/80 border border-outline-variant/60';

    var meta = document.createElement('div');
    meta.className = 'flex items-center gap-sm mb-xs';

    if (c.avatar) {
      var img = document.createElement('img');
      img.src = c.avatar;
      img.alt = '';
      img.width = 22;
      img.height = 22;
      img.className = 'rounded-full shrink-0';
      meta.appendChild(img);
    }

    var who = document.createElement('span');
    who.className = 'font-label-md text-on-surface';
    who.textContent = '@' + c.author;
    meta.appendChild(who);

    var when = document.createElement('span');
    when.className = 'font-label-sm text-on-surface-variant mr-auto';
    when.textContent = formatRelativeTime(c.createdAt);
    meta.appendChild(when);

    wrap.appendChild(meta);

    var body = document.createElement('p');
    body.className = 'font-body-md text-on-surface whitespace-pre-wrap m-0 leading-relaxed';
    body.textContent = c.body;
    wrap.appendChild(body);
    return wrap;
  }

  function buildQuestionFeedCard(item, kind, discussion) {
    var term = kind === 'correction' ? correctionTermFor(item.term) : item.term;
    var scoped = scopedDiscussionTerm(term);
    var section = document.createElement('article');
    section.className = 'guide-discussion-q mb-md p-md rounded-2xl border border-outline-variant bg-surface-container-lowest dark:bg-transparent';
    section.dataset.questionNum = String(item.num);
    section.dataset.discussionTerm = term;
    section.dataset.discussionSource = item.source || '';
    section.dataset.discussionKind = kind;

    var head = document.createElement('div');
    head.className = 'flex items-center gap-sm flex-wrap mb-md';

    var title = document.createElement('h4');
    title.className = 'font-headline-sm text-headline-sm text-on-surface m-0';
    title.textContent = 'س' + item.num;
    head.appendChild(title);

    var pattern = patternLabel(item.source);
    if (pattern) {
      var patEl = document.createElement('span');
      patEl.className = 'px-sm py-2xs rounded-full bg-outline-variant/40 text-on-surface-variant font-label-sm';
      patEl.textContent = pattern;
      head.appendChild(patEl);
    }

    if (kind === 'correction') {
      var tag = document.createElement('span');
      tag.className = 'px-sm py-2xs bg-tertiary-container text-on-tertiary-container rounded-full font-label-sm';
      tag.textContent = 'تصحيح مقترح';
      head.appendChild(tag);
    }

    var count = (discussion && discussion.totalCount) || item.count || 0;
    var countEl = document.createElement('span');
    countEl.className = 'px-sm py-2xs bg-secondary-container text-on-secondary-container rounded-full font-label-sm';
    countEl.textContent = count + (count === 1 ? ' تعليق' : ' تعليقات');
    head.appendChild(countEl);

    section.appendChild(head);

    var feed = document.createElement('div');
    feed.className = 'guide-discussion-q-feed space-y-sm mb-md';

    if (discussion && discussion.comments && discussion.comments.length) {
      discussion.comments.forEach(function (c) {
        feed.appendChild(renderCommentBubble(c, false));
        (c.replies || []).forEach(function (r) {
          feed.appendChild(renderCommentBubble(r, true));
        });
      });
    } else {
      var miss = document.createElement('p');
      miss.className = 'font-label-md text-on-surface-variant m-0';
      miss.textContent = 'ما قدرنا نعرض نص التعليقات هنا — افتح السؤال لقراءتها.';
      feed.appendChild(miss);
    }
    section.appendChild(feed);

    var actions = document.createElement('div');
    actions.className = 'flex items-center gap-sm flex-wrap';

    var jump = document.createElement('a');
    jump.href = '#' + encodeURIComponent(item.term);
    jump.className = 'font-label-sm text-primary underline';
    jump.textContent = 'اذهب للسؤال';
    actions.appendChild(jump);

    var commentBtn = document.createElement('button');
    commentBtn.type = 'button';
    commentBtn.className = 'px-md py-sm rounded-lg bg-primary text-on-primary font-label-md hover:opacity-90 transition-opacity';
    commentBtn.textContent = 'أضف تعليقاً';
    commentBtn.addEventListener('click', function () {
      openQuestionCommentByTerm(item.term);
    });
    actions.appendChild(commentBtn);

    if (discussion && discussion.url) {
      var gh = document.createElement('a');
      gh.href = discussion.url;
      gh.target = '_blank';
      gh.rel = 'noopener';
      gh.className = 'font-label-sm text-on-surface-variant underline';
      gh.textContent = 'على GitHub';
      actions.appendChild(gh);
    }

    section.appendChild(actions);
    return section;
  }

  function refreshGuideDiscussionBadge(btn, feedMap) {
    var lecture = btn.closest('.lecture') || document;
    var questions = collectQuestionThreads(lecture);
    if (!questions.length) {
      updateGuideDiscussionBadge(btn, 0);
      return Promise.resolve(0);
    }

    if (feedMap) {
      var total = 0;
      questions.forEach(function (q) {
        var g = feedMap[scopedDiscussionTerm(q.term)];
        var c = feedMap[scopedDiscussionTerm(correctionTermFor(q.term))];
        total += (g && g.totalCount) || 0;
        total += (c && c.totalCount) || 0;
      });
      updateGuideDiscussionBadge(btn, total);
      return Promise.resolve(total);
    }

    return runPool(questions, 2, function (q) {
      return Promise.all([
        probeDiscussionCount(q.term),
        probeDiscussionCount(correctionTermFor(q.term)),
      ]).then(function (pair) {
        return (pair[0] || 0) + (pair[1] || 0);
      });
    }).then(function (counts) {
      var total = 0;
      for (var i = 0; i < counts.length; i++) total += counts[i] || 0;
      updateGuideDiscussionBadge(btn, total);
      return total;
    });
  }

  function renderDiscussionList(listEl, statusEl, questions, kind, feedMap) {
    listEl.innerHTML = '';
    statusEl.classList.add('hidden');

    var matched = [];
    questions.forEach(function (q) {
      var term = kind === 'correction' ? correctionTermFor(q.term) : q.term;
      var scoped = scopedDiscussionTerm(term);
      var discussion = feedMap && feedMap[scoped];
      var count = discussion ? discussion.totalCount : 0;
      if (count > 0) {
        matched.push({ q: q, discussion: discussion, count: count });
      }
    });

    if (!matched.length) {
      statusEl.textContent = kind === 'correction'
        ? 'ما في تصحيحات مقترحة بعد على أسئلة هذه الدورة.'
        : 'ما في نقاشات على الأسئلة بعد — افتح أي سؤال وعلّق من أيقونة النقاش.';
      statusEl.classList.remove('hidden');
      return Promise.resolve(0);
    }

    matched.sort(function (a, b) {
      return compareQuestionIdentity(a.q, b.q);
    });

    var lastPattern = null;
    matched.forEach(function (m) {
      var label = patternLabel(m.q.source) || 'بدون نمط';
      if (label !== lastPattern) {
        lastPattern = label;
        var h = document.createElement('h3');
        h.className = 'font-headline-sm text-headline-sm text-primary mt-lg mb-sm first:mt-0 sticky top-0 bg-surface/95 backdrop-blur-sm py-xs z-[1]';
        h.textContent = label;
        listEl.appendChild(h);
      }
      listEl.appendChild(buildQuestionFeedCard(
        { term: m.q.term, num: m.q.num, source: m.q.source, count: m.count },
        kind,
        m.discussion,
      ));
    });
    return Promise.resolve(matched.length);
  }

  /**
   * When GraphQL is unavailable, fall back to giscus count probes and show
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
        statusEl.textContent = kind === 'correction'
          ? 'ما في تصحيحات مقترحة بعد على أسئلة هذه الدورة.'
          : 'ما في نقاشات على الأسئلة بعد — افتح أي سؤال وعلّق من أيقونة النقاش.';
        return 0;
      }
      statusEl.classList.add('hidden');
      found.sort(function (a, b) { return compareQuestionIdentity(a.q, b.q); });
      var lastPattern = null;
      found.forEach(function (m) {
        var label = patternLabel(m.q.source) || 'بدون نمط';
        if (label !== lastPattern) {
          lastPattern = label;
          var h = document.createElement('h3');
          h.className = 'font-headline-sm text-headline-sm text-primary mt-lg mb-sm first:mt-0';
          h.textContent = label;
          listEl.appendChild(h);
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
   * General DAWRAT discussion panel: scrollable read-only feed of comments,
   * ordered by pattern then question number. Writing stays on the question modal.
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

    var tabByQ = makeTab('by-question', 'حسب النمط والسؤال');
    var tabCorr = makeTab('corrections', 'التصحيحات المقترحة فقط');
    tabs.appendChild(tabByQ);
    tabs.appendChild(tabCorr);
    panel.appendChild(tabs);

    var intro = document.createElement('p');
    intro.className = 'mb-md font-label-md text-on-surface-variant';
    panel.appendChild(intro);

    var statusEl = document.createElement('div');
    statusEl.className = 'p-md text-center font-label-md text-on-surface-variant';
    statusEl.textContent = 'جارِ تحميل التعليقات…';
    panel.appendChild(statusEl);

    var scroller = document.createElement('div');
    scroller.className = 'guide-discussion-scroller max-h-[70vh] overflow-y-auto overscroll-contain pr-xs rounded-xl';
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
        ? 'تصحيحات مقترحة فقط — مرتّبة حسب النمط ثم رقم السؤال. للقراءة السريعة (التعليق من صفحة السؤال):'
        : 'تعليقات الأسئلة — مرتّبة حسب النمط ثم رقم السؤال. اسحب للأسفل للقراءة؛ للكتابة اضغط "أضف تعليقاً":';
    }

    function showTab(id) {
      setActiveTab(id);
      var kind = id === 'corrections' ? 'correction' : 'general';
      statusEl.textContent = 'جارِ تحميل التعليقات…';
      statusEl.classList.remove('hidden');
      listEl.innerHTML = '';

      var ready = feedMapRef
        ? Promise.resolve(feedMapRef)
        : loadDiscussionFeed();

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

    tabByQ.addEventListener('click', function () { showTab('by-question'); });
    tabCorr.addEventListener('click', function () { showTab('corrections'); });
    showTab('by-question');
  }

  function scanForUncountedToggles() {
    // Badge fills when the panel is opened.
  }
  window.addEventListener('hashchange', scanForUncountedToggles);

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

  function scrollThreadIntoModal(popup, thread) {
    var dialog = popup.querySelector('.mcq-comment-dialog');
    var iframe = thread && thread.querySelector('iframe.giscus-frame');
    if (!dialog || !iframe) return;
    setTimeout(function () {
      iframe.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      dialog.scrollTop = Math.max(0, dialog.scrollHeight - dialog.clientHeight);
    }, 300);
  }

  function openQuestionModal(popup) {
    popup.classList.remove('hidden');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    var term = popup.dataset.discussionTerm;
    var thread = popup.querySelector('.mcq-comment-thread');
    if (thread && term) {
      if (thread.dataset.giscusTerm && thread.dataset.giscusTerm.indexOf('/correction') !== -1) {
        delete thread.dataset.mounted;
      }
      if (!thread.dataset.mounted) {
        mountGiscusThread(thread, term).then(function () {
          scrollThreadIntoModal(popup, thread);
        });
      }
    }
  }

  function closeQuestionModal(popup) {
    popup.classList.add('hidden');
    popup.style.display = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
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
      } else if (mThread && mTerm) {
        delete mThread.dataset.mounted;
        mountGiscusThread(mThread, mTerm).then(function () {
          scrollThreadIntoModal(mPopup, mThread);
        });
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
      ).catch(function () { /* clipboard unavailable */ })
      .finally(function () {
        var hint = cPopup.querySelector('.mcq-correction-hint');
        if (hint) hint.classList.remove('hidden');
        var cForm = cPopup.querySelector('.mcq-correction-form');
        if (cForm) cForm.classList.add('hidden');

        var baseTerm = cPopup.dataset.discussionTerm;
        var cThread = cPopup.querySelector('.mcq-comment-thread');
        if (cThread && baseTerm) {
          delete cThread.dataset.mounted;
          mountGiscusThread(cThread, correctionTermFor(baseTerm)).then(function () {
            scrollThreadIntoModal(cPopup, cThread);
          });
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
