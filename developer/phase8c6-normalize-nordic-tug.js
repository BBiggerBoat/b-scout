#!/usr/bin/env node
'use strict';
const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..');
const file=path.join(root,'boatmodels.json');
const models=JSON.parse(fs.readFileSync(file,'utf8'));
const today='2026-08-07';
const S={
 history:'https://www.nordictugs.com/history',
 current:'https://www.nordictugs.com/vessels',
 n26:'https://www.boats.com/reviews/nordic-tug-26/',
 n32:'https://www.yachtworld.com/yacht/1985-nordic-tug-32-9544961/',
 n37:'https://www.boats.com/reviews/sea-trial-nordic-tug-37/',
 n39:'https://powerandmotoryacht.com/boats/boat-tests/nordic-tug-39/?tab=boat',
 n39intro:'https://www.boats.com/reviews/first-look-at-the-new-nordic-tugs-39/',
 n42:'https://nordictug42.com/specifications/',
 n42older:'https://nordictug42forsale.com/specifications/',
 n44:'https://www.greatlakesscuttlebutt.com/news/featured-news/revisiting-the-no-nonsense-nordic-tug-44-an-american-classic/'
};
const familyRef='manufacturerknowledge:NORDIC:Nordic Tug Family';
const q=items=>items.map(x=>'What inspection, repair or service history is available for '+x.charAt(0).toLowerCase()+x.slice(1)+'?');
const owner=[
 'Keep pilothouse windows, deck hardware and exterior penetrations sealed and address leaks promptly',
 'Maintain raw-water cooling, exhaust, shaft, rudder and steering systems to documented service intervals',
 'Exercise and service bow/stern thrusters and owner-added electrical systems where fitted',
 'Document repowers, structural repairs, tank work and electrical modifications for future buyers'
];
const inspectSmall=[
 'Confirm model year, engine installation and any repower work',
 'Inspect pilothouse windows, cabin-top and deck penetrations for moisture intrusion',
 'Inspect fuel and water tanks, fill/vent hoses and access',
 'Inspect exhaust, cooling, shaft, rudder and steering systems',
 'Review electrical upgrades and owner modifications'
];
const inspectLarge=[
 'Confirm model year, engine package and factory or owner-added flybridge equipment',
 'Inspect pilothouse and saloon window sealing and surrounding structure',
 'Moisture-test deck penetrations, cabin-top hardware and boat-deck areas',
 'Inspect exhaust, cooling, shaft, rudder and steering systems',
 'Inspect thrusters, generator, charging systems and owner-added electrical equipment',
 'Verify tank condition, supports, hoses and access for future replacement'
];
const C={
'NDTG-26':{
 years:[1980,2026], spec:{LOA_ft:26.33,LWL_ft:25.17,Beam_ft:9.5,Draft_ft:3.25,Displacement_lb:8600,FuelCapacity:75,WaterCapacity:40,HoldingCapacity:20,EngineCount:1,Flybridge:'No',AftCabin:'No',Trailerable:true,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft'},
 overview:'The Nordic Tug 26 is the original compact Nordic Tugs cruiser, built around a pilothouse, semi-displacement fiberglass hull and single diesel shaft drive. Its narrow beam and one-cabin layout favor economical couple cruising, inland waterways and compact marina footprints rather than large-boat accommodation. Production was interrupted after 1997 and later revived in limited production, so displacement, engines and equipment vary materially by generation.',
 strengths:['Compact pilothouse protection with good all-weather visibility','Efficient single-diesel shaft propulsion','Narrow 9 ft 6 in beam and relatively shallow draft','Strong builder identity and long-lived owner community'],
 trade:['Interior, cockpit and storage volume are limited','Early and revived-production boats differ in weight, engines and equipment','Trailerable dimensions do not make it a casual tow for every vehicle or jurisdiction','Compact sleeping and head arrangements require personal fit testing'],
 best:['Couples prioritizing economy and pilothouse protection','Canal, Great Loop and protected coastal cruising','Owners wanting a compact single-diesel tug cruiser'],
 avoid:['You need multiple private cabins','You require expansive cockpit or liveaboard storage','You expect automobile-like trailerability or high cruising speeds'],
 inspect:inspectSmall,
 variations:[
  {Name:'Original production',Description:'The original 26 launched in 1980 and was retired in 1997 after establishing the Nordic Tug line.',AffectedYears:'1980–1997',EvidenceRefs:[S.history],Confidence:'High'},
  {Name:'Cruiser and Cricket configurations',Description:'Nordic Tugs built both a cruiser version and the shorter-cabin/open-aft-deck Cricket/work-fishing configuration during the early era.',AffectedYears:'Early production',EvidenceRefs:[S.history],Confidence:'High'},
  {Name:'Limited-production revival',Description:'The 26 was re-launched in 2009 as a limited-production model. Later published specifications show higher standard power and weight than many early boats.',AffectedYears:'2009 onward',EvidenceRefs:[S.history,S.current,S.n26],Confidence:'High'}
 ],
 sources:[S.history,S.current,S.n26], unresolved:['Representative displacement varies by production generation; individual hull documentation controls','Air draft depends on mast, stack and antenna configuration']
},
'NDTG-32':{
 years:[1985,2012], spec:{LOA_ft:32.08,Beam_ft:11,Draft_ft:3.5,AirDraft_ft:10.5,Displacement_lb:13500,FuelCapacity:205,WaterCapacity:100,HoldingCapacity:30,EngineCount:1,Flybridge:'No',AftCabin:'No',Trailerable:false,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft'},
 overview:'The Nordic Tug 32 expanded the original tug concept into a more substantial one-cabin pilothouse cruiser with a semi-displacement hull and single diesel shaft drive. Early boats are roughly 32 feet overall, while later versions gained appendages and platform length as the design evolved toward the later Nordic Tug 34. The model remains primarily a couple-cruising boat with a lower pilothouse, salon and convertible guest accommodation.',
 strengths:['Protected pilothouse with direct side-deck access','Efficient single-diesel shaft propulsion','One-cabin couple-cruising layout with usable salon guest berth','Moderate beam for a substantial pilothouse cruiser'],
 trade:['Production evolution makes published LOA, draft and weight figures inconsistent','One private cabin limits guest privacy','Machinery and tank access vary with year and refit history','More substantial than the 26 and not realistically trailerable for routine use'],
 best:['Couples wanting a traditional pilothouse cruiser without moving into 37-foot dimensions','Great Loop, inland and coastal cruising','Owners valuing single-engine simplicity and enclosed helm protection'],
 avoid:['You need two private cabins','You require a flybridge','You need highway trailerability or very low air draft'],
 inspect:inspectSmall,
 variations:[{Name:'Early and later overall-length treatment',Description:'The 32 design evolved during its long production run; later examples and published specifications can include platforms or appendages that bring overall length close to the later 34 while the core model identity remains 32.',AffectedYears:'1985–2012',EvidenceRefs:[S.history,S.n32],Confidence:'Moderate'}],
 sources:[S.history,S.n32], unresolved:['Fuel, water and holding capacities should be confirmed by year; later 32/early 34 specification overlap is significant','Bridge clearance varies with mast and antenna configuration']
},
'NDTG-34':{
 years:[2014,2026], spec:{LOA_ft:34.92,LWL_ft:32.67,Beam_ft:11.33,Draft_ft:3.67,AirDraft_ft:10,Displacement_lb:15700,FuelCapacity:205,WaterCapacity:100,HoldingCapacity:30,EngineCount:1,Flybridge:'No',AftCabin:'No',Trailerable:false,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft'},
 overview:'The Nordic Tug 34 is the modern successor to the long-running 32, retaining the single-cabin pilothouse layout, semi-displacement hull and single diesel shaft drive while integrating the swim platform into the published overall length. Factory specifications place it just under 35 feet overall with an 11 ft 4 in beam. It is designed primarily as an owner-operated couple cruiser capable of efficient displacement-speed travel and mid-teen speeds when required.',
 strengths:['Factory-documented single-diesel simplicity','Excellent pilothouse visibility and practical side-door access','Efficient low-speed cruising with useful reserve speed','Compact beam and one-level salon/cockpit relationship for the class'],
 trade:['Only one private stateroom','Smaller cockpit and storage volume than larger Nordic Tugs','Single-engine maneuvering benefits from thruster assistance in wind','Purchase price and system complexity are high relative to older 32s'],
 best:['Couples wanting a modern compact pilothouse cruiser','Great Loop and extended inland/coastal cruising','Owner-operators prioritizing efficiency, visibility and manageable dimensions'],
 avoid:['You need two private cabins','You want a flybridge','You require a genuinely trailerable cruising boat'],
 inspect:inspectSmall,
 variations:[{Name:'32-to-34 evolution',Description:'Nordic Tugs describes the 34 as the evolution of the earlier 32, with integrated transom-platform length and updated interiors and systems.',AffectedYears:'2014 onward',EvidenceRefs:[S.history,S.current],Confidence:'High'}],
 sources:[S.current,S.history], unresolved:['Engine make and output vary by model year and order; confirm the individual hull specification']
},
'NDTG-37':{
 years:[1998,2009], spec:{LOA_ft:39.83,Beam_ft:12.92,Draft_ft:4,Displacement_lb:22000,FuelCapacity:324,WaterCapacity:150,HoldingCapacity:40,EngineCount:1,Flybridge:'No',AftCabin:'No',Trailerable:false,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft'},
 overview:'The Nordic Tug 37 introduced the builder’s midsize two-stateroom pilothouse platform in 1998. It uses a semi-displacement fiberglass hull, single diesel shaft drive, raised pilothouse and larger salon than the 32, giving a cruising couple substantially more storage and guest capability. The same basic hull later evolved into the Nordic Tug 39 and then the Nordic Tug 40.',
 strengths:['Two-stateroom accommodation in a manageable owner-operated platform','Protected pilothouse and strong side-deck access','Single-diesel efficiency with mid-teen speed capability','Established hull lineage that continued into the 39 and 40'],
 trade:['Nearly 40-foot overall length once appendages are included','Single-engine docking can depend heavily on thrusters and technique','Larger systems, generator and tankage raise maintenance burden over the 32/34','Published dimensions vary slightly by production year and measurement convention'],
 best:['Couples wanting extended-cruising comfort with guest capability','Pacific Northwest, Great Lakes and coastal cruising','Owners wanting single-engine simplicity in a substantial pilothouse boat'],
 avoid:['You need narrow-slip dimensions','You require twin-engine redundancy','You want compact-boat operating and haul-out costs'],
 inspect:inspectLarge,
 variations:[{Name:'37 platform',Description:'Introduced in 1998; approximately 214 were built before the design was revised into the Nordic Tug 39.',AffectedYears:'1998–2009',EvidenceRefs:[S.history,S.n39intro],Confidence:'High'}],
 sources:[S.history,S.n37,S.n39intro], unresolved:['Representative published LOA varies around 39 feet depending on appendages; verify the individual hull','Air draft varies with mast and optional equipment']
},
'NDTG-39':{
 years:[2010,2015], spec:{LOA_ft:40,Beam_ft:12.92,Draft_ft:4.33,Displacement_lb:22600,FuelCapacity:320,WaterCapacity:144,HoldingCapacity:32,EngineCount:1,Flybridge:'Optional',AftCabin:'No',Trailerable:false,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft'},
 overview:'The Nordic Tug 39 is an evolutionary update of the 37 using the same basic hull with significant topside, pilothouse, visibility, interior and systems revisions. Published specifications show a 40-foot overall length, 12 ft 11 in beam and single diesel shaft propulsion. It is a two-stateroom cruising platform intended for owner-operated extended coastal and inland travel, with flybridge installations available on some examples.',
 strengths:['Improved pilothouse visibility and helm ergonomics over the 37','Two-stateroom extended-cruising layout','Efficient single-diesel propulsion with useful mid-teen performance','Large fuel and water capacity for owner-operated cruising'],
 trade:['Substantial beam, weight and systems increase operating and storage costs','Flybridge-equipped boats carry more windage and vertical clearance','Single-engine maneuvering benefits from working thrusters','The model had a short production life before evolving into the 40'],
 best:['Couples wanting a two-stateroom pilothouse cruiser','Extended Great Loop, Great Lakes and coastal cruising','Owners prioritizing single-engine efficiency with modernized 37-family ergonomics'],
 avoid:['You need compact marina dimensions','You require twin-engine redundancy','You need very low bridge clearance'],
 inspect:inspectLarge,
 variations:[{Name:'37-to-39 evolution',Description:'The 39 retained the 37 hull but received significant changes to pilothouse windows, helm, head, guest-stateroom and galley arrangements.',AffectedYears:'2010–2015',EvidenceRefs:[S.n39intro],Confidence:'High'},{Name:'Flybridge option',Description:'Some Nordic Tug 39s were delivered with a flybridge and boat-deck arrangement; verify air draft and tender equipment on the individual boat.',AffectedYears:'Production run',EvidenceRefs:[S.n39],Confidence:'Moderate'}],
 sources:[S.n39,S.n39intro,S.history], unresolved:['Air draft and holding capacity vary with configuration and model year; confirm individual specifications']
},
'NDTG-42-PH':{
 years:[1997,2015], spec:{LOA_ft:44.67,LWL_ft:38.33,Beam_ft:13.83,Draft_ft:4.58,Displacement_lb:31400,FuelCapacity:600,WaterCapacity:200,HoldingCapacity:45,EngineCount:1,Flybridge:'Optional',AftCabin:'No',Trailerable:false,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft'},
 overview:'The Nordic Tug 42 is the builder’s large two-stateroom pilothouse cruiser from the late 1990s through the mid-2010s. Despite the model name, representative later boats measure about 44 ft 8 in overall and use a single large diesel, shaft drive, substantial tankage and two heads. Many examples have a flybridge and boat deck; the model was replaced and refined by the Nordic Tug 44.',
 strengths:['Two private staterooms and two heads','Large pilothouse, salon and tankage for extended cruising','Single-diesel shaft propulsion with substantial range potential','Heavy construction and protected running gear suited to serious coastal cruising'],
 trade:['Marina, haul-out and maintenance costs are yacht-scale','Flybridge and boat-deck equipment increase windage and vertical clearance','Single large-engine propulsion lacks twin-engine redundancy','Exterior access to the flybridge on many 42s is less convenient than the later 44 interior-stair arrangement'],
 best:['Couples planning extended cruising with regular guests','Pacific Northwest, Alaska, Great Lakes and coastal cruising','Owners wanting long-range tankage and a substantial pilothouse platform'],
 avoid:['You need low bridge clearance or small-marina dimensions','You require twin-engine redundancy','You want compact ownership costs or simple systems'],
 inspect:inspectLarge,
 variations:[{Name:'Flybridge and non-flybridge configurations',Description:'The 42 was delivered in differing upper-deck arrangements; flybridge boats require separate assessment of bridge, boat-deck, davit and air-draft implications.',AffectedYears:'Production run',EvidenceRefs:[S.n42,S.n42older],Confidence:'Moderate'},{Name:'42-to-44 transition',Description:'The Nordic Tug 44 replaced the 42 and retained the core concept while adding an interior staircase to the flybridge and other accommodation refinements.',AffectedYears:'Replacement around 2016',EvidenceRefs:[S.n44],Confidence:'High'}],
 sources:[S.history,S.n42,S.n42older,S.n44], unresolved:['Published displacement ranges by year and loading; representative dry weight is used','Air draft changes materially with flybridge, mast and antenna configuration','Fuel capacity varies between documented examples; verify the individual hull']
}
};
// legacy duplicate IDs map to canonical records; keep for reference compatibility but normalize content and identify them explicitly.
const aliases={'NDTG-26-PH':'NDTG-26','NDTG-32-PH':'NDTG-32','NDTG-37-PH':'NDTG-37'};
function suitability(m,c){return {
 CoupleCruising:{Assessment:'Good',Summary:'The documented pilothouse layout and accommodation are well suited to an owner-operated cruising couple, subject to individual condition and space preferences.',EvidenceRefs:c.sources},
 SoloHandling:{Assessment:(m.LOA_ft||0)<=35?'Good':'Mixed',Summary:(m.LOA_ft||0)<=35?'Single-diesel propulsion, pilothouse visibility and compact dimensions support manageable owner operation; wind and docking conditions still matter.':'Pilothouse visibility and side access help, but vessel size, windage and optional flybridge equipment increase docking workload.',EvidenceRefs:c.sources},
 InlandWaterways:{Assessment:(m.Beam_ft||99)<=11.5?'Good':'Mixed',Summary:(m.Beam_ft||99)<=11.5?'Beam, draft and efficient low-speed operation suit many inland routes; bridge clearance must still be verified.':'The hull is efficient for inland travel, but beam and air draft require route-specific verification.',EvidenceRefs:c.sources},
 ExposedWater:{Assessment:'Mixed',Summary:'The semi-displacement hull and protected pilothouse support coastal use, but B-Scout does not treat the model as an unrestricted offshore passagemaker; condition, loading and weather limits remain decisive.',EvidenceRefs:c.sources}
};}
function evidence(id,c){const a={Scope:'Model',Models:[id],Years:{From:c.years[0],To:c.years[1]},Variations:[]};return [
 {Scope:'IdentityAndDimensions',AppliesTo:a,EvidenceRefs:c.sources,EvidenceTypes:['Factory documented','Technical or survey source'],Confidence:'High',Notes:'Identity, production lineage and representative specifications are supported by model-specific or builder sources; individual hull documentation remains controlling.'},
 {Scope:'OverviewAndSuitability',AppliesTo:a,EvidenceRefs:c.sources,EvidenceTypes:['Factory documented','Technical or survey source'],Confidence:'Moderate',Notes:'Buyer guidance is derived from documented configuration, hull form, propulsion, dimensions and production lineage.'},
 {Scope:'InspectionFocus',AppliesTo:{...a,Scope:'Model family'},EvidenceRefs:[...c.sources,familyRef],EvidenceTypes:['Technical or survey source'],Confidence:'Moderate',Notes:'Inspection guidance combines model-specific configuration with family and age-related risk areas; it is not an assertion that every hull has these defects.'}
];}
const changed=[];
for(const m of models){
 const canonical=aliases[m.BoatModelID]||m.BoatModelID;
 const c=C[canonical]; if(!c) continue;
 m.FirstYear=c.years[0]; m.LastYear=c.years[1]; Object.assign(m,c.spec);
 m.Overview=c.overview; m.Suitability=suitability(m,c); m.Strengths=c.strengths; m.TradeOffs=c.trade; m.BestFor=c.best; m.AvoidIf=c.avoid;
 m.KnownConcerns=[]; m.InspectionFocus=c.inspect; m.BuyerQuestions=q(c.inspect); m.OwnerActions=owner; m.ModelVariations=c.variations;
 m.ResearchStatus='Reviewed'; m.DataConfidence='Moderate'; m.ReviewedBy='B-Scout Nordic Tug Family Research'; m.LastUpdated=today; m.Revision=(m.Revision||1)+1;
 const unresolved=[...(c.unresolved||[]),'Legacy CommonProblems were not promoted to KnownConcerns without model-specific evidence meeting the approved threshold'];
 if(aliases[m.BoatModelID]) unresolved.unshift(`Legacy duplicate model identity retained for reference compatibility; canonical record is ${canonical}`);
 m.EvidenceSummary={KnowledgeCoverage:'Strong',EvidenceQuality:'Moderate',Statements:evidence(m.BoatModelID,c),UnresolvedInformation:unresolved};
 const existing=(m.ResearchNotes||'').trim();
 const familyNote=aliases[m.BoatModelID]?`Legacy duplicate identity. Pilothouse is the standard Nordic Tug architecture, not a separate model. Canonical record: ${canonical}.`:`Nordic Tug family normalized 2026-08-07 using builder history and model-specific technical references.`;
 m.ResearchNotes=[familyNote,existing].filter(Boolean).join('\n\n');
 changed.push(m.BoatModelID);
}
fs.writeFileSync(file,JSON.stringify(models,null,2)+'\n');
const report={phase:'8C-6',date:today,family:'Nordic Tug',modelsProcessed:changed.length,boatModelIds:changed,canonicalModels:Object.keys(C),legacyDuplicateIds:aliases,majorCorrections:{
 'NDTG-26':['Production interruption documented: original run retired 1997, limited-production revival from 2009','EngineCount set to 1','Flybridge confirmed No on canonical model'],
 'NDTG-32':['Representative early-model dimensions aligned to model-specific listing evidence','EngineCount set to 1'],
 'NDTG-34':['Production normalized to modern 34 era beginning circa 2014','Factory dimensions/capacities confirmed','EngineCount set to 1'],
 'NDTG-37':['Production end corrected to transition before 39 introduction in 2010','Representative LOA/beam/draft and capacities corrected','EngineCount set to 1'],
 'NDTG-39':['Production start corrected to 2010; model replaced by 40 around 2015','Dimensions/capacities corrected','Flybridge treated as optional','EngineCount set to 1'],
 'NDTG-42-PH':['Production start moved to late-1990s evidence; replacement by 44 around 2016','Representative LOA 44 ft 8 in, beam 13 ft 10 in, draft 4 ft 7 in','Flybridge treated as optional','EngineCount set to 1']
},knownConcernsPromoted:0,notes:['Three -PH IDs are legacy duplicate identities rather than distinct Nordic Tug models; retained for reference compatibility and explicitly flagged.','Nordic Tug 40 and 44 are not present as model records in the current database and were not added during normalization.']};
fs.mkdirSync(path.join(root,'developer/reports'),{recursive:true});
fs.writeFileSync(path.join(root,'developer/reports/phase8c6-nordic-tug-normalization.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(root,'developer/reports/PHASE_8C6_NORDIC_TUG_NORMALIZATION.md'),`# Phase 8C-6 — Nordic Tug family normalization\n\nProcessed ${changed.length} Nordic Tug records (${Object.keys(C).length} canonical models plus ${Object.keys(aliases).length} retained legacy duplicate IDs).\n\n- Normalized all approved decision-guidance fields.\n- Corrected production lineage and representative specifications from builder/model references.\n- Set EngineCount = 1 for documented single-diesel models.\n- Documented 26 production interruption/revival, 37→39→40 evolution, and 42→44 replacement.\n- Treated flybridge as optional where supported rather than assuming it on every hull.\n- Promoted no generic legacy CommonProblems to KnownConcerns.\n- Retained NDTG-26-PH, NDTG-32-PH and NDTG-37-PH only for reference compatibility; pilothouse is not a separate model identity.\n- Nordic Tug 40 and 44 are absent from the current database and were not added in this normalization pass.\n`);
console.log('Normalized',changed.length,'Nordic Tug records');
