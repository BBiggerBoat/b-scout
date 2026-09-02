import json, math, copy
from pathlib import Path
P=Path('.')
models=json.load(open('boatmodels.json',encoding='utf-8'))
byid={r['BoatModelID']:r for r in models}
updates=[]

def setf(id,field,new,basis,refs,unit=None):
    r=byid[id]; old=r.get(field)
    if old==new: return
    r[field]=new
    u={'BoatModelID':id,'Field':field,'Old':old,'New':new,'Basis':basis,'EvidenceRefs':refs}
    if unit: u['Unit']=unit
    updates.append(u)

def clear(id,field,basis,refs): setf(id,field,None,basis,refs)

def m_from_ft(ft): return ft*0.3048

def kg_from_lb(lb): return lb*0.45359237

def l_from_usg(g): return g*3.785411784

SEAP=['https://www.seapiper.com/wp-content/uploads/2020/07/SeaPiper-35-SPECIFICATION-9-2.pdf','https://www.seapiper.com/wp-content/uploads/2021/09/SeaPiper-35-SPECIFICATION-9-5.pdf']
# SeaPiper: factory 2020 spec basis.
setf('SEAP-35','LOA_ft',35+11/12,'Factory 2020 specification gives 35 ft 11 in hull length.',SEAP,'ft')
setf('SEAP-35','LWL_ft',33+5/12,'Factory 2020 specification gives 33 ft 5 in waterline length.',SEAP,'ft')
setf('SEAP-35','Draft_ft',2+11/12,'Factory 2020 specification gives 2 ft 11 in design draft.',SEAP,'ft')
setf('SEAP-35','Displacement_lb',16500,'Factory 2020 specification gives 16,500 lb design displacement.',SEAP,'lb')
setf('SEAP-35','Headroom',2.0,'Factory profile drawing gives 2.00 m / 6 ft 6 in centerline headroom in main interior areas.',SEAP,'m')
setf('SEAP-35','Headroom_ft',6+6/12,'Factory profile drawing gives 6 ft 6 in centerline headroom in main interior areas.',SEAP,'ft')
setf('SEAP-35','RudderTypeCode','rudder.skeg_hung','Factory specification describes a rudder with heel bearing, pintle/gudgeon and stainless skeg bar attached to the keel.',SEAP)
# Air draft varies by mast configuration and even factory revisions; clear fixed model-wide value.
clear('SEAP-35','AirDraft','Factory specifications document different mast-up values by revision and a lower mast-down clearance; one model-wide air draft is unsafe.',SEAP)
clear('SEAP-35','AirDraft_ft','Factory specifications distinguish mast-up and mast-down bridge clearance; fixed legacy shadow removed.',SEAP)
for fld,g in [('FuelCapacityGal',200),('WaterCapacityGal',80),('HoldingCapacityGal',22)]:
    setf('SEAP-35',fld,g,'Factory 2020 specification explicitly states US-gallon tank capacity.',SEAP,'US gal')
for fld,g in [('FuelCapacity',200),('WaterCapacity',80),('HoldingCapacity',22)]:
    setf('SEAP-35',fld,l_from_usg(g),'Canonical litres converted from factory 2020 US-gallon specification.',SEAP,'L')
for fld in ['FuelCapacityUnitStatus','WaterCapacityUnitStatus','HoldingCapacityUnitStatus']:
    setf('SEAP-35',fld,'canonical_litres','Factory 2020 specification explicitly identifies US gallons; canonical value stored in litres.',SEAP)
setf('SEAP-35','ResearchNotes',(byid['SEAP-35'].get('ResearchNotes','')+' Batch 14 final-tail review: factory 2020/2021 specification confirms principal dimensions, 6 ft 6 in main centerline headroom, skeg-supported rudder geometry and 200/80/22 US gal tankage. Fixed air draft cleared because factory revisions/configurations publish materially different mast-up/down clearances.').strip(),'Append Batch 14 provenance summary.',SEAP)

SEAL=['https://dailyboats.com/boat/309289-buy-sea-lord-34-double-cabin-trawler-for-sale','https://www.boatdealers.ca/boats-for-sale/542099/sealord-tricabin-hamilton-ontario']
# Sealord exact 1986/87 surviving examples. Tankage aligns with 200/100/25 US gal equivalents.
setf('SEAL-34-TC','HoldingCapacityGal',25,'Exact 1986 Sea Lord 34 listing reports 94 L holding capacity, equivalent to approximately 25 US gal.',SEAL,'US gal')
for fld,g in [('FuelCapacity',200),('WaterCapacity',100),('HoldingCapacity',25)]:
    setf('SEAL-34-TC',fld,l_from_usg(g),'Exact 1986 model listing reports litre capacities matching 200/100/25 US-gallon values.',SEAL,'L')
