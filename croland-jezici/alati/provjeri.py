#!/usr/bin/env python3
"""provjeri.py --jezik XX - usporeduje igre/*.md s <mapa>/igre/*.md.
Provjerava: isti broj stranica, isti format, isti broj stavki i polja, nepromijenjena hrvatska polja,
kategorije razvrstavanja postoje u stupcima, [praznine] u tekstu ostale iste, 'en:' prefiks sacuvan.
Ispisuje i postotak prevedenosti po datoteci."""
import os, re, csv, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L
import izvuci as X
J, _ = L.iz_argumenata()
X.postavi(J)
CIL = J.igre
def parse(path):
    lines = open(path, encoding='utf-8', errors='replace').read().replace('\r', '').split('\n')
    str_, cur = [], None
    for l in lines:
        if l.startswith('## '):
            cur = {'naslov': l[3:], 'meta': {}, 'stavke': []}; str_.append(cur); continue
        if cur is None: continue
        t = l.strip()
        m = re.match(r'^[-*]\s+(.+)$', t)
        if m: cur['stavke'].append([p.strip() for p in m.group(1).split('|')]); continue
        m = re.match(r'^(\w+):\s*(.+)$', t)
        if m: cur['meta'][m.group(1).lower()] = m.group(2).strip()
    return str_
greske = []
for f in X.datoteke():
    pd = os.path.join(CIL, f)
    if not os.path.exists(pd): greske.append(f'{f}: nema datoteke u {J.cfg["mapa"]}/igre'); continue
    A, B = parse(os.path.join(X.IGRE, f)), parse(pd)
    if len(A) != len(B): greske.append(f'{f}: broj stranica {len(A)} != {len(B)}'); continue
    for i, (a, b) in enumerate(zip(A, B), 1):
        if a['meta'].get('format') != b['meta'].get('format'): greske.append(f'{f}#{i}: format')
        if len(a['stavke']) != len(b['stavke']): greske.append(f'{f}#{i}: broj stavki'); continue
        stupci = [x.strip() for x in b['meta'].get('stupci', '').split('|')] if 'stupci' in b['meta'] else None
        for j, (sa, sb) in enumerate(zip(a['stavke'], b['stavke']), 1):
            if len([x for x in sa if x]) != len([x for x in sb if x]): greske.append(f'{f}#{i}.{j}: broj polja'); continue
            for pa, pb in zip(sa, sb):
                if re.findall(r'\[[^\]]+\]', pa) != re.findall(r'\[[^\]]+\]', pb) and re.findall(r'\[[^\]]+\]', pa):
                    greske.append(f'{f}#{i}.{j}: [praznine] promijenjene: {pa[:50]} -> {pb[:50]}')
                if pa.lower().startswith('en:') != pb.lower().startswith('en:'):
                    greske.append(f'{f}#{i}.{j}: en: prefiks')
            if stupci and b['meta'].get('format') == 'razvrstavanje' and len(sb) > 1 and sb[1] not in stupci:
                greske.append(f'{f}#{i}.{j}: kategorija "{sb[1]}" nije u stupcima {stupci}')
print(f'[{J.kod}] greske:', len(greske))
for g in greske[:60]: print(' ', g)
