# B-Atlas Cross-Database Quality-Control Pass — v6.44.0

**Date:** 2026-09-02  
**Baseline:** v6.43.0  
**Scope:** canonical field conflicts, identity synchronization, duplicate/successor/combined records, and Plan/filter canonical-data verification.

## Release result

The v6.43.0 manufacturer validation produced 259 canonical model rows, but downstream identity/search artifacts had drifted behind the canonical database. v6.44.0 repairs that synchronization and makes the Plan exclusion engine explicitly canonical-first.

### Cross-database synchronization

- Canonical model records: **259**
- Unique canonical BoatModelIDs: **259**
- Registry records after QC: **259 / 259 unique**
- Search-alias records after QC: **259 / 259 unique**
- Canonical IDs missing from registry: **0**
- Canonical IDs missing from search aliases: **0**
- Canonical IDs missing from generated public model pages: **0**

The v6.43.0 baseline contained eight canonical IDs missing from the registry, six missing from search aliases/model pages, and three duplicate-ID collisions inside the registry. These were synchronization defects, not model-research uncertainties.

## Canonical Plan/filter verification

The live hard-filter path now uses canonical values first and legacy values only as fallbacks:

- length → `LOA` (SI canonical), then legacy feet
- beam → `Beam` (SI canonical), then legacy feet
- hull behaviour → `HullBehaviourCode`
- boat family → `BoatFamilyCode`
- fuel → `FuelCode`
- propulsion → `MechanicalPropulsionCode`
- engine arrangement → `EngineCount`
- side decks → `SideDecksCode`

Feature matching now also recognizes canonical `AftCabin`, `SideDecksCode`, `KeelConfigurationCode`, and `ShowerTypeCode` values.

A regression test deliberately supplies contradictory legacy fields. The canonical values must win. A second test supplies no known facts; the model must remain eligible. Both pass.

## Identity QC

### Corrected

- Registry duplicate BoatModelID collisions were removed by rebuilding one registry identity per canonical model while preserving useful aliases.
- Missing identities from the Antares 9, Cruisers 3260/3270, Krogen 44/44 AE, Meridian 341 and Sea Ray 340 generation splits were propagated to registry/search/page artifacts.
- The pre-AE `KDKR-44` record retained stale 44 AE nickname/research text after the split. It is now explicitly the **Krogen 44 Trawler / Classic (2004–2012)** predecessor.

### Intentionally retained rename/successor composites

Slash-separated names are not automatically treated as errors. Prior manufacturer validation supports several as marketing renames or continuous hull lineages (for example Camano 28→31 and Sea Ray 390→40 MY). These remain canonical single identities where builder/model continuity is established.

### Still unresolved: Sea Sport 27

`SSPT-27` currently combines Seamaster, Navigator and Pilot. Period evidence confirms that these were three separately marketed deck/cabin arrangements sharing the same 27-foot hull. Their accommodation facts are materially different. This pass therefore keeps the record flagged for a dedicated identity split rather than fabricating three complete records from family-level facts.

## Unresolved canonical-field migration

The principal remaining schema-level conflict is **tankage units**. `FuelCapacity`, `WaterCapacity`, and `HoldingCapacity` originated as gallon-valued legacy fields, while the newer canonical architecture defines volume in litres. Manufacturer-validation batches have begun writing SI values, so the dataset now contains both semantics under the same field names.

This release does **not** bulk-convert these fields. Unit state must be made explicit before canonical tankage can safely participate in calculations or standardized display. Tankage is not currently a Plan elimination field, so retaining the ambiguity is safer than guessing.

## Release gate

**PASS** for v6.44.0 cross-database identity synchronization and canonical Plan/filter behavior.

**Deferred data-health item:** explicit unit migration for tankage fields.  
**Deferred identity item:** dedicated Sea Sport 27 Seamaster / Navigator / Pilot split review.
