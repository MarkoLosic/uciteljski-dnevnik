import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { useLocale } from '../i18n/LocaleContext';
import { localeBase } from '../i18n/paths';
import { getAllPosts } from '../lib/posts';
import { hasCountries } from '../lib/countries';

const linkClass = 'focus-ring rounded py-2 transition-colors hover:text-accent';

export default function Footer() {
  const { locale, t, paths } = useLocale();
  const { social } = siteConfig;
  const external = [
    { label: 'GitHub', href: social.github },
    { label: 'LinkedIn', href: social.linkedin },
  ].filter((link) => link.href);

  return (
    <footer className="wrap mt-24 flex print:hidden flex-wrap items-center justify-between gap-3 border-t border-line pt-7 pb-10 text-sm text-muted max-sm:flex-col max-sm:text-center">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
      </p>
      <p>
        {t.footer.author}: {siteConfig.author.name}
      </p>
      <nav aria-label={t.footer.label} className="flex flex-wrap justify-center gap-x-4">
        <a href="/pripreme/index.html" className={linkClass}>
          {t.nav.pripreme}
        </a>
        {hasCountries(locale) && (
          <Link to={paths.world} className={linkClass}>
            {t.nav.world}
          </Link>
        )}
        <Link to={paths.about} className={linkClass}>
          {t.nav.about}
        </Link>
        <a href={`mailto:${siteConfig.author.email}`} className={linkClass}>
          {t.footer.contact}
        </a>
        {external.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {label}
          </a>
        ))}
        {/* RSS pravi build (vite.config.ts), samo za jezike koji imaju članke */}
        {getAllPosts(locale).length > 0 && (
          <a href={`${localeBase(locale)}/rss.xml`} type="application/rss+xml" className={linkClass}>
            {t.footer.rss}
          </a>
        )}
      </nav>
    </footer>
  );
}
