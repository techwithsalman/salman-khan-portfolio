import urllib.request
import re

url = "https://2mcrafters.com/mohamedandaloussi/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
try:
    with urllib.request.urlopen(req, timeout=15) as res:
        html = res.read().decode("utf-8", errors="ignore")

    print("HTML length:", len(html))
    images = re.findall(r'src=["\']([^"\']+\.(?:webp|png|jpg|jpeg|svg))["\']', html, re.I)
    print("Found images:")
    for img in sorted(set(images)):
        print("  -", img)

    # Search for all elements under id="laptop-dive"
    dive = re.search(r'<section[^>]*id="laptop-dive"[^>]*>(.*?)</section>', html, re.DOTALL)
    if dive:
        dive_content = dive.group(1)
        print("\n--- LAPTOP DIVE CONTENT (first 2000 chars) ---")
        print(dive_content[:2000])

        dive_imgs = re.findall(r'src=["\']([^"\']+)["\']', dive_content)
        print("\nDive images:", dive_imgs)
    else:
        print("Could not find laptop-dive section")

except Exception as e:
    print("Error:", e)
