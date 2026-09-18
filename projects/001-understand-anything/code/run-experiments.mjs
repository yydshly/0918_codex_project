import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, resolve, join, posix } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { stripTypeScriptTypes } from 'node:module';

const PIN = '6df3065f1d8ddc2ce3615314d1d493f36d6b1c80';
const here = dirname(fileURLToPath(import.meta.url));
const project = resolve(here, '..');
const fixture = join(here, 'fixture');
const upstream = process.argv[2] && resolve(process.argv[2]);
if (!upstream) throw new Error('Usage: node code/run-experiments.mjs <upstream-checkout>');
const revision = execFileSync('git', ['-C', upstream, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
assert.equal(revision, PIN, 'Use the pinned upstream revision');
assert.equal(execFileSync('git', ['-C', upstream, 'diff', 'HEAD', '--'], { encoding: 'utf8' }), '', 'Upstream tracked files must be unchanged');
const plugin = join(upstream, 'understand-anything-plugin');
const core = await import(pathToFileURL(join(plugin, 'packages/core/dist/index.js')));
const { buildDiffContext } = await import(pathToFileURL(join(plugin, 'src/diff-analyzer.ts')));
const annotations = JSON.parse(await readFile(join(here, 'annotations.json'), 'utf8'));
const files = Object.keys(annotations);
const sources = Object.fromEntries(await Promise.all(files.map(async path => [path, await readFile(join(fixture, path), 'utf8')])));
const evidenceDir = join(project, 'notes/evidence');
await mkdir(evidenceDir, { recursive: true });
const parser = new core.TreeSitterPlugin();
await parser.init();
const registry = new core.PluginRegistry();
registry.register(parser);
core.registerAllParsers(registry);
const structures = Object.fromEntries(files.map(path => [path, registry.analyzeFile(path, sources[path])]));
const calls = Object.fromEntries(files.map(path => [path, registry.extractCallGraph(path, sources[path]) ?? []]));
const checks = [];
function check(id, name, fn) { fn(); checks.push({ id, name, passed: true }); }
check('symbols', 'Tree-sitter 提取 5 个函数及其行号', () => {
  assert.equal(files.flatMap(path => structures[path].functions).length, 5);
  for (const path of files.filter(path => path.endsWith('.ts'))) {
    const fn = structures[path].functions.find(fn => fn.name === annotations[path].symbol);
    assert.ok(fn && fn.lineRange[0] > 0);
  }
});
check('sql', 'SQLParser 提取 orders 表和三个字段', () => {
  const table = structures['schema.sql'].definitions[0];
  assert.equal(table.name, 'orders'); assert.equal(table.fields.length, 3);
});
const builder = new core.GraphBuilder('Order Lab · 确定性解析实验', '');
for (const path of files) {
  const meta = { summary: annotations[path].summary, tags: [annotations[path].layer], complexity: 'simple' };
  if (path.endsWith('.ts')) builder.addFileWithAnalysis(path, structures[path], {
    ...meta, fileSummary: meta.summary, summaries: { [annotations[path].symbol]: meta.summary },
  });
  else builder.addNonCodeFileWithAnalysis(path, { ...meta, nodeType: 'schema', ...structures[path] });
}
// Research adapter: only direct relative named imports in this fixture.
// This is not the upstream multi-agent merge/resolution pipeline.
for (const path of files.filter(path => path.endsWith('.ts'))) {
  const imports = structures[path].imports.map(item => ({ ...item, target: posix.normalize(posix.join(posix.dirname(path), item.source)) + '.ts' }));
  for (const item of imports) if (sources[item.target]) builder.addImportEdge(path, item.target);
  for (const call of calls[path]) {
    const local = structures[path].functions.some(fn => fn.name === call.callee);
    const target = local ? path : imports.find(item => item.specifiers.includes(call.callee))?.target;
    if (target && structures[target]?.functions.some(fn => fn.name === call.callee)) builder.addCallEdge(path, call.caller, target, call.callee);
  }
}
const graph = builder.build();
graph.project.description = '结构来自上游核心库实测；中文摘要、分层和导览由本研究编写，未执行上游 LLM 流水线。';
graph.layers = ['入口', '业务', '基础设施', '数据'].map((name, i) => ({
  id: `layer-${i}`, name, description: '研究者注释层', nodeIds: graph.nodes.filter(node => annotations[node.filePath]?.layer === name).map(node => node.id),
}));
graph.tour = ['src/api.ts', 'src/orders.ts', 'src/inventory.ts', 'src/payment.ts', 'src/repository.ts'].map((path, i) => ({
  order: i + 1, title: annotations[path].symbol, description: annotations[path].summary, nodeIds: [`function:${path}:${annotations[path].symbol}`],
}));
check('graph', 'GraphBuilder 组装 12 节点、4 条导入和 4 条调用关系', () => {
  assert.equal(graph.nodes.length, 12);
  assert.equal(graph.edges.filter(edge => edge.type === 'imports').length, 4);
  assert.equal(graph.edges.filter(edge => edge.type === 'calls').length, 4);
  assert.ok(core.validateGraph(graph).success);
  const ids = new Set(graph.nodes.map(node => node.id));
  assert.equal(ids.size, graph.nodes.length);
  for (const edge of graph.edges) assert.ok(ids.has(edge.source) && ids.has(edge.target));
});
const impact = Object.fromEntries(files.map(path => [path, buildDiffContext(graph, [path])]));
check('impact', '支付文件变化只返回一跳邻居：订单受影响，入口不在结果中', () => {
  const affected = impact['src/payment.ts'].affectedNodes;
  assert.ok(affected.some(node => node.filePath === 'src/orders.ts'));
  assert.ok(!affected.some(node => node.filePath === 'src/api.ts'));
});
const search = new core.SearchEngine(graph.nodes);
const searchResults = ['chargePayment', '库存', '不存在的符号xyz'].map(query => ({ query, results: search.search(query) }));
check('search', '上游 Fuse 搜索定位支付函数，未知词返回空结果', () => {
  assert.ok(searchResults[0].results.some(item => item.nodeId.endsWith(':chargePayment')));
  assert.equal(searchResults[2].results.length, 0);
});
const baseline = sources['src/inventory.ts'];
const modified = baseline.replace('<= 100', '<= 10');
const fingerprint = source => core.extractFileFingerprint('src/inventory.ts', source, registry.analyzeFile('src/inventory.ts', source));
const changes = {
  identical: core.compareFingerprints(fingerprint(baseline), fingerprint(baseline)),
  bodyOnly: core.compareFingerprints(fingerprint(baseline), fingerprint(modified)),
  signature: core.compareFingerprints(fingerprint(baseline), fingerprint(baseline.replace('quantity: number', 'quantity: number, limit: number'))),
};
const beforeModule = await import('data:text/javascript,' + encodeURIComponent(stripTypeScriptTypes(baseline)));
const afterModule = await import('data:text/javascript,' + encodeURIComponent(stripTypeScriptTypes(modified)));
const behavior = { quantity: 50, before: beforeModule.reserveStock(50), after: afterModule.reserveStock(50) };
const decision = core.classifyUpdate({ newFiles: [], deletedFiles: [], structurallyChangedFiles: [], cosmeticOnlyFiles: ['src/inventory.ts'] }, files.length);
check('fingerprint', '识别函数签名变化；函数体阈值变化被归类 COSMETIC', () => {
  assert.equal(changes.identical.changeLevel, 'NONE');
  assert.equal(changes.signature.changeLevel, 'STRUCTURAL');
  assert.equal(changes.bodyOnly.changeLevel, 'COSMETIC');
  assert.equal(behavior.before, true); assert.equal(behavior.after, false);
  assert.equal(decision.action, 'SKIP');
});
// Execute the upstream bundled extraction entrypoint as well, with real files.
const scratch = await mkdtemp(join(tmpdir(), 'ua-research-'));
const input = join(scratch, 'input.json');
await writeFile(input, JSON.stringify({ projectRoot: fixture, batchFiles: files.map(path => ({ path, language: path.endsWith('.ts') ? 'typescript' : 'sql', sizeLines: sources[path].split('\n').length, fileCategory: path.endsWith('.ts') ? 'code' : 'data' })), batchImportData: {} }));
const extractionLog = execFileSync(process.execPath, [join(plugin, 'skills/understand/extract-structure.mjs'), input, join(evidenceDir, 'extraction.json')], { encoding: 'utf8' });
const extraction = JSON.parse(await readFile(join(evidenceDir, 'extraction.json'), 'utf8'));
check('entrypoint', '上游 extract-structure 入口处理全部 6 个文件', () => {
  assert.equal(extraction.filesAnalyzed, 6);
  assert.deepEqual(extraction.filesUnreadable, []);
  assert.deepEqual(extraction.filesSkipped, []);
});
const report = {
  upstream: { repository: 'https://github.com/Egonex-AI/Understand-Anything', commit: PIN, license: 'MIT' },
  generatedAt: new Date().toISOString(), runtime: { node: process.version, platform: process.platform, arch: process.arch },
  fixtureHash: createHash('sha256').update(JSON.stringify(sources)).digest('hex'),
  scope: '上游核心库与提取脚本实测；没有运行完整多 Agent / LLM 流水线。',
  provenance: { structure: 'upstream-parser', graph: 'upstream-GraphBuilder + fixture-only import/call adapter', summaries: 'research-authored', layers: 'research-authored', tour: 'research-authored', impact: 'upstream-buildDiffContext', demoSearch: 'local substring filter', upstreamSearch: 'upstream-SearchEngine (recorded experiment)' },
  counts: { files: files.length, nodes: graph.nodes.length, edges: graph.edges.length },
  checks, searchResults, fingerprints: { changes, behavior, decision }, extractionLog: extractionLog.trim(),
};
for (const [name, value] of Object.entries({ 'graph.json': graph, 'experiments.json': report, 'structures.json': { structures, calls }, 'impact.json': impact })) {
  await writeFile(join(evidenceDir, name), JSON.stringify(value, null, 2) + '\n');
}
// A small checked-in snapshot makes the demo work via file:// and under a Pages subpath.
await writeFile(join(project, 'demo/data.js'), 'window.UA_RESEARCH = ' + JSON.stringify({ graph, report, impact, sources, annotations }, null, 2) + ';\n');
console.log(JSON.stringify({ checks: checks.length, ...report.counts, behavior, bodyOnly: changes.bodyOnly.changeLevel, decision: decision.action }, null, 2));
