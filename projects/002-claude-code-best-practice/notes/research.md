# 实现原理与研究记录

[返回项目说明](../README.md)

## 研究问题与范围

本次研究围绕三个问题：仓库提供哪些能力；这些能力由哪些文件与运行机制实现；怎样迁移到真实项目而不混淆提示词、程序控制和验证结果。

上游固定为 `73087da5e272fc197d7f9f29492d153fe1aaaefe`，研究日为 2026-09-18。主要分析配置与脚本，没有尝试复现整个 README 列出的第三方生态。

## 1. 仓库定位

上游 [CLAUDE.md](https://github.com/shanraisshan/claude-code-best-practice/blob/73087da5e272fc197d7f9f29492d153fe1aaaefe/CLAUDE.md) 将仓库定位为 Claude Code 配置最佳实践的参考实现。它提供技能、子代理、命令、Hooks 的具体范例，同时用文档索引整理使用经验与其他项目。

它在系统中的位置可以理解为“开发流程与规范的配置层”。模型不是本仓库训练的；代理循环、上下文装载和工具协议也不是本仓库重新实现的。它通过已有运行环境把任务组织得更明确。

## 2. 四层实现

| 层 | 提供者 | 作用 | 本仓库实例 |
| --- | --- | --- | --- |
| 指令层 | 仓库 Markdown / YAML | 定义目标、步骤、角色、模板 | Command、Agent、Skill、规则 |
| 运行层 | Claude Code | 加载上下文、模型调用、代理管理、工具调度和权限处理 | 消费 `.claude/` 配置 |
| 工具层 | 内置工具 / 外部服务 | 网络请求、文件读写、Shell、浏览器等实际操作 | WebFetch、文件工具、MCP |
| 反馈层 | Hooks / 记忆 / 验证 | 事件通知、信息复用与执行检查 | `hooks.py`、代理记忆文件；检查由项目另行设计 |

普通 Skill 加载操作知识，不应被自动理解为另开一个子代理；有无隔离上下文取决于具体配置与运行环境。Agent 才是此示例中明确的专项上下文边界。

参考：[Claude Code Skills](https://code.claude.com/docs/en/skills)、[子代理](https://code.claude.com/docs/en/sub-agents)。官方文档是动态来源，2026-09-18 查阅；固定仓库证据见 [sources.json](evidence/sources.json)。

## 3. 天气流程：逐文件追踪

### 入口 Command

文件：[`.claude/commands/weather-orchestrator.md`](https://github.com/shanraisshan/claude-code-best-practice/blob/73087da5e272fc197d7f9f29492d153fe1aaaefe/.claude/commands/weather-orchestrator.md)。

- 指定 `model: haiku`，列出 AskUserQuestion、Agent、Skill。
- 先询问温度单位；将偏好交给 `weather-agent`。
- 调用参数还显式指定 `model: haiku`。
- 指令要求未得到数值和单位时停止，不进入输出技能。
- 取数成功后，在当前上下文调用 `weather-svg-creator`。

这里的“顺序”和“失败即停止”主要由自然语言描述。本研究没有发现独立的状态机程序在后台强制运行这一整条流程。

### 专项 Agent

文件：[`.claude/agents/weather-agent.md`](https://github.com/shanraisshan/claude-code-best-practice/blob/73087da5e272fc197d7f9f29492d153fe1aaaefe/.claude/agents/weather-agent.md)。

- 默认模型写 `sonnet`；Command 调用时则写 `haiku`，阅读配置时应区分默认值与调用参数。
- 配置 `maxTurns: 5`、`memory: project`，并在 `skills` 中列出 `weather-fetcher`。
- 正文明确要求调用 `Skill(weather-fetcher)`；要求报告温度和单位，也要求更新历史读数记忆。
- 子代理配置事件 Hook，用于代理执行过程的声音提示。

两处需要运行时核实：第一，字段名为 `allowedTools`，而官方支持字段列出的是 `tools`；不能断言它已成功限制网络工具。第二，正文宣称不写文件，同时又要求更新记忆，这种职责表述需要结合运行环境的记忆机制判断。没有实际运行前，不把配置意图写成确定结果。

### 取数 Skill

文件：[`.claude/skills/weather-fetcher/SKILL.md`](https://github.com/shanraisshan/claude-code-best-practice/blob/73087da5e272fc197d7f9f29492d153fe1aaaefe/.claude/skills/weather-fetcher/SKILL.md)。

- `user-invocable: false`，不作为普通用户菜单中的直接入口。
- `allowed-tools` 中列出 WebFetch。
- API 使用迪拜坐标 `25.2048, 55.2708`，请求 `current=temperature_2m`。
- 单位通过 `temperature_unit=celsius` 或 `fahrenheit` 指定。
- 从响应的 `current.temperature_2m` 和 `current_units.temperature_2m` 提取结果。

技能正文相当于结构化操作说明，HTTP 请求仍由 WebFetch 执行。网页的 `26°C / 78.8°F` 是人工固定样本，没有冒充该接口的实时响应。

### 输出 Skill

文件：[`.claude/skills/weather-svg-creator/SKILL.md`](https://github.com/shanraisshan/claude-code-best-practice/blob/73087da5e272fc197d7f9f29492d153fe1aaaefe/.claude/skills/weather-svg-creator/SKILL.md)。

技能接收上下文中的温度与单位，从 `reference.md` 读取模板，按指令写入 `orchestration-workflow/weather.svg` 和 `orchestration-workflow/output.md`。`examples.md` 提供示例。它体现“入口说明简短、细节资料按需加载”的组织方式。

本地网页另用 JavaScript 生成一张标注教学用途的 SVG，演示产物的概念；它不复刻 Claude Code 执行，也不将文件写到上游预期目录。

## 4. Hooks 的程序路径

源码：[`.claude/hooks/scripts/hooks.py`](https://github.com/shanraisshan/claude-code-best-practice/blob/73087da5e272fc197d7f9f29492d153fe1aaaefe/.claude/hooks/scripts/hooks.py)。

```text
settings.json 注册事件处理命令
  → Python 读取 stdin JSON
  → 根据配置记录日志
  → 查询事件开关
  → 选择事件 / agent 对应音频
  → 调用系统音频能力
  → exit(0)
```

配置优先级为个人 `hooks-config.local.json` 中对应字段 → 共享 `hooks-config.json` → 默认启用。代理事件有独立声音映射；主流程的 Bash 工具输入包含 `git commit` 时选择专用声音。Windows 播放 WAV，macOS 使用 afplay，Linux 查找可用播放器。

错误路径也以状态 0 退出，因此这份实现的主要作用是通知，而非强制门禁。另一个细节是：日志名称为 `.jsonl`，实际写入使用 `indent=2`，单条记录会跨行；下游若要逐行按标准 JSONL 解析，需另行适配。这是静态代码发现，未做多记录消费者集成实验。

## 5. 规则与 MCP

`CLAUDE.md` 提供常驻项目背景；`markdown-docs.md` 使用 `paths: ["**/*.md"]` 将规则与 Markdown 路径关联。模型是否完全遵循仍需检查实际产物。

`.mcp.json` 为三个外部包提供启动配置：Playwright `0.0.70`、Context7 `2.1.8`、DeepWiki `0.0.6`。本仓库负责声明连接方式，具体工具由这些外部服务实现。本次未安装或连接它们。

`.claude/settings.json` 包含宽泛的允许项，例如 `Bash(*)`，同时给部分命令设置询问项，并开启项目 MCP。这说明它也含作者的个人使用取舍，不能把“最佳实践”标题理解为适用于每个项目的默认权限方案。

## 6. 文档漂移与版本边界

| 观察 | 证据 | 可以得出的结论 |
| --- | --- | --- |
| 说明写预加载后直接遵循，代理正文要求显式 Skill 调用 | `orchestration-workflow.md` 与 `weather-agent.md` | 两份材料不一致，按具体文件及实测核对 |
| Agent 使用 `allowedTools`，官方列出 `tools` | 固定代理文件与官方动态文档 | 存在字段兼容性疑点，未验证其权限效果 |
| 代理默认 Sonnet，调用参数 Haiku | Agent 与 Command | 不能仅看代理默认配置认定实际模型 |
| Hook 处理失败仍返回 0 | Python 异常与退出分支 | 不能称为测试失败阻断机制 |
| README 引用大量第三方能力 | 索引与实际目录 | 资料收集与本仓库实现必须区分 |

## 7. 实验记录

### 固定来源与校验

下载选定 17 个文件到被 Git 忽略的临时研究目录。路径、固定版本链接与 SHA-256 保存于 [sources.json](evidence/sources.json)。没有完整克隆仓库，也没有把上游指令安装进当前项目。

### Hooks 隔离实验

- **问题**：普通事件、git commit、代理事件如何选择声音？本地配置是否覆盖共享配置？错误是否阻断？
- **方法**：把固定版本的 hooks.py 复制到系统临时目录，创建测试配置，调用真实函数。主入口测试替换播放器，避免播放声音；进程退出和输出被捕获。
- **结果**：13 项检查通过，其中一项为来源完整性，其余覆盖上述程序行为。详见 [experiments.json](evidence/experiments.json)。
- **限制**：不是 Claude Code 事件集成测试，没有验证系统播放器、真实代理权限或模型行为。
- **复现**：在本子项目执行 `python code/verify-upstream.py --download`；或者把已准备的固定版本目录作为参数传入。

### 原创网页检查

检查默认引导图、缩放与导读入口、六类配置示例、四层机制、三种适配场景，五步成功流程，失败停止、单位变化后的重置和 SVG 下载内容；覆盖桌面、平板、手机、窄屏、哈希刷新、键盘操作与 file 协议。结果见 [browser-qa.json](evidence/browser-qa.json)，截图见 [assets](../assets/README.md)。

第一次检查发现手机宽度下选择框的固有宽度导致横向溢出，已设置选择框宽度与最小宽度并重新验证。网页检查只能证明本研究编写的展示页行为，不覆盖上游模型流程。

## 8. 结论

本次讨论最终将它定位为 **Claude Code 使用指南＋配置示例集**。对我们已有项目规则和 AI 开发实践的情况，直接参考价值不大。核心意义是帮助理解 AI 的工作流程与动作，知道各组件做什么、任务怎么交接、哪些结果需要核实，从而更好使用 AI。这是结合当前需求作出的价值判断，不是跨模型效率测量。

“基于 AI 开发项目的控制流程适配”是一个有用的理解，但这里的控制包含两种不同机制：模型遵循的文本约定，以及程序执行的配置与脚本。落地时应先复用职责划分和高频操作方法，再用真实检查来验证任务是否完成。

适合学习 AI 编程组织方式、建立团队配置、沉淀可复用技能；如需可恢复状态、确定性重试、事务、严格质量门禁，则需项目自身的程序与基础设施补齐，不能仅依赖这些 Markdown 文件。

[返回项目说明](../README.md) · [项目适配指南](adaptation.md)
