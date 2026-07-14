import AchievementsExplorer from "./AchievementsExplorer";
import BackToTopButton from "../components/BackToTopButton";
import ContactButton from "../components/ContactButton";
import MobileMenuButton from "../components/MobileMenuButton";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "全部成就｜王永城 Tommy｜English × Law × AI",
  description: "按时间与标签查看王永城的学术研究、竞赛实践、学生工作与志愿服务经历。",
  alternates: { canonical: "https://www.wangyongcheng.com/achievements" },
};

export default function AchievementsPage() {
  return (
    <main>
      <a className="skip-link" href="#archive-main">
        跳到主要内容
      </a>

      <header className="site-header archive-header">
        <Link className="wordmark" href="/" aria-label="返回首页">
          <span className="wordmark-mark">王</span>
          <span className="wordmark-name">
            王永城 <em>English × Law × AI</em>
          </span>
        </Link>
        <div className="header-tools">
          <nav aria-label="档案导航" id="archive-navigation">
            <Link href="/">首页</Link>
            <a href="#archive-main">全部成就</a>
            <Link href="/evidence">证据资料室</Link>
            <Link href="/#direction">发展方向</Link>
          </nav>
          <MobileMenuButton closeLabel="关闭" label="菜单" navId="archive-navigation" />
        </div>
      </header>

      <section className="archive-hero" id="archive-main">
        <div className="hero-grid" aria-hidden="true" />
        <p className="eyebrow">Complete archive · 2025—</p>
        <h1>
          全部成就
          <span>与经历。</span>
        </h1>
        <p>
          一份按时间生长、也可按标签阅读的个人档案。这里既保留获奖成果，也记录学生工作、志愿服务、
          学术研究与尚在推进的竞赛项目。
        </p>
        <div className="archive-hero-note">
          <strong>两种阅读方式</strong>
          <span>时间轴看成长路径</span>
          <span>标签看能力结构</span>
        </div>
      </section>

      <AchievementsExplorer />

      <ContactButton />
      <BackToTopButton />

      <footer>
        <span>王永城 · Tommy</span>
        <nav aria-label="网站说明">
          <Link href="/">返回首页</Link>
          <Link href="/about-site#accessibility">Accessibility</Link>
          <Link href="/about-site#privacy">Privacy</Link>
          <Link href="/about-site#about">About This Site</Link>
        </nav>
        <span>Last updated · 2026.07</span>
      </footer>
    </main>
  );
}
