// Explain the toolkit's own contribution: discovery and selection of separate tools.
// Nothing on this page installs a tool, connects an account or invokes a model.
const TOOL_CASES = [
  {
    id:'design', issue:'页面风格普通', name:'Frontend Design', kind:'设计 Skill',
    chapter:'Design Skills', anchor:'design-skills', source:'skill',
    official:'https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design',
    find:'目录推荐的设计 Skill，以及它的来源入口。具体设计方法保存在独立的 SKILL.md 中。',
    connect:'查看官方提供方式，在 Claude Code 中配置对应 Skill，并确认本次任务确实读取了它。',
    gain:'把视觉方向、字体、布局和自查方法作为任务参考，不必每次从零整理设计原则。',
    example:'在咖啡首页任务中，用这些方法组织品牌的字体、配色与商品布局，再编写页面。',
    instruction:'请使用已配置的 Frontend Design Skill，先确定适合咖啡品牌的视觉方向，再实现首页。',
    used:'咖啡首页的业务要求 + Skill 中的设计方法',
    trace:'任务中读取了 Skill；形成与品牌相关的设计方案，再落实到页面代码。',
    proof:'确认 Skill 已加载；查看设计方案和实际截图，并按项目目标判断是否改善。',
    limit:'增加的是设计指导。模型如何遵循、页面是否更好看，仍需具体任务验证。',
    before:'只给临时要求，设计方法依靠模型自行组织。',
    after:'任务中可以反复参考一套明确的设计方法。',
    status:'代表指令已核查；未做启用前后的生成质量对照。'
  },
  {
    id:'docs', issue:'缺少框架资料', name:'Context7', kind:'文档检索工具',
    chapter:'Docs & Context', anchor:'docs--context', source:'docs',
    official:'https://github.com/upstash/context7',
    find:'目录中的文档工具推荐；跟随链接到 Context7，查看它的检索和接入方式。',
    connect:'根据官方说明选择 MCP 或 CLI + Skill 方式接入，提供当前库、版本和具体问题，确认检索可用。',
    gain:'能在任务中查询相关文档和代码示例，把返回资料用于实现，而不只依赖已有知识。',
    example:'如果咖啡首页使用 Tailwind，而当前版本的主题配置不明确，就先查对应资料，再实现品牌配色。',
    instruction:'实现咖啡首页时，先确认项目的 Tailwind 版本；主题配置不明确的地方，请用已接入的 Context7 查询后再实现。',
    used:'咖啡首页的业务要求 + 当前框架版本 + 查询返回的文档',
    trace:'出现相关文档查询与返回内容；实现采用与项目版本相符的写法，并运行检查。',
    proof:'检查实际返回的文档是否匹配库和版本，再运行修改后的代码。',
    limit:'检索覆盖和资料准确性有边界；收到文档并不保证生成的代码没有错误。',
    before:'缺少专门检索入口时，需要另找资料或依赖已有上下文。',
    after:'助手多了一个可调用的文档查询入口。',
    status:'官方接口说明已核查；本展厅未调用 Context7 服务。'
  },
  {
    id:'figma', issue:'需要读取设计稿', name:'Figma MCP', kind:'设计资料连接',
    chapter:'Design-to-Code Pipeline', anchor:'design-to-code-pipeline',
    official:'https://developers.figma.com/docs/figma-mcp-server/',
    find:'目录介绍的 Figma 接入方向，以及官方工具说明。设计信息由 Figma 提供。',
    connect:'核对受支持的客户端、账户和文件访问权限，按官方方式连接，再提供具体设计文件或节点。',
    gain:'能获取设计中的布局、组件和变量信息，让模型据此实现页面。',
    example:'如果咖啡首页已经有 Figma 设计稿，就读取该首页的布局、颜色和组件，再结合现有项目实现。',
    instruction:'请通过已连接的 Figma 工具读取我提供的咖啡首页设计节点，再按设计稿实现首页。',
    used:'咖啡首页的业务要求 + 你提供的设计节点 + 工具读取的设计资料',
    trace:'读到指定首页的设计资料；实现中的布局和组件可以与设计稿对照。',
    proof:'确认读到了目标设计资料；将实现后的页面与设计要求逐项对照。',
    limit:'是否能读取取决于连接与权限；响应式、业务逻辑和最终还原效果仍需检查。',
    before:'没有设计数据接入时，只能使用已提供的文字、图片或其他资料。',
    after:'助手多了直接取得设计结构和样式资料的渠道。',
    status:'官方功能文档已核查；本轮未连接 Figma 或验证还原效果。'
  },
  {
    id:'browser', issue:'页面缺少实际检查', name:'Playwright MCP', kind:'浏览器操作工具',
    chapter:'Testing & Browser Automation', anchor:'testing--browser-automation', source:'browser',
    official:'https://github.com/microsoft/playwright-mcp',
    find:'目录中的浏览器工具推荐。Playwright 侧重操作与观察，DevTools 可补充诊断线索。',
    connect:'按官方说明接入浏览器工具，准备可访问的运行页面，再让助手执行具体检查步骤。',
    gain:'能打开页面、点击、填写、读取页面状态并截图，把运行结果反馈给模型。',
    example:'咖啡首页完成后，实际打开手机宽度页面，点击“查看菜单”，检查跳转、排版与横向溢出。',
    instruction:'首页完成后，请用已接入的浏览器工具打开运行地址，以手机宽度点击“查看菜单”，检查跳转和横向溢出，发现问题后修正。',
    used:'咖啡首页的业务要求 + 运行地址 + 浏览器实际观察结果',
    trace:'留下实际点击、页面状态或截图记录；有问题时据此修改，再复查。',
    proof:'查看真实操作结果、截图和错误记录，确认检查覆盖了要求的路径。',
    limit:'只覆盖实际执行的检查；结构快照不等于审美判断，还需要截图和人的判断。',
    before:'只阅读代码时，无法据此确认页面实际显示和操作结果。',
    after:'助手多了一条“运行页面 → 观察 → 修正”的反馈渠道。',
    status:'官方接口说明已核查；本项目已用 Playwright 脚本检查页面，未验证 MCP 接入。'
  }
];
let toolCase='design';

