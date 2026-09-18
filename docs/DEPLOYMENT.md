# Web 演示部署约定

当前已收录 001 · Understand-Anything，并完成其本地静态交互展示；尚未启用自动部署，也没有已上线的演示。运行方式见[项目演示说明](../projects/001-understand-anything/demo/README.md)。

## 多个演示如何组织

GitHub Pages 每个仓库支持一个项目站点，可在这个站点下用不同子路径承载多个静态演示。它提供静态文件托管，不能直接运行常驻服务端程序。依据：[GitHub Pages 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)。

如后续启用本仓库的默认 Pages 域名，建议路径如下（仅为规划，当前不可视为已上线地址）：

```text
https://yydshly.github.io/0918_codex_project/
├── 001-project-name/
├── 002-project-name/
└── ...
```

站点首页作为演示导航，各子路径沿用研究项目编号。另有独立托管平台或自定义域名时，直接在索引填写实际地址。

## 有具体项目后的发布步骤

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
