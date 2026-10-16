import AchievementsPageContent from "./AchievementsPageContent";
import { pageLanguage, type PageSearchParams } from "../language";
import { bilingualMetadata } from "../page-metadata";

export async function generateMetadata({ searchParams }: { searchParams?: PageSearchParams }) {
  return bilingualMetadata("/achievements", await pageLanguage(searchParams) ?? "zh",
    { zh: "全部成就｜王永城 Tommy｜English × Law × AI", en: "Achievements & Experiences｜Tommy Wang" },
    { zh: "按时间与标签查看王永城的学术研究、竞赛实践、学生工作与志愿服务经历。", en: "Explore Tommy Wang's coursework, research in progress, competitions, student leadership and volunteer service by timeline or category." });
}

export default async function AchievementsPage({ searchParams }: { searchParams?: PageSearchParams }) {
  return <AchievementsPageContent initialLanguage={await pageLanguage(searchParams)} />;
}
