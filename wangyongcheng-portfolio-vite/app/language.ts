export type Language = "zh" | "en";
export type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;

export function parseLanguage(value: unknown): Language | undefined {
  return value === "en" || value === "zh" ? value : undefined;
}
export function resolveLanguage(explicit: unknown, saved?: unknown): Language {
  return parseLanguage(explicit) ?? parseLanguage(saved) ?? "zh";
}
export async function pageLanguage(searchParams?: PageSearchParams): Promise<Language | undefined> {
  const params = await searchParams;
  return parseLanguage(params?.lang);
}
/** Leave files, email links, external URLs and in-page anchors untouched. */
export function languageHref(href: string, language: Language): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const url = new URL(href, "https://portfolio.invalid");
  if (/\.[a-z\d]+$/i.test(url.pathname)) return href;
  url.searchParams.set("lang", language);
  return `${url.pathname}${url.search}${url.hash}`;
}
