# 010 · AI Infra Book

《深入理解 AI Infra：量化分析与系统设计》由李博杰撰写。开源 AI 基础设施技术书，配套资源计算工具与实验。覆盖模型与负载、加速器与算子、多卡互联与网络、推理与训练优化、资源调度及端边云协同。我们在本地运行模型遇到显存不足或速度慢、评估多人服务成本，以及微调训练受资源限制时按需参考，用于理解瓶颈和比较取舍；普通安装先看具体教程，不必从零设计模型。

| 项目 | 内容 |
| --- | --- |
| 上游仓库 | [bojieli/ai-infra-book](https://github.com/bojieli/ai-infra-book) |
| 研究版本 | [`b069b6971faf6c4701b57a8b025462b9f2694b8f`](https://github.com/bojieli/ai-infra-book/tree/b069b6971faf6c4701b57a8b025462b9f2694b8f) |
| 上游许可证 | Apache-2.0；第三方资料保留各自许可 |
| 收录与验证日期 | 2026-09-18 |
| 技术栈 | 原生 HTML / CSS / JavaScript；无前端依赖 |
| 研究进度 | 静态研究与网页验证；上游工具和 GPU 实验未执行 |
| 在线演示 | 未部署 |

## 网页内容

[一图读懂（支持缩放）](demo/overview.html) · [完整文字理解](notes/understanding.md) · [下载原图](assets/understanding-map.png)

![AI Infra Book 完整理解图：定位、场景、模块、方法、实践与价值](assets/understanding-map.png)

图为内置 image_gen 生成并核对的原创概念图，非上游截图；图中的实践建议尚未执行。

[打开研究导览](demo/index.html)：三类能力、十二章知识地图、四条可切换学习路线、分析方法、最小计算命令、应用价值与验证边界。路线会更新章节高亮，并保存在网址中；支持刷新、前进后退和键盘操作。静态正文不依赖 JavaScript。

![AI Infra Book 研究导览桌面真实截图](assets/cover.png)

截图为本项目导览网页；封面书籍图形是原创 CSS 示意，非原书封面，也非上游软件运行截图。[手机截图](assets/mobile.png) · [图片来源](assets/README.md)。

## 核心判断

- **学习价值**：从模型与任务出发，理解显存、计算、数据搬移及系统设计取舍。
- **工具价值**：用 `calculations/` 复算资源数量级。静态计算不需要 GPU 或模型权重，但有覆盖与假设限制。
- **实验价值**：结合计算类和实跑类实验，学习如何保留输入、环境、结果与未覆盖项。
- **对我们的意义**：作为模型部署与性能分析的参考资料；有具体问题时按章节进入，不需要整库集成到研究站点。

本项目没有运行上游计算工具，没有独立验证上游性能结论，没有执行 GPU 实验。网页将可用工具、上游记录和本地已验证范围分别说明。

## 本地打开

在仓库根目录运行：

```powershell
python -m http.server 8770 --bind 127.0.0.1
```

访问 [本机预览](http://127.0.0.1:8770/projects/010-ai-infra-book/demo/)。也可直接打开 `demo/index.html`；自动复制受浏览器剪贴板权限限制，失败时提示手动复制。

## 资料与验证

[研究分析](notes/research.md) · [演示与检查方法](demo/README.md) · [浏览器检查](notes/evidence/browser.json) · [编号入口集成检查](notes/evidence/integration.json) · [上游来源与校验](notes/evidence/upstream.json)。

上游说明文件按固定提交保存于 `notes/evidence/`，保留 Apache-2.0 许可证与原始署名。网页是独立归纳，未复制全书、模型权重或上游程序。没有新增根应用或跨项目依赖。

[返回根索引](../../README.md#项目索引)
