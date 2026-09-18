# 008 演示运行与复现

**状态：本地已验证，未部署。** 成品已经登记在根 `site-projects.json`，未推送或触发 Pages 发布。

## 查看成品

在仓库根目录：

```powershell
python -m http.server 8878 --bind 127.0.0.1
```

访问 <http://127.0.0.1:8878/projects/008-baoyu-design/demo/>。页面支持电脑和手机。无需 npm 安装；React、舞台组件、设计系统与下载文件都在本项目中。

主页面加载 CSS 与 JS，需通过 HTTP 查看。`code/reader-kit/preview.html` 由上游生成，依赖已内联，可独立分享。PPTX 在 `demo/downloads/shiye-design.pptx`。

## 重建交付文件

需要 Node.js（本次 v22.15.0），以及放在仓库外的上游固定版本 checkout：

```powershell
# 替换为自己的仓库外路径；本项目不提交嵌套克隆。
git clone https://github.com/JimLiu/baoyu-design.git C:/Temp/baoyu-design
git -C C:/Temp/baoyu-design checkout 026d4ea012bdd5cada72ac8cc13f21ba4edf2245
powershell -File projects/008-baoyu-design/code/reproduce.ps1 -UpstreamDir C:/Temp/baoyu-design
```

该脚本检查上游版本后依次编译、检查、生成预览、导入设计系统、编译原型并登记交付文件；不会安装全局 Skill。主要产物是 `_ds_bundle.js`、`_ds_manifest.json`、`_adherence.oxlintrc.json`、`preview.html`、`demo/_ds/`、`demo/app.js` 和 `demo/_d_meta.json`。

## 重建 PPTX

继续保持本地 HTTP 服务运行。在上游 checkout 的 `skills/baoyu-design/agents/gen-pptx/` 执行一次：

```powershell
npm ci --no-audit --no-fund
npx playwright install chromium
npm run build
```

然后回到本研究仓库根目录：

```powershell
node C:/Temp/baoyu-design/skills/baoyu-design/agents/gen-pptx/dist/cli.mjs --url http://127.0.0.1:8878/projects/008-baoyu-design/demo/deck.html --config projects/008-baoyu-design/code/pptx-config.json --out projects/008-baoyu-design/demo/downloads
python projects/008-baoyu-design/code/verify_artifacts.py
```

预期 4 页、3 个动画。没有讲者备注是预期提示；不能忽略字体、图片或尺寸相关的新警告。

## 总站集成

根构建器只复制 Git 跟踪文件。已跟踪后执行：

```powershell
python scripts/build_site.py
```

输出 `_site/008-baoyu-design/`，还保留原始 `demo/` 路径。新增 `demoAssetDirs` 清单字段，仅重写根部入口的 `_ds`、`vendor` 和 `downloads` 资源路径，原始 demo 不变。001—006 的现有构建行为保持不变。

本地未提交检查使用 `code/check_integration.py` 创建临时 Git 索引，不改变用户真实暂存区。它运行现有构建器并检查所有项目入口及 008 的本地资源链接。

```powershell
python projects/008-baoyu-design/code/check_integration.py
```

构建成功仅代表本地集成通过，不代表已上线。正式发布继续遵循根 `docs/DEPLOYMENT.md`。

## 理解指南的维护

`#principle` 为“理解与原理”：本质比较、13 类任务选择、执行流程、53 份说明目录、8 类约束和验证边界。内容为原创研究归纳，不触发模型调用。

文档在 `notes/understanding.md`；网页内容在 `code/understanding-data.json` 与 `code/understanding.jsx`，由 `code/build-demo.cjs` 和原型源码一起编译到 `demo/app.js`。修改后运行：

```powershell
node projects/008-baoyu-design/code/build-demo.cjs C:/Temp/baoyu-design
python projects/008-baoyu-design/code/check_integration.py
```

任务映射以固定上游的 `project-types.json` 为准；53 份说明含协议与兼容入口，不应写成 53 个独立功能。网页分组是本研究归纳。

2026-09-18：已逐项核对 13 类路由和 53 个上游文件名，检查任务切换、8 组目录展开、键盘操作、章节链接刷新、桌面/手机显示及总站资源链接。原有三个演示入口正常。见[本轮验证记录](../notes/evidence/understanding.json)。

## 完整引导图与统一约束

`#u-map` 提供完整引导图、100%—500% 缩放、适合宽度和 PNG/SVG 链接；`#u-unified` 说明通用规则、项目规范、专项 Skill、代码工具和反馈五层约束。直接链接与刷新均应保持对应章节。

修改目录后，运行 `python projects/008-baoyu-design/code/build-understanding-map.py` 重建图，再运行前述网页编译与总站集成检查。图生成器需要 Pillow 与 Windows 微软雅黑字体，输出 SVG 和 2 倍 PNG。

完整图与本轮网页检查记录：[understanding-map.json](../notes/evidence/understanding-map.json)。已检查图中文字、目录完整性、SVG 边界、手机和桌面布局、缩放上限与重置、章节刷新和构建后图片路径。
