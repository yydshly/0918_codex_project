// 本展厅的中文分析与教学数据；不执行第三方插件或调用模型。
const UPSTREAM = 'https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit/blob/2a6d0958e6966e0003896f94ce5003466e89e91d/README.md';
const SOURCES = [
  {id:'toolkit', name:'Toolkit · 目录与组合建议', repo:'wilwaldon/Claude-Code-Frontend-Design-Toolkit', sha:'2a6d0958e6966e0003896f94ce5003466e89e91d', path:'README.md', finding:'文件树只有 README.md；无统一运行入口。README 声明 MIT，但该版本缺少所链接的 LICENSE。'},
  {id:'skill', name:'Frontend Design · 指令层', repo:'anthropics/claude-code', sha:'31a3b00bef145a0393d9dbf840a98674fec07712', path:'plugins/frontend-design/skills/frontend-design/SKILL.md', finding:'可读的设计指令：先规划配色、字体、布局，再检查并实现。属于上下文引导。'},
  {id:'docs', name:'Context7 · 资料层', repo:'upstash/context7', sha:'dedb03d589e6e03e8fb5a2b858bd3c853ac6893e', path:'README.md', finding:'先匹配库标识，再查询相关文档；资料进入模型上下文。检索结果仍需判断。'},
  {id:'browser', name:'Playwright MCP · 执行层', repo:'microsoft/playwright-mcp', sha:'ea43eee0d95196ab31f7619b26f78d7b9c664286', path:'README.md', finding:'通过结构化页面快照及浏览器操作连接模型与网页；可截图核对视觉。'},
  {id:'devtools', name:'Chrome DevTools MCP · 纠错', repo:'ChromeDevTools/chrome-devtools-mcp', sha:'23b9a480010d803fc8962bb5d11017b1e2ad76b2', path:'README.md', finding:'官方示例使用 chrome-devtools-mcp 包；Toolkit 所列作者和包名与官方仓库不一致。'}
];
const sourceURL = id => { const s=SOURCES.find(s=>s.id===id); return `https://github.com/${s.repo}/blob/${s.sha}/${s.path}`; };
const CAPS = [
  {id:'design',group:'设计',title:'视觉方向',short:'让字体、布局与产品主题有关。',tools:'Frontend Design / Taste Skill',input:'产品定位、受众、内容和参考方向',output:'设计方案、排版与页面实现',mechanism:'把设计原则与自查步骤放进模型上下文，影响生成时的选择。',limit:'规则是软约束；没有审美评分器，也不保证一次生成就符合预期。',evidence:'代表指令已核查',source:'skill'},
  {id:'tokens',group:'设计',title:'全站主题',short:'将颜色、间距与字体集中管理。',tools:'Theme blocks / Design Tokens',input:'品牌要求、颜色及组件规范',output:'共享样式变量与主题约定',mechanism:'项目规则约束后续工作；CSS 变量让组件引用同一组样式值。',limit:'指令不会自动重构现有页面；组件必须真正使用这些变量。',evidence:'目录已核查；下方有本地示意',source:'toolkit'},
  {id:'motion',group:'实现',title:'动效与交互',short:'把运动意图落实成代码。',tools:'GSAP / Motion 相关 Skills',input:'触发方式、动画目标、性能要求',output:'过渡、滚动或手势动画代码',mechanism:'补充库用法与交互模式，由模型编写代码、浏览器执行。',limit:'动效库仍需项目安装；流畅度和减少动态效果设置需另外检查。',evidence:'目录已核查；工具未实测',source:'toolkit'},
  {id:'ux',group:'设计',title:'体验与可访问性',short:'检查流程、状态和使用障碍。',tools:'UX / Accessibility Skills',input:'用户任务、流程与页面状态',output:'问题清单与修改建议',mechanism:'用检查清单引导模型检查交互与实现。',limit:'不能替代真实用户研究；列出原则不等于已经通过可访问性验收。',evidence:'目录已核查；工具未实测',source:'toolkit'},
  {id:'figma',group:'实现',title:'设计稿衔接',short:'为代码生成提供设计结构。',tools:'Figma MCP / Code Connect',input:'有权访问的设计稿与组件映射',output:'布局、样式信息与组件复用线索',mechanism:'工具读取设计资料，模型结合项目代码完成实现。',limit:'依赖访问权限和设计资料质量；还原效果需要浏览器对照。',evidence:'目录已核查；连接未实测',source:'toolkit'},
  {id:'testing',group:'验证',title:'浏览器检查',short:'在真实页面上操作与观察。',tools:'Playwright MCP / DevTools',input:'运行中的网页及验收步骤',output:'操作结果、页面快照、截图或诊断',mechanism:'模型调用浏览器工具，取得结果，再决定如何修改。',limit:'页面结构可读不代表视觉美观；审美仍需截图审查和人判断。',evidence:'官方接口已核查',source:'browser'},
  {id:'context',group:'实现',title:'框架知识与文档',short:'针对具体问题补充参考资料。',tools:'Context7 / Framework Skills',input:'技术库、版本与具体问题',output:'相关文档、代码示例和用法',mechanism:'检索资料进入上下文，模型据此生成代码。',limit:'库覆盖、版本匹配与文档本身都有边界；不能保证消除错误。',evidence:'官方接口已核查',source:'docs'},
  {id:'deploy',group:'交付',title:'预览与部署',short:'把成果交给独立托管工具。',tools:'Vercel MCP / PinMe',input:'可构建项目、平台配置及权限',output:'构建结果、预览或部署地址',mechanism:'外部工具执行构建与发布；Toolkit 提供选型线索。',limit:'服务限制和配置各不相同；本文未验证部署工具。',evidence:'目录已核查；部署未实测',source:'toolkit'}
];
const STEPS = [
  {title:'明确任务',actor:'人 / 产品负责人',input:'为一个科研工具制作介绍页',action:'确定受众、真实内容和验收条件，避免只说“做得好看”。',output:'目标：研究者快速理解用途，并找到试用入口。',boundary:'需求和评价标准需要由人确认。'},
  {title:'加载规则',actor:'编码助手 + Skills',input:'设计手册、项目规范、品牌偏好',action:'先形成配色、字体、布局方案；对照任务检查。',output:'一份具体的设计方案与共享样式约定。',boundary:'这是对模型的指令，不是强制执行的校验器。'},
  {title:'补充资料',actor:'文档 / 设计工具',input:'库版本、设计文件、现有组件',action:'按需检索相关文档，读取可用的设计和组件资料。',output:'代码生成所需的参考上下文。',boundary:'工具需要单独配置；检索结果可能不完整。'},
  {title:'编写页面',actor:'编码助手',input:'设计方案 + 资料 + 项目源码',action:'修改组件和样式，运行项目，处理构建问题。',output:'可以在本地浏览的页面。',boundary:'实际生成质量取决于模型、需求和项目环境。'},
  {title:'浏览器核对',actor:'浏览器工具 + 人',input:'运行页面及验收条件',action:'检查操作、尺寸和截图，把发现的问题反馈给编码助手。',output:'例如：移动端标题溢出，需要调整布局。',boundary:'这里的例子是预设教学内容，没有执行模型或浏览器工具调用。'},
  {title:'修正与交付',actor:'编码助手 + 人',input:'问题清单与修改后的页面',action:'重新检查关键交互与视觉；通过后按需发布。',output:'页面文件、验证记录，以及部署成功后才存在的地址。',boundary:'本仓库没有内置循环调度器；上述流程是研究者归纳。'}
];
const SCENARIOS = [
  {id:'landing',title:'从零做介绍页',need:'缺少明确视觉方向',stack:['Frontend Design','项目主题规则','浏览器检查'],reason:'先解决内容与排版决策，再检查页面实际效果。遇到陌生框架用法时补充文档检索。',accept:'桌面和手机上内容清晰；入口可用；风格符合具体产品。',avoid:'一开始叠加多套审美 Skill，可能让规则彼此矛盾。'},
  {id:'system',title:'维护多页产品',need:'不同页面风格逐渐不一致',stack:['共享设计变量','组件复用规则','交互与视觉回归'],reason:'把颜色、间距和组件约定落实到代码，新增页面持续复用。',accept:'同一语义颜色与按钮来自同一配置；主要状态有检查记录。',avoid:'仅在提示词里要求“保持一致”，却继续为每个页面写独立样式。'},
  {id:'handoff',title:'有设计稿交接',need:'设计信息到代码存在损耗',stack:['Figma MCP','组件映射','浏览器对照'],reason:'先获取设计结构和已有组件关系，减少凭截图猜测的部分。',accept:'关键布局、字号、状态与设计要求逐项对照。',avoid:'把有设计稿等同于自动完成响应式和业务逻辑。'},
  {id:'fix',title:'页面已有问题',need:'交互失败或运行缓慢',stack:['浏览器复现','DevTools 诊断','相关版本文档'],reason:'先取得可复现证据，再围绕问题补充资料并修复。',accept:'原问题可复现、修改后消失，相关操作没有回归。',avoid:'尚未定位问题就安装全部工具，扩大调试范围。'}
];
