(function(global){
"use strict";
const FACTORS={m:1,cm:.01,ft:.3048,in:.0254,kg:1,lb:.45359237,L:1,us_gal:3.785411784,imp_gal:4.54609,kW:1,hp:.745699872,kn:1,nm:1};
const CANON={length:"m",mass:"kg",volume:"L",power:"kW",speed:"kn",distance:"nm"};
function n(v){const x=Number(v);return Number.isFinite(x)?x:null;}
function toCanonical(value,unit){const x=n(value),f=FACTORS[unit];return x===null||!f?null:x*f;}
function fromCanonical(value,unit){const x=n(value),f=FACTORS[unit];return x===null||!f?null:x/f;}
function first(row,keys){for(const k of keys||[]){if(row&&row[k]!==undefined&&row[k]!==null&&row[k]!=="")return row[k];}return null;}
function canonicalMeasurement(row,key,legacy){const direct=n(row?.[key]);if(direct!==null)return direct;for(const item of legacy||[]){const raw=n(row?.[item.key]);if(raw===null||item.unit==="gal_unknown")continue;const cv=toCanonical(raw,item.unit);if(cv!==null)return cv;}return null;}
function feet(row,key,legacy){const m=canonicalMeasurement(row,key,legacy);return m===null?null:fromCanonical(m,"ft");}
function inches(row,key,legacy){const m=canonicalMeasurement(row,key,legacy);return m===null?null:fromCanonical(m,"in");}
function enumCode(row,key,legacyKeys){const direct=first(row,[key]);if(direct!==null)return String(direct);return first(row,legacyKeys||[]);}
function formatFeetInches(m){const total=fromCanonical(m,"in");if(total===null)return null;let rounded=Math.round(total);let ft=Math.floor(rounded/12),inch=rounded-ft*12;if(inch===12){ft++;inch=0;}return `${ft}′ ${inch}″`;}
function formatMeasurement(value,dimension,profile="imperial"){
 const x=n(value); if(x===null)return null;
 if(dimension==="speed")return `${x.toFixed(1).replace(/\.0$/,'')} kn`;
 if(dimension==="distance")return `${x.toFixed(0)} nm`;
 if(profile==="metric"){
  if(dimension==="length")return `${x.toFixed(2).replace(/0+$/,'').replace(/\.$/,'')} m`;
  if(dimension==="mass")return `${Math.round(x).toLocaleString()} kg`;
  if(dimension==="volume")return `${Math.round(x).toLocaleString()} L`;
  if(dimension==="power")return `${x.toFixed(1).replace(/\.0$/,'')} kW`;
 }
 if(dimension==="length")return formatFeetInches(x);
 if(dimension==="mass")return `${Math.round(fromCanonical(x,"lb")).toLocaleString()} lb`;
 if(dimension==="volume")return `${Math.round(fromCanonical(x,"us_gal")).toLocaleString()} US gal`;
 if(dimension==="power")return `${Math.round(fromCanonical(x,"hp"))} hp`;
 return String(x);
}

function phaseMatchesContext(phase,context={}){
 const y=Number(context.year);
 if(Number.isFinite(y)){
  const sy=Number(phase?.StartYear), ey=Number(phase?.EndYear);
  if(Number.isFinite(sy)&&y<sy)return false;
  if(Number.isFinite(ey)&&y>ey)return false;
 }
 const material=context.HullMaterialCode||context.hullMaterialCode;
 if(material){
  const materialFact=(phase?.FactOverrides||[]).find(f=>f.FieldID==="HullMaterialCode"&&f.ValueState==="known");
  if(materialFact&&String(materialFact.CanonicalValue)!==String(material))return false;
 }
 return true;
}
function resolveProductionPhase(row,context={}){
 const phases=Array.isArray(row?.ProductionPhases)?row.ProductionPhases:[];
 const matches=phases.filter(p=>phaseMatchesContext(p,context));
 return {status:matches.length===1?"resolved":matches.length>1?"ambiguous":"none",phase:matches.length===1?matches[0]:null,matches};
}
function phaseOverride(phase,fieldId){
 const fact=(phase?.FactOverrides||[]).find(f=>String(f.FieldID)===String(fieldId));
 return fact&&fact.ValueState==="known"?fact.CanonicalValue:null;
}
function effectiveCanonicalValue(row,fieldId,context={}){
 const result=resolveProductionPhase(row,context);
 if(result.status==="resolved"){
  const value=phaseOverride(result.phase,fieldId);
  if(value!==null&&value!==undefined)return {value,source:"production_phase",phase:result.phase,status:"known"};
 }
 const direct=row?.[fieldId];
 if(direct!==undefined&&direct!==null&&direct!=="")return {value:direct,source:"model",phase:null,status:"known"};
 return {value:null,source:result.status==="ambiguous"?"production_phase_ambiguous":"model",phase:null,status:result.status==="ambiguous"?"ambiguous":"unknown"};
}

global.BAtlasCanonical={FACTORS,CANON,toCanonical,fromCanonical,canonicalMeasurement,feet,inches,enumCode,formatMeasurement,phaseMatchesContext,resolveProductionPhase,phaseOverride,effectiveCanonicalValue};
})(typeof window!=="undefined"?window:globalThis);
