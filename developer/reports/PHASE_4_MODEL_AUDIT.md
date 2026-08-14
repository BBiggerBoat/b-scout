# Phase 4 — Automated Model Audit

Generated: 2026-08-06T19:48:34.732Z

- Models audited: **287**
- Models with one or more flags: **287**
- Total flags: **2287**
- Model data changes: **None**

## Summary

| Audit | Flags |
|---|---:|
| duplicateStrings | 258 |
| commaSeparatedPseudoLists | 345 |
| lineBreakInconsistencies | 34 |
| genericFallbackLanguage | 24 |
| commonProblemsRepeatedInInspectionFocus | 2 |
| notStartedWithHighConfidence | 122 |
| outsideControlledClassifications | 63 |
| unknownRepresentedAsNegative | 1273 |
| genericAgeRelatedProblems | 166 |
| strengthsRepeatedInBestFor | 0 |
| tradeOffsRepeatedInAvoidIf | 0 |
| highConfidenceWithoutEvidence | 0 |
| reviewedWithoutSources | 0 |

## Interpretation

These results are editorial and schema review queues. A flag does not authorize automatic rewriting or establish that a value is wrong. Potential unknown-as-negative values require source verification.

## Highest-priority samples

### duplicateStrings (258)

Identical normalized strings used by multiple records; cross-manufacturer and cross-family repeats receive higher review priority.

-  — `Overview`: The Fjord 36 is an express cruiser and planing produced from 2015 to 2026. Typical examples use twin outboard and gasoline. The recorded configuration includes a flybridge, 1 cabin, 4 berths, and 1 head.
-  — `Overview`: The Fjord 40 is an aft cabin cruiser and planing produced from 2018 to 2026. Typical examples use twin outboard and gasoline. The recorded configuration includes a flybridge, an aft cabin, 2 cabins, 4 berths, and 1 head.
-  — `Overview`: The Nordic Tugs 32 is a tug pilothouse and semi-displacement produced from 1985 to 2012. Typical examples use single inboard diesel and shaft. The recorded configuration includes 1 cabin, 4 berths, and 1 head.
-  — `Overview`: The Nordic Tugs 37 is a tug pilothouse and semi-displacement produced from 1998 to 2016. Typical examples use single inboard, diesel, and shaft. The recorded configuration includes 2 cabins, 6 berths, and 1 head.
-  — `Strengths`: Two distinct sleeping areas
-  — `Strengths`: Excellent interior volume and long-range capability
-  — `Strengths`: Excellent interior volume and comfortable layout
-  — `Strengths`: Excellent interior volume and offshore pedigree
- … 250 additional flags in the JSON/CSV report.

### commaSeparatedPseudoLists (345)

Array items or prose fields that appear to contain several concepts separated by commas.

- **Albin 25** (ALBN-25) — `Strengths`: Highly efficient displacement cruiser with separate forward and aft sleeping cabins, shallow draft, modest beam and a strong international owner community
- **Albin 25** (ALBN-25) — `TradeOffs`: Low interior headroom by modern standards, limited speed and payload, small cockpit and highly variable original-engine support
- **Albin 25** (ALBN-25) — `AvoidIf`: You need standing headroom throughout, modern systems, a large cockpit or sustained speeds above displacement cruise
- **Albin 25** (ALBN-25) — `InspectionFocus`: Shaft, V-drive, rudder and prop-protection gear
- **Albin 25** (ALBN-25) — `InspectionFocus`: Legacy wiring, plumbing, repowers and owner modifications
- **Albin 25** (ALBN-25) — `BuyerQuestions`: What inspection, repair or service history is available for moisture in cored decks, pilothouses and window surrounds where applicable?
- **Albin 25** (ALBN-25) — `BuyerQuestions`: What inspection, repair or service history is available for shaft, v-drive, rudder and prop-protection gear?
- **Albin 25** (ALBN-25) — `BuyerQuestions`: What inspection, repair or service history is available for legacy wiring, plumbing, repowers and owner modifications?
- … 337 additional flags in the JSON/CSV report.

### lineBreakInconsistencies (34)

Stored text containing CR, LF or CRLF line breaks.

