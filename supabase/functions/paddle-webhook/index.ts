// POST https://<projekt>.supabase.co/functions/v1/paddle-webhook
// Paddle → Developer tools → Notifications → nova destinacija na ovu adresu, s događajima:
//   subscription.created, subscription.updated, subscription.activated, subscription.canceled,
//   subscription.past_due, subscription.paused, subscription.resumed, subscription.trialing,
//   transaction.completed, adjustment.created, adjustment.updated
// Tajna te destinacije → `supabase secrets set PADDLE_WEBHOOK_SECRET=...`
//
// verify_jwt = false (supabase/config.toml): Paddle ne šalje Supabase JWT. Sigurnost počiva
// na provjeri potpisa (paddlePotpisValjan).
//
// Idempotencija: event_id se upiše PRIJE obrade; ako obrada pukne, red se briše i vraća
// se 500, pa Paddle pokuša ponovo. (Popravak nalaza br. 2 iz PRED-LANSIRANJE-nalazi.md.)
import {
  getSupabaseAdmin, paddlePotpisValjan, paketIzCijene, paddle,
} from '../_shared/lib.ts';

function odgovor(status: number, tekst = 'ok') { return new Response(tekst, { status }); }

Deno.serve(async (req) => {
  if (req.method !== 'POST') return odgovor(405, 'Method not allowed');
  const tijelo = await req.text();
  if (!(await paddlePotpisValjan(tijelo, req.headers.get('paddle-signature')))) {
    return odgovor(401, 'Bad signature');
  }
  let dogadaj: any;
  try { dogadaj = JSON.parse(tijelo); } catch { return odgovor(400, 'Bad JSON'); }

  const db = getSupabaseAdmin();
  const { error: dupl } = await db.from('paddle_events').insert({ id: dogadaj.event_id });
  if (dupl) {
    if ((dupl as any).code === '23505') return odgovor(200, 'already processed');
    console.error('paddle_events insert', dupl);
    return odgovor(500, 'db');
  }

  try {
    const tip: string = dogadaj.event_type || '';
    const d = dogadaj.data || {};
    if (tip.startsWith('subscription.')) await obradiPretplatu(db, d, tip);
    else if (tip === 'transaction.completed') await obradiTransakciju(db, d);
    else if (tip === 'adjustment.created' || tip === 'adjustment.updated') await obradiPovrat(db, d);
    return odgovor(200);
  } catch (e) {
    console.error('webhook obrada', dogadaj.event_type, e);
    await db.from('paddle_events').delete().eq('id', dogadaj.event_id);
    return odgovor(500, 'processing failed');
  }
});

async function korisnikZaPretplatu(db: any, d: any): Promise<string | null> {
  if (d.custom_data && d.custom_data.user_id) return d.custom_data.user_id;
  const { data } = await db.from('pretplate').select('user_id')
    .or('paddle_subscription_id.eq.' + d.id + ',paddle_customer_id.eq.' + d.customer_id).limit(1);
  return data && data[0] ? data[0].user_id : null;
}

async function obradiPretplatu(db: any, d: any, tip: string) {
  const uid = await korisnikZaPretplatu(db, d);
  if (!uid) throw new Error('subscription without user: ' + d.id);
  const stavka = (d.items && d.items[0]) || {};
  const price = stavka.price || {};
  const krajRazdoblja = (d.current_billing_period && d.current_billing_period.ends_at) || null;
  const otkazana = !!(d.scheduled_change && d.scheduled_change.action === 'cancel');
  const red: Record<string, unknown> = {
    user_id: uid,
    paddle_customer_id: d.customer_id,
    paddle_subscription_id: d.id,
    paket: paketIzCijene(price),
    status: d.status,
    // next_billed_at je kraj plaćenog vremena kad se pretplata obnavlja; kad je otkazana,
    // Paddle ga briše pa vrijedi kraj trenutnog razdoblja.
    vrijedi_do: d.next_billed_at || krajRazdoblja,
    auto_obnova: d.status !== 'canceled' && !otkazana && !!d.next_billed_at,
    cijena_iznos: price.unit_price ? Number(price.unit_price.amount) / 100 : null,
    valuta: price.unit_price ? price.unit_price.currency_code : null,
    updated_at: new Date().toISOString(),
  };
  if (tip === 'subscription.created') red.placeni_paket = red.paket;
  const { error } = await db.from('pretplate').upsert(red, { onConflict: 'user_id' });
  if (error) throw error;

  // Nova pretplata dok korisnik još ima vrijeme iz kodova: preostalo vrijeme se prenosi
  // u pretplatu (iduća naplata se pomiče), da plaćeni kod ne propadne. (provjeriti u sandboxu)
  if (tip === 'subscription.created' && d.status === 'active' && d.next_billed_at) {
    const { data: pk } = await db.from('pristup_kodom').select('vrijedi_do').eq('user_id', uid).maybeSingle();
    const ostatak = pk ? Date.parse(pk.vrijedi_do) - Date.now() : 0;
    if (ostatak > 60 * 60 * 1000) {
      const novi = new Date(Date.parse(d.next_billed_at) + ostatak).toISOString();
      await paddle('PATCH', '/subscriptions/' + d.id, { next_billed_at: novi, proration_billing_mode: 'do_not_bill' });
      await db.from('pristup_kodom').update({ vrijedi_do: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq('user_id', uid);
      await db.from('pretplate').update({ vrijedi_do: novi }).eq('user_id', uid);
    }
  }
}

async function obradiTransakciju(db: any, d: any) {
  const cd = d.custom_data || {};
  if (cd.tip === 'kodovi') {
    const stavka = (d.items && d.items[0]) || {};
    const ukupno = d.details && d.details.totals ? Number(d.details.totals.grand_total) / 100 : null;
    const { error } = await db.rpc('izdaj_kodove', {
      p_kupac: cd.user_id, p_vrsta: cd.vrsta, p_kolicina: Number(stavka.quantity || cd.kolicina),
      p_iznos: ukupno, p_valuta: d.currency_code, p_txn: d.id,
    });
    if (error) throw error;
    return;
  }
  // Naplata pretplate: paket ovog plaćenog razdoblja (bitno kad je promjena paketa zakazana).
  if (d.subscription_id) {
    const stavka = (d.items && d.items[0]) || {};
    const paket = paketIzCijene(stavka.price);
    if (paket) {
      await db.from('pretplate').update({ placeni_paket: paket, updated_at: new Date().toISOString() })
        .eq('paddle_subscription_id', d.subscription_id);
    }
  }
}

async function obradiPovrat(db: any, d: any) {
  if (d.action !== 'refund' || d.status !== 'approved' || !d.transaction_id) return;
  const { error } = await db.rpc('ponisti_kupnju', { p_txn: d.transaction_id });
  if (error) throw error;
}
