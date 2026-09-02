# v6.49.0 Changelog

## Specification Completion Batch 04

- Completed source-backed specification work for CHB, Back Cove, Cape Dory, Rosborough, and Nordic Tugs.
- Applied 41 total corrections/promotions: 20 canonical gap resolutions and 21 legacy/imperial shadow-field reconciliations.
- Reduced missing canonical fields to: LOA 17, LWL 127, Beam 16, Draft 25, AirDraft 134, Displacement 32, Fuel 5, Mechanical Propulsion 2, Hull Behaviour 0, Keel Configuration 91, Rudder Type 213.
- Added Back Cove 26 and 41 canonical displacement values and reconciled stale displacement shadows across selected Back Cove records.
- Classified Back Cove 39O and relevant Rosborough RF-246 configurations as having no separate rudder because steering is through outboard/sterndrive units.
- Added Cape Dory bridge-clearance values for selected 28/30/33/36 models and corrected Cape Dory 36 fuel to mixed gasoline/diesel configuration history.
- Added Rosborough RF-246 LWL and protective center-keel classification while retaining configuration-dependent draft as unresolved.
- Added Nordic Tug 39 LOA/LWL and reconciled Nordic Tug 37 displacement shadow.
- Preserved unresolved Nordic Tug air-draft differences where mast/flybridge/antenna configuration changes the effective clearance.
- Regenerated specification research queue as `data/specification-research-queue-v6.49.json`.
- Added provenance file `data/specification-completion-batch-04-v6.49.json`.
- Regenerated derived knowledge/developer outputs.
- Cross-database QC and measurement-normalization tests pass.
