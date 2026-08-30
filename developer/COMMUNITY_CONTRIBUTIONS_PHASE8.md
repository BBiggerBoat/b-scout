# B-Atlas Community Contributions — Phase 8

## Objective
Turn reviewed community submissions into reusable evidence attached to normalized Knowledge Items, rather than allowing multiple reports to create duplicate Guide content.

## Architecture

**Contribution → Knowledge Evidence → Knowledge Item**

A contribution remains the original submitted evidence. A moderator may create a new Knowledge Item or merge the contribution into an existing item for the same canonical model. The contribution is never rewritten into a stronger claim.

## Knowledge Items
Each item stores a normalized title, category, concise optional summary, optional year/variant applicability, evidence summary, and lifecycle status. New community items begin as `candidate`.

## Evidence aggregation
Every merged/created relationship is stored separately as a Knowledge Evidence record. Evidence summaries are recalculated from the linked reviewed contributions.

Public evidence language is intentionally conservative:
- Reported by an owner
- Reported by several owners
- Commonly reported by owners
- Community evidence available
- Several community reports
- Well documented

Because B-Atlas does not require user profiles, the system does **not** claim that anonymous submissions represent independent people. It counts distinct contribution reports.

## Moderation workflow
Knowledge-bearing submissions (ownership experience, problem/weakness, buyer inspection advice, Something else) can now be:
- merged into an existing model Knowledge Item; or
- used to create a new candidate Knowledge Item.

Corrections remain canonical correction decisions. New models/manufacturers remain canonical creation decisions. Photos/documents/resources can still be approved without creating a Knowledge Item.

## Rollback
Returning a reviewed contribution to Pending removes its evidence relationship. A candidate Knowledge Item created solely by that contribution is removed if it has no remaining evidence.

## Static prototype boundary
Knowledge Items and evidence are stored locally in the moderator browser in Phase 8. Queue export/import now includes both, preparing the same moderation model for a future shared backend.

## Not included yet
- conflict/disagreement presentation (Phase 9)
- public Guide integration (Phase 10)
- automatic canonical edits
- user reputation/profile scoring
