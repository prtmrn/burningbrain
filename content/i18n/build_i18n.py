# Construit les banques traduites du Général (EN, ES) à partir :
#   - des tranches FR (slices/sN.json : id, texte, entries {answer, tier}) ;
#   - des traductions (en/sN.json, es/sN.json : id -> {text, answers[]}), alignées par index.
# Sortie : content/i18n/banks/general-<lang>.json (theme "general-<lang>", contentVersion 2).
# Les tiers et le nombre de réponses viennent du FR ; t2 et t6 gardent un seul élément.
import json, re, unicodedata, glob
QUIP = {'t2': "Un piège connu : beaucoup y pensent en premier.", 't6': "Celle-là, on ne l'attendait pas."}
def norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip(); p = s.split(' ')
    if len(p) > 1 and p[0] in ('the', 'le', 'la', 'les', 'un', 'une', 'el', 'la', 'los', 'las', 'the'): s = ' '.join(p[1:])
    return s
src = []
for n in range(1, 8):
    src += json.load(open(f'slices/s{n}.json', encoding='utf-8'))
for lang in ['en', 'es']:
    prompts, sheets = [], {}
    theme = f'general-{lang}'
    for n in range(1, 8):
        tr = json.load(open(f'{lang}/s{n}.json', encoding='utf-8'))
        for q in json.load(open(f'slices/s{n}.json', encoding='utf-8')):
            t = tr[q['id']]
            assert len(t['answers']) == len(q['entries']), q['id']
            used, entries = set(), []
            for e, ans in zip(q['entries'], t['answers']):
                ans = ans.strip()
                if not ans or norm(ans) in used: continue
                used.add(norm(ans))
                item = {'answer': ans, 'tier': e['tier'], 'aliases': []}
                if e['tier'] in QUIP: item['quip'] = QUIP[e['tier']]
                entries.append(item)
            prompts.append({'id': q['id'], 'theme': theme, 'text': t['text']})
            sheets[q['id']] = {'promptId': q['id'], 'contentVersion': 2, 'entries': entries}
    bank = {'theme': theme, 'contentVersion': 2, 'prompts': prompts, 'sheets': sheets}
    json.dump(bank, open(f'banks/general-{lang}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    counts = [len(s['entries']) for s in sheets.values()]
    bad = [pid for pid, s in sheets.items() if sum(e['tier'] == 't2' for e in s['entries']) != 1 or sum(e['tier'] == 't6' for e in s['entries']) != 1]
    print(lang, len(prompts), 'questions | réponses min/max', min(counts), max(counts), '| t2/t6 invalides:', bad)
