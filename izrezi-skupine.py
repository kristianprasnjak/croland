#!/usr/bin/env python3
"""Priprema Gemini snimki za tecaj: reze skupine na rijeci, pretvara pojedinacne i rezervne
snimke u mp3 i radi stranicu za preslusavanje.

Izvori (redom; kasniji ima prednost za istu rijec):
  zvuk-gemini/<glas>/              stare pojedinacne snimke (samo ako su prosle provjeru)
  zvuk-gemini/<glas>-skupine/      skupine; rijeci koje provjera nije prihvatila se preskacu
  zvuk-gemini/Gabrijela/           rezervni glas (edge-tts) za rijeci koje Kore nije izgovorila dobro
  zvuk-gemini/<glas>-pojedinacno/  pojedinacne snimke koje su prosle provjeru
Rijeci koje vec imaju zvuk u zvuk/ se preskacu (nista se ne prepisuje).

Skupina od N rijeci se reze na N-1 najduljih tisina, i to samo ako su te tisine jasno
dulje od ostalih pauza; inace ide u zvuk-gemini-ponovi.txt (za pojedinacno snimanje).

Izlaz:
  zvuk-gemini-mp3/<glas>-rijeci/<rijec>.mp3 + izvjesce.csv
  preslusaj-skupine.html

Pokretanje iz mape projekta:  python3 izrezi-skupine.py [--glas Kore]
"""
import argparse, csv, html, json, os, re, subprocess, tempfile, unicodedata

ap = argparse.ArgumentParser()
ap.add_argument('--glas', default='Kore')
ap.add_argument('--rezerva', default='Gabrijela')
ap.add_argument('--prag', default='-40dB')
a = ap.parse_args()

ROOT = os.getcwd()
ZG = os.path.join(ROOT, 'zvuk-gemini')
IZL = os.path.join(ROOT, 'zvuk-gemini-mp3', a.glas + '-rijeci')
os.makedirs(IZL, exist_ok=True)
TMP = tempfile.mkdtemp(prefix='izrezi-')


def naziv(t):
    n = unicodedata.normalize('NFC', t)
    n = re.sub(r'[\\/:*?"<>|]', '', n)
    n = re.sub(r'\s+', ' ', n).strip()
    return re.sub(r'[.!?\s]+$', '', n)


def kljuc(t):
    return naziv(t).lower()


def ff(*args):
    return subprocess.run(['ffmpeg', '-hide_banner', '-nostdin', *args], capture_output=True, text=True)


def trajanje(f):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f],
                       capture_output=True, text=True)
    return float(r.stdout.strip())


def tisine(wav, min_d=0.12):
    r = ff('-i', wav, '-af', f'silencedetect=noise={a.prag}:d={min_d}', '-f', 'null', '-')
    s, poc = [], None
    for red in r.stderr.splitlines():
        m = re.search(r'silence_start: (-?[\d.]+)', red)
        if m:
            poc = max(0.0, float(m.group(1)))
        m = re.search(r'silence_end: ([\d.]+)', red)
        if m and poc is not None:
            s.append((poc, float(m.group(1))))
            poc = None
    if poc is not None:
        s.append((poc, 1e9))
    return s


TRIM = ('silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,'
        'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,areverse')


def u_mp3(ulaz, izlaz):
    """Obrezi tisinu, srednja glasnoca -18 dB, vrh najvise -1.5 dB, 48k mp3 (kao dosad)."""
    t = os.path.join(TMP, '_t.wav')
    ff('-loglevel', 'error', '-y', '-i', ulaz, '-af', TRIM, '-ar', '24000', '-ac', '1', t)
    r = ff('-i', t, '-af', 'volumedetect', '-f', 'null', '-')
    mm = re.search(r'mean_volume: (-?[\d.]+)', r.stderr)
    mp = re.search(r'max_volume: (-?[\d.]+)', r.stderr)
    if not mm or not mp or float(mp.group(1)) < -60:
        return 0.0   # prazna / tiha snimka - ne sprema se
    mean, peak = float(mm.group(1)), float(mp.group(1))
    g = round(min(-18 - mean, -1.5 - peak), 2)
    ff('-loglevel', 'error', '-y', '-i', t, '-af', f'volume={g}dB', '-b:a', '48k', izlaz)
    return trajanje(izlaz)


