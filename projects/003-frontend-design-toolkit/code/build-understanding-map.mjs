// Original vector research summary; exact text stays editable in SVG.
import {writeFile} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const W=1800,H=2390;
const C={ink:'#192d49',muted:'#53677f',blue:'#315ecd',line:'#d8e3ed',bg:'#f4f7fb',teal:'#dff2ec'};
const out=[];
let count=0;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function rect(x,y,w,h,fill='#fff',stroke=C.line,r=14){out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`);}
function text(x,y,s,size=24,fill=C.ink,weight=400,anchor='start',bound=null){out.push(`<text id="t${++count}" x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}"${bound?` data-bound="${bound.join(',')}"`:''}>${esc(s)}</text>`);}
function lines(x,y,ss,size=22,fill=C.muted,lh=35,bound=null){ss.forEach((s,i)=>text(x,y+i*lh,s,size,fill,400,'start',bound));}
function section(y,no,title,aside=''){rect(70,y-30,42,38,C.blue,C.blue,7);text(91,y-3,no,20,'#fff',600,'middle');text(128,y,title,30,C.ink,700);if(aside)text(1730,y,aside,20,C.muted,400,'end');}
out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc"><title id="title">指导 Claude Code 做好前端设计与实现</title><desc id="desc">Frontend Design Toolkit 是说明指南与工具索引。图中整理九个工作方面、执行原理、对我们前端工作的意义和证据边界。</desc><style>text{font-family:"Microsoft YaHei","Noto Sans CJK SC","Segoe UI",sans-serif}</style>`);
rect(0,0,W,H,C.bg,C.bg,0);
rect(0,0,W,258,C.ink,C.ink,0);
text(70,56,'开源研究 / 003',22,'#bed0e6',600);
text(1730,56,'Claude Code Frontend Design Toolkit',24,'#bed0e6',400,'end');
text(70,136,'指导 Claude Code 做好前端设计与实现',53,'#fff',700);
text(70,194,'一份说明指南与工具索引：告诉你怎样提设计要求、选工具、写页面、检查并改进结果。',27,'#d5e2f1');
text(70,233,'仓库形态：研究版本只有 README.md；具体能力由 Claude Code 与独立工具执行。',22,'#a9c1de');

rect(70,286,1660,102);
[['改善设计','让视觉选择贴合产品与内容'],['辅助实现','让规则、文档和组件进入工作过程'],['检查优化','让真实页面的反馈推动修正']].forEach(([a,b],i)=>{const x=99+i*553;text(x,327,a,26,C.blue,700);text(x,363,b,22,C.muted);});

section(444,'01','指南覆盖哪些方面？','九个工作方面 + 按场景组合工具的建议');
const cards=[
 ['视觉风格与排版','先形成适合产品的视觉方向','字体、色彩、构图与内容层次','参考：Frontend Design / Taste Skill'],
 ['全站主题与设计规范','让多个页面使用同一套设计语言','共享颜色、间距、字号与明暗主题','参考：CLAUDE.md / Design Tokens'],
 ['动画与交互效果','让运动服务于反馈和状态变化','滚动、过渡、手势与动画性能','参考：GSAP / Motion 相关 Skills'],
 ['用户体验与可访问性','围绕用户任务检查页面是否好用','流程、响应式、键盘与状态反馈','参考：UX / Accessibility Skills'],
 ['设计稿与代码衔接','为页面实现补充设计结构和规范','读取设计稿，关联现有组件','参考：Figma MCP / Code Connect'],
 ['浏览器测试与诊断','运行页面，观察交互与视觉结果','操作、截图、错误、网络和性能','参考：Playwright / DevTools'],
 ['文档检索与上下文','为具体问题补充准确参考资料','库版本、API 示例与文档内容','参考：Context7 / 文档采集工具'],
 ['框架与组件实现','补充不同技术栈的实现方法','React、Tailwind、图表与 3D','参考：框架 Skills / D3 / Three.js'],
 ['预览与部署交付','指导选择发布与预览工具','构建、预览地址与部署检查','参考：Vercel MCP / PinMe']
];
cards.forEach(([title,a,b,ref],i)=>{const x=70+(i%3)*560,y=480+Math.floor(i/3)*196;const bound=[x+20,y+12,x+520,y+168];rect(x,y,540,176);text(x+24,y+42,title,27,C.ink,700,'start',bound);lines(x+24,y+82,[a,b],22,C.muted,34,bound);text(x+24,y+150,ref,18,C.blue,400,'start',bound);});
text(70,1099,'怎么选：先看自己的问题，再查对应章节；安装和权限以各工具的官方资料为准。',25,C.blue,600);
text(70,1134,'九项按原目录展开；展厅八类能力将“文档”与“框架知识”合并。上述工具是参考线索，未逐项实测。',21,C.muted);

