"""Use a temporary Git index to build all six exhibits and check local links."""
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
from urllib.parse import unquote, urlsplit

PROJECT = Path(__file__).resolve().parents[1]
ROOT = PROJECT.parents[1]
OUT = (ROOT / '_site').resolve()
assert OUT.parent == ROOT.resolve() and OUT.name == '_site'


def git(*args, env=None):
    return subprocess.check_output(['git', *args], cwd=ROOT, env=env)


before = git('diff', '--cached', '--binary')
with tempfile.TemporaryDirectory(prefix='research-006-index-') as scratch:
    env = dict(os.environ, GIT_INDEX_FILE=str(Path(scratch) / 'index'))
    git('read-tree', 'HEAD', env=env)
    git('add', '--', 'projects/006-anbeime-skill', 'site-projects.json', 'scripts/build_site.py', env=env)
    subprocess.run([sys.executable, 'scripts/build_site.py'], cwd=ROOT, env=env, check=True)
assert git('diff', '--cached', '--binary') == before


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        self.links.extend(value for key, value in attrs if key in ('src', 'href') and value)


checked = 0
pending = {'integration.json', 'browser-built-qa.json'}


def check_link(parent, href):
    global checked
    parsed = urlsplit(href.strip('<>'))
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    target = (parent / unquote(parsed.path)).resolve()
    if target.name in pending and not target.exists():
        return
    assert target.exists(), f'Missing resource: {parent} -> {href}'
    checked += 1


for file in [*PROJECT.rglob('*.md'), ROOT / 'README.md', ROOT / 'docs/DEPLOYMENT.md']:
    for href in re.findall(r'\]\(([^)]+)\)', file.read_text(encoding='utf-8')):
        check_link(file.parent, href)

manifest = json.loads((ROOT / 'site-projects.json').read_text(encoding='utf-8'))
expected = sorted([p['slug'] for p in manifest], key=lambda slug: int(slug.split('-')[0]))
assert len(expected) == 6 and expected[-1] == '006-anbeime-skill'
build = json.loads((OUT / 'build.json').read_text(encoding='utf-8'))
assert build['projects'] == expected
for item in manifest:
    assert (OUT / item['slug'] / 'index.html').is_file()
    assert (OUT / item['slug'] / item['cover']).is_file()
    assert f'{item["slug"]}/' in (OUT / 'index.html').read_text(encoding='utf-8')
for file in [OUT / 'index.html', OUT / '006-anbeime-skill/index.html', PROJECT / 'demo/index.html']:
    parser = Links()
    parser.feed(file.read_text(encoding='utf-8'))
    for href in parser.links:
        check_link(file.parent, href)
built = (OUT / '006-anbeime-skill/index.html').read_text(encoding='utf-8')
assert '../notes/' not in built and './notes/web-landscape.md' in built
for route in ['overview', 'map', 'websites', 'capabilities', 'inventory', 'workflow', 'evidence']:
    assert f'data-view="{route}"' in built and f'href="#{route}"' in built
data_text = (PROJECT / 'demo/data.js').read_text(encoding='utf-8')
data = json.loads(data_text.removeprefix('window.RESEARCH = ').strip().removesuffix(';'))
sources = json.loads((PROJECT / 'notes/evidence/sources.json').read_text(encoding='utf-8'))
assert data['skills'] == sources['skill_files'] and len(data['categories']) == 19
assert len(data['skills']) == 84 and len(sources['additional_sources']) == 27
report = {
    'verifiedAt': datetime.now(timezone.utc).isoformat(), 'projects': expected,
    'localLinksChecked': checked, 'realStagingAreaUnchanged': True,
    'source': 'working tree with temporary Git index', 'baseCommit': build['commit'],
    'published': False, 'upstreamExecuted': False,
    'checks': ['六项目共同构建', '既有入口与代表图保留', '006编号路径资源改写',
               '本地文档与HTML链接', '七个章节路由', '84份文件与来源数据一致', '真实暂存区未变'],
}
text = json.dumps(report, ensure_ascii=False, indent=2) + '\n'
(PROJECT / 'notes/evidence/integration.json').write_text(text, encoding='utf-8')
(OUT / '006-anbeime-skill/notes/evidence/integration.json').write_text(text, encoding='utf-8')
print(f'Integration passed: {checked} local links; 6 projects; real staging unchanged.')
