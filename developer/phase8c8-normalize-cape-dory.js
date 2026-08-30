#!/usr/bin/env node
'use strict';
const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..');
const modelFile=path.join(root,'boatmodels.json');
const registryFile=path.join(root,'data/registry/boat-registry.json');
const legacyFile=path.join(root,'data/registry/legacy-id-map.json');
const aliasFile=path.join(root,'data/model-search-aliases.json');
const imageAssetFile=path.join(root,'data/imageassets.json');
let models=JSON.parse(fs.readFileSync(modelFile,'utf8'));
let registry=JSON.parse(fs.readFileSync(registryFile,'utf8'));
let legacy=JSON.parse(fs.readFileSync(legacyFile,'utf8'));
let aliases=JSON.parse(fs.readFileSync(aliasFile,'utf8'));
let imageAssets=JSON.parse(fs.readFileSync(imageAssetFile,'utf8'));
const today='2026-08-07';
const S={
 factory28:'https://www.capedory28.info/downloads/1986Brochure.pdf',
 factory91:'https://www.capedory.org/specs/brochures/1991_NewportShipyards_brochure.pdf',
 history:'https://capedory.org/cdinfo.html',
 hmy28fb:'https://www.hmy.com/yachting/powerboat-guide/cape-dory/28-flybridge-cruiser-1985-91',
 hmy28of:'https://www.hmy.com/yachting/powerboat-guide/cape-dory/28-open-fisherman-1985-90',
 hmy30:'https://www.hmy.com/yachting/powerboat-guide/cape-dory/30-flybridge-1990-91',
 hmy33:'https://www.hmy.com/yachting/powerboat-guide/cape-dory/33-flybridge-1988-94',
 hmy36:'https://www.hmy.com/yachting/powerboat-guide/cape-dory/36-flybridge-1988-90',
 hmy40:'https://www.hmy.com/yachting/powerboat-guide/cape-dory/40-explorer-1992-94',
 jd86:'https://www.jdpower.com/boats/1986/cape-dory-yachts',
 jd92:'https://www.jdpower.com/boats/1992/cape-dory-yachts',
 historyBook:'https://capedoryhistory.com/'
};
const familyRef='manufacturerknowledge:CAPEDORY:Cape Dory Powerboat Family';
const q=items=>items.map(x=>'What inspection, repair or service history is available for '+x.charAt(0).toLowerCase()+x.slice(1)+'?');
const owner28=[
 'Keep cabin-window, deck-hardware and rail penetrations sealed and investigate leaks promptly',
 'Service cooling, exhaust, fuel filtration, shaft, cutlass bearing, rudder and steering systems to documented intervals',
 'Inspect cored structures around penetrations during haul-out or survey and document repairs',
 'Maintain exterior teak and hardware bedding according to the individual boat’s finish and use',
 'Document engine, tank, electrical and structural work for future buyers'
];
const ownerLarge=[
 'Keep windows, deck, flybridge and hardware penetrations sealed and investigate water intrusion promptly',
 'Service engines, cooling, exhaust, fuel filtration, shafts, rudders and steering to documented intervals',
 'Inspect tanks, hoses, bonding and underwater hardware during haul-out',
 'Maintain exterior teak and cockpit trim according to the individual boat’s finish and use',
 'Document machinery, electrical, tank and structural work for future buyers'
];
const inspect28=[
 'Confirm exact 28 configuration and model year from HIN and original documentation',
 'Moisture-test cabin sides, deck and cored hull-side areas around penetrations and previous repairs',
 'Inspect cabin windows, windshield frames and deck hardware for leakage history',
 'Inspect engine cooling, exhaust, mounts and tight service-access areas',
 'Inspect shaft, cutlass bearing, rudder, steering and full-keel running-gear protection',
 'Verify actual fuel, water, holding and air-draft figures because published specifications vary by year and configuration'
];
const inspect30=[
 'Confirm original versus repowered engine configuration and document engine-bed or shaft-line changes',
 'Moisture-test balsa-cored hull sides, side decks and cabin/deck penetrations',
 'Inspect windows, lower-helm area and cockpit/deck structures for leakage history',
 'Inspect twin-engine cooling, exhaust, mounts, shafts, cutlass bearings, rudders and steering',
 'Inspect fuel, water and holding tanks, fill/vent hoses and access',
 'Verify flybridge structure, ladder, steering controls and actual bridge clearance'
];
const inspect33=[
 'Confirm hull identity, build year and any Newport Shipyards-era continuation documentation',
 'Inspect deck, cabin and window penetrations for moisture intrusion and previous repairs',
 'Inspect twin-diesel cooling, exhaust, mounts, shafts, cutlass bearings, rudders and steering',
 'Inspect fuel, water and holding systems and verify tank capacities',
 'Test lower and flybridge helm controls and steering',
 'Verify stall-shower plumbing, seacocks and sanitation systems'
];
const inspect36=[
 'Confirm original gasoline or optional diesel engine package and document any repower',
 'Inspect hull/deck penetrations, windows and cockpit structures for moisture intrusion',
 'Inspect twin-engine cooling, exhaust, mounts, shafts, cutlass bearings, rudders and steering',
 'Inspect fuel, water and holding systems and associated hoses',
 'Verify one- versus two-stateroom interior arrangement',
 'Inspect flybridge structure, ladder, controls and actual clearance'
];
const inspect40=[
 'Confirm hull-specific beam, overall length and production year because published and brokerage figures vary',
 'Moisture-test cored hull sides, deck and flybridge penetrations',
 'Inspect twin Caterpillar cooling, exhaust, mounts, shafts, rudders and steering',
 'Inspect fuel and water tanks, manifolds, hoses and engine-room access',
 'Test lower and flybridge controls, generator and owner-added electrical systems',
 'Verify two-stateroom/two-head systems and actual bridge clearance'
];
const C={
 'CPDR-28-FB':{
  years:[1985,1991], spec:{ManufacturerID:'CAPE',Manufacturer:'Cape Dory',Model:'28',Variant:'Flybridge Cruiser',Nickname:'Cape Dory 28 Flybridge Cruiser',ImageURL:'images/cpdr-28-fb.jpg',Designer:'C. J. Jannace',LOA_ft:27.92,Beam_ft:9.92,Draft_ft:2.75,AirDraft_ft:11.17,Displacement_lb:8000,HullType:'Semi-Displacement',HullBehaviour:'Semi-Displacement',NormalizedHullForm:'Semi-Displacement',Style:'Downeast Flybridge Cruiser',NormalizedStyle:'Downeast',Construction:'Fiberglass; solid bottom with cored hull-side structures reported',KeelType:'Full Length',Fuel:'Gasoline or Diesel',NormalizedFuel:null,EngineConfiguration:'Single Inboard',EngineCount:1,Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'Yes',AftCabin:'No',SideDecks:'Wide',FuelCapacity:120,WaterCapacity:71,HoldingCapacity:25,Berths:4,Cabins:1,Heads:1,Shower:false,Configuration:'Flybridge Cruiser'},
  overview:'The Cape Dory 28 Flybridge Cruiser is the upper-helm version of Cape Dory’s 28-foot Downeast powerboat family. It uses the same full-keel semi-displacement hull as the Power Cruiser and Open Fisherman, adding a compact flybridge above the enclosed lower helm and salon. Most surviving examples are single-shaft boats, with both gasoline and diesel power appearing during production; diesel installations are especially common in the used market.',
  strengths:['Protected single-shaft running gear and strong directional stability','Lower and flybridge helms provide weather protection plus elevated visibility','Wide side decks and compact beam support practical couple cruising','Traditional teak interior and strong model recognition among classic Downeast buyers'],
  trade:['Flybridge adds height, windage, ladder access and canvas/structure maintenance','Compact machinery and accommodation spaces remain those of a narrow 28-footer','Published displacement and water-capacity figures vary between factory-era and later technical references','Single-engine propulsion lacks twin-engine redundancy'],
  best:['Couples wanting a compact traditional flybridge cruiser','Great Loop, inland-waterway and protected coastal cruising','Owners who value protected running gear and classic New England styling'],
  avoid:['Flybridge ladder access or bridge clearance is a significant constraint','You need two private cabins or large-family accommodation','You require twin-engine redundancy or sustained high-speed planing performance'],
  inspect:inspect28,
  variations:[{Name:'28 Power family configuration',Description:'Factory literature identifies four 28 power configurations: Fly Bridge Cruiser, Power Cruiser, Open Fisherman and 280 Sport. “Pilothouse” was not a separate factory model designation.',AffectedYears:'1985–1991',EvidenceRefs:[S.factory28,S.history],Confidence:'High'},{Name:'1990 flybridge update',Description:'Technical model guidance reports a reengineered/retooled flybridge around 1990.',AffectedYears:'1990–1991',EvidenceRefs:[S.hmy28fb],Confidence:'Moderate'},{Name:'Power options',Description:'Gasoline and diesel single-inboard installations were offered; used examples are commonly found with Volvo diesel power.',AffectedYears:'Production run',EvidenceRefs:[S.factory28,S.jd86,S.hmy28fb],Confidence:'High'}],
  sources:[S.factory28,S.history,S.hmy28fb,S.jd86,S.factory91], unresolved:['Published displacement varies between approximately 8,000 and 9,500 lb; individual hull documentation controls','Published water capacity varies by year/source; 71 gal is retained as a representative Flybridge figure while later factory literature lists 45 gal','Newport-era continuation after Cape Dory’s Massachusetts operation requires hull-specific verification']
 },
 'CPDR-28-CR':{
  years:[1985,1991], spec:{ManufacturerID:'CAPE',Manufacturer:'Cape Dory',Model:'28',Variant:'Power Cruiser',Nickname:'Cape Dory 28 Power Cruiser',ImageURL:'images/cpdr-28-cr.jpg',Designer:'C. J. Jannace',LOA_ft:27.92,Beam_ft:9.92,Draft_ft:2.92,Displacement_lb:8000,HullType:'Semi-Displacement',HullBehaviour:'Semi-Displacement',NormalizedHullForm:'Semi-Displacement',Style:'Downeast Cruiser',NormalizedStyle:'Downeast',Construction:'Fiberglass',KeelType:'Full Length',Fuel:'Gasoline or Diesel',NormalizedFuel:null,EngineConfiguration:'Single Inboard',EngineCount:1,Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'No',AftCabin:'No',SideDecks:'Wide',FuelCapacity:120,WaterCapacity:45,HoldingCapacity:25,Berths:4,Cabins:1,Heads:1,Shower:false,Configuration:'Enclosed Lower-Helm Cruiser'},
  overview:'The Cape Dory 28 Power Cruiser is the enclosed lower-helm, no-flybridge member of Cape Dory’s 28-foot powerboat family. “Cruiser” is an authentic factory powerboat designation here—not the Cape Dory 28 sailboat—and B-Atlas uses the full name “28 Power Cruiser” to keep the two identities distinct. The boat shares the full-keel semi-displacement hull, protected single shaft and traditional interior of the Flybridge Cruiser while retaining a lower profile.',
  strengths:['Lower profile and reduced windage compared with the Flybridge Cruiser','Protected single-shaft running gear and full-keel tracking','Four-berth cruising interior in a compact Downeast footprint','Lower helm and enclosed salon suit shoulder-season cruising'],
  trade:['No elevated helm or flybridge outdoor seating','Compact engine and storage spaces limit service access and liveaboard capacity','Single-engine propulsion lacks redundancy','Published tank and displacement figures differ among years and sources'],
  best:['Couples wanting the Cape Dory 28 hull without flybridge height','Inland, canal and protected coastal cruising where lower air draft matters','Owners who value traditional interiors and simple single-shaft propulsion'],
  avoid:['You specifically want an upper helm or flybridge seating','You need multiple private cabins or large storage volume','You require twin-engine redundancy or sustained high-speed operation'],
  inspect:inspect28,
  variations:[{Name:'Factory designation',Description:'Cape Dory factory literature calls this configuration the CD/28 Cruiser or 28 Power Cruiser. B-Atlas uses “28 Power Cruiser” to distinguish it from the unrelated Cape Dory 28 sailboat.',AffectedYears:'Production run',EvidenceRefs:[S.factory28,S.factory91],Confidence:'High'},{Name:'Flybridge relationship',Description:'The Flybridge Cruiser is the same core cruising configuration with the factory flybridge added; it remains a separate B-Atlas variant because height, access and use differ materially.',AffectedYears:'Production run',EvidenceRefs:[S.factory28,S.factory91],Confidence:'High'},{Name:'Power options',Description:'Factory and valuation sources document both gasoline and diesel single-inboard options.',AffectedYears:'Production run',EvidenceRefs:[S.factory28,S.jd86],Confidence:'High'}],
  sources:[S.factory28,S.factory91,S.jd86,S.history], unresolved:['Air draft for the no-flybridge Power Cruiser is not assigned until a reliable factory figure is confirmed','Published water and holding capacities vary by year and source','Newport-era continuation requires hull-specific verification']
 },
 'CPDR-28-OF':{
  years:[1985,1990], spec:{ManufacturerID:'CAPE',Manufacturer:'Cape Dory',Model:'28',Variant:'Open Fisherman',Nickname:'Cape Dory 28 Open Fisherman',ImageURL:'images/cpdr-28-of.jpg',Designer:'C. J. Jannace',LOA_ft:27.92,Beam_ft:9.92,Draft_ft:2.75,AirDraft_ft:8,Displacement_lb:7000,HullType:'Semi-Displacement',HullBehaviour:'Semi-Displacement',NormalizedHullForm:'Semi-Displacement',Style:'Downeast Open Cruiser',NormalizedStyle:'Downeast',Construction:'Fiberglass; solid bottom with cored hull-side structures reported',KeelType:'Full Length',Fuel:'Gasoline or Diesel',NormalizedFuel:null,EngineConfiguration:'Single Inboard',EngineCount:1,Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'No',AftCabin:'No',SideDecks:'Wide',FuelCapacity:120,WaterCapacity:31,HoldingCapacity:15,Berths:2,Cabins:1,Heads:1,Shower:true,Configuration:'Open Fisherman'},
  overview:'The Cape Dory 28 Open Fisherman is the open-helm, cockpit-focused version of the 28 powerboat family. It retains the same protected full-keel semi-displacement hull but trades the Cruiser’s enclosed salon and flybridge structure for a large working cockpit and open helm deck. A compact cabin forward still provides V-berths, galley functions and an enclosed head, making it usable for short cruising as well as fishing.',
  strengths:['Large open cockpit relative to the other Cape Dory 28 configurations','Protected shaft, rudder and propeller behind the full keel/skeg','Wide side decks and simple open helm arrangement','Compact overnight accommodation without sacrificing fishing space'],
  trade:['Less weather protection than the enclosed Cruiser variants','Only compact V-berth accommodation for overnight use','Open helm and cockpit increase exposure in cold or wet climates','Single-engine propulsion lacks redundancy'],
  best:['Fishing-focused owners who still want basic overnight accommodations','Day boating and short coastal cruising','Buyers prioritizing cockpit area over enclosed salon space'],
  avoid:['You need an enclosed lower salon/helm for all-weather cruising','You need four-berth family accommodation or private cabins','You want a flybridge or upper helm'],
  inspect:inspect28,
  variations:[{Name:'Open Fisherman / Open Sportsman naming',Description:'Factory-era material uses Open Fisherman and later Open Sportsman terminology for the open cockpit member of the 28 family. B-Atlas retains Open Fisherman as the canonical historic name and keeps Open Sportsman as a search alias.',AffectedYears:'Production and Newport-era literature',EvidenceRefs:[S.factory28,S.factory91,S.hmy28of],Confidence:'High'}],
  sources:[S.factory28,S.factory91,S.hmy28of,S.jd86], unresolved:['Factory and technical references differ between approximately 7,000 and 8,000 lb displacement; 7,000 lb is retained from later factory literature','Later Newport-era Open Sportsman production may extend beyond the 1985–1990 Cape Dory run and requires hull-specific verification']
 },
 'CPDR-30-FB':{
  years:[1990,1991], spec:{ManufacturerID:'CAPE',Manufacturer:'Cape Dory',Model:'30',Variant:'Flybridge',Nickname:'Cape Dory 30 Flybridge',ImageURL:'images/cpdr-30-fb.jpg',Designer:'C. J. Jannace',LOA_ft:30.25,Beam_ft:12,Draft_ft:3,AirDraft_ft:12.25,Displacement_lb:12500,HullType:'Modified-V',HullBehaviour:'Planing / Modified-V',NormalizedHullForm:'Modified-V',Style:'Downeast Flybridge Cruiser',NormalizedStyle:'Downeast',Construction:'Fiberglass; balsa-cored hull sides reported',KeelType:'Full Length',Fuel:'Diesel',NormalizedFuel:'Diesel',EngineConfiguration:'Twin Inboard',EngineCount:2,Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'Yes',AftCabin:'No',SideDecks:'Wide',FuelCapacity:230,WaterCapacity:62,HoldingCapacity:20,Berths:4,Cabins:1,Heads:1,Shower:true,Configuration:'Flybridge Cruiser'},
  overview:'The Cape Dory 30 Flybridge is a compact hard-chine modified-V Downeast cruiser introduced near the end of Cape Dory’s Massachusetts production. Unlike the semi-displacement 28, the 30 was designed for substantially higher cruising speeds while retaining a full-length keel, protected running gear, a traditional teak interior, flybridge and optional lower helm. Twin inboard installations are typical, and surviving boats may have significant repower histories.',
  strengths:['Wide 12-foot beam gives unusually useful interior volume for a 30-footer','Full-length keel protects running gear despite the faster modified-V hull','Flybridge plus optional lower helm provide flexible operation','Good engine-room access for the size'],
  trade:['Twin engines increase service cost and systems complexity','12-foot beam and flybridge height reduce transport and marina flexibility','Balsa-cored hull-side structures require careful moisture inspection around penetrations','Short original production run means fewer comparable boats and model-specific parts sources'],
  best:['Couples wanting classic Cape Dory styling with faster cruise capability','Coastal and Great Lakes cruising where twin-engine performance is useful','Owners comfortable maintaining twin diesels and flybridge systems'],
  avoid:['You specifically want single-diesel simplicity or displacement-speed economy','A 12-foot beam or roughly 12-foot-plus bridge clearance is unacceptable','You need multiple private staterooms'],
  inspect:inspect30,
  variations:[{Name:'Original Cape Dory production',Description:'HMY documents the Cape Dory-branded 30 Flybridge in 1990–1991; the molds later went to Nauset Marine, which continued related semi-custom production.',AffectedYears:'1990–1991 and later mold history',EvidenceRefs:[S.hmy30,S.history],Confidence:'High'},{Name:'Repowers',Description:'Surviving boats may have substantial engine replacements; verify shafting, controls, exhaust, weight and engine-bed work rather than assuming the original installation remains.',AffectedYears:'Used market',EvidenceRefs:[S.hmy30],Confidence:'Moderate'}],
  sources:[S.hmy30,S.history], unresolved:['Original engine-package details vary among surviving boats; hull-specific documentation controls','Some later Nauset-built boats derive from the molds but should not be treated as Cape Dory production automatically']
 },
 'CPDR-33-FB':{
  years:[1988,1994], spec:{ManufacturerID:'CAPE',Manufacturer:'Cape Dory',Model:'33',Variant:'Power Yacht',Nickname:'Cape Dory 33 Power Yacht',ImageURL:'images/cpdr-33-fb.jpg',Designer:'C. J. Jannace',LOA_ft:32.83,Beam_ft:12.17,Draft_ft:2.92,AirDraft_ft:12.67,Displacement_lb:15500,HullType:'Modified-V',HullBehaviour:'Planing / Modified-V',NormalizedHullForm:'Modified-V',Style:'Downeast Flybridge Cruiser',NormalizedStyle:'Downeast',Construction:'Fiberglass',KeelType:'Full Length',Fuel:'Diesel',NormalizedFuel:'Diesel',EngineConfiguration:'Twin Inboard',EngineCount:2,Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'Yes',AftCabin:'No',SideDecks:'Wide',FuelCapacity:260,WaterCapacity:100,HoldingCapacity:40,Berths:4,Cabins:1,Heads:1,Shower:true,Configuration:'Flybridge Power Yacht'},
  overview:'The Cape Dory 33 Power Yacht is a twin-diesel Downeast flybridge cruiser introduced in 1988 as the smaller sister to the 36 Power Yacht. Its modified-V hull, full-length protective keel, lower helm, wide side decks and single private forward stateroom make it a couple-oriented cruising boat rather than an aft-cabin trawler. Period and later sources also call it the 33 Flybridge or 33 Cruiser.',
  strengths:['Twin-diesel performance with full-length keel protection','Excellent lower-helm visibility and useful flybridge station','Wide side decks and sturdy rails support secure movement forward','Large head with separate stall shower is unusual in this size range'],
  trade:['Twin diesels increase service and replacement cost','Single private stateroom limits guest privacy','Flybridge adds clearance, ladder-access and enclosure maintenance','Relatively low production volume limits direct comparables'],
  best:['Cruising couples wanting a traditional twin-diesel flybridge yacht','Great Lakes and coastal cruising with moderate-speed capability','Owners who value lower-helm visibility and protected running gear'],
  avoid:['You require two private staterooms','You want single-engine operating simplicity','Flybridge height or ladder access is a major constraint'],
  inspect:inspect33,
  variations:[{Name:'Power Yacht / Flybridge naming',Description:'Cape Dory historical material identifies the 33 as a Power Yacht, while technical guides commonly use 33 Flybridge and valuation records use 33 Cruiser. B-Atlas uses “33 Power Yacht” with the other terms retained as aliases.',AffectedYears:'1988–1994',EvidenceRefs:[S.historyBook,S.hmy33,S.jd92],Confidence:'High'},{Name:'Builder transition',Description:'Production spans the transition from Cape Dory’s Massachusetts operation to Newport Shipyards ownership; individual HIN and builder documentation should be verified.',AffectedYears:'1991–1994',EvidenceRefs:[S.history,S.jd92],Confidence:'High'}],
  sources:[S.hmy33,S.historyBook,S.history,S.jd92], unresolved:['Builder location and detail changes during the Newport Shipyards period require hull-specific documentation']
 },
 'CPDR-36-TR':{
  years:[1988,1990], spec:{ManufacturerID:'CAPE',Manufacturer:'Cape Dory',Model:'36',Variant:'Power Yacht',Nickname:'Cape Dory 36 Power Yacht',ImageURL:'images/cpdr-36-tr.jpg',Designer:'C. J. Jannace',LOA_ft:35.75,Beam_ft:13.5,Draft_ft:3.5,AirDraft_ft:13,Displacement_lb:18000,HullType:'Modified-V',HullBehaviour:'Planing / Modified-V',NormalizedHullForm:'Modified-V',Style:'Downeast Flybridge Cruiser',NormalizedStyle:'Downeast',Construction:'Fiberglass; solid bottom reported',KeelType:'Full Length',Fuel:'Gasoline or Diesel',NormalizedFuel:null,EngineConfiguration:'Twin Inboard',EngineCount:2,Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'Yes',AftCabin:'No',SideDecks:'Wide',FuelCapacity:350,WaterCapacity:100,HoldingCapacity:25,Berths:4,Cabins:2,Heads:1,Shower:true,Configuration:'Flybridge Power Yacht'},
  overview:'The Cape Dory 36 Power Yacht is a larger twin-engine Downeast flybridge cruiser with a modified-V hull and long protective keel. A two-stateroom layout was standard, with a one-stateroom/dinette arrangement also offered, and gasoline or diesel power packages were available. Despite its traditional appearance, the 36 was designed for substantially faster operation than the displacement trawlers its styling can suggest.',
  strengths:['Two-stateroom option provides more cruising privacy than the smaller Cape Dory powerboats','Twin-engine performance with keel-protected running gear','Wide side decks, lower profile deckhouse and classic teak interior','Gasoline and diesel examples provide different acquisition and operating-cost choices'],
  trade:['Twin-engine machinery and 13-foot-6-inch beam materially increase ownership cost','Gasoline-powered examples have different range, safety and resale considerations than diesels','Flybridge and twin systems add maintenance complexity','Interior volume is moderate relative to modern boats of similar beam'],
  best:['Couples or small families wanting a traditional two-stateroom flybridge cruiser','Coastal and Great Lakes cruising where moderate speed is useful','Buyers comfortable evaluating gasoline-versus-diesel power packages'],
  avoid:['You require single-diesel simplicity or narrow-beam marina compatibility','You want displacement-only operation and minimal mechanical complexity','Flybridge access or roughly 13-foot clearance is unacceptable'],
  inspect:inspect36,
  variations:[{Name:'Interior layouts',Description:'A two-stateroom arrangement was standard, with a single-stateroom layout using a dinette in place of the guest cabin also offered.',AffectedYears:'Production run',EvidenceRefs:[S.hmy36],Confidence:'High'},{Name:'Power packages',Description:'Twin gasoline engines were standard in published guidance, with twin diesel packages offered as an important alternative.',AffectedYears:'Production run',EvidenceRefs:[S.hmy36],Confidence:'High'},{Name:'Later Cape Dory/Newport references',Description:'Valuation sources list later Cape Dory 36 Cruiser examples after the original 1988–1990 HMY production window; verify individual builder and HIN before extending model chronology.',AffectedYears:'1991–1994',EvidenceRefs:[S.jd92,S.history],Confidence:'Moderate'}],
  sources:[S.hmy36,S.history,S.jd92], unresolved:['Later Newport-era 36 examples create a production-year conflict; B-Atlas retains the well-documented 1988–1990 Cape Dory 36 Flybridge range pending hull-by-hull confirmation']
 },
 'CPDR-40-TR':{
  years:[1992,1995], spec:{ManufacturerID:'CAPE',Manufacturer:'Cape Dory',Model:'40',Variant:'Explorer',Nickname:'Cape Dory 40 Explorer',ImageURL:'images/cpdr-40-tr.jpg',Designer:'Clive M. Dent',LOA_ft:40,Beam_ft:13.83,Draft_ft:3.75,AirDraft_ft:13.25,Displacement_lb:25000,HullType:'Modified-V',HullBehaviour:'Planing / Modified-V',NormalizedHullForm:'Modified-V',Style:'Explorer Flybridge Cruiser',NormalizedStyle:'Downeast',Construction:'Fiberglass; cored hull sides reported',KeelType:'Full Length',Fuel:'Diesel',NormalizedFuel:'Diesel',EngineConfiguration:'Twin Inboard',EngineCount:2,Propulsion:'Shaft',NormalizedPropulsion:'Shaft',Flybridge:'Yes',AftCabin:'No',SideDecks:'Wide',FuelCapacity:400,WaterCapacity:170,HoldingCapacity:null,Berths:6,Cabins:2,Heads:2,Shower:true,Configuration:'Flybridge Explorer'},
  overview:'The Cape Dory 40 Explorer is the largest purpose-built cruising power yacht in the documented Cape Dory/Newport Shipyards pleasure-power line. Designed by Clive M. Dent, it combines a modified-V hull and full-length protective keel with twin diesels, lower and flybridge helms, two private staterooms and two heads. The boat can cruise economically at trawler speeds but was also designed for high-teens cruising, so B-Atlas treats it as a fast Downeast/Explorer cruiser rather than a conventional displacement trawler.',
  strengths:['Two-stateroom, two-head cruising arrangement with substantial tankage','Twin-diesel performance across displacement and higher-speed operation','Wide side decks, lower helm and protected running gear','Roomier engine space and systems access than the smaller Cape Dory powerboats'],
  trade:['Twin diesels, generator-class systems and 25,000-pound displacement create yacht-scale maintenance costs','Nearly 14-foot beam and flybridge height restrict marina, storage and transport options','Cored hull-side and deck structures require careful moisture assessment around penetrations','Low production volume limits model-specific comparables and replacement trim sources'],
  best:['Couples or small families wanting a traditional fast cruiser with two private staterooms','Extended coastal and Great Lakes cruising','Owners comfortable with twin-diesel and yacht-scale systems maintenance'],
  avoid:['You need narrow-beam or easily transported dimensions','You want single-diesel simplicity and minimal systems','Your cruising plan requires consistently low bridge clearance'],
  inspect:inspect40,
  variations:[{Name:'Production chronology',Description:'Factory history places hull #1 in 1992; HMY documents 1992–1994 production, while a verified 1995 HIN/listing demonstrates at least one 1995 example. B-Atlas therefore carries 1992–1995 with hull-specific verification.',AffectedYears:'1992–1995',EvidenceRefs:[S.history,S.hmy40],Confidence:'High'},{Name:'Published dimensions',Description:'Factory and technical references support 40 ft model length, 13 ft 10 in beam and 3 ft 9 in draft, while some brokerage records report different overall lengths or beams. Individual HIN documentation controls.',AffectedYears:'Production run',EvidenceRefs:[S.factory91,S.hmy40],Confidence:'High'}],
  sources:[S.factory91,S.hmy40,S.history], unresolved:['Holding-tank capacity is not assigned because reliable sources reviewed do not provide a consistent figure','Some brokerage records report 44 ft overall including appendages; B-Atlas retains the documented 40 ft model length and records the discrepancy as hull-specific']
 }
};
function suitability(id,sources){
 const big=['CPDR-36-TR','CPDR-40-TR'].includes(id), open=id==='CPDR-28-OF';
 return {
  CoupleCruising:{Assessment:'Good',Summary:open?'Basic overnight accommodations suit short trips for two, while cockpit use is the priority.':'Layouts and helm arrangements are well suited to owner-operated cruising by a couple.',EvidenceRefs:sources},
  SoloHandling:{Assessment:big?'Mixed':'Good',Summary:big?'Good visibility and twin propulsion help, but beam, windage and system scale increase docking workload.':'Manageable dimensions and good helm visibility support solo operation; actual docking conditions and equipment still matter.',EvidenceRefs:sources},
  InlandWaterways:{Assessment:id==='CPDR-40-TR'?'Mixed':'Good',Summary:id==='CPDR-40-TR'?'Low-speed operation is practical, but beam and flybridge clearance constrain route choices.':'Moderate draft and protected running gear suit many inland routes; actual air draft must be verified.',EvidenceRefs:sources},
  ExposedWater:{Assessment:'Mixed',Summary:'The protected keel, Downeast hull forms and enclosed helm arrangements support coastal use, but condition, power configuration and weather limits remain decisive.',EvidenceRefs:sources}
 };
}
function evidence(id,c){const applies={Scope:'Model',Models:[id],Years:{From:c.years[0],To:c.years[1]},Variations:[]};return [
 {Scope:'IdentityAndDimensions',AppliesTo:applies,EvidenceRefs:c.sources,EvidenceTypes:['Factory documented','Technical or survey source'],Confidence:'High',Notes:'Identity and representative specifications are supported by factory-era literature and model-specific technical references; documented conflicts remain visible.'},
 {Scope:'OverviewAndSuitability',AppliesTo:applies,EvidenceRefs:c.sources,EvidenceTypes:['Factory documented','Technical or survey source'],Confidence:'Moderate',Notes:'Buyer guidance is derived from documented configuration, dimensions, propulsion and production history rather than sales claims.'},
 {Scope:'InspectionFocus',AppliesTo:{...applies,Scope:'Model family'},EvidenceRefs:[...c.sources,familyRef],EvidenceTypes:['Factory documented','Technical or survey source'],Confidence:'Moderate',Notes:'Inspection guidance combines model construction details with family and age-related risks; it does not assert that every hull has a defect.'}
];}
// Consolidate false/duplicate identities first.
const sourceCruiser=models.find(m=>m.BoatModelID==='CAPD-28-CR') || models.find(m=>m.BoatModelID==='CPDR-28-PH');
if(!sourceCruiser) throw new Error('No Cape Dory 28 Cruiser source record found');
sourceCruiser.BoatModelID='CPDR-28-CR';
models=models.filter(m=>m.BoatModelID!=='CPDR-28-PH' && m.BoatModelID!=='CAPD-30-FB');
// Ensure only one canonical Cruiser after ID change.
const seen=new Set(); models=models.filter(m=>{if(seen.has(m.BoatModelID)) return false; seen.add(m.BoatModelID); return true;});
const changed=[];
for(const m of models){
 const c=C[m.BoatModelID]; if(!c) continue;
 m.FirstYear=c.years[0]; m.LastYear=c.years[1]; Object.assign(m,c.spec);
 m.Overview=c.overview; m.Suitability=suitability(m.BoatModelID,c.sources); m.Strengths=c.strengths; m.TradeOffs=c.trade; m.BestFor=c.best; m.AvoidIf=c.avoid;
 m.KnownConcerns=[]; m.InspectionFocus=c.inspect; m.BuyerQuestions=q(c.inspect); m.OwnerActions=['CPDR-28-FB','CPDR-28-CR','CPDR-28-OF'].includes(m.BoatModelID)?owner28:ownerLarge; m.ModelVariations=c.variations;
 m.ResearchStatus='Reviewed'; m.DataConfidence='Moderate'; m.ReviewedBy='B-Atlas Cape Dory Family Research'; m.LastUpdated=today; m.Revision=(m.Revision||1)+1;
 m.EvidenceSummary={KnowledgeCoverage:'Strong',EvidenceQuality:'Moderate',Statements:evidence(m.BoatModelID,c),UnresolvedInformation:[...c.unresolved,'Legacy CommonProblems were not promoted to KnownConcerns without model-specific evidence meeting the approved threshold']};
 const note='Cape Dory family normalized 2026-08-07. Official factory terminology is used for the 28 powerboat family; “Pilothouse” is not treated as a separate Cape Dory 28 model.';
 m.ResearchNotes=[note,(m.ResearchNotes||'').trim()].filter(Boolean).join('\n\n');
 changed.push(m.BoatModelID);
}
fs.writeFileSync(modelFile,JSON.stringify(models,null,2)+'\n');
// Registry: canonicalize CPDR maker code and preserve removed IDs as aliases.
registry=registry.filter(r=>!['CPDR-28-PH','CAPD-28-CR','CAPD-30-FB'].includes(r.BoatModelID));
const regById=new Map(registry.map(r=>[r.BoatModelID,r]));
const regDefs={
 'CPDR-28-FB':['Cape Dory 28 Flybridge Cruiser','28','Flybridge Cruiser',['CAP-28-FB','Cape Dory 28 Trawler','Cape Dory 28 Flybridge','Cape Dory 28 Fly Bridge Cruiser']],
 'CPDR-28-CR':['Cape Dory 28 Power Cruiser','28','Power Cruiser',['CAPD-28-CR','CPDR-28-PH','CAP-28-PH','Cape Dory 28 Cruiser','Cape Dory 28 Power Cruiser','Cape Dory 28 Pilothouse','Cape Dory 28 Power']],
 'CPDR-28-OF':['Cape Dory 28 Open Fisherman','28','Open Fisherman',['CAP-28-OF','Cape Dory 28 Open Fisherman','Cape Dory 28 Open Sportsman']],
 'CPDR-30-FB':['Cape Dory 30 Flybridge','30','Flybridge',['CAP-30-FB','CAPD-30-FB','Cape Dory 30 Flybridge Trawler','Cape Dory 30 Flybridge']],
 'CPDR-33-FB':['Cape Dory 33 Power Yacht','33','Power Yacht',['CAP-33-FB','Cape Dory 33 Trawler','Cape Dory 33 Flybridge','Cape Dory 33 Cruiser','Cape Dory 33 Poweryacht']],
 'CPDR-36-TR':['Cape Dory 36 Power Yacht','36','Power Yacht',['CD-36-TR','Cape Dory 36 Trawler','Cape Dory 36 Flybridge','Cape Dory 36 Cruiser','Cape Dory 36 Poweryacht']],
 'CPDR-40-TR':['Cape Dory 40 Explorer','40','Explorer',['CD-40-TR','Cape Dory 40 Trawler','Cape Dory 40 Explorer Trawler','Cape Dory 40 Explorer']]
};
for(const [id,d] of Object.entries(regDefs)){
 let r=regById.get(id);
 if(!r){r={BoatModelID:id,IdentityStatus:'ActiveV7',ManufacturerCode:'CPDR',CanonicalName:d[0],Model:d[1],Variant:d[2],Aliases:[],Active:false,RedirectTo:null,Notes:''}; registry.push(r); regById.set(id,r);}
 r.ManufacturerCode='CPDR'; r.CanonicalName=d[0]; r.Model=d[1]; r.Variant=d[2]; r.Aliases=[...new Set(d[3])]; r.IdentityStatus='ActiveV7'; r.RedirectTo=null;
}
fs.writeFileSync(registryFile,JSON.stringify(registry,null,2)+'\n');
// Legacy redirect map.
const redirects={'CAPD-28-CR':'CPDR-28-CR','CPDR-28-PH':'CPDR-28-CR','CAP-28-PH':'CPDR-28-CR','CAPD-30-FB':'CPDR-30-FB'};
for(const item of legacy){if(redirects[item.LegacyBoatModelID]){item.ProposedV7BoatModelID=redirects[item.LegacyBoatModelID];item.CurrentBoatModelID=redirects[item.LegacyBoatModelID];item.RedirectType='Permanent';item.MigrationStatus='Migrated';}}
for(const [oldId,newId] of Object.entries(redirects)) if(!legacy.some(x=>x.LegacyBoatModelID===oldId)) legacy.push({LegacyBoatModelID:oldId,ProposedV7BoatModelID:newId,MigrationStatus:'Migrated',SourceRecordCount:0,CurrentBoatModelID:newId,RedirectType:'Permanent'});
fs.writeFileSync(legacyFile,JSON.stringify(legacy,null,2)+'\n');
// Search aliases: rebuild Cape Dory entries only.
aliases=aliases.filter(a=>!['CPDR-28-PH','CAPD-28-CR','CAPD-30-FB'].includes(a.BoatModelID));
const aliasDefs={
 'CPDR-28-FB':['Cape Dory 28 Flybridge Cruiser',['28','28 Flybridge','28 Flybridge Cruiser','28 Fly Bridge Cruiser','28 Trawler']],
 'CPDR-28-CR':['Cape Dory 28 Power Cruiser',['28','28 Cruiser','28 Power Cruiser','28 Power','28 Pilothouse']],
 'CPDR-28-OF':['Cape Dory 28 Open Fisherman',['28','28 Open Fisherman','28 Open Sportsman']],
 'CPDR-30-FB':['Cape Dory 30 Flybridge',['30','30 Flybridge','30 Flybridge Trawler']],
 'CPDR-33-FB':['Cape Dory 33 Power Yacht',['33','33 Power Yacht','33 Poweryacht','33 Flybridge','33 Cruiser','33 Trawler']],
 'CPDR-36-TR':['Cape Dory 36 Power Yacht',['36','36 Power Yacht','36 Poweryacht','36 Flybridge','36 Cruiser','36 Trawler']],
 'CPDR-40-TR':['Cape Dory 40 Explorer',['40','40 Explorer','40 Explorer Trawler','40 Trawler']]
};
for(const [id,d] of Object.entries(aliasDefs)){
 let a=aliases.find(x=>x.BoatModelID===id); if(!a){a={BoatModelID:id,CanonicalName:d[0],ManufacturerTerms:['Cape Dory'],ModelTerms:d[1],SourceModelTerms:{}};aliases.push(a);} else {a.CanonicalName=d[0];a.ManufacturerTerms=['Cape Dory'];a.ModelTerms=d[1];}
}
fs.writeFileSync(aliasFile,JSON.stringify(aliases,null,2)+'\n');
// Re-purpose the existing no-flybridge image from the false Pilothouse record as the Power Cruiser image.
const oldImg=path.join(root,'images/cpdr-28-ph.jpg'), newImg=path.join(root,'images/cpdr-28-cr.jpg');
if(fs.existsSync(oldImg) && !fs.existsSync(newImg)) fs.renameSync(oldImg,newImg);
imageAssets.assets=imageAssets.assets.filter(a=>!['CPDR-28-PH','CAPD-28-CR','CAPD-30-FB'].includes(a.boatModelId));
let crAsset=imageAssets.assets.find(a=>a.boatModelId==='CPDR-28-CR');
if(!crAsset){crAsset={boatModelId:'CPDR-28-CR',role:'representative',status:fs.existsSync(newImg)?'available':'missing',path:fs.existsSync(newImg)?'images/cpdr-28-cr.jpg':'images/boat-placeholder.svg',requestedPath:'images/cpdr-28-cr.jpg',filename:'cpdr-28-cr.jpg',provenance:{status:'unknown',sourceType:'Unknown',sourceName:'',sourceURL:'',creatorOrOwner:'',permissionBasis:'',dateAcquired:''},publicUseEligible:false};imageAssets.assets.push(crAsset);} else {crAsset.status=fs.existsSync(newImg)?'available':'missing';crAsset.path=fs.existsSync(newImg)?'images/cpdr-28-cr.jpg':'images/boat-placeholder.svg';crAsset.requestedPath='images/cpdr-28-cr.jpg';crAsset.filename='cpdr-28-cr.jpg';}
imageAssets.generatedAt=today;
fs.writeFileSync(imageAssetFile,JSON.stringify(imageAssets,null,2)+'\n');
const report={phase:'8C-8',date:today,family:'Cape Dory',modelsBefore:287,modelsAfter:models.length,canonicalModels:changed,identityConsolidations:[{removed:'CPDR-28-PH',redirectTo:'CPDR-28-CR',reason:'Factory literature does not identify a separate 28 Pilothouse; existing image and configuration correspond to the no-flybridge Cruiser.'},{removed:'CAPD-28-CR',redirectTo:'CPDR-28-CR',reason:'Canonicalized Cape Dory maker code to CPDR and retained the authentic factory Power Cruiser designation.'},{removed:'CAPD-30-FB',redirectTo:'CPDR-30-FB',reason:'Duplicate 30 Flybridge identity under competing maker code.'}],namingDecision:{Flybridge:'Cape Dory 28 Flybridge Cruiser',Cruiser:'Cape Dory 28 Power Cruiser',Open:'Cape Dory 28 Open Fisherman',note:'Factory 1986 literature lists Fly Bridge Cruiser, Cruiser, Open Fisherman and 280 Sport; Pilothouse is not a separate model. “Power Cruiser” disambiguates the powerboat from the Cape Dory 28 sailboat.'},missingDocumentedModels:['Cape Dory 24 Trawler','Cape Dory 28 280 Sport'],knownConcernsPromoted:0};
fs.mkdirSync(path.join(root,'developer/reports'),{recursive:true});
fs.writeFileSync(path.join(root,'developer/reports/phase8c8-cape-dory-normalization.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(root,'developer/reports/PHASE_8C8_CAPE_DORY_NORMALIZATION.md'),`# Phase 8C-8 — Cape Dory family normalization\n\n## 28-foot identity resolution\n\nFactory literature identifies the Cape Dory 28 power family as **Fly Bridge Cruiser, Cruiser, Open Fisherman, and 280 Sport**. There is no separate factory **28 Pilothouse** model. B-Atlas now uses:\n\n- Cape Dory 28 Flybridge Cruiser\n- Cape Dory 28 Power Cruiser\n- Cape Dory 28 Open Fisherman\n\nThe full term **Power Cruiser** distinguishes the powerboat from the unrelated Cape Dory 28 sailboat. CPDR-28-PH and CAPD-28-CR now redirect to CPDR-28-CR. CAPD-30-FB redirects to CPDR-30-FB.\n\n## Family normalization\n\nSeven canonical Cape Dory records were normalized: 28 Flybridge Cruiser, 28 Power Cruiser, 28 Open Fisherman, 30 Flybridge, 33 Power Yacht, 36 Power Yacht, and 40 Explorer. No generic CommonProblems were promoted to KnownConcerns.\n\n## Documented gaps\n\nThe current database does not yet contain the genuine Cape Dory 24 Trawler or 28 280 Sport; these are flagged for later model acquisition rather than added during normalization.\n`);
console.log('Normalized',changed.length,'canonical Cape Dory records; total model count',models.length);
