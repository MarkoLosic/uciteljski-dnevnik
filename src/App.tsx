import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Games from './pages/Games';
import GamePlay from './pages/GamePlay';
import Worksheet from './pages/Worksheet';
import { LOCALES, localeInfo } from './i18n/config';
import { LocaleProvider } from './i18n/LocaleContext';
import { localeBase } from './i18n/paths';

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
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path={localeInfo[locale].aboutSlug} element={<About />} />
          <Route path={localeInfo[locale].gamesSlug} element={<Games />} />
          <Route path={`${localeInfo[locale].gamesSlug}/:gameId`} element={<GamePlay />} />
          <Route
            path={`${localeInfo[locale].gamesSlug}/${localeInfo[locale].worksheetSlug}/:sheetId`}
            element={<Worksheet />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      ))}
    </Routes>
  );
}
