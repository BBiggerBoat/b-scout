let currentSearchProfile = null;

function buildUserProfile() {
    const textSearch =
        document.getElementById("textSearch")?.value?.trim().toLowerCase() || "";

    const maxLengthVal = document.getElementById("maxLength")?.value;
    const maxLength = maxLengthVal ? Number(maxLengthVal) : null;

    const maxBeamVal = document.getElementById("maxBeam")?.value;
    const maxBeam = maxBeamVal ? Number(maxBeamVal) : null;

    const routes =
        Array.from(
            document.querySelectorAll(".routeFilter:checked")
        )
        .map(x => x.value);

    const styles =
        Array.from(
            document.querySelectorAll(".styleFilter:checked")
        )
        .map(x => x.value);

    const hulls =
        Array.from(
            document.querySelectorAll(".hullFilter:checked")
        )
        .map(x => x.value);

    const fuels =
        Array.from(
            document.querySelectorAll(".fuelFilter:checked")
        )
        .map(x => x.value);

    const propulsion =
        Array.from(
            document.querySelectorAll(".propulsionFilter:checked")
        )
        .map(x => x.value);

    const flybridge =
        document.getElementById("flybridgeFilter")?.value || "";

    const sideDecks =
        document.getElementById("sideDeckFilter")?.value || "";

    const loop =
        document.getElementById("loopFilter")?.value || "";

    const trailer =
        document.getElementById("trailerFilter")?.value || "";

    const profileData = {
        textSearch: textSearch,
        routes: routes,
        cruisingIntent: [],
        maxPrice: null,
        maxLength: maxLength,
        maxBeam: maxBeam,
        maxDraft: null,
        maxAirDraft: null,
        styles: styles,
        boatFamilies: Array.from(document.querySelectorAll(".familyFilter:checked")).map(x => x.value),
        configurations: Array.from(document.querySelectorAll(".configurationFilter:checked")).map(x => x.value),
        constructionMaterials: Array.from(document.querySelectorAll(".constructionFilter:checked")).map(x => x.value),
        hullTypes: hulls,
        fuels: fuels,
        propulsion: propulsion,
        flybridge: flybridge,
        sideDecks: sideDecks,
        trailerable: trailer,
        greatLoop: loop,
        minimumBerths: null,
        minimumCabins: null,
        minimumHeads: null,
        crewComposition: document.getElementById("crewComposition")?.value || "",
        tallestCrewHeight: document.getElementById("tallestCrewHeight")?.value ? Number(document.getElementById("tallestCrewHeight").value) : null,
        guestFrequency: document.getElementById("guestFrequency")?.value || "",
        featurePriorities: Array.from(document.querySelectorAll(".featurePriority")).reduce((result, node) => {
            if (node.value) result[node.dataset.feature] = node.value;
            return result;
        }, {})
    };

    if (currentSearchProfile) {
        currentSearchProfile.SearchSettings = profileData;
    }

    return profileData;
}

window.buildUserProfile = buildUserProfile;

// Expose currentSearchProfile globally via window
Object.defineProperty(window, 'currentSearchProfile', {
    get() { return currentSearchProfile; },
    set(val) { currentSearchProfile = val; },
    configurable: true,
    enumerable: true
});
