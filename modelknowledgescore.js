(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.BAtlasModelKnowledgeScore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const UNKNOWN_TOKENS = new Set(['', 'unknown', 'not known', 'not researched', 'researched_unknown', 'tbd', 'n/a', 'na', 'not available', 'unverified', 'null']);

  // Weights sum to 100. Higher weights reflect buyer-decision value rather than
  // how easy a field is to research, so each weight is also the approximate score impact.
  const FIELDS = [
    { id:'LOA', label:'Length overall', weight:6, group:'Plan essentials', keys:['LOA'], planCritical:true },
    { id:'Beam', label:'Beam', weight:6, group:'Plan essentials', keys:['Beam'], planCritical:true },
    { id:'Draft', label:'Draft', weight:6, group:'Plan essentials', keys:['Draft'], planCritical:true },
    { id:'AirDraft', label:'Air draft', weight:6, group:'Plan essentials', keys:['AirDraft'], planCritical:true },
    { id:'FuelCode', label:'Fuel', weight:4, group:'Plan essentials', keys:['FuelCode','NormalizedFuel','Fuel'] },
    { id:'MechanicalPropulsionCode', label:'Propulsion', weight:4, group:'Plan essentials', keys:['MechanicalPropulsionCode','NormalizedPropulsion','Propulsion'] },
    { id:'HullBehaviourCode', label:'Hull behaviour', weight:2, group:'Plan essentials', keys:['HullBehaviourCode','HullBehaviour','NormalizedHullForm'] },

    { id:'HeadroomHelm', label:'Helm headroom', weight:5, group:'Interior fit', keys:['HeadroomHelm'] },
    { id:'HeadroomGalley', label:'Galley headroom', weight:4, group:'Interior fit', keys:['HeadroomGalley'] },
    { id:'HeadroomHead', label:'Head-compartment headroom', weight:4, group:'Interior fit', keys:['HeadroomHead'] },
    { id:'HeadroomForwardCabin', label:'Forward-cabin headroom', weight:3, group:'Interior fit', keys:['HeadroomForwardCabin'] },
    { id:'VBerthLength', label:'V-berth usable length', weight:4, group:'Interior fit', keys:['VBerthLength'] },
    { id:'HeadroomSalon', label:'Saloon / main-cabin headroom', weight:1, group:'Interior fit', keys:['HeadroomSalon'] },

    { id:'LWL', label:'Waterline length', weight:1, group:'Core specifications', keys:['LWL'] },
    { id:'Displacement', label:'Displacement', weight:3, group:'Core specifications', keys:['Displacement'] },
    { id:'FuelCapacity', label:'Fuel capacity', weight:3, group:'Core specifications', keys:['FuelCapacity'] },
    { id:'WaterCapacity', label:'Water capacity', weight:3, group:'Core specifications', keys:['WaterCapacity'] },
    { id:'HoldingCapacity', label:'Holding capacity', weight:2, group:'Core specifications', keys:['HoldingCapacity'] },
    { id:'HullMaterialCode', label:'Hull material', weight:1, group:'Core specifications', keys:['HullMaterialCode','Construction'] },
    { id:'KeelConfigurationCode', label:'Keel configuration', weight:3, group:'Core specifications', keys:['KeelConfigurationCode','KeelType'] },
    { id:'RudderTypeCode', label:'Rudder type', weight:3, group:'Core specifications', keys:['RudderTypeCode','RudderType'] },
    { id:'EngineCount', label:'Engine count', weight:2, group:'Core specifications', keys:['EngineCount'] },

    { id:'BoatFamilyCode', label:'Boat family', weight:1, group:'Configuration', keys:['BoatFamilyCode','BoatFamily'] },
    { id:'HullConfigurationCode', label:'Hull configuration', weight:2, group:'Configuration', keys:['HullConfigurationCode','NormalizedHullConfiguration'] },
    { id:'Construction', label:'Construction', weight:2, group:'Configuration', keys:['Construction'] },
    { id:'Cabins', label:'Cabins', weight:1, group:'Configuration', keys:['Cabins'] },
    { id:'Berths', label:'Berths', weight:1, group:'Configuration', keys:['Berths'] },
    { id:'Heads', label:'Heads', weight:1, group:'Configuration', keys:['Heads'] },
    { id:'FlybridgeCode', label:'Flybridge', weight:1, group:'Configuration', keys:['FlybridgeCode','Flybridge'] },
    { id:'ShowerTypeCode', label:'Shower type', weight:1, group:'Configuration', keys:['ShowerTypeCode','Shower'] },
    { id:'Trailerable', label:'Trailerability', weight:1, group:'Configuration', keys:['Trailerable'] },

    { id:'FirstYear', label:'First production year', weight:1, group:'Identity & systems', keys:['FirstYear','YearStart'] },
    { id:'LastYear', label:'Last production year', weight:1, group:'Identity & systems', keys:['LastYear','YearEnd'] },
    { id:'Designer', label:'Designer', weight:1, group:'Identity & systems', keys:['Designer'] },
    { id:'TotalBuilt', label:'Production quantity', weight:1, group:'Identity & systems', keys:['TotalBuilt'] },
    { id:'VesselCategoryCode', label:'Vessel category', weight:1, group:'Identity & systems', keys:['VesselCategoryCode'] },
    { id:'PrimaryPropulsionModeCode', label:'Primary propulsion mode', weight:1, group:'Identity & systems', keys:['PrimaryPropulsionModeCode'] },
    { id:'TypicalEngineID', label:'Typical engine', weight:1, group:'Identity & systems', keys:['TypicalEngineID'] },
    { id:'SideDecksCode', label:'Side-deck arrangement', weight:1, group:'Identity & systems', keys:['SideDecksCode','SideDecks'] },
    { id:'RunningGearProtectionCode', label:'Running-gear protection', weight:1, group:'Identity & systems', keys:['RunningGearProtectionCode'] },
    { id:'SteeringTypeCode', label:'Steering type', weight:1, group:'Identity & systems', keys:['SteeringTypeCode'] },
    { id:'CoolingCode', label:'Engine cooling', weight:1, group:'Identity & systems', keys:['CoolingCode','Cooling'] },
    { id:'EnginePowerPerEngine', label:'Engine power', weight:2, group:'Identity & systems', keys:['EnginePowerPerEngine'] }
  ];

  const TOTAL_WEIGHT = FIELDS.reduce((sum, field) => sum + field.weight, 0);

  function isPresent(value) {
    if (value === false || value === 0) return true;
    if (value === null || value === undefined) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return !UNKNOWN_TOKENS.has(value.trim().toLowerCase());
    return true;
  }

  function valueFor(boat, field) {
    if (!boat) return undefined;
    if (field.planCritical && boat.PlanCriticalStatus && boat.PlanCriticalStatus[field.id] === 'researched_unknown') return undefined;
    for (const key of field.keys || [field.id]) {
      if (Object.prototype.hasOwnProperty.call(boat, key) && isPresent(boat[key])) return boat[key];
    }
    return undefined;
  }

  function tierFor(score) {
    if (score >= 100) return { id:'complete', label:'Complete', target:100 };
    if (score >= 90) return { id:'excellent', label:'Excellent', target:100 };
    if (score >= 75) return { id:'strong', label:'Strong', target:90 };
    if (score >= 60) return { id:'good', label:'Good', target:75 };
    if (score >= 40) return { id:'developing', label:'Developing', target:60 };
    return { id:'starting', label:'Starting', target:40 };
  }

  function nextGoal(score) {
    const thresholds = [40, 60, 75, 90, 100];
    const target = thresholds.find(value => score < value) || 100;
    const labels = {40:'Developing',60:'Good',75:'Strong',90:'Excellent',100:'Complete'};
    return { target, label:labels[target], points:Math.max(0, target - score) };
  }

  function scoreModel(boat) {
    let knownWeight = 0;
    const missing = [];
    const groups = new Map();

    for (const field of FIELDS) {
      const present = isPresent(valueFor(boat, field));
      if (present) knownWeight += field.weight;
      else missing.push(field);
      if (!groups.has(field.group)) groups.set(field.group, { knownWeight:0, totalWeight:0, known:0, total:0 });
      const group = groups.get(field.group);
      group.totalWeight += field.weight;
      group.total += 1;
      if (present) { group.knownWeight += field.weight; group.known += 1; }
    }

    const score = Math.round((knownWeight / TOTAL_WEIGHT) * 100);
    const tier = tierFor(score);
    const goal = nextGoal(score);
    const opportunities = missing
      .map(field => {
        const projected = Math.round(((knownWeight + field.weight) / TOTAL_WEIGHT) * 100);
        return { ...field, projectedScore: projected, impact: Math.max(1, projected - score) };
      })
      .sort((a,b) => b.impact - a.impact || b.weight - a.weight || a.label.localeCompare(b.label));

    const groupScores = Array.from(groups.entries()).map(([label, group]) => ({
      label,
      score: group.totalWeight ? Math.round((group.knownWeight / group.totalWeight) * 100) : 0,
      known: group.known,
      total: group.total
    }));

    return {
      score,
      tier,
      goal,
      knownWeight,
      totalWeight:TOTAL_WEIGHT,
      knownFields:FIELDS.length - missing.length,
      totalFields:FIELDS.length,
      missing,
      opportunities,
      groups:groupScores
    };
  }

  function evidenceStrength(coverage, boat) {
    const verified = Number(coverage?.VerifiedSourceCount || 0);
    const sources = Number(coverage?.SourceCount || 0);
    if (verified >= 5) return { id:'strong', label:'Strong', detail:`${verified} verified sources` };
    if (verified >= 2) return { id:'good', label:'Good', detail:`${verified} verified sources` };
    if (verified === 1) return { id:'some', label:'Some verified evidence', detail:'1 verified source' };
    if (sources > 0) return { id:'unverified', label:'Needs verification', detail:`${sources} source${sources===1?'':'s'} recorded; none verified` };
    const confidence = String(boat?.DataConfidence || '').trim();
    return { id:'unverified', label:'Not yet verified', detail: confidence && confidence.toLowerCase() !== 'unknown' ? `Legacy confidence: ${confidence}; no verified sources attached` : 'No verified sources attached' };
  }

  return { FIELDS, TOTAL_WEIGHT, isPresent, valueFor, tierFor, nextGoal, scoreModel, evidenceStrength };
});
