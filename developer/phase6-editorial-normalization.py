import json, re, hashlib, copy
from pathlib import Path
from collections import defaultdict

ROOT=Path(__file__).resolve().parents[1]
MODELS=ROOT/'boatmodels.json'
BI=ROOT/'knowledge/data/boatintelligence.json'
CUR=ROOT/'knowledge/data/curatedresources.json'
FACTS=ROOT/'knowledge/data/facts.json'
EVIDENCE=ROOT/'knowledge/data/evidence.json'
MFG=ROOT/'knowledge/data/manufacturerknowledge.json'
REPORT_DIR=ROOT/'developer/reports'
REPORT_DIR.mkdir(parents=True,exist_ok=True)

def clean(s):
    if s is None: return None
    s=re.sub(r'\s+',' ',str(s)).strip()
    return s or None

def phrase(s):
    s=clean(s)
    if not s: return None
    return s.rstrip(' .;:')

def dedupe(items):
    out=[]; seen=set()
    for x in items or []:
        x=phrase(x)
        if not x: continue
        k=x.casefold()
        if k not in seen:
            seen.add(k); out.append(x)
    return out

def join_words(vals):
    vals=[str(v) for v in vals if v not in (None,'',False)]
    if not vals: return ''
    if len(vals)==1:return vals[0]
    if len(vals)==2:return vals[0]+' and '+vals[1]
    return ', '.join(vals[:-1])+', and '+vals[-1]

def src_ids_for_model(mid, facts_by_model):
    ids=[]
    for f in facts_by_model.get(mid,[]):
        if f.get('Preferred'):
            ids.extend(f.get('SourceRefs') or [])
    return sorted(set(ids))

def make_overview(m):
    name=f"{m.get('Manufacturer','').strip()} {m.get('Model','').strip()}".strip()
    cfg=phrase(m.get('Configuration')) or phrase(m.get('Style')) or phrase(m.get('NormalizedStyle'))
    hull=phrase(m.get('HullBehaviour')) or phrase(m.get('NormalizedHullForm')) or phrase(m.get('HullType'))
    prop=[]
    eng=phrase(m.get('EngineConfiguration'))
    fuel=phrase(m.get('NormalizedFuel')) or phrase(m.get('Fuel'))
    drive=phrase(m.get('NormalizedPropulsion')) or phrase(m.get('Propulsion'))
    if eng: prop.append(eng.lower())
    if fuel and fuel.lower() not in ' '.join(prop).lower(): prop.append(fuel.lower())
    if drive and drive.lower() not in ' '.join(prop).lower(): prop.append(drive.lower())
    sentences=[]
    first=f"The {name} is"
    descriptors=[]
    if cfg: descriptors.append(cfg.lower())
    if hull and (not cfg or hull.casefold() not in cfg.casefold()): descriptors.append(hull.lower())
    if descriptors:
        
        article='an' if descriptors[0][:1].lower() in 'aeiou' else 'a'
        first+=f' {article} '+join_words(descriptors)
    else:
        first+=' a recreational powerboat model'
    fy,ly=m.get('FirstYear'),m.get('LastYear')
    if fy and ly: first+=f" produced from {fy} to {ly}"
    elif fy: first+=f" introduced in {fy}"
    first+='.'
    sentences.append(first)
    if prop:
        sentences.append('Typical examples use '+join_words(prop)+'.')
    layout=[]
    if m.get('Flybridge') is True or str(m.get('Flybridge')).lower()=='yes': layout.append('a flybridge')
    if m.get('AftCabin') is True or str(m.get('AftCabin')).lower()=='yes': layout.append('an aft cabin')
    cabins=m.get('Cabins'); berths=m.get('Berths'); heads=m.get('Heads')
    accom=[]
    if isinstance(cabins,(int,float)) and cabins>0: accom.append(f"{int(cabins)} cabin"+('s' if cabins!=1 else ''))
    if isinstance(berths,(int,float)) and berths>0: accom.append(f"{int(berths)} berths")
    if isinstance(heads,(int,float)) and heads>0: accom.append(f"{int(heads)} head"+('s' if heads!=1 else ''))
    details=layout+accom
    if details:
        sentences.append('The recorded configuration includes '+join_words(details)+'.')
    return ' '.join(sentences[:3])

def question_from_focus(item):
    p=phrase(item)
    if not p:return None
    low=p.lower()
    if low.startswith('confirm '):
        return p[0].upper()+p[1:]+'?'
    if low.startswith(('check ','verify ','inspect ','test ','review ')):
        return 'Has the seller documented this item: '+p+'?'
    return f"What inspection, repair or service history is available for {low}?"

