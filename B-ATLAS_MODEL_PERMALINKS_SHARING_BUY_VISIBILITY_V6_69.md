# B-Atlas v6.69.0 — Model Permalinks, Sharing & Buy Visibility

## Purpose
Make every canonical model independently shareable and permanent, while suppressing incomplete marketplace/listing search without removing saved-listing or buying-decision workflows.

## Permanent model URLs
All 259 baseline canonical models now carry:
- `CanonicalSlug`
- `CanonicalPath`
- `CanonicalURL`

Example:
- Model ID: `ROSB-246-LS`
- URL: `https://b-atlas.org/models/rosborough-rf-246-legacy-sedan-cruiser-diesel/`

Published slugs are immutable. Renaming Manufacturer, Model or Variant does not silently change the permanent path.

`data/model-permalinks.json` is regenerated with the public model pages and sitemap.

## New models
Moderator promotion now creates the permanent URL fields at the same time as the canonical Model ID.

Local/Node mode immediately regenerates crawlable model pages after a new model is promoted.

Cloudflare production-added models receive the permanent URL in the published overlay immediately. `404.html` resolves an as-yet-unbuilt `/models/<slug>/` URL against the public overlay and opens the corresponding interactive model until the next static build creates the full crawlable page.

## Interactive Guide routing
Opening a Guide changes the browser address to its canonical model path through History API state. Back/Forward restore the correct Guide state. The SPA now declares `<base href="/">` so model-path URLs do not break relative data/script/resource loads.

Legacy `?model=BoatModelID` deep links remain supported and are replaced with the canonical path once the Guide opens.

## Sharing
Each Guide now has a single `Share` action beside `Contribute to this Guide`.

Available actions:
- Native device Share where supported
- Copy link
- Email
- Facebook
- Copy model summary

Copy Model Summary includes model name, dual-unit LOA/beam/draft, fuel, propulsion, Model Knowledge Score when available, and the permanent Guide URL.

## Social/search metadata
Generated model pages now expose model-specific:
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image where available
- Twitter/X card metadata
- Schema.org WebPage metadata

Static model specification pages now use dual-unit length formatting for primary dimensions.

## Buy visibility
Only public listing-search/discovery is suppressed.

Retained:
- Buy stage
- Add Listing
- Saved Listings
- Typical Asking Price where available
- Known Problems / inspection guidance
- seller/inspection/offer workflows
- listing-specific notes

Removed from the visible Buy experience:
- marketplace/broker source grid
- automated listing-search coverage strip
- Find This Model marketplace search
- legacy notebook listing discovery

The marketplace-discovery code remains available for future commercial activation.
