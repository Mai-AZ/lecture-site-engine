/**
 * Thin client wrapper around Mermaid.js (CDN).
 * Docs: https://mermaid.js.org/config/usage.html
 *
 * Diagrams are rendered lazily (IntersectionObserver) instead of all at
 * once — a DAWRAT page can carry 100+ diagrams, and mermaid's layout pass
 * per diagram is expensive enough that running all of them on page load
 * freezes the main thread for seconds on a mid-range phone.
 */

function isDarkMode() {
  return document.documentElement.classList.contains('dark');
}

function whenMermaidReady(timeoutMs = 8000) {
  if (window.mermaid) return Promise.resolve(true);
  return new Promise((resolve) => {
    const t0 = Date.now();
    const id = setInterval(() => {
      if (window.mermaid) {
        clearInterval(id);
        resolve(true);
        return;
      }
      if (Date.now() - t0 > timeoutMs) {
        clearInterval(id);
        resolve(false);
      }
    }, 40);
  });
}

// Nodes actually rendered so far (across the page's lifetime) — theme
// refresh only needs to touch these; not-yet-visible ones will pick up the
// current theme whenever the observer eventually fires for them.
const renderedNodes = new Set();

let observer = null;
function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver((entries) => {
    const due = entries.filter(e => e.isIntersecting).map(e => e.target);
    if (!due.length) return;
    due.forEach(el => observer.unobserve(el));
    renderBatch(due);
  }, { rootMargin: '600px 0px', threshold: 0 });
  return observer;
}

async function renderBatch(nodes) {
  const ready = await whenMermaidReady();
  if (!ready || !window.mermaid || !nodes.length) return;

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: isDarkMode() ? 'dark' : 'default',
    fontFamily: "'Noto Naskh Arabic', 'Source Serif 4', serif",
  });

  try {
    await window.mermaid.run({ nodes });
    nodes.forEach(el => renderedNodes.add(el));
  } catch {
    /* mermaid surfaces per-diagram errors in the node itself */
  }
}

/**
 * Queue `.mermaid` nodes under `root` for lazy rendering as they scroll
 * near the viewport (600px lookahead so they're ready by the time a reader
 * reaches them).
 * @param {ParentNode} [root=document]
 */
export function initMermaid(root = document) {
  const nodes = [...root.querySelectorAll('.mermaid')];
  if (!nodes.length) return;

  for (const el of nodes) {
    if (!el.dataset.mermaidSource) {
      el.dataset.mermaidSource = el.textContent || '';
    }
  }

  // Defer observe() until layout from this render has settled — a page
  // this big is one large innerHTML injection, and starting observation
  // mid-thrash (plus a same-tab scroll-restoration jump landing at the same
  // moment) can make far-off elements briefly read as intersecting.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const obs = getObserver();
    for (const el of nodes) {
      if (renderedNodes.has(el)) continue; // already rendered, theme-refresh handles updates
      obs.observe(el);
    }
  }));
}

/** Re-run only diagrams already rendered, after a dark/light theme toggle. */
export function refreshMermaid(root = document) {
  const nodes = [...root.querySelectorAll('.mermaid')].filter(el => renderedNodes.has(el));
  if (!nodes.length) return Promise.resolve();

  for (const el of nodes) {
    el.removeAttribute('data-processed');
    el.removeAttribute('data-mermaid-processed');
    el.textContent = el.dataset.mermaidSource || el.textContent;
    renderedNodes.delete(el);
  }
  return renderBatch(nodes);
}