def evidence_statement(scope, refs, types, confidence, notes=None):
    return {'Scope':scope,'EvidenceRefs':sorted(set(refs or [])),'EvidenceTypes':types or ['Unknown'],'Confidence':confidence,'Notes':notes}

models=json.load(open(MODELS,encoding='utf-8'))
bi_list=json.load(open(BI,encoding='utf-8'))
cur_list=json.load(open(CUR,encoding='utf-8'))
facts=json.load(open(FACTS,encoding='utf-8'))
ev_sources=json.load(open(EVIDENCE,encoding='utf-8'))
mfg_list=json.load(open(MFG,encoding='utf-8'))
bi={x['BoatModelID']:x for x in bi_list}
cur={x['BoatModelID']:x for x in cur_list}
facts_by_model=defaultdict(list)
for f in facts:facts_by_model[f.get('BoatModelID')].append(f)
ev_by_id={x.get('SourceID'):x for x in ev_sources}
mfg_by_model={}
for fam in mfg_list:
    for mid in fam.get('Models',[]):mfg_by_model[mid]=fam

before=copy.deepcopy(models)
report={'recordCount':len(models),'structuredIntelligenceMigrated':0,'neutralOverviewsCreated':0,'dimensionsReconciled':0,'dimensionConflicts':[],'fieldsPopulated':defaultdict(int),'unknownFieldsPreserved':defaultdict(int),'genericCommonProblemsNotPromoted':0,'legacyTypicalMissionNotPromoted':0,'models':[]}

generic_problem_patterns=[r'older systems',r'age-related',r'deck core moisture and tank corrosion',r'fuel tanks, wiring, and plumbing',r'normal age',r'varies by condition',r'older boats']

