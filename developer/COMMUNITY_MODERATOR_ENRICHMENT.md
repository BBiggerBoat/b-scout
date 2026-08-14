# Community Moderator Enrichment — v6.21.2

## Purpose

Community submissions are evidence, not final canonical records. For proposed manufacturers and models, moderators may now correct submitted values, research missing information, add fields the contributor never supplied, and then promote the enriched draft.

## Workflow

1. Open a pending new-manufacturer or new-model contribution.
2. Review the contributor's original submission. It remains unchanged.
3. Edit the **Draft canonical record**.
4. Add any researched fields using **+ Add field**.
5. Record research/source notes.
6. Choose **Promote edited manufacturer/model** and save the moderation decision.

The reviewed contribution stores the moderator-enriched `CanonicalDraft` separately from the original `Payload`.

## AI research assist

The moderator can use **Copy AI research brief**. This creates a structured research request using the submitted evidence, current draft values, and currently missing fields. It can be pasted into ChatGPT now.

The static B-Scout site does not call an AI service directly because doing so would require exposing credentials or introducing an authenticated backend. A later shared backend can automate the same research contract securely. AI-produced values must remain proposals until moderator review.

## Canonical protection

Promotion in the current static prototype records the approved canonical draft in the moderation queue/export. It does not rewrite `boatmodels.json` or `data/registry/manufacturers.json` in the browser. The eventual shared publishing service should apply approved drafts to canonical data with validation and audit history.
