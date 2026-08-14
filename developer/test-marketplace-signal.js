#!/usr/bin/env node
"use strict";

const assert = require("assert");
const { classifyMarketplaceEvidence } = require("./marketplace-signal-core");

const base = {
    requestedUrl: "https://example.com/search",
    finalUrl: "https://example.com/search",
    httpStatus: 200,
    manufacturerTerms: ["Bayliner"],
    modelTerms: ["3270", "3270 Motoryacht"],
    minimumPositiveScore: 5
};

const positive = classifyMarketplaceEvidence({
    ...base,
    title: "Bayliner 3270 boats for sale",
    pageText: "1987 Bayliner 3270 Motoryacht $34,900 Ontario",
    listingLinkCount: 2
});
assert.equal(positive.status, "ListingLikely");

const zero = classifyMarketplaceEvidence({
    ...base,
    title: "Bayliner 3270 boats for sale",
    pageText: "No boats found. 0 results.",
    listingLinkCount: 0
});
assert.equal(zero.status, "NoListingIndicated");

const blocked = classifyMarketplaceEvidence({
    ...base,
    title: "Access denied",
    pageText: "Verify you are human",
    listingLinkCount: 0
});
assert.equal(blocked.status, "SourceUnavailable");

const generic = classifyMarketplaceEvidence({
    ...base,
    finalUrl: "https://example.com/",
    title: "Boats for sale",
    pageText: "Browse thousands of boats",
    listingLinkCount: 10,
    redirectedToHomepage: true
});
assert.equal(generic.status, "Inconclusive");

console.log("Marketplace signal classifier tests passed.");
