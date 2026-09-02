import json, os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
P=os.path.join(ROOT,'boatmodels.json')
models=json.load(open(P,encoding='utf-8'))
byid={m['BoatModelID']:m for m in models}
updates=[]
USGAL_TO_L=3.785411784
FT_TO_M=0.3048
LB_TO_KG=0.45359237

def setf(mid,field,new,basis,refs,unit=None):
    m=byid[mid]; old=m.get(field)
    if old==new: return
    m[field]=new
    u={'BoatModelID':mid,'Field':field,'Old':old,'New':new,'Basis':basis,'EvidenceRefs':refs}
    if unit: u['Unit']=unit
    updates.append(u)

def gal(mid,base,gallons,basis,refs):
    setf(mid,base,gallons*USGAL_TO_L,basis,refs,'L')
    setf(mid,base+'Gal',gallons,basis,refs,'US gal')
    setf(mid,base+'UnitStatus','canonical_litres',basis,refs)

def litres(mid,base,litres_value,basis,refs):
    setf(mid,base,litres_value,basis,refs,'L')
    setf(mid,base+'Gal',round(litres_value/USGAL_TO_L,2),basis,refs,'US gal equivalent')
    setf(mid,base+'UnitStatus','canonical_litres',basis,refs)

# Luhrs 30 Alura
refs=['https://www.hmy.com/yachting/powerboat-guide/luhrs/30-alura-1987-90','https://www.boattrader.com/boat/1988-luhrs-alura-10114290/']
setf('LUHR-30','LWL_ft',28.0,'HMY publishes 28 ft LWL; reconcile stale 27-ft imperial shadow.',refs,'ft')
setf('LUHR-30','AirDraft',11*FT_TO_M,'Exact-model 1988 listing publishes 11 ft bridge clearance; use as representative model clearance.',refs,'m')
setf('LUHR-30','Headroom_ft',6+4/12,'HMY publishes 6 ft 4 in interior headroom; align imperial display shadow with canonical value.',refs,'ft')
setf('LUHR-30','Propulsion','Shaft','HMY describes a single gasoline inboard in a full-keel hull; canonical mechanical propulsion is shaft, so clear stale Stern Drive shadow.',refs)
setf('LUHR-30','KeelType','Full Length','HMY explicitly describes the Alura 30 as a full-keel fishing boat; reconcile stale Modified V keel shadow.',refs)
gal('LUHR-30','FuelCapacity',196,'HMY publishes 196 gal fuel; normalize US-market specification to canonical litres.',refs)
gal('LUHR-30','WaterCapacity',38,'HMY publishes 38 gal water; normalize to canonical litres.',refs)
gal('LUHR-30','HoldingCapacity',15,'HMY publishes 15 gal waste; normalize to canonical litres.',refs)

# Nordhavn 40
refs=['https://nordhavn.com/nordhavn-yacht-models/retired-models/n40/','https://nordhavn.com/wp-content/uploads/2021/02/circumnavigatorII.pdf','https://archive.nordhavn.com/atw/specs/accommodations.htm']
setf('NRDH-40','Draft_ft',None,'Factory/period Nordhavn specifications conflict at approximately 4 ft 9 in, 5 ft 2 in and later representative examples around 5 ft 6 in; clear fixed legacy fallback and preserve canonical Unknown.',refs,'ft')
setf('NRDH-40','AirDraft_ft',None,'Published Nordhavn configurations vary materially by mast/tabernacle setup (factory period literature gives 29 ft mast-up/13 ft 6 in mast-down while representative boats report higher lowered profiles); clear fixed 15.5-ft fallback.',refs,'ft')
setf('NRDH-40','Headroom',6.25*FT_TO_M,'Nordhavn archive publishes 6 ft 3 in main-saloon headroom; use main saloon as canonical standing-headroom reference.',refs,'m')
setf('NRDH-40','Headroom_ft',6.25,'Nordhavn archive publishes 6 ft 3 in main-saloon headroom.',refs,'ft')
gal('NRDH-40','FuelCapacity',920,'Nordhavn factory publishes 920 US gal / 3,482.6 L fuel; normalize provenance.',refs)
gal('NRDH-40','WaterCapacity',220,'Nordhavn factory publishes 220 US gal / 832.8 L water; normalize provenance.',refs)
gal('NRDH-40','HoldingCapacity',68,'Nordhavn factory publishes 68 US gal / 257.4 L black-water capacity; normalize provenance.',refs)

