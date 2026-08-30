# B-Atlas search indexing setup — v6.23.1

Public site: https://bbiggerboat.github.io/b-scout/

## Added

- Descriptive page title and meta description on `index.html`
- `index, follow` robots meta directive on the public application
- Canonical URL for the GitHub Pages address
- Basic Open Graph metadata
- `WebSite` JSON-LD structured data
- `robots.txt` with a sitemap reference
- `sitemap.xml` containing the canonical public application URL
- `noindex, nofollow` on moderator/developer utility HTML pages

## Important architecture note

B-Atlas is currently a single-page application. `#plan`, `#dream`, model Guide states, and similar hash-based views are not separate crawlable documents, so the sitemap intentionally contains the canonical homepage only.

For search traffic to individual boat models later, create crawlable permanent model URLs/pages (for example `/models/grand-banks-32-classic/`) instead of relying only on client-side application state.

## After deployment

1. Verify the GitHub Pages deployment contains `/robots.txt` and `/sitemap.xml`.
2. Add the site to Google Search Console as a URL-prefix property.
3. Submit `https://bbiggerboat.github.io/b-scout/sitemap.xml`.
4. Inspect `https://bbiggerboat.github.io/b-scout/` with URL Inspection and request indexing.
5. Monitor the Page indexing and Performance reports.
