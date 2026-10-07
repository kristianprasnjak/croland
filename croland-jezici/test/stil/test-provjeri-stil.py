#!/usr/bin/env python3
"""Test za croland-jezici/alati/provjeri-stil.py (ES pravila).

    python croland-jezici/test/stil/test-provjeri-stil.py

U privremenoj mapi složi mini-projekt (pravi alat, jezici_lib.py, croland-es/pravila.json, glosar-es.tsv,
stil-iznimke.tsv) s izmišljenim prijevodima iz SLUCAJEVI i provjeri da alat za svaki redak javlja točno
očekivano pravilo (ili ništa). Ništa u projektu se ne mijenja. Izlaz 1 ako neki slučaj ne prolazi.
Dodaj slučaj svaki put kad se promijeni pravilo (lažna greška ili propust)."""
import csv, json, os, re, shutil, subprocess, sys, tempfile

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

OVDJE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(OVDJE)))
ALATI = os.path.join(ROOT, 'croland-jezici', 'alati')
ES = os.path.join(ROOT, 'croland-es')

# (dio, en, es, očekivano)  očekivano: None = bez greške i bez „pazi“; 'g:pravilo' = greška; 'p:ime' = pazi
SLUCAJEVI = [
    # --- lažne greške iz recenzije koraka 1 (#1–4) – moraju proći
    ('lekcije', 'Sixteen and twenty-six.', 'Dieciséis y veintiséis.', None),
    ('lekcije', 'I wrote the letter.', 'Escribí la carta.', None),
    ('lekcije', 'The driver is good.', 'El conductor es bueno.', None),
    ('lekcije', 'Good behaviour.', 'Buena conducta.', None),
    ('lekcije', 'Driving is fun.', 'La conducción es divertida.', None),
    ('lekcije', 'How much is it?', '¿Cuánto vale?', None),
    ('lekcije', 'That does not count.', 'Eso no vale.', None),
    ('lekcije', 'It is worth it.', 'Vale la pena.', None),
    ('lekcije', 'Six.', 'Seis.', None),
    # --- moraju biti greške
    ('lekcije', 'Do you all have a dog?', '¿Tenéis un perro?', 'g:zabranjeno'),
    ('lekcije', 'You have a dog.', 'Vos tenés un perro.', 'g:zabranjeno'),
    ('lekcije', 'Choose, everyone.', 'Elegid todos.', 'g:zabranjeno'),
    ('lekcije', 'Drive slowly.', 'Conduce despacio.', 'g:zabranjeno'),
    ('lekcije', 'I will drive.', 'Conduciré yo.', 'g:zabranjeno'),
    ('lekcije', 'OK!', '¡Vale!', 'g:zabranjeno'),
    ('lekcije', 'OK, let us go.', 'Vale, vamos.', 'g:zabranjeno'),
    ('lekcije', 'I miss you.', 'Te echo de menos.', 'g:zabranjeno'),
    ('lekcije', 'I am angry.', 'Estoy enfadado.', 'g:zabranjeno'),
    ('lekcije', 'Put on your sweater.', 'Ponte el jersey.', 'g:zabranjeno'),
    ('lekcije', 'We eat shrimp.', 'Comemos gambas.', 'g:zabranjeno'),
    ('lekcije', 'Beans and peanuts.', 'Judías y cacahuetes.', 'g:zabranjeno'),
    ('lekcije', 'Park here.', 'Aparca aquí.', 'g:zabranjeno'),
    ('lekcije', 'Blue jeans.', 'Vaqueros azules.', 'g:zabranjeno'),
    ('lekcije', 'The car is red.', 'El coche es rojo.', 'g:zabranjeno'),
    ('lekcije', 'Why?', 'Por qué?', 'g:upitnik'),
    ('lekcije', 'Great!', 'Genial!', 'g:usklicnik'),
    ('lekcije', 'He said "yes".', 'Dijo «sí».', 'g:navodnici'),
    ('lekcije', 'He said "yes".', 'Dijo „sí“.', 'g:navodnici'),
    ('lekcije', 'He said "yes".', 'Dijo “sí”.', None),
    ('lekcije', 'Use the place form from Lesson 13.', 'Usa la forma locativa de la Lección 13.', 'g:glosar'),
    ('lekcije', 'Use the place form from Lesson 13.', 'Usa la forma de lugar de la Lección 13.', None),
    ('lekcije', 'Type the adjective in the base form.', 'Escribe el adjetivo en la forma base.', None),
    ('sucelje', 'Word game', 'Juego de palabras', 'g:glosar'),
    ('sucelje', 'Word game', 'Juego de vocabulario', None),
    ('sucelje', 'Home', 'Home', 'g:engleski'),
    ('sucelje', 'Progress', 'Progress', 'g:engleski'),
    ('sucelje', 'Progress', 'Progreso', None),
    # --- pazi (ručno), ne greška
    ('sucelje', 'Score – 8', 'Puntuación – 8', 'p:puntuación'),
    ('lekcije', 'Red - blue', 'Rojo - azul', 'p:crtica'),
    ('lekcije', 'The waiter is here.', 'El camarero está aquí.', 'p:camarero'),
    ('lekcije', 'The helper did not answer this time.', 'El asistente no respondió esta vez.', None),
    ('lekcije', 'The helper is missing.', 'Falta el auxiliar.', None),
    # --- ponovna recenzija koraka 1 (#15–17)
    # #15 conducir: propusti i lažna greška
    ('lekcije', 'I drove there.', 'Conducí hasta allí.', 'g:zabranjeno'),
    ('lekcije', 'If I drove…', 'Si condujera…', 'g:zabranjeno'),
    ('lekcije', 'If you drove…', 'Si condujeses…', 'g:zabranjeno'),
    ('lekcije', 'He drove.', 'Él condujo.', 'g:zabranjeno'),
    ('lekcije', 'Drive here, please.', 'Conduzca aquí, por favor.', 'g:zabranjeno'),
    ('lekcije', 'Driving licence.', 'Licencia de conducir.', None),
    ('lekcije', 'I have a driving licence.', 'Tengo licencia de conducir.', None),
    ('lekcije', 'Two driving licences.', 'Dos licencias de conducir.', None),
    ('lekcije', 'The pipe is broken.', 'El conducto está roto.', None),
    # #16 jednorječni internacionalizmi u lekcijama i sučelju
    ('lekcije', 'hotel', 'hotel', None),
    ('lekcije', 'Taxi', 'Taxi', None),
    ('lekcije', 'Pizza, bus', 'Pizza, bus', None),
    ('lekcije', 'The hotel', 'The hotel', 'g:engleski'),
    ('lekcije', 'house', 'house', 'g:engleski'),
    ('sucelje', 'Total', 'Total', None),
    ('sucelje', 'Plan', 'Plan', None),
    # #17 cake → pastel (torta, tarta: pazi)
    ('lekcije', 'The cake is big.', 'El pastel es grande.', None),
    ('lekcije', 'I am bringing Grandma cakes.', 'Le llevo pasteles a la abuela.', None),
    ('lekcije', 'The cake is sweet.', 'La torta es dulce.', 'p:torta'),
    ('lekcije', 'A chocolate cake, please.', 'Una tarta de chocolate, por favor.', 'p:tarta'),
    ('lekcije', 'Where is the cake? In Croatian: *Gdje je torta?*', '¿Dónde está el pastel? En croata: *Gdje je torta?*', None),
]
# rječnik: (lema, značenja, očekivano); engleska značenja su u RJ_EN
RJ_EN = {'kuća': ['house', 'home'], 'šešir': ['hat', 'the hat'], 'kako': ['how'], 'hotel': ['hotel'],
         'auto': ['car', 'automobile'], 'jabuka': ['apple'], 'benzin': ['petrol', 'gasoline', 'gas', 'fuel'],
         'dozvola': ['permit', 'licence', 'permission']}
