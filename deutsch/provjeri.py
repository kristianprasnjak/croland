#!/usr/bin/env python3
"""provjeri.py — provjera sadržaja njemačkog tečaja (deutsch/igre/*.md).

Provjerava: format stranica (kao osvjezi.js), dvojezičnost (hr + en), jedinstvenost id-a,
broj polja po formatu, i zabrane iz DE-gramaticka-kraljeznica.md (gradivo prije svoje razine).
Pokretanje:  python3 provjeri.py   → ispisuje izvještaj i piše IZVJESTAJ.md
"""
import os, re, sys, collections

ROOT = os.path.dirname(os.path.abspath(__file__))
IGRE = os.path.join(ROOT, 'igre')

POLJA = {  # minimalni broj polja po stavci
    'kartice': 2, 'brzina': 2, 'parovi': 2, 'memorija': 2, 'spajanje': 3, 'razvrstavanje': 2,
    'izbor': 3, 'nastavak': 3, 'upis': 2, 'slaganje': 1, 'poredak': 1, 'dijalog': 2,
    'provjera': 2, 'hoeren': 3, 'schreiben': 1, 'sprechen': 2, 'tekst': 1,
    'baloni': 2, 'slova': 2, 'zid': 1, 'pamti': 2,
}
GLOSA = {'kartice': 1, 'nastavak': 1, 'sprechen': 1, 'spajanje': 1, 'baloni': 1, 'pamti': 1, 'slova': 1, 'zid': 1}
SLIKOVNE = ('spajanje', 'baloni', 'pamti', 'slova', 'zid')  # - njemački | hr // en | ključ slike
_sk = os.path.join(ROOT, 'slike-kljucevi.txt')
SLIKE = set(open(_sk, encoding='utf-8').read().split()) if os.path.exists(_sk) else None  # polje koje mora imati ' // '

# Zabrane: (od razine, naziv, regex). Fraze iz kralježnice (odj. 6) su iznimke.
FRAZE = [r'am Montag', r'am Dienstag', r'am Mittwoch', r'am Donnerstag', r'am Freitag',
         r'am Samstag', r'am Sonntag', r'am Wochenende', r'am Abend', r'am Morgen', r'am Nachmittag',
         r'am Vormittag', r'am Mittag', r'im Juli', r'im Sommer', r'im Winter', r'im Juni', r'im August',
         r'zu Hause', r'nach Hause', r'mit dem (Bus|Zug|Auto|Rad|Fahrrad)', r'[Mm]ir tut', r'[Mm]ir tun',
         r"[Mm]ir geht's", r"[Dd]ir\?", r"geht's dir", r"Wie geht es Ihnen", r'Gute Besserung', r'Guten Tag',
         r'Guten Morgen', r'Guten Abend', r'Gute Nacht', r'Gute Reise', r'zum Glück', r'am Ende',
         r'Herzlichen Glückwunsch', r'Schönes Wochenende', r'ich hätte gern', r'Ich hätte gern',
         r'zum Beispiel', r'Zum Beispiel', r'Kaffee und Kuchen', r'Was fehlt Ihnen', r'den ganzen Tag', r'am Tag', r'in der Nacht', r'tut mir leid', r'Tut mir leid']
ZABRANE = [
    (7, 'modalni glagol', r'\b(kann|kannst|können|könnt|muss|musst|müssen|müsst|will|willst|wollen|wollt|darf|darfst|dürfen|dürft|soll|sollst|sollen|sollt)\b'),
    (10, 'perfekt/war/hatte', r'\b(war|warst|waren|wart|hatte|hattest|hatten|hattet|gewesen|gehabt)\b'),
    (12, 'dativ', r'\b(dem|einem|meinem|deinem|seinem|ihrem|unserem|eurem|keinem|im|am|zum|zur|beim|vom|mir|dir|ihm|ihnen)\b'),
    (13, 'zavisna rečenica', r'\b(weil|dass|wenn|ob)\b'),
    (18, 'Präteritum modala', r'\b(konnte|konntest|konnten|musste|musstest|mussten|wollte|wolltest|wollten|durfte|durften)\b'),
    (19, 'Konjunktiv II', r'\b(würde|würdest|würden|würdet|wäre|wärst|wären|hätte|hättest|hätten|könnte|könntest|könnten|sollte|solltest|sollten)\b'),
]
NJEM_RED = re.compile(r'^(hr|en):', re.I)

def razina_iz_cjeline(c):
    m = re.search(r'(\d+)\s*$', c or '')
    return int(m.group(1)) if m else None

