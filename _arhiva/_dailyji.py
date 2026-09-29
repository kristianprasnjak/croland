# -*- coding: utf-8 -*-
# Generator dnevnih izazova (27.09.2026.): iz podataka niže piše daily/<datum>-<id>.html,
# pretvara sliku u daily/slike/<id>.webp i ispisuje zapise za DAILY_SLIKE u index.html.
import json, os, subprocess, datetime, shutil

A = {  # prihvaćeni odgovori (motor sam skida kvačice i velika slova)
 'lampa':['lampa','lampe','lampu','svjetiljka','svjetiljku','stolna lampa','podna lampa','ulična lampa','lampion'],
 'knjiga':['knjiga','knjige','knjigu','knjizi','bilježnica'],
 'olovka':['olovka','olovke','olovku','kemijska'],
 'salica':['šalica','šalice','šalicu','šalici','kava','kave','kavu','čaj','čaja','šalica kave','šalica čaja','čaša'],
 'mobitel':['mobitel','mobitela','telefon','telefona','mobilni','smartphone'],
 'prozor':['prozor','prozora','prozori','prozoru'],
 'sunce':['sunce','sunca','suncu'],
 'stol':['stol','stola','stolu','stolić'],
 'stolica':['stolica','stolice','stolicu','stolici','fotelja','fotelju','naslonjač','sjedalo'],
 'cvijece':['cvijeće','cvijeća','cvijet','cvjetovi','buket','biljka','teglica','tegla'],
 'macka':['mačka','mačke','mačku','mačak','maca','mace'],
 'kiosk':['kiosk','kioska','kiosku','trafika','štand'],
 'pas':['pas','psa','psi','pseto','psić','kuca','kuja'],
 'bicikl':['bicikl','bicikla','biciklu','biciklom'],
 'torba':['torba','torbe','torbu','torbi','torbica','ruksak','bisage','košara'],
 'semafor':['semafor','semafora','semaforu'],
 'autobus':['autobus','autobusa','bus','busa'],
 'sat':['sat','sata','satu','zidni sat'],
 'televizor':['televizor','televizora','tv','televizija','ekran','ekrana'],
 'casopis':['časopis','časopisa','novine','novina','magazin','revija'],
 'kruh':['kruh','kruha','hljeb','hljeba','štruca','tost','prepečenac'],
 'sir':['sir','sira','komad sira'],
 'jabuka':['jabuka','jabuke','jabuku'],
 'boca':['boca','boce','bocu','flaša','flašu','boca soka','boca vina'],
 'lopta':['lopta','lopte','loptu','lopti','nogometna lopta'],
 'torta':['torta','torte','tortu','torti','kolač','kolača'],
 'svijeca':['svijeća','svijeće','svijeću','svjećica','svjećice'],
 'poklon':['poklon','poklona','dar','dara','paket','kutija'],
 'cestitka':['čestitka','čestitke','čestitku','kartica','pismo','koverta','kuverta'],
 'casa':['čaša','čaše','čašu','čaši','čaša soka','čaša vode'],
 'ptica':['ptica','ptice','pticu','galeb','galeba'],
 'ribar':['ribar','ribara','čovjek','čovjeka','djed','djeda','muškarac','ribič','ribiča'],
 'brod':['brod','broda','brodu','čamac','čamca','barka','barku','brodić'],
 'riba':['riba','ribe','ribu','ribi'],
 'more':['more','mora','moru','voda','vode','jezero','jezera'],
 'kofer':['kofer','kofera','koferi','koferu','putna torba'],
 'majica':['majica','majice','majicu','majca'],
 'sesir':['šešir','šešira','kapa','kapu','slamnati šešir','slamnjak'],
 'cipele':['cipela','cipele','cipelu','tenisice','tenisica','patike'],
 'rucnik':['ručnik','ručnika','ručniku','peškir','deka'],
 'kaput':['kaput','kaputa','jakna','jaknu','mantil','sako'],
 'gol':['gol','gola','golovi','mreža'],
 'dres':['dres','dresa','majica','majicu'],
 'radio':['radio','radija','radiju','radio aparat'],
 'gitara':['gitara','gitare','gitaru'],
 'spomenik':['spomenik','spomenika','kip','kipa','statua'],
 'golub':['golub','goluba','golubovi','ptica','pticu'],
 'turist':['turist','turista','turistkinja','turisti','čovjek','dečko','muškarac','putnik'],
 'sladoled':['sladoled','sladoleda','kornet','kugla sladoleda'],
 'tanjur':['tanjur','tanjura','tanjuru','tanjir'],
 'zlica':['žlica','žlice','žlicu','kašika','žličica'],
 'vilica':['vilica','vilice','vilicu','viljuška'],
 'noz':['nož','noža','noževi'],
 'salveta':['salveta','salvete','salvetu','ubrus','ubrusa'],
 'planina':['planina','planine','planinu','planini','brdo','brda','vrh','gora'],
 'sal':['šal','šala','marama','maramu'],
 'stolic':['stolić','stolića','stol','stola','stolica','stolicu','klupica','tabure','hoklica'],
 'vrata':['vrata','vratima'],
 'postar':['poštar','poštara','dostavljač','čovjek'],
 'pismo':['pismo','pisma','omotnica','koverta','kuverta'],
 'kutija':['kutija','kutije','kutiju','paket','paketa','karton'],
 'taksi':['taksi','taksija','auto','automobil','taxi'],
 'vozac':['vozač','vozača','taksist','taksista','čovjek','muškarac'],
 'most':['most','mosta','mostu'],
 'zgrada':['zgrada','zgrade','zgradu','kuća','kuće','hotel'],
 'pilot':['pilot','pilota','kapetan'],
 'avion':['avion','aviona','zrakoplov','zrakoplova'],
 'ekran':['ekran','ekrana','zaslon','monitor','televizor','tv'],
 'karta':['karta','karte','kartu','karti','ulaznica','papir','cedulja','etiketa'],
 'auto':['auto','auta','automobil','automobila','kola'],
 'jastuk':['jastuk','jastuka','jastuci'],
 'vlak':['vlak','vlaka','vlaku','voz','vagon'],
 'jaje':['jaje','jaja','jajeta','jaje na oko','jaja na oko'],
 'vaza':['vaza','vaze','vazu','staklenka','boca','bocu','teglica'],
}

