"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { WorkCaseStudy } from "../../work-data";
import BackToTopButton from "../../components/BackToTopButton";
import ContactButton from "../../components/ContactButton";
import MobileMenuButton from "../../components/MobileMenuButton";

export default function WorkDetail({ study }: { study: WorkCaseStudy }) {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const english = language === "en";
  const text = (value: { zh: string; en: string }) => english ? value.en : value.zh;

  useEffect(() => {
    if (window.localStorage.getItem("portfolio-language") === "en") setLanguage("en");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = english ? "en" : "zh-CN";
    document.title = `${text(study.title)}｜${english ? "Selected Work" : "代表成果"}｜Tommy Wang`;
  }, [english, language, study]);

  return (
    <main className={english ? "work-detail-page lang-en" : "work-detail-page lang-zh"}>
      <a className="skip-link" href="#case-main">{english ? "Skip to case study" : "跳到成果内容"}</a>
      <header className="site-header archive-header">
        <Link className="wordmark" href="/" aria-label={english ? "Back to homepage" : "返回首页"}>
          <span className="wordmark-mark">{english ? "T" : "王"}</span>
          <span className="wordmark-name">{english ? "Tommy" : "王永城"} <em>English × Law × AI</em></span>
        </Link>
        <div className="header-tools">
          <nav aria-label={english ? "Case-study navigation" : "成果页导航"} id="case-navigation">
            <Link href="/#work">{english ? "Selected work" : "代表成果"}</Link>
            <Link href="/achievements">{english ? "Archive" : "全部成就"}</Link>
            <Link href={`/evidence#${study.evidenceId}`}>{english ? "Evidence" : "证据"}</Link>
          </nav>
          <MobileMenuButton closeLabel={english ? "Close" : "关闭"} label={english ? "Menu" : "菜单"} navId="case-navigation" />
          <button className="language-switch" type="button" onClick={() => setLanguage(english ? "zh" : "en")} aria-label={english ? "切换到中文" : "Switch to English"}>
            <span className={!english ? "active" : ""}>中</span><i>/</i><span className={english ? "active" : ""}>EN</span>
          </button>
        </div>
      </header>

      <article id="case-main">
        <header className="case-hero">
          <div className="hero-grid" aria-hidden="true" />
          <p className="eyebrow">{study.number} · {text(study.category)} · {study.date}</p>
          <h1>{text(study.title)}</h1>
          {study.subtitle ? <p className="case-subtitle">{study.subtitle}</p> : null}
          <a href={`/evidence#${study.evidenceId}`}>{english ? "View supporting evidence" : "查看对应证据"} <span aria-hidden="true">↗</span></a>
        </header>

        <div className="case-content">
          <section className="case-question">
            <p className="eyebrow">01 · {english ? "Question" : "问题"}</p>
            <h2>{text(study.question)}</h2>
          </section>
          <section>
            <p className="eyebrow">02 · {english ? "What I did" : "我具体做了什么"}</p>
            <ol>{study.actions.map((action, index) => <li key={action.zh}><span>{String(index + 1).padStart(2, "0")}</span><p>{text(action)}</p></li>)}</ol>
          </section>
          <section className="case-output">
            <p className="eyebrow">03 · {english ? "Output" : "最终产出"}</p>
            <h2>{text(study.output)}</h2>
            <a href={`/evidence#${study.evidenceId}`}>{english ? "Open evidence record" : "打开证据记录"} <span aria-hidden="true">↗</span></a>
          </section>
          <section className="case-reflection">
            <p className="eyebrow">04 · {english ? "Reflection" : "反思"}</p>
            <p>{text(study.reflection)}</p>
          </section>
          <nav className="case-end-nav" aria-label={english ? "Continue exploring" : "继续浏览"}>
            <Link href="/#work">← {english ? "All selected work" : "返回代表成果"}</Link>
            <Link href="/achievements">{english ? "Complete archive" : "全部成就"} →</Link>
          </nav>
        </div>
      </article>
      <ContactButton english={english} />
      <BackToTopButton english={english} />
    </main>
  );
}
