import json, math, os
from copy import deepcopy
root='/mnt/data/batlas651'
p=os.path.join(root,'boatmodels.json')
data=json.load(open(p))
boats=data if isinstance(data,list) else data['models']
by={b['BoatModelID']:b for b in boats}
updates=[]

def upd(id,field,new,basis,refs,unit=None):
    b=by[id]; old=b.get(field)
    if old==new: return
    b[field]=new
    u={'BoatModelID':id,'Field':field,'Old':old,'New':new,'Basis':basis,'EvidenceRefs':refs}
    if unit: u['Unit']=unit
    updates.append(u)

def ft(feet,inches=0): return round((feet+inches/12)*0.3048,4)
def kg(lb): return round(lb*0.45359237,1)
def L(gal): return round(gal*3.78541,2)

HMY_SILV34='https://www.hmy.com/yachting/powerboat-guide/silverton/34-motor-yacht-1993-96'
HMY_SILV352='https://www.hmy.com/yachting/powerboat-guide/silverton/352-motor-yacht-1997-2002'
HMY_SILV372='https://www.hmy.com/yachting/powerboat-guide/silverton/372-392-motor-yacht-1996-2001'
HMY_SILV40='https://www.hmy.com/yachting/powerboat-guide/silverton/40-aft-cabin-1982-90'
HMY_SR84='https://www.hmy.com/yachting/powerboat-guide/sea-ray/340-sundancer-1984-89'
HMY_SR99='https://www.hmy.com/yachting/powerboat-guide/sea-ray/340-sundancer-1999-2002'
HMY_SR03='https://www.hmy.com/yachting/powerboat-guide/sea-ray/340-sundancer-2003-08'
HMY_SR390='https://www.hmy.com/yachting/powerboat-guide/sea-ray/390-motor-yacht-40-motor-yacht-2003-07'
HMY_M341='https://www.hmy.com/yachting/powerboat-guide/meridian/341-sedan-2005-14'
HMY_M34103='https://www.hmy.com/yachting/powerboat-guide/meridian/341-sedan-2003-04'
HMY_M381='https://www.hmy.com/yachting/powerboat-guide/meridian/381-sedan-2003-06'
AT34='https://cdn.denisonyachtsales.com/boat-guide-pdfs/American%20Tug%2034.pdf'
AT365='https://www.americantug.com/tour/at-365/'
AT395='https://www.americantug.com/tour/at-395/'
FJ36O='https://www.devalk.nl/en/yachtbrokerage/500777/FJORD-36-OPEN.html'
FJ40C='https://www.devalk.nl/en/yachtbrokerage/500843/FJORD-40-CRUISER.html'
FJ40O='https://www.devalk.nl/en/yachtbrokerage/501359/FJORD-40-OPEN.html'

# American Tug 34 canonical dimensions and keel/rudder architecture.
upd('AMTG-34','LOA',ft(34,5),'PowerBoat Guide publishes 34 ft 5 in LOA for the 2001–09 American Tug 34.',[AT34],'m')
upd('AMTG-34','LWL',ft(32,9),'PowerBoat Guide publishes 32 ft 9 in LWL.',[AT34],'m')
upd('AMTG-34','Beam',ft(13,3),'PowerBoat Guide publishes 13 ft 3 in beam.',[AT34],'m')
upd('AMTG-34','Draft',ft(3,5),'PowerBoat Guide publishes 3 ft 5 in draft.',[AT34],'m')
upd('AMTG-34','Displacement',kg(20000),'PowerBoat Guide publishes 20,000 lb displacement.',[AT34],'kg')
upd('AMTG-34','KeelConfigurationCode','keel.full_long','Model guide explicitly describes a full-length keel; replaces the weaker partial-skeg classification.',[AT34])
# Composite skeg supports rudder: explicit mechanical architecture for 34/365/395 family.
for id,ref in [('AMTG-34','https://www.denisonyachtsales.com/yachts-for-sale/next-chapter-34-american-tug'),('AMTG-365',AT365),('AMTG-395',AT395)]:
    upd(id,'RudderTypeCode','rudder.skeg_hung','Documented skeg supports/protects the rudder, supporting skeg-hung classification.',[ref])
# Explicit factory gallon/litre pairs normalize American Tug tankage.
for id,water,ref in [('AMTG-34',150,AT34),('AMTG-365',120,AT365),('AMTG-395',120,AT395)]:
    for fld,gal in [('FuelCapacity',400),('WaterCapacity',water),('HoldingCapacity',45)]:
        upd(id,fld,L(gal),'Published US-market tankage normalized to canonical litres.',[ref],'L')
        upd(id,fld+'UnitStatus','canonical_litres','Source gives gallon values with matching litre conversion (factory for current models; US technical guide for 34).',[ref])

