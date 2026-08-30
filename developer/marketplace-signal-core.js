"use strict";

const ZERO_RESULT_PATTERNS = [
    /\b0\s+(?:boats?|results?|listings?|matches?)\b/i,
    /\bno\s+(?:boats?|results?|listings?|matches?)\s+(?:found|available|matched)\b/i,
    /\bdid not match any documents\b/i,
    /\bwe (?:could not|couldn['’]t) find\b/i,
    /\bno inventory (?:found|available)\b/i
];

const BLOCK_PATTERNS = [
    /access denied/i,
    /verify you are human/i,
    /captcha/i,
    /temporarily unavailable/i,
    /service unavailable/i,
    /your connection is not private/i,
    /privacy error/i,
    /checking your browser/i
];

const LISTING_CONTEXT_PATTERNS = [
    /boats? for sale/i,
    /yachts? for sale/i,
    /used boats?/i,
    /price/i,
    /location/i,
    /year/i,
    /broker/i
];

function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function unique(values) {
    return [...new Set((values || []).map(normalizeText).filter(Boolean))];
}

function includesAny(text, terms) {
    return unique(terms).filter(term => text.includes(term));
}

function classifyMarketplaceEvidence(input) {
    const pageText = normalizeText(input.pageText);
    const title = normalizeText(input.title);
    const url = normalizeText(input.finalUrl || input.requestedUrl);
    const combined = `${title} ${pageText} ${url}`;
    const manufacturerMatches = includesAny(combined, input.manufacturerTerms);
    const modelMatches = includesAny(combined, input.modelTerms);
    const blockMatches = BLOCK_PATTERNS.filter(pattern => pattern.test(combined)).map(String);
    const zeroMatches = ZERO_RESULT_PATTERNS.filter(pattern => pattern.test(combined)).map(String);
    const contextMatches = LISTING_CONTEXT_PATTERNS.filter(pattern => pattern.test(combined)).map(String);
    const listingLinkCount = Number(input.listingLinkCount || 0);
    const httpStatus = Number(input.httpStatus || 0);
    const redirectedToHomepage = Boolean(input.redirectedToHomepage);
    const adapterPositiveEvidence = Boolean(input.adapterPositiveEvidence);
    const adapterMatchedLinks = Array.isArray(input.adapterMatchedLinks) ? input.adapterMatchedLinks : [];

    if (input.navigationError || input.adapterError || httpStatus >= 500 || blockMatches.length) {
        return {
            status: "SourceUnavailable",
            confidence: "High",
            score: -10,
            message: "The marketplace could not be checked reliably.",
            evidence: { httpStatus, blockMatches, navigationError: input.navigationError || "", adapterError: input.adapterError || "" }
        };
    }

    if (httpStatus >= 400) {
        return {
            status: "SourceUnavailable",
            confidence: "High",
            score: -10,
            message: `The marketplace returned an HTTP ${httpStatus} error.`,
            evidence: { httpStatus }
        };
    }

    if (zeroMatches.length) {
        return {
            status: "NoListingIndicated",
            confidence: "High",
            score: -6,
            message: "The marketplace explicitly reported no matching listings.",
            evidence: { zeroMatches, manufacturerMatches, modelMatches, listingLinkCount }
        };
    }

    let score = 0;
    if (adapterPositiveEvidence) score += 6;
    if (manufacturerMatches.length) score += 2;
    if (modelMatches.length) score += 3;
    if (manufacturerMatches.length && modelMatches.length) score += 2;
    if (listingLinkCount > 0) score += 2;
    if (contextMatches.length) score += 1;
    if (redirectedToHomepage) score -= 4;

    if (score >= Number(input.minimumPositiveScore || 5)) {
        return {
            status: "ListingLikely",
            confidence: score >= 8 ? "High" : "Moderate",
            score,
            message: "The marketplace page contains credible evidence of at least one matching listing.",
            evidence: { manufacturerMatches, modelMatches, listingLinkCount, contextMatches, redirectedToHomepage, adapterPositiveEvidence, adapterMatchedLinks }
        };
    }

    return {
        status: "Inconclusive",
        confidence: "Low",
        score,
        message: redirectedToHomepage
            ? "The marketplace redirected to a general page, so a matching listing could not be confirmed."
            : "The page loaded, but B-Atlas could not confirm a matching listing.",
        evidence: { manufacturerMatches, modelMatches, listingLinkCount, contextMatches, redirectedToHomepage, adapterPositiveEvidence, adapterMatchedLinks }
    };
}

module.exports = {
    classifyMarketplaceEvidence,
    normalizeText,
    ZERO_RESULT_PATTERNS,
    BLOCK_PATTERNS
};
