(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    if (root) root.BScoutBoatIntelligenceProvider = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';
    function createBoatIntelligenceProvider(records, repositoryApi) {
        const api = repositoryApi || (typeof globalThis !== 'undefined' ? globalThis.BScoutBoatIntelligenceRepository : null);
        if (!api) throw new Error('Boat Knowledge Repository is unavailable');
        return {
            id: 'boat-intelligence',
            supports(card) { return Boolean(card && card.identity && card.identity.boatModelId); },
            async load(card) {
                const record = api.findRecord(records, card.identity.boatModelId);
                if (!record) return null;
                return {
                    schemaVersion: card.schemaVersion || 1,
                    identity: record.identity,
                    intelligence: record.intelligence,
                    evidence: record.evidence,
                    sources: [{
                        type: 'BoatIntelligenceRecord',
                        label: `B-Scout curated intelligence revision ${record.revision}`,
                        verificationStatus: `${record.confidence} confidence`
                    }],
                    confidence: record.confidence,
                    updatedAt: record.updatedAt
                };
            }
        };
    }
    return { createBoatIntelligenceProvider };
});
