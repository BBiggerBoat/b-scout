(function (root, factory) {
    const api = factory(root);
    if (typeof module === "object" && module.exports) module.exports = api;
    if (root) root.BScoutBoatWorkspace = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (root) {
    "use strict";

    let currentBoat = null;
    let currentCard = null;
    let activeTab = "research";
    const tabOrder = ["research", "buying", "owning", "notebook"];

    function workspaceTabStorageKey(boat) {
        return boat?.BoatModelID ? `bscout.workspace.tab.${boat.BoatModelID}` : "";
    }
    function getRememberedTab(boat) {
        const key = workspaceTabStorageKey(boat);
        if (!key || !root.localStorage) return "";
        try {
            const value = root.localStorage.getItem(key);
            return tabOrder.includes(value) ? value : "";
        } catch { return ""; }
    }
    function rememberTab(tab) {
        const key = workspaceTabStorageKey(currentBoat);
        if (!key || !root.localStorage || !tabOrder.includes(tab)) return;
        try { root.localStorage.setItem(key, tab); } catch { /* Browser storage may be unavailable. */ }
    }

    function esc(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function humanCode(value) {
        if (value === undefined || value === null || value === "") return null;
        const raw = String(value);
        const special = {
            "rudder.skeg_hung":"Skeg-hung",
            "rudder.full_keel_attached":"Full-keel attached",
            "rudder.spade":"Spade",
            "rudder.semi_balanced":"Semi-balanced",
            "rudder.transom_hung":"Transom-hung",
            "rudder.twin":"Twin rudders",
            "shower.separate_stall":"Separate shower stall",
            "shower.wet_head":"Wet head",
            "shower.none":"No interior shower",
            "shower.varies":"Varies by boat",
            "mechanical_propulsion.shaft":"Shaft",
            "mechanical_propulsion.saildrive":"Saildrive",
            "vessel.power":"Power",
            "vessel.sail":"Sail",
            "vessel.motorsailer":"Motorsailer",
            "primary_propulsion.power":"Power",
            "primary_propulsion.sail":"Sail",
            "primary_propulsion.sail_and_power":"Sail and power",
            "keel.full_long":"Full / long keel"
        };
        if (special[raw]) return special[raw];
        const tail = raw.includes(".") ? raw.split(".").slice(1).join(" ") : raw;
        return tail.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    }

    function canonicalOrLegacy(boat, canonicalKey, legacyKeys=[]) {
        const direct = boat?.[canonicalKey];
        if (direct !== undefined && direct !== null && direct !== "") return direct;
        for (const key of legacyKeys) {
            const value = boat?.[key];
            if (value !== undefined && value !== null && value !== "") return value;
        }
        return null;
    }

    function displayCanonical(boat, canonicalKey, legacyKeys=[]) {
        const value = canonicalOrLegacy(boat, canonicalKey, legacyKeys);
        if (value === null) return null;
        return String(value).includes(".") ? humanCode(value) : value;
    }

    function arr(value) { return Array.isArray(value) ? value : []; }
    function known(value) { return value !== undefined && value !== null && value !== ""; }
    function boatName(boat) { return [boat?.Manufacturer, boat?.Model, boat?.Variant].filter(Boolean).join(" ") || "Unknown model"; }
    function field(label, value, suffix) {
        return `<div class="workspace-fact"><strong>${esc(label)}</strong><span>${known(value) ? `${esc(value)}${suffix || ""}` : "Unknown"}</span></div>`;
    }
    function textList(items, emptyText) {
        const values = arr(items).filter(Boolean);
        if (!values.length) return `<p class="workspace-empty">${esc(emptyText || "No information recorded.")}</p>`;
        return `<ul class="workspace-list">${values.map(item => `<li>${esc(item)}</li>`).join("")}</ul>`;
    }
    function splitText(value) {
        if (!value) return [];
        return String(value).split(/\s*;\s*|\r?\n/).map(item => item.trim()).filter(Boolean);
    }
    function safeUrl(value) {
        try { const url = new URL(String(value || "")); return ["http:", "https:"].includes(url.protocol) ? url.href : ""; }
        catch { return ""; }
    }
    function getRelationship() {
        return typeof root.getBoatRelationship === "function" && currentBoat
            ? root.getBoatRelationship(currentBoat.BoatModelID) : null;
    }
    function getKnowledge() {
        if (!currentBoat || !root.BScoutKnowledgeLayer || !root.BScoutKnowledgeLayerRepository) return null;
        return root.BScoutKnowledgeLayerRepository.getBoatKnowledge(root.BScoutKnowledgeLayer, currentBoat.BoatModelID);
    }
    function getRecommendation() {
        if (!currentBoat || typeof root.evaluateBoatForProfile !== "function") return null;
        return root.evaluateBoatForProfile(currentBoat, null, root.currentSearchProfile || {}, null);
    }

    function nonEmptyArray(value) {
        return Array.isArray(value) ? value.filter(item => String(item || "").trim()) : [];
    }
    function uniqueText(...groups) {
        const seen = new Set();
        return groups.flatMap(group => nonEmptyArray(group)).map(item => String(item).trim()).filter(item => {
            const key = item.toLowerCase();
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }
    function explanations(items) {
        return nonEmptyArray(items).map(item => typeof item === "string" ? item : (item.explanation || item.reason || item.message || "")).filter(Boolean);
    }
    function buildIntelligenceSections(boat, recommendation, card, knowledge, allBoatRecords) {
        const intelligence = card?.intelligence || {};
        const modelSummary = root.BScoutIntelligenceLayer?.buildModelKnowledgeSummary
            ? root.BScoutIntelligenceLayer.buildModelKnowledgeSummary(boat) : null;
        const report = recommendation?.decisionReport || {};
        const missingFromCard = nonEmptyArray(card?.missingInformation).map(item => {
            if (typeof item === "string") return item;
            const label = item.label || item.field || item.AttributeID || "Information";
            return `${label} has not been verified.`;
        });
        const why = uniqueText(
            recommendation?.positives,
            explanations(report.matches),
            modelSummary?.positives,
            intelligence.bestMissions,
            splitText(boat?.Strengths)
        );
        const conflicts = uniqueText(
            recommendation?.cautions,
            explanations(report.conflicts),
            recommendation?.routeCompatibility?.warnings,
            modelSummary?.cautions,
            intelligence.lessSuitableIf,
            intelligence.lessSuitableMissions,
            splitText(boat?.Weaknesses),
            splitText(boat?.AvoidIf)
        );
        const unknowns = uniqueText(
            recommendation?.unknowns,
            explanations(report.unknowns),
            missingFromCard
        );
        const inspection = uniqueText(
            intelligence.inspectionPriorities,
            modelSummary?.inspectionFocus,
            splitText(boat?.CommonProblems)
        );
        const related = nonEmptyArray(knowledge?.Relationships).slice(0, 8).map(rel => {
            const otherId = rel.FromBoatModelID === boat?.BoatModelID ? rel.ToBoatModelID : rel.FromBoatModelID;
            const other = nonEmptyArray(allBoatRecords).find(item => String(item.BoatModelID) === String(otherId));
            return `${other ? boatName(other) : otherId} — ${rel.Rationale || rel.RelationshipType || "Related model"}`;
        });
        const evidence = nonEmptyArray(knowledge?.Evidence);
        const coverage = knowledge?.Coverage || null;
        return { why, conflicts, unknowns, inspection, related, evidence, coverage };
    }

    function renderOverview() {
        const boat = currentBoat;
        const recommendation = getRecommendation();
        const relation = getRelationship();
        const coverage = getKnowledge()?.Coverage;
        const score = recommendation?.overallFit ?? recommendation?.score ?? (typeof root.calculateBScoutScore === "function" ? root.calculateBScoutScore(boat).score : null);
        const positives = recommendation?.positives || recommendation?.decisionReport?.matches?.map(x => x.explanation) || splitText(boat.Strengths);
        const cautions = recommendation?.cautions || recommendation?.decisionReport?.unknowns?.map(x => x.explanation) || splitText(boat.Weaknesses);
        const conflicts = recommendation?.tradeoffs || recommendation?.decisionReport?.conflicts?.map(x => x.explanation) || splitText(boat.AvoidIf);
        return `<div class="workspace-overview-grid">
            <section class="workspace-card workspace-decision-card">
                <span class="workspace-label">Decision summary</span>
                <div class="workspace-score-row"><strong>${score == null ? "Not scored" : `${esc(score)}/100`}</strong><span>${esc(relation?.Status || "Unreviewed")}</span></div>
                <p>${esc(boat.TypicalMission || "Mission fit has not been documented.")}</p>
            </section>
            <section class="workspace-card"><h3>Quick Specifications</h3><div class="workspace-fact-grid">
                ${field("Length", boat.LOA_ft, " ft")}${field("Beam", boat.Beam_ft, " ft")}${field("Draft", boat.Draft_ft, " ft")}${field("Air Draft", boat.AirDraft_ft, " ft")}
                ${field("Fuel", boat.Fuel)}${field("Propulsion", boat.Propulsion)}${boat.RarityScore != null ? field("Rarity", `${boat.RarityScore}/5${boat.RarityLabel ? ` — ${boat.RarityLabel}` : ""}`) : ""}${boat.PriceLevel != null ? field("Price Level", `${boat.PriceLevel}/5${boat.PriceLevelLabel ? ` — ${boat.PriceLevelLabel}` : ""}`) : ""}
            </div></section>
            <section class="workspace-card"><h3>Why it remains a candidate</h3>${textList(positives, "No confirmed strengths have been recorded.")}</section>
            <section class="workspace-card"><h3>Cautions and unknowns</h3>${textList([...arr(cautions), ...arr(conflicts)], "No cautions have been recorded.")}</section>
            <section class="workspace-card workspace-coverage-summary"><h3>Knowledge confidence</h3>
                <div class="workspace-progress-line"><span style="width:${Number(coverage?.OverallScore || 0)}%"></span></div>
                <strong>${coverage?.OverallScore ?? 0}% structural coverage</strong>
                <p>${coverage?.VerifiedSourceCount || 0} verified source${coverage?.VerifiedSourceCount === 1 ? "" : "s"}; unknown information does not eliminate the model.</p>
            </section>
        </div>`;
    }


    function phaseFactDisplay(fact) {
        if (!fact || fact.ValueState !== "known") return "Unknown";
        const value = fact.CanonicalValue;
        if (fact.CanonicalUnit && root.BAtlasCanonical?.formatMeasurement) {
            const dimension = ["LOA","LWL","Beam","Draft","AirDraft","Headroom","MastHeight"].includes(fact.FieldID) ? "length"
                : fact.FieldID === "Displacement" ? "mass"
                : ["FuelCapacity","WaterCapacity","HoldingCapacity"].includes(fact.FieldID) ? "volume"
                : ["EnginePowerPerEngine"].includes(fact.FieldID) ? "power" : null;
            if (dimension) return root.BAtlasCanonical.formatMeasurement(value, dimension, "imperial");
        }
        return String(value).includes(".") ? humanCode(value) : String(value);
    }

    function renderProductionPhases() {
        const phases = arr(currentBoat?.ProductionPhases);
        if (!phases.length) return "";
        const rows = phases.map(phase => {
            const years = `${phase.StartYear ?? "?"}–${phase.EndYear ?? "?"}`;
            const facts = arr(phase.FactOverrides).filter(f => f.ValueState === "known");
            const changes = facts.map(f => {
                const label = String(f.FieldID || "").replace(/Code$/,"").replace(/([a-z0-9])([A-Z])/g,"$1 $2");
                return `${label}: ${phaseFactDisplay(f)}`;
            });
            const boundary = phase.BoundaryPrecision === "within_year"
                ? "transition occurred within a model year"
                : phase.BoundaryPrecision === "transition_years"
                    ? `transition around ${(phase.TransitionYears || []).join("/")}`
                    : "";
            return `<div class="workspace-fact-table-row"><span><strong>${esc(years)}</strong>${boundary ? `<small>${esc(boundary)}</small>` : ""}</span><span>${esc(changes.join(" · ") || "No phase-specific facts recorded")}</span><span>${esc(phase.ApplicabilityNote || "")}</span></div>`;
        }).join("");
        return `<section class="workspace-card"><h3>Production Evolution</h3>
            <p class="workspace-note">These are production phases of the same canonical model, not separate models. Phase-specific facts override model-wide values only when the applicable phase can be identified.</p>
            <div class="workspace-fact-table">
                <div class="workspace-fact-table-head"><span>Production phase</span><span>Material changes</span><span>Boundary / applicability</span></div>
                ${rows}
            </div>
        </section>`;
    }

    function renderKnowledge() {
        const boat = currentBoat;
        const intelligence = currentCard?.intelligence || {};
        return `<div class="workspace-section-stack">
            <section class="workspace-card"><h3>Identity</h3><div class="workspace-fact-grid">
                ${field("Manufacturer", boat.Manufacturer)}${field("Model", boat.Model)}${field("Variant", boat.Variant)}${field("Production Years", `${boat.FirstYear || "?"}–${boat.LastYear || "?"}`)}
                ${field("Designer", boat.Designer)}${field("Boat Model ID", boat.BoatModelID)}
            </div></section>
            ${renderProductionPhases()}
            <section class="workspace-card"><h3>Hull and Propulsion</h3><div class="workspace-fact-grid">
                ${field("Vessel Category", displayCanonical(boat, "VesselCategoryCode"))}
                ${field("Style", displayCanonical(boat, "StyleCode", ["Style","NormalizedStyle"]))}
                ${field("Hull Form", displayCanonical(boat, "HullBehaviourCode", ["HullType","NormalizedHullForm"]))}
                ${field("Hull Configuration", displayCanonical(boat, "HullConfigurationCode", ["NormalizedHullConfiguration"]))}
                ${field("Keel Configuration", displayCanonical(boat, "KeelConfigurationCode", ["KeelConfiguration","KeelType"]))}
                ${field("Rudder", displayCanonical(boat, "RudderTypeCode", ["RudderType"]))}
                ${field("Construction", boat.Construction)}
                ${field("Fuel", displayCanonical(boat, "FuelCode", ["Fuel"]))}
                ${field("Primary Propulsion", displayCanonical(boat, "PrimaryPropulsionModeCode"))}
                ${field("Mechanical Propulsion", displayCanonical(boat, "MechanicalPropulsionCode", ["PropulsionCode","Propulsion","NormalizedPropulsion"]))}
                ${boat.RarityScore != null ? field("Rarity", `${boat.RarityScore}/5${boat.RarityLabel ? ` — ${boat.RarityLabel}` : ""}`) : ""}
                ${boat.PriceLevel != null ? field("Price Level", `${boat.PriceLevel}/5${boat.PriceLevelLabel ? ` — ${boat.PriceLevelLabel}` : ""}`) : ""}
                ${field("Flybridge", displayCanonical(boat, "FlybridgeCode", ["Flybridge"]))}
                ${field("Side Decks", displayCanonical(boat, "SideDecksCode", ["SideDecks"]))}
            </div></section>
            <section class="workspace-card"><h3>Accommodation and Systems</h3><div class="workspace-fact-grid">
                ${field("Berths", boat.Berths)}${field("Cabins", boat.Cabins)}${field("Heads", boat.Heads)}
                ${field("Shower", displayCanonical(boat, "ShowerTypeCode", ["ShowerType","Shower"]))}
                ${field("Fuel Capacity", boat.FuelCapacity)}${field("Water Capacity", boat.WaterCapacity)}${field("Holding Capacity", boat.HoldingCapacity)}${field("Headroom", boat.Headroom_ft, " ft")}
            </div></section>
            <section class="workspace-card"><h3>Model Strengths & Trade-offs</h3>
                <div class="workspace-three-column"><div><h4>Strengths</h4>${textList(arr(intelligence.strengths).length ? intelligence.strengths : splitText(boat.Strengths))}</div>
                <div><h4>Trade-offs</h4>${textList(arr(intelligence.tradeoffs).length ? intelligence.tradeoffs : splitText(boat.Weaknesses))}</div>
                <div><h4>Known Model Problems</h4>${textList(splitText(boat.CommonProblems))}</div></div>
            </section>
            <section class="workspace-card"><h3>Model Character</h3>
                <p>${esc(intelligence.characterNarrative || boat.ModelCharacter || intelligence.signature || "Model character has not yet been researched.")}</p>
                <div class="workspace-fact-grid">
                    ${field("Design Philosophy", intelligence.designPhilosophy)}${field("Personality", intelligence.personality)}${field("Ideal Owner", intelligence.idealOwner)}
                    ${field("Living With the Model", intelligence.ownershipCharacter || boat.OwnershipCharacter)}${field("Ownership Ease", intelligence.ownershipEase)}${field("Maintenance Ease", intelligence.maintenanceEase)}
                    ${field("Parts Availability", intelligence.partsAvailability)}${field("Market Availability", intelligence.marketAvailability)}
                </div>
                <div><h4>Design Lineage</h4>${textList(arr(intelligence.designLineage).length ? intelligence.designLineage : arr(boat.DesignLineage), "Design lineage has not yet been researched.")}</div>
            </section>
        </div>`;
    }

    function renderIntelligence() {
        const recommendation = getRecommendation();
        const knowledge = getKnowledge();
        const boats = typeof allBoats !== "undefined" ? allBoats : (root.allBoats || []);
        const sections = buildIntelligenceSections(currentBoat, recommendation, currentCard, knowledge, boats);
        const evidenceText = sections.evidence.length
            ? `${sections.evidence.length} source${sections.evidence.length === 1 ? "" : "s"} attached; ${sections.coverage?.VerifiedSourceCount || 0} verified.`
            : "No evidence sources are attached yet. Treat guidance as provisional.";
        return `<div class="workspace-section-stack">
            <section class="workspace-card"><h3>Why B-Atlas presented this model</h3>${textList(sections.why, "This model is visible because no active criterion has eliminated it. Add or load search criteria for a personalized explanation.")}</section>
            <section class="workspace-card"><h3>Potential conflicts</h3>${textList(sections.conflicts, "No confirmed conflicts are recorded. Unknown information may still affect suitability.")}</section>
            <section class="workspace-card"><h3>Missing information and unknown risk</h3>${textList(sections.unknowns, "No recommendation-specific unknowns are currently recorded.")}</section>
            <section class="workspace-card"><h3>Inspection priorities</h3>${textList(sections.inspection, "No model-specific inspection priorities are recorded.")}</section>
            <section class="workspace-card"><h3>Related boats</h3>${textList(sections.related, "No related models are available.")}</section>
            <section class="workspace-card"><h3>Evidence and confidence</h3><p>${esc(evidenceText)}</p><p class="workspace-note">Coverage measures recorded information; it does not guarantee independent verification.</p></section>
        </div>`;
    }

    function collectResources() {
        // Ownership is intentionally a resource library, not a second copy of model research.
        // Model images remain part of the Guide/Dreaming experience rather than Own.
        const sections = ["documents", "ownerCommunities", "videos"];
        return sections.flatMap(type => arr(currentCard?.[type]).map(item => ({...item, group: type})));
    }
    function renderResources() {
        const resources = collectResources();
        const groups = [
            ["documents", "Manuals & Documents"],
            ["ownerCommunities", "Groups & Clubs"],
            ["videos", "Videos & Virtual Tours"]
        ];
        if (!resources.length) return `<section class="workspace-card"><h3>Owner Resource Library</h3><p class="workspace-empty">No verified owner resources have been attached yet. Missing resources remain unknown rather than inferred.</p></section>`;
        const rendered = groups.map(([key,label]) => {
            const items=resources.filter(x=>x.group===key);
            if(!items.length) return "";
            return `<section class="workspace-card"><h3>${esc(label)}</h3><ul class="workspace-resource-list">${items.map(item=>{const url=safeUrl(item.url);return `<li><div>${url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(item.title||item.label||"Resource")}</a>`:`<strong>${esc(item.title||item.label||"Resource")}</strong>`}<span>${esc(item.sourceLabel||item.resourceType||"Source not recorded")} · ${esc(item.verificationStatus||"Unverified")}</span></div></li>`}).join("")}</ul></section>`;
        }).filter(Boolean).join("");
        return `<div class="workspace-section-stack">${rendered}</div>`;
    }

    function renderEvidence() {
        const knowledge = getKnowledge();
        const facts = arr(knowledge?.Facts);
        const evidence = arr(knowledge?.Evidence);
        const conflicts = arr(knowledge?.Contradictions);
        return `<div class="workspace-section-stack">
            <section class="workspace-card"><h3>Source Registry</h3>${evidence.length ? `<ul class="workspace-resource-list">${evidence.map(src=>`<li><div><strong>${esc(src.Title||src.SourceID)}</strong><span>${esc(src.SourceType)} · ${esc(src.VerificationStatus)}${src.PublishedDate?` · ${esc(src.PublishedDate)}`:""}</span><p>${esc(src.Citation||src.Notes||"")}</p></div></li>`).join("")}</ul>` : `<p class="workspace-empty">No evidence sources are attached.</p>`}</section>
            <section class="workspace-card"><h3>Fact Provenance</h3><p>${facts.length} structured facts are recorded for this model. ${facts.filter(f=>f.VerificationStatus==="Verified").length} are verified.</p><div class="workspace-fact-table"><div class="workspace-fact-table-head"><span>Attribute</span><span>Value</span><span>Confidence</span></div>${facts.slice(0,80).map(f=>`<div><span>${esc(f.AttributeID)}</span><span>${esc(f.Value)}${f.Unit?` ${esc(f.Unit)}`:""}</span><span>${esc(f.Confidence||f.VerificationStatus||"Unknown")}</span></div>`).join("")}</div></section>
            <section class="workspace-card"><h3>Contradictions</h3>${conflicts.length ? textList(conflicts.map(c=>`${c.AttributeID}: ${c.Status||"Needs review"}`)) : `<p class="workspace-empty">No machine-detected contradictions are recorded. This does not imply independent verification.</p>`}</section>
        </div>`;
    }

    function renderProgress() {
        const coverage = getKnowledge()?.Coverage;
        if (!coverage) return `<section class="workspace-card"><h3>Research Progress</h3><p class="workspace-empty">Coverage has not been calculated.</p></section>`;
        const categories = Object.entries(coverage.Categories || {});
        return `<div class="workspace-section-stack"><section class="workspace-card workspace-progress-hero"><span class="workspace-label">Overall structural coverage</span><strong>${esc(coverage.OverallScore)}%</strong><div class="workspace-progress-line"><span style="width:${Number(coverage.OverallScore||0)}%"></span></div><p>${esc(coverage.CoverageStatus)} coverage · ${coverage.FactCount} facts · ${coverage.SourceCount} source${coverage.SourceCount===1?"":"s"}</p></section>
        <section class="workspace-card"><h3>Coverage by category</h3><div class="workspace-coverage-grid">${categories.map(([label,data])=>`<div><div><strong>${esc(label)}</strong><span>${esc(data.Score)}%</span></div><div class="workspace-progress-line"><span style="width:${Number(data.Score||0)}%"></span></div><small>${esc(data.Known)} of ${esc(data.Total)} fields known</small></div>`).join("")}</div></section>
        <section class="workspace-card"><h3>Research status</h3><div class="workspace-fact-grid">${field("Verified Sources", coverage.VerifiedSourceCount)}${field("Contradictions", coverage.ContradictionCount)}${field("Relationships", coverage.RelationshipCount)}${field("Structured Facts", coverage.FactCount)}</div><p class="workspace-note">Coverage measures presence. Verification is tracked separately.</p></section></div>`;
    }


    function normalizeAliases(value) {
        if (Array.isArray(value)) return value.map(String).map(x => x.trim()).filter(Boolean);
        if (!value) return [];
        return String(value).split(/\s*;\s*|\r?\n/).map(x => x.trim()).filter(Boolean);
    }

    function renderIndividualListings(options = {}) {
        const listings = typeof root.getListingsForBoat === "function" ? root.getListingsForBoat(currentBoat.BoatModelID) : [];
        const emptyText = options.emptyText || "No individual boats are attached to this model.";
        const cards = listings.length ? listings.map(listing => {
            let price = "Price unknown";
            const amount = Number(listing.Price);
            if (Number.isFinite(amount) && amount > 0) {
                try { price = new Intl.NumberFormat("en-CA", {style:"currency", currency:listing.Currency || "CAD", maximumFractionDigits:0}).format(amount); }
                catch (_) { price = `${listing.Currency || "CAD"} ${amount.toLocaleString("en-CA")}`; }
            }
            const title = listing.Title || [listing.Year, currentBoat.Manufacturer, currentBoat.Model, currentBoat.Variant].filter(Boolean).join(" ");
            return `<article class="workspace-listing-card"><div><span class="listing-source">${esc(listing.Source || "Saved listing")}</span><h4>${esc(title)}</h4><p>${esc(price)} · ${esc(listing.Location || "Location unknown")} · ${esc(listing.Status || "Watching")}</p></div><div class="listing-card-actions"><button type="button" class="workspace-open-listing" data-listing-id="${esc(listing.ListingID)}">Listing Details</button>${safeUrl(listing.URL) ? `<a href="${esc(safeUrl(listing.URL))}" target="_blank" rel="noopener noreferrer">Original Listing</a>` : ""}</div></article>`;
        }).join("") : `<p class="workspace-empty">${esc(emptyText)}</p>`;
        return { listings, cards };
    }

    function renderBuyThisBoat() {
        const boat = currentBoat;
        const layer = root.BScoutIntelligenceLayer;
        const discovery = layer && typeof layer.buildBrokerDiscovery === "function"
            ? layer.buildBrokerDiscovery(boat)
            : {query:boatName(boat), aliases:[], groups:[], sourceCount:0};

        const searchGroups = arr(discovery.groups).map(group => {
            const links = arr(group.links).filter(link => safeUrl(link.url));
            if (!links.length) return "";
            const brokers = links.filter(link => link.sourceType === "Broker");
            const marketplaces = links.filter(link => link.sourceType === "Marketplace");
            const rows = items => items.map(link => {
                const statusMeta = {
                    ListingLikely: { icon: "✓", label: "Listing likely", className: "is-viable" },
                    NoListingIndicated: { icon: "—", label: "No listing indicated", className: "is-empty" },
                    SourceUnavailable: { icon: "!", label: "Source unavailable", className: "is-unresponsive" },
                    Inconclusive: { icon: "?", label: "Check inconclusive", className: "is-unknown" },
                    CheckPending: { icon: "?", label: "Automated check pending", className: "is-unknown" },
                    NotChecked: { icon: "?", label: "Automated check pending", className: "is-unknown" }
                };
                const meta = statusMeta[link.status] || statusMeta.NotChecked;
                const action = link.status === "ListingLikely"
                    ? "Open search"
                    : (link.action === "Search model" ? "Search model" : "Browse inventory");
                const title = [meta.label, link.message, link.lastChecked ? `Checked ${link.lastChecked}` : ""]
                    .filter(Boolean).join(" · ");
                const content = `<span class="broker-status-icon" aria-hidden="true">${meta.icon}</span><span class="broker-source-copy"><span class="broker-source-name">${esc(link.label)}</span><span class="broker-source-message">${esc(meta.label)}</span></span><span class="broker-source-action">${esc(link.status === "SourceUnavailable" ? "Unavailable" : action)}</span>`;
                if (link.status === "SourceUnavailable") {
                    return `<div class="broker-source-row ${meta.className} is-disabled" role="status" title="${esc(title)}">${content}</div>`;
                }
                return `<a class="broker-source-row ${meta.className}" href="${esc(safeUrl(link.url))}" target="_blank" rel="noopener noreferrer" title="${esc(title)}">${content}</a>`;
            }).join("");
            return `<section class="workspace-card market-source-group"><div class="market-group-heading"><h3>${esc(group.region)}</h3><span>${links.length} sources</span></div>${brokers.length ? `<div class="market-source-subgroup"><strong>Brokerages</strong>${rows(brokers)}</div>` : ""}${marketplaces.length ? `<div class="market-source-subgroup"><strong>Marketplaces</strong>${rows(marketplaces)}</div>` : ""}</section>`;
        }).join("");

        const aliases = arr(discovery.aliases).slice(0, 8);
        const summary = layer && typeof layer.buildModelKnowledgeSummary === "function" ? layer.buildModelKnowledgeSummary(boat) : null;
        const knownProblems = uniqueText(
            arr(currentCard?.knownIssues).map(item => typeof item === "string" ? item : (item.issue || item.label || item.description || "")),
            arr(currentCard?.intelligence?.inspectionPriorities),
            arr(summary?.inspectionFocus),
            splitText(boat.CommonProblems)
        ).slice(0, 8);
        const priceFields = [
            ["Project", boat.ProjectPriceRangeCAD || boat.ProjectPriceRange],
            ["Good", boat.GoodPriceRangeCAD || boat.GoodPriceRange],
            ["Exceptional", boat.ExceptionalPriceRangeCAD || boat.ExcellentPriceRangeCAD || boat.ExceptionalPriceRange]
        ].filter(([,value]) => known(value));
        const individual = renderIndividualListings({emptyText:"No boats saved for this model."});
        const sourceCount = Number(discovery.sourceCount || 0);
        const allSourceLinks = arr(discovery.groups)
            .flatMap(group => arr(group.links));
        const likelyListingSources = allSourceLinks.filter(link => link.status === "ListingLikely");
        const completedSourceChecks = allSourceLinks.filter(link => !["NotChecked", "CheckPending"].includes(link.status));

        return `<div class="workspace-section-stack buy-this-boat-workspace">
            <section class="workspace-card buy-candidate-listings"><div class="workspace-section-heading"><div><h3>Saved Listings</h3><p>Individual boats for sale that you are tracking for this model.</p></div><button type="button" id="addWorkspaceListing">Add Listing</button></div><div class="workspace-listings-list">${individual.cards}</div></section>

            <section class="market-coverage-strip" aria-label="Marketplace search coverage">
                <div class="market-coverage-item"><span class="market-coverage-icon" aria-hidden="true">⌕</span><strong>${sourceCount}</strong><span>search sources</span></div>
                <div class="market-coverage-item"><span class="market-coverage-icon" aria-hidden="true">${likelyListingSources.length ? "✓" : (completedSourceChecks.length ? "?" : "…")}</span><strong>${likelyListingSources.length || (completedSourceChecks.length ? "None confirmed" : "Pending")}</strong><span>${likelyListingSources.length === 1 ? "source with a likely listing" : (likelyListingSources.length ? "sources with a likely listing" : "automated source check") }</span></div>
            </section>

            ${priceFields.length ? `<section class="workspace-card market-price-card"><div class="market-card-title"><span aria-hidden="true">$</span><h3>Typical Asking Price</h3></div><div class="workspace-fact-grid">${priceFields.map(([label,value])=>field(label,value)).join("")}</div><p class="workspace-note">Model guidance only.</p></section>` : ""}

            <section class="workspace-section-heading buy-find-more-heading"><div><span class="workspace-label">Search</span><h3>Find This Model</h3><p>Direct searches open filtered model results. Other sources open their inventory.</p></div></section>
            <div class="market-source-grid">${searchGroups}</div>

            <section class="workspace-card market-problems-card"><div class="market-card-title"><span aria-hidden="true">!</span><h3>Known Problems</h3></div>${knownProblems.length ? `<ul class="market-problem-list">${knownProblems.map(item=>`<li><span aria-hidden="true">!</span><span>${esc(item)}</span></li>`).join("")}</ul><p class="workspace-note">Model-wide reports only. Verify against the individual boat.</p>` : `<div class="market-empty-state"><span aria-hidden="true">?</span><p>No model-specific problems have been recorded.</p></div>`}</section>
        </div>`;
    }

    function renderNotebook() {
        const rel = getRelationship();
        const research = rel?.Research || {};
        return `<div class="workspace-section-stack">
            <section class="workspace-card"><h3>My model assessment</h3><div class="workspace-notebook-grid"><label>Stage<select id="workspaceNotebookStatus"><option value="None">Unreviewed</option><option value="Favorite">Interested</option><option value="Candidate">Shortlist</option><option value="Research">Researching</option><option value="Rejected">Rejected</option></select></label><label>Rating<select id="workspaceNotebookRating"><option value="0">Unrated</option><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select></label></div></section>
            <section class="workspace-card"><label class="workspace-field-label" for="workspaceNotebookNotes">Model Notes</label><textarea id="workspaceNotebookNotes" rows="8" placeholder="Record research or preferences that apply to this model generally. Listing-specific observations belong in the Listing Workspace.">${esc(research.Notes||"")}</textarea></section>
            <section class="workspace-card"><label class="workspace-field-label" for="workspaceNotebookTags">Tags</label><input id="workspaceNotebookTags" type="text" value="${esc(research.Tags||"")}" placeholder="classic, project boat, inspect fuel tanks"></section>
            <section class="workspace-card workspace-notebook-separation"><h3>Listing-specific notes</h3><p>Observations about a particular engine, seller, condition, inspection, survey, offer or repair estimate belong in that boat’s <strong>Listing Workspace</strong>.</p><button type="button" id="openListingsFromNotebook" class="workspace-secondary-action">Open Model Listings</button></section>
            <div class="workspace-form-actions"><span id="workspaceNotebookSaveState" class="workspace-save-state" aria-live="polite"></span><button type="button" id="saveWorkspaceNotebook">Save Rating, Notes & Tags</button></div>
        </div>`;
    }


    function sectionIntro(title, text) {
        return `<header class="boat-guide-section-intro"><h2>${esc(title)}</h2><p>${esc(text)}</p></header>`;
    }
    function progressiveSection(id, title, content, open) {
        return `<details id="${esc(id)}" class="boat-guide-subsection boat-guide-subsection-target"${open ? " open" : ""}><summary>${esc(title)}</summary><div class="boat-guide-subsection-body">${content}</div></details>`;
    }
    function sectionMenu(items) {
        return `<nav class="boat-guide-section-menu" aria-label="Sections on this page">${items.map(item => `<button type="button" data-guide-target="${esc(item.id)}">${esc(item.label)}</button>`).join("")}</nav>`;
    }
    function unknownPrinciple() {
        return `<p class="boat-guide-unknown-note"><strong>Confidence rule:</strong> Missing information remains unknown. It does not count against this model or imply that a feature is absent.</p>`;
    }
    function renderDreaming() {
        const boat = currentBoat || {};
        const intelligence = currentCard?.intelligence || {};
        const videos = arr(currentCard?.videos);
        const images = arr(currentCard?.images);
        const highlights = arr(intelligence.strengths).length ? intelligence.strengths : splitText(boat.Strengths);
        const media = [...images.map(item=>({...item,group:"images"})), ...videos.map(item=>({...item,group:"videos"}))];
        const mediaHtml = media.length ? `<ul class="workspace-resource-list">${media.map(item=>{const url=safeUrl(item.url);return `<li><div>${url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(item.title||item.label||"View resource")}</a>`:`<strong>${esc(item.title||item.label||"Resource")}</strong>`}<span>${esc(item.group==="videos"?"Walkthrough / Video":"Image / Visual reference")}${item.sourceLabel?` · ${esc(item.sourceLabel)}`:""}</span></div></li>`}).join("")}</ul>` : `<p class="workspace-empty">No verified walkthrough videos or additional visual resources are attached yet.</p>`;
        return `${sectionIntro("Dream", "See what this model is like before turning curiosity into deep research.")}
            <div class="workspace-section-stack">
              <section class="workspace-card"><h3>Why people consider it</h3><p>${esc(intelligence.characterNarrative || boat.ModelCharacter || intelligence.signature || "Model character has not yet been researched.")}</p>${textList(highlights, "No confirmed strengths have been recorded.")}</section>
              <section class="workspace-card"><h3>At a glance</h3><div class="workspace-fact-grid">
                ${field("Length", boat.LOA_ft, " ft")}${field("Beam", boat.Beam_ft, " ft")}${field("Style", boat.Style || boat.NormalizedStyle)}${field("Hull", boat.HullType || boat.NormalizedHullForm)}
                ${field("Fuel", boat.Fuel)}${field("Propulsion", boat.Propulsion)}${boat.RarityScore != null ? field("Rarity", `${boat.RarityScore}/5${boat.RarityLabel ? ` — ${boat.RarityLabel}` : ""}`) : ""}${boat.PriceLevel != null ? field("Price Level", `${boat.PriceLevel}/5${boat.PriceLevelLabel ? ` — ${boat.PriceLevelLabel}` : ""}`) : ""}
              </div></section>
              <section class="workspace-card"><h3>Walkthroughs & Visual Resources</h3>${mediaHtml}</section>
            </div>`;
    }
    function communityGuideCounts() {
        return root.BScoutCommunityGuide?.counts?.(currentBoat?.BoatModelID) || {research:0,buyer:0,photos:0,resources:0};
    }
    function renderCommunityResearch() { return root.BScoutCommunityGuide?.renderResearch?.(currentBoat?.BoatModelID) || ""; }
    function renderCommunityBuyer() { return root.BScoutCommunityGuide?.renderBuyer?.(currentBoat?.BoatModelID) || ""; }
    function renderCommunityPhotos() { return root.BScoutCommunityGuide?.renderPhotos?.(currentBoat?.BoatModelID) || ""; }
    function renderCommunityResources() { return root.BScoutCommunityGuide?.renderResources?.(currentBoat?.BoatModelID) || ""; }

    function renderResearch() {
        const cc=communityGuideCounts();
        const menu=[{id:"guide-overview",label:"Overview"},{id:"guide-specifications",label:"Specifications & Variations"},{id:"guide-evidence",label:"Evidence & Confidence"}];
        if(cc.research) menu.splice(2,0,{id:"guide-community-knowledge",label:"Owner Knowledge"});
        if(cc.photos) menu.splice(cc.research?3:2,0,{id:"guide-community-photos",label:"Owner Photos"});
        return `${sectionIntro("Research", "Understand the serious candidate: design intent, model character, trade-offs, known problems, specifications and evidence.")}
            ${sectionMenu(menu)}${unknownPrinciple()}
            ${progressiveSection("guide-overview", "Model overview and fit", renderOverview(), true)}
            ${progressiveSection("guide-specifications", "Specifications, model character and variations", renderKnowledge(), false)}
            ${cc.research?progressiveSection("guide-community-knowledge", "Owner-informed model knowledge", renderCommunityResearch(), false):""}
            ${cc.photos?progressiveSection("guide-community-photos", "Owner-contributed photos", renderCommunityPhotos(), false):""}
            ${progressiveSection("guide-evidence", "Evidence and confidence", renderEvidence(), false)}`;
    }

    function renderBuying() {
        const cc=communityGuideCounts();
        const menu=[{id:"guide-buying-actions",label:"Listings & Buying Actions"},{id:"guide-buying-knowledge",label:"Inspection Look-outs"}];
        if(cc.buyer) menu.push({id:"guide-community-inspection",label:"Owner Inspection Advice"});
        return `${sectionIntro("Buy", "Move from model research to actual boats for sale: listings, seller conversations, inspection findings, pricing and offers.")}
            ${sectionMenu(menu)}${unknownPrinciple()}
            ${progressiveSection("guide-buying-actions", "Listings and buying actions", renderBuyThisBoat(), true)}
            ${progressiveSection("guide-buying-knowledge", "Known concerns and inspection look-outs", renderIntelligence(), false)}
            ${cc.buyer?progressiveSection("guide-community-inspection", "Owner-informed inspection advice", renderCommunityBuyer(), false):""}`;
    }

    function renderOwning() {
        const community=renderCommunityResources();
        const curated=collectResources().length ? renderResources() : "";
        const empty=!curated&&!community ? `<section class="workspace-card"><h3>Owner Resource Library</h3><p class="workspace-empty">No verified owner resources have been attached yet. Missing resources remain unknown rather than inferred.</p></section>` : "";
        return `${sectionIntro("Owner Resources", "Model-specific manuals, documents, groups, forums, videos and virtual tours.")}
            ${curated}${community}${empty}`;
    }

    function renderSelling() {
        const boat = currentBoat || {};
        const concerns = buildIntelligenceSections(boat, getRecommendation(), currentCard, getKnowledge(), root.allBoats || []).inspection;
        const menu=[{id:"guide-buyer-expectations",label:"Buyer Expectations"},{id:"guide-sale-evidence",label:"Records to Prepare"},{id:"guide-valuation",label:"Valuation Status"}];
        return `${sectionIntro("Sell", "Prepare this model for buyer scrutiny without overstating condition, value or certainty.")}
            ${sectionMenu(menu)}${unknownPrinciple()}
            ${progressiveSection("guide-buyer-expectations", "What buyers will expect", `<div class="workspace-section-stack"><section class="workspace-card"><p>Document maintenance, upgrades, engine details, equipment and unresolved concerns. Model-wide knowledge belongs here; the condition of an individual boat belongs in its My Boat record.</p></section><section class="workspace-card"><h3>Questions to prepare for</h3>${textList(concerns, "No model-specific inspection concerns have been verified yet.")}</section></div>`, true)}
            ${progressiveSection("guide-sale-evidence", "Evidence and records to assemble", `<section class="workspace-card">${textList(["Ownership and registration records", "Engine and equipment details", "Maintenance and upgrade records", "Manuals, surveys and receipts", "Clear photographs of important systems"], "No preparation guidance available.")}</section>`, false)}
            ${progressiveSection("guide-valuation", "Valuation status", `<section class="workspace-card"><p>B-Atlas does not calculate an authoritative value from incomplete market evidence. Asking prices and listing records remain reference information only.</p></section>`, false)}`;
    }

    function setTab(tab) {
        activeTab = tabOrder.includes(tab) ? tab : "research";
        rememberTab(activeTab);
        document.querySelectorAll(".boat-workspace-tab").forEach(btn => {
            const selected = btn.dataset.workspaceTab === activeTab;
            btn.classList.toggle("active", selected);
            btn.setAttribute("aria-selected", String(selected));
            btn.tabIndex = selected ? 0 : -1;
        });
        document.querySelectorAll(".boat-workspace-panel").forEach(panel => {
            const selected = panel.dataset.workspacePanel === activeTab;
            panel.classList.toggle("active", selected);
            panel.hidden = !selected;
        });
        const panel = document.querySelector(`[data-workspace-panel="${activeTab}"]`);
        if (!panel || !currentBoat) return;
        const renderers = {research:renderResearch, buying:renderBuying, owning:renderOwning, notebook:renderNotebook};
        panel.innerHTML = (renderers[activeTab] || renderResearch)();
        bindSectionMenu(panel);
        if (activeTab === "notebook") bindNotebook();
        if (activeTab === "buying") { bindBuyThisBoat(); bindListings(); }
        root.BScoutCommunityGuide?.enhance?.(panel);
    }

    function bindSectionMenu(panel) {
        panel?.querySelectorAll("[data-guide-target]").forEach(button => button.addEventListener("click", () => {
            const target = panel.querySelector(`#${button.dataset.guideTarget}`);
            if (!target) return;
            target.open = true;
            target.scrollIntoView({behavior:"smooth", block:"start"});
            window.setTimeout(() => target.querySelector("summary")?.focus({preventScroll:true}), 350);
        }));
    }

    function bindNotebook() {
        const rel = getRelationship();
        const research = rel?.Research || {};
        const status = document.getElementById("workspaceNotebookStatus");
        const rating = document.getElementById("workspaceNotebookRating");
        if (status) status.value = rel?.Status || "None";
        if (rating) rating.value = String(research.Rating || 0);
        document.getElementById("saveWorkspaceNotebook")?.addEventListener("click", saveNotebook);
        ["workspaceNotebookStatus", "workspaceNotebookRating", "workspaceNotebookNotes", "workspaceNotebookTags"].forEach(id => {
            const input = document.getElementById(id);
            if (!input) return;
            const markUnsaved = () => {
                const state = document.getElementById("workspaceNotebookSaveState");
                if (state) state.textContent = "Unsaved changes";
            };
            input.addEventListener("input", markUnsaved);
            input.addEventListener("change", markUnsaved);
        });
        document.getElementById("openListingsFromNotebook")?.addEventListener("click", () => setTab("buying"));
    }
    function bindBuyThisBoat() {
        document.getElementById("openInspectionKnowledge")?.addEventListener("click", () => setTab("buying"));
        bindListings();
    }

    function bindListings() {
        document.getElementById("addWorkspaceListing")?.addEventListener("click", () => {
            if (typeof root.openListingWorkspace === "function") root.openListingWorkspace(null, currentBoat.BoatModelID);
        });
        document.querySelectorAll(".workspace-open-listing").forEach(button => button.addEventListener("click", () => {
            if (typeof root.openListingWorkspace === "function") root.openListingWorkspace(button.dataset.listingId, currentBoat.BoatModelID);
        }));
    }

    function saveNotebook() {
        const rel = getRelationship(); if (!rel) return;
        rel.Status = document.getElementById("workspaceNotebookStatus")?.value || rel.Status;
        rel.Research = rel.Research || {};
        rel.Research.Rating = Number(document.getElementById("workspaceNotebookRating")?.value || 0);
        rel.Research.Notes = document.getElementById("workspaceNotebookNotes")?.value || "";
        rel.Research.Tags = document.getElementById("workspaceNotebookTags")?.value || "";
        rel.LastUpdated = new Date().toISOString();
        if (typeof root.appendDecisionHistory === "function") root.appendDecisionHistory(rel, "notebook", "Notebook updated", rel.Research.Tags || "Notes or rating changed");
        if (typeof root.persistCurrentSearchProfile === "function") root.persistCurrentSearchProfile();
        const state = document.getElementById("workspaceNotebookSaveState");
        if (state) state.textContent = "Saved";
        const status = document.getElementById("boatWorkspaceStatus");
        if (status) { status.textContent = "Rating, notes and tags saved."; setTimeout(()=>{status.textContent="";},2200); }
        if (typeof root.updateAllBoatStatusSelects === "function") root.updateAllBoatStatusSelects();
        if (typeof root.updateBuyerWorkspaceCounts === "function") root.updateBuyerWorkspaceCounts();
    }

    async function open(boat, tab) {
        currentBoat = boat;
        if (root.BScoutNavigation) root.BScoutNavigation.push("guide", { boatModelId: boat.BoatModelID, tab: tab || "" });
        currentCard = null;
        const guide = document.getElementById("boatGuideView"); if (!guide) return;
        document.getElementById("modalTitle").textContent = boatName(boat);
        document.getElementById("workspaceIdentitySummary").textContent = `${boat.FirstYear || "?"}–${boat.LastYear || "?"} · ${boat.NormalizedStyle || boat.Style || "Style unknown"} · Model knowledge, not an individual listing`;
        const contributeButton = document.getElementById("contributeToGuideBtn");
        if (contributeButton) {
            contributeButton.dataset.modelId = boat.BoatModelID || "";
            contributeButton.dataset.manufacturer = boat.Manufacturer || boat.Make || "";
            contributeButton.dataset.model = boat.Model || "";
            contributeButton.dataset.variant = boat.Variant || "";
            contributeButton.dataset.guideName = boatName(boat);
        }
        const image = document.getElementById("modalImage");
        if (image && root.ImageAssetManager) { image.src = root.ImageAssetManager.resolveBoatImage(boat); image.alt = boatName(boat); image.style.display = "block"; root.ImageAssetManager.applyImageFallback(image); }
        root.BScoutOwnership?.hideOwnedView();
        document.getElementById("lifecycleHome")?.setAttribute("hidden", "");
        document.getElementById("discoverView")?.setAttribute("hidden", "");
        guide.hidden = false;
        guide.scrollIntoView({behavior:"smooth", block:"start"});
        const requestedTab = ({overview:"research", knowledge:"research", intelligence:"research", buy:"buying", listings:"buying", resources:"owning", progress:"research", evidence:"research", notebook:"notebook", dream:"research", dreaming:"research", research:"research", sell:"buying", selling:"buying"})[tab] || tab;
        setTab(requestedTab || getRememberedTab(boat) || "research");
        const status = document.getElementById("boatWorkspaceStatus"); if (status) status.textContent = "Loading curated model knowledge…";
        try {
            if (root.BScoutKnowledgeUI) currentCard = await root.BScoutKnowledgeUI.loadCardForBoat(boat);
            if (status) status.textContent = "";
            setTab(activeTab);
        } catch (error) {
            console.error("Boat Workspace knowledge load failed:", error);
            if (status) status.textContent = "Curated resources could not be loaded. Core model data remains available.";
        }
    }

    if (typeof document !== "undefined") {
        document.addEventListener("click", event => {
            const tab = event.target.closest(".boat-workspace-tab"); if (tab) setTab(tab.dataset.workspaceTab);
        });
        document.addEventListener("keydown", event => {
            const tab = event.target.closest?.(".boat-workspace-tab");
            if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const currentIndex = tabOrder.indexOf(tab.dataset.workspaceTab);
            const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabOrder.length - 1 :
                (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + tabOrder.length) % tabOrder.length;
            const nextTab = document.querySelector(`.boat-workspace-tab[data-workspace-tab="${tabOrder[nextIndex]}"]`);
            if (nextTab) { setTab(tabOrder[nextIndex]); nextTab.focus(); }
        });
    }

    function refreshActiveTab() { setTab(activeTab); }

    return {open, setTab, refreshActiveTab, renderDreaming, renderBuying, renderOwning, renderSelling, renderNotebook, buildIntelligenceSections};
});
