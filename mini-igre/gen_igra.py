# -*- coding: utf-8 -*-
"""gen_igra.py — sastavi 01-grad-v2.html s ugrađenom kartom i atlasom."""
import json, io, os, importlib.util

d = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("kat", os.path.join(d, "katalog.py"))
kat = importlib.util.module_from_spec(spec); spec.loader.exec_module(kat)

karta = json.load(open(os.path.join(d, "grad-karta.json"), encoding="utf-8"))
unutra = json.load(open(os.path.join(d, "interijeri.json"), encoding="utf-8"))
atlas = {k: {"s": v[0], "c": v[1], "r": v[2], "w": v[3], "h": v[4]}
         for k, v in list(kat.KATALOG.items()) + list(kat.LIKOVI.items())}

HTML = r"""<!DOCTYPE html>
<html lang="hr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Croland — Grad v2</title>
<style>
:root{--papir:#FFF8EF;--papir2:#F3E7D4;--tinta:#2B2118;--meko:#8C8072;--zut:#F4B942;--zel:#7CB342;
  --crta:3px solid var(--tinta)}
*{box-sizing:border-box}
body{margin:0;background:var(--papir);color:var(--tinta);
  font:15px/1.5 ui-sans-serif,system-ui,"Segoe UI",Roboto,sans-serif;overscroll-behavior:none}
.omot{max-width:900px;margin:0 auto;padding:8px 8px 24px}
header{display:flex;gap:10px;align-items:center;background:var(--papir2);border:var(--crta);
  border-radius:14px;padding:8px 12px;margin-bottom:8px;flex-wrap:wrap}
header .ime{font-weight:800;font-size:17px}
header .pod{font-size:12px;color:var(--meko);text-transform:uppercase;letter-spacing:.5px}
header .znak{margin-left:auto;display:flex;gap:8px}
header .znak span{background:#fff;border:2px solid var(--tinta);border-radius:9px;padding:3px 9px;
  font-size:13px;font-weight:700}
header .znak button{font:inherit;font-size:15px;font-weight:700;background:var(--zut);
  border:2px solid var(--tinta);border-radius:9px;padding:3px 10px;cursor:pointer;
  box-shadow:0 2px 0 var(--tinta)}
header .znak button:active{transform:translateY(2px);box-shadow:none}
.oblacic .tko{font-size:12px;font-weight:800;color:var(--zel);text-transform:uppercase;
  letter-spacing:.5px;margin-bottom:2px}
.oblacic ul{margin:6px 0 0;padding-left:18px;font-size:14px}
.izbori{display:flex;flex-direction:column;gap:6px;margin-top:10px}
.izbori button{font:inherit;font-size:14.5px;text-align:left;background:#fff;
  border:2px solid var(--tinta);border-radius:10px;padding:8px 12px;cursor:pointer;
  box-shadow:0 2px 0 var(--tinta)}
.izbori button:hover{background:var(--zut)}
.izbori button:active{transform:translateY(2px);box-shadow:none}
.oblacic li{margin:3px 0}
.znacka{position:fixed;top:84px;left:50%;transform:translateX(-50%);z-index:11;
  background:var(--zel);color:#fff;font-weight:800;border:3px solid var(--tinta);
  border-radius:12px;padding:8px 16px;box-shadow:0 4px 0 var(--tinta);opacity:0;
  transition:opacity .25s}
.znacka.vidi{opacity:1}
.ploha{background:var(--papir2);border:var(--crta);border-radius:16px;padding:10px;
  display:flex;flex-direction:column;gap:10px;align-items:center}
#platno{image-rendering:pixelated;display:block;margin:0 auto;
  border:var(--crta);border-radius:12px;background:#6ab04c}
.dpad{display:grid;grid-template-columns:repeat(3,56px);grid-template-rows:repeat(3,56px);gap:6px}
.dpad button{font-size:20px;border:var(--crta);border-radius:12px;background:#fff;
  box-shadow:0 3px 0 var(--tinta);cursor:pointer;touch-action:manipulation}
.dpad button:active{transform:translateY(3px);box-shadow:none}
.dpad .prazno{visibility:hidden}
.dpad .akcija{background:var(--zut)}
.traka{width:100%;background:#fff;border:2px solid var(--tinta);border-radius:12px;padding:7px 12px;
  font-size:13.5px;min-height:38px}
.traka b{color:var(--zel)}
.oblacic{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:9;
  background:var(--papir);border:var(--crta);border-radius:14px;padding:12px 18px;max-width:560px;
  width:calc(100% - 32px);box-shadow:0 6px 0 rgba(43,33,24,.25)}
.oblacic .hr{font-size:17px;font-weight:700}
.oblacic .en{font-size:13px;color:var(--meko);margin-top:3px}
.oblacic .dalje{font-size:12px;color:var(--meko);margin-top:8px;text-align:right}
@media (max-width:640px){
  .omot{padding:6px 6px 16px}
  header{padding:6px 10px;margin-bottom:6px}
  header .ime{font-size:15px}
  header .pod{display:none}
  .ploha{padding:7px;gap:7px}
  .traka{font-size:12.5px;padding:5px 9px;min-height:32px}
  .dpad{grid-template-columns:repeat(3,50px);grid-template-rows:repeat(3,50px);gap:5px}
  .znacka{top:70px;font-size:13px;padding:6px 12px}
}
</style></head><body>
<div class="omot">
  <header>
    <div><div class="ime">Grad</div><div class="pod">v2 · svijet u izradi</div></div>
    <div class="znak"><span id="zZona">—</span><span>🪙 <b id="zNov">40</b></span>
      <button id="gDnevnik" title="Dnevnik zadataka">📜</button></div>
  </header>
  <div class="ploha">
    <div class="traka" id="traka">Strelice ili WASD za kretanje. Razmaknica čita natpise i otvara vrata.</div>
    <canvas id="platno"></canvas>
    <div class="dpad">
      <span class="prazno"></span><button data-s="u">▲</button><span class="prazno"></span>
      <button data-s="l">◀</button><button class="akcija" data-s="x">✋</button><button data-s="r">▶</button>
      <span class="prazno"></span><button data-s="d">▼</button><span class="prazno"></span>
    </div>
  </div>
</div>
<script>
var KARTA = __KARTA__;
var ATLAS = __ATLAS__;
var UNUTRA = __UNUTRA__;

/* ---------------- ljudi ----------------
   gdje: 'grad' ili id interijera. Pozicije vani se po potrebi
   same pomaknu na najbliže slobodno polje. */
var NPC = [
  /* stambeno */
  {id:'mara',      ime:'Baka Mara',        lik:'lik-4-2', gdje:'grad', x:7,  y:38,
   poz:'Dobar dan. Vi ste onaj novi iz zgrade preko puta?',
   prica:['Prije je ovdje sve bilo polje. Sad ima i semafor.','Jeste li jeli? Mršavi ste.']},
  {id:'tomislav',  ime:'Susjed Tomislav',  lik:'lik-3-1', gdje:'grad', x:12, y:39,
   poz:'O, susjed! Dobro došao u kvart.',
   prica:['Ako ti ikad zatreba alat, samo reci.','Krov mi prokišnjava, a ljestve su mi kod brata. Klasika.']},
  {id:'iva',       ime:'Iva',              lik:'lik-1-3', gdje:'grad', x:6,  y:43,
   poz:'Bok! Ja sam Iva, a ono tamo je moja sestra Ana.',
   prica:['Ana sve ponavlja za mnom. Sve!','Utrkujmo se do klupe! Ma dobro, drugi put.']},
  {id:'ana',       ime:'Ana',              lik:'lik-1-3', gdje:'grad', x:9,  y:43,
   poz:'Bok! Ja sam Ana. Što god ti Iva kaže — i ja to kažem.',
   prica:['Iva misli da je brža. Nije.','Znaš li da naša mačka ima tri imena?']},
  /* trg */
  {id:'svirac',    ime:'Svirač Rene',      lik:'lik-2-0', gdje:'grad', x:33, y:24,
   poz:'Slušaj ovu: „More, more, plavo more…” Sam sam je složio.',
   prica:['Ljudi najviše daju kad sviram stare pjesme.','Gitara mi je starija od tebe, garantiram.']},
  {id:'novinarka', ime:'Prodavačica Vera', lik:'lik-1-1', gdje:'grad', x:39, y:22,
   poz:'Novine! Sve novosti iz grada!',
   prica:['Ono što nije u novinama — to ja znam.','Kažu da će kiša. Ja kažem da neće.']},
  {id:'starac',    ime:'Starac Jure',      lik:'lik-5-2', gdje:'grad', x:36, y:25,
   poz:'Sjedni malo, mladiću. Kamo svi žure?',
   prica:['Ovaj trg pamti više nego cijela knjižnica.','Nekad se ovdje plesalo svake subote.']},
  /* dućani — vani */
  {id:'dostavljac',ime:'Dostavljač',       lik:'lik-3-0', gdje:'grad', x:55, y:27,
   poz:'Oprosti, žurim! Tri paketa do dva sata.',
   prica:['Najgore su adrese bez broja.','Bicikl mi je pukao, sve nosim pješice.']},
  /* školski kvart */
  {id:'luka',      ime:'Dječak Luka',      lik:'lik-0-3', gdje:'grad', x:9,  y:21,
   poz:'Bok! Ideš u školu? Ja bježim iz nje. Šalim se!',
   prica:['Sutra imamo test iz matematike. Bljak.','Znaš li se penjati na drvo? Ja znam. Skoro.']},
  {id:'sara',      ime:'Učenica Sara',     lik:'lik-1-2', gdje:'grad', x:12, y:22,
   poz:'Ako nešto ne razumiješ, pitaj mene. Ja sve znam. Skoro sve.',
   prica:['Učiteljica kaže da previše pričam. A ja samo objašnjavam!']},
  /* zanatska */
  {id:'zoran',     ime:'Poštar Zoran',     lik:'lik-2-3', gdje:'grad', x:54, y:39,
   poz:'Pisma, paketi, računi… Uvijek nešto nosim.',
   prica:['Najviše volim nositi razglednice. Kratke su.','Pola grada ne potpiše čitko. Pola!']},
  {id:'ema',       ime:'Turistkinja Ema',  lik:'lik-1-0', gdje:'grad', x:59, y:40,
   poz:'Oprosti — govoriš li hrvatski? Ja tek učim.',
   prica:['Muzej je predivan, ali ništa ne razumijem.','Kod nas se kaže „danke", a ovdje „hvala". Hva-la.']},
  /* gornji grad */
  {id:'ruza',      ime:'Starica Ruža',     lik:'lik-4-3', gdje:'grad', x:28, y:9,
   poz:'Polako, dijete… sve polako. Grad je star, ima vremena.',
   prica:['Zvono zvoni u podne. Po njemu znam kad je ručak.','Moja pokojna sestra je pekla najbolji kruh u gradu.']},
  {id:'klesar',    ime:'Klesar Šime',      lik:'lik-3-3', gdje:'grad', x:39, y:10,
   poz:'Ovaj kamen? Stariji od nas obojice. Drži pola grada.',
   prica:['Dobar kamen se ne traži. Dobar kamen se čuje.','Ruke su mi tvrde, ali posao je mekan. Šalim se, nije.']},
  {id:'slaven',    ime:'Vozač Slaven',     lik:'lik-2-2', gdje:'grad', x:44, y:9,
   poz:'Autobus ide preko cijelog grada. Dva novčića, molim.',
   prica:['Vozim trideset godina. Znam svaku rupu na cesti. Osobno.']},
  /* park */
  {id:'vrtlar',    ime:'Vrtlar Zdravko',   lik:'lik-3-2', gdje:'grad', x:31, y:36,
   poz:'Vidiš ove ruže? Sadio sam ih dok si ti još bio manji od ove živice.',
   prica:['Trava se kosi ujutro, dok je rosa. Zapamti to.','Golubovi su mi pojeli pola sjemena. Pola!']},
  {id:'sanja',     ime:'Sanja sa psom',    lik:'lik-1-1', gdje:'grad', x:37, y:38,
   poz:'Ne boj se, ne grize. Samo laje na golubove.',
   prica:['Zove se Runo. Kao vuna, jer je kudrav.','Svaki dan dva kruga oko parka. On mene šeta, iskreno.']},
  {id:'petra',     ime:'Liječnica Petra',  lik:'lik-1-2', gdje:'grad', x:41, y:40,
   poz:'Šetnja svaki dan — pola zdravlja. Druga polovica je juha.',
   prica:['Ljudi dođu k meni tek kad ih sve boli. A šetnja je besplatna.']},
  /* riva */
  {id:'mate',      ime:'Ribar Mate',       lik:'lik-5-0', gdje:'grad', x:12, y:48,
   poz:'Jutros u pet sam bio na moru. More ti sve kaže, samo ga treba slušati.',
   prica:['Kad galebovi lete nisko, bit će bure.','Mreža se krpa zimi. Ljeti se lovi.']},
  {id:'anka',      ime:'Ribarica Anka',    lik:'lik-4-1', gdje:'grad', x:17, y:48,
   poz:'Svježa riba! Jutrošnja! Kilogram, pola kile, koliko trebaš?',
   prica:['Najbolja je ona koja se jutros još praćakala.']},
  {id:'hans',      ime:'Turist Hans',      lik:'lik-2-1', gdje:'grad', x:30, y:48,
   poz:'Entschuldigung… ovaj… gdje je… plaža? Molim? Danke!',
   prica:['Hrvatski… težak jezik. Ali lijep. Kao more.']},
  {id:'dijete1',   ime:'Dijete s udicom',  lik:'lik-0-3', gdje:'grad', x:24, y:49,
   poz:'Ništa ne grize već dva sata. Ali ne odustajem!',
   prica:['Djed kaže: tko čeka, taj i ulovi. Djed puno čeka.']},
  /* sportski kvart */
  {id:'boris',     ime:'Trener Boris',     lik:'lik-3-0', gdje:'grad', x:72, y:37,
   poz:'Trči! Dodaj! Stani! …Ne ti, ne ti. Ti samo gledaj.',
   prica:['Kondicija se ne kupuje. Kondicija se trči.','U nedjelju je utakmica, a pola momčadi kašlje.']},
  {id:'dario',     ime:'Vratar Dario',     lik:'lik-2-0', gdje:'grad', x:75, y:40,
   poz:'Jučer smo pobijedili dva-jedan. Obranio sam sve. Skoro sve.',
   prica:['Gol koji sam primio? Vjetar. Čisti vjetar.']},
  {id:'lana',      ime:'Atletičarka Lana', lik:'lik-1-0', gdje:'grad', x:71, y:41,
   poz:'Sto metara za trinaest sekundi. A ti? Hajde, mjerim ti vrijeme!',
   prica:['Najvažniji je start. I cilj. Dobro — sve je važno.']},
  {id:'kreso',     ime:'Navijač Krešo',    lik:'lik-5-1', gdje:'grad', x:77, y:36,
   poz:'U nedjelju je utakmica! Cijeli grad dolazi. I ti dođi!',
   prica:['Imam šal, imam kapu, imam glas. Spreman sam.']},
  /* interijeri */
  {id:'vesna',     ime:'Pekarica Vesna',   lik:'lik-1-1', gdje:'pekara',    x:5,  y:4,
   poz:'Dobro jutro! Izvolite?',
   prica:['Ustajem u četiri. Svaki dan.','Miriše, je li? To je onaj s kraja peći.']},
  {id:'jela',      ime:'Jela',             lik:'lik-4-1', gdje:'trznica',   x:4,  y:5,
   poz:'Rajčice, mladi krumpir, luk! Sve jutros ubrano.',
   prica:['Cijena je poštena, roba je domaća. Što ćeš više?']},
  {id:'ivo',       ime:'Konobar Ivo',      lik:'lik-2-2', gdje:'konoba',    x:11, y:4,
   poz:'Sjedni gdje hoćeš. Danas imamo grah, a grah je zakon.',
   prica:['Gosti koji kažu „molim" i „hvala" dobiju veću porciju. Provjereno.']},
  {id:'damir',     ime:'Učitelj Damir',    lik:'lik-3-1', gdje:'skola',     x:7,  y:4,
   poz:'Uđi, uđi. Baš govorimo o rodu imenica. Znaš li kojeg je roda „more”?',
   prica:['Srednjeg! „More” je srednjeg roda. To svi promaše.']},
  {id:'bruno',     ime:'Knjižničar Bruno', lik:'lik-5-3', gdje:'knjiznica', x:12, y:4,
   poz:'Dobar dan. Vidim po licu — ne razumijete ni riječ, je li tako?',
   prica:['Nije to strašno. Jezik se uči uhom, ne strahom.','Tiho, molim. Iako, nema nikoga.']},
  {id:'nada',      ime:'Šalterica Nada',   lik:'lik-1-2', gdje:'posta',     x:5,  y:4,
   poz:'Izvolite? Pisma na šalter jedan, paketi na dva. Ja sam oba šaltera.',
   prica:['Marka se lijepi u desni gornji kut. Uvijek desni gornji.']},
  {id:'filip',     ime:'Čuvar Filip',      lik:'lik-3-3', gdje:'muzej',     x:3,  y:4,
   poz:'Dobar dan. Ne dirajte izloške, molim.',
   prica:['Najstariji izložak ima dvije tisuće godina. A ja čuvam i njega i vas.']},
  {id:'mario',     ime:'Razvodnik Mario',  lik:'lik-2-3', gdje:'kino',      x:12, y:5,
   poz:'Karte, molim! Film počinje za deset minuta.',
   prica:['Prvi red nije najbolji. Sedmi red, sredina. Vjeruj mi.']},
  {id:'marija',    ime:'Sestra Marija',    lik:'lik-1-0', gdje:'ambulanta', x:11, y:4,
   poz:'Doktorica je u šetnji. Ako nije hitno, sjednite.',
   prica:['Čaj, odmor i manje brige. To je pola mojih savjeta.']},
  {id:'ante',      ime:'Don Ante',         lik:'lik-5-2', gdje:'crkva',     x:7,  y:4,
   poz:'Mir s tobom. Zvono zvoni u podne i u sedam.',
   prica:['Po zvonu se ravna pola grada. Druga polovica kasni.']},
  {id:'stipe',     ime:'Domar Stipe',      lik:'lik-4-0', gdje:'dvorana',   x:3,  y:4,
   poz:'Ključevi od svega su kod mene. I od dvorane, i od svlačionice.',
   prica:['Bez mene se ovdje ni lopta ne napuše.']},
  {id:'kata',      ime:'Spremačica Kata',  lik:'lik-4-2', gdje:'skola',     x:3,  y:6,
   poz:'Pazi, oprano je! Hodaj uz rub, kao svi.',
   prica:['Djeca nanesu pola dvorišta u školu. Svaki dan.']}
];

/* ---------------- zadaci ----------------
   tip 'odnesi'   — dobiješ predmet, nosiš ga cilju; završava kod cilja
   tip 'donesi'   — cilj ti da predmet kad ga zamoliš; vraćaš ga davatelju
   tip 'razgovor' — prenosiš poruku cilju; vraćaš se davatelju s odgovorom */
var QUESTOVI = [
  {id:'kruh', daje:'mara', tip:'donesi', cilj:'vesna', predmet:'kruh',
   nudi:['Kad ste već tu — biste li mi učinili uslugu?','Noge me više ne služe, a kruha nemam ni kore.','Otiđite do pekare i donesite mi jedan kruh. Vesna već zna koji.'],
   podsjetnik:'Donesi baki Mari kruh iz pekare (Dućani).',
   provjera:{pit:'Izvolite? Što trebate?', ok:'Jedan kruh, molim.', lose:['Jedno mlijeko, molim.','Jedan sir, molim.'], krivo:'Mi smo pekara, to nemam. Probajte ponovno.'},
   ciljTekst:['A, ti si taj novi! Mara mi je već javila.','Evo, ovaj s kraja peći — njoj je najdraži. Pozdravi je!'],
   hvala:['Kruh! I to još topao.','Hvala vam, zlato moje. Dođite opet, uvijek sam tu.'],
   poslije:['Kruh je bio taman kakav treba. Hvala vam još jednom.','Dođite mi opet. Skuhat ću kavu, imam i onaj kolač.']},
  {id:'pismo', daje:'zoran', tip:'odnesi', cilj:'ante', predmet:'pismo',
   nudi:['Baš dobro da te vidim!','Imam pismo za don Antu, a torba mi je puna k’o šipak.','Odnesi mu ga u crkvu, molim te. Gore je, u Gornjem gradu.'],
   podsjetnik:'Odnesi pismo don Anti u crkvu (Gornji grad).',
   provjera:{pit:'Nosiš mi nešto, sinko?', ok:'Pismo od poštara Zorana.', lose:['Paket iz autobusa.','Novine s trga.'], krivo:'Ne, to nije za mene. Pogledaj još jednom.'},
   hvala:['Pismo! Baš sam ga čekao.','Hvala ti, sinko. Poštar ima sreće s tobom.'],
   poslije:['Don Ante mi je javio da je pismo stiglo. Brzi ste vi.','Danas mi je torba lakša. Malo.']},
  {id:'cekic', daje:'tomislav', tip:'donesi', cilj:'klesar', predmet:'čekić',
   nudi:['Posudio sam čekić klesaru Šimi još prije mjesec dana.','Znaš kako je to — posudiš na dan, ne vidiš ga mjesec.','Ako ideš prema Gornjem gradu, zamoli ga da ti ga da.'],
   podsjetnik:'Uzmi Tomislavov čekić od klesara Šime (Gornji grad).',
   provjera:{pit:'Tebe šalje Tomislav? Po što?', ok:'Po čekić.', lose:['Po ljestve.','Po kamen.'], krivo:'To nemam njegovo. Razmisli još malo.'},
   ciljTekst:['Čekić? A, Tomislavov!','Mislio sam da mi ga je poklonio. Evo, i reci mu da se ne ljuti.'],
   hvala:['Moj čekić! Živ i zdrav.','E sad mogu popraviti taj krov. Hvala ti, susjede!'],
   poslije:['Krov je popravljen. Ne kaplje. Čudo.','Ako ti ikad zatreba nešto iz kutije — znaš gdje sam.']},
  {id:'pecivo', daje:'vesna', tip:'odnesi', cilj:'ruza', predmet:'vrećica peciva',
   nudi:['Kad već ideš po gradu — ponesi nešto za mene.','Starica Ruža iz Gornjeg grada više ne može do pekare.','Odnesi joj ovu vrećicu peciva. Ne naplaćujem joj, samo nemoj nikome reći.'],
   podsjetnik:'Odnesi vrećicu peciva starici Ruži (Gornji grad).',
   provjera:{pit:'Što mi to nosiš, dijete?', ok:'Pecivo iz pekare.', lose:['Lijek iz ambulante.','Pismo s pošte.'], krivo:'Ma nemoj… ja to nisam tražila. Reci mi opet.'},
   hvala:['Pecivo? Meni?','Vesna je anđeo, a i ti si, dijete. Bog te blagoslovio.'],
   poslije:['Ruža mi je poslala pozdrav. Preko tebe, valjda.','Ustajem u četiri. Svaki dan. Ali za nju bih i u tri.']},
  {id:'knjiga', daje:'bruno', tip:'donesi', cilj:'sara', predmet:'knjiga',
   nudi:['Netko tri tjedna kasni s vraćanjem knjige.','Učenica Sara. Pametna glava, ali knjige drži k’o taoce.','Nađi je kod škole i podsjeti je, molim te.'],
   podsjetnik:'Uzmi od Sare knjigu za knjižnicu (Školski kvart).',
   provjera:{pit:'Šalje te Bruno? Zbog čega?', ok:'Zbog knjige koju nisi vratila.', lose:['Zbog zadaće.','Zbog ispita.'], krivo:'Ma ne, to nema veze s knjižnicom. Probaj opet.'},
   ciljTekst:['Knjiga? Joj… znala sam da nešto zaboravljam.','Evo je. Reci Bruni da mi je bila jako dobra. I da mi čuva nastavak!'],
   hvala:['Vratila ju je! Čudo.','Hvala ti. Knjižnica bez vraćenih knjiga nije knjižnica nego skladište.'],
   poslije:['Knjiga je na polici. Tamo joj je i mjesto.','Sara je već pitala za nastavak. Naravno da jest.']},
  {id:'riba', daje:'ivo', tip:'donesi', cilj:'anka', predmet:'riba',
   nudi:['Za večeras mi treba svježa riba, a ne mogu ostaviti konobu.','Anka na rivi čuva za mene najbolju.','Skokni do nje, molim te. Reci da je za konobu.'],
   podsjetnik:'Donesi Ivi ribu od Anke s rive.',
   provjera:{pit:'Za koga je riba?', ok:'Za konobu, Ivo me šalje.', lose:['Za mene, večeram sam.','Za pekaru.'], krivo:'Čekaj, čekaj — za koga si rekao?'},
   ciljTekst:['Za konobu? Evo je, najljepša jutrošnja.','I reci Ivi da mi duguje kavu. Zna on zašto.'],
   hvala:['E, to je riba!','Večeras kuham, a ti si prvi gost. Grah ili riba, biraš.'],
   poslije:['Riba je bila izvrsna. Gosti su tražili još.','Anka i ja smo si opet dobri. Kava je plaćena.']},
  {id:'rajcice', daje:'jela', tip:'odnesi', cilj:'ivo', predmet:'sanduk rajčica',
   nudi:['Ivo iz konobe je naručio sanduk rajčica, a moj pomoćnik nije došao.','Jesi li jak? Izgleda da jesi.','Odnesi mu ovaj sanduk, tu je odmah pored.'],
   podsjetnik:'Odnesi sanduk rajčica Ivi u konobu (Dućani).',
   provjera:{pit:'Što je u sanduku?', ok:'Rajčice s tržnice.', lose:['Riba s rive.','Kruh iz pekare.'], krivo:'To nisam naručio. Pogledaj dobro što nosiš.'},
   hvala:['Rajčice! Točno na vrijeme.','Jela uvijek pošalje najbolje. Hvala i tebi na trudu.'],
   poslije:['Rajčice su otišle do zadnje. Sve u salatu.','Ivo je rekao da mu javim kad opet bude ovakvih.']},
  {id:'muzej', daje:'ema', tip:'razgovor', cilj:'filip',
   nudi:['Htjela bih razgledati muzej, ali čuvar tako brzo govori!','Možeš li ga pitati kada je ulaz besplatan?','Molim te. Meni je neugodno pitati dvaput.'],
   podsjetnik:'Pitaj čuvara Filipa u muzeju kad je ulaz besplatan, pa javi Emi.',
   provjera:{pit:'Izvolite? Imate pitanje?', ok:'Kada je ulaz u muzej besplatan?', lose:['Koliko košta ulaz?','Kada se muzej zatvara?'], krivo:'To nije ono što vas zanima, čini mi se. Pitajte drukčije.'},
   ciljTekst:['Kad je besplatno? Prve nedjelje u mjesecu.','Ali nemojte svi doći baš tada. Izlošci se umore od gledanja.'],
   hvala:['Prva nedjelja! Zapisala sam.','Puno ti hvala. Vidiš — i ja sad znam nešto na hrvatskom!'],
   poslije:['Prva nedjelja! Bila sam. Sve sam razgledala.','Sad znam reći „besplatno”. To mi je najdraža riječ.']},
  {id:'lopta', daje:'luka', tip:'donesi', cilj:'stipe', predmet:'lopta',
   nudi:['Domar Stipe mi je uzeo loptu jer je pala na krov dvorane.','Kaže: „Dođi po nju s roditeljima.” A ja nemam vremena čekati roditelje!','Molim te, zamoli ga ti. Tebe će poslušati.'],
   podsjetnik:'Uzmi Lukinu loptu od domara Stipe u dvorani (Sportski kvart).',
   provjera:{pit:'A ti si čiji? Što tražiš?', ok:'Lukinu loptu s krova.', lose:['Ključ od svlačionice.','Novu loptu.'], krivo:'To ti ne mogu dati. Reci mi točno po što si došao.'},
   ciljTekst:['Lopta? A, ona s krova.','Dobro, evo je. Ali reci malome: još jednom na krov — i lopta ide u mirovinu.'],
   hvala:['Moja lopta! Najbolji si!','Idem odmah igrati. Ali ne kod dvorane. Daleko od dvorane.'],
   poslije:['Lopta je kod mene. Igram daleko od dvorane. Jako daleko.','Stipe mi je čak mahnuo jučer. Mislim da mi je oprostio.']},
  {id:'trening', daje:'boris', tip:'razgovor', cilj:'dario',
   nudi:['Dario opet nije došao na trening!','Vratar bez treninga je vrata bez ključa.','Nađi ga kod stadiona i reci mu: sutra u sedam. Bez izgovora.'],
   podsjetnik:'Prenesi Dariju kod stadiona: trening je sutra u sedam.',
   provjera:{pit:'Šalje te trener? Što poručuje?', ok:'Trening je sutra u sedam.', lose:['Trening je otkazan.','Utakmica je u nedjelju.'], krivo:'Ma daj. To sigurno nije rekao. Sjeti se opet.'},
   ciljTekst:['Sutra u sedam?! Pa to je praktički noć.','Dobro, dobro… reci treneru da dolazim. I da ne viče.'],
   hvala:['Dolazi? Vjerovat ću kad ga vidim.','Hvala ti. Ako sutra ne dođe, šaljem tebe na gol.'],
   poslije:['Dario je došao. U sedam. Nisam mogao vjerovati.','Kad se momčad skupi, onda smo momčad.']},
  {id:'lijek', daje:'petra', tip:'odnesi', cilj:'starac', predmet:'lijek',
   nudi:['Jure s trga je jutros zaboravio svoj lijek u ambulanti.','Ništa strašno, ali bolje da ga ima uza se.','Ideš li prema trgu? Odnesi mu ga, molim te.'],
   podsjetnik:'Odnesi Juri na trg njegov lijek iz ambulante.',
   provjera:{pit:'Što je to, mladiću?', ok:'Vaš lijek iz ambulante.', lose:['Novine s trga.','Pismo za vas.'], krivo:'Ne, to nije to. Reci mi još jednom.'},
   hvala:['A, moj lijek! A ja mislio da sam ga izgubio.','Hvala ti, mladiću. I pozdravi doktoricu — ona je jedina koja me sluša.'],
   poslije:['Jure je uzeo lijek. I odmah počeo pričati o šezdesetima.','Ljudi zaborave lijek, ali ne zaborave priču.']},
  {id:'novine', daje:'novinarka', tip:'odnesi', cilj:'mate', predmet:'novine',
   nudi:['Ribar Mate svaki dan kupi novine, a danas nije došao.','Sigurno krpa mrežu pa je zaboravio.','Odnesi mu ih na rivu — plaćene su, samo ih uzmi.'],
   podsjetnik:'Odnesi Mati novine na rivu.',
   provjera:{pit:'Što mi nosiš?', ok:'Novine, već su plaćene.', lose:['Ribu s tržnice.','Kruh iz pekare.'], krivo:'Nije to. Ja to nisam naručio.'},
   hvala:['Novine! A ja skroz smetnuo s uma.','Vera je jedina koja pamti umjesto mene. Hvala ti, mali.'],
   poslije:['Mate je pročitao novine od korica do korica. Pa mi ih vratio.','Kaže da nema ništa novo. Kao i uvijek.']},
  {id:'paket', daje:'slaven', tip:'razgovor', cilj:'nada',
   nudi:['U autobusu mi je ostao nečiji paket. Stoji mi tu već dva dana.','Javi Nadi u poštu da ga dođe preuzeti, ona zna proceduru.','Ja ne smijem ostavljati vozilo. Pravila su pravila.'],
   podsjetnik:'Javi Nadi u pošti (Zanatska četvrt) za paket iz autobusa.',
   provjera:{pit:'Izvolite? Šalter jedan ili dva?', ok:'U autobusu je ostao paket.', lose:['Htio bih poslati pismo.','Tražim marku.'], krivo:'Dobro, ali to nije razlog vašeg dolaska, je li?'},
   ciljTekst:['Paket u autobusu? Opet!','Reci Slavenu da dolazim po njega u tri. I da ništa ne otvara!'],
   hvala:['U tri? Odlično.','Vidiš kako grad radi kad si ljudi pomažu? Hvala ti.'],
   poslije:['Nada je došla po paket. U tri, točno u tri.','Vozim dalje. Grad se sam neće provozati.']}

  ,{id:'zica', daje:'svirac', tip:'donesi', cilj:'tomislav', predmet:'žica za gitaru',
   nudi:['Pukla mi je žica nasred pjesme. Nasred najbolje pjesme!',
         'Susjed Tomislav ima kutiju sa svim i svačim. Sigurno ima i žicu.',
         'Skokni do njega u stambeno naselje, molim te. Bez žice sam samo čovjek s drvom.'],
   podsjetnik:'Uzmi od Tomislava žicu za gitaru (Stambeno naselje).',
   provjera:{pit:'Reci, susjede, po što si došao?', ok:'Po žicu za gitaru.',
     lose:['Po čekić.','Po ljestve.'], krivo:'To imam, ali to ti ne treba. Reci mi opet.'},
   ciljTekst:['Žica? Imam ja i to. Imam ja svega.',
              'Evo. I reci Reneu da mi jednu odsvira ispred kuće.'],
   hvala:['Žica! Sad sam opet cijel čovjek.','Prva pjesma ide Tomislavu. Druga tebi.'],
   poslije:['Sad kad imam žicu, mogu i one visoke tonove.','Danas sam zaradio dovoljno za ručak. Dobar dan.']}

  ,{id:'ples', daje:'starac', tip:'razgovor', cilj:'ruza',
   nudi:['Sjedni, mladiću. Imam jednu molbu, a nogu me izdaju.',
         'Gore u Gornjem gradu živi Ruža. Nekad smo plesali na ovom trgu.',
         'Pitaj je sjeća li se plesa u lipnju. Samo to. Ništa više.'],
   podsjetnik:'Pitaj staricu Ružu sjeća li se plesa u lipnju (Gornji grad).',
   provjera:{pit:'Reci, dijete, što te dovodi k meni?', ok:'Sjećate li se plesa u lipnju?',
     lose:['Treba li vam nešto iz dućana?','Kada zvoni zvono?'],
     krivo:'Ma nisi ti zbog toga došao. Reci mi pravo.'},
   ciljTekst:['Ples u lipnju…','Reci Juri da se sjećam. I da je gazio po nogama.',
              'I reci mu neka dođe gore. Stube nisu strme koliko on misli.'],
   hvala:['Sjeća se? Stvarno se sjeća?','Gazio sam je, istina. Ali smo plesali do zore.',
          'Hvala ti. Idem gore. Polako, ali idem.'],
   poslije:['Idem ja gore ovih dana. Kad malo zahladi.','Lipanj šezdeset i prve. Bio je to trg.']}

  ,{id:'adresa', daje:'dostavljac', tip:'odnesi', cilj:'nada', predmet:'paket bez adrese',
   nudi:['Ovaj paket me ubija. Adresa je razmrljana, ništa se ne vidi.',
         'Ja ne smijem ostavljati pakete gdje bilo, a moram dalje.',
         'Odnesi ga Nadi u poštu, ona zna što se radi s takvima. Hvala ti, spasio si me!'],
   podsjetnik:'Odnesi paket bez adrese Nadi u poštu (Zanatska četvrt).',
   provjera:{pit:'Izvolite? Šalje vas netko?', ok:'Paket je bez čitke adrese.',
     lose:['Htio bih kupiti marku.','Tražim paket iz autobusa.'],
     krivo:'To je druga stvar. Recite mi zašto ste zapravo došli.'},
   hvala:['Aha, opet jedan takav.','Otvorit ćemo ga po propisu i naći pošiljatelja. Uvijek se nađe.',
          'Recite dostavljaču da mi ubuduće takve donosi odmah.'],
   poslije:['Bez tebe bih ga vozio još tjedan dana.','Danas mi je ostalo još samo osam adresa. Osam!']}

  ,{id:'lektira', daje:'sara', tip:'donesi', cilj:'damir', predmet:'popis lektire',
   nudi:['Trebam popis lektire, a učitelj Damir ga ima samo na papiru.',
         'Ja mu se ne smijem javiti jer sam ono s knjigom… znaš već.',
         'Molim te, uzmi mi ga. U školi je, unutra.'],
   podsjetnik:'Uzmi popis lektire od učitelja Damira u školi.',
   provjera:{pit:'Uđi. Trebaš nešto?', ok:'Trebam popis lektire.',
     lose:['Trebam kredu.','Trebam ključ od učionice.'],
     krivo:'To ti neće pomoći. Razmisli još jednom.'},
   ciljTekst:['Popis lektire? Evo ga.',
              'Reci Sari da ove godine ima i jedna kratka. Bit će sretna.'],
   hvala:['Ima ih devet?! Devet!','Dobro… jedna je kratka. To je nešto. Hvala ti.'],
   poslije:['Pročitala sam već dvije. Onu kratku i još jednu.','Bruno kaže da čitam prebrzo. Ne postoji prebrzo.']}

  ,{id:'svijece', daje:'ruza', tip:'odnesi', cilj:'ante', predmet:'novac za svijeće',
   nudi:['Dijete, hoćeš li mi učiniti jednu uslugu?',
         'Ne mogu više niz one stube do crkve, a obećala sam svijeće.',
         'Odnesi ovo don Anti. Zna on za koga su.'],
   podsjetnik:'Odnesi don Anti novac za svijeće (crkva, Gornji grad).',
   provjera:{pit:'Izvoli, sinko. Nosiš li mi nešto?', ok:'Novac za svijeće, od Ruže.',
     lose:['Pismo od poštara.','Pecivo iz pekare.'],
     krivo:'Nije to. Pogledaj još jednom što ti je dala.'},
   hvala:['Ruža… svake godine isto, a nikad ne kaže za koga.',
          'Zapalit ću ih večeras. Reci joj da sam obećao.'],
   poslije:['Jesi li mu rekao? Dobro. Sad sam mirna.','Ove stube su nekad bile niže. Kunem ti se.']}

  ,{id:'klin', daje:'klesar', tip:'donesi', cilj:'stipe', predmet:'klin',
   nudi:['Domar Stipe mi je odnio klin da nešto podupre u dvorani.',
         'To je bilo u ožujku. Sad je kolovoz.',
         'Ako ideš tamo, traži mu ga. Neće se buniti. Puno.'],
   podsjetnik:'Uzmi klesarov klin od domara Stipe u dvorani (Sportski kvart).',
   provjera:{pit:'Reci, po što si došao?', ok:'Po Šimin klin.',
     lose:['Po loptu.','Po ključ od svlačionice.'],
     krivo:'To nije njegovo. Reci mi točno.'},
   ciljTekst:['Klin? A, klin.','Evo ti ga. I reci Šimi da mi je držao vrata pet mjeseci.',
              'Vrata su izdržala. Klin je izdržao. Svi smo izdržali.'],
   hvala:['Vidi ti njega, izdržao je!','Naravno da je izdržao. Ja sam ga tesao.'],
   poslije:['Klin je opet na svom mjestu. Red je red.','Kamen ne oprašta žurbu. Ni klin.']}

  ,{id:'sjemenke', daje:'vrtlar', tip:'odnesi', cilj:'sanja', predmet:'vrećica sjemenki',
   nudi:['Onaj pas je jučer raskopao pola gredice. Pola!',
         'Nisam ljut. Dobro, jesam, ali sam se smirio.',
         'Odnesi njegovoj gospođi ove sjemenke. Neka posadi svoje pa nek kopa doma.'],
   podsjetnik:'Odnesi Sanji vrećicu sjemenki (park).',
   provjera:{pit:'Dobar dan! Nosite li to nešto?', ok:'Sjemenke od vrtlara.',
     lose:['Lijek iz ambulante.','Novine s trga.'],
     krivo:'Hm, ne bih rekla. Pogledajte još jednom.'},
   hvala:['Sjemenke? Meni?','Znači nije ljut. Ili jest, ali pristojno.',
          'Runo, čuješ? Kopat ćeš doma. Hvala vam!'],
   poslije:['Gredica se oporavlja. Za sad.','Ruže treba zalijevati ujutro. Zapamti to.']}

  ,{id:'ogrebotina', daje:'sanja', tip:'razgovor', cilj:'petra',
   nudi:['Runo me jučer ogrebao dok smo se igrali. Nije ništa strašno.',
         'Ali ne znam treba li se to nečim namazati.',
         'Doktorica Petra šeta parkom svaki dan. Pitaj je umjesto mene, meni je neugodno.'],
   podsjetnik:'Pitaj liječnicu Petru treba li ogrebotinu nečim namazati (park).',
   provjera:{pit:'Dobar dan. Trebate nešto?', ok:'Treba li se ogrebotina nečim namazati?',
     lose:['Boli li vas što?','Kada radi ambulanta?'],
     krivo:'To me niste htjeli pitati. Pokušajte opet.'},
   ciljTekst:['Ogrebotina? Neka je opere vodom i sapunom.',
              'Ako pocrveni ili oteče — neka dođe u ambulantu. Inače ništa.'],
   hvala:['Voda i sapun? To je sve?','Eto, a ja se sinoć nisam usudila zaspati.',
          'Hvala vam. I Runu hvala što nije gore.'],
   poslije:['Zacijelilo je. Runo je oprošten.','Sutra idemo na plažu. On pliva bolje od mene.']}

  ,{id:'igla', daje:'mate', tip:'donesi', cilj:'anka', predmet:'igla za mrežu',
   nudi:['Mreža mi je puknula na tri mjesta, a igla je kod Anke.',
         'Posudila ju je u proljeće i od tada je moja mreža strpljiva.',
         'Traži joj je, molim te. Meni neće dati, znam je.'],
   podsjetnik:'Uzmi Matinu iglu za mrežu od Anke na rivi.',
   provjera:{pit:'Izvoli? Trebaš ribu?', ok:'Trebam Matinu iglu za mrežu.',
     lose:['Trebam kilogram ribe.','Trebam sanduk.'],
     krivo:'To ti mogu dati, ali nisi zato došao. Reci pravo.'},
   ciljTekst:['Igla? Pa ja sam mu je htjela vratiti.',
              'Evo, uzmi. I reci mu da mreža ne puca od igle nego od godina.'],
   hvala:['Vratila ju je! Bez svađe!','Sad mogu krpati do mraka. Hvala ti, mali.'],
   poslije:['Mreža je gotova. Sutra u pet idem.','More je jutros bilo glatko kao stol.']}

  ,{id:'ribasestra', daje:'anka', tip:'odnesi', cilj:'marija', predmet:'riba za sestru',
   nudi:['Sestra Marija iz ambulante mi je zimus pomogla kad nitko nije.',
         'Nikad ništa nije tražila. Ja ne znam drugačije zahvaliti nego ribom.',
         'Odnesi joj ovu. Najljepšu sam odvojila.'],
   podsjetnik:'Odnesi sestri Mariji ribu u ambulantu (Stambeno naselje).',
   provjera:{pit:'Dobar dan. Je li hitno?', ok:'Nije hitno, nosim vam ribu od Anke.',
     lose:['Boli me grlo.','Tražim doktoricu.'],
     krivo:'Dobro, ali čini mi se da ste zbog nečeg drugog došli.'},
   hvala:['Riba? Od Anke?','Rekla sam joj da ništa ne treba. Nikad ne posluša.',
          'Hvala vam. I recite joj da je opet posjetim. Ovaj put bez ribe.'],
   poslije:['Je li primila? Dobro. Sad je red.','Danas je bilo dobro jutro. Sve se prodalo.']}

  ,{id:'rjecnik', daje:'hans', tip:'razgovor', cilj:'bruno',
   nudi:['Ich… oprosti. Ja tražim knjigu. Za učenje. Hrvatski.',
         'U knjižnici sigurno ima, ali ja ne znam pitati. Riječi mi pobjegnu.',
         'Možeš li ti pitati knjižničara ima li rječnik za strance? Molim.'],
   podsjetnik:'Pitaj knjižničara Brunu ima li rječnik za strance (knjižnica, Trg).',
   provjera:{pit:'Dobar dan. Tražite nešto određeno?', ok:'Imate li rječnik za strance?',
     lose:['Imate li nešto za djecu?','Kada se knjižnica zatvara?'],
     krivo:'Imamo, ali mislim da niste zbog toga došli. Pitajte opet.'},
   ciljTekst:['Rječnik za strance? Imamo dva. Jedan je bolji.',
              'Recite mu neka dođe osobno. Neću ga ugristi, a i tako mora vježbati.'],
   hvala:['Dva rječnika! Zwei!','Ali kaže da moram doći sam? Oh.',
          'Dobro. Idem. Danke… hvala. Hvala!'],
   poslije:['Bio sam u knjižnici. Sam! I razumio sam pola.','Hrvatski je težak. Ali more je vrijedno toga.']}

  ,{id:'ulaznice', daje:'dario', tip:'odnesi', cilj:'kreso', predmet:'ulaznice',
   nudi:['Imam dvije ulaznice za nedjelju, a nemam kome.',
         'Krešo bi dao ruku za njih, samo je previše ponosan da traži.',
         'Odnesi mu ih. I nemoj reći da sam ja poslao.'],
   podsjetnik:'Odnesi Kreši ulaznice za utakmicu (Sportski kvart).',
   provjera:{pit:'Ej! Što ima?', ok:'Nosim ti ulaznice za nedjelju.',
     lose:['Tražim trenera.','Znaš li gdje je stadion?'],
     krivo:'Ma daj, to nije to. Reci opet.'},
   hvala:['Ulaznice?! Za nedjelju?!','Tko ti ih je dao? …Neću pitati. Neću pitati!',
          'Vidimo se na tribini. Ponesi šal!'],
   poslije:['Krešo mi je jutros donio kavu. Ništa nije rekao.','U nedjelju branim sve. Ovaj put stvarno sve.']}

  ,{id:'mjerenje', daje:'lana', tip:'razgovor', cilj:'boris',
   nudi:['Trebam nekoga da mi mjeri vrijeme u subotu.',
         'Trener Boris ima štopericu i oko, a ja imam noge.',
         'Pitaj ga hoće li doći u subotu ujutro. Ako kaže da ima trening — reci da mi je to trening.'],
   podsjetnik:'Pitaj trenera Borisa hoće li Lani mjeriti vrijeme u subotu (Sportski kvart).',
   provjera:{pit:'Da? Brzo, imam trening.', ok:'Hoćete li Lani mjeriti vrijeme u subotu?',
     lose:['Kada je utakmica?','Treba li vam pomoć?'],
     krivo:'Nije to. Brže, reci mi što treba.'},
   ciljTekst:['Lana? Naravno da ću doći.','Reci joj da dođe zagrijana. Neću čekati petnaest minuta.',
              'I neka ne kasni. Štoperica ne zna za izgovore.'],
   hvala:['Doći će? Znala sam!','Zagrijana, bez kašnjenja. Jasno.',
          'U subotu rušim svoj rekord. Zapamti taj dan.'],
   poslije:['Subota. Trinaest sekundi. Ili manje.','Start mi je i dalje spor. Radim na tome.']}

  ,{id:'kreda', daje:'damir', tip:'donesi', cilj:'kata', predmet:'kutija krede',
   nudi:['Ostao sam bez krede nasred sata. Nasred rečenice, zapravo.',
         'Nova kutija je u ormaru, a ključ ima Kata.',
         'Ona je negdje po školi. Nađi je, molim te — djeca čekaju.'],
   podsjetnik:'Uzmi kutiju krede od spremačice Kate (u školi).',
   provjera:{pit:'Pazi, oprano je! Trebaš nešto?', ok:'Trebam kutiju krede za učitelja.',
     lose:['Trebam popis lektire.','Tražim izlaz.'],
     krivo:'To nije kod mene. Reci mi opet, polako.'},
   ciljTekst:['Kreda? Naravno da je kod mene. Sve je kod mene.',
              'Evo. I reci mu da ne baca komadiće po podu. Ja to skupljam.'],
   hvala:['Kreda! Spasili ste sat.','I da ne bacam komadiće? Prenio si vjerno, vidim.',
          'Dobro. Neću bacati. Ovaj tjedan.'],
   poslije:['Sat je završen kako treba. Zahvaljujući tebi.','Znaš li sad kojeg je roda „more”? Srednjeg.']}

];
var QMAP_DAJE = {}, QMAP_CILJ = {};
QUESTOVI.forEach(function(q){ QMAP_DAJE[q.daje] = q; (QMAP_CILJ[q.cilj] = QMAP_CILJ[q.cilj] || []).push(q); });
var MEDIJ = 'mini games media/';
var T = 16, VID_W = 22, VID_H = 12;

/* naziv dijela grada prema položaju */
function zonaNa(x, y){
  if (y >= 50) return 'Plaža';
  if (y >= 47) return 'Riva';
  if (y >= 45) return 'Obalna cesta';
  if (y >= 32){
    if (x <= 20) return 'Stambeno naselje';
    if (x <= 46) return 'Park';
    if (x <= 66) return 'Zanatska četvrt';
    return 'Sportski kvart';
  }
  if (y >= 28) return 'Glavna ulica';
  if (y >= 17){
    if (x <= 20) return 'Školski kvart';
    if (x <= 46) return 'Trg';
    if (x <= 66) return 'Dućani';
    return 'Sportski kvart';
  }
  if (y >= 13) return 'Ulica stube';
  if (x <= 22) return 'Školski kvart';
  if (x <= 52) return 'Gornji grad';
  return 'Sjeverni kvart';
}

var C = document.getElementById('platno');
C.width = VID_W * T; C.height = VID_H * T;
var G = C.getContext('2d');
G.imageSmoothingEnabled = false;

var SHEET = {};
var ucitano = 0, treba = 2;
['R','U'].forEach(function(k, i){
  var im = new Image();
  im.onload = function(){ ucitano++; if (ucitano === treba) kreni(); };
  im.onerror = function(){ ucitano++; if (ucitano === treba) kreni(); };
  im.src = MEDIJ + (k === 'R' ? 'kenney-rogue.png' : 'kenney-urban.png');
  SHEET[k] = im;
});
/* roguelike sheet ima 1px razmak između pločica, urban nema */
var RAZMAK = { R: 1, U: 0 };

var S = {
  x: KARTA.pocetak.x, y: KARTA.pocetak.y, smjer: 'd',
  kam: {x:0, y:0}, korak: 0, poruka: null,
  gdje: 'grad', povratak: null,
  z: {}, met: {}, torba: [], novcici: 40, upoznati: {},
  tocnih: 0, greske: 0, blok: null
};
var KLJUC = 'croland-grad-v2';
function spremi(){
  try { localStorage.setItem(KLJUC, JSON.stringify({
    x:S.x, y:S.y, gdje:S.gdje, z:S.z, met:S.met, torba:S.torba,
    novcici:S.novcici, upoznati:S.upoznati,
    tocnih:S.tocnih, greske:S.greske })); } catch(e){}
}
(function ucitajSpremljeno(){
  try {
    var d = JSON.parse(localStorage.getItem(KLJUC) || 'null');
    if (!d) return;
    S.x = d.x; S.y = d.y; S.gdje = d.gdje && (d.gdje === 'grad' || UNUTRA[d.gdje]) ? d.gdje : 'grad';
    S.z = d.z || {}; S.met = d.met || {}; S.torba = d.torba || [];
    S.novcici = (typeof d.novcici === 'number') ? d.novcici : 40;
    S.upoznati = d.upoznati || {};
    S.tocnih = d.tocnih || 0; S.greske = d.greske || 0;
  } catch(e){}
})();
function soba(){ return S.gdje === 'grad' ? null : UNUTRA[S.gdje]; }
function sirina(){ var s = soba(); return s ? s.w : KARTA.w; }
function visina(){ var s = soba(); return s ? s.h : KARTA.h; }

function crtajPlocicu(ime, px, py){
  var a = ATLAS[ime]; if (!a) return;
  var im = SHEET[a.s]; if (!im || !im.complete || !im.naturalWidth) return;
  var g = RAZMAK[a.s];
  G.drawImage(im, a.c * (T + g), a.r * (T + g), a.w * T + (a.w - 1) * g, a.h * T + (a.h - 1) * g,
              px, py, a.w * T, a.h * T);
}

/* roguelike se mora crtati pločicu-po-pločicu zbog razmaka */
function crtajUnos(ime, px, py){
  var a = ATLAS[ime]; if (!a) return;
  var im = SHEET[a.s]; if (!im || !im.complete || !im.naturalWidth) return;
  var g = RAZMAK[a.s];
  for (var j = 0; j < a.h; j++){
    for (var i = 0; i < a.w; i++){
      G.drawImage(im, (a.c + i) * (T + g), (a.r + j) * (T + g), T, T,
                  px + i * T, py + j * T, T, T);
    }
  }
}

function stegni(v, a, b){ return v < a ? a : (v > b ? b : v); }
function ciljKamere(){
  return {
    x: stegni(S.x * T + T/2 - C.width/2,  0, Math.max(0, sirina() * T - C.width)),
    y: stegni(S.y * T + T/2 - C.height/2, 0, Math.max(0, visina() * T - C.height))
  };
}
var kamAnim = null;
function pratiKameru(odmah){
  var c = ciljKamere();
  if (odmah){ S.kam = c; if (kamAnim) cancelAnimationFrame(kamAnim); kamAnim = null; crtaj(); return; }
  if (kamAnim) return;
  kamAnim = requestAnimationFrame(function korakK(){
    var c = ciljKamere();
    S.kam.x += (c.x - S.kam.x) * 0.25;
    S.kam.y += (c.y - S.kam.y) * 0.25;
    if (Math.abs(c.x - S.kam.x) < 0.5 && Math.abs(c.y - S.kam.y) < 0.5){
      S.kam = c; kamAnim = null; crtaj(); return;
    }
    crtaj(); kamAnim = requestAnimationFrame(korakK);
  });
}

var LIK = { d: 'lik-0-0', l: 'lik-0-1', r: 'lik-0-1', u: 'lik-0-2' };

function crtaj(){
  var kx = Math.round(S.kam.x), ky = Math.round(S.kam.y);
  G.clearRect(0, 0, C.width, C.height);
  var sb = soba();
  var x0 = Math.max(0, Math.floor(kx / T)), x1 = Math.min(sirina(), Math.ceil((kx + C.width) / T) + 1);
  var y0 = Math.max(0, Math.floor(ky / T)), y1 = Math.min(visina(), Math.ceil((ky + C.height) / T) + 1);
  for (var j = y0; j < y1; j++){
    for (var i = x0; i < x1; i++){
      var ime = sb ? sb.teren[j][i] : KARTA.znakovi[KARTA.teren[j][i]];
      crtajUnos(ime, i * T - kx, j * T - ky);
    }
  }
  var popis = sb ? sb.objekti : KARTA.objekti;
  for (var n = 0; n < popis.length; n++){
    var o = popis[n];
    if (o.x < x0 - 4 || o.x > x1 + 4 || o.y < y0 - 8 || o.y > y1 + 4) continue;
    crtajUnos(o.ime, o.x * T - kx, o.y * T - ky);
  }
  if (!sb){
    /* imena zgrada — pločica iznad krova */
    G.textAlign = 'center'; G.textBaseline = 'middle';
    for (var t2 = 0; t2 < KARTA.natpisi.length; t2++){
      var na = KARTA.natpisi[t2];
      if (!na.z) continue;
      if (na.x < x0 - 3 || na.x > x1 + 3 || na.y < y0 - 1 || na.y > y1 + 1) continue;
      var cx = na.x * T - kx + T / 2, cy = na.y * T - ky + 5;
      G.font = 'bold 7px system-ui, sans-serif';
      var w2 = G.measureText(na.hr).width + 6;
      G.fillStyle = 'rgba(255,248,239,.92)';
      G.fillRect(cx - w2 / 2, cy - 5, w2, 10);
      G.strokeStyle = '#2B2118'; G.lineWidth = 1;
      G.strokeRect(cx - w2 / 2 + .5, cy - 4.5, w2 - 1, 9);
      G.fillStyle = '#2B2118';
      G.fillText(na.hr, cx, cy + .5);
    }
    for (var n2 = 0; n2 < KARTA.vrata.length; n2++){
      var vv = KARTA.vrata[n2];
      if (vv.x < x0 || vv.x > x1 || vv.y < y0 || vv.y > y1) continue;
      var px2 = vv.x * T - kx, py2 = vv.y * T - ky;
      G.fillStyle = '#4A3826';
      G.fillRect(px2 + 3, py2, T - 6, T - 3);
      G.fillStyle = '#2B2118';
      G.fillRect(px2 + 3, py2, T - 6, 2);
      G.fillStyle = '#F4B942';
      G.fillRect(px2 + T - 6, py2 + 7, 2, 2);
      G.fillStyle = '#8C8072';
      G.fillRect(px2 + 2, py2 + T - 3, T - 4, 3);
    }
  } else {
    var iz = sb.izlaz;
    var px3 = iz.x * T - kx, py3 = (iz.y - 1) * T - ky;
    G.fillStyle = '#C4553D';
    G.fillRect(px3 + 2, py3 + T - 6, T - 4, 6);
    G.fillStyle = '#8E3B2A';
    G.fillRect(px3 + 2, py3 + T - 6, T - 4, 1);
  }
  /* ljudi */
  for (var nn = 0; nn < NPC.length; nn++){
    var np = NPC[nn];
    if (np.gdje !== S.gdje) continue;
    if (np.x < x0 - 1 || np.x > x1 || np.y < y0 - 1 || np.y > y1) continue;
    crtajUnos(np.lik, np.x * T - kx, np.y * T - ky);
  }
  /* igrač */
  var sl = LIK[S.smjer] || LIK.d;
  var px = S.x * T - kx, py = S.y * T - ky;
  G.save();
  if (S.smjer === 'l'){ G.translate(px + T, py); G.scale(-1, 1); crtajUnos(sl, 0, 0); }
  else { crtajUnos(sl, px, py); }
  G.restore();
}

function prohodnoTeren(x, y, gdje){
  if (x < 0 || y < 0) return false;
  var sb = gdje === 'grad' ? null : UNUTRA[gdje];
  var w = sb ? sb.w : KARTA.w, h = sb ? sb.h : KARTA.h;
  if (x >= w || y >= h) return false;
  return (sb ? sb.prolaz[y][x] : KARTA.prolaz[y][x]) === '1';
}
function npcNa(x, y, gdje){
  for (var i = 0; i < NPC.length; i++){
    var n = NPC[i];
    if (n.gdje === gdje && n.x === x && n.y === y) return n;
  }
  return null;
}
function prohodno(x, y){
  if (npcNa(x, y, S.gdje)) return false;
  return prohodnoTeren(x, y, S.gdje);
}
/* vanjski NPC-evi na zauzetom polju se pomaknu na najbliže slobodno */
(function namjesti(){
  NPC.forEach(function(n){
    if (n.gdje !== 'grad') return;
    if (prohodnoTeren(n.x, n.y, 'grad')) return;
    for (var r = 1; r < 8; r++){
      for (var dy = -r; dy <= r; dy++){
        for (var dx = -r; dx <= r; dx++){
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
          if (prohodnoTeren(n.x + dx, n.y + dy, 'grad')){
            n.x += dx; n.y += dy; return;
          }
        }
      }
    }
  });
})();
function natpisNa(x, y){
  for (var i = 0; i < KARTA.natpisi.length; i++){
    var n = KARTA.natpisi[i];
    if (Math.abs(n.x - x) <= 1 && Math.abs(n.y - y) <= 1) return n;
  }
  return null;
}
function vrataNa(x, y){
  for (var i = 0; i < KARTA.vrata.length; i++){
    var v = KARTA.vrata[i];
    if (v.x === x && v.y === y) return v;
  }
  return null;
}

var RED = null;   /* {stavke:[{tko,txt}], i, kraj} */
function poruka(hr, en){
  prikaziRed([{tko:'', txt:hr}], null);
}
function prikaziRed(stavke, kraj){
  RED = {stavke: stavke, i: 0, kraj: kraj};
  crtajOblacic();
}
function crtajOblacic(){
  zatvoriPoruku();
  if (!RED) return;
  var st = RED.stavke[RED.i];
  var d = document.createElement('div');
  d.className = 'oblacic';
  var html = (st.tko ? '<div class="tko">' + st.tko + '</div>' : '') +
             '<div class="hr">' + st.txt + '</div>';
  if (st.izbori){
    html += '<div class="izbori">' + st.izbori.map(function(o, i){
      return '<button data-i="' + i + '">' + o.txt + '</button>';
    }).join('') + '</div>';
  } else {
    var jos = RED.stavke.length - RED.i - 1;
    html += '<div class="dalje">' + (jos > 0 ? '▸ još ' + jos : '▸') + '</div>';
  }
  d.innerHTML = html;
  if (st.izbori){
    var gumbi = d.querySelectorAll('.izbori button');
    for (var g = 0; g < gumbi.length; g++){
      (function(b){
        b.onclick = function(ev){ ev.stopPropagation(); odgovori(parseInt(b.getAttribute('data-i'), 10)); };
      })(gumbi[g]);
    }
  } else {
    d.onclick = dalje;
  }
  document.body.appendChild(d);
  S.poruka = d;
}
function odgovori(i){
  if (!RED) return;
  var st = RED.stavke[RED.i];
  if (!st.izbori) return;
  if (st.izbori[i].ok){
    if (!st.pogrijesio) S.tocnih++;
    S.novcici += 1; osvjeziNov();
    delete st.izbori;                 /* pitanje je riješeno */
    dalje();
    return;
  }
  S.greske++; st.pogrijesio = true;
  var vrati = RED;
  RED = {stavke: [{tko: st.tko, txt: st.krivo}], i: 0,
         kraj: function(){ RED = vrati; crtajOblacic(); }};
  crtajOblacic();
}
function mixIzbori(pr){
  var a = [{txt: pr.ok, ok: true}];
  pr.lose.forEach(function(t){ a.push({txt: t, ok: false}); });
  for (var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function dalje(){
  if (!RED){ zatvoriPoruku(); return; }
  if (RED.stavke[RED.i] && RED.stavke[RED.i].izbori) return;   /* čeka izbor */
  RED.i++;
  if (RED.i < RED.stavke.length){ crtajOblacic(); return; }
  var k = RED.kraj; RED = null; zatvoriPoruku();
  if (k) k();
}
function zatvoriPoruku(){ if (S.poruka){ S.poruka.remove(); S.poruka = null; } }
function javi(tekst){
  var z = document.createElement('div');
  z.className = 'znacka'; z.textContent = tekst;
  document.body.appendChild(z);
  requestAnimationFrame(function(){ z.classList.add('vidi'); });
  setTimeout(function(){ z.classList.remove('vidi'); setTimeout(function(){ z.remove(); }, 300); }, 2200);
}
function osvjeziNov(){ document.getElementById('zNov').textContent = S.novcici; }

/* ---------- razgovor s čovjekom ----------
   Pravilo: jedan posao po prilasku. Kad nešto obaviš s nekim, taj se
   "zaključa" dok se ne odmakneš — da se zadaci ne lančaju u istom dahu. */
function pitanjeStavka(n, q){
  return {tko: n.ime, txt: q.provjera.pit, izbori: mixIzbori(q.provjera), krivo: q.provjera.krivo};
}
function zavrsi(q, poruka){
  S.z[q.id] = 'g'; S.novcici += 5;
  javi(poruka || 'Zadatak riješen! 🪙 +5');
  osvjeziNov(); spremi(); nagovijesti();
}

function govori(n){
  var red = [];
  var prvi = !S.upoznati[n.id];
  S.upoznati[n.id] = 1;

  /* zaključan nakon obavljenog posla — samo usputni razgovor */
  if (S.blok === n.id){
    var mojB = QMAP_DAJE[n.id];
    var izvorB = (mojB && S.z[mojB.id] === 'g' && mojB.poslije) ? mojB.poslije : n.prica;
    red.push({tko:n.ime, txt: izvorB[Math.floor(Math.random() * izvorB.length)]});
    prikaziRed(red, null);
    return;
  }

  /* 1) on je cilj zadatka koji nosiš — to ima prednost */
  var ciljni = (QMAP_CILJ[n.id] || []).filter(function(q){ return S.z[q.id] === 'a'; });
  for (var i = 0; i < ciljni.length; i++){
    var q = ciljni[i];

    if (q.tip === 'odnesi' && S.torba.indexOf(q.predmet) >= 0){
      if (prvi) red.push({tko:n.ime, txt:n.poz});
      red.push(pitanjeStavka(n, q));
      q.hvala.forEach(function(t){ red.push({tko:n.ime, txt:t}); });
      prikaziRed(red, (function(q){ return function(){
        S.torba.splice(S.torba.indexOf(q.predmet), 1);
        S.blok = n.id; zavrsi(q);
      }; })(q));
      return;
    }
    if (q.tip === 'donesi' && !S.met[q.id]){
      if (prvi) red.push({tko:n.ime, txt:n.poz});
      red.push(pitanjeStavka(n, q));
      q.ciljTekst.forEach(function(t){ red.push({tko:n.ime, txt:t}); });
      prikaziRed(red, (function(q){ return function(){
        S.met[q.id] = 1; S.torba.push(q.predmet); S.blok = n.id;
        javi('Dobio si: ' + q.predmet); spremi(); nagovijesti();
      }; })(q));
      return;
    }
    if (q.tip === 'razgovor' && !S.met[q.id]){
      if (prvi) red.push({tko:n.ime, txt:n.poz});
      red.push(pitanjeStavka(n, q));
      q.ciljTekst.forEach(function(t){ red.push({tko:n.ime, txt:t}); });
      prikaziRed(red, (function(q){ return function(){
        S.met[q.id] = 1; S.blok = n.id;
        javi('Obavljeno — javi se natrag'); spremi(); nagovijesti();
      }; })(q));
      return;
    }
  }

  /* 2) njegov vlastiti zadatak */
  var moj = QMAP_DAJE[n.id];
  if (moj){
    var st = S.z[moj.id];

    if (st === 'a'){
      var nosim = (moj.tip !== 'razgovor') && S.torba.indexOf(moj.predmet) >= 0;
      var obavio = (moj.tip === 'razgovor') && S.met[moj.id];
      if (nosim || obavio){
        moj.hvala.forEach(function(t){ red.push({tko:n.ime, txt:t}); });
        prikaziRed(red, (function(q){ return function(){
          if (q.tip !== 'razgovor') S.torba.splice(S.torba.indexOf(q.predmet), 1);
          S.blok = n.id; zavrsi(q);
        }; })(moj));
        return;
      }
      red.push({tko:n.ime, txt: moj.podsjetnik});
      prikaziRed(red, null);
      return;
    }

    if (!st){
      if (prvi) red.push({tko:n.ime, txt:n.poz});
      moj.nudi.forEach(function(t){ red.push({tko:n.ime, txt:t}); });
      prikaziRed(red, (function(q){ return function(){
        S.z[q.id] = 'a'; S.blok = n.id;
        if (q.tip === 'odnesi'){ S.torba.push(q.predmet); javi('Novi zadatak · dobio si: ' + q.predmet); }
        else javi('Novi zadatak!');
        spremi(); nagovijesti();
      }; })(moj));
      return;
    }
  }

  /* 3) obični razgovor — nakon riješenog zadatka govore drukčije */
  var izvor = n.prica;
  if (moj && S.z[moj.id] === 'g' && moj.poslije) izvor = moj.poslije.concat(n.prica);
  red.push({tko:n.ime, txt: prvi ? n.poz : izvor[Math.floor(Math.random() * izvor.length)]});
  prikaziRed(red, function(){ spremi(); });
}

/* ---------- dnevnik ---------- */
function dnevnik(){
  var aktivni = QUESTOVI.filter(function(q){ return S.z[q.id] === 'a'; });
  var gotovi = QUESTOVI.filter(function(q){ return S.z[q.id] === 'g'; }).length;
  var html = '<div class="tko">Dnevnik zadataka · riješeno ' + gotovi + '/' + QUESTOVI.length + '</div>';
  if (!aktivni.length){
    html += '<div class="hr">Nemaš aktivnih zadataka. Razgovaraj s ljudima — većina nešto treba.</div>';
  } else {
    html += '<div class="hr">U tijeku:</div><ul>' +
      aktivni.map(function(q){
        var extra = (q.tip !== 'razgovor' && S.torba.indexOf(q.predmet) >= 0) ? ' <b>(imaš: ' + q.predmet + ')</b>'
                  : (S.met[q.id] ? ' <b>(obavljeno — javi se natrag)</b>' : '');
        return '<li>' + q.podsjetnik + extra + '</li>';
      }).join('') + '</ul>';
  }
  if (S.torba.length) html += '<div class="hr" style="margin-top:6px">Nosiš: ' + S.torba.join(', ') + '</div>';
  var pokusaja = S.tocnih + S.greske;
  html += '<div class="en" style="margin-top:8px">Odgovori: ' + S.tocnih + ' iz prve' +
          (S.greske ? ' · promašaja: ' + S.greske : '') +
          (pokusaja ? ' · točnost ' + Math.round(100 * S.tocnih / Math.max(1, S.tocnih + S.greske)) + '%' : '') +
          '</div>';
  prikaziRed([{tko:'', txt:''}], null);
  S.poruka.innerHTML = html + '<div class="dalje">▸ zatvori</div>';
  S.poruka.onclick = dalje;
}
document.getElementById('gDnevnik').onclick = function(){ if (RED){ dalje(); } dnevnik(); };

function pomak(dx, dy, smjer){
  if (S.poruka){ zatvoriPoruku(); return; }
  S.smjer = smjer;
  var nx = S.x + dx, ny = S.y + dy;
  if (!prohodno(nx, ny)){ crtaj(); nagovijesti(); return; }
  S.x = nx; S.y = ny; S.korak++;
  if (S.blok && !susjedniNpc()) S.blok = null;   /* odmaknuo si se — razgovor je nov */
  if (S.korak % 12 === 0) spremi();
  var sb = soba();
  if (sb && S.y >= sb.izlaz.y && S.x === sb.izlaz.x){ izadi(); return; }
  if (!sb){
    var v = vrataNa(S.x, S.y);
    if (v){ udi(v.kamo, v.ime); return; }
  }
  pratiKameru(); nagovijesti();
}

function osvjeziZonu(){
  var z = document.getElementById('zZona');
  var sb = soba();
  z.textContent = sb ? sb.naslov : zonaNa(S.x, S.y);
}
function nagovijesti(){
  osvjeziZonu();
  var t = document.getElementById('traka');
  var covjek = susjedniNpc();
  if (covjek){
    var oznaka = '';
    var mojQ = QMAP_DAJE[covjek.id];
    var ciljQ = (QMAP_CILJ[covjek.id] || []).some(function(q){ return S.z[q.id] === 'a'; });
    if (ciljQ) oznaka = ' ⭐';
    else if (mojQ && !S.z[mojQ.id]) oznaka = ' ❗';
    else if (mojQ && S.z[mojQ.id] === 'a') oznaka = ' …';
    t.innerHTML = '<b>' + covjek.ime + oznaka + '</b> — pritisni ✋ za razgovor';
    return;
  }
  if (S.gdje !== 'grad'){
    var sb = soba();
    t.innerHTML = (S.x === sb.izlaz.x && S.y >= sb.izlaz.y - 1)
      ? '<b>Izlaz</b> — korak prema dolje vodi van'
      : 'Unutra si: <b>' + sb.naslov + '</b>. Izlaz je otirač na dnu.';
    return;
  }
  var v = vrataNa(S.x, S.y - 1);
  var n = natpisNa(S.x, S.y);
  if (v) t.innerHTML = '<b>' + v.ime + '</b> — korak gore vodi unutra';
  else if (n) t.innerHTML = 'Natpis: <b>' + n.hr + '</b> — pritisni ✋ za prijevod';
  else t.textContent = 'Strelice ili WASD za kretanje. Razmaknica čita natpise i otvara vrata.';
}

function udi(id, imeMjesta){
  var sb = UNUTRA[id];
  if (!sb){ poruka('Vrata su zaključana.', ''); return; }
  S.povratak = { x: S.x, y: S.y };
  S.gdje = id; S.x = sb.ulaz.x; S.y = sb.ulaz.y; S.smjer = 'u';
  document.querySelector('header .ime').textContent = sb.naslov;
  pratiKameru(true); nagovijesti();
}
function izadi(){
  if (S.gdje === 'grad') return;
  S.gdje = 'grad';
  if (S.povratak){ S.x = S.povratak.x; S.y = S.povratak.y + 1; }
  S.smjer = 'd';
  document.querySelector('header .ime').textContent = 'Grad';
  pratiKameru(true); nagovijesti();
}

function susjedniNpc(){
  var okolo = [[0,-1],[0,1],[-1,0],[1,0]];
  for (var i = 0; i < okolo.length; i++){
    var n = npcNa(S.x + okolo[i][0], S.y + okolo[i][1], S.gdje);
    if (n) return n;
  }
  return null;
}
function akcija(){
  if (S.poruka){ dalje(); return; }
  var covjek = susjedniNpc();
  if (covjek){ govori(covjek); return; }
  if (S.gdje !== 'grad'){
    var sb = soba();
    if (S.x === sb.izlaz.x && S.y >= sb.izlaz.y - 1){ izadi(); return; }
    poruka('Ovdje nema nikoga.', '');
    return;
  }
  var v = vrataNa(S.x, S.y) || vrataNa(S.x, S.y - 1);
  if (v){ udi(v.kamo, v.ime); return; }
  var n = natpisNa(S.x, S.y);
  if (n){ poruka(n.hr, n.en); return; }
  poruka('Ovdje nema ničega.', '');
}

var TIPKE = {
  ArrowUp:['u',0,-1], ArrowDown:['d',0,1], ArrowLeft:['l',-1,0], ArrowRight:['r',1,0],
  w:['u',0,-1], s:['d',0,1], a:['l',-1,0], d:['r',1,0],
  W:['u',0,-1], S:['d',0,1], A:['l',-1,0], D:['r',1,0]
};
document.addEventListener('keydown', function(e){
  if (e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); akcija(); return; }
  if (e.key === 'Escape'){ RED = null; zatvoriPoruku(); return; }
  var m = TIPKE[e.key];
  if (m){ e.preventDefault(); pomak(m[1], m[2], m[0]); }
});
document.querySelector('.dpad').addEventListener('click', function(e){
  var b = e.target.closest('button'); if (!b) return;
  var s = b.dataset.s;
  if (s === 'x'){ akcija(); return; }
  var m = { u:['u',0,-1], d:['d',0,1], l:['l',-1,0], r:['r',1,0] }[s];
  pomak(m[1], m[2], m[0]);
});

/* platno se skalira na cijeli broj — pikseli ostaju oštri */
function slozi(){
  var omot = document.querySelector('.ploha');
  var dostupnoW = omot.clientWidth - 22;
  var dostupnoH = window.innerHeight - 250;          // zaglavlje, traka i tipke
  var k = Math.min(dostupnoW / C.width, dostupnoH / C.height);
  k = k >= 1 ? Math.floor(k) : Math.max(0.5, Math.round(k * 20) / 20);
  C.style.width = Math.round(C.width * k) + 'px';
  C.style.height = Math.round(C.height * k) + 'px';
}
window.addEventListener('resize', slozi);

function kreni(){
  slozi();
  osvjeziNov();
  osvjeziZonu();
  if (S.gdje !== 'grad') document.querySelector('header .ime').textContent = UNUTRA[S.gdje].naslov;
  pratiKameru(true);
  nagovijesti();
  var im = SHEET.R;
  if (!im.naturalWidth){
    document.getElementById('traka').innerHTML =
      '<b>Nema sličica.</b> Datoteke <code>kenney-rogue.png</code> i <code>kenney-urban.png</code> ' +
      'moraju biti u mapi <code>mini games media/</code>.';
  }
}
</script>
</body></html>
"""

html = (HTML.replace("__KARTA__", json.dumps(karta, ensure_ascii=False))
            .replace("__ATLAS__", json.dumps(atlas, ensure_ascii=False))
            .replace("__UNUTRA__", json.dumps(unutra, ensure_ascii=False)))
io.open(os.path.join(d, "01-grad-v2.html"), "w", encoding="utf-8").write(html)
print("01-grad-v2.html:", len(html), "znakova")