function practice(){
  return heading('这个库的实际价值','同一个需求，怎样用上库里的资源？','这个库负责推荐资源；我们选出需要的指导或工具，配置给 Claude Code，再让它用于当前需求。下面只用“制作咖啡品牌首页”这一个例子，把过程连起来。')+`
    <section class="understanding-intro" aria-label="模型、指导与工具的分工"><article><h2>模型基础能力</h2><p>理解需求、推理、设计与编码。这个目录没有训练或升级模型。</p></article><article><h2>Agent 工作指导</h2><p>用 Skill 和项目规范约束风格、实现步骤和检查要求，让已有能力用于具体任务。</p></article><article><h2>工具与实际反馈</h2><p>提供设计资料、文档和浏览器操作。写出工具名称不等于已经获得这些能力。</p></article></section>
    <section class="shared-task" aria-labelledby="shared-task-title"><span class="pill">始终不变的业务需求</span><h2 id="shared-task-title">帮我做一个咖啡品牌首页。</h2><p id="shared-task-text">展示品牌介绍和三款咖啡；点击“查看菜单”可到商品区域；手机上也能正常浏览。</p><p class="task-caption">这句话交给 Claude Code，说明“要做什么”。下面选择的资源，决定它还可以参考什么、读取什么、检查什么。</p></section>
    <section class="toolkit-role" aria-label="目录和工具的关系">
      <div><span>① 从这个库选资源</span><h2>找到设计 Skill</h2><p>我们希望咖啡首页有合适的品牌风格，于是查看库推荐的 Frontend Design。</p></div><span class="role-arrow" aria-hidden="true">→</span>
      <div><span>② 把资源交给助手</span><h2>配置并确认可用</h2><p>按该 Skill 的官方说明配置到 Claude Code，确认本次任务能读取它的设计指导。</p></div><span class="role-arrow" aria-hidden="true">→</span>
      <div><span>③ 用于刚才的需求</span><h2>需求 + 设计指导</h2><p>Claude Code 结合咖啡首页的要求和 Skill 中的方法，设计并实现页面；我们再检查结果。</p></div>
    </section>
    <div class="note"><strong>关联就在第 ③ 步：同一个任务，同时使用业务需求和所选资源。</strong>库里的推荐帮助我们找到资源；需求中可以说明要怎样使用它。仅写出工具名称，不会完成安装、连接或授权；仅把需求写详细，也不能证明用上了库里的资源。</div>
    <div class="section-head"><h2>同一个咖啡首页，按需要选择一种支持</h2><span class="pill">原创过程示例 · 非生成实测</span></div>
    <p>先看默认的设计 Skill。其他三项是有相应需要时的选择，不要求全部接入。切换后，业务目标不变，变化的是用什么资源、怎样用于这次任务。</p>
    <div class="tool-choices" role="group" aria-label="选择缺少的前端支持">${TOOL_CASES.map(c=>`<button class="choice" data-tool-case="${c.id}" aria-pressed="${c.id===toolCase}"><strong>${c.issue}</strong><span>${c.name}</span><small>${c.kind}</small></button>`).join('')}</div>
    <article id="tool-detail" aria-live="polite"></article>
    <section class="our-value"><div class="section-head"><h2>落到我们身上，应该怎样看它？</h2></div><div class="value-grid">
      <article><span class="pill green">已有的继续用</span><h3>我们已经能实现并检查展厅</h3><p>这个项目已有静态网页、截图和浏览器检查记录。现有流程能解决的问题，不需要因为目录推荐了工具就重新配置一遍。</p><a href="../notes/evidence/browser-qa.json">查看实际检查记录 ↗</a></article>
      <article><span class="pill">缺少时再参考</span><h3>把目录当作查找入口</h3><p>想补充设计方法，就看设计 Skill；遇到框架资料缺口，就看文档工具；有设计稿交接，再看 Figma 接入。先找具体缺口，再核对候选工具。</p></article>
      <article><span class="pill">按结果判断</span><h3>已有能力越充分，额外价值越有限</h3><p>对我们而言，通用提示在现有 Agent 已能稳定完成时，额外价值可能有限；更值得保留的是项目特有的品牌与组件规范、真实资料接入和运行结果检查。</p></article>
    </div></section>
    <div class="doc-links"><a href="../notes/usage.md">阅读使用与选型指南 ↗</a><a href="#capabilities">查看完整能力范围 ↗</a><a href="#evidence">回查研究边界 ↗</a></div>`;
}

