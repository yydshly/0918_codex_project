"""Verify the published static files and record HTTP evidence (not UI tests)."""
import hashlib
import json
from pathlib import Path
import sys
from datetime import datetime, timezone
from urllib.request import Request, urlopen

PROJECT = Path(__file__).resolve().parent.parent
ROOT = PROJECT.parents[1]
BASE = 'https://yydshly.github.io/0918_codex_project/'
expected = sys.argv[1]
record = Path(sys.argv[2]) if len(sys.argv) > 2 else PROJECT / 'notes/evidence/deployment.json'
checks = []

def get(path):
    with urlopen(Request(BASE + path, headers={'User-Agent': 'Research-site-verification',
                                              'Cache-Control': 'no-cache'}), timeout=40) as response:
        assert response.status == 200, (path, response.status)
        payload = response.read()
        checks.append({'path': path, 'status': response.status, 'bytes': len(payload)})
        return payload

build = json.loads(get('build.json?verify=' + expected))
assert build['commit'] == expected, (build['commit'], expected)
projects = json.loads((ROOT / 'site-projects.json').read_text(encoding='utf-8'))
assert build['projects'] == [p['slug'] for p in projects]
home = get('').decode('utf-8')
assert '008-baoyu-design/assets/understanding-map.png' in home
for project in projects:
    assert '<html' in get(project['slug'] + '/').decode('utf-8').lower()
prefix = '008-baoyu-design/'
resources = ['app.js', 'styles.css', 'demo/vendor/react.min.js', 'demo/vendor/react-dom.min.js',
             'demo/_ds/reader-kit/_ds_bundle.js', 'demo/_ds/reader-kit/styles.css',
             'deck.html', 'deck-stage.js', 'code/reader-kit/preview.html',
             'notes/understanding.md', 'notes/research.md', 'README.md',
             'THIRD_PARTY_NOTICES.md', 'assets/understanding-map.svg',
             'assets/understanding-map.png', 'demo/downloads/shiye-design.pptx', 'demo/']
responses = {name: get(prefix + name) for name in resources}
assert 'u-summary' in responses['app.js'].decode('utf-8')
hashes = {}
for name in ['assets/understanding-map.png', 'demo/downloads/shiye-design.pptx']:
    local = (PROJECT / name).read_bytes()
    assert local == responses[name], name
    hashes[name] = hashlib.sha256(local).hexdigest()
assert responses['assets/understanding-map.svg'].decode('utf-8').replace('\r\n', '\n') == (
    PROJECT / 'assets/understanding-map.svg').read_text(encoding='utf-8')
result = {'verifiedAt': datetime.now(timezone.utc).isoformat(), 'baseUrl': BASE,
          'projectUrl': BASE + prefix, 'publishedCommit': expected, 'projects': build['projects'],
          'httpChecks': checks, 'matchingBinaryHashes': hashes, 'svgTextMatchesSource': True,
          'limits': 'HTTP/content verification only. Browser interaction evidence is recorded separately.'}
record.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'commit': expected, 'httpChecks': len(checks), 'projects': len(projects),
                  'binaryAssetsMatch': True, 'record': str(record)}, ensure_ascii=False))