def njemacki_dijelovi(fmt, polja, meta_tekst):
    """Vrati tekst koji je njemački (za provjeru zabrana)."""
    out = []
    if fmt == 'tekst':
        p0 = polja[0]
        if NJEM_RED.match(p0) or p0.startswith('tab:') and False:
            return out
        out.append(p0)
    elif fmt in ('kartice', 'brzina', 'slaganje', 'poredak', 'sprechen', 'spajanje', 'razvrstavanje'):
        out.append(polja[0])
        if fmt == 'brzina' and len(polja) > 1: out.append(polja[1])
    elif fmt in ('izbor', 'hoeren'):
        out.extend(p for p in polja if '//' not in p)
    elif fmt == 'nastavak':
        out.append(polja[0])
    elif fmt == 'upis':
        out.append(polja[-1])
    elif fmt == 'dijalog':
        out.extend(polja[1:])
    elif fmt == 'provjera':
        out.extend(p for p in polja[1:] if '//' not in p)
    elif fmt in ('parovi', 'memorija'):
        out.extend(p for p in polja if '//' not in p)
    return out

def ocisti_fraze(s):
    for f in FRAZE:
        s = re.sub(f, ' ', s)
    return s

def parse(path):
    lines = open(path, encoding='utf-8').read().split('\n')
    blokovi = [{'naslov': None, 'linije': []}]
    for ln in lines:
        m = re.match(r'^##\s+(.+)$', ln)
        if m: blokovi.append({'naslov': m.group(1).strip(), 'linije': []})
        else: blokovi[-1]['linije'].append(ln)
    def pb(linije):
        r = {'format': None, 'meta': {}, 'stavke': [], 'naslov': None, 'cjelina': None}
        for line in linije:
            t = line.strip()
            if re.match(r'^[-\s|:>]*$', t): continue
            m = re.match(r'^#\s+(.+)$', t)
            if m: r['naslov'] = m.group(1); continue
            m = re.match(r'^[-*]\s+(.+)$', t)
            if m:
                parts = [x.strip() for x in m.group(1).split('|')]
                parts = [x for x in parts if x]
                if parts: r['stavke'].append(parts)
                continue
            m = re.match(r'^format:\s*(\S+)', t)
            if m: r['format'] = m.group(1); continue
            m = re.match(r'^cjelina:\s*(.+)$', t)
            if m: r['cjelina'] = m.group(1).strip(); continue
            m = re.match(r'^(\w+):\s*(.+)$', t)
            if m: r['meta'][m.group(1).lower()] = m.group(2).strip()
        return r
    head = pb(blokovi[0]['linije'])
    strane = [(b['naslov'], pb(b['linije'])) for b in blokovi[1:]]
    return head, strane