# Oceania Yachts 36 Sedan
refs=['https://canadianboating.ca/boat-reviews/oceania-36-sedan/']
setf('OCEA-36-SE','LOA_ft',38.5,'Canadian Yachting September 1980 spec box publishes 38.5 ft length overall; reconcile stale 36.33-ft hull-length shadow.',refs,'ft')
setf('OCEA-36-SE','LWL_ft',None,'The reviewed original Canadian test does not publish LWL; clear unsupported 33.4-ft fallback.',refs,'ft')
setf('OCEA-36-SE','Beam_ft',12.5,'Canadian Yachting spec box publishes 12.5 ft beam (article text says 12 ft 2 in); canonical record already uses the spec-box value, so reconcile stale 12.92-ft shadow.',refs,'ft')
setf('OCEA-36-SE','AirDraft_ft',None,'The original Canadian test does not publish bridge clearance/air draft; clear unsupported 13.2-ft fallback.',refs,'ft')
setf('OCEA-36-SE','Displacement_lb',19000,'Canadian Yachting original test publishes 19,000 lb displacement; reconcile stale 21,000-lb shadow.',refs,'lb')
setf('OCEA-36-SE','EngineConfiguration','Single Ford Lehman 120 hp diesel','The original Canadian test documents a single Ford-Lehman 120 hp diesel; correct stale Twin Inboard shadow.',refs)
setf('OCEA-36-SE','TypicalEngineID','Ford Lehman 120','The original Canadian test documents a Ford-Lehman 120 hp diesel; correct stale 135-hp typical-engine shadow.',refs)
setf('OCEA-36-SE','HoldingCapacityGal',40,'Canadian Yachting original test publishes 40 gal holding capacity; retain gallon source value while the gallon basis remains assumed US for canonical conversion.',refs,'gal (basis assumed US)')
setf('OCEA-36-SE','HoldingCapacityUnitStatus','canonical_litres_assumed_us_gal','Original Canadian source publishes 40 gal but does not explicitly state US vs Imperial gallon; preserve existing assumed-US conversion semantics.',refs)

# PDQ 34 PowerCat
refs=['https://www.hmy.com/yachting/powerboat-guide/pdq/32-34-power-catamaran-2000-07','https://www.boattrader.com/boat/2004-pdq-34-power-catamaran-10208873/','https://yachtr.com/34-pdq-2005-2798853/']
setf('PDQB-34-PA','LOA_ft',34.5,'HMY publishes 34 ft 6 in LOA for the lengthened PDQ 34; reconcile stale nominal 34-ft shadow.',refs,'ft')
setf('PDQB-34-PA','LWL_ft',33+11/12,'HMY publishes 33 ft 11 in LWL; reconcile stale 32.5-ft shadow.',refs,'ft')
setf('PDQB-34-PA','AirDraft',12.25*FT_TO_M,'HMY and exact-model records publish 12 ft 3 in clearance.',refs,'m')
setf('PDQB-34-PA','AirDraft_ft',12.25,'HMY and exact-model records publish 12 ft 3 in clearance.',refs,'ft')
setf('PDQB-34-PA','Displacement_lb',12000,'HMY publishes 12,000 lb representative weight; reconcile stale 15,000-lb shadow.',refs,'lb')
setf('PDQB-34-PA','RudderTypeCode','rudder.twin','HMY explicitly describes protected props and rudders in the plural on the twin-shaft catamaran; classify as twin rudders without inferring attachment geometry.',refs)
setf('PDQB-34-PA','Headroom',6.5*FT_TO_M,'Exact-model listing publishes 6 ft 6 in cabin headroom.',refs,'m')
setf('PDQB-34-PA','Headroom_ft',6.5,'Exact-model listing publishes 6 ft 6 in cabin headroom.',refs,'ft')
gal('PDQB-34-PA','FuelCapacity',184,'HMY and exact-model sources consistently publish 184 US gal fuel.',refs)
gal('PDQB-34-PA','WaterCapacity',80,'HMY and exact-model sources consistently publish 80 US gal water.',refs)
setf('PDQB-34-PA','HoldingCapacity',None,'Reviewed exact-model and guide sources conflict at approximately 35, 38 and 45 gal holding capacity; preserve Unknown rather than generalize one installation.',refs,'L')
setf('PDQB-34-PA','HoldingCapacityGal',None,'Reviewed exact-model and guide sources conflict at approximately 35, 38 and 45 gal holding capacity.',refs,'US gal')
setf('PDQB-34-PA','HoldingCapacityUnitStatus','conflicting_legacy_capacity_values','Model-specific sources conflict on holding capacity (35/38/45 gal); mark conflict explicitly.',refs)

