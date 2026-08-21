// GET https://<projekt>.supabase.co/functions/v1/sadrzaj?f=data-plus.json
// Auth: Authorization: Bearer <supabase access token>
//
// Izdaje potpisani link na datoteku u privatnom Supabase Storage bucketu, i to samo ako
// pozivatelj stvarno ima pravo na plaćeni sadržaj. Sam sadržaj nikad ne prolazi kroz ovu
// funkciju — vraća se adresa koja vrijedi pet minuta, pa datoteku povlači preglednik
// izravno iz Supabasea. Zato je funkcija sitna bez obzira koliko sadržaj naraste.
//
// Zašto uopće postoji: bez ovoga bi plaćene vježbe morale ležati u dist/ mapi, tj. javno.
import { getSupabaseAdmin, imaPravoPristupa, korisnikIzZahtjeva, corsZaglavlja, json } from '../_shared/lib.ts';

const BUCKET = 'sadrzaj';
// Zatvoreni popis — bez njega bi se kroz ?f= moglo tražiti bilo što iz bucketa.
const DOZVOLJENE = new Set(['data-plus.json']);
const TRAJANJE_SEK = 300;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsZaglavlja(req) });
  if (req.method !== 'GET') return json(req, 405, { error: 'Method not allowed' });

  const datoteka = new URL(req.url).searchParams.get('f') || '';
  if (!DOZVOLJENE.has(datoteka)) return json(req, 400, { error: 'Unknown file' });

  const supabaseAdmin = getSupabaseAdmin();
  const user = await korisnikIzZahtjeva(supabaseAdmin, req);
  if (!user) return json(req, 401, { error: 'Invalid session' });

  const pravo = await imaPravoPristupa(supabaseAdmin, user.id);
  if (!pravo.ok) return json(req, 403, { error: 'No access', razlog: pravo.razlog });

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(datoteka, TRAJANJE_SEK);

  if (error || !data || !data.signedUrl) {
    console.error('sadrzaj: createSignedUrl nije uspio', error);
    return json(req, 500, { error: 'Could not sign url' });
  }

  // Potpisani link je vezan uz korisnika i kratkog vijeka — ne smije ga nitko keširati.
  return json(req, 200, { url: data.signedUrl, trajanje: TRAJANJE_SEK }, { 'Cache-Control': 'no-store' });
});
