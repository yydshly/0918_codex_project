# 中文资源导航网页

将 awesome-ceo 的固定版本 README 整理为可浏览的中文资源网页。全部 85 条资源、86 个内容链接、11 个分类和 13 处作者附注译文均已收录。每条包含中文标题、中文导读、英文原标题、来源及原站入口。

## 使用

- 首页先展示“一图看懂”，独立 `overview.html` 提供放大、缩小、适应窗口与原图下载；手机可在图内滚动查看。
- 图下将全部资源分为六组：文章/指南/问答 45、书籍/课程 11、目录 13、案例 6、框架/清单 4、模板/工具/演示/视频 6。点击分组可查看对应条目，之后仍可用关键词继续筛选；切换细分类型会清除大组限制。
- 默认完整显示全部资源，保留上游顺序；分类导航与类型筛选可缩小范围。
- 搜索支持中文、英文、作者、来源域名及导读关键词，多个词按同时满足处理。
- 展开“分类汇总”可查看 11 个分类的内容概况；展开条目附注可阅读原作者推荐语的中文译文。
- 分类和搜索状态写入网址片段，支持刷新保留与浏览器前进、后退。
- 页面静态保存全部内容；不启用 JavaScript 仍能阅读和打开原始资源，动态筛选需要 JavaScript。

中文导读根据 README 标题和附注归纳，不是外部文章的全文翻译。资源类型由本项目作阅读分类；未逐项测试外链、登录或收费条件。原清单的钱袋符号保留为原始标记。书名译法用于识别，出版版本以原始信息为准。

## 启动与构建

这是独立 HTML、CSS 与 JavaScript 网页，浏览不需要安装前端依赖或配置密钥。可直接打开本目录的 `index.html`，也可在仓库根目录执行：

```powershell
python -m http.server 8769 --bind 127.0.0.1
```

浏览器访问 `http://127.0.0.1:8769/projects/009-awesome-ceo/demo/`。这是本机预览地址，不是公网部署地址。

修改中文内容后，在仓库根执行：

```powershell
python projects/009-awesome-ceo/code/build_catalog.py
```

生成器只依赖 Python 标准库；从固定 README 快照提取原始条目、署名和链接，结合 `code/translations.json`、`code/author-notes.json`、`code/type-groups.json` 与 `code/template.html` 输出网页和 `notes/catalog.json`。更新上游版本时，应重新对齐中文翻译顺序及核验分类数量。生成器同时检查类型分组互斥、数量合计与目录一致。

## 验证

浏览器检查使用 Node.js、Playwright 与本机 Edge。将 `PLAYWRIGHT_MODULE` 设置为已安装的 Playwright 模块入口，然后运行：

```powershell
node projects/009-awesome-ceo/code/verify_catalog.mjs http://127.0.0.1:8769/projects/009-awesome-ceo/demo/ browser.json --screenshots
```

检查资源完整性、中文内容、分类数量、搜索、类型组合、空状态、刷新、附注展开、双链接、手机布局、键盘操作和禁用 JavaScript 时的阅读。`--screenshots` 会更新真实桌面和手机截图；不访问条目指向的外部服务。

## 展厅集成与状态

已加入根 `site-projects.json`，使用编号子路径 `009-awesome-ceo/`。现有构建器将网页与项目资料一起复制到 `_site/009-awesome-ceo/`，原始目录结构也保留。开发预览可使用临时 Git 索引纳入新文件，避免改变实际暂存区；正式发布前需将所需文件纳入 Git。

状态：本地网页已验证，未发布到公网。没有填写计划中的公网地址。既有七个演示保留在清单中。

[本地验证记录](../notes/evidence/browser.json) · [集成验证记录](../notes/evidence/integration.json) · [截图来源](../assets/README.md) · [返回项目](../README.md)
