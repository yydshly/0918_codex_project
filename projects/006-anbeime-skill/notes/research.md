# 研究记录

## 研究问题与范围

本轮回答：这个仓库整体是什么、覆盖哪些任务、根 `SKILL.md` 与子技能的关系、文件是否支持宣传中的能力，以及对现有开源研究工作有什么价值。

2026-09-18 在 Windows / PowerShell、Python 3.10.11 环境下，通过 GitHub API 获取完整文件树，按固定 commit 读取技能文件及代表源码。仅执行本研究的资料读取和盘点程序，没有安装或运行上游代码、调用付费模型、发送消息或操作电商账号。

固定版本：[f21302e204d513d09763ebb291704eb9a2aaa34f](https://github.com/anbeime/skill/commit/f21302e204d513d09763ebb291704eb9a2aaa34f)。来源与指纹见 [sources.json](evidence/sources.json)，本地复核结果见 [checks.json](evidence/checks.json)。

## 分析结论的四种依据

价值判断：对我们当前的研究与开发而言，主要用途是 Skill 收集和导航，直接参考价值较低。保留检索备查即可，不作为当前重点研究或整库集成对象。关联产品的页面数量和宣传范围没有形成明确的复用证据；其整体产品质量未全面评估。

| 依据 | 能说明什么 | 不能说明什么 |
| --- | --- | --- |
| 文档声明 | 作者期望的任务、步骤和产出 | 对应程序已齐全、效果达标 |
| 文件树核对 | 特定版本有没有指定入口、脚本或资产 | 文件存在就能运行 |
| 源码观察 | 已读取的代码实际调用什么、如何组织流程 | 外部服务可用、业务成功 |
| 运行验证 | 在特定环境中执行得到实际输出 | 本轮未进行上游运行验证 |

## 目录与统计口径

按文件名**精确等于** `SKILL.md` 递归盘点；不把 `._SKILL.md` 资源旁文件算入。文件树返回未截断。

| 统计范围 | 数量 | 解释 |
| --- | --- | --- |
| 全仓 `SKILL.md` | 84 | 文件数量，不是独立能力数 |
| `skills/` 所有 `SKILL.md` | 77 | 含 1 份模板 |
| `skills/` 排除 `_template` | 76 | 含子技能、嵌套与重复入口 |
| 非模板技能涉及的 `skills/` 一级目录 | 65 | 一个目录可能包含多个技能 |
| 76 份技能文件的不同 `name` | 73 | 只按名称去重，未证明同名文件等价 |
| 根入口 | 1 | `xiaoyue-companion` |
| `projects/` 中的入口 | 2 | 伴侣相关实验 |
| `antinet-agentteams/skills/` 中的入口 | 4 | 文档解析、卡片、溯源与扫描 |

`article-illustrator`、`infinitetalk`、`x-article-publisher` 在 `skills/` 中各出现两次；根伴侣与 `projects/companion-simple/` 也使用同一个名称。只按目录数、文件数或技能名统计，会得到不同结果。

上游首页声明 63 个本地技能、245 个总技能；`data/local_skills.json` 的元数据声明 66 个，而其中核心/子技能/内置项分别为 26/30/6，合计并非 66。`data/skills.json` 声明 182 个外部条目，更新时间为 2026-02-02；`SKILL_SOURCES.json` 另有 3,938 个来源计数。这些字段代表不同时间、不同对象，不能相加当作当前可运行能力数。

依据：[本地元数据](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/data/local_skills.json)、[外部技能数据](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/data/skills.json)、[来源聚合](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/SKILL_SOURCES.json)。3,938 是文件声明值，本轮未逐项审查所有外部来源，也未将它视为全局去重结果。

## 关键工作链路

### 技能商店

`main.py` 接收更新、守护、统计和导出参数；`scheduler.py` 组织抓取、检查字段、比较变化、落盘与可选 API 同步；`crawler.py` 从上游 Markdown 清单解析名称、描述、链接、分类；`data_manager.py` 保存 JSON 和导出 CSV。

另一条链路是 GitHub Actions 调用 `scripts/sync_skills.py`，从多个上游 README 提取来源并更新 `SKILL_SOURCES.json` 与 README 自动区块。该工作流配置了每日计划；本轮未检查每次运行的执行结果。自动更新的是目录数据，不意味着每个本地技能代码和依赖同步升级。

依据：[main.py](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/main.py)、[scheduler.py](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/scheduler.py)、[同步工作流](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/.github/workflows/sync-skills.yml)。

### 具体 Skill

一般由技能文件描述触发条件、输入、处理步骤与产物。宿主模型理解并执行这些规则，真正的读写、媒体处理或平台操作由脚本和外部工具完成。部分目录有完整的参考与辅助文件，部分只有工作说明；因此应检查技能使用到的具体路径。

`tools/skill_validator/validator.py` 主要核对元数据、名称格式、内容长度和目录结构。其批量入口对每个一级目录寻找一个技能根，支持同名嵌套和一级子目录回退，并非对所有深层子技能逐一递归验证。即使格式通过，也没有证明外部 API、脚本和产出质量通过。

依据：[验证器源码](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/tools/skill_validator/validator.py)。

### 根伴侣技能

`SKILL.md` 指向 `scripts/xiaoyue-chat.js`；脚本将场景提示与一条用户消息发给智谱接口，输出回复。消息数组只有系统提示与当前消息，未实现历史对话存储。静态图片与消息发送由 OpenClaw 流程另行处理。这一结论仅针对根入口，不覆盖其他伴侣实验目录。

依据：[根技能](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/SKILL.md)、[实际对话脚本](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/scripts/xiaoyue-chat.js)。

## 能力声明与实际文件的差距

| 对象 | 发现 | 研究判断 |
| --- | --- | --- |
| Archify | 目录只有 `SKILL.md`，文档要求的 `bin/archify.mjs`、schema、模板等未随该目录提供 | 可参考制图工作流；不能把本仓库这份副本当作完整渲染工具 |
| 电商全链路 | 目录只有嵌套的 `SKILL.md`；示例调用的本地 `main.py` 不存在 | 所列选品、采集、上架、推广和代发为目标流程；根商店的 `main.py` 不能代替它 |
| Ontoly | 目录中有说明与元数据，技能要求调用 `ontoly build .` 和相关图谱工具 | 依赖外部 Ontoly CLI/MCP；这里没有提供图谱引擎 |
| `qwen3-tts-local` | 名称带 Qwen3，实际脚本导入 `edge_tts` 并调用 `Communicate.save`；文档称完全离线 | 实际为 Edge-TTS 包装；官方 Edge-TTS 使用在线服务，“无需 API Key”不等于离线 |
| `antinet-doc-parse` | 包装脚本计算仓库根，再从 `core` 导入 `runtime`；完整树中的运行时实际位于 `antinet-agentteams/core/runtime.py` | 独立拷贝目录存在路径依赖缺口，需要完整运行环境或改路径；未试运行 |
| `agent-team` | 目录提供角色注册表、协作模板及说明，没有独立执行脚本 | 可作为分工方法；不能据此证明独立并发实例、共享数据库和持久记忆已建立 |

固定版本来源：[Archify](https://github.com/anbeime/skill/tree/f21302e204d513d09763ebb291704eb9a2aaa34f/skills/archify)、[电商全链路](https://github.com/anbeime/skill/tree/f21302e204d513d09763ebb291704eb9a2aaa34f/skills/ecommerce-full-pipeline)、[Ontoly](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/skills/ontoly-software-graph/SKILL.md)、[TTS 实现](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/skills/qwen3-tts-local/qwen3-tts-local/scripts/tts_generator.py)、[文档解析包装脚本](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/skills/antinet-doc-parse/scripts/run_doc_parse.py)、[团队目录](https://github.com/anbeime/skill/tree/f21302e204d513d09763ebb291704eb9a2aaa34f/skills/agent-team)。Edge-TTS 的联网性质另据[官方说明](https://github.com/rany2/edge-tts#readme)，访问于 2026-09-18。

文件数只用于发现缺口。只有说明的技能也可能有效指导宿主；带脚本的技能也可能有缺失依赖、占位实现或错误。二者均需结合目标任务判断。

## 复核与后续实验

### 网页补充与本地展厅

同日补充读取 `public/` 下 7 份页面源码，整理产品入口、技能目录、应用介绍、预设聊天样例与外部站群的关系，见[网页关系说明](web-landscape.md)。来源校验范围扩展为 111 个文件，技能文件计数保持不变。

本项目原创网页已完成七章节导航（含可缩放能力总览图）、19 类能力搜索、84 份文件筛选、三种使用路径切换；桌面及手机布局、键盘操作、深链接刷新、浏览器返回和直接打开本地 HTML 已检查。六项目临时索引构建保留既有展厅及真实暂存区。记录见[浏览器检查](evidence/browser-qa.json)、[集成检查](evidence/integration.json)、[构建页面检查](evidence/browser-built-qa.json)。已查看首页、关联网页与手机截图；这些验证针对研究网页，未执行上游技能，公网未部署。

### 资料复核方法

1. 用[盘点脚本](../code/inspect_sources.py)读取固定版本完整树，核对文件路径及计数；记录返回树是否截断。
2. 按固定 commit 下载 `SKILL.md`，保存 SHA-256 和 Git blob 标识；检查文件内容与树中的 blob 哈希是否一致。
3. 对关键结论读取具体源码，与相同版本的文件树交叉检查。
4. 校验本地文档链接、根索引编号和清单覆盖，结果见 [checks.json](evidence/checks.json)。

未来实际运行时，优先选择输入和输出明确的单项能力，例如 JSON 转 PPTX。记录完整依赖、真实样例与产物验收后，再修改验证状态。目录齐全、格式检查通过以及研究文档完成，都不直接升级为“上游已验证”。
