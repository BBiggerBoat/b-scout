#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const modelsPath = path.join(root, 'boatmodels.json');
const reportPath = path.join(__dirname, 'reports', 'phase8a-structured-normalization.json');
const models = JSON.parse(fs.readFileSync(modelsPath, 'utf8'));

const clean = v => typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().replace(/[.;]+$/,'') : v;
const list = v => Array.isArray(v) ? v.map(clean).filter(Boolean) : (v ? [clean(v)] : []);
const unique = arr => [...new Set(arr.map(clean).filter(Boolean))];
const sentence = s => { s=clean(s); return s ? s.charAt(0).toUpperCase()+s.slice(1)+( /[.!?]$/.test(s)?'':'.') : ''; };
const confidenceMap = v => ({High:'High',Medium:'Moderate',Moderate:'Moderate',Low:'Low',Unknown:'Unknown'}[v] || 'Unknown');

function refs(model) {
  const r = [];
  for (const ev of model.SupplementalEvidence || []) for (const x of ev.sourceRefs || []) r.push(x);
  return unique(r.length ? r : ['public/boatmodels.json']);
}
function evidenceTypes(model) {
  const map = {CuratedReference:'Technical or survey source', EditorialAssessment:'Unverified'};
  return unique((model.SupplementalEvidence||[]).map(x=>map[x.evidenceType]||'Unverified'));
}
function addStatement(model, scope, conf, notes) {
  model.EvidenceSummary ||= {KnowledgeCoverage:'Unknown',EvidenceQuality:'Unknown',Statements:[],UnresolvedInformation:[]};
  model.EvidenceSummary.Statements ||= [];
  model.EvidenceSummary.Statements = model.EvidenceSummary.Statements.filter(s=>s.Scope!==scope);
  model.EvidenceSummary.Statements.push({Scope:scope,EvidenceRefs:refs(model),EvidenceTypes:evidenceTypes(model),Confidence:conf,Notes:notes});
}
function buildOverview(m, si) {
  const identity = `${m.Manufacturer || ''} ${m.Model || ''}${m.Variant ? ' '+m.Variant : ''}`.trim();
  const parts=[];
  if (si.signature) parts.push(sentence(si.signature));
  else if (si.designPhilosophy) parts.push(sentence(`${identity} reflects ${clean(si.designPhilosophy).replace(/^the /i,'')}`));
  if (si.personality) parts.push(sentence(si.personality));
  if (!parts.length && m.Overview) return m.Overview;
  return parts.slice(0,3).join(' ');
}
function suitability(si, evrefs) {
  const out={};
  const best=unique([...(si.bestMissions||[])]);
  const less=unique([...(si.lessSuitableMissions||[]),...(si.lessSuitableIf||[])]);
  if (best.length) out.PrimaryMissions={Assessment:'Good',Summary:best.join('; '),EvidenceRefs:evrefs};
  if (less.length) out.LessSuitableMissions={Assessment:'Limited',Summary:less.join('; '),EvidenceRefs:evrefs};
  if (si.crewFit?.bestFor?.length || si.crewFit?.cautions?.length) out.CrewFit={Assessment:'Mixed',Summary:unique([...(si.crewFit.bestFor||[]),...(si.crewFit.cautions||[]).map(x=>'Caution: '+x)]).join('; '),EvidenceRefs:evrefs};
  if (si.ownershipEase || si.maintenanceEase || si.ownershipScores) {
    const bits=[];
    if (si.ownershipEase) bits.push(`Ownership ease: ${si.ownershipEase}`);
    if (si.maintenanceEase) bits.push(`Maintenance ease: ${si.maintenanceEase}`);
    if (si.ownershipScores) bits.push(...Object.entries(si.ownershipScores).map(([k,v])=>`${k.replace(/([A-Z])/g,' $1').toLowerCase()}: ${v}/5`));
    out.OwnershipBurden={Assessment:'Mixed',Summary:bits.join('; '),EvidenceRefs:evrefs};
  }
  return out;
}
function buyerQuestions(items) {
  return unique(items).map(x=>`What inspection, repair or service history is available for ${clean(x).replace(/^the /i,'').replace(/[.?]$/,'')}?`);
}
function ownerActions(si) {
  const actions=[];
  const essential=si.refitPriority?.essential||[];
  const recommended=si.refitPriority?.recommended||[];
  for (const x of essential) actions.push(`Prioritize inspection and correction of ${clean(x).toLowerCase()}`);
  for (const x of recommended) actions.push(`Evaluate ${clean(x).toLowerCase()} based on condition and intended use`);
  return unique(actions);
}
function archiveResidual(si) {
  const residual={};
  for (const k of ['marketAvailability','partsAvailability','commonUpgrades','comparableModels','knowledgeRelationships','bScoutNotes','refitPriority','ownershipScores','ownershipEase','maintenanceEase']) {
    if (si[k] != null && (!(Array.isArray(si[k])) || si[k].length)) residual[k]=si[k];
  }
  return residual;
}

