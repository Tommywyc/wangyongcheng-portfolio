import AchievementsPageContent from "./AchievementsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "全部成就｜王永城 Tommy｜English × Law × AI",
  description: "按时间与标签查看王永城的学术研究、竞赛实践、学生工作与志愿服务经历。",
  alternates: { canonical: "https://www.wangyongcheng.com/achievements" },
};

export default function AchievementsPage() {
  return <AchievementsPageContent />;
}
