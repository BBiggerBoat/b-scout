import json, os, shutil
from copy import deepcopy
root=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
model_file=os.path.join(root,'boatmodels.json')
registry_file=os.path.join(root,'data/registry/boat-registry.json')
alias_file=os.path.join(root,'data/model-search-aliases.json')
legacy_file=os.path.join(root,'data/registry/legacy-id-map.json')
image_asset_file=os.path.join(root,'data/imageassets.json')
models=json.load(open(model_file,encoding='utf-8'))
registry=json.load(open(registry_file,encoding='utf-8'))
aliases=json.load(open(alias_file,encoding='utf-8'))
legacy=json.load(open(legacy_file,encoding='utf-8'))
assets=json.load(open(image_asset_file,encoding='utf-8'))
today='2026-08-07'
S={
'ranger_models':'https://www.rangertugs.com/models','ranger_past':'https://www.rangertugs.com/past-models','r23':'https://www.rangertugs.com/spec-sheets/r-23','r25':'https://www.rangertugs.com/spec-sheets/r-25','r27':'https://www.rangertugs.com/spec-sheets/r-27','r29cb':'https://www.rangertugs.com/spec-sheets/r-29-cb','r31s':'https://www.rangertugs.com/spec-sheets/r-31-s','r43s':'https://www.rangertugs.com/spec-sheets/r-43-s',
'cdory':'https://www.c-dory.com/boats/','cd22':'https://www.c-dory.com/boat/22-cruiser/','cd25':'https://www.c-dory.com/boat/25-cruiser/','cd26':'https://www.c-dory.com/boat/26-venture/','cdtom':'https://www.c-dory.com/boat/25-tomcat-catamaran/','cdhist':'https://www.c-brats.com/media/albums/c-dory-history-page-1.21489/',
'cutpast':'https://cutwaterboats.com/past-models','c24':'https://cutwaterboats.com/past-models/c-24-c','c26':'https://www.cutwaterboats.com/past-models/c-26/','c28':'https://cutwaterboats.com/past-models/c-28','c30cb':'https://cutwaterboats.com/past-models/c-30-cb','c30s':'https://cutwaterboats.com/past-models/c-30-s','c32c':'https://cutwaterboats.com/spec-sheets/c-32-c','c32cb':'https://cutwaterboats.com/spec-sheets/c-32-cb',
'ros_old':'https://www.hmy.com/yachting/powerboat-guide/rosborough/rf-246-sedan-cruiser-1988-13','ros_new':'https://boattest.com/boats/eastern-boats/rosborough-246-yarmouth-2022','ros_wh':'https://www.boats.com/power-boats/2020-rosborough-rf-246-custom-wheelhouse-10182555/',
'nomad':'https://www.boats.com/reviews/nimble-nomad-used-boat-review/','kodiak':'https://www.cruisingworld.com/sailboats/nimble-kodiak/','wander':'https://www.cruisingworld.com/sailboats/nimble-wanderer/','wander2':'https://www.boats.com/power-boats/1996-nimble-wanderer-10046445/',
'atstory':'https://www.americantug.com/our-story/','at365':'https://www.americantug.com/tour/at-365/','at395':'https://www.americantug.com/tour/at-395/','at34':'https://www.hmy.com/yachting/powerboat-guide/american-tug/34-2001-11'
}

def apply_evidence(m,sources,unresolved,scope='Model'):
    yrs={'From':m.get('FirstYear'),'To':m.get('LastYear')}
    ap={'Scope':scope,'Models':[m['BoatModelID']],'Years':yrs,'Variations':[]}
    m['EvidenceSummary']={'KnowledgeCoverage':'Strong','EvidenceQuality':'Moderate','Statements':[
      {'Scope':'IdentityAndDimensions','AppliesTo':deepcopy(ap),'EvidenceRefs':sources,'EvidenceTypes':['Factory documented','Technical or survey source'],'Confidence':'High','Notes':'Identity and representative specifications are supported by manufacturer or model-specific technical references; unresolved production or configuration differences remain explicit.'},
      {'Scope':'OverviewAndSuitability','AppliesTo':deepcopy(ap),'EvidenceRefs':sources,'EvidenceTypes':['Factory documented','Technical or survey source'],'Confidence':'Moderate','Notes':'Buyer guidance is derived from documented configuration, propulsion, dimensions and intended use rather than marketplace promotional language.'},
      {'Scope':'InspectionFocus','AppliesTo':dict(ap,Scope='Model family'),'EvidenceRefs':sources,'EvidenceTypes':['Factory documented','Technical or survey source'],'Confidence':'Moderate','Notes':'Inspection guidance combines documented systems with age- and configuration-related checks; it does not assert that every hull has a defect.'}
    ],'UnresolvedInformation':unresolved+['Legacy CommonProblems were not promoted to KnownConcerns without model-specific evidence meeting the approved threshold']}

def finish(m, sources, unresolved):
    m['KnownConcerns']=[]
    m['ResearchStatus']='Reviewed'; m['DataConfidence']='Moderate'; m['ReviewedBy']='B-Atlas Phase 8C-9 Family Research'; m['LastUpdated']=today; m['Revision']=(m.get('Revision') or 1)+1
    apply_evidence(m,sources,unresolved)
    note='Phase 8C-9 normalized 2026-08-07 using manufacturer/model-specific sources. Unsupported defects remain unknown.'
    m['ResearchNotes']='\n\n'.join(x for x in [note,(m.get('ResearchNotes') or '').strip()] if x)

