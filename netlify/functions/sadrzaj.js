// GET /api/sadrzaj?f=data-plus.json
// Auth: Authorization: Bearer <supabase access token>
//
// Izdaje potpisani link na datoteku u privatnom Supabase Storage bucketu, i to samo ako
// pozivatelj stvarno ima pravo na plaćeni sadržaj. Sam sadržaj nikad ne prolazi kroz ovu
// funkciju — vraća se adresa koja vrijedi pet minuta, pa datoteku povlači preglednik
// izravno iz Supabasea. Zato je funkcija sitna bez obzira koliko sadržaj naraste.
//
// Zašto uopće postoji: bez ovoga bi plaćene vježbe morale ležati u dist/ mapi, tj. javno.
const { getSupabaseAdmin, imaPravoPristupa } = require('./_lib');

const BUCKET = 'sadrzaj';
// Zatvoreni popis — bez njega bi se kroz ?f= moglo tražiti bilo što iz bucketa.
const DOZVOLJENE = new Set(['data-plus.json']);
const TRAJANJE_SEK = 300;

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const datoteka = (event.queryStringParameters && event.queryStringParameters.f) || '';
  if (!DOZVOLJENE.has(datoteka)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Unknown file' }) };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Missing bearer token' }) };
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
  if (userErr || !userData || !userData.user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Invalid session' }) };
  }

  const pravo = await imaPravoPristupa(supabaseAdmin, userData.user.id);
  if (!pravo.ok) {
    return { statusCode: 403, body: JSON.stringify({ error: 'No access', razlog: pravo.razlog }) };
  }

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(datoteka, TRAJANJE_SEK);

  if (error || !data || !data.signedUrl) {
    console.error('sadrzaj: createSignedUrl nije uspio', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not sign url' }) };
  }

  return {
    statusCode: 200,
    // Potpisani link je vezan uz korisnika i kratkog vijeka — ne smije ga nitko keširati.
    headers: { 'Cache-Control': 'no-store' },
    body: JSON.stringify({ url: data.signedUrl, trajanje: TRAJANJE_SEK }),
  };
};
