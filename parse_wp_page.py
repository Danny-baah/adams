import re
from html import unescape

with open('wp_page_21.html', 'r', encoding='utf-8') as f:
    html = f.read()

# find all h3, p, and promo boxes
boxes = re.findall(r'<div class=\"wpr-promo-box-content\">(.*?)</div>', html, flags=re.DOTALL)
print(f'Found {len(boxes)} promo boxes')
for i, b in enumerate(boxes):
    clean = re.sub(r'<[^>]+>', ' ', b)
    clean = re.sub(r'\s+', ' ', clean).strip()
    print(f'Box {i+1}: {unescape(clean)}')

print('\n--- ALL PARAGRAPHS ---')
ps = re.findall(r'<p[^>]*>(.*?)</p>', html, flags=re.DOTALL)
for p in ps:
    clean = re.sub(r'<[^>]+>', ' ', p)
    clean = re.sub(r'\s+', ' ', clean).strip()
    if len(clean) > 20:
        print('P:', unescape(clean))

