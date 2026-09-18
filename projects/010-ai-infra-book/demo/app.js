const routes = {
 app: {label:'模型应用 / 推理服务', title:'先理解延迟与吞吐，再看部署取舍。', desc:'读完基础章节后，重点看推理优化与分布式推理，再了解任务环境和端边云部署。遇到容量、算子或通信问题时，回到第 4—7 章。',steps:['01—03 基础','08—09 推理','11—12 部署'],chapters:[1,2,3,8,9,11,12],foot:'阅读产出：用资源、状态与请求负载解释服务瓶颈。'},
 system: {label:'系统 / 网络',title:'把计算效率与通信代价放在一起看。',desc:'从基础章节建立负载认识，重点研究算子与运行时、超节点和数据中心网络，再看这些机制怎样影响分布式推理与训练。',steps:['01—03 基础','05—07 系统','09—10 分布式'],chapters:[1,2,3,5,6,7,9,10],foot:'阅读产出：分析数据搬移、同步和网络拥塞造成的等待。'},
 hardware: {label:'芯片 / 体系结构',title:'从硬件指标，推导实际服务能力。',desc:'从模型和负载出发，重点阅读第 4—7 章。结合后续推理与训练算例，检查容量、带宽、算力和互联约束如何影响任务。',steps:['01—03 基础','04—07 硬件与互联','后续任务算例'],chapters:[1,2,3,4,5,6,7],foot:'阅读产出：理解峰值指标与任务表现之间的条件和差距。'},
 all: {label:'系统学习 / 全书',title:'沿着模型、硬件、系统的顺序建立全景。',desc:'按十二章顺序阅读，每遇到资源算例先自己估算，再核对工具输出与实验条件。遇到陌生概念时，补充 Python、线性代数与计算机系统基础。',steps:['01—03 模型与负载','04—07 硬件与系统','08—12 优化与部署'],chapters:[1,2,3,4,5,6,7,8,9,10,11,12],foot:'阅读产出：建立从任务约束到系统设计的完整分析框架。'}
};
const buttons = [...document.querySelectorAll('[data-route]')];
function renderRoute(key){
 const route=routes[key] || routes.app;
 for(const id of ['label','title','desc','foot']) document.getElementById(`route-${id}`).textContent=route[id];
 const steps=document.getElementById('route-steps'); steps.replaceChildren();
 route.steps.forEach((text,index)=>{if(index){const arrow=document.createElement('b');arrow.textContent='→';steps.append(arrow)}const el=document.createElement('span');el.textContent=text;steps.append(el)});
 buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.route===(routes[key]?key:'app'))));
 document.querySelectorAll('.chapter').forEach(el=>el.classList.toggle('recommended',route.chapters.includes(Number(el.dataset.chapter))));
}
function restoreRoute(){renderRoute(new URL(location.href).searchParams.get('route')||'app')}
buttons.forEach(b=>b.addEventListener('click',()=>{const url=new URL(location.href);url.searchParams.set('route',b.dataset.route);url.hash='path';history.pushState(null,'',url);renderRoute(b.dataset.route)}));
window.addEventListener('popstate',restoreRoute);restoreRoute();
const copyButton=document.getElementById('copy-command');
copyButton.addEventListener('click',async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText(document.getElementById('command-code').textContent);status.textContent='已复制。请在你选择的工作目录中执行。';}catch{status.textContent='当前浏览器不允许自动复制，请选中上方命令手动复制。';}});
if('IntersectionObserver' in window){const navLinks=[...document.querySelectorAll('.sidebar nav a')];
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){navLinks.forEach(a=>{const current=a.hash===`#${entry.target.id}`;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}},{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('main>section').forEach(section=>observer.observe(section));}
