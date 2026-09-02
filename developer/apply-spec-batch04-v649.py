import json, pathlib
root=pathlib.Path('/mnt/data/batlas649')
boat_path=root/'boatmodels.json'
records=json.load(open(boat_path,encoding='utf-8'))
byid={r['BoatModelID']:r for r in records}
updates=[]
FT_TO_M=0.3048
LB_TO_KG=0.45359237

def m(ft): return round(ft*FT_TO_M,4)
def kg(lb): return round(lb*LB_TO_KG,1)

def upd(bid,field,new,basis,refs,unit=None):
    r=byid[bid]; old=r.get(field)
    if old==new: return
    if isinstance(old,(int,float)) and isinstance(new,(int,float)) and abs(old-new)<1e-9: return
    r[field]=new
    u={'BoatModelID':bid,'Field':field,'Old':old,'New':new,'Basis':basis,'EvidenceRefs':refs}
    if unit: u['Unit']=unit
    updates.append(u)

def update_existing_shadows(bid, value, basis, refs):
    r=byid[bid]
    for field in ('Displacement_lb','DisplacementLb'):
        if field in r and r.get(field)!=value:
            upd(bid,field,value,basis,refs,'lb')

# BACK COVE — factory data. Canonical values already carried several corrected metric figures;
# this pass fills genuine gaps and reconciles stale imperial shadows.
bc26=['https://www.backcoveyachts.com/pdf/bc26.pdf','https://www.backcoveyachts.com/owners/heritage-models/back-cove-26']
upd('BKCV-26','Displacement',kg(8500),'Factory brochure states estimated full-load displacement of 8,500 lb.',bc26,'kg')
update_existing_shadows('BKCV-26',8500,'Legacy imperial displacement aligned to factory full-load specification.',bc26)

bcfull=['https://www.backcoveyachts.com/backcove/wp-content/uploads/2017/03/BC_Full_Line_Bro_2017.pdf']
for bid,lb in [('BKCV-30',12300),('BKCV-34',16500),('BKCV-37',24300),('BKCV-41',29500)]:
    if byid[bid].get('Displacement') is None:
        upd(bid,'Displacement',kg(lb),f'Back Cove factory full-line brochure publishes {lb:,} lb displacement.',bcfull,'kg')
    update_existing_shadows(bid,lb,'Legacy imperial displacement reconciled to factory-published specification.',bcfull)

bc39=['https://www.backcoveyachts.com/motor-yachts/back-cove-39o']
upd('BKCV-39O','RudderTypeCode','rudder.none_external_drive','The 39O uses steerable outboards; there is no separate conventional rudder.',bc39)

# CAPE DORY — model-specific Powerboat Guide specifications.
cd30=['https://www.hmy.com/yachting/powerboat-guide/cape-dory/30-flybridge-1990-91']
upd('CPDR-30-FB','AirDraft',m(12+3/12),'Published model clearance is 12 ft 3 in.',cd30,'m')
cd33=['https://www.hmy.com/yachting/powerboat-guide/cape-dory/33-flybridge-1988-94']
upd('CPDR-33-FB','AirDraft',m(12+8/12),'Published model clearance is 12 ft 8 in.',cd33,'m')
cd36=['https://www.hmy.com/yachting/powerboat-guide/cape-dory/36-flybridge-1988-90']
upd('CPDR-36-TR','FuelCode','fuel.mixed','Published history documents standard gasoline engines and optional diesels, so fuel is configuration-dependent.',cd36)
upd('CPDR-36-TR','AirDraft',m(13),'Published model clearance is 13 ft.',cd36,'m')
cd28of=['https://www.hmy.com/yachting/powerboat-guide/cape-dory/28-open-fisherman-1985-90']
upd('CPDR-28-OF','AirDraft',m(8),'Published model clearance is 8 ft.',cd28of,'m')
upd('CPDR-28-OF','AirDraft_ft',8.0,'Legacy imperial clearance aligned to published 8 ft.',cd28of,'ft')
cd28fb=['https://www.hmy.com/yachting/powerboat-guide/cape-dory/28-flybridge-cruiser-1985-91']
upd('CPDR-28-FB','AirDraft',m(11+2/12),'Published model clearance is 11 ft 2 in.',cd28fb,'m')
upd('CPDR-28-FB','AirDraft_ft',11+2/12,'Legacy imperial clearance aligned to published 11 ft 2 in.',cd28fb,'ft')
# 28 displacement is deliberately not normalized here: factory light-ship and secondary published weights use different loading bases.

