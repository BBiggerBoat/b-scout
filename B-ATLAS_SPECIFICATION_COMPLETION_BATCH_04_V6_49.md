# B-Atlas Specification Completion — Batch 04 (v6.49.0)

## Scope

Manufacturers: CHB, Back Cove, Cape Dory, Rosborough, Nordic Tugs.
Baseline: v6.48.0.

Purpose: continue source-backed canonical specification completion while preserving production/configuration differences and reconciling stale imperial compatibility fields.

## Results

- 41 total database corrections/promotions.
- 20 canonical missing-field resolutions.
- 21 legacy/imperial shadow-field reconciliations.
- Cross-database QC remains 259 canonical models / 259 registry identities / 259 search aliases.
- Measurement normalization tests pass.

### Canonical gap reductions

| Field | v6.48 missing | v6.49 missing | Change |
|---|---:|---:|---:|
| LOA | 18 | 17 | -1 |
| LWL | 131 | 127 | -4 |
| Beam | 16 | 16 | 0 |
| Draft | 25 | 25 | 0 |
| Air draft | 139 | 134 | -5 |
| Displacement | 34 | 32 | -2 |
| Fuel | 6 | 5 | -1 |
| Mechanical propulsion | 2 | 2 | 0 |
| Hull behaviour | 0 | 0 | 0 |
| Keel configuration | 94 | 91 | -3 |
| Rudder type | 217 | 213 | -4 |

## Key findings

### Back Cove

Factory literature supports full-load/representative displacement and exposed several stale imperial shadow values. The canonical metric values for several models were already correct, but old imperial fields could display older figures when users switch units. These were reconciled. Back Cove 26 and 41 also gained previously missing canonical displacement values. The 39O is now explicitly classified as having no separate rudder because steering is through its outboards.

### Cape Dory

Model-specific Powerboat Guide records supplied reliable bridge-clearance values for the 28 Flybridge, 28 Open Fisherman, 30 Flybridge, 33 Flybridge, and 36 Flybridge. The 36 is now `fuel.mixed` because published history documents both gasoline and diesel configurations. Conflicting loading bases for Cape Dory 28 displacement were deliberately not flattened into one canonical figure.

### CHB

The 35 Sundeck's canonical metric dimensions/displacement were already aligned with model-specific evidence, while legacy imperial values were not. The imperial shadow fields were corrected. The legacy-only CHB 34 Sedan and Tri-Cabin identities remain unresolved because they still lack an independent identity-specific source adequate for promotion.

### Rosborough

The RF-246 family now carries the documented 23 ft 4 in LWL and a protective/center-keel classification. Outboard and sterndrive variants are explicitly classified as having no separate rudder. Draft remains intentionally unresolved at the shared-model level because it changes materially with propulsion configuration.

### Nordic Tugs

The Nordic Tug 39 gained a source-backed 38 ft 11 in LOA and 37 ft 4 in LWL. The Nordic Tug 37 legacy displacement shadow was reconciled to the published 22,600 lb model specification. Air draft remains unresolved on several Nordic Tug models because published heights vary with mast, flybridge, antenna and folded configuration.

## Evidence discipline

No LWL, rudder or air-draft value was inferred from model number, hull type, or generic family characteristics. Configuration-dependent measurements remain unknown where one model-wide value would be misleading.
