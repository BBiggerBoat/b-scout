# B-Atlas v6.65.0 — Display Precision and Knowledge Gauge Fix

## Purpose
Correct two UI regressions identified after v6.64.0:

1. Search-result specification cards were rendering raw floating-point shadow values such as `29.916666666666668 ft`.
2. The Model Knowledge Score gauge implementation could fail to appear correctly because the main stylesheet still used an obsolete cache-busting version string.

## Measurement display
Search-result cards now route LOA, Beam, Draft and Air Draft through `BAtlasCanonical.formatBoatMeasurement()` using the fixed dual-unit profile.

Examples:

- `29.916666666666668 ft` -> `29′ 11″ / 9.12 m`
- `3.1666666666666665 ft` -> `3′ 2″ / 0.97 m`
- Unknown remains `Unknown`; no `Unknown ft` suffix is added.

The last-resort legacy formatter also rounds to the nearest inch and limits metric output to two decimal places.

## Model Knowledge Score gauge
The main page now cache-busts the complete Knowledge Score rendering stack at v6.65.0:

- `styles.css`
- `canonicaldata.js`
- `modelknowledgescore.js`
- `boatworkspace.js`
- `script.js`
- `contributionentry.js`

This prevents older cached CSS from suppressing the circular conic-gradient gauge while newer JavaScript is already active.

The Guide continues to render:

- circular Model Knowledge Score gauge
- score percentage and achievement tier
- next community goal
- separate evidence strength
- highest-value missing facts
- direct field-level contribution actions

## Validation
- JavaScript syntax: passed
- Cross-database QC: passed (259 / 259 / 259)
- Measurement normalization: passed
- Model Knowledge Score: passed (43 fields, 100 total weight)
- Plan-critical Unknown regression: passed
