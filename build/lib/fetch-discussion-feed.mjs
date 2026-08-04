/**
 * Fetch exam-category GitHub Discussions (comment bodies) into
 * site-shell/data/discussion-feed.json for the read-only general discussion UI.
 *
 * Auth: GITHUB_TOKEN / GH_TOKEN, or `gh auth token`. Skips quietly if none.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ENGINE_ROOT } from './subject-paths.mjs';

const GISCUS_REPO = 'homs-uni/lecture-site-engine';
const GISCUS_CATEGORY_ID = 'DIC_kwDOTL05VM4DCod2';
const OUT_PATH = path.join(ENGINE_ROOT, 'site-shell/data/discussion-feed.json');

const QUERY = `query($owner:String!,$name:String!,$categoryId:ID!,$cursor:String){
  repository(owner:$owner,name:$name){
    discussions(first:50,after:$cursor,categoryId:$categoryId,orderBy:{field:UPDATED_AT,direction:DESC}){
      pageInfo{hasNextPage endCursor}
      nodes{title url
        comments(first:40){totalCount nodes{
          author{login avatarUrl} bodyText createdAt
          replies(first:15){nodes{author{login avatarUrl} bodyText createdAt}}
        }}
      }
    }
  }
}`;

function resolveToken() {
  const env = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (env) return env.trim();
  try {
    const r = spawnSync('gh', ['auth', 'token'], { encoding: 'utf8' });
    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
  } catch {
    /* no gh */
  }
  return null;
}

function mapComment(c) {
  return {
    author: c.author?.login || 'مجهول',
    avatar: c.author?.avatarUrl || '',
    body: c.bodyText || '',
    createdAt: c.createdAt,
    replies: (c.replies?.nodes || []).map((r) => ({
      author: r.author?.login || 'مجهول',
      avatar: r.author?.avatarUrl || '',
      body: r.bodyText || '',
      createdAt: r.createdAt,
    })),
  };
}

/**
 * @returns {Promise<{ok:boolean, count?:number, path?:string, reason?:string}>}
 */
export async function writeDiscussionFeed() {
  const token = resolveToken();
  if (!token) {
    console.warn('⚠ discussion feed skipped — no GITHUB_TOKEN / gh auth');
    return { ok: false, reason: 'no-token' };
  }

  const [owner, name] = GISCUS_REPO.split('/');
  /** @type {Record<string, object>} */
  const map = {};
  let cursor = null;
  let pages = 0;

  for (;;) {
    pages += 1;
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          owner,
          name,
          categoryId: GISCUS_CATEGORY_ID,
          cursor,
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn(`⚠ discussion feed GraphQL HTTP ${res.status}: ${text.slice(0, 200)}`);
      return { ok: false, reason: `http-${res.status}` };
    }

    const json = await res.json();
    if (json.errors?.length) {
      console.warn(`⚠ discussion feed GraphQL error: ${json.errors[0].message}`);
      return { ok: false, reason: 'graphql-error' };
    }

    const conn = json.data?.repository?.discussions;
    if (!conn) {
      console.warn('⚠ discussion feed — empty repository payload');
      return { ok: false, reason: 'empty' };
    }

    for (const d of conn.nodes || []) {
      if (!d?.title) continue;
      const comments = d.comments?.nodes || [];
      map[d.title] = {
        title: d.title,
        url: d.url,
        totalCount: d.comments?.totalCount ?? comments.length,
        comments: comments.map(mapComment),
      };
    }

    if (!conn.pageInfo?.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
    if (pages > 20) break;
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    repo: GISCUS_REPO,
    categoryId: GISCUS_CATEGORY_ID,
    discussions: map,
  };

  await mkdir(path.dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + '\n');
  console.log(`✓ discussion feed → site-shell/data/discussion-feed.json (${Object.keys(map).length} threads)`);
  return { ok: true, count: Object.keys(map).length, path: OUT_PATH };
}

import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  writeDiscussionFeed().then((r) => {
    process.exit(r.ok ? 0 : 1);
  });
}
