import type { Metadata } from "next";
import type { Language } from "./language";

export function bilingualMetadata(path: string, language: Language, title: { zh: string; en: string }, description: { zh: string; en: string }, article = false): Metadata {
  const base = `https://www.wangyongcheng.com${path}`;
  const url = language === "en" ? `${base}?lang=en` : base;
  const image = "https://www.wangyongcheng.com/images/og-image-preview.png";
  return {
    title: title[language], description: description[language],
    alternates: { canonical: url, languages: { "zh-CN": `${base}?lang=zh`, en: `${base}?lang=en` } },
    openGraph: { type: article ? "article" : "website", title: title[language], description: description[language], url,
      locale: language === "en" ? "en_US" : "zh_CN", alternateLocale: [language === "en" ? "zh_CN" : "en_US"],
      images: [{ url: image, width: 1735, height: 906, alt: "王永城 Tommy Wang｜English × Law × AI" }] },
    twitter: { card: "summary_large_image", title: title[language], description: description[language], images: [{ url: image, alt: "王永城 Tommy Wang｜English × Law × AI" }] },
  };
}
