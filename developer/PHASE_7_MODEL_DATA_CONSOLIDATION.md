# Phase 7 — Model-data consolidation and physical cleanup

## Authoritative source

`boatmodels.json` is the sole runtime source for model identity, specifications, normalized editorial fields, and preserved supplemental model intelligence.

## Removed

- `knowledge/data/boatintelligence.json` — 34 records migrated without loss into matching model records.
- `developer/__pycache__/` — generated Python bytecode, not project source.

## Retained

- `knowledge/data/knowledgecards.json` remains a generated cache. It contains no authoritative unique model knowledge and is regenerated from `boatmodels.json` plus resource, listing, annotation, and coverage datasets.
- Fact/evidence/relationship datasets remain separate because they are normalized knowledge infrastructure rather than duplicate model profile prose.

## Runtime changes

- DataRepository no longer loads `boatintelligence.json`.
- Knowledge Card enrichment reads embedded supplemental intelligence from `boatmodels.json`.
- Knowledge Card generation reads only `boatmodels.json` for model intelligence.

## Safety rule

No file was removed until its unique content was migrated and all known consumers were redirected.
