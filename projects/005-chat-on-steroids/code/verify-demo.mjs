// Browser verification of the original exhibit, not of the upstream application.
import assert from 'node:assert/strict';
import {writeFile, mkdir} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:8767/projects/005-chat-on-steroids/demo/';
const reportName = process.argv[3] || 'browser-qa.json';
const published = new URL(base).protocol === 'https:';
assert.match(reportName, /^[a-z-]+\.json$/);
const browser = await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {channel:'msedge'})});
const page = await browser.newPage({viewport:{width:1500,height:1150},deviceScaleFactor:1});
page.setDefaultTimeout(Number(process.env.RESOURCE_TIMEOUT_MS || 60000));
page.setDefaultNavigationTimeout(Number(process.env.RESOURCE_TIMEOUT_MS || 60000));
const errors=[], checks=[];
page.on('pageerror', error=>errors.push(error.message));
page.on('response', response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
const noOverflow = async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1), `Overflow: ${page.url()}`);
const choosePage = async id=>{await page.locator(`[data-page="${id}"]`).click();await page.locator(`[data-view="${id}"]`).waitFor({state:'visible'});};
let sourceCommit=null;
try {
  await mkdir(resolve(project,'assets'),{recursive:true});
  assert.equal((await page.goto(base)).status(),200);
  if(published){
    const buildURL=new URL('../build.json',base);buildURL.searchParams.set('verify',String(Date.now()));
    const response=await page.request.get(buildURL.href);assert.equal(response.status(),200);
    const build=await response.json();sourceCommit=build.commit;
    if(process.env.EXPECTED_COMMIT)assert.equal(sourceCommit,process.env.EXPECTED_COMMIT);
    assert.equal(build.projects.length,5);
    for(const slug of build.projects)assert.equal((await page.request.get(new URL(`../${slug}/`,base).href)).status(),200,slug);
    const siteResponse=await page.request.get(new URL('../',base).href);
    assert.match(await siteResponse.text(),/把网页版 ChatGPT 与真实本地环境关联/);
    const png=await page.request.get(new URL('assets/understanding-map.png',base).href);
    assert.equal(png.status(),200);
    const sha=data=>createHash('sha256').update(data).digest('hex');
    assert.equal(sha(await png.body()),sha(await readFile(resolve(project,'assets/understanding-map.png'))));
    checks.push('公网发布版本、五个展厅入口、总站摘要与总览图字节一致性');
  }
  assert.match(await page.locator('h1:visible').textContent(),/组织成能执行任务/);
  assert.match(await page.locator('#drive-panel h3').textContent(),/CoS 驱动 ChatGPT/);
  await noOverflow();
  await page.screenshot({path:resolve(project,'assets/cover.png'),fullPage:true});
  await page.locator('[data-drive="web"]').click();
  assert.match(await page.locator('#drive-panel h3').textContent(),/驱动其他网页/);
  assert.match(await page.locator('#drive-panel').textContent(),/ChatGPT 服务端 → MCP/);
  assert.equal(await page.locator('[data-drive][aria-pressed=true]').count(),1);
  await page.locator('[data-drive="chat"]').focus();await page.keyboard.press('Enter');
  assert.match(await page.locator('#drive-panel h3').textContent(),/CoS 驱动 ChatGPT/);
  checks.push('两种浏览器驱动方向、单项选中状态及键盘切换');
  assert.equal(await page.locator('.locations article').count(),3);
  assert.equal(await page.locator('.channels article').count(),3);
  assert.match(await page.locator('.channels').textContent(),/HTTP/);
  assert.match(await page.locator('.channels').textContent(),/WebSocket/);
  checks.push('三处角色位置、两条独立通道及目标网页组合链说明');

  await choosePage('map');
  await page.locator('#map-image').evaluate(img=>img.decode());
  const imageSize=await page.locator('#map-image').evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight}));
  assert.ok(imageSize.width>=1000&&imageSize.height>=1400);
  const mapWidth=await page.locator('#map-image').evaluate(img=>img.clientWidth);
  assert.equal(await page.locator('#map-minus').isDisabled(),true);
  await page.locator('#map-plus').focus();await page.keyboard.press('Enter');
  assert.equal(await page.locator('#map-scale').textContent(),'125%');
  assert.ok(await page.locator('#map-image').evaluate(img=>img.clientWidth)>mapWidth);
  for(let i=0;i<7;i++)await page.locator('#map-plus').click();
  assert.equal(await page.locator('#map-plus').isDisabled(),true);
  assert.equal(await page.locator('#map-scale').textContent(),'300%');
  await page.locator('#map-viewport').evaluate(node=>{node.scrollLeft=200;});
  assert.ok(await page.locator('#map-viewport').evaluate(node=>node.scrollLeft)>0);
  await noOverflow();
  await page.locator('#map-minus').click();
  assert.equal(await page.locator('#map-scale').textContent(),'275%');
  await page.locator('#map-fit').click();
  assert.equal(await page.locator('#map-image').evaluate(img=>img.clientWidth),mapWidth);
  assert.equal(await page.locator('#map-viewport').evaluate(node=>node.scrollLeft),0);
  const imageURL=await page.locator('.map-toolbar a').getAttribute('href');
  assert.equal((await page.request.get(new URL(imageURL,base).href)).status(),200);
  await page.reload();await page.locator('[data-view=map]').waitFor({state:'visible'});
  await page.locator('#map-image').evaluate(img=>img.decode());
  await page.screenshot({path:resolve(project,'assets/map-view.png'),fullPage:true});
  checks.push(`总览图 ${imageSize.width}×${imageSize.height} 加载、键盘缩放、上下限、局部滚动、适应宽度、原图与刷新`);

  await choosePage('capabilities');
  assert.equal(await page.locator('[data-cap]').count(),8);
  for(const id of ['files','chat','browser','desktop','agents','goal','resume','plugins']) {
    await page.locator(`[data-cap="${id}"]`).click();
    assert.equal(await page.locator('[data-cap][aria-pressed=true]').count(),1);
    assert.match(await page.locator('#cap-detail').textContent(),/使用前提/);
    assert.match(await page.locator('#cap-detail a').getAttribute('href'),/2f9acf307189ed1f05bee0cdc97871fdcff1d8f5/);
  }
  await page.locator('[data-cap="browser"]').focus();await page.keyboard.press('Enter');
  assert.match(await page.locator('#cap-detail h2').textContent(),/直接操作浏览器/);
  checks.push('八项能力、实现前提、限制、固定来源及键盘选择');

  await choosePage('workflow');
  assert.equal(await page.locator('#prev').isDisabled(),true);
  assert.equal(await page.locator('#step-list li').count(),6);
  for(let i=0;i<5;i++)await page.locator('#next').click();
  assert.equal(await page.locator('#next').isDisabled(),true);
  assert.match(await page.locator('#step-detail').textContent(),/未执行上述修复/);
  await page.locator('#prev').click();
  assert.match(await page.locator('#step-detail h2').textContent(),/网页里验证/);
  await page.screenshot({path:resolve(project,'assets/workflow.png'),fullPage:true});
  await page.locator('#outcome').selectOption('blocked');
  assert.equal(await page.locator('#step-counter').textContent(),'01 / 02');
  await page.locator('#next').click();
  assert.equal(await page.locator('#next').isDisabled(),true);
  assert.equal(await page.locator('#step-list li').count(),2);
  assert.match(await page.locator('#step-detail').textContent(),/没有修改代码，没有运行测试/);
  await page.locator('#reset').click();
  assert.equal(await page.locator('#prev').isDisabled(),true);
  await page.locator('#outcome').selectOption('success');
  assert.equal(await page.locator('#step-counter').textContent(),'01 / 06');
  checks.push('成功六步、前后边界、受阻停止、分支重置与教学样本标识');

  await choosePage('value');
  assert.equal(await page.locator('tbody tr').count(),6);
  assert.match(await page.locator('.recommendation').textContent(),/与真实本地环境关联，构建 Agent 能力/);
  await choosePage('evidence');
  assert.equal(await page.locator('.source-row').count(),12);
  assert.match(await page.locator('.discrepancy').textContent(),/Chrome 125/);
  await page.reload();
  await page.locator('[data-view=evidence]').waitFor({state:'visible'});
  assert.equal(await page.locator('[aria-current=page]').count(),1);
  await choosePage('value');await page.goBack();
  await page.locator('[data-view=evidence]').waitFor({state:'visible'});
  await page.goto(base+'#unknown');
  await page.locator('[data-view=overview]').waitFor({state:'visible'});
  checks.push('Codex 对比、证据边界、深链接刷新、浏览器返回与未知路由回退');

  const resources = await page.locator('a[href^="../"],link[rel="stylesheet"],script[src],img[src]').evaluateAll(nodes=>[...new Set(nodes.map(node=>node.href||node.src))]);
  // Evidence reports are created by this script or the subsequent integration check.
  const pending = /\/(browser-qa|integration)\.json$/;
  for(const url of resources.filter(url=>!pending.test(url)))assert.equal((await page.request.get(url)).status(),200,url);
  checks.push('当前展厅静态资源与文档可访问（本次生成的证据由后续集成检查覆盖）');

  for(const width of [390,768]) {
    await page.setViewportSize({width,height:844});
    for(const id of ['overview','map','capabilities','workflow','value','evidence']) {
      await choosePage(id);await noOverflow();
      if(id==='map'){await page.locator('#map-plus').click();await noOverflow();await page.locator('#map-fit').click();}
      if(id==='overview'&&width===390)await page.screenshot({path:resolve(project,'assets/mobile.png'),fullPage:true});
    }
  }
  checks.push('390px / 768px 六章节布局没有页面级横向溢出');
  await page.goto(pathToFileURL(resolve(project,'demo/index.html')).href+'#workflow');
  await page.locator('[data-view=workflow]').waitFor({state:'visible'});
  await page.locator('#next').click();
  assert.equal(await page.locator('#step-counter').textContent(),'02 / 06');
  checks.push('file:// 直接打开及流程交互');
  assert.deepEqual(errors,[]);
  const report={verifiedAt:new Date().toISOString(),url:base,browser:await browser.version(),sourceCommit,checks,browserErrors:errors,published,scope:'原创静态展厅与资源；固定样本不调用模型、上游应用或真实工具。'};
  await writeFile(resolve(project,'notes/evidence',reportName),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
} finally { await browser.close(); }
