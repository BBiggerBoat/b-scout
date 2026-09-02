# B-Atlas Canonical Specification Completion Queue — v6.45.0

This queue separates fields that remain genuinely unverified from fields already promoted into the canonical model structure. Missing data remains eligible in Plan and reduces confidence rather than eliminating a candidate.

## Canonical gap counts

| Field | Missing | Known |
|---|---:|---:|
| Vessel category | 0 | 259 |
| Primary propulsion | 0 | 259 |
| Mechanical propulsion | 2 | 257 |
| Fuel | 6 | 253 |
| Hull material | 4 | 255 |
| Hull behaviour | 19 | 240 |
| Keel configuration | 97 | 162 |
| Rudder type | 257 | 2 |
| LOA | 41 | 218 |
| LWL | 179 | 80 |
| Beam | 42 | 217 |
| Draft | 53 | 206 |
| Air draft | 208 | 51 |
| Headroom | 229 | 30 |
| Displacement | 64 | 195 |

## Manufacturer research priority

| Manufacturer | Models with gaps | Remaining gaps |
|---|---:|---:|
| Ranger Tugs | 16 | 129 |
| Bayliner | 12 | 90 |
| Beneteau | 13 | 55 |
| Jeanneau | 9 | 53 |
| Cruisers Yachts | 10 | 50 |
| Cutwater | 6 | 50 |
| Carver | 9 | 44 |
| C-Dory | 5 | 40 |
| Marine Trader | 7 | 33 |
| Duffy | 6 | 31 |
| CHB | 5 | 30 |
| Albin | 9 | 28 |
| Back Cove | 9 | 28 |
| Cape Dory | 7 | 26 |
| Mainship | 8 | 24 |
| DeFever | 8 | 22 |
| Grand Banks | 6 | 21 |
| Rosborough | 3 | 21 |
| Sea Ray | 4 | 20 |
| Silverton | 4 | 20 |
| Cheoy Lee | 4 | 18 |
| Fjord | 4 | 18 |
| Kadey-Krogen | 6 | 18 |
| Nordic Tugs | 6 | 17 |
| Island Gypsy | 7 | 16 |
| Helmsman | 4 | 15 |
| Meridian | 3 | 15 |
| Willard | 3 | 15 |
| American Tug | 3 | 14 |
| Sea Sport | 3 | 14 |
| Camano | 3 | 13 |
| Seaway | 2 | 12 |
| Hunt Yachts | 2 | 10 |
| Sabre | 2 | 10 |
| Nimbus | 2 | 9 |
| Sisu | 2 | 9 |
| Fortier | 2 | 8 |
| North Pacific | 2 | 8 |
| Tollycraft | 2 | 8 |
| BHM | 1 | 7 |
| Endeavour | 2 | 7 |
| Gulfstar | 4 | 7 |
| Seahorse | 2 | 7 |
| Universal | 2 | 7 |
| Californian | 2 | 6 |
| Great Harbour | 2 | 6 |
| Greenline | 2 | 6 |
| Nimble | 2 | 6 |
| Ocean Alexander | 1 | 6 |
| Atlantic Boat | 1 | 5 |
| Holiday Mansion | 1 | 5 |
| Nord Star | 1 | 5 |
| Trojan | 1 | 5 |
| True North | 1 | 5 |
| Windy | 1 | 5 |
| Gozzard | 1 | 4 |
| Nordhavn | 1 | 4 |
| Oceania Yachts | 1 | 4 |
| Prairie | 2 | 4 |
| Saga | 1 | 4 |
| Sealord | 1 | 4 |
| Uniflite | 1 | 4 |
| PDQ | 1 | 3 |
| Shannon | 1 | 3 |
| Atlantic | 1 | 2 |
| Luhrs | 1 | 2 |
| Monk | 1 | 2 |
| SeaPiper | 1 | 2 |
| Transpacific Marine | 1 | 2 |

## Interpretation

- Vessel category and primary propulsion are complete across all 259 canonical models.
- Mechanical propulsion and fuel are now almost complete after promotion of explicit validated legacy values.
- Rudder type is the largest structural research deficit and requires new source-backed research rather than inference from keel/running-gear language.
- LWL, air draft and headroom are legitimate research targets but are not always published by manufacturers; unresolved values should stay unknown.
- LOA, beam, draft and displacement gaps often reflect production-phase conflicts and must not be backfilled from stale legacy values without checking the phase record.
