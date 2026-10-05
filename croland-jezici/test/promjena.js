// Napredak stecen na jeziku A, pa promjena na B: brojke u mrezi napretka moraju ostati iste.
const { chromium } = require('playwright'); const fs = require('fs');
const [,, base, odStr, odJez, doJez] = process.argv;
const LAZNI = fs.readFileSync(__dirname + '/lazni-supabase.js', 'utf8');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(j => { window.__JEZIK = j; try { if (!sessionStorage.getItem('__i')) { localStorage.setItem('croland.jezik', j); sessionStorage.setItem('__i', 1); } } catch (e) {} }, odJez);
  await ctx.route('**/vendor/supabase-*.js', r => r.fulfill({ contentType: 'text/javascript', body: LAZNI }));
  await ctx.route(/supabase\.co|googleapis|gstatic|paddle|\.(webp|png|mp3)/, r => r.abort());
  const p = await ctx.newPage(); await p.goto(base + '/' + odStr); await p.waitForTimeout(2500);
  const mreza = async () => { await p.evaluate(() => window.idi('progress')); await p.waitForTimeout(2500);
    return p.evaluate(() => (document.body.innerText.match(/\d+ \/ \d+/g) || []).join(' ')); };
  const prije = await mreza();
  await Promise.all([p.waitForNavigation({ timeout: 15000 }).catch(() => {}), p.evaluate(j => window.odaberiJezik(j), doJez)]);
  await p.waitForTimeout(3000);
  const url = p.url().split('/').pop();
  const poslije = await mreza();
  console.log(`${odJez} -> ${doJez} (${url}): ` + (prije === poslije ? 'ISTO' : 'RAZLICITO') + '\n  prije:   ' + prije.slice(0, 160) + '\n  poslije: ' + poslije.slice(0, 160));
  await b.close();
})();
