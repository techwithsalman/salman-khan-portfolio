import urllib.request
import os

assets = [
    ("office-start.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/office-start.webp"),
    ("plant.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/plant.webp"),
    ("portrait-jacket-1080.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/portrait-jacket-1080.webp"),
    ("robot-body-360.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/robot-body-360.webp"),
    ("robot-hand-360.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/robot-hand-360.webp"),
    ("iphone-520.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/iphone-520.webp"),
    ("room-1920.webp", "https://2mcrafters.com/images/mohamedandaloussi/home/room-1920.webp"),
]

os.makedirs("public/images/ref", exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

for fname, url in assets:
    dest = os.path.join("public/images/ref", fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as res:
            data = res.read()
            with open(dest, "wb") as f:
                f.write(data)
            print(f"Downloaded {fname}: {len(data)} bytes")
    except Exception as e:
        print(f"Failed {fname}: {e}")