def q(items): return ['What inspection, repair or service history is available for '+x[0].lower()+x[1:]+'?' for x in items]

def suitability(kind):
    if kind=='trailer': return {'CoupleCruising':{'Assessment':'Good','Summary':'Compact accommodations are oriented to one couple or a small crew.'},'SoloHandling':{'Assessment':'Good','Summary':'Compact dimensions and straightforward helm arrangements support short-handed operation.'},'InlandWaterways':{'Assessment':'Good','Summary':'Shallow draft and manageable dimensions suit inland and protected-water cruising.'},'ExposedWater':{'Assessment':'Mixed','Summary':'Capability depends on hull form, load, weather and operator judgment; verify the individual model’s limits.'}}
    if kind=='coastal': return {'CoupleCruising':{'Assessment':'Good','Summary':'Layout and systems support extended cruising for a couple.'},'SoloHandling':{'Assessment':'Good','Summary':'Pilothouse visibility and accessible controls support short-handed operation.'},'InlandWaterways':{'Assessment':'Good','Summary':'Suitable where beam, draft and bridge clearance fit the route.'},'ExposedWater':{'Assessment':'Good','Summary':'Designed for coastal operation, subject to weather, load and operator judgment.'}}
    if kind=='motor': return {'CoupleCruising':{'Assessment':'Good','Summary':'Compact sheltered layout supports couple cruising.'},'SoloHandling':{'Assessment':'Good','Summary':'Narrow beam and simple propulsion support short-handed operation.'},'InlandWaterways':{'Assessment':'Good','Summary':'Shallow draft and trailerability expand inland access.'},'ExposedWater':{'Assessment':'Mixed','Summary':'Use is best matched to protected and moderate coastal conditions.'}}
    return {}

# Canonical identity corrections
# C-Dory current TomCat is 25/TomCat 255, not a 30-foot current model.
for m in models:
    if m['BoatModelID']=='CDRY-30-TC':
        m['BoatModelID']='CDRY-25-TC'; m['Model']='25 TomCat'; m['Variant']='TomCat 255'; m['Nickname']='C-Dory 25 TomCat / TomCat 255'; m['ImageURL']='images/cdry-25-tc.jpg'
# Remove duplicate Cutwater C-26 identity.
models=[m for m in models if m['BoatModelID']!='CUTW-26-C']

# Common editorial helper
for m in models:
    mk=m.get('Manufacturer')
    if mk not in ['Ranger Tugs','C-Dory','Cutwater','Rosborough','Nimble','American Tug']: continue
    m['OwnerActions']=['Maintain engine, cooling, fuel and steering systems to manufacturer intervals','Keep deck, window and hardware penetrations sealed and investigate leaks promptly','Document structural, electrical and propulsion repairs for future buyers']

