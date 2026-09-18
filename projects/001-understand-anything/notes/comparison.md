# 与既有图谱 / 制图工具的比较

入口：[同类工具与选型](../demo/index.html#compare)。本轮整理最直接相关的四项历史研究，加上当前 Understand Anything，共五个工具；不是对所有已研究软件的全量排名。

## 工具在流程中的位置

| 工具 | 输入与处理 | 产物重点 | 适用场景 |
| --- | --- | --- | --- |
| Understand Anything | 程序扫描代码、Wiki 或 Figma；模型补充语义、分层与导览 | 可探索、可解释的图谱及阅读路线 | 陌生项目学习、代码与业务理解、团队知识传递 |
| Graphify | AST 提取代码关系，模型处理语义资料；建图与社区 / 路径分析 | 可查询图谱、来源、报告与多格式数据 | 依赖查询、资料关联、Agent 上下文与关系复用 |
| Archify | 外部作者 / Agent 提供 JSON 图规格，库校验、布局与交付 | 架构、工作流、时序、数据流、生命周期及模型差异 | 设计评审、系统讲解、交接、重构方案比较 |
| Diagram Design | AI 按 Skill 进行选图、信息取舍、布局与 SVG 编写；脚本辅助 | 面向读者的 HTML / SVG / PNG 说明图 | 文章、汇报、教学、品牌配图、旧图重绘 |
| Fireworks | 合规 JSON 绘制并路由连线，或检查 AI 编写的 SVG | 工程技术图、几何与领域检查、图片及离线交付 | 技术方案、部署 / UML 表达、Agent / RAG 配图 |

前两个包含关系提取流程；后三个的事实通常由人、外部 Agent 或其他分析器整理。已有合规结构数据时，程序渲染不需要再次调用模型；图纸检查通过也不等于业务事实正确。

## 按任务选择

1. **第一次看懂仓库**：优先体验 UA 的解释、分层和导览；若关注查询依赖和路径，可切换 Graphify。
2. **查询依赖、连接资料、给 Agent 上下文**：优先复用 Graphify 的关系查询；多模态提取需另验。
3. **设计评审或团队交接**：准备已确认的组件和流程，再用 Archify；模型差异需要前后两个模型。
4. **文章、汇报或教学**：内容确认后用 Diagram Design 做信息取舍与品牌表达。
5. **工程或 AI 系统图**：Fireworks 提供图型规范、路由和检查；需确认目标图走 JSON 还是 AI SVG 路线。
6. **已有图重新设计**：Diagram Design 支持部分 Mermaid / draw.io / Excalidraw 导入和重绘；要核对删改。
7. **检查已有设计系统关系**：UA 有 Figma 入口；本次只有人工 JSON 渲染验证，没有真实 API 实测。

网页同时给出准备材料、期望产物、何时更换工具、验证方式。建议基于既有研究，非同一数据集的准确率、速度或成本测试。

## 已有验证不能混用

- **UA**：6 文件、12 节点 / 14 边的核心实验；原版浏览和导览。领域 / Wiki / 设计为人工 JSON 原版渲染，未跑完整模型生成。
- **Graphify**：FastAPI 核心包 48 文件，747 节点 / 1,971 关系；代码提取、原生导出、查询、MCP 和增量实验。多模态、数据库连接等尚未实测。
- **Archify**：五类原生图、架构模型差异、中文源码案例、源码引用、导出与预览恢复。输入规格由 Agent 编写。
- **Diagram Design**：155 个上游 HTML、8 个中文案例与三种导入实验；AI 按规范绘图，不是库自动提取代码。
- **Fireworks**：33 个图型 / 领域条目，15 项原生 JSON、18 项 AI SVG 后导出，后者含 3 项近似适配；GIF 为上游样片。

图型数、样例数、关系数和独立渲染器数属于不同指标。各研究样本规模不同，不能据此判断效率或质量高低。

## 可组合，但没有自动接通

- 研究：UA / Graphify → 回查源码 → 研究结论。
- 交接：关系材料 → 人 / Agent 确认主线并编写规格 → Archify。
- 配图：确认结论 → Diagram Design / Fireworks → 文章或技术文档。

中间需要字段转换、信息取舍与来源核对，各库 JSON 不直接兼容。设计提案也可以直接由人建模，无须先扫描现有代码。

## 固定版本与历史来源

| 工具 | 研究版本 / 提交 | 固定源码 | 原研究展厅 |
| --- | --- | --- | --- |
| UA | 6df3065 | [源码](https://github.com/Egonex-AI/Understand-Anything/tree/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80) | [本研究](../README.md) |
| Graphify | v0.9.57 / 3f82bf7 | [源码](https://github.com/Graphify-Labs/graphify/tree/3f82bf7f837a07fb0f7668fbdbd5662801906942) | [0911 / 009-graphify](https://yydshly.github.io/0911_codex_project/009-graphify/) |
| Archify | 2.17.0-dev.1 / 1072200 | [源码](https://github.com/tt-a1i/archify/tree/10722002bb8777ecb639d93c49586fae4adf3ae4) | [0909 / 003-archify](https://yydshly.github.io/0909_codex_project/projects/003-archify/) |
| Diagram Design | 2.6.23 / ce9344c | [源码](https://github.com/cathrynlavery/diagram-design/tree/ce9344c52cb9be811de187bf2a6d58c712c9c9fe) | [0914 / 005-diagram-design](https://yydshly.github.io/0914_codex_project/005-diagram-design/) |
| Fireworks | 包版本 1.2.0 / 31fea36；含未发布升级 | [源码](https://github.com/yizhiyanhua-ai/fireworks-tech-graph/tree/31fea364eda5f1852b1175f3d9e29ea31d22dcb4) | [0915 / 003-fireworks-tech-graph](https://yydshly.github.io/0915_codex_project/003-fireworks-tech-graph/) |

本次直接读取上述四个历史子项目 README，复用已有结论；网页仅新增原创总结和链接，没有复制上游代码、素材或依赖。上游当前版本可能变化，正文不将最新能力混入历史实测。各历史研究分别保留许可与第三方说明。
