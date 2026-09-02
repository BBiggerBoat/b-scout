# B-Atlas Production Phase Implementation — Grand Banks

**Release:** v6.32.0  
**Schema:** Canonical Architecture v1.4 additive extension

## Decision implemented

Grand Banks wood/fiberglass and hull-dimension changes are **not** represented as artificial duplicate models.

Instead B-Atlas now has a `ProductionPhase` layer between canonical model identity and year/hull-specific facts.

## Initial phase registry

### Grand Banks 32 Sedan
- 1965–1973: wood phase
- 1973–1995: fiberglass phase
- 1973 intentionally overlaps because the transition occurred within the year.

### Grand Banks 36 Classic
- 1965–1973: original wood hull
- 1973–1987: original-size fiberglass hull
- 1987–2004: enlarged fiberglass hull
- 1987/88 is marked as a transition period rather than pretending the cutoff is perfectly clean.

### Grand Banks 42 Classic
- 1975–1990: original hull, 42'7" × 13'7"
- 1991–2004: enlarged hull, 43'3" × 14'1"
- 1991/92 remains marked as a boundary requiring hull-specific care.

## Runtime behaviour

`datarepository.js` now loads the phase registry and attaches applicable phases to each model.

`canonicaldata.js` now supports:
- phase matching by year;
- additional disambiguation by known hull material;
- ambiguous-phase detection;
- phase-specific canonical overrides.

The Guide now displays a **Production Evolution** section for models with phase records.

## Important rule

If more than one phase fits the available information, B-Atlas returns the phase as ambiguous. It does not guess.

That means a 1973 Grand Banks with unknown construction remains a candidate rather than being excluded by a guessed wood/fiberglass value.
