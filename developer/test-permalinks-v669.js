'use strict';
const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..');
const models=JSON.parse(fs.readFileSync(path.join(root,'boatmodels.json'),'utf8'));
const registry=JSON.parse(fs.readFileSync(path.join(root,'data/model-permalinks.json'),'utf8'));
const urls=require(path.join(root,'modelurls.js'));
const errors=[];
if(models.length!==259)errors.push(`Expected 259 baseline models, found ${models.length}`);
if(registry.models.length!==models.length)errors.push('Permalink registry model count mismatch');
const slugs=new Set(), paths=new Set();
for(const m of models){
 if(!m.CanonicalSlug||!m.CanonicalPath||!m.CanonicalURL)errors.push(`${m.BoatModelID}: missing permanent URL fields`);
 if(slugs.has(m.CanonicalSlug))errors.push(`${m.BoatModelID}: duplicate slug ${m.CanonicalSlug}`);slugs.add(m.CanonicalSlug);
 if(paths.has(m.CanonicalPath))errors.push(`${m.BoatModelID}: duplicate path ${m.CanonicalPath}`);paths.add(m.CanonicalPath);
 if(urls.pathForBoat(m)!==m.CanonicalPath)errors.push(`${m.BoatModelID}: runtime path mismatch`);
 const dir=path.join(root,m.CanonicalPath.replace(/^\//,'').replace(/\/$/,''),'index.html');
 if(!fs.existsSync(dir))errors.push(`${m.BoatModelID}: static model page missing at ${m.CanonicalPath}`);
 else {const html=fs.readFileSync(dir,'utf8'); if(!html.includes(`rel="canonical" href="${m.CanonicalURL}"`))errors.push(`${m.BoatModelID}: static canonical link mismatch`);}
 const renamed={...m,Manufacturer:'Renamed Manufacturer',Model:'Renamed Model',Variant:'Renamed Variant'};
 if(urls.pathForBoat(renamed)!==m.CanonicalPath)errors.push(`${m.BoatModelID}: rename changed permanent path`);
}
const ros=models.find(x=>x.BoatModelID==='ROSB-246-LS');
if(!ros||ros.CanonicalPath!=='/models/rosborough-rf-246-legacy-sedan-cruiser-diesel/')errors.push('Rosborough RF-246 Legacy permalink is not the expected human-readable path');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`PASS: ${models.length} models have unique, immutable permanent URLs and generated model pages.`);
