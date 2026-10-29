import { localeInfo, type Locale } from '../i18n/config';

export function formatDate(iso: string, locale: Locale): string {
  // "YYYY-MM-DD" se parsira kao UTC ponoć; bez timeZone: 'UTC' zapadne zone bi prikazale prethodni dan.
  const date = new Date(iso);
  return new Intl.DateTimeFormat(localeInfo[locale].tag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
