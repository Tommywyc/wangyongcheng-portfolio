import { pageLanguage, type PageSearchParams } from "../language";
import { bilingualMetadata } from "../page-metadata";
import AboutSiteContent from "./AboutSiteContent";

export async function generateMetadata({ searchParams }: { searchParams?: PageSearchParams }) {
  return bilingualMetadata("/about-site", await pageLanguage(searchParams) ?? "zh",
    { zh: "网站说明｜王永城 Tommy｜English × Law × AI", en: "Accessibility, Privacy & Content｜Tommy Wang" },
    { zh: "王永城个人作品集的无障碍、隐私与网站建设说明。", en: "Accessibility measures, privacy practices and content boundaries for Tommy Wang's academic portfolio." });
}

export default async function AboutSitePage({ searchParams }: { searchParams?: PageSearchParams }) {
  return <AboutSiteContent initialLanguage={await pageLanguage(searchParams)} />;
}