function drawPractice(){
  const c=TOOL_CASES.find(c=>c.id===toolCase);
  document.querySelectorAll('[data-tool-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.toolCase===toolCase)));
  document.querySelector('#tool-detail').innerHTML=`
    <div class="tool-detail-heading"><div><span class="pill">${c.kind}</span><h2>${c.name}：${c.issue}</h2></div><a class="button" href="${c.official}" target="_blank" rel="noopener">查看官方来源 ↗</a></div>
    <section class="task-connection" aria-label="所选资源如何用于咖啡首页"><h3>这项资源，怎样进入刚才的任务？</h3><p class="connection-prerequisite"><strong>前提：</strong>${c.name} 已配置且可用。下句是交给 Claude Code 的任务说明，不是发给这个仓库的指令。</p><blockquote id="connected-instruction">${c.instruction}</blockquote><div class="task-inputs"><span>Claude Code 此时结合</span><strong>${c.used}</strong></div><p><strong>应该能核对的使用痕迹：</strong>${c.trace}</p></section>
    <div class="tool-explanation"><section><h3>在这个库里找到什么</h3><p>${c.find}</p><a href="${UPSTREAM}#${c.anchor}" target="_blank" rel="noopener">目录章节：${c.chapter} ↗</a></section><section><h3>选中后，还要做什么</h3><p>${c.connect}</p></section><section class="capability-gain"><h3>实际补充的支持</h3><p>${c.gain}</p><p class="concrete-example">${c.example}</p></section><section><h3>怎么确认起了作用</h3><p>${c.proof}</p></section></div>
    <div class="capability-change"><div><small>未提供这类支持时</small><p>${c.before}</p></div><span aria-hidden="true">→</span><div><small>接入并实际使用后</small><p>${c.after}</p></div></div>
    <div class="boundary"><strong>验证范围</strong>${c.status}<br>${c.limit}</div>
    <p class="tool-source">说明依据：<a href="${c.source?sourceURL(c.source):c.official}" target="_blank" rel="noopener">${c.source?'已核查的固定版本资料':'Figma 官方功能说明（2026-09-18 查阅）'} ↗</a>。上面的前后描述是能力差异示意，不是效果实测。</p>`;
}
document.addEventListener('click',event=>{
  const b=event.target.closest('button');
  if(b?.dataset.toolCase){toolCase=b.dataset.toolCase;drawPractice();}
});
