# B-Atlas Specification Completion Batch 06 — v6.51.0

## Scope

Manufacturers completed in this batch:

- Silverton
- Sea Ray
- Fjord
- Meridian
- American Tug

Baseline: v6.50.0.

## Method

This batch continued the source-backed canonical specification completion process. Model-specific factory documentation and established technical guides were preferred. Missing information remained missing when the evidence did not support a model-wide value. Production-generation differences were preserved rather than flattened.

The batch also continued the imperial shadow-field audit introduced in earlier passes so that switching B-Atlas between metric and imperial cannot surface stale values from a different model generation.

## Results

95 field-level updates were made.

### Canonical missing-field reductions

| Field | v6.50 | v6.51 |
|---|---:|---:|
| LOA | 16 | 15 |
| LWL | 125 | 124 |
| Beam | 15 | 14 |
| Draft | 24 | 23 |
| Air draft | 132 | 125 |
| Displacement | 32 | 31 |
| Fuel code | 5 | 5 |
| Mechanical propulsion | 2 | 1 |
| Hull behaviour | 0 | 0 |
| Keel configuration | 91 | 91 |
| Rudder type | 210 | 204 |

## Major corrections

### American Tug

The American Tug 34 now uses published 34 ft 5 in LOA, 32 ft 9 in LWL, 13 ft 3 in beam, 3 ft 5 in draft and 20,000 lb displacement. Its keel classification was corrected from partial skeg to full/long keel because the model guide explicitly describes a full-length keel.

The 34, 365 and 395 now use a skeg-hung rudder classification where the documented skeg supports/protects the rudder. Current American Tug factory tankage is normalized to canonical litres while preserving the published gallon values.

### Fjord

The 36 Open, 40 Cruiser and 40 Open use steerable Volvo IPS pods and therefore are now classified as having no separate rudder. The 36 Open also gains a documented 2.90 m air draft.

The 40 Cruiser had gallon-like numbers sitting in canonical litre fields. Model-specific European specifications publish 1,000 L fuel and 340 L freshwater, so those fields are now corrected and explicitly marked as canonical litres.

The less-common 36 Cruiser remains deliberately unresolved for rudder/drive details because surviving documentation does not yet establish its production propulsion architecture strongly enough.

### Meridian

Bridge clearance is now canonicalized as:

- 341 Sedan 2005–14: 14 ft 1 in
- 381 Sedan 2003–06: 14 ft 1 in
- 341 Sedan 2003–04: 13 ft 6 in

The 2003–04 341 split had retained tankage from the later 2005–14 design. It is corrected to 224 gal fuel, 92 gal water and 30 gal waste, with canonical litre conversions and corrected generation-specific imperial shadows.

### Sea Ray

The three 340 Sundancer generations had substantial cross-generation shadow contamination.

- 1984–89 shadows now align to 35 ft 11 in length with platform, 11 ft 11 in beam, 2 ft 5 in draft and 12,500 lb.
- 1999–2002 shadows now align to 33 ft 6 in length, 11 ft 5 in beam, 2 ft 5 in draft and 13,000 lb; V-drive propulsion is now explicit.
- 2003–08 shadows now align to 37 ft 6 in length, 12 ft beam, 3 ft 1 in draft-down and 15,500 lb.

Generation-specific tank shadows were also reconciled, including the 1984–89 172-gal fuel / 52-gal water values and the 1999–2002 40-gal water value.

### Silverton

Canonical bridge clearance is now added for:

- 352 Motor Yacht: 16 ft 2 in
- 372/392 Motor Yacht: 16 ft 5 in
- 40 Aft Cabin: 13 ft 6 in

The 34 Motor Yacht's stale imperial shadows were corrected to its published 39 ft 10 in overall length, 3 ft draft and 16,368 lb weight. Its conflicting tankage was resolved to 260 gal fuel, 74 gal water and 45 gal waste, normalized into canonical litres with the source gallon values retained.

## Deliberately unresolved items

- LWL remains unknown on most Silverton, Sea Ray, Meridian and Fjord models because the model-specific sources do not publish it.
- Conventional inboard rudder attachment remains unknown where sources identify only an inboard/shaft installation but not spade, skeg-hung, semi-balanced, etc.
- American Tug bridge clearance remains configuration-dependent (flybridge/mast options), so a single top-level value was not forced onto those records.
- Fjord 36 Cruiser propulsion/rudder architecture remains unresolved pending stronger production-model evidence.

## Validation

- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Cross-database QC: Passed
- Measurement normalization: Passed

## Evidence families used

- American Tug factory specifications
- PowerBoat Guide / HMY model-specific technical guides
- De Valk model-specific Fjord specifications
- Denison archived American Tug technical guide

Detailed field-level provenance is stored in `data/specification-completion-batch-06-v6.51.json`.
