#!/usr/bin/env python3
"""Attribue un niveau de difficulté à chaque question (easy / medium / hard).

Critère : part des réponses « connues » (tiers t1 et t2) dans la feuille.
  - part faible  → peu de réponses qu'un joueur moyen connaît → difficile ;
  - part forte   → beaucoup de réponses évidentes → facile.
Seuils : tertiles des parts observées sur les questions françaises (content/banks),
bornes incluses : part ≤ Q1 → hard ; part ≥ Q2 → easy ; sinon medium.
Les ex æquo restent dans le même niveau.

Plancher : les questions des thèmes culturels (arts-literature, entertainment)
ne descendent jamais sous « moyen », même si la part de réponses connues est forte.
Le thème retenu est celui de la banque spécifique de la question (la banque
« general » ne fait que recopier les questions des autres thèmes).

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
CULTURE_THEMES = ("arts-literature", "entertainment")  # plancher : jamais « facile »


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

    home_theme: dict[str, str] = {}
    for path in sorted(FR_DIR.glob("*.json")):
        if path.name == "general.json":
            continue
        bank = json.loads(path.read_text(encoding="utf-8"))
        for p in bank["prompts"]:
            home_theme[p["id"]] = bank["theme"]

    levels = {pid: level(s) for pid, s in shares.items()}
    raised = [pid for pid, lv in levels.items() if lv == "easy" and home_theme.get(pid) in CULTURE_THEMES]
    for pid in raised:
        levels[pid] = "medium"
    print(f"plancher culture : {len(raised)} question(s) passées de facile à moyen")

    # « facile » = liste relue à la main (content/build/easy_ids.txt) : tout le reste
    # qui sortait facile par le critère statistique passe en moyen ; les ids listés
    # sont facile même si le critère les classait autrement.
    confirmed = {
        line.strip()
        for line in (ROOT / "content" / "build" / "easy_ids.txt").read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.startswith("#")
    }
    unknown = sorted(confirmed - set(levels))
    if unknown:
        raise SystemExit(f"easy_ids.txt : ids inconnus {unknown[:5]}")
    demoted = [pid for pid, lv in levels.items() if lv == "easy" and pid not in confirmed]
    promoted = [pid for pid in confirmed if levels[pid] != "easy"]
    for pid in demoted:
        levels[pid] = "medium"
    for pid in promoted:
        levels[pid] = "easy"
    print(f"facile relu : {len(confirmed)} confirmées · {len(demoted)} repassées en moyen · {len(promoted)} promues")

    # Classement relu par l'éditeur (content/build/difficulty_overrides.tsv) : appliqué en dernier.
    overrides = {}
    for line in (ROOT / "content" / "build" / "difficulty_overrides.tsv").read_text(encoding="utf-8").splitlines():
        if line.strip() and not line.startswith("#"):
            pid, level = line.split("\t")
            overrides[pid] = level
    unknown_ov = sorted(set(overrides) - set(levels))
    if unknown_ov:
        raise SystemExit(f"difficulty_overrides.tsv : ids inconnus {unknown_ov[:5]}")
    for pid, level in overrides.items():
        levels[pid] = level
    print(f"surcharges éditeur appliquées : {len(overrides)}")
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
