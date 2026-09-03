#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const q=JSON.parse(fs.readFileSync(path.join(root,'data/resource-review-queue-v6.67.json'),'utf8'));
const audit=JSON.parse(fs.readFileSync(path.join(root,'data/global-resource-coverage-audit-v6.66.json'),'utf8'));
function assert(v,m){if(!v)throw new Error(m)}
assert(q.schema==='batlas-resource-review-queue-v1','schema');
assert(q.items.length===185,`expected 185 candidates, got ${q.items.length}`);
assert(new Set(q.items.map(x=>x.ResourceReviewID)).size===185,'resource review IDs must be unique');
assert(q.items.every(x=>x.BoatModelID&&x.URL&&x.Status==='pending'),'all seed candidates need model, URL and pending status');
assert(q.items.every(x=>Array.isArray(x.SupportedFacts)&&x.SupportedFacts.length),'all candidates should retain research facts supported');
const ids=new Set(audit.models.map(x=>x.BoatModelID));
assert(q.items.every(x=>ids.has(x.BoatModelID)),'every candidate must map to a canonical audited model');
const html=fs.readFileSync(path.join(root,'developer/contribution-review.html'),'utf8');
for(const token of ['Resource Review','Publish to Resource Library','Keep as evidence only','Needs replacement'])assert(html.includes(token),`portal missing ${token}`);
const server=fs.readFileSync(path.join(root,'server.js'),'utf8');
assert(server.includes('resourceReview'), 'local shared backend must persist resourceReview');
assert(server.includes('publishResourceReview'), 'local shared backend must publish approved resources');
const cloud=fs.readFileSync(path.join(root,'functions/api/[[path]].js'),'utf8');
assert(cloud.includes('resourceAdditions'), 'cloud backend must publish resource overlays');
const ui=fs.readFileSync(path.join(root,'knowledge/knowledgecardui.js'),'utf8');
assert(ui.includes('mergeResourceAdditions'), 'public model cards must merge published resource overlays');
console.log(JSON.stringify({ok:true,candidates:q.items.length,modelsWithCandidates:new Set(q.items.map(x=>x.BoatModelID)).size,supportedFacts:q.items.reduce((n,x)=>n+x.SupportedFacts.length,0)},null,2));
