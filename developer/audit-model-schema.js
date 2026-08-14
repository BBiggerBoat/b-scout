#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const modelsPath = path.join(root, 'boatmodels.json');
const schemaPath = path.join(root, 'data', 'model-schema.json');
const taxonomyDir = path.join(root, 'data', 'taxonomy');
const reportDir = path.join(__dirname, 'reports');

const models = JSON.parse(fs.readFileSync(modelsPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
fs.mkdirSync(reportDir, { recursive: true });

const normalize = value => String(value ?? '')
  .replace(/\r\n/g, '\n')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();
const nameOf = m => `${m.Manufacturer || ''} ${m.Model || ''}${m.Variant ? ` ${m.Variant}` : ''}`.trim();
const idOf = m => m.BoatModelID || nameOf(m);
const nonEmpty = v => !(v == null || v === '' || (Array.isArray(v) && v.length === 0) || (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0));
const textItems = v => Array.isArray(v) ? v.filter(x => typeof x === 'string') : (typeof v === 'string' && v.trim() ? [v] : []);
const evidenceCount = m => {
  const e = m.EvidenceSummary || {};
  let count = Array.isArray(e.Statements) ? e.Statements.length : 0;
  for (const concern of (m.KnownConcerns || [])) count += Array.isArray(concern.EvidenceRefs) ? concern.EvidenceRefs.length : 0;
  for (const variation of (m.ModelVariations || [])) count += Array.isArray(variation.EvidenceRefs) ? variation.EvidenceRefs.length : 0;
  for (const item of Object.values(m.Suitability || {})) count += Array.isArray(item?.EvidenceRefs) ? item.EvidenceRefs.length : 0;
  return count;
};

const issues = {};
const add = (category, issue) => {
  if (!issues[category]) issues[category] = [];
  issues[category].push(issue);
};

// 1. Strings reused across models, with unrelated groups highlighted.
const reusableFields = ['Overview','Strengths','TradeOffs','BestFor','AvoidIf','Weaknesses','CommonProblems','TypicalMission','InspectionFocus','BuyerQuestions','OwnerActions','ResearchNotes'];
for (const field of reusableFields) {
  const groups = new Map();
  for (const m of models) {
    for (const text of textItems(m[field])) {
      const key = normalize(text);
      if (key.length < 18) continue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push({ id: idOf(m), model: nameOf(m), manufacturer: m.Manufacturer, family: m.BoatFamily, text });
    }
  }
  for (const rows of groups.values()) {
    if (rows.length < 2) continue;
    const manufacturers = [...new Set(rows.map(r => r.manufacturer).filter(Boolean))];
    const families = [...new Set(rows.map(r => r.family).filter(Boolean))];
    add('duplicateStrings', {
      severity: manufacturers.length > 1 && families.length > 1 ? 'review-high' : 'review',
      field,
      occurrenceCount: rows.length,
      unrelatedModelsLikely: manufacturers.length > 1 && families.length > 1,
      manufacturers,
      families,
      text: rows[0].text,
      models: rows.map(({id, model}) => ({id, model}))
    });
  }
}

// 2. Comma-separated pseudo-lists.
const listFields = ['Strengths','TradeOffs','BestFor','AvoidIf','InspectionFocus','BuyerQuestions','OwnerActions'];
const listCue = /,\s+(and\s+)?(?:[a-z][a-z -]{2,30})(?:,|\.|$)/i;
for (const m of models) {
  for (const field of listFields) {
    for (const [index, text] of textItems(m[field]).entries()) {
      const commaCount = (text.match(/,/g) || []).length;
      if (commaCount >= 2 || (commaCount >= 1 && text.length > 110 && listCue.test(text))) {
        add('commaSeparatedPseudoLists', { severity: 'review', modelId: idOf(m), model: nameOf(m), field, index, commaCount, text });
      }
    }
  }
}

// 3. Line-break inconsistencies.
const textFields = [...new Set([...reusableFields, 'Construction','Configuration','HullType','Style'])];
for (const m of models) {
  for (const field of textFields) {
    const values = textItems(m[field]);
    for (const [index, text] of values.entries()) {
      if (/\r(?!\n)|\r\n|\n/.test(text)) {
        add('lineBreakInconsistencies', {
          severity: 'review', modelId: idOf(m), model: nameOf(m), field, index,
          lineBreakType: /\r\n/.test(text) ? 'CRLF' : /\r/.test(text) ? 'CR' : 'LF', text
        });
      }
    }
  }
}

// 4. Generic fallback language.
const fallbackPatterns = [
  /capabilities not supported by the verified specifications/i,
  /verify (the )?individual (boat|installation|example)/i,
  /verify .* before purchase/i,
  /details vary by (year|model|installation|example)/i,
  /equipment (and|&) specifications vary/i,
  /no model-specific/i,
  /not yet (documented|assessed|recorded)/i,
  /consult (a|the) (surveyor|manufacturer|broker)/i,
  /subject to individual condition/i,
  /typical examples? may vary/i
];
for (const m of models) {
  for (const field of reusableFields) {
    for (const [index, text] of textItems(m[field]).entries()) {
      const matches = fallbackPatterns.filter(p => p.test(text)).map(p => p.source);
      if (matches.length) add('genericFallbackLanguage', { severity: 'review', modelId: idOf(m), model: nameOf(m), field, index, patterns: matches, text });
    }
  }
}

// 5-7. Cross-field duplication.
const crossPairs = [
  ['Strengths','BestFor','strengthsRepeatedInBestFor'],
  ['TradeOffs','AvoidIf','tradeOffsRepeatedInAvoidIf'],
  ['CommonProblems','InspectionFocus','commonProblemsRepeatedInInspectionFocus']
];
for (const m of models) {
  for (const [a,b,category] of crossPairs) {
    const aa = textItems(m[a]).map(x => ({raw:x,n:normalize(x)})).filter(x => x.n);
    const bb = textItems(m[b]).map(x => ({raw:x,n:normalize(x)})).filter(x => x.n);
    for (const x of aa) for (const y of bb) {
      const exact = x.n === y.n;
      const containment = Math.min(x.n.length,y.n.length) >= 35 && (x.n.includes(y.n) || y.n.includes(x.n));
      if (exact || containment) add(category, { severity: exact ? 'warning' : 'review', modelId:idOf(m), model:nameOf(m), sourceField:a, targetField:b, match: exact ? 'exact' : 'containment', sourceText:x.raw, targetText:y.raw });
    }
  }
}

// 8-10. Confidence and research evidence checks.
for (const m of models) {
  const ec = evidenceCount(m);
  const highLegacy = m.DataConfidence === 'High';
  const highScoped = m.EvidenceSummary?.EvidenceQuality === 'High' || (m.EvidenceSummary?.Statements || []).some(s => s?.Confidence === 'High');
  if ((highLegacy || highScoped) && ec === 0) add('highConfidenceWithoutEvidence', { severity:'warning', modelId:idOf(m), model:nameOf(m), dataConfidence:m.DataConfidence, scopedEvidenceQuality:m.EvidenceSummary?.EvidenceQuality, evidenceReferenceCount:ec });
  if (['Reviewed','Verified'].includes(m.ResearchStatus) && ec === 0) add('reviewedWithoutSources', { severity:'warning', modelId:idOf(m), model:nameOf(m), researchStatus:m.ResearchStatus, reviewedBy:m.ReviewedBy || null, evidenceReferenceCount:ec });
  if (['NotStarted','NotReviewed'].includes(m.ResearchStatus) && highLegacy) add('notStartedWithHighConfidence', { severity:'warning', modelId:idOf(m), model:nameOf(m), researchStatus:m.ResearchStatus, dataConfidence:m.DataConfidence });
}

// 11. Values outside controlled classifications.
const taxonomyMap = {
  NormalizedFuel: 'fuel-types.json',
  NormalizedPropulsion: 'propulsion-types.json',
  NormalizedHullForm: 'hull-forms.json',
  NormalizedHullConfiguration: 'hull-configurations.json',
  NormalizedStyle: 'style-families.json'
};
const allowed = {};
for (const [field,file] of Object.entries(taxonomyMap)) {
  const rows = JSON.parse(fs.readFileSync(path.join(taxonomyDir,file),'utf8'));
  allowed[field] = new Set(rows.filter(r => r.Status === 'Active').map(r => r.CanonicalValue));
}
allowed.ResearchStatus = new Set([...(schema.controlledValues?.ResearchStatus || []), 'NotStarted', 'Initial']); // legacy tolerated but flagged separately
allowed.DataConfidence = new Set(['High','Moderate','Low','Conflicting','Unknown']);
allowed.SideDecks = new Set(['None','Limited','Narrow','Moderate','Wide','Unknown']);
allowed.Flybridge = new Set(['Yes','No','Optional','Varies','Unknown']);
allowed.AftCabin = new Set(['Yes','No','Optional','Varies','Unknown']);
allowed.CoastalRating = new Set(['Yes','No','Limited','Unknown']);
allowed.OffshoreRating = new Set(['Yes','No','Limited','Unknown']);
for (const m of models) {
  for (const [field,set] of Object.entries(allowed)) {
    const value = m[field];
    if (value == null || value === '') continue;
    if (!set.has(value)) add('outsideControlledClassifications', { severity:'error', modelId:idOf(m), model:nameOf(m), field, value, allowed:[...set] });
  }
  for (const [useCase,item] of Object.entries(m.Suitability || {})) {
    const value = item?.Assessment;
    if (value && !(schema.controlledValues?.SuitabilityAssessment || []).includes(value)) add('outsideControlledClassifications', { severity:'error', modelId:idOf(m), model:nameOf(m), field:`Suitability.${useCase}.Assessment`, value, allowed:schema.controlledValues.SuitabilityAssessment });
  }
}

// 12. Unknown possibly represented as false, No or zero. Review-only contextual flags.
const numericUnknownFields = ['FirstYear','LastYear','TotalBuilt','LOA_ft','LWL_ft','Beam_ft','Draft_ft','AirDraft_ft','Displacement_lb','FuelCapacity','WaterCapacity','HoldingCapacity','Berths','Cabins','Heads'];
const booleanUnknownFields = ['Shower','Galley','GreatLoopSuitable','Trailerable','Active'];
const yesNoUnknownFields = ['Flybridge','AftCabin','CoastalRating','OffshoreRating'];
for (const m of models) {
  const lowKnowledge = ['NotStarted','NotReviewed'].includes(m.ResearchStatus) || ['Unknown','Low'].includes(m.DataConfidence);
  for (const field of numericUnknownFields) if (m[field] === 0) add('unknownRepresentedAsNegative', { severity:'review', modelId:idOf(m), model:nameOf(m), field, value:0, context:{researchStatus:m.ResearchStatus,dataConfidence:m.DataConfidence}, reason:'Zero may be a placeholder; verify whether zero is physically meaningful.' });
  if (lowKnowledge) {
    for (const field of booleanUnknownFields) if (m[field] === false) add('unknownRepresentedAsNegative', { severity:'review', modelId:idOf(m), model:nameOf(m), field, value:false, context:{researchStatus:m.ResearchStatus,dataConfidence:m.DataConfidence}, reason:'False on a low-knowledge record may mean unknown rather than confirmed absent.' });
    for (const field of yesNoUnknownFields) if (m[field] === 'No') add('unknownRepresentedAsNegative', { severity:'review', modelId:idOf(m), model:nameOf(m), field, value:'No', context:{researchStatus:m.ResearchStatus,dataConfidence:m.DataConfidence}, reason:'No on a low-knowledge record may mean unknown rather than confirmed absent.' });
  }
}

// 13. Generic age-related risks in CommonProblems / KnownConcerns.
const agePatterns = [
  /older (systems|boats|examples)/i,
  /age-related/i,
  /deck (core )?moisture/i,
  /tank corrosion/i,
  /fuel tanks?/i,
  /window leaks?/i,
  /window seals?/i,
  /wiring/i,
  /hoses?/i,
  /through-?hulls?/i,
  /seacocks?/i,
  /exhaust (system|hoses?)/i,
  /cooling system/i,
  /shaft seals?/i,
  /rudder bearings?/i,
  /owner modifications?/i,
  /deferred maintenance/i,
  /teak maintenance/i,
  /osmosis|blistering/i
];
for (const m of models) {
  const candidates = [
    ...textItems(m.CommonProblems).map(text => ({field:'CommonProblems',text})),
    ...(m.KnownConcerns || []).map(c => ({field:'KnownConcerns',text:c?.Description || '', system:c?.System || null}))
  ];
  for (const c of candidates) {
    const matches = agePatterns.filter(p => p.test(c.text)).map(p => p.source);
    if (matches.length) add('genericAgeRelatedProblems', { severity:'review', modelId:idOf(m), model:nameOf(m), field:c.field, system:c.system || null, matchedPatterns:matches, text:c.text, note:'Flagged for determining whether this is model-specific, construction-specific, or only a general age-related survey risk.' });
  }
}

const categoryDescriptions = {
  duplicateStrings:'Identical normalized strings used by multiple records; cross-manufacturer and cross-family repeats receive higher review priority.',
  commaSeparatedPseudoLists:'Array items or prose fields that appear to contain several concepts separated by commas.',
  lineBreakInconsistencies:'Stored text containing CR, LF or CRLF line breaks.',
  genericFallbackLanguage:'Generic or verification-only wording that may make a field appear complete without model-specific information.',
  strengthsRepeatedInBestFor:'Strength content duplicated in Best For.',
  tradeOffsRepeatedInAvoidIf:'Trade-off content duplicated in Avoid If.',
  commonProblemsRepeatedInInspectionFocus:'Common Problems content duplicated in Inspection Focus.',
  highConfidenceWithoutEvidence:'High legacy or scoped confidence without evidence references in the authoritative model record.',
  reviewedWithoutSources:'Reviewed or Verified record with no evidence references in the authoritative model record.',
  notStartedWithHighConfidence:'Not-started record carrying legacy High confidence.',
  outsideControlledClassifications:'Values outside schema or taxonomy controlled values.',
  unknownRepresentedAsNegative:'False, No or zero values requiring confirmation that they are known negatives rather than placeholders.',
  genericAgeRelatedProblems:'Potentially generic age-related risks represented as model problems.'
};

for (const key of Object.keys(categoryDescriptions)) if (!issues[key]) issues[key] = [];
const counts = Object.fromEntries(Object.entries(issues).map(([k,v]) => [k,v.length]));
const affectedModels = [...new Set(Object.values(issues).flat().map(i => i.modelId).filter(Boolean))];
const report = {
  reportVersion: 1,
  phase: 'Phase 4 — Automated audit only',
  generatedAt: new Date().toISOString(),
  source: 'boatmodels.json',
  modelCount: models.length,
  mutationPolicy: 'Report only. No model data was rewritten.',
  methodologyNotes: [
    'Flags are review candidates, not automatic findings of factual error.',
    'Unknown-as-negative checks are contextual because false, No and zero can be legitimate values.',
    'Duplicate detection uses normalized exact strings and does not assume related models are erroneous.',
    'Evidence checks count authoritative EvidenceSummary, Suitability, KnownConcerns and ModelVariations references only.'
  ],
  summary: { totalFlags:Object.values(counts).reduce((a,b)=>a+b,0), affectedModelCount:affectedModels.length, counts },
  categoryDescriptions,
  issues
};
fs.writeFileSync(path.join(reportDir,'phase4-model-audit.json'), JSON.stringify(report,null,2)+'\n');

const csvEscape = v => `"${String(v ?? '').replace(/"/g,'""')}"`;
const csvRows = [['Category','Severity','BoatModelID','Model','Field','ValueOrText','Details']];
for (const [category, rows] of Object.entries(issues)) for (const r of rows) {
  csvRows.push([category,r.severity||'',r.modelId||'',r.model||'',r.field||r.sourceField||'',r.text||r.value||r.sourceText||'',JSON.stringify(r)]);
}
fs.writeFileSync(path.join(reportDir,'phase4-model-audit.csv'), csvRows.map(row=>row.map(csvEscape).join(',')).join('\n')+'\n');

const md = [];
md.push('# Phase 4 — Automated Model Audit');
md.push('');
md.push(`Generated: ${report.generatedAt}`);
md.push('');
md.push(`- Models audited: **${models.length}**`);
md.push(`- Models with one or more flags: **${affectedModels.length}**`);
md.push(`- Total flags: **${report.summary.totalFlags}**`);
md.push('- Model data changes: **None**');
md.push('');
md.push('## Summary');
md.push('');
md.push('| Audit | Flags |');
md.push('|---|---:|');
for (const [key,count] of Object.entries(counts)) md.push(`| ${key} | ${count} |`);
md.push('');
md.push('## Interpretation');
md.push('');
md.push('These results are editorial and schema review queues. A flag does not authorize automatic rewriting or establish that a value is wrong. Potential unknown-as-negative values require source verification.');
md.push('');
md.push('## Highest-priority samples');
md.push('');
for (const key of Object.keys(categoryDescriptions)) {
  md.push(`### ${key} (${issues[key].length})`);
  md.push('');
  md.push(categoryDescriptions[key]);
  md.push('');
  for (const r of issues[key].slice(0,8)) {
    const who = r.model ? `**${r.model}** (${r.modelId})` : '';
    const field = r.field || `${r.sourceField || ''}${r.targetField ? ` → ${r.targetField}` : ''}`;
    const excerpt = String(r.text || r.value || r.sourceText || '').replace(/\s+/g,' ').slice(0,220);
    md.push(`- ${who}${field ? ` — \`${field}\`` : ''}${excerpt ? `: ${excerpt}` : ''}`);
  }
  if (issues[key].length > 8) md.push(`- … ${issues[key].length - 8} additional flags in the JSON/CSV report.`);
  md.push('');
}
fs.writeFileSync(path.join(reportDir,'PHASE_4_MODEL_AUDIT.md'), md.join('\n')+'\n');

console.log(JSON.stringify(report.summary,null,2));
