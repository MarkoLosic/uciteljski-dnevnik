import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../lib/posts';
import { formatDate } from '../lib/formatDate';
import CategoryBadge from '../components/CategoryBadge';
import EmptyState from '../components/EmptyState';
import PixelIcon from '../components/PixelIcon';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="wrap max-w-[780px] pt-[130px]">
        <EmptyState
          headingLevel={1}
          title="Članak nije pronađen"
          message="Članak koji tražite ne postoji ili je premešten."
          actionLabel="← Nazad na blog"
          actionTo="/blog"
        />
      </div>
    );
  }

  return (
    <div className="wrap min-h-[80vh] max-w-[780px] pt-[130px]">
      <Link
        to="/blog"
        className="focus-ring mb-7 inline-flex items-center gap-2 rounded text-[14.5px] font-medium text-muted transition-colors hover:text-accent"
      >
        <PixelIcon name="back" size={16} />
        Svi članci
      </Link>

      <header className="mb-9 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[12.5px] font-medium text-muted">
          <CategoryBadge category={post.category} />
          <span>
            Objavljeno <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
        </div>
        <h1 className="mt-3.5 mb-4 font-head text-[clamp(32px,5vw,52px)] leading-[1.1] font-bold tracking-[-0.03em] text-balance">
          {post.title}
        </h1>
        <p className="text-[clamp(16.5px,1.6vw,19px)] text-muted">{post.excerpt}</p>
      </header>

      <article className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>

      <div className="mt-14 border-t border-line pt-7">
        <Link to="/blog" className="btn btn-ghost focus-ring">
          <PixelIcon name="back" />
          Nazad na blog
        </Link>
      </div>
    </div>
  );
}
