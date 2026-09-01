# B-Atlas v6.28.2 — Canonical Schema v1.2 LOCKED

- Locked the canonical data architecture before model validation begins.
- Renamed canonical measurement fields to semantic IDs (`LOA`, `Beam`, `Draft`, etc.); canonical units now live in field metadata.
- Added `data/field-registry.json` as the authoritative field contract.
- Added explicit data classes: objective, normalized, derived and editorial.
- Added `data/preference-map.json` to separate preference questions from factual model fields.
- Added `data/derived-characteristics.json` for versioned derived rules.
- Separated selected canonical fact state from source assertions.
- Added `knowledge/data/evidence-assertion.schema.json`.
- Revised `canonical-fact.schema.json` to link selected values to evidence assertions.
- Retained language-neutral enum codes and multilingual display catalogs.
- Retained unit-neutral storage and source-measurement preservation.
- Updated compatibility adapters so legacy Imperial-heavy records remain readable during migration.
- No bulk conversion of the 253-model dataset was performed.
