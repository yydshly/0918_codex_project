# 研究过程与验证记录

## 研究问题与范围

本轮回答三个问题：awesome-ceo 能帮助使用者做什么；这种帮助由怎样的内容结构实现；资料入口与实际业务能力的边界在哪里。

研究使用 GitHub 主分支 HEAD、该提交的完整文件树、README 原文和许可证。没有访问所有外链或执行实际业务活动。能力说明见[详细解读](understanding.md)。

## 版本与环境

| 项目 | 记录 |
| --- | --- |
| 上游 | `https://github.com/kuchin/awesome-ceo` |
| 默认分支 | `main` |
| 固定提交 | `89f761c2af903066500e1a0c33c33cf36873cdf6` |
| 提交时间 | 2023-02-16T09:50:34Z |
| 提交说明 | `More content` |
| 上游许可证 | CC0-1.0；已读取随仓库提供的 LICENSE |
| 验证日期 | 2026-09-18 |
| 本地环境 | Windows、PowerShell、Git；通过 GitHub REST API 与 raw 文件核验 |
| 运行环境要求 | 上游无应用运行时；阅读文档即可 |
| 状态 | 静态研究与中文网页完成；本地与公网已验证，未验证外链服务 |

## 已执行的检查

| 检查 | 实际操作 | 结果与限制 |
| --- | --- | --- |
| 默认分支与版本 | 查询仓库元数据和 commits/main | 默认分支为 main；将研究固定到上表提交 |
| 完整文件树 | 查询 git/trees 的递归接口 | truncated=false，仅 README.md 与 LICENSE 两个 blob |
| README 内容 | 按固定 commit 下载并阅读原文 | 资源目录、外链和说明；无安装或执行代码 |
| 许可证 | 下载并阅读固定版本 LICENSE | 文件标识为 CC0 1.0 Universal |
| 快照一致性 | 对下载文件执行 git hash-object --no-filters | 两个 blob 标识分别与 GitHub 文件树相同 |
| 分类与条目 | 解析正文二级标题和资源列表，人工复核计数口径 | 11 个资源分区，共 85 条 |
| 文档与索引检查 | 检查 7 份本地 Markdown 的 82 个本地文件或目录链接、根索引顺序、资源目录与原文链接、快照 SHA-256，并执行 git diff --check | 本地目标全部存在；索引 001—009 连续有序且表格完整；85 条资源及 11 个分区吻合；资源外链均来自原文，快照校验一致；已跟踪文件差异无空白错误。未请求外链目标 |

版本、文件树、SHA-256 和统计结果已保存在 [upstream.json](evidence/upstream.json)。快照源文件的 Git blob 标识为：

| 文件 | Git blob SHA-1 |
| --- | --- |
| README.md | `a1746a801190d4b3267f4734ea488254c491c0f2` |
| LICENSE | `0e259d42c996742e9e3cba14c677129b2c1b6311` |

## 条目统计方法

1. 以二级标题确定大分类，融资下的三级标题合并计入融资，PMF 合并计入产品。
2. 统计每个内容分区中顶层的星号或短横线资源条目。
3. 排除 Contents、License、前言订阅链接和嵌套说明；作者社交链接、徽章图片不单独计数。
4. 单个资源条目可以包含多个内容链接。例如 Lean Canvas 与 Miro 模板仍是一条。

结果为融资 24、创业 12、产品 6、销售 1、营销 5、管理 12、招聘 3、财务 4、书籍与课程 10、扩展资料 6、相关角色 2，合计 85。

Contents 仅列 10 个导航项，而正文另有 Other，故统计结果为 11 个正文资源分区。这是目录与正文结构的差异，不应报告成“11 个业务模块”。

## 可复核步骤

在仓库根目录的 PowerShell 中执行以下只读命令，可检查保存的证据：

```powershell
$evidenceDir = 'projects/009-awesome-ceo/notes/evidence'
Get-Content "$evidenceDir/upstream.json" -Encoding utf8
git hash-object --no-filters "$evidenceDir/upstream-readme.md"
git hash-object --no-filters "$evidenceDir/LICENSE"
```

文件换行可能被 Git 的检出设置转换；若复核时校验值不同，应先比较字节与换行，而不是直接认定上游发生变化。需要重新取证时使用上述固定 commit 的 raw 地址，保留原始字节，并与 Git blob 标识比对。

下面的计数规则适用于本次保存的 README 格式；如果上游格式变化，需要重新审查解析条件：

```powershell
$sourcePath = 'projects/009-awesome-ceo/notes/evidence/upstream-readme.md'
$section = ''
$counts = [ordered]@{}
Get-Content $sourcePath -Encoding utf8 | ForEach-Object {
    if ($_ -match '^## (.+)$') {
        $section = $Matches[1]
        if ($section -notin @('Contents', 'License')) {
            $counts[$section] = 0
        }
    }
    if ($section -and $section -notin @('Contents', 'License') -and
        $_ -match '^\s{0,1}[-*] ') {
        $counts[$section]++
    }
}
$counts
($counts.Values | Measure-Object -Sum).Sum
```

## 结论与证据对应

