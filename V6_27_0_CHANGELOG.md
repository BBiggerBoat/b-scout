# B-Atlas v6.27.0 — Domain & Indexing Migration

Date: 2026-08-31

## Primary-domain migration

- Migrated all public canonical URLs from the GitHub Pages project URL to `https://b-atlas.org/`.
- Migrated Open Graph URLs and Schema.org URLs to the B-Atlas domain.
- Added/confirmed `CNAME` = `b-atlas.org`.
- Updated `robots.txt` to reference the B-Atlas sitemap.
- Updated all sitemap URLs to `https://b-atlas.org/`.
- Updated sitemap `lastmod` because every public page received a material canonical/metadata change in this release.
- Kept all existing public URL paths stable to preserve search equity.

## Search & machine discovery

- Added consistent `og:site_name`, representative `og:image`, and social metadata to public crawlable pages.
- Added stable Schema.org `@id`, `inLanguage`, `dateModified`, and `WebSite` relationships.
- Added `BreadcrumbList` structured data where visible breadcrumbs exist.
- Added `llms.txt` as a supplemental machine-readable B-Atlas description and citation guide.
- Explicitly allows OAI-SearchBot and ChatGPT-User in `robots.txt`; all normal search crawlers remain allowed.
- Updated the search-page generator to use `https://b-atlas.org/` and dynamic generation dates.

## IndexNow

- Preserved the existing IndexNow key file.
- Added `developer/submit-indexnow.js`.
- Added `npm run indexnow` for post-deployment URL submission.

## Documentation

- Rewrote `SEO_INDEXING.md` for the B-Atlas domain migration, Search Console, Bing and IndexNow workflow.

## Not changed

- GitHub repository remains `BBiggerBoat/b-scout`.
- Public path slugs were not renamed.
- Preference Match logic and model data were not changed.
- Contributor/moderator deployment is a separate next phase.
