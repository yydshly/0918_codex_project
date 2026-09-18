# 研究记录

## 环境与版本

2026-09-18，Windows 主机已有 WSL2 Ubuntu-22.04（Ubuntu 22.04.5 LTS，x86_64）。上游版本 v2026.07.1，commit 9192014d8bd82a91dc1012473be0f238dedfdb54。

下载 koreader-linux-x86_64-v2026.07.1.tar.xz，校验 SHA-256 为 299aadb28147a25e9432ced1214ea444a4184393b5ae97cf42402c8a61b1a1b0，与官方发布摘要匹配。包要求 GLIBC >= 2.35。

## 已执行与暂停原因

已检查 WSL、下载解压官方包。曾发起 apt 软件索引更新及依赖安装串联命令，目标为 xvfb、x11vnc、novnc、websockify、libsdl2-2.0-0、xdotool、x11-utils。用户中断后提出暂时不安装，流程已停止。

停止后检查：没有 apt-get、dpkg 或 luajit 进程；apt 历史没有本次新增安装事务，目标包查询没有已安装条目。未完成依赖安装，未启动 KOReader 或浏览器窗口，未保存产品截图。

用户关注 Windows 运行条件，暂缓 WSL 方案。该版本官方资产没有 Windows 原生安装包。

## 结论与边界

用户最终决定不安装，并要求清理相关产物。已将 `.runtime/` 下载与解压目录移入 Windows 回收站；永久递归删除曾被自动策略拦截，采用可恢复方式成功完成。按 ctime 精确清理本次 apt 更新在 2026-09-18 19:10—19:12 产生的 25 个临时索引文件，未删除既有正式索引或软件。

静态研究已形成[能力图与价值解读](understanding.md)，并补充此前讨论的大文件打开机制、缓存与性能边界。按用户要求只整理已有理解，不继续安装、增加大文件实验或扩展研究，本轮归档。未部署网站，不添加规划中的链接。

Lua 应用层接入原生引擎：CREngine 流式排版，MuPDF / DjVuLibre 固定页面，K2pdfopt 版面分析与重排。设备层负责输入、缓冲区输出与刷新策略。

结论来自官方文档和源码阅读。排版、PDF 重排、翻页、OCR、插件及墨水屏效果均未实测。

参考：https://github.com/koreader/koreader-base 、https://koreader.rocks/doc/ 、https://www.willus.com/k2pdfopt/
