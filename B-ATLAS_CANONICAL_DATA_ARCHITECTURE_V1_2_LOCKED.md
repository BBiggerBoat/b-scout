> **SUPERSEDED by v1.3. Do not use for new validation.**

# B-Atlas Canonical Data Architecture v1.2 — LOCKED

**Status:** LOCKED for dataset validation  
**Lock date:** 2026-08-31

This version supersedes v1.1. The schema may gain new fields later, but the foundational contracts below should not require another structural migration.

## 1. Layered architecture

```text
MODEL IDENTITY
    ↓
CANONICAL FACTS
    ↓
NORMALIZED CLASSIFICATIONS
    ↓
DERIVED CHARACTERISTICS
    ↓
PREFERENCE MATCHING
```

Evidence operates alongside the fact layer:

```text
SOURCES / EVIDENCE ASSERTIONS
            ↕
      CANONICAL FACT STATE
```

Display concerns remain separate:

```text
LANGUAGE CATALOGS ──→ UI DISPLAY
UNIT PREFERENCE  ───→ UI DISPLAY
```

Neither display language nor display unit changes the underlying model data.

## 2. Field IDs are semantic, not unit-bearing

Canonical fields are named for what they mean:

- `LOA`
- `Beam`
- `Draft`
- `Displacement`
- `FuelCapacity`
- `EnginePowerPerEngine`

The canonical unit is declared in `data/field-registry.json`, not embedded in the field name.

Examples:

| Field | Canonical internal unit |
|---|---|
| LOA / LWL / Beam / Draft / AirDraft / Headroom | metre (`m`) |
| Displacement | kilogram (`kg`) |
| Fuel / water / holding capacity | litre (`L`) |
| Engine power | kilowatt (`kW`) |
| Cruise / maximum speed | knot (`kn`) |
| Range | nautical mile (`nm`) |

## 3. Language-neutral controlled values

Stored values are stable codes such as:

- `fuel.diesel`
- `propulsion.shaft`
- `rudder.skeg_hung`
- `keel.full_long`

These identifiers are **immutable data IDs**, not English display text. Human labels are in `data/i18n/<locale>.json`.

Target locales are English, French, German, Spanish and Portuguese. Only English needs to be populated now.

## 4. Data classes

Every canonical field has a `dataClass`:

### objective
Directly observable or source-reported fact:
- Beam
- EngineCount
- RudderTypeCode
- AftCabin
- SideHelmDoor

### normalized
A controlled classification assigned from factual evidence:
- HullBehaviourCode
- BoatFamilyCode
- KeelConfigurationCode

### derived
Calculated by a versioned rule:
- Trailerability
- route fit
- tall-crew fit
- overnight-capacity fit

Derived characteristics are not casually stored as raw facts.

### editorial
Interpretive judgments requiring rationale and attribution. These remain separate from objective specifications.

## 5. Facts and evidence are separate

The model record contains the currently accepted canonical value.

`canonical-fact.schema.json` records the selected state for one field and links to evidence.

`evidence-assertion.schema.json` stores individual source assertions. Multiple sources may support, disagree with, or contextualize the canonical value.

This allows B-Atlas to represent disagreement without overwriting source history.

## 6. Measurement provenance

A source measurement preserves:

- source value
- source unit
- source text
- source language
- normalized candidate value
- conversion rule
- source reference

Example:

```text
Source: 100 Imp gal
SourceValue: 100
SourceUnit: imp_gal
Canonical candidate: 454.609 L
```

A source saying only `100 gal` is unresolved until the gallon system is established. B-Atlas does not guess.

Feet/inches, metres, litres, US gallons, Imperial gallons, hp and kW are explicitly supported. Knots and nautical miles remain marine-standard.

## 7. Preference mapping

Preferences are defined in `data/preference-map.json`.

A preference can be:

- **direct** — matched against a canonical field, or
- **derived** — calculated from multiple canonical facts.

Example:
- `skeg_hung_rudder` → `RudderTypeCode = rudder.skeg_hung`
- `route_fit` → derived from LOA, Beam, Draft and AirDraft
- `tall_crew` → derived primarily from Headroom and later additional ergonomics facts

This prevents subjective preference questions from polluting the factual schema.

## 8. Unknown-state contract

At every layer:

- unknown ≠ no
- unknown ≠ false
- conflicting ≠ unknown
- not applicable ≠ unknown

Missing data reduces confidence; it does not eliminate a model.

## 9. Migration policy

The existing 253-model dataset is **not bulk-converted by inference**.

During validation:
1. inspect source/evidence,
2. normalize the value,
3. write the semantic canonical field,
4. preserve source measurement and source text,
5. retain legacy compatibility during transition.

Legacy aliases remain readable until migration is complete.

## 10. Change-control policy

From this point:
- canonical field IDs are stable;
- enum codes are stable;
- unit definitions are stable;
- data classes are stable concepts;
- future changes should add/deprecate/map rather than rename existing IDs.

This is the schema contract against which the model dataset should now be validated.
