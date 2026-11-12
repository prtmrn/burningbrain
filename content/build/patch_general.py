# Compléments de réponses sur des questions existantes du Général (idempotent).
# Usage : python3 content/build/patch_general.py  (lit et réécrit content/banks/general.json)
import json, re, unicodedata
PATCH = {
    'gen-rappeur-fr': {
        'tier': 't3',
        'answers': ['Lamano', 'MMZ', 'TK', 'Alkpote', 'Gradur', 'Morad', 'Ashe 22', 'Hamza', 'Jüls', 'Lossa',
                    'Brav', 'Hoshi', 'Rost', 'MC Jean Gabin', 'Java', 'Rocé', 'La Rumeur', 'La Caution', 'Tandem'],
    },
}
def norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip(); p = s.split(' ')
    if len(p) > 1 and p[0] in ('the', 'le', 'la', 'les', 'un', 'une'): s = ' '.join(p[1:])
    return s
path = 'content/banks/general.json'
bank = json.load(open(path, encoding='utf-8'))
added = 0
for pid, spec in PATCH.items():
    entries = bank['sheets'][pid]['entries']
    used = {norm(e['answer']) for e in entries} | {norm(a) for e in entries for a in e.get('aliases', [])}
    for ans in spec['answers']:
        if norm(ans) in used: continue
        entries.append({'answer': ans, 'tier': spec['tier'], 'aliases': []})
        used.add(norm(ans)); added += 1
json.dump(bank, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('réponses ajoutées :', added)
