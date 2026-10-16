import type { Metadata } from "next";
import AboutSiteContent from "./AboutSiteContent";

export const metadata: Metadata = {
  title: "网站说明｜王永城 Tommy｜English × Law × AI",
  description: "王永城个人作品集的无障碍、隐私与网站建设说明。",
  alternates: { canonical: "https://www.wangyongcheng.com/about-site" },
};

export default function AboutSitePage() {
  return <AboutSiteContent />;
}
