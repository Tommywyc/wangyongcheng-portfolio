# 王永城 · 英语与法律发展档案

这是一个独立的 Vite + React 静态网站项目，不依赖 ChatGPT 登录、chatgpt.site 或任何内部权限与部署系统。

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建结果位于 `dist/`。可使用以下命令本地查看生产版本：

```bash
npm run preview
```

## 页面与语言

网站为单页静态首页，不依赖服务器路由或重写规则。右上角提供中文 / English 切换，一级页面内容均有中英文版本；语言选择会保存在浏览器本地，下次访问时自动恢复。

## EdgeOne Makers 部署

1. 将本项目上传或推送至代码仓库。
2. 在 EdgeOne Makers 中新建静态网站项目并选择该仓库。
3. 设置构建命令为 `npm run build`。
4. 设置输出目录为 `dist`。
5. 使用 Node.js 20 或更高版本安装依赖并部署。

网站没有环境变量、后端接口、数据库或登录依赖；`public/` 中的静态资源会在构建时一并输出。

## 目录说明

```text
├── public/          # 项目内静态资源
├── src/             # React 源码、数据与样式
├── package.json     # 依赖与构建命令
├── vite.config.js   # Vite 构建配置
└── dist/            # npm run build 生成，不提交到 Git
```
