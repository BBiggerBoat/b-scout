import json, pathlib
root=pathlib.Path('/mnt/data/batlas656')
boat_path=root/'boatmodels.json'
records=json.load(open(boat_path,encoding='utf-8'))
byid={r['BoatModelID']:r for r in records}
updates=[]
FT_TO_M=0.3048; LB_TO_KG=0.45359237; USG_TO_L=3.785411784

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
def normalize_us_tank(bid,base,gal,basis,refs):
    upd(bid,base,l(gal),basis,refs,'L'); upd(bid,base+'Gal',gal,basis,refs,'US gal'); upd(bid,base+'UnitStatus','canonical_litres',basis,refs)

# WINDY 26 SN
windy=['https://www.windyboats.com/company/previous-models/1980s/26-snekke/','https://canadianboating.ca/boat-reviews/windy-26-sn/','https://www.beekhuisyachtbrokers.com/en/sold-yachts/windy-26-sn-spitsgatter/']
upd('WIND-26-SN','Draft',0.72,'Model-specific Windy 26 SN broker specification publishes 7.75 x 2.93 x 0.72 m; this promotes the already-present imperial draft into the canonical metric field.',windy,'m')
upd('WIND-26-SN','Draft_ft',round(0.72/FT_TO_M,2),'Legacy imperial draft aligned to the 0.72 m model-specific specification.',windy,'ft')
upd('WIND-26-SN','AirDraft',2.30,'Model-specific Windy 26 SN broker specification explicitly publishes 2.30 m air draft.',windy,'m')
upd('WIND-26-SN','AirDraft_ft',round(2.30/FT_TO_M,2),'Legacy imperial air draft aligned to the explicit 2.30 m source value.',windy,'ft')
# Factory historical page gives 148 L fuel/116 L water while the 1984 Canadian test gives 32.5/25.5 gal and optional 47.9 gal fuel; preserve as conflict instead of flattening.
upd('WIND-26-SN','FuelCapacityUnitStatus','conflicting_legacy_capacity_values','Windy historical specifications publish 148 L fuel while the 1984 Canadian test publishes 32.5 gal standard and 47.9 gal optional. Capacity is configuration/source dependent and is not normalized to one number.',windy)
upd('WIND-26-SN','WaterCapacityUnitStatus','conflicting_legacy_capacity_values','Windy historical specifications publish 116 L fresh water while the 1984 Canadian test publishes 25.5 gal. Preserve the conflict rather than guessing gallon basis or model-year change.',windy)
# Rudder remains subtype-unknown: sources establish a large rudder behind a full-length skeg and emergency tiller, but do not explicitly state attachment geometry.

# NIMBLE NOMAD
nomad=['https://www.boats.com/reviews/nimble-nomad-used-boat-review/','https://www.breweryacht.com/listings/1996-nimble-25-nomad-tropical-muliphen/2804392','https://boats-from-usa.com/not-specified/nimble-nomad-210835']
upd('NMBL-24-NO','Draft',m(1+4/12),'Multiple exact-model 1996 Nomad records publish 16 in / 1 ft 4 in draft; canonical 2 ft value was too deep.',nomad,'m')
upd('NMBL-24-NO','Draft_ft',1+4/12,'Legacy draft aligned to the repeated 16-inch exact-model specification.',nomad,'ft')
upd('NMBL-24-NO','DraftFt',1+4/12,'Compatibility draft aligned to the repeated 16-inch exact-model specification.',nomad,'ft')
upd('NMBL-24-NO','LWL',m(22+4/12),'A detailed exact-model Nomad specification publishes 22 ft 4 in LWL; promoted with moderate confidence because factory dimensional tables are scarce.',nomad,'m')
upd('NMBL-24-NO','LWL_ft',22+4/12,'Legacy LWL aligned to the documented 22 ft 4 in exact-model specification.',nomad,'ft')
upd('NMBL-24-NO','RudderTypeCode','rudder.none_external_drive','The Nomad uses a single outboard mounted in a well; steering is through the outboard and there is no separate conventional rudder.',nomad)
upd('NMBL-24-NO','AirDraft_ft',None,'The inherited 8 ft air-draft fallback is not supported by the reviewed model-specific sources. Air draft remains unknown rather than being promoted from an undocumented shadow value.',nomad,'ft')
normalize_us_tank('NMBL-24-NO','FuelCapacity',24,'Boats.com documents a 24-gal fuel tank on a 1997 Nomad and a detailed 1996 brokerage specification explicitly identifies 24 US gal / 90.85 L.',nomad)
normalize_us_tank('NMBL-24-NO','WaterCapacity',26,'A detailed 1996 Nomad brokerage specification explicitly identifies 26 US gal / 98.42 L fresh water.',nomad)
upd('NMBL-24-NO','Displacement',kg(2450),'Boats.com used-boat review states 2,450 lb displacement for the reviewed 1997 Nomad; this corrects the inherited 4,000-lb-class canonical value.',nomad,'kg')
upd('NMBL-24-NO','Displacement_lb',2450,'Legacy displacement aligned to the Boats.com reviewed-boat specification.',nomad,'lb')
# Holding capacity remains unresolved; optional sanitation arrangements vary.

