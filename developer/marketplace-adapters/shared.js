"use strict";

function slug(value) {
    return String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizedTerms(boat, alias, sourceId) {
    const manufacturerTerms = (alias?.ManufacturerTerms || [boat.Manufacturer]).filter(Boolean);
    const modelTerms = (alias?.ModelTerms || [boat.Model]).filter(Boolean);
    const preferredModel = alias?.SourceModelTerms?.[sourceId] || modelTerms[0] || boat.Model;
    return { manufacturerTerms, modelTerms, preferredModel };
}

function listingHrefPatterns(domain) {
    return [
        `a[href*="${domain}"]`,
        'article a[href]',
        '[class*="listing"] a[href]',
        '[class*="result"] a[href]',
        '[class*="inventory"] a[href]',
        '[data-listing] a[href]'
    ].join(', ');
}

function extractLikelyListingLinks(links, manufacturerTerms, modelTerms) {
    const makes = manufacturerTerms.map(value => String(value).toLowerCase());
    const models = modelTerms.map(value => String(value).toLowerCase());
    return (links || []).filter(link => {
        const haystack = `${link.text || ""} ${link.href || ""}`.toLowerCase();
        return makes.some(term => haystack.includes(term)) && models.some(term => haystack.includes(term));
    });
}

module.exports = { slug, normalizedTerms, listingHrefPatterns, extractLikelyListingLinks };
