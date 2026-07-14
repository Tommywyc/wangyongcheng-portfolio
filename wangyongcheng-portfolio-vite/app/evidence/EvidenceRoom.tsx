"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { evidenceCategories, type EvidenceItem } from "../evidence-data";
import BackToTopButton from "../components/BackToTopButton";
import ContactButton from "../components/ContactButton";
import MobileMenuButton from "../components/MobileMenuButton";

const arrow = "↗";

export default function EvidenceRoom() {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const [preview, setPreview] = useState<EvidenceItem | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const english = language === "en";

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
    document.title = english ? "Evidence Room｜王永城 Tommy｜English × Law × AI" : "证据资料室｜王永城 Tommy｜English × Law × AI";
  }, [english, language]);

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
    <main className={english ? "evidence-page lang-en" : "evidence-page lang-zh"}>
      <a className="skip-link" href="#evidence-main">{english ? "Skip to evidence" : "跳到证据内容"}</a>

      <header className="site-header archive-header evidence-header">
        <Link className="wordmark" href="/" aria-label={english ? "Back to homepage" : "返回首页"}>
          <span className="wordmark-mark">T</span>
          <span className="wordmark-name">Tommy <em>English × Law × AI</em></span>
        </Link>
        <div className="header-tools evidence-header-tools">
          <nav aria-label={english ? "Evidence navigation" : "资料室导航"} id="evidence-navigation">
            <Link href="/">{english ? "Home" : "首页"}</Link>
            <Link href="/achievements">{english ? "Archive" : "全部成就"}</Link>
            <a href="#evidence-main">{english ? "Evidence" : "证据资料室"}</a>
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
          <h1>{english ? <>Evidence,<span>organized.</span></> : <>证据，<span>分类留存。</span></>}</h1>
          <p>{english ? "Certificates, score records and original writing are organized by purpose. Each item can be opened directly, while identifiers unrelated to verification have been minimized." : "按用途整理证书、成绩记录与原创文本。每项资料均可直接打开核验，与证明无关的个人信息已尽量弱化。"}</p>
        </div>
        <aside>
          <strong>{evidenceCategories.reduce((sum, group) => sum + group.items.length, 0)}</strong>
          <span>{english ? "verified records" : "项核心资料"}</span>
          <small>{english ? "Academic · Practice · Service · Campus · Writing" : "学业 · 实践 · 志愿 · 校园 · 写作"}</small>
        </aside>
      </section>

      <section className="evidence-section evidence-page-content">
        <nav className="evidence-category-index" aria-label={english ? "Evidence categories" : "证据分类索引"}>
          {evidenceCategories.map((group, groupIndex) => (
            <a href={`#evidence-category-${groupIndex + 1}`} key={group.label}>
              <em>{String(groupIndex + 1).padStart(2, "0")}</em>
              <span>{english ? group.labelEn : group.label}</span>
              <small>{group.items.length}</small>
            </a>
          ))}
        </nav>
        <div className="evidence-groups">
          {evidenceCategories.map((group, groupIndex) => (
            <section className="evidence-group" id={`evidence-category-${groupIndex + 1}`} key={group.label}>
              <header><span>{String(groupIndex + 1).padStart(2, "0")}</span><h2>{english ? group.labelEn : group.label}</h2><small>{group.items.length}</small></header>
              <div className={`evidence-grid evidence-grid-${group.items.length}`}>
                {group.items.map((item) => (
                  <article className={`evidence-card${item.document ? " evidence-document" : ""}`} id={item.id} key={item.id}>
                    {item.image ? (
                      <button className="evidence-card-link" type="button" onClick={() => openPreview(item)} aria-label={`${english ? item.titleEn : item.title} · ${english ? "Preview evidence" : "预览证据"}`}>
                        <img src={item.image} alt={english ? item.titleEn : item.title} loading="lazy" />
                        <div className="evidence-card-copy">
                          <p>{english ? item.metaEn : item.meta}</p>
                          <h3>{english ? item.titleEn : item.title}</h3>
                          <span>{english ? "View Evidence" : "查看证据"} {arrow}</span>
                        </div>
                      </button>
                    ) : (
                      <a href={item.href} {...(!item.restricted ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={`${english ? item.titleEn : item.title} · ${item.restricted ? (english ? "Request evidence" : "联系获取") : (english ? "Open evidence" : "打开证据")}`}>
                        <div className="document-mark" aria-hidden="true"><span>DOC</span><strong>{item.documentLabel ?? "Original Research"}</strong></div>
                      <div className="evidence-card-copy">
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

      <ContactButton />
      <BackToTopButton />

      {preview?.image ? (
        <div className="evidence-lightbox" onClick={() => setPreview(null)} role="presentation">
          <section aria-label={english ? "Evidence image preview" : "证据图片预览"} aria-modal="true" className="evidence-lightbox-dialog" onClick={(event) => event.stopPropagation()} role="dialog">
            <button aria-label={english ? "Close evidence preview" : "关闭证据预览"} autoFocus className="evidence-lightbox-close" onClick={() => setPreview(null)} type="button">
              <span aria-hidden="true">×</span>{english ? "Close" : "关闭"}
            </button>
            <img alt={english ? preview.titleEn : preview.title} src={preview.image} />
            <div>
              <p>{english ? preview.metaEn : preview.meta}</p>
              <h2>{english ? preview.titleEn : preview.title}</h2>
              <a href={preview.href} rel="noopener noreferrer" target="_blank">{english ? "Open original" : "打开原图"} {arrow}</a>
            </div>
          </section>
        </div>
      ) : null}

      <footer>
        <span>王永城 · Tommy</span>
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
