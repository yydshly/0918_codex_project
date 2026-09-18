// Generated from code/app.jsx; run code/build-demo.cjs to update.
const UNDERSTANDING = {
  "version": "026d4ea012bdd5cada72ac8cc13f21ba4edf2245",
  "tasks": [{
    "id": "slides",
    "label": "幻灯片",
    "description": "产品介绍、汇报和教学演示。",
    "skills": ["make-a-deck"],
    "starters": ["deck-stage.js"],
    "verification": "实测四页 HTML 幻灯片、翻页、三组分步动画和 PPTX 结构；未做桌面 PowerPoint 验证。"
  }, {
    "id": "mobile-app-design",
    "label": "移动 App 设计",
    "description": "手机端页面与交互流程；浏览器原型不等于原生安装包。",
    "skills": ["mobile-prototype", "hi-fi-design", "interactive-prototype"],
    "starters": ["ios-frame.jsx", "android-frame.jsx", "ios-shell.js"],
    "verification": "实测拾页响应式手机布局；未实测专用移动外壳和原生打包。"
  }, {
    "id": "wireframe",
    "label": "线框图",
    "description": "低保真比较信息结构与布局。",
    "skills": ["wireframe"],
    "starters": ["design-canvas.jsx"],
    "verification": "拾页包含线框表现；未实测上游多画板组件的全部行为。"
  }, {
    "id": "document",
    "label": "文档",
    "description": "报告、备忘录、单页说明等可打印文档。",
    "skills": ["make-a-doc"],
    "starters": ["doc-page.js"],
    "verification": "只读源码，未实测此专项路径。"
  }, {
    "id": "animation",
    "label": "动画",
    "description": "产品演示、时间轴动画与动态视觉内容。",
    "skills": ["animated-video", "exportable-video"],
    "starters": ["animations-v3.jsx", "tweaks-panel.jsx"],
    "verification": "未实测时间轴动画和 MP4 导出；幻灯片分步动画是另一条已测路径。"
  }, {
    "id": "ui-mockups",
    "label": "UI 界面",
    "description": "网站、后台和产品页面，可组合交互原型。",
    "skills": ["hi-fi-design", "interactive-prototype"],
    "starters": ["design-canvas.jsx", "image-slot.js"],
    "verification": "实测拾页三种布局、搜索收藏、表单校验、阅读状态和本地保存。"
  }, {
    "id": "resume",
    "label": "简历",
    "description": "以纸张页面组织简历内容。",
    "skills": ["make-a-doc"],
    "starters": ["doc-page.js"],
    "verification": "只读源码，未实测此专项路径。"
  }, {
    "id": "3d-object",
    "label": "3D 对象",
    "description": "三维对象及交互展示。",
    "skills": ["3d-object"],
    "starters": ["three-d-stage.js"],
    "verification": "只读源码，未实测此专项路径。"
  }, {
    "id": "research",
    "label": "研究报告",
    "description": "组织当前资料与引用来源。",
    "skills": ["web-research"],
    "starters": ["data-overlay.js"],
    "verification": "本项目有研究文档，但未实测此专项模板的完整流程。"
  }, {
    "id": "html-email",
    "label": "HTML 邮件",
    "description": "符合邮件客户端约束的内容版式。",
    "skills": ["html-email"],
    "starters": [],
    "verification": "未做邮件客户端兼容性验证。"
  }, {
    "id": "color-type-system",
    "label": "配色与字体系统",
    "description": "建立品牌规范，可进一步组成可复用 UI Kit。",
    "skills": ["create-design-system"],
    "starters": ["design-canvas.jsx"],
    "verification": "实测 15 个变量、2 个组件的编译、检查、导入和独立预览；不是所有规范的完整审计。"
  }, {
    "id": "diagram",
    "label": "图表",
    "description": "图解、图表与信息关系展示。",
    "skills": ["data-visualization"],
    "starters": ["chart-stage.js"],
    "verification": "只读源码，未实测此专项路径。"
  }, {
    "id": "flier",
    "label": "宣传单",
    "description": "以纸张尺寸组织宣传内容。",
    "skills": ["flier"],
    "starters": ["doc-page.js"],
    "verification": "只读源码，未实测此专项路径。"
  }],
  "groups": [{
    "title": "需求、视觉与交互",
    "description": "从需求选择到界面表现；已有品牌优先，无品牌时再探索审美方向。",
    "items": [["ask-the-user", "补充关键需求"], ["options-stack", "组织可比较方案"], ["frontend-design", "无既有品牌时确定审美方向"], ["hi-fi-design", "高保真设计流程"], ["interactive-prototype", "交互状态、校验与切换"], ["mobile-prototype", "移动端原型"], ["wireframe", "低保真探索"], ["website-landing-page", "网站与落地页构图"], ["design-feedback", "设计反馈与审查"], ["something-cool", "仅在用户明确要求时探索惊喜作品"]]
  }, {
    "title": "设计系统",
    "description": "区分创建规范与消费规范，再通过工具编译、导入和预览。",
    "items": [["design-system-authoring-guide", "设计系统编写总流程"], ["create-design-system", "创建品牌与 UI 规范"], ["design-components", "Design Components 编写约定"], ["design-system-preview", "生成独立预览页"], ["use-design-system", "在项目中绑定并复用设计系统"]]
  }, {
    "title": "资料导入",
    "description": "从实际资料取得设计上下文。",
    "items": [["import-from-figma", "本地 .fig 资料解析与导入"], ["import-from-github", "按需读取仓库设计资料"], ["import-from-html", "从已有页面提取样式和组件参考"], ["read-pdf", "读取 PDF 内容"]]
  }, {
    "title": "图像、动画与三维",
    "description": "专项制作说明；图片、声音等能力依赖可用后端。",
    "items": [["3d-object", "三维对象与查看器"], ["animated-video", "时间轴动画制作"], ["generate-images", "选择可用图像后端并生成素材"], ["gemini-image", "Gemini 图像工具专项说明"], ["watercolor-illustration", "水彩插画方向"], ["sound-effects", "音效生成接入"]]
  }, {
    "title": "文档、演示与传播",
    "description": "针对不同载体的内容与排版。",
    "items": [["make-a-deck", "HTML 幻灯片"], ["make-a-doc", "文档与简历"], ["html-email", "邮件客户端布局要求"], ["flier", "宣传单"], ["trifold-brochure", "三折宣传册"], ["social-media-content", "社交平台内容"], ["speaker-notes", "演讲者备注"]]
  }, {
    "title": "研究、分析与可视化",
    "description": "将来源、数据和分析组织成可读成果。",
    "items": [["web-research", "带来源的当前资料研究"], ["data-visualization", "图表与图解"], ["maps-geography", "地理可视化"], ["data-science", "数据分析相关指导"], ["experiment-workflow", "实验工作流"]]
  }, {
    "title": "导出与交接",
    "description": "目标格式有各自的输入约定；部分入口为兼容说明，不重复算能力。",
    "items": [["export-as-pptx-editable", "可编辑 PPTX 导出"], ["export-as-pptx-screenshots", "截图式 PPTX 导出"], ["export-pptx-editable", "PPTX 可编辑导出的另一说明入口"], ["export-pptx-screenshots", "PPTX 截图导出的另一说明入口"], ["export-as-video", "视频文件导出"], ["exportable-video", "动画可导出的接口约定"], ["save-as-pdf", "PDF 打印导出"], ["save-as-standalone-html", "自包含 HTML"], ["send-to-canva", "Canva 交接指导"], ["send-to-figma", "Figma 交接指导"], ["handoff-to-claude-code", "开发交接资料"]]
  }, {
    "title": "调节控件与环境接入",
    "description": "部分内容带宿主假设，需按实际环境适配。",
    "items": [["make-tweakable", "添加页面内调节控件"], ["tweaks-protocol", "调节面板消息与持久化协议"], ["low-level-tweaks-api", "调节面板与聊天交互接口"], ["claude-api-in-prototypes", "原型中 Claude API 的宿主接口"], ["google-slides-safe", "Google Slides 兼容性指导"]]
  }],
  "constraints": [["需求与范围", "明确目的、受众、精细程度和方案数量。"], ["设计依据", "先读实际品牌、组件与既有界面资料。"], ["视觉表达", "有意识地选择字体、配色、空间和动效。"], ["一致性", "绑定设计系统，复用组件和样式变量。"], ["内容真实性", "不为填充版面编造数据，不把参考品牌当成用户事实。"], ["交互完整性", "原型包含操作反馈、状态切换和表单校验。"], ["实现与交付", "组织文件和素材，遵守模板与导出输入约定。"], ["验证与迭代", "预览、检查、修正，保留版本与实际审阅状态。"]]
};
/* Original research guide. Task mappings are sourced from the pinned upstream;
 * grouping and explanations are our synthesis, not a live agent execution. */
