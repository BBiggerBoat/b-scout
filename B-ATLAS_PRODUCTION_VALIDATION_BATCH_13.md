# B-Atlas Production Validation Batch 13 — Final Remaining Manufacturers

**Release:** v6.43.0  
**Canonical architecture:** v1.4

This batch completes the first manufacturer-by-manufacturer validation pass for the current B-Atlas database.

## Major structural correction — Sea Ray 340 Sundancer

The legacy `1984–2008` 340 Sundancer record combined three unrelated generations under one reused model name.

It is now split into:
- `SEAR-340-SU` — 1984–89 Generation 1;
- `SEAR-340-SU-99` — 1999–2002 Generation 2;
- `SEAR-340-SU-03` — 2003–08 Generation 3.

The dimensions, deadrise and layouts are materially different, so production phases would have been too weak a distinction.

## Endeavour

The 36 TrawlerCat is correctly a full-displacement twin-hull catamaran. The 44 is a larger/faster power-cat trawler with twin 240 hp diesels and extensive accommodation.

## Holiday Mansion

The 38 Barracuda Coastal is corrected from shaft drive to I/O/sterndrive. Surviving boats include both single and twin installations, so engine count remains configuration-specific.

## Nord Star

The 31+ receives current factory dimensions, dry weight, tankage, headroom and deep-V/planing behavior. Engine count is not forced because the factory page publishes maximum rated power rather than one universal package.

## Oceania Yachts

A contemporary Canadian Yachting test from 1980 provides strong evidence for the Oceania 36 Sedan: 35'6" hull centerline, 38.5' published overall length, 12.5' beam, 3.5' draft, 19,000 lb displacement and single 120 hp Ford-Lehman diesel.

## PDQ

The PDQ 34 PowerCat is strengthened as a shallow-draft twin-diesel catamaran with two queen cabins and a separate shower stall.

## Saga

The Saga 26 HT production range is corrected to about 1990–2009. It was offered in semi-planing and full-planing versions; B-Atlas uses the common semi-planing behavior while preserving version variability.

## Sea Ray 390 / 40 Motor Yacht

This is one continuous model line:
- 390 Motor Yacht, 2003–05;
- 40 Motor Yacht, 2006–07.

The rename is represented with production naming phases.

## Sealord

The 34 Tri-Cabin remains a legitimate but provisional low-volume identity. A surviving 1987 Chien Hwa-built example supports 34' × 12' × 3'6", 18,000 lb and twin 63 hp Volvo diesels. Production history remains intentionally narrow.

## Shannon

The 38 SRD is corrected from displacement to planing-capable. Its Schulz Reverse Deadrise hull achieves roughly 25-knot performance with unusually low horsepower. Single, twin and surface-piercing propulsion configurations existed, so no universal drivetrain is forced.

## Universal

The Universal 36 is strengthened using a documented 1977 full-displacement GRP tri-cabin with twin 120 hp Ford Lehmans.

The Universal 40 Europa remains deliberately conservative. Marketplace evidence confirms the model existed by 1977, but factory-level documentation remains insufficient to promote universal weight, engine count or production-end data.

## Completion state

This closes the first structured validation sweep across all current manufacturers.

The next sensible stage is **cross-database quality control**, not another manufacturer batch:
1. identify unresolved/conflicting canonical fields;
2. find accidental duplicate/successor records;
3. audit remaining combined model identities;
4. verify preference/filter mappings against the newly canonicalized data.
