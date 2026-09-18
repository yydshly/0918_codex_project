# 能力分类与作用

研究版本：`f21302e204d513d09763ebb291704eb9a2aaa34f`，检查日期：2026-09-18。

表中“能力”是对技能目标与工作流的归纳；“条件与边界”说明它依赖什么。除明确标注源码观察的条目外，不把文档声明当作已实现或已验证效果。所有本地技能入口的固定链接可在[完整清单](inventory.md)按名称查找。

## 仓库级能力

| 部分 | 输入与作用 | 输出 | 条件与边界 |
| --- | --- | --- | --- |
| 目录抓取 | 从上游 README 提取技能链接和描述 | 分类元数据、JSON、CSV | `main.py`、`crawler.py`、`data_manager.py`；目录抓取不安装技能 |
| 定时同步 | 周期读取外部来源 | 更新清单、README 聚合段 | 本地 `scheduler.py` 与 Actions 的 `scripts/sync_skills.py` 是两条更新路径；定义计划不等于每次均成功 |
| 技能格式检查 | 读取 `SKILL.md`、解析字段和目录结构 | 错误、警告、属性或提示词输出 | `tools/skill_validator/`；检查格式，不验证业务效果或外部工具可用性 |
| 商店展示 | 展示目录数据与技能入口 | 浏览、筛选、定位入口 | 有 `public/` 页面；本轮未运行或验证其线上服务 |
| 根伴侣技能 | 用户消息与场景标识 | 简短回复，可选静态图片 | 智谱 API、Node.js；发送依赖 OpenClaw 渠道配置；该脚本未存储对话历史 |

依据：[主程序](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/main.py)、[抓取器](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/crawler.py)、[同步程序](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/scripts/sync_skills.py)、[格式检查器](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/tools/skill_validator/validator.py)、[伴侣脚本](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/scripts/xiaoyue-chat.js)。

## 具体技能覆盖的任务

以下按使用场景重新归类，属于本研究的分类方式，非上游官方目录计数。

