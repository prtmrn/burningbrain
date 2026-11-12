# Contrôle d'un fichier ext-*.py : 15 questions, t2/t6 uniques, t1 raisonnable, doublons normalisés, minimum 50 réponses.
import ast, sys, re, unicodedata
def norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip(); p = s.split(' ')
    if len(p) > 1 and p[0] in ('the','le','la','les','un','une'): s = ' '.join(p[1:])
    return s
for f in sys.argv[1:]:
    src = open(f, encoding='utf-8').read(); tree = ast.parse(src)
    env = {}; exec(compile(src, f, 'exec'), env)
    prompts = env.get('PROMPTS', []); T = env.get('T', {})
    problems = []
    if len(prompts) != 15: problems.append(f'{len(prompts)} questions')
    counts = []
    for q in prompts:
        pid = q['id']; tiers = T.get(pid)
        if tiers is None: problems.append(f'{pid} sans réponses'); continue
        used, n = set(), 0
        for tier in ['t1','t2','t6','t3','t4','t5']:
            for line in tiers.get(tier, []):
                ans, _, al = line.partition('=')
                keys = {norm(ans)} | {norm(a) for a in al.split('/') if a.strip()}
                if keys & used: problems.append(f'{pid} doublon {ans!r}'); continue
                used |= keys; n += 1
        t2 = len(tiers.get('t2', [])); t6 = len(tiers.get('t6', []))
        if t2 != 1 or t6 != 1: problems.append(f'{pid} t2={t2} t6={t6}')
        if n < 50: problems.append(f'{pid} seulement {n} réponses')
        counts.append(n)
    print(f, 'OK' if not problems else 'PROBLÈMES', (min(counts), max(counts)) if counts else '', problems[:6])
