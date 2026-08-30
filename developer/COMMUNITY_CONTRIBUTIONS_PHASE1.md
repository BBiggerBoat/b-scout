# B-Atlas Community Contributions — Phase 1 Architecture

## Purpose

Phase 1 establishes the data contract for community contributions. It does not add contribution UI, uploads, moderation screens, or public Guide presentation.

## Governing principles

1. **Owner contributions should make B-Atlas smarter, not noisier.**
2. **Contributions are evidence. B-Atlas turns evidence into knowledge.**
3. **The community can improve, correct, document and expand B-Atlas, but canonical knowledge changes only after review.**
4. **Unknown information remains unknown. Missing fields never invalidate an otherwise useful contribution.**
5. **No user account or contributor profile is required.**
6. **Optional contact information is private and exists only for clarification.**

## Contribution groups

### Improve existing knowledge
- Ownership experience
- Problem or weakness
- Buyer inspection advice
- Correct B-Atlas information
- Something else

### Add supporting material
- Photo
- Manual or document
- Useful resource

### Expand B-Atlas
- Add a missing model
- Add a manufacturer

## Scope

A contribution may attach to:
- a canonical model;
- a manufacturer;
- B-Atlas generally;
- a proposed new model/manufacturer that does not yet have a canonical ID.

Model year and variant are always optional unless a later contribution form has a compelling reason to require them.

## Canonical protection

Community submissions never directly overwrite canonical model/manufacturer data.

All submissions enter with:

`ModerationStatus = "pending"`

Possible statuses:
- Pending
- Approved
- Merged
- Needs clarification
- Rejected

## Contribution vs knowledge

A contribution is retained as evidence. A normalized knowledge item is a separate object produced during later moderation/intelligence phases.

Example:

Contribution:
> My 1981 boat had corrosion at the lower seams of both original fuel tanks.

Potential future knowledge item:
> Original fuel tanks — corrosion

The Guide may eventually summarize multiple evidence records without displaying each submission independently.

## Identity and privacy

There is no required UserID.

Optional fields:
- DisplayName
- ContactEmail

ContactEmail must never be rendered publicly.

A future authentication system may add an optional UserID without invalidating anonymous historical contributions.

## Files

- `public/data/contribution-types.json`
  - authoritative taxonomy of contribution choices.
- `public/data/moderation-statuses.json`
  - review states and publication controls.
- `public/data/community-contribution.schema.json`
  - base contribution data contract.
- `public/data/community-contribution.example.json`
  - example pending contribution.

## Phase 1 exit criteria

Phase 1 is complete when:
- all planned contribution types have stable IDs;
- contribution scope supports existing models, manufacturers, and proposed additions;
- moderation defaults to pending and forbids automatic canonical overwrite;
- missing model year/variant data remains acceptable;
- no user account is required;
- later UI can consume the taxonomy without redefining it.
