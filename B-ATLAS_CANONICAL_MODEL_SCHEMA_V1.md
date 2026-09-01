# B-Atlas Canonical Model Schema v1 — Audit

## Scope
Audited the current v6.27.2 `boatmodels.json` (253 models) and the fields used by Plan / Preference Match and the contribution correction workflow.

## Key findings

- The model database currently contains **103 distinct top-level fields**.
- Several objective specifications are duplicated under legacy and canonical names:
  - `YearStart` / `FirstYear`
  - `YearEnd` / `LastYear`
  - `LengthFt` / `LOA_ft`
  - `BeamFt` / `Beam_ft`
  - `DraftFt` / `Draft_ft`
  - `DisplacementLb` / `Displacement_lb`
  - `FuelCapacityGal` / `FuelCapacity`
  - `WaterCapacityGal` / `WaterCapacity`
- `KeelType` is overloaded. Current values mix keel shape, skegs, rudder protection and running-gear protection. These concepts are now separated in the canonical schema as:
  - `KeelConfiguration`
  - `RudderType`
  - `RunningGearProtection`
- `HullType` currently mixes behaviour and geometry. `HullBehaviour` and `NormalizedHullConfiguration` are retained as the structured concepts.
- `Construction` is primarily narrative. `HullMaterial` is added as a separate controlled field.
- `Galley` and `Shower` mix booleans with narrative descriptions. The canonical preference-facing fields are now:
  - `GalleyUpWithHelm`
  - `ShowerType`
- `AftCabin` is stored as both strings and booleans. The canonical field is boolean.
- Several Plan preferences had no dedicated structured model field:
  - Walkthrough transom
  - Side helm door
  - Galley up with helm
  - Removable flybridge
  - Skeg-hung rudder
  These now have explicit schema fields.
- `Headroom_ft` is referenced by the application but is not populated as a top-level field in the current 253-model dataset. It is now explicitly defined in the schema.

## Data-structure policy

1. New corrections write to canonical fields.
2. Legacy duplicate fields remain readable during migration so existing pages do not break.
3. Unknown is not converted to No/False.
4. Controlled vocabularies are used for fields that participate in filtering or matching.
5. Narrative fields remain available for nuance but do not substitute for a missing structured value.
6. Evidence/provenance remains separate from the model row; the existing facts/evidence layer can be connected during dataset validation.

## Plan / preference mapping

| Plan concept | Canonical model field |
|---|---|
| Minimum / maximum length | `LOA_ft` |
| Minimum / maximum beam | `Beam_ft` |
| Hull behaviour | `HullBehaviour` |
| Boat family | `BoatFamily` |
| Fuel | `NormalizedFuel` |
| Propulsion | `NormalizedPropulsion` |
| Engine arrangement | `EngineCount` |
| Walkthrough transom | `WalkthroughTransom` |
| Wide side decks | `SideDecks` |
| Side helm door | `SideHelmDoor` |
| Galley up with helm | `GalleyUpWithHelm` |
| Separate shower | `ShowerType` |
| Aft cabin | `AftCabin` |
| Removable flybridge | `RemovableFlybridge` |
| Long keel | `KeelConfiguration` |
| Skeg-hung rudder | `RudderType` |
| Trailerable | `Trailerable` |
| Tallest crew | `Headroom_ft` |
| Primary crew / overnight guests | `Berths` + `Cabins` |

## Migration status

This release establishes the schema and correction pathways. It **does not mass-convert the 253 existing model records**. That migration should happen during the dataset-validation phase, where each value can be normalized with evidence rather than inferred mechanically.
