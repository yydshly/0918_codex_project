# 图谱分类与效果展厅

研究版本：`6df3065f1d8ddc2ce3615314d1d493f36d6b1c80`。入口：[图谱类型与效果](../demo/index.html#gallery)。

## 分类口径

四大图谱内容类别：代码与架构、业务领域、Wiki 知识、Figma 设计。前端有结构、领域、知识三套主要视图，Figma 设计复用结构视图。展厅列出 **12 个展示条目**，不是 12 种独立图种：6 个代码观察角度 + 2 个领域观察角度 + 1 个知识图 + 1 个设计图 + 2 个辅助效果。

| 类别 | 展示条目 | 呈现效果 | 数据来源与验证 |
| --- | --- | --- | --- |
| 代码 | 架构分层 | 从架构层卡片进入文件、符号与聚类 | Order Lab 结构解析；人工分层；原版截图 |
| 代码 | 文件与模块依赖 | imports 等有向连接 | 样本 4 条 imports 已实测；独立示意 |
| 代码 | 函数调用 | 调用者与被调用者 | 样本 4 条 calls 已实测；独立示意 |
| 代码 | 类与接口 | 继承、实现、包含 | 类型定义核对；人工示意，未验证提取 |
| 代码 | 数据读写与结构 | 服务、表、模式、读写与校验 | SQL 表解析实测；读写边仅人工示意 |
| 代码 | 服务与基础设施 | 部署、配置、资源与触发 | 类型定义核对；人工示意，未连接云服务 |
| 领域 | 领域总览 | 横向领域卡片与跨领域虚线 | 人工 JSON 输入原版渲染，3 个可见领域 |
| 领域 | 流程与步骤 | 双击领域进入流程及编号步骤 | 人工 JSON 输入原版渲染，1 流程 + 4 步骤 |
| 知识 | Wiki 知识关系 | 力导向网络与主题社区 | 人工 JSON 输入原版渲染，6 节点 / 6 边 |
| 设计 | Figma 设计知识 | 页面、界面、组件集、组件、实例、变量 | 人工 JSON 输入原版结构视图，6 数据节点 + 2 聚类容器 |
| 辅助 | 变更影响 | 修改位置与直接关联节点高亮 | 核心 API 已实测；独立高亮示意 |
| 辅助 | 阅读导览 | 按步骤聚焦已有节点 | 人工路线；原版交互已验证 |

所有缩略图与“关系示意”均为研究者编写的 SVG 说明，不是原版界面。原版运行截图在详情中另行展示并说明输入来源。示意节点支持鼠标和键盘操作。

## 原版样本渲染的复现与边界

1. 运行 `node code/build-gallery-fixtures.mjs`，生成领域、知识、设计三个原创小样本。
2. 使用已准备的固定版本上游 Dashboard（启动方法见 [演示说明](../demo/README.md)）。
3. 设置 `PLAYWRIGHT_MODULE` 指向 Playwright 模块，运行 `node code/capture-gallery.mjs <终端打印的本地 Dashboard URL>`。
4. 脚本通过浏览器本地响应覆盖，把人工 JSON 交给未修改的上游界面；不修改上游源码或服务器中的图文件。保存四张截图和 [渲染记录](evidence/gallery-rendering.json)，不记录访问 token。

领域完整样本为 8 节点 / 7 边。总览只显示 3 个领域；详情只显示选中领域的流程与步骤。流程边是 flow → step；不能将画面解释成已经验证的 step → step 运行顺序。

Wiki 的缓存观点与“实验记录 A”均为教学示例，不是资料分析结论。设计样本没有调用 Figma API，也没有真实 Figma 文件。以上只验证了**已有合规数据的原版渲染**，没有验证自动提取、LLM 分析和端到端生成质量。图谱未含 Git commit，原版新鲜度提示如实保留。

人工 JSON：[领域](../code/gallery-fixtures/domain.json)、[知识](../code/gallery-fixtures/knowledge.json)、[设计](../code/gallery-fixtures/design.json)。

## 完整关系分类

源码定义 27 种节点、38 种边。下列为九类关系，数量不能作为图种数量或自动提取覆盖率。

| 分类 | 边类型 |
| --- | --- |
| 结构 | imports、exports、contains、inherits、implements |
| 行为 | calls、subscribes、publishes、middleware |
| 数据流 | reads_from、writes_to、transforms、validates |
| 依赖 | depends_on、tested_by、configures |
| 语义 | related、similar_to |
| 基础设施与模式 | deploys、serves、provisions、triggers、migrates、documents、routes、defines_schema |
| 领域 | contains_flow、flow_step、cross_domain |
| 知识 | cites、contradicts、builds_on、exemplifies、categorized_under、authored_by |
| 设计 | instance_of、variant_of、uses_token |

目前未发现标准 UML 时序图、带基数的 ER 图、BPMN、甘特图的独立原生实现。PNG、SVG 是图谱的导出格式，JSON 是数据格式，也不能另算图种。

## 固定版本证据

- [类型定义](https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/core/src/types.ts)
- [视图路由](https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/dashboard/src/App.tsx)
- [领域视图](https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/dashboard/src/components/DomainGraphView.tsx)
- [知识视图](https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/dashboard/src/components/KnowledgeGraphView.tsx)
- [Figma 工作流](https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/skills/understand-figma/SKILL.md)
