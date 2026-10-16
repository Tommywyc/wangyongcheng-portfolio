"use client";

type Props = {
  id: string;
  english: boolean;
  query: string;
  value: string;
  label: string;
  options: { value: string; label: string }[];
  count: number;
  total: number;
  onQuery: (value: string) => void;
  onValue: (value: string) => void;
  onReset: () => void;
};

export default function ArchiveFilters(props: Props) {
  const { id, english, query, value, label, options, count, total, onQuery, onValue, onReset } = props;
  return (
    <div className="archive-search-tools" role="search" aria-label={english ? "Search and filter records" : "搜索与筛选记录"}>
      <div className="archive-filter-fields">
        <label htmlFor={`${id}-query`}><span>{english ? "Keyword" : "关键词"}</span>
          <input id={`${id}-query`} type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder={english ? "Search Chinese or English" : "支持中文、英文关键词"} autoComplete="off" />
        </label>
        <label htmlFor={`${id}-filter`}><span>{label}</span>
          <select id={`${id}-filter`} value={value} onChange={(event) => onValue(event.target.value)}>
            <option value="">{english ? "All" : "全部"}</option>
            {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
          </select>
        </label>
        <button type="button" onClick={onReset} disabled={!query && !value}>{english ? "Reset filters" : "清除筛选"}</button>
      </div>
      <p className="archive-filter-count" role="status">{english ? `${count} of ${total} records` : `显示 ${count} / ${total} 项记录`}</p>
      {count === 0 ? <p className="archive-empty">{english ? "No matching records. Try another keyword or reset the filters." : "没有匹配记录，请尝试其他关键词或清除筛选。"}</p> : null}
    </div>
  );
}
