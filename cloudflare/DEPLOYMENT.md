# B-Scout v6.23.0 — zero-cost Cloudflare deployment

The code is ready for a Cloudflare Pages project whose project/root directory is this `public` folder.

## Cloudflare resources to create

Use the Cloudflare dashboard (no paid plan required):

1. Create a D1 database, for example `bscout-community`.
2. Run `cloudflare/schema.sql` against that D1 database.
3. Create a Workers KV namespace, for example `bscout-files`.
4. Create/import the Pages project from the B-Scout GitHub repository.
5. Set the Pages project root directory to the repository's `public` folder if `public` is not itself the repository root.
6. Use no build command. The output directory is `.` when the Pages root is `public`.
7. Add the D1 binding with variable name `BSCOUT_DB`.
8. Add the KV binding with variable name `BSCOUT_FILES`.
9. Add encrypted secret/environment variable `BSCOUT_ADMIN_TOKEN` with a long random value.
10. Redeploy after adding bindings/secrets.

## First checks after deployment

- `/` loads B-Scout normally.
- `/api/health` returns `shared: true`, `adminConfigured: true`, and `persistence: D1+KV`.
- Submit one harmless test contribution.
- Open moderator mode, connect using `BSCOUT_ADMIN_TOKEN`, and confirm the test appears in the shared queue.
- Approve/publish the test and confirm the published result is visible from another browser/private window.
- Test one image or PDF attachment and confirm it is inaccessible publicly before approval but accessible after approval when the rights status permits publication.

## Local workflow remains unchanged

Continue using:

`npm start`

This still runs `server.js` and uses `.bscout-data/`. Cloudflare files do not replace or interfere with the local Node server.

## Persistence model

- D1: moderation queue, reviewed records, knowledge state, canonical model corrections, promoted models/manufacturers.
- Workers KV: uploaded image/PDF binary files and minimal file metadata.
- GitHub/static JSON: canonical baseline dataset shipped with each deploy.
- Browser runtime: merges Cloudflare's approved published overlay onto the static baseline.

## Backups

D1 Free provides point-in-time recovery. The authenticated `/api/admin/backup` endpoint also returns the full moderation state and published overlay as JSON for an off-platform backup.

KV attachments are not included in that JSON export. If B-Scout develops meaningful traffic/contributions, attachment backup and/or migration to R2 should be the first storage upgrade.
