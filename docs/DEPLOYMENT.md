# Web 演示部署约定

已启用 GitHub Pages 与 GitHub Actions 自动部署。001—006 与 008—011 的十个静态研究展厅已上线，2026-09-18 完成各项目的公网验证。运行方式见各项目的 `demo/README.md`。

| 入口 | 已验证地址 |
| --- | --- |
| 研究展厅导航 | [站点首页](https://yydshly.github.io/0918_codex_project/) |
| 001 · Understand-Anything | [分类效果展厅](https://yydshly.github.io/0918_codex_project/001-understand-anything/) |
| 引导图 | [可缩放能力总览](https://yydshly.github.io/0918_codex_project/001-understand-anything/overview.html) |
| 同类工具 | [五工具与七场景对比](https://yydshly.github.io/0918_codex_project/001-understand-anything/#compare) |

002 引导展厅：[一图理解](https://yydshly.github.io/0918_codex_project/002-claude-code-best-practice/)。核心摘要为“Claude Code 使用指南＋配置示例集；对我们直接参考价值不大，主要帮助理解 AI 工作流程与动作，更好使用 AI”。[公网验证记录](../projects/002-claude-code-best-practice/notes/evidence/deployment.json)。

根索引、子项目 README 和仓库 About 的 Website 均关联线上入口。

## 006 发布状态

006 · anbeime/skill 已上线：[研究展厅](https://yydshly.github.io/0918_codex_project/006-anbeime-skill/) · [一图理解](https://yydshly.github.io/0918_codex_project/006-anbeime-skill/#map)。摘要明确其主要是 Skill 收集、分类与导航库，收录内容、音视频、电商、文档、知识管理与开发等 19 类方向；对我们当前直接参考价值较低，作为资源目录备查。首次发布版本为 `11c9c87d689a225f31939d6ee649d2851c738e90`。2026-09-18 核验公网六项目入口、总站摘要、文档、七章节交互及 PNG/SVG 字节一致性，见[公网记录](../projects/006-anbeime-skill/notes/evidence/deployment.json)。沿用既有 Pages 工作流，保留 001—005；[运行说明](../projects/006-anbeime-skill/demo/README.md)与[本地集成记录](../projects/006-anbeime-skill/notes/evidence/integration.json)。

## 多个演示如何组织

003 · Frontend Design Toolkit 已上线：[一图理解](https://yydshly.github.io/0918_codex_project/003-frontend-design-toolkit/)。沿用已生成的引导图，摘要说明其围绕前端需求，从设计、实现与验证等角度组织约束、方法和工具，指导 Agent 完成页面。页面区分模型基础能力、Agent 工作指导和实际工具支持；用同一个咖啡首页需求说明如何配合。运行与检查方法见 [003 演示说明](../projects/003-frontend-design-toolkit/demo/README.md)，[公网验证记录](../projects/003-frontend-design-toolkit/notes/evidence/deployment.json)记录首次发布版本。

002 · Claude Code Best Practice 已登记到 `site-projects.json`，并完成线上部署。运行与验证方法见 [002 演示说明](../projects/002-claude-code-best-practice/demo/README.md)。

GitHub Pages 每个仓库支持一个项目站点，可在这个站点下用不同子路径承载多个静态演示。它提供静态文件托管，不能直接运行常驻服务端程序。依据：[GitHub Pages 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)。

当前站点路径如下；后续项目继续沿用编号子路径：

```text
https://yydshly.github.io/0918_codex_project/
├── 001-understand-anything/
├── 002-claude-code-best-practice/
├── 003-frontend-design-toolkit/
├── 004-asu-skills/
├── 005-chat-on-steroids/
├── 006-anbeime-skill/
├── 008-baoyu-design/
├── 009-awesome-ceo/
├── 010-ai-infra-book/
└── 011-selfteaching/
```

站点首页作为演示导航，各子路径沿用研究项目编号。另有独立托管平台或自定义域名时，直接在索引填写实际地址。

004 · ASu-skills 已迁入总仓库并上线：[研究手册](https://yydshly.github.io/0918_codex_project/004-asu-skills/) · [全景引导图](https://yydshly.github.io/0918_codex_project/004-asu-skills/#guide)。文档、九项能力、原理与应用价值、PNG/SVG 均在同一子项目中维护；沿用现有站点构建器和工作流，未建立独立仓库。2026-09-18 已验证四个项目入口、004 文档与图片可访问；[公网记录](../projects/004-asu-skills/notes/evidence/deployment.json)对应首次迁移版本 `99eda015a9152e380ec29bd5318653e584d99504`。误建的独立仓库仅保留迁移历史，不作为维护入口。

## 当前构建与发布

- 清单：[site-projects.json](../site-projects.json)，记录编号、源库、摘要和代表图。
- 构建：在仓库根运行 `python scripts/build_site.py`，无需第三方 Python 包。仅复制 Git 已跟踪的项目内容，输出忽略目录 `_site/`；本地可通过静态服务访问该目录验证。
- 工作流：[pages.yml](../.github/workflows/pages.yml)。main 分支的项目内容、清单、构建脚本或工作流更新会自动触发；也支持 Actions → Deploy research website → Run workflow。
- 托管：Pages 的发布来源为 GitHub Actions；构建产物上传后发布至 github-pages 环境。
- 版本：[build.json](https://yydshly.github.io/0918_codex_project/build.json) 记录当前部署的源 commit；首次发布为 `b0eff0df723a611c6eee1656d6cdf14a4d5c6abb`。
- 验证：`node scripts/verify_pages.mjs https://yydshly.github.io/0918_codex_project/`，需要 Playwright、Edge 及 `PLAYWRIGHT_MODULE`。可设置 `EXPECTED_COMMIT` 核对版本。首次公网检查结果见[部署记录](../projects/001-understand-anything/notes/evidence/deployment.json)，后续状态见 [Actions](https://github.com/yydshly/0918_codex_project/actions/workflows/pages.yml)。

当前构建器适用于原生静态 demo：保留项目目录结构，并复制网页到编号子路径根部，改写资源相对路径。新增同类项目时加入清单并提交文件；有独立构建系统的项目需先扩展构建步骤。所有已收录演示在同一次发布中保留。

## 新演示发布步骤

005 · Chat On Steroids 已上线：[研究展厅](https://yydshly.github.io/0918_codex_project/005-chat-on-steroids/) · [一图总览](https://yydshly.github.io/0918_codex_project/005-chat-on-steroids/#map)。核心摘要是“把网页版 ChatGPT 与真实本地环境关联起来，并围绕它构建 Agent 能力”。沿用 `site-projects.json`、现有构建器与 Pages 工作流，保留 001—004。首次发布版本为 `3b125a880ba9fa26960ea14742cd529f086c182e`；2026-09-18 核验公网五项目入口、摘要、总览图字节一致性及 005 的六章节交互，见 [005 公网记录](../projects/005-chat-on-steroids/notes/evidence/deployment.json)。本地集成记录见 [005 集成检查](../projects/005-chat-on-steroids/notes/evidence/integration.json)。研究展厅部署成功不代表上游 Agent 已实测。

项目清单支持可选 `links` 字段，为不同展厅设置导航；省略时保留 001 的“一图总览 / 工具对比”。002 使用“流程演示 / 一图理解”，不创建不存在的 overview.html。

新增 002 的本地构建检查使用临时 Git 索引，真实暂存区不变；正式构建需要先将新文件纳入 Git。构建脚本会清理固定的仓库内 `_site/` 目录后重建，构建通过不等于已推送或已部署。

1. 在子项目 `demo/README.md` 记录依赖安装、启动、构建命令和产物目录。
2. 为每个应用设置正确的资源基础路径，例如 `/0918_codex_project/001-project-name/`。
3. 将各应用的静态构建结果汇总到一个发布目录，各占一个编号子目录；同一次部署包含所有需要保留的演示，避免发布单个项目时覆盖其他演示。
4. 添加站点导航页，然后按实际构建方式配置 GitHub Pages 发布来源与工作流。
5. 检查首页、子路径、静态资源和页面刷新；单页应用需选择适合静态托管的路由方案，例如 hash 路由。
6. 验证线上地址后，再更新根 README 和子项目中的部署状态、链接及截图。

具体配置流程见 [GitHub Pages 发布来源文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 含后端的项目

后端、数据库及长期运行的任务使用合适的外部服务托管。子项目应分别记录前端和后端地址、环境变量名称、启动方式及限制。浏览器端可读取的配置不能存放私密 API 密钥。

## 每个演示应记录的信息

| 字段 | 要求 |
| --- | --- |
| 部署状态 | 未部署 / 部署中 / 已上线 / 已下线 |
| 访问地址 | 已验证的真实 URL，未部署时留“未部署” |
| 对应版本 | 代码 commit 或 tag |
| 构建与输出 | 实际命令、产物目录、基础路径 |
| 环境配置 | 变量名和用途，不写秘密值 |
| 最近验证 | 日期、验证内容和已知限制 |

## 008 发布状态

008 · baoyu-design 已上线：[研究概要](https://yydshly.github.io/0918_codex_project/008-baoyu-design/) · [完整引导图](https://yydshly.github.io/0918_codex_project/008-baoyu-design/#u-map) · [统一约束](https://yydshly.github.io/0918_codex_project/008-baoyu-design/#u-unified)。默认入口先介绍库的能力、可实现目标、实现原理和对我们的意义；引导图覆盖 13 类目标、53 份说明和五层统一约束，另保留原型、设计系统和 PPTX 实测。

首次发布版本 `19023eea28c7931453eb5878f2e7627b31e983a3`，通过现有 Pages 工作流发布，保留 001—006。2026-09-18 已验证七项目公网入口、26 项 HTTP 资源、引导图与 PPTX 字节一致性，以及线上任务切换、目录展开、图片缩放、章节刷新与手机布局。[部署记录](../projects/008-baoyu-design/notes/evidence/deployment.json) · [运行说明](../projects/008-baoyu-design/demo/README.md)。

构建器支持可选 `demoAssetDirs` 字段，将声明的嵌套 demo 资源路径重写到编号入口下的 `demo/<目录>/`。008 使用 `_ds`、`vendor`、`downloads`；原始 demo 和编号入口均保留。001—006 沿用原有行为。发布成功只证明研究站点可访问，不扩大上游能力的实测结论。

## 009 发布状态

009 · Awesome CEO 已制作中文资源导航：完整展示 85 条资源、86 个内容链接与 13 处作者附注译文，支持分类汇总、搜索和类型筛选。新增原创“一图看懂”、六组资料类型入口和说明，以及可缩放的 `overview.html`。已登记到 `site-projects.json`，沿用编号子路径 `009-awesome-ceo/` 和现有静态构建器，清单保留之前的七个展厅。

状态：已上线。[中文资源导航](https://yydshly.github.io/0918_codex_project/009-awesome-ceo/) · [一图看懂](https://yydshly.github.io/0918_codex_project/009-awesome-ceo/overview.html) · [按资料类型浏览](https://yydshly.github.io/0918_codex_project/009-awesome-ceo/#types)。摘要说明它通过人工精选与分类提供创业管理资料入口，覆盖融资、产品、销售、团队管理等 11 类、85 条资料；对我们的直接技术参考价值较低，作为备查目录即可。

首次发布版本 `f85fb9a6496c14ea034a4efa283df8cb6ee3c547`，沿用既有 Pages 工作流。2026-09-18 核验八个项目入口、22 项 HTTP 资源、总站与项目摘要、85 条资源与 86 个内容链接，以及总览图字节一致性。[公网记录](../projects/009-awesome-ceo/notes/evidence/deployment.json) · [线上交互记录](../projects/009-awesome-ceo/notes/evidence/remote-browser.json) · [运行说明](../projects/009-awesome-ceo/demo/README.md)。外部资料目标和服务未逐项验证。

## 010 发布状态

010 · AI Infra Book 已上线：[能力与使用导览](https://yydshly.github.io/0918_codex_project/010-ai-infra-book/) · [完整理解图](https://yydshly.github.io/0918_codex_project/010-ai-infra-book/overview.html) · [使用场景](https://yydshly.github.io/0918_codex_project/010-ai-infra-book/#use-summary)。沿用同一 Pages 工作流和编号子路径，保留此前八个展厅。

摘要说明其是开源 AI 基础设施技术书，配套计算工具和实验，覆盖模型与负载、加速器与算子、多卡互联与网络、推理与训练优化、资源调度及端边云协同。我们在本地模型显存不足或速度慢、评估多人服务成本、微调训练受资源限制时按需参考；普通安装先看具体教程，不必从零设计模型。

首次发布版本 `1ddf3d259cda942ac6ef048f1c60d5c41b812203`。[发布流程](https://github.com/yydshly/0918_codex_project/actions/runs/35359019969)已成功完成。2026-09-18 核验九个项目入口、22 项 HTTP 资源、总站与项目摘要、完整图字节一致性，以及四条学习路线、刷新与历史、复制命令、图像缩放下载和手机布局。

[公网记录](../projects/010-ai-infra-book/notes/evidence/deployment.json) · [线上交互](../projects/010-ai-infra-book/notes/evidence/remote-browser.json) · [运行说明](../projects/010-ai-infra-book/demo/README.md)。研究站点发布不代表上游模型、计算器或 GPU 实验已实测。

## 011 发布状态

011 · 自学是门手艺已上线：[能力与学习指南](https://yydshly.github.io/0918_codex_project/011-selfteaching/) · [一图理解](https://yydshly.github.io/0918_codex_project/011-selfteaching/overview.html) · [能力与使用价值](https://yydshly.github.io/0918_codex_project/011-selfteaching/#use-summary)。沿用既有构建器和 Pages 工作流，保留此前九个展厅。

摘要说明它是以 Python 为实践载体的自学书，涵盖学习方法、Python 基础与进阶、文档检索和沟通协作；提供重读整理、刻意练习、以用带练、任务拆解、测试反馈与注意力管理等技巧，以及 Markdown 正文、Notebook、示例、工具附录和延伸阅读。对我们主要是研究陌生项目、学习新工具与复核 AI 结果的方法参考，Python 内容按需复习。

首次功能发布版本 `6abb6e6343cf5922a300cb6ff908fbc855f669f0`，[发布流程](https://github.com/yydshly/0918_codex_project/actions/runs/35362960262)已成功完成。已核验十个项目入口、24 项 HTTP 资源、总站与项目摘要、PNG/SVG 原图，以及四条路线、联合筛选、深链与历史、进度保存、笔记导出、图像缩放下载和手机布局。

[部署记录](../projects/011-selfteaching/notes/evidence/deployment.json) · [线上网页交互](../projects/011-selfteaching/notes/evidence/remote-browser.json) · [线上图像交互](../projects/011-selfteaching/notes/evidence/remote-map.json) · [运行说明](../projects/011-selfteaching/demo/README.md)。原书 Notebook 未运行，网页可用不代表学习成效已验证。
