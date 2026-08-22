# B-Scout v6.23.6 — Resource Quality Audit Restoration

## Regression target

- Canonical models: **253**
- Curated resource entries before strict audit: **782**
- Retained: **557**
- Removed: **225**
- Models intentionally left with no Owner Resource: **15**

## Standard applied

- Retain model-specific and meaningful model-family research resources.
- Retain authoritative manufacturer, factory, technical, owner-club and dedicated owner-community material when it adds practical research value.
- Do not use ordinary marketplace/broker listings as curated research resources.
- Do not use generic marketplace search pages as curated resources.
- Do not use broad trawler forums or general trawler associations as substitutes for model-specific owner resources.
- When only broad manufacturer-wide material exists, prefer no Owner Resource over weak relevance.
- Limit repetitive manufacturer-wide links when stronger model/family resources already exist.

## Result by category

- Videos: 55 → **53**
- Documents: 535 → **393**
- Owner communities: 192 → **111**

## Models intentionally left without Owner Resources

- `BHMB-32` — BHM 32 / Flye Point 32
- `CAMA-28-GN` — Camano 28/31 Gnome
- `CHBB-34-SE` — CHB 34 Sedan
- `CHBY-40` — CHB 40 Double Cabin
- `DEFE-38-TR` — DeFever 38 Passagemaker
- `DUFF-29` — Duffy 29
- `MTRA-34-EU` — Marine Trader 34 Europa
- `NMBS-3003` — Nimbus 3003
- `OCAL-39-SE` — Ocean Alexander 39 Sedan
- `ROSB-246-LS` — Rosborough RF-246 Sedan Cruiser Diesel
- `SEAL-34-TC` — Sealord 34 Double Cabin Trawler
- `SEAW-24-ST` — Seaway 24 Sport Trawler
- `SEAW-28-CC` — Seaway 28 Coastal Cruiser
- `TOLL-37-SE` — Tollycraft 37 Sedan
- `UNIV-36-TR` — Universal Marine 36 Tri-Cabin Trawler

## Removal reasons

- **113** — Redundant manufacturer-wide resource; a stronger supplemental resource is retained for this model.
- **35** — Marketplace/brokerage example is not retained as a curated research resource.
- **25** — Generic discussion forum is not sufficiently model-specific.
- **18** — General trawler association is not sufficiently model-specific.
- **16** — Manufacturer background is not an Owner Resource.
- **12** — No sufficiently model/family-specific Owner Resource remained under the strict standard.
- **4** — Marketplace/brokerage listing URL is not retained as a curated research resource.
- **2** — Generic marketplace search is not retained as a curated research resource.

## Audit trail

Every removed resource is recorded in `knowledge/data/resource-quality-audit-v6.23.6.json` with model ID, title, URL, category and removal reason. This prevents a later deployment/refinement round from silently restoring the pre-audit 782-entry dataset.
