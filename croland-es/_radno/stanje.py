# python3 stanje.py <NN gotova razina> <sljedece> <datoteka s bilješkom>
import sys, re
nn, sljed, bfile = sys.argv[1], sys.argv[2], sys.argv[3]
p = 'croland-es/STANJE.md'
s = open(p, encoding='utf-8').read()
s = re.sub(r'^Sljedeće: prijevod — .*$', 'Sljedeće: prijevod — ' + sljed, s, count=1, flags=re.M)
row = '| L%s | — | — |' % nn
assert row in s, row
s = s.replace(row, '| L%s | **gotovo** (07.10.2026.) | — |' % nn)
s = re.sub(r'Gotovo: \*\*L0, L01–L\d+\*\*', 'Gotovo: **L0, L01–L%s**' % nn, s)
note = open(bfile, encoding='utf-8').read().rstrip('\n')
marker = '\n\n\n### Provjera na računalu'
assert marker in s
s = s.replace(marker, '\n' + note + marker, 1)
open(p, 'w', encoding='utf-8', newline='\n').write(s)
print('ok')
