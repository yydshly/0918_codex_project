# Understand-Anything 研究笔记

## 研究范围与结论

本轮回答三个问题：

1. 项目如何把代码转成知识图谱，哪些内容是解析事实，哪些内容由模型推断？
2. 不调用模型时，能否真实验证其解析、图谱、搜索、改动影响与增量分类？
3. 产品能力的边界在哪里，哪些宣传不能直接作为已验证结论？

研究结果：核心解析与图谱 API 可以独立运行。订单样本生成 12 个节点和 14 条关系；图谱能定位源码、关联依赖、支持读取上下文。影响分析是一跳关系；结构指纹可以漏过实际改变业务行为的函数体修改；Dashboard 的“语义搜索”开关在本固定版本仍调用模糊搜索。这些结论分别有代码或实验依据。

**未运行完整多 Agent / LLM 流水线，未做大仓库性能、跨语言准确率或模型幻觉率测评。** 已启动未修改的上游原版 Dashboard，用现有样本验证显示、源码读取与导览交互。研究网站将这些真实截图、使用场景、操作指南和独立查看器整合在一起；不能把原版成功显示预先准备的数据当作模型自动生成质量的证据。

## 版本与环境

| 项目 | 记录 |
| --- | --- |
| 上游 | https://github.com/Egonex-AI/Understand-Anything |
| 固定 commit | `6df3065f1d8ddc2ce3615314d1d493f36d6b1c80` |
| 许可 | MIT，Yuxiang Lin / Infinite Universe, Inc.，2026 |
| 系统 | Windows x64 |
| Node.js | 24.19.0 |
| pnpm | 11.19.0；上游 packageManager 声明 10.6.2 |
| TypeScript / Vitest | 5.9.3 / 3.2.4（锁文件安装结果） |
| 浏览器 | Microsoft Edge 153.0.4234.32 |
| 日期 | 2026-09-18，Asia/Shanghai |
| 输入样本指纹 | 见 [experiments.json](evidence/experiments.json) 的 fixtureHash |
| 展示数据版本 | 固定上游 commit + 样本 SHA-256 + generatedAt |

JSON 时间戳为 UTC，例如 2026-09-17T23:49 对应北京时间 2026-09-18 07:49。研究代码尚未产生单独提交，因此不伪造本地实验 commit；输入样本通过内容哈希固定。

## 实现组成

| 部分 | 职责 | 上游入口 |
| --- | --- | --- |
| 技能编排 | 控制完整分析的阶段、批次、失败处理和产物 | [understand/SKILL.md][pipeline] |
| 角色说明 | 文件分析、架构归纳、阅读导览、复核等 | [file-analyzer.md][agent] |
| 核心库 | 解析器、图谱结构、搜索、指纹、持久化 | [core/src/index.ts][core] |
| 配套脚本 | 扫描、分批、结构提取、合并与增量准备 | [extract-structure.mjs][extract] |
| Dashboard | 图谱布局、筛选、源码详情和导览 | [dashboard/package.json][dashboard] |
| 问答 / diff | 组织相关子图和改动上下文 | [understand-chat][chat] / [diff-analyzer.ts][diff] |

它的工程形态是“技能提示词 + 宿主模型 / 工具 + 确定性脚本 + 图谱前端”。编排角色不等于单独训练过的模型。上游 core 内的部分 LLM 模块负责生成提示词和解析回复，完整执行依赖宿主 AI 工具。

### 1. 结构解析

Tree-sitter 使用语法树识别函数、类、参数、返回类型、导入、导出、调用位置等。非代码文件由专用解析器处理，例如 SQLParser 提取表名和列名。各语言配置与提取器覆盖不同，不能把“支持多语言”理解成每种语言都具有完整的编译器级语义分析。

静态调用提取也不等于运行时调用追踪：动态分派、反射、框架注入、跨服务关系可能需要其他证据或模型推断。

### 2. 分批与上下文

[compute-batches.mjs][batches] 对内部导入图使用 Louvain 社区发现，尝试把相关文件分到同一批次；neighborMap 携带跨批次邻居及导出符号。主技能说明最多并发 5 个文件分析代理。

