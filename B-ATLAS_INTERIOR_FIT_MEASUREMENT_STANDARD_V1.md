# B-Atlas Interior Fit Measurement Standard v1

## Purpose

A single interior headroom figure is not sufficient for cruising-fit decisions. B-Atlas therefore stores location-specific interior dimensions where evidence supports them.

## Canonical fields

All measurements are stored canonically in metres and displayed in Imperial, Metric or Both according to the user's unit preference.

- `Headroom` — published/general interior headroom when the source does not identify a location. Do not assume that it applies everywhere.
- `HeadroomSalon` — saloon/main-cabin standing headroom.
- `HeadroomHelm` — standing headroom at the normal helm operating position.
- `HeadroomGalley` — standing headroom at the main cooking/preparation position.
- `HeadroomHead` — standing headroom in the head compartment near the normal toilet/sink position.
- `HeadroomForwardCabin` — standing/dressing headroom in the forward cabin.
- `VBerthLength` — usable sleeping length on the berth/mattress surface.

## Measurement method

### Headroom

Measure vertically from the finished sole/deck surface to the lowest fixed overhead at the stated normal standing position.

Do not:
- measure through an open hatch;
- remove normal trim, liners or floor coverings;
- use the highest point in the compartment if it is not where a person normally stands.

If a hatch, beam, liner, step or deck camber creates materially different clearances, record the normal-use measurement and explain the variation in the contribution notes.

### Helm

Measure where a person normally stands to operate the controls. If the helm is intended only for seated operation, say so in the contribution explanation rather than inventing a standing value.

### Galley

Measure at the primary cooking/preparation location, normally in front of the stove, sink or principal work surface.

### Head

Measure at the normal standing area near the toilet/sink. If shower headroom differs materially, record that in the explanation. A future dedicated shower-headroom field can be added if contribution volume justifies it.

### Forward cabin

Measure at the normal dressing/standing area. Do not substitute clearance above the berth mattress unless there is no standing floor area; if so, explain the measurement location.

### V-berth length

Measure usable sleeping length on the cushion/mattress surface along the longest practical sleeping axis. Because V-berths taper, include the exact measurement location in the explanation when useful.

## Contribution context

Model year and variant remain optional globally, but contributors should provide them when interior mouldings, floors, liners, pilothouses or layouts changed during production. Refit status should be explained whenever a modification may have altered the measurement.

Community measurements are evidence, not automatic canonical truth. They enter the moderation workflow and can be compared with manufacturer literature, surveys, additional owner measurements and production-phase information.
