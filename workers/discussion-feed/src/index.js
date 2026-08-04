/**
 * Cloudflare Worker — live GitHub Discussions feed for the DAWRAT overview.
 * GET /           → { generatedAt, repo, categoryId, discussions: { [title]: … } }
 * GET /?scope=y/x → same, only titles under that subject prefix
 *
 * Secret: GITHUB_TOKEN
 * Vars:   GISCUS_REPO, GISCUS_CATEGORY_ID
 */

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

const ALLOWED_ORIGINS = [
  'https://homs-uni.github.io',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  let allow = ALLOWED_ORIGINS[0];
  if (ALLOWED_ORIGINS.includes(origin)) allow = origin;
  else if (/^https:\/\/[\w-]+\.netlify\.app$/i.test(origin)) allow = origin;
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function mapComment(c) {
  return {
    author: (c.author && c.author.login) || 'مجهول',
    avatar: (c.author && c.author.avatarUrl) || '',
    body: c.bodyText || '',
    createdAt: c.createdAt,
    replies: ((c.replies && c.replies.nodes) || []).map((r) => ({
      author: (r.author && r.author.login) || 'مجهول',
      avatar: (r.author && r.author.avatarUrl) || '',
      body: r.bodyText || '',
      createdAt: r.createdAt,
    })),
  };
}

async function buildFeed(env) {
  const token = env.GITHUB_TOKEN;
  if (!token) throw new Error('missing GITHUB_TOKEN secret');

  const repo = env.GISCUS_REPO || 'homs-uni/lecture-site-engine';
  const categoryId = env.GISCUS_CATEGORY_ID || 'DIC_kwDOTL05VM4DCod2';
  const [owner, name] = repo.split('/');
  const discussions = {};
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
        'User-Agent': 'homs-uni-discussion-feed',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { owner, name, categoryId, cursor },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`graphql HTTP ${res.status}: ${text.slice(0, 200)}`);
    }

    const json = await res.json();
    if (json.errors && json.errors.length) {
      throw new Error(json.errors[0].message || 'graphql error');
    }

    const conn = json.data && json.data.repository && json.data.repository.discussions;
    if (!conn) throw new Error('empty repository payload');

    for (const d of conn.nodes || []) {
      if (!d || !d.title) continue;
      const comments = (d.comments && d.comments.nodes) || [];
      discussions[d.title] = {
        title: d.title,
        url: d.url,
        totalCount: (d.comments && d.comments.totalCount) || comments.length,
        comments: comments.map(mapComment),
      };
    }

    if (!conn.pageInfo || !conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
    if (pages > 20) break;
  }

  return {
    generatedAt: new Date().toISOString(),
    repo,
    categoryId,
    discussions,
  };
}

function filterByScope(payload, scope) {
  if (!scope) return payload;
  const prefix = scope.endsWith('/') ? scope : scope + '/';
  const discussions = {};
  for (const [title, value] of Object.entries(payload.discussions || {})) {
    if (title === scope || title.startsWith(prefix)) discussions[title] = value;
  }
  return { ...payload, discussions, scope };
}

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeaders(request);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'method not allowed' }), {
        status: 405,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(request.url);
    if (url.pathname !== '/' && url.pathname !== '/feed') {
      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    try {
      const cacheKey = new Request(url.toString(), request);
      const cache = caches.default;
      let cached = await cache.match(cacheKey);
      if (cached) {
        const headers = new Headers(cached.headers);
        Object.entries(cors).forEach(([k, v]) => headers.set(k, v));
        return new Response(cached.body, { status: cached.status, headers });
      }

      const scope = (url.searchParams.get('scope') || '').trim();
      let payload = await buildFeed(env);
      payload = filterByScope(payload, scope);

      const body = JSON.stringify(payload);
      const response = new Response(body, {
        status: 200,
        headers: {
          ...cors,
          'Content-Type': 'application/json; charset=utf-8',
          // Short edge cache so overview feels live after new comments.
          'Cache-Control': 'public, max-age=60, s-maxage=60',
        },
      });

      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (err) {
      return new Response(
        JSON.stringify({ error: String(err && err.message ? err.message : err) }),
        {
          status: 502,
          headers: {
            ...cors,
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        },
      );
    }
  },
};