S = [
 dict(id='radni-stol', br='011', ime='Radni stol', stil='a desk by the window', emo='📚',
  p=[('lampa',13.5,23.5,17,47.5),('knjiga',22.5,63.5,27.5,24),('olovka',43,78,13.5,9.5),('salica',58.5,58,10.5,17.5),('mobitel',65.5,73.5,17,16),('prozor',54.5,0,37,51.5)],
  r=[("Luka sjedi za stolom i čita {knjiga|knjigu} pod {lampa|lampom}.","Luka sits at the desk and reads a book under the lamp."),
     ("{olovka|Olovka} je na stolu, ali Luka ne piše.","The pencil is on the desk, but Luka isn't writing."),
     ("Čaj u {salica|šalici} je hladan jer je {mobitel|mobitel} opet zvonio.","The tea in the mug is cold because the phone rang again."),
     ("Kroz {prozor|prozor} vidi vrt i misli na vikend.","Through the window he sees the garden and thinks about the weekend.")]),
 dict(id='balkon', br='014', ime='Balkon', stil='a morning on the balcony', emo='🌿',
  p=[('sunce',59,11,7,12),('salica',65.5,40.5,7,8.5),('stol',51.5,43,25,44.5),('stolica',70.5,37.5,19.5,48),('cvijece',45.5,61,12.5,28),('macka',78,80,11.5,12)],
  r=[("Baka svako jutro pije kavu na balkonu, na {sunce|suncu}.","Every morning Grandma drinks coffee on the balcony, in the sun."),
     ("{salica|Šalica} stoji na {stol|stolu}, a baka sjedi na {stolica|stolici}.","The cup stands on the table, and Grandma sits on the chair."),
     ("{cvijece|Cvijeće} u teglici treba vodu.","The flowers in the pot need water."),
     ("{macka|Mačka} spava ispod {stolica|stolice} i sanja ribu.","The cat sleeps under the chair and dreams about fish.")]),
 dict(id='stanica', br='019', ime='Stanica', stil='at the bus stop', emo='🚌',
  p=[('kiosk',17,25,27.5,45.5),('pas',43,55.5,7,16),('bicikl',54.5,49.5,14.5,24),('torba',56,50.5,5,9),('semafor',62.5,14.5,5,35.5),('autobus',72.5,15.5,27.5,33)],
  r=[("Ana čeka {autobus|autobus} pored {kiosk|kioska}.","Ana is waiting for the bus next to the kiosk."),
     ("Njezin {bicikl|bicikl} stoji kod semafora, s {torba|torbom} na volanu.","Her bicycle stands by the traffic light, with a bag on the handlebars."),
     ("{pas|Pas} sjedi i gleda ulicu — i on želi ići u grad.","The dog sits and watches the street — he wants to go to town too."),
     ("Na {semafor|semaforu} je crveno, pa autobus kasni.","The light is red, so the bus is late.")]),
 dict(id='dnevni-boravak', br='021', ime='Dnevni boravak', stil='a quiet living room', emo='🛋️',
  p=[('prozor',6,7,14,45.5),('lampa',26,19,11,63),('sat',76,11,10.5,18.5),('televizor',71.5,42.5,19.5,27.5),('pas',43,70.5,16,15.5),('casopis',55.5,83.5,15.5,12.5)],
  r=[("Popodne sunce ulazi kroz {prozor|prozor}.","In the afternoon the sun comes in through the window."),
     ("{pas|Pas} spava na podu pored {casopis|časopisa}.","The dog is sleeping on the floor next to the magazine."),
     ("{televizor|Televizor} je ugašen, a {lampa|lampa} ne svijetli.","The TV is off, and the lamp isn't on."),
     ("Samo {sat|sat} na zidu radi: tik-tak, tik-tak.","Only the clock on the wall is working: tick-tock, tick-tock.")]),
 dict(id='piknik', br='020', ime='Piknik', stil='a picnic in the park', emo='🧺',
  p=[('kruh',19,38,18,18),('sir',40.5,34.5,9.5,15),('jabuka',35.5,54,8,15.5),('boca',53.5,20.5,6.5,36),('lopta',56,61.5,9,16.5),('pas',65.5,30,23.5,33.5)],
  r=[("Obitelj ima piknik u parku: {kruh|kruh}, {sir|sir} i jednu {jabuka|jabuku}.","The family has a picnic in the park: bread, cheese and one apple."),
     ("{boca|Boca} soka stoji na deki.","A bottle of juice stands on the blanket."),
     ("{pas|Pas} ne gleda kruh, nego {lopta|loptu}.","The dog isn't looking at the bread, but at the ball."),
     ("Tko će prvi baciti loptu?","Who will throw the ball first?")]),
 dict(id='rodendan', br='005', ime='Rođendan', stil='a birthday table', emo='🎂',
  p=[('torta',29,17,17,30),('svijeca',35.5,16.5,4,13.5),('poklon',50.5,21,11,21),('cvijece',62,10.5,14.5,40),('cestitka',28.5,52,24,27),('casa',60,54,7.5,19)],
  r=[("Danas je Markov rođendan i na stolu je {torta|torta} s jednom {svijeca|svijećom}.","Today is Marko's birthday, and on the table there's a cake with one candle."),
     ("Pored torte je {poklon|poklon}, a u vazi {cvijece|cvijeće}.","Next to the cake there's a present, and flowers in a vase."),
     ("Baka piše {cestitka|čestitku}, a Marko pije sok iz {casa|čaše}.","Grandma writes a card, and Marko drinks juice from a glass.")]),
 dict(id='ribolov', br='010', ime='Ribolov', stil='fishing on a calm sea', emo='🎣',
  p=[('sunce',44.5,10.5,11,19.5),('ptica',63,22.5,13,13.5),('ribar',28,45.5,8.5,17),('brod',16,53.5,36,18.5),('riba',69,60.5,7.5,9.5),('more',0,72,100,28)],
  r=[("Djed je u malom {brod|brodu} od šest sati.","Grandpa has been in the small boat since six o'clock."),
     ("{sunce|Sunce} je visoko, a {more|more} je mirno.","The sun is high, and the sea is calm."),
     ("{riba|Riba} skače iz vode, ali ne ide na udicu.","A fish jumps out of the water, but it doesn't take the hook."),
     ("{ptica|Ptica} leti iznad {ribar|ribara} i čeka svoj ručak.","A bird flies above the fisherman and waits for its lunch.")]),
 dict(id='kofer', br='022', ime='Kofer', stil='packing for a holiday', emo='🧳',
  p=[('kofer',5,37,35,42.5),('majica',29.5,19.5,24,24),('sesir',64.5,22,17,20),('cipele',32.5,72.5,13.5,17),('rucnik',51.5,53,18,20),('kaput',65,49.5,27,37)],
  r=[("Ivana putuje na more i pakira {kofer|kofer}.","Ivana is going to the seaside and packing her suitcase."),
     ("Uzima {majica|majicu}, {sesir|šešir} i {rucnik|ručnik}.","She takes a T-shirt, a hat and a towel."),
     ("{cipele|Cipele} su nove, pa ih nosi na nogama.","The shoes are new, so she wears them."),
     ("A {kaput|kaput}? Ne treba joj — ljeto je!","And the coat? She doesn't need it — it's summer!")]),
 dict(id='dvoriste', br='007', ime='Dvorište', stil='football in the backyard', emo='⚽',
  p=[('gol',4,51.5,28.5,37),('lopta',38.5,82,6,11),('dres',49.5,32,14.5,33),('prozor',66.5,8,30,35.5),('bicikl',68,50.5,31.5,36.5),('macka',86,79,6.5,13)],
  r=[("Dječak ima novi {dres|dres} i jednu {lopta|loptu}.","The boy has a new football shirt and one ball."),
     ("Puca na {gol|gol}, ali lopta leti visoko.","He shoots at the goal, but the ball flies high."),
     ("Mama gleda kroz {prozor|prozor} i šuti.","Mum watches through the window and says nothing."),
     ("{macka|Mačka} se skriva iza {bicikl|bicikla}.","The cat hides behind the bicycle.")]),
 dict(id='glazbena-soba', br='015', ime='Glazbena soba', stil='a small music room', emo='🎸',
  p=[('prozor',13.5,0,24.5,57.5),('radio',27,40,13.5,16),('gitara',43.5,29,11.5,53),('stolica',53,39,20,49.5),('knjiga',56.5,60.5,11,7.5),('lampa',72.5,10,13.5,84)],
  r=[("Sestra svira {gitara|gitaru}, a brat sluša {radio|radio}.","The sister plays the guitar, and the brother listens to the radio."),
     ("{prozor|Prozor} je otvoren i glazba ide na ulicu.","The window is open and the music goes out into the street."),
     ("Na {stolica|stolici} je {knjiga|knjiga} s pjesmama.","On the chair there's a book of songs."),
     ("Kad padne mrak, sestra upali {lampa|lampu}.","When it gets dark, the sister turns on the lamp.")]),
 dict(id='trg', br='012', ime='Trg', stil='a sunny town square', emo='🕊️',
  p=[('spomenik',19,10,18.5,60),('golub',19,73.5,6,9.5),('kiosk',67,4.5,24.5,49),('turist',61.5,47,8.5,42.5),('sladoled',58.5,53.5,4.5,10),('bicikl',80,56.5,15,25.5)],
  r=[("{turist|Turist} stoji na trgu i jede {sladoled|sladoled}.","A tourist stands in the square eating an ice cream."),
     ("Gleda veliki {spomenik|spomenik} i ne vidi {golub|goluba}.","He looks at the big monument and doesn't see the pigeon."),
     ("Golub ne gleda spomenik — on gleda sladoled.","The pigeon isn't looking at the monument — it's looking at the ice cream."),
     ("Pored {kiosk|kioska} čeka turistov {bicikl|bicikl}.","Next to the kiosk, the tourist's bicycle is waiting.")]),
 dict(id='vecera', br='003', ime='Večera', stil='a table set for dinner', emo='🍽️',
  p=[('tanjur',34,30,34.5,48.5),('casa',62.5,6,11.5,27),('zlica',21.5,20,19,17),('vilica',25.5,43,12.5,44),('noz',70.5,39,12,43),('salveta',9.5,46.5,19.5,46)],
  r=[("Konobar stavlja prazan {tanjur|tanjur} na stol.","The waiter puts an empty plate on the table."),
     ("Lijevo je {vilica|vilica}, desno {noz|nož}, a gore {zlica|žlica}.","On the left there's a fork, on the right a knife, and at the top a spoon."),
     ("U {casa|čaši} je voda, a {salveta|salveta} je plava.","There's water in the glass, and the napkin is blue."),
     ("Sve je spremno — samo nema hrane!","Everything is ready — there's just no food!")]),
 dict(id='koliba', br='008', ime='Planinska koliba', stil='a hut in the mountains', emo='🏔️',
  p=[('planina',0,21.5,39,55),('kaput',50,30,14,47),('sal',63.5,26,7,50),('prozor',74,9.5,19,52),('salica',78,76,7,8.5),('stolic',70.5,80.5,19.5,17.5),('vrata',95.5,7,4.5,93)],
  r=[("Koliba je visoko u {planina|planini} i vani je jako hladno.","The hut is high in the mountains, and it's very cold outside."),
     ("Na zidu vise {kaput|kaput} i dugi {sal|šal}.","A coat and a long scarf hang on the wall."),
     ("Na malom {stolic|stoliću} je {salica|šalica} vrućeg čaja.","On the little stool there's a cup of hot tea."),
     ("Kroz {prozor|prozor} se vidi svjetlo, a {vrata|vrata} su zatvorena.","Light shows through the window, and the door is closed.")]),
 dict(id='postar', br='016', ime='Poštar', stil='the postman at the door', emo='✉️',
  p=[('bicikl',10.5,41,24.5,34.5),('torba',26.5,45.5,9,12.5),('postar',55.5,23,13.5,58),('pismo',66.5,34.5,4.5,8),('vrata',69,7,14,65.5),('pas',32,70.5,10.5,19),('kutija',78,72.5,9,13)],
  r=[("{postar|Poštar} dolazi {bicikl|biciklom} i nosi {torba|torbu} punu pisama.","The postman comes by bicycle and carries a bag full of letters."),
     ("Stoji pred {vrata|vratima} i drži jedno {pismo|pismo}.","He stands in front of the door holding one letter."),
     ("Pored vrata je {kutija|kutija} za susjeda.","Next to the door there's a box for the neighbour."),
     ("{pas|Pas} sjedi mirno i gleda poštara — za sada.","The dog sits quietly and watches the postman — for now.")]),
 dict(id='taksi', br='002', ime='Taksi', stil='a taxi by the river', emo='🚕',
  p=[('taksi',20.5,51,28,26.5),('vozac',47.5,48.5,6,26.5),('turist',76.5,51,6,34.5),('kofer',81.5,67.5,5,18.5),('most',52.5,40,46,17),('zgrada',0,0,46.5,63)],
  r=[("{turist|Turist} stoji na ulici s velikim {kofer|koferom}.","A tourist stands in the street with a big suitcase."),
     ("{vozac|Vozač} otvara vrata {taksi|taksija} i čeka.","The driver opens the taxi door and waits."),
     ("Ali turist gleda {most|most} i ne ide nikamo.","But the tourist is looking at the bridge and isn't going anywhere."),
     ("Hotel je u staroj {zgrada|zgradi}, samo dvadeset metara dalje.","The hotel is in the old building, just twenty metres away.")]),
 dict(id='plaza', br='013', ime='Plaža', stil='a hot day on the beach', emo='🏖️',
  p=[('sunce',46.5,4.5,7,12),('more',0,21,100,20),('lopta',63.5,45,10,17.5),('rucnik',12,60,53.5,32),('sesir',62.5,72.5,16,19),('sladoled',42,40.5,4,10.5)],
  r=[("Marko leži na {rucnik|ručniku} i jede {sladoled|sladoled}.","Marko lies on a towel eating an ice cream."),
     ("{sunce|Sunce} je jako, ali {sesir|šešir} je na pijesku.","The sun is strong, but the hat is on the sand."),
     ("{more|More} je toplo, a {lopta|lopta} čeka pored njega.","The sea is warm, and the ball is waiting next to him."),
     ("Sladoled se topi brže nego što ga Marko jede.","The ice cream melts faster than Marko can eat it.")]),
 dict(id='aerodrom', br='004', ime='Aerodrom', stil='waiting at the airport', emo='🛫',
  p=[('pilot',29.5,34,27,54),('avion',46.5,22,51,33),('kofer',59,51,11,36),('torba',63.5,73,12.5,18),('ekran',8.5,15,19,23),('karta',21.5,62,8.5,7.5)],
  r=[("{pilot|Pilot} sjedi i odmara prije leta.","The pilot sits and rests before the flight."),
     ("Na {ekran|ekranu} piše da {avion|avion} kasni.","The screen says the plane is late."),
     ("Pored njega su {kofer|kofer} i velika {torba|torba}.","Next to him are a suitcase and a big bag."),
     ("Na stolu je nečija {karta|karta} — ali čija?","There's someone's ticket on the table — but whose?")]),
 dict(id='ispred-kuce', br='006', ime='Ispred kuće', stil='a sunny corner in front of the house', emo='🏡',
  p=[('auto',5,18.5,34.5,41),('bicikl',42.5,40.5,19.5,29),('lampa',63.5,5.5,6,60),('stolica',72,48.5,21.5,34),('jastuk',77,52,8.5,13.5),('salica',90,69.5,4.5,5.5),('pas',65.5,79,15,12)],
  r=[("Ispred kuće stoje crveni {auto|auto} i stari {bicikl|bicikl}.","In front of the house there's a red car and an old bicycle."),
     ("Pored {lampa|lampe} je plava {stolica|stolica} s {jastuk|jastukom}.","Next to the lamp there's a blue armchair with a cushion."),
     ("Kava u {salica|šalici} se hladi jer nitko ne sjedi.","The coffee in the cup is getting cold because nobody is sitting there."),
     ("Samo {pas|pas} spava na suncu i ništa ne treba.","Only the dog sleeps in the sun and needs nothing.")]),
 dict(id='peron', br='009', ime='Peron', stil='a quiet railway platform', emo='🚆',
  p=[('vlak',0,10,100,49),('vrata',25.5,17,10,30),('sat',66.5,4.5,14.5,24.5),('kofer',36.5,50.5,21.5,33),('karta',47.5,52,7.5,7),('torba',26.5,68,19.5,25),('golub',65.5,72,10,15)],
  r=[("{vlak|Vlak} stoji na peronu, ali {vrata|vrata} su zatvorena.","The train is at the platform, but the doors are closed."),
     ("{sat|Sat} kaže da je kasno.","The clock says it's late."),
     ("Netko je ostavio {kofer|kofer} i {torba|torbu} na peronu.","Someone has left a suitcase and a bag on the platform."),
     ("Na koferu je {karta|karta}, a pored kofera {golub|golub} čeka vlasnika.","There's a ticket on the suitcase, and next to it a pigeon is waiting for the owner.")]),
 dict(id='dorucak', br='017', ime='Doručak na terasi', stil='breakfast outside', emo='🍳',
  p=[('stol',17.5,33.5,64.5,66),('tanjur',37,42,27.5,24),('jaje',43.5,46.5,15,13.5),('kruh',26.5,38.5,13.5,18.5),('vilica',63.5,40.5,11,25)],
  r=[("Na terasi je mali okrugli {stol|stol}.","On the terrace there's a small round table."),
     ("Na plavom {tanjur|tanjuru} je jedno {jaje|jaje}, a pored njega {kruh|kruh}.","On the blue plate there's one egg, and next to it some bread."),
     ("{vilica|Vilica} je tu, ali gdje je nož?","The fork is here, but where is the knife?")]),
 dict(id='iznenadenje', br='018', ime='Iznenađenje', stil='a surprise on the table', emo='🎁',
  p=[('torta',13,34,22,35),('svijeca',22.5,33,3.5,16),('poklon',34.5,23.5,14.5,20.5),('cvijece',53.5,8,13.5,20.5),('vaza',57,27.5,7.5,18.5),('cestitka',60.5,48,18,27.5),('casa',79.5,33,8,20.5)],
  r=[("Mama sprema iznenađenje: {torta|tortu} s jednom {svijeca|svijećom}.","Mum is preparing a surprise: a cake with one candle."),
     ("{poklon|Poklon} je mali, ali lijep.","The present is small but lovely."),
     ("{cvijece|Cvijeće} stoji u staklenoj {vaza|vazi}, a pored nje {cestitka|čestitka}.","The flowers stand in a glass vase, and next to it there's a card."),
     ("U {casa|čaši} je voda — za cvijeće ili za tatu?","There's water in the glass — for the flowers or for Dad?")]),
]
BROJ = {5: 'Five', 6: 'Six', 7: 'Seven'}

