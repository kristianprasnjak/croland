#!/usr/bin/env python3
"""Spaja de-*.tsv u prijevodi-de.jsonl (isti format kao prijevodi.jsonl, kljuc "de")
i gradi obrnuti rjecnik rjecnik-de-hr.jsonl iz njega."""
import json, glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
de = {}
for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__) or '.', 'de-*.tsv'))):
    for ln in open(f, encoding='utf-8'):
        ln = ln.rstrip('\n')
        if not ln.strip(): continue
        lema, tr = ln.split('\t', 1)
        de[lema] = [x.strip() for x in tr.split(';') if x.strip()]
orig = [json.loads(l) for l in open(os.path.join(ROOT, 'prijevodi.jsonl'), encoding='utf-8') if l.strip()]
nedostaje = [o['lema'] for o in orig if o['lema'] not in de]
visak = sorted(set(de) - {o['lema'] for o in orig})
with open('prijevodi-de.jsonl', 'w', encoding='utf-8', newline='\n') as fo:
    for o in orig:
        if o['lema'] in de:
            fo.write(json.dumps({'lema': o['lema'], 'de': de[o['lema']]}, ensure_ascii=False) + '\n')
obr = {}
for o in orig:
    for d in de.get(o['lema'], []):
        obr.setdefault(d, [])
        if o['lema'] not in obr[d]: obr[d].append(o['lema'])
with open('rjecnik-de-hr.jsonl', 'w', encoding='utf-8', newline='\n') as fo:
    for k in sorted(obr, key=str.lower):
        fo.write(json.dumps({'de': k, 'hr': obr[k]}, ensure_ascii=False) + '\n')
print('lema:', len(orig), 'prevedeno:', len(orig) - len(nedostaje), 'nedostaje:', nedostaje[:20], 'visak:', visak[:20])
print('obrnuti rjecnik DE->HR:', len(obr))
