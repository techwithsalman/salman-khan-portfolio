with open("ref_dive_full.html", "r", encoding="utf-8") as f:
    html = f.read()

import re

# Look for cases or projects inside dive
cases = re.findall(r'<div[^>]*class=["\'][^"\']*case[^"\']*["\'][^>]*>.*?</div>', html, re.DOTALL | re.I)
print(f"Cases divs: {len(cases)}")

# Look for plaque or info
plaque = re.findall(r'<div[^>]*class=["\'][^"\']*(?:plaque|info|brand|title|desc|screen)[^"\']*["\'][^>]*>', html, re.I)
print("Plaque / screen classes:")
for p in plaque[:20]:
    print(" ", p)

# Search for the laptop screen container and controls
controls = re.findall(r'<button[^>]*>.*?</button>', html, re.DOTALL | re.I)
print("\nButtons inside dive:")
for b in controls:
    print(" [Button]", re.sub(r'<[^>]+>', ' ', b).strip())

# Search for all classes in ref_dive_full.html
classes = sorted(set(re.findall(r'class=["\']([^"\']+)["\']', html)))
print(f"\nAll classes in dive ({len(classes)}):")
for c in classes:
    print(" *", c)
