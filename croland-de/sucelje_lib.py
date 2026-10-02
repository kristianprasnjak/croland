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