import re
def provjeri(s):
    ids = {p[0] for p in s['p']}
    for hr, en in s['r']:
        for m in re.finditer(r'\{([^|{}]+)\|([^{}]+)\}', hr):
            assert m.group(1) in ids, (s['id'], m.group(1))
    for p in s['p']:
        assert p[0] in A, p[0]

POC = datetime.date(2026, 9, 28)
upisi = []
for i, s in enumerate(S):
    provjeri(s)
    datum = (POC + datetime.timedelta(days=i)).isoformat()
    n = len(s['p'])
    kljuc = f"croland.daily.{s['id']}.{datum}"
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f"daily/slike/{s['br']}.jfif",
                    '-c:v', 'libwebp', '-q:v', '82', f"daily/slike/{s['id']}.webp"], check=True)
    poj = ",\n".join(
        '    {id:%s, x:%s, y:%s, w:%s, h:%s, o:%s}' % (json.dumps(pid), x, y, w, h, json.dumps(A[pid], ensure_ascii=False))
        for pid, x, y, w, h in s['p'])
    rec = ",\n".join('    {hr:%s,\n     en:%s}' % (json.dumps(hr, ensure_ascii=False), json.dumps(en, ensure_ascii=False))
                     for hr, en in s['r'])
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="color-scheme" content="light">
<title>Croland — Daily Challenge: {s['ime']}</title>
<link rel="stylesheet" href="../izazov/motor.css">
</head>
<body>
<script>
/* Generirano s _arhiva/_dailyji.py (27.09.2026.). Mehanika je u izazov/motor.js.
   x, y, w, h su postotci slike; o = prihvaćeni odgovori.
   recenice: {{id|oblik}} je riječ sa slike, skrivena dok je igrač ne upiše. */
