# v6.54.0 Changelog

## Specification Completion Batch 09

Baseline: v6.53.0

Manufacturers reviewed:
- Gulfstar
- Greenline
- Endeavour
- Universal
- Sisu

### Data changes

- Applied 111 source-backed field-level updates.
- Corrected Gulfstar 36/43/49 LWL and/or air-draft shadow fields to model-specific Powerboat Guide values.
- Cleared unsupported Gulfstar 44 LWL shadow.
- Normalized verified Gulfstar fuel/water/waste capacities into canonical litres while preserving source US-gallon values.
- Corrected Greenline 33 and 39 tank fields that incorrectly stored gallon-equivalent values as though they were litres.
- Promoted Greenline 33/39 `FuelCode` to diesel so Plan matches their diesel/diesel-hybrid configurations.
- Removed unsupported Greenline 33/39 LWL values rather than presenting them as researched facts.
- Added Endeavour TrawlerCat 36 canonical air draft and normalized Endeavour 36/44 tankage.
- Cleared unsupported Endeavour 44 air-draft shadow because model-specific Powerboat Guide data lists clearance as NA.
- Reconciled Universal 36 displacement shadows and normalized supported tankage.
- Added Universal 40 36 ft LWL, 17 ft air draft, 17,000 lb displacement, skeg-hung rudder classification and verified 320/200/50 US gal tankage.
- Corrected Sisu 22 hull draft from Royal Lowell design-history data and removed unsupported model-wide LWL/air-draft/displacement/tank values.
- Corrected Sisu 26 LOA/displacement shadows; normalized documented 80/10 US gal fuel/water configuration; removed unsupported LWL/air-draft/holding values.
- Regenerated all crawlable model/manufacturer/constraint/comparison pages and sitemap from canonical data.

### Research queue

Regenerated as `data/specification-research-queue-v6.54.json`.

- LWL missing: 119 -> 120 (intentional removal of two unsupported Greenline LWLs, offset by one verified Universal 40 LWL)
- Air draft missing: 121 -> 119
- Displacement missing: 29 -> 28
- Fuel missing: 4 -> 2
- Rudder type missing: 202 -> 201
- Other primary missing counts unchanged.

### Validation

- Cross-database QC: Passed (259 canonical models / 259 registry identities / 259 search aliases / 28 preference mappings)
- Measurement normalization tests: Passed
