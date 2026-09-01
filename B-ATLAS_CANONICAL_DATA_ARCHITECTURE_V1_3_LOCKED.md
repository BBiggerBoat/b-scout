# B-Atlas Canonical Data Architecture v1.3 — GLOBAL POWER + SAIL READY — LOCKED

**Status:** LOCKED for dataset validation  
**Lock date:** 2026-08-31  
**Scope:** Powerboats, sailboats and motorsailers; multilingual and multiple-unit ready.

This supersedes v1.2. The foundational contracts are now designed for global boat data without requiring separate model records by language or measurement system.

## Core layers

```text
MODEL IDENTITY
    ↓
VESSEL CATEGORY
    ↓
CANONICAL FACTS
    ├── Dimensions & capacities
    ├── Hull / underwater appendages
    ├── Mechanical propulsion
    ├── Rig & sail plan
    ├── Layout / accommodation
    └── International classification
    ↓
NORMALIZED CLASSIFICATIONS
    ↓
DERIVED CHARACTERISTICS
    ↓
PREFERENCE MATCHING
```

Evidence is separate:

```text
SOURCES / EVIDENCE ASSERTIONS
            ↕
      CANONICAL FACT STATE
```

Display is separate:

```text
LANGUAGE CATALOGS ──→ UI DISPLAY
UNIT PREFERENCE  ───→ UI DISPLAY
```

## Vessel category

`VesselCategoryCode` distinguishes:
- `vessel.power`
- `vessel.sail`
- `vessel.motorsailer`

`PrimaryPropulsionModeCode` separately describes whether the vessel primarily operates by power, sail, or both.

This prevents a sailboat with a diesel shaft auxiliary from being misclassified as a powerboat.

## Mechanical propulsion

Mechanical propulsion is represented separately by:
- `MechanicalPropulsionCode`
- `AuxiliaryEnginePresent`
- `EngineCount`
- `FuelCode`
- engine power and related machinery fields

A sailboat can therefore be Sail + diesel + shaft/saildrive. An engineless sailboat can mark mechanical fields Not Applicable.

## Sail subsystem

The sail-ready schema includes:
- `RigTypeCode`
- `MastCount`
- `MastMaterialCode`
- `MastSteppingCode`
- `MastLoweringCode`
- `StandingRiggingCode`
- `MainsailTypeCode`
- `HeadsailConfigurationCode`
- `MastHeight`
- `SailArea`
- `Ballast`

Detailed racing rig dimensions (I/J/P/E) are intentionally not core fields yet; they can be added later without structural migration.

## Underwater appendages

`KeelConfigurationCode` now accommodates full/long, fin, modified fin, wing, bulb, shoal, bilge/twin, keel-centerboard, centerboard, daggerboard, lifting, swing and powerboat protective-keel arrangements.

`RudderTypeCode` remains independent from keel type.

## Global identity and classification readiness

Identity now distinguishes:
- Manufacturer (legacy/general)
- Brand
- Builder
- Designer
- Builder country
- Design country
- Model aliases

`CECategoryCode` and certification notes provide international classification readiness without making CE classification mandatory for boats where it is not applicable.

## Units

Canonical storage remains:
- length: metres
- area: square metres
- mass: kilograms
- volume: litres
- power: kilowatts
- speed: knots
- distance/range: nautical miles

Source measurements preserve original value, source unit and source text.

Supported source/display distinctions include feet/inches, metres, litres, US gallons, Imperial gallons, hp, kW, square feet and square metres.

## Language

Canonical enum codes and field IDs are never translated. Display labels live in locale catalogs. English, French, German, Spanish and Portuguese can share the same underlying model record.

## Data classes

- **objective**: source-reported/observable facts
- **normalized**: controlled classification from evidence
- **derived**: versioned calculation from canonical facts
- **editorial**: interpretation with rationale/attribution

## Sail performance metrics

Sail Area/Displacement, Displacement/Length, Ballast Ratio and theoretical Hull Speed are defined as future **derived characteristics**, not raw model facts.

## Preference architecture

Power and sail preferences map to facts or derived rules. Examples:
- skeg-hung rudder → `RudderTypeCode`
- rig preference → `RigTypeCode`
- mast-lowering preference → `MastLoweringCode`
- wheel/tiller → `SteeringTypeCode`
- route fit → derived from dimensions
- shoal-draft preference → derived from Draft + keel information

## Applicability

Unknown and Not Applicable remain distinct.

Examples:
- RigType on a Grand Banks 32 → Not Applicable.
- RigType on a sailboat with no reliable source → Unknown.
- MechanicalPropulsionCode on an engineless daysailer → Not Applicable / none as appropriate to the fact context.

## Change control

From this point:
- field IDs are stable;
- controlled vocabulary codes are stable;
- canonical unit definitions are stable;
- the power/sail subsystem separation is stable;
- future needs should add or deprecate fields/codes, not trigger another structural migration.

This is the schema contract for B-Atlas dataset validation.
