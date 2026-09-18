// Original research illustration. Does not claim to be upstream-generated output.
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const C={bg:'#f5f5ed',paper:'#fffef9',ink:'#213e33',muted:'#6e7c70',line:'#d8dfce',green:'#547c58',gold:'#a57b36',purple:'#82739d',blue:'#507f9a'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let parts=[];
const rect=(x,y,w,h,fill=C.paper,stroke=C.line,r=14)=>parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`);
const txt=(x,y,text,size=21,color=C.ink,weight=400)=>parts.push(`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(text)}</text>`);
const lines=(x,y,list,size=20,color=C.muted,gap=31)=>list.forEach((s,i)=>txt(x,y+i*gap,s,size,color));
const path=(d,color=C.green,dash='')=>parts.push(`<path d="${d}" fill="none" stroke="${color}" stroke-width="2" ${dash?`stroke-dasharray="${dash}"`:''} marker-end="url(#arrow)"/>`);
const section=(y,num,title,desc)=>{rect(52,y-27,40,36,C.ink,C.ink,8);txt(62,y,num,18,'#e2efc5',600);txt(108,y,title,27,C.ink,650);txt(480,y,desc,18,C.muted);};
const tag=(x,y,label,color=C.green)=>{rect(x,y,Math.max(64,label.length*16+24),28,'#f0f3e8',C.line,14);txt(x+12,y+20,label,15,color,500);};
const miniNode=(x,y,w,label,color)=>{rect(x,y,w,36,C.paper,color,7);txt(x+12,y+24,label,16,color,500);};
rect(0,0,1800,2020,C.bg,C.bg,0);
rect(0,0,1800,190,C.ink,C.ink,0);
txt(52,47,'OPEN SOURCE RESEARCH  /  001',18,'#c4d8ae',500);
txt(52,104,'Understand Anything · 一图理解',46,'#f6f7e9',650);
txt(52,151,'把源码与资料，变成可探索、可解释、可回查的知识图谱。',24,'#d2ddcb');
txt(1390,52,'研究版本 6df3065',19,'#c4d8ae');
txt(1390,86,'2026.09.18  ·  MIT',18,'#c4d8ae');
txt(1390,144,'原创能力示意 · 非产品截图',18,'#c4d8ae');
section(242,'01','输入从哪里来','来源不同，提取路径不同；数据需要访问权限与对应材料。');
const inputs=[
 ['代码仓库','源码 / 配置 / SQL / 项目文档',['程序读取文件、语法与结构。','业务领域可从已有代码图谱归纳，','也可通过轻量扫描获取上下文。'],C.green],
 ['Markdown Wiki','文章 / 双向链接 / 原始来源',['读取约定的 Wiki 目录结构。','显式链接可以直接解析；','隐含知识关系需语义分析。'],C.purple],
 ['已有 Figma 文件','页面 / 组件 / 实例 / 设计变量',['经 Figma REST API 读取对象。','需要文件 URL 或 key 与 token；','分析已有设计的结构与引用。'],C.blue],
 ['已有图谱数据','合规 JSON / 人或工具整理的数据',['已有图谱可直接进入浏览。','无需每次重新调用大模型；','业务领域、源码查看另需对应数据。'],C.gold],
];
inputs.forEach(([title,sub,body,color],i)=>{let x=52+i*430;rect(x,266,406,183);rect(x,266,6,183,color,color,0);txt(x+23,303,title,25,color,650);txt(x+23,336,sub,18,C.ink,500);lines(x+23,371,body,18,C.muted,27);});
path('M900 451 V480');
section(520,'02','如何处理与分工','库包含部分分析流程；原始材料不需要全部由人预先整理。');
const steps=[
 ['扫描与分批','程序 / 编排',['识别文件、语言与入口','代码按关联组织批次'],C.green],
 ['提取结构事实','程序',['Tree-sitter、专用解析器','提取符号 / 链接 / 引用'],C.green],
 ['理解与归纳','大模型 / 人',['补充摘要、职责、业务含义','归纳领域、分层与导览'],C.gold],
 ['合并与校验','程序 + 必要复核',['合并节点、规范标识','检查结构和悬空关系'],C.green],
 ['布局与交互','程序',['结构 / 领域布局、力导向','渲染节点、连线与详情'],C.green],
];
steps.forEach(([title,role,body,color],i)=>{let x=52+i*348;rect(x,548,324,177);tag(x+18,561,role,color);txt(x+18,624,title,25,C.ink,650);lines(x+18,662,body,18,C.muted,29);if(i<4)path(`M${x+326} 636 H${x+345}`);});
rect(52,748,1696,82,'#e8efdc');
txt(75,782,'核心产物：结构化图谱 JSON',23,C.ink,600);
txt(75,812,'节点 + 关系 + 层级 + 导览 + 来源位置',19,C.muted);
txt(618,782,'27 种节点 · 38 种关系',23,C.ink,600);
txt(618,812,'这是数据模型的类型数，不是图种数或提取覆盖率。',19,C.muted);
txt(1283,782,'人 / 模型负责事实复核',22,C.gold,600);
txt(1283,812,'结构校验通过 ≠ 业务结论正确',19,C.muted);
path('M900 833 V860');
section(901,'03','内部能呈现什么','4 大图谱类别；3 套主要视图；下图为效果形态示意。');
const cards=[
 ['代码与架构','结构视图',C.green,['架构分层 · 文件与模块依赖','函数调用 · 类继承与接口实现','数据读写 · 服务与基础设施'],['从架构层深入文件和符号；','这些是同一图谱的不同关系。'],'/understand'],
 ['业务领域','横向领域 / 流程视图',C.gold,['领域 → 业务流程 → 编号步骤','跨领域协作、实体与规则','入口与相关源码线索'],['双击领域查看流程与步骤；','连接不等于真实执行时序。'],'/understand-domain'],
 ['Wiki 知识','力导向网络 / 主题聚类',C.purple,['文章 · 实体 · 主题 · 观点 · 来源','引用 / 矛盾 / 归类 / 举例','社区聚类与关联探索'],['从主题进入文章与证据；','隐含联系需要核对原文。'],'/understand-knowledge'],
 ['Figma 设计','复用结构视图',C.blue,['页面 · 界面 · 组件集 · 组件','实例 / 变体 / 设计变量引用','设计对象的分组与解释'],['盘点已有设计系统关系；','不自动生成新的 UI 界面。'],'/understand-figma'],
];
cards.forEach(([title,sub,color,body,note,cmd],i)=>{
 const x=52+i*430;rect(x,926,406,374);txt(x+22,963,title,27,color,650);txt(x+22,994,sub,18,C.muted);
 if(i===0){miniNode(x+24,1016,100,'入口',color);miniNode(x+250,1016,125,'业务模块',color);miniNode(x+250,1074,125,'基础设施',color);path(`M${x+124} 1034 H${x+246}`,color);path(`M${x+312} 1054 V1070`,color);}
 if(i===1){miniNode(x+24,1044,90,'领域',color);miniNode(x+150,1044,90,'流程',color);miniNode(x+276,1044,105,'步骤',color);path(`M${x+115} 1062 H${x+146}`,color);path(`M${x+242} 1062 H${x+272}`,color);}
 if(i===2){miniNode(x+24,1016,100,'主题',color);miniNode(x+250,1016,120,'文章',color);miniNode(x+145,1074,110,'来源',color);path(`M${x+248} 1034 H${x+128}`,color);path(`M${x+310} 1054 L${x+257} 1088`,color);path(`M${x+145} 1092 L${x+80} 1056`,color,'4 4');}
 if(i===3){miniNode(x+24,1016,100,'界面实例',color);miniNode(x+250,1016,125,'组件',color);miniNode(x+250,1074,125,'设计变量',color);path(`M${x+126} 1034 H${x+246}`,color);path(`M${x+312} 1054 V1070`,color);}
 lines(x+22,1143,body,18,C.ink,27);lines(x+22,1234,note,17,C.muted,25);txt(x+22,1281,cmd,17,color,500);
});
rect(52,1320,1696,98,'#e8efdc');
txt(75,1357,'交互与辅助效果',22,C.ink,600);txt(310,1357,'筛选搜索 · 节点详情与源码 · 聚类展开 · 阅读导览 · 变更影响高亮',21,C.ink);
txt(75,1392,'问答',19,C.ink,600);txt(137,1392,'在宿主 AI 工具中检索图谱并回答',19,C.muted);txt(640,1392,'导出',19,C.ink,600);txt(707,1392,'JSON 数据 / PNG、SVG 图像',19,C.muted);txt(1200,1392,'更新',19,C.ink,600);txt(1269,1392,'重新分析 / 增量更新',19,C.muted);
section(1480,'04','对我们的意义','先理解与核实，再用于阅读、协作和研究交付。');
const values=[
 ['更快进入陌生项目',['先看模块全貌与阅读路线，','再回到关键源码验证细节。']],
 ['辅助改动与排查',['追踪依赖和直接关联节点，','缩小阅读范围，配合测试调试。']],
 ['沉淀可复用的知识',['把解释、关系和来源存成图谱，','用于交接、资料整理与反复查询。']],
 ['连接后续表达工具',['核实后可转成汇报或技术配图。','对接 Archify 等需另写转换流程。']],
];
values.forEach(([title,body],i)=>{const x=52+i*430;rect(x,1505,406,130);txt(x+22,1544,title,24,C.ink,600);lines(x+22,1584,body,18,C.muted,28);});
rect(52,1656,1696,58,C.ink,C.ink,9);txt(76,1693,'使用路径',20,'#dce8c7',600);txt(225,1693,'准备材料与权限 → 在 AI 工具中运行对应技能 → 生成图谱 → 打开 Dashboard → 回查原始来源',21,'#f6f7e9');
section(1770,'05','如何理解结果','解析证据、模型推断和图形布局，属于不同层面的信息。');
rect(52,1794,835,143,'#fff9e9','#dfd3b7');rect(909,1794,839,143,'#ecf1e6');
txt(74,1828,'能力边界',23,C.gold,600);lines(74,1863,['静态关系不等于运行轨迹；核心变更影响实测覆盖一跳。','增量结构指纹可能漏掉函数体变化；重要改动应核对源码。','未见标准 UML 时序图、ER 基数图、BPMN、甘特图的独立实现。'],18,C.muted,27);
txt(931,1828,'我们已经验证到哪里',23,C.green,600);lines(931,1863,['已实测：小型订单源码解析、核心 API、原版浏览与导览。','领域 / Wiki / 设计：人工 JSON 的原版渲染；关系示意为原创。','未实测：完整 LLM 自动分析、真实 Figma API 与自动业务归纳。'],18,C.muted,27);
txt(52,1970,'依据固定版本源码与本地实验整理；不表示全部类型都能自动、完整、准确提取。',18,C.muted);
txt(52,2000,'来源：github.com/Egonex-AI/Understand-Anything  ·  types.ts / skills / Dashboard  ·  详细证据见子项目研究说明',17,C.muted);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="2020" viewBox="0 0 1800 2020" role="img" aria-labelledby="title desc"><title id="title">Understand Anything 能力全景</title><desc id="desc">从代码、Wiki、Figma 或已有图谱输入，经程序提取、大模型或人理解、校验合并与布局，形成四类图谱，用于项目理解、改动排查与知识沉淀。下方注明实测范围和能力边界。</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#798873"/></marker></defs><g font-family="'Microsoft YaHei','PingFang SC',system-ui,sans-serif">${parts.join('\n')}</g></svg>`;
await writeFile(resolve(project,'assets/capability-map.svg'),svg+'\n');
console.log('Created assets/capability-map.svg (1800 × 2020).');
