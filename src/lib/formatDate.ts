export function formatDate(iso: string): string {
  // "YYYY-MM-DD" se parsira kao UTC ponoć; bez timeZone: 'UTC' zapadne zone bi prikazale prethodni dan.
  const date = new Date(iso);
  return new Intl.DateTimeFormat('sr-Latn-BA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
