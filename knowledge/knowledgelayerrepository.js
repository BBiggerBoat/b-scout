(function (root, factory) {
    const api = factory();
    if (typeof module === "object" && module.exports) module.exports = api;
    if (root) root.BScoutKnowledgeLayerRepository = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    function text(value) { return String(value == null ? "" : value).trim(); }
    function clone(value) { return value == null ? value : JSON.parse(JSON.stringify(value)); }

    function createKnowledgeIndex(data) {
        const source = data || {};
        const facts = Array.isArray(source.facts) ? source.facts : [];
        const evidence = Array.isArray(source.evidence) ? source.evidence : [];
        const contradictions = Array.isArray(source.contradictions) ? source.contradictions : [];
        const relationships = Array.isArray(source.relationships) ? source.relationships : [];
        const coverage = Array.isArray(source.knowledgeCoverage) ? source.knowledgeCoverage : [];
        const factsByBoat = new Map();
        const sourcesById = new Map(evidence.map(item => [text(item.SourceID), item]));
        const conflictsByBoat = new Map();
        const relationshipsByBoat = new Map();
        const coverageByBoat = new Map(coverage.map(item => [text(item.BoatModelID), item]));

        facts.forEach(fact => {
            const id = text(fact.BoatModelID);
            if (!factsByBoat.has(id)) factsByBoat.set(id, []);
            factsByBoat.get(id).push(fact);
        });
        contradictions.forEach(item => {
            const id = text(item.BoatModelID);
            if (!conflictsByBoat.has(id)) conflictsByBoat.set(id, []);
            conflictsByBoat.get(id).push(item);
        });
        relationships.forEach(item => {
            [item.FromBoatModelID, item.ToBoatModelID].forEach(value => {
                const id = text(value);
                if (!relationshipsByBoat.has(id)) relationshipsByBoat.set(id, []);
                relationshipsByBoat.get(id).push(item);
            });
        });

        return {
            factsByBoat,
            sourcesById,
            conflictsByBoat,
            relationshipsByBoat,
            coverageByBoat
        };
    }

    function getBoatKnowledge(index, boatModelId) {
        const id = text(boatModelId);
        const facts = clone(index.factsByBoat.get(id) || []);
        const sourceIds = [...new Set(facts.flatMap(fact => Array.isArray(fact.SourceRefs) ? fact.SourceRefs : []))];
        return {
            BoatModelID: id,
            Facts: facts,
            Evidence: sourceIds.map(sourceId => clone(index.sourcesById.get(sourceId))).filter(Boolean),
            Contradictions: clone(index.conflictsByBoat.get(id) || []),
            Relationships: clone(index.relationshipsByBoat.get(id) || []),
            Coverage: clone(index.coverageByBoat.get(id) || null)
        };
    }

    function getPreferredFact(index, boatModelId, attributeId) {
        const facts = index.factsByBoat.get(text(boatModelId)) || [];
        const matches = facts.filter(fact => text(fact.AttributeID) === text(attributeId));
        return clone(matches.find(fact => fact.Preferred === true) || matches[0] || null);
    }

    function validateKnowledgeData(data, boatIds) {
        const source = data || {};
        const errors = [];
        const knownBoats = new Set(Array.isArray(boatIds) ? boatIds.map(text) : []);
        const facts = Array.isArray(source.facts) ? source.facts : [];
        const evidence = Array.isArray(source.evidence) ? source.evidence : [];
        const relationships = Array.isArray(source.relationships) ? source.relationships : [];
        const sourceIds = new Set(evidence.map(item => text(item.SourceID)));
        const factIds = new Set();
        facts.forEach((fact, index) => {
            if (!fact.FactID) errors.push(`facts[${index}] FactID is required`);
            if (factIds.has(fact.FactID)) errors.push(`duplicate FactID '${fact.FactID}'`);
            factIds.add(fact.FactID);
            if (knownBoats.size && !knownBoats.has(text(fact.BoatModelID))) errors.push(`orphan fact '${fact.FactID}'`);
            (fact.SourceRefs || []).forEach(id => { if (!sourceIds.has(text(id))) errors.push(`fact '${fact.FactID}' references missing source '${id}'`); });
        });
        relationships.forEach((item, index) => {
            if (knownBoats.size && !knownBoats.has(text(item.FromBoatModelID))) errors.push(`relationships[${index}] missing from-boat`);
            if (knownBoats.size && !knownBoats.has(text(item.ToBoatModelID))) errors.push(`relationships[${index}] missing to-boat`);
            if (text(item.FromBoatModelID) === text(item.ToBoatModelID)) errors.push(`relationships[${index}] self-reference`);
        });
        return { valid: errors.length === 0, errors };
    }

    return { createKnowledgeIndex, getBoatKnowledge, getPreferredFact, validateKnowledgeData };
});
