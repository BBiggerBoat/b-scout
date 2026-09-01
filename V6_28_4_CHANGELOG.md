# B-Atlas v6.28.4 — Canonical Correction Visibility Repair

- Added Rudder and other canonical hull/propulsion fields to the model Knowledge specification view.
- Model specification display now prefers canonical correction fields over legacy fields.
- Shower display now prefers `ShowerTypeCode` over legacy free-text `Shower`.
- Canonical enum codes are converted to human-readable display text.
- Correction field dropdowns no longer expose technical `Code` suffixes even if a locale label fails to load.
- Current correction values display human labels rather than raw enum codes.
- Shared moderator decisions now automatically refresh/publish public overlays after save.
- The manual Publish control remains available for explicit republishing/recovery.
- No Preference Match percentage logic changed.
- No bulk dataset migration performed.
