"use client";

import { useMemo } from "react";
import { achievements, periodOrder, timelinePeriodItems, type Achievement } from "../content";
import { achievementEnglish, categoryEnglish, periodEnglish, statusEnglish } from "../achievement-translations";
import { coreEvidenceIds } from "../evidence-data";
import { matchesQuery } from "../archive-search";
import ArchiveFilters from "../components/ArchiveFilters";
import { useArchiveQuery } from "../components/useArchiveQuery";
import { LanguageAnchor } from "../components/PortfolioLanguage";

type ViewMode = "time" | "tags";

const categories: string[] = Array.from(new Set(achievements.map((item) => item.category)));

const periodDateLabels: Record<string, string> = {
  大一全年: "2025.09—2026.08",
  大一上: "2025.09—2026.01",
  大一下: "2026.02—2026.07",
  大一暑假: "2026.07—2026.08",
  大二上: "2026.09—",
  大二全年: "2026—2027",
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
        {item.evidenceId ? <LanguageAnchor className="archive-evidence-link" href={`${coreEvidenceIds.has(item.evidenceId) ? "/evidence" : "/evidence/archive"}#${item.evidenceId}`}>{english ? "View evidence" : "查看证据"} <span aria-hidden="true">↗</span></LanguageAnchor> : null}
      </div>
    </article>
  );
}

export default function AchievementsExplorer({ english }: { english: boolean }) {
  const [filters, updateFilters] = useArchiveQuery({ q: "", tag: "", view: "" });
  const activeCategory = categories.includes(filters.tag) ? filters.tag : "全部";
  const view: ViewMode = filters.view === "tags" || (!filters.view && activeCategory !== "全部") ? "tags" : "time";
  const setView = (next: ViewMode) => updateFilters({ view: next });

  const filtered = useMemo(
    () =>
      chronological(
        achievements.filter((item) => (activeCategory === "全部" || item.category === activeCategory)
          && matchesQuery(filters.q, [item.title, item.englishTitle, item.description, item.role, item.result, item.category, item.period, item.date, item.status,
            ...Object.values(achievementEnglish[item.id] ?? {}), categoryEnglish[item.category], periodEnglish[item.period]].join(" "))),
      ),
    [activeCategory, filters.q],
  );

  return (
    <section className="archive-explorer" aria-label={english ? "Complete achievements archive" : "完整成就浏览器"}>
      <div className="view-toolbar">
        <div className="view-switch" role="tablist" aria-label={english ? "Archive view" : "浏览方式"}
          onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const next: ViewMode = event.key === "Home" ? "time" : event.key === "End" ? "tags" : view === "time" ? "tags" : "time";
            setView(next);
            document.getElementById(`achievements-tab-${next}`)?.focus();
          }}>
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

      <ArchiveFilters id="achievements" english={english} query={filters.q} value={activeCategory === "全部" ? "" : activeCategory}
        hideCategory={view === "tags"}
        label={english ? "Category" : "类别"} options={categories.map((category) => ({ value: category, label: english ? categoryEnglish[category] : category }))}
        count={filtered.length} total={achievements.length} onQuery={(q) => updateFilters({ q }, true)}
        onValue={(tag) => updateFilters({ tag })} onReset={() => updateFilters({ q: "", tag: "" })} />

      {view === "time" ? (
        <div aria-labelledby="achievements-tab-time" className="timeline-view" id="achievements-panel-time" role="tabpanel">
          {periodOrder.map((period) => {
            const items = timelinePeriodItems(filtered.filter((item) => item.period === period));
            if (!items.length) return null;
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
          <nav className="category-buttons" aria-label={english ? "Achievement categories" : "成就标签"}>
            {["全部", ...categories].map((category) => (
              <button type="button" key={category} aria-pressed={activeCategory === category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => updateFilters({ tag: category === "全部" ? "" : category, view: "tags" })}>
                <span>{english ? (category === "全部" ? "All" : categoryEnglish[category]) : category}</span>
                <small>{category === "全部" ? achievements.length : achievements.filter((item) => item.category === category).length}</small>
              </button>
            ))}
          </nav>
          <div className="tag-results" aria-live="polite">
            {categories.filter((category) => activeCategory === "全部" || activeCategory === category).map((category) => {
              const items = achievements.filter((item) => item.category === category && filtered.some((result) => result.id === item.id));
              if (!items.length) return null;
              return <section className="category-result-group" key={category}>
                <div className="tag-results-heading">
                  <p className="eyebrow">{english ? "Capability category" : "按标签浏览"} · {items.length}</p>
                  <h2>{english ? categoryEnglish[category] : category}</h2>
                </div>
                <div className="timeline-items">{items.map((item) => <AchievementCard english={english} item={item} key={item.id} />)}</div>
              </section>;
            })}
          </div>
        </div>
      )}
    </section>
  );
}
