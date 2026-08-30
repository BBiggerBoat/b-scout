import json, os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
P=os.path.join(ROOT,'boatmodels.json')
REG=os.path.join(ROOT,'data/registry/boat-registry.json')
with open(P,encoding='utf-8') as f:data=json.load(f)
with open(REG,encoding='utf-8') as f:registry=json.load(f)

SOURCES={
'TPMC-32-EA':['https://www.hmy.com/yachting/powerboat-guide/eagle/32-pilothouse-1985-98','https://www.boats.com/power-boats/1989-eagle-pilothouse-9870405/'],
'ENDE-36-TR':['https://www.hmy.com/yachting/powerboat-guide/endeavour/trawlercat-36-1998-2005'],
'ENDE-44':['https://www.hmy.com/yachting/powerboat-guide/endeavour/44-trawlercat-2001-06','https://www.yachtsite.com/brand/endeavour-44-trawlercat/','https://www.yachtworld.co.uk/yacht/2012-endeavour-44-trawlercat-9702901/'],
'SPEN-1330':['https://sailboatdata.com/sailboat/spencer-1330/'],
'SSPT-24':['https://www.stevensmarine.com/NEW-Inventory-2026-Sea-Sport-Boat-XL-2400-Portland-East-18918638','https://www.albernipowermarine.com/product/fiberglass-boats/seaswirl-2901-striper-alaskan-pilothouse'],
'SSPT-24-EX':['https://www.stevensmarine.com/NEW-Inventory-2026-Sea-Sport-Boat-Explorer-2400-Portland-East-18526406','https://www.boats.com/power-boats/2026-sea-sport-explorer-2400-10142346/'],
'SSPT-27':['https://www.boats.com/reviews/modern-classics-gone-fishing-8212-sea-sport-27/'],
'NRDH-40':['https://nordhavn.com/nordhavn-yacht-models/retired-models/n40/','https://nordhavn.com/nordhavn-atw/','https://www.nordhavneurope.com/news/nordhavn-41-launched/']
}

