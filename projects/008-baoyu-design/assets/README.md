# 图片与产物来源

| 文件 | 来源 | 说明 |
| --- | --- | --- |
| cover.png | 本地浏览器实际截图，2026-09-18 | 1440×1080 视口的拾页原型；不是上游官网截图 |
| mobile.png | 本地浏览器实际截图，2026-09-18 | 390×844 视口的移动布局 |
| deck.png | 本地浏览器实际截图，2026-09-18 | 原版 deck-stage 播放本项目的幻灯片 |
| design-system.png | 本地浏览器实际截图，2026-09-18 | 原版 build-preview 生成页面，包含可交互的编译组件 |

没有使用占位封面或 AI 生成产品截图。页面文章封面是原创 CSS 几何图案，用来区分演示内容，不代表实际文章素材。

## 完整理解引导图

- `understanding-map.svg`：1800 × 4065，可缩放且文字可编辑。
- `understanding-map.png`：3600 × 8130，高清分享版本。
- 两者均为原创研究图，非上游截图或效果对照。内容依据固定版本 `026d4ea` 的入口、任务映射、总体规则和 53 份专项说明，分类及研究意义为我们的归纳。
- 由 `code/build-understanding-map.py` 使用 Pillow 与 Windows 系统微软雅黑字体生成；不分发字体文件。目录数据与网页共用 `code/understanding-data.json`。
- 来源与验证见 `notes/evidence/understanding-map.json`；53 个文件名不等于 53 个独立功能。
