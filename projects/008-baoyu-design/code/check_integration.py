"""Build with a temporary Git index, then validate local static resource paths."""
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
from datetime import datetime, timezone
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[3]
PROJECT = ROOT / 'projects/008-baoyu-design'
def run(args, env=None):
    return subprocess.check_output(args, cwd=ROOT, env=env, text=True, encoding='utf-8').strip()
before = run(['git', 'diff', '--cached', '--binary'])
with tempfile.TemporaryDirectory(prefix='baoyu-integration-') as temp:
    env = dict(os.environ, GIT_INDEX_FILE=str(Path(temp) / 'index'))
    run(['git', 'read-tree', 'HEAD'], env)
    run(['git', 'add', '--', 'projects/008-baoyu-design', 'site-projects.json', 'scripts/build_site.py'], env)
    output = run(['python', 'scripts/build_site.py'], env)
assert before == run(['git', 'diff', '--cached', '--binary']), 'Real staging area changed'
out = ROOT / '_site'
build = json.loads((out / 'build.json').read_text(encoding='utf-8'))
assert build['projects'] == ['001-understand-anything','002-claude-code-best-practice',
                            '003-frontend-design-toolkit','004-asu-skills','005-chat-on-steroids',
                            '006-anbeime-skill','008-baoyu-design']
for slug in build['projects']:
    assert (out / slug / 'index.html').is_file()
target = out / '008-baoyu-design'
count = 0
for name in ['index.html', 'deck.html', 'demo/index.html', 'demo/deck.html']:
    page = target / name
    text = page.read_text(encoding='utf-8')
    for url in re.findall(r'(?:src|href)="([^"#]+)"', text):
        parsed = urlsplit(url)
        if parsed.scheme or url.startswith('//'):
            continue
        linked = (page.parent / unquote(parsed.path)).resolve()
        assert linked.is_relative_to(out.resolve()), (name, url)
        assert linked.is_file(), (name, url)
        count += 1
for directory in ['demo/_ds/reader-kit','demo/vendor','demo/downloads']:
    assert (target / directory).is_dir()
for name in ['app.js','demo/app.js']:
    text = (target / name).read_text(encoding='utf-8')
    for url in re.findall(r'["\']((?:\./|\.\./)[^"\']+\.(?:md|html|json|pptx))["\']', text):
        assert ((target / name).parent / url).resolve().is_file(), (name,url)
# Existing demos must remain byte-identical except their pre-existing path normalization.
for project in json.loads((ROOT/'site-projects.json').read_text(encoding='utf-8'))[:-1]:
    slug = project['slug']
    assert (ROOT/'projects'/slug/project['cover']).read_bytes() == (out/slug/project['cover']).read_bytes()
result = {'verifiedAt':datetime.now(timezone.utc).isoformat(), 'projects':build['projects'],
          'localHtmlResourceLinks':count, 'stagingAreaUnchanged':True,
          'existingCoversByteIdentical':True, 'cleanAndSourceDemoPathsChecked':True,
          'deployment':'not-deployed', 'buildOutput':output,
          'note':'Local working-tree build uses temporary index; build.json names base HEAD, not a released snapshot.'}
(PROJECT/'notes/evidence/integration.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
