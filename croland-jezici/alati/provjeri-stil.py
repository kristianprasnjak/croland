#!/usr/bin/env python3
"""provjeri-stil.py --jezik XX [--samo lekcije,sucelje,pregledi,rjecnik] [--datoteke lekcija-05.md ...] [--sve] [--strogo]

Provjera stila prijevoda (ES-plan §6a, točke 2-5 i 7) za jedan jezik uputa. Pravila su u
<mapa>/pravila.json (npr. croland-es/pravila.json); ako ga nema, sva su pravila prazna i alat javlja 0.
Provjerava prevedene retke u:
  lekcije   <mapa>/prijevod-XX.tsv       (memorija lekcija)
  sucelje   <mapa>/sucelje-XX.tsv        (index.html + pregledi.js)
  pregledi  <mapa>/pregledi-XX.tsv
  rjecnik   <mapa>/rjecnik/XX-*.tsv      (lema <TAB> značenja)
Retci bez prijevoda, '=' i '@blobby' se preskaču (neprevedeno se samo broji; --strogo ih broji kao greške).

GREŠKE (moraju biti 0):
  upitnik / usklicnik   svaki ? ima svoj ¿ prije sebe, svaki ¡ svoj ! (hrvatski dio se ne broji)
  navodnici             “ ” u paru; ravni " u tekstu (izvan HTML-a); « » „ ‚ (pravila.json "zabranjeni_navodnici")
  zabranjeno            pravila.json "zabranjeno" + dio 'zabranjeno' iz glosara (vosotros, voseo, regionalizmi)
  glosar                pravila.json "glosar_provjera": kad engleski ima pojam, prijevod mora imati glosarski
  engleski              prijevod = engleski izvor (i jedna riječ: namjerno isto → '=' ili stil-iznimke.tsv;
                        ne javlja se za string od 1–2 riječi koje su sve u "isto_kao_engleski", npr. Hotel, Total),
                        ili engleske funkcijske riječi u prijevodu; u rječniku: značenje jednako engleskom
                        značenju iste leme (pravila.json "rjecnik_izvor"), osim riječi iz "isto_kao_engleski"
PAZI (ručna provjera, ne broji se): pravila.json "pazi" (+ naslovi s velikim slovima), duljina na gumbima
  (> faktor x engleski, samo sučelje, kratki natpisi).
Iznimke: <mapa>/stil-iznimke.tsv, redak  en <TAB> pravilo <TAB> razlog  (pravilo '*' = sva; u rječniku en = lema).
--datoteke: samo stringovi iz tih lekcija (po <mapa>/segmenti.tsv; prije toga izvuci.py).
Izlaz 1 ako ima grešaka."""
import csv, glob, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jezici_lib as L

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass
csv.field_size_limit(10 ** 8)

J, arg = L.iz_argumenata()
K = J.kod
SVE = '--sve' in arg
STROGO = '--strogo' in arg
SAMO = None
DATOTEKE = []
i = 0
while i < len(arg):
    a = arg[i]
    if a == '--samo' and i + 1 < len(arg):
        SAMO = set(arg[i + 1].split(',')); i += 2; continue
    if a == '--datoteke':
        i += 1
        while i < len(arg) and not arg[i].startswith('--'):
            DATOTEKE.append(os.path.basename(arg[i])); i += 1
        continue
    i += 1

# ------------------------------------------------------------------ pravila
PUT_PRAVILA = os.path.join(J.mapa, 'pravila.json')
P = {}
if os.path.exists(PUT_PRAVILA):
    with open(PUT_PRAVILA, encoding='utf-8') as f:
        P = json.load(f)


def _rx(r):
    try:
        return re.compile(r)
    except re.error as e:
        raise SystemExit(f'pravila.json: neispravan regex {r!r}: {e}')


ZABRANJENO = [(z.get('ime', z['regex']), _rx(z['regex']), z.get('koristi', ''), z.get('razlog', ''))
              for z in P.get('zabranjeno', [])]
PAZI = [(z.get('ime', ''), _rx(z['regex']) if z.get('regex') else None, z.get('koristi', ''), z.get('razlog', ''),
         bool(z.get('naslov'))) for z in P.get('pazi', [])]
