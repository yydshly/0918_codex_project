(() => {
  'use strict';
  const {routes, chapters} = window.GUIDE_DATA;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const storageKey = 'selfteaching-guide-011-v1';
  const allowedChecks = $$('[data-check]').map(input => input.dataset.check);
  let state = {read: [], checks: [], note: '', route: 'beginner'};
  let storageAvailable = true;
  let storageRecovered = false;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object') {
      state.read = Array.isArray(saved.read) ? [...new Set(saved.read.filter(id => Number.isInteger(id) && id >= 1 && id <= 46))] : [];
      state.checks = Array.isArray(saved.checks) ? [...new Set(saved.checks.filter(id => allowedChecks.includes(id)))] : [];
      state.note = typeof saved.note === 'string' ? saved.note : '';
      state.route = Object.hasOwn(routes, saved.route) ? saved.route : 'beginner';
    }
  } catch (error) {
    if (error instanceof SyntaxError) storageRecovered = true;
    else storageAvailable = false;
  }
  const routeFromURL = () => {
    const value = new URL(location.href).searchParams.get('route');
    return Object.hasOwn(routes, value) ? value : null;
  };
  state.route = routeFromURL() || state.route;
  const status = message => { $('#save-status').textContent = message; };
  const save = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      storageAvailable = true;
      status('已保存在当前浏览器，可导出备份。');
    } catch {
      storageAvailable = false;
      status('浏览器无法保存：本次操作仍有效，请导出记录；刷新后可能丢失。');
    }
  };
  const routeIDs = () => routes[state.route].chapters === 'all'
    ? chapters.map(chapter => chapter.id) : routes[state.route].chapters;

  function filterChapters() {
    const words = $('#search').value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const category = $('#category').value;
    const ids = routeIDs();
    let visible = 0;
    for (const chapter of chapters) {
      const element = $('#chapter-' + chapter.id);
      const text = [chapter.title, chapter.summary, chapter.task, chapter.label, chapter.part].join(' ').toLocaleLowerCase();
      const show = words.every(word => text.includes(word))
        && (category === 'all' || category === chapter.category)
        && (!$('#only-route').checked || ids.includes(chapter.id))
        && (!$('#only-unread').checked || !state.read.includes(chapter.id));
      element.hidden = !show;
      if (show) visible += 1;
    }
    $('#result-count').textContent = '显示 ' + visible + ' / 46 个章节';
    $('#empty-state').hidden = visible !== 0;
  }
  function clearFilters() {
    $('#search').value = '';
    $('#category').value = 'all';
    $('#only-route').checked = false;
    $('#only-unread').checked = false;
    filterChapters();
  }
  function renderRoute() {
    const route = routes[state.route];
    $('#route-title').textContent = route.name;
    $('#route-description').textContent = route.intro;
    $$('[data-route]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.route === state.route)));
    const steps = $('#route-steps');
    steps.replaceChildren();
    route.steps.forEach(([stage, title, description, result, ids], index) => {
      const item = document.createElement('li');
      const number = document.createElement('span');
      number.className = 'step-number';
      number.textContent = '0' + (index + 1);
      const stageLabel = document.createElement('small');
      stageLabel.textContent = stage;
      number.append(stageLabel);
      const copy = document.createElement('div');
      copy.className = 'step-copy';
      const heading = document.createElement('h4');
      heading.textContent = title;
      const desc = document.createElement('p');
      desc.textContent = description;
      const outcome = document.createElement('div');
      outcome.className = 'step-result';
      outcome.textContent = '达成标志 / ' + result;
      const links = document.createElement('div');
      links.className = 'step-links';
      ids.forEach(id => {
        const link = document.createElement('a');
        link.href = '#chapter-' + id;
        link.textContent = String(id).padStart(2, '0') + ' ' + chapters[id - 1].title;
        links.append(link);
      });
      copy.append(heading, desc, outcome, links);
      item.append(number, copy);
      steps.append(item);
    });
    const ids = routeIDs();
    $$('.chapter').forEach(chapter => {
      chapter.querySelector('.route-mark').hidden = !ids.includes(Number(chapter.dataset.id));
    });
    filterChapters();
  }
  function renderProgress() {
    $$('[data-complete]').forEach(input => {
      input.checked = state.read.includes(Number(input.dataset.complete));
      input.closest('.chapter').classList.toggle('is-read', input.checked);
    });
    $$('[data-check]').forEach(input => { input.checked = state.checks.includes(input.dataset.check); });
    $('#read-count').textContent = state.read.length;
    $('#check-progress').value = state.checks.length;
    $('#check-summary').textContent = '已确认 ' + state.checks.length + ' / 8 项 · 请保留对应成果证据';
    const next = $$('[data-check]').find(input => !input.checked);
    $('#next-step').textContent = next
      ? '下一步建议：从第一项未确认的能力开始，做一个最小练习。'
      : '你已确认全部项目。换一个陌生任务，再检验这些方法能否迁移。';
    filterChapters();
  }
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    if (target.classList.contains('chapter')) {
      if (target.hidden) clearFilters();
      target.querySelector('details').open = true;
    } else if (target.tagName === 'DETAILS') target.open = true;
    if (target.classList.contains('chapter') || target.tagName === 'DETAILS') {
      requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
    }
  }
  $$('.enhanced').forEach(element => { element.hidden = false; });
  $$('[data-check]').forEach(input => { input.disabled = false; });
  $('#learning-note').disabled = false;
  $('#learning-note').value = state.note;
  $$('[data-route]').forEach(button => button.addEventListener('click', () => {
    state.route = button.dataset.route;
    const url = new URL(location.href);
    url.searchParams.set('route', state.route);
    try { history.pushState(null, '', url); } catch { /* Direct-file browser restrictions do not prevent route selection. */ }
    renderRoute();
    save();
  }));
  $('#route-filter').addEventListener('click', () => {
    clearFilters();
    $('#only-route').checked = true;
    filterChapters();
  });
  $('#search').addEventListener('input', filterChapters);
  ['category', 'only-route', 'only-unread'].forEach(id => $('#' + id).addEventListener('change', filterChapters));
  $('#clear-filters').addEventListener('click', clearFilters);
  $('#empty-clear').addEventListener('click', clearFilters);
  $$('[data-complete]').forEach(input => input.addEventListener('change', () => {
    const id = Number(input.dataset.complete);
    state.read = input.checked ? [...new Set([...state.read, id])] : state.read.filter(value => value !== id);
    renderProgress();
    save();
  }));
  $$('[data-check]').forEach(input => input.addEventListener('change', () => {
    const id = input.dataset.check;
    state.checks = input.checked ? [...new Set([...state.checks, id])] : state.checks.filter(value => value !== id);
    renderProgress();
    save();
  }));
  $('#learning-note').addEventListener('input', () => {
    state.note = $('#learning-note').value;
    save();
  });
  $('#export-notes').addEventListener('click', () => {
    const readLines = chapters.map(c => '- [' + (state.read.includes(c.id) ? 'x' : ' ') + '] ' + String(c.id).padStart(2, '0') + ' ' + c.title);
    const checkLines = $$('[data-check]').map(input => '- [' + (input.checked ? 'x' : ' ') + '] ' + input.nextElementSibling.textContent.trim());
    const text = [
      '# 《自学是门手艺》学习记录',
      '导出时间：' + new Date().toISOString(),
      '原著：李笑来；上游：https://github.com/selfteaching/the-craft-of-selfteaching',
      '研究版本：987a8e8a9ce205b63886510e145437d14d8a13a4',
      '当前建议路线：' + routes[state.route].name,
      '阅读标记与自查均由本人填写，不代表能力认证。',
      '## 我的记录', state.note || '尚未填写',
      '## 成果自查', ...checkLines,
      '## 阅读进度', ...readLines
    ].join('\n\n');
    const url = URL.createObjectURL(new Blob([text], {type:'text/markdown;charset=utf-8'}));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'selfteaching-notes-' + new Date().toISOString().slice(0,10) + '.md';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status(storageAvailable ? '学习记录已生成下载；浏览器中的记录仍保留。' : '学习记录已生成下载。浏览器无法自动保存，请保留下载文件。');
  });
  $('#reset-progress').addEventListener('click', () => {
    if (!confirm('清空本页的阅读标记、八项自查和学习笔记？建议先导出备份。当前路线会保留。')) return;
    state.read = [];
    state.checks = [];
    state.note = '';
    $('#learning-note').value = '';
    renderProgress();
    save();
  });
  addEventListener('popstate', () => {
    state.route = routeFromURL() || 'beginner';
    renderRoute();
    revealHash();
  });
  addEventListener('hashchange', revealHash);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash) revealHash();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      const id = visible[0].target.id;
      $$('.sidebar nav a').forEach(link => {
        const active = link.hash === '#' + id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin:'-10% 0px -70% 0px'});
    $$('section.section').forEach(section => observer.observe(section));
  }
  renderRoute();
  renderProgress();
  revealHash();
  status(!storageAvailable ? '浏览器无法保存：本次操作仍有效，请导出记录。'
    : storageRecovered ? '旧记录格式无法读取，已从空记录开始；新操作可以保存。'
    : '阅读标记、自查和笔记会自动保存在当前浏览器。');
})();
