# B-Atlas Measurement Normalization v1.5 — LOCKED

## Core rule
B-Atlas stores physical measurements in one canonical unit system and formats them for the user's selected display profile. Display units must never change the underlying model identity or Plan result.

## Canonical units
- Length: metres (m)
- Mass/displacement: kilograms (kg)
- Volume: litres (L)
- Power: kilowatts (kW)
- Speed: knots (kn)
- Distance: nautical miles (nm)

## User display profiles
- Imperial: ft/in, lb, US gal only when the gallon basis is verified
- Metric: m, kg, L
- Both: Imperial / Metric side by side

The preference is stored as `batlas.unitProfile` and is site-wide.

## Length fields
`LOA` and `LWL` are separate canonical measurements.

- **LOA — Length Overall:** primary B-Atlas length and the Plan length constraint. Used for marina/storage/transport suitability unless a route or facility defines a different measurement basis.
- **LWL — Length at Waterline:** research/specification field. Used for design/performance understanding; it does not replace LOA in Plan.
- Beam, Draft, AirDraft and Headroom follow the same unit-display system.

## Plan compatibility
Plan continues to store length/beam search settings internally in feet in v6.45.0 for backward compatibility with saved searches and route data. Metric input is converted at the input boundary. Model evaluation continues to prefer canonical model measurements through the compatibility layer.

A future search-state migration may convert Plan state itself to SI, but it must preserve existing saved profiles and route constraints exactly.

## Capacity safety rule
Legacy tankage contains mixed semantics. A naked numeric value is not display-safe.

Until source units are verified:
- a value known only as `gal` is displayed as `gal (US/Imperial basis unverified)`;
- conflicting legacy values are shown as a conflict, not converted;
- a value explicitly verified in litres may be converted to the selected display profile;
- US and Imperial gallons remain distinct unit codes.

No guessed conversion is allowed.

## Unknown-data rule
Missing measurements stay unknown. Unit conversion or normalization must never create a model fact that was not present in source-backed data.
