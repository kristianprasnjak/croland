#!/usr/bin/env python3
"""izvuci.py - izvlaci sve engleske dijelove iz igre/*.md u segmenti.tsv
i jedinstvene stringove u prijevod-de.tsv (prijevodna memorija EN -> DE).
Postojeci prijevodi u prijevod-de.tsv se cuvaju."""
import os, re, csv, json, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IGRE = os.path.join(ROOT, 'igre')
OUT = os.path.dirname(os.path.abspath(__file__))

EN_SW = set("""the a an is are am was were be been i you he she it we they my your his her its our their this that these those
what which who where when how why to of in on at for with from by and or but not no yes do does did don't can't it's i'm you're
there here have has had will would can could should must just only also very too more most some any all every each
tap type pick choose match find sort read say put write drag swipe word words sentence sentences letter letters ending endings
meaning means english croatian today lesson your one two three first next last same right wrong correct answer""".split())
HR_SW = set("""je su sam si smo ste i a ali jer ne da li se na u od do za s sa iz po o ovo to taj ta ona on ono oni mi vi ti ja
što gdje kada kako zašto koji koja koje moj moja tvoj tvoja naš imam ima volim pijem jedem molim dobar dobra dobro dan""".split())
DIAK = re.compile(r'[čćžšđČĆŽŠĐ]')

# rjecnici: hrvatski oblici i engleska znacenja
HR_OBL, EN_RIJ = set(), set()
def _ucitaj():
    for ln in open(os.path.join(ROOT, 'rjecnik.jsonl'), encoding='utf-8'):
        try: o = json.loads(ln)
        except Exception: continue
        HR_OBL.add(o.get('lema', '').lower())
        for v in (o.get('oblici') or {}).values():
            if isinstance(v, str): HR_OBL.add(v.lower())
            elif isinstance(v, dict):
                for x in v.values():
                    if isinstance(x, str): HR_OBL.add(x.lower())
    for ln in open(os.path.join(ROOT, 'prijevodi.jsonl'), encoding='utf-8'):
        try: o = json.loads(ln)
        except Exception: continue
        for e in o.get('en', []):
            for x in re.findall(r"[a-z']+", e.lower()): EN_RIJ.add(x)
_ucitaj()

def jezik(s):
    """'en', 'hr' ili '?' za kratki string."""
    t = re.sub(r'\*\*?|_{2,}|\[[^\]]*\]', ' ', s)
    if t.strip().lower().startswith('en:'):
        return 'en'
    w = re.findall(r"[A-Za-zčćžšđČĆŽŠĐ']+", t.lower())
    if not w:
        return '?'
    en = sum(1 for x in w if x in EN_SW)
    hr = sum(1 for x in w if x in HR_SW) + 2 * len(DIAK.findall(t))
    if en > hr: return 'en'
    if hr > en: return 'hr'
    hr2 = sum(1 for x in w if x in HR_OBL)
    en2 = sum(1 for x in w if x in EN_RIJ)
    if hr2 > en2: return 'hr'
    if en2 > hr2: return 'en'
    return '?'


def jezik_proza(s):
    """Za retke proze (tekst): hrvatski primjeri su obicno u *kurzivu* ili **masnom**;
    klasificira se ono sto ostane izvan oznaka."""
    if s.startswith('tab:'): return 'en'
    van = re.sub(r'\*\*([^*]+)\*\*', r' \1 ', s)          # masno: zadrzi sadrzaj (cesto engleska uputa)
    van = re.sub(r'\*[^*]+\*|\[[^\]]*\]', ' ', van)       # kurziv i [praznine]: hrvatski primjeri
    w = re.findall(r"[A-Za-z']+", van.lower())
    en = sum(1 for x in w if x in EN_SW)
    hr = sum(1 for x in w if x in HR_SW)
    if en >= 2 or (en >= 1 and en >= hr): return 'en'
    if ' | ' in s and jezik(s.split(' | ', 1)[1]) == 'en': return 'en'   # "hrvatski | engleski"
    return jezik(s) if jezik(s) != '?' else 'en'

