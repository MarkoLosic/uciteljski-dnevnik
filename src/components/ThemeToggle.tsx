import { useState } from 'react';
import PixelIcon from './PixelIcon';

type Theme = 'dark' | 'light';

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Bez localStorage-a (privatni prozor) tema važi samo do osvežavanja.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Uključi svetlu temu' : 'Uključi tamnu temu'}
      className="focus-ring inline-grid h-[38px] w-[38px] place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:bg-surface-2 hover:text-ink"
    >
      <PixelIcon name={theme === 'dark' ? 'moon' : 'sun'} />
    </button>
  );
}
