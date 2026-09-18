# Web 展厅运行与验证

## 内容与交互

这是研究者编写的教学展厅，不是 Claude Code 或上游仓库的原版应用。

0. **一图理解（默认入口）**：先看定位、九类内容、使用场景与对我们的意义；支持缩放、适应窗口与高清下载，提供四个导读入口。
1. **配置示例**：选择 Commands、Agents、Skills、Rules、Hooks 或 MCP，查看作用、实现、边界及固定版本来源。
2. **流程演示**：选择 C/F 与成功 / 失败样本，逐步查看任务交接。成功后可下载标注教学用途的 SVG；失败后停止且没有下载。
3. **实现拆解**：切换指令层、运行层、工具层和事件层，理解各层职责。
4. **项目适配**：比较功能开发、缺陷修复、仓库研究三种建议流程。
5. **证据与边界**：查阅来源、实验记录、配置疑点及未验证内容。

天气数据固定为 26°C / 78.8°F。没有后台、账户、在线模型调用或实时天气请求。只有点击外部来源链接时才需要联网。

## 本地运行

直接打开 `index.html`，或在仓库根目录执行：

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

本地入口：<http://127.0.0.1:8766/projects/002-claude-code-best-practice/demo/>。

页面为原生 HTML / CSS / JavaScript，无依赖安装与应用构建步骤。导航使用 hash，资源使用相对路径。源文件与现有研究集保持同样的 demo / assets / notes 关系。

## 原版能力验证

在本子项目目录执行：

```powershell
python code/verify-upstream.py --download
```

它将固定版本的选定源码下载到仓库忽略的 `upstream-local/`，检查文件 SHA-256，并在临时目录实验真实 Hook 函数。若已有固定快照，可传路径替代 `--download`。脚本不会安装或启动 Claude Code，不会连接天气 / MCP 服务，不会播放提示音。

## 网页验证

需要可解析的 Playwright 模块与 Microsoft Edge。可以通过 `PLAYWRIGHT_MODULE` 指定 `playwright/index.mjs` 的绝对路径，通过 `CHROME_PATH` 指定其他兼容浏览器。

```powershell
# 在本子项目目录，先确保上面的本地服务正在运行。
node code/verify-demo.mjs
# 检查其他基础路径时传入其 URL。
node code/verify-demo.mjs http://127.0.0.1:8766/_site/002-claude-code-best-practice/
```

检查包括关键交互、下载内容、失败分支、状态重置、键盘操作、六页哈希导航、四种屏宽、200% 字号以及 file 协议。真实截图写入 `assets/`，结果写入 `notes/evidence/browser-qa.json`。该检查不是上游模型流程的端到端验证。

## 站点集成与部署记录

| 字段 | 当前值 |
| --- | --- |
| 状态 | 已上线 |
| 公网地址 | [引导展厅](https://yydshly.github.io/0918_codex_project/002-claude-code-best-practice/) |
| 发布路径 | `002-claude-code-best-practice/`，已验证的编号子路径 |
| 源码 | 本目录的 index.html / styles.css / data.js / app.js |
| 总站构建 | 在仓库根目录执行 `python scripts/build_site.py` |
| 总站输出 | `_site/002-claude-code-best-practice/`，同时保留 demo 子目录 |
| 环境变量 | 展厅运行无需；QA 可选变量见上文 |
| 最近本地验证 | 2026-09-18；具体环境见 browser-qa.json |

已登记到 `site-projects.json`。现有 GitHub Pages 工作流在相关内容推送到 main 后运行；本次已通过现有 Pages 工作流发布，并完成公网资源、关键交互与手机布局验证。现有构建默认只复制 Git 已跟踪文件，新文件提交后才进入正式构建。本地检查使用临时 Git 索引纳入新文件，不改动真实暂存区。

在本子项目运行 `python code/verify-integration.py` 可复现该集成检查；它会重建仓库内的 `_site/`，检查两项目导航、相对路径和本地文档链接，将结果写入 [integration.json](../notes/evidence/integration.json)。browser-qa.json 记录本地完整交互检查；[deployment.json](../notes/evidence/deployment.json) 记录实际公网验证与对应版本。

部署遵循本仓库 [部署约定](../../../docs/DEPLOYMENT.md)，使用既有 GitHub Pages 编号路径。正式验证命令在仓库根目录执行：`node scripts/verify_pages.mjs https://yydshly.github.io/0918_codex_project/`。

[返回项目说明](../README.md)
