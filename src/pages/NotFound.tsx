import { Link } from 'react-router-dom';
import PixelIcon from '../components/PixelIcon';
import { useLocale } from '../i18n/LocaleContext';
import { usePageMeta } from '../lib/usePageMeta';

export default function NotFound() {
  const { t, paths } = useLocale();
  usePageMeta({ title: t.notFound.title.replace(/\.$/, ''), description: t.site.description, noindex: true });

  return (
    <div className="wrap flex min-h-[80vh] flex-col items-center justify-center pt-[130px] text-center">
      <p className="font-mono text-[13px] font-medium tracking-[0.08em] text-accent uppercase">{t.notFound.eyebrow}</p>
      <p className="grad mt-2 font-head text-[clamp(96px,18vw,180px)] leading-none font-bold tracking-[-0.04em]">404</p>
      <h1 className="mt-4 font-head text-2xl font-bold tracking-tight sm:text-3xl">{t.notFound.title}</h1>
      <Link to={paths.home} className="btn btn-primary focus-ring mt-9">
        {t.notFound.backHome}
        <PixelIcon name="arrow" />
      </Link>
    </div>
  );
}
