#!/usr/bin/env node
'use strict';
const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..');
const file=path.join(root,'boatmodels.json');
const aliasFile=path.join(root,'data/model-search-aliases.json');
const models=JSON.parse(fs.readFileSync(file,'utf8'));
const today='2026-08-07';
const S={
 handbook:'https://www.camanopacific.com/documents/Camano31Handbook.pdf',
 owners:'https://www.camanopacific.com/about',
 guide:'https://www.hmy.com/yachting/powerboat-guide/camano/28-31-1990-2007',
 boatus:'https://www.salts.ca/media/documents/boat-dono/camano-28-articles.pdf',
 pmy41:'https://powerandmotoryacht.com/boats/boat-tests/camano-41/',
 soundings41:'https://soundingsonline.com/news/feature-boat-camano/',
 marine41:'https://marinesource.com/boat/camano-41-trawler-2006-fort-myers-100789077-for-sale',
 revival:'https://passagemaker.com/design-restoration-and-refit/revived-the-camano-31-which-now-comes-in-colors/'
};
const familyRef='manufacturerknowledge:CAMANO:Camano Keelform Trawler Family';
const q=items=>items.map(x=>'What inspection, repair or service history is available for '+x.charAt(0).toLowerCase()+x.slice(1)+'?');
const ownerSmall=[
 'Keep window, deck-hardware and flybridge penetrations sealed and investigate leaks promptly',
 'Service raw-water cooling, exhaust, shaft, rudder and hydraulic steering systems to documented intervals',
 'Exercise fuel-tank shutoff/return valves and keep fuel filtration service records',
 'Inspect bonding and sacrificial anodes at haul-out, including shaft-zinc clearance at the keel exit',
 'Document tank, engine, electrical and structural repairs for future buyers'
];
const owner41=[
 'Maintain the single Yanmar installation, cooling, exhaust and fuel-filtration systems to documented intervals',
 'Exercise and service bow thruster, generator and owner-added systems regularly',
 'Keep flybridge, mast, window and deck penetrations sealed and address water intrusion promptly',
 'Inspect shaft, rudder, steering, bonding and underwater hardware at haul-out',
 'Document machinery, tank, electrical and structural work for future buyers'
];
const inspectSmall=[
 'Confirm hull number, marketed model designation and actual Troll/Gnome configuration',
 'Moisture-test windows, deck fittings, cabin-top and flybridge penetrations where applicable',
 'Inspect cored hull-side/deck areas around penetrations and previous repairs',
 'Inspect aluminum fuel tanks, plastic water tanks, fill/vent hoses and shutoff/return valves',
 'Inspect raw-water cooling, exhaust, shaft, cutlass bearing, rudder and hydraulic steering',
 'Check bonding, sacrificial anodes and shaft-zinc clearance near the keel exit'
];
const inspect41=[
 'Confirm the individual 41 specification because published beam, draft and tank figures vary between factory-era and brokerage sources',
 'Inspect windows, deck, flybridge and mast penetrations for moisture intrusion',
 'Inspect the single Yanmar installation, cooling, exhaust, shaft, rudder and steering systems',
 'Inspect aluminum fuel tanks, water/holding systems, manifolds and access',
 'Test bow thruster, generator, charging/inverter systems and owner-added electrical equipment',
 'Verify flybridge, tender/davit and folding-mast condition and actual air draft'
];
const C={
 'CAMA-28-GN':{
   years:[1990,1995],
   spec:{Model:'28/31',Variant:'Gnome',Nickname:'Camano 28/31 Gnome',HullLength_ft:28,LOA_ft:31,LWL_ft:26.25,Beam_ft:10.5,Draft_ft:3.25,Displacement_lb:10000,FuelCapacity:92.4,WaterCapacity:67,HoldingCapacity:14.5,EngineCount:1,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'No',AftCabin:'No',Trailerable:false,Configuration:'Sedan / lower-helm pocket trawler',HullType:'Semi-Displacement',HullBehaviour:'Semi-Displacement',NormalizedHullForm:'Semi-Displacement',NormalizedStyle:'Trawler',Style:'Sedan Trawler'},
   overview:'The Camano 28/31 Gnome is the no-flybridge sistership to the Camano Troll, using the same Bob Warman Keelform hull, 28-foot hull length and roughly 31-foot overall envelope. Its lower profile removes the upper helm and associated ladder, windage and flybridge maintenance while retaining the single-diesel shaft drive, bright deckhouse and couple-oriented interior. The Gnome was discontinued early in the family’s production, making it substantially rarer than the Troll.',
   strengths:['Lower air draft and windage than the Troll','Single-diesel shaft simplicity with protected running gear','Excellent lower-helm visibility and compact couple-cruising footprint','Same efficient Keelform hull and owner-community support as the Troll'],
   trade:['No elevated flybridge helm or upper outdoor seating','Small cockpit and modest storage for extended liveaboard use','Engine and tank access are compact compared with larger trawlers','Published listings sometimes call the same design a 28 or 31, so identity requires year and configuration verification'],
   best:['Couples wanting the Camano hull without flybridge height or maintenance','Great Loop, canal and protected coastal cruising','Owners prioritizing lower-helm operation, efficiency and manageable dimensions'],
   avoid:['You specifically want a flybridge or upper outdoor helm','You need multiple private cabins or large-family accommodation','You require large cockpit or liveaboard storage volume'],
   inspect:inspectSmall,
   variations:[
    {Name:'28/31 designation',Description:'The shared Camano hull is 28 feet on deck and about 31 feet overall with platform and bow gear. B-Atlas therefore uses “28/31 Gnome” to preserve both naming conventions, matching the Troll record.',AffectedYears:'Production run',EvidenceRefs:[S.handbook,S.owners,S.guide],Confidence:'High'},
    {Name:'Gnome configuration',Description:'The Gnome is the same basic Camano hull and interior concept without the Troll flybridge.',AffectedYears:'Early production',EvidenceRefs:[S.handbook,S.owners,S.guide],Confidence:'High'}
   ],
   sources:[S.handbook,S.owners,S.guide,S.boatus],
   unresolved:['HMY identifies Gnome production as 1990–1995, while later marketplace records sometimes label post-1995 no-flybridge boats as Gnomes; factory documentation should control individual-year identity','Exact air draft is not sufficiently documented and remains unknown','Tank capacities vary by hull number and later modifications; early-family representative values are used']
 },
 'CAMA-31-TR':{
   years:[1990,2011],
   spec:{Model:'28/31',Variant:'Troll',Nickname:'Camano 28/31 Troll',HullLength_ft:28,LOA_ft:31,LWL_ft:26.25,Beam_ft:10.5,Draft_ft:3.25,Displacement_lb:10000,FuelCapacity:92.4,WaterCapacity:67,HoldingCapacity:14.5,EngineCount:1,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'Yes',AftCabin:'No',Trailerable:false,Configuration:'Flybridge pocket trawler',HullType:'Semi-Displacement',HullBehaviour:'Semi-Displacement',NormalizedHullForm:'Semi-Displacement',NormalizedStyle:'Trawler',Style:'Flybridge Sedan'},
   overview:'The Camano 28/31 Troll is a compact British Columbia-designed flybridge cruiser built around Bob Warman’s distinctive Keelform semi-displacement hull. The hull measures 28 feet on deck and roughly 31 feet overall, which explains the model’s changing 28, 30 and 31 marketing designations. A single diesel sits low in the keel and drives a protected shaft, while lower and upper helms, a bright deckhouse and one-cabin interior make the boat primarily a couple-oriented inland and coastal cruiser.',
   strengths:['Efficient single-diesel operation across displacement and moderate semi-planing speeds','Protected shaft, large rudder and low engine placement in the Keelform hull','Excellent visibility from both lower and flybridge helms','Compact beam and length with useful cruising accommodation for two'],
   trade:['Small cockpit and modest storage compared with wider cruisers','Steep flybridge ladder and upper-station exposure affect accessibility','One private cabin limits guest privacy','Production changes in engines and tankage require hull-number-specific verification'],
   best:['Couples seeking an economical flybridge pocket trawler','Great Loop, inland-waterway and protected coastal cruising','Owner-operators valuing visibility, simple single-diesel propulsion and manageable dimensions'],
   avoid:['You need two private cabins or large-family accommodation','Flybridge ladder access is unacceptable','You require sustained high-speed cruising or large cockpit space'],
   inspect:inspectSmall,
   variations:[
    {Name:'28 / 30 / 31 marketing names',Description:'The unchanged core hull is 28 feet on deck and about 31 feet overall. It was marketed first as the 28, also appeared as the 30, and later as the 31.',AffectedYears:'Production run',EvidenceRefs:[S.handbook,S.owners,S.revival],Confidence:'High'},
    {Name:'Fuel-capacity change',Description:'The owner handbook records approximately 92.4 gallons through hull 179 and about 130 gallons beginning with hull 180.',AffectedYears:'Hull-number dependent',EvidenceRefs:[S.handbook,S.owners],Confidence:'High'},
    {Name:'Engine evolution',Description:'Early boats used smaller Volvo diesels, followed by 150 hp and then 200 hp Volvo six-cylinder installations; Volvo D4 and later Yanmar 6BY installations appear at the end of the production lineage.',AffectedYears:'Production run',EvidenceRefs:[S.handbook,S.owners],Confidence:'High'},
    {Name:'Builder succession',Description:'Camano Marine production changed ownership in 2007, followed by limited Bracewell and Camano Yachts America production before the original lineage ended; Helmsman later revived the design as a substantially updated separate product.',AffectedYears:'2007–2011 and later revival',EvidenceRefs:[S.handbook,S.owners,S.revival],Confidence:'High'}
   ],
   sources:[S.handbook,S.owners,S.guide,S.boatus,S.revival],
   unresolved:['Sources differ on the exact final year of pre-Helmsman production; documented examples extend through 2011, which B-Atlas uses as the end of the original Camano lineage','Exact air draft depends on mast, antenna and flybridge equipment and is not assigned a universal value','Representative tank capacities shown are early-production values; later hulls have materially larger fuel capacity']
 },
 'CAMA-41':{
   years:[2006,2007],
   spec:{Model:'41',Variant:'Trawler',Nickname:'Camano 41 Trawler',LOA_ft:41,LWL_ft:38.58,Beam_ft:14,Draft_ft:3.75,AirDraft_ft:16,Displacement_lb:28000,FuelCapacity:400,WaterCapacity:170,HoldingCapacity:42,EngineCount:1,EngineConfiguration:'Single inboard diesel',Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'Yes',AftCabin:'No',Trailerable:false,Configuration:'Flybridge pilothouse cruiser',HullType:'Semi-Displacement',HullBehaviour:'Semi-Displacement',NormalizedHullForm:'Semi-Displacement',NormalizedStyle:'Cruiser',Style:'Flybridge Trawler',Cabins:1,Berths:4,Heads:1},
   overview:'The Camano 41 is a rare Canadian-built fast-trawler-style cruiser developed as a much larger interpretation of the company’s Keelform concept. It combines a single high-output Yanmar diesel and straight shaft with lower and flybridge helms, a large one-stateroom interior, split head/shower arrangement and substantial machinery space. Its 14-foot beam, roughly 28,000-pound displacement and extensive onboard systems place it in a different ownership and marina class from the compact Camano 28/31.',
   strengths:['Large one-stateroom interior optimized for a cruising couple','Single-diesel shaft propulsion with unusually good machinery access','Large flybridge, lower helm and excellent all-around visibility','Substantial fuel capacity and useful speed range from displacement to semi-planing operation'],
   trade:['Rare model with limited model-specific inventory and community knowledge','14-foot beam and yacht-scale displacement materially increase marina, haul-out and operating costs','Generator, thruster, inverter and other cruising systems increase maintenance complexity','Single-engine propulsion does not provide twin-engine redundancy'],
   best:['Couples wanting a spacious single-stateroom fast trawler','Extended Great Loop, Great Lakes and coastal cruising','Owners who value machinery access, tankage and a flybridge more than compact dimensions'],
   avoid:['You require a narrow-beam or easily transported boat','You want twin-engine redundancy','You prefer low-complexity ownership or two private staterooms'],
   inspect:inspect41,
   variations:[
    {Name:'Standard and optional Yanmar power',Description:'Contemporary testing lists a 440 hp Yanmar as standard and higher-output Yanmar installations as optional or test-boat configurations.',AffectedYears:'2006–2007',EvidenceRefs:[S.pmy41,S.soundings41],Confidence:'High'},
    {Name:'Published specification differences',Description:'Contemporary editorial sources generally cite 14 ft beam, 3 ft 9 in draft and about 400 gal fuel, while individual brokerage records report values such as 14 ft 5 in, 4 ft 5 in and 385 gal. Individual hull documentation controls.',AffectedYears:'2006–2007',EvidenceRefs:[S.pmy41,S.soundings41,S.marine41],Confidence:'High'}
   ],
   sources:[S.pmy41,S.soundings41,S.marine41],
   unresolved:['Only a small number of original Camano 41s were built; confirm builder and hull-specific configuration','Published water capacity differs between contemporary sources (approximately 170–181 gallons)','Air draft is based on an individual documented example and varies with folding mast, antennas and bridge equipment']
 }
};
function suitability(m,c){return {
 CoupleCruising:{Assessment:'Good',Summary:'The documented layout is explicitly couple-oriented, with occasional guest berths rather than multiple private cabins.',EvidenceRefs:c.sources},
 SoloHandling:{Assessment:m.BoatModelID==='CAMA-41'?'Mixed':'Good',Summary:m.BoatModelID==='CAMA-41'?'Visibility, large rudder and bow thruster help, but the 41’s beam, windage and displacement increase docking workload.':'Compact dimensions, strong visibility and single-shaft propulsion support owner operation; docking conditions and thruster fit still matter.',EvidenceRefs:c.sources},
 InlandWaterways:{Assessment:m.BoatModelID==='CAMA-41'?'Mixed':'Good',Summary:m.BoatModelID==='CAMA-41'?'Efficient low-speed operation suits inland travel, but 14-foot beam and air draft materially constrain route and marina choices.':'The 10 ft 6 in beam, modest draft and efficient low-speed operation suit many inland routes; actual air draft must be verified.',EvidenceRefs:c.sources},
 ExposedWater:{Assessment:'Mixed',Summary:'The Keelform hull, protected running gear and pilothouse support coastal use, but B-Atlas does not treat these models as unrestricted offshore passagemakers; condition, loading and weather limits remain decisive.',EvidenceRefs:c.sources}
};}
function evidence(id,c){const applies={Scope:'Model',Models:[id],Years:{From:c.years[0],To:c.years[1]},Variations:[]};return [
 {Scope:'IdentityAndDimensions',AppliesTo:applies,EvidenceRefs:c.sources,EvidenceTypes:['Factory documented','Technical or survey source','Marketplace observation'],Confidence:'High',Notes:'Model identity and representative specifications are supported by the Camano owner handbook, owner-group documentation and model-specific technical sources. Conflicting hull-specific figures remain explicitly unresolved.'},
 {Scope:'OverviewAndSuitability',AppliesTo:applies,EvidenceRefs:c.sources,EvidenceTypes:['Factory documented','Technical or survey source'],Confidence:'Moderate',Notes:'Buyer guidance is derived from documented configuration, propulsion, dimensions and production history rather than marketplace sales language.'},
 {Scope:'InspectionFocus',AppliesTo:{...applies,Scope:'Model family'},EvidenceRefs:[...c.sources,familyRef],EvidenceTypes:['Factory documented','Technical or survey source'],Confidence:'Moderate',Notes:'Inspection guidance combines model-specific systems with family and age-related maintenance points. It is not an assertion that every hull has these defects.'}
];}
const changed=[];
for(const m of models){
 const c=C[m.BoatModelID]; if(!c) continue;
 m.FirstYear=c.years[0]; m.LastYear=c.years[1]; Object.assign(m,c.spec);
 m.Overview=c.overview; m.Suitability=suitability(m,c); m.Strengths=c.strengths; m.TradeOffs=c.trade; m.BestFor=c.best; m.AvoidIf=c.avoid;
 m.KnownConcerns=[]; m.InspectionFocus=c.inspect; m.BuyerQuestions=q(c.inspect); m.OwnerActions=m.BoatModelID==='CAMA-41'?owner41:ownerSmall; m.ModelVariations=c.variations;
 m.ResearchStatus='Reviewed'; m.DataConfidence='Moderate'; m.ReviewedBy='B-Atlas Camano Family Research'; m.LastUpdated=today; m.Revision=(m.Revision||1)+1;
 m.EvidenceSummary={KnowledgeCoverage:'Strong',EvidenceQuality:'Moderate',Statements:evidence(m.BoatModelID,c),UnresolvedInformation:[...c.unresolved,'Legacy CommonProblems were not promoted to KnownConcerns without model-specific evidence meeting the approved threshold']};
 const note=`Camano family normalized 2026-08-07. Naming convention uses 28/31 for both Troll and Gnome because the shared hull is 28 ft on deck and about 31 ft overall; marketplace listings may use either number.`;
 m.ResearchNotes=[note,(m.ResearchNotes||'').trim()].filter(Boolean).join('\n\n');
 changed.push(m.BoatModelID);
}
fs.writeFileSync(file,JSON.stringify(models,null,2)+'\n');
// Normalize search aliases so both historic length designations remain discoverable.
const aliases=JSON.parse(fs.readFileSync(aliasFile,'utf8'));
for(const r of aliases){
 if(r.BoatModelID==='CAMA-28-GN'){
  r.CanonicalName='Camano 28/31 Gnome';
  r.ModelTerms=['28/31','28/31 Gnome','28 Gnome','31 Gnome','Gnome'];
 }
 if(r.BoatModelID==='CAMA-31-TR'){
  r.CanonicalName='Camano 28/31 Troll';
  r.ModelTerms=['28/31','28/31 Troll','28 Troll','30 Troll','31 Troll','Troll'];
 }
}
fs.writeFileSync(aliasFile,JSON.stringify(aliases,null,2)+'\n');
const report={phase:'8C-7',date:today,family:'Camano',modelsProcessed:changed.length,boatModelIds:changed,namingDecision:{Gnome:'Camano 28/31 Gnome',Troll:'Camano 28/31 Troll',reason:'Both use the same 28 ft hull and approximately 31 ft overall envelope; historic/marketplace naming uses both numbers.'},majorCorrections:{
 'CAMA-28-GN':['Display name normalized from Camano 28 Gnome to Camano 28/31 Gnome','EngineCount set to 1','Representative family tankage aligned to owner handbook','Search aliases include 28 Gnome and 31 Gnome'],
 'CAMA-31-TR':['Production lineage extended through documented 2011 pre-Helmsman example','EngineCount set to 1','Early representative tankage aligned to owner handbook with later hull-number variation documented','Search aliases include 28, 30 and 31 Troll naming'],
 'CAMA-41':['Beam normalized to 14 ft and draft to 3 ft 9 in from contemporary editorial specifications','Fuel normalized to 400 gal and water to 170 gal, with source conflict retained','EngineCount set to 1','One-stateroom couple-cruising layout confirmed']
},knownConcernsPromoted:0};
fs.mkdirSync(path.join(root,'developer/reports'),{recursive:true});
fs.writeFileSync(path.join(root,'developer/reports/phase8c7-camano-normalization.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(root,'developer/reports/PHASE_8C7_CAMANO_NORMALIZATION.md'),`# Phase 8C-7 — Camano family normalization\n\nProcessed ${changed.length} Camano records.\n\n## Naming decision\n\nB-Atlas now uses **Camano 28/31 Gnome** and **Camano 28/31 Troll**. The shared Bob Warman hull is 28 ft on deck and approximately 31 ft overall; historic and marketplace naming uses both dimensions. Search aliases preserve 28, 30 and 31 naming where documented.\n\n- Normalized all approved decision-guidance fields.\n- Added documented model variations and production lineage.\n- Set EngineCount = 1 for all three Camano records.\n- Corrected representative Camano 41 specifications while preserving source conflicts.\n- Promoted no generic legacy CommonProblems to KnownConcerns.\n`);
console.log('Normalized',changed.length,'Camano records');
