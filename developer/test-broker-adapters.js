#!/usr/bin/env node
"use strict";
const assert = require("assert");
const adapters = require("./marketplace-adapters");
const { classifyMarketplaceEvidence } = require("./marketplace-signal-core");

for (const sourceId of ["UNITED_CITY", "POP_YACHTS", "DENISON"]) {
    assert(adapters.has(sourceId), `Missing adapter ${sourceId}`);
}

const positive = classifyMarketplaceEvidence({
    requestedUrl: "https://broker.example/inventory",
    finalUrl: "https://broker.example/inventory",
    httpStatus: 200,
    title: "Boats for sale",
    pageText: "Current inventory",
    listingLinkCount: 40,
    manufacturerTerms: ["Bayliner"],
    modelTerms: ["3270"],
    adapterPositiveEvidence: true,
    adapterMatchedLinks: [{ href: "https://broker.example/listing/1", text: "1986 Bayliner 3270" }],
    minimumPositiveScore: 5
});
assert.equal(positive.status, "ListingLikely");

const uncertain = classifyMarketplaceEvidence({
    requestedUrl: "https://broker.example/inventory",
    finalUrl: "https://broker.example/inventory",
    httpStatus: 200,
    title: "Boats for sale",
    pageText: "Current inventory with many unrelated boats",
    listingLinkCount: 40,
    manufacturerTerms: ["Bayliner"],
    modelTerms: ["3270"],
    adapterPositiveEvidence: false,
    minimumPositiveScore: 5
});
assert.equal(uncertain.status, "Inconclusive");

console.log("Broker adapter pilot tests passed.");
