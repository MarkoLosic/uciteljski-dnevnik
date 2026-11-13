import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getRelatedPosts, loadPostContent } from '../lib/posts';
import { formatDate } from '../lib/formatDate';
import CategoryBadge from '../components/CategoryBadge';
import EmptyState from '../components/EmptyState';
import PixelIcon from '../components/PixelIcon';
import PostCard from '../components/PostCard';
import { useLocale } from '../i18n/LocaleContext';
import { usePageMeta } from '../lib/usePageMeta';

const markdownComponents: Components = {
  img: ({ node: _node, ...props }) => <img {...props} loading="lazy" decoding="async" />,
};

export default function BlogPost() {
  const { slug = '' } = useParams();
  const { locale, t, paths } = useLocale();
  const post = getPostBySlug(locale, slug);
  const [content, setContent] = useState<{ key: string; markdown: string } | null>(null);
  const key = `${locale}/${slug}`;

  usePageMeta(
    post
      ? { title: post.title, description: post.excerpt, type: 'article' }
      : { title: t.blog.notFoundTitle, description: t.blog.notFoundMessage, noindex: true },
  );

  useEffect(() => {
    let active = true;
    loadPostContent(locale, slug)?.then((markdown) => {
      if (active) setContent({ key, markdown });
    });
    return () => {
      active = false;
    };
  }, [locale, slug, key]);

  if (!post) {
    return (
      <div className="wrap max-w-[780px] pt-[130px]">
        <EmptyState
          headingLevel={1}
          title={t.blog.notFoundTitle}
          message={t.blog.notFoundMessage}
          actionLabel={`← ${t.blog.backToBlog}`}
          actionTo={paths.blog}
        />
      </div>
    );
  }

  const related = getRelatedPosts(post, 3);
  const markdown = content?.key === key ? content.markdown : null;

  return (
    <>
      <div className="wrap min-h-[80vh] max-w-[780px] pt-[130px]">
        <Link
          to={paths.blog}
          className="focus-ring mb-7 inline-flex items-center gap-2 rounded text-[14.5px] font-medium text-muted transition-colors hover:text-accent"
        >
          <PixelIcon name="back" size={16} />
          {t.blog.allPosts}
        </Link>

        <header className="mb-9 border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[12.5px] font-medium text-muted">
            <CategoryBadge category={post.category} />
            <span>
              {t.blog.published} <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            </span>
            <span aria-hidden="true" className="max-sm:hidden">
              ·
            </span>
            <span>{t.blog.readingTime(post.readingMinutes)}</span>
          </div>
          <h1 className="mt-3.5 mb-4 font-head text-[clamp(32px,5vw,52px)] leading-[1.1] font-bold tracking-[-0.03em] text-balance">
            {post.title}
          </h1>
          <p className="text-[clamp(16.5px,1.6vw,19px)] text-muted">{post.excerpt}</p>
        </header>

        <article className="prose" aria-busy={markdown === null}>
          {markdown !== null && (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {markdown}
            </ReactMarkdown>
          )}
        </article>

        <div className="mt-14 border-t border-line pt-7">
          <Link to={paths.blog} className="btn btn-ghost focus-ring">
            <PixelIcon name="back" />
            {t.blog.backToBlog}
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="wrap pt-20" aria-labelledby="jos-sa-bloga">
          <h2 id="jos-sa-bloga" className="section-title mb-9">
            {t.blog.related}
          </h2>
          <ul className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
