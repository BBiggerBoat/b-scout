(function (global) {
    "use strict";

    const DEFAULT_SEARCH_SETTINGS = Object.freeze({
        textSearch: "",
        routes: [],
        cruisingIntent: [],
        maxPrice: null,
        minLength: null,
        maxLength: null,
        minBeam: null,
        maxBeam: null,
        maxDraft: null,
        maxAirDraft: null,
        styles: [],
        boatFamilies: [],
        configurations: [],
        constructionMaterials: [],
        hullTypes: [],
        fuels: [],
        propulsion: [],
        engineCounts: [],
        twinEngines: false,
        flybridge: "",
        sideDecks: "",
        trailerable: "",
        greatLoop: "",
        minimumBerths: null,
        minimumCabins: null,
        minimumHeads: null,
        crewComposition: "",
        tallestCrewHeight: null,
        guestFrequency: "",
        featurePriorities: {}
    });

    let state = createState();
    const listeners = new Set();

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function createState(initial) {
        const source = initial || {};
        return {
            searchSettings: Object.assign({}, clone(DEFAULT_SEARCH_SETTINGS), clone(source.searchSettings || {})),
            workspaceStatus: source.workspaceStatus || null,
            sort: Object.assign({ field: null, direction: "asc" }, clone(source.sort || {})),
            revision: Number(source.revision) || 0
        };
    }

    function getState() {
        return clone(state);
    }

    function setSearchSettings(settings, options) {
        state.searchSettings = Object.assign({}, clone(DEFAULT_SEARCH_SETTINGS), clone(settings || {}));
        state.workspaceStatus = null;
        state.revision += 1;
        notify(options && options.source ? options.source : "search-settings");
        return getState();
    }

    function setWorkspaceStatus(status) {
        state.workspaceStatus = status || null;
        state.revision += 1;
        notify("workspace-status");
        return getState();
    }

    function clear(options) {
        state = createState();
        state.revision += 1;
        notify(options && options.source ? options.source : "clear");
        return getState();
    }

    function subscribe(listener) {
        if (typeof listener !== "function") return function () {};
        listeners.add(listener);
        return function unsubscribe() { listeners.delete(listener); };
    }

    function notify(source) {
        const snapshot = getState();
        listeners.forEach(listener => listener(snapshot, source));
    }

    function readFromDocument(documentRef) {
        const doc = documentRef || global.document;
        if (!doc) return clone(DEFAULT_SEARCH_SETTINGS);
        const checkedValues = selector => Array.from(doc.querySelectorAll(`#discoverView ${selector}`)).map(node => node.value);
        const numericValue = id => {
            const raw = doc.getElementById(id)?.value;
            return raw === undefined || raw === null || raw === "" ? null : Number(String(raw).replace(",", "."));
        };
        return {
            textSearch: doc.getElementById("textSearch")?.value?.trim().toLowerCase() || "",
            routes: checkedValues(".routeFilter:checked"),
            cruisingIntent: [],
            maxPrice: null,
            minLength: numericValue("minLength"),
            maxLength: numericValue("maxLength"),
            minBeam: numericValue("minBeam"),
            maxBeam: numericValue("maxBeam"),
            maxDraft: null,
            maxAirDraft: null,
            styles: checkedValues(".styleFilter:checked"),
            boatFamilies: checkedValues(".familyFilter:checked"),
            configurations: checkedValues(".configurationFilter:checked"),
            constructionMaterials: checkedValues(".constructionFilter:checked"),
            hullTypes: checkedValues(".hullFilter:checked"),
            fuels: checkedValues(".fuelFilter:checked"),
            propulsion: checkedValues(".propulsionFilter:checked"),
            engineCounts: checkedValues(".engineCountFilter:checked").map(Number),
            twinEngines: false,
            flybridge: doc.getElementById("flybridgeFilter")?.value || "",
            sideDecks: doc.getElementById("sideDeckFilter")?.value || "",
            trailerable: doc.getElementById("trailerFilter")?.value || "",
            greatLoop: doc.getElementById("loopFilter")?.value || "",
            minimumBerths: null,
            minimumCabins: null,
            minimumHeads: null,
            crewComposition: doc.getElementById("crewComposition")?.value || "",
            tallestCrewHeight: numericValue("tallestCrewHeight"),
            guestFrequency: doc.getElementById("guestFrequency")?.value || "",
            featurePriorities: Array.from(doc.querySelectorAll(".featurePriority")).reduce((result, node) => {
                if (node.value) result[node.dataset.feature] = node.value;
                return result;
            }, {})
        };
    }

    function captureFromDocument(documentRef, options) {
        return setSearchSettings(readFromDocument(documentRef), options);
    }

    global.BScoutSearchState = {
        DEFAULT_SEARCH_SETTINGS,
        createState,
        getState,
        setSearchSettings,
        setWorkspaceStatus,
        clear,
        subscribe,
        readFromDocument,
        captureFromDocument
    };
})(typeof window !== "undefined" ? window : globalThis);
