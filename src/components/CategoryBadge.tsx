import type { Category } from '../types/post';
import { useLocale } from '../i18n/LocaleContext';

interface CategoryBadgeProps {
  category: Category;
}

const categoryColors: Record<Category, string> = {
  'AI alati u nastavi': '[--c:var(--accent-2)]',
  'Etika i AI': '[--c:var(--cat-purple)]',
  'Iskustva iz prakse': '[--c:var(--accent)]',
  Vijesti: '[--c:var(--cat-amber)]',
  Resursi: '[--c:var(--muted)]',
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const { t } = useLocale();
  return <span className={`cat ${categoryColors[category]}`}>{t.categories[category]}</span>;
}
