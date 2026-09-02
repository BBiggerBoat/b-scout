# B-Atlas Production Validation Batch 02 — Grand Banks + Marine Trader + CHB

**Release:** v6.31.0  
**Schema:** Canonical Schema v1.3  
**Scope:** All 18 current B-Atlas records from Grand Banks, Marine Trader and CHB.

## Result

This batch confirms why B-Atlas needs both canonical facts and an evidence/lineage layer.

### Grand Banks

The Grand Banks records have relatively strong documentation, but long production runs create legitimate model-level variation:

- **32 Sedan:** dimensions and production total are well established; construction changed from wood to fiberglass during the run.
- **36 Classic:** length and beam changed in the late 1980s. A single canonical LOA/Beam is therefore not stored for the whole production run.
- **36 Europa:** uses the later/enlarged 36 hull, so its dimensions are stable enough to canonicalize.
- **42 Classic:** hull length/beam changed around 1991/92. Engine count also varies; both single and twin boats exist.
- **46 Classic:** core dimensions and twin-diesel architecture are strong. Published production-year ranges conflict, so the current public range is left unchanged.
- **49 Motor Yacht:** core dimensions and twin-diesel motor-yacht classification are strong.

### Marine Trader

The Marine Trader family shows importer naming and generational ambiguity:

- **34 Sedan:** well enough documented for core canonical specifications.
- **34 Europa:** the name is genuinely used in the marketplace, but factory model lineage is poorly documented. The record remains, with identity uncertainty explicitly preserved.
- **36 Double Cabin:** core dimensions, long protective keel and tub/shower arrangement are supported.
- **38 Double Cabin:** core dimensions are supported; engine count varies across production.
- **38 Sundeck:** evidence suggests at least two materially different generations share the name. This record is flagged for an identity split before canonical dimensions are assigned.
- **40 Double Cabin:** core dimensions are supported; single/twin power and 1985/86 production-end details vary.
- **44 Tri-Cabin:** principal dimensions and layout are supported; engine count varies.

### CHB

CHB exposes the strongest importer/builder lineage problem in this batch:

- **34 Double Cabin:** strongly overlaps the Marine Trader 34 family; HMY explicitly identifies CHB as builder and Marine Trader as importer.
- **34 Sedan / Tri-Cabin:** retained as separate current records, but flagged as possible layout/importer overlaps pending lineage consolidation.
- **35 Sundeck:** well enough documented for core dimensions; aliases Ponderosa 35 and Fu Hwa 35 are preserved.
- **40 Double Cabin:** current source base is too weak for aggressive canonicalization; broad classification is retained while dimensions remain legacy-only.

## Data-health implications

1. A model can require **era-specific facts** rather than one scalar specification.
2. Builder, importer, brand and marketplace name must remain distinct.
3. A repeated marketplace model name can hide different generations and should be split before data normalization.
4. Strong documentation justifies canonicalization; weak documentation justifies uncertainty, not invention.
5. Name cleanup continues during validation, but records are not merged merely because two names appear related.

## Next recommended batch

Proceed with another manufacturer group that has a mix of strong and weak documentation.

Recommended:

**Mainship + Monk + Island Gypsy**

This will test:
- multi-generation model names,
- planing/semi-displacement classification,
- single/twin engine variation,
- US production vs Asian production,
- sedan vs aft-cabin model families.
