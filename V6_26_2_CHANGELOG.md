# B-Atlas v6.26.2 — Refinement Repair

This repair release moves the v6.26.1 visual refinements into the long-standing core stylesheet (`styles.css`) and adds cache-busting asset versions in `index.html`. This avoids relying solely on the newly introduced design-system override file.

## Included
- Fixed header, permanently visible while scrolling between views.
- Narrower typography range and larger/darker supporting copy.
- Medium-blue accent for primary headings and Plan progress.
- PLAN/DREAM labels flattened and Home choices boxed.
- Lighter-weight Plan option descriptions.
- Stronger Specific Waterways panel with internal rules removed.
- High-contrast blue Next button with white type.
- Constrained boat-family visuals so images cannot overlap copy.
- Engine icons/decorative engine block removed.
- Smaller Research action buttons with white labels; model names more prominent.
- Hide Models Without Images retired.
- Search button converted from green to B-Atlas blue.
- Cache-busting query strings applied to primary CSS/JS assets.

## Behaviour
- Previous/Next navigation logic retained from v6.26.1.
