// Original explanatory diagram. Generates editable SVG + high-resolution PNG.
// Requires Playwright and Microsoft Edge; optional PLAYWRIGHT_MODULE / CHROME_PATH.
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1800, H = 2380;
const colors = {ink:'#14243b',muted:'#50627a',blue:'#315bea',line:'#d8e1ef',light:'#eef3ff',nav:'#132640',teal:'#226b61',amber:'#99601c'};
const out = [];
let textCount = 0;
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function rect(x,y,w,h,fill='#fff',stroke=colors.line,r=14) {out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`);}
function text(x,y,value,size=24,fill=colors.ink,weight=400,anchor='start',bound=null) {
  out.push(`<text id="text-${++textCount}" x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}"${bound ? ` data-bound="${bound.join(',')}"` : ''}>${escape(value)}</text>`);
}
function lines(x,y,values,size=23,fill=colors.muted,lineHeight=36,bound=null) {values.forEach((line,i)=>text(x,y+i*lineHeight,line,size,fill,400,'start',bound));}
function section(y,no,title,aside='') {
  rect(70,y-29,42,36,colors.blue,colors.blue,7);
  text(91,y-3,no,20,'white',650,'middle');
  text(128,y,title,30,colors.ink,700);
  if(aside)text(1730,y,aside,20,colors.muted,400,'end');
}
function arrow(x,y) {out.push(`<path d="M${x} ${y}h28m-9-8 9 8-9 8" fill="none" stroke="#879aba" stroke-width="2.5"/>`);}
out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc"><title id="title">Claude Code Best Practice：使用指南与配置示例集</title><desc id="desc">九类内容、实际工作关系、适用场景、对我们的意义及能力边界。原创研究概念图，非产品截图。</desc><style>text{font-family:"Microsoft YaHei","Noto Sans CJK SC","Segoe UI",sans-serif}</style>`);
rect(0,0,W,H,'#f5f7fc','#f5f7fc',0);
rect(0,0,W,245,colors.nav,colors.nav,0);
text(70,57,'开源研究 / 002',22,'#b9c9e7',600);
text(1730,57,'shanraisshan / claude-code-best-practice',22,'#b9c9e7',400,'end');
text(70,137,'Claude Code 使用指南 ＋ 配置示例集',53,'#fff',700);
text(70,195,'核心作用：教你怎么用，提供可以参考、挑选和改造的例子。',28,'#d4e1f6');

rect(70,273,1660,102,'#fff',colors.line,14);
const intro=[['学方法','从入门概念到进阶使用经验'],['借样板','参考规则、技能、代理与流程写法'],['挑工具','按需要复用少量脚本与工具配置']];
intro.forEach(([title,desc],i)=>{const x=99+i*553;text(x,313,title,26,colors.blue,700);text(x,350,desc,22,colors.muted);});

section(429,'01','内部主要包含什么','教程、配置与脚本：按需参考，无需整套复制');
const cards=[
  ['使用指南与经验','教程 / 资料','任务描述、规划、上下文与会话管理','理解常见用法，参考测试和审查经验','README · best-practice · tips · reports'],
  ['项目规则','配置示例','说明项目背景、代码约定与目录职责','减少每次重新交代同一套项目要求','CLAUDE.md · .claude/rules/'],
  ['Skills · 技能','配置示例','封装某类任务的方法、模板和参考资料','例如怎样取天气数据、怎样生成卡片','.claude/skills/*/SKILL.md'],
  ['Agents · 子代理','配置示例','定义专门角色、任务边界和返回内容','用独立上下文处理适合委派的工作','.claude/agents/*.md'],
  ['Commands · 命令','配置示例','为经常重复的任务提供一个固定入口','例如用 /weather-orchestrator 启动流程','.claude/commands/*.md'],
  ['工作流与任务编排','流程示例 / 资料','安排步骤、交接信息、串联代理与技能','这里展示编排写法；不是独立调度引擎','orchestration-workflow · workflows'],
  ['Hooks · 事件钩子','辅助脚本','在工具调用、任务结束等事件发生时响应','本例主要播放提示音和记录日志','hooks.py · hooks-config.json'],
  ['MCP · 外部工具接入','连接配置','声明怎样启动和连接外部工具服务','示例：Playwright / Context7 / DeepWiki','.mcp.json'],
  ['设置、记忆与生态资料','配置示例 / 索引','涵盖权限、模型、状态栏、记忆等配置','汇集其他工作流、技能库与相关教程','settings.json · agent-memory · 链接索引']
];
cards.forEach(([title,kind,a,b,path],i)=>{
  const x=70+(i%3)*560,y=465+Math.floor(i/3)*208,w=540,h=188,bound=[x+20,y+12,x+w-20,y+h-12];
  rect(x,y,w,h);
  text(x+24,y+42,title,27,colors.ink,700,'start',bound);
  text(x+24,y+70,kind,18,colors.blue,600,'start',bound);
  lines(x+24,y+105,[a,b],21,colors.muted,32,bound);
  text(x+24,y+168,path,17,colors.muted,400,'start',bound);
});
text(70,1105,'多数机制由 Claude Code 本身提供；这个仓库主要提供用法、配置示例和少量辅助脚本。',25,colors.blue,600);

