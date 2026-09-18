# 004 · ASu-skills

九个中文求职 Skill 将经验整理为 AI 可执行的工作流，并配套证据账本、简历编辑与导出、浏览器桥接等资源。核心理解是 **Skill 定义流程，宿主 AI 理解并决策，工具与模板完成交付**；九个入口不等于九个独立智能体。

## 项目信息

| 项目 | 内容 |
| --- | --- |
| 固定编号 | `004` |
| 上游仓库 | [Hisn00w/ASu-skills](https://github.com/Hisn00w/ASu-skills) |
| 研究版本 | 原始研究读取 main，未锁定提交；迁移时核对 HEAD 为 `fe32740249895af71fb1d6d92596ddd2220acfbd`，不据此追认此前所有读取版本 |
| 上游许可证 | MIT；通过 GitHub license API 核对，见 [LICENSE](https://github.com/Hisn00w/ASu-skills/blob/main/LICENSE) |
| 收录日期 | 2026-09-18 |
| 研究进度 | 已验证（迁移网页、文档下载、图像完整性与四项目公网入口；上游插件和招聘网站未实测） |
| 展示技术 | 原生 HTML / CSS / JavaScript；Node.js 生成文档与网页 |
| 在线演示 | [已上线 · 研究手册](https://yydshly.github.io/0918_codex_project/004-asu-skills/) |

最近验证：2026-09-18。首次迁移发布版本为 `99eda015a9152e380ec29bd5318653e584d99504`，见[公网验证记录](notes/evidence/deployment.json)。

## 阅读入口

- [完整研究文档](notes/research.md)：九项能力、五层架构、四条使用流程、边界与源码索引。
- [我们的理解与应用](notes/understanding.md)：工作流的本质、研究价值与 AI 协作经验。
- [Web 研究手册](demo/index.html)：章节导航、可展开能力卡片、引导图、文档下载与打印。
- [PNG 全景引导图](assets/understanding-map.png) / [SVG 矢量源图](assets/understanding-map.svg)。
- [来源与版本记录](notes/evidence/sources.json) / [演示维护说明](demo/README.md)。

## 一张图理解

![九项 Skill 的功能、产出、作用，以及架构、流程、价值和边界](assets/understanding-map.png)

这是本次研究原创的信息总览，不是上游产品截图，也不是运行效果或录用率的测量结果。高清 PNG 为 3840 × 6020，SVG 可缩放。[图片来源](assets/README.md)。

## 能力速览

| Skill | 核心作用 | 主要产出 |
| --- | --- | --- |
| contributor | 准备真实开源贡献 | 候选问题、改动验证、PR 及贡献证据 |
| evidence-recap | 复盘 AI 对话与交付 | 九段证据链、个人动作与待补材料 |
| project-guide | 理解源码、形成课程 | 学习大纲、练习、项目导学与面经 |
| great-resume | 优化真实经历表达 | 定位、简历要点和 HR 话术 |
| make-resume | 生成简历文件 | 可编辑 HTML 与 PDF |
| job-match | 将 JD 与经历对照 | 证据矩阵、门槛、补强项与投递建议 |
| job-apply | 填写具体职位申请 | 已填表单、缺失项与提交前摘要 |
| interview | 追问并验证简历主张 | 预测、模拟、复盘与弱项复练 |
| offer | 整理并跟进求职状态 | HTML 进度表、变化与下一步 |

## 对我们的价值

最直接的价值是把“定位—能力—原理—依赖—边界—图文交付”固化为可复用研究方法。项目导学与证据复盘帮助区分个人决策、AI 产出和已验证结果；简历、投递与面试功能则按实际需求采用。此判断基于本次研究需求，不假设个人职业或求职状态。

## 本地维护

在本子项目目录中执行（Node.js 22 或以上，无须安装依赖）：

```sh
node code/build.mjs
node code/check.mjs
```

双击 `demo/index.html` 可阅读；文档和图片通过同级目录的相对路径引用。总网站由仓库根的 `python scripts/build_site.py` 汇总，沿用现有 Pages 工作流；此子项目没有独立 Git 仓库和独立部署工作流。

## 来源、迁移与限制

原创分析、网页、PNG 和 SVG 已从误建的独立研究仓库迁入本项目。迁移起点为 `yydshly/asu-skills-guide@ce5bfb867908467f745de107e3ad505dea86fdf7`，正式维护位置以本目录为准。

仅引用上游资料说明机制，没有引入上游插件源码、登录资料或第三方图片。原始研究未固定上游版本；未安装上游插件、运行其测试、实测招聘填写或验证求职效果。技能规则、代码实现与推论在正文中区分。见 [来源声明](THIRD_PARTY_NOTICES.md)。

[返回总项目索引](../../README.md#项目索引)
