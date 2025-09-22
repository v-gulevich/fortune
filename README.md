# Fortune
Random quotes as a website and a simple JSON API. Inspired by the classic Unix fortune program.

- Live site: https://fortune.gulevich.by
- API docs: https://fortune.gulevich.by/docs

## Quick start

- CLI (plain text):

```shell
curl https://fortune.gulevich.by/
```

The root path returns text/plain when called from curl/wget/httpie thanks to middleware user-agent detection.

- JSON:

```shell
curl "https://fortune.gulevich.by/api/v1/fortune"
```

Response:

```json
{
	"text": "APL is a mistake, carried through to perfection.  It is the language of the\nfuture for the programming techniques of the past: it creates a new generation\nof coding bums.\n\t\t-- Edsger W. Dijkstra, SIGPLAN Notices, Volume 17, Number 5",
	"sfw": true,
	"category": "computers",
	"id": 101
}
```

More examples and all parameters are covered in docs/api.md.

## Features

- Random or ID-addressable quotes (over 21k entries)
- Safe mode (SFW) by default, toggleable per browser via cookie
- Plain-text output for CLI tools
- Share helpers for X and Bluesky
- Easter eggs on special negative IDs
- Minimal UI

## API surface

Base URL: https://fortune.gulevich.by

- GET /api/v1/fortune — JSON quote
  - Query params:
    - id: number (optional) — exact quote index; invalid/out-of-range falls back to random
    - safe: boolean (optional, default true) — filter NSFW content
- GET /api/curl-fortune — plain text quote (always safe)
- GET /share?kind=X|Bluesky&id=NUMBER — redirects to a prefilled post

Cookies:
- safe=true|false — mirrors the safe query param; when both are present, the query param wins

UI pages:
- / — home, shows the current fortune and controls
- /docs — in-app rendered API docs from docs/api.md
- /donate — QR and address to support hosting

## Tech stack

- Next.js 15 (App Router) and React 19
- Tailwind CSS v4
- unified/remark/rehype for rendering docs
- highlight.js for code samples
- Vercel Analytics


## Project structure

```txt
app/               # Next.js app routes (UI + API routes under app/api)
docs/              # Markdown source for API docs (rendered at /docs)
lib/               # Quote types, data loader, easter eggs
public/            # Static assets (e.g., QR image)
scripts/           # Utilities (dataset generation helpers)
```

## Contributing

Issues and PRs are welcome. If you plan a larger change, open an issue first to discuss direction.

## Acknowledgements

- Inspired by the classic fortune(6) program
- Dataset compiled from public fortune files; SFW/NSFW flags are applied to filter output