# Ranger Tugs
for m in [x for x in models if x.get('Manufacturer')=='Ranger Tugs']:
    id=m['BoatModelID']; current=id in ['RNGR-R-23','RNGR-R-25','RNGR-R-27','RNGR-R-29','RNGR-R-31','RNGR-29-CB','RNGR-31-CB','RNGR-43-S','RNGR-43-CB']
    if id=='RNGR-R-23': m.update(LOA_ft=28.42,Beam_ft=8.5,Draft_ft=2.5,Displacement_lb=6000,FuelCapacity=80,WaterCapacity=22,HoldingCapacity=11,EngineCount=1,EngineConfiguration='Single Yamaha F200 outboard',Fuel='Gasoline',NormalizedFuel='Gasoline',Propulsion='Outboard',NormalizedPropulsion='Outboard')
    if id=='RNGR-R-25': m.update(LOA_ft=28.42,Beam_ft=8.5,Draft_ft=2.83,Displacement_lb=6500,FuelCapacity=99,WaterCapacity=34,HoldingCapacity=14,EngineCount=1,EngineConfiguration='Single Yamaha F250 outboard',Fuel='Gasoline',NormalizedFuel='Gasoline',Propulsion='Outboard',NormalizedPropulsion='Outboard')
    if id=='RNGR-R-27': m.update(LOA_ft=31.58,Beam_ft=8.5,Draft_ft=2.83,Displacement_lb=8200,FuelCapacity=150,WaterCapacity=40,HoldingCapacity=30,EngineCount=2,EngineConfiguration='Twin Yamaha F150 outboards',Fuel='Gasoline',NormalizedFuel='Gasoline',Propulsion='Outboard',NormalizedPropulsion='Outboard',FirstYear=2026,LastYear=None)
    if id=='RNGR-29-CB': m['LastYear']=None
    if id=='RNGR-31-CB': m['LastYear']=None
    if id=='RNGR-43-S': m.update(LOA_ft=46.75,Beam_ft=14,Draft_ft=3.5,FuelCapacity=300,WaterCapacity=120,HoldingCapacity=57,EngineCount=2,EngineConfiguration='Twin Volvo IPS500 pod drives',Propulsion='Pod',NormalizedPropulsion='Pod')
    if id=='RNGR-43-CB': m.update(LOA_ft=46.75,Beam_ft=14,Draft_ft=3.5,FuelCapacity=300,WaterCapacity=120,HoldingCapacity=57,EngineCount=2,EngineConfiguration='Twin Volvo IPS500 pod drives',Propulsion='Pod',NormalizedPropulsion='Pod')
    name=(m.get('Model') or '').strip(); var=(m.get('Variant') or '').strip()
    propulsion='outboard-powered' if m.get('NormalizedPropulsion')=='Outboard' else ('twin-pod' if m.get('NormalizedPropulsion')=='Pod' else 'single-diesel')
    m['Overview']=f"The Ranger Tugs {name}{(' '+var) if var and var.lower() not in name.lower() else ''} is a compact pilothouse cruising boat in Ranger Tugs’ trailerable-to-coastal range. This version is {propulsion} and combines an enclosed helm, cruising accommodations and a workboat-inspired profile with systems intended for short-handed recreational cruising."
    m['Suitability']=suitability('coastal' if m.get('Beam_ft',0)>8.5 else 'trailer')
    m['Strengths']=['Enclosed pilothouse with strong all-weather visibility','Cruising systems and accommodations packaged into a relatively compact hull','Strong factory documentation and owner-support ecosystem']
    m['TradeOffs']=['High systems density can make service access tight','Accommodation volume is achieved within relatively narrow hulls on the trailerable models','Later outboard and pod-drive versions trade traditional shaft simplicity for speed and maneuverability']
    m['BestFor']=['Couples or small crews wanting a compact, highly equipped pilothouse cruiser','Owners who value trailerability or manageable marina dimensions where the specific model permits it','Inland, Great Loop and coastal cruising within the model’s dimensional and operating limits']
    m['AvoidIf']=['You want a simple low-systems boat with minimal installed equipment','You require large private accommodations for several adults','You prefer only traditional displacement-speed shaft-drive propulsion']
    insp=['Confirm exact generation, engine package and factory variant from HIN and documentation','Inspect propulsion, cooling, fuel, steering, thrusters and charging systems','Test windows, hatches, doors and roof/deck penetrations for leakage','Verify trailer, bridge-clearance and actual loaded-weight limits where trailering is planned']
    m['InspectionFocus']=insp; m['BuyerQuestions']=q(insp)
    m['ModelVariations']=[{'Name':'Generation and propulsion changes','Description':'Ranger reused several model numbers across materially different diesel-inboard and later outboard generations; Sedan and Command Bridge versions are separate configurations where offered.','AffectedYears':'Varies by model','EvidenceRefs':[S['ranger_past'],S['ranger_models']],'Confidence':'High'}]
    src=[S['ranger_models'],S['ranger_past']]
    if id=='RNGR-R-23': src.append(S['r23'])
    if id=='RNGR-R-25': src.append(S['r25'])
    if id=='RNGR-R-27': src.append(S['r27'])
    if id=='RNGR-29-CB': src.append(S['r29cb'])
    if id=='RNGR-R-31': src.append(S['r31s'])
    if id=='RNGR-43-S': src.append(S['r43s'])
    finish(m,src,['Exact production-year boundaries for some historical Ranger generations should be verified against individual HIN/model-year documentation.'])

