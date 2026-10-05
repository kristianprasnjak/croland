# python3 usporedi.py stari1.json novi1.json [stari2.json novi2.json]
# Razlike koje se javljaju i izmedu dva prolaza ISTE verzije (animirani brojaci, savjeti) su sum i ne ispisuju se.
import json, sys, difflib
def ucitaj(p): return {(k['scen'], k['korak']): k for k in json.load(open(p))['koraci']}
def razlike(x, y):
    r = set()
    for polje in ('url', 'naslov', 'lang'):
        if x[polje] != y[polje]: r.add((polje, '-', x[polje])); r.add((polje, '+', y[polje]))
    for l in difflib.unified_diff(x['tekst'].split('\n'), y['tekst'].split('\n'), lineterm='', n=0):
        if l.startswith(('---', '+++', '@@')): continue
        r.add(('tekst', l[0], l[1:]))
    sa, sb = set(x['atr']), set(y['atr'])
    for l in sa - sb: r.add(('atr', '-', l))
    for l in sb - sa: r.add(('atr', '+', l))
    return r
A, B = ucitaj(sys.argv[1]), ucitaj(sys.argv[2])
sum_ = {}
for i in range(3, len(sys.argv), 2):
    S1, S2 = ucitaj(sys.argv[i]), ucitaj(sys.argv[i + 1])
    for key in S1:
        if key in S2:
            s = {(p, t) for p, _, t in razlike(S1[key], S2[key])}
            sum_.setdefault(key, set()).update(s)
for X in (A, B):
    for key in X:
        for kk in sum_: pass
uk = 0
for key in A:
    if key not in B: print('NEMA KORAKA', key); uk += 1; continue
    s = sum_.get(key, set())
    # sum vrijedi u oba smjera (red u stari2 i novi2)
    r = [(p, z, t) for p, z, t in razlike(A[key], B[key]) if (p, t) not in s]
    if not r: continue
    uk += 1
    print(f'\n[{key[0]} | {key[1]}]')
    for p, z, t in sorted(r, key=lambda x: (x[0], x[1] == '+', x[2])): print(f'   {p:5} {z} {t[:230]}')
print('\nkoraka:', len(A), '| koraka s razlikom (bez suma):', uk)
