"""Build a complete Chinese reading catalog from the pinned README (stdlib only)."""
import html
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
COMMIT = '89f761c2af903066500e1a0c33c33cf36873cdf6'
CATEGORIES = [
    ('Fundraising', 'fundraising', '融资', '理解融资流程，准备路演材料，寻找投资人资料。', '16 条融资阅读材料，加上 2 个计算器、3 个投资人目录与 3 个路演合集。'),
    ('Entrepreneurship', 'entrepreneurship', '创业', '从创始人职责到商业假设，建立创业的整体认识。', '12 条资料涵盖创业经验、课程、尽调清单、精益画布、演示模板与转型案例。'),
    ('Product', 'product', '产品', '找到值得做的产品，理解产品与市场的匹配。', '6 条资料围绕产品判断、想法、市场选择与 PMF；原清单特别列出产品的四个判断维度。'),
    ('Sales', 'sales', '销售', '从找到前 10 位客户开始。', '这一类只有 1 条 Stripe 指南；营销分类另有首批客户的案例，可结合阅读。'),
    ('Marketing', 'marketing', '营销', '探索开发者营销、邮件营销与早期获客。', '5 条资料包含营销创意、开发者营销、公关资源、SaaS 邮件营销和 B2B 获客案例。'),
    ('Management', 'management', '管理', '改善协作、授权、工作节奏与团队文化。', '12 条资料讨论 CEO 与 CTO 协作、时间安排、薪酬沟通、新人融入、远程文化与危机管理。'),
    ('Hiring', 'hiring', '招聘', '了解高管面试、人才吸引与招聘框架。', '3 条资料：两篇 Keith Rabois 经验整理，以及 GitLab 的人才招聘框架。'),
    ('Finance', 'finance', '财务', '建立预算、资源投入与采购管理的基础认识。', '4 条资料涉及财务规划、工程资源预算、供应商谈判与采购流程。'),
    ('Books', 'books', '书籍与课程', '用长篇阅读补充创业、决策与个人成长知识。', '9 本书与 1 份管理课程。保留原清单已有的书籍介绍，并提供中文翻译。'),
    ('More links', 'more-links', '扩展资料', '沿着其他资源库，继续拓展阅读。', '6 个资源入口，包括创业资料站、工具清单以及书籍、视频和课程集合。'),
    ('Other', 'other', '相关角色', '继续了解 CTO 与 TPM 的资料清单。', '2 个同一维护者的相关仓库，分别面向 CTO 与 TPM。'),
]
SUBGROUPS = {'Fundraising tools': '融资计算工具', 'Angels directories': '投资人目录', 'Startup decks': '路演材料', 'Product-Market Fit': '产品与市场匹配'}
raw = (ROOT / 'notes/evidence/upstream-readme.md').read_text(encoding='utf-8')
translations = json.loads((ROOT / 'code/translations.json').read_text(encoding='utf-8'))
author_notes = json.loads((ROOT / 'code/author-notes.json').read_text(encoding='utf-8'))
lookup = {c[0]: c for c in CATEGORIES}
items, section, subgroup = [], '', ''
for line in raw.splitlines():
    if line.startswith('## '):
        section, subgroup = line[3:], ''
        continue
    if line.startswith('### '):
        subgroup = SUBGROUPS[line[4:]]
        continue
    if section not in lookup or not re.match(r'^\s{0,1}[-*] ', line):
        continue
    profiles = re.findall(r'\[!\[[^\]]*\]\([^)]*\)\]\(([^)]+)\)', line)
    clean = re.sub(r'\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)', '', line)
    clean = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', clean)
    matches = list(re.finditer(r'\[([^\]]+)\]\((https?://[^)]+)\)', clean))
    assert matches, line
    number = len(items) + 1
    zh, summary, kind = translations[number - 1]
    author = re.sub(r'<br\s*/?>|💰|\*\(GitHub\)\*', '', clean[matches[-1].end():]).strip(' -')
    items.append(dict(id=f'r{number:02}', number=number, category=lookup[section][1], subgroup=subgroup,
                      title=zh, original=matches[0][1], summary=summary, kind=kind, author=author,
                      profiles=profiles, originalMoneyMarker='💰' in line,
                      authorNote=author_notes.get(str(number), ''),
                      links=[dict(label=m[1], url=m[2]) for m in matches]))
assert len(items) == len(translations) == 85
assert sum(len(i['links']) for i in items) == 86
meta = json.loads((ROOT / 'notes/evidence/upstream.json').read_text(encoding='utf-8-sig'))
for original, slug, *_ in CATEGORIES:
    assert sum(i['category'] == slug for i in items) == meta['section_counts'][original]
