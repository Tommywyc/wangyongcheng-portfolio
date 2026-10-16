import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

function dataModule(name) {
  const file = new URL(`../app/${name}.ts`, import.meta.url);
  const exports = {};
  const require = (path) => {
    assert.ok(path.endsWith(".json"), "Only local JSON imports are expected in portfolio data");
    return JSON.parse(readFileSync(new URL(path, file), "utf8"));
  };
  vm.runInNewContext(ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, { exports, require });
  return exports;
}

test("all bilingual records retain unique IDs, evidence links and existing public assets", () => {
  const { achievements, periodOrder } = dataModule("content");
  const { achievementEnglish, categoryEnglish, periodEnglish } = dataModule("achievement-translations");
  const { evidenceCategories, coreEvidenceCategories } = dataModule("evidence-data");
  const evidence = evidenceCategories.flatMap((group) => group.items);
  assert.equal(achievements.length, 36);
  assert.equal(evidence.length, 43);
  assert.equal(coreEvidenceCategories.flatMap((group) => group.items).length, 15);
  assert.equal(new Set(achievements.map((item) => item.id)).size, achievements.length);
  assert.equal(new Set(evidence.map((item) => item.id)).size, evidence.length);
  for (const item of achievements) {
    assert.ok(achievementEnglish[item.id]?.title, item.id);
    assert.ok(categoryEnglish[item.category], item.category);
    assert.ok(periodEnglish[item.period] && periodOrder.includes(item.period), item.period);
    if (item.evidenceId) assert.ok(evidence.some((record) => record.id === item.evidenceId), item.evidenceId);
  }
  for (const item of evidence) {
    assert.ok(item.titleEn && item.metaEn, item.id);
    assert.doesNotMatch(`${item.meta} ${item.metaEn}`, /脱敏|已隐藏|redact|identifiers/i);
    for (const path of [item.href, item.image].filter((path) => path?.startsWith("/"))) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
  }
  const cet4 = achievements.find((item) => item.id === "cet4");
  assert.equal(cet4.sortDate, "2026-02-27");
  assert.equal(cet4.period, "大一全年");
  const outreach = achievements.find((item) => item.id === "labor-education-outreach");
  assert.equal(outreach.status, "已完成");
  assert.equal(outreach.sortDate, "2026-10-16");
});
