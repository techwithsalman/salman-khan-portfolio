import re

with open("ref_dive_full.html", "r", encoding="utf-8") as f:
    html = f.read()

# Print all elements, IDs, classes, buttons, SVGs in ref_dive_full.html
tags = re.findall(r'<([a-zA-Z0-9]+)[^>]*class=["\']([^"\']+)["\']', html)
print("Tags with classes count:", len(tags))
for t, c in tags[:30]:
    print(f"<{t} class='{c}'>")

# Search for SVG paths or text
svgs = re.findall(r'<svg[^>]*>.*?</svg>', html, re.DOTALL)
print(f"\nTotal SVGs: {len(svgs)}")
for idx, s in enumerate(svgs):
    print(f"\n--- SVG {idx} ---")
    print(s[:400])

# Search for badge structure
badge = re.search(r'<div[^>]*class=["\'][^"\']*badge[^"\']*["\'][^>]*>(.*?)</div>', html, re.DOTALL | re.I)
if badge:
    print("\n--- BADGE ---")
    print(badge.group(0)[:1500])

# Search for phone structure
phone = re.search(r'<div[^>]*class=["\'][^"\']*phone[^"\']*["\'][^>]*>(.*?)</div>', html, re.DOTALL | re.I)
if phone:
    print("\n--- PHONE ---")
    print(phone.group(0)[:1500])
