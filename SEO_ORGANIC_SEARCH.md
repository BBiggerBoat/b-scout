# B-Scout Organic Search Foundations — v6.23.3

Generated search surfaces:

- `/models/` — permanent crawlable model guides
- `/manufacturers/` — manufacturer model directories (2+ models in current B-Scout data)
- `/boats/` — curated buyer-constraint pages, not arbitrary faceted URLs
- `/compare/` — deliberately limited model comparisons

## Core rule

Do not generate every possible combination of filters. Search landing pages should exist only where the page is a useful buyer destination with a stable URL and a clear purpose.

## Data semantics

Constraint pages list **known matches only**. A model with missing data is not declared unsuitable; it simply cannot be asserted to match that specific public landing page.

## Regeneration

Run `python developer/generate-search-landing-pages.py` after material changes to `boatmodels.json`. Review generated pages before deployment.

## Current generated counts

```json
{
  "version": "6.23.3",
  "generated": "2026-08-17",
  "model_pages": 253,
  "manufacturer_pages": 48,
  "constraint_pages": 23,
  "comparison_pages": 15,
  "sitemap_urls": 344,
  "principle": "Generate stable, useful pages from canonical model data. Do not generate every possible filter or model pair."
}
```
