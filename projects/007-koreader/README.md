# 007 · KOReader

面向电子墨水屏优化的多格式阅读器，研究流式排版、PDF 重排及设备适配。

| 项目 | 记录 |
| --- | --- |
| 上游 | [koreader/koreader](https://github.com/koreader/koreader) |
| 许可证 | AGPL-3.0；第三方组件保留各自许可证 |
| 版本 | `v2026.07.1` · `9192014d8bd82a91dc1012473be0f238dedfdb54` |
| 收录日期 | 2026-09-18 |
| 进度 | 已归档（静态研究与能力图；安装取消，上游未实测） |
| 在线演示 | 未部署 |

## 能力与原理

![KOReader 能力、阅读效果、底层实现、支持环境和对我们的意义](assets/understanding-map.png)

图为原创能力与效果示意，非真实运行截图。当前 Windows 环境直接使用价值有限；有阅读设备后可评估，现阶段保留多引擎整合、插件与墨水屏优化的工程参考。[查看高清图](assets/understanding-map.png) · [可缩放 SVG](assets/understanding-map.svg) · [完整图文解读](notes/understanding.md)。

支持 EPUB、PDF、DjVu 等格式，提供字体、行距、页边距、查词、高亮和插件。Lua / LuaJIT 负责界面与阅读逻辑，CREngine 负责流式排版，MuPDF / DjVuLibre 处理固定页面，K2pdfopt 提供版面分析与重排。设备层处理输入、像素输出及墨水屏刷新。这些是文档和源码分析结论，尚未实测。

## 支持环境

官方支持 Android、Kindle、Kobo、PocketBook、Cervantes、reMarkable 和 Linux，具体机型参考官方安装指南。Ubuntu 只是 Linux 环境的一种选择。

该版本官方发行资产没有 Windows 原生安装包。原计划用本机已有 WSL Ubuntu 22.04.5 运行 Linux 版，并通过浏览器查看真实窗口，未运行验证。

## 关于大文件

能处理较大的书籍，流畅程度取决于格式、页面复杂度、图片分辨率和设备内存。PDF 主要按需渲染页面并复用有限缓存；EPUB 需要解析和排版，并通过磁盘缓存等机制加快后续打开。不能只看文件大小，也不能把缓存预算当作整个应用的内存上限。

我们仅整理了已有源码与文档理解，没有容量上限或性能实测结论。[完整说明与依据](notes/understanding.md#大文件如何打开我们的理解)。

## 本次结果

已创建子项目并完成静态研究，制作一张中文能力总览图。曾下载校验官方 Linux x86_64 包；用户决定不安装后停止准备，KOReader 未启动，没有真实运行截图和演示地址。

清理已完成：下载包和解压目录已移入 Windows 回收站；本次 apt 更新产生的 25 个临时索引文件已删除；没有新增依赖安装事务或遗留应用进程。原有 WSL 环境保留。见[清理记录](notes/evidence/cleanup.json)。未修改上游代码。

[研究记录](notes/research.md) · [版本校验](notes/evidence/upstream.json) · [运行状态](demo/README.md) · [图片来源与提示词](assets/README.md) · [根索引](../../README.md#项目索引)

## 来源

- [版本发布](https://github.com/koreader/koreader/releases/tag/v2026.07.1)
- [Linux 安装指南](https://github.com/koreader/koreader/wiki/Installation-on-desktop-linux)
- [开发文档](https://koreader.rocks/doc/)
- [底层框架](https://github.com/koreader/koreader-base)