本研究读取了这段设计，没有实际执行多代理调度或进行分批效果评估。

### 3. 模型语义与图谱组装

文件分析代理读取结构与源码，补充摘要、标签、复杂度和关系。架构分析与 tour-builder 再生成逻辑分组和阅读顺序。主流程包含组装复核、架构、导览、默认校验或显式开启的模型复核。

图谱以 JSON 保存，核心字段为：

```text
project   来源、语言、框架、时间、Git 版本
nodes     标识、类型、名称、文件路径、行号、摘要、标签
edges     source、target、关系类型、方向、权重
layers    架构分组及节点集合
tour      阅读步骤及关联节点
```

默认目录是 `.ua/`，已有旧目录 `.understand-anything/` 时继续使用旧目录。图谱可以随仓库共享。查看已有图谱不要求每次调用模型；生成与补充语义仍会消耗宿主模型资源。

边的 weight 字段表达关系强弱 / 约定权重，不应直接解释成已经校准的模型置信度。基础图谱不要求 Neo4j 之类的独立图数据库。

### 4. 问答与检索

[问答技能][chat] 先检查图谱新鲜度，再查找名称、摘要、标签相关节点，读取相邻关系和层级上下文，交给宿主模型组织回答。这是一种利用图结构组织上下文的流程，并不要求预先建立向量数据库。

[SearchEngine][search] 使用 Fuse.js，对 name、tags、summary、languageNotes 赋不同权重。核心库还包含向量余弦相似度的 SemanticSearchEngine，但 [Dashboard store][store] 的搜索分支明确让两种模式调用同一模糊搜索引擎。**向量搜索类存在，不能推导出 UI 已接通向量搜索。**

本展示的输入框只做文本包含筛选，未复制 Fuse，也未冒充上游 Semantic 模式。上游 Fuse 的结果保存在实验 JSON 中。

### 5. 影响分析

[buildDiffContext][diff] 把 changedFiles 映射到节点和包含的子节点，再遍历边，收集与改动节点直接相连的一跳邻居及相关层。它同时考虑入边和出边，不能把全部 affectedNodes 一概解释成“递归的下游影响”。

更复杂的解释可以由宿主模型继续推理，但本次验证只覆盖这个确定性 API，未验证完整 understand-diff 技能的回答。

### 6. 指纹与更新分类

[fingerprint.ts][fingerprint] 保存内容哈希以及函数名称、归属、参数、返回类型、导出状态、长度等结构信息；比较导入导出、类与方法变化。内容变化但结构信息稳定时，可能返回 COSMETIC，其 detail 字段明确允许 internal logic changed。

[classifyUpdate][classifier] 的规则包括：

- 无结构变化：SKIP；
- 局部结构变化：PARTIAL_UPDATE；
- 新增 / 删除顶层目录，或结构变化文件超过 10 个：ARCHITECTURE_UPDATE；
- 结构变化文件超过 30 个，或占比超过 50%：FULL_UPDATE。

这些是固定版本的启发式阈值，不是适用于所有仓库的可靠性保证。

## 实验设计和结果

### A. 输入与证据来源

样本为本研究原创的 5 个 TypeScript 文件和 1 个 SQL 文件：

```text
api.handleCheckout
  └─ orders.createOrder
       ├─ inventory.reserveStock
       ├─ payment.chargePayment
       └─ repository.saveOrder

schema.sql → orders 表（独立 SQL 样本，没有虚构数据库访问边）
```

支付与保存函数只返回演示字符串；库存函数只检查范围，没有扣减行为。因此研究注释明确写“模拟支付”“模拟保存”“检查数量”，避免把样本说成真实电商后端。

[实验入口](../code/run-experiments.mjs) 直接调用固定版本上游 core，并另外执行上游捆绑的 extract-structure 脚本：

