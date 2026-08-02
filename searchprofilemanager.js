(function (global) {
    "use strict";
    const STORAGE_KEY = "bscout_search_profiles";
    const clone = value => JSON.parse(JSON.stringify(value));

    function migrate(profile) {
        const p = clone(profile || {});
        p.ProfileID = p.ProfileID || `profile_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        p.ProfileName = p.ProfileName || p.Name || "Untitled Profile";
        p.Description = p.Description || "";
        p.Icon = p.Icon || "search";
        p.Locked = p.Locked === true;
        p.SearchSettings = p.SearchSettings || {};
        p.SortPreferences = p.SortPreferences || p.Sort || { field: null, direction: "asc" };
        p.DefaultLayout = p.DefaultLayout || null;
        delete p.BoatRelationships;
        delete p.Listings;
        delete p.CruisingProfileID;
        return p;
    }


    function builtInFromTemplate(template) {
        if (template && template.SearchSettings) return Object.assign({}, template, { Locked: true });
        const preferences = template?.SuggestedPreferences || {};
        return {
            ProfileID: `builtin:${template?.ProfileID || "UNKNOWN"}`, ProfileName: template?.Name || "Built-in Profile",
            Description: template?.Description || "", Icon: template?.Icon || "compass", Locked: true,
            SearchSettings: Object.assign({}, template?.SuggestedFilters || {}, {
                hullTypes: preferences.HullType || [], fuels: preferences.Fuel || [], propulsion: preferences.Propulsion || []
            }), SortPreferences: { field: null, direction: "asc" }, DefaultLayout: null
        };
    }

    function loadUserProfiles(storage) {
        try {
            const raw = (storage || global.localStorage)?.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw).map(migrate).filter(p => !p.Locked) : [];
        } catch (_) { return []; }
    }

    function saveUserProfiles(profiles, storage) {
        const clean = (profiles || []).map(migrate).filter(p => !p.Locked);
        (storage || global.localStorage)?.setItem(STORAGE_KEY, JSON.stringify(clean));
        return clean;
    }

    function allProfiles(builtIns, storage) {
        return [...(builtIns || []).map(profile => migrate(Object.assign({}, profile, { Locked: true }))), ...loadUserProfiles(storage)];
    }

    function duplicate(profile, name) {
        const copy = migrate(profile);
        copy.ProfileID = `profile_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        copy.ProfileName = name || `${copy.ProfileName} Copy`;
        copy.Locked = false;
        copy.Created = new Date().toISOString();
        copy.Modified = copy.Created;
        return copy;
    }

    function assertEditable(profile) {
        if (!profile || profile.Locked) throw new Error("Locked profiles are read-only. Duplicate the profile to edit it.");
        return profile;
    }

    function update(profile, changes) {
        assertEditable(profile);
        return migrate(Object.assign({}, profile, clone(changes || {}), { Modified: new Date().toISOString(), Locked: false }));
    }

    function remove(profiles, id) {
        const target = (profiles || []).find(p => p.ProfileID === id);
        assertEditable(target);
        return profiles.filter(p => p.ProfileID !== id);
    }

    global.BScoutSearchProfiles = { STORAGE_KEY, builtInFromTemplate, migrate, loadUserProfiles, saveUserProfiles, allProfiles, duplicate, assertEditable, update, remove };
})(typeof window !== "undefined" ? window : globalThis);
