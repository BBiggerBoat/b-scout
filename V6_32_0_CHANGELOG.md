# B-Atlas v6.32.0 — Production Phase / Generation Architecture

- Added Canonical Architecture v1.4 as an additive extension to the locked v1.3 field model.
- Added `ProductionPhase` as a layer beneath canonical model identity.
- Added production-phase JSON Schema and phase registry.
- Added initial Grand Banks 32 Sedan, 36 Classic and 42 Classic phase records.
- Wood/fiberglass transitions are represented as phases, not artificial duplicate models.
- Original/enlarged Grand Banks hulls are represented as phase-scoped dimensional overrides.
- Transition years can overlap; B-Atlas now treats unresolved boundary-year phase selection as ambiguous rather than guessing.
- Added runtime phase resolution by year and known hull material.
- Added Production Evolution display to the model Guide.
- Extended evidence/canonical-fact schemas for production-phase scope and applicability.
- No Preference Match percentage formula changes.
- No Mainship, Monk or Island Gypsy validation performed yet.