section(1204,'02','为什么能帮助前端工作？','核心：补充要求、参考资料、操作能力与反馈');
const flow=[
 ['人明确任务','受众、内容、风格与验收条件','决定“什么结果才算合适”'],
 ['指南帮助组织输入','Skills、项目规则与外部资料','让设计和实现有具体依据'],
 ['Claude Code 执行','模型规划、编写和修改代码','外部工具负责查询与操作'],
 ['检查并继续优化','浏览器观察 + 人工复核','把实际问题反馈给模型']
];
flow.forEach(([a,b,c],i)=>{const x=70+i*425;rect(x,1240,385,145,i===1?'#eaf0ff':'#fff');const bound=[x+18,1250,x+367,1375];text(x+23,1281,a,27,i===1?C.blue:C.ink,700,'start',bound);lines(x+23,1324,[b,c],21,C.muted,32,bound);if(i<3)out.push(`<path d="M${x+393} 1314h23m-8-7 8 7-8 7" stroke="#8499b5" stroke-width="2.5" fill="none"/>`);});
out.push('<path d="M1537 1401v20H1107v-20" stroke="#7893b5" stroke-width="2" fill="none"/>');
text(1318,1456,'发现问题 → 修改 → 再检查',21,C.blue,600,'middle');
text(70,1435,'Skills 提供方法；MCP 连接工具；',23,C.ink,600);
text(70,1472,'设计变量将一致性落实到代码。',23,C.muted);

section(1541,'03','对我们的意义：找到前端辅助工具，按实际缺口采用');
rect(70,1578,810,236,'#eaf0ff','#c6d6f6');
text(99,1623,'节省找方法、找工具的时间',29,C.blue,700);
lines(99,1668,[
 '设计方法不足 → 找设计 Skill，提供可重复参考的指导。',
 '框架资料不足 → 找文档工具，取得相关用法和示例。',
 '需要读取设计稿 → 找 Figma 接入，补充设计结构资料。',
 '缺少页面检查 → 找浏览器工具，取得实际操作反馈。'
],22,C.ink,38,[94,1590,857,1803]);
rect(900,1578,830,236,'#fff');
text(929,1623,'已有能力继续用，缺少时再补',29,C.ink,700);
lines(929,1668,[
 '我们已有网页实现与浏览器检查，不必重复配置同类工具。',
 '目录提供候选项；具体支持来自独立 Skill 或工具。',
 '仅阅读或克隆 README，不会自动接入这些能力。',
 '核对官方说明，接入小任务，用真实结果判断是否保留。'
],22,C.muted,38,[924,1590,1707,1803]);

rect(70,1844,1660,98,C.teal,'#c0e0d4');
text(99,1883,'用于本仓库的直接做法',26,'#235e51',700);
text(99,1920,'确认现有能力的缺口 → 在目录中找候选项 → 核对官方接入条件 → 实际使用并检查是否有帮助。',24,'#315b52');

section(2009,'04','理解它时，保留这些边界');
rect(70,2042,1660,174,C.ink,C.ink);
lines(99,2086,[
 '指南不会重新训练模型，也不会自动保证页面更美观；效果取决于需求、模型、工具配置与迭代。',
 '工具目录没有内置完整运行引擎；第三方工具的能力、账户权限和安装方式需要分别核对。',
 '本研究核查了文档并验证本地展厅；未实测完整工具组合，也未证明模型生成质量提升。'
],24,'#dae6f4',48,[94,2050,1707,2204]);
text(70,2274,'一句话记住：它教我们怎样指导 Claude Code 做前端、优化前端，并为这个过程选择合适的工具。',27,C.ink,700);
out.push('<a href="https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit/blob/2a6d0958e6966e0003896f94ce5003466e89e91d/README.md">');
text(70,2327,'来源：wilwaldon / Claude-Code-Frontend-Design-Toolkit · 固定版本 2a6d095',20,C.muted);out.push('</a>');
text(70,2361,'上游 README 声明 MIT，独立许可文本缺失。参考工具详情与核查证据见本项目研究文档。',19,C.muted);
text(1730,2361,'原创概念总览 · 非产品截图 · 2026-09-18',19,C.muted,400,'end');
out.push('</svg>');
await writeFile(resolve(root,'assets/understanding-map.svg'),out.join('\n'),'utf8');
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'msedge'})});
try{
 const page=await browser.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
 await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:${W}px;height:${H}px}svg{display:block}</style></head><body>${out.join('\n')}</body></html>`);
 await page.evaluate(()=>document.fonts.ready);
 const failures=await page.evaluate(({W,H})=>[...document.querySelectorAll('text')].flatMap(el=>{const b=el.getBBox();const r=el.dataset.bound?el.dataset.bound.split(',').map(Number):[0,0,W,H];return b.x<r[0]||b.y<r[1]||b.x+b.width>r[2]||b.y+b.height>r[3]?[{text:el.textContent,bounds:r,actual:{x:b.x,y:b.y,w:b.width,h:b.height}}]:[];}),{W,H});
 if(failures.length)throw new Error(JSON.stringify(failures,null,2));
 await page.screenshot({path:resolve(root,'assets/understanding-map.png'),fullPage:true});
 await writeFile(resolve(root,'notes/evidence/understanding-map.json'),JSON.stringify({verifiedAt:new Date().toISOString(),type:'原创概念总览，非上游产品截图',upstreamCommit:'2a6d0958e6966e0003896f94ce5003466e89e91d',svgDimensions:[W,H],pngDimensions:[W*2,H*2],textElements:count,textBoundsPassed:true,renderer:`Edge ${await browser.version()}`,sections:['说明指南定位','九个方面与选型','执行原理','对我们的意义','能力与验证边界']},null,2)+'\n');
 console.log(`Created SVG + ${W*2} × ${H*2} PNG; checked ${count} text elements.`);
}finally{await browser.close();}
