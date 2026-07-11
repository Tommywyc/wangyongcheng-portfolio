import { useEffect, useMemo, useState } from "react";
import { academicProfile, achievements, pathway, periodDateLabels, periodOrder } from "./data.js";

const arrow = "↗";
const categories = [...new Set(achievements.map((item) => item.category))];
const chronological = (items) => [...items].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
const featuredEnglish = {
  moot: { category:"Competition Award", period:"Freshman · Spring", role:"Moot court team member", title:'“Quest Cup” Moot Court Competition', description:"Competed in the university-level moot court competition organized by the School of Public Administration at Southwest Jiaotong University.", result:"Merit Award · 7th among 28 teams" },
  "paper-2": { category:"Academic Research", period:"Freshman · Spring", role:"Author", title:"Final-term English Research Paper", englishTitle:"Does AI Equalize Learners or Widen the Gap? Learner Agency and Skill Development in Generative AI-Assisted Learning", description:"A 2,990-word, 11-page paper examining learner agency, skill development and educational equity through literature review, mechanism analysis and counterargument.", result:"Generative AI · Learner Agency · Educational Equity" },
  speech: { category:"Competition Award", period:"Freshman · Spring", role:"English speech contestant", title:"The Window and the Stone", description:"Beginning with a framed view in a Suzhou garden and the Yungang Grottoes, the speech explores how cultural exchange reshapes the ways people see and create.", result:"Second Prize · 84.33" },
  literacy: { category:"Competition Project", period:"Freshman · Spring", role:"Project team member", title:"We Are Not Arguing—The Algorithm Is Pushing Us to Argue", description:"Created a competition micro-video on filter bubbles, recommendation algorithms and information-literacy-based retrieval.", result:"Information Literacy Competition · Result pending" },
  livestream: { category:"Project Practice", period:"Freshman · Spring", role:"Cross-border livestream team member", title:"Cross-border English Livestream for Qionglai Intangible-Cultural-Heritage Liquor", description:"Supported an English-language cross-border e-commerce livestream by bridging scripts, handling transitions and providing supplementary explanations.", result:"Team Second Prize" },
};

const academicEnglish = {
  semesters:[
    { term:"Freshman · Fall", gpa:"3.6 / 4.0", rank:"Major rank 28 / 56", note:"Published" },
    { term:"Freshman · Spring", gpa:"3.8 / 4.0", rank:"Major rank pending", note:"Grades confirmed" },
  ],
  qualifications:[
    { label:"CET-4", value:"568", status:"Completed" },
    { label:"CET-6", value:"—", status:"Result pending" },
    { label:"TEM-4", value:"—", status:"Not taken" },
    { label:"TEM-8", value:"—", status:"Not taken" },
  ],
  research:[
    "Two final-term English research papers completed",
    "AI-assisted English writing assessment: G06F patent application planned",
    "Research on AI in education and digital ethics",
    "Research on accuracy and risk in AI-assisted legal translation",
  ],
};

const pathwayEnglish = [
  { stage:"FOUNDATION", time:"2025—2027", title:"Build options through academic strength", description:"Academic performance is the foundation of postgraduate recommendation. I am turning reading, writing, speaking and translation into stable, verifiable academic competence.", focus:"GPA · CET-6 · TEM-4", actions:["Improve my major ranking", "Complete CET-6 and TEM-4", "Sustain research-oriented English writing"] },
  { stage:"BRIDGE", time:"2026—2028", title:"Connect English with legal competence", description:"I am moving law beyond personal interest through civil-law study, case briefs, moot court, legal English and research on AI-assisted legal translation.", focus:"Case Brief · Legal English · AI & Law", actions:["Build foundations in civil law and case analysis", "Advance research on AI and legal translation", "Test the direction through legal practice"] },
  { stage:"ADVANCE", time:"2028—", title:"Move into legal education and cross-border practice", description:"The next milestone is a Juris Master program for non-law graduates, followed by deeper exploration of cross-border legal services, arbitration, compliance and legal communication.", focus:"J.M. · Compliance · Arbitration", actions:["Produce substantial English × Law work", "Seek legal internships and recommendations", "Identify a concrete role in foreign-related legal practice"] },
];

