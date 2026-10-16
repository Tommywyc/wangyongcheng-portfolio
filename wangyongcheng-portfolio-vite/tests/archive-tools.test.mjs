import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

async function loadUtility(file) {
  const source = await readFile(new URL(`../app/${file}.ts`, import.meta.url), "utf8");
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports, URL });
  return exports;
}

test("bilingual keyword search normalizes exam punctuation and supports multiple terms", async () => {
  const { matchesQuery } = await loadUtility("archive-search");
  assert.equal(matchesQuery("CET6", "大学英语六级 CET-6 521"), true);
  assert.equal(matchesQuery("六级 521", "大学英语六级 CET-6 521"), true);
  assert.equal(matchesQuery("english PAPER", "English research paper"), true);
  assert.equal(matchesQuery("不存在", "English research paper"), false);
  assert.equal(matchesQuery("", "Any record"), true);
});

test("filter URLs preserve anchors and unrelated parameters, and remove cleared filters", async () => {
  const { mergeFilterUrl } = await loadUtility("archive-search");
  const url = mergeFilterUrl("https://example.com/achievements?ref=home#archive-main", { q: "", tag: "" }, { q: "CET6", tag: "学业表现" });
  const parsed = new URL(url, "https://example.com");
  assert.equal(parsed.searchParams.get("q"), "CET6");
  assert.equal(parsed.searchParams.get("tag"), "学业表现");
  assert.equal(parsed.searchParams.get("ref"), "home");
  assert.equal(parsed.hash, "#archive-main");
  assert.equal(mergeFilterUrl(parsed.href, { q: "", tag: "" }, { q: "", tag: "" }), "/achievements?ref=home#archive-main");
});

test("copy helper handles success, denied access, and unavailable clipboard", async () => {
  const { tryCopyText, email, emailSubject } = await loadUtility("contact-utils");
  let copied;
  assert.equal(await tryCopyText(email, { writeText: async (value) => { copied = value; } }), true);
  assert.equal(copied, email);
  assert.equal(await tryCopyText(emailSubject, { writeText: async () => { throw new Error("Denied"); } }), false);
  assert.equal(await tryCopyText(email), false);
});

test("explicit language wins over saved preference and invalid choices fall back safely", async () => {
  const { resolveLanguage, pageLanguage } = await loadUtility("language");
  assert.equal(resolveLanguage("en", "zh"), "en");
  assert.equal(resolveLanguage("zh", "en"), "zh");
  assert.equal(resolveLanguage(null, "en"), "en");
  assert.equal(resolveLanguage("fr", "invalid"), "zh");
  assert.equal(await pageLanguage(Promise.resolve({ lang: "en" })), "en");
  assert.equal(await pageLanguage(Promise.resolve({ lang: ["en", "zh"] })), undefined);
});

test("language links retain archive filters and anchors without modifying files or email", async () => {
  const { languageHref } = await loadUtility("language");
  assert.equal(languageHref("/achievements?q=CET4&view=time#archive-main", "en"), "/achievements?q=CET4&view=time&lang=en#archive-main");
  assert.equal(languageHref("/evidence?lang=en#evidence-cet4", "zh"), "/evidence?lang=zh#evidence-cet4");
  for (const href of ["/tommy-academic-resume.pdf", "/evidence/cet4.jpg", "#work", "mailto:hello@example.com", "https://example.com/", "//example.com/"]) {
    assert.equal(languageHref(href, "en"), href);
  }
});
