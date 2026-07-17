"use client";

import { useEffect, useState } from "react";
import { academicProfile, featuredAchievements, pathway } from "./content";
import BackToTopButton from "./components/BackToTopButton";
import ContactButton from "./components/ContactButton";
import CurrentInquiry, { progressUpdates } from "./components/CurrentInquiry";
import MobileMenuButton from "./components/MobileMenuButton";
import OpenToConversation from "./components/OpenToConversation";

const arrow = "↗";

const featuredDetails: Record<string, { contribution: string; outcome: string; capability: string; contributionEn: string; outcomeEn: string; capabilityEn: string }> = {
  "moot-court": {
    contribution: "围绕法庭角色分工、规则理解与团队论证完成竞赛训练。",
    outcome: "获得校级优胜奖，在28支参赛队伍中排名第7。",
    capability: "在角色分工与团队论证中形成规则拆解、证据组织与协作表达能力，能够将复杂争点转化为清晰主张。",
    contributionEn: "Completed competition training through role allocation, rule analysis and team argumentation.",
    outcomeEn: "Received a Merit Award and placed 7th among 28 teams.",
    capabilityEn: "Developed rule analysis, evidence organization and collaborative advocacy, turning complex issues into clear propositions.",
  },
  "ai-learning-gap-paper": {
    contribution: "独立收束研究问题，完成文献检索、结构设计、机制分析与英文写作。",
    outcome: "形成约2990词、11页的英文研究论文，围绕学习者主体性与教育公平提出机制化分析。",
    capability: "提升研究问题收束、文献证据筛选与英文学术论证能力，能把“AI是否促进学习”拆解为主体性与公平机制。",
    contributionEn: "Independently framed the question and completed the literature search, structure, mechanism analysis and English writing.",
    outcomeEn: "Produced an 11-page, approximately 2,990-word research paper analyzing learner agency and educational equity.",
    capabilityEn: "Strengthened question-framing, evidence selection and English academic argumentation by separating AI learning claims into agency and equity mechanisms.",
  },
  "window-stone": {
    contribution: "完成英文演讲稿创作与现场表达，以苏州园林与云冈石窟讨论文明交流。",
    outcome: "获得英语系实习活动演讲比赛二等奖，成绩84.33分。",
    capability: "强化英文演讲的叙事设计、跨文化素材整合与现场表达能力，把抽象的文明交流转化为听众可感知的比较。",
    contributionEn: "Wrote and delivered an English speech using a Suzhou garden and the Yungang Grottoes to discuss cultural exchange.",
    outcomeEn: "Received Second Prize in the English practicum speech competition with a score of 84.33.",
    capabilityEn: "Strengthened speech design, cross-cultural synthesis and live delivery by turning an abstract idea of cultural exchange into a concrete comparison.",
  },
  "qionglai-livestream": {
    contribution: "承担英文台词补位、流程衔接与补充说明，保障直播表达连续性。",
    outcome: "协助团队完成跨境英文直播实训并获得团体竞赛二等奖。",
    capability: "锻炼英语即时补位、信息提炼与跨角色协作能力，能在直播节奏中补足表达缺口并保持观众理解。",
    contributionEn: "Supported English script backup, live transitions and supplementary explanations to keep the livestream coherent.",
    outcomeEn: "Helped the team complete the cross-border English livestream and receive Team Second Prize.",
    capabilityEn: "Practiced real-time English support, information distillation and cross-role collaboration to keep audience understanding intact during a live flow.",
  },
};

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
    "AI-assisted English writing assessment: application materials in preparation",
    "Research on AI in education and digital ethics",
    "Research on accuracy and risk in AI-assisted legal translation",
  ],
};

