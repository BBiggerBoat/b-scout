#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { classifyMarketplaceEvidence } = require("./marketplace-signal-core");
const brokerAdapters = require("./marketplace-adapters");

const ROOT = path.resolve(__dirname, "..");
const readJson = relative => JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));
const writeJson = (relative, value) => fs.writeFileSync(path.join(ROOT, relative), JSON.stringify(value, null, 2) + "\n");

function slug(value) {
    return String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function sourceDestination(source, boat, alias) {
    const sourceId = source.SourceID;
    const make = (alias?.ManufacturerTerms || [boat.Manufacturer]).find(Boolean) || boat.Manufacturer;
    const model = alias?.SourceModelTerms?.[sourceId] || alias?.ModelTerms?.[0] || boat.Model;
    const country = source.Country === "Canada" ? "canada" : "united-states";
    if (sourceId === "YACHTWORLD_CA") return `https://www.yachtworld.com/boats-for-sale/make-${slug(make)}/model-${slug(model)}/country-canada/`;
    if (sourceId === "YACHTWORLD_US") return `https://www.yachtworld.com/boats-for-sale/make-${slug(make)}/model-${slug(model)}/country-united-states/`;
    if (sourceId === "BOATS_COM_CA") return `https://ca.boats.com/boats-for-sale/?country=canada&make=${encodeURIComponent(make.toLowerCase())}&model=${encodeURIComponent(model.toLowerCase())}`;
    if (sourceId === "BOATS_COM_US") return `https://www.boats.com/boats-for-sale/?country=united-states&make=${encodeURIComponent(make.toLowerCase())}&model=${encodeURIComponent(model.toLowerCase())}`;
    if (sourceId === "BOATTRADER") return `https://www.boattrader.com/boats/make-${slug(make)}/model-${slug(model)}/`;
    if (sourceId === "BOATDEALERS_CA") return `https://www.boatdealers.ca/boats-for-sale/${country}/power/${slug(make)}-boats/model-${slug(model)}`;
    return source.InventoryURL || "";
}

function isHomepage(finalUrl, source) {
    try {
        const final = new URL(finalUrl);
        const inventory = new URL(source.InventoryURL);
        return final.hostname === inventory.hostname && ["/", ""].includes(final.pathname) && !final.search;
    } catch (_) {
        return false;
    }
}

async function loadPlaywright() {
    try {
        return require("playwright");
    } catch (error) {
        throw new Error("Playwright is not installed. Run 'npm install' in the public folder before executing the live validator.");
    }
}

async function main() {
    const config = readJson("developer/marketplace-signal-config.json");
    const boats = readJson("boatmodels.json");
    const sources = readJson("data/marketplace-sources.json");
    const aliases = readJson("data/model-search-aliases.json");
    const { chromium } = await loadPlaywright();
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36 B-Atlas-Link-Signal/1.0",
        locale: "en-CA"
    });
    const records = [];

    try {
        const requestedModelIds = Array.isArray(config.modelIds) && config.modelIds.length
            ? config.modelIds
            : boats.map(item => item.BoatModelID);
        const cliModel = process.argv.find(arg => arg.startsWith("--model="))?.split("=")[1];
        const cliSource = process.argv.find(arg => arg.startsWith("--source="))?.split("=")[1];
        const cliLimitRaw = process.argv.find(arg => arg.startsWith("--limit="))?.split("=")[1];
        const cliLimit = cliLimitRaw ? Math.max(1, Number(cliLimitRaw) || 1) : 0;
        let modelIds = cliModel ? requestedModelIds.filter(id => id === cliModel) : requestedModelIds;
        if (cliLimit) modelIds = modelIds.slice(0, cliLimit);
        const sourceIds = cliSource ? config.sourceIds.filter(id => id === cliSource) : config.sourceIds;
        for (const modelId of modelIds) {
            const boat = boats.find(item => item.BoatModelID === modelId);
            const alias = aliases.find(item => item.BoatModelID === modelId);
            if (!boat) continue;
            const searchAlias = alias || {
                BoatModelID: boat.BoatModelID,
                CanonicalName: [boat.Manufacturer, boat.Model, boat.Variant].filter(Boolean).join(" "),
                ManufacturerTerms: [boat.Manufacturer],
                ModelTerms: [boat.Model, [boat.Model, boat.Variant].filter(Boolean).join(" ")].filter(Boolean),
                SourceModelTerms: {}
            };
            for (const sourceId of sourceIds) {
                const source = sources.find(item => item.SourceID === sourceId);
                if (!source) continue;
                const adapter = brokerAdapters.get(sourceId);
                const requestedUrl = adapter ? adapter.buildUrl({ source, boat, alias: searchAlias }) : sourceDestination(source, boat, searchAlias);
                const page = await context.newPage();
                let response = null;
                let navigationError = "";
                try {
                    response = await page.goto(requestedUrl, { waitUntil: "domcontentloaded", timeout: config.navigationTimeoutMs });
                    await page.waitForTimeout(config.settleDelayMs);
                } catch (error) {
                    navigationError = error.message;
                }
                const finalUrl = page.url() || requestedUrl;
                const title = navigationError ? "" : await page.title().catch(() => "");
                const pageText = navigationError ? "" : await page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
                let adapterEvidence = null;
                if (!navigationError && adapter) {
                    adapterEvidence = await adapter.inspect({ page, boat, alias: searchAlias, source }).catch(error => ({ adapterError: error.message }));
                }
                const listingLinkCount = adapterEvidence && Number.isFinite(adapterEvidence.listingLinkCount)
                    ? adapterEvidence.listingLinkCount
                    : (navigationError ? 0 : await page.locator('a[href*="boat"], a[href*="yacht"], article a, [class*="listing"] a, [class*="result"] a').count().catch(() => 0));
                const result = classifyMarketplaceEvidence({
                    requestedUrl,
                    finalUrl,
                    title,
                    pageText,
                    listingLinkCount,
                    httpStatus: response ? response.status() : 0,
                    navigationError,
                    redirectedToHomepage: isHomepage(finalUrl, source),
                    manufacturerTerms: searchAlias.ManufacturerTerms,
                    modelTerms: searchAlias.ModelTerms,
                    minimumPositiveScore: config.minimumPositiveScore,
                    adapterPositiveEvidence: Boolean(adapterEvidence?.positiveEvidence),
                    adapterMatchedLinks: adapterEvidence?.matchedListingLinks || [],
                    adapterMessage: adapterEvidence?.adapterMessage || "",
                    adapterError: adapterEvidence?.adapterError || ""
                });
                records.push({
                    BoatModelID: modelId,
                    SourceID: sourceId,
                    Status: result.status,
                    Message: result.message,
                    CheckedAt: new Date().toISOString(),
                    Confidence: result.confidence,
                    SearchURL: requestedUrl,
                    FinalURL: finalUrl,
                    ValidationMethod: "AutomatedPlaywrightSignal",
                    Evidence: result.evidence,
                    Adapter: adapter ? sourceId : "GenericMarketplace",
                    Score: result.score
                });
                console.log(`${modelId} ${sourceId}: ${result.status} (${result.score})`);
                await page.close();
            }
        }
    } finally {
        await browser.close();
    }

    writeJson("data/marketplace-source-validation.json", records);
    console.log(`Wrote ${records.length} automated marketplace signals.`);
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