for fld in ['FuelCapacityUnitStatus','WaterCapacityUnitStatus','HoldingCapacityUnitStatus']:
    setf('SEAL-34-TC',fld,'canonical_litres','Exact 1986 model listing gives metric capacities matching 200/100/25 US gal; canonical values stored in litres.',SEAL)
setf('SEAL-34-TC','ResearchNotes',(byid['SEAL-34-TC'].get('ResearchNotes','')+' Batch 14 final-tail review: exact 1986/1987 surviving examples continue to support 34 ft class dimensions and twin Volvo diesels. Exact 1986 listing gives 757/378/94 L capacities, consistent with approximately 200/100/25 US gal. LWL, air draft and rudder subtype remain unverified.').strip(),'Append Batch 14 provenance summary.',SEAL)

SHAN=['https://shannonyachts.com/shannon_defiance38_specs.html','https://powerandmotoryacht.com/boats/boat-tests/shannon-38-srd-0/','https://passagemaker.com/cruiser-reviews/shannon-srd/']
# Shannon factory specs are authoritative.
setf('SHAN-38-SRD','LOA_ft',40.5,'Shannon factory Defiance 38 specification gives 40 ft 6 in LOA.',SHAN,'ft')
setf('SHAN-38-SRD','LWL_ft',37+7/12,'Shannon factory specification gives 37 ft 7 in LWL.',SHAN,'ft')
setf('SHAN-38-SRD','Displacement_lb',13500,'Shannon factory specification gives 13,500 lb displacement.',SHAN,'lb')
setf('SHAN-38-SRD','MechanicalPropulsionCode','mechanical_propulsion.mixed','Factory and period testing document conventional inboard shaft drives plus an available single surface-piercing drive configuration.',SHAN)
setf('SHAN-38-SRD','Propulsion','Mixed: conventional shaft inboards or surface-piercing drive','Factory and period sources document both conventional shaft and surface-drive configurations.',SHAN)
clear('SHAN-38-SRD','AirDraft_ft','No defensible factory model-wide bridge-clearance value was found for the 38 SRD; legacy 8.2-ft shadow removed.',SHAN)
# Factory standard spec: 290 fuel / 80 water; no holding quantity published.
for fld,g in [('FuelCapacityGal',290),('WaterCapacityGal',80)]: setf('SHAN-38-SRD',fld,g,'Shannon factory specification explicitly publishes gallon tankage.',SHAN,'US gal')
for fld,g in [('FuelCapacity',290),('WaterCapacity',80)]: setf('SHAN-38-SRD',fld,l_from_usg(g),'Canonical litres converted from Shannon factory gallon specification.',SHAN,'L')
for fld in ['FuelCapacityUnitStatus','WaterCapacityUnitStatus']: setf('SHAN-38-SRD',fld,'canonical_litres','Factory specification provides gallon capacity; canonical value stored in litres.',SHAN)
clear('SHAN-38-SRD','HoldingCapacity','Factory specification confirms a holding tank but does not publish capacity; unsupported fixed value removed.',SHAN)
clear('SHAN-38-SRD','HoldingCapacityGal','Factory specification confirms a holding tank but does not publish capacity.',SHAN)
setf('SHAN-38-SRD','HoldingCapacityUnitStatus','unknown','Holding tank exists but factory capacity was not established.',SHAN)
setf('SHAN-38-SRD','ResearchNotes',(byid['SHAN-38-SRD'].get('ResearchNotes','')+' Batch 14 final-tail review: Shannon factory specification resolves 40 ft 6 in LOA, 37 ft 7 in LWL, 13,500 lb displacement, and 290/80 gal fuel/water. Mechanical propulsion is configuration-dependent: conventional shafts and a surface-piercing-drive version were both documented. Unsupported air-draft and holding-capacity values were removed.').strip(),'Append Batch 14 provenance summary.',SHAN)