# CHB — reconcile stale imperial shadow fields where the canonical metric values already match model-specific sources.
chb35=['https://www.hmy.com/yachting/powerboat-guide/chb/35-sundeck-1983-86']
update_existing_shadows('CHBY-35',18700,'Legacy imperial displacement corrected to model-specific published 18,700 lb.',chb35)
upd('CHBY-35','LOA_ft',34+4/12,'Legacy imperial LOA corrected to published 34 ft 4 in.',chb35,'ft')
upd('CHBY-35','Draft_ft',4+2/12,'Legacy imperial draft corrected to published 4 ft 2 in.',chb35,'ft')
# CHB legacy-only 34 Sedan/Tri-Cabin identities remain unresolved pending an independent identity-specific source.

# ROSBOROUGH — HMY identifies a common RF-246 Atlantic-sea hull, 23 ft 4 in LWL and center keel.
ros=['https://www.hmy.com/yachting/powerboat-guide/rosborough/rf-246-sedan-cruiser-1988-13']
for bid in ['ROSB-246-WH','ROSB-246-LS','ROSB-246']:
    upd(bid,'LWL',m(23+4/12),'Published RF-246 hull specification gives 23 ft 4 in LWL; applied to the shared RF-246 hull platform.',ros,'m')
    upd(bid,'LWL_ft',23+4/12,'Legacy imperial LWL populated from the published RF-246 hull specification.',ros,'ft')
    upd(bid,'KeelConfigurationCode','keel.protective','Manufacturer description identifies a center keel; classified as a protective/center keel, not a full-length trawler keel.',ros)
    upd(bid,'RudderTypeCode','rudder.none_external_drive','This canonical RF-246 record uses outboard or sterndrive propulsion, so steering is by the drive rather than a separate rudder.',ros)
# Draft remains configuration-dependent and is not flattened across outboard/sterndrive versions.

# NORDIC TUGS — correct only era-specific fields supported by matching model documentation.
nt37=['https://www.sentoa.org/Nordic%20Tug%20Physical%20Specification%20Diagrams.pdf']
update_existing_shadows('NDTG-37',22600,'Legacy imperial displacement corrected to Nordic Tugs 37 physical specification of 22,600 lb.',nt37)

nt39=['https://ca.boats.com/power-boats/2015-nordic-tug-39-flybridge-9954380/','https://www.nordictugs.com/history']
upd('NDTG-39','LOA',m(38+11/12),'Documented 2015 Nordic Tug 39 gives 38 ft 11 in LOA; factory history confirms the 37-to-39 evolution.',nt39,'m')
upd('NDTG-39','LOA_ft',38+11/12,'Legacy imperial LOA populated from documented Nordic Tug 39 measurement.',nt39,'ft')
upd('NDTG-39','LWL',m(37+4/12),'Documented Nordic Tug 39 measurement gives 37 ft 4 in LWL.',nt39,'m')
upd('NDTG-39','LWL_ft',37+4/12,'Legacy imperial LWL populated from documented Nordic Tug 39 measurement.',nt39,'ft')
# Air draft remains unresolved because published figures vary with flybridge, mast and antenna configuration.

# Write models.
json.dump(records,open(boat_path,'w',encoding='utf-8'),indent=2,ensure_ascii=False); open(boat_path,'a').write('\n')

batch={'release':'6.49.0','batch':'specification-completion-04','manufacturers':['CHB','Back Cove','Cape Dory','Rosborough','Nordic Tugs'],'updateCount':len(updates),'updates':updates}
json.dump(batch,open(root/'data/specification-completion-batch-04-v6.49.json','w',encoding='utf-8'),indent=2,ensure_ascii=False); open(root/'data/specification-completion-batch-04-v6.49.json','a').write('\n')

fields=['LOA','LWL','Beam','Draft','AirDraft','Displacement','FuelCode','MechanicalPropulsionCode','HullBehaviourCode','KeelConfigurationCode','RudderTypeCode']
missingCounts={f:0 for f in fields}; manufacturerMissingCounts={}; modelQueue=[]
for r in records:
    mc=manufacturerMissingCounts.setdefault(r['Manufacturer'],{x:0 for x in fields}); miss=[]
    for f in fields:
        v=r.get(f)
        if v is None or v=='': miss.append(f); missingCounts[f]+=1; mc[f]+=1
    if miss: modelQueue.append({'BoatModelID':r['BoatModelID'],'Manufacturer':r['Manufacturer'],'Model':r['Model'],'Missing':miss})
queue={'release':'6.49.0','fields':fields,'missingCounts':missingCounts,'manufacturerMissingCounts':manufacturerMissingCounts,'modelQueue':modelQueue}
json.dump(queue,open(root/'data/specification-research-queue-v6.49.json','w',encoding='utf-8'),indent=2,ensure_ascii=False); open(root/'data/specification-research-queue-v6.49.json','a').write('\n')
print('updates',len(updates)); print('missing',missingCounts)
