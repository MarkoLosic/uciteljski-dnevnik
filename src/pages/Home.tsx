import { Link } from 'react-router-dom';
import { Laptop, School, type LucideIcon } from 'lucide-react';
import { siteConfig } from '../config/site';
import { getRecentPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import PixelIcon, { type PixelIconName } from '../components/PixelIcon';

const backgroundIcons: LucideIcon[] = [Laptop, School];

const heroChips = [
  { label: 'Razredna nastava', className: 'top-[6%] -right-[6%] max-lg:-right-[2%]', color: '' },
  { label: 'QA inženjer', className: 'top-[22%] -left-[10%] max-lg:-left-[4%] [animation-delay:-2s]', color: '[--c:var(--accent-2)]' },
  { label: 'AI u nastavi', className: 'top-[72%] -right-[8%] max-lg:-right-[2%] [animation-delay:-4s]', color: '[--c:var(--cat-amber)]' },
] as const;

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Home() {
  const recentPosts = getRecentPosts(3);
  const { author, topics, social } = siteConfig;
  const socialLinks = (
    [
      { label: 'GitHub', href: social.github, icon: 'github' },
      { label: 'LinkedIn', href: social.linkedin, icon: 'linkedin' },
      { label: 'Email', href: `mailto:${author.email}`, icon: 'mail' },
    ] satisfies { label: string; href: string; icon: PixelIconName }[]
  ).filter(({ href }) => href.length > 0);

  return (
    <>
      <section className="wrap grid items-center gap-8 pt-[120px] pb-16 lg:min-h-svh lg:grid-cols-[1.15fr_.85fr] lg:gap-14 lg:pt-[130px]">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13.5px] text-muted">
            <i className="status-dot" />
            {author.role} · {author.location}
          </span>
          <h1 className="mt-5 mb-5 font-head text-[clamp(38px,6.2vw,74px)] leading-[1.04] font-bold tracking-[-0.035em] text-balance">
            Zdravo, ja sam <span className="grad">{author.name}</span>
          </h1>
          <p className="max-w-[580px] text-[clamp(16.5px,1.6vw,19px)] text-muted">{author.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/blog" className="btn btn-primary focus-ring">
              Pročitaj blog
              <PixelIcon name="arrow" />
            </Link>
            <Link to="/o-meni" className="btn btn-ghost focus-ring">
              Više o meni
            </Link>
          </div>
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

        {/* KORISNIK: ovde može ići tvoja fotografija umesto inicijala (npr. <img className="photo object-cover" …>). */}
        <div aria-hidden="true" className="grid justify-items-center max-lg:order-first">
          <div className="relative aspect-square w-[min(340px,72%)]">
            <div className="photo-ring" />
            <div className="photo grid place-items-center font-head text-[clamp(56px,9vw,104px)] font-bold tracking-tight">
              <span className="grad">{initials(author.name)}</span>
            </div>
            {heroChips.map(({ label, className, color }) => (
              <span key={label} className={`float-chip max-sm:px-2.5 max-sm:py-1.5 max-sm:text-[11.5px] ${className} ${color}`}>
                <i />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pt-12 sm:pt-20" aria-labelledby="ko-sam-ja">
        <span className="eyebrow">01 — Ko sam ja</span>
        <h2 id="ko-sam-ja" className="section-title mb-11">
          Između učionice i IT-a
        </h2>
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

      <section className="wrap pt-20 sm:pt-28" aria-labelledby="o-cemu-pisem">
        <span className="eyebrow">02 — Teme</span>
        <h2 id="o-cemu-pisem" className="section-title mb-11">
          O čemu pišem
        </h2>
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

      <section className="wrap pt-20 sm:pt-28" aria-labelledby="najnovije">
        <span className="eyebrow">03 — Blog</span>
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <h2 id="najnovije" className="section-title">
            Najnovije sa bloga
          </h2>
          {recentPosts.length > 0 && (
            <Link
              to="/blog"
              className="focus-ring inline-flex items-center gap-2 rounded font-semibold text-accent hover:underline"
            >
              Svi članci <PixelIcon name="arrow" size={16} />
            </Link>
          )}
        </div>
        {recentPosts.length > 0 ? (
          <ul className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState headingLevel={3} title="Još nema članaka" message="Prvi članci su u pripremi. Navratite uskoro!" />
        )}
      </section>
    </>
  );
}
