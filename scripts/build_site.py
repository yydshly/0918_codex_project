"""Build numbered static demos using only files tracked by Git. No dependencies."""
import html
import json
from pathlib import Path
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / '_site'
MANIFEST = json.loads((ROOT / 'site-projects.json').read_text(encoding='utf-8'))
# The deletion target is fixed and must be a direct child of this repository.
assert OUT.resolve().parent == ROOT.resolve() and OUT.name == '_site'
if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()
tracked = subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT).decode('utf-8').split('\0')
cards = []
slugs = set()
for project in sorted(MANIFEST, key=lambda p: int(p['slug'].split('-')[0])):
    slug = project['slug']
    assert re.fullmatch(r'\d{3,}-[a-z0-9-]+', slug) and slug not in slugs
    slugs.add(slug)
    source = ROOT / 'projects' / slug
    target = OUT / slug
    prefix = f'projects/{slug}/'
    for name in tracked:
        if name.startswith(prefix):
            src = ROOT / name
            assert not src.is_symlink(), f'Symlinks are not deployed: {name}'
            dst = target / name.removeprefix(prefix)
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(src, dst)
    assert (target / 'demo/index.html').is_file(), f'Missing demo: {slug}'
    # Preserve the original demo and docs layout for existing relative links.
    # Also expose the demo at its clean numbered URL, rewriting sibling resources.
    for src in (target / 'demo').iterdir():
        if src.suffix not in {'.html', '.css', '.js'}:
            continue
        text = src.read_text(encoding='utf-8')
        for folder in ('assets', 'notes', 'code', 'licenses'):
            text = text.replace(f'../{folder}/', f'./{folder}/')
        text = text.replace('../README.md', './README.md')
        (target / src.name).write_text(text, encoding='utf-8')
    assert (target / project['cover']).is_file()
    e = html.escape
    links = project.get('links', [
        {'label': '一图总览', 'href': 'overview.html'},
        {'label': '工具对比', 'href': '#compare'},
    ])
    navigation = ''.join(f'<a href="{slug}/{e(link["href"])}">{e(link["label"])}</a>' for link in links)
    cards.append(f'''<article><a href="{slug}/"><img src="{slug}/{e(project['cover'])}" alt="{e(project['name'])} 能力总览" loading="lazy"></a><div><span>PROJECT {slug.split('-')[0]}</span><h2><a href="{slug}/">{e(project['name'])}</a></h2><p>{e(project['summary'])}</p><nav><a class="button" href="{slug}/">进入研究展厅 ↗</a>{navigation}<a href="{e(project['upstream'])}">源库 ↗</a></nav></div></article>''')
index = '''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GitHub 开源项目研究集</title><meta name="description" content="开源项目能力研究、原理分析、交互演示与选型比较。"><style>*{box-sizing:border-box}body{margin:0;background:#f4f5ef;color:#213e33;font-family:system-ui,"Microsoft YaHei",sans-serif}main{max-width:1120px;margin:auto;padding:60px 24px}header{margin-bottom:40px}header span{font-size:12px;letter-spacing:3px;color:#698254}h1{font-size:38px;margin:15px 0}p{color:#728067;line-height:1.9}a{color:inherit;text-decoration:none}article{display:grid;grid-template-columns:320px 1fr;background:#fffef9;border:1px solid #dce3d1;border-radius:14px;overflow:hidden;margin:24px 0}article img{width:100%;height:330px;object-fit:cover;object-position:top;display:block}article>div{padding:35px}article span{font-size:12px;color:#82936f}h2{font-size:28px}nav{display:flex;gap:19px;align-items:center;flex-wrap:wrap;font-size:13px;margin-top:28px}.button{background:#294638;color:#f4f8e7;padding:12px 17px;border-radius:5px}footer{font-size:12px;line-height:2;margin-top:30px;color:#7d8872}@media(max-width:700px){main{padding:28px 16px}h1{font-size:28px}article{grid-template-columns:1fr}article img{height:220px}article>div{padding:24px}}</style></head><body><main><header><span>OPEN SOURCE / RESEARCH COLLECTION</span><h1>把开源项目，研究明白。</h1><p>能力、原理、使用场景与可复核的实验。每个项目保留来源、版本、演示与验证边界。</p></header>'''
index += ''.join(cards)
index += '<footer><a href="https://github.com/yydshly/0918_codex_project">GitHub 研究仓库 ↗</a><br>本站为静态研究展示；样本实测、人工示意与未验证能力分别标注。</footer></main></body></html>'
(OUT / 'index.html').write_text(index, encoding='utf-8')
(OUT / '.nojekyll').write_text('', encoding='utf-8')
commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
(OUT / 'build.json').write_text(json.dumps({'commit': commit, 'projects': sorted(slugs)}, indent=2)+'\n', encoding='utf-8')
print(f'Built {len(slugs)} project(s) in _site; source commit {commit}')
