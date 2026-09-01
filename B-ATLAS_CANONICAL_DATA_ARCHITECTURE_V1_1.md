> **SUPERSEDED by v1.2. Do not use for new validation.**

# B-Atlas Canonical Data Architecture v1.1

## Decision
The canonical schema is now multilingual-ready and unit-neutral before dataset validation begins. No translation rollout or site-wide unit selector is included in this release.

## Language architecture
- Boat/model rows contain factual values only.
- Controlled values are stable codes such as `fuel.diesel`, `rudder.skeg_hung`, and `propulsion.shaft`.
- Human-readable labels are referenced by translation keys and live outside the canonical data in `data/i18n/<locale>.json`.
- English is active now. French, German, Spanish and Portuguese are declared supported targets and can be added without copying or restructuring model records.
- Manufacturer/model proper names and source quotations remain in their source/original language where appropriate.

## Measurement architecture
Canonical storage uses:
- length: metres (`m`)
- mass/displacement: kilograms (`kg`)
- liquid capacity: litres (`L`)
- engine power: kilowatts (`kW`)
- speed: knots (`kn`)
- range/distance: nautical miles (`nm`)

Display conversion is separate from storage. Future profiles are defined as Imperial, Metric and Both. Imperial display uses feet/inches, pounds, US gallons and hp; source Imperial gallons remain explicitly distinct.

### Source preservation
A normalized fact must be able to preserve all of:
- canonical `Value` + canonical `Unit`
- `SourceValue`
- `SourceUnit`
- `SourceText`
- source reference/evidence

Example: a brochure stating `100 Imp gal` may normalize to `454.609 L`, while retaining `100`, `imp_gal`, and the original text. A source that merely says `100 gal` is **not converted** until the gallon type is resolved.

## Canonical field examples
| Meaning | Canonical field | Legacy examples |
|---|---|---|
| LOA | `LOA_m` | `LOA_ft`, `LengthFt` |
| Beam | `Beam_m` | `Beam_ft`, `BeamFt` |
| Displacement | `Displacement_kg` | `Displacement_lb` |
| Fuel capacity | `FuelCapacity_L` | `FuelCapacity`, `FuelCapacityGal` |
| Fuel | `FuelCode` | `NormalizedFuel`, `Fuel` |
| Propulsion | `PropulsionCode` | `NormalizedPropulsion`, `Propulsion` |
| Rudder | `RudderTypeCode` | `RudderType` |

## Migration rule
Do not mechanically overwrite the 253-model dataset. During validation, verify each model and write canonical values. Legacy fields remain readable during transition. Runtime adapters prefer canonical values when present.

## Correction workflow
For measurement corrections, contributors supply a value **and source unit**. The API converts the submitted measurement to the canonical internal unit and retains the original value/unit in the moderation record. Controlled specifications submit language-neutral codes.
