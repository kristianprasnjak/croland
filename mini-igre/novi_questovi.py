# -*- coding: utf-8 -*-
"""Ubacuje 14 novih zadataka i 'poslije' replike u gen_igra.py"""
import io, os, re

NOVI = r"""
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
"""

POSLIJE = {
 'kruh': ["Kruh je bio taman kakav treba. Hvala vam još jednom.",
          "Dođite mi opet. Skuhat ću kavu, imam i onaj kolač."],
 'pismo': ["Don Ante mi je javio da je pismo stiglo. Brzi ste vi.",
           "Danas mi je torba lakša. Malo."],
 'cekic': ["Krov je popravljen. Ne kaplje. Čudo.",
           "Ako ti ikad zatreba nešto iz kutije — znaš gdje sam."],
 'pecivo': ["Ruža mi je poslala pozdrav. Preko tebe, valjda.",
            "Ustajem u četiri. Svaki dan. Ali za nju bih i u tri."],
 'knjiga': ["Knjiga je na polici. Tamo joj je i mjesto.",
            "Sara je već pitala za nastavak. Naravno da jest."],
 'riba': ["Riba je bila izvrsna. Gosti su tražili još.",
          "Anka i ja smo si opet dobri. Kava je plaćena."],
 'rajcice': ["Rajčice su otišle do zadnje. Sve u salatu.",
             "Ivo je rekao da mu javim kad opet bude ovakvih."],
 'muzej': ["Prva nedjelja! Bila sam. Sve sam razgledala.",
           "Sad znam reći „besplatno”. To mi je najdraža riječ."],
 'lopta': ["Lopta je kod mene. Igram daleko od dvorane. Jako daleko.",
           "Stipe mi je čak mahnuo jučer. Mislim da mi je oprostio."],
 'trening': ["Dario je došao. U sedam. Nisam mogao vjerovati.",
             "Kad se momčad skupi, onda smo momčad."],
 'lijek': ["Jure je uzeo lijek. I odmah počeo pričati o šezdesetima.",
           "Ljudi zaborave lijek, ali ne zaborave priču."],
 'novine': ["Mate je pročitao novine od korica do korica. Pa mi ih vratio.",
            "Kaže da nema ništa novo. Kao i uvijek."],
 'paket': ["Nada je došla po paket. U tri, točno u tri.",
           "Vozim dalje. Grad se sam neće provozati."],
}


def main():
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gen_igra.py')
    s = io.open(p, encoding='utf-8').read()

    # 1) 'poslije' u postojećih 13
    for qid, linije in POSLIJE.items():
        m = re.search(r"(\{id:'%s'.*?hvala:\[[^\]]*\])" % qid, s, re.S)
        assert m, qid
        dodaj = ",\n   poslije:[%s]" % ",".join("'" + x.replace("'", "\\'") + "'" for x in linije)
        s = s[:m.end(1)] + dodaj + s[m.end(1):]

    # 2) novi zadaci prije zatvaranja niza
    kraj = s.index("];\nvar QMAP_DAJE")
    s = s[:kraj] + NOVI + "\n" + s[kraj:]

    # 3) 'poslije' se koristi u običnom razgovoru
    a = """  /* 3) obični razgovor */
  red.push({tko:n.ime, txt: prvi ? n.poz : n.prica[Math.floor(Math.random() * n.prica.length)]});"""
    b = """  /* 3) obični razgovor — nakon riješenog zadatka govore drukčije */
  var izvor = n.prica;
  if (moj && S.z[moj.id] === 'g' && moj.poslije) izvor = moj.poslije.concat(n.prica);
  red.push({tko:n.ime, txt: prvi ? n.poz : izvor[Math.floor(Math.random() * izvor.length)]});"""
    assert s.count(a) == 1
    s = s.replace(a, b)

    # isto i za zaključani razgovor
    a2 = """  if (S.blok === n.id){
    red.push({tko:n.ime, txt: n.prica[Math.floor(Math.random() * n.prica.length)]});"""
    b2 = """  if (S.blok === n.id){
    var mojB = QMAP_DAJE[n.id];
    var izvorB = (mojB && S.z[mojB.id] === 'g' && mojB.poslije) ? mojB.poslije : n.prica;
    red.push({tko:n.ime, txt: izvorB[Math.floor(Math.random() * izvorB.length)]});"""
    assert s.count(a2) == 1
    s = s.replace(a2, b2)

    io.open(p, 'w', encoding='utf-8').write(s)
    print('gotovo')


if __name__ == '__main__':
    main()
