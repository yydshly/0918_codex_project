(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const data = window.LAB;

  $('method-grid').innerHTML = data.methods.map((m,i)=>`<article class="method-card"><span class="index">0${i+1}</span><h3>${m.name}</h3><p class="method-label">${m.label}</p><p><strong>来源</strong> ${m.source}</p><p><strong>适合</strong> ${m.good}</p><p><strong>例子</strong> ${m.example}</p><p><strong>边界</strong> ${m.limit}</p><a href="${m.url}" target="_blank" rel="noreferrer">回查资料 ↗</a></article>`).join('');
  $('source-list').innerHTML = data.sources.map(s=>`<div class="source-item"><a href="${s[2]}" target="_blank" rel="noreferrer">${s[0]} ↗</a><p>${s[1]}</p></div>`).join('');

  let category = '全部';
  let visibleProducts = data.products;
  const fields = [['适合谁','audience'],['使用流程','flow'],['接入方式','mechanism'],['最小可行版本','mvp'],['交付物','output'],['需要验证的边界','boundary'],['怎样判断有用','measure']];
  $('category-filters').innerHTML = ['全部',...data.categories].map(c=>`<button class="chip" data-category="${c}" aria-pressed="${c==='全部'}">${c}</button>`).join('');
  function renderProducts(){
    const query = $('product-search').value.trim().toLocaleLowerCase();
    const difficulty = $('difficulty-filter').value;
    visibleProducts = data.products.filter(p=>(category==='全部'||p.category===category)&&(difficulty==='all'||p.difficulty===difficulty)&&Object.values(p).join(' ').toLocaleLowerCase().includes(query));
    $('result-count').textContent = `显示 ${visibleProducts.length} / ${data.products.length} 个方向`;
    $('product-grid').innerHTML = visibleProducts.map(p=>`<details class="product-card"><summary><div class="product-head"><span>${String(p.id).padStart(2,'0')} / ${p.category}</span><span>复杂度 ${p.difficulty}</span></div><h3>${p.name}</h3><p>${p.problem}</p><span class="expand-hint">展开产品思路 ＋</span></summary><div class="product-body"><dl>${fields.map(([label,key])=>`<dt>${label}</dt><dd class="${key==='boundary'?'boundary':''}">${p[key]}</dd>`).join('')}</dl></div></details>`).join('');
    $('empty-state').hidden = visibleProducts.length > 0;
  }
  $('category-filters').addEventListener('click',e=>{
    const button=e.target.closest('[data-category]'); if(!button)return;
    category=button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    renderProducts();
  });
  $('product-search').addEventListener('input',renderProducts);
  $('difficulty-filter').addEventListener('change',renderProducts);
  $('clear-filters').addEventListener('click',()=>{
    $('product-search').value='';$('difficulty-filter').value='all';
    document.querySelector('[data-category="全部"]').click();
  });
  $('export-ideas').addEventListener('click',()=>{
    const lines=['# Agent 产品方向摘录','','来源：012 Agent 扩展实验室。以下均为产品设想，非已验证产品。','','筛选主题：'+category,''];
    for(const p of visibleProducts){lines.push(`## ${p.id}. ${p.name}`,`类别：${p.category}；复杂度：${p.difficulty}（设计判断）`,'',`问题：${p.problem}`,...fields.map(([label,key])=>`${label}：${p[key]}`),'');}
    const url=URL.createObjectURL(new Blob(['\uFEFF'+lines.join('\n')],{type:'text/markdown;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='agent-product-ideas.md';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  renderProducts();

  // Four local simulations. No network or agent execution is performed.
  let activeDemo='hook';
  const tabs=[...document.querySelectorAll('[data-demo]')];
  function showDemo(name){
    activeDemo=name;
    tabs.forEach(t=>{const selected=t.dataset.demo===name;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;$('demo-'+t.dataset.demo).hidden=!selected;});
    stopOffice();
    if(activeDemo!=='companion') settleMismatch();
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>showDemo(t.dataset.demo));
    t.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].click();tabs[next].focus();}});
  });

  const hookNames=['接收请求','范围检查','模拟读取','结果脱敏','交给模型'];
  let hookStep=0,hookBlocked=false;
  function paintHook(){
    $('hook-pipeline').innerHTML=hookNames.map((n,i)=>`<div class="pipe-step ${hookBlocked&&i===1?'blocked':i<hookStep?'done':i===hookStep?'active':''}"><span>0${i+1}</span><strong>${n}</strong></div>`).join('');
    $('hook-next').disabled=hookBlocked||hookStep>=5;
    $('hook-next').textContent=hookBlocked?'请求已阻止':hookStep>=5?'流程已结束':'执行下一步';
  }
  function resetHook(){hookStep=0;hookBlocked=false;$('hook-log').innerHTML='<li>等待输入 · 所有路径与内容均为模拟样本</li>';$('hook-output').textContent='尚未执行';$('hook-explanation').textContent='输入被接收后，权限插件先检查范围。';paintHook();}
  $('hook-next').addEventListener('click',()=>{
    const scenario=$('hook-scenario').value;
    if(hookBlocked||hookStep>=5)return;
    const logs=[`请求：读取 ${scenario==='blocked'?'/outside/private.txt':'/project/example.txt'}`,'范围插件：路径位于允许目录内，继续执行。','模拟工具：读取完成，得到固定样本。',scenario==='secret'?'脱敏插件：检测到演示密钥，将其替换为 [已隐藏]。':'脱敏插件：未发现演示密钥，保留原结果。','处理后的结果已传递给模拟模型入口。'];
    if(hookStep===0)$('hook-log').innerHTML='';
    if(hookStep===1&&scenario==='blocked'){
      hookBlocked=true;logs[1]='范围插件：拒绝越过 /project/ 目录；没有执行后续读取。';
      $('hook-output').textContent='拒绝：路径不在允许范围内。';$('hook-explanation').textContent='阻止发生在工具执行前。这里没有读取任何真实文件。';
    }
    const item=document.createElement('li');item.textContent=`${String(hookStep+1).padStart(2,'0')}  ${logs[hookStep]}`;$('hook-log').append(item);
    if(hookStep===2){$('hook-output').textContent='工具已返回，尚未交给模型。';$('hook-explanation').textContent=scenario==='secret'?'原始样本：demo_key=EXAMPLE_ONLY_123。下一步会处理结果。':'原始样本：项目说明已读取。';}
    if(hookStep===3){$('hook-output').textContent=scenario==='secret'?'demo_key=[已隐藏]':'项目说明：这是一个本地模拟。';$('hook-explanation').textContent='这是结果内容处理。只在屏幕上打码，不会自动改变模型收到的内容。';}
    if(hookStep===4)$('hook-explanation').textContent='模型入口收到处理结果。真实保护需要覆盖全部相关路径与异常情况。';
    hookStep++;paintHook();
  });
  $('hook-reset').addEventListener('click',resetHook);$('hook-scenario').addEventListener('change',resetHook);resetHook();

  const agents={reader:{name:'资料员',status:'idle',tool:'—',evidence:'尚未收到事件',time:'—'},builder:{name:'验证员',status:'idle',tool:'—',evidence:'尚未收到事件',time:'—'},reviewer:{name:'审阅员',status:'idle',tool:'—',evidence:'尚未收到事件',time:'—'}};
  const labels={idle:'待命',working:'执行中',waiting:'等你确认',done:'本轮结束',failed:'执行失败',offline:'失联 / 状态未知'};
  const events=[
    ['reader','working','Read README.md','tool.start','资料员开始阅读项目说明'],
    ['builder','working','运行示例','tool.start','验证员开始执行本地样例'],
    ['reader','done','—','turn.complete','资料员本轮结束，等待交接'],
    ['reviewer','working','核对研究记录','tool.start','审阅员检查版本与许可证记录'],
    ['builder','waiting','申请继续验证','permission.request','验证员需要人工确认；回放暂停'],
    ['builder','working','继续运行样例','tool.start','收到确认后继续执行'],
    ['reviewer','done','—','turn.complete','审阅员本轮结束，仍需汇总验收'],
    ['builder','done','—','turn.complete','验证员本轮结束；不自动判定全部目标通过']
  ];
  let officeIndex=0,officeTimer=null,selectedAgent='reader',officeWaiting=false,officeInjected=false;
  function stopOffice(){if(officeTimer){clearInterval(officeTimer);officeTimer=null;}$('office-play').textContent='自动回放';}
  function renderOffice(){
    for(const [id,a] of Object.entries(agents)){const button=document.querySelector(`[data-agent="${id}"]`);button.dataset.status=a.status;button.classList.toggle('selected',id===selectedAgent);button.querySelector('.agent-bubble').textContent=labels[a.status];button.setAttribute('aria-label',`查看${a.name}：${labels[a.status]}`);}
    const a=agents[selectedAgent];$('agent-name').textContent=a.name;$('agent-status').textContent=labels[a.status];$('agent-detail').innerHTML=`<dt>身份</dt><dd>demo-${selectedAgent}</dd><dt>当前活动</dt><dd>${esc(a.tool)}</dd><dt>状态依据</dt><dd>${esc(a.evidence)}</dd><dt>模拟时间</dt><dd>${a.time}</dd>`;
    $('office-approve').hidden=!officeWaiting;
    $('office-next').disabled=officeWaiting||officeInjected||officeIndex>=events.length;
    $('office-play').disabled=officeWaiting||officeInjected||officeIndex>=events.length;
    $('office-step').textContent=`已处理 ${officeIndex} / ${events.length} 个回放事件`;
  }
  function nextOffice(){
    if(officeWaiting||officeInjected||officeIndex>=events.length){stopOffice();return;}
    const [id,status,tool,evidence,message]=events[officeIndex];
    officeIndex++;Object.assign(agents[id],{status,tool,evidence,time:`00:${String(officeIndex*3).padStart(2,'0')}`});selectedAgent=id;
    $('office-events').textContent=`${agents[id].time} · demo-${id} · ${evidence} → ${message}`;
    if(status==='waiting'){officeWaiting=true;stopOffice();}
    if(officeIndex===events.length)stopOffice();renderOffice();
  }
  $('office-play').addEventListener('click',()=>{if(officeTimer){stopOffice();return;}nextOffice();if(!officeWaiting&&!officeInjected&&officeIndex<events.length){officeTimer=setInterval(nextOffice,1600);$('office-play').textContent='暂停回放';}});
  $('office-next').addEventListener('click',()=>{stopOffice();nextOffice();});
  $('office-approve').addEventListener('click',()=>{officeWaiting=false;nextOffice();});
  $('office-reset').addEventListener('click',()=>{stopOffice();officeIndex=0;officeWaiting=false;officeInjected=false;selectedAgent='reader';for(const a of Object.values(agents))Object.assign(a,{status:'idle',tool:'—',evidence:'尚未收到事件',time:'—'});$('office-events').textContent='等待模拟事件。';renderOffice();});
  document.querySelectorAll('[data-agent]').forEach(b=>b.addEventListener('click',()=>{selectedAgent=b.dataset.agent;renderOffice();}));
  function injectOffice(status){stopOffice();officeWaiting=false;officeInjected=true;Object.assign(agents[selectedAgent],{status,tool:'—',evidence:status==='failed'?'tool.error（模拟）':'heartbeat.missing（模拟）',time:'注入事件'});$('office-events').textContent=status==='failed'?'注入工具失败。当前回放已停止，请重置后重放。':'注入心跳丢失。只能判断失联，不能断言任务已完成或进程已死亡。请重置后重放。';renderOffice();}
  $('office-fail').addEventListener('click',()=>injectOffice('failed'));$('office-offline').addEventListener('click',()=>injectOffice('offline'));renderOffice();

  let petState='working',cards=[],revealed=[],matched=new Set(),mismatchTimer=null;
  function settleMismatch(){if(mismatchTimer){clearTimeout(mismatchTimer);mismatchTimer=null;}if(revealed.length===2){revealed=[];renderCards();}}
  function renderCards(){
    $('memory-board').innerHTML=cards.map((symbol,i)=>{const show=matched.has(i)||revealed.includes(i);return `<button class="memory-card ${matched.has(i)?'matched':show?'revealed':''}" data-card="${i}" aria-label="卡片 ${i+1}${show?'：'+symbol:'：未翻开'}" ${petState!=='working'||matched.has(i)||revealed.includes(i)||revealed.length===2?'disabled':''}>${show?symbol:'?'}</button>`;}).join('');
    $('game-score').textContent=`配对 ${matched.size/2} / 4`;
  }
  function resetGame(){settleMismatch();cards=['◈','✿','☀','♣','◈','✿','☀','♣'];for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]];}revealed=[];matched=new Set();renderCards();updatePetText();}
  function updatePetText(){
    const content={working:['Agent 正在工作','等待期间，可以玩一局翻牌。','游戏仅在本页运行，不消耗模型 token。'],waiting:['Agent 等你确认','先处理待确认事项，游戏已暂停。','等待输入与工作结束是不同状态。'],done:['Agent 本轮结束','游戏已暂停，可以返回任务查看交付。','收到结束事件不代表已经通过成果验收。']}[petState];
    $('pet').dataset.state=petState;$('pet-status').textContent=content[0];$('pet-message').textContent=content[1];$('game-message').textContent=matched.size===8&&petState==='working'?'全部配对成功！这是游戏结果，不代表任务已完成。':content[2];
    document.querySelectorAll('[data-pet]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pet===petState)));
  }
  document.querySelectorAll('[data-pet]').forEach(b=>b.addEventListener('click',()=>{settleMismatch();petState=b.dataset.pet;updatePetText();renderCards();}));
  $('memory-board').addEventListener('click',e=>{
    const button=e.target.closest('[data-card]');if(!button||petState!=='working'||revealed.length>=2)return;
    const i=Number(button.dataset.card);if(matched.has(i)||revealed.includes(i))return;revealed.push(i);
    if(revealed.length===2){if(cards[revealed[0]]===cards[revealed[1]]){revealed.forEach(n=>matched.add(n));revealed=[];updatePetText();}else{mismatchTimer=setTimeout(()=>{mismatchTimer=null;revealed=[];renderCards();},800);}}
    renderCards();
  });
  $('game-reset').addEventListener('click',resetGame);resetGame();

  const reviewNames=['研究版本与许可证','报告文件','运行验证证据','人工内容审阅'];
  function resetReview(){$('review-grid').innerHTML=reviewNames.map(name=>`<article class="review-item"><div><h4>${name}</h4><span>未检查</span></div><p>等待模拟验收。</p></article>`).join('');$('review-result').textContent='尚未验收。停止事件只代表本轮执行结束。';}
  $('review-run').addEventListener('click',()=>{
    const type=$('review-scenario').value;
    const rows=[['pass','通过','样本记录：revision=demo-001；许可证字段与来源链接齐全。'],['pass','通过','样本文件：research.md 已列入交付清单。'],type==='incomplete'?['fail','缺失','样本中没有运行回执；教程文字不能替代执行证据。']:type==='failed'?['fail','失败','样本回执：check exit=1；仍有错误需要修复。']:['pass','通过','样本回执：check exit=0，包含命令和时间。'],['manual','待人工','内容质量与研究结论需要人工审阅，未自动宣称完成。']];
    $('review-grid').innerHTML=rows.map((r,i)=>`<article class="review-item" data-result="${r[0]}"><div><h4>${reviewNames[i]}</h4><span>${r[1]}</span></div><p>${r[2]}</p></article>`).join('');
    $('review-result').textContent=type==='complete'?'模拟结果：3 项自动检查通过，1 项待人工审阅。可以交给用户核对，尚未宣称最终验收完成。':type==='incomplete'?'模拟结果：缺少运行证据，不能标为已验证。下一步应补充实际执行记录。':'模拟结果：检查失败。保留失败证据，修复后再验收，不能把执行结束当成成功。';
  });
  $('review-scenario').addEventListener('change',resetReview);resetReview();

  // Keep the navigation aligned with the section currently read.
  const sectionLinks=[...document.querySelectorAll('.sidebar nav a')];
  let scrollPending=false;
  function markSection(){const edge=innerWidth<=760?160:120;let current='overview';for(const section of document.querySelectorAll('main>.section')){if(section.getBoundingClientRect().top<=edge)current=section.id;}sectionLinks.forEach(a=>{const active=a.hash==='#'+current;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});scrollPending=false;}
  addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(markSection);}},{passive:true});markSection();
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopOffice();settleMismatch();}});
  addEventListener('pagehide',()=>{stopOffice();settleMismatch();});
})();