window.IZAZOV = {{
  id: {json.dumps(s['id'])},
  vrsta: "daily",
  ime: {json.dumps(s['ime'], ensure_ascii=False)},
  stil: {json.dumps(s['stil'])},
  slika: "slike/{s['id']}.webp",
  w: 1024, h: 572,
  kljuc: {json.dumps(kljuc)},
  uvod: "{BROJ[n]} things are hiding in this picture. Tap one — it lights up — then type its Croatian name. The short story uses the same words — each one appears in it once you name it.",
  kraj: "{BROJ[n]} words and a whole story, in Croatian. See you tomorrow.",
  pojmovi: [
{poj}
  ],
  recenice: [
{rec}
  ]
}};
</script>
<script src="../izazov/motor.js"></script>
</body>
</html>
'''
    dat = f"{datum}-{s['id']}.html"
    open(f"daily/{dat}", 'w', encoding='utf-8').write(html)
    upisi.append("    { id: '%s', dat: '%s', ime: %s, stil: %s,\n      emo: '%s', datum: '%s', pojmova: %d,\n      kljuc: '%s',\n      opis: 'Name %s things in the picture, then match a short story with its English.' }"
                 % (s['id'], dat, json.dumps(s['ime'], ensure_ascii=False).replace('"', "'"),
                    json.dumps(s['stil'][0].upper() + s['stil'][1:]).replace('"', "'"), s['emo'], datum, n, kljuc, BROJ[n].lower()))
    os.makedirs('slike nekompresirano/daily', exist_ok=True)
    cilj = f"slike nekompresirano/daily/{datum} {s['ime']}.jfif"
    if not os.path.exists(cilj):
        shutil.move(f"daily/slike/{s['br']}.jfif", cilj)

open('_arhiva/_daily_upisi.txt', 'w', encoding='utf-8').write(",\n".join(upisi))
print(len(S), 'dailyja, zadnji datum', (POC + datetime.timedelta(days=len(S) - 1)).isoformat())
