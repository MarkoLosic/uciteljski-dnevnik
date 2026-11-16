// Vercel funkcija: POST /api/contact → mejl autoru preko Resend-a (https://resend.com).
// Adresa primaoca je samo u promjenljivim okruženja na Vercelu, nikad u kodu sajta:
//   RESEND_API_KEY     — ključ sa resend.com/api-keys
//   CONTACT_TO_EMAIL   — gdje stižu poruke
//   CONTACT_FROM_EMAIL — opciono; bez verifikovanog domena ostaje onboarding@resend.dev
// Ekstenzija .js je obavezna: Vercel izvršava funkciju kao ES modul.
import { CONTACT_LIMITS, invalidContactFields, type ContactPayload, type ContactTopic } from '../src/lib/contact.js';

const TOPIC_LABELS: Record<ContactTopic, string> = {
  question: 'Pitanje',
  collaboration: 'Saradnja',
  copyright: 'Autorska prava / preuzet sadržaj',
  bug: 'Greška na sajtu',
  other: 'Drugo',
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });

const str = (value: unknown, max: number) => (typeof value === 'string' ? value.slice(0, max) : '');

function parsePayload(raw: unknown): ContactPayload | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const r = raw as Record<string, unknown>;
  return {
    name: str(r.name, 200),
    email: str(r.email, 200),
    topic: str(r.topic, 40) as ContactTopic,
    message: str(r.message, CONTACT_LIMITS.message.max + 100),
    locale: str(r.locale, 10),
    page: str(r.page, 300),
    website: str(r.website, 200),
    elapsedMs: typeof r.elapsedMs === 'number' ? r.elapsedMs : 0,
  };
}

export async function POST(request: Request): Promise<Response> {
  // Samo forma sa istog sajta (i Vercel preview adresa) — ne drugi sajtovi koji bi slali preko nas.
  const origin = request.headers.get('origin');
  if (!origin || new URL(origin).host !== new URL(request.url).host) return json(403, { error: 'origin' });

  let data: ContactPayload | null;
  try {
    data = parsePayload(await request.json());
  } catch {
    data = null;
  }
  if (!data) return json(400, { error: 'invalid' });

  // Bot: popunio skriveno polje ili poslao prebrzo. Odgovaramo „uspjeh“ da ne pokušava ponovo.
  if (data.website !== '' || data.elapsedMs < CONTACT_LIMITS.minFillMs) return json(200, { ok: true });

  const invalid = invalidContactFields(data);
  if (invalid.length > 0) return json(400, { error: 'invalid', fields: invalid });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error('Kontakt forma: nedostaje RESEND_API_KEY ili CONTACT_TO_EMAIL.');
    return json(500, { error: 'not-configured' });
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const text = [
    `Ime: ${name}`,
    `Mejl: ${email}`,
    `Tema: ${TOPIC_LABELS[data.topic]}`,
    `Jezik: ${data.locale || '-'}`,
    `Stranica: ${data.page || '-'}`,
    '',
    data.message.trim(),
    '',
    '—',
    'Poslato preko kontakt forme na sajtu. Odgovor (Reply) ide direktno pošiljaocu.',
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'učiteljskidnevnik.online <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `[Kontakt] ${TOPIC_LABELS[data.topic]}: ${name}`.replace(/[\r\n]+/g, ' '),
      text,
    }),
  });

  if (!res.ok) {
    console.error('Kontakt forma: Resend je vratio', res.status, await res.text());
    return json(502, { error: 'send-failed' });
  }
  return json(200, { ok: true });
}
