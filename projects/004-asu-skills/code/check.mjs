import {readFile,access} from 'node:fs/promises';
import {Script} from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url), entry=new URL('demo/index.html',root);
const html=await readFile(entry,'utf8');
const content=JSON.parse(await readFile(new URL('code/content.json',root),'utf8'));
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length);
for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 if(ref.startsWith('#'))assert.ok(ids.includes(ref.slice(1)),`Missing anchor ${ref}`);
 else if(ref.startsWith('.'))await access(new URL(ref,entry));
}
for(const [,js]of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new Script(js);
assert.equal(content.capabilities.length,9);
for(const c of content.capabilities)assert.ok(ids.includes('skill-'+c.id));
for(const name of ['research','understanding'])assert.ok((await readFile(new URL(`notes/${name}.md`,root),'utf8')).length>100);
assert.ok(html.includes('对当前研究与 AI 协作的价值'));
assert.ok(!html.includes('yydshly.github.io/asu-skills-guide/'),'Old standalone deployment URL');
assert.ok(!html.includes('github.com/yydshly/asu-skills-guide'),'Old standalone repository URL');
console.log('PASS 004: nine skills, JavaScript, section anchors, documents, image references and migrated links.');