# C-Dory
for m in [x for x in models if x.get('Manufacturer')=='C-Dory']:
    id=m['BoatModelID']; m['Flybridge']='No'; m['AftCabin']='No'; m['Propulsion']='Outboard'; m['NormalizedPropulsion']='Outboard'; m['Fuel']='Gasoline'; m['NormalizedFuel']='Gasoline'
    if id=='CDRY-22-CR': m.update(FirstYear=1987,LastYear=None,LOA_ft=22,Beam_ft=7.67,Draft_ft=.58,Displacement_lb=2085,FuelCapacity=46,EngineCount=1,EngineConfiguration='Single outboard up to 115 hp',NormalizedStyle='Pilothouse')
    if id=='CDRY-25-CR': m.update(LastYear=None,LOA_ft=25.42,Beam_ft=8.5,Draft_ft=1,Displacement_lb=3950,FuelCapacity=100,WaterCapacity=23,EngineCount=1,EngineConfiguration='Single outboard up to 200 hp',NormalizedStyle='Pilothouse')
    if id=='CDRY-26-V': m.update(LastYear=None,LOA_ft=25.75,Beam_ft=8.5,Draft_ft=1.17,Displacement_lb=4120,FuelCapacity=100,EngineCount=1,EngineConfiguration='Single outboard up to 200 hp',NormalizedStyle='Pilothouse')
    if id=='CDRY-25-TC': m.update(FirstYear=2005,LastYear=None,LOA_ft=25.42,Beam_ft=8.5,Displacement_lb=5400,FuelCapacity=150,WaterCapacity=30,EngineCount=2,EngineConfiguration='Twin outboards; combined rating up to 350 hp',NormalizedStyle='Catamaran',Style='Power Catamaran',HullType='Catamaran',NormalizedHullConfiguration='Catamaran')
    if id=='CDRY-26-PA': m.update(FirstYear=1989,LastYear=2005,EngineCount=1,EngineConfiguration='Outboard or inboard configurations documented; verify individual hull',NormalizedStyle='Pilothouse')
    label=m.get('Nickname') or f"C-Dory {m.get('Model')}"
    m['Overview']=f"The {label} is a practical C-Dory pilothouse design built around light weight, shallow draft and simple cruising or fishing utility. Its layout emphasizes weather protection and cockpit function rather than luxury, with outboard propulsion on the mainstream cruiser and Venture models."
    if id=='CDRY-25-TC': m['Overview']='The C-Dory TomCat 255 is a trailerable power catamaran with twin outboards, an enclosed pilothouse and cruising accommodations. Its 25-foot hull length contrasts with an overall rigged footprint near 30 feet, which likely contributed to legacy “30 TomCat” naming confusion.'
    if id=='CDRY-26-PA': m['Overview']='The C-Dory 26 Pro Angler is a real, low-volume historical C-Dory fishing model documented in late-1980s/early-1990s factory literature and in later owner records. It uses a narrower cabin and walkaround-oriented fishing layout rather than the mainstream Cruiser arrangement; propulsion and year details vary among surviving examples.'
    m['Suitability']=suitability('trailer')
    m['Strengths']=['Light, shallow-draft hull with simple systems','Enclosed pilothouse provides weather protection and strong visibility','Trailerability and outboard serviceability support dispersed cruising grounds']
    if id=='CDRY-25-TC': m['Strengths']=['Stable twin-hull platform with twin-outboard redundancy','Enclosed pilothouse and compact cruising accommodations','Trailerable beam despite substantially larger rigged footprint']
    m['TradeOffs']=['Light hulls can have a lively ride when conditions and speed are poorly matched','Compact cabin and side-deck arrangements limit interior volume','Outboard-powered layouts trade inboard protection for serviceability and shallow draft']
    m['BestFor']=['Owners prioritizing simple, trailerable pilothouse cruising or fishing','Couples or small crews operating on inland and coastal waters','Buyers who value shallow draft and outboard service access']
    m['AvoidIf']=['You need generous liveaboard volume or wide side decks','You expect heavy-displacement motion in rough water','You require a conventional inboard diesel trawler layout']
    insp=['Verify exact model, year and hull identity because C-Dory reused related hulls and names over a long production history','Inspect cored hull/deck areas around penetrations and previous hardware installations','Inspect transom or outboard bracket structure and engine mounting','Verify fuel-system, steering and electrical updates on older examples']
    m['InspectionFocus']=insp;m['BuyerQuestions']=q(insp);m['OwnerActions']=['Maintain bedding around hardware and inspect cored structures after any leak','Service outboards, steering and fuel systems to manufacturer intervals','Keep trailer and launch equipment matched to actual loaded weight where trailering is used']
    m['ModelVariations']=[{'Name':'Long production and hull-family evolution','Description':'C-Dory model names span multiple production eras. The 26 Pro Angler is a documented historical model; the current TomCat is the 25-foot TomCat 255, not a current 30-foot model.','AffectedYears':'Varies by model','EvidenceRefs':[S['cdory'],S['cdhist']],'Confidence':'High'}]
    src=[S['cdory'],S['cdhist']]
    if id=='CDRY-22-CR': src.append(S['cd22'])
    if id=='CDRY-25-CR': src.append(S['cd25'])
    if id=='CDRY-26-V': src.append(S['cd26'])
    if id=='CDRY-25-TC': src.append(S['cdtom'])
    finish(m,src,['Exact production span and propulsion configuration of the low-volume 26 Pro Angler require hull-specific verification.' if id=='CDRY-26-PA' else 'Factory specifications can vary by model year and optional equipment; individual hull documentation controls.'])

