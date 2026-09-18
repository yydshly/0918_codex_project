# 交互展示运行说明

## 范围

这是研究者编写的能力体验网页。默认“图谱类型与效果”按四类图谱整理十二个展示条目，附原版 Dashboard 真实运行截图、可点击关系示意、输入与生成方式。另保留五类使用场景、分工具操作指南和独立交互图谱。订单结构和影响分析来自上游程序实测；领域 / Wiki / 设计原版截图使用人工 JSON；中文摘要、分层与导览为研究注释。没有调用在线模型。

## 在线访问

已部署到 GitHub Pages：[分类效果展厅](https://yydshly.github.io/0918_codex_project/001-understand-anything/) · [一图总览](https://yydshly.github.io/0918_codex_project/001-understand-anything/overview.html) · [同类工具对比](https://yydshly.github.io/0918_codex_project/001-understand-anything/#compare)。

## 本地运行

无需依赖安装或构建，直接用浏览器打开 `index.html` 即可。或在仓库根目录运行：

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

本地入口：<http://127.0.0.1:8765/projects/001-understand-anything/demo/>。停止服务后地址不再可用。

## 推荐体验顺序

先看 [一图总览](overview.html)：从输入来源、处理分工到图谱效果与使用价值，支持缩放与 PNG / SVG 下载。也可从展厅顶部“一图总览”入口打开。原图是研究者依据源码与实验绘制的能力说明，非原版截图。

然后看 [同类工具与选型](index.html#compare)：七种场景、五工具对照表、六维度能力说明、同一订单系统的用途举例、三种组合方案。已接入侧栏与总览页导航。对比沿用历史固定版本，历史展厅与源码链接需要联网；本页内容与交互支持离线。

1. 默认“图谱类型与效果”页筛选四大图谱及辅助效果，点击十二个效果卡片；详情切换原版截图与关系示意，点击节点查看关系。原版截图可看大图。“能看到什么”页继续保留总览、代码和导览体验。
2. 点击预写问题，阅读针对样本的解读；点击函数按钮进入独立图谱核对源码。
3. “使用场景”切换五类任务，例如“评审一次改动”，可直接进入支付变更高亮。
4. “如何使用”选择所用工具，复制相应安装和技能命令；命令不会在网页中自动执行。
5. “动手探索”点击 createOrder，查看代码和关系；搜索 chargePayment 或库存，切换文件视图和阅读导览。
6. 改动下拉框选择 src/payment.ts，观察直接关联。此页筛选是文本包含匹配，不是向量搜索。
7. “实现原理”“实验与边界”和“能力清单”保留源代码出处、实测数据与限制。导出 JSON 可与 notes/evidence/graph.json 对照。

移动端图谱纵向排列；节点支持键盘 Tab / Enter / Space 操作。哈希导航支持刷新。外部源码链接需要联网。

## 数据更新与验证

总览图复现：`node code/build-overview.mjs`；准备 Playwright / Edge 并设置 `PLAYWRIGHT_MODULE` 后运行 `node code/verify-overview.mjs`，生成高清 PNG、检查文字越界与重叠、验证缩放和手机布局，记录为 `notes/evidence/overview-qa.json`。以上命令在子项目目录执行。

```powershell
# 在子项目目录；上游需固定到研究 commit 且 core 已构建。
node code/run-experiments.mjs C:/path/to/Understand-Anything

# 可选 QA：需要能解析 playwright 模块，且已安装 Microsoft Edge。
# 可设 PLAYWRIGHT_MODULE 为 playwright/index.mjs 的绝对路径。
# 可设 CHROME_PATH 指向兼容 Chromium 的浏览器可执行文件。
node code/verify-demo.mjs http://127.0.0.1:8765/projects/001-understand-anything/demo/
```

QA 脚本在 localhost 服务启动后运行，共 23 组检查，覆盖九个视图、十二个效果条目、四类图谱与辅助分类、九组38种关系、原版截图、键盘节点操作、五类场景、工具配置、命令复制、子路径刷新、手机布局与 file://。它更新截图和 `notes/evidence/browser-qa.json`。

对比页专项检查：设置 `PLAYWRIGHT_MODULE` 后，在子项目目录运行 `node code/verify-comparison.mjs`。7 组检查覆盖总览入口、七场景、五工具详情与固定版本、刷新、键盘、1600 / 768 / 390px 及本地文件模式；截图和记录保存到 `assets/comparison*.png`、`notes/evidence/comparison-qa.json`。没有重新运行其他四个库，也没有做跨库性能测试。

## 原版 Dashboard 截图复现

先按项目 README 准备固定版本上游并构建 core。复制 `code/fixture/` 到一个新的本地临时目录，在副本中创建 `.ua/`，将 `notes/evidence/graph.json` 复制为 `.ua/knowledge-graph.json`，并写入 `.ua/config.json`：

```json
{"outputLanguage":"zh","autoUpdate":false}
```

在上游根目录启动：

```powershell
$env:GRAPH_DIR = 'C:/path/to/the/fixture-copy'
pnpm --filter @understand-anything/dashboard dev --host 127.0.0.1 --port 5173 --strictPort
```

使用终端实际打印的带 token 的 URL。回到研究子项目目录运行：

```powershell
node code/capture-upstream.mjs '终端实际打印的 Dashboard URL'
```

脚本需要 Playwright / Edge，环境参数与浏览器 QA 相同；保存三张原版截图和 `notes/evidence/upstream-dashboard.json`，不保存访问 token。原版程序未经修改；因为样本没有 Git commit，截图保留了 freshness 提示。没有执行完整 LLM 生成，也没有伪造图谱新鲜状态。

新增领域 / Wiki / 设计图谱截图：先运行 `node code/build-gallery-fixtures.mjs`，再使用同一上游服务运行 `node code/capture-gallery.mjs '终端打印的 Dashboard URL'`。该脚本使用 Edge，并要求设置 `PLAYWRIGHT_MODULE`；通过浏览器本地响应覆盖注入人工 JSON，不改动上游服务器文件。保存四张原版渲染截图与 `notes/evidence/gallery-rendering.json`。详见 [图谱分类与验证边界](../notes/graph-types.md)。

## 部署记录

| 字段 | 当前值 |
| --- | --- |
| 状态 | 已上线，GitHub Pages / GitHub Actions 自动发布 |
| 公网地址 | [001-understand-anything/](https://yydshly.github.io/0918_codex_project/001-understand-anything/) |
| 首次发布版本 | `b0eff0df723a611c6eee1656d6cdf14a4d5c6abb`；当前线上版本见站点 [build.json](https://yydshly.github.io/0918_codex_project/build.json) |
| 构建 | 仓库根目录运行 `python scripts/build_site.py`；产物为 `_site/`，不提交 Git |
| 必需文件 | index.html、styles.css、experience.css、gallery.css、comparison.css、app.js、experience.js、gallery.js、comparison.js、data.js，以及 ../assets/upstream-*.png、../assets/gallery-*.png；样本下载依赖 ../code/gallery-fixtures/*.json |
| 总览文件 | overview.html、../assets/capability-map.svg、../assets/capability-map.png |
| 资源路径 | `/0918_codex_project/001-understand-anything/`；相对资源路径，导航使用 hash |
| 环境变量 | 展示运行不需要；实验与 QA 参数见上文 |
| 最近验证 | 2026-09-18，Edge，公网 7 组检查，1440×1000 / 390×844；[部署验证记录](../notes/evidence/deployment.json) |

研究仓库遵循 [Web 部署约定](../../../docs/DEPLOYMENT.md)，使用 `001-understand-anything/` 编号子路径。构建脚本按根目录 `site-projects.json` 收集 Git 已跟踪的项目文件，保留 demo/、assets/、notes/、code/ 等目录，并在编号路径根部生成调整相对资源链接后的网页入口。研究文档与样本也随站点发布。

发布流程为 [pages.yml](../../../.github/workflows/pages.yml)：相关项目文件推送到 main 后自动构建与发布，也可在 Actions 中手动执行。公网复查时，在仓库根目录设置 `PLAYWRIGHT_MODULE` 并运行 `node scripts/verify_pages.mjs https://yydshly.github.io/0918_codex_project/`；可选 `EXPECTED_COMMIT` 用于核对实际发布版本。验证记录中的 sourceCommit 对应当次被测版本，不代表随后每次发布都重新写入记录。
