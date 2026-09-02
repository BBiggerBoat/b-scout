# B-Atlas Plan-Critical Exception Closeout — v6.62.0

## Scope
Closes the post-manufacturer Plan-critical exception work for LOA, Beam, Draft, Air Draft, Fuel, Mechanical Propulsion and Hull Behaviour.

## Core rule enforced
**Known undesirable information = eliminate. Missing or configuration-dependent information = keep, with reduced confidence.**

## Data closeout
- FuelCode missing: **0**
- MechanicalPropulsionCode missing: **0**
- HullBehaviourCode missing: **0** (configuration-dependent/unknown sentinel values remain non-eliminating)
- LOA researched unknown: **16**
- Beam researched unknown: **13**
- Draft researched unknown: **23**
- Air Draft researched unknown: **115**

All surviving numeric Plan gaps are now explicit canonical nulls with `PlanCriticalStatus.<Field> = researched_unknown`. This prevents stale legacy shadows from silently re-entering filtering.

## Categorical resolutions
- **Seaway 24 Sport Trawler**: `fuel.mixed` and `mechanical_propulsion.mixed`. Mixed values are non-eliminating at model level because a compatible production/configuration may exist.
- **Tollycraft 37 Sedan**: `fuel.mixed`. Surviving examples document both gasoline and diesel configurations/repowers; model-level Plan filtering must not eliminate the model based on fuel alone.
- **Saga 26 HT** remains `hull_behaviour.unknown` / configuration-dependent; Plan treats this as uncertainty rather than a mismatch.

## Engine corrections
1. Canonical numeric `null` now blocks legacy fallback conversion.
2. Main Plan filter uses canonical dimensions without `?? legacy` re-entry.
3. Route compatibility uses canonical dimensions.
4. Mission hard constraints use canonical dimensions.
5. Mixed/unknown/configuration-dependent categorical values are retained rather than excluded.
6. Recommendation evaluation treats uncertain categorical values as Unknown/confidence reduction.

## Outcome
The Plan-critical closeout is complete. Remaining numeric gaps are no longer unsafe filtering gaps; they are explicit researched unknowns. Future contributions can replace nulls with verified canonical values without changing Plan logic.
