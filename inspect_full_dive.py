import urllib.request
import re

url = "https://2mcrafters.com/mohamedandaloussi/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
with urllib.request.urlopen(req, timeout=15) as res:
    html = res.read().decode("utf-8", errors="ignore")

# Find the full laptop-dive section
dive = re.search(r'(<section[^>]*id="laptop-dive"[^>]*>.*?</section>)', html, re.DOTALL)
if dive:
    with open("ref_dive_full.html", "w", encoding="utf-8") as f:
        f.write(dive.group(1))
    print("Saved ref_dive_full.html, size:", len(dive.group(1)))

# Find all CSS links
css_links = re.findall(r'href=["\']([^"\']+\.css)["\']', html)
print("CSS links:", css_links)

for idx, css_url in enumerate(css_links):
    if not css_url.startswith("http"):
        full_css_url = "https://2mcrafters.com" + css_url
    else:
        full_css_url = css_url
    try:
        creq = urllib.request.Request(full_css_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(creq, timeout=10) as cres:
            css_content = cres.read().decode("utf-8", errors="ignore")
            with open(f"ref_style_{idx}.css", "w", encoding="utf-8") as f:
                f.write(css_content)
            print(f"Saved ref_style_{idx}.css, size: {len(css_content)}")
    except Exception as e:
        print(f"Failed to fetch {css_url}: {e}")
