# 总览图内容与视觉设计记录

以下是最初用于内置 image_gen 的生成提示；两次请求均因网络错误失败，没有取得图像。最终交付采用 `code/build_map.py` 原创 SVG 排版，再通过浏览器渲染为 3000 × 2280 PNG；内容沿用下方文案，布局以最终矢量图为准。未使用 CLI/API 图像生成备用方案。

Use case: infographic-diagram. Create ONE polished, high-resolution Chinese editorial infographic for an existing open-source research website. Landscape 3:2 canvas, preferably 3000x2000 or similar high resolution. Cream paper background, deep teal typography, sage green panels, restrained burnt orange accents, thin rules, generous margins, crisp highly legible Simplified Chinese sans-serif type. Professional publication-quality information design, not a website screenshot. Use small purposeful line icons for book, code, learning, practice and research. Make actual content dominant, no decorative filler. Clear reading order top to bottom, subtle arrows, no crossing lines. Do not render fake software UI or original book cover.

The central idea must be instantly obvious: two intertwined threads, learning HOW to learn and learning Python as the practice vehicle. The repository itself is a book plus runnable educational notebooks, NOT an autonomous tool or full professional course. Every visible line below must be rendered accurately in Chinese; do not add invented claims, quotes, metrics, or facts.

LAYOUT AND EXACT COPY:
Top header with small label "011 / 开源项目研究" and large title "一图读懂《自学是门手艺》"
Subtitle "通过自学 Python，练习如何独立学会新知识。"
Small source descriptor "李笑来著 · 自学方法 + Python 入门实践 · 面向新手，也适合学习陌生领域"

Main top zone: TWO equally prominent connected columns, with connection label "方法指导实践，实践提供反馈".
Left title "主线一：教你如何学"
Three rows:
"阅读与理解" — "带着问题阅读；接受暂时不懂；重读、整理概念"
"练习与拆解" — "找出自己的薄弱点；拆成小任务；变化输入反复练习"
"查证与表达" — "查官方文档；清楚提问；记录过程；解释成果"
Bottom of left panel "目标：从依赖带教，走向独立学习"

Right title "主线二：用 Python 学着做"
Three rows:
"基础阅读" — "值与运算、分支循环、字符串、容器、文件"
"独立编写" — "函数与参数、递归、文档、模块、测试、程序入口"
"进一步理解" — "类、迭代器、生成器、装饰器、正则、BNF / EBNF"
Bottom of right panel "目标：从看懂例子，走向写出小工具"

Middle full-width compact learning progression title "它采用的方法：学 → 练 → 用 → 造"
4 horizontally connected blocks:
"学｜建立理解" + "读文档、记疑问、梳理关系"
"练｜修正薄弱点" + "预测结果、动手验证、复盘错误"
"用｜解决小问题" + "从小函数开始，以用带练"
"造｜完成一个作品" + "组合、说明、分享、接受反馈"
A return arrow underneath from final to first with label "发现新问题，开始下一轮"

Next row two panels:
Left title "仓库提供什么"
"按章节组织的书籍正文"
"Markdown：直接阅读"
"Jupyter Notebook：文字 + 代码 + 输出"
"配套示例、工具附录与延伸阅读"
Right title "能力范围到哪里"
"建立自学方法与 Python 基础，衔接官方文档"
"涵盖学习、编程、资料检索与沟通协作"
"不覆盖完整职业开发、Web、数据科学或 AI 工程训练"
"读完不等于熟练，掌握要靠独立实践"

Bottom main zone with light orange tint title "对我们的意义：把研究过程做扎实"
Three clean compact columns:
"研究陌生项目" + "读说明 → 拆出最小例子 → 验证 → 记录结论"
"学习新工具" + "先完成一个小任务，再补缺失知识，减少只收藏不实践"
"与 AI 协作" + "让 AI 解释与提示；自己判断、运行和复核结果"
Small clear note directly beneath "我们的使用判断：主要价值在学习方法；已有编程基础可按需查阅，Python 部分作为入门复习。"

Bottom footer, legible but subordinate:
"来源：selfteaching/the-craft-of-selfteaching · 研究版本 987a8e8 · 原书许可 CC BY-NC-ND 3.0"
"本图为独立归纳，非原书插图；“对我们的意义”为本项目建议。部分工具配置具有历史性，上游 Notebook 未在本项目运行。"

Check all Chinese glyphs and section titles for perfect spelling, ensure nothing clipped. Keep labels and body large enough to read when opened at full resolution. Consistent compact hierarchy, all panels align. Do not include any browser chrome, photo background, watermarks or additional slogans.