# Cutwater identity corrections and normalization
cut_rename={
'CUTW-24':('C-24 C','Coupe','No'),
'CUTW-26':('C-26','Cruiser','No'),
'CUTW-28-P':('C-28','Cruiser','No'),
'CUTW-30-C':('C-30 CB','Command Bridge','Yes'),
'CUTW-30-P':('C-30 S','Sedan','No'),
'CUTW-32':('C-32 CB','Command Bridge','Yes')}
for m in [x for x in models if x.get('Manufacturer')=='Cutwater']:
    if m['BoatModelID'] in cut_rename:
        name,var,fb=cut_rename[m['BoatModelID']];m['Model']=name;m['Variant']=var;m['Nickname']='Cutwater '+name;m['Flybridge']=fb
    if m['BoatModelID']=='CUTW-24': m.update(EngineCount=1,EngineConfiguration='Single Yamaha F250 outboard',Fuel='Gasoline',NormalizedFuel='Gasoline',Propulsion='Outboard',NormalizedPropulsion='Outboard',NormalizedStyle='Cruiser')
    if m['BoatModelID'] in ['CUTW-26','CUTW-28-P','CUTW-30-C','CUTW-30-P']: m.update(EngineCount=1,Fuel='Diesel',NormalizedFuel='Diesel',Propulsion='Shaft',NormalizedPropulsion='Shaft')
    if m['BoatModelID']=='CUTW-32': m.update(LOA_ft=37.67,Beam_ft=10,Draft_ft=2.75,Displacement_lb=12100,FuelCapacity=300,WaterCapacity=60,HoldingCapacity=40,EngineCount=2,EngineConfiguration='Twin Yamaha F300 outboards',Fuel='Gasoline',NormalizedFuel='Gasoline',Propulsion='Outboard',NormalizedPropulsion='Outboard')
    m['Overview']=f"The Cutwater {m['Model']} is a compact cruising model from Fluid Motion’s Cutwater line, combining enclosed accommodations with a performance-oriented hull and unusually dense standard equipment. This record uses Cutwater’s factory model designation rather than legacy B-Atlas labels such as “Pilothouse” or generic size-only names."
    m['Suitability']=suitability('coastal')
    m['Strengths']=['Compact cruiser with substantial accommodation and systems for its length','Good helm visibility and short-handed features','Strong factory documentation and shared Fluid Motion support ecosystem']
    m['TradeOffs']=['High equipment density increases maintenance complexity','Performance-oriented hulls and later outboard packages are less traditional than displacement trawlers','Trailerability on larger models depends on permit, tow-vehicle and actual loaded-weight constraints']
    m['BestFor']=['Couples seeking a fast, compact cruiser with extensive standard equipment','Owners who value modern systems, maneuverability and enclosed accommodations','Inland and coastal cruising where the model’s dimensions fit']
    m['AvoidIf']=['You want minimal systems and simple low-speed displacement operation','You prioritize wide machinery spaces and easy service access above compact packaging','You require a traditional full-keel single-diesel trawler']
    insp=['Confirm exact factory designation and model year because Cutwater naming changed materially across generations','Inspect propulsion, cooling or outboard rigging, fuel, steering and thruster systems','Inspect windows, hatches, roof and deck penetrations for leakage','Test electrical, charging, inverter and installed comfort systems under load']
    m['InspectionFocus']=insp;m['BuyerQuestions']=q(insp)
    m['ModelVariations']=[{'Name':'Factory designation changes','Description':'Cutwater’s official historical catalog distinguishes C-24 C/CW/DC/SC, C-26, C-28, C-30 CB/S and C-32 CB/C among other later generations. B-Atlas has aligned existing records to those factory names; missing factory variants are flagged for later acquisition rather than invented.','AffectedYears':'Varies by model','EvidenceRefs':[S['cutpast']],'Confidence':'High'}]
    src=[S['cutpast']]
    src += {'CUTW-24':[S['c24']],'CUTW-26':[S['c26']],'CUTW-28-P':[S['c28']],'CUTW-30-C':[S['c30cb']],'CUTW-30-P':[S['c30s']],'CUTW-32':[S['c32cb']]}.get(m['BoatModelID'],[])
    finish(m,src,['The current database does not yet contain every documented Cutwater factory variant; C-32 C and several C-24 derivatives remain model-acquisition gaps.'])

# Rosborough
for m in [x for x in models if x.get('Manufacturer')=='Rosborough']:
    id=m['BoatModelID'];m['Model']='RF-246'
    if id=='ROSB-246': m['Variant']='Yarmouth / current cruising layout';m.update(LOA_ft=25,Beam_ft=8.5,Draft_ft=1.5,Displacement_lb=7500,FuelCapacity=115,WaterCapacity=40,EngineCount=1,EngineConfiguration='Single outboard, typically 150–250 hp',Fuel='Gasoline',NormalizedFuel='Gasoline',Propulsion='Outboard',NormalizedPropulsion='Outboard')
    if id=='ROSB-246-LS': m['Variant']='Legacy Sedan Cruiser Diesel';m.update(LOA_ft=24.83,Beam_ft=8.5,Draft_ft=2,Displacement_lb=6000,FuelCapacity=70,WaterCapacity=30,EngineCount=1,Fuel='Diesel',NormalizedFuel='Diesel')
    if id=='ROSB-246-WH': m['Variant']='Custom Wheelhouse';m.update(LOA_ft=25,Beam_ft=8.5,Draft_ft=1.5,Displacement_lb=6000,EngineCount=1)
    m['Overview']=f"The Rosborough RF-246 {m['Variant']} is a Nova Scotia-designed compact semi-displacement cruiser/workboat derivative built around an 8-foot-6-inch trailerable beam. The RF-246 has appeared with materially different interior layouts and propulsion packages over its long production history, so exact engine, tank and accommodation details must be matched to the individual build."
    m['Suitability']=suitability('trailer');m['Strengths']=['Rugged compact hull with practical enclosed wheelhouse','Trailerable beam and shallow draft for a boat with genuine coastal-cruising capability','Long production history with cruising, fishing and commercial derivatives'];m['TradeOffs']=['Narrow beam limits side-deck and interior volume','Long production history creates substantial variation in engines, tanks and layouts','Utilitarian finish and workboat ergonomics may feel basic compared with modern cruisers'];m['BestFor']=['Couples wanting a compact all-weather coastal cruiser','Owners needing trailerable beam with more displacement and workboat character than a light pilothouse boat','Cruising, fishing or mixed-use operation'];m['AvoidIf']=['You need wide side decks or large private accommodations','You want a standardized model with little year-to-year variation','You prioritize high-speed planing performance'];insp=['Confirm exact builder, year, layout and propulsion package','Inspect hull/deck structure, wheelhouse joints and previous hardware penetrations','Inspect engine/outboard installation, fuel system and steering','Verify actual tank capacities, loaded weight and trailer suitability'];m['InspectionFocus']=insp;m['BuyerQuestions']=q(insp);m['ModelVariations']=[{'Name':'RF-246 layout and propulsion families','Description':'Historical Sedan Cruiser, Custom Wheelhouse and later Digby/Halifax/Yarmouth arrangements share the RF-246 platform but differ materially in interior layout, power and tankage.','AffectedYears':'Long production history','EvidenceRefs':[S['ros_old'],S['ros_new'],S['ros_wh']],'Confidence':'High'}];finish(m,[S['ros_old'],S['ros_new'],S['ros_wh']],['Published displacement, fuel capacity and overall length vary significantly by build, power package and measurement convention.'])

