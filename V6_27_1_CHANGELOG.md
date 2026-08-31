# B-Atlas v6.27.1 — Live Contribution API Connection

## Purpose
Connect the public B-Atlas site and moderator console to the deployed Cloudflare contribution backend at `https://api.b-atlas.org`.

## Changes
- Public contribution submission now uses the live Cloudflare API.
- Moderator queue, save, publish, promote, and attachment requests now use the live API.
- Live model/manufacturer overlays now load from the API.
- Community Guide live reviewed knowledge now loads from the API.
- Static/local fallback behavior remains intact if the API is unavailable.
- Updated affected script references with cache-busting `v=6.27.1`.
- No changes to Preference Match or model-fit logic.

## Production API
`https://api.b-atlas.org`
