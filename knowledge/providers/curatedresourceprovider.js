(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }
    if (root) {
        root.BScoutCuratedResourceProvider = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    function getModelId(card) {
        return String((card && card.BoatModelID) || (card && card.identity && card.identity.boatModelId) || '').trim();
    }

    function createCuratedResourceProvider(enrichments) {
        const records = Array.isArray(enrichments) ? enrichments : [];
        return {
            id: 'curated-resources',
            supports(card) {
                const id = getModelId(card);
                return records.some(record => getModelId(record) === id);
            },
            async load(card) {
                const id = getModelId(card);
                return records.find(record => getModelId(record) === id) || null;
            }
        };
    }

    return { createCuratedResourceProvider };
});
