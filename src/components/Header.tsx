import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../config/site';
import PixelIcon from './PixelIcon';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocale } from '../i18n/LocaleContext';

export default function Header() {
  const { t, paths } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const navItems = [
    { to: paths.home, label: t.nav.home },
    { to: paths.blog, label: t.nav.blog },
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
      className={`fixed top-3.5 left-1/2 z-50 flex w-[min(1160px,calc(100%-28px))] -translate-x-1/2 items-center justify-between gap-2 rounded-full border bg-surface/70 py-2.5 pr-3 pl-4 backdrop-blur-lg backdrop-saturate-150 transition-shadow sm:gap-4 ${
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
          <ul className="flex sm:gap-1">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === paths.home}
                  className={({ isActive }) =>
                    `focus-ring block rounded-full px-2.5 py-2 text-sm font-medium transition-colors sm:px-3.5 sm:text-[14.5px] ${
                      isActive
                        ? 'bg-surface-2 text-ink shadow-[inset_0_0_0_1px_var(--border)]'
                        : 'text-muted hover:bg-surface-2 hover:text-ink'
                    }`
                  }
                >
                  {label}
                </NavLink>
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
