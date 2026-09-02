import json, pathlib
root=pathlib.Path('/mnt/data/batlas652')
boat_path=root/'boatmodels.json'
records=json.load(open(boat_path,encoding='utf-8'))
byid={r['BoatModelID']:r for r in records}
updates=[]
FT_TO_M=0.3048
LB_TO_KG=0.45359237
USG_TO_L=3.785411784

def m(ft): return round(ft*FT_TO_M,4)
def kg(lb): return round(lb*LB_TO_KG,1)
def l(usg): return round(usg*USG_TO_L,2)

def upd(bid,field,new,basis,refs,unit=None):
    r=byid[bid]; old=r.get(field)
    if old==new: return
    if isinstance(old,(int,float)) and isinstance(new,(int,float)) and abs(old-new)<1e-9: return
    r[field]=new
    u={'BoatModelID':bid,'Field':field,'Old':old,'New':new,'Basis':basis,'EvidenceRefs':refs}
    if unit: u['Unit']=unit
    updates.append(u)

def normalize_us_tank(bid, base, gal, basis, refs):
    upd(bid,base,l(gal),basis,refs,'L')
    upd(bid,base+'Gal',gal,basis,refs,'US gal')
    upd(bid,base+'UnitStatus','canonical_litres',basis,refs)

# CAMANO
camano_family=['https://www.hmy.com/yachting/powerboat-guide/camano/28-31-1990-2007','https://www.camanotrawlers.com/camano_31_trawler-boat-310067.html']
upd('CAMA-28-GN','LWL',m(26.25),'HMY identifies the Gnome as the same 28-foot hull without the flybridge; documented 28/31 hull examples publish approximately 26 ft 3 in to 26 ft 6 in LWL. Existing family shadow value of 26 ft 3 in is retained as the representative shared-hull LWL.',camano_family,'m')
upd('CAMA-31-TR','Displacement',kg(10000),'Powerboat Guide publishes 10,000 lb model weight for the Camano 28/31 family.',camano_family,'kg')
# Conflicting bridge-clearance values exist by equipment/mast state. Clear legacy fallback rather than let it masquerade as canonical.
upd('CAMA-31-TR','AirDraft_ft',None,'Published examples vary materially in bridge clearance (including about 13 ft 6 in); no single production-wide canonical air draft is supportable.',camano_family,'ft')
camano41=['https://studylib.net/doc/18298312/a-printable-pdf-brochure-of-specifications-and-images','https://midicanals.boatshed.com/camano_41_performance_trawler-boat-61600.html']
upd('CAMA-41','LWL',m(38+7/12),'Model-specific Camano 41 documentation publishes 38 ft 7 in LWL.',camano41,'m')
upd('CAMA-41','LWL_ft',38+7/12,'Legacy imperial LWL aligned to the model-specific 38 ft 7 in figure.',camano41,'ft')
upd('CAMA-41','AirDraft_ft',None,'Camano 41 bridge clearance is equipment-state dependent: published examples report about 19 ft 6 in mast-up and 13 ft 6 in mast/bimini lowered, while another brochure lists 16 ft. A single fallback value is unsafe.',camano41,'ft')

