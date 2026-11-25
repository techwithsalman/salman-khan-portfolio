import urllib.request
import re

url = "https://2mcrafters.com/mohamedandaloussi/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
with urllib.request.urlopen(req, timeout=15) as res:
    html = res.read().decode("utf-8", errors="ignore")

# Find Reach elements
reach_matches = re.findall(r'<[^>]*class=["\'][^"\']*Reach_[^"\']*["\'][^>]*>.*?</[^>]+>', html, re.DOTALL)
print("Reach elements count:", len(reach_matches))
for r in reach_matches[:5]:
    print(" ", r[:300])

# Find the flyer / plaque content
flyer_matches = re.findall(r'<[^>]*class=["\'][^"\']*(?:flyer|plaque|ui_brand|Case)[^"\']*["\'][^>]*>.*?</[^>]+>', html, re.DOTALL)
print("\nFlyer / brand elements count:", len(flyer_matches))
for f in flyer_matches[:10]:
    print(" ", f[:300])

# Find script text
scripts_text = re.findall(r'class=["\'][^"\']*script[^"\']*["\'][^>]*>(.*?)</div>', html, re.DOTALL)
print("\nScript typography:")
for s in scripts_text:
    print(" ", s[:200])

# Find SiteMenu / Nav
sitemenu = re.findall(r'<nav[^>]*>.*?</nav>', html, re.DOTALL)
print("\nNavs found:")
for n in sitemenu:
    print(" ", n[:400])
