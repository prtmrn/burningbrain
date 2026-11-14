#!/usr/bin/env python3
"""Accepte les formes des autres langues pour les questions de la pool multilingue.

Les fiches EN et ES sont alignées par index sur la fiche FR (même taille, même
ordre). Pour chaque entrée, la forme dans les deux autres langues devient un
alias : un joueur anglais peut donc répondre « Cubisme » (FR) et un joueur
français « Cubism » (EN) sans être refusé. Aucune réponse n'est retirée.
Les collisions de clés normalisées sont ignorées (le validateur les refuserait).
Les fiches FR partagées (général + thème, D-42) reçoivent exactement la même
modification.

Usage :
  python3 content/build/apply_cross_lang.py           # rapport
  python3 content/build/apply_cross_lang.py --write   # écrit les banques
"""
import json
import pathlib
import re
import sys
import unicodedata

ROOT = pathlib.Path(__file__).resolve().parents[2]
FR_DIR = ROOT / "content" / "banks"
I18N_DIR = ROOT / "content" / "i18n" / "banks"
LANGS = ("en", "es")
ARTICLES = {"the", "le", "la", "les", "un", "une"}


def norm(s: str) -> str:
    s = s.lower().replace("ð", "d").replace("þ", "th").replace("ø", "o").replace("ł", "l").replace("đ", "d").replace("æ", "ae").replace("œ", "oe").replace("ß", "ss")
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"[-'’`´ʼ]", " ", s)
    s = re.sub(r"[^\w\s]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    head, _, rest = s.partition(" ")
    if rest and head in ARTICLES:
        s = rest
    return s


def keys_of(entry: dict) -> set[str]:
    return {norm(entry["answer"])} | {norm(a) for a in entry.get("aliases", [])}


def add_aliases(target: dict, others: list[str], index: dict[str, int], pos: int) -> int:
    """Ajoute les formes absentes de la fiche ; index : clé → position de l'entrée."""
    added = 0
    for form in others:
        k = norm(form)
        if not k or k in keys_of(target):
            continue
        owner = index.get(k)
        if owner is not None and owner != pos:
            continue  # collision avec une autre entrée : ignorée
        target.setdefault("aliases", []).append(form)
        index[k] = pos
        added += 1
    return added


def build_index(sheet: dict) -> dict[str, int]:
    idx: dict[str, int] = {}
    for pos, e in enumerate(sheet["entries"]):
        for k in keys_of(e):
            idx.setdefault(k, pos)
    return idx


def main() -> None:
    write = "--write" in sys.argv
    fr_banks = {p: json.loads(p.read_text(encoding="utf-8")) for p in sorted(FR_DIR.glob("*.json"))}
    i18n_banks = {lang: json.loads((I18N_DIR / f"general-{lang}.json").read_text(encoding="utf-8")) for lang in LANGS}

    fr_sheet: dict[str, dict] = {}
    for bank in fr_banks.values():
        for pid, s in bank["sheets"].items():
            fr_sheet.setdefault(pid, s)

    pool_ids = list(i18n_banks["en"]["sheets"].keys())
    new_sheets: dict[str, dict] = {}
    report = {"skipped": [], "added": 0}
    for pid in pool_ids:
        fr = json.loads(json.dumps(fr_sheet[pid]))
        sheets = {"fr": fr, "en": json.loads(json.dumps(i18n_banks["en"]["sheets"][pid])),
                  "es": json.loads(json.dumps(i18n_banks["es"]["sheets"][pid]))}
        n = len(fr["entries"])
        if any(len(sheets[l]["entries"]) != n for l in sheets):
            report["skipped"].append(pid)
            continue
        indexes = {l: build_index(sheets[l]) for l in sheets}
        for pos in range(n):
            form = {l: sheets[l]["entries"][pos]["answer"] for l in sheets}
            for l in sheets:
                others = [form[o] for o in sheets if o != l]
                report["added"] += add_aliases(sheets[l]["entries"][pos], others, indexes[l], pos)
        new_sheets[pid] = sheets

    print(f"pool : {len(pool_ids)} questions · alias ajoutés : {report['added']} · ignorées : {len(report['skipped'])}")
    if report["skipped"]:
        print("  ignorées (tailles différentes) :", report["skipped"][:10])
    if not write:
        return

    for pid, sheets in new_sheets.items():
        for bank in fr_banks.values():
            if pid in bank["sheets"]:
                bank["sheets"][pid] = json.loads(json.dumps(sheets["fr"]))
        for lang in LANGS:
            i18n_banks[lang]["sheets"][pid] = sheets[lang]
    for p, bank in fr_banks.items():
        p.write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for lang in LANGS:
        (I18N_DIR / f"general-{lang}.json").write_text(json.dumps(i18n_banks[lang], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("écrit")


if __name__ == "__main__":
    main()
