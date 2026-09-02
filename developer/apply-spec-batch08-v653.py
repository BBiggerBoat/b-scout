import json, pathlib
root=pathlib.Path('/mnt/data/batlas653')
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

# MONK 36
monk=['https://www.hmy.com/yachting/powerboat-guide/monk/36-trawler-1982-2007','https://www.boatdealers.ca/boats-for-sale/675981/monk-monk-36-belleville-ontario']
normalize_us_tank('MONK-36-TR','FuelCapacity',320,'Powerboat Guide publishes 320 gal fuel and Canadian model-specific documentation explicitly identifies the Monk 36 capacity as 320 US gallons. Canonical storage is litres.',monk)
normalize_us_tank('MONK-36-TR','WaterCapacity',120,'Powerboat Guide publishes 120 gal fresh water and Canadian model-specific documentation explicitly identifies 120 US gallons. Canonical storage is litres.',monk)
normalize_us_tank('MONK-36-TR','HoldingCapacity',45,'Powerboat Guide publishes 45 gal waste capacity. Individual boats document 40-gal replacement/installation differences; the model-guide 45-gal figure is retained as the representative published model specification and normalized as US gallons.',monk)
# Rudder remains unknown subtype: credible sources establish a full keel and protected rudder, but not a supported skeg-hung/other canonical subtype.

# OCEAN ALEXANDER 39 SEDAN
oa=['https://www.boats.com/power-boats/1986-ocean-alexander-39-sedan-10098720/','https://seattle.boatshed.com/ocean_alexander_39_sedan-boat-335213.html','https://marinesource.com/boat/ocean-alexander-39-sedan-1986-bellingham-2461bed91-for-sale']
# Surviving exact-model examples conflict materially: 39 ft on deck vs 42 ft 6 in/42 ft 8 in extensions, 36 ft vs 38.67 ft LWL,
# 22,500/23,004/38,000 lb displacement, and strongly conflicting tankage. Remove unsafe legacy shadows so canonical Unknown is preserved.
upd('OCAL-39-SE','LOA_ft',None,'Exact-model 1986 examples distinguish 39 ft deck/hull length from roughly 42 ft 6 in to 42 ft 8 in overall length with extensions. A single legacy LOA fallback would misstate Plan length for some boats.',oa,'ft')
upd('OCAL-39-SE','LengthFt',None,'Legacy generic length cleared because it can be consumed as LOA fallback even though exact-model evidence shows extension-dependent overall length.',oa,'ft')
upd('OCAL-39-SE','LWL_ft',None,'Exact-model listings conflict at approximately 36 ft and 38.67 ft LWL; no model-wide waterline length is currently supportable.',oa,'ft')
upd('OCAL-39-SE','AirDraft_ft',None,'The inherited 13.8 ft clearance is not supported by the reviewed exact-model evidence; a surviving 1986 example reports 22 ft 6 in with its installed equipment. Air draft remains equipment-dependent and unresolved.',oa,'ft')
upd('OCAL-39-SE','Displacement_lb',None,'Exact-model 1986 evidence conflicts materially at about 22,500 lb, 23,004 lb and 38,000 lb depending on boat/refit/loading description; clear the unsupported 25,000 lb shadow rather than expose it as canonical.',oa,'lb')
upd('OCAL-39-SE','DisplacementLb',None,'Legacy compatibility displacement cleared because exact-model evidence is materially conflicting and canonical displacement remains unresolved.',oa,'lb')
# Keep canonical Beam/Draft already tied to the verified 39-on-deck example. Tankage remains unresolved due exact-boat conflict.