# Nimble
for m in [x for x in models if x.get('Manufacturer')=='Nimble']:
    id=m['BoatModelID']
    if id=='NMBL-24-NO':
        m['Model']='Nomad';m['Variant']='24 Pocket Trawler';m['Nickname']='Nimble Nomad';m.update(LOA_ft=24.5,Beam_ft=8.5,EngineCount=1,EngineConfiguration='Single outboard in well',Fuel='Gasoline',NormalizedFuel='Gasoline',Propulsion='Outboard',NormalizedPropulsion='Outboard',Style='Pocket Trawler',NormalizedStyle='Trawler',HullType='Semi-Displacement',NormalizedHullForm='Semi-Displacement')
        src=[S['nomad']];overview='The Nimble Nomad is a Ted Brewer-associated 24-foot pocket trawler/pilothouse powerboat with an outboard mounted in a well, compact liveaboard accommodations and an 8-foot-6-inch trailerable beam. It is a slow, characterful inland/coastal cruiser rather than a planing boat.'
    elif id=='NMBL-30-KO':
        m['Model']='Kodiak';m['Variant']='27 Pilothouse Motorsailer';m['Nickname']='Nimble Kodiak';m.update(LOA_ft=27.25,Beam_ft=8.5,Draft_ft=1.83,Displacement_lb=3640,EngineCount=1,EngineConfiguration='15 hp outboard or small diesel inboard options',Fuel=None,NormalizedFuel=None,Style='Pilothouse Motorsailer',NormalizedStyle='Motorsailer',HullType='Displacement',NormalizedHullForm='Displacement')
        src=[S['kodiak']];overview='The Nimble Kodiak is a Ted Brewer-designed 27-foot pilothouse motorsailer, not a conventional power cruiser. It combines an inside steering position, trailerable 8-foot-6-inch beam, shallow-draft centerboard or fixed-keel arrangements and auxiliary outboard or small diesel propulsion.'
    else:
        m['Model']='Wanderer';m['Variant']='32 Pilothouse / Motorsailer';m['Nickname']='Nimble Wanderer';m.update(LOA_ft=32.42,Beam_ft=8.5,Draft_ft=2.83,Displacement_lb=8800,EngineCount=1,EngineConfiguration='Single diesel inboard; mastless power and motorsailer versions documented',Fuel='Diesel',NormalizedFuel='Diesel',Propulsion='Shaft',NormalizedPropulsion='Shaft',Style='Pilothouse Cruiser / Motorsailer',NormalizedStyle='Motorsailer',HullType='Long Keel',NormalizedHullForm='Displacement')
        src=[S['wander'],S['wander2']];overview='The Nimble Wanderer is a Ted Brewer-designed 32-foot shallow-draft pilothouse cruiser offered with or without a sailing rig. Power-oriented examples use a single diesel and long keel; rigged boats are best understood as motorsailers rather than conventional trawlers.'
    m['Overview']=overview;m['Suitability']=suitability('motor');m['Strengths']=['Trailerable 8-foot-6-inch beam despite enclosed cruising accommodations','Distinctive sheltered pilothouse design suited to inland and shoulder-season cruising','Shallow draft expands access to rivers, canals and protected anchorages'];m['TradeOffs']=['Narrow beam limits interior and side-deck space','Low-volume production means parts, documentation and resale comparisons can be sparse','Kodiak and rigged Wanderer versions introduce sailing systems that do not fit a pure powerboat comparison'];m['BestFor']=['Owners prioritizing trailerability, shallow draft and distinctive traditional character','Couples exploring inland waterways and protected coastal cruising grounds','Buyers comfortable with uncommon low-volume boats'];m['AvoidIf']=['You need broad beam, large side decks or spacious engine access','You want a mainstream model with extensive dealer support','You require high planing speeds'];insp=['Confirm exact hull, rig and propulsion configuration','Inspect deck/hull core, pilothouse joints and hardware penetrations','Inspect propulsion installation, steering and fuel system','For rigged Kodiak/Wanderer examples, inspect mast step, rigging, chainplates and centerboard/keel systems'];m['InspectionFocus']=insp;m['BuyerQuestions']=q(insp);m['ModelVariations']=[{'Name':'Power versus motorsailer configuration','Description':'The Nomad is a pocket-trawler powerboat; the Kodiak is a pilothouse sailboat/motorsailer; the Wanderer was offered with or without a sailing rig. These are materially different use cases despite shared Nimble/Ted Brewer design language.','AffectedYears':'Varies by model','EvidenceRefs':[S['nomad'],S['kodiak'],S['wander']],'Confidence':'High'}];finish(m,src,['Exact production years and optional engine packages are incompletely documented for these low-volume models.'])