for m in models:
    mid=m['BoatModelID']; b=bi.get(mid); c=cur.get(mid); fam=mfg_by_model.get(mid)
    refs=src_ids_for_model(mid,facts_by_model)
    # neutral factual overview for every model
    m['Overview']=make_overview(m)
    report['neutralOverviewsCreated']+=1; report['fieldsPopulated']['Overview']+=1

    # Reconcile preferred fact values against master values; do not overwrite conflicts.
    dims=['FirstYear','LastYear','LOA_ft','LWL_ft','Beam_ft','Draft_ft','AirDraft_ft','Displacement_lb']
    conflicts=[]
    fmap={}
    for f in facts_by_model.get(mid,[]):
        if f.get('Preferred'): fmap[f.get('AttributeID')]=f
    for d in dims:
        if d in fmap:
            fv=fmap[d].get('Value'); mv=m.get(d)
            if fv is not None and mv is not None:
                equal=False
                try: equal=abs(float(fv)-float(mv))<1e-9
                except (ValueError,TypeError): equal=str(fv).strip()==str(mv).strip()
                if not equal:
                    conflicts.append({'Field':d,'ModelValue':mv,'PreferredFactValue':fv,'FactID':fmap[d].get('FactID')})
    if conflicts:
        report['dimensionConflicts'].append({'BoatModelID':mid,'Conflicts':conflicts})
    else: report['dimensionsReconciled']+=1

    m['Strengths']=dedupe(m.get('Strengths'))
    m['TradeOffs']=dedupe(m.get('TradeOffs'))
    m['AvoidIf']=dedupe(m.get('AvoidIf'))
    m['Suitability']={}
    m['BestFor']=[]
    m['KnownConcerns']=[]
    m['InspectionFocus']=[]
    m['BuyerQuestions']=[]
    m['OwnerActions']=[]
    m['ModelVariations']=m.get('ModelVariations') if isinstance(m.get('ModelVariations'),list) else []

    statements=[]
    unresolved=[]
    spec_conf='Low'; spec_type=['Unverified']
    verified_refs=[]
    for rid in refs:
        es=ev_by_id.get(rid,{})
        if es.get('VerificationStatus') in ('Verified','SourceVerified','Checked'):
            verified_refs.append(rid)
    if verified_refs:
        spec_conf='Moderate'; spec_type=['Technical or survey source']
    statements.append(evidence_statement('IdentityAndDimensions',refs,spec_type,spec_conf,
        'Values reconcile with preferred facts in the internal knowledge layer; legacy-source provenance is not independent verification.' if not verified_refs else 'Values reconcile with preferred facts linked to checked sources.'))
    statements.append(evidence_statement('Overview',refs,spec_type,spec_conf,'Neutral synthesis generated from recorded configuration and specification fields.'))

    if b:
        intel=b.get('intelligence',{})
        evrefs=[]
        evtypes=[]
        for e in b.get('evidence',[]):
            evrefs.extend(e.get('sourceRefs') or [])
            et=e.get('evidenceType')
            if et in ('CuratedReference','StructuredDatabase'): evtypes.append('Technical or survey source' if et=='CuratedReference' else 'Unverified')
            elif et=='EditorialAssessment': evtypes.append('Unverified')
        evrefs=sorted(set(evrefs)); evtypes=sorted(set(evtypes)) or ['Unverified']
        m['Strengths']=dedupe(intel.get('strengths') or m['Strengths'])
        m['TradeOffs']=dedupe(intel.get('tradeoffs') or m['TradeOffs'])
        ideal=intel.get('crewFit',{}).get('bestFor') or ([intel.get('idealOwner')] if intel.get('idealOwner') else []) or ([intel.get('buyerProfile')] if intel.get('buyerProfile') else [])
        m['BestFor']=dedupe(ideal)
        avoid=intel.get('lessSuitableIf') or intel.get('lessSuitableMissions') or intel.get('crewFit',{}).get('cautions') or m['AvoidIf']
        m['AvoidIf']=dedupe(avoid)
        best=dedupe(intel.get('bestMissions'))
        less=dedupe(intel.get('lessSuitableMissions'))
        if best:
            m['Suitability']['PrimaryMissions']={'Assessment':'Good','Summary':'; '.join(best),'EvidenceRefs':evrefs}
        if less:
            m['Suitability']['LessSuitableMissions']={'Assessment':'Limited','Summary':'; '.join(less),'EvidenceRefs':evrefs}
        m['InspectionFocus']=dedupe(intel.get('inspectionPriorities'))
        m['BuyerQuestions']=dedupe([question_from_focus(x) for x in m['InspectionFocus']])
        # common upgrades are not owner actions; preserve owner actions unknown.
        conf='Moderate' if b.get('confidence') in ('Medium','Moderate','High') else 'Low'
        for fld in ['Strengths','TradeOffs','BestFor','AvoidIf','Suitability','InspectionFocus','BuyerQuestions']:
            if m.get(fld):
                statements.append(evidence_statement(fld,evrefs,evtypes,conf,'Migrated from structured B-Scout boat intelligence; advisory statements remain editorial synthesis.'))
                report['fieldsPopulated'][fld]+=1
        report['structuredIntelligenceMigrated']+=1
    else:
        # Existing strengths/trade-offs/avoid-if remain as legacy editorial content, explicitly low confidence.
        for fld in ['Strengths','TradeOffs','AvoidIf']:
            if m.get(fld):
                statements.append(evidence_statement(fld,refs,['Unverified'],'Low','Legacy editorial content retained and normalized; independent support not yet established.'))
                report['fieldsPopulated'][fld]+=1
        if clean(m.get('TypicalMission')):
            report['legacyTypicalMissionNotPromoted']+=1
            unresolved.append('Suitability and Best For require evidence-based editorial review; legacy TypicalMission was retained but not promoted.')

    # Manufacturer-family knowledge may support inspection focus, but not model-specific concerns.
    if not m['InspectionFocus'] and fam:
        priorities=dedupe((fam.get('SharedKnowledge') or {}).get('OwnershipPriorities'))
        if priorities:
            m['InspectionFocus']=priorities[:6]
            m['BuyerQuestions']=dedupe([question_from_focus(x) for x in m['InspectionFocus']])
            famref=[f"manufacturerknowledge:{fam.get('ManufacturerID')}:{fam.get('FamilyName')}"]
            statements.append(evidence_statement('InspectionFocus',famref,['Technical or survey source'],'Moderate','Shared family guidance; confirm that each item applies to the model year and variation.'))
            statements.append(evidence_statement('BuyerQuestions',famref,['Technical or survey source'],'Moderate','Questions derived from supported family inspection priorities.'))
            report['fieldsPopulated']['InspectionFocus']+=1; report['fieldsPopulated']['BuyerQuestions']+=1

    cp=clean(m.get('CommonProblems'))
    if cp:
        if any(re.search(p,cp,re.I) for p in generic_problem_patterns):
            report['genericCommonProblemsNotPromoted']+=1
            unresolved.append('Legacy CommonProblems appears generic or age-related and was not promoted to Known Concerns.')
        else:
            unresolved.append('Legacy CommonProblems requires model-specific source verification before promotion to Known Concerns.')

    # Null/unknown material specs
    label_map={'AirDraft_ft':'air draft','Draft_ft':'draft','Displacement_lb':'displacement','FuelCapacity':'fuel capacity','WaterCapacity':'water capacity','HoldingCapacity':'holding capacity'}
    for fld,label in label_map.items():
        if m.get(fld) in (None,''):
            unresolved.append(f'{label.capitalize()} is unknown or not documented.')
    for fld in ['KnownConcerns','OwnerActions','ModelVariations']:
        if not m.get(fld): report['unknownFieldsPreserved'][fld]+=1
    if not m.get('BestFor'): report['unknownFieldsPreserved']['BestFor']+=1
    if not m.get('Suitability'): report['unknownFieldsPreserved']['Suitability']+=1
    if not m.get('InspectionFocus'): report['unknownFieldsPreserved']['InspectionFocus']+=1

    # Coverage/evidence are scoped and conservative.
    populated=sum(bool(m.get(f)) for f in ['Overview','Suitability','Strengths','TradeOffs','BestFor','AvoidIf','KnownConcerns','InspectionFocus','BuyerQuestions','OwnerActions','ModelVariations'])
    if b and c: coverage='Strong'
    elif b or m.get('ResearchStatus')=='Reviewed' or fam: coverage='Partial'
    elif populated>=4: coverage='Limited'
    else: coverage='Unknown'
    if b and c: quality='Moderate'
    elif verified_refs or fam: quality='Moderate'
    elif refs: quality='Low'
    else: quality='Unknown'
    m['EvidenceSummary']={'KnowledgeCoverage':coverage,'EvidenceQuality':quality,'Statements':statements,'UnresolvedInformation':dedupe(unresolved)}
    report['models'].append({'BoatModelID':mid,'Coverage':coverage,'EvidenceQuality':quality,'PopulatedFields':[f for f in ['Overview','Suitability','Strengths','TradeOffs','BestFor','AvoidIf','KnownConcerns','InspectionFocus','BuyerQuestions','OwnerActions','ModelVariations'] if m.get(f)],'UnresolvedCount':len(m['EvidenceSummary']['UnresolvedInformation'])})

