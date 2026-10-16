import HomeContent from "./HomeContent";
import { pageLanguage, type PageSearchParams } from "./language";
import { bilingualMetadata } from "./page-metadata";

export async function generateMetadata({ searchParams }: { searchParams?: PageSearchParams }) {
  if (await pageLanguage(searchParams) !== "en") return {};
  return bilingualMetadata("/", "en", { zh: "王永城 Tommy｜English × Law × AI", en: "Tommy Wang｜English × Law × AI" }, {
    zh: "王永城的个人学术与成长作品集。", en: "Tommy Wang, an English undergraduate at Southwest Jiaotong University. Explore coursework, research in progress, public speaking, moot court and student service." });
}
export default async function HomePage({ searchParams }: { searchParams?: PageSearchParams }) {
  return <HomeContent initialLanguage={await pageLanguage(searchParams)} />;
}
