# B-Atlas Specification Completion Batch 10 — v6.55.0

## Scope

Manufacturers reviewed:

- North Pacific
- Fortier
- BHM / Flye Point
- Seahorse
- Nord Star

Baseline: v6.54.0.

Method: source-backed canonical promotion only. Conflicting values are moved to Unknown rather than arbitrarily selected. Canonical SI storage is used where source units are trustworthy; stale imperial and legacy shadows are removed when they can cause the UI to display unsupported facts.

## Results

79 field-level updates were made across 8 model records. A substantial share are provenance, tank-unit, shadow-field and conflict corrections rather than new facts.

Global missing-field movement:

| Field | v6.54 | v6.55 |
|---|---:|---:|
| LOA | 15 | 15 |
| LWL | 120 | 120 |
| Beam | 14 | 13 |
| Draft | 23 | 23 |
| Air draft | 119 | 118 |
| Displacement | 28 | 28 |
| Fuel | 2 | 2 |
| Mechanical propulsion | 1 | 1 |
| Hull behaviour | 0 | 0 |
| Keel configuration | 91 | 91 |
| Rudder type | 201 | 198 |

LWL stays flat because North Pacific 28 gains a verified LWL while Seahorse Coot 38 loses an internally inconsistent inherited LWL. Draft also stays flat because BHM 32 gains a representative hull draft while North Pacific 28 draft is moved to Unknown after conflicting period tests.

## North Pacific

### North Pacific 28
Factory-hosted period tests provide unusually strong data but disagree on some details.

Verified/promoted:
- LWL: 26 ft 6 in / 8.0772 m.
- Bridge clearance: 11 ft 9 in / 3.5814 m.
- Full-length keel classification.
- Fuel: 100 US gal -> 378.54 L canonical.
- Water: 50 US gal -> 189.27 L canonical.

Conflict handling:
- Draft is now Unknown because one factory-hosted test gives 2 ft while another prints the internally inconsistent combination 0.6 m / 2 ft 5 in.
- Holding capacity is now Unknown because period tests give 20 and 25 gal.

Sources:
- https://northpacificyachts.com/wp-content/uploads/2024/11/NPY-28-Passagemaker-Mar-2010.pdf
- https://northpacificyachts.com/wp-content/uploads/2024/11/NPY-28-Pacific-Yachting-Jan-2010.pdf

### North Pacific 38 Sedan
Reviewed North Pacific/Canadian Yachting material confirms 41 ft 6 in LOA, 12 ft 9 in beam, 4 ft draft, 24,000 lb and 350 gal fuel but does not publish LWL or bridge clearance.

Changes:
- Unsupported 35.8 ft LWL shadow removed.
- Unsupported 13.5 ft air-draft shadow removed.
- Water capacity moved to Unknown because a period factory test lists 200 gal while a documented 2011 hull lists 300 gal, consistent with the builder's semi-custom approach.

Sources:
- https://northpacificyachts.com/wp-content/uploads/2024/11/NPY-38-CYW-May-2013.pdf
- https://northpacificyachts.com/news/
- https://yachtr.com/42-north_pacific-2011-2841159/

## Fortier

### Fortier 26
Factory specification confirms two 50-gal fuel tanks.

Changes:
- Fuel normalized to 378.54 L / 100 US gal.
- Unsupported 40-unit water capacity cleared.
- Unsupported 20-unit holding capacity cleared.

Fortier confirms a holding tank but does not publish a standard model-wide capacity on the current specification page.

Source: https://fortierboats.com/fortier-26/

### Fortier 33
The current Fortier page contains an internal fuel-capacity conflict: the specification section states two 110-gal tanks, while the mechanical section states two 100-gal tanks.

Changes:
- Fuel is not converted to canonical litres until the 200-versus-220-gal conflict is resolved.
- Unsupported model-wide water and holding capacities cleared.
- Rudder remains Unknown as a subtype: the factory specifies bronze rudders but not attachment geometry.

Source: https://fortierboats.com/fortier-33/

## BHM / Flye Point 32

BHM/Flye Point 32s are semi-custom and were finished by different yards. Model-specific 1993 records support a stable hull beam/draft while displacement, bridge clearance and tankage vary with finishing and equipment.

Changes:
- Beam promoted to 11 ft 6 in / 3.5052 m.
- Draft promoted to 3 ft 6 in / 1.0668 m.
- Unsupported 29 ft LWL fallback cleared.
- Unsupported 12.5 ft air-draft fallback cleared.
- Unsupported 14,000 lb displacement fallback cleared.
- Model-wide fuel/water/holding capacities cleared because they are finisher/hull-specific.

Sources:
- https://marinesource.com/boat/flye-point-marine-downeast-cruiser-1993-belfast-177ea4525b-for-sale
- https://www.boats.com/power-boats/1993-flye-point-32-10293896/

## Seahorse

### Coot 35
A stale legacy field still said `Construction: Fiberglass` even though the canonical hull-material code correctly said steel.

Changes:
- Legacy construction corrected to Steel.
- Imperial LOA/LWL/draft shadows reconciled to the canonical metric dimensions.
- Unsupported 14 ft air-draft fallback cleared.
- Rudder classified as skeg-hung from the documented rudder-skeg construction.
- Model-wide tankage cleared because reviewed sources conflict materially on fuel/water/holding capacities.

Sources:
- https://www.boatsdata.com/2021-seahorse-coot-35-%26-38-37112/specs
- https://www.boattrader.com/boat/2005-seahorse-coot-35-8632224/

### Coot 38
The builder-derived specification is internally inconsistent: it prints LWL as 10.561 m and 31 ft 8 in, which are not equivalent.

Changes:
- Legacy construction corrected to Steel.
- LWL moved to Unknown rather than choosing one side of the inconsistent source.
- Unsupported 15 ft air-draft fallback cleared.
- Unsupported 28,000 lb displacement fallback cleared because current sources also publish about 37,400 lb loaded.
- Rudder classified as skeg-hung from the documented rudder-skeg construction.
- Tankage moved to Unknown because current sources conflict materially (including roughly 490 versus 650 gal fuel and 100 versus 150 gal water).

Sources:
- https://seahorse-marine.ueniweb.com/products/pocket/coot-38-35-50767788
- https://www.youboat.com/boat/2025-seahorse-coot38-522264/

## Nord Star 31+

The current factory specification is strongly SI-based.

Changes:
- Fuel retained canonically at 520 L with US-gallon equivalent for display.
- Water retained at 117 L.
- Holding retained at 90 L.
- Main-cabin headroom added at 1.94 m / 6 ft 4 in.
- Rudder classified as no separate rudder because steering is through the sterndrive.
- Fixed 3.28 ft draft fallback removed: published boats range roughly 0.7–1.1 m depending drive position/configuration, and the factory page does not provide one canonical draft.

Sources:
- https://nordstar.fi/nord-star-fleet/pilothouse-31-plus/
- https://nordstar.fi/wp-content/uploads/2023/02/NS_2023.pdf
- https://www.boat24.com/en/powerboats/nord-star/nord-star-31/detail/619597/
- https://au.boats.com/power-boats/2022-nord-star-31-10281733/

## Validation

- Cross-database QC: Passed
- Canonical models: 259
- Registry identities: 259
- Search aliases: 259
- Preference mappings: 28
- Measurement normalization: Passed

Updated research queue: `data/specification-research-queue-v6.55.json`.
