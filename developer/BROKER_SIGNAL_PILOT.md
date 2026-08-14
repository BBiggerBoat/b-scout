# Broker Signal Pilot v1

Automated broker checks are limited to:

- United City Yachts
- Pop Yachts
- Denison Yachting

The checker opens each broker's official inventory page and uses a source-specific adapter to inspect listing links for canonical manufacturer and model aliases.

## Conservative classifications

- `ListingLikely`: a broker adapter found a listing link containing both manufacturer and model evidence.
- `NoListingIndicated`: only used when the page explicitly reports zero results. Absence from a broad inventory page is not enough.
- `SourceUnavailable`: navigation, HTTP, blocking, certificate, or adapter failure.
- `Inconclusive`: the page loaded but a matching listing could not be confirmed.

No manual counts or statuses are permitted. Until the live Playwright validator runs, records remain `CheckPending`.
