# 图片来源

`understanding-map.png` 与 `understanding-map.svg`：同一张原创中文能力总览图的高清 PNG 和可缩放 SVG，尺寸 3000 × 2200。内容依据 KOReader 官方文档和源码研究编排，包含核心能力、阅读效果示意、底层分工、支持平台以及对当前用户的意义。

页面与查词图形均为解释性插图，不是真实产品截图。没有本机、Android 或墨水屏设备实测。图中 Windows 原生发行情况对应 v2026.07.1。

- 生成日期：2026-09-18。
- 最终方式：本地程序绘制图形和文字，同时输出 PNG / SVG；图中文字可核对，矢量元素可编辑。
- 生图尝试：曾使用 imagegen 技能调用内置工具两次，均遇到网络错误，没有返回图片；未使用需要 API 密钥的 CLI 通道。
- [原始内容与设计提示词（失败尝试记录）](../notes/image-prompt.md)。
- [可复现制图源码](../notes/render_map.py)，需要 Pillow 与 Windows 微软雅黑字体。
- [文字版解读与来源](../notes/understanding.md)。
- 上游项目：[koreader/koreader](https://github.com/koreader/koreader)，AGPL-3.0。
- 用户指南：[koreader.rocks/user_guide](https://koreader.rocks/user_guide/)。

未截取、复制官方截图，也未复制上游图形素材。模板占位图已移除。PNG 已目视核对文字、分区、布局和说明边界；SVG 保留相同内容，字体由查看环境提供。
