/* Independent research viewer. Core results are precomputed by run-experiments.mjs. */
const { graph, report, impact, sources, annotations } = window.UA_RESEARCH;
const $ = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const upstream = `https://github.com/Egonex-AI/Understand-Anything/blob/${report.upstream.commit}/understand-anything-plugin/`;
const positions = { 'src/api.ts': [40, 195], 'src/orders.ts': [310, 195], 'src/inventory.ts': [665, 45], 'src/payment.ts': [665, 195], 'src/repository.ts': [665, 345], 'schema.sql': [40, 365] };
const colors = { '入口': '#254638', '业务': '#5c8e61', '基础设施': '#b58545', '数据': '#8371a8' };
let mode = 'symbols', selected = 'function:src/orders.ts:createOrder', tourIndex = 1;
let query = '', changedFile = '';
for (const [key, count] of [['file-count', report.counts.files], ['node-count', report.counts.nodes], ['edge-count', report.counts.edges]]) $(key).textContent = String(count).padStart(2, '0');
for (const path of Object.keys(sources)) { const option = document.createElement('option'); option.value = path; option.textContent = path; $('impact').append(option); }
function viewNodes() { return graph.nodes.filter(node => mode === 'symbols' ? ['function', 'table'].includes(node.type) : ['file', 'schema'].includes(node.type)); }
function filterMatches(node) { return !query || `${node.name} ${node.filePath} ${node.summary}`.toLowerCase().includes(query.toLowerCase()); }
function renderGraph() {
  const compact = window.matchMedia('(max-width:540px)').matches;
  const layout = compact ? Object.fromEntries(Object.keys(positions).map((path, i) => [path, [65, 30 + i * 130]])) : positions;
  $('graph').setAttribute('viewBox', compact ? '0 0 340 820' : '0 0 920 515');
  const nodes = viewNodes().filter(filterMatches);
  const ids = new Set(nodes.map(node => node.id));
  const edges = graph.edges.filter(edge => ids.has(edge.source) && ids.has(edge.target));
  const changed = new Set(impact[changedFile]?.changedNodes.map(node => node.id) ?? []);
  const affected = new Set(impact[changedFile]?.affectedNodes.map(node => node.id) ?? []);
  let svg = '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#a6b69b"/></marker></defs>';
  if (!compact) svg += '<text x="40" y="28" fill="#95a08d" font-size="10" letter-spacing="2">ENTRY POINT</text><text x="310" y="28" fill="#95a08d" font-size="10" letter-spacing="2">ORCHESTRATION</text>';
  for (const edge of edges) {
    const source = graph.nodes.find(node => node.id === edge.source), target = graph.nodes.find(node => node.id === edge.target);
    const [sx, sy] = layout[source.filePath], [tx, ty] = layout[target.filePath];
    const x1 = sx + 208, y1 = sy + 43, x2 = tx - 4, y2 = ty + 43, middle = (x1 + x2) / 2;
    const routeX = 45 - Object.keys(positions).indexOf(target.filePath) * 8;
    const path = compact ? (source.filePath === 'src/api.ts' ? `M${sx + 104} ${sy + 86} L${tx + 104} ${ty - 4}` : `M${sx} ${y1} H${routeX} V${y2} H${tx - 4}`) : `M${x1} ${y1} C${middle} ${y1} ${middle} ${y2} ${x2} ${y2}`;
    svg += `<path d="${path}" fill="none" stroke="#acbca0" stroke-width="1.7" marker-end="url(#arrow)"/>`;
    if (!compact && source.filePath === 'src/api.ts') svg += `<text x="${middle}" y="${y1 - 11}" text-anchor="middle" font-size="9" fill="#91a083">${edge.type}</text>`;
  }
  for (const node of nodes) {
    const [x, y] = layout[node.filePath], layer = annotations[node.filePath].layer, color = colors[layer];
    const isChanged = changed.has(node.id), isAffected = affected.has(node.id), isSelected = selected === node.id;
    const stroke = isChanged ? '#b85f48' : isAffected ? '#bb913e' : isSelected ? '#658748' : '#d8e1d0';
    const fill = isChanged ? '#fff3ec' : isAffected ? '#fffae9' : isSelected ? '#f0f6e1' : '#fff';
    const state = isChanged ? '已改动' : isAffected ? '一跳关联' : layer;
    svg += `<g class="graph-node" role="button" tabindex="0" aria-label="查看 ${escapeHtml(node.name)}" aria-pressed="${isSelected}" data-node="${escapeHtml(node.id)}"><title>${escapeHtml(node.summary)}</title><rect x="${x}" y="${y}" width="208" height="86" rx="7" fill="${fill}" stroke="${stroke}" stroke-width="${isSelected || isChanged || isAffected ? 2 : 1}"/><circle cx="${x + 16}" cy="${y + 20}" r="3" fill="${color}"/><text x="${x + 27}" y="${y + 24}" fill="${color}" font-size="9">${escapeHtml(node.type.toUpperCase())} / ${state}</text><text x="${x + 15}" y="${y + 48}" font-family="Consolas,monospace" font-size="15" fill="#2d412c" font-weight="600">${escapeHtml(node.name)}</text><text x="${x + 15}" y="${y + 69}" fill="#97a18c" font-family="Consolas,monospace" font-size="10">${escapeHtml(node.filePath)}${node.lineRange ? ` : ${node.lineRange.join('–')}` : ''}</text></g>`;
  }
  $('graph').innerHTML = svg;
  $('empty').hidden = nodes.length > 0;
  $('graph-caption').textContent = `${nodes.length} VISIBLE NODES / ${edges.length} RELATIONS`;
  $('impact-status').textContent = changedFile ? `已改动 ${changed.size} · 一跳关联 ${affected.size}（全图）` : '查看一跳关联';
  for (const element of $('graph').querySelectorAll('[data-node]')) {
    const activate = () => { selected = element.dataset.node; renderGraph(); renderDetails(); const replacement = [...$('graph').querySelectorAll('[data-node]')].find(item => item.dataset.node === selected); replacement?.focus({ preventScroll: true }); };
    element.addEventListener('click', activate);
    element.addEventListener('keydown', event => { if (['Enter', ' '].includes(event.key)) { event.preventDefault(); activate(); } });
  }
}
function renderDetails() {
  const node = graph.nodes.find(node => node.id === selected);
  if (!node) return;
  const relations = graph.edges.filter(edge => edge.type !== 'contains' && (edge.source === node.id || edge.target === node.id));
  const code = sources[node.filePath].trimEnd().split('\n').map((line, i) => `<span class="code-line ${node.lineRange && i + 1 >= node.lineRange[0] && i + 1 <= node.lineRange[1] ? 'focus' : ''}"><span class="line-number">${i + 1}</span>${escapeHtml(line)}</span>`).join('');
  $('details').innerHTML = `<span class="node-badge">${escapeHtml(node.type.toUpperCase())} · ${escapeHtml(annotations[node.filePath].layer)}</span><h3>${escapeHtml(node.name)}</h3><div class="node-path">${escapeHtml(node.filePath)}${node.lineRange ? ` · L${node.lineRange.join('–')}` : ''}</div><p>${escapeHtml(node.summary)}</p><span class="evidence-badge">${node.type === 'table' ? '表结构摘要来自 GraphBuilder' : '中文说明：研究者注释'}</span><div class="section-label">源代码 / 实验样本</div><pre class="code"><code>${code}</code></pre><div class="section-label">${relations.length} 条${mode === 'symbols' ? '调用' : '依赖'}关系</div>${relations.map(edge => { const outgoing = edge.source === node.id; const other = graph.nodes.find(item => item.id === (outgoing ? edge.target : edge.source)); return `<a class="relation" href="#graph" data-related="${escapeHtml(other.id)}"><span>${outgoing ? '→' : '←'} ${escapeHtml(edge.type)} ${outgoing ? '下游' : '上游'}</span>${escapeHtml(other.name)}</a>`; }).join('') || '<p>此样本中没有解析出的跨文件关系。</p>'}`;
  for (const element of $('details').querySelectorAll('[data-related]')) element.addEventListener('click', event => { event.preventDefault(); selected = element.dataset.related; query = ''; $('search').value = ''; renderGraph(); renderDetails(); });
}
function setMode(next) {
  const path = graph.nodes.find(node => node.id === selected)?.filePath;
  mode = next;
  selected = viewNodes().find(node => node.filePath === path)?.id ?? viewNodes()[0].id;
  $('symbols-mode').setAttribute('aria-pressed', String(mode === 'symbols'));
  $('files-mode').setAttribute('aria-pressed', String(mode === 'files'));
  renderGraph(); renderDetails();
}
function renderTour() { $('tour-title').textContent = graph.tour[tourIndex].title; $('tour-position').textContent = `${tourIndex + 1} / ${graph.tour.length}`; $('tour-prev').disabled = tourIndex === 0; $('tour-next').disabled = tourIndex === graph.tour.length - 1; }
function advanceTour(delta) { tourIndex = Math.max(0, Math.min(graph.tour.length - 1, tourIndex + delta)); query = ''; $('search').value = ''; setMode('symbols'); selected = graph.tour[tourIndex].nodeIds[0]; renderGraph(); renderDetails(); renderTour(); }
$('search').addEventListener('input', event => { query = event.target.value.trim(); renderGraph(); });
$('clear-search').addEventListener('click', () => { query = ''; $('search').value = ''; renderGraph(); $('search').focus(); });
$('impact').addEventListener('change', event => { changedFile = event.target.value; renderGraph(); });
$('symbols-mode').addEventListener('click', () => setMode('symbols'));
$('files-mode').addEventListener('click', () => setMode('files'));
$('tour-prev').addEventListener('click', () => advanceTour(-1));
$('tour-next').addEventListener('click', () => advanceTour(1));
$('download').addEventListener('click', () => { const url = URL.createObjectURL(new Blob([JSON.stringify(graph, null, 2)], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = 'order-lab-knowledge-graph.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); });
const steps = [
  ['扫描项目', '识别文件、语言与依赖', '程序扫描 + Agent 上下文', '读取文件清单，识别语言和框架，应用排除规则，并提前解析导入关系。文件清单是后续分批和增量更新的基础。', '文件 → 语言 / 文件类别 → importMap', 'skills/understand/scan-project.mjs', '本次直接运行提取脚本和核心 API；没有执行完整项目扫描代理。'],
  ['划分分析批次', '让关联代码尽量留在一起', 'Louvain 社区发现', '把内部导入关系构造成图，再按社区组织文件批次。跨批次邻居和导出符号作为补充上下文，减少孤立分析时丢失关系。', '导入图 → 关联社区 → batches + neighborMap', 'skills/understand/compute-batches.mjs', '源码研究；没有在本样本上调度多代理批次。'],
  ['解析结构', '把符号和位置变成事实', 'Tree-sitter + 专用解析器', '代码经过语法树提取函数、类、参数、导入和调用信息；SQL、配置和文档使用相应解析器。本次实际解析了 5 个 TypeScript 文件与 1 个 SQL 文件。', '源码 → 语法树 → functions / imports / calls', 'packages/core/src/plugins/tree-sitter-plugin.ts', '已实测：5 个函数、1 张表、对应行号。'],
  ['补充语义', '说明职责、意图与业务含义', '宿主大模型 / 文件分析代理', '文件分析代理结合解析结果和原始源码，生成摘要、标签、复杂度与语义关系。质量依赖模型与上下文，不能把所有推断当作语法事实。', '结构事实 + 源码 → 用途摘要 / 语义关系', 'agents/file-analyzer.md', '未执行上游 LLM 流水线；展示中的中文摘要是研究者注释。'],
  ['合并与校验', '把局部图谱连成完整地图', '确定性脚本 + 可选模型审查', '合并批次节点与边，规范标识、处理悬空关系，并校验图谱结构。完整流程还包含架构分层和导览生成，默认检查与可选 LLM 审查有区别。', '局部 nodes / edges → 规范化 → 校验 → 图谱', 'skills/understand/merge-batch-graphs.py', '本次使用 GraphBuilder 与 validateGraph；跨文件调用只做样本内直接导入适配。'],
  ['浏览与问答', '按关系定位需要阅读的代码', 'JSON 图谱 + 前端 / 宿主问答', '上游 Dashboard 使用 React Flow 等库展示图谱。问答技能查找相关节点、相邻关系和层级上下文，再由宿主模型回答。已有图谱可以独立浏览。', 'knowledge-graph.json → 浏览 / 检索子图 → 回答', 'skills/understand-chat/SKILL.md', '本页为独立静态查看器；不提供实时 LLM 问答。'],
  ['增量更新', '减少重复分析，也存在盲区', '内容哈希 + 结构指纹', '比较函数签名、类、导入导出等信息，再分类为跳过、局部更新、架构更新或完整更新。样本证明，函数体内部逻辑变化可能被归为 COSMETIC。', '代码变化 → 指纹比较 → 更新决策', 'packages/core/src/fingerprint.ts', '已实测：阈值变化改变行为，但分类器返回 SKIP。'],
];
function showStep(index) {
  $('pipeline-steps').innerHTML = steps.map((step, i) => `<button class="pipeline-step ${index === i ? 'active' : ''}" data-step="${i}" aria-pressed="${index === i}"><b>0${i + 1}</b><span><strong>${step[0]}</strong><small>${step[1]}</small></span></button>`).join('');
  const step = steps[index];
  $('pipeline-detail').innerHTML = `<div class="big-number">0${index + 1}</div><span class="pipeline-tag">${step[2]}</span><h2>${step[0]}</h2><p>${step[3]}</p><div class="flow-example">${step[4]}</div><h3>本次验证范围</h3><p>${step[6]}</p><a href="${upstream + step[5]}" target="_blank" rel="noreferrer">查看对应上游源码 ↗</a>`;
  for (const button of $('pipeline-steps').querySelectorAll('button')) button.addEventListener('click', () => { const i = Number(button.dataset.step); showStep(i); $('pipeline-steps').querySelector(`[data-step="${i}"]`).focus({ preventScroll: true }); });
}
$('check-list').innerHTML = report.checks.map(check => `<div class="check"><span>✓</span><div>${escapeHtml(check.name)}<small>${escapeHtml(check.id.toUpperCase())} · PASSED</small></div></div>`).join('');
$('fingerprint-source').href = upstream + 'packages/core/src/fingerprint.ts';
const capabilities = [
  ['结构解析', 'Tree-sitter / SQL 等解析器', '本样本实测', '不同语言和框架的解析覆盖不同'],
  ['图谱浏览', 'nodes / edges / layers / tour', '独立查看器 + 真实结构数据', '本页不是上游 Dashboard 截图'],
  ['搜索定位', 'Fuse 名称、标签与摘要匹配', '上游搜索引擎实测', '本页输入框为简化文本筛选'],
  ['语义搜索', '向量相似度核心类', '源码核对', '上游 Dashboard 当前仍用模糊搜索'],
  ['修改影响', '变更文件映射 + 一跳邻居', '上游 buildDiffContext 实测', '不覆盖所有间接影响与运行时行为'],
  ['增量更新', '哈希 / 签名指纹 / 更新分类', '原值、函数体、签名三组实测', '函数体业务变化可能被跳过'],
  ['问答与代码解释', '检索子图，宿主模型回答', '源码研究，未端到端运行', '取决于图谱完整性、时效与模型'],
  ['业务领域与阅读导览', '专用代理归纳流程和阅读路线', '人工领域样本原版渲染；导览交互实测', '未验证自动业务提取和模型归纳'],
  ['Wiki 知识库', 'wikilinks 解析 + 实体 / 主张提取', '人工 Wiki 样本原版渲染', '未验证自动分析；针对约定的 Markdown Wiki 结构'],
  ['Figma 设计图谱', 'REST API 扫描 + LLM 解释 + 结构视图', '人工设计样本原版渲染', '未调用 Figma API；不生成新界面'],
];
$('capability-rows').innerHTML = capabilities.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
const pages = { compare: ['同类工具，各自用在什么地方', '对照五个既有研究：输入、处理、效果、场景与验证范围。'], gallery: ['它能生成哪些图', '四大类别、十二个效果条目：看清图的用途、形态、输入与边界。'], effects: ['一个项目，三种理解方式', '先看结构地图，再追踪代码，最后沿着导览建立全局认识。'], scenarios: ['从你的任务出发，找到使用方式', '接手项目、评审改动、定位逻辑：每个场景都有具体的操作路径。'], guide: ['从安装，到第一次看懂项目', '选择所用工具，逐步完成安装、分析、浏览与提问。'], graph: ['把代码展开成一张地图', '从结账入口出发，沿着真实解析出的关系，理解一个小型订单流程。'], pipeline: ['结构事实，如何变成项目知识', '沿着七个阶段，查看解析器、大模型和图谱之间的职责分工。'], experiments: ['能力的边界，也需要被看见', '保留原始数据与可复现实验，区分实现承诺、实测结果和推断。'], capabilities: ['它能做什么，做到哪一步', '一份对照源码与实验的能力清单，帮助判断适合怎样的研究任务。'] };
function navigate() { const page = Object.hasOwn(pages, location.hash.slice(1)) ? location.hash.slice(1) : 'gallery'; for (const key of Object.keys(pages)) $(key + '-page').hidden = key !== page; for (const link of document.querySelectorAll('[data-page]')) { link.classList.toggle('active', link.dataset.page === page); if (link.dataset.page === page) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); } $('page-heading').innerHTML = `${pages[page][0]}<span>。</span>`; $('page-description').textContent = pages[page][1]; }
window.addEventListener('hashchange', navigate);
window.matchMedia('(max-width:540px)').addEventListener('change', renderGraph);
renderGraph(); renderDetails(); renderTour(); showStep(2); navigate();
