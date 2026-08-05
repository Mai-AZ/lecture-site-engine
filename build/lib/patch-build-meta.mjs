import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const BUILD_ID_META_RE = /<meta\s+name="site-build-id"\s+content="[^"]*"\s*\/?>/i;

/**
 * Force local script/link URLs to carry ?v=<buildId> so browsers and the SW
 * cannot keep serving a stale comments-widget.js (or other shell JS) after
 * deploy while index.html already changed.
 * @param {string} html
 * @param {string} buildId
 */
function bustLocalAssetUrls(html, buildId) {
  const v = encodeURIComponent(buildId);
  return html.replace(
    /\b(src|href)=["']((?:\.\/)?(?:js|css|themes)\/[^"'?#]+(?:\?[^"'#]*)?)["']/g,
    (full, attr, url) => {
      const cleaned = url.replace(/([?&])v=[^&]*&?/, '$1').replace(/[?&]$/, '');
      const sep = cleaned.includes('?') ? '&' : '?';
      return `${attr}="${cleaned}${sep}v=${v}"`;
    },
  );
}

/**
 * Inject build id into index.html for runtime cache busting + SW registration.
 * @param {string} outDir
 * @param {string} buildId
 */
export async function patchBuildMeta(outDir, buildId) {
  const indexPath = path.join(outDir, 'index.html');
  if (!existsSync(indexPath) || !buildId) return;

  const tag = `<meta name="site-build-id" content="${buildId}">`;
  let html = await readFile(indexPath, 'utf8');

  if (BUILD_ID_META_RE.test(html)) {
    html = html.replace(BUILD_ID_META_RE, tag);
  } else {
    html = html.replace(/<meta name="viewport"[^>]*>/i, match => `${match}\n  ${tag}`);
  }

  html = bustLocalAssetUrls(html, buildId);

  await writeFile(indexPath, html);
}
