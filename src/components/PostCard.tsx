import { Link } from 'react-router-dom';
import type { PostMeta } from '../types/post';
import { formatDate } from '../lib/formatDate';
import CategoryBadge from './CategoryBadge';
import PixelIcon from './PixelIcon';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="card focus-ring group flex h-full flex-col gap-3 !p-[26px]">
      <div className="flex flex-wrap items-center gap-2 font-mono text-[12.5px] font-medium text-muted">
        <CategoryBadge category={post.category} />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <h3 className="font-head text-[22px] leading-tight font-bold tracking-tight text-balance">{post.title}</h3>
      <p className="text-[15.5px] text-muted">{post.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-1.5 text-[14.5px] font-semibold text-accent">
        Pročitaj više
        <PixelIcon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