# Fjord IPS models: no separate rudder. Leave 36 Cruiser unresolved because its drive architecture is not firmly documented.
for id,ref in [('FJRD-36-OPEN',FJ36O),('FJRD-40',FJ40C),('FJRD-40-OPEN',FJ40O)]:
    upd(id,'RudderTypeCode','rudder.none_external_drive','Volvo IPS steerable pod propulsion has no separate conventional rudder.',[ref])
upd('FJRD-36-OPEN','AirDraft',2.9,'De Valk model-specific specification publishes 2.90 m air draft (2.75 m minimum).',[FJ36O],'m')
upd('FJRD-36-OPEN','AirDraft_ft',round(2.9/0.3048,2),'Legacy imperial shadow aligned to 2.90 m published air draft.',[FJ36O],'ft')
# Correct obvious gallon-like values in 40 Cruiser where litre source is explicit.
upd('FJRD-40','FuelCapacity',1000,'Model-specific European specification publishes 1,000 L fuel capacity.',[FJ40C],'L')
upd('FJRD-40','WaterCapacity',340,'Model-specific European specification publishes 340 L freshwater capacity.',[FJ40C],'L')
upd('FJRD-40','FuelCapacityUnitStatus','canonical_litres','Source publishes litres directly.',[FJ40C])
upd('FJRD-40','WaterCapacityUnitStatus','canonical_litres','Source publishes litres directly.',[FJ40C])

# Meridian bridge clearances and 2003-04 generation tank correction.
for id,clear,ref in [('MERI-341-SE',ft(14,1),HMY_M341),('MERI-381-SE',ft(14,1),HMY_M381),('MERI-341-SE-03',ft(13,6),HMY_M34103)]:
    upd(id,'AirDraft',clear,'HMY Powerboat Guide publishes model-specific clearance.',[ref],'m')
    upd(id,'AirDraft_ft',round(clear/0.3048,2),'Imperial shadow aligned to published clearance.',[ref],'ft')
# Original 341 generation tankage was copied from later generation; correct it.
for fld,gal in [('FuelCapacity',224),('WaterCapacity',92),('HoldingCapacity',30)]:
    upd('MERI-341-SE-03',fld,L(gal),'2003–04 Meridian 341 model guide publishes generation-specific tankage; normalized assuming US gallons.',[HMY_M34103],'L')
    upd('MERI-341-SE-03',fld+'Gal',gal,'Generation-specific gallon shadow corrected to 2003–04 specification.',[HMY_M34103],'US gal')
    upd('MERI-341-SE-03',fld+'UnitStatus','canonical_litres_assumed_us_gal','US technical guide gallon value converted to canonical litres; gallon basis retained as assumed US.',[HMY_M34103])
# Fix generation-specific imperial shadows that still held later-generation values.
for field,new in [('LOA_ft',35.25),('Beam_ft',11+8/12),('Draft_ft',3+2/12),('Displacement_lb',17000)]:
    upd('MERI-341-SE-03',field,round(new,2),'Imperial shadow aligned to 2003–04 generation specification.',[HMY_M34103], 'ft' if field!='Displacement_lb' else 'lb')

# Sea Ray generation repair: propulsion + imperial shadows + first-generation tank shadows.
upd('SEAR-340-SU-99','MechanicalPropulsionCode','mechanical_propulsion.v_drive','HMY explicitly documents V-drive gas inboards for the 1999–2002 340 Sundancer.',[HMY_SR99])
# Gen1 shadows
for field,new,unit in [('LOA_ft',35+11/12,'ft'),('Beam_ft',11+11/12,'ft'),('Draft_ft',2+5/12,'ft'),('Displacement_lb',12500,'lb')]:
    upd('SEAR-340-SU',field,round(new,2),'Imperial shadow aligned to 1984–89 HMY specification.',[HMY_SR84],unit)
