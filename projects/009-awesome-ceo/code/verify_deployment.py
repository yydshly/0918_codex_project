"""Verify the published commit, all project entrances and 009 assets."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--expected-commit', required=True)
parser.add_argument('--base', default='https://yydshly.github.io/0918_codex_project/')
parser.add_argument('--out', type=Path, default=ROOT / 'notes/evidence/deployment.json')
args = parser.parse_args()
base = args.base.rstrip('/') + '/'
slug = '009-awesome-ceo/'
manifest = json.loads((ROOT.parent.parent / 'site-projects.json').read_text(encoding='utf-8'))
expected_slugs = sorted(p['slug'] for p in manifest)

def fetch(relative):
    request = Request(base + relative + '?verify=' + args.expected_commit,
                      headers={'User-Agent': 'Research-site-verification', 'Cache-Control': 'no-cache'})
    with urlopen(request, timeout=45) as response:
        assert response.status == 200, relative
        return relative, response.read()

_, build_bytes = fetch('build.json')
build = json.loads(build_bytes)
assert build['commit'] == args.expected_commit, build
assert build['projects'] == expected_slugs, build
paths = ['', *[s + '/' for s in expected_slugs],
         *[slug + f for f in ['overview.html', 'styles.css', 'app.js',
            'assets/understanding-map.png', 'assets/cover.png', 'assets/mobile.png',
            'README.md', 'demo/README.md', 'notes/catalog.json', 'notes/understanding.md',
            'notes/resources.md', 'notes/evidence/LICENSE']]]
with ThreadPoolExecutor(max_workers=6) as executor:
    resources = dict(executor.map(fetch, paths))
for path in ['', slug]:
    text = resources[path].decode('utf-8')
    assert '直接参考价值较低' in text and '融资、创业、产品、销售、营销、管理、招聘、财务' in text
catalog = json.loads(resources[slug + 'notes/catalog.json'])
assert len(catalog['items']) == 85
assert sum(len(i['links']) for i in catalog['items']) == 86
local_image = (ROOT / 'assets/understanding-map.png').read_bytes()
remote_image = resources[slug + 'assets/understanding-map.png']
assert local_image == remote_image, 'Published overview image does not match local asset'
record = dict(verifiedAt=datetime.now(timezone.utc).isoformat(), baseUrl=base,
              projectUrl=base + slug, publishedCommit=args.expected_commit,
              projects=expected_slugs,
              httpChecks=[dict(path='build.json', status=200, bytes=len(build_bytes))] +
                         [dict(path=p, status=200, bytes=len(b)) for p,b in resources.items()],
              overviewImageSha256=hashlib.sha256(remote_image).hexdigest(),
              summaryVerified=True, resourceItems=85, contentLinks=86,
              externalDestinationsTested=False)
args.out.write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(dict(result='passed',commit=build['commit'],projects=len(expected_slugs),
                     httpChecks=len(record['httpChecks']),overviewImage='byte-identical'), ensure_ascii=False))
