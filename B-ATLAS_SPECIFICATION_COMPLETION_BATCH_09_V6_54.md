# B-Atlas Specification Completion Batch 09 — v6.54.0

## Scope

Manufacturers reviewed:

- Gulfstar
- Greenline
- Endeavour
- Universal
- Sisu

Baseline: v6.53.0.

Method: source-backed canonical promotion only. Unsupported legacy shadows are removed rather than treated as facts. Canonical SI storage is used for dimensions and verified tank capacities; source US-gallon values are retained for imperial display. Production-, load-, equipment- and semi-custom variation remains explicit.

## Results

111 field-level updates were made. A large share are tank-unit/provenance normalization and legacy-shadow reconciliation rather than new model facts.

Global missing-field movement:

| Field | v6.53 | v6.54 |
|---|---:|---:|
| LOA | 15 | 15 |
| LWL | 119 | 120 |
| Beam | 14 | 14 |
| Draft | 23 | 23 |
| Air draft | 121 | 119 |
| Displacement | 29 | 28 |
| Fuel | 4 | 2 |
| Mechanical propulsion | 1 | 1 |
| Hull behaviour | 0 | 0 |
| Keel configuration | 91 | 91 |
| Rudder type | 202 | 201 |

The LWL gap deliberately increased by one: unsupported Greenline 33/39 LWL values were removed while a verified Universal 40 LWL was added. Accuracy takes precedence over apparent completion.

## Gulfstar

Model-specific Powerboat Guide data were used to reconcile imperial shadows and tank units.

### Gulfstar 36 Trawler
- LWL shadow corrected to 31 ft.
- Air-draft shadow corrected to 12 ft.
- Fuel 250 US gal -> 946.35 L canonical.
- Water 100 US gal -> 378.54 L canonical.

Source: https://www.hmy.com/yachting/powerboat-guide/gulfstar/36-trawler-1972-76

### Gulfstar 43 Trawler
- LWL shadow corrected to 39 ft 2 in.
- Air-draft shadow corrected to 12 ft.
- Fuel 300 US gal -> 1,135.62 L canonical.
- Water 130 US gal -> 492.10 L canonical.

Source: https://www.hmy.com/yachting/powerboat-guide/gulfstar/43-trawler-1972-77

### Gulfstar 44 Motor Cruiser
- Unsupported inherited 40 ft LWL shadow cleared.
- Fuel 500 US gal -> 1,892.71 L canonical.
- Water 250 US gal -> 946.35 L canonical.
- Holding 40 US gal -> 151.42 L canonical.

Source: https://www.hmy.com/yachting/powerboat-guide/gulfstar/44-motor-cruiser-1978-80

### Gulfstar 49 Motor Yacht
- LWL shadow corrected to 44 ft 4 in.
- Air-draft shadow corrected to 17 ft.
- Fuel 675 US gal -> 2,555.15 L canonical.
- Water 370 US gal -> 1,400.60 L canonical.

Source: https://www.hmy.com/yachting/powerboat-guide/gulfstar/49-motor-yacht-1984-87

## Greenline

Greenline records contained a unit-migration defect: gallon-equivalent values were sitting in fields intended to hold canonical litres.

### Greenline 33
- Fuel now canonicalized as diesel for Plan; legacy label clarified as Diesel / Electric Hybrid.
- Air draft corrected to 2.54 m / 8.33 ft from published Greenline specification.
- Unsupported 9.85 m / 32.1 ft LWL removed; reviewed manufacturer/technical literature does not identify it as LWL.
- Fuel corrected from 132 to 500 L.
- Water corrected from 80 to 300 L.
- Holding corrected from 17 to 63 L.
- Published gallon equivalents retained separately for imperial display.

Sources:
- https://www.greenline.yachtos.lt/en/33-english/
- https://nova-yachting.nl/sites/default/files/Catalogue%20Greenline%20English_0.pdf

### Greenline 39
- Fuel now canonicalized as diesel for Plan; hybrid assistance remains represented in the descriptive propulsion label.
- Unsupported inherited 11.4 m LWL removed.
- Fuel corrected from 185 to 700 L.
- Water corrected from 105 to 400 L.
- Holding corrected from 21 to 80 L.

