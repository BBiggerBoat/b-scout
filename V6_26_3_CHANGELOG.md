# B-Atlas v6.26.3 — Brand, Consistency & Moderator Test Repair

## Brand
- Added the approved B-Atlas logo to the persistent site header.
- Preserved the approved navy / medium-blue / black visual palette.
- Added cache-busted logo and core asset references for this release.

## Page consistency
- Standardized the top-level page width, top spacing, eyebrow position, H1 scale, colour and subtitle treatment for Home, Plan and Contribute.
- Aligned Dream/Research results heading treatment with the same visual hierarchy.
- Standardized About information typography with the same medium-blue top-level title treatment.
- Added scroll offsets so fixed-header navigation no longer masks or shifts page headings.
- Removed redundant top-level Back links from Plan, Contribute and About; contextual modal/workspace Back controls remain where they represent real hierarchy.

## Contribute
- Rebuilt contribution card spacing, alignment, font hierarchy and minimum heights for a cleaner grid.
- Standardized section spacing and the evidence/privacy callout.

## Moderator workflow
- Moderator test mode now recognizes direct local-file testing (`file:`), in addition to localhost and explicit moderator/developer modes.
- Renamed exported moderator queue filenames/schema labels to B-Atlas terminology.
- Shared moderation still requires an actual running/deployed backend; GitHub Pages alone cannot host the `/api` service.

## Match scoring
- No changes were made to Preference Match percentages or fit logic in this release.
