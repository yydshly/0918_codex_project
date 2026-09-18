# 第三方来源与许可证

## baoyu-design

- 来源：https://github.com/JimLiu/baoyu-design
- 版本：026d4ea012bdd5cada72ac8cc13f21ba4edf2245
- 声明：MIT，Copyright (c) 2026 Jim Liu 宝玉。
- 完整许可：[licenses/baoyu-design.LICENSE](licenses/baoyu-design.LICENSE)。
- `demo/deck-stage.js` 原样复制自 `skills/baoyu-design/starter-components/deck-stage.js`，未修改。
- 设计系统 bundle、manifest、检查配置、preview 和 `_ds_prompt.md` 由原版工具生成；保留生成标记。研究报告记录工具版本与使用范围。
- 上游整库在仓库外临时目录执行；未将 `.git`、依赖目录、整库 vendor 或导出器构建缓存提交到本项目。

## React / ReactDOM

- 版本：18.3.1；来自该上游固定版本中内置的 React 生产 UMD 文件。
- MIT，Copyright (c) Meta Platforms, Inc. and affiliates。
- 完整许可：[licenses/react.LICENSE](licenses/react.LICENSE)。两个 UMD 文件自身包含许可注释，生成的单文件预览也包含这些运行时代码。

## 本项目原创部分

拾页品牌、原型交互、Reader Kit 组件源文件、样本文章、演示文稿内容及研究说明由本次任务创作。封面几何图形通过 CSS 实现，不是产品照片或外部文章截图。未引入远程图片、品牌字体或 API 密钥。

PPTX 使用上游导出器生成；导出器依赖未分发为应用依赖。根仓库尚未为原创内容指定统一开源许可证。
