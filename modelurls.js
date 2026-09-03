(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.BAtlasModelURLs=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const BASE='https://b-atlas.org';
function slugify(value){return String(value||'').toLowerCase().trim().replace(/&/g,' and ').replace(/['’]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'model';}
function displayName(boat){return [boat?.Manufacturer,boat?.Model,boat?.Variant].filter(Boolean).join(' ').trim();}
function slugForBoat(boat){return String(boat?.CanonicalSlug||'').trim()||slugify(displayName(boat));}
function pathForBoat(boat){return String(boat?.CanonicalPath||'').trim()||`/models/${slugForBoat(boat)}/`;}
function absoluteURL(boat){return String(boat?.CanonicalURL||'').trim()||`${BASE}${pathForBoat(boat)}`;}
function matchesPath(boat,path){const target=String(path||'').replace(/\/+$/,'/')||'/';if(pathForBoat(boat)===target)return true;return (boat?.LegacySlugs||[]).some(s=>`/models/${String(s).replace(/^\/+|\/+$/g,'')}/`===target);}
function findByPath(boats,path){return (boats||[]).find(boat=>matchesPath(boat,path))||null;}
function canonicalFields(manufacturer,model,variant,existingSlugs=[],boatModelId=''){
 const label=[manufacturer,model,variant].filter(Boolean).join(' ');let slug=slugify(label);const used=new Set((existingSlugs||[]).map(String));if(used.has(slug)&&boatModelId)slug=`${slug}-${String(boatModelId).toLowerCase()}`;return {CanonicalSlug:slug,CanonicalPath:`/models/${slug}/`,CanonicalURL:`${BASE}/models/${slug}/`};
}
return {BASE,slugify,displayName,slugForBoat,pathForBoat,absoluteURL,matchesPath,findByPath,canonicalFields};
});
