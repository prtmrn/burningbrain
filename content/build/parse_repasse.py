#!/usr/bin/env python3
"""Convertit content/verify/repasse/*.txt en content/verify/repasse.json.

Format des .txt : sections « ## identifiant », une réponse par ligne, variantes après « | »
séparées par « ; ». Les doublons (même réponse dans deux fichiers) sont fusionnés.
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "content" / "verify" / "repasse"
OUT = ROOT / "content" / "verify" / "repasse.json"


def main() -> None:
    data: dict[str, dict] = {}
    for path in sorted(SRC.glob("*.txt")):
        current = None
        for raw in path.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if line.startswith("## "):
                current = line[3:].strip()
                data.setdefault(current, {"sources": [], "answers": []})
                continue
            if not line or line.startswith("#"):
                continue
            if current is None:
                raise SystemExit(f"{path.name} : réponse hors section : {line}")
            name, _, rest = line.partition("|")
            aliases = [a.strip() for a in rest.split(";") if a.strip()]
            entry = {"answer": name.strip(), "aliases": aliases}
            known = {e["answer"] for e in data[current]["answers"]}
            if entry["answer"] not in known:
                data[current]["answers"].append(entry)
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for k, v in data.items():
        print(f"{k}: {len(v['answers'])} réponses")


if __name__ == "__main__":
    main()
