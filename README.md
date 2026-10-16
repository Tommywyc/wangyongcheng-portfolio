# 王永城 Tommy｜English × Law × AI

## 最新网站源码

EdgeOne 实际部署目录为 [`wangyongcheng-portfolio-vite/`](./wangyongcheng-portfolio-vite/)，已同步第 **59** 版的全部页面和公开资源，使用 Next.js 构建。

Sites 原始源码保留在 [`wangyongcheng-portfolio/`](./wangyongcheng-portfolio/)。两个目录的 `app/` 和 `public/` 内容一致，构建配置分别适配 EdgeOne 和 Sites。

- 正式网站：https://wangyongcheng-portfolio.tommy-wyc.chatgpt.site
- 源码版本：`31685d5065e1dee82d6b9facf60de44d24882187`
- 同步日期：2026-10-16
- 最新调整：三阶段可读性、导航与双语优化；搜索筛选、邮件复制、可分享语言链接；新增 10 月 16 日劳动教育课程宣讲及最新现场照片；CET-4 成绩公布日期为 2026-02-27，CET-6 保留为 2026-08-24。
- 包含页面、中英文内容、样式、图片、公开证据资料、四份简历、生成脚本、测试及构建配置。
- 不包含依赖目录、缓存、登录凭据或未公开的原始证件。

## 本地运行

需要 Node.js 22.13 或以上版本。

```bash
cd wangyongcheng-portfolio-vite
npm ci
npm run dev
```

```bash
npm run build
npm run start
```

EdgeOne 保持根目录 `wangyongcheng-portfolio-vite`、安装命令 `npm ci --no-audit --no-fund`、构建命令 `npm run build`，由现有 Next.js 适配器处理输出。Sites 目录使用 Vinext / Cloudflare Worker，不能直接替代 EdgeOne 的构建设置。

## 历史版本

`wangyongcheng-portfolio-vite (1)/` 为历史工程。`wangyongcheng-portfolio-vite/src/` 和其中已提交的旧 `dist/` 不参与当前 Next.js 构建；实际页面来自 `app/`，公开资源来自 `public/`。
