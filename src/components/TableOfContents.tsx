import type { Heading } from '../lib/headings';
import { useLocale } from '../i18n/LocaleContext';

interface TableOfContentsProps {
  headings: Heading[];
}

/** Sadržaj članka; prikazuje se samo kada članak ima bar 3 glavne sekcije. */
export default function TableOfContents({ headings }: TableOfContentsProps) {
  const { t } = useLocale();
  if (headings.filter((h) => h.level === 2).length < 3) return null;

  return (
    <nav aria-labelledby="sadrzaj-clanka" className="card mb-10 px-6 py-5">
      <h2 id="sadrzaj-clanka" className="eyebrow mb-3">
        {t.blog.toc}
      </h2>
      <ol className="space-y-1.5 text-[15.5px]">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-5 text-[14.5px]' : undefined}>
            <a
              href={`#${h.id}`}
              className="focus-ring rounded text-muted transition-colors hover:text-accent"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
