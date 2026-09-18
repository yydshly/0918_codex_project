"""Generate a dependency-free guide. --upstream reads a local research download."""
import argparse
import hashlib
import html
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
SHA = '987a8e8a9ce205b63886510e145437d14d8a13a4'
UPSTREAM = 'https://github.com/selfteaching/the-craft-of-selfteaching'
parser = argparse.ArgumentParser()
parser.add_argument('--upstream', type=Path)
args = parser.parse_args()
notes = json.loads((ROOT/'code/chapter-notes.json').read_text(encoding='utf-8'))
if args.upstream:
    source = args.upstream
    assert (source/'commit.txt').read_text().strip() == SHA
    toc = (source/'markdown/TOC.md').read_text(encoding='utf-8')
    entries = re.findall(r'- \[(.*?)\]\((.*?)\)', toc)
    assert len(entries) == len(notes) == 46
    chapters = []
    files = []
    for i, ((label, filename), (category, summary, task)) in enumerate(zip(entries, notes), 1):
        content = (source/'markdown'/filename).read_bytes()
        heading = re.search(r'^# (.+)$', content.decode('utf-8'), re.M).group(1)
        part = '开始阅读' if i <= 2 else '第一部分' if i <= 15 else '第二部分' if i <= 27 else '第三部分' if i <= 39 else '附章' if i <= 42 else '工具附录'
        chapters.append(dict(id=i, title=heading, label=label, file=filename, part=part, category=category, summary=summary, task=task))
        files.append(dict(path='markdown/'+filename, sha256=hashlib.sha256(content).hexdigest(), bytes=len(content)))
    tree = json.loads((source/'tree.json').read_text(encoding='utf-8'))
    paths = {item['path'] for item in tree['tree']}
    for c in chapters:
        notebook = c['file'].replace('.md', '.ipynb').replace('Q.good-communiation', 'Q.good-communication')
        assert notebook in paths, notebook
        c['notebook'] = notebook
    (ROOT/'code/chapters.json').write_text(json.dumps(chapters, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    evidence = dict(upstream=UPSTREAM, commit=SHA, checkedDate='2026-09-18', author='李笑来', license='CC BY-NC-ND 3.0', licenseURL='https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh', coverage='46 个正文、附章和附录入口；不计封面、README 和 TOC', files=files, scope='阅读源文档并核对章节路径；未运行上游 Notebook；未复制原书正文和图片到本项目')
    (ROOT/'notes/evidence/upstream.json').write_text(json.dumps(evidence, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
chapters = json.loads((ROOT/'code/chapters.json').read_text(encoding='utf-8'))
assert len(chapters) == len(notes) == 46
for chapter, (category, summary, task) in zip(chapters, notes):
    chapter.update(category=category, summary=summary, task=task)
(ROOT/'code/chapters.json').write_text(json.dumps(chapters, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
routes = json.loads((ROOT/'code/routes.json').read_text(encoding='utf-8'))
categories = {'method':'自学方法', 'python':'Python 实践', 'collaboration':'资料与协作'}
e = html.escape
cards = []
default_ids = routes['beginner']['chapters']
for c in chapters:
    cid = c['id']
    cards.append(f'''<article class="chapter" id="chapter-{cid}" data-category="{c['category']}" data-id="{cid}">
      <details><summary><span class="chapter-no">{cid:02}</span><span class="chapter-heading"><span class="eyebrow">{c['part']} · {categories[c['category']]}</span><strong>{e(c['title'])}</strong></span><span class="route-mark" {'hidden' if cid not in default_ids else ''}>路线内</span><span class="expand" aria-hidden="true">＋</span></summary>
      <div class="chapter-body"><p>{e(c['summary'])}</p><div class="practice-note"><b>建议动手</b><p>{e(c['task'])}</p></div><div class="chapter-bottom"><a href="{UPSTREAM}/blob/{SHA}/markdown/{c['file']}" target="_blank" rel="noreferrer">读原文 ↗</a><a href="{UPSTREAM}/blob/{SHA}/{c['notebook']}" target="_blank" rel="noreferrer">Notebook ↗</a><label class="completion enhanced" hidden><input type="checkbox" data-complete="{cid}"> 已阅读</label></div></div></details></article>''')
template = (ROOT/'code/template.html').read_text(encoding='utf-8')
for cid, c in enumerate(chapters, 1):
    template = template.replace('{{source:'+str(cid)+'}}', f"{UPSTREAM}/blob/{SHA}/markdown/{c['file']}")
template = template.replace('{{CHAPTERS}}', '\n'.join(cards)).replace('{{SHA}}', SHA).replace('{{UPSTREAM}}', UPSTREAM)
assert '{{' not in template
(ROOT/'demo/index.html').write_text(template, encoding='utf-8')
(ROOT/'demo/data.js').write_text('window.GUIDE_DATA = '+json.dumps(dict(routes=routes,chapters=chapters),ensure_ascii=False,separators=(',',':'))+';\n', encoding='utf-8')
print('Generated guide: 46 chapters, 4 routes, fixed source links.')
