(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    if (root) root.BScoutListingDiscoveryProvider = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    function getModelId(card) {
        return String((card && card.BoatModelID) || (card && card.identity && card.identity.boatModelId) || '').trim();
    }

    function normalizeRecord(record) {
        if (!record || typeof record !== 'object') return null;
        return {
            ...record,
            listings: Array.isArray(record.listings) ? record.listings.map(item => ({
                ...item,
                discoveryType: item.discoveryType || 'MarketplaceSearch',
                inventoryStatus: item.inventoryStatus || 'Unknown',
                lastChecked: item.lastChecked || null
            })) : []
        };
    }

    function createListingDiscoveryProvider(records) {
        const normalized = (Array.isArray(records) ? records : []).map(normalizeRecord).filter(Boolean);
        return {
            id: 'listing-discovery',
            supports(card) {
                const id = getModelId(card);
                return normalized.some(record => getModelId(record) === id);
            },
            async load(card) {
                const id = getModelId(card);
                return normalized.find(record => getModelId(record) === id) || null;
            }
        };
    }

    return { createListingDiscoveryProvider, normalizeRecord };
});
