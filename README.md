# GitHub 优秀项目研究集

持续记录值得深入研究的 GitHub 开源项目，沉淀原理分析、本地实践、二次开发和 Web 演示。

这里是研究总入口：先浏览下面的有序索引，再进入各子项目查看完整说明、效果截图和研究过程。

## 项目索引

按研究收录顺序排列，编号从 `001` 开始，创建后保持不变。

| 编号 | 源库 | 研究说明 | 能力、场景与使用价值 | 进度 | 在线演示 |
| --- | --- | --- | --- | --- | --- |
| 001 | [Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | [完整研究](projects/001-understand-anything/) | 程序提取结构，模型补充含义，将代码、Wiki、Figma 组织为交互图谱；在 AI 工具中运行分析技能后浏览、查询与导览。适合陌生项目入门、依赖排查和知识交接，为个人研究保留关系与源码线索，并辅助后续图文表达。 | 已验证 | [在线展厅](https://yydshly.github.io/0918_codex_project/001-understand-anything/) |
| 002 | [Claude Code Best Practice](https://github.com/shanraisshan/claude-code-best-practice) | [完整研究](projects/002-claude-code-best-practice/) | Claude Code 使用指南＋配置示例集。对我们当前的直接参考价值不大，核心是指导理解 AI 工作流程与动作，认识各组件分工，更好使用 AI；以引导图、配置示例和教学流程辅助理解。 | 已验证（Hooks 与本地展厅；模型流程未验证） | 未部署 |

## 项目图览

### 001 · Understand-Anything

[![Understand-Anything 能力全景：输入来源、处理分工、四类图谱与使用价值](projects/001-understand-anything/assets/capability-map.png)](https://yydshly.github.io/0918_codex_project/001-understand-anything/overview.html)

核心理解：它把结构提取、语义归纳与图谱浏览组织成流程。程序负责可解析的对象与关系，大模型或人补充含义并核实；已有合规图谱可直接浏览。对我的意义是更快建立项目认识、回查关键源码、沉淀研究与交接材料；需要正式配图时，再将确认后的结论交给制图工具。

图为原创能力总览，非产品截图。结构解析与原版浏览已实测，领域 / Wiki / 设计另用人工样本验证渲染；完整 LLM 分析未验证。[在线总览](https://yydshly.github.io/0918_codex_project/001-understand-anything/overview.html) · [五工具对比](https://yydshly.github.io/0918_codex_project/001-understand-anything/#compare) · [使用说明](projects/001-understand-anything/README.md#如何使用) · [高清图](projects/001-understand-anything/assets/capability-map.png)。

### 002 · Claude Code Best Practice

[![Claude Code 使用指南＋配置示例集：组成、场景、对我们的意义与边界](projects/002-claude-code-best-practice/assets/understanding-map.png)](projects/002-claude-code-best-practice/README.md#一张图理解定位与价值)

核心理解：这是“Claude Code 使用指南＋配置示例集”，主要供学习用法、参考写法和按需复用脚本。对我们当前的直接参考价值不大；核心是帮助理解 AI 工作流程与动作，更好使用 AI。我们已有项目规则与 AI 开发能力，将它作为学习参考库即可，无需整库集成。图为原创概念总览，非产品截图；天气流程为固定样本模拟，原版代理端到端运行未验证。[高清总览](projects/002-claude-code-best-practice/assets/understanding-map.png) · [Web 展厅](projects/002-claude-code-best-practice/demo/index.html) · [实现分析](projects/002-claude-code-best-practice/notes/research.md) · [项目适配指南](projects/002-claude-code-best-practice/notes/adaptation.md)。

## 仓库导航

| 入口 | 内容 |
| --- | --- |
| [研究项目](projects/) | 按编号组织的独立子项目 |
| [子项目模板](templates/project/) | 项目介绍、图片、研究记录与演示说明 |
| [收录与编号约定](docs/CONVENTIONS.md) | 新增项目步骤、目录规范和索引维护 |
| [Web 部署约定](docs/DEPLOYMENT.md) | 多个演示的路径规划和部署记录要求 |

## 新增研究项目

1. 查看索引和 Git 历史，复制 `templates/project/` 到下一个未使用编号的子目录；当前下一编号为 `003`。
2. 填写子项目 README，记录上游仓库、研究目标及版本信息。
3. 添加实际截图和研究记录，再更新本页索引与图览。
4. 有可运行的演示后，在子项目中记录启动方法和实际部署地址。

详细操作见[收录与编号约定](docs/CONVENTIONS.md)。当前已收录 2 个研究项目，1 个 Web 演示已上线，002 提供本地展厅并已接入发布清单；[打开演示总入口](https://yydshly.github.io/0918_codex_project/)。

## 来源与许可

每个研究项目单独标注上游来源、版本和许可证。引用或修改第三方代码时保留其许可与版权声明；本仓库尚未为原创内容指定统一开源许可证。