RJECNIK = [
    ('kuća', 'casa; home', 'g:engleski'),
    ('šešir', 'the hat', 'g:engleski'),
    ('kako', 'cómo; how', 'g:engleski'),
    ('hotel', 'hotel', None),
    ('auto', 'auto; carro', None),
    ('jabuka', 'manzana', None),
    ('benzin', 'gasolina; gas; combustible', None),
    ('dozvola', 'permiso; licencia (de conducir)', None),
]


def tsv(put, zaglavlje, retci):
    with open(put, 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f, delimiter='\t', lineterminator='\n')   # isto čitanje kao u alatu (csv.DictReader)
        w.writerow(zaglavlje)
        w.writerows(retci)


def main():
    tmp = tempfile.mkdtemp(prefix='stil-test-')
    try:
        al = os.path.join(tmp, 'croland-jezici', 'alati')
        os.makedirs(al)
        for f in ('provjeri-stil.py', 'jezici_lib.py'):
            shutil.copy(os.path.join(ALATI, f), al)
        with open(os.path.join(tmp, 'croland-jezici', 'jezici.json'), 'w', encoding='utf-8') as f:
            json.dump({'jezici': {'es': {'mapa': 'croland-es', 'ime': 'Español'}}}, f)
        es = os.path.join(tmp, 'croland-es')
        os.makedirs(os.path.join(es, 'rjecnik'))
        for f in ('pravila.json', 'glosar-es.tsv', 'stil-iznimke.tsv'):
            shutil.copy(os.path.join(ES, f), es)
        izvor = json.load(open(os.path.join(ES, 'pravila.json'), encoding='utf-8')).get('rjecnik_izvor')
        if izvor:
            with open(os.path.join(tmp, izvor), 'w', encoding='utf-8') as f:
                for l, e in RJ_EN.items():
                    f.write(json.dumps({'lema': l, 'en': e}, ensure_ascii=False) + '\n')
        lek = [(en, s, '1', str(i), 'en') for i, (d, en, s, o) in enumerate(SLUCAJEVI) if d == 'lekcije']
        suc = [(en, s, 'js-t', str(i)) for i, (d, en, s, o) in enumerate(SLUCAJEVI) if d == 'sucelje']
        tsv(os.path.join(es, 'prijevod-es.tsv'), ['en', 'es', 'puta', 'prvi_id', 'jezik'], lek)
        tsv(os.path.join(es, 'sucelje-es.tsv'), ['en', 'es', 'izvor', 'redak'], suc)
        tsv(os.path.join(es, 'pregledi-es.tsv'), ['en', 'hr', 'es', 'gdje'], [])
        with open(os.path.join(es, 'rjecnik', 'es-1.tsv'), 'w', encoding='utf-8') as f:
            for l, z, o in RJECNIK:
                f.write(f'{l}\t{z}\n')
        r = subprocess.run([sys.executable, os.path.join(al, 'provjeri-stil.py'), '--jezik', 'es', '--sve'],
                           capture_output=True, encoding='utf-8')
        izlaz = r.stdout
        if r.returncode not in (0, 1) or 'Traceback' in r.stderr:
            print(r.stdout, r.stderr); return 1
        # parsiranje izlaza: blok greske / pazi, redak „  [gdje] pravilo: opis“ pa „      en: …“
        nadjeno = {}
        blok = None
        zadnji = None
        for ln in izlaz.splitlines():
            if re.match(r'^\[es\] greske:', ln): blok = 'g'; continue
            if re.match(r'^\[es\] pazi', ln): blok = 'p'; continue
            if re.match(r'^\[es\] duljina', ln): blok = None; continue
            m = re.match(r'^  \[(\w+)\] ([^:]+):', ln)
            if m and blok:
                zadnji = (blok, m.group(1), m.group(2)); continue
            m = re.match(r'^      en: (.*)$', ln)
            if m and zadnji:
                b, gdje, prav = zadnji
                nadjeno.setdefault((gdje, m.group(1)), set()).add(f'{b}:{prav}')
                zadnji = None
        ok = 0
        pad = []
        svi = [(d, en, s, o) for d, en, s, o in SLUCAJEVI] + [('rjecnik', l, z, o) for l, z, o in RJECNIK]
        # isti en može imati više slučajeva (navodnici) – ispitaj svaki zasebno
        vidjeno = {}
        for d, en, s, o in svi:
            vidjeno.setdefault((d, en), []).append((s, o))
        for (d, en), lst in vidjeno.items():
            if len(lst) > 1:
                continue
            s, o = lst[0]
            dobio = nadjeno.get((d, en), set())
            if (o is None and not dobio) or (o is not None and o in dobio and
                                             (o.startswith('p:') or not any(x.startswith('g:') and x != o for x in dobio))):
                ok += 1
            else:
                pad.append(f'  [{d}] {en!r} → {s!r}: očekivano {o}, dobiveno {sorted(dobio) or None}')
        # slučajevi s istim en: pojedinačno
        for (d, en), lst in vidjeno.items():
            if len(lst) == 1:
                continue
            for s, o in lst:
                jedan = pojedinacno(tmp, al, es, d, en, s)
                if (o is None and not jedan) or (o is not None and o in jedan):
                    ok += 1
                else:
                    pad.append(f'  [{d}] {en!r} → {s!r}: očekivano {o}, dobiveno {sorted(jedan) or None}')
        print(f'test provjeri-stil.py: {ok}/{ok + len(pad)} slučajeva prolazi')
        for p in pad:
            print(p)
        return 1 if pad else 0
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def pojedinacno(tmp, al, es, d, en, s):
    tsv(os.path.join(es, 'prijevod-es.tsv'), ['en', 'es', 'puta', 'prvi_id', 'jezik'], [(en, s, '1', '0', 'en')])
    r = subprocess.run([sys.executable, os.path.join(al, 'provjeri-stil.py'), '--jezik', 'es', '--sve',
                        '--samo', 'lekcije'], capture_output=True, encoding='utf-8')
    out = set()
    blok = None
    for ln in r.stdout.splitlines():
        if re.match(r'^\[es\] greske:', ln): blok = 'g'; continue
        if re.match(r'^\[es\] pazi', ln): blok = 'p'; continue
        if re.match(r'^\[es\] duljina', ln): blok = None; continue
        m = re.match(r'^  \[(\w+)\] ([^:]+):', ln)
        if m and blok:
            out.add(f'{blok}:{m.group(2)}')
    return out


if __name__ == '__main__':
    sys.exit(main())
