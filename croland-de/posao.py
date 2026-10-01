#!/usr/bin/env python3
"""Pomocni alat za prevodenje po datotekama.
  python3 posao.py dump lekcija-05.md [...]   -> ispise neprevedene stringove (N<TAB>en) i spremi _radno/posao.json
  python3 posao.py upis _radno/de.txt          -> upise N<TAB>de u prijevod-de.tsv
  python3 posao.py stanje                      -> postotak po datoteci"""
import sys, os, csv, json
import izvuci as X
OUT = X.OUT
MEM = os.path.join(OUT, 'prijevod-de.tsv')
def citaj():
    with open(MEM, encoding='utf-8') as fi:
        return list(csv.DictReader(fi, delimiter='\t'))
def pisi(rows):
    with open(MEM, 'w', encoding='utf-8', newline='') as fo:
        w = csv.DictWriter(fo, fieldnames=['en', 'de', 'puta', 'prvi_id', 'jezik'], delimiter='\t', lineterminator='\n')
        w.writeheader(); w.writerows(rows)
cmd = sys.argv[1]
if cmd == 'dump':
    rows = {r['en']: r for r in citaj()}
    lista, vid = [], set()
    for f in sys.argv[2:]:
        X.segmenti.clear(); X.obradi(f)
        for s in X.segmenti:
            t = s[6]
            if s[5] == 'hr' or t in vid: continue
            vid.add(t)
            if t in rows and rows[t]['de']: continue
            lista.append(t)
    json.dump(lista, open(os.path.join(OUT, '_radno', 'posao.json'), 'w', encoding='utf-8'), ensure_ascii=False)
    for i, t in enumerate(lista): print(f'{i}\t{t}')
    print(f'# ukupno {len(lista)}, znakova {sum(map(len, lista))}', file=sys.stderr)
elif cmd == 'upis':
    lista = json.load(open(os.path.join(OUT, '_radno', 'posao.json'), encoding='utf-8'))
    rows = citaj(); idx = {r['en']: r for r in rows}
    n = 0; greske = []
    for ln in open(sys.argv[2], encoding='utf-8'):
        ln = ln.rstrip('\n')
        if not ln.strip() or '\t' not in ln: continue
        i, d = ln.split('\t', 1)
        i = int(i); en = lista[i]
        if en not in idx: greske.append(i); continue
        idx[en]['de'] = d; n += 1
    pisi(rows)
    nedost = [i for i, t in enumerate(lista) if not idx.get(t, {}).get('de')]
    print('upisano', n, 'greske', greske, 'neprevedeno iz posla:', nedost[:30], len(nedost))
elif cmd == 'stanje':
    rows = {r['en']: r['de'] for r in citaj()}
    uk = [0, 0]
    for f in X.datoteke():
        X.segmenti.clear(); X.obradi(f)
        s = {x[6] for x in X.segmenti if x[5] != 'hr'}
        p = sum(1 for t in s if rows.get(t)); uk[0] += p; uk[1] += len(s)
        if p: print(f'{f}: {p}/{len(s)}')
    print(f'UKUPNO {uk[0]}/{uk[1]} ({100*uk[0]/max(1,uk[1]):.1f} %)')
