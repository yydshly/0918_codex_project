# 网页运行说明

原生 HTML、CSS、JavaScript，无安装依赖、无构建步骤、无远程脚本或字体。普通浏览器可以打开 `index.html`；完整检查推荐使用本地 HTTP 服务。

在仓库根目录执行：

```powershell
python -m http.server 8912 --bind 127.0.0.1
```

打开 [本地网页](http://127.0.0.1:8912/projects/012-agent-extension-lab/demo/)。端口是本次本地预览配置，不是公网部署地址。

## 页面结构

- `index.html`：八章说明及四个模拟界面。
- `data.js`：40 个产品方向、六种观察方法、资料来源。
- `styles.css`：布局、原创 CSS 像素角色与减少动画适配。
- `app.js`：筛选、导出、状态模拟、游戏和验收交互。

刷新页面会重置模拟状态。导出当前筛选结果为 Markdown 文件。浏览器后台或离开办公室选项卡会暂停自动回放。模拟中确认权限只影响本页状态，不授予真实执行权限。

## 自动化验证

需要 Node.js、Playwright 和已安装的 Microsoft Edge。复用现有环境，不增加根依赖。在仓库根目录执行：

```powershell
$env:PLAYWRIGHT_MODULE = '本机 playwright/index.mjs 的绝对路径'
node projects/012-agent-extension-lab/code/verify.mjs
```

验证覆盖联合筛选、实际下载内容、Hook 三分支、办公室暂停/恢复/故障、游戏配对与暂停、验收样本、键盘和响应式布局。输出截图到 `assets/`，检查记录到 `notes/evidence/browser.json`。

## 编号站点集成

`site-projects.json` 已登记 `012-agent-extension-lab`。沿用根目录 `scripts/build_site.py`，输出 `_site/012-agent-extension-lab/`；构建器仅复制 Git 索引中的文件，新文件需先被索引收录。本次本地集成使用临时索引，不修改真实暂存区。

```powershell
python scripts/build_site.py
node projects/012-agent-extension-lab/code/verify.mjs http://127.0.0.1:8912/_site/012-agent-extension-lab/
```

第二条检查编号入口下的资源和交互，结果写入 `notes/evidence/integration.json`。实际部署状态为未部署；本地构建通过不代表公网可用。无环境密钥，也无真实 Agent 后端。
