# 我们对 baoyu-design 的理解

研究日期：2026-09-18。对应固定版本 `026d4ea012bdd5cada72ac8cc13f21ba4edf2245`。本文整理讨论中的共同理解，区分上游源码说明、我们的解释和实际验证。市场产品仅作定位参照，不代表对照实测。

## 完整引导图

[![baoyu-design 完整理解引导图：定位、产品目标、统一约束、执行机制、53 份说明与研究意义](../assets/understanding-map.png)](../assets/understanding-map.png)

[高清 PNG](../assets/understanding-map.png) · [可缩放 SVG](../assets/understanding-map.svg)。原创研究图，非上游产品截图；图文依据同一固定版本。

## 1. 本质：以 Skill 为入口的设计工作流与工具包

它依赖已有 AI 助手理解需求和推进任务。Skill 规定如何做，模板提供可复用代码，脚本完成编译、导入、检查与导出；库没有训练一个新的设计模型，也没有完整独立的设计工作台。

库内有页面模板、组件和生成的预览，但它们服务于产出。我们的“拾页”阅读工具和研究网页是本项目制作的演示，不是上游内置产品或操作后台。打开这些成品不会再次运行 AI。

“按技能描述驱动”意味着模型阅读指令并选择下一步，不是 Markdown 自己执行。文件名 system-prompt.md 不会使其成为平台最高优先级的系统指令；agents 目录同时包含脚本和检查说明，不代表一组自主运行的智能体。

## 2. 与以前研究的项目和同类产品的区别