function Understanding() {
  const [taskId, setTaskId] = React.useState('mobile-app-design');
  const [mapZoom, setMapZoom] = React.useState(100);
  React.useEffect(() => {
    const id = location.hash.slice(1);
    if (id.startsWith('u-')) document.getElementById(id)?.scrollIntoView();
  }, []);
  const task = UNDERSTANDING.tasks.find(item => item.id === taskId);
  const upstream = 'https://github.com/JimLiu/baoyu-design/blob/026d4ea012bdd5cada72ac8cc13f21ba4edf2245/skills/baoyu-design/';
  return /*#__PURE__*/React.createElement("section", {
    className: "exhibit understanding"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "UNDERSTAND THE TOOLKIT"), /*#__PURE__*/React.createElement("h2", null, "\u7ED9 AI \u7684\u8BBE\u8BA1\u5DE5\u4F5C\u6D41\u4E0E\u5DE5\u5177\u5305\u3002"), /*#__PURE__*/React.createElement("p", null, "\u4ECE\u901A\u7528\u89C4\u8303\u5230\u4E13\u9879\u7EC6\u8282\uFF0C\u6309\u76EE\u6807\u7EC4\u5408 Skill\uFF1B\u7531\u73B0\u6709 AI \u52A9\u624B\u8C03\u7528\u6A21\u677F\u4E0E\u5DE5\u5177\u5B8C\u6210\u4EA4\u4ED8\u3002")), /*#__PURE__*/React.createElement("a", {
    className: "text-link",
    href: "../notes/understanding.md",
    target: "_blank",
    rel: "noreferrer"
  }, "\u9605\u8BFB\u5B8C\u6574\u7406\u89E3\u6587\u6863 \u2197")), /*#__PURE__*/React.createElement("section", {
    className: "u-summary",
    "aria-label": "\u9879\u76EE\u6982\u8981"
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("span", null, "\u9879\u76EE\u5B9A\u4F4D"), /*#__PURE__*/React.createElement("h3", null, "\u9762\u5411 AI \u52A9\u624B\u7684\u8BBE\u8BA1 Skill \u5DE5\u5177\u5305"), /*#__PURE__*/React.createElement("p", null, "\u5C06\u8BBE\u8BA1\u65B9\u6CD5\u7EC4\u7EC7\u6210\u53EF\u6267\u884C\u7684\u5DE5\u4F5C\u6307\u5357\uFF0C\u914D\u5957\u7EC4\u4EF6\u6A21\u677F\u4E0E\u5DE5\u5177\uFF0C\u6307\u5BFC AI \u68B3\u7406\u9700\u6C42\u3001\u8BBE\u8BA1\u65B9\u6848\u5E76\u5236\u4F5C\u6210\u679C\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("span", null, "\u652F\u6301\u76EE\u6807"), /*#__PURE__*/React.createElement("h3", null, "\u4ECE\u754C\u9762\u539F\u578B\u5230\u591A\u79CD\u89C6\u89C9\u6210\u679C"), /*#__PURE__*/React.createElement("p", null, "\u652F\u6301\u7F51\u9875\u4E0E\u79FB\u52A8\u7AEF\u539F\u578B\u3001\u7EBF\u6846\u56FE\u3001\u8BBE\u8BA1\u7CFB\u7EDF\u3001\u6F14\u793A\u6587\u7A3F\u3001\u6587\u6863\u7B80\u5386\u3001\u56FE\u8868\u3001\u52A8\u753B\u30013D\u3001\u90AE\u4EF6\u4E0E\u5BA3\u4F20\u5355\u7B49\u4EFB\u52A1\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("span", null, "\u5DE5\u4F5C\u539F\u7406"), /*#__PURE__*/React.createElement("h3", null, "\u901A\u7528\u89C4\u8303\u4E0E\u4E13\u9879 Skill \u6309\u9700\u7EC4\u5408"), /*#__PURE__*/React.createElement("p", null, "AI \u6839\u636E\u76EE\u6807\u8BFB\u53D6\u6307\u5357\uFF0C\u4EE5\u9879\u76EE\u54C1\u724C\u548C\u7EC4\u4EF6\u89C4\u8303\u4E3A\u5171\u540C\u4F9D\u636E\uFF0C\u7F16\u5199\u4EE3\u7801\u3001\u8C03\u7528\u5DE5\u5177\uFF0C\u901A\u8FC7\u9884\u89C8\u548C\u68C0\u67E5\u8FED\u4EE3\u4EA4\u4ED8\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("span", null, "\u4F7F\u7528\u4EF7\u503C"), /*#__PURE__*/React.createElement("h3", null, "\u590D\u7528\u8BBE\u8BA1\u57FA\u7840\uFF0C\u4FDD\u6301\u6210\u679C\u4E00\u81F4"), /*#__PURE__*/React.createElement("p", null, "\u628A\u54C1\u724C\u3001\u914D\u8272\u3001\u5B57\u4F53\u4E0E\u7EC4\u4EF6\u7528\u4E8E\u4E0D\u540C\u8BBE\u8BA1\u4EFB\u52A1\uFF0C\u51CF\u5C11\u91CD\u590D\u63CF\u8FF0\u548C\u642D\u5EFA\uFF0C\u8BA9\u6210\u679C\u4FBF\u4E8E\u4FEE\u6539\u3001\u590D\u7528\u548C\u591A\u683C\u5F0F\u4EA4\u4ED8\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "u-callout"
  }, /*#__PURE__*/React.createElement("strong", null, "\u4F60\u770B\u5230\u7684\u662F\u6211\u4EEC\u7684\u7814\u7A76\u7F51\u9875\uFF0C\u4E0D\u662F\u8FD9\u4E2A\u5E93\u81EA\u5E26\u7684\u64CD\u4F5C\u540E\u53F0\u3002"), /*#__PURE__*/React.createElement("p", null, "\u201C\u62FE\u9875\u201D\u662F\u672C\u9879\u76EE\u5236\u4F5C\u7684\u4EA7\u51FA\u793A\u4F8B\u3002\u4E0A\u6E38\u6709\u7EC4\u4EF6\u3001\u9884\u89C8\u6A21\u677F\u4E0E\u5DE5\u5177\uFF0C\u4F46\u6CA1\u6709\u5B8C\u6574\u7684\u72EC\u7ACB\u8BBE\u8BA1\u5DE5\u4F5C\u53F0\uFF1B\u4F7F\u7528\u5165\u53E3\u662F\u4F60\u5DF2\u6709\u7684 AI \u52A9\u624B\u3002\u6D4F\u89C8\u672C\u9875\u4E0D\u4F1A\u8C03\u7528 AI\u3002")), /*#__PURE__*/React.createElement("nav", {
    className: "u-jumps",
    "aria-label": "\u7406\u89E3\u6307\u5357\u7AE0\u8282"
  }, [['u-map', '完整引导图'], ['u-identity', '本质与比较'], ['u-targets', '13 类任务'], ['u-architecture', '内部原理'], ['u-unified', '统一约束'], ['u-catalog', '53 份说明'], ['u-rules', '约束与边界']].map(([id, title]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id
  }, title))), /*#__PURE__*/React.createElement("section", {
    id: "u-map",
    className: "u-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "READING MAP / \u5168\u666F\u5BFC\u89C8"), /*#__PURE__*/React.createElement("h3", null, "\u4ECE\u901A\u7528\u89C4\u5219\u5230\u4E13\u9879\u7EC6\u8282\uFF0C\u6309\u9700\u7EC4\u5408\u80FD\u529B\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5171\u540C\u6D41\u7A0B\u63D0\u4F9B\u57FA\u7840\u8981\u6C42\uFF0C\u9879\u76EE\u89C4\u8303\u4FDD\u6301\u54C1\u724C\u4E00\u81F4\uFF0C\u4E13\u9879 Skill \u9002\u5E94\u4E0D\u540C\u6210\u679C\uFF0C\u6A21\u677F\u4E0E\u811A\u672C\u6267\u884C\u5177\u4F53\u5DE5\u4F5C\u3002\u9605\u8BFB\u987A\u5E8F\uFF1A\u80FD\u529B\u5B9A\u4F4D \u2192 \u4EA7\u54C1\u76EE\u6807 \u2192 \u7EDF\u4E00\u7EA6\u675F \u2192 \u6267\u884C\u673A\u5236 \u2192 \u5B8C\u6574\u6280\u80FD\u76EE\u5F55 \u2192 \u5BF9\u6211\u4EEC\u7684\u610F\u4E49\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "u-map-toolbar",
    role: "group",
    "aria-label": "\u5F15\u5BFC\u56FE\u67E5\u770B\u5DE5\u5177"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setMapZoom(Math.max(100, mapZoom - 50)),
    disabled: mapZoom === 100,
    "aria-label": "\u7F29\u5C0F\u5F15\u5BFC\u56FE"
  }, "\u2212"), /*#__PURE__*/React.createElement("output", {
    "aria-live": "polite"
  }, mapZoom, "%"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setMapZoom(Math.min(500, mapZoom + 50)),
    disabled: mapZoom === 500,
    "aria-label": "\u653E\u5927\u5F15\u5BFC\u56FE"
  }, "\uFF0B"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setMapZoom(100)
  }, "\u9002\u5408\u5BBD\u5EA6"), /*#__PURE__*/React.createElement("a", {
    href: "../assets/understanding-map.png",
    target: "_blank",
    rel: "noreferrer"
  }, "\u67E5\u770B\u9AD8\u6E05 PNG \u2197"), /*#__PURE__*/React.createElement("a", {
    href: "../assets/understanding-map.svg",
    target: "_blank",
    rel: "noreferrer"
  }, "\u53EF\u7F29\u653E SVG \u2197")), /*#__PURE__*/React.createElement("figure", {
    className: "u-map-figure"
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-map-viewport",
    role: "region",
    "aria-label": "\u5B8C\u6574\u5F15\u5BFC\u56FE\uFF0C\u53EF\u653E\u5927\u540E\u6EDA\u52A8\u67E5\u770B",
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/understanding-map.png",
    alt: "baoyu-design \u5B8C\u6574\u7406\u89E3\u5F15\u5BFC\u56FE\uFF1A13 \u7C7B\u4EA7\u54C1\u76EE\u6807\u3001\u4E94\u5C42\u7EDF\u4E00\u7EA6\u675F\u3001AI \u6267\u884C\u8FC7\u7A0B\u30018 \u7EC4\u5171 53 \u4EFD\u8BF4\u660E\u3001\u7814\u7A76\u610F\u4E49\u548C\u9A8C\u8BC1\u8FB9\u754C\u3002\u5168\u90E8\u5185\u5BB9\u53E6\u6709\u672C\u9875\u6587\u5B57\u8BF4\u660E\u3002",
    style: {
      width: mapZoom + '%'
    }
  })), /*#__PURE__*/React.createElement("figcaption", null, "\u539F\u521B\u7814\u7A76\u56FE\uFF0C\u975E\u4E0A\u6E38\u4EA7\u54C1\u622A\u56FE\u3002\u5305\u542B 53 \u4E2A\u8BF4\u660E\u6587\u4EF6\u540D\u53CA\u804C\u8D23\uFF1B\u624B\u673A\u4E0A\u53EF\u5148\u653E\u5927\uFF0C\u518D\u6A2A\u5411\u548C\u7EB5\u5411\u6EDA\u52A8\u3002\u56FE\u4E2D\u5206\u7C7B\u662F\u6211\u4EEC\u7684\u5F52\u7EB3\uFF0C\u80FD\u529B\u8FB9\u754C\u4EE5\u56FA\u5B9A\u7248\u672C\u548C\u5B9E\u6D4B\u8BB0\u5F55\u4E3A\u51C6\u3002"))), /*#__PURE__*/React.createElement("section", {
    id: "u-identity",
    className: "u-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "01 / WHAT IT IS"), /*#__PURE__*/React.createElement("h3", null, "\u4E0E\u524D\u7AEF Skill \u76F8\u6BD4\uFF0C\u591A\u4E86\u4EFB\u52A1\u7EC4\u7EC7\u548C\u4EA4\u4ED8\u5DE5\u5177\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "u-grid three"
  }, [['003 · Frontend Design Toolkit', '资源导航与组合建议', '我们研究的版本只有 README，主要帮助选工具；其中研究过的 frontend-design Skill 专注视觉设计指导。'], ['008 · baoyu-design', 'Skill 流程＋模板＋脚本', '内部也有 frontend-design 说明；还组织资料导入、交互制作、设计系统、检查和格式导出。'], ['Claude Design', '有操作界面的官方产品', '部分任务目标相近，但交互界面与产品集成由官方提供。baoyu 是独立社区项目，不能由此推定能力完全等价。']].map(([title, tag, desc]) => /*#__PURE__*/React.createElement("article", {
    key: title
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-tag"
  }, tag), /*#__PURE__*/React.createElement("h4", null, title), /*#__PURE__*/React.createElement("p", null, desc)))), /*#__PURE__*/React.createElement("p", {
    className: "u-note"
  }, "\u7EC4\u7EC7\u65B9\u5F0F\u66F4\u50CF\u6211\u4EEC\u7814\u7A76\u7684 004 \xB7 ASu-skills\uFF1A\u628A\u9886\u57DF\u6D41\u7A0B\u3001\u6A21\u677F\u548C\u5DE5\u5177\u4EA4\u7ED9\u5BBF\u4E3B AI \u6267\u884C\u3002002 \u504F\u901A\u7528\u5F00\u53D1\u5B9E\u8DF5\uFF0C006 \u504F\u6280\u80FD\u76EE\u5F55\u3002", /*#__PURE__*/React.createElement("a", {
    href: "https://claude.com/product/design",
    target: "_blank",
    rel: "noreferrer"
  }, "Claude Design \u5B98\u65B9\u8BF4\u660E \u2197"))), /*#__PURE__*/React.createElement("section", {
    id: "u-targets",
    className: "u-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "02 / TASK ROUTING"), /*#__PURE__*/React.createElement("h3", null, "\u9009\u62E9\u4E00\u4E2A\u76EE\u6807\uFF0C\u770B\u5B83\u600E\u6837\u7EC4\u5408\u80FD\u529B\u3002"), /*#__PURE__*/React.createElement("p", null, "13 \u7C7B\u662F\u4E0A\u6E38\u7684\u4EFB\u52A1\u5165\u53E3\uFF1B\u4E00\u4E2A\u5165\u53E3\u53EF\u4EE5\u7EC4\u5408\u591A\u4E2A Skill\uFF0C\u591A\u4E2A\u5165\u53E3\u4E5F\u53EF\u4EE5\u590D\u7528\u540C\u4E00\u4EFD\u8BF4\u660E\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "u-task-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-task-buttons",
    role: "group",
    "aria-label": "13 \u7C7B\u4EA7\u54C1\u76EE\u6807"
  }, UNDERSTANDING.tasks.map(item => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: item.id,
    "aria-pressed": item.id === taskId,
    "aria-controls": "u-task-detail",
    onClick: () => setTaskId(item.id)
  }, item.label))), /*#__PURE__*/React.createElement("article", {
    id: "u-task-detail",
    className: "u-task-detail",
    "aria-live": "polite",
    "aria-atomic": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-tag"
  }, "\u6E90\u7801\u80FD\u529B\u5165\u53E3 \xB7 \u975E\u5168\u90E8\u5B9E\u6D4B"), /*#__PURE__*/React.createElement("h4", null, task.label), /*#__PURE__*/React.createElement("p", null, task.description), /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement("dt", null, "\u52A0\u8F7D\u7684 Skill"), /*#__PURE__*/React.createElement("dd", null, task.skills.map(name => /*#__PURE__*/React.createElement("a", {
    className: "u-code-link",
    key: name,
    href: upstream + 'built-in-skills/' + name + '.md',
    target: "_blank",
    rel: "noreferrer"
  }, name))), /*#__PURE__*/React.createElement("dt", null, "\u914D\u5957\u6A21\u677F"), /*#__PURE__*/React.createElement("dd", null, task.starters.length ? task.starters.join(' / ') : '无指定起步模板'), /*#__PURE__*/React.createElement("dt", null, "\u672C\u6B21\u9A8C\u8BC1\u8FB9\u754C"), /*#__PURE__*/React.createElement("dd", null, task.verification)))), /*#__PURE__*/React.createElement("p", {
    className: "u-note"
  }, "\u540C\u4E00\u4E2A\u7535\u5546\u9879\u76EE\u53EF\u4EE5\u9700\u8981\u5546\u54C1\u9875\u539F\u578B\u3001\u540E\u53F0\u754C\u9762\u3001\u7EC4\u4EF6\u89C4\u8303\u548C\u5BA3\u4F20 PPT\uFF1B\u8FD9\u91CC\u6309\u6210\u679C\u5F62\u5F0F\u5212\u5206\uFF0C\u4E0D\u6309\u884C\u4E1A\u5212\u5206\u3002", /*#__PURE__*/React.createElement("a", {
    href: upstream + 'project-types.json',
    target: "_blank",
    rel: "noreferrer"
  }, "\u6838\u5BF9\u4E0A\u6E38\u8DEF\u7531\u8868 \u2197"))), /*#__PURE__*/React.createElement("section", {
    id: "u-architecture",
    className: "u-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "03 / HOW IT WORKS"), /*#__PURE__*/React.createElement("h3", null, "AI \u8D1F\u8D23\u7EC4\u7EC7\u6267\u884C\uFF0C\u811A\u672C\u8D1F\u8D23\u5177\u4F53\u64CD\u4F5C\u3002"), /*#__PURE__*/React.createElement("ol", {
    className: "u-flow"
  }, [['识别任务', 'SKILL.md 指示 AI 判断任务，按需读取专项说明；不是固定程序自动调度所有步骤。'], ['加载上下文', '总体工作规范＋当前助手的工具说明＋项目已有品牌和组件规范。'], ['制作产物', 'AI 编写 HTML / CSS / React，复用起步模板，按需调用编译或导入脚本。'], ['观察与修正', '浏览器渲染页面；AI 结合报错、交互结果和可用的截图反馈继续修改。'], ['记录与交付', '记录文件和版本，按需求调用 PPTX、PDF、视频等交付路径；需要的依赖必须可用。']].map(([title, desc]) => /*#__PURE__*/React.createElement("li", {
    key: title
  }, /*#__PURE__*/React.createElement("h4", null, title), /*#__PURE__*/React.createElement("p", null, desc)))), /*#__PURE__*/React.createElement("div", {
    className: "u-grid two"
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "\u9879\u76EE\u89C4\u8303\u4E5F\u4F1A\u53D8\u6210 AI \u7684\u8F93\u5165"), /*#__PURE__*/React.createElement("p", null, "\u8BBE\u8BA1\u7CFB\u7EDF\u5BFC\u5165\u5668\u590D\u5236\u5B9E\u9645\u7EC4\u4EF6\uFF0C\u5E76\u751F\u6210 ", /*#__PURE__*/React.createElement("code", null, "_ds_prompt.md"), "\uFF1A\u5305\u542B\u63A5\u5165\u65B9\u6CD5\u3001\u7EC4\u4EF6\u4F7F\u7528\u8BF4\u660E\u548C\u5141\u8BB8\u7684\u6837\u5F0F\u53D8\u91CF\u3002\u7EE7\u7EED\u9879\u76EE\u65F6\uFF0CAI \u6839\u636E ", /*#__PURE__*/React.createElement("code", null, "_d_meta.json"), " \u6062\u590D\u7ED1\u5B9A\u5E76\u8BFB\u53D6\u8FD9\u4E9B\u89C4\u5219\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "\u6587\u6863\u540D\u79F0\u4E0D\u7B49\u4E8E\u6267\u884C\u6743\u9650"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("code", null, "system-prompt.md"), " \u662F\u52A9\u624B\u8BFB\u53D6\u7684\u6587\u4EF6\uFF0C\u4E0D\u4F1A\u56E0\u540D\u5B57\u81EA\u52A8\u83B7\u5F97\u5E73\u53F0\u6700\u9AD8\u6307\u4EE4\u4F18\u5148\u7EA7\u3002", /*#__PURE__*/React.createElement("code", null, "agents/"), " \u540C\u65F6\u653E\u811A\u672C\u548C\u68C0\u67E5\u8BF4\u660E\uFF0C\u4E5F\u4E0D\u7B49\u4E8E\u8FD0\u884C\u7740\u4E00\u7EC4\u81EA\u4E3B\u667A\u80FD\u4F53\u3002")))), /*#__PURE__*/React.createElement("section", {
    id: "u-unified",
    className: "u-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "04 / SHARED RULES, SPECIALIZED DETAILS"), /*#__PURE__*/React.createElement("h3", null, "\u7EDF\u4E00\u505A\u4E8B\u65B9\u5F0F\u548C\u54C1\u724C\u4F9D\u636E\uFF0C\u6309\u76EE\u6807\u7EC6\u5316\u5B9E\u73B0\u3002"), /*#__PURE__*/React.createElement("p", null, "\u8FD9\u662F\u4E00\u5957\u4ECE\u901A\u7528\u5230\u4E13\u9879\u7684\u5206\u5C42\u6307\u5357\uFF0C\u4E5F\u662F\u4E00\u5957\u6A2A\u5411\u7EC4\u5408\u7684\u80FD\u529B\u96C6\u5408\u3002\u505A\u624B\u673A\u539F\u578B\u65F6\uFF0C\u4F1A\u4E00\u8D77\u4F7F\u7528\u79FB\u52A8\u7AEF\u3001\u9AD8\u4FDD\u771F\u3001\u4EA4\u4E92\u548C\u8BBE\u8BA1\u7CFB\u7EDF\u76F8\u5173\u8BF4\u660E\uFF1B\u4E0D\u4F1A\u628A\u6240\u6709 Skill \u90FD\u6267\u884C\u4E00\u904D\u3002"), /*#__PURE__*/React.createElement("ol", {
    className: "u-unified-layers"
  }, [['共同工作流程', 'system-prompt.md', '先理解需求、读取资料，再制作、检查、修正与交付。'], ['项目设计规范', '_ds_prompt.md / _d_meta.json', '恢复绑定的品牌、字体、组件与变量，继续任务时沿用已有依据。'], ['目标专项规则', 'built-in-skills/', '手机关注触控与状态，PPT 关注画布和翻页，邮件遵守客户端兼容规则。'], ['实际代码与模板', 'starter-components/ / agents/', '能共享的组件和变量直接复用；模板与脚本落实行为、结构和格式转换。'], ['检查与反馈', '浏览器 / 专项检查器', '检查运行结果、布局与对应结构，根据真实问题继续修改。']].map(([title, file, desc]) => /*#__PURE__*/React.createElement("li", {
    key: title
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, title), /*#__PURE__*/React.createElement("code", null, file)), /*#__PURE__*/React.createElement("p", null, desc)))), /*#__PURE__*/React.createElement("div", {
    className: "u-grid three"
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("span", {
    className: "u-tag"
  }, "\u540C\u4E00\u4E2A\u54C1\u724C / \u624B\u673A\u539F\u578B"), /*#__PURE__*/React.createElement("h4", null, "\u89E6\u63A7\u4E0E\u4EA4\u4E92\u72B6\u6001"), /*#__PURE__*/React.createElement("p", null, "\u54C1\u724C\u8272\u548C\u5B57\u4F53\u4FDD\u6301\u4E00\u81F4\uFF0C\u53E6\u5916\u5904\u7406\u89E6\u63A7\u76EE\u6807\u3001\u8868\u5355\u6821\u9A8C\u3001\u9875\u9762\u5207\u6362\u548C\u79FB\u52A8\u5E03\u5C40\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("span", {
    className: "u-tag"
  }, "\u540C\u4E00\u4E2A\u54C1\u724C / \u4EA7\u54C1 PPT"), /*#__PURE__*/React.createElement("h4", null, "\u753B\u5E03\u4E0E\u6F14\u793A\u8282\u594F"), /*#__PURE__*/React.createElement("p", null, "\u6CBF\u7528\u89C6\u89C9\u89C4\u8303\uFF0C\u53E6\u5916\u5904\u7406\u56FA\u5B9A\u6BD4\u4F8B\u3001\u6587\u5B57\u5C3A\u5BF8\u3001\u7F29\u653E\u3001\u7FFB\u9875\u548C\u52A8\u753B\u5BFC\u51FA\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("span", {
    className: "u-tag"
  }, "\u540C\u4E00\u4E2A\u54C1\u724C / \u8425\u9500\u90AE\u4EF6"), /*#__PURE__*/React.createElement("h4", null, "\u90AE\u4EF6\u5BA2\u6237\u7AEF\u517C\u5BB9"), /*#__PURE__*/React.createElement("p", null, "\u6CBF\u7528\u54C1\u724C\u8868\u8FBE\uFF0C\u6309\u90AE\u4EF6\u652F\u6301\u7684\u5E03\u5C40\u5B9E\u73B0\uFF1B\u4E0D\u80FD\u76F4\u63A5\u7167\u642C\u666E\u901A\u7F51\u9875\u7684 React \u7EC4\u4EF6\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "u-callout"
  }, /*#__PURE__*/React.createElement("strong", null, "\u6587\u5B57\u8981\u6C42\u3001\u4EE3\u7801\u673A\u5236\u3001\u68C0\u67E5\u8BC1\u636E\uFF0C\u662F\u4E09\u79CD\u4E0D\u540C\u7684\u7EA6\u675F\u3002"), /*#__PURE__*/React.createElement("p", null, "\u201C\u4F7F\u7528\u54C1\u724C\u7D2B\u8272\u201D\u662F\u8981\u6C42\uFF1B\u5F15\u7528\u540C\u4E00\u4E2A\u989C\u8272\u53D8\u91CF\u662F\u5B9E\u73B0\uFF1B\u8FD0\u884C\u9875\u9762\u518D\u68C0\u67E5\u662F\u8BC1\u636E\u3002\u5E93\u6CA1\u6709\u81EA\u52A8\u89E3\u51B3\u5168\u90E8\u51B2\u7A81\u7684\u5F3A\u5236\u89C4\u5219\u5F15\u64CE\uFF0CAI \u7684\u9075\u5FAA\u7A0B\u5EA6\u548C\u5B9E\u9645\u6267\u884C\u4ECD\u9700\u9A8C\u8BC1\uFF0C\u7528\u6237\u8981\u6C42\u4E0E\u5BBF\u4E3B\u66F4\u9AD8\u4F18\u5148\u7EA7\u6307\u4EE4\u7EE7\u7EED\u9002\u7528\u3002"))), /*#__PURE__*/React.createElement("section", {
    id: "u-catalog",
    className: "u-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "05 / SKILL CATALOG"), /*#__PURE__*/React.createElement("h3", null, "53 \u4EFD\u8BF4\u660E\uFF0C\u6309\u5DE5\u4F5C\u804C\u8D23\u7406\u89E3\u3002"), /*#__PURE__*/React.createElement("p", null, "\u4EE5\u4E0B 8 \u7EC4\u662F\u6211\u4EEC\u7684\u9605\u8BFB\u5F52\u7EB3\uFF1B\u6587\u4EF6\u6765\u81EA\u56FA\u5B9A\u7248\u672C\u3002\u90E8\u5206\u662F\u534F\u8BAE\u3001\u517C\u5BB9\u5165\u53E3\u548C\u5DE5\u5177\u8BF4\u660E\uFF0C\u4E0D\u80FD\u5F53\u4F5C 53 \u4E2A\u72EC\u7ACB\u529F\u80FD\u3002\u5C55\u5F00\u67E5\u770B\u540D\u79F0\u3001\u4F5C\u7528\u548C\u4E0A\u6E38\u539F\u6587\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "u-catalog"
  }, UNDERSTANDING.groups.map(group => /*#__PURE__*/React.createElement("details", {
    key: group.title
  }, /*#__PURE__*/React.createElement("summary", null, group.title, /*#__PURE__*/React.createElement("span", null, group.items.length, " \u4EFD")), /*#__PURE__*/React.createElement("p", null, group.description), /*#__PURE__*/React.createElement("ul", null, group.items.map(([name, desc]) => /*#__PURE__*/React.createElement("li", {
    key: name
  }, /*#__PURE__*/React.createElement("a", {
    href: upstream + 'built-in-skills/' + name + '.md',
    target: "_blank",
    rel: "noreferrer"
  }, name), /*#__PURE__*/React.createElement("span", null, desc)))))))), /*#__PURE__*/React.createElement("section", {
    id: "u-rules",
    className: "u-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "06 / RULES AND EVIDENCE"), /*#__PURE__*/React.createElement("h3", null, "\u8986\u76D6\u5E7F\uFF0C\u9760\u7684\u662F\u590D\u7528\u65B9\u6CD5\u3001\u6A21\u677F\u548C\u6D4F\u89C8\u5668\u3002"), /*#__PURE__*/React.createElement("p", null, "\u7F51\u9875\u3001\u5E7B\u706F\u7247\u548C\u53EF\u6253\u5370\u6587\u6863\u53EF\u4EE5\u5171\u4EAB HTML / CSS \u7684\u8868\u8FBE\u65B9\u5F0F\uFF1B\u52A8\u753B\u30013D \u548C\u8F6C\u6362\u5668\u5728\u6B64\u57FA\u7840\u4E0A\u589E\u52A0\u4E13\u7528\u4EE3\u7801\u3002\u80FD\u529B\u5165\u53E3\u8986\u76D6\u5E7F\uFF0C\u4E0D\u4EE3\u8868\u6BCF\u6761\u8DEF\u5F84\u90FD\u540C\u6837\u6210\u719F\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "u-rule-grid"
  }, UNDERSTANDING.constraints.map(([title, desc]) => /*#__PURE__*/React.createElement("article", {
    key: title
  }, /*#__PURE__*/React.createElement("h4", null, title), /*#__PURE__*/React.createElement("p", null, desc)))), /*#__PURE__*/React.createElement("div", {
    className: "u-grid three"
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "\u6587\u5B57\u7EA6\u675F"), /*#__PURE__*/React.createElement("p", null, "\u8981\u6C42 AI \u9075\u5B88\u54C1\u724C\u3001\u5148\u770B\u8D44\u6599\u3001\u5B8C\u6210\u540E\u68C0\u67E5\u3002\u662F\u5426\u9075\u5FAA\u53D6\u51B3\u4E8E\u5BBF\u4E3B\u6307\u4EE4\u3001\u6A21\u578B\u3001\u4E0A\u4E0B\u6587\u548C\u5B9E\u9645\u6267\u884C\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "\u4EE3\u7801\u673A\u5236"), /*#__PURE__*/React.createElement("p", null, "\u5171\u4EAB\u7EC4\u4EF6\u548C CSS \u53D8\u91CF\u76F4\u63A5\u5F71\u54CD\u9875\u9762\uFF1B\u811A\u672C\u6267\u884C\u7F16\u8BD1\u3001\u590D\u5236\u3001\u683C\u5F0F\u8F6C\u6362\uFF0C\u5E76\u68C0\u67E5\u5176\u8986\u76D6\u7684\u7ED3\u6784\u89C4\u5219\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "\u8FD0\u884C\u8BC1\u636E"), /*#__PURE__*/React.createElement("p", null, "\u6D4F\u89C8\u5668\u5B9E\u9645\u64CD\u4F5C\u53EF\u4EE5\u53D1\u73B0\u8FD0\u884C\u95EE\u9898\u3002\u5DE5\u5177\u68C0\u67E5\u901A\u8FC7\uFF0C\u4E0D\u80FD\u81EA\u52A8\u8BC1\u660E\u9875\u9762\u597D\u770B\u3001\u7528\u6237\u4F53\u9A8C\u4F18\u79C0\u6216\u5DF2\u8FBE\u5230\u4E0A\u7EBF\u8981\u6C42\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "boundary-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "\u672C\u6B21\u5DF2\u5B9E\u6D4B"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u4E09\u79CD\u5E03\u5C40\u4E0E\u641C\u7D22\u3001\u6536\u85CF\u3001\u9605\u8BFB\u3001\u6DFB\u52A0\u3001\u672C\u5730\u4FDD\u5B58"), /*#__PURE__*/React.createElement("li", null, "\u8BBE\u8BA1\u7CFB\u7EDF\u7F16\u8BD1\u3001\u68C0\u67E5\u3001\u5BFC\u5165\u3001\u5355\u6587\u4EF6\u9884\u89C8"), /*#__PURE__*/React.createElement("li", null, "\u539F\u7248\u5E7B\u706F\u7247\u821E\u53F0\u4E0E\u53EF\u7F16\u8F91 PPTX \u5BFC\u51FA"), /*#__PURE__*/React.createElement("li", null, "PPTX \u7684 4 \u9875\u3001\u53EF\u7F16\u8F91\u5BF9\u8C61\u4E0E 3 \u7EC4\u70B9\u51FB\u52A8\u753B\u7ED3\u6784"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "\u4ECD\u662F\u6E90\u7801\u4E86\u89E3\uFF0C\u5C1A\u672A\u9A8C\u8BC1"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u771F\u5B9E Figma \u5BFC\u5165\u3001Figma / Canva \u4EA4\u63A5"), /*#__PURE__*/React.createElement("li", null, "\u56FE\u7247\u548C\u97F3\u6548\u751F\u6210\u3001\u89C6\u9891\u5BFC\u51FA\u30013D \u7B49\u4E13\u9879\u8DEF\u5F84"), /*#__PURE__*/React.createElement("li", null, "\u684C\u9762 PowerPoint \u4E2D\u7684\u5B57\u4F53\u548C\u52A8\u753B\u8868\u73B0"), /*#__PURE__*/React.createElement("li", null, "\u4E0E\u65E0 Skill \u6761\u4EF6\u76F8\u6BD4\u7684\u5BA1\u7F8E\u3001\u6548\u7387\u63D0\u5347")))), /*#__PURE__*/React.createElement("p", {
    className: "u-note"
  }, "\u524D\u7AEF\u539F\u578B\u4E0D\u7B49\u4E8E\u5B8C\u6574\u4E1A\u52A1\u7CFB\u7EDF\u3002\u8D26\u6237\u3001\u6570\u636E\u5E93\u3001\u652F\u4ED8\u3001\u5B89\u5168\u4E0E\u8FD0\u7EF4\u4ECD\u9700\u5B9E\u9645\u5F00\u53D1\u548C\u9A8C\u8BC1\uFF1B\u672C\u9875\u6CA1\u6709\u8FDE\u63A5\u5728\u7EBF\u6A21\u578B\u6216\u8FD9\u4E9B\u670D\u52A1\u3002")), /*#__PURE__*/React.createElement("section", {
    className: "u-section"
  }, /*#__PURE__*/React.createElement("h3", null, "\u5BF9\u6211\u4EEC\u66F4\u503C\u5F97\u501F\u9274\u7684\u4E09\u4EF6\u4E8B"), /*#__PURE__*/React.createElement("div", {
    className: "u-grid three"
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "\u6309\u4EFB\u52A1\u52A0\u8F7D"), /*#__PURE__*/React.createElement("p", null, "\u628A\u5165\u53E3\u5199\u77ED\uFF0C\u660E\u786E\u4EC0\u4E48\u65F6\u5019\u8BFB\u54EA\u4EFD\u4E13\u9879\u8BF4\u660E\uFF0C\u907F\u514D\u6BCF\u9879\u4EFB\u52A1\u90FD\u52A0\u8F7D\u5168\u90E8\u89C4\u5219\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "\u89C4\u8303\u7ED1\u5B9A\u9879\u76EE"), /*#__PURE__*/React.createElement("p", null, "\u4FDD\u5B58\u771F\u5B9E\u7EC4\u4EF6\u548C\u54C1\u724C\u7EA6\u675F\uFF0C\u7EE7\u7EED\u4EFB\u52A1\u65F6\u6062\u590D\uFF1B\u6BD4\u6BCF\u6B21\u91CD\u590D\u6CDB\u6CDB\u7684\u201C\u505A\u5F97\u597D\u770B\u201D\u66F4\u53EF\u6267\u884C\u3002")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("h4", null, "\u7528\u5DE5\u5177\u5B8C\u6210\u91CD\u590D\u5DE5\u4F5C"), /*#__PURE__*/React.createElement("p", null, "\u5C06\u7F16\u8BD1\u3001\u683C\u5F0F\u8F6C\u6362\u548C\u7ED3\u6784\u68C0\u67E5\u4EA4\u7ED9\u811A\u672C\uFF0C\u628A\u8BBE\u8BA1\u5224\u65AD\u548C\u53CD\u9988\u7559\u7ED9\u4EBA\u53CA AI\uFF1B\u6548\u679C\u7528\u5B9E\u9645\u7ED3\u679C\u8BC4\u4F30\u3002")))), /*#__PURE__*/React.createElement("p", {
    className: "source-line"
  }, "\u56FA\u5B9A\u7248\u672C ", /*#__PURE__*/React.createElement("a", {
    href: upstream,
    target: "_blank",
    rel: "noreferrer"
  }, "026d4ea"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "../notes/research.md",
    target: "_blank"
  }, "\u5B9E\u6D4B\u7814\u7A76\u8BB0\u5F55"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "../notes/understanding.md",
    target: "_blank"
  }, "\u5B8C\u6574\u7406\u89E3\u4E0E\u6BD4\u8F83"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "../THIRD_PARTY_NOTICES.md",
    target: "_blank"
  }, "\u5F15\u7528\u4E0E\u8BB8\u53EF"), " \xB7 \u539F\u521B\u7814\u7A76\u5C55\u5385 \xB7 \u6D4F\u89C8\u672C\u9875\u4E0D\u8FD0\u884C AI"));
}

