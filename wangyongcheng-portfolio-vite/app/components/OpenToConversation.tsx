type OpenToConversationProps = {
  english: boolean;
};

const email = "w3194510963@gmail.com";

export default function OpenToConversation({ english }: OpenToConversationProps) {
  const topics = ["AI, Writing & Education", "Legal Language", "Research & Moot Court"];

  return (
    <section aria-labelledby="conversation-title" className="conversation-section" id="conversation">
      <div className="conversation-copy">
        <p className="eyebrow">Open to Conversation</p>
        <h2 id="conversation-title">{english ? "Open to conversation" : "欢迎交流"}</h2>
        <p>
          {english
            ? "I welcome conversations about AI-assisted writing, legal language, foreign-related rule-of-law learning and undergraduate interdisciplinary research. I am also open to research assistantships, academic projects and moot-court collaboration."
            : "我愿意围绕 AI 辅助写作、法律语言、涉外法治学习与本科生跨学科研究进行交流，也关注研究助理、学术项目与模拟法庭合作机会。"}
        </p>
        <ul aria-label={english ? "Conversation topics" : "交流主题"}>
          {topics.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
      </div>

      <div className="conversation-actions">
        <a className="conversation-email" href={`mailto:${email}`}>
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