function Header({ archive = false, lang = "zh", onLanguageChange }) {
  const english = lang === "en";
  return (
    <header className={`site-header ${archive ? "archive-header" : ""}`}>
      <a className="wordmark" href="#top" aria-label={english ? "Back to top" : "返回首页顶部"}>
        <span className="wordmark-mark">WY</span>
        <span className="wordmark-name">王永城 <em>Wang Yongcheng</em></span>
      </a>
      <div className="header-tools">
        <nav aria-label={english ? "Primary navigation" : "主要导航"}>
          <a href="#work">{english ? "Work" : "成果"}</a>
          <a href="#academic">{english ? "Academic" : "学术"}</a>
          {!english && <a href="#/achievements">全部成就</a>}
          <a href="#direction">{english ? "Direction" : "方向"}</a>
          <a href="#about">{english ? "About" : "关于"}</a>
        </nav>
        {!archive && <button className="language-switch" type="button" onClick={() => onLanguageChange(english ? "zh" : "en")} aria-label={english ? "切换到中文" : "Switch to English"}><span className={!english ? "active" : ""}>中</span><i>/</i><span className={english ? "active" : ""}>EN</span></button>}
      </div>
    </header>
  );
}

function Footer() {
  return <footer><span>王永城 · Wang Yongcheng</span><span>English / Research / Law</span><span>Last updated · 2026.07</span></footer>;
}

