# B-Atlas Specification Completion Batch 08 — v6.53.0

## Scope

Manufacturers reviewed:

- Monk
- Ocean Alexander
- Trojan
- Tollycraft
- Uniflite

Baseline: v6.52.0.

Method: source-backed canonical promotion only. Conflicting, equipment-dependent, production-dependent or weakly sourced values remain unknown. Canonical SI storage is used for measurements and verified tank capacities, with original US-gallon values preserved for imperial display.

## Results

39 field-level updates were made.

Global missing-field movement:

| Field | v6.52 | v6.53 |
|---|---:|---:|
| LOA | 15 | 15 |
| LWL | 121 | 119 |
| Beam | 14 | 14 |
| Draft | 23 | 23 |
| Air draft | 122 | 121 |
| Displacement | 29 | 29 |
| Fuel | 5 | 4 |
| Mechanical propulsion | 1 | 1 |
| Hull behaviour | 0 | 0 |
| Keel configuration | 91 | 91 |
| Rudder type | 202 | 202 |

## Monk 36 Trawler

Powerboat Guide publishes 36 ft LOA, 33 ft LWL, 13 ft beam, 4 ft draft, 17 ft 11 in clearance, 18,000 lb displacement, 320 gal fuel, 120 gal water and 45 gal waste. A current Canadian Monk 36 record explicitly identifies 320 and 120 as US gallons.

Tankage is now stored canonically in litres while preserving the source gallon values:

- Fuel: 320 US gal / 1,211.33 L
- Water: 120 US gal / 454.25 L
- Holding: representative published 45 US gal / 170.34 L

Individual boats can have replacement or altered holding tanks; a current Canadian example documents 40 US gal. The model-guide 45-gal figure remains the representative published model specification.

Rudder subtype remains unresolved. Sources establish a full keel and protected rudder/propeller, but do not establish a supported B-Atlas subtype such as skeg-hung.

Sources:
- https://www.hmy.com/yachting/powerboat-guide/monk/36-trawler-1982-2007
- https://www.boatdealers.ca/boats-for-sale/675981/monk-monk-36-belleville-ontario
- https://soundingsonline.com/boats/monk-36-trawler/

## Ocean Alexander 39 Sedan

This record remains deliberately conservative because exact 1986 boats conflict materially:

- 39 ft deck/hull length versus about 42 ft 6 in–42 ft 8 in overall with extensions
- LWL reported around 36 ft on one boat and 38.67 ft on another
- displacement reported around 22,500 lb, 23,004 lb and 38,000 lb
- tankage varies substantially among surviving examples
- one example reports 22 ft 6 in air draft while the inherited legacy shadow had 13.8 ft

Because Plan falls back to legacy fields when canonical LOA is absent, unsafe `LOA_ft`, `LengthFt`, `LWL_ft`, `AirDraft_ft`, `Displacement_lb` and compatibility `DisplacementLb` shadows were cleared. This ensures genuine uncertainty remains unknown rather than silently becoming a hard Plan filter.

The already-canonical beam and draft remain tied to the better-documented 39-on-deck example.

Sources:
- https://www.boats.com/power-boats/1986-ocean-alexander-39-sedan-10098720/
- https://seattle.boatshed.com/ocean_alexander_39_sedan-boat-335213.html
- https://marinesource.com/boat/ocean-alexander-39-sedan-1986-bellingham-2461bed91-for-sale

## Tollycraft 34 Sport Sedan

Two model-specific Boatshed records publish 31 ft 4 in LWL. That value is now canonical and replaces the unsupported 31.8 ft legacy shadow.

Powerboat Guide explicitly states that several engine choices were offered, including diesels. The model is therefore now `fuel.mixed` rather than leaving the Plan-critical canonical fuel field unknown.

Published water capacity is 116 US gal and is now normalized to 439.10 L canonical storage.

