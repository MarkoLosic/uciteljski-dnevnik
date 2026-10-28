import { Link } from 'react-router-dom';
import { NotebookPen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionTo?: string;
  headingLevel?: 1 | 2 | 3;
}

export default function EmptyState({
  title,
  message,
  actionLabel,
  actionTo,
  headingLevel = 2,
}: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <div className="card flex flex-col items-center border-dashed !border-line-strong px-6 py-14 text-center">
      <span className="icon-tile mb-5">
        <NotebookPen aria-hidden="true" className="h-5 w-5" />
      </span>
      <Heading className="font-head text-2xl font-bold tracking-tight text-balance">{title}</Heading>
      <p className="mt-2 max-w-md text-muted">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-ghost focus-ring mt-7">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
