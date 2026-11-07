import re

with open('leistungen_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

links = re.findall(r'href=[\'"](https://elektro-adamas\.de/[^\'"]*)[\'"]', html)
for l in sorted(set(links)):
    print(l)

