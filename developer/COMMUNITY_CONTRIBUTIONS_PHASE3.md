# B-Scout Community Contributions — Phase 3

## Scope

Phase 3 adds short, type-specific contribution forms for knowledge contributions. It does not publish community content or connect a shared moderation backend.

## Implemented forms

- Ownership experience
- Problem or weakness
- Buyer inspection advice
- Correction to B-Scout information
- Something else

## Model attachment

Contributions started from a Guide inherit that canonical model identity. Global knowledge contributions require selection of an existing canonical model where the contribution type is model-specific. Model year and variant remain optional.

## Corrections

For common canonical fields, the correction form reads the current value from `boatmodels.json` after model selection. A correction records the current value and proposed value; it never writes directly to canonical data.

## Prototype submission storage

The site is currently static. Valid Phase 3 submissions are serialized into the Phase 1 contribution shape and written to browser `localStorage` under `bscoutPendingContributionsV1`. This proves form validation and the data contract without creating a false shared submission service.

Phase 7 will replace this storage adapter with the shared moderation queue. Until then the interface explicitly tells the contributor that the record is local to the browser and has not reached a shared review queue.

## Privacy

No login is required. Display name and contact email are optional. Contact email is marked private and is not intended for public rendering.

## Deferred contribution forms

- Photos — Phase 4
- Manuals/documents/resources — Phase 5
- Missing models/manufacturers — Phase 6

## Exit criteria

- Each Phase 3 knowledge type has a short tailored form.
- Required fields are limited to information needed to interpret the submission.
- Unknown year/variant remains acceptable.
- Guide context is preserved automatically.
- Global model-specific submissions resolve against the canonical model catalog.
- Corrections preserve current and proposed values as evidence.
- No contribution can modify canonical B-Scout data automatically.