- **Albin 27 Family Cruiser** (ALBN-27-FC) — `ResearchNotes`: Joe Puccia designed the model for Albin Marine USA as a larger American-market successor to the Swedish Albin 25. Approximately 500 Albin 27s were built across Family Cruiser and Sport configurations from 1983 into the m
- **Albin 28 Tournament Express Flush Deck** (ALBN-28-FL) — `ResearchNotes`: Later flush-deck Tournament Express generation. Contemporary test data supports approximately 132 gallons fuel, 36 gallons water and 10 gallons waste; equipment and dimensions should still be verified by model year. [Pha
- **Albin 28 Tournament Express Engine Box** (ALBN-28-TE-EB) — `ResearchNotes`: Original Tournament Express arrangement with the engine box in the cockpit. Treat separately from the later flush-deck generation; published family production totals should not be assigned to each generation. [Phase 8A l
- **Bayliner 3270** (BAYL-3270) — `ResearchNotes`:  [Phase 8A legacy structured context] { "marketAvailability": "Regularly appears in North American used-boat markets, but condition and configuration vary widely.", "partsAvailability": "General marine components remain 
- **Camano 28 Gnome** (CAMA-28-GN) — `ResearchNotes`: Documented sistership to the Camano 28/31 Troll, the documented no-flybridge sistership. HMY identifies Gnome production as 1990–1995. The marketed length changed across the shared 28-foot hull family; use hull length an
- **Camano 28/31 Troll** (CAMA-31-TR) — `ResearchNotes`: Same 28-foot hull was marketed as Camano 28, later 30 and then 31; HMY reports the 31 name from 1997. Fuel capacity increased from 100 to 133 gallons on later production around 2003, so listing-year verification is requi
- **Grand Banks 32 Classic** (GRBK-32-CL) — `ResearchNotes`: Model spans multiple years and construction generations. Dimensions and machinery can vary; individual-vessel evidence must not be generalized to every hull. [Phase 8A legacy structured context] { "marketAvailability": "
- **Luhrs 30 Alura** (LUHR-30) — `ResearchNotes`:  [Phase 8A legacy structured context] { "marketAvailability": "Used-market availability varies by region and condition.", "partsAvailability": "Generally available for major systems; model-specific trim and glazing requi
- … 26 additional flags in the JSON/CSV report.

### genericFallbackLanguage (24)

Generic or verification-only wording that may make a field appear complete without model-specific information.

- **Albin 25** (ALBN-25) — `ResearchNotes`: Swedish Per Brohäll design derived from Albin’s engine-building and small-cruiser tradition. Original documentation confirms that engine and equipment packages changed during production; verify the individual installatio
- **Back Cove 26** (BKCV-26) — `AvoidIf`: You require capabilities not supported by the verified specifications or cannot accept the listed limitations and ownership demands
- **Back Cove 39 O** (BKCV-39O) — `AvoidIf`: You require capabilities not supported by the verified specifications or cannot accept the listed limitations and ownership demands
- **Bayliner 2859 Classic Cruiser** (BAYL-2859) — `AvoidIf`: You require capabilities not supported by the verified specifications or cannot accept the listed limitations and ownership demands
- **Bayliner 3058** (BAYL-3058) — `AvoidIf`: You require capabilities not supported by the verified specifications or cannot accept the listed limitations and ownership demands
- **Bayliner 3218** (BAYL-3218) — `AvoidIf`: You require capabilities not supported by the verified specifications or cannot accept the listed limitations and ownership demands
- **Bayliner 3258** (BAYL-3258) — `AvoidIf`: You require capabilities not supported by the verified specifications or cannot accept the listed limitations and ownership demands
- **Bayliner 3388** (BAYL-3388) — `AvoidIf`: You require capabilities not supported by the verified specifications or cannot accept the listed limitations and ownership demands
- … 16 additional flags in the JSON/CSV report.

### strengthsRepeatedInBestFor (0)

Strength content duplicated in Best For.


### tradeOffsRepeatedInAvoidIf (0)

Trade-off content duplicated in Avoid If.


### commonProblemsRepeatedInInspectionFocus (2)

Common Problems content duplicated in Inspection Focus.

- **Mainship 350 Trawler — early 350 designation** (MNSH-350-TR) — `CommonProblems → InspectionFocus`: Inspect deck and window moisture, flybridge and rail penetrations, exhaust risers and raw-water cooling systems, fuel tanks and hoses, shaft seals and alignment, steering and bow-thruster systems, and the quality of lega
- **Mainship 390 Trawler — renamed 350 family** (MNSH-390-TR) — `CommonProblems → InspectionFocus`: Inspect deck and window moisture, flybridge and rail penetrations, exhaust risers and raw-water cooling systems, fuel tanks and hoses, shaft seals and alignment, steering and bow-thruster systems, and the quality of lega

### highConfidenceWithoutEvidence (0)

High legacy or scoped confidence without evidence references in the authoritative model record.


### reviewedWithoutSources (0)

Reviewed or Verified record with no evidence references in the authoritative model record.


### notStartedWithHighConfidence (122)

Not-started record carrying legacy High confidence.

- **American Tug 34 Trawler** (AMTG-34)
- **American Tug 365 Trawler** (AMTG-365)
- **American Tug 395 Trawler** (AMTG-395)
- **Atlantic Boat 26 Duffy Cruiser** (ATLB-26-DU)
- **Back Cove 30 Trawler** (BKCV-30)
- **Back Cove 32 Trawler** (BKCV-32)
- **Back Cove 33** (BKCV-33)
- **Back Cove 34 Trawler** (BKCV-34)
- … 114 additional flags in the JSON/CSV report.

### outsideControlledClassifications (63)

Values outside schema or taxonomy controlled values.

- **Back Cove 26** (BKCV-26) — `SideDecks`: Medium
- **Back Cove 29** (BKCV-29) — `SideDecks`: Medium
- **Bayliner 2452 Classic Cruiser** (BAYL-2452) — `SideDecks`: Medium
- **Bayliner 2855 Ciera** (BAYL-2855) — `SideDecks`: Medium
- **Bayliner 2859 Classic Cruiser** (BAYL-2859) — `SideDecks`: Medium
- **Bayliner 3055 Ciera** (BAYL-3055) — `SideDecks`: Medium
- **Bayliner 3058** (BAYL-3058) — `SideDecks`: Medium
- **Bayliner 3258** (BAYL-3258) — `SideDecks`: Medium
- … 55 additional flags in the JSON/CSV report.

### unknownRepresentedAsNegative (1273)

False, No or zero values requiring confirmation that they are known negatives rather than placeholders.

- **Albin 25** (ALBN-25) — `Shower`
- **Albin 25** (ALBN-25) — `Galley`
- **Albin 25** (ALBN-25) — `Active`
- **Albin 25** (ALBN-25) — `Flybridge`: No
- **Albin 25** (ALBN-25) — `OffshoreRating`: No
- **Albin 27 Sport** (ALBN-27-SP) — `Shower`
- **Albin 27 Sport** (ALBN-27-SP) — `Galley`
- **Albin 27 Sport** (ALBN-27-SP) — `Active`
- … 1265 additional flags in the JSON/CSV report.

### genericAgeRelatedProblems (166)

Potentially generic age-related risks represented as model problems.

- **Albin 25** (ALBN-25) — `CommonProblems`: Inspect original or replacement engine support, exhaust and cooling systems, window seals, deck hardware bedding, rudder and shaft gear, wiring and owner modifications.
- **Albin 27 Family Cruiser** (ALBN-27-FC) — `CommonProblems`: Inspect cored deck and pilothouse areas for moisture, window sealing, fuel tanks, exhaust and cooling systems, aging wiring and the quality of repowers or owner modifications.
- **Albin 27 Sport** (ALBN-27-SP) — `CommonProblems`: Inspect cored deck and pilothouse areas, window sealing, fuel tanks, exhaust and cooling systems, wiring and repower workmanship.
- **Albin 28 Tournament Express Flush Deck** (ALBN-28-FL) — `CommonProblems`: Inspect deck core, exhaust and cooling systems, fuel tank, steering, shaft seal, cockpit drainage, MDF or composite interior panels where exposed to moisture and owner-added equipment.
- **Albin 28 Tournament Express Engine Box** (ALBN-28-TE-EB) — `CommonProblems`: Inspect deck core, engine mounts and box structure, exhaust and cooling systems, fuel tank, steering, shaft seal, cockpit drainage and owner-added fishing equipment.
- **Albin 30 Family Cruiser** (ALBN-30-FC) — `CommonProblems`: Inspect deck and cabin core, windows and ports, cockpit storage-well drainage and lift mechanism, exhaust and cooling systems, fuel tank, shaft gear and owner modifications.
- **Albin 32+2 Command Bridge** (ALBN-32-PL) — `CommonProblems`: Inspect deck core and windows, V-drive and shaft alignment, exhaust and cooling systems, fuel tanks, rudder gear, cockpit drainage, bow-thruster installation and owner modifications.
- **Albin 32+2 Sportfisher (early designation)** (ALBN-32-SF) — `CommonProblems`: Inspect deck core and windows, V-drive and shaft alignment, exhaust and cooling systems, tanks, rudder gear, cockpit drainage and modifications.
- … 158 additional flags in the JSON/CSV report.

