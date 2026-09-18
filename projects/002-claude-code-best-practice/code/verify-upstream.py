"""Verify pinned sources and exercise the hook handler in an isolated directory.

No Claude Code session, external service, or sound player is started.
Usage: python code/verify-upstream.py --download
       python code/verify-upstream.py C:/path/to/pinned/snapshot
"""
import argparse
import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import platform
import shutil
import sys
import tempfile
from urllib.request import urlopen

PROJECT = Path(__file__).resolve().parents[1]
manifest = json.loads((PROJECT / 'notes/evidence/sources.json').read_text(encoding='utf-8-sig'))
parser = argparse.ArgumentParser()
parser.add_argument('snapshot', nargs='?', type=Path)
parser.add_argument('--download', action='store_true')
args = parser.parse_args()
snapshot = args.snapshot or PROJECT.parents[1] / 'upstream-local/claude-code-best-practice-73087da'
if args.download:
    for record in manifest['files']:
        target = snapshot / record['path']
        target.parent.mkdir(parents=True, exist_ok=True)
        url = f"https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/{manifest['commit']}/{record['path']}"
        with urlopen(url, timeout=30) as response:
            target.write_bytes(response.read())

checks = []
def check(name, condition):
    if not condition:
        raise AssertionError(name)
    checks.append({'name': name, 'passed': True})

check('固定版本的 17 个文件 SHA-256 与来源记录一致', all(
    hashlib.sha256((snapshot / record['path']).read_bytes()).hexdigest() == record['sha256']
    for record in manifest['files']))

with tempfile.TemporaryDirectory(prefix='research-002-hooks-') as scratch:
    root = Path(scratch)
    script = root / 'hooks/scripts/hooks.py'
    script.parent.mkdir(parents=True)
    shutil.copyfile(snapshot / '.claude/hooks/scripts/hooks.py', script)
    config = root / 'hooks/config'
    config.mkdir()
    spec = importlib.util.spec_from_file_location('research_hooks', script)
    hooks = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(hooks)
    check('普通 Stop 事件映射到 stop 提示音', hooks.get_sound_name({'hook_event_name': 'Stop'}) == 'stop')
    check('git commit 命令选择专用提示音', hooks.get_sound_name({'hook_event_name': 'PreToolUse', 'tool_name': 'Bash', 'tool_input': {'command': 'git commit -m example'}}) == 'pretooluse-git-committing')
    check('普通命令回退到通用工具提示', hooks.get_sound_name({'hook_event_name': 'PreToolUse', 'tool_name': 'Bash', 'tool_input': {'command': 'git status'}}) == 'pretooluse')
    check('代理事件选择 agent 专用映射', hooks.get_sound_name({'hook_event_name': 'Stop'}, 'example') == 'agent_stop')
    check('未知事件不选择声音', hooks.get_sound_name({'hook_event_name': 'Unknown'}) is None)
    (config / 'hooks-config.json').write_text(json.dumps({'disableStopHook': True, 'disableLogging': True}))
    check('共享配置可以禁用指定事件', hooks.is_hook_disabled('Stop') is True)
    (config / 'hooks-config.local.json').write_text(json.dumps({'disableStopHook': False}))
    check('本地事件开关覆盖共享设置', hooks.is_hook_disabled('Stop') is False)
    check('本地缺少日志开关时回退共享设置', hooks.is_logging_disabled() is True)
    hooks.log_hook_data({'hook_event_name': 'Stop'})
    check('禁用日志时不创建日志文件', not (root / 'hooks/logs/hooks-log.jsonl').exists())
    (config / 'hooks-config.local.json').write_text(json.dumps({'disableStopHook': False, 'disableLogging': False}))
    hooks.log_hook_data({'hook_event_name': 'Stop', 'cwd': 'excluded', 'transcript_path': 'excluded'}, 'example')
    logged = json.loads((root / 'hooks/logs/hooks-log.jsonl').read_text())
    check('日志去除两个路径字段并记录代理来源', 'cwd' not in logged and 'transcript_path' not in logged and logged['invoked_by_agent'] == 'example')
    played = []
    hooks.play_sound = played.append
    original_argv, original_stdin = sys.argv, sys.stdin
    try:
        sys.argv = ['hooks.py']
        sys.stdin = io.StringIO('{"hook_event_name":"Stop"}')
        try:
            hooks.main()
        except SystemExit as result:
            check('主处理路径分发声音且成功退出（播放器已替换）', result.code == 0 and played == ['stop'])
        sys.stdin = io.StringIO('invalid JSON')
        with contextlib.redirect_stderr(io.StringIO()):
            try:
                hooks.main()
            except SystemExit as result:
                check('无效 JSON 也成功退出，不作为阻断门禁', result.code == 0)
    finally:
        sys.argv, sys.stdin = original_argv, original_stdin

report = {'date': '2026-09-18', 'upstreamCommit': manifest['commit'], 'environment': {'os': platform.platform(), 'python': platform.python_version()}, 'checks': checks, 'limits': ['未启动 Claude Code 或子代理', '未连接 MCP 或天气服务', '未验证真实音频播放；主处理路径替换了播放函数', '未验证工具权限字段的运行时行为']}
(PROJECT / 'notes/evidence/experiments.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'{len(checks)} checks passed; report: notes/evidence/experiments.json')
