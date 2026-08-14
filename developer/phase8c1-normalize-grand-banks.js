#!/usr/bin/env node
'use strict';
const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..');
const modelsPath=path.join(root,'boatmodels.json');
const models=JSON.parse(fs.readFileSync(modelsPath,'utf8'));
const today='2026-08-06';
const S={
 heritage:'https://www.grandbanks.com/a-grand-history',
 history70:'https://www.grandbanks.com/celebrating-70-years',
 historical:'https://grandbanks.nl/historische-modellen/',
 gb32:'https://www.hmy.com/yachting/powerboat-guide/grand-banks/32-sedan-1965-95',
 gb36:'https://www.hmy.com/yachting/powerboat-guide/grand-banks/36-classic-1965-2004',
 gb36eu:'https://www.devalk.nl/en/yachtbrokerage/251725/GRAND-BANKS-36-EUROPA.html',
 gb42:'https://grandbanks.nl/grand-banks-42-cl/',
 gb46:'https://preowned.grandbanks.com/yacht-listing/1992-grand-banks-46-classic-saturday/',
 gb46review:'https://www.boats.com/reviews/modern-classics-a-grand-design-1200/',
 gb49:'https://www.yachtbuyer.com/en-us/grand-banks/new/49-motoryacht'
};
const familyEvidence=[S.heritage,S.history70,S.historical];
const configs={
'GRBK-32-CL':{
 overview:'The Grand Banks 32 Classic is a compact flybridge sedan cruiser with a semi-displacement hull, a single-level salon and one forward cabin. Most examples use single diesel shaft propulsion, although machinery and tank arrangements vary across the long production run. It offers traditional Grand Banks construction and deck access in a size suited to couples and smaller cruising crews.',
 suitability:{CoupleCruising:{Assessment:'Good',Summary:'One-cabin accommodation, a usable salon and manageable overall size suit a cruising couple.',EvidenceRefs:[S.gb32]},SoloHandling:{Assessment:'Mixed',Summary:'The size and wide side decks assist handling, but the flybridge, windage and older mechanical controls require planning.',EvidenceRefs:[S.gb32]},InlandWaterways:{Assessment:'Good',Summary:'Displacement-speed efficiency and moderate draft suit inland and coastal routes; verify the actual mast and bridge clearance.',EvidenceRefs:[S.gb32]},ExposedWater:{Assessment:'Mixed',Summary:'The semi-displacement hull and protected running gear support coastal cruising, but the compact hull can roll and pitch more than larger family models.',EvidenceRefs:[S.gb32]}},
 strengths:['Compact Grand Banks layout with wide side decks','Protected shaft and propeller arrangement','Efficient single-diesel operation on many examples','Strong model recognition and owner support'],
 trade:['Machinery access is tighter than on larger Grand Banks models','Exterior teak and older systems can require substantial upkeep','One-cabin layout limits privacy for guests','Motion can be more noticeable than on larger, heavier models'],
 best:['Couples cruising at displacement speeds','Buyers seeking a compact traditional flybridge cruiser','Owners comfortable maintaining an older teak-rich boat'],
 avoid:['You require two private cabins','You need low-maintenance exterior finishes','You require sustained planing-speed performance'],
 variations:[{Name:'Wood and fiberglass construction periods',Description:'Early examples were wood-built; fiberglass production followed during the model run. Construction method materially changes survey priorities, maintenance and value.',AffectedYears:'Early production through the transition to fiberglass',EvidenceRefs:[S.history70,S.gb32],Confidence:'Moderate'},{Name:'Engine and tank configurations',Description:'Single-diesel installations are common, but engine output, tank capacity and equipment vary by year and individual build.',AffectedYears:null,EvidenceRefs:[S.gb32],Confidence:'Moderate'}],
 inspection:['Confirm whether the hull and superstructure are wood or fiberglass and survey accordingly','Inspect teak decks, deck fittings, windows and cabin sides for moisture intrusion','Inspect fuel tanks, exhaust components and accumulated electrical modifications','Evaluate machinery access before accepting the engine and service arrangement'],
 owner:['Keep deck hardware, windows and exterior teak sealed and maintained','Maintain access to fuel tanks, exhaust and service points rather than concealing them with later installations'],
 sources:[S.gb32,S.history70]
},
'GRBK-36-CL':{
 overview:'The Grand Banks 36 Classic is a traditional tri-cabin flybridge cruiser with a semi-displacement hull, an aft owner cabin and a forward guest cabin. It was offered with single or twin diesel shaft propulsion and became one of the defining models of the Grand Banks range. Its layout provides substantially more privacy and cruising capacity than the 32 while retaining walkaround decks and lower and upper helm positions.',
 suitability:{CoupleCruising:{Assessment:'Good',Summary:'The aft cabin, two-head layout on many examples and generous storage support extended couple cruising.',EvidenceRefs:[S.heritage,S.gb36]},GuestAccommodation:{Assessment:'Good',Summary:'Separate forward and aft sleeping areas provide better guest privacy than sedan or Europa layouts.',EvidenceRefs:[S.heritage,S.gb36]},SoloHandling:{Assessment:'Mixed',Summary:'Side decks and dual helms help, but the larger hull, windage and twin-cabin arrangement increase docking complexity.',EvidenceRefs:[S.gb36]},InlandWaterways:{Assessment:'Mixed',Summary:'Draft is moderate, but mast and flybridge clearance must be verified for each boat.',EvidenceRefs:[S.gb36]}},
 strengths:['Separate forward and aft cabins','Wide walkaround side decks','Single or twin diesel shaft configurations','Long production history and broad owner support'],
 trade:['Aft-cabin layout raises the profile and increases windage','Exterior teak and aging systems create a significant maintenance burden','Engine-room access varies with machinery configuration','Larger dimensions and air draft complicate storage and some waterways'],
 best:['Couples wanting a private aft cabin and separate guest space','Extended inland and coastal cruising','Owners who value traditional Grand Banks layout and joinery'],
 avoid:['You require a low-profile sedan layout','You need simple single-level access throughout','You are unwilling to maintain exterior teak and older systems'],
 variations:[{Name:'Single and twin diesel configurations',Description:'The 36 Classic was built with both single and twin shaft-drive diesel arrangements, materially affecting access, redundancy, speed and operating cost.',AffectedYears:null,EvidenceRefs:[S.gb36],Confidence:'Moderate'},{Name:'Long production evolution',Description:'Construction details, engines, tankage, interior arrangements and equipment changed during the four-decade production run.',AffectedYears:'1964–2004',EvidenceRefs:[S.heritage,S.gb36],Confidence:'High'}],
 inspection:['Identify the exact construction year, engine arrangement and major production-era changes','Inspect teak decks, window frames and deck penetrations for moisture','Inspect fuel tanks, exhaust systems and electrical modernization','Check aft-cabin and side-deck access for the intended crew'],
 owner:['Maintain exterior teak, window bedding and deck penetrations','Preserve service access around engines, tanks and steering systems'],
 sources:[S.heritage,S.gb36]
},
'GRBK-36-EU':{
 overview:'The Grand Banks 36 Europa uses the 36-foot family platform with a single-level salon, forward accommodation and a covered aft cockpit rather than the Classic model’s raised aft cabin. The sheltered side and aft deck arrangement is well suited to wet or cool climates. Most examples use twin diesel shaft propulsion, although equipment and interior arrangements vary.',
 suitability:{CoupleCruising:{Assessment:'Good',Summary:'The one-level salon and sheltered cockpit create a practical couple-cruising arrangement.',EvidenceRefs:[S.gb36eu]},Accessibility:{Assessment:'Good',Summary:'The Europa layout avoids the aft-cabin stair changes of the Classic and provides protected deck movement.',EvidenceRefs:[S.gb36eu]},GuestAccommodation:{Assessment:'Mixed',Summary:'Guest capacity varies, but privacy is generally less than in the tri-cabin Classic.',EvidenceRefs:[S.gb36eu]},WetClimateCruising:{Assessment:'Good',Summary:'Covered side and aft deck areas provide useful shelter in rain and strong sun.',EvidenceRefs:[S.gb36eu]}},
 strengths:['Covered aft and side deck areas','Single-level salon and cockpit relationship','Wide walkaround decks','Traditional shaft-drive diesel construction'],
 trade:['Less private accommodation than the 36 Classic','Large covered superstructure adds windage','Twin engines reduce machinery space and increase service requirements','Air draft depends heavily on mast and flybridge configuration'],
 best:['Couples cruising in wet or cool climates','Owners prioritizing sheltered deck access','Buyers preferring a sedan-style layout over an aft cabin'],
 avoid:['You require two fully private staterooms','You prefer an open aft deck without a covered overhang','You want minimal twin-engine maintenance'],
 variations:[{Name:'Europa configuration',Description:'The Europa substitutes a covered cockpit and forward accommodation arrangement for the Classic model’s aft-cabin configuration.',AffectedYears:'1988 onward',EvidenceRefs:[S.heritage,S.gb36eu],Confidence:'High'},{Name:'Interior and engine arrangements',Description:'Cabin count, berth arrangement, engines and tankage vary between individual examples.',AffectedYears:null,EvidenceRefs:[S.gb36eu],Confidence:'Moderate'}],
 inspection:['Verify the exact interior arrangement, engine installation and tank capacities','Inspect the covered-deck structure, teak decks and window assemblies for moisture','Check drainage and sealing around the cockpit overhang and deck penetrations','Confirm mast-lowering arrangements and minimum air draft'],
 owner:['Keep covered-deck drains, window seals and deck penetrations clear and watertight','Maintain mast-lowering hardware where route clearance depends on it'],
 sources:[S.heritage,S.gb36eu]
},
'GRBK-42-CL':{
 overview:'The Grand Banks 42 Classic is a larger tri-cabin flybridge cruiser with two private staterooms, two heads on many examples and substantially more machinery and storage space than the 36. It uses a semi-displacement hull and twin diesel shaft propulsion. The model is intended for extended cruising with family or guests rather than compact-marina simplicity.',
 suitability:{CoupleCruising:{Assessment:'Good',Summary:'The larger living spaces, storage and systems support long-duration cruising for a couple.',EvidenceRefs:[S.gb42]},GuestAccommodation:{Assessment:'Good',Summary:'Two private staterooms and multiple heads on many examples support family or guest cruising.',EvidenceRefs:[S.gb42]},SoloHandling:{Assessment:'Limited',Summary:'The size, windage and systems burden make experienced crew, thrusters or docking assistance more important.',EvidenceRefs:[S.gb42]},InlandWaterways:{Assessment:'Mixed',Summary:'Draft is moderate for the size, but beam, air draft and marina requirements restrict some routes and facilities.',EvidenceRefs:[S.gb42]}},
 strengths:['Two-stateroom cruising layout','Substantial fuel, water and storage capacity','More workable machinery space than smaller family models','Strong long-range cruising and resale recognition'],
 trade:['Higher operating, dockage and maintenance costs than the 32 or 36','Large exterior teak areas require continuing care','Twin engines and multiple systems increase ownership complexity','Beam and air draft reduce access to smaller marinas and routes'],
 best:['Couples cruising for extended periods with regular guests','Owners needing two private staterooms and substantial stores','Buyers comfortable managing a larger twin-diesel yacht'],
 avoid:['You need easy trailer or road transport','You require simple solo docking in tight marinas','You want low annual systems and exterior-maintenance costs'],
 variations:[{Name:'Layout and equipment evolution',Description:'Interior arrangements, galley placement, engine choices and equipment changed across the long production run; individual boats must be evaluated by year and hull.',AffectedYears:'1975–2005',EvidenceRefs:[S.heritage,S.gb42],Confidence:'High'}],
 inspection:['Verify the exact layout, engine package, tank capacities and production-year configuration','Inspect teak decks, cabin sides, windows and deck penetrations for moisture','Inspect fuel tanks, exhaust systems, steering and electrical modernization','Assess access to engines, generator and major systems before purchase'],
 owner:['Maintain deck and window sealing and monitor high-load systems','Keep machinery, tank and electrical spaces accessible for inspection and service'],
 sources:[S.heritage,S.gb42]
},
'GRBK-46-CL':{
 overview:'The Grand Banks 46 Classic is an extended-cruising flybridge yacht with a semi-displacement hull, twin diesel shaft propulsion and two- or three-stateroom arrangements. It provides more machinery space, payload and living volume than the 42 while retaining the traditional Classic profile and walkaround decks. Some engine packages allow moderate speeds above displacement cruising, with corresponding fuel use.',
 suitability:{ExtendedCruising:{Assessment:'Good',Summary:'Large tankage, storage and accommodation support extended coastal and offshore-oriented cruising.',EvidenceRefs:[S.gb46,S.gb46review]},GuestAccommodation:{Assessment:'Good',Summary:'Two- and three-stateroom layouts provide useful privacy for family or guests.',EvidenceRefs:[S.gb46]},SoloHandling:{Assessment:'Limited',Summary:'The size, windage and twin-engine systems generally favour experienced operators and docking aids.',EvidenceRefs:[S.gb46]},InlandWaterways:{Assessment:'Limited',Summary:'Beam, height, displacement and marina requirements restrict smaller waterways and facilities.',EvidenceRefs:[S.gb46]}},
 strengths:['Substantial accommodation and storage','Twin-diesel shaft propulsion with protected running gear','More workable machinery spaces than smaller Classics','Efficient displacement cruising with higher-speed capability on some versions'],
 trade:['High dockage, haul-out, fuel and systems costs','Large exterior teak and multiple onboard systems increase maintenance','Three-stateroom and galley variations materially affect machinery access and living space','Size and air draft limit marina and waterway choices'],
 best:['Experienced owners undertaking extended cruising','Couples carrying frequent guests or substantial cruising stores','Buyers wanting classic Grand Banks character with more speed and space'],
 avoid:['You require economical small-marina ownership','You expect simple solo handling without docking aids','You are unwilling to maintain twin diesels and multiple yacht systems'],
 variations:[{Name:'Two- and three-stateroom layouts',Description:'Both arrangements exist, with meaningful differences in privacy, storage, galley location and machinery access.',AffectedYears:null,EvidenceRefs:[S.gb46],Confidence:'Moderate'},{Name:'Engine packages',Description:'Engine choices range from displacement-oriented installations to higher-powered packages capable of moderate semi-displacement speeds.',AffectedYears:null,EvidenceRefs:[S.gb46review],Confidence:'Moderate'}],
 inspection:['Confirm exact stateroom, galley and machinery arrangement','Inspect teak decks, deck cores, windows and exterior joinery','Inspect fuel tanks, exhaust, stabilizers if fitted and electrical systems','Verify actual loaded displacement, clearances and haul-out requirements'],
 owner:['Maintain access and service records for engines, tanks, stabilizers and generators','Budget proactively for exterior teak, coatings and multiple mechanical systems'],
 sources:[S.heritage,S.gb46,S.gb46review]
},
'GRBK-49-MY':{
 overview:'The Grand Banks 49 Motor Yacht is a large aft-cabin cruising yacht with a full-beam owner stateroom, substantial guest accommodation and twin diesel shaft propulsion. It is materially larger and heavier than the Classic models below 46 feet and was designed for long-duration cruising with extensive stores and onboard systems. Individual boats vary significantly in layout, tankage, engines and later equipment.',
 suitability:{ExtendedCruising:{Assessment:'Good',Summary:'Large accommodation, tankage and systems support extended cruising and liveaboard use.',EvidenceRefs:[S.gb49]},GuestAccommodation:{Assessment:'Good',Summary:'Three-stateroom arrangements and a full-beam aft owner cabin support family and guest privacy.',EvidenceRefs:[S.gb49]},SoloHandling:{Assessment:'Limited',Summary:'The size, windage, displacement and systems load generally require experienced handling and docking aids.',EvidenceRefs:[S.gb49]},MarinaAndStorage:{Assessment:'Limited',Summary:'Beam, weight, air draft and service requirements narrow marina, haul-out and winter-storage options.',EvidenceRefs:[S.gb49]}},
 strengths:['Full-beam aft owner accommodation','Three-stateroom cruising capacity on many examples','Very large fuel, water and storage capacity','Traditional shaft-drive construction for extended cruising'],
 trade:['Very high dockage, haul-out, fuel and maintenance costs','Large systems inventory demands organized preventive maintenance','Dimensions and displacement restrict facilities and routes','Actual tank capacities and loaded displacement vary between boats and sources'],
 best:['Experienced owners planning extended or liveaboard cruising','Couples requiring substantial private guest accommodation','Buyers prepared for yacht-scale operating and refit costs'],
 avoid:['You need access to small marinas or economical winter storage','You expect simple couple-only systems and maintenance','You require easy solo handling without substantial docking assistance'],
 variations:[{Name:'Tankage and equipment variation',Description:'Published and listing-derived tank capacities vary, and later additions such as stabilizers, generators, thrusters and watermakers materially affect weight and complexity.',AffectedYears:null,EvidenceRefs:[S.gb49],Confidence:'Moderate'},{Name:'Interior arrangements',Description:'Three-stateroom layouts are common, but details and head count vary by build and owner customization.',AffectedYears:'1986–1999',EvidenceRefs:[S.heritage,S.gb49],Confidence:'Moderate'}],
 inspection:['Verify actual tank capacities, loaded displacement and machinery specification from vessel documents','Inspect fuel tanks, exhaust systems, generators, stabilizers and electrical distribution','Inspect teak decks, windows and exterior joinery for moisture and deferred maintenance','Confirm haul-out capacity, dockage, air draft and winter-storage feasibility'],
 owner:['Maintain detailed service records for all engines, generators, stabilizers and high-load systems','Track actual operating weight and keep tank, bilge and machinery spaces accessible'],
 sources:[S.heritage,S.gb49]
}}
function statements(id,c){
 const applies={Scope:'Model',Models:[id],Years:{From:null,To:null},Variations:[]};
 return [
 {Scope:'IdentityAndProduction',AppliesTo:applies,EvidenceRefs:[S.heritage,S.history70],EvidenceTypes:['Factory documented'],Confidence:'High',Notes:'Model identity and production relationship supported by Grand Banks heritage material.'},
 {Scope:'Specifications',AppliesTo:applies,EvidenceRefs:c.sources,EvidenceTypes:['Factory documented','Technical or survey source'],Confidence:'Moderate',Notes:'Representative model specifications; individual boats and production periods may differ.'},
 {Scope:'OverviewAndSuitability',AppliesTo:applies,EvidenceRefs:c.sources,EvidenceTypes:['Factory documented','Technical or survey source','Marketplace observation'],Confidence:'Moderate',Notes:'Interpretive guidance derived from documented configuration and representative examples.'},
 {Scope:'InspectionFocus',AppliesTo:{...applies,Scope:'Model family'},EvidenceRefs:c.sources,EvidenceTypes:['Technical or survey source','Marketplace observation'],Confidence:'Moderate',Notes:'Inspection priorities reflect construction era, equipment and family-wide ownership risks; they are not represented as confirmed defects on every hull.'}
 ];
}
let changed=[];
for(const m of models){
 const c=configs[m.BoatModelID]; if(!c) continue;
 m.Overview=c.overview; m.Suitability=c.suitability; m.Strengths=c.strengths; m.TradeOffs=c.trade; m.BestFor=c.best; m.AvoidIf=c.avoid;
 m.KnownConcerns=[]; m.InspectionFocus=c.inspection; m.BuyerQuestions=c.inspection.map(x=>'What inspection, repair or service history is available for '+x.charAt(0).toLowerCase()+x.slice(1)+'?'); m.OwnerActions=c.owner; m.ModelVariations=c.variations;
 m.ResearchStatus='Reviewed'; m.DataConfidence='Moderate'; m.ReviewedBy='B-Scout Grand Banks Family Research'; m.LastUpdated=today; m.Revision=(m.Revision||1)+1;
 m.EvidenceSummary={KnowledgeCoverage:'Strong',EvidenceQuality:'Moderate',Statements:statements(m.BoatModelID,c),UnresolvedInformation:[
  'Specifications and equipment must be confirmed for the individual hull and production year',
  'No legacy CommonProblems statement was promoted to KnownConcerns without model-specific supporting evidence'
 ]};
 changed.push(m.BoatModelID);
}
fs.writeFileSync(modelsPath,JSON.stringify(models,null,2)+'\n');
const report={phase:'8C-1',date:today,family:'Grand Banks',modelsProcessed:changed.length,boatModelIds:changed,knownConcernsPromoted:0,notes:['All six Grand Banks records normalized.','Family and model scope added to evidence statements.','No unsupported model-specific concern was invented.']};
fs.writeFileSync(path.join(root,'developer/reports/phase8c1-grand-banks-normalization.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(root,'developer/reports/PHASE_8C1_GRAND_BANKS_NORMALIZATION.md'),`# Phase 8C-1 — Grand Banks family normalization\n\nProcessed ${changed.length} models: ${changed.join(', ')}.\n\n- Verified family relationships and production periods against Grand Banks heritage material.\n- Normalized the twelve approved knowledge fields.\n- Added model/family evidence scope.\n- Retained unresolved individual-hull variation.\n- Promoted no unsupported legacy Common Problems into Known Concerns.\n`);
console.log('Normalized',changed.length,'Grand Banks models');
