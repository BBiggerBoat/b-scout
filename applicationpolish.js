(function () {
    "use strict";

    const INFO_PAGES = {
        about: `
            <p class="workspace-eyebrow">About B-Scout</p>
            <h2>Boat knowledge for better decisions.</h2>
            <p>B-Scout is a boat knowledge platform that combines curated model research, buyer workspaces, inspection guidance and listing discovery.</p>
            <section class="information-section"><h3>What makes B-Scout different?</h3><p>It is not another marketplace search. B-Scout helps buyers understand which boats deserve further investigation and why.</p></section>
            <blockquote>Known undesirable information eliminates boats. Unknown information does not.</blockquote>
            <section class="information-section"><h3>How it works</h3><ul><li>Search broadly across boat families and missions.</li><li>Keep incomplete candidates visible with lower confidence.</li><li>Review model knowledge, ownership trade-offs and inspection priorities.</li><li>Save, compare and investigate actual boats for sale.</li></ul></section>
            <section class="information-section"><h3>Current direction</h3><p>B-Scout is evolving toward deeper model knowledge, valuation assistance, listing intelligence and community-supported research.</p></section>`,
        contact: `
            <p class="workspace-eyebrow">Contact</p><h2>Contact B-Scout</h2>
            <p>B-Scout is currently a prototype and public-interest boat knowledge project.</p>
            <p>Contact details and feedback channels will be added before public release.</p>`,
        privacy: `
            <p class="workspace-eyebrow">Privacy</p><h2>Local prototype data</h2>
            <p>This prototype stores saved profiles, boat statuses, notes and comparison selections in the browser's local storage.</p>
            <p>No account or cloud synchronization is active in this build. Clearing browser storage may remove saved work.</p>`
    };

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = "none";
    }

    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = "block";
    }

    function openInfo(page) {
        const content = document.getElementById("informationModalContent");
        if (!content || !INFO_PAGES[page]) return;
        content.innerHTML = INFO_PAGES[page];
        openModal("informationModal");
    }

    function scrollToSearch() {
        closeModal("informationModal");
        document.querySelector(".search-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
        document.getElementById("textSearch")?.focus();
    }

    function openMyBoats() {
        closeModal("informationModal");
        if (typeof window.openDecisionWorkspace === "function") window.openDecisionWorkspace();
        else document.getElementById("openDecisionWorkspaceBtn")?.click();
    }

    function loadDemoFleet() {
        if (typeof window.loadDemoFleetData === "function") window.loadDemoFleetData();
        if (typeof window.updateBuyerWorkspaceCounts === "function") window.updateBuyerWorkspaceCounts();
        openMyBoats();
    }

    document.addEventListener("click", event => {
        const actionTarget = event.target.closest("[data-app-action]");
        if (actionTarget) {
            event.preventDefault();
            const action = actionTarget.dataset.appAction;
            if (action === "home") {
                closeModal("informationModal");
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (action === "search") scrollToSearch();
            else if (action === "my-boats") openMyBoats();
            else openInfo(action);
            return;
        }

        const back = event.target.closest("[data-close-modal]");
        if (back) {
            event.preventDefault();
            closeModal(back.dataset.closeModal);
            const returnModal = back.dataset.closeModal === "boatModal"
                ? (window.BScoutWorkspaceReturnModal || "")
                : (back.dataset.openModal || "");
            window.BScoutWorkspaceReturnModal = "";
            if (returnModal) openModal(returnModal);
        }
    });

    document.getElementById("closeInformationModal")?.addEventListener("click", () => closeModal("informationModal"));
    document.getElementById("loadDemoFleetBtn")?.addEventListener("click", loadDemoFleet);

    window.BScoutApplicationPolish = { openInfo, openMyBoats, loadDemoFleet, closeModal };
})();
