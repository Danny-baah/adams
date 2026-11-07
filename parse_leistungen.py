import re
from html import unescape

with open('leistungen_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

clean = re.sub(r'<script.*?</script>', '', html, flags=re.DOTALL)
clean = re.sub(r'<style.*?</style>', '', clean, flags=re.DOTALL)

headings = re.findall(r'<h[234][^>]*>(.*?)</h[234]>', clean, flags=re.DOTALL)
print('--- HEADINGS ---')
for h in headings:
    t = re.sub(r'<[^>]+>', '', h).strip()
    if t:
        print('H:', unescape(t))

print('\n--- SECTIONS & LISTS ---')
# Let's extract text blocks
blocks = re.findall(r'<(div|section|article)[^>]*class=[\'"][^\'"]*elementor-widget-wrap[^\'"]*[\'"][^>]*>(.*?)</\1>', clean, flags=re.DOTALL)
print(f'Found {len(blocks)} elementor blocks')

# Also search for list items
lis = re.findall(r'<li[^>]*>(.*?)</li>', clean, flags=re.DOTALL)
print(f'Found {len(lis)} lis')
for li in lis:
    text = re.sub(r'<[^>]+>', '', li).strip()
    if len(text) > 5 and len(text) < 120:
        print('LI:', unescape(text))

# Search for images
imgs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html)
print('\n--- IMAGES ---')
for img in set(imgs):
    if 'wp-content/uploads' in img and not any(x in img for x in ['logo', 'icon', 'svg']):
        print('IMG:', img)

