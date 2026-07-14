"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackToTopButton from "../components/BackToTopButton";
import ContactButton from "../components/ContactButton";
import MobileMenuButton from "../components/MobileMenuButton";

export default function AboutSiteContent() {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const english = language === "en";

  useEffect(() => {
    if (window.localStorage.getItem("portfolio-language") === "en") setLanguage("en");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = english ? "en" : "zh-CN";
    document.title = english ? "Accessibility, Privacy & Content｜Tommy" : "网站说明｜王永城 Tommy";
  }, [english, language]);

  return (
    <main className={`information-page ${english ? "lang-en" : "lang-zh"}`}>
      <a className="skip-link" href="#information-main">{english ? "Skip to main content" : "跳到主要内容"}</a>

      <header className="site-header archive-header information-header">
        <Link className="wordmark" href="/" aria-label={english ? "Back to home" : "返回首页"}>
          <span className="wordmark-mark">T</span>
          <span className="wordmark-name">Tommy <em>English × Law × AI</em></span>
        </Link>
        <div className="header-tools">
          <nav aria-label={english ? "About this site navigation" : "网站说明导航"} id="information-navigation">
            <Link href="/">{english ? "Home" : "首页"}</Link>
            <a href="#accessibility">{english ? "Accessibility" : "无障碍"}</a>
            <a href="#privacy">{english ? "Privacy" : "隐私"}</a>
            <a href="#about">{english ? "About" : "关于"}</a>
          </nav>
          <MobileMenuButton closeLabel={english ? "Close" : "关闭"} label={english ? "Menu" : "菜单"} navId="information-navigation" />
          <button className="language-switch" type="button" onClick={() => setLanguage(english ? "zh" : "en")} aria-label={english ? "切换到中文" : "Switch to English"}>
            <span className={!english ? "active" : ""}>中</span><i>/</i><span className={english ? "active" : ""}>EN</span>
          </button>
        </div>
      </header>

      <section className="information-hero" id="information-main">
        <div className="hero-grid" aria-hidden="true" />
        <p className="eyebrow">{english ? "About this site · July 2026" : "网站说明 · 2026 年 7 月"}</p>
        <h1>{english ? <>Clear, considered,<span>and continuously improving.</span></> : <>清晰、克制，<span>并持续改进。</span></>}</h1>
        <p>{english ? "This page explains the practical measures and current limits behind accessibility, privacy and content presentation on this site." : "本页说明网站在无障碍、隐私和内容呈现方面采取的实际做法与当前限制。"}</p>
      </section>

      <div className="information-content">
        <section aria-labelledby="accessibility-title" id="accessibility">
          <p className="eyebrow">Accessibility Statement</p>
          <h2 id="accessibility-title">{english ? "Accessibility" : "无障碍说明"}</h2>
          <p>{english ? "The site prioritizes clear information hierarchy, keyboard access, colour contrast, alternative text, mobile reading and reduced motion. WCAG 2.2 AA is used as a reference for continuous improvement." : "本网站在设计与开发中关注清晰的信息层级、键盘访问、颜色对比、替代文本、移动端阅读和减少动画等无障碍原则，并以 WCAG 2.2 AA 的相关要求作为持续改进参考。"}</p>
          <p>{english ? "It provides a skip-to-content link, visible keyboard focus, semantic headings and regions, image alternative text, reduced-motion support, and keyboard-accessible navigation, menus, language controls, evidence previews and download links." : "网站已提供跳到主要内容的链接、可见键盘焦点、语义化标题与区域、图片替代文本、减少动画偏好支持，以及可通过键盘使用的主要导航、菜单、语言切换、资料预览和下载入口。"}</p>
          <p>{english ? <>Different devices, browsers, font settings and assistive technologies may still reveal issues. If you encounter an access barrier, please contact <a href="mailto:w3194510963@gmail.com">w3194510963@gmail.com</a>.</> : <>不同设备、浏览器、系统字体设置和辅助技术仍可能产生未发现的问题。如在访问过程中遇到障碍，欢迎通过 <a href="mailto:w3194510963@gmail.com">w3194510963@gmail.com</a> 联系。</>}</p>
        </section>

        <section aria-labelledby="privacy-title" id="privacy">
          <p className="eyebrow">Privacy Notice</p>
          <h2 id="privacy-title">{english ? "Privacy" : "隐私说明"}</h2>
          <p>{english ? "The site follows data minimisation: it has no advertising tracking, analytics, heatmaps, third-party comments or web forms, and it does not sell visitor data. No non-essential cookies are set." : "本网站采用数据最小化原则，不设置广告追踪，不使用网站分析、热力图、第三方评论或在线表单，也不出售访客个人数据。网站本身不设置非必要 Cookie。"}</p>
          <p>{english ? "Language preference is stored only in localStorage on the visitor’s device, so the Chinese or English interface can be remembered. Images, fonts, PDFs and evidence are served as first-party static assets, without automatically embedded third-party video or imagery." : "语言切换偏好会保存在访问设备的本地存储（localStorage）中，仅用于在下次访问时保留中文或英文界面选择。网站图片、字体、PDF 与证据资料均从本站静态资源加载，没有自动嵌入第三方视频或外部图片。"}</p>
          <p>{english ? "Contact uses a standard mail link. Information is used only for reply and follow-up when a visitor voluntarily opens an email client and sends a message. The hosting provider may process basic access logs for security, availability and operations." : "“联系我”使用标准邮件链接。只有当访客主动打开邮件客户端并发送邮件时，相关信息才会被用于回复和后续沟通。托管服务商可能出于网站安全、可用性与运行需要处理基础访问日志。"}</p>
          <p>{english ? "Public evidence removes student numbers, certificate numbers, QR codes, group numbers and other unnecessary verification data wherever possible. Sensitive materials and additional evidence are available only after contact and purpose confirmation." : "公开证据已尽量移除与核验无关的学号、证件号码、二维码、群号等信息；敏感内容及更多证据仅在联系并确认用途后提供。"}</p>
          <p><strong>{english ? "Updated:" : "更新时间："}</strong>{english ? " July 2026" : "2026 年 7 月"}</p>
        </section>

        <section aria-labelledby="about-title" id="about">
          <p className="eyebrow">About This Site</p>
          <h2 id="about-title">{english ? "About this site" : "关于网站"}</h2>
          <p>{english ? "This is Tommy Wang’s academic and growth portfolio. Through English × Law × AI, it records research writing, public speaking, moot court, student work, volunteer service and questions still in progress." : "这是王永城的个人学术与成长作品集，围绕 English × Law × AI，记录研究写作、公众表达、模拟法庭、学生工作、志愿服务和仍在推进的问题。"}</p>
          <p>{english ? "Its presentation prioritizes accessibility, privacy and clear typography. Content changes with actual study and practice, distinguishing completed work, ongoing inquiry and planned commitments." : "网站设计关注无障碍、隐私与清晰排版。内容会随真实学习与实践进展更新，并区分已完成成果、正在研究的问题与未来拟履任事项。"}</p>
          <p>{english ? "Bilingual switching is provided only on the homepage, Evidence Room and this Accessibility, Privacy & About This Site page. Other archive pages are presented in Chinese first to preserve the original record context." : "双语切换仅在首页、证据资料室及本“无障碍、隐私和内容呈现”页面提供；其余归档页面以中文优先呈现，以保留原始记录语境。"}</p>
        </section>
      </div>

      <ContactButton />
      <BackToTopButton />

      <footer>
        <span>Tommy · English × Law × AI</span>
        <nav aria-label={english ? "Main pages" : "网站主要页面"}>
          <Link href="/">{english ? "Home" : "首页"}</Link>
          <Link href="/achievements">{english ? "All Achievements" : "全部成就"}</Link>
          <Link href="/evidence">{english ? "Evidence Room" : "证据资料室"}</Link>
        </nav>
        <span>Last updated · 2026.07</span>
      </footer>
    </main>
  );
}
