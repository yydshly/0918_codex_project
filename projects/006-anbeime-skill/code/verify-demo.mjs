// Verify the original research exhibit; never run an upstream skill.
import assert from 'node:assert/strict';
import {writeFile, mkdir, readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve, dirname} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const base=process.argv[2]||'http://127.0.0.1:8767/projects/006-anbeime-skill/demo/';
const reportName=process.argv[3]||'browser-qa.json';
const published=new URL(base).protocol==='https:';
const resourceTimeout=Number(process.env.RESOURCE_TIMEOUT_MS||60000);
assert.match(reportName,/^[a-z-]+\.json$/);
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{channel:'msedge'})});
const page=await browser.newPage({viewport:{width:1500,height:1100},deviceScaleFactor:1});
page.setDefaultTimeout(resourceTimeout);
page.setDefaultNavigationTimeout(resourceTimeout);
const errors=[],checks=[];
let deployment;
page.on('pageerror',error=>errors.push(error.message));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
const noOverflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal page overflow');
const choose=async route=>{await page.locator(`[data-route="${route}"]`).click();await page.locator(`[data-view="${route}"]`).waitFor({state:'visible'});await noOverflow();};
try{
  await mkdir(resolve(project,'assets'),{recursive:true});
  if(published){
    const root=new URL('../',base);
    const get=async path=>{const url=new URL(path,root).href;const response=await page.request.get(url,{timeout:resourceTimeout});assert.equal(response.status(),200,url);return response;};
    const build=await (await get(`build.json?verify=${Date.now()}`)).json();
    if(process.env.EXPECTED_COMMIT)assert.equal(build.commit,process.env.EXPECTED_COMMIT);
    const manifest=JSON.parse(await readFile(resolve(project,'../../site-projects.json'),'utf8'));
    assert.deepEqual(build.projects,manifest.map(p=>p.slug));
    const home=await (await get('')).text();
    for(const item of manifest){assert.ok(home.includes(item.slug+'/'));await get(item.slug+'/');}
    assert.ok(home.includes(manifest.at(-1).summary));
    const assets={};
    for(const name of ['understanding-map.png','understanding-map.svg']){
      const local=await readFile(resolve(project,'assets',name));
      const remote=await (await get(`006-anbeime-skill/assets/${name}`)).body();
      assert.deepEqual(remote,local,`${name} differs from local artifact`);
      assets[name]={bytes:remote.length,sha256:createHash('sha256').update(remote).digest('hex')};
    }
    for(const name of ['README.md','THIRD_PARTY_NOTICES.md','notes/capabilities.md','notes/inventory.md','notes/research.md','notes/usage.md','notes/web-landscape.md','notes/evidence/sources.json'])await get('006-anbeime-skill/'+name);
    deployment={sourceCommit:build.commit,projects:build.projects,assets};
    checks.push('公网版本、六项目入口、总站摘要、研究文档与PNG/SVG字节一致性');
  }
  assert.equal((await page.goto(base)).status(),200);
  assert.match(await page.locator('h1:visible').textContent(),/对我们参考价值有限/);
  assert.equal(await page.locator('.stats article').count(),4);
  await noOverflow();
  if(!published)await page.screenshot({path:resolve(project,'assets/cover.png')});
  for(const route of ['overview','map','websites','capabilities','inventory','workflow','evidence']){
    await choose(route);assert.equal(await page.locator('[data-view]:visible').count(),1);assert.equal(await page.locator('[data-route][aria-current="page"]').count(),1);
  }
  checks.push('七章节路由、单项选中与桌面布局');
  await choose('map');
  await page.locator('#understanding-map').evaluate(img=>img.decode());
  assert.deepEqual(await page.locator('#understanding-map').evaluate(img=>[img.naturalWidth,img.naturalHeight]),[2160,3600]);
  assert.equal(await page.locator('#map-minus').isDisabled(),true);
  await page.locator('#map-plus').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#map-scale').textContent(),'125%');
  for(let i=0;i<7;i++)await page.locator('#map-plus').click();
  assert.equal(await page.locator('#map-scale').textContent(),'300%');assert.equal(await page.locator('#map-plus').isDisabled(),true);await noOverflow();
  await page.locator('#map-reset').click();assert.equal(await page.locator('#map-scale').textContent(),'100%');
  checks.push('2160×3600总览图、键盘缩放、100%—300%边界与复位');
  await choose('websites');
  for(let i=0;i<7;i++){await page.locator(`[data-web="${i}"]`).click();assert.equal(await page.locator('[data-web][aria-pressed="true"]').count(),1);assert.match(await page.locator('#web-detail a').getAttribute('href'),/\/f21302e204d513d09763ebb291704eb9a2aaa34f\/public\//);}
  await page.locator('[data-web="4"]').focus();await page.keyboard.press('Enter');assert.match(await page.locator('#web-detail').textContent(),/mockResponses/);
  assert.equal(await page.locator('#external-sites a').count(),13);
  if(!published)await page.screenshot({path:resolve(project,'assets/websites.png')});
  checks.push('7个网页介绍、键盘选择、13个站群入口与模拟回复边界');
  await choose('capabilities');assert.equal(await page.locator('.cap-card').count(),19);
  await page.locator('#cap-search').fill('Obsidian');assert.equal(await page.locator('.cap-card').count(),1);
  await page.locator('#cap-search').fill('不存在的查找词');assert.equal(await page.locator('.empty').count(),1);
  await page.locator('#cap-search').fill('');assert.equal(await page.locator('.cap-card').count(),19);
  await choose('inventory');assert.equal(await page.locator('#skill-rows tr').count(),84);
  for(const [scope,count] of [['local',76],['other',7],['template',1]]){await page.locator('#skill-filter').selectOption(scope);assert.equal(await page.locator('#skill-rows tr').count(),count);}
  await page.locator('#skill-filter').selectOption('all');await page.locator('#skill-search').fill('archify');assert.equal(await page.locator('#skill-rows tr').count(),1);assert.match(await page.locator('#skill-rows').textContent(),/仅技能说明/);
  await page.locator('#skill-search').fill('<img src=x onerror=alert(1)>');assert.equal(await page.locator('#skill-rows img').count(),0);assert.match(await page.locator('#skill-rows').textContent(),/没有找到/);
  await page.locator('#skill-search').fill('');checks.push('19类搜索、空状态、84/76/7/1范围筛选、输入不作为HTML执行');
  await choose('workflow');
  for(const scenario of ['ppt','graph','publish']){await page.locator(`[data-scenario="${scenario}"]`).click();assert.equal(await page.locator('.journey li').count(),3);assert.equal(await page.locator('[data-scenario][aria-pressed="true"]').count(),1);}
  await choose('evidence');await page.reload();await page.locator('[data-view="evidence"]').waitFor({state:'visible'});await choose('workflow');await page.goBack();await page.locator('[data-view="evidence"]').waitFor({state:'visible'});
  checks.push('三种使用路径、深链接刷新、浏览器返回');
  for(const width of [390,768]){
    await page.setViewportSize({width,height:844});
    for(const route of ['overview','map','websites','capabilities','inventory','workflow','evidence']){await choose(route);await noOverflow();}
  }
  await page.setViewportSize({width:390,height:844});await choose('overview');if(!published)await page.screenshot({path:resolve(project,'assets/mobile.png'),fullPage:true});
  checks.push('390与768宽度七章节，无页面横向溢出；清单表格与总览图独立滚动');
  if(!published){
    await page.goto(pathToFileURL(resolve(project,'demo/index.html')).href+'#inventory');await page.locator('[data-view="inventory"]').waitFor({state:'visible'});assert.equal(await page.locator('#skill-rows tr').count(),84);
    checks.push('file://直接打开与离线数据加载');
  }
  assert.deepEqual(errors,[]);
  const report={verifiedAt:new Date().toISOString(),base,...deployment,checks,errors,viewports:[{width:1500,height:1100},{width:390,height:844},{width:768,height:844}],upstreamExecuted:false,published};
  await writeFile(resolve(project,'notes/evidence',reportName),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
