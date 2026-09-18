import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base=process.argv[2]||'http://127.0.0.1:8770/projects/011-selfteaching/demo/';
const record=process.argv[3]||'map-browser.json';
assert.match(record,/^[a-z-]+\.json$/);
const source=await readFile(path.join(root,'assets/understanding-map.png'));
const hash=buffer=>createHash('sha256').update(buffer).digest('hex');
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
try{
 await page.goto(base+'#book-map');
 await page.locator('#book-map img').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>document.querySelector('#book-map img').naturalWidth>0);
 assert.match(await page.locator('#book-map').textContent(),/非原书插图/);
 assert.equal(await page.locator('#book-map a[href="overview.html"]').count(),2);
 await page.goto(new URL('overview.html',base).href);
 await page.waitForFunction(()=>document.querySelector('#map').naturalWidth>0);
 const dimensions=await page.locator('#map').evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight}));
 assert.ok(dimensions.width>=1500&&dimensions.height>=1000);
 const imgURL=await page.locator('#map').evaluate(img=>img.src);
 const response=await page.request.get(imgURL);
 assert.equal(response.status(),200);
 assert.equal(hash(await response.body()),hash(source));
 checks.push('指南嵌入、图片原始分辨率与下载资源字节一致');
 const width=()=>page.locator('#map').evaluate(img=>img.getBoundingClientRect().width);
 const fitted=await width();
 await page.locator('#zoom-in').click();assert.ok(await width()>fitted);
 await page.locator('#zoom-out').click();assert.ok(Math.abs(await width()-fitted)<2);
 await page.locator('#actual').click();assert.equal(Math.round(await width()),dimensions.width);
 await page.locator('#fit').click();assert.ok(Math.abs(await width()-fitted)<2);
 await page.locator('#zoom-in').focus();await page.keyboard.press('Enter');assert.ok(await width()>fitted);
 const downloadPromise=page.waitForEvent('download');
 await page.locator('a[download][href$=".png"]').click();
 const download=await downloadPromise;
 assert.equal(hash(await readFile(await download.path())),hash(source));
 checks.push('缩放、适应窗口、原始大小、键盘与原图下载通过');
 for(const size of [{width:1440,height:1000},{width:390,height:844},{width:320,height:800}]){
  await page.setViewportSize(size);await page.locator('#fit').click();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.ok(await page.locator('#viewer').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
  await page.locator('#actual').click();
  assert.ok(await page.locator('#viewer').evaluate(el=>el.scrollWidth>el.clientWidth));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 checks.push('桌面及 390/320px 手机宽度适应，原图在容器内滚动');
 for(const href of await page.locator('footer a').evaluateAll(links=>links.map(a=>a.href))){
  assert.equal((await page.request.get(href)).status(),200);
 }
 const nojs=await browser.newPage({javaScriptEnabled:false});
 await nojs.goto(new URL('overview.html',base).href);
 assert.equal(await nojs.locator('#map').isVisible(),true);await nojs.close();
 checks.push('说明与返回链接可访问；关闭 JavaScript 仍显示图像');
 assert.deepEqual(errors,[]);
 await writeFile(path.join(root,'notes/evidence',record),JSON.stringify({checkedAt:new Date().toISOString(),url:base,dimensions,sha256:hash(source),checks,errors,scope:'所列 URL 的原创总结图与网页；未运行上游 Notebook'},null,2)+'\n');
 console.log(JSON.stringify({passed:true,dimensions,checks},null,2));
}finally{await browser.close()}
