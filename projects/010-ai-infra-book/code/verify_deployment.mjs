import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL,fileURLToPath} from 'node:url';
import path from 'node:path';
const project=fileURLToPath(new URL('../',import.meta.url));
const repo=path.resolve(project,'../..');
const base=(process.argv[2]||'https://yydshly.github.io/0918_codex_project/').replace(/\/?$/,'/');
const record=process.argv[3];
const {request}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const context=await request.newContext({timeout:60000});
const checks=[];
async function get(suffix){const r=await context.get(base+suffix);assert.equal(r.status(),200,suffix);checks.push({path:suffix,status:r.status()});return r}
try{
 const manifest=JSON.parse(await readFile(path.join(repo,'site-projects.json'),'utf8'));
 const build=await (await get('build.json?check='+Date.now())).json();
 if(process.env.EXPECTED_COMMIT)assert.equal(build.commit,process.env.EXPECTED_COMMIT);
 assert.deepEqual(build.projects,[...manifest.map(x=>x.slug)].sort());
 const html=await (await get('')).text();
 const entry=manifest.find(x=>x.slug==='010-ai-infra-book');assert.ok(html.includes(entry.summary));
 for(const item of manifest){assert.ok(html.includes(item.slug+'/'));await get(item.slug+'/')}
 const prefix='010-ai-infra-book/';
 for(const suffix of ['overview.html','styles.css','app.js','overview.js','README.md','demo/README.md','notes/understanding.md','notes/research.md','notes/evidence/upstream.json'])await get(prefix+suffix);
 const source=await (await get(prefix+'index.html')).text();
 assert.ok(source.includes('本地模型显存不足或速度慢、评估多人服务成本，以及微调训练受资源限制'));
 const image=await (await get(prefix+'assets/understanding-map.png')).body();
 const local=await readFile(path.join(project,'assets/understanding-map.png'));
 assert.deepEqual(image,local);
 const result={verifiedAt:new Date().toISOString(),base,commit:build.commit,projects:build.projects,summary:entry.summary,checks,imageSha256:createHash('sha256').update(image).digest('hex'),scope:'核验总站摘要、所有编号入口、010 文档与静态资源、完整理解图字节一致性；交互另见 remote-browser.json。未运行上游模型或 GPU 实验。'};
 if(record)await writeFile(record,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({passed:true,commit:build.commit,projects:build.projects.length,httpChecks:checks.length,imageSha256:result.imageSha256}));
}finally{await context.dispose()}
