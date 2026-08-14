# Phase 4 — Automated Audit Only

Phase 4 adds a repeatable, non-destructive audit of `boatmodels.json`.

## Added

- `developer/audit-model-schema.js`
- `developer/reports/phase4-model-audit.json`
- `developer/reports/phase4-model-audit.csv`
- `developer/reports/PHASE_4_MODEL_AUDIT.md`

## Audit categories

1. Repeated strings across models, with unrelated manufacturers and families prioritized.
2. Comma-separated pseudo-lists.
3. Line-break inconsistencies.
4. Generic fallback language.
5. Strengths repeated in Best For.
6. Trade-offs repeated in Avoid If.
7. Common Problems repeated in Inspection Focus.
8. High confidence without supporting evidence references.
9. Reviewed records without supporting evidence references.
10. Not-started records carrying legacy High confidence.
11. Values outside controlled classifications.
12. Possible unknown values represented as `false`, `No`, or zero.
13. Generic age-related risks represented as model problems.

## Interpretation rule

Every result is a review flag. The audit does not establish factual error and does not authorize automatic rewriting. In particular, `false`, `No`, and zero may be valid known values; they are flagged only where confirmation may be needed.

## Data integrity

No boat-model values were changed during Phase 4. The script reads the authoritative model database and writes reports only.