GLOSAR_PR = [(_rx(g['en']), _rx(g['es']), g.get('razina', 'greska'), g['en']) for g in P.get('glosar_provjera', [])]
OBRNUTI_UPIT = bool(P.get('obrnuti_upitnik'))
OBRNUTI_USKL = bool(P.get('obrnuti_usklicnik'))
NAVODNICI = P.get('navodnici') or []
KRIVI_NAVODNICI = P.get('zabranjeni_navodnici') or []
RAVNI = bool(P.get('ravni_navodnici'))
ZAOSTALI = bool(P.get('zaostali_engleski'))
DULJINA = P.get('duljina') or {}
# riječi koje su na jeziku prijevoda iste kao engleske (hotel, taxi, plan…); stari naziv ključa: rjecnik_internacionalizmi
INTERNAC = {w.lower() for w in (P.get('isto_kao_engleski') or P.get('rjecnik_internacionalizmi') or [])}

# engleska značenja po lemi (izvor rječnika) – za zaostali engleski u rječniku
RJ_EN = {}
if ZAOSTALI and P.get('rjecnik_izvor'):
    pr = os.path.join(L.ROOT, P['rjecnik_izvor'])
    if os.path.exists(pr):
        for ln in open(pr, encoding='utf-8'):
            ln = ln.strip()
            if not ln:
                continue
            try:
                z = json.loads(ln)
            except ValueError:
                continue
            if z.get('lema'):
                RJ_EN.setdefault(z['lema'], set()).update(x.strip().lower() for x in (z.get('en') or []) if x)

# zabranjene riječi iz glosara (dio 'zabranjeno | koristi | razlog'); regex/upozorenje retke vodi pravila.json
if P.get('glosar'):
    pg = os.path.join(J.mapa, P['glosar'])
    if os.path.exists(pg):
        u_dijelu = False
        for ln in open(pg, encoding='utf-8'):
            ln = ln.rstrip('\r\n')
            if not ln.strip() or ln.startswith('#'):
                continue
            c = ln.split('\t')
            if c[0] == 'zabranjeno':
                u_dijelu = True; continue
            if not u_dijelu or len(c) < 2:
                continue
            rij, kor, raz = c[0].strip(), c[1].strip(), (c[2].strip() if len(c) > 2 else '')
            if kor == '(u redu)' or 'regex' in raz or raz.startswith('upozorenje') or rij.startswith('-'):
                continue
            rij = re.sub(r'\s*\(.*?\)\s*', '', rij).strip()
            if not rij:
                continue
            ZABRANJENO.append((rij, re.compile(r'(?i)(?<![\w-])' + re.escape(rij) + r'(?![\w-])'), kor, raz))

IZNIMKE = {}
if P.get('iznimke') and os.path.exists(os.path.join(J.mapa, P['iznimke'])):
    for ln in open(os.path.join(J.mapa, P['iznimke']), encoding='utf-8'):
        if ln.startswith('#') or '\t' not in ln:
            continue
        c = ln.rstrip('\r\n').split('\t')
        if c[0] == 'en' and len(c) > 1 and c[1] == 'pravilo':
            continue
        IZNIMKE.setdefault(c[0], set()).add(c[1] if len(c) > 1 and c[1] else '*')


def iznimka(en, pravilo):
    s = IZNIMKE.get(en)
    return bool(s) and ('*' in s or pravilo in s)


# ------------------------------------------------------------------ čišćenje teksta
RX_TAG = re.compile(r'<[^<>]*>')
RX_ATR = re.compile(r'[\w-]+\s*=\s*"[^"]*"?|"\s*/?>|^\s*"|"\s*$')
RX_KURZIV = re.compile(r'(?<![*\\])\*(?!\*)([^*\n]+?)(?<![*\\])\*(?!\*)')
RX_PRAZNINA = re.compile(r'\[[^\]]*\]')
RX_RIJEC = re.compile(r"[^\W\d_]+(?:['’][^\W\d_]+)*")
EN_FUNKC = {'the', 'and', 'with', 'your', 'you', 'is', 'are', 'this', 'that', 'of', 'for', 'what', 'which',
            'tap', 'type', 'word', 'words', 'when', 'will', 'it', 'its', 'from', 'into', 'every', 'each'}


def polja(s):
    return [p.strip() for p in s.split('|')]


def ocisti(es, en):
    """Tekst prijevoda bez dijelova koji nisu prijevod: HTML, kurziv (hrvatski primjeri), [praznine]
    i polja (odvojena |) koja su znak po znak ista kao u izvoru."""
    en_polja = set(polja(en))
    dijelovi = [p for p in polja(es) if p not in en_polja or not p]
    t = ' | '.join(dijelovi)
    t = RX_TAG.sub(' ', t)
    t = RX_KURZIV.sub(' ', t)
    t = RX_PRAZNINA.sub(' ', t)
    return t


