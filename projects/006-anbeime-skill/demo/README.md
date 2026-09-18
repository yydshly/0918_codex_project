# 006 · 技能与网页研究导览

原生 HTML / CSS / JavaScript，无运行依赖、账号或 API。网页只呈现原创研究内容，不连接上游模型，也不执行技能。

**状态：本地网页和六项目集成已验证，公网未部署。**

## 打开网页

直接打开 [index.html](index.html)，或在仓库根运行 `python -m http.server 8767 --bind 127.0.0.1`，访问[本地研究导览](http://127.0.0.1:8767/projects/006-anbeime-skill/demo/)。已有该端口服务时复用。

构建后的总站：[本地总站](http://127.0.0.1:8767/_site/) · [006 编号入口](http://127.0.0.1:8767/_site/006-anbeime-skill/)。这些是本机地址，不是公网部署地址。

## 七个章节

| 路由 | 内容与交互 |
| --- | --- |
| `#overview` | 四类内容关系、文件统计和我们的理解 |
| `#map` | 完整能力总览图，支持 100%—300% 缩放、滚动、复位与高清原图 |
| `#websites` | 切换 7 份站内页面介绍，说明产品、N8N 与站群链接 |
| `#capabilities` | 19 类任务的产出、技能入口与条件，支持搜索 |
| `#inventory` | 84 份文件的真实路径，支持名称搜索和 4 种范围筛选 |
| `#workflow` | 研究 PPT、代码架构、文章发布三种使用思路 |
| `#evidence` | 数字差异、模拟聊天、缺失实现、联网依赖和来源 |

支持键盘操作、手机布局、刷新与浏览器返回。数据内置在 `data.js`，直接打开本地文件也可使用。点击外部来源链接才会访问第三方站点。

## 更新与检查

在仓库根执行：

```powershell
python projects/006-anbeime-skill/code/inspect_sources.py
python projects/006-anbeime-skill/code/build-data.py
python projects/006-anbeime-skill/code/build-understanding-map.py
node projects/006-anbeime-skill/code/verify-demo.mjs
python projects/006-anbeime-skill/code/verify-integration.py
node projects/006-anbeime-skill/code/verify-demo.mjs http://127.0.0.1:8767/_site/006-anbeime-skill/ browser-built-qa.json
```

来源脚本需网络，使用 Python 标准库，仅读取固定版本的公开文件。`build-data.py` 从本地研究资料生成网页数据。浏览器检查需 Node.js、Playwright 和 Edge，`PLAYWRIGHT_MODULE` 可指向已有 Playwright 的 `index.mjs`；`CHROME_PATH` 可指定浏览器。检查工具不是网页运行依赖。

`build-understanding-map.py` 生成可编辑 SVG；PNG 由浏览器在 2160×3600 视口打开该 SVG 导出。图像生成服务两次网络失败后，最终采用本地原生排版；SVG 是源文件，PNG 用于网页与分享。

证据：[源码页浏览器检查](../notes/evidence/browser-qa.json) · [总站集成](../notes/evidence/integration.json) · [构建页浏览器检查](../notes/evidence/browser-built-qa.json)。

## 集成与发布边界

已登记 `site-projects.json`，沿用现有构建器和 Pages 工作流；不新增根应用或跨项目依赖。`verify-integration.py` 使用临时 Git 索引检查六个展厅共同构建，保留真实暂存区。`build.json` 中的 commit 是工作树基线，本地检查包含未提交文件，不表示该 commit 已发布 006。

正式构建 `python scripts/build_site.py` 仅复制 Git 已跟踪文件。未来发布应先纳入版本管理，再按[部署约定](../../../docs/DEPLOYMENT.md)发布并验证编号子路径。本次未推送、未触发部署，也未声明外部上游站点在线可用。
