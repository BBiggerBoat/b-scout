#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'); const root=path.resolve(__dirname,'..');
const map={'CPDR-28-PH':'CPDR-28-CR','CAPD-28-CR':'CPDR-28-CR','CAPD-30-FB':'CPDR-30-FB'};
const files=['knowledge/data/facts.json','knowledge/data/evidence.json','knowledge/data/listingsearches.json','knowledge/data/curatedresources.json','knowledge/data/relationships.json','knowledge/data/knowledge-coverage.json'];
function rewrite(v){if(Array.isArray(v)) return v.map(rewrite); if(v&&typeof v==='object'){for(const k of Object.keys(v)){if(['BoatModelID','FromBoatModelID','ToBoatModelID'].includes(k)&&map[v[k]]) v[k]=map[v[k]]; else v[k]=rewrite(v[k]);}return v;} return v;}
for(const rel of files){const file=path.join(root,rel); if(!fs.existsSync(file)) continue; let d=JSON.parse(fs.readFileSync(file,'utf8')); d=rewrite(d);
 if(rel.endsWith('relationships.json')) d=d.filter(x=>x.FromBoatModelID!==x.ToBoatModelID);
 if(rel.endsWith('knowledge-coverage.json')){const by=new Map(); for(const x of d){const old=by.get(x.BoatModelID); if(!old||(+x.OverallScore||0)>(+old.OverallScore||0)) by.set(x.BoatModelID,x);} d=[...by.values()];}
 else if(Array.isArray(d)){const seen=new Set(); d=d.filter(x=>{const k=JSON.stringify(x); if(seen.has(k)) return false; seen.add(k); return true;});}
 fs.writeFileSync(file,JSON.stringify(d,null,2)+'\n'); console.log(rel,Array.isArray(d)?d.length:'updated');
}
