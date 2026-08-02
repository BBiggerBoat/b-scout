(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }
    if (root) {
        root.BScoutKnowledge = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    const KNOWLEDGE_CARD_VERSION = 1;
    const SECTION_NAMES = Object.freeze([
        'identity',
        'specifications',
        'intelligence',
        'evidence',
        'images',
        'videos',
        'listings',
        'documents',
        'ownerCommunities',
        'knownIssues',
        'similarModels',
        'missingInformation',
        'sources'
    ]);

    const CONFIDENCE_LEVELS = Object.freeze(['Unknown', 'Low', 'Medium', 'High']);

    function clone(value) {
        return value == null ? value : JSON.parse(JSON.stringify(value));
    }

    function asArray(value) {
        return Array.isArray(value) ? clone(value) : [];
    }

    function normalizeConfidence(value) {
        const match = CONFIDENCE_LEVELS.find(level => level.toLowerCase() === String(value || '').trim().toLowerCase());
        return match || 'Unknown';
    }

    function normalizeIdentity(identity) {
        const source = identity && typeof identity === 'object' ? identity : {};
        return {
            boatModelId: String(source.boatModelId || source.BoatModelID || '').trim(),
            manufacturer: String(source.manufacturer || source.Manufacturer || '').trim(),
            model: String(source.model || source.Model || '').trim(),
            displayName: String(source.displayName || '').trim()
        };
    }

    function normalizeKnowledgeCard(input) {
        const source = input && typeof input === 'object' ? input : {};
        const identity = normalizeIdentity(source.identity);
        if (!identity.displayName) {
            identity.displayName = [identity.manufacturer, identity.model].filter(Boolean).join(' ').trim();
        }

        return {
            schemaVersion: Number(source.schemaVersion) || KNOWLEDGE_CARD_VERSION,
            identity,
            specifications: source.specifications && typeof source.specifications === 'object'
                ? clone(source.specifications)
                : {},
            intelligence: source.intelligence && typeof source.intelligence === 'object'
                ? clone(source.intelligence)
                : {},
            evidence: asArray(source.evidence),
            images: asArray(source.images),
            videos: asArray(source.videos),
            listings: asArray(source.listings),
            documents: asArray(source.documents),
            ownerCommunities: asArray(source.ownerCommunities),
            knownIssues: asArray(source.knownIssues),
            similarModels: asArray(source.similarModels),
            missingInformation: asArray(source.missingInformation),
            sources: asArray(source.sources),
            confidence: normalizeConfidence(source.confidence),
            updatedAt: source.updatedAt ? String(source.updatedAt) : null
        };
    }

    function validateKnowledgeCard(card) {
        const normalized = normalizeKnowledgeCard(card);
        const errors = [];
        if (!normalized.identity.boatModelId) errors.push('identity.boatModelId is required');
        if (!normalized.identity.manufacturer) errors.push('identity.manufacturer is required');
        if (!normalized.identity.model) errors.push('identity.model is required');
        return { valid: errors.length === 0, errors, card: normalized };
    }

    function getKnowledgeSection(card, sectionName) {
        if (!SECTION_NAMES.includes(sectionName)) {
            throw new Error(`Unknown Knowledge Card section: ${sectionName}`);
        }
        return clone(normalizeKnowledgeCard(card)[sectionName]);
    }

    function findKnowledgeCard(cards, boatModelId) {
        const id = String(boatModelId || '').trim();
        if (!id || !Array.isArray(cards)) return null;
        const match = cards.find(card => normalizeKnowledgeCard(card).identity.boatModelId === id);
        return match ? normalizeKnowledgeCard(match) : null;
    }

    function mergeUniqueItems(existing, incoming) {
        const output = asArray(existing);
        const seen = new Set(output.map(item => JSON.stringify(item)));
        asArray(incoming).forEach(item => {
            const key = JSON.stringify(item);
            if (!seen.has(key)) {
                output.push(item);
                seen.add(key);
            }
        });
        return output;
    }

    function mergeKnowledgeCards(baseCard, enrichment) {
        const base = normalizeKnowledgeCard(baseCard);
        const extra = normalizeKnowledgeCard(enrichment);
        const merged = normalizeKnowledgeCard(base);

        merged.identity = {
            ...base.identity,
            ...Object.fromEntries(Object.entries(extra.identity).filter(([, value]) => value !== ''))
        };
        merged.specifications = { ...base.specifications, ...extra.specifications };
        merged.intelligence = { ...base.intelligence, ...extra.intelligence };
        merged.evidence = mergeUniqueItems(base.evidence, extra.evidence);

        SECTION_NAMES.filter(name => Array.isArray(base[name])).forEach(name => {
            merged[name] = mergeUniqueItems(base[name], extra[name]);
        });

        const rank = level => CONFIDENCE_LEVELS.indexOf(normalizeConfidence(level));
        merged.confidence = rank(extra.confidence) > rank(base.confidence) ? extra.confidence : base.confidence;
        merged.updatedAt = extra.updatedAt || base.updatedAt;
        return merged;
    }

    class KnowledgeManager {
        constructor(providers = []) {
            this.providers = [];
            providers.forEach(provider => this.registerProvider(provider));
        }

        registerProvider(provider) {
            if (!provider || typeof provider.id !== 'string' || typeof provider.load !== 'function') {
                throw new Error('Knowledge providers require a string id and a load(card, context) function');
            }
            if (this.providers.some(existing => existing.id === provider.id)) {
                throw new Error(`Knowledge provider already registered: ${provider.id}`);
            }
            this.providers.push(provider);
            return this;
        }

        async enrich(card, context = {}) {
            let current = normalizeKnowledgeCard(card);
            for (const provider of this.providers) {
                const supported = typeof provider.supports !== 'function' || provider.supports(current, context);
                if (!supported) continue;
                const enrichment = await provider.load(clone(current), context);
                if (enrichment) current = mergeKnowledgeCards(current, enrichment);
            }
            return current;
        }
    }

    return {
        KNOWLEDGE_CARD_VERSION,
        SECTION_NAMES,
        CONFIDENCE_LEVELS,
        normalizeKnowledgeCard,
        validateKnowledgeCard,
        getKnowledgeSection,
        findKnowledgeCard,
        mergeKnowledgeCards,
        KnowledgeManager
    };
});
