with open("extracted_exact_styles.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total CSS rules: {len(lines)}")
for l in lines:
    if any(k in l for k in ["flyer", "screen", "laptop", "navCase"]):
        print(l[:180])
