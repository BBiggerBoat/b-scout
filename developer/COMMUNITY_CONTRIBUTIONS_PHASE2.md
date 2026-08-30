# B-Atlas Community Contributions — Phase 2

## Scope

Phase 2 adds contribution entry points only. Detailed submission forms remain Phase 3.

## Implemented

- Global **Contribute** destination replaces My Boats in primary navigation.
- Home lifecycle card now points to community contribution rather than owned-boat management.
- Every Guide exposes **Contribute to this Guide** with model identity carried into the contribution context.
- Contribution landing view reads the Phase 1 taxonomy from `data/contribution-types.json`.
- Contribution choices are grouped as Improve existing knowledge / Add supporting material / Expand B-Atlas.
- Selecting a contribution type creates only a temporary session draft; it does not submit or publish anything.
- Global contributions support missing manufacturer and missing model entry paths.
- Legacy My Boats implementation remains internal but is no longer exposed as an active lifecycle destination.

## Privacy

No account/profile is introduced. No contributor identity is requested in Phase 2.

## Exit criteria

- A user can start contribution from an existing Guide with model context attached.
- A user can start contribution globally when the model/manufacturer may not exist.
- Contribution navigation remains secondary to Plan, Dream and model research.
- No detailed forms or publication logic are implemented ahead of Phase 3.
