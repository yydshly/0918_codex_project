# Web 展厅运行说明

本演示为原生静态页面，无 npm 依赖、无模型接口、无后端。页面数据保存在 data.js；浏览器直接读取本地脚本，支持 file:// 打开。

首页以“一图理解”展示指南定位、九个工作方面、原理、对我们的意义与边界，提供放大、缩小、适应宽度及高清图片入口。总览图可用 `node projects/003-frontend-design-toolkit/code/build-understanding-map.mjs` 重新生成；使用与浏览器检查相同的 Playwright / Edge 环境。

“这个库的实际价值”页面由 practice.js / practice.css 提供，用同一个咖啡首页需求串联设计 Skill、文档检索、Figma 资料连接和浏览器工具四种可选支持。切换资源后，需求保持不变，页面说明接入前提、对应任务指令、模型结合的资料和可核对的使用痕迹。页面不安装工具、不连接账户、不执行模型；没有个人勾选清单或持久化存储。

## 启动

在仓库根目录运行：

```powershell
python -m http.server 8767 --bind 127.0.0.1
```

打开 [本地展厅](http://127.0.0.1:8767/projects/003-frontend-design-toolkit/demo/)。也可以直接打开本目录 [index.html](index.html)。

## 检查

浏览器检查需要 Node.js、Playwright 和 Microsoft Edge；这些只用于检查，不是网页运行依赖。可用 `PLAYWRIGHT_MODULE` 指向现有 Playwright 的 `index.mjs`，或在本地已有可解析的 `playwright` 模块。`CHROME_PATH` 可替代默认 Edge。

在仓库根执行：

```powershell
node projects/003-frontend-design-toolkit/code/verify-demo.mjs
python projects/003-frontend-design-toolkit/code/verify-integration.py
```

前一命令检查页面交互、变量计算样式、响应式与离线打开，并更新展厅真实截图。后一命令使用临时 Git 索引构建 `_site/`，检查三个子项目并保留真实暂存区。记录位于 [notes/evidence](../notes/evidence/)。

联网复查固定来源可运行 `python projects/003-frontend-design-toolkit/code/verify-sources.py`，只记录元数据与哈希。构建后，可运行 `node projects/003-frontend-design-toolkit/code/verify-demo.mjs http://127.0.0.1:8767/_site/003-frontend-design-toolkit/ browser-built-qa.json` 检查编号路径；仓库级回归使用 `node scripts/verify_pages.mjs http://127.0.0.1:8767/_site/`。这些地址仍是本地访问。

## 集成与部署

| 字段 | 当前状态 |
| --- | --- |
| 部署状态 | 部署中 |
| 公网地址 | 未部署 |
| 发布目录 | `003-frontend-design-toolkit/`（规划路径） |
| 发布清单 | 根目录 site-projects.json |
| 构建 | `python scripts/build_site.py`，文件须先纳入 Git |
| 构建产物 | `_site/003-frontend-design-toolkit/` |
| 资源基础路径 | 相对资源；构建器将 demo 页面复制到编号根路径并改写文档路径 |
| 页面路由 | `#overview`、`#capabilities`、`#mechanism`、`#practice`、`#scenarios`、`#evidence` |
| 环境配置 | 浏览无环境变量；检查脚本可使用上述两个路径变量，不含秘密 |

沿用仓库既有 GitHub Pages 方式，不创建独立 Sites 项目。发布时必须保留 001、002；本轮沿用现有工作流发布，公网访问与版本核对完成后更新部署记录。

## 演示边界

- 流程步骤是固定教学内容，切换步骤不执行模型或 MCP。
- 色相实验确实修改 CSS，但不是设计质量提升实验。
- 场景组合是研究建议，页面不自动安装工具。
- 来源链接指向固定版本；本地检查不承诺所有外部平台持续可用。
