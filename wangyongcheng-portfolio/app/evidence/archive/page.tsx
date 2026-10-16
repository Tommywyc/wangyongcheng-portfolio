import EvidenceRoom from "../EvidenceRoom";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "证据完整归档｜王永城 Tommy｜English × Law × AI",
  description: "查看王永城作品集中保留的参与记录、活动照片与辅助材料。",
  alternates: { canonical: "https://www.wangyongcheng.com/evidence/archive" },
};

export default function EvidenceArchivePage() {
  return <EvidenceRoom archive />;
}
