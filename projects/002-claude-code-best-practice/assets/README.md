# 总览图、展示截图与来源

本目录包含一张原创理解总览图及本研究编写的 Web 展厅截图，均不是上游 Claude Code 的运行截图。

## 理解总览图

[understanding-map.png](understanding-map.png) 为 3600 × 4760 高清图；[understanding-map.svg](understanding-map.svg) 为可编辑矢量源文件。图中整理“Claude Code 使用指南＋配置示例集”的定位、九类内部内容、实际执行关系、使用场景、对我们的价值以及边界。

内容依据固定上游版本 `73087da` 和本次讨论编写；“对我们的意义”是结合已有项目规则提出的研究判断，不是效果测量。图形为程序绘制的文字与关系图，非上游截图，未使用外部图片素材。复现：在子项目目录执行 `node code/build-understanding-map.mjs`，需 Playwright / Edge，可用 `PLAYWRIGHT_MODULE` 指定模块路径。渲染检查记录：[understanding-map.json](../notes/evidence/understanding-map.json)。

## 展厅截图

| 文件 | 内容 | 数据性质 |
| --- | --- | --- |
| [cover.png](cover.png) | 一图理解首页、定位摘要与导读，桌面布局 | 原创研究说明 |
| [workflow.png](workflow.png) | 五步天气流程完成后的结果 | 固定 26°C 教学模拟 |
| [workflow-failure.png](workflow-failure.png) | 取数无效后停止的分支 | 人工失败样本 |
| [mobile.png](mobile.png) | 390px 手机布局 | 原创研究说明 |

生成工具：Playwright + Microsoft Edge，2026-09-18。复现脚本：[code/verify-demo.mjs](../code/verify-demo.mjs)。截图对应的浏览器版本与检查记录见 [browser-qa.json](../notes/evidence/browser-qa.json)。

无占位图、无外部图片素材。截图中的上游配置摘录遵循 [MIT 许可证](../licenses/upstream.LICENSE)，其他内容参见 [第三方声明](../THIRD_PARTY_NOTICES.md)。
