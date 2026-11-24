import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getRelatedPosts, loadPostContent } from '../lib/posts';
import { formatDate } from '../lib/formatDate';
import CategoryBadge from '../components/CategoryBadge';
import CodeBlock from '../components/CodeBlock';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import PostCard from '../components/PostCard';
import ShareButtons from '../components/ShareButtons';
import TableOfContents from '../components/TableOfContents';
import { siteConfig } from '../config/site';
import { extractHeadings, type Heading } from '../lib/headings';
import { useLocale } from '../i18n/LocaleContext';
import { usePageMeta } from '../lib/usePageMeta';

type HeadingTag = 'h2' | 'h3';

function buildComponents(headings: Heading[], anchorLabel: (title: string) => string): Components {
  const byLine = new Map(headings.map((h) => [h.line, h]));
  const heading =
    (Tag: HeadingTag): Components[HeadingTag] =>
    ({ node, children, ...props }) => {
      const h = byLine.get(node?.position?.start.line ?? -1);
      if (!h) return <Tag {...props}>{children}</Tag>;
      return (
        <Tag id={h.id} {...props}>
          {children}
          <a href={`#${h.id}`} className="heading-anchor focus-ring" aria-label={anchorLabel(h.text)}>
            #
          </a>
        </Tag>
      );
    };

  return {
    img: ({ node: _node, ...props }) => <img {...props} loading="lazy" decoding="async" />,
    pre: ({ node: _node, ...props }) => <CodeBlock {...props} />,
    h2: heading('h2'),
    h3: heading('h3'),
  };
}

export default function BlogPost() {
  const { slug = '' } = useParams();
  const { locale, t, paths } = useLocale();
  const post = getPostBySlug(locale, slug);
  const [content, setContent] = useState<{ key: string; markdown: string } | null>(null);
  const key = `${locale}/${slug}`;
  const { hash } = useLocation();

  usePageMeta(
    post
      ? { title: post.title, description: post.excerpt, type: 'article', image: post.image }
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

  const markdown = content?.key === key ? content.markdown : null;
  const headings = useMemo(() => (markdown ? extractHeadings(markdown) : []), [markdown]);
  const components = useMemo(() => buildComponents(headings, t.blog.headingLink), [headings, t]);

  // Sadržaj se učitava naknadno, pa browser ne može sam da skroluje na #sekciju iz linka.
  useEffect(() => {
    if (markdown === null || !hash) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
  }, [markdown, hash]);

  if (!post) {
    return (
      <div className="wrap max-w-[780px] pt-[96px] sm:pt-[130px]">
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

  return (
    <>
      <div className="wrap min-h-[80vh] max-w-[780px] pt-[96px] sm:pt-[130px]">
        <Link
          to={paths.blog}
          className="focus-ring mb-7 inline-flex items-center gap-2 rounded text-[14.5px] font-medium text-muted transition-colors hover:text-accent"
        >
          <Icon name="back" size={16} />
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

        <TableOfContents headings={headings} />

        <article className="prose" aria-busy={markdown === null}>
          {markdown !== null && (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {markdown}
            </ReactMarkdown>
          )}
        </article>

        <ShareButtons title={post.title} url={`${siteConfig.url}${paths.post(post.slug)}`} />

        <div className="mt-10">
          <Link to={paths.blog} className="btn btn-ghost focus-ring">
            <Icon name="back" />
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
