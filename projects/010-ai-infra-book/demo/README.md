# AI Infra Book 中文导览网页

静态 HTML / CSS / JavaScript，无安装步骤和前端构建依赖。四条学习路线支持章节高亮、网址状态、刷新及前进后退；其他内容和全部章节链接可在禁用 JavaScript 时阅读。

## 本地预览

仓库根目录执行：

```powershell
python -m http.server 8770 --bind 127.0.0.1
```

访问 `http://127.0.0.1:8770/projects/010-ai-infra-book/demo/`。可直接打开 `index.html`；自动复制需要浏览器允许剪贴板访问，拒绝时页面提示手动复制。

## 检查

检查工具需要 Node.js、Playwright 和 Edge。将 `PLAYWRIGHT_MODULE` 设置为已安装的 Playwright `index.mjs` 绝对路径，然后在仓库根运行：

```powershell
node projects/010-ai-infra-book/code/verify_guide.mjs http://127.0.0.1:8770/projects/010-ai-infra-book/demo/ browser.json --screenshots
```

截图仅通过 `--screenshots` 更新。检查结果写入 `notes/evidence/`，只验证本项目网页，不运行上游程序或实验。

## 总站集成

已登记 `site-projects.json`，编号子路径为 `010-ai-infra-book/`。沿用现有 `scripts/build_site.py`，不新增根应用。构建器只复制 Git 跟踪的文件；本地检查用临时 Git 索引纳入新文件，不改变真实暂存区。正式发布时需要先将项目文件纳入 Git。

构建输出 `_site/010-ai-infra-book/`，包括编号入口和原始 `demo/` 入口。资源全部为相对路径；静态正文无外部字体、CDN 或运行时请求。

```powershell
python scripts/build_site.py
node projects/010-ai-infra-book/code/verify_guide.mjs http://127.0.0.1:8770/_site/010-ai-infra-book/ integration.json
```

状态：本地验证，未部署。网页引导链接到原书的在线网站，该网站不属于本项目部署。

[研究说明](../README.md) · [本地证据](../notes/evidence/browser.json) · [集成证据](../notes/evidence/integration.json)

## 一图理解

首页的“一图理解”区展示完整中文概念图；`overview.html` 提供独立查看器，支持缩放、适应窗口、原始大小、图内滚动及原图下载。完整文字版位于 `notes/understanding.md`，图中区分书籍能力和待执行的实践建议。图像检查已加入现有验证脚本，覆盖桌面和手机的图像加载、缩放、适应与页面溢出。
