# B-Atlas v6.46.0 Changelog

## Canonical specification completion — Batch 01

- Completed first targeted specification pass for Ranger Tugs, Bayliner, Beneteau, Jeanneau and Cruisers Yachts.
- Promoted 219 source-supported canonical facts from validated model-specific evidence.
- Added canonical rudder state `rudder.none_external_drive` for boats steered by outboard, sterndrive or pod rather than a separate rudder.
- Reduced false `Unknown` values across LOA, LWL, beam, draft, air draft, displacement and hull behaviour.
- Preserved production-phase dimensional conflicts instead of flattening them into model-wide values.
- Regenerated the specification research queue for v6.46.0.
- Cross-database QC and measurement normalization tests pass.