# NIMBLE WANDERER
wanderer=['https://www.cruisingworld.com/sailboats/nimble-wanderer/']
# 29'3" LWL and 2'10" draft are already canonical. Air draft is configuration-dependent because the Wanderer was sold with or without mast and the rig is tabernacle-stepped.
upd('NMBL-32-WA','AirDraft_ft',None,'Cruising World explicitly states the Wanderer was available with or without a mast and that the mast is tabernacle-stepped/lowerable. A single inherited 29.58 ft air-draft value is unsafe across the canonical power/optional-motorsailer record.',wanderer,'ft')

# PRAIRIE 29
p29=['https://www.hmy.com/yachting/powerboat-guide/prairie/29-coastal-cruiser-1978-81','https://prairieboatworks.org/prairie-29-coastal-cruiser/','https://marinesource.com/boat/prairie-boat-works-coastal-cruiser-1978-port-charlotte-a9c2d10b-for-sale']
upd('PRAI-29-TR','LWL',m(26),'Powerboat Guide publishes 26 ft LWL for the Prairie 29; this replaces the unsupported 27.4 ft inherited value.',p29,'m')
upd('PRAI-29-TR','LWL_ft',26.0,'Legacy LWL aligned to the model-specific Powerboat Guide specification.',p29,'ft')
upd('PRAI-29-TR','Displacement',kg(12000),'Powerboat Guide publishes 12,000 lb weight; canonical metric displacement aligned to that model-specific specification.',p29,'kg')
upd('PRAI-29-TR','Displacement_lb',12000,'Legacy displacement corrected from 12,500 lb to the published 12,000 lb model specification.',p29,'lb')
upd('PRAI-29-TR','AirDraft_ft',None,'A current refitted Prairie 29 publishes 14 ft to canvas and 17 ft to antenna, but these are equipment/refit-specific. The inherited 12.2 ft fallback is unsupported and removed.',p29,'ft')
normalize_us_tank('PRAI-29-TR','WaterCapacity',100,'Powerboat Guide publishes 100 gal water capacity for this US-built model; canonical storage normalized to litres.',p29)
normalize_us_tank('PRAI-29-TR','HoldingCapacity',40,'Powerboat Guide publishes 40 gal waste capacity; canonical storage normalized to litres.',p29)
# Fuel remains conflict/variable: archival Prairie material says 100-150 gal while Powerboat Guide gives 100 gal.

# PRAIRIE 36
p36=['https://prairieboatworks.org/prairie-36-coastal-cruiser/','https://www.hmy.com/yachting/powerboat-guide/atlantic/37-double-cabin-1982-92']
upd('PRAI-36-TR','LOA_ft',36+7/12,'Prairie archival material and Powerboat Guide publish 36 ft 7 in length.',p36,'ft')
upd('PRAI-36-TR','LengthFt',36+7/12,'Compatibility length aligned to the published 36 ft 7 in model specification.',p36,'ft')
upd('PRAI-36-TR','Beam_ft',13.75,'Legacy beam aligned to the published 13 ft 9 in specification.',p36,'ft')
upd('PRAI-36-TR','BeamFt',13.75,'Compatibility beam aligned to 13 ft 9 in.',p36,'ft')
upd('PRAI-36-TR','Draft_ft',3.25,'Legacy draft aligned to the published 3 ft 3 in specification.',p36,'ft')
upd('PRAI-36-TR','DraftFt',3.25,'Compatibility draft aligned to 3 ft 3 in.',p36,'ft')
upd('PRAI-36-TR','AirDraft_ft',19.75,'Prairie archival material and Powerboat Guide publish 19 ft 9 in mast-up clearance; stale 13.5 ft shadow corrected.',p36,'ft')
upd('PRAI-36-TR','Displacement_lb',22000,'Prairie archival material and Powerboat Guide publish 22,000 lb weight; stale 18,500 lb shadow corrected.',p36,'lb')
upd('PRAI-36-TR','LWL_ft',None,'No sufficiently authoritative waterline length was found for the Prairie 36/Atlantic 37 shared hull; the inherited 33.2 ft fallback is removed.',p36,'ft')
normalize_us_tank('PRAI-36-TR','HoldingCapacity',30,'Powerboat Guide publishes 30 gal waste capacity for the Prairie 36/Atlantic 37 shared design; canonical storage normalized to litres.',p36)
# Fuel/water vary by production: Prairie archive says 250 gal fuel, later 360; 200-225 water. Preserve existing conflict state rather than flattening.

