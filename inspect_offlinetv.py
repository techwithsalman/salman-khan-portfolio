import re

with open("ref_style_2.css", "r", encoding="utf-8") as f:
    css = f.read()

matches = re.findall(r'(\.OfflineTV_[^\{]+\{[^\}]+\})', css)
print("OfflineTV CSS count:", len(matches))
for m in matches[:10]:
    print(" ", m[:200])