def ocekivano(r):
    return 0.25 + 0.075 * len(re.sub(r'\s', '', r))


def citaj(p):
    if not os.path.exists(p):
        return []
    return [l.strip().lstrip('﻿') for l in open(p, encoding='utf-8') if l.strip() and not l.startswith('#')]


# --- vec postoji u zvuk/ ---
ima_zvuk = set()
for f in os.listdir(os.path.join(ROOT, 'zvuk')):
    ima_zvuk.add(kljuc(os.path.splitext(f)[0]))

rizicne = {kljuc(l.split('\t')[0]) for l in citaj(os.path.join(ROOT, 'zvuk-gemini-rizicne.txt'))}

# --- provjera: zadnji zapis po (izvor, rijec) ---
prov = {}
pp = os.path.join(ROOT, 'zvuk-gemini-provjera.csv')
if os.path.exists(pp):
    for row in csv.reader(open(pp, encoding='utf-8-sig'), delimiter=';'):
        if len(row) >= 6 and row[0] != 'vrijeme':
            prov[(row[1], kljuc(row[2]))] = {'cuje': row[3], 'jez': row[4], 'ok': row[5]}

konacno = {}   # kljuc -> dict(rijec, izvor, dur, status, cuje)
ponovi = []


def upisi(rijec, izvor, dur, status, cuje=''):
    if dur == 0:
        status = 'prazna snimka'
    konacno[kljuc(rijec)] = dict(rijec=rijec, izvor=izvor, dur=round(dur, 2), status=status, cuje=cuje)


def status_trajanja(r, d):
    if d == 0:
        return 'prazna snimka'
    o = d / ocekivano(r)
    return 'ok' if 0.4 <= o <= 2.6 else f'sumnjivo trajanje ({d:.2f} s)'


# 1) stare pojedinacne
dst = os.path.join(ZG, a.glas)
if os.path.isdir(dst):
    for f in sorted(os.listdir(dst)):
        if not f.endswith('.wav'):
            continue
        r = f[:-4]; k = kljuc(r)
        if k in ima_zvuk or k in rizicne:
            continue
        p = prov.get(('stari', k))
        if p and p['ok'] == '0':
            continue
        d = u_mp3(os.path.join(dst, f), os.path.join(IZL, naziv(r) + '.mp3'))
        upisi(r, a.glas + ' (stara)', d, 'ok' if p and p['ok'] == '1' else 'neprovjereno', p['cuje'] if p else '')

