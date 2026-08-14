import json, os, copy, hashlib
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DUP_MAP={
    'NDTG-26-PH':'NDTG-26',
    'NDTG-32-PH':'NDTG-32',
    'NDTG-37-PH':'NDTG-37',
    'FORT-33-DE':'FORT-33',
    'ISGY-32':'ISGY-32-SE',
}
RENAME_MAP={'NDTG-42-PH':'NDTG-42'}
ALL_MAP={**DUP_MAP,**RENAME_MAP}

RUNTIME_JSON=[
 'knowledge/data/knowledge-coverage.json','knowledge/data/boatintelligence.json','knowledge/data/evidence.json',
 'knowledge/data/curatedresources.json','knowledge/data/relationships.json','knowledge/data/facts.json',
 'knowledge/data/knowledgeannotations.json','knowledge/data/manufacturerknowledge.json',
 'data/marketplace-source-validation.json','data/imageassets.json','data/model-search-aliases.json',
 'data/registry/boat-registry.json','data/registry/legacy-id-map.json'
]

def read(rel): return json.loads((ROOT/rel).read_text(encoding='utf-8'))
def write(rel,obj): (ROOT/rel).write_text(json.dumps(obj,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
def uniq(seq):
    out=[]
    for x in seq:
        if x not in out: out.append(x)
    return out

def replace_ids(obj, mapping):
    if isinstance(obj,str): return mapping.get(obj,obj)
    if isinstance(obj,list): return [replace_ids(x,mapping) for x in obj]
    if isinstance(obj,dict): return {k:replace_ids(v,mapping) for k,v in obj.items()}
    return obj

def exact_boat_id(x): return x.get('BoatModelID') if isinstance(x,dict) else None

# 1. Canonical model database: delete confirmed dupes, normalize 42 identity, fix two distinct-name collisions.
boats=read('boatmodels.json')
original_count=len(boats)
removed=[b for b in boats if b.get('BoatModelID') in DUP_MAP]
boats=[b for b in boats if b.get('BoatModelID') not in DUP_MAP]
for b in boats:
    if b.get('BoatModelID')=='NDTG-42-PH':
        b['BoatModelID']='NDTG-42'; b['Model']='42'; b['Variant']=None; b['Nickname']='Nordic Tug 42'
        rn=(b.get('ResearchNotes') or '').strip()
        extra='Identity normalized 2026-08-07: Pilothouse is standard Nordic Tug architecture, not a separate model variant. Legacy ID NDTG-42-PH redirects to NDTG-42.'
        b['ResearchNotes']=(rn+'\n\n'+extra).strip()
    elif b.get('BoatModelID')=='CHBY-34-SE':
        b['Model']='34 Double Cabin'; b['Variant']='Double Cabin'; b['Nickname']='CHB 34 Double Cabin'
    elif b.get('BoatModelID')=='MRTR-38-SD':
        b['Model']='38 Double Cabin'; b['Variant']='Double Cabin'; b['Nickname']='Marine Trader 38 Double Cabin'
write('boatmodels.json',boats)

# 2. Registry: delete duplicate identities; rename 42; preserve all retired IDs/names as aliases of canonicals.
registry=read('data/registry/boat-registry.json')
reg_by={r['BoatModelID']:r for r in registry}
retired_meta={}
for old,new in DUP_MAP.items():
    r=reg_by.get(old)
    if r: retired_meta[old]=copy.deepcopy(r)
registry=[r for r in registry if r.get('BoatModelID') not in DUP_MAP]
for r in registry:
    if r.get('BoatModelID')=='NDTG-42-PH':
        retired_meta['NDTG-42-PH']=copy.deepcopy(r)
        r['BoatModelID']='NDTG-42'; r['CanonicalName']='Nordic Tug 42'; r['Model']='42'; r['Variant']=''
    if r.get('BoatModelID')=='CHBY-34-SE':
        r['CanonicalName']='CHB 34 Double Cabin'; r['Model']='34 Double Cabin'; r['Variant']='Double Cabin'
    if r.get('BoatModelID')=='MRTR-38-SD':
        r['CanonicalName']='Marine Trader 38 Double Cabin'; r['Model']='38 Double Cabin'; r['Variant']='Double Cabin'
reg_by={r['BoatModelID']:r for r in registry}
for old,new in ALL_MAP.items():
    target=reg_by[new]
    oldr=retired_meta.get(old,{})
    aliases=list(target.get('Aliases') or [])+[old]
    if oldr.get('CanonicalName'): aliases.append(oldr['CanonicalName'])
    aliases += list(oldr.get('Aliases') or [])
    target['Aliases']=uniq([a for a in aliases if a and a!=target.get('CanonicalName')])
write('data/registry/boat-registry.json',registry)

# 3. Legacy ID map: redirect retired IDs to canonicals, update any existing references.
legacy=replace_ids(read('data/registry/legacy-id-map.json'),ALL_MAP)
# replace_ids changes LegacyBoatModelID too, which we do NOT want for retired IDs; restore/add explicit redirect rows.
# Remove accidental canonicalized copies where their original row cannot be distinguished, then guarantee one redirect per old ID.
for old,new in ALL_MAP.items():
    # Existing old rows from source were transformed; add a dedicated legacy redirect if absent.
    if not any(x.get('LegacyBoatModelID')==old for x in legacy):
        legacy.append({'LegacyBoatModelID':old,'ProposedV7BoatModelID':new,'MigrationStatus':'Consolidated','SourceRecordCount':1,'CurrentBoatModelID':new,'RedirectType':'Permanent'})
# Deduplicate legacy rows by LegacyBoatModelID, preferring explicit old-ID rows and latest occurrence.
seen={}
for x in legacy: seen[x.get('LegacyBoatModelID')]=x
legacy=list(seen.values())
legacy.sort(key=lambda x:str(x.get('LegacyBoatModelID','')))
write('data/registry/legacy-id-map.json',legacy)

# 4. Search aliases: remove duplicate rows, rename 42, enrich canonical model terms with retired display names.
aliases=read('data/model-search-aliases.json')
old_alias_rows={x['BoatModelID']:copy.deepcopy(x) for x in aliases if x.get('BoatModelID') in ALL_MAP}
aliases=[x for x in aliases if x.get('BoatModelID') not in DUP_MAP]
for x in aliases:
    if x.get('BoatModelID')=='NDTG-42-PH': x['BoatModelID']='NDTG-42'; x['CanonicalName']='Nordic Tug 42'
    if x.get('BoatModelID')=='CHBY-34-SE': x['CanonicalName']='CHB 34 Double Cabin'
    if x.get('BoatModelID')=='MRTR-38-SD': x['CanonicalName']='Marine Trader 38 Double Cabin'
by={x['BoatModelID']:x for x in aliases}
for old,new in ALL_MAP.items():
    t=by[new]; o=old_alias_rows.get(old,{})
    terms=list(t.get('ModelTerms') or [])+list(o.get('ModelTerms') or [])
    if o.get('CanonicalName'): terms.append(o['CanonicalName'])
    t['ModelTerms']=uniq([z for z in terms if z])
write('data/model-search-aliases.json',aliases)

# 5. Runtime datasets: remove duplicate-owned records where canonical data already exists; map cross-references and 42 ID.
# coverage/evidence/facts/annotations/boatintelligence/resources/market validation: drop exact duplicate BoatModelID rows; rename 42 only.
for rel in ['knowledge/data/knowledge-coverage.json','knowledge/data/boatintelligence.json','knowledge/data/evidence.json',
            'knowledge/data/curatedresources.json','knowledge/data/facts.json','knowledge/data/knowledgeannotations.json',
            'data/marketplace-source-validation.json']:
    data=read(rel)
    if isinstance(data,list):
        data=[x for x in data if not (isinstance(x,dict) and x.get('BoatModelID') in DUP_MAP)]
        data=replace_ids(data,RENAME_MAP)
    else: data=replace_ids(data,RENAME_MAP)
    write(rel,data)

# Relationships can point to dupes from other models: map endpoints then remove self-links and exact semantic duplicates.
rels=replace_ids(read('knowledge/data/relationships.json'),ALL_MAP)
out=[]; seen=set()
for r in rels:
    if r.get('FromBoatModelID')==r.get('ToBoatModelID'): continue
    key=(r.get('FromBoatModelID'),r.get('ToBoatModelID'),r.get('RelationshipType'),r.get('Direction'))
    if key in seen: continue
    seen.add(key); out.append(r)
write('knowledge/data/relationships.json',out)

# Manufacturer knowledge: replace IDs and de-duplicate arrays recursively.
mk=replace_ids(read('knowledge/data/manufacturerknowledge.json'),ALL_MAP)
def dedupe_lists(obj):
    if isinstance(obj,list):
        vals=[dedupe_lists(x) for x in obj]
        if all(isinstance(x,(str,int,float,bool,type(None))) for x in vals): return uniq(vals)
        return vals
    if isinstance(obj,dict): return {k:dedupe_lists(v) for k,v in obj.items()}
    return obj
mk=dedupe_lists(mk)
write('knowledge/data/manufacturerknowledge.json',mk)

# imageassets: drop duplicate assets, rename 42 ID and update display labels if present.
ia=read('data/imageassets.json')
assets=ia.get('assets',[])
assets=[a for a in assets if a.get('BoatModelID') not in DUP_MAP]
for a in assets:
    if a.get('BoatModelID')=='NDTG-42-PH': a['BoatModelID']='NDTG-42'
ia['assets']=assets
write('data/imageassets.json',ia)

# 6. Audit report.
report={
 'auditDate':'2026-08-07','beforeModelCount':original_count,'afterModelCount':len(boats),
 'confirmedDuplicatesDeleted':[
   {'deleted':'NDTG-26-PH','canonical':'NDTG-26','reason':'Pilothouse is standard architecture, not a distinct Nordic Tug 26 model.'},
   {'deleted':'NDTG-32-PH','canonical':'NDTG-32','reason':'Pilothouse is standard architecture, not a distinct Nordic Tug 32 model.'},
   {'deleted':'NDTG-37-PH','canonical':'NDTG-37','reason':'Pilothouse is standard architecture, not a distinct Nordic Tug 37 model.'},
   {'deleted':'FORT-33-DE','canonical':'FORT-33','reason':'Existing research explicitly identified the record as a duplicate Fortier 33 identity.'},
   {'deleted':'ISGY-32','canonical':'ISGY-32-SE','reason':'Existing research explicitly identified overlap with the Island Gypsy 32 Sedan record.'}
 ],
 'identityNormalized':[{'old':'NDTG-42-PH','new':'NDTG-42','reason':'Pilothouse is standard architecture; no second 42 record existed.'}],
 'distinctModelsRetainedAndRelabeled':[
   {'BoatModelID':'CHBY-34-SE','displayName':'CHB 34 Double Cabin','reason':'Distinct from CHB 34 Sedan.'},
   {'BoatModelID':'MRTR-38-SD','displayName':'Marine Trader 38 Double Cabin','reason':'Distinct from Marine Trader 38 Sundeck.'},
   {'BoatModelID':'MRTR-38-SD2','displayName':'Marine Trader 38 Sundeck','reason':'Distinct Sundeck model retained.'}
 ],
 'legacyPolicy':'Deleted/renamed IDs remain resolvable through canonical registry aliases and permanent legacy redirects.'
}
write('developer/reports/duplicate-identity-audit-2026-08-07.json',report)
print(json.dumps(report,indent=2))
