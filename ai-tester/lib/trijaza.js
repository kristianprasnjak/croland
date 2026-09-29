// Trijaža: jači model (Sonnet) razvrsta sirove nalaze u dvije hrpe —
//   za_ai    : stvari koje AI može sam ispraviti (bugovi, tekst, bodovanje) — s koracima za ponavljanje
//   za_tebe  : odluke koje traže čovjeka (težina, pedagogija, plaćanje, dizajn, gamifikacija)
// Poštuje tvoje oznake iz izvještaja (odbačeno / ispravljeno / kasnije).
import fs from 'fs';
import path from 'path';
import { izvuciJson } from './model.js';

const citajL = f => { try { return fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)); } catch (e) { return []; } };
const citajJ = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return d; } };

const SUSTAV = `You are a senior QA lead and product researcher for "Croland", a web app (English UI) that teaches Croatian to foreigners. Simulated users (AI personas) used the app and left raw notes; the harness also logged technical errors and exercise results. Your job: deduplicate and triage the findings for a solo developer. Be concrete and skeptical: an AI persona's feelings are hypotheses, objective data (errors, scores, times, repeated notes) is evidence. Merge duplicates, count occurrences, drop noise and vague praise. Write all text in CROATIAN. Answer with JSON only.`;

export async function napraviTrijazu({ dir, rez, model, cfg, persona }) {
  const biljeske = citajL(path.join(dir, 'biljeske.jsonl'));
  const vjezbe = citajL(path.join(dir, 'vjezbe.jsonl'));
  const dani = citajL(path.join(dir, 'dani.jsonl'));
  const stanje = citajJ(path.join(dir, 'stanje.json'), {});
  const odlazak = citajJ(path.join(dir, 'odlazak.json'), null);
  const prethodna = citajJ(path.join(dir, 'trijaza.json'), null);
  const odluke = citajJ(path.join(rez, 'odluke.json'), {});

  // sažmi vježbe po cjelini
  const poCj = {};
  for (const v of vjezbe) {
    const c = poCj[v.cjelina] || (poCj[v.cjelina] = { vjezbi: 0, bodovi: 0, max: 0, min: 0 });
    c.vjezbi++; c.bodovi += v.bodovi; c.max += v.max || 0; c.min += v.trajanjeMin || 0;
  }
  const tehnicko = Object.values(stanje.tehnicko || {}).sort((a, b) => b.broj - a.broj).slice(0, 40);
  const prethodnaStavke = prethodna ? [...(prethodna.za_ai || []), ...(prethodna.za_tebe || [])].map(s => ({
    id: s.id, naslov: s.naslov, status: (odluke[s.id] && odluke[s.id].status) || 'otvoreno', komentar: odluke[s.id]?.komentar || undefined
  })) : [];

  const ulaz = {
    persona,
    dani: dani.map(d => ({ dan: d.dan, min: d.minuta, plan: d.budzet, uredaj: d.uredaj, vjezbe: d.vjezbe, raspolozenje: d.raspolozenje, frustracija: d.frustracija, dosada: d.dosada, napredak: d.napredak, vraca_se: d.vracam_se, zasto: d.zasto, dnevnik: d.dnevnik, prekid: d.prisilniKraj || undefined })),
    cjeline: poCj,
    biljeske: biljeske.map(b => ({ id: b.id, dan: b.dan, izvor: b.izvor, tip: b.tip, vaznost: b.vaznost, gdje: b.vjezba || b.ekran, format: b.format || undefined, tekst: b.tekst, pitanje: b.pitanje ? b.pitanje.slice(0, 80) : undefined, radnje: b.zadnjeRadnje ? b.zadnjeRadnje.slice(-3) : undefined })),
    tehnicke_greske: tehnicko.map(t => ({ vrsta: t.vrsta, poruka: t.poruka, broj: t.broj, prvi_put: t.prvi })),
    odlazak,
    prethodna_trijaza: prethodnaStavke
  };

  const tekst = `PODACI (JSON):
${JSON.stringify(ulaz)}

PRAVILA:
- "za_ai": things an AI coding assistant can fix directly in the code/content without a product decision: bugs, broken UI, layout overlaps, wrong/odd Croatian or English text, answers wrongly marked, missing files (404 for images/sounds), console errors. Each with reproduction steps from the notes' "radnje".
- "za_tebe": needs the developer's judgement: difficulty curve, pedagogy/explanations, pacing & length, boredom/repetition, gamification quality, paywall/pricing moment, onboarding, motivation to return.
- Merge duplicates. "dokazi" = list of note ids (B0001…) supporting the item. "ucestalost" = how many notes/errors support it.
- "vaznost": 3 = blocks progress or would make users quit; 2 = clearly hurts; 1 = polish.
- Keep ids from "prethodna_trijaza" for the same issue. New items: "A-<n>" for za_ai, "T-<n>" for za_tebe, continuing numbering.
- Status "odbaceno" = developer rejected it: do not include it again unless there is NEW strong evidence (then mention that in "napomena").
- Status "ispravljeno": include only if notes from AFTER the fix show it again (napomena: "ponovno se javlja").
- A day with "prekid" was stopped by the TEST HARNESS (step/time cap), not by the app — never report that as a bug or as a UX problem, and discount the persona's complaints about the day ending.
- Ignore pure noise, vague praise and single low-importance feelings. Missing Daily challenge content for far-future dates is not a bug.
- "sazetak": 4–7 sentences for the developer: how the persona's journey went, the 3 most important things, and where it quit (if it did).
Format:
{"sazetak":"...",
 "za_ai":[{"id":"A-1","naslov":"...","gdje":"cjelina / vježba / ekran","koraci":["..."],"ocekivano":"...","stvarno":"...","vaznost":1,"ucestalost":1,"dokazi":["B0003"],"napomena":""}],
 "za_tebe":[{"id":"T-1","tema":"tezina|pedagogija|tempo|dosada|gamifikacija|placanje|onboarding|motivacija|dizajn|ostalo","naslov":"...","opis":"...","prijedlog":"...","vaznost":1,"ucestalost":1,"dokazi":["B0007"]}]}`;

  const t = await model.pitaj({ model: cfg.model_trijaza, sustav: SUSTAV, tekst });
  const j = izvuciJson(t);
  if (!j || (!j.za_ai && !j.za_tebe)) throw new Error('Trijaža: model nije vratio ispravan JSON');
  j.vrijeme = new Date().toISOString();
  j.danaObradjeno = dani.length;
  j.biljeskiObradjeno = biljeske.length;
  fs.writeFileSync(path.join(dir, 'trijaza.json'), JSON.stringify(j, null, 2));
  pisiZaIspravak(dir, j, odluke, biljeske, persona);
  return j;
}

