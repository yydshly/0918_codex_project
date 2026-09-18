import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repository=path.resolve(project,'../..');
const base=(process.argv[2]??'https://yydshly.github.io/0918_codex_project/').replace(/\/?$/,'/');
const manifest=JSON.parse(await readFile(path.join(repository,'site-projects.json'),'utf8'));
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();const checks=[];
async function get(suffix){const r=await page.request.get(base+suffix,{timeout:45000});assert.equal(r.status(),200,suffix);checks.push(suffix);return r;}
try{
  const build=await (await get('build.json?verify='+Date.now())).json();
  if(process.env.EXPECTED_COMMIT)assert.equal(build.commit,process.env.EXPECTED_COMMIT);
  const home=await (await get('')).text();assert.match(home,/借鉴这些机制开发自己的产品/);
  for(const p of manifest){assert.ok(build.projects.includes(p.slug));await get(p.slug+'/');}
  const prefix='012-agent-extension-lab/';
  const html=await (await get(prefix+'index.html')).text();
  assert.match(html,/借助插件与 Hook/);assert.match(html,/对我们的意义：可以基于这些开发产品/);
  for(const resource of ['app.js','data.js','styles.css','README.md','demo/README.md','THIRD_PARTY_NOTICES.md','notes/research.md','notes/understanding-map.md','assets/cover.png'])await get(prefix+resource);
  const digests={};
  for(const resource of ['assets/understanding-map.png','assets/understanding-map.svg']){
    const remote=await (await get(prefix+resource)).body();const local=await readFile(path.join(project,resource));
    assert.ok(remote.equals(local),resource+' byte identity');digests[resource]=createHash('sha256').update(remote).digest('hex');
  }
  const record={checked_at:new Date().toISOString(),url:base+prefix,source_commit:build.commit,workflow:process.env.DEPLOY_WORKFLOW_URL??null,project_count:manifest.length,resources:checks,sha256:digests,scope:'静态研究站点与原创模拟已验证；上游插件未安装运行，未连接真实 Agent。'};
  if(process.env.RECORD_DEPLOYMENT!=='0')await writeFile(path.join(project,'notes/evidence',base.includes('127.0.0.1')?'local-site.json':'deployment.json'),JSON.stringify(record,null,2)+'\n');
  console.log(`PASS ${manifest.length} project entrances, ${checks.length} resources, summary, exact map bytes, build ${build.commit}`);
}finally{await browser.close();}