UPDATES={
'TPMC-32-EA':dict(Manufacturer='Transpacific Marine',Model='Eagle 32 Pilothouse',Variant='Pilothouse Trawler',Nickname='Eagle 32 Pilothouse',FirstYear=1985,LastYear=1998,LOA_ft=32.0,LWL_ft=28.0,Beam_ft=11.5,Draft_ft=3.33,Displacement_lb=17000,FuelCapacity=168,WaterCapacity=125,HoldingCapacity=25,Fuel='Diesel',EngineConfiguration='Single diesel inboard; Lehman/Perkins 90 hp or Sabre 135 hp documented',EngineCount=1,Propulsion='Shaft',Flybridge='Optional',AftCabin='No',Berths=4,Cabins=1,Heads=1,Style='Pilothouse Trawler',HullType='Displacement',NormalizedFuel='Diesel',NormalizedPropulsion='Shaft',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Trawler'),
'ENDE-36-TR':dict(Manufacturer='Endeavour',Model='36 TrawlerCat',Variant=None,Nickname='Endeavour 36 TrawlerCat',FirstYear=1998,LastYear=2005,LOA_ft=36.0,LWL_ft=34.5,Beam_ft=15.0,Draft_ft=2.83,AirDraft_ft=14.0,Displacement_lb=16000,FuelCapacity=300,WaterCapacity=90,HoldingCapacity=30,Fuel='Diesel',EngineConfiguration='Twin 100 hp Yanmar diesel inboards',EngineCount=2,Propulsion='Shaft',Flybridge='No',AftCabin='No',Cabins=3,Berths=6,Heads=1,Style='Power Catamaran',HullType='Full-displacement catamaran',NormalizedFuel='Diesel',NormalizedPropulsion='Shaft',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Catamaran',NormalizedStyle='Catamaran'),
'ENDE-44':dict(Manufacturer='Endeavour',Model='44 TrawlerCat',Variant=None,Nickname='Endeavour 44 TrawlerCat',FirstYear=2001,LastYear=2012,LOA_ft=43.42,LWL_ft=41.0,Beam_ft=18.67,Draft_ft=3.0,AirDraft_ft=14.0,Displacement_lb=22800,FuelCapacity=500,WaterCapacity=115,HoldingCapacity=50,Fuel='Diesel',EngineConfiguration='Twin Yanmar diesel inboards; 240 hp common, later 315 hp examples documented',EngineCount=2,Propulsion='Shaft',Flybridge='No',AftCabin='No',Cabins=3,Berths=6,Heads=2,Style='Power Catamaran',HullType='Semi-displacement catamaran',NormalizedFuel='Diesel',NormalizedPropulsion='Shaft',NormalizedHullForm='Semi-Displacement',NormalizedHullConfiguration='Catamaran',NormalizedStyle='Catamaran'),
'SPEN-1330':dict(Manufacturer='Spencer',Model='1330',Variant='Center / Aft Cockpit Sailing Cruiser',Nickname='Spencer 1330',FirstYear=1974,LastYear=None,TotalBuilt=25,Designer='John Brandlmayr',LOA_ft=44.33,LWL_ft=35.0,Beam_ft=13.0,Draft_ft=7.0,Displacement_lb=24000,FuelCapacity=110,WaterCapacity=35,Fuel='Diesel',EngineConfiguration='Single diesel auxiliary; Isuzu C240 original equipment documented',EngineCount=1,Propulsion='Shaft',Flybridge='No',AftCabin='Optional',Style='Sailing Cruiser',HullType='Fin keel with skeg-hung rudder',NormalizedFuel='Diesel',NormalizedPropulsion='Shaft',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Cruiser'),
'SSPT-24':dict(Manufacturer='Sea Sport',ManufacturerID='SEASPORT',Model='XL 2400',Variant=None,Nickname='Sea Sport XL 2400',FirstYear=1999,LastYear=None,LOA_ft=24.0,Beam_ft=8.5,Draft_ft=3.25,Displacement_lb=5000,FuelCapacity=149,WaterCapacity=25,HoldingCapacity=8,Fuel='Gasoline',EngineConfiguration='Single outboard; current boats commonly 300 hp Mercury',EngineCount=1,Propulsion='Outboard',Flybridge='No',AftCabin='No',Cabins=1,Berths=4,Heads=1,Style='Hardtop Cruiser',HullType='Deep-V planing monohull',NormalizedFuel='Gasoline',NormalizedPropulsion='Outboard',NormalizedHullForm='Planing',NormalizedHullConfiguration='Monohull',NormalizedStyle='Pilothouse Cruiser',Active=True),
'SSPT-24-EX':dict(Manufacturer='Sea Sport',ManufacturerID='SEASPORT',Model='Explorer 2400',Variant=None,Nickname='Sea Sport Explorer 2400',FirstYear=1995,LastYear=None,LOA_ft=24.0,Beam_ft=8.5,Draft_ft=3.25,Displacement_lb=5500,FuelCapacity=129,WaterCapacity=25,HoldingCapacity=8,Fuel='Gasoline',EngineConfiguration='Single outboard on current production; older boats include gasoline and diesel sterndrive installations',EngineCount=1,Propulsion='Outboard / historical sterndrive',Flybridge='No',AftCabin='No',Cabins=1,Berths=4,Heads=1,Style='Hardtop Cruiser',HullType='Deep-V planing monohull',NormalizedFuel='Mixed Diesel/Gasoline',NormalizedPropulsion='Outboard',NormalizedHullForm='Planing',NormalizedHullConfiguration='Monohull',NormalizedStyle='Pilothouse Cruiser',Active=True),
'SSPT-27':dict(Manufacturer='Sea Sport',ManufacturerID='SEASPORT',Model='27',Variant='Pilot / Navigator / Seamaster family',Nickname='Sea Sport 27',FirstYear=1985,LastYear=None,LOA_ft=26.5,Beam_ft=8.5,Draft_ft=2.67,Displacement_lb=6350,FuelCapacity=160,WaterCapacity=45,Fuel='Gas/Diesel',EngineConfiguration='Single gasoline or diesel sterndrive typical; equipment varies by version and year',EngineCount=1,Propulsion='Sterndrive',Flybridge='Optional',AftCabin='No',Cabins=1,Berths=4,Heads=1,Style='Pilothouse / Hardtop Cruiser',HullType='Planing monohull',NormalizedFuel='Mixed Diesel/Gasoline',NormalizedPropulsion='Sterndrive',NormalizedHullForm='Planing',NormalizedHullConfiguration='Monohull',NormalizedStyle='Pilothouse Cruiser',Active=False),
'NRDH-40':dict(Manufacturer='Nordhavn',Model='40',Variant=None,Nickname='Nordhavn 40',FirstYear=1998,LastYear=None,LOA_ft=39.75,LWL_ft=35.42,Beam_ft=14.5,Draft_ft=5.17,Displacement_lb=50000,FuelCapacity=920,WaterCapacity=220,HoldingCapacity=68,Fuel='Diesel',EngineConfiguration='Single main diesel with separate auxiliary/wing engine on many boats; later factory spec lists 160 hp John Deere main',EngineCount=1,Propulsion='Shaft',Flybridge='No',AftCabin='No',Cabins=2,Berths=5,Heads=1,Style='Ocean Passagemaker',HullType='Full-displacement monohull',NormalizedFuel='Diesel',NormalizedPropulsion='Shaft',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Passagemaker',Active=False)
}

def suitability(bid):
    if bid in ('ENDE-36-TR','ENDE-44'):
        return {
          'CoupleCruising':{'Assessment':'Good','Summary':'Exceptional living volume and shallow draft suit long-duration couple cruising, with substantial guest capacity.'},
          'SoloHandling':{'Assessment':'Mixed','Summary':'Twin engines aid close-quarters control, but beam and windage increase docking and marina demands.'},
          'InlandWaterways':{'Assessment':'Mixed','Summary':'Shallow draft is valuable, but beam is the principal route, slip and haul-out constraint.'},
          'OffshoreOrExposedWater':{'Assessment':'Mixed','Summary':'The catamaran platform is capable coastal equipment, but loading, bridge-deck clearance and individual condition matter in short steep seas.'}}
    if bid=='SPEN-1330':
        return {
          'CoupleCruising':{'Assessment':'Good','Summary':'Substantial displacement, tankage and accommodation suit traditional sailing-cruiser use.'},
          'SoloHandling':{'Assessment':'Mixed','Summary':'The sailing rig, displacement and 44-foot length demand competent sail handling.'},
          'InlandWaterways':{'Assessment':'Limited','Summary':'Seven-foot draft and mast height are major waterway constraints.'},
          'OffshoreOrExposedWater':{'Assessment':'Good','Summary':'The design is a substantial offshore-oriented sailing cruiser rather than a power trawler.'}}
    if bid.startswith('SSPT-'):
        return {
          'CoupleCruising':{'Assessment':'Mixed','Summary':'Compact overnight accommodation supports short trips, but fishing/work space takes priority over liveaboard volume.'},
          'SoloHandling':{'Assessment':'Good','Summary':'Compact dimensions and protected helm suit short-handed operation when propulsion is appropriately configured.'},
          'InlandWaterways':{'Assessment':'Good','Summary':'Trailerable or near-trailerable beam and moderate draft make these boats practical for regional cruising.'},
          'OffshoreOrExposedWater':{'Assessment':'Good','Summary':'The deep-V Pacific Northwest hull and enclosed helm are designed for exposed coastal conditions, subject to weather and individual setup.'}}
    if bid=='NRDH-40':
        return {
          'CoupleCruising':{'Assessment':'Good','Summary':'The boat was explicitly conceived as a small ocean-crossing passagemaker for a couple and guests.'},
          'SoloHandling':{'Assessment':'Mixed','Summary':'Single-main machinery is simple, but 50,000-pound displacement and passagemaking systems create substantial operational responsibility.'},
          'InlandWaterways':{'Assessment':'Limited','Summary':'Deep draft, high displacement and ocean-oriented systems are excessive for many inland routes.'},
          'OffshoreOrExposedWater':{'Assessment':'Good','Summary':'The model has documented ocean-crossing and circumnavigation capability.'}}
    return {
      'CoupleCruising':{'Assessment':'Good','Summary':'The raised pilothouse, economical single diesel and practical salon suit a cruising couple.'},
      'SoloHandling':{'Assessment':'Good','Summary':'Pilothouse side doors, single-engine simplicity and moderate length support short-handed operation.'},
      'InlandWaterways':{'Assessment':'Good','Summary':'Displacement-speed efficiency and protected running gear suit inland and Great Loop cruising.'},
      'OffshoreOrExposedWater':{'Assessment':'Mixed','Summary':'The design is a capable coastal displacement cruiser, but not documented as an ocean passagemaker.'}}

def editorial(r):
    bid=r['BoatModelID']; name=r.get('Nickname') or f"{r.get('Manufacturer')} {r.get('Model')}"
    if bid=='TPMC-32-EA':
        r['Overview']='The Eagle 32 Pilothouse is a Taiwan-built displacement cruiser built by Transpacific Marine, combining a tug-like raised pilothouse, wide side decks, teak interior and single diesel shaft drive. Model references document a full protective keel, separate shower and economical 7–8 knot operation.'
        r['Strengths']=['Raised pilothouse with excellent visibility and side-door deck access','Full protective keel around the running gear','Economical single-diesel displacement operation','Wide side decks and unusually generous salon for 32 feet']
        r['TradeOffs']=['Forward stateroom is compact','Low-volume production means hull-specific documentation matters','Published tankage varies between surviving examples']
        r['BestFor']=['Couples seeking traditional pilothouse character in a compact boat','Great Loop, Great Lakes and coastal displacement-speed cruising','Owners comfortable maintaining an older Taiwan-built cruiser']
        r['AvoidIf']=['You require high cruising speed','You want broad current factory/dealer support','You prefer a modern low-maintenance interior and exterior']
    elif bid in ('ENDE-36-TR','ENDE-44'):
        size='36' if bid=='ENDE-36-TR' else '44'
        r['Overview']=f'The Endeavour {size} TrawlerCat is a power catamaran designed around shallow draft, broad interior volume and efficient twin-diesel cruising. The {size} uses a protected lower helm rather than a flybridge; its principal ownership trade-off is exceptional beam for its length.'
        r['Strengths']=['Very high living volume for length','Shallow draft','Twin-engine maneuverability','Wide decks and stable at-rest platform']
        r['TradeOffs']=['Exceptional beam restricts marina, lock and haul-out choices','Two propulsion systems increase service count and cost','Bridge-deck motion or pounding can occur in short steep chop depending on speed and loading']
        r['BestFor']=['Couples prioritizing interior space and shallow draft','Bahamas, coastal and Great Loop cruising where beam is acceptable','Owners who value catamaran stability and twin-engine maneuverability']
        r['AvoidIf']=['Your marina, lock or haul-out facility cannot accommodate the beam','You want a narrow traditional monohull','You prefer a single-engine mechanical package']
    elif bid=='SPEN-1330':
        r['Overview']='The Spencer 1330 is a Canadian 44-foot sailing cruiser designed by John Brandlmayr, not a power trawler. It was offered in center- and aft-cockpit forms with sloop or optional ketch rigs, substantial ballast and a single diesel auxiliary.'
        r['Strengths']=['Substantial 24,000-pound displacement','Documented center- and aft-cockpit configurations','Large ballast ratio and offshore-oriented sailing proportions','Single diesel auxiliary with substantial fuel capacity for a sailing yacht']
        r['TradeOffs']=['Seven-foot draft materially limits shallow-water access','Large sailing rig requires ongoing rigging and sail maintenance','Individual cockpit and rig configuration changes accommodation and deck use']
        r['BestFor']=['Experienced sailors seeking a substantial Canadian cruising yacht','Offshore and extended sailing rather than power cruising','Owners comfortable maintaining an older large sailing rig']
        r['AvoidIf']=['You are seeking a power trawler','Your cruising grounds require shallow draft','You do not want standing-rigging and sail-maintenance obligations']
    elif bid=='SSPT-24':
        r['Overview']='The Sea Sport XL 2400 is a 24-foot Pacific Northwest hardtop cruiser/fishing boat with an 8-foot-6-inch beam, deep-V hull, large working cockpit and compact four-berth cabin. Current production uses outboard power while preserving the enclosed all-weather character associated with the long-running Sea Sport line.'
        r['Strengths']=['Trailerable-width 8-foot-6-inch beam','Large working cockpit','Protected all-weather cabin','Four-person sleeping capacity in a compact hull']
        r['TradeOffs']=['Compact head and galley facilities','Planing speeds and outboard power use more fuel than displacement cruisers','Working cockpit takes priority over interior volume']
        r['BestFor']=['Pacific Northwest fishing and cruising','Owners needing a compact all-weather boat','Trailer-oriented regional cruising']
        r['AvoidIf']=['You require full standing accommodations throughout','You want displacement-speed diesel economy','You prioritize interior living space over cockpit space']
    elif bid=='SSPT-24-EX':
        r['Overview']='The Sea Sport Explorer 2400 is the more accommodation-focused 24-foot Sea Sport hardtop, using the same trailerable-width deep-V concept with a longer cabin, enclosed stand-up head and smaller cockpit than the XL 2400. Current production uses outboard power; older Explorer 2400s include diesel and gasoline sterndrive examples.'
        r['Strengths']=['Enclosed stand-up head','Protected all-weather cabin','Four-person sleeping capacity','Trailerable-width deep-V hull']
        r['TradeOffs']=['Smaller cockpit than the XL 2400','Propulsion differs materially by production era','Compact cruiser accommodations remain modest compared with wider boats']
        r['BestFor']=['Couples wanting more cabin comfort than the XL 2400','Pacific Northwest cruising with occasional fishing','Owners needing an all-weather 24-foot cruiser']
        r['AvoidIf']=['Maximum cockpit area is your priority','You want one standardized propulsion configuration across all years','You require trawler-speed fuel economy']
    elif bid=='SSPT-27':
        r['Overview']='The Sea Sport 27 is a long-running Pacific Northwest planing hull introduced in 1985 and offered in Seamaster, Navigator and Pilot deck plans. The shared 26-foot-6-inch hull combines an 8-foot-6-inch beam, enclosed helm options and substantial fishing capability with overnight cruising accommodations.'
        r['Strengths']=['Trailerable-width beam despite 27-foot-class accommodations','Proven deep-V coastal hull','Multiple cabin/deck plans for fishing or cruising priorities','Strong cockpit and protected-helm usability']
        r['TradeOffs']=['Model configuration varies substantially among Seamaster, Navigator and Pilot versions','Gasoline and diesel sterndrive installations create different operating economics','Cabin volume remains constrained by the narrow beam']
        r['BestFor']=['All-weather Pacific Northwest cruising and fishing','Owners balancing trailerable beam with meaningful overnight capability','Buyers who can select the specific 27-foot deck plan that fits their use']
        r['AvoidIf']=['You require a wide liveaboard interior','You want one standardized layout or machinery package','You prefer slow displacement cruising']
    elif bid=='NRDH-40':
        r['Overview']='The Nordhavn 40 is a 39-foot-9-inch full-displacement ocean passagemaker developed by Pacific Asian Enterprises for long-range cruising by a couple. Its 50,000-pound displacement, 920-gallon fuel capacity, protected single-main shaft drive and heavy-duty systems are oriented toward passagemaking rather than marina-focused weekend use.'
        r['Strengths']=['Documented transoceanic and circumnavigation capability','More than 2,400 nautical miles of loaded range at about 7 knots in factory guidance','Heavy full-displacement construction and protected running gear','Systems and pilothouse arrangement designed specifically for long passages']
        r['TradeOffs']=['Very slow cruising speed','High displacement and 5-foot-plus draft complicate haul-out and shallow-water use','Ocean-grade systems increase maintenance, inspection and ownership complexity','Large fuel capacity and passagemaking equipment are unnecessary for many regional cruisers']
        r['BestFor']=['Couples planning serious offshore or transoceanic cruising','Owners prioritizing range, redundancy and seaworthiness over speed','Long-duration remote cruising where self-sufficiency matters']
        r['AvoidIf']=['Your use is primarily short weekend or shallow-water cruising','You require planing speeds','You want low-complexity, low-cost ownership']
    r['Suitability']=suitability(bid)
    r['KnownConcerns']=[]
    focus=['Verify hull, deck, windows and structural condition with a qualified survey','Inspect propulsion, cooling, exhaust, steering and fuel systems and review service history','Confirm actual dimensions, tank capacities and major equipment against the individual hull','Review electrical upgrades and owner modifications for marine-standard installation']
    if bid in ('ENDE-36-TR','ENDE-44'): focus.insert(1,'Inspect bridge-deck, hull cross-structure and evidence of grounding or impact on both hulls')
    if bid=='SPEN-1330': focus=['Inspect hull, deck, keel, rudder and structural bulkheads','Inspect mast, standing rigging, chainplates, sails and running rigging','Verify center- or aft-cockpit configuration and associated accommodation','Inspect diesel auxiliary, shaft, tanks and electrical systems']
    if bid.startswith('SSPT-'): focus=['Inspect hull/deck structure and hardtop/window sealing','Verify exact propulsion installation and service history for the model year','Inspect outboard bracket/transom or sterndrive transom assembly as applicable','Confirm tank capacities, head arrangement and factory/owner modifications']
    if bid=='NRDH-40': focus=['Inspect hull, deck, keel, rudder and structural systems to offshore-survey standards','Review main engine, wing/auxiliary engine if fitted, generator, stabilizers and fuel-transfer systems','Inspect shaft, stuffing box, steering and emergency-steering arrangements','Review electrical, charging, battery and long-range fuel/water systems','Confirm maintenance history for all passagemaking and safety equipment']
    r['InspectionFocus']=focus
    r['BuyerQuestions']=[f'What survey, repair or service history is available for {x[0].lower()+x[1:] if x else x}?' for x in focus]
    r['OwnerActions']=['Keep hull, deck, window and hardware penetrations sealed and documented','Maintain propulsion, steering, cooling, exhaust and fuel systems to component-maker guidance','Document structural, electrical and machinery work for future buyers']
    if bid=='SPEN-1330': r['OwnerActions'].append('Inspect standing rigging, chainplates and sail-handling equipment on an appropriate professional schedule')

for r in data:
    bid=r.get('BoatModelID')
    if bid not in UPDATES: continue
    r.update(UPDATES[bid]); editorial(r)
    srcs=SOURCES[bid]
    variations=[]
    unresolved=['Legacy CommonProblems were not promoted to KnownConcerns without model-specific evidence meeting the approved threshold.']
    if bid=='TPMC-32-EA':
        variations=[{'Name':'Machinery and tankage variation','Description':'Documented examples use 90–135 hp single diesels and published fuel/holding capacities vary between individual hulls.','AffectedYears':'1985–1998','EvidenceRefs':srcs,'Confidence':'High'}]
        unresolved.append('Published fuel and holding capacities differ among surviving boats; factory-guide values are retained as representative.')
    elif bid=='ENDE-36-TR':
        variations=[{'Name':'36 TrawlerCat production','Description':'The documented production model used three staterooms, one head and twin 100 hp Yanmar diesels with no flybridge.','AffectedYears':'1998–2005','EvidenceRefs':srcs,'Confidence':'High'}]
    elif bid=='ENDE-44':
        variations=[{'Name':'Engine-output evolution','Description':'Early references document twin 240 hp Yanmars; later examples document twin 315 hp Yanmars while retaining the same broad TrawlerCat concept.','AffectedYears':'2001–2012','EvidenceRefs':srcs,'Confidence':'Moderate'},{'Name':'Galley arrangement','Description':'Galley-up and galley-down arrangements were offered; galley-down is common in surviving examples.','AffectedYears':'2001–2012','EvidenceRefs':srcs,'Confidence':'High'}]
        unresolved.append('Powerboat Guide describes the principal 2001–06 production period, while later documented hulls extend through 2012; hull-specific equipment should be verified.')
    elif bid=='SPEN-1330':
        variations=[{'Name':'Center and aft cockpit','Description':'The Spencer 1330 was offered in center-cockpit and aft-cockpit forms with somewhat different LOA, displacement and fuel capacity.','AffectedYears':'1974 onward','EvidenceRefs':srcs,'Confidence':'High'},{'Name':'Sloop and ketch rigs','Description':'Sloop and optional ketch rigs were documented.','AffectedYears':'1974 onward','EvidenceRefs':srcs,'Confidence':'High'}]
        unresolved.append('A reliable end-of-production year was not established in this pass.')
    elif bid=='SSPT-24':
        variations=[{'Name':'Modern outboard generation','Description':'Current XL 2400 production is documented with outboard power; older 24-foot Sea Sports may use different propulsion and should not be assumed identical.','AffectedYears':'Current production','EvidenceRefs':srcs,'Confidence':'Moderate'}]
        unresolved.append('Exact original introduction year for the XL 2400 identity remains unresolved; 1999 is supported by surviving model-year examples.')
        unresolved.append('Current dealer literature contains both 149- and 120-gallon fuel references; 149 gallons is retained as the headline specification pending factory clarification.')
    elif bid=='SSPT-24-EX':
        variations=[{'Name':'Historical sterndrive and current outboard production','Description':'Older Explorer 2400s include gasoline and diesel sterndrive installations, while current production is offered with outboard power.','AffectedYears':'1995 onward','EvidenceRefs':srcs,'Confidence':'High'}]
        unresolved.append('Exact original introduction year remains unresolved; surviving 1995 Explorer 2400 examples confirm production by that year.')
        unresolved.append('Current literature lists both 129- and 120-gallon fuel references; 129 gallons is retained as the headline specification pending factory clarification.')
    elif bid=='SSPT-27':
        variations=[{'Name':'Seamaster','Description':'Fishing-oriented deck plan with maximum cockpit area; later examples could be fitted with an optional flybridge.','AffectedYears':'1985 onward','EvidenceRefs':srcs,'Confidence':'High'},{'Name':'Navigator','Description':'Longer-house cruiser layout with enclosed head.','AffectedYears':'1985 onward','EvidenceRefs':srcs,'Confidence':'High'},{'Name':'Pilot','Description':'Raised-pilothouse layout with additional overnight berth capacity.','AffectedYears':'1985 onward','EvidenceRefs':srcs,'Confidence':'High'}]
        unresolved.append('The final production year for the original 27-foot family was not established in this pass.')
    elif bid=='NRDH-40':
        variations=[{'Name':'Nordhavn 40 II','Description':'Beginning around hull 45, production moved to the South Coast yard in China with upgraded fit, finish and hull/deck-joint details while retaining the same underlying design.','AffectedYears':'Later production','EvidenceRefs':[srcs[0]],'Confidence':'High'}]
        unresolved.append('The exact final model year was not established; Nordhavn confirms 69 hulls were built before the Nordhavn 41 became the successor.')
        unresolved.append('Many boats carry a separate auxiliary/wing engine; EngineCount remains 1 because B-Atlas uses the principal propulsion-engine count for this field.')
    r['ModelVariations']=variations
    r['ResearchStatus']='Reviewed'; r['DataConfidence']='Moderate'; r['ReviewedBy']='B-Atlas Phase 8C-17 Specialist / Isolated Models Research'; r['LastUpdated']='2026-08-07'; r['Revision']=max(2,int(r.get('Revision') or 1)+1)
    r['ResearchNotes']='Phase 8C-17 remaining specialist / isolated model normalization 2026-08-07.'
    r['EvidenceSummary']={'KnowledgeCoverage':'Strong','EvidenceQuality':'Moderate','Statements':[{'Scope':'IdentityAndDimensions','AppliesTo':{'Scope':'Model','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':srcs,'EvidenceTypes':['Factory documented' if any(x in u for u in srcs for x in ['nordhavn.com','stevensmarine.com']) else 'Technical or survey source'],'Confidence':'High','Notes':'Identity and representative dimensions checked against model-specific references.'},{'Scope':'OverviewAndSuitability','AppliesTo':{'Scope':'Model','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':srcs,'EvidenceTypes':['Technical or survey source'],'Confidence':'Moderate','Notes':'Buyer guidance is derived from documented configuration, propulsion and intended use.'},{'Scope':'InspectionFocus','AppliesTo':{'Scope':'General age-related guidance','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':srcs,'EvidenceTypes':['Technical or survey source'],'Confidence':'Moderate','Notes':'Inspection items are configuration/age risks, not assertions that every hull has a defect.'}],'UnresolvedInformation':unresolved}

# Sync registry names and status for these records.
by_id={r['BoatModelID']:r for r in data}
for ent in registry:
    bid=ent.get('BoatModelID')
    if bid not in UPDATES: continue
    r=by_id[bid]
    ent['ManufacturerCode']=r.get('ManufacturerID') or ent.get('ManufacturerCode')
    ent['CanonicalName']=r.get('Nickname') or f"{r.get('Manufacturer')} {r.get('Model')}"
    ent['Model']=r.get('Model') or ''
    ent['Variant']=r.get('Variant') or ''
    ent['Active']=bool(r.get('Active'))
    aliases=set(ent.get('Aliases') or [])
    aliases.add(ent['CanonicalName'])
    if bid=='TPMC-32-EA': aliases.update(['Eagle 32','Marine Eagle 32','Transpacific Eagle 32'])
    if bid=='SPEN-1330': aliases.update(['Spencer 1330 Center Cockpit','Spencer 1330 Aft Cockpit'])
    if bid=='SSPT-24': aliases.update(['Sea Sport 2400 XL','SeaSport 2400 XL','Seasport XL 2400'])
    if bid=='SSPT-24-EX': aliases.update(['Sea Sport 2400 Explorer','SeaSport Explorer 2400','Seasport 24 Explorer'])
    if bid=='SSPT-27': aliases.update(['Sea Sport 27 Pilot','Sea Sport 27 Navigator','Sea Sport 27 Seamaster'])
    ent['Aliases']=sorted(a for a in aliases if a)
    ent['Notes']='Phase 8C-17 specialist model identity normalized.'

with open(P,'w',encoding='utf-8') as f: json.dump(data,f,indent=2,ensure_ascii=False); f.write('\n')
with open(REG,'w',encoding='utf-8') as f: json.dump(registry,f,indent=2,ensure_ascii=False); f.write('\n')

report={'phase':'8C-17','date':'2026-08-07','modelsProcessed':list(UPDATES),'reviewed':len(UPDATES),'identityCorrections':{'SPEN-1330':'Reclassified from power trawler to sailing cruiser','SSPT-24':'Normalized to Sea Sport XL 2400','SSPT-24-EX':'Normalized to Sea Sport Explorer 2400','SSPT-27':'Normalized as shared 27 Pilot/Navigator/Seamaster family'},'modelCount':len(data)}
os.makedirs(os.path.join(ROOT,'developer/reports'),exist_ok=True)
with open(os.path.join(ROOT,'developer/reports/phase8c17-specialist-model-normalization.json'),'w',encoding='utf-8') as f: json.dump(report,f,indent=2); f.write('\n')
print(json.dumps(report,indent=2))
