# B-Atlas Global Residual-Gap Audit — v6.57.0

**Baseline:** v6.56.0  
**Scope:** all 259 canonical models / 69 manufacturers  
**Purpose:** distinguish remaining research work from controlled uncertainty and diminishing-return fields.

## Executive conclusion

- 55 of 69 manufacturers have completed the source-backed specification-completion pass.
- 14 manufacturers remain unprocessed, but they contain only **16 models**.
- Those 16 models account for only **27** of the current formal core-field gaps.
- Most residual gaps are therefore in manufacturers already reviewed, especially LWL, rudder, keel, and air draft.
- **Headroom is the major process omission:** it was not included in the formal v6.45-v6.56 research queue. Only **30/259** models have structured canonical headroom; **229** remain missing.
- Tank-unit migration also remains incomplete despite progress in the batches.

## Formal core residuals after v6.56.0

| Field | Missing |
|---|---:|
| LOA | 16 |
| LWL | 118 |
| Beam | 13 |
| Draft | 22 |
| AirDraft | 117 |
| Displacement | 27 |
| FuelCode | 2 |
| MechanicalPropulsionCode | 1 |
| HullBehaviourCode | 0 |
| KeelConfigurationCode | 91 |
| RudderTypeCode | 197 |

**Total field-level residuals:** 604. This is not 604 models; one model can have several missing fields.

## Unreviewed manufacturer tail

| Manufacturer | Models | Core residuals |
|---|---:|---|
| Atlantic | 1 | LWL: 1, RudderTypeCode: 1 |
| Atlantic Boat | 1 | AirDraft: 1, Displacement: 1, LWL: 1, RudderTypeCode: 1 |
| Californian | 2 | AirDraft: 1, LWL: 1, RudderTypeCode: 2 |
| Gozzard | 1 | AirDraft: 1, LWL: 1, RudderTypeCode: 1 |
| Great Harbour | 2 | AirDraft: 2, RudderTypeCode: 2 |
| Luhrs | 1 | AirDraft: 1, RudderTypeCode: 1 |
| Nordhavn | 1 | AirDraft: 1, Draft: 1, RudderTypeCode: 1 |
| Oceania Yachts | 1 | AirDraft: 1, LWL: 1, RudderTypeCode: 1 |
| PDQ | 1 | AirDraft: 1, RudderTypeCode: 1 |
| Saga | 1 | AirDraft: 1, LWL: 1, RudderTypeCode: 1 |
| SeaPiper | 1 | RudderTypeCode: 1 |
| Sealord | 1 | AirDraft: 1, LWL: 1, RudderTypeCode: 1 |
| Shannon | 1 | AirDraft: 1, RudderTypeCode: 1 |
| Transpacific Marine | 1 | AirDraft: 1, RudderTypeCode: 1 |

These 14 manufacturers comprise **16 models** and can be completed efficiently in three small tail batches.

## What the large residual counts now mean

For the 55 manufacturers already reviewed, a blank no longer automatically means “we forgot to research it.” The completion batches repeatedly found three cases: (1) the builder/source does not publish the field, (2) the value varies by configuration or production phase, or (3) surviving sources conflict enough that Unknown is safer than a false canonical number. This is particularly common for LWL, air draft, rudder geometry and keel terminology.

### Headroom exception

Headroom is different. It was discussed as a target field but omitted from the formal research queue. It therefore should **not** be treated as an exhausted residual. A dedicated headroom pass is warranted, especially because Plan can use tallest-crew/headroom constraints.

## Tank-capacity unit status

### FuelCapacity
Missing values: **10**. Unit status distribution: None: 1, canonical_litres: 31, canonical_litres_assumed_us_gal: 7, conflicting_legacy_capacity_values: 22, legacy_gallon_basis_unverified: 94, unit_unverified: 100, unknown: 4.

### WaterCapacity
Missing values: **15**. Unit status distribution: None: 1, canonical_litres: 31, canonical_litres_assumed_us_gal: 7, conflicting_legacy_capacity_values: 23, legacy_gallon_basis_unverified: 87, unit_unverified: 103, unknown: 7.

### HoldingCapacity
Missing values: **34**. Unit status distribution: None: 1, canonical_litres: 22, canonical_litres_assumed_us_gal: 5, unit_unverified: 223, unknown: 8.

A large share of tankage remains `unit_unverified` or `legacy_gallon_basis_unverified`. These should be resolved opportunistically during remaining manufacturer/headroom work and later by a dedicated capacity provenance pass if needed.

## Recommended remaining work

1. **Tail Batch 12:** Atlantic, Atlantic Boat, Californian, Gozzard, Great Harbour.
2. **Tail Batch 13:** Luhrs, Nordhavn, Oceania Yachts, PDQ, Saga.
3. **Tail Batch 14:** SeaPiper, Sealord, Shannon, Transpacific Marine.
4. **Dedicated Headroom Completion Pass:** all 259 models, prioritizing boats where headroom is a meaningful Plan constraint.
5. **Plan-critical residual exception pass:** remaining LOA, beam, draft, fuel and mechanical-propulsion gaps/conflicts.
6. **Selective LWL / keel / rudder closeout:** do not chase universal completion. Add an explicit researched-but-not-published / configuration-dependent state where evidence has been exhausted.

## Stop condition

B-Atlas should consider specification completion mature when every manufacturer has been through the source-backed pass, every Plan-critical field is either known or explicitly classified as unresolved/configuration-dependent, and remaining descriptive fields can distinguish “not published after research” from “not yet researched.” A raw 100% non-null target would reduce data quality.
