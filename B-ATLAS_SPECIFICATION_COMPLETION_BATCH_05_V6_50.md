# B-Atlas Specification Completion Batch 05 — v6.50.0

Baseline: v6.49.0  
Date: 2026-09-02

## Manufacturers
- Cheoy Lee
- Willard
- Helmsman
- Island Gypsy
- Sea Sport

## Method
Only model-specific, source-backed values were promoted. Conflicting or configuration-dependent values remain unresolved. Canonical SI values and imperial compatibility/shadow fields were reconciled where evidence was explicit. Tankage was normalized only where a source explicitly identified US gallons.

## Results
60 field-level updates across 12 model records.

### Cheoy Lee
- 35 Trawler: LWL corrected/promoted to 32 ft 6 in from HMY; stale 21,000 lb shadow displacement corrected to the 23,500 lb figure in the reproduced original Cheoy Lee brochure.
- 36 Trawler Mk II: original brochure values promoted into canonical LOA (36 ft 6 in), beam (13 ft), and draft (3 ft 6 in).
- Rudder types remain unresolved because the available material establishes protected running gear but not the exact rudder attachment taxonomy.

### Willard
- Vega 30 Voyager: 27 ft 6 in LWL promoted from model-specific documentation; Willard owners association confirms Voyager is one of the versions built on the shared Vega 30 hull.
- Vega 36 and Vega 40 remaining dimensional/rudder gaps were not filled without sufficiently specific model evidence.

### Helmsman
- 43E: 13 ft 6 in lowered-arch bridge clearance added from BoatTEST.
- 38E, 43E, and 46 factory/published tank capacities are now stored canonically in litres while retaining the exact published US-gallon source values.
- Rudder remains untyped: factory language confirms a strong skeg and large rudder but does not state that the rudder is skeg-hung.
- 31 Sedan LWL remains unresolved because credible sources conflict (approximately 25 ft 6 in versus 28 ft).

### Island Gypsy
- 32 Europa: 12 ft 4 in clearance added from HMY.
- 32 Sedan: rudder classified as skeg-hung because HMY explicitly states “skeg-mounted rudder.”
- 36 Classic: clearance corrected from 13 ft 6 in to 12 ft 6 in; imperial LWL shadow reconciled to 32 ft 10 in.
- 36 Europa: clearance corrected from 13 ft 6 in to 16 ft 0 in; imperial LWL shadow reconciled to 32 ft 10 in.

### Sea Sport
- XL 2400 and Explorer 2400: current factory outboard configuration classified as no separate conventional rudder.
- Factory fuel/water/holding capacities explicitly state US gallons; values are now normalized into canonical litres and retain the source gallon values.
- Sea Sport 27 combined Seamaster/Navigator/Pilot identity remains unresolved and was not flattened into one drivetrain/draft specification.

## Remaining global structured gaps after Batch 05
- LOA: 16
- LWL: 125
- Beam: 15
- Draft: 24
- Air draft: 132
- Displacement: 32
- Fuel: 5
- Mechanical propulsion: 2
- Hull behaviour: 0
- Keel configuration: 91
- Rudder type: 210

## Validation
- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Cross-database QC: Passed
- Measurement normalization tests: Passed
