/**
 * B-Scout Evaluation Rules Layer
 * 
 * =========================================================================
 * ARCHITECTURAL DESIGN & RESPONSIBILITIES
 * =========================================================================
 * - This file contains rules infrastructure only.
 * - No scoring calculations belong here.
 * - recommendationengine.js (and future scoring modules) will consume this layer later.
 */

// =========================================================================
// 1. FEATURE KEYS (B-Scout Attribute Constants)
// =========================================================================
const FEATURE_KEYS = {
    LOA: "LOA",
    Beam: "Beam",
    Draft: "Draft",
    AirDraft: "AirDraft",
    Fuel: "Fuel",
    HullType: "HullType",
    Propulsion: "Propulsion",
    Length: "Length",
    Style: "Style",
    Layout: "Layout",
    SideDecks: "SideDecks"
};

// =========================================================================
// 2. BUYER REQUIREMENT VOCABULARY (Authoritative v4 model)
// =========================================================================
const REQUIREMENT_LEVELS = {
    Required: {
        key: "Required",
        displayName: "Required",
        weight: 1.0,
        description: "Must be satisfied. A known conflict eliminates the candidate."
    },
    Preferred: {
        key: "Preferred",
        displayName: "Preferred",
        weight: 0.4,
        description: "Desirable but not mandatory. A conflict reduces suitability."
    },
    NoRequirement: {
        key: "NoRequirement",
        displayName: "No Requirement",
        weight: 0.0,
        description: "No buyer preference. The feature does not affect suitability."
    }
};

/**
 * Converts current and legacy profile values to the authoritative three-level model.
 * Legacy values are accepted only so existing saved profiles continue to load.
 * Negative legacy preferences (Avoid/Forbidden) cannot be represented faithfully by
 * the v4 model and therefore resolve to NoRequirement rather than being misclassified.
 */
function normalizeRequirement(value) {
    if (!value || typeof value !== "string") return "NoRequirement";
    const cleaned = value.trim().toLowerCase().replace(/[\s_-]/g, "");

    if (["required", "dealbreaker", "critical"].includes(cleaned)) return "Required";
    if (["preferred", "prefer", "stronglypreferred", "stronglyprefer"].includes(cleaned)) return "Preferred";
    if (["norequirement", "neutral", "none", "notapplicable", "avoid", "forbidden"].includes(cleaned)) return "NoRequirement";

    return "NoRequirement";
}

function getRequirementDefinition(value) {
    return REQUIREMENT_LEVELS[normalizeRequirement(value)];
}

function isRequired(value) {
    return normalizeRequirement(value) === "Required";
}

/**
 * Temporary compatibility aliases for code that still reads the old importance API.
 * These return only v4-compatible values and must not be used to introduce new levels.
 */
function normalizeImportance(value) {
    const requirement = normalizeRequirement(value);
    return requirement === "NoRequirement" ? "Neutral" : requirement;
}

function getImportanceDefinition(value) {
    const requirement = normalizeRequirement(value);
    return REQUIREMENT_LEVELS[requirement];
}

function getImportanceWeight(value) {
    return getRequirementDefinition(value).weight;
}

function isFailLevel(value) {
    return isRequired(value);
}

// =========================================================================
// 3. REUSABLE HELPER FUNCTIONS
// =========================================================================

/**
 * Generic comparison helper supporting strings, arrays, booleans, and future numeric ranges.
 * 
 * @param {any} actual - The actual characteristic value of the boat
 * @param {any} expected - The expected profile preference value or range
 * @returns {boolean} True if actual matches the expected constraints/values
 */
function compareValues(actual, expected) {
    if (actual === undefined || actual === null) return false;
    if (expected === undefined || expected === null) return true; // No expectation acts as a match
    
    // Numeric range evaluation support
    if (typeof actual === "number" && typeof expected === "object" && expected !== null) {
        if (expected.min !== undefined && actual < expected.min) return false;
        if (expected.max !== undefined && actual > expected.max) return false;
        return true;
    }

    // Exact match
    if (actual === expected) return true;
    
    // Case-insensitive string matching
    if (typeof actual === "string" && typeof expected === "string") {
        return actual.trim().toLowerCase() === expected.trim().toLowerCase();
    }
    
    // Array support (checks if actual string value is in expected list, or vice versa)
    if (Array.isArray(expected)) {
        const checkVal = typeof actual === "string" ? actual.trim().toLowerCase() : actual;
        return expected.map(v => typeof v === "string" ? v.trim().toLowerCase() : v).includes(checkVal);
    }
    
    if (Array.isArray(actual)) {
        const checkVal = typeof expected === "string" ? expected.trim().toLowerCase() : expected;
        return actual.map(v => typeof v === "string" ? v.trim().toLowerCase() : v).includes(checkVal);
    }
    
    return false;
}

/**
 * Return a standardized Evaluation Result object:
 * 
 * @param {string} feature - Standardized taxonomy feature key from FEATURE_KEYS
 * @param {string} importance - Normalized importance level string
 * @param {string} status - Evaluation match status (e.g., "Pass", "Fail", "Unknown")
 * @param {number} score - Computed suitability contribution (0.0 to 100.0)
 * @param {string} reason - User-friendly narrative explaining the result
 * @param {Object} details - Extensible container for calculation specifics
 * @returns {Object} Standardized Evaluation Result object
 */
function buildEvaluationResult(
    feature,
    importance = "Neutral",
    status = "Unknown",
    score = 0,
    reason = "",
    details = {},
    requirement = null
) {
    const canonicalRequirement = normalizeRequirement(requirement || importance);
    const canonicalImportance = canonicalRequirement === "NoRequirement" ? "Neutral" : canonicalRequirement;

    return {
        feature,
        importance: canonicalImportance, // compatibility field; requirement is authoritative
        requirement: REQUIREMENT_LEVELS[canonicalRequirement].displayName,
        status,
        score,
        reason,
        details
    };
}

// =========================================================================
// 4. GLOBAL / MODULE EXPOSURE
// =========================================================================
// Functional evaluators are deliberately NOT defined here. Their authoritative
// implementation lives in recommendationengine.js.
const evaluationRulesApi = {
    FEATURE_KEYS,
    REQUIREMENT_LEVELS,
    normalizeRequirement,
    getRequirementDefinition,
    isRequired,
    normalizeImportance,
    getImportanceDefinition,
    getImportanceWeight,
    isFailLevel,
    compareValues,
    buildEvaluationResult
};

if (typeof window !== "undefined") {
    Object.assign(window, evaluationRulesApi);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = evaluationRulesApi;
}
