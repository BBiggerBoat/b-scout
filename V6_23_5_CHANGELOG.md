# B-Atlas v6.23.5 — Search, Dimensions & Market Metrics Foundation

## Implemented

- Strengthened homepage language and metadata around B-Atlas as a community-powered boat knowledge and research resource.
- Standardized primary navigation to uppercase presentation on both the application and crawlable search pages.
- Aligned crawlable-page typography to `bscout-visual-standard.css` variables.
- Added Minimum Length and Minimum Beam alongside existing maximum dimensions in Plan and Dream/search controls.
- Added hard-filter support for lower dimension limits while preserving unknown dimensions as candidates.
- Corrected Plan dimension layout to a consistent two-column full-width range grid on desktop and one column on mobile.
- Added model JSON fields for Rarity Score and Price Level with confidence fields. Values remain unrated until supported by market evidence.
- Added `MARKET_METRICS.md` defining rarity as listing-frequency-led and price as a descriptive price level rather than a value judgement.
- Added model-guide rendering support for Rarity and Price Level once evidence-backed values are populated.

## Resource audit regression gate

The supplied v6.23.4 baseline contains 782 active curated Owner Resource entries across `videos`, `documents`, and `ownerCommunities` (55 + 535 + 192). This is the pre-strict-audit count, not the previously reported audited baseline of 557 retained / 225 removed / 15 models intentionally without an Owner Resource.

This release does not guess which 225 entries were removed. `curatedresources.json` is therefore left unchanged pending restoration of the audited resource file or exact removal list.
