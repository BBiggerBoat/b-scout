# B-Scout Community Contributions — Phase 5

## Objective
Activate manuals/documents and useful-resource contributions while preserving the account-free, moderated architecture.

## Manual / document contributions

Supported document types:
- Owner's manual
- Engine manual
- Service manual
- Parts manual
- Wiring diagram
- Brochure
- Specifications
- Technical bulletin
- Survey / example survey
- Other

A contributor may provide either:
1. an external document URL, or
2. one PDF upload up to 25 MB.

External links are recorded with `RightsStatus = external_link_only`.

Uploaded PDFs require one rights declaration:
- creator or owner
- intended for public distribution
- permission granted
- uncertain

`uncertain` is deliberately valid. It allows B-Scout to review the material as evidence without treating possession of the file as republication permission.

Model year and variant remain optional. A model may also be omitted for manufacturer-wide documentation.

## Useful resources

Supported resource types:
- Club
- Association
- Forum / community
- Video
- Virtual tour
- Technical website
- Other

Resources require an existing canonical model and a URL so they can later be reviewed for placement in that Guide's Owner Resources.

## Prototype storage

Contribution metadata continues to use browser `localStorage` under `bscoutPendingContributionsV1`. Uploaded PDFs use the existing IndexedDB attachment store `bscoutContributionAttachmentsV1`, keeping large files out of text storage.

No contribution is transmitted, published or merged into canonical model data in Phase 5. Shared moderation remains Phase 7.

## Exit criteria

- Manual/document contribution is no longer a placeholder.
- External links and PDF uploads are distinguished.
- Uploaded documents require explicit rights status.
- Rights uncertainty is preserved rather than falsely resolved.
- Useful resources are model-scoped and link-based.
- Uploaded files remain separate from contribution metadata.
- Canonical data cannot be overwritten.
