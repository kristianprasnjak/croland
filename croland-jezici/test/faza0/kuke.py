# i18n kuke u index.html (faza 0). Svaka stavka: (staro, novo, ocekivani broj pojavljivanja).
# Engleski prikaz mora ostati znak po znak isti; provjera: regresijski test u pregledniku.
KUKE = [
# ---------------------------------------------------------------- 1. registar jezika / jezik stranice
("  var JEZIK_APP = 'en';\n",
 "  // jezik ove stranice dolazi iz registra u <head> (build mijenja samo JEZIK_STRANICE ondje)\n"
 "  var JEZIK_APP = window.CROLAND_JEZIK_STRANICE || 'en';\n", 1),
# placeni sadrzaj za jezik stranice (data-plus.json, data-plus-de.json, ...)
("fetch(FUNKCIJE_URL + '/sadrzaj?f=data-plus.json', {",
 "fetch(FUNKCIJE_URL + '/sadrzaj?f=data-plus' + (JEZIK_APP === 'en' ? '' : '-' + JEZIK_APP) + '.json', {", 1),
# 7. gumb prijevoda (EN / DE / ES)
("tg.className = 'prijevodGumb'; tg.textContent = 'EN';",
 "tg.className = 'prijevodGumb'; tg.textContent = JEZIK_APP.toUpperCase();", 1),
# 6. sortiranje po prijevodu prema jeziku sucelja (es: n < ñ < o)
("      .sort(function (a, b) { return a.en.localeCompare(b.en, 'en'); });",
 "      .sort(function (a, b) { return a.en.localeCompare(b.en, JEZIK_APP); });", 2),
("      var jezik = (dictSmjer === 'en-hr') ? 'en' : 'hr';",
 "      var jezik = (dictSmjer === 'en-hr') ? JEZIK_APP : 'hr';", 1),

# ---------------------------------------------------------------- 2. tipIme / cjelinaIme
("  var TIPOVI = ['Lesson', 'Vocabulary', 'Grammar', 'Practice', 'Test'];\n",
 "  var TIPOVI = ['Lesson', 'Vocabulary', 'Grammar', 'Practice', 'Test'];\n"
 "  // Prikazna imena tipova i cjelina. Interni kljucevi (Lesson 1, Daily challenge 5 ...) ostaju\n"
 "  // engleski jer se po njima sprema napredak; na zaslon idu kroz tipIme() / cjelinaIme().\n"
 "  // Build prevodi vrijednosti (T_), pa za engleski obje funkcije vracaju tocno ono sto dobiju.\n"
 "  var IME_TIPA = { Lesson: T_('Lesson'), Vocabulary: T_('Vocabulary'), Grammar: T_('Grammar'), Practice: T_('Practice'),\n"
 "    Test: T_('Test'), 'Daily challenge': T_('Daily challenge'), 'Weekly challenge': T_('Weekly challenge') };\n"
 "  function tipIme(t) { return IME_TIPA[t] || t; }\n"
 "  function cjelinaIme(c) {\n"
 "    return String(c == null ? '' : c).replace(/^(Lesson|Vocabulary|Grammar|Practice|Test|Daily challenge|Weekly challenge)\\b/,\n"
 "      function (m) { return tipIme(m); });\n"
 "  }\n"
 "  function kljucCjeline(tip, razina) { return tip + ' ' + razina; }\n", 1),
("var imena = lista.map(function (c) { return c.tip + ' ' + c.razina; });",
 "var imena = lista.map(function (c) { return tipIme(c.tip) + ' ' + c.razina; });", 1),
("bd.textContent = '▶ Next: ' + dalje.tip + ' ' + dalje.razina;",
 "bd.textContent = T_('▶ Next: %1', tipIme(dalje.tip) + ' ' + dalje.razina);", 1),
("b.textContent = '▶ Start ' + c.tip + ' ' + c.razina;",
 "b.textContent = T_('▶ Start %1', tipIme(c.tip) + ' ' + c.razina);", 1),
("naslov: (igre[0] && igre[0].cjelinaNaslov) || (tip + ' ' + razina),",
 "naslov: (igre[0] && igre[0].cjelinaNaslov) || (tipIme(tip) + ' ' + razina),", 1),
("naslov: (igre[0] && igre[0].cjelinaNaslov) || (tip + ' ' + r) };",
 "naslov: (igre[0] && igre[0].cjelinaNaslov) || (tipIme(tip) + ' ' + r) };", 1),
("esc(z.naslov + ' — ' + z.tip + ' ' + z.razina)", "esc(z.naslov + ' — ' + tipIme(z.tip) + ' ' + z.razina)", 1),
("esc(z.tip + ' ' + z.razina)", "esc(tipIme(z.tip) + ' ' + z.razina)", 2),
("esc(tip + ' ' + r", "esc(tipIme(tip) + ' ' + r", 6),
("'<div class=\"imeF\">' + tip + ' ' + r", "'<div class=\"imeF\">' + tipIme(tip) + ' ' + r", 2),
("(tip === 'Daily challenge' ? 'Daily challenge' : tip + ' ' + razina)",
 "(tip === 'Daily challenge' ? tipIme(tip) : tipIme(tip) + ' ' + razina)", 2),
("')\">Next: ' + sljedeci.tip + ' ' + sljedeci.razina + ' →</button>';",
 "')\">' + T_('Next: %1 →', tipIme(sljedeci.tip) + ' ' + sljedeci.razina) + '</button>';", 1),
("IK('brava', 'uz') + sljedeci.tip + ' ' + sljedeci.razina +\n"
 "          (val ? ' — needs ' + prag(sljedeci.tip, sljedeci.razina) + ' ' + val : '') + '. Go back and improve your scores!</div>';",
 "IK('brava', 'uz') +\n"
 "          (val ? T_('%1 — needs %2 %3. Go back and improve your scores!', tipIme(sljedeci.tip) + ' ' + sljedeci.razina, prag(sljedeci.tip, sljedeci.razina), val)\n"
 "            : T_('%1. Go back and improve your scores!', tipIme(sljedeci.tip) + ' ' + sljedeci.razina)) + '</div>';", 1),
("ostalo, tip + ' ' + razina)", "ostalo, tipIme(tip) + ' ' + razina)", 2),
("'<b>' + Math.max(0, sp.prag - ima) + '</b> more → ' + tip + ' ' + sp.razina",
 "T_('<b>%1</b> more → %2', Math.max(0, sp.prag - ima), tipIme(tip) + ' ' + sp.razina)", 1),
("'<span class=\"znak\">' + esc(tip) + ' ' + razina + '</span>'",
 "'<span class=\"znak\">' + esc(tipIme(tip)) + ' ' + razina + '</span>'", 1),
("esc(nas || (tip + ' ' + razina))", "esc(nas || (tipIme(tip) + ' ' + razina))", 1),
("esc(meta.tip + ' ' + meta.razina)", "esc(tipIme(meta.tip) + ' ' + meta.razina)", 1),
("'<span class=\"dugo\">' + tip + '</span>", "'<span class=\"dugo\">' + tipIme(tip) + '</span>", 1),
("var KRATKO_TIPA = { Lesson: 'Lesson', Vocabulary: 'Vocab', Grammar: 'Gram', Practice: 'Pract', Test: 'Test' };",
 "var KRATKO_TIPA = { Lesson: T_('Lesson'), Vocabulary: T_('Vocab'), Grammar: T_('Gram'), Practice: T_('Pract'), Test: T_('Test') };", 1),
("var IME_TIPA_DUGO = { Lesson: 'Lesson', Vocabulary: 'Vocabulary', Grammar: 'Grammar', Practice: 'Practice', Test: 'Test' };",
 "var IME_TIPA_DUGO = IME_TIPA;", 1),
("'<div class=\"progGlava\" style=\"color:' + BOJA_TIPA[t] + '\">' + t + '</div>'",
 "'<div class=\"progGlava\" style=\"color:' + BOJA_TIPA[t] + '\">' + tipIme(t) + '</div>'", 2),
("'<span class=\"gdje\">' + esc(x.cjelina) + '</span>'", "'<span class=\"gdje\">' + esc(cjelinaIme(x.cjelina)) + '</span>'", 1),
("var P = window.PREGLEDI && window.PREGLEDI['Lesson ' + r];",
 "var P = window.PREGLEDI && window.PREGLEDI[kljucCjeline('Lesson', r)];", 1),
# Daily challenge kao prikazani tekst (kao kljuc ostaje engleski)
("brzaKarticaHtml('view:daily', IK('kalendar'), 'Daily challenge', dailyPodnaslov(), false)",
 "brzaKarticaHtml('view:daily', IK('kalendar'), T_('Daily challenge'), dailyPodnaslov(), false)", 1),
("(natragView === 'daily' ? 'Daily challenge' : 'Lessons')", "(natragView === 'daily' ? T_('Daily challenge') : 'Lessons')", 1),

# ---------------------------------------------------------------- 3. mnozina: oba oblika kao cijela recenica
("(cedBroj ? ' You have ' + cedBroj + ' note' + (cedBroj === 1 ? '' : 's') + ' saved.' : '')",
 "(cedBroj ? ' ' + (cedBroj === 1 ? T_('You have %1 note saved.', cedBroj) : T_('You have %1 notes saved.', cedBroj)) : '')", 1),
("h += '<div class=\"metaS\">' + z.broj + ' exercise' + (z.broj === 1 ? '' : 's') +",
 "h += '<div class=\"metaS\">' + (z.broj === 1 ? T_('%1 exercise', z.broj) : T_('%1 exercises', z.broj)) +", 1),
("rj + ' word' + (rj === 1 ? '' : 's') + ' · practice only, no points'",
 "(rj === 1 ? T_('%1 word · practice only, no points', rj) : T_('%1 words · practice only, no points', rj))", 1),
("(rj ? rj + ' word' + (rj === 1 ? '' : 's') + ' learned' : 'words you meet get saved here')",
 "(rj ? (rj === 1 ? T_('%1 word learned', rj) : T_('%1 words learned', rj)) : 'words you meet get saved here')", 1),
(": 'Lesson' + (wtLekcije.length > 1 ? 's' : '') + ' ' +\n          wtLekcije.slice().sort(function (a, b) { return a - b; }).join(', '));",
 ": (wtLekcije.length > 1 ? T_('Lessons %1', wtLekcije.slice().sort(function (a, b) { return a - b; }).join(', '))\n"
 "          : T_('Lesson %1', wtLekcije.join(', '))));", 1),

# ---------------------------------------------------------------- 5. HTML atributi u JS-u kao cijeli tekst
("'\" aria-label=\"Sticky note\" '", "'\" aria-label=\"' + esc(T_('Sticky note')) + '\" '", 1),
("'placeholder=\"Write here…\">'", "'placeholder=\"' + esc(T_('Write here…')) + '\">'", 1),
("aria-label=\"Play ' + esc(g.ime) + ' full screen\">'", "aria-label=\"' + esc(T_('Play %1 full screen', g.ime)) + '\">'", 1),
("'\" title=\"Lesson summary — ' + sad + '/' + uk + ' pts\" '", "'\" title=\"' + esc(T_('Lesson summary — %1/%2 pts', sad, uk)) + '\" '", 1),
("'\" title=\"Day ' + n + ' — ' + o + '/' + m + '\"></i>'", "'\" title=\"' + esc(T_('Day %1 — %2/%3', n, o, m)) + '\"></i>'", 1),
("'title=\"Open ' + esc(g.ime) + '\"", "'title=\"' + esc(T_('Open %1', g.ime)) + '\"", 1),
("'title=\"' + esc(g.ime) + ' — up to ' + g.maks + ' points in each currency\">'",
 "'title=\"' + esc(T_('%1 — up to %2 points in each currency', g.ime, g.maks)) + '\">'", 1),
("btn.title = n > 1 ? 'Add ' + n + ' words to dictionary' : 'Add to dictionary';",
 "btn.title = n > 1 ? T_('Add %1 words to dictionary', n) : 'Add to dictionary';", 1),

# ---------------------------------------------------------------- 4. recenice iz dijelova -> cijele recenice s mjestima
("'Read: ' + brojProcitanih() + '/' + ukupno + ' · Added to dictionary: ' + d + '/' + ukupnoRj",
 "T_('Read: %1/%2 · Added to dictionary: %3/%4', brojProcitanih(), ukupno, d, ukupnoRj)", 1),
("'Read: ' + brojProcitanih() + '/' + ukupno + ' · Added to dictionary: ' + dod + '/' + ukupnoRj",
 "T_('Read: %1/%2 · Added to dictionary: %3/%4', brojProcitanih(), ukupno, dod, ukupnoRj)", 1),
("trakaSlusanja('Tap a card to **flip it**: the Croatian word, a picture and ' + IK('zvuk') + ' are on the back. Play it, **say the word out loud**, then tap **+** to put it in your dictionary (tap it again to star it). ' + IK('knjiga') + ' shows all its forms.')",
 "trakaSlusanja(T_('Tap a card to **flip it**: the Croatian word, a picture and %1 are on the back. Play it, **say the word out loud**, then tap **+** to put it in your dictionary (tap it again to star it). %2 shows all its forms.', IK('zvuk'), IK('knjiga')))", 1),
("trakaSlusanja('Every line has a ' + IK('zvuk') + ' — play it, then **read your reply out loud** before you tap it.')",
 "trakaSlusanja(T_('Every line has a %1 — play it, then **read your reply out loud** before you tap it.', IK('zvuk')))", 1),
("'Matched: ' + spojeno + '/' + parovi.length + ' · Mistakes: ' + greske",
 "T_('Matched: %1/%2 · Mistakes: %3', spojeno, parovi.length, greske)", 1),
("trakaSlusanja('Tap ' + IK('zvuk') + ' on a Croatian word and **say it back** before you look for its pair.')",
 "trakaSlusanja(T_('Tap %1 on a Croatian word and **say it back** before you look for its pair.', IK('zvuk')))", 1),
("'All ' + parovi.length + ' pairs found'", "T_('All %1 pairs found', parovi.length)", 1),
("'Score: ' + bodovi + '/' + cilj + ' · Mistakes: ' + greske", "T_('Score: %1/%2 · Mistakes: %3', bodovi, cilj, greske)", 2),
("trakaSlusanja('Tap ' + IK('zvuk') + ' next to the word and **say it out loud** before you answer — the clock can wait one second.')",
 "trakaSlusanja(T_('Tap %1 next to the word and **say it out loud** before you answer — the clock can wait one second.', IK('zvuk')))", 1),
("'All ' + cilj + ' correct with ' + preostalo + ' s left · Mistakes: ' + greske",
 "T_('All %1 correct with %2 s left · Mistakes: %3', cilj, preostalo, greske)", 1),
("'In place: ' + n + '/' + linije.length + ' · Mistakes: ' + greske", "T_('In place: %1/%2 · Mistakes: %3', n, linije.length, greske)", 1),
("'Result: ' + tocno + '/' + zadaci.length + ' (' + post + '%)' + (post >= prg ? ' · PASSED ✓' : ' · below the ' + prg + '% threshold')",
 "T_('Result: %1/%2 (%3%)', tocno, zadaci.length, post) + (post >= prg ? ' · PASSED ✓' : T_(' · below the %1% threshold', prg))", 1),
("'No favourites yet. Tap ' + IK('zvijezda') + ' next to any word to keep it here.'",
 "T_('No favourites yet. Tap %1 next to any word to keep it here.', IK('zvijezda'))", 2),
("kartice: 'New words? The <strong>dictionary</strong> lists every word on this page, with ' + IK('zvuk') +\n"
 "      ' — and the ' + IK('igra') + ' game right under it drills the ones you saved.',",
 "kartice: T_('New words? The <strong>dictionary</strong> lists every word on this page, with %1 — and the %2 game right under it drills the ones you saved.',\n"
 "      IK('zvuk'), IK('igra')),", 1),
("pokaziSavjetRj('Stuck? The <strong>dictionary</strong> holds every word on this page. ' + IK('knjiga'));",
 "pokaziSavjetRj(T_('Stuck? The <strong>dictionary</strong> holds every word on this page. %1', IK('knjiga')));", 1),
("tekst: 'Any word in the examples you do not recognise is in the <strong>dictionary</strong>. ' + IK('knjiga'),",
 "tekst: T_('Any word in the examples you do not recognise is in the <strong>dictionary</strong>. %1', IK('knjiga')),", 1),
("upis: 'Blanking on a word? Open the <strong>dictionary</strong> — it holds every word on this page. ' + IK('knjiga'),",
 "upis: T_('Blanking on a word? Open the <strong>dictionary</strong> — it holds every word on this page. %1', IK('knjiga')),", 1),
("provjera: 'The <strong>dictionary</strong> stays open during the checkpoint too. Nothing here is a trap. ' + IK('knjiga'),",
 "provjera: T_('The <strong>dictionary</strong> stays open during the checkpoint too. Nothing here is a trap. %1', IK('knjiga')),", 1),
("slaganje: 'Not sure which word is which? The <strong>dictionary</strong> has them all, with ' + IK('zvuk') + '.'",
 "slaganje: T_('Not sure which word is which? The <strong>dictionary</strong> has them all, with %1.', IK('zvuk'))", 1),
("'Every word on this page is in the <strong>dictionary</strong>, with ' + IK('zvuk') + ' — it opens right here, without leaving the exercise.'",
 "T_('Every word on this page is in the <strong>dictionary</strong>, with %1 — it opens right here, without leaving the exercise.', IK('zvuk'))", 1),
("1: 'Not sure what a picture means? Tap here — every word on this page is listed, with ' + IK('zvuk') + '.',",
 "1: T_('Not sure what a picture means? Tap here — every word on this page is listed, with %1.', IK('zvuk')),", 1),
("'No questions left today. You get ' + AI_LIMIT + ' new ones tomorrow.'",
 "T_('No questions left today. You get %1 new ones tomorrow.', AI_LIMIT)", 1),
("ostalo + ' of ' + AI_LIMIT + ' questions left today'", "T_('%1 of %2 questions left today', ostalo, AI_LIMIT)", 1),
("'Remember these three — round ' + (n + 1) + ' of ' + krugova", "T_('Remember these three — round %1 of %2', n + 1, krugova)", 1),
("? 'all ' + MINI_IGRE.length + ' finished · replay any time'\n        : gotovih + ' of ' + MINI_IGRE.length + ' finished'",
 "? T_('all %1 finished · replay any time', MINI_IGRE.length)\n        : T_('%1 of %2 finished', gotovih, MINI_IGRE.length)", 1),
("'Exercise ' + (T.i + 1) + ' of ' + T.igre.length + ' · your score comes at the end'",
 "T_('Exercise %1 of %2 · your score comes at the end', T.i + 1, T.igre.length)", 1),
("(prosao ? 'Test ' + razina + ' passed! 🎉' : 'Test ' + razina + ' — not yet 💪')",
 "(prosao ? T_('Test %1 passed! 🎉', razina) : T_('Test %1 — not yet 💪', razina))", 1),
("'No favourites yet — tap ' + IK('zvijezda') + ' next to a word in the dictionary or on a card.'",
 "T_('No favourites yet — tap %1 next to a word in the dictionary or on a card.', IK('zvijezda'))", 1),
("'<div class=\"pod\">' + broj(cijeliOsv) + ' of ' + broj(cijeliMaks) + ' points from all units of the ' +\n"
 "          MAX_RAZINA + ' levels (mini games and challenges not included)</div>'",
 "'<div class=\"pod\">' + T_('%1 of %2 points from all units of the %3 levels (mini games and challenges not included)',\n"
 "          broj(cijeliOsv), broj(cijeliMaks), MAX_RAZINA) + '</div>'", 1),
("'best so far ' + x.o + ' of ' + x.m", "T_('best so far %1 of %2', x.o, x.m)", 1),
("'<p class=\"progOpis\">' + dOdr + ' finished, ' + dDio + ' partly done, ' +\n"
 "          (dani.length - dOdr - dDio) + ' untouched. Current streak ' + (st.niz || 0) + ' days — ' +\n"
 "          'day ' + ((st.niz || 0) + 1) + ' will be worth ' + ((st.niz || 0) + 1) +\n"
 "          ' points in every currency.</p>'",
 "'<p class=\"progOpis\">' + T_('%1 finished, %2 partly done, %3 untouched. Current streak %4 days — day %5 will be worth %5 points in every currency.',\n"
 "          dOdr, dDio, dani.length - dOdr - dDio, st.niz || 0, (st.niz || 0) + 1) + '</p>'", 1),
("? 'You will leave Progress and go straight into the exercise. You have not played it yet — all ' +\n"
 "          m + ' points are still there.'\n"
 "        : 'You will leave Progress and go straight into the exercise. Your best result (' + o + ' of ' + m +\n"
 "          ') is kept: a weaker run can never cost you points.',",
 "? T_('You will leave Progress and go straight into the exercise. You have not played it yet — all %1 points are still there.', m)\n"
 "        : T_('You will leave Progress and go straight into the exercise. Your best result (%1 of %2) is kept: a weaker run can never cost you points.', o, m),", 1),
("? 'You have already earned all ' + g.maks + ' points from this one. The payout happens once, so ' +\n"
 "        'playing it again is purely for the fun of it.'\n"
 "      : (o > 0\n"
 "          ? 'You have earned ' + o + ' of ' + g.maks + ' points here. The rest is still waiting, and points ' +\n"
 "            'already earned cannot be lost.'\n"
 "          : 'All ' + g.maks + ' points are still there. They go into every currency at once.');",
 "? T_('You have already earned all %1 points from this one. The payout happens once, so playing it again is purely for the fun of it.', g.maks)\n"
 "      : (o > 0\n"
 "          ? T_('You have earned %1 of %2 points here. The rest is still waiting, and points already earned cannot be lost.', o, g.maks)\n"
 "          : T_('All %1 points are still there. They go into every currency at once.', g.maks));", 1),
("DRUSTVO.poruka = 'Request sent to ' + kod + '. They see only the name you chose.';",
 "DRUSTVO.poruka = T_('Request sent to %1. They see only the name you chose.', kod);", 1),
# ---------------------------------------------------------------- 4b. jos recenica s brojem u sredini
("'<strong>Day ' + nz + ' streak</strong> · +' + nz +\n        ' points to every currency' +\n        '<span class=\"opusti\">Come back tomorrow for +' + (nz + 1) + '. Miss a day and the streak restarts.</span></div>'",
 "T_('<strong>Day %1 streak</strong> · +%1 points to every currency', nz) +\n        '<span class=\"opusti\">' + T_('Come back tomorrow for +%1. Miss a day and the streak restarts.', nz + 1) + '</span></div>'", 1),
("'<div class=\"metaS\">' + z.osv + ' of ' + z.maks + ' points earned</div>'",
 "'<div class=\"metaS\">' + T_('%1 of %2 points earned', z.osv, z.maks) + '</div>'", 1),
("'<span><strong>' + uk + '</strong> of ' + maks + ' points earned</span>'",
 "'<span>' + T_('<strong>%1</strong> of %2 points earned', uk, maks) + '</span>'", 1),
("<span><strong>' + igre.length + ' exercises</strong>, ' + maks + ' points — everything from level ' + razina + '.</span></li>'",
 "<span>' + T_('<strong>%1 exercises</strong>, %2 points — everything from level %3.', igre.length, maks, razina) + '</span></li>'", 1),
("<span><strong>' + Math.round(sek / 60) + ' minutes</strong> for the whole test. The clock runs across all exercises.</span></li>'",
 "<span>' + T_('<strong>%1 minutes</strong> for the whole test. The clock runs across all exercises.', Math.round(sek / 60)) + '</span></li>'", 1),
("'<div class=\"testUpozorenje\">Your best so far: <strong>' + prije + '</strong>/' + maks + ' points. Only a better result replaces it.</div>'",
 "'<div class=\"testUpozorenje\">' + T_('Your best so far: <strong>%1</strong>/%2 points. Only a better result replaces it.', prije, maks) + '</div>'", 1),
("'<div class=\"podP\">The clock is stopped. <strong>' + mmss(TEST.preostalo) + '</strong> left when you come back.</div>'",
 "'<div class=\"podP\">' + T_('The clock is stopped. <strong>%1</strong> left when you come back.', mmss(TEST.preostalo)) + '</div>'", 1),
("'<div style=\"color:var(--muted)\">' + osv + ' / ' + maks + ' points · pass mark ' + T.prag + '%</div>'",
 "'<div style=\"color:var(--muted)\">' + T_('%1 / %2 points · pass mark %3%', osv, maks, T.prag) + '</div>'", 1),
("? 'All ' + ukupnoL0 + ' words from this lesson are now in your <strong>Dictionary</strong>.'\n            : 'All ' + ukupnoL0 + ' words from this lesson are already in your <strong>Dictionary</strong>.')",
 "? T_('All %1 words from this lesson are now in your <strong>Dictionary</strong>.', ukupnoL0)\n            : T_('All %1 words from this lesson are already in your <strong>Dictionary</strong>.', ukupnoL0))", 1),
("'Everything in this unit is yours — all <strong>' + maks +\n        '</strong> points earned. Nothing left to win here.</div>'",
 "T_('Everything in this unit is yours — all <strong>%1</strong> points earned. Nothing left to win here.', maks) + '</div>'", 1),
("'<button class=\"viseRazina\" onclick=\"prekloputiProgRazine()\">Show all ' + MAX_RAZINA +\n        ' levels ▾ <span style=\"opacity:.7\">(' + (MAX_RAZINA - progGranica) +\n        ' more, still locked)</span></button>'",
 "'<button class=\"viseRazina\" onclick=\"prekloputiProgRazine()\">' +\n        T_('Show all %1 levels ▾ <span style=\"opacity:.7\">(%2 more, still locked)</span>', MAX_RAZINA, MAX_RAZINA - progGranica) + '</button>'", 1),
("? '<span><b>' + preostalo + ' points</b> are still waiting in this unit.</span>'\n            : '<span>Everything here is yours — all <b>' + maks + '</b> points earned.</span>')",
 "? '<span>' + T_('<b>%1 points</b> are still waiting in this unit.', preostalo) + '</span>'\n            : '<span>' + T_('Everything here is yours — all <b>%1</b> points earned.', maks) + '</span>')", 1),
("'<p class=\"accSitno\">This code is from <b>' + esc(r.od_koga) + '</b>. They\\'ll see your display name and points — ' +\n        'you can hide this anytime in Account settings.</p>' +\n        '<label class=\"accKvacica\"><input type=\"checkbox\" id=\"accVise\"> Also let ' + esc(r.od_koga) +\n        ' see my lessons and activity dates</label>'",
 "'<p class=\"accSitno\">' + T_('This code is from <b>%1</b>. They\\'ll see your display name and points — you can hide this anytime in Account settings.', esc(r.od_koga)) + '</p>' +\n        '<label class=\"accKvacica\"><input type=\"checkbox\" id=\"accVise\"> ' + T_('Also let %1 see my lessons and activity dates', esc(r.od_koga)) + '</label>'", 1),
("'<h2>Check your inbox</h2><p class=\"otkljPod\">Click the link we sent to <b>' + esc(e) +\n          '</b> (and, if asked, the one sent to your current address) to finish the change.</p>'",
 "'<h2>Check your inbox</h2><p class=\"otkljPod\">' + T_('Click the link we sent to <b>%1</b> (and, if asked, the one sent to your current address) to finish the change.', esc(e)) + '</p>'", 1),
]

if __name__ == '__main__':
    import sys
    put = sys.argv[1]
    src = open(put, encoding='utf-8', newline='').read()
    crlf = '\r\n' in src
    if crlf: src = src.replace('\r\n', '\n')
    for staro, novo, n in KUKE:
        k = src.count(staro)
        if k != n: raise SystemExit(f'KUKA: ocekivano {n}x, nadjeno {k}x:\n{staro}')
        src = src.replace(staro, novo)
    if crlf: src = src.replace('\n', '\r\n')
    open(put, 'w', encoding='utf-8', newline='').write(src)
    print('kuka:', len(KUKE))
