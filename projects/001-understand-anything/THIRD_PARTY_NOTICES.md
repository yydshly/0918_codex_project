# 来源与第三方许可

- 上游：[Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything)
- 固定版本：`6df3065f1d8ddc2ce3615314d1d493f36d6b1c80`
- 上游许可证：MIT
- Copyright (c) 2026 Yuxiang Lin
- Copyright (c) 2026 Infinite Universe, Inc.
- 上游完整许可保留在 [licenses/Understand-Anything.LICENSE](licenses/Understand-Anything.LICENSE)。

本子项目没有内嵌上游源码、依赖或构建目录。复现实验通过外部、固定版本的上游副本调用 TreeSitterPlugin、SQLParser、GraphBuilder、SearchEngine、指纹 / 更新分类 API、图谱校验、buildDiffContext 和结构提取脚本。原始结构与图谱数据作为研究证据保存。

本研究新增内容：小型 TypeScript / SQL 样本、中文注释、实验驱动程序、直接命名导入的样本关系适配、独立静态查看器、浏览器 QA 与中文说明。未修改上游源码。查看器没有打包上游 Dashboard 或其前端依赖，也不宣称等同于上游产品。

根仓库尚未为原创研究内容指定统一开源许可证；上游 MIT 许可证仅说明上游部分，不自动覆盖所有原创研究内容。

新增 `assets/upstream-overview.png`、`upstream-detail.png`、`upstream-tour.png` 是固定版本上游 Dashboard 在本地运行的截图。它们保留原版界面，使用本研究的样本图谱，截图中的上游 UI 部分遵循上游 MIT 许可。其他网站截图可能包含这些原版截图，来源分类见 assets/README.md。

`assets/gallery-domain.png`、`gallery-domain-detail.png`、`gallery-knowledge.png`、`gallery-design.png` 同样是未修改的上游界面运行截图；输入为研究者原创的领域、Wiki、设计 JSON。图谱展厅中的 SVG 关系示意为本研究原创，不是上游截图。上述上游 UI 部分继续适用已保留的 MIT 声明。
