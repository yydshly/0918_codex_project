(() => {
  'use strict';
  const data = window.RESEARCH;
  const main = document.querySelector('main');
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const source = (path, label = '查看固定版本源码') => `<a class="source" href="${data.base + path}" target="_blank" rel="noreferrer">${label} ↗</a>`;
  const heading = (no, title, description, tag = '73087da · 源码研究') => `<div class="page-heading"><div><p class="eyebrow">FIELDNOTES / ${no}</p><h1>${title}</h1></div><span class="pill">${tag}</span></div><p class="lede">${description}</p>`;
  const code = (label, text) => `<div class="code-box"><div class="code-label">${escape(label)}</div><pre>${escape(text)}</pre></div>`;
  let selectedCapability = 'commands';
  let selectedLayer = 'instruction';
  let selectedScenario = 'feature';
  let step = -1;
  let unit = 'C';
  let outcome = 'success';
  const trace = [];
  const stepNames = ['询问用户偏好','委派天气代理','执行取数技能','返回结构化结果','生成展示产物'];
  const stepRoles = ['Command / AskUserQuestion','Command / Agent','Agent / Skill + WebFetch','Agent → Command','Command / SVG Skill'];
  function overview() {
    main.innerHTML = heading('01', 'Claude Code 使用指南＋配置示例集', '这个仓库教你理解 Claude Code 的用法，提供规则、技能、代理、命令、Hooks 等配置示例。核心是帮助理解 AI 的工作流程与动作，更好地使用 AI。', '我们的理解 · 从这张图开始') + `
      <div class="callout"><strong>对我们的直接参考价值不大。</strong>我们已有项目规则，也能直接用 AI 开发和验证。它更适合作为理解“谁负责什么、步骤怎样交接、结果如何检查”的学习参考，无需专门集成，也不代表模型能力增强。</div>
      <section class="map-reader" aria-label="理解引导图">
        <div class="map-toolbar"><h2>一张图，先看清定位与意义</h2><div class="actions"><button class="button secondary" id="map-minus" aria-label="缩小引导图">−</button><output id="map-scale" aria-live="polite">100%</output><button class="button secondary" id="map-plus" aria-label="放大引导图">＋</button><button class="button secondary" id="map-fit">适应窗口</button><a class="button secondary" href="../assets/understanding-map.png" download>下载高清图 ↓</a></div></div>
        <div class="map-stage" id="map-stage" tabindex="0" aria-label="引导图阅读区，可滚动查看放大后的内容"><img id="map-image" src="../assets/understanding-map.svg" alt="Claude Code 使用指南与配置示例集：九类组成、模型和项目的关系、使用场景、对我们的价值与能力边界"></div>
        <p class="note map-caption">原创理解总览，非产品截图。放大后可滚动阅读；<a href="../assets/understanding-map.svg" target="_blank" rel="noreferrer">在新窗口查看矢量图 ↗</a>。</p>
      </section>
      <div class="section-heading"><h2>顺着图，继续理解</h2><span>按问题进入，不必逐项配置</span></div>
      <div class="guide-links"><a href="#capabilities"><span>01 / 内容</span><strong>里面有哪些示例？</strong><p>规则、命令、代理、技能、事件与工具。</p></a><a href="#workflow"><span>02 / 动作</span><strong>一次任务怎么流转？</strong><p>用固定天气样本观察输入、交接与输出。</p></a><a href="#mechanism"><span>03 / 原理</span><strong>到底是谁在执行？</strong><p>区分仓库指令、Claude Code 与实际工具。</p></a><a href="#evidence"><span>04 / 边界</span><strong>哪些已经验证？</strong><p>区分源码事实、程序实验和教学模拟。</p></a></div>`;
    mapZoom = 1;
    fitMap();
  }
  let mapZoom = 1;
  function fitMap() {
    const stage = document.querySelector('#map-stage'), img = document.querySelector('#map-image');
    if (!stage || !img) return;
    const base = Math.min(stage.clientWidth - 32, (stage.clientHeight - 32) * 1800 / 2380);
    img.style.width = `${base * mapZoom}px`;
    document.querySelector('#map-scale').textContent = `${Math.round(mapZoom * 100)}%`;
    document.querySelector('#map-minus').disabled = mapZoom <= 1;
    document.querySelector('#map-plus').disabled = mapZoom >= 4;
  }
  function capabilities() {
    main.innerHTML = heading('02', '六类配置示例，帮助理解工作分工。', '这些机制主要由 Claude Code 提供。仓库示范如何使用与组合，不能把每一种配置都理解成它自行实现的新能力。') + `
      <section class="architecture" aria-label="能力分层">
        <div class="arch-block"><small>01 / 项目需求</small><h3>目标与验收条件</h3><p>做什么 · 为谁做 · 怎样算完成</p></div><span class="arrow" aria-hidden="true">→</span>
        <div class="arch-block featured"><small>02 / 本仓库提供的组织层</small><h3>规则 + 流程 + 可复用方法</h3><p>Commands · Agents · Skills · Hooks</p></div><span class="arrow" aria-hidden="true">→</span>
        <div class="arch-block"><small>03 / 执行基础</small><h3>Claude Code 与工具</h3><p>模型推理 · 文件操作 · 外部服务</p></div>
      </section>
      <div class="section-heading"><h2>示例如何对应具体动作</h2><span>选择一项，查看实现与边界</span></div>
      <div class="cap-layout"><div class="cap-grid">${data.capabilities.map(item => `<button class="cap-button" data-cap="${item.id}" aria-pressed="${item.id === selectedCapability}"><span class="num">${item.n} / ${item.id.toUpperCase()}</span><strong>${item.title}</strong><p>${item.short}</p></button>`).join('')}</div><section id="cap-detail" class="panel detail-panel" aria-live="polite"></section></div>
      <div class="inline-facts"><div class="fact"><strong>参考实现与经验库</strong>可按项目挑选组件，无需把所有配置一起复制。</div><div class="fact"><strong>教学示例：天气卡片</strong>一条流程串起询问、委派、取数与输出。</div><div class="fact"><strong>重点：组织工作方式</strong>规则和流程约束提高一致性，正确性仍需实际检查。</div></div>`;
    updateCapability();
  }
  function updateCapability() {
    const item = data.capabilities.find(item => item.id === selectedCapability);
    document.querySelectorAll('[data-cap]').forEach(button => button.setAttribute('aria-pressed', button.dataset.cap === selectedCapability));
    document.querySelector('#cap-detail').innerHTML = `<span class="tag">${item.label}</span><h2>${item.title}</h2><p>${item.what}</p><p class="muted">${item.how}</p>${code(item.path, item.snippet)}<p class="note" style="margin-top:16px">${item.example}</p><div class="callout">${item.boundary}</div>${source(item.path)}`;
  }
  function workflow() {
    main.innerHTML = heading('03', '跟着一次任务，看清每一步交接。', '以仓库的迪拜天气示例为线索。点击“下一步”观察角色、输入与输出；切换失败样本，检查流程在哪一层停止。', '交互模拟 · 固定样本') + `
      <div class="callout" style="margin-bottom:22px"><strong>模拟数据：</strong>固定温度 26°C / 78.8°F。网页只演示控制与数据流，不调用 Claude Code，不请求天气 API。</div>
      <div class="workflow-controls"><div class="field"><label for="unit">温度单位</label><select id="unit"><option value="C" ${unit === 'C' ? 'selected' : ''}>摄氏度 °C</option><option value="F" ${unit === 'F' ? 'selected' : ''}>华氏度 °F</option></select></div><div class="field"><label for="outcome">取数结果</label><select id="outcome"><option value="success" ${outcome === 'success' ? 'selected' : ''}>成功样本</option><option value="failure" ${outcome === 'failure' ? 'selected' : ''}>失败样本：无有效数值</option></select></div><div class="actions"><button class="button" id="next-step">开始演示 →</button><button class="button secondary" id="reset-flow">重置</button></div></div>
      <div class="workflow-grid"><ol class="step-list" aria-label="执行步骤">${stepNames.map((title, i) => `<li class="step-item" data-step="${i}"><span class="step-dot">${i + 1}</span><div><strong>${title}</strong><small>${stepRoles[i]}</small></div></li>`).join('')}</ol><section id="flow-detail" class="panel flow-detail" aria-live="polite"></section></div>
      <section class="trace" aria-label="模拟执行轨迹"><h3>执行轨迹 <span class="tag gray">浏览器本地模拟</span></h3><div id="flow-trace" aria-live="polite"></div></section>
      <p class="note" style="margin-top:18px">上游写有“未得到数值和单位就停止”的自然语言约束。本页用 JavaScript 明确实现这一分支；它验证的是教学演示，不代表上游代理已通过相同测试。${source('.claude/commands/weather-orchestrator.md','核对原始流程')}</p>`;
    updateWorkflow();
  }
  function updateWorkflow() {
    const failed = outcome === 'failure' && step === 2;
    document.querySelectorAll('[data-step]').forEach((el, i) => {
      el.classList.toggle('done', i < step);
      el.classList.toggle('current', i === step && !failed);
      el.classList.toggle('failed', i === step && failed);
      if (i === step) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
    });
    const next = document.querySelector('#next-step');
    next.disabled = step === 4 || failed;
    next.textContent = failed ? '已停止' : step === 4 ? '演示完成' : step < 0 ? '开始演示 →' : '下一步 →';
    const temp = unit === 'C' ? 26 : 78.8;
    const descriptions = [
      ['Command 收集输入', `用户选择${unit === 'C' ? '摄氏度' : '华氏度'}。主流程先获得明确偏好，才进入委派步骤。`, `输入：/weather-orchestrator\n输出：unit = ${unit}`, '.claude/commands/weather-orchestrator.md'],
      ['Agent 接收专项任务', '主流程调用 weather-agent，将地点与单位放进任务上下文。代理负责取数并汇报，不负责生成最终天气卡片。', `Agent(subagent_type="weather-agent",\n  prompt="Fetch Dubai temperature in ${unit}",\n  model="haiku")\n\n注意：代理文件默认写 sonnet；命令指定 haiku。`, '.claude/agents/weather-agent.md'],
      ['Skill 提供取数方法', '代理被指示调用 weather-fetcher；技能写明 Open-Meteo 地址与 JSON 字段，由 WebFetch 发起网络请求。此处用本地样本替代网络。', `模拟响应：\n{"current":{"temperature_2m":${temp}},\n "current_units":{"temperature_2m":"°${unit}"}}`, '.claude/skills/weather-fetcher/SKILL.md'],
      ['返回温度与单位', '主流程获得数值和单位后，才继续输出步骤。原版依赖模型传递和检查这些信息；这里演示的是预设有效结果。', `temperature = ${temp}\nunit = ${unit}\n\n主流程 → weather-svg-creator`, '.claude/commands/weather-orchestrator.md'],
      ['根据模板生成产物', '输出技能按照 reference.md 的模板写天气卡片与摘要。下方是本网页原创的样本产物，可下载查看；不会改写仓库文件。', `上游预期输出：\norchestration-workflow/weather.svg\norchestration-workflow/output.md`, '.claude/skills/weather-svg-creator/SKILL.md']
    ];
    let content;
    if (step < 0) content = `<p class="step-kicker">READY / 等待开始</p><h2>一条命令，连接五个步骤</h2><p class="muted">主流程组织任务，子代理处理专项工作，技能补充具体方法。选择单位与结果，然后开始。</p>${code('任务输入', '/weather-orchestrator\n\n地点：Dubai（上游示例固定地点）\n目标：得到温度并生成天气卡片')}<p class="note" style="margin-top:20px">改变单位或结果会重置当前演示。</p>`;
    else if (failed) content = `<span class="tag amber">失败分支 · 停止</span><h2 style="margin-top:18px">没有有效温度，就不生成卡片。</h2><p>取数技能未返回数值与单位。按照原版指令中的停止条件，代理报告失败，主流程不进入 SVG 生成步骤。</p>${code('模拟错误响应', '{"current": {"temperature_2m": null}}\n\n结果：缺少有效温度\n动作：停止并报告失败\n产物：无')}<p class="note" style="margin-top:18px">本页不会提供下载，也不会使用上次的温度伪造成功。</p>${source('.claude/agents/weather-agent.md')}`;
    else {
      const [title, desc, sample, path] = descriptions[step];
      content = `<p class="step-kicker">STEP 0${step + 1} / ${stepRoles[step]}</p><h2>${title}</h2><p class="muted">${desc}</p>${code(step === 2 ? '教学样本 · 非实时数据' : '输入 / 输出说明', sample)}${step === 4 ? `<div class="flow-output"><div class="weather-preview"><small>DUBAI / 迪拜 · 教学样本</small><strong>${temp}°${unit}</strong><small>固定输入，非实时天气</small></div><div class="output-info"><p>weather-demo.svg<br>固定样本产物 · 浏览器生成</p><button id="download-svg" class="button secondary">下载样本 SVG ↓</button></div></div>` : ''}${source(path)}`;
    }
    document.querySelector('#flow-detail').innerHTML = content;
    document.querySelector('#flow-trace').innerHTML = trace.length ? `<ol>${trace.map(line => `<li>${escape(line)}</li>`).join('')}</ol>` : '<p class="empty-trace">尚无执行记录。点击“开始演示”。</p>';
  }
  function advance() {
    if (step >= 4 || (outcome === 'failure' && step === 2)) return;
    step++;
    const messages = [`Command：确认单位 ${unit}`, 'Command → Agent：委派 weather-agent', outcome === 'failure' ? 'Skill：无有效温度 → 报告失败，停止流程' : `Skill：读取固定样本 ${unit === 'C' ? '26°C' : '78.8°F'}`, 'Agent → Command：返回温度和单位', 'Command → SVG Skill：生成样本产物'];
    trace.push(messages[step]);
    updateWorkflow();
  }
  function reset() { step = -1; trace.length = 0; updateWorkflow(); }
  function downloadSvg() {
    if (step !== 4 || outcome !== 'success') return;
    const temp = unit === 'C' ? 26 : 78.8;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="280" viewBox="0 0 560 280"><title>Dubai fixed teaching sample, not live weather</title><rect width="560" height="280" rx="20" fill="#17263f"/><g fill="#ffffff" font-family="sans-serif"><text x="36" y="54" font-size="19">DUBAI / TEACHING SAMPLE</text><text x="36" y="160" font-size="76">${temp}°${unit}</text><text x="36" y="224" font-size="17">Fixed input. Not live weather. Research 002.</text></g></svg>`;
    const blobUrl = URL.createObjectURL(new Blob([svg], {type:'image/svg+xml;charset=utf-8'}));
    const link = document.createElement('a'); link.href = blobUrl; link.download = `weather-demo-${unit}.svg`; link.click();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  }
  function mechanism() {
    main.innerHTML = heading('04', '从文本指令，到真实工具操作。', '用四层结构理解实现：仓库定义方法，运行环境组织执行，工具产生结果，事件与记忆补充反馈。') + `<div class="mechanism-grid"><div class="layer-list">${data.layers.map(layer => `<button class="layer-button" data-layer="${layer.id}" aria-pressed="${layer.id === selectedLayer}"><span>${layer.en}</span>${layer.label}</button>`).join('')}</div><section class="panel" id="layer-detail" aria-live="polite"></section></div><div class="contrast"><div><h3>自然语言约束</h3><p>例如“先询问单位”“不要绕过技能”。由模型理解并遵循，不能直接当作已经生效的程序校验。</p></div><div><h3>程序执行的约束</h3><p>例如运行环境识别的权限配置、脚本中的条件判断和 CI 检查。效果仍需结合具体版本与配置验证。</p></div></div><div class="callout warn" style="margin-top:20px"><strong>源码中的两个差异：</strong>流程文档把 weather-fetcher 描述为预加载知识；当前代理正文又要求通过 Skill 工具调用。代理配置使用 allowedTools，而官方子代理文档列出的是 tools。复制前需要确认目标版本的行为。</div>`;
    updateLayer();
  }
  function updateLayer() {
    const item = data.layers.find(item => item.id === selectedLayer);
    document.querySelectorAll('[data-layer]').forEach(button => button.setAttribute('aria-pressed', button.dataset.layer === selectedLayer));
    document.querySelector('#layer-detail').innerHTML = `<span class="tag">${item.en}</span><h2 style="font-size:1.6rem;margin-top:15px">${item.title}</h2><p class="muted">${item.text}</p><ul class="rule-list">${item.points.map(point => `<li>${point}</li>`).join('')}</ul>${code('实现路径 · 研究者概括', item.code)}${source(item.path)}`;
  }
  function adapt() {
    main.innerHTML = heading('05', '把参考模式，变成自己项目的作业规范。', '先写清项目背景与验收条件，再把重复任务封装为命令和技能；在确有上下文隔离需求时引入子代理。', '研究建议 · 未执行的业务方案') + `<div class="scenario-picker" aria-label="选择项目场景">${data.scenarios.map(item => `<button data-scenario="${item.id}" aria-pressed="${item.id === selectedScenario}">${item.title}</button>`).join('')}</div><div id="scenario-detail" aria-live="polite"></div><div class="callout" style="margin-top:23px"><strong>落地顺序：</strong>最小项目说明 → 一条真实高频流程 → 可复用技能 → 必要的分工与自动检查。只迁移需要的部分，并为每条流程保留明确的输入、产物和失败条件。</div><p class="note" style="margin-top:18px">天气取数是教学示例。上述业务流程由本研究推导，未声称是上游现成能力或已验证的生产方案。<a href="../notes/adaptation.md">阅读适配指南 ↗</a></p>`;
    updateScenario();
  }
  function updateScenario() {
    const item = data.scenarios.find(item => item.id === selectedScenario);
    document.querySelectorAll('[data-scenario]').forEach(button => button.setAttribute('aria-pressed', button.dataset.scenario === selectedScenario));
    document.querySelector('#scenario-detail').innerHTML = `<p class="muted">${item.intro}</p><div class="phases">${item.phases.map(([title,text],i) => `<div class="phase"><small>PHASE / 0${i + 1}</small><h3>${title}</h3><p>${text}</p></div>`).join('')}</div><div class="split"><section class="panel"><h2>应该配置什么</h2><ul class="file-list">${item.files.map(([path,text]) => `<li><code>${path}</code>${text}</li>`).join('')}</ul></section><section class="panel"><h2>怎样判断任务完成</h2><p>${item.accept}</p><div class="contrast" style="grid-template-columns:1fr"><div><h3>由 AI 完成</h3><p>理解需求、提出方案、修改代码、解释结果。</p></div><div><h3>由检查提供证据</h3><p>真实运行测试、检查构建、复核改动与产物；保存结果和仍未覆盖的边界。</p></div></div></section></div>`;
  }
  function evidence() {
    main.innerHTML = heading('06', '每个结论，都标明依据与边界。', '源码阅读回答“它被设计成怎样工作”；本地实验回答“哪些程序行为已经检查”；教学模拟负责帮助理解，三者分别记录。') + `<div class="version-strip"><span>研究日期 <code>2026-09-18</code></span><span>固定版本 <code>73087da</code></span><span>上游许可 <code>MIT</code></span></div>
      <div class="table-wrap"><table><thead><tr><th>研究对象</th><th>证据类型</th><th>已经确认</th><th>未覆盖</th></tr></thead><tbody>
      <tr><td>六类组件</td><td><span class="tag">源码核对</span></td><td>入口、文件职责、配置内容与调用意图</td><td>所有配置在各版本下的实际行为</td></tr>
      <tr><td>Hooks 脚本</td><td><span class="tag">本地程序实验</span></td><td>事件映射、提交识别、配置覆盖、日志开关</td><td>Claude Code 事件触发、真实音频播放</td></tr>
      <tr><td>天气工作流</td><td><span class="tag amber">教学模拟</span></td><td>本页成功 / 失败分支、单位切换与样本产物</td><td>Claude Code 中的端到端代理执行</td></tr>
      <tr><td>外部 MCP 服务</td><td><span class="tag">配置核对</span></td><td>三个服务的启动配置及包版本</td><td>服务安装、连接与工具调用</td></tr>
      <tr><td>项目开发适配</td><td><span class="tag gray">研究推导</span></td><td>提供输入、分工、产物与验收的设计建议</td><td>实际业务项目的效果与效率测量</td></tr>
      </tbody></table></div>
      <div class="evidence-list"><article class="panel"><span class="tag amber">发现 01 / 文档与实现</span><h3>预加载，与显式调用并存</h3><p>流程说明称代理直接遵循预加载技能；当前代理正文却要求显式调用 Skill。说明存在漂移，不能仅凭流程图断言运行结果。</p>${source('orchestration-workflow/orchestration-workflow.md','查看说明文档')}<br>${source('.claude/agents/weather-agent.md','查看代理定义')}</article><article class="panel"><span class="tag amber">发现 02 / 配置兼容性</span><h3>工具字段需要核对</h3><p>天气代理使用 allowedTools；官方文档列出的子代理工具字段是 tools。因此“只有 Read / Skill 权限”的说法尚不能作为已验证事实。</p><a href="https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields" target="_blank" rel="noreferrer">核对官方字段说明 ↗</a></article><article class="panel"><span class="tag">发现 03 / Hook 行为</span><h3>通知不会自动变成质量门禁</h3><p>hooks.py 最终以状态 0 退出，包含声音与日志逻辑。虽然注册了多个生命周期事件，但没有实现测试失败阻断或审查判定。</p>${source('.claude/hooks/scripts/hooks.py')}</article><article class="panel"><span class="tag">发现 04 / 配置迁移</span><h3>示例包含作者个人偏好</h3><p>共享设置包含宽泛的工具允许项、部分命令询问项、自定义状态栏与提示文字。用于自己的项目时，应按需选择并验证。</p>${source('.claude/settings.json')}</article></div>
      <section class="panel" style="margin-top:22px"><h2>文档与可复核记录</h2><ul class="source-list"><li><a href="../README.md">项目说明与运行入口</a></li><li><a href="../notes/research.md">实现原理与研究笔记</a></li><li><a href="../notes/adaptation.md">开发项目适配指南</a></li><li><a href="../notes/evidence/sources.json">来源清单与文件 SHA-256</a></li><li><a href="../notes/evidence/experiments.json">Hooks 本地实验记录</a></li><li><a href="../notes/evidence/browser-qa.json">网页交互与响应式验证记录</a></li><li><a href="../licenses/upstream.LICENSE">上游 MIT 许可证</a></li></ul></section>`;
  }
  const pages = {overview, capabilities, workflow, mechanism, adapt, evidence};
  function render() {
    const requested = location.hash.slice(1);
    const page = Object.hasOwn(pages, requested) ? requested : 'overview';
    document.querySelectorAll('[data-page]').forEach(link => {
      if (link.dataset.page === page) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
    });
    pages[page]();
    document.title = `${document.querySelector(`[data-page="${page}"]`).textContent.trim().replace(/^\d+/, '')} · Claude Code Best Practice`;
  }
  main.addEventListener('click', event => {
    const cap = event.target.closest('[data-cap]');
    const layer = event.target.closest('[data-layer]');
    const scenario = event.target.closest('[data-scenario]');
    if (cap) { selectedCapability = cap.dataset.cap; updateCapability(); }
    if (layer) { selectedLayer = layer.dataset.layer; updateLayer(); }
    if (scenario) { selectedScenario = scenario.dataset.scenario; updateScenario(); }
    if (event.target.closest('#next-step')) advance();
    if (event.target.closest('#reset-flow')) reset();
    if (event.target.closest('#download-svg')) downloadSvg();
    if (event.target.closest('#map-plus')) { mapZoom = Math.min(4, mapZoom + .5); fitMap(); }
    if (event.target.closest('#map-minus')) { mapZoom = Math.max(1, mapZoom - .5); fitMap(); }
    if (event.target.closest('#map-fit')) { mapZoom = 1; fitMap(); document.querySelector('#map-stage').scrollTo(0,0); }
  });
  main.addEventListener('change', event => {
    if (event.target.id === 'unit') { unit = event.target.value; reset(); }
    if (event.target.id === 'outcome') { outcome = event.target.value; reset(); }
  });
  window.addEventListener('hashchange', () => { render(); window.scrollTo(0,0); main.focus({preventScroll:true}); });
  window.addEventListener('resize', fitMap);
  render();
})();
