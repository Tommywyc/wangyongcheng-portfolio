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
      status: "Researching",
    },
    {
      field: "Language & Law",
      question: "当 AI 介入法律翻译，错误应由谁承担？",
      questionEn: "When AI enters legal translation, who should bear responsibility for errors?",
      description:
        "关注合同、法规与专利文本中的准确性风险，尝试梳理语言偏差如何进一步转化为法律责任问题。",
      descriptionEn:
        "I am examining accuracy risks in contracts, regulations and patent texts, and how linguistic bias may develop into questions of legal responsibility.",
      status: "Exploring",
    },
    {
      field: "Writing Systems",
      question: "机器能否实时识别文章“语法正确但逻辑断裂”的时刻？",
      questionEn: "Can a machine detect, in real time, when writing is grammatical but logically disconnected?",
      description:
        "围绕语义连贯性检测方案，继续梳理概念流偏移、动态阈值与边缘设备实时处理的实现逻辑。",
      descriptionEn:
        "Around a semantic-coherence detection proposal, I am continuing to clarify concept-flow shifts, dynamic thresholds and real-time processing on edge devices.",
      status: "Developing",
    },
  ],
} as const;

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
            <strong><span aria-hidden="true" />{item.status}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
