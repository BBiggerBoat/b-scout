import json, math, os
from copy import deepcopy
ROOT='/mnt/data/batlas658'
P=os.path.join(ROOT,'boatmodels.json')
models=json.load(open(P,encoding='utf-8'))
byid={m['BoatModelID']:m for m in models}
updates=[]
USGAL_TO_L=3.785411784
LB_TO_KG=0.45359237

def setf(mid,field,new,basis,refs,unit=None):
    m=byid[mid]; old=m.get(field)
    if old==new: return
    m[field]=new
    u={'BoatModelID':mid,'Field':field,'Old':old,'New':new,'Basis':basis,'EvidenceRefs':refs}
    if unit: u['Unit']=unit
    updates.append(u)

def gal(mid, base, gallons, basis, refs):
    setf(mid,base,gallons*USGAL_TO_L,basis,refs,'L')
    setf(mid,base+'Gal',gallons,basis,refs,'US gal')
    setf(mid,base+'UnitStatus','canonical_litres',basis,refs)

# Atlantic 37
refs=['https://www.hmy.com/yachting/powerboat-guide/atlantic/37-double-cabin-1982-92','https://prairieboatworks.org/prairie-36-coastal-cruiser/']
setf('ATLB-37-TR','LWL_ft',None,'No reviewed Atlantic/Prairie source publishes a defensible LWL; clear the undocumented 34-ft legacy fallback.',refs,'ft')
setf('ATLB-37-TR','AirDraft_ft',19.75,'HMY and Prairie owner archives publish 19 ft 9 in mast-up clearance; align the imperial shadow with the already-correct canonical metric value.',refs,'ft')
setf('ATLB-37-TR','Headroom_ft',6+5/12,'HMY and Prairie documentation publish interior headroom up to 6 ft 5 in; align imperial display shadow.',refs,'ft')
gal('ATLB-37-TR','FuelCapacity',250,'HMY publishes 250 gal fuel for Atlantic 37; US-market Powerboat Guide capacity normalized to litres.',refs)
gal('ATLB-37-TR','WaterCapacity',200,'HMY publishes 200 gal water for Atlantic 37; US-market Powerboat Guide capacity normalized to litres.',refs)
gal('ATLB-37-TR','HoldingCapacity',30,'HMY publishes 30 gal waste for Atlantic 37; replaces unsupported 40 capacity and normalizes to litres.',refs)

# Atlantic Boat Duffy 26 semi-custom
refs=['https://maineboats.com/print/issue-178/atlantic-boat-finds-niche-building-launches','https://www.marinesource.com/boat/duffy-hardtop-cruiser-1996-annapolis-253b61341-for-sale','https://marinesource.com/boat/duffy-26-2001-jamestown-24fab9b09-for-sale']
setf('ATLB-26-DU','LWL_ft',None,'Reviewed Atlantic Boat and exact-hull sources do not publish a model-wide LWL; semi-custom finishes make the inherited 24.5-ft fallback unsafe.',refs,'ft')
setf('ATLB-26-DU','AirDraft_ft',None,'Air draft depends on semi-custom hardtop/mast/antenna finish; no factory-wide 8.5-ft value was verified.',refs,'ft')
setf('ATLB-26-DU','Displacement_lb',None,'Exact Duffy 26 finished boats vary materially; a documented 1996 cruiser is 5,000 lb and the inherited 6,200-lb figure lacks model-wide support.',refs,'lb')

# Californian 34 LRC
refs=['https://www.hmy.com/yachting/powerboat-guide/californian/34-lrc-1977-85','https://marinesource.com/boat/californian-34-lrc-1982-st-clair-shores-24c8360c9-for-sale']
setf('CALF-34-TR','LWL_ft',None,'HMY does not publish LWL for the Californian 34 LRC; clear the unsupported 31.67-ft legacy fallback.',refs,'ft')
setf('CALF-34-TR','AirDraft_ft',10+8/12,'HMY publishes 10 ft 8 in clearance; reconcile stale 14-ft imperial shadow.',refs,'ft')
gal('CALF-34-TR','FuelCapacity',250,'HMY model guide publishes 250 gal fuel; normalized as US gallons to canonical litres.',refs)
gal('CALF-34-TR','WaterCapacity',75,'HMY model guide publishes 75 gal water; normalized as US gallons to canonical litres.',refs)
gal('CALF-34-TR','HoldingCapacity',30,'HMY model guide publishes 30 gal waste; normalized as US gallons to canonical litres.',refs)

# Californian 38 LRC
refs=['https://www.hmy.com/yachting/powerboat-guide/californian/38-lrc-sedan-1978-85']
setf('CALF-38-TR','LWL_ft',36.5,'HMY publishes 36 ft 6 in LWL; reconcile stale 35.42-ft imperial shadow with canonical metric value.',refs,'ft')
setf('CALF-38-TR','AirDraft_ft',None,'HMY model guide does not publish clearance for the 38 LRC; clear unsupported 14.5-ft fallback.',refs,'ft')
gal('CALF-38-TR','FuelCapacity',400,'HMY publishes 400 gal fuel; normalized as US gallons to canonical litres.',refs)
gal('CALF-38-TR','WaterCapacity',100,'HMY publishes 100 gal water; normalized as US gallons to canonical litres.',refs)
gal('CALF-38-TR','HoldingCapacity',25,'HMY publishes 25 gal waste; normalized as US gallons to canonical litres.',refs)

