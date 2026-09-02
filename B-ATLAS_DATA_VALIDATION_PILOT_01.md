# B-Atlas Data Validation Pilot 01

**Release:** v6.29.0  
**Schema:** Canonical Schema v1.3 — Global Power + Sail Ready  
**Models:** 6 live models + 1 non-public sail schema fixture

## Purpose

This batch validates the *migration process*, not just individual specifications. It deliberately includes models with conflicting sources, production-year changes, naming problems and configuration variability.

## Pilot models

| Model | Result | Key finding |
|---|---|---|
| Nimble Wanderer | Canonicalized | Motorsailer/power variability is real; separate shower and skeg-supported rudder are supported. |
| Albin 27 Family Cruiser | Canonicalized with conflict | Stock evidence supports a wet head, not a dedicated separate shower stall. |
| Grand Banks 32 Sedan | Canonicalized with year variation | Wood/fiberglass construction changes during production, so one hull-material value would be misleading. |
| Camano 28/31 Troll | Canonicalized with era variation | Handbook proves 28→31 naming history and explicit US-gallon capacities, but tankage changes by era. |
| Cape Dory 28 Flybridge Cruiser | Canonicalized with conflict | Duplicate title repaired; published draft figures conflict, so canonical Draft remains unresolved. |
| Marine Trader 36 Double Cabin | Canonicalized at moderate confidence | Duplicate title repaired; representative dimensions corrected; single/twin engines prevent a universal EngineCount. |

## Data-health rules confirmed

1. **A canonical scalar is not mandatory.** If a specification genuinely varies by year/configuration, the evidence layer can hold multiple assertions while the top-level canonical value remains unset.
2. **Do not manufacture precision.** A 40–45 gal source is not stored as 42.5 gal.
3. **Do not guess gallon type.** Only explicitly identified US/Imperial gallons are converted to litres.
4. **Community submissions are evidence, not truth.** The Albin shower test illustrates why moderation must validate contributions against stronger sources.
5. **Legacy compatibility can coexist with canonical migration.** Verified legacy fields may be corrected during the transition so older UI remains coherent.
6. **Model identity cleanup is part of validation.** Duplicate title structures were repaired for Cape Dory 28 Flybridge Cruiser and Marine Trader 36 Double Cabin.
7. **Sail compatibility is proven without polluting the live dataset.** A Cape Dory 28 sailboat fixture exercises ballast, sail area, mast height and sail classifications.

## Important Albin 27 correction

The recently tested contribution changing the Albin 27 Family Cruiser to a **separate shower stall** is contradicted by stronger evidence. Stock examples are described as an enclosed head/shower or wet-head arrangement; an owner-restoration source explicitly describes adding a standalone shower as a modification.

The canonical pilot value is therefore:

`ShowerTypeCode = shower.wet_head`

If the incorrect community correction is still published in the shared overlay, it should be corrected/rejected in Moderator so that it does not override the validated static value.

## What this pilot intentionally did not do

- No automatic conversion of all 253 models.
- No inference of unknown rudder, keel, tankage or headroom values.
- No broad sailboat expansion of the public model list.
- No change to Preference Match percentages.
- No claim that one model-wide tank capacity applies when documented production changes exist.

## Recommended next phase

Proceed in controlled manufacturer/model batches using this same workflow:
1. identity;
2. objective dimensions;
3. propulsion;
4. hull/appendages;
5. accommodation;
6. normalized classifications;
7. evidence/conflicts;
8. only then derived preference characteristics.

The next production batch should be **Albin + Nimble + Camano**, because the pilot has already established their source base and exposes several useful edge cases.