| 对象 | 定位 | 与本项目的区别 |
| --- | --- | --- |
| [003 · Frontend Design Toolkit](../../003-frontend-design-toolkit/notes/research.md) | 资源导航与组合建议 | 所研究版本只有 README；baoyu 打包了实际流程、模板与脚本 |
| 003 中研究的 frontend-design Skill | 字体、配色、布局、动效等前端设计指导 | baoyu 内部也有 frontend-design.md，外层再增加资料复用、任务组织与交付流程 |
| [004 · ASu-skills](../../004-asu-skills/README.md) | 求职领域的 Skill、模板和工具 | 组织机制相似，应用领域不同 |
| [002 · Claude Code Best Practice](../../002-claude-code-best-practice/README.md) | 通用开发实践与配置 | baoyu 聚焦设计成果交付 |
| [006 · anbeime/skill](../../006-anbeime-skill/README.md) | 技能收集、分类和导航 | baoyu 围绕设计任务组织具体工作流 |
| [Claude Design](https://claude.com/product/design) | 有可视化编辑及产品集成的官方设计能力 | 部分目标相近；baoyu 是独立社区工具包，不能推定完整功能等价 |

同类库的定位参考（2026-09-18 核对官方说明，未同题实测）：

- [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)：侧重视觉方向与设计判断。
- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)：侧重可检索风格、配色、字体与设计规则。
- [Impeccable](https://github.com/pbakaus/impeccable)：侧重设计审查、打磨、浏览器迭代及规则检测。
- [Figma Make](https://www.figma.com/make/)：从设计上下文生成可交互原型，并在可视化界面调整。
- [v0](https://v0.app/solutions/ai-website-builder)：生成、修改和部署网站。
- [Lovable](https://docs.lovable.dev/introduction/welcome)：覆盖前端、后端、数据库等的应用搭建平台。

## 3. 支持哪些产品目标

源码有 13 类任务入口。它按成果形式划分，不按行业划分。同一个电商产品可同时需要商品页原型、后台、设计系统、介绍 PPT 和营销邮件。

| 任务 | 主要 Skill | 配套模板 | 本次验证范围 |
| --- | --- | --- | --- |
| 幻灯片 | `make-a-deck` | deck-stage.js | 实测四页 HTML 幻灯片、翻页、三组分步动画和 PPTX 结构；未做桌面 PowerPoint 验证。 |
| 移动 App 设计 | `mobile-prototype`、`hi-fi-design`、`interactive-prototype` | ios-frame.jsx、android-frame.jsx、ios-shell.js | 实测拾页响应式手机布局；未实测专用移动外壳和原生打包。 |
| 线框图 | `wireframe` | design-canvas.jsx | 拾页包含线框表现；未实测上游多画板组件的全部行为。 |
| 文档 | `make-a-doc` | doc-page.js | 只读源码，未实测此专项路径。 |
| 动画 | `animated-video`、`exportable-video` | animations-v3.jsx、tweaks-panel.jsx | 未实测时间轴动画和 MP4 导出；幻灯片分步动画是另一条已测路径。 |
| UI 界面 | `hi-fi-design`、`interactive-prototype` | design-canvas.jsx、image-slot.js | 实测拾页三种布局、搜索收藏、表单校验、阅读状态和本地保存。 |
| 简历 | `make-a-doc` | doc-page.js | 只读源码，未实测此专项路径。 |
| 3D 对象 | `3d-object` | three-d-stage.js | 只读源码，未实测此专项路径。 |
| 研究报告 | `web-research` | data-overlay.js | 本项目有研究文档，但未实测此专项模板的完整流程。 |
| HTML 邮件 | `html-email` | 无指定模板 | 未做邮件客户端兼容性验证。 |
| 配色与字体系统 | `create-design-system` | design-canvas.jsx | 实测 15 个变量、2 个组件的编译、检查、导入和独立预览；不是所有规范的完整审计。 |
| 图表 | `data-visualization` | chart-stage.js | 只读源码，未实测此专项路径。 |
| 宣传单 | `flier` | doc-page.js | 只读源码，未实测此专项路径。 |

[来源：project-types.json](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/project-types.json)。这是任务映射，不是所有能力列表；设计系统导入和导出等横向能力由入口另外选择。

业务目标边界：可交互原型不等于生产业务系统。账户、数据库、支付、库存、安全和运维需要实际开发与接入。某条 Skill 入口存在，也不代表当前环境已经配置了它需要的外部能力。

## 4. 内部架构与执行过程

| 层次 | 文件 / 目录 | 作用 |
| --- | --- | --- |
| 总入口 | SKILL.md | 指示 AI 按需求选择说明 |
| 通用流程 | system-prompt.md | 需求、资料、制作、验证与交付规则 |
| 任务映射 | project-types.json | 13 类目标与 Skill / 模板的对应关系 |
| 环境适配 | references/ | 映射不同助手的询问、预览、截图与检查工具 |
| 专项知识 | built-in-skills/ | 按需读取的具体任务指南 |
| 起步代码 | starter-components/ | 设备外框、画布、文档页面、幻灯片与动画舞台 |
| 工具执行 | agents/ | 编译、检查、导入、记录资产和格式转换 |

执行顺序：用户需求 → 读取入口与相关 Skill → 加载项目和品牌资料 → AI 编写代码并调用工具 → 浏览器反馈 → 修改 → 记录与交付。该顺序由 AI 按文字指南组织，不是一套固定的自动工作流引擎。

例如“按公司规范做手机阅读原型，再做介绍 PPT”：

1. use-design-system 导入已有规范和组件，读取生成的约束说明。
2. mobile-prototype + hi-fi-design + interactive-prototype 共同约束手机端、视觉和交互。
3. AI 写页面，使用浏览器检查状态、布局与报错。
4. make-a-deck 指导制作 HTML 幻灯片，复用 deck-stage。
5. export-as-pptx-editable 指示调用实际导出程序；之后检查产物。

不是每份 Skill 都配独立脚本。比如 interactive-prototype 主要用短文本要求交互状态、表单校验等；设计系统和 PPTX 路径则包含较多实际工具代码。

### 项目规范怎样持续约束 AI

设计系统编译器把组件与变量整理成浏览器可用的包和清单。导入器将其复制到项目的 _ds/<slug>/，并生成 _ds_prompt.md，包含指南、组件使用方法、接入方式和变量清单。

_d_meta.json 保存项目绑定与资产信息。继续项目时，AI 读取这些文件，恢复已有约束。这个机制是“规范变成具体上下文＋实际组件复用”，比每次重复泛泛的风格要求更可执行。[源码说明](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/use-design-system.md)。

## 5. 53 份技能与辅助说明怎样划分

固定版本 built-in-skills 下共有 53 份 Markdown。以下 8 组是我们的阅读归纳，非上游原始分组；文件涵盖专项指导、协议、工具接入和兼容入口，不等于 53 个独立功能或智能体。

### 需求、视觉与交互（10 份）

从需求选择到界面表现；已有品牌优先，无品牌时再探索审美方向。

| 文件 | 职责 |
| --- | --- |
| [ask-the-user](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/ask-the-user.md) | 补充关键需求 |
| [options-stack](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/options-stack.md) | 组织可比较方案 |
| [frontend-design](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/frontend-design.md) | 无既有品牌时确定审美方向 |
| [hi-fi-design](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/hi-fi-design.md) | 高保真设计流程 |
| [interactive-prototype](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/interactive-prototype.md) | 交互状态、校验与切换 |
| [mobile-prototype](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/mobile-prototype.md) | 移动端原型 |
| [wireframe](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/wireframe.md) | 低保真探索 |
| [website-landing-page](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/website-landing-page.md) | 网站与落地页构图 |
| [design-feedback](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/design-feedback.md) | 设计反馈与审查 |
| [something-cool](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/something-cool.md) | 仅在用户明确要求时探索惊喜作品 |

### 设计系统（5 份）

区分创建规范与消费规范，再通过工具编译、导入和预览。

| 文件 | 职责 |
| --- | --- |
| [design-system-authoring-guide](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/design-system-authoring-guide.md) | 设计系统编写总流程 |
| [create-design-system](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/create-design-system.md) | 创建品牌与 UI 规范 |
| [design-components](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/design-components.md) | Design Components 编写约定 |
| [design-system-preview](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/design-system-preview.md) | 生成独立预览页 |
| [use-design-system](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/use-design-system.md) | 在项目中绑定并复用设计系统 |

### 资料导入（4 份）

从实际资料取得设计上下文。

| 文件 | 职责 |
| --- | --- |
| [import-from-figma](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/import-from-figma.md) | 本地 .fig 资料解析与导入 |
| [import-from-github](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/import-from-github.md) | 按需读取仓库设计资料 |
| [import-from-html](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/import-from-html.md) | 从已有页面提取样式和组件参考 |
| [read-pdf](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/read-pdf.md) | 读取 PDF 内容 |

### 图像、动画与三维（6 份）

专项制作说明；图片、声音等能力依赖可用后端。

| 文件 | 职责 |
| --- | --- |
| [3d-object](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/3d-object.md) | 三维对象与查看器 |
| [animated-video](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/animated-video.md) | 时间轴动画制作 |
| [generate-images](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/generate-images.md) | 选择可用图像后端并生成素材 |
| [gemini-image](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/gemini-image.md) | Gemini 图像工具专项说明 |
| [watercolor-illustration](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/watercolor-illustration.md) | 水彩插画方向 |
| [sound-effects](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/sound-effects.md) | 音效生成接入 |

### 文档、演示与传播（7 份）

针对不同载体的内容与排版。

| 文件 | 职责 |
| --- | --- |
| [make-a-deck](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/make-a-deck.md) | HTML 幻灯片 |
| [make-a-doc](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/make-a-doc.md) | 文档与简历 |
| [html-email](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/html-email.md) | 邮件客户端布局要求 |
| [flier](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/flier.md) | 宣传单 |
| [trifold-brochure](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/trifold-brochure.md) | 三折宣传册 |
| [social-media-content](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/social-media-content.md) | 社交平台内容 |
| [speaker-notes](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/speaker-notes.md) | 演讲者备注 |

### 研究、分析与可视化（5 份）

将来源、数据和分析组织成可读成果。

| 文件 | 职责 |
| --- | --- |
| [web-research](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/web-research.md) | 带来源的当前资料研究 |
| [data-visualization](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/data-visualization.md) | 图表与图解 |
| [maps-geography](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/maps-geography.md) | 地理可视化 |
| [data-science](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/data-science.md) | 数据分析相关指导 |
| [experiment-workflow](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/experiment-workflow.md) | 实验工作流 |

### 导出与交接（11 份）

目标格式有各自的输入约定；部分入口为兼容说明，不重复算能力。

| 文件 | 职责 |
| --- | --- |
| [export-as-pptx-editable](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/export-as-pptx-editable.md) | 可编辑 PPTX 导出 |
| [export-as-pptx-screenshots](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/export-as-pptx-screenshots.md) | 截图式 PPTX 导出 |
| [export-pptx-editable](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/export-pptx-editable.md) | PPTX 可编辑导出的另一说明入口 |
| [export-pptx-screenshots](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/export-pptx-screenshots.md) | PPTX 截图导出的另一说明入口 |
| [export-as-video](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/export-as-video.md) | 视频文件导出 |
| [exportable-video](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/exportable-video.md) | 动画可导出的接口约定 |
| [save-as-pdf](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/save-as-pdf.md) | PDF 打印导出 |
| [save-as-standalone-html](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/save-as-standalone-html.md) | 自包含 HTML |
| [send-to-canva](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/send-to-canva.md) | Canva 交接指导 |
| [send-to-figma](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/send-to-figma.md) | Figma 交接指导 |
| [handoff-to-claude-code](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/handoff-to-claude-code.md) | 开发交接资料 |

### 调节控件与环境接入（5 份）

部分内容带宿主假设，需按实际环境适配。

| 文件 | 职责 |
| --- | --- |
| [make-tweakable](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/make-tweakable.md) | 添加页面内调节控件 |
| [tweaks-protocol](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/tweaks-protocol.md) | 调节面板消息与持久化协议 |
| [low-level-tweaks-api](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/low-level-tweaks-api.md) | 调节面板与聊天交互接口 |
| [claude-api-in-prototypes](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/claude-api-in-prototypes.md) | 原型中 Claude API 的宿主接口 |
| [google-slides-safe](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/built-in-skills/google-slides-safe.md) | Google Slides 兼容性指导 |

## 6. 从哪些角度约束 AI

| 角度 | 规则重点 |
| --- | --- |
| 需求与范围 | 明确目的、受众、精细程度和方案数量。 |
| 设计依据 | 先读实际品牌、组件与既有界面资料。 |
| 视觉表达 | 有意识地选择字体、配色、空间和动效。 |
| 一致性 | 绑定设计系统，复用组件和样式变量。 |
| 内容真实性 | 不为填充版面编造数据，不把参考品牌当成用户事实。 |
| 交互完整性 | 原型包含操作反馈、状态切换和表单校验。 |
| 实现与交付 | 组织文件和素材，遵守模板与导出输入约定。 |
| 验证与迭代 | 预览、检查、修正，保留版本与实际审阅状态。 |

这些说明不是无条件强制执行的程序；用户需求和宿主更高优先级指令仍然适用。例如已有明确范围时，不应机械重复询问；局部修改也不应借机重做整个产品。

### 从通用到专项，如何保持统一

我们的新理解是：这是一套从通用规则到专项细节的分层指南，同时支持横向组合。通用流程并不替代专项技能，专项技能也不是彼此隔离的独立应用。

| 层次 | 统一或细化的内容 | 实现依据 |
| --- | --- | --- |
| 共同工作流程 | 理解需求、读取资料、制作、检查、修正和交付 | system-prompt.md |
| 项目设计规范 | 品牌色、字体、组件、变量及使用指南 | _ds_prompt.md 与 _d_meta.json 的项目绑定 |
| 目标专项规则 | 手机交互、PPT 画布、邮件兼容等不同要求 | 按需组合 built-in-skills 中的说明 |
| 实际代码与模板 | 让可复用样式和行为落实到产物 | 组件、CSS 变量、起步模板与脚本 |
| 检查与反馈 | 验证当前环境中的实际输出 | 浏览器和专项检查工具 |

同一品牌制作手机原型、产品 PPT 和营销邮件时，可以共享颜色、字体与内容风格；手机另外处理触控和状态，PPT 处理画布和翻页，邮件采用客户端支持的布局方式。统一的是工作方式与品牌依据，并非让所有成果有一样的结构。React 组件不能不加改造就用于邮件；代码复用以目标载体允许为前提。

入口根据目标指示 AI 加载说明，并非自动执行的规则引擎。大量规范是自然语言，没有全局强制冲突消解器。模型是否遵循、代码是否真实复用、检查是否充分，都需用具体结果验证。用户要求和宿主更高优先级指令持续适用。

一个手机原型可以同时组合 mobile-prototype、hi-fi-design、interactive-prototype 和 use-design-system：分别约束移动体验、视觉制作、交互行为与项目规范。不是从通用走到某个叶子节点后就只执行单一 Skill，也不是每次执行全部 53 份说明。

### 三类约束的区别

- 文字约束：要求先看资料、统一品牌、检查布局；依赖模型实际遵循。
- 代码机制：组件复用、CSS 变量、编译、文件复制、导出；直接决定相应运行结果。
- 验证反馈：浏览器操作、报错、截图及结构检查；只能支持已检查范围内的结论。

“必须保持一致”是文字要求；页面引用同一个按钮组件和颜色变量是实现机制；真实操作与渲染检查是证据。三者不能相互替代。

## 7. 为什么覆盖广，以及怎样评估价值

覆盖广的一个重要原因是：多种视觉成果可以共享 HTML / CSS、浏览器渲染和可复用模板，再配合专项引擎或转换器。幻灯片、纸张文档、网页原型有不同排版规则，但不必各自从零实现完整编辑器。

我们的研究判断：它的增量价值更可能来自具体设计上下文、稳定组件和重复工作的脚本化，而不只是通用审美提示。值得借鉴：

1. 按任务分层加载：入口简短，具体任务才读取相关指南。
2. 项目规范持久化：保存真实品牌、组件约束与资产状态，续做时恢复。
3. 把可重复工作交给工具：编译、转换、结构检查用代码；设计判断与取舍保留人工和 AI 反馈。
4. 以证据交付：能预览、能操作、能导出，并记录尚未验证的部分。

局限包括：技能描述可能被忽略，长任务会丢失上下文；部分模板依赖宿主协议；导出有输入约定和格式兼容边界；外部服务需要接入。数量多和任务范围广，不证明每条路径成熟，也不证明相同模型在加入 Skill 后必然更好。

若未来比较收益，建议固定模型、需求、素材、工具与预算，对照“无额外 Skill / frontend-design / baoyu-design”，评估任务完成度、组件一致性、错误数、修改成本与视觉评审。本轮未执行此对照，不给出效果排名。

## 8. 我们已经验证了什么

已实测：拾页三种布局与前端交互、Reader Kit 编译/检查/导入/预览、原版幻灯片舞台、4 页可编辑 PPTX 的对象和动画 XML。

未实测：真实 Figma 文件转换、外部平台交接、图像和声音生成、视频、3D 等专项路径；未在桌面 PowerPoint 检查最终播放，也没有证明审美和效率提升。

[完整实测研究](research.md) · [上游工具记录](evidence/upstream-tools.json) · [原型浏览器记录](evidence/browser.json) · [运行说明](../demo/README.md)

网页中的任务切换与技能目录是研究导览，不会真的启动 AI 生成。状态仍为本地已验证、未部署。

