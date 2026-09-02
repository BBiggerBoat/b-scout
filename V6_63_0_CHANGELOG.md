# v6.63.0 — Model Knowledge Score + Contextual Contribution

- Replaced the passive “Knowledge confidence / structural coverage” card with a circular Model Knowledge Score gauge.
- Added score bands: Starting, Developing, Good, Strong, Excellent and Complete.
- Added a community goal showing the next score threshold.
- Added 43 weighted buyer-useful facts totaling 100 score points.
- Gave highest weighting to Plan constraints and interior-fit measurements.
- Kept evidence strength separate from completeness.
- Added highest-impact missing-fact contribution prompts directly inside the score card.
- Added direct contribution prompts to core Guide specification fields as well as the v6.61 interior-fit fields.
- Deep-links carry the exact model, exact field and projected score impact into Contribute.
- Contribution form and submission result explain the potential score increase if the fact is verified and accepted.
- Preserved v6.62 canonical-Unknown precedence: stale legacy fields do not earn score credit for Plan-critical researched Unknowns.
- Added developer/test-model-knowledge-score.js.
- Cross-database QC, measurement normalization, Plan-critical regression tests and Knowledge Score tests pass.
