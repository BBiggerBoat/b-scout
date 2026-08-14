# Phase 8C-5 — Bayliner family + search/profile fixes

Base: user-supplied `public(6).zip`.

## Interface/search corrections
- Guided Maximum Beam now uses `step="any"` while retaining decimal input mode; the main Max Beam control matches it.
- Saved Models stage views detach the active Search Profile and clear visible search controls without deleting the saved profile.
- Added `Twin Engines` under Fuel & Propulsion in both Guided Search and direct filters.
- Added `EngineCount` to the model schema and all 287 records. Unknown remains `null` and does not eliminate a model. When Twin Engines is selected, only a known non-twin EngineCount is excluded.
- Twin-engine preference is saved/restored with Search Profiles and appears in the profile summary.

## Bayliner normalization
13 Bayliner records were normalized using model-specific technical/factory/market references. Identity, production periods, principal dimensions, model relationships, engine-count, Overviews, Suitability, Strengths, Trade-offs, Best For, Avoid If, Inspection Focus, Buyer Questions, Owner Actions, Model Variations, and scoped EvidenceSummary were reviewed.

Notable corrections include:
- 2452: 1992–2003 production and model-specific dimensions/capacities.
- 2855: explicitly treated as a multi-generation designation rather than one unchanged hull.
- 2859: 1993–2002, with corrected 27'9" LOA and capacities.
- later 3055: normalized to the 1999–2002 3055 designation before continuation as Bayliner 305.
- 3058: corrected to a flybridge/Command Bridge configuration.
- 3218/3270/3288: clarified 32xx family naming and twin-inboard arrangements.
- 3270/3288/3388/3788/3888: corrected from aft-cabin classification to mid-cabin/two-stateroom arrangements.
- 3258: factory-owner-manual dimensions/capacities incorporated.
- 3388 and 3788: gasoline/diesel configuration variation documented.
- 4087: factory-era dimensions/capacities and three-cabin cockpit-motoryacht role documented.

Legacy `CommonProblems` were not promoted into `KnownConcerns` without evidence meeting the established threshold.
