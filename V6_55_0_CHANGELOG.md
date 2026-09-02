# v6.55.0 Changelog

## Specification Completion Batch 10

Baseline: v6.54.0

Manufacturers reviewed:
- North Pacific
- Fortier
- BHM / Flye Point
- Seahorse
- Nord Star

### Data changes

- Applied 79 source-backed field-level updates across 8 model records.
- Added North Pacific 28 LWL and bridge clearance; normalized verified fuel/water capacity; promoted full-length keel classification.
- Moved North Pacific 28 draft and holding capacity to Unknown because factory-hosted period sources conflict.
- Removed unsupported North Pacific 38 LWL/air-draft shadows and treated water capacity as hull/configuration-dependent.
- Normalized Fortier 26 factory fuel capacity; cleared unsupported model-wide water/holding values.
- Flagged Fortier 33 factory fuel-capacity conflict (200 vs 220 gal) and avoided false litre normalization.
- Promoted representative BHM/Flye Point 32 beam and draft while removing unsupported semi-custom LWL, air-draft, displacement and tankage fallbacks.
- Corrected Seahorse Coot 35/38 legacy construction from Fiberglass to Steel.
- Added skeg-hung rudder classification to Coot 35/38 from documented rudder-skeg construction.
- Removed internally inconsistent Coot 38 LWL and conflicting model-wide tank/displacement fallbacks.
- Normalized Nord Star 31+ factory SI tankage, added 1.94 m main-cabin headroom and classified no separate rudder for sterndrive steering.
- Removed Nord Star 31+ fixed draft fallback because published draft varies by drive position/configuration.
- Regenerated crawlable model/manufacturer/constraint/comparison pages and sitemap from canonical data.

### Research queue

Regenerated as `data/specification-research-queue-v6.55.json`.

- LOA missing: 15 -> 15
- LWL missing: 120 -> 120
- Beam missing: 14 -> 13
- Draft missing: 23 -> 23
- Air draft missing: 119 -> 118
- Displacement missing: 28 -> 28
- Fuel missing: 2 -> 2
- Mechanical propulsion missing: 1 -> 1
- Hull behaviour missing: 0 -> 0
- Keel configuration missing: 91 -> 91
- Rudder type missing: 201 -> 198

### Validation

- Cross-database QC: Passed (259 canonical models / 259 registry identities / 259 search aliases / 28 preference mappings)
- Measurement normalization tests: Passed
