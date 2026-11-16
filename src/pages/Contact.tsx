import { useRef, useState, type FormEvent } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CircleCheck, Send, ShieldCheck } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { pageMeta } from '../lib/seo';
import { usePageMeta } from '../lib/usePageMeta';
import {
  CONTACT_LIMITS,
  CONTACT_TOPICS,
  invalidContactFields,
  type ContactField,
  type ContactPayload,
  type ContactTopic,
} from '../lib/contact';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'focus-ring w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-[16px] text-ink transition-colors placeholder:text-muted hover:border-accent/60 focus:border-accent aria-[invalid=true]:border-[var(--danger)]';

const isTopic = (value: string | null): value is ContactTopic =>
  value !== null && (CONTACT_TOPICS as readonly string[]).includes(value);

export default function Contact() {
  const { locale, t } = useLocale();
  const c = t.contact;
  usePageMeta(pageMeta.contact(t));
  const { state } = useLocation();
  const [params] = useSearchParams();
  const initialTopic = params.get('tema');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<ContactTopic>(isTopic(initialTopic) ? initialTopic : 'question');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [invalid, setInvalid] = useState<ContactField[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const fromPage = typeof state === 'object' && state !== null && 'from' in state ? String(state.from) : '';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const bad = invalidContactFields({ name, email, topic, message });
    setInvalid(bad);
    if (bad.length > 0) {
      formRef.current?.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }

    setStatus('sending');
    const payload: ContactPayload = {
      name,
      email,
      topic,
      message,
      locale,
      page: fromPage,
      website,
      elapsedMs: Date.now() - startedAt.current,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus('error');
    }
  }

  function reset() {
    startedAt.current = Date.now();
    setInvalid([]);
    setStatus('idle');
  }

  const fieldError = (field: ContactField) =>
    invalid.includes(field) ? (
      <p id={`${field}-error`} className="mt-1.5 text-[14px] font-medium text-[var(--danger)]">
        {c.errors[field]}
      </p>
    ) : null;
  const describedBy = (field: ContactField, hint?: string) =>
    [invalid.includes(field) ? `${field}-error` : '', hint ?? ''].filter(Boolean).join(' ') || undefined;

  return (
    <div className="wrap pt-[130px]">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
        <header className="max-w-[520px]">
          <span className="eyebrow">{c.eyebrow}</span>
          <h1 className="page-title mt-2 mb-5">{c.title}</h1>
          <p className="text-lg text-muted sm:text-xl">{c.intro}</p>
          <p className="mt-8 flex items-start gap-3 text-[15px] text-muted">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-accent" />
            <span>{c.privacy}</span>
          </p>
        </header>

        <div className="card">
          {status === 'sent' ? (
            <div ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start py-6 outline-none">
              <CircleCheck aria-hidden="true" className="h-10 w-10 text-accent" />
              <h2 className="mt-4 font-head text-2xl font-semibold tracking-tight">{c.successTitle}</h2>
              <p className="mt-2 text-muted">{c.successText}</p>
              <button type="button" onClick={reset} className="btn btn-ghost focus-ring mt-7">
                {c.sendAnother}
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[14.5px] font-medium">
                    {c.fields.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={CONTACT_LIMITS.name.max}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={invalid.includes('name')}
                    aria-describedby={describedBy('name')}
                    className={inputClass}
                  />
                  {fieldError('name')}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[14.5px] font-medium">
                    {c.fields.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    maxLength={CONTACT_LIMITS.email.max}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={invalid.includes('email')}
                    aria-describedby={describedBy('email', 'email-hint')}
                    className={inputClass}
                  />
                  {fieldError('email')}
                  <p id="email-hint" className="mt-1.5 text-[13.5px] text-muted">
                    {c.fields.emailHint}
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="topic" className="mb-1.5 block text-[14.5px] font-medium">
                  {c.fields.topic}
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={topic}
                  onChange={(e) => isTopic(e.target.value) && setTopic(e.target.value)}
                  aria-invalid={invalid.includes('topic')}
                  aria-describedby={describedBy('topic')}
                  className={inputClass}
                >
                  {CONTACT_TOPICS.map((id) => (
                    <option key={id} value={id}>
                      {c.topics[id]}
                    </option>
                  ))}
                </select>
                {fieldError('topic')}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-[14.5px] font-medium">
                  {c.fields.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  maxLength={CONTACT_LIMITS.message.max}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={invalid.includes('message')}
                  aria-describedby={describedBy('message', 'message-hint')}
                  className={`${inputClass} resize-y`}
                />
                {fieldError('message')}
                <p id="message-hint" className="mt-1.5 text-[13.5px] text-muted">
                  {c.fields.messageHint(CONTACT_LIMITS.message.max)}
                </p>
              </div>

              {/* Zamka za botove: sakriveno od ljudi i čitača ekrana. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">{c.fields.honeypot}</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-xl border border-[var(--danger)] px-4 py-3 text-[15px] text-[var(--danger)]">
                  {c.errorText}
                </p>
              )}

              <div>
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary focus-ring disabled:opacity-60">
                  <Send aria-hidden="true" className="h-4 w-4" />
                  {status === 'sending' ? c.sending : c.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
