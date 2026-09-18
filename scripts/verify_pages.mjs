// Verify either the built local site or its deployed GitHub Pages equivalent.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const root=(process.argv[2]??'http://127.0.0.1:8765/_site/').replace(/\/?$/,'/');
const record=process.argv[3];
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
try{
 const response=await page.goto(root);assert.equal(response.status(),200);
 await page.getByRole('heading',{name:'把开源项目，研究明白。'}).waitFor();
 const buildResponse=await page.request.get(root+'build.json');assert.equal(buildResponse.status(),200);
 const build=await buildResponse.json();
 if(process.env.EXPECTED_COMMIT)assert.equal(build.commit,process.env.EXPECTED_COMMIT);
 checks.push('站点首页、项目导航与发布版本');
 await page.getByRole('link',{name:'进入研究展厅 ↗',exact:true}).click();
 await page.locator('#gallery-page').waitFor({state:'visible'});
 assert.equal(await page.locator('[data-gallery-entry]').count(),12);
 assert.equal(new URL(page.url()).pathname,new URL(root+'001-understand-anything/').pathname);
 checks.push('编号子路径与十二项图谱效果');
 for(const id of ['architecture','domains','steps','wiki','figma']){
  await page.locator(`[data-gallery-entry="${id}"]`).click();
  await page.locator('.gallery-native').evaluate(i=>i.decode());
  assert.equal(await page.locator('.gallery-native').evaluate(i=>i.naturalWidth),1500);
 }
 checks.push('跨目录截图资源与四类图谱原版图片');
 for(const suffix of ['code/gallery-fixtures/design.json','notes/graph-types.md','notes/comparison.md','assets/capability-map.svg','assets/capability-map.png','README.md']){
  const r=await page.request.get(root+'001-understand-anything/'+suffix);assert.equal(r.status(),200,suffix);
 }
 checks.push('样本、证据说明、研究文档与高清图可访问');
 await page.locator('[data-page=compare]').click();
 assert.equal(await page.locator('#compare-matrix tr').count(),5);
 await page.locator('[data-compare-case="4"]').click();
 assert.equal(await page.locator('.compare-recommend strong').textContent(),'Fireworks');
 await page.reload();await page.locator('#compare-page').waitFor({state:'visible'});
 checks.push('工具对比、场景选择与子路径刷新');
 await page.getByRole('link',{name:'一图总览 ↗',exact:true}).click();
 await page.locator('#overview').evaluate(i=>i.decode());
 const w=await page.locator('#overview').evaluate(i=>i.clientWidth);
 await page.locator('#zoom-in').click();assert.ok(await page.locator('#overview').evaluate(i=>i.clientWidth)>w);
 await page.locator('#fit').click();
 await page.getByRole('link',{name:'同类工具与选型',exact:true}).click();
 await page.locator('#compare-page').waitFor({state:'visible'});
 checks.push('一图总览、缩放与返回工具对比');
 await page.setViewportSize({width:390,height:844});
 for(const view of ['gallery','compare','effects','scenarios','guide','graph','pipeline','experiments','capabilities']){
  await page.locator(`[data-page="${view}"]`).click();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),view);
 }
 checks.push('九个视图的手机布局');
 assert.deepEqual(errors,[]);
 const result={verifiedAt:new Date().toISOString(),site:root,project:root+'001-understand-anything/',sourceCommit:build.commit,checks,browserErrors:errors,scope:'静态网页部署与资源、交互验证；不包含模型分析或第三方 API'};
 if(record)await writeFile(record,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
