import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import matter from 'gray-matter';
import path from 'node:path';
import { validateFrontmatter } from './src/lib/frontmatter';
import { isLocale, LOCALES } from './src/i18n/config';

// gray-matter zavisi od Node-ovog Buffer-a, pa frontmatter parsiramo ovde (u Node-u),
// a ne u browseru. Validacija ovde znači da neispravan članak obara `npm run build`.
function markdownPosts(): Plugin {
  return {
    name: 'markdown-posts',
    transform(code, id) {
      if (!id.endsWith('.md')) return null;
      const { data, content } = matter(code);
      const locale = path.basename(path.dirname(id));
      const name = `${locale}/${path.basename(id)}`;
      if (!isLocale(locale)) {
        throw new Error(`Članak "${name}" mora biti u folderu jezika: ${LOCALES.join(', ')}`);
      }
      validateFrontmatter(data, name);
      return { code: `export default ${JSON.stringify({ data, content })};`, map: null };
    },
  };
}

export default defineConfig({
  plugins: [markdownPosts(), react(), tailwindcss()],
});
