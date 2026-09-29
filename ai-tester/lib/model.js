// Poziv modela preko Claude Agent SDK-a — koristi tvoju Claude (Pro) prijavu, ne API ključ.
// Svaki poziv je samostalan (bez povijesti razgovora), pa se kontekst ne napuhuje.
import { query } from '@anthropic-ai/claude-agent-sdk';

export class LimitGreska extends Error {
  constructor(poruka, resetira, vrsta) { super(poruka); this.resetira = resetira; this.vrsta = vrsta; }
}

export class Model {
  constructor(zapisnik) {
    this.zapisnik = zapisnik;
    this.ukupno = { pozivi: 0, ulaz: 0, izlaz: 0, cacheCitanje: 0, cacheZapis: 0, dolara: 0 };
    this.limiti = {};          // zadnje poznato: { five_hour: {posto, resetira}, seven_day: {...} }
  }

  async pitaj({ model, sustav, tekst, slikaBase64 = null, maxTokena = 600 }) {
    if (process.env.AI_TESTER_SUHO) return suhiOdgovor(tekst, sustav);
    const sadrzaj = [];
    if (slikaBase64) sadrzaj.push({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: slikaBase64 } });
    sadrzaj.push({ type: 'text', text: tekst });
    async function* ulaz() {
      yield { type: 'user', message: { role: 'user', content: sadrzaj }, parent_tool_use_id: null };
    }
    const q = query({
      prompt: ulaz(),
      options: {
        model, systemPrompt: sustav, tools: [], maxTurns: 3,
        persistSession: false, settingSources: [],
        mcpServers: {}, strictMcpConfig: true, extraArgs: { 'no-chrome': null },
        thinking: { type: 'disabled' },
        env: { ...process.env, CLAUDE_AGENT_SDK_CLIENT_APP: 'croland-ai-tester/1.0', MAX_THINKING_TOKENS: '0' }
      }
    });
    let odgovor = '', greska = null; const tipovi = [];
    try {
      for await (const m of q) {
        tipovi.push(m.type + (m.subtype ? ':' + m.subtype : '') + (m.type === 'assistant' && m.message?.stop_reason ? ':' + m.message.stop_reason : ''));
        if (m.type === 'rate_limit_event') this.biljeziLimit(m.rate_limit_info);
        if (m.type === 'assistant') {
          let t = '';
          for (const b of (m.message?.content || [])) if (b.type === 'text') t += b.text;
          if (m.error) greska = m.error + (t ? ' — ' + t.slice(0, 300) : '');
          else odgovor += t;
        }
        if (m.type === 'result') {
          const u = m.usage || {};
          this.ukupno.pozivi++;
          this.ukupno.ulaz += u.input_tokens || 0;
          this.ukupno.izlaz += u.output_tokens || 0;
          this.ukupno.cacheCitanje += u.cache_read_input_tokens || 0;
          this.ukupno.cacheZapis += u.cache_creation_input_tokens || 0;
          this.ukupno.dolara += m.total_cost_usd || 0;
          if (!odgovor && typeof m.result === 'string') odgovor = m.result;
          if (m.is_error && greska && m.api_error_status) greska += ' [HTTP ' + m.api_error_status + ']';
          if (m.is_error && !greska && !(m.subtype === 'error_max_turns' && odgovor)) greska = (m.subtype || 'greska') + ' ' + (m.result || (m.errors || []).join('; ') || '');
        }
      }
    } catch (e) {
      greska = greska || String(e.message || e);
    }
    if (greska && process.env.AI_TESTER_DEBUG) console.error('[debug] ' + tipovi.filter(t => t !== 'stream_event').join(' '));
    if (greska) {
      const g = String(greska);
      const lim = this.limitBlokira();
      if (/rate_limit|usage limit|limit reached|429|hit your limit|out of extra usage/i.test(g) || lim) {
        throw new LimitGreska('Dosegnut limit: ' + g.slice(0, 200), lim?.resetira || null, lim?.vrsta || null);
      }
      if (/authentication|login|oauth|not logged|401|invalid api key/i.test(g)) {
        throw new Error('PRIJAVA: Claude nije prijavljen. Pokreni 1-INSTALIRAJ.bat ponovno i prijavi se. (' + g.slice(0, 160) + ')');
      }
      throw new Error('Model: ' + g.slice(0, 300));
    }
    return odgovor.trim();
  }

  biljeziLimit(info) {
    if (!info) return;
    const vrsta = info.rateLimitType || 'nepoznato';
    const z = this.limiti[vrsta] || (this.limiti[vrsta] = {});
    // jedinica ovdje nije sigurna (0-1 ili 0-100), pa se za odluke koristi procitajLimite()
    if (typeof info.utilization === 'number') z.dogadjajUtil = info.utilization;
    if (info.resetsAt) z.resetira = info.resetsAt < 1e12 ? info.resetsAt * 1000 : info.resetsAt;
    z.status = info.status;
    z.vrijeme = Date.now();
  }

  limitBlokira() {
    for (const [vrsta, z] of Object.entries(this.limiti)) {
      if (z.status === 'rejected') return { vrsta, resetira: z.resetira };
    }
    return null;
  }

  // Pravi postotak tjednog i petosatnog limita (ako ga Claude želi reći). Ne troši poruke.
  async procitajLimite() {
    if (process.env.AI_TESTER_SUHO) return null;
    let q = null;
    try {
      let pusti;
      const cekaj = new Promise(r => { pusti = r; });
      async function* ulaz() { await cekaj; }
      q = query({ prompt: ulaz(), options: { tools: [], persistSession: false, settingSources: [], mcpServers: {}, strictMcpConfig: true, extraArgs: { 'no-chrome': null } } });
      const fn = q.usage_EXPERIMENTAL_MAY_CHANGE_DO_NOT_RELY_ON_THIS_API_YET;
      if (typeof fn !== 'function') return null;
      const odg = await Promise.race([
        fn.call(q, { skipBehaviors: true }),
        new Promise((_, ne) => setTimeout(() => ne(new Error('timeout')), 45000))
      ]);
      pusti();
      const rl = odg && odg.rate_limits;
      if (!rl) return null;
      const van = {};
      const uzmi = (ime, o) => { if (o && typeof o.utilization === 'number') van[ime] = { posto: o.utilization, resetira: o.resets_at ? Date.parse(o.resets_at) : null }; };
      if (Array.isArray(rl.limits)) {
        for (const l of rl.limits) {
          if (l.kind === 'session') van.five_hour = { posto: l.percent, resetira: l.resets_at ? Date.parse(l.resets_at) : null };
          if (l.kind === 'weekly_all') van.seven_day = { posto: l.percent, resetira: l.resets_at ? Date.parse(l.resets_at) : null };
        }
      }
      uzmi('five_hour', rl.five_hour); uzmi('seven_day', rl.seven_day);
      for (const [k, v] of Object.entries(van)) this.limiti[k] = { ...(this.limiti[k] || {}), ...v, vrijeme: Date.now() };
      return van;
    } catch (e) {
      return null;
    } finally {
      try { q && q.close(); } catch (e) {}
    }
  }
}

