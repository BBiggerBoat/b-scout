# B-Scout Cloudflare persistence

This folder supports the zero-cost live deployment while preserving the existing local Node workflow.

## Persistence modes

- Local: `npm start` -> `server.js` -> `.bscout-data/` (unchanged)
- Live: Cloudflare Pages Functions -> D1 (`BSCOUT_DB`) + Workers KV (`BSCOUT_FILES`)

The public static JSON files remain the checked-in baseline. Approved live corrections/new canonical records are stored as a published overlay and merged by the browser at runtime. This avoids trying to rewrite immutable deployed Pages assets.

## Required Cloudflare resources

1. One D1 database, binding name: `BSCOUT_DB`
2. One Workers KV namespace, binding name: `BSCOUT_FILES`
3. One encrypted environment variable/secret: `BSCOUT_ADMIN_TOKEN`

Apply `cloudflare/schema.sql` to the D1 database before testing the API.

## Function routes

- `GET /api/health`
- `POST /api/contributions`
- `GET /api/public/overlays`
- `GET /api/public/attachments/:id`
- Moderator: `/api/admin/*` (Bearer token required)

## Backup

Cloudflare D1 Free includes point-in-time recovery. B-Scout also exposes `GET /api/admin/backup`, which returns the complete moderation state and published overlay as JSON for a manual off-platform backup.

Attachments are stored in Workers KV. They are not included in the JSON backup; the checked-in contribution metadata keeps their attachment IDs. For a hobby/prototype deployment this is intentionally simple. If B-Scout gains traction, move attachment storage to R2 and add scheduled off-platform object backups.
