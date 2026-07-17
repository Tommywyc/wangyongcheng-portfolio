"use client";

import { useEffect, useMemo, useState } from "react";
import { achievements, periodOrder, type Achievement } from "../content";
import { achievementEnglish, categoryEnglish, periodEnglish, statusEnglish } from "../achievement-translations";
import { coreEvidenceIds } from "../evidence-data";

type ViewMode = "time" | "tags";

const categories: string[] = Array.from(new Set(achievements.map((item) => item.category)));

const periodDateLabels: Record<string, string> = {
  大一全年: "2025.09—2026.06",
  大一上: "2025.09—2026.01",
  大一下: "2026.02—2026.07",
  大一暑假: "2026.07—2026.08",
  大二上: "2026.09—",
};

const chronological = (items: Achievement[]) =>
  [...items].sort((a, b) => (a.sortDate ?? "9999-12-31").localeCompare(b.sortDate ?? "9999-12-31"));

function AchievementCard({ item, english }: { item: Achievement; english: boolean }) {
  const translated = achievementEnglish[item.id];
  return (
    <article className="archive-card">
      <div className="archive-card-meta">
        <span>{english ? translated?.date ?? item.date : item.date}</span>
        <span>{english ? categoryEnglish[item.category] : item.category}</span>
        {item.status ? <span className={`status status-${item.status}`}>{english ? statusEnglish[item.status] : item.status}</span> : null}
      </div>
      <div className="archive-card-copy">
        <p className="archive-role">{english ? translated?.role : item.role}</p>
        <h3>{english ? translated?.title : item.title}</h3>
        {!english && item.englishTitle ? <p className="archive-english">{item.englishTitle}</p> : null}
        <p className="archive-description">{english ? translated?.description : item.description}</p>
        {item.result ? (
          <strong className={`archive-result ${item.category === "竞赛获奖" || item.category === "班级荣誉" ? "archive-result-award" : ""}`}>
            {english ? translated?.result : item.result}
          </strong>
        ) : null}
        {item.evidenceId ? <a className="archive-evidence-link" href={`${coreEvidenceIds.has(item.evidenceId) ? "/evidence" : "/evidence/archive"}#${item.evidenceId}`}>{english ? "View evidence" : "查看证据"} <span aria-hidden="true">↗</span></a> : null}
      </div>
    </article>
  );
}

export default function AchievementsExplorer({ english }: { english: boolean }) {
  const [view, setView] = useState<ViewMode>("time");
  const [activeCategory, setActiveCategory] = useState("全部");

  useEffect(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get("tag");
    const frame = window.requestAnimationFrame(() => {
      if (requestedCategory && categories.includes(requestedCategory)) {
        setView("tags");
        setActiveCategory(requestedCategory);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const filtered = useMemo(
    () =>
      chronological(
        activeCategory === "全部"
          ? achievements
          : achievements.filter((item) => item.category === activeCategory),
      ),
    [activeCategory],
  );

  return (
    <section className="archive-explorer" aria-label={english ? "Complete achievements archive" : "完整成就浏览器"}>
      <div className="view-toolbar">
        <div className="view-switch" role="tablist" aria-label={english ? "Archive view" : "浏览方式"}>
          <button
            aria-controls="achievements-panel-time"
            aria-selected={view === "time"}
            className={view === "time" ? "active" : ""}
            id="achievements-tab-time"
            onClick={() => setView("time")}
            role="tab"
            tabIndex={view === "time" ? 0 : -1}
            type="button"
          >
            {english ? "Timeline" : "按时间"}
          </button>
          <button
            aria-controls="achievements-panel-tags"
            aria-selected={view === "tags"}
            className={view === "tags" ? "active" : ""}
            id="achievements-tab-tags"
            onClick={() => setView("tags")}
            role="tab"
            tabIndex={view === "tags" ? 0 : -1}
            type="button"
          >
            {english ? "Categories" : "按标签"}
          </button>
        </div>
        <p>{english ? `${achievements.length} entries · continually updated` : `${achievements.length} 项经历 · 持续更新`}</p>
      </div>

      {view === "time" ? (
        <div aria-labelledby="achievements-tab-time" className="timeline-view" id="achievements-panel-time" role="tabpanel">
          {periodOrder.map((period) => {
            const items = chronological(achievements.filter((item) => item.period === period));
            return (
              <section className="timeline-period" key={period}>
                <header>
                  <p>{periodDateLabels[period]}</p>
                  <h2>{english ? periodEnglish[period] : period}</h2>
                  <span>{items.length.toString().padStart(2, "0")}</span>
                </header>
                <div className="timeline-items">
                  {items.map((item) => (
                    <AchievementCard english={english} item={item} key={item.id} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div aria-labelledby="achievements-tab-tags" className="tag-view" id="achievements-panel-tags" role="tabpanel">
          <div className="category-filter" aria-label={english ? "Filter by category" : "按标签筛选"}>
            {["全部", ...categories].map((category) => (
              <button
                className={activeCategory === category ? "active" : ""}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {english ? (category === "全部" ? "All" : categoryEnglish[category]) : category}
                <span>
                  {category === "全部"
                    ? achievements.length
                    : achievements.filter((item) => item.category === category).length}
                </span>
              </button>
            ))}
          </div>
          <div className="tag-results" aria-live="polite">
            <div className="tag-results-heading">
              <p className="eyebrow">Filtered archive</p>
              <h2>{english ? (activeCategory === "全部" ? "All" : categoryEnglish[activeCategory]) : activeCategory}</h2>
            </div>
            <div className="timeline-items">
              {filtered.map((item) => (
                <AchievementCard english={english} item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
