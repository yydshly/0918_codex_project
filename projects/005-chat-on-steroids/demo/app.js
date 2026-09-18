/* Static teaching exhibit; no account connection, upstream execution or persistence. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const link = path => COS.source + path;
  const pages = ['overview','map','capabilities','workflow','value','evidence'];
  function route() {
    const raw = location.hash.slice(1);
    const page = pages.includes(raw) ? raw : 'overview';
    $$('[data-view]').forEach(node => { node.hidden = node.dataset.view !== page; });
    $$('[data-page]').forEach(node => {
      if (node.dataset.page === page) node.setAttribute('aria-current','page');
      else node.removeAttribute('aria-current');
    });
    document.title = `005 · ${$(`[data-page="${page}"]`).textContent.trim()} — Chat On Steroids`;
  }
  window.addEventListener('hashchange', route);
  let mapScale = 100;
  function zoomMap(value) {
    mapScale = Math.min(300, Math.max(100, value));
    $('#map-image').style.width = `${mapScale}%`;
    $('#map-scale').textContent = `${mapScale}%`;
    $('#map-minus').disabled = mapScale === 100;
    $('#map-plus').disabled = mapScale === 300;
    if(mapScale === 100) $('#map-viewport').scrollLeft = 0;
  }
  $('#map-minus').addEventListener('click',()=>zoomMap(mapScale-25));
  $('#map-plus').addEventListener('click',()=>zoomMap(mapScale+25));
  $('#map-fit').addEventListener('click',()=>zoomMap(100));
  zoomMap(100);
  function renderDrive(id) {
    const drive = COS.drives[id];
    $$('[data-drive]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.drive === id)));
    $('#drive-panel').innerHTML = `<div class="drive-caption"><span class="letter">${drive.letter}</span><div><h3>${esc(drive.title)}</h3><p>${esc(drive.subtitle)}</p></div></div><div class="flow">${drive.nodes.map(node=>`<div class="node"><span>${esc(node[0])}</span><strong>${esc(node[1])}</strong><small>${esc(node[2])}</small></div>`).join('<span class="arrow" aria-hidden="true">→</span>')}</div><div class="drive-result"><span>这意味着</span><p>${esc(drive.result)}</p></div><a class="source-link" href="${link(drive.path)}">固定版本实现依据 ↗</a>`;
  }
  $$('[data-drive]').forEach(button=>button.addEventListener('click',()=>renderDrive(button.dataset.drive)));
  $('#cap-list').innerHTML = COS.capabilities.map((cap,index)=>`<button type="button" data-cap="${cap.id}" aria-pressed="false"><span>${String(index+1).padStart(2,'0')}</span>${esc(cap.name)}</button>`).join('');
  function renderCap(id) {
    const cap = COS.capabilities.find(item=>item.id === id);
    $$('[data-cap]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.cap === id)));
    $('#cap-detail').innerHTML = `<span class="tag accent">${esc(cap.group)}</span><h2>${esc(cap.headline)}</h2><p>${esc(cap.description)}</p><dl><dt>如何实现</dt><dd>${esc(cap.mechanism)}</dd><dt>可以用在哪里</dt><dd>${esc(cap.example)}</dd><dt>使用前提</dt><dd>${esc(cap.needs)}</dd></dl><p class="limit">${esc(cap.limit)}</p><a class="source-link" href="${link(cap.path)}">查看对应源码 / 文档 ↗</a><p class="boundary">证据级别：固定源码分析 · 上游端到端未实测</p>`;
  }
  $$('[data-cap]').forEach(button=>button.addEventListener('click',()=>renderCap(button.dataset.cap)));
  let step = 0;
  function renderStep() {
    const blocked = $('#outcome').value === 'blocked';
    const sequence = blocked ? [COS.steps[0],COS.blocked] : COS.steps;
    step = Math.min(step,sequence.length-1);
    const current = sequence[step];
    $('#step-counter').textContent = `${String(step+1).padStart(2,'0')} / ${String(sequence.length).padStart(2,'0')}`;
    $('#step-list').innerHTML = sequence.map((item,index)=>`<li class="${index===step?'active':index<step?'done':''}" ${index===step?'aria-current="step"':''}><span>${index<step?'✓':index+1}</span>${esc(item.name)}</li>`).join('');
    $('#step-detail').innerHTML = `<span class="actor">${esc(current.actor)}</span><h2>${esc(current.name)}</h2><p>${esc(current.description)}</p><div class="sample-output ${blocked&&step===1?'blocked':''}"><span>人工编写的示例说明 · 非执行日志</span><p>${esc(current.output)}</p></div>`;
    $('#prev').disabled = step === 0;
    $('#next').disabled = step === sequence.length-1;
  }
  $('#next').addEventListener('click',()=>{step++;renderStep();});
  $('#prev').addEventListener('click',()=>{step--;renderStep();});
  $('#reset').addEventListener('click',()=>{step=0;renderStep();});
  $('#outcome').addEventListener('change',()=>{step=0;renderStep();});
  $('#source-list').innerHTML = COS.sources.map(([name,description,path])=>`<article class="source-row"><strong>${esc(name)}</strong><p>${esc(description)}</p><a href="${link(path)}">固定源码 ↗</a></article>`).join('');
  renderDrive('chat');
  renderCap('files');
  renderStep();
  route();
})();
