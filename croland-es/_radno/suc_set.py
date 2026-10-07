# python3 suc_set.py <tsv> <map.tsv>  : postavi stupac 2 (samo ako je prazan) prema en<TAB>vrijednost; čuva kraj retka
import sys, csv, io
p, mp = sys.argv[1], sys.argv[2]
raw = open(p, encoding='utf-8', newline='').read(); crlf = '\r\n' in raw
rows = list(csv.reader(raw.splitlines(), delimiter='\t'))
T = dict(l.rstrip('\n').split('\t', 1) for l in open(mp, encoding='utf-8') if '\t' in l)
n = 0
for r in rows[1:]:
    if r[0] in T and not r[1]: r[1] = T[r[0]]; n += 1
b = io.StringIO(); csv.writer(b, delimiter='\t', lineterminator='\r\n' if crlf else '\n').writerows(rows)
open(p, 'w', encoding='utf-8', newline='').write(b.getvalue())
print(p, 'postavljeno', n, '| prazno ostalo:', sum(1 for r in rows[1:] if not r[1]))
