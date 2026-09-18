/* Original research content. All task outputs below are authored teaching samples. */
const COS = {
  source: 'https://github.com/totec448-spec/chat-on-steroids/blob/2f9acf307189ed1f05bee0cdc97871fdcff1d8f5/',
  drives: {
    chat: {letter:'A', title:'CoS 驱动 ChatGPT 网页', subtitle:'把聊天窗口变成可组织的任务执行入口。',
      nodes:[['LOCAL WORKSPACE','CoS 本地工作台','保存任务、项目和会话记录'],['BROWSER BRIDGE','Chrome 扩展','递送输入，观察会话状态'],['PROVIDER CHAT','ChatGPT 网页会话','承载真实对话；推理由云端完成']],
      result:'你手动开窗口、分派任务、转发结果和输入“继续”的部分操作，被会话编排程序接管。文件与终端工具的执行仍走独立 MCP 链路。',path:'AGENTS.md'},
    web: {letter:'B', title:'ChatGPT 通过 CoS 驱动其他网页', subtitle:'模型调用工具，扩展在目标标签页执行并返回结果。',
      nodes:[['MODEL TOOL CALL','ChatGPT 服务端 → MCP','经隧道到达本地浏览器工具'],['LOCAL EXECUTION','CoS → Chrome 扩展','本机桥接，再通过 CDP 执行'],['TARGET PAGE','其他网页标签页','读取 DOM、截图、点击与填表']],
      result:'目标网页可以在后台操作，不必一直占用前台鼠标。页面快照、截图、控制台与请求结果返回模型，供它判断下一步；是否完成仍需验证。',path:'src/main/mcp/tools-browser.ts'}
  },
  capabilities:[
    {id:'files',name:'文件与终端',group:'执行 / Core',headline:'形成真实的本地开发闭环',description:'模型通过 MCP 读取项目、应用补丁、运行命令，再根据实际结果继续工作。',mechanism:'read / apply_patch / exec_command / write_stdin；长命令以进程会话 ID 继续交互。',example:'研究源码、修改登录逻辑、运行测试并定位失败。',needs:'批准的工作目录、Core 连接和对应权限；本地需要项目所需运行环境。',limit:'文件工具有目录检查，但系统命令以当前用户权限运行，不受相同目录沙箱约束。',path:'docs/tool-surface.md'},
    {id:'chat',name:'ChatGPT 会话驱动',group:'组织 / Browser bridge',headline:'把多个聊天窗口组织起来',description:'扩展连接 ChatGPT 网页与本地任务，配合输入递送、状态识别和会话管理。',mechanism:'DOM 与 React Fiber 观察、会话身份、消息回执、本地桥接。',example:'主会话收到新指令，工作会话被唤醒，任务进度回到工作台。',needs:'兼容的 Chromium 浏览器、配对扩展、已登录且可用的 ChatGPT 会话。',limit:'浏览器内部结构变化可能影响兼容性。扩展配对成功不等于 MCP 已配置完成。',path:'extension/fiber.js'},
    {id:'browser',name:'目标网页控制',group:'执行 / Browser tools',headline:'直接操作浏览器里的网页',description:'附着目标标签页，在后台读取页面、截图、点击、输入和查看诊断信息。',mechanism:'chrome.debugger / CDP；八类 browser_* 工具提供 DOM、截图、输入、JS、控制台和网络信息。',example:'填写本地登录表单，查看错误响应和页面状态。',needs:'配对扩展、浏览器工具连接及屏幕 / 控制权限；先连接目标标签页。',limit:'页面导航使旧引用失效；网络信息主要来自连接后的捕获。操作接受不等于业务成功。',path:'src/main/mcp/tools-browser.ts'},
    {id:'desktop',name:'原生桌面控制',group:'执行 / Desktop',headline:'把操作延伸到系统窗口',description:'观察窗口、获取截图，通过鼠标键盘或可访问性控件操作原生应用。',mechanism:'Windows / macOS 平台工具与原生辅助程序；原生控制和浏览器控制是不同路径。',example:'操作没有合适接口的本地软件，核对窗口与界面结果。',needs:'支持的平台、相应权限；macOS 还需要系统屏幕录制和辅助功能授权。',limit:'不能从 Linux 的浏览器工具支持推导 Linux 原生桌面支持；也不是只作用于项目目录。',path:'src/main/mcp/surfaces.ts'},
    {id:'agents',name:'多智能体协作',group:'组织 / Workers',headline:'分派独立任务，复用工作会话',description:'主会话组织多个 ChatGPT 工作会话，各自执行后汇报。完成后可以休眠，再被消息唤醒。',mechanism:'agents 的 spawn / message / status / finish；身份绑定到主会话家族和工作会话。',example:'架构、测试、浏览器行为分开研究，再由主会话汇总出处与结论。',needs:'启用多智能体、可用并发槽、清晰的任务划分和账号资源。',limit:'独立会话不自动共享完整记忆，也不自动提供 Git 工作区隔离；共同改文件仍可能冲突。',path:'src/main/agents.ts'},
    {id:'goal',name:'Goal 与 Loop',group:'推进 / Continuation',headline:'决定任务是否继续推进',description:'辅助模型读取任务相关记录，决定是否继续并生成下一条推进内容。',mechanism:'Goal 可以判断完成并停止；Loop 在既定范围持续推进。支持 ChatGPT 辅助会话或配置的 API 后端。',example:'测试失败后继续解决原需求，避免只给出计划就结束。',needs:'明确的任务目标、正确的会话结束信号、启用的模式与可用后端。',limit:'继续决策来自模型，不独立证明结果正确；也不增加账号额度。',path:'src/main/goal.ts'},
    {id:'resume',name:'Compact & Resume',group:'延续 / Local session',headline:'换一个聊天，保留原来的任务',description:'整理交接内容，在新 ChatGPT 会话中继续，保留原本地项目、历史和工作会话关系。',mechanism:'handoff 准备交接，continuation 管理旧会话到新会话的状态和发送检查。',example:'长研究中交接“已确认结论、修改位置、未完成事项和验证记录”。',needs:'本地记录、有效交接、正确的会话绑定；自动续接受角色、模型与配置条件限制。',limit:'摘要可能遗漏信息；不是无限上下文，也不意味着系统重启后所有进程仍存活。',path:'src/main/session/handoff.ts'},
    {id:'plugins',name:'外部 MCP 插件',group:'扩展 / Plugins',headline:'按需连接已有工具生态',description:'管理外部 MCP 服务的配置、工具发现、连接和调用转发。',mechanism:'独立 Plugins 入口；支持配置的本地进程、远端服务和部分安装配方。',example:'连接 Blender、Playwright 或 Memory，扩展创作、测试或记录能力。',needs:'对应软件 / 运行时、插件连接、凭据与服务权限；需要刷新工具发现。',limit:'外部进程不继承批准目录边界。安装成功不等于工具已在当前聊天中可用。',path:'docs/plugins.md'}
  ],
  steps:[
    {name:'接收并递送任务',actor:'CoS 工作台 → 扩展 → ChatGPT',description:'本地工作台保存用户输入，扩展将任务递送到对应 ChatGPT 会话。',output:'用户需求：修复本地网站的登录问题，并在浏览器里验证。\n说明：在本展厅中，这只是一条固定样本。'},
    {name:'确认工具可用',actor:'ChatGPT → 隧道 → 本地 MCP',description:'模型要执行动作前，需要工具连接、当前权限和调用者身份都有效。',output:'示意前提：Core 与浏览器工具已配置。\n可以进入读取代码和执行工具的阶段。'},
    {name:'读取与修改代码',actor:'模型决策 → Core 文件工具',description:'ChatGPT 根据代码判断问题，通过文件工具提交补丁；工具将实际执行结果交回模型。',output:'示例假设：登录表单没有正确展示失败响应。\n示例修改：补充错误状态处理与用户提示。'},
    {name:'运行相关测试',actor:'Core 终端 → 本地测试进程',description:'运行项目自己的测试，读取退出状态与失败输出。若失败，应回到分析和修改。',output:'假设本步骤相关测试通过。\n真实执行中，需要保留命令、退出码和测试日志。'},
    {name:'在网页里验证',actor:'浏览器工具 → 扩展 → 目标标签页',description:'打开本地页面，读取 DOM、填写表单，检查页面结果、控制台和相关网络请求。',output:'示例观察：错误凭据时显示失败提示。\n还应验证成功路径，并确认没有相关的新错误。'},
    {name:'汇总结果与边界',actor:'ChatGPT 主会话 → 用户',description:'汇总实际修改、测试与网页证据，说明未覆盖的情况。本展厅结束的是教学流程。',output:'教学流程结束。\n本展厅未执行上述修复，也没有生成真实测试通过记录。'}
  ],
  blocked:{name:'连接受阻，停止推进',actor:'MCP 连接检查',description:'示例假设：工具连接不可用，因此模型无法执行本地操作。应先确认连接状态，不把后续步骤说成已经完成。',output:'受阻示意：MCP 连接未就绪。\n没有修改代码，没有运行测试，也没有操作目标网页。'},
  sources:[
    ['产品与架构','真实网页会话、云端推理与本地工作台的区别。','AGENTS.md'],
    ['本机桥接','独立于 MCP 的 Bridge，HTTP 命令与事件。','src/main/bridge.ts'],
    ['扩展后台','本机 HTTP 通信与 /wake WebSocket。','extension/background.js'],
    ['输入递送','网页发送与部分工具响应递送路径。','src/main/session/input.ts'],
    ['MCP 与工具边界','Core / Desktop / Plugins 分组与本地服务实现。','src/main/mcp/surfaces.ts'],
    ['浏览器工具','八类工具、页面身份、DOM 引用和权限条件。','src/main/mcp/tools-browser.ts'],
    ['浏览器底层执行','chrome.debugger 与 CDP 调用。','extension/browser-control.js'],
    ['多智能体','工作会话、消息、归属与休眠复用。','src/main/agents.ts'],
    ['任务继续','Goal / Loop 的后端、决策和状态。','src/main/goal.ts'],
    ['会话交接','交接内容与持久化边界。','src/main/session/handoff.ts'],
    ['权限与记录','文件权限、命令权限及本地历史边界。','SECURITY.md'],
    ['浏览器版本','扩展实际声明 Chrome 125。','extension/manifest.json']
  ]
};