def en_rijeci(en):
    return {w.lower() for w in RX_RIJEC.findall(en)}


# ------------------------------------------------------------------ provjere
def _iz_izvora(p, k, zat, en):
    """Je li zatvarač na mjestu k dio riječi prepisane iz izvora (hrvatski: **tko?**, Kako si?)."""
    if not en:
        return False
    j = k
    while j > 0 and not p[j - 1].isspace() and p[j - 1] not in '¿¡|':
        j -= 1
    rijec = p[j:k + 1]
    return len(rijec) > 1 and rijec in en


def provjeri_par(otv, zat, t, en=''):
    """Svaki zat ima prethodni otv i svaki otv je zatvoren (po polju). Zatvarač bez otvarača
    koji je dio riječi prepisane iz izvora (hrvatski) se ne broji."""
    for p in t.split('|'):
        otvoreno = 0
        for k, ch in enumerate(p):
            if ch == otv:
                otvoreno += 1
            elif ch == zat:
                if otvoreno == 0:
                    if _iz_izvora(p, k, zat, en):
                        continue
                    return f'„{zat}” bez „{otv}”'
                otvoreno -= 1
        if otvoreno:
            return f'„{otv}” bez „{zat}”'
    return None


def provjeri_navodnike(t, en=''):
    if len(NAVODNICI) == 2:
        o, z = NAVODNICI
        # dio rečenice (sučelje složeno od dijelova): izvor je i sam nezatvoren – prijevod smije biti isto
        if en and (provjeri_par('“', '”', en) or provjeri_par('"', '"', en) and en.count('"') % 2):
            return None
        r = provjeri_par(o, z, t)
        if r:
            return 'navodnici ' + r
    return None


def krivi_navodnici(t, en):
    """« » „ ‚ u prijevodu (izvan HTML-a i kurziva); ako ih ima i izvor (hrvatski citat), ne više nego u izvoru."""
    nadj = [z for z in KRIVI_NAVODNICI if t.count(z) > en.count(z)]
    if nadj:
        return 'navodnici ' + ' '.join(nadj) + f' – koristi {" ".join(NAVODNICI) or "tipografske"}'
    return None


def ravni_navodnici(es, en):
    t = RX_TAG.sub(' ', es)
    t = RX_KURZIV.sub(' ', t)
    t = RX_ATR.sub(' ', t)
    n_es = t.count('"')
    if not n_es:
        return None
    te = RX_ATR.sub(' ', RX_KURZIV.sub(' ', RX_TAG.sub(' ', en)))
    # kod u retku sučelja (ostaci HTML-a, JS) – isti ravni navodnici kao u izvoru nisu tekst
    if n_es <= te.count('"') and re.search(r'[<>=(){};]', en) and not re.search(r'"[^"<>=]{2,}"', te):
        return None
    return f'ravni navodnik " u tekstu ({n_es}×) – koristi {"".join(NAVODNICI) or "tipografske"}'


def naslov_velika(es, en):
    s = es.strip()
    if not s or len(s) > 60 or s[-1] in '.!?:;…' or '|' in s or s.isupper():
        return None
    rijeci = s.split()
    if len(rijeci) < 2 or len(rijeci) > 7:
        return None
    enr = set(en.split())
    vel = []
    prethodna = rijeci[0]
    for w in rijeci[1:]:
        cist = w.strip('“”"‘’()¿?¡!,.:;*')
        if (cist[:1].isupper() and not cist.isupper() and cist not in enr and not prethodna.endswith((':', '·', '–', '—', '-', '/'))
                and not re.match(r'^(Croland|Plus|Blobby|Croacia|Google|Módulo|Lección|Nivel|Prueba)$', cist)):
            vel.append(cist)
        prethodna = w
    return ('velika slova u naslovu: ' + ', '.join(vel)) if vel else None


GRESKE, UPOZ, DULJ = [], [], []
NEPREVEDENO = {}
UKUPNO = {}


def zapis(lista, gdje, en, es, pravilo, opis):
    if iznimka(en, pravilo):
        return
    lista.append((gdje, pravilo, opis, en, es))


RX_EN_CLAN = re.compile(r'^(?:the|a|an|to)\s+')


