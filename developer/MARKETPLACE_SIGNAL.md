# Marketplace Listing Signal v1

This proof of concept answers one question: **is a marketplace link worth opening?**

It does not count boats, verify unique listings, or depend on manually entered results.

## Supported pilot sources

- YachtWorld Canada
- YachtWorld USA
- boats.com Canada
- boats.com USA
- Boat Trader
- BoatDealers.ca

## Supported pilot models

The five representative model records are defined in `developer/marketplace-signal-config.json`.

## Statuses

- `ListingLikely`: positive model and listing evidence was found.
- `NoListingIndicated`: the destination explicitly reported zero results.
- `SourceUnavailable`: error, block, timeout or inaccessible destination.
- `Inconclusive`: the page loaded but evidence was insufficient.
- `CheckPending`: no automated result exists yet.

Missing evidence never becomes a negative result. Only an explicit zero-result message produces `NoListingIndicated`.

## Run locally

```bash
npm install
npm run test:marketplace-signal
npm run validate:marketplaces
```

The live validator writes `data/marketplace-source-validation.json`. The static website reads that generated file.

The proof of concept must be reviewed for repeatability before unattended scheduling is enabled.

## All-model coverage

Search aliases and pending validation records are generated for every canonical record in `boatmodels.json`.

- Generate aliases: `npm run generate:search-aliases`
- Run all configured checks: `npm run validate:marketplaces`
- Test one model: `node developer/validate-marketplace-signals.js --model=BAYL-3270`
- Test one source: `node developer/validate-marketplace-signals.js --source=BOATS_COM_CA`
- Limit a trial run: `node developer/validate-marketplace-signals.js --limit=5`

The full matrix is 287 models × 9 automated sources = 2,583 checks. Run small batches during reliability testing. Generated statuses remain `CheckPending` until the automated validator actually runs; no human audit values are inserted.
