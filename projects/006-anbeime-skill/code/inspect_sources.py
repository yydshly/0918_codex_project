"""盘点固定上游快照；只读取公开资料，不导入或执行上游代码。"""

import argparse
import concurrent.futures
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import quote
from urllib.request import Request, urlopen


COMMIT = "f21302e204d513d09763ebb291704eb9a2aaa34f"
REPO = "anbeime/skill"
BASE = f"https://github.com/{REPO}/blob/{COMMIT}/"
PROJECT = Path(__file__).resolve().parents[1]
EXTRA = [
    "README.md", "main.py", "crawler.py", "scheduler.py", "data_manager.py",
    "config.py", "requirements.txt", "scripts/sync_skills.py",
    "scripts/sync_clawhub.py", "scripts/xiaoyue-chat.js",
    "scripts/xiaoyue-companion.sh", "data/local_skills.json",
    "data/skills.json", "SKILL_SOURCES.json", "public/index.html",
    "public/projects.html", "public/skills.html", "public/local-skills.html",
    "public/chat-demo.html", "public/index-en.html", "public/skills-en.html",
    "tools/skill_validator/validator.py", ".github/workflows/sync-skills.yml",
    "skills/antinet-doc-parse/LICENSE",
    "skills/antinet-doc-parse/scripts/run_doc_parse.py",
    "skills/qwen3-tts-local/qwen3-tts-local/scripts/tts_generator.py",
    "skills/qwen3-tts-local/qwen3-tts-local/scripts/audio_processor.py",
]


def fetch(url):
    request = Request(url, headers={"User-Agent": "anbeime-skill-research"})
    with urlopen(request, timeout=45) as response:
        return response.read()


def field(content, key):
    """只提取单行顶级声明；不执行 YAML，也不替代完整格式验证。"""
    front = content.split("---", 2)[1] if content.startswith("---") else ""
    match = re.search(rf"^{re.escape(key)}:[ \t]*(.+)$", front, re.MULTILINE)
    return match.group(1).strip().strip("\"'") if match else None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cache", type=Path, help="可选：已下载的固定快照缓存目录")
    args = parser.parse_args()
    tree = json.loads(fetch(f"https://api.github.com/repos/{REPO}/git/trees/{COMMIT}?recursive=1"))
    if tree.get("truncated"):
        raise RuntimeError("文件树被截断，拒绝生成不完整清单")
    blobs = {item["path"]: item for item in tree["tree"] if item["type"] == "blob"}
    skills = sorted(p for p in blobs if Path(p).name == "SKILL.md")
    requested = sorted(set(skills + EXTRA))

    def read(path):
        cached = args.cache / path if args.cache else None
        body = cached.read_bytes() if cached and cached.is_file() else fetch(
            f"https://raw.githubusercontent.com/{REPO}/{COMMIT}/{quote(path)}"
        )
        actual_blob = hashlib.sha1(b"blob " + str(len(body)).encode() + b"\0" + body).hexdigest()
        if actual_blob != blobs[path]["sha"]:
            raise RuntimeError(f"内容与固定文件树不一致：{path}")
        return path, body

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        contents = dict(pool.map(read, requested))

    records = []
    for path in skills:
        content = contents[path].decode("utf-8-sig")
        directory = path.rsplit("/", 1)[0] if "/" in path else ""
        nearby = sorted(p for p in blobs if p.startswith(directory + "/")) if directory else [p for p in blobs if "/" not in p]
        records.append({
            "path": path,
            "name": field(content, "name"),
            "declared_license": field(content, "license"),
            "url": BASE + quote(path),
            "blob_sha": blobs[path]["sha"],
            "sha256": hashlib.sha256(contents[path]).hexdigest(),
            "package_file_count": len(nearby),
            "package_scope": directory or "root_direct_files_only",
        })

    local = [r for r in records if r["path"].startswith("skills/") and not r["path"].startswith("skills/_template/")]
    names = {}
    for record in records:
        names.setdefault(record["name"], []).append(record["path"])
    local_data = json.loads(contents["data/local_skills.json"])
    source_data = json.loads(contents["SKILL_SOURCES.json"])
    external_data = json.loads(contents["data/skills.json"])
    evidence = {
        "repository": f"https://github.com/{REPO}",
        "commit": COMMIT,
        "tree_api_url": f"https://api.github.com/repos/{REPO}/git/trees/{COMMIT}?recursive=1",
        "tree_response_sha": tree["sha"],
        "tree_truncated": tree["truncated"],
        "study_date": "2026-09-18",
        "method": "完整文件树；精确 SKILL.md；逐文件 Git blob 校验；name 单行字段提取；不运行上游",
        "counts": {
            "all_skill_files": len(skills),
            "skills_including_template": sum(p.startswith("skills/") for p in skills),
            "skills_excluding_template": len(local),
            "skills_top_directories_excluding_template": len({r["path"].split("/")[1] for r in local}),
            "skills_distinct_declared_names": len({r["name"] for r in local}),
        },
        "upstream_declared_metadata": {
            "local": local_data["metadata"],
            "external_total": external_data["total"],
            "external_updated_at": external_data["updated_at"],
            "source_total": source_data["total_count"],
            "source_updated_at": source_data["last_updated"],
        },
        "root_license_paths": [p for p in blobs if "/" not in p and re.search(r"license|copying", p, re.I)],
        "duplicate_declared_names": {n: ps for n, ps in names.items() if len(ps) > 1},
        "skill_files": records,
        "additional_sources": [{
            "path": p, "url": BASE + quote(p), "blob_sha": blobs[p]["sha"],
            "sha256": hashlib.sha256(contents[p]).hexdigest(),
        } for p in EXTRA],
        "presence_checks": {p: p in blobs for p in [
            "skills/archify/bin/archify.mjs",
            "skills/ecommerce-full-pipeline/ecommerce-full-pipeline/main.py",
            "core/runtime.py", "antinet-agentteams/core/runtime.py",
        ]},
        "runtime_validation": "not_run",
    }
    output = PROJECT / "notes/evidence/sources.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# 固定版本技能文件清单", "",
        f"版本：`{COMMIT}`。本表由 [盘点脚本](../code/inspect_sources.py)生成；元数据与指纹见 [sources.json](evidence/sources.json)。", "",
        "本清单按文件路径列举，保留嵌套子技能与重复入口。任务作用与依赖见[能力分类](capabilities.md)，数量口径见[研究记录](research.md)。", "",
        "“目录文件数”是该 SKILL.md 所在目录及子目录的文件数；根入口仅数根层文件。数值为 1 表示只有技能说明，数值较大也不证明实现完整或可运行。所有入口均未进行上游运行验证。", "",
        "名称取技能文件的单行 name 声明，不按文件夹名称猜测。下列来源链接全部固定到研究 commit。", "",
    ]
    groups = [
        ("skills/ 下的 76 份非模板入口", local),
        ("根入口、应用实验及 AgentTeams 的 7 份入口", [r for r in records if not r["path"].startswith("skills/")]),
        ("技能模板（1 份，不计入使用能力）", [r for r in records if r["path"].startswith("skills/_template/")]),
    ]
    for title, items in groups:
        lines += ["## " + title, "", "| 声明名称 | 固定版本路径 | 目录文件数 |", "| --- | --- | --- |"]
        for r in items:
            lines.append(f"| `{r['name']}` | [{r['path']}]({r['url']}) | {r['package_file_count']} |")
        lines.append("")
    (PROJECT / "notes/inventory.md").write_text("\n".join(lines), encoding="utf-8")
    print(json.dumps({"counts": evidence["counts"], "hash_verified_files": len(contents)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
