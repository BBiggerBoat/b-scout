# B-Atlas v6.56.0 Changelog

## Specification Completion Batch 11

Manufacturers completed:
- Windy
- True North
- Prairie
- Nimble
- Holiday Mansion

### Data corrections

- 53 source-backed field-level updates.
- Windy 26 SN canonical draft and air draft promoted from model-specific evidence.
- Nimble Nomad draft corrected to 16 in; outboard/no-separate-rudder classification added; tankage normalized; representative displacement corrected.
- Nimble Wanderer fixed air-draft fallback removed because the model was sold with and without a lowerable mast.
- Prairie 29 LWL corrected to 26 ft and displacement to 12,000 lb; unsupported air-draft fallback removed.
- Prairie 36 stale imperial length/beam/draft/clearance/displacement shadows reconciled; unsupported LWL fallback removed.
- True North 34 original-diesel LWL/displacement/fuel tankage promoted; unsafe model-wide LOA and air-draft fallbacks removed.
- Holiday Mansion 38 Barracuda Coastal propulsion corrected from shaft-only/sterndrive-only representation to mixed sterndrive/V-drive production.

### Quality principle

v6.56.0 intentionally increases the global LOA missing count by one because conflicting True North 34 overall-length evidence is safer as Unknown than as a nominal 34-foot fallback.

### Validation

- Cross-database QC passed: 259 canonical models / 259 registry identities / 259 aliases / 28 Plan mappings.
- Measurement-normalization tests passed.
- Crawlable pages and sitemap regenerated.
