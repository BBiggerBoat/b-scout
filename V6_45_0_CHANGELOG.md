# B-Atlas v6.45.0 — Measurement Normalization & Specification Completion Foundation

## Measurement architecture
- Added site-wide Imperial / Metric / Both measurement preference.
- Added explicit LOA and LWL presentation in the interactive Guide and comparison view.
- Standardized interactive length, beam, draft, air draft, headroom, displacement and verified volume formatting through `canonicaldata.js`.
- Plan length/beam inputs now accept metres in Metric mode while preserving feet internally for backward compatibility with existing saved search state.
- Unit profile changes convert currently entered Plan length/beam values rather than merely changing labels.

## Tank-capacity integrity
- Removed runtime behavior that treated every `FuelCapacity`, `WaterCapacity` and `HoldingCapacity` value as litres and synthesized US gallons.
- Added per-record capacity UnitStatus metadata where the existing paired values allow the migration state to be identified.
- Ambiguous legacy gallon records now explicitly display `US/Imperial basis unverified` instead of a false `US gal` label.
- Conflicting capacity values are surfaced as conflicts rather than silently converted.
- Knowledge-card generation no longer hard-codes all capacity values as US gallons.

## Canonical specification promotion
Promoted 132 structured facts already supported by validated legacy fields:
- explicit Diesel/Gasoline values to `FuelCode`;
- explicit shaft/sterndrive/pod/outboard values to `MechanicalPropulsionCode`;
- explicit full-length/full-skeg/pocket/twin/protective keel descriptions to `KeelConfigurationCode`.

No free-text inference was used for rudder type.

## Remaining research queue
Created:
- `data/specification-research-queue-v6.45.json`
- `B-ATLAS_SPECIFICATION_COMPLETION_QUEUE_V6_45.md`

The largest unresolved field remains `RudderTypeCode` (257/259 models). LWL, air draft and headroom also require substantial source research; some values may legitimately remain unpublished/unknown.

## Tests
- Added `developer/test-measurement-normalization.js`.
- Cross-database QC remains passing at 259 canonical models / 259 registry identities / 259 aliases.
