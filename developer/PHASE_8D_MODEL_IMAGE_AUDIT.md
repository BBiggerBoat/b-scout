# Phase 8D — Model Image Reference Audit and Cleanup

## Scope
Audited `boatmodels.json`, `data/imageassets.json`, and `images/` for model/image reference consistency.

## Safe corrections applied
- Refreshed 13 stale `imageassets.json` entries where the requested image file already existed but the registry still forced the placeholder.
- Renamed `images/carv-40ac.jpg` to canonical `images/carv-40-ac.jpg` for `CARV-40-AC`.
- Renamed legacy `images/tran-ea-32.jpg` to canonical `images/tpmc-32-ea.jpg` for `TPMC-32-EA` (Transpacific Marine Eagle 32).
- Removed orphan `images/albn-30-te.jpg` after byte-for-byte verification that it duplicated referenced `images/albn-30-fc.jpg`.
- Preserved `images/albin-25.jpg` as an unreferenced alternate because it is not an exact duplicate and should not be destroyed without an image-selection decision.

## Post-cleanup results
- 287 model records
- 159 image files including site assets and placeholder
- 154 model requested images present
- 133 model requested images still missing and correctly represented as missing in the registry
- 0 BoatModelID/ImageURL prefix mismatches
- 0 stale registry `missing` states for files that actually exist
- 0 exact duplicate model-image groups
- 1 unresolved orphan model image (`images/albin-25.jpg`)

## Manufacturer-prefix inconsistencies requiring a separate ID migration
These are not safe filename-only fixes because changing IDs can affect saved models, evidence references, generated files, and other relationships.

- CHB: `CHBY` (3 records) and `CHBB` (2 records)
- Cape Dory: `CPDR` (7 records) and `CAPD` (2 records)
- Marine Trader: `MRTR` (6 records) and `MTRA` (2 records)

### CHB finding
The reviewed CHB records currently use `CHBY-*` IDs and matching `chby-*` image filenames. Two older/legacy CHB 34 records use `CHBB-*` and matching `chbb-*` filenames. Therefore the visible `CHBY` filename is not an ImageURL mismatch; the underlying problem is inconsistent maker-code conventions and probable overlapping CHB 34 records.

A dedicated model-ID consolidation should choose one canonical manufacturer prefix, map legacy IDs to canonical IDs, migrate saved/user references, and resolve overlapping model records before any CHB image files are renamed.

## Reusable audit
Run:

    node developer/audit-model-images.js

The machine-readable report is written to:

    developer/reports/model-image-audit.json