# 2) skupine
dsk = os.path.join(ZG, a.glas + '-skupine')
for ime in sorted(f[:-4] for f in os.listdir(dsk) if f.endswith('.wav')) if os.path.isdir(dsk) else []:
    wav = os.path.join(dsk, ime + '.wav')
    rijeci = citaj(os.path.join(dsk, ime + '.txt'))
    n = len(rijeci)
    dur = trajanje(wav)
    unut = [(p, k) for p, k in tisine(wav) if p > 0.05 and k < dur - 0.05]
    unut.sort(key=lambda x: x[1] - x[0], reverse=True)
    razlog = ''
    if len(unut) < n - 1:
        razlog = f'premalo pauza ({len(unut)} za {n} rijeci)'
    elif n > 1:
        najkraca = min(k - p for p, k in unut[:n - 1])
        sljedeca = (unut[n - 1][1] - unut[n - 1][0]) if len(unut) >= n else 0
        if najkraca < 0.35:
            razlog = f'pauza prekratka ({najkraca:.2f} s)'
        elif sljedeca and sljedeca > 0.7 * najkraca:
            razlog = f'pauze nejasne ({najkraca:.2f} vs {sljedeca:.2f} s)'
    if razlog:
        print(f'{ime}: ODBIJENO - {razlog}')
        ponovi += [r for r in rijeci if kljuc(r) not in ima_zvuk]
        continue
    rez = sorted(unut[:n - 1])
    gr = [0.0] + [(p + k) / 2 for p, k in rez] + [dur]
    izrezano = preskoceno = 0
    for i, r in enumerate(rijeci):
        k = kljuc(r)
        p = prov.get((ime, k))
        if k in ima_zvuk or (p and p['ok'] == '0'):
            preskoceno += 1
            continue
        dio = os.path.join(TMP, 'dio.wav')
        ff('-loglevel', 'error', '-y', '-i', wav, '-ss', f'{gr[i]:.3f}', '-to', f'{gr[i+1]:.3f}', dio)
        d = u_mp3(dio, os.path.join(IZL, naziv(r) + '.mp3'))
        st = status_trajanja(r, d)
        if st == 'ok' and not p:
            st = 'neprovjereno'
        upisi(r, a.glas + ' ' + ime, d, st, p['cuje'] if p else '')
        izrezano += 1
    print(f'{ime}: izrezano {izrezano}' + (f', preskoceno (lose ili vec postoji) {preskoceno}' if preskoceno else ''))

# 3) rezervni glas
drz = os.path.join(ZG, a.rezerva)
if os.path.isdir(drz):
    for f in sorted(os.listdir(drz)):
        if f.endswith('.mp3') and kljuc(f[:-4]) not in ima_zvuk:
            d = u_mp3(os.path.join(drz, f), os.path.join(IZL, f))
            upisi(f[:-4], a.rezerva + ' (rezerva)', d, 'ok')

# 4) pojedinacne koje su prosle provjeru
dpj = os.path.join(ZG, a.glas + '-pojedinacno')
if os.path.isdir(dpj):
    for f in sorted(os.listdir(dpj)):
        if not f.endswith('.wav') or kljuc(f[:-4]) in ima_zvuk:
            continue
        r = f[:-4]
        p = prov.get(('pojedinacno', kljuc(r)))
        d = u_mp3(os.path.join(dpj, f), os.path.join(IZL, naziv(r) + '.mp3'))
        upisi(r, a.glas + ' pojedinacno', d, 'ok' if p and p['ok'] == '1' else 'neprovjereno', p['cuje'] if p else '')

# --- izvjesce ---
red = sorted(konacno.values(), key=lambda x: (x['status'] == 'ok', x['rijec'].lower()))
with open(os.path.join(IZL, 'izvjesce.csv'), 'w', encoding='utf-8-sig', newline='') as fh:
    w = csv.writer(fh, delimiter=';')
    w.writerow(['rijec', 'izvor', 'trajanje_s', 'status', 'provjera_cuje'])
    for x in red:
        w.writerow([x['rijec'], x['izvor'], x['dur'], x['status'], x['cuje']])

if ponovi:
    pd = os.path.join(ROOT, 'zvuk-gemini-ponovi.txt')
    post = {kljuc(l) for l in citaj(pd)}
    novi = [r for r in dict.fromkeys(ponovi) if kljuc(r) not in post]
    if novi:
        with open(pd, 'a', encoding='utf-8', newline='\r\n') as fh:
            fh.write('\n'.join(novi) + '\n')
        print(f'dopisano u zvuk-gemini-ponovi.txt: {len(novi)}')

# --- stranica za preslusavanje ---
podaci = [dict(r=x['rijec'], s='zvuk-gemini-mp3/' + a.glas + '-rijeci/' + naziv(x['rijec']) + '.mp3',
               i=x['izvor'], st=x['status'], c=x['cuje']) for x in red]
