import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=process.argv[2]??'http://127.0.0.1:8912/projects/012-agent-extension-lab/demo/';
const remote=new URL(base).hostname!=='127.0.0.1'&&new URL(base).hostname!=='localhost';
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))errors.push(`${r.status()} ${r.url()}`);});
const check=label=>{checks.push(label);console.log('PASS '+label);};
try {
  assert.equal((await page.goto(base)).status(),200);
  await page.getByRole('heading',{level:1}).waitFor();
  assert.equal(await page.locator('.product-card').count(),40);
  assert.equal(await page.locator('.method-card').count(),6);
  assert.equal(await page.locator('.source-item').count(),9);
  assert.equal(await page.locator('main>.section').count(),8);
  assert.equal(await page.evaluate(()=>new Set(window.LAB.products.map(x=>x.id)).size),40);
  assert.match(await page.locator('h1').innerText(),/借助插件与 Hook/);
  assert.match(await page.locator('.thesis').innerText(),/开发自己的功能/);
  assert.match(await page.locator('#roadmap h2').innerText(),/开发产品/);
  check('八章节、40 个唯一产品、六种观察方式与九项原始资料');

  await page.getByRole('button',{name:'界面与陪伴',exact:true}).click();
  assert.equal(await page.locator('.product-card').count(),4);
  await page.locator('#product-search').fill('游戏');
  assert.equal(await page.locator('.product-card').count(),2);
  await page.locator('#difficulty-filter').selectOption('低');
  assert.equal(await page.locator('.product-card').count(),1);
  await page.locator('.product-card summary').click();
  assert.match(await page.locator('.product-card[open]').innerText(),/游戏得分不等于生产力/);
  const downloadEvent=page.waitForEvent('download');await page.locator('#export-ideas').click();
  const download=await downloadEvent;assert.equal(download.suggestedFilename(),'agent-product-ideas.md');
  const stream=await download.createReadStream();let exported='';for await(const chunk of stream)exported+=chunk.toString();
  assert.match(exported,/等待时小游戏/);assert.doesNotMatch(exported,/## 28\./);
  await page.locator('#product-search').fill('no-results-xyz');
  assert.equal(await page.locator('#empty-state').isVisible(),true);
  await page.locator('#clear-filters').click();assert.equal(await page.locator('.product-card').count(),40);
  check('分类、关键词与复杂度组合筛选、完整详情、空状态、真实 Markdown 下载');

  await page.locator('#tab-hook').click();
  await page.locator('#hook-scenario').selectOption('secret');
  for(let i=0;i<5;i++)await page.locator('#hook-next').click();
  assert.equal(await page.locator('#hook-output').innerText(),'demo_key=[已隐藏]');
  assert.equal(await page.locator('#hook-next').isDisabled(),true);
  await page.locator('#hook-scenario').selectOption('blocked');
  await page.locator('#hook-next').click();await page.locator('#hook-next').click();
  assert.equal(await page.locator('#hook-next').isDisabled(),true);
  assert.equal(await page.locator('#hook-log li').count(),2);
  assert.doesNotMatch(await page.locator('#hook-log').innerText(),/模拟工具：读取完成/);
  await page.locator('#hook-scenario').selectOption('normal');
  for(let i=0;i<5;i++)await page.locator('#hook-next').click();
  assert.match(await page.locator('#hook-output').innerText(),/本地模拟/);
  check('Hook 普通、脱敏、越界阻止三分支及完成后禁用');

  await page.locator('#tab-office').click();
  for(let i=0;i<5;i++)await page.locator('#office-next').click();
  assert.equal(await page.locator('#agent-status').innerText(),'等你确认');
  assert.equal(await page.locator('#office-next').isDisabled(),true);
  assert.equal(await page.locator('#office-approve').isVisible(),true);
  await page.locator('#office-approve').click();
  assert.equal(await page.locator('#agent-status').innerText(),'执行中');
  await page.locator('#office-next').click();await page.locator('#office-next').click();
  assert.equal(await page.locator('.agent[data-status="done"]').count(),3);
  await page.locator('#office-fail').click();assert.equal(await page.locator('#agent-status').innerText(),'执行失败');
  await page.locator('#office-reset').click();
  await page.locator('#office-offline').click();assert.match(await page.locator('#agent-status').innerText(),/状态未知/);
  await page.locator('#office-reset').click();
  await page.locator('#office-play').click();
  await page.waitForFunction(()=>document.getElementById('office-step').textContent.includes('2 /'));
  await page.locator('#office-play').click();
  const step=await page.locator('#office-step').innerText();await page.waitForTimeout(1750);
  assert.equal(await page.locator('#office-step').innerText(),step);
  await page.locator('#office-reset').click();
  for(let i=0;i<5;i++)await page.locator('#office-next').click();
  if(!remote)await page.locator('#demo-office').screenshot({path:path.join(root,'assets','office-demo.png')});
  check('办公室事件、权限等待、人工续接、失败、失联、重置和自动回放暂停');

  await page.locator('#tab-companion').click();
  await page.locator('[data-pet="done"]').click();
  assert.equal(await page.locator('.memory-card:disabled').count(),8);
  assert.match(await page.locator('#game-message').innerText(),/不代表/);
  await page.locator('#game-reset').click();assert.equal(await page.locator('.memory-card:disabled').count(),8);
  await page.locator('[data-pet="working"]').click();
  const known=new Map();
  for(let i=0;i<8;i+=2){
    await page.locator(`[data-card="${i}"]`).click();await page.locator(`[data-card="${i+1}"]`).click();
    for(const n of [i,i+1]){const symbol=await page.locator(`[data-card="${n}"]`).innerText();if(!known.has(symbol))known.set(symbol,[]);known.get(symbol).push(n);}
    await page.waitForTimeout(850);
  }
  for(const indices of known.values()){
    if(await page.locator(`[data-card="${indices[0]}"]`).isDisabled())continue;
    await page.locator(`[data-card="${indices[0]}"]`).click();await page.locator(`[data-card="${indices[1]}"]`).click();
  }
  assert.equal(await page.locator('#game-score').innerText(),'配对 4 / 4');
  assert.match(await page.locator('#game-message').innerText(),/不代表任务已完成/);
  await page.locator('[data-pet="waiting"]').click();assert.match(await page.locator('#pet-message').innerText(),/已暂停/);
  check('翻牌可完成、重洗牌、等待与完成事件暂停游戏，状态不混淆');

  await page.locator('#tab-review').click();
  for(const [value,text] of [['incomplete','缺少运行证据'],['complete','1 项待人工审阅'],['failed','检查失败']]){
    await page.locator('#review-scenario').selectOption(value);await page.locator('#review-run').click();
    assert.match(await page.locator('#review-result').innerText(),new RegExp(text));
  }
  await page.locator('#tab-review').focus();await page.keyboard.press('Home');
  assert.equal(await page.locator('#tab-hook').getAttribute('aria-selected'),'true');
  await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#tab-office').getAttribute('aria-selected'),'true');
  check('三种验收样本、人工审阅边界、键盘切换演示');

  for(const width of [1440,1024,768,390,320]){
    await page.setViewportSize({width,height:950});
    for(const demo of ['hook','office','companion','review']){
      await page.locator('#tab-'+demo).click();
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${width} ${demo} overflow`);
    }
  }
  await page.setViewportSize({width:390,height:844});await page.goto(base);
  if(!remote)await page.screenshot({path:path.join(root,'assets','mobile.png')});
  await page.setViewportSize({width:1440,height:1050});await page.goto(base);
  if(!remote)await page.screenshot({path:path.join(root,'assets','cover.png')});
  await page.goto(base+'#products');assert.equal(await page.locator('#products').isVisible(),true);
  await page.reload();assert.match(page.url(),/#products$/);
  check('五档宽度、四演示无横向溢出，手机与桌面截图，章节刷新');

  for(const href of await page.locator('a[href^="#"]').evaluateAll(nodes=>nodes.map(x=>x.getAttribute('href')))){
    assert.equal(await page.locator(href).count(),1,href);
  }
  assert.deepEqual(errors,[]);
  check('内部锚点、资源响应与浏览器运行无错误');
  await mkdir(path.join(root,'notes','evidence'),{recursive:true});
  await writeFile(path.join(root,'notes','evidence',remote?'remote-browser.json':base.includes('_site')?'integration.json':'browser.json'),JSON.stringify({date:new Date().toISOString(),url:base,checks,errors,scope:'原创静态网页与固定样本模拟；未接入真实 agent 或运行上游软件。'},null,2)+'\n');
} finally {await browser.close();}
