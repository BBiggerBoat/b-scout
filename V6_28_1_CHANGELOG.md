# B-Atlas v6.28.1 — Multilingual & Unit-Neutral Schema Foundation

- Revised the canonical model schema to v1.1 before dataset migration.
- Canonical controlled values now use language-neutral codes and translation keys.
- Added locale architecture for English, French, German, Spanish and Portuguese without duplicating model data.
- Added canonical unit registry: m, kg, L, kW; knots and nautical miles remain marine-standard.
- Added explicit US-gallon and Imperial-gallon unit codes; ambiguous `gal` values are preserved rather than guessed.
- Added source-measurement provenance fields via `canonical-fact.schema.json`.
- Correction forms now collect a source unit for measurement corrections and display localized schema labels from the English catalog.
- Added runtime compatibility helpers so canonical SI fields can coexist with the legacy imperial dataset during validation.
- No bulk data conversion and no Preference Match formula changes.