upd('SEAR-340-SU','FuelCapacityGal',172,'1984–89 HMY specification lists 172 gal fuel; replaces later-generation 225 gal shadow.',[HMY_SR84],'gal')
upd('SEAR-340-SU','WaterCapacityGal',52,'1984–89 HMY specification lists 52 gal water; replaces later-generation 45 gal shadow.',[HMY_SR84],'gal')
# Existing canonical litre values already equal 172 and 52 US-gal conversions.
upd('SEAR-340-SU','FuelCapacityUnitStatus','canonical_litres_assumed_us_gal','Canonical litre value matches the generation-specific 172-gal HMY figure.',[HMY_SR84])
upd('SEAR-340-SU','WaterCapacityUnitStatus','canonical_litres_assumed_us_gal','Canonical litre value matches the generation-specific 52-gal HMY figure.',[HMY_SR84])
# Gen2 shadows
for field,new,unit in [('LOA_ft',33.5,'ft'),('Beam_ft',11+5/12,'ft'),('Draft_ft',2+5/12,'ft'),('Displacement_lb',13000,'lb')]:
    upd('SEAR-340-SU-99',field,round(new,2),'Imperial shadow aligned to 1999–2002 HMY specification.',[HMY_SR99],unit)
upd('SEAR-340-SU-99','WaterCapacityGal',40,'1999–2002 HMY specification lists 40 gal water.',[HMY_SR99],'gal')
upd('SEAR-340-SU-99','WaterCapacityUnitStatus','canonical_litres_assumed_us_gal','Canonical litre value matches the generation-specific 40-gal HMY figure.',[HMY_SR99])
# Gen3 shadows
for field,new,unit in [('LOA_ft',37.5,'ft'),('Beam_ft',12,'ft'),('Draft_ft',3+1/12,'ft'),('Displacement_lb',15500,'lb')]:
    upd('SEAR-340-SU-03',field,round(new,2),'Imperial shadow aligned to 2003–08 HMY specification.',[HMY_SR03],unit)
# Holding status for gen2/gen3 is explicitly 28 gal in HMY.
for id,ref in [('SEAR-340-SU-99',HMY_SR99),('SEAR-340-SU-03',HMY_SR03)]:
    upd(id,'HoldingCapacityGal',28,'Generation-specific HMY specification lists 28 gal waste.',[ref],'gal')
    upd(id,'HoldingCapacityUnitStatus','canonical_litres_assumed_us_gal','Canonical litre value matches 28-gal published waste capacity.',[ref])
# 390 MY already canonical but holding unit can be resolved to 54 gal.
upd('SEAR-390-MO','HoldingCapacityGal',54,'HMY model guide publishes 54 gal waste capacity.',[HMY_SR390],'gal')
upd('SEAR-390-MO','HoldingCapacityUnitStatus','canonical_litres_assumed_us_gal','Canonical litre value matches 54-gal published waste capacity.',[HMY_SR390])

# Silverton: bridge clearances and shadow-field reconciliation.
for id,feet_,inch_,ref in [('SILV-352-MO',16,2,HMY_SILV352),('SILV-372',16,5,HMY_SILV372),('SILV-40-AC',13,6,HMY_SILV40)]:
    m=ft(feet_,inch_)
    upd(id,'AirDraft',m,'HMY Powerboat Guide publishes model-specific clearance.',[ref],'m')
    upd(id,'AirDraft_ft',round(feet_+inch_/12,2),'Imperial shadow aligned to published clearance.',[ref],'ft')
# 34 MY shadows and tank conflict cleanup.
for field,new,unit in [('LOA_ft',39+10/12,'ft'),('Draft_ft',3,'ft'),('Displacement_lb',16368,'lb')]:
    upd('SILV-34-MO',field,round(new,2),'Imperial shadow aligned to HMY 34 Motor Yacht specification.',[HMY_SILV34],unit)
for fld,gal in [('FuelCapacity',260),('WaterCapacity',74),('HoldingCapacity',45)]:
    upd('SILV-34-MO',fld,L(gal),'HMY model guide resolves conflicting legacy capacity value; normalized assuming US gallons.',[HMY_SILV34],'L')
    upd('SILV-34-MO',fld+'Gal',gal,'Gallon shadow aligned to HMY model-specific specification.',[HMY_SILV34],'gal')
    upd('SILV-34-MO',fld+'UnitStatus','canonical_litres_assumed_us_gal','US technical guide gallon value converted to canonical litres.',[HMY_SILV34])

# Save
with open(p,'w') as f: json.dump(data,f,indent=2,ensure_ascii=False)
# Batch provenance
out={'release':'6.51.0','batch':'specification-completion-06','manufacturers':['Silverton','Sea Ray','Fjord','Meridian','American Tug'],'updateCount':len(updates),'updates':updates}
json.dump(out,open(os.path.join(root,'data/specification-completion-batch-06-v6.51.json'),'w'),indent=2,ensure_ascii=False)
print('updates',len(updates))
