# B-Atlas v6.63.0 — Model Knowledge Score

## Purpose
Replace passive structural coverage with a community-owned success metric that rewards useful model knowledge while keeping evidence quality separate from completeness.

## Score design
- 43 scored fields.
- Weights total exactly 100 points.
- Highest weights are assigned to Plan constraints and interior-fit facts that materially affect a buyer's decision.
- Explicit canonical Unknown values remain missing even when stale legacy shadows exist.
- Unknown never becomes negative evidence about the boat itself.

## Score bands
- 0–39: Starting
- 40–59: Developing
- 60–74: Good
- 75–89: Strong
- 90–99: Excellent
- 100: Complete

## Community contribution loop
The Guide now shows a circular Model Knowledge Score gauge, next goal, evidence strength and the highest-value missing facts. Each missing opportunity deep-links to Contribute with:
- exact canonical model;
- correction/addition contribution type;
- exact field selected;
- projected score impact.

The contribution form tells the contributor what the score could become if the submission is verified. The completion message repeats that prospective impact.

## Missing-field prompts
Core specifications and interior-fit fields expose contextual contribution actions. Owner-measurable fields use prompts such as “Measure yours”; specification fields use “Add a measurement” or “Add what you know.”

## Evidence separation
Model Knowledge Score measures useful recorded knowledge. Evidence strength remains separate and is based on verified-source counts. A model can therefore be highly complete but weakly verified, or sparsely documented but strongly sourced.

## Current distribution
At release time across 259 canonical models:
- average: 67%
- median: 69%
- minimum: 33%
- maximum: 83%
- Starting: 2
- Developing: 26
- Good: 218
- Strong: 13
- Excellent: 0
- Complete: 0

This is intentional. The score should represent a meaningful community goal rather than cosmetic completeness.
