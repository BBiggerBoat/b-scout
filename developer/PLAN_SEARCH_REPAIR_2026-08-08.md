# Plan / Search Repair — 2026-08-08

Repairs:
- Search result rendering no longer creates Saved Model relationships.
- A model is saved only by an explicit status/notebook/listing action.
- Added a visible Not Saved state.
- Opening Plan starts with clean search controls so stale hidden filters do not contaminate guided results.
- Boat family filtering now checks normalized classification fields (`BoatFamily`, `NormalizedStyle`, `Style`, `Configuration`) rather than relying on one field.
- Hull/style filters prefer normalized fields.
- Unknown classification remains eligible.
- Maximum length remains a true maximum against `LOA_ft`; unknown LOA remains eligible.
- Compact-density CSS substantially reduces desktop scale.
- Guided Plan screens are compressed to fit within a normal desktop viewport where practical.
- Header uses the supplied B-Atlas logo.
- Seaway 24 Sport Trawler duplicate display variant removed.
