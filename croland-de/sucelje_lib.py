"""Zajednicko za izvuci-sucelje.py i izgradi-sucelje-de.py: pravi JS tokenizer (acorn)."""
import json, os, subprocess
ALATI = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_alati')

def js_literali(js):
    """Vrati [(start, end, q)] sadrzaja string/template literala; offseti u Python znakovima."""
    r = subprocess.run(['node', os.path.join(ALATI, 'literali.js')], input=js.encode('utf-8'),
                       capture_output=True, check=True)
    toks = json.loads(r.stdout)
    # acorn broji UTF-16 jedinice; pretvori u Python indekse (znakovi izvan BMP = 2 jedinice)
    if any(ord(c) > 0xFFFF for c in js):
        mapa, u = [], 0
        for i, c in enumerate(js):
            mapa.append(u); u += 2 if ord(c) > 0xFFFF else 1
        mapa.append(u)
        inv = {u: i for i, u in enumerate(mapa)}
        toks = [{'s': inv[t['s']], 'e': inv[t['e']], 'q': t['q']} for t in toks]
    return [(t['s'], t['e'], t['q']) for t in toks]


# Engleske celije zaglavlja u g-mrezama pregledi.js (ostale celije su hrvatske).
PREGLEDI_ENG_G = ["me", "you", "him", "her", "let's", "he", "she", "going on", "finished"]

def _u_python(js, toks):
    if any(ord(c) > 0xFFFF for c in js):
        mapa, u = [], 0
        for c in js:
            mapa.append(u); u += 2 if ord(c) > 0xFFFF else 1
        mapa.append(u)
        inv = {u: i for i, u in enumerate(mapa)}
        for t in toks: t['s'], t['e'] = inv[t['s']], inv[t['e']]
    return toks

def pregledi_mjesta(js):
    """Engleska mjesta u pregledi.js po polozaju u strukturi: [{s, e, v, hr, kljuc, uloga}]."""
    r = subprocess.run(['node', os.path.join(ALATI, 'pregledi.js'), json.dumps(PREGLEDI_ENG_G)],
                       input=js.encode('utf-8'), capture_output=True, check=True)
    return _u_python(js, json.loads(r.stdout))