# TOLLYCRAFT 34 SPORT SEDAN
t34=['https://www.hmy.com/yachting/powerboat-guide/tollycraft/34-sport-sedan-1987-93','https://seattle.boatshed.com/tollycraft_34_sport_sedan-boat-253225.html','https://seattle.boatshed.com/tollycraft_34_sport_sedan-boat-250737.html']
upd('TOLL-34-SE','LWL',m(31+4/12),'Two model-specific Tollycraft 34 Sport Sedan records publish 31 ft 4 in LWL; this is promoted over the unsupported 31.8 ft shadow.',t34,'m')
upd('TOLL-34-SE','LWL_ft',31+4/12,'Legacy LWL aligned to the supported 31 ft 4 in model-specific figure.',t34,'ft')
upd('TOLL-34-SE','FuelCode','fuel.mixed','Powerboat Guide explicitly states that several engine options were offered, including diesels, while gasoline engines were common. Plan must not exclude diesel examples.',t34)
normalize_us_tank('TOLL-34-SE','WaterCapacity',116,'Powerboat Guide publishes 116 gal water capacity for this US-built model. Normalized to canonical litres while preserving the published US-gallon value.',t34)
# Fuel was 200/296 gal by production year, so a single canonical tank value remains unresolved rather than flattening the phase change.

# TOLLYCRAFT 37 SEDAN
t37=['https://www.boattrader.com/boat/1980-tollycraft-37-sedan-9807336/','https://www.boats.com/power-boats/1978-tollycraft-37-sedan-10071940/','https://s3.amazonaws.com/pop.web.assets/Listing-Brochures/Pop-Brochure-167248.pdf']
upd('TOLL-37-SE','LOA_ft',37+4/12,'Multiple model-specific records support 37 ft 4 in hull/overall length before owner-added platforms or extensions; legacy 37.0 ft shadow aligned to canonical measurement.',t37,'ft')
upd('TOLL-37-SE','LengthFt',37+4/12,'Legacy compatibility length aligned to the supported 37 ft 4 in model dimension; longer 40+ ft listing LOAs reflect installed extensions/platforms.',t37,'ft')
upd('TOLL-37-SE','Draft_ft',3.0,'Multiple model-specific records publish approximately 3 ft draft; legacy 3.17 ft shadow aligned to the canonical 3 ft representative value.',t37,'ft')
upd('TOLL-37-SE','DraftFt',3.0,'Legacy compatibility draft aligned to the canonical 3 ft representative value.',t37,'ft')
upd('TOLL-37-SE','AirDraft_ft',12.5,'A model-specific 1980 Tollycraft 37 Sedan listing publishes approximately 12 ft 6 in bridge clearance; legacy 13.2 ft shadow corrected to the canonical value.',t37,'ft')
normalize_us_tank('TOLL-37-SE','FuelCapacity',300,'Multiple US model-specific Tollycraft 37 Sedan records publish 300 gal fuel capacity. Canonical storage is litres while retaining 300 US gal.',t37)
# Water and holding capacities vary materially among surviving boats (120-140 water; 20-40+ holding), so remain unresolved as a single model-wide tank value.
# LWL remains unknown: no sufficiently authoritative model-wide source found.

# TROJAN F-36 TRI-CABIN
trojan=['https://www.hmy.com/yachting/powerboat-guide/trojan/36-tri-cabin-1970-87','https://www.boatdealers.ca/boats-for-sale/672650/trojan-36-tri-cabin-midland-ontario']
upd('TROJ-36-TR','AirDraft',m(12.25),'Powerboat Guide publishes 12 ft 3 in clearance for the Trojan 36 Tri-Cabin.',trojan,'m')
upd('TROJ-36-TR','AirDraft_ft',12.25,'Legacy imperial clearance corrected from 12 ft 6 in to the published 12 ft 3 in.',trojan,'ft')
upd('TROJ-36-TR','FuelCode','fuel.mixed','Powerboat Guide states diesels were factory options although most boats were gasoline-powered; a gasoline-only canonical filter would falsely eliminate legitimate diesel examples.',trojan)
upd('TROJ-36-TR','Fuel','Gasoline or Diesel','Legacy fuel label aligned to the mixed canonical classification.',trojan)
upd('TROJ-36-TR','MechanicalPropulsionCode','mechanical_propulsion.mixed','Powerboat Guide documents V-drives on the Sea Raider and some early Tri-Cabins, with direct-drive installations common later. Production-span propulsion is therefore configuration/era dependent.',trojan)
upd('TROJ-36-TR','Propulsion','Shaft/V-Drive','Legacy propulsion label aligned to the documented direct-shaft and V-drive production history.',trojan)
normalize_us_tank('TROJ-36-TR','HoldingCapacity',40,'Powerboat Guide publishes 40 gal waste capacity and a current model-specific Canadian example explicitly identifies 40 US gal. Canonical storage is litres.',trojan)
# Fuel and water capacities changed among 150/220/300 and 65/85 gal; do not flatten into one canonical capacity.

