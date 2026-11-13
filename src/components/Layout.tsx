import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ErrorBoundary from './ErrorBoundary';
import { useLocale } from '../i18n/LocaleContext';

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <div className="bg-glow print:hidden" aria-hidden="true">
        <span />
        <span />
      </div>
      <Header />
      <main className="min-h-screen">
        {/* key: greška na jednoj stranici ne ostaje prikazana posle prelaska na drugu */}
        <ErrorBoundary key={pathname} fallback={<PageError />}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

function PageError() {
  const { t } = useLocale();
  return (
    <div role="alert" className="wrap flex min-h-[80vh] flex-col items-center justify-center pt-[130px] text-center">
      <p className="font-mono text-[13px] font-medium tracking-[0.08em] text-accent uppercase">{t.notFound.eyebrow}</p>
      <h1 className="mt-3 font-head text-2xl font-bold tracking-tight sm:text-3xl">{t.error.title}</h1>
      <p className="mt-3 max-w-[480px] text-muted">{t.error.message}</p>
      <button type="button" onClick={() => window.location.reload()} className="btn btn-primary focus-ring mt-9">
        {t.error.reload}
      </button>
    </div>
  );
}
