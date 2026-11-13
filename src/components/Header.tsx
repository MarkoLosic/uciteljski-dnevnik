import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../config/site';
import PixelIcon from './PixelIcon';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocale } from '../i18n/LocaleContext';
import { hasCountries } from '../lib/countries';

export default function Header() {
  const { locale, t, paths } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const navItems: {
    to: string;
    label: string;
    short?: string;
    wideOnly?: boolean;
    external?: boolean;
  }[] = [
    { to: paths.home, label: t.nav.home },
    { to: '/pripreme/index.html', label: t.nav.pripreme, external: true },
    { to: paths.games, label: t.nav.games, short: t.nav.gamesShort },
    { to: paths.blog, label: t.nav.blog },
    // Samo na širokim ekranima (ispod 1024px nema mesta); inače je link u footeru.
    ...(hasCountries(locale) ? [{ to: paths.world, label: t.nav.world, wideOnly: true }] : []),
    { to: paths.about, label: t.nav.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-3.5 left-1/2 z-50 flex print:hidden w-[min(1160px,calc(100%-28px))] -translate-x-1/2 items-center justify-between gap-2 rounded-full border bg-surface/70 py-2.5 pr-3 pl-4 backdrop-blur-lg backdrop-saturate-150 transition-shadow sm:gap-4 ${
        scrolled ? 'border-line-strong shadow-[var(--shadow)]' : 'border-line'
      }`}
    >
      <Link
        to={paths.home}
        className="focus-ring flex items-center gap-2.5 rounded-lg font-head text-base font-semibold tracking-tight"
      >
        <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-accent text-accent-ink">
          <PixelIcon name="mark" />
        </span>
        <span className="max-sm:sr-only">{siteConfig.name}</span>
      </Link>
      <div className="flex items-center gap-1 sm:gap-1.5">
        <nav aria-label={t.nav.label}>
          <ul className="flex items-center sm:gap-1">
            {navItems.map(({ to, label, short, wideOnly, external }) => (
              // Na telefonu nema mesta za sve stavke; logo levo već vodi na početnu.
              <li
                key={to}
                className={to === paths.home ? 'max-sm:hidden' : wideOnly ? 'max-lg:hidden' : undefined}
              >
                {external ? (
                  <a
                    href={to}
                    className="focus-ring block rounded-full px-2.5 py-2 whitespace-nowrap text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-ink sm:px-3.5 sm:text-[14.5px]"
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    to={to}
                    end={to === paths.home}
                    className={({ isActive }) =>
                      `focus-ring block rounded-full px-2.5 py-2 whitespace-nowrap text-sm font-medium transition-colors sm:px-3.5 sm:text-[14.5px] ${
                        isActive
                          ? 'bg-surface-2 text-ink shadow-[inset_0_0_0_1px_var(--border)]'
                          : 'text-muted hover:bg-surface-2 hover:text-ink'
                      }`
                    }
                  >
                    {short ? (
                      <>
                        <span className="sm:hidden">{short}</span>
                        <span className="max-sm:hidden">{label}</span>
                      </>
                    ) : (
                      label
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
