const cards = [...document.querySelectorAll('.resource')];
const sections = [...document.querySelectorAll('[data-section]')];
const navLinks = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#search');
const kind = document.querySelector('#kind');
const status = document.querySelector('#result-status');
let category = 'all';
let group = 'all';
const typeCards = [...document.querySelectorAll('[data-group]')];
const groups = Object.fromEntries(typeCards.map(a => [a.dataset.group, {name:a.dataset.name,kinds:JSON.parse(a.dataset.kinds)}]));
const categoryNames = Object.fromEntries(navLinks.map(a => [a.dataset.filter, a.firstElementChild.textContent]));

function render() {
  const words = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let count = 0;
  cards.forEach(card => {
    const visible = (category === 'all' || card.dataset.category === category)
      && (kind.value === 'all' || card.dataset.kind === kind.value)
      && (group === 'all' || groups[group].kinds.includes(card.dataset.kind))
      && words.every(word => card.dataset.search.includes(word));
    card.hidden = !visible;
    if (visible) count++;
  });
  sections.forEach(section => {
    const visible = [...section.querySelectorAll('.resource')].filter(card => !card.hidden).length;
    section.hidden = visible === 0;
    section.querySelector('.section-count').textContent = `${visible} 条`;
  });
  navLinks.forEach(link => {
    if (link.dataset.filter === category) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  typeCards.forEach(a => { if(a.dataset.group === group) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); });
  status.textContent = `${group === 'all' ? categoryNames[category] : groups[group].name}${kind.value !== 'all' ? ' · ' + kind.value : ''} · ${count} / 85 条${words.length ? ' · 搜索结果' : ''}`;
  document.querySelector('#empty').hidden = count !== 0;
  document.querySelector('#reset').hidden = category === 'all' && group === 'all' && kind.value === 'all' && !search.value;
  document.querySelector('#clear-search').hidden = !search.value;
}

function saveFilter() {
  const params = new URLSearchParams();
  if (category !== 'all') params.set('category', category);
  if (group !== 'all') params.set('group', group);
  if (search.value) params.set('q', search.value);
  if (kind.value !== 'all') params.set('type', kind.value);
  history.replaceState(null, '', '#' + (params.toString() || 'all'));
}

function reset() {
  category = 'all'; group = 'all'; search.value = ''; kind.value = 'all';
  saveFilter(); render();
}

function readHash(scroll = false) {
  const hash = location.hash.slice(1);
  if (hash === 'overview') {
    document.querySelector('#overview').open = true;
    if (scroll) document.querySelector('#overview').scrollIntoView();
    return;
  }
  if (['about', 'library', 'map', 'types'].includes(hash)) return;
  const params = new URLSearchParams(hash);
  category = Object.hasOwn(categoryNames, params.get('category')) ? params.get('category') : 'all';
  group = Object.hasOwn(groups, params.get('group')) ? params.get('group') : 'all';
  search.value = params.get('q') || '';
  const type = params.get('type');
  kind.value = [...kind.options].some(o => o.value === type) ? type : 'all';
  render();
  if (scroll) document.querySelector('#library').scrollIntoView();
}

search.addEventListener('input', () => { render(); saveFilter(); });
kind.addEventListener('change', () => { group = 'all'; render(); saveFilter(); });
document.querySelector('#clear-search').addEventListener('click', () => {
  search.value = ''; render(); saveFilter(); search.focus();
});
document.querySelector('#reset').addEventListener('click', reset);
document.querySelector('#empty-reset').addEventListener('click', () => { reset(); search.focus(); });
window.addEventListener('hashchange', () => readHash(true));
// Handle selecting the current category too, after the user has searched within it.
document.querySelectorAll('a[href^="#category="], a[href^="#group="], a[href="#all"]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    history.pushState(null, '', link.getAttribute('href'));
    readHash(true);
  });
});
document.querySelector('.topbar a[href="#overview"]').addEventListener('click', () => { document.querySelector('#overview').open = true; });
readHash();
