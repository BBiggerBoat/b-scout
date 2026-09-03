# B-Atlas v6.67.0

## Resource Review management
- Integrated the 185 v6.66 research-source candidates into Contribution Management.
- Added a dedicated **Resource Review** queue, separate from community submissions.
- Added status/category/search filters and queue metrics.
- Added source context showing the model, source URL, supported specification fields and research rationale.
- Added moderator-editable public resource metadata.
- Added decisions: Publish, Evidence only, Needs replacement, Reject, Return to pending.
- Added shared persistence for resource-review decisions to both Node and Cloudflare/D1 moderation snapshots.
- Added approved-resource publication to the local curated resource library.
- Added Cloudflare `resourceAdditions` public overlay and client-side merge into Model Guide Research Libraries.
- Added resource-review JSON export.
- Renamed moderator page heading from Contribution Review to Contribution Management.

## Validation
- Resource-review queue test: passed — 185 candidates / 115 models / 1,210 source-field relationships.
- Model Knowledge Score: passed.
- Cross-database QC: passed — 259 canonical models / 259 registry records / 259 aliases / 28 Plan mappings.
- Measurement normalization: passed.
- Plan-critical exception tests: passed.
- v6.66 resource-coverage test: passed — 259 resource sets / 557 retained resources / 238 models with resources / 21 without.
