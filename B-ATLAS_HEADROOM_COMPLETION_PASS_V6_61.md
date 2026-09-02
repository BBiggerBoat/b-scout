# B-Atlas v6.61.0 — Dedicated Headroom Completion Pass

## Scope

This pass audited all 259 canonical models for existing structured headroom information, legacy headroom values and location-specific interior-fit opportunities. It also introduced location-aware interior measurements and a direct contribution workflow for missing values.

## Data architecture change

The prior single `Headroom` field remains for published/general interior headroom, but it is no longer treated as sufficient evidence for all spaces.

New canonical measurement fields:
- `HeadroomSalon`
- `HeadroomHelm`
- `HeadroomGalley`
- `HeadroomHead`
- `HeadroomForwardCabin`
- `VBerthLength`

All are canonical metres with Imperial / Metric / Both display support.

## New source-backed values promoted

Thirteen location-specific measurements were promoted across five model records:

- Camano 31 Troll: saloon 6'2", galley 8'1", head 5'11", forward stateroom 6'1", forward berth 6'6".
- Nordic Tug 26: saloon 6'4", pilothouse 6'2", forward cabin 6'0".
- Nordic Tug 34: saloon 6'6", pilothouse 6'7", forward cabin 6'3".
- Grand Banks 32 Sedan: saloon 1.95 m.
- Albin 28 Tournament Express (engine-box generation): head compartment 5'9". The same source gives a cabin range rather than one defensible cabin value, so it was not flattened.

## Coverage after the pass

- General/published `Headroom`: 35 known / 224 missing.
- Saloon/main cabin: 4 known / 255 missing.
- Helm/pilothouse: 2 known / 257 missing.
- Galley: 1 known / 258 missing.
- Head compartment: 2 known / 257 missing.
- Forward cabin: 3 known / 256 missing.
- V-berth usable length: 1 known / 258 missing.

This sparse result is expected. Most manufacturers did not publish compartment-by-compartment dimensions, and individual brokerage measurements frequently describe only one hull.

## Missing-data contribution workflow

The model Guide now displays each interior-fit field separately. When a field is unknown it shows a compact `Know this? Add it` action.

Selecting it:
1. opens Contribute in the context of the exact canonical model;
2. selects `Add or correct model information` automatically;
3. selects the exact missing field automatically;
4. leaves model year and variant available for production-specific context;
5. provides measurement guidance specific to the chosen field.

The contribution form wording was changed from correction-only language to `Add or correct model information`, because supplying an unknown fact is not a correction.

## Measurement standard

See `B-ATLAS_INTERIOR_FIT_MEASUREMENT_STANDARD_V1.md`.

The key principle is that a headroom measurement must state where it applies. Helm, galley, head and forward-cabin values are independent facts. V-berth length is likewise stored as an independent cruising-fit dimension.

## Data philosophy

Missing information remains non-excluding. A user-contributed measurement is evidence and enters moderation; it does not become canonical truth merely because it was submitted.
