"""Build all demos with a temporary Git index; leave real staging unchanged."""
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

output = (ROOT / '_site').resolve()
assert output.parent == ROOT.resolve() and output.name == '_site'
before = git('diff', '--cached', '--binary')
with tempfile.TemporaryDirectory(prefix='research-003-index-') as scratch:
    env = dict(os.environ, GIT_INDEX_FILE=str(Path(scratch) / 'index'))
    git('read-tree', 'HEAD', env=env)
    git('add', '--', 'projects/003-frontend-design-toolkit', 'site-projects.json', 'scripts/build_site.py', env=env)
    subprocess.run([sys.executable, 'scripts/build_site.py'], cwd=ROOT, env=env, check=True)
assert git('diff', '--cached', '--binary') == before

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        self.links.extend(value for name, value in attrs if name in ('src', 'href') and value)

checked = 0
def check_link(parent, href):
    global checked
    parsed = urlsplit(href.strip('<>'))
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    target = (parent / unquote(parsed.path)).resolve()
    assert target.exists(), f'Broken link: {parent} -> {href}'
    checked += 1

# The report is produced below; omit its self-reference during initial creation.
pending_report = PROJECT / 'notes/evidence/integration.json'
for file in [*PROJECT.rglob('*.md'), ROOT / 'README.md', ROOT / 'docs/DEPLOYMENT.md']:
    for href in re.findall(r'\]\(([^)]+)\)', file.read_text(encoding='utf-8')):
        parsed = urlsplit(href)
        if not parsed.scheme and (file.parent / parsed.path).resolve() == pending_report.resolve():
            continue
        check_link(file.parent, href)

manifest = json.loads((output / 'build.json').read_text())
assert manifest['projects'] == ['001-understand-anything', '002-claude-code-best-practice', '003-frontend-design-toolkit']
for slug in manifest['projects']:
    assert (output / slug / 'index.html').is_file()
for file in [output / 'index.html', output / '003-frontend-design-toolkit/index.html']:
    parser = Links()
    parser.feed(file.read_text(encoding='utf-8'))
    for href in parser.links:
        check_link(file.parent, href)
app = (output / '003-frontend-design-toolkit/app.js').read_text(encoding='utf-8')
assert '../notes/' not in app and './notes/research.md' in app
assert '../THIRD_PARTY_NOTICES.md' not in app and './THIRD_PARTY_NOTICES.md' in app
practice = (output / '003-frontend-design-toolkit/practice.js').read_text(encoding='utf-8')
assert '../notes/' not in practice and './notes/usage.md' in practice
homepage = (output / 'index.html').read_text(encoding='utf-8')
assert '003-frontend-design-toolkit/#capabilities' in homepage
assert '003-frontend-design-toolkit/#mechanism' in homepage
assert '003-frontend-design-toolkit/#practice' in homepage
assert '001-understand-anything/overview.html' in homepage
report = {'date':'2026-09-18', 'localLinksChecked':checked, 'projects':manifest['projects'],
          'realStagingAreaUnchanged':True, 'source':'working tree with temporary Git index',
          'baseCommit':manifest['commit'], 'published':False,
          'checks':['三个展厅共同构建', '既有导航保留', '003 编号路径资源改写', '文档本地链接存在', '真实暂存区未变']}
pending_report.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
# Include the freshly generated evidence in the tested local output.
(output / '003-frontend-design-toolkit/notes/evidence/integration.json').write_text(pending_report.read_text(encoding='utf-8'), encoding='utf-8')
print(f'Integration passed: {checked} local links; 3 projects; real staging unchanged.')
