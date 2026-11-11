# Construit content/banks/<thème>.json (contentVersion 2) à partir de content/themes-plan.json et des fichiers th*.py.
# Dédoublonnage normalisé : t1 > t2 > t6 > t3 > t4 > t5. Une question sans feuille est ignorée et signalée.
import json, re, sys, unicodedata, glob, os, importlib.util
T = {}
for f in sorted(glob.glob('content/build/th[0-9]*.py'), key=lambda x: int(re.search(r'th(\d+)\.py', x).group(1))):
    spec = importlib.util.spec_from_file_location(os.path.basename(f)[:-3], f); mod = importlib.util.module_from_spec(spec)
    try: spec.loader.exec_module(mod)
    except Exception as e: print('ERREUR', f, e); continue
    for k, v in mod.T.items(): T[k] = v
plan = json.load(open('content/themes-plan.json', encoding='utf-8'))['prompts']
def norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip()
    parts = s.split(' ')
    if len(parts) > 1 and parts[0] in ('the', 'le', 'la', 'les', 'un', 'une'):
        s = ' '.join(parts[1:])   # article initial, comme normalize() du moteur
    return s
QUIP = {'t2': "Un piège connu : beaucoup y pensent en premier.", 't6': "Celle-là, on ne l'attendait pas."}
banks, report, missing = {}, [], []
for q in plan:
    pid, th = q['id'], q['theme']
    if pid not in T: missing.append(pid); continue
    used, entries = set(), []
    for tier in ['t1', 't2', 't6', 't3', 't4', 't5']:
        for line in T[pid].get(tier, []):
            ans, _, al = line.partition('=')
            aliases = [a.strip() for a in al.split('/') if a.strip()] if al else []
            keys = {norm(ans)} | {norm(a) for a in aliases}
            if keys & used or not norm(ans): continue
            used |= keys
            e = {'answer': ans.strip(), 'tier': tier, 'aliases': aliases}
            if tier in QUIP: e['quip'] = QUIP[tier]
            entries.append(e)
    n2 = sum(e['tier'] == 't2' for e in entries); n6 = sum(e['tier'] == 't6' for e in entries)
    if n2 != 1 or n6 != 1: print('t2/t6 invalides :', pid, n2, n6); missing.append(pid); continue
    b = banks.setdefault(th, {'theme': th, 'contentVersion': 2, 'prompts': [], 'sheets': {}})
    b['prompts'].append({'id': pid, 'theme': th, 'text': q['text']})
    b['sheets'][pid] = {'promptId': pid, 'contentVersion': 2, 'entries': entries}
    report.append((th, pid, len(entries)))
for th, b in banks.items():
    json.dump(b, open(f'content/banks/{th}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
for th, pid, n in report: print(f'{n:4d}  {th:16s} {pid}' + ('   <-- SOUS 50' if n < 50 else ''))
print('banques :', {th: len(b['prompts']) for th, b in banks.items()})
print('manquantes :', missing)
