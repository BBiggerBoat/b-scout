# B-Atlas v6.44.0 — Cross-Database Quality-Control Pass

- Synchronized all 259 canonical model IDs across `boatmodels.json`, the identity registry and model-search aliases.
- Removed three duplicate BoatModelID collisions from the identity registry and added eight missing registry identities created by prior validation splits.
- Added the six missing search-alias records created by later canonical identity splits.
- Regenerated crawlable model/search pages with collision-safe canonical slugs; all 259 canonical IDs now have a public model page.
- Corrected stale Krogen 44 Classic identity text left behind by the 44 / 44 AE split.
- Changed Plan hard-filter evaluation so canonical fields take precedence over stale legacy fields for dimensions, fuel, propulsion, hull behaviour, boat family and side decks.
- Changed Plan feature matching to read canonical fields for aft cabin, wide side decks, long keel and separate shower, while preserving legacy fallbacks.
- Changed recommendation fuel/hull evaluators to prefer canonical codes rather than legacy `Fuel` / `HullType` values.
- Added an automated cross-database QC test verifying registry/alias synchronization, canonical Plan mappings, canonical-over-legacy precedence, and the rule that unknown data does not eliminate a model.
- Confirmed the Sea Sport 27 combined Seamaster / Navigator / Pilot record remains a real unresolved identity-split candidate rather than silently cloning one accommodation record across three marketed layouts.
- Flagged fuel/water/holding capacity as a controlled mixed-unit migration issue: legacy gallon values and newer SI canonical values coexist and are not mass-converted without evidence.
- No Preference Match percentage formula changes.