def jezik_polje(p):
    """Za polje stavke: hrvatski s engleskim hintom u zagradi -> en (prevodi se samo hint)."""
    j = jezik(p)
    if j != 'en':
        for z in re.findall(r'\(([^)]*)\)', p):
            if DIAK.search(z): continue
            w = re.findall(r"[A-Za-z']+", z.lower())
            if w and any((x in EN_SW or x in EN_RIJ) and x not in HR_OBL for x in w):
                return 'en'
    return j

# meta kljucevi koji su uvijek engleski tekst
# formati u kojima je prvo polje stavke uvijek hrvatsko
PRVO_HR = {'kartice', 'parovi', 'memorija', 'spajanje', 'baloni', 'pamti', 'zid', 'slova', 'nastavak',
           'brzina', 'slaganje', 'razvrstavanje', 'poredak'}
# rucne iznimke: id segmenta -> jezik (hr = ne prevodi se, en = prevodi se)
IZNIMKE = {}
_ip = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'iznimke.tsv')
if os.path.exists(_ip):
    for _l in open(_ip, encoding='utf-8'):
        _p = _l.rstrip('\n').split('\t')
        if len(_p) >= 2 and not _l.startswith('#'): IZNIMKE[_p[0]] = _p[1]
META_EN = {'info', 'infokratko', 'opis', 'infoodmah'}
META_NE = {'format', 'cjelina', 'datum', 'broj', 'trajanje', 'prag', 'nastavci', 'bodovi', 'tekst', 'glasovi', 'slika', 'id'}

def datoteke():
    for f in sorted(os.listdir(IGRE)):
        if f.endswith('.md'):
            yield f

segmenti = []   # (id, datoteka, stranica, format, polje, jezik, en)
def dodaj(id_, f, st, fmt, polje, txt, jez):
    segmenti.append((id_, f, st, fmt, polje, jez, txt))

