import assert from "node:assert/strict";
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
  assert.match(html, /property="og:title" content="王永城 Wang Yongcheng｜English × Law × AI"/);
  assert.match(html, /property="og:image" content="https:\/\/www\.wangyongcheng\.com\/images\/og-image-preview\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /"@type":"Person"/);
  assert.doesNotMatch(html, /name="keywords"/i);

  const direction = html.indexOf("06 · English × Law × AI");
  const inquiry = html.indexOf("Current Inquiry");
  const conversation = html.indexOf("Open to Conversation");
  assert.ok(direction >= 0 && inquiry > direction && conversation > inquiry);
});

test("renders all public routes", async () => {
  for (const path of ["/achievements", "/evidence", "/about-site"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
});

test("ships valid manifest and exact OG dimensions", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/site.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.icons.length, 2);

  const png = await readFile(new URL("../public/images/og-image-preview.png", import.meta.url));
  assert.equal(png.toString("ascii", 1, 4), "PNG");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});
