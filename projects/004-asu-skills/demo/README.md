# 004 · Web 研究手册

## 部署

迁移部署中。此项目接入总仓库的 `site-projects.json` 与现有 GitHub Pages 工作流，占用 `004-asu-skills/` 编号子路径，不创建独立站点。

## 构建与阅读

在子项目目录运行 `node code/build.mjs`，由 `code/content.json` 同时生成 `notes/research.md`、`notes/understanding.md` 与 `demo/index.html`。运行 `node code/check.mjs` 检查内部链接、文档图片引用、九项技能和脚本语法。

在仓库根运行 `python scripts/build_site.py` 汇总所有已登记项目，保留 001—003；脚本只复制 Git 已跟踪的文件，因此新增文件须先纳入 Git。

页面使用 `../assets/` 和 `../notes/`，总构建器把页面提升到编号路径时自动改写资源位置。可直接打开本地 `index.html`，或在仓库根使用 `python -m http.server 8767 --bind 127.0.0.1`，访问 `/projects/004-asu-skills/demo/`。

## 验证范围

检查文档下载、PNG/SVG、章节链接、能力详情展开及总入口导航。网页不调用上游 Skill 或招聘账号；部署成功不表示上游插件能力已实测。