def zaostali_rjecnik(lema, zn):
    """Rječnik: značenje (dio između ;) jednako engleskom značenju iste leme – neprevedeno."""
    eng = RJ_EN.get(lema)
    if not eng:
        return None
    bez = lambda s: RX_EN_CLAN.sub('', s)
    eng_b = {bez(x) for x in eng}
    isto = []
    for d in zn.split(';'):
        d = d.strip()
        dl = d.lower()
        if not dl or dl in INTERNAC:
            continue
        if dl in eng or (RX_EN_CLAN.match(dl) and bez(dl) in eng_b):
            isto.append(d)
    return ('engleska značenja u prijevodu: ' + '; '.join(isto)) if isto else None


def isto_kao_engleski(en):
    """String od 1–2 riječi koje su sve u "isto_kao_engleski" (Hotel, Taxi, Total) – prijevod smije biti isti."""
    rijeci = [w.lower() for w in RX_RIJEC.findall(RX_TAG.sub(' ', en))]
    return 1 <= len(rijeci) <= 2 and all(w in INTERNAC for w in rijeci)


def provjeri(gdje, en, es, izvor=''):
    UKUPNO[gdje] = UKUPNO.get(gdje, 0) + 1
    rjecnik = gdje == 'rjecnik'
    t = ocisti(es, en) if not rjecnik else es
    enr = en_rijeci(en)
    if OBRNUTI_UPIT:
        r = provjeri_par('¿', '?', t, en)
        if r: zapis(GRESKE, gdje, en, es, 'upitnik', r)
    if OBRNUTI_USKL:
        r = provjeri_par('¡', '!', t, en)
        if r: zapis(GRESKE, gdje, en, es, 'usklicnik', r)
    r = provjeri_navodnike(t, en)
    if r: zapis(GRESKE, gdje, en, es, 'navodnici', r)
    if KRIVI_NAVODNICI:
        r = krivi_navodnici(t, en)
        if r: zapis(GRESKE, gdje, en, es, 'navodnici', r)
    if RAVNI:
        r = ravni_navodnici(es, en)
        if r: zapis(GRESKE, gdje, en, es, 'navodnici', r)
    for ime, rx, kor, raz in ZABRANJENO:
        for m in rx.finditer(t):
            w = m.group(0).strip(' ¡¿(—–-').lower()
            if w in enr:          # ista riječ je i u izvoru (hrvatski, ime) – nije prijevod
                continue
            zapis(GRESKE, gdje, en, es, 'zabranjeno', f'„{m.group(0).strip()}” → {kor} ({raz})')
            break
    if en and not rjecnik:
        for rx_en, rx_es, razina, opis in GLOSAR_PR:
            if rx_en.search(en) and not rx_es.search(es):
                zapis(UPOZ if razina == 'pazi' else GRESKE, gdje, en, es, 'glosar',
                      f'izvor ima {rx_en.pattern!r}, prijevod nema {rx_es.pattern!r}')
    if ZAOSTALI and en:
        if rjecnik:
            r = zaostali_rjecnik(en, es)
            if r: zapis(GRESKE, gdje, en, es, 'engleski', r)
        elif es.strip() == en.strip() and RX_RIJEC.search(RX_TAG.sub(' ', en)) and not isto_kao_engleski(en):
            zapis(GRESKE, gdje, en, es, 'engleski',
                  'prijevod je isti kao engleski izvor (namjerno isto → = ili stil-iznimke.tsv)')
        else:
            nadj = sorted({w for w in (x.lower() for x in RX_RIJEC.findall(t)) if w in EN_FUNKC})
            if len(nadj) >= 2:
                zapis(GRESKE, gdje, en, es, 'engleski', 'engleske riječi u prijevodu: ' + ', '.join(nadj))
    for ime, rx, kor, raz, naslov in PAZI:
        if naslov:
            if rjecnik:
                continue
            r = naslov_velika(es, en)
            if r: zapis(UPOZ, gdje, en, es, ime, r)
            continue
        m = rx.search(t)
        if m and m.group(0).lower() not in enr:
            zapis(UPOZ, gdje, en, es, ime, f'„{m.group(0)}” → {kor} ({raz})')
    if DULJINA and izvor and en:
        fak, do = float(DULJINA.get('faktor', 1.5)), int(DULJINA.get('do_znakova', 30))
        e1, s1 = RX_TAG.sub('', en).strip(), RX_TAG.sub('', es).strip()
        if 0 < len(e1) <= do and len(s1) > fak * len(e1) and len(s1) - len(e1) >= 4:
            zapis(DULJ, gdje, en, es, 'duljina', f'{len(s1)} znakova prema {len(e1)} ({izvor})')


