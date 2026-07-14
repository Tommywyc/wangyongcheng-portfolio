import EvidenceRoom from "./EvidenceRoom";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "证据资料室｜王永城 Tommy｜English × Law × AI",
  description: "分类查看王永城个人作品集中的获奖证书、成绩记录、实践与志愿服务证明。",
  alternates: { canonical: "https://www.wangyongcheng.com/evidence" },
};

export default function EvidencePage() {
  return <EvidenceRoom />;
}
