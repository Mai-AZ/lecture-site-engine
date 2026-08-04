# Discussion feed Worker

Live JSON API for the DAWRAT **نقاش عام** panel (read-only).  
Giscus stays only for writing on each question.

## Deploy

```bash
# once: log in
npx wrangler login

# set a GitHub PAT (public repo + read discussions)
npx wrangler secret put GITHUB_TOKEN -c workers/discussion-feed/wrangler.toml

# publish
npx wrangler deploy -c workers/discussion-feed/wrangler.toml
```

Copy the printed `https://….workers.dev` URL into
`site-shell/js/comments-widget.js` → `DISCUSSION_FEED_API`.

Local smoke test:

```bash
npx wrangler dev -c workers/discussion-feed/wrangler.toml
# then open http://127.0.0.1:8787/?scope=year-4/parallel-concurrent-programming
```

## Endpoint

`GET /` or `GET /feed`  
Optional `?scope=year-N/subject-id` to return only that subject’s threads.
