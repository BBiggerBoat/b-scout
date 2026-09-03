const fs=require('fs');
function read(p){return JSON.parse(fs.readFileSync(p,'utf8'));}
const models=read('boatmodels.json');
const resources=read('knowledge/data/curatedresources.json');
const audit=read('data/global-resource-coverage-audit-v6.66.json');
const mids=new Set(models.map(x=>x.BoatModelID));
const rids=new Set(resources.map(x=>x.BoatModelID));
const errors=[];
if(models.length!==259)errors.push(`Expected 259 models; got ${models.length}`);
if(resources.length!==259)errors.push(`Expected 259 resource sets; got ${resources.length}`);
for(const id of mids)if(!rids.has(id))errors.push(`Missing resource set ${id}`);
for(const id of rids)if(!mids.has(id))errors.push(`Orphan resource set ${id}`);
const total=resources.reduce((n,r)=>n+(r.documents||[]).length+(r.ownerCommunities||[]).length+(r.videos||[]).length,0);
if(total!==557)errors.push(`Expected 557 retained resource items; got ${total}`);
if(audit.summary.canonicalModels!==259||audit.models.length!==259)errors.push('Audit does not cover all canonical models');
if(errors.length){console.error('Resource coverage QC FAILED');errors.forEach(e=>console.error('-',e));process.exit(1)}
console.log(JSON.stringify({status:'Passed',canonicalModels:models.length,resourceSets:resources.length,retainedResourceItems:total,modelsWithAnyResource:audit.summary.modelsWithAnyResource,modelsWithNoResource:audit.summary.modelsWithNoResource},null,2));
