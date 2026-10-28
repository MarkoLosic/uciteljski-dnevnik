import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';

export default function Footer() {
  return (
    <footer className="wrap mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-7 pb-10 text-sm text-muted max-sm:flex-col max-sm:text-center">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. Sva prava zadržana.
      </p>
      <p>Autor: {siteConfig.author.name}</p>
      <nav aria-label="Linkovi u podnožju" className="flex gap-4">
        <Link to="/o-meni" className="focus-ring rounded py-2 transition-colors hover:text-accent">
          O meni
        </Link>
        <a
          href={`mailto:${siteConfig.author.email}`}
          className="focus-ring rounded py-2 transition-colors hover:text-accent"
        >
          Kontakt
        </a>
      </nav>
    </footer>
  );
}
