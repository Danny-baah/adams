import re
from html import unescape

with open('leistungen_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Service headings:
# Klassische Elektroinstallation
# Smart Home & Bussysteme
# Kommunikationsleitungen
# Spezial- & Schutzleitungen
# Infrastruktur für Elektromobilität
# Prüfung, Wartung & Instandhaltung

services = [
    'Klassische Elektroinstallation',
    'Smart Home & Bussysteme',
    'Kommunikationsleitungen',
    'Spezial- & Schutzleitungen',
    'Infrastruktur für Elektromobilität',
    'Prüfung, Wartung & Instandhaltung',
]

for s in services:
    print(f"\n==================== {s} ====================")
    pos = html.find(s)
    if pos != -1:
        snippet = html[pos:pos+1500]
        # remove tags
        text = re.sub(r'<[^>]+>', ' ', snippet)
        text = re.sub(r'\s+', ' ', text).strip()
        print(unescape(text[:500]))

