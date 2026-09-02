# B-Atlas Specification Completion — Batch 11

Release: **v6.56.0**  
Baseline: **v6.55.0**  
Manufacturers: **Windy, True North, Prairie, Nimble, Holiday Mansion**

## Purpose

Continue the source-backed canonical specification completion pass while preserving the core B-Atlas rule: known undesirable information may eliminate; missing or conflicting information stays and reduces confidence.

This batch concentrated on the small residual queues for five previously uncompleted manufacturers. It also reconciled stale imperial shadow values and removed unsupported fallback values that could leak into Plan or public model pages.

## Results

**53 field-level updates** were applied.

Global remaining gaps after Batch 11:

| Field | v6.55 | v6.56 |
|---|---:|---:|
| LOA | 15 | 16 |
| LWL | 120 | 118 |
| Beam | 13 | 13 |
| Draft | 23 | 22 |
| Air draft | 118 | 117 |
| Displacement | 28 | 27 |
| Fuel | 2 | 2 |
| Mechanical propulsion | 1 | 1 |
| Hull behaviour | 0 | 0 |
| Keel configuration | 91 | 91 |
| Rudder type | 198 | 197 |

The increase in LOA missing count is intentional: the original-diesel True North 34 had been carrying nominal/hull-length data as though it were model-wide overall length, but period evidence shows extension-dependent overall lengths.

## Windy 26 SN

Sources reviewed:
- Windy historical model archive
- Canadian Yachting / Canadian Boating 1984 road test
- Beekhuis Yachtbrokers model-specific record

Changes:
- Promoted **0.72 m draft** into the canonical metric field.
- Promoted **2.30 m air draft** into the canonical field.
- Reconciled imperial draft/air-draft shadow fields.
- Marked fuel and water tank values as conflicting rather than pretending the historical factory SI and Canadian-test gallon figures describe one fixed model-wide capacity.

Rudder subtype remains unknown. Sources establish a large rudder, full-length skeg and emergency tiller, but do not explicitly establish whether the rudder is skeg-hung, full-keel attached, or another taxonomy subtype.

## Nimble Nomad

Sources reviewed:
- boats.com / Soundings used-boat review
- Brewer Yacht Sales exact 1996 Nomad Tropical
- exact-model archived listing with dimensional table

Changes:
- Corrected draft from the inherited 2 ft canonical value to **1 ft 4 in / 0.4064 m**.
- Added **22 ft 4 in LWL** with moderate confidence from exact-model documentation.
- Added `rudder.none_external_drive` because the boat steers through its outboard in a well.
- Removed unsupported 8 ft air-draft fallback.
- Normalized **24 US gal fuel** and **26 US gal water** into canonical litres.
- Corrected representative displacement from the inherited 3,500–4,000 lb-class value to **2,450 lb** from the boats.com review.

Holding capacity remains unresolved because sanitation arrangements vary.

## Nimble Wanderer

Cruising World confirms the Wanderer was sold **with or without a mast**, and its tabernacle-stepped rig can be lowered. Therefore a single model-wide air draft is unsafe. The inherited **29.58 ft** fallback was removed.

Existing **29 ft 3 in LWL** and **2 ft 10 in draft** remain supported.

## Prairie 29 Coastal Cruiser

Sources reviewed:
- HMY / Powerboat Guide
- Prairie Boat Works archive
- current exact-model listing for configuration comparison

Changes:
- Corrected canonical LWL to **26 ft**.
- Corrected representative displacement to **12,000 lb**.
- Removed unsupported 12.2 ft air-draft fallback. A refitted surviving boat publishes 14 ft to canvas and 17 ft to antenna, demonstrating why this should not be generalized.
- Normalized **100 US gal water** and **40 US gal waste** into canonical litres.

Fuel capacity remains conflict/variable because archival Prairie material gives **100–150 gal**, while Powerboat Guide gives 100 gal.

## Prairie 36 Coastal Cruiser

Prairie archival material and Powerboat Guide/Atlantic 37 lineage data agree on:
- **36 ft 7 in length**
- **13 ft 9 in beam**
- **3 ft 3 in draft**
- **19 ft 9 in mast-up clearance**
- **22,000 lb weight**
- **30 gal waste**

Stale legacy values were reconciled to those figures. The inherited **33.2 ft LWL** fallback was removed because no sufficiently authoritative waterline length was found.

Fuel and water remain production-variable: Prairie archival data notes **250 gal fuel, later 360**, and **200–225 gal water**.

## True North 34 — Original Diesel / Inboard

Sources reviewed:
- Power & Motoryacht historical/lineage review
- model-specific 2009 original-diesel listing
- True North / Catalina history
- Pearson True North 33 lineage archive

Changes:
- Added **33 ft 10 in LWL** from a model-specific 2009 original-diesel boat.
- Added **12,500 lb representative dry displacement**.
- Normalized the documented original-diesel **180 US gal fuel tank** into canonical litres.
- Removed unsupported 10.8 ft air-draft fallback.
- Removed model-wide LOA because period evidence conflicts at approximately **36 ft 2 in** and **37 ft 9 in**, while the inherited 34.33 ft value functioned as nominal/hull length rather than reliable overall length.

Rudder remains subtype-unknown. Sources establish skeg-protected running gear but do not establish a canonical rudder attachment type strongly enough.

## Holiday Mansion 38 Barracuda Coastal

Exact-model evidence documents both:
- twin Volvo sterndrives, and
- Crusader V-drive inboards.

Therefore:
- Mechanical propulsion changed to **Mixed**.
- Legacy shaft-only labels were corrected.
- Unsupported 11.5 ft air-draft and 35 ft LWL fallbacks were removed.

Keel and rudder subtype remain unresolved because propulsion configuration materially changes the running gear. Tankage also varies too much among exact-model examples to normalize safely as one model-wide set.

## Validation

Release gates after modification and page regeneration:

- Canonical models: **259**
- Registry identities: **259**
- Search aliases: **259**
- Plan preference mappings: **28**
- Cross-database QC: **Passed**
- Measurement normalization tests: **Passed**

Static model/manufacturer/constraint/comparison pages and sitemap were regenerated from the corrected canonical data.