| 结论 | 直接依据 | 不应推导出的结论 |
| --- | --- | --- |
| 本质是精选资源目录 | README 自述、分类、外链列表 | 已建立完整创业课程或经营系统 |
| 仓库内没有可执行应用或 Agent | 完整树只有两个文档文件 | 所有外部链接都没有软件服务 |
| 计算器和模板是外部入口 | 对应条目的 URL 指向第三方站点 | 下载 README 就能离线运行这些工具 |
| 核验时最新主分支提交较早 | 固定 commit 的提交时间 | 每个外部页面都没有更新，或作者已永久停止维护 |
| 技术借鉴主要在内容组织 | 没有独立运行模块；标题与列表承载资源 | 资料对所有业务都没有价值 |

## 本次产出与未执行项

已完成项目说明、详细能力与原理、85 条资源目录、中文导航网页、取证快照和根索引登记。文档资源目录从固定版本原文抽取标题与内容链接，移除作者社交徽章，保留原始目标地址；网页另保留原有署名及对应作者社交入口。没有自动抓取各站点的正文。

未逐项验证外部页面的状态、全文、收费规则或更新日期；未使用融资计算器，未联系投资人，未开展客户访谈或招聘。上游没有可运行应用；本项目额外制作了中文导航网页并保存真实截图，不将其描述成上游软件。网页已通过既有 GitHub Pages 工作流发布，线上入口见[项目说明](../README.md)。

## 中文网页整理与验证

根据用户要求，将内容整理为以阅读链接为中心的中文网页，避免把资料主题表达为自动执行业务的功能。提供 85 个中文标题与导读、86 个原始内容链接、11 类内容汇总和 13 处作者附注译文；保留英文原标题、原有署名、钱袋标记及原作者订阅入口。书名属于阅读识别译名，外部文章未做全文翻译。

生成过程将固定 README 快照与人工中文翻译对应，生成静态 HTML 与 [catalog.json](catalog.json)。中文类型标签及分类汇总为本项目补充。页面内含全部资源，无须翻页或联网抓取；搜索与筛选由浏览器本地执行。

通过 Edge 浏览器验证默认全量展示、11 个分类数量、中英文与作者搜索、类型组合、无结果提示、重置、刷新保持、附注展开、双链接条目、分类汇总跳转、手机布局和键盘搜索。另核对静态页面在禁用 JavaScript 时仍有全部资源与链接。逐条原始标题与 86 个内容链接均与固定快照一致，未请求这些外链目标。

检查结果见 [browser.json](evidence/browser.json)；编号子路径构建检查见 [integration.json](evidence/integration.json)。网页截图来源见 [assets/README.md](../assets/README.md)，启动与重建方法见[网页说明](../demo/README.md)。

## 一图理解与资料类型浏览

2026-09-18 根据用户要求新增原创总览图，使用内置 imagegen 生成，保留[完整提示词](../assets/understanding-map.prompt.md)。图中先说明“人工精选的 README 链接清单”，再按六组资料类型、11 个业务主题、使用过程与边界组织信息。明确记录本项目判断：作为备查目录即可，技术复用价值较低。

六组类型合计 85 条：文章/指南/问答 45、书籍/课程 11、资源目录 13、案例 6、框架/清单 4、模板/工具/演示/视频 6。分组定义保存在 `code/type-groups.json`，生成器验证分组互斥、条目数与原始类型一致。它们与上游主题是同一批资料的两个视角，不叠加。

已目视核对图中的主要文字、全部类型数、主题数、总数、来源和版本。图为概念归纳而非产品截图。网页增加六组类型入口与说明，点击后展示对应的完整资料条目；独立 `overview.html` 支持放大、缩小、适应窗口、下载和手机图内滚动。

浏览器验证已覆盖六组筛选及刷新、细分类型切换、图片资源、放大缩小、手机滚动和返回资料导航，并保留此前完整目录与搜索检查。本地证据记录在 [browser.json](evidence/browser.json) 与 [integration.json](evidence/integration.json)。

## 摘要与远端发布

根索引、站点导航、子项目说明和网页已统一摘要：该库通过人工收集、主题分类和少量推荐语提供资料导航，覆盖融资、创业、产品、销售、营销、管理、招聘、财务，以及书籍课程、扩展资料和 CTO / TPM 相关资源。对我们的技术研究直接价值较低，作为业务知识与阅读入口备查即可，无需技术深挖或集成。

2026-09-18 首次推送发布提交 `f85fb9a6496c14ea034a4efa283df8cb6ee3c547`，GitHub Actions [发布任务](https://github.com/yydshly/0918_codex_project/actions/runs/35354209527)成功。公网检查核对部署版本、全部八个项目入口、22 项 HTTP 资源、摘要、完整资源数量，以及总览图字节一致性；见 [deployment.json](evidence/deployment.json)。线上交互验证见 [remote-browser.json](evidence/remote-browser.json)。

远端导航耗时较本地更长，检查脚本在“返回资料导航”后明确等待总览图出现，再判断页面；这是验证脚本的等待修正，网页功能未因此改动。发布成功只证明研究网页可访问，不代表外部资源服务或经营效果经过验证。

## 来源

- [提交记录](https://github.com/kuchin/awesome-ceo/commit/89f761c2af903066500e1a0c33c33cf36873cdf6)
- [完整树 API](https://api.github.com/repos/kuchin/awesome-ceo/git/trees/89f761c2af903066500e1a0c33c33cf36873cdf6?recursive=1)
- [证据说明](evidence/README.md)

[返回项目说明](../README.md)
