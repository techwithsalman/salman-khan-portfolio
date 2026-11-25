with open("ref_dive_full.html", "r", encoding="utf-8") as f:
    text = f.read()

import re

# Clean HTML tags and print non-empty text lines
clean = re.sub(r'<[^>]+>', '\n', text)
lines = [l.strip() for l in clean.splitlines() if l.strip()]
print("Text lines inside laptop dive:")
for idx, l in enumerate(lines):
    print(f"{idx}: {l}")
