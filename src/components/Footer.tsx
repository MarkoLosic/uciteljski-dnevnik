import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { useLocale } from '../i18n/LocaleContext';

export default function Footer() {
  const { t, paths } = useLocale();

  return (
    <footer className="wrap mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-7 pb-10 text-sm text-muted max-sm:flex-col max-sm:text-center">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
      </p>
      <p>
        {t.footer.author}: {siteConfig.author.name}
      </p>
      <nav aria-label={t.footer.label} className="flex gap-4">
        <Link to={paths.about} className="focus-ring rounded py-2 transition-colors hover:text-accent">
          {t.nav.about}
        </Link>
        <a
          href={`mailto:${siteConfig.author.email}`}
          className="focus-ring rounded py-2 transition-colors hover:text-accent"
        >
          {t.footer.contact}
        </a>
      </nav>
    </footer>
  );
}
