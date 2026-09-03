# B-Atlas v6.68.0 — Navigation and Persistent Header Fix

## Purpose
Restore two previously agreed interface decisions that regressed during later data/resource releases.

## Primary navigation
The user-facing primary navigation is now:

**Home | Find Your Boat | Boat Models | Saved Models | Help Build B-Atlas | About**

Internal action IDs remain `plan`, `dream`, and `contribute` to avoid unnecessary routing/data changes. Only the user-facing terminology changes.

## Persistent header
The interactive application header is fixed at the top on desktop/tablet. The previous cascade allowed the last-loaded design stylesheet to set the header to `position: sticky` while the body still carried fixed-header top padding. That combination could create a blank band above the header and inconsistent scroll behaviour in Model Guides.

The final loaded stylesheet now explicitly owns the header position. Desktop/tablet uses a stable fixed header; small screens use sticky positioning to accommodate a wrapped/scrollable navigation row without guessing its height.

## Static/indexable pages
Generated model and discovery pages using the compact B-Atlas header now expose the same navigation terminology and route back into the interactive app for Plan/Saved/Contribution/About actions. Their compact header is sticky.

## Scope
No canonical boat data, resource records, scoring weights, contribution records, or Plan filtering semantics were changed.