| 场景 | 代表技能 | 解决什么问题／期望产物 | 条件与边界 |
| --- | --- | --- | --- |
| 资料研究与写作 | `content-research-writer`、`content-creation-publisher` | 资料整理、提纲、文章、引用与排版 | 宿主模型和真实资料；前者只有技能说明，后者还组织子技能 |
| 网页采集与格式化 | `baoyu-url-to-markdown`、`baoyu-format-markdown` | 网页转换为 Markdown、整理文章格式 | 网页访问、浏览器或相应脚本；登录页面依赖可用会话 |
| 内容发布 | `baoyu-post-to-wechat`、`baoyu-post-to-x`、`x-article-publisher`、`wechatsync-publisher` | 把稿件送入指定平台编辑或发布流程 | 账号、API 或浏览器集成；生成稿件不等于发布成功 |
| 选题与社媒运营 | `intelligent-content-system`、`wechat-hotspot-publisher`、`xiaohongshu-makeup`、`moltbook` | 热点选题、平台化文案、社区操作 | 外部数据与平台服务；营销效果未经本轮验证 |
| 图片与视觉提示词 | `article-illustrator`、`atutun-xhs-cover`、`gpt-image-2-prompt-engine`、`icon-generator`、`pop-up-book-illustration` | 配图规划、封面、图标、结构化图像提示词 | 生图工具由宿主或外部服务提供；写出提示词不等于已生成图片 |
| 视频文案与分镜 | `viral-video-copywriting`、`historical-interview-scripts`、`historical-science-video-prod`、`dream-video-prompt-generator` | 钩子、脚本、镜头安排、视频生成提示词 | 主要是创作方法；成片还需素材、语音与合成工具 |
| 视频制作与二创 | `video-creation-suite`、`video-creation-collaborator`、`video-creation-pro`、`video-recreation`、`three-body-video-creator` | 协调文案、画面、配音、字幕与视频合成 | 各套件依赖不同；例如 `video-creation-pro` 指定 COZE API，不能当作离线通用剪辑器 |
| 媒体提取与处理 | `video-frame-extractor`、`video-transcript-downloader`、`media-processor`、`remotion-video-enhancer` | 抽帧、字幕文本、转换压缩、转场设计 | 下载工具、视觉模型、FFmpeg 等按技能而异；部分仅定义动画工作方法 |
| 语音与音频 | `qwen3-asr-assistant`、`qwen3-tts-local`、`tts-voice-synthesis`、`bedtime-story` | 录音转写、文本配音、音色处理、故事朗读 | 模型或在线语音服务；本地脚本运行不等于本地模型推理；Edge-TTS 需要在线服务 |
| 数字人 | `infinitetalk`、`infinitetalk-shopping-avatar`、`digital-avatar-shopping-video`、`agentkit-multimedia-shopping` | 人像与音频驱动的口播流程、角色和分镜设计 | 需相应模型、运行资源或 API；其中有些主要产出提示词 |
| 电商与营销 | `ecommerce-full-pipeline`、`ecommerce-copywriter`、`ecommerce-video-marketing`、`product-marketing-copywriter`、`product-video-creator`、`pet-commerce-creator` | 商品卖点、推广脚本、视频方案，或选品到代发的流程描述 | “全链路”目录缺少所述程序；文档区分模板导出与业务操作，不应把上架模板视为成功上架 |
| 演示与数据表达 | `ppt-generator`、`pptx-generator`、`nanobanana-ppt-visualizer`、`ppt-roadshow-generator`、`data-storytelling` | PPTX、演示配图、路演视频和数据叙事 | `pptx-generator` 有构建与校验脚本；其他流程可能依赖生图、语音或视频服务 |
| 文档、法律与论文 | `pdf-processing-pro`、`contract-review`、`law-to-markdown`、`paper-analysis-assistant` | PDF 提取、合同批注、结构化法规、论文阅读材料 | 解析/OCR/模型工具与原始文档；专业结论及数字须回查原文，未进行效果测试 |
| 知识管理与证据 | `obsidian-skills-integrated` 及其 3 个子技能、`antinet-*` | Obsidian 笔记/画布/数据库格式，文档解析、四色卡片、溯源和扫描流程 | Obsidian 格式与 AgentTeams 运行环境不同；Antinet 的独立目录脚本依赖路径需另查 |
| 软件理解与制图 | `ontoly-software-graph`、`archify` | 图谱查询、依赖和影响分析，架构/流程/时序等图 | Ontoly 需要外部 CLI/MCP；Archify 在该快照仅有说明，缺失所述渲染程序 |
| 前端与浏览器工具 | `frontend-design`、`web-design-analyzer`、`web-to-app`、`chrome-automation` | 界面设计、截图分析、网页封装桌面应用、浏览器操作 | 编码宿主、视觉能力、构建环境或 Chrome/CDP；不构成统一前端应用框架 |
| 项目决策与个人工作 | `agent-team`、`multi-agent-meeting`、`product-manager-toolkit`、`tailored-resume-generator` | 角色分工、决策记录、需求排序、PRD、简历 | 方法模板依赖真实输入；“多个角色”与“多个独立执行实例”需区分 |
| 个股分析 | `stock-analysis` | 行情与技术指标分析工作流 | 数据与模型依赖另配；预测准确率和投资结果未验证，名称与宣传不能提供保证 |
| 文化内容 | `poetry-music-visual` | 古诗词的视觉意象和配乐提示 | 输出方案与提示词；画面和音乐须由对应工具制作 |

## 外部索引与本地文件的区别

README 还介绍 Word、Excel、通用 PDF/PPT、安全审计、机器学习训练、云平台等来源。这些可作为**继续寻找上游技能的方向**，不应据首页列表推断所有实现均已打包在当前仓库中。

例如 `skills/` 盘点并没有精确名为 `docx`、`xlsx`、`pdf`、`pptx` 的技能入口；它包含的是其他专门 PDF/PPT 技能。`finance-skills/` 在该版本包含配置和状态文档，没有精确名为 `SKILL.md` 的文件。来源目录、配置文件与可加载的技能包应分别处理。

## 技能如何产生作用

| 层次 | 实际负责的工作 |
| --- | --- |
| 用户需求与资料 | 指定目标、提供真实输入和验收条件 |
| Skill | 提供触发场景、步骤、分工、格式与质量要求 |
| 宿主模型 | 理解输入、作出判断、撰写内容和选择工具 |
| 脚本／CLI／API／浏览器 | 执行读写、转换、抓取、生成和平台操作 |
| 输出检查 | 核对事实、文件可打开性、平台状态与视觉质量 |

本仓库更适合借鉴“如何组织任务”和“去哪里找工具”。某个领域已有稳定工具时，新增技能的价值主要看它是否提供了独有的方法、模板或数据连接。
