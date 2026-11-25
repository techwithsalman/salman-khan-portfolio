import re
import glob

css_files = glob.glob("ref_style_*.css")
classes_to_find = [
    "LaptopDive_stage", "LaptopDive_frame", "LaptopDive_wordmark", "LaptopDive_person",
    "LaptopDive_laptop", "LaptopDive_screen", "LaptopDive_deck", "LaptopDive_lid",
    "LaptopDive_flyer", "LaptopDive_badge", "LaptopDive_robot", "LaptopDive_script",
    "LaptopDive_navCase", "Reach_dock", "Reach_phone", "Reach_screen", "Reach_pointer"
]

for cf in css_files:
    with open(cf, "r", encoding="utf-8") as f:
        content = f.read()
    found = [c for c in classes_to_find if c in content]
    if found:
        print(f"File {cf} contains: {found}")
        # Print a few key rules
        for c in found[:4]:
            match = re.search(r'(\.' + re.escape(c) + r'[^\{]*\{[^\}]+\})', content)
            if match:
                print(f"  {match.group(1)[:300]}")
