import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOCALES, localeInfo } from '../i18n/config';
import { useLocale } from '../i18n/LocaleContext';
import { switchLocalePath } from '../i18n/paths';

export default function LanguageSwitcher() {
  const { locale, t } = useLocale();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t.language.change} (${localeInfo[locale].name})`}
        className="focus-ring inline-grid h-[38px] min-w-[38px] place-items-center rounded-full border border-line px-2 font-mono text-[12.5px] font-medium tracking-[0.06em] text-muted uppercase transition-colors hover:border-line-strong hover:bg-surface-2 hover:text-ink"
      >
        {locale}
      </button>
      {open && (
        <ul
          id={menuId}
          aria-label={t.language.label}
          className="absolute top-[calc(100%+10px)] right-0 grid min-w-[168px] gap-0.5 rounded-2xl border border-line-strong bg-surface p-1.5 shadow-[var(--shadow)]"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <Link
                to={switchLocalePath(pathname, locale, code)}
                lang={localeInfo[code].tag}
                hrefLang={localeInfo[code].tag}
                aria-current={code === locale ? 'true' : undefined}
                className={`focus-ring flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-[14.5px] transition-colors ${
                  code === locale ? 'bg-surface-2 text-ink' : 'text-muted hover:bg-surface-2 hover:text-ink'
                }`}
              >
                {localeInfo[code].name}
                <span className="font-mono text-[11.5px] tracking-[0.06em] uppercase">{code}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
