// Regresijski snimak prikaza: node snimi.js <baseUrl> <stranica> <jezik> <izlaz.json>
// Prolazi iste ekrane kao korisnik (gost, prijavljen s pretplatom) i biljezi vidljivi tekst
// i tekstualne atribute (title, aria-label, placeholder, alt, data-kratko).
const { chromium } = require('playwright');
const fs = require('fs');
const [,, base, stranica, jezik, izlaz] = process.argv;
const LAZNI = fs.readFileSync(__dirname + '/lazni-supabase.js', 'utf8');
const VRIJEME = new Date('2026-10-05T10:00:00+02:00');
const out = [], greske = [];

async function nova(browser, opt) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'en-GB', timezoneId: 'Europe/Zagreb' });
  await ctx.addInitScript(({ jezik, gost, bezJezika }) => {
    let s = 12345; Math.random = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
    window.__JEZIK = jezik; window.__GOST = gost;
    try { if (!bezJezika && !sessionStorage.getItem('__init')) { localStorage.setItem('croland.jezik', jezik); sessionStorage.setItem('__init', '1'); } } catch (e) {}
  }, { jezik, gost: !!opt.gost, bezJezika: !!opt.bezJezika });
  await ctx.route('**/vendor/supabase-*.js', r => r.fulfill({ contentType: 'text/javascript', body: LAZNI }));
  await ctx.route(/supabase\.co|googleapis|gstatic|paddle/, r => r.abort());
  // slike i zvuk: nema ih u testnoj mapi; odbij odmah (inace stizu 404 u stvarnom vremenu = sum)
  await ctx.route(/\.(webp|png|jpe?g|gif|svg|mp3|ogg|wav|m4a)(\?|$)/i, r => r.abort());
  const page = await ctx.newPage();
  await page.clock.install({ time: VRIJEME });
  page.on('pageerror', e => greske.push(String(e)));
  return { ctx, page };
}
async function snimi(page, scen, korak) {
  await page.clock.runFor(400); await page.waitForTimeout(50);
  const d = await page.evaluate(() => {
    // savjet uz rjecnik se pojavi po stvarnom vremenu (sum izmedu dva prolaza) - ne biljezi se
    const sv = document.getElementById('savjetRj'); const svd = sv && sv.style.display; if (sv) sv.style.display = 'none';
    const at = [];
    document.querySelectorAll('[title],[aria-label],[placeholder],[alt],[data-kratko],[data-tip]').forEach(el => {
      for (const a of ['title', 'aria-label', 'placeholder', 'alt', 'data-kratko', 'data-tip'])
        if (el.hasAttribute(a)) at.push(a + '=' + el.getAttribute(a));
    });
    const tekst = document.body.innerText; if (sv) sv.style.display = svd;
    return { url: location.pathname.split('/').pop(), naslov: document.title, lang: document.documentElement.lang, tekst: tekst, atr: at };
  });
  out.push(Object.assign({ scen, korak }, d));
}
async function idi(page, ...a) { await page.evaluate(a => window.idi.apply(null, a), a); }
async function ucitaj(page) {
  await page.goto(base + '/' + stranica);
  for (let i = 0; i < 20; i++) { await page.clock.runFor(200); await page.waitForTimeout(30); }
}
(async () => {
  const browser = await chromium.launch();
  // C: prvo otvaranje, jezik nije izabran -> birac jezika
  { const { ctx, page } = await nova(browser, { gost: true, bezJezika: true });
    await page.goto(base + '/' + stranica); await page.clock.runFor(800);
    await snimi(page, 'prvo', 'birac jezika'); await ctx.close(); }
  // A: gost
  { const { ctx, page } = await nova(browser, { gost: true });
    await ucitaj(page); await snimi(page, 'gost', 'start');
    for (const v of ['main', 'lessons', 'account', 'options', 'dictionary', 'mini', 'daily']) { await idi(page, v); await snimi(page, 'gost', v); }
    await idi(page, 'unit', 'Lesson', 1); await snimi(page, 'gost', 'Lesson 1 (prijava)');
    await ctx.close(); }
  // B: prijavljen, pretplata, djelomican napredak
  { const { ctx, page } = await nova(browser, {});
    await ucitaj(page); await snimi(page, 'plus', 'start');
    for (const v of ['main', 'lessons']) { await idi(page, v); await snimi(page, 'plus', v); }
    for (const [t, r] of [['Lesson', 1], ['Grammar', 3], ['Test', 2]]) {
      await page.evaluate(([t, r]) => window.pregledCjeline(t, r), [t, r]); await snimi(page, 'plus', 'pregled ' + t + ' ' + r);
      await idi(page, 'lessons');
    }
        for (const v of ['progress', 'dictionary', 'dictTest', 'mini', 'daily', 'account', 'options']) { await idi(page, v); await snimi(page, 'plus', v); }
    await page.setViewportSize({ width: 390, height: 844 }); await idi(page, 'main'); await snimi(page, 'plus', 'main (mobitel)');
    await idi(page, 'lessons'); await snimi(page, 'plus', 'lessons (mobitel)');
    await page.setViewportSize({ width: 1280, height: 900 });
    const cjeline = [['Lesson', 0], ['Lesson', 1], ['Vocabulary', 2], ['Grammar', 2], ['Practice', 3], ['Lesson', 7], ['Practice', 12], ['Grammar', 15]];
    for (const [t, r] of cjeline) {
      const n = await page.evaluate(c => (window.PODACI.igre || []).filter(g => g.cjelina === c).length, t + ' ' + r);
      for (let i = 0; i < Math.min(n, 14); i++) { await idi(page, 'unit', t, r, i); await snimi(page, 'plus', `${t} ${r} #${i}`); }
    }
    await idi(page, 'unit', 'Test', 1); await snimi(page, 'plus', 'Test 1 uvod');
    await idi(page, 'options');
    const drugi = jezik === 'en' ? 'de' : 'en';
    await Promise.all([page.waitForNavigation({ timeout: 15000 }).catch(() => {}), page.evaluate(j => window.odaberiJezik(j), drugi)]);
    for (let i = 0; i < 20; i++) { await page.clock.runFor(200).catch(() => {}); await page.waitForTimeout(30); } await snimi(page, 'plus', 'nakon promjene jezika -> ' + drugi);
    await ctx.close(); }
  await browser.close();
  fs.writeFileSync(izlaz, JSON.stringify({ koraci: out, greske }, null, 1));
  console.log(izlaz, 'koraka:', out.length, 'JS gresaka:', greske.length, greske.slice(0, 5));
})();
