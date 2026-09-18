# 中文学习指南网页

状态：已上线。[能力与学习指南](https://yydshly.github.io/0918_codex_project/011-selfteaching/) · [一图理解](https://yydshly.github.io/0918_codex_project/011-selfteaching/overview.html)。原生 HTML / CSS / JavaScript，无前端依赖，无 CDN、外部字体或运行时请求。所有原书链接固定到研究提交。

## 预览

在仓库根执行：

```powershell
python -m http.server 8770 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8770/projects/011-selfteaching/demo/`，也可直接打开 `index.html`。直接文件模式下持久化是否可用取决于浏览器设置；页面有失败提示。

## 内容维护

- `code/template.html`：静态页面、能力说明、练习与自查。
- `code/chapters.json`：已核对的 46 个章节元数据；生成时合并独立摘要。
- `code/chapter-notes.json`：逐章分类、摘要与练习的维护源，按原书顺序排列；生成时自动同步到 `chapters.json` 与网页。
- `code/routes.json`：四条路线、相关章节和阶段成果。
- `demo/styles.css`、`demo/app.js`：页面样式与浏览器行为。

修改内容后，在仓库根运行：

```powershell
python projects/011-selfteaching/code/build_guide.py
```

产出 `demo/index.html` 与 `demo/data.js`，应随内容一起纳入 Git。无需下载上游即可重建；可选 `--upstream <研究下载目录>` 用于重新采集固定提交的目录和哈希，目录需包含 `commit.txt`、`tree.json`、`markdown/`。整本书下载仅作本地研究，不纳入本项目。

## 交互检查

需要 Node.js、Playwright 和 Edge。将环境变量 `PLAYWRIGHT_MODULE` 指向已安装的 `playwright/index.mjs`，运行：

```powershell
node projects/011-selfteaching/code/verify_guide.mjs http://127.0.0.1:8770/projects/011-selfteaching/demo/ browser.json --screenshots
```

验证章节完整性、路线切换与历史、联合筛选、深链展开、阅读进度、自查、存储恢复和禁用、学习记录导出、手机布局、无 JavaScript 降级和本地资源。截图仅在传入 `--screenshots` 时生成。

## 总站集成

沿用根 `site-projects.json` 与 `scripts/build_site.py`，编号入口 `011-selfteaching/`。不引入根应用或跨项目运行依赖。相对资源路径兼容原始 demo 与编号入口。

```powershell
python scripts/build_site.py
node projects/011-selfteaching/code/verify_guide.mjs http://127.0.0.1:8770/_site/011-selfteaching/ integration.json
```

构建器只复制 Git 跟踪文件。新项目本地构建使用临时 Git 索引，保留真实暂存区；正式发布前需要将文件纳入 Git。构建产物在忽略目录 `_site/`。本地验证不代表已部署，不自动提交或推送。

学习记录使用独立存储键 `selfteaching-guide-011-v1`。所有用户笔记仅作为文本处理，导出为 Markdown；没有后端、账号或云同步。页面不执行 Python。

## 一图总览

首页能力地图嵌入 `assets/understanding-map.png`；`overview.html` 提供适应窗口、放大、缩小、原始尺寸和原图下载。支持手机容器滚动与键盘操作，完整文字见 `notes/understanding.md`。

图像与入口检查：

```powershell
node projects/011-selfteaching/code/verify_map.mjs http://127.0.0.1:8770/projects/011-selfteaching/demo/ map-browser.json
node projects/011-selfteaching/code/verify_map.mjs http://127.0.0.1:8770/_site/011-selfteaching/ map-integration.json
```

检查图像加载与字节一致性、缩放、键盘、下载以及手机适应。图是独立归纳，非原书插图或上游运行截图；已完成公网访问验证。

图像为原创矢量排版，源图 `assets/understanding-map.svg`，可复现生成：

```powershell
python projects/011-selfteaching/code/build_map.py
node projects/011-selfteaching/code/render_map.mjs
```

渲染依赖与检查相同（`PLAYWRIGHT_MODULE`、Edge）。两次内置图像生成请求均因网络错误失败，制作记录已如实注明；未使用原书图片。

## 公网发布记录

首次功能版本 `6abb6e6343cf5922a300cb6ff908fbc855f669f0`，沿用总仓库 Pages 工作流，产物在 `011-selfteaching/`。已核验十项目入口、24 项资源、摘要及图像，见 [部署记录](../notes/evidence/deployment.json)、[线上网页交互](../notes/evidence/remote-browser.json)、[线上图像交互](../notes/evidence/remote-map.json)。

公网检查命令（设置 `PLAYWRIGHT_MODULE` 后执行，可用 `EXPECTED_COMMIT` 核对发布源）：

```powershell
node projects/011-selfteaching/code/verify_deployment.mjs https://yydshly.github.io/0918_codex_project/
node projects/011-selfteaching/code/verify_guide.mjs https://yydshly.github.io/0918_codex_project/011-selfteaching/ remote-browser.json
node projects/011-selfteaching/code/verify_map.mjs https://yydshly.github.io/0918_codex_project/011-selfteaching/ remote-map.json
```

PNG 对照本地原图，公网 SVG 对照部署源提交中的字节，以适应 Git 对文本换行的规范化。