# Saga 26 HT
refs=['https://www.maringuiden.se/batguiden/%3BbatID%3D304%26battypID%3D21','https://wales.boatshed.com/saga_26ht-boat-165654.html','https://www.svb-marine.fr/ownersclub/44652']
setf('SAGA-26-HT','LWL_ft',None,'Reviewed Saga/model sources do not publish a defensible LWL; clear unsupported 23.8-ft fallback.',refs,'ft')
setf('SAGA-26-HT','Draft',None,'Saga 26 HT was offered as semi-planing keel/rudder and full-planing sterndrive versions; published draft varies roughly 0.8-1.0 m, so preserve configuration-dependent Unknown.',refs,'m')
setf('SAGA-26-HT','Draft_ft',None,'Saga 26 HT draft varies by documented version; clear fixed imperial fallback.',refs,'ft')
setf('SAGA-26-HT','AirDraft_ft',None,'No reviewed source supports a model-wide 8.8-ft air draft; clear unsupported fallback.',refs,'ft')
setf('SAGA-26-HT','MechanicalPropulsionCode','mechanical_propulsion.mixed','Maringuiden documents both semi-planing keel/rudder versions and full-planing V-bottom sterndrive versions under the Saga 26 HT identity.',refs)
setf('SAGA-26-HT','Propulsion','Mixed: shaft or sterndrive by version','Saga 26 HT was offered in shaft/keel-rudder and sterndrive configurations.',refs)
setf('SAGA-26-HT','HullBehaviourCode','hull_behaviour.unknown','The marketed identity spans semi-planing and full-planing versions; one normalized behaviour would cause false Plan exclusions, so preserve Unknown.',refs)
setf('SAGA-26-HT','HullBehaviour','Configuration-dependent: semi-planing or planing','The Saga 26 HT was offered in semi-planing and full-planing versions.',refs)
setf('SAGA-26-HT','KeelConfigurationCode',None,'Keel/rudder applies to the semi-planing version while the full-planing sterndrive version uses a V-bottom; one canonical keel type would be misleading.',refs)
setf('SAGA-26-HT','KeelType','Configuration-dependent: keel/rudder or V-bottom sterndrive','Documented versions use materially different underwater configurations.',refs)
setf('SAGA-26-HT','Headroom',1.85,'Exact-model Boatshed specification publishes 1.85 m headroom.',refs,'m')
setf('SAGA-26-HT','Headroom_ft',1.85/FT_TO_M,'Exact-model Boatshed specification publishes 1.85 m headroom.',refs,'ft')
litres('SAGA-26-HT','FuelCapacity',200,'Maringuiden and exact-model sources publish a 200 L fuel tank; correct gallon-equivalent value that had been stored in the litre field.',refs)
setf('SAGA-26-HT','WaterCapacity',None,'Reviewed sources conflict at 95 L and 105 L water; preserve Unknown rather than generalize.',refs,'L')
setf('SAGA-26-HT','WaterCapacityGal',None,'Reviewed sources conflict at 95 L and 105 L water.',refs,'US gal equivalent')
setf('SAGA-26-HT','WaterCapacityUnitStatus','conflicting_legacy_capacity_values','Model-specific sources conflict at 95 L and 105 L water capacity.',refs)
setf('SAGA-26-HT','HoldingCapacity',None,'A specific 1999 boat publishes 55 L holding, while the inherited 20 value lacks a verified model-wide basis; preserve Unknown.',refs,'L')
setf('SAGA-26-HT','HoldingCapacityGal',None,'No model-wide holding capacity was verified.',refs,'US gal equivalent')
setf('SAGA-26-HT','HoldingCapacityUnitStatus','unknown','No reliable model-wide holding capacity was established.',refs)

with open(P,'w',encoding='utf-8') as f:
    json.dump(models,f,indent=2,ensure_ascii=False); f.write('\n')
out={'release':'6.59.0','batch':'specification-completion-13','manufacturers':['Luhrs','Nordhavn','Oceania Yachts','PDQ','Saga'],'updateCount':len(updates),'updates':updates}
with open(os.path.join(ROOT,'data','specification-completion-batch-13-v6.59.json'),'w',encoding='utf-8') as f:
    json.dump(out,f,indent=2,ensure_ascii=False); f.write('\n')
print('updates',len(updates))
