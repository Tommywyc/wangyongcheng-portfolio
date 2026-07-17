export type Bilingual = { zh: string; en: string };

export type WorkCaseStudy = {
  slug: string;
  number: string;
  category: Bilingual;
  title: Bilingual;
  subtitle?: string;
  date: string;
  question: Bilingual;
  actions: Bilingual[];
  output: Bilingual;
  evidenceId: string;
  reflection: Bilingual;
};

export const workCaseStudies: WorkCaseStudy[] = [
  {
    slug: "ai-learning-gap-paper",
    number: "01",
    category: { zh: "学术研究", en: "Academic Research" },
    title: { zh: "生成式 AI、学习者能动性与教育公平", en: "Generative AI, Learner Agency and Educational Equity" },
    subtitle: "Does AI Equalize Learners or Widen the Gap? Learner Agency and Skill Development in Generative AI-Assisted Learning",
    date: "2026.06.28",
    question: { zh: "当生成式 AI 进入日常学习，它是在缩小能力差距，还是让部分学习者形成新的依赖？", en: "When generative AI becomes part of everyday learning, does it narrow capability gaps or create new forms of dependence?" },
    actions: [
      { zh: "将宽泛的“AI 是否促进学习”收束为学习者能动性、技能发展与教育公平三个可分析机制。", en: "Narrowed the broad question of whether AI improves learning into three analyzable mechanisms: learner agency, skill development and educational equity." },
      { zh: "独立完成文献检索、论证结构、机制分析、反证讨论与英文写作。", en: "Independently completed the literature search, argument structure, mechanism analysis, counterargument and English writing." },
      { zh: "在结论中区分工具可及性与真实学习收益，避免把技术使用直接等同于能力提升。", en: "Distinguished access to tools from genuine learning gains, avoiding the assumption that use automatically equals capability growth." },
    ],
    output: { zh: "约 2,990 词、11 页英文研究论文，形成围绕主体性与公平机制的完整论证。", en: "An approximately 2,990-word, 11-page English research paper with a complete argument centered on agency and equity mechanisms." },
    evidenceId: "evidence-ai-paper",
    reflection: { zh: "这项工作让我意识到，好的研究问题不是更宏大，而是能把价值判断拆成可被证据检验的机制。下一步需要补充更具体的学习场景与实证材料。", en: "This project showed me that a strong research question is not broader, but better able to turn value judgments into mechanisms that evidence can test. The next step is to add more concrete learning contexts and empirical material." },
  },
  {
    slug: "moot-court",
    number: "02",
    category: { zh: "规则型论证", en: "Rule-based Advocacy" },
    title: { zh: "“求索杯”模拟法庭", en: "Quest Cup Moot Court" },
    date: "2026.06.06",
    question: { zh: "如何把复杂争点转化为清晰、可协作、能被证据支撑的法庭主张？", en: "How can a complex dispute be turned into a clear, collaborative proposition supported by rules and evidence?" },
    actions: [
      { zh: "围绕法庭角色分工、争点识别与规则理解完成赛前训练。", en: "Trained around courtroom roles, issue identification and rule interpretation." },
      { zh: "与团队共同组织论证顺序，连接主张、规则与证据。", en: "Worked with the team to order arguments and connect propositions, rules and evidence." },
      { zh: "在模拟庭审中根据对方论点调整表达重点，保持团队论证一致。", en: "Adjusted emphasis in response to opposing arguments while maintaining a consistent team position." },
    ],
    output: { zh: "获得校级优胜奖，在 28 支参赛队伍中排名第 7。", en: "Received a university-level Merit Award and placed 7th among 28 teams." },
    evidenceId: "evidence-moot-court",
    reflection: { zh: "模拟法庭训练了我把“我认为”改写为“规则与证据能够支持什么”。下一步希望通过更多案例摘要和书状写作，提高论证的精确度。", en: "Moot court trained me to replace what I think with what rules and evidence can support. I want to improve precision through more case briefs and written submissions." },
  },
  {
    slug: "window-stone",
    number: "03",
    category: { zh: "公众表达", en: "Public Communication" },
    title: { zh: "窗与石", en: "The Window and the Stone" },
    subtitle: "The Window and the Stone",
    date: "2026.07.04",
    question: { zh: "如何让“文明交流”这一抽象主题变成听众能够看见、记住并产生联系的叙事？", en: "How can the abstract idea of cultural exchange become a narrative an audience can see, remember and connect with?" },
    actions: [
      { zh: "选择苏州园林花窗与云冈石窟作为两组可视化文化意象。", en: "Selected a Suzhou garden window and the Yungang Grottoes as two visual cultural motifs." },
      { zh: "完成英文演讲稿的结构、语言与节奏设计，并进行现场表达。", en: "Designed the English speech's structure, language and pacing, then delivered it live." },
      { zh: "通过比较而非罗列材料，让两个场景共同回答“交流如何改变观看与创造”。", en: "Used comparison rather than a list of facts so both scenes answered how exchange changes seeing and creating." },
    ],
    output: { zh: "获得英语系实习活动演讲比赛二等奖，成绩 84.33 分。", en: "Received Second Prize in the English practicum speech competition with a score of 84.33." },
    evidenceId: "evidence-speech",
    reflection: { zh: "这次演讲证明，跨文化表达的关键不在材料数量，而在是否建立一条听众可追随的叙事线。下一步需要加强声音控制与现场停顿。", en: "The speech confirmed that cross-cultural communication depends less on the amount of material than on a narrative line the audience can follow. My next focus is vocal control and live pauses." },
  },
  {
    slug: "qionglai-livestream",
    number: "04",
    category: { zh: "项目实践", en: "Project Practice" },
    title: { zh: "非遗邛崃酒跨境英文直播", en: "Cross-border English Livestream for Qionglai Heritage Liquor" },
    date: "2026.07.06",
    question: { zh: "当团队直播出现表达缺口时，如何用英文即时补位，同时维持信息准确、节奏连续和观众理解？", en: "When gaps appear during a team livestream, how can real-time English support preserve accuracy, flow and audience understanding?" },
    actions: [
      { zh: "熟悉产品信息与直播流程，为关键环节准备可快速调用的英文表达。", en: "Reviewed product information and the live flow, preparing reusable English lines for key moments." },
      { zh: "承担英文台词补位、环节衔接、现场救场与补充说明。", en: "Provided English script backup, transitions, live recovery and supplementary explanations." },
      { zh: "根据主播状态和观众理解即时压缩或展开信息，保障团队表达连续。", en: "Compressed or expanded information in response to the host and audience, keeping the team presentation coherent." },
    ],
    output: { zh: "协助团队完成跨境英文直播实训并获得团体竞赛二等奖。", en: "Helped the team complete the cross-border English livestream practicum and receive Team Second Prize." },
    evidenceId: "evidence-livestream",
    reflection: { zh: "真实协作中的语言能力，不只是说得准确，也包括判断什么时候需要补充、什么时候应该让出空间。下一步希望形成更系统的产品英语表达库。", en: "Language ability in real collaboration is not only accuracy; it also means judging when to add information and when to leave space. I want to build a more systematic product-English phrase bank." },
  },
];

export const workCaseStudyBySlug = new Map(workCaseStudies.map((item) => [item.slug, item]));
