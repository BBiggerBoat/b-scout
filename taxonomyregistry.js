(function (global) {
    "use strict";

    function normalizeKey(value) {
        return String(value == null ? "" : value).trim().toLowerCase();
    }

    function buildIndex(items) {
        const byCanonical = new Map();
        const canonicalByAlias = new Map();
        (Array.isArray(items) ? items : []).forEach(item => {
            const canonical = item && item.CanonicalValue;
            if (!canonical) return;
            byCanonical.set(canonical, item);
            canonicalByAlias.set(normalizeKey(canonical), canonical);
            (item.Aliases || []).forEach(alias => canonicalByAlias.set(normalizeKey(alias), canonical));
        });
        return { byCanonical, canonicalByAlias };
    }

    function createRegistry(taxonomy) {
        const source = taxonomy || {};
        const indexes = {
            fuel: buildIndex(source.fuelTypes),
            propulsion: buildIndex(source.propulsionTypes),
            hullForm: buildIndex(source.hullForms),
            hullConfiguration: buildIndex(source.hullConfigurations),
            style: buildIndex(source.styleFamilies)
        };

        function resolve(domain, value) {
            const index = indexes[domain];
            if (!index) return "Unknown";
            return index.canonicalByAlias.get(normalizeKey(value)) || "Unknown";
        }

        function validateBoat(boat) {
            const issues = [];
            const checks = [
                ["NormalizedFuel", "fuel"],
                ["NormalizedPropulsion", "propulsion"],
                ["NormalizedHullForm", "hullForm"],
                ["NormalizedHullConfiguration", "hullConfiguration"],
                ["NormalizedStyle", "style"]
            ];
            checks.forEach(([field, domain]) => {
                const value = boat && boat[field];
                if (!indexes[domain].byCanonical.has(value)) {
                    issues.push({ field, value, issue: "Value is not registered in the canonical taxonomy." });
                }
            });
            return issues;
        }

        return Object.freeze({ resolve, validateBoat, indexes });
    }

    global.BScoutTaxonomyRegistry = { createRegistry, normalizeKey };
})(typeof window !== "undefined" ? window : globalThis);
