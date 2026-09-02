# B-Atlas Canonical Data Architecture v1.4 — PRODUCTION PHASE / GENERATION EXTENSION

**Status:** LOCKED additive extension  
**Date:** 2026-09-01  
**Supersedes:** v1.3 for architecture; v1.3 field IDs and controlled vocabularies remain stable.

## Why this exists

A long-lived boat model can change materially without receiving a new manufacturer model designation.

Examples include:
- wood → fiberglass construction;
- widened or lengthened hulls;
- significant hull redesigns;
- builder/yard or propulsion changes;
- layout changes within a continuously named model.

B-Atlas must preserve those changes without manufacturing duplicate model identities.

## Canonical hierarchy

```text
Manufacturer / Brand
    ↓
Canonical Model
    ↓
Variant
    ↓
Production Phase / Generation
    ↓
Phase-scoped canonical facts
    ↓
Year / hull-specific evidence
```

A Production Phase is **not** automatically a separate BoatModel.

## Split rule

Create a new canonical model/variant when at least one of these is true:

1. the builder or market gave the boat a distinct model designation;
2. the new version is marketed as a distinct variant/generation;
3. the redesign is so fundamental that treating both as one model would materially mislead users.

Otherwise, keep one canonical model and use Production Phases.

### Examples

- Trojan wooden model → Trojan `F` fiberglass designation: separate model identity where the manufacturer changed the designation.
- Grand Banks 36 Classic wood → fiberglass: one model, different Production Phases.
- Grand Banks 36 Classic original → enlarged 1987/88 hull: one model, different Production Phases.
- Grand Banks 36 Classic → 36 Europa: distinct named variant/model record.

## ProductionPhase record

Each phase has:
- stable `ProductionPhaseID`;
- parent `BoatModelID`;
- sequence;
- start/end years;
- boundary precision;
- transition years when the cutoff is not clean;
- reason codes;
- phase-scoped fact overrides;
- evidence links.

Phase facts override model-wide facts only when the phase is resolved.

## Ambiguous transition years

A year alone may not be enough.

For example, 1973 Grand Banks boats exist in both wood and fiberglass. Both phases may therefore include 1973.

If a listing is simply:

`1973 Grand Banks 32`

B-Atlas must keep hull material **unknown/ambiguous** until another fact (hull material, hull number, source evidence) resolves the phase.

This directly follows the B-Atlas principle:

> Known undesirable information may eliminate. Missing or ambiguous information remains in consideration.

## Search and matching

Phase resolution is contextual:

```text
listing/model year
+ known construction
+ known hull number / other evidence
        ↓
resolve production phase
        ↓
apply phase-specific dimensions/material
```

If the phase cannot be resolved, B-Atlas must not select one merely to obtain a filterable value.

## Grand Banks implementation

The initial registry covers:

### Grand Banks 32 Sedan
- Phase 1: wood
- Phase 2: fiberglass
- 1973 deliberately overlaps because the change occurred within the year.

### Grand Banks 36 Classic
- Phase 1: original wood hull
- Phase 2: original-size fiberglass hull
- Phase 3: enlarged fiberglass hull
- the 1987/88 dimensional transition remains conservatively marked as a transition period.

### Grand Banks 42 Classic
- Phase 1: original hull
- Phase 2: widened/lengthened hull beginning around 1991/92.

## Language and units

Production phases use stable IDs and `LabelKey` rather than hard-coded translated identity.

Phase measurement overrides use the same canonical internal units as the rest of B-Atlas:
- metres;
- kilograms;
- litres;
- kilowatts;
- knots;
- nautical miles.

Source measurements remain in the evidence layer.

## Change control

This is an additive extension. It does **not** rename or destabilize v1.3 canonical field IDs.

Future manufacturer batches should use Production Phases whenever material facts genuinely vary across a continuously named model.