# UNIFLITE 36 DOUBLE CABIN
unif=['https://www.hmy.com/yachting/powerboat-guide/uniflite/36-double-cabin-1972-84','https://www.hmy.com/yachting/powerboat-guide/uniflite/36-sport-sedan-1970-79','https://seattle.boatshed.com/uniflite_36_sedan-boat-160556.html']
upd('UNIF-36-DO','LWL',m(33.0),'Powerboat Guide states the 36 Sport Sedan uses the same solid-fiberglass hull as the 36 Double Cabin; a model-specific 36 Sedan record publishes 33 ft LWL. Promoted as the shared-hull representative LWL.',unif,'m')
upd('UNIF-36-DO','LWL_ft',33.0,'Legacy LWL corrected from 33.2 ft to the supported 33 ft shared-hull figure.',unif,'ft')
upd('UNIF-36-DO','FuelCode','fuel.mixed','Powerboat Guide states gasoline engines were standard but diesel engines were available. Gasoline-only Plan classification would incorrectly exclude factory diesel examples.',unif)
upd('UNIF-36-DO','Fuel','Gasoline or Diesel','Legacy fuel label aligned to mixed production availability.',unif)
normalize_us_tank('UNIF-36-DO','WaterCapacity',100,'Powerboat Guide publishes 100 gal water capacity for this US-built model. Canonical storage is litres with preserved US-gallon value.',unif)
# Fuel was 200 gal standard / 300 gal optional; keep tank capacity unresolved as a single canonical model value.
# HMY documents a shallow keel for the shared hull, but current keel taxonomy has no accurate "shallow directional keel" value; do not force it into full/protective/skeg categories.

json.dump(records,open(boat_path,'w',encoding='utf-8'),indent=2,ensure_ascii=False); open(boat_path,'a').write('\n')

batch={'release':'6.53.0','batch':'specification-completion-08','manufacturers':['Monk','Ocean Alexander','Trojan','Tollycraft','Uniflite'],'updateCount':len(updates),'updates':updates}
json.dump(batch,open(root/'data/specification-completion-batch-08-v6.53.json','w',encoding='utf-8'),indent=2,ensure_ascii=False); open(root/'data/specification-completion-batch-08-v6.53.json','a').write('\n')

fields=['LOA','LWL','Beam','Draft','AirDraft','Displacement','FuelCode','MechanicalPropulsionCode','HullBehaviourCode','KeelConfigurationCode','RudderTypeCode']
missingCounts={f:0 for f in fields}; manufacturerMissingCounts={}; models=[]
for r in records:
    mc=manufacturerMissingCounts.setdefault(r['Manufacturer'],{x:0 for x in fields}); miss=[]
    for f in fields:
        v=r.get(f)
        if v is None or v=='': miss.append(f); missingCounts[f]+=1; mc[f]+=1
    if miss:
        models.append({'BoatModelID':r['BoatModelID'],'Manufacturer':r['Manufacturer'],'Model':r.get('Model'),'Variant':r.get('Variant'),'MissingFields':miss})
queue={'release':'6.53.0','fields':fields,'missingCounts':missingCounts,'manufacturerMissingCounts':manufacturerMissingCounts,'models':models}
json.dump(queue,open(root/'data/specification-research-queue-v6.53.json','w',encoding='utf-8'),indent=2,ensure_ascii=False); open(root/'data/specification-research-queue-v6.53.json','a').write('\n')

# package version
pkg=json.load(open(root/'package.json',encoding='utf-8')); pkg['version']='6.53.0'; json.dump(pkg,open(root/'package.json','w',encoding='utf-8'),indent=2); open(root/'package.json','a').write('\n')
print('updates',len(updates)); print('missing',missingCounts)
