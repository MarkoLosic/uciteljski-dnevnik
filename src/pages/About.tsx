import { Laptop, School, type LucideIcon } from 'lucide-react';
import { siteConfig } from '../config/site';
import PixelIcon, { type PixelIconName } from '../components/PixelIcon';
import { useLocale } from '../i18n/LocaleContext';
import { usePageMeta } from '../lib/usePageMeta';
import { pageMeta } from '../lib/seo';

const backgroundIcons: LucideIcon[] = [Laptop, School];

const heroChips = [
  { className: 'top-[6%] -right-[6%] max-lg:-right-[2%]', color: '' },
  { className: 'top-[22%] -left-[10%] max-lg:-left-[4%] [animation-delay:-2s]', color: '[--c:var(--accent-2)]' },
  { className: 'top-[72%] -right-[8%] max-lg:-right-[2%] [animation-delay:-4s]', color: '[--c:var(--cat-amber)]' },
] as const;

export default function About() {
  const { t } = useLocale();
  const { social } = siteConfig;
  const author = { ...siteConfig.author, ...t.author };
  const { topics } = t;
  usePageMeta(pageMeta.about(t));

  const socialLinks = (
    [
      { label: 'LinkedIn', href: social.linkedin, icon: 'linkedin' },
      { label: 'Email', href: `mailto:${author.email}`, icon: 'mail' },
    ] satisfies { label: string; href: string; icon: PixelIconName }[]
  ).filter(({ href }) => href.length > 0);

  const contactItems: { label: string; text: string; href: string }[] = [
    { label: 'Email', text: author.email, href: `mailto:${author.email}` },
    { label: 'LinkedIn', text: 'linkedin.com/in/markološić', href: social.linkedin },
    { label: t.about.location, text: author.location, href: '' },
  ].filter(({ label, href }) => label === t.about.location || href.length > 0);

  return (
    <div className="wrap pt-[96px] sm:pt-[130px]">
      {/* Lično predstavljanje autora sa fotografijom */}
      <section className="grid items-center gap-8 pb-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13.5px] text-muted">
            <i className="status-dot" />
            {author.role} · {author.location}
          </span>
          <h1 className="mt-5 mb-5 font-head text-[clamp(36px,5.6vw,64px)] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
            {t.home.greeting} <span className="grad">{author.name}</span>
          </h1>
          <p className="max-w-[600px] text-[clamp(16.5px,1.6vw,19px)] text-muted">{author.intro}</p>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                rel={href.startsWith('mailto:') ? undefined : 'me noopener'}
                className="focus-ring grid h-[42px] w-[42px] place-items-center rounded-xl border border-line text-muted transition hover:-translate-y-0.5 hover:border-accent hover:bg-surface hover:text-accent"
              >
                <PixelIcon name={icon} />
              </a>
            ))}
            <span className="inline-flex items-center gap-2 text-sm text-muted max-sm:w-full sm:ml-2.5">
              <PixelIcon name="pin" />
              {author.location}
            </span>
          </div>
        </div>

        <div aria-hidden="true" className="grid justify-items-center max-lg:order-first">
          <div className="relative aspect-square w-[min(340px,72%)]">
            <div className="photo-ring" />
            <img
              src="/slike/marko-losic.jpg"
              alt=""
              width={400}
              height={400}
              className="photo h-[calc(100%-10px)] w-[calc(100%-10px)] object-cover"
            />
            {heroChips.map(({ className, color }, i) => (
              <span
                key={className}
                className={`float-chip max-sm:px-2.5 max-sm:py-1.5 max-sm:text-[11.5px] ${className} ${color}`}
              >
                <i />
                {t.home.chips[i]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Između učionice i IT-a */}
      <section className="pt-12 sm:pt-20" aria-labelledby="ko-sam-ja">
        <span className="eyebrow">{t.home.whoEyebrow}</span>
        <h2 id="ko-sam-ja" className="section-title mb-11">
          {t.home.whoTitle}
        </h2>
        <img
          src="/slike/ucionica-i-it-1200.webp"
          srcSet="/slike/ucionica-i-it-1200.webp 1200w, /slike/ucionica-i-it-2000.webp 2000w"
          sizes="(min-width: 1200px) 1160px, calc(100vw - 40px)"
          width={2000}
          height={848}
          loading="lazy"
          alt={t.home.whoImageAlt}
          className="mb-[18px] h-auto w-full rounded-[20px] border border-line"
        />
        <ul className="grid gap-[18px] md:grid-cols-2">
          {author.background.map(({ title, text }, i) => {
            const Icon = backgroundIcons[i] ?? School;
            return (
              <li key={title} className="card hoverable">
                <span className="icon-tile">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2.5 text-[15.5px] text-muted">{text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="pt-20 sm:pt-28" aria-labelledby="o-blogu">
        <span className="eyebrow">{t.about.blogEyebrow}</span>
        <h2 id="o-blogu" className="section-title mb-5">
          {t.about.blogTitle}
        </h2>
        <p className="mb-9 max-w-[760px] text-lg text-muted">{t.about.blogText(siteConfig.name)}</p>
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
          <span className="eyebrow">{t.about.contactEyebrow}</span>
          <h2
            id="kontakt"
            className="mb-4 font-head text-[clamp(28px,3.6vw,42px)] leading-[1.1] font-bold tracking-[-0.03em]"
          >
            {t.about.contactTitle}
          </h2>
          <p className="max-w-[520px] text-[17px] text-muted">{t.about.contactText}</p>
        </div>
        <ul className="grid content-center">
          {contactItems.map(({ label, text, href }) => (
            <li
              key={label}
              className="flex flex-col gap-0.5 border-b border-line py-3.5 text-[15.5px] break-words last:border-b-0"
            >
              <span className="font-mono text-[11.5px] font-medium tracking-[0.1em] text-muted uppercase">
                {label}
              </span>
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
