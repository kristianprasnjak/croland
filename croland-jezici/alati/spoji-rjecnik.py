#!/usr/bin/env python3
"""spoji-rjecnik.py --jezik XX - spaja <mapa>/rjecnik/XX-*.tsv (lema <TAB> znacenje; znacenje; ...)
u <mapa>/rjecnik/prijevodi-XX.jsonl (isti format kao prijevodi.jsonl, kljuc "XX")
i gradi obrnuti rjecnik <mapa>/rjecnik/rjecnik-XX-hr.jsonl."""
import json, glob, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L
J, _ = L.iz_argumenata()
K = J.kod
pr = {}
for f in sorted(glob.glob(os.path.join(J.rjecnik, f'{K}-*.tsv'))):
    for ln in open(f, encoding='utf-8'):
        ln = ln.rstrip('\n')
        if not ln.strip(): continue
        lema, tr = ln.split('\t', 1)
        pr[lema] = [x.strip() for x in tr.split(';') if x.strip()]
orig = [json.loads(l) for l in open(os.path.join(L.ROOT, 'prijevodi.jsonl'), encoding='utf-8') if l.strip()]
nedostaje = [o['lema'] for o in orig if o['lema'] not in pr]
visak = sorted(set(pr) - {o['lema'] for o in orig})
os.makedirs(J.rjecnik, exist_ok=True)
with open(J.rjecnik_prijevodi, 'w', encoding='utf-8', newline='\n') as fo:
    for o in orig:
        if o['lema'] in pr:
            fo.write(json.dumps({'lema': o['lema'], K: pr[o['lema']]}, ensure_ascii=False) + '\n')
obr = {}
for o in orig:
    for d in pr.get(o['lema'], []):
        obr.setdefault(d, [])
        if o['lema'] not in obr[d]: obr[d].append(o['lema'])
with open(J.rjecnik_obrnuti, 'w', encoding='utf-8', newline='\n') as fo:
    for k in sorted(obr, key=str.lower):
        fo.write(json.dumps({K: k, 'hr': obr[k]}, ensure_ascii=False) + '\n')
print(f'[{K}] lema:', len(orig), 'prevedeno:', len(orig) - len(nedostaje), 'nedostaje:', nedostaje[:20], 'visak:', visak[:20])
print(f'[{K}] obrnuti rjecnik {K.upper()}->HR:', len(obr))