Fuel capacity remains production-dependent: Powerboat Guide publishes 200/296 gal and notes that fuel and water capacity changed beginning in 1988. B-Atlas does not flatten that phase change into a single model-wide canonical fuel-tank number.

Sources:
- https://www.hmy.com/yachting/powerboat-guide/tollycraft/34-sport-sedan-1987-93
- https://seattle.boatshed.com/tollycraft_34_sport_sedan-boat-253225.html
- https://seattle.boatshed.com/tollycraft_34_sport_sedan-boat-250737.html

## Tollycraft 37 Sedan

Multiple model-specific records support a 37 ft 4 in hull/overall figure before owner-added platforms/extensions, approximately 3 ft draft, approximately 12 ft 6 in bridge clearance, and 300 US gal fuel.

Legacy shadow fields were aligned to the canonical measurements so unit/display fallbacks cannot surface 37.0 ft length, 3.17 ft draft or 13.2 ft clearance while canonical values say otherwise.

Fuel capacity is now normalized to 1,135.62 L with 300 US gal preserved.

Water and holding capacities remain unresolved model-wide because surviving boats report materially different values (roughly 120–140 gal water and 20–40+ gal holding). LWL also remains unknown because no sufficiently authoritative production-wide value was found.

Sources:
- https://www.boattrader.com/boat/1980-tollycraft-37-sedan-9807336/
- https://www.boats.com/power-boats/1978-tollycraft-37-sedan-10071940/
- https://s3.amazonaws.com/pop.web.assets/Listing-Brochures/Pop-Brochure-167248.pdf

## Trojan F-36 Tri-Cabin

Powerboat Guide documents:

- 36 ft length
- 13 ft beam
- 2 ft 11 in draft
- 17,500 lb weight
- 12 ft 3 in clearance
- 150/220/300 gal fuel depending configuration/era
- 65/85 gal water
- 40 gal waste

The model was previously too narrowly canonicalized as gasoline + shaft.

Powerboat Guide states that diesels were available as factory options, although most boats were gasoline-powered. It also documents V-drives on the Sea Raider and some early Tri-Cabins, with direct-drive installations common later.

Canonical Plan fields are now:

- Fuel: Mixed
- Mechanical propulsion: Mixed
- Legacy propulsion label: Shaft/V-Drive
- Air draft: 12 ft 3 in / 3.7338 m

The 40 US gal holding capacity is now normalized to 151.42 L. Fuel and water remain variable rather than being flattened to one production-wide capacity.

Sources:
- https://www.hmy.com/yachting/powerboat-guide/trojan/36-tri-cabin-1970-87
- https://www.boatdealers.ca/boats-for-sale/672650/trojan-36-tri-cabin-midland-ontario

## Uniflite 36 Double Cabin

Powerboat Guide states that the 36 Sport Sedan uses the same solid-fiberglass hull as the 36 Double Cabin. A model-specific 36 Sedan record publishes 33 ft LWL, which is now used as the shared-hull representative LWL instead of the unsupported 33.2 ft shadow.

Powerboat Guide also states that gasoline engines were standard but diesels were available. Fuel is therefore now canonicalized as Mixed so Plan does not falsely eliminate legitimate factory diesel examples.

Water capacity is published at 100 US gal and is now stored as 378.54 L canonically.

Fuel remains 200 gal standard / 300 gal optional, so a single canonical fuel-tank value is not imposed.

The shared hull is described as having a shallow keel for stability. B-Atlas currently lacks a precise canonical taxonomy value for a shallow directional keel, so this is intentionally not forced into `full_long`, `protective`, or `partial_skeg`.

Sources:
- https://www.hmy.com/yachting/powerboat-guide/uniflite/36-double-cabin-1972-84
- https://www.hmy.com/yachting/powerboat-guide/uniflite/36-sport-sedan-1970-79
- https://seattle.boatshed.com/uniflite_36_sedan-boat-160556.html

## Validation

- Cross-database QC: Passed
- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Measurement normalization: Passed

The updated research queue is `data/specification-research-queue-v6.53.json`.
