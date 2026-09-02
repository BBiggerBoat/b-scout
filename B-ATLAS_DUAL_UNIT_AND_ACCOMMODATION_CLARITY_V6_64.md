# B-Atlas v6.64.0 — Dual Units and Accommodation Clarity

## Purpose
Simplify measurement presentation and make interior-fit facts self-explanatory.

## Changes
- Removed the global Imperial / Metric / Both display selector.
- User-facing converted measurements now display Imperial / Metric together, separated by `/`.
- Unverified gallon-basis values are not converted; they explicitly state that the metric equivalent is not verified.
- Accommodation and Systems is divided into Accommodation, Tankage, and Headroom / Interior Fit subsections.
- Headroom labels identify the measurement location: Saloon/main cabin headroom, Helm headroom, Galley headroom, Head compartment headroom, and Forward cabin headroom.
- V-berth usable length remains a separate fit measurement.
- Measurement contributions require an explicit unit selection. No unit is preselected.
- Existing canonical storage remains SI/metric and source units remain preserved in provenance.

## Design rule
Reading should require no unit-mode interaction. Data entry must identify its unit explicitly; storage normalization remains internal.
