#!/usr/bin/env node
"use strict";
const fs=require('fs'),vm=require('vm');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const boats=read('boatmodels.json'), registry=read('data/registry/boat-registry.json'), aliases=read('data/model-search-aliases.json'), pref=read('data/preference-map.json');
const ids=new Set(boats.map(x=>x.BoatModelID)), regIds=registry.map(x=>x.BoatModelID), aliasIds=new Set(aliases.map(x=>x.BoatModelID));
const assert=(ok,msg)=>{if(!ok) throw new Error(msg)};
assert(ids.size===boats.length,'Duplicate BoatModelID in boatmodels.json');
assert(new Set(regIds).size===registry.length,'Duplicate BoatModelID in registry');
assert(ids.size===registry.length && [...ids].every(id=>regIds.includes(id)),'Registry not synchronized to boatmodels');
assert(ids.size===aliases.length && [...ids].every(id=>aliasIds.has(id)),'Search aliases not synchronized to boatmodels');
const direct=new Map(pref.mappings.filter(x=>x.type==='direct').map(x=>[x.preferenceId,x.fields||[]]));
for(const id of ['length_range','beam_range','fuel','propulsion','engine_count','boat_family','hull_behaviour']) assert(direct.has(id),`Missing canonical Plan mapping: ${id}`);

global.window=global;
for(const f of ['canonicaldata.js','valuenormalizer.js','filterengine.js']) vm.runInThisContext(fs.readFileSync(f,'utf8'),{filename:f});
const conflict={LOA:9.144,LOA_ft:40,Beam:3.048,Beam_ft:15,FuelCode:'fuel.diesel',Fuel:'Gas',HullBehaviourCode:'hull_behaviour.semi_displacement',HullType:'Planing',MechanicalPropulsionCode:'mechanical_propulsion.shaft',Propulsion:'Outboard',BoatFamilyCode:'boat_family.trawler',BoatFamily:'Cruiser',SideDecksCode:'side_decks.wide',SideDecks:'Narrow',AftCabin:true,KeelConfigurationCode:'keel.full_long',ShowerTypeCode:'shower.separate_stall'};
const profile={maxLength:32,maxBeam:11,fuels:['Diesel'],hullTypes:['Semi-Displacement'],propulsion:['Shaft'],boatFamilies:['Trawler'],sideDecks:'Wide'};
const result=BScoutFilterEngine.evaluateBoat(conflict,profile,[],{});
assert(result.passes,'Canonical values did not override stale legacy filter fields');
assert(BScoutFilterEngine.evaluateBoat({},profile,[],{}).passes,'Unknown facts incorrectly eliminated a model');
for(const feature of ['Aft Cabin','Wide Side Decks','Long Keel','Separate Shower']) assert(BScoutFilterEngine.featureMatches(conflict,feature),`Canonical feature mapping failed: ${feature}`);
console.log(JSON.stringify({status:'Passed',canonicalModels:boats.length,registryRecords:registry.length,searchAliasRecords:aliases.length,preferenceMappings:pref.mappings.length},null,2));
