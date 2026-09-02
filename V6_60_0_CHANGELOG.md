# B-Atlas v6.60.0 Changelog

## Specification Completion Batch 14 — Final Manufacturer Batch

Baseline: v6.59.0

Completed source-backed specification review for SeaPiper, Sealord, Shannon and Transpacific Marine.

### Data changes
- 51 field-level corrections/promotions across 4 canonical model records.
- SeaPiper 35: reconciled factory dimensions, added 6 ft 6 in headroom, classified skeg-hung rudder, normalized 200/80/22 US gal tankage, and cleared unsafe fixed air draft.
- Sealord 34: normalized exact-model 757/378/94 L tankage (approximately 200/100/25 US gal); preserved unresolved LWL/air-draft/headroom/rudder fields.
- Shannon 38 SRD: corrected shadows to factory 40 ft 6 in LOA / 37 ft 7 in LWL / 13,500 lb, changed propulsion to Mixed to include surface-drive production, normalized 290/80 US gal fuel/water, and removed unsupported air-draft/holding-capacity values.
- Transpacific Eagle 32: classified full-keel-attached/keel-shoe-hung rudder, confirmed 6 ft 3 in headroom, and cleared unsafe model-wide tankage because exact surviving boats vary materially by year/refit.

### Coverage
- Manufacturer specification-completion coverage is now **69 / 69**.
- No manufacturers or canonical models remain unreviewed in the manufacturer sequence.

### Generated assets
- Added `data/specification-completion-batch-14-v6.60.json`.
- Added `data/specification-research-queue-v6.60.json`.
- Added `data/specification-tail-status-v6.60.json`.
- Regenerated crawlable knowledge cards, search pages and sitemap from corrected canonical data.

### Residual focus after manufacturer closeout
- Headroom remains the largest omitted structured field and now requires a dedicated field-centric pass.
- Remaining LWL, air-draft, keel and rudder gaps should be handled as researched-unknown/configuration-dependent exceptions rather than pursued blindly to 100% non-null completeness.

### Validation
- 259 canonical models.
- 259 registry identities.
- 259 search aliases.
- 28 Plan preference mappings.
- Cross-database QC passed.
- Measurement normalization passed.
