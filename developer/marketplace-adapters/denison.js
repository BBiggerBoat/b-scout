"use strict";
const { normalizedTerms, extractLikelyListingLinks } = require("./shared");

module.exports = {
    sourceId: "DENISON",
    buildUrl({ source }) {
        return source.InventoryURL;
    },
    async inspect({ page, boat, alias, source }) {
        const terms = normalizedTerms(boat, alias, source.SourceID);
        const links = await page.locator('a[href*="yachts-for-sale"], article a[href], [class*="listing"] a[href], [class*="result"] a[href], [class*="yacht"] a[href]').evaluateAll(nodes => nodes.map(node => ({
            href: node.href || node.getAttribute("href") || "",
            text: (node.innerText || node.textContent || "").trim()
        }))).catch(() => []);
        const matchedLinks = extractLikelyListingLinks(links, terms.manufacturerTerms, terms.modelTerms);
        return {
            listingLinkCount: links.length,
            matchedListingLinks: matchedLinks,
            positiveEvidence: matchedLinks.length > 0,
            adapterMessage: matchedLinks.length ? "A matching Denison listing link was found in current inventory." : "No matching Denison listing link was confirmed."
        };
    }
};
