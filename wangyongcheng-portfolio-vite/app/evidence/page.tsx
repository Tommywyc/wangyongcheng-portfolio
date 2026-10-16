import EvidenceRoom from "./EvidenceRoom";
import { pageLanguage, type PageSearchParams } from "../language";
import { bilingualMetadata } from "../page-metadata";

export async function generateMetadata({ searchParams }: { searchParams?: PageSearchParams }) {
  return bilingualMetadata("/evidence", await pageLanguage(searchParams) ?? "zh",
    { zh: "证据资料室｜王永城 Tommy｜English × Law × AI", en: "Selected Evidence｜Tommy Wang" },
    { zh: "分类查看王永城个人作品集中的获奖证书、成绩记录、实践与志愿服务证明。", en: "Selected academic records, award certificates and service and leadership evidence from Tommy Wang's portfolio." });
}

export default async function EvidencePage({ searchParams }: { searchParams?: PageSearchParams }) {
  return <EvidenceRoom initialLanguage={await pageLanguage(searchParams)} />;
}
