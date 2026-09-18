# 《自学是门手艺》研究记录

## 研究对象与依据

上游 [selfteaching/the-craft-of-selfteaching](https://github.com/selfteaching/the-craft-of-selfteaching)，固定提交 `987a8e8a9ce205b63886510e145437d14d8a13a4`，核对日期 2026-09-18。原著李笑来，README 声明 CC BY-NC-ND 3.0。

采集固定提交 README、Markdown 目录及 Git 树，在临时目录阅读正文。以 `markdown/TOC.md` 的 46 个入口作为覆盖边界：开始阅读 2 项、第一部分 13 项、第二部分 12 项、第三部分 12 项、附章 3 项、工具附录 4 项。封面及导航文件不算阅读章节。每个章节的原始文件大小与 SHA-256 见 [upstream.json](evidence/upstream.json)。所有 Markdown 和对应 Notebook 路径均与固定提交 Git 树核对。

注意原文路径差异：Markdown 沟通章为 `Q.good-communiation.md`，Notebook 为 `Q.good-communication.ipynb`；保留真实路径，不推测同名。

## 能力判断

原书用 Python 实践呈现“学、练、用、造”，方法论与代码内容交织。第一部分为进一步阅读官方教程建立概念基础；第二部分从读走向写，以小函数带动练习；第三部分继续学习抽象与工具，同时讨论拆解、全面学习、社交和注意力。

本项目归纳为三类能力、九个细分方向：

| 维度 | 细分能力 | 主要来源 |
| --- | --- | --- |
| 自学方法 | 独立阅读与整理、针对性练习、拆解与注意力 | Part.1.C/F；Part.2.A/B/E；Part.3.A/C/H |
| Python 实践 | 数据与流程、函数及程序组织、进阶抽象与文本工具 | Part.1.E.1—7；Part.2.C/D；Part.3.B.1—4 |
| 资料与协作 | 官方文档与语法参考、学习证据和反馈、表达与迁移 | 02；Part.1.G；Part.3.B.5/F/G；Q/R/S；工具附录 |

网页每章包含简短独立摘要、动手建议和固定原文链接；能力细节连接相应章节。分类是导航用途，同一章节可能涉及多种能力，主分类不是原书官方分类。

## 引导设计

四条路线按已有基础区分，列出阶段行为与可观察成果。全书路线覆盖全部 46 项；零基础路线优先基础阅读与小函数；方法路线强调真实任务、记录和反馈；工具路线强调接口、模块、测试与按需选工具。路线不是固定天数课程。

原创练习分三层：文本整理器（基础）、日志摘要器（函数与规则处理）、陌生项目指南（迁移与表达）。每项明确输入输出、边界和验收。七个排障入口让读者从具体卡点回到原书。八项自查不自动打能力等级，优先提示尚未确认的能力。

阅读标记与成果自查分开；笔记要求目标、尝试、预期与实际、疑问、证据和下一步。存储只在浏览器本地，失败时继续允许操作与导出。章节深链会展开目标；若筛选隐藏了目标会清除筛选使其可见。

## 时效性与补充边界

书中初稿日期为 2019 年，工具配置保留当时情境。未重复执行安装流程，网页给出当前官方入口和独立的最小环境命令示意。已查阅 [JupyterLab 安装文档](https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html) 和 [Python venv 文档](https://docs.python.org/3/library/venv.html)。不照搬旧插件或取消认证配置。

原书数据容器章把字典归为无序。当前 [Python 官方字典说明](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict) 保证保留插入顺序，网页明确提醒；集合仍不保证此种顺序。没有对原书所有技术细节完成逐条现代化审校。

AI 协作段落是本项目面向当前学习环境的补充；原书并非生成式 AI 教程。方法论中的个人观点与修辞没有当作普遍实验证明。书籍学习目标、软件能力、读者最终掌握程度不可等同。

## 验证与限制

网页交互检查见 [browser.json](evidence/browser.json)，总站编号入口见 [integration.json](evidence/integration.json)。仅验证本项目网页；未执行上游 Notebook，未验证原书案例的当前运行兼容性或学习成效，未逐项请求原书外链。已部署并核验公网访问，见 [部署记录](evidence/deployment.json)、[线上交互](evidence/remote-browser.json) 和 [图像验证](evidence/remote-map.json)。

原书全文、图片、下载压缩包与依赖不进入项目。页面、CSS 学习循环图和引导内容为本次独立编写；截图是本地网页的真实浏览器截图。
