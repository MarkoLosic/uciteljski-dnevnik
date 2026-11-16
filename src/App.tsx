import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import NotFound from './pages/NotFound';
import { LOCALES, localeInfo } from './i18n/config';
import { LocaleProvider } from './i18n/LocaleContext';
import { localeBase } from './i18n/paths';
import { LEKTIRE_SLUG, hasLektire } from './lektire/types';

// Članak (react-markdown), O meni, igre/radni listovi i Škole u svetu su zasebni chunk-ovi — ne usporavaju početnu i listu.
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const Games = lazy(() => import('./pages/Games'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const WorksheetsPage = lazy(() => import('./pages/WorksheetsPage'));
const Worksheet = lazy(() => import('./pages/Worksheet'));
const World = lazy(() => import('./pages/World'));
const Country = lazy(() => import('./pages/Country'));
const Lektire = lazy(() => import('./pages/Lektire'));
const Copyright = lazy(() => import('./pages/Copyright'));

// Isti skup ruta za svaki jezik: srpski bez prefiksa (`/blog`), ostali sa njim (`/en/blog`).
export default function App() {
  return (
    <Routes>
      {LOCALES.map((locale) => (
        <Route
          key={locale}
          path={localeBase(locale) || '/'}
          element={
            <LocaleProvider locale={locale}>
              <Layout />
            </LocaleProvider>
          }
        >
          <Route index element={<Home />} />
          <Route path="index.html" element={<Home />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path={localeInfo[locale].aboutSlug} element={<About />} />
          <Route path={localeInfo[locale].worksheetSlug} element={<WorksheetsPage />} />
          <Route path={`${localeInfo[locale].worksheetSlug}/:sheetId`} element={<Worksheet />} />
          <Route path="bojanke" element={<WorksheetsPage />} />
          <Route path="bojanke/:sheetId" element={<Worksheet />} />
          <Route path={localeInfo[locale].gamesSlug} element={<Games />} />
          <Route path={`${localeInfo[locale].gamesSlug}/:gameId`} element={<GamePlay />} />
          <Route
            path={`${localeInfo[locale].gamesSlug}/${localeInfo[locale].worksheetSlug}/:sheetId`}
            element={<Worksheet />}
          />
          <Route path={localeInfo[locale].worldSlug} element={<World />} />
          <Route path={`${localeInfo[locale].worldSlug}/:countryId`} element={<Country />} />
          <Route path={localeInfo[locale].copyrightSlug} element={<Copyright />} />
          {hasLektire(locale) && <Route path={LEKTIRE_SLUG} element={<Lektire />} />}
          <Route path="*" element={<NotFound />} />
        </Route>
      ))}
    </Routes>
  );
}
