"""Zajednicko za sve alate prijevoda: izbor jezika (--jezik xx), putanje i JS tokenizer (acorn).

Svaka skripta u ovoj mapi radi za jedan jezik uputa:
    python3 croland-jezici/alati/<skripta>.py --jezik de [ostali argumenti]
Jezici su popisani u croland-jezici/jezici.json. Podaci jezika su u njegovoj mapi
(croland-de/, croland-es/ ...), uvijek iste strukture:
    prijevod-XX.tsv   memorija lekcija  (en | XX | puta | prvi_id | jezik)
    sucelje-XX.tsv    tekst sucelja     (en | XX | izvor | redak)
    pregledi-XX.tsv   pregledi.js po polozaju (en | hr | XX | gdje)
    iznimke.tsv       rucne iznimke prepoznavanja jezika (id <TAB> hr|en)
    segmenti.tsv      svi segmenti lekcija (generira izvuci.py)
    igre/             generirane lekcije na jeziku XX
    rjecnik/          XX-*.tsv -> prijevodi-XX.jsonl, rjecnik-XX-hr.jsonl
"""
import json, os, subprocess, sys

ALATI = os.path.dirname(os.path.abspath(__file__))
JEZICI_DIR = os.path.dirname(ALATI)                 # croland-jezici/
ROOT = os.path.dirname(JEZICI_DIR)                  # korijen projekta
POMOCNI = os.path.join(ALATI, '_alati')             # literali.js, pregledi.js, acorn, engleske-rijeci.txt
IZVOR_IGRE = os.path.join(ROOT, 'igre')             # engleski izvor lekcija (ne dira se)


def svi_jezici():
    with open(os.path.join(JEZICI_DIR, 'jezici.json'), encoding='utf-8') as f:
        return json.load(f)['jezici']


class Jezik:
    def __init__(self, kod):
        sv = svi_jezici()
        if kod not in sv:
            raise SystemExit(f'Nepoznat jezik {kod!r}. Poznati: {", ".join(sv)} (croland-jezici/jezici.json)')
        self.kod = kod
        self.cfg = sv[kod]
        self.ime = self.cfg.get('ime', kod)
        self.mapa = os.path.join(ROOT, self.cfg['mapa'])
        p = lambda *a: os.path.join(self.mapa, *a)
        self.memorija = p(f'prijevod-{kod}.tsv')
        self.segmenti = p('segmenti.tsv')
        self.iznimke = p('iznimke.tsv')
        self.igre = p('igre')
        self.nedostaje = p('nedostaje.tsv')
        self.radno = p('_radno')
        self.sucelje = p(f'sucelje-{kod}.tsv')
        self.pregledi_tsv = p(f'pregledi-{kod}.tsv')
        self.rjecnik = p('rjecnik')
        self.rjecnik_prijevodi = p('rjecnik', f'prijevodi-{kod}.jsonl')
        self.rjecnik_obrnuti = p('rjecnik', f'rjecnik-{kod}-hr.jsonl')
        # izlazne datoteke u korijenu projekta (uz index.html)
        self.index = f'index-{kod}.html'
        self.data = f'data-{kod}.js'
        self.rjecnik_js = f'rjecnik-{kod}.js'
        self.pregledi_js = f'pregledi-{kod}.js'


def iz_argumenata(argv=None):
    """Izvadi --jezik XX (ili --jezik=XX) iz argumenata. Vraca (Jezik, ostali_argumenti)."""
    argv = list(sys.argv[1:] if argv is None else argv)
    kod = None
    for i, a in enumerate(argv):
        if a == '--jezik' and i + 1 < len(argv):
            kod = argv[i + 1]; del argv[i:i + 2]; break
        if a.startswith('--jezik='):
            kod = a.split('=', 1)[1]; del argv[i]; break
    if not kod:
        raise SystemExit('Nedostaje --jezik XX (npr. --jezik de). Jezici: ' + ', '.join(svi_jezici()))
    return Jezik(kod), argv


# ---------------------------------------------------------------- JS tokenizer (acorn)
def _node(skripta, ulaz, *arg):
    r = subprocess.run(['node', os.path.join(POMOCNI, skripta), *arg], input=ulaz.encode('utf-8'),
                       capture_output=True, check=True)
    return json.loads(r.stdout)


def _u_python(js, toks):
    # acorn broji UTF-16 jedinice; pretvori u Python indekse (znakovi izvan BMP = 2 jedinice)
    if any(ord(c) > 0xFFFF for c in js):
        mapa, u = [], 0
        for c in js:
            mapa.append(u); u += 2 if ord(c) > 0xFFFF else 1
        mapa.append(u)
        inv = {u: i for i, u in enumerate(mapa)}
        for t in toks:
            t['s'], t['e'] = inv[t['s']], inv[t['e']]
    return toks


def js_literali(js):
    """Vrati [(start, end, q)] sadrzaja string/template literala; offseti u Python znakovima."""
    return [(t['s'], t['e'], t['q']) for t in _u_python(js, _node('literali.js', js))]


# Engleske celije zaglavlja u g-mrezama pregledi.js (ostale celije su hrvatske).
PREGLEDI_ENG_G = ["me", "you", "him", "her", "let's", "he", "she", "going on", "finished"]


def pregledi_mjesta(js):
    """Engleska mjesta u pregledi.js po polozaju u strukturi: [{s, e, v, hr, kljuc, uloga}]."""
    return _u_python(js, _node('pregledi.js', js, json.dumps(PREGLEDI_ENG_G)))


def js_parsira(js):
    """True ako acorn parsira JS (provjera nakon builda)."""
    r = subprocess.run(['node', '-e', "require('" + os.path.join(POMOCNI, 'node_modules', 'acorn').replace('\\', '/') +
                        "').parse(require('fs').readFileSync(0,'utf8'),{ecmaVersion:'latest'})"],
                       input=js.encode('utf-8'), capture_output=True)
    return r.returncode == 0, r.stderr.decode('utf-8', 'replace')[-400:]


def ima_crlf(put):
    with open(put, 'rb') as f:
        return b'\r\n' in f.read(200000)


def pisi(put, tekst, kao=None):
    """Pisi tekst (s \\n). Ako je zadan izvor `kao`, prijelomi redaka su isti kao u njemu (CRLF ili LF),
    pa build daje iste bajtove na Windowsu i drugdje."""
    nl = '\r\n' if (kao and ima_crlf(kao)) else '\n'
    with open(put, 'w', encoding='utf-8', newline=nl) as f:
        f.write(tekst)
