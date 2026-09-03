# v6.69.0

- Added permanent canonical model URLs for all 259 baseline models.
- Added immutable `CanonicalSlug`, `CanonicalPath` and `CanonicalURL` fields.
- Added `data/model-permalinks.json`.
- New moderator-approved models now receive permanent URLs automatically.
- Local new-model promotion regenerates static model pages automatically.
- Added static-host 404 bridge for newly published Cloudflare-overlay models before the next static build.
- Interactive Guides now place the canonical model path in the browser address bar.
- Added History API Back/Forward restoration for Guide state.
- Added root `<base href="/">` so canonical model paths do not break relative assets/data.
- Added Guide Share action: native share, Copy Link, Email, Facebook and Copy Model Summary.
- Added model-specific Open Graph image and Twitter/X metadata to generated model pages.
- Static model specifications now display dual Imperial / Metric primary dimensions.
- Suppressed public marketplace/listing search in Buy while retaining Add Listing, Saved Listings and buying-decision tools.
- Suppressed legacy notebook listing-search discovery.
- Updated generated static navigation to Home | Find Your Boat | Boat Models | Saved Models | Help Build B-Atlas | About.
- Added v6.69 permalink and Buy/share regression tests.
