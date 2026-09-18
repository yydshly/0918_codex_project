"""Build all exhibits using an isolated Git index, then verify local paths and anchors."""
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from urllib.parse import unquote, urlsplit

PROJECT = Path(__file__).resolve().parents[1]
ROOT = PROJECT.parents[1]
OUT = (ROOT / '_site').resolve()
assert OUT.parent == ROOT.resolve() and OUT.name == '_site'
def git(*args, env=None):
    return subprocess.check_output(['git', *args], cwd=ROOT, env=env)

before = git('diff', '--cached', '--binary')
with tempfile.TemporaryDirectory(prefix='research-005-index-') as scratch:
    env = dict(os.environ, GIT_INDEX_FILE=str(Path(scratch) / 'index'))
    git('read-tree', 'HEAD', env=env)
    git('add', '--', 'projects/005-chat-on-steroids', 'site-projects.json', 'scripts/build_site.py', env=env)
    subprocess.run([sys.executable, 'scripts/build_site.py'], cwd=ROOT, env=env, check=True)
assert git('diff', '--cached', '--binary') == before

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links=[]
    def handle_starttag(self, tag, attrs):
        self.links.extend(value for key,value in attrs if key in ('src','href') and value)

report_file = PROJECT / 'notes/evidence/integration.json'
pending = {'integration.json','browser-built-qa.json'}
checked=0
def check_link(parent, href):
    global checked
    parsed=urlsplit(href.strip('<>'))
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    target=(parent/unquote(parsed.path)).resolve()
    if target.name in pending and not target.exists():
        return
    assert target.exists(), f'Missing resource: {parent} -> {href}'
    checked+=1

for file in [*PROJECT.rglob('*.md'), ROOT/'README.md', ROOT/'docs/DEPLOYMENT.md']:
    for href in re.findall(r'\]\(([^)]+)\)',file.read_text(encoding='utf-8')):
        check_link(file.parent,href)
manifest=json.loads((ROOT/'site-projects.json').read_text(encoding='utf-8'))
build=json.loads((OUT/'build.json').read_text(encoding='utf-8'))
expected=sorted([item['slug'] for item in manifest],key=lambda slug:int(slug.split('-')[0]))
assert len(expected)==5 and expected[-1]=='005-chat-on-steroids'
assert build['projects']==expected
for item in manifest:
    assert (OUT/item['slug']/'index.html').is_file()
    assert (OUT/item['slug']/item['cover']).is_file()
for file in [OUT/'index.html',OUT/'005-chat-on-steroids/index.html',PROJECT/'demo/index.html']:
    parser=Links();parser.feed(file.read_text(encoding='utf-8'))
    for href in parser.links:check_link(file.parent,href)
html=(OUT/'005-chat-on-steroids/index.html').read_text(encoding='utf-8')
assert '../notes/' not in html and './notes/research.md' in html
assert './README.md' in html
for route in ['overview','map','capabilities','workflow','value','evidence']:
    assert f'data-view="{route}"' in html and f'href="#{route}"' in html
for item in manifest:
    assert f'{item["slug"]}/' in (OUT/'index.html').read_text(encoding='utf-8')
report={'verifiedAt':datetime.now(timezone.utc).isoformat(),'projects':expected,'localLinksChecked':checked,
        'realStagingAreaUnchanged':True,'source':'working tree with temporary Git index',
        'baseCommit':build['commit'],'published':False,
        'checks':['五项目共同构建','既有导航和代表图保留','005 编号路径资源改写','文档和网页本地链接','六个章节路由和总览图资源','真实暂存区未变']}
text=json.dumps(report,ensure_ascii=False,indent=2)+'\n'
report_file.write_text(text,encoding='utf-8')
(OUT/'005-chat-on-steroids/notes/evidence/integration.json').write_text(text,encoding='utf-8')
print(f'Integration passed: {checked} local links; 5 projects; real staging unchanged.')
