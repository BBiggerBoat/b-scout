# B-Atlas Specification Completion Batch 02 — v6.47.0

## Scope

Target manufacturers: Cutwater, C-Dory, Carver, Marine Trader, and Duffy.

This pass continued the source-backed canonical specification completion work begun in v6.46.0. It prioritized Plan-critical dimensions and propulsion/hull facts, while preserving unknown or production-phase-variable values.

## Results

- Canonical updates: **66**
- Manufacturers: **5**
- Cross-model policy correction: Cutwater C-32 CB corrected from diesel/shaft to gasoline/twin-outboard and current factory dimensions.
- Production-phase protection: Cutwater C-30 S LOA remains unresolved at model level because documented model years differ (34 ft 4 in vs 35 ft 8 in).
- Rudder semantics: outboard boats use `rudder.none_external_drive`; conventional inboard rudder type remains unknown unless explicitly documented.

### Updates by manufacturer
- C-Dory: **17**
- Carver: **8**
- Cutwater: **32**
- Duffy: **6**
- Marine Trader: **3**

### Updates by field
- AirDraft: **13**
- Beam: **8**
- Displacement: **9**
- Draft: **8**
- FirstYear: **1**
- FuelCode: **1**
- HullBehaviourCode: **5**
- KeelConfigurationCode: **2**
- LOA: **7**
- LWL: **3**
- MechanicalPropulsionCode: **1**
- RudderTypeCode: **8**

## Remaining global missing counts
- LOA: **18**
- LWL: **131**
- Beam: **16**
- Draft: **25**
- AirDraft: **144**
- Displacement: **34**
- FuelCode: **6**
- MechanicalPropulsionCode: **2**
- HullBehaviourCode: **0**
- KeelConfigurationCode: **94**
- RudderTypeCode: **217**

## Important evidence decisions

1. **Cutwater model numbers are not reliable LOA substitutes.** Rigged/factory overall length was used where published.
2. **Cutwater C-32 CB was materially misclassified.** Factory and 2021+ evidence establish twin gasoline outboards and a stepped deep-V planing hull.
3. **C-Dory LWL and air draft remain largely unknown.** Factory pages publish LOA/beam/draft/weight but generally not LWL or bridge clearance; trailer height was not substituted for air draft.
4. **Carver clearance was promoted where HMY publishes it.** LWL was not invented for models where the guide omits it.
5. **Marine Trader clearance is often NA in source material.** Those fields remain unknown rather than inheriting unsourced legacy estimates.
6. **Duffy is semi-custom.** Model-wide values were promoted only from sufficiently specific hull/model evidence; Duffy 37 received an explicit skeg-hung rudder classification from a model-specific description.

## Release gate

Run `npm run test:cross-database-qc` and `npm run test:measurements` after regeneration.
