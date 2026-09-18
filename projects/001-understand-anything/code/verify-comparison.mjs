import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const { chromium }=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage({viewport:{width:1600,height:1100}});
const base=process.argv[2]??'http://127.0.0.1:8765/projects/001-understand-anything/demo/';
const errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
try{
 await page.goto(base+'overview.html');
 await page.getByRole('link',{name:'同类工具与选型',exact:true}).click();
 await page.locator('#compare-page').waitFor({state:'visible'});
 assert.equal(await page.locator('#compare-page').isVisible(),true);
 assert.equal(await page.locator('#compare-matrix tr').count(),5);
 assert.equal(await page.locator('#compare-example article').count(),5);
 assert.equal(await page.locator('.compare-recipes article').count(),3);
 checks.push('从一图总览进入五工具对比、同题示例与三种组合方式');
 await page.screenshot({path:resolve(project,'assets/comparison.png'),fullPage:true});
 const expected=['Understand Anything','Graphify','Archify','Diagram Design','Fireworks','Diagram Design','Understand Anything'];
 for(let i=0;i<7;i++){
   await page.locator(`[data-compare-case="${i}"]`).click();
   assert.equal(await page.locator('#compare-recommendation .compare-recommend strong').textContent(),expected[i]);
   assert.equal(await page.locator('#compare-recommendation dd').count(),4);
   await page.locator('#compare-recommendation [data-open-tool]').click();
   assert.equal(await page.locator('#compare-detail h2').textContent(),expected[i]);
 }
 checks.push('七种场景的建议、替代条件与详情跳转');
 for(const [id,name,sha] of [['ua','Understand Anything','6df3065'],['graphify','Graphify','3f82bf7'],['archify','Archify','1072200'],['diagram','Diagram Design','ce9344c'],['fireworks','Fireworks','31fea36']]){
   await page.locator(`[data-compare-tool="${id}"]`).click();
   assert.equal(await page.locator('#compare-detail h2').textContent(),name);
   assert.match(await page.locator('.compare-version').textContent(),new RegExp(sha));
   assert.equal(await page.locator('.compare-detail-fields article').count(),6);
   assert.equal(await page.locator('.compare-proof>div').count(),2);
   assert.match(await page.getByRole('link',{name:'固定版本源码 ↗',exact:true}).getAttribute('href'),new RegExp('/tree/'+sha));
 }
 checks.push('五工具六维度详情、固定版本链接、实测与未验证范围');
 await page.reload();
 assert.equal(await page.locator('#compare-page').isVisible(),true);
 assert.equal(await page.locator('[data-page=compare]').getAttribute('aria-current'),'page');
 checks.push('对比页深链接刷新与导航状态');
 for(const width of [1600,768,390]){
   await page.setViewportSize({width,height:900});
   await page.locator('[data-compare-case="4"]').click();
   await page.locator('[data-compare-tool="graphify"]').click();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow at ${width}`);
   assert.ok(await page.locator('.compare-matrix').evaluate(el=>el.scrollWidth>=el.clientWidth));
 }
 await page.screenshot({path:resolve(project,'assets/comparison-mobile.png'),fullPage:true});
 checks.push('1600 / 768 / 390px 页面适配与表格局部滚动');
 await page.locator('[data-compare-case="3"]').focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#compare-recommendation .compare-recommend strong').textContent(),'Diagram Design');
 checks.push('键盘选择场景');
 await page.goto(pathToFileURL(resolve(project,'demo/index.html')).href+'#compare');
 assert.equal(await page.locator('#compare-tools button').count(),5);
 await page.locator('[data-compare-tool="fireworks"]').click();
 assert.equal(await page.locator('#compare-detail h2').textContent(),'Fireworks');
 const anchors=await page.locator('#compare-page a[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')).filter(h=>h.startsWith('../')||h.startsWith('./')));
 for(const href of anchors) await readFile(resolve(project,'demo',href.split('#')[0]));
 checks.push('file:// 直接打开、切换工具和本地文档链接');
 assert.deepEqual(errors,[]);
 await writeFile(resolve(project,'notes/evidence/comparison-qa.json'),JSON.stringify({checkedAt:new Date().toISOString(),checks,browserErrors:errors,scope:'研究网站交互与展示；没有重新执行五工具的分析或制图能力，也没有跨库性能排名',externalLinks:'来源地址沿用历史研究；本脚本未测试外站可用性'},null,2)+'\n');
 console.log(JSON.stringify({checks:checks.length,errors},null,2));
}finally{await browser.close();}
