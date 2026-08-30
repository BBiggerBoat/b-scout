# B-Atlas Community Contributions — Phase 7

## Objective

Provide one moderation surface for all ten contribution types while preserving the rule that community submissions never change canonical model data automatically.

## Admin review console

`developer/contribution-review.html`

The console reads the existing browser-local contribution queue and supports:

- Pending / reviewed counts
- Status filtering
- Contribution-type filtering
- Full-text queue search
- Full structured contribution review
- Optional private contact review
- Source link review
- Local image/PDF attachment preview or download when the attachment exists in the same browser
- Export and import of contribution JSON records

## Moderator actions

- Approve
- Merge with existing knowledge
- Accept as canonical correction
- Create canonical manufacturer/model/knowledge item
- Needs clarification
- Reject
- Return a reviewed item to Pending

`Corrected` and `Created` are stored as review actions while the contribution's moderation status becomes `approved`, preserving the Phase 1 moderation-status vocabulary.

## Canonical protection

Phase 7 records editorial decisions only. It does not directly modify:

- `boatmodels.json`
- manufacturer registry data
- Guide content
- knowledge items

Those changes remain deliberate editorial/data operations. Later phases may provide controlled application of approved decisions.

## Static-site limitation

The current B-Atlas prototype has no server-side submission endpoint or shared database. Consequently:

- contributions created in one visitor's browser cannot appear automatically in the administrator's browser;
- the review console currently reviews records stored on the same browser/origin;
- JSON import/export can move contribution records for testing, but does not include IndexedDB attachment blobs.

The moderation UI and record lifecycle are intentionally isolated from the storage transport so a future shared queue can replace browser-local storage without redesigning the contribution forms or review decisions.

## Privacy

No profile or account is required. Optional contact email remains private and is visible only in the moderator detail view.
