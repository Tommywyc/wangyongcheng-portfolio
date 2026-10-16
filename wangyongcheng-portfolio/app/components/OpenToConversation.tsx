"use client";

import { useState } from "react";
import { email, emailSubject, tryCopyText } from "../contact-utils";

type OpenToConversationProps = {
  english: boolean;
};

export default function OpenToConversation({ english }: OpenToConversationProps) {
  const [copyState, setCopyState] = useState<{ kind: "email" | "subject"; success: boolean } | null>(null);
  const copy = async (kind: "email" | "subject") => {
    const success = await tryCopyText(kind === "email" ? email : emailSubject, navigator.clipboard);
    setCopyState({ kind, success });
  };
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
        <div className="contact-copy-tools">
          <div className="contact-copy-buttons">
            <button type="button" onClick={() => void copy("email")}>{english ? "Copy email" : "复制邮箱"}</button>
            <button type="button" onClick={() => void copy("subject")}>{english ? "Copy English subject" : "复制英文主题"}</button>
          </div>
          <p role="status" className="contact-copy-status">{copyState ? copyState.success
            ? (english ? `${copyState.kind === "email" ? "Email" : "Subject"} copied.` : `${copyState.kind === "email" ? "邮箱" : "主题"}已复制。`)
            : (english ? "Copy unavailable. Select and copy the text below." : "暂时无法自动复制，请选中下方文字手动复制。") : ""}</p>
          {copyState && !copyState.success ? <label className="contact-copy-fallback"><span>{english ? "Text to copy" : "待复制文字"}</span><input readOnly value={copyState.kind === "email" ? email : emailSubject} onFocus={(event) => event.target.select()} /></label> : null}
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
