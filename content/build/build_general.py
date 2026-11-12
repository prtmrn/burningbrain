# Construit content/banks/general.json comme UNION (D-42) :
#   1. les questions propres au Général (déjà dans general.json, issues de build_lot) ;
#   2. toutes les questions des thèmes dont la feuille compte au moins 50 réponses
#      (feuille copiée à l'identique) ;
#   3. les questions propres ajoutées dans gen-*.py (PROMPTS + T, mêmes règles de tiers).
# Pipeline : build_lot → build_theme → build_general → build:content → validate.
# Idempotent : une question déjà présente n'est pas ajoutée deux fois.
import json, re, unicodedata, glob, os, importlib.util
QUIP = {'t2': "Un piège connu : beaucoup y pensent en premier.", 't6': "Celle-là, on ne l'attendait pas."}
def norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip(); p = s.split(' ')
    if len(p) > 1 and p[0] in ('the', 'le', 'la', 'les', 'un', 'une'): s = ' '.join(p[1:])
    return s
def sheet_from_tiers(pid, tiers):
    used, entries = set(), []
    for tier in ['t1', 't2', 't6', 't3', 't4', 't5']:
        for line in tiers.get(tier, []):
            ans, _, al = line.partition('=')
            aliases = [a.strip() for a in al.split('/') if a.strip()] if al else []
            keys = {norm(ans)} | {norm(a) for a in aliases}
            if keys & used or not norm(ans): continue
            used |= keys
            e = {'answer': ans.strip(), 'tier': tier, 'aliases': aliases}
            if tier in QUIP: e['quip'] = QUIP[tier]
            entries.append(e)
    return entries
base = json.load(open('content/banks/general.json', encoding='utf-8'))
ids = {p['id'] for p in base['prompts']}
added = {'themes': 0, 'propres': 0}
# 2. questions des thèmes (feuille identique, seulement si au moins 50 réponses)
for path in sorted(glob.glob('content/banks/*.json')):
    name = os.path.basename(path)[:-5]
    if name in ('general',): continue
    b = json.load(open(path, encoding='utf-8'))
    for p in b['prompts']:
        sh = b['sheets'].get(p['id'])
        if not sh or p['id'] in ids or len(sh['entries']) < 50: continue
        base['prompts'].append({'id': p['id'], 'theme': 'general', 'text': p['text']})
        base['sheets'][p['id']] = {'promptId': p['id'], 'contentVersion': 2, 'entries': sh['entries']}
        ids.add(p['id']); added['themes'] += 1
# 3. questions propres ajoutées
for f in sorted(glob.glob('content/build/gen-*.py')):
    spec = importlib.util.spec_from_file_location(os.path.basename(f)[:-3].replace('-', '_'), f)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for q in mod.PROMPTS:
        if q['id'] in ids: continue
        entries = sheet_from_tiers(q['id'], mod.T[q['id']])
        if sum(e['tier'] == 't2' for e in entries) != 1 or sum(e['tier'] == 't6' for e in entries) != 1: continue
        base['prompts'].append({'id': q['id'], 'theme': 'general', 'text': q['text']})
        base['sheets'][q['id']] = {'promptId': q['id'], 'contentVersion': 2, 'entries': entries}
        ids.add(q['id']); added['propres'] += 1
base['contentVersion'] = 2
json.dump(base, open('content/banks/general.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('général :', len(base['prompts']), 'questions', added)
