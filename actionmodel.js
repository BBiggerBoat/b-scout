/**
 * B-Scout Action Model
 *
 * Converts evaluation evidence into deterministic buyer next-actions.
 * It does not re-evaluate boats, change recommendation classifications,
 * or eliminate candidates. Unknown information always produces a verification
 * action rather than a rejection.
 */

const ACTION_TYPES = {
    VerifyData: "VerifyData",
    ResolveConflict: "ResolveConflict",
    Proceed: "Proceed"
};

const ACTION_PRIORITIES = {
    High: "High",
    Medium: "Medium",
    Low: "Low"
};

function isRequiredEvaluation(evaluation) {
    if (!evaluation) return false;
    if (typeof isRequired === "function") {
        return isRequired(evaluation.requirement);
    }
    return evaluation.requirement === "Required";
}

function humanizeFeature(feature) {
    const names = {
        AirDraft: "air draft",
        Draft: "draft",
        LOA: "length",
        Length: "length",
        Beam: "beam",
        HullType: "hull type",
        Fuel: "fuel type",
        Propulsion: "propulsion",
        Layout: "layout",
        SideDecks: "side decks",
        Style: "boat style"
    };
    return names[feature] || String(feature || "information").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

function buildAction({ type, priority, feature, title, instruction, reason, destination = null }) {
    return {
        type,
        priority,
        feature: feature || "General",
        title,
        instruction,
        reason: reason || "",
        destination
    };
}

/**
 * Generate buyer actions from standardized evaluation evidence.
 *
 * @param {Object} evaluationContext
 * @returns {Array<Object>}
 */
function generateBuyerActions(evaluationContext) {
    const evaluations = evaluationContext && Array.isArray(evaluationContext.evaluations)
        ? evaluationContext.evaluations
        : [];

    const actions = [];

    evaluations.forEach(evaluation => {
        if (!evaluation || evaluation.status === "Not Applicable") return;

        const featureName = humanizeFeature(evaluation.feature);
        const required = isRequiredEvaluation(evaluation);

        if (evaluation.status === "Unknown") {
            actions.push(buildAction({
                type: ACTION_TYPES.VerifyData,
                priority: required ? ACTION_PRIORITIES.High : ACTION_PRIORITIES.Medium,
                feature: evaluation.feature,
                title: `Verify ${featureName}`,
                instruction: `Confirm the boat's ${featureName} before making a final decision.`,
                reason: evaluation.reason,
                destination: "UpdateSpecification"
            }));
        } else if (evaluation.status === "Conflict") {
            actions.push(buildAction({
                type: ACTION_TYPES.ResolveConflict,
                priority: required ? ACTION_PRIORITIES.High : ACTION_PRIORITIES.Medium,
                feature: evaluation.feature,
                title: required ? `Resolve required ${featureName} conflict` : `Review ${featureName} trade-off`,
                instruction: required
                    ? `Do not proceed unless the ${featureName} conflict can be resolved or the requirement is changed.`
                    : `Decide whether the ${featureName} trade-off is acceptable for your intended use.`,
                reason: evaluation.reason,
                destination: required ? "ReviewRequirement" : "CompareCandidates"
            }));
        }
    });

    if (actions.length === 0 && evaluations.some(evaluation => evaluation && evaluation.status === "Match")) {
        actions.push(buildAction({
            type: ACTION_TYPES.Proceed,
            priority: ACTION_PRIORITIES.Low,
            feature: "General",
            title: "Continue researching this candidate",
            instruction: "Review current listings and vessel-specific condition before contacting a seller.",
            reason: "No evaluated requirement conflicts or missing required information were identified.",
            destination: "KnowledgeCard"
        }));
    }

    const priorityRank = { High: 0, Medium: 1, Low: 2 };
    return actions.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
}

const actionModelApi = {
    ACTION_TYPES,
    ACTION_PRIORITIES,
    humanizeFeature,
    buildAction,
    generateBuyerActions
};

if (typeof window !== "undefined") {
    Object.assign(window, actionModelApi);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = actionModelApi;
}
