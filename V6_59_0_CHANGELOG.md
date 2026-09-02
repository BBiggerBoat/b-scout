# B-Atlas v6.59.0 Changelog

## Specification Completion Batch 13

Baseline: v6.58.0

Completed source-backed specification review for Luhrs, Nordhavn, Oceania Yachts, PDQ and Saga.

### Data changes
- 71 field-level corrections/promotions across 5 canonical model records.
- Normalized Luhrs 30 Alura 196/38/15 US gal tankage and corrected stale LWL/propulsion/keel shadows.
- Added Luhrs 30 representative 11-ft bridge clearance.
- Removed unsafe fixed Nordhavn 40 draft/air-draft fallbacks; added 6-ft-3-in saloon headroom and verified 920/220/68 US gal tankage.
- Corrected Oceania 36 Sedan LOA, beam, displacement and single Ford Lehman 120 engine shadows from the original 1980 Canadian test; cleared unsupported LWL/air-draft fallbacks.
- Corrected PDQ 34 LOA/LWL/displacement shadows, added 12-ft-3-in air draft and 6-ft-6-in headroom, classified twin rudders, and normalized 184/80 US gal fuel/water.
- Marked PDQ holding capacity as conflicting (35/38/45 gal across reviewed sources) rather than force one value.
- Corrected Saga 26 HT to mixed shaft/sterndrive propulsion and configuration-dependent hull/keel behavior; removed unsupported fixed draft/LWL/air-draft values.
- Corrected Saga 26 HT fuel to 200 L; water is conflict-marked at 95/105 L and holding remains Unknown.

### Coverage
- Manufacturer specification-completion coverage increased from 60/69 to 65/69.
- 4 manufacturers / 4 models remain for Batch 14: SeaPiper, Sealord, Shannon and Transpacific Marine.

### Generated assets
- Added data/specification-completion-batch-13-v6.59.json.
- Added data/specification-research-queue-v6.59.json.
- Added data/specification-tail-status-v6.59.json.
- Regenerated crawlable knowledge cards, search pages and sitemap from corrected canonical data.

### Validation
- 259 canonical models.
- 259 registry identities.
- 259 search aliases.
- 28 Plan preference mappings.
- Cross-database QC passed.
- Measurement normalization passed.
