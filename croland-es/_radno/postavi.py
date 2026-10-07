# python3 postavi.py en_file : svaki redak "en<TAB>es" upisuje u prijevod-es.tsv (es može biti '=')
import sys, csv
p = 'croland-es/prijevod-es.tsv'
rows = list(csv.DictReader(open(p, encoding='utf-8'), delimiter='\t'))
idx = {r['en']: r for r in rows}
n = 0
for ln in open(sys.argv[1], encoding='utf-8'):
    ln = ln.rstrip('\n')
    if not ln: continue
    en, es = ln.split('\t')
    assert en in idx, en
    idx[en]['es'] = es; n += 1
with open(p, 'w', encoding='utf-8', newline='') as fo:
    w = csv.DictWriter(fo, fieldnames=['en', 'es', 'puta', 'prvi_id', 'jezik'], delimiter='\t', lineterminator='\n')
    w.writeheader(); w.writerows(rows)
print('postavljeno', n)
