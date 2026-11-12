# Construit content/banks/general.json (v2) à partir d'un ou plusieurs fichiers de lot. Dédoublonnage normalisé, premier gagnant : t1 > t2 > t6 > t3 > t4 > t5.
import json, re, sys, unicodedata
import importlib.util
T = {}
for f in sys.argv[1:]:
    spec = importlib.util.spec_from_file_location(f.split('/')[-1].replace('.py',''), f)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for k, v in mod.T.items():
        if f.split('/')[-1].startswith('extra') and k in T:
            for tier, items in v.items():
                T[k][tier] = T[k].get(tier, []) + items   # compléments : s'ajoutent aux tiers
        else:
            assert k not in T, f'question en double entre lots : {k}'
            T[k] = v
plan = {x['id']: x for x in json.load(open('content/general-v2.plan.json', encoding='utf-8'))['prompts']}
def norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip()
    parts = s.split(' ')
    if len(parts) > 1 and parts[0] in ('the', 'le', 'la', 'les', 'un', 'une'):
        s = ' '.join(parts[1:])   # article initial, comme normalize() du moteur
    return s
QUIP = {'t2': "Un piège connu : beaucoup y pensent en premier.", 't6': "Celle-là, on ne l'attendait pas."}
bank = {'theme': 'general', 'contentVersion': 2, 'prompts': [], 'sheets': {}}
report = []
order = [x['id'] for x in json.load(open('content/general-v2.plan.json', encoding='utf-8'))['prompts']]
RETIRED = set(json.load(open('content/retired.json', encoding='utf-8'))['ids'])  # D-41
order = [i for i in order if i not in RETIRED]
for pid in [i for i in order if i in T]:
    tiers = T[pid]
    used, entries = set(), []
    for tier in ['t1', 't2', 't6', 't3', 't4', 't5']:
        for line in tiers.get(tier, []):
            ans, _, al = line.partition('=')
            aliases = [a.strip() for a in al.split('/') if a.strip()] if al else []
            keys = {norm(ans)} | {norm(a) for a in aliases}
            if keys & used or not norm(ans):
                continue  # doublon : premier gagnant
            used |= keys
            e = {'answer': ans.strip(), 'tier': tier, 'aliases': aliases}
            if tier in QUIP: e['quip'] = QUIP[tier]
            entries.append(e)
    tc = {t: sum(1 for e in entries if e['tier'] == t) for t in ['t2', 't6']}
    assert tc['t2'] == 1 and tc['t6'] == 1, (pid, tc)
    bank['prompts'].append({'id': pid, 'theme': 'general', 'text': plan[pid]['text']})
    bank['sheets'][pid] = {'promptId': pid, 'contentVersion': 2, 'entries': entries}
    report.append((pid, len(entries)))
json.dump(bank, open('content/banks/general.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
for pid, n in report: print(f'{n:4d}  {pid}')
print('moyenne', round(sum(n for _, n in report) / len(report)))
