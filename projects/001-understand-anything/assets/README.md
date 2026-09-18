# 图片来源

图片包括原创能力示意图、研究网站截图与原版 Dashboard 截图。均于 2026-09-18 制作或截取；没有使用占位图或把原创示意称作原版截图。

## 原创能力总览

`capability-map.svg` 为依据固定源码与实验整理的原创矢量说明图，1800×2020；`capability-map.png` 为浏览器渲染的 3600×4040 高清版本。它覆盖输入、处理、程序 / 模型分工、四类图谱、交互、使用价值与验证范围；不是上游自动生成的图或产品截图。

生成入口 `code/build-overview.mjs`，渲染检查入口 `code/verify-overview.mjs`。检查记录见 [overview-qa.json](../notes/evidence/overview-qa.json)，可缩放页面为 [overview.html](../demo/overview.html)。

## 研究网站截图

由 `code/verify-demo.mjs` 生成，桌面视口 1600×1100、手机视口 390×844，均为全页截图。

| 文件 | 内容 |
| --- | --- |
| gallery.png | 默认图谱展厅：四大类别与十二个效果条目 |
| gallery-mobile.png | 图谱展厅手机布局 |
| gallery-domain-page.png | 领域图谱的展厅详情与效果列表 |
| comparison.png | 五工具对比：场景选择、对照表、详情与组合方案 |
| comparison-mobile.png | 对比页手机布局，Graphify 详情与工程制图场景 |
| experience.png | 原版效果页，内嵌上游原版界面截图与预写解读 |
| experience-mobile.png | 手机效果首页 |
| scenarios.png | 评审改动场景、操作路径与体验入口 |
| guide.png | Codex Windows 五步操作指南 |
| cover.png | 独立交互图谱及 createOrder 源码详情 |
| experiments.png | 函数体变化边界和 7 项实验 |
| mobile.png | 独立图谱的手机纵向布局 |

## 上游原版 Dashboard 截图

由 `code/capture-upstream.mjs` 生成，1500×960。上游未修改，版本固定为 `6df3065f1d8ddc2ce3615314d1d493f36d6b1c80`。

| 文件 | 内容 |
| --- | --- |
| upstream-overview.png | 原版架构层总览 |
| upstream-detail.png | 业务层、orders.ts 详情与源码面板 |
| upstream-tour.png | 阅读导览第二步 createOrder |

输入为本研究的 Order Lab 图谱：结构来自上游核心库和样本关系适配；中文摘要、层级和导览为研究者编写。这些截图证明原版界面的显示与交互，不证明完整 LLM 流水线生成质量。图谱缺少 Git commit，所以截图如实保留了新鲜度提示。

运行记录见 [upstream-dashboard.json](../notes/evidence/upstream-dashboard.json)。上游 UI 的 MIT 许可与版权见 [第三方说明](../THIRD_PARTY_NOTICES.md)。研究网站布局及样本为本研究原创。

## 人工数据的原版渲染截图

由 `code/capture-gallery.mjs` 运行未修改的固定版本上游界面后截取，1500×960。`gallery-domain.png` 为领域总览，`gallery-domain-detail.png` 为流程步骤，`gallery-knowledge.png` 为 Wiki 网络，`gallery-design.png` 为设计节点与聚类。

数据为 `code/gallery-fixtures/` 下的研究者原创 JSON，通过浏览器本地响应覆盖注入；没有执行上游自动领域/Wiki 提取、LLM 分析或 Figma API。原版无 Git commit 提示保留。截图证明渲染效果，不证明自动生成质量。详见 [渲染记录](../notes/evidence/gallery-rendering.json) 和 [图谱分类](../notes/graph-types.md)。

`comparison.png`、`comparison-mobile.png` 由 `code/verify-comparison.mjs` 实际截取。本轮对比内容是基于历史研究重新组织的原创说明，没有嵌入或复制其他项目的上游界面素材；历史成果以链接方式引用。
