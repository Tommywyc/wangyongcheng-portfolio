"use client";

import { useEffect, useMemo, useState } from "react";
import { achievements, periodOrder, type Achievement } from "../content";

type ViewMode = "time" | "tags";
type AchievementCategory = Achievement["category"];
type CategoryFilter = "全部" | AchievementCategory;

const categories: AchievementCategory[] = Array.from(
  new Set(achievements.map((item) => item.category)),
);

const isAchievementCategory = (value: string): value is AchievementCategory =>
  categories.some((category) => category === value);

const periodDateLabels: Record<string, string> = {
  大一全年: "2025.09—2026.06",
  大一上: "2025.09—2026.01",
  大一下: "2026.02—2026.07",
  大一暑假: "2026.07—2026.08",
  大二上: "2026.09—",
};

const chronological = (items: Achievement[]) =>
  [...items].sort((a, b) =>
    (a.sortDate ?? "9999-12-31").localeCompare(b.sortDate ?? "9999-12-31"),
  );

function AchievementCard({ item }: { item: Achievement }) {
  return (
    <article className="archive-card">
      <div className="archive-card-meta">
        <span>{item.date}</span>
        <span>{item.category}</span>
        {item.status ? (
          <span className={`status status-${item.status}`}>{item.status}</span>
        ) : null}
      </div>
      <div className="archive-card-copy">
        <p className="archive-role">{item.role}</p>
        <h3>{item.title}</h3>
        {item.englishTitle ? (
          <p className="archive-english">{item.englishTitle}</p>
        ) : null}
        <p className="archive-description">{item.description}</p>
        {item.result ? (
          <strong
            className={`archive-result ${
              item.status === "获奖" ? "archive-result-award" : ""
            }`}
          >
            {item.result}
          </strong>
        ) : null}
        {item.evidenceId ? (
          <a
            className="archive-evidence-link"
            href={`/evidence#${item.evidenceId}`}
          >
            查看证据 <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function AchievementsExplorer() {
  const [view, setView] = useState<ViewMode>("time");
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("全部");

  useEffect(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get(
      "tag",
    );

    if (requestedCategory && isAchievementCategory(requestedCategory)) {
      setView("tags");
      setActiveCategory(requestedCategory);
    }
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

  const categoryFilters: CategoryFilter[] = ["全部", ...categories];

  return (
    <section className="archive-explorer" aria-label="完整成就浏览器">
      <div className="view-toolbar">
        <div className="view-switch" role="tablist" aria-label="浏览方式">
          <button
            aria-selected={view === "time"}
            className={view === "time" ? "active" : ""}
            onClick={() => setView("time")}
            role="tab"
            type="button"
          >
            按时间
          </button>
          <button
            aria-selected={view === "tags"}
            className={view === "tags" ? "active" : ""}
            onClick={() => setView("tags")}
            role="tab"
            type="button"
          >
            按标签
          </button>
        </div>
        <p>{achievements.length} 项经历 · 持续更新</p>
      </div>

      {view === "time" ? (
        <div className="timeline-view" role="tabpanel">
          {periodOrder.map((period) => {
            const items = chronological(
              achievements.filter((item) => item.period === period),
            );
            return (
              <section className="timeline-period" key={period}>
                <header>
                  <p>{periodDateLabels[period]}</p>
                  <h2>{period}</h2>
                  <span>{items.length.toString().padStart(2, "0")}</span>
                </header>
                <div className="timeline-items">
                  {items.map((item) => (
                    <AchievementCard item={item} key={item.id} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="tag-view" role="tabpanel">
          <div className="category-filter" aria-label="按标签筛选">
            {categoryFilters.map((category) => (
              <button
                className={activeCategory === category ? "active" : ""}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
                <span>
                  {category === "全部"
                    ? achievements.length
                    : achievements.filter((item) => item.category === category)
                        .length}
                </span>
              </button>
            ))}
          </div>
          <div className="tag-results" aria-live="polite">
            <div className="tag-results-heading">
              <p className="eyebrow">Filtered archive</p>
              <h2>{activeCategory}</h2>
            </div>
            <div className="timeline-items">
              {filtered.map((item) => (
                <AchievementCard item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
