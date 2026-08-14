# Phase 3 — New Schema Established

## Scope

The approved model-knowledge fields now exist on all 287 records in `boatmodels.json`. No model-specific interpretation or research was added.

## Initialized fields

- `Overview`: `null`
- `Suitability`: `{}`
- `TradeOffs`: `[]`
- `BestFor`: `[]`
- `KnownConcerns`: `[]`
- `InspectionFocus`: `[]`
- `BuyerQuestions`: `[]`
- `OwnerActions`: `[]`
- `ModelVariations`: `[]`
- `EvidenceSummary`: explicit Unknown coverage/evidence structure

## Existing fields converted safely

- Existing `Strengths` prose was retained intact as one array item.
- Existing `AvoidIf` prose was retained intact as one array item.
- No commas, sentences or concepts were automatically split.

## Legacy fields retained unchanged

- `Weaknesses`
- `CommonProblems`
- `TypicalMission`
- `DataConfidence`
- `ResearchNotes`

These remain available for the later audit and migration phases.

## EvidenceSummary initialization

```json
{
  "KnowledgeCoverage": "Unknown",
  "EvidenceQuality": "Unknown",
  "Statements": [],
  "UnresolvedInformation": []
}
```

Unknown values do not imply negative suitability.
