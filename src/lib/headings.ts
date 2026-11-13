export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
  /** Linija u Markdownu — po njoj komponenta naslova u react-markdown nalazi svoj id. */
  line: number;
}

export function slugifyHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/đ/g, 'dj')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'sekcija';
}

function plainText(markdown: string): string {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim();
}

/** ## i ### naslovi (ATX) van blokova koda, sa jedinstvenim id-jevima. */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const used = new Map<string, number>();
  let fence: string | null = null;

  markdown.split('\n').forEach((raw, index) => {
    const line = raw.trimEnd();
    const fenceMatch = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (fence === null) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      return;
    }
    if (fence !== null) return;

    const match = /^ {0,3}(#{2,3})\s+(.+?)(?:\s+#+)?$/.exec(line);
    if (!match) return;

    const text = plainText(match[2]);
    const base = slugifyHeading(text);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    headings.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      text,
      level: match[1].length === 2 ? 2 : 3,
      line: index + 1,
    });
  });

  return headings;
}