# TRUE NORTH 34 ORIGINAL DIESEL
trun=['https://powerandmotoryacht.com/boats/boat-tests/true-north-34/','https://marinesource.com/boat/true-north-34-2009-annapolis-a8eb649b-for-sale','https://truenorth.yachts/about/','https://www.pearsonyachts.org/powerboats/pearson-true-north-33.html']
upd('TRUN-34','LWL',m(33+10/12),'A model-specific 2009 original-diesel True North 34 publishes 33 ft 10 in LWL. This is kept separate from later outboard-generation specifications.',trun,'m')
upd('TRUN-34','LWL_ft',33+10/12,'Legacy LWL aligned to the 2009 original-diesel model-specific measurement.',trun,'ft')
upd('TRUN-34','Displacement',kg(12500),'A model-specific 2009 original-diesel True North 34 publishes 12,500 lb dry weight; promoted as representative for this diesel canonical record.',trun,'kg')
upd('TRUN-34','Displacement_lb',12500,'Legacy displacement aligned to the model-specific 2009 original-diesel specification.',trun,'lb')
upd('TRUN-34','AirDraft_ft',None,'The inherited 10.8 ft air-draft fallback is not supported by reviewed original-diesel sources. Later outboard 34 specifications must not be reused for this generation.',trun,'ft')
normalize_us_tank('TRUN-34','FuelCapacity',180,'Power & Motoryacht documents the original inboard diesel True North 34 with a standard 180-gal fuel tank; canonical storage normalized to litres.',trun)
# Water capacity varies in surviving diesel examples and later outboards; keep current value unresolved rather than cross-generational normalization.
# Catalina/Pearson sources establish skeg-protected prop/rudder but not the precise rudder attachment subtype, so RudderTypeCode remains unknown.

# HOLIDAY MANSION 38 BARRACUDA COASTAL
hm=['https://www.ontariomarinebrokers.ca/1988HolidayMansion38HouseboatOntario.html','https://sjyachts.com/all-yachts-for-sale/1987-holiday-mansion-costal-barracuda-38-2852248/','https://www.boatsdata.com/1988-holiday-mansion-barracuda-coastal-cruiserhouseboat-1972/specs']
upd('HLMN-38-CO','MechanicalPropulsionCode','mechanical_propulsion.mixed','Exact-model evidence documents both Volvo sterndrive installations and Crusader V-drive inboards. Model-wide propulsion must therefore remain configuration-dependent.',hm)
upd('HLMN-38-CO','Propulsion','Sterndrive or V-Drive','Legacy propulsion corrected from shaft-only to the documented mixed sterndrive/V-drive configurations.',hm)
upd('HLMN-38-CO','NormalizedPropulsion','Mixed','Legacy normalized propulsion aligned to the canonical mixed classification.',hm)
upd('HLMN-38-CO','AirDraft_ft',None,'The inherited 11.5 ft air-draft fallback is not supported by reviewed exact-model evidence and upper-structure configuration varies; preserve Unknown.',hm,'ft')
upd('HLMN-38-CO','LWL_ft',None,'A marketplace source reports an impossible/inconsistent 38 ft 10 in LWL on a 38 ft LOA boat. The inherited 35 ft LWL fallback has no reliable support and is removed.',hm,'ft')
# Rudder/keel remain unresolved because sterndrive boats have no separate rudder while V-drive inboards do; the mixed-production identity cannot safely carry one subtype.
# Tankage varies dramatically among exact-model examples (140-150 fuel; 10-100 water; 30-40 holding), so keep unit/value conflicts unresolved.

json.dump(records,open(boat_path,'w',encoding='utf-8'),indent=2,ensure_ascii=False); open(boat_path,'a').write('\n')

batch={'release':'6.56.0','batch':'specification-completion-11','manufacturers':['Windy','True North','Prairie','Nimble','Holiday Mansion'],'updateCount':len(updates),'updates':updates}
json.dump(batch,open(root/'data/specification-completion-batch-11-v6.56.json','w',encoding='utf-8'),indent=2,ensure_ascii=False); open(root/'data/specification-completion-batch-11-v6.56.json','a').write('\n')

fields=['LOA','LWL','Beam','Draft','AirDraft','Displacement','FuelCode','MechanicalPropulsionCode','HullBehaviourCode','KeelConfigurationCode','RudderTypeCode']
missingCounts={f:0 for f in fields}; manufacturerMissingCounts={}; recs=[]
for r in records:
    mc=manufacturerMissingCounts.setdefault(r['Manufacturer'],{x:0 for x in fields}); miss=[]
    for f in fields:
        v=r.get(f)
        if v is None or v=='': miss.append(f); missingCounts[f]+=1; mc[f]+=1
    if miss: recs.append({'BoatModelID':r['BoatModelID'],'Manufacturer':r['Manufacturer'],'Model':r.get('Model'),'Variant':r.get('Variant'),'MissingFields':miss})
queue={'release':'6.56.0','fields':fields,'missingCounts':missingCounts,'manufacturerMissingCounts':manufacturerMissingCounts,'records':recs}
json.dump(queue,open(root/'data/specification-research-queue-v6.56.json','w',encoding='utf-8'),indent=2,ensure_ascii=False); open(root/'data/specification-research-queue-v6.56.json','a').write('\n')

pkg=json.load(open(root/'package.json',encoding='utf-8')); pkg['version']='6.56.0'; json.dump(pkg,open(root/'package.json','w',encoding='utf-8'),indent=2); open(root/'package.json','a').write('\n')
print('updates',len(updates)); print('missing',missingCounts)