def main():
    greske, upozorenja = [], []
    ids = collections.Counter()
    stat = []
    datoteke = sorted(f for f in os.listdir(IGRE) if f.endswith('.md'))
    for f in datoteke:
        head, strane = parse(os.path.join(IGRE, f))
        raz = razina_iz_cjeline(head['cjelina'])
        if not head['cjelina']: greske.append(f'{f}: nema cjelina:')
        if 'naslov_en' not in head['meta']: greske.append(f'{f}: zaglavlje nema naslov_en')
        n_str = n_st = 0
        nasl = collections.Counter(n for n, _ in strane)
        for n, c in nasl.items():
            if c > 1: greske.append(f'{f}: naslov stranice ponovljen {c}×: {n}')
        for naslov, s in strane:
            loc = f'{f} › {naslov}'
            if not s['format']: greske.append(f'{loc}: nema format'); continue
            if not s['stavke']: greske.append(f'{loc}: nema stavki'); continue
            n_str += 1; n_st += len(s['stavke'])
            fm = s['format']; meta = s['meta']
            for k in ('id', 'naslov_en', 'info', 'info_en'):
                if k not in meta: greske.append(f'{loc}: nedostaje {k}')
            if 'id' in meta: ids[meta['id']] += 1
            if ('opis' in meta) != ('opis_en' in meta): greske.append(f'{loc}: opis bez para')
            if ('infokratko' in meta) != ('infokratko_en' in meta): greske.append(f'{loc}: infokratko bez para')
            for k in ('opis', 'infokratko'):
                if k not in meta: upozorenja.append(f'{loc}: nema {k}')
            if ('zadatak' in meta) != ('zadatak_en' in meta): greske.append(f'{loc}: zadatak bez para')
            if fm == 'razvrstavanje':
                st = [x.strip() for x in meta.get('stupci', '').split('|')]
                if 'stupci' not in meta: greske.append(f'{loc}: nema stupci')
            if fm == 'nastavak':
                nc = [x.strip() for x in meta.get('nastavci', '').split('|')]
                if 'nastavci' not in meta: greske.append(f'{loc}: nema nastavci')
            # tekst: hr/en parovi
            if fm == 'tekst':
                hr = sum(1 for p in s['stavke'] if p[0].lower().startswith('hr:'))
                en = sum(1 for p in s['stavke'] if p[0].lower().startswith('en:'))
                if hr != en: greske.append(f'{loc}: tekst ima {hr} hr: i {en} en: redaka')
            for p in s['stavke']:
                mp = POLJA.get(fm, 1)
                if fm == 'tekst' or (fm == 'provjera') or fm == 'dijalog':
                    pass
                elif len(p) < mp:
                    greske.append(f'{loc}: premalo polja: {" | ".join(p)}')
                if fm in ('kartice', 'brzina', 'upis', 'parovi', 'memorija') and len(p) != 2:
                    greske.append(f'{loc}: {fm} treba točno 2 polja: {" | ".join(p)}')
                if fm in SLIKOVNE:
                    if len(p) != 3: greske.append(f'{loc}: {fm} treba točno 3 polja (njemački | hr // en | slika): {" | ".join(p)}')
                    elif SLIKE is not None and p[2] not in SLIKE: greske.append(f'{loc}: nepoznata slika "{p[2]}"')
                if fm in GLOSA and len(p) > GLOSA[fm] and ' // ' not in p[GLOSA[fm]]:
                    greske.append(f'{loc}: glosa bez " // ": {" | ".join(p)}')
                if fm == 'tekst' and len(p) > 1 and not p[0].startswith('tab:') and ' // ' not in p[1]:
                    greske.append(f'{loc}: prijevod bez " // ": {" | ".join(p)}')
                if fm == 'razvrstavanje' and len(p) >= 2 and p[1] not in st:
                    greske.append(f'{loc}: stupac "{p[1]}" nije u stupci')
                if fm == 'nastavak' and len(p) >= 3 and p[2] not in nc:
                    greske.append(f'{loc}: nastavak "{p[2]}" nije u nastavci')
                if fm == 'nastavak' and '___' not in p[0]:
                    greske.append(f'{loc}: nastavak bez ___: {p[0]}')
                if fm == 'provjera' and p[0] not in ('izbor', 'upis', 'slaganje'):
                    greske.append(f'{loc}: provjera vrsta "{p[0]}"')
                if fm == 'dijalog' and p[0] not in ('npc', 'ti'):
                    greske.append(f'{loc}: dijalog uloga "{p[0]}"')
                # zabrane
                if raz is not None and not (f.startswith('test') and raz == 0):
                    tekstovi = njemacki_dijelovi(fm, p, None)
                    if fm in ('izbor', 'hoeren') and 'tekst' in meta and p is s['stavke'][0]:
                        tekstovi.append(meta['tekst'])
                    for t in tekstovi:
                        if raz >= 8 and t.strip() in ('am', 'im', 'um', 'Am', 'Im', 'Um'):
                            continue  # am/um/im kao fraze od L8 (kralježnica, odj. 6)
                        t2 = ocisti_fraze(t)
                        for od, ime, rx in ZABRANE:
                            if raz < od and re.search(rx, t2):
                                upozorenja.append(f'{loc}: {ime} prije L{od}: «{t}»')
        stat.append((f, n_str, n_st))
    for k, v in ids.items():
        if v > 1: greske.append(f'id ponovljen {v}×: {k}')
    out = ['# Izvještaj provjere', '', f'Datoteka: {len(datoteke)} · stranica: {sum(s[1] for s in stat)} · stavki: {sum(s[2] for s in stat)}', '']
    out += ['## Greške (' + str(len(greske)) + ')', ''] + [f'- {g}' for g in greske] + ['']
    out += ['## Upozorenja — moguće gradivo prije svoje razine (' + str(len(upozorenja)) + ')', ''] + [f'- {u}' for u in upozorenja] + ['']
    out += ['## Po datoteci', '', '| datoteka | stranica | stavki |', '|---|---|---|'] + [f'| {a} | {b} | {c} |' for a, b, c in stat]
    open(os.path.join(ROOT, 'IZVJESTAJ.md'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    print(f'datoteka {len(datoteke)}, stranica {sum(s[1] for s in stat)}, stavki {sum(s[2] for s in stat)}, grešaka {len(greske)}, upozorenja {len(upozorenja)}')
    for g in greske[:60]: print('G', g)
    for u in upozorenja[:60]: print('U', u)

if __name__ == '__main__':
    main()
