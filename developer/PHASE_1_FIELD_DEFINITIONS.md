# B-Scout v6.11 — Phase 1 Field Definitions Frozen

## Status

Approved field definitions have been incorporated into `data/model-schema.json`.

No broad model-data rewriting or migration was performed in this phase.

## Frozen model-knowledge fields

- Overview
- Suitability
- Strengths
- TradeOffs
- BestFor
- AvoidIf
- KnownConcerns
- InspectionFocus
- BuyerQuestions
- OwnerActions
- ModelVariations
- EvidenceSummary with scoped confidence

## Governing rules

1. Known undesirable information may eliminate a candidate.
2. Missing or unknown information remains eligible and reduces confidence.
3. Unknown must not be represented as false, no, zero, poor or unsuitable.
4. Each field answers one defined question and must not duplicate another field.
5. Confidence applies to a statement, fact, concern, variation or field—not automatically to an entire model.
6. Model-specific knowledge will be migrated into `boatmodels.json` in controlled stages.
7. Generated files may summarize the master records but must not contain unique model knowledge.
8. No value may be invented to create apparent completeness.

## Legacy migration sources

The following fields/files remain unchanged and are migration sources only:

- `Weaknesses` → review for `TradeOffs`
- `TypicalMission` → review for `Suitability` and `BestFor`
- `CommonProblems` → review for `KnownConcerns`; derive `InspectionFocus` separately
- `DataConfidence` → temporary compatibility only
- `ResearchNotes` → preserve until claims and unresolved information are migrated
- `knowledge/data/boatintelligence.json` → no new unique model knowledge

## Next phase

Phase 2 should normalize presentation labels, comparison structure and empty-state behaviour before record-level editorial migration begins.
