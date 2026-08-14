# B-Scout Shared Community Backend — v6.22

## Purpose

This layer replaces browser-only community transport with a shared moderation queue while preserving local fallback behavior.

## Run locally

From the `public` folder:

```bash
BSCOUT_ADMIN_TOKEN="choose-a-long-private-token" npm start
```

Windows PowerShell:

```powershell
$env:BSCOUT_ADMIN_TOKEN="choose-a-long-private-token"
npm start
```

Open `http://127.0.0.1:8080`.

The Node server serves the existing B-Scout site and the `/api/*` endpoints from the same origin. No external npm runtime packages are required.

## Shared storage

Runtime moderation data is stored outside the published web content in:

- `.bscout-data/community-state.json`
- `.bscout-data/uploads/`
- `.bscout-data/backups/`
- `.bscout-data/published/` — persistent published overrides served ahead of packaged JSON

Set `BSCOUT_DATA_DIR` to move that data to a persistent volume when hosted.

## Moderator access

The moderator console remains at `developer/contribution-review.html`.

Choose **Connect moderator** and enter the same value used for `BSCOUT_ADMIN_TOKEN`. The token is stored only in `sessionStorage` for that browser tab/session.

## Publishing

**Publish reviewed knowledge** writes reviewed output into the files consumed by the Guide:

- `data/community-knowledge-items.json`
- `data/community-knowledge-evidence.json`
- `data/community-reviewed-contributions.json`
- rights-cleared files under `community-assets/`

Backups are created before rewrites.

Only attachments with an approved rights status (`creator_or_owner`, `permission_granted`, or `public_distribution`) are copied into public assets. Uncertain-rights files remain moderation evidence only.

## Canonical promotion

For reviewed `new_manufacturer` and `new_model` submissions, **Promote edited manufacturer/model** can now write the moderator-enriched draft to:

- `data/registry/manufacturers.json`, or
- `boatmodels.json`

A backup is created first. Duplicate canonical names/models are rejected.

## Important hosting requirement

GitHub Pages cannot execute this Node backend. The static site can still run there, but shared contributions will fall back to browser-local storage. To make the shared queue operational across devices, deploy this folder to a host that can run Node and provide persistent writable storage.
