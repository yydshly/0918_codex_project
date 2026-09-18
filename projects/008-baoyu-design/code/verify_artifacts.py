"""Verify generated deliverables without requiring browser or third-party packages."""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
import re
import xml.etree.ElementTree as ET
import zipfile

PROJECT = Path(__file__).resolve().parent.parent
DS = PROJECT / 'code/reader-kit'
manifest = json.loads((DS / '_ds_manifest.json').read_text(encoding='utf-8'))
assert {c['name'] for c in manifest['components']} == {'Button', 'Tag'}
assert len(manifest['tokens']) == 15
assert len(manifest['cards']) == 2
runtime = PROJECT / 'demo/_ds/reader-kit'
assert (DS / '_ds_bundle.js').read_bytes() == (runtime / '_ds_bundle.js').read_bytes()
assert (DS / '_ds_manifest.json').read_bytes() == (runtime / '_ds_manifest.json').read_bytes()
preview = (DS / 'preview.html').read_text(encoding='utf-8')
# Ignore scoped IDs inside Shadow DOM templates and embedded script strings.
card_ids = re.findall(r'<section class="ds-card" id="([^"]+)" data-card', preview)
group_ids = re.findall(r'<div class="ds-group" id="([^"]+)"', preview)
assert len(card_ids) == 2 and len(set(card_ids)) == 2
assert len(group_ids) == 2 and len(set(group_ids)) == 2
assert not re.search(r'<script\b[^>]*\bsrc\s*=\s*["\']https?://', preview)
assert not re.search(r'<link\b[^>]*\bhref\s*=\s*["\']https?://', preview)
ns = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
pptx = PROJECT / 'demo/downloads/shiye-design.pptx'
with zipfile.ZipFile(pptx) as z:
    slides = sorted(n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', n))
    assert len(slides) == 4
    roots = [ET.fromstring(z.read(n)) for n in slides]
    texts = [r.findall('.//a:t', ns) for r in roots]
    assert all(len(t) > 5 for t in texts), 'Each slide must contain editable text'
    assert any('值得' in (t.text or '') for t in texts[0])
    # Each authored card creates multiple native shapes: one click build plus
    # synchronized withEffect nodes. Count authored steps, not individual shapes.
    animations = sum(len(r.findall('.//p:cTn[@nodeType="clickEffect"]', ns)) for r in roots)
    effects = sum(len(r.findall('.//p:animEffect', ns)) for r in roots)
    assert animations == 3, animations
    assert effects >= animations
    assert len(roots[2].findall('.//p:timing', ns)) == 1
    shapes = [len(r.findall('.//p:sp', ns)) for r in roots]
    assert all(shapes)
result = {
    'verifiedAt': datetime.now(timezone.utc).isoformat(),
    'designSystem': {'components': 2, 'tokens': 15, 'cards': 2, 'namespace': manifest['namespace'],
                     'runtimeMatchesSource': True, 'previewGroupAndCardIdsUnique': True,
                     'previewHasNoExternalScriptOrStylesheetTags': True},
    'pptx': {'slides': len(slides), 'clickAnimationSteps': animations, 'nativeShapeEffects': effects, 'editableTextRuns': [len(t) for t in texts],
             'nativeShapes': shapes, 'bytes': pptx.stat().st_size,
             'sha256': hashlib.sha256(pptx.read_bytes()).hexdigest()},
    'limits': 'XML and generated-artifact checks; no desktop PowerPoint rendering or playback verification.'
}
(PROJECT / 'notes/evidence/artifacts.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(result, ensure_ascii=False, indent=2))