export function pisiZaIspravak(dir, j, odluke, biljeske, persona) {
  const poId = Object.fromEntries(biljeske.map(b => [b.id, b]));
  const otvoreno = (j.za_ai || []).filter(s => !['odbaceno', 'ispravljeno'].includes(odluke[s.id]?.status));
  const l = [];
  l.push(`# Croland — nalazi za ispravak (AI tester, ${persona})`, '');
  l.push('Ovo su nalazi simuliranog korisnika koji je koristio lokalnu verziju aplikacije (index.html, data.js).');
  l.push('Svaki nalaz ima korake i dokaze. Prije ispravka provjeri je li problem stvaran; ako nije, zanemari ga.');
  l.push('Slike su u mapi ai-tester/rezultati/<persona>/slike/.', '');
  otvoreno.sort((a, b) => (b.vaznost || 0) - (a.vaznost || 0));
  for (const s of otvoreno) {
    l.push(`## ${s.id} · ${s.naslov}  (važnost ${s.vaznost || '?'}, javilo se ${s.ucestalost || 1}×)`);
    if (s.gdje) l.push(`**Gdje:** ${s.gdje}`);
    if (s.koraci && s.koraci.length) { l.push('**Koraci:**'); s.koraci.forEach((k, i) => l.push(`${i + 1}. ${k}`)); }
    if (s.ocekivano) l.push(`**Očekivano:** ${s.ocekivano}`);
    if (s.stvarno) l.push(`**Stvarno:** ${s.stvarno}`);
    if (s.napomena) l.push(`**Napomena:** ${s.napomena}`);
    const dok = (s.dokazi || []).map(id => poId[id]).filter(Boolean);
    if (dok.length) {
      l.push('**Dokazi:**');
      for (const b of dok.slice(0, 5)) l.push(`- ${b.id} (dan ${b.dan}, ${b.vjezba || b.ekran || ''}): "${b.tekst}"${b.slika ? ` — slika: ${b.slika}` : ''}`);
    }
    if (odluke[s.id]?.komentar) l.push(`**Komentar developera:** ${odluke[s.id].komentar}`);
    l.push('');
  }
  if (!otvoreno.length) l.push('Nema otvorenih nalaza.');
  fs.writeFileSync(path.join(dir, 'za-ispravak.md'), l.join('\n'));
}
