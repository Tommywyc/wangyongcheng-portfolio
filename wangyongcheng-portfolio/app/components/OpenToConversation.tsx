type OpenToConversationProps = {
  english: boolean;
};

const email = "w3194510963@gmail.com";
const emailSubject = "Undergraduate Research / Project Collaboration — Tommy Wang";

export default function OpenToConversation({ english }: OpenToConversationProps) {
  const opportunities = english
    ? ["Undergraduate research", "Summer schools", "Moot-court collaboration", "AI × language projects"]
    : ["本科生研究机会", "夏校", "模拟法庭合作", "AI × 语言项目"];

  return (
    <section aria-labelledby="conversation-title" className="conversation-section" id="conversation">
      <div className="conversation-copy">
        <p className="eyebrow">07 · Open to Conversation</p>
        <h2 id="conversation-title">{english ? "Open to opportunities and collaboration" : "期待机会与合作"}</h2>
        <p>
          {english
            ? "I am open to undergraduate research opportunities, summer schools, moot-court collaboration, and AI × language projects. I also welcome conversations about AI-assisted writing, legal language and interdisciplinary research."
            : "我正在寻找本科生研究机会、夏校、模拟法庭合作与 AI × 语言项目，也欢迎围绕 AI 辅助写作、法律语言和跨学科研究展开交流。"}
        </p>
        <ul aria-label={english ? "Opportunities sought" : "希望获得的机会"}>
          {opportunities.map((opportunity) => <li key={opportunity}>{opportunity}</li>)}
        </ul>
        <div className="conversation-materials">
          <p><strong>{english ? "Suggested email subject" : "英文邮件主题建议"}</strong><span>{emailSubject}</span></p>
          <p>{english ? "Transcript, full papers and supporting application materials are available on request." : "成绩单、论文全文和推荐材料可按需提供。"}</p>
        </div>
      </div>

      <div className="conversation-actions">
        <a className="conversation-email" href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}`}>
          <span>{english ? "Contact Me" : "联系我"}</span>
          <strong>{email}</strong>
          <i aria-hidden="true">↗</i>
        </a>
        <a href="#resumes">
          <span>{english ? "View Resumes & Materials" : "查看简历与材料"}</span>
          <small>{english ? "Four one-page PDFs · Chinese & English" : "四份一页 PDF · 中英文版本"}</small>
          <i aria-hidden="true">↑</i>
        </a>
        <a href="#work">
          <span>{english ? "View Selected Work" : "查看代表成果"}</span>
          <small>{english ? "Research · Speaking · Moot Court · Practice" : "研究 · 演讲 · 模拟法庭 · 实践"}</small>
          <i aria-hidden="true">↑</i>
        </a>
      </div>
    </section>
  );
}
