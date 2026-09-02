# B-Atlas Specification Completion Batch 12 — v6.58.0

Baseline: v6.57.0 Global Residual-Gap Audit

Manufacturers completed:
- Atlantic
- Atlantic Boat
- Californian
- Gozzard
- Great Harbour

## Result

66 field-level source-backed corrections/promotions were applied across 7 canonical model records.

The batch emphasized:
- resolving stale imperial shadow values;
- converting verified US-gallon tankage into canonical litres while retaining source gallons;
- clearing unsupported LWL/air-draft/displacement fallbacks;
- preserving rudder subtype as Unknown where sources confirm a separate rudder but not its attachment geometry;
- preserving configuration-dependent air draft rather than forcing one number.

## Atlantic 37 Double Cabin

Primary evidence:
- HMY Powerboat Guide: https://www.hmy.com/yachting/powerboat-guide/atlantic/37-double-cabin-1982-92
- Prairie Boat Works archive: https://prairieboatworks.org/prairie-36-coastal-cruiser/

Changes:
- Corrected stale imperial air-draft shadow to 19 ft 9 in, matching the existing canonical 6.0198 m value.
- Added imperial headroom shadow at 6 ft 5 in.
- Cleared unsupported 34 ft legacy LWL fallback; LWL remains Unknown.
- Normalized standard tankage to canonical litres from 250 US gal fuel, 200 US gal water, 30 US gal waste.
- Corrected holding capacity from unsupported 40 to documented 30 US gal.
- Rudder subtype remains Unknown. Sources say the keel protects prop and rudder, but do not establish spade/skeg-hung/keel-attached geometry.

## Atlantic Boat Duffy 26

Primary evidence:
- Maine Boats Homes & Harbors: https://maineboats.com/print/issue-178/atlantic-boat-finds-niche-building-launches
- Exact 1996 Duffy 26 cruiser: https://www.marinesource.com/boat/duffy-hardtop-cruiser-1996-annapolis-253b61341-for-sale
- Exact 2001 Duffy 26: https://marinesource.com/boat/duffy-26-2001-jamestown-24fab9b09-for-sale

Changes:
- Cleared unsupported 24.5 ft LWL fallback.
- Cleared unsupported 8.5 ft air-draft fallback.
- Cleared unsupported 6,200 lb model-wide displacement shadow.
- Kept canonical displacement, LWL and air draft Unknown because the Duffy 26 is a semi-custom hull whose completed boats vary materially.
- Rudder subtype remains Unknown. Atlantic Boat documentation confirms a conventional rudder/steering arm arrangement, but not a reliable model-wide subtype.

## Californian 34 LRC

Primary evidence:
- HMY Powerboat Guide: https://www.hmy.com/yachting/powerboat-guide/californian/34-lrc-1977-85
- Exact 1982 model: https://marinesource.com/boat/californian-34-lrc-1982-st-clair-shores-24c8360c9-for-sale

Changes:
- Cleared unsupported 31.67 ft LWL fallback; HMY does not publish LWL.
- Corrected imperial air-draft shadow to 10 ft 8 in, matching canonical metric clearance.
- Normalized 250 / 75 / 30 US gal fuel/water/waste to canonical litres.
- Rudder subtype remains Unknown.

## Californian 38 LRC Sedan

Primary evidence:
- HMY Powerboat Guide: https://www.hmy.com/yachting/powerboat-guide/californian/38-lrc-sedan-1978-85

Changes:
- Corrected imperial LWL shadow to 36 ft 6 in, matching the canonical metric value.
- Cleared unsupported 14.5 ft air-draft fallback; reviewed model guide does not publish clearance.
- Normalized 400 / 100 / 25 US gal fuel/water/waste to canonical litres.
- Rudder subtype remains Unknown.

## Gozzard / Pilgrim 40

Primary evidence:
- HMY Powerboat Guide: https://www.hmy.com/yachting/powerboat-guide/pilgrim/40-1983-89
- Soundings: https://soundingsonline.com/boats/pilgrim-40/
- Gozzard/Pilgrim specification document: https://paperzz.com/doc/6871184/pilgrim-40---gozzard-yachts

Changes:
- Cleared unsupported 36.5 ft LWL fallback. HMY explicitly reports LWL as unavailable and secondary figures conflict.
- Added 22 ft / 6.7056 m air draft from HMY.
- Added 6 ft 4 in / 1.9304 m headroom.
- Normalized 142 US gal fuel and 240 US gal water to canonical litres with verified unit provenance.
- Replaced unsupported 70 holding-capacity value with documented standard 100 US gal / 378.54 L waste capacity.
- Rudder subtype remains Unknown. Sources describe a deep rudder/skeg and full keel protection, but do not establish the canonical attachment subtype safely.

## Great Harbour GH37

Primary evidence:
- Factory specifications: https://www.greatharbourtrawlers.com/gh37-specifications-and-layout.html
- Model-specific examples documenting lowered mast configurations: https://fyiyachts.com/yacht-listing/2005-great-harbour-gh37-2/
- https://marinesource.com/boat/great-harbour-gh37-2000-geneva-a91654cb-for-sale

Changes:
- Corrected imperial LWL shadow to 36 ft 1 in.
- Cleared fixed 13.5 ft air-draft fallback. Documented lowered configurations vary from roughly 13 ft 6 in to 15 ft 6 in depending on mast/antenna installation.
- Normalized factory standard 500 US gal fuel, 500 US gal water and 140 US gal holding tank to canonical litres.
- Factory 750-gal optional fuel configuration remains a documented option rather than replacing the standard capacity.
- Rudder subtype remains Unknown.

## Great Harbour N37

Primary evidence:
- Factory specifications: https://www.greatharbourtrawlers.com/n37-specifications-and-layout.html
- Factory brochure: https://www.greatharbourtrawlers.com/uploads/4/9/4/8/49488989/n37slick.pdf
- Model-specific air-draft example: https://marinesource.com/boats-for-sale/listing_print.cfm?listingnmb=100849003

Changes:
- Corrected imperial LWL shadow to factory 36 ft 1 in.
- Corrected displacement to factory brochure 47,000 lb / 21,318.84 kg.
- Cleared fixed 14.5 ft air-draft fallback. Reviewed N37 examples vary by flybridge, arch, bimini and antenna configuration.
- Normalized factory 500 / 300 / 100 US gal fuel/water/waste to canonical litres.
- Rudder subtype remains Unknown.

## Residual status after Batch 12

Global missing structured fields:
- LOA: 16
- LWL: 118
- Beam: 13
- Draft: 22
- Air draft: 116
- Displacement: 27
- Fuel: 2
- Mechanical propulsion: 1
- Hull behaviour: 0
- Keel configuration: 91
- Rudder type: 197
- Headroom: 228

Manufacturer completion coverage:
- 60 / 69 manufacturers complete
- 9 manufacturers remain
- 9 models remain in the unreviewed tail

Remaining manufacturers:
Luhrs, Nordhavn, Oceania Yachts, PDQ, Saga, SeaPiper, Sealord, Shannon, Transpacific Marine.

## Release validation

- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Plan preference mappings: 28
- Cross-database QC: Passed
- Measurement normalization: Passed
