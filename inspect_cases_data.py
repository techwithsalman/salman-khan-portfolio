import re

with open("ref_inspect.html", "r", encoding="utf-8") as f:
    html = f.read()

# Search for the cases array or project metadata in HTML or scripts
cases_texts = re.findall(r'(\{"[^"]*title"[^}]+\})', html)
print(f"Cases metadata matches: {len(cases_texts)}")
for c in cases_texts[:5]:
    print(" ", c)

# Search for case names mentioned in the text
case_names = ["Tangier", "Crafters", "Taxi", "Boukir", "Port Azur", "Atlas Nest", "Rovelis"]
for name in case_names:
    matches = [m.start() for m in re.finditer(name, html, re.I)]
    print(f"Matches for '{name}': {len(matches)}")
    if matches:
        idx = matches[0]
        snippet = html[max(0, idx - 100):min(len(html), idx + 200)]
        print("  Snippet:", re.sub(r'<[^>]+>', ' ', snippet))
