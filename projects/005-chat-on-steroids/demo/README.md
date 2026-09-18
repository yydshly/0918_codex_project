# 005 · 交互研究展厅

原生 HTML / CSS / JavaScript，无运行依赖、后端、账号或 API。可直接打开 [index.html](index.html)，或者在仓库根运行 `python -m http.server 8767 --bind 127.0.0.1`，访问 [本地展厅](http://127.0.0.1:8767/projects/005-chat-on-steroids/demo/)。已有该端口服务时复用。

已上线：[在线展厅](https://yydshly.github.io/0918_codex_project/005-chat-on-steroids/) · [一图总览](https://yydshly.github.io/0918_codex_project/005-chat-on-steroids/#map)。2026-09-18 完成首次公网验证，核心摘要为“把网页版 ChatGPT 与真实本地环境关联起来，并围绕它构建 Agent 能力”。

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
| 公网部署 | 已上线并验证，地址见上方 |
| 首次验证版本 | `3b125a880ba9fa26960ea14742cd529f086c182e` |
| 清单 | 根目录 `site-projects.json` |
| 编号子路径 | `005-chat-on-steroids/` |
| 构建输出 | `_site/005-chat-on-steroids/` |
| 总站构建 | `python scripts/build_site.py`，只复制已跟踪文件 |
| 新文件本地检查 | `verify-integration.py` 使用临时 Git 索引，保留真实暂存区 |
| 路径策略 | demo 使用相对资源；构建器将页面提升到编号根路径并改写资源 |
| 发布方式 | 沿用现有 GitHub Pages 工作流，main 更新自动构建全部五个展厅 |

集成检查保留全部既有展厅。本地临时索引构建的 `build.json` 只表示工作树基线；线上 `build.json` 记录实际发布的提交。[首次公网记录](../notes/evidence/deployment.json)核对发布版本、五个入口、总站摘要、图像字节一致性与交互。后续记录同步提交不会回写首次验证版本。再次验证可设置 `EXPECTED_COMMIT` 为需要检查的完整提交，并运行：

```powershell
node projects/005-chat-on-steroids/code/verify-demo.mjs https://yydshly.github.io/0918_codex_project/005-chat-on-steroids/ deployment.json
```

公网浏览器验证不等于上游 Agent、模型、扩展或隧道已经实测。

既有 001—003 的专项公网交互回归也已通过，见[全站回归记录](../notes/evidence/public-site-qa.json)。首次检查在旧展厅导航时超过 60 秒，使用既有检查器的 `RESOURCE_TIMEOUT_MS=120000` 重试后完成；没有因此修改旧展厅代码。
