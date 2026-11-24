// Šalje sve URL-ove iz generisanih mapa sajta (`dist/sitemap-*.xml`) na IndexNow API
// radi instant indeksiranja u Bing, ChatGPT Search, Microsoft Copilot, Yandex i DuckDuckGo.
// Upotreba:
//   npm run indexnow:dry   — provjera broja URL-ova i ključa bez slanja na mrežu
//   npm run indexnow       — slanje na https://api.indexnow.org/indexnow (pokrenuti poslije git push / Vercel deploy-a)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const dryRun = process.argv.includes('--dry-run');

const siteTs = fs.readFileSync(path.join(root, 'src/config/site.ts'), 'utf8');
const urlMatch = /url:\s*'([^']+)'/.exec(siteTs);
const keyMatch = /indexNowKey:\s*'([^']+)'/.exec(siteTs);

if (!urlMatch || !keyMatch) {
  console.error('Nije pronađen siteConfig.url ili siteConfig.indexNowKey u src/config/site.ts');
  process.exit(1);
}

const siteUrl = urlMatch[1];
const key = keyMatch[1];
const host = new URL(siteUrl).host;
const keyLocation = `${siteUrl}/${key}.txt`;

const sitemaps = ['sitemap-stranice.xml', 'sitemap-radni-listovi.xml', 'sitemap-pripreme.xml'];
const urls = new Set();

for (const name of sitemaps) {
  const file = path.join(distDir, name);
  if (!fs.existsSync(file)) continue;
  const xml = fs.readFileSync(file, 'utf8');
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    urls.add(m[1].trim());
  }
}

if (urls.size === 0) {
  console.error('U dist/ nisu pronađene mape sajta. Pokrenite prvo: npm run build');
  process.exit(1);
}

const urlList = [...urls];
console.log(`Host: ${host}`);
console.log(`KeyLocation: ${keyLocation}`);
console.log(`Ukupno URL-ova za IndexNow: ${urlList.length}`);

if (dryRun) {
  console.log('Dry-run režim: payload je validan, ništa nije poslato na mrežu.');
  process.exit(0);
}

const payload = {
  host,
  key,
  keyLocation,
  urlList,
};

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

if (response.ok || response.status === 202) {
  console.log(`IndexNow uspješno prihvatio ${urlList.length} URL-ova (HTTP ${response.status}).`);
} else {
  const text = await response.text().catch(() => '');
  console.error(`IndexNow greška (HTTP ${response.status}): ${text}`);
  process.exit(1);
}
