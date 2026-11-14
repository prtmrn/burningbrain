#!/usr/bin/env python3
"""Ajoute les questions faciles traduites (EN, ES) aux banques multilingues.

Entrées : content/i18n/easy-batches/out-<k>-<lang>.json (k = 1..6), produits par les
traducteurs à partir de src-<k>.json. Chaque entrée : {id: {"text", "answers"}} avec
« answers » aligné sur les réponses françaises (même longueur, même ordre).

Pour chaque question : prompt (theme general-<lang>, difficulté reprise du FR) et
feuille (tiers repris du FR). L'identifiant est ajouté à la pool multilingue
(apps/web/src/server/multi/i18n-pool.json). Les alias croisés sont ensuite posés par
content/build/apply_cross_lang.py.

Usage : python3 content/build/add_easy_i18n.py --write
"""
import glob
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
BATCHES = ROOT / "content" / "i18n" / "easy-batches"
I18N = ROOT / "content" / "i18n" / "banks"
POOL = ROOT / "apps" / "web" / "src" / "server" / "multi" / "i18n-pool.json"
LANGS = ("en", "es")


def fr_sources() -> dict:
    src = {}
    for f in sorted((ROOT / "content" / "banks").glob("*.json")):
        b = json.loads(f.read_text(encoding="utf-8"))
        for p in b["prompts"]:
            if p["id"] in b["sheets"] and p["id"] not in src:
                src[p["id"]] = (p, b["sheets"][p["id"]]["entries"])
    return src


def main() -> None:
    write = "--write" in sys.argv
    src = fr_sources()
    problems = []
    translated: dict[str, dict] = {lang: {} for lang in LANGS}
    for k in range(1, 7):
        for lang in LANGS:
            path = BATCHES / f"out-{k}-{lang}.json"
            if not path.exists():
                problems.append(f"manquant : {path.name}")
                continue
            data = json.loads(path.read_text(encoding="utf-8"))
            for pid, item in data.items():
                if pid not in src:
                    problems.append(f"{lang} {pid} : identifiant inconnu")
                    continue
                fr_entries = src[pid][1]
                if len(item["answers"]) != len(fr_entries):
                    problems.append(f"{lang} {pid} : {len(item['answers'])} réponses au lieu de {len(fr_entries)}")
                    continue
                translated[lang][pid] = item
    fr_only = set(json.loads((ROOT / "apps" / "web" / "src" / "server" / "multi" / "fr-only.json").read_text(encoding="utf-8"))["fr_only"])
    ids = sorted((set(translated["en"]) & set(translated["es"])) - fr_only)  # les très françaises restent FR
    missing = sorted({pid for pid in src if pid in set(ids)} ^ set(ids))
    print(f"questions complètes (EN et ES) : {len(ids)}")
    for p in problems[:20]:
        print("  !", p)
    if problems or len(ids) != len(set(ids)):
        raise SystemExit("contrôle échoué : rien n'a été écrit")

    pool = json.loads(POOL.read_text(encoding="utf-8"))
    added_pool = [pid for pid in ids if pid not in pool]
    for lang in LANGS:
        path = I18N / f"general-{lang}.json"
        bank = json.loads(path.read_text(encoding="utf-8"))
        existing = {p["id"] for p in bank["prompts"]}
        n = 0
        for pid in ids:
            if pid in existing:
                continue
            fr_prompt, fr_entries = src[pid]
            item = translated[lang][pid]
            bank["prompts"].append({
                "id": pid,
                "theme": f"general-{lang}",
                "text": item["text"],
                "difficulty": fr_prompt.get("difficulty", "easy"),
            })
            bank["sheets"][pid] = {
                "promptId": pid,
                "contentVersion": bank.get("contentVersion", 2),
                "entries": [
                    {"answer": ans, "tier": fe["tier"], "aliases": []}
                    for ans, fe in zip(item["answers"], fr_entries)
                ],
            }
            n += 1
        print(f"[general-{lang}] {n} questions ajoutées")
        if write:
            path.write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"pool multilingue : +{len(added_pool)} identifiants")
    if write:
        POOL.write_text(json.dumps(pool + added_pool, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("écrit")


if __name__ == "__main__":
    main()