def preskoci(v):
    return v is None or v.strip() in ('', '=', '@blobby')


def ucitaj(put):
    with open(put, encoding='utf-8', newline='') as f:
        return list(csv.DictReader(f, delimiter='\t'))


FILTAR = None
if DATOTEKE:
    if not os.path.exists(J.segmenti):
        raise SystemExit(f'--datoteke treba {J.segmenti} (pokreni izvuci.py --jezik {K})')
    FILTAR = set()
    with open(J.segmenti, encoding='utf-8', newline='') as f:
        for r in csv.reader(f, delimiter='\t'):
            if len(r) >= 7 and r[1] in DATOTEKE:
                FILTAR.add(r[6])
    if not FILTAR:
        print(f'[{K}] upozorenje: u segmenti.tsv nema stringova za {DATOTEKE}')


def ukljuceno(d):
    return SAMO is None or d in SAMO


if ukljuceno('lekcije') and os.path.exists(J.memorija):
    for r in ucitaj(J.memorija):
        en, es = r.get('en', ''), r.get(K)
        if FILTAR is not None and en not in FILTAR:
            continue
        if (r.get('jezik') or 'en') == 'hr' and preskoci(es):
            continue
        if preskoci(es):
            if (es or '').strip() == '':
                NEPREVEDENO['lekcije'] = NEPREVEDENO.get('lekcije', 0) + 1
            continue
        provjeri('lekcije', en, es)

if FILTAR is None:
    if ukljuceno('sucelje') and os.path.exists(J.sucelje):
        for r in ucitaj(J.sucelje):
            en, es = r.get('en', ''), r.get(K)
            if preskoci(es):
                if (es or '').strip() == '':
                    NEPREVEDENO['sucelje'] = NEPREVEDENO.get('sucelje', 0) + 1
                continue
            provjeri('sucelje', en, es, r.get('izvor', ''))
    if ukljuceno('pregledi') and os.path.exists(J.pregledi_tsv):
        for r in ucitaj(J.pregledi_tsv):
            en, es = r.get('en', ''), r.get(K)
            if preskoci(es):
                if (es or '').strip() == '':
                    NEPREVEDENO['pregledi'] = NEPREVEDENO.get('pregledi', 0) + 1
                continue
            provjeri('pregledi', en, es)
    if ukljuceno('rjecnik'):
        for put in sorted(glob.glob(os.path.join(J.rjecnik, f'{K}-*.tsv'))):
            for ln in open(put, encoding='utf-8'):
                ln = ln.rstrip('\r\n')
                if not ln.strip() or ln.startswith('#') or '\t' not in ln:
                    continue
                lema, zn = ln.split('\t', 1)
                provjeri('rjecnik', lema, zn)

# ------------------------------------------------------------------ izvještaj
if STROGO:
    for d, n in NEPREVEDENO.items():
        GRESKE.append((d, 'neprevedeno', f'{n} redaka bez prijevoda', '', ''))


def ispis(naslov, lista, maks):
    print(f'{naslov}: {len(lista)}')
    po = {}
    for g in lista:
        po[g[1]] = po.get(g[1], 0) + 1
    if po:
        print('  ' + ', '.join(f'{k} {v}' for k, v in sorted(po.items())))
    for gdje, prav, opis, en, es in (lista if SVE else lista[:maks]):
        print(f'  [{gdje}] {prav}: {opis}')
        if en or es:
            print(f'      en: {en[:160]}')
            print(f'      {K}: {es[:160]}')
    if not SVE and len(lista) > maks:
        print(f'  … još {len(lista) - maks} (--sve za sve)')


if not P:
    print(f'[{K}] nema {os.path.relpath(PUT_PRAVILA, L.ROOT)} – pravila su prazna')
opseg = ', '.join(f'{d} {n}' for d, n in UKUPNO.items()) or 'ništa prevedeno'
print(f'[{K}] provjereno: {opseg}' + (f' (datoteke: {", ".join(DATOTEKE)})' if DATOTEKE else ''))
if NEPREVEDENO:
    print(f'[{K}] neprevedeno (info): ' + ', '.join(f'{d} {n}' for d, n in NEPREVEDENO.items()))
ispis(f'[{K}] greske', GRESKE, 80)
ispis(f'[{K}] pazi (ručno)', UPOZ, 40)
ispis(f'[{K}] duljina > {DULJINA.get("faktor", 1.5)}× (ručno, gumbi)', DULJ, 40)
sys.exit(1 if GRESKE else 0)
