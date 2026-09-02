# v6.53.0 Changelog

## Specification Completion Batch 08

Baseline: v6.52.0

Manufacturers reviewed:
- Monk
- Ocean Alexander
- Trojan
- Tollycraft
- Uniflite

### Data changes

- Applied 39 source-backed field-level updates.
- Normalized Monk 36 fuel, water and representative holding capacities to canonical litres with preserved US-gallon values.
- Cleared unsafe Ocean Alexander 39 legacy LOA/LWL/air-draft/displacement fallbacks because exact-model evidence conflicts materially.
- Added Tollycraft 34 Sport Sedan 31 ft 4 in LWL and promoted fuel to mixed gasoline/diesel.
- Normalized Tollycraft 34 water capacity and Tollycraft 37 fuel capacity where US-gallon basis is sufficiently supported.
- Reconciled Tollycraft 37 legacy length, draft and air-draft shadows to canonical values.
- Corrected Trojan F-36 Tri-Cabin fuel from gasoline-only to mixed and propulsion from shaft-only to mixed shaft/V-drive history.
- Added Trojan F-36 12 ft 3 in air draft and normalized documented waste capacity.
- Added Uniflite 36 Double Cabin shared-hull 33 ft LWL, promoted fuel to mixed gasoline/diesel, and normalized 100 US gal water capacity.
- Preserved unresolved keel/rudder/LWL/tank fields where the source evidence does not support one safe canonical value.

### Research queue

Regenerated as `data/specification-research-queue-v6.53.json`.

- LWL missing: 121 -> 119
- Air draft missing: 122 -> 121
- Fuel missing: 5 -> 4
- Other primary missing counts unchanged.

### Validation

- Cross-database QC: Passed (259 canonical models / 259 registry identities / 259 search aliases)
- Measurement normalization tests: Passed
