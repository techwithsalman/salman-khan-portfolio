import re

with open("ref_style_3.css", "r", encoding="utf-8") as f:
    css3 = f.read()

with open("ref_style_4.css", "r", encoding="utf-8") as f:
    css4 = f.read()

classes = [
    "LaptopDive_stage", "LaptopDive_frame", "LaptopDive_backdrop", "LaptopDive_wordmark",
    "LaptopDive_person", "LaptopDive_robot", "LaptopDive_plant", "LaptopDive_badge",
    "LaptopDive_laptop", "LaptopDive_screen", "LaptopDive_flyer", "LaptopDive_navCase",
    "LaptopDive_skip", "LaptopDive_script", "Reach_dock", "Reach_phone", "Reach_screen", "Reach_pointer"
]

with open("extracted_exact_styles.css", "w", encoding="utf-8") as out:
    for c in classes:
        for css in [css3, css4]:
            matches = re.findall(r'(\.' + re.escape(c) + r'[^\{]*\{[^\}]+\})', css)
            for m in matches:
                out.write(m + "\n")

print("Saved extracted_exact_styles.css")
