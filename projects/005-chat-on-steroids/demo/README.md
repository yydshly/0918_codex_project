# 005 · 交互研究展厅

原生 HTML / CSS / JavaScript，无运行依赖、后端、账号或 API。可直接打开 [index.html](index.html)，或者在仓库根运行 `python -m http.server 8767 --bind 127.0.0.1`，访问 [本地展厅](http://127.0.0.1:8767/projects/005-chat-on-steroids/demo/)。已有该端口服务时复用。

## 展示内容

- 总览：本地工作台、网页对话和云端推理的分工；切换两种驱动，明确本机扩展桥接与云端 MCP 隧道。
- 一图总览：中文概念图，可在 100%—300% 间缩放，滚动查看、恢复适应宽度或打开原图。
- 能力：八类能力、使用前提、实现入口与限制。
- 流程：固定的登录修复样本，可逐步查看成功或连接受阻分支。
- Codex 与价值：同类能力的重叠、产品入口差异、面向我们当前工作的判断。
- 来源：固定提交、源码入口、文档差异及本次验证边界。

路由使用 `#overview`、`#map`、`#capabilities`、`#workflow`、`#value`、`#evidence`，支持深链接、刷新和浏览器返回。交互只改变展示内容，不连接 ChatGPT，不执行任何真实浏览器、文件或终端操作。

## 可复现检查

在仓库根执行：

```powershell
python projects/005-chat-on-steroids/code/verify-sources.py
node projects/005-chat-on-steroids/code/verify-demo.mjs
python projects/005-chat-on-steroids/code/verify-integration.py
node projects/005-chat-on-steroids/code/verify-demo.mjs http://127.0.0.1:8767/_site/005-chat-on-steroids/ browser-built-qa.json
```

浏览器检查依赖现有 Node.js、Playwright 和 Edge；`PLAYWRIGHT_MODULE` 可指向现有 Playwright 的 `index.mjs`，`CHROME_PATH` 可指定浏览器。它们只用于检查，不是页面依赖。脚本检查交互分支、路由恢复、键盘操作、资源、手机布局及 file:// 打开，并保存证据与截图。来源检查需要网络，仅保存哈希和许可声明。

## 总站集成

| 字段 | 状态 |
| --- | --- |
| 公网部署 | 部署中；验证成功后记录实际地址 |
| 清单 | 根目录 `site-projects.json` |
| 编号子路径 | `005-chat-on-steroids/` |
| 构建输出 | `_site/005-chat-on-steroids/` |
| 总站构建 | `python scripts/build_site.py`，只复制已跟踪文件 |
| 新文件本地检查 | `verify-integration.py` 使用临时 Git 索引，保留真实暂存区 |
| 路径策略 | demo 使用相对资源；构建器将页面提升到编号根路径并改写资源 |
| 发布方式 | 沿用现有 GitHub Pages 工作流，main 更新自动构建全部五个展厅 |

集成检查保留全部既有展厅。`build.json` 的 commit 是工作树基线，不代表这些未提交改动已经发布；证据另外标注 working tree 与未部署状态。
