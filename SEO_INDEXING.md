# B-Atlas Domain & Search Indexing — v6.27.0

Primary public site: https://b-atlas.org/

## Canonical-domain migration

All public canonical URLs, Open Graph URLs, JSON-LD URLs, sitemap locations and robots sitemap references now use `https://b-atlas.org/`. The GitHub repository remains `BBiggerBoat/b-scout`; the repository name is not a public canonical URL.

The repository includes a `CNAME` file containing `b-atlas.org`, which keeps GitHub Pages bound to the custom domain and allows GitHub Pages to consolidate requests onto the custom domain.

## Crawlable search surfaces

- `/models/` — permanent model guides
- `/manufacturers/` — manufacturer directories
- `/boats/` — curated buyer-constraint pages
- `/compare/` — selected model comparisons
- `/sitemap.xml` — all stable crawlable URLs

Each public page has a canonical URL, description, Open Graph metadata, Twitter metadata and Schema.org structured data. Pages with visible breadcrumbs also expose `BreadcrumbList` structured data.

## Crawler access

`robots.txt` allows public crawling and points to `https://b-atlas.org/sitemap.xml`. OAI-SearchBot and ChatGPT-User are explicitly allowed. The general `User-agent: *` rule already permits search engines such as Google and Bing.

`llms.txt` is included as a supplemental machine-readable description of B-Atlas and its permanent research surfaces. It does not replace normal crawling, structured data or the sitemap.

## After deployment

1. Confirm `https://b-atlas.org/` loads over HTTPS and `https://www.b-atlas.org/` redirects to the apex domain.
2. Confirm `https://b-atlas.org/sitemap.xml` and `https://b-atlas.org/robots.txt` are publicly accessible.
3. In Google Search Console, create/verify the `b-atlas.org` Domain property if it is not already present. Submit `https://b-atlas.org/sitemap.xml`.
4. Use URL Inspection on the homepage, `/models/`, and several high-value model pages and request indexing.
5. In Bing Webmaster Tools, add/verify `b-atlas.org`, submit the sitemap, and use URL Submission / IndexNow after deployment.
6. Monitor indexing for both the old GitHub URL and `b-atlas.org`. The desired result is that the custom-domain URL becomes canonical while the old GitHub Pages URL disappears from results over time.
7. Do not intentionally change stable model URL paths during the domain migration; preserving paths helps retain accumulated search signals.

## IndexNow

The IndexNow key file remains at the site root. After deployment, submit changed canonical URLs using the existing key. A helper script is included at `developer/submit-indexnow.js`.