// Iz odgovora izvuci prvi JSON objekt, i kad ga model omota tekstom ili ```json.
export function izvuciJson(t) {
  if (!t) return null;
  const s = t.replace(/```json|```/g, '');
  const i = s.indexOf('{');
  if (i < 0) return null;
  let dubina = 0, u_nizu = false, esc = false;
  for (let j = i; j < s.length; j++) {
    const c = s[j];
    if (u_nizu) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') u_nizu = false; continue; }
    if (c === '"') u_nizu = true;
    else if (c === '{') dubina++;
    else if (c === '}') { dubina--; if (dubina === 0) { try { return JSON.parse(s.slice(i, j + 1)); } catch (e) { return null; } } }
  }
  return null;
}

// Suhi hod (samo za provjeru skripte, bez Claudea): nasumični klikovi.
function suhiOdgovor(tekst, sustav) {
  if (/QA lead/.test(sustav)) return JSON.stringify({ sazetak: 'Suhi hod — nema pravog sadržaja.', za_ai: [{ id: 'A-1', naslov: 'Primjer nalaza', gdje: 'Lesson 0', koraci: ['otvori', 'klikni'], ocekivano: 'x', stvarno: 'y', vaznost: 2, ucestalost: 1, dokazi: ['B0001'] }], za_tebe: [{ id: 'T-1', tema: 'tezina', naslov: 'Primjer odluke', opis: 'opis', prijedlog: 'prijedlog', vaznost: 1, ucestalost: 1, dokazi: [] }] });
  if (/Današnji dan učenja je gotov|Ciljani test cjeline/.test(tekst) && /dnevnik/.test(tekst)) return JSON.stringify({ dnevnik: 'Suhi hod: kliktao sam nasumično.', pamtim: 'ništa', raspolozenje: 3, frustracija: 2, dosada: 2, osjecaj_napretka: 3, vracam_se: 'sutra', zasto: 'test', platio_bih: 'jos_ne_znam', biljeske: [] });
  if (/izlazni razgovor/.test(tekst)) return JSON.stringify({ razlog_odlaska: 'test' });
  const ekran = tekst.split('EKRAN:')[1] || '';
  const brojevi = [...ekran.matchAll(/^\[(\d+)\] (.*)$/gm)].filter(m => !/Croland|interface|Dictionary|Word game|Why this/.test(m[2])).map(m => +m[1]);
  const r = Math.random();
  const b = r < 0.08 ? { tip: 'ideja', vaznost: 1, tekst: 'Suhi hod bilješka.' } : null;
  if (/polje za upis/.test(ekran) && r < 0.3) return JSON.stringify({ misao: 'type', radnja: 'upisi', n: null, tekst: 'kuća', enter: true, biljeska: b });
  if (!brojevi.length) return JSON.stringify({ misao: 'wait', radnja: 'cekaj', biljeska: b });
  return JSON.stringify({ misao: 'random click', radnja: 'klik', n: brojevi[Math.floor(Math.random() * brojevi.length)], biljeska: b });
}