# Gozzard Pilgrim 40
refs=['https://www.hmy.com/yachting/powerboat-guide/pilgrim/40-1983-89','https://soundingsonline.com/boats/pilgrim-40/','https://paperzz.com/doc/6871184/pilgrim-40---gozzard-yachts']
setf('GOZZ-40-PI','LWL_ft',None,'HMY explicitly lists LWL as NA; secondary values conflict, so clear inherited 36.5-ft fallback and preserve Unknown.',refs,'ft')
setf('GOZZ-40-PI','AirDraft',6.7056,'HMY publishes 22 ft clearance for the Pilgrim 40.',refs,'m')
setf('GOZZ-40-PI','AirDraft_ft',22,'HMY publishes 22 ft clearance for the Pilgrim 40.',refs,'ft')
setf('GOZZ-40-PI','Headroom',1.9304,'HMY publishes 6 ft 4 in headroom.',refs,'m')
setf('GOZZ-40-PI','Headroom_ft',6+4/12,'HMY publishes 6 ft 4 in headroom.',refs,'ft')
gal('GOZZ-40-PI','FuelCapacity',142,'HMY publishes 142 gal fuel; canonical litres already approximated this value and provenance is now explicit.',refs)
gal('GOZZ-40-PI','WaterCapacity',240,'HMY publishes 240 gal water; canonical litres already approximated this value and provenance is now explicit.',refs)
gal('GOZZ-40-PI','HoldingCapacity',100,'Gozzard/Pilgrim documentation describes a standard 100-gal waste tank; normalize to canonical litres.',refs)

# Great Harbour GH37
refs=['https://www.greatharbourtrawlers.com/gh37-specifications-and-layout.html','https://fyiyachts.com/yacht-listing/2005-great-harbour-gh37-2/','https://marinesource.com/boat/great-harbour-gh37-2000-geneva-a91654cb-for-sale']
setf('GRTH-GH37','LWL_ft',36+1/12,'Great Harbour documentation uses 36 ft 1 in LWL; reconcile stale 35.5-ft imperial shadow.',refs,'ft')
setf('GRTH-GH37','AirDraft_ft',None,'Documented lowered configurations range roughly 13 ft 6 in to 15 ft 6 in; clear fixed 13.5-ft fallback and preserve configuration dependence.',refs,'ft')
gal('GRTH-GH37','FuelCapacity',500,'Factory specifies 500 gal standard fuel with 750 gal optional; store standard capacity in canonical litres and retain US-gallon provenance.',refs)
gal('GRTH-GH37','WaterCapacity',500,'Factory specifies two 250-gal water tanks, 500 gal total; normalize to canonical litres.',refs)
gal('GRTH-GH37','HoldingCapacity',140,'Factory specifies 140-gal holding tank; replaces unsupported 100 value and normalizes to canonical litres.',refs)

# Great Harbour N37
refs=['https://www.greatharbourtrawlers.com/n37-specifications-and-layout.html','https://www.greatharbourtrawlers.com/uploads/4/9/4/8/49488989/n37slick.pdf','https://marinesource.com/boats-for-sale/listing_print.cfm?listingnmb=100849003']
setf('GRTH-N37','LWL_ft',36+1/12,'Factory brochure publishes 36 ft 1 in LWL; reconcile stale 35.5-ft imperial shadow.',refs,'ft')
setf('GRTH-N37','AirDraft_ft',None,'N37 lowered air draft varies by flybridge/arch/bimini/antenna configuration (about 13 ft 10 in to 14 ft 8 in in reviewed examples); clear fixed fallback.',refs,'ft')
setf('GRTH-N37','Displacement',47000*LB_TO_KG,'Factory N37 brochure publishes 47,000 lb displacement; align canonical metric value with primary-source figure.',refs,'kg')
setf('GRTH-N37','Displacement_lb',47000,'Factory N37 brochure publishes 47,000 lb displacement.',refs,'lb')
gal('GRTH-N37','FuelCapacity',500,'Factory specifies 500-gal integral fuel tank; normalize to canonical litres.',refs)
gal('GRTH-N37','WaterCapacity',300,'Factory specifies two 150-gal water tanks, 300 gal total; normalize to canonical litres.',refs)
gal('GRTH-N37','HoldingCapacity',100,'Factory specifies 100-gal holding tank; normalize to canonical litres.',refs)

with open(P,'w',encoding='utf-8') as f: json.dump(models,f,indent=2,ensure_ascii=False); f.write('\n')
out={'release':'6.58.0','batch':'specification-completion-12','manufacturers':['Atlantic','Atlantic Boat','Californian','Gozzard','Great Harbour'],'updateCount':len(updates),'updates':updates}
with open(os.path.join(ROOT,'data','specification-completion-batch-12-v6.58.json'),'w',encoding='utf-8') as f: json.dump(out,f,indent=2,ensure_ascii=False); f.write('\n')
print('updates',len(updates))
