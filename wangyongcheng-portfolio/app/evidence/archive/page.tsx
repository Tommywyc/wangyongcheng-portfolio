import EvidenceRoom from "../EvidenceRoom";
import { pageLanguage, type PageSearchParams } from "../../language";
import { bilingualMetadata } from "../../page-metadata";

export async function generateMetadata({ searchParams }: { searchParams?: PageSearchParams }) {
  return bilingualMetadata("/evidence/archive", await pageLanguage(searchParams) ?? "zh",
    { zh: "证据完整归档｜王永城 Tommy｜English × Law × AI", en: "Complete Evidence Archive｜Tommy Wang" },
    { zh: "查看王永城作品集中保留的参与记录、活动照片与辅助材料。", en: "Search the complete archive of score reports, certificates, activity photographs and supporting records." });
}

export default async function EvidenceArchivePage({ searchParams }: { searchParams?: PageSearchParams }) {
  return <EvidenceRoom archive initialLanguage={await pageLanguage(searchParams)} />;
}
