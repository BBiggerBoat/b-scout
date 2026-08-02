(function (global) {
    "use strict";

    function normalize(value) {
        return String(value == null ? "" : value).trim().toUpperCase();
    }

    function createRepository(records) {
        const source = Array.isArray(records) ? records : [];
        const byManufacturer = new Map();
        const byModel = new Map();

        source.forEach(record => {
            const manufacturerId = normalize(record && record.ManufacturerID);
            if (manufacturerId) byManufacturer.set(manufacturerId, record);
            (record && Array.isArray(record.Models) ? record.Models : []).forEach(modelId => {
                const key = normalize(modelId);
                if (key) byModel.set(key, record);
            });
        });

        return Object.freeze({
            getByManufacturerId: id => byManufacturer.get(normalize(id)) || null,
            getByBoatModelId: id => byModel.get(normalize(id)) || null,
            list: () => source.slice(),
            size: source.length
        });
    }

    global.BScoutManufacturerKnowledgeRepository = { createRepository, normalize };
})(typeof window !== "undefined" ? window : globalThis);
