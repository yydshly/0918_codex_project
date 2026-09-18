"""Fetch immutable upstream references; retain hashes, metadata and the MIT notice only."""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
from urllib.request import Request, urlopen

PROJECT = Path(__file__).resolve().parents[1]
COMMIT = '2f9acf307189ed1f05bee0cdc97871fdcff1d8f5'
REPO = 'https://github.com/totec448-spec/chat-on-steroids'
FILES = ['README.md', 'LICENSE', 'package.json', 'AGENTS.md', 'SECURITY.md',
         'docs/setup.md', 'docs/tool-surface.md', 'docs/plugins.md',
         'extension/manifest.json', 'extension/fiber.js', 'extension/browser-control.js',
         'src/main/mcp/server.ts', 'src/main/mcp/surfaces.ts', 'src/main/mcp/tools-browser.ts',
         'src/main/mcp/code-mode-runtime.ts', 'src/main/agents.ts', 'src/main/goal.ts',
         'src/main/session/handoff.ts', 'src/main/session/continuation.ts',
         'src/main/durable.ts', 'src/main/plugins/manager.ts',
         'src/main/bridge.ts', 'src/main/browser-wake.ts', 'extension/background.js', 'src/main/session/input.ts']

def fetch(path):
    url = f'https://raw.githubusercontent.com/totec448-spec/chat-on-steroids/{COMMIT}/{path}'
    with urlopen(Request(url, headers={'User-Agent': 'open-source-research'}), timeout=40) as response:
        data = response.read()
    if path == 'LICENSE':
        (PROJECT / 'licenses').mkdir(exist_ok=True)
        (PROJECT / 'licenses/upstream.LICENSE').write_bytes(data)
    return {'path': path, 'url': f'{REPO}/blob/{COMMIT}/{path}',
            'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}, data

if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=5) as pool:
        fetched = list(pool.map(fetch, FILES))
    contents = {item['path']: data for item, data in fetched}
    package = json.loads(contents['package.json'])
    manifest = json.loads(contents['extension/manifest.json'])
    assert b'MIT License' in contents['LICENSE']
    assert b'chrome.debugger.sendCommand' in contents['extension/browser-control.js']
    assert b'browser_snapshot' in contents['src/main/mcp/tools-browser.ts']
    assert b'127.0.0.1' in contents['src/main/mcp/server.ts']
    report = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'upstream': REPO,
              'commit': COMMIT, 'declaredVersion': package['version'], 'license': package['license'],
              'extensionMinimumChrome': manifest['minimum_chrome_version'],
              'scope': '固定提交文件可访问、元数据与关键实现存在；没有编译或运行上游应用，也不证明已发布版本。',
              'sources': [item for item, _ in fetched]}
    output = PROJECT / 'notes/evidence/sources.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({key: report[key] for key in ['commit', 'declaredVersion', 'license', 'extensionMinimumChrome']}, ensure_ascii=False))
    print(f'Fetched {len(fetched)} immutable source files; upstream was not executed.')
