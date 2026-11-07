import re
import os

image_refs = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.css')):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8') as src_file:
                content = src_file.read()
                matches = re.findall(r'["\'`](/[a-zA-Z0-9_\-./]+\.(?:jpg|png|webp|svg))["\'`]', content)
                for m in matches:
                    image_refs.append((fp, m))

print(f"Total image references: {len(image_refs)}")
unique_images = sorted(list(set(m for _, m in image_refs)))
for img in unique_images:
    pub = os.path.join('public', img.lstrip('/'))
    exists = os.path.exists(pub)
    comps = [os.path.basename(fp) for fp, m in image_refs if m == img]
    print(f"{img} (exists={exists}) used in: {', '.join(set(comps))}")

