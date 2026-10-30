import { getAllPosts } from '../lib/posts';
import { useLocale } from '../i18n/LocaleContext';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import { usePageMeta } from '../lib/usePageMeta';

export default function BlogList() {
  const { locale, t, paths } = useLocale();
  const posts = getAllPosts(locale);
  usePageMeta({ title: t.blog.title, description: t.blog.description });

  return (
    <div className="wrap min-h-[80vh] pt-[130px]">
      <header className="mb-10 max-w-[760px]">
        <span className="eyebrow">{t.blog.eyebrow}</span>
        <h1 className="page-title mt-2 mb-4">{t.blog.title}</h1>
        <p className="text-[clamp(16.5px,1.6vw,19px)] text-muted">{t.site.tagline}.</p>
      </header>
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
