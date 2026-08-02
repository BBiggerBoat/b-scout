(function (global) {
    "use strict";

    const DEFAULT_MANIFEST = Object.freeze({
        boats: "boatmodels.json",
        routes: "routes.json",
        missionTemplates: "data/missionTemplates.json",
        searchProfiles: "data/search-profiles.json",
        marketplaceSources: "data/marketplace-sources.json",
        modelSearchAliases: "data/model-search-aliases.json",
        marketplaceSourceValidation: "data/marketplace-source-validation.json",
        boatIntelligence: "knowledge/data/boatintelligence.json",
        manufacturerKnowledge: "knowledge/data/manufacturerknowledge.json",
        manufacturers: "data/registry/manufacturers.json",
        boatRegistry: "data/registry/boat-registry.json",
        fuelTypes: "data/taxonomy/fuel-types.json",
        propulsionTypes: "data/taxonomy/propulsion-types.json",
        hullForms: "data/taxonomy/hull-forms.json",
        hullConfigurations: "data/taxonomy/hull-configurations.json",
        styleFamilies: "data/taxonomy/style-families.json",
        factAttributes: "knowledge/data/fact-attributes.json",
        evidence: "knowledge/data/evidence.json",
        facts: "knowledge/data/facts.json",
        contradictions: "knowledge/data/contradictions.json",
        relationships: "knowledge/data/relationships.json",
        knowledgeCoverage: "knowledge/data/knowledge-coverage.json",
        confidenceLevels: "knowledge/data/confidence-levels.json",
        sourceTypes: "knowledge/data/source-types.json",
        relationshipTypes: "knowledge/data/relationship-types.json"
    });

    function ensureArray(value, datasetName) {
        if (!Array.isArray(value)) {
            throw new Error(`B-Scout dataset '${datasetName}' must be an array.`);
        }
        return value;
    }

    function fetchJson(url, fetchImpl) {
        const request = fetchImpl || global.fetch;
        if (typeof request !== "function") {
            return Promise.reject(new Error("B-Scout Data Repository requires fetch."));
        }

        return request(url).then(response => {
            if (!response || !response.ok) {
                const status = response && response.status ? ` (${response.status})` : "";
                throw new Error(`Failed to load B-Scout data from '${url}'${status}.`);
            }
            return response.json();
        });
    }

    function loadApplicationData(options) {
        const settings = options || {};
        const manifest = Object.assign({}, DEFAULT_MANIFEST, settings.manifest || {});
        const fetchImpl = settings.fetchImpl;
        const entries = Object.entries(manifest);

        return Promise.all(entries.map(([name, url]) =>
            fetchJson(url, fetchImpl).then(value => [name, ensureArray(value, name)])
        )).then(results => Object.fromEntries(results));
    }

    global.BScoutDataRepository = {
        DEFAULT_MANIFEST,
        fetchJson,
        loadApplicationData,
        ensureArray
    };
})(typeof window !== "undefined" ? window : globalThis);
