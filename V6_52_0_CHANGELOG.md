# v6.52.0 Changelog

## Specification Completion Batch 07

Baseline: v6.51.0

Manufacturers reviewed:
- Camano
- Seaway
- Sabre
- Hunt Yachts
- Nimbus

### Data changes

- Applied 53 field-level source-backed updates.
- Promoted Camano shared-hull and Camano 41 LWL values where supported.
- Removed unsafe Camano air-draft shadow fallbacks where published bridge-clearance values are equipment-state dependent.
- Corrected Hunt Surfhunter 29 fuel and propulsion from overly narrow gasoline/shaft classifications to mixed configurations.
- Corrected Hunt 29 air draft and representative displacement; normalized its documented tank capacities.
- Corrected Hunt Surfhunter 36 Coupe mechanical propulsion to mixed pod/conventional-inboard.
- Normalized Nimbus 365 Coupé factory tank capacities to canonical litres with preserved US-gallon values.
- Added factory air draft and representative full-load displacement basis for Sabre 34 Hard Top Express.
- Added Sabre 38 Salon Express LWL and air draft; updated production-span propulsion to mixed and rudder to no separate external rudder.
- Normalized Sabre 38 factory tankage to canonical litres.
- Deliberately left the older Seaway 24 Sport Trawler unresolved rather than contaminating it with specifications from the current Seaway 24 Sport center-console family.

### Research queue

- Regenerated as `data/specification-research-queue-v6.52.json`.
- LWL missing: 124 -> 121
- Air draft missing: 125 -> 122
- Displacement missing: 31 -> 29
- Rudder type missing: 204 -> 202

### Validation

- Cross-database QC: Passed (259 canonical models / 259 registry identities / 259 search aliases)
- Measurement-normalization tests: Passed