- 结构由上游 API 提取；
- GraphBuilder 生成文件 / 函数 / 表节点；
- 本研究仅对样本中的直接相对命名导入进行简单解析，将明确的函数调用送入 GraphBuilder；
- **这个适配不等同于上游完整跨批次合并流程**，也没有处理别名、动态调用或复杂模块解析；
- 中文摘要、层级与 tour 来自 [annotations.json](../code/annotations.json) 和研究代码；
- 影响结果直接调用上游 buildDiffContext，不是前端猜测或硬编码；
- 原始输出、图谱、影响、变化分类保存在 [evidence/](evidence/)。

### B. 结构和图谱

预期：样本应包含 5 个顶层函数、4 个相对导入、4 个函数间调用、一张含 3 个字段的表。

实际：预期均成立。上游提取入口处理 6 个文件，filesSkipped 和 filesUnreadable 均为空。GraphBuilder 产出 12 节点和 14 边；包括 6 条 contains、4 条 imports、4 条 calls。validateGraph 成功，额外断言节点标识唯一且所有边端点存在。

证据：[structures.json](evidence/structures.json)、[extraction.json](evidence/extraction.json)、[graph.json](evidence/graph.json)。

局限：仅验证这个小型 TypeScript / SQL 样本，不是多语言完整性测评。

### C. 搜索

调用上游 SearchEngine：

- `chargePayment` 返回对应函数；
- `库存` 命中含相关摘要的节点；
- 未知词 `不存在的符号xyz` 返回空结果。

中文检索命中依赖研究者提供的中文摘要，不能当成模型理解准确率实验。没有生成 embeddings，也没有验证跨语言向量检索。

### D. 变更影响

输入 changedFiles = [`src/payment.ts`]。

实际 changedNodes 包括支付文件和支付函数；affectedNodes 包括订单文件和订单函数。入口 api / handleCheckout 是间接关联，没有出现在结果里。

这验证了**一跳**边界。前端高亮读取同一输出，文件模式与函数模式分别展示相应节点；统计中的“全图”数量包含两个粒度。

### E. 业务逻辑变化与结构指纹

基线：

```typescript
export function reserveStock(quantity: number): boolean {
  return quantity > 0 && quantity <= 100;
}
```

只把 100 改成 10，函数名、参数、返回类型、行数和导入导出不变。使用 Node 的 TypeScript 类型剥离后实际调用两个版本，输入 quantity = 50。

| 对比 | 实际返回 / 分类 |
| --- | --- |
| 同一源码 | NONE |
| 添加参数 | STRUCTURAL |
| 函数体上限 100 → 10 | COSMETIC |
| 修改前执行 reserveStock(50) | true |
| 修改后执行 reserveStock(50) | false |
| 仅此 COSMETIC 文件的 classifyUpdate | SKIP |

**已验证事实**：该样本的业务返回值改变，而指纹与更新分类选择跳过。

**推论**：若旧图谱摘要描述了旧上限、又只走这一增量判断，摘要可能过时。没有把这一推论说成实际跑完完整自动更新后已观察到的端到端故障。

可研究的改进：将“结构不变”和“语义不变”分离；函数体变化可只刷新语义摘要、不重建拓扑；或增加函数体哈希 / AST 差异 / 行为测试信号。尚未修改上游或实现这些方案。

### F. 自动化检查

- 7 项研究实验全部通过（其中包含对已知限制的断言，不能解读为“没有问题”）。
- 相关上游 6 个测试文件：140 通过、1 跳过，见 [upstream-tests.md](evidence/upstream-tests.md)。
- 能力体验网站 18 组浏览器交互检查通过，见 [browser-qa.json](evidence/browser-qa.json)。
- 浏览器实际截图见 [cover.png](../assets/cover.png)、[experiments.png](../assets/experiments.png)、[mobile.png](../assets/mobile.png)。

网站检查覆盖七视图、三张原版截图切换、五类场景、四种工具配置与复制、源码行号、导览、影响高亮、下载、筛选空状态、键盘、哈希刷新、390px 布局和 file://。另外单独验证了上游原版 Dashboard，记录见下节。

### G. 原版效果与使用指南

