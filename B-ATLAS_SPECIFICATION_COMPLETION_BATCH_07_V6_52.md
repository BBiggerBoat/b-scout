# B-Atlas Specification Completion Batch 07 — v6.52.0

## Scope

Manufacturers reviewed:

- Camano
- Seaway
- Sabre
- Hunt Yachts
- Nimbus

Baseline: v6.51.0.

Method: source-backed canonical promotion only. Conflicting, equipment-dependent, generation-dependent or weakly sourced values remain unknown. Canonical SI storage and legacy imperial shadow fields are reconciled where evidence is adequate.

## Results

53 field-level updates were made.

Global missing-field movement:

| Field | v6.51 | v6.52 |
|---|---:|---:|
| LOA | 15 | 15 |
| LWL | 124 | 121 |
| Beam | 14 | 14 |
| Draft | 23 | 23 |
| Air draft | 125 | 122 |
| Displacement | 31 | 29 |
| Fuel | 5 | 5 |
| Mechanical propulsion | 1 | 1 |
| Hull behaviour | 0 | 0 |
| Keel configuration | 91 | 91 |
| Rudder type | 204 | 202 |

## Camano

### Camano 28/31 Gnome

HMY identifies the Gnome as the same 28-foot hull as the Camano 28/31 Troll, without the flybridge. The shared hull's representative 26 ft 3 in LWL already existed as a legacy family value and is now promoted to canonical LWL.

Sources:
- https://www.hmy.com/yachting/powerboat-guide/camano/28-31-1990-2007
- https://www.camanotrawlers.com/camano_31_trawler-boat-310067.html

### Camano 28/31 Troll

The published 10,000 lb family weight is now promoted to canonical displacement.

Bridge-clearance evidence is not consistent enough for one model-wide number. Published examples differ by equipment and mast state, so the old 12.42 ft fallback was cleared instead of being allowed to display as a canonical fact.

### Camano 41

Model-specific documentation supports a 38 ft 7 in LWL, now canonicalized.

Air draft remains deliberately unresolved. Published material includes approximately 19 ft 6 in mast-up, 13 ft 6 in with mast/bimini lowered, and another brochure reporting 16 ft. Those are meaningful operational states, not rounding differences, so a single model-wide value would be misleading.

Sources:
- https://studylib.net/doc/18298312/a-printable-pdf-brochure-of-specifications-and-images
- https://midicanals.boatshed.com/camano_41_performance_trawler-boat-61600.html

## Hunt Yachts

### Surfhunter 29

The prior gasoline + shaft canonical description was too narrow.

Powerboat Guide documents a single Volvo diesel with jackshaft-to-drive-unit installation and notes an outboard version from 2015. Period specifications also document gasoline configurations. The canonical model is therefore now:

- Fuel: mixed gasoline/diesel
- Mechanical propulsion: mixed
- Rudder: no separate rudder for the documented external-drive/outboard configurations

Powerboat Guide also publishes:

- Air draft / clearance: 5 ft 9 in
- Weight: approximately 8,000 lb
- Fuel: 150 gal
- Water: 28 gal
- Waste: 15 gal

The previous 9,000 lb displacement and 10.5 ft air-draft shadows were corrected. Tankage is now canonical litres with preserved US-gallon source values.

Sources:
- https://www.hmy.com/yachting/powerboat-guide/hunt/29-surfhunter-2003-16
- https://www.sportfishingmag.com/boats/boat-reviews/hunt-surfhunter-29/

### Surfhunter 36 Coupe

Contemporary launch specifications explicitly document standard ZF pod drive plus optional conventional inboard installations. Mechanical propulsion is therefore canonicalized as mixed rather than pod-only.

Published 150 US gal fuel and 50 US gal total water capacity are normalized into canonical litres while preserving the original US-gallon values.

Source:
- https://www.yachtingmagazine.com/new-coupe-hunt/

Rudder subtype remains unresolved because the pod and conventional-inboard configurations do not share one steering architecture.

## Nimbus

### Nimbus 365 Coupé

Current Nimbus factory specifications provide explicit SI and US-gallon tank capacities:

- Fuel: 700 L / 184.9 US gal
- Fresh water: 270 L / 71.3 US gal
- Waste: 120 L / 31.7 US gal

The older gallon-like numbers in canonical capacity fields are replaced with factory litre values. The source gallon values are retained for imperial display.

Source:
- https://nimbusboats.com/en-us/boats/365-coupe/

The factory publishes hull length, not LWL. LWL therefore remains unknown rather than treating hull length as waterline length.

### Nimbus 3003

Surviving listings give useful but conflicting air-draft, draft and tankage values, and at least one LWL figure conflicts with other published hull-length information. No uncertain figure was promoted solely to reduce blanks.

Representative sources reviewed:
- https://dartmouth.boatshed.com/nimbus_3003-boat-150364.html
- https://www.boats.com/power-boats/1988-nimbus-3003-9876521/
- https://www.nya.co.uk/boats-for-sale/nimbus-3003/

## Sabre

### Sabre 34 Hard Top Express

Sabre's 2007 factory specification publishes:

- Air draft to top of radar mast: 12 ft 8 in
- Estimated full-load displacement: 20,000 lb
- Estimated dry displacement: 16,000 lb

The air draft is now canonical. The existing representative 20,000 lb displacement basis is promoted to canonical kilograms with its full-load provenance explicitly retained.

Source:
- https://sabreyachts.s3.us-east-2.amazonaws.com/sabre/wp-content/uploads/2012/09/12103435/34x-specs.pdf

Tankage is not flattened because factory heritage material shows capacity changes across the model run.

### Sabre 38 Salon Express

Source-backed additions/corrections:

- LWL: 34 ft 5 in
- Air draft with mast: 13 ft 3 in
- Rudder: no separate rudder
- Mechanical propulsion: mixed across the canonical production span

The original generation used Volvo IPS pod drives. The reintroduced 2026 model uses Volvo Penta DPI sterndrives. Both steer through the propulsion drive, so `rudder.none_external_drive` remains valid while a pod-only propulsion classification does not.

Factory tankage is normalized:

- Fuel: 300 US gal
- Water: 100 US gal
- Holding: 40 US gal

Sources:
- https://www.sabreyachts.com/yachts/38-salon-express
- https://powerandmotoryacht.com/boats/boat-tests/sabre-38-salon-express/

## Seaway

No weakly supported fields were promoted.

The current Eastern Boat Works Seaway 24 Sport is an outboard center-console/hardtop family. It is not sufficient evidence that B-Atlas's older `Seaway 24 Sport Trawler` identity shares the same production specifications. Using the current 24 Sport's 14 in draft, 2,850 lb dry weight and outboard propulsion to fill the older trawler record would collapse distinct products.

Sources reviewed:
- https://easternboats.com/boats/seaway-24-sport-center-console/
- https://soundingsonline.com/boats/new-boat-review-seaway-24-sport-cc/

The older Seaway 24 Sport Trawler and Seaway 28 Coastal Cruiser remain targeted research items.

## Validation

- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Cross-database QC: Passed
- Measurement normalization: Passed

Field-level provenance is stored in `data/specification-completion-batch-07-v6.52.json`.