Sources:
- https://www.greenlinehybrid.com/dflip/Brochure_Final_2024.pdf
- https://www.yachtsalesinternational.com/models/greenline-39/

## Endeavour

### Endeavour TrawlerCat 36
Powerboat Guide publishes 36 ft LOA, 34 ft 6 in LWL, 15 ft beam, 2 ft 10 in draft, 16,000 lb weight, 14 ft clearance, 300 gal fuel, 90 gal water and 30 gal waste.

Changes:
- Added canonical 14 ft / 4.2672 m air draft.
- Verified tankage as US gallons and normalized to litres: 1,135.62 / 340.69 / 113.56 L.

Source: https://www.hmy.com/yachting/powerboat-guide/endeavour/trawlercat-36-1998-2005

### Endeavour 44 TrawlerCat
- HMY lists clearance as NA; inherited 14 ft air-draft shadow cleared.
- 500 / 115 / 50 US gal tankage verified and normalized to 1,892.71 / 435.32 / 189.27 L.

Source: https://www.hmy.com/yachting/powerboat-guide/endeavour/44-trawlercat-2001-06

## Universal

### Universal 36 Tri-Cabin
Exact-model 1978 documentation supports approximately 36 ft LOA, 36 ft reported LWL, 12 ft 8 in beam, 3 ft 10 in draft, 24,504 lb displacement, 200 US gal fuel and 150 US gal water.

Changes:
- Stale 18,000/19,000 lb displacement shadows aligned to 24,504 lb.
- Unsupported 14 ft air-draft fallback cleared.
- Fuel and water normalized to 757.08 L and 567.81 L.

Source: https://seattle.boatshed.com/universal_36_trawler-boat-337526.html

### Universal 40 Europa
A model-specific 1977 boat provides unusually strong configuration detail:
- 40 ft LOA
- 36 ft LWL
- 13 ft 8 in beam
- 4 ft 8 in draft
- 17,000 lb displacement
- 17 ft bridge clearance
- 320 / 200 / 50 US gal fuel/water/holding
- direct shaft drive
- explicitly skeg-hung rudder

Changes:
- Added canonical LWL, air draft and displacement.
- Corrected stale air-draft/displacement shadows.
- Added `rudder.skeg_hung`.
- Normalized tankage to 1,211.33 / 757.08 / 189.27 L.

Source: https://www.boats.com/power-boats/1977-universal-marine-europa-10104045/

## Sisu

Sisu hulls were frequently semi-custom finished. This batch therefore removes unsupported model-wide values rather than converting every surviving-boat figure into a factory specification.

### Sisu 22
A Royal Lowell design-history source identifies the original Sisu/Lowell 22 hull at approximately 21 ft 9 in x 7 ft 10 in x 1 ft 9 in.

Changes:
- Imperial LOA shadow aligned to 21 ft 9 in while retaining the 22 model identity.
- Draft corrected to 1 ft 9 in / 0.5334 m.
- Unsupported LWL, air-draft and displacement shadows cleared.
- Unverified model-wide fuel/water/holding values cleared because finish-specific tankage cannot safely be generalized.

Source: https://midcoastyacht.com/history-of-lobster-boat-design/

### Sisu 26
A model-specific 1983 example supports 25.92 ft LOA, 9.67 ft beam, 2.75 ft draft, 7,200 lb dry weight, 80 US gal fuel and 10 US gal water.

Changes:
- LOA shadow corrected to 25.92 ft.
- Displacement shadow corrected from 5,500 to 7,200 lb.
- Unsupported LWL and air-draft shadows cleared.
- Fuel/water normalized to 302.83 L / 37.85 L for the representative documented configuration.
- Unverified 15-unit holding-tank value cleared because semi-custom finishing prevents safe model-wide use.

Sources:
- https://www.boattrader.com/boat/1983-sisu-26-10046917/
- https://marinesource.com/boat/sisu-26-1983-kemah-256d7c989-for-sale

## SEO/static page regeneration

All 259 model pages, 48 manufacturer pages, 23 constraint pages, 15 comparison pages and the sitemap were regenerated from the corrected canonical data. This prevents stale static pages from retaining removed LWL values or pre-normalization measurements.

## Validation

- Cross-database QC: Passed
- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Preference mappings: 28
- Measurement normalization: Passed

Updated research queue: `data/specification-research-queue-v6.54.json`.
