import json, os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
P=os.path.join(ROOT,'boatmodels.json')
with open(P,encoding='utf-8') as f: data=json.load(f)
makers={'Nauticat','Fisher','Island Packet','Gozzard','Corbin','Seawind','Shannon','Gemini','PDQ'}
S={
'NAUT-33':('https://sailboatdata.com/sailboat/nauticat-33/',dict(FirstYear=1967,LastYear=1996,LOA_ft=33.17,Beam_ft=10.67,Draft_ft=5.08,Displacement_lb=17250,Flybridge='No',AftCabin='Yes',EngineCount=1,EngineConfiguration='Single diesel inboard',Propulsion='Shaft',HullType='Long-keel monohull',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Motorsailer')),
'NAUT-38':('https://sailboatdata.com/sailboat/nauticat-38/',dict(FirstYear=1975,LastYear=None,LOA_ft=37.5,Beam_ft=11.15,Draft_ft=5.91,Displacement_lb=24199,FuelCapacity=131,WaterCapacity=88,Flybridge='No',AftCabin='Yes',EngineCount=1,EngineConfiguration='Single diesel inboard',Propulsion='Shaft',HullType='Fin keel with skeg-hung rudder',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Motorsailer')),
'NAUT-40':('https://sailboatdata.com/sailboat/nauticat-40/',dict(FirstYear=1984,LastYear=1993,LOA_ft=39.37,Beam_ft=13.12,Draft_ft=5.75,Displacement_lb=30865,FuelCapacity=198,WaterCapacity=198,Flybridge='No',AftCabin='Yes',EngineCount=1,EngineConfiguration='Single diesel inboard',Propulsion='Shaft',HullType='Fin keel with skeg-hung rudder',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Motorsailer')),
'FISH-30-PI':('https://www.sailingtheweb.com/en/sailboat/north%2Bshore%2Bltd/fisher%2B30',dict(Model='30',Variant='Motorsailer',Nickname='Fisher 30 Motorsailer',FirstYear=1977,LastYear=None,LOA_ft=29.99,Beam_ft=9.48,Draft_ft=4.23,Displacement_lb=14555,Flybridge='No',EngineCount=1,EngineConfiguration='Single diesel inboard',Propulsion='Shaft',HullType='Long-keel monohull',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Motorsailer')),
'FISH-34-MS':('https://www.yachtsnet.co.uk/archives/fisher-34/fisher-34.htm',dict(Model='34',Variant='Motorsailer',Nickname='Fisher 34 Motorsailer',FirstYear=1978,LastYear=2010,LOA_ft=34.33,Beam_ft=11.25,Draft_ft=4.92,Displacement_lb=25760,Berths=6,Cabins=2,Flybridge='No',AftCabin='Yes',EngineCount=1,EngineConfiguration='Single diesel inboard, commonly 60–75 hp',Propulsion='Shaft',HullType='Long-keel monohull',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Motorsailer')),
'FISH-37-MS':('https://sailboatdata.com/sailboat/fisher-37-ms/',dict(Model='37',Variant='Motorsailer',Nickname='Fisher 37 Motorsailer',FirstYear=1973,LastYear=None,LOA_ft=42.52,Beam_ft=12.0,Draft_ft=5.25,Displacement_lb=31359,FuelCapacity=120,WaterCapacity=120,Flybridge='No',EngineCount=1,EngineConfiguration='Single diesel inboard, approximately 100 hp on representative boats',Propulsion='Shaft',HullType='Long-keel monohull',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Motorsailer')),
'ISPK-SP':('https://www.cruisingworld.com/sailboats/island-packet-sp-cruiser-new-take-motorsailer/',dict(Model='SP',Variant='Cruiser',Nickname='Island Packet SP Cruiser',FirstYear=2007,LastYear=None,LOA_ft=41.08,Beam_ft=12.75,Draft_ft=3.67,Displacement_lb=21000,FuelCapacity=215,WaterCapacity=130,Flybridge='No',AftCabin='No',EngineCount=1,EngineConfiguration='Single 110 hp Yanmar diesel inboard',Propulsion='Shaft',HullType='Long-keel monohull with shallow draft',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Motorsailer',Cabins=2,Berths=4,Heads=1)),
'GOZZ-40-PI':('https://soundingsonline.com/boats/pilgrim-40/',dict(Manufacturer='Gozzard',Model='Pilgrim 40',Variant='Motor Yacht',Nickname='Gozzard Pilgrim 40',FirstYear=1983,LastYear=1989,LOA_ft=40.0,Beam_ft=14.0,Draft_ft=3.25,Displacement_lb=22000,FuelCapacity=142,WaterCapacity=240,Flybridge='No',AftCabin='No',EngineCount=1,EngineConfiguration='Single approximately 100 hp diesel inboard',Propulsion='Shaft',HullType='Full-displacement full-keel monohull',Style='Canal and coastal motor yacht',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Canal/River Cruiser')),
'CORB-39-PH':('https://canadianboating.ca/boat-reviews/corbin-39-sail-boat-review/',dict(Model='39',Variant='Pilothouse Cutter',Nickname='Corbin 39 Pilothouse Cutter',FirstYear=1979,LastYear=1990,LOA_ft=41.5,Beam_ft=12.08,Draft_ft=5.5,Displacement_lb=22800,Flybridge='No',EngineCount=1,EngineConfiguration='Single diesel inboard; installations vary by owner-completed hull',Propulsion='Shaft or saildrive depending build',HullType='Fin keel with skeg-hung rudder',Style='Pilothouse sailing cruiser',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Monohull',NormalizedStyle='Motorsailer')),
'GEMI-105-MC':('https://sailboatdata.com/sailboat/gemini-105mc/',dict(Model='105Mc',Variant=None,Nickname='Gemini 105Mc',FirstYear=2003,LastYear=2011,LOA_ft=33.5,Beam_ft=14.0,Draft_ft=1.5,Displacement_lb=8000,FuelCapacity=36,WaterCapacity=60,Flybridge='No',AftCabin='No',EngineCount=1,EngineConfiguration='Single 27 hp diesel auxiliary',Propulsion='Auxiliary drive',HullType='Sailing catamaran with retractable centerboards',Style='Sailing Catamaran',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Catamaran',NormalizedStyle='Catamaran',Cabins=3,Berths=6,Heads=1)),
'GEMI-L35-EG':('https://sailboatdata.com/sailboat/gemini-legacy-35/',dict(Model='Legacy 35',Variant=None,Nickname='Gemini Legacy 35',FirstYear=2013,LastYear=None,LOA_ft=35.33,Beam_ft=14.0,Draft_ft=2.83,Displacement_lb=9800,FuelCapacity=56,WaterCapacity=60,Flybridge='No',AftCabin='No',EngineCount=2,EngineConfiguration='Twin 15 hp diesel auxiliaries',Propulsion='Saildrive',HullType='Sailing catamaran with twin keels',Style='Sailing Catamaran',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Catamaran',NormalizedStyle='Catamaran',Cabins=3,Berths=6,Heads=1)),
'PDQB-34-PA':('https://www.boats.com/power-boats/2006-pdq-powercat-10140662/',dict(Model='34',Variant='PowerCat / Passagemaker',Nickname='PDQ 34 PowerCat',FirstYear=2001,LastYear=2007,LOA_ft=34.0,Beam_ft=16.83,Draft_ft=2.33,Displacement_lb=15000,FuelCapacity=184,WaterCapacity=80,HoldingCapacity=35,Flybridge='Yes',AftCabin='No',EngineCount=2,EngineConfiguration='Twin diesel inboards; 75 hp Yanmars typical, later repowers vary',Propulsion='Shaft',HullType='Power catamaran',Style='Power Catamaran',NormalizedHullForm='Semi-Displacement',NormalizedHullConfiguration='Catamaran',NormalizedStyle='Catamaran',Cabins=2,Heads=1)),
'PDQB-36-SC':('https://sailboatdata.com/sailboat/pdq-36/',dict(Model='36',Variant='Sailing Catamaran',Nickname='PDQ 36',FirstYear=1991,LastYear=2003,LOA_ft=36.42,Beam_ft=18.25,Draft_ft=2.82,Displacement_lb=8000,Flybridge='No',AftCabin='No',EngineCount=None,EngineConfiguration='Outboards on standard boats; twin 18 or 27 hp diesel saildrives on LRC versions',Propulsion='Outboard or saildrive depending version',HullType='Sailing catamaran with twin centerboards',Style='Sailing Catamaran',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Catamaran',NormalizedStyle='Catamaran')),
'SWND-1160':('https://www.seawindcats.com/seawind-1160XL/',dict(Model='1160',Variant='Cruising Catamaran lineage',Nickname='Seawind 1160',FirstYear=2004,LastYear=None,LOA_ft=38.06,Beam_ft=21.33,Draft_ft=3.61,Displacement_lb=15432,Flybridge='No',AftCabin='No',EngineCount=2,EngineConfiguration='Twin auxiliary engines; installations vary by 1160 version',Propulsion='Saildrive or outboard depending version',HullType='Sailing catamaran',Style='Sailing Catamaran',NormalizedHullForm='Displacement',NormalizedHullConfiguration='Catamaran',NormalizedStyle='Catamaran',Cabins=3,Berths=6,Heads=2)),
}

def suit(r):
    style=r.get('NormalizedStyle')
    if style=='Motorsailer':
        return {
          'CoupleCruising':{'Assessment':'Good','Summary':'Protected steering and substantial accommodation suit cruising couples who value shelter and range over sailing performance.'},
          'SoloHandling':{'Assessment':'Mixed','Summary':'Inside steering and diesel power help, but rig handling and windage still require sailing competence.'},
          'InlandWaterways':{'Assessment':'Mixed','Summary':'Diesel economy can suit waterways, but mast height, draft and rig lowering requirements must be checked.'},
          'OffshoreOrExposedWater':{'Assessment':'Good','Summary':'The design is intended for exposed-water cruising, subject to the condition of rig, structure and machinery.'}}
    if r.get('NormalizedHullConfiguration')=='Catamaran':
        return {
          'CoupleCruising':{'Assessment':'Good','Summary':'Wide beam provides strong living space for cruising relative to length.'},
          'SoloHandling':{'Assessment':'Mixed','Summary':'Handling can be manageable, but sailing systems or twin propulsion add operational complexity.'},
          'InlandWaterways':{'Assessment':'Mixed','Summary':'Shallow draft helps, while beam can materially restrict slips, locks and haul-out options.'},
          'OffshoreOrExposedWater':{'Assessment':'Mixed','Summary':'Capability depends strongly on whether the model is a sailing catamaran or power catamaran and on individual loading and condition.'}}
    return {
      'CoupleCruising':{'Assessment':'Good','Summary':'The protected cruiser layout is oriented toward economical couple cruising.'},
      'SoloHandling':{'Assessment':'Good','Summary':'Single-diesel operation and protected helm arrangement support manageable handling.'},
      'InlandWaterways':{'Assessment':'Good','Summary':'Displacement-speed operation and modest draft suit canal and inland cruising.'},
      'OffshoreOrExposedWater':{'Assessment':'Limited','Summary':'The design priority is sheltered and coastal cruising rather than offshore passagemaking.'}}

def editorial(r):
    n=r.get('Nickname') or f"{r['Manufacturer']} {r['Model']}"
    if r['BoatModelID']=='GOZZ-40-PI':
        r['Overview']='The Gozzard Pilgrim 40 is a Canadian full-displacement motor yacht designed by H. Ted Gozzard for slow canal, ICW and coastal cruising. Its raised pilothouse, full keel, single diesel and unusually generous water capacity emphasize protected sightseeing and liveaboard comfort rather than speed.'
        r['Strengths']=['Full-displacement efficiency at modest cruising speeds','Protected pilothouse and wide side decks','Full keel protects propeller and rudder','Large water capacity for extended cruising']
        r['TradeOffs']=['Slow cruising speed is fundamental to the design','Large 14-foot beam limits some marina and transport options','Small production run means model-specific parts and documentation can require owner-network research']
        r['BestFor']=['Couples cruising canals, rivers, Great Lakes and the ICW','Owners who value traditional styling and protected steering','Slow-cruising buyers prioritizing comfort over speed']
        r['AvoidIf']=['You require planing speeds','You need a narrow-beam berth or road transport','You want a modern open-plan express layout']
    elif r.get('NormalizedStyle')=='Motorsailer':
        r['Overview']=f"The {n} is a sail-derived cruising design that combines an enclosed pilothouse or inside steering position with diesel auxiliary power and a working sailing rig. It prioritizes shelter, range and all-weather cruising over the sailing performance of a lighter conventional yacht."
        r['Strengths']=['Protected steering position','Diesel propulsion provides dependable progress when wind is unsuitable','Sailing rig adds range and propulsion redundancy','Cruising accommodation is substantial for the hull length']
        r['TradeOffs']=['Rig, engine and steering systems create more systems to inspect and maintain','Higher windage and heavier displacement reduce sailing performance relative to conventional sailboats','Mast height and draft can constrain inland-waterway use']
        r['BestFor']=['Cruisers who want sail and diesel propulsion in one boat','Cold-weather or shoulder-season cruising','Owners comfortable maintaining both sailing and powerboat systems']
        r['AvoidIf']=['You want performance-oriented sailing','You want the simplicity of a mast-free powerboat','Your route requires low fixed-air-draft clearance']
    elif r.get('NormalizedHullConfiguration')=='Catamaran':
        power='Power' in (r.get('Style') or '') or r['BoatModelID']=='PDQB-34-PA'
        if power:
            r['Overview']=f"The {n} is a twin-hull power cruiser using shallow draft and twin diesel propulsion to provide efficient coastal cruising with unusually broad accommodation for its length."
            r['Strengths']=['Shallow draft','Twin-engine maneuverability','High interior volume for length','Efficient cruising compared with many similarly spacious planing monohulls']
            r['TradeOffs']=['Wide beam restricts marina, haul-out and lock options','Twin propulsion doubles many routine machinery-service items','Bridge-deck and hull loading deserve catamaran-specific survey attention']
            r['BestFor']=['Couples seeking shallow-draft coastal cruising','Great Loop and Bahamas-style cruising where beam is acceptable','Owners prioritizing living space and efficiency']
            r['AvoidIf']=['Your slip, lock or haul-out facility cannot accommodate the beam','You want a narrow monohull','You prefer a single-engine mechanical package']
        else:
            r['Overview']=f"The {n} is a cruising sailing catamaran combining shallow draft, broad living space and auxiliary propulsion with a full sailing rig. Its wide beam and multihull operating characteristics are more consequential to ownership than its nominal length alone."
            r['Strengths']=['Shallow draft','Large living area for length','Level sailing and strong at-anchor space','Sailing propulsion reduces dependence on fuel']
            r['TradeOffs']=['Wide beam restricts slips, locks and haul-out choices','Rigging and multihull structure require sailboat-specific inspection','Performance and payload sensitivity vary substantially by version and loading']
            r['BestFor']=['Cruisers who prioritize space and shallow draft','Sailing couples comfortable with catamaran handling','Warm-climate coastal and offshore cruising where beam is manageable']
            r['AvoidIf']=['You need conventional-width marina slips','You do not want to maintain a sailing rig','Your route has restrictive lock or haul-out width']
    r['Suitability']=suit(r)
    r['KnownConcerns']=[]
    base=['Verify hull, deck and structural moisture or damage appropriate to the construction method','Inspect propulsion machinery, cooling, exhaust, shaft or saildrive installations and service history','Review steering systems, through-hulls, electrical systems and tankage','Confirm actual dimensions, tank capacities and equipment against the individual hull']
    if r.get('NormalizedStyle')=='Motorsailer' or 'Sailing' in (r.get('Style') or ''):
        base.insert(1,'Inspect mast, standing rigging, chainplates, deck penetrations, sails and running rigging')
    if r.get('NormalizedHullConfiguration')=='Catamaran':
        base.insert(1,'Inspect cross-structure, bridge deck, hull-to-deck joints and evidence of grounding or overload')
    r['InspectionFocus']=base
    r['BuyerQuestions']=['What survey and repair history is available for the hull, deck and primary structure?','When were the engine, propulsion system and major cooling or exhaust components last serviced?','What rigging, mast, chainplate and sail work has been completed?' if (r.get('NormalizedStyle')=='Motorsailer' or 'Sailing' in (r.get('Style') or '')) else 'What steering, tank and electrical upgrades have been completed?','Are the listed dimensions, capacities and machinery original to this hull or owner-modified?']
    r['OwnerActions']=['Keep structural and deck penetrations sealed and documented','Maintain propulsion, steering and electrical systems to manufacturer or component-maker guidance']
    if r.get('NormalizedStyle')=='Motorsailer' or 'Sailing' in (r.get('Style') or ''): r['OwnerActions'].append('Inspect standing rigging, chainplates and sail-handling systems on an appropriate professional schedule')

for r in data:
    if r.get('Manufacturer') not in makers: continue
    bid=r['BoatModelID']
    src,c=S.get(bid,(None,{})); r.update(c)
    strong=src is not None
    # Shannon remains conservative because exact SRD documentation is weak in this pass.
    if bid=='SHAN-26-SR':
        r.update(dict(Model='26',Variant='SRD / Reverse Deadrise',Nickname='Shannon 26 SRD',Flybridge='No',AftCabin='No',EngineCount=1,NormalizedStyle='Downeast'))
        src=None; strong=False
    editorial(r)
    # documented model variations
    if bid=='FISH-34-MS':
        r['ModelVariations']=[{'Name':'Mk I / Mk II / Mk III','Description':'Long production run included Mk II changes from 1988 and a roomier Mk III sloop from 1989; ketch and sloop rigs were both offered.','AffectedYears':'1978–2010','EvidenceRefs':[src],'Confidence':'Moderate'}]
    elif bid=='CORB-39-PH':
        r['ModelVariations']=[{'Name':'Early and post-1982 deck forms','Description':'After a 1982 factory fire, the aft-cockpit deck was redesigned with a larger cockpit and higher pilothouse; a pilothouse was also added to the center-cockpit version.','AffectedYears':'1979–1990','EvidenceRefs':[src],'Confidence':'High'},{'Name':'Owner-completed interiors','Description':'Most Corbin 39s were sold at partial-completion stages, so interiors and machinery installations can vary substantially.','AffectedYears':'1979–1990','EvidenceRefs':[src],'Confidence':'High'}]
    elif bid=='GEMI-105-MC':
        r['ModelVariations']=[{'Name':'105Mc development','Description':'The 105Mc is a development of the earlier 105M with interior and cockpit-enclosure updates.','AffectedYears':'2003–2011','EvidenceRefs':[src],'Confidence':'High'}]
    elif bid=='PDQB-36-SC':
        r['ModelVariations']=[{'Name':'Mk II Classic and LRC','Description':'From 1994 the Mk II LRC used twin diesel saildrives and increased tankage, while other versions used outboard auxiliaries.','AffectedYears':'1994–2003','EvidenceRefs':[src],'Confidence':'High'}]
    elif bid=='SWND-1160':
        r['ModelVariations']=[{'Name':'1160 lineage','Description':'The original 1160 evolved through 1160 Lite and later 1160 Resort/1160XL derivatives; these should not be assumed to share identical weight, propulsion or accommodation specifications.','AffectedYears':'2004 onward','EvidenceRefs':['https://www.seawindcats.com/seawind-1160XL/'],'Confidence':'Moderate'}]
    elif bid=='GOZZ-40-PI':
        r['ModelVariations']=[{'Name':'Pilgrim 40 production','Description':'Approximately 41 examples were built by North Castle Marine in Goderich, Ontario during the 1980s.','AffectedYears':'1983–1989','EvidenceRefs':['https://pilgrim-trawlers.wikidot.com/history'],'Confidence':'Moderate'}]
    else:
        r['ModelVariations']=r.get('ModelVariations') or []
    unresolved=['Legacy CommonProblems were not promoted to KnownConcerns without model-specific evidence meeting the approved threshold.']
    if bid=='FISH-37-MS': unresolved.append('Published LOA includes the substantial bowsprit; verify berth and storage length on the individual boat.')
    if bid=='NAUT-38': unresolved.append('A reliable model-wide end-of-production year was not established in this pass.')
    if bid=='FISH-30-PI': unresolved.append('Model-wide end-of-production year and late-production specification changes remain unresolved.')
    if bid=='ISPK-SP': unresolved.append('The production end year remains unresolved; surviving examples and period reviews confirm the model but not a current-production status.')
    if bid=='SWND-1160': unresolved.append('The 1160 name has evolved into multiple derivatives; individual version must be confirmed before applying exact propulsion and tankage.')
    if bid=='SHAN-26-SR': unresolved.append('The Shannon 26 SRD identity is retained, but model-wide technical specifications require stronger primary documentation before Reviewed status.')
    r['ResearchStatus']='Reviewed' if strong else 'Initial'
    r['DataConfidence']='Moderate' if strong else 'Low'
    r['ReviewedBy']='B-Scout Phase 8C-16 Sail-Derived / Crossover Research'
    r['LastUpdated']='2026-08-07'; r['Revision']=max(2,int(r.get('Revision') or 1)+1)
    r['EvidenceSummary']={'KnowledgeCoverage':'Strong' if strong else 'Partial','EvidenceQuality':'Moderate' if strong else 'Low','Statements':[{'Scope':'IdentityAndDimensions','AppliesTo':{'Scope':'Model','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':[src] if src else [],'EvidenceTypes':['Factory documented' if 'seawindcats.com' in (src or '') else 'Technical or survey source'] if src else ['Unverified'],'Confidence':'High' if src else 'Low','Notes':'Identity and representative dimensions checked against model-specific reference material.'},{'Scope':'OverviewAndSuitability','AppliesTo':{'Scope':'Model','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':[src] if src else [],'EvidenceTypes':['Technical or survey source'] if src else ['Unverified'],'Confidence':'Moderate' if src else 'Low','Notes':'Buyer guidance derives from documented hull, rig, propulsion and accommodation characteristics.'},{'Scope':'InspectionFocus','AppliesTo':{'Scope':'General age-related guidance','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':[src] if src else [],'EvidenceTypes':['Technical or survey source'] if src else ['Unverified'],'Confidence':'Moderate' if src else 'Low','Notes':'Inspection guidance is configuration/age based and is not a model-wide defect claim.'}],'UnresolvedInformation':unresolved}
    r['ResearchNotes']='Phase 8C-16 sail-derived motorsailer and crossover normalization 2026-08-07.'

with open(P,'w',encoding='utf-8') as f: json.dump(data,f,indent=2,ensure_ascii=False); f.write('\n')
print('normalized',sum(1 for r in data if r.get('Manufacturer') in makers))
print('reviewed',sum(1 for r in data if r.get('Manufacturer') in makers and r.get('ResearchStatus')=='Reviewed'))
print('initial',sum(1 for r in data if r.get('Manufacturer') in makers and r.get('ResearchStatus')=='Initial'))
