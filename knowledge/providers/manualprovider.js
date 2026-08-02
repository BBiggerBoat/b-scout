(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }
    if (root) {
        root.BScoutManualKnowledgeProvider = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    function createManualKnowledgeProvider(cards) {
        const seedCards = Array.isArray(cards) ? cards : [];
        return {
            id: 'manual-knowledge',
            supports(card) {
                const id = card && card.identity ? card.identity.boatModelId : '';
                return seedCards.some(seed => seed && seed.identity && seed.identity.boatModelId === id);
            },
            async load(card) {
                const id = card && card.identity ? card.identity.boatModelId : '';
                return seedCards.find(seed => seed && seed.identity && seed.identity.boatModelId === id) || null;
            }
        };
    }

    return { createManualKnowledgeProvider };
});