stranica = '''<!doctype html><html lang="hr"><meta charset="utf-8"><title>Preslušaj snimke</title>
<style>
body{font:15px/1.4 system-ui,sans-serif;margin:0;padding:16px 16px 190px;max-width:980px}
table{border-collapse:collapse;width:100%}td,th{padding:4px 8px;border-bottom:1px solid #e3e3e3;text-align:left}
th{font-size:12px;color:#666;font-weight:600}.rj{font-weight:600}.mal{font-size:12px;color:#777}
tr.sum{background:#fff4d6}tr.akt{outline:2px solid #3b82f6}tr.los{background:#fde2e2}
button.p{cursor:pointer;border:1px solid #ccc;background:#fff;border-radius:6px;width:34px;height:28px}
#dno{position:fixed;left:0;right:0;bottom:0;background:#fafafa;border-top:1px solid #ddd;padding:10px 16px}
#dno textarea{width:100%;max-width:960px;height:80px;font:13px monospace}
</style>
<h2>Preslušaj snimke (<span id="n"></span>)</h2>
<p class="mal">▶ pusti riječ. Tipke: <b>N</b> sljedeća, <b>R</b> ponovi, <b>L</b> označi kao lošu.
Žuto = neprovjereno ili sumnjivo trajanje. Označene loše riječi skupljaju se dolje: kopiraj popis i pošalji ga Claudeu.</p>
<table><thead><tr><th></th><th>riječ</th><th>izvor</th><th>provjera je čula</th><th>status</th><th>loše</th></tr></thead><tbody id="t"></tbody></table>
<div id="dno"><b>Loše riječi</b> <button onclick="kop()">Kopiraj</button> <span id="ok" class="mal"></span><br><textarea id="lose" readonly></textarea></div>
<script>
var D=''' + json.dumps(podaci, ensure_ascii=False) + ''';
var A=new Audio(),cur=-1,t=document.getElementById('t');
document.getElementById('n').textContent=D.length;
function e(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
t.innerHTML=D.map(function(x,i){return '<tr id="r'+i+'" class="'+(x.st=='ok'?'':'sum')+'"><td><button class="p" onclick="p('+i+')">▶</button></td><td class="rj">'+e(x.r)+'</td><td class="mal">'+e(x.i)+'</td><td>'+e(x.c)+'</td><td class="mal">'+e(x.st)+'</td><td><input type="checkbox" id="c'+i+'" onchange="sk()"></td></tr>'}).join('');
function p(i){if(i<0||i>=D.length)return;if(cur>=0)document.getElementById('r'+cur).classList.remove('akt');cur=i;var r=document.getElementById('r'+i);r.classList.add('akt');r.scrollIntoView({block:'center'});A.src=encodeURI(D[i].s);var q=A.play();if(q&&q.catch)q.catch(function(){});}
function sk(){var l=[];D.forEach(function(x,i){var c=document.getElementById('c'+i).checked;document.getElementById('r'+i).classList.toggle('los',c);if(c)l.push(x.r)});document.getElementById('lose').value=l.join('\\n');}
function kop(){var t=document.getElementById('lose');t.select();try{navigator.clipboard.writeText(t.value)}catch(_){document.execCommand('copy')}document.getElementById('ok').textContent='kopirano';}
document.addEventListener('keydown',function(ev){var k=ev.key.toLowerCase();if(k=='n')p(cur+1);else if(k=='r')p(Math.max(cur,0));else if(k=='l'&&cur>=0){var c=document.getElementById('c'+cur);c.checked=!c.checked;sk();}});
</script></html>'''
open(os.path.join(ROOT, 'preslusaj-skupine.html'), 'w', encoding='utf-8').write(stranica)
nok = sum(1 for x in red if x['status'] == 'ok')
print(f'\nUkupno spremno: {len(red)} (provjereno ok {nok}, za paznju {len(red) - nok}) - za pojedinacno: {len(ponovi)}')
