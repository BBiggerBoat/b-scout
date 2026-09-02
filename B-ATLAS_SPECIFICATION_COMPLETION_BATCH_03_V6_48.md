# B-Atlas Specification Completion — Batch 03 (v6.48.0)

## Scope

Manufacturers: Albin, Grand Banks, Mainship, DeFever, Kadey-Krogen.

This batch focused on classic-trawler records with high Plan relevance and on reconciling stale imperial shadow fields against the newer canonical metric layer.

## Results

35 source-backed field updates/corrections were made.

Key improvements:

- Mainship 34 MK I, II and III: published 13 ft 6 in clearances promoted into canonical AirDraft.
- Mainship 30 Pilot: canonical LOA corrected from nominal 30 ft hull length to 33 ft 1 in overall length with pulpit; hull length retained separately.
- DeFever legacy imperial fields reconciled to model-specific published specifications for the 34 Passagemaker, 40 Offshore Cruiser, 41 Trawler, 43 Trawler, 45 Pilothouse, 47 POC and 49 Cockpit MY.
- Grand Banks 36 Europa and 46 Classic legacy displacement fields corrected to match published specifications and canonical metric values.
- Kadey-Krogen 36 Manatee: LWL and bridge clearance corrected; bridge clearance promoted to canonical AirDraft.
- Kadey-Krogen 39: nominal/model-number legacy length corrected to published 43 ft 8 in LOA, and beam corrected to 14 ft 3 in.
- Kadey-Krogen 42: displacement shadow field corrected to 40,000 lb.
- Kadey-Krogen 48 North Sea: legacy nominal 48 ft length corrected to 53 ft LOA.
- Krogen 44 vs 44 AE: preserved generation distinction. The period 44 Trawler remains 15 ft 6 in beam, while the current 44 AE is 16 ft 4 in per factory specification. The AE also gains its factory mast-down bridge clearance of 13 ft 8 in.
- Albin 32+2: removed a false LWL. The 34 ft 11 in figure is published as hull length, not waterline length. LWL therefore remains unknown.

## Important data-quality lesson

Several records had correct canonical metric values but stale or mislabeled legacy imperial values. Those shadow fields can still leak into UI or compatibility code, so canonical completion must include cross-unit reconciliation rather than only filling blanks.

## Deliberate unknowns / unresolved conflicts

- Rudder attachment/type remains unknown unless the source states a specific arrangement. A source saying the keel protects the rudder is not enough to classify it as skeg-hung or keel-attached.
- DeFever 38 Passagemaker remains a low-volume/custom specification conflict; surviving examples vary and should not be flattened into one model-wide length/displacement pair.
- Albin 25 displacement remains unresolved because published displacement bases differ.
- LWL remains unknown on many models where only hull length or nominal model length is published.

## Remaining global missing canonical fields after Batch 03

- LOA: 18
- LWL: 131
- Beam: 16
- Draft: 25
- AirDraft: 139
- Displacement: 34
- FuelCode: 6
- MechanicalPropulsionCode: 2
- HullBehaviourCode: 0
- KeelConfigurationCode: 94
- RudderTypeCode: 217

## Evidence hierarchy

1. Current/period manufacturer specifications where available.
2. HMY / Powerboat Guide model-specific specifications and historical notes.
3. Previously validated B-Atlas model evidence where no better primary source exists.

Unknown values remain unknown where credible evidence is insufficient.
