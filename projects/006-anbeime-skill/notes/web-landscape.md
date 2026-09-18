# 关联网页：内容多，分别承担什么角色？

本轮补充读取固定版本 `f21302e204d513d09763ebb291704eb9a2aaa34f` 的 7 份 `public/` 页面源码，日期 2026-09-18。以下说明来自仓库内的网页文件，不代表线上站点正在提供同样内容。在线域名未能通过本次检索工具访问，不能据此判断服务永久下线，也不把它们标注为已验证在线。

## 站内页面

| 页面 | 展示什么 | 应如何理解 |
| --- | --- | --- |
| `public/index.html` | TOPGO 生态首页：知易、StarClaw、四色卡片、技能目录、N8N 与站群链接 | 产品与资源导航入口；页面上的产品介绍不意味着全部实现在本仓库 |
| `public/skills.html` | 中文技能精选与官方来源卡片，链接本地技能页及原作者仓库 | 帮助发现技能；卡片数量与“已安装能力”不同 |
| `public/local-skills.html` | 本地技能筛选，读取 `/data/local_skills.json` | 展示作者维护的目录数据；“已安装”描述不能代表访问者的电脑已安装 |
| `public/projects.html` | Companion Skill、Companion Simple、Assistant 三个项目介绍，以及对话场景 | 项目展示与文档跳转；演示文案不证明任务已执行 |
| `public/chat-demo.html` | 聊天界面、快捷问题和图片 | 使用 `mockResponses` 预设回复及 Unsplash 图片；“文件整理完成”等文本是模拟回复，没有真实文件操作 |
| `public/index-en.html` | 英文资源入口与 N8N 导航 | 数量与中文首页不同，不宜作为统一的最新统计 |
| `public/skills-en.html` | 英文技能精选和官方来源入口 | 同样存在不同口径的数字，需回到固定文件清单核对 |

例如中文首页显示 63 个原创技能包、2,326 个抓取索引、4,834 个工作流；英文首页显示 416 个实体技能、2,053 个工作流；来源 JSON 又声明 3,938 条来源。它们的对象、维护时间和统计范围不同。我们采用固定文件树统计本仓库技能，外部索引另列，不推断哪个宣传数字代表“当前全部可用能力”。

## 对外关联的内容

首页把多类项目链接放在一起，阅读时可以分成三组：

| 组别 | 关联对象 | 与本仓库的关系 |
| --- | --- | --- |
| AI 产品与演示 | 知易的体验/开源入口、StarClaw 与四色卡片的视频介绍 | 产品介绍与外部跳转；未检查目标实现与账号服务 |
| 自动化资源 | 外部 N8N 工作流站 | 查找工作流模板的另一个入口；不是本仓库自动内置的 N8N 执行器 |
| 工具与主题站 | AI123、Solar、Top、MP、Stock、PDF、Excalidraw、StockBot、AlphaQubit、Game、租房、维权等 | 站群导航；名称与介绍取自首页，不据此证明代码属于本仓库或服务已可用 |

Skill 商店自己也出现在站群链接中。站群链接是发现工具的线索；具体部署、模型、数据、账号和费用均需到各目标服务单独确认。

## 如何把它与 Skill 联系起来

网页提供发现和理解入口；Skill 写出工作方法；宿主 AI 理解目标；脚本、浏览器、模型或服务执行实际操作。只有走到依赖齐全并完成产物验证，才能说某个具体任务在特定环境下可用。

对我们的用处是建立“资源从哪里找、流程怎么组织、工具缺什么”的认识。研究网页按“总览 → 网页导览 → 能力分类 → 文件清单 → 使用路径 → 证据边界”组织，把分散信息汇总为一个阅读入口。

## 固定版本来源

- [生态首页](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/public/index.html)
- [中文技能页](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/public/skills.html)
- [本地技能页](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/public/local-skills.html)
- [项目案例页](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/public/projects.html)
- [聊天演示页](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/public/chat-demo.html)
- [英文首页](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/public/index-en.html)
- [英文技能页](https://github.com/anbeime/skill/blob/f21302e204d513d09763ebb291704eb9a2aaa34f/public/skills-en.html)

来源哈希纳入 [sources.json](evidence/sources.json)。本研究网页为原创整理，未复制上游页面样式、商品宣传图片或模拟聊天图片。
