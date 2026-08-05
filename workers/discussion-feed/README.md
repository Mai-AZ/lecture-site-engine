# Discussion feed Worker

Live JSON API for the DAWRAT **تصحيحات ونقاش الإجابات** panel (read-only).  
Giscus stays only for writing on each question.

Each discussion in the payload may include:

- `reactionGroups` (`{ THUMBS_UP: n, … }` — counts > 0) on the discussion and comments
- `answerVotes` (`{ A: n, B: n, … }`) from comments tagged `#correction` (plus legacy Arabic correction templates)
- `correctionCount` — how many of those correction comments/replies were found
- per-comment `isCorrection` / `answer` flags for the client overview boxes

Corrections and general chat share **one** Discussion per question. The old
`…/correction` Discussion titles are still returned when they exist (legacy).

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
