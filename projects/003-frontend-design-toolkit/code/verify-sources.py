"""Read fixed upstream revisions and save metadata, not third-party source copies."""
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
from urllib.request import Request, urlopen

PROJECT = Path(__file__).resolve().parents[1]
SOURCES = [
    ('toolkit', 'wilwaldon/Claude-Code-Frontend-Design-Toolkit', '2a6d0958e6966e0003896f94ce5003466e89e91d', 'README.md'),
    ('skill', 'anthropics/claude-code', '31a3b00bef145a0393d9dbf840a98674fec07712', 'plugins/frontend-design/skills/frontend-design/SKILL.md'),
    ('docs', 'upstash/context7', 'dedb03d589e6e03e8fb5a2b858bd3c853ac6893e', 'README.md'),
    ('browser', 'microsoft/playwright-mcp', 'ea43eee0d95196ab31f7619b26f78d7b9c664286', 'README.md'),
    ('devtools', 'ChromeDevTools/chrome-devtools-mcp', '23b9a480010d803fc8962bb5d11017b1e2ad76b2', 'README.md'),
]

def fetch(url):
    with urlopen(Request(url, headers={'User-Agent': 'OpenSourceResearch-003'}), timeout=40) as response:
        return response.read()

records = []
texts = {}
for key, repo, sha, path in SOURCES:
    raw = f'https://raw.githubusercontent.com/{repo}/{sha}/{path}'
    body = fetch(raw)
    texts[key] = body.decode('utf-8')
    records.append({'id': key, 'repo': repo, 'commit': sha, 'path': path,
                    'url': f'https://github.com/{repo}/blob/{sha}/{path}',
                    'retrievedAt': datetime.now(timezone.utc).isoformat(),
                    'sha256': hashlib.sha256(body).hexdigest(), 'bytes': len(body)})

repo, sha = SOURCES[0][1:3]
tree_url = f'https://api.github.com/repos/{repo}/git/trees/{sha}?recursive=1'
tree = json.loads(fetch(tree_url))
assert not tree.get('truncated')
files = [entry['path'] for entry in tree['tree'] if entry['type'] == 'blob']
assert files == ['README.md'], files
assert '[MIT](LICENSE)' in texts['toolkit']
assert '@anthropic-ai/chrome-devtools-mcp' in texts['toolkit']
assert 'chrome-devtools-mcp@latest' in texts['devtools']
assert 'resolve-library-id' in texts['docs'] and 'query-docs' in texts['docs']
assert 'accessibility' in texts['browser'].lower()
assert 'plan' in texts['skill'].lower()
report = {'date': '2026-09-18', 'sources': records, 'treeURL': tree_url,
          'upstreamFiles': files,
          'checks': ['固定版本仅 README.md', 'README 声明 MIT 但无 LICENSE 文件',
                     'Toolkit Chrome DevTools 包名与官方示例不一致',
                     '代表 Skill 为设计指令', 'Context7 文档查询接口存在', 'Playwright 结构化快照说明存在'],
          'scope': '文件树与文档内容核查；未安装或执行第三方组合，未测量模型效果'}
out = PROJECT / 'notes/evidence/sources.json'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
