#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = rel => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const write = (rel, value) => fs.writeFileSync(path.join(root, rel), JSON.stringify(value, null, 2) + '\n');
const models = read('boatmodels.json');
const evidence = read('knowledge/data/evidence.json');
const phase8a = read('developer/reports/phase8a-structured-normalization.json');
const phase8aIds = new Set((phase8a.models || []).map(x => x.BoatModelID));
const evidenceById = new Map(evidence.map(x => [x.SourceID, x]));
const clean = v => typeof v === 'string' ? v.replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim() : v;
const unique = arr => [...new Set((arr || []).map(clean).filter(Boolean))];
const list = v => Array.isArray(v) ? unique(v) : (clean(v) ? [clean(v)] : []);
const credibleTypes = new Set(['ManufacturerBrochure','OwnerRegistry','ReferenceGuide','TechnicalPublication','SurveySource','BuilderDocumentation','DesignerDocumentation','ModelDirectory']);
function evidenceRefs(m) {
  const refs=[];
  for (const s of (m.EvidenceSummary?.Statements || [])) refs.push(...(s.EvidenceRefs || []));
  return unique(refs);
}
function modelSources(m) {
  return evidenceRefs(m).map(r => evidenceById.get(r)).filter(Boolean).filter(e => e.Active !== false && e.SourceType !== 'LegacyDataset');
}
function credibleSources(m) { return modelSources(m).filter(e => credibleTypes.has(e.SourceType)); }
function setStatement(m, scope, refs, types, confidence, notes) {
  m.EvidenceSummary ||= {KnowledgeCoverage:'Unknown',EvidenceQuality:'Unknown',Statements:[],UnresolvedInformation:[]};
  m.EvidenceSummary.Statements ||= [];
  m.EvidenceSummary.Statements = m.EvidenceSummary.Statements.filter(s => s.Scope !== scope);
  m.EvidenceSummary.Statements.push({Scope:scope,EvidenceRefs:unique(refs),EvidenceTypes:unique(types),Confidence:confidence,Notes:notes});
}
function addUnresolved(m, text) {
  m.EvidenceSummary ||= {KnowledgeCoverage:'Unknown',EvidenceQuality:'Unknown',Statements:[],UnresolvedInformation:[]};
  m.EvidenceSummary.UnresolvedInformation = unique([...(m.EvidenceSummary.UnresolvedInformation || []), text]);
}
function sourceLabel(e) {
  const map={ManufacturerBrochure:'Factory documented',BuilderDocumentation:'Factory documented',DesignerDocumentation:'Factory documented',TechnicalPublication:'Technical or survey source',SurveySource:'Technical or survey source',OwnerRegistry:'Multiple independent owner reports',ReferenceGuide:'Technical or survey source',ModelDirectory:'Technical or survey source'};
  return map[e.SourceType] || 'Unverified';
}
const targets = models.filter(m => m.ResearchStatus === 'Reviewed' && !phase8aIds.has(m.BoatModelID));
const report={phase:'8B',generatedAt:new Date().toISOString(),reviewedStandard:{requirements:['Verified identity','Reasonably verified principal dimensions','At least one credible model-specific source','Model-specific neutral Overview','Normalized Strengths and Trade-offs','Explicit unresolved information','No unsupported broad High Confidence claims']},targetCount:targets.length,retainedReviewed:0,downgradedToInitial:0,knownConcernsPromoted:0,records:[]};
for (const m of targets) {
  // Mechanical editorial normalization only; preserve ambiguous prose as one item.
  m.Overview = clean(m.Overview) || null;
  m.Strengths = list(m.Strengths).slice(0,6);
  m.TradeOffs = list(m.TradeOffs).slice(0,6);
  m.BestFor = list(m.BestFor).slice(0,4);
  m.AvoidIf = list(m.AvoidIf).slice(0,6);
  m.InspectionFocus = list(m.InspectionFocus).slice(0,8);
  m.BuyerQuestions = list(m.BuyerQuestions).slice(0,8);
  m.OwnerActions = list(m.OwnerActions).slice(0,8);
  m.KnownConcerns = Array.isArray(m.KnownConcerns) ? m.KnownConcerns : [];
  m.ModelVariations = Array.isArray(m.ModelVariations) ? m.ModelVariations : [];
  m.Suitability = m.Suitability && typeof m.Suitability === 'object' && !Array.isArray(m.Suitability) ? m.Suitability : {};

  // Existing CommonProblems are legacy/generic and are not promoted without model-specific evidence.
  if (clean(m.CommonProblems) && m.KnownConcerns.length === 0) addUnresolved(m, 'Legacy Common Problems text has not been verified as a model-specific Known Concern.');
  if (!m.ModelVariations.length) addUnresolved(m, 'Meaningful model variations remain undocumented or unverified.');
  if (!m.BestFor.length) addUnresolved(m, 'Best For remains unassessed pending model-specific evidence.');
  if (!Object.keys(m.Suitability).length) addUnresolved(m, 'Suitability remains unassessed pending model-specific evidence.');

  const sources = credibleSources(m);
  const refs = sources.map(s => s.SourceID);
  const types = sources.map(sourceLabel);
  const hasIdentity = !!(m.Manufacturer && m.Model && m.BoatModelID);
  const principal = ['LOA_ft','Beam_ft','Draft_ft','Displacement_lb'];
  const dimensionsKnown = principal.filter(k => m[k] !== null && m[k] !== undefined && m[k] !== '').length >= 3;
  const hasOverview = !!m.Overview;
  const hasEditorial = m.Strengths.length > 0 && m.TradeOffs.length > 0;
  const qualifies = hasIdentity && dimensionsKnown && hasOverview && hasEditorial && sources.length > 0;

  // Remove unsupported whole-model High confidence while retaining scoped statements.
  for (const s of (m.EvidenceSummary?.Statements || [])) if (s.Confidence === 'High' && !(s.EvidenceRefs || []).some(r => refs.includes(r))) s.Confidence = 'Moderate';

  if (qualifies) {
    m.ResearchStatus = 'Reviewed';
    m.DataConfidence = 'Moderate';
    m.EvidenceSummary.KnowledgeCoverage = 'Partial';
    m.EvidenceSummary.EvidenceQuality = 'Moderate';
    setStatement(m,'IdentityAndDimensions',refs,types,'Moderate','Principal identity and dimensions have at least one model-specific external source; unresolved conflicts remain visible.');
    report.retainedReviewed++;
  } else {
    m.ResearchStatus = 'Initial';
    m.DataConfidence = 'Low';
    m.EvidenceSummary.KnowledgeCoverage = 'Limited';
    m.EvidenceSummary.EvidenceQuality = 'Low';
    addUnresolved(m,'Independent model-specific source required before Reviewed status can be restored.');
    setStatement(m,'IdentityAndDimensions',evidenceRefs(m).filter(r => r.startsWith('SRC-LEGACY-')),['Unverified'],'Low','Identity and dimensions currently rely primarily on legacy B-Atlas data; family guidance does not independently verify this model.');
    report.downgradedToInitial++;
  }
  m.LastUpdated = '2026-08-06';
  m.Revision = Number(m.Revision || 0) + 1;
  report.records.push({BoatModelID:m.BoatModelID,displayName:[m.Manufacturer,m.Model,m.Variant].filter(Boolean).join(' '),result:m.ResearchStatus,credibleSources:refs,sourceTypes:sources.map(s=>s.SourceType),overview:!!m.Overview,strengths:m.Strengths.length,tradeOffs:m.TradeOffs.length,bestFor:m.BestFor.length,suitability:Object.keys(m.Suitability).length,inspectionFocus:m.InspectionFocus.length,buyerQuestions:m.BuyerQuestions.length,knownConcerns:m.KnownConcerns.length,ownerActions:m.OwnerActions.length,modelVariations:m.ModelVariations.length,unresolved:m.EvidenceSummary.UnresolvedInformation});
}
write('boatmodels.json',models);
write('developer/reports/phase8b-reviewed-normalization.json',report);
console.log(JSON.stringify({targets:report.targetCount,retainedReviewed:report.retainedReviewed,downgradedToInitial:report.downgradedToInitial},null,2));
