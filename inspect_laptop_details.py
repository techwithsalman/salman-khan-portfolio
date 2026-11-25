with open("ref_dive_full.html", "r", encoding="utf-8") as f:
    html = f.read()

import re

# Print the laptop structure
laptop = re.search(r'(<div[^>]*class=["\'][^"\']*laptop__[^"\']*["\'][^>]*>.*?)(?=<div class="LaptopDive_badge|<div class="LaptopDive_plant|$)', html, re.DOTALL)
if laptop:
    print("--- LAPTOP HTML ---")
    print(laptop.group(1)[:2500])

# Print the flyer / plaque
flyer = re.search(r'(<div[^>]*class=["\'][^"\']*flyer[^"\']*["\'][^>]*>.*?</div>\s*</div>)', html, re.DOTALL)
if flyer:
    print("\n--- FLYER PLAQUE HTML ---")
    print(flyer.group(0)[:1500])

# Print script typography
script = re.search(r'(<div[^>]*class=["\'][^"\']*script[^"\']*["\'][^>]*>.*?</div>\s*</div>)', html, re.DOTALL)
if script:
    print("\n--- SCRIPT TYPOGRAPHY HTML ---")
    print(script.group(0)[:1000])

# Print reach / phone
reach = re.search(r'(<aside[^>]*>.*?</aside>|<div[^>]*class=["\'][^"\']*phone[^"\']*["\'][^>]*>.*?</div>)', html, re.DOTALL)
if reach:
    print("\n--- REACH / PHONE HTML ---")
    print(reach.group(0)[:1000])