section(1171,'02','它与模型、项目是什么关系');
const flow=[
  ['参考这个仓库','看教程、挑配置样板','知道有哪些方法可以用'],
  ['适配自己的项目','补充真实业务规则与验收要求','把反复交代的内容保存下来'],
  ['Claude Code 执行','模型理解需求，运行环境调工具','程序与外部服务完成具体操作'],
  ['检查实际结果','运行测试、构建与人工复核','用证据判断是否完成']
];
flow.forEach(([title,a,b],i)=>{const x=70+i*425;rect(x,1208,385,147,i===1?colors.light:'#fff',i===1?'#bccdff':colors.line);text(x+22,1248,title,27,i===1?colors.blue:colors.ink,700);lines(x+22,1291,[a,b],21,colors.muted,32,[x+18,1220,x+367,1345]);if(i<3)arrow(x+392,1279);});
text(70,1399,'天气教学例子：询问单位 → 委派代理 → 技能指导取数 → 返回温度 → 按模板输出 SVG。',24,colors.muted);
text(70,1436,'拆分用于说明机制，不代表复杂编排比直接指令更好；本研究没有验证原版完整代理流程。',21,colors.muted);

section(1501,'03','什么时候值得参考','一次性小任务：通常直接提出要求即可');
const cases=[
 ['刚开始使用 Claude Code','需要了解有哪些功能、各自怎样配置。','价值：节省查找与试写配置的时间。'],
 ['多人协作或重复任务较多','希望统一要求、固定产物格式和检查步骤。','价值：减少重复解释，方便复用与交接。'],
 ['有明确的工具或通知需求','想添加提示音、外部工具或专项流程。','价值：挑一个相关例子，改造成自己的配置。']
];
cases.forEach(([title,a,b],i)=>{const x=70+i*560;rect(x,1538,540,145);text(x+24,1582,title,25,colors.ink,700);lines(x+24,1623,[a,b],21,colors.muted,33,[x+20,1550,x+520,1673]);});

section(1747,'04','模型已经很强，对我们还有什么意义？');
rect(70,1783,810,236,'#eaf1ff','#c8d7fb');
text(99,1826,'核心意义：理解 AI 的流程与动作',29,colors.blue,700);
lines(99,1870,[
 '知道谁在做什么：命令组织步骤，代理分工，技能提供方法。',
 '知道任务怎样交接：输入需求、传递结果、调用工具、生成产物。',
 '知道哪些需要检查：文本约定、程序行为和真实结果分别验证。',
 '目标是更好使用 AI；具体配置只在确有需要时参考。'
],21,colors.ink,39,[94,1800,858,2010]);
rect(900,1783,830,236,'#fff',colors.line);
text(929,1826,'对我们的直接参考价值不大',29,colors.ink,700);
lines(929,1870,[
 '我们已有 AGENTS.md，也能直接让 AI 开发、分析和验证。',
 '它的新增价值主要是查用法、看写法、找少量可复用脚本。',
 '不必专门集成；也可以让模型直接帮我们编写所需配置。',
 '把它归类为「学习参考库」，而不是必需的开发基础设施。'
],21,colors.muted,39,[923,1800,1706,2010]);

rect(70,2053,1660,187,colors.nav,colors.nav);
text(99,2096,'读这张图时，需要保留的边界',28,'#fff',700);
lines(99,2140,[
 '不会增加模型的底层编程能力；复制配置不保证效果更好，也不保证模型严格遵循所有指令。',
 '它不提供通用的全自动项目开发系统；README 中引用的第三方能力，不等于本仓库已经实现。',
 '自然语言流程需要模型遵循；测试、权限与脚本控制需要结合实际环境单独验证。'
],23,'#d3e0f3',36);
text(70,2290,'阅读方式：先明确要解决的问题 → 查对应章节 → 选取示例 → 项目化修改 → 验证实际收益。',25,colors.ink,600);
out.push('<a href="https://github.com/shanraisshan/claude-code-best-practice/tree/73087da5e272fc197d7f9f29492d153fe1aaaefe">');
text(70,2340,'来源：shanraisshan/claude-code-best-practice · 固定版本 73087da · 上游 MIT',19,colors.muted);
out.push('</a>');
text(1730,2340,'原创理解总览 · 非产品截图 · 2026-09-18',19,colors.muted,400,'end');
out.push('</svg>');
const svgPath=resolve(root,'assets/understanding-map.svg');
await writeFile(svgPath,out.join('\n'),'utf8');
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH}:{channel:'msedge'})});
try {
  const page=await browser.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:${W}px;height:${H}px}svg{display:block}</style></head><body>${out.join('\n')}</body></html>`);
  await page.evaluate(()=>document.fonts.ready);
  const failures=await page.evaluate(()=>[...document.querySelectorAll('text')].flatMap(el=>{
    const box=el.getBBox();
    const bound=el.dataset.bound ? el.dataset.bound.split(',').map(Number):[0,0,1800,2380];
    return box.x < bound[0] || box.y < bound[1] || box.x+box.width > bound[2] || box.y+box.height > bound[3] ? [{text:el.textContent,bounds:bound,actual:{x:box.x,y:box.y,width:box.width,height:box.height}}] : [];
  }));
  if(failures.length) throw new Error(JSON.stringify(failures,null,2));
  await page.screenshot({path:resolve(root,'assets/understanding-map.png'),fullPage:true,timeout:60000});
  await writeFile(resolve(root,'notes/evidence/understanding-map.json'),JSON.stringify({date:'2026-09-18',type:'original explanatory diagram, not product screenshot',upstreamCommit:'73087da5e272fc197d7f9f29492d153fe1aaaefe',svgDimensions:[W,H],pngDimensions:[W*2,H*2],textElements:textCount,textBoundsPassed:true,renderer:`Edge ${await browser.version()}`,sections:['定位','九类内容','执行关系','使用场景','对我们的意义','能力边界']},null,2)+'\n');
  console.log(`Created SVG and ${W*2} × ${H*2} PNG; ${textCount} text elements checked.`);
} finally {await browser.close();}
