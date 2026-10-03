# Filtar sumnjivih redaka njemačkog prijevoda. Ne mijenja ništa; piše pregled/sumnjivo.tsv
import re, collections, os
D = os.path.dirname(os.path.abspath(__file__)); B = os.path.dirname(D); R = os.path.dirname(B)
def tsv(p):
    L = open(p, encoding='utf-8').read().split('\n')
    return [l.split('\t') for l in L[1:] if l]
pr = {r[0]: r[1] for r in tsv(os.path.join(B, 'prijevod-de.tsv')) if len(r) > 1}
su = [r for r in tsv(os.path.join(B, 'sucelje-de.tsv')) if len(r) > 3]
seg = tsv(os.path.join(B, 'segmenti.tsv'))
out = []
def add(kat, dat, en, de, det=''):
    out.append((kat, dat, en, de, det))
def eff(en, de): return en if de == '=' else de
rows = [('prijevod-de.tsv', en, de) for en, de in pr.items()] + [('sucelje-de.tsv', r[0], r[1]) for r in su]
# 1 isti en (normaliziran) -> različiti de
norm = lambda s: re.sub(r'[\s.!?:…]+$', '', s.strip()).lower()
g = collections.defaultdict(set); gk = collections.defaultdict(set)
for f, en, de in rows:
    if de and de != '=':
        g[norm(en)].add(norm(de)); gk[norm(en)].add((f, en, de))
for k, v in g.items():
    if len(v) > 1 and len(k) > 1:
        for f, en, de in gk[k]: add('nekonzistentno', f, en, de, ' | '.join(sorted(v))[:200])
ENW = r'\b(the|and|you|your|tap|choose|with|word|words|this|that|is|are|of|to|what|which|correct|answer|lesson|type|right|wrong|next|try|again)\b'
VAR = r'\{[^}]*\}|\$\{[^}]*\}|<[^>]+>|&[a-z]+;'
SIE = r'(?<![.!?:"„»\n]\s)(?<![.!?:"„»(\n])(?<!^)\b(Sie|Ihr|Ihre|Ihren|Ihrem|Ihrer|Ihres|Ihnen)\b'
for f, en, de in rows:
    if not de or de == '=': continue
    if re.search(r'Englisch', de): add('englisch', f, en, de)
    w = re.findall(ENW, de)
    if w and de != en: add('zaostali_en', f, en, de, ','.join(sorted(set(w))))
    if de == en and len(en.split()) >= 3 and re.search(ENW, en, re.I): add('nepreveden(=en)', f, en, de)
    if sorted(re.findall(VAR, en)) != sorted(re.findall(VAR, de)): add('placeholder/html', f, en, de, str(re.findall(VAR, en)) + '→' + str(re.findall(VAR, de)))
    if en.count('**') != de.count('**') or de.count('**') % 2: add('zvjezdice', f, en, de)
    if en.startswith('en:') != de.startswith('en:'): add('en:prefiks', f, en, de)
    if (en[:1].isspace(), en[-1:].isspace()) != (de[:1].isspace(), de[-1:].isspace()): add('rubni_razmak', f, en, de)
    for s in re.split(r'(?<=[.!?])\s+', de):
        if re.search(SIE, s.strip()): add('Sie/Ihr', f, en, de, s.strip()[:80]); break
# sučelje: duljina i fragmenti
src = {}
def line(fn, n):
    if fn not in src: src[fn] = open(os.path.join(R, fn), encoding='utf-8', errors='replace').read().split('\n')
    L = src[fn]; return L[n-1] if 0 < n <= len(L) else ''
for en, de, iz, rd in [r[:4] for r in su]:
    d = eff(en, de)
    if de and len(en.strip()) >= 4 and len(d) > 1.6 * len(en): add('preduge(>1.6x)', 'sucelje-de.tsv', en, de, f'{len(en)}→{len(d)}')
    if en != en.strip() or en.rstrip().endswith(':') or en.endswith(' is'):
        fn = 'pregledi.js' if iz == 'pregledi.js' else 'index.html'
        L = line(fn, int(rd)) if rd.isdigit() else ''
        i = L.find(en.strip()); ctx = L[max(0, i-30): i+len(en.strip())+30] if i >= 0 else L.strip()[:90]
        add('fragment', 'sucelje-de.tsv', en, de, f'{fn}:{rd} … {ctx} …')
# odavanje rješenja
FORM = re.compile(r'accusativ|genitiv|dativ|locativ|instrumental|vocativ|nominativ|\bcase|gender|masculine|feminine|neuter|plural|singular|form\b|forms|ending|conjugat|\bverb|tense|past|future|aspect|agree|own\b|possessive|pronoun|adjective|comparative', re.I)
pages = collections.defaultdict(list)
for r in seg:
    if len(r) > 6: pages[r[1] + '#' + r[2]].append(r)
ART = re.compile(r'\b(der|die|das|den|dem|des|eine[mnrs]?|keine[mnrs]?|meine[mnrs]?|deine[mnrs]?|seine[mnrs]?|ihre[mnrs]?|unsere[mnrs]?|eure[mnrs]?|diese[mnrs]?|welche[mnrs]?|eigene[mnrs]?|[a-zäöüß]{3,}(?:e|em|er|es))\b')
STOP = {'eine','keine','oder','aber','hier','wie','sie','wir','ihr','er','es','habe','gehe','esse','trinke','bitte','gerne','gern','immer','sehr','mehr','über','unter','hinter','wieder','sowie','ohne','seit','vor','nur','jetzt','heute','morgen','nie','alle','alles','viele','beide','andere','e','oben','unten','dabei','daher','oder','weder','jeder','jede','jedes','bereits','genauso','langsame','leise','gleiche'}
seen = set()
for pid, rs in pages.items():
    fmt = rs[0][3]
    if fmt not in ('izbor', 'upis', 'nastavak', 'slaganje', 'brzina', 'spajanje', 'poredak'): continue
    meta = ' '.join(r[6] for r in rs if r[4] in ('naslov', 'opis', 'info', 'infokratko') and r[5] == 'en')
    if not FORM.search(meta): continue
    for r in rs:
        if r[5] != 'en' or not r[4].startswith(('stavka', 'opis', 'infokratko')): continue
        en = r[6]; de = pr.get(en, '')
        if not de or de == '=' or (en, r[4][:3]) in seen: continue
        if r[4].startswith('stavka'):
            hint = ' '.join(re.findall(r'\(([^)]*)\)', de)) or (de.split('→')[-1] if '→' in de else (de if '___' not in de and len(de.split()) <= 4 else ''))
            hits = [m for m in ART.findall(hint) if m.lower() not in STOP]
        else:
            hits = re.findall(r'\b(den|dem|des)\b', de)
        if hits:
            seen.add((en, r[4][:3])); add('odavanje', r[1], en, de, f'{r[0]} | {",".join(hits)} | {meta[:70]}')
with open(os.path.join(D, 'sumnjivo.tsv'), 'w', encoding='utf-8') as f:
    f.write('kategorija\tdatoteka\tkljuc_en\tde\tdetalj\n')
    for o in out: f.write('\t'.join(x.replace('\t', ' ').replace('\n', ' ') for x in o) + '\n')
c = collections.Counter(o[0] for o in out)
for k, v in c.most_common(): print(f'{v:6}  {k}')
print(f'{len(out):6}  UKUPNO -> pregled/sumnjivo.tsv')
