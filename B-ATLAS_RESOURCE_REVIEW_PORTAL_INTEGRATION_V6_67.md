# B-Atlas v6.67.0 — Resource Review Portal Integration

## Purpose
Turn the v6.66 resource-review audit output into an operational moderator workflow rather than leaving 185 candidate source relationships in an audit file.

## Queue
- 185 deterministic resource-review records
- 115 canonical models represented
- every candidate retains the canonical BoatModelID and URL
- every candidate retains the specification fields it supported during v6.46–v6.60 research
- 1,210 field/source support relationships are recoverable from the completion records

Seed: `data/resource-review-queue-v6.67.json`

## Contribution Management portal
`developer/contribution-review.html` is now titled **Contribution Management** and contains two separate moderator work areas:

1. Community Contributions
2. Resource Review

Resource Review deliberately remains separate from visitor submissions while using the same moderator infrastructure.

### Resource decisions
A moderator can:
- Publish to Resource Library
- Keep as evidence only
- Mark Needs replacement
- Reject
- Return to pending

Before publishing, the moderator can edit:
- public title
- category
- source label
- resource type
- scope
- verification status
- moderator notes

The record also displays the specification facts and research basis for which the source was originally used.

## Persistence
`resourceReview` is now a first-class shared moderation snapshot collection in:
- local Node shared backend
- Cloudflare/D1 shared backend
- browser-local fallback

Moderator decisions therefore survive browser/session changes when connected to the shared backend.

## Publication
### Local Node backend
Approved Resource Review records are promoted into `knowledge/data/curatedresources.json`, deduplicated by model + URL, and Knowledge Cards are regenerated.

### Cloudflare production backend
Approved resources are published as `resourceAdditions` in the public overlay. `knowledge/knowledgecardui.js` merges those additions into the static curated resource collection at runtime, preserving the static data as fallback.

This avoids requiring a static-site rebuild simply to publish a reviewed resource.

## Quality principle
A source may be valid evidence for a specification without being a good enduring public resource. Ordinary sales listings should normally be retained as evidence-only unless they provide durable model-specific research value.