# HUNT YACHTS
hunt29=['https://www.hmy.com/yachting/powerboat-guide/hunt/29-surfhunter-2003-16','https://www.sportfishingmag.com/boats/boat-reviews/hunt-surfhunter-29/']
upd('HUNT-29','AirDraft',m(5.75),'Powerboat Guide publishes 5 ft 9 in clearance for the Surfhunter 29.',hunt29,'m')
upd('HUNT-29','AirDraft_ft',5.75,'Legacy imperial clearance corrected to the published 5 ft 9 in figure.',hunt29,'ft')
upd('HUNT-29','Displacement',kg(8000),'Powerboat Guide and model-specific listings publish approximately 8,000 lb weight; prior 9,000 lb canonical value was not the better-supported model figure.',hunt29,'kg')
upd('HUNT-29','Displacement_lb',8000,'Legacy imperial displacement aligned to the better-supported 8,000 lb figure.',hunt29,'lb')
upd('HUNT-29','DisplacementLb',8000,'Legacy compatibility displacement aligned to the better-supported 8,000 lb figure.',hunt29,'lb')
upd('HUNT-29','FuelCode','fuel.mixed','Powerboat Guide documents a diesel jackshaft-drive configuration and an outboard version from 2015; other period specifications also document gasoline availability. Fuel is production/configuration dependent.',hunt29)
upd('HUNT-29','Fuel','Diesel/Gas','Legacy fuel label aligned to the mixed canonical classification.',hunt29)
upd('HUNT-29','MechanicalPropulsionCode','mechanical_propulsion.mixed','Documented production includes drive-unit/jackshaft installations and later outboards; one shaft-only classification would falsely filter valid examples.',hunt29)
upd('HUNT-29','RudderTypeCode','rudder.none_external_drive','Documented jackshaft-to-drive-unit and outboard configurations steer through the external drive rather than a separate conventional rudder.',hunt29)
normalize_us_tank('HUNT-29','FuelCapacity',150,'Powerboat Guide publishes 150 gal fuel capacity for this US-built model; normalized to canonical litres while preserving source US gallons.',hunt29)
normalize_us_tank('HUNT-29','WaterCapacity',28,'Powerboat Guide publishes 28 gal water capacity for this US-built model; normalized to canonical litres while preserving source US gallons.',hunt29)
normalize_us_tank('HUNT-29','HoldingCapacity',15,'Powerboat Guide publishes 15 gal waste capacity for this US-built model; normalized to canonical litres while preserving source US gallons.',hunt29)

hunt36=['https://www.yachtingmagazine.com/new-coupe-hunt/']
upd('HUNT-36','MechanicalPropulsionCode','mechanical_propulsion.mixed','Contemporary launch specifications document standard ZF pod drive plus optional conventional inboard installations; Plan must preserve both.',hunt36)
normalize_us_tank('HUNT-36','FuelCapacity',150,'Contemporary Hunt launch specifications explicitly publish 150 US gal fuel capacity.',hunt36)
normalize_us_tank('HUNT-36','WaterCapacity',50,'Contemporary Hunt launch specifications explicitly publish two 25 US gal water tanks (50 US gal total).',hunt36)

# NIMBUS
n365=['https://nimbusboats.com/en-us/boats/365-coupe/']
normalize_us_tank('NMBS-365-CO','FuelCapacity',184.9,'Nimbus factory specifications publish 700 L / 184.9 US gal fuel capacity; canonical storage is litres.',n365)
# overwrite exact factory litre figure to avoid conversion rounding drift
upd('NMBS-365-CO','FuelCapacity',700,'Nimbus factory primary specification is 700 litres.',n365,'L')
normalize_us_tank('NMBS-365-CO','WaterCapacity',71.3,'Nimbus factory specifications publish 270 L / 71.3 US gal fresh water capacity; canonical storage is litres.',n365)
upd('NMBS-365-CO','WaterCapacity',270,'Nimbus factory primary specification is 270 litres.',n365,'L')
normalize_us_tank('NMBS-365-CO','HoldingCapacity',31.7,'Nimbus factory specifications publish 120 L / 31.7 US gal waste capacity; canonical storage is litres.',n365)
upd('NMBS-365-CO','HoldingCapacity',120,'Nimbus factory primary specification is 120 litres.',n365,'L')
# 3003 air draft and tankage vary materially among surviving examples; do not flatten.

# SABRE
s34=['https://sabreyachts.s3.us-east-2.amazonaws.com/sabre/wp-content/uploads/2012/09/12103435/34x-specs.pdf','https://www.sabreyachts.com/owners/heritage-models/sabre-34-hard-top-express']
upd('SABR-34-EX','AirDraft',m(12+8/12),'Sabre 2007 model-year factory specification publishes 12 ft 8 in air draft over DWL to top of radar mast.',s34,'m')
upd('SABR-34-EX','AirDraft_ft',12+8/12,'Legacy imperial air draft corrected to factory 12 ft 8 in specification.',s34,'ft')
upd('SABR-34-EX','Displacement',kg(20000),'Factory specification explicitly publishes approximately 20,000 lb full-load displacement (16,000 lb estimated dry). Canonical value retains the existing representative full-load basis.',s34,'kg')

