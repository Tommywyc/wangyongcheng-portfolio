import { useEffect, useMemo, useState } from "react";
import { academicProfile, achievements, pathway, periodDateLabels, periodOrder } from "./data.js";

const arrow = "↗";
const categories = [...new Set(achievements.map((item) => item.category))];
const chronological = (items) => [...items].sort((a, b) => a.sortDate.localeCompare(b.sortDate));

function Header({ archive = false }) {
  return (
    <header className={`site-header ${archive ? "archive-header" : ""}`}>
      <a className="wordmark" href={archive ? "#top" : "#top"} aria-label="返回首页顶部">
        <span className="wordmark-mark">WY</span>
        <span className="wordmark-name">王永城 <em>Wang Yongcheng</em></span>
      </a>
      <nav aria-label="主要导航">
        <a href="#work">成果</a>
        <a href="#academic">学术</a>
        <a href="#/achievements">全部成就</a>
        <a href="#direction">方向</a>
        <a href="#about">关于</a>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer><span>王永城 · Wang Yongcheng</span><span>English / Research / Law</span><span>Last updated · 2026.07</span></footer>;
}

function Home() {
  const featured = achievements.filter((item) => item.featured);
  return <main>
    <a className="skip-link" href="#main-content">跳到主要内容</a>
    <Header />
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-kicker"><span>English</span><i /><span>Speech</span><i /><span>Research</span><i /><span>Law</span></div>
      <div className="hero-copy" id="main-content">
        <p className="eyebrow">A living archive of language, ideas &amp; responsibility</p>
        <h1>以语言理解世界，<br /><span>以规则承担责任。</span></h1>
        <p className="hero-intro">我是王永城，西南交通大学英语专业学生。我关注语言如何连接表达、技术与规则，并在英语学习、公众演讲、竞赛实践和跨学科研究中逐步走向法律。</p>
        <div className="hero-actions"><a className="button button-primary" href="#work">浏览精选成果 <span>{arrow}</span></a><a className="button button-secondary" href="#direction">查看发展方向</a></div>
      </div>
      <aside className="hero-note"><span className="hero-note-index">01</span><p>语言是入口</p><p>规则是核心</p><p>跨文化沟通是优势</p></aside>
      <div className="hero-monogram" aria-hidden="true"><span>EN</span><span>/</span><span>LAW</span></div>
    </section>

    <section className="work-section" id="work">
      <div className="section-heading"><div><p className="eyebrow">Selected work · 2025—2026</p><h2>精选成果</h2></div><p>不把经历堆成清单，而是保留每个项目真正训练过的能力：表达、检索、论证、协作与研究。</p></div>
      <div className="work-list">{featured.map((item, index) => <article className={`work-card accent-${item.accent}`} key={item.id}><div className="work-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.category}</span><span>{item.date}</span></div><div className="work-title"><h3>{item.title}</h3>{item.englishTitle && <p>{item.englishTitle}</p>}</div><p className="work-summary">{item.description}</p><div className="work-result"><strong>{item.result || item.status}</strong><div className="tag-row"><span>{item.period}</span><span>{item.role}</span></div></div></article>)}</div>
      <div className="all-work-cta"><div><p className="eyebrow">Complete archive</p><h3>这不是全部。</h3><p>进入完整档案，按时间或标签查看学生工作、志愿服务、学术研究与竞赛实践。</p></div><a className="archive-link" href="#/achievements">全部成就 <span>{arrow}</span></a></div>
    </section>

    <section className="academic-section" id="academic">
      <div className="section-heading academic-heading"><div><p className="eyebrow">Academic profile</p><h2>学术概况</h2></div><p>成绩是学习基础，研究是问题意识的延伸。这里记录可验证的学术表现，也保留正在形成中的研究方向。</p></div>
      <div className="academic-grid">
        <article className="academic-card"><p className="eyebrow">Academic performance</p><h3>GPA 轨迹</h3><div className="gpa-track">{academicProfile.semesters.map((item) => <div className="gpa-step" key={item.term}><div><span>{item.term}</span><strong>{item.gpa}</strong></div><p>{item.rank}</p><small>{item.note}</small></div>)}</div></article>
        <article className="academic-card"><p className="eyebrow">English qualifications</p><h3>英语能力记录</h3><div className="qualification-list">{academicProfile.qualifications.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong><small>{item.status}</small></div>)}</div></article>
        <article className="academic-card research-card"><div><p className="eyebrow">Research trajectory</p><h3>从课程论文到交叉研究</h3></div><ul>{academicProfile.research.map((item) => <li key={item}>{item}</li>)}</ul><a href="#/achievements?tag=学术成果">查看全部学术成果 <span>{arrow}</span></a></article>
      </div>
    </section>

    <section className="direction-section" id="direction">
      <div className="direction-intro"><p className="eyebrow">English × Law</p><h2>从英语出发，走向法律。</h2><p>这不是一次简单的“跨专业”，而是一条以学业表现保留选择权、以英语能力进入法律问题、再以研究与实践验证方向的路径。每一步都需要留下可被检验的成绩、文本和经历。</p></div>
      <div className="pathway">{pathway.map((item, index) => <article className="path-card" key={item.stage}><div className="path-head"><span>{item.stage}</span><time>{item.time}</time></div><div className="path-number">{index + 1}</div><h3>{item.title}</h3><p>{item.description}</p><ul className="path-actions">{item.actions.map((action) => <li key={action}>{action}</li>)}</ul><strong>{item.focus}</strong></article>)}</div>
      <div className="about-strip" id="about"><p className="eyebrow">About this site</p><p>这是一个持续更新的个人学习档案。首页保留最重要的主线与代表性成果；“全部成就”记录完整经历，并明确区分获奖、参赛、任职与进行中项目。</p><a href="#top">回到顶部 ↑</a></div>
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
  useEffect(() => { const handler = () => setHash(window.location.hash || "#top"); window.addEventListener("hashchange", handler); return () => window.removeEventListener("hashchange", handler); }, []);
  useEffect(() => {
    if (hash.startsWith("#/") || hash === "#top") return;
    requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
  }, [hash]);
  const match = hash.match(/^#\/achievements(?:\?(.*))?$/);
  if (match) return <Archive query={match[1] || ""} />;
  return <Home />;
}
