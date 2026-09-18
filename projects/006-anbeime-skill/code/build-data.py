"""从已核对的研究资料生成离线网页数据，不重新抓取上游。"""
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
sources = json.loads((ROOT / 'notes/evidence/sources.json').read_text(encoding='utf-8'))
text = (ROOT / 'notes/capabilities.md').read_text(encoding='utf-8')
section = text.split('## 具体技能覆盖的任务', 1)[1].split('## 外部索引', 1)[0]
categories = []
for line in section.splitlines():
    if not line.startswith('| ') or line.startswith('| ---') or line.startswith('| 场景'):
        continue
    title, names, output, boundary = [part.strip() for part in line.strip('|').split('|')]
    categories.append({'title': title, 'skills': re.findall(r'`([^`]+)`', names),
                       'output': output, 'boundary': boundary})
assert len(categories) == 19
payload = {'commit': sources['commit'], 'counts': sources['counts'],
           'skills': sources['skill_files'], 'categories': categories}
(ROOT / 'demo/data.js').write_text('window.RESEARCH = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print(f"Built {len(categories)} categories and {len(payload['skills'])} skill entries.")