e = html.escape

def external(url, text, cls=''):
    return f'<a class="{cls}" href="{e(url, quote=True)}" target="_blank" rel="noopener noreferrer">{text}<span aria-hidden="true"> ↗</span></a>'

def card(item):
    domains = ' / '.join(dict.fromkeys(re.sub(r'^https?://(?:www\.)?', '', link['url']).split('/')[0] for link in item['links']))
    author = e(item['author']) or e(domains)
    if item['author'] and item['profiles']:
        author = external(item['profiles'][0], author)
    links = ''.join(external(link['url'], '打开原始资源' if len(item['links']) == 1 else ('精益画布' if n == 0 else 'Miro 模板'), 'resource-link') for n, link in enumerate(item['links']))
    note = f'<details class="author-note"><summary>原清单作者附注 · 中文译文</summary><p>{e(item["authorNote"])}</p></details>' if item['authorNote'] else ''
    marker = '<span class="marker" title="原 README 带钱袋符号，未核实当前收费条件">原清单标记 💰</span>' if item['originalMoneyMarker'] else ''
    keywords = ' '.join([item['title'], item['original'], item['summary'], item['author'], domains, item['subgroup'], item['authorNote']]).lower()
    return f'''<article class="resource" id="{item['id']}" data-category="{item['category']}" data-kind="{e(item['kind'])}" data-search="{e(keywords, quote=True)}">
<div class="card-top"><span class="resource-number">{item['number']:02d}</span><span class="kind">{e(item['kind'])}</span><span class="subgroup">{e(item['subgroup'])}</span></div>
<h3>{e(item['title'])}</h3><p class="original" lang="en">{e(item['original'])}</p><p class="description">{e(item['summary'])}</p>{note}
<div class="resource-footer"><span class="source">{author}</span><div class="resource-links">{links}</div></div>{marker}</article>'''

navigation, overview, sections = [], [], []
for n, (original, slug, title, brief, summary) in enumerate(CATEGORIES, 1):
    entries = [i for i in items if i['category'] == slug]
    navigation.append(f'<a href="#category={slug}" data-filter="{slug}"><span>{e(title)}</span><span class="count">{len(entries):02d}</span></a>')
    overview.append(f'<a class="overview-item" href="#category={slug}"><span class="overview-num">{n:02d}</span><div><strong>{e(title)} <small>{len(entries)} 条</small></strong><p>{e(summary)}</p></div><span aria-hidden="true">↗</span></a>')
    sections.append(f'<section class="category-section" data-section="{slug}" aria-labelledby="title-{slug}"><div class="section-heading"><div><span class="eyebrow">{n:02d} / {e(original.upper())}</span><h2 id="title-{slug}">{e(title)}<span class="section-count">{len(entries)} 条</span></h2><p>{e(brief)}</p></div></div><div class="resource-grid">{"".join(map(card, entries))}</div></section>')
template = (ROOT / 'code/template.html').read_text(encoding='utf-8')
groups = json.loads((ROOT / 'code/type-groups.json').read_text(encoding='utf-8'))
type_cards = []
assert sum(g['count'] for g in groups) == 85
assert sorted(k for g in groups for k in g['kinds']) == sorted(set(i['kind'] for i in items))
for group in groups:
    assert sum(i['kind'] in group['kinds'] for i in items) == group['count']
    type_cards.append(f'<a class="type-card" href="#group={group["id"]}" data-group="{group["id"]}" data-name="{e(group["name"])}" data-kinds="{e(json.dumps(group["kinds"], ensure_ascii=False), quote=True)}"><strong>{e(group["name"])}</strong><span class="type-count">{group["count"]} 条 ↗</span><p>{e(group["description"])}</p></a>')
for key, value in {'NAV': ''.join(navigation), 'OVERVIEW': ''.join(overview), 'SECTIONS': ''.join(sections),
                   'TYPE_CARDS': ''.join(type_cards),
                   'TYPES': ''.join(f'<option value="{e(k)}">{e(k)}</option>' for k in dict.fromkeys(i['kind'] for i in items))}.items():
    template = template.replace('<!-- ' + key + ' -->', value)
assert not re.search(r'<!-- (NAV|OVERVIEW|SECTIONS|TYPES|TYPE_CARDS) -->', template)
(ROOT / 'demo').mkdir(exist_ok=True)
(ROOT / 'demo/index.html').write_text(template, encoding='utf-8')
(ROOT / 'notes/catalog.json').write_text(json.dumps({'commit': COMMIT, 'items': items}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Built 85 Chinese resources, 86 original content links, 11 categories, 13 translated author notes.')
