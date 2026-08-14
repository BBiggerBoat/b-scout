# Phase 5 — Safe Mechanical Conversions

Completed deterministic migrations only.

## Applied

- Populated `TradeOffs[]` from legacy `Weaknesses` without deleting `Weaknesses`.
- Split list prose only at semicolons and line breaks.
- Did not split prose on commas.
- Normalized whitespace, line endings and trailing separator punctuation.
- Converted explicit textual unknown markers in nullable text fields to `null`.
- Preserved boolean `false`, textual `No` and numeric zero for later evidence-based review.
- Migrated Saved Model stage storage to `Interested`, `Researching`, `Shortlist` and `Rejected`.
- Added automatic local-storage migration for legacy model stages.
- Kept Saved Listing stages separate and unchanged.

No model meaning was editorially rewritten. Ambiguous prose remains for Phase 6 human review.
