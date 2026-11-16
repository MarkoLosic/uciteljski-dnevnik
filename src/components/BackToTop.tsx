import { useEffect, useState } from 'react';
import Icon from './Icon';
import { useLocale } from '../i18n/LocaleContext';

const SHOW_AFTER_PX = 600;

export default function BackToTop() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollUp() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label={t.backToTop}
      title={t.backToTop}
      // Skriveno dugme ne smije biti dostupno tastaturi ni čitačima ekrana.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`focus-ring fixed right-4 bottom-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-surface/85 text-ink shadow-[var(--shadow)] backdrop-blur-lg transition-[opacity,transform,background-color,color] duration-200 hover:bg-accent hover:text-accent-ink sm:right-6 sm:bottom-6 print:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <Icon name="up" size={20} />
    </button>
  );
}
