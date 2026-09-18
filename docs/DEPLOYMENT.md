# Web 演示部署约定

已启用 GitHub Pages 与 GitHub Actions 自动部署。001 · Understand-Anything 的静态交互展厅已上线，2026-09-18 完成公网浏览器验证。运行方式见[项目演示说明](../projects/001-understand-anything/demo/README.md)。

| 入口 | 已验证地址 |
| --- | --- |
| 研究展厅导航 | [站点首页](https://yydshly.github.io/0918_codex_project/) |
| 001 · Understand-Anything | [分类效果展厅](https://yydshly.github.io/0918_codex_project/001-understand-anything/) |
| 引导图 | [可缩放能力总览](https://yydshly.github.io/0918_codex_project/001-understand-anything/overview.html) |
| 同类工具 | [五工具与七场景对比](https://yydshly.github.io/0918_codex_project/001-understand-anything/#compare) |

根索引、子项目 README 和仓库 About 的 Website 均关联线上入口。

## 多个演示如何组织

GitHub Pages 每个仓库支持一个项目站点，可在这个站点下用不同子路径承载多个静态演示。它提供静态文件托管，不能直接运行常驻服务端程序。依据：[GitHub Pages 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)。

当前站点路径如下；后续项目继续沿用编号子路径：

```text
https://yydshly.github.io/0918_codex_project/
└── 001-understand-anything/
```

站点首页作为演示导航，各子路径沿用研究项目编号。另有独立托管平台或自定义域名时，直接在索引填写实际地址。

## 当前构建与发布

- 清单：[site-projects.json](../site-projects.json)，记录编号、源库、摘要和代表图。
- 构建：在仓库根运行 `python scripts/build_site.py`，无需第三方 Python 包。仅复制 Git 已跟踪的项目内容，输出忽略目录 `_site/`；本地可通过静态服务访问该目录验证。
- 工作流：[pages.yml](../.github/workflows/pages.yml)。main 分支的项目内容、清单、构建脚本或工作流更新会自动触发；也支持 Actions → Deploy research website → Run workflow。
- 托管：Pages 的发布来源为 GitHub Actions；构建产物上传后发布至 github-pages 环境。
- 版本：[build.json](https://yydshly.github.io/0918_codex_project/build.json) 记录当前部署的源 commit；首次发布为 `b0eff0df723a611c6eee1656d6cdf14a4d5c6abb`。
- 验证：`node scripts/verify_pages.mjs https://yydshly.github.io/0918_codex_project/`，需要 Playwright、Edge 及 `PLAYWRIGHT_MODULE`。可设置 `EXPECTED_COMMIT` 核对版本。首次公网检查结果见[部署记录](../projects/001-understand-anything/notes/evidence/deployment.json)，后续状态见 [Actions](https://github.com/yydshly/0918_codex_project/actions/workflows/pages.yml)。

当前构建器适用于原生静态 demo：保留项目目录结构，并复制网页到编号子路径根部，改写资源相对路径。新增同类项目时加入清单并提交文件；有独立构建系统的项目需先扩展构建步骤。所有已收录演示在同一次发布中保留。

## 新演示发布步骤

1. 在子项目 `demo/README.md` 记录依赖安装、启动、构建命令和产物目录。
2. 为每个应用设置正确的资源基础路径，例如 `/0918_codex_project/001-project-name/`。
3. 将各应用的静态构建结果汇总到一个发布目录，各占一个编号子目录；同一次部署包含所有需要保留的演示，避免发布单个项目时覆盖其他演示。
4. 添加站点导航页，然后按实际构建方式配置 GitHub Pages 发布来源与工作流。
5. 检查首页、子路径、静态资源和页面刷新；单页应用需选择适合静态托管的路由方案，例如 hash 路由。
6. 验证线上地址后，再更新根 README 和子项目中的部署状态、链接及截图。

具体配置流程见 [GitHub Pages 发布来源文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 含后端的项目

后端、数据库及长期运行的任务使用合适的外部服务托管。子项目应分别记录前端和后端地址、环境变量名称、启动方式及限制。浏览器端可读取的配置不能存放私密 API 密钥。

## 每个演示应记录的信息

| 字段 | 要求 |
| --- | --- |
| 部署状态 | 未部署 / 部署中 / 已上线 / 已下线 |
| 访问地址 | 已验证的真实 URL，未部署时留“未部署” |
| 对应版本 | 代码 commit 或 tag |
| 构建与输出 | 实际命令、产物目录、基础路径 |
| 环境配置 | 变量名和用途，不写秘密值 |
| 最近验证 | 日期、验证内容和已知限制 |
