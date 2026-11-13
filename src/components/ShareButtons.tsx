import { useEffect, useState } from 'react';
import PixelIcon from './PixelIcon';
import { useLocale } from '../i18n/LocaleContext';
import { copyText } from '../lib/clipboard';

interface ShareButtonsProps {
  title: string;
  url: string;
}

/** Obični linkovi za deljenje — bez skripti trećih strana i bez praćenja. */
export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const text = encodeURIComponent(`${title} ${url}`);
  const links = [
    { label: 'Viber', href: `viber://forward?text=${text}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${text}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // korisnik je zatvorio meni za deljenje
    }
  }

  return (
    <section aria-labelledby="podeli-clanak" className="mt-14 border-t border-line pt-7">
      <h2 id="podeli-clanak" className="eyebrow mb-4">
        {t.blog.share}
      </h2>
      <ul className="flex flex-wrap gap-2.5">
        {canShare && (
          <li>
            <button type="button" onClick={handleNativeShare} className="share-btn focus-ring">
              <PixelIcon name="arrow" size={13} />
              {t.blog.shareNative}
            </button>
          </li>
        )}
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="share-btn focus-ring"
              aria-label={t.blog.shareVia(link.label)}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={async () => setCopied(await copyText(url))}
            className="share-btn focus-ring"
          >
            <PixelIcon name={copied ? 'mark' : 'copy'} size={13} />
            <span aria-live="polite">{copied ? t.blog.linkCopied : t.blog.copyLink}</span>
          </button>
        </li>
      </ul>
    </section>
  );
}
