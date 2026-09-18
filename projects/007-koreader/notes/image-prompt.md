# 能力总览图内容与设计提示词

下面保存最初用于内置 image_gen 工具的完整内容与设计提示词。两次调用均因网络错误失败，没有生成可用图片；未使用 CLI/API 生图通道。

最终改为本地程序绘制同一主题的信息图，按版面调整了部分文案，输出 PNG 与 SVG；最终文字以图片及 [render_map.py](render_map.py) 为准。图形属于原创效果示意，不是真实产品截图，具体效果未实测。

```text
Use case: infographic-diagram.
Create ONE complete high-resolution landscape Chinese infographic for a GitHub research repository, target 3840×2560 or comparable high resolution, aspect ratio 3:2. The image must be an excellent readable editorial knowledge poster, visually rich but clear, suitable for zooming. Topic: KOReader capability overview, reading outcomes, implementation and relevance to the user's Windows-first open source research. This is a conceptual explanatory graphic, NOT a real product screenshot.

Style: refined publishing / technical field guide, warm ivory paper, ink-black Chinese sans-serif typography, dark teal section headers, muted amber highlights, thin precise line illustrations of books, pages and e-ink readers. Very legible Simplified Chinese, roomy margins, consistent typography, no invented logos, no photoreal screenshots. Large title, clear reading order. Illustrations should explain, not merely decorate. Show actual before/after page-layout concepts using simple gray text lines, arrows and book page thumbnails, explicitly marked 示意.

LAYOUT:
Header 12% height, beneath it two upper columns for capabilities (left ~58% width) and outcome mini-illustrations (right ~42%). Below those a compact horizontal architecture flow. Bottom a platform strip and a prominent user-value panel. Plenty of whitespace and disciplined alignment, no sprawling spaghetti arrows.

EXACT TEXT to include, all Simplified Chinese, preserve terminology:
Header:
"KOReader"
"能力、阅读效果与对我的意义"
"让电子书、论文和扫描文档，更适合小屏与墨水屏阅读"

Capabilities section heading: "01  能做什么"
Six numbered grouped cards, each with clear icon and two small lines:
"多格式阅读"
"EPUB · FB2 · MOBI · TXT · HTML · DOC · RTF · CHM"
"PDF · DjVu · CBZ / CBT 漫画"
"自由排版"
"字体 / 字号 / 行距 / 页边距 / CSS 样式"
"让文字按屏幕宽度重新换行、分页"
"PDF 与扫描件"
"裁白边 / 缩放 / 分栏 / 重排 / 倾斜校正"
"OCR 辅助识字；效果取决于文档与语言数据"
"阅读与学习"
"目录 / 搜索 / 书签 / 高亮 / 笔记导出"
"词典 / 维基百科 / 翻译 / 生词学习"
"书库与同步"
"Calibre / OPDS / Wallabag / RSS"
"跨设备进度同步；不等于整本书自动同步"
"墨水屏与扩展"
"刷新策略 / 对比度 / 手势 / 阅读统计"
"Lua 插件；联网功能需服务与网络"

Outcome section heading: "02  会有什么效果"
Three before→after visual panels with line art:
A two-column A4 page full of tiny lines, turning into an e-reader with a large single column. Labels:
"大页论文 → 窄屏阅读"
"裁边、分栏或重排，减少缩放拖动"
A tight small-font ebook page next to the same content in larger lines:
"固定显示习惯 → 自定义版式"
"字号变大，内容重新换行与分页"
An underlined word in a page opening a dictionary card and small notes card:
"只读内容 → 查词与摘录"
"阅读中查询、标记，再导出笔记"
Below:
"以上均为效果示意，非真实运行截图"
"复杂表格、公式与扫描件需逐份检查；OCR 可能出错"

Architecture section heading: "03  底层怎样实现"
Use a precise left-to-right flow with one grouped engine block:
"Lua / LuaJIT" small subline "界面、阅读逻辑、插件"
→ "原生文档引擎" sublines "CREngine：流式排版" "MuPDF / DjVuLibre：固定页面"
→ "设备适配" subline "绘制、输入、刷新"
Under engine block a connected auxiliary node:
"K2pdfopt：版面分析与重排"
small technical note:
"扫描件可按图像区域重排；重排不等于 OCR"

Platform strip heading: "04  在哪里使用"
"Android · Linux · Kindle · Kobo · PocketBook · reMarkable · Cervantes"
"具体机型需适配；v2026.07.1 官方无 Windows 原生安装包"

User value bottom panel heading: "05  对我的意义"
Three concise columns:
"当前 Windows 使用"
"直接使用价值有限"
"暂不为体验而增加 Linux 环境"
"有阅读设备时"
"适合长文、论文和扫描书"
"重视排版自由与本地阅读时再评估"
"开源项目研究"
"值得参考的工程设计"
"多引擎整合、插件体系、低性能设备优化"
Bottom conclusion highlight:
"当前选择：保留研究资料与能力图，暂不安装"
Footer:
"007 · 开源项目研究 | 文档与源码分析，未实测 | v2026.07.1 | 2026-09-18"
"github.com/koreader/koreader · koreader.rocks/user_guide"

Constraints: This is ONE unified infographic. Do not invent benchmark numbers, speed claims, deployment URLs, verified test claims, AI features, Windows support, or official certification. Do not show a mock interface as if it were a screenshot. All Chinese characters must be accurate, crisp and readable. Architecture must not imply every EPUB passes through K2pdfopt. Make the user-value panel visually prominent, not an afterthought.
```
