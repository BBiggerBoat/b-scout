# B-Atlas Specification Completion Batch 14 — v6.60.0

Baseline: v6.59.0 Specification Completion Batch 13

Manufacturers completed:
- SeaPiper
- Sealord
- Shannon
- Transpacific Marine

## Result

51 field-level source-backed corrections/promotions were applied across the final 4 canonical manufacturer records.

This closes the manufacturer-by-manufacturer source-backed specification completion sequence at **69 / 69 manufacturers**.

The final-tail batch emphasized:
- reconciling canonical and imperial shadow dimensions;
- promoting headroom and rudder architecture only when the source wording supports the taxonomy;
- normalizing tank capacities where units are explicit;
- clearing unsafe fixed air-draft or capacity values when equipment, year or refit materially changes the figure;
- representing multi-drive production histories as mixed rather than forcing one propulsion arrangement.

## SeaPiper 35

Primary evidence:
- SeaPiper factory 2020 specification: https://www.seapiper.com/wp-content/uploads/2020/07/SeaPiper-35-SPECIFICATION-9-2.pdf
- SeaPiper factory profile/dimension drawing: https://www.seapiper.com/wp-content/uploads/2021/09/SeaPiper-35-SPECIFICATION-9-5.pdf

Changes:
- Reconciled imperial shadows to factory 35 ft 11 in hull length, 33 ft 5 in LWL, 2 ft 11 in draft and 16,500 lb design displacement.
- Added 2.00 m / 6 ft 6 in centerline headroom in the principal interior spaces from the factory profile drawing.
- Classified the rudder as `rudder.skeg_hung`; the factory describes a heel bearing, pintle/gudgeon and a stainless skeg bar attached to the keel.
- Normalized factory 200 / 80 / 22 US gal fuel/water/waste to canonical litres.
- Cleared the fixed air-draft value. Factory revisions/configurations publish materially different mast-up and mast-down bridge-clearance values, so a single model-wide air draft would be unsafe for Plan.

## Sealord 34 Double Cabin Trawler

Primary evidence:
- Exact 1986 Sea Lord 34 Double Cabin Trawler: https://dailyboats.com/boat/309289-buy-sea-lord-34-double-cabin-trawler-for-sale
- Exact 1987 Sealord Tricabin: https://www.boatdealers.ca/boats-for-sale/542099/sealord-tricabin-hamilton-ontario

Changes:
- Normalized exact-model 757 / 378 / 94 L tankage, equivalent to approximately 200 / 100 / 25 US gal.
- Retained the directly documented 34 ft / 12 ft / 3 ft 6 in / 18,000 lb 1987 representative dimensional set.
- LWL, air draft, headroom and rudder subtype remain Unknown because surviving evidence does not safely establish them.
- The record remains provisional/low-confidence at the identity level because surviving factory/importer documentation is incomplete.

## Shannon 38 SRD / Defiance 38

Primary evidence:
- Shannon factory Defiance 38 specification: https://shannonyachts.com/shannon_defiance38_specs.html
- Power & Motoryacht 2005 test: https://powerandmotoryacht.com/boats/boat-tests/shannon-38-srd-0/
- Passagemaker SRD review: https://passagemaker.com/cruiser-reviews/shannon-srd/

Changes:
- Corrected stale imperial shadows to factory 40 ft 6 in LOA and 37 ft 7 in LWL.
- Corrected representative displacement shadow to factory 13,500 lb.
- Mechanical propulsion changed from shaft-only to `mechanical_propulsion.mixed`; Shannon documents conventional inboard shafts plus a surface-piercing-drive configuration.
- Normalized factory 290 US gal fuel and 80 US gal water to canonical litres.
- Removed unsupported fixed holding capacity; the factory specification confirms a holding tank but does not publish its capacity.
- Removed unsupported 8.2 ft air-draft shadow.
- Rudder subtype remains Unknown at model level because standard shaft boats use bronze rudders while surface-drive configuration changes the steering/appendage arrangement.

## Transpacific Marine Eagle 32

Primary evidence:
- Exact 1989 Eagle 32 specification: https://www.crusaderyachts.com/listings/1989-eagle-32-32-trawler-kindred-spirit/2788685/
- Exact 1992 Eagle 32: https://seattle.boatshed.com/eagle_32-boat-142700.html
- Exact 1987 Eagle 32: https://ca.boats.com/power-boats/1987-transpacific-marine-eagle-32-trawler-10144328/
- Exact 1986 Eagle 32: https://bronteshore.ca/current_listings/1986-eagle-marine-trawler/

Changes:
- Classified the rudder as `rudder.full_keel_attached`; an exact 1989 specification describes a full keel with an inboard keel-shoe-hung rudder.
- Confirmed 6 ft 3 in headroom from multiple exact-model examples.
- Cleared model-wide fuel/water/holding capacities because surviving boats vary materially by year/refit: approximately 150–180 gal fuel, 75–180 gal water and 20–25 gal holding.
- Retained the established 28 ft LWL and full-length protective keel.
- Published displacement varies materially across surviving examples; the existing 17,000 lb figure remains representative rather than invariant.

## Residual status after Batch 14

Global missing structured fields:
- LOA: 16
- LWL: 118
- Beam: 13
- Draft: 23
- Air draft: 115
- Displacement: 27
- Fuel: 2
- Mechanical propulsion: 1
- Hull behaviour: 1
- Keel configuration: 92
- Rudder type: 194
- Headroom: 224

The air-draft count increases by one because SeaPiper's fixed model-wide value was removed in favor of configuration-dependent uncertainty. The rudder and headroom counts improve because SeaPiper and Eagle 32 gained source-backed classifications/measurements.

## Manufacturer completion status

- **69 / 69 manufacturers complete**
- **0 unreviewed manufacturers**
- **0 unreviewed canonical models**

The manufacturer-by-manufacturer specification completion sequence is therefore closed. Remaining work should now be organized by **field and exception type**, not manufacturer.

## Release validation

- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Plan preference mappings: 28
- Cross-database QC: Passed
- Measurement normalization: Passed