const report={phase:'8A',processed:0,removedSupplemental:0,archivedResidual:0,models:[],generatedAt:new Date().toISOString()};
for (const m of models) {
  const si=m.SupplementalIntelligence;
  if (!si || !Object.keys(si).length) continue;
  const evrefs=refs(m);
  const before={id:m.BoatModelID};
  m.Overview=buildOverview(m,si);
  m.Suitability=suitability(si,evrefs);
  m.Strengths=unique([...(si.strengths||[]),...(m.Strengths||[])]).slice(0,6);
  m.TradeOffs=unique([...(si.tradeoffs||[]),...(m.TradeOffs||[])]).slice(0,6);
  m.BestFor=unique([si.idealOwner,si.buyerProfile,...(si.crewFit?.bestFor||[])]).slice(0,4);
  m.AvoidIf=unique([...(si.lessSuitableIf||[]),...(si.lessSuitableMissions||[]),...(m.AvoidIf||[])]).slice(0,6);
  m.InspectionFocus=unique([...(si.inspectionPriorities||[]),...(m.InspectionFocus||[])]).slice(0,8);
  m.BuyerQuestions=buyerQuestions(m.InspectionFocus).slice(0,8);
  m.OwnerActions=ownerActions(si).slice(0,8);
  // Do not invent KnownConcerns or variations from general inspection/upgrades.
  m.KnownConcerns=Array.isArray(m.KnownConcerns)?m.KnownConcerns:[];
  m.ModelVariations=Array.isArray(m.ModelVariations)?m.ModelVariations:[];

  const residual=archiveResidual(si);
  if (Object.keys(residual).length) {
    const marker='\n\n[Phase 8A legacy structured context]\n';
    const base=(m.ResearchNotes||'').split(marker)[0].trim();
    m.ResearchNotes=base+marker+JSON.stringify(residual,null,2);
    report.archivedResidual++;
  }
  const section=si.sectionConfidence||{};
  const specConf=confidenceMap(section.specifications||m.SupplementalConfidence);
  const editorialConf=confidenceMap(section.ownerExperience||m.SupplementalConfidence);
  addStatement(m,'IdentityAndDimensions',specConf,'Specifications retained from the consolidated model record; no conflicting supplemental value was found during Phase 8A.');
  for (const scope of ['Overview','Suitability','Strengths','TradeOffs','BestFor','AvoidIf','InspectionFocus','BuyerQuestions','OwnerActions']) {
    addStatement(m,scope,editorialConf,'Normalized from the preserved structured-intelligence record. Advisory content remains subject to actual-vessel inspection and source verification.');
  }
  m.EvidenceSummary.KnowledgeCoverage='Strong';
  m.EvidenceSummary.EvidenceQuality= editorialConf==='High'?'High': editorialConf==='Moderate'?'Moderate':'Low';
  m.EvidenceSummary.UnresolvedInformation=unique([...(m.EvidenceSummary.UnresolvedInformation||[]), ...(section.commonProblems==='Unknown'?['Model-specific known concerns remain unverified']:[]), ...(section.productionHistory==='Unknown'?['Production history remains unverified']:[])]);

  delete m.SupplementalIntelligence;
  delete m.SupplementalEvidence;
  delete m.SupplementalConfidence;
  delete m.SupplementalUpdatedAt;
  delete m.SupplementalRevision;
  report.processed++; report.removedSupplemental++;
  report.models.push({BoatModelID:m.BoatModelID,overview:!!m.Overview,suitability:Object.keys(m.Suitability||{}).length,strengths:m.Strengths.length,tradeoffs:m.TradeOffs.length,bestFor:m.BestFor.length,avoidIf:m.AvoidIf.length,inspectionFocus:m.InspectionFocus.length,buyerQuestions:m.BuyerQuestions.length,ownerActions:m.OwnerActions.length,knownConcerns:m.KnownConcerns.length,modelVariations:m.ModelVariations.length,residualArchived:Object.keys(residual)});
}
fs.writeFileSync(modelsPath,JSON.stringify(models,null,2)+'\n');
fs.mkdirSync(path.dirname(reportPath),{recursive:true});
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({processed:report.processed,removedSupplemental:report.removedSupplemental,archivedResidual:report.archivedResidual},null,2));
