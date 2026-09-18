"""Build the two-project site using a temporary Git index and check local links.

The real Git index is not staged or reset. The normal ignored _site output is rebuilt.
Run from anywhere: python code/verify-integration.py
"""
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
def git(*args, env=None):
    return subprocess.check_output(['git', *args], cwd=ROOT, env=env)

# The build script deletes this fixed generated directory, never the source tree.
output = (ROOT / '_site').resolve()
assert output.parent == ROOT.resolve() and output.name == '_site'
before = git('diff', '--cached', '--binary')
with tempfile.TemporaryDirectory(prefix='research-002-index-') as scratch:
    env = dict(os.environ, GIT_INDEX_FILE=str(Path(scratch) / 'index'))
    git('read-tree', 'HEAD', env=env)
    git('add', '--', 'projects/002-claude-code-best-practice', 'site-projects.json', 'scripts/build_site.py', env=env)
    subprocess.run([sys.executable, 'scripts/build_site.py'], cwd=ROOT, env=env, check=True)
assert git('diff', '--cached', '--binary') == before, 'The real staging area changed'

class LocalLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ('src', 'href') and value:
                self.links.append(value)

checked = 0
def check_link(parent, href):
    global checked
    href = href.strip('<>')
    parsed = urlsplit(href)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    target = (parent / unquote(parsed.path)).resolve()
    assert target.exists(), f'Broken link: {parent} -> {href}'
    checked += 1

for file in PROJECT.rglob('*.md'):
    for href in re.findall(r'\]\(([^)]+)\)', file.read_text(encoding='utf-8')):
        check_link(file.parent, href.split(' "')[0])
for file in [ROOT / '_site/index.html', ROOT / '_site/002-claude-code-best-practice/index.html']:
    parser = LocalLinks()
    parser.feed(file.read_text(encoding='utf-8'))
    for href in parser.links:
        check_link(file.parent, href)
manifest = json.loads((ROOT / '_site/build.json').read_text())
assert manifest['projects'] == ['001-understand-anything', '002-claude-code-best-practice']
homepage = (ROOT / '_site/index.html').read_text(encoding='utf-8')
assert '001-understand-anything/overview.html' in homepage
assert '001-understand-anything/#compare' in homepage
assert '002-claude-code-best-practice/#workflow' in homepage
assert '002-claude-code-best-practice/overview.html' not in homepage
app = (ROOT / '_site/002-claude-code-best-practice/app.js').read_text(encoding='utf-8')
assert '../notes/' not in app and './notes/evidence/sources.json' in app
report = {'date':'2026-09-18', 'localLinksChecked':checked, 'projects':manifest['projects'], 'realStagingAreaUnchanged':True, 'source':'working tree with temporary Git index', 'baseCommit':manifest['commit'], 'published':False, 'checks':['两项目完整构建','保留 001 默认导航','002 定制导航正确','编号根路径资源与文档重写','研究文档本地链接存在','真实暂存区未变']}
(PROJECT / 'notes/evidence/integration.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Integration passed; {checked} local links; real staging area unchanged.')
