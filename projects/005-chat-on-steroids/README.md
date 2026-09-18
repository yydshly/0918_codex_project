# 005 · Chat On Steroids

> 核心价值：把网页版 ChatGPT 与真实本地环境关联起来，并围绕真实网页会话构建 Agent 能力，让对话能够操作项目、执行工具、组织分工和持续推进任务。
>
> 实现方式：MCP 与隧道连接云端工具调用和本地执行，浏览器扩展与本机桥接协调网页会话，本地工作台管理项目、历史、多 Agent 和任务续接。推理在云端，工具在对应执行端运行；底层仍有客户端与服务端通信。

## 项目信息

| 项目 | 内容 |
| --- | --- |
| 固定编号 | `005` |
| 上游 | [totec448-spec/chat-on-steroids](https://github.com/totec448-spec/chat-on-steroids) |
| 研究提交 | [`2f9acf307189ed1f05bee0cdc97871fdcff1d8f5`](https://github.com/totec448-spec/chat-on-steroids/tree/2f9acf307189ed1f05bee0cdc97871fdcff1d8f5) |
| 版本声明 | `2.1.14`；不表示已核验该版本发布包 |
| 上游许可证 | MIT；[原始声明](licenses/upstream.LICENSE)，依赖与插件有各自许可 |
| 技术栈 | 上游：Electron、TypeScript、MCP、Chrome MV3 扩展、原生辅助程序；本展厅：原生 HTML/CSS/JavaScript |
| 研究进度 | 研究中；源码分析与本地静态展厅验证，未运行上游端到端工作流 |
| 收录 / 验证日期 | 2026-09-18；具体执行时间见证据文件 |
| 在线演示 | 部署中；完成公网验证后记录地址 |

## 展示与阅读

- [打开交互展厅](demo/index.html)：真实对话的三个位置、两条通信通道、八类能力、成功 / 受阻流程、模式价值及源码证据。
- [一图总览](demo/index.html#map)：可放大查看完整能力、网页驱动、本地交互和价值；[高清 PNG](assets/understanding-map.png)。
- [内容审查记录](notes/content-review.md)：逐项更正含混表述并补充链路，区分主执行路径与输入递送例外。
- [完整研究](notes/research.md)：架构、调用链、多智能体、Goal / Loop、续接和权限边界。
- [使用与选型](notes/usage.md)：面向本仓库的价值判断、接入前提与未来实测方案。
- [展厅运行说明](demo/README.md)：本地查看、检查和编号路径集成。

![Chat On Steroids 全景概念图：真实会话位置、扩展桥接、MCP 隧道、本地工具、八项能力与模式价值](assets/understanding-map.png)

图为 ImageGen 生成并核对的原创研究概念图，**不是上游软件运行截图**。可在展厅中缩放，生成提示与来源见[图片说明](assets/README.md)。页面中的流程是人工编写的教学样本，不调用模型、不操作真实网页或终端。

## 能力与价值

| 能力 | 实际机制 | 对我们的意义 |
| --- | --- | --- |
| 文件、补丁、终端 | 本地 MCP 服务执行工具，将结果交回 ChatGPT | 编程闭环可行；Codex 已覆盖大部分同类需求 |
| 驱动 ChatGPT 会话 | 扩展观察页面状态并递送消息、管理聊天标签页 | 理解聊天产品如何被组织为可执行工作台 |
| 驱动其他网页 | 扩展通过 Chrome 调试接口获取 DOM、截图并操作页面 | 理解后台网页操作、页面身份与结果验证 |
| 原生桌面 | Windows / macOS 平台实现屏幕与输入控制 | 与网页控制区分；需具体系统实测 |
| 多智能体 | 主会话分派，多个 ChatGPT 工作会话独立执行和回报 | 学习任务归属、消息路由、休眠与复用 |
| Goal / Loop | 辅助模型判断是否继续，生成下一条推进消息 | 任务推进策略，不是正确性保证 |
| Compact & Resume | 交接摘要、新会话与原本地任务重新绑定 | 学习可恢复的会话交接，不是无限上下文 |
| 外部 MCP 插件 | 管理外部服务连接、发现工具并转发调用 | 可按需接 Blender、Playwright 等；依赖另行配置 |

## 快速开始

本展厅不需要安装上游软件。可以直接打开 `demo/index.html`；或在仓库根运行：

```powershell
python -m http.server 8767 --bind 127.0.0.1
```

访问 [本地 005 展厅](http://127.0.0.1:8767/projects/005-chat-on-steroids/demo/)。已有该端口服务时直接使用。

## 验证边界

| 层级 | 本次状态 | 证据 |
| --- | --- | --- |
| 上游固定版本 | 文件获取、版本、许可与关键入口检查 | [来源记录](notes/evidence/sources.json) |
| 研究展厅 | 浏览器交互、键盘操作、手机布局、资源检查 | [本地浏览器记录](notes/evidence/browser-qa.json) |
| 总站集成 | 001—005 共同构建、编号路径和本地链接检查 | [集成记录](notes/evidence/integration.json) |
| 构建后展厅 | 编号路径下重复浏览器检查 | [构建浏览器记录](notes/evidence/browser-built-qa.json) |
| 既有总站回归 | 首页导航及既有 001—003 专项浏览器检查；004 资源随五项目构建检查 | [总站回归记录](notes/evidence/site-qa.json) |
| 上游真实执行 | 未安装、未运行；账号、模型、隧道和桌面控制未实测 | 后续方案见使用说明 |
| 公网部署 | 部署中 | 验证成功后补充实际地址与版本记录 |

## 来源与改动

研究文字、交互页面与流程样本为本项目整理，没有引入上游完整源码或产品截图。来源链接固定到上述提交；保存上游许可证及文件 SHA-256 便于复查。Codex 对比依据 2026-09-18 查阅的官方文档，不承诺跨版本或跨宿主的工具配置完全一致。

[返回总索引](../../README.md#项目索引) · [图片说明](assets/README.md) · [第三方声明](THIRD_PARTY_NOTICES.md)
