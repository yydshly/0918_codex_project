# 能力与底层原理：以实际产物验证

研究日期：2026-09-18。上游固定版本：`026d4ea012bdd5cada72ac8cc13f21ba4edf2245`。

完整概念说明见[我们的理解](understanding.md)：包含同类比较、任务路由、53 份说明目录、约束方式和价值判断；本文保留实际执行与验证记录。

## 核心结构

baoyu-design 将设计方法封装为可移植 Agent Skill。`SKILL.md` 根据任务加载 `built-in-skills`，`system-prompt.md` 定义流程，`references` 适配宿主的预览、询问与检查工具。模型负责理解、设计和生成代码；浏览器负责渲染；JavaScript / TypeScript 工具负责可重复的编译、导入和导出。

“本地运行”指文件、工具和成果可以留在本地，不意味着模型推理一定离线。本项目在创作阶段使用当前 Agent，成品浏览时没有模型调用。

## 本次实际执行的链路

1. 阅读上游设计流程和阅读产品示例，定义中文拾页场景与三种布局方向。
2. 编写 Reader Kit：15 个 CSS 变量，Button / Tag 两个带类型与使用说明的 React 组件，两个展示卡片。
3. 执行上游 `compile-design-system.mjs`：生成 `_ds_bundle.js`、`_ds_manifest.json`、`_adherence.oxlintrc.json`。
4. 执行 `check-design-system.mjs`：识别 2 个组件、2 个卡片、15 个变量，无问题；该检查针对设计系统结构，不是完整视觉可访问性审计。
5. 执行 `build-preview.mjs`：将 React、样式、组件与卡片内联为约 172 KB 的独立预览。通过 Shadow DOM 隔离各卡片；实际点击按钮可以累计计数。
6. 执行 `import-design-system.mjs`：复制编译系统及 CSS 引用闭包到 `demo/_ds/reader-kit/`，生成 `_ds_prompt.md` 并更新 `_d_meta.json`。实际页面加载该副本中的 Button / Tag。
7. 原型使用 React 状态与 localStorage，主题通过 CSS 变量统一传递。源文件是 `code/app.jsx`，交付脚本是其编译结果 `demo/app.js`。
8. 直接复制原版 `deck-stage.js`，建立 4 页静态 HTML 幻灯片。第三页用 `data-anim="fade-in"` 标记三个点击步骤。
9. 原版 `gen-pptx` 在 Chromium 中测量实际布局，经 PptxGenJS 输出 4 页 PPTX 与 3 个动画。唯一提示是未提供讲者备注，本次未要求备注。
10. 用原版 `record-asset.mjs` 登记原型和幻灯片。状态保持 `needs-review`，不替用户标记“已批准”。

工具结果见 [upstream-tools.json](evidence/upstream-tools.json)，浏览器操作记录见 [browser.json](evidence/browser.json)，产物检查见 [artifacts.json](evidence/artifacts.json)。

## 值得理解的实现

### 设计系统并非只靠提示词

编译器从 JSX / TSX 与相邻的 `.d.ts` 识别组件接口，从全局 CSS 的 `@import` 闭包收集变量，将组件转译为浏览器包。命名空间首次生成后保持稳定，当前为 `ReaderKit_4d7f19`。导入器把系统复制进消费项目，页面不再引用外部设计目录。README 和组件说明还会生成供 Agent 再读取的约束提示。

### PPTX 导出利用浏览器布局

网页先在真实 Chromium 中渲染。导出器读取 `getBoundingClientRect` 和计算样式，将文本、形状、图片对应到 PPTX 对象。动画属性进一步转换为 slide XML 中的 timing 元素。截图模式与此不同，它会将整个页面扁平化为图片；本项目使用默认的 editable 模式。

本次只验证导出器完成、页数、文本/形状与动画 XML。没有打开桌面 PowerPoint，字体替换、复杂 CSS 的表现和跨软件动画兼容性不在结论内。

### 内容原型与真实服务分离

搜索、收藏和阅读状态是真实前端行为；文章内容是原创样本，新增正文由用户输入。参考链接不会被抓取。没有接入 RSS、AI 摘要、图片生成或远程存储，页面中明确标注。

## 实测发现与处理

### 纯中文分组名引起预览卡片重复

初次使用 `group="交互组件"` 和 `group="视觉基础"`。原版 `build-preview.mjs` 的 `slug()` 只保留 ASCII 字母数字，空结果统一退回 `x`。两个分组生成同一个 `g-x`，实际浏览器显示重复卡片与重复 ID。

处理：改用 `Components / 交互组件` 与 `Foundations / 视觉基础`，重新编译、生成预览。保留中文可读性且分组 ID 不再碰撞。不修改上游生成脚本、不手改生成后的预览。最终验证页面仅有两个卡片、按钮可交互、ID 唯一。

### deck-stage 默认文字颜色

仅在 body 声明深色文字时，组件内部的默认颜色仍可能被幻灯片内容继承，导致浅底标题变白。处理：在 `.slide` 显式设置深色文字，深底页单独设置白色，并重新导出 PPTX。

### 缩略图结构编辑依赖宿主

原版组件的删除、移动、复制等结构操作发出 `dc-op`，等待宿主确认，不会独立持久化源文件。本次使用公开 `no-rail` 属性关闭缩略栏，保留独立可工作的缩放、翻页、全屏和分步动画，避免出现可点击却无法保存的结构编辑入口。

## 结论与边界

本次已验证这套库可以在当前 Agent 工作流中参与制作原型，并通过自身工具形成可复用组件和多格式产物。它提供的增益是方法、规范、模板和实用转换器的组合；没有证明它能独立替代设计师、自动完成生产后端，或对任何模型都有稳定的审美提升。

Figma 离线解析、视频导出、图片生成、Figma / Canva 连接只做了能力了解，本项目未实测。上游宣称与 Claude Design 相关，但这是独立社区项目，本演示不代表官方产品。

## 关键来源

- [工作流入口](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/SKILL.md)
- [设计系统编译器](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/agents/compile-design-system.mjs)
- [单文件预览生成器](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/agents/build-preview.mjs)
- [原版幻灯片舞台](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/starter-components/deck-stage.js)
- [PPTX 布局采集](https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/agents/gen-pptx/src/browser/capture-editable.ts)
