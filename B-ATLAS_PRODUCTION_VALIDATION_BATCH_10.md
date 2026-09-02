# B-Atlas Production Validation Batch 10 — Beneteau + Jeanneau + Cruisers Yachts

**Release:** v6.40.0  
**Canonical architecture:** v1.4

## Beneteau

The Swift Trawler family receives manufacturer-backed metric dimensions, propulsion and accommodation facts.

Two Beneteau source-quality issues are retained explicitly:
- Swift Trawler 48: 27,896 lb does not convert to the stated 12,200 kg.
- Swift Trawler 52: 41,160 lb does not convert to the stated 20,490 kg.

The metric values are used canonically because they are repeated on non-US regional manufacturer pages and avoid silently accepting an imperial conversion error.

### Antares 9 canonical split

The legacy B-Atlas record combined two substantially different boats.

- Generation 1 (2018–24): 9.12 m LOA, 4,259 kg.
- Generation 2 (2025–current): 8.23 m LOA, 4,620 kg.

The reused model name masks a fundamentally new hull, so B-Atlas now stores two canonical records instead of one production phase.

## Jeanneau

The Merry Fisher family is normalized from Jeanneau's own model pages.

The Merry Fisher 795 gets generation-scoped dimensions because the original and current Series 2 official pages differ materially.

The 635 has conflicting regional factory values; the global Jeanneau model page is canonical while the US-page draft/weight difference remains evidence.

## Cruisers Yachts

Cruisers is heavily dependent on marketing renames.

B-Atlas now captures:
- 288 Villa Vee → 298 Villa Vee → 2980 Esprit;
- 3275 Express → 320 Express;
- 3470 Express → 340 Express;
- 3650 MY → 3750 MY → 375 MY;
- 3870 Esprit → 3870 Express.

### 3260 / 3270 split

The previous combined `3260 / 3270 Esprit` record was structurally wrong.

Although the boats look similar outside, HMY documents different interiors and drivetrain layouts:
- 3260: open interior, no mid-cabin, straight drives;
- 3270: traditional mid-cabin, V-drives.

They are now separate canonical models.

### Propulsion variability

The 3375 and 390 Sports Coupe retain unresolved model-wide propulsion because factory/model references document multiple propulsion arrangements.

## Architecture result

This batch reinforces that:
- repeated model names may hide a completely new hull;
- regional manufacturer pages can conflict with each other;
- marketing renames should not create duplicate hull identities;
- visually similar sisterships can still require separate canonical records when interior/drivetrain architecture differs.
