// Exercises meaningful interactions and captures the original research exhibit.
import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const project=resolve(dirname(fileURLToPath(import.meta.url)), '..');
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const base=process.argv[2] || 'http://127.0.0.1:8767/projects/003-frontend-design-toolkit/demo/';
const reportName=process.argv[3] || 'browser-qa.json';
assert.match(reportName,/^[a-z-]+\.json$/);
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'msedge'})});
const page=await browser.newPage({viewport:{width:1500,height:1100},deviceScaleFactor:1});
const errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
const noOverflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow: ${page.url()}`);
try {
  await page.goto(base);
  assert.match(await page.locator('h1').textContent(),/Claude Code 前端设计与实现指南/);
  await page.locator('#map-image').evaluate(img=>img.decode());
  const mapWidth=await page.locator('#map-image').evaluate(img=>img.clientWidth);
  await page.locator('#map-plus').click();
  assert.ok(await page.locator('#map-image').evaluate(img=>img.clientWidth)>mapWidth);
  assert.equal(await page.locator('#map-scale').textContent(),'125%');
  await page.locator('#map-minus').click();
  assert.equal(await page.locator('#map-image').evaluate(img=>img.clientWidth),mapWidth);
  await page.locator('#map-plus').click();await page.locator('#map-fit').click();
  assert.equal(await page.locator('#map-image').evaluate(img=>img.clientWidth),mapWidth);
  const pngURL=await page.getByRole('link',{name:'打开高清图 ↗'}).getAttribute('href');
  assert.equal((await page.request.get(new URL(pngURL,base).href)).status(),200);
  checks.push('总览图加载、放大、缩小、适应宽度及高清图片链接');
  assert.equal(await page.locator('[aria-current=page]').count(),1);
  await page.screenshot({path:resolve(project,'assets/cover.png'),fullPage:true});
  checks.push('说明指南定位、九个方面、对我们的意义和证据边界可见');
  await page.locator('[data-page=capabilities]').click();
  assert.equal(await page.locator('[data-cap]').count(),8);
  for(const [filter,count] of [['设计',3],['实现',3],['验证',1],['交付',1],['全部',8]]) {
    await page.locator(`[data-filter="${filter}"]`).click();
    assert.equal(await page.locator('[data-cap]').count(),count);
    assert.equal(await page.locator('[data-cap][aria-pressed=true]').count(),1);
  }
  await page.locator('#search').fill('Context7');
  assert.equal(await page.locator('[data-cap]').count(),1);
  assert.match(await page.locator('#cap-detail h2').textContent(),/框架知识/);
  await page.locator('#search').fill('<不存在>');
  assert.equal(await page.locator('[data-cap]').count(),0);
  assert.match(await page.locator('#cap-detail').textContent(),/等待选择/);
  await page.locator('#search').fill('');
  await page.locator('[data-cap=testing]').focus();await page.keyboard.press('Enter');
  assert.match(await page.locator('#cap-detail h2').textContent(),/浏览器检查/);
  assert.ok((await page.locator('#cap-detail a').getAttribute('href')).includes('ea43eee0d95196ab31f7619b26f78d7b9c664286'));
  checks.push('八类能力、分类筛选、关键词与空结果、键盘选择和来源关联');
  await page.locator('[data-page=mechanism]').click();
  assert.equal(await page.locator('#prev').isDisabled(),true);
  for(let i=0;i<5;i++)await page.locator('#next').click();
  assert.equal(await page.locator('#next').isDisabled(),true);
  assert.match(await page.locator('#flow-detail h2').textContent(),/修正与交付/);
  await page.locator('#prev').click();assert.match(await page.locator('#flow-detail h2').textContent(),/浏览器核对/);
  await page.locator('#reset').click();assert.equal(await page.locator('#prev').isDisabled(),true);
  await page.locator('[data-step="2"]').click();assert.match(await page.locator('#flow-detail h2').textContent(),/补充资料/);
  checks.push('六步教学流程、前后边界、重置与任意步骤选择');
  const colors=()=>page.locator('#token-preview').evaluate(el=>({title:getComputedStyle(el.querySelector('h3')).color,badge:getComputedStyle(el.querySelector('.sample-badge')).color,button:getComputedStyle(el.querySelector('.sample-cta')).backgroundColor}));
  const before=await colors();
  await page.locator('#hue').fill('20');
  const after=await colors();
  for(const key of Object.keys(before))assert.notEqual(before[key],after[key]);
  assert.equal(after.title,after.badge);assert.equal(after.title,after.button);
  assert.equal(await page.locator('#hue-value').textContent(),'20°');
  await page.locator('#hue').focus();await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#hue-value').textContent(),'21°');
  await page.screenshot({path:resolve(project,'assets/mechanism.png'),fullPage:true});
  checks.push('色相滑块改变三个组件的实际计算样式，支持键盘操作');
  await page.locator('[data-page=practice]').click();
  assert.match(await page.locator('h1').textContent(),/同一个需求/);
  assert.equal(await page.locator('#request-extra').count(),0);
  assert.equal(await page.locator('[data-review]').count(),0);
  const sharedTask=await page.locator('#shared-task-text').textContent();
  const instructions=new Set();
  for(const id of ['design','docs','figma','browser']) {
    await page.locator(`[data-tool-case=${id}]`).click();
    assert.equal(await page.locator(`[data-tool-case=${id}]`).getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('#shared-task-text').textContent(),sharedTask);
    assert.match(await page.locator('.task-inputs').textContent(),/咖啡首页的业务要求/);
    instructions.add(await page.locator('#connected-instruction').textContent());
    assert.equal(await page.locator('.tool-explanation section').count(),4);
    assert.ok((await page.locator('.capability-gain').textContent()).length>40);
    const url=await page.locator('.tool-detail-heading a').getAttribute('href');
    assert.ok(url.startsWith('https://'));
    assert.ok((await page.locator('.tool-explanation a').getAttribute('href')).includes('2a6d0958'));
  }
  assert.equal(instructions.size,4);
  await page.locator('[data-tool-case=docs]').focus();await page.keyboard.press('Enter');
  assert.match(await page.locator('#tool-detail h2').textContent(),/Context7/);
  await page.reload();
  assert.match(await page.locator('#tool-detail h2').textContent(),/Frontend Design/);
  assert.equal(await page.locator('#request-extra').count(),0);
  await page.evaluate(()=>{document.activeElement.blur();window.scrollTo(0,0);});
  await page.screenshot({path:resolve(project,'assets/practice.png'),fullPage:true});
  checks.push('实际价值：同一咖啡首页需求贯穿四种资源；选型、接入、任务指令、使用痕迹和来源相连；切换与键盘操作正常');
  await page.locator('[data-page=scenarios]').click();
  for(const id of ['landing','system','handoff','fix']) {
    await page.locator(`[data-scenario=${id}]`).click();
    assert.equal(await page.locator(`[data-scenario=${id}]`).getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('.stack span').count(),3);
    assert.ok((await page.locator('.verdict').textContent()).length>30);
  }
  checks.push('四种场景的组合理由、验收条件与误区');
  await page.locator('[data-page=evidence]').click();await page.reload();
  assert.equal(await page.locator('.source-row').count(),5);
  assert.match(await page.locator('main').textContent(),/LICENSE/);
  const documentLinks=await page.locator('main a').evaluateAll(links=>links.map(a=>a.getAttribute('href')).filter(href=>href.startsWith('.')));
  for(const suffix of documentLinks) {
    const url=new URL(suffix,base);
    assert.equal((await page.request.get(url.href)).status(),200,url.href);
  }
  checks.push('证据深链接刷新、五份固定来源、文档可访问');
  for(const width of [1500,768,390,320]) {
    await page.setViewportSize({width,height:1000});
    for(const route of ['overview','capabilities','mechanism','practice','scenarios','evidence']) {
      await page.goto(base+'#'+route);await page.waitForSelector('h1');await noOverflow();
    }
  }
  checks.push('六个页面在 1500 / 768 / 390 / 320px 无页面横向溢出');
  await page.setViewportSize({width:390,height:844});await page.goto(base+'#overview');
  await page.screenshot({path:resolve(project,'assets/mobile.png'),fullPage:true});
  await page.goto(base+'#practice');
  await page.screenshot({path:resolve(project,'assets/practice-mobile.png'),fullPage:true});
  await page.setViewportSize({width:1500,height:1100});
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'#mechanism');await noOverflow();
  await page.locator('#next').click();
  checks.push('减少动态效果模式布局与操作正常');
  await page.goto(pathToFileURL(resolve(project,'demo/index.html')).href+'#mechanism');
  await page.locator('#next').click();assert.match(await page.locator('#flow-detail h2').textContent(),/加载规则/);
  checks.push('file:// 离线入口与交互');
  assert.deepEqual(errors,[]);checks.push('无脚本异常和 HTTP 资源错误');
  await mkdir(resolve(project,'notes/evidence'),{recursive:true});
  const report={verifiedAt:new Date().toISOString(),node:process.version,browser:await browser.version(),url:base,checks,errors,scope:'原创静态展厅及 CSS 实验；不包含 Claude、MCP 服务或第三方工具组合实测'};
  await writeFile(resolve(project,'notes/evidence',reportName),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
