with open("ref_dive_full.html", "r", encoding="utf-8") as f:
    html = f.read()

import re

for line in html.splitlines():
    if any(k in line.lower() for k in ["case", "project", "open", "previous", "next", "tangier"]):
        print(line[:300])
