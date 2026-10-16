import facts from "../portfolio-facts.json";

type CurrentInquiryProps = {
  english: boolean;
};

export const currentInquiryContent = {
  updated: "October 2026",
  items: [
    {
      field: "AI & Education",
      question: "AI 是在缩小学习差距，还是制造新的依赖？",
      questionEn: "Is AI narrowing learning gaps, or creating new forms of dependence?",
      description:
        "基于论文 Does AI Equalize Learners or Widen the Gap?，继续关注学习者主体性、制度约束与平台依赖之间的关系。",
      descriptionEn:
        "Building on Does AI Equalize Learners or Widen the Gap?, I continue to examine the relationship among learner agency, institutional constraints and platform dependence.",
    },
    {
      field: "AI & Copyright",
      question: "生成式人工智能图像能否构成作品，人类的独创性贡献如何认定？",
      questionEn: "When are generative AI images copyrightable, and how should human contributions to originality be assessed?",
      description:
        "围绕生成式人工智能图像的作品属性认定，关注人类在生成过程中的独创性贡献及其识别与评价。",
      descriptionEn:
        "I am examining the copyrightability of generative AI images and how human contributions to originality during generation can be identified and assessed.",
    },
  ],
} as const;

export const progressUpdates = [
  {
    date: facts.laborOutreach.date,
    title: facts.laborOutreach.title,
    titleEn: facts.laborOutreach.titleEn,
    detail: facts.laborOutreach.summary,
    detailEn: facts.laborOutreach.summaryEn,
  },
  {
    date: "2026.10",
    title: "语言与任职证明",
    titleEn: "Language and leadership evidence",
    detail: "新增六级521分与国才中级良好成绩，补充活动项目部优秀任职证明、校车项目优秀志愿者及国才杯校赛银奖证书。",
    detailEn: "Added CET-6 (521), ETIC Intermediate (Good), an Excellent leadership assessment, Outstanding Volunteer recognition and the FLTRP university-round Silver Award.",
  },
  {
    date: "2026.07",
    title: "学业记录",
    titleEn: "Academic record",
    detail: "大一下 GPA 3.8 / 4.0 已确认，专业排名待公布。",
    detailEn: "Freshman spring GPA confirmed at 3.8 / 4.0; major ranking pending.",
  },
  {
    date: "2026.10",
    title: "研究推进",
    titleEn: "Research progress",
    detail: "当前研究方向更新为生成式人工智能图像的作品属性认定与人类独创性贡献。",
    detailEn: "The current research direction examines the copyrightability of generative AI images and human contributions to originality.",
  },
  {
    date: "NEXT",
    title: "下一次更新",
    titleEn: "Next review",
    detail: "课程建设部履职形成新成果，或研究有可核实进展后更新。",
    detailEn: "The record will be updated when course-development work produces new outcomes or research makes verifiable progress.",
  },
] as const;

export default function CurrentInquiry({ english }: CurrentInquiryProps) {
  return (
    <section aria-labelledby="current-inquiry-title" className="current-inquiry-section" id="current-inquiry">
      <header className="inquiry-heading">
        <div>
        <p className="eyebrow">06 · Current Focus</p>
          <h2 id="current-inquiry-title">{english ? "Questions in progress" : "当前关注"}</h2>
        </div>
        <div className="inquiry-context">
          <p>{english ? "These are questions still in progress, not completed conclusions." : "不是已经完成的结论，而是目前仍在推进的问题。"}</p>
          <time dateTime="2026-10">Updated {currentInquiryContent.updated}</time>
        </div>
      </header>

      <div className="inquiry-grid">
        {currentInquiryContent.items.map((item, index) => (
          <article className="inquiry-card" key={item.field}>
            <header>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item.field}</p>
            </header>
            <h3>{english ? item.questionEn : item.question}</h3>
            <p>{english ? item.descriptionEn : item.description}</p>
            <strong className="progress-label progress-label-ongoing"><span aria-hidden="true" />{english ? "In progress" : "进行中"}</strong>
          </article>
        ))}
      </div>

    </section>
  );
}