# American Tug
for m in [x for x in models if x.get('Manufacturer')=='American Tug']:
    id=m['BoatModelID'];m['Flybridge']=m.get('Flybridge') or 'No';m['EngineCount']=1;m['Fuel']='Diesel';m['NormalizedFuel']='Diesel';m['Propulsion']='Shaft';m['NormalizedPropulsion']='Shaft';m['HullType']='Semi-Displacement';m['NormalizedHullForm']='Semi-Displacement';m['NormalizedStyle']='Trawler'
    if id=='AMTG-34': m.update(FirstYear=2001,LastYear=2011,LOA_ft=34.42,Beam_ft=13.25,Draft_ft=3.42,Displacement_lb=20000,FuelCapacity=400,WaterCapacity=150,HoldingCapacity=45,EngineConfiguration='Single Cummins diesel inboard');src=[S['atstory'],S['at34']]
    elif id=='AMTG-365': m.update(FirstYear=2005,LastYear=None,LOA_ft=36.5,Beam_ft=13.25,Draft_ft=3.42,Displacement_lb=18700,FuelCapacity=400,WaterCapacity=120,EngineConfiguration='Single Cummins 380 diesel inboard; Volvo option');src=[S['atstory'],S['at365']]
    else: m.update(FirstYear=2010,LastYear=None,LOA_ft=41.5,Beam_ft=13.25,Draft_ft=3.42,Displacement_lb=21000,FuelCapacity=400,WaterCapacity=120,EngineConfiguration='Single Cummins 380 or 550 diesel inboard');src=[S['atstory'],S['at395']]
    m['Overview']=f"The American Tug {m['Model']} is a Lynn Senour-influenced raised-pilothouse semi-displacement cruiser built for efficient coastal passagemaking. It combines a single-diesel shaft layout, protected running gear, wide working decks and couple-oriented accommodations with substantially more beam and displacement than trailerable tug-style cruisers."
    m['Suitability']=suitability('coastal');m['Strengths']=['Raised pilothouse with excellent visibility and direct deck access','Single-diesel semi-displacement drivetrain balances economy with moderate cruising speed','Wide side decks, substantial tankage and robust coastal-cruising layout'];m['TradeOffs']=['Beam and displacement require conventional marina, haul-out and storage infrastructure','Single engine provides no second-engine propulsion redundancy','More complex and costly to own than trailerable pocket cruisers'];m['BestFor']=['Couples planning extended coastal or Great Loop cruising','Owners prioritizing pilothouse visibility, tankage and robust deck access','Buyers comfortable with conventional yacht-scale storage and maintenance'];m['AvoidIf']=['You require road trailerability or narrow-beam slips','You want twin-engine redundancy','You prefer very small, low-cost systems and marina requirements'];insp=['Confirm exact 34/365 naming and model year from HIN and factory records','Inspect engine, cooling, exhaust, shaft, rudder and full-length keel/running gear','Inspect pilothouse doors, windows, deck hardware and cored structures for leakage','Inspect fuel, water, waste, generator and electrical systems and verify tank condition'];m['InspectionFocus']=insp;m['BuyerQuestions']=q(insp);m['ModelVariations']=[{'Name':'34 / 365 naming evolution','Description':'American Tug describes the original platform as the 34/365. Historical 34 and later 365 naming overlap in the record; individual model-year documentation should control nomenclature.','AffectedYears':'2001 onward','EvidenceRefs':[S['atstory'],S['at365']],'Confidence':'High'}];finish(m,src,['The precise transition from the 34 designation to 365 naming overlaps in published sources; retain hull-specific model-year documentation as authoritative.'])

# Update registry and aliases for changed/removed identities
redirects={'CDRY-30-TC':'CDRY-25-TC','CUTW-26-C':'CUTW-26'}
for old,new in redirects.items():
    for item in legacy:
        if item.get('LegacyBoatModelID')==old:
            item['CurrentBoatModelID']=new;item['ProposedV7BoatModelID']=new;item['RedirectType']='Permanent';item['MigrationStatus']='Migrated'
            break
    else: legacy.append({'LegacyBoatModelID':old,'ProposedV7BoatModelID':new,'MigrationStatus':'Migrated','SourceRecordCount':0,'CurrentBoatModelID':new,'RedirectType':'Permanent'})
registry=[r for r in registry if r.get('BoatModelID') not in redirects]
for r in registry:
    if r.get('BoatModelID')=='CDRY-25-TC': r['CanonicalName']='C-Dory 25 TomCat / TomCat 255';r['Model']='25 TomCat';r['Variant']='TomCat 255';r['Aliases']=list(dict.fromkeys((r.get('Aliases') or [])+['CDRY-30-TC','C-Dory 30 TomCat','TomCat 255','25 TomCat']))
# If canonical target absent because old ID changed in model only, create/update from old registry source.
if not any(r.get('BoatModelID')=='CDRY-25-TC' for r in registry):
    registry.append({'BoatModelID':'CDRY-25-TC','IdentityStatus':'ActiveV7','ManufacturerCode':'CDRY','CanonicalName':'C-Dory 25 TomCat / TomCat 255','Model':'25 TomCat','Variant':'TomCat 255','Aliases':['CDRY-30-TC','C-Dory 30 TomCat','TomCat 255','25 TomCat'],'Active':False,'RedirectTo':None,'Notes':'Canonicalized from legacy CDRY-30-TC in Phase 8C-9; current factory model is 25-foot TomCat 255.'})
