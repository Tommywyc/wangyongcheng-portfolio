/** Search both languages without treating typography (CET-6 / CET6) as a difference. */
export function matchesQuery(query: string, content: string): boolean {
  const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase().replace(/[\p{P}\p{Z}\s]/gu, "");
  const haystack = normalize(content);
  return query.trim().split(/\s+/u).every((term) => haystack.includes(normalize(term)));
}

export function mergeFilterUrl(href: string, defaults: Record<string, string>, values: Record<string, string>): string {
  const url = new URL(href);
  for (const key of Object.keys(defaults)) {
    const value = values[key] ?? defaults[key];
    if (value === defaults[key]) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