TP=['https://www.crusaderyachts.com/listings/1989-eagle-32-32-trawler-kindred-spirit/2788685/','https://seattle.boatshed.com/eagle_32-boat-142700.html','https://ca.boats.com/power-boats/1987-transpacific-marine-eagle-32-trawler-10144328/','https://bronteshore.ca/current_listings/1986-eagle-marine-trawler/']
# Eagle 32: geometry supported, tankage/displacement varies across surviving examples.
setf('TPMC-32-EA','RudderTypeCode','rudder.full_keel_attached','Exact 1989 Eagle 32 specification describes a full keel with inboard keel-shoe-hung rudder.',TP)
setf('TPMC-32-EA','Headroom',m_from_ft(6.25),'Exact 1985 and 1992 Eagle 32 examples report 6 ft 3 in cabin headroom.',TP,'m')
setf('TPMC-32-EA','Headroom_ft',6.25,'Exact 1985 and 1992 Eagle 32 examples report 6 ft 3 in cabin headroom.',TP,'ft')
# Tankage varies materially by boat/year; clear pseudo-canonical gallon-like values.
for fld in ['FuelCapacity','WaterCapacity','HoldingCapacity','FuelCapacityGal','WaterCapacityGal','HoldingCapacityGal']:
    clear('TPMC-32-EA',fld,'Exact Eagle 32 examples show materially different tankage across years/refits (e.g. 150-180 gal fuel, 75-180 gal water, 20-25 gal holding); no safe model-wide standard.',TP)
for fld in ['FuelCapacityUnitStatus','WaterCapacityUnitStatus','HoldingCapacityUnitStatus']:
    setf('TPMC-32-EA',fld,'unknown','Tank capacity is configuration/year/refit dependent across exact surviving Eagle 32 examples.',TP)
# Displacement also varies 13,000-17,000 across surviving boats; preserve canonical representative for now but note variability.
setf('TPMC-32-EA','ResearchNotes',(byid['TPMC-32-EA'].get('ResearchNotes','')+' Batch 14 final-tail review: exact 1989 documentation establishes a full keel with keel-shoe-hung rudder; multiple exact examples support 6 ft 3 in headroom. Tankage varies materially across surviving boats/refits and is therefore cleared from model-wide canonical capacity fields. Published displacement also varies by example/loading and should be treated as representative, not invariant.').strip(),'Append Batch 14 provenance summary.',TP)

# Write canonical data
json.dump(models,open('boatmodels.json','w',encoding='utf-8'),ensure_ascii=False,indent=2)

# Audit artifact
artifact={'release':'6.60.0','batch':14,'manufacturers':['SeaPiper','Sealord','Shannon','Transpacific Marine'],'updateCount':len(updates),'updates':updates}
json.dump(artifact,open('data/specification-completion-batch-14-v6.60.json','w',encoding='utf-8'),ensure_ascii=False,indent=2)

# Residual counts and queue
fields=['LOA','LWL','Beam','Draft','AirDraft','Displacement','FuelCode','MechanicalPropulsionCode','HullBehaviourCode','KeelConfigurationCode','RudderTypeCode','Headroom']
missing={f:sum(1 for r in models if r.get(f) in (None,'', 'rudder.unknown')) for f in fields}
# handle unknown enums for keel/hull/mech/fuel explicitly
for f,unknowns in {
 'FuelCode':{'fuel.unknown'},'MechanicalPropulsionCode':{'mechanical_propulsion.unknown'},'HullBehaviourCode':{'hull_behaviour.unknown'},'KeelConfigurationCode':{'keel.unknown'},'RudderTypeCode':{'rudder.unknown'}
}.items():
 missing[f]=sum(1 for r in models if r.get(f) in (None,'') or r.get(f) in unknowns)
queue={'release':'6.60.0','generatedFrom':'boatmodels.json','canonicalModelCount':len(models),'globalMissingCounts':missing,'headroomMissingCount':missing['Headroom'],'records':[]}
for r in models:
 gaps=[f for f in fields if (r.get(f) in (None,'') or (f=='RudderTypeCode' and r.get(f)=='rudder.unknown') or (f=='KeelConfigurationCode' and r.get(f)=='keel.unknown') or (f=='HullBehaviourCode' and r.get(f)=='hull_behaviour.unknown') or (f=='MechanicalPropulsionCode' and r.get(f)=='mechanical_propulsion.unknown') or (f=='FuelCode' and r.get(f)=='fuel.unknown'))]
 if gaps: queue['records'].append({'BoatModelID':r['BoatModelID'],'Manufacturer':r.get('Manufacturer'),'Model':r.get('Model'),'Missing':gaps})
json.dump(queue,open('data/specification-research-queue-v6.60.json','w',encoding='utf-8'),ensure_ascii=False,indent=2)
json.dump({'release':'6.60.0','completedManufacturerCount':69,'manufacturerCount':69,'unreviewedManufacturerCount':0,'unreviewedManufacturers':[],'unreviewedModelCount':0},open('data/specification-tail-status-v6.60.json','w',encoding='utf-8'),indent=2)
print('updates',len(updates)); print('missing',missing)
