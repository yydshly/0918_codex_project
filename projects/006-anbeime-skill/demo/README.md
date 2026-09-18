# 006 · 技能与网页研究导览

原生 HTML / CSS / JavaScript，无运行依赖、账号或 API。网页只呈现原创研究内容，不连接上游模型，也不执行技能。

**状态：已上线。** [在线研究展厅](https://yydshly.github.io/0918_codex_project/006-anbeime-skill/) · [一图理解](https://yydshly.github.io/0918_codex_project/006-anbeime-skill/#map)。2026-09-18 已验证六项目入口、本站七章节交互、手机布局、文档和高清图；上游技能未实测。

## 打开网页

直接打开 [index.html](index.html)，或在仓库根运行 `python -m http.server 8767 --bind 127.0.0.1`，访问[本地研究导览](http://127.0.0.1:8767/projects/006-anbeime-skill/demo/)。已有该端口服务时复用。

构建后的总站：[本地总站](http://127.0.0.1:8767/_site/) · [006 编号入口](http://127.0.0.1:8767/_site/006-anbeime-skill/)。这些是本机地址，不是公网部署地址。

## 七个章节

| 路由 | 内容与交互 |
| --- | --- |
| `#overview` | 四类内容关系、文件统计和我们的理解 |
| `#map` | 完整能力总览图，支持 100%—300% 缩放、滚动、复位与高清原图 |
| `#websites` | 切换 7 份站内页面介绍，说明产品、N8N 与站群链接 |
| `#capabilities` | 19 类任务的产出、技能入口与条件，支持搜索 |
| `#inventory` | 84 份文件的真实路径，支持名称搜索和 4 种范围筛选 |
| `#workflow` | 研究 PPT、代码架构、文章发布三种使用思路 |
| `#evidence` | 数字差异、模拟聊天、缺失实现、联网依赖和来源 |

支持键盘操作、手机布局、刷新与浏览器返回。数据内置在 `data.js`，直接打开本地文件也可使用。点击外部来源链接才会访问第三方站点。

## 更新与检查

在仓库根执行：

```powershell
python projects/006-anbeime-skill/code/inspect_sources.py
python projects/006-anbeime-skill/code/build-data.py
python projects/006-anbeime-skill/code/build-understanding-map.py
node projects/006-anbeime-skill/code/verify-demo.mjs
python projects/006-anbeime-skill/code/verify-integration.py
node projects/006-anbeime-skill/code/verify-demo.mjs http://127.0.0.1:8767/_site/006-anbeime-skill/ browser-built-qa.json
```

来源脚本需网络，使用 Python 标准库，仅读取固定版本的公开文件。`build-data.py` 从本地研究资料生成网页数据。浏览器检查需 Node.js、Playwright 和 Edge，`PLAYWRIGHT_MODULE` 可指向已有 Playwright 的 `index.mjs`；`CHROME_PATH` 可指定浏览器。检查工具不是网页运行依赖。

`build-understanding-map.py` 生成可编辑 SVG；PNG 由浏览器在 2160×3600 视口打开该 SVG 导出。图像生成服务两次网络失败后，最终采用本地原生排版；SVG 是源文件，PNG 用于网页与分享。

证据：[源码页浏览器检查](../notes/evidence/browser-qa.json) · [总站集成](../notes/evidence/integration.json) · [构建页浏览器检查](../notes/evidence/browser-built-qa.json)。

## 集成与发布边界

已登记 `site-projects.json`，沿用现有构建器和 Pages 工作流；不新增根应用或跨项目依赖。`verify-integration.py` 使用临时 Git 索引检查六个展厅共同构建，保留真实暂存区。历史本地集成记录中的 commit 是当时的工作树基线，不代表上线版本；公网发布版本以站点 `build.json` 与部署记录为准。

正式构建 `python scripts/build_site.py` 仅复制 Git 已跟踪文件，产物为 `_site/`，006 基础路径为 `/0918_codex_project/006-anbeime-skill/`，无需环境密钥。本次已提交并推送 main，经现有 GitHub Pages 工作流发布；六个展厅在同次部署中保留。外部上游站点的可用性仍未核实。

首次发布版本为 `11c9c87d689a225f31939d6ee649d2851c738e90`；[部署工作流](https://github.com/yydshly/0918_codex_project/actions/runs/35337069117)与[公网验证记录](../notes/evidence/deployment.json)可回查。验证包含 PNG/SVG 与本地文件逐字节一致，以及总站摘要、研究文档和所有章节。后续发布遵循[部署约定](../../../docs/DEPLOYMENT.md)。

公网复查命令（按需要设置 `EXPECTED_COMMIT` 核对目标版本）：

```powershell
node projects/006-anbeime-skill/code/verify-demo.mjs https://yydshly.github.io/0918_codex_project/006-anbeime-skill/ deployment.json
```
