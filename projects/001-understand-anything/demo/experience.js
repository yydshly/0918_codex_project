// Presentation, scenarios, and usage guide. No model requests or installer execution.
const effectContent = [
  { title: '先看全局', subtitle: '从目录树，到架构分层', text: '把入口、业务、基础设施和数据放在同一张地图里，先知道该从哪里读起。', image: 'upstream-overview.png', caption: '原版 Dashboard · 架构层总览。加载的是 Order Lab 实测结构，层级说明由研究者提供。', outcome: '你得到的不是一份文件清单，而是一个可以逐层进入的阅读入口。', feature: '看清模块分工' },
  { title: '再读关键代码', subtitle: '从节点，到文件与源码', text: '选中一个文件，看到它的职责、路径和关联信息，回到源码核实判断。', image: 'upstream-detail.png', caption: '原版 Dashboard · 业务层中的订单文件与详情。源代码来自本地 TypeScript 样本。', outcome: '从“订单逻辑在哪里”缩小到具体文件，再看检查库存、支付与保存的顺序。', feature: '定位阅读目标' },
  { title: '跟着路线学习', subtitle: '从局部，到完整流程', text: '按步骤阅读入口、订单、库存、支付和保存，避免在陌生仓库中随意跳转。', image: 'upstream-tour.png', caption: '原版 Dashboard · 阅读导览。界面真实运行，五步导览内容为研究者编写。', outcome: '把第一次阅读变成一条有顺序的路线；上游完整流程可以用模型生成这些讲解。', feature: '建立连续上下文' },
];
function showEffect(index) {
  $('effect-choices').innerHTML = effectContent.map((item, i) => `<button class="effect-choice" data-effect="${i}" aria-pressed="${i === index}"><span>0${i + 1} / ${item.subtitle}</span><strong>${item.title}</strong><small>${item.text}</small><i>↗</i></button>`).join('');
  const item = effectContent[index];
  $('effect-image').src = `../assets/${item.image}`;
  $('effect-image').alt = item.caption;
  $('effect-image-link').href = `../assets/${item.image}`;
  $('effect-caption').textContent = item.caption + ' 点击图片查看大图。';
  $('effect-outcome').innerHTML = `<h3>${item.feature}</h3><p>${item.outcome}</p>`;
  for (const button of $('effect-choices').querySelectorAll('button')) button.addEventListener('click', () => { const i = Number(button.dataset.effect); showEffect(i); $('effect-choices').querySelector(`[data-effect="${i}"]`).focus({ preventScroll: true }); });
}
function exploreNode(path, options = {}) {
  query = ''; $('search').value = '';
  setMode('symbols');
  selected = viewNodes().find(node => node.filePath === path)?.id ?? selected;
  changedFile = options.impact ?? ''; $('impact').value = changedFile;
  if (options.tour) { tourIndex = 0; renderTour(); }
  renderGraph(); renderDetails();
  location.hash = 'graph';
  navigate();
  $('graph-page').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
const examples = [
  { q: '一次下单会经过哪些步骤？', a: 'handleCheckout 把参数交给 createOrder。订单函数先检查数量是否满足库存范围，再生成模拟支付凭证，最后返回模拟订单标识。下面的节点可以点击，直接查看对应代码。', paths: ['src/api.ts', 'src/orders.ts', 'src/inventory.ts', 'src/payment.ts', 'src/repository.ts'] },
  { q: '改了支付模块，要关注哪里？', a: '实测的一跳影响结果包含 createOrder 及其文件节点。handleCheckout 属于间接关联，没有出现在一跳结果中；这不能证明入口不受影响。可以结合调用链和测试继续检查。', paths: ['src/payment.ts', 'src/orders.ts'], impact: 'src/payment.ts' },
  { q: '这个项目真的保存订单了吗？', a: '没有。样本里的 saveOrder 只拼接并返回字符串，并没有访问数据库。schema.sql 声明了一张表，但图中没有虚构的数据库写入关系。摘要应帮助你找到证据，而不是替代阅读代码。', paths: ['src/repository.ts', 'schema.sql'] },
];
function showExample(index) {
  $('example-questions').innerHTML = examples.map((item, i) => `<button data-question="${i}" aria-pressed="${i === index}">${item.q}</button>`).join('');
  const item = examples[index];
  $('example-answer').innerHTML = `<span class="answer-label">研究者根据样本预写 · 非实时 AI 回答</span><h3>${item.q}</h3><p>${item.a}</p><div class="code-trail">${item.paths.map(path => `<button data-path="${path}">${annotations[path].symbol} ↗</button>`).join('')}</div>`;
  for (const button of $('example-questions').querySelectorAll('button')) button.addEventListener('click', () => { const i = Number(button.dataset.question); showExample(i); $('example-questions').querySelector(`[data-question="${i}"]`).focus({ preventScroll: true }); });
  for (const button of $('example-answer').querySelectorAll('[data-path]')) button.addEventListener('click', () => exploreNode(button.dataset.path, { impact: item.impact }));
}
const scenarios = [
  { name: '接手陌生项目', who: '新成员 / 开源项目研究者', short: '不知道入口、模块与阅读顺序', title: '第一次打开仓库，先有一张地图', problem: '文件很多，直接逐个阅读容易丢失全局背景。先识别主要模块，再沿着一条业务链深入。', steps: ['分析一个项目或子目录，生成结构图谱。', '打开 Dashboard，先看架构层与模块关系。', '跟随导览，进入关键文件；不明白的部分再提问。'], output: '架构总览、文件摘要、阅读路线，以及可以继续追踪的代码位置。', command: '/understand --language zh\n/understand-dashboard\n/understand-onboard', note: '导览与摘要的质量取决于模型和输入；阅读关键代码仍然必要。', path: 'src/api.ts', action: '体验从入口开始阅读', tour: true },
  { name: '评审一次改动', who: '开发者 / 代码评审者', short: '修改一个模块，查相关组件', title: '改动之前，先找到需要关注的邻居', problem: '改了支付逻辑，除了当前文件，还应该查看哪些调用者、配置或测试？图谱可以提供初始排查清单。', steps: ['先生成图谱，确认它对应当前项目版本。', '修改代码后运行 understand-diff，查看相关节点与层级。', '沿着调用链继续追踪间接影响，并运行相关测试。'], output: '改动节点、直接关联组件和解释性上下文，作为评审线索。', command: '/understand-diff', note: '本次实测核心 API 只收集一跳邻居，不是递归影响证明，也不能替代测试。', path: 'src/payment.ts', impact: 'src/payment.ts', action: '查看支付改动的影响' },
  { name: '定位业务逻辑', who: '开发者 / 维护者', short: '从现象找到函数与上下游', title: '带着问题，找到值得读的那段代码', problem: '你知道“下单失败”，但不知道库存检查、支付校验和订单处理分别在哪里。用名称、用途摘要和关系缩小范围。', steps: ['在图谱中搜索领域词或函数名。', '选择节点，查看上下游与源码位置。', '在 AI 工具里解释具体文件，再用日志或调试器验证运行时原因。'], output: '相关函数、职责说明、调用者和源码入口。', command: '/understand-chat 库存检查在哪里，谁会调用它？\n/understand-explain src/inventory.ts', note: '它主要帮助定位阅读目标。本研究未验证自动排障或运行时根因分析。', path: 'src/inventory.ts', action: '找到库存检查代码' },
  { name: '梳理业务流程', who: '产品经理 / 技术负责人', short: '把实现映射到领域与步骤', title: '把实现细节翻译成业务流程', problem: '讨论需求时，需要知道“下单”涉及哪些领域、步骤和交互，单看目录名并不直观。', steps: ['先生成代码图谱，再调用 understand-domain。', '查看领域、流程和步骤之间的关系。', '与业务负责人及源码逐项核对规则、入口和异常路径。'], output: '领域 → 流程 → 步骤的视图，用于技术与业务沟通。', command: '/understand-domain', note: '这是上游提供的能力，本轮只做源码研究，没有运行领域提取。下面链接展示已有结构样本，不冒充自动领域结果。', path: 'src/orders.ts', action: '先看订单流程的代码结构' },
  { name: '浏览团队知识库', who: '文档维护者 / 研究团队', short: '从文章列表找到知识关联', title: '在文章之间建立可追踪的联系', problem: 'Wiki 里有很多文章、来源和主题，希望从一篇内容追到相关概念与引用。', steps: ['准备包含 index.md、Markdown 与 wikilinks 的约定 Wiki。', '运行 understand-knowledge 指向 Wiki 目录。', '浏览主题、文章、实体和主张关系，并核实模型补充的联系。'], output: '文章与主题的关系图，以及模型提取的实体 / 主张线索。', command: '/understand-knowledge /path/to/wiki', note: '面向上游约定的 Wiki 结构；本轮没有运行这条流程，不代表任意 PDF / Word 文件夹都能直接使用。', action: '查看安装与使用步骤', guideOnly: true },
];
function showScenario(index) {
  $('scenario-choices').innerHTML = scenarios.map((item, i) => `<button class="scenario-choice" data-scenario="${i}" aria-pressed="${i === index}"><span>0${i + 1} / ${item.who}</span><strong>${item.name}</strong><small>${item.short}</small></button>`).join('');
  const item = scenarios[index];
  $('scenario-detail').innerHTML = `<span class="eyebrow">${item.who}</span><h2>${item.title}</h2><p class="lead">${item.problem}</p><h3>怎样用</h3><ol>${item.steps.map(step => `<li>${step}</li>`).join('')}</ol><div class="scenario-result"><h3>可以得到的结果</h3><p>${item.output}</p></div><pre class="scenario-command">${escapeHtml(item.command)}</pre><span class="small-label">以上为 / 前缀示例；Codex 将技能前缀换成 $。</span><p class="source-note">${item.note}</p><div class="scenario-actions"><button id="scenario-action" class="primary-link">${item.action} ↗</button><a class="secondary-link" href="#guide">查看完整使用指南</a></div>`;
  for (const button of $('scenario-choices').querySelectorAll('button')) button.addEventListener('click', () => { const i = Number(button.dataset.scenario); showScenario(i); $('scenario-choices').querySelector(`[data-scenario="${i}"]`).focus({ preventScroll: true }); });
  $('scenario-action').addEventListener('click', () => item.guideOnly ? location.hash = 'guide' : exploreNode(item.path, { impact: item.impact, tour: item.tour }));
}
const platforms = {
  'codex-win': { name: 'Codex', prefix: '$', installWhere: 'Windows PowerShell · 安装准备目录', install: 'Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Egonex-AI/Understand-Anything/main/install.ps1" -OutFile install-understand-anything.ps1\n.\\install-understand-anything.ps1 codex', installNote: '下载并运行上游 Windows 安装脚本，为 Codex 创建技能入口。安装后重启 Codex，在你要分析的代码仓库中打开会话。' },
  'codex-unix': { name: 'Codex', prefix: '$', installWhere: 'macOS / Linux 终端', install: 'curl -fsSL https://raw.githubusercontent.com/Egonex-AI/Understand-Anything/main/install.sh | bash -s codex', installNote: '由上游安装脚本准备技能入口。安装后重启 Codex，并打开你要分析的本地代码仓库。' },
  claude: { name: 'Claude Code', prefix: '/', installWhere: 'Claude Code 对话输入框', install: '/plugin marketplace add Egonex-AI/Understand-Anything\n/plugin install understand-anything', installNote: '通过 Claude Code 的插件入口安装。后续操作在目标代码仓库的会话里进行。' },
  cursor: { name: 'Cursor', prefix: '/', installWhere: 'Cursor Settings → Plugins', install: 'https://github.com/Egonex-AI/Understand-Anything', installNote: '在插件设置中粘贴仓库地址并添加。若技能前缀未识别，可以直接说“使用 understand 技能分析当前项目”。' },
};
function showGuide() {
  const config = platforms[$('platform').value], p = config.prefix;
  const guide = [
    { title: '安装插件', where: config.installWhere, command: config.install, text: config.installNote, expected: '你的 AI 工具能够找到 understand 系列技能。准备 Git、Node.js / 包管理器及可用的模型环境；独立 viewer 的 Node.js 要求见上游说明。' },
    { title: '生成第一份项目图谱', where: `${config.name} 对话输入框 · 目标仓库`, command: `${p}understand --language zh`, text: '用中文生成摘要和说明。仓库很大时，先把范围缩小到一个模块，例如下面这个子目录写法。', extra: `${p}understand src/frontend --language zh`, expected: '项目目录出现 .ua/knowledge-graph.json（旧项目可能是 .understand-anything/）。首次分析会消耗模型额度，耗时随项目规模和模型变化。' },
    { title: '打开可视化界面', where: `${config.name} 对话输入框`, command: `${p}understand-dashboard`, text: '浏览架构层、搜索节点、查看详情、沿关系追踪代码。原版服务通常给出包含访问令牌的本地地址，使用它实际打印的 URL。', expected: '浏览器打开交互式 Dashboard。可以对照“能看到什么”页的真实界面截图。' },
    { title: '围绕你的任务继续提问', where: `${config.name} 对话输入框 · 按需执行其中一条`, command: `${p}understand-chat 下单流程经过哪些模块？\n${p}understand-explain src/orders.ts\n${p}understand-diff\n${p}understand-onboard\n${p}understand-domain`, text: '问答和解释在 AI 工具会话中进行。将文件路径和问题换成你自己的项目；不同命令分别对应流程问题、局部解释、改动影响、入职指南和业务领域。', expected: '获得带项目上下文的解释、关联节点或导览；对于关键结论，回到对应源码和测试验证。' },
    { title: '代码变了，刷新这张地图', where: `${config.name} 对话输入框`, command: `${p}understand`, text: '默认按上游逻辑尝试增量更新。需要重新检查重要逻辑时，可以强制完整分析。', extra: `${p}understand --full --language zh`, expected: '生成新的图谱。此研究版本的结构指纹可能跳过函数体变化，不能仅凭“增量完成”认定所有业务摘要都已更新。' },
  ];
  $('guide-steps').innerHTML = guide.map((step, index) => `<article class="guide-step"><div class="step-num">0${index + 1}</div><div><h3>${step.title}</h3><p>${step.text}</p><div class="command-head"><span>${step.where}</span><button data-copy="${index}" aria-label="复制第 ${index + 1} 步命令">复制</button></div><pre class="command" id="command-${index}"><code>${escapeHtml(step.command)}</code></pre>${step.extra ? `<p class="inline-note">可选写法</p><pre class="command"><code>${escapeHtml(step.extra)}</code></pre>` : ''}<div class="expectation"><strong>完成后：</strong>${step.expected}</div><span class="copy-status" id="copy-status-${index}" aria-live="polite"></span></div></article>`).join('');
  for (const button of $('guide-steps').querySelectorAll('[data-copy]')) button.addEventListener('click', async () => {
    const index = Number(button.dataset.copy);
    try { await navigator.clipboard.writeText(guide[index].command); $('copy-status-' + index).textContent = '已复制命令'; }
    catch { const range = document.createRange(); range.selectNodeContents($('command-' + index)); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); $('copy-status-' + index).textContent = '已选中命令，请使用 Ctrl+C / ⌘C 复制'; }
  });
}
$('platform').addEventListener('change', showGuide);
showEffect(0); showExample(0); showScenario(0); showGuide();
