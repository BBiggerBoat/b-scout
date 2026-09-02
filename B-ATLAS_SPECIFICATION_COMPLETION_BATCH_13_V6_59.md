# B-Atlas Specification Completion Batch 13 — v6.59.0

Baseline: v6.58.0 Specification Completion Batch 12

Manufacturers completed:
- Luhrs
- Nordhavn
- Oceania Yachts
- PDQ
- Saga

## Result

71 field-level source-backed corrections/promotions were applied across 5 canonical model records.

The batch emphasized:
- correcting stale imperial shadow values;
- normalizing tankage only when the source unit basis is defensible;
- clearing unsupported LWL, air-draft and draft fallbacks;
- promoting model-specific headroom where published;
- representing configuration-dependent propulsion/hull behavior as Mixed or Unknown so Plan does not falsely eliminate a valid variant.

## Luhrs 30 Alura

Primary evidence:
- HMY Powerboat Guide: https://www.hmy.com/yachting/powerboat-guide/luhrs/30-alura-1987-90
- Exact 1988 model bridge-clearance example: https://www.boattrader.com/boat/1988-luhrs-alura-10114290/

Changes:
- Corrected LWL shadow from 27 ft to HMY's 28 ft.
- Added representative 11 ft / 3.3528 m bridge clearance from an exact-model example.
- Added 6 ft 4 in imperial headroom shadow to match the existing canonical metric value.
- Corrected stale Propulsion shadow from Stern Drive to Shaft and stale KeelType from Modified V to Full Length.
- Normalized 196 / 38 / 15 US gal fuel/water/waste to canonical litres.
- Rudder attachment subtype remains Unknown; full-keel construction alone does not establish a safe rudder subtype.

## Nordhavn 40

Primary evidence:
- Nordhavn factory retired-model specification: https://nordhavn.com/nordhavn-yacht-models/retired-models/n40/
- Nordhavn Circumnavigator period specifications: https://nordhavn.com/wp-content/uploads/2021/02/circumnavigatorII.pdf
- Nordhavn accommodations archive: https://archive.nordhavn.com/atw/specs/accommodations.htm

Changes:
- Cleared fixed 5 ft 2 in draft shadow. Factory/period and representative-boat sources vary materially (about 4 ft 9 in to 5 ft 6 in depending on specification/loading), so canonical Draft remains Unknown.
- Cleared fixed 15.5 ft air-draft shadow. Published mast-up/lowered configurations vary materially; one model-wide routing height is unsafe.
- Added canonical main-saloon headroom at 6 ft 3 in / 1.905 m.
- Verified and normalized factory 920 / 220 / 68 US gal fuel/water/black-water tankage to canonical litres.
- Rudder subtype remains Unknown. Factory documents a rudder stock, backbone and carrier shoe, but the current taxonomy should not infer attachment geometry beyond the source wording.

## Oceania Yachts 36 Sedan

Primary evidence:
- Canadian Yachting September 1980 test: https://canadianboating.ca/boat-reviews/oceania-36-sedan/

Changes:
- Corrected LOA shadow to the published 38.5 ft overall figure; 35 ft 6 in is hull centerline length, not LOA.
- Cleared unsupported 33.4 ft LWL and 13.2 ft air-draft fallbacks.
- Reconciled beam shadow to the 12.5 ft specification-box value already used canonically; article narrative also reports 12 ft 2 in, retained as source variation.
- Corrected displacement shadow from 21,000 lb to published 19,000 lb.
- Corrected EngineConfiguration from Twin Inboard to single Ford Lehman 120 hp diesel and TypicalEngineID to Ford Lehman 120.
- Added published 40-gal holding-tank source value while retaining assumed-US-gallon status because the 1980 Canadian source does not explicitly state US vs Imperial gallon basis.
- Rudder subtype remains Unknown.

## PDQ 34 PowerCat

Primary evidence:
- HMY Powerboat Guide: https://www.hmy.com/yachting/powerboat-guide/pdq/32-34-power-catamaran-2000-07
- Exact 2004 model: https://www.boattrader.com/boat/2004-pdq-34-power-catamaran-10208873/
- Exact 2005 model: https://yachtr.com/34-pdq-2005-2798853/

Changes:
- Corrected imperial shadows to 34 ft 6 in LOA and 33 ft 11 in LWL.
- Added 12 ft 3 in / 3.7338 m air draft.
- Corrected displacement shadow to representative 12,000 lb.
- Added 6 ft 6 in / 1.9812 m cabin headroom from exact-model evidence.
- Classified RudderTypeCode as twin rudders. HMY explicitly describes protected props and rudders in the plural on this twin-shaft catamaran; attachment geometry is not inferred.
- Verified and normalized 184 US gal fuel and 80 US gal water to canonical litres.
- Holding capacity moved to Unknown/conflict status: reviewed sources report approximately 35, 38 and 45 US gal across exact-model boats and guides.

## Saga 26 HT

Primary evidence:
- Maringuiden model guide: https://www.maringuiden.se/batguiden/%3BbatID%3D304%26battypID%3D21
- Exact 1999 model: https://wales.boatshed.com/saga_26ht-boat-165654.html
- SVB owner/model reference: https://www.svb-marine.fr/ownersclub/44652

Changes:
- Cleared unsupported LWL and air-draft fallbacks.
- Moved Draft to Unknown/configuration-dependent; reviewed sources vary around 0.8-1.0 m and the model was offered in materially different underwater configurations.
- Corrected MechanicalPropulsionCode to Mixed: Saga documentation explicitly describes a semi-planing keel-and-rudder version and a full-planing V-bottom sterndrive version.
- Moved HullBehaviourCode to Unknown rather than force semi-displacement or planing across both versions. This is intentional Plan-safe behavior: unknown reduces confidence but does not eliminate either configuration.
- Cleared the single partial-skeg canonical keel classification because it does not apply to the sterndrive/V-bottom version.
- Added 1.85 m / 6.07 ft representative headroom from an exact 1999 model.
- Corrected fuel capacity from a gallon-equivalent-looking 52.8 stored in the litre field to documented 200 L, with computed US-gallon display equivalent.
- Water moved to conflict status because reviewed sources publish 95 L and 105 L.
- Holding capacity moved to Unknown; a 55 L exact-boat figure exists, but no reliable model-wide standard was established.

## Residual status after Batch 13

Global missing structured fields:
- LOA: 16
- LWL: 118
- Beam: 13
- Draft: 23
- Air draft: 114
- Displacement: 27
- Fuel: 2
- Mechanical propulsion: 1
- Hull behaviour: 1
- Keel configuration: 92
- Rudder type: 196
- Headroom: 225

The increases in Draft, Hull behaviour and Keel configuration are intentional accuracy corrections caused by the Saga 26 HT configuration split inside one marketed identity.

Manufacturer completion coverage:
- 65 / 69 manufacturers complete
- 4 manufacturers / 4 models remain

Remaining manufacturers:
SeaPiper, Sealord, Shannon, Transpacific Marine.

## Release validation

- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Plan preference mappings: 28
- Cross-database QC: Passed
- Measurement normalization: Passed
