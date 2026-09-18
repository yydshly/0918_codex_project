// Feed authored JSON through browser-local response overrides to the unmodified upstream UI.
// No upstream code or server-side graph files are changed; credentials are never recorded.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const url = process.argv[2];
if (!url) throw new Error('Pass the local upstream dashboard URL printed at startup.');
const browser = await chromium.launch({headless:true,channel:'msedge'});
const checks = [], errors = [];
const base = JSON.parse(await readFile(resolve(project,'notes/evidence/graph.json'),'utf8'));
try {
  for (const kind of ['domain','knowledge','design']) {
    const fixture = JSON.parse(await readFile(resolve(project,`code/gallery-fixtures/${kind}.json`),'utf8'));
    const page = await browser.newPage({viewport:{width:1500,height:960}});
    page.on('pageerror',e=>errors.push(`${kind}: ${e.message}`));
    await page.addInitScript(()=>localStorage.setItem('ua-onboarding-dismissed-v1','1'));
    await page.route('**/knowledge-graph.json*',r=>r.fulfill({json:kind==='domain'?base:fixture}));
    await page.route('**/domain-graph.json*',r=>r.fulfill({json:kind==='domain'?fixture:null}));
    await page.route('**/config.json*',r=>r.fulfill({json:{outputLanguage:'zh',autoUpdate:false}}));
    await page.goto(url);
    await page.locator('.react-flow').waitFor();
    if (kind==='domain') {
      await page.getByRole('button',{name:'领域',exact:true}).first().click();
      await page.getByText('订单领域',{exact:true}).waitFor();
    } else if (kind==='design') {
      await page.getByText('设计系统',{exact:true}).first().click();
    }
    await page.locator('.react-flow__node').first().waitFor();
    // Wait for the async native layout to settle before fitting/capturing.
    await page.waitForTimeout(2200);
    if(kind==='design') {
      for(const cluster of ['Cluster A','Cluster B']) await page.getByRole('button').filter({hasText:cluster}).click();
      await page.getByText('提交订单按钮',{exact:true}).waitFor();
      await page.waitForTimeout(1000);
    }
    console.log(kind, 'nodes:', await page.locator('.react-flow__node').count());
    await page.getByRole('button',{name:'Fit View',exact:true}).click();
    await page.waitForTimeout(400);
    const count = await page.locator('.react-flow__node').count();
    assert.ok(count>=3,`${kind} visible nodes ${count}`);
    await page.screenshot({path:resolve(project,`assets/gallery-${kind}.png`)});
    checks.push({kind,nodes:count,fixtureNodes:fixture.nodes.length,fixtureEdges:fixture.edges.length});
    if(kind==='domain') {
      await page.getByText('订单领域',{exact:true}).dblclick();
      await page.getByText('校验商品',{exact:true}).waitFor();
      await page.waitForTimeout(800);
      await page.getByRole('button',{name:'Fit View',exact:true}).click();
      await page.waitForTimeout(400);
      assert.equal(await page.locator('.react-flow__node').count(),5);
      await page.screenshot({path:resolve(project,'assets/gallery-domain-detail.png')});
      checks.push({kind:'domain-detail',nodes:5});
    }
    await page.close();
  }
  assert.deepEqual(errors,[]);
  await writeFile(resolve(project,'notes/evidence/gallery-rendering.json'),JSON.stringify({capturedAt:new Date().toISOString(),upstreamCommit:'6df3065f1d8ddc2ce3615314d1d493f36d6b1c80',method:'Unmodified upstream dashboard with browser-local JSON response overrides',data:'Research-authored fixtures; not extracted from code, Wiki or Figma',scope:'Rendering only. No LLM, Figma API or automatic domain extraction executed.',checks,browserErrors:errors},null,2)+'\n');
} finally { await browser.close(); }