const pathwayEnglish = [
  { stage:"LANGUAGE", time:"ONGOING", title:"Language and research foundation", description:"I turn English reading, writing, speaking and translation into reliable, verifiable academic and communicative ability.", focus:"Research Writing · Speech · Translation", actions:["Strengthen academic English", "Sustain research-oriented writing", "Build evidence-based expression"] },
  { stage:"RULES", time:"ONGOING", title:"Rules, texts and cross-context questions", description:"Through civil-law study, case briefs, moot court and legal English, I move beyond interest toward careful reading of rules, texts and responsibility.", focus:"Case Brief · Legal English · Moot Court", actions:["Build civil-law and case-analysis foundations", "Practice clear rule-based argumentation", "Test questions through legal-related practice"] },
  { stage:"TECH / AI", time:"ONGOING", title:"Technology literacy and digital ethics", description:"I examine how intelligent systems reshape learning and legal texts, focusing on accuracy, human agency, accountability and risks when technology enters real decisions.", focus:"AI Literacy · Digital Ethics · Legal Tech", actions:["Advance AI-in-education and legal-translation research", "Connect technology questions with language and rules", "Keep claims grounded in verifiable texts and evidence"] },
];

export default function Home() {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const english = language === "en";
  const featured = featuredAchievements.map((item) => english ? { ...item, ...featuredEnglish[item.title] } : item);
  const academics = english ? academicEnglish : academicProfile;
  const paths = english ? pathwayEnglish : pathway;

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
    document.title = english ? "Tommy Wang｜English × Law × AI" : "王永城 Tommy｜English × Law × AI";
  }, [english, language]);

  return (
    <main className={english ? "lang-en" : "lang-zh"}>
      <a className="skip-link" href="#main-content">
        {english ? "Skip to main content" : "跳到主要内容"}
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={english ? "Back to top of homepage" : "返回首页顶部"}>
          <span className="wordmark-mark">{english ? "T" : "王"}</span>
          <span className="wordmark-name">
            {english ? "Tommy" : "王永城"} <em>English × Law × AI</em>
          </span>
        </a>

        <div className="header-tools">
          <nav className="header-index" id="home-navigation" aria-label={english ? "Page index" : "页面索引"}>
            {[
              ["01", english ? "Profile" : "个人档案", "#identity"],
              ["02", english ? "Academic Profile" : "学术概况", "#academic"],
              ["03", english ? "Selected Work" : "成果展示", "#work"],
              ["04", english ? "Evidence Room" : "证据资料室", "/evidence"],
              ["05", english ? "Direction" : "发展方向", "#direction"],
              ["06", english ? "Current Focus" : "当前关注", "#current-inquiry"],
            ].map(([index, label, href]) => <a href={href} key={href}><em>{index}</em><span>{label}</span></a>)}
          </nav>
          <MobileMenuButton
            closeLabel={english ? "Close" : "关闭"}
            label={english ? "Menu" : "菜单"}
            navId="home-navigation"
          />
          <button className="language-switch" type="button" onClick={() => setLanguage(english ? "zh" : "en")} aria-label={english ? "切换到中文" : "Switch to English"}>
            <span className={!english ? "active" : ""}>中</span><i>/</i><span className={english ? "active" : ""}>EN</span>
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy" id="main-content">
          <p className="eyebrow">Introduction</p>
          <h1>
            {english ? <>Understand the world through language.<br /><span>Take responsibility through rules.</span></> : <>以语言理解世界，<br /><span>以规则承担责任。</span></>}
          </h1>
          <p className="hero-intro">
            {english ? "I am Tommy, an English major at Southwest Jiaotong University. I explore how language connects expression, technology and rules, with particular attention to how AI reshapes learning, communication and legal texts." : "我是王永城，西南交通大学英语专业学生。我关注语言如何连接表达、技术与规则，并特别关心 AI 如何重塑学习、沟通与法律文本。"}
          </p>
          <div className="hero-application-callout">
            <div>
              <strong>{english ? "Open to opportunities" : "正在寻找的机会"}</strong>
              <p>{english ? "Undergraduate research opportunities, summer schools, moot-court collaboration, and AI × language projects." : "本科生研究机会、夏校、模拟法庭合作，以及 AI × 语言项目。"}</p>
            </div>
            <a href="#resumes">{english ? "Go to résumés" : "直达简历区"} <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-actions hero-section-links" aria-label={english ? "Section shortcuts" : "首页板块快捷入口"}>
            {[
              ["01", english ? "Read my profile" : "个人档案", "#identity"],
              ["02", english ? "Browse selected work" : "成果展示", "#work"],
              ["03", english ? "Explore my direction" : "发展方向", "#direction"],
            ].map(([index, label, href]) => (
              <a href={href} key={href}><em>{index}</em><span>{label}</span><i aria-hidden="true">{arrow}</i></a>
            ))}
          </div>
        </div>

        <aside className="hero-media" aria-label={english ? "Portrait and profile statement" : "个人形象与定位"}>
          <img alt={english ? "Portrait of Tommy in a library" : "王永城的个人肖像"} fetchPriority="high" height="844" src="/images/hero-library.webp" width="1500" />
          <div className="hero-note">
            <p>{english ? "Language is the entry point" : "语言是入口"}</p>
            <p>{english ? "Rules are the coordinate" : "规则是坐标"}</p>
            <p>{english ? "Technology ethics is the lens" : "技术伦理是视角"}</p>
            <p>{english ? "Cross-cultural communication is the advantage" : "跨文化沟通是优势"}</p>
          </div>
        </aside>

        <div className="hero-monogram" aria-hidden="true">
          <span>EN</span>
          <span>/</span>
          <span>LAW</span>
          <span>/</span>
          <span>AI</span>
        </div>
      </section>

      <section className="identity-section" id="identity">
        <div className="identity-layout identity-layout-compact">
          <div className="identity-heading">
            <p className="eyebrow">01 · Profile</p>
            <h2>{english ? "Language grounds my work. Rules and technology sharpen my questions." : "以语言为基，理解规则，也理解技术。"}</h2>
            <p className="identity-side-note">{english ? "First-year undergraduate · English major" : "大一 · 英语专业 · 持续生长的学习档案"}</p>
          </div>

          <div className="identity-copy">
            <p>
              {english ? "I am Tommy, an English major at Southwest Jiaotong University. My path is not to place English, law and AI side by side, but to connect them: using language to enter complex texts, rules to examine responsibility, and technology literacy to understand change." : "我是王永城，西南交通大学外国语学院英语专业学生。我的主线不是简单地把英语、法律和 AI 并列，而是让三者彼此连接：以语言进入复杂文本，以规则审视责任，以技术理解变革。"}
            </p>
            <p>
              {english ? "My current focus is to strengthen academic performance and research-based English writing, while turning questions about AI, digital ethics and legal translation into verifiable texts, projects and practical experience." : "现阶段，我关注学业表现、研究型英文写作与跨学科项目积累，并尝试将对 AI、数字伦理与法律翻译的关注沉淀为可验证的文本、成果与实践经历。"}
            </p>
            <div className="identity-facts" aria-label={english ? "Profile facts" : "个人信息概览"}>
              <div><span>{english ? "Institution" : "学校"}</span><strong>{english ? "Southwest Jiaotong University" : "西南交通大学"}</strong></div>
              <div><span>{english ? "Major" : "专业"}</span><strong>{english ? "English" : "英语专业"}</strong></div>
              <div><span>{english ? "Direction" : "方向"}</span><strong>English × Law × AI</strong></div>
            </div>
          </div>
        </div>

        <div className="identity-showcase">
          <figure className="identity-portrait">
            <img alt={english ? "Formal portrait of Tommy" : "王永城的正式个人肖像"} height="1350" loading="lazy" src="/images/profile-formal.webp" width="900" />
            <figcaption>{english ? "Tommy · English × Law × AI" : "王永城 · Tommy"}</figcaption>
          </figure>

          <div className="identity-scene-stack" aria-label={english ? "Study scenes" : "学习场景"}>
            <figure className="identity-scene identity-scene-wide">
              <img alt={english ? "Tommy working on research writing in the library" : "王永城在图书馆进行研究写作"} height="933" loading="lazy" src="/images/research-study.webp" width="1400" />
              <figcaption>{english ? "Research writing" : "研究写作"}</figcaption>
            </figure>
            <figure className="identity-scene">
              <img alt={english ? "Tommy studying English and law" : "王永城阅读英语与法律书籍"} height="1125" loading="lazy" src="/images/law-study.webp" width="900" />
              <figcaption>{english ? "English × Law × AI" : "英语 × 法律 × AI"}</figcaption>
            </figure>
          </div>

          <div className="resume-suite" id="resumes">
            <div className="resume-suite-heading">
              <p className="eyebrow">Two résumés · Chinese &amp; English</p>
              <h3>{english ? "Choose the version that fits the application." : "两份简历，对应两种申请场景。"}</h3>
              <p>{english ? "Each one-page résumé is available in both English and Chinese. The academic version foregrounds grades and research; the practice version foregrounds communication, projects, leadership and service." : "每份均提供中文与英文的一页PDF。学术申请版强调成绩与研究；实践申请版强调表达、项目、学生工作与志愿服务。"}</p>
            </div>
            <nav className="resume-decision-guide" aria-label={english ? "Choose a résumé by audience" : "按使用场景选择简历"}>
              <span>{english ? "Choose by purpose" : "按用途快速选择"}</span>
              <a href="#academic-resume"><strong>{english ? "Faculty & academic reviewers" : "老师 · 导师 · 学术评审"}</strong><small>{english ? "Start with the academic résumé" : "优先查看学术申请版"}</small></a>
              <a href="#practice-resume"><strong>{english ? "Internships & project partners" : "实习 · 竞赛 · 项目合作"}</strong><small>{english ? "Start with the practice résumé" : "优先查看实践申请版"}</small></a>
            </nav>
            <div className="resume-options">
              <article id="academic-resume">
                <span>01 · Academic</span>
                <h4>{english ? "Academic Application" : "学术申请版"}</h4>
                <strong className="resume-audience">{english ? "For faculty contact and academic selection" : "面向导师联系与学术选拔"}</strong>
                <p>{english ? "For research programs, scholarships, summer schools and faculty contact. Shows grades, research writing and defined AI-related questions." : "适合研究项目、奖学金、夏校与导师联系，突出成绩、研究写作与明确的 AI 议题。"}</p>
                <ul className="resume-highlights" aria-label={english ? "Academic résumé highlights" : "学术申请版重点"}>
                  <li>{english ? "GPA 3.6 → 3.8 / 4.0" : "GPA 3.6 → 3.8 / 4.0"}</li>
                  <li>{english ? "Ranked 28 / 56 in the first semester" : "大一上专业排名 28 / 56"}</li>
                  <li>{english ? "Two independently completed English research papers" : "独立完成两篇英文研究论文"}</li>
                </ul>
                <div className="resume-downloads">
                  <a aria-label={english ? "Download academic résumé, Chinese PDF" : "下载学术申请版简历，中文 PDF"} href="/tommy-academic-resume-cn.pdf" download>{english ? "Chinese PDF" : "中文 PDF"} <span aria-hidden="true">↓</span></a>
                  <a aria-label={english ? "Download academic résumé, English PDF" : "下载学术申请版简历，英文 PDF"} href="/tommy-academic-resume.pdf" download>{english ? "English PDF" : "英文 PDF"} <span aria-hidden="true">↓</span></a>
                </div>
              </article>
              <article id="practice-resume">
                <span>02 · Practice</span>
                <h4>{english ? "Practice Application" : "实践申请版"}</h4>
                <strong className="resume-audience">{english ? "For internships, competitions and project work" : "面向实习、竞赛与项目合作"}</strong>
                <p>{english ? "For internships, competitions, student organizations and volunteer projects. Shows concrete work in speaking, advocacy, English livestream support and on-site coordination." : "适合实习、竞赛、学生组织与志愿项目，突出在演讲、论证、英文直播支持与现场统筹中的具体行动。"}</p>
                <ul className="resume-highlights" aria-label={english ? "Practice résumé highlights" : "实践申请版重点"}>
                  <li>{english ? "Speech writing · Moot-court argument · Livestream support" : "演讲稿创作 · 模拟法庭论证 · 英文直播补位"}</li>
                  <li>{english ? "Student-organization operations and volunteer coordination" : "学生组织运营与志愿服务统筹"}</li>
                  <li>{english ? "Structured communication, coordination and delivery" : "结构化表达、协调与交付能力"}</li>
                </ul>
                <div className="resume-downloads">
                  <a aria-label={english ? "Download practice résumé, Chinese PDF" : "下载实践申请版简历，中文 PDF"} href="/tommy-practice-resume-cn.pdf" download>{english ? "Chinese PDF" : "中文 PDF"} <span aria-hidden="true">↓</span></a>
                  <a aria-label={english ? "Download practice résumé, English PDF" : "下载实践申请版简历，英文 PDF"} href="/tommy-practice-resume.pdf" download>{english ? "English PDF" : "英文 PDF"} <span aria-hidden="true">↓</span></a>
                </div>
              </article>
            </div>
            <div className="profile-contact-band">
              <div>
                <span>{english ? "Current focus" : "当前重点"}</span>
                <strong>{english ? "Academic standing · Research writing · English × Law × AI" : "学业表现 · 研究写作 · 英语 × 法律 × AI"}</strong>
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
              <p className="eyebrow">02 · Academic Profile</p>
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
            <p className="eyebrow">03 · Selected Work · 2025—2026</p>
            <h2>{english ? "Selected Work" : "精选成果"}</h2>
          </div>
          <p>
            {english ? "Not a ranking of awards, but four working contexts: building arguments from rules, framing a research question, shaping a public narrative and supporting a live team." : "不按奖项排序，而按四种典型工作场景呈现：基于规则构建论证、围绕问题完成研究、通过表达组织叙事、在现场支撑协作。"}
          </p>
        </div>

        <div className="work-list">
          {featured.map((item, index) => (
            <article className={`work-card accent-${item.accent}`} key={item.title}>
              <div className="work-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item.category}</span>
                <span>{item.date}</span>
                <span className="status status-已完成">{english ? "Completed" : "已完成"}</span>
              </div>
              <div className="work-title">
                <h3>{item.title}</h3>
                {item.englishTitle ? <p>{item.englishTitle}</p> : null}
              </div>
              <p className="work-summary">{item.description}</p>
              <div className="work-proof-line">
                <span>{english ? "Contribution" : "具体承担"}</span>
                <p>{english ? featuredDetails[item.id]?.contributionEn : featuredDetails[item.id]?.contribution}</p>
                <span>{english ? "Outcome" : "形成结果"}</span>
                <p>{english ? featuredDetails[item.id]?.outcomeEn : featuredDetails[item.id]?.outcome}</p>
                <span>{english ? "Capability" : "能力展现"}</span>
                <p>{english ? featuredDetails[item.id]?.capabilityEn : featuredDetails[item.id]?.capability}</p>
              </div>
              <div className="work-result">
                <div className="work-actions">
                  <a className="work-detail-link" href={`/work/${item.id}`}>{english ? "Read case study" : "查看成果页"} <span aria-hidden="true">↗</span></a>
                  {item.evidenceId ? <a className="evidence-jump" href={`/evidence#${item.evidenceId}`}>{english ? "View evidence" : "查看证据"} <span aria-hidden="true">↗</span></a> : null}
                  <div className="tag-row" aria-label={english ? "Project capability tags" : "项目能力标签"}>
                    {[item.period, item.role].map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="all-work-cta">
          <div>
            <p className="eyebrow">Complete archive</p>
            <h3>{english ? "There is more to the record." : "这不是全部。"}</h3>
            <p>{english ? "Explore the complete bilingual archive by timeline or capability category." : "进入完整档案，按时间或标签查看学生工作、志愿服务、学术研究与竞赛实践。"}</p>
          </div>
          <a className="archive-link" href="/achievements">
            {english ? "Complete archive" : "全部成就"} <span aria-hidden="true">{arrow}</span>
          </a>
        </div>
      </section>

      <section className="evidence-entry" id="evidence">
        <div>
          <p className="eyebrow">04 · Evidence room</p>
          <h2>{english ? "Evidence, separated from the narrative." : "证据独立成室，首页只留入口。"}</h2>
        </div>
        <div>
          <p>{english ? "Open the classified evidence room for certificates, score records and original papers. Major achievements link directly to their corresponding records." : "进入独立资料室，分类查看证书、成绩记录与论文原文；主要成就可直接定位到对应资料。"}</p>
          <a href="/evidence">{english ? "View Evidence" : "查看证据"} <span aria-hidden="true">{arrow}</span></a>
        </div>
      </section>

      <section className="direction-section" id="direction">
        <div className="direction-intro">
          <p className="eyebrow">05 · English × Law × AI</p>
          <h2>{english ? "Language, rules and intelligent systems." : "以语言理解规则，也理解技术如何重塑规则。"}</h2>
          <p>
            {english ? "English, law and AI are not three separate labels here. I use language to enter complex texts, rules to examine responsibility, and technology literacy to understand change. The question is not only what AI can do, but what accuracy, agency and accountability must remain when it enters real decisions." : "英语、法律与 AI 在这里不是三个并列标签。以语言进入复杂文本，以规则审视责任，以技术理解变革。关注的不只是 AI 能做什么，更是当技术进入真实决策时，准确性、主体性与责任如何被保留。"}
          </p>
        </div>

        <div className="pathway" aria-label={english ? "Development pathways" : "发展路径"}>
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

      </section>

      <CurrentInquiry english={english} />
      <OpenToConversation english={english} />

      <section className="site-about-section" id="site-note" aria-label={english ? "About this site" : "关于网站"}>
        <div className="about-strip">
          <p className="eyebrow">08 · About this site</p>
          <p>
            {english ? "This is a living academic portfolio. It brings together a central direction, representative work, academic profile and questions still in progress." : "这是一个持续更新的个人学习档案，汇集核心方向、代表性成果、学术概况与仍在推进的问题。"}
          </p>
          <span className="about-strip-note">{english ? "Sensitive details and additional evidence are available on request." : "敏感内容及更多证据联系后提供"}</span>
          <span className="about-strip-note about-strip-language-note">{english ? "Bilingual switching is available across the homepage, achievement archive, Evidence Room and key case-study pages." : "首页、全部成就、证据资料室与代表成果页均支持中英文切换。"}</span>
        </div>
        <div className="about-progress" aria-label={english ? "Portfolio progress updates" : "成长档案更新记录"}>
          <header>
            <p className="eyebrow">{english ? "Portfolio update" : "档案更新"}</p>
            <h3>{english ? "A record that keeps moving." : "这份档案仍在更新。"}</h3>
            <p>{english ? "Updated quarterly, or when a material result changes the record." : "按季度维护，重要成果或身份变化时同步更新。"}</p>
          </header>
          <div>
            {progressUpdates.map((item) => (
              <article key={`${item.date}-${item.title}`}>
                <time>{item.date}</time>
                <strong>{english ? item.titleEn : item.title}</strong>
                <p>{english ? item.detailEn : item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactButton english={english} />
      <BackToTopButton english={english} />

      <footer>
        <span>{english ? "Tommy Wang" : "王永城 · Tommy"}</span>
        <nav aria-label={english ? "Site information" : "网站说明"}>
          <a href="/about-site#accessibility">Accessibility</a>
          <a href="/about-site#privacy">Privacy</a>
          <a href="/about-site#about">About This Site</a>
        </nav>
        <span>English × Law × AI</span>
        <span>Last updated · 2026.07</span>
      </footer>
    </main>
  );
}
