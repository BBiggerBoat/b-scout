# B-Atlas Community Contributions — Phase 4

## Scope

Phase 4 adds structured owner photo contributions without adding public publication or a shared moderation backend.

## Photo contribution fields

- Canonical model (Guide context or global model selection)
- Model year — optional
- Variant/layout — optional
- Photo category — required
- Original/refitted status — optional
- Caption/useful detail — optional
- Display name — optional
- Clarification email — optional and private
- Photo rights status — required

## Categories

Exterior, Helm, Salon, Galley, Cabin/berth, Head, Engine room, Mechanical, Deck, Storage, Layout/detail, Other.

## Rights

The contributor must state either that they took the photo or that they have permission to share it. The form explicitly warns against uploading broker, marketplace, manufacturer, magazine or other third-party imagery without permission.

## Prototype file storage

Contribution metadata continues to use `localStorage` under `bscoutPendingContributionsV1`. Image blobs are stored separately in IndexedDB database `bscoutContributionAttachmentsV1`, object store `files`, and are referenced by `AttachmentRefs` in the contribution record.

This keeps large image files out of localStorage and establishes an attachment abstraction that can later be replaced by shared moderation storage. No photo is represented as having reached B-Atlas while the site remains static.

## File rules

- One photo per contribution
- JPEG, PNG, WebP, HEIC or HEIF
- Maximum 12 MB
- JPEG/PNG/WebP receive an in-browser preview where supported

## Guide behavior

A photo contribution opened from a Guide automatically inherits the canonical model identity. Year and variant remain optional.

## Exit criteria

- Photo is a live contribution type rather than a future placeholder.
- Photo classification is structured.
- Rights declaration is mandatory.
- Attribution remains optional.
- Photo content is separated from contribution metadata.
- No image is automatically published or added to canonical Guide assets.
