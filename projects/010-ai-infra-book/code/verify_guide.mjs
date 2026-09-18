import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const url=process.argv[2]||'http://127.0.0.1:8770/projects/010-ai-infra-book/demo/';
const record=process.argv[3]||'browser.json';
const capture=process.argv.includes('--screenshots');
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
try{
 assert.equal((await page.goto(url)).status(),200);
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.locator('.chapter').count(),12);
 assert.equal(await page.locator('.cap-card').count(),3);
 assert.equal(await page.locator('.chapter.recommended').count(),7);
 assert.equal(await page.locator('.chapter[href*="blob/b069b6971faf6c4701b57a8b025462b9f2694b8f/manuscripts/"]').count(),12);
 assert.equal(await page.locator('[data-source][href*="blob/b069b6971faf6c4701b57a8b025462b9f2694b8f/"]').count(),7);
 assert.match(await page.locator('#start').textContent(),/未在本项目执行/);
 assert.match(await page.locator('#use-summary').textContent(),/模型与负载、加速器与算子、多卡互联与网络、推理与训练优化、资源调度及端边云协同/);
 assert.match(await page.locator('#use-summary').textContent(),/本地模型显存不足或速度慢、评估多人服务成本，以及微调训练受资源限制/);
 checks.push('三类能力、十二章地图、固定提交来源和未执行边界存在');
 await page.locator('#understanding-map').evaluate(async img=>{img.loading='eager';await img.decode()});
 assert.ok(await page.locator('#understanding-map').evaluate(img=>img.naturalWidth)>=1400);
 if(capture)await page.screenshot({path:path.join(root,'assets/cover.png')});
 for(const [route,count] of [['system',8],['hardware',7],['all',12],['app',7]]){
  await page.locator(`[data-route="${route}"]`).click();
  assert.equal(await page.locator('.chapter.recommended').count(),count);
  assert.equal(await page.locator(`[data-route="${route}"]`).getAttribute('aria-pressed'),'true');
  await page.reload();assert.equal(await page.locator('.chapter.recommended').count(),count);
 }
 await page.goBack();assert.equal(await page.locator('[data-route="all"]').getAttribute('aria-pressed'),'true');
 await page.goForward();assert.equal(await page.locator('[data-route="app"]').getAttribute('aria-pressed'),'true');
 checks.push('四条路线、章节高亮、刷新和前进后退保持选择');
 await page.context().grantPermissions(['clipboard-read','clipboard-write']);
 await page.locator('#copy-command').click();
 await page.waitForFunction(()=>document.querySelector('#copy-status').textContent.length>0);
 assert.match(await page.locator('#copy-status').textContent(),/已复制/);
 assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/git checkout b069b697/);
 checks.push('复制命令包含固定提交与最小计算入口');
 await page.locator('.evidence-details summary').click();
 assert.equal(await page.locator('.evidence-details').getAttribute('open'),'');
 const localLinks=await page.locator('a').evaluateAll(as=>as.map(a=>a.href).filter(h=>h.startsWith(location.origin)));
 for(const href of new Set(localLinks)){
  const parsed=new URL(href);
  if(parsed.pathname===new URL(url).pathname&&parsed.hash){assert.ok(await page.locator(parsed.hash).count(),href);continue}
  if(parsed.pathname===new URL(url).pathname)continue;
  assert.equal((await page.request.get(href)).status(),200,href);
 }
 checks.push('本地说明、来源记录、页面锚点可访问');
 for(const width of [1440,900,768,390,320]){
  await page.setViewportSize({width,height:900});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
  await page.locator('[data-route="system"]').click();assert.equal(await page.locator('.chapter.recommended').count(),8);
  await page.locator('[data-route="app"]').click();
 }
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));
 if(capture)await page.screenshot({path:path.join(root,'assets/mobile.png'),fullPage:true});
 checks.push('1440/900/768/390/320px 无页面横向溢出，手机路线切换通过');
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('[data-route="system"]').focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('[data-route="system"]').getAttribute('aria-pressed'),'true');
 checks.push('键盘 Enter 可选择路线');
 const nojs=await browser.newPage({javaScriptEnabled:false});
 await nojs.goto(url);assert.equal(await nojs.locator('.chapter').count(),12);assert.equal(await nojs.locator('.cap-card').count(),3);
 assert.equal(await nojs.locator('noscript').isVisible(),true);await nojs.close();
 checks.push('禁用 JavaScript 仍可阅读能力、默认路线、十二章和命令');
 const mapPage=await browser.newPage({viewport:{width:1440,height:1000}});
 mapPage.on('pageerror',e=>errors.push(e.message));
 mapPage.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 assert.equal((await mapPage.goto(new URL('overview.html',url).href)).status(),200);
 await mapPage.locator('#map').evaluate(img=>img.decode());
 const width=()=>mapPage.locator('#map').evaluate(img=>img.getBoundingClientRect().width);
 await mapPage.locator('#fit').click();const fitted=await width();
 await mapPage.locator('#zoom-in').click();assert.ok(await width()>fitted);
 await mapPage.locator('#zoom-out').click();assert.ok(Math.abs(await width()-fitted)<=1);
 await mapPage.locator('#actual').click();assert.equal(await width(),await mapPage.locator('#map').evaluate(img=>img.naturalWidth));
 assert.ok(await mapPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 for(const w of [390,320]){
  await mapPage.setViewportSize({width:w,height:844});await mapPage.locator('#fit').click();
  assert.ok(await width()<=w);
  await mapPage.locator('#zoom-in').focus();await mapPage.keyboard.press('Enter');
  assert.ok(await mapPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.ok(await mapPage.locator('#viewer').evaluate(el=>el.scrollWidth>el.clientWidth));
 }
 const download=mapPage.waitForEvent('download');await mapPage.locator('[download]').click();
 assert.equal((await download).suggestedFilename(),'understanding-map.png');
 await mapPage.close();
 checks.push('完整理解图加载、放大缩小、适应窗口、原始大小、键盘操作、下载与手机图内滚动');
 assert.deepEqual(errors,[]);
 await writeFile(path.join(root,'notes/evidence',record),JSON.stringify({checkedAt:new Date().toISOString(),url,checks,errors,scope:'仅验证研究网页；未运行上游计算工具或 GPU 实验，未逐项请求外部链接'},null,2)+'\n');
 console.log(JSON.stringify({passed:true,checks,errors},null,2));
}finally{await browser.close()}
