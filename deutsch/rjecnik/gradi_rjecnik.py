import re,glob,os,csv
# Pokreni iz mape deutsch/rjecnik:  python3 gradi_rjecnik.py
os.chdir(os.path.dirname(os.path.abspath(__file__)))
S='../igre'
def lvl(fn):
    m=re.search(r'-(\d\d)\.md',fn); return int(m.group(1))
def key(de):
    d=de.strip()
    d=re.sub(r'\s*\(.*?\)','',d)
    d=re.split(r'\s*(,|→| / )\s*',d)[0]
    d=re.sub(r'^(der|die|das)\s+','',d)
    d=d.replace('·','').replace('sich ','').strip().lower()
    return d
entries={}
order=[]
DROP={'gefeiert','verstanden','die socken'}
def junk(de):
    d=de.strip()
    if d.endswith('.') : return True
    if re.match(r'^(ein|eine) ',d): return True
    if d.lower() in DROP: return True
    return False
def add(level,de,en,hr,src):
    if src!='800' and junk(de): return
    k=key(de)
    if not k or len(k)>40: return
    if k in entries:
        e=entries[k]
        if level<e['lvl']: e['lvl']=level
        # prefer richer german form (with plural/forms)
        if (',' in de or '→' in de) and not (',' in e['de'] or '→' in e['de']): e['de']=de
        return
    entries[k]=dict(lvl=level,de=de.strip(),en=en.strip(),hr=hr.strip(),src=src)
    order.append(k)
# 1) base 800
for r in csv.DictReader(open('../../DE-rjecnik-800.tsv'),delimiter='\t'):
    add(int(r['razina'][1:]),r['njemački'].replace('|','·'),r['engleski'],r['hrvatski'],'800')
# 1b) supplement
for line in open('dodatak.tsv'):
    p=line.rstrip('\n').split('\t')
    if len(p)==5: pass
# (merged after course below)
# 2) course kartice
for fn in sorted(glob.glob(S+'/*.md')):
    L=lvl(fn); fmt=None
    for line in open(fn):
        line=line.rstrip('\n')
        if line.startswith('## '): fmt=None
        m=re.match(r'^format:\s*(\w+)',line)
        if m: fmt=m.group(1)
        if fmt in('kartice','spajanje','memorija','parovi') and line.startswith('- ') and not line.startswith('- hr:') and not line.startswith('- en:') and not line.startswith('- tab:'):
            p=[x.strip() for x in line[2:].split('|')]
            if len(p)>=2 and ' // ' in p[1]:
                hr,en=p[1].split(' // ',1)
                de=p[0]
                if len(de.split())>4 and '→' not in de: continue  # skip sentences
                if de.endswith('?') or de.endswith('!') : 
                    if len(de.split())>3: continue
                add(L,de,en,hr,'tečaj')
        if fmt=='upis' and 'vokabular' in fn and line.startswith('- '):
            p=[x.strip() for x in line[2:].split('|')]
            if len(p)==2 and ' // ' in p[0]:
                hr,en=p[0].split(' // ',1)
                add(L,p[1],en,hr,'tečaj')
for line in open('dodatak.tsv'):
    p=line.rstrip('\n').split('\t')
    if len(p)==5: add(int(p[0][1:]),p[1],p[3],p[2],p[4])
rows=sorted(entries.values(),key=lambda e:(e['lvl'],key(e['de'])))
with open('rjecnik-de.tsv','w') as f:
    f.write('razina\tnjemački\thrvatski\tengleski\tizvor\n')
    for e in rows: f.write(f"L{e['lvl']}\t{e['de']}\t{e['hr']}\t{e['en']}\t{ {'800':'osnovni','tečaj':'tečaj','dodatno':'dodatno'}[e['src']] }\n")
from collections import Counter
c=Counter(e['lvl'] for e in rows); print(len(rows)); print(sorted(c.items()))
print(Counter(e['src'] for e in rows))

# ---------- obogaćivanje: slika + primjer iz tečaja ----------
SLIKOVNE = ('spajanje', 'baloni', 'pamti', 'slova', 'zid')
slika_de = {}
recenice = []  # (razina, de, hr, en)
for fn in sorted(glob.glob(S + '/*.md')):
    L = lvl(fn); fmt = None
    for line in open(fn, encoding='utf-8'):
        line = line.rstrip('\n')
        if line.startswith('## '): fmt = None
        m = re.match(r'^format:\s*(\w+)', line)
        if m: fmt = m.group(1)
        if not line.startswith('- ') or line.startswith(('- hr:', '- en:', '- tab:')): continue
        p = [x.strip() for x in line[2:].split('|')]
        if fmt in SLIKOVNE and len(p) == 3:
            slika_de.setdefault(key(p[0]), p[2])
        if fmt in ('tekst', 'slaganje', 'sprechen', 'kartice') and len(p) >= 2 and ' // ' in p[1]:
            de = re.sub(r'\[|\]', '', p[0])
            if len(de.split()) >= 3 and de[-1] in '.!?':
                hr, en = p[1].split(' // ', 1)
                recenice.append((L, de, hr, en))
recenice.sort(key=lambda r: r[0])
_sl = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'slike-kljucevi.txt')
SLIKE = set(open(_sl, encoding='utf-8').read().split('\n')) if os.path.exists(_sl) else set()

def oblici(de):
    d = de.replace('·', '')
    glava = re.split(r'\s*(,|→| / )\s*', re.sub(r'\s*\(.*?\)', '', d))[0]
    glava = re.sub(r'^(der|die|das|sich)\s+', '', glava).strip()
    f = {glava}
    for m in re.finditer(r'(?:→|·)\s*(?:er|es|sie|ich) (\w+)', d): f.add(m.group(1))
    for m in re.finditer(r'(?:→|·)\s*(?:hat|ist) (?:sich )?(\w+)', d): f.add(m.group(1))
    m = re.match(r'^(?:der|die|das) \w+, (\w+)', d)
    if m: f.add(m.group(1))
    return {x for x in f if len(x) > 2}

rows = []
for line in open('rjecnik-de.tsv', encoding='utf-8').read().rstrip('\n').split('\n')[1:]:
    r = line.split('\t')
    k = key(r[1])
    sl = slika_de.get(k, '')
    if not sl:
        prvi = re.split(r'[,;(/]', r[2])[0].strip()
        if prvi in SLIKE: sl = prvi
    lv = int(r[0][1:])
    pr = ('', '', '')
    forms = oblici(r[1])
    if forms:
        rx = re.compile(r'(?<![\wäöüß])(' + '|'.join(re.escape(x) for x in forms) + r')(?![\wäöüß])')
        kand = [x for x in recenice if rx.search(x[1])]
        if kand:
            # najraniji primjer na razini riječi ili kasnije, inače najraniji uopće
            ok = [x for x in kand if x[0] >= lv] or kand
            pr = ok[0][1:]
    rows.append(r + [sl, *pr])
with open('rjecnik-de.tsv', 'w', encoding='utf-8') as f:
    f.write('razina\tnjemački\thrvatski\tengleski\tizvor\tslika\tprimjer\tprimjer_hr\tprimjer_en\n')
    for r in rows: f.write('\t'.join(r) + '\n')
print('slika:', sum(1 for r in rows if r[5]), 'primjer:', sum(1 for r in rows if r[6]))
