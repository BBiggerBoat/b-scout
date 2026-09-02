const fs = require('fs');
const assert = require('assert');
const score = require('../modelknowledgescore.js');

const boats = JSON.parse(fs.readFileSync(require('path').join(__dirname,'..','boatmodels.json'),'utf8'));
assert.strictEqual(score.TOTAL_WEIGHT, 100, 'Score weights must total 100');
assert.strictEqual(score.FIELDS.length, 43, 'Expected 43 scored knowledge fields');

const camano = boats.find(b => b.BoatModelID === 'CAMA-31-TR');
assert(camano, 'Camano 31 fixture missing');
const result = score.scoreModel(camano);
assert(result.score >= 0 && result.score <= 100, 'Score outside 0–100');
assert(result.opportunities.every(item => item.projectedScore >= result.score), 'Opportunity should not reduce score');
assert(result.opportunities.some(item => item.id === 'HeadroomHelm' || item.id === 'AirDraft'), 'Expected useful missing-field opportunity');

const explicitUnknown = { ...camano, LOA: null, LOA_ft: 31, PlanCriticalStatus:{ ...(camano.PlanCriticalStatus||{}), LOA:'researched_unknown' } };
const unknownResult = score.scoreModel(explicitUnknown);
assert(unknownResult.missing.some(item => item.id === 'LOA'), 'Researched Unknown LOA must remain missing even with legacy LOA_ft');

const completed = { ...camano };
for (const field of score.FIELDS) completed[field.keys[0]] = completed[field.keys[0]] ?? 1;
completed.PlanCriticalStatus = {};
assert.strictEqual(score.scoreModel(completed).score, 100, 'Fully populated scored model should reach 100');
console.log(JSON.stringify({status:'Passed', fields:score.FIELDS.length, totalWeight:score.TOTAL_WEIGHT, camanoScore:result.score}));
