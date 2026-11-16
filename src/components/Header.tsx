import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Palette,
  Gamepad2,
  FileText,
  User,
  Globe2,
  Library,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '../config/site';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocale } from '../i18n/LocaleContext';
import { hasCountries } from '../lib/countries';
import { hasLektire } from '../lektire/types';

export default function Header() {
  const { locale, t, paths } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Zatvaranje mobilnog menija prilikom promene rute
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Zatvaranje menija na taster Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: {
    to: string;
    label: string;
    short?: string;
    badge?: string;
    icon: LucideIcon;
    external?: boolean;
  }[] = [
    { to: paths.home, label: t.nav.home, icon: Home },
    { to: '/pripreme', label: t.nav.pripreme, badge: '1–5. razred', icon: BookOpen, external: true },
    ...(hasLektire(locale) ? [{ to: paths.lektire, label: t.nav.lektire, badge: 'RS i FBiH', icon: Library }] : []),
    { to: paths.worksheets, label: t.nav.worksheets, short: t.nav.worksheetsShort, badge: 'A4 štampa', icon: Palette },
    { to: paths.games, label: t.nav.games, short: t.nav.gamesShort, badge: '10 igara', icon: Gamepad2 },
    { to: paths.blog, label: t.nav.blog, icon: FileText },
    ...(hasCountries(locale) ? [{ to: paths.world, label: t.nav.world, icon: Globe2 }] : []),
    { to: paths.about, label: t.nav.about, icon: User },
  ];

  return (
    <>
      <header
        className={`fixed top-3 left-1/2 z-50 flex print:hidden w-[min(1160px,calc(100%-24px))] -translate-x-1/2 items-center justify-between gap-2 rounded-full border bg-surface/85 py-2 sm:py-2.5 pr-2.5 sm:pr-3 pl-3 sm:pl-4 backdrop-blur-lg backdrop-saturate-150 transition-shadow ${
          scrolled ? 'border-line-strong shadow-[var(--shadow)]' : 'border-line'
        }`}
      >
        <Link
          to={paths.home}
          onClick={() => setIsMenuOpen(false)}
          className="focus-ring flex items-center gap-2 sm:gap-2.5 rounded-lg font-head text-[15px] sm:text-base font-semibold tracking-tight shrink-0"
        >
          <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-accent text-accent-ink shrink-0">
            <Icon name="logo" />
          </span>
          <span className="font-semibold text-ink">{siteConfig.name}</span>
        </Link>

        {/* Desktop Nav: Prikazuje se na velikim i srednjim ekranima */}
        <nav className="hidden lg:block" aria-label={t.nav.label}>
          <ul className="flex items-center gap-0.5">
            {navItems.map(({ to, label, external }) => (
              <li key={to}>
                {external ? (
                  <a
                    href={to}
                    className="focus-ring block rounded-full px-3 py-1.5 whitespace-nowrap text-[13.5px] font-medium text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    to={to}
                    end={to === paths.home}
                    className={({ isActive }) =>
                      `focus-ring block rounded-full px-3 py-1.5 whitespace-nowrap text-[13.5px] font-medium transition-colors ${
                        isActive
                          ? 'bg-surface-2 text-ink shadow-[inset_0_0_0_1px_var(--border)]'
                          : 'text-muted hover:bg-surface-2 hover:text-ink'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desne kontrole: Jezik, Tema, i Hamburger meni za telefone i tablete */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`focus-ring grid h-[38px] w-[38px] place-items-center rounded-full border transition-all lg:hidden ${
              isMenuOpen
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-line text-muted hover:border-line-strong hover:bg-surface-2 hover:text-ink'
            }`}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
          >
            {isMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </header>

      {/* Pozadinski zatamnjeni sloj za mobilni meni */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobilni meni padajući panel */}
      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="fixed top-[64px] left-1/2 z-50 w-[min(1160px,calc(100%-24px))] -translate-x-1/2 rounded-3xl border border-line-strong bg-surface/95 p-3.5 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <nav aria-label={t.nav.label}>
            <ul className="flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon, badge, external }) => (
                <li key={to}>
                  {external ? (
                    <a
                      href={to}
                      onClick={() => setIsMenuOpen(false)}
                      className="focus-ring flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-[15px] font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-surface-2 text-ink">
                          <Icon className="h-4 w-4" />
                        </span>
                        {label}
                      </span>
                      {badge && (
                        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                          {badge}
                        </span>
                      )}
                    </a>
                  ) : (
                    <NavLink
                      to={to}
                      end={to === paths.home}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `focus-ring flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-[15px] font-semibold transition-colors ${
                          isActive
                            ? 'bg-accent text-accent-ink shadow-xs'
                            : 'text-muted hover:bg-surface-2 hover:text-ink'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="flex items-center gap-3">
                            <span
                              className={`grid h-8 w-8 place-items-center rounded-xl ${
                                isActive ? 'bg-accent-ink/20 text-accent-ink' : 'bg-surface-2 text-ink'
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            {label}
                          </span>
                          {badge && (
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                isActive
                                  ? 'bg-accent-ink/20 text-accent-ink'
                                  : 'bg-accent/15 text-accent'
                              }`}
                            >
                              {badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
