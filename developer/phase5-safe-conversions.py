#!/usr/bin/env python3
import json, re, hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'boatmodels.json'
REPORT_JSON = ROOT / 'developer/reports/phase5-safe-conversions.json'
REPORT_MD = ROOT / 'developer/reports/PHASE_5_SAFE_CONVERSIONS.md'

LIST_FIELDS = ['Strengths','TradeOffs','BestFor','AvoidIf','InspectionFocus','BuyerQuestions','OwnerActions']
NULLABLE_TEXT_FIELDS = ['Overview','Variant','Nickname','ImageURL','Designer','Construction','KeelType','Cooling','Galley','ResearchNotes']
UNKNOWN_MARKERS = {'', 'unknown', 'not known', 'not available', 'n/a', 'na', 'tbd', 'not documented'}

def clean_text(v):
    if not isinstance(v, str): return v
    v = v.replace('\r\n','\n').replace('\r','\n')
    v = re.sub(r'[ \t]+', ' ', v)
    v = re.sub(r' *\n *', '\n', v)
    return v.strip()

def split_obvious(v):
    """Split only explicit semicolon or line-separated lists. Never split commas."""
    if v is None: return []
    values = v if isinstance(v, list) else [v]
    out=[]
    for item in values:
        if not isinstance(item, str):
            if item not in (None, ''): out.append(item)
            continue
        item=clean_text(item)
        if not item: continue
        parts = re.split(r'\s*;\s*|\n+', item) if (';' in item or '\n' in item) else [item]
        for p in parts:
            p=clean_text(p)
            if p and p not in out: out.append(p)
    return out

def normalize_list_punctuation(items):
    out=[]
    for x in items:
        if not isinstance(x,str):
            out.append(x); continue
        x=clean_text(x)
        # Remove trailing semicolon/comma introduced as separators; preserve sentence periods.
        x=re.sub(r'[;,]+$', '', x).strip()
        if x and x not in out: out.append(x)
    return out

before_bytes=DATA.read_bytes()
models=json.loads(before_bytes)
report={'modelCount':len(models),'changes':{},'humanReviewPreserved':0,'beforeSha256':hashlib.sha256(before_bytes).hexdigest()}
for key in ['tradeOffsMigrated','listsSplit','whitespaceNormalized','unknownsStandardized','ambiguousCommaProsePreserved']:
    report['changes'][key]=0

for m in models:
    # Rename-by-migration: preserve Weaknesses legacy, populate new TradeOffs only when empty.
    old=m.get('Weaknesses')
    if not m.get('TradeOffs') and isinstance(old,str) and clean_text(old):
        new=normalize_list_punctuation(split_obvious(old))
        m['TradeOffs']=new
        report['changes']['tradeOffsMigrated'] += 1
        if len(new)>1: report['changes']['listsSplit'] += len(new)-1
        if ',' in old and ';' not in old and '\n' not in old:
            report['changes']['ambiguousCommaProsePreserved'] += 1

    # Normalize approved list fields; split only explicit separators.
    for f in LIST_FIELDS:
        oldv=m.get(f)
        newv=normalize_list_punctuation(split_obvious(oldv))
        if newv != oldv:
            # distinguish whitespace-only from splitting
            old_len=len(oldv) if isinstance(oldv,list) else (1 if oldv else 0)
            if len(newv)>old_len: report['changes']['listsSplit'] += len(newv)-old_len
            report['changes']['whitespaceNormalized'] += 1
            m[f]=newv

    # Standardize explicit textual unknown markers only in nullable text fields.
    for f in NULLABLE_TEXT_FIELDS:
        v=m.get(f)
        if isinstance(v,str):
            cleaned=clean_text(v)
            if cleaned.lower() in UNKNOWN_MARKERS:
                if v is not None:
                    m[f]=None; report['changes']['unknownsStandardized'] += 1
            elif cleaned != v:
                m[f]=cleaned; report['changes']['whitespaceNormalized'] += 1

    # Normalize Overview null and structured unknown containers, without interpreting false/No/0.
    if m.get('Overview') == '':
        m['Overview']=None; report['changes']['unknownsStandardized'] += 1
    if not isinstance(m.get('Suitability'),dict): m['Suitability']={}
    for f in ['KnownConcerns','ModelVariations']:
        if not isinstance(m.get(f),list): m[f]=[]
    es=m.get('EvidenceSummary')
    if not isinstance(es,dict): es={}
    es.setdefault('KnowledgeCoverage','Unknown')
    es.setdefault('EvidenceQuality','Unknown')
    es.setdefault('Statements',[])
    es.setdefault('UnresolvedInformation',[])
    m['EvidenceSummary']=es

DATA.write_text(json.dumps(models,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
after=DATA.read_bytes(); report['afterSha256']=hashlib.sha256(after).hexdigest()
REPORT_JSON.parent.mkdir(parents=True,exist_ok=True)
REPORT_JSON.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
REPORT_MD.write_text(f'''# Phase 5 — Safe Mechanical Conversions\n\n- Models processed: **{report['modelCount']}**\n- Weaknesses migrated into TradeOffs: **{report['changes']['tradeOffsMigrated']}**\n- Additional list items created from semicolons or line breaks: **{report['changes']['listsSplit']}**\n- Records/fields normalized for whitespace or list punctuation: **{report['changes']['whitespaceNormalized']}**\n- Explicit textual unknown markers standardized to null: **{report['changes']['unknownsStandardized']}**\n- Comma-containing prose preserved without splitting: **{report['changes']['ambiguousCommaProsePreserved']}**\n\n`Weaknesses` remains temporarily as a legacy migration field. No comma-based splitting or editorial rewriting was performed. Boolean `false`, textual `No`, and numeric zero were not converted automatically.\n''',encoding='utf-8')
print(json.dumps(report,indent=2))
