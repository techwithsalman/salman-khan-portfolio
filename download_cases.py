import urllib.request
import os

cases = [
    ("case-tangierport.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/case-tangierport.webp"),
    ("case-crafters.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/case-crafters.webp"),
    ("case-taxivoyagemogador.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/case-taxivoyagemogador.webp"),
    ("case-boukirdiamond.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/case-boukirdiamond.webp"),
    ("case-portazur.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/case-portazur.webp"),
    ("case-atlasnest.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/case-atlasnest.webp"),
    ("case-rovelisatlas.webp", "https://2mcrafters.com/images/mohamedandaloussi/laptop/case-rovelisatlas.webp"),
]

headers = {"User-Agent": "Mozilla/5.0"}
os.makedirs("public/images/cases", exist_ok=True)

for fname, url in cases:
    dest = os.path.join("public/images/cases", fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as res:
            with open(dest, "wb") as f:
                f.write(res.read())
            print(f"Downloaded case image {fname}")
    except Exception as e:
        print(f"Error {fname}: {e}")
