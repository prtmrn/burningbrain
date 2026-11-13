#!/usr/bin/env python3
"""Applique les listes fermées vérifiées (content/verify/closed-lists.json) aux banques.

Règles :
- une réponse vérifiée déjà présente (même nom ou même alias, normalisé) garde son tier
  et reçoit les alias vérifiés manquants ;
- une réponse vérifiée absente est ajoutée avec le tier TIER_NEW (t3 par défaut) ;
- aucune réponse existante n'est retirée : celles absentes de la source sont listées
  dans le rapport pour relecture ;
- les sheets gardent exactement un t2 et un t6 (on n'ajoute jamais de t2 ni de t6).

Usage :
  python3 content/build/apply_closed.py           # essai à blanc, rapport seulement
  python3 content/build/apply_closed.py --write   # écrit les banques
"""
import json
import pathlib
import re
import sys
import unicodedata

ROOT = pathlib.Path(__file__).resolve().parents[2]
VERIFY = ROOT / "content" / "verify" / "closed-lists.json"
BANKS_DIR = ROOT / "content" / "banks"
TIER_NEW = "t3"


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace("’", "'")
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return s.strip()


def apply_to_sheet(sheet: dict, verified: list[dict]) -> dict:
    entries = sheet["entries"]
    index = {}
    for e in entries:
        index.setdefault(norm(e["answer"]), e)
        for a in e.get("aliases", []):
            index.setdefault(norm(a), e)

    added, aliased, missing_in_source = [], [], []
    for v in verified:
        keys = [norm(v["answer"])] + [norm(a) for a in v.get("aliases", [])]
        hit = next((index[k] for k in keys if k in index), None)
        if hit is None:
            new = {"answer": v["answer"], "tier": TIER_NEW, "aliases": list(v.get("aliases", []))}
            entries.append(new)
            for k in keys:
                index.setdefault(k, new)
            added.append(v["answer"])
        else:
            have = {norm(x) for x in hit.get("aliases", [])} | {norm(hit["answer"])}
            extra = [a for a in v.get("aliases", []) if norm(a) not in have]
            if extra:
                hit.setdefault("aliases", []).extend(extra)
                aliased.append((hit["answer"], extra))

    verified_keys = set()
    for v in verified:
        verified_keys.add(norm(v["answer"]))
        verified_keys.update(norm(a) for a in v.get("aliases", []))
    for e in entries:
        keys = {norm(e["answer"])} | {norm(a) for a in e.get("aliases", [])}
        if not keys & verified_keys:
            missing_in_source.append(f'{e["answer"]} ({e["tier"]})')

    tiers = [e["tier"] for e in entries]
    if tiers.count("t2") != 1 or tiers.count("t6") != 1:
        raise SystemExit(f"sheet {sheet['promptId']}: t2={tiers.count('t2')} t6={tiers.count('t6')}")
    return {"added": added, "aliased": aliased, "missing_in_source": missing_in_source}


def main() -> None:
    write = "--write" in sys.argv
    verify = json.loads(VERIFY.read_text(encoding="utf-8"))
    targets = {k: v for k, v in verify.items() if not k.startswith("_")}

    for path in sorted(BANKS_DIR.glob("*.json")):
        bank = json.loads(path.read_text(encoding="utf-8"))
        sheets = bank.get("sheets", {})
        touched = False
        for pid, data in targets.items():
            if pid not in sheets:
                continue
            rep = apply_to_sheet(sheets[pid], data["answers"])
            touched = True
            print(f"[{path.name}] {pid}: +{len(rep['added'])} ajoutées, "
                  f"{len(rep['aliased'])} alias ajoutés, "
                  f"{len(rep['missing_in_source'])} absentes de la source")
            if rep["added"]:
                print("   ajoutées :", ", ".join(rep["added"]))
            if rep["missing_in_source"]:
                print("   à relire :", ", ".join(rep["missing_in_source"]))
        if touched and write:
            path.write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"   -> écrit {path.name}")


if __name__ == "__main__":
    main()
