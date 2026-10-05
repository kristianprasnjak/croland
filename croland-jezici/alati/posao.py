#!/usr/bin/env python3
"""Pomocni alat za prevodenje po datotekama (jedan jezik):
  python3 posao.py --jezik XX dump lekcija-05.md [...]  -> ispise neprevedene stringove (N<TAB>en), spremi <mapa>/_radno/posao.json
  python3 posao.py --jezik XX upis <mapa>/_radno/xx.txt  -> upise N<TAB>prijevod u <mapa>/prijevod-XX.tsv
  python3 posao.py --jezik XX stanje                     -> postotak po datoteci
`upis` mora doci prije sljedeceg `dump`."""
import sys, os, csv, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L
import izvuci as X
J, arg = L.iz_argumenata()
X.postavi(J)
K = J.kod
POSAO = os.path.join(J.radno, 'posao.json')
def citaj():
    with open(J.memorija, encoding='utf-8') as fi:
        return list(csv.DictReader(fi, delimiter='\t'))
def pisi(rows):
    with open(J.memorija, 'w', encoding='utf-8', newline='') as fo:
        w = csv.DictWriter(fo, fieldnames=['en', K, 'puta', 'prvi_id', 'jezik'], delimiter='\t', lineterminator='\n')
        w.writeheader(); w.writerows(rows)
if not arg: raise SystemExit(__doc__)
cmd = arg[0]
if cmd == 'dump':
    rows = {r['en']: r for r in citaj()}
    lista, vid = [], set()
    for f in arg[1:]:
        X.segmenti.clear(); X.obradi(f)
        for s in X.segmenti:
            t = s[6]
            if s[5] == 'hr' or t in vid: continue
            vid.add(t)
            if t in rows and rows[t][K]: continue
            lista.append(t)
    os.makedirs(J.radno, exist_ok=True)
    json.dump(lista, open(POSAO, 'w', encoding='utf-8'), ensure_ascii=False)
    for i, t in enumerate(lista): print(f'{i}\t{t}')
    print(f'# ukupno {len(lista)}, znakova {sum(map(len, lista))}', file=sys.stderr)
elif cmd == 'upis':
    lista = json.load(open(POSAO, encoding='utf-8'))
    rows = citaj(); idx = {r['en']: r for r in rows}
    n = 0; greske = []
    for ln in open(arg[1], encoding='utf-8'):
        ln = ln.rstrip('\n')
        if not ln.strip() or '\t' not in ln: continue
        i, d = ln.split('\t', 1)
        i = int(i); en = lista[i]
        if en not in idx: greske.append(i); continue
        idx[en][K] = d; n += 1
    pisi(rows)
    nedost = [i for i, t in enumerate(lista) if not idx.get(t, {}).get(K)]
    print('upisano', n, 'greske', greske, 'neprevedeno iz posla:', nedost[:30], len(nedost))
elif cmd == 'stanje':
    rows = {r['en']: r[K] for r in citaj()}
    uk = [0, 0]
    for f in X.datoteke():
        X.segmenti.clear(); X.obradi(f)
        s = {x[6] for x in X.segmenti if x[5] != 'hr'}
        p = sum(1 for t in s if rows.get(t)); uk[0] += p; uk[1] += len(s)
        if p: print(f'{f}: {p}/{len(s)}')
    print(f'[{K}] UKUPNO {uk[0]}/{uk[1]} ({100*uk[0]/max(1,uk[1]):.1f} %)')
else:
    raise SystemExit(__doc__)
