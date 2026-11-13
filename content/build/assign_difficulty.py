#!/usr/bin/env python3
"""Attribue un niveau de difficulté à chaque question (easy / medium / hard).

Critère : part des réponses « connues » (tiers t1 et t2) dans la feuille.
  - part faible  → peu de réponses qu'un joueur moyen connaît → difficile ;
  - part forte   → beaucoup de réponses évidentes → facile.
Seuils : tertiles des parts observées sur les questions françaises (content/banks),
bornes incluses : part ≤ Q1 → hard ; part ≥ Q2 → easy ; sinon medium.
Les ex æquo restent dans le même niveau.

Le niveau est lu sur la feuille française (même promptId) et recopié sur chaque
prompt de chaque banque, y compris les banques EN/ES (content/i18n/banks).

Usage :
  python3 content/build/assign_difficulty.py           # rapport seulement
  python3 content/build/assign_difficulty.py --write   # écrit les banques
"""
import json
import pathlib
import sys
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[2]
FR_DIR = ROOT / "content" / "banks"
I18N_DIR = ROOT / "content" / "i18n" / "banks"
KNOWN_TIERS = ("t1", "t2")


def known_share(sheet: dict) -> float:
    entries = sheet["entries"]
    known = sum(1 for e in entries if e["tier"] in KNOWN_TIERS)
    return known / len(entries)


def main() -> None:
    write = "--write" in sys.argv

    shares: dict[str, float] = {}
    for path in sorted(FR_DIR.glob("*.json")):
        bank = json.loads(path.read_text(encoding="utf-8"))
        for pid, sheet in bank.get("sheets", {}).items():
            s = known_share(sheet)
            if pid in shares and abs(shares[pid] - s) > 1e-9:
                raise SystemExit(f"{pid}: parts différentes selon les banques FR")
            shares[pid] = s

    ordered = sorted(shares.values())
    n = len(ordered)
    q1 = ordered[n // 3]
    q2 = ordered[(2 * n) // 3]

    def level(s: float) -> str:
        if s <= q1:
            return "hard"
        if s >= q2:
            return "easy"
        return "medium"

    levels = {pid: level(s) for pid, s in shares.items()}
    print(f"questions : {n} · seuils : hard ≤ {q1:.4f} < medium < {q2:.4f} ≤ easy")
    print("répartition :", dict(Counter(levels.values())))

    for directory in (FR_DIR, I18N_DIR):
        for path in sorted(directory.glob("*.json")):
            bank = json.loads(path.read_text(encoding="utf-8"))
            missing = [p["id"] for p in bank["prompts"] if p["id"] not in levels]
            if missing:
                raise SystemExit(f"[{path.name}] questions sans feuille FR : {missing[:5]}")
            for p in bank["prompts"]:
                p["difficulty"] = levels[p["id"]]
            print(f"[{path.relative_to(ROOT)}] {len(bank['prompts'])} questions")
            if write:
                path.write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
