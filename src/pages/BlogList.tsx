import { getAllPosts } from '../lib/posts';
import { siteConfig } from '../config/site';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <div className="wrap min-h-[80vh] pt-[130px]">
      <header className="mb-10 max-w-[760px]">
        <span className="eyebrow">Blog</span>
        <h1 className="page-title mt-2 mb-4">Svi članci</h1>
        <p className="text-[clamp(16.5px,1.6vw,19px)] text-muted">{siteConfig.tagline}.</p>
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
          title="Još nema članaka"
          message="Prvi članci su u pripremi. Navratite uskoro!"
          actionLabel="Nazad na početnu"
          actionTo="/"
        />
      )}
    </div>
  );
}
