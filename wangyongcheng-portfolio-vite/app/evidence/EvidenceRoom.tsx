"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { archiveEvidenceCategories, coreEvidenceCategories, totalEvidenceCount, type EvidenceItem } from "../evidence-data";
import BackToTopButton from "../components/BackToTopButton";
import ContactButton from "../components/ContactButton";
import MobileMenuButton from "../components/MobileMenuButton";

const arrow = "↗";

const evidenceTypeGroups = {
  certificate: new Set(["evidence-moot-court", "evidence-speech", "evidence-livestream", "evidence-class-meeting", "evidence-yunda-run-certificate"]),
  score: new Set(["evidence-cet4", "evidence-second-classroom"]),
  appointment: new Set(["evidence-comprehensive-english-representative", "evidence-student-union-organization", "evidence-debate-team", "evidence-activity-project-department", "evidence-campus-civilization", "evidence-volunteer-assessment"]),
  platform: new Set(["evidence-volunteer", "evidence-childrens-day", "evidence-gongga-cup-registration", "evidence-transport-approval"]),
  reference: new Set(["evidence-neccs-exam"]),
  participation: new Set(["evidence-guocai-exam", "evidence-neccs-exam", "evidence-self-study-2025-site", "evidence-self-study-2025-field", "evidence-self-study-2026-materials", "evidence-self-study-2026-volunteer", "evidence-gongga-cup-registration", "evidence-gongga-cup-venue"]),
} as const;

function evidenceType(item: EvidenceItem, english: boolean) {
  if (item.document) return english ? "Research / project document" : "研究 / 项目文档";
  if (evidenceTypeGroups.certificate.has(item.id)) return english ? "Official certificate" : "官方证书";
  if (evidenceTypeGroups.score.has(item.id)) return english ? "Score record" : "成绩记录";
  if (evidenceTypeGroups.appointment.has(item.id)) return english ? "Role / work record" : "任职 / 工作记录";
  if (evidenceTypeGroups.participation.has(item.id)) return english ? "Participation record" : "参与记录";
  if (evidenceTypeGroups.platform.has(item.id)) return english ? "Platform / registration record" : "平台 / 报名记录";
  if (evidenceTypeGroups.reference.has(item.id)) return english ? "Format reference" : "考试形式参考";
  return english ? "On-site photograph" : "现场照片";
}

