import { Laptop, School, type LucideIcon } from 'lucide-react';
import { siteConfig } from '../config/site';

const backgroundIcons: LucideIcon[] = [Laptop, School];

export default function About() {
  const { author, topics, social } = siteConfig;
  const contactItems = [
    { label: 'Email', text: author.email, href: `mailto:${author.email}` },
    { label: 'LinkedIn', text: 'linkedin.com/in/markološić', href: social.linkedin },
    { label: 'GitHub', text: 'github.com/MarkoLosic', href: social.github },
    { label: 'Lokacija', text: author.location, href: '' },
  ].filter(({ label, href }) => label === 'Lokacija' || href.length > 0);

  return (
    <div className="wrap pt-[130px]">
      <header className="max-w-[760px]">
        <span className="eyebrow">{author.role}</span>
        <h1 className="page-title mt-2 mb-5">O meni</h1>
        {/* KORISNIK: tekstovi dolaze iz src/config/site.ts — tamo ih zameni svojim. */}
        <p className="text-lg text-muted sm:text-xl">{author.intro}</p>
      </header>

      <ul className="mt-12 grid max-w-[900px] gap-3.5">
        {author.background.map(({ title, text }, i) => {
          const Icon = backgroundIcons[i] ?? School;
          return (
            <li
              key={title}
              className="flex gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:translate-x-1.5 hover:border-accent sm:p-6"
            >
              <span className="icon-tile">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-[19px] font-semibold tracking-tight">{title}</h2>
                <p className="mt-1 text-[15.5px] text-muted">{text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="pt-20 sm:pt-28" aria-labelledby="o-blogu">
        <span className="eyebrow">O blogu</span>
        <h2 id="o-blogu" className="section-title mb-5">
          Šta ćete ovde naći
        </h2>
        <p className="mb-9 max-w-[760px] text-lg text-muted">
          {siteConfig.name} je mesto gde spajam ono što sam naučio u učionici sa onim čime se svaki dan bavim u IT-u.
        </p>
        <ul className="grid gap-[18px] sm:grid-cols-3">
          {topics.map(({ title, text }, i) => (
            <li key={title} className="card hoverable">
              <span className="mb-3.5 inline-block font-mono text-xs font-medium tracking-[0.08em] text-accent-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[19px] leading-snug font-semibold tracking-tight">{title}</h3>
              <p className="mt-2.5 text-[15px] text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mt-20 grid gap-8 rounded-[20px] border border-line p-[clamp(28px,5vw,56px)] sm:mt-28 lg:grid-cols-[1.2fr_.8fr] lg:gap-12"
        style={{
          background:
            'radial-gradient(600px circle at 0% 0%, var(--glow-a), transparent 60%), radial-gradient(600px circle at 100% 100%, var(--glow-b), transparent 60%), var(--surface)',
        }}
        aria-labelledby="kontakt"
      >
        <div>
          <span className="eyebrow">Kontakt</span>
          <h2 id="kontakt" className="mb-4 font-head text-[clamp(28px,3.6vw,42px)] leading-[1.1] font-bold tracking-[-0.03em]">
            Javite se
          </h2>
          <p className="max-w-[520px] text-[17px] text-muted">
            Pitanja, predlozi, ideja za temu ili samo pozdrav — rado odgovaram.
          </p>
        </div>
        <ul className="grid content-center">
          {contactItems.map(({ label, text, href }) => (
            <li
              key={label}
              className="flex flex-col gap-0.5 border-b border-line py-3.5 text-[15.5px] break-words last:border-b-0"
            >
              <span className="font-mono text-[11.5px] font-medium tracking-[0.1em] text-muted uppercase">{label}</span>
              {href ? (
                <a
                  href={href}
                  rel={href.startsWith('mailto:') ? undefined : 'me noopener'}
                  className="focus-ring rounded transition-colors hover:text-accent"
                >
                  {text}
                </a>
              ) : (
                <span>{text}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