s38=['https://www.sabreyachts.com/yachts/38-salon-express','https://powerandmotoryacht.com/boats/boat-tests/sabre-38-salon-express/']
upd('SABR-38-SA','LWL',m(34+5/12),'Power & Motoryacht test data publishes 34 ft 5 in LWL for the Sabre 38 Salon Express.',s38,'m')
upd('SABR-38-SA','LWL_ft',34+5/12,'Legacy imperial LWL corrected to published 34 ft 5 in.',s38,'ft')
upd('SABR-38-SA','AirDraft',m(13.25),'Sabre factory specifications publish 13 ft 3 in air draft with mast.',s38,'m')
upd('SABR-38-SA','MechanicalPropulsionCode','mechanical_propulsion.mixed','The canonical production span includes original Volvo IPS pod-drive boats and the reintroduced 2026 Volvo DPI sterndrive version; a pod-only Plan classification is no longer correct.',s38)
upd('SABR-38-SA','RudderTypeCode','rudder.none_external_drive','Both documented IPS pod and DPI sterndrive generations steer through the propulsion drive and do not use a separate conventional rudder.',s38)
normalize_us_tank('SABR-38-SA','FuelCapacity',300,'Sabre factory specifications explicitly publish 300 US gal / about 1125 L fuel capacity.',s38)
normalize_us_tank('SABR-38-SA','WaterCapacity',100,'Sabre factory specifications explicitly publish 100 US gal / about 380 L water capacity.',s38)
normalize_us_tank('SABR-38-SA','HoldingCapacity',40,'Sabre factory specifications explicitly publish 40 US gal / about 150 L holding capacity.',s38)

# SEAWAY
# The current Seaway 24 Sport is an outboard center-console/hardtop family and is not strong evidence for the older
# canonical "24 Sport Trawler" identity. Leave the older record unresolved rather than merge generations/types.

json.dump(records,open(boat_path,'w',encoding='utf-8'),indent=2,ensure_ascii=False); open(boat_path,'a').write('\n')

batch={'release':'6.52.0','batch':'specification-completion-07','manufacturers':['Camano','Seaway','Sabre','Hunt Yachts','Nimbus'],'updateCount':len(updates),'updates':updates}
json.dump(batch,open(root/'data/specification-completion-batch-07-v6.52.json','w',encoding='utf-8'),indent=2,ensure_ascii=False); open(root/'data/specification-completion-batch-07-v6.52.json','a').write('\n')

fields=['LOA','LWL','Beam','Draft','AirDraft','Displacement','FuelCode','MechanicalPropulsionCode','HullBehaviourCode','KeelConfigurationCode','RudderTypeCode']
missingCounts={f:0 for f in fields}; manufacturerMissingCounts={}; models=[]
for r in records:
    mc=manufacturerMissingCounts.setdefault(r['Manufacturer'],{x:0 for x in fields}); miss=[]
    for f in fields:
        v=r.get(f)
        if v is None or v=='': miss.append(f); missingCounts[f]+=1; mc[f]+=1
    if miss:
        models.append({'BoatModelID':r['BoatModelID'],'Manufacturer':r['Manufacturer'],'Model':r.get('Model'),'Variant':r.get('Variant'),'MissingFields':miss})
queue={'release':'6.52.0','fields':fields,'missingCounts':missingCounts,'manufacturerMissingCounts':manufacturerMissingCounts,'models':models}
json.dump(queue,open(root/'data/specification-research-queue-v6.52.json','w',encoding='utf-8'),indent=2,ensure_ascii=False); open(root/'data/specification-research-queue-v6.52.json','a').write('\n')

print('updates',len(updates)); print('missing',missingCounts)