在未修改的固定版本上游目录执行 Vite Dashboard，GRAPH_DIR 指向临时样本副本，包含原始 TypeScript 文件及 .ua/knowledge-graph.json。没有在研究仓库中引入新的运行依赖。

实际验证：载入 12 节点 / 14 边；点击业务层并展开聚类；选择 orders.ts，读取本地源码；启动导览并前进到第二步 createOrder。三张截图和运行证据见 [upstream-dashboard.json](evidence/upstream-dashboard.json)。因为样本图谱没有 Git commit，原版提示无法检查新鲜度，截图保留该提示。

网站新增“能看到什么”“使用场景”“如何使用”。预写问答根据样本源码组织，明确不调用模型；场景包括接手项目、评审改动、定位逻辑、业务领域和 Wiki，其中后两项未运行完整流程。安装指南依据固定版本上游 README / install.ps1，提供 Codex Windows、Codex macOS/Linux、Claude Code、Cursor 四种配置。脚本链接指向 main，实际新安装可能比研究版本更新；没有执行这些全局安装或完整模型分析命令。

截图复现入口是 [capture-upstream.mjs](../code/capture-upstream.mjs)，准备方法见 [演示说明](../demo/README.md#原版-dashboard-截图复现)。网页的命令复制和场景切换不执行安装或模型调用。

## 复现与工程选择

入口见 [README](../README.md#复现实验)。演示为纯静态文件，运行不依赖上游安装。实验复现需要固定版本上游和已构建 core；PowerShell 辅助脚本可以准备它们。

- 上游副本位于系统临时目录或被忽略的 upstream-local；未复制嵌套 .git、node_modules、dist 到研究成果。
- 首次安装采用 frozen lockfile 和 ignore-scripts，使用现成 WASM 语法文件并显式构建 core。本样本不需要执行语法包的原生编译生命周期。
- pnpm 11 会提示上游 package.json 的 pnpm.onlyBuiltDependencies 字段不再读取；本轮使用 ignore-scripts，因此没有依赖它来允许安装脚本。
- Node 提示 stripTypeScriptTypes 为实验 API；本研究固定 Node 24.19.0，未声称更低版本都能复现。
- 初始移动布局把全图等比例缩小，阅读性不佳；已改成纵向节点布局并重新运行浏览器 QA。
- 使用相对资源路径与 hash 导航；验证了仓库编号子目录访问与刷新，未发布公网地址。
- 没有安装全局 Understand-Anything 插件，没有调用第三方模型 API，也未保存任何密钥。

## 后续研究优先级

新增“按类别、按效果”整理见 [图谱分类](graph-types.md)：四类内容、十二个展示条目。已补充人工领域、Wiki、设计样本的原版渲染验证，保留四张截图与原始 JSON；没有执行自动提取或模型分析。该验证扩展了界面效果证据，不改变前述模型质量未验证的结论。

1. 在用户选择的真实仓库运行完整 LLM 分析，分别核对节点漏检、关系错误、摘要准确性及成本。
2. 针对函数体语义变化构建更细的更新分级，比较模型消耗和摘要新鲜度。
3. 对跨文件别名、接口调用、异步事件和依赖注入建立样本集。
4. 将一跳关系提示与可选多跳影响分开，并标注推断 / 静态证据的来源。
5. 检验上游真正的语义检索接入，而不是只根据类名或按钮判断能力。

## 固定版本参考

[pipeline]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/skills/understand/SKILL.md
[agent]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/agents/file-analyzer.md
[core]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/core/src/index.ts
[extract]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/skills/understand/extract-structure.mjs
[batches]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/skills/understand/compute-batches.mjs
[dashboard]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/dashboard/package.json
[chat]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/skills/understand-chat/SKILL.md
[diff]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/src/diff-analyzer.ts
[search]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/core/src/search.ts
[store]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/dashboard/src/store.ts#L540
[fingerprint]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/core/src/fingerprint.ts
[classifier]: https://github.com/Egonex-AI/Understand-Anything/blob/6df3065f1d8ddc2ce3615314d1d493f36d6b1c80/understand-anything-plugin/packages/core/src/change-classifier.ts
