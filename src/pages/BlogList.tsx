import { Link, useSearchParams } from 'react-router-dom';
import { getAllCategories, getAllPosts } from '../lib/posts';
import { useLocale } from '../i18n/LocaleContext';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import { usePageMeta } from '../lib/usePageMeta';
import { pageMeta } from '../lib/seo';
import { CATEGORY_SLUGS, type Category } from '../types/post';

const FILTER_PARAM = 'kategorija';

export default function BlogList() {
  const { locale, t, paths } = useLocale();
  const [searchParams] = useSearchParams();
  const categories = getAllCategories(locale);
  const active = categories.find((c) => CATEGORY_SLUGS[c] === searchParams.get(FILTER_PARAM)) ?? null;
  const posts = getAllPosts(locale).filter((post) => !active || post.category === active);
  usePageMeta(pageMeta.blog(t));

  const filterLink = (category: Category | null, label: string) => {
    const current = category === active;
    return (
      <li key={category ?? 'all'}>
        <Link
          to={category ? `${paths.blog}?${FILTER_PARAM}=${CATEGORY_SLUGS[category]}` : paths.blog}
          aria-current={current ? 'page' : undefined}
          className={`focus-ring inline-block rounded-full border px-3.5 py-1.5 font-mono text-[13px] font-medium transition-colors ${
            current ? 'border-accent bg-surface-2 text-ink' : 'border-line text-muted hover:border-line-strong hover:text-ink'
          }`}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <div className="wrap min-h-[80vh] pt-[130px]">
      <header className="mb-10 max-w-[760px]">
        <span className="eyebrow">{t.blog.eyebrow}</span>
        <h1 className="page-title mt-2 mb-4">{t.blog.title}</h1>
        <p className="text-[clamp(16.5px,1.6vw,19px)] text-muted">{t.site.tagline}.</p>
      </header>
      {categories.length > 1 && (
        <nav aria-label={t.blog.filterLabel} className="mb-8">
          <ul className="flex flex-wrap gap-2">
            {filterLink(null, t.blog.filterAll)}
            {categories.map((c) => filterLink(c, t.categories[c]))}
          </ul>
        </nav>
      )}
      {posts.length > 0 ? (
        <ul className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title={t.blog.emptyTitle}
          message={t.blog.emptyMessage}
          actionLabel={t.notFound.backHome}
          actionTo={paths.home}
        />
      )}
    </div>
  );
}
