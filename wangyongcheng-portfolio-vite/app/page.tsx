"use client";

import { useEffect, useState } from "react";
import { academicProfile, featuredAchievements, pathway } from "./content";
import BackToTopButton from "./components/BackToTopButton";

const arrow = "↗";

const featuredEnglish: Record<string, { category: string; period: string; role: string; title: string; englishTitle?: string; description: string; result: string }> = {
  "“求索杯”模拟法庭": { category:"Competition Award", period:"Freshman · Spring", role:"Moot court team member", title:'“Quest Cup” Moot Court Competition', description:"Competed in the university-level moot court competition organized by the School of Public Administration at Southwest Jiaotong University.", result:"Merit Award · 7th among 28 teams" },
  "大一下学期期末英文研究论文": { category:"Academic Research", period:"Freshman · Spring", role:"Author", title:"Final-term English Research Paper", englishTitle:"Does AI Equalize Learners or Widen the Gap? Learner Agency and Skill Development in Generative AI-Assisted Learning", description:"A 2,990-word, 11-page paper examining learner agency, skill development and educational equity through literature review, mechanism analysis and counterargument.", result:"Generative AI · Learner Agency · Educational Equity" },
  "窗与石": { category:"Competition Award", period:"Freshman · Spring", role:"English speech contestant", title:"The Window and the Stone", description:"Beginning with a framed view in a Suzhou garden and the Yungang Grottoes, the speech explores how cultural exchange reshapes the ways people see and create.", result:"Second Prize · 84.33" },
  "我们不是在争吵，而是在被算法推着争吵": { category:"Competition Project", period:"Freshman · Spring", role:"Project team member", title:"We Are Not Arguing—The Algorithm Is Pushing Us to Argue", description:"Created a competition micro-video on filter bubbles, recommendation algorithms and information-literacy-based retrieval.", result:"Information Literacy Competition · Result pending" },
  "非遗邛崃酒跨境英文直播": { category:"Project Practice", period:"Freshman · Spring", role:"Cross-border livestream team member", title:"Cross-border English Livestream for Qionglai Intangible-Cultural-Heritage Liquor", description:"Supported an English-language cross-border e-commerce livestream by bridging scripts, handling transitions and providing supplementary explanations.", result:"Team Second Prize" },
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

export default function Home() {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const english = language === "en";
  const featured = featuredAchievements.map((item) => english ? { ...item, ...featuredEnglish[item.title] } : item);
  const academics = english ? academicEnglish : academicProfile;
  const paths = english ? pathwayEnglish : pathway;

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "en") setLanguage("en");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = english ? "en" : "zh-CN";
    document.title = english ? "Wang Yongcheng · English × Law" : "王永城 · 英语与法律发展档案";
  }, [english, language]);

  return (
    <main className={english ? "lang-en" : "lang-zh"}>
      <a className="skip-link" href="#main-content">
        {english ? "Skip to main content" : "跳到主要内容"}
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页顶部">
          <span className="wordmark-mark">WY</span>
          <span className="wordmark-name">
            王永城 <em>Wang Yongcheng</em>
          </span>
        </a>

        <div className="header-tools">
          <nav className="header-index" aria-label={english ? "Page index" : "页面索引"}>
            <a href="#identity"><span>{english ? "Profile" : "个人档案"}</span></a>
            <a href="#academic"><span>{english ? "Academic Profile" : "学术概况"}</span></a>
            <a href="#work"><span>{english ? "Selected Work" : "成果展示"}</span></a>
            <a href="/evidence"><span>{english ? "Evidence Room" : "证据资料室"}</span></a>
            <a href="#direction"><span>{english ? "Direction" : "发展方向"}</span></a>
          </nav>
          <button className="language-switch" type="button" onClick={() => setLanguage(english ? "zh" : "en")} aria-label={english ? "切换到中文" : "Switch to English"}>
            <span className={!english ? "active" : ""}>中</span><i>/</i><span className={english ? "active" : ""}>EN</span>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <nav className="hero-index" aria-label={english ? "Profile index" : "能力索引"}>
          <a href="#identity"><em>01</em><span>Profile</span></a>
          <i />
          <a href="#academic"><em>02</em><span>Academic</span></a>
          <i />
          <a href="#work"><em>03</em><span>Selected Work</span></a>
          <i />
          <a href="/evidence"><em>04</em><span>Evidence Room</span></a>
          <i />
          <a href="#direction"><em>05</em><span>Direction</span></a>
        </nav>

        <div className="hero-copy" id="main-content">
          <p className="eyebrow">A living archive of language, ideas &amp; responsibility</p>
          <h1>
            {english ? <>Understand the world through language.<br /><span>Take responsibility through rules.</span></> : <>以语言理解世界，<br /><span>以规则承担责任。</span></>}
          </h1>
          <p className="hero-intro">
            {english ? "I am Wang Yongcheng, an English major at Southwest Jiaotong University. I explore how language connects expression, technology and rules, while moving toward law through academic study, public speaking, competition and interdisciplinary research." : "我是王永城，西南交通大学英语专业学生。我关注语言如何连接表达、技术与规则，并在英语学习、公众演讲、竞赛实践和跨学科研究中逐步走向法律。"}
          </p>
          <div className="hero-actions hero-section-links" aria-label={english ? "Section shortcuts" : "首页板块快捷入口"}>
            {[
              ["01", english ? "Read my profile" : "阅读个人档案", "#identity"],
              ["02", english ? "View academic profile" : "查看学术概况", "#academic"],
              ["03", english ? "Browse selected work" : "浏览成果展示", "#work"],
              ["04", english ? "View Evidence" : "查看证据", "/evidence"],
              ["05", english ? "Explore my direction" : "阅读发展方向", "#direction"],
            ].map(([number, label, href]) => (
              <a href={href} key={number}><em>{number}</em><span>{label}</span><i aria-hidden="true">{arrow}</i></a>
            ))}
          </div>
        </div>

        <aside className="hero-media" aria-label={english ? "Portrait and profile statement" : "个人形象与定位"}>
          <img src="/images/hero-library.webp" alt={english ? "Wang Yongcheng in a library" : "王永城在图书馆中的正式形象照"} />
          <div className="hero-note">
            <span className="hero-note-index">01</span>
            <p>{english ? "Language is the entry point" : "语言是入口"}</p>
            <p>{english ? "Rules are the core" : "规则是核心"}</p>
            <p>{english ? "Cross-cultural communication is the advantage" : "跨文化沟通是优势"}</p>
          </div>
        </aside>

        <div className="hero-monogram" aria-hidden="true">
          <span>EN</span>
          <span>/</span>
          <span>LAW</span>
        </div>
      </section>

      <section className="identity-section" id="identity">
        <div className="identity-layout identity-layout-compact">
          <div className="identity-heading">
            <p className="eyebrow">02 · Profile</p>
            <h2>{english ? "Language is my foundation. Law is the direction I am building toward." : "以英语为基，向法律生长。"}</h2>
            <p className="identity-side-note">{english ? "First-year undergraduate · English major" : "大一 · 英语专业 · 持续生长的学习档案"}</p>
          </div>

          <div className="identity-copy">
            <p>
              {english ? "I am Wang Yongcheng, an English major at Southwest Jiaotong University. I am building an English × Law pathway: first securing academic options through strong performance and language competence, then testing that direction through research writing, public speaking, moot court and work on AI-assisted legal translation." : "我是王永城，西南交通大学外国语学院英语专业学生。我的主线不是简单地把英语和法律并列，而是先以学业表现与语言能力建立选择权，再通过英文研究、公众演讲、模拟法庭和AI法律翻译等实践，逐步验证英语×法律与涉外法治方向。"}
            </p>
            <p>
              {english ? "My current focus is to improve my academic ranking, produce research-based English work, and turn interdisciplinary interests into verifiable texts, projects and practical experience." : "现阶段，我关注学业排名、研究型英文写作和跨学科项目积累，希望让兴趣最终沉淀为可验证的文本、成果与实践经历。"}
            </p>
            <div className="identity-facts" aria-label={english ? "Profile facts" : "个人信息概览"}>
              <div><span>{english ? "Institution" : "学校"}</span><strong>{english ? "Southwest Jiaotong University" : "西南交通大学"}</strong></div>
              <div><span>{english ? "Major" : "专业"}</span><strong>{english ? "English" : "英语专业"}</strong></div>
              <div><span>{english ? "Direction" : "方向"}</span><strong>English × Law</strong></div>
            </div>
          </div>
        </div>

        <div className="identity-showcase">
          <figure className="identity-portrait">
            <img src="/images/profile-formal.webp" alt={english ? "Formal portrait of Wang Yongcheng" : "王永城正式证件形象照"} />
            <figcaption>{english ? "Wang Yongcheng · English × Law" : "王永城 · English × Law"}</figcaption>
          </figure>

          <div className="identity-scene-stack" aria-label={english ? "Study scenes" : "学习场景"}>
            <figure className="identity-scene identity-scene-wide">
              <img src="/images/research-study.webp" alt={english ? "Research writing in the library" : "在图书馆进行研究写作"} />
              <figcaption>{english ? "Research writing" : "研究写作"}</figcaption>
            </figure>
            <figure className="identity-scene">
              <img src="/images/law-study.webp" alt={english ? "Studying English and law" : "阅读英语与法律书籍"} />
              <figcaption>{english ? "English × Law" : "英语 × 法律"}</figcaption>
            </figure>
          </div>

          <div className="resume-suite">
            <div className="resume-suite-heading">
              <p className="eyebrow">Two résumés · Chinese &amp; English</p>
              <h3>{english ? "Choose the version that fits the application." : "两份简历，对应两种申请场景。"}</h3>
              <p>{english ? "Each one-page résumé is available in both English and Chinese. The academic version foregrounds grades and research; the practice version foregrounds communication, projects, leadership and service." : "每份均提供中文与英文的一页PDF。学术申请版强调成绩与研究；实践申请版强调表达、项目、学生工作与志愿服务。"}</p>
            </div>
            <div className="resume-options">
              <article>
                <span>01 · Academic</span>
                <h4>{english ? "Academic Application" : "学术申请版"}</h4>
                <p>{english ? "For research programs, scholarships, summer schools and faculty contact. Highlights GPA, ranking, papers and research directions." : "适合研究项目、奖学金、夏校与导师联系，突出GPA、排名、论文及研究方向。"}</p>
                <div className="resume-downloads">
                  <a href="/wang-yongcheng-academic-resume-cn.pdf" download>{english ? "Chinese PDF" : "中文 PDF"} <span aria-hidden="true">↓</span></a>
                  <a href="/wang-yongcheng-academic-resume.pdf" download>{english ? "English PDF" : "英文 PDF"} <span aria-hidden="true">↓</span></a>
                </div>
              </article>
              <article>
                <span>02 · Practice</span>
                <h4>{english ? "Practice Application" : "实践申请版"}</h4>
                <p>{english ? "For internships, competitions, student organizations and volunteer projects. Highlights speech, moot court, livestreaming, leadership and service." : "适合实习、竞赛、学生组织与志愿项目，突出演讲、模拟法庭、直播、学生工作及志愿服务。"}</p>
                <div className="resume-downloads">
                  <a href="/wang-yongcheng-practice-resume-cn.pdf" download>{english ? "Chinese PDF" : "中文 PDF"} <span aria-hidden="true">↓</span></a>
                  <a href="/wang-yongcheng-practice-resume.pdf" download>{english ? "English PDF" : "英文 PDF"} <span aria-hidden="true">↓</span></a>
                </div>
              </article>
            </div>
            <div className="profile-contact-band">
              <div>
                <span>{english ? "Current focus" : "当前重点"}</span>
                <strong>{english ? "Academic standing · Research writing · English × Law" : "专业排名 · 研究写作 · 英语 × 法律"}</strong>
              </div>
              <a className="contact-link" href="mailto:w3194510963@gmail.com">
                <span>{english ? "Contact" : "联系邮箱"}</span>
                <strong>w3194510963@gmail.com</strong>
                <i aria-hidden="true">{arrow}</i>
              </a>
            </div>
          </div>
        </div>

        <details className="academic-disclosure" id="academic">
          <summary>
            <div className="academic-summary-title">
              <p className="eyebrow">Academic profile</p>
              <h3>{english ? "Academic Profile" : "学术概况"}</h3>
            </div>
            <div className="academic-glance" aria-label={english ? "Academic highlights" : "学术概况摘要"}>
              <span><small>{english ? "Fall GPA" : "大一上 GPA"}</small><strong>3.6 / 4.0</strong></span>
              <span><small>{english ? "Spring GPA" : "大一下 GPA"}</small><strong>3.8 / 4.0</strong></span>
              <span><small>CET-4</small><strong>568</strong></span>
              <span><small>{english ? "Research papers" : "英文研究论文"}</small><strong>2</strong></span>
            </div>
            <span className="disclosure-control"><span className="closed-label">{english ? "View details" : "展开详情"}</span><span className="open-label">{english ? "Close details" : "收起详情"}</span><i aria-hidden="true">＋</i></span>
          </summary>

          <div className="academic-disclosure-body">
            <div className="academic-grid academic-grid-folded">
              <article className="academic-card academic-gpa-card">
              <p className="eyebrow">Academic performance</p>
              <h3>{english ? "GPA Progress" : "GPA 轨迹"}</h3>
              <div className="gpa-track" aria-label={english ? "Freshman GPA progress" : "大一GPA变化"}>
                {academics.semesters.map((semester) => (
                  <div className="gpa-step" key={semester.term}>
                    <div><span>{semester.term}</span><strong>{semester.gpa}</strong></div>
                    <p>{semester.rank}</p><small>{semester.note}</small>
                  </div>
                ))}
              </div>
            </article>

              <article className="academic-card qualification-card">
              <p className="eyebrow">English qualifications</p>
              <h3>{english ? "English Qualifications" : "英语能力记录"}</h3>
              <div className="qualification-list">
                {academics.qualifications.map((item) => (
                  <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong><small>{item.label === "CET-4" ? <a href="/evidence#evidence-cet4">{english ? "View Evidence ↗" : "查看证据 ↗"}</a> : item.status}</small></div>
                ))}
              </div>
            </article>

              <article className="academic-card research-card">
              <div><p className="eyebrow">Research trajectory</p><h3>{english ? "From Course Papers to Interdisciplinary Research" : "从课程论文到交叉研究"}</h3></div>
              <ul>{academics.research.map((item) => <li key={item}>{item}</li>)}</ul>
              {!english ? <a href="/achievements?tag=学术成果#archive-main">查看全部学术成果 <span aria-hidden="true">{arrow}</span></a> : null}
              </article>
            </div>
          </div>
        </details>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work · 2025—2026</p>
            <h2>{english ? "Selected Work" : "精选成果"}</h2>
          </div>
          <p>
            {english ? "These projects are presented for the abilities they developed: expression, retrieval, argumentation, collaboration and research." : "不把经历堆成清单，而是保留每个项目真正训练过的能力：表达、检索、论证、协作与研究。"}
          </p>
        </div>

        <div className="work-list">
          {featured.map((item, index) => (
            <article className={`work-card accent-${item.accent}`} key={item.title}>
              <div className="work-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item.category}</span>
                <span>{item.date}</span>
              </div>
              <div className="work-title">
                <h3>{item.title}</h3>
                {item.englishTitle ? <p>{item.englishTitle}</p> : null}
              </div>
              <p className="work-summary">{item.description}</p>
              <div className="work-result">
                <strong>{item.result ?? item.status}</strong>
                <div className="work-actions">
                  {item.evidenceId ? <a className="evidence-jump" href={`/evidence#${item.evidenceId}`}>{english ? "View Evidence" : "查看证据"} <span aria-hidden="true">↗</span></a> : null}
                  <div className="tag-row" aria-label="项目能力标签">
                    {[item.period, item.role].map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!english ? <div className="all-work-cta">
          <div>
            <p className="eyebrow">Complete archive</p>
            <h3>这不是全部。</h3>
            <p>进入完整档案，按时间或标签查看学生工作、志愿服务、学术研究与竞赛实践。</p>
          </div>
          <a className="archive-link" href="/achievements">
            全部成就 <span aria-hidden="true">{arrow}</span>
          </a>
        </div> : null}
      </section>

      <section className="evidence-entry" id="evidence">
        <div>
          <p className="eyebrow">05 · Evidence room</p>
          <h2>{english ? "Evidence, separated from the narrative." : "证据独立成室，首页只留入口。"}</h2>
        </div>
        <div>
          <p>{english ? "Open the classified evidence room for certificates, score records and original papers. Major achievements link directly to their corresponding records." : "进入独立资料室，分类查看证书、成绩记录与论文原文；主要成就可直接定位到对应资料。"}</p>
          <a href="/evidence">{english ? "View Evidence" : "查看证据"} <span aria-hidden="true">{arrow}</span></a>
        </div>
      </section>

      <section className="direction-section" id="direction">
        <div className="direction-intro">
          <p className="eyebrow">06 · English × Law</p>
          <h2>{english ? "From English toward Law." : "从英语出发，走向法律。"}</h2>
          <p>
            {english ? "This is more than a change of academic field. It is a path that preserves options through academic performance, approaches legal questions through English, and tests the direction through research and practice. Each step should leave behind verifiable grades, texts and experience." : "这不是一次简单的“跨专业”，而是一条以学业表现保留选择权、以英语能力进入法律问题、再以研究与实践验证方向的路径。每一步都需要留下可被检验的成绩、文本和经历。"}
          </p>
        </div>

        <div className="pathway" aria-label="发展路径">
          {paths.map((item, index) => (
            <article className="path-card" key={item.stage}>
              <div className="path-head">
                <span>{item.stage}</span>
                <time>{item.time}</time>
              </div>
              <div className="path-number" aria-hidden="true">
                {index + 1}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul className="path-actions">
                {item.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
              <strong>{item.focus}</strong>
            </article>
          ))}
        </div>

        <div className="about-strip" id="site-note">
          <p className="eyebrow">About this site</p>
          <p>
            {english ? "This is a living academic portfolio. The page presents my central direction, representative work, academic profile and current development pathway." : "这是一个持续更新的个人学习档案。首页保留最重要的主线与代表性成果；“全部成就”记录完整经历，并明确区分获奖、参赛、任职与进行中项目。"}
          </p>
          <a href="#top">{english ? "Back to top ↑" : "回到顶部 ↑"}</a>
        </div>
      </section>

      <BackToTopButton />

      <footer>
        <span>王永城 · Wang Yongcheng</span>
        <span>English / Research / Law</span>
        <span>Last updated · 2026.07</span>
      </footer>
    </main>
  );
}
