// Research-authored fixtures for testing native rendering, not automatic extraction.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const out = resolve(dirname(fileURLToPath(import.meta.url)), 'gallery-fixtures');
await mkdir(out, { recursive: true });
const node = (id, type, name, summary, extra = {}) => ({ id, type, name, summary, tags: ['研究者编写样本'], complexity: 'simple', ...extra });
const edge = (source, target, type, description, weight = 0.8) => ({ source, target, type, description, weight, direction: 'forward' });
const graph = (name, kind, nodes, edges, layers = []) => ({ version: '1.0.0', kind, project: { name, languages: [], frameworks: [], description: '研究者编写的渲染样本；未执行自动提取或 LLM 分析。', analyzedAt: new Date().toISOString(), gitCommitHash: '' }, nodes, edges, layers, tour: [] });
const domain = graph('领域与流程 · 人工样本', 'codebase', [
  node('orders', 'domain', '订单领域', '接收订单并协调库存与支付。', { domainMeta: { entities: ['订单', '购物车'], businessRules: ['演示规则：先校验，再收款'] } }),
  node('stock', 'domain', '库存领域', '查询可用库存，执行预留。', { domainMeta: { entities: ['商品', '库存'] } }),
  node('payment', 'domain', '支付领域', '处理支付与退款。', { domainMeta: { entities: ['支付单'] } }),
  node('checkout', 'flow', '提交订单', '一次结账流程的步骤分解。', { domainMeta: { entryPoint: 'POST /orders', entryType: 'http' } }),
  node('validate', 'step', '校验商品', '核对商品与购买数量。'),
  node('reserve', 'step', '预留库存', '为当前订单保留库存。'),
  node('charge', 'step', '发起支付', '请求支付服务收款。'),
  node('save', 'step', '保存订单', '记录订单状态。'),
], [edge('orders','stock','cross_domain','请求库存预留'), edge('orders','payment','cross_domain','请求收款'), edge('orders','checkout','contains_flow','包含流程'), ...['validate','reserve','charge','save'].map((id,i) => edge('checkout',id,'flow_step','流程步骤',(i+1)/10))]);
const knowledge = graph('缓存策略 Wiki · 人工样本', 'knowledge', [
  node('topic','topic','缓存策略','连接性能与一致性的研究主题。'),
  node('article','article','缓存实践笔记','总结缓存的收益与代价。'),
  node('claim1','claim','缓存降低延迟','示例观点，需结合场景验证。'),
  node('claim2','claim','缓存可能增加延迟','示例反例：维护成本高于命中收益。'),
  node('source','source','实验记录 A','人工构造的来源节点，不代表真实研究结论。'),
  node('entity','entity','Redis','缓存组件示例。'),
], [edge('article','topic','categorized_under','归属主题'),edge('article','source','cites','引用来源'),edge('claim2','claim1','contradicts','条件不同的相反观点'),edge('article','claim1','builds_on','基于观点'),edge('entity','claim1','exemplifies','举例'),edge('claim2','source','cites','引用来源')], [{id:'cache',name:'缓存研究',description:'人工示例主题',nodeIds:['topic','article','claim1','claim2','source','entity']}]);
const designNodes = [
  node('page','page','商城页面集','人工示例中的 Figma 页面。'),
  node('screen','screen','结账界面','包含按钮实例的界面。'),
  node('set','componentSet','Button 组件集','管理按钮的多个变体。'),
  node('component','component','Primary 按钮','主要操作按钮变体。'),
  node('instance','instance','提交订单按钮','界面中引用的按钮实例。'),
  node('token','token','品牌主色','示例颜色变量。', {figmaMeta:{fileKey:'research-fixture',nodeId:'1:6',tokenKind:'color',tokenValue:'#567553'}}),
];
const design = graph('设计系统 · 人工样本', 'design', designNodes, [edge('page','screen','contains','包含界面'),edge('screen','instance','contains','包含实例'),edge('component','set','variant_of','组件变体'),edge('instance','component','instance_of','引用组件'),edge('component','token','uses_token','使用颜色变量')], [{id:'design',name:'设计系统',description:'页面、组件与变量的人工样本',nodeIds:designNodes.map(n=>n.id)}]);
for (const [name, value] of Object.entries({domain,knowledge,design})) await writeFile(resolve(out, name+'.json'),JSON.stringify(value,null,2)+'\n');
console.log('Created 3 explicitly authored fixtures.');
