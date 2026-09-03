#!/usr/bin/env python3
import json, glob, re, urllib.parse, collections
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
models=json.loads((ROOT/'boatmodels.json').read_text())
res_path=ROOT/'knowledge/data/curatedresources.json'
resources=json.loads(res_path.read_text())
model_by={m['BoatModelID']:m for m in models}
res_by={r['BoatModelID']:r for r in resources}

# Ensure structural resource-set coverage for every canonical model. No content is inherited or invented.
for m in models:
    if m['BoatModelID'] not in res_by:
        rec={
            'BoatModelID':m['BoatModelID'],'schemaVersion':2,'videos':[],'documents':[],
            'ownerCommunities':[],'sources':[{'type':'CuratedResourceSet','label':'B-Atlas Global Resource Coverage Audit v6.66','verificationStatus':'Resource-set created; no resources inferred'}],
            'confidence':'Low','updatedAt':'2026-09-03','images':[]
        }
        resources.append(rec); res_by[m['BoatModelID']]=rec
resources.sort(key=lambda r:r['BoatModelID'])
res_path.write_text(json.dumps(resources,indent=2,ensure_ascii=False)+'\n')

def text(item): return (' '.join(str(item.get(k,'')) for k in ('title','resourceType','sourceLabel','notes'))).lower()
def classify(cat,item):
    t=text(item)
    flags=set()
    if cat=='videos': flags.add('video')
    if cat=='ownerCommunities':
        flags.add('owner_community')
        if any(w in t for w in ['technical','manual','archive','knowledge']): flags.add('parts_technical_support')
    if cat=='documents':
        if any(w in t for w in ['manufacturer model','factory','manufacturer heritage','manufacturer /','current manufacturer']): flags.add('manufacturer_source')
        if any(w in t for w in ['manual','wiring','parts','service','technical bulletin','technical document']): flags.add('manual_technical')
        if any(w in t for w in ['brochure','specification','configuration guide','spec sheet']): flags.add('brochure_spec')
        if any(w in t for w in ['review','boat test','model guide','sea trial','powerboat guide']): flags.add('independent_review')
        if any(w in t for w in ['history','archive','retrospective','registry','heritage']): flags.add('historical_archive')
        if any(w in t for w in ['survey','inspection','buyer']): flags.add('buying_inspection')
        if any(w in t for w in ['parts','support','manuals / support','technical']): flags.add('parts_technical_support')
    # fallback so every retained item has an audit class
    if not flags:
        flags.add({'videos':'video','ownerCommunities':'owner_community','documents':'other_document'}[cat])
    return sorted(flags)

def norm_url(u):
    try:
        p=urllib.parse.urlsplit(u)
        host=p.netloc.lower()
        if host.startswith('www.'): host=host[4:]
        path=re.sub('/+','/',p.path).rstrip('/') or '/'
        return f'{p.scheme.lower()}://{host}{path}'
    except: return str(u)

# Evidence references found during the specification completion series but not present in curated resources.
evidence=collections.defaultdict(set)
for p in sorted(glob.glob(str(ROOT/'data/specification-completion-batch-*.json'))):
    try: x=json.loads(Path(p).read_text())
    except: continue
    for u in x.get('updates',[]):
        mid=u.get('BoatModelID')
        if mid not in model_by: continue
        for url in u.get('EvidenceRefs') or []:
            if isinstance(url,str) and url.startswith(('http://','https://')): evidence[mid].add(url)

framework=[
 ('manufacturer_source','Manufacturer / factory source'),
 ('manual_technical','Manual / technical document'),
 ('brochure_spec','Brochure / specification sheet'),
 ('independent_review','Independent review / boat test'),
 ('video','Useful video / virtual tour'),
 ('owner_community','Owner association / community'),
 ('parts_technical_support','Parts / technical support'),
 ('historical_archive','Historical / archive resource'),
 ('buying_inspection','Buying / inspection guidance'),
]
model_rows=[]; class_model_counts=collections.Counter(); class_item_counts=collections.Counter(); total_items=0
for m in models:
    r=res_by[m['BoatModelID']]
    classes=collections.Counter(); entries=[]; existing=set()
    for cat in ('documents','ownerCommunities','videos'):
        for item in r.get(cat,[]):
            total_items+=1
            if item.get('url'): existing.add(norm_url(item['url']))
            flags=classify(cat,item)
            for f in flags: classes[f]+=1; class_item_counts[f]+=1
            entries.append({'group':cat,'title':item.get('title'),'url':item.get('url'),'resourceType':item.get('resourceType'),'verificationStatus':item.get('verificationStatus'),'scope':item.get('scope'),'auditClasses':flags})
    for f,_ in framework:
        if classes[f]: class_model_counts[f]+=1
    candidates=sorted(url for url in evidence.get(m['BoatModelID'],set()) if norm_url(url) not in existing)
    gaps=[{'id':f,'label':label} for f,label in framework if not classes[f]]
    count=len(entries)
    if count==0: level='Empty'
    elif count==1: level='Minimal'
    elif count<=3: level='Basic'
    elif count<=5: level='Good'
    else: level='Strong'
    model_rows.append({
        'BoatModelID':m['BoatModelID'],'Manufacturer':m.get('Manufacturer'),'Model':m.get('Model'),'Variant':m.get('Variant'),
        'resourceCount':count,'coverageLevel':level,'coverageKinds':len(framework)-len(gaps),'coverageKindsTotal':len(framework),
        'countsByKind':{f:classes[f] for f,_ in framework},'missingKinds':gaps,
        'candidateResearchSources':candidates,'candidateResearchSourceCount':len(candidates),'resources':entries
    })

# structural identity checks
model_ids=set(model_by); resource_ids={r['BoatModelID'] for r in resources}
summary={
 'release':'6.66.0','auditDate':'2026-09-03','canonicalModels':len(models),'resourceSets':len(resources),
 'missingResourceSets':sorted(model_ids-resource_ids),'orphanResourceSets':sorted(resource_ids-model_ids),
 'retainedResourceItems':total_items,
 'resourceGroups':{
   'documents':sum(len(r.get('documents',[])) for r in resources),
   'ownerCommunities':sum(len(r.get('ownerCommunities',[])) for r in resources),
   'videos':sum(len(r.get('videos',[])) for r in resources),
 },
 'modelsWithAnyResource':sum(x['resourceCount']>0 for x in model_rows),
 'modelsWithNoResource':sum(x['resourceCount']==0 for x in model_rows),
 'coverageLevelCounts':dict(collections.Counter(x['coverageLevel'] for x in model_rows)),
 'modelsByResourceKind':{f:class_model_counts[f] for f,_ in framework},
 'itemsByResourceKind':{f:class_item_counts[f] for f,_ in framework},
 'newResearchSourceCandidates':sum(x['candidateResearchSourceCount'] for x in model_rows),
 'modelsWithResearchSourceCandidates':sum(x['candidateResearchSourceCount']>0 for x in model_rows),
 'liveLinkVerification':'Not exhaustively re-run in this audit; retained verification status is preserved. Candidate research sources require curation before publication.'
}
out={'summary':summary,'framework':[{'id':f,'label':l} for f,l in framework],'models':model_rows}
(ROOT/'data/global-resource-coverage-audit-v6.66.json').write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n')
print(json.dumps(summary,indent=2))