/* Original demonstration built following the pinned baoyu-design workflow.
   Articles are authored samples. No feed fetching or model call is simulated as real. */
const {
  useState,
  useEffect,
  useRef
} = React;
const {
  Button,
  Tag
} = window.ReaderKit_4d7f19;
const STORE = 'baoyu-design-reader-v1';
const ARTICLES = [{
  id: 1,
  title: '把阅读，变成一场有意识的探索',
  subtitle: '从收藏到理解，让每一次阅读都有所留下。',
  category: '设计',
  minutes: 6,
  color: 'violet',
  cover: 'READ / THINK',
  author: '拾页编辑部',
  body: ['我们每天遇到的信息远多于能够认真阅读的内容。一个好的阅读空间，应该先帮助你选择，再让你安心读完。', '将内容收进来只是第一步。为文章标记一个主题，写下一句自己的理解，再在需要时找回它，知识才会逐渐与你发生关系。', '这个原型围绕三个动作展开：发现值得读的内容、留出不被打扰的阅读时间，以及把真正有用的想法保存下来。试着收藏这篇文章，或把它标为已读。']
}, {
  id: 2,
  title: '界面里的留白，也是一种语言',
  subtitle: '让重要的内容被看见，让视线有地方停留。',
  category: '设计',
  minutes: 4,
  color: 'lime',
  cover: 'LESS, BUT / BETTER.',
  author: '拾页设计笔记',
  body: ['留白不是页面剩余的空地，而是信息组织的一部分。距离会告诉读者哪些内容属于同一组，也能让操作之间的优先级更清楚。', '当一个页面有太多边框、颜色和提示，读者需要先花力气理解界面，才能开始阅读。减少一种装饰，有时比添加一种效果更有效。', '在右侧调整圆角和字号，观察同一份内容如何改变阅读节奏。切换到专注列表，还可以比较不同信息密度下的体验。']
}, {
  id: 3,
  title: '一个设计系统，如何穿过不同页面',
  subtitle: '颜色与组件保持一致，表达依然可以丰富。',
  category: '工程',
  minutes: 7,
  color: 'blue',
  cover: 'BUILD / TOGETHER',
  author: '拾页工程笔记',
  body: ['设计系统将颜色、间距和组件的约定保存为可复用的文件。这样，页面之间的共同点不用靠记忆维持。', '本演示的按钮和标签来自同一个组件包。它由 baoyu-design 的原版编译脚本生成，再经导入脚本复制到演示目录。', '当主题颜色改变时，组件读取相同的 CSS 变量，于是主按钮、分类标签和选中状态一起改变。结构和行为保持原样。']
}, {
  id: 4,
  title: '从“看起来可以”到“真的能操作”',
  subtitle: '交互状态，是原型与静态画面之间的距离。',
  category: '灵感',
  minutes: 5,
  color: 'orange',
  cover: 'MAKE IT / WORK.',
  author: '拾页实验记录',
  body: ['静态设计让我们讨论视觉，交互原型让我们讨论行为。搜索没有结果时显示什么？收藏后按钮如何反馈？刷新页面后状态是否保留？', '这些问题需要在实际操作中回答。因此，这个演示实现了本地搜索、收藏、阅读状态和文章新增。它们保存在当前浏览器，不会同步到服务器。', '新增文章允许你输入标题与正文。链接只作为参考资料保存，不会自动抓取网页，也没有隐藏的 AI 摘要调用。']
}];
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) || '{}');
    return {
      saved: Array.isArray(s.saved) ? s.saved : [],
      read: Array.isArray(s.read) ? s.read : [],
      custom: Array.isArray(s.custom) ? s.custom.filter(a => a && typeof a.id === 'number' && typeof a.title === 'string' && Array.isArray(a.body)) : [],
      theme: ['purple', 'blue', 'green'].includes(s.theme) ? s.theme : 'purple',
      variant: ['magazine', 'focus', 'wireframe'].includes(s.variant) ? s.variant : 'magazine',
      radius: Number.isFinite(s.radius) ? Math.max(0, Math.min(24, s.radius)) : 14,
      font: Number.isFinite(s.font) ? Math.max(14, Math.min(20, s.font)) : 16
    };
  } catch {
    return {
      saved: [],
      read: [],
      custom: [],
      theme: 'purple',
      variant: 'magazine',
      radius: 14,
      font: 16
    };
  }
}
const glyphs = {
  book: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 4h-6a3 3 0 0 0-3 3v14a4 4 0 0 1 4-3h5z"
  })),
  grid: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7",
    rx: "1"
  })),
  star: /*#__PURE__*/React.createElement("path", {
    d: "m12 3 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.6l6.2-.9z"
  }),
  check: /*#__PURE__*/React.createElement("path", {
    d: "m5 12 4 4L19 6"
  }),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15 15 5 5"
  })),
  arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14m-6-6 6 6-6 6"
  })),
  sliders: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 6h16M4 12h16M4 18h16"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "6",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "12",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "18",
    r: "2"
  })),
  close: /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12M6 18 18 6"
  }),
  plus: /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })
};
function Icon({
  name,
  size = 18
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.65",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, glyphs[name] || glyphs.book);
}
function Cover({
  article
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'cover ' + article.color,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cover-ring"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cover-block"
  }), /*#__PURE__*/React.createElement("span", null, article.cover.split(' / ').map((v, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: v
  }, i > 0 && /*#__PURE__*/React.createElement("br", null), v))), /*#__PURE__*/React.createElement("small", null, "SHIYE / ", String(article.id).padStart(2, '0')));
}
function Dialog({
  title,
  onClose,
  children
}) {
  const ref = useRef();
  useEffect(() => {
    const d = ref.current;
    d.showModal();
    return () => d.close();
  }, []);
  return /*#__PURE__*/React.createElement("dialog", {
    ref: ref,
    className: "dialog",
    onCancel: e => {
      e.preventDefault();
      onClose();
    },
    onClick: e => {
      if (e.target === ref.current) onClose();
    }
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", null, title), /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    "aria-label": "\u5173\u95ED\u5BF9\u8BDD\u6846",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close"
  }))), children);
}
function currentPage() {
  const hash = location.hash.slice(1);
  return hash.startsWith('u-') ? 'principle' : ['prototype', 'system', 'slides', 'principle'].includes(hash) ? hash : 'principle';
}
function App() {
  const [data, setData] = useState(loadState),
    [page, setPage] = useState(currentPage),
    [filter, setFilter] = useState('all'),
    [query, setQuery] = useState(''),
    [selected, setSelected] = useState(null),
    [add, setAdd] = useState(false),
    [tweaks, setTweaks] = useState(true),
    [toast, setToast] = useState(''),
    [storageError, setStorageError] = useState(false);
  const articles = [...ARTICLES, ...data.custom];
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(data));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [data]);
  useEffect(() => {
    const handler = () => setPage(currentPage());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  const update = (key, value) => setData(s => ({
    ...s,
    [key]: value
  }));
  function toggle(key, id) {
    setData(s => ({
      ...s,
      [key]: s[key].includes(id) ? s[key].filter(x => x !== id) : [...s[key], id]
    }));
  }
  const visible = articles.filter(a => (filter === 'all' || (filter === 'saved' ? data.saved.includes(a.id) : filter === 'read' ? data.read.includes(a.id) : a.category === filter)) && (a.title + a.subtitle + a.category + a.body.join('')).toLowerCase().includes(query.toLowerCase()));
  const colors = {
    purple: ['#5144ce', '#efedff'],
    blue: ['#245ab9', '#eaf1ff'],
    green: ['#217153', '#e7f4ed']
  }[data.theme];
  const style = {
    '--accent': colors[0],
    '--accent-soft': colors[1],
    '--radius': data.radius + 'px',
    '--body-size': data.font + 'px'
  };
  const tabs = [['principle', '01', '理解与原理'], ['prototype', '02', '交互原型'], ['system', '03', '设计系统'], ['slides', '04', '演示文稿']];
  function addArticle(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get('title').trim(),
      body = form.get('body').trim();
    if (!title || !body) {
      setToast('标题和正文不能为空');
      return;
    }
    const a = {
      id: Date.now(),
      title,
      subtitle: body.slice(0, 52),
      category: form.get('category'),
      minutes: Math.max(1, Math.ceil(body.length / 300)),
      color: 'violet',
      cover: 'MY / NOTES',
      author: '我的文章',
      body: body.split(/\n+/),
      url: form.get('url').trim()
    };
    setData(s => ({
      ...s,
      custom: [...s.custom, a]
    }));
    setFilter('all');
    setQuery('');
    setAdd(false);
    setToast('已保存到当前浏览器');
  }
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    className: "lab"
  }, /*#__PURE__*/React.createElement("a", {
    className: "skip",
    href: "#main"
  }, "\u8DF3\u8F6C\u5230\u5185\u5BB9"), /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#principle",
    className: "wordmark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-mark"
  }, "b."), /*#__PURE__*/React.createElement("strong", null, "baoyu", /*#__PURE__*/React.createElement("span", null, " / design lab"))), /*#__PURE__*/React.createElement("div", {
    className: "top-meta"
  }, /*#__PURE__*/React.createElement("span", null, "\u5F00\u6E90\u80FD\u529B\u5B9E\u9A8C \xB7 008"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/JimLiu/baoyu-design",
    target: "_blank",
    rel: "noreferrer"
  }, "\u4E0A\u6E38\u4ED3\u5E93 \u2197"))), /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "intro"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "BAOYU-DESIGN / PROJECT GUIDE"), /*#__PURE__*/React.createElement("h1", null, "\u8BA9 AI \u6309\u8BBE\u8BA1\u89C4\u8303\uFF0C\u5B8C\u6210\u591A\u79CD\u8BBE\u8BA1\u6210\u679C\u3002"), /*#__PURE__*/React.createElement("p", null, "\u9762\u5411 AI \u7F16\u7A0B\u52A9\u624B\u7684\u8BBE\u8BA1 Skill \u5DE5\u5177\u5305\uFF1A\u4ECE\u754C\u9762\u539F\u578B\u3001\u6F14\u793A\u6587\u7A3F\u5230\u6587\u6863\u4E0E\u53EF\u89C6\u5316\uFF0C\u5171\u4EAB\u8BBE\u8BA1\u89C4\u8303\u3001\u7EC4\u4EF6\u548C\u4EA4\u4ED8\u5DE5\u5177\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "intro-note"
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-dot"
  }), "\u57FA\u4E8E baoyu-design \u5DE5\u4F5C\u6D41\u5236\u4F5C", /*#__PURE__*/React.createElement("span", {
    className: "subtle"
  }, "\u539F\u521B\u6F14\u793A \xB7 \u975E\u4E0A\u6E38\u64CD\u4F5C\u540E\u53F0"))), /*#__PURE__*/React.createElement("nav", {
    className: "tabs",
    "aria-label": "\u80FD\u529B\u6F14\u793A"
  }, /*#__PURE__*/React.createElement("div", null, tabs.map(([id, num, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    className: page === id ? 'active' : '',
    "aria-current": page === id ? 'page' : undefined
  }, /*#__PURE__*/React.createElement("span", null, num), label))), /*#__PURE__*/React.createElement("span", {
    className: "tab-aside"
  }, "\u4E00\u4E2A\u9700\u6C42\uFF0C\u591A\u79CD\u53EF\u4EA4\u4ED8\u6210\u679C")), page === 'prototype' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "experiment-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "variant-picker",
    "aria-label": "\u8BBE\u8BA1\u65B9\u5411"
  }, [['magazine', '杂志卡片'], ['focus', '专注列表'], ['wireframe', '结构线框']].map(([id, label], i) => /*#__PURE__*/React.createElement("button", {
    key: id,
    "aria-pressed": data.variant === id,
    className: data.variant === id ? 'selected' : '',
    onClick: () => update('variant', id)
  }, /*#__PURE__*/React.createElement("span", null, String.fromCharCode(65 + i)), label))), /*#__PURE__*/React.createElement("button", {
    className: 'tweak-toggle ' + (tweaks ? 'selected' : ''),
    "aria-expanded": tweaks,
    onClick: () => setTweaks(!tweaks)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sliders"
  }), "\u5916\u89C2\u8C03\u6821")), /*#__PURE__*/React.createElement("div", {
    className: 'workspace ' + (tweaks ? '' : 'no-inspector')
  }, /*#__PURE__*/React.createElement("div", {
    className: 'reader ' + data.variant
  }, /*#__PURE__*/React.createElement("aside", {
    className: "reader-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reader-brand"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 24
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "\u62FE\u9875"), /*#__PURE__*/React.createElement("small", null, "\u7ED9\u60F3\u6CD5\u4E00\u4E2A\u5F52\u5904"))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-label"
  }, "\u6211\u7684\u7A7A\u95F4"), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "\u6587\u7AE0\u5206\u7C7B"
  }, [['all', 'grid', '全部文章', articles.length], ['saved', 'star', '我的收藏', data.saved.length], ['read', 'check', '已经读过', data.read.length]].map(([id, icon, label, count]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    className: filter === id ? 'active' : '',
    onClick: () => {
      setFilter(id);
      setSelected(null);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }), /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("small", null, count)))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-label"
  }, "\u4E3B\u9898\u5408\u96C6"), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "\u4E3B\u9898"
  }, ['设计', '工程', '灵感'].map((v, i) => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: filter === v ? 'active' : '',
    onClick: () => {
      setFilter(v);
      setSelected(null);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: 'topic-dot topic-' + i
  }), /*#__PURE__*/React.createElement("span", null, v), /*#__PURE__*/React.createElement("small", null, articles.filter(a => a.category === v).length)))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, "\u62FE"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "\u6211\u7684\u9605\u8BFB\u7A7A\u95F4"), /*#__PURE__*/React.createElement("small", null, "\u4EC5\u5728\u6B64\u6D4F\u89C8\u5668\u4FDD\u5B58")))), /*#__PURE__*/React.createElement("section", {
    className: "reader-content"
  }, /*#__PURE__*/React.createElement("header", {
    className: "reader-top"
  }, /*#__PURE__*/React.createElement("span", null, "WORKSPACE ", /*#__PURE__*/React.createElement("span", {
    className: "slash"
  }, "/"), " ", filter === 'all' ? '全部文章' : filter === 'saved' ? '我的收藏' : filter === 'read' ? '已经读过' : filter), /*#__PURE__*/React.createElement("span", {
    className: "local-badge"
  }, "\u672C\u5730\u6F14\u793A")), selected ? /*#__PURE__*/React.createElement("article", {
    className: "article-detail"
  }, /*#__PURE__*/React.createElement("button", {
    className: "back-link",
    onClick: () => setSelected(null)
  }, "\u2190 \u8FD4\u56DE\u6587\u7AE0\u5217\u8868"), /*#__PURE__*/React.createElement("div", {
    className: "detail-meta"
  }, /*#__PURE__*/React.createElement(Tag, {
    label: selected.category
  }), /*#__PURE__*/React.createElement("span", null, selected.minutes, " \u5206\u949F\u9605\u8BFB \xB7 ", selected.author)), /*#__PURE__*/React.createElement("h2", null, selected.title), /*#__PURE__*/React.createElement("p", {
    className: "detail-subtitle"
  }, selected.subtitle), /*#__PURE__*/React.createElement("div", {
    className: "detail-body"
  }, selected.body.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, p))), selected.url && /*#__PURE__*/React.createElement("a", {
    href: selected.url,
    target: "_blank",
    rel: "noreferrer"
  }, "\u67E5\u770B\u53C2\u8003\u94FE\u63A5 \u2197"), /*#__PURE__*/React.createElement("div", {
    className: "detail-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    label: data.saved.includes(selected.id) ? '取消收藏' : '收藏文章',
    onClick: () => toggle('saved', selected.id)
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    label: data.read.includes(selected.id) ? '标为未读' : '标为已读',
    onClick: () => toggle('read', selected.id)
  }), data.custom.some(a => a.id === selected.id) && /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    label: "\u5220\u9664\u6B64\u6587\u7AE0",
    onClick: () => {
      const id = selected.id;
      setData(s => ({
        ...s,
        custom: s.custom.filter(a => a.id !== id),
        saved: s.saved.filter(x => x !== id),
        read: s.read.filter(x => x !== id)
      }));
      setSelected(null);
      setToast('已删除这篇本地文章');
    }
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "collection-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "YOUR DAILY INSPIRATION"), /*#__PURE__*/React.createElement("h2", null, filter === 'all' ? '值得慢慢读的，都在这里。' : filter === 'saved' ? '留住那些有共鸣的想法。' : filter === 'read' ? '每次读完，都有一点收获。' : filter + '，值得再看一眼。'), /*#__PURE__*/React.createElement("p", null, visible.length, " \u7BC7\u5185\u5BB9 \xB7 \u4E0D\u6025\u7740\u8BFB\u5B8C\uFF0C\u5148\u627E\u5230\u559C\u6B22\u7684\u3002")), /*#__PURE__*/React.createElement(Button, {
    label: "\uFF0B \u6DFB\u52A0\u6587\u7AE0",
    onClick: () => setAdd(true)
  })), /*#__PURE__*/React.createElement("label", {
    className: "search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    "aria-label": "\u641C\u7D22\u6587\u7AE0",
    placeholder: "\u641C\u7D22\u6807\u9898\u3001\u4E3B\u9898\u6216\u6B63\u6587\u2026",
    value: query,
    onChange: e => setQuery(e.target.value)
  }), query && /*#__PURE__*/React.createElement("button", {
    "aria-label": "\u6E05\u7A7A\u641C\u7D22",
    onClick: () => setQuery('')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 16
  })), /*#__PURE__*/React.createElement("span", null, "\u672C\u5730\u641C\u7D22")), /*#__PURE__*/React.createElement("div", {
    className: "article-grid"
  }, visible.map(a => /*#__PURE__*/React.createElement("article", {
    className: "article-card",
    key: a.id
  }, /*#__PURE__*/React.createElement("button", {
    className: "cover-button",
    "aria-label": '阅读：' + a.title,
    onClick: () => setSelected(a)
  }, /*#__PURE__*/React.createElement(Cover, {
    article: a
  })), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-meta"
  }, /*#__PURE__*/React.createElement(Tag, {
    label: a.category
  }), /*#__PURE__*/React.createElement("span", null, a.minutes, " \u5206\u949F\u9605\u8BFB")), /*#__PURE__*/React.createElement("button", {
    className: "article-title",
    onClick: () => setSelected(a)
  }, /*#__PURE__*/React.createElement("h3", null, a.title)), /*#__PURE__*/React.createElement("p", null, a.subtitle), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("span", null, data.read.includes(a.id) ? '✓ 已读' : a.author), /*#__PURE__*/React.createElement("button", {
    className: 'save ' + (data.saved.includes(a.id) ? 'is-saved' : ''),
    "aria-label": (data.saved.includes(a.id) ? '取消收藏：' : '收藏：') + a.title,
    "aria-pressed": data.saved.includes(a.id),
    onClick: () => toggle('saved', a.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star"
  }))))))), !visible.length && /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 36
  }), /*#__PURE__*/React.createElement("h3", null, query ? '没有找到匹配内容' : '这里还没有文章'), /*#__PURE__*/React.createElement("p", null, query ? '换个关键词，或清空筛选再看看。' : filter === 'saved' ? '点击文章卡片的星标，把喜欢的内容留在这里。' : '读完一篇文章，或添加自己的内容。'), /*#__PURE__*/React.createElement(Button, {
    label: "\u67E5\u770B\u5168\u90E8\u6587\u7AE0",
    variant: "secondary",
    onClick: () => {
      setFilter('all');
      setQuery('');
    }
  }))), /*#__PURE__*/React.createElement("footer", {
    className: "reader-footer"
  }, /*#__PURE__*/React.createElement("span", null, "SHIYE / A QUIETER PLACE TO READ"), /*#__PURE__*/React.createElement("span", null, "\u5185\u5BB9\u4E3A\u539F\u521B\u6F14\u793A\u6837\u672C")))), tweaks && /*#__PURE__*/React.createElement("aside", {
    className: "inspector"
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement(Icon, {
    name: "sliders"
  }), /*#__PURE__*/React.createElement("strong", null, "\u628A\u5B83\u8C03\u6210\u4F60\u7684\u6837\u5B50")), /*#__PURE__*/React.createElement("p", null, "\u540C\u4E00\u5957\u5185\u5BB9\u4E0E\u7EC4\u4EF6\uFF0C\u5B9E\u65F6\u63A2\u7D22\u4E0D\u540C\u8868\u8FBE\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "control-group"
  }, /*#__PURE__*/React.createElement("label", null, "\u54C1\u724C\u4E3B\u8272 ", /*#__PURE__*/React.createElement("small", null, colors[0].toUpperCase())), /*#__PURE__*/React.createElement("div", {
    className: "swatch-buttons"
  }, [['purple', '#5144ce', '鸢尾紫'], ['blue', '#245ab9', '探索蓝'], ['green', '#217153', '森林绿']].map(([id, color, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    style: {
      background: color
    },
    "aria-label": label,
    "aria-pressed": data.theme === id,
    onClick: () => update('theme', id)
  }, data.theme === id && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 17
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "control-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "radius"
  }, "\u7EC4\u4EF6\u5706\u89D2 ", /*#__PURE__*/React.createElement("small", null, data.radius, "px")), /*#__PURE__*/React.createElement("input", {
    id: "radius",
    type: "range",
    min: "0",
    max: "24",
    value: data.radius,
    onChange: e => update('radius', +e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "range-label"
  }, /*#__PURE__*/React.createElement("span", null, "\u5229\u843D"), /*#__PURE__*/React.createElement("span", null, "\u67D4\u548C"))), /*#__PURE__*/React.createElement("div", {
    className: "control-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "font"
  }, "\u9605\u8BFB\u5B57\u53F7 ", /*#__PURE__*/React.createElement("small", null, data.font, "px")), /*#__PURE__*/React.createElement("input", {
    id: "font",
    type: "range",
    min: "14",
    max: "20",
    value: data.font,
    onChange: e => update('font', +e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "range-label"
  }, /*#__PURE__*/React.createElement("span", null, "Aa"), /*#__PURE__*/React.createElement("span", {
    className: "big-aa"
  }, "Aa"))), /*#__PURE__*/React.createElement("div", {
    className: "sample-card"
  }, /*#__PURE__*/React.createElement(Tag, {
    label: "\u5B9E\u65F6\u7EC4\u4EF6"
  }), /*#__PURE__*/React.createElement("p", null, "Button & Tag"), /*#__PURE__*/React.createElement(Button, {
    label: "\u8BD5\u8BD5\u8FD9\u4E2A\u6309\u94AE",
    onClick: () => setToast('此按钮来自上游编译器生成的组件包')
  })), /*#__PURE__*/React.createElement("button", {
    className: "reset",
    onClick: () => setData(s => ({
      ...s,
      theme: 'purple',
      radius: 14,
      font: 16,
      variant: 'magazine'
    }))
  }, "\u6062\u590D\u9ED8\u8BA4\u5916\u89C2"), /*#__PURE__*/React.createElement("div", {
    className: "inspector-note"
  }, /*#__PURE__*/React.createElement("strong", null, "\u89C2\u5BDF\u4EC0\u4E48\uFF1F"), /*#__PURE__*/React.createElement("p", null, "\u4E3B\u6309\u94AE\u3001\u6807\u7B7E\u4E0E\u9009\u4E2D\u72B6\u6001\u4E00\u8D77\u53D8\u5316\uFF0C\u4F53\u73B0\u8BBE\u8BA1\u53D8\u91CF\u7684\u7EDF\u4E00\u590D\u7528\u3002")))), /*#__PURE__*/React.createElement("div", {
    className: "under-workspace"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "status-dot"
  }), "\u53EF\u64CD\u4F5C\uFF1A\u641C\u7D22\u3001\u6536\u85CF\u3001\u9605\u8BFB\u3001\u65B0\u589E\u3001\u5237\u65B0\u4FDD\u7559"), /*#__PURE__*/React.createElement("span", null, "\u8BD5\u8BD5\u5148\u6536\u85CF\u4E00\u7BC7\uFF0C\u518D\u5207\u6362\u300C\u6211\u7684\u6536\u85CF\u300D\u3002"))), page === 'system' && /*#__PURE__*/React.createElement("section", {
    className: "exhibit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "ONE SYSTEM, MANY SCREENS"), /*#__PURE__*/React.createElement("h2", null, "\u628A\u4E00\u81F4\u6027\uFF0C\u653E\u8FDB\u53EF\u590D\u7528\u7684\u6587\u4EF6\u3002"), /*#__PURE__*/React.createElement("p", null, "\u6309\u94AE\u4E0E\u6807\u7B7E\u7ECF\u8FC7\u539F\u7248\u7F16\u8BD1\u5668\u751F\u6210\uFF0C\u518D\u7531\u539F\u7248\u5BFC\u5165\u5DE5\u5177\u7ED1\u5B9A\u5230\u8FD9\u4E2A\u6F14\u793A\u3002")), /*#__PURE__*/React.createElement("a", {
    className: "text-link",
    href: "../code/reader-kit/preview.html",
    target: "_blank",
    rel: "noreferrer"
  }, "\u6253\u5F00\u5B8C\u6574\u7EC4\u4EF6\u9884\u89C8 \u2197")), /*#__PURE__*/React.createElement("div", {
    className: "system-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "system-flow"
  }, [['01', '定义', '15 个设计变量，2 个交互组件'], ['02', '编译', '输出组件包、清单与检查规则'], ['03', '检查', '上游只读检查器检查结构'], ['04', '复用', '导入到项目，界面加载同一组件包']].map(([n, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("span", null, n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("p", null, d))))), /*#__PURE__*/React.createElement("div", {
    className: "component-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "LIVE COMPONENTS"), /*#__PURE__*/React.createElement("h3", null, "\u770B\u5F97\u89C1\uFF0C\u4E5F\u80FD\u70B9\u7684\u89C4\u8303\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "component-row"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "\u4E3B\u8981\u64CD\u4F5C",
    onClick: () => setToast('主按钮已响应')
  }), /*#__PURE__*/React.createElement(Button, {
    label: "\u6B21\u7EA7\u64CD\u4F5C",
    variant: "secondary",
    onClick: () => setToast('次级按钮已响应')
  }), /*#__PURE__*/React.createElement(Button, {
    label: "\u7981\u7528\u72B6\u6001",
    disabled: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "component-row"
  }, /*#__PURE__*/React.createElement(Tag, {
    label: "\u8BBE\u8BA1"
  }), /*#__PURE__*/React.createElement(Tag, {
    label: "\u8F85\u52A9\u4FE1\u606F",
    tone: "neutral"
  }), /*#__PURE__*/React.createElement(Tag, {
    label: "\u5DF2\u4FDD\u5B58",
    tone: "success"
  })), /*#__PURE__*/React.createElement("div", {
    className: "token-grid"
  }, [['主色', colors[0]], ['文字', '#222338'], ['浅底', colors[1]], ['画布', '#f5f5fa']].map(([label, color]) => /*#__PURE__*/React.createElement("div", {
    key: label
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("code", null, color)))), /*#__PURE__*/React.createElement("p", {
    className: "fine-print"
  }, "\u5207\u56DE\u300C\u4EA4\u4E92\u539F\u578B\u300D\u8C03\u6574\u4E3B\u8272\uFF0C\u7EC4\u4EF6\u5728\u8FD9\u91CC\u4E5F\u4F1A\u540C\u6B65\u53D8\u5316\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "evidence-banner"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "\u6709\u751F\u6210\u8BB0\u5F55\uFF0C\u53EF\u4EE5\u56DE\u67E5"), /*#__PURE__*/React.createElement("p", null, "\u7EC4\u4EF6\u4E0D\u662F\u624B\u5199\u6210\u201C\u7F16\u8BD1\u7ED3\u679C\u201D\u3002\u6E90\u6587\u4EF6\u3001\u751F\u6210\u6E05\u5355\u548C\u6267\u884C\u8BB0\u5F55\u90FD\u4FDD\u5B58\u5728\u5B50\u9879\u76EE\u4E2D\u3002")), /*#__PURE__*/React.createElement("a", {
    href: "../notes/evidence/upstream-tools.json",
    target: "_blank"
  }, "\u67E5\u770B\u8BB0\u5F55 \u2197"))), page === 'slides' && /*#__PURE__*/React.createElement("section", {
    className: "exhibit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "A DECK IS ALSO A WEB PAGE"), /*#__PURE__*/React.createElement("h2", null, "\u628A\u540C\u4E00\u4E2A\u60F3\u6CD5\uFF0C\u8BB2\u6210\u4E00\u4EFD\u6F14\u793A\u3002"), /*#__PURE__*/React.createElement("p", null, "\u56DB\u9875\u6F14\u793A\u4F7F\u7528\u4E0A\u6E38\u539F\u7248 deck-stage\uFF1A\u7FFB\u9875\u3001\u5168\u5C4F\u4E0E\u5206\u6B65\u52A8\u753B\u3002")), /*#__PURE__*/React.createElement("a", {
    className: "text-link",
    href: "./deck.html",
    target: "_blank",
    rel: "noreferrer"
  }, "\u72EC\u7ACB\u7A97\u53E3\u64AD\u653E \u2197")), /*#__PURE__*/React.createElement("iframe", {
    className: "deck-frame",
    src: "./deck.html",
    title: "\u62FE\u9875\u9605\u8BFB\u4EA7\u54C1\u6F14\u793A\u6587\u7A3F",
    allow: "fullscreen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "deck-bottom"
  }, /*#__PURE__*/React.createElement("p", null, "\u70B9\u51FB\u753B\u9762\u540E\uFF0C\u7528 \u2190 \u2192 \u7FFB\u9875\uFF1B\u7B2C\u4E09\u9875\u6309 \u2192 \u4F9D\u6B21\u5C55\u793A\u4E09\u4E2A\u6B65\u9AA4\u3002\u6309 F \u5168\u5C4F\u3002"), /*#__PURE__*/React.createElement("a", {
    className: "download",
    href: "./downloads/shiye-design.pptx",
    download: true
  }, "\u4E0B\u8F7D\u53EF\u7F16\u8F91 PPTX \u2193"))), page === 'principle' && /*#__PURE__*/React.createElement(Understanding, null), /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("span", null, "BAOYU-DESIGN / CAPABILITY STUDY"), /*#__PURE__*/React.createElement("span", null, "\u4EA4\u4E92\u539F\u578B\u7531\u672C\u9879\u76EE\u5236\u4F5C \xB7 \u7EC4\u4EF6\u5DE5\u5177\u4E0E\u5E7B\u706F\u7247\u821E\u53F0\u6765\u81EA\u4E0A\u6E38"), /*#__PURE__*/React.createElement("a", {
    href: "../README.md",
    target: "_blank"
  }, "\u9879\u76EE\u8BF4\u660E \u2197"))), storageError && /*#__PURE__*/React.createElement("div", {
    role: "alert",
    className: "storage-warning"
  }, "\u6D4F\u89C8\u5668\u4E0D\u5141\u8BB8\u672C\u5730\u4FDD\u5B58\uFF1B\u5F53\u524D\u4ECD\u53EF\u64CD\u4F5C\uFF0C\u5237\u65B0\u540E\u6539\u52A8\u53EF\u80FD\u4E22\u5931\u3002"), toast && /*#__PURE__*/React.createElement("div", {
    className: "toast",
    role: "status"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), toast), add && /*#__PURE__*/React.createElement(Dialog, {
    title: "\u628A\u503C\u5F97\u8BFB\u7684\u5185\u5BB9\u7559\u5728\u8FD9\u91CC",
    onClose: () => setAdd(false)
  }, /*#__PURE__*/React.createElement("p", {
    className: "dialog-note"
  }, "\u624B\u52A8\u8F93\u5165\u6F14\u793A\u6587\u7AE0\uFF0C\u4EC5\u4FDD\u5B58\u5230\u5F53\u524D\u6D4F\u89C8\u5668\u3002"), /*#__PURE__*/React.createElement("form", {
    onSubmit: addArticle
  }, /*#__PURE__*/React.createElement("label", null, "\u6587\u7AE0\u6807\u9898", /*#__PURE__*/React.createElement("input", {
    name: "title",
    required: true,
    maxLength: "80",
    placeholder: "\u4E00\u4E2A\u503C\u5F97\u8BB0\u5F55\u7684\u60F3\u6CD5",
    autoFocus: true
  })), /*#__PURE__*/React.createElement("label", null, "\u4E3B\u9898", /*#__PURE__*/React.createElement("select", {
    name: "category"
  }, /*#__PURE__*/React.createElement("option", null, "\u8BBE\u8BA1"), /*#__PURE__*/React.createElement("option", null, "\u5DE5\u7A0B"), /*#__PURE__*/React.createElement("option", null, "\u7075\u611F"))), /*#__PURE__*/React.createElement("label", null, "\u53C2\u8003\u94FE\u63A5\uFF08\u9009\u586B\uFF09", /*#__PURE__*/React.createElement("input", {
    name: "url",
    type: "url",
    pattern: "https?://.*",
    placeholder: "https://\u2026"
  })), /*#__PURE__*/React.createElement("label", null, "\u6B63\u6587", /*#__PURE__*/React.createElement("textarea", {
    name: "body",
    required: true,
    maxLength: "20000",
    rows: "5",
    placeholder: "\u7C98\u8D34\u6B63\u6587\uFF0C\u6216\u8BB0\u4E0B\u4F60\u81EA\u5DF1\u7684\u7406\u89E3\u2026"
  })), /*#__PURE__*/React.createElement("p", {
    className: "fine-print"
  }, "\u53C2\u8003\u94FE\u63A5\u4EC5\u4F5C\u4E3A\u94FE\u63A5\u4FDD\u5B58\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u6293\u53D6\u7F51\u9875\u3002"), /*#__PURE__*/React.createElement("button", {
    className: "ds-button",
    type: "submit"
  }, "\u4FDD\u5B58\u6587\u7AE0"))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
