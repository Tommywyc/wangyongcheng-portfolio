import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://www.wangyongcheng.com${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders static homepage metadata and structured data", async () => {
  const response = await render();
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal((html.match(/<title>/gi) ?? []).length, 1);
  assert.equal((html.match(/rel="canonical"/gi) ?? []).length, 1);
  assert.match(html, /<title>王永城 Tommy｜English × Law × AI<\/title>/);
  assert.match(html, /name="description" content="王永城，西南交通大学英语专业本科生。围绕 English × Law × AI/);
  assert.match(html, /rel="canonical" href="https:\/\/www\.wangyongcheng\.com\/"/);
  assert.match(html, /name="robots" content="index, follow/);
  assert.match(html, /property="og:title" content="王永城 Tommy Wang｜ English × Law × AI"/);
  assert.match(html, /property="og:image" content="https:\/\/www\.wangyongcheng\.com\/images\/og-image-preview\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /"@type":"Person"/);
  assert.doesNotMatch(html, /name="keywords"/i);

  const direction = html.indexOf("05 · English × Law × AI");
  const inquiry = html.indexOf("06 · Current Focus");
  const conversation = html.indexOf("07 · Open to Conversation");
  assert.ok(direction >= 0 && inquiry > direction && conversation > inquiry);
});

test("renders all public routes", async () => {
  for (const path of ["/achievements", "/evidence", "/evidence/archive", "/work/moot-court", "/about-site"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
});

test("groups CET-6 in the full freshman year and preserves its release date", async () => {
  const response = await render("/achievements");
  const html = await response.text();
  const freshman = html.indexOf(">大一全年<");
  const cet6 = html.indexOf("大学英语六级（CET-6）");
  const fall = html.indexOf(">大一上<");
  assert.ok(freshman >= 0 && cet6 > freshman && fall > cet6);
  assert.match(html, /2026\.08\.24/);
  assert.match(html, /2025\.09—2026\.08/);
});

test("shares each case study with its own title and URL, retaining the approved card", async () => {
  for (const slug of ["ai-learning-gap-paper", "moot-court", "window-stone", "qionglai-livestream"]) {
    const html = await (await render(`/work/${slug}`)).text();
    const ogTitle = html.match(/property="og:title" content="([^"]*)"/)?.[1];
    assert.ok(ogTitle?.includes("代表成果"), slug);
    assert.ok(html.includes(`property="og:url" content="https://www.wangyongcheng.com/work/${slug}"`), slug);
    assert.match(html, /property="og:image:width" content="1735"/);
    assert.match(html, /property="og:image:height" content="906"/);
    assert.match(html, /property="og:image" content="https:\/\/www\.wangyongcheng\.com\/images\/og-image-preview\.png"/);
  }
});

test("ships responsive current-portrait variants and hides inactive controls from keyboard access", async () => {
  const html = await (await render()).text();
  assert.match(html, /hero-library-480\.webp 480w/);
  assert.match(html, /hero-library-768\.webp 768w/);
  assert.match(html, /hero-library-1086\.webp 1086w/);
  assert.match(html, /aria-hidden="true" class="back-to-top"[^>]*tabindex="-1"/);
  for (const width of [480, 768, 1086]) {
    const webp = await readFile(new URL(`../public/images/hero-library-${width}.webp`, import.meta.url));
    assert.equal(webp.toString("ascii", 0, 4), "RIFF");
    assert.equal(webp.toString("ascii", 8, 12), "WEBP");
    assert.ok(webp.byteLength < 300_000);
  }
});

test("ships valid manifest and preserves the approved OG card", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.icons.length, 2);

  const png = await readFile(new URL("../public/images/og-image-preview.png", import.meta.url));
  assert.equal(png.toString("ascii", 1, 4), "PNG");
  assert.equal(png.readUInt32BE(16), 1735);
  assert.equal(png.readUInt32BE(20), 906);
  assert.equal(createHash("sha256").update(png).digest("hex"), "2345b7cafd7f53f7928c95ec626adedb26e6d3c9a4bdd1fd16613bd918722fdb");
  const portrait = await readFile(new URL("../public/images/hero-library.png", import.meta.url));
  assert.equal(createHash("sha256").update(portrait).digest("hex"), "fe70b1904fb6ddfc981d4d6ec9ca51253dd32a4cae13f8a606499d21b2cd0486");
});

test("retains complete archives and adds bounded case details and contact controls", async () => {
  const home = await (await render()).text();
  assert.match(home, /复制邮箱/);
  assert.match(home, /复制英文主题/);
  assert.doesNotMatch(home, /能力展现/);
  const achievements = await (await render("/achievements")).text();
  assert.equal((achievements.match(/class="archive-card"/g) ?? []).length, 36);
  assert.match(achievements, /id="achievements-query"/);
  const archive = await (await render("/evidence/archive")).text();
  assert.equal((archive.match(/<article class="evidence-card/g) ?? []).length, 43);
  assert.match(archive, /id="evidence-filter"/);
  const core = await (await render("/evidence")).text();
  assert.equal((core.match(/<article class="evidence-card/g) ?? []).length, 15);
  assert.doesNotMatch(core, /id="evidence-query"/);
  for (const slug of ["ai-learning-gap-paper", "moot-court", "window-stone", "qionglai-livestream"]) {
    const html = await (await render(`/work/${slug}`)).text();
    assert.match(html, /项目范围与个人角色/);
    assert.match(html, /成果与证据的边界/);
  }
});

test("English links render English content and metadata before client initialization", async () => {
  for (const path of ["/", "/achievements", "/evidence", "/evidence/archive", "/about-site", "/work/moot-court", "/work/ai-learning-gap-paper", "/work/window-stone", "/work/qionglai-livestream"]) {
    const response = await render(`${path}?lang=en`);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<main lang="en"/, path);
    assert.match(html, /property="og:locale" content="en_US"/, path);
    assert.ok(html.includes(`rel="canonical" href="https://www.wangyongcheng.com${path}?lang=en"`), path);
    assert.match(html, /href="\/[^" ]*lang=en/, path);
    const chinese = await (await render(`${path}?lang=zh`)).text();
    assert.match(chinese, /<main lang="zh-CN"/, path);
  }
});

test("CET-4 release date and the new outreach record are consistent in both languages", async () => {
  for (const language of ["zh", "en"]) {
    const html = await (await render(`/achievements?lang=${language}`)).text();
    assert.match(html, /2026\.02\.27/);
    assert.match(html, /2026\.10\.16/);
    assert.match(html, /evidence-labor-education-outreach/);
    const archive = await (await render(`/evidence/archive?lang=${language}`)).text();
    assert.match(archive, /labor-education-outreach-2026-10-16-wide\.jpg/);
    assert.match(archive, /labor-education-materials-2026-10-16\.jpg/);
    assert.doesNotMatch(html, /Work Status/);
  }
});
