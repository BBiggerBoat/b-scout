# B-Atlas v6.28.0 — Canonical Schema Foundation

- Added `data/model-schema.json` as the canonical structured model-field registry.
- Added `B-ATLAS_CANONICAL_MODEL_SCHEMA_V1.md` audit and migration plan.
- Expanded Correct B-Atlas Information so every structured specification / preference field has an explicit selection.
- Correction input type now follows the field: number, integer, yes/no/unknown, controlled vocabulary, or text.
- Added dedicated structured fields for rudder type, keel configuration, running-gear protection, hull material, steering, propeller count and missing Plan-preference characteristics.
- Existing legacy duplicate fields remain readable; new corrections target canonical field names.
- Added canonical fields to feature matching as fallbacks without changing the Preference Match percentage formula.
- Updated contribution copy to reflect the now-live shared moderation service.
- No bulk model-data migration or automatic inference was performed.
