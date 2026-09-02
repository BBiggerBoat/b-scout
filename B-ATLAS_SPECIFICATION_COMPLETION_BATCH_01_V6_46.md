# B-Atlas Canonical Specification Completion — Batch 01

**Release:** v6.46.0  
**Baseline:** v6.45.0  
**Manufacturers:** Ranger Tugs, Bayliner, Beneteau, Jeanneau, Cruisers Yachts

## Purpose

This is the first source-backed specification-completion batch. It does not revisit canonical model identity. It promotes already documented model-specific facts into canonical fields, resolves structural taxonomy gaps exposed by the completion work, and leaves genuinely unresolved facts unknown.

## Results

A total of **219 canonical facts** were promoted or resolved in this batch.

- AirDraft: **51**
- LWL: **45**
- RudderTypeCode: **32**
- Draft: **21**
- Displacement: **21**
- Beam: **18**
- LOA: **16**
- HullBehaviourCode: **14**
- KeelConfigurationCode: **1**

### Rudder taxonomy correction

Outboard, sterndrive and steerable-pod boats do not use a separate conventional rudder. The prior schema forced these boats into `RudderTypeCode = unknown`, which incorrectly implied missing research. v6.46.0 adds:

`rudder.none_external_drive` — **No separate rudder (steered by outboard/drive)**

This was applied only where the canonical `MechanicalPropulsionCode` already establishes outboard, sterndrive or pod propulsion. Shaft and V-drive boats remain unknown unless the rudder arrangement itself is documented.

## Remaining gaps after Batch 01

| Manufacturer | Models | LOA | LWL | Beam | Draft | Air draft | Displ. | Keel | Rudder |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Ranger Tugs | 16 | 0 | 14 | 0 | 0 | 0 | 0 | 12 | 10 |
| Bayliner | 12 | 1 | 0 | 1 | 1 | 0 | 1 | 10 | 6 |
| Beneteau | 13 | 0 | 0 | 0 | 0 | 0 | 0 | 7 | 6 |
| Jeanneau | 9 | 1 | 0 | 1 | 1 | 0 | 1 | 9 | 0 |
| Cruisers Yachts | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 6 |

## Evidence policy

Facts were promoted when the existing B-Atlas record already carried model-specific evidence references from the manufacturer, owner manuals, HMY Powerboat Guide or another previously accepted technical reference, and the fact was not deliberately phase-scoped. Production-phase dimensional conflicts remain phase-scoped rather than being flattened into one model-wide value.

Manufacturer specifications remain preferred where available. Examples used during this pass include Ranger Tugs current spec sheets/owner manuals and BENETEAU model specification pages. HMY remains a secondary technical source for legacy Bayliner and Cruisers models.

## Important unresolved areas

- **Ranger Tugs LWL:** generally not published in current manufacturer specifications; 14 records remain unresolved.
- **Keel configuration:** remains the largest gap in this batch. A no-keel classification was not inferred merely from planing hull form.
- **Shaft/V-drive rudders:** remain unresolved unless a source specifically identifies spade, skeg-hung, keel-attached or another rudder arrangement.
- **Production-phase dimensional conflicts:** Bayliner 3788 and Jeanneau Merry Fisher 795 remain phase-scoped by design.
- **Tank capacities:** verified-US-gallon normalization remains separate from this batch unless the source explicitly states the unit basis. Existing ambiguous legacy gallon records were not silently reclassified.

## Release gate

- Canonical model count unchanged: **259**
- Registry/search identity synchronization preserved.
- Cross-database QC: **Passed**
- Measurement normalization tests: **Passed**