export default function EvidenceRoom({ archive = false }: { archive?: boolean }) {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const [preview, setPreview] = useState<EvidenceItem | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const english = language === "en";
  const visibleCategories = archive ? archiveEvidenceCategories : coreEvidenceCategories;
  const visibleCount = visibleCategories.reduce((sum, group) => sum + group.items.length, 0);

  const openPreview = (item: EvidenceItem) => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPreview(item);
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    const frame = window.requestAnimationFrame(() => {
      if (saved === "en") setLanguage("en");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = english ? "en" : "zh-CN";
    document.title = archive
      ? (english ? "Complete Evidence Archive｜Tommy Wang" : "证据完整归档｜王永城 Tommy")
      : (english ? "Evidence Room｜Tommy Wang｜English × Law × AI" : "证据资料室｜王永城 Tommy｜English × Law × AI");
  }, [archive, english, language]);

  useEffect(() => {
    if (!preview) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.requestAnimationFrame(() => previousFocus.current?.focus());
    };
  }, [preview]);

  return (
    <main className={`evidence-page ${archive ? "evidence-archive" : "evidence-selected"} ${english ? "lang-en" : "lang-zh"}`}>
      <a className="skip-link" href="#evidence-main">{english ? "Skip to evidence" : "跳到证据内容"}</a>

      <header className="site-header archive-header evidence-header">
        <Link className="wordmark" href="/" aria-label={english ? "Back to homepage" : "返回首页"}>
          <span className="wordmark-mark">{english ? "T" : "王"}</span>
          <span className="wordmark-name">{english ? "Tommy" : "王永城"} <em>English × Law × AI</em></span>
        </Link>
        <div className="header-tools evidence-header-tools">
          <nav aria-label={english ? "Evidence navigation" : "资料室导航"} id="evidence-navigation">
            <Link href="/">{english ? "Home" : "首页"}</Link>
            <Link href="/achievements">{english ? "Achievements" : "全部成就"}</Link>
            <Link href="/evidence">{english ? "Selected evidence" : "核心证据"}</Link>
            <Link href="/evidence/archive">{english ? "Full archive" : "完整归档"}</Link>
          </nav>
          <MobileMenuButton closeLabel={english ? "Close" : "关闭"} label={english ? "Menu" : "菜单"} navId="evidence-navigation" />
          <button className="language-switch" type="button" onClick={() => setLanguage(english ? "zh" : "en")} aria-label={english ? "切换到中文" : "Switch to English"}>
            <span className={!english ? "active" : ""}>中</span><i>/</i><span className={english ? "active" : ""}>EN</span>
          </button>
        </div>
      </header>

      <section className="evidence-page-hero" id="evidence-main">
        <div className="hero-grid" aria-hidden="true" />
        <div>
          <p className="eyebrow">Evidence room · 2025—</p>
          <h1>{archive ? (english ? <>Complete <span>archive.</span></> : <>证据，<span>完整归档。</span></>) : (english ? <>Evidence,<span>prioritized.</span></> : <>强证据，<span>优先呈现。</span></>)}</h1>
          <p>{archive ? (english ? "Participation records, activity photographs and supporting materials are retained here for completeness." : "参与记录、活动现场与辅助材料集中留存在这里，作为完整经历档案。") : (english ? "The strongest academic, signature-work, service and leadership records are presented first. Supporting material remains available in the complete archive." : "先呈现最能说明学业、代表成果、服务与领导力的材料；其余参与记录和辅助材料收入完整归档。")}</p>
        </div>
        <aside>
          <strong>{visibleCount}</strong>
          <span>{archive ? (english ? "archived records" : "项归档资料") : (english ? "selected records" : "项核心证据")}</span>
          <small>{english ? `${totalEvidenceCount} records retained in total` : `共留存 ${totalEvidenceCount} 项资料`}</small>
        </aside>
      </section>

      <section className="evidence-section evidence-page-content">
        <nav className={`evidence-category-index evidence-category-index-${visibleCategories.length}`} aria-label={english ? "Evidence categories" : "证据分类索引"}>
          {visibleCategories.map((group, groupIndex) => (
            <a href={`#evidence-category-${groupIndex + 1}`} key={group.label}>
              <em>{String(groupIndex + 1).padStart(2, "0")}</em>
              <span>{english ? group.labelEn : group.label}</span>
              <small>{group.items.length}</small>
            </a>
          ))}
        </nav>
        <div className="evidence-tier-link">
          <div>
            <p className="eyebrow">{archive ? "Selected evidence" : "Complete archive"}</p>
            <h2>{archive ? (english ? "Return to the strongest evidence." : "返回核心证据。") : (english ? "Need the complete record?" : "需要查看完整记录？")}</h2>
          </div>
          <Link href={archive ? "/evidence" : "/evidence/archive"}>{archive ? (english ? "Selected evidence" : "核心证据") : (english ? "Open full archive" : "进入完整归档")} <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="evidence-groups">
          {visibleCategories.map((group, groupIndex) => (
            <section className="evidence-group" id={`evidence-category-${groupIndex + 1}`} key={group.label}>
              <header><span>{String(groupIndex + 1).padStart(2, "0")}</span><h2>{english ? group.labelEn : group.label}</h2><small>{group.items.length}</small></header>
              <div className={`evidence-grid evidence-grid-${group.items.length}`}>
                {group.items.map((item) => (
                  <article className={`evidence-card${item.document ? " evidence-document" : ""}`} id={item.id} key={item.id}>
                    {item.image ? (
                      <button className="evidence-card-link" type="button" onClick={() => openPreview(item)} aria-label={`${english ? item.titleEn : item.title} · ${english ? "Preview evidence" : "预览证据"}`}>
                        <img src={item.image} alt={english ? item.titleEn : item.title} loading="lazy" />
                        <div className="evidence-card-copy">
                          <span className="evidence-type">{evidenceType(item, english)}</span>
                          <p>{english ? item.metaEn : item.meta}</p>
                          <h3>{english ? item.titleEn : item.title}</h3>
                          <span>{english ? "View Evidence" : "查看证据"} {arrow}</span>
                        </div>
                      </button>
                    ) : (
                      <a href={item.href} {...(!item.restricted ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={`${english ? item.titleEn : item.title} · ${item.restricted ? (english ? "Request evidence" : "联系获取") : (english ? "Open evidence" : "打开证据")}`}>
                        <div className="document-mark" aria-hidden="true"><span>DOC</span><strong>{item.documentLabel ?? "Original Research"}</strong></div>
                      <div className="evidence-card-copy">
                        <span className="evidence-type">{evidenceType(item, english)}</span>
                        <p>{english ? item.metaEn : item.meta}</p>
                        <h3>{english ? item.titleEn : item.title}</h3>
                        <span>{item.restricted ? (english ? "Request Evidence" : "联系获取") : (english ? "View Evidence" : "查看证据")} {arrow}</span>
                      </div>
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <ContactButton english={english} />
      <BackToTopButton english={english} />

      {preview?.image ? (
        <div className="evidence-lightbox" onClick={() => setPreview(null)} role="presentation">
          <section aria-label={english ? "Evidence image preview" : "证据图片预览"} aria-modal="true" className="evidence-lightbox-dialog" onClick={(event) => event.stopPropagation()} role="dialog">
            <button aria-label={english ? "Close evidence preview" : "关闭证据预览"} autoFocus className="evidence-lightbox-close" onClick={() => setPreview(null)} type="button">
              <span aria-hidden="true">×</span>{english ? "Close" : "关闭"}
            </button>
            <img alt={english ? preview.titleEn : preview.title} src={preview.image} />
            <div>
              <span className="evidence-type">{evidenceType(preview, english)}</span>
              <p>{english ? preview.metaEn : preview.meta}</p>
              <h2>{english ? preview.titleEn : preview.title}</h2>
              <a href={preview.href} rel="noopener noreferrer" target="_blank">{english ? "Open original" : "打开原图"} {arrow}</a>
            </div>
          </section>
        </div>
      ) : null}

      <footer>
        <span>{english ? "Tommy Wang" : "王永城 · Tommy"}</span>
        <nav aria-label={english ? "Site information" : "网站说明"}>
          <Link href="/">{english ? "Back to homepage" : "返回首页"}</Link>
          <Link href="/about-site#accessibility">Accessibility</Link>
          <Link href="/about-site#privacy">Privacy</Link>
          <Link href="/about-site#about">About This Site</Link>
        </nav>
        <span className="evidence-privacy-note">{english ? "Sensitive content and additional evidence are available on request." : "敏感内容及更多证据联系后提供"}</span>
        <span>Last updated · 2026.07</span>
      </footer>
    </main>
  );
}