# write
MODELS.write_text(json.dumps(models,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
report['fieldsPopulated']=dict(report['fieldsPopulated']); report['unknownFieldsPreserved']=dict(report['unknownFieldsPreserved'])
report['outputSha256']=hashlib.sha256(MODELS.read_bytes()).hexdigest()
(REPORT_DIR/'phase6-editorial-normalization.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

lines=['# Phase 6 — Editorial Normalization Report','',f"- Records processed: **{report['recordCount']}**",f"- Structured intelligence records migrated: **{report['structuredIntelligenceMigrated']}**",f"- Neutral overviews created: **{report['neutralOverviewsCreated']}**",f"- Identity/dimension records reconciled without internal conflicts: **{report['dimensionsReconciled']}**",f"- Internal dimension conflicts: **{len(report['dimensionConflicts'])}**",f"- Generic age-related Common Problems not promoted: **{report['genericCommonProblemsNotPromoted']}**",f"- Legacy Typical Mission entries retained for later evidence review: **{report['legacyTypicalMissionNotPromoted']}**",'', '## Populated fields','']
for k,v in sorted(report['fieldsPopulated'].items()): lines.append(f'- {k}: {v}')
lines += ['', '## Unknown fields deliberately preserved','']
for k,v in sorted(report['unknownFieldsPreserved'].items()): lines.append(f'- {k}: {v}')
lines += ['', '## Rules applied','', '- No external facts were invented.', '- Comma-separated prose was not mechanically split.', '- Structured boat intelligence was preferred over legacy prose.', '- Generic age-related risks were not promoted to model-specific Known Concerns.', '- Manufacturer-family priorities were used only as inspection guidance, with a variation warning.', '- Common upgrades were not converted into Owner Actions.', '- Evidence confidence is scoped by field or statement.', '- Unverified legacy data remains low confidence rather than being presented as verified.', '']
(REPORT_DIR/'PHASE_6_EDITORIAL_NORMALIZATION.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps({k:report[k] for k in ['recordCount','structuredIntelligenceMigrated','neutralOverviewsCreated','dimensionsReconciled','genericCommonProblemsNotPromoted','legacyTypicalMissionNotPromoted']},indent=2))
print('dimension conflicts',len(report['dimensionConflicts']))