function Home({ lang, onLanguageChange }) {
  const english = lang === "en";
  const featured = achievements.filter((item) => item.featured).map((item) => english ? { ...item, ...featuredEnglish[item.id] } : item);
  const academics = english ? academicEnglish : academicProfile;
  const paths = english ? pathwayEnglish : pathway;
  return <main className={english ? "lang-en" : "lang-zh"}>
    <a className="skip-link" href="#main-content">{english ? "Skip to main content" : "跳到主要内容"}</a>
    <Header lang={lang} onLanguageChange={onLanguageChange} />
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-kicker"><span>English</span><i /><span>Speech</span><i /><span>Research</span><i /><span>Law</span></div>
      <div className="hero-copy" id="main-content">
        <p className="eyebrow">A living archive of language, ideas &amp; responsibility</p>
        <h1>{english ? <>Understand the world through language.<br /><span>Take responsibility through rules.</span></> : <>以语言理解世界，<br /><span>以规则承担责任。</span></>}</h1>
        <p className="hero-intro">{english ? "I am Wang Yongcheng, an English major at Southwest Jiaotong University. I explore how language connects expression, technology and rules, while moving toward law through academic study, public speaking, competition and interdisciplinary research." : "我是王永城，西南交通大学英语专业学生。我关注语言如何连接表达、技术与规则，并在英语学习、公众演讲、竞赛实践和跨学科研究中逐步走向法律。"}</p>
        <div className="hero-actions"><a className="button button-primary" href="#work">{english ? "Explore selected work" : "浏览精选成果"} <span>{arrow}</span></a><a className="button button-secondary" href="#direction">{english ? "View direction" : "查看发展方向"}</a></div>
      </div>
      <aside className="hero-note"><span className="hero-note-index">01</span><p>{english ? "Language is the entry point" : "语言是入口"}</p><p>{english ? "Rules are the core" : "规则是核心"}</p><p>{english ? "Cross-cultural communication is the advantage" : "跨文化沟通是优势"}</p></aside>
      <div className="hero-monogram" aria-hidden="true"><span>EN</span><span>/</span><span>LAW</span></div>
    </section>

    <section className="work-section" id="work">
      <div className="section-heading"><div><p className="eyebrow">Selected work · 2025—2026</p><h2>{english ? "Selected Work" : "精选成果"}</h2></div><p>{english ? "These projects are presented for the abilities they developed: expression, retrieval, argumentation, collaboration and research." : "不把经历堆成清单，而是保留每个项目真正训练过的能力：表达、检索、论证、协作与研究。"}</p></div>
      <div className="work-list">{featured.map((item, index) => <article className={`work-card accent-${item.accent}`} key={item.id}><div className="work-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.category}</span><span>{item.date}</span></div><div className="work-title"><h3>{item.title}</h3>{item.englishTitle && <p>{item.englishTitle}</p>}</div><p className="work-summary">{item.description}</p><div className="work-result"><strong>{item.result || item.status}</strong><div className="tag-row"><span>{item.period}</span><span>{item.role}</span></div></div></article>)}</div>
      {!english && <div className="all-work-cta"><div><p className="eyebrow">Complete archive</p><h3>这不是全部。</h3><p>进入完整档案，按时间或标签查看学生工作、志愿服务、学术研究与竞赛实践。</p></div><a className="archive-link" href="#/achievements">全部成就 <span>{arrow}</span></a></div>}
    </section>

    <section className="academic-section" id="academic">
      <div className="section-heading academic-heading"><div><p className="eyebrow">Academic profile</p><h2>{english ? "Academic Profile" : "学术概况"}</h2></div><p>{english ? "Grades form the academic foundation; research extends the questions I choose to pursue. This section records verifiable performance and emerging research directions." : "成绩是学习基础，研究是问题意识的延伸。这里记录可验证的学术表现，也保留正在形成中的研究方向。"}</p></div>
      <div className="academic-grid">
        <article className="academic-card"><p className="eyebrow">Academic performance</p><h3>{english ? "GPA Progress" : "GPA 轨迹"}</h3><div className="gpa-track">{academics.semesters.map((item) => <div className="gpa-step" key={item.term}><div><span>{item.term}</span><strong>{item.gpa}</strong></div><p>{item.rank}</p><small>{item.note}</small></div>)}</div></article>
        <article className="academic-card"><p className="eyebrow">English qualifications</p><h3>{english ? "English Qualifications" : "英语能力记录"}</h3><div className="qualification-list">{academics.qualifications.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong><small>{item.status}</small></div>)}</div></article>
        <article className="academic-card research-card"><div><p className="eyebrow">Research trajectory</p><h3>{english ? "From Course Papers to Interdisciplinary Research" : "从课程论文到交叉研究"}</h3></div><ul>{academics.research.map((item) => <li key={item}>{item}</li>)}</ul>{!english && <a href="#/achievements?tag=学术成果">查看全部学术成果 <span>{arrow}</span></a>}</article>
      </div>
    </section>

    <section className="direction-section" id="direction">
      <div className="direction-intro"><p className="eyebrow">English × Law</p><h2>{english ? "From English toward Law." : "从英语出发，走向法律。"}</h2><p>{english ? "This is more than a change of academic field. It is a path that preserves options through academic performance, approaches legal questions through English, and tests the direction through research and practice. Each step should leave behind verifiable grades, texts and experience." : "这不是一次简单的“跨专业”，而是一条以学业表现保留选择权、以英语能力进入法律问题、再以研究与实践验证方向的路径。每一步都需要留下可被检验的成绩、文本和经历。"}</p></div>
      <div className="pathway">{paths.map((item, index) => <article className="path-card" key={item.stage}><div className="path-head"><span>{item.stage}</span><time>{item.time}</time></div><div className="path-number">{index + 1}</div><h3>{item.title}</h3><p>{item.description}</p><ul className="path-actions">{item.actions.map((action) => <li key={action}>{action}</li>)}</ul><strong>{item.focus}</strong></article>)}</div>
      <div className="about-strip" id="about"><p className="eyebrow">About this site</p><p>{english ? "This is a living academic portfolio. The page presents my central direction, representative work, academic profile and current development pathway." : "这是一个持续更新的个人学习档案。首页保留最重要的主线与代表性成果；“全部成就”记录完整经历，并明确区分获奖、参赛、任职与进行中项目。"}</p><a href="#top">{english ? "Back to top ↑" : "回到顶部 ↑"}</a></div>
    </section>
    <Footer />
  </main>;
}

function AchievementCard({ item }) {
  return <article className="archive-card"><div className="archive-card-meta"><span>{item.date}</span><span>{item.category}</span><span className={`status status-${item.status}`}>{item.status}</span></div><div className="archive-card-copy"><p className="archive-role">{item.role}</p><h3>{item.title}</h3>{item.englishTitle && <p className="archive-english">{item.englishTitle}</p>}<p className="archive-description">{item.description}</p>{item.result && <strong className={`archive-result ${item.status === "获奖" ? "archive-result-award" : ""}`}>{item.result}</strong>}</div></article>;
}

function Archive({ query }) {
  const requested = new URLSearchParams(query).get("tag");
  const initialTag = categories.includes(requested) ? requested : "全部";
  const [view, setView] = useState(requested ? "tags" : "time");
  const [activeCategory, setActiveCategory] = useState(initialTag);
  const filtered = useMemo(() => chronological(activeCategory === "全部" ? achievements : achievements.filter((item) => item.category === activeCategory)), [activeCategory]);
  return <main>
    <a className="skip-link" href="#archive-main">跳到主要内容</a><Header archive />
    <section className="archive-hero" id="archive-main"><div className="hero-grid" /><p className="eyebrow">Complete archive · 2025—</p><h1>全部成就<span>与经历。</span></h1><p>一份按时间生长、也可按标签阅读的个人档案。这里既保留获奖成果，也记录学生工作、志愿服务、学术研究与尚在推进的竞赛项目。</p><div className="archive-hero-note"><strong>两种阅读方式</strong><span>时间轴看成长路径</span><span>标签看能力结构</span></div></section>
    <section className="archive-explorer"><div className="view-toolbar"><div className="view-switch" role="tablist"><button className={view === "time" ? "active" : ""} onClick={() => setView("time")}>按时间</button><button className={view === "tags" ? "active" : ""} onClick={() => setView("tags")}>按标签</button></div><p>{achievements.length} 项经历 · 持续更新</p></div>
    {view === "time" ? <div className="timeline-view">{periodOrder.map((period) => { const items = chronological(achievements.filter((item) => item.period === period)); return <section className="timeline-period" key={period}><header><p>{periodDateLabels[period]}</p><h2>{period}</h2><span>{String(items.length).padStart(2, "0")}</span></header><div className="timeline-items">{items.map((item) => <AchievementCard item={item} key={item.id} />)}</div></section>; })}</div> : <div className="tag-view"><div className="category-filter">{["全部", ...categories].map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}<span>{category === "全部" ? achievements.length : achievements.filter((item) => item.category === category).length}</span></button>)}</div><div className="tag-results"><div className="tag-results-heading"><p className="eyebrow">Filtered archive</p><h2>{activeCategory}</h2></div><div className="timeline-items">{filtered.map((item) => <AchievementCard item={item} key={item.id} />)}</div></div></div>}</section>
    <Footer />
  </main>;
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash || "#top");
  const [lang, setLang] = useState(() => localStorage.getItem("portfolio-language") === "en" ? "en" : "zh");
  useEffect(() => { const handler = () => setHash(window.location.hash || "#top"); window.addEventListener("hashchange", handler); return () => window.removeEventListener("hashchange", handler); }, []);
  useEffect(() => {
    localStorage.setItem("portfolio-language", lang);
    const archivePage = hash.startsWith("#/achievements");
    document.documentElement.lang = archivePage || lang === "zh" ? "zh-CN" : "en";
    document.title = archivePage || lang === "zh" ? "王永城 · 英语与法律发展档案" : "Wang Yongcheng · English × Law";
  }, [hash, lang]);
  useEffect(() => {
    if (hash.startsWith("#/") || hash === "#top") return;
    requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
  }, [hash]);
  const match = hash.match(/^#\/achievements(?:\?(.*))?$/);
  if (match) return <Archive query={match[1] || ""} />;
  return <Home lang={lang} onLanguageChange={setLang} />;
}
