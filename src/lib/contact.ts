// Deli se između kontakt forme (browser) i api/contact.ts (Vercel funkcija),
// zato ne sme da uvozi ništa što zavisi od okruženja.

export const CONTACT_TOPICS = ['question', 'collaboration', 'copyright', 'bug', 'other'] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  message: { min: 10, max: 4000 },
  // Forma poslata brže od ovoga je skoro sigurno bot.
  minFillMs: 3000,
} as const;

export interface ContactPayload {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
  locale: string;
  page: string; // stranica sa koje je poslato (npr. /autorska-prava)
  website: string; // zamka za botove: ljudi ne vide ovo polje, pa mora ostati prazno
  elapsedMs: number;
}

export type ContactField = 'name' | 'email' | 'topic' | 'message';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Vraća polja koja nisu ispravna (prazan niz = sve u redu).
export function invalidContactFields(data: Pick<ContactPayload, ContactField>): ContactField[] {
  const bad: ContactField[] = [];
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();
  if (name.length < CONTACT_LIMITS.name.min || name.length > CONTACT_LIMITS.name.max) bad.push('name');
  if (email.length > CONTACT_LIMITS.email.max || !EMAIL_RE.test(email)) bad.push('email');
  if (!(CONTACT_TOPICS as readonly string[]).includes(data.topic)) bad.push('topic');
  if (message.length < CONTACT_LIMITS.message.min || message.length > CONTACT_LIMITS.message.max) bad.push('message');
  return bad;
}