# Rename Cutwater canonical names in registry
rnames={'CUTW-24':('Cutwater C-24 C','C-24 C','Coupe'),'CUTW-26':('Cutwater C-26','C-26','Cruiser'),'CUTW-28-P':('Cutwater C-28','C-28','Cruiser'),'CUTW-30-C':('Cutwater C-30 CB','C-30 CB','Command Bridge'),'CUTW-30-P':('Cutwater C-30 S','C-30 S','Sedan'),'CUTW-32':('Cutwater C-32 CB','C-32 CB','Command Bridge')}
for r in registry:
    if r.get('BoatModelID') in rnames:
        a,b,c=rnames[r['BoatModelID']];r['CanonicalName']=a;r['Model']=b;r['Variant']=c
aliases=[a for a in aliases if a.get('BoatModelID') not in redirects]
# update existing alias canonical names
for a in aliases:
    id=a.get('BoatModelID')
    if id in rnames: a['CanonicalName']=rnames[id][0];a['ModelTerms']=list(dict.fromkeys((a.get('ModelTerms') or [])+[rnames[id][1],rnames[id][2]]))
if not any(a.get('BoatModelID')=='CDRY-25-TC' for a in aliases): aliases.append({'BoatModelID':'CDRY-25-TC','CanonicalName':'C-Dory 25 TomCat / TomCat 255','ManufacturerTerms':['C-Dory','C Dory'],'ModelTerms':['25 TomCat','TomCat 255','30 TomCat'],'SourceModelTerms':{}})
# image reference canonicalization for TomCat; don't invent an image
oldimg=os.path.join(root,'images/cdry-30-tc.jpg');newimg=os.path.join(root,'images/cdry-25-tc.jpg')
if os.path.exists(oldimg) and not os.path.exists(newimg): os.rename(oldimg,newimg)
for a in assets.get('assets',[]):
    if a.get('boatModelId')=='CDRY-30-TC': a['boatModelId']='CDRY-25-TC';a['requestedPath']='images/cdry-25-tc.jpg';a['filename']='cdry-25-tc.jpg';a['path']='images/cdry-25-tc.jpg' if os.path.exists(newimg) else 'images/boat-placeholder.svg';a['status']='available' if os.path.exists(newimg) else 'missing'
assets['assets']=[a for a in assets.get('assets',[]) if a.get('boatModelId')!='CUTW-26-C']
assets['generatedAt']=today

json.dump(models,open(model_file,'w',encoding='utf-8'),indent=2,ensure_ascii=False);open(model_file,'a').write('\n')
for p,obj in [(registry_file,registry),(alias_file,aliases),(legacy_file,legacy),(image_asset_file,assets)]:
    json.dump(obj,open(p,'w',encoding='utf-8'),indent=2,ensure_ascii=False);open(p,'a').write('\n')
# report
ids=[m['BoatModelID'] for m in models if m.get('Manufacturer') in ['Ranger Tugs','C-Dory','Cutwater','Rosborough','Nimble','American Tug']]
report={'phase':'8C-9','date':today,'families':['Ranger Tugs','C-Dory','Cutwater','Rosborough','Nimble','American Tug'],'normalizedRecords':len(ids),'canonicalIds':ids,'modelCount':len(models),'identityConsolidations':[{'from':'CDRY-30-TC','to':'CDRY-25-TC','reason':'Factory current model is 25-foot TomCat 255; legacy 30-foot naming conflated rigged length/historical charter hulls.'},{'from':'CUTW-26-C','to':'CUTW-26','reason':'Cutwater official past-model catalog lists C-26, not a separate C-26 C model.'}],'notableFindings':['Nimble Kodiak is a pilothouse motorsailer, not a conventional power cruiser.','Nimble Wanderer was offered with and without a sailing rig.','Cutwater existing records were aligned to factory C-24 C, C-26, C-28, C-30 CB, C-30 S and C-32 CB naming.','C-Dory 26 Pro Angler is retained as a genuine historical low-volume model.','American Tug 34/365 is a naming evolution of the same core platform; the transition overlaps in published sources.'],'knownConcernsPromoted':0,'documentedGaps':['Cutwater C-32 C and several C-24 derivatives are not represented as separate records.','C-Dory 22 Angler, 23 Venture and other genuine models are outside the current five-record C-Dory set.']}
os.makedirs(os.path.join(root,'developer/reports'),exist_ok=True)
json.dump(report,open(os.path.join(root,'developer/reports/phase8c9-core-compact-family-normalization.json'),'w',encoding='utf-8'),indent=2);open(os.path.join(root,'developer/reports/phase8c9-core-compact-family-normalization.json'),'a').write('\n')
open(os.path.join(root,'developer/reports/PHASE_8C9_CORE_COMPACT_FAMILY_NORMALIZATION.md'),'w',encoding='utf-8').write(f'''# Phase 8C-9 — Core compact cruising families\n\nNormalized Ranger Tugs, C-Dory, Cutwater, Rosborough, Nimble and American Tug.\n\n- Canonical records normalized: {len(ids)}\n- Total model records after safe consolidation: {len(models)}\n- CDRY-30-TC redirects to CDRY-25-TC (TomCat 255).\n- CUTW-26-C redirects to CUTW-26.\n- No generic legacy CommonProblems were promoted to KnownConcerns.\n- Cutwater records now use factory naming where a direct match existed.\n- Nimble Kodiak/Wanderer are classified with their motorsailer context instead of being forced into ordinary power-cruiser categories.\n''')
print('normalized',len(ids),'records; total',len(models))
