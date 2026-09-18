# 图片来源

- `cover.png`：本项目网页在 Edge 无头浏览器中、1440 × 1000 视口的真实首页截图。
- `mobile.png`：本项目网页在 Edge 无头浏览器中、390 × 844 视口的真实首页截图。
- `guide-detail.png`：桌面视口的学习路线截图，展示四条路线及分步引导。

截图由 `code/verify_guide.mjs --screenshots` 生成。网页中的学习循环为原创 CSS 图形，非原书封面、非上游产品截图；没有引入原书图片或外部图片素材。

## 能力与学习总览图

- `understanding-map.png`：由原创 SVG 排版经浏览器渲染的 3000 × 2280 中文信息图，说明两条主线、学习方法、仓库材料、能力范围与对我们的意义；非原书封面或插图。
- `understanding-map.svg`：可缩放矢量原图，由 `code/build_map.py` 生成；PNG 通过 `code/render_map.mjs` 渲染。
- `understanding-map.prompt.md`：内容与视觉设计记录。内置 ImageGen 两次因网络错误失败，最终采用原创矢量排版，没有使用失败调用的输出。
- 原著李笑来，来源 `selfteaching/the-craft-of-selfteaching`，固定提交 `987a8e8a9ce205b63886510e145437d14d8a13a4`；原书声明 CC BY-NC-ND 3.0。
- “对我们的意义”与 AI 协作说明为本项目延伸建议。没有复制原书图片或把图当作运行证据，上游 Notebook 未运行。

配套 [文字说明](../notes/understanding.md) 与 [放大查看页](../demo/overview.html)。
