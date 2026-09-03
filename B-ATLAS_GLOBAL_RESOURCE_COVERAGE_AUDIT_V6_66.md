# B-Atlas v6.66.0 — Global Resource Coverage Audit

Date: 2026-09-03

## Scope

Audit the curated research-resource layer against all 259 final canonical models after the manufacturer/specification reconciliation series. The audit is intentionally separate from a resource-completion pass: it measures coverage, catches structural gaps, and identifies promising source candidates without automatically publishing every research citation as an owner resource.

## Structural result

- Canonical models: 259
- Curated resource-set records before audit: 253
- Curated resource-set records after audit: 259
- Missing resource-set identities after audit: 0
- Orphan resource-set identities: 0
- Existing curated resource items preserved: 557

The six resource-set records missing after later canonical model splits were created as empty records. No resources were inherited or inferred merely because a related generation/model had them.

## Existing curated library

- Documents: 393
- Owner communities: 111
- Videos / virtual tours: 53
- Total retained resources: 557
- Models with at least one curated resource: 238 / 259
- Models with no curated resource: 21 / 259

### Resource-count coverage by model

- Strong (6+ items): 2
- Good (4–5): 43
- Basic (2–3): 117
- Minimal (1): 76
- Empty (0): 21

The current library is therefore broad but shallow. Most models have one to three useful resources rather than a complete research library.

## Coverage by useful resource kind

The audit maps retained resource metadata into a practical research framework. Counts below are models with at least one matching resource; classifications are heuristic and can overlap.

- Manufacturer / factory source: 112 / 259
- Manual / technical document: 21 / 259
- Brochure / specification sheet: 69 / 259
- Independent review / boat test: 136 / 259
- Useful video / virtual tour: 51 / 259
- Owner association / community: 105 / 259
- Parts / technical support: 91 / 259
- Historical / archive resource: 121 / 259
- Buying / inspection guidance: 2 / 259

### Interpretation

The weak points are clear:

1. **Manuals and technical documents are very incomplete.** Only 21 models currently have an explicitly classified manual/technical resource.
2. **Video coverage is sparse.** 51 models have at least one curated video.
3. **Owner-community coverage is meaningful but not universal.** 105 models have a curated owner group/community.
4. **Brochure/specification coverage is only 69 models**, despite many factory/period sources discovered during later specification research.
5. **Buying/inspection-specific resources are almost absent** as a curated class. This does not mean buying guidance is absent from B-Atlas; it means external model-specific inspection resources have rarely been curated as Owner Resources.

## Specification-research source candidates

The v6.46–v6.60 specification-completion batches introduced many model-specific evidence URLs that are not exact matches to the existing curated Resource Library.

- Model/source candidate relationships: 185
- Models with at least one candidate: 115

These are **candidates**, not automatically published resources. Some are listings used only as evidence for a specific measurement; some duplicate the purpose of an existing guide; some may be excellent factory brochures/manuals/reviews that should be promoted in a Resource Completion Pass.

This is likely the highest-value next source pool because the URLs have already been encountered during model-specific research.

## Empty-resource models

21 models currently have no curated resource. Some have new specification-research candidates and can probably be improved quickly; others remain genuine resource-search targets. The machine-readable audit identifies these individually.

## User contribution improvement

The Model Guide Owner Resources tab now always includes a **Research Library** action area with:

- `Add a resource`
- `Add a manual or document`
- `Add a group or association`
- `Add a video`

The action retains the exact canonical model context and opens the appropriate contribution workflow. Empty categories remain visible rather than disappearing, turning missing resource types into explicit contribution opportunities.

## Live-link verification note

This pass is a global **coverage and reconciliation audit**, not a 557-URL live-link recrawl. Existing verification status is preserved. Candidate research sources are not promoted until separately curated/reviewed. A later Resource Completion/Link Health pass should revalidate URLs as resources are promoted.

## Recommended next step

Run a **Resource Completion Pass** in this order:

1. Review the 185 already-discovered specification-research candidate relationships.
2. Prioritize the 21 empty models.
3. Prioritize original manuals, technical diagrams and factory brochures.
4. Fill high-value video/walkthrough gaps where a genuinely model-specific video exists.
5. Revalidate owner associations/communities and link health during promotion.

Avoid adding generic marketplace searches, ordinary sale listings, broad boating forums, or low-value promotional media simply to improve coverage counts.
