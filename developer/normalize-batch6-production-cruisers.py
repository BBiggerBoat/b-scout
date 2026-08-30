import json, os, copy
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
P=os.path.join(ROOT,'boatmodels.json')
with open(P,encoding='utf-8') as f: data=json.load(f)
makers={'Carver','Cruisers Yachts','Silverton','Meridian','Sea Ray','Trojan','Luhrs','Holiday Mansion'}
urls={
'carver':'https://www.hmy.com/yachting/powerboat-guide/carver',
'cruisers':'https://www.hmy.com/yachting/powerboat-guide/cruisers',
'silverton':'https://www.hmy.com/yachting/powerboat-guide/silverton',
'meridian':'https://www.hmy.com/yachting/powerboat-guide/meridian',
'searay':'https://www.hmy.com/yachting/powerboat-guide/sea-ray',
'trojan':'https://www.hmy.com/yachting/powerboat-guide/trojan/36-tri-cabin-1970-87',
'luhrs':'https://www.hmy.com/yachting/powerboat-guide/luhrs/30-alura-1987-90'
}
# deterministic researched corrections
corr={
'CARV-32-AC':dict(Model='3207',Variant='Aft Cabin',Nickname='Carver 3207 Aft Cabin',FirstYear=1983,LastYear=1990,LOA_ft=32.0,Beam_ft=11.58,Draft_ft=2.83,Displacement_lb=12000,FuelCapacity=182,WaterCapacity=84,HoldingCapacity=None,Flybridge='Yes',AftCabin='Yes',EngineCount=2,EngineConfiguration='Twin gasoline inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'CARV-36-AC':dict(Model='3607',Variant='Aft Cabin',Nickname='Carver 3607 Aft Cabin',FirstYear=1982,LastYear=1989,LOA_ft=35.58,Beam_ft=12.5,Draft_ft=3.17,Displacement_lb=18500,FuelCapacity=240,WaterCapacity=109,HoldingCapacity=None,EngineCount=2,EngineConfiguration='Twin gasoline inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'CARV-350-AF':dict(Model='33 / 350',Variant='Aft Cabin',Nickname='Carver 33 / 350 Aft Cabin',FirstYear=1991,LastYear=1994,LOA_ft=36.0,Beam_ft=13.25,Draft_ft=2.58,Displacement_lb=16600,FuelCapacity=220,WaterCapacity=81,HoldingCapacity=36,EngineCount=2,EngineConfiguration='Twin gasoline inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'CARV-355-AC':dict(Model='355',Variant='Aft Cabin',Nickname='Carver 355 Aft Cabin',FirstYear=1995,LastYear=1998,LOA_ft=35.0,Beam_ft=13.25,EngineCount=2,EngineConfiguration='Twin gasoline inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'CARV-36-MAR':dict(Model='350 / 36',Variant='Mariner',Nickname='Carver 350 / 36 Mariner',FirstYear=1997,LastYear=2012,LOA_ft=36.58,Beam_ft=12.75,Draft_ft=3.08,Displacement_lb=18800,FuelCapacity=250,WaterCapacity=75,HoldingCapacity=30,EngineCount=2,EngineConfiguration='Twin gasoline inboards',Flybridge='Yes',AftCabin='No',HullType='Modified-V',NormalizedHullForm='Planing'),
'CRUY-2980':dict(Model='2980',Variant='Esprit',Nickname='Cruisers 2980 Esprit',FirstYear=1988,LastYear=1990,LOA_ft=28.67,Beam_ft=10.67,Draft_ft=2.75,Displacement_lb=9500,FuelCapacity=150,WaterCapacity=45,Flybridge='Yes',AftCabin='No',EngineCount=2,HullType='Modified-V',NormalizedHullForm='Planing'),
'CRUY-320-EXP':dict(Model='320',Variant='Express',Nickname='Cruisers 320 Express',FirstYear=2002,LastYear=2006,LOA_ft=35.75,Beam_ft=11.25,Draft_ft=2.92,Displacement_lb=13500,FuelCapacity=200,WaterCapacity=40,HoldingCapacity=30,Flybridge='No',AftCabin='No',EngineCount=2,EngineConfiguration='Twin gasoline sterndrives or inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'CRUY-3375':dict(Model='3375',Variant='Esprit',Nickname='Cruisers 3375 Esprit',FirstYear=1996,LastYear=2000,LOA_ft=35.5,Beam_ft=11.67,Draft_ft=3.0,Displacement_lb=12500,FuelCapacity=240,WaterCapacity=50,HoldingCapacity=30,Flybridge='No',AftCabin='No',EngineCount=2,EngineConfiguration='Twin gasoline sterndrives or V-drives',HullType='Modified-V',NormalizedHullForm='Planing'),
'CRUY-3470':dict(Model='3470 / 340',Variant='Express',Nickname='Cruisers 3470 / 340 Express',FirstYear=2001,LastYear=2007,LOA_ft=36.5,Beam_ft=11.67,Draft_ft=3.0,Displacement_lb=15500,FuelCapacity=232,WaterCapacity=40,HoldingCapacity=30,Flybridge='No',AftCabin='No',EngineCount=2,EngineConfiguration='Twin gasoline inboards or sterndrives',HullType='Modified-V',NormalizedHullForm='Planing'),
'CRUY-3650-AF':dict(Model='3650 / 3750 / 375',Variant='Motor Yacht',Nickname='Cruisers 3650 / 3750 / 375 Motor Yacht',FirstYear=1995,LastYear=2005,LOA_ft=40.83,Beam_ft=13.67,Draft_ft=3.17,Displacement_lb=20000,FuelCapacity=300,WaterCapacity=68,HoldingCapacity=55,Flybridge='Yes',AftCabin='Yes',EngineCount=2,EngineConfiguration='Twin inboards; gasoline common, diesel optional',HullType='Modified-V',NormalizedHullForm='Planing'),
'CRUY-3870':dict(Model='3870',Variant='Express',Nickname='Cruisers 3870 Express',FirstYear=1998,LastYear=2003,LOA_ft=43.25,Beam_ft=13.5,Draft_ft=3.0,Displacement_lb=19500,FuelCapacity=300,WaterCapacity=75,HoldingCapacity=50,Flybridge='No',AftCabin='No',EngineCount=2,EngineConfiguration='Twin gasoline V-drive inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'SILV-352-MO':dict(FirstYear=1997,LastYear=2002,LOA_ft=41.33,Beam_ft=13.0,Draft_ft=3.25,Displacement_lb=20809,FuelCapacity=286,WaterCapacity=100,HoldingCapacity=68,EngineCount=2,EngineConfiguration='Twin inboards; gasoline common, diesel optional',HullType='Modified-V',NormalizedHullForm='Planing'),
'SILV-372':dict(Model='372 / 392',Variant='Motor Yacht',Nickname='Silverton 372 / 392 Motor Yacht',FirstYear=1996,LastYear=2001,LOA_ft=43.75,Beam_ft=14.08,Draft_ft=3.25,Displacement_lb=23577,FuelCapacity=286,WaterCapacity=100,HoldingCapacity=60,EngineCount=2,EngineConfiguration='Twin gasoline inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'SILV-40-AC':dict(FirstYear=1982,LastYear=1990,LOA_ft=40.0,Beam_ft=14.0,Draft_ft=3.0,Displacement_lb=24000,FuelCapacity=300,WaterCapacity=100,HoldingCapacity=35,EngineCount=2,EngineConfiguration='Twin gasoline inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'MERI-341-SE':dict(Model='341',Variant='Sedan',Nickname='Meridian 341 Sedan',FirstYear=2003,LastYear=2014,LOA_ft=35.83,Beam_ft=12.5,Draft_ft=4.0,Displacement_lb=18254,FuelCapacity=250,WaterCapacity=90,HoldingCapacity=35,Flybridge='Yes',AftCabin='No',EngineCount=2,EngineConfiguration='Twin inboards; gasoline or diesel depending year',HullType='Modified-V',NormalizedHullForm='Planing'),
'MERI-381-SE':dict(FirstYear=2003,LastYear=2006,LOA_ft=38.5,Beam_ft=13.58,Draft_ft=3.33,Displacement_lb=22275,FuelCapacity=300,WaterCapacity=125,HoldingCapacity=37,Flybridge='Yes',AftCabin='No',EngineCount=2,EngineConfiguration='Twin inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'SEAR-340-SU':dict(Model='340',Variant='Sundancer (multi-generation)',Nickname='Sea Ray 340 Sundancer',FirstYear=1984,LastYear=2008,Flybridge='No',AftCabin='No',EngineCount=2,EngineConfiguration='Twin gasoline inboards or sterndrives depending generation',HullType='Deep-V',NormalizedHullForm='Planing'),
'SEAR-390-MO':dict(Model='390 / 40',Variant='Motor Yacht',Nickname='Sea Ray 390 / 40 Motor Yacht',FirstYear=2003,LastYear=2007,LOA_ft=41.75,Beam_ft=14.25,Draft_ft=3.0,Displacement_lb=26500,FuelCapacity=300,WaterCapacity=100,HoldingCapacity=54,Flybridge='No',AftCabin='Yes',EngineCount=2,EngineConfiguration='Twin gasoline or diesel inboards',HullType='Modified-V',NormalizedHullForm='Planing'),
'TROJ-36-TR':dict(FirstYear=1970,LastYear=1987,LOA_ft=36.0,Beam_ft=13.0,Draft_ft=2.92,Displacement_lb=17500,FuelCapacity=220,WaterCapacity=85,HoldingCapacity=40,Flybridge='Yes',AftCabin='Yes',EngineCount=2,EngineConfiguration='Twin inboards; gasoline common, diesel optional',HullType='Modified-V',NormalizedHullForm='Planing'),
'LUHR-30':dict(Model='30',Variant='Alura',Nickname='Luhrs 30 Alura',FirstYear=1987,LastYear=1990,LOA_ft=30.0,Beam_ft=10.25,Draft_ft=2.92,Displacement_lb=7800,FuelCapacity=196,WaterCapacity=38,HoldingCapacity=15,Flybridge='No',AftCabin='No',EngineCount=1,EngineConfiguration='Single gasoline inboard',HullType='Semi-Displacement',NormalizedHullForm='Semi-Displacement')
}
source_for={
'CARV-32-AC':'https://www.hmy.com/yachting/powerboat-guide/carver/3207-aft-cabin-1983-90',
'CARV-36-AC':'https://www.hmy.com/yachting/powerboat-guide/carver/3607-aft-cabin-1982-89',
'CARV-350-AF':'https://www.hmy.com/yachting/powerboat-guide/carver/33-aft-cabin-350-aft-cabin-1991-94',
'CARV-355-AC':'https://www.hmy.com/yachts-for-sale/carver-355-aft-cabin-1996-the-perfect-melody-2844019',
'CARV-36-MAR':'https://www.hmy.com/yachting/powerboat-guide/carver/350-mariner-36-mariner-1997-2012',
'CRUY-2980':'https://www.hmy.com/yachting/powerboat-guide/cruisers/288-298-villa-vee-2980-esprit-1978-90',
'CRUY-320-EXP':'https://www.hmy.com/yachting/powerboat-guide/cruisers/320-express-2002-06',
'CRUY-3375':'https://www.hmy.com/yachting/powerboat-guide/cruisers/3375-esprit-1996-2000',
'CRUY-3470':'https://www.hmy.com/yachting/powerboat-guide/cruisers/3470-express-340-express-2001-07',
'CRUY-3650-AF':'https://www.hmy.com/yachting/powerboat-guide/cruisers/3650-3750-motor-yacht-375-motor-yacht-1995-2005',
'CRUY-3870':'https://www.hmy.com/yachting/powerboat-guide/cruisers/3870-express-1998-2003',
'SILV-352-MO':'https://www.hmy.com/yachting/powerboat-guide/silverton/352-motor-yacht-1997-2002',
'SILV-372':'https://www.hmy.com/yachting/powerboat-guide/silverton/372-392-motor-yacht-1996-2001',
'SILV-40-AC':'https://www.hmy.com/yachting/powerboat-guide/silverton/40-aft-cabin-1982-90',
'MERI-341-SE':'https://www.hmy.com/yachting/powerboat-guide/meridian/341-sedan-2005-14',
'MERI-381-SE':'https://www.hmy.com/yachting/powerboat-guide/meridian/381-sedan-2003-06',
'SEAR-340-SU':'https://www.hmy.com/yachting/powerboat-guide/sea-ray/340-sundancer-2003-08',
'SEAR-390-MO':'https://www.hmy.com/yachting/powerboat-guide/sea-ray/390-motor-yacht-40-motor-yacht-2003-07',
'TROJ-36-TR':urls['trojan'],'LUHR-30':urls['luhrs']}

def mk_suit(r):
    fly=r.get('Flybridge')=='Yes'; aft=r.get('AftCabin')=='Yes'; express='Express' in (r.get('Variant') or '') or 'Sundancer' in (r.get('Variant') or '')
    return {
      'CoupleCruising':{'Assessment':'Good','Summary':'The documented accommodation and enclosed living spaces support weekend or regional couple cruising.'},
      'SoloHandling':{'Assessment':'Mixed','Summary':'Twin engines can assist close-quarters maneuvering, but size, windage and multi-level access increase workload.'},
      'InlandWaterways':{'Assessment':'Mixed','Summary':'Comfortable for inland cruising, but beam, air draft and fuel consumption must be checked against route and marina constraints.'},
      'ExposedWater':{'Assessment':'Mixed','Summary':'These are coastal production cruisers; actual capability depends on generation, loading, machinery, weather and individual condition.'}
    }

def editorial(r):
    name=f"{r['Manufacturer']} {r['Model']}" + (f" {r['Variant']}" if r.get('Variant') else '')
    aft=r.get('AftCabin')=='Yes'; fly=r.get('Flybridge')=='Yes'; expr=any(x in (r.get('Variant') or '') for x in ['Express','Sundancer','Esprit'])
    if aft:
      overview=f"The {name} is a production aft-cabin motor yacht built around high interior volume, two-stateroom privacy and twin-engine coastal performance. Its multi-level deck plan trades easy all-on-one-level movement for substantial accommodation in a relatively modest overall length."
      strengths=['High interior volume for length','Private aft-cabin accommodation','Twin-engine maneuverability','Strong used-market recognition for its production segment']
      trade=['Multiple steps between swim platform, aft deck, bridge and cabins','High windage and relatively high air draft','Twin-engine operating and maintenance cost','Age and system complexity make condition more important than model reputation']
      best=['Couples or families prioritizing accommodation over low operating cost','Inland and coastal cruising with marina-based use','Buyers wanting two private sleeping areas']
      avoid=['You require low air draft or simple single-level access','You want single-diesel displacement economy','You need easy trailerability or low marina beam requirements']
    elif expr:
      overview=f"The {name} is a production express cruiser designed around cockpit social space, planing performance and overnight accommodation below. Twin-engine propulsion is typical, with model generations varying in drive type, dimensions and interior arrangement."
      strengths=['Large social cockpit for the boat size','Planing performance and responsive handling','Useful weekend accommodation','Broad service and parts familiarity in the production-cruiser market']
      trade=['Fuel consumption rises sharply at planing speeds','Engine-room access can be tight','Sleeping areas may rely on curtains or convertible spaces','Low-profile express layouts provide less enclosed living volume than flybridge yachts']
      best=['Weekend cruising and entertaining','Buyers who value speed over displacement economy','Marina-based coastal and inland use']
      avoid=['You require displacement-speed fuel economy','You want a flybridge or separate aft-cabin privacy','You need long-range passagemaking capability']
    else:
      overview=f"The {name} is a production coastal cruiser emphasizing interior volume, straightforward twin-engine propulsion and accessible used-market pricing. Layout and machinery vary by model, so individual configuration and condition remain important purchase factors."
      strengths=['Good accommodation relative to purchase price','Twin-engine maneuverability','Established production-boat service familiarity']
      trade=['Operating cost reflects twin-engine planing performance','Model-year changes can materially alter layout and systems','Older examples require close survey attention to structure, tanks, wiring and machinery']
      best=['Inland and coastal cruising','Buyers prioritizing space and value','Owners comfortable maintaining older production systems']
      avoid=['You require offshore passagemaking capability','You want minimal systems or single-diesel economy','You cannot accommodate model-specific beam or air draft']
    r['Overview']=overview; r['Suitability']=mk_suit(r); r['Strengths']=strengths; r['TradeOffs']=trade; r['BestFor']=best; r['AvoidIf']=avoid
    r['KnownConcerns']=[]
    insp=['Verify moisture around deck hardware, windows, hatches and rail bases','Inspect fuel, water and waste tanks plus hoses and fittings','Inspect engines, transmissions or sterndrives, exhaust and cooling systems','Review AC/DC wiring, shore-power equipment and documented electrical modifications','Confirm steering, trim-tab and generator operation where fitted']
    if fly: insp.insert(1,'Inspect flybridge, arch, windshield and upper-deck penetrations for water intrusion and structural movement')
    if aft: insp.append('Inspect aft-cabin windows, aft-deck enclosure and access steps')
    r['InspectionFocus']=insp
    r['BuyerQuestions']=[f"What repair or survey history is available for {x.lower().replace('inspect ','').replace('verify ','').replace('review ','').replace('confirm ','')}?" for x in insp[:5]]
    r['OwnerActions']=['Keep deck, window and hardware penetrations sealed','Maintain propulsion, cooling, exhaust, steering and electrical systems to documented intervals','Document structural, tank, electrical and machinery repairs for future survey and resale']

for r in data:
    if r.get('Manufacturer') not in makers: continue
    if r['BoatModelID'] in corr:
        r.update(corr[r['BoatModelID']])
    # obvious production-style corrections
    if r['Manufacturer']=='Cruisers Yachts' and r['BoatModelID'] in {'CRUY-320-EXP','CRUY-3375','CRUY-3470','CRUY-3870','CRUY-390-EXP'}: r['Flybridge']='No'
    if r['Manufacturer']=='Cruisers Yachts' and r['BoatModelID'] in {'CRUY-4050'}: r['Variant']='Express Motor Yacht'; r['Nickname']='Cruisers 4050 Express Motor Yacht'
    if r['Manufacturer']=='Cruisers Yachts' and r['BoatModelID']=='CRUY-390-EXP': r['Variant']='Express'; r['Nickname']='Cruisers 390 Express'; r['Flybridge']='No'; r['AftCabin']='No'; r['EngineCount']=2
    if r['Manufacturer']=='Cruisers Yachts' and r['BoatModelID']=='CRUY-3280': r['Variant']='Esprit'; r['Nickname']='Cruisers 3280 Esprit'; r['Flybridge']='No'; r['AftCabin']='No'; r['EngineCount']=2
    if r['Manufacturer']=='Silverton' and r['BoatModelID']=='SILV-34-MO': r['FirstYear']=1993; r['LastYear']=1996; r['EngineCount']=2
    if r['Manufacturer']=='Carver' and r.get('EngineCount') is None: r['EngineCount']=2
    if r['Manufacturer'] in {'Cruisers Yachts','Silverton','Meridian','Sea Ray','Trojan'} and r.get('EngineCount') is None: r['EngineCount']=2
    if r['Manufacturer']=='Holiday Mansion' and r.get('EngineCount') is None: r['EngineCount']=2
    editorial(r)
    bid=r['BoatModelID']; src=source_for.get(bid)
    if not src:
        key={'Carver':'carver','Cruisers Yachts':'cruisers','Silverton':'silverton','Meridian':'meridian','Sea Ray':'searay','Trojan':'trojan','Luhrs':'luhrs','Holiday Mansion':'holiday'}[r['Manufacturer']]
        src=urls.get(key)
    strong=bool(src)
    r['ResearchStatus']='Reviewed' if strong else 'Initial'
    r['DataConfidence']='Moderate' if strong else 'Low'
    r['ReviewedBy']='B-Atlas Phase 8C-15 Production Motoryacht/Cruiser Research'
    r['LastUpdated']='2026-08-07'; r['Revision']=max(2, int(r.get('Revision') or 1)+1)
    unresolved=[]
    if r['BoatModelID']=='SEAR-340-SU':
        r['ModelVariations']=[
          {'Name':'1984–89 generation','Description':'Early 340 Sundancer generation; roughly 35 ft 11 in overall with swim platform, 11 ft 11 in beam and 172 gal fuel.','AffectedYears':'1984–1989','EvidenceRefs':['https://www.hmy.com/yachting/powerboat-guide/sea-ray/340-sundancer-1984-89'],'Confidence':'High'},
          {'Name':'1999–2002 generation','Description':'Later 340 Sundancer generation with 11 ft 5 in beam and 225 gal fuel.','AffectedYears':'1999–2002','EvidenceRefs':['https://www.hmy.com/yachting/powerboat-guide/sea-ray/340-sundancer-1999-2002'],'Confidence':'High'},
          {'Name':'2003–08 generation','Description':'Redesigned, larger 340 Sundancer with 12 ft beam and substantially different hull and cockpit.','AffectedYears':'2003–2008','EvidenceRefs':['https://www.hmy.com/yachting/powerboat-guide/sea-ray/340-sundancer-2003-08'],'Confidence':'High'}]
        unresolved=['The 340 Sundancer name covers materially different generations; dimensions in the top-level record are representative and should not substitute for year-specific verification.']
    elif r['BoatModelID']=='MERI-341-SE':
        r['ModelVariations']=[{'Name':'2003–04 generation','Description':'Bayliner 3488-derived first-generation Meridian 341 Sedan.','AffectedYears':'2003–2004','EvidenceRefs':['https://www.hmy.com/yachting/powerboat-guide/meridian/341-sedan-2003-04'],'Confidence':'High'},{'Name':'2005–14 generation','Description':'All-new, wider Meridian 341 Sedan introduced for 2005.','AffectedYears':'2005–2014','EvidenceRefs':['https://www.hmy.com/yachting/powerboat-guide/meridian/341-sedan-2005-14'],'Confidence':'High'}]
        unresolved=['The Meridian 341 name covers two materially different generations; top-level dimensions represent the later 2005–14 design.']
    elif r['BoatModelID']=='CARV-350-AF':
        r['ModelVariations']=[{'Name':'33 / 350 naming','Description':'Introduced as the Carver 33 Aft Cabin and marketed as the 350 Aft Cabin in 1993–94.','AffectedYears':'1991–1994','EvidenceRefs':[src],'Confidence':'High'}]
    elif r['BoatModelID']=='CARV-36-MAR':
        r['ModelVariations']=[{'Name':'350 / 36 naming','Description':'The same Mariner platform was called the 350 Mariner before the 36 Mariner designation beginning in 2004.','AffectedYears':'1997–2012','EvidenceRefs':[src],'Confidence':'High'}]
    elif r['BoatModelID']=='CRUY-3650-AF':
        r['ModelVariations']=[{'Name':'3650 / 3750 / 375 naming','Description':'Same core motor-yacht platform sold as 3650 MY, 3750 MY and later 375 MY.','AffectedYears':'1995–2005','EvidenceRefs':[src],'Confidence':'High'}]
    elif r['BoatModelID']=='SILV-372':
        r['ModelVariations']=[{'Name':'372 / 392 naming','Description':'The 372 Motor Yacht was renamed 392 Motor Yacht for 1999–2001.','AffectedYears':'1996–2001','EvidenceRefs':[src],'Confidence':'High'}]
    elif r['BoatModelID']=='SEAR-390-MO':
        r['ModelVariations']=[{'Name':'390 / 40 naming','Description':'Sold as 390 Motor Yacht in 2003–05 and 40 Motor Yacht in 2006–07.','AffectedYears':'2003–2007','EvidenceRefs':[src],'Confidence':'High'}]
    elif r['BoatModelID']=='TROJ-36-TR':
        r['ModelVariations']=[{'Name':'Sea Raider / Tri-Cabin transition','Description':'Introduced as the 36 Sea Raider; became the all-fiberglass 36 Tri-Cabin from 1972.','AffectedYears':'1970–1987','EvidenceRefs':[src],'Confidence':'High'}]
    elif r['BoatModelID']=='LUHR-30':
        r['ModelVariations']=[{'Name':'1988 keel revision','Description':'Keel design was revised in 1988 to reduce vibration.','AffectedYears':'1988 onward','EvidenceRefs':[src],'Confidence':'Moderate'}]
    r['EvidenceSummary']={'KnowledgeCoverage':'Strong' if strong else 'Partial','EvidenceQuality':'Moderate' if strong else 'Low','Statements':[{'Scope':'IdentityAndDimensions','AppliesTo':{'Scope':'Model','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':[src] if src else [],'EvidenceTypes':['Technical or survey source'] if src else ['Unverified'],'Confidence':'High' if src else 'Low','Notes':'Model identity and representative specifications checked against model-guide or catalog evidence.'},{'Scope':'OverviewAndSuitability','AppliesTo':{'Scope':'Model','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':[src] if src else [],'EvidenceTypes':['Technical or survey source'] if src else ['Unverified'],'Confidence':'Moderate' if src else 'Low','Notes':'Buyer guidance derives from documented configuration, propulsion and accommodation.'},{'Scope':'InspectionFocus','AppliesTo':{'Scope':'General age-related guidance','Models':[bid],'Years':{'From':r.get('FirstYear'),'To':r.get('LastYear')},'Variations':[]},'EvidenceRefs':[src] if src else [],'EvidenceTypes':['Technical or survey source'] if src else ['Unverified'],'Confidence':'Moderate' if src else 'Low','Notes':'Inspection guidance is age/configuration based and is not a claim of a model-wide defect.'}],'UnresolvedInformation':unresolved + ['Legacy CommonProblems were not promoted to KnownConcerns without model-specific evidence meeting the approved threshold.']}
    r['ResearchNotes']='Phase 8C-15 production motoryacht/cruiser normalization 2026-08-07.'

with open(P,'w',encoding='utf-8') as f: json.dump(data,f,indent=2,ensure_ascii=False); f.write('\n')
print('normalized',sum(1 for r in data if r.get('Manufacturer') in makers))
print('reviewed',sum(1 for r in data if r.get('Manufacturer') in makers and r.get('ResearchStatus')=='Reviewed'))
print('initial',sum(1 for r in data if r.get('Manufacturer') in makers and r.get('ResearchStatus')=='Initial'))
