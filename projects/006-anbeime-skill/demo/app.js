(() => {
  'use strict';
  const data = window.RESEARCH;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const source = path => `https://github.com/anbeime/skill/blob/${data.commit}/${path}`;
  const format = value => escape(value).replace(/`([^`]+)`/g, '<code>$1</code>');
  const external = (url, title) => `<a href="${escape(url)}" target="_blank" rel="noreferrer">${escape(title)}</a>`;
  const pages = [
    {name:'生态首页',file:'index.html',type:'产品与资源总入口',intro:'首页把技能资源与关联产品放在同一个入口，展示范围覆盖整个 TOPGO 站群。',content:'知易、StarClaw、四色卡片、技能库、N8N 工作流和主题工具站。',role:'帮助发现不同产品和资源；实际任务由具体技能或目标服务完成。',boundary:'首页介绍的产品，不代表全部代码和服务都包含在这个仓库。数量也是页面自己的声明。'},
    {name:'中文技能浏览',file:'skills.html',type:'精选技能与外部索引',intro:'用卡片介绍本地技能、推荐项目和来自其他团队的技能来源。',content:'内容创作、视频、文档等精选卡片，以及 Anthropic、Vercel 等原始项目链接。',role:'快速找到候选技能，再查看本地文件或前往原作者仓库。',boundary:'页面中的“官方”是来源分类；目录卡片不等于访问者已安装或经过测试。'},
    {name:'本地技能库',file:'local-skills.html',type:'目录数据展示',intro:'提供分类与条件筛选，从 /data/local_skills.json 读取作者维护的技能数据。',content:'独立技能、技能集、API 需求等筛选，以及本地目录和备份位置说明。',role:'把作者的技能目录变成可浏览列表，方便定位资源。',boundary:'“已安装”描述的是作者登记的环境，不会把技能安装到浏览者电脑。数据文件与页面数字也存在差异。'},
    {name:'项目案例',file:'projects.html',type:'应用介绍与场景说明',intro:'以 AI 伴侣为线索，介绍 Companion Skill、Companion Simple 和 Assistant 三个项目。',content:'图片、对话、陪伴和任务场景，以及对应仓库子目录与文档跳转。',role:'解释不同应用的目标和组合方式，为进一步研究提供线索。',boundary:'场景对话是页面示例；不能据此认定长期记忆、任务执行或图像生成已跑通。'},
    {name:'聊天演示',file:'chat-demo.html',type:'预设交互样例',intro:'有输入框、快捷问题和图片回复，能够展示伴侣交互的外观与节奏。',content:'用 mockResponses 匹配预设回复，加入模拟等待，并展示已有 Unsplash 图片。',role:'帮助理解作者想呈现的交互体验；这个页面本身未接通真实任务执行。',boundary:'“整理完成”“生成照片”等显示文本不是执行证据。页面没有实际整理文件或生成这些图片。'},
    {name:'英文资源首页',file:'index-en.html',type:'另一版资源入口',intro:'用英文介绍技能资源和外部 N8N 工作流站，并提供两个方向的入口。',content:'页面声明 416 个实体技能、2,053 个工作流等统计。',role:'方便英文读者浏览资源；结构和更新口径与中文首页并不完全相同。',boundary:'英文页的数字不能直接与中文页或固定文件树统计合并。'},
    {name:'英文技能浏览',file:'skills-en.html',type:'英文精选与来源导航',intro:'以英文展示部分精选技能和外部团队索引。',content:'本地精选、文档处理技能以及 Anthropic 等原作者链接。',role:'作为英文阅读与发现入口，具体实现仍回到相应技能和源库。',boundary:'页面同时出现实体技能数、精选数和验证数等不同声明；本研究未复现其中的验证结果。'}
  ];
  $('#web-list').innerHTML = pages.map((p,i)=>`<button type="button" data-web="${i}" aria-pressed="${i===0}"><strong>${escape(p.name)}</strong><small>${p.file}</small></button>`).join('');
  function chooseWeb(index) {
    const p=pages[index];
    $$('[data-web]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.web)===index)));
    $('#web-detail').innerHTML=`<span class="mini-tag">${escape(p.type)}</span><h2>${escape(p.name)}</h2><p class="intro">${escape(p.intro)}</p><dl><dt>这里展示什么</dt><dd>${escape(p.content)}</dd><dt>它的作用</dt><dd>${escape(p.role)}</dd></dl><div class="limit">${escape(p.boundary)}</div>${external(source('public/'+p.file),'查看固定版本页面源码 ↗')}`;
  }
  $$('[data-web]').forEach(b=>b.addEventListener('click',()=>chooseWeb(Number(b.dataset.web))));
  chooseWeb(0);
  const sites=[['AI123','AI 工具导航','ai123'],['Skill','技能商店','skill'],['Solar','光伏储能地图','solar'],['Top','热榜聚合','top'],['MP','文章分发','mp'],['Stock','股票辅助决策','stock'],['PDF','在线标注工具','pdf'],['Excalidraw','手绘白板','excalidraw'],['StockBot','Groq 驱动工具','stockbot'],['AlphaQubit','量子纠错主题','lingxi'],['Game','像素方块世界','game'],['租房','租户管理','zf'],['维权','劳动维权知识库','zc']];
  $('#external-sites').innerHTML=sites.map(([name,desc,host])=>`<a href="https://${host}.miyucaicai.cn" target="_blank" rel="noreferrer"><span><strong>${name}</strong><small>${desc}</small></span><b aria-hidden="true">↗</b></a>`).join('');
  function renderCapabilities(){
    const query=$('#cap-search').value.trim().toLowerCase();
    const rows=data.categories.filter(c=>[c.title,c.output,c.boundary,...c.skills].join(' ').toLowerCase().includes(query));
    $('#cap-count').textContent=`${rows.length} / ${data.categories.length} 类场景`;
    $('#cap-grid').innerHTML=rows.map(c=>`<article class="cap-card"><span>SCENARIO ${String(data.categories.indexOf(c)+1).padStart(2,'0')}</span><h2>${escape(c.title)}</h2><p>${format(c.output)}</p><div class="names">${c.skills.map(name=>{const entry=data.skills.find(s=>s.name===name);return entry?external(entry.url,name):`<span>${escape(name)}</span>`;}).join('')}</div><p class="boundary">使用条件 · ${format(c.boundary)}</p></article>`).join('') || '<p class="empty">未找到匹配场景。可以尝试“视频”“文档”或具体技能名称。</p>';
  }
  $('#cap-search').addEventListener('input',renderCapabilities);renderCapabilities();
  function renderInventory(){
    const query=$('#skill-search').value.trim().toLowerCase(),filter=$('#skill-filter').value;
    const rows=data.skills.filter(s=>{
      const local=s.path.startsWith('skills/'),template=s.path.startsWith('skills/_template/');
      const inScope=filter==='all'||(filter==='local'&&local&&!template)||(filter==='other'&&!local)||(filter==='template'&&template);
      return inScope&&(s.name+' '+s.path).toLowerCase().includes(query);
    });
    $('#skill-count').textContent=`显示 ${rows.length} / 84 份文件 · 名称重复项按路径保留`;
    $('#skill-rows').innerHTML=rows.map(s=>`<tr><td>${escape(s.name)}</td><td><span class="path">${escape(s.path)}</span></td><td>${s.package_file_count}${s.package_file_count===1?'<span class="file-only">仅技能说明</span>':''}</td><td>${external(s.url,'源码 ↗')}</td></tr>`).join('') || '<tr><td colspan="4">没有找到匹配文件。请修改关键词或范围。</td></tr>';
  }
  $('#skill-search').addEventListener('input',renderInventory);$('#skill-filter').addEventListener('change',renderInventory);renderInventory();
  const scenarios={
    ppt:{title:'把一份研究，整理成可编辑的 PPT',intro:'目标是可打开、可编辑、内容准确的演示文件。',steps:[['明确产物','先准备研究结论、来源、听众和页数，避免把没有验证的能力写成结果。'],['挑选缺失环节','参考 data-storytelling 的叙事方法和 pptx-generator 的结构化输入；核对构建脚本与依赖。'],['用一份小样验收','先做少量页面，打开文件检查文字、图表与排版，再扩展到完整演示。']],outcome:'借用“表达与交付的方法”，实际生成和检查由宿主模型、脚本及演示工具完成。'},
    graph:{title:'解释一个陌生代码库的架构',intro:'目标是能回查源码的结构说明，而不只是看起来完整的一张图。',steps:[['先形成事实依据','确定研究版本，提取模块与调用关系，保留路径、节点和来源。'],['检查图谱与渲染工具','Ontoly 需要外部 CLI/MCP；本快照的 Archify 只有技能说明，需另找完整渲染工具。'],['让图与代码相互核对','检查箭头语义和缺失关系，区分自动提取与人工判断，并按实际证据描述结论。']],outcome:'最值得借鉴的是证据优先的查询方式和制图验收要求，工具引擎需要单独准备。'},
    publish:{title:'把研究资料整理成一篇可发布文章',intro:'目标先是可核对的稿件，再决定要发布到哪个平台。',steps:[['汇集与核对资料','记录来源、版本和实测范围，用写作技能组织提纲与论据。'],['组合需要的步骤','按需选用网页转 Markdown、格式化与配图，不必加载所有发布技能。'],['检查稿件和平台状态','核对事实、图片和排版；实际发布依赖账号与工具，须确认真实发布结果。']],outcome:'采集、写作、配图、发布是分开的环节。生成稿件或展示发布说明，都不等于已经发布。'}
  };
  function chooseScenario(id){const s=scenarios[id];$$('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===id)));$('#scenario-detail').innerHTML=`<span>使用思路 · 非运行演示</span><h2>${s.title}</h2><p class="muted">${s.intro}</p><ol class="journey">${s.steps.map(([title,body],i)=>`<li><b>STEP 0${i+1}</b><h3>${title}</h3><p>${body}</p></li>`).join('')}</ol><p class="outcome">${s.outcome}</p>`;}
  $$('[data-scenario]').forEach(b=>b.addEventListener('click',()=>chooseScenario(b.dataset.scenario)));chooseScenario('ppt');
  $$('[data-src]').forEach(a=>{a.href=source(a.dataset.src);a.target='_blank';a.rel='noreferrer';});
  $('#commit-link').href=`https://github.com/anbeime/skill/commit/${data.commit}`;$('#commit-link').textContent=data.commit;
  let zoom=100;
  const setZoom=value=>{zoom=Math.max(100,Math.min(300,value));$('#understanding-map').style.width=`${zoom}%`;$('#map-scale').textContent=`${zoom}%`;$('#map-minus').disabled=zoom===100;$('#map-plus').disabled=zoom===300;};
  $('#map-minus').addEventListener('click',()=>setZoom(zoom-25));$('#map-plus').addEventListener('click',()=>setZoom(zoom+25));$('#map-reset').addEventListener('click',()=>{setZoom(100);$('.map-viewport').scrollTo(0,0);});setZoom(100);
  const routes=['overview','map','websites','capabilities','inventory','workflow','evidence'];
  function route(focus=false){
    let id=location.hash.slice(1)||'overview';
    if(id==='main'){$('#main').focus();return;}
    if(!routes.includes(id)){id='overview';history.replaceState(null,'','#overview');}
    $$('[data-view]').forEach(view=>view.hidden=view.dataset.view!==id);
    $$('[data-route]').forEach(a=>{if(a.dataset.route===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title=`006 · ${$(`#view-${id} h1`).textContent.replace(/\s+/g,' ')} — anbeime/skill`;
    if(focus){$('#main').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  }
  window.addEventListener('hashchange',()=>route(true));route();
})();
