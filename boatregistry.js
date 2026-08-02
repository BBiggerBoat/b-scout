(function (global) {
    "use strict";

    function normalize(value) {
        return String(value == null ? "" : value).trim().toUpperCase();
    }

    function createRegistry(options) {
        const settings = options || {};
        const manufacturers = Array.isArray(settings.manufacturers) ? settings.manufacturers : [];
        const boats = Array.isArray(settings.boats) ? settings.boats : [];

        const manufacturerByCode = new Map();
        const manufacturerCodeByLegacyId = new Map();
        const boatById = new Map();
        const boatIdByAlias = new Map();

        manufacturers.forEach(item => {
            const code = normalize(item && item.ManufacturerCode);
            if (!code) return;
            manufacturerByCode.set(code, item);
            (item.LegacyManufacturerIDs || []).forEach(id => manufacturerCodeByLegacyId.set(normalize(id), code));
            (item.Aliases || []).forEach(alias => manufacturerCodeByLegacyId.set(normalize(alias), code));
            manufacturerCodeByLegacyId.set(normalize(item.CanonicalName), code);
        });

        boats.forEach(item => {
            const id = normalize(item && item.BoatModelID);
            if (!id) return;
            boatById.set(id, item);
            boatIdByAlias.set(id, id);
            (item.Aliases || []).forEach(alias => {
                const key = normalize(alias);
                if (key && !boatIdByAlias.has(key)) boatIdByAlias.set(key, id);
            });
        });

        function getManufacturer(codeOrLegacyId) {
            const key = normalize(codeOrLegacyId);
            const code = manufacturerByCode.has(key) ? key : manufacturerCodeByLegacyId.get(key);
            return code ? manufacturerByCode.get(code) || null : null;
        }

        function getBoat(idOrAlias) {
            const key = normalize(idOrAlias);
            const id = boatIdByAlias.get(key) || key;
            return boatById.get(id) || null;
        }

        function resolveBoatModelId(idOrAlias) {
            const boat = getBoat(idOrAlias);
            return boat ? boat.BoatModelID : null;
        }

        function getProposedV7Id(legacyBoatModelId) {
            return resolveBoatModelId(legacyBoatModelId);
        }

        function validateSourceBoats(sourceBoats) {
            const source = Array.isArray(sourceBoats) ? sourceBoats : [];
            const counts = new Map();
            source.forEach(boat => {
                const id = normalize(boat && boat.BoatModelID);
                if (id) counts.set(id, (counts.get(id) || 0) + 1);
            });
            const duplicateIds = Array.from(counts.entries()).filter(([, count]) => count > 1).map(([id, count]) => ({ id, count }));
            const unregisteredIds = Array.from(counts.keys()).filter(id => !boatById.has(id));
            const orphanRegistryIds = Array.from(boatById.keys()).filter(id => !counts.has(id));
            return {
                valid: duplicateIds.length === 0 && unregisteredIds.length === 0 && orphanRegistryIds.length === 0,
                sourceRecordCount: source.length,
                registeredIdentityCount: boatById.size,
                duplicateIds,
                unregisteredIds,
                orphanRegistryIds
            };
        }

        return Object.freeze({
            getManufacturer,
            getBoat,
            resolveBoatModelId,
            getProposedV7Id,
            validateSourceBoats,
            listManufacturers: () => manufacturers.slice(),
            listBoats: () => boats.slice()
        });
    }

    global.BScoutBoatRegistry = { createRegistry, normalize };
})(typeof window !== "undefined" ? window : globalThis);
