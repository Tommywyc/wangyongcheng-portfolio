# 王永城 Tommy｜English × Law × AI

## 最新网站源码

当前线上第 **56** 版的完整源码位于 [`wangyongcheng-portfolio/`](./wangyongcheng-portfolio/)。

- 正式网站：https://wangyongcheng-portfolio.tommy-wyc.chatgpt.site
- 源码版本：`7de298d18798a10674f509431aa6f0db76c09c04`
- 同步日期：2026-10-16
- 最新调整：CET-6 归入“大一全年”，成绩公布日期保留为 2026-08-24。
- 包含页面、中英文内容、样式、图片、公开证据资料、四份简历、生成脚本、测试及构建配置。
- 不包含依赖目录、缓存、登录凭据或未公开的原始证件。

## 本地运行

需要 Node.js 22.13 或以上版本。

```bash
cd wangyongcheng-portfolio
npm ci
npm run dev
```

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

部署采用 Vinext / Cloudflare Worker，不是旧版纯静态 Vite 工程。构建、严格类型检查及4项测试已在该源码的发布版本上通过。

## 历史版本

`wangyongcheng-portfolio-vite/` 和 `wangyongcheng-portfolio-vite (1)/` 保留为历史工程，未覆盖或删除。请使用上方的最新源码目录。
