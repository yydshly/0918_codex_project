// Optional UI QA. Requires Playwright plus Microsoft Edge, or CHROME_PATH.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:8766/projects/002-claude-code-best-practice/demo/';
const browser = await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {channel:'msedge'})});
const page = await browser.newPage({viewport:{width:1500,height:1100},deviceScaleFactor:1});
const errors = [], checks = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
async function hasNoOverflow() {
  const layout = await page.evaluate(() => ({width:innerWidth, document:document.documentElement.scrollWidth, offenders:[...document.querySelectorAll('main *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(el=>`${el.tagName}.${el.className}`)}));
  assert.ok(layout.document <= layout.width + 1, `${page.url()} ${JSON.stringify(layout)}`);
}
try {
  await page.goto(base);
  await page.locator('#map-image').evaluate(img=>img.decode());
  assert.match(await page.locator('h1').textContent(),/Claude Code 使用指南＋配置示例集/);
  assert.match(await page.locator('.callout').first().textContent(),/对我们的直接参考价值不大/);
  const mapWidth = await page.locator('#map-image').evaluate(img=>img.clientWidth);
  await page.locator('#map-plus').click();
  assert.ok(await page.locator('#map-image').evaluate(img=>img.clientWidth)>mapWidth);
  await page.locator('#map-fit').click();
  assert.equal(await page.locator('#map-image').evaluate(img=>img.clientWidth),mapWidth);
  assert.equal(await page.locator('.guide-links a').count(),4);
  await page.screenshot({path:resolve(project,'assets/cover.png'),fullPage:true});
  checks.push('引导图作为默认入口，摘要、缩放、适应窗口及四个导读入口');
  await page.locator('[data-page="capabilities"]').click();
  await page.waitForSelector('[data-cap]');
  assert.equal(await page.locator('[data-cap]').count(), 6);
  for (const id of ['commands','agents','skills','rules','hooks','mcp']) {
    await page.locator(`[data-cap="${id}"]`).click();
    assert.equal(await page.locator(`[data-cap="${id}"]`).getAttribute('aria-pressed'), 'true');
    assert.ok((await page.locator('#cap-detail .source').getAttribute('href')).includes('73087da5e272fc197d7f9f29492d153fe1aaaefe'));
  }
  checks.push('六类能力切换及固定版本源码链接');
  await page.locator('[data-cap="commands"]').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-cap="commands"]').getAttribute('aria-pressed'), 'true');
  checks.push('键盘可操作能力卡片');
  await page.locator('[data-page="workflow"]').click();
  for(let i=0;i<5;i++) await page.locator('#next-step').click();
  assert.equal(await page.locator('#next-step').isDisabled(), true);
  assert.match(await page.locator('.weather-preview').textContent(), /26°C/);
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-svg').click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(),'weather-demo-C.svg');
  assert.match(await readFile(await download.path(),'utf8'), /26°C/);
  await page.screenshot({path:resolve(project,'assets/workflow.png'),fullPage:true});
  checks.push('五步成功流程、摄氏样本和 SVG 下载内容');
  await page.locator('#unit').selectOption('F');
  assert.equal(await page.locator('#flow-trace li').count(), 0);
  for(let i=0;i<5;i++) await page.locator('#next-step').click();
  assert.match(await page.locator('.weather-preview').textContent(), /78.8°F/);
  checks.push('单位切换重置状态，华氏样本正确');
  await page.locator('#outcome').selectOption('failure');
  for(let i=0;i<3;i++) await page.locator('#next-step').click();
  assert.equal(await page.locator('#next-step').isDisabled(),true);
  assert.equal(await page.locator('#download-svg').count(),0);
  assert.equal(await page.locator('.step-item.failed').count(),1);
  assert.match(await page.locator('#flow-detail').textContent(), /没有有效温度/);
  await page.screenshot({path:resolve(project,'assets/workflow-failure.png'),fullPage:true});
  checks.push('失败在取数步骤终止，无成功产物或下载');
  await page.locator('#reset-flow').click();
  assert.equal(await page.locator('#next-step').isEnabled(),true);
  assert.equal(await page.locator('#flow-trace li').count(),0);
  checks.push('重置清除轨迹并恢复开始状态');
  await page.locator('[data-page="mechanism"]').click();
  for(const id of ['instruction','runtime','tools','events']) {
    await page.locator(`[data-layer="${id}"]`).click();
    assert.equal(await page.locator(`[data-layer="${id}"]`).getAttribute('aria-pressed'),'true');
  }
  checks.push('四层机制切换');
  await page.locator('[data-page="adapt"]').click();
  for(const id of ['feature','bug','research']) {
    await page.locator(`[data-scenario="${id}"]`).click();
    assert.equal(await page.locator('.phase').count(),4);
    assert.equal(await page.locator(`[data-scenario="${id}"]`).getAttribute('aria-pressed'),'true');
  }
  checks.push('三种适配场景及每种四阶段内容');
  await page.locator('[data-page="evidence"]').click();
  await page.reload();
  assert.equal(await page.locator('tbody tr').count(),5);
  checks.push('哈希深链接刷新保留当前页');
  for (const width of [1500,768,390,320]) {
    await page.setViewportSize({width,height:900});
    for(const route of ['overview','capabilities','workflow','mechanism','adapt','evidence']) {
      await page.goto(`${base}#${route}`);
      await page.waitForSelector('h1');
      await hasNoOverflow();
    }
  }
  checks.push('六页在 1500 / 768 / 390 / 320px 无页面横向溢出');
  await page.setViewportSize({width:390,height:844});
  await page.goto(`${base}#overview`);
  await page.screenshot({path:resolve(project,'assets/mobile.png'),fullPage:true});
  await page.setViewportSize({width:1500,height:1100});
  await page.goto(`${base}#overview`);
  await page.evaluate(()=>document.documentElement.style.fontSize='32px');
  await hasNoOverflow();
  checks.push('桌面 200% 字号无页面横向溢出');
  await page.goto(pathToFileURL(resolve(project,'demo/index.html')).href + '#workflow');
  await page.waitForSelector('#next-step');
  await page.locator('#next-step').click();
  assert.match(await page.locator('#flow-detail').textContent(),/Command 收集输入/);
  checks.push('file:// 离线打开与交互');
  assert.deepEqual(errors,[]);
  checks.push('没有脚本异常或 HTTP 资源错误');
  const report = {date:'2026-09-18',browser:await browser.version(),url:base,checks,errors,limits:['教学模拟，不代表原版 Claude Code 端到端执行','未对外部链接服务进行可用性背书']};
  await writeFile(resolve(project,'notes/evidence/browser-qa.json'),JSON.stringify(report,null,2)+'\n');
  console.log(`${checks.length} UI checks passed.`);
} finally {await browser.close();}
