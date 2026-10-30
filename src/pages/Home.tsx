import { Link } from 'react-router-dom';
import { Laptop, School, type LucideIcon } from 'lucide-react';
import { siteConfig } from '../config/site';
import { getRecentPosts } from '../lib/posts';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import PixelIcon, { type PixelIconName } from '../components/PixelIcon';
import { useLocale } from '../i18n/LocaleContext';
import { usePageMeta } from '../lib/usePageMeta';

const backgroundIcons: LucideIcon[] = [Laptop, School];

const heroChips = [
  { className: 'top-[6%] -right-[6%] max-lg:-right-[2%]', color: '' },
  { className: 'top-[22%] -left-[10%] max-lg:-left-[4%] [animation-delay:-2s]', color: '[--c:var(--accent-2)]' },
  { className: 'top-[72%] -right-[8%] max-lg:-right-[2%] [animation-delay:-4s]', color: '[--c:var(--cat-amber)]' },
] as const;

export default function Home() {
  const { locale, t, paths } = useLocale();
  const recentPosts = getRecentPosts(locale, 3);
  const { social } = siteConfig;
  const author = { ...siteConfig.author, ...t.author };
  const { topics } = t;
  usePageMeta({ title: null, description: t.site.description });
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
            {t.home.greeting} <span className="grad">{author.name}</span>
          </h1>
          <p className="max-w-[580px] text-[clamp(16.5px,1.6vw,19px)] text-muted">{author.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={paths.blog} className="btn btn-primary focus-ring">
              {t.home.readBlog}
              <PixelIcon name="arrow" />
            </Link>
            <Link to={paths.about} className="btn btn-ghost focus-ring">
              {t.home.moreAboutMe}
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

        {/* KORISNIK: fotografija je u public/slike/marko-losic.jpg — zameni fajl da promeniš sliku. */}
        <div aria-hidden="true" className="grid justify-items-center max-lg:order-first">
          <div className="relative aspect-square w-[min(340px,72%)]">
            <div className="photo-ring" />
            <img src="/slike/marko-losic.jpg" alt="" width={400} height={400} className="photo h-[calc(100%-10px)] w-[calc(100%-10px)] object-cover" />
            {heroChips.map(({ className, color }, i) => (
              <span key={className} className={`float-chip max-sm:px-2.5 max-sm:py-1.5 max-sm:text-[11.5px] ${className} ${color}`}>
                <i />
                {t.home.chips[i]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pt-12 sm:pt-20" aria-labelledby="ko-sam-ja">
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

      <section className="wrap pt-20 sm:pt-28" aria-labelledby="o-cemu-pisem">
        <span className="eyebrow">{t.home.topicsEyebrow}</span>
        <h2 id="o-cemu-pisem" className="section-title mb-11">
          {t.home.topicsTitle}
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
        <span className="eyebrow">{t.home.blogEyebrow}</span>
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <h2 id="najnovije" className="section-title">
            {t.home.blogTitle}
          </h2>
          {recentPosts.length > 0 && (
            <Link
              to={paths.blog}
              className="focus-ring inline-flex items-center gap-2 rounded font-semibold text-accent hover:underline"
            >
              {t.blog.allPosts} <PixelIcon name="arrow" size={16} />
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
          <EmptyState headingLevel={3} title={t.blog.emptyTitle} message={t.blog.emptyMessage} />
        )}
      </section>
    </>
  );
}
