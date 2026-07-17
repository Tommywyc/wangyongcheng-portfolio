"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AchievementsExplorer from "./AchievementsExplorer";
import BackToTopButton from "../components/BackToTopButton";
import ContactButton from "../components/ContactButton";
import MobileMenuButton from "../components/MobileMenuButton";

export default function AchievementsPageContent() {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const english = language === "en";

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "en") setLanguage("en");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = english ? "en" : "zh-CN";
    document.title = english ? "Complete Archive｜Tommy Wang｜English × Law × AI" : "全部成就｜王永城 Tommy｜English × Law × AI";
  }, [english, language]);

  return (
    <main className={english ? "lang-en" : "lang-zh"}>
      <a className="skip-link" href="#archive-main">{english ? "Skip to archive" : "跳到主要内容"}</a>

      <header className="site-header archive-header">
        <Link className="wordmark" href="/" aria-label={english ? "Back to homepage" : "返回首页"}>
          <span className="wordmark-mark">{english ? "T" : "王"}</span>
          <span className="wordmark-name">{english ? "Tommy" : "王永城"} <em>English × Law × AI</em></span>
        </Link>
        <div className="header-tools">
          <nav aria-label={english ? "Archive navigation" : "档案导航"} id="archive-navigation">
            <Link href="/">{english ? "Home" : "首页"}</Link>
            <a href="#archive-main">{english ? "Archive" : "全部成就"}</a>
            <Link href="/evidence">{english ? "Evidence" : "证据资料室"}</Link>
            <Link href="/#direction">{english ? "Direction" : "发展方向"}</Link>
          </nav>
          <MobileMenuButton closeLabel={english ? "Close" : "关闭"} label={english ? "Menu" : "菜单"} navId="archive-navigation" />
          <button className="language-switch" type="button" onClick={() => setLanguage(english ? "zh" : "en")} aria-label={english ? "切换到中文" : "Switch to English"}>
            <span className={!english ? "active" : ""}>中</span><i>/</i><span className={english ? "active" : ""}>EN</span>
          </button>
        </div>
      </header>

      <section className="archive-hero" id="archive-main">
        <div className="hero-grid" aria-hidden="true" />
        <p className="eyebrow">Complete archive · 2025—</p>
        <h1>{english ? <>Achievements <span>& experiences.</span></> : <>全部成就<span>与经历。</span></>}</h1>
        <p>{english ? "A bilingual record that can be read as a timeline or explored by capability. It includes awards, research, project work, student leadership and volunteer service." : "一份按时间生长、也可按标签阅读的个人档案。这里既保留获奖成果，也记录学生工作、志愿服务、学术研究与尚在推进的竞赛项目。"}</p>
        <div className="archive-hero-note">
          <strong>{english ? "Two ways to read" : "两种阅读方式"}</strong>
          <span>{english ? "Timeline · growth" : "时间轴看成长路径"}</span>
          <span>{english ? "Categories · capabilities" : "标签看能力结构"}</span>
        </div>
      </section>

      <AchievementsExplorer english={english} />
      <ContactButton english={english} />
      <BackToTopButton english={english} />

      <footer>
        <span>{english ? "Tommy Wang" : "王永城 · Tommy"}</span>
        <nav aria-label={english ? "Site information" : "网站说明"}>
          <Link href="/">{english ? "Back to homepage" : "返回首页"}</Link>
          <Link href="/about-site#accessibility">Accessibility</Link>
          <Link href="/about-site#privacy">Privacy</Link>
          <Link href="/about-site#about">About This Site</Link>
        </nav>
        <span>Last updated · 2026.07</span>
      </footer>
    </main>
  );
}
