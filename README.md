# DJ DiP — Portfolio (djdip.no)

DJ DiP's personal portfolio / booking site. A Vite + React single-page app with a small in-repo Express **admin-server** that serves and ingests content.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Vite 5 + React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Routing | react-router-dom 7 (admin) + hash anchors (public sections) |
| Backend | `admin-server/` — Node ESM Express 4 (+ multer for media) |
| Store | a single `content.json` + a `/gallery` media dir on a shared `/data` volume |
| Deploy | Docker Compose behind Traefik (Hetzner) |

## Structure

- `src/` — the public SPA. Sections (by anchor): Hero, `#sound`, `#mixes`, `#dates` (upcoming events), `#archive` (past shows), `#stages` (residencies), `#gallery`, `#book`.
- `src/admin/` — password-gated admin (`/builder`) that edits `content.json` and moderates queues.
- `admin-server/server.js` — Express: serves `GET /admin-api/content`, handles media uploads, and the n8n ingest endpoints.

## Local dev

```bash
npm install        # frontend
npm run dev        # Vite dev server

cd admin-server && npm install && npm start   # Express admin-server (:3001)
```

## Env

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | admin (`/builder`) login |
| `N8N_SECRET` | shared secret for the `x-n8n-secret` ingest header |

## Social Sync ingest

This site is a destination of the [Social Sync](https://github.com/Davebuda/social-sync) pipeline (Instagram → n8n → site ingest). Canonical contracts live in that repo's `docs/API.md` + `docs/INGEST-CONTRACTS.md`. nginx proxies only `/admin-api/`, so n8n targets `djdip.no/admin-api/ingest/*`. All ingest is authenticated with the `x-n8n-secret` header (constant-time compared) and idempotent on `source_post_id`.

| Endpoint | Writes | Notes |
|---|---|---|
| `POST /admin-api/ingest/events` | `content.events[]` | Upcoming dates. Writes live (no pending state). |
| `POST /admin-api/ingest/mixes` | `content.mixes[]` | SoundCloud/YouTube mixes. Writes live. |
| `POST /admin-api/ingest/archive` | `content.archive[]` | **Past Shows / Archive** — Gate-② draft (`reviewStatus:'suggested'`), **re-hosts media** to `/gallery/` (IG URLs expire). Moderated before it shows publicly. |

**Gate-② (archive only):** ingested archive items are drafts. Moderate them at `/builder/archive` — `POST /admin-api/archive/:id/approve` (→ public) or `DELETE /admin-api/archive/:id`. The public `#archive` section renders `reviewStatus === 'published'` only.