def obradi(f, tr=None):
    """Prolazi datoteku, biljezi segmente; ako je zadan tr(txt, jez), vraca prevedene retke."""
    T = (lambda x, j: tr(x, j) if (tr and j != 'hr') else x)
    lines = open(os.path.join(IGRE, f), encoding='utf-8', errors='replace').read().split('\n')
    out = []
    st, fmt, n_st = 0, '', 0
    for i, raw in enumerate(lines):
        line = raw.rstrip('\r')
        t = line.strip()
        m = re.match(r'^##\s+(.+)$', line)
        if m:
            st += 1; n_st = 0; fmt = ''
            for nxt in lines[i+1:i+15]:
                mm = re.match(r'^format:\s*(\S+)', nxt.strip())
                if mm: fmt = mm.group(1); break
                if nxt.startswith('## '): break
            dodaj(f'{f}#{st}#naslov', f, st, fmt, 'naslov', m.group(1).strip(), 'en')
            out.append('## ' + T(m.group(1).strip(), 'en')); continue
        m = re.match(r'^#\s+(.+)$', line)
        if m:
            dodaj(f'{f}#0#naslov', f, 0, '', 'naslov', m.group(1).strip(), 'en')
            out.append('# ' + T(m.group(1).strip(), 'en')); continue
        m = re.match(r'^([-*]\s+)(.+)$', t)
        if m:
            n_st += 1
            body = m.group(2); pre = line[:len(line) - len(line.lstrip())] + m.group(1)
            if fmt == 'tekst' or (st == 0 and not fmt):
                jez = jezik_proza(body)
                jez = IZNIMKE.get(f'{f}#{st}#s{n_st}', jez)
                dodaj(f'{f}#{st}#s{n_st}', f, st, fmt, 'redak', body, jez)
                out.append(pre + T(body, jez)); continue
            parts = [p.strip() for p in body.split('|')]
            novi = []
            # jezik odgovora (izbor/upis/provjera): odgovori dijele jezik, '?' preuzima vecinu
            jez_odg = None
            if fmt in ('izbor', 'upis', 'provjera'):
                od = [jezik(p) for p in parts[(2 if fmt == 'provjera' else 1):] if p]
                od = [j for j in od if j in ('en', 'hr')]
                if od: jez_odg = max(set(od), key=od.count)
            for k, p in enumerate(parts):
                jez = None
                kljuc = f'{f}#{st}#s{n_st + 1 if False else n_st}.{k}'
                if kljuc in IZNIMKE: jez = IZNIMKE[kljuc]
                elif not p: pass
                elif k == 0 and fmt in PRVO_HR: jez = 'hr'
                elif fmt == 'dijalog' and k >= 1:
                    jez = jezik(p); jez = 'hr' if jez == '?' else jez
                elif fmt == 'dijalog' and k == 0: pass
                elif fmt == 'provjera' and k == 0: pass
                elif fmt == 'spajanje' and k == 2: pass
                elif fmt == 'nastavak' and k == len(parts) - 1 and len(parts) > 1: pass
                elif fmt in ('kartice', 'parovi', 'memorija', 'spajanje', 'baloni', 'pamti', 'zid', 'slova') and k == 1: jez = 'en'
                elif fmt == 'razvrstavanje' and k == 1: jez = 'kat'
                else:
                    jez = jezik_polje(p)
                    if jez == '?' and jez_odg and k >= (2 if fmt == 'provjera' else 1): jez = jez_odg
                if jez == 'hr' and kljuc not in IZNIMKE: pass
                if jez:
                    dodaj(f'{f}#{st}#s{n_st}.{k}', f, st, fmt, f'stavka.{k}', p, jez)
                    novi.append(T(p, jez))
                else:
                    novi.append(p)
            out.append(pre + ' | '.join(novi)); continue
        m = re.match(r'^(\w+):\s*(.+)$', t)
        if m:
            k, v = m.group(1).lower(), m.group(2).strip()
            kraw = m.group(1)
            if k in META_EN:
                dodaj(f'{f}#{st}#{k}', f, st, fmt, k, v, 'en')
                out.append(f'{kraw}: ' + T(v, 'en')); continue
            elif k == 'stupci':
                ps = [x.strip() for x in v.split('|')]
                for j, p in enumerate(ps):
                    dodaj(f'{f}#{st}#stupci.{j}', f, st, fmt, 'stupci', p, 'kat')
                out.append(f'{kraw}: ' + ' | '.join(T(p, 'kat') for p in ps)); continue
            elif k not in META_NE:
                jz = jezik(v)
                dodaj(f'{f}#{st}#{k}', f, st, fmt, k, v, jz)
                out.append(f'{kraw}: ' + T(v, jz)); continue
        out.append(line)
    return out

if __name__ == '__main__':
    for f in datoteke():
        obradi(f)
    with open(os.path.join(OUT, 'segmenti.tsv'), 'w', encoding='utf-8', newline='') as fo:
        w = csv.writer(fo, delimiter='\t', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
        w.writerow(['id', 'datoteka', 'stranica', 'format', 'polje', 'jezik', 'tekst'])
        w.writerows(segmenti)

    # prijevodna memorija: samo en / kat / ? (hr se ne prevodi)
    mem_put = os.path.join(OUT, 'prijevod-de.tsv')
    stari = {}
    if os.path.exists(mem_put):
        with open(mem_put, encoding='utf-8') as fi:
            for r in csv.reader(fi, delimiter='\t'):
                if len(r) >= 2 and r[0] != 'en': stari[r[0]] = r[1]
    red, vidjeno = [], {}
    for s in segmenti:
        if s[5] == 'hr': continue
        txt = s[6]
        if txt not in vidjeno:
            vidjeno[txt] = [0, s[0], s[5]]
            red.append(txt)
        vidjeno[txt][0] += 1
    with open(mem_put, 'w', encoding='utf-8', newline='') as fo:
        w = csv.writer(fo, delimiter='\t', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
        w.writerow(['en', 'de', 'puta', 'prvi_id', 'jezik'])
        for txt in red:
            n, pid, jez = vidjeno[txt]
            w.writerow([txt, stari.get(txt, ''), n, pid, jez])

    from collections import Counter
    c = Counter(s[5] for s in segmenti)
    print('segmenata:', len(segmenti), dict(c))
    print('jedinstvenih za prijevod:', len(red), ' prevedeno:', sum(1 for t in red if stari.get(t)))
    print('znakova za prijevod:', sum(len(t) for t in red))
