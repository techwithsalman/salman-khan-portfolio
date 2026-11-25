import re

with open("ref_style_3.css", "r", encoding="utf-8") as f:
    css = f.read()

# Look for flyer styles
flyer_css = re.findall(r'(\.LaptopDive_flyer[^\}]+\})', css)
print("Flyer CSS rules:", len(flyer_css))
for r in flyer_css:
    print(" ", r)

# Look for titles or info
title_css = re.findall(r'(\.LaptopDive_(?:title|desc|head|meta|info|brand|tag|open)[^\}]+\})', css)
print("\nTitle/meta CSS rules:", len(title_css))
for r in title_css:
    print(" ", r)
