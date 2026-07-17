type CurrentInquiryProps = {
  english: boolean;
};

export const currentInquiryContent = {
  updated: "July 2026",
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
      field: "Language & Law",
      question: "当 AI 介入法律翻译，错误应由谁承担？",
      questionEn: "When AI enters legal translation, who should bear responsibility for errors?",
      description:
        "关注合同、法规与专利文本中的准确性风险，尝试梳理语言偏差如何进一步转化为法律责任问题。",
      descriptionEn:
        "I am examining accuracy risks in contracts, regulations and patent texts, and how linguistic bias may develop into questions of legal responsibility.",
    },
    {
      field: "Writing Systems",
      question: "机器能否实时识别文章“语法正确但逻辑断裂”的时刻？",
      questionEn: "Can a machine detect, in real time, when writing is grammatical but logically disconnected?",
      description:
        "围绕语义连贯性检测方案，继续梳理概念流偏移、动态阈值与边缘设备实时处理的实现逻辑。",
      descriptionEn:
        "Around a semantic-coherence detection proposal, I am continuing to clarify concept-flow shifts, dynamic thresholds and real-time processing on edge devices.",
    },
  ],
} as const;

export const progressUpdates = [
  {
    date: "2026.07",
    title: "学业记录",
    titleEn: "Academic record",
    detail: "大一下 GPA 3.8 / 4.0 已确认，专业排名待公布。",
    detailEn: "Freshman spring GPA confirmed at 3.8 / 4.0; major ranking pending.",
  },
  {
    date: "2026.07",
    title: "研究推进",
    titleEn: "Research progress",
    detail: "英语作文语义连贯性检测与智能评估方案正在准备申请材料。",
    detailEn: "Application materials are being prepared for the semantic-coherence writing assessment proposal.",
  },
  {
    date: "NEXT",
    title: "下一次更新",
    titleEn: "Next review",
    detail: "六级成绩公布、课程建设部职责启动或研究形成新材料后更新。",
    detailEn: "The record will be updated after the CET-6 result, the start of course-construction responsibilities, or a new research output.",
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
          <time dateTime="2026-07">Updated {currentInquiryContent.updated}</time>
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
