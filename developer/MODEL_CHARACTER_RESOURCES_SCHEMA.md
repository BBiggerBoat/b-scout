# B-Atlas Model Character + Resources Schema

Version: 1.0
Established: 2026-08-07

## Purpose
Model Character answers **“What is this boat?”** in concise buyer language. It must not repeat Strengths, Best For, specifications, or marketing copy. Resources provide direct paths to useful model knowledge. Missing resources remain unknown.

## Boat-model fields
- `ModelCharacter` — 1–3 sentences describing defining design/use character.
- `DesignLineage[]` — factual predecessor/successor, renaming, shared hull/tooling, or generation relationships.
- `OwnershipCharacter` — practical ownership character: simplicity, systems burden, scale, maintenance and infrastructure implications.
- `CharacterConfidence` — `Unknown | Low | Moderate | High`.

## Boat-intelligence schema v4
Adds `characterNarrative`, `ownershipCharacter`, `designLineage[]`, and section confidence for model character, lineage, and resources.

## Curated-resources schema v2
Collections: `documents[]`, `videos[]`, `ownerCommunities[]`, `images[]`. Each item uses title, URL, source label, resource type, verification status, scope, confidence and notes.

Resource priority: builder/manufacturer documentation; owner manuals/official technical documentation; recognized owner groups/clubs; independent reviews/tests; useful model-specific walkthroughs; community discussions with model-specific value.

## Missing-information rule
A model is never penalized or removed because a manual, video, group, or character detail cannot be found. Missing resource = unknown / not yet sourced.

## Batch workflow
1. Confirm identity and lineage.
2. Write Model Character and Ownership Character.
3. Record lineage.
4. Source manuals/documents.
5. Source useful videos/virtual tours.
6. Source groups/clubs/owner knowledge.
7. Assign confidence.
8. Verify direct links.
9. Run coverage audit.
